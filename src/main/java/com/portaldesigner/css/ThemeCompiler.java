package com.portaldesigner.css;

import com.portaldesigner.sanitize.Urls;
import com.portaldesigner.theme.PortalTheme;

/**
 * Turns a sanitized theme into the stylesheet the customer portal and the editor preview both load.
 * Structural rules live in portal.css and read these custom properties.
 */
public final class ThemeCompiler {
    public String compile(PortalTheme theme) {
        StringBuilder css = new StringBuilder(2048);
        css.append("html.pd-active{");
        prop(css, "--pd-primary", theme.colors.primary);
        prop(css, "--pd-primary-text", theme.colors.primaryText);
        prop(css, "--pd-bg", theme.colors.background);
        prop(css, "--pd-surface", theme.colors.surface);
        prop(css, "--pd-text", theme.colors.text);
        prop(css, "--pd-muted", theme.colors.muted);
        prop(css, "--pd-header-bg", theme.colors.headerBg);
        prop(css, "--pd-header-text", theme.colors.headerText);
        prop(css, "--pd-hero-bg", theme.colors.heroBg);
        prop(css, "--pd-hero-text", theme.colors.heroText);
        prop(css, "--pd-footer-bg", theme.colors.footerBg);
        prop(css, "--pd-footer-text", theme.colors.footerText);
        prop(css, "--pd-link", theme.colors.link);
        prop(css, "--pd-border", theme.colors.border);
        prop(css, "--pd-accent", theme.colors.accent);
        prop(css, "--pd-card", theme.colors.card);
        prop(css, "--pd-radius", theme.layout.radius + "px");
        prop(css, "--pd-content", theme.layout.contentWidth + "px");
        prop(css, "--pd-font", fontStack(theme.typography.font));
        prop(css, "--pd-base", theme.typography.baseSize + "px");
        prop(css, "--pd-heading-weight", String.valueOf(theme.typography.headingWeight));
        prop(css, "--pd-line", trim(theme.typography.lineHeight));
        prop(css, "--pd-hero-h", theme.hero.height + "px");
        prop(css, "--pd-gap", theme.requests.gap + "px");
        prop(css, "--pd-page-pad", theme.layout.pagePadding + "px");
        prop(css, "--pd-header-h", theme.header.height + "px");
        prop(css, "--pd-cols", String.valueOf(theme.requests.columns));
        prop(css, "--pd-search-radius", theme.search.radius + "px");
        prop(css, "--pd-hero-overlay", trim(theme.hero.overlay));
        prop(css, "--pd-hero-image", Urls.cssUrl(theme.hero.backgroundImage));
        prop(css, "--pd-page-image", Urls.cssUrl(theme.layout.backgroundImage));
        css.append("}\n");
        screen(css, theme.responsive.tabletMax, theme.responsive.tablet, false);
        screen(css, theme.responsive.mobileMax, theme.responsive.mobile, true);
        if (theme.customCss != null && !theme.customCss.trim().isEmpty()) {
            css.append("/* custom */\n").append(theme.customCss.trim()).append('\n');
        }
        return css.toString();
    }

    private static void screen(StringBuilder css, int max, PortalTheme.Screen screen, boolean mobile) {
        css.append("@media (max-width: ").append(max).append("px){html.pd-active{");
        prop(css, "--pd-cols", String.valueOf(screen.columns));
        prop(css, "--pd-hero-h", screen.heroHeight + "px");
        prop(css, "--pd-page-pad", screen.pagePadding + "px");
        prop(css, "--pd-base", screen.baseSize + "px");
        prop(css, "--pd-header-h", screen.headerHeight + "px");
        css.append("}");
        if (!screen.showHeaderTitle) {
            css.append("html.pd-active .pd-brand-title{display:none !important;}");
        }
        if (!screen.showHero) {
            css.append("html.pd-active #pd-hero{display:none !important;}");
        }
        if (mobile) {
            css.append("html.pd-active [data-pd-card]{min-height:48px;}");
        }
        css.append("}\n");
    }

    private static void prop(StringBuilder css, String name, String value) {
        css.append(name).append(':').append(value).append(';');
    }

    static String fontStack(String key) {
        if ("serif".equals(key)) {
            return "Georgia, \"Iowan Old Style\", \"Palatino Linotype\", Palatino, serif";
        }
        if ("mono".equals(key)) {
            return "ui-monospace, \"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace";
        }
        if ("humanist".equals(key)) {
            return "\"Trebuchet MS\", \"Segoe UI\", Candara, sans-serif";
        }
        if ("condensed".equals(key)) {
            return "\"Arial Narrow\", \"Segoe UI\", sans-serif";
        }
        return "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif";
    }

    private static String trim(double value) {
        String text = Double.toString(value);
        if (text.endsWith(".0")) {
            return text.substring(0, text.length() - 2);
        }
        return text;
    }
}
