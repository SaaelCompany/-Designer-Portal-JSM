package com.portaldesigner.servlet;

import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class DesignerPageTest {
    @Test
    public void editorAsksJiraForTheAdminHeaderAndSidebar() throws Exception {
        String html = resource("/ui/designer.html");
        assertTrue(html.contains("<meta name=\"decorator\" content=\"atl.admin\"/>"));
        assertTrue(html.contains("<meta name=\"admin.active.section\" content=\"admin_plugins_menu/portal-designer-section\"/>"));
        assertTrue(html.contains("<meta name=\"admin.active.tab\" content=\"portal-designer-admin-link\"/>"));
        assertTrue(html.contains("id=\"pd-app\""));
        assertFalse(html.contains("id=\"app\""));
    }

    @Test
    public void editorStylesStayInsideTheAdminContentColumn() throws Exception {
        String css = resource("/ui/designer.css");
        assertTrue(css.contains("#pd-app"));
        assertFalse(css.contains("html, body"));
        assertFalse(css.contains("\n* {"));
        String js = resource("/ui/designer.js");
        assertTrue(js.contains("getElementById(\"pd-app\")"));
        assertTrue(js.contains("aui-page-panel-content"));
        assertFalse(js.contains("getElementById(\"app\")"));
    }

    @Test
    public void russianMenuTextIsPlainPropertiesAndSpringStartsThePlugin() throws Exception {
        String properties = resource("/portal-designer_ru_RU.properties");
        assertTrue(properties.contains("\\u041a\\u043e\\u043d\\u0441\\u0442\\u0440\\u0443\\u043a\\u0442\\u043e\\u0440"));
        for (int i = 0; i < properties.length(); i++) {
            assertTrue(properties.charAt(i) < 128);
        }
        String spring = resource("/META-INF/spring/plugin-context.xml");
        assertTrue(spring.contains("atlassian-scanner:scan-indexes"));
        assertTrue(spring.contains("atlassian-scanner/2"));
    }

    private static String resource(String path) throws Exception {
        InputStream in = DesignerPageTest.class.getResourceAsStream(path);
        if (in == null) {
            throw new IllegalStateException("missing " + path);
        }
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int read;
            while ((read = in.read(buffer)) >= 0) {
                out.write(buffer, 0, read);
            }
            return new String(out.toByteArray(), StandardCharsets.UTF_8);
        } finally {
            in.close();
        }
    }
}
