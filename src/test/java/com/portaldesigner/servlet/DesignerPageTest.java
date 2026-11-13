package com.portaldesigner.servlet;

import org.junit.Test;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import static org.junit.Assert.assertTrue;

public class DesignerPageTest {
    @Test
    public void designerPageIsAnAdminPageInsideJira() throws Exception {
        InputStream in = DesignerServlet.class.getResourceAsStream("/ui/designer.html");
        byte[] data = new byte[8192];
        int read = in.read(data);
        in.close();
        String html = new String(data, 0, read, StandardCharsets.UTF_8);
        assertTrue(html.contains("name=\"decorator\" content=\"atl.admin\""));
        assertTrue(html.contains("name=\"admin.active.section\" content=\"admin_plugins_menu/portal-designer-section\""));
        assertTrue(html.contains("name=\"admin.active.tab\" content=\"portal-designer-admin-link\""));
    }
}
