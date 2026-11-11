package com.portaldesigner.theme;

import com.portaldesigner.css.ThemeCompiler;
import com.portaldesigner.json.Json;
import com.portaldesigner.service.ThemeService;
import com.portaldesigner.store.MemoryThemeRepository;
import org.junit.Test;

import java.io.DataInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class ThemePipelineTest {
    private final ThemeService service = new ThemeService(new MemoryThemeRepository(), new ThemeCompiler());

    @Test
    public void unpublishedPortalStaysUnthemed() {
        Map<String, Object> body = service.publicTheme("global");
        assertEquals(Boolean.FALSE, body.get("enabled"));
        assertFalse(body.containsKey("css"));
    }

    @Test
    public void globalThemeCoversPortalsUntilTheyOptOut() {
        Map<String, Object> saved = publish("global", true);
        assertEquals(Boolean.TRUE, service.publicTheme("12").get("enabled"));
        assertEquals("global", service.publicTheme("12").get("source"));

        @SuppressWarnings("unchecked")
        Map<String, Object> theme = (Map<String, Object>) saved.get("theme");
        theme.put("useGlobal", Boolean.FALSE);
        theme.put("enabled", Boolean.FALSE);
        service.save("12", Json.stringify(theme));
        assertEquals(Boolean.FALSE, service.publicTheme("12").get("enabled"));
        assertEquals("portal", service.publicTheme("12").get("source"));
        assertEquals(Boolean.TRUE, service.publicTheme("13").get("enabled"));
    }

    @Test
    public void saveStripsScriptFromCustomHtml() {
        PortalTheme theme = ThemePresets.classic();
        theme.enabled = true;
        theme.header.customHtml = "<script>alert(1)</script><p>Шапка</p>";
        theme.customCss = "body{color:red}</style><script>alert(1)</script>";
        Map<String, Object> saved = service.save("global", Json.stringify(ThemeMapper.toMap(theme)));
        @SuppressWarnings("unchecked")
        Map<String, Object> stored = (Map<String, Object>) saved.get("theme");
        @SuppressWarnings("unchecked")
        Map<String, Object> header = (Map<String, Object>) stored.get("header");
        String html = String.valueOf(header.get("customHtml"));
        String css = String.valueOf(saved.get("css"));
        assertFalse(html.toLowerCase().contains("script"));
        assertTrue(html.contains("Шапка"));
        assertFalse(css.toLowerCase().contains("<script"));
        assertTrue(css.contains("--pd-primary:"));
    }

    @Test
    public void compilerEmitsResponsiveOverridesAfterDesktop() {
        PortalTheme theme = ThemePresets.contrast();
        theme.responsive.mobile.showHero = false;
        theme.responsive.mobile.showHeaderTitle = false;
        String css = new ThemeCompiler().compile(theme);
        int tablet = css.indexOf("@media (max-width: " + theme.responsive.tabletMax + "px)");
        int mobile = css.indexOf("@media (max-width: " + theme.responsive.mobileMax + "px)");
        assertTrue(tablet >= 0);
        assertTrue(mobile > tablet);
        assertTrue(css.contains("#pd-hero{display:none !important;}"));
        assertTrue(css.contains(".pd-brand-title{display:none !important;}"));
        assertTrue(css.contains("--pd-cols:" + theme.requests.columns));
        assertTrue(css.contains("min-height:48px"));
    }

    @Test
    public void customFontCardShapeAndOrderAreKept() {
        PortalTheme theme = ThemePresets.classic();
        theme.typography.customFont = "Manrope, \"Segoe UI\"";
        theme.requests.radius = 28;
        theme.requests.size = "l";
        theme.requests.order.add("4");
        theme.requests.order.add("1");
        Map<String, Object> saved = service.save("global", Json.stringify(ThemeMapper.toMap(theme)));
        String css = String.valueOf(saved.get("css"));
        assertTrue(css.contains("--pd-font:Manrope, \"Segoe UI\""));
        assertTrue(css.contains("--pd-card-radius:28px"));
        @SuppressWarnings("unchecked")
        Map<String, Object> stored = (Map<String, Object>) saved.get("theme");
        @SuppressWarnings("unchecked")
        Map<String, Object> requests = (Map<String, Object>) stored.get("requests");
        assertEquals("l", requests.get("size"));
        assertEquals(Arrays.asList("4", "1"), requests.get("order"));

        theme.typography.customFont = "Arial;background:url(http://evil)";
        MappedTheme mapped = ThemeMapper.fromMap(ThemeMapper.toMap(theme));
        assertEquals("", mapped.theme.typography.customFont);
    }

    @Test
    public void canvasPlacementAndWidgetsRoundTrip() {
        Map<String, Object> raw = new LinkedHashMap<String, Object>();
        Map<String, Object> canvas = new LinkedHashMap<String, Object>();
        Map<String, Object> desktop = new LinkedHashMap<String, Object>();
        Map<String, Object> header = new LinkedHashMap<String, Object>();
        header.put("free", Boolean.TRUE);
        header.put("x", Integer.valueOf(12));
        header.put("y", Integer.valueOf(40));
        header.put("w", Integer.valueOf(480));
        header.put("h", Integer.valueOf(72));
        desktop.put("header", header);
        desktop.put("card-4", header);
        desktop.put("nope", header);
        canvas.put("desktop", desktop);

        List<Map<String, Object>> widgets = new ArrayList<Map<String, Object>>();
        Map<String, Object> widget = new LinkedHashMap<String, Object>();
        widget.put("id", "w1");
        widget.put("type", "html");
        widget.put("html", "<p>ok</p><script>alert(1)</script>");
        widget.put("href", "javascript:alert(1)");
        widget.put("imageUrl", "https://cdn.example/a.png");
        Map<String, Object> spot = new LinkedHashMap<String, Object>();
        spot.put("free", Boolean.TRUE);
        spot.put("x", Integer.valueOf(30));
        spot.put("y", Integer.valueOf(200));
        spot.put("w", Integer.valueOf(280));
        spot.put("h", Integer.valueOf(120));
        widget.put("desktop", spot);
        widgets.add(widget);
        Map<String, Object> evil = new LinkedHashMap<String, Object>();
        evil.put("id", "bad id");
        evil.put("type", "text");
        evil.put("text", "nope");
        widgets.add(evil);
        canvas.put("widgets", widgets);
        raw.put("canvas", canvas);

        PortalTheme theme = ThemeMapper.fromMap(raw).theme;
        assertTrue(theme.canvas.desktop.get("header").free);
        assertEquals(12, theme.canvas.desktop.get("header").x);
        assertTrue(theme.canvas.desktop.containsKey("card-4"));
        assertFalse(theme.canvas.desktop.containsKey("nope"));
        assertEquals(1, theme.canvas.widgets.size());
        assertFalse(theme.canvas.widgets.get(0).html.toLowerCase().contains("script"));
        assertTrue(theme.canvas.widgets.get(0).html.contains("ok"));
        assertEquals("", theme.canvas.widgets.get(0).href);
        assertEquals("https://cdn.example/a.png", theme.canvas.widgets.get(0).imageUrl);
        assertEquals(30, theme.canvas.widgets.get(0).desktop.x);

        PortalTheme again = ThemeMapper.fromMap(ThemeMapper.toMap(theme)).theme;
        assertEquals(12, again.canvas.desktop.get("header").x);
        assertEquals(480, again.canvas.desktop.get("header").w);
        assertEquals(30, again.canvas.widgets.get(0).desktop.x);
        assertEquals("html", again.canvas.widgets.get(0).type);

        String js = readQuiet("/js/portal.js");
        assertTrue(js.contains("data-pd-canvas"));
        assertTrue(js.contains("pd-widgets"));
        assertTrue(js.contains("pdPreview=1"));
        assertTrue(js.contains("clearTouched"));
        String scoped = readQuiet("/css/portal.css");
        assertTrue(scoped.contains("data-pd-page=\"project\"] [data-pd-region=\"requests\"]"));
        assertTrue(scoped.contains("data-pd-chrome=\"quiet\""));
        assertTrue(scoped.contains("pd-tip-bubble"));
        String css = readQuiet("/css/portal.css");
        assertTrue(css.contains("pd-free"));
        assertTrue(css.contains("pd-widget"));
    }

    private static String readQuiet(String path) {
        try {
            return read(path);
        } catch (Exception ex) {
            throw new AssertionError(ex);
        }
    }

    @Test
    public void elementRulesAndTooltipsStaySanitized() {
        Map<String, Object> raw = new LinkedHashMap<String, Object>();
        List<Map<String, Object>> elements = new ArrayList<Map<String, Object>>();
        Map<String, Object> rule = new LinkedHashMap<String, Object>();
        rule.put("id", "e1");
        rule.put("page", "requests");
        rule.put("selector", ".cv-request-summary");
        rule.put("label", "Тема");
        Map<String, Object> look = new LinkedHashMap<String, Object>();
        look.put("color", "#172B4D");
        look.put("background", "#FFFFFF");
        look.put("fontSize", Integer.valueOf(18));
        look.put("radius", Integer.valueOf(6));
        look.put("fontFamily", "Manrope, Segoe UI");
        rule.put("look", look);
        elements.add(rule);
        Map<String, Object> evil = new LinkedHashMap<String, Object>();
        evil.put("id", "e2");
        evil.put("selector", "div;background:expression(1)");
        evil.put("label", "bad");
        elements.add(evil);
        raw.put("elements", elements);

        List<Map<String, Object>> widgets = new ArrayList<Map<String, Object>>();
        Map<String, Object> tip = new LinkedHashMap<String, Object>();
        tip.put("id", "wtip");
        tip.put("type", "tooltip");
        tip.put("page", "requests");
        tip.put("text", "Как открыть заявку");
        tip.put("target", ".cv-request-summary");
        widgets.add(tip);
        Map<String, Object> canvas = new LinkedHashMap<String, Object>();
        canvas.put("widgets", widgets);
        raw.put("canvas", canvas);

        PortalTheme theme = ThemeMapper.fromMap(raw).theme;
        assertEquals(1, theme.elements.size());
        assertEquals("requests", theme.elements.get(0).page);
        assertEquals(".cv-request-summary", theme.elements.get(0).selector);
        assertEquals(18, theme.elements.get(0).look.fontSize);
        assertEquals(6, theme.elements.get(0).look.radius);
        assertEquals("#172B4D", theme.elements.get(0).look.color);
        assertEquals(1, theme.canvas.widgets.size());
        assertEquals("tooltip", theme.canvas.widgets.get(0).type);
        assertEquals("requests", theme.canvas.widgets.get(0).page);
        assertEquals(".cv-request-summary", theme.canvas.widgets.get(0).target);

        PortalTheme again = ThemeMapper.fromMap(ThemeMapper.toMap(theme)).theme;
        assertEquals(18, again.elements.get(0).look.fontSize);
        assertEquals("tooltip", again.canvas.widgets.get(0).type);
    }

    @Test
    public void menusAndFormRadiusRoundTrip() {
        Map<String, Object> raw = new LinkedHashMap<String, Object>();
        Map<String, Object> menu = new LinkedHashMap<String, Object>();
        menu.put("mode", "replace");
        menu.put("direction", "column");
        menu.put("radius", Integer.valueOf(0));
        menu.put("color", "#172B4D");
        List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
        Map<String, Object> item = new LinkedHashMap<String, Object>();
        item.put("label", "Порталы");
        item.put("href", "{portals}");
        items.add(item);
        menu.put("items", items);
        raw.put("portalMenu", menu);
        Map<String, Object> form = new LinkedHashMap<String, Object>();
        form.put("radius", Integer.valueOf(0));
        form.put("fontFamily", "Segoe UI");
        raw.put("form", form);

        PortalTheme theme = ThemeMapper.fromMap(raw).theme;
        assertEquals("column", theme.portalMenu.direction);
        assertEquals(0, theme.portalMenu.radius);
        assertEquals(1, theme.portalMenu.items.size());
        assertEquals("{portals}", theme.portalMenu.items.get(0).href);
        assertEquals(0, theme.form.radius);

        PortalTheme again = ThemeMapper.fromMap(ThemeMapper.toMap(theme)).theme;
        assertEquals(0, again.portalMenu.radius);
        assertEquals(0, again.form.radius);
        assertEquals("column", again.portalMenu.direction);
    }

    @Test
    public void stylesheetAndCompilerShareTheSameContract() throws Exception {
        String css = read("/css/portal.css");
        for (String token : new String[]{
                "--pd-primary", "--pd-cols", "--pd-hero-h", "--pd-font", "--pd-page-pad",
                "#pd-hero", "#pd-header", "#pd-footer", "data-pd-hero", "data-pd-layout",
                "[data-pd-card]", "[data-pd-region=\"requests\"]"
        }) {
            assertTrue("missing " + token, css.contains(token));
        }
        String js = read("/js/portal.js");
        assertTrue(js.contains("PortalDesigner"));
        assertTrue(js.contains("public-theme"));
        assertTrue(js.contains("MutationObserver"));
    }

    @Test
    public void presetsRoundTripAndCompile() {
        for (ThemePresets.Preset preset : ThemePresets.all()) {
            String json = Json.stringify(preset.toMap().get("theme"));
            PortalTheme theme = ThemeMapper.fromMap(cast(Json.parse(json))).theme;
            assertEquals(preset.theme.name, theme.name);
            String css = new ThemeCompiler().compile(theme);
            assertTrue(css.contains(theme.colors.headerBg));
            assertNotNull(css);
        }
    }

    @Test
    public void rejectsBadPortalIdAndJson() {
        try {
            service.publicTheme("abc");
        } catch (ThemeException ex) {
            assertEquals("invalid_portal", ex.code());
        }
        try {
            service.save("global", "[1,2]");
        } catch (ThemeException ex) {
            assertEquals("invalid_json", ex.code());
        }
    }

    @Test
    public void classFilesTargetJava8() throws Exception {
        assertEquals(52, major(ThemeCompiler.class));
        assertEquals(52, major(ThemeService.class));
        assertEquals(52, major(Json.class));
    }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> cast(Object value) {
        return (Map<String, Object>) value;
    }

    private Map<String, Object> publish(String portalId, boolean enabled) {
        PortalTheme theme = ThemePresets.classic();
        theme.enabled = enabled;
        return service.save(portalId, Json.stringify(ThemeMapper.toMap(theme)));
    }

    private static String read(String path) {
        InputStream in = ThemePipelineTest.class.getResourceAsStream(path);
        assertNotNull(path);
        Scanner scanner = new Scanner(in, StandardCharsets.UTF_8.name()).useDelimiter("\\A");
        return scanner.hasNext() ? scanner.next() : "";
    }

    private static int major(Class<?> type) throws Exception {
        InputStream in = type.getResourceAsStream(type.getSimpleName() + ".class");
        DataInputStream data = new DataInputStream(in);
        try {
            assertEquals(0xCAFEBABE, data.readInt());
            data.readUnsignedShort();
            return data.readUnsignedShort();
        } finally {
            data.close();
        }
    }
}
