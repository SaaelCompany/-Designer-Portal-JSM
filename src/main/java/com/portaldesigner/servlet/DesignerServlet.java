package com.portaldesigner.servlet;

import com.atlassian.jira.security.GlobalPermissionManager;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.portaldesigner.json.Json;
import com.portaldesigner.security.AdminGuard;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Named
public class DesignerServlet extends HttpServlet {
    private static final Logger log = LoggerFactory.getLogger(DesignerServlet.class);
    private static final String PLUGIN_KEY = "com.portaldesigner.portal-designer";

    private final JiraAuthenticationContext auth;
    private final GlobalPermissionManager permissions;

    @Inject
    public DesignerServlet(@ComponentImport JiraAuthenticationContext auth,
                           @ComponentImport GlobalPermissionManager permissions) {
        this.auth = auth;
        this.permissions = permissions;
    }

    @Override
    public void init() {
        log.info("Portal Designer editor is at /plugins/servlet/portal-designer");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (!AdminGuard.isLoggedIn(auth)) {
            String destination = URLEncoder.encode("/plugins/servlet/portal-designer", "UTF-8");
            response.sendRedirect(request.getContextPath() + "/login.jsp?os_destination=" + destination);
            return;
        }
        if (AdminGuard.requireAdmin(auth, permissions) == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("text/html; charset=UTF-8");
            response.getWriter().write("<!DOCTYPE html><meta charset=\"utf-8\"><title>Portal Designer</title>"
                    + "<p>Нужны права администратора Jira, чтобы открыть конструктор портала.</p>");
            return;
        }
        String html = template();
        String projectKey = safeProjectKey(request.getParameter("projectKey"));
        html = html.replace("@@CONTEXT@@", request.getContextPath())
                .replace("@@PLUGIN_KEY@@", PLUGIN_KEY)
                .replace("@@CONTEXT_JSON@@", Json.stringify(request.getContextPath()))
                .replace("@@KEY_JSON@@", Json.stringify(PLUGIN_KEY))
                .replace("@@PROJECT_JSON@@", Json.stringify(projectKey));
        response.setContentType("text/html; charset=UTF-8");
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("X-Frame-Options", "SAMEORIGIN");
        response.getWriter().write(html);
    }

    private static String safeProjectKey(String value) {
        if (value == null) {
            return "";
        }
        String key = value.trim();
        return key.matches("[A-Za-z][A-Za-z0-9_]{1,40}") ? key : "";
    }

    private static String template() throws IOException {
        InputStream in = DesignerServlet.class.getResourceAsStream("/ui/designer.html");
        if (in == null) {
            throw new IOException("designer.html missing");
        }
        try {
            byte[] data = readAll(in);
            return new String(data, StandardCharsets.UTF_8);
        } finally {
            in.close();
        }
    }

    private static byte[] readAll(InputStream in) throws IOException {
        byte[] buffer = new byte[4096];
        int read;
        java.io.ByteArrayOutputStream out = new java.io.ByteArrayOutputStream();
        while ((read = in.read(buffer)) >= 0) {
            out.write(buffer, 0, read);
        }
        return out.toByteArray();
    }
}
