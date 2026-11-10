package com.portaldesigner.sanitize;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Allow-list sanitizer for header and footer HTML entered in the editor.
 * Plain-text theme fields are rendered with text nodes and do not pass through here.
 */
public final class HtmlSanitizer {
    public static final int MAX_LENGTH = 20000;

    private static final Set<String> ALLOWED = set(
            "a", "b", "strong", "i", "em", "u", "br", "p", "span", "div",
            "h1", "h2", "h3", "h4", "ul", "ol", "li", "img", "small", "hr", "nav", "section");
    private static final Set<String> VOID = set("br", "img", "hr");
    private static final Set<String> DANGEROUS = set(
            "script", "style", "iframe", "object", "embed", "svg", "math", "noscript", "link", "meta", "base", "form");
    private static final Set<String> STYLE_PROPS = set(
            "color", "background-color", "font-size", "font-weight", "text-align",
            "margin", "padding", "text-decoration", "border-radius", "line-height", "max-width", "font-style");
    private static final Pattern ATTR = Pattern.compile(
            "([A-Za-z_:][-A-Za-z0-9_:.]*)(?:\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s\"'=<>`]+)))?");
    private static final Pattern CLASS_TOKEN = Pattern.compile("[A-Za-z_][-A-Za-z0-9_]{0,40}");
    private static final Pattern STYLE_VALUE = Pattern.compile("[A-Za-z0-9#.,%()\\s\\-]{0,40}");

    private HtmlSanitizer() {
    }

    public static String sanitize(String html) {
        if (html == null || html.trim().isEmpty()) {
            return "";
        }
        String src = html.replace("\u0000", "");
        if (src.length() > MAX_LENGTH) {
            src = src.substring(0, MAX_LENGTH);
        }
        StringBuilder out = new StringBuilder();
        int i = 0;
        while (i < src.length()) {
            int lt = src.indexOf('<', i);
            if (lt < 0) {
                out.append(escapeText(src.substring(i)));
                break;
            }
            out.append(escapeText(src.substring(i, lt)));
            if (region(src, lt, "<!--")) {
                int end = src.indexOf("-->", lt + 4);
                i = end < 0 ? src.length() : end + 3;
                continue;
            }
            int gt = src.indexOf('>', lt + 1);
            if (gt < 0) {
                out.append(escapeText(src.substring(lt)));
                break;
            }
            String raw = src.substring(lt + 1, gt).trim();
            i = gt + 1;
            if (raw.isEmpty() || raw.charAt(0) == '!' || raw.charAt(0) == '?') {
                continue;
            }
            boolean close = raw.charAt(0) == '/';
            if (close) {
                raw = raw.substring(1).trim();
            }
            boolean self = raw.endsWith("/");
            if (self) {
                raw = raw.substring(0, raw.length() - 1).trim();
            }
            String name = tagName(raw);
            String lower = name.toLowerCase(Locale.ROOT);
            if (!ALLOWED.contains(lower)) {
                if (!close && DANGEROUS.contains(lower)) {
                    i = skipClose(src, i, lower);
                }
                continue;
            }
            if (close) {
                if (!VOID.contains(lower)) {
                    out.append("</").append(lower).append('>');
                }
                continue;
            }
            String attrs = attributes(lower, raw.substring(Math.min(name.length(), raw.length())));
            if (("a".equals(lower) && !attrs.contains("href=")) || ("img".equals(lower) && !attrs.contains("src="))) {
                if ("img".equals(lower)) {
                    continue;
                }
            }
            out.append('<').append(lower);
            if (!attrs.isEmpty()) {
                out.append(' ').append(attrs);
            }
            if (self || VOID.contains(lower)) {
                out.append(" />");
            } else {
                out.append('>');
            }
        }
        return out.toString();
    }

    private static int skipClose(String src, int from, String tag) {
        String needle = "</" + tag;
        String lower = src.toLowerCase(Locale.ROOT);
        int at = lower.indexOf(needle, from);
        if (at < 0) {
            return src.length();
        }
        int gt = src.indexOf('>', at);
        return gt < 0 ? src.length() : gt + 1;
    }

    private static String attributes(String tag, String raw) {
        List<String> kept = new ArrayList<String>();
        boolean blankTarget = false;
        Matcher matcher = ATTR.matcher(raw);
        while (matcher.find()) {
            String attr = matcher.group(1).toLowerCase(Locale.ROOT);
            String value = matcher.group(2);
            if (value == null) {
                value = matcher.group(3);
            }
            if (value == null) {
                value = matcher.group(4);
            }
            if (value == null || attr.startsWith("on")) {
                continue;
            }
            if ("class".equals(attr)) {
                String classes = safeClasses(value);
                if (!classes.isEmpty()) {
                    kept.add("class=\"" + escapeAttr(classes) + "\"");
                }
            } else if ("style".equals(attr)) {
                String style = safeStyle(value);
                if (!style.isEmpty()) {
                    kept.add("style=\"" + escapeAttr(style) + "\"");
                }
            } else if ("title".equals(attr) || ("alt".equals(attr) && "img".equals(tag))) {
                kept.add(attr + "=\"" + escapeAttr(truncate(value, 200)) + "\"");
            } else if ("href".equals(attr) && "a".equals(tag)) {
                String href = Urls.safeHref(value);
                if (!href.isEmpty()) {
                    kept.add("href=\"" + escapeAttr(href) + "\"");
                }
            } else if ("src".equals(attr) && "img".equals(tag)) {
                String src = Urls.safeAsset(value);
                if (!src.isEmpty()) {
                    kept.add("src=\"" + escapeAttr(src) + "\"");
                }
            } else if ("target".equals(attr) && "a".equals(tag) && "_blank".equalsIgnoreCase(value.trim())) {
                blankTarget = true;
            }
        }
        if (blankTarget) {
            kept.add("target=\"_blank\"");
            kept.add("rel=\"noopener noreferrer\"");
        }
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < kept.size(); i++) {
            if (i > 0) {
                out.append(' ');
            }
            out.append(kept.get(i));
        }
        return out.toString();
    }

    private static String safeClasses(String value) {
        String[] parts = value.trim().split("\\s+");
        StringBuilder out = new StringBuilder();
        int count = 0;
        for (String part : parts) {
            if (count >= 6) {
                break;
            }
            if (part.startsWith("pd-") && CLASS_TOKEN.matcher(part).matches()) {
                if (out.length() > 0) {
                    out.append(' ');
                }
                out.append(part);
                count++;
            }
        }
        return out.toString();
    }

    private static String safeStyle(String value) {
        if (value.toLowerCase(Locale.ROOT).contains("url(") || value.toLowerCase(Locale.ROOT).contains("expression")) {
            return "";
        }
        String[] parts = value.split(";");
        StringBuilder out = new StringBuilder();
        for (String part : parts) {
            int colon = part.indexOf(':');
            if (colon <= 0) {
                continue;
            }
            String prop = part.substring(0, colon).trim().toLowerCase(Locale.ROOT);
            String propValue = part.substring(colon + 1).trim();
            if (!STYLE_PROPS.contains(prop) || !STYLE_VALUE.matcher(propValue).matches()) {
                continue;
            }
            if (out.length() > 0) {
                out.append("; ");
            }
            out.append(prop).append(": ").append(propValue);
        }
        return out.toString();
    }

    private static String tagName(String raw) {
        int end = 0;
        while (end < raw.length()) {
            char c = raw.charAt(end);
            if (c == ' ' || c == '\t' || c == '\n' || c == '\r' || c == '/') {
                break;
            }
            end++;
        }
        return raw.substring(0, end);
    }

    private static boolean region(String src, int at, String token) {
        return src.regionMatches(true, at, token, 0, token.length());
    }

    private static String truncate(String value, int max) {
        String clean = value.replace("\u0000", "");
        return clean.length() <= max ? clean : clean.substring(0, max);
    }

    static String escapeText(String value) {
        return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }

    private static String escapeAttr(String value) {
        return escapeText(value).replace("\"", "&quot;");
    }

    private static Set<String> set(String... values) {
        return new HashSet<String>(Arrays.asList(values));
    }
}
