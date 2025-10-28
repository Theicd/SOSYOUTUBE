/* Cascade: הלוגיקה הראשית של נגן קלטות דיגיטליות לרכב */
(function () {
    const ACTIVE_KEY_STORAGE = "cascade-car-player-active-key";
    const ACTIVE_PUB_STORAGE = "cascade-car-player-active-pub";
    const PLAYLIST_STORAGE_PREFIX = "cascade-car-player-playlists::";
    const LAST_UPDATE_STORAGE_PREFIX = "cascade-car-player-updated-at::";
    const PROFILES_STORAGE = "cascade-car-player-profiles"; // Cascade: מאגר כל הפרופילים שנשמרו במכשיר
    const PROFILE_NAME_STORAGE_PREFIX = "cascade-car-player-profile-name::";
    const RELAY_URLS = [
        "wss://relay.damus.io",
        "wss://relay.snort.social",
        "wss://nos.lol",
        "wss://purplerelay.com",
        "wss://relay.nostr.band"
    ];
    const PLAYLIST_EVENT_KIND = 39001;
    const PLAYLIST_EVENT_D_TAG = "cascade-car-player";
    const PLAYLIST_APP_TAG = "cascade-player";
    const RELAY_SYNC_DEBOUNCE_MS = 2500; // Cascade: דיליי מינימלי לפני פרסום מחדש לריליי
    const REMOTE_PULL_INTERVAL_MS = 45000; // Cascade: פרק זמן בין פולינג לריליי

    // Cascade: פונקציות עזר לשמות פרופילים ותיוגם במערכת
    function sanitizeProfileName(value) {
        if (!value && value !== 0) {
            return "";
        }
        const trimmed = String(value).trim().replace(/\s+/g, " ");
        return trimmed.slice(0, 40);
    }

    function buildDefaultProfileName(publicKey) {
        if (!publicKey) {
            return "משתמש ללא שם";
        }
        return `פרופיל ${publicKey.slice(0, 4)}…${publicKey.slice(-4)}`;
    }

    const defaultPlaylists = []; // Cascade: פלייליסטים ריקים כברירת מחדל עבור פרופילים חדשים

    let playlists = []; // Cascade: אוסף הקלטות של המשתמש הפעיל
    let player = null;
    let currentPlaylistIndex = 0;
    let isShuffle = false;
    let activePrivateKey = "";
    let activePublicKey = "";
    let pendingGeneratedKey = "";
    let shelfNavigationInitialized = false;
    let nostrPool = null;
    let relaySyncTimer = null;
    let relayPollingInterval = null;
    let activeRelaySubscription = null; // Cascade: מחזיק את הידית למנוי הריליי הפעיל עבור ניתוק מסודר
    let isRestoringFromRemote = false;
    let lastRemoteEventTimestamp = 0;
    let lastPublishedPayload = "";
    let localLastUpdated = 0;
    let nostrSupportWarningShown = false;
    let savedProfiles = []; // Cascade: אוסף הפרופילים השמורים (private/public key + שם)
    let activeProfileName = ""; // Cascade: שם הפרופיל שמחובר כרגע

    const trackTitleElement = document.getElementById("trackTitle");
    const trackMetaElement = document.getElementById("trackMeta");
    const carouselElement = document.getElementById("cassetteCarousel");
    const shelfPrevButton = document.getElementById("shelfPrev");
    const shelfNextButton = document.getElementById("shelfNext");
    const hydratingPlaylists = new Set();
    const htmlDecoder = document.createElement("textarea");
    const loginButton = document.getElementById("loginButton");
    const signupButton = document.getElementById("signupButton");
    const logoutButton = document.getElementById("logoutButton");
    const accountStatusLabel = document.getElementById("accountStatus");
    const accountKeyBanner = document.getElementById("accountKeyBanner");
    const accountPublicKeyElement = document.getElementById("accountPublicKey");
    const copyActiveKeyButton = document.getElementById("copyActiveKeyButton");
    const accountModal = document.getElementById("accountModal");
    const closeAccountModalBtn = document.getElementById("closeAccountModal");
    const importKeyInput = document.getElementById("importKeyInput");
    const importKeyButton = document.getElementById("importKeyButton");
    const importKeyStatus = document.getElementById("importKeyStatus");
    const generateKeyButton = document.getElementById("generateKeyButton");
    const generatedKeyBlock = document.getElementById("generatedKeyBlock");
    const generatedKeyOutput = document.getElementById("generatedKeyOutput");
    const copyKeyButton = document.getElementById("copyKeyButton");
    const shareKeyButton = document.getElementById("shareKeyButton");
    const confirmKeyButton = document.getElementById("confirmKeyButton");
    const generatedKeyStatus = document.getElementById("generatedKeyStatus");
    const profileNameInput = document.getElementById("profileNameInput");
    const profileNameStatus = document.getElementById("profileNameStatus");
    const accountModalFocusTrap = [];
    const profileOverlay = document.getElementById("profileOverlay");
    const profileGrid = document.getElementById("profileGrid");
    const addProfileButton = document.getElementById("addProfileButton");

    loadProfiles();

    function logRelayDebug(message, detail) {
        if (typeof detail !== "undefined") {
            console.log("Cascade Relay:", message, detail);
        } else {
            console.log("Cascade Relay:", message);
        }
    }

    // Cascade: טוען פלייליסטים מהאחסון לפי המפתח הציבורי הפעיל
    function loadPlaylistsFromStorage() {
        if (!window.localStorage || !activePublicKey) {
            return [];
        }
        const storageKey = PLAYLIST_STORAGE_PREFIX + activePublicKey;
        try {
            const stored = localStorage.getItem(storageKey);
            if (!stored) {
                return [];
            }
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.warn("Cascade: לא ניתן היה לקרוא פלייליסטים מהאחסון", err);
            return [];
        }
    }

    // Cascade: מפעיל את תהליך הטעינה לאחר הגעת ה-API
    function onYouTubeIframeAPIReadyInternal() {
        initializePlayer();
    }

    // Cascade: מאתחל את הנגן אחרי שה-DOM והנתונים מוכנים
    function initializePlayer() {
        if (player) {
            return;
        }
        if (!playlists.length) {
            initializePlaylists();
        }
        createPlayer();
    }

    // Cascade: טוען פלייליסטים מ-localStorage ומרענן את הממשק ואת תצוגת הקלטות
    function initializePlaylists() {
        if (!activePrivateKey) {
            playlists = [];
            currentPlaylistIndex = -1;
            localLastUpdated = 0;
            updatePlaylistName();
            renderCassetteCarousel();
            toggleEmptyState();
            setupDrawer();
            setupShelfNavigation();
            setTrackInfoDefault();
            stopRelaySync();
            return;
        }

        const stored = loadPlaylistsFromStorage();
        localLastUpdated = getLocalUpdatedTimestamp();
        playlists = sanitizePlaylists(stored && stored.length ? stored : defaultPlaylists.slice());
        currentPlaylistIndex = playlists.length ? 0 : -1;
        updatePlaylistName();
        renderCassetteCarousel();
        toggleEmptyState();
        setupDrawer();
        setupShelfNavigation();
        if (playlists.length) {
            setTrackInfoLoading();
        } else {
            setTrackInfoDefault();
        }
        playlists.forEach((playlist) => hydratePlaylistMetadata(playlist.id));
    }

    // Cascade: מנקה רשימת פלייליסטים מקובצי נתונים פגומים
    function sanitizePlaylists(list) {
        if (!Array.isArray(list)) {
            return defaultPlaylists.slice();
        }
        const sanitized = list
            .map((playlist) => {
                if (!playlist || typeof playlist !== "object") {
                    return null;
                }
                const normalizedId = extractPlaylistId(playlist.id || "");
                if (!normalizedId) {
                    return null;
                }
                const rawName = typeof playlist.name === "string" ? playlist.name.trim() : "";
                const resolvedName = decodeHtmlEntities(rawName) || normalizedId;
                const normalizedThumbnail = typeof playlist.thumbnail === "string" ? playlist.thumbnail : "";
                const hydrated = Boolean(playlist.hydrated && rawName && rawName !== normalizedId && normalizedThumbnail);
                return { name: resolvedName, id: normalizedId, thumbnail: normalizedThumbnail, hydrated };
            })
            .filter(Boolean);
        return sanitized;
    }

    // Cascade: שומר פלייליסטים לשימוש עתידי
    function savePlaylistsToStorage(options) {
        const opts = options || {};
        if (!window.localStorage || !activePrivateKey) {
            return;
        }
        const storageKey = PLAYLIST_STORAGE_PREFIX + activePublicKey;
        const payload = JSON.stringify(playlists.map((playlist) => ({
            id: playlist.id,
            name: playlist.name,
            hydrated: Boolean(playlist.hydrated),
            thumbnail: playlist.thumbnail || ""
        })));
        try {
            localStorage.setItem(storageKey, payload);
            if (!opts.skipRemote) {
                scheduleRemoteSync();
            }
        } catch (err) {
            console.warn("Cascade: לא ניתן היה לשמור את הקלטות ל-localStorage", err);
        }
    }

    // Cascade: יוצר את נגן ה-YouTube לפי הפלייליסט הנוכחי
    function createPlayer() {
        const playerConfig = {
            height: "300",
            width: "600",
            playerVars: {
                autoplay: playlists.length ? 1 : 0,
                controls: 1
            },
            events: {
                onReady: handlePlayerReady,
                onStateChange: handleStateChange,
                onError: handlePlayerError
            }
        };

        if (playlists.length && playlists[currentPlaylistIndex]) {
            playerConfig.playerVars.listType = "playlist";
            playerConfig.playerVars.list = playlists[currentPlaylistIndex].id;
        }

        player = new YT.Player("player", playerConfig);
    }

    // Cascade: מופעל כשהנגן מוכן לעבודה
    function handlePlayerReady() {
        updatePlaylistName();
        if (!playlists.length) {
            return;
        }
        if (isShuffle) {
            shufflePlaylist();
        } else if (player && typeof player.playVideo === "function") {
            player.playVideo();
        }
    }

    // Cascade: מעדכן כפתור הפעלה/השהיה
    function handleStateChange(event) {
        const playButton = document.querySelector(".control-btn.play-toggle");
        if (!playButton) {
            return;
        }
        if (event.data === YT.PlayerState.PLAYING) {
            playButton.textContent = "⏸";
            updateTrackInfoFromPlayer();
        } else if (event.data === YT.PlayerState.BUFFERING) {
            setTrackInfoLoading();
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            playButton.textContent = "▶";
        }
    }

    // Cascade: מטפל בשגיאות יוטיוב ומתרגם הודעות נפוצות
    function handlePlayerError(event) {
        const messages = {
            2: "הקישור לפלייליסט שגוי. ודא שהזנת מזהה תקין.",
            100: "הווידאו הראשון בפלייליסט אינו זמין.",
            101: "בעל הזכויות חסם הטמעה של סרטון בפלייליסט.",
            150: "בעל הזכויות חסם הטמעה של סרטון בפלייליסט.",
            153: "אין אפשרות להטמיע את הפלייליסט. נסה פלייליסט אחר."
        };
        const msg = messages[event && event.data] || "אירעה שגיאה בהפעלת הפלייליסט.";
        alert(msg);
    }

    // Cascade: מעדכן את שם הקלטת שמוצגת למשתמש
    function updatePlaylistName() {
        const playlistName = document.getElementById("currentPlaylistName");
        if (!playlistName) {
            return;
        }
        if (currentPlaylistIndex >= 0 && playlists[currentPlaylistIndex]) {
            playlistName.textContent = playlists[currentPlaylistIndex].name;
        } else {
            playlistName.textContent = "אין קלטת טעונה";
            setTrackInfoDefault();
        }
    }

    // Cascade: מפעיל את הוידאו הנוכחי
    function playVideo() {
        if (player && typeof player.playVideo === "function") {
            player.playVideo();
        }
    }

    // Cascade: משהה את הוידאו הנוכחי
    function pauseVideo() {
        if (player && typeof player.pauseVideo === "function") {
            player.pauseVideo();
        }
    }

    // Cascade: מפעיל/משהה בלחיצה אחת על כפתור הנגן
    function togglePlay() {
        if (!player || typeof player.getPlayerState !== "function") {
            return;
        }
        if (!playlists.length) {
            alert("אין קלטת טעונה. הוסף קלטת חדשה להפעלה.");
            return;
        }
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING) {
            pauseVideo();
        } else {
            playVideo();
        }
    }

    // Cascade: מדלג לשיר הבא
    function nextTrack() {
        if (player && typeof player.nextVideo === "function") {
            player.nextVideo();
        }
    }

    // Cascade: חוזר לשיר הקודם
    function previousTrack() {
        if (player && typeof player.previousVideo === "function") {
            player.previousVideo();
        }
    }

    // Cascade: עובר לקלטת הבאה
    function nextPlaylist() {
        if (!playlists.length) {
            return;
        }
        currentPlaylistIndex = (currentPlaylistIndex + 1) % playlists.length;
        reloadPlayer();
    }

    // Cascade: עובר לקלטת הקודמת
    function previousPlaylist() {
        if (!playlists.length) {
            return;
        }
        currentPlaylistIndex = (currentPlaylistIndex - 1 + playlists.length) % playlists.length;
        reloadPlayer();
    }

    // Cascade: טוען את הקלטת הנוכחית מחדש
    function reloadPlayer() {
        if (!playlists.length) {
            return;
        }
        if (player && typeof player.loadPlaylist === "function") {
            player.loadPlaylist({ listType: "playlist", list: playlists[currentPlaylistIndex].id });
            updatePlaylistName();
            renderCassetteCarousel();
            toggleEmptyState();
            return;
        }
        if (player && typeof player.destroy === "function") {
            player.destroy();
        }
        createPlayer();
    }

    // Cascade: מחליף מצב ערבול
    function toggleShuffle() {
        isShuffle = !isShuffle;
        const shuffleBtn = document.getElementById("shuffleBtn");
        if (shuffleBtn) {
            shuffleBtn.classList.toggle("active", isShuffle);
        }
        if (isShuffle) {
            shufflePlaylist();
        }
    }

    // Cascade: מנגן שיר רנדומלי מהפלייליסט
    function shufflePlaylist() {
        if (player && typeof player.getPlaylist === "function") {
            const playlist = player.getPlaylist();
            if (Array.isArray(playlist) && playlist.length) {
                const randomIndex = Math.floor(Math.random() * playlist.length);
                player.playVideoAt(randomIndex);
            }
        }
    }

    // Cascade: מחזיר לדף הראשי
    function goBack() {
        window.location.href = "index.html";
    }

    // Cascade: מוסיף אפקט לחיצה ומפעיל רטט במכשירים תומכים
    function buttonClickEffect(button) {
        if (!button) {
            return;
        }
        button.classList.add("active-effect");
        setTimeout(() => {
            button.classList.remove("active-effect");
        }, 300);
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    // Cascade: מוסיף קלטת חדשה לפי קלט המשתמש
    function addPlaylist() {
        if (!activePrivateKey) {
            alert("ראשית התחבר או הירשם כדי לשמור קלטות אישיות.");
            return;
        }
        const idInput = document.getElementById("playlistIdInput");
        const idValueRaw = idInput ? idInput.value.trim() : "";
        const normalizedId = extractPlaylistId(idValueRaw);

        if (!normalizedId) {
            alert("נא להזין קישור או מזהה פלייליסט תקין מיוטיוב");
            return;
        }

        const exists = playlists.some((playlist) => playlist.id === normalizedId);
        if (exists) {
            alert("הפלייליסט הזה כבר קיים במערכת");
            return;
        }

        playlists.push({ name: normalizedId, id: normalizedId, hydrated: false, thumbnail: "" });
        currentPlaylistIndex = playlists.length - 1;
        savePlaylistsToStorage();
        updatePlaylistName();
        renderCassetteCarousel();
        toggleEmptyState();
        setTrackInfoLoading();
        reloadPlayer();
        hydratePlaylistMetadata(normalizedId);

        if (idInput) {
            idInput.value = "";
        }
        closeDrawer();
    }

    // Cascade: מחיקה של קלטת קיימת
    function removePlaylist(index) {
        if (index < 0 || index >= playlists.length) {
            return;
        }
        if (!confirm("למחוק את הפלייליסט \"" + playlists[index].name + "\"?")) {
            return;
        }
        playlists.splice(index, 1);
        if (!playlists.length) {
            currentPlaylistIndex = -1;
            setTrackInfoDefault();
        } else if (currentPlaylistIndex >= playlists.length) {
            currentPlaylistIndex = playlists.length - 1;
            setTrackInfoLoading();
        }
        savePlaylistsToStorage();
        updatePlaylistName();
        renderCassetteCarousel();
        toggleEmptyState();
        reloadPlayer();
    }

    // Cascade: מציג את הקלטות ככרטיסים בקרוסלת גלילה אופקית
    function renderCassetteCarousel() {
        if (!carouselElement) {
            return;
        }
        carouselElement.innerHTML = "";
        playlists.forEach((playlist, index) => {
            const card = document.createElement("article");
            card.className = "cassette-card" + (index === currentPlaylistIndex ? " active" : "");
            card.setAttribute("role", "group");
            card.setAttribute("data-playlist-id", playlist.id);

            const content = document.createElement("div");
            content.className = "cassette-card-content";

            const art = document.createElement("div");
            art.className = "cassette-art";

            const reelLeft = document.createElement("span");
            reelLeft.className = "cassette-reel left";
            const reelRight = document.createElement("span");
            reelRight.className = "cassette-reel right";

            const windowWrapper = document.createElement("div");
            windowWrapper.className = "cassette-window";

            const thumb = document.createElement("img");
            thumb.className = "cassette-thumb" + (playlist.thumbnail ? "" : " placeholder");
            thumb.loading = "lazy";
            thumb.decoding = "async";
            thumb.alt = playlist.name || "קלטת מיוטיוב";
            if (playlist.thumbnail) {
                thumb.src = playlist.thumbnail;
            }
            thumb.onerror = () => {
                thumb.removeAttribute("src");
                thumb.classList.add("thumb-fallback");
            };

            windowWrapper.appendChild(thumb);
            art.appendChild(reelLeft);
            art.appendChild(reelRight);
            art.appendChild(windowWrapper);

            const title = document.createElement("div");
            title.className = "cassette-title";
            title.textContent = playlist.name;

            const meta = document.createElement("div");
            meta.className = "cassette-meta";
            meta.textContent = formatPlaylistIdentifier(playlist.id);

            const actions = document.createElement("div");
            actions.className = "cassette-actions";

            const playBtn = document.createElement("button");
            playBtn.type = "button";
            playBtn.className = "cassette-play-btn";
            playBtn.textContent = "▶ נגן";
            playBtn.onclick = (event) => {
                event.stopPropagation();
                currentPlaylistIndex = index;
                updatePlaylistName();
                renderCassetteCarousel();
                setTrackInfoLoading();
                reloadPlayer();
                focusCassetteCard(index);
                hydratePlaylistMetadata(playlist.id);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.className = "cassette-delete-btn";
            deleteBtn.textContent = "🗑";
            deleteBtn.title = "מחק קלטת";
            deleteBtn.onclick = (event) => {
                event.stopPropagation();
                removePlaylist(index);
            };

            actions.appendChild(playBtn);
            actions.appendChild(deleteBtn);

            content.appendChild(art);
            content.appendChild(title);
            content.appendChild(meta);
            content.appendChild(actions);

            card.appendChild(content);
            carouselElement.appendChild(card);
            hydratePlaylistMetadata(playlist.id);
        });
        updateShelfButtonsState();
        focusCassetteCard(currentPlaylistIndex);
    }

    // Cascade: מציג/מסתיר את הודעת החוסר בקלטות
    function toggleEmptyState() {
        const emptyState = document.getElementById("emptyState");
        if (!emptyState) {
            return;
        }
        emptyState.style.display = playlists.length ? "none" : "block";
        if (shelfPrevButton) {
            shelfPrevButton.disabled = !playlists.length;
        }
        if (shelfNextButton) {
            shelfNextButton.disabled = !playlists.length;
        }
        const openBtn = document.getElementById("openAddForm");
        if (openBtn) {
            openBtn.disabled = !activePrivateKey;
            openBtn.classList.toggle("disabled", !activePrivateKey);
        }
        updateAccountStatusBanner();
    }

    // Cascade: פותח/סוגר את מגירת ההוספה ומאזין ללחצנים
    function setupDrawer() {
        const drawer = document.getElementById("addDrawer");
        const openBtn = document.getElementById("openAddForm");
        const cancelBtn = document.getElementById("cancelAdd");
        const saveBtn = document.getElementById("savePlaylist");
        if (!drawer || !openBtn || !cancelBtn || !saveBtn) {
            return;
        }
        openBtn.onclick = () => openDrawer();
        cancelBtn.onclick = () => closeDrawer();
        saveBtn.onclick = () => addPlaylist();
        drawer.addEventListener("click", (event) => {
            if (event.target === drawer) {
                closeDrawer();
            }
        });
    }

    // Cascade: מאזין לכפתורי הגלילה במדף הקלטות
    function setupShelfNavigation() {
        if (!carouselElement || !shelfPrevButton || !shelfNextButton) {
            return;
        }
        shelfPrevButton.onclick = () => scrollCarousel(-1);
        shelfNextButton.onclick = () => scrollCarousel(1);
        if (!shelfNavigationInitialized) {
            carouselElement.addEventListener("scroll", () => updateShelfButtonsState());
            shelfNavigationInitialized = true;
        }
        updateShelfButtonsState();
    }

    // Cascade: מגלגל את הקרוסלה כרטיס קדימה/אחורה
    function scrollCarousel(direction) {
        if (!carouselElement) {
            return;
        }
        const cardWidth = carouselElement.firstElementChild ? carouselElement.firstElementChild.getBoundingClientRect().width : 0;
        const offset = cardWidth ? cardWidth + 20 : 260;
        carouselElement.scrollBy({ left: direction * offset, behavior: "smooth" });
    }

    // Cascade: מציב פוקוס בכרטיס הפעיל להנגשה
    function focusCassetteCard(index) {
        if (!carouselElement) {
            return;
        }
        const cards = carouselElement.querySelectorAll(".cassette-card");
        if (index < 0 || !cards.length) {
            return;
        }
        cards.forEach((card, idx) => {
            card.setAttribute("tabindex", idx === index ? "0" : "-1");
            if (idx === index) {
                setTimeout(() => card.focus({ preventScroll: false }), 150);
            }
        });
    }

    // Cascade: מעדכן את זמינות כפתורי הגלילה
    function updateShelfButtonsState() {
        if (!carouselElement || !shelfPrevButton || !shelfNextButton) {
            return;
        }
        const maxScrollLeft = carouselElement.scrollWidth - carouselElement.clientWidth;
        shelfPrevButton.disabled = carouselElement.scrollLeft <= 0;
        shelfNextButton.disabled = carouselElement.scrollLeft >= maxScrollLeft - 4;
    }

    // Cascade: פותח את מגירת ההוספה
    function openDrawer() {
        const drawer = document.getElementById("addDrawer");
        if (!drawer) {
            return;
        }
        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");
        const idInput = document.getElementById("playlistIdInput");
        if (idInput) {
            setTimeout(() => idInput.focus(), 0);
        }
    }

    // Cascade: סוגר את מגירת ההוספה
    function closeDrawer() {
        const drawer = document.getElementById("addDrawer");
        if (!drawer) {
            return;
        }
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
    }

    // Cascade: מפיק מזהה פלייליסט מקישור או מזהה גולמי
    function extractPlaylistId(value) {
        const raw = (value || "").trim();
        if (!raw) {
            return "";
        }
        const listMatch = raw.match(/[?&]list=([a-zA-Z0-9_-]+)/);
        if (listMatch && listMatch[1]) {
            return listMatch[1];
        }
        const cleanMatch = raw.match(/^[a-zA-Z0-9_-]+$/);
        return cleanMatch ? cleanMatch[0] : "";
    }

    // Cascade: קובע את טקסט המידע על הטרק
    function setTrackInfo(title, meta) {
        if (!trackTitleElement || !trackMetaElement) {
            return;
        }
        trackTitleElement.textContent = title;
        trackMetaElement.textContent = meta;
    }

    // Cascade: מציב מידע ברירת מחדל כאשר אין רצועה
    function setTrackInfoDefault() {
        setTrackInfo("אין מידע על רצועה", "התחל לנגן קלטת כדי לראות פרטים");
    }

    // Cascade: מציג הודעת טעינה בזמן מעבר בין רצועות
    function setTrackInfoLoading() {
        setTrackInfo("טוען רצועה...", "מתכונן לנגן את הקלטת שלך");
    }

    // Cascade: מעדכן את פרטי הרצועה דרך נתוני YouTube
    function updateTrackInfoFromPlayer() {
        if (!player || typeof player.getVideoData !== "function") {
            setTrackInfo("רצועה מתנגנת", "פרטים אינם זמינים כרגע");
            return;
        }
        const data = player.getVideoData();
        const playlist = typeof player.getPlaylist === "function" ? player.getPlaylist() : null;
        const playlistIndex = typeof player.getPlaylistIndex === "function" ? player.getPlaylistIndex() : -1;
        const title = data && data.title ? data.title : "רצועה מתנגנת";
        const author = data && data.author ? data.author : "YouTube";
        const metaParts = [`ערוץ: ${author}`];
        if (Array.isArray(playlist) && playlist.length && playlistIndex >= 0) {
            metaParts.push(`רצועה ${playlistIndex + 1} מתוך ${playlist.length}`);
        }
        setTrackInfo(title, metaParts.join(" • "));
        if (currentPlaylistIndex >= 0 && playlists[currentPlaylistIndex]) {
            maybeHydrateFromVideoData(playlists[currentPlaylistIndex], data);
        }
    }

    // Cascade: מפענח ישויות HTML שהגיעו מ-YouTube
    function decodeHtmlEntities(value) {
        if (!value) {
            return "";
        }
        htmlDecoder.innerHTML = value;
        const decoded = htmlDecoder.value || htmlDecoder.textContent || value;
        htmlDecoder.innerHTML = "";
        return decoded.trim();
    }

    // Cascade: פורמט תצוגה של מזהה הפלייליסט
    function formatPlaylistIdentifier(identifier) {
        if (!identifier) {
            return "";
        }
        return identifier.length <= 24 ? identifier : identifier.slice(0, 24) + "…";
    }

    // Cascade: מאחזר מידע על פלייליסט מיוטיוב ומעדכן את הקלטת
    async function hydratePlaylistMetadata(playlistId) {
        if (!playlistId || hydratingPlaylists.has(playlistId)) {
            return;
        }
        const playlistRecord = getPlaylistRecord(playlistId);
        if (!playlistRecord || playlistRecord.hydrated) {
            return;
        }
        hydratingPlaylists.add(playlistId);
        try {
            const metadata = await fetchPlaylistMetadataViaOEmbed(playlistId);
            if (metadata) {
                applyPlaylistMetadata(playlistId, {
                    title: decodeHtmlEntities(metadata.title || ""),
                    thumbnail: metadata.thumbnail_url || metadata.thumbnail,
                    hydrated: true
                });
                return;
            }
        } catch (err) {
            console.warn("Cascade: oEmbed metadata fetch failed", err);
        } finally {
            hydratingPlaylists.delete(playlistId);
        }
        fallbackHydrationFromPlayer(playlistId);
    }

    // Cascade: ניסיון משני להבאת מטא־דאטה באמצעות נתוני הווידאו הפעיל
    function fallbackHydrationFromPlayer(playlistId) {
        const playlistRecord = getPlaylistRecord(playlistId);
        if (!playlistRecord) {
            return;
        }
        if (player && typeof player.getVideoData === "function") {
            const data = player.getVideoData();
            maybeHydrateFromVideoData(playlistRecord, data);
        }
    }

    // Cascade: מנסה להשלים שם ותמונה מנתוני הווידאו שמושמע כרגע
    function maybeHydrateFromVideoData(playlistRecord, videoData) {
        if (!playlistRecord || playlistRecord.hydrated || !videoData) {
            return;
        }
        const title = decodeHtmlEntities(videoData.title || "");
        const thumbnail = buildThumbnailFromVideoId(videoData.video_id);
        applyPlaylistMetadata(playlistRecord.id, {
            title: title || playlistRecord.name,
            thumbnail,
            hydrated: Boolean(title || thumbnail)
        });
    }

    // Cascade: מחזיר אובייקט פלייליסט לפי מזהה
    function getPlaylistRecord(playlistId) {
        return playlists.find((playlist) => playlist.id === playlistId) || null;
    }

    // Cascade: יוצר כתובת תמונה לפי מזהה וידאו
    function buildThumbnailFromVideoId(videoId) {
        if (!videoId) {
            return "";
        }
        return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }

    // Cascade: מיישם מטא־דאטה על רשומת פלייליסט ושומר
    function applyPlaylistMetadata(playlistId, metadata) {
        const playlistRecord = getPlaylistRecord(playlistId);
        if (!playlistRecord) {
            return;
        }
        let hasChanged = false;
        if (metadata.title && metadata.title !== playlistRecord.name) {
            playlistRecord.name = metadata.title;
            hasChanged = true;
        }
        if (metadata.thumbnail && metadata.thumbnail !== playlistRecord.thumbnail) {
            playlistRecord.thumbnail = metadata.thumbnail;
            hasChanged = true;
        }
        if (metadata.hydrated && !playlistRecord.hydrated) {
            playlistRecord.hydrated = true;
            hasChanged = true;
        }
        if (hasChanged) {
            savePlaylistsToStorage();
            renderCassetteCarousel();
            updatePlaylistName();
        }
    }

    // Cascade: משיג מטא־דאטה באמצעות oEmbed (עם גרסאות גיבוי)
    async function fetchPlaylistMetadataViaOEmbed(playlistId) {
        const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
        const endpoints = [
            `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(playlistUrl)}`,
            `https://noembed.com/embed?url=${encodeURIComponent(playlistUrl)}`
        ];
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint, { mode: "cors" });
                if (!response || !response.ok) {
                    continue;
                }
                const data = await response.json();
                if (data && (data.title || data.thumbnail_url || data.thumbnail)) {
                    return data;
                }
            } catch (err) {
                console.warn("Cascade: metadata endpoint unreachable", endpoint, err);
            }
        }
        return null;
    }

    // Cascade: מעדכן את טקסט הסטטוס העליון לפי מצב המשתמש
    function updateAccountStatusBanner(message, tone) {
        if (!accountStatusLabel) {
            return;
        }
        const hasActiveProfile = Boolean(activePrivateKey && activePublicKey);
        let text = message;
        if (!text) {
            if (hasActiveProfile) {
                const profileLabel = activeProfileName || buildDefaultProfileName(activePublicKey);
                text = `מחובר כ"${profileLabel}" – הקלטות שלך מסונכרנות דרך ריליי Nostr.`;
            } else if (savedProfiles.length) {
                text = "בחר משתמש קיים או צור פרופיל חדש כדי להתחיל לנגן.";
            } else {
                text = "אין משתמש מחובר. לחץ על \"התחבר / הירשם\" כדי לקבל מפתח אישי.";
            }
        }
        accountStatusLabel.textContent = text;
        const shouldWarn = !hasActiveProfile || tone === "warning";
        accountStatusLabel.classList.toggle("status-warning", shouldWarn);
    }

    // Cascade: מאתחל את מערכת המפתחות והחשבון
    function initializeAccountSystem() {
        bindAccountEvents();
        if (logoutButton) {
            logoutButton.hidden = true;
        }
        loadProfiles();
        renderProfileGrid();
        const storedActiveKey = loadActivePrivateKey();
        if (storedActiveKey) {
            applyActivePrivateKey(storedActiveKey, { silent: true });
            return;
        }
        playlists = [];
        currentPlaylistIndex = -1;
        updatePlaylistName();
        renderCassetteCarousel();
        toggleEmptyState();
        setTrackInfoDefault();
        updateAccountStatusBanner();
        updateAccountKeyBanner();
        if (savedProfiles.length) {
            openProfileOverlay();
        } else if (signupButton) {
            signupButton.focus();
        }
    }

    // Cascade: טוען מפתח קיים מהדפדפן אם נשמר בעבר
    function loadActivePrivateKey() {
        try {
            if (!window.localStorage) {
                return "";
            }
            const stored = localStorage.getItem(ACTIVE_KEY_STORAGE);
            return typeof stored === "string" ? stored.trim() : "";
        } catch (err) {
            console.warn("Cascade: לא ניתן היה לקרוא את המפתח מהאחסון", err);
            return "";
        }
    }

    // Cascade: מאזין לכפתורי הממשק של חשבון המשתמש
    function bindAccountEvents() {
        if (loginButton) {
            loginButton.onclick = () => {
                if (activePrivateKey || savedProfiles.length) {
                    openProfileOverlay();
                } else {
                    openAccountModal({ focus: "login" });
                }
            };
        }
        if (signupButton) {
            signupButton.onclick = () => {
                openAccountModal({ focus: "signup" });
            };
        }
        if (logoutButton) {
            logoutButton.onclick = () => handleLogout();
        }
        if (copyActiveKeyButton) {
            copyActiveKeyButton.onclick = () => {
                if (!activePublicKey) {
                    return;
                }
                const keyToCopy = activePublicKey;
                if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
                    navigator.clipboard.writeText(keyToCopy).then(() => {
                        copyActiveKeyButton.textContent = "✅ הועתק";
                        setTimeout(() => {
                            copyActiveKeyButton.textContent = "העתק";
                        }, 2000);
                    }).catch(() => {
                        fallbackCopyActiveKey(keyToCopy);
                    });
                } else {
                    fallbackCopyActiveKey(keyToCopy);
                }
            };
        }
        if (closeAccountModalBtn) {
            closeAccountModalBtn.onclick = () => closeAccountModal();
        }
        if (generateKeyButton) {
            generateKeyButton.onclick = () => handleGenerateNewKey();
        }
        if (copyKeyButton) {
            copyKeyButton.onclick = () => copyGeneratedKey();
        }
        if (shareKeyButton) {
            shareKeyButton.onclick = () => shareGeneratedKey();
        }
        if (confirmKeyButton) {
            confirmKeyButton.onclick = () => confirmGeneratedKey();
        }
        if (importKeyButton) {
            importKeyButton.onclick = () => handleImportExistingKey();
        }
        if (profileNameInput) {
            profileNameInput.addEventListener("input", () => {
                const value = sanitizeProfileName(profileNameInput.value);
                if (!value) {
                    setProfileNameStatus("נא להזין שם פרופיל קצר", "error");
                } else {
                    setProfileNameStatus("שם פרופיל יישמר עם המפתח הזה");
                }
            });
        }
        if (addProfileButton) {
            addProfileButton.onclick = () => {
                closeProfileOverlay();
                openAccountModal({ focus: "signup" });
            };
        }
        if (profileOverlay) {
            profileOverlay.addEventListener("click", (event) => {
                if (event.target === profileOverlay) {
                    closeProfileOverlay();
                }
            });
        }
        if (accountModal) {
            accountModal.addEventListener("click", (event) => {
                if (event.target === accountModal) {
                    closeAccountModal();
                }
            });
            accountModalFocusTrap.splice(0, accountModalFocusTrap.length);
            const focusableSelectors = 'button, [href], textarea, input, select, [tabindex]:not([tabindex="-1"])';
            const focusables = Array.from(accountModal.querySelectorAll(focusableSelectors));
            focusables.forEach((el) => {
                if (!el.hasAttribute("disabled")) {
                    accountModalFocusTrap.push(el);
                }
            });
        }
        if (document.addEventListener) {
            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && accountModal && accountModal.classList.contains("is-open")) {
                    closeAccountModal();
                }
                if (event.key === "Tab" && accountModal && accountModal.classList.contains("is-open")) {
                    trapFocus(event);
                }
            });
        }
    }

    // Cascade: פותח את החלון הקופץ של חשבון המשתמש
    function openAccountModal(options) {
        if (!accountModal) {
            return;
        }
        accountModal.classList.add("is-open");
        accountModal.setAttribute("aria-hidden", "false");
        const opts = options || {};
        const shouldFocusSignup = opts.focus === "signup";
        if (profileNameInput) {
            if (shouldFocusSignup) {
                profileNameInput.value = "";
                setProfileNameStatus("בחר שם קצר למשתמש החדש שלך.");
            } else if (activeProfileName) {
                profileNameInput.value = activeProfileName;
                setProfileNameStatus("ניתן לעדכן את שם הפרופיל הנוכחי.");
            } else {
                profileNameInput.value = "";
                setProfileNameStatus("");
            }
        }
        if (shouldFocusSignup && profileNameInput) {
            setTimeout(() => profileNameInput.focus(), 0);
        } else if (importKeyInput) {
            setTimeout(() => importKeyInput.focus(), 0);
        }
    }

    // Cascade: סוגר את חלון החשבון ומנקה הודעות
    function closeAccountModal() {
        if (!accountModal) {
            return;
        }
        accountModal.classList.remove("is-open");
        accountModal.setAttribute("aria-hidden", "true");
        setImportStatus("", "");
        setGeneratedKeyStatus("", "");
        setProfileNameStatus("", "");
        if (document.activeElement && typeof document.activeElement.blur === "function") {
            document.activeElement.blur();
        }
        if (loginButton) {
            loginButton.focus();
        }
    }

    // Cascade: מציג את שכבת בחירת הפרופילים
    function openProfileOverlay() {
        if (!profileOverlay) {
            return;
        }
        renderProfileGrid();
        profileOverlay.classList.add("is-open");
        profileOverlay.setAttribute("aria-hidden", "false");
    }

    // Cascade: סוגר את שכבת בחירת הפרופילים
    function closeProfileOverlay() {
        if (!profileOverlay) {
            return;
        }
        profileOverlay.classList.remove("is-open");
        profileOverlay.setAttribute("aria-hidden", "true");
    }

    // Cascade: רענון גלריית הקלפים של הפרופילים השמורים
    function renderProfileGrid() {
        if (!profileGrid) {
            return;
        }
        profileGrid.innerHTML = "";
        if (!savedProfiles.length) {
            const emptyCard = document.createElement("div");
            emptyCard.className = "profile-card profile-card-add";

            const emptyAvatar = document.createElement("div");
            emptyAvatar.className = "profile-avatar";
            emptyAvatar.textContent = "➕";

            const emptyTitle = document.createElement("div");
            emptyTitle.className = "profile-name";
            emptyTitle.textContent = "עוד אין פרופילים שמורים";

            const emptyHint = document.createElement("div");
            emptyHint.className = "profile-key-tag";
            emptyHint.textContent = "בחר \"הוסף פרופיל\" או התחבר כדי ליצור אחד חדש.";

            emptyCard.append(emptyAvatar, emptyTitle, emptyHint);
            profileGrid.appendChild(emptyCard);
            return;
        }

        savedProfiles.forEach((profile) => {
            const card = document.createElement("button");
            card.type = "button";
            card.className = "profile-card";
            card.setAttribute("role", "listitem");
            card.dataset.publicKey = profile.publicKey;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "profile-card-remove";
            removeButton.setAttribute("aria-label", `מחק את הפרופיל ${profile.name}`);
            removeButton.textContent = "✖";
            removeButton.addEventListener("click", (event) => {
                event.stopPropagation();
                handleProfileRemoval(profile.publicKey);
            });

            const avatar = document.createElement("div");
            avatar.className = "profile-avatar";
            const firstLetter = sanitizeProfileName(profile.name).charAt(0) || "🎧";
            avatar.textContent = firstLetter;

            const nameEl = document.createElement("div");
            nameEl.className = "profile-name";
            nameEl.textContent = profile.name;

            const keyTag = document.createElement("div");
            keyTag.className = "profile-key-tag";
            keyTag.textContent = `${profile.publicKey.slice(0, 8)}…${profile.publicKey.slice(-6)}`;

            card.append(removeButton, avatar, nameEl, keyTag);
            card.addEventListener("click", () => handleProfileSelection(profile.publicKey));
            profileGrid.appendChild(card);
        });
    }

    // Cascade: תגובה לבחירת פרופיל קיים מתוך הגלריה
    function handleProfileSelection(publicKey) {
        const profile = findProfileByPublicKey(publicKey);
        if (!profile) {
            return;
        }
        applyActivePrivateKey(profile.privateKey, { profileName: profile.name });
        closeProfileOverlay();
        updateAccountStatusBanner();
    }

    // Cascade: מסיר פרופיל מהרשימה ומעדכן את התצוגה
    function handleProfileRemoval(publicKey) {
        if (!publicKey) {
            return;
        }
        const wasActive = activePublicKey === publicKey;
        if (wasActive) {
            handleLogout({ skipOverlay: true });
        }
        removeProfile(publicKey);
        renderProfileGrid();
        updateAccountStatusBanner();
        if (!savedProfiles.length) {
            closeProfileOverlay();
            if (signupButton) {
                signupButton.focus();
            }
        } else if (wasActive) {
            openProfileOverlay();
        }
    }

    // Cascade: מטפל בייבוא מפתח קיים של משתמש
    function handleImportExistingKey() {
        if (!importKeyInput) {
            return;
        }
        const rawValue = importKeyInput.value.trim();
        if (!rawValue) {
            setImportStatus("נא להדביק מפתח חוקי.", "error");
            return;
        }
        const normalized = normalizePrivateKey(rawValue);
        if (!normalized) {
            setImportStatus("המפתח שסופק אינו חוקי. ודא שמדובר במחרוזת Hex באורך 64 תווים או מפתח nsec.", "error");
            return;
        }
        const profileName = extractProfileNameFromModal({ required: false });
        applyActivePrivateKey(normalized, { silent: false, profileName });
        importKeyInput.value = "";
        closeAccountModal();
    }

    // Cascade: מייצר מפתח פרטי חדש ומציג אותו למשתמש
    function handleGenerateNewKey() {
        const generated = generatePrivateKeyHex();
        pendingGeneratedKey = generated;
        if (generatedKeyOutput) {
            generatedKeyOutput.value = generated;
        }
        if (generatedKeyBlock) {
            generatedKeyBlock.hidden = false;
        }
        if (copyKeyButton) {
            copyKeyButton.disabled = false;
        }
        if (shareKeyButton) {
            shareKeyButton.disabled = false;
        }
        if (confirmKeyButton) {
            confirmKeyButton.disabled = false;
        }
        setGeneratedKeyStatus("נוצר מפתח חדש. שמור אותו לפני ההמשך.");
    }

    // Cascade: מעתיק את המפתח החדש ללוח
    async function copyGeneratedKey() {
        if (!pendingGeneratedKey || !navigator.clipboard) {
            setGeneratedKeyStatus("הדפדפן לא מאפשר העתקה אוטומטית.", "error");
            return;
        }
        try {
            await navigator.clipboard.writeText(pendingGeneratedKey);
            setGeneratedKeyStatus("המפתח הועתק ללוח הזיכרון.");
        } catch (err) {
            console.warn("Cascade: העתקת המפתח נכשלה", err);
            setGeneratedKeyStatus("לא הצלחנו להעתיק את המפתח.", "error");
        }
    }

    // Cascade: משתף את המפתח ב-WhatsApp בחלון חדש
    function shareGeneratedKey() {
        if (!pendingGeneratedKey) {
            setGeneratedKeyStatus("אין מפתח לשיתוף.", "error");
            return;
        }
        const shareUrl = `https://wa.me/?text=${encodeURIComponent("המפתח האישי שלי לנגן הקלטות: " + pendingGeneratedKey)}`;
        window.open(shareUrl, "_blank", "noopener");
    }

    // Cascade: מאשר את המפתח שנוצר ומשייך אותו למשתמש הפעיל
    function confirmGeneratedKey() {
        if (!pendingGeneratedKey) {
            setGeneratedKeyStatus("יש ליצור מפתח לפני שמירה.", "error");
            return;
        }
        const profileName = extractProfileNameFromModal({ required: false });
        applyActivePrivateKey(pendingGeneratedKey, { silent: false, profileName });
        pendingGeneratedKey = "";
        if (generatedKeyBlock) {
            generatedKeyBlock.hidden = true;
        }
        closeAccountModal();
    }

    // Cascade: שומר את סטטוס ייבוא המפתח
    function setImportStatus(message, tone) {
        if (!importKeyStatus) {
            return;
        }
        importKeyStatus.textContent = message || "";
        importKeyStatus.classList.toggle("status-error", tone === "error");
    }

    // Cascade: שומר את הודעת סטטוס יצירת המפתח
    function setGeneratedKeyStatus(message, tone) {
        if (!generatedKeyStatus) {
            return;
        }
        generatedKeyStatus.textContent = message || "";
        generatedKeyStatus.classList.toggle("status-error", tone === "error");
    }

    // Cascade: מציג משוב על שדה שם הפרופיל בממשק החשבון
    function setProfileNameStatus(message, tone) {
        if (!profileNameStatus) {
            return;
        }
        profileNameStatus.textContent = message || "";
        profileNameStatus.classList.toggle("status-error", tone === "error");
    }

    // Cascade: מחלץ שם פרופיל ממסך החשבון ומוודא שהוא תקין
    function extractProfileNameFromModal(options) {
        if (!profileNameInput) {
            return "";
        }
        const opts = options || {};
        const sanitized = sanitizeProfileName(profileNameInput.value);
        if (!sanitized) {
            if (opts.required) {
                setProfileNameStatus("נא להזין שם פרופיל קצר כדי שנזהה את המשתמש במסך הבחירה.", "error");
                return "";
            }
            setProfileNameStatus("אם תשאיר את השדה ריק ניצור שם אוטומטי לפי המפתח שלך.");
            return "";
        }
        setProfileNameStatus("שם הפרופיל יישמר ויוצג במסך הבחירה.");
        return sanitized;
    }

    // Cascade: מאחסן את מצב הפרופילים ב-localStorage
    function persistProfiles() {
        if (!window.localStorage) {
            return;
        }
        try {
            const payload = JSON.stringify(savedProfiles);
            localStorage.setItem(PROFILES_STORAGE, payload);
        } catch (err) {
            console.warn("Cascade: כשל בשמירת הפרופילים המקומית", err);
        }
    }

    // Cascade: טוען פרופילים קיימים מהדפדפן
    function loadProfiles() {
        if (!window.localStorage) {
            savedProfiles = [];
            return;
        }
        try {
            const raw = localStorage.getItem(PROFILES_STORAGE);
            if (!raw) {
                savedProfiles = [];
                return;
            }
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                savedProfiles = [];
                return;
            }
            savedProfiles = parsed.filter((profile) => {
                return profile
                    && typeof profile.privateKey === "string"
                    && /^[0-9a-f]{64}$/.test(profile.privateKey)
                    && typeof profile.publicKey === "string"
                    && profile.publicKey.length === 64;
            }).map((profile) => {
                const storedName = loadProfileName(profile.publicKey);
                const normalizedName = sanitizeProfileName(profile.name);
                const resolvedName = normalizedName || storedName || buildDefaultProfileName(profile.publicKey);
                if (!storedName && resolvedName) {
                    persistProfileName(profile.publicKey, resolvedName);
                }
                return {
                    privateKey: profile.privateKey,
                    publicKey: profile.publicKey,
                    name: resolvedName
                };
            });
        } catch (err) {
            console.warn("Cascade: קריאת הפרופילים המקומית נכשלה", err);
            savedProfiles = [];
        }
    }

    // Cascade: מחזיר פרופיל קיים לפי הפאבליק קי
    function findProfileByPublicKey(publicKey) {
        return savedProfiles.find((profile) => profile.publicKey === publicKey) || null;
    }

    // Cascade: מעדכן או מוסיף פרופיל חדש לאוסף
    function upsertProfile(profile) {
        if (!profile || !profile.privateKey || !profile.publicKey) {
            return;
        }
        const sanitizedName = sanitizeProfileName(profile.name) || buildDefaultProfileName(profile.publicKey);
        const existing = findProfileByPublicKey(profile.publicKey);
        if (existing) {
            existing.name = sanitizedName;
            existing.privateKey = profile.privateKey;
        } else {
            savedProfiles.push({
                privateKey: profile.privateKey,
                publicKey: profile.publicKey,
                name: sanitizedName
            });
        }
        persistProfiles();
        persistProfileName(profile.publicKey, sanitizedName);
    }

    // Cascade: מסיר פרופיל מהאוסף ומעדכן אחסון
    function removeProfile(publicKey) {
        if (!publicKey) {
            return;
        }
        const initialLength = savedProfiles.length;
        savedProfiles = savedProfiles.filter((profile) => profile.publicKey !== publicKey);
        if (savedProfiles.length !== initialLength) {
            persistProfiles();
            clearProfileName(publicKey);
        }
    }

    // Cascade: מוודא שמוגדרת כותרת פרופיל פעיל
    function setActiveProfileName(name) {
        activeProfileName = sanitizeProfileName(name);
        if (!activeProfileName && activePublicKey) {
            activeProfileName = buildDefaultProfileName(activePublicKey);
        }
    }

    // Cascade: מחולל מפתח Hex אקראי באורך 64 תווים
    function generatePrivateKeyHex() {
        const bytes = new Uint8Array(32);
        window.crypto.getRandomValues(bytes);
        return Array.from(bytes)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    // Cascade: מנרמל קלט מפתח ממקור חיצוני
    function normalizePrivateKey(value) {
        if (!value) {
            return "";
        }
        const trimmed = value.trim();
        if (!trimmed) {
            return "";
        }
        if (trimmed.startsWith("nsec")) {
            const decoded = decodeNsec(trimmed);
            return decoded ? decoded.toLowerCase() : "";
        }
        const plain = trimmed.startsWith("0x") ? trimmed.slice(2) : trimmed;
        if (/^[0-9a-fA-F]{64}$/.test(plain)) {
            return plain.toLowerCase();
        }
        return "";
    }

    // Cascade: מנסה לפענח מפתח nsec בסיסי
    function decodeNsec(value) {
        try {
            const { words, prefix } = bech32Decode(value);
            if (!words || prefix !== "nsec") {
                return "";
            }
            const bytes = convertBits(words, 5, 8, false);
            if (!bytes || !bytes.length) {
                return "";
            }
            return Array.from(bytes)
                .map((byte) => byte.toString(16).padStart(2, "0"))
                .join("");
        } catch (err) {
            console.warn("Cascade: פענוח nsec נכשל", err);
            return "";
        }
    }

    // Cascade: מחיל את המפתח הפרטי כמשתמש הפעיל
    function applyActivePrivateKey(privateKey, options) {
        const normalized = normalizePrivateKey(privateKey);
        if (!normalized) {
            setImportStatus("המפתח שהוזן אינו חוקי.", "error");
            return;
        }
        const normalizedLower = normalized.toLowerCase();
        activePrivateKey = normalizedLower;
        if (window.localStorage) {
            localStorage.setItem(ACTIVE_KEY_STORAGE, normalizedLower);
        }
        activePublicKey = derivePublicKey(normalizedLower).toLowerCase();
        if (window.localStorage && activePublicKey) {
            localStorage.setItem(ACTIVE_PUB_STORAGE, activePublicKey);
        }
        const opts = options || {};
        const suppliedName = opts.profileName || (findProfileByPublicKey(activePublicKey)?.name) || loadProfileName(activePublicKey);
        setActiveProfileName(suppliedName);
        const profileRecord = {
            privateKey: normalizedLower,
            publicKey: activePublicKey,
            name: activeProfileName
        };
        upsertProfile(profileRecord);
        persistProfileMetadata(activePublicKey, {
            name: activeProfileName,
            picture: opts.profilePicture || ""
        });
        renderProfileGrid();
        updateAccountStatusBanner();
        updateAccountKeyBanner();
        if (logoutButton) {
            logoutButton.hidden = false;
        }
        if (loginButton) {
            loginButton.textContent = "🔄 החלף משתמש";
        }
        if (signupButton) {
            signupButton.hidden = true;
        }
        logRelayDebug("מפתח פרטי נטען והופק מפתח ציבורי", activePublicKey);
        initializePlaylists();
        initializeRelayConnections();
        scheduleRemoteSync({ immediate: true });
    }

    // Cascade: מנתק את המשתמש הפעיל ומחזיר את הממשק למסך בחירת פרופיל
    function handleLogout(options) {
        const opts = options || {};
        stopRelaySync();
        activePrivateKey = "";
        activePublicKey = "";
        setActiveProfileName("");
        lastPublishedPayload = "";
        lastRemoteEventTimestamp = 0;
        localLastUpdated = 0;
        playlists = [];
        currentPlaylistIndex = -1;
        savePlaylistsToStorage({ skipRemote: true });
        if (window.localStorage) {
            localStorage.removeItem(ACTIVE_KEY_STORAGE);
            localStorage.removeItem(ACTIVE_PUB_STORAGE);
        }
        persistProfileMetadata(publicKey, null);
        renderCassetteCarousel();
        toggleEmptyState();
        setTrackInfoDefault();
        updatePlaylistName();
        updateAccountStatusBanner();
        updateAccountKeyBanner();
        if (loginButton) {
            loginButton.textContent = "🔐 התחבר";
        }
        if (signupButton) {
            signupButton.hidden = false;
        }
        if (logoutButton) {
            logoutButton.hidden = true;
        }
        if (!opts.skipOverlay && savedProfiles.length) {
            openProfileOverlay();
        }
    }

    // Cascade: מעדכן את באנר המפתח הציבורי להצגה למשתמש הפעיל
    function updateAccountKeyBanner() {
        if (!accountKeyBanner || !accountPublicKeyElement) {
            return;
        }
        if (activePublicKey) {
            accountPublicKeyElement.textContent = activePublicKey;
            accountPublicKeyElement.setAttribute("title", activePublicKey);
            accountKeyBanner.hidden = false;
        } else {
            accountPublicKeyElement.textContent = "";
            accountPublicKeyElement.removeAttribute("title");
            accountKeyBanner.hidden = true;
        }
    }

    // Cascade: שכבת גיבוי להעתקת המפתח כאשר API מודרני לא זמין
    function fallbackCopyActiveKey(value) {
        if (!value) {
            return;
        }
        const tempInput = document.createElement("textarea");
        tempInput.value = value;
        tempInput.setAttribute("readonly", "");
        tempInput.style.position = "absolute";
        tempInput.style.left = "-9999px";
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand("copy");
            copyActiveKeyButton.textContent = "✅ הועתק";
        } catch (err) {
            console.warn("Cascade: העתקת המפתח נכשלה", err);
        }
        document.body.removeChild(tempInput);
        setTimeout(() => {
            copyActiveKeyButton.textContent = "העתק";
        }, 2000);
    }

    // Cascade: BECH32 דקודר מינימלי לצורך פענוח nsec
    function bech32Decode(str) {
        const alphabet = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
        const lower = str.toLowerCase();
        const split = lower.lastIndexOf("1");
        if (split === -1) {
            throw new Error("bech32: missing separator");
        }
        const prefix = lower.slice(0, split);
        const wordChars = lower.slice(split + 1);
        if (wordChars.length < 6) {
            throw new Error("bech32: word data too short");
        }
        const words = [];
        for (let i = 0; i < wordChars.length; i += 1) {
            const value = alphabet.indexOf(wordChars[i]);
            if (value === -1) {
                throw new Error("bech32: invalid character");
            }
            words.push(value);
        }
        return { prefix, words: words.slice(0, -6) };
    }

    // Cascade: המרת ביטים (5 ביטים ל-8 ביטים) עבור bech32
    function convertBits(data, fromBits, toBits, pad = true) {
        let acc = 0;
        let bits = 0;
        const maxv = (1 << toBits) - 1;
        const result = [];
        data.forEach((value) => {
            if (value < 0 || value >> fromBits !== 0) {
                throw new Error("convertBits: invalid value");
            }
            acc = (acc << fromBits) | value;
            bits += fromBits;
            while (bits >= toBits) {
                bits -= toBits;
                result.push((acc >> bits) & maxv);
            }
        });
        if (pad) {
            if (bits > 0) {
                result.push((acc << (toBits - bits)) & maxv);
            }
        } else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv)) {
            throw new Error("convertBits: invalid padding");
        }
        return Uint8Array.from(result);
    }

    // Cascade: גוזר מפתח ציבורי מתוך המפתח הפרטי בעזרת nostr-tools
    function derivePublicKey(privateKeyHex) {
        try {
            if (window.NostrTools && typeof window.NostrTools.getPublicKey === "function") {
                const pub = window.NostrTools.getPublicKey(privateKeyHex);
                return typeof pub === "string" ? pub.toLowerCase() : "";
            }
        } catch (err) {
            console.warn("Cascade: הפקת מפתח ציבורי נכשלה", err);
        }
        return "";
    }

    // Cascade: מחזיר טיימסטמפ עדכון מתוך localStorage למפתח הנוכחי
    function getLocalUpdatedTimestamp() {
        if (!window.localStorage || !activePrivateKey) {
            return 0;
        }
        const key = LAST_UPDATE_STORAGE_PREFIX + activePublicKey;
        const value = localStorage.getItem(key);
        const parsed = value ? Number(value) : 0;
        return Number.isFinite(parsed) ? parsed : 0;
    }

    // Cascade: קובע טיימסטמפ עדכון למפתח הנוכחי
    function setLocalUpdatedTimestamp(timestamp) {
        if (!window.localStorage || !activePrivateKey || !Number.isFinite(timestamp)) {
            return;
        }
        const key = LAST_UPDATE_STORAGE_PREFIX + activePublicKey;
        localStorage.setItem(key, String(timestamp));
        localLastUpdated = timestamp;
    }

    // Cascade: טוען שם פרופיל אם נשמר בנפרד עבור המפתח הציבורי
    function loadProfileName(publicKey) {
        if (!window.localStorage || !publicKey) {
            return "";
        }
        try {
            return localStorage.getItem(PROFILE_NAME_STORAGE_PREFIX + publicKey) || "";
        } catch (err) {
            return "";
        }
    }

    // Cascade: שומר שם פרופיל ותואם לפורמט אחסון המקורי
    function persistProfileName(publicKey, name) {
        if (!window.localStorage || !publicKey) {
            return;
        }
        try {
            const sanitized = sanitizeProfileName(name);
            if (sanitized) {
                localStorage.setItem(PROFILE_NAME_STORAGE_PREFIX + publicKey, sanitized);
            } else {
                clearProfileName(publicKey);
            }
        } catch (err) {
            console.warn("Cascade: שמירת שם הפרופיל נכשלה", err);
        }
    }

    // Cascade: מסיר שם פרופיל שנשמר עבור מפתח נתון
    function clearProfileName(publicKey) {
        if (!window.localStorage || !publicKey) {
            return;
        }
        try {
            localStorage.removeItem(PROFILE_NAME_STORAGE_PREFIX + publicKey);
        } catch (err) {
            console.warn("Cascade: מחיקת שם הפרופיל נכשלה", err);
        }
    }

    // Cascade: שומר/מנקה פרטי מטא פרופיל (שם/תמונה) לפי מפתח ציבורי
    function persistProfileMetadata(publicKey, metadata) {
        if (!window.localStorage || !publicKey) {
            return;
        }
        const storageKey = `cascade-car-player-profile-meta::${publicKey}`;
        try {
            if (metadata && (metadata.name || metadata.picture)) {
                const payload = JSON.stringify({
                    name: sanitizeProfileName(metadata.name),
                    picture: typeof metadata.picture === "string" ? metadata.picture : ""
                });
                localStorage.setItem(storageKey, payload);
            } else {
                localStorage.removeItem(storageKey);
            }
        } catch (err) {
            console.warn("Cascade: שמירת מטא-דאטה של פרופיל נכשלה", err);
        }
    }

    // Cascade: יוצר Pool של Nostr אם קיים
    function ensureNostrPool() {
        if (nostrPool) {
            return nostrPool;
        }
        if (!window.NostrTools || typeof window.NostrTools.SimplePool !== "function") {
            if (!nostrSupportWarningShown) {
                console.warn("Cascade: nostr-tools איננה זמינה – סנכרון ריליי אינו פעיל");
                nostrSupportWarningShown = true;
            }
            return null;
        }
        nostrPool = new window.NostrTools.SimplePool();
        logRelayDebug("SimplePool חדש נוצר", RELAY_URLS);
        return nostrPool;
    }

    // Cascade: מפעיל חיבורי ריליי ופותח מנוי לאירועי הפלייליסט של המשתמש
    function initializeRelayConnections() {
        const pool = ensureNostrPool();
        if (!pool || !activePublicKey) {
            return;
        }
        stopRelaySync();
        try {
            const filter = {
                kinds: [PLAYLIST_EVENT_KIND],
                authors: [activePublicKey],
                '#d': [PLAYLIST_EVENT_D_TAG]
            };
            logRelayDebug("נפתח מנוי לריליים עם פילטרים", filter);
            activeRelaySubscription = pool.subscribe(RELAY_URLS, filter, {
                onevent: (event) => onRelayEvent(event),
                oneose: () => {
                    logRelayDebug("הריליי סיים לשלוח אירועים ראשוניים");
                    if (relayPollingInterval) {
                        clearInterval(relayPollingInterval);
                    }
                    relayPollingInterval = setInterval(() => {
                        logRelayDebug("בדיקת אירועים חדשים מהריליי (poll)");
                        requestLatestFromRelay();
                    }, REMOTE_PULL_INTERVAL_MS);
                }
            });
            requestLatestFromRelay();
        } catch (err) {
            console.warn("Cascade: פתיחת החיבור לריליי נכשלה", err);
        }
    }

    // Cascade: שולח בקשה מפורשת לאירוע האחרון מהריליים
    function requestLatestFromRelay() {
        const pool = ensureNostrPool();
        if (!pool || !activePublicKey) {
            return;
        }
        const filter = {
            kinds: [PLAYLIST_EVENT_KIND],
            authors: [activePublicKey],
            '#d': [PLAYLIST_EVENT_D_TAG],
            limit: 1
        };
        try {
            logRelayDebug("שליחת בקשת LIST לאירוע האחרון", filter);
            pool.querySync(RELAY_URLS, filter).then((events) => {
                if (Array.isArray(events) && events.length) {
                    const newest = events.sort((a, b) => (b.created_at || 0) - (a.created_at || 0))[0];
                    logRelayDebug("אירוע פלייליסט התקבל מהריליי", newest);
                    onRelayEvent(newest);
                }
            });
        } catch (err) {
            console.warn("Cascade: כשל בקבלת אירועים מהריליי", err);
        }
    }

    // Cascade: מטפל באירוע ריליי שהתקבל עבור פלייליסטים
    function onRelayEvent(event) {
        if (!event || typeof event !== "object") {
            return;
        }
        if (event.kind !== PLAYLIST_EVENT_KIND) {
            return;
        }
        if (typeof event.pubkey !== "string" || event.pubkey !== activePublicKey) {
            return;
        }
        const createdAt = Number(event.created_at || 0) * 1000;
        if (!createdAt || createdAt <= lastRemoteEventTimestamp || createdAt <= localLastUpdated) {
            return;
        }
        let payload = null;
        try {
            payload = JSON.parse(event.content || "[]");
        } catch (err) {
            console.warn("Cascade: אירוע ריליי אינו מכיל JSON תקין", err);
            return;
        }
        if (!Array.isArray(payload)) {
            return;
        }
        logRelayDebug("אירוע ריליי עודכן ומיושם", { createdAt, רשימות: payload.length });
        isRestoringFromRemote = true;
        playlists = sanitizePlaylists(payload);
        lastRemoteEventTimestamp = createdAt;
        savePlaylistsToStorage({ updatedAt: createdAt, skipRemote: true });
        updatePlaylistName();
        renderCassetteCarousel();
        toggleEmptyState();
        if (playlists.length) {
            setTrackInfoLoading();
            reloadPlayer();
        }
        isRestoringFromRemote = false;
    }

    // Cascade: מתזמן פרסום לריליי בתום פרק זמן קצר
    function scheduleRemoteSync(options) {
        const opts = options || {};
        if (!activePrivateKey || !ensureNostrPool()) {
            return;
        }
        if (opts.immediate) {
            publishPlaylistsToRelay();
            return;
        }
        if (relaySyncTimer) {
            clearTimeout(relaySyncTimer);
        }
        relaySyncTimer = setTimeout(() => {
            publishPlaylistsToRelay();
        }, RELAY_SYNC_DEBOUNCE_MS);
    }

    // Cascade: מפרסם את רשימת הפלייליסטים לריליי כחלק מ-event יחיד
    function publishPlaylistsToRelay() {
        const pool = ensureNostrPool();
        if (!pool || !activePrivateKey || !activePublicKey) {
            return;
        }
        if (typeof window.NostrTools?.finalizeEvent !== "function") {
            console.warn("Cascade: finalizeEvent חסר – לא ניתן לפרסם לריליי");
            return;
        }
        const content = JSON.stringify(playlists);
        if (content === lastPublishedPayload) {
            logRelayDebug("הפלייליסטים לא השתנו – אין פרסום חדש");
            return;
        }
        const createdAt = Math.floor(Date.now() / 1000);
        const draft = {
            kind: PLAYLIST_EVENT_KIND,
            pubkey: activePublicKey,
            created_at: createdAt,
            tags: [
                ["d", PLAYLIST_EVENT_D_TAG],
                ["t", PLAYLIST_APP_TAG]
            ],
            content
        };
        let signed;
        try {
            signed = window.NostrTools.finalizeEvent(draft, activePrivateKey);
        } catch (err) {
            console.error("Cascade: חתימת האירוע נכשלה", err);
            return;
        }
        logRelayDebug("מתפרסם אירוע פלייליסט חדש", draft);
        const publishOperations = pool.publish(RELAY_URLS, signed);
        Promise.allSettled(publishOperations).then((results) => {
            const succeeded = results.filter((result) => result.status === "fulfilled");
            const failed = results.filter((result) => result.status === "rejected");
            failed.forEach((result) => {
                console.warn("Cascade: ריליי דחה את האירוע", result.reason);
            });
            if (!succeeded.length) {
                console.error("Cascade: אף ריליי לא קיבל את האירוע – נדרש טיפול", failed.map((item) => item.reason));
                return;
            }
            lastPublishedPayload = content;
            lastRemoteEventTimestamp = createdAt * 1000;
            setLocalUpdatedTimestamp(lastRemoteEventTimestamp);
            logRelayDebug("האירוע פורסם בהצלחה במספר ריליים", {
                eventId: signed.id,
                relaysAcknowledged: succeeded.length,
                relaysRejected: failed.length
            });
        });
    }

    // Cascade: עוצר סנכרון ריליי ומנקה טיימרים
    function stopRelaySync() {
        if (relaySyncTimer) {
            clearTimeout(relaySyncTimer);
            relaySyncTimer = null;
        }
        if (relayPollingInterval) {
            clearInterval(relayPollingInterval);
            relayPollingInterval = null;
        }
        if (activeRelaySubscription && typeof activeRelaySubscription.close === "function") {
            try {
                activeRelaySubscription.close("Cascade: עצירת סנכרון ידני");
            } catch (err) {
                console.warn("Cascade: סגירת המנוי הפעיל נכשלה", err);
            }
            activeRelaySubscription = null;
        }
        if (nostrPool) {
            try {
                nostrPool.close(RELAY_URLS);
                logRelayDebug("החיבור לריליי נסגר");
            } catch (err) {
                console.warn("Cascade: סגירת החיבור לריליי נכשלה", err);
            }
            nostrPool = null;
        }
        lastPublishedPayload = "";
        lastRemoteEventTimestamp = 0;
    }

    // Cascade: לוכד פוקוס בתוך מודל החשבון כאשר הוא פתוח
    function trapFocus(event) {
        if (!Array.isArray(accountModalFocusTrap) || !accountModalFocusTrap.length) {
            return;
        }
        const first = accountModalFocusTrap[0];
        const last = accountModalFocusTrap[accountModalFocusTrap.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    // חשיפת פונקציות לגלובל כדי שקריאות מה-HTML יפעלו
    document.addEventListener("DOMContentLoaded", () => {
        initializeAccountSystem();
    });

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReadyInternal;
    window.playVideo = playVideo;
    window.nextTrack = nextTrack;
    window.previousTrack = previousTrack;
    window.nextPlaylist = nextPlaylist;
    window.previousPlaylist = previousPlaylist;
    window.toggleShuffle = toggleShuffle;
    window.shufflePlaylist = shufflePlaylist;
    window.goBack = goBack;
    window.buttonClickEffect = buttonClickEffect;
    window.togglePlay = togglePlay;
})();
