package com.portaldesigner.json;

import org.junit.Test;

import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

public class JsonTest {
    @Test
    public void roundTrip() {
        String raw = "{\"name\":\"Портал\",\"on\":true,\"n\":2,\"overlay\":0.35,\"tags\":[\"a\",null],\"empty\":{}}";
        Object parsed = Json.parse(raw);
        assertTrue(parsed instanceof Map);
        @SuppressWarnings("unchecked")
        Map<String, Object> map = (Map<String, Object>) parsed;
        assertEquals("Портал", map.get("name"));
        assertEquals(Boolean.TRUE, map.get("on"));
        assertEquals(Long.valueOf(2), map.get("n"));
        assertEquals(0.35d, (Double) map.get("overlay"), 0.0001d);
        assertNull(((List<?>) map.get("tags")).get(1));
        String again = Json.stringify(parsed);
        assertEquals(parsed, Json.parse(again));
    }

    @Test
    public void escapes() {
        Map<String, Object> map = new java.util.LinkedHashMap<String, Object>();
        map.put("s", "a\"b\\c\n");
        Object parsed = Json.parse(Json.stringify(map));
        @SuppressWarnings("unchecked")
        Map<String, Object> back = (Map<String, Object>) parsed;
        assertEquals("a\"b\\c\n", back.get("s"));
    }

    @Test(expected = Json.ParseException.class)
    public void rejectsTrailingJunk() {
        Json.parse("{\"a\":1} ");
        Json.parse("{\"a\":1} nope");
    }
}
