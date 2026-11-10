package com.portaldesigner.servlet;

import java.util.Locale;

/** Inserts the portal runtime into customer-portal HTML. Idempotent. */
public final class PortalSnippet {
    static final String MARKER = "data-portal-designer=\"runtime\"";

    private PortalSnippet() {
    }

    public static boolean shouldRewrite(String method, int status, String contentType, String encoding) {
        if (method == null || !"GET".equalsIgnoreCase(method) || status >= 300 || status < 200) {
            return false;
        }
        if (encoding != null && encoding.toLowerCase(Locale.ROOT).contains("gzip")) {
            return false;
        }
        if (contentType == null) {
            return false;
        }
        return contentType.toLowerCase(Locale.ROOT).contains("text/html");
    }

    public static String inject(String html, String scriptUrl) {
        if (html == null || html.contains(MARKER) || scriptUrl == null || scriptUrl.isEmpty()) {
            return html;
        }
        String lower = html.toLowerCase(Locale.ROOT);
        if (!lower.contains("<html") && !lower.contains("<!doctype html")) {
            return html;
        }
        String tag = "<script " + MARKER + " src=\"" + escapeAttr(scriptUrl) + "\" defer></script>";
        int head = lower.indexOf("</head>");
        if (head >= 0) {
            return html.substring(0, head) + tag + html.substring(head);
        }
        return html;
    }

    static String escapeAttr(String value) {
        return value.replace("&", "&amp;").replace("\"", "&quot;").replace("<", "");
    }
}
