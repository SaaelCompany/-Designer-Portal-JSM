package com.portaldesigner.rest;

import com.portaldesigner.json.Json;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.LinkedHashMap;
import java.util.Map;

final class Responses {
    private static final String JSON = MediaType.APPLICATION_JSON + "; charset=UTF-8";

    private Responses() {
    }

    static Response ok(Object body) {
        return Response.ok(Json.stringify(body), JSON).header("Cache-Control", "no-store").build();
    }

    static Response error(int status, String code) {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("error", code);
        return Response.status(status).entity(Json.stringify(body)).type(JSON).build();
    }
}
