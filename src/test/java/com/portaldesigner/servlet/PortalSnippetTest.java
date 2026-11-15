package com.portaldesigner.servlet;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class PortalSnippetTest {
    @Test
    public void injectsOnceBeforeHeadClose() {
        String html = "<!DOCTYPE html><html><head><title>Portal</title></head><body></body></html>";
        String once = PortalSnippet.inject(html, "/jira/download/resources/com.portaldesigner.portal-designer:portal-runtime/portal.js");
        String twice = PortalSnippet.inject(once, "/jira/download/resources/com.portaldesigner.portal-designer:portal-runtime/portal.js");
        assertTrue(once.contains(PortalSnippet.MARKER));
        assertTrue(once.contains(PortalSnippet.HOLD));
        assertTrue(once.contains("pd-hold"));
        assertTrue(once.indexOf(PortalSnippet.HOLD) < once.indexOf(PortalSnippet.MARKER));
        assertTrue(once.indexOf("defer></script>") > once.indexOf(PortalSnippet.MARKER));
        assertTrue(once.indexOf(PortalSnippet.MARKER) < once.toLowerCase().indexOf("</head>"));
        assertEquals(once, twice);
    }

    @Test
    public void leavesJsonAndGzipAlone() {
        assertFalse(PortalSnippet.shouldRewrite("POST", 200, "text/html", null));
        assertFalse(PortalSnippet.shouldRewrite("GET", 302, "text/html", null));
        assertFalse(PortalSnippet.shouldRewrite("GET", 200, "application/json", null));
        assertTrue(PortalSnippet.shouldRewrite("GET", 200, "text/html", "gzip"));
        assertTrue(PortalSnippet.shouldRewrite("GET", 200, "text/html;charset=UTF-8", null));
        assertEquals("{\"ok\":true}", PortalSnippet.inject("{\"ok\":true}", "/portal.js"));
    }

    @Test
    public void gzipRoundTripKeepsThePortalHtml() throws Exception {
        byte[] plain = "<!DOCTYPE html><html><head></head><body>форма</body></html>".getBytes("UTF-8");
        byte[] restored = PortalSnippet.ungzip(PortalSnippet.gzip(plain));
        assertEquals(new String(plain, "UTF-8"), new String(restored, "UTF-8"));
    }
}
