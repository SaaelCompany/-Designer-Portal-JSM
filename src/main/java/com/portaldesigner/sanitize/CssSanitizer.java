package com.portaldesigner.sanitize;

import java.util.Locale;
import java.util.regex.Pattern;

public final class CssSanitizer {
    public static final int MAX_LENGTH = 30000;
    private static final Pattern IMPORT = Pattern.compile("(?i)@import[^;]*;");
    private static final Pattern CHARSET = Pattern.compile("(?i)@charset[^;]*;");
    private static final Pattern FONT_FACE = Pattern.compile("(?i)@font-face\\s*\\{[^{}]*\\}");
    private static final Pattern EXPRESSION = Pattern.compile("(?i)expression\\s*\\(");
    private static final Pattern JS_URL = Pattern.compile("(?i)javascript\\s*:");
    private static final Pattern MOZ_BINDING = Pattern.compile("(?i)-moz-binding\\s*:");
    private static final Pattern BEHAVIOR = Pattern.compile("(?i)behavior\\s*:");

    private CssSanitizer() {
    }

    public static String sanitize(String css) {
        if (css == null || css.trim().isEmpty()) {
            return "";
        }
        String s = css.replace("\u0000", "");
        if (s.length() > MAX_LENGTH) {
            s = s.substring(0, MAX_LENGTH);
        }
        s = s.replace("<", "");
        s = IMPORT.matcher(s).replaceAll("");
        s = CHARSET.matcher(s).replaceAll("");
        s = FONT_FACE.matcher(s).replaceAll("");
        s = EXPRESSION.matcher(s).replaceAll("blocked(");
        s = JS_URL.matcher(s).replaceAll("blocked:");
        s = MOZ_BINDING.matcher(s).replaceAll("blocked:");
        s = BEHAVIOR.matcher(s).replaceAll("blocked:");
        return stripUnsafeUrls(s).trim();
    }

    static String stripUnsafeUrls(String css) {
        String lower = css.toLowerCase(Locale.ROOT);
        StringBuilder out = new StringBuilder();
        int i = 0;
        while (i < css.length()) {
            int at = lower.indexOf("url(", i);
            if (at < 0) {
                out.append(css.substring(i));
                break;
            }
            out.append(css.substring(i, at));
            int j = at + 4;
            while (j < css.length() && Character.isWhitespace(css.charAt(j))) {
                j++;
            }
            if (j >= css.length()) {
                break;
            }
            char quote = css.charAt(j);
            String raw;
            int end;
            if (quote == '"' || quote == '\'') {
                int close = css.indexOf(quote, j + 1);
                if (close < 0) {
                    break;
                }
                raw = css.substring(j + 1, close);
                end = close + 1;
            } else {
                int close = css.indexOf(')', j);
                if (close < 0) {
                    break;
                }
                raw = css.substring(j, close).trim();
                end = close;
            }
            while (end < css.length() && css.charAt(end) != ')') {
                end++;
            }
            if (end < css.length() && css.charAt(end) == ')') {
                end++;
            }
            if (!Urls.safeAsset(raw).isEmpty()) {
                out.append("url(\"").append(Urls.safeAsset(raw).replace("\"", "")).append("\")");
            }
            i = end;
        }
        return out.toString();
    }

}
