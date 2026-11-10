package com.portaldesigner.store;

import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.pluginsettings.PluginSettings;
import com.atlassian.sal.api.pluginsettings.PluginSettingsFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Named;

/**
 * Themes live in global plugin settings, which Jira stores in the database.
 * That keeps a Data Center cluster on one published theme without node-local files.
 */
@Named
public class PluginSettingsThemeRepository implements ThemeRepository {
    static final String PREFIX = "com.portaldesigner.theme.";
    private static final Logger log = LoggerFactory.getLogger(PluginSettingsThemeRepository.class);

    private final PluginSettingsFactory factory;

    @Inject
    public PluginSettingsThemeRepository(@ComponentImport PluginSettingsFactory factory) {
        this.factory = factory;
    }

    @Override
    public String get(String portalKey) {
        try {
            Object value = settings().get(PREFIX + portalKey);
            return value == null ? null : String.valueOf(value);
        } catch (RuntimeException ex) {
            log.warn("Portal Designer could not read theme {}", portalKey, ex);
            return null;
        }
    }

    @Override
    public void put(String portalKey, String json) {
        settings().put(PREFIX + portalKey, json);
    }

    @Override
    public void delete(String portalKey) {
        settings().remove(PREFIX + portalKey);
    }

    private PluginSettings settings() {
        return factory.createGlobalSettings();
    }
}
