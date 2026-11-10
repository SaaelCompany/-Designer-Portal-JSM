package com.portaldesigner.store;

public interface ThemeRepository {
    String get(String portalKey);

    void put(String portalKey, String json);

    void delete(String portalKey);
}
