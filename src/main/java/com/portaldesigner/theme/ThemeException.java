package com.portaldesigner.theme;

public final class ThemeException extends RuntimeException {
    private final String code;

    public ThemeException(String code) {
        super(code);
        this.code = code;
    }

    public String code() {
        return code;
    }
}
