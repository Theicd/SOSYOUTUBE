const SITE_URL = "https://cdn.nagishexpress.co.il";

// const SITE_URL = "http://127.0.0.1:8000";

let LICENCE = "";

let POSITION = "";

let SIZE = "";

let LANGUAGE = "";

let shapeType = "";

let iconType = "";

let iconTypeUrl = "";

let hideMobile = "";

let positionHorizontal = "";

let positionVertical = "";

let positionX = "";

let positionY = "";

let ShowSideBarOnLeft = "";

let multilanguage = "";

let enableEN = "";

let enableHE = "";

let enableRU = "";

let enableAR = "";

let ButtonbgColor = "";

let ButtonIconColor = "";

let Devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

var myScript = document.currentScript,

urlString = myScript.getAttribute('src');



let paramString = urlString.split('?')[1];

let queryString = new URLSearchParams(paramString);

for(let pair of queryString.entries()) {

    if(pair[0] == 'licence'){

        LICENCE = pair[1];

    }

    

    if(pair[0] == 'data-size'){

        SIZE = pair[1];

    }

    

    if(pair[0] == 'data-language'){

        LANGUAGE = pair[1];

    }



    if(pair[0] == 'data-hideMobile'){

        hideMobile = pair[1];

    }



    if(pair[0] == 'data-ShowSideBarOnLeft'){

        ShowSideBarOnLeft = pair[1];

    }

    

    if(pair[0] == 'data-ButtonColor'){

        ButtonbgColor = pair[1];

    }



    if(pair[0] == 'data-ButtonBackground'){

        ButtonIconColor = pair[1];

    }

    

    if(pair[0] == 'data-multilanguage'){

        multilanguage = pair[1];

    }

    

    if(pair[0] == 'data-enableEN'){

        enableEN = pair[1];

    }

    if(pair[0] == 'data-enableHE'){

        enableHE = pair[1];

    }

    if(pair[0] == 'data-enableRU'){

        enableRU = pair[1];

    }

    if(pair[0] == 'data-enableAR'){

        enableAR = pair[1];

    }

    

    if(pair[0] == 'data-position'){

            switch(pair[1]) {

            case "1":

                POSITION = "top_left";

                break;

            case "2":

                POSITION = "top_center";

                break;

            case "3":

                POSITION = "top_right";

                break;

            case "4":

                POSITION = "center_left";

                break;

            case "5":

                POSITION = "center_right";

                break;

            case "6":

                POSITION = "bottom_left";

                break;

            case "7":

                POSITION = "bottom_center";

                break;

            case "8":

                POSITION = "bottom_right";

                break;

            default:

                POSITION = "";

            }

            

        }



        if(pair[0] == 'data-shapeType'){

            switch(pair[1]) {

            case "1":

                shapeType = "square";

                break;

            case "2":

                shapeType = "square_rounded";

                break;

            case "3":

                shapeType = "half_left_circle";

                break;

            case "4":

                shapeType = "half_right_circle";

                break;

            case "5":

                shapeType = "circle";

                break;

            default:

                shapeType = "";

            }

        }

        

        if(pair[0] == 'data-iconType'){

            switch(pair[1]) {

            case "1":

                iconType = "button_icon_1";

                break;

            case "2":

                iconType = "button_icon_2";

                break;

            case "3":

                iconType = "button_icon_3";

                break;

            case "4":

                iconType = "button_icon_file";

                break;

            default:

                iconType = "";

            }

        }

        if(pair[0] == 'data-iconTypeUrl'){

            iconTypeUrl = pair[1];

        }



 



        if(pair[0] == 'data-positionHorizontal'){

            positionHorizontal = pair[1];

        }



        if(pair[0] == 'data-positionVertical'){

            positionVertical = pair[1];

        }



        if(pair[0] == 'data-positionX'){

            positionX = pair[1];

        }



        if(pair[0] == 'data-positionY'){

            positionY = pair[1];

        }

    

    if(Devicewidth > 767){

        

 

    }else{

        if(pair[0] == 'data-mobile-position'){

            switch(pair[1]) {

              case "1":

                POSITION = "top_left";

                break;

              case "2":

                POSITION = "top_center";

                break;

              case "3":

                POSITION = "top_right";

                break;

              case "4":

                POSITION = "center_left";

                break;

              case "5":

                POSITION = "center_right";

                break;

              case "6":

                POSITION = "bottom_left";

                break;

              case "7":

                POSITION = "bottom_center";

                break;

              case "8":

                POSITION = "bottom_right";

                break;

              default:

                POSITION = "";

            }

            

        }



        if(pair[0] == 'data-mobilesize'){

            SIZE = pair[1];

        }



        if(pair[0] == 'data-mobileshapeType'){

            switch(pair[1]) {

              case "1":

                shapeType = "square";

                break;

              case "2":

                shapeType = "square_rounded";

                break;

              case "3":

                shapeType = "half_left_circle";

                break;

              case "4":

                shapeType = "half_right_circle";

                break;

              case "5":

                shapeType = "circle";

                break;

              default:

                shapeType = "";

            }

        }



        if(pair[0] == 'data-mobileiconType'){

            switch(pair[1]) {

              case "1":

                iconType = "button_icon_1";

                break;

              case "2":

                iconType = "button_icon_2";

                break;

              case "3":

                iconType = "button_icon_3";

                break;

              case "4":

                iconType = "button_icon_file";

                break;

              default:

                iconType = "";

            }

        }



        if(pair[0] == 'data-mobileiconTypeUrl'){

            iconTypeUrl = pair[1];

        }



        if(pair[0] == 'data-positionMobileHorizontal'){

            positionHorizontal = pair[1];

        }

    

        if(pair[0] == 'data-positionMobileVertical'){

            positionVertical = pair[1];

        }

    

        if(pair[0] == 'data-positionMobileX'){

            positionX = pair[1];

        }

    

        if(pair[0] == 'data-positionMobileY'){

            positionY = pair[1];

        }



    }



}

function createnagishWidget(widgetSettingData = '', isActive = true, IsMultiSite = false){

    

    if(widgetSettingData != ''){

        var widgetData =  JSON.parse(widgetSettingData, null, 2);

        console.log(widgetData); 

        if(widgetData.customcode && widgetData.customcode != undefined){
            
            var customCss = widgetData.customcode.custom_css;
        //   console.log(customCss);
			// Check if customCss is not empty (after trimming whitespace)
			if (customCss && customCss.trim() !== '') {
				// Create a new <style> element
				var styleElem = document.createElement('style');
				
				// Set its contents to the custom CSS
				styleElem.textContent = customCss;
				
				// Insert the <style> element at the beginning of the <body>
				document.body.prepend(styleElem);
				
				// console.log(customCss);
			}
					
            var customJS = widgetData.customcode.custom_js;
            
			
			// Check if customJS is not empty (after trimming whitespace)
			if (customJS && customJS.trim() !== '') {
				// Create a new <script> element
				var scriptElem = document.createElement('script');
				
				// Set its contents to the custom JS code
				scriptElem.textContent = customJS;
				
				// Append the <script> element to the <body>
				document.body.append(scriptElem);
				
				// console.log(customJS);
			}

        }


        let languageText = {

            en: { 

                accessibility_statement : "Accessibility Statement",

                reset_settings : "Reset Settings",

                cognitive_disability_profile : "Cognitive Disability Profile",

                adhd_profile : "ADHD Profile",

                highlight_links : "Highlight Links",

                keyboard_navigation : "Keyboard navigation",

                remove_animations : "Remove Animations",

                word_spacing : "Word spacing",

                image_description : "Image description",

                letter_spacing : "Letter spacing",

                line_height : "Line height",

                large_cursor : "Large cursor",

                hide_images : "Hide images",

                table_of_contents : "Table of contents",

                mute_volume : "Mute volume",

                fonts_settings : "Fonts settings",

                reset_font_size : "Reset font size",

                readable_font : "Readable Font",

                small_font : "Decrease A-",

                large_font : "Increase A+",

                align_left : "Align Left",

                align_center : "Align Center",

                align_right : "Align Right",

                color_settings : "Color Settings",

                adjust_contrast : "Adjust contrast",

                invert_colors : "Invert Colors",

                sepia : "Sepia",

                monochrome : "Monochrome",

                close : "Close",

                report_problem : "Report a problem",

                adjust_background_colors : "Adjust background colors",

                title_colors : "Title colors",

                text_colors : "Text Colors",

                link_colors : "Link Colors",

                greyscale_images : "Greyscale image",

                underline_links : "Underline links",

                text2speech_button_title : "Screen Reader",

                enlargetext_button_title : "Enlarging texts"

            },

            "he": {

                accessibility_statement : "הצהרת נגישות",

                reset_settings : "איפוס הגדרות",

                cognitive_disability_profile : "פרופיל מוגבלות קוגניטיבית",

                adhd_profile : "פרופיל ADHD",

                highlight_links : "הדגש קישורים",

                keyboard_navigation : "ניווט מקלדת",

                remove_animations : "הסר אנימציות",

                word_spacing : "ריווח מילים",

                image_description : "תיאור תמונה",

                letter_spacing : "ריווח אותיות",

                line_height : "גובה קו",

                large_cursor : "סמן גדול",

                hide_images : "הסתר תמונות",

                table_of_contents : "תוכן העניינים",

                mute_volume : "השתקת עוצמת הקול",

                fonts_settings : "הגדרות גופנים",

                reset_font_size : "אפס את גודל הגופן",

                readable_font : "גופן קריא",

                small_font : "הקטנת A-",

                large_font : "הגדל את A+",

                align_left : "יישר שמאלה",

                align_center : "יישר למרכז",

                align_right : "ליישור מימין",

                color_settings : "הגדרות צבע",

                adjust_contrast : "התאם את הניגודיות",

                invert_colors : "הפוך צבעים",

                sepia : "חום ככה",

                monochrome : "מונוכרום",

                close : "סגור",

                report_problem : "דווח על בעיה",

                adjust_background_colors : "התאם את צבעי הרקע",

                title_colors : "צבעי כותרת",

                text_colors : "צבעי טקסט",

                link_colors : "צבעי קישור",

                greyscale_images : "תמונה בגווני אפור",

                underline_links : "קו תחתון של קישורים",

                text2speech_button_title : "קורא מסך",

                enlargetext_button_title : "הגדלת טקסטים"

            },

            "ar": {

                accessibility_statement : "بيان إمكانية الوصول",

                reset_settings : "اعادة الضبط",

                cognitive_disability_profile : "ملف الإعاقة الإدراكية",

                adhd_profile : "الملف الشخصي لاضطراب فرط الحركة ونقص الانتباه",

                highlight_links : "تسليط الضوء على الروابط",

                keyboard_navigation : "التنقل عبر لوحة المفاتيح",

                remove_animations : "إزالة الرسوم المتحركة",

                word_spacing : "تباعد الكلمات",

                image_description : "وصف الصورة",

                letter_spacing : "تباعد الحروف",

                line_height : "ارتفاع خط",

                large_cursor : "مؤشر كبير",

                hide_images : "إخفاء الصور",

                table_of_contents : "جدول المحتويات",

                mute_volume : "كتم الصوت",

                fonts_settings : "إعدادات الخطوط",

                reset_font_size : "إعادة ضبط حجم الخط",

                readable_font : "الخط القابل للقراءة",

                small_font : "النقصان أ-",

                large_font : "زيادة أ+",

                align_left : "محاذاة لليسار",

                align_center : "محاذاة المركز",

                align_right : "محاذاة اليمين",

                color_settings : "إعدادات الألوان",

                adjust_contrast : "ضبط التباين",

                invert_colors : "عكس الألوان",

                sepia : "بني داكن",

                monochrome : "أحادية اللون",

                close : "يغلق",

                report_problem : "الإبلاغ عن مشكلة",

                adjust_background_colors : "ضبط ألوان الخلفية",

                title_colors : "ألوان العنوان",

                text_colors : "ألوان النص",

                link_colors : "ألوان الارتباط",

                greyscale_images : "صورة ذات تدرج رمادي",

                underline_links : "تسطير الروابط",

                text2speech_button_title : "قارئ الشاشة",

                enlargetext_button_title : "تكبير النصوص"

            },

            "ru": {

                accessibility_statement : "Заявление о доступности",

                reset_settings : "Сбросить настройки",

                cognitive_disability_profile : "Профиль когнитивной инвалидности",

                adhd_profile : "Профиль СДВГ",

                highlight_links : "Выделить ссылки",

                keyboard_navigation : "Навигация с помощью клавиатуры",

                remove_animations : "Удалить анимацию",

                word_spacing : "Расстояние между словами",

                image_description : "Расстояние между словами",

                letter_spacing : "Межбуквенное расстояние",

                line_height : "Высота линии",

                large_cursor : "Большой курсор",

                hide_images : "Скрыть изображения",

                table_of_contents : "Оглавление",

                mute_volume : "Отключить звук",

                fonts_settings : "Настройки шрифтов",

                reset_font_size : "Сбросить размер шрифта",

                readable_font : "Читабельный шрифт",

                small_font : "Уменьшить А-",

                large_font : "Увеличение А+",

                align_left : "Выровнять по левому краю",

                align_center : "Выровнять по левому краю",

                align_right : "Выровнять по правому краю",

                color_settings : "Настройки цвета",

                adjust_contrast : "Отрегулируйте контраст",

                invert_colors : "Инвертировать цвета",

                sepia : "Сепия",

                monochrome : "Монохромный",

                close : "Закрывать",

                report_problem : "Сообщить о проблеме",

                adjust_background_colors : "Настройте цвета фона",

                title_colors : "Цвета заголовка",

                text_colors : "Цвета текста",

                link_colors : "Цвета ссылок",

                greyscale_images : "Изображение в оттенках серого",

                underline_links : "Подчеркнуть ссылки",

                text2speech_button_title : "Читатель экрана",

                enlargetext_button_title : "Увеличение текста"

            }

        };



        

        

        var enable_multilang_support = 'ng_display_none';

        if(widgetData.layout.enable_i18n_support == true && widgetData.layout.enable_i18n_support != undefined){

            enable_multilang_support = '';

        }else if(multilanguage == 1){

            enable_multilang_support = '';

        }

        var selectedlanguage = "he";

        if(LANGUAGE != ""){

            selectedlanguage = LANGUAGE;

            switch(LANGUAGE){

                case 'en' :

                    enableEN = 1;

                    break;

                case 'he' :

                   enableHE = 1; 

                    break;

                case 'ru' :

                   enableRU = 1; 

                    break;

                case 'ar' :

                   enableAR = 1; 

                   break;

            }

        }

        

        var selectedlanguageText = "עברית";

        if(nggetCookie('active_language_selected') != ''){

            if(nggetCookie('active_language_selected') == 'en' || nggetCookie('active_language_selected') == 'ar' || nggetCookie('active_language_selected') == 'ru' || nggetCookie('active_language_selected') == 'he'){

                selectedlanguage = nggetCookie('active_language_selected');

            }

        }

        

        if(selectedlanguage == 'en'){

            selectedlanguageText = "English";

        }



        if(selectedlanguage == 'ru'){

            selectedlanguageText = "Pусский";

        }



        if(selectedlanguage == 'ar'){

            selectedlanguageText = "عربي";

        }

        

        // Button Object management

        var buttonColor = '#000000';

        var button_color_type = 'solid';

        var button_icon_var = "button_icon_1";

        var button_icon = "";

        var button_size = "50px";

        if(iconTypeUrl != ""){

            button_size = "max-content";

        }else{

            if(SIZE == "small"){

                button_size = "30px";

            }else if(SIZE == "large"){

                button_size = "80px";

            }else if(SIZE == "medium"){

                button_size = "50px";

            }   

        }

        

        

        if(positionVertical != "" && positionHorizontal != ""){

            POSITION = positionVertical+'_'+positionHorizontal;

        }

        

        if(POSITION != ""){

            logoposition = POSITION;

        }else{

            logoposition = "bottom_right";

        }

        

        const posArr = logoposition.split("_", 2);

        logopositionside1 = posArr[0];

        logopositionside2 = posArr[1];

        

        var positionClassSide1 = 'bottom';

        var positionClassSide2 = 'right';

        var positionValueSide1 = '30px';

        var positionValueSide2 = '10px';

        var shape_type = "ng_shape_circle";

        var hide_on_mobile = "";

        var show_sidebar_left = "";



        if(ButtonbgColor != ""){

            buttonColor = ButtonbgColor;

        }else{

            if(widgetData.button.button_color != '' && widgetData.button.button_color != undefined){

                buttonColor = widgetData.button.button_color;

            }

        }

        



        if(widgetData.button.button_color_type != '' && widgetData.button.button_color_type != undefined){

            button_color_type = widgetData.button.button_color_type;

        }

        



        if(widgetData.button.button_icon != '' && widgetData.button.button_icon != undefined){

            button_icon_var = widgetData.button.button_icon;

        }

            

            if(iconType != ''){

                button_icon_var = iconType;

            }

            

            if(iconTypeUrl != ""){

                button_icon_var =  "button_icon_file";

            }

            

            if(button_icon_var == 'button_icon_file'){

                var button_icon_var_file =  widgetData.button.button_icon_file;

                if(iconTypeUrl != ""){

                    button_icon_var_file =  iconTypeUrl;

                }

                

                if(button_icon_var_file != ''){

                    button_icon = '<img src="'+button_icon_var_file+'" />';

                }

                

            }else{

                

                var button_icon_color = "#FFFFFF";



                if(ButtonIconColor != ""){

                    button_icon_color = ButtonIconColor;

                }else{

                    if(widgetData.button.button_icon_color != ""){

                        button_icon_color = widgetData.button.button_icon_color;

                    }

                }



                





                if(button_icon_var == "button_icon_3"){

                    button_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24.274 24.274">

                    <path id="eye-low-vision" d="M24.951,23.391,2.883,1.323a1.1,1.1,0,1,0-1.56,1.56L6.437,8A18.757,18.757,0,0,0,2.1,13.137c4.3,7.263,10.478,9.394,15.885,6.412l5.4,5.4a1.1,1.1,0,1,0,1.56-1.56ZM13.137,16.447a3.29,3.29,0,0,1-2.979-4.729l4.4,4.4a3.279,3.279,0,0,1-1.419.331Zm1.7-6.291,3.327-3.327A12.878,12.878,0,0,1,19.7,7.861l-3.577,3.577Zm2.453,2.453,3.653-3.654a17.554,17.554,0,0,1,1.228,1.335l-3.6,3.6ZM11.214,6.533l-.728-.728a9.64,9.64,0,0,1,1.8-.342Zm2.453,2.452L12.385,7.7,14.547,5.54a9.892,9.892,0,0,1,2.03.534Zm6.074,6.074,3.441-3.441c.338.482.67.982.989,1.519a20.866,20.866,0,0,1-2.707,3.647Z" transform="translate(-1 -1)" fill="`+button_icon_color+`"></path>

                </svg>`;

                }else if(button_icon_var == "button_icon_2"){

                    button_icon = `<svg id="accessibility" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 34.614 34.614">

                    <path id="Path_50" data-name="Path 50" d="M0,0H34.614V34.614H0Z" fill="none"></path>

                    <path id="Path_51" data-name="Path 51" d="M28.5,9.2a1.5,1.5,0,0,0-1.788-1.082,51.118,51.118,0,0,1-10.831,1.1,51.118,51.118,0,0,1-10.831-1.1,1.492,1.492,0,0,0-.707,2.9A55.045,55.045,0,0,0,11.557,12.1V29.4a1.442,1.442,0,0,0,2.884,0V22.191h2.884V29.4a1.442,1.442,0,1,0,2.884,0V12.1a54.468,54.468,0,0,0,7.2-1.082A1.489,1.489,0,0,0,28.5,9.2ZM15.884,7.769A2.884,2.884,0,1,0,13,4.884,2.893,2.893,0,0,0,15.884,7.769Z" transform="translate(1.423 0.884)" fill="`+button_icon_color+`"></path>

                </svg>`;

                }else{

                    button_icon = `<svg id="Group_13" data-name="Group 13" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 23.576 27.628">

                        <defs>

                            <clipPath id="clip-path">

                            <rect id="Rectangle_11" data-name="Rectangle 11" width="23.576" height="27.628" fill="#fff"></rect>

                            </clipPath>

                        </defs>

                        <g id="Group_12" data-name="Group 12" clip-path="url(#clip-path)">

                            <path id="Path_33" data-name="Path 33" d="M19.424,22.256H16.662l-4.052-7h-8.1L3.4,4.574A1.4,1.4,0,0,1,4.505,3.1,1.4,1.4,0,0,1,5.979,4.205L6.9,12.494h7.183l4.052,7h1.289a1.259,1.259,0,0,1,1.289,1.289,1.314,1.314,0,0,1-1.289,1.474" transform="translate(2.862 2.61)" fill="`+button_icon_color+`"></path>

                            <path id="Path_34" data-name="Path 34" d="M9.946,23.2A9.9,9.9,0,0,1,0,13.253,9.518,9.518,0,0,1,3.684,5.517,1.417,1.417,0,0,1,5.526,5.7a1.417,1.417,0,0,1-.184,1.842,6.667,6.667,0,0,0-2.763,5.71,7.389,7.389,0,0,0,7.368,7.368,7.074,7.074,0,0,0,4.6-1.658,1.309,1.309,0,0,1,1.658,2.026A10,10,0,0,1,9.946,23.2" transform="translate(0 4.429)" fill="`+button_icon_color+`"></path>

                            <path id="Path_35" data-name="Path 35" d="M5.31,0A2.21,2.21,0,1,1,3.1,2.21,2.21,2.21,0,0,1,5.31,0" transform="translate(2.61)" fill="`+button_icon_color+`"></path>

                            <path id="Path_36" data-name="Path 36" d="M11.168,6.971H5.089A1.259,1.259,0,0,1,3.8,5.681,1.259,1.259,0,0,1,5.089,4.392h6.078a1.259,1.259,0,0,1,1.289,1.289,1.259,1.259,0,0,1-1.289,1.289" transform="translate(3.199 3.698)" fill="`+button_icon_color+`"></path>

                            <path id="Path_37" data-name="Path 37" d="M11.772,8.374H6.856a.969.969,0,0,1,0-1.938h4.916a.969.969,0,0,1,0,1.938" transform="translate(4.956 5.418)" fill="`+button_icon_color+`"></path>

                            <path id="Path_38" data-name="Path 38" d="M12.712,5.59,10.38,9.817A.969.969,0,1,1,8.7,8.856L11.03,4.629a.969.969,0,1,1,1.682.961" transform="translate(7.208 3.479)" fill="`+button_icon_color+`"></path>

                        </g>

                    </svg>`;

                }



                

            }

            

        if(hideMobile != "" ){

            if(hideMobile == "true"){

                hide_on_mobile = "ng_hide_on_mobile";

            }else{

                hide_on_mobile = "";

            }

            

        }else{

            if(widgetData.button.hide_on_mobile == true && widgetData.button.hide_on_mobile != undefined){

                hide_on_mobile = "ng_hide_on_mobile";

            }

        }

        



        if(widgetData.button.show_sidebar_left != undefined && widgetData.button.show_sidebar_left == true){

            if(ShowSideBarOnLeft != '' && ShowSideBarOnLeft == 0){

                show_sidebar_left = "";

            }else{

                show_sidebar_left = "ng_show_sidebar_left";

            }

            

        }else{

            if(ShowSideBarOnLeft == 1){

                show_sidebar_left = "ng_show_sidebar_left";

            }else{

                show_sidebar_left = "";

            }

            

        }



        

        if(Devicewidth > 767){

            // desktop button CSS

            if(widgetData.button.desktop.button_size != '' && widgetData.button.desktop.button_size != undefined){

                if(iconTypeUrl != ""){

                    button_size = "max-content";

                }else{

                    if(SIZE == "small"){

                        button_size = "30px";

                    }else if(SIZE == "large"){

                        button_size = "80px";

                    }else if(SIZE == "medium"){

                        button_size = "50px";

                    }else{

                        button_size = widgetData.button.desktop.button_size+"px";

                    }  

                }

                

                

            }



            if(widgetData.button.desktop.custom_logo_position == true && widgetData.button.desktop.custom_logo_position != undefined){

                if(widgetData.button.desktop.logoposition != '' && widgetData.button.desktop.logoposition != undefined){

                    if(POSITION != ""){

                        logoposition = POSITION;

                    }else{

                        logoposition = widgetData.button.desktop.logoposition;

                    }

                    

                    const posArr = logoposition.split("_", 2);

                    logopositionside1 = posArr[0];

                    logopositionside2 = posArr[1];

                    positionClassSide1 = logopositionside1;

                    positionClassSide2 = logopositionside2;

                    if(positionY != ""){

                        positionValueSide1 = positionY;

                    }else{

                        positionValueSide1 = widgetData.button.desktop.position[1].distance+"px";

                    }

                    

                    if(positionX != ""){

                        positionValueSide2 = positionX;

                    }else{

                        positionValueSide2 = widgetData.button.desktop.position[0].distance+"px";

                    }



                    

                }

            }



            if(shapeType != ''){

                shape_type = "ng_shape_"+shapeType;

            }else{

                if(widgetData.button.desktop.shape_type != '' && widgetData.button.desktop.shape_type != undefined){

                    shape_type = "ng_shape_"+widgetData.button.desktop.shape_type;

                }

            }

            



        }else{

            // Mobile button CSS

            if(widgetData.button.mobile.button_size != '' && widgetData.button.mobile.button_size != undefined){

                if(iconTypeUrl != ""){

                    button_size = "max-content";

                }else{

                    if(SIZE == "small"){

                        button_size = "30px";

                    }else if(SIZE == "large"){

                        button_size = "80px";

                    }else if(SIZE == "medium"){

                        button_size = "50px";

                    }else{

                        button_size = widgetData.button.mobile.button_size+"px";

                    }  

                }

            }



            if((widgetData.button.mobile.custom_logo_position == true && widgetData.button.mobile.custom_logo_position != undefined) || POSITION != ""){

                if(widgetData.button.mobile.logoposition != '' && widgetData.button.mobile.logoposition != undefined){

                    if(POSITION != ""){

                        logoposition = POSITION;

                    }else{

                        logoposition = widgetData.button.mobile.logoposition;

                    }

                    const posArr = logoposition.split("_", 2);

                    logopositionside1 = posArr[0];

                    logopositionside2 = posArr[1];

                    // positionClassSide1 = widgetData.button.mobile.position[0].from;

                    // positionClassSide2 = widgetData.button.mobile.position[1].from;

                    positionClassSide1 = logopositionside1;

                    positionClassSide2 = logopositionside2;



                    if(positionY != ""){

                        positionValueSide1 = positionY;

                    }else{

                        positionValueSide1 = widgetData.button.mobile.position[1].distance+"px";

                    }

                     

                    if(positionX != ""){

                        positionValueSide2 = positionX;

                    }else{

                        positionValueSide2 = widgetData.button.mobile.position[0].distance+"px";

                    }

                }

            }



            if(shapeType != ''){

                shape_type = "ng_shape_"+shapeType;

            }else{

                if(widgetData.button.mobile.shape_type != '' && widgetData.button.mobile.shape_type != undefined){

                    shape_type = "ng_shape_"+widgetData.button.mobile.shape_type;

                }

            }

        }

        



        // main tab section and its tiles

        var accessibility_statement_button = "Accessibility statement button";

        var accessibility_statement_content = "<p>Accessibility statement content</p>";

        var adhd_button_title = "ADHD button - title";

        var clear_cookies_title = "Clear cookies - title";

        var close_button_title = "Close button - title";

        var cognitive_disability_profile_button_title = "Cognitive Disability Profile button - title";

        var speech_button_title = "ניווט קול";

        var zoom_button_title = "הגדלת טקסטים";

        var greyscale_images_button_title = "Greyscale Images button - title";

        var invert_button_title = "Invert button - title";

        var mute_volume_title = "Mute volume - title";



        if(widgetData.main.accessibility_statement_content != '' && widgetData.main.accessibility_statement_content != undefined){

            accessibility_statement_content = widgetData.main.accessibility_statement_content;

        }

    if(selectedlanguage == 'he'){

        if(widgetData.main.accessibility_statement_button != '' && widgetData.main.accessibility_statement_button != undefined){

            accessibility_statement_button = widgetData.main.accessibility_statement_button;

        }else{

            accessibility_statement_button = languageText.he.accessibility_statement;

        }



        if(widgetData.main.adhd_button_title != '' && widgetData.main.adhd_button_title != undefined){

            adhd_button_title = widgetData.main.adhd_button_title;

        }else{

            adhd_button_title = languageText.he.adhd_profile;

        }



        if(widgetData.main.clear_cookies_title != '' && widgetData.main.clear_cookies_title != undefined){

            clear_cookies_title = widgetData.main.clear_cookies_title;

        }else{

            clear_cookies_title = languageText.he.reset_settings;

        }



        if(widgetData.main.close_button_title != '' && widgetData.main.close_button_title != undefined){

            close_button_title = "widgetData.main.close_button_title";

        }else{

            close_button_title = languageText.he.close;

        }



        if(widgetData.main.cognitive_disability_profile_button_title != '' && widgetData.main.cognitive_disability_profile_button_title != undefined){

            cognitive_disability_profile_button_title = widgetData.main.cognitive_disability_profile_button_title;

        }else{

            cognitive_disability_profile_button_title = languageText.he.cognitive_disability_profile;

        }



        if(widgetData.main.greyscale_images_button_title != '' && widgetData.main.greyscale_images_button_title != undefined){

            greyscale_images_button_title = widgetData.main.greyscale_images_button_title;

        }else{

            greyscale_images_button_title = languageText.he.greyscale_images;

        }



        if(widgetData.main.invert_button_title != '' && widgetData.main.invert_button_title != undefined){

            invert_button_title = widgetData.main.invert_button_title;

        }else{

            invert_button_title = languageText.he.invert_colors;

        }



        if(widgetData.main.mute_volume_title != '' && widgetData.main.mute_volume_title != undefined){

            mute_volume_title = widgetData.main.mute_volume_title;

        }else{

            mute_volume_title = languageText.he.mute_volume;

        }



        if(widgetData.main.mute_volume_title != '' && widgetData.main.mute_volume_title != undefined){

            mute_volume_title = widgetData.main.mute_volume_title;

        }else{

            mute_volume_title = languageText.he.mute_volume;

        }



        if(widgetData.main.text2speech_button_title != '' && widgetData.main.text2speech_button_title != undefined){

            speech_button_title = widgetData.main.text2speech_button_title;

        }else{

            speech_button_title = languageText.he.text2speech_button_title;

        }



        if(widgetData.main.enlargetext_button_title != '' && widgetData.main.enlargetext_button_title != undefined){

            zoom_button_title = widgetData.main.enlargetext_button_title;

        }else{

            zoom_button_title = languageText.he.enlargetext_button_title;

        }

    }else{

        if(selectedlanguage == 'en'){

            accessibility_statement_button = languageText.en.accessibility_statement;

            adhd_button_title = languageText.en.adhd_profile;

            clear_cookies_title = languageText.en.reset_settings;

            close_button_title = languageText.en.close;

            cognitive_disability_profile_button_title = languageText.en.cognitive_disability_profile;

            invert_button_title = languageText.en.invert_colors;

            mute_volume_title = languageText.en.mute_volume;

            greyscale_images_button_title = languageText.en.greyscale_images;

        }



        if(selectedlanguage == 'ar'){

            accessibility_statement_button = languageText.ar.accessibility_statement;

            adhd_button_title = languageText.ar.adhd_profile;

            clear_cookies_title = languageText.ar.reset_settings;

            close_button_title = languageText.ar.close;

            cognitive_disability_profile_button_title = languageText.ar.cognitive_disability_profile;

            invert_button_title = languageText.ar.invert_colors;

            mute_volume_title = languageText.ar.mute_volume;

            greyscale_images_button_title = languageText.ar.greyscale_images;

        }



        if(selectedlanguage == 'ru'){

            accessibility_statement_button = languageText.ru.accessibility_statement;

            adhd_button_title = languageText.ru.adhd_profile;

            clear_cookies_title = languageText.ru.reset_settings;

            close_button_title = languageText.ru.close;

            cognitive_disability_profile_button_title = languageText.ru.cognitive_disability_profile;

            invert_button_title = languageText.ru.invert_colors;

            mute_volume_title = languageText.ru.mute_volume;

            greyscale_images_button_title = languageText.ru.greyscale_images;

        }

    }





        // links tab section details

        var highlight_links_title = "Highlight links";

        var underline_links_title = "Underline links";

    if(selectedlanguage == 'he'){

        if(widgetData.links.highlight_links_title != '' && widgetData.links.highlight_links_title != undefined){

            highlight_links_title = widgetData.links.highlight_links_title;

        }else{

            highlight_links_title = languageText.he.highlight_links;

        }

        if(widgetData.links.underline_links_title != '' && widgetData.links.underline_links_title != undefined){

            underline_links_title = widgetData.links.underline_links_title;

        }else{

            underline_links_title = languageText.he.underline_links;

        }

    }else{

        if(selectedlanguage == 'en'){

            highlight_links_title = languageText.en.highlight_links;

            underline_links_title = languageText.en.underline_links;

        }



        if(selectedlanguage == 'ar'){

            highlight_links_title = languageText.ar.highlight_links;

            underline_links_title = languageText.ar.underline_links;

        }



        if(selectedlanguage == 'ru'){

            highlight_links_title = languageText.ru.highlight_links;

            underline_links_title = languageText.ru.underline_links;

        }

    }



        // style tab section details

        var large_mouse_cursor_title = "Large mouse cursor";

        var remove_animations_title = "Remove animations";

    if(selectedlanguage == 'he'){

        if(widgetData.styles.large_mouse_cursor_title != '' && widgetData.styles.large_mouse_cursor_title != undefined){

            large_mouse_cursor_title = widgetData.styles.large_mouse_cursor_title;

        }else{

            large_mouse_cursor_title = languageText.he.large_cursor;

        }

        if(widgetData.styles.remove_animations_title != '' && widgetData.styles.remove_animations_title != undefined){

            remove_animations_title = widgetData.styles.remove_animations_title;

        }else{

            remove_animations_title = languageText.he.remove_animations;

        }

    }else{

        if(selectedlanguage == 'en'){

            large_mouse_cursor_title = languageText.en.large_cursor;

            remove_animations_title = languageText.en.remove_animations;

        }



        if(selectedlanguage == 'ar'){

            large_mouse_cursor_title = languageText.ar.large_cursor;

            remove_animations_title = languageText.ar.remove_animations;

        }



        if(selectedlanguage == 'ru'){

            large_mouse_cursor_title = languageText.ru.large_cursor;

            remove_animations_title = languageText.ru.remove_animations;

        }

    }



        // fonts tab section details

        var font_family = "";

        var letter_spacing_title = "Letter spacing";

        var line_height_title = "Line height";

        var reset_font_size_title = "Reset font size";

        var word_spacing_title = "Word spacing";

        var font_setting_title = "Font Settings";

        var make_readable_title = "Make Readable";

        var font_small_title = "A-";

        var font_large_title = "A+";

        var font_left_title = "Left";

        var font_center_title = "Center";

        var font_right_title = "Right";

    if(selectedlanguage == 'he'){

        if(widgetData.fonts.font_family != '' && widgetData.fonts.font_family != undefined){

            font_family = widgetData.fonts.font_family;

        }

        if(widgetData.fonts.letter_spacing_title != '' && widgetData.fonts.letter_spacing_title != undefined){

            letter_spacing_title = widgetData.fonts.letter_spacing_title;

        }else{

            letter_spacing_title = languageText.he.letter_spacing;

        }

        if(widgetData.fonts.line_height_title != '' && widgetData.fonts.line_height_title != undefined){

            line_height_title = widgetData.fonts.line_height_title;

        }else{

            line_height_title = languageText.he.line_height;

        }

        if(widgetData.fonts.reset_font_size_title != '' && widgetData.fonts.reset_font_size_title != undefined){

            reset_font_size_title = widgetData.fonts.reset_font_size_title;

        }else{

            reset_font_size_title = languageText.he.reset_font_size;

        }

        if(widgetData.fonts.word_spacing_title != '' && widgetData.fonts.word_spacing_title != undefined){

            word_spacing_title = widgetData.fonts.word_spacing_title;

        }else{

            word_spacing_title = languageText.he.word_spacing;

        }



        if(widgetData.fonts.font_setting_title != '' && widgetData.fonts.font_setting_title != undefined){

            font_setting_title = widgetData.fonts.font_setting_title;

        }else{

            font_setting_title = languageText.he.fonts_settings;

        }



        if(widgetData.fonts.make_readable_title != '' && widgetData.fonts.make_readable_title != undefined){

            make_readable_title = widgetData.fonts.make_readable_title;

        }else{

            make_readable_title = languageText.he.readable_font;

        }



        if(widgetData.fonts.font_small_title != '' && widgetData.fonts.font_small_title != undefined){

            font_small_title = widgetData.fonts.font_small_title;

        }else{

            font_small_title = languageText.he.small_font;

        }



        if(widgetData.fonts.font_large_title != '' && widgetData.fonts.font_large_title != undefined){

            font_large_title = widgetData.fonts.font_large_title;

        }else{

            font_large_title = languageText.he.large_font;

        }



        if(widgetData.fonts.font_left_title != '' && widgetData.fonts.font_left_title != undefined){

            font_left_title = widgetData.fonts.font_left_title;

        }else{

            font_left_title = languageText.he.align_left;

        }



        if(widgetData.fonts.font_center_title != '' && widgetData.fonts.font_center_title != undefined){

            font_center_title = widgetData.fonts.font_center_title;

        }else{

            font_center_title = languageText.he.align_center;

        }



        if(widgetData.fonts.font_right_title != '' && widgetData.fonts.font_right_title != undefined){

            font_right_title = widgetData.fonts.font_right_title;

        }else{

            font_right_title = languageText.he.align_right;

        }

    }else{

        if(selectedlanguage == 'en'){

            letter_spacing_title = languageText.en.letter_spacing;

            line_height_title = languageText.en.line_height;

            reset_font_size_title = languageText.en.reset_font_size;

            word_spacing_title = languageText.en.word_spacing;

            font_setting_title = languageText.en.fonts_settings;

            make_readable_title = languageText.en.readable_font;

            font_small_title = languageText.en.small_font;

            font_large_title = languageText.en.large_font;

            font_left_title = languageText.en.align_left;

            font_center_title = languageText.en.align_center;

            font_right_title = languageText.en.align_right;

        }



        if(selectedlanguage == 'ar'){

            letter_spacing_title = languageText.ar.letter_spacing;

            line_height_title = languageText.ar.line_height;

            reset_font_size_title = languageText.ar.reset_font_size;

            word_spacing_title = languageText.ar.word_spacing;

            font_setting_title = languageText.ar.fonts_settings;

            make_readable_title = languageText.ar.readable_font;

            font_small_title = languageText.ar.small_font;

            font_large_title = languageText.ar.large_font;

            font_left_title = languageText.ar.align_left;

            font_center_title = languageText.ar.align_center;

            font_right_title = languageText.ar.align_right;

        }



        if(selectedlanguage == 'ru'){

            letter_spacing_title = languageText.ru.letter_spacing;

            line_height_title = languageText.ru.line_height;

            reset_font_size_title = languageText.ru.reset_font_size;

            word_spacing_title = languageText.ru.word_spacing;

            font_setting_title = languageText.ru.fonts_settings;

            make_readable_title = languageText.ru.readable_font;

            font_small_title = languageText.ru.small_font;

            font_large_title = languageText.ru.large_font;

            font_left_title = languageText.ru.align_left;

            font_center_title = languageText.ru.align_center;

            font_right_title = languageText.ru.align_right;

        }

    }

        // layout tab section details

        var keyboard_navigation_description = "Keyboard navigation";

        var adjust_background_colors_title = "Adjust Background Colors title";

        var adjust_link_colors = "Adjust Link Colors";

        var adjust_text_colors_title = "Adjust Text Colors title";

        var adjust_title_colors_title = "Adjust Title Colors title";

        var color_adjustment_settings = "Adjust Settings";

    if(selectedlanguage == 'he'){

        if(widgetData.layout.keyboard_navigation_description != '' && widgetData.layout.keyboard_navigation_description != undefined){

            keyboard_navigation_description = widgetData.layout.keyboard_navigation_description;

        }else{

            keyboard_navigation_description = languageText.he.keyboard_navigation;

        }



        

        if(widgetData.layout.adjust_background_colors_title != '' && widgetData.layout.adjust_background_colors_title != undefined){

            adjust_background_colors_title = widgetData.layout.adjust_background_colors_title;

        }else{

            adjust_background_colors_title = languageText.he.adjust_background_colors;

        }



        

        if(widgetData.layout.adjust_link_colors != '' && widgetData.layout.adjust_link_colors != undefined){

            adjust_link_colors = widgetData.layout.adjust_link_colors;

        }else{

            adjust_link_colors = languageText.he.link_colors;

        }



        

        if(widgetData.layout.adjust_text_colors_title != '' && widgetData.layout.adjust_text_colors_title != undefined){

            adjust_text_colors_title = widgetData.layout.adjust_text_colors_title;

        }else{

            adjust_text_colors_title = languageText.he.text_colors;

        }



        if(widgetData.layout.adjust_title_colors_title != '' && widgetData.layout.adjust_title_colors_title != undefined){

            adjust_title_colors_title = widgetData.layout.adjust_title_colors_title;

        }else{

            adjust_title_colors_title = languageText.he.title_colors;

        }



        

        if(widgetData.layout.color_adjustment_settings != '' && widgetData.layout.color_adjustment_settings != undefined){

            color_adjustment_settings = widgetData.layout.color_adjustment_settings;

        }else{

            color_adjustment_settings = languageText.he.color_settings;

        }

    }else{

        if(selectedlanguage == 'en'){

            keyboard_navigation_description = languageText.en.keyboard_navigation;

            adjust_background_colors_title = languageText.en.adjust_background_colors;

            adjust_link_colors = languageText.en.link_colors;

            adjust_text_colors_title = languageText.en.text_colors;

            adjust_title_colors_title = languageText.en.title_colors;

            color_adjustment_settings = languageText.en.color_settings;

        }



        if(selectedlanguage == 'ar'){

            keyboard_navigation_description = languageText.ar.keyboard_navigation;

            adjust_background_colors_title = languageText.ar.adjust_background_colors;

            adjust_link_colors = languageText.ar.link_colors;

            adjust_text_colors_title = languageText.ar.text_colors;

            adjust_title_colors_title = languageText.ar.title_colors;

            color_adjustment_settings = languageText.ar.color_settings;

        }



        if(selectedlanguage == 'ru'){

            keyboard_navigation_description = languageText.ru.keyboard_navigation;

            adjust_background_colors_title = languageText.ru.adjust_background_colors;

            adjust_link_colors = languageText.ru.link_colors;

            adjust_text_colors_title = languageText.ru.text_colors;

            adjust_title_colors_title = languageText.ru.title_colors;

            color_adjustment_settings = languageText.ru.color_settings;

        }

    }



        // content tab section details

        var display_image_description_title  = "Image Description";

        var table_content_title  = "Table Content";

        var hide_images_title  = "Hide Images";

    if(selectedlanguage == 'he'){    

        if(widgetData.content.display_image_description_title != '' && widgetData.content.display_image_description_title != undefined){

            display_image_description_title = widgetData.content.display_image_description_title;

        }else{

            display_image_description_title = languageText.he.image_description;

        }

        

        if(widgetData.content.hide_images_title != '' && widgetData.content.hide_images_title != undefined){

            hide_images_title = widgetData.content.hide_images_title;

        }else{

            hide_images_title = languageText.he.hide_images;

        }

        

        if(widgetData.content.table_content_title != '' && widgetData.content.table_content_title != undefined){

            table_content_title = widgetData.content.table_content_title;

        }else{

            table_content_title = languageText.he.table_of_contents;

        }

    }else{

        if(selectedlanguage == 'en'){

            display_image_description_title = languageText.en.image_description;

            hide_images_title = languageText.en.hide_images;

            table_content_title = languageText.en.table_of_contents;

        }



        if(selectedlanguage == 'ar'){

            display_image_description_title = languageText.ar.image_description;

            hide_images_title = languageText.ar.hide_images;

            table_content_title = languageText.ar.table_of_contents;

        }



        if(selectedlanguage == 'ru'){

            display_image_description_title = languageText.ru.image_description;

            hide_images_title = languageText.ru.hide_images;

            table_content_title = languageText.ru.table_of_contents;

        }

    }



        // contrast tab section details

        var color_button_title  = "Choose color button - title";

        var monochrome_mode_title  = "Monochrome mode - title";

        var sepia_mode_title  = "Sepia mode - title";

        var contrast_setting  = "Adjust contrast";

    if(selectedlanguage == 'he'){    

        if(widgetData.contrast.color_button_title != '' && widgetData.contrast.color_button_title != undefined){

            color_button_title = widgetData.contrast.color_button_title;

        }



        if(widgetData.contrast.contrast_setting != '' && widgetData.contrast.contrast_setting != undefined){

            contrast_setting = widgetData.contrast.contrast_setting;

        }else{

            contrast_setting = languageText.he.adjust_contrast;

        }

        

        if(widgetData.contrast.monochrome_mode_title != '' && widgetData.contrast.monochrome_mode_title != undefined){

            monochrome_mode_title = widgetData.contrast.monochrome_mode_title;

        }else{

            monochrome_mode_title = languageText.he.monochrome;

        }



        

        if(widgetData.contrast.sepia_mode_title != '' && widgetData.contrast.sepia_mode_title != undefined){

            sepia_mode_title = widgetData.contrast.sepia_mode_title;

        }else{

            sepia_mode_title = languageText.he.sepia;

        }

    }else{

        if(selectedlanguage == 'en'){

            monochrome_mode_title = languageText.en.monochrome;

            sepia_mode_title = languageText.en.sepia;

            contrast_setting = languageText.en.adjust_contrast;

        }



        if(selectedlanguage == 'ar'){

            monochrome_mode_title = languageText.ar.monochrome;

            sepia_mode_title = languageText.ar.sepia;

            contrast_setting = languageText.ar.adjust_contrast;

        }



        if(selectedlanguage == 'ru'){

            monochrome_mode_title = languageText.ru.monochrome;

            sepia_mode_title = languageText.ru.sepia;

            contrast_setting = languageText.ru.adjust_contrast;

        }

    }



        var contrast_variations  = widgetData.contrast.contrast_variations;

        var contrast_variations_colors  = [];

        if(widgetData.contrast.contrast_variations_colors != '' && widgetData.contrast.contrast_variations_colors != undefined){

            contrast_variations_colors = widgetData.contrast.contrast_variations_colors;

        }

        

    // Advance Tab Section  

    var mailTo = "";

    if(widgetData.advancedsetting.mail_to != '' && widgetData.advancedsetting.mail_to != undefined){

        mailTo = widgetData.advancedsetting.mail_to;

    }



    var nagishMail = "";

    if(widgetData.advancedsetting.nagish_email != '' && widgetData.advancedsetting.nagish_email != undefined){

        nagishMail = widgetData.advancedsetting.nagish_email;

    }



    var enable_skip_links_menu = false;

    var skip_links_content_id = "#";



    if(widgetData.advancedsetting.enable_skip_links_menu != undefined){

        enable_skip_links_menu = widgetData.advancedsetting.enable_skip_links_menu;

    }



    if(widgetData.advancedsetting.skip_links_content_id != undefined){

        skip_links_content_id = widgetData.advancedsetting.skip_links_content_id;

    }







  //  console.log(widgetData);



        var enable_hebrew_language = "ng_display_none";

        var enable_english_language = "ng_display_none";

        var enable_russia_language = "ng_display_none";

        var enable_arabic_language = "ng_display_none";

        // var enable_english_language = "";

        // var enable_russia_language = "";

        // var enable_arabic_language = ""; 

        var pointerDisabled = "pointerDisabled";

        if(widgetData.layout.enable_hebrew_language != false){

            enable_hebrew_language = "";

            pointerDisabled = "";

        }else if(enableHE == 1){

            enable_hebrew_language = "";

            pointerDisabled = "";

        }

        

        if(widgetData.layout.enable_english_language != false){

            enable_english_language = "";

            pointerDisabled = "";

        }else if(enableEN == 1){

            enable_english_language = "";

            pointerDisabled = "";

        }



        if(widgetData.layout.enable_russia_language != false){

            enable_russia_language = "";

            pointerDisabled = "";

        }else if(enableRU == 1){

            enable_russia_language = "";

            pointerDisabled = "";

        }



        if(widgetData.layout.enable_arabic_language != false){

            enable_arabic_language = "";

            pointerDisabled = "";

        }if(enableAR == 1){

            enable_arabic_language = "";

            pointerDisabled = "";

        }



    var ng_inactiveContentStyle = '<style>.ng_inactiveContent{ text-align:center; display:flex;align-items:center; justify-content:center; position: absolute; width: 100%; height: 100%; z-index: 999; background-color: #fffffff2; } button#ng_closewidget_sidebar { position: absolute; z-index: 999; } .ng_inactiveContent a.ng_support_link { color: #0578FA; text-decoration: underline; } .ng_inactiveContent svg path { fill: red; } .ng_inactiveContent svg { width: 50px; margin: 0 auto; } .ng_inactiveContent h2 { font-size: 20px; font-weight: bold; } #ng_sidebar_wahout { overflow: hidden; } body .accessability_container .wne-footer-links { position: absolute; bottom: 0; width: 100%; left: 0; direction: rtl; padding: 17px 20px;} body .accessability_container .wne-footer-links img { width: 150px;} body .accessability_container .wne-footer-links .wne-footer-links-inner ul li a{ font-size: 15px !important; }</style>';

    var inactiveContentDataHtml = '';

    if(isActive == false || IsMultiSite == false){

        inactiveContentDataHtml += '<div class="ng_inactiveContent">'+ng_inactiveContentStyle+'<div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>  <h2>התוסף אינו פעיל</h2> <p>אנא צור קשר עם נגיש אקספרס לחידוש רישיון</p> <a href="http://www.nagishexpress.co.il/" class="ng_support_link">www.nagishexpress.co.il/</a></div> <div class="wne-footer-links" data-layout="wide-sidebar"><div class="wne-footer-links-inner"><ul style="font-size: 14px;"><li class="credit_text" data-nagishx-txt-style=""><a href="mailto:'+mailTo+'" target="_blank" tabindex="0"> דיווח על בעיה  </a></li><li class="credit_logo" data-nagishx-txt-style=""><a target="_blank" href="https://nagishexpress.co.il/?utm_source=nagishexpress.co.il&amp;utm_medium=widget_footer&amp;utm_campaign=nagishexpress_widget" tabindex="0"><img src="'+SITE_URL+'/assets/images/credit_logo.svg" alt="NagishExpress Logo"></a></li></ul></div></div>  </div>';

    }



    

    var headingUlData = '<div id="ng_table_content_section"><div class="ng_table_content_inner_section"><button type="button" aria-label="Close popup" id="ng_close_table_content_popup" tabindex="0">✖</button> <div class="ng_content_listing"><ul class="ng_tablepopcontent_ul">';

    var h = ["h1", "h2", "h3", "h4", "h5", "h6"];

    var hcount = 1;

    for (var i = 0; i < h.length; i++) {

        if (document.getElementsByTagName(h[i])) {

            var selected_element = document.getElementsByTagName(h[i]);

            for (var j = 0; j < selected_element.length; j++) {

                var headerContent = selected_element[j].textContent;

                var headerId = '#ng_header_tag_item_'+hcount;

                selected_element[j].id = headerId;

                headingUlData += '<li class="ng_tablepopcontent_li"><a href="'+headerId+'" class="ng_tablepopcontent_a">'+headerContent+'</a></li>';

                hcount++;

            }

        } 

    }

    headingUlData += '</ul></div></div></div>';

    

    var TableontentStyle = '#ng_table_content_section {position: absolute; display: block !important; max-width: 100% !important; width: calc(100% - 20px) !important; height: 80vh !important; max-height: 80vh !important; overflow-y: auto; padding: 15px; margin-top: 50px; background-color: #fff; opacity: 0; visibility: hidden; scrollbar-color: #ccc transparent; scrollbar-width: thin; z-index: 2; -webkit-transition: all .3s ease; -moz-transition: all .3s ease; -o-transition: all .3s ease; transition: all .3s ease; top: 96px; left: 50%; -webkit-transform: translateX(-50%) translateY(0%); -moz-transform: translateX(-50%) translateY(0%); -ms-transform: translateX(-50%) translateY(0%); -o-transform: translateX(-50%) translateY(0%); transform: translateX(-50%) translateY(0%);} #ng_close_table_content_popup { position: absolute; top: 15px; right: 10px; } .ng_content_listing { padding: 20px; } .ng_content_listing ul.ng_tablepopcontent_ul { list-style: disc; } a.ng_tablepopcontent_a:hover { text-decoration: underline; } a.ng_tablepopcontent_a { text-decoration: none; font-size: 15px; font-weight: 400; } body.ng_enable_table_content_active #ng_table_content_section{ opacity: 1 !important; visibility: visible !important; }';



    var StyleCSS1 = '<style>div#tooltip_text { position: fixed; display: block; top: 0px;text-align: center; left: 0px; font-size: 34px;   padding: 8px; background: #000000d4;border-radius: 5px;max-width: 60%;color: #fff; z-index: 99999999; display: block;   font-size: 25px;}#ng_sidebar_wahout::-webkit-scrollbar-track{ border-radius: 10px; background-color: #fff; } #ng_sidebar_wahout::-webkit-scrollbar { width: 10px; background-color: #fff; } #ng_sidebar_wahout::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #051e42; } #ng_sidebar_wahout { display:none;width: 560px;max-width: 100%!important;height: 100vh; overflow-x: hidden; overflow-y: scroll; z-index: 999999; background-color: #fff!important; box-shadow: rgba(0,0,0,0.05) 0 0 10px 11px;top:0;right: 0;position:fixed;margin-top: 0;padding-top: 10px;} #ng_sidebar_wahout.ng_show_sidebar_left { left: 0; right: auto; z-index: 999999; } .nagishx-buttons-header { padding: 10px 10px 0px;display: flex; align-items: flex-start; justify-content: space-between; direction: ltr;} .ng_leftsection button { vertical-align: middle; outline: none; border: none; background-color: transparent !important; width: auto !important; height: auto !important;} .nagishx-buttons-header .ng_leftsection { direction: ltr; } #nagishx-accessibility-statement { width: auto !important; font-weight: 400; font-size: 16px !important; margin-left: 10px; background-color: #056EFA!important; border-radius: 80px!important; border: none!important; color: #fff!important; padding: 0px 18px!important; height: 35px !important; vertical-align: middle; } #nagishx-accessibility-statement span { display: inline-block;margin: 0px 5px; vertical-align: text-top; font-weight: 600;} #nagishx-accessibility-statement span.widget-icon { vertical-align: middle; } #select-nagishx-language { box-shadow: none; -webkit-box-shadow: none; -moz-box-shadow: none; border: 1px solid #fff; margin: 0; padding: 0; text-align: center; cursor: pointer; font-size: 15px; font-weight: 700; height: 34px; line-height: 32px; min-width: 120px; -webkit-border-radius: 3px; -moz-border-radius: 3px; -ms-border-radius: 3px; border-radius: 3px; outline: none; background-color: transparent;} .pointerDisabled { pointer-events: none; } #select-nagishx-language span { vertical-align: middle;display: inline-block; margin: 0px 5px; height: 100%;} span.wne-flag-icon .wahImageTooltip { height: 100%; } #nagishx-accessibility-statement:hover { background-color: #000 !important; } .a_module.wne_clear_cookies button { background-color: #E61253 !important; height: 40px !important; border-radius: 80px !important; justify-content: center; color: #FFF !important; width: 100% !important; padding: 0px 10px 0px 5px!important; text-align: center; cursor: pointer; border: none; font-size: 14px !important; font-weight: bold; display: flex; align-items: center; column-gap: 10px; flex-direction: row-reverse; } .ng_access_container_inner { position: relative; padding: 0 10px; padding-top: 20px; margin-top: 15px; border-radius: 10px 10px 0px 0px; overflow: hidden; } .ng_access_container_inner:before { content: ""; position: absolute; left: 0px; right: 0px; top: 0px; height: 49px; transform: matrix(-1, 0, 0, -1, 0, 0); background: transparent linear-gradient(180deg, #051E4200 0%, #051E42 100%) 0% 0% no-repeat padding-box; opacity: 0.15; display: block; z-index: 1; } .ng_access_container_inner .access_container_inner_inner:after { content: ""; position: absolute; left: 0px; right: 0px; bottom: 0px!important;height: 49px; transform: matrix(-2, 0, 0, -1, 0, 0); background: transparent linear-gradient(0deg, #051E4200 0%, #051E42 100%) 0% 0% no-repeat padding-box; opacity: 0.15; display: block; z-index: -1; top: auto; left: 0; width: 107%; right: -10px; } .ng_rowitem { display: flex; justify-content: space-between; align-items: flex-start;margin-top: 12px!important;} .ng_rowitem_inner button, .ng_primary_button button { background: #F4F8FB !important; color: #232323 !important; width: 100% !important; padding: 15px 10px !important; text-align: center; cursor: pointer; border: none; font-size: 15px !important; font-weight: bold; display: flex; align-items: center; justify-content: flex-end; border-radius: 10px !important; column-gap: 10px;  flex-direction: row-reverse; } .ng_rowitem_inner { width: 50%; padding: 0 2%;} .access_container_inner_inner { position: relative; z-index: 1; padding-bottom: 15px;} .ng_btnhover:hover { background-color: #056EFA !important; color: #fff !important; } .ng_btnhover:hover span.widget-icon svg path { fill: #FFF; } .ng_btnhover span.widget-icon svg path[fill="none"] { fill: none !important; } body.arial_font_on * { font-family: Arial, Helvetica, sans-serif !important;} footer-links { background:  #236478 !important; padding: 8px 10px; margin-bottom: 12px;} body .accessability_container .wne-footer-links .wne-footer-links-inner ul, body .accessability_container .wne-footer-links .wne-footer-links-inner * ul { list-style-type: none;margin: 0;padding: 0;line-height: 1;font-size: 14px;}body .accessability_container .wne-footer-links .wne-footer-links-inner ul li a { color: #051E42 !important; font-size: 17px!important; font-weight: 600; text-decoration: underline;} body .accessability_container .wne-footer-links .wne-footer-links-inner ul li, body .accessability_container .wne-footer-links .wne-footer-links-inner * ul li { display: inline-block; margin-right: 10px; padding-right: 10px; border-right: 1px solid white;} body .accessability_container .wne-footer-links .wne-footer-links-inner ul li:last-child, body .accessability_container .wne-footer-links .wne-footer-links-inner * ul li:last-child { margin-right: 0px; padding-right: 0px; border-right: 0; } body .accessability_container .wne-footer-links .wne-footer-links-inner, body .accessability_container .wne-footer-links .wne-footer-links-inner * { background: none !important;} body .accessability_container .wne-footer-links { background: #fff !important; padding: 17px 10px; margin-bottom: 0px!important;} .wne-footer-links-inner ul { display: flex; justify-content: space-between; align-items: center;} .fontSettingSection { overflow: hidden; border: #EAEEF1 solid thin; border-radius: 10px; padding: 19px; margin: 15px 2%;} #ng_reset_font_setting {background-color: #E61253!important;border: none!important;border-radius: 80px !important;width: 150px !important;height: auto !important;display: flex;align-items: center;justify-content: center;column-gap: 5px;flex-direction: row-reverse;cursor: pointer;color: #fff !important;padding: 5px !important;} .fontSettingSection_header .ng_rowitem_inner { width: auto;} .ng_button_title { font-size: 17px; font-weight: 700;} #ng_dropdown_icon_setting { background-color: transparent !important; display: flex; justify-content: space-between; align-items: center; height: auto !important; padding: 5px !important; } #ng_dropdown_toggle_buttonicon { cursor: pointer; } .ng_color_contrast_selection{ display: inline-block;margin-right: 5px; height: 20px; } .ng_color_contrast_selection {display: inline-block;border-radius: 5px;height: 20px;width: 20px;border: 1px solid #000;} .ng_adjust_contrast_active {position: relative;} .ng_adjust_contrast_active:after {content: "";width: 15px;height: 15px;position: absolute;border: 1px solid #000;background-color: #fff;border-radius: 100%;top: 100%;left: 0;transform: translate(-30%, -70%);} .ng_adjust_contrast_active:before {content: "";display: inline-block;width: 5px;height: 8px;border-top: 2px solid #000;border-left: 2px solid #000;top: 100%;left: 0;position: absolute;z-index: 1;transform: rotate(-135deg) translate(6px, 6px);} body.ng_enable_cd_profile_active a, body.ng_enable_cd_profile_active button, body.ng_enable_cd_profile_active input, body.ng_enable_cd_profile_active select, body.ng_enable_cd_profile_active textarea { outline: 2px solid #FFA500 !important; outline-offset: 2px !important;} body.ng_enable_cd_profile_active a, body.ng_enable_cd_profile_active button, body.ng_enable_cd_profile_active input, body.ng_enable_cd_profile_active select, body.ng_enable_cd_profile_active textarea { outline: 2px solid #FFA500 !important; outline-offset: 2px !important;} body.ng_enable_cd_profile_active #ng_enable_cd_profile{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_cd_profile_active #ng_enable_cd_profile span.widget-icon svg path {fill: #FFF;}  body.ng_enable_cd_profile_active h1, body.ng_enable_cd_profile_active h2, body.ng_enable_cd_profile_active h3, body.ng_enable_cd_profile_active h4, body.ng_enable_cd_profile_active h5, body.ng_enable_cd_profile_active h6 {outline: 2px solid #0963ff !important;outline-offset: 2px !important;} body.ng_enable_highlight_links_active a {background-color: yellow !important;color: #000 !important;} body.ng_enable_highlight_links_active #ng_highlight_links{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_highlight_links_active #ng_highlight_links span.widget-icon svg path {fill: #FFF;} body.ng_enable_word_spacing_active>div>:not(#ng_sidebar_wahout) * {word-spacing: 5px !important;} body.ng_enable_word_spacing_active #ng_enable_word_spacing{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_word_spacing_active #ng_enable_word_spacing span.widget-icon svg path {fill: #FFF;} body.ng_enable_underline_links_active a{ text-decoration: underline !important; } body.ng_enable_underline_links_active #ng_enable_underline_links{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_underline_links_active #ng_enable_underline_links span.widget-icon svg path {fill: #FFF;} body.ng_enable_adhd_button_active #ng_adhd_button{ background-color: #056EFA !important;color: #fff !important; }body.ng_enable_speech_button_active  #ng_speech_button{ background-color: #056EFA !important;color: #fff !important; } body.ng_large_button_active  #ng_large_button{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_adhd_button_active #ng_adhd_button span.widget-icon svg path , body.ng_enable_speech_button_active #ng_speech_button span.widget-icon svg path , body.ng_large_button_active #ng_large_button span.widget-icon svg path {fill: #FFF;} body.ng_enable_keyboard_navigation_active #ng_keyboard_navigation{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_keyboard_navigation_active #ng_keyboard_navigation span.widget-icon svg path {fill: #FFF;} body.ng_enable_remove_animations_active #ng_enable_remove_animations{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_remove_animations_active #ng_enable_remove_animations span.widget-icon svg path {fill: #FFF;} body.ng_enable_image_description_active #ng_enable_image_description{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_image_description_active #ng_enable_image_description span.widget-icon svg path {fill: #FFF;} .wah-tooltip { position: absolute; background: #161616; color: white; padding: 10px; font-size: 12px; border-radius: 5px; pointer-events: none; z-index: 9999; border: 1px solid #333; } body.ng_enable_letter_spacing_active #ng_enable_letter_spacing{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_letter_spacing_active #ng_enable_letter_spacing span.widget-icon svg path {fill: #FFF;} body.ng_enable_line_height_active #ng_enable_line_height{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_line_height_active #ng_enable_line_height span.widget-icon svg path {fill: #FFF;}  body.ng_enable_large_cursor_active #ng_enable_large_cursor{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_large_cursor_active #ng_enable_large_cursor span.widget-icon svg path {fill: #FFF;} body.ng_enable_hide_images_active #ng_enable_hide_images{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_hide_images_active #ng_enable_hide_images span.widget-icon svg path {fill: #FFF;}  body.ng_enable_table_content_active #ng_enable_table_content{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_table_content_active #ng_enable_table_content span.widget-icon svg path {fill: #FFF;} body.ng_enable_mute_volume_active #ng_enable_mute_volume{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_mute_volume_active #ng_enable_mute_volume span.widget-icon svg path {fill: #FFF;}  body.ng_enable_letter_spacing_active>div>:not(#ng_sidebar_wahout) * { letter-spacing: 2px !important; } body.ng_enable_line_height_active>div>:not(#ng_sidebar_wahout) * {line-height: 30px !important;} body.ng_enable_large_cursor_active{ cursor: url('+SITE_URL+'/assets/images/cursor-64.png), auto !important; } body.ng_enable_large_cursor_active a, body.ng_enable_large_cursor_active button, body.ng_enable_large_cursor_active input[type=submit], body.ng_enable_large_cursor_active input[type=reset], body.ng_enable_large_cursor_active .cursor-pointer {cursor: url('+SITE_URL+'/assets/images/cursor-pointer.png), pointer !important;} html body.ng_enable_hide_images_active .ng_contBox svg,html body.ng_enable_hide_images_active .ng_contBox img,html body.ng_enable_hide_images_active .ng_contBox picture {opacity: 1 !important;visibility: visible !important;position: unset !important; } body.ng_enable_hide_images_active img, body.ng_enable_hide_images_active picture, body.ng_enable_hide_images_active svg, body.ng_enable_hide_images_active picture {opacity: 0 !important;visibility: hidden !important;position: relative; }  body.ng_enable_hide_images_active :not(.ng_contBox) div{ background-image: none !important; } body.ng_enable_readable_font_active #ng_enable_readable_font{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_readable_font_active #ng_enable_readable_font span.widget-icon svg path {fill: #FFF;} body.ng_enable_left_fonts_active #ng_enable_left_fonts{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_left_fonts_active #ng_enable_left_fonts span.widget-icon svg path {fill: #FFF;} body.ng_enable_center_fonts_active #ng_enable_center_fonts{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_center_fonts_active #ng_enable_center_fonts span.widget-icon svg path {fill: #FFF;} body.ng_enable_right_fonts_active #ng_enable_right_fonts{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_right_fonts_active #ng_enable_right_fonts span.widget-icon svg path {fill: #FFF;} body.ng_enable_readable_font_active * {font-family: Arial, Helvetica, sans-serif !important;} body.ng_enable_left_fonts_active h1, body.ng_enable_left_fonts_active h2, body.ng_enable_left_fonts_active h3, body.ng_enable_left_fonts_active h4, body.ng_enable_left_fonts_active h5, body.ng_enable_left_fonts_active h5, body.ng_enable_left_fonts_active p, body.ng_enable_left_fonts_active ul, body.ng_enable_left_fonts_active ol:not(.switches) {text-align: left !important;} body.ng_enable_center_fonts_active h1, body.ng_enable_center_fonts_active h2, body.ng_enable_center_fonts_active h3, body.ng_enable_center_fonts_active h4, body.ng_enable_center_fonts_active h5, body.ng_enable_center_fonts_active h5, body.ng_enable_center_fonts_active p, body.ng_enable_center_fonts_active ul, body.ng_enable_center_fonts_active ol:not(.switches) {text-align: center !important;} body.ng_enable_right_fonts_active h1, body.ng_enable_right_fonts_active h2, body.ng_enable_right_fonts_active h3, body.ng_enable_right_fonts_active h4, body.ng_enable_right_fonts_active h5, body.ng_enable_right_fonts_active h5, body.ng_enable_right_fonts_active p, body.ng_enable_right_fonts_active ul, body.ng_enable_right_fonts_active ol:not(.switches) {text-align: right !important;} body.ng_enable_greyscale_image_active #ng_enable_greyscale_image{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_greyscale_image_active #ng_enable_greyscale_image span.widget-icon svg path {fill: #FFF;} body.ng_enable_invert_mode_active #ng_enable_invert_mode{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_invert_mode_active #ng_enable_invert_mode span.widget-icon svg path {fill: #FFF;} body.ng_enable_monochrome_mode_active #ng_enable_monochrome_mode{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_monochrome_mode_active #ng_enable_monochrome_mode span.widget-icon svg path {fill: #FFF;} body.ng_enable_sepia_mode_active #ng_enable_sepia_mode{ background-color: #056EFA !important;color: #fff !important; } body.ng_enable_sepia_mode_active #ng_enable_sepia_mode span.widget-icon svg path {fill: #FFF;} div#sideBardContentSection { filter: none !important; } body.ng_enable_greyscale_image_active img {filter: grayscale(100%);-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);-o-filter: grayscale(100%);filter: gray;-webkit-filter: grayscale(1);} body.ng_enable_monochrome_mode_active img, body.ng_enable_monochrome_mode_active>div>:not(#ng_sidebar_wahout) {filter: grayscale(100%);-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);-o-filter: grayscale(100%);filter: gray;-webkit-filter: grayscale(1);} body.ng_enable_sepia_mode_active img, body.ng_enable_sepia_mode_active>div>:not(#ng_sidebar_wahout) {filter: sepia(100%);-webkit-filter: sepia(100%);-moz-filter: sepia(100%);-ms-filter: sepia(100%);-o-filter: sepia(100%);filter: sepia(100%);-webkit-filter: sepia(1);} body.ng_enable_invert_mode_active img, body.ng_enable_invert_mode_active>:not(#ng_sidebar_wahout_class) {filter: invert(100%);-webkit-filter: invert(100%);-moz-filter: invert(100%);-ms-filter: invert(100%);-o-filter: invert(100%);filter: invert(100%);-webkit-filter: invert(1);} '+TableontentStyle+' .ng_display_none { display: none !important; }  .nagishx-i18n-languages-list { position: absolute; display: block !important; max-width: 96% !important; width: 96% !important; max-height: 350px !important; overflow-y: auto; padding: 15px; padding-top: 50px; margin-top: 50px; background-color: #fff; opacity: 0; visibility: hidden; scrollbar-color: #ccc transparent; scrollbar-width: thin; z-index: -1; -webkit-transition: all .3s ease; -moz-transition: all .3s ease; -o-transition: all .3s ease; transition: all .3s ease; top: 60px; left: 2%; } .nagishx-i18n-languages-list.active { background: white !important; color: black !important; margin-top: 0 !important; opacity: 1 !important; visibility: visible !important; -webkit-transition-delay: .15s; -moz-transition-delay: .15s; -o-transition-delay: .15s; transition-delay: .15s; z-index: 9999; } #nagishx-close-languages { font-size: 30px !important; padding: 10px !important; height: auto !important; width: 52px !important; min-width: 52px !important; position: absolute; top: 0; left: 0; box-shadow: none; -webkit-box-shadow: none; -moz-box-shadow: none; border: 1px solid #fff; text-align: center; cursor: pointer; font-weight: 700; line-height: 32px; -webkit-border-radius: 3px; -moz-border-radius: 3px; -ms-border-radius: 3px;border-radius: 3px; margin: 0; } span.wne-flag-icon img { max-width: 48px; } .nagishx-i18n-languages-list ul { display: flex; flex-wrap: wrap; list-style:none !important; } .nagishx-i18n-languages-list ul li { width: 50%; padding: 10px; } .nagishx-i18n-languages-list ul li button { width: 100%; display: flex; height: 100%; padding: 10px; background-color: #ccc; border-radius: 5px; align-items: center; } .nagishx-i18n-languages-list ul li button span.wne-flag-icon { margin-right: 10px; margin-left: 10px; } .wne-button-title { font-size: 14px; line-height: 1; }</style>';







    var FooterSectionWidget = '<div class="wne-footer-links" data-layout="wide-sidebar"><div class="wne-footer-links-inner"><ul style="font-size: 14px;"><li class="credit_text" data-nagishx-txt-style=""><a href="mailto:'+nagishMail+'" target="_blank" tabindex="0"> דיווח על בעיה  </a></li><li class="credit_logo" data-nagishx-txt-style=""><a target="_blank" href="https://nagishexpress.co.il/?utm_source=nagishexpress.co.il&amp;utm_medium=widget_footer&amp;utm_campaign=nagishexpress_widget" tabindex="0"><img src="'+SITE_URL+'/assets/images/credit_logo.svg" alt="NagishExpress Logo"></a></li></ul></div></div>';



    // Language Popup Menu Design

    var languagePopup = '<div class="nagishx-i18n-languages-list" id="nagishx-i18n-languages" role="dialog" aria-hidden="false"> <button type="button" id="nagishx-close-languages" class="nagishx-close-languages-selector" aria-label="Close window" tabindex="0">×</button> <ul style="font-size: 16px;"> <li class="'+enable_english_language+'"> <button type="button" data-lang-code="en" data-lang="English" tabindex="0" id="nagishx-language-en"> <span class="wne-flag-icon" data-wahfont="18" style="font-size: 18px;"> <img src="'+SITE_URL+'/assets/images/en.png" alt="English"> </span> <span class="wne-flag-name" data-wahfont="20" style="font-size: 20px;">English</span> </button> </li> <li class="'+enable_hebrew_language+'"> <button type="button" data-lang-code="he" data-lang="עברית" tabindex="0" id="nagishx-language-he"> <span class="wne-flag-icon" data-wahfont="18" style="font-size: 18px;"> <img src="'+SITE_URL+'/assets/images/he.png" alt="עברית"> </span> <span class="wne-flag-name" data-wahfont="20" style="font-size: 20px;">עברית</span> </button></li><li class="'+enable_russia_language+'"> <button type="button" data-lang-code="ru" data-lang="Pусский" tabindex="0" id="nagishx-language-ru"> <span class="wne-flag-icon" data-wahfont="18" style="font-size: 18px;"> <img src="'+SITE_URL+'/assets/images/ru.png" alt="Pусский"> </span> <span class="wne-flag-name" data-wahfont="20" style="font-size: 20px;">Pусский</span> </button> </li> <li class="'+enable_arabic_language+'"> <button type="button" data-lang-code="ar" data-lang="عربي" tabindex="0" id="nagishx-language-ar"> <span class="wne-flag-icon" data-wahfont="18" style="font-size: 18px;"> <img src="'+SITE_URL+'/assets/images/ar.png" alt="عربي"> </span> <span class="wne-flag-name" data-wahfont="20" style="font-size: 20px;">عربي</span> </button> </li> </ul></div>';







    // sidebar header section

    var sidebarHeader = '<div class="nagishx-buttons-header"> <div class="ng_leftsection"><button tabindex="0" type="button" class="close_container wahout" id="ng_closewidget_sidebar" aria-label="Close" title="Close"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><g id="Group_318" data-name="Group 318" transform="translate(-34 -29)"><rect id="Rectangle_206" data-name="Rectangle 206" width="25" height="25" rx="12.5" transform="translate(34 29)" fill="#051e42"></rect><g id="Group_75" data-name="Group 75" transform="translate(-1381.5 16.5)"><line id="Line_29" data-name="Line 29" x1="9" y2="9" transform="translate(1423.5 20.5)" fill="none" stroke="#fff" stroke-width="2"></line><line id="Line_30" data-name="Line 30" x2="9" y2="9" transform="translate(1423.5 20.5)" fill="none" stroke="#fff" stroke-width="2"></line></g></g></svg></button><button type="button" id="nagishx-accessibility-statement" class="wahout" aria-label="" title="" aria-haspopup="true" aria-expanded="false" tabindex="0"><span class="widget-icon" style="margin: 0px; font-size: 16px;" aria-hidden="true"><i class="flaticon-information-button"></i></span><span class="wne-button-title" data-wahfont="16" style="font-size: 16px;">'+accessibility_statement_button+'</span> </button></div> <div class="ng_rightsection '+enable_multilang_support+'"><button type="button" id="select-nagishx-language" tabindex="0" class="'+pointerDisabled+'"> <span class="wne-flag-icon" data-wahfont="15" style="font-size: 15px;"> <img src= "'+SITE_URL+'/assets/images/'+selectedlanguage+'.png" alt="'+selectedlanguageText+'" class="wahImageTooltip"> </span> <span class="wne-flag-name" data-wahfont="15" style="font-size: 15px;">'+selectedlanguageText+'</span> </button></div> '+languagePopup+' </div>';



    var fontSettingSection = '<div class="fontSettingSection"><!-- Row item 1 start--><div class="fontSettingSection_header"><div class="ng_rowitem"><div class="ng_rowitem_inner"><div class="ng_widget_section_title" aria-label="'+font_setting_title+'" title="'+font_setting_title+'"><span class="ng_button_title" >'+font_setting_title+'</span></div></div><div class="ng_rowitem_inner"><button tabindex="0" type="button" class="ng-font-reset" title="'+reset_font_size_title+'" aria-label="'+reset_font_size_title+'" id="ng_reset_font_setting"><span class="wne-button-title">'+reset_font_size_title+'</span><span class="widget-icon" ><i class="flaticon-refresh"></i></span></button></div></div></div> <!-- Row item 1 END-->  <!-- Row item 2 start--><div class="ng_rowitem"><div class="ng_rowitem_inner ng_enable_readable_fonts"> <button tabindex="0" data-widgetid="widget-3" type="button" class="ng_btnhover" id="ng_enable_readable_font" aria-label="'+make_readable_title+'" title="'+make_readable_title+'"><span class="wne-button-title">'+make_readable_title+'</span><span class="widget-icon"><i class="flaticon-font"></i></span></button> </div><div class="ng_rowitem_inner"><button tabindex="0" type="button" id="ng_enable_small_fonts" class="wne-action-button smaller wahout ng_btnhover" title="'+font_small_title+'" aria-label="'+font_small_title+'"><span class="wne-button-title">'+font_small_title+'</span><span class="widget-icon"><i class="flaticon-resize-font"></i></span></button></div><div class="ng_rowitem_inner"><button tabindex="0" type="button" id="ng_enable_big_fonts" class="wne-action-button larger wahout ng_btnhover" title="'+font_large_title+'" aria-label="'+font_large_title+'"><span class="wne-button-title">'+font_large_title+'</span><span class="widget-icon"><i class="flaticon-resize-font-1"></i></span></button></div></div><!-- Row item 2 END--> <!-- Row item 3 start--><div class="ng_rowitem"><div class="ng_rowitem_inner ng_enable_left_fonts"> <button tabindex="0" data-widgetid="widget-3" type="button" id="ng_enable_left_fonts" class="ng_btnhover" aria-label="'+font_left_title+'" title="'+font_left_title+'"><span class="wne-button-title">'+font_left_title+'</span><span class="widget-icon"><i class="flaticon-align-left"></i></span></button> </div><div class="ng_rowitem_inner"><button tabindex="0" id="ng_enable_center_fonts" type="button" class="wne-action-button smaller wahout ng_btnhover" title="'+font_center_title+'" aria-label="'+font_center_title+'"><span class="wne-button-title">'+font_center_title+'</span><span class="widget-icon"><i class="flaticon-format"></i></span></button></div><div class="ng_rowitem_inner"><button tabindex="0" type="button" class="wne-action-button larger wahout ng_btnhover" id="ng_enable_right_fonts" title="'+font_right_title+'" aria-label="'+font_right_title+'"><span class="wne-button-title">'+font_right_title+'</span><span class="widget-icon "><i class="flaticon-align-right"></i></span></button></div></div><!-- Row item 3 END-->  </div>';



    var contrastVariationhtml1 = '';

    var contrastVariationhtml2 = '';

    var contrastVariationhtml3 = '';

    var contrastVariationhtml4 = '';



    var contrantVariationColors1 = ['#000000','#ffffff','#008000','#0000ff','#ff0000','#ff6a00','#ffd800','#b200ff'];

    var contrantVariationColors2 = ['#ffffff','#000000','#008000','#0000ff','#ff0000','#ff6a00','#008080','#ffd800','#7fffd4','#00ff00'];



    // if(contrast_variations == true && contrast_variations_colors.length > 0){

        var contrastVariationcolorhtml1 = '';

        var contrastVariationcolorhtml2 = '';

        var contrastVariationcolorhtml3 = '';

        var contrastVariationcolorhtml4 = '';

        // contrast_variations_colors.forEach(function(item, index){

        //     contrastVariationcolorhtml1  += '<span class="ng_bgcolor_contrast_selection ng_color_contrast_selection nagishx-bgcolor_contrast-property" data-bgcolor="'+item.backgroundcolor+'" data-color="'+item.textcolor+'" title="'+item.title+'" aria-label="'+item.title+'" tabindex="0" style="background-color: '+item.backgroundcolor+' !important;"></span>';



        //     contrastVariationcolorhtml2  += '<span class="ng_headercolor_contrast_selection ng_color_contrast_selection nagishx-headercolor_contrast-property" data-bgcolor="'+item.backgroundcolor+'" data-color="'+item.textcolor+'" style="background-color: '+item.textcolor+' !important;" title="'+item.title+'" aria-label="'+item.title+'" tabindex="0"></span>';



        //     contrastVariationcolorhtml3  += '<span class="nagishx-textcolor_contrast-property ng_textcolor_contrast_selection ng_color_contrast_selection"  title="'+item.title+'" data-bgcolor="'+item.backgroundcolor+'" data-color="'+item.textcolor+'" aria-label="'+item.title+'" style="background-color: '+item.textcolor+' !important;" tabindex="0"></span>';



        //     contrastVariationcolorhtml4  += '<span class="nagishx-linkcolor_contrast-property ng_linkcolor_contrast_selection ng_color_contrast_selection"  title="'+item.title+'" aria-label="'+item.title+'" data-bgcolor="'+item.backgroundcolor+'" data-color="'+item.textcolor+'" style="background-color: '+item.textcolor+' !important;" tabindex="0"></span>';

        // });



        if(contrantVariationColors1.length > 0){

            contrantVariationColors1.forEach(function(item, index){

                contrastVariationcolorhtml1  += '<span class="ng_bgcolor_contrast_selection ng_color_contrast_selection nagishx-bgcolor_contrast-property" data-bgcolor="'+item+'" data-color="'+item+'" tabindex="0" style="background-color: '+item+' !important;"></span>';

                

            });

        }



        if(contrantVariationColors2.length > 0){

            contrantVariationColors2.forEach(function(item, index){

                contrastVariationcolorhtml2  += '<span class="ng_headercolor_contrast_selection ng_color_contrast_selection nagishx-headercolor_contrast-property" data-bgcolor="'+item+'" data-color="'+item+'" style="background-color: '+item+' !important;" tabindex="0"></span>';



                contrastVariationcolorhtml3  += '<span class="nagishx-textcolor_contrast-property ng_textcolor_contrast_selection ng_color_contrast_selection" data-bgcolor="'+item+'" data-color="'+item+'" style="background-color: '+item+' !important;" tabindex="0"></span>';



                contrastVariationcolorhtml4  += '<span class="nagishx-linkcolor_contrast-property ng_linkcolor_contrast_selection ng_color_contrast_selection" data-bgcolor="'+item+'" data-color="'+item+'" style="background-color: '+item+' !important;" tabindex="0"></span>';

                

            });

        }



        

        

        var contrastVariationhtml1 = '<!-- Row inner item 2 start--> <div class="ng_primary_button ng_bgcolor_contrast mt-2"><button tabindex="0" type="button" id="ng_enable_bgcolor_contrast" class="ng_btnhover" aria-label="'+adjust_background_colors_title+'" title="'+adjust_background_colors_title+'"> <div class="colorItemsContrast col-7"> '+contrastVariationcolorhtml1+' </div> <div class="flex col-5 flex-row-reverse align-items-center justify-content-end"><span class="wne-button-title ml-1">'+adjust_background_colors_title+'</span><span class="color-icon widget-icon"><i class="flaticon-color-picker-1"></i></span></div> </button></div><!-- Row inner item 2 start-->';

        var contrastVariationhtml2 = '<!-- Row inner item 3 start--> <div class="ng_primary_button ng_bgcolor_contrast mt-2"><button tabindex="0" type="button" id="ng_enable_bgcolor_contrast" class="ng_btnhover" aria-label="'+adjust_title_colors_title+'" title="'+adjust_title_colors_title+'"> <div class="colorItemsContrast col-7"> '+contrastVariationcolorhtml2+' </div> <div class="flex col-5 flex-row-reverse align-items-center justify-content-end"><span class="wne-button-title ml-1" >'+adjust_title_colors_title+'</span><span class="color-icon widget-icon" ><i class="flaticon-color-picker-1"></i></span></div> </button></div><!-- Row inner item 3 start-->';

        var contrastVariationhtml3 = '<!-- Row inner item 4 start--> <div class="ng_primary_button ng_bgcolor_contrast mt-2"><button tabindex="0" type="button" id="ng_enable_textcolor_contrast" class="ng_btnhover" aria-label="'+adjust_text_colors_title+'" title="'+adjust_text_colors_title+'"> <div class="colorItemsContrast col-7"> '+contrastVariationcolorhtml3+' </div> <div class="flex col-5 flex-row-reverse align-items-center justify-content-end"><span class="wne-button-title ml-1">'+adjust_text_colors_title+'</span><span class="color-icon widget-icon"><i class="flaticon-color-picker-1"></i></span></div> </button></div><!-- Row inner item 4 start-->';

        var contrastVariationhtml4 = '<!-- Row inner item 5 start--> <div class="ng_primary_button ng_bgcolor_contrast mt-2"><button tabindex="0" type="button" id="ng_enable_linkcolor_contrast" class="ng_btnhover" aria-label="'+adjust_link_colors+'" title="'+adjust_link_colors+'"> <div class="colorItemsContrast col-7"> '+contrastVariationcolorhtml4+' </div> <div class="flex col-5 flex-row-reverse align-items-center justify-content-end"><span class="wne-button-title ml-1">'+adjust_link_colors+'</span><span class="color-icon widget-icon"><i class="flaticon-color-picker-1"></i></span></div> </button></div><!-- Row inner item 5 start-->';

    // }

    



    var colorSettingSection = '<div class="backgroundColorsSection fontSettingSection"><!-- Row item 1 start--><div class="fontSettingSection_header" id="ng_dropdown_toggle_buttonicon"><div class="ng_rowitem ng_dropdown_parent"><div class="ng_rowitem_inner"><div class="ng_widget_section_title" aria-label="'+color_adjustment_settings+'" title="'+color_adjustment_settings+'"><span class="ng_button_title" >'+color_adjustment_settings+'</span></div></div><div class="ng_rowitem_inner"><button tabindex="0" type="button" class="ng-font-reset" title="colorSettingSectiondropdown" aria-label="colorSettingSectiondropdown" id="ng_dropdown_icon_setting"><span class="widget-icon" ><svg xmlns="http://www.w3.org/2000/svg" width="10" height="5.718" viewBox="0 0 10 5.718"><path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M11.189,15.241l3.781-3.784a.712.712,0,0,1,1.009,0,.721.721,0,0,1,0,1.012L11.7,16.756a.713.713,0,0,1-.985.021L6.4,12.472a.715.715,0,0,1,1.009-1.012Z" transform="translate(-6.188 -11.246)" fill="#051e42"></path></svg></span></button></div></div></div> <!-- Row item 1 END--> <!-- Row item 2 start--><div class="ng_dropdownToggleonButton mt-3" style="display:none;"> <!-- Row inner item 1 start--> <div class="ng_primary_button ng_greyscale_image"><button tabindex="0" type="button" id="ng_enable_greyscale_image" class="ng_btnhover" aria-label="'+greyscale_images_button_title+'" title="'+greyscale_images_button_title+'"><span class="wne-button-title">'+greyscale_images_button_title+'</span><span class="widget-icon "><i class="flaticon-system"></i></span></button></div><!-- Row inner item 1 start-->  '+contrastVariationhtml1+' '+contrastVariationhtml2+' '+contrastVariationhtml3+' '+contrastVariationhtml4+'   </div> <!-- Row item 2 END--></div>';



    var contrastSettingSection = '<div class="ContrastbgSection fontSettingSection"><!-- Row item 1 start--><div class="fontSettingSection_header" id=""><div class="ng_rowitem ng_dropdown_parent"><div class="ng_rowitem_inner"><div class="ng_widget_section_title" aria-label="'+contrast_setting+'" title="'+contrast_setting+'"><span class="ng_button_title" >'+contrast_setting+'</span></div></div></div></div> <!-- Row item 1 END--> <!-- Row item 2 Start --> <div class="ng_rowitem"><div class="ng_rowitem_inner ng_enable_invert_color"> <button tabindex="0" data-widgetid="widget-3" type="button" id="ng_enable_invert_mode" class="ng_btnhover" aria-label="'+invert_button_title+'" title="'+invert_button_title+'" id="ng_enable_invert_color"><span class="wne-button-title">'+invert_button_title+'</span><span class="widget-icon"><i class="flaticon-contrast"></i></span></button> </div><div class="ng_rowitem_inner"><button tabindex="0" type="button" id="ng_enable_sepia_mode" class="wne-action-button smaller wahout ng_btnhover" title="'+sepia_mode_title+'" aria-label="'+sepia_mode_title+'"><span class="wne-button-title">'+sepia_mode_title+'</span><span class="widget-icon"><i class="flaticon-contrast-1"></i></span></button></div><div class="ng_rowitem_inner"><button tabindex="0" type="button" class="wne-action-button larger wahout ng_btnhover" id="ng_enable_monochrome_mode" title="'+monochrome_mode_title+'" aria-label="'+monochrome_mode_title+'"><span class="wne-button-title">'+monochrome_mode_title+'</span><span class="widget-icon "><i class="flaticon-themes"></i></span></button></div></div> <!-- Row item 2 END--> </div>';







    var sidebarInnersection = '<div class="ng_access_container_inner"><div class="access_container_inner_inner"> <div class="a_module wne_clear_cookies"> <button tabindex="0" type="button" id="ng_clear_cookies_button" aria-label="'+clear_cookies_title+'" title="'+clear_cookies_title+'"><span class="wne-button-title" data-wahfont="16" style="font-size: 16px;">'+clear_cookies_title+'</span><span class="widget-icon" data-wahfont="14" style="font-size: 14px;"><svg xmlns="http://www.w3.org/2000/svg" width="19.327" height="15.563" viewBox="0 0 19.327 15.563"> <g id="Icon_feather-refresh-cw" data-name="Icon feather-refresh-cw" transform="translate(-0.086 -3.47)"> <path id="Path_108" data-name="Path 108" d="M30,6v4.5H25.5" transform="translate(-12 -0.748)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <path id="Path_109" data-name="Path 109" d="M1.5,25.5V21H6" transform="translate(0 -8.248)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <path id="Path_110" data-name="Path 110" d="M3.382,9A6.75,6.75,0,0,1,14.52,6.482L18,9.752m-16.5,3,3.48,3.27A6.75,6.75,0,0,0,16.117,13.5" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> </g> </svg> </span></button> </div> <div class="ng_rowitem"><div class="ng_rowitem_inner wne_enable_adhd_profile"><button tabindex="0" type="button" id="ng_adhd_button" class="ng_btnhover" aria-label="'+adhd_button_title+'" title="'+adhd_button_title+'"><span class="wne-button-title">'+adhd_button_title+'</span><span class="widget-icon stressed"><i class="flaticon-adhd"></i></span></button></div> <div class="ng_rowitem_inner  wne_enable_cd_profile"><button tabindex="0" type="button" id="ng_enable_cd_profile" class="ng_btnhover" aria-label="'+cognitive_disability_profile_button_title+'" title="'+cognitive_disability_profile_button_title+'"><span class="wne-button-title">'+cognitive_disability_profile_button_title+'</span><span class="widget-icon"><i class="flaticon-idea"></i></span></button></div>   </div><!---- row item between 1 and 2 ---> <div class="ng_rowitem"><div class="ng_rowitem_inner wne_enable_speech_profile"><button tabindex="0" type="button" id="ng_speech_button" class="ng_btnhover" aria-label="'+speech_button_title+'" title="'+speech_button_title+'"><span class="wne-button-title">'+speech_button_title+'</span><span class="widget-icon stressed"><i class="flaticon-microphone-black-shape"></i></span></button></div> <div class="ng_rowitem_inner wne_keyboard_navigation"><button tabindex="0" type="button" id="ng_keyboard_navigation" class="ng_btnhover" aria-label="'+keyboard_navigation_description+'" title="'+keyboard_navigation_description+'"><span class="wne-button-title">'+keyboard_navigation_description+'</span><span class="widget-icon"><i class="flaticon-keyboard"></i></span></button></div> </div>  <!---- row item 2 ---> <div class="ng_rowitem">  <div class="ng_rowitem_inner wne_enable_cd_profile"><button tabindex="0" type="button" id="ng_highlight_links" class="ng_btnhover" aria-label="'+highlight_links_title+'" title="'+highlight_links_title+'"><span class="wne-button-title">'+highlight_links_title+'</span><span class=" widget-icon"><i class="flaticon-bucket"></i></span></button></div><div class="ng_rowitem_inner wne_enable_large_text"><button tabindex="0" type="button" id="ng_large_button" class="ng_btnhover" aria-label="'+zoom_button_title+'" title="'+zoom_button_title+'"><span class="wne-button-title">'+zoom_button_title+'</span><span class="widget-icon stressed"><i class="flaticon-enlarge"></i></span></button></div></div> <!---- row item 3 ---> <div class="ng_rowitem "><div class="ng_rowitem_inner wne_word_spacing"><button tabindex="0" type="button" id="ng_enable_word_spacing" class="ng_btnhover" aria-label="'+word_spacing_title+'" title="'+word_spacing_title+'"><span class="wne-button-title">'+word_spacing_title+'</span><span class="widget-icon"><i class="flaticon-distribute-spacing-horizontal"></i></span></button></div>  <div class="ng_rowitem_inner wne_remove_animations"><button tabindex="0" type="button" id="ng_enable_remove_animations" class="ng_btnhover" aria-label="'+remove_animations_title+'" title="'+remove_animations_title+'"><span class="wne-button-title">'+remove_animations_title+'</span><span class="widget-icon"><i class="flaticon-pause-1"></i></span></button></div></div> <!---- row item 4 ---> <div class="ng_rowitem"><div class="ng_rowitem_inner wne_underline_links"><button tabindex="0" type="button" id="ng_enable_underline_links" class="ng_btnhover" aria-label="'+underline_links_title+'" title="'+underline_links_title+'"><span class="wne-button-title">'+underline_links_title+'</span><span class="widget-icon"><i class="flaticon-link"></i></span></button></div>  <div class="ng_rowitem_inner wne_image_description"><button tabindex="0" type="button" id="ng_enable_image_description" class="ng_btnhover" aria-label="'+display_image_description_title+'" title="'+display_image_description_title+'"><span class="wne-button-title">'+display_image_description_title+'</span><span class="widget-icon"><i class="flaticon-comment"></i></span></button></div></div> <!---- row item 5 ---> <div class="ng_rowitem"><div class="ng_rowitem_inner wne_letter_spacing"><button tabindex="0" type="button" id="ng_enable_letter_spacing" class="ng_btnhover" aria-label="'+letter_spacing_title+'" title="'+letter_spacing_title+'"><span class="wne-button-title">'+letter_spacing_title+'</span><span class="widget-icon "><i class="flaticon-text-spacing"></i></span></button></div>  <div class="ng_rowitem_inner wne_line_height"><button tabindex="0" type="button" id="ng_enable_line_height" class="ng_btnhover" aria-label="'+line_height_title+'" title="'+line_height_title+'"><span class="wne-button-title">'+line_height_title+'</span><span class="widget-icon"><i class="flaticon-line-height"></i></span></button></div></div> <!---- row item 6 ---> <div class="ng_rowitem"><div class="ng_rowitem_inner wne_large_cursor"><button tabindex="0" type="button" id="ng_enable_large_cursor" class="ng_btnhover" aria-label="'+large_mouse_cursor_title+'" title="'+large_mouse_cursor_title+'"><span class="wne-button-title" >'+large_mouse_cursor_title+'</span><span class="widget-icon"><i class="flaticon-cursor"></i></span></button></div>  <div class="ng_rowitem_inner wne_hide_images"><button tabindex="0" type="button" id="ng_enable_hide_images" class="ng_btnhover" aria-label="'+hide_images_title+'" title="'+hide_images_title+'"><span class="wne-button-title">'+hide_images_title+'</span><span class="widget-icon "><i class="flaticon-photo"></i></span></button></div></div> <!---- row item 7 ---> <div class="ng_rowitem"><div class="ng_rowitem_inner wne_table_content"><button tabindex="0" type="button" id="ng_enable_table_content" class="ng_btnhover" aria-label="'+table_content_title+'" title="'+table_content_title+'"><span class="wne-button-title">'+table_content_title+'</span><span class="widget-icon"><i class="flaticon-rectangles"></i></span></button></div>  <div class="ng_rowitem_inner wne_mute_volume"><button tabindex="0" type="button" id="ng_enable_mute_volume" class="ng_btnhover" aria-label="'+mute_volume_title+'" title="'+mute_volume_title+'"><span class="wne-button-title">'+mute_volume_title+'</span><span class="widget-icon"><i class="flaticon-volume-mute"></i></span></button></div></div> '+fontSettingSection+' '+colorSettingSection+' '+contrastSettingSection+' '+headingUlData+'  </div> '+FooterSectionWidget+' </div>';



    var popupStyles = '<style>.ng_popup_container { background-color: rgba(0, 0, 0, 0.75);position: fixed; width: 100%; height: 100vh; top: 0; left: 0; z-index: 999999; display: none; align-items: center; justify-content: center;} .ng_inner_content_popup { width: 70vw;margin: 0 auto;font-size: 14px;background-color: #FFF;position: relative;padding: 20px;} .ng_statement_content {overflow-y: scroll;height: 80vh;} .ng_statement_content { -ms-overflow-style: none; scrollbar-width: none; } .ng_statement_content::-webkit-scrollbar { display: none; } #ng_close_statement_popup { font-size: 30px; font-weight: bold; position: absolute; top: 0; right: 15px; cursor: pointer; }</style>';

    var statementPopupContent = '<div id="ng_popup_statement" class="ng_popup_container"> '+popupStyles+' <div class="ng_inner_content_popup"><span id="ng_close_statement_popup">&times;</span> <div class="ng_statement_content">'+accessibility_statement_content+'</div> </div> </div> ';

    

    var MobileCSS = '<style>@media screen and (max-width: 576px) { body .accessability_container .wne-footer-links { margin-bottom: 60px !important; } } .skip-to-main-content-link-ng { position: fixed; left: -9999px; z-index: 99999999999; padding: 0.5em 1rem; background-color: #44849d; color: #ffffff; font-weight: 900; opacity: 0; top: 20px;  font-size: 20px; } .skip-to-main-content-link-ng:focus { left: 20px; opacity: 1; } .colorItemsContrast { display: flex; align-items: center; justify-content: flex-end; }</style>';

    

    var skiplinkHtml = "";

    if(enable_skip_links_menu == true){

        if(nggetCookie('ng_setskip_link') != 'ng_setskip_link'){

            skiplinkHtml = '<a href="'+skip_links_content_id+'" class="skip-to-main-content-link-ng" id="ng_setskip_link" tabindex="0">Skip Link</a>';

        }

    }



    var sidebarHtmlData = '<div id="ng_sidebar_wahout" class="ng_contBox accessability_container '+show_sidebar_left+'"> '+inactiveContentDataHtml+' '+sidebarHeader+' '+sidebarInnersection+'   </div> '+statementPopupContent+' '+skiplinkHtml;

    

    var trasnformLogo1 = "0";

    var trasnformLogo2 = "0"; 

    

    // if(logopositionside1 == "left" && logopositionside2 != "top"){

    //     trasnformLogo1 = '50%';

    //     logopositionside1 = 'top';

    // }else if(logopositionside1 == "center"){

    //     trasnformLogo1 = '50%';

    //     logopositionside1 = 'left';

    // }

    

    if(logopositionside2 == "center" && logopositionside1 == "left"){

         trasnformLogo2 = '50%';

         logopositionside2 = 'top';

    }else if(logopositionside2 == "center" && logopositionside1 == "right"){

        trasnformLogo2 = '50%';

         logopositionside2 = 'top';

    }else if(logopositionside2 == "center" && logopositionside1 == "bottom"){

        trasnformLogo2 = '50%';

         logopositionside2 = 'left';

    }else if(logopositionside2 == "center" && logopositionside1 == "top"){

        trasnformLogo2 = '50%';

         logopositionside2 = 'left';

    }

    

    // '+sidebarHtmlData+'

    var nagishWidgethtml = '<div id="ng_sidebar_wahout_class"> '+StyleCSS1+' '+MobileCSS+'  <div id="sideBardContentSection"></div><style>.wah-adhd-mask { position: fixed; left: 0; right: 0; margin: auto; width: 100%; height: 0; pointer-events: none; background-color: rgba(0, 0, 0, 0.8); z-index: 99999999999999999999; }.wah-adhd-mask.wah-adhd-top-element { top: 0; bottom: auto; }.wah-adhd-mask.wah-adhd-bottom-element { top: auto; bottom: 0; } button.ngwahout.custom-icon{ position: fixed; z-index:99999; outline: none; border: none;} .ng_logoposition{ '+logopositionside1+': '+trasnformLogo1+'; '+logopositionside2+': '+trasnformLogo2+';} .ng_shape_circle { border-radius: 100% !important;padding: 8px; } img.ng_wahout_img { width: 100%; height: 100%; } .ng_button_size { width: '+button_size+' !important; height: '+button_size+' !important;padding: 6px; } .ng_positionClassSide1 { margin-'+positionClassSide1+': '+positionValueSide1+' !important; } .ng_positionClassSide2 { margin-'+positionClassSide2+': '+positionValueSide2+' !important; } .ng_shape_half_left_circle { border-top-left-radius: 80px; border-bottom-left-radius: 80px; text-align: center; } .ng_shape_square{ border-radius : 0px; } .ng_shape_square_rounded { border-radius: 10px; } .ng_shape_half_right_circle { border-top-right-radius: 80px; border-bottom-right-radius: 80px; text-align: center; } @media only screen and (max-width: 767px) { .ng_hide_on_mobile { display: none !important; } }</style> <button type="button" id="ng_wahout_button" class="ng_contBox ngwahout custom-icon aicon_link ng_logoposition ng_button_size '+shape_type+' '+hide_on_mobile+' ng_positionClassSide1 ng_positionClassSide2" aria-label="Open/close WP Accessibility Helper sidebar" title="Open/close WP Accessibility Helper sidebar" style="background-color:'+buttonColor+' !important"> '+button_icon+'</button> </div>';





        var selected_div_element = document.getElementsByTagName('body');

        selected_div_element[0].insertAdjacentHTML('beforeend',nagishWidgethtml);



        let IsOpenngxSideBar = false;

        document.getElementById("ng_wahout_button").onclick = function(){

            if(IsOpenngxSideBar == false){

                var sidebarContent = document.getElementById("sideBardContentSection");

                sidebarContent.insertAdjacentHTML('beforeend',sidebarHtmlData);

                IsOpenngxSideBar = true;



                document.getElementById("ng_closewidget_sidebar").onclick = function(){

                    var sidebarView = document.getElementById("ng_sidebar_wahout");

                    sidebarView.style.display = 'none';

                }



                document.getElementById("nagishx-accessibility-statement").onclick = function(){

                    var sidebarView = document.getElementById("ng_popup_statement");

                    sidebarView.style.display = 'flex';

                }



                document.getElementById("ng_close_statement_popup").onclick = function(){

                    var PopupbarHideNg = document.getElementById("ng_popup_statement");

                    PopupbarHideNg.style.display = 'none';

                }



                if(enable_skip_links_menu == true){

                    if(nggetCookie('ng_setskip_link') != 'ng_setskip_link'){

                        document.getElementById("ng_setskip_link").onclick = function(){

                            ngsetCookie('ng_setskip_link','ng_setskip_link',30);

                        }

                    }

                }



                

                



                document.getElementById("ng_enable_cd_profile").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_cd_profile_active');

                    if(nggetCookie('ng_enable_cd_profile_active') == 'ng_enable_cd_profile_active') {

                        ngdeleteCookie('ng_enable_cd_profile_active');

                    }else{

                        ngsetCookie('ng_enable_cd_profile_active','ng_enable_cd_profile_active',30);

                    }

                    

                }



                document.getElementById("ng_highlight_links").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_highlight_links_active');

                    if(nggetCookie('ng_enable_highlight_links_active') == 'ng_enable_highlight_links_active') {

                        ngdeleteCookie('ng_enable_highlight_links_active');

                    }else{

                        ngsetCookie('ng_enable_highlight_links_active','ng_enable_highlight_links_active',30);

                    }

                }



                document.getElementById("ng_enable_word_spacing").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_word_spacing_active');

                    if(nggetCookie('ng_enable_word_spacing_active') == 'ng_enable_word_spacing_active') {

                        ngdeleteCookie('ng_enable_word_spacing_active');

                    }else{

                        ngsetCookie('ng_enable_word_spacing_active','ng_enable_word_spacing_active',30);

                    }

                }



                document.getElementById("ng_enable_underline_links").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_underline_links_active');

                    if(nggetCookie('ng_enable_underline_links_active') == 'ng_enable_underline_links_active') {

                        ngdeleteCookie('ng_enable_underline_links_active');

                    }else{

                        ngsetCookie('ng_enable_underline_links_active','ng_enable_underline_links_active',30);

                    }

                }

                

                document.getElementById("ng_speech_button").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_speech_button_active');

                    

                    if(nggetCookie('ng_enable_speech_button_active') == 'ng_enable_speech_button_active') {

                        ngdeleteCookie('ng_enable_speech_button_active');               

                        remove_textspeech_tooltip();

                        

                    }else{

                        

                        ngsetCookie('ng_enable_speech_button_active','ng_enable_speech_button_active',30);

                        textToSpeechEnabled = true;

                        init_textspeech_tooltip();

                        

                    }

                    

                }

                

                

                document.getElementById("ng_large_button").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_large_button_active');

                    if(nggetCookie('ng_large_button_active') == 'ng_large_button_active') {

                        ngdeleteCookie('ng_large_button_active');               

                        remove_text_tooltip();

                        //console.log('clickDelete');

                    }else{

                        //console.log('clickAdd');

                        ngsetCookie('ng_large_button_active','ng_large_button_active',30);

                        init_text_tooltip();

                        

                    }

                }

                document.getElementById("ng_adhd_button").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_adhd_button_active');

                    if(nggetCookie('ng_enable_adhd_button_active') == 'ng_enable_adhd_button_active') {

                        ngdeleteCookie('ng_enable_adhd_button_active');

                        remove_adhd_fiendly_profile();

                    }else{

                        ngsetCookie('ng_enable_adhd_button_active','ng_enable_adhd_button_active',30);

                        init_adhd_fiendly_profile();

                    }

                }



                document.getElementById("ng_keyboard_navigation").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_keyboard_navigation_active');

                    if(nggetCookie('ng_enable_keyboard_navigation_active') == 'ng_enable_keyboard_navigation_active') {

                        ngdeleteCookie('ng_enable_keyboard_navigation_active');

                    }else{

                        ngsetCookie('ng_enable_keyboard_navigation_active','ng_enable_keyboard_navigation_active',30);

                    }

                }



                document.getElementById("ng_enable_remove_animations").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_remove_animations_active');

                    if(nggetCookie('ng_enable_remove_animations_active') == 'ng_enable_remove_animations_active') {

                        ngdeleteCookie('ng_enable_remove_animations_active');

                    }else{

                        ngsetCookie('ng_enable_remove_animations_active','ng_enable_remove_animations_active',30);

                    }

                }



                document.getElementById("ng_enable_image_description").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_image_description_active');

                    if(nggetCookie('ng_enable_image_description_active') == 'ng_enable_image_description_active') {
                        
                        ngdeleteCookie('ng_enable_image_description_active');
                        wah_remove_image_alt_tooltip();
                    }else{
                        ngsetCookie('ng_enable_image_description_active','ng_enable_image_description_active',30);
                        wah_render_image_alt_description();

                    }

                }



                document.getElementById("ng_enable_letter_spacing").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_letter_spacing_active');

                    if(nggetCookie('ng_enable_letter_spacing_active') == 'ng_enable_letter_spacing_active') {

                        ngdeleteCookie('ng_enable_letter_spacing_active');

                    }else{

                        ngsetCookie('ng_enable_letter_spacing_active','ng_enable_letter_spacing_active',30);

                    }
                    
                    

                }



                document.getElementById("ng_enable_line_height").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_line_height_active');

                    if(nggetCookie('ng_enable_line_height_active') == 'ng_enable_line_height_active') {

                        ngdeleteCookie('ng_enable_line_height_active');

                    }else{

                        ngsetCookie('ng_enable_line_height_active','ng_enable_line_height_active',30);

                    }

                }



                document.getElementById("ng_enable_large_cursor").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_large_cursor_active');

                    if(nggetCookie('ng_enable_large_cursor_active') == 'ng_enable_large_cursor_active') {

                        ngdeleteCookie('ng_enable_large_cursor_active');

                    }else{

                        ngsetCookie('ng_enable_large_cursor_active','ng_enable_large_cursor_active',30);

                    }

                }



                document.getElementById("ng_enable_hide_images").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_hide_images_active');

                    if(nggetCookie('ng_enable_hide_images_active') == 'ng_enable_hide_images_active') {

                        ngdeleteCookie('ng_enable_hide_images_active');

                    }else{

                        ngsetCookie('ng_enable_hide_images_active','ng_enable_hide_images_active',30);

                    }

                }



                document.getElementById("ng_enable_table_content").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_table_content_active');

                    if(nggetCookie('ng_enable_table_content_active') == 'ng_enable_table_content_active') {

                        ngdeleteCookie('ng_enable_table_content_active');

                    }else{

                        ngsetCookie('ng_enable_table_content_active','ng_enable_table_content_active',30);

                    }

                }



                document.getElementById("ng_close_table_content_popup").onclick = function(){

                    selected_div_element[0].classList.remove('ng_enable_table_content_active');

                    ngdeleteCookie('ng_enable_table_content_active');

                }



                



                document.getElementById("ng_enable_mute_volume").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_mute_volume_active');

                    if(nggetCookie('ng_enable_mute_volume_active') == 'ng_enable_mute_volume_active') {

                        ngdeleteCookie('ng_enable_mute_volume_active');

                    }else{

                        ngsetCookie('ng_enable_mute_volume_active','ng_enable_mute_volume_active',30);

                    }

                }



                document.getElementById("ng_enable_readable_font").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_readable_font_active');

                    if(nggetCookie('ng_enable_readable_font_active') == 'ng_enable_readable_font_active') {

                        ngdeleteCookie('ng_enable_readable_font_active');

                    }else{

                        ngsetCookie('ng_enable_readable_font_active','ng_enable_readable_font_active',30);

                    }

                }



                document.getElementById("ng_enable_left_fonts").onclick = function(){

                    selected_div_element[0].classList.remove('ng_enable_right_fonts_active');

                    selected_div_element[0].classList.remove('ng_enable_center_fonts_active');

                    selected_div_element[0].classList.toggle('ng_enable_left_fonts_active');

                    ngdeleteCookie('ng_enable_right_fonts_active');

                    ngdeleteCookie('ng_enable_center_fonts_active');

                    if(nggetCookie('ng_enable_left_fonts_active') == 'ng_enable_left_fonts_active') {

                        ngdeleteCookie('ng_enable_left_fonts_active');

                    }else{

                        ngsetCookie('ng_enable_left_fonts_active','ng_enable_left_fonts_active',30);

                    }

                }



                document.getElementById("ng_enable_center_fonts").onclick = function(){

                    selected_div_element[0].classList.remove('ng_enable_right_fonts_active');

                    selected_div_element[0].classList.remove('ng_enable_left_fonts_active');

                    selected_div_element[0].classList.toggle('ng_enable_center_fonts_active');

                    ngdeleteCookie('ng_enable_right_fonts_active');

                    ngdeleteCookie('ng_enable_left_fonts_active');

                    if(nggetCookie('ng_enable_center_fonts_active') == 'ng_enable_center_fonts_active') {

                        ngdeleteCookie('ng_enable_center_fonts_active');

                    }else{

                        ngsetCookie('ng_enable_center_fonts_active','ng_enable_center_fonts_active',30);

                    }

                }



                document.getElementById("ng_enable_right_fonts").onclick = function(){

                    selected_div_element[0].classList.remove('ng_enable_center_fonts_active');

                    selected_div_element[0].classList.remove('ng_enable_left_fonts_active');

                    selected_div_element[0].classList.toggle('ng_enable_right_fonts_active');

                    ngdeleteCookie('ng_enable_center_fonts_active');

                    ngdeleteCookie('ng_enable_left_fonts_active');

                    if(nggetCookie('ng_enable_right_fonts_active') == 'ng_enable_right_fonts_active') {

                        ngdeleteCookie('ng_enable_right_fonts_active');

                    }else{

                        ngsetCookie('ng_enable_right_fonts_active','ng_enable_right_fonts_active',30);

                    }

                }



                document.getElementById("ng_enable_small_fonts").onclick = function(){

                    UpdateFontSize('descrease');

                }



                document.getElementById("ng_enable_big_fonts").onclick = function(){

                    UpdateFontSize('increase');

                }



                document.getElementById("ng_reset_font_setting").onclick = function(){

                    ngdeleteCookie('active_bgcolor_contrast_selection');

                    ngdeleteCookie('ng_enable_readable_font_active');

                    ngdeleteCookie('ng_enable_right_fonts_active');

                    ngdeleteCookie('ng_enable_center_fonts_active');

                    ngdeleteCookie('ng_enable_left_fonts_active');

                    ngdeleteCookie('active_headercolor_contrast_selection');

                    ngdeleteCookie('active_textcolor_contrast_selection');

                    ngdeleteCookie('active_linkcolor_contrast_selection');

                    window.location.reload();

                }



                document.getElementById("ng_clear_cookies_button").onclick = function(){

                    ngdeleteCookie('ng_enable_cd_profile_active');

                    ngdeleteCookie('ng_setskip_link');

                    ngdeleteCookie('ng_enable_highlight_links_active');

                    ngdeleteCookie('ng_enable_word_spacing_active');

                    ngdeleteCookie('ng_enable_underline_links_active');

                    ngdeleteCookie('ng_enable_keyboard_navigation_active');

                    ngdeleteCookie('ng_enable_adhd_button_active');

                    ngdeleteCookie('ng_enable_remove_animations_active');

                    ngdeleteCookie('ng_enable_image_description_active');

                    ngdeleteCookie('ng_enable_letter_spacing_active');

                    ngdeleteCookie('ng_enable_line_height_active');

                    ngdeleteCookie('ng_enable_large_cursor_active');

                    ngdeleteCookie('ng_enable_hide_images_active');

                    ngdeleteCookie('ng_enable_table_content_active');

                    ngdeleteCookie('ng_enable_mute_volume_active');

                    ngdeleteCookie('ng_enable_readable_font_active');

                    ngdeleteCookie('ng_enable_right_fonts_active');

                    ngdeleteCookie('ng_enable_center_fonts_active');

                    ngdeleteCookie('ng_enable_left_fonts_active');

                    ngdeleteCookie('ng_enable_greyscale_image_active');

                    ngdeleteCookie('ng_enable_monochrome_mode_active');

                    ngdeleteCookie('ng_enable_sepia_mode_active');

                    ngdeleteCookie('ng_enable_invert_mode_active');

                    ngdeleteCookie('active_bgcolor_contrast_selection');

                    ngdeleteCookie('active_headercolor_contrast_selection');

                    ngdeleteCookie('active_textcolor_contrast_selection');

                    ngdeleteCookie('active_linkcolor_contrast_selection');

                    ngdeleteCookie('active_language_selected');

                    

                    ngdeleteCookie('ng_enable_speech_button_active');

                    ngdeleteCookie('ng_large_button_active');

                    window.location.reload();

                }



                document.getElementById("ng_enable_greyscale_image").onclick = function(){

                    selected_div_element[0].classList.toggle('ng_enable_greyscale_image_active');

                    if(nggetCookie('ng_enable_greyscale_image_active') == 'ng_enable_greyscale_image_active') {

                        ngdeleteCookie('ng_enable_greyscale_image_active');

                    }else{

                        ngsetCookie('ng_enable_greyscale_image_active','ng_enable_greyscale_image_active',30);

                    }

                }



                document.getElementById("ng_enable_invert_mode").onclick = function(){

                    selected_div_element[0].classList.remove('ng_enable_monochrome_mode_active');

                    selected_div_element[0].classList.remove('ng_enable_sepia_mode_active');

                    selected_div_element[0].classList.toggle('ng_enable_invert_mode_active');

                    ngdeleteCookie('ng_enable_monochrome_mode_active');

                    ngdeleteCookie('ng_enable_sepia_mode_active');

                    if(nggetCookie('ng_enable_invert_mode_active') == 'ng_enable_invert_mode_active') {

                        ngdeleteCookie('ng_enable_invert_mode_active');

                    }else{

                        ngsetCookie('ng_enable_invert_mode_active','ng_enable_invert_mode_active',30);

                    }

                }



                document.getElementById("ng_enable_monochrome_mode").onclick = function(){

                    selected_div_element[0].classList.remove('ng_enable_invert_mode_active');

                    selected_div_element[0].classList.remove('ng_enable_sepia_mode_active');

                    selected_div_element[0].classList.toggle('ng_enable_monochrome_mode_active');

                    ngdeleteCookie('ng_enable_invert_mode_active');

                    ngdeleteCookie('ng_enable_sepia_mode_active');

                    if(nggetCookie('ng_enable_monochrome_mode_active') == 'ng_enable_monochrome_mode_active') {

                        ngdeleteCookie('ng_enable_monochrome_mode_active');

                    }else{

                        ngsetCookie('ng_enable_monochrome_mode_active','ng_enable_monochrome_mode_active',30);

                    }

                }



                document.getElementById("ng_enable_sepia_mode").onclick = function(){

                    selected_div_element[0].classList.remove('ng_enable_invert_mode_active');

                    selected_div_element[0].classList.remove('ng_enable_monochrome_mode_active');

                    selected_div_element[0].classList.toggle('ng_enable_sepia_mode_active');

                    ngdeleteCookie('ng_enable_invert_mode_active');

                    ngdeleteCookie('ng_enable_monochrome_mode_active');

                    if(nggetCookie('ng_enable_sepia_mode_active') == 'ng_enable_sepia_mode_active') {

                        ngdeleteCookie('ng_enable_sepia_mode_active');

                    }else{

                        ngsetCookie('ng_enable_sepia_mode_active','ng_enable_sepia_mode_active',30);

                    }

                }



                document.getElementById("ng_dropdown_toggle_buttonicon").onclick = function(e){

                    var IconDropdown = document.getElementById("ng_dropdown_toggle_buttonicon").nextElementSibling;

                    if(IconDropdown.style.display == 'block'){

                        IconDropdown.style.display = 'none';

                    }else{

                        IconDropdown.style.display = 'block';

                    }

                }



                document.getElementById("select-nagishx-language").onclick = function(){

                    document.getElementById("nagishx-i18n-languages").classList.add("active");

                }

                document.getElementById("nagishx-close-languages").onclick = function(){

                    document.getElementById("nagishx-i18n-languages").classList.remove("active");

                }

                document.getElementById("nagishx-language-en").onclick = function(){

                    ngsetCookie('active_language_selected','en',30);

                    document.getElementById("nagishx-i18n-languages").classList.remove("active");

                    document.location.reload();

                }



                document.getElementById("nagishx-language-he").onclick = function(){

                    ngsetCookie('active_language_selected','he',30);

                    document.getElementById("nagishx-i18n-languages").classList.remove("active");

                    document.location.reload();

                }



                document.getElementById("nagishx-language-ru").onclick = function(){

                    ngsetCookie('active_language_selected','ru',30);

                    document.getElementById("nagishx-i18n-languages").classList.remove("active");

                    document.location.reload();

                }



                document.getElementById("nagishx-language-ar").onclick = function(){

                    ngsetCookie('active_language_selected','ar',30);

                    document.getElementById("nagishx-i18n-languages").classList.remove("active");

                    document.location.reload();

                }



                const ng_bgcolor_contrast_selection = document.getElementsByClassName("ng_bgcolor_contrast_selection");

                for (var i = 0; i < ng_bgcolor_contrast_selection.length; i++) {

                    ng_bgcolor_contrast_selection[i].addEventListener('click', function(e){

                        var active_bgcolor_contrast_selection = document.getElementsByClassName("nagishx-bgcolor_contrast-property");

                        for (var j = 0; j < active_bgcolor_contrast_selection.length; j++) {

                            if(e.target != active_bgcolor_contrast_selection[j]){

                                active_bgcolor_contrast_selection[j].classList.remove("ng_adjust_contrast_active");

                            }

                        }

                        e.target.classList.toggle("ng_adjust_contrast_active");

                        

                        // .style.removeProperty("display");

                        if (e.target.classList.contains("ng_adjust_contrast_active")) {

                            SetBgColor(e.target.dataset.bgcolor);

                            ngsetCookie('active_bgcolor_contrast_selection',e.target.dataset.bgcolor,30);

                        } else {

                            ngdeleteCookie('active_bgcolor_contrast_selection');

                            SetBgColor('');

                        }

                    }, false);

                }



                const ng_headercolor_contrast_selection = document.getElementsByClassName("ng_headercolor_contrast_selection");

                for (var i = 0; i < ng_headercolor_contrast_selection.length; i++) {

                    ng_headercolor_contrast_selection[i].addEventListener('click', function(e){

                        var active_headercolor_contrast_selection = document.getElementsByClassName("nagishx-headercolor_contrast-property");

                        for (var j = 0; j < active_headercolor_contrast_selection.length; j++) {

                            if(e.target != active_headercolor_contrast_selection[j]){

                                active_headercolor_contrast_selection[j].classList.remove("ng_adjust_contrast_active");

                            }

                        }

                        e.target.classList.toggle("ng_adjust_contrast_active");

                        if (e.target.classList.contains("ng_adjust_contrast_active")) {

                            SetheaderColor(e.target.dataset.color);

                            ngsetCookie('active_headercolor_contrast_selection',e.target.dataset.color,30);

                        } else {

                            SetheaderColor('');

                            ngdeleteCookie('active_headercolor_contrast_selection');

                        }

                    }, false);

                }



                const ng_textcolor_contrast_selection = document.getElementsByClassName("ng_textcolor_contrast_selection");

                for (var i = 0; i < ng_textcolor_contrast_selection.length; i++) {

                    ng_textcolor_contrast_selection[i].addEventListener('click', function(e){

                        var active_textcolor_contrast_selection = document.getElementsByClassName("nagishx-textcolor_contrast-property");

                        for (var j = 0; j < active_textcolor_contrast_selection.length; j++) {

                            if(e.target != active_textcolor_contrast_selection[j]){

                            active_textcolor_contrast_selection[j].classList.remove("ng_adjust_contrast_active");

                            }

                        }

                        e.target.classList.toggle("ng_adjust_contrast_active");

                        if (e.target.classList.contains("ng_adjust_contrast_active")) {

                            SettextColor(e.target.dataset.color);

                            ngsetCookie('active_textcolor_contrast_selection',e.target.dataset.color,30);

                        } else {

                            SettextColor('');

                            ngdeleteCookie('active_textcolor_contrast_selection');

                        }

                    }, false);

                }



                const ng_linkcolor_contrast_selection = document.getElementsByClassName("ng_linkcolor_contrast_selection");

                for (var i = 0; i < ng_linkcolor_contrast_selection.length; i++) {

                    ng_linkcolor_contrast_selection[i].addEventListener('click', function(e){

                        var active_linkcolor_contrast_selection = document.getElementsByClassName("nagishx-linkcolor_contrast-property");

                        for (var j = 0; j < active_linkcolor_contrast_selection.length; j++) {

                            if(e.target != active_linkcolor_contrast_selection[j]){

                            active_linkcolor_contrast_selection[j].classList.remove("ng_adjust_contrast_active");

                            }

                        }

                        e.target.classList.toggle("ng_adjust_contrast_active");

                        if (e.target.classList.contains("ng_adjust_contrast_active")) {

                            SetlinkColor(e.target.dataset.color);

                            ngsetCookie('active_linkcolor_contrast_selection',e.target.dataset.color,30);

                        } else {

                            SetlinkColor('');

                            ngdeleteCookie('active_linkcolor_contrast_selection');

                        }

                    }, false);

                }



            }

            var sidebarView = document.getElementById("ng_sidebar_wahout");

            sidebarView.style.display = 'block';

        }



        

        



        

        function SetBgColor(bgcolor = ''){

            var selected_h1_element = document.getElementsByTagName('h1');

            for (var i = 0; i < selected_h1_element.length; i++) {

                selected_h1_element[i].style.backgroundColor = bgcolor;

            }

            var selected_h2_element = document.getElementsByTagName('h2');

            for (var i = 0; i < selected_h2_element.length; i++) {

                selected_h2_element[i].style.backgroundColor = bgcolor;

            }

            var selected_h3_element = document.getElementsByTagName('h3');

            for (var i = 0; i < selected_h3_element.length; i++) {

                selected_h3_element[i].style.backgroundColor = bgcolor;

            }

            var selected_h4_element = document.getElementsByTagName('h4');

            for (var i = 0; i < selected_h4_element.length; i++) {

                selected_h4_element[i].style.backgroundColor = bgcolor;

            }

            var selected_h5_element = document.getElementsByTagName('h5');

            for (var i = 0; i < selected_h5_element.length; i++) {

                selected_h5_element[i].style.backgroundColor = bgcolor;

            }

            var selected_h6_element = document.getElementsByTagName('h6');

            for (var i = 0; i < selected_h6_element.length; i++) {

                selected_h6_element[i].style.backgroundColor = bgcolor;

            }



            var selected_p_element = document.getElementsByTagName('p');

            for (var i = 0; i < selected_p_element.length; i++) {

                selected_p_element[i].style.backgroundColor = bgcolor;

            }

        }



        function SetheaderColor(headercolor = ''){

            var selected_h1_element = document.getElementsByTagName('h1');

            for (var i = 0; i < selected_h1_element.length; i++) {

                selected_h1_element[i].style.color  = headercolor;

            }

            var selected_h2_element = document.getElementsByTagName('h2');

            for (var i = 0; i < selected_h2_element.length; i++) {

                selected_h2_element[i].style.color  = headercolor;

            }

            var selected_h3_element = document.getElementsByTagName('h3');

            for (var i = 0; i < selected_h3_element.length; i++) {

                selected_h3_element[i].style.color  = headercolor;

            }

            var selected_h4_element = document.getElementsByTagName('h4');

            for (var i = 0; i < selected_h4_element.length; i++) {

                selected_h4_element[i].style.color  = headercolor;

            }

            var selected_h5_element = document.getElementsByTagName('h5');

            for (var i = 0; i < selected_h5_element.length; i++) {

                selected_h5_element[i].style.color  = headercolor;

            }

            var selected_h6_element = document.getElementsByTagName('h6');

            for (var i = 0; i < selected_h6_element.length; i++) {

                selected_h6_element[i].style.color  = headercolor;

            }

        }



        function SettextColor(textcolor = ''){

            var selected_p_element = document.getElementsByTagName('p');

            for (var i = 0; i < selected_p_element.length; i++) {

                selected_p_element[i].style.color  = textcolor;

            }

            var selected_divitem_element = document.getElementsByTagName('div');

            for (var i = 0; i < selected_divitem_element.length; i++) {

                selected_divitem_element[i].style.color  = textcolor;

            }

        }

        function SetlinkColor(textcolor = ''){

            var selected_a_element = document.getElementsByTagName('a');

            for (var i = 0; i < selected_a_element.length; i++) {

                selected_a_element[i].style.color  = textcolor;

            }

        }



        function UpdateFontSize(UpdateType = ''){

            var selected_h1_element = document.getElementsByTagName('h1');

            for (var i = 0; i < selected_h1_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_h1_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_h1_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_h1_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_h2_element = document.getElementsByTagName('h2');

            for (var i = 0; i < selected_h2_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_h2_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_h2_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_h2_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_h3_element = document.getElementsByTagName('h3');

            for (var i = 0; i < selected_h3_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_h3_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_h3_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_h3_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_h4_element = document.getElementsByTagName('h4');

            for (var i = 0; i < selected_h4_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_h4_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_h4_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_h4_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_h5_element = document.getElementsByTagName('h5');

            for (var i = 0; i < selected_h5_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_h5_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_h5_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_h5_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_h6_element = document.getElementsByTagName('h6');

            for (var i = 0; i < selected_h6_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_h6_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_h6_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_h6_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }



            var selected_p_element = document.getElementsByTagName('p');

            for (var i = 0; i < selected_p_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_p_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_p_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_p_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }



            var selected_a_element = document.getElementsByTagName('a');

            for (var i = 0; i < selected_a_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_a_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_a_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_a_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }



            var selected_button_element = document.getElementsByTagName('button');

            for (var i = 0; i < selected_button_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_button_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_button_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_button_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_span_element = document.getElementsByTagName('span');

            for (var i = 0; i < selected_span_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_span_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_span_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_span_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_label_element = document.getElementsByTagName('label');

            for (var i = 0; i < selected_label_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_label_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_label_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_label_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_input_element = document.getElementsByTagName('input');

            for (var i = 0; i < selected_input_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_input_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_input_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_input_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_textarea_element = document.getElementsByTagName('textarea');

            for (var i = 0; i < selected_textarea_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_textarea_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_textarea_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_textarea_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }

            var selected_select_element = document.getElementsByTagName('select');

            for (var i = 0; i < selected_select_element.length; i++) {

                var LastFontSize = window.getComputedStyle(selected_select_element[i]).fontSize;

                var LastFontSize = parseFloat(LastFontSize);

                if(UpdateType == 'increase'){

                    selected_select_element[i].style.fontSize = (LastFontSize + 1) + 'px';

                }else if(UpdateType == 'descrease'){

                    selected_select_element[i].style.fontSize = (LastFontSize - 1) + 'px';

                }

            }



        }

        var wahCurrentMousePos = {

            x: -1,

            y: -1

        };

        function init_adhd_fiendly_profile() {



            // var windowHeight = jQuery(window).height();

            var windowHeight = window.innerHeight;

            const adhdElement = document.getElementsByClassName("ng_enable_adhd_button_active");

            adhdElement[0].insertAdjacentHTML('beforeend', '<div class="wah-adhd-mask wah-adhd-top-element"></div>');

            adhdElement[0].insertAdjacentHTML('beforeend', '<div class="wah-adhd-mask wah-adhd-bottom-element"></div>');

            

            window.addEventListener("mousemove", function(event) {

                // console.log( event.target.tagName + ': ' + event.type);

                wahCurrentMousePos.x = event.screenX;

                wahCurrentMousePos.y = event.screenY;

                var top_mask = windowHeight - wahCurrentMousePos.y;

                var bottom_mask = windowHeight - top_mask - 120;

                // console.log("topmask ="+top_mask);

                // console.log("bottom_mask ="+bottom_mask);

                var adhdTopElement = document.getElementsByClassName("wah-adhd-top-element");

                adhdTopElement[0].style.height = bottom_mask+'px';

                var adhdBottomElement = document.getElementsByClassName("wah-adhd-bottom-element");

                adhdBottomElement[0].style.height = top_mask+'px';

            });

        }

        

        

        

        function remove_adhd_fiendly_profile() {

            var adhdTopElement = document.getElementsByClassName("wah-adhd-top-element");

            var adhdBottomElement = document.getElementsByClassName("wah-adhd-bottom-element");

            // adhdTopElement[0].parentNode.removeChild(adhdTopElement[0]);

            // adhdBottomElement[0].parentNode.removeChild(adhdBottomElement[0]);

            adhdTopElement[0].remove();

            adhdBottomElement[0].remove();

        }

        function getText(e){

            e.stopImmediatePropagation();           

            e.cancelBubble = true;

            var elem  = document.getElementById("tooltip_text");

            

        

            var content = $(this).text();

            if(content){

                elem.innerHTML = content; 

                

            }

            

            

            

            //elem.innerHTML = content; 

            

            window.addEventListener("mousemove", function(e) {

                // console.log( event.target.tagName + ': ' + event.type);

               

                 window.mouseXPos = e.pageX;

                 window.mouseYPos = e.pageY;

                //console.log(window.mouseXPos);

                //console.log(window.mouseYPos);

                

                elem.style.left = e.pageX+20+"px"; 

                elem.style.top = e.pageY+20+"px";

            });

            

        }

        function remove_text_tooltip(){

            var elem  = document.getElementById("tooltip_text");

            elem.remove();

        }

        function init_text_tooltip(){

            

            var elemDiv = document.createElement('div');

            elemDiv.id = 'tooltip_text';

            elemDiv.className = 'tooltip_textclass';

            

            document.body.appendChild(elemDiv);

            

            

            var selected_p_Element = document.getElementsByTagName('p');

            for (var i = 0; i < selected_p_Element.length; i++) {

                selected_p_Element[i].addEventListener('mouseover', getText);

              

            }

            var selected_span_Element = document.getElementsByTagName('span');

            for (var i = 0; i < selected_span_Element.length; i++) {

                selected_span_Element[i].addEventListener('mouseover', getText);

               

            }

            var selected_a_Element = document.getElementsByTagName('a');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('label');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('input');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('textarea');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('select');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('button');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('h1');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('h2');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            

            var selected_a_Element = document.getElementsByTagName('h3');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('h4');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('h5');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            var selected_a_Element = document.getElementsByTagName('h6');

            for (var i = 0; i < selected_a_Element.length; i++) {

                selected_a_Element[i].addEventListener('mouseover', getText);

                

            }

            

        }

        

        let textToSpeechEnabled = false; // Toggle to enable/disable the feature

        function remove_textspeech_tooltip(){

            

            textToSpeechEnabled = false;

        }

        function init_textspeech_tooltip(){

                            

                window.speechSynthesis.onvoiceschanged = populateVoices;

                let voices = [];

                let currentUtterance = null;

                



                function populateVoices() {

                  voices = window.speechSynthesis.getVoices();

                  voices.forEach(voice => {

                    //console.log(voice.name + " (" + voice.lang + ")");

                  });

                }







                async function textToSpeech(text) {

                    

                    if (!textToSpeechEnabled) return; // Only proceed if the feature is enabled

                    

                  const apiKey = 'sk-proj-vRiOBNQUPBL02LjRqmLPT3BlbkFJVP7sAx2aWyIFgin3XB5R'; // Replace with your OpenAI API key



                  try {

                    const response = await fetch('https://api.openai.com/v1/chat/completions', {

                      method: 'POST',

                      headers: {

                        'Content-Type': 'application/json',

                        'Authorization': `Bearer ${apiKey}`

                      },

                      body: JSON.stringify({

                        model: 'gpt-3.5-turbo',

                        messages: [{ role: 'user', content: text }],

                        max_tokens: 60,

                        temperature: 0.7

                      })

                    });



                    if (!response.ok) {

                      const errorResponse = await response.json();

                      throw new Error(errorResponse.error.message);

                    }



                    const data = await response.json();

                    const generatedText = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content.trim();



                    // Use the exact selected text for speech synthesis

                    const speechText = text;

                    // console.log('Generated Speech Text:', speechText);



                    if (currentUtterance) {

                      window.speechSynthesis.cancel();

                    }



                    currentUtterance = new SpeechSynthesisUtterance(speechText);



                    // Set the specific language and voice based on the text

                    if (/[\u0590-\u05FF]/.test(speechText)) {

                      currentUtterance.lang = 'he-IL'; // Hebrew

                    } else if (/[\u0600-\u06FF]/.test(speechText)) {

                      currentUtterance.lang = 'ar-SA'; // Arabic

                      const arabicVoice = voices.find(voice => voice.lang === 'ar-SA');

                      if (arabicVoice) {

                        currentUtterance.voice = arabicVoice;

                      } else {

                        // console.log("Arabic voice not found. Please install an Arabic voice.");

                      }

                    } else if (/[\u0400-\u04FF]/.test(speechText)) {

                      currentUtterance.lang = 'ru-RU'; // Russian

                    } else {

                      currentUtterance.lang = 'en-US'; // Default to English

                    }



                    window.speechSynthesis.speak(currentUtterance);

                  } catch (error) {

                    // console.error('Error generating speech:', error);

                  }

                }

            

            document.querySelectorAll('p, a, h1, h2, h3, h4, button, select, input,span').forEach(element => {

              element.addEventListener('mouseover', (event) => {

                // Start the hover timeout, after 1 second it will trigger the speech

                hoverTimeout = setTimeout(() => {

                  const elementText = element.textContent;

                  textToSpeech(elementText);

                }, 100); // 1-second delay before triggering speech

              });



              element.addEventListener('mouseout', (event) => {

                // Clear the hover timeout if the user moves the mouse away before 1 second

                clearTimeout(hoverTimeout);

              });

            });

            

            

            

        }

        function ngsetCookie(cngname, ngcvalue, ngexdays) {

            const d = new Date();

            d.setTime(d.getTime() + (ngexdays * 24 * 60 * 60 * 1000));

            let ngexpires = "expires="+d.toUTCString();

            document.cookie = cngname + "=" + ngcvalue + ";" + ngexpires + ";path=/";

          }

          

          function nggetCookie(cngname) {

            let name = cngname + "=";

            let ca = document.cookie.split(';');

            for(let i = 0; i < ca.length; i++) {

              let c = ca[i];

              while (c.charAt(0) == ' ') {

                c = c.substring(1);

              }

              if (c.indexOf(name) == 0) {

                return c.substring(name.length, c.length);

              }

            }

            return "";

          }



          function ngdeleteCookie(cngname) {

            document.cookie = cngname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

          }





        

        

        



        // Javascript cookies Check and update content 

        

        if(nggetCookie('ng_enable_cd_profile_active') == 'ng_enable_cd_profile_active') {

            selected_div_element[0].classList.add('ng_enable_cd_profile_active');

        }

        

        if(nggetCookie('ng_large_button_active') == 'ng_large_button_active') {

            selected_div_element[0].classList.add('ng_large_button_active');

            init_text_tooltip();

        }

        if(nggetCookie('ng_enable_speech_button_active') == 'ng_enable_speech_button_active') {

            selected_div_element[0].classList.add('ng_enable_speech_button_active');

            textToSpeechEnabled = true;

            init_textspeech_tooltip();

        }

        if(nggetCookie('ng_enable_highlight_links_active') == 'ng_enable_highlight_links_active') {

            selected_div_element[0].classList.add('ng_enable_highlight_links_active');

        }



        if(nggetCookie('ng_enable_word_spacing_active') == 'ng_enable_word_spacing_active') {

            selected_div_element[0].classList.add('ng_enable_word_spacing_active');

        }



        if(nggetCookie('ng_enable_underline_links_active') == 'ng_enable_underline_links_active') {

            selected_div_element[0].classList.add('ng_enable_underline_links_active');

        }



        if(nggetCookie('ng_enable_adhd_button_active') == 'ng_enable_adhd_button_active') {

            selected_div_element[0].classList.add('ng_enable_adhd_button_active');

            init_adhd_fiendly_profile();

        }



        if(nggetCookie('ng_enable_keyboard_navigation_active') == 'ng_enable_keyboard_navigation_active') {

            selected_div_element[0].classList.add('ng_enable_keyboard_navigation_active');

        }



        if(nggetCookie('ng_enable_remove_animations_active') == 'ng_enable_remove_animations_active') {

            selected_div_element[0].classList.add('ng_enable_remove_animations_active');

        }



        if(nggetCookie('ng_enable_image_description_active') == 'ng_enable_image_description_active') {

            selected_div_element[0].classList.add('ng_enable_image_description_active');
            
            if (document.body.classList.contains('ng_enable_image_description_active')) {
                wah_render_image_alt_description();
            }

        }



        if(nggetCookie('ng_enable_letter_spacing_active') == 'ng_enable_letter_spacing_active') {

            selected_div_element[0].classList.add('ng_enable_letter_spacing_active');

        }



        if(nggetCookie('ng_enable_line_height_active') == 'ng_enable_line_height_active') {

            selected_div_element[0].classList.add('ng_enable_line_height_active');

        }



        if(nggetCookie('ng_enable_large_cursor_active') == 'ng_enable_large_cursor_active') {

            selected_div_element[0].classList.add('ng_enable_large_cursor_active');

        }



        if(nggetCookie('ng_enable_hide_images_active') == 'ng_enable_hide_images_active') {

            selected_div_element[0].classList.add('ng_enable_hide_images_active');

        }



        if(nggetCookie('ng_enable_table_content_active') == 'ng_enable_table_content_active') {

            selected_div_element[0].classList.add('ng_enable_table_content_active');

        }



        if(nggetCookie('ng_enable_mute_volume_active') == 'ng_enable_mute_volume_active') {

            selected_div_element[0].classList.add('ng_enable_mute_volume_active');

        }



        if(nggetCookie('ng_enable_readable_font_active') == 'ng_enable_readable_font_active') {

            selected_div_element[0].classList.add('ng_enable_readable_font_active');

        }



        if(nggetCookie('ng_enable_left_fonts_active') == 'ng_enable_left_fonts_active') {

            selected_div_element[0].classList.add('ng_enable_left_fonts_active');

        }



        if(nggetCookie('ng_enable_center_fonts_active') == 'ng_enable_center_fonts_active') {

            selected_div_element[0].classList.add('ng_enable_center_fonts_active');

        }



        if(nggetCookie('ng_enable_right_fonts_active') == 'ng_enable_right_fonts_active') {

            selected_div_element[0].classList.add('ng_enable_right_fonts_active');

        }



        if(nggetCookie('ng_enable_greyscale_image_active') == 'ng_enable_greyscale_image_active') {

            selected_div_element[0].classList.add('ng_enable_greyscale_image_active');

        }



        if(nggetCookie('ng_enable_invert_mode_active') == 'ng_enable_invert_mode_active') {

            selected_div_element[0].classList.add('ng_enable_invert_mode_active');

        }



        if(nggetCookie('ng_enable_monochrome_mode_active') == 'ng_enable_monochrome_mode_active') {

            selected_div_element[0].classList.add('ng_enable_monochrome_mode_active');

        }



        if(nggetCookie('ng_enable_sepia_mode_active') == 'ng_enable_sepia_mode_active') {

            selected_div_element[0].classList.add('ng_enable_sepia_mode_active');

        }



        if(nggetCookie('active_bgcolor_contrast_selection') != '') {

            var active_bgcolor_contrast_selection = document.getElementsByClassName("nagishx-bgcolor_contrast-property");

            for (var j = 0; j < active_bgcolor_contrast_selection.length; j++) {

                if(active_bgcolor_contrast_selection[j].dataset.bgcolor == nggetCookie('active_bgcolor_contrast_selection')){

                    SetBgColor(active_bgcolor_contrast_selection[j].dataset.bgcolor);

                    active_bgcolor_contrast_selection[j].classList.add("ng_adjust_contrast_active");

                }

            }

        }



        if(nggetCookie('active_headercolor_contrast_selection') != '') {

            var active_headercolor_contrast_selection = document.getElementsByClassName("nagishx-headercolor_contrast-property");

            for (var j = 0; j < active_headercolor_contrast_selection.length; j++) {

                if(active_headercolor_contrast_selection[j].dataset.color == nggetCookie('active_headercolor_contrast_selection')){

                    SetheaderColor(active_headercolor_contrast_selection[j].dataset.color);

                    active_headercolor_contrast_selection[j].classList.add("ng_adjust_contrast_active");

                }

            }

        }



        if(nggetCookie('active_textcolor_contrast_selection') != '') {

            var active_textcolor_contrast_selection = document.getElementsByClassName("nagishx-textcolor_contrast-property");

            for (var j = 0; j < active_textcolor_contrast_selection.length; j++) {

                if(active_textcolor_contrast_selection[j].dataset.color == nggetCookie('active_textcolor_contrast_selection')){

                    SettextColor(active_textcolor_contrast_selection[j].dataset.color);

                    active_textcolor_contrast_selection[j].classList.add("ng_adjust_contrast_active");

                }

            }

        }
        
        // Call image alts if came from cookies


        function wah_remove_image_alt_tooltip() {
          // Remove any tooltip elements
          document.querySelectorAll('.wah-tooltip').forEach(t => t.remove());

          const wahImages = document.querySelectorAll('.wahImageTooltip');
          
          wahImages.forEach((img) => {
            img.classList.remove('wahImageTooltip');
            const cleanClone = img.cloneNode(true);
            img.parentNode.replaceChild(cleanClone, img);
          });
        }
        
        
        function wah_render_image_alt_description() {
              if (document.body.classList.contains("ng_enable_image_description_active")) {
                const images = document.querySelectorAll(
                  ".ng_enable_image_description_active img"
                );
            
                images.forEach((img) => {
                  if (img.getAttribute("alt")) {
                    img.classList.add("wahImageTooltip");
                  }
                });
              }
            
              const wahImages = document.querySelectorAll(".wahImageTooltip");
            
              wahImages.forEach((img) => {
                // Store the original alt in a variable
                let originalAlt = img.getAttribute("alt");
            
                img.addEventListener("mouseenter", (e) => {
                  // Remove alt attribute to prevent default tooltip
                //   img.setAttribute("data-tipText", originalAlt);
                //   img.removeAttribute("alt");
            
                  // Create tooltip element
                  const tooltip = document.createElement("p");
                  tooltip.className = "wah-tooltip";
                  tooltip.textContent = originalAlt;
            
                  document.body.appendChild(tooltip);
                  tooltip.style.position = "absolute";
                  tooltip.style.top = e.pageY + 10 + "px";
                  tooltip.style.left = e.pageX + 20 + "px";
                  tooltip.style.display = "none";
            
                  // Fade in (simplified without jQuery)
                  requestAnimationFrame(() => {
                    tooltip.style.display = "block";
                    tooltip.style.opacity = "1";
                  });
                });
            
                img.addEventListener("mouseleave", () => {
                  // Restore alt attribute
                //   img.setAttribute("alt", img.getAttribute("data-tipText"));
                //   img.removeAttribute("data-tipText");
            
                  // Remove tooltip
                  const tooltip = document.querySelector(".wah-tooltip");
                  if (tooltip) {
                    tooltip.remove();
                  }
                });
            
                img.addEventListener("mousemove", (e) => {
                  const tooltip = document.querySelector(".wah-tooltip");
                  if (tooltip) {
                    tooltip.style.top = e.pageY + 10 + "px";
                    tooltip.style.left = e.pageX + 20 + "px";
                  }
                });
              });
            }



        if(nggetCookie('active_linkcolor_contrast_selection') != '') {

            var active_linkcolor_contrast_selection = document.getElementsByClassName("nagishx-linkcolor_contrast-property");

            for (var j = 0; j < active_linkcolor_contrast_selection.length; j++) {

                if(active_linkcolor_contrast_selection[j].dataset.color == nggetCookie('active_linkcolor_contrast_selection')){

                    SetlinkColor(active_linkcolor_contrast_selection[j].dataset.color);

                    active_linkcolor_contrast_selection[j].classList.add("ng_adjust_contrast_active");

                }

            }

        }

        

        document.head.insertAdjacentHTML(

            'beforeend',

            '<link href="'+SITE_URL+'/assets/css/flaticon_nagishexpress.css" rel="stylesheet" />');

            

            

//

    }

}



GetAccessibilityData();

// fetch the data from functions

function GetAccessibilityData(){

    if(LICENCE != ''){

        const apiUrl = SITE_URL+'/api/auth/'+LICENCE;

    

        fetch(apiUrl)

            .then(response => {

            if (!response.ok) {

                throw new Error('Server Response is not good.');

            }

            return response.json();

            })

            .then(res => {

                if(res.status != 'error'){

                    var isActive = true;

                    var IsMultiSite = false;

                    if(res.data.active != 'on'){

                        isActive = false;

                    }

                    if(res.data.multisite != 'on'){

                        // console.log(window.location.hostname);

                        var domainName = res.data.name;

                        var myDomain = window.location.hostname;

                        domainName = domainName.toLowerCase();

                        if(myDomain.includes(domainName)){

                            IsMultiSite = true;

                        }

                    }else{

                        IsMultiSite = true;

                    }

                    createnagishWidget(res.data.widgetsetting.data, isActive,IsMultiSite);

                }else{

                    // alert(res.message);

                }

                

            })

            .catch(error => {

                console.log('Error:', error);

            });

    }else{

        console.log('Error:', 'Licence is required.');

    }

}





















