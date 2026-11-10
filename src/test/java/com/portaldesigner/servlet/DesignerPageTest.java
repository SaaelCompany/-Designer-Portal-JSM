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
