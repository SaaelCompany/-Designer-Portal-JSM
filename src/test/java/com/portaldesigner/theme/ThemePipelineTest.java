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
        assertTrue(css.contains("pd-replace"));
        assertTrue(js.contains("PortalDesigner"));
        assertTrue(js.contains("public-theme"));
        assertTrue(js.contains("MutationObserver"));
        assertTrue(js.contains("pd-replace"));
        assertTrue(js.contains("readCatalog"));
    }

    @Test
    public void pageBlocksRoundTripAndDropUnknownTypes() {
        Map<String, Object> stored = ThemeMapper.toMap(ThemePresets.classic());
        List<Map<String, Object>> blocks = new ArrayList<Map<String, Object>>();
        Map<String, Object> text = new LinkedHashMap<String, Object>();
        text.put("id", "note");
        text.put("type", "text");
        text.put("visible", Boolean.TRUE);
        text.put("title", "Справка");
        text.put("text", "Позвоните");
        Map<String, Object> evil = new LinkedHashMap<String, Object>();
        evil.put("id", "script");
        evil.put("type", "script");
        evil.put("title", "nope");
        blocks.add(text);
        blocks.add(evil);
        stored.put("blocks", blocks);
        MappedTheme mapped = ThemeMapper.fromMap(stored);
        assertEquals(1, mapped.theme.blocks.size());
        assertEquals("note", mapped.theme.blocks.get(0).id);
        assertEquals("Справка", mapped.theme.blocks.get(0).title);
        assertTrue(mapped.warnings.contains("blocks"));
    }

    @Test
    public void requestOrderRoundTripsAndDropsUnsafeIds() {
        PortalTheme theme = ThemePresets.classic();
        theme.requests.order.add("12");
        theme.requests.order.add("10");
        Map<String, Object> stored = ThemeMapper.toMap(theme);
        @SuppressWarnings("unchecked")
        Map<String, Object> requests = (Map<String, Object>) stored.get("requests");
        @SuppressWarnings("unchecked")
        java.util.List<String> incoming = new java.util.ArrayList<String>();
        incoming.add("15");
        incoming.add("../etc");
        incoming.add("11");
        requests.put("order", incoming);
        MappedTheme mapped = ThemeMapper.fromMap(stored);
        assertEquals(java.util.Arrays.asList("15", "11"), mapped.theme.requests.order);
        assertTrue(mapped.warnings.contains("requests.order"));
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
