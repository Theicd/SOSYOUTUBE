/* Cascade: הלוגיקה הראשית של נגן קלטות דיגיטליות לרכב */
(function () {
    const ACTIVE_KEY_STORAGE = "cascade-car-player-active-key";
    const ACTIVE_PUB_STORAGE = "cascade-car-player-active-pub";
    const PLAYLIST_STORAGE_PREFIX = "cascade-car-player-playlists::";
    const LAST_UPDATE_STORAGE_PREFIX = "cascade-car-player-updated-at::";
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
    const RELAY_SYNC_DEBOUNCE_MS = 1500;
    const REMOTE_PULL_INTERVAL_MS = 30000;
    const defaultPlaylists = [];

    /** @type {{name:string,id:string,thumbnail?:string,hydrated?:boolean}[]} */
    let playlists = [];
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
    let isRestoringFromRemote = false;
    let lastRemoteEventTimestamp = 0;
    let lastPublishedPayload = "";
    let localLastUpdated = 0;
    let nostrSupportWarningShown = false;

    const trackTitleElement = document.getElementById("trackTitle");
    const trackMetaElement = document.getElementById("trackMeta");
    const carouselElement = document.getElementById("cassetteCarousel");
    const shelfPrevButton = document.getElementById("shelfPrev");
    const shelfNextButton = document.getElementById("shelfNext");
    const hydratingPlaylists = new Set();
    const htmlDecoder = document.createElement("textarea");
    const accountButton = document.getElementById("accountButton");
    const accountStatusLabel = document.getElementById("accountStatus");
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
    const accountModalFocusTrap = [];

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

    // Cascade: קורא פלייליסטים שנשמרו מקומית
    function loadPlaylistsFromStorage() {
        if (!activePrivateKey) {
            return [];
        }
        try {
            const storageKey = PLAYLIST_STORAGE_PREFIX + activePrivateKey;
            const raw = window.localStorage ? localStorage.getItem(storageKey) : null;
            const parsed = raw ? JSON.parse(raw) : null;
            return Array.isArray(parsed) ? parsed : null;
        } catch (err) {
            console.warn("שגיאה בקריאת הפלייליסטים המקומיים", err);
            return null;
        }
    }

    // Cascade: שומר פלייליסטים לשימוש עתידי
    function savePlaylistsToStorage(options) {
        const opts = options || {};
        const updatedAtOverride = typeof opts.updatedAt === "number" ? opts.updatedAt : null;
        const skipRemote = Boolean(opts.skipRemote);
        try {
            if (!window.localStorage || !activePrivateKey) {
                return;
            }
            const storageKey = PLAYLIST_STORAGE_PREFIX + activePrivateKey;
            if (!window.localStorage) {
                return;
            }
            if (updatedAtOverride !== null && !Number.isNaN(updatedAtOverride)) {
                setLocalUpdatedTimestamp(updatedAtOverride);
            } else if (!isRestoringFromRemote) {
                setLocalUpdatedTimestamp(Date.now());
            }
            localStorage.setItem(storageKey, JSON.stringify(playlists));
            if (!isRestoringFromRemote && !skipRemote) {
                scheduleRemoteSync();
            }
        } catch (err) {
            console.warn("שגיאה בשמירת הפלייליסטים", err);
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
        let text = message;
        if (!text) {
            text = activePrivateKey
                ? "משתמש מחובר – הקלטות נשמרות באופן מקומי למפתח שלך."
                : "אין משתמש מחובר. לחץ על \"התחבר / הירשם\" כדי לקבל מפתח אישי.";
        }
        accountStatusLabel.textContent = text;
        accountStatusLabel.classList.toggle("status-warning", !activePrivateKey || tone === "warning");
    }

    // Cascade: מאתחל את מערכת המפתחות והחשבון
    function initializeAccountSystem() {
        bindAccountEvents();
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
        if (accountButton) {
            accountButton.focus();
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
        if (accountButton) {
            accountButton.onclick = () => openAccountModal();
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
    function openAccountModal() {
        if (!accountModal) {
            return;
        }
        accountModal.classList.add("is-open");
        accountModal.setAttribute("aria-hidden", "false");
        if (importKeyInput) {
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
        applyActivePrivateKey(normalized, { silent: false });
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
        applyActivePrivateKey(pendingGeneratedKey, { silent: false });
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
            return decoded;
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
        activePrivateKey = normalized;
        if (window.localStorage) {
            localStorage.setItem(ACTIVE_KEY_STORAGE, normalized);
        }
        updateAccountStatusBanner(`משתמש מחובר עם מפתח ${normalized.slice(0, 6)}…${normalized.slice(-6)}.`);
        initializePlaylists();
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
