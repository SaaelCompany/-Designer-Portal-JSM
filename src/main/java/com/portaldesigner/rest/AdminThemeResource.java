package com.portaldesigner.rest;

import com.atlassian.jira.security.GlobalPermissionManager;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.portaldesigner.json.Json;
import com.portaldesigner.security.AdminGuard;
import com.portaldesigner.service.ThemeService;
import com.portaldesigner.theme.ThemeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Named
@Path("/admin")
@Produces({MediaType.APPLICATION_JSON})
@Consumes({MediaType.APPLICATION_JSON})
public class AdminThemeResource {
    private static final Logger log = LoggerFactory.getLogger(AdminThemeResource.class);

    private final ThemeService themes;
    private final JiraAuthenticationContext auth;
    private final GlobalPermissionManager permissions;

    @Inject
    public AdminThemeResource(ThemeService themes,
                              @ComponentImport JiraAuthenticationContext auth,
                              @ComponentImport GlobalPermissionManager permissions) {
        this.themes = themes;
        this.auth = auth;
        this.permissions = permissions;
    }

    @GET
    @Path("/theme")
    public Response get(@QueryParam("portalId") String portalId) {
        Response denied = guard();
        if (denied != null) {
            return denied;
        }
        try {
            return Responses.ok(themes.adminTheme(portalId));
        } catch (ThemeException ex) {
            return Responses.error(400, ex.code());
        }
    }

    @PUT
    @Path("/theme")
    public Response save(@QueryParam("portalId") String portalId, String body) {
        Response denied = guard();
        if (denied != null) {
            return denied;
        }
        try {
            return Responses.ok(themes.save(portalId, body));
        } catch (ThemeException ex) {
            return Responses.error(400, ex.code());
        } catch (RuntimeException ex) {
            log.error("Portal Designer could not save a theme", ex);
            return Responses.error(500, "save_failed");
        }
    }

    @DELETE
    @Path("/theme")
    public Response delete(@QueryParam("portalId") String portalId) {
        Response denied = guard();
        if (denied != null) {
            return denied;
        }
        try {
            themes.delete(portalId);
            return Responses.ok(themes.adminTheme(portalId));
        } catch (ThemeException ex) {
            return Responses.error(400, ex.code());
        }
    }

    @POST
    @Path("/compile")
    public Response compile(String body) {
        Response denied = guard();
        if (denied != null) {
            return denied;
        }
        try {
            return Responses.ok(themes.compile(body));
        } catch (ThemeException ex) {
            return Responses.error(400, ex.code());
        }
    }

    @GET
    @Path("/switch")
    public Response getSwitch() {
        Response denied = guard();
        if (denied != null) {
            return denied;
        }
        return Responses.ok(switchBody());
    }

    @PUT
    @Path("/switch")
    public Response putSwitch(String body) {
        Response denied = guard();
        if (denied != null) {
            return denied;
        }
        Boolean active = readActive(body);
        if (active == null) {
            return Responses.error(400, "invalid_json");
        }
        themes.setPluginActive(active.booleanValue());
        return Responses.ok(switchBody());
    }

    private java.util.Map<String, Object> switchBody() {
        java.util.Map<String, Object> body = new java.util.LinkedHashMap<String, Object>();
        body.put("active", Boolean.valueOf(themes.pluginActive()));
        return body;
    }

    private static Boolean readActive(String body) {
        if (body == null || body.trim().isEmpty()) {
            return null;
        }
        try {
            Object parsed = Json.parse(body);
            if (!(parsed instanceof java.util.Map)) {
                return null;
            }
            Object active = ((java.util.Map<?, ?>) parsed).get("active");
            if (active instanceof Boolean) {
                return (Boolean) active;
            }
        } catch (RuntimeException ex) {
            return null;
        }
        return null;
    }

    @GET
    @Path("/presets")
    public Response presets() {
        Response denied = guard();
        if (denied != null) {
            return denied;
        }
        return Responses.ok(themes.presets());
    }

    private Response guard() {
        if (!AdminGuard.isLoggedIn(auth)) {
            return Responses.error(401, "login_required");
        }
        if (AdminGuard.requireAdmin(auth, permissions) == null) {
            return Responses.error(403, "admin_required");
        }
        return null;
    }
}
