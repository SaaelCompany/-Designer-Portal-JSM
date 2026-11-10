package com.portaldesigner.theme;

public final class PortalKeys {
    public static final String GLOBAL = "global";

    private PortalKeys() {
    }

    public static boolean isValid(String key) {
        return GLOBAL.equals(key) || (key != null && key.matches("[0-9]{1,18}"));
    }

    public static String normalize(String key) {
        if (key == null || key.trim().isEmpty()) {
            return GLOBAL;
        }
        String trimmed = key.trim();
        return isValid(trimmed) ? trimmed : null;
    }
}
