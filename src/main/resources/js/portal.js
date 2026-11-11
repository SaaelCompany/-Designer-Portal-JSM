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
            return "portals";
        }
        if (/\/servicedesk\/customer\/portal\/\d+$/.test(clean)) {
            return "project";
        }
        if (/\/login$/.test(clean)) {
            return "login";
        }
        if (/\/portal\/\d+\/create\/\d+$/.test(clean)) {
            return "create";
        }
        if (/\/user\/requests(?:\/|$)/.test(clean) || /\/portal\/\d+\/[A-Z][A-Z0-9]*-\d+$/.test(clean)) {
            return "requests";
        }
        if (/\/user\/profile(?:\/|$)/.test(clean)) {
            return "profile";
        }
        return "other";
    }

    function samePage(rulePage, page) {
        if (!rulePage || rulePage === "all") {
            return true;
        }
        if (rulePage === "home" && (page === "project" || page === "portals" || page === "home")) {
            return true;
        }
        if (rulePage === "project" && page === "home") {
            return true;
        }
        return rulePage === page;
    }

    function surface(page) {
        return page === "home" || page === "project" || page === "portals";
    }

    function fullChrome(theme, page) {
        if (page === "create" || page === "login") {
            return false;
        }
        if (surface(page)) {
            return true;
        }
        return !!((theme && theme.header && theme.header.allPages));
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
            if (el.id === "pd-chrome" || el.id === "pd-footer" || el.id === "pd-widgets" || el.id === "pd-editor-layer") {
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
            return page !== "login" && page !== "create";
        }
        return surface(page);
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
        setAttr(node, "data-pd-canvas", "announcement");
        node.setAttribute("data-pd-bind", "announcement.text");
        if (node.textContent !== announcement.text) {
            node.textContent = announcement.text;
        }
    }

    function renderHeader(doc, parent, theme, ctx) {
        var header = doc.getElementById("pd-header");
        var editing = doc.activeElement && parent.contains && parent.contains(doc.activeElement);
        var person = viewer(doc);
        var sig = signature(theme) + "|" + (person.signed ? (person.name || "in") : "out");
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
        header.setAttribute("data-pd-canvas", "header");
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
            if (person.signed) {
                if (person.name) {
                    var account = el(doc, "a", "pd-login", person.name);
                    account.href = profileHref(ctx);
                    nav.appendChild(account);
                }
            } else if (model.showLogin !== false) {
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
        hero.setAttribute("data-pd-canvas", "hero");
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
        footer.setAttribute("data-pd-canvas", "footer");
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

    function canvasHere(key, page) {
        if (key.indexOf("field-") === 0) {
            return page === "create";
        }
        if (key === "portal-menu") {
            return page === "portals";
        }
        if (key === "project-menu") {
            return page === "project" || page === "create";
        }
        return surface(page);
    }

    function menuSpot(theme, key, device) {
        var menu = key === "portal-menu" ? theme.portalMenu : theme.projectMenu;
        if (!menu) {
            return null;
        }
        return menu[device] || menu.desktop || null;
    }

    function menuHref(href, ctx) {
        var value = href || "";
        var base = ctx.contextPath || "";
        var portal = ctx.portalId && ctx.portalId !== "global" ? base + "/servicedesk/customer/portal/" + ctx.portalId : base + "/servicedesk/customer/portals";
        if (value === "{portal}") {
            return portal;
        }
        if (value === "{portals}") {
            return base + "/servicedesk/customer/portals";
        }
        if (value === "{requests}") {
            return base + "/servicedesk/customer/user/requests";
        }
        if (value === "{login}") {
            return loginHref(ctx);
        }
        if (value === "{profile}") {
            return profileHref(ctx);
        }
        return resolveHref(value, ctx.contextPath);
    }

    function metaContent(doc, name) {
        var node = doc.querySelector ? doc.querySelector('meta[name="' + name + '"]') : null;
        return node ? String(node.getAttribute("content") || "").replace(/^\s+|\s+$/g, "") : "";
    }

    function viewer(doc) {
        var name = metaContent(doc, "ajs-remote-user-fullname") || metaContent(doc, "ajs-remote-user");
        var logout = false;
        var links = doc.getElementsByTagName ? doc.getElementsByTagName("a") : [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (inChrome(link) || (link.className && String(link.className).indexOf("pd-") >= 0)) {
                continue;
            }
            var href = link.getAttribute("href") || "";
            if (/logout/i.test(href)) {
                logout = true;
            }
            if (!name && /\/user\/profile(?:\/|$|\?)/.test(href)) {
                name = String(link.getAttribute("aria-label") || link.textContent || "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
            }
        }
        if (name.length > 48) {
            name = name.substring(0, 48);
        }
        return {signed: !!(name || logout), name: name};
    }

    function profileHref(ctx) {
        return (ctx.contextPath || "") + "/servicedesk/customer/user/profile";
    }

    function renderOneMenu(doc, menu, id, canvasKey, ctx) {
        var node = doc.getElementById(id);
        if (!menu || menu.mode === "hidden") {
            if (node && node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return;
        }
        if (menu.mode !== "replace") {
            if (node && node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return;
        }
        if (!node) {
            node = el(doc, "nav");
            node.id = id;
            doc.body.insertBefore(node, doc.body.firstChild);
        }
        node.className = "pd-menu" + (menu.direction === "column" ? " pd-menu-column" : "");
        node.setAttribute("data-pd-canvas", canvasKey);
        node.setAttribute("data-pd-select", canvasKey);
        node.style.color = menu.color || "";
        node.style.background = menu.background || "";
        node.style.fontFamily = menu.fontFamily || "";
        node.style.fontSize = menu.fontSize > 0 ? menu.fontSize + "px" : "";
        node.style.gap = (menu.gap || 0) + "px";
        node.style.borderRadius = (menu.radius || 0) + "px";
        if (doc.activeElement && node.contains && node.contains(doc.activeElement)) {
            return;
        }
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        var items = menu.items || [];
        var person = viewer(doc);
        for (var i = 0; i < items.length; i++) {
            var href = items[i].href || "";
            var label = items[i].label || "";
            if (href === "{login}" && person.signed) {
                href = "{profile}";
                label = person.name || label;
                if (!person.name) {
                    continue;
                }
            }
            var link = el(doc, "a", "pd-menu-link", label);
            link.href = menuHref(href, ctx);
            link.style.borderRadius = (menu.radius || 0) + "px";
            node.appendChild(link);
        }
    }

    function renderMenus(doc, theme, ctx, page) {
        renderOneMenu(doc, page === "portals" ? theme.portalMenu : null, "pd-menu-portal", "portal-menu", ctx);
        renderOneMenu(doc, page === "project" || page === "create" ? theme.projectMenu : null, "pd-menu-project", "project-menu", ctx);
    }

    function hideNativeMenus(doc, theme, page) {
        var menu = page === "portals" ? theme.portalMenu : (page === "project" || page === "create" ? theme.projectMenu : null);
        var hide = menu && (menu.mode === "replace" || menu.mode === "hidden");
        var navs = doc.getElementsByTagName("nav");
        for (var i = 0; i < navs.length; i++) {
            if (navs[i].id === "pd-menu-portal" || navs[i].id === "pd-menu-project" || inChrome(navs[i])) {
                continue;
            }
            if (hide) {
                navs[i].setAttribute("data-pd-menu-hidden", "1");
            } else {
                navs[i].removeAttribute("data-pd-menu-hidden");
                if (menu && menu.mode === "theme") {
                    navs[i].style.color = menu.color || "";
                    navs[i].style.background = menu.background || "";
                    navs[i].style.fontFamily = menu.fontFamily || "";
                    navs[i].style.fontSize = menu.fontSize > 0 ? menu.fontSize + "px" : "";
                    navs[i].style.borderRadius = (menu.radius || 0) + "px";
                    navs[i].style.gap = (menu.gap || 0) + "px";
                }
            }
        }
    }

    function fieldKey(control) {
        var name = control.getAttribute("name") || control.id || "";
        name = String(name).replace(/[^A-Za-z0-9_-]/g, "");
        if (name) {
            return "field-" + name.substring(0, 32);
        }
        var type = (control.getAttribute("type") || control.tagName || "field").toLowerCase();
        return "field-" + type.substring(0, 32);
    }

    function markFields(doc, theme) {
        var form = theme.form || {};
        var forms = doc.getElementsByTagName("form");
        for (var f = 0; f < forms.length; f++) {
            if (inChrome(forms[f])) {
                continue;
            }
            var controls = forms[f].querySelectorAll ? forms[f].querySelectorAll("input, textarea, select, button") : [];
            for (var c = 0; c < controls.length; c++) {
                var control = controls[c];
                if ((control.getAttribute("type") || "").toLowerCase() === "hidden") {
                    continue;
                }
                var row = control.parentNode && control.parentNode.tagName === "LABEL" ? control.parentNode : control;
                row.setAttribute("data-pd-field", "1");
                row.setAttribute("data-pd-canvas", fieldKey(control));
                if (form.gap >= 0) {
                    row.style.marginBottom = form.gap + "px";
                }
                if (form.labelColor && row.tagName === "LABEL") {
                    row.style.color = form.labelColor;
                }
                if (form.fontFamily) {
                    row.style.fontFamily = form.fontFamily;
                }
                if (form.fontSize > 0) {
                    row.style.fontSize = form.fontSize + "px";
                }
                if (form.radius >= 0) {
                    control.style.borderRadius = form.radius + "px";
                }
                if (form.color) {
                    control.style.color = form.color;
                }
                if (form.background) {
                    control.style.background = form.background;
                }
            }
        }
    }

    function renderChrome(doc, theme, ctx, page) {
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
        renderMenus(doc, theme, ctx, page);
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
            if (surface(page) && (type === "search" || /search|поиск/i.test(placeholder) || /search/i.test(String(className)))) {
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
        if (surface(page)) {
            markCards(doc);
            if (theme.requests && theme.requests.order) {
                orderCards(requestsRegion(doc), theme.requests.order);
            }
        }
        hideNativeMenus(doc, theme, page);
        if (page === "create") {
            markFields(doc, theme);
        }
        if (page === "login") {
            var forms = doc.getElementsByTagName("form");
            if (forms.length && forms[0].parentNode) {
                setAttr(forms[0].parentNode, "data-pd-region", "login");
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

    function requestsRegion(doc) {
        var nodes = doc.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].getAttribute && nodes[i].getAttribute("data-pd-region") === "requests") {
                return nodes[i];
            }
        }
        return null;
    }

    function orderCards(parent, order) {
        if (!parent || !order || !order.length) {
            return;
        }
        var rank = {};
        for (var i = 0; i < order.length; i++) {
            rank[String(order[i])] = i;
        }
        var cards = [];
        var children = parent.children;
        for (var c = 0; c < children.length; c++) {
            if (children[c].getAttribute && children[c].getAttribute("data-pd-card") === "1") {
                cards.push(children[c]);
            }
        }
        cards.sort(function (a, b) {
            var ia = rank[cardId(a)];
            var ib = rank[cardId(b)];
            if (ia == null) {
                ia = 1000;
            }
            if (ib == null) {
                ib = 1000;
            }
            return ia - ib;
        });
        for (var n = 0; n < cards.length; n++) {
            parent.appendChild(cards[n]);
        }
    }

    function regionByName(doc, name) {
        var nodes = doc.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].getAttribute && nodes[i].getAttribute("data-pd-region") === name) {
                return nodes[i];
            }
        }
        return null;
    }

    function tagCanvas(doc) {
        var headerMode = doc.documentElement.getAttribute("data-pd-header-mode");
        var footerMode = doc.documentElement.getAttribute("data-pd-footer-mode");
        var designedHeader = doc.getElementById("pd-header");
        if (designedHeader) {
            if (headerMode === "theme") {
                designedHeader.removeAttribute("data-pd-canvas");
            } else {
                designedHeader.setAttribute("data-pd-canvas", "header");
            }
        }
        var designedFooter = doc.getElementById("pd-footer");
        if (designedFooter) {
            if (footerMode === "theme") {
                designedFooter.removeAttribute("data-pd-canvas");
            } else {
                designedFooter.setAttribute("data-pd-canvas", "footer");
            }
        }
        var headers = doc.getElementsByTagName("header");
        for (var h = 0; h < headers.length; h++) {
            if (headers[h].id === "pd-header" || headers[h].getAttribute("data-pd-region") !== "header") {
                continue;
            }
            if (headerMode === "theme") {
                headers[h].setAttribute("data-pd-canvas", "header");
            } else {
                headers[h].removeAttribute("data-pd-canvas");
            }
        }
        var footers = doc.getElementsByTagName("footer");
        for (var f = 0; f < footers.length; f++) {
            if (footers[f].id === "pd-footer" || footers[f].getAttribute("data-pd-region") !== "footer") {
                continue;
            }
            if (footerMode === "theme") {
                footers[f].setAttribute("data-pd-canvas", "footer");
            } else {
                footers[f].removeAttribute("data-pd-canvas");
            }
        }
        var search = regionByName(doc, "search");
        if (search) {
            search.setAttribute("data-pd-canvas", "search");
        }
        var requests = requestsRegion(doc);
        if (requests) {
            requests.setAttribute("data-pd-canvas", "requests");
        }
        var cards = doc.querySelectorAll ? doc.querySelectorAll("[data-pd-card]") : [];
        for (var c = 0; c < cards.length; c++) {
            var id = cardId(cards[c]);
            if (id) {
                cards[c].setAttribute("data-pd-canvas", "card-" + id);
            }
        }
        var login = regionByName(doc, "login");
        if (login) {
            login.setAttribute("data-pd-canvas", "login");
        }
        var form = regionByName(doc, "form");
        if (form) {
            form.setAttribute("data-pd-canvas", "form");
        }
    }

    function deviceOf(theme, options, doc) {
        if (options.device === "desktop" || options.device === "tablet" || options.device === "mobile") {
            return options.device;
        }
        var view = doc.defaultView || window;
        var width = view.innerWidth || 1200;
        var responsive = theme.responsive || {};
        var mobileMax = responsive.mobileMax || 760;
        var tabletMax = responsive.tabletMax || 1100;
        if (width <= mobileMax) {
            return "mobile";
        }
        if (width <= tabletMax) {
            return "tablet";
        }
        return "desktop";
    }

    function spotFor(theme, key, device) {
        var canvas = theme.canvas || {};
        if (key.indexOf("widget-") === 0) {
            var id = key.substring(7);
            var widgets = canvas.widgets || [];
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i].id === id) {
                    return widgets[i][device] || widgets[i].desktop || null;
                }
            }
            return null;
        }
        var screen = canvas[device] || {};
        return screen[key] || null;
    }

    function anyFree(theme, device, page) {
        var canvas = theme.canvas || {};
        if (surface(page) || page === "create") {
            var screen = canvas[device] || {};
            for (var key in screen) {
                if (!screen.hasOwnProperty(key) || !screen[key] || !screen[key].free) {
                    continue;
                }
                if (page === "create" && key.indexOf("field-") !== 0) {
                    continue;
                }
                if (surface(page) && key.indexOf("field-") === 0) {
                    continue;
                }
                return true;
            }
        }
        var portalSpot = menuSpot(theme, "portal-menu", device);
        if (page === "portals" && portalSpot && portalSpot.free && !portalSpot.hidden) {
            return true;
        }
        var projectSpot = menuSpot(theme, "project-menu", device);
        if ((page === "project" || page === "create") && projectSpot && projectSpot.free && !projectSpot.hidden) {
            return true;
        }
        var widgets = canvas.widgets || [];
        for (var i = 0; i < widgets.length; i++) {
            if (!samePage(widgets[i].page || "home", page)) {
                continue;
            }
            var spot = widgets[i][device] || widgets[i].desktop;
            if (spot && spot.free && !spot.hidden) {
                return true;
            }
        }
        var elements = theme.elements || [];
        for (var e = 0; e < elements.length; e++) {
            if (!samePage(elements[e].page, page)) {
                continue;
            }
            var placed = elements[e][device] || elements[e].desktop;
            if (placed && placed.free && !placed.hidden) {
                return true;
            }
        }
        return false;
    }

    function place(el, spot) {
        if (!el) {
            return;
        }
        if (spot && spot.hidden) {
            el.setAttribute("data-pd-hidden", "1");
        } else {
            el.removeAttribute("data-pd-hidden");
        }
        if (!spot || !spot.free) {
            el.removeAttribute("data-pd-free");
            el.style.left = "";
            el.style.top = "";
            el.style.width = "";
            el.style.height = "";
            el.style.position = "";
            el.style.margin = "";
            el.style.zIndex = "";
            return;
        }
        el.setAttribute("data-pd-free", "1");
        el.style.position = "relative";
        el.style.zIndex = "6";
        el.style.boxSizing = "border-box";
        var hasOrigin = !!(spot.hasOrigin || typeof spot.originX === "number");
        var originX = hasOrigin ? spot.originX : spot.x;
        var originY = hasOrigin ? spot.originY : spot.y;
        el.style.left = Math.round((spot.x || 0) - (originX || 0)) + "px";
        el.style.top = Math.round((spot.y || 0) - (originY || 0)) + "px";
        el.style.width = spot.w > 0 ? spot.w + "px" : "";
        el.style.height = spot.h > 0 ? spot.h + "px" : "";
    }

    function placeCanvas(doc, theme, device, page) {
        removeClass(doc.documentElement, "pd-free");
        var nodes = doc.querySelectorAll ? doc.querySelectorAll("[data-pd-canvas]") : [];
        for (var i = 0; i < nodes.length; i++) {
            var key = nodes[i].getAttribute("data-pd-canvas");
            if (!key || key.indexOf("widget-") === 0 || key.indexOf("el-") === 0) {
                continue;
            }
            if (!canvasHere(key, page)) {
                place(nodes[i], null);
                continue;
            }
            var laid = key === "portal-menu" || key === "project-menu" ? menuSpot(theme, key, device) : spotFor(theme, key, device);
            place(nodes[i], laid);
        }
        var widgets = (theme.canvas && theme.canvas.widgets) || [];
        for (var w = 0; w < widgets.length; w++) {
            var widget = widgets[w];
            var node = doc.getElementById("pd-widget-" + widget.id);
            if (!node) {
                continue;
            }
            if (!samePage(widget.page || "home", page)) {
                node.setAttribute("data-pd-hidden", "1");
                continue;
            }
            node.removeAttribute("data-pd-hidden");
            place(node, widget[device] || widget.desktop);
            if ((widget.type || "") === "tooltip") {
                bindTip(doc, node, widget.target);
            }
        }
    }

    function paintLook(el, look) {
        if (!el || !look) {
            return;
        }
        el.setAttribute("data-pd-target", el.getAttribute("data-pd-target") || "1");
        el.style.color = look.color || "";
        el.style.backgroundColor = look.background || "";
        el.style.fontFamily = look.fontFamily || "";
        el.style.fontSize = look.fontSize > 0 ? look.fontSize + "px" : "";
        el.style.fontWeight = look.fontWeight > 0 ? String(look.fontWeight) : "";
        el.style.borderRadius = look.radius >= 0 ? look.radius + "px" : "";
        el.style.padding = look.padding >= 0 ? look.padding + "px" : "";
        el.style.width = look.width > 0 ? look.width + "px" : "";
        el.style.height = look.height > 0 ? look.height + "px" : "";
    }

    function ownedNode(node) {
        return !!(node && node.id && node.id.indexOf("pd-") === 0);
    }

    function findOwned(doc, selector) {
        if (!selector || !doc || !doc.body) {
            return [];
        }
        if (selector.charAt(0) === "#" || selector.indexOf(":nth-of-type(") < 0) {
            try {
                return doc.querySelectorAll(selector);
            } catch (e) {
                return [];
            }
        }
        var steps = selector.split(/\s*>\s*/);
        var level = [doc.body];
        for (var s = 0; s < steps.length; s++) {
            var match = /^([a-z][a-z0-9]*):nth-of-type\((\d+)\)$/.exec(steps[s]);
            if (!match) {
                return [];
            }
            var tag = match[1].toUpperCase();
            var want = parseInt(match[2], 10);
            var next = [];
            for (var i = 0; i < level.length; i++) {
                var children = level[i].children || [];
                var seen = 0;
                for (var c = 0; c < children.length; c++) {
                    var child = children[c];
                    if (ownedNode(child) || child.tagName !== tag) {
                        continue;
                    }
                    seen++;
                    if (seen === want) {
                        next.push(child);
                        break;
                    }
                }
            }
            level = next;
            if (!level.length) {
                return [];
            }
        }
        return level;
    }

    function applyElements(doc, theme, device, page) {
        var list = theme.elements || [];
        for (var i = 0; i < list.length; i++) {
            var rule = list[i];
            if (!rule || !rule.selector || !samePage(rule.page, page)) {
                continue;
            }
            var found = findOwned(doc, rule.selector);
            if (!found || !found.length) {
                continue;
            }
            var spot = rule[device] || rule.desktop;
            var alone = found.length === 1;
            for (var n = 0; n < found.length; n++) {
                found[n].setAttribute("data-pd-target", rule.id);
                found[n].setAttribute("data-pd-canvas", "el-" + rule.id);
                paintLook(found[n], rule.look || {});
                if (alone && spot && (spot.free || spot.hidden)) {
                    place(found[n], spot);
                }
            }
        }
    }

    function bindTip(doc, node, target) {
        if (!target || node.getAttribute("data-pd-tip-bound") === target) {
            return;
        }
        var matches = findOwned(doc, target);
        var found = matches && matches.length ? matches[0] : null;
        if (!found) {
            return;
        }
        node.setAttribute("data-pd-tip-bound", target);
        var show = function () { addClass(node, "pd-tip-open"); };
        var hide = function () { removeClass(node, "pd-tip-open"); };
        found.addEventListener("mouseenter", show);
        found.addEventListener("mouseleave", hide);
        found.addEventListener("focusin", show);
        found.addEventListener("focusout", hide);
    }

    function widgetSig(widget) {
        return [widget.type, widget.text, widget.href, widget.imageUrl, widget.html].join("\n");
    }

    function fillWidget(doc, node, widget, ctx) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        var type = widget.type || "text";
        if (type === "image") {
            if (widget.imageUrl) {
                var image = doc.createElement("img");
                image.src = widget.imageUrl;
                image.alt = widget.text || "";
                node.appendChild(image);
            }
            return;
        }
        if (type === "button") {
            var link = el(doc, "a", "pd-widget-button", widget.text || "");
            link.href = resolveHref(widget.href, ctx.contextPath);
            node.appendChild(link);
            return;
        }
        if (type === "html") {
            node.innerHTML = widget.html || "";
            return;
        }
        if (type === "tooltip") {
            node.className = "pd-widget pd-tip";
            var mark = el(doc, "button", "pd-tip-mark", "?");
            mark.setAttribute("type", "button");
            mark.setAttribute("aria-label", widget.text || "");
            var bubble = el(doc, "span", "pd-tip-bubble", widget.text || "");
            bubble.setAttribute("role", "tooltip");
            node.appendChild(mark);
            node.appendChild(bubble);
            return;
        }
        var text = el(doc, "div", "pd-widget-text", widget.text || "");
        text.setAttribute("data-pd-widget-field", "text");
        node.appendChild(text);
    }

    function renderWidgets(doc, theme, ctx) {
        var widgets = (theme.canvas && theme.canvas.widgets) || [];
        var root = doc.getElementById("pd-widgets");
        if (!widgets.length) {
            if (root && root.parentNode) {
                root.parentNode.removeChild(root);
            }
            return;
        }
        if (!root) {
            root = el(doc, "div");
            root.id = "pd-widgets";
            if (doc.body) {
                doc.body.appendChild(root);
            }
        }
        var seen = {};
        for (var i = 0; i < widgets.length; i++) {
            var widget = widgets[i];
            if (!widget || !widget.id) {
                continue;
            }
            seen[widget.id] = true;
            var node = doc.getElementById("pd-widget-" + widget.id);
            if (!node) {
                node = el(doc, "div", "pd-widget");
                node.id = "pd-widget-" + widget.id;
                root.appendChild(node);
            }
            node.setAttribute("data-pd-canvas", "widget-" + widget.id);
            node.setAttribute("data-pd-select", "canvas");
            node.setAttribute("data-pd-widget", widget.id);
            node.setAttribute("data-pd-type", widget.type || "text");
            if (doc.activeElement && node.contains && node.contains(doc.activeElement)) {
                continue;
            }
            var sig = widgetSig(widget);
            if (node.getAttribute("data-pd-sig") === sig && node.firstChild) {
                continue;
            }
            node.setAttribute("data-pd-sig", sig);
            fillWidget(doc, node, widget, ctx);
        }
        var children = root.children;
        for (var c = children.length - 1; c >= 0; c--) {
            var id = children[c].getAttribute("data-pd-widget");
            if (!seen[id]) {
                root.removeChild(children[c]);
            }
        }
    }

    function cardId(node) {
        var typed = node.getAttribute("data-pd-type");
        if (typed) {
            return String(typed);
        }
        var href = node.getAttribute("href") || "";
        var match = href.match(/\/create\/(\d+)/);
        return match ? match[1] : "";
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
        setAttr(html, "data-pd-card-size", (theme.requests && theme.requests.size) || "m");
        setAttr(html, "data-pd-desc", theme.requests && theme.requests.showDescription === false ? "off" : "on");
        setAttr(html, "data-pd-align", (theme.hero && theme.hero.align) || "center");
        setAttr(html, "data-pd-hero", showHero(theme, page) ? "on" : "off");
        var structural = fullChrome(theme, page);
        setAttr(html, "data-pd-page", page);
        setAttr(html, "data-pd-chrome", structural ? "full" : "quiet");
        var formLook = theme.form || {};
        if (formLook.radius >= 0) {
            html.style.setProperty("--pd-field-radius", formLook.radius + "px");
            setAttr(html, "data-pd-field-radius", "set");
        } else {
            html.style.removeProperty("--pd-field-radius");
            html.removeAttribute("data-pd-field-radius");
        }
        if (options.css != null) {
            ensureStyle(doc, options.css);
        }
        clearTouched(doc);
        renderChrome(doc, theme, ctx, page);
        markRegions(doc, theme, page);
        renderWidgets(doc, theme, ctx);
        tagCanvas(doc);
        var device = deviceOf(theme, options, doc);
        placeCanvas(doc, theme, device, page);
        applyElements(doc, theme, device, page);
        if (typeof options.onRender === "function") {
            options.onRender(doc);
        }
    }

    function clearTouched(doc) {
        if (!doc.querySelectorAll) {
            return;
        }
        var nodes = doc.querySelectorAll("[data-pd-region], [data-pd-canvas], [data-pd-card], [data-pd-free], [data-pd-hidden], [data-pd-target], [data-pd-desc]");
        var props = ["position", "left", "top", "width", "height", "margin", "zIndex", "color", "backgroundColor", "fontSize", "fontWeight", "fontFamily", "borderRadius", "padding"];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.id === "pd-header" || node.id === "pd-hero" || node.id === "pd-footer" || node.id === "pd-announcement" || node.id === "pd-editor-layer" || node.id === "pd-menu-portal" || node.id === "pd-menu-project") {
                continue;
            }
            if (node.id && node.id.indexOf("pd-widget-") === 0) {
                continue;
            }
            node.removeAttribute("data-pd-region");
            node.removeAttribute("data-pd-canvas");
            node.removeAttribute("data-pd-card");
            node.removeAttribute("data-pd-free");
            node.removeAttribute("data-pd-hidden");
            node.removeAttribute("data-pd-target");
            node.removeAttribute("data-pd-select");
            node.removeAttribute("data-pd-desc");
            // data-pd-id stays: it is the only handle that still finds this exact object after a redraw.
            for (var p = 0; p < props.length; p++) {
                node.style[props[p]] = "";
            }
        }
    }

    function teardown(doc) {
        var html = doc.documentElement;
        clearTouched(doc);
        removeClass(html, "pd-active");
        html.removeAttribute("data-pd-header-mode");
        html.removeAttribute("data-pd-footer-mode");
        html.removeAttribute("data-pd-sticky");
        html.removeAttribute("data-pd-search");
        html.removeAttribute("data-pd-layout");
        html.removeAttribute("data-pd-shadow");
        html.removeAttribute("data-pd-cards");
        html.removeAttribute("data-pd-card-size");
        html.removeAttribute("data-pd-desc");
        html.removeAttribute("data-pd-align");
        html.removeAttribute("data-pd-hero");
        html.removeAttribute("data-pd-page");
        html.removeAttribute("data-pd-chrome");
        html.removeAttribute("data-pd-field-radius");
        html.style.removeProperty("--pd-field-radius");
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
        var portalMenu = doc.getElementById("pd-menu-portal");
        if (portalMenu && portalMenu.parentNode) {
            portalMenu.parentNode.removeChild(portalMenu);
        }
        var projectMenu = doc.getElementById("pd-menu-project");
        if (projectMenu && projectMenu.parentNode) {
            projectMenu.parentNode.removeChild(projectMenu);
        }
        var widgets = doc.getElementById("pd-widgets");
        if (widgets && widgets.parentNode) {
            widgets.parentNode.removeChild(widgets);
        }
        removeClass(html, "pd-free");
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
        if (/[?&]pdPreview=1(?:&|$)/.test(window.location.search || "")) {
            window.__PD_PREVIEW = true;
            window.__PD_BOOTED = true;
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
        window.addEventListener("resize", schedule);
    }

    window.PortalDesigner = {
        apply: apply,
        boot: boot,
        pageKind: pageKind,
        portalIdFromPath: portalIdFromPath,
        teardown: teardown,
        place: place
    };

    if (!window.__PD_MANUAL) {
        onReady(boot);
    }
})(window, document);
