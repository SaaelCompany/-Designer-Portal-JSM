(function () {
    "use strict";

    var I18N = {
        ru: {
            title: "Конструктор портала",
            subtitle: "Jira Service Management",
            all: "Все порталы",
            portalPh: "ID",
            home: "Главная",
            pagePortals: "Порталы",
            pageProject: "Проект",
            pageRequests: "Запросы",
            login: "Вход",
            create: "Заявка",
            desktop: "Компьютер",
            tablet: "Планшет",
            mobile: "Телефон",
            undo: "Назад",
            redo: "Вперёд",
            lang: "EN",
            import: "Импорт",
            export: "Экспорт",
            published: "Новый дизайн",
            save: "Сохранить",
            saving: "Сохраняем…",
            saved: "Сохранено",
            dirty: "Есть правки",
            theme: "Тема",
            header: "Шапка",
            hero: "Обложка",
            search: "Поиск",
            requests: "Карточки",
            announcement: "Объявление",
            footer: "Подвал",
            canvas: "Холст",
            canvasHint: "Потяните сам блок или синюю плашку над ним. Угол меняет размер. У компьютера, планшета и телефона положение своё. Скрытый блок на портале не показывается.",
            addBlock: "Блок",
            addText: "Текст",
            addImage: "Картинка",
            addButton: "Кнопка",
            addHtml: "Свой HTML",
            resetFlow: "Вернуть в поток",
            freePos: "Свободное положение",
            hideBlock: "Скрыть на портале",
            widgetText: "Текст",
            widgetHref: "Ссылка",
            widgetImage: "Картинка",
            widgetHtml: "HTML",
            deleteWidget: "Удалить блок",
            dragHandle: "Переместить",
            resizeHandle: "Размер",
            blocks: "Блоки портала",
            object: "Объект",
            objectHint: "Кликните по любому объекту живого портала. Ниже меняются его размер, скругление, шрифт, цвет и положение.",
            objectEmpty: "Объект ещё не выбран.",
            selector: "Какие объекты",
            fontSize: "Размер шрифта",
            fontWeight: "Насыщенность",
            padding: "Внутренние поля",
            blockW: "Ширина",
            blockH: "Высота",
            objectColor: "Цвет текста",
            fillColor: "Заливка",
            addTip: "Подсказка",
            tipText: "Текст подсказки",
            tipTarget: "К какому объекту",
            chromeAll: "Та же шапка и подвал на запросах и в профиле",
            portalMenu: "Меню портала",
            projectMenu: "Меню проекта",
            requestForm: "Форма заявки",
            menuRow: "В строку",
            menuColumn: "Столбцом",
            menuDirection: "Как расположено",
            radiusOff: "0 отключает скругление.",
            menuHint: "Это меню рисуется вместо штатного. Пункты можно переименовать, переставить и удалить. Само меню перетаскивается по странице.",
            formHint: "Кликните поле, подпись или кнопку и перетащите их. Ниже общий вид формы: цвет, шрифт и скругление. 0 у скругления делает углы прямыми.",
            formLabel: "Цвет подписи",
            browse: "Переход",
            browseOn: "Режим перехода: ссылки открывают страницы портала. Нажмите «Переход» ещё раз, чтобы выбирать объекты.",
            removeTheme: "Удалить оформление",
            removedTheme: "Оформление удалено. Портал снова стандартный.",
            liveHint: "В макете ваш портал. «Переход» открывает проекты и запросы. Без него клик выбирает объект: размер, скругление, шрифт, цвет и положение.",
            screens: "Экраны",
            css: "Свой CSS",
            presets: "Готовые стили",
            colors: "Цвета",
            type: "Типографика",
            layout: "Сетка",
            unpublished: "Новый дизайн выключен. Посетители видят обычный портал.",
            designOn: "Новый дизайн включён. Обновите страницу портала.",
            designOff: "Новый дизайн выключен. Посетители видят обычный портал. Обновите его страницу.",
            inherited: "Этот портал показывает общий стиль. Включите свой стиль, чтобы править только его.",
            ownStyle: "Свой стиль этого портала",
            editGlobal: "Править общий стиль",
            deviceHint: "Поля размера сейчас относятся к выбранному экрану.",
            addLink: "Добавить ссылку",
            addColumn: "Добавить колонку",
            newLink: "Новая ссылка",
            newColumn: "Колонка",
            remove: "Удалить",
            reset: "Наследовать общий",
            warnings: "При сохранении часть значений будет поправлена.",
            contrast: "Низкий контраст текста и фона — на портале это будет трудно прочитать.",
            customHtml: "Свой HTML вместо собранного блока. Скрипты вырезаются.",
            customCss: "Дописывается в конец темы. Можно перекрыть любой блок портала.",
            placeholder: "Подсказка в поиске",
            name: "Название стиля",
            font: "Шрифт",
            base: "Размер текста",
            weight: "Насыщенность заголовков",
            line: "Интерлиньяж",
            width: "Ширина содержимого",
            radius: "Скругление блоков",
            cardRadius: "Скругление карточек",
            cardSize: "Размер карточек",
            sizeS: "Меньше",
            sizeM: "Обычный",
            sizeL: "Больше",
            cardOrder: "Порядок карточек",
            cardOrderHint: "Перетащите карточку в макете или подвиньте её кнопками. Так меняется порядок услуг на портале.",
            moveUp: "Выше",
            moveDown: "Ниже",
            customFont: "Свой шрифт",
            customFontHint: "Имя шрифта, который уже установлен у посетителя. Например: Manrope, Segoe UI",
            upload: "Загрузить",
            fileBig: "Изображение больше 270 КБ. Сожмите его или вставьте адрес.",
            shadow: "Тень",
            pad: "Поля страницы",
            pageImage: "Фон страницы, URL",
            mode: "Режим",
            logo: "Адрес логотипа",
            logoAlt: "Текст вместо логотипа",
            logoH: "Высота логотипа",
            showTitle: "Показывать название",
            titleField: "Название",
            sticky: "Прилипает при прокрутке",
            showLogin: "Кнопка входа",
            loginLabel: "Текст кнопки входа",
            headerH: "Высота шапки",
            links: "Ссылки",
            visible: "Показывать",
            pages: "На каких страницах",
            heroTitle: "Заголовок",
            heroSub: "Подзаголовок",
            align: "Выравнивание",
            heroH: "Высота обложки",
            heroImage: "Фон обложки, URL",
            overlay: "Затемнение фото",
            columns: "Колонки",
            gap: "Интервал",
            cardStyle: "Вид карточек",
            descriptions: "Описания на карточках",
            layoutMode: "Раскладка",
            tone: "Тон",
            text: "Текст",
            copyright: "Подпись внизу",
            columnsTitle: "Колонки подвала",
            mobileMax: "Телефон до, px",
            tabletMax: "Планшет до, px",
            showHeroMobile: "Обложка на телефоне",
            showTitleMobile: "Название в шапке на телефоне",
            showHeroTablet: "Обложка на планшете",
            showTitleTablet: "Название в шапке на планшете",
            replace: "Собрать заново",
            themeMode: "Перекрасить штатную",
            hidden: "Скрыть",
            homeOnly: "Только главная",
            allPages: "Все страницы",
            start: "Слева",
            center: "По центру",
            grid: "Плитка",
            list: "Список",
            elevated: "С тенью",
            outline: "Контур",
            flat: "Плоские",
            none: "Нет",
            soft: "Мягкая",
            strong: "Сильная",
            system: "Системный",
            serif: "Антиква",
            mono: "Моно",
            humanist: "Гуманистический",
            condensed: "Узкий",
            info: "Информация",
            success: "Успех",
            warning: "Внимание",
            critical: "Важно",
            primary: "Основной",
            primaryText: "Текст на основном",
            background: "Фон страницы",
            surface: "Поверхность",
            textColor: "Текст",
            muted: "Второстепенный",
            headerBg: "Фон шапки",
            headerText: "Текст шапки",
            heroBg: "Фон обложки",
            heroText: "Текст обложки",
            footerBg: "Фон подвала",
            footerText: "Текст подвала",
            link: "Ссылки",
            border: "Границы",
            accent: "Акцент",
            card: "Карточки",
            loadError: "Не удалось загрузить стиль",
            saveError: "Не удалось сохранить",
            imported: "Файл подставлен в черновик",
            badFile: "Файл не похож на тему портала"
        },
        en: {
            title: "Portal Designer",
            subtitle: "Jira Service Management",
            all: "All portals",
            portalPh: "ID",
            home: "Home",
            pagePortals: "Portals",
            pageProject: "Project",
            pageRequests: "Requests",
            login: "Login",
            create: "Request",
            desktop: "Desktop",
            tablet: "Tablet",
            mobile: "Phone",
            undo: "Undo",
            redo: "Redo",
            lang: "RU",
            import: "Import",
            export: "Export",
            published: "New design",
            save: "Save",
            saving: "Saving…",
            saved: "Saved",
            dirty: "Unsaved changes",
            theme: "Theme",
            header: "Header",
            hero: "Hero",
            search: "Search",
            requests: "Cards",
            announcement: "Announcement",
            footer: "Footer",
            canvas: "Canvas",
            canvasHint: "Drag a block itself, or the blue bar above it. The corner changes its size. Desktop, tablet and phone each keep their own layout. A hidden block is not shown on the portal.",
            addBlock: "Block",
            addText: "Text",
            addImage: "Image",
            addButton: "Button",
            addHtml: "Custom HTML",
            resetFlow: "Back to flow",
            freePos: "Free position",
            hideBlock: "Hide on the portal",
            widgetText: "Text",
            widgetHref: "Link",
            widgetImage: "Image",
            widgetHtml: "HTML",
            deleteWidget: "Delete block",
            dragHandle: "Move",
            resizeHandle: "Resize",
            blocks: "Portal blocks",
            object: "Object",
            objectHint: "Click any object in the live portal. Size, corners, font, color and position are edited below.",
            objectEmpty: "No object selected yet.",
            selector: "Which objects",
            fontSize: "Font size",
            fontWeight: "Weight",
            padding: "Padding",
            blockW: "Width",
            blockH: "Height",
            objectColor: "Text color",
            fillColor: "Fill",
            addTip: "Tooltip",
            tipText: "Tooltip text",
            tipTarget: "Attached to",
            chromeAll: "The same header and footer on requests and the profile",
            portalMenu: "Portal menu",
            projectMenu: "Project menu",
            requestForm: "Request form",
            menuRow: "Row",
            menuColumn: "Column",
            menuDirection: "Direction",
            radiusOff: "0 turns rounding off.",
            menuHint: "This menu replaces the standard one. Rename, reorder and remove items. Drag the menu itself around the page.",
            formHint: "Click a field, label or button and drag it. The settings below cover the whole form: color, font and corners. 0 makes the corners square.",
            formLabel: "Label color",
            browse: "Browse",
            browseOn: "Browse mode: links open portal pages. Press Browse again to select objects.",
            removeTheme: "Delete styling",
            removedTheme: "Styling deleted. The portal is standard again.",
            liveHint: "The preview is your portal. Browse opens projects and requests. Without it, a click selects an object: size, corners, font, color and position.",
            screens: "Screens",
            css: "Custom CSS",
            presets: "Presets",
            colors: "Colors",
            type: "Type",
            layout: "Layout",
            unpublished: "The new design is off. Visitors see the standard portal.",
            designOn: "The new design is on. Refresh the portal.",
            designOff: "The new design is off. Visitors see the standard portal. Refresh it.",
            inherited: "This portal uses the shared theme. Turn on its own theme to edit it separately.",
            ownStyle: "Own theme for this portal",
            editGlobal: "Edit the shared theme",
            deviceHint: "Size fields follow the screen selected above.",
            addLink: "Add link",
            addColumn: "Add column",
            newLink: "New link",
            newColumn: "Column",
            remove: "Remove",
            reset: "Use shared theme",
            warnings: "Some values will be corrected when you save.",
            contrast: "Text and background are too close. This will be hard to read.",
            customHtml: "Replaces the composed block. Scripts are removed.",
            customCss: "Appended after the theme. It can restyle any portal block.",
            placeholder: "Search placeholder",
            name: "Theme name",
            font: "Font",
            base: "Text size",
            weight: "Heading weight",
            line: "Line height",
            width: "Content width",
            radius: "Corner radius",
            cardRadius: "Card corners",
            cardSize: "Card size",
            sizeS: "Smaller",
            sizeM: "Regular",
            sizeL: "Larger",
            cardOrder: "Card order",
            cardOrderHint: "Drag a card in the preview, or move it with the buttons. This is the order visitors see.",
            moveUp: "Up",
            moveDown: "Down",
            customFont: "Custom font",
            customFontHint: "A font already installed for the visitor. For example: Manrope, Segoe UI",
            upload: "Upload",
            fileBig: "Image is over 270 KB. Compress it or paste a URL.",
            shadow: "Shadow",
            pad: "Page padding",
            pageImage: "Page background URL",
            mode: "Mode",
            logo: "Logo URL",
            logoAlt: "Logo alternative text",
            logoH: "Logo height",
            showTitle: "Show title",
            titleField: "Title",
            sticky: "Stick while scrolling",
            showLogin: "Login button",
            loginLabel: "Login label",
            headerH: "Header height",
            links: "Links",
            visible: "Visible",
            pages: "Shown on",
            heroTitle: "Heading",
            heroSub: "Subheading",
            align: "Alignment",
            heroH: "Hero height",
            heroImage: "Hero image URL",
            overlay: "Photo dimming",
            columns: "Columns",
            gap: "Gap",
            cardStyle: "Card style",
            descriptions: "Card descriptions",
            layoutMode: "Layout",
            tone: "Tone",
            text: "Text",
            copyright: "Copyright line",
            columnsTitle: "Footer columns",
            mobileMax: "Phone up to, px",
            tabletMax: "Tablet up to, px",
            showHeroMobile: "Hero on a phone",
            showTitleMobile: "Header title on a phone",
            showHeroTablet: "Hero on a tablet",
            showTitleTablet: "Header title on a tablet",
            replace: "Rebuild",
            themeMode: "Recolor the native one",
            hidden: "Hide",
            homeOnly: "Home only",
            allPages: "Every page",
            start: "Start",
            center: "Center",
            grid: "Grid",
            list: "List",
            elevated: "Elevated",
            outline: "Outline",
            flat: "Flat",
            none: "None",
            soft: "Soft",
            strong: "Strong",
            system: "System",
            serif: "Serif",
            mono: "Mono",
            humanist: "Humanist",
            condensed: "Condensed",
            info: "Info",
            success: "Success",
            warning: "Warning",
            critical: "Critical",
            primary: "Primary",
            primaryText: "Text on primary",
            background: "Page background",
            surface: "Surface",
            textColor: "Text",
            muted: "Muted",
            headerBg: "Header background",
            headerText: "Header text",
            heroBg: "Hero background",
            heroText: "Hero text",
            footerBg: "Footer background",
            footerText: "Footer text",
            link: "Links",
            border: "Borders",
            accent: "Accent",
            card: "Cards",
            loadError: "Could not load the theme",
            saveError: "Could not save",
            imported: "File loaded into the draft",
            badFile: "That file is not a portal theme"
        }
    };

    var RESPONSIVE = {
        "requests.columns": {tablet: "responsive.tablet.columns", mobile: "responsive.mobile.columns"},
        "hero.height": {tablet: "responsive.tablet.heroHeight", mobile: "responsive.mobile.heroHeight"},
        "layout.pagePadding": {tablet: "responsive.tablet.pagePadding", mobile: "responsive.mobile.pagePadding"},
        "typography.baseSize": {tablet: "responsive.tablet.baseSize", mobile: "responsive.mobile.baseSize"},
        "header.height": {tablet: "responsive.tablet.headerHeight", mobile: "responsive.mobile.headerHeight"}
    };

    var SAMPLE = [
        {id: "1", name: "Доступ к системе", description: "Учётная запись, права, VPN"},
        {id: "2", name: "Не работает сервис", description: "Сбой в рабочей системе"},
        {id: "3", name: "Новый сотрудник", description: "Техника и доступы"},
        {id: "4", name: "Закупка", description: "Лицензии и оборудование"},
        {id: "5", name: "Консультация", description: "Вопрос без поломки"},
        {id: "6", name: "Пропуск в офис", description: "Гость или постоянный доступ"}
    ];

    var state = {
        lang: localStorage.getItem("pd-lang") || "ru",
        portalId: "global",
        portals: [],
        requestTypes: [],
        theme: null,
        globalTheme: null,
        presets: [],
        device: "desktop",
        page: "project",
        section: "hero",
        widgetId: "",
        dirty: false,
        past: [],
        future: [],
        remembered: false,
        css: "",
        warnings: [],
        previewTheme: null,
        req: 0,
        compileTimer: 0,
        compileDirty: false,
        frameReady: false,
        liveFrame: false,
        mockFallback: false,
        browse: false,
        picked: null
    };

    function t(key) {
        var pack = I18N[state.lang] || I18N.ru;
        return pack[key] || I18N.ru[key] || key;
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function getPath(obj, path) {
        var cur = obj;
        var parts = path.split(".");
        for (var i = 0; i < parts.length; i++) {
            if (cur == null) {
                return undefined;
            }
            cur = cur[parts[i]];
        }
        return cur;
    }

    function setPath(obj, path, value) {
        var parts = path.split(".");
        var cur = obj;
        for (var i = 0; i < parts.length - 1; i++) {
            if (cur[parts[i]] == null || typeof cur[parts[i]] !== "object") {
                cur[parts[i]] = {};
            }
            cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = value;
    }

    function pathFor(path) {
        var alt = RESPONSIVE[path];
        if (!alt || state.device === "desktop") {
            return path;
        }
        return alt[state.device] || path;
    }

    function api(method, path, body, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, (window.PD_CONTEXT || "") + path, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("X-Atlassian-Token", "no-check");
        if (body != null) {
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            var data = null;
            try {
                data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            } catch (e) {
                data = null;
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                cb(null, data);
            } else {
                cb((data && data.error) || ("HTTP " + xhr.status), data);
            }
        };
        xhr.send(body != null ? JSON.stringify(body) : null);
    }

    function h(tag, attrs, children) {
        var node = document.createElement(tag);
        attrs = attrs || {};
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (value == null) {
                return;
            }
            if (key === "class") {
                node.className = value;
            } else if (key === "text") {
                node.textContent = value;
            } else if (key === "value") {
                node.value = value;
            } else if (key === "checked") {
                node.checked = !!value;
            } else if (key.indexOf("on") === 0 && typeof value === "function") {
                node.addEventListener(key.slice(2), value);
            } else {
                node.setAttribute(key, value);
            }
        });
        (children || []).forEach(function (child) {
            if (child == null) {
                return;
            }
            node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
        });
        return node;
    }

    function toast(message) {
        var node = document.getElementById("toast");
        node.textContent = message;
        node.className = "toast show";
        clearTimeout(toast.timer);
        toast.timer = setTimeout(function () {
            node.className = "toast";
        }, 2400);
    }

    function remember() {
        if (state.remembered || !state.theme) {
            return;
        }
        state.past.push(clone(state.theme));
        if (state.past.length > 40) {
            state.past.shift();
        }
        state.future = [];
        state.remembered = true;
        setTimeout(function () {
            state.remembered = false;
        }, 450);
    }

    function markDirty() {
        state.dirty = true;
        var save = document.getElementById("save");
        if (save) {
            save.textContent = t("save");
            save.className = "save dirty";
        }
        paintBanner();
    }

    function themeForPreview() {
        return state.theme;
    }

    function ensureShape(theme) {
        theme.colors = theme.colors || {};
        theme.typography = theme.typography || {};
        theme.layout = theme.layout || {};
        theme.header = theme.header || {};
        theme.header.links = theme.header.links || [];
        theme.hero = theme.hero || {};
        theme.search = theme.search || {};
        theme.requests = theme.requests || {};
        theme.announcement = theme.announcement || {};
        theme.footer = theme.footer || {};
        theme.footer.columns = theme.footer.columns || [];
        theme.responsive = theme.responsive || {};
        theme.responsive.mobile = theme.responsive.mobile || {};
        theme.responsive.tablet = theme.responsive.tablet || {};
        theme.canvas = theme.canvas || {};
        theme.canvas.desktop = theme.canvas.desktop || {};
        theme.canvas.tablet = theme.canvas.tablet || {};
        theme.canvas.mobile = theme.canvas.mobile || {};
        theme.canvas.widgets = theme.canvas.widgets || [];
        theme.elements = theme.elements || [];
        theme.header = theme.header || {};
        theme.portalMenu = theme.portalMenu || {mode: "replace", direction: "row", color: "", background: "", fontFamily: "", fontSize: 14, radius: 0, gap: 8, items: [], desktop: {}, tablet: {}, mobile: {}};
        theme.projectMenu = theme.projectMenu || {mode: "replace", direction: "row", color: "", background: "", fontFamily: "", fontSize: 14, radius: 0, gap: 8, items: [], desktop: {}, tablet: {}, mobile: {}};
        theme.portalMenu.items = theme.portalMenu.items || [];
        theme.projectMenu.items = theme.projectMenu.items || [];
        theme.form = theme.form || {radius: -1, gap: 16, fontSize: 0, color: "", background: "", labelColor: "", fontFamily: ""};
        return theme;
    }

    function scheduleCompile() {
        state.compileDirty = true;
        if (state.compileTimer) {
            return;
        }
        state.compileTimer = setTimeout(flushCompile, 70);
    }

    function flushCompile() {
        state.compileTimer = 0;
        if (!state.compileDirty || !state.theme) {
            return;
        }
        state.compileDirty = false;
        var mine = ++state.req;
        var body = themeForPreview();
        api("POST", "/rest/portal-designer/1.0/admin/compile", body, function (err, data) {
            if (mine !== state.req && state.compileDirty) {
                return;
            }
            if (err || !data) {
                toast(t("loadError"));
                if (state.compileDirty) {
                    scheduleCompile();
                }
                return;
            }
            state.css = data.css || "";
            state.warnings = data.warnings || [];
            state.previewTheme = data.theme || body;
            paintPreview();
            paintWarnings();
            if (state.compileDirty) {
                scheduleCompile();
            }
        });
    }

    function widths() {
        if (state.device === "mobile") {
            return 390;
        }
        if (state.device === "tablet") {
            return 820;
        }
        return 1180;
    }

    function layoutDevice() {
        var stage = document.getElementById("stage");
        var frame = document.getElementById("preview");
        if (!stage || !frame) {
            return;
        }
        var w = widths();
        var availW = Math.max(280, stage.clientWidth - 48);
        var availH = Math.max(420, stage.clientHeight - 28);
        var scale = Math.min(1, availW / w);
        frame.style.width = w + "px";
        frame.style.height = Math.round(availH / scale) + "px";
        frame.style.transform = "scale(" + scale + ")";
        frame.style.transformOrigin = "top left";
        var device = document.getElementById("device");
        device.style.width = Math.round(w * scale) + "px";
        device.style.height = Math.round(availH) + "px";
    }

    function frameDoc() {
        var frame = document.getElementById("preview");
        return frame && frame.contentDocument;
    }

    function previewHtml() {
        var css = (window.PD_CONTEXT || "") + "/download/resources/" + window.PD_PLUGIN_KEY + ":portal-runtime/portal.css";
        var js = (window.PD_CONTEXT || "") + "/download/resources/" + window.PD_PLUGIN_KEY + ":portal-runtime/portal.js";
        return "<!DOCTYPE html><html><head><meta charset=\"utf-8\"/>" +
            "<link rel=\"stylesheet\" href=\"" + css + "\"/>" +
            "<style id=\"pd-generated-style\"></style></head><body>" +
            "<header data-pd-region=\"header\"><span>Jira Service Management</span></header>" +
            "<div id=\"mock-home\"><div class=\"native-search\"><input type=\"search\" placeholder=\"Поиск\"/></div>" +
            "<h2 id=\"mock-group\">Популярные услуги</h2><div id=\"mock-requests\"></div></div>" +
            "<div id=\"mock-login\"><form><h2>Вход</h2><label>Эл. почта<input type=\"email\"/></label>" +
            "<label>Пароль<input type=\"password\"/></label><button type=\"submit\">Войти</button></form></div>" +
            "<div id=\"mock-create\"><form><h2>Новая заявка</h2><label>Тема<input type=\"text\"/></label>" +
            "<label>Описание<textarea rows=\"4\"></textarea></label><button type=\"submit\">Отправить</button></form></div>" +
            "<div id=\"mock-requests-page\"><header>Запросы</header><table class=\"cv-requests\"><tr><td><a href=\"/servicedesk/customer/portal/1/IT-15\">IT-15</a></td><td>Не работает почта</td></tr>" +
            "<tr><td><a href=\"/servicedesk/customer/portal/1/IT-16\">IT-16</a></td><td>Доступ для нового сотрудника</td></tr></table></div>" +
            "<footer data-pd-region=\"footer\">Jira Service Management</footer>" +
            "<script>window.__PD_MANUAL=true;</script><script src=\"" + js + "\"></script>" +
            "</body></html>";
    }

    function catalogTypes() {
        return state.requestTypes.length ? state.requestTypes : SAMPLE;
    }

    function orderedTypes(types) {
        var order = (state.theme && state.theme.requests && state.theme.requests.order) || [];
        var copy = types.slice();
        if (!order.length) {
            return copy;
        }
        var rank = {};
        order.forEach(function (id, index) { rank[String(id)] = index; });
        copy.sort(function (a, b) {
            var ia = rank[String(a.id)];
            var ib = rank[String(b.id)];
            if (ia == null) {
                ia = 1000;
            }
            if (ib == null) {
                ib = 1000;
            }
            return ia - ib;
        });
        return copy;
    }

    function moveCard(id, delta) {
        var types = orderedTypes(catalogTypes());
        var ids = types.map(function (type) { return String(type.id); });
        var index = ids.indexOf(String(id));
        var next = index + delta;
        if (index < 0 || next < 0 || next >= ids.length) {
            return;
        }
        var swap = ids[index];
        ids[index] = ids[next];
        ids[next] = swap;
        remember();
        state.theme.requests.order = ids;
        markDirty();
        var box = frameDoc() && frameDoc().getElementById("mock-requests");
        if (box) {
            box.removeAttribute("data-sig");
        }
        renderInspector();
        scheduleCompile();
    }

    function fillCards(doc) {
        var box = doc.getElementById("mock-requests");
        if (!box) {
            return;
        }
        var types = orderedTypes(catalogTypes());
        var orderKey = ((state.theme && state.theme.requests && state.theme.requests.order) || []).join(",");
        var sig = state.portalId + ":" + orderKey + ":" + types.map(function (item) { return item.name; }).join("|");
        if (box.getAttribute("data-sig") === sig) {
            return;
        }
        box.setAttribute("data-sig", sig);
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        types.forEach(function (type) {
            var link = doc.createElement("a");
            link.href = "/servicedesk/customer/portal/1/create/" + encodeURIComponent(type.id);
            link.setAttribute("data-pd-card", "1");
            link.setAttribute("data-pd-type", String(type.id));
            link.draggable = false;
            var icon = doc.createElement("span");
            icon.className = "pd-card-icon";
            icon.textContent = (type.name || "?").charAt(0).toUpperCase();
            var title = doc.createElement("span");
            title.className = "pd-card-title";
            title.textContent = type.name || "";
            var desc = doc.createElement("span");
            desc.className = "pd-card-desc";
            desc.setAttribute("data-pd-desc", "1");
            desc.textContent = type.description || "";
            link.appendChild(icon);
            link.appendChild(title);
            link.appendChild(desc);
            box.appendChild(link);
        });
        box.setAttribute("data-pd-region", "requests");
        box.setAttribute("data-pd-select", "requests");
    }

    function armPreview(doc) {
        if (doc.__pdBound) {
            return;
        }
        doc.__pdBound = true;
        doc.addEventListener("click", function (event) {
            if (state.browse && state.liveFrame) {
                var link = event.target && event.target.closest && event.target.closest("a[href]");
                var raw = link ? (link.getAttribute("href") || "") : "";
                if (link && raw && raw.indexOf("javascript:") !== 0 && raw.charAt(0) !== "#") {
                    event.preventDefault();
                    var view = doc.defaultView;
                    var abs = raw;
                    try {
                        abs = new view.URL(raw, view.location.href).href;
                    } catch (e) {
                        abs = raw;
                    }
                    var hashless = String(abs).split("#")[0];
                    if (hashless.indexOf("pdPreview=1") < 0) {
                        hashless += (hashless.indexOf("?") >= 0 ? "&" : "?") + "pdPreview=1";
                    }
                    document.getElementById("preview").src = hashless;
                }
                return;
            }
            var node = event.target;
            if (node && node.closest && node.closest("a,button")) {
                event.preventDefault();
            }
            while (node && node !== doc) {
                if (node.getAttribute && node.getAttribute("data-pd-widget")) {
                    state.widgetId = node.getAttribute("data-pd-widget");
                    state.section = "canvas";
                    renderNav();
                    renderInspector();
                    return;
                }
                node = node.parentNode;
            }
            var picked = event.target;
            if (!picked || !picked.closest || picked.closest("#pd-editor-layer, #pd-chrome, #pd-widgets")) {
                return;
            }
            if (picked === doc.body || picked === doc.documentElement) {
                return;
            }
            state.picked = {
                selector: selectorFor(picked),
                label: (picked.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60)
            };
            if (state.picked.selector) {
                ruleForPicked(true);
                markDirty();
                scheduleCompile();
            }
            state.section = "object";
            renderNav();
            renderInspector();
        }, true);
        var dragId = "";
        doc.addEventListener("dragstart", function (event) {
            var card = event.target.closest ? event.target.closest("[data-pd-card]") : null;
            if (!card) {
                return;
            }
            dragId = card.getAttribute("data-pd-type") || "";
            if (event.dataTransfer) {
                event.dataTransfer.setData("text/plain", dragId);
                event.dataTransfer.effectAllowed = "move";
            }
        });
        doc.addEventListener("dragover", function (event) {
            if (event.target.closest && event.target.closest("[data-pd-card]")) {
                event.preventDefault();
            }
        });
        doc.addEventListener("drop", function (event) {
            var card = event.target.closest ? event.target.closest("[data-pd-card]") : null;
            var box = doc.getElementById("mock-requests");
            if (!card || !box || !dragId) {
                return;
            }
            event.preventDefault();
            var dragged = null;
            var cards = box.children;
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].getAttribute && cards[i].getAttribute("data-pd-type") === dragId) {
                    dragged = cards[i];
                    break;
                }
            }
            if (dragged && dragged !== card) {
                box.insertBefore(dragged, card);
            }
            var ids = [];
            for (var n = 0; n < box.children.length; n++) {
                var typed = box.children[n].getAttribute && box.children[n].getAttribute("data-pd-type");
                if (typed) {
                    ids.push(typed);
                }
            }
            remember();
            state.theme.requests.order = ids;
            markDirty();
            box.setAttribute("data-sig", state.portalId + ":" + ids.join(",") + ":" + catalogTypes().map(function (item) { return item.name; }).join("|"));
            if (state.section === "requests") {
                renderInspector();
            }
            scheduleCompile();
            dragId = "";
        });
        doc.addEventListener("input", function (event) {
            var widgetField = event.target.getAttribute && event.target.getAttribute("data-pd-widget-field");
            if (widgetField && state.theme) {
                var host = event.target.closest ? event.target.closest("[data-pd-widget]") : null;
                var widget = host && widgetById(host.getAttribute("data-pd-widget"));
                if (widget) {
                    remember();
                    widget[widgetField] = event.target.textContent;
                    markDirty();
                    scheduleCompile();
                }
                return;
            }
            var path = event.target.getAttribute && event.target.getAttribute("data-pd-bind");
            if (!path || !state.theme) {
                return;
            }
            remember();
            setPath(state.theme, path, event.target.textContent);
            markDirty();
            var field = document.querySelector("[data-path='" + path + "']");
            if (field && field !== document.activeElement) {
                field.value = event.target.textContent;
            }
            scheduleCompile();
        });
    }

    function paintPreview() {
        var doc = frameDoc();
        var runtime = doc && doc.defaultView && doc.defaultView.PortalDesigner;
        if (!doc || !doc.documentElement || !runtime || !state.previewTheme) {
            return;
        }
        if (!state.liveFrame) {
            fillCards(doc);
        }
        runtime.apply({
            document: doc,
            theme: state.previewTheme,
            css: state.css,
            contextPath: window.PD_CONTEXT || "",
            portalId: state.portalId,
            page: state.page,
            device: state.device,
            preview: true,
            mock: !state.liveFrame,
            onRender: function (rendered) {
                var bound = rendered.querySelectorAll("[data-pd-bind], [data-pd-widget-field]");
                for (var i = 0; i < bound.length; i++) {
                    bound[i].setAttribute("contenteditable", "true");
                }
            }
        });
        armPreview(doc);
        armCanvas(doc);
    }

    function paintBanner() {
        var banner = document.getElementById("banner");
        if (!banner || !state.theme) {
            return;
        }
        var messages = [];
        if (!effectiveEnabled()) {
            messages.push(t("unpublished"));
        }
        if (state.portalId !== "global" && state.theme.useGlobal) {
            messages.push(t("inherited"));
        }
        if (state.liveFrame) {
            messages.push(state.browse ? t("browseOn") : t("liveHint"));
        }
        banner.textContent = messages.join(" ");
        banner.className = messages.length ? "banner show" : "banner";
    }

    function paintWarnings() {
        var list = document.getElementById("warnings");
        if (!list) {
            return;
        }
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        if (!state.warnings.length) {
            return;
        }
        list.appendChild(h("li", {text: t("warnings")}));
    }

    function liveSrc() {
        var id = state.portalId;
        var base = (window.PD_CONTEXT || "") + "/servicedesk/customer";
        var q = "pdPreview=1";
        if (state.page === "portals") {
            return base + "/portals?" + q;
        }
        if (state.page === "requests") {
            return base + "/user/requests?" + q;
        }
        if (state.page === "login") {
            return /^[0-9]+$/.test(id) ? base + "/portal/" + id + "/user/login?" + q : base + "/user/login?" + q;
        }
        if (/^[0-9]+$/.test(id)) {
            if (state.page === "create") {
                return base + "/portal/" + id + "/create/10?" + q;
            }
            return base + "/portal/" + id + "?" + q;
        }
        return base + "/portals?" + q;
    }

    function bootFrame() {
        var frame = document.getElementById("preview");
        frame.onload = function () {
            var doc = frame.contentDocument;
            var view = doc && doc.defaultView;
            var runtime = view && view.PortalDesigner;
            var href = view && view.location ? view.location.href : "";
            if (!runtime && !state.mockFallback) {
                state.mockFallback = true;
                state.liveFrame = false;
                frame.removeAttribute("src");
                frame.srcdoc = previewHtml();
                return;
            }
            state.liveFrame = href.indexOf("pdPreview=1") >= 0;
            if (state.liveFrame && runtime && runtime.pageKind) {
                state.page = runtime.pageKind(view.location.pathname);
                renderSegments();
            }
            state.frameReady = true;
            paintPreview();
            watchFrame(doc);
            fitChrome();
            layoutDevice();
        };
        if (!state.mockFallback) {
            frame.removeAttribute("srcdoc");
            frame.src = liveSrc();
        } else {
            frame.srcdoc = previewHtml();
        }
    }

    function watchFrame(doc) {
        if (!doc || doc.__pdWatch || !state.liveFrame) {
            return;
        }
        doc.__pdWatch = true;
        var view = doc.defaultView;
        var last = view.location.pathname;
        setInterval(function () {
            if (!view.location || view.location.pathname === last) {
                return;
            }
            last = view.location.pathname;
            if (view.PortalDesigner && view.PortalDesigner.pageKind) {
                state.page = view.PortalDesigner.pageKind(last);
                renderSegments();
            }
            paintPreview();
        }, 500);
    }

    function fitChrome() {
        var app = document.getElementById("pd-app");
        if (!app) {
            return;
        }
        var panel = app.parentNode;
        var steps = 0;
        while (panel && steps < 6) {
            if (panel.classList && panel.classList.contains("aui-page-panel-content")) {
                break;
            }
            panel = panel.parentNode;
            steps++;
        }
        if (panel && panel.classList && panel.classList.contains("aui-page-panel-content")) {
            var cs = window.getComputedStyle(panel);
            app.style.marginTop = "-" + (parseFloat(cs.paddingTop) || 0) + "px";
            app.style.marginRight = "-" + (parseFloat(cs.paddingRight) || 0) + "px";
            app.style.marginBottom = "-" + (parseFloat(cs.paddingBottom) || 0) + "px";
            app.style.marginLeft = "-" + (parseFloat(cs.paddingLeft) || 0) + "px";
        }
        var top = app.getBoundingClientRect().top;
        if (top < 0) {
            top = 0;
        }
        var footer = document.getElementById("footer");
        var footerH = footer ? footer.offsetHeight : 0;
        var height = window.innerHeight - top - footerH;
        if (height < 420) {
            height = Math.max(420, window.innerHeight - top);
        }
        app.style.height = Math.floor(height) + "px";
    }

    function renderShell() {
        var app = document.getElementById("pd-app");
        app.innerHTML = "";
        var save = h("button", {id: "save", class: "save", type: "button", text: t("save"), onclick: saveTheme});
        var root = h("div", {class: "shell"}, [
            h("header", {class: "top"}, [
                h("div", {class: "brand"}, [
                    h("div", {class: "mark", text: "П"}),
                    h("div", {}, [h("strong", {id: "brand-title", text: t("title")}), h("span", {text: t("subtitle")})])
                ]),
                h("select", {id: "portal", onchange: onPortal}),
                h("input", {id: "portal-id", class: "portal-id", type: "text", placeholder: t("portalPh"), onchange: onManualPortal}),
                h("div", {class: "seg", id: "pages"}),
                h("div", {class: "seg", id: "devices"}),
                h("div", {class: "grow"}, [
                    h("button", {type: "button", class: "ghost", text: t("undo"), onclick: undo}),
                    h("button", {type: "button", class: "ghost", text: t("redo"), onclick: redo}),
                    h("button", {type: "button", class: "ghost", id: "lang", text: t("lang"), onclick: toggleLang}),
                    h("button", {type: "button", class: "ghost", text: t("import"), onclick: importTheme}),
                    h("button", {type: "button", class: "ghost", text: t("addBlock"), onclick: function () { addWidget("text"); }}),
                    h("button", {type: "button", class: "ghost", text: t("export"), onclick: exportTheme}),
                    h("label", {class: "publish"}, [
                        h("input", {id: "enabled", type: "checkbox", onchange: onEnabled}),
                        h("span", {id: "published-label", text: t("published")})
                    ]),
                    h("button", {type: "button", class: "ghost", id: "browse", text: t("browse"), onclick: toggleBrowse}),
                    h("button", {type: "button", class: "ghost", text: t("removeTheme"), onclick: removeTheme}),
                    save
                ])
            ]),
            h("div", {class: "work"}, [
                h("nav", {class: "nav", id: "nav"}),
                h("div", {class: "stage-wrap"}, [
                    h("div", {id: "banner", class: "banner"}),
                    h("div", {class: "stage", id: "stage"}, [
                        h("div", {class: "device", id: "device"}, [
                            h("iframe", {id: "preview", title: "Portal preview"})
                        ])
                    ])
                ]),
                h("aside", {class: "inspector", id: "inspector"})
            ]),
            h("div", {id: "toast", class: "toast"})
        ]);
        app.appendChild(root);
        renderSegments();
        renderNav();
        fitChrome();
        bootFrame();
        window.addEventListener("resize", function () {
            fitChrome();
            layoutDevice();
        });
    }

    function renderSegments() {
        fillSeg("pages", [["portals", "pagePortals"], ["project", "pageProject"], ["create", "create"], ["requests", "pageRequests"], ["login", "login"]], state.page, function (id) {
            state.page = id;
            state.picked = null;
            renderSegments();
            if (state.liveFrame && !state.mockFallback) {
                document.getElementById("preview").src = liveSrc();
            } else {
                paintPreview();
            }
        });
        fillSeg("devices", [["desktop", "desktop"], ["tablet", "tablet"], ["mobile", "mobile"]], state.device, function (id) {
            state.device = id;
            renderSegments();
            renderInspector();
            layoutDevice();
            paintPreview();
        });
    }

    function fillSeg(id, items, current, onPick) {
        var host = document.getElementById(id);
        host.innerHTML = "";
        items.forEach(function (item) {
            host.appendChild(h("button", {
                type: "button",
                class: item[0] === current ? "active" : "",
                text: t(item[1]),
                onclick: function () { onPick(item[0]); }
            }));
        });
    }

    function renderNav() {
        var host = document.getElementById("nav");
        host.innerHTML = "";
        ["theme", "header", "portalMenu", "projectMenu", "requestForm", "hero", "search", "requests", "announcement", "footer", "canvas", "object", "screens", "css"].forEach(function (id) {
            host.appendChild(h("button", {
                type: "button",
                class: state.section === id ? "active" : "",
                text: t(id),
                onclick: function () {
                    state.section = id;
                    renderNav();
                    renderInspector();
                }
            }));
        });
    }

    function field(path, label, control) {
        return h("div", {class: "field"}, [h("label", {text: label}), control]);
    }

    function bind(path, node, parser) {
        node.setAttribute("data-path", path);
        var event = node.type === "checkbox" || node.tagName === "SELECT" ? "change" : "input";
        node.addEventListener(event, function () {
            if (!state.theme) {
                return;
            }
            remember();
            var value = node.type === "checkbox" ? node.checked : node.value;
            if (parser) {
                value = parser(value);
            }
            setPath(state.theme, path, value);
            markDirty();
            scheduleCompile();
            if (path.indexOf("colors.") === 0) {
                paintContrast();
            }
        });
        return node;
    }

    function textInput(path) {
        return bind(path, h("input", {type: "text", value: getPath(state.theme, path) || ""}));
    }

    function imageInput(path) {
        var wrap = h("div", {});
        wrap.appendChild(textInput(path));
        var file = h("input", {type: "file", accept: "image/png,image/jpeg,image/gif,image/webp"});
        file.addEventListener("change", function () {
            var picked = file.files && file.files[0];
            if (!picked) {
                return;
            }
            if (picked.size > 270 * 1024) {
                toast(t("fileBig"));
                file.value = "";
                return;
            }
            var reader = new FileReader();
            reader.onload = function () {
                remember();
                setPath(state.theme, path, String(reader.result || ""));
                markDirty();
                renderInspector();
                scheduleCompile();
            };
            reader.readAsDataURL(picked);
        });
        wrap.appendChild(file);
        return wrap;
    }

    function area(path, rows) {
        return bind(path, h("textarea", {rows: rows || 4, value: getPath(state.theme, path) || ""}));
    }

    function numberInput(path, min, max, step) {
        var actual = pathFor(path);
        return bind(actual, h("input", {
            type: "number",
            min: min,
            max: max,
            step: step || 1,
            value: getPath(state.theme, actual)
        }), function (value) { return Number(value); });
    }

    function selectInput(path, options) {
        var node = h("select");
        options.forEach(function (option) {
            var item = h("option", {value: option[0], text: t(option[1])});
            if (String(getPath(state.theme, path)) === String(option[0])) {
                item.selected = true;
            }
            node.appendChild(item);
        });
        return bind(path, node);
    }

    function checkInput(path, label) {
        var box = h("input", {type: "checkbox", checked: !!getPath(state.theme, path)});
        bind(path, box);
        return h("label", {class: "check"}, [box, document.createTextNode(label)]);
    }

    function colorInput(key) {
        var path = "colors." + key;
        var value = getPath(state.theme, path) || "#000000";
        var picker = h("input", {type: "color", value: toHex(value)});
        var text = h("input", {type: "text", value: value});
        picker.addEventListener("input", function () {
            text.value = picker.value.toUpperCase();
            remember();
            setPath(state.theme, path, text.value);
            markDirty();
            scheduleCompile();
            paintContrast();
        });
        text.addEventListener("change", function () {
            remember();
            setPath(state.theme, path, text.value);
            if (/^#[0-9a-fA-F]{6}$/.test(text.value)) {
                picker.value = text.value;
            }
            markDirty();
            scheduleCompile();
        });
        return field(path, t(key), h("div", {class: "color-row"}, [picker, text]));
    }

    function toHex(value) {
        return /^#[0-9a-fA-F]{6}$/.test(value || "") ? value : "#000000";
    }

    function linkEditor(list) {
        var wrap = h("div");
        (list || []).forEach(function (link, index) {
            var label = h("input", {type: "text", value: link.label || ""});
            var href = h("input", {type: "text", value: link.href || ""});
            label.addEventListener("input", function () {
                remember();
                link.label = label.value;
                markDirty();
                scheduleCompile();
            });
            href.addEventListener("input", function () {
                remember();
                link.href = href.value;
                markDirty();
                scheduleCompile();
            });
            var remove = h("button", {type: "button", class: "icon-btn", text: "×", onclick: function () {
                remember();
                list.splice(index, 1);
                markDirty();
                renderInspector();
                scheduleCompile();
            }});
            wrap.appendChild(h("div", {class: "link-row"}, [label, href, remove]));
        });
        wrap.appendChild(h("button", {type: "button", class: "text-btn", text: t("addLink"), onclick: function () {
            remember();
            list.push({label: t("newLink"), href: "/"});
            markDirty();
            renderInspector();
            scheduleCompile();
        }}));
        return wrap;
    }

    var CANVAS_BLOCKS = [
        ["header", "header"],
        ["hero", "hero"],
        ["announcement", "announcement"],
        ["search", "search"],
        ["requests", "requests"],
        ["footer", "footer"],
        ["login", "login"],
        ["form", "create"]
    ];

    function deviceKey() {
        return state.device || "desktop";
    }

    function widgetById(id) {
        ensureShape(state.theme);
        var list = state.theme.canvas.widgets;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return list[i];
            }
        }
        return null;
    }

    function blankSpot(free) {
        return {free: !!free, hidden: false, x: 0, y: 0, w: 0, h: 0};
    }

    function screenSpots(theme) {
        ensureShape(theme);
        var key = deviceKey();
        if (!theme.canvas[key] || typeof theme.canvas[key] !== "object") {
            theme.canvas[key] = {};
        }
        return theme.canvas[key];
    }

    function readSpot(key) {
        if (key.indexOf("widget-") === 0) {
            var widget = widgetById(key.substring(7));
            if (!widget) {
                return blankSpot(true);
            }
            widget[deviceKey()] = widget[deviceKey()] || blankSpot(true);
            return widget[deviceKey()];
        }
        if (key === "portal-menu" || key === "project-menu") {
            ensureShape(state.theme);
            var menu = key === "portal-menu" ? state.theme.portalMenu : state.theme.projectMenu;
            menu[deviceKey()] = menu[deviceKey()] || blankSpot(false);
            return menu[deviceKey()];
        }
        if (key.indexOf("el-") === 0) {
            var rule = elementById(key.substring(3));
            if (!rule) {
                return blankSpot(false);
            }
            rule[deviceKey()] = rule[deviceKey()] || blankSpot(false);
            return rule[deviceKey()];
        }
        var spots = screenSpots(state.theme);
        spots[key] = spots[key] || blankSpot(false);
        return spots[key];
    }

    function writeSpot(key, spot) {
        var themes = [state.theme, state.previewTheme];
        for (var i = 0; i < themes.length; i++) {
            var theme = themes[i];
            if (!theme) {
                continue;
            }
            if (key.indexOf("widget-") === 0) {
                ensureShape(theme);
                var list = theme.canvas.widgets;
                for (var w = 0; w < list.length; w++) {
                    if (list[w].id === key.substring(7)) {
                        list[w][deviceKey()] = spot;
                    }
                }
            } else if (key === "portal-menu" || key === "project-menu") {
                ensureShape(theme);
                var menu = key === "portal-menu" ? theme.portalMenu : theme.projectMenu;
                menu[deviceKey()] = spot;
            } else if (key.indexOf("el-") === 0) {
                ensureShape(theme);
                var rules = theme.elements;
                for (var r = 0; r < rules.length; r++) {
                    if (rules[r].id === key.substring(3)) {
                        rules[r][deviceKey()] = spot;
                    }
                }
            } else {
                screenSpots(theme)[key] = spot;
            }
        }
    }

    function boxOf(node) {
        var rect = node.getBoundingClientRect();
        var body = node.ownerDocument.body.getBoundingClientRect();
        return {
            x: rect.left - body.left,
            y: rect.top - body.top,
            w: rect.width,
            h: rect.height
        };
    }

    function canvasNode(doc, key) {
        var nodes = doc.querySelectorAll("[data-pd-canvas]");
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].getAttribute("data-pd-canvas") === key) {
                return nodes[i];
            }
        }
        return null;
    }

    function addWidget(type) {
        remember();
        ensureShape(state.theme);
        var id = "w" + Math.floor(Math.random() * 1e9).toString(36);
        var y = 160 + state.theme.canvas.widgets.length * 28;
        var spot = {
            free: true,
            hidden: false,
            x: 48,
            y: y,
            w: type === "button" ? 180 : (type === "tooltip" ? 36 : 320),
            h: type === "button" ? 52 : (type === "image" ? 180 : (type === "tooltip" ? 36 : 96))
        };
        state.theme.canvas.widgets.push({
            id: id,
            type: type,
            text: type === "button" ? "Открыть" : "Новый блок",
            href: type === "button" ? "#" : "",
            imageUrl: "",
            html: "<p>Свой блок</p>",
            page: state.page || "home",
            target: "",
            desktop: clone(spot),
            tablet: clone(spot),
            mobile: {free: true, hidden: false, x: 16, y: y, w: 300, h: spot.h}
        });
        state.widgetId = id;
        state.section = "canvas";
        markDirty();
        renderNav();
        renderInspector();
        scheduleCompile();
    }

    function deleteWidget(id) {
        remember();
        ensureShape(state.theme);
        var next = [];
        var list = state.theme.canvas.widgets;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id !== id) {
                next.push(list[i]);
            }
        }
        state.theme.canvas.widgets = next;
        if (state.widgetId === id) {
            state.widgetId = "";
        }
        markDirty();
        renderInspector();
        scheduleCompile();
    }

    function resetFlow() {
        remember();
        ensureShape(state.theme);
        state.theme.canvas[deviceKey()] = {};
        var widgets = state.theme.canvas.widgets;
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i][deviceKey()]) {
                widgets[i][deviceKey()].free = false;
            }
        }
        markDirty();
        renderInspector();
        scheduleCompile();
    }

    function toggleSpot(key, field, on) {
        remember();
        var spot = readSpot(key);
        if (field === "free" && on) {
            var doc = frameDoc();
            var node = doc && canvasNode(doc, key);
            if (node) {
                var box = boxOf(node);
                spot.x = Math.round(box.x);
                spot.y = Math.round(box.y);
                spot.originX = spot.x;
                spot.originY = spot.y;
                spot.hasOrigin = true;
                spot.w = Math.max(40, Math.round(box.w));
                spot.h = Math.max(24, Math.round(box.h));
            } else if (!spot.w) {
                spot.x = 48;
                spot.y = 160;
                spot.w = 320;
                spot.h = 80;
            }
        }
        spot[field] = on;
        writeSpot(key, spot);
        markDirty();
        scheduleCompile();
    }

    function hitLabel(key) {
        if (key.indexOf("widget-") === 0) {
            var widget = widgetById(key.substring(7));
            var type = widget && widget.type;
            if (type === "image") {
                return t("addImage");
            }
            if (type === "button") {
                return t("addButton");
            }
            if (type === "html") {
                return t("addHtml");
            }
            if (type === "tooltip") {
                return t("addTip");
            }
            return t("addText");
        }
        if (key.indexOf("card-") === 0) {
            return t("requests") + " " + key.substring(5);
        }
        if (key === "form") {
            return t("create");
        }
        return t(key);
    }

    function injectEditorStyle(doc) {
        if (doc.getElementById("pd-editor-style")) {
            return;
        }
        var style = doc.createElement("style");
        style.id = "pd-editor-style";
        style.textContent = "#pd-editor-layer{position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:80}"
            + ".pd-hit{position:absolute;pointer-events:none;outline:1px dashed rgba(0,82,204,.55)}"
            + ".pd-hit-label{position:absolute;left:8px;top:-18px;background:#0052CC;color:#fff;font:11px/16px 'Segoe UI',sans-serif;padding:0 6px;border-radius:2px;white-space:nowrap;pointer-events:none}"
            + ".pd-drag,.pd-resize{pointer-events:auto;position:absolute;padding:0;border:0}"
            + ".pd-drag{left:0;top:-20px;width:64px;height:18px;background:#0052CC;border-radius:2px;cursor:move}"
            + ".pd-resize{right:-8px;bottom:-8px;width:18px;height:18px;background:#fff;border:2px solid #0052CC;border-radius:2px;cursor:nwse-resize}";
        (doc.head || doc.documentElement).appendChild(style);
    }

    function armCanvas(doc) {
        if (!doc || !doc.body || !state.theme) {
            return;
        }
        var runtime = doc.defaultView && doc.defaultView.PortalDesigner;
        if (!runtime || !runtime.place) {
            return;
        }
        injectEditorStyle(doc);
        if (!doc.__pdMove) {
            doc.__pdMove = true;
            doc.addEventListener("pointerdown", function (event) {
                if (state.browse && state.liveFrame) {
                    return;
                }
                if (event.button !== 0) {
                    return;
                }
                var target = event.target;
                if (!target || !target.closest) {
                    return;
                }
                if (target.closest("#pd-editor-layer, [contenteditable='true'], input, textarea, select, button")) {
                    return;
                }
                var node = target.closest("[data-pd-canvas]");
                var live = doc.defaultView && doc.defaultView.PortalDesigner;
                if (!node || !live || !live.place) {
                    return;
                }
                var key = node.getAttribute("data-pd-canvas");
                var handle = null;
                var hits = doc.querySelectorAll(".pd-hit");
                for (var n = 0; n < hits.length; n++) {
                    if (hits[n].getAttribute("data-pd-hit") === key) {
                        handle = hits[n];
                        break;
                    }
                }
                startCanvasDrag(event, doc, node, key, handle, false, live);
            }, true);
        }
        var layer = doc.getElementById("pd-editor-layer");
        if (!layer) {
            layer = doc.createElement("div");
            layer.id = "pd-editor-layer";
            doc.body.appendChild(layer);
        }
        while (layer.firstChild) {
            layer.removeChild(layer.firstChild);
        }
        var nodes = doc.querySelectorAll("[data-pd-canvas]");
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].offsetWidth < 2 && nodes[i].offsetHeight < 2) {
                continue;
            }
            addHit(doc, layer, nodes[i], runtime);
        }
        layer.style.height = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight) + "px";
    }

    function addHit(doc, layer, node, runtime) {
        var key = node.getAttribute("data-pd-canvas");
        var box = boxOf(node);
        var hit = doc.createElement("div");
        hit.className = "pd-hit";
        hit.setAttribute("data-pd-hit", key);
        hit.style.left = Math.round(box.x) + "px";
        hit.style.top = Math.round(box.y) + "px";
        hit.style.width = Math.max(8, Math.round(box.w)) + "px";
        hit.style.height = Math.max(8, Math.round(box.h)) + "px";
        var label = doc.createElement("span");
        label.className = "pd-hit-label";
        label.textContent = hitLabel(key);
        var drag = doc.createElement("button");
        drag.type = "button";
        drag.className = "pd-drag";
        drag.title = t("dragHandle");
        drag.addEventListener("pointerdown", function (event) {
            startCanvasDrag(event, doc, node, key, hit, false, runtime);
        });
        var resize = doc.createElement("button");
        resize.type = "button";
        resize.className = "pd-resize";
        resize.title = t("resizeHandle");
        resize.addEventListener("pointerdown", function (event) {
            startCanvasDrag(event, doc, node, key, hit, true, runtime);
        });
        hit.appendChild(label);
        hit.appendChild(drag);
        hit.appendChild(resize);
        layer.appendChild(hit);
    }

    function startCanvasDrag(event, doc, node, key, hit, resizing, runtime) {
        event.preventDefault();
        event.stopPropagation();
        var spot = readSpot(key);
        var originX = event.clientX;
        var originY = event.clientY;
        var start = null;
        var moved = false;
        function begin() {
            if (moved) {
                return;
            }
            moved = true;
            if (!spot.free) {
                var box = boxOf(node);
                spot.free = true;
                spot.x = Math.round(box.x);
                spot.y = Math.round(box.y);
                spot.w = Math.max(40, Math.round(box.w));
                spot.h = Math.max(24, Math.round(box.h));
                spot.originX = spot.x;
                spot.originY = spot.y;
                spot.hasOrigin = true;
            } else if (typeof spot.originX !== "number") {
                spot.originX = spot.x;
                spot.originY = spot.y;
                spot.hasOrigin = true;
            }
            start = {x: spot.x, y: spot.y, w: spot.w, h: spot.h};
        }
        function move(ev) {
            var dx = ev.clientX - originX;
            var dy = ev.clientY - originY;
            if (!moved && Math.abs(dx) + Math.abs(dy) < 3) {
                return;
            }
            begin();
            if (resizing) {
                spot.w = Math.max(40, Math.min(2400, Math.round(start.w + dx)));
                spot.h = Math.max(24, Math.min(2400, Math.round(start.h + dy)));
            } else {
                spot.x = Math.max(-2000, Math.min(4000, Math.round(start.x + dx)));
                spot.y = Math.max(-2000, Math.min(8000, Math.round(start.y + dy)));
            }
            spot.free = true;
            writeSpot(key, spot);
            runtime.place(node, spot);
            if (!hit) {
                return;
            }
            var next = boxOf(node);
            hit.style.left = Math.round(next.x) + "px";
            hit.style.top = Math.round(next.y) + "px";
            hit.style.width = Math.max(8, Math.round(next.w)) + "px";
            hit.style.height = Math.max(8, Math.round(next.h)) + "px";
        }
        function up() {
            doc.removeEventListener("pointermove", move);
            doc.removeEventListener("pointerup", up);
            if (!moved) {
                return;
            }
            remember();
            markDirty();
            if (state.section === "canvas") {
                renderInspector();
            }
            scheduleCompile();
        }
        doc.addEventListener("pointermove", move);
        doc.addEventListener("pointerup", up);
    }

    function renderCanvas(host) {
        ensureShape(state.theme);
        host.appendChild(h("p", {class: "hint", text: t("canvasHint")}));
        var row = h("div", {class: "grid-2"});
        [["text", "addText"], ["image", "addImage"], ["button", "addButton"], ["html", "addHtml"], ["tooltip", "addTip"]].forEach(function (item) {
            row.appendChild(h("button", {
                type: "button",
                class: "ghost",
                text: t(item[1]),
                onclick: function () { addWidget(item[0]); }
            }));
        });
        host.appendChild(row);
        host.appendChild(h("button", {type: "button", class: "text-btn", text: t("resetFlow"), onclick: resetFlow}));
        host.appendChild(h("p", {class: "block-label", text: t("blocks")}));
        CANVAS_BLOCKS.forEach(function (item) {
            host.appendChild(spotRow(item[0], t(item[1])));
        });
        catalogTypes().forEach(function (type) {
            host.appendChild(spotRow("card-" + type.id, type.name || String(type.id)));
        });
        state.theme.canvas.widgets.forEach(function (widget) {
            var selected = widget.id === state.widgetId;
            host.appendChild(h("div", {class: "column-card"}, [
                h("button", {
                    type: "button",
                    class: "text-btn",
                    text: t(widget.type || "text"),
                    onclick: function () {
                        state.widgetId = widget.id;
                        renderInspector();
                    }
                }),
                selected ? widgetEditor(widget) : null
            ]));
        });
    }

    function spotRow(key, label) {
        var spot = readSpot(key);
        var free = h("input", {type: "checkbox", checked: !!spot.free});
        free.addEventListener("change", function () { toggleSpot(key, "free", free.checked); });
        var hidden = h("input", {type: "checkbox", checked: !!spot.hidden});
        hidden.addEventListener("change", function () { toggleSpot(key, "hidden", hidden.checked); });
        return h("div", {class: "column-card"}, [
            h("strong", {text: label}),
            h("label", {class: "check"}, [free, document.createTextNode(t("freePos"))]),
            h("label", {class: "check"}, [hidden, document.createTextNode(t("hideBlock"))])
        ]);
    }

    function widgetField(label, value, onInput) {
        var input = h("input", {type: "text", value: value || ""});
        input.addEventListener("input", function () { onInput(input.value); });
        return field("", label, input);
    }

    function editWidget(widget, prop, value) {
        remember();
        widget[prop] = value;
        markDirty();
        scheduleCompile();
    }

    function widgetEditor(widget) {
        var box = h("div", {});
        if (widget.type === "html") {
            var html = h("textarea", {value: widget.html || ""});
            html.addEventListener("input", function () { editWidget(widget, "html", html.value); });
            box.appendChild(field("", t("widgetHtml"), html));
        } else if (widget.type !== "image") {
            box.appendChild(widgetField(t("widgetText"), widget.text, function (value) {
                editWidget(widget, "text", value);
            }));
        }
        if (widget.type === "button") {
            box.appendChild(widgetField(t("widgetHref"), widget.href, function (value) {
                editWidget(widget, "href", value);
            }));
        }
        if (widget.type === "tooltip") {
            box.appendChild(widgetField(t("tipTarget"), widget.target, function (value) {
                editWidget(widget, "target", value);
            }));
        }
        if (widget.type === "image") {
            var image = h("input", {type: "text", value: widget.imageUrl || ""});
            image.addEventListener("input", function () { editWidget(widget, "imageUrl", image.value); });
            var file = h("input", {type: "file", accept: "image/png,image/jpeg,image/gif,image/webp"});
            file.addEventListener("change", function () {
                var picked = file.files && file.files[0];
                if (!picked) {
                    return;
                }
                if (picked.size > 270 * 1024) {
                    toast(t("fileBig"));
                    file.value = "";
                    return;
                }
                var reader = new FileReader();
                reader.onload = function () {
                    editWidget(widget, "imageUrl", String(reader.result || ""));
                    renderInspector();
                };
                reader.readAsDataURL(picked);
            });
            box.appendChild(field("", t("widgetImage"), h("div", {}, [image, file])));
        }
        box.appendChild(h("button", {
            type: "button",
            class: "text-btn",
            text: t("deleteWidget"),
            onclick: function () { deleteWidget(widget.id); }
        }));
        return box;
    }

    function renderInspector() {
        var host = document.getElementById("inspector");
        if (!host || !state.theme) {
            return;
        }
        host.innerHTML = "";
        ensureShape(state.theme);
        host.appendChild(h("h2", {text: t(state.section)}));
        if (state.device !== "desktop" && (state.section === "requests" || state.section === "hero" || state.section === "header" || state.section === "theme")) {
            host.appendChild(h("p", {class: "hint", text: t("deviceHint")}));
        }
        if (state.section === "theme") {
            renderTheme(host);
        } else if (state.section === "header") {
            renderHeader(host);
        } else if (state.section === "portalMenu") {
            renderPortalMenu(host);
        } else if (state.section === "projectMenu") {
            renderProjectMenu(host);
        } else if (state.section === "requestForm") {
            renderRequestForm(host);
        } else if (state.section === "hero") {
            renderHero(host);
        } else if (state.section === "search") {
            renderSearch(host);
        } else if (state.section === "requests") {
            renderRequests(host);
        } else if (state.section === "announcement") {
            renderAnnouncement(host);
        } else if (state.section === "footer") {
            renderFooter(host);
        } else if (state.section === "canvas") {
            renderCanvas(host);
        } else if (state.section === "object") {
            renderObject(host);
        } else if (state.section === "screens") {
            renderScreens(host);
        } else if (state.section === "css") {
            host.appendChild(h("p", {class: "hint", text: t("customCss")}));
            host.appendChild(field("customCss", "CSS", area("customCss", 16)));
        }
        if (state.portalId !== "global") {
            var ownBox = h("input", {type: "checkbox", checked: !state.theme.useGlobal});
            bind("useGlobal", ownBox, function (value) { return !value; });
            host.appendChild(h("label", {class: "check"}, [ownBox, document.createTextNode(t("ownStyle"))]));
            host.appendChild(h("button", {type: "button", class: "text-btn", text: t("editGlobal"), onclick: function () {
                state.portalId = "global";
                document.getElementById("portal").value = "global";
                loadPortal("global");
            }}));
            host.appendChild(h("button", {type: "button", class: "text-btn", text: t("reset"), onclick: resetPortal}));
        }
        host.appendChild(h("ul", {class: "warn-list", id: "warnings"}));
        paintWarnings();
        paintContrast();
        var enabled = document.getElementById("enabled");
        if (enabled) {
            enabled.checked = effectiveEnabled();
        }
        paintBanner();
    }

    function elementById(id) {
        ensureShape(state.theme);
        var list = state.theme.elements;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return list[i];
            }
        }
        return null;
    }

    function editingPage() {
        var frame = document.getElementById("preview");
        var view = frame && frame.contentWindow;
        try {
            if (view && view.PortalDesigner && view.PortalDesigner.pageKind && view.location) {
                return view.PortalDesigner.pageKind(view.location.pathname) || state.page || "home";
            }
        } catch (e) {
            return state.page || "home";
        }
        return state.page || "home";
    }

    function ownedNode(node) {
        return !!(node && node.id && node.id.indexOf("pd-") === 0);
    }

    function selectorFor(el) {
        if (!el || el.nodeType !== 1 || ownedNode(el)) {
            return "";
        }
        if (el.id && /^[A-Za-z][A-Za-z0-9_-]{0,40}$/.test(el.id) && el.id.indexOf("pd-") !== 0) {
            return "#" + el.id;
        }
        var parts = [];
        var node = el;
        var guard = 0;
        while (node && node.nodeType === 1 && node.tagName !== "BODY" && node.tagName !== "HTML" && guard < 40) {
            if (ownedNode(node)) {
                node = node.parentNode;
                continue;
            }
            var tag = node.tagName.toLowerCase();
            if (!/^[a-z0-9]+$/.test(tag)) {
                break;
            }
            var index = 1;
            var sib = node;
            while (sib.previousElementSibling) {
                sib = sib.previousElementSibling;
                if (ownedNode(sib)) {
                    continue;
                }
                if (sib.tagName === node.tagName) {
                    index++;
                }
            }
        parts.unshift(tag + ":nth-of-type(" + index + ")");
        if (parts.join(" > ").length > 760) {
            return "";
        }
        node = node.parentNode;
        guard++;
    }
    if (!node || (node.tagName !== "BODY" && node.tagName !== "HTML")) {
        return "";
    }
    return parts.join(" > ");
    }

    function ruleForPicked(create) {
        ensureShape(state.theme);
        if (!state.picked || !state.picked.selector) {
            return null;
        }
        var list = state.theme.elements;
        for (var i = 0; i < list.length; i++) {
            if (list[i].selector === state.picked.selector && (list[i].page || "home") === editingPage()) {
                return list[i];
            }
        }
        if (!create) {
            return null;
        }
        var rule = {
            id: "e" + Math.floor(Math.random() * 1e9).toString(36),
            page: editingPage(),
            selector: state.picked.selector,
            label: state.picked.label || "",
            look: {color: "", background: "", fontFamily: "", fontSize: 0, fontWeight: 0, radius: -1, padding: -1, width: 0, height: 0},
            desktop: blankSpot(false),
            tablet: blankSpot(false),
            mobile: blankSpot(false)
        };
        list.push(rule);
        return rule;
    }

    function editLook(prop, value) {
        var rule = ruleForPicked(true);
        if (!rule) {
            return;
        }
        remember();
        rule.look[prop] = value;
        markDirty();
        scheduleCompile();
    }

    function renderObject(host) {
        host.appendChild(h("p", {class: "hint", text: t("objectHint")}));
        if (!state.picked || !state.picked.selector) {
            host.appendChild(h("p", {class: "hint", text: t("objectEmpty")}));
            return;
        }
        var rule = ruleForPicked(false);
        var look = (rule && rule.look) || {};
        host.appendChild(h("p", {class: "hint", text: state.picked.label || state.picked.selector}));
        var selector = h("input", {type: "text", value: (rule && rule.selector) || state.picked.selector});
        selector.addEventListener("change", function () {
            var current = ruleForPicked(true);
            remember();
            current.selector = selector.value.trim();
            state.picked.selector = current.selector;
            markDirty();
            scheduleCompile();
        });
        host.appendChild(field("", t("selector"), selector));
        host.appendChild(lookColor(t("objectColor"), look.color, "color"));
        host.appendChild(lookColor(t("fillColor"), look.background, "background"));
        host.appendChild(field("", t("fontSize"), lookNumber(look.fontSize, 0, 72, "fontSize")));
        host.appendChild(field("", t("fontWeight"), lookNumber(look.fontWeight, 0, 800, "fontWeight")));
        host.appendChild(field("", t("radius"), lookNumber(look.radius < 0 ? 0 : look.radius, 0, 48, "radius")));
        host.appendChild(field("", t("padding"), lookNumber(look.padding < 0 ? 0 : look.padding, 0, 80, "padding")));
        host.appendChild(field("", t("blockW"), lookNumber(look.width, 0, 2400, "width")));
        host.appendChild(field("", t("blockH"), lookNumber(look.height, 0, 2400, "height")));
        var spot = (rule && rule[deviceKey()]) || blankSpot(false);
        var free = h("input", {type: "checkbox", checked: !!spot.free});
        free.addEventListener("change", function () {
            var current = ruleForPicked(true);
            remember();
            var next = clone(current[deviceKey()] || blankSpot(false));
            next.free = free.checked;
            writeSpot("el-" + current.id, next);
            markDirty();
            scheduleCompile();
        });
        host.appendChild(h("label", {class: "check"}, [free, document.createTextNode(t("freePos"))]));
        host.appendChild(field("", "X", spotNumber(spot.x, "x")));
        host.appendChild(field("", "Y", spotNumber(spot.y, "y")));
        var font = h("input", {type: "text", value: look.fontFamily || "", placeholder: "Manrope, Segoe UI"});
        font.addEventListener("change", function () { editLook("fontFamily", font.value); });
        host.appendChild(field("", t("customFont"), font));
        host.appendChild(h("button", {
            type: "button",
            class: "ghost",
            text: t("addTip"),
            onclick: function () {
                addWidget("tooltip");
                var widget = state.theme.canvas.widgets[state.theme.canvas.widgets.length - 1];
                widget.target = state.picked.selector;
                widget.text = "Подсказка";
                widget.page = state.page || "home";
                scheduleCompile();
            }
        }));
    }

    function lookColor(label, value, prop) {
        var input = h("input", {type: "color", value: /^#[0-9a-fA-F]{6}$/.test(value || "") ? value : "#172B4D"});
        var text = h("input", {type: "text", value: value || ""});
        input.addEventListener("input", function () {
            text.value = input.value;
            editLook(prop, input.value);
        });
        text.addEventListener("change", function () { editLook(prop, text.value); });
        return field("", label, h("div", {class: "color-row"}, [input, text]));
    }

    function spotNumber(value, prop) {
        var input = h("input", {type: "number", value: value || 0});
        input.addEventListener("change", function () {
            var current = ruleForPicked(true);
            remember();
            var next = clone(current[deviceKey()] || blankSpot(false));
            next[prop] = parseInt(input.value, 10) || 0;
            next.free = true;
            writeSpot("el-" + current.id, next);
            markDirty();
            scheduleCompile();
        });
        return input;
    }

    function lookNumber(value, min, max, prop) {
        var input = h("input", {type: "number", min: String(min), max: String(max), value: value || 0});
        input.addEventListener("change", function () {
            var number = parseInt(input.value, 10);
            if (isNaN(number)) {
                number = 0;
            }
            editLook(prop, number);
        });
        return input;
    }

    function renderTheme(host) {
        host.appendChild(h("div", {class: "block-label", text: t("presets")}));
        var presets = h("div", {class: "presets"});
        state.presets.forEach(function (preset) {
            var colors = preset.theme.colors || {};
            presets.appendChild(h("button", {type: "button", class: "preset", onclick: function () { applyPreset(preset); }}, [
                h("div", {class: "swatch"}, [
                    h("i", {style: "background:" + (colors.headerBg || "#111")}),
                    h("i", {style: "background:" + (colors.heroBg || "#333")}),
                    h("i", {style: "background:" + (colors.background || "#eee")})
                ]),
                document.createTextNode(preset.label || preset.id),
                h("small", {text: preset.id})
            ]));
        });
        host.appendChild(presets);
        host.appendChild(field("name", t("name"), textInput("name")));
        host.appendChild(h("div", {class: "block-label", text: t("colors")}));
        var colors = h("div", {class: "grid-2"});
        ["primary", "primaryText", "background", "surface", "textColor", "muted", "headerBg", "headerText", "heroBg", "heroText", "footerBg", "footerText", "link", "border", "accent", "card"].forEach(function (key) {
            var real = key === "textColor" ? "text" : key;
            colors.appendChild(colorInput(real));
        });
        host.appendChild(colors);
        host.appendChild(h("div", {id: "contrast"}));
        host.appendChild(h("div", {class: "block-label", text: t("type")}));
        host.appendChild(field("typography.font", t("font"), selectInput("typography.font", [
            ["system", "system"], ["serif", "serif"], ["humanist", "humanist"], ["condensed", "condensed"], ["mono", "mono"]
        ])));
        host.appendChild(field("typography.customFont", t("customFont"), textInput("typography.customFont")));
        host.appendChild(h("p", {class: "hint", text: t("customFontHint")}));
        host.appendChild(field(pathFor("typography.baseSize"), t("base"), numberInput("typography.baseSize", 13, 22)));
        host.appendChild(field("typography.headingWeight", t("weight"), selectInput("typography.headingWeight", [
            ["400", "400"], ["500", "500"], ["600", "600"], ["700", "700"], ["800", "800"]
        ])));
        host.appendChild(field("typography.lineHeight", t("line"), numberInput("typography.lineHeight", 1.15, 1.9, 0.05)));
        host.appendChild(h("div", {class: "block-label", text: t("layout")}));
        host.appendChild(field("layout.contentWidth", t("width"), numberInput("layout.contentWidth", 640, 1440, 10)));
        host.appendChild(field("layout.radius", t("radius"), numberInput("layout.radius", 0, 48)));
        host.appendChild(field("layout.shadow", t("shadow"), selectInput("layout.shadow", [["none", "none"], ["soft", "soft"], ["strong", "strong"]])));
        host.appendChild(field(pathFor("layout.pagePadding"), t("pad"), numberInput("layout.pagePadding", 0, 64)));
        host.appendChild(field("layout.backgroundImage", t("pageImage"), imageInput("layout.backgroundImage")));
    }

    function menuItems(list) {
        var wrap = h("div");
        (list || []).forEach(function (link, index) {
            var label = h("input", {type: "text", value: link.label || ""});
            var href = h("input", {type: "text", value: link.href || ""});
            label.addEventListener("input", function () {
                remember();
                link.label = label.value;
                markDirty();
                scheduleCompile();
            });
            href.addEventListener("input", function () {
                remember();
                link.href = href.value;
                markDirty();
                scheduleCompile();
            });
            var up = h("button", {type: "button", class: "text-btn", text: t("moveUp"), onclick: function () {
                if (index < 1) return;
                remember();
                var swap = list[index - 1];
                list[index - 1] = list[index];
                list[index] = swap;
                markDirty();
                renderInspector();
                scheduleCompile();
            }});
            var down = h("button", {type: "button", class: "text-btn", text: t("moveDown"), onclick: function () {
                if (index >= list.length - 1) return;
                remember();
                var swap = list[index + 1];
                list[index + 1] = list[index];
                list[index] = swap;
                markDirty();
                renderInspector();
                scheduleCompile();
            }});
            var remove = h("button", {type: "button", class: "icon-btn", text: "×", onclick: function () {
                remember();
                list.splice(index, 1);
                markDirty();
                renderInspector();
                scheduleCompile();
            }});
            wrap.appendChild(h("div", {class: "link-row"}, [label, href, up, down, remove]));
        });
        wrap.appendChild(h("button", {type: "button", class: "text-btn", text: t("addLink"), onclick: function () {
            remember();
            list.push({label: t("newLink"), href: "/"});
            markDirty();
            renderInspector();
            scheduleCompile();
        }}));
        return wrap;
    }

    function renderMenuEditor(host, path) {
        ensureShape(state.theme);
        var menu = getPath(state.theme, path);
        host.appendChild(h("p", {class: "hint", text: t("menuHint")}));
        host.appendChild(field(path + ".mode", t("mode"), selectInput(path + ".mode", [["replace", "replace"], ["theme", "themeMode"], ["hidden", "hidden"]])));
        host.appendChild(field(path + ".direction", t("menuDirection"), selectInput(path + ".direction", [["row", "menuRow"], ["column", "menuColumn"]])));
        host.appendChild(field(path + ".color", t("objectColor"), textInput(path + ".color")));
        host.appendChild(field(path + ".background", t("fillColor"), textInput(path + ".background")));
        host.appendChild(field(path + ".fontFamily", t("customFont"), textInput(path + ".fontFamily")));
        host.appendChild(field(path + ".fontSize", t("fontSize"), numberInput(path + ".fontSize", 0, 72)));
        host.appendChild(field(path + ".radius", t("radius"), numberInput(path + ".radius", 0, 48)));
        host.appendChild(h("p", {class: "hint", text: t("radiusOff")}));
        host.appendChild(field(path + ".gap", t("gap"), numberInput(path + ".gap", 0, 48)));
        host.appendChild(menuItems(menu.items));
    }

    function renderPortalMenu(host) {
        renderMenuEditor(host, "portalMenu");
    }

    function renderProjectMenu(host) {
        renderMenuEditor(host, "projectMenu");
    }

    function renderRequestForm(host) {
        ensureShape(state.theme);
        host.appendChild(h("p", {class: "hint", text: t("formHint")}));
        host.appendChild(field("form.radius", t("radius"), numberInput("form.radius", -1, 48)));
        host.appendChild(h("p", {class: "hint", text: t("radiusOff")}));
        host.appendChild(field("form.gap", t("gap"), numberInput("form.gap", 0, 64)));
        host.appendChild(field("form.fontSize", t("fontSize"), numberInput("form.fontSize", 0, 72)));
        host.appendChild(field("form.fontFamily", t("customFont"), textInput("form.fontFamily")));
        host.appendChild(field("form.color", t("objectColor"), textInput("form.color")));
        host.appendChild(field("form.background", t("fillColor"), textInput("form.background")));
        host.appendChild(field("form.labelColor", t("formLabel"), textInput("form.labelColor")));
    }

    function renderHeader(host) {
        host.appendChild(checkInput("header.allPages", t("chromeAll")));
        host.appendChild(field("header.mode", t("mode"), selectInput("header.mode", [["replace", "replace"], ["theme", "themeMode"], ["hidden", "hidden"]])));
        host.appendChild(field("header.title", t("titleField"), textInput("header.title")));
        host.appendChild(checkInput("header.showTitle", t("showTitle")));
        host.appendChild(checkInput("header.sticky", t("sticky")));
        host.appendChild(checkInput("header.showLogin", t("showLogin")));
        host.appendChild(field("header.loginLabel", t("loginLabel"), textInput("header.loginLabel")));
        host.appendChild(field(pathFor("header.height"), t("headerH"), numberInput("header.height", 48, 140)));
        host.appendChild(field("header.logoUrl", t("logo"), imageInput("header.logoUrl")));
        host.appendChild(field("header.logoAlt", t("logoAlt"), textInput("header.logoAlt")));
        host.appendChild(field("header.logoHeight", t("logoH"), numberInput("header.logoHeight", 16, 96)));
        host.appendChild(h("div", {class: "block-label", text: t("links")}));
        state.theme.header.links = state.theme.header.links || [];
        host.appendChild(linkEditor(state.theme.header.links));
        host.appendChild(h("p", {class: "hint", text: t("customHtml")}));
        host.appendChild(field("header.customHtml", "HTML", area("header.customHtml", 6)));
    }

    function renderHero(host) {
        host.appendChild(checkInput("hero.visible", t("visible")));
        host.appendChild(field("hero.pages", t("pages"), selectInput("hero.pages", [["home", "homeOnly"], ["all", "allPages"]])));
        host.appendChild(field("hero.title", t("heroTitle"), textInput("hero.title")));
        host.appendChild(field("hero.subtitle", t("heroSub"), area("hero.subtitle", 3)));
        host.appendChild(field("hero.align", t("align"), selectInput("hero.align", [["start", "start"], ["center", "center"]])));
        host.appendChild(field(pathFor("hero.height"), t("heroH"), numberInput("hero.height", 0, 640, 10)));
        host.appendChild(field("hero.backgroundImage", t("heroImage"), imageInput("hero.backgroundImage")));
        host.appendChild(field("hero.overlay", t("overlay"), numberInput("hero.overlay", 0, 0.8, 0.05)));
    }

    function renderSearch(host) {
        host.appendChild(checkInput("search.visible", t("visible")));
        host.appendChild(field("search.placeholder", t("placeholder"), textInput("search.placeholder")));
        host.appendChild(field("search.radius", t("radius"), numberInput("search.radius", 0, 999)));
    }

    function renderRequests(host) {
        host.appendChild(field("requests.layout", t("layoutMode"), selectInput("requests.layout", [["grid", "grid"], ["list", "list"]])));
        host.appendChild(field(pathFor("requests.columns"), t("columns"), numberInput("requests.columns", 1, 4)));
        host.appendChild(field("requests.gap", t("gap"), numberInput("requests.gap", 0, 40)));
        host.appendChild(field("requests.cardStyle", t("cardStyle"), selectInput("requests.cardStyle", [["elevated", "elevated"], ["outline", "outline"], ["flat", "flat"]])));
        host.appendChild(field("requests.radius", t("cardRadius"), numberInput("requests.radius", 0, 48)));
        host.appendChild(field("requests.size", t("cardSize"), selectInput("requests.size", [["s", "sizeS"], ["m", "sizeM"], ["l", "sizeL"]])));
        host.appendChild(checkInput("requests.showDescription", t("descriptions")));
        host.appendChild(h("div", {class: "block-label", text: t("cardOrder")}));
        host.appendChild(h("p", {class: "hint", text: t("cardOrderHint")}));
        orderedTypes(catalogTypes()).forEach(function (type) {
            host.appendChild(h("div", {class: "link-row"}, [
                h("span", {text: type.name || type.id}),
                h("button", {type: "button", class: "text-btn", text: t("moveUp"), onclick: function () { moveCard(type.id, -1); }}),
                h("button", {type: "button", class: "text-btn", text: t("moveDown"), onclick: function () { moveCard(type.id, 1); }})
            ]));
        });
    }

    function renderAnnouncement(host) {
        host.appendChild(checkInput("announcement.visible", t("visible")));
        host.appendChild(field("announcement.text", t("text"), area("announcement.text", 3)));
        host.appendChild(field("announcement.tone", t("tone"), selectInput("announcement.tone", [["info", "info"], ["success", "success"], ["warning", "warning"], ["critical", "critical"]])));
    }

    function renderFooter(host) {
        host.appendChild(field("footer.mode", t("mode"), selectInput("footer.mode", [["replace", "replace"], ["theme", "themeMode"], ["hidden", "hidden"]])));
        host.appendChild(field("footer.copyright", t("copyright"), textInput("footer.copyright")));
        host.appendChild(h("div", {class: "block-label", text: t("columnsTitle")}));
        state.theme.footer.columns = state.theme.footer.columns || [];
        state.theme.footer.columns.forEach(function (column, index) {
            var card = h("div", {class: "column-card"});
            var title = h("input", {type: "text", value: column.title || ""});
            title.addEventListener("input", function () {
                remember();
                column.title = title.value;
                markDirty();
                scheduleCompile();
            });
            card.appendChild(title);
            column.links = column.links || [];
            card.appendChild(linkEditor(column.links));
            card.appendChild(h("button", {type: "button", class: "text-btn", text: t("remove"), onclick: function () {
                remember();
                state.theme.footer.columns.splice(index, 1);
                markDirty();
                renderInspector();
                scheduleCompile();
            }}));
            host.appendChild(card);
        });
        host.appendChild(h("button", {type: "button", class: "text-btn", text: t("addColumn"), onclick: function () {
            remember();
            state.theme.footer.columns.push({title: t("newColumn"), links: []});
            markDirty();
            renderInspector();
        }}));
        host.appendChild(h("p", {class: "hint", text: t("customHtml")}));
        host.appendChild(field("footer.customHtml", "HTML", area("footer.customHtml", 6)));
    }

    function renderScreens(host) {
        host.appendChild(h("p", {class: "hint", text: t("deviceHint")}));
        host.appendChild(field("responsive.mobileMax", t("mobileMax"), numberInput("responsive.mobileMax", 360, 900)));
        host.appendChild(field("responsive.tabletMax", t("tabletMax"), numberInput("responsive.tabletMax", 700, 1400)));
        host.appendChild(checkInput("responsive.mobile.showHero", t("showHeroMobile")));
        host.appendChild(checkInput("responsive.mobile.showHeaderTitle", t("showTitleMobile")));
        host.appendChild(checkInput("responsive.tablet.showHero", t("showHeroTablet")));
        host.appendChild(checkInput("responsive.tablet.showHeaderTitle", t("showTitleTablet")));
    }

    function paintContrast() {
        var node = document.getElementById("contrast");
        if (!node || !state.theme) {
            return;
        }
        var bad = contrast(state.theme.colors.headerText, state.theme.colors.headerBg) < 3
            || contrast(state.theme.colors.heroText, state.theme.colors.heroBg) < 3
            || contrast(state.theme.colors.text, state.theme.colors.background) < 3;
        node.textContent = bad ? t("contrast") : "";
        node.className = bad ? "hint" : "";
    }

    function contrast(a, b) {
        function lin(hex) {
            var n = parseInt(String(hex || "#000").slice(1), 16);
            var channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (c) {
                var s = c / 255;
                return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
        }
        var l1 = lin(a);
        var l2 = lin(b);
        var light = Math.max(l1, l2);
        var dark = Math.min(l1, l2);
        return (light + 0.05) / (dark + 0.05);
    }

    function applyPreset(preset) {
        remember();
        var enabled = state.theme.enabled;
        var useGlobal = state.theme.useGlobal;
        state.theme = clone(preset.theme);
        state.theme.enabled = enabled;
        state.theme.useGlobal = useGlobal;
        state.theme.name = preset.label || state.theme.name;
        markDirty();
        renderInspector();
        scheduleCompile();
    }

    function toggleBrowse() {
        state.browse = !state.browse;
        var button = document.getElementById("browse");
        if (button) {
            button.className = state.browse ? "ghost active" : "ghost";
        }
        paintBanner();
    }

    function effectiveEnabled() {
        if (state.portalId !== "global" && state.theme && state.theme.useGlobal && state.globalTheme) {
            return !!state.globalTheme.enabled;
        }
        return !!(state.theme && state.theme.enabled);
    }

    function removeTheme() {
        api("DELETE", "/rest/portal-designer/1.0/admin/theme?portalId=" + encodeURIComponent(state.portalId), null, function (err) {
            if (err) {
                toast(t("saveError"));
                return;
            }
            toast(t("removedTheme"));
            loadPortal(state.portalId);
        });
    }

    function onEnabled(event) {
        var on = event.target.checked;
        if (state.portalId !== "global" && state.theme && state.theme.useGlobal && state.globalTheme) {
            var theme = clone(state.globalTheme);
            theme.enabled = on;
            api("PUT", "/rest/portal-designer/1.0/admin/theme?portalId=global", theme, function (err, data) {
                if (err || !data || !data.theme) {
                    event.target.checked = !on;
                    toast(t("saveError"));
                    return;
                }
                state.globalTheme = data.theme;
                toast(on ? t("designOn") : t("designOff"));
                paintBanner();
            });
            return;
        }
        remember();
        state.theme.enabled = on;
        state.designToggle = on;
        saveTheme();
    }

    function onPortal(event) {
        loadPortal(event.target.value);
    }

    function onManualPortal(event) {
        var value = (event.target.value || "").trim();
        if (value === "global" || /^[0-9]{1,18}$/.test(value)) {
            loadPortal(value);
        }
    }

    function toggleLang() {
        state.lang = state.lang === "ru" ? "en" : "ru";
        localStorage.setItem("pd-lang", state.lang);
        document.documentElement.lang = state.lang;
        document.getElementById("brand-title").textContent = t("title");
        document.getElementById("published-label").textContent = t("published");
        document.getElementById("lang").textContent = t("lang");
        renderSegments();
        renderNav();
        renderInspector();
    }

    function undo() {
        if (!state.past.length) {
            return;
        }
        state.future.push(clone(state.theme));
        state.theme = state.past.pop();
        markDirty();
        renderInspector();
        scheduleCompile();
    }

    function redo() {
        if (!state.future.length) {
            return;
        }
        state.past.push(clone(state.theme));
        state.theme = state.future.pop();
        markDirty();
        renderInspector();
        scheduleCompile();
    }

    function exportTheme() {
        var blob = new Blob([JSON.stringify(state.theme, null, 2)], {type: "application/json"});
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "portal-theme-" + state.portalId + ".json";
        link.click();
    }

    function importTheme() {
        var input = h("input", {type: "file", accept: "application/json"});
        input.addEventListener("change", function () {
            var file = input.files && input.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function () {
                try {
                    var parsed = JSON.parse(reader.result);
                    if (!parsed || typeof parsed !== "object" || !parsed.colors) {
                        toast(t("badFile"));
                        return;
                    }
                    remember();
                    parsed.enabled = state.theme.enabled;
                    state.theme = parsed;
                    markDirty();
                    renderInspector();
                    scheduleCompile();
                    toast(t("imported"));
                } catch (e) {
                    toast(t("badFile"));
                }
            };
            reader.readAsText(file);
        });
        input.click();
    }

    function saveTheme() {
        var button = document.getElementById("save");
        button.textContent = t("saving");
        api("PUT", "/rest/portal-designer/1.0/admin/theme?portalId=" + encodeURIComponent(state.portalId), state.theme, function (err, data) {
            if (err || !data) {
                button.textContent = t("save");
                state.designToggle = null;
                toast(t("saveError"));
                return;
            }
            state.theme = data.theme;
            state.css = data.css;
            state.previewTheme = data.theme;
            state.warnings = data.warnings || [];
            state.dirty = false;
            state.past = [];
            state.future = [];
            button.className = "save";
            button.textContent = t("saved");
            if (state.designToggle != null) {
                toast(state.designToggle ? t("designOn") : t("designOff"));
                state.designToggle = null;
            }
            renderInspector();
            paintPreview();
            setTimeout(function () {
                if (!state.dirty) {
                    button.textContent = t("save");
                }
            }, 1600);
        });
    }

    function resetPortal() {
        api("DELETE", "/rest/portal-designer/1.0/admin/theme?portalId=" + encodeURIComponent(state.portalId), null, function () {
            loadPortal(state.portalId);
        });
    }

    function loadPortal(id) {
        state.portalId = id || "global";
        var manual = document.getElementById("portal-id");
        if (manual) {
            manual.value = state.portalId === "global" ? "" : state.portalId;
        }
        api("GET", "/rest/portal-designer/1.0/admin/theme?portalId=" + encodeURIComponent(state.portalId), null, function (err, data) {
            if (err || !data) {
                toast(t("loadError"));
                return;
            }
            state.globalTheme = data.global;
            if (data.theme) {
                state.theme = data.theme;
            } else {
                var classic = null;
                state.presets.forEach(function (preset) {
                    if (preset.id === "classic") {
                        classic = preset.theme;
                    }
                });
                state.theme = clone(classic || {name: "Черновик", enabled: false});
                ensureShape(state.theme);
                state.theme.enabled = false;
                state.theme.useGlobal = state.portalId !== "global" && !!data.global;
            }
            state.dirty = false;
            state.past = [];
            state.future = [];
            var save = document.getElementById("save");
            if (save) {
                save.className = "save";
                save.textContent = t("save");
            }
            loadRequestTypes();
            renderInspector();
            scheduleCompile();
            if (state.liveFrame && !state.mockFallback) {
                var frame = document.getElementById("preview");
                if (frame) {
                    frame.src = liveSrc();
                }
            }
        });
    }

    function loadRequestTypes() {
        state.requestTypes = [];
        if (!/^[0-9]+$/.test(state.portalId)) {
            var doc = frameDoc();
            if (doc) {
                var box = doc.getElementById("mock-requests");
                if (box) {
                    box.removeAttribute("data-sig");
                }
            }
            paintPreview();
            return;
        }
        api("GET", "/rest/servicedeskapi/servicedesk/" + state.portalId + "/requesttype", null, function (err, data) {
            if (!err && data && data.values) {
                state.requestTypes = data.values.map(function (item) {
                    return {id: item.id, name: item.name, description: item.description || ""};
                });
            }
            var doc = frameDoc();
            if (doc) {
                var box = doc.getElementById("mock-requests");
                if (box) {
                    box.removeAttribute("data-sig");
                }
            }
            paintPreview();
        });
    }

    function loadPortals() {
        api("GET", "/rest/servicedeskapi/servicedesk?limit=100", null, function (err, data) {
            var select = document.getElementById("portal");
            select.innerHTML = "";
            select.appendChild(h("option", {value: "global", text: t("all")}));
            var values = (!err && data && data.values) ? data.values : [];
            state.portals = values;
            var preferred = "global";
            values.forEach(function (portal) {
                var label = (portal.projectName || portal.projectKey || "Portal") + " · #" + portal.id;
                select.appendChild(h("option", {value: String(portal.id), text: label}));
                if (window.PD_PROJECT_KEY && portal.projectKey === window.PD_PROJECT_KEY) {
                    preferred = String(portal.id);
                }
            });
            select.value = preferred;
            loadPortal(preferred);
        });
    }

    function loadPresets(done) {
        api("GET", "/rest/portal-designer/1.0/admin/presets", null, function (err, data) {
            state.presets = (!err && data) ? data : [];
            done();
        });
    }

    document.addEventListener("keydown", function (event) {
        var tag = (event.target.tagName || "").toLowerCase();
        var typing = tag === "input" || tag === "textarea" || event.target.isContentEditable;
        if ((event.ctrlKey || event.metaKey) && (event.key === "s" || event.key === "S")) {
            event.preventDefault();
            saveTheme();
        } else if (!typing && (event.ctrlKey || event.metaKey) && (event.key === "z" || event.key === "Z") && !event.shiftKey) {
            event.preventDefault();
            undo();
        } else if (!typing && (event.ctrlKey || event.metaKey) && ((event.key === "z" && event.shiftKey) || event.key === "y")) {
            event.preventDefault();
            redo();
        }
    });
    window.addEventListener("beforeunload", function (event) {
        if (!state.dirty) {
            return;
        }
        event.preventDefault();
        event.returnValue = "";
    });

    renderShell();
    loadPresets(function () {
        loadPortals();
    });
})();
