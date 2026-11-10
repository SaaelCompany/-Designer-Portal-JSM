package com.portaldesigner.rest;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import com.portaldesigner.service.ThemeService;
import com.portaldesigner.theme.ThemeException;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Read by the customer portal, including anonymous and customer accounts.
 * The payload is the published visual theme only.
 */
@Named
@Path("/public-theme")
@AnonymousAllowed
@Produces({MediaType.APPLICATION_JSON})
public class PublicThemeResource {
    private final ThemeService themes;

    @Inject
    public PublicThemeResource(ThemeService themes) {
        this.themes = themes;
    }

    @GET
    @AnonymousAllowed
    public Response get(@QueryParam("portalId") String portalId) {
        try {
            return Responses.ok(themes.publicTheme(portalId));
        } catch (ThemeException ex) {
            return Responses.error(400, ex.code());
        }
    }
}
