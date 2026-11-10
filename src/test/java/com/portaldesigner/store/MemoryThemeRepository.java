package com.portaldesigner.store;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MemoryThemeRepository implements ThemeRepository {
    private final Map<String, String> data = new ConcurrentHashMap<String, String>();

    @Override
    public String get(String portalKey) {
        return data.get(portalKey);
    }

    @Override
    public void put(String portalKey, String json) {
        data.put(portalKey, json);
    }

    @Override
    public void delete(String portalKey) {
        data.remove(portalKey);
    }
}
