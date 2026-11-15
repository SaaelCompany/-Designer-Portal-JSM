package com.portaldesigner.service;

import com.portaldesigner.css.ThemeCompiler;
import com.portaldesigner.json.Json;
import com.portaldesigner.store.ThemeRepository;
import com.portaldesigner.theme.MappedTheme;
import com.portaldesigner.theme.PortalKeys;
import com.portaldesigner.theme.PortalTheme;
import com.portaldesigner.theme.ThemeException;
import com.portaldesigner.theme.ThemeMapper;
import com.portaldesigner.theme.ThemePresets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Named
public class ThemeService {
    public static final int MAX_STORED_CHARS = 200000;
    private static final Logger log = LoggerFactory.getLogger(ThemeService.class);
    private static final String SWITCH_KEY = "switch";

    private final ThemeRepository repository;
    private final ThemeCompiler compiler;

    @Inject
    public ThemeService(ThemeRepository repository) {
        this(repository, new ThemeCompiler());
    }

    public ThemeService(ThemeRepository repository, ThemeCompiler compiler) {
        this.repository = repository;
        this.compiler = compiler;
    }

    public Map<String, Object> publicTheme(String portalId) {
        String key = requiredKey(portalId);
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("portalId", key);
        if (!pluginActive()) {
            body.put("enabled", Boolean.FALSE);
            body.put("active", Boolean.FALSE);
            body.put("source", "off");
            return body;
        }
        Resolved resolved = resolve(key);
        body.put("active", Boolean.TRUE);
        body.put("enabled", resolved.theme != null && resolved.theme.enabled);
        body.put("source", resolved.source);
        if (resolved.theme == null || !resolved.theme.enabled) {
            return body;
        }
        body.put("updatedAt", resolved.theme.updatedAt);
        body.put("css", compiler.compile(resolved.theme));
        body.put("theme", ThemeMapper.toMap(resolved.theme));
        return body;
    }

    public Map<String, Object> adminTheme(String portalId) {
        String key = requiredKey(portalId);
        PortalTheme own = read(key);
        PortalTheme global = PortalKeys.GLOBAL.equals(key) ? own : read(PortalKeys.GLOBAL);
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("portalId", key);
        body.put("exists", own != null);
        body.put("theme", own == null ? null : ThemeMapper.toMap(own));
        body.put("global", global == null ? null : ThemeMapper.toMap(global));
        return body;
    }

    public Map<String, Object> save(String portalId, String json) {
        String key = requiredKey(portalId);
        MappedTheme mapped = parse(json);
        mapped.theme.updatedAt = System.currentTimeMillis();
        String stored = Json.stringify(ThemeMapper.toMap(mapped.theme));
        if (stored.length() > MAX_STORED_CHARS) {
            throw new ThemeException("theme_too_large");
        }
        repository.put(key, stored);
        return outcome(mapped.theme, mapped.warnings);
    }

    public Map<String, Object> compile(String json) {
        MappedTheme mapped = parse(json);
        return outcome(mapped.theme, mapped.warnings);
    }

    public void delete(String portalId) {
        repository.delete(requiredKey(portalId));
    }

    /**
     * One switch for the whole plugin. While it is off, no portal is replaced,
     * including portals that keep their own published theme.
     */
    public boolean pluginActive() {
        String json = repository.get(SWITCH_KEY);
        if (json == null || json.trim().isEmpty()) {
            return true;
        }
        try {
            Object parsed = Json.parse(json);
            if (parsed instanceof Map) {
                Object active = ((Map<?, ?>) parsed).get("active");
                if (active instanceof Boolean) {
                    return (Boolean) active;
                }
            }
        } catch (RuntimeException ex) {
            log.warn("Ignoring unreadable Portal Designer switch");
        }
        return true;
    }

    public Map<String, Object> setPluginActive(boolean active) {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("active", Boolean.valueOf(active));
        repository.put(SWITCH_KEY, Json.stringify(body));
        return body;
    }

    public List<Map<String, Object>> presets() {
        List<Map<String, Object>> out = new ArrayList<Map<String, Object>>();
        for (ThemePresets.Preset preset : ThemePresets.all()) {
            out.add(preset.toMap());
        }
        return out;
    }

    private Map<String, Object> outcome(PortalTheme theme, List<String> warnings) {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("theme", ThemeMapper.toMap(theme));
        body.put("css", compiler.compile(theme));
        body.put("warnings", warnings);
        return body;
    }

    private Resolved resolve(String key) {
        if (!PortalKeys.GLOBAL.equals(key)) {
            PortalTheme specific = read(key);
            if (specific != null && !specific.useGlobal) {
                return new Resolved(specific, "portal");
            }
        }
        PortalTheme global = read(PortalKeys.GLOBAL);
        if (global == null) {
            return new Resolved(null, "none");
        }
        return new Resolved(global, "global");
    }

    private PortalTheme read(String key) {
        String json = repository.get(key);
        if (json == null || json.trim().isEmpty()) {
            return null;
        }
        try {
            return parse(json).theme;
        } catch (ThemeException ex) {
            log.warn("Ignoring unreadable Portal Designer theme for {}", key);
            return null;
        }
    }

    private MappedTheme parse(String json) {
        if (json == null || json.trim().isEmpty()) {
            throw new ThemeException("invalid_json");
        }
        Object parsed;
        try {
            parsed = Json.parse(json);
        } catch (RuntimeException ex) {
            throw new ThemeException("invalid_json");
        }
        if (!(parsed instanceof Map)) {
            throw new ThemeException("invalid_json");
        }
        @SuppressWarnings("unchecked")
        Map<String, Object> map = (Map<String, Object>) parsed;
        return ThemeMapper.fromMap(map);
    }

    private static String requiredKey(String portalId) {
        String key = PortalKeys.normalize(portalId);
        if (key == null) {
            throw new ThemeException("invalid_portal");
        }
        return key;
    }

    private static final class Resolved {
        private final PortalTheme theme;
        private final String source;

        private Resolved(PortalTheme theme, String source) {
            this.theme = theme;
            this.source = source;
        }
    }
}
