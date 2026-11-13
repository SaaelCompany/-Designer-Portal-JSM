package com.portaldesigner.theme;

import com.portaldesigner.sanitize.CssSanitizer;
import com.portaldesigner.sanitize.HtmlSanitizer;
import com.portaldesigner.sanitize.Urls;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public final class ThemeMapper {
    private ThemeMapper() {
    }

    @SuppressWarnings("unchecked")
    public static MappedTheme fromMap(Map<String, Object> raw) {
        List<String> warnings = new ArrayList<String>();
        PortalTheme theme = new PortalTheme();
        if (raw == null) {
            return new MappedTheme(theme, warnings);
        }
        theme.name = text(raw.get("name"), theme.name, 80);
        theme.enabled = bool(raw.get("enabled"), theme.enabled);
        theme.useGlobal = bool(raw.get("useGlobal"), theme.useGlobal);
        theme.updatedAt = longVal(raw.get("updatedAt"), 0L);

        Map<String, Object> colors = map(raw.get("colors"));
        theme.colors.primary = color(colors, "primary", theme.colors.primary, warnings);
        theme.colors.primaryText = color(colors, "primaryText", theme.colors.primaryText, warnings);
        theme.colors.background = color(colors, "background", theme.colors.background, warnings);
        theme.colors.surface = color(colors, "surface", theme.colors.surface, warnings);
        theme.colors.text = color(colors, "text", theme.colors.text, warnings);
        theme.colors.muted = color(colors, "muted", theme.colors.muted, warnings);
        theme.colors.headerBg = color(colors, "headerBg", theme.colors.headerBg, warnings);
        theme.colors.headerText = color(colors, "headerText", theme.colors.headerText, warnings);
        theme.colors.heroBg = color(colors, "heroBg", theme.colors.heroBg, warnings);
        theme.colors.heroText = color(colors, "heroText", theme.colors.heroText, warnings);
        theme.colors.footerBg = color(colors, "footerBg", theme.colors.footerBg, warnings);
        theme.colors.footerText = color(colors, "footerText", theme.colors.footerText, warnings);
        theme.colors.link = color(colors, "link", theme.colors.link, warnings);
        theme.colors.border = color(colors, "border", theme.colors.border, warnings);
        theme.colors.accent = color(colors, "accent", theme.colors.accent, warnings);
        theme.colors.card = color(colors, "card", theme.colors.card, warnings);

        Map<String, Object> type = map(raw.get("typography"));
        theme.typography.font = oneOf(str(type.get("font")), theme.typography.font,
                "system", "serif", "mono", "humanist", "condensed");
        theme.typography.baseSize = clamp(intVal(type.get("baseSize"), theme.typography.baseSize), 13, 22, "typography.baseSize", warnings);
        theme.typography.headingWeight = snapWeight(intVal(type.get("headingWeight"), theme.typography.headingWeight));
        theme.typography.lineHeight = clampDouble(doubleVal(type.get("lineHeight"), theme.typography.lineHeight), 1.15d, 1.9d);

        Map<String, Object> layout = map(raw.get("layout"));
        theme.layout.contentWidth = clamp(intVal(layout.get("contentWidth"), theme.layout.contentWidth), 640, 1440, "layout.contentWidth", warnings);
        theme.layout.radius = clamp(intVal(layout.get("radius"), theme.layout.radius), 0, 32, "layout.radius", warnings);
        theme.layout.shadow = oneOf(str(layout.get("shadow")), theme.layout.shadow, "none", "soft", "strong");
        theme.layout.pagePadding = clamp(intVal(layout.get("pagePadding"), theme.layout.pagePadding), 0, 64, "layout.pagePadding", warnings);
        theme.layout.backgroundImage = asset(str(layout.get("backgroundImage")), warnings, "layout.backgroundImage");

        Map<String, Object> header = map(raw.get("header"));
        theme.header.mode = oneOf(str(header.get("mode")), theme.header.mode, "replace", "theme", "hidden");
        theme.header.logoUrl = asset(str(header.get("logoUrl")), warnings, "header.logoUrl");
        theme.header.logoAlt = text(header.get("logoAlt"), "", 120);
        theme.header.logoHeight = clamp(intVal(header.get("logoHeight"), theme.header.logoHeight), 16, 96, "header.logoHeight", warnings);
        theme.header.showTitle = bool(header.get("showTitle"), theme.header.showTitle);
        theme.header.title = text(header.get("title"), theme.header.title, 120);
        theme.header.sticky = bool(header.get("sticky"), theme.header.sticky);
        theme.header.showLogin = bool(header.get("showLogin"), theme.header.showLogin);
        theme.header.loginLabel = text(header.get("loginLabel"), theme.header.loginLabel, 40);
        theme.header.height = clamp(intVal(header.get("height"), theme.header.height), 48, 140, "header.height", warnings);
        theme.header.links = links(header.get("links"), 8, warnings);
        theme.header.customHtml = html(str(header.get("customHtml")), warnings, "header.customHtml");

        Map<String, Object> hero = map(raw.get("hero"));
        theme.hero.visible = bool(hero.get("visible"), theme.hero.visible);
        theme.hero.pages = oneOf(str(hero.get("pages")), theme.hero.pages, "home", "all");
        theme.hero.title = text(hero.get("title"), theme.hero.title, 160);
        theme.hero.subtitle = text(hero.get("subtitle"), theme.hero.subtitle, 280);
        theme.hero.align = oneOf(str(hero.get("align")), theme.hero.align, "start", "center");
        theme.hero.height = clamp(intVal(hero.get("height"), theme.hero.height), 0, 640, "hero.height", warnings);
        theme.hero.backgroundImage = asset(str(hero.get("backgroundImage")), warnings, "hero.backgroundImage");
        theme.hero.overlay = clampDouble(doubleVal(hero.get("overlay"), theme.hero.overlay), 0d, 0.8d);

        Map<String, Object> search = map(raw.get("search"));
        theme.search.visible = bool(search.get("visible"), theme.search.visible);
        theme.search.placeholder = text(search.get("placeholder"), theme.search.placeholder, 80);
        theme.search.radius = clamp(intVal(search.get("radius"), theme.search.radius), 0, 999, "search.radius", warnings);

        Map<String, Object> requests = map(raw.get("requests"));
        theme.requests.layout = oneOf(str(requests.get("layout")), theme.requests.layout, "grid", "list");
        theme.requests.columns = clamp(intVal(requests.get("columns"), theme.requests.columns), 1, 4, "requests.columns", warnings);
        theme.requests.gap = clamp(intVal(requests.get("gap"), theme.requests.gap), 0, 40, "requests.gap", warnings);
        theme.requests.showDescription = bool(requests.get("showDescription"), theme.requests.showDescription);
        theme.requests.cardStyle = oneOf(str(requests.get("cardStyle")), theme.requests.cardStyle, "elevated", "outline", "flat");
        theme.requests.order = idList(requests.get("order"), warnings);

        Map<String, Object> announcement = map(raw.get("announcement"));
        theme.announcement.visible = bool(announcement.get("visible"), theme.announcement.visible);
        theme.announcement.text = text(announcement.get("text"), "", 240);
        theme.announcement.tone = oneOf(str(announcement.get("tone")), theme.announcement.tone, "info", "success", "warning", "critical");

        Map<String, Object> footer = map(raw.get("footer"));
        theme.footer.mode = oneOf(str(footer.get("mode")), theme.footer.mode, "replace", "theme", "hidden");
        theme.footer.copyright = text(footer.get("copyright"), theme.footer.copyright, 160);
        theme.footer.columns = columns(footer.get("columns"), warnings);
        theme.footer.customHtml = html(str(footer.get("customHtml")), warnings, "footer.customHtml");

        Map<String, Object> responsive = map(raw.get("responsive"));
        theme.responsive.mobileMax = clamp(intVal(responsive.get("mobileMax"), theme.responsive.mobileMax), 360, 900, "responsive.mobileMax", warnings);
        theme.responsive.tabletMax = clamp(intVal(responsive.get("tabletMax"), theme.responsive.tabletMax), 700, 1400, "responsive.tabletMax", warnings);
        if (theme.responsive.tabletMax <= theme.responsive.mobileMax) {
            theme.responsive.tabletMax = Math.min(1400, theme.responsive.mobileMax + 200);
            warnings.add("responsive.tabletMax");
        }
        theme.responsive.mobile = screen(map(responsive.get("mobile")), PortalTheme.Screen.mobile(), warnings, "mobile");
        theme.responsive.tablet = screen(map(responsive.get("tablet")), PortalTheme.Screen.tablet(), warnings, "tablet");

        String custom = str(raw.get("customCss"));
        String cleanCss = CssSanitizer.sanitize(custom);
        if (!custom.trim().isEmpty() && !cleanCss.equals(custom.trim()) && cleanCss.length() != custom.trim().length()) {
            warnings.add("customCss");
        }
        theme.customCss = cleanCss;
        return new MappedTheme(theme, warnings);
    }

    public static Map<String, Object> toMap(PortalTheme theme) {
        Map<String, Object> root = new LinkedHashMap<String, Object>();
        root.put("name", theme.name);
        root.put("enabled", theme.enabled);
        root.put("useGlobal", theme.useGlobal);
        root.put("updatedAt", theme.updatedAt);

        Map<String, Object> colors = new LinkedHashMap<String, Object>();
        colors.put("primary", theme.colors.primary);
        colors.put("primaryText", theme.colors.primaryText);
        colors.put("background", theme.colors.background);
        colors.put("surface", theme.colors.surface);
        colors.put("text", theme.colors.text);
        colors.put("muted", theme.colors.muted);
        colors.put("headerBg", theme.colors.headerBg);
        colors.put("headerText", theme.colors.headerText);
        colors.put("heroBg", theme.colors.heroBg);
        colors.put("heroText", theme.colors.heroText);
        colors.put("footerBg", theme.colors.footerBg);
        colors.put("footerText", theme.colors.footerText);
        colors.put("link", theme.colors.link);
        colors.put("border", theme.colors.border);
        colors.put("accent", theme.colors.accent);
        colors.put("card", theme.colors.card);
        root.put("colors", colors);

        Map<String, Object> type = new LinkedHashMap<String, Object>();
        type.put("font", theme.typography.font);
        type.put("baseSize", theme.typography.baseSize);
        type.put("headingWeight", theme.typography.headingWeight);
        type.put("lineHeight", theme.typography.lineHeight);
        root.put("typography", type);

        Map<String, Object> layout = new LinkedHashMap<String, Object>();
        layout.put("contentWidth", theme.layout.contentWidth);
        layout.put("radius", theme.layout.radius);
        layout.put("shadow", theme.layout.shadow);
        layout.put("pagePadding", theme.layout.pagePadding);
        layout.put("backgroundImage", theme.layout.backgroundImage);
        root.put("layout", layout);

        Map<String, Object> header = new LinkedHashMap<String, Object>();
        header.put("mode", theme.header.mode);
        header.put("logoUrl", theme.header.logoUrl);
        header.put("logoAlt", theme.header.logoAlt);
        header.put("logoHeight", theme.header.logoHeight);
        header.put("showTitle", theme.header.showTitle);
        header.put("title", theme.header.title);
        header.put("sticky", theme.header.sticky);
        header.put("showLogin", theme.header.showLogin);
        header.put("loginLabel", theme.header.loginLabel);
        header.put("height", theme.header.height);
        header.put("links", linkMaps(theme.header.links));
        header.put("customHtml", theme.header.customHtml);
        root.put("header", header);

        Map<String, Object> hero = new LinkedHashMap<String, Object>();
        hero.put("visible", theme.hero.visible);
        hero.put("pages", theme.hero.pages);
        hero.put("title", theme.hero.title);
        hero.put("subtitle", theme.hero.subtitle);
        hero.put("align", theme.hero.align);
        hero.put("height", theme.hero.height);
        hero.put("backgroundImage", theme.hero.backgroundImage);
        hero.put("overlay", theme.hero.overlay);
        root.put("hero", hero);

        Map<String, Object> search = new LinkedHashMap<String, Object>();
        search.put("visible", theme.search.visible);
        search.put("placeholder", theme.search.placeholder);
        search.put("radius", theme.search.radius);
        root.put("search", search);

        Map<String, Object> requests = new LinkedHashMap<String, Object>();
        requests.put("layout", theme.requests.layout);
        requests.put("columns", theme.requests.columns);
        requests.put("gap", theme.requests.gap);
        requests.put("showDescription", theme.requests.showDescription);
        requests.put("cardStyle", theme.requests.cardStyle);
        requests.put("order", theme.requests.order);
        root.put("requests", requests);

        Map<String, Object> announcement = new LinkedHashMap<String, Object>();
        announcement.put("visible", theme.announcement.visible);
        announcement.put("text", theme.announcement.text);
        announcement.put("tone", theme.announcement.tone);
        root.put("announcement", announcement);

        Map<String, Object> footer = new LinkedHashMap<String, Object>();
        footer.put("mode", theme.footer.mode);
        footer.put("copyright", theme.footer.copyright);
        List<Map<String, Object>> columns = new ArrayList<Map<String, Object>>();
        for (PortalTheme.Column column : theme.footer.columns) {
            Map<String, Object> col = new LinkedHashMap<String, Object>();
            col.put("title", column.title);
            col.put("links", linkMaps(column.links));
            columns.add(col);
        }
        footer.put("columns", columns);
        footer.put("customHtml", theme.footer.customHtml);
        root.put("footer", footer);

        Map<String, Object> responsive = new LinkedHashMap<String, Object>();
        responsive.put("mobileMax", theme.responsive.mobileMax);
        responsive.put("tabletMax", theme.responsive.tabletMax);
        responsive.put("mobile", screenMap(theme.responsive.mobile));
        responsive.put("tablet", screenMap(theme.responsive.tablet));
        root.put("responsive", responsive);
        root.put("customCss", theme.customCss);
        return root;
    }

    private static Map<String, Object> screenMap(PortalTheme.Screen screen) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        map.put("columns", screen.columns);
        map.put("heroHeight", screen.heroHeight);
        map.put("pagePadding", screen.pagePadding);
        map.put("baseSize", screen.baseSize);
        map.put("headerHeight", screen.headerHeight);
        map.put("showHero", screen.showHero);
        map.put("showHeaderTitle", screen.showHeaderTitle);
        return map;
    }

    private static List<Map<String, Object>> linkMaps(List<PortalTheme.Link> links) {
        List<Map<String, Object>> out = new ArrayList<Map<String, Object>>();
        if (links == null) {
            return out;
        }
        for (PortalTheme.Link link : links) {
            Map<String, Object> item = new LinkedHashMap<String, Object>();
            item.put("label", link.label);
            item.put("href", link.href);
            out.add(item);
        }
        return out;
    }

    private static PortalTheme.Screen screen(Map<String, Object> raw, PortalTheme.Screen defaults, List<String> warnings, String name) {
        PortalTheme.Screen screen = new PortalTheme.Screen();
        screen.columns = clamp(intVal(raw.get("columns"), defaults.columns), 1, 4, name + ".columns", warnings);
        screen.heroHeight = clamp(intVal(raw.get("heroHeight"), defaults.heroHeight), 0, 640, name + ".heroHeight", warnings);
        screen.pagePadding = clamp(intVal(raw.get("pagePadding"), defaults.pagePadding), 0, 48, name + ".pagePadding", warnings);
        screen.baseSize = clamp(intVal(raw.get("baseSize"), defaults.baseSize), 13, 22, name + ".baseSize", warnings);
        screen.headerHeight = clamp(intVal(raw.get("headerHeight"), defaults.headerHeight), 48, 120, name + ".headerHeight", warnings);
        screen.showHero = bool(raw.get("showHero"), defaults.showHero);
        screen.showHeaderTitle = bool(raw.get("showHeaderTitle"), defaults.showHeaderTitle);
        return screen;
    }

    private static List<PortalTheme.Column> columns(Object raw, List<String> warnings) {
        List<PortalTheme.Column> columns = new ArrayList<PortalTheme.Column>();
        if (!(raw instanceof List)) {
            columns.add(new PortalTheme.Column("Поддержка", new PortalTheme.Link("Мои заявки", "/servicedesk/customer/user/requests")));
            return columns;
        }
        List<?> list = (List<?>) raw;
        int limit = Math.min(list.size(), 4);
        for (int i = 0; i < limit; i++) {
            Map<String, Object> item = map(list.get(i));
            if (item.isEmpty() && !(list.get(i) instanceof Map)) {
                continue;
            }
            PortalTheme.Column column = new PortalTheme.Column();
            column.title = text(item.get("title"), "", 60);
            column.links = links(item.get("links"), 8, warnings);
            if (!column.title.isEmpty() || !column.links.isEmpty()) {
                columns.add(column);
            }
        }
        return columns;
    }

    private static List<PortalTheme.Link> links(Object raw, int max, List<String> warnings) {
        List<PortalTheme.Link> links = new ArrayList<PortalTheme.Link>();
        if (!(raw instanceof List)) {
            return links;
        }
        List<?> list = (List<?>) raw;
        for (int i = 0; i < list.size() && links.size() < max; i++) {
            Map<String, Object> item = map(list.get(i));
            String label = text(item.get("label"), "", 60);
            String href = Urls.safeHref(str(item.get("href")));
            if (label.isEmpty()) {
                continue;
            }
            if (href.isEmpty()) {
                warnings.add("link");
                continue;
            }
            links.add(new PortalTheme.Link(label, href));
        }
        return links;
    }

    private static String html(String raw, List<String> warnings, String field) {
        String clean = HtmlSanitizer.sanitize(raw);
        if (raw != null && !raw.trim().isEmpty() && !clean.equals(raw.trim())) {
            warnings.add(field);
        }
        return clean;
    }

    private static String asset(String raw, List<String> warnings, String field) {
        if (raw == null || raw.trim().isEmpty()) {
            return "";
        }
        String safe = Urls.safeAsset(raw.trim());
        if (safe.isEmpty()) {
            warnings.add(field);
        }
        return safe;
    }

    private static String color(Map<String, Object> raw, String key, String fallback, List<String> warnings) {
        String value = str(raw.get(key)).trim();
        if (value.isEmpty()) {
            return fallback;
        }
        String normalized = normalizeColor(value);
        if (normalized == null) {
            warnings.add("colors." + key);
            return fallback;
        }
        return normalized;
    }

    static String normalizeColor(String value) {
        String v = value.trim();
        if (v.matches("(?i)#[0-9a-f]{3}")) {
            char r = v.charAt(1);
            char g = v.charAt(2);
            char b = v.charAt(3);
            return ("#" + r + r + g + g + b + b).toUpperCase(Locale.ROOT);
        }
        if (v.matches("(?i)#[0-9a-f]{6}")) {
            return v.toUpperCase(Locale.ROOT);
        }
        return null;
    }

    private static int snapWeight(int weight) {
        int snapped = Math.round(weight / 100f) * 100;
        if (snapped < 400) {
            return 400;
        }
        if (snapped > 800) {
            return 800;
        }
        return snapped;
    }

    private static int clamp(int value, int min, int max, String field, List<String> warnings) {
        if (value < min || value > max) {
            warnings.add(field);
        }
        return Math.max(min, Math.min(max, value));
    }

    private static double clampDouble(double value, double min, double max) {
        if (Double.isNaN(value)) {
            return min;
        }
        return Math.max(min, Math.min(max, value));
    }

    private static String oneOf(String value, String fallback, String... allowed) {
        if (value == null) {
            return fallback;
        }
        for (String item : allowed) {
            if (item.equals(value)) {
                return item;
            }
        }
        return fallback;
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> map(Object value) {
        if (value instanceof Map) {
            return (Map<String, Object>) value;
        }
        return new LinkedHashMap<String, Object>();
    }

    private static String str(Object value) {
        return value == null ? "" : String.valueOf(value);
    }

    private static String text(Object value, String fallback, int max) {
        if (value == null) {
            return fallback == null ? "" : fallback;
        }
        String text = String.valueOf(value).replace("\u0000", "").replaceAll("[\\r\\n\\t]+", " ").trim();
        if (text.length() > max) {
            text = text.substring(0, max);
        }
        return text;
    }

    private static boolean bool(Object value, boolean fallback) {
        if (value instanceof Boolean) {
            return (Boolean) value;
        }
        if (value instanceof String) {
            if ("true".equalsIgnoreCase((String) value)) {
                return true;
            }
            if ("false".equalsIgnoreCase((String) value)) {
                return false;
            }
        }
        return fallback;
    }

    private static int intVal(Object value, int fallback) {
        if (value instanceof Number) {
            return (int) Math.round(((Number) value).doubleValue());
        }
        if (value instanceof String) {
            try {
                return (int) Math.round(Double.parseDouble(((String) value).trim()));
            } catch (NumberFormatException ignored) {
                return fallback;
            }
        }
        return fallback;
    }

    private static long longVal(Object value, long fallback) {
        if (value instanceof Number) {
            return ((Number) value).longValue();
        }
        return fallback;
    }

    private static double doubleVal(Object value, double fallback) {
        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }
        if (value instanceof String) {
            try {
                return Double.parseDouble(((String) value).trim());
            } catch (NumberFormatException ignored) {
                return fallback;
            }
        }
        return fallback;
    }

    private static List<String> idList(Object raw, List<String> warnings) {
        List<String> ids = new ArrayList<String>();
        if (!(raw instanceof List)) {
            return ids;
        }
        List<?> list = (List<?>) raw;
        for (int i = 0; i < list.size() && ids.size() < 40; i++) {
            String id = str(list.get(i)).trim();
            if (id.matches("[A-Za-z0-9_-]{1,40}")) {
                ids.add(id);
            } else if (!id.isEmpty()) {
                warnings.add("requests.order");
            }
        }
        return ids;
    }
}
