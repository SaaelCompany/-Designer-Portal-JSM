/* Portal Designer runtime. The editor preview calls PortalDesigner.apply; the live portal boots itself. */
(function (window, document) {
    "use strict";

    var STYLE_ID = "pd-generated-style";

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    function detectContext() {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].getAttribute("src") || "";
            var at = src.indexOf("/download/resources/");
            if (at > 0 && src.indexOf("portal.js") >= 0) {
                return src.substring(0, at);
            }
        }
        var meta = document.querySelector("meta[name='ajs-context-path']");
        if (meta && meta.getAttribute("content")) {
            return meta.getAttribute("content");
        }
        if (window.AJS && typeof window.AJS.contextPath === "function") {
            return window.AJS.contextPath() || "";
        }
        return "";
    }

    function portalIdFromPath(path) {
        var match = /\/servicedesk\/customer\/portal\/(\d+)/.exec(path || "");
        return match ? match[1] : "global";
    }

    function pageKind(path) {
        var clean = String(path || "").split("?")[0].replace(/\/+$/, "");
        if (/\/servicedesk\/customer\/portals$/.test(clean)) {
            return "home";
        }
        if (/\/servicedesk\/customer\/portal\/\d+$/.test(clean)) {
            return "home";
        }
        if (/\/login$/.test(clean)) {
            return "login";
        }
        if (/\/portal\/\d+\/create\/\d+$/.test(clean)) {
            return "create";
        }
        return "other";
    }

    function addClass(el, name) {
        if (!el.className) {
            el.className = name;
            return;
        }
        if ((" " + el.className + " ").indexOf(" " + name + " ") < 0) {
            el.className += " " + name;
        }
    }

    function removeClass(el, name) {
        el.className = (" " + (el.className || "") + " ").replace(" " + name + " ", " ").replace(/^\s+|\s+$/g, "");
    }

    function setAttr(el, name, value) {
        if (el.getAttribute(name) !== value) {
            el.setAttribute(name, value);
        }
    }

    function inChrome(el) {
        while (el) {
            if (el.id === "pd-chrome" || el.id === "pd-footer") {
                return true;
            }
            el = el.parentNode;
        }
        return false;
    }

    function el(doc, tag, className, text) {
        var node = doc.createElement(tag);
        if (className) {
            node.className = className;
        }
        if (text != null && text !== "") {
            node.appendChild(doc.createTextNode(text));
        }
        return node;
    }

    function resolveHref(href, contextPath) {
        if (!href) {
            return "#";
        }
        if (/^(https?:|mailto:|#)/i.test(href)) {
            return href;
        }
        if (href.charAt(0) === "/") {
            return (contextPath || "") + href;
        }
        return href;
    }

    function homeHref(ctx) {
        var base = ctx.contextPath || "";
        if (ctx.portalId && ctx.portalId !== "global") {
            return base + "/servicedesk/customer/portal/" + ctx.portalId;
        }
        return base + "/servicedesk/customer/portals";
    }

    function loginHref(ctx) {
        var base = ctx.contextPath || "";
        if (ctx.portalId && ctx.portalId !== "global") {
            return base + "/servicedesk/customer/portal/" + ctx.portalId + "/user/login";
        }
        return base + "/servicedesk/customer/user/login";
    }

    function showHero(theme, page) {
        if (!theme.hero || !theme.hero.visible) {
            return false;
        }
        if (theme.hero.pages === "all") {
            return page !== "login";
        }
        return page === "home";
    }

    function signature(theme) {
        try {
            return JSON.stringify({
                header: theme.header,
                hero: theme.hero,
                footer: theme.footer,
                announcement: theme.announcement
            });
        } catch (e) {
            return "";
        }
    }

    function ensureStyle(doc, css) {
        var head = doc.head || doc.getElementsByTagName("head")[0];
        if (!head) {
            return;
        }
        var style = doc.getElementById(STYLE_ID);
        if (!style) {
            style = doc.createElement("style");
            style.id = STYLE_ID;
            head.appendChild(style);
        }
        if (style.textContent !== css) {
            style.textContent = css || "";
        }
    }

    function renderAnnouncement(doc, parent, theme) {
        var node = doc.getElementById("pd-announcement");
        var announcement = theme.announcement || {};
        if (!announcement.visible || !announcement.text) {
            if (node && node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return;
        }
        if (!node) {
            node = el(doc, "div");
            node.id = "pd-announcement";
            parent.insertBefore(node, parent.firstChild);
        }
        setAttr(node, "data-pd-tone", announcement.tone || "info");
        setAttr(node, "data-pd-select", "announcement");
        node.setAttribute("data-pd-bind", "announcement.text");
        if (node.textContent !== announcement.text) {
            node.textContent = announcement.text;
        }
    }

    function renderHeader(doc, parent, theme, ctx) {
        var header = doc.getElementById("pd-header");
        var editing = doc.activeElement && parent.contains && parent.contains(doc.activeElement);
        var sig = signature(theme);
        if (header && header.getAttribute("data-pd-sig") === sig) {
            return;
        }
        if (editing) {
            return;
        }
        if (header && header.parentNode) {
            header.parentNode.removeChild(header);
        }
        header = el(doc, "header");
        header.id = "pd-header";
        header.setAttribute("data-pd-sig", sig);
        header.setAttribute("data-pd-select", "header");
        var model = theme.header || {};
        if (model.customHtml) {
            header.innerHTML = model.customHtml;
        } else {
            var inner = el(doc, "div", "pd-header-inner");
            var brand = el(doc, "a", "pd-brand");
            brand.href = homeHref(ctx);
            if (model.logoUrl) {
                var img = doc.createElement("img");
                img.src = model.logoUrl;
                img.alt = model.logoAlt || "";
                img.style.height = (model.logoHeight || 36) + "px";
                brand.appendChild(img);
            } else {
                var letter = (model.title || "P").charAt(0).toUpperCase();
                brand.appendChild(el(doc, "span", "pd-mark", letter));
            }
            if (model.showTitle !== false) {
                var title = el(doc, "span", "pd-brand-title", model.title || "");
                title.setAttribute("data-pd-bind", "header.title");
                brand.appendChild(title);
            }
            inner.appendChild(brand);
            var nav = el(doc, "nav", "pd-header-links");
            var links = model.links || [];
            for (var i = 0; i < links.length; i++) {
                var link = el(doc, "a", null, links[i].label || "");
                link.href = resolveHref(links[i].href, ctx.contextPath);
                nav.appendChild(link);
            }
            if (model.showLogin !== false) {
                var login = el(doc, "a", "pd-login", model.loginLabel || "Войти");
                login.href = loginHref(ctx);
                nav.appendChild(login);
            }
            inner.appendChild(nav);
            header.appendChild(inner);
        }
        var hero = doc.getElementById("pd-hero");
        if (hero && hero.parentNode === parent) {
            parent.insertBefore(header, hero);
        } else {
            parent.appendChild(header);
        }
    }

    function renderHero(doc, parent, theme) {
        var hero = doc.getElementById("pd-hero");
        var model = theme.hero || {};
        if (!hero) {
            hero = el(doc, "section");
            hero.id = "pd-hero";
            parent.appendChild(hero);
        }
        hero.setAttribute("data-pd-select", "hero");
        var heroSig = (model.title || "") + "\n" + (model.subtitle || "");
        if (hero.getAttribute("data-pd-text") === heroSig && hero.firstChild) {
            return;
        }
        if (doc.activeElement && hero.contains && hero.contains(doc.activeElement)) {
            return;
        }
        hero.setAttribute("data-pd-text", heroSig);
        while (hero.firstChild) {
            hero.removeChild(hero.firstChild);
        }
        var overlay = el(doc, "div", "pd-hero-overlay");
        var inner = el(doc, "div", "pd-hero-inner");
        var title = el(doc, "h1", null, model.title || "");
        title.id = "pd-hero-title";
        title.setAttribute("data-pd-bind", "hero.title");
        var sub = el(doc, "p", null, model.subtitle || "");
        sub.id = "pd-hero-sub";
        sub.setAttribute("data-pd-bind", "hero.subtitle");
        inner.appendChild(title);
        inner.appendChild(sub);
        hero.appendChild(overlay);
        hero.appendChild(inner);
    }

    function renderFooter(doc, theme, ctx) {
        var footer = doc.getElementById("pd-footer");
        if (!footer) {
            footer = el(doc, "footer");
            footer.id = "pd-footer";
            doc.body.appendChild(footer);
        }
        footer.setAttribute("data-pd-select", "footer");
        var footerSig = signature(theme);
        if (footer.getAttribute("data-pd-sig") === footerSig && footer.firstChild) {
            return;
        }
        if (doc.activeElement && footer.contains && footer.contains(doc.activeElement)) {
            return;
        }
        footer.setAttribute("data-pd-sig", footerSig);
        while (footer.firstChild) {
            footer.removeChild(footer.firstChild);
        }
        var model = theme.footer || {};
        if (model.customHtml) {
            var custom = el(doc, "div", "pd-custom-html pd-footer-inner");
            custom.innerHTML = model.customHtml;
            footer.appendChild(custom);
            return;
        }
        var inner = el(doc, "div", "pd-footer-inner");
        var cols = el(doc, "div", "pd-footer-cols");
        var columns = model.columns || [];
        for (var i = 0; i < columns.length; i++) {
            var column = el(doc, "div");
            column.appendChild(el(doc, "h3", null, columns[i].title || ""));
            var links = columns[i].links || [];
            for (var j = 0; j < links.length; j++) {
                var link = el(doc, "a", null, links[j].label || "");
                link.href = resolveHref(links[j].href, ctx.contextPath);
                column.appendChild(link);
            }
            cols.appendChild(column);
        }
        inner.appendChild(cols);
        var copy = el(doc, "div", "pd-copy", model.copyright || "");
        copy.id = "pd-copy";
        copy.setAttribute("data-pd-bind", "footer.copyright");
        inner.appendChild(copy);
        footer.appendChild(inner);
    }

    function renderChrome(doc, theme, ctx) {
        if (!doc.body) {
            return;
        }
        var chrome = doc.getElementById("pd-chrome");
        if (!chrome) {
            chrome = el(doc, "div");
            chrome.id = "pd-chrome";
            doc.body.insertBefore(chrome, doc.body.firstChild);
        }
        renderAnnouncement(doc, chrome, theme);
        renderHeader(doc, chrome, theme, ctx);
        renderHero(doc, chrome, theme);
        renderFooter(doc, theme, ctx);
    }

    function markRegions(doc, theme, page) {
        var headers = doc.getElementsByTagName("header");
        for (var h = 0; h < headers.length; h++) {
            if (headers[h].id === "pd-header" || inChrome(headers[h])) {
                continue;
            }
            setAttr(headers[h], "data-pd-region", "header");
            break;
        }
        var inputs = doc.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (inChrome(input)) {
                continue;
            }
            var type = (input.getAttribute("type") || "").toLowerCase();
            var placeholder = input.getAttribute("placeholder") || "";
            var className = input.className || "";
            if (type === "search" || /search|поиск/i.test(placeholder) || /search/i.test(String(className))) {
                if (input.parentNode && !inChrome(input.parentNode)) {
                    setAttr(input.parentNode, "data-pd-region", "search");
                    setAttr(input.parentNode, "data-pd-select", "search");
                }
                if (theme.search && theme.search.placeholder && input.getAttribute("placeholder") !== theme.search.placeholder) {
                    input.setAttribute("placeholder", theme.search.placeholder);
                }
                break;
            }
        }
        var footers = doc.getElementsByTagName("footer");
        for (var f = 0; f < footers.length; f++) {
            if (footers[f].id === "pd-footer") {
                continue;
            }
            setAttr(footers[f], "data-pd-region", "footer");
        }
        var headings = doc.getElementsByTagName("h1");
        for (var t = 0; t < headings.length; t++) {
            if (!inChrome(headings[t]) && headings[t].id !== "pd-hero-title") {
                setAttr(headings[t], "data-pd-region", "native-title");
            }
        }
        markCards(doc);
        if (page === "login" || page === "create") {
            var forms = doc.getElementsByTagName("form");
            if (forms.length && forms[0].parentNode) {
                setAttr(forms[0].parentNode, "data-pd-region", page === "login" ? "login" : "form");
            }
        }
    }

    function markCards(doc) {
        var links = doc.getElementsByTagName("a");
        var groups = [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (inChrome(link)) {
                continue;
            }
            var href = (link.getAttribute("href") || "").split("?")[0];
            if (!/\/servicedesk\/customer\/portal\/\d+(\/create\/\d+)?\/?$/.test(href)) {
                continue;
            }
            var parent = link.parentNode;
            if (!parent || parent.tagName === "NAV" || parent.tagName === "HEADER" || parent.tagName === "OL") {
                continue;
            }
            var found = null;
            for (var g = 0; g < groups.length; g++) {
                if (groups[g].parent === parent) {
                    found = groups[g];
                    break;
                }
            }
            if (!found) {
                found = {parent: parent, count: 0};
                groups.push(found);
            }
            found.count++;
            link.setAttribute("data-pd-card", "1");
            var described = link.getElementsByTagName("p");
            if (described.length) {
                described[0].setAttribute("data-pd-desc", "1");
            }
        }
        var best = null;
        for (var k = 0; k < groups.length; k++) {
            if (!best || groups[k].count > best.count) {
                best = groups[k];
            }
        }
        if (best) {
            best.parent.setAttribute("data-pd-region", "requests");
            best.parent.setAttribute("data-pd-select", "requests");
        }
    }

    function apply(options) {
        options = options || {};
        var doc = options.document || document;
        var theme = options.theme;
        if (!doc.documentElement || !theme) {
            return;
        }
        var html = doc.documentElement;
        var page = options.page || pageKind(window.location.pathname);
        var ctx = {
            contextPath: options.contextPath || "",
            portalId: options.portalId || "global"
        };
        addClass(html, "pd-active");
        setAttr(html, "data-pd-header-mode", (theme.header && theme.header.mode) || "replace");
        setAttr(html, "data-pd-footer-mode", (theme.footer && theme.footer.mode) || "replace");
        setAttr(html, "data-pd-sticky", theme.header && theme.header.sticky === false ? "0" : "1");
        setAttr(html, "data-pd-search", theme.search && theme.search.visible === false ? "off" : "on");
        setAttr(html, "data-pd-layout", (theme.requests && theme.requests.layout) || "grid");
        setAttr(html, "data-pd-shadow", (theme.layout && theme.layout.shadow) || "soft");
        setAttr(html, "data-pd-cards", (theme.requests && theme.requests.cardStyle) || "elevated");
        setAttr(html, "data-pd-desc", theme.requests && theme.requests.showDescription === false ? "off" : "on");
        setAttr(html, "data-pd-align", (theme.hero && theme.hero.align) || "center");
        setAttr(html, "data-pd-hero", showHero(theme, page) ? "on" : "off");
        setAttr(html, "data-pd-page", page);
        if (options.css != null) {
            ensureStyle(doc, options.css);
        }
        renderChrome(doc, theme, ctx);
        markRegions(doc, theme, page);
        if (typeof options.onRender === "function") {
            options.onRender(doc);
        }
    }

    function teardown(doc) {
        var html = doc.documentElement;
        removeClass(html, "pd-active");
        var style = doc.getElementById(STYLE_ID);
        if (style && style.parentNode) {
            style.parentNode.removeChild(style);
        }
        var chrome = doc.getElementById("pd-chrome");
        if (chrome && chrome.parentNode) {
            chrome.parentNode.removeChild(chrome);
        }
        var footer = doc.getElementById("pd-footer");
        if (footer && footer.parentNode) {
            footer.parentNode.removeChild(footer);
        }
    }

    function getJson(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    cb(null, JSON.parse(xhr.responseText));
                } catch (e) {
                    cb(e);
                }
            } else {
                cb(new Error("HTTP " + xhr.status));
            }
        };
        xhr.send(null);
    }

    function boot() {
        if (window.__PD_BOOTED) {
            return;
        }
        window.__PD_BOOTED = true;
        var contextPath = detectContext();
        var currentId = null;
        var current = null;
        var suppress = 0;
        var timer = 0;

        function paint(data, id) {
            suppress++;
            try {
                if (!data || !data.enabled || !data.theme) {
                    current = null;
                    teardown(document);
                    return;
                }
                current = data;
                apply({
                    document: document,
                    theme: data.theme,
                    css: data.css,
                    contextPath: contextPath,
                    portalId: id,
                    page: pageKind(window.location.pathname)
                });
            } catch (e) {
                if (window.console && console.warn) {
                    console.warn("Portal Designer skipped a render", e);
                }
            }
            window.setTimeout(function () {
                suppress = Math.max(0, suppress - 1);
            }, 0);
        }

        function load(force) {
            var id = portalIdFromPath(window.location.pathname);
            if (!force && current && currentId === id) {
                paint(current, id);
                return;
            }
            currentId = id;
            getJson(contextPath + "/rest/portal-designer/1.0/public-theme?portalId=" + encodeURIComponent(id), function (err, data) {
                if (err) {
                    return;
                }
                paint(data, id);
            });
        }

        function schedule() {
            if (suppress > 0) {
                return;
            }
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                load(false);
            }, 60);
        }

        load(true);
        if (window.MutationObserver && document.body) {
            var observer = new MutationObserver(schedule);
            observer.observe(document.body, {childList: true, subtree: true});
        }
        var push = history.pushState;
        var replace = history.replaceState;
        history.pushState = function () {
            var result = push.apply(history, arguments);
            load(false);
            return result;
        };
        history.replaceState = function () {
            var result = replace.apply(history, arguments);
            load(false);
            return result;
        };
        window.addEventListener("popstate", function () {
            load(false);
        });
    }

    window.PortalDesigner = {
        apply: apply,
        boot: boot,
        pageKind: pageKind,
        portalIdFromPath: portalIdFromPath,
        teardown: teardown
    };

    if (!window.__PD_MANUAL) {
        onReady(boot);
    }
})(window, document);
