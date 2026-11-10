package com.portaldesigner.sanitize;

import java.util.Locale;
import java.util.regex.Pattern;

public final class Urls {
    private static final Pattern HTTP = Pattern.compile("https?://[A-Za-z0-9._~:/?#\\[\\]@!$&'()*+,;=%\\-]{1,1000}");
    private static final Pattern ROOTED = Pattern.compile("/[A-Za-z0-9._~:/?#\\[\\]@!$&'()*+,;=%\\-]{0,1000}");
    private static final Pattern RELATIVE = Pattern.compile("[A-Za-z0-9._~/?#=&%+\\-]{1,500}");
    private static final Pattern MAILTO = Pattern.compile("(?i)mailto:[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}");
    private static final Pattern HASH = Pattern.compile("#[A-Za-z0-9_\\-]*");
    private static final Pattern DATA_IMAGE = Pattern.compile("(?i)data:image/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+");

    private Urls() {
    }

    public static String safeHref(String raw) {
        String value = clean(raw);
        if (value.isEmpty() || value.length() > 500) {
            return "";
        }
        String lower = value.toLowerCase(Locale.ROOT);
        if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
            return "";
        }
        if (value.startsWith("#")) {
            return HASH.matcher(value).matches() ? value : "";
        }
        if (lower.startsWith("mailto:")) {
            return MAILTO.matcher(value).matches() ? value : "";
        }
        if (value.startsWith("//") || value.indexOf('\\') >= 0 || value.indexOf(' ') >= 0) {
            return "";
        }
        if (value.startsWith("/")) {
            return ROOTED.matcher(value).matches() ? value : "";
        }
        if (lower.startsWith("http://") || lower.startsWith("https://")) {
            return HTTP.matcher(value).matches() ? value : "";
        }
        if (value.indexOf(':') >= 0) {
            return "";
        }
        return RELATIVE.matcher(value).matches() ? value : "";
    }

    public static String safeAsset(String raw) {
        String value = clean(raw);
        if (value.isEmpty()) {
            return "";
        }
        if (value.regionMatches(true, 0, "data:image/", 0, 11)) {
            if (value.length() > 120000 || !DATA_IMAGE.matcher(value).matches()) {
                return "";
            }
            return value;
        }
        if (value.length() > 1000) {
            return "";
        }
        String lower = value.toLowerCase(Locale.ROOT);
        if (value.startsWith("//") || lower.startsWith("javascript:") || lower.startsWith("data:")) {
            return "";
        }
        if (value.startsWith("/")) {
            return ROOTED.matcher(value).matches() ? value : "";
        }
        if (lower.startsWith("http://") || lower.startsWith("https://")) {
            return HTTP.matcher(value).matches() ? value : "";
        }
        return "";
    }

    public static String cssUrl(String raw) {
        String safe = safeAsset(raw);
        if (safe.isEmpty()) {
            return "none";
        }
        return "url(\"" + safe.replace("\\", "").replace("\"", "") + "\")";
    }

    private static String clean(String raw) {
        if (raw == null) {
            return "";
        }
        String value = raw.trim();
        if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.substring(1, value.length() - 1).trim();
        }
        return value.replace("\u0000", "");
    }
}
