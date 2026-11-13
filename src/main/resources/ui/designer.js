(function () {
    "use strict";

    var I18N = {
        ru: {
            title: "Конструктор портала",
            subtitle: "Jira Service Management",
            all: "Все порталы",
            portalPh: "ID",
            home: "Главная",
            mine: "Запросы",
            profile: "Профиль",
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
            published: "Опубликовано",
            structure: "Страница",
            style: "Стиль",
            designedPage: "Конструктор",
            originalPortal: "Выключить",
            pluginOff: "Плагин выключен на всех порталах. Посетители видят обычный портал Jira.",
            originalLive: "Сейчас посетители видят обычный портал Jira. Сохраните, чтобы включить страницу конструктора.",
            originalLabel: "Так портал выглядит без плагина: услуги Jira, без собранной страницы.",
            pageHint: "Это состав страницы. Перетащите блок на другой блок, чтобы поменять порядок. На макете кнопка «Переместить» ставит блок в любое место, правый край меняет ширину.",
            place: "Положение и размер",
            freePlace: "Свободное положение",
            placeHint: "Свободный блок можно перетащить куда угодно и сделать шире или уже. Размер шрифта 0 оставляет шрифт страницы.",
            posX: "Слева, %",
            posY: "Сверху, px",
            blockWidth: "Ширина, %",
            blockFont: "Шрифт блока",
            blockSize: "Размер шрифта",
            inheritFont: "Как на странице",
            addText: "Текстовый блок",
            addLinks: "Блок ссылок",
            blockTitle: "Заголовок",
            blockText: "Текст",
            hideBlock: "Скрыть",
            showBlock: "Показать",
            guest: "Гость",
            signedIn: "Вошёл",
            profileHint: "Кнопка входа только у гостя. У вошедшего здесь его имя: профиль, запросы и выход.",
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
            screens: "Экраны",
            css: "Свой CSS",
            presets: "Готовые стили",
            colors: "Цвета",
            type: "Типографика",
            layout: "Сетка",
            unpublished: "Сейчас посетители видят обычный портал Jira. Сохраните, чтобы включить страницу конструктора.",
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
            radius: "Скругление",
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
            showLogin: "Вход или профиль",
            loginLabel: "Текст для гостя",
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
            replaceHint: "Опубликованная страница заменяет список порталов, страницу проекта, мои запросы и профиль. Форма новой заявки и страница входа остаются страницами Jira.",
            cardOrderHint: "Перетащите кнопку на другую кнопку в макете. Так меняется их порядок на вашей странице.",
            keptPage: "Форма входа остаётся страницей Jira. Форма заявки и открытый запрос сохраняют поля Jira, а шапка и подвал берутся из конструктора.",
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
            rightAlign: "Справа",
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
            mine: "Requests",
            profile: "Profile",
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
            published: "Published",
            structure: "Page",
            style: "Style",
            designedPage: "Builder",
            originalPortal: "Turn off",
            pluginOff: "The plugin is off for every portal. Visitors see the standard Jira portal.",
            originalLive: "Visitors currently see the plain Jira portal. Save to turn the constructed page on.",
            originalLabel: "This is the portal without the plugin: Jira's services, with no constructed page.",
            pageHint: "These are the blocks of the page. Drag one onto another to reorder them. On the canvas, Move places a block anywhere and the right edge changes its width.",
            place: "Place and size",
            freePlace: "Free position",
            placeHint: "A free block can be dragged anywhere and made wider or narrower. Font size 0 keeps the page font.",
            posX: "From the left, %",
            posY: "From the top, px",
            blockWidth: "Width, %",
            blockFont: "Block font",
            blockSize: "Font size",
            inheritFont: "Same as the page",
            addText: "Text block",
            addLinks: "Link row",
            blockTitle: "Heading",
            blockText: "Text",
            hideBlock: "Hide",
            showBlock: "Show",
            guest: "Guest",
            signedIn: "Signed in",
            profileHint: "Only a guest sees the login button. A signed-in visitor sees their name, with profile, requests and sign out.",
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
            screens: "Screens",
            css: "Custom CSS",
            presets: "Presets",
            colors: "Colors",
            type: "Type",
            layout: "Layout",
            unpublished: "Visitors currently see the plain Jira portal. Save to turn the constructed page on.",
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
            showLogin: "Login or profile",
            loginLabel: "Label for a guest",
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
            replaceHint: "The published page replaces the portal list, the project page, my requests and the profile. The new-request form and the login page stay Jira pages.",
            cardOrderHint: "Drag one button onto another in the preview. That becomes their order on your page.",
            keptPage: "The login page stays a Jira page. The request form and an open request keep Jira's fields, with the header and footer from the designer.",
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
            rightAlign: "Right",
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
        page: "home",
        section: "page",
        blockId: "header",
        asUser: false,
        pluginActive: true,
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
        frameReady: false
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
        state.revision = (state.revision || 0) + 1;
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
        theme.requests.order = theme.requests.order || [];
        theme.blocks = theme.blocks || [];
        theme.announcement = theme.announcement || {};
        theme.footer = theme.footer || {};
        theme.footer.columns = theme.footer.columns || [];
        theme.responsive = theme.responsive || {};
        theme.responsive.mobile = theme.responsive.mobile || {};
        theme.responsive.tablet = theme.responsive.tablet || {};
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
        device.style.width = Math.round(w * scale + 20) + "px";
        device.style.height = Math.round(availH + 20) + "px";
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
            "<div id=\"pd-source\"></div>" +
            "<script>window.__PD_MANUAL=true;</script><script src=\"" + js + "\"></script>" +
            "</body></html>";
    }

    function fillCards(doc) {
        var box = doc.getElementById("pd-source");
        if (!box) {
            return;
        }
        var types = cardSource();
        var sig = state.portalId + ":" + types.map(function (item) { return item.id + ":" + item.name; }).join("|");
        if (box.getAttribute("data-sig") === sig) {
            return;
        }
        box.setAttribute("data-sig", sig);
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        var portal = /^[0-9]+$/.test(state.portalId) ? state.portalId : "";
        types.forEach(function (type) {
            var link = doc.createElement("a");
            link.href = portal
                ? "/servicedesk/customer/portal/" + portal + "/create/" + type.id
                : "/servicedesk/customer/portal/" + type.id;
            link.appendChild(doc.createTextNode(type.name || ""));
            if (type.description) {
                var note = doc.createElement("p");
                note.textContent = type.description;
                link.appendChild(note);
            }
            box.appendChild(link);
        });
        var cards = doc.getElementById("pd-cards");
        if (cards) {
            cards.removeAttribute("data-pd-sig");
        }
    }

    function armPreview(doc) {
        if (doc.__pdBound) {
            return;
        }
        doc.__pdBound = true;
        doc.addEventListener("click", function (event) {
            var node = event.target;
            if (node && node.closest && node.closest("a,button")) {
                event.preventDefault();
            }
            while (node && node !== doc) {
                if (node.getAttribute && node.getAttribute("data-pd-select")) {
                    var sel = node.getAttribute("data-pd-select");
                    if (sel.indexOf("block:") === 0) {
                        state.blockId = sel.substring(6);
                    } else {
                        state.blockId = sel;
                    }
                    state.section = "block";
                    renderNav();
                    renderInspector();
                    return;
                }
                node = node.parentNode;
            }
        }, true);
        doc.addEventListener("pointerdown", function (event) {
            var handle = event.target.closest ? event.target.closest(".pd-move, .pd-resize") : null;
            if (!handle || !state.theme) {
                return;
            }
            var slot = handle.closest(".pd-slot");
            var page = doc.getElementById("pd-page");
            if (!slot || !page) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            var block = findBlock(slot.getAttribute("data-pd-block"));
            if (!block) {
                return;
            }
            remember();
            var resizing = (" " + handle.className + " ").indexOf(" pd-resize ") >= 0;
            var rect = page.getBoundingClientRect();
            var slotRect = slot.getBoundingClientRect();
            if (!block.free) {
                block.free = true;
                block.x = Math.max(0, Math.min(80, (slotRect.left - rect.left) / rect.width * 100));
                block.y = Math.max(0, slotRect.top - rect.top);
                block.width = Math.max(20, Math.min(100, slotRect.width / rect.width * 100));
            }
            var startX = event.clientX;
            var startY = event.clientY;
            var originX = block.x || 0;
            var originY = block.y || 0;
            var originW = block.width || 100;
            function move(ev) {
                if (resizing) {
                    block.width = Math.max(20, Math.min(100, originW + (ev.clientX - startX) / rect.width * 100));
                } else {
                    block.x = Math.max(0, Math.min(80, originX + (ev.clientX - startX) / rect.width * 100));
                    block.y = Math.max(0, Math.min(2400, originY + (ev.clientY - startY)));
                }
                slot.style.position = "absolute";
                slot.style.left = block.x + "%";
                slot.style.top = block.y + "px";
                slot.style.width = block.width + "%";
                if ((" " + slot.className + " ").indexOf(" pd-free ") < 0) {
                    slot.className += " pd-free";
                }
            }
            function up() {
                doc.removeEventListener("pointermove", move);
                doc.removeEventListener("pointerup", up);
                markDirty();
                scheduleCompile();
            }
            doc.addEventListener("pointermove", move);
            doc.addEventListener("pointerup", up);
        }, true);
        doc.addEventListener("pointerdown", function (event) {
            var tile = event.target.closest ? event.target.closest(".pd-tile") : null;
            if (!tile || !state.theme) {
                return;
            }
            event.preventDefault();
            if (tile.setPointerCapture && event.pointerId != null) {
                try {
                    tile.setPointerCapture(event.pointerId);
                } catch (ignored) {
                    /* capture is optional */
                }
            }
            var startX = event.clientX;
            var startY = event.clientY;
            var moved = false;
            function move(ev) {
                if (Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY) > 6) {
                    moved = true;
                }
            }
            function up(ev) {
                doc.removeEventListener("pointermove", move);
                doc.removeEventListener("pointerup", up);
                if (tile.releasePointerCapture && ev.pointerId != null) {
                    try {
                        tile.releasePointerCapture(ev.pointerId);
                    } catch (ignored) {
                        /* already released */
                    }
                }
                if (!moved) {
                    return;
                }
                var under = doc.elementFromPoint(ev.clientX, ev.clientY);
                var other = under && under.closest ? under.closest(".pd-tile") : null;
                var box = doc.getElementById("pd-cards");
                if (!other || other === tile || !box || other.parentNode !== box) {
                    return;
                }
                remember();
                var mark = doc.createComment("");
                box.insertBefore(mark, tile);
                box.insertBefore(tile, other);
                box.insertBefore(other, mark);
                box.removeChild(mark);
                var ids = [];
                for (var i = 0; i < box.children.length; i++) {
                    var id = box.children[i].getAttribute("data-pd-type");
                    if (id) {
                        ids.push(id);
                    }
                }
                ensureShape(state.theme);
                state.theme.requests.order = ids;
                markDirty();
                scheduleCompile();
            }
            doc.addEventListener("pointermove", move);
            doc.addEventListener("pointerup", up);
        });
        doc.addEventListener("input", function (event) {
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
        fillCards(doc);
        runtime.apply({
            document: doc,
            theme: state.previewTheme,
            css: state.css,
            contextPath: window.PD_CONTEXT || "",
            portalId: state.portalId,
            page: state.page,
            preview: true,
            keptLabel: t("keptPage"),
            original: state.pluginActive === false || !(state.theme && state.theme.enabled),
            catalog: previewCatalog(),
            originalLabel: t("originalLabel"),
            account: state.asUser ? {name: "Анна Ковалева", username: "anna", email: "anna@example.com"} : null,
            accountState: state.asUser ? "ready" : "anonymous",
            requests: [
                {key: "STP-50", summary: "Тест", status: "Ожидание поддержки", href: "#"},
                {key: "STP-47", summary: "Заявка", status: "Ожидание поддержки", href: "#"}
            ],
            onRender: function (rendered) {
                var bound = rendered.querySelectorAll("[data-pd-bind]");
                for (var i = 0; i < bound.length; i++) {
                    bound[i].setAttribute("contenteditable", "true");
                }
                var slots = rendered.querySelectorAll(".pd-slot");
                for (var s = 0; s < slots.length; s++) {
                    if (slots[s].querySelector(".pd-move")) {
                        continue;
                    }
                    var move = rendered.createElement("button");
                    move.type = "button";
                    move.className = "pd-move";
                    move.textContent = t("freePlace");
                    var resize = rendered.createElement("button");
                    resize.type = "button";
                    resize.className = "pd-resize";
                    slots[s].appendChild(move);
                    slots[s].appendChild(resize);
                }
            }
        });
        armPreview(doc);
    }

    function paintBanner() {
        var banner = document.getElementById("banner");
        if (!banner || !state.theme) {
            return;
        }
        var messages = [];
        if (state.pluginActive === false) {
            messages.push(t("pluginOff"));
        } else if (!state.theme.enabled) {
            messages.push(t("unpublished"));
        }
        if (state.portalId !== "global" && state.theme.useGlobal) {
            messages.push(t("inherited"));
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

    function bootFrame() {
        var frame = document.getElementById("preview");
        frame.srcdoc = previewHtml();
        frame.onload = function () {
            state.frameReady = true;
            paintPreview();
            layoutDevice();
        };
    }

    function renderShell() {
        var app = document.getElementById("app");
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
                h("div", {class: "seg", id: "mode"}),
                h("div", {class: "seg", id: "pages"}),
                h("div", {class: "seg", id: "audience"}),
                h("div", {class: "seg", id: "devices"}),
                h("div", {class: "grow"}, [
                    h("button", {type: "button", class: "ghost", text: t("undo"), onclick: undo}),
                    h("button", {type: "button", class: "ghost", text: t("redo"), onclick: redo}),
                    h("button", {type: "button", class: "ghost", id: "lang", text: t("lang"), onclick: toggleLang}),
                    h("button", {type: "button", class: "ghost", text: t("import"), onclick: importTheme}),
                    h("button", {type: "button", class: "ghost", text: t("export"), onclick: exportTheme}),
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
        bootFrame();
        window.addEventListener("resize", layoutDevice);
    }

    function renderSegments() {
        fillSeg("pages", [["home", "home"], ["mine", "mine"], ["profile", "profile"], ["login", "login"], ["create", "create"]], state.page, function (id) {
            state.page = id;
            renderSegments();
            paintPreview();
        });
        fillSeg("mode", [["designed", "designedPage"], ["original", "originalPortal"]], state.pluginActive === false ? "original" : "designed", function (id) {
            setSwitch(id !== "original");
        });
        fillSeg("audience", [["guest", "guest"], ["user", "signedIn"]], state.asUser ? "user" : "guest", function (id) {
            state.asUser = id === "user";
            renderSegments();
            paintPreview();
        });
        fillSeg("devices", [["desktop", "desktop"], ["tablet", "tablet"], ["mobile", "mobile"]], state.device, function (id) {
            state.device = id;
            renderSegments();
            renderInspector();
            layoutDevice();
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
        ["page", "style", "screens", "css"].forEach(function (id) {
            var active = state.section === id || (id === "page" && state.section === "block");
            var label = id === "page" ? "structure" : id;
            host.appendChild(h("button", {
                type: "button",
                class: active ? "active" : "",
                text: t(label),
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

    function renderInspector() {
        var host = document.getElementById("inspector");
        if (!host || !state.theme) {
            return;
        }
        host.innerHTML = "";
        ensureShape(state.theme);
        host.appendChild(h("h2", {text: inspectorTitle()}));
        if (state.device !== "desktop" && (state.section === "style" || state.section === "block")) {
            host.appendChild(h("p", {class: "hint", text: t("deviceHint")}));
        }
        if (state.section === "page") {
            renderPage(host);
        } else if (state.section === "block") {
            renderBlock(host);
        } else if (state.section === "style" || state.section === "theme") {
            renderTheme(host);
        } else if (state.section === "header") {
            renderHeader(host);
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
        renderSegments();
        paintBanner();
    }

    function inspectorTitle() {
        if (state.section === "page") {
            return t("structure");
        }
        if (state.section === "style" || state.section === "theme") {
            return t("style");
        }
        if (state.section === "block") {
            var block = findBlock(state.blockId);
            return block ? blockLabel(block) : t("structure");
        }
        return t(state.section);
    }

    function blockLabel(block) {
        if (block.type === "text" || block.type === "links") {
            return block.title || t(block.type === "text" ? "addText" : "addLinks");
        }
        return t(block.type === "requests" ? "requests" : block.type);
    }

    function defaultBlocks(theme) {
        return [
            {id: "announcement", type: "announcement", visible: !!(theme.announcement && theme.announcement.visible), title: "", text: "", links: []},
            {id: "header", type: "header", visible: !theme.header || theme.header.mode !== "hidden", title: "", text: "", links: []},
            {id: "hero", type: "hero", visible: !theme.hero || theme.hero.visible !== false, title: "", text: "", links: []},
            {id: "search", type: "search", visible: !theme.search || theme.search.visible !== false, title: "", text: "", links: []},
            {id: "requests", type: "requests", visible: true, title: "", text: "", links: []},
            {id: "footer", type: "footer", visible: !theme.footer || theme.footer.mode !== "hidden", title: "", text: "", links: []}
        ];
    }

    function materializeBlocks() {
        ensureShape(state.theme);
        if (!state.theme.blocks.length) {
            state.theme.blocks = defaultBlocks(state.theme);
        }
    }

    function findBlock(id) {
        materializeBlocks();
        var list = state.theme.blocks;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return list[i];
            }
        }
        return null;
    }

    function blockIsShown(block) {
        if (!block || block.visible === false) {
            return false;
        }
        if (block.type === "header") {
            return state.theme.header.mode !== "hidden";
        }
        if (block.type === "footer") {
            return state.theme.footer.mode !== "hidden";
        }
        if (block.type === "hero") {
            return state.theme.hero.visible !== false;
        }
        if (block.type === "search") {
            return state.theme.search.visible !== false;
        }
        if (block.type === "announcement") {
            return !!state.theme.announcement.visible;
        }
        return true;
    }

    function setBlockShown(block, shown) {
        block.visible = shown;
        if (block.type === "header") {
            state.theme.header.mode = shown ? "replace" : "hidden";
        } else if (block.type === "footer") {
            state.theme.footer.mode = shown ? "replace" : "hidden";
        } else if (block.type === "hero") {
            state.theme.hero.visible = shown;
        } else if (block.type === "search") {
            state.theme.search.visible = shown;
        } else if (block.type === "announcement") {
            state.theme.announcement.visible = shown;
        }
    }

    function renderPage(host) {
        host.appendChild(h("p", {class: "hint", text: t("pageHint")}));
        materializeBlocks();
        var list = h("div", {class: "outline"});
        state.theme.blocks.forEach(function (block) {
            var row = h("div", {class: "outline-item" + (state.blockId === block.id ? " active" : "") + (blockIsShown(block) ? "" : " off")});
            row.draggable = true;
            row.addEventListener("dragstart", function (event) {
                event.dataTransfer.setData("text/plain", block.id);
                event.dataTransfer.effectAllowed = "move";
            });
            row.addEventListener("dragover", function (event) {
                event.preventDefault();
            });
            row.addEventListener("drop", function (event) {
                event.preventDefault();
                moveBlock(event.dataTransfer.getData("text/plain"), block.id);
            });
            row.appendChild(h("button", {type: "button", class: "name", text: blockLabel(block), onclick: function () {
                state.blockId = block.id;
                state.section = "block";
                renderNav();
                renderInspector();
            }}));
            row.appendChild(h("button", {type: "button", class: "mini", text: blockIsShown(block) ? t("hideBlock") : t("showBlock"), onclick: function () {
                remember();
                materializeBlocks();
                setBlockShown(block, !blockIsShown(block));
                markDirty();
                renderInspector();
                scheduleCompile();
            }}));
            if (block.type === "text" || block.type === "links") {
                row.appendChild(h("button", {type: "button", class: "mini", text: "×", onclick: function () {
                    remember();
                    state.theme.blocks = state.theme.blocks.filter(function (item) { return item.id !== block.id; });
                    state.section = "page";
                    markDirty();
                    renderInspector();
                    scheduleCompile();
                }}));
            }
            list.appendChild(row);
        });
        host.appendChild(list);
        host.appendChild(h("button", {type: "button", class: "text-btn", text: t("addText"), onclick: function () { addBlock("text"); }}));
        host.appendChild(h("button", {type: "button", class: "text-btn", text: t("addLinks"), onclick: function () { addBlock("links"); }}));
    }

    function moveBlock(fromId, toId) {
        if (!fromId || fromId === toId) {
            return;
        }
        remember();
        materializeBlocks();
        var list = state.theme.blocks;
        var from = -1;
        var to = -1;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === fromId) {
                from = i;
            }
            if (list[i].id === toId) {
                to = i;
            }
        }
        if (from < 0 || to < 0) {
            return;
        }
        var item = list.splice(from, 1)[0];
        list.splice(to, 0, item);
        markDirty();
        renderInspector();
        scheduleCompile();
    }

    function addBlock(type) {
        remember();
        materializeBlocks();
        var id = "b" + Math.random().toString(36).slice(2, 8);
        state.theme.blocks.push({
            id: id,
            type: type,
            visible: true,
            title: type === "text" ? t("addText") : t("addLinks"),
            text: "",
            links: type === "links" ? [{label: t("newLink"), href: "/"}] : []
        });
        state.blockId = id;
        state.section = "block";
        markDirty();
        renderNav();
        renderInspector();
        scheduleCompile();
    }

    function renderBlock(host) {
        var block = findBlock(state.blockId);
        if (!block) {
            renderPage(host);
            return;
        }
        if (block.type === "header") {
            host.appendChild(h("p", {class: "hint", text: t("profileHint")}));
            renderHeader(host);
        } else if (block.type === "hero") {
            renderHero(host);
        } else if (block.type === "search") {
            renderSearch(host);
        } else if (block.type === "requests") {
            renderRequests(host);
        } else if (block.type === "announcement") {
            renderAnnouncement(host);
        } else if (block.type === "footer") {
            renderFooter(host);
        } else if (block.type === "text") {
            host.appendChild(plainField(block, "title", t("blockTitle")));
            host.appendChild(plainArea(block, "text", t("blockText")));
        } else if (block.type === "links") {
            host.appendChild(plainField(block, "title", t("blockTitle")));
            block.links = block.links || [];
            host.appendChild(linkEditor(block.links));
        }
        host.appendChild(placeControls(block));
    }

    function placeControls(block) {
        if (!block.width) {
            block.width = 100;
        }
        var box = h("div");
        box.appendChild(h("div", {class: "block-label", text: t("place")}));
        box.appendChild(h("p", {class: "hint", text: t("placeHint")}));
        var free = h("input", {type: "checkbox", checked: !!block.free});
        free.addEventListener("change", function () {
            remember();
            block.free = free.checked;
            if (block.free && !block.width) {
                block.width = 80;
            }
            markDirty();
            renderInspector();
            scheduleCompile();
        });
        box.appendChild(h("label", {class: "check"}, [free, document.createTextNode(t("freePlace"))]));
        if (block.free) {
            box.appendChild(blockNumber(block, "x", t("posX"), 0, 80));
            box.appendChild(blockNumber(block, "y", t("posY"), 0, 2400));
            box.appendChild(blockNumber(block, "width", t("blockWidth"), 20, 100));
        }
        box.appendChild(blockNumber(block, "fontSize", t("blockSize"), 0, 96));
        box.appendChild(blockChoice(block, "font", t("blockFont"), [
            ["", "inheritFont"], ["system", "system"], ["serif", "serif"], ["humanist", "humanist"], ["condensed", "condensed"], ["mono", "mono"]
        ]));
        box.appendChild(blockChoice(block, "align", t("align"), [
            ["", "inheritFont"], ["left", "start"], ["center", "center"], ["right", "rightAlign"]
        ]));
        return box;
    }

    function blockNumber(block, key, label, min, max) {
        var input = h("input", {type: "number", min: String(min), max: String(max), step: "1", value: block[key] || 0});
        input.addEventListener("change", function () {
            remember();
            var value = Number(input.value);
            if (isNaN(value)) {
                value = 0;
            }
            block[key] = Math.max(min, Math.min(max, value));
            input.value = String(block[key]);
            markDirty();
            scheduleCompile();
        });
        return field(key, label, input);
    }

    function blockChoice(block, key, label, options) {
        var input = h("select");
        options.forEach(function (option) {
            var node = h("option", {value: option[0], text: t(option[1])});
            if ((block[key] || "") === option[0]) {
                node.selected = true;
            }
            input.appendChild(node);
        });
        input.addEventListener("change", function () {
            remember();
            block[key] = input.value;
            markDirty();
            scheduleCompile();
        });
        return field(key, label, input);
    }

    function plainField(block, key, label) {
        var input = h("input", {type: "text", value: block[key] || ""});
        input.addEventListener("input", function () {
            remember();
            block[key] = input.value;
            markDirty();
            scheduleCompile();
        });
        return field(key, label, input);
    }

    function plainArea(block, key, label) {
        var input = h("textarea", {rows: 4, value: block[key] || ""});
        input.addEventListener("input", function () {
            remember();
            block[key] = input.value;
            markDirty();
            scheduleCompile();
        });
        return field(key, label, input);
    }

    function cardSource() {
        if (/^[0-9]+$/.test(state.portalId)) {
            return state.requestTypes.length ? state.requestTypes : SAMPLE;
        }
        if (state.portals.length) {
            return state.portals.map(function (portal) {
                return {id: portal.id, name: portal.projectName || portal.projectKey || "", description: ""};
            });
        }
        return SAMPLE;
    }

    function previewCatalog() {
        var portal = /^[0-9]+$/.test(state.portalId) ? state.portalId : "";
        return cardSource().map(function (item) {
            return {
                id: String(item.id),
                name: item.name || "",
                description: item.description || "",
                href: portal
                    ? "/servicedesk/customer/portal/" + portal + "/create/" + item.id
                    : "/servicedesk/customer/portal/" + item.id
            };
        });
    }

    function setSwitch(active) {
        if (state.pluginActive === active && (!active || !state.theme || state.theme.enabled)) {
            paintPreview();
            return;
        }
        var previous = state.pluginActive;
        var previousEnabled = state.theme ? state.theme.enabled : false;
        state.pluginActive = active;
        if (active && state.theme && !state.theme.enabled) {
            remember();
            state.theme.enabled = true;
            markDirty();
        }
        renderSegments();
        paintPreview();
        paintBanner();
        api("PUT", "/rest/portal-designer/1.0/admin/switch", {active: active}, function (err) {
            if (err) {
                state.pluginActive = previous;
                if (state.theme) {
                    state.theme.enabled = previousEnabled;
                }
                toast(t("saveError"));
                renderSegments();
                paintPreview();
                paintBanner();
            }
        });
    }

    function loadSwitch(done) {
        api("GET", "/rest/portal-designer/1.0/admin/switch", null, function (err, data) {
            state.pluginActive = !(data && data.active === false);
            if (done) {
                done();
            }
        });
    }

    function renderTheme(host) {
        host.appendChild(h("p", {class: "hint", text: t("replaceHint")}));
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
        host.appendChild(field(pathFor("typography.baseSize"), t("base"), numberInput("typography.baseSize", 12, 48)));
        host.appendChild(field("typography.headingWeight", t("weight"), selectInput("typography.headingWeight", [
            ["400", "400"], ["500", "500"], ["600", "600"], ["700", "700"], ["800", "800"]
        ])));
        host.appendChild(field("typography.lineHeight", t("line"), numberInput("typography.lineHeight", 1.15, 1.9, 0.05)));
        host.appendChild(h("div", {class: "block-label", text: t("layout")}));
        host.appendChild(field("layout.contentWidth", t("width"), numberInput("layout.contentWidth", 640, 1440, 10)));
        host.appendChild(field("layout.radius", t("radius"), numberInput("layout.radius", 0, 32)));
        host.appendChild(field("layout.shadow", t("shadow"), selectInput("layout.shadow", [["none", "none"], ["soft", "soft"], ["strong", "strong"]])));
        host.appendChild(field(pathFor("layout.pagePadding"), t("pad"), numberInput("layout.pagePadding", 0, 64)));
        host.appendChild(field("layout.backgroundImage", t("pageImage"), textInput("layout.backgroundImage")));
    }

    function renderHeader(host) {
        host.appendChild(field("header.mode", t("mode"), selectInput("header.mode", [["replace", "replace"], ["theme", "themeMode"], ["hidden", "hidden"]])));
        host.appendChild(field("header.title", t("titleField"), textInput("header.title")));
        host.appendChild(checkInput("header.showTitle", t("showTitle")));
        host.appendChild(checkInput("header.sticky", t("sticky")));
        host.appendChild(checkInput("header.showLogin", t("showLogin")));
        host.appendChild(field("header.loginLabel", t("loginLabel"), textInput("header.loginLabel")));
        host.appendChild(field(pathFor("header.height"), t("headerH"), numberInput("header.height", 48, 140)));
        host.appendChild(field("header.logoUrl", t("logo"), textInput("header.logoUrl")));
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
        host.appendChild(field("hero.backgroundImage", t("heroImage"), textInput("hero.backgroundImage")));
        host.appendChild(field("hero.overlay", t("overlay"), numberInput("hero.overlay", 0, 0.8, 0.05)));
    }

    function renderSearch(host) {
        host.appendChild(checkInput("search.visible", t("visible")));
        host.appendChild(field("search.placeholder", t("placeholder"), textInput("search.placeholder")));
        host.appendChild(field("search.radius", t("radius"), numberInput("search.radius", 0, 999)));
    }

    function renderRequests(host) {
        host.appendChild(h("p", {class: "hint", text: t("cardOrderHint")}));
        host.appendChild(field("requests.layout", t("layoutMode"), selectInput("requests.layout", [["grid", "grid"], ["list", "list"]])));
        host.appendChild(field(pathFor("requests.columns"), t("columns"), numberInput("requests.columns", 1, 4)));
        host.appendChild(field("requests.gap", t("gap"), numberInput("requests.gap", 0, 40)));
        host.appendChild(field("requests.cardStyle", t("cardStyle"), selectInput("requests.cardStyle", [["elevated", "elevated"], ["outline", "outline"], ["flat", "flat"]])));
        host.appendChild(checkInput("requests.showDescription", t("descriptions")));
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

    function onEnabled(event) {
        remember();
        state.theme.enabled = event.target.checked;
        markDirty();
        scheduleCompile();
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
        if (state.pluginActive !== false && state.theme) {
            state.theme.enabled = true;
        }
        var button = document.getElementById("save");
        var onError = state.afterSaveError;
        var revision = state.revision || 0;
        state.afterSaveError = null;
        button.textContent = t("saving");
        api("PUT", "/rest/portal-designer/1.0/admin/theme?portalId=" + encodeURIComponent(state.portalId), state.theme, function (err, data) {
            if ((state.revision || 0) !== revision) {
                button.textContent = t("save");
                return;
            }
            if (err || !data) {
                button.textContent = t("save");
                toast(t("saveError"));
                if (onError) {
                    onError();
                }
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

    if (document.getElementById("header")) {
        document.documentElement.className += " pd-embedded";
    }
    renderShell();
    loadPresets(function () {
        loadSwitch(function () {
            loadPortals();
        });
    });
})();
