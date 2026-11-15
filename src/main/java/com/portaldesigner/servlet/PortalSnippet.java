package com.portaldesigner.servlet;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Locale;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/** Inserts the portal runtime into customer-portal HTML. Idempotent. */
public final class PortalSnippet {
    static final String MARKER = "data-portal-designer=\"runtime\"";
    static final String HOLD = "data-portal-designer=\"hold\"";

    private PortalSnippet() {
    }

    public static boolean shouldRewrite(String method, int status, String contentType, String encoding) {
        if (method == null || !"GET".equalsIgnoreCase(method) || status >= 300 || status < 200) {
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
        String tag = "<style " + HOLD + ">html.pd-hold body{visibility:hidden!important}</style>"
                + "<script " + HOLD + ">(function(){var e=document.documentElement;"
                + "if((' '+e.className+' ').indexOf(' pd-hold ')<0){e.className=(e.className?e.className+' ':'')+'pd-hold';}"
                + "setTimeout(function(){e.className=(' '+e.className+' ').replace(' pd-hold ',' ').replace(/^\\s+|\\s+$/g,'');},4000);"
                + "})();</script>"
                + "<script " + MARKER + " src=\"" + escapeAttr(scriptUrl) + "\" defer></script>";
        int head = lower.indexOf("</head>");
        if (head >= 0) {
            return html.substring(0, head) + tag + html.substring(head);
        }
        return html;
    }

    public static boolean isGzip(String encoding) {
        return encoding != null && encoding.toLowerCase(Locale.ROOT).contains("gzip");
    }

    public static byte[] ungzip(byte[] gzipped) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        GZIPInputStream in = new GZIPInputStream(new ByteArrayInputStream(gzipped));
        try {
            byte[] buffer = new byte[4096];
            int read;
            while ((read = in.read(buffer)) >= 0) {
                out.write(buffer, 0, read);
            }
        } finally {
            in.close();
        }
        return out.toByteArray();
    }

    public static byte[] gzip(byte[] plain) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        GZIPOutputStream zip = new GZIPOutputStream(out);
        zip.write(plain);
        zip.close();
        return out.toByteArray();
    }

    static String escapeAttr(String value) {
        return value.replace("&", "&amp;").replace("\"", "&quot;").replace("<", "");
    }
}
