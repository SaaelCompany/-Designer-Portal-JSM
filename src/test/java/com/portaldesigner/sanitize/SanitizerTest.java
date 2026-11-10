package com.portaldesigner.sanitize;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class SanitizerTest {
    @Test
    public void stripsScriptAndEventHandlers() {
        String clean = HtmlSanitizer.sanitize("<script>alert(1)</script><b>ok</b><img src=x onerror=\"alert(1)\">");
        assertFalse(clean.toLowerCase().contains("script"));
        assertFalse(clean.toLowerCase().contains("onerror"));
        assertTrue(clean.contains("<b>ok</b>"));
        assertFalse(clean.contains("<img"));
    }

    @Test
    public void keepsSafeLinkAndImage() {
        String clean = HtmlSanitizer.sanitize(
                "<a href=\"https://example.com/help\" target=\"_blank\" onclick=\"alert(1)\">Help</a>"
                        + "<img src=\"https://cdn.example/logo.png\" alt=\"Logo\">");
        assertTrue(clean.contains("href=\"https://example.com/help\""));
        assertTrue(clean.contains("rel=\"noopener noreferrer\""));
        assertTrue(clean.contains("src=\"https://cdn.example/logo.png\""));
        assertFalse(clean.toLowerCase().contains("onclick"));
    }

    @Test
    public void dropsJavascriptUrls() {
        String clean = HtmlSanitizer.sanitize("<a href=\"javascript:alert(1)\">x</a>");
        assertFalse(clean.toLowerCase().contains("javascript"));
    }

    @Test
    public void cssDropsImportsExpressionsAndBadUrls() {
        String clean = CssSanitizer.sanitize(
                "@import url('https://evil.test/x.css'); body{color:red; background:url(javascript:alert(1)); width:expression(alert(1))}"
                        + "<script>alert(1)</script> @font-face{src:url(https://fonts.example/a.woff)} "
                        + "h1{background:url('https://cdn.example/a.png')}");
        assertFalse(clean.toLowerCase().contains("@import"));
        assertFalse(clean.toLowerCase().contains("javascript"));
        assertFalse(clean.toLowerCase().contains("expression"));
        assertFalse(clean.toLowerCase().contains("@font-face"));
        assertFalse(clean.contains("<"));
        assertTrue(clean.contains("https://cdn.example/a.png"));
        assertTrue(clean.contains("color:red") || clean.contains("color: red"));
    }

    @Test
    public void assetUrls() {
        assertEquals("", Urls.safeHref("javascript:alert(1)"));
        assertEquals("/servicedesk/customer/user/requests", Urls.safeHref("/servicedesk/customer/user/requests"));
        assertEquals("none", Urls.cssUrl("javascript:alert(1)"));
        assertTrue(Urls.cssUrl("https://cdn.example/a.png").contains("https://cdn.example/a.png"));
    }
}
