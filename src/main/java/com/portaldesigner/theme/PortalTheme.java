package com.portaldesigner.theme;

import java.util.ArrayList;
import java.util.List;

/** Visual theme applied to one customer portal, or to every portal when stored as {@code global}. */
public final class PortalTheme {
    public String name = "Классика";
    public boolean enabled;
    public boolean useGlobal;
    public long updatedAt;

    public Colors colors = new Colors();
    public Typography typography = new Typography();
    public Layout layout = new Layout();
    public Header header = new Header();
    public Hero hero = new Hero();
    public Search search = new Search();
    public Requests requests = new Requests();
    public Announcement announcement = new Announcement();
    public Footer footer = new Footer();
    public Responsive responsive = new Responsive();
    public List<Block> blocks = new ArrayList<Block>();
    /** Positions of native pieces on the request form, such as the title and the form. */
    public List<Placement> placements = new ArrayList<Placement>();
    public String customCss = "";

    public static final class Colors {
        public String primary = "#0B5FFF";
        public String primaryText = "#FFFFFF";
        public String background = "#FFFFFF";
        public String surface = "#FFFFFF";
        public String text = "#1C1915";
        public String muted = "#6B645C";
        public String headerBg = "#14233B";
        public String headerText = "#F7F4EF";
        public String heroBg = "#14233B";
        public String heroText = "#FFFFFF";
        public String footerBg = "#14233B";
        public String footerText = "#E7E1D8";
        public String link = "#0B5FFF";
        public String border = "#E4DDD2";
        public String accent = "#0F6B5C";
        public String card = "#FFFFFF";
    }

    public static final class Typography {
        public String font = "system";
        public int baseSize = 16;
        public int headingWeight = 600;
        public double lineHeight = 1.5d;
    }

    public static final class Layout {
        public int contentWidth = 1080;
        public int radius = 16;
        public String shadow = "soft";
        public int pagePadding = 28;
        public String backgroundImage = "";
    }

    public static final class Header {
        public String mode = "replace";
        public String logoUrl = "";
        public String logoAlt = "";
        public int logoHeight = 36;
        public boolean showTitle = true;
        public String title = "Центр поддержки";
        public boolean sticky = true;
        public boolean showLogin = true;
        public String loginLabel = "Войти";
        public int height = 72;
        public List<Link> links = new ArrayList<Link>();
        public String customHtml = "";
    }

    public static final class Hero {
        public boolean visible = true;
        public String pages = "home";
        public String title = "Чем мы можем помочь?";
        public String subtitle = "Выберите услугу или опишите задачу своими словами";
        public String align = "center";
        public int height = 300;
        public String backgroundImage = "";
        public double overlay = 0.28d;
    }

    public static final class Search {
        public boolean visible = true;
        public String placeholder = "Опишите, что случилось";
        public int radius = 999;
    }

    public static final class Requests {
        public String layout = "grid";
        public int columns = 3;
        public int gap = 16;
        public boolean showDescription = true;
        public String cardStyle = "elevated";
        public List<String> order = new ArrayList<String>();
    }

    public static final class Announcement {
        public boolean visible;
        public String text = "";
        public String tone = "info";
    }

    public static final class Footer {
        public String mode = "replace";
        public String copyright = "Служба поддержки";
        public List<Column> columns = new ArrayList<Column>();
        public String customHtml = "";
    }

    public static final class Responsive {
        public int mobileMax = 640;
        public int tabletMax = 1024;
        public Screen mobile = Screen.mobile();
        public Screen tablet = Screen.tablet();
    }

    public static final class Screen {
        public int columns = 2;
        public int heroHeight = 240;
        public int pagePadding = 20;
        public int baseSize = 16;
        public int headerHeight = 64;
        public boolean showHero = true;
        public boolean showHeaderTitle = true;

        public static Screen mobile() {
            Screen screen = new Screen();
            screen.columns = 1;
            screen.heroHeight = 220;
            screen.pagePadding = 16;
            screen.baseSize = 15;
            screen.headerHeight = 60;
            screen.showHero = true;
            screen.showHeaderTitle = true;
            return screen;
        }

        public static Screen tablet() {
            Screen screen = new Screen();
            screen.columns = 2;
            screen.heroHeight = 250;
            screen.pagePadding = 20;
            screen.baseSize = 16;
            screen.headerHeight = 64;
            screen.showHero = true;
            screen.showHeaderTitle = true;
            return screen;
        }
    }

    /** One piece of the constructed page, in the order it is drawn. */
    public static final class Block {
        public String id = "";
        public String type = "text";
        public boolean visible = true;
        public String title = "";
        public String text = "";
        public List<Link> links = new ArrayList<Link>();
        /** When true, the block is placed by x/y/width instead of the normal stack. */
        public boolean free;
        public int x;
        public int y;
        public int width = 100;
        public int fontSize;
        public String font = "";
        public String align = "";
    }

    /** A native portal piece placed by the constructor. x and width are percents, y is pixels. */
    public static final class Placement {
        public String id = "";
        public int x;
        public int y;
        public int width;
    }

    public static final class Link {
        public String label = "";
        public String href = "";

        public Link() {
        }

        public Link(String label, String href) {
            this.label = label;
            this.href = href;
        }
    }

    public static final class Column {
        public String title = "";
        public List<Link> links = new ArrayList<Link>();

        public Column() {
        }

        public Column(String title, Link... links) {
            this.title = title;
            for (Link link : links) {
                this.links.add(link);
            }
        }
    }
}
