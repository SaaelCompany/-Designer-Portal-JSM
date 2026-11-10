package com.portaldesigner.json;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Small JSON reader and writer for the theme document.
 * The plugin does not bundle a JSON library, so the OSGi import stays inside Jira's public API.
 */
public final class Json {
    private Json() {
    }

    public static final class ParseException extends IllegalArgumentException {
        public ParseException(String message) {
            super(message);
        }
    }

    public static Object parse(String text) {
        if (text == null) {
            throw new ParseException("empty");
        }
        Parser parser = new Parser(text);
        Object value = parser.value();
        parser.skip();
        if (parser.i != parser.s.length()) {
            throw new ParseException("trailing");
        }
        return value;
    }

    public static String stringify(Object value) {
        StringBuilder out = new StringBuilder();
        write(out, value);
        return out.toString();
    }

    @SuppressWarnings("unchecked")
    private static void write(StringBuilder out, Object value) {
        if (value == null) {
            out.append("null");
        } else if (value instanceof String) {
            writeString(out, (String) value);
        } else if (value instanceof Boolean) {
            out.append(value.toString());
        } else if (value instanceof Integer || value instanceof Long) {
            out.append(value.toString());
        } else if (value instanceof Double) {
            double d = (Double) value;
            if (Double.isNaN(d) || Double.isInfinite(d)) {
                out.append("null");
            } else if (d == Math.rint(d) && Math.abs(d) < 1.0e15d) {
                out.append(Long.toString((long) d));
            } else {
                out.append(Double.toString(d));
            }
        } else if (value instanceof Float) {
            write(out, Double.valueOf(((Float) value).doubleValue()));
        } else if (value instanceof Map) {
            out.append('{');
            boolean first = true;
            for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
                if (!(entry.getKey() instanceof String)) {
                    continue;
                }
                if (!first) {
                    out.append(',');
                }
                first = false;
                writeString(out, (String) entry.getKey());
                out.append(':');
                write(out, entry.getValue());
            }
            out.append('}');
        } else if (value instanceof List) {
            out.append('[');
            List<?> list = (List<?>) value;
            for (int i = 0; i < list.size(); i++) {
                if (i > 0) {
                    out.append(',');
                }
                write(out, list.get(i));
            }
            out.append(']');
        } else {
            writeString(out, String.valueOf(value));
        }
    }

    private static void writeString(StringBuilder out, String value) {
        out.append('"');
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            switch (c) {
                case '"':
                    out.append("\\\"");
                    break;
                case '\\':
                    out.append("\\\\");
                    break;
                case '\b':
                    out.append("\\b");
                    break;
                case '\f':
                    out.append("\\f");
                    break;
                case '\n':
                    out.append("\\n");
                    break;
                case '\r':
                    out.append("\\r");
                    break;
                case '\t':
                    out.append("\\t");
                    break;
                default:
                    if (c < 0x20) {
                        out.append(String.format("\\u%04x", (int) c));
                    } else {
                        out.append(c);
                    }
            }
        }
        out.append('"');
    }

    private static final class Parser {
        private final String s;
        private int i;

        private Parser(String s) {
            this.s = s;
        }

        private Object value() {
            skip();
            if (i >= s.length()) {
                throw error("unexpected end");
            }
            char c = s.charAt(i);
            if (c == '{') {
                return object();
            }
            if (c == '[') {
                return array();
            }
            if (c == '"') {
                return string();
            }
            if (c == 't' || c == 'f') {
                return bool();
            }
            if (c == 'n') {
                return nil();
            }
            if (c == '-' || (c >= '0' && c <= '9')) {
                return number();
            }
            throw error("unexpected '" + c + "'");
        }

        private Map<String, Object> object() {
            expect('{');
            Map<String, Object> map = new LinkedHashMap<String, Object>();
            skip();
            if (peek('}')) {
                i++;
                return map;
            }
            while (true) {
                skip();
                String key = string();
                skip();
                expect(':');
                Object val = value();
                map.put(key, val);
                skip();
                if (peek('}')) {
                    i++;
                    break;
                }
                expect(',');
            }
            return map;
        }

        private List<Object> array() {
            expect('[');
            List<Object> list = new ArrayList<Object>();
            skip();
            if (peek(']')) {
                i++;
                return list;
            }
            while (true) {
                list.add(value());
                skip();
                if (peek(']')) {
                    i++;
                    break;
                }
                expect(',');
            }
            return list;
        }

        private String string() {
            expect('"');
            StringBuilder out = new StringBuilder();
            while (i < s.length()) {
                char c = s.charAt(i++);
                if (c == '"') {
                    return out.toString();
                }
                if (c == '\\') {
                    if (i >= s.length()) {
                        throw error("bad escape");
                    }
                    char e = s.charAt(i++);
                    switch (e) {
                        case '"':
                        case '\\':
                        case '/':
                            out.append(e);
                            break;
                        case 'b':
                            out.append('\b');
                            break;
                        case 'f':
                            out.append('\f');
                            break;
                        case 'n':
                            out.append('\n');
                            break;
                        case 'r':
                            out.append('\r');
                            break;
                        case 't':
                            out.append('\t');
                            break;
                        case 'u':
                            if (i + 4 > s.length()) {
                                throw error("bad unicode");
                            }
                            int cp = 0;
                            for (int k = 0; k < 4; k++) {
                                char h = s.charAt(i++);
                                cp <<= 4;
                                if (h >= '0' && h <= '9') {
                                    cp += h - '0';
                                } else if (h >= 'a' && h <= 'f') {
                                    cp += h - 'a' + 10;
                                } else if (h >= 'A' && h <= 'F') {
                                    cp += h - 'A' + 10;
                                } else {
                                    throw error("bad unicode");
                                }
                            }
                            out.append((char) cp);
                            break;
                        default:
                            throw error("bad escape");
                    }
                } else if (c < 0x20) {
                    throw error("raw control");
                } else {
                    out.append(c);
                }
            }
            throw error("unterminated string");
        }

        private Boolean bool() {
            if (s.startsWith("true", i)) {
                i += 4;
                return Boolean.TRUE;
            }
            if (s.startsWith("false", i)) {
                i += 5;
                return Boolean.FALSE;
            }
            throw error("bad boolean");
        }

        private Object nil() {
            if (s.startsWith("null", i)) {
                i += 4;
                return null;
            }
            throw error("bad null");
        }

        private Number number() {
            int start = i;
            if (peek('-')) {
                i++;
            }
            if (i >= s.length() || s.charAt(i) < '0' || s.charAt(i) > '9') {
                throw error("bad number");
            }
            if (s.charAt(i) == '0') {
                i++;
            } else {
                while (i < s.length() && s.charAt(i) >= '0' && s.charAt(i) <= '9') {
                    i++;
                }
            }
            boolean fraction = false;
            if (i < s.length() && s.charAt(i) == '.') {
                fraction = true;
                i++;
                int digits = 0;
                while (i < s.length() && s.charAt(i) >= '0' && s.charAt(i) <= '9') {
                    i++;
                    digits++;
                }
                if (digits == 0) {
                    throw error("bad number");
                }
            }
            if (i < s.length() && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                fraction = true;
                i++;
                if (i < s.length() && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                    i++;
                }
                int digits = 0;
                while (i < s.length() && s.charAt(i) >= '0' && s.charAt(i) <= '9') {
                    i++;
                    digits++;
                }
                if (digits == 0) {
                    throw error("bad number");
                }
            }
            String token = s.substring(start, i);
            if (!fraction) {
                try {
                    return Long.valueOf(token);
                } catch (NumberFormatException ex) {
                    return Double.valueOf(token);
                }
            }
            return Double.valueOf(token);
        }

        private void skip() {
            while (i < s.length()) {
                char c = s.charAt(i);
                if (c == ' ' || c == '\n' || c == '\r' || c == '\t') {
                    i++;
                } else {
                    break;
                }
            }
        }

        private boolean peek(char c) {
            return i < s.length() && s.charAt(i) == c;
        }

        private void expect(char c) {
            if (!peek(c)) {
                throw error("expected '" + c + "'");
            }
            i++;
        }

        private ParseException error(String message) {
            return new ParseException(message + " at " + i);
        }
    }
}
