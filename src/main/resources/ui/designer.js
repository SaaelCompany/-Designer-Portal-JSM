(function () {
    "use strict";

    var I18N = {
        ru: {
            title: "Конструктор портала",
            subtitle: "Jira Service Management",
            all: "Все порталы",
            portalPh: "ID",
            home: "Главная",
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
            unpublished: "Посетители портала этого не видят, пока стиль не опубликован.",
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
            unpublished: "Visitors will not see this until you publish it.",
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
        page: "home",
        section: "hero",
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
            "<header data-pd-region=\"header\"><span>Jira Service Management</span></header>" +
            "<div id=\"mock-home\"><div class=\"native-search\"><input type=\"search\" placeholder=\"Поиск\"/></div>" +
            "<h2 id=\"mock-group\">Популярные услуги</h2><div id=\"mock-requests\"></div></div>" +
            "<div id=\"mock-login\"><form><h2>Вход</h2><label>Эл. почта<input type=\"email\"/></label>" +
            "<label>Пароль<input type=\"password\"/></label><button type=\"submit\">Войти</button></form></div>" +
            "<div id=\"mock-create\"><form><h2>Новая заявка</h2><label>Тема<input type=\"text\"/></label>" +
            "<label>Описание<textarea rows=\"4\"></textarea></label><button type=\"submit\">Отправить</button></form></div>" +
            "<footer data-pd-region=\"footer\">Jira Service Management</footer>" +
            "<script>window.__PD_MANUAL=true;</script><script src=\"" + js + "\"></script>" +
            "</body></html>";
    }

    function fillCards(doc) {
        var box = doc.getElementById("mock-requests");
        if (!box) {
            return;
        }
        var types = state.requestTypes.length ? state.requestTypes : SAMPLE;
        var sig = state.portalId + ":" + types.map(function (item) { return item.name; }).join("|");
        if (box.getAttribute("data-sig") === sig) {
            return;
        }
        box.setAttribute("data-sig", sig);
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        var portal = state.portalId === "global" ? "1" : state.portalId;
        types.forEach(function (type, index) {
            var link = doc.createElement("a");
            link.href = "#";
            link.setAttribute("data-pd-card", "1");
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
            var node = event.target;
            if (node && node.closest && node.closest("a,button")) {
                event.preventDefault();
            }
            while (node && node !== doc) {
                if (node.getAttribute && node.getAttribute("data-pd-select")) {
                    state.section = node.getAttribute("data-pd-select");
                    renderNav();
                    renderInspector();
                    return;
                }
                node = node.parentNode;
            }
        }, true);
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
            onRender: function (rendered) {
                var bound = rendered.querySelectorAll("[data-pd-bind]");
                for (var i = 0; i < bound.length; i++) {
                    bound[i].setAttribute("contenteditable", "true");
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
        if (!state.theme.enabled) {
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
            fitChrome();
            layoutDevice();
        };
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
                    h("button", {type: "button", class: "ghost", text: t("export"), onclick: exportTheme}),
                    h("label", {class: "publish"}, [
                        h("input", {id: "enabled", type: "checkbox", onchange: onEnabled}),
                        h("span", {id: "published-label", text: t("published")})
                    ]),
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
        fillSeg("pages", [["home", "home"], ["login", "login"], ["create", "create"]], state.page, function (id) {
            state.page = id;
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
        ["theme", "header", "hero", "search", "requests", "announcement", "footer", "screens", "css"].forEach(function (id) {
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
        host.appendChild(h("h2", {text: t(state.section)}));
        if (state.device !== "desktop" && (state.section === "requests" || state.section === "hero" || state.section === "header" || state.section === "theme")) {
            host.appendChild(h("p", {class: "hint", text: t("deviceHint")}));
        }
        if (state.section === "theme") {
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
        var enabled = document.getElementById("enabled");
        if (enabled) {
            enabled.checked = !!state.theme.enabled;
        }
        paintBanner();
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
        host.appendChild(field(pathFor("typography.baseSize"), t("base"), numberInput("typography.baseSize", 13, 22)));
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
        var button = document.getElementById("save");
        button.textContent = t("saving");
        api("PUT", "/rest/portal-designer/1.0/admin/theme?portalId=" + encodeURIComponent(state.portalId), state.theme, function (err, data) {
            if (err || !data) {
                button.textContent = t("save");
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

    renderShell();
    loadPresets(function () {
        loadPortals();
    });
})();
