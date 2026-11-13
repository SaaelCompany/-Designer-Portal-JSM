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
        if (/\/user\/requests\/?$/.test(clean)) {
            return "mine";
        }
        if (/\/user\/profile\/?$/.test(clean)) {
            return "profile";
        }
        if (/\/login$/.test(clean)) {
            return "login";
        }
        if (/\/create\/-?\d+/.test(clean)) {
            return "create";
        }
        if (/\/[A-Za-z][A-Za-z0-9_]*-\d+$/.test(clean) || /\/request\/[^/]+$/.test(clean)) {
            return "request";
        }
        if (clean.indexOf("/servicedesk/customer/") >= 0) {
            return "shell";
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
            parent.appendChild(node);
        } else if (node.parentNode !== parent) {
            parent.appendChild(node);
        }
        setAttr(node, "data-pd-tone", announcement.tone || "info");
        setAttr(node, "data-pd-select", "announcement");
        node.setAttribute("data-pd-bind", "announcement.text");
        if (node.textContent !== announcement.text) {
            node.textContent = announcement.text;
        }
    }

    function readVisitor(doc) {
        var user = "";
        var name = "";
        var logoutHref = "";
        var requestsHref = "";
        var meta = doc.querySelector ? doc.querySelector("meta[name='ajs-remote-user']") : null;
        if (meta) {
            user = meta.getAttribute("content") || "";
        }
        var full = doc.querySelector ? doc.querySelector("meta[name='ajs-remote-user-fullname']") : null;
        if (full) {
            name = full.getAttribute("content") || "";
        }
        var named = doc.getElementById("header-details-user-fullname");
        if (named && !owned(named)) {
            var label = String(named.textContent || "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
            if (label) {
                name = label;
                user = user || label;
            }
        }
        var links = doc.getElementsByTagName ? doc.getElementsByTagName("a") : [];
        for (var i = 0; i < links.length; i++) {
            if (owned(links[i])) {
                continue;
            }
            var href = links[i].getAttribute("href") || "";
            if (/logout|Logout\.jspa/i.test(href)) {
                logoutHref = href;
                if (!user && !name) {
                    user = "signed-in";
                    name = "Профиль";
                }
            } else if (/\/user\/requests/.test(href)) {
                requestsHref = href;
            }
        }
        if (!user && !name) {
            return null;
        }
        return {
            username: user,
            name: name || user,
            avatar: "",
            logoutHref: logoutHref,
            requestsHref: requestsHref
        };
    }

    function accountNode(doc, theme, ctx, account) {
        var base = ctx.contextPath || "";
        if (ctx.accountState === "pending") {
            return el(doc, "span", "pd-account-wait");
        }
        if (account && (account.name || account.username)) {
            var box = el(doc, "div", "pd-account");
            var button = el(doc, "button", "pd-account-btn");
            button.type = "button";
            if (account.avatar) {
                var img = doc.createElement("img");
                img.src = account.avatar;
                img.alt = "";
                button.appendChild(img);
            } else {
                button.appendChild(el(doc, "span", "pd-account-mark", (account.name || account.username).charAt(0).toUpperCase()));
            }
            button.appendChild(el(doc, "span", "pd-account-name", account.name || account.username));
            var menu = el(doc, "div", "pd-account-menu");
            var profile = el(doc, "a", null, "Профиль");
            profile.href = account.profileHref || (base + "/servicedesk/customer/user/profile");
            var requests = el(doc, "a", null, "Мои запросы");
            requests.href = account.requestsHref || (base + "/servicedesk/customer/user/requests");
            var logout = el(doc, "a", null, "Выйти");
            logout.href = account.logoutHref || (base + "/logout");
            menu.appendChild(profile);
            menu.appendChild(requests);
            menu.appendChild(logout);
            button.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                if ((" " + menu.className + " ").indexOf(" open ") >= 0) {
                    removeClass(menu, "open");
                } else {
                    addClass(menu, "open");
                }
            });
            if (!doc.__pdAccountDoc) {
                doc.__pdAccountDoc = true;
                doc.addEventListener("click", function (event) {
                    var menus = doc.getElementsByClassName("pd-account-menu");
                    for (var i = 0; i < menus.length; i++) {
                        var owner = menus[i].parentNode;
                        if (owner && !owner.contains(event.target)) {
                            removeClass(menus[i], "open");
                        }
                    }
                });
            }
            box.appendChild(button);
            box.appendChild(menu);
            return box;
        }
        var model = theme.header || {};
        var login = el(doc, "a", "pd-login", model.loginLabel || "Войти");
        login.href = loginHref(ctx);
        return login;
    }

    function renderHeader(doc, parent, theme, ctx, account) {
        var header = doc.getElementById("pd-header");
        var editing = doc.activeElement && parent.contains && parent.contains(doc.activeElement);
        var who = account ? ((account.name || "") + "|" + (account.avatar || "") + "|" + (account.email || "")) : "";
        var sig = signature(theme) + "\n" + who + "\n" + (ctx.accountState || "");
        if (header && header.parentNode !== parent) {
            parent.appendChild(header);
        }
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
                nav.appendChild(accountNode(doc, theme, ctx, account));
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
        } else if (hero.parentNode !== parent) {
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

    function renderFooter(doc, parent, theme, ctx) {
        var footer = doc.getElementById("pd-footer");
        if (!footer) {
            footer = el(doc, "footer");
            footer.id = "pd-footer";
            parent.appendChild(footer);
        } else if (footer.parentNode !== parent) {
            parent.appendChild(footer);
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

    function owned(node) {
        while (node) {
            if (node.id === "pd-page") {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    function plainText(value) {
        return String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
    }

    function fieldText(value, depth) {
        if (value == null || depth > 4) {
            return "";
        }
        if (typeof value === "string" || typeof value === "number") {
            return plainText(value);
        }
        if (Object.prototype.toString.call(value) === "[object Array]") {
            var parts = [];
            for (var i = 0; i < value.length; i++) {
                var part = fieldText(value[i], depth + 1);
                if (part) {
                    parts.push(part);
                }
            }
            return parts.join(", ");
        }
        if (typeof value === "object") {
            if (typeof value.value === "string" || typeof value.value === "number") {
                return plainText(value.value);
            }
            if (value.value != null && typeof value.value !== "object") {
                return fieldText(value.value, depth + 1);
            }
            if (typeof value.displayName === "string") {
                return plainText(value.displayName);
            }
            if (typeof value.name === "string" && !value.fieldId) {
                return plainText(value.name);
            }
            if (typeof value.filename === "string") {
                return plainText(value.filename);
            }
            if (typeof value.friendly === "string") {
                return plainText(value.friendly);
            }
            if (value.value && typeof value.value === "object") {
                return fieldText(value.value, depth + 1);
            }
        }
        return "";
    }

    function requestSummary(item) {
        if (!item) {
            return "";
        }
        if (typeof item.summary === "string" || typeof item.summary === "number") {
            return plainText(item.summary);
        }
        var summary = fieldText(item.summary, 0);
        if (summary) {
            return summary;
        }
        var fields = item.requestFieldValues || [];
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            if (field && field.fieldId === "summary") {
                return fieldText(field.value, 0);
            }
        }
        return fields.length ? fieldText(fields[0] && fields[0].value, 0) : "";
    }

    function readCatalog(doc, portalId) {
        var requests = [];
        var portals = [];
        var seenRequest = {};
        var seenPortal = {};
        var specific = portalId && portalId !== "global";
        var links = doc.getElementsByTagName ? doc.getElementsByTagName("a") : [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (owned(link)) {
                continue;
            }
            var href = (link.getAttribute("href") || "").split("?")[0];
            var name = plainText(link.textContent || "");
            var description = "";
            var notes = link.getElementsByTagName("p");
            if (notes.length) {
                description = plainText(notes[0].textContent || "");
                name = plainText(name.replace(description, ""));
            }
            var created = /\/portal\/(\d+)\/(?:group\/\d+\/)?create\/(\d+)\/?$/.exec(href);
            var portal = /\/portal\/(\d+)\/?$/.exec(href);
            if (specific && created && created[1] === String(portalId) && !seenRequest[created[2]]) {
                seenRequest[created[2]] = true;
                requests.push({id: created[2], name: name, description: description, href: href});
            } else if (!specific && portal && name && !seenPortal[portal[1]]) {
                seenPortal[portal[1]] = true;
                portals.push({id: portal[1], name: name, description: description, href: href});
            }
        }
        return specific ? requests : portals;
    }

    function fetchValues(contextPath, path, cb) {
        var collected = [];
        var headers = {"X-Experimental-Api": "opt-in"};
        function page(start) {
            var join = path.indexOf("?") >= 0 ? "&" : "?";
            getJson(contextPath + path + join + "start=" + start + "&limit=50", function (err, data) {
                if (err || !data || !data.values) {
                    cb(err || new Error("empty"), collected);
                    return;
                }
                for (var i = 0; i < data.values.length && collected.length < 200; i++) {
                    collected.push(data.values[i]);
                }
                var more = data.isLastPage === false && data.values.length && collected.length < 200;
                if (more) {
                    page((data.start || 0) + (data.limit || data.values.length));
                } else {
                    cb(null, collected);
                }
            }, headers);
        }
        page(0);
    }

    function fetchCatalog(contextPath, portalId, cb) {
        var base = contextPath || "";
        if (portalId && portalId !== "global") {
            fetchValues(base, "/rest/servicedeskapi/servicedesk/" + encodeURIComponent(portalId) + "/requesttype", function (err, values) {
                if (err || !values || !values.length) {
                    cb(null);
                    return;
                }
                var items = [];
                for (var i = 0; i < values.length; i++) {
                    var type = values[i];
                    if (!type || type.id == null || !plainText(type.name)) {
                        continue;
                    }
                    items.push({
                        id: String(type.id),
                        name: plainText(type.name),
                        description: plainText(type.description || ""),
                        href: base + "/servicedesk/customer/portal/" + portalId + "/create/" + type.id
                    });
                }
                cb(items.length ? items : null);
            });
            return;
        }
        fetchValues(base, "/rest/servicedeskapi/servicedesk", function (err, values) {
            if (err || !values || !values.length) {
                cb(null);
                return;
            }
            var items = [];
            for (var j = 0; j < values.length; j++) {
                var desk = values[j];
                if (!desk || desk.id == null) {
                    continue;
                }
                var name = plainText(desk.projectName || desk.projectKey || "");
                if (!name) {
                    continue;
                }
                items.push({
                    id: String(desk.id),
                    name: name,
                    description: "",
                    href: base + "/servicedesk/customer/portal/" + desk.id
                });
            }
            cb(items.length ? items : null);
        });
    }

    function ordered(items, order) {
        if (!order || !order.length) {
            return items;
        }
        var rank = {};
        for (var i = 0; i < order.length; i++) {
            rank[String(order[i])] = i;
        }
        var copy = items.slice();
        copy.sort(function (a, b) {
            var ia = rank[a.id];
            var ib = rank[b.id];
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

    function renderSearch(doc, parent, theme) {
        var node = doc.getElementById("pd-search");
        var model = theme.search || {};
        if (model.visible === false) {
            if (node && node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return;
        }
        if (!node) {
            node = el(doc, "div");
            node.id = "pd-search";
            parent.appendChild(node);
        } else if (node.parentNode !== parent) {
            parent.appendChild(node);
        }
        node.setAttribute("data-pd-region", "search");
        node.setAttribute("data-pd-select", "search");
        var input = node.firstChild && node.firstChild.tagName === "INPUT" ? node.firstChild : null;
        if (!input) {
            input = doc.createElement("input");
            input.setAttribute("type", "search");
            input.addEventListener("input", function () {
                var query = String(input.value || "").toLowerCase();
                var cards = doc.getElementById("pd-cards");
                if (!cards) {
                    return;
                }
                for (var i = 0; i < cards.children.length; i++) {
                    var text = String(cards.children[i].textContent || "").toLowerCase();
                    cards.children[i].style.display = !query || text.indexOf(query) >= 0 ? "" : "none";
                }
            });
            node.appendChild(input);
        }
        if ((input.getAttribute("placeholder") || "") !== (model.placeholder || "")) {
            input.setAttribute("placeholder", model.placeholder || "");
        }
    }

    function dropExtraViews(parent) {
        if (!parent || !parent.querySelectorAll) {
            return;
        }
        var stale = parent.querySelectorAll(".pd-mine, .pd-profile");
        for (var i = stale.length - 1; i >= 0; i--) {
            if (stale[i].parentNode) {
                stale[i].parentNode.removeChild(stale[i]);
            }
        }
    }

    function renderCards(doc, parent, theme, ctx, catalog) {
        dropExtraViews(parent);
        var box = doc.getElementById("pd-cards");
        if (!box) {
            box = el(doc, "div");
            box.id = "pd-cards";
            parent.appendChild(box);
        } else if (box.parentNode !== parent) {
            parent.appendChild(box);
        }
        box.setAttribute("data-pd-region", "requests");
        box.setAttribute("data-pd-select", "requests");
        var source = catalog && catalog.length ? catalog : readCatalog(doc, ctx && ctx.portalId);
        var items = ordered(source, theme.requests && theme.requests.order);
        var sig = items.map(function (item) { return item.id + "\n" + item.name + "\n" + item.description; }).join("|");
        var showDesc = !theme.requests || theme.requests.showDescription !== false;
        sig += showDesc ? ":desc" : ":plain";
        if (box.getAttribute("data-pd-sig") === sig && box.firstChild) {
            return;
        }
        box.setAttribute("data-pd-sig", sig);
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var link = el(doc, "a", "pd-tile");
            link.href = item.href || "#";
            link.setAttribute("draggable", "false");
            link.setAttribute("data-pd-card", "1");
            link.setAttribute("data-pd-type", item.id);
            link.appendChild(el(doc, "span", "pd-card-icon", (item.name || "?").charAt(0).toUpperCase()));
            link.appendChild(el(doc, "span", "pd-card-title", item.name || ""));
            if (showDesc && item.description) {
                var desc = el(doc, "span", "pd-card-desc", item.description);
                desc.setAttribute("data-pd-desc", "1");
                link.appendChild(desc);
            }
            box.appendChild(link);
        }
    }

    function blocksOf(theme) {
        if (theme.blocks && theme.blocks.length) {
            return theme.blocks;
        }
        return [
            {id: "announcement", type: "announcement", visible: !!(theme.announcement && theme.announcement.visible)},
            {id: "header", type: "header", visible: !theme.header || theme.header.mode !== "hidden"},
            {id: "hero", type: "hero", visible: !theme.hero || theme.hero.visible !== false},
            {id: "search", type: "search", visible: !theme.search || theme.search.visible !== false},
            {id: "requests", type: "requests", visible: true},
            {id: "footer", type: "footer", visible: !theme.footer || theme.footer.mode !== "hidden"}
        ];
    }

    function blockShown(theme, block, page) {
        if (!block || block.visible === false) {
            return false;
        }
        if (page === "shell") {
            return block.type === "header" || block.type === "footer" || block.type === "announcement";
        }
        if (block.type === "header") {
            return !theme.header || theme.header.mode !== "hidden";
        }
        if (block.type === "footer") {
            return !theme.footer || theme.footer.mode !== "hidden";
        }
        if (block.type === "hero") {
            return page !== "mine" && page !== "profile" && showHero(theme, page);
        }
        if (block.type === "search") {
            return page !== "mine" && page !== "profile" && (!theme.search || theme.search.visible !== false);
        }
        if (block.type === "announcement") {
            return !!(theme.announcement && theme.announcement.visible && theme.announcement.text);
        }
        return true;
    }

    function slot(doc, pageNode, id, select) {
        var node = doc.getElementById("pd-slot-" + id);
        if (!node) {
            node = el(doc, "div", "pd-slot");
            node.id = "pd-slot-" + id;
        }
        node.setAttribute("data-pd-block", id);
        node.setAttribute("data-pd-select", select);
        pageNode.appendChild(node);
        return node;
    }

    function clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function renderTextBlock(doc, parent, block) {
        var box = parent.querySelector ? parent.querySelector(".pd-text-block") : null;
        var sig = (block.title || "") + "\n" + (block.text || "");
        if (box && box.getAttribute("data-pd-sig") === sig) {
            return;
        }
        clearNode(parent);
        box = el(doc, "div", "pd-text-block");
        box.setAttribute("data-pd-sig", sig);
        if (block.title) {
            box.appendChild(el(doc, "h2", null, block.title));
        }
        if (block.text) {
            box.appendChild(el(doc, "p", null, block.text));
        }
        parent.appendChild(box);
    }

    function renderLinksBlock(doc, parent, block, ctx) {
        var box = parent.querySelector ? parent.querySelector(".pd-links-block") : null;
        var sig = (block.title || "") + "\n" + JSON.stringify(block.links || []);
        if (box && box.getAttribute("data-pd-sig") === sig) {
            return;
        }
        clearNode(parent);
        box = el(doc, "div", "pd-links-block");
        box.setAttribute("data-pd-sig", sig);
        if (block.title) {
            box.appendChild(el(doc, "h2", null, block.title));
        }
        var row = el(doc, "div", "pd-links-row");
        var links = block.links || [];
        for (var i = 0; i < links.length; i++) {
            var link = el(doc, "a", null, links[i].label || "");
            link.href = resolveHref(links[i].href, ctx.contextPath);
            row.appendChild(link);
        }
        box.appendChild(row);
        parent.appendChild(box);
    }

    function placeBlock(node, block) {
        if (!block || !block.free) {
            removeClass(node, "pd-free");
            node.style.left = "";
            node.style.top = "";
            node.style.width = "";
            node.style.fontSize = "";
            node.removeAttribute("data-pd-font");
            node.removeAttribute("data-pd-align");
            return;
        }
        addClass(node, "pd-free");
        node.style.left = (block.x || 0) + "%";
        node.style.top = (block.y || 0) + "px";
        node.style.width = (block.width || 100) + "%";
        node.style.fontSize = block.fontSize ? block.fontSize + "px" : "";
        if (block.font) {
            node.setAttribute("data-pd-font", block.font);
        } else {
            node.removeAttribute("data-pd-font");
        }
        if (block.align) {
            node.setAttribute("data-pd-align", block.align);
        } else {
            node.removeAttribute("data-pd-align");
        }
    }

    function renderMine(doc, parent, ctx) {
        var box = parent.querySelector ? parent.querySelector(".pd-mine") : null;
        var rows = ctx.requests || [];
        var sig = rows.map(function (row) {
            return row.key + "\n" + row.summary + "\n" + row.status;
        }).join("|");
        if (box && box.getAttribute("data-pd-sig") === sig) {
            return;
        }
        clearNode(parent);
        box = el(doc, "div", "pd-mine");
        box.setAttribute("data-pd-sig", sig);
        box.appendChild(el(doc, "h2", null, "Мои запросы"));
        var filter = doc.createElement("input");
        filter.type = "search";
        filter.className = "pd-mine-filter";
        filter.placeholder = "Поиск по запросам";
        filter.addEventListener("input", function () {
            var query = String(filter.value || "").toLowerCase();
            var links = box.getElementsByClassName("pd-row");
            for (var i = 0; i < links.length; i++) {
                var text = String(links[i].textContent || "").toLowerCase();
                links[i].style.display = !query || text.indexOf(query) >= 0 ? "" : "none";
            }
        });
        box.appendChild(filter);
        if (!rows.length) {
            box.appendChild(el(doc, "p", "pd-empty", "Запросов пока нет"));
        }
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var link = el(doc, "a", "pd-row");
            link.href = row.href || "#";
            link.appendChild(el(doc, "span", "pd-key", row.key || ""));
            link.appendChild(el(doc, "span", "pd-summary", row.summary || ""));
            link.appendChild(el(doc, "span", "pd-status", row.status || ""));
            box.appendChild(link);
        }
        parent.appendChild(box);
    }

    function renderProfile(doc, parent, ctx) {
        var account = ctx.account;
        clearNode(parent);
        var box = el(doc, "div", "pd-profile");
        box.appendChild(el(doc, "h2", null, "Профиль"));
        if (!account || !(account.name || account.username)) {
            var guest = el(doc, "p", null, "Войдите, чтобы открыть профиль.");
            var login = el(doc, "a", "pd-login", "Войти");
            login.href = loginHref(ctx);
            box.appendChild(guest);
            box.appendChild(login);
            parent.appendChild(box);
            return;
        }
        var card = el(doc, "div", "pd-profile-card");
        if (account.avatar) {
            var img = doc.createElement("img");
            img.src = account.avatar;
            img.alt = "";
            card.appendChild(img);
        } else {
            card.appendChild(el(doc, "span", "pd-account-mark", (account.name || account.username).charAt(0).toUpperCase()));
        }
        var text = el(doc, "div");
        text.appendChild(el(doc, "strong", null, account.name || account.username));
        if (account.username) {
            text.appendChild(el(doc, "p", null, account.username));
        }
        if (account.email) {
            text.appendChild(el(doc, "p", null, account.email));
        }
        card.appendChild(text);
        box.appendChild(card);
        parent.appendChild(box);
    }

    function replacePage(doc, theme, ctx, page, account, catalog) {
        if (!doc.body) {
            return;
        }
        var pageNode = doc.getElementById("pd-page");
        if (!pageNode) {
            pageNode = el(doc, "div");
            pageNode.id = "pd-page";
            doc.body.appendChild(pageNode);
        }
        var note = doc.getElementById("pd-original");
        if (note && note.parentNode) {
            note.parentNode.removeChild(note);
        }
        var blocks = blocksOf(theme);
        var keep = {};
        var floor = 0;
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (!blockShown(theme, block, page)) {
                continue;
            }
            keep[block.id] = true;
            var select = block.type === "text" || block.type === "links" ? "block:" + block.id : block.type;
            var parent = slot(doc, pageNode, block.id, select);
            if (block.type === "announcement") {
                renderAnnouncement(doc, parent, theme);
            } else if (block.type === "header") {
                renderHeader(doc, parent, theme, ctx, account);
            } else if (block.type === "hero") {
                renderHero(doc, parent, theme);
            } else if (block.type === "search") {
                renderSearch(doc, parent, theme);
            } else if (block.type === "requests") {
                if (page === "mine") {
                    renderMine(doc, parent, ctx);
                } else if (page === "profile") {
                    renderProfile(doc, parent, ctx);
                } else {
                    renderCards(doc, parent, theme, ctx, catalog);
                }
            } else if (block.type === "footer") {
                renderFooter(doc, parent, theme, ctx);
            } else if (block.type === "text") {
                renderTextBlock(doc, parent, block);
            } else if (block.type === "links") {
                renderLinksBlock(doc, parent, block, ctx);
            }
            placeBlock(parent, block);
            if (block.free) {
                var depth = (block.y || 0) + 220;
                if (depth > floor) {
                    floor = depth;
                }
            }
        }
        pageNode.style.minHeight = floor ? (floor + 40) + "px" : "";
        var slots = pageNode.getElementsByClassName("pd-slot");
        for (var s = slots.length - 1; s >= 0; s--) {
            if (!keep[slots[s].getAttribute("data-pd-block")]) {
                pageNode.removeChild(slots[s]);
            }
        }
    }

    function releaseHold(doc) {
        var html = doc && doc.documentElement;
        if (html) {
            removeClass(html, "pd-hold");
        }
    }

    function dropPage(doc) {
        var built = doc.getElementById("pd-page");
        if (built && built.parentNode) {
            built.parentNode.removeChild(built);
        }
        var html = doc.documentElement;
        if (html) {
            removeClass(html, "pd-active");
            removeClass(html, "pd-replace");
            removeClass(html, "pd-shell");
        }
    }

    function isChromeBlue(color) {
        var match = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(color || "");
        if (!match) {
            return false;
        }
        var red = Number(match[1]);
        var green = Number(match[2]);
        var blue = Number(match[3]);
        return blue > 100 && blue > red + 20 && blue > green && red < 90;
    }

    function isPageWash(color) {
        var match = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(color || "");
        if (!match) {
            return false;
        }
        var red = Number(match[1]);
        var green = Number(match[2]);
        var blue = Number(match[3]);
        return red > 228 && green > 228 && blue > 228 && Math.abs(red - blue) < 24;
    }

    function hideNativeBars(doc) {
        var view = doc.defaultView || window;
        var nodes = doc.querySelectorAll ? doc.querySelectorAll("[role='banner'], .aui-header, .cv-smart-portal-header, .cv-help-center-header, .jsd-header") : [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id === "pd-header" || owned(nodes[i])) {
                continue;
            }
            nodes[i].setAttribute("data-pd-native-bar", "1");
        }
        if (!doc.body || !view.getComputedStyle) {
            return;
        }
        var all = doc.body.getElementsByTagName("*");
        var width = doc.documentElement.clientWidth || 0;
        var limit = Math.min(all.length, 500);
        for (var n = 0; n < limit; n++) {
            var el = all[n];
            if (owned(el) || el.id === "pd-header" || el.getAttribute("data-pd-native-bar")) {
                continue;
            }
            var rect = el.getBoundingClientRect();
            var bg = view.getComputedStyle(el).backgroundColor;
            if (rect.top < 180 && rect.height >= 36 && rect.height <= 160 && rect.width > 320 && isChromeBlue(bg)) {
                el.setAttribute("data-pd-native-bar", "1");
            } else if (width && rect.width > width * 0.9 && rect.height > 400 && isPageWash(bg)) {
                el.style.backgroundColor = "transparent";
            }
        }
        var forms = doc.getElementsByTagName("form");
        for (var f = 0; f < forms.length; f++) {
            if (!owned(forms[f])) {
                dressForm(forms[f]);
            }
        }
        hideBrand(doc);
    }

    function dressForm(form) {
        addClass(form, "pd-native-form");
        var node = form.parentNode;
        var steps = 0;
        while (node && node.nodeType === 1 && node !== document.body && node.id !== "pd-page" && steps < 8) {
            if (!owned(node)) {
                node.style.setProperty("max-width", "none", "important");
                node.style.setProperty("width", "100%", "important");
                node.style.setProperty("background-color", "transparent", "important");
            }
            node = node.parentNode;
            steps++;
        }
    }

    function hideBrand(doc) {
        var branded = doc.querySelectorAll ? doc.querySelectorAll(".cv-powered-by, .jsd-powered-by, .cv-smart-portal-footer") : [];
        for (var i = 0; i < branded.length; i++) {
            branded[i].setAttribute("data-pd-brand", "1");
        }
        if (!doc.body) {
            return;
        }
        var nodes = doc.body.getElementsByTagName("*");
        var limit = Math.min(nodes.length, 400);
        for (var n = 0; n < limit; n++) {
            var el = nodes[n];
            if (owned(el) || el.getAttribute("data-pd-brand") || el.children.length) {
                continue;
            }
            var text = el.textContent || "";
            if (text.length > 80 || text.indexOf("Jira Service Management") < 0) {
                continue;
            }
            var host = el;
            var parent = el.parentNode;
            if (parent && parent !== doc.body && parent.tagName !== "FORM" && !owned(parent)) {
                var parentText = parent.textContent || "";
                if (parentText.length < 120) {
                    host = parent;
                }
            }
            host.setAttribute("data-pd-brand", "1");
        }
    }

    function arrangeShell(doc) {
        var pageNode = doc.getElementById("pd-page");
        if (pageNode && doc.body && doc.body.firstChild !== pageNode) {
            doc.body.insertBefore(pageNode, doc.body.firstChild);
        }
        var footer = doc.getElementById("pd-slot-footer");
        if (footer && doc.body) {
            doc.body.appendChild(footer);
        }
        hideNativeBars(doc);
    }

    function showOriginal(doc, label) {
        if (!doc.body) {
            return;
        }
        var note = doc.getElementById("pd-original");
        if (!note) {
            note = el(doc, "div");
            note.id = "pd-original";
            note.className = "pd-original";
            doc.body.insertBefore(note, doc.body.firstChild);
        }
        clearNode(note);
        note.appendChild(el(doc, "p", null, label || "Так портал выглядит без плагина."));
    }

    function showKept(doc, label) {
        if (!doc.body) {
            return;
        }
        var note = el(doc, "div");
        note.id = "pd-page";
        note.className = "pd-kept";
        note.appendChild(el(doc, "p", null, label || "Форма входа и форма заявки остаются страницами Jira."));
        doc.body.appendChild(note);
        addClass(doc.documentElement, "pd-replace");
    }

    function apply(options) {
        options = options || {};
        var doc = options.document || document;
        var theme = options.theme;
        if (!doc.documentElement || !theme) {
            releaseHold(doc);
            return;
        }
        var html = doc.documentElement;
        var page = options.page || pageKind(window.location.pathname);
        var ctx = {
            contextPath: options.contextPath || "",
            portalId: options.portalId || "global",
            account: options.account || null,
            accountState: options.accountState || (options.account ? "ready" : "anonymous"),
            requests: options.requests || []
        };
        if (options.original) {
            dropPage(doc);
            showOriginal(doc, options.originalLabel);
            releaseHold(doc);
            return;
        }
        if (page !== "home" && page !== "mine" && page !== "profile" && page !== "create" && page !== "request" && page !== "shell") {
            dropPage(doc);
            if (options.preview) {
                showKept(doc, options.keptLabel);
            }
            releaseHold(doc);
            return;
        }
        var shell = page === "create" || page === "request" || page === "shell";
        addClass(html, "pd-active");
        if (shell) {
            addClass(html, "pd-shell");
            removeClass(html, "pd-replace");
        } else {
            addClass(html, "pd-replace");
            removeClass(html, "pd-shell");
        }
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
        replacePage(doc, theme, ctx, shell ? "shell" : page, options.account || null, options.catalog || null);
        if (shell) {
            arrangeShell(doc);
            if (options.preview) {
                var held = doc.getElementById("pd-held");
                var pageNode = doc.getElementById("pd-page");
                if (!held && pageNode) {
                    held = el(doc, "div", "pd-kept");
                    held.id = "pd-held";
                    pageNode.appendChild(held);
                }
                if (held) {
                    held.textContent = options.keptLabel || "";
                }
            }
        }
        if (typeof options.onRender === "function") {
            options.onRender(doc);
        }
        releaseHold(doc);
    }

    function teardown(doc) {
        var html = doc.documentElement;
        removeClass(html, "pd-active");
        removeClass(html, "pd-replace");
        removeClass(html, "pd-shell");
        var built = doc.getElementById("pd-page");
        if (built && built.parentNode) {
            built.parentNode.removeChild(built);
        }
        var note = doc.getElementById("pd-original");
        if (note && note.parentNode) {
            note.parentNode.removeChild(note);
        }
        releaseHold(doc);
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

    function getJson(url, cb, headers) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        if (headers) {
            for (var name in headers) {
                if (headers.hasOwnProperty(name)) {
                    xhr.setRequestHeader(name, headers[name]);
                }
            }
        }
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
        var currentKind = null;
        var current = null;
        var suppress = 0;
        var timer = 0;
        var account = null;
        var accountState = "pending";
        var catalog = null;
        var mine = null;

        function loadAccount() {
            var dom = readVisitor(document);
            getJson(contextPath + "/rest/api/2/myself", function (err, me) {
                if (err || !me || (!me.displayName && !me.name && !me.key)) {
                    account = null;
                    accountState = "anonymous";
                } else {
                    var urls = me.avatarUrls || {};
                    account = {
                        username: me.name || me.key || "",
                        name: me.displayName || me.name || me.key,
                        email: me.emailAddress || "",
                        avatar: urls["48x48"] || urls["24x24"] || urls["16x16"] || "",
                        logoutHref: (dom && dom.logoutHref) || (contextPath + "/logout"),
                        requestsHref: contextPath + "/servicedesk/customer/user/requests",
                        profileHref: contextPath + "/servicedesk/customer/user/profile"
                    };
                    accountState = "ready";
                }
                if (current) {
                    paint(current, currentId);
                }
            });
        }

        function mineRows(values) {
            var rows = [];
            var base = contextPath || "";
            for (var i = 0; i < values.length; i++) {
                var item = values[i] || {};
                var key = item.issueKey || "";
                if (!key) {
                    continue;
                }
                var href = item._links && item._links.web ? item._links.web : "";
                if (!href && item.serviceDeskId) {
                    href = base + "/servicedesk/customer/portal/" + item.serviceDeskId + "/" + key;
                }
                var status = item.currentStatus && (item.currentStatus.status || item.currentStatus.statusName) || "";
                rows.push({
                    key: key,
                    summary: requestSummary(item),
                    status: plainText(status),
                    href: href || "#"
                });
            }
            return rows;
        }

        function paint(data, id) {
            suppress++;
            try {
                if (!data || data.active === false || !data.enabled || !data.theme) {
                    current = data || {enabled: false, active: false};
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
                    page: pageKind(window.location.pathname),
                    account: account,
                    accountState: accountState,
                    requests: mine,
                    catalog: catalog
                });
            } catch (e) {
                releaseHold(document);
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
            var kindNow = pageKind(window.location.pathname);
            if (!force && current && currentId === id && currentKind === kindNow) {
                paint(current, id);
                return;
            }
            var known = current && current.theme && currentId === id && current.active !== false && current.enabled;
            currentId = id;
            currentKind = kindNow;
            if (known) {
                paint(current, id);
            }
            var token = {};
            var kind = pageKind(window.location.pathname);
            load.token = token;
            var pending = kind === "mine" ? 3 : 2;
            var themeData = null;
            var failed = false;
            var items = null;
            function finish() {
                if (load.token !== token || --pending) {
                    return;
                }
                if (failed) {
                    teardown(document);
                    return;
                }
                catalog = items;
                paint(themeData, id);
            }
            getJson(contextPath + "/rest/portal-designer/1.0/public-theme?portalId=" + encodeURIComponent(id), function (err, data) {
                failed = !!err;
                themeData = data;
                finish();
            });
            fetchCatalog(contextPath, id, function (list) {
                items = list;
                finish();
            });
            if (kind === "mine") {
                fetchValues(contextPath, "/rest/servicedeskapi/request", function (err, values) {
                    mine = mineRows(values || []);
                    finish();
                });
            } else {
                mine = null;
            }
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
        loadAccount();
        document.addEventListener("click", function (event) {
            if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            var node = event.target;
            while (node && node !== document && node.tagName !== "A") {
                node = node.parentNode;
            }
            if (!node || node.tagName !== "A" || node.getAttribute("target") === "_blank") {
                return;
            }
            var href = node.getAttribute("href") || "";
            if (href.indexOf("/servicedesk/customer/") < 0 || node.pathname === window.location.pathname) {
                return;
            }
            addClass(document.documentElement, "pd-hold");
            window.setTimeout(function () {
                removeClass(document.documentElement, "pd-hold");
            }, 4000);
        }, true);
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
