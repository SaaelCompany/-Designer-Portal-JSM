package com.portaldesigner.theme;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class ThemePresets {
    private ThemePresets() {
    }

    public static List<Preset> all() {
        return Collections.unmodifiableList(Arrays.asList(
                preset("classic", "Классика", classic()),
                preset("midnight", "Полночь", midnight()),
                preset("grove", "Роща", grove()),
                preset("contrast", "Контраст", contrast()),
                preset("quiet", "Тихий", quiet())
        ));
    }

    public static PortalTheme classic() {
        PortalTheme theme = new PortalTheme();
        theme.header.links.add(new PortalTheme.Link("Мои заявки", "/servicedesk/customer/user/requests"));
        theme.footer.columns.add(new PortalTheme.Column(
                "Поддержка",
                new PortalTheme.Link("Мои заявки", "/servicedesk/customer/user/requests")));
        theme.footer.columns.add(new PortalTheme.Column(
                "Портал",
                new PortalTheme.Link("Все порталы", "/servicedesk/customer/portals")));
        return theme;
    }

    public static PortalTheme midnight() {
        PortalTheme theme = classic();
        theme.name = "Полночь";
        theme.colors.background = "#0E141C";
        theme.colors.surface = "#172232";
        theme.colors.text = "#E7EEF8";
        theme.colors.muted = "#9AABC0";
        theme.colors.headerBg = "#0B1018";
        theme.colors.headerText = "#F4F7FB";
        theme.colors.heroBg = "#1B3A6B";
        theme.colors.heroText = "#FFFFFF";
        theme.colors.footerBg = "#0B1018";
        theme.colors.footerText = "#C9D4E3";
        theme.colors.border = "#2A3A4E";
        theme.colors.card = "#1B2838";
        theme.colors.primary = "#7CB1FF";
        theme.colors.primaryText = "#07111E";
        theme.colors.link = "#9DC4FF";
        theme.colors.accent = "#F0B429";
        theme.hero.overlay = 0.15d;
        return theme;
    }

    public static PortalTheme grove() {
        PortalTheme theme = classic();
        theme.name = "Роща";
        theme.colors.background = "#F3F6F1";
        theme.colors.headerBg = "#1C3B32";
        theme.colors.headerText = "#F4F7F2";
        theme.colors.heroBg = "#245445";
        theme.colors.heroText = "#FFFFFF";
        theme.colors.footerBg = "#1C3B32";
        theme.colors.footerText = "#E4EDE6";
        theme.colors.primary = "#1F7A4D";
        theme.colors.link = "#1F7A4D";
        theme.colors.accent = "#C9842A";
        theme.colors.border = "#D7E3D8";
        theme.hero.title = "Здравствуйте. С чего начнём?";
        theme.hero.subtitle = "Заявки, доступы и вопросы по сервисам — в одном окне";
        return theme;
    }

    public static PortalTheme contrast() {
        PortalTheme theme = classic();
        theme.name = "Контраст";
        theme.colors.background = "#FFFFFF";
        theme.colors.surface = "#FFFFFF";
        theme.colors.text = "#000000";
        theme.colors.muted = "#1A1A1A";
        theme.colors.headerBg = "#000000";
        theme.colors.headerText = "#FFFFFF";
        theme.colors.heroBg = "#FFD000";
        theme.colors.heroText = "#000000";
        theme.colors.footerBg = "#000000";
        theme.colors.footerText = "#FFFFFF";
        theme.colors.primary = "#000000";
        theme.colors.primaryText = "#FFFFFF";
        theme.colors.link = "#000000";
        theme.colors.accent = "#FFD000";
        theme.colors.border = "#000000";
        theme.colors.card = "#FFFFFF";
        theme.layout.radius = 0;
        theme.layout.shadow = "none";
        theme.typography.baseSize = 18;
        theme.typography.headingWeight = 800;
        theme.requests.cardStyle = "outline";
        theme.search.radius = 0;
        theme.hero.overlay = 0d;
        theme.hero.height = 240;
        return theme;
    }

    public static PortalTheme quiet() {
        PortalTheme theme = classic();
        theme.name = "Тихий";
        theme.colors.background = "#F7F7F5";
        theme.colors.headerBg = "#FFFFFF";
        theme.colors.headerText = "#1C1915";
        theme.colors.heroBg = "#EFEFEA";
        theme.colors.heroText = "#1C1915";
        theme.colors.footerBg = "#FFFFFF";
        theme.colors.footerText = "#3E3A34";
        theme.colors.primary = "#1C1915";
        theme.colors.primaryText = "#FFFFFF";
        theme.colors.link = "#1C1915";
        theme.colors.accent = "#8A847A";
        theme.colors.border = "#E3E0D8";
        theme.layout.radius = 8;
        theme.layout.shadow = "none";
        theme.requests.cardStyle = "outline";
        theme.hero.overlay = 0d;
        theme.hero.height = 220;
        theme.hero.align = "start";
        return theme;
    }

    private static Preset preset(String id, String label, PortalTheme theme) {
        return new Preset(id, label, theme);
    }

    public static final class Preset {
        public final String id;
        public final String label;
        public final PortalTheme theme;

        Preset(String id, String label, PortalTheme theme) {
            this.id = id;
            this.label = label;
            this.theme = theme;
        }

        public Map<String, Object> toMap() {
            Map<String, Object> map = new LinkedHashMap<String, Object>();
            map.put("id", id);
            map.put("label", label);
            map.put("theme", ThemeMapper.toMap(theme));
            return map;
        }
    }
}
