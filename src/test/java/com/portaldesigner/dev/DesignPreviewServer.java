package com.portaldesigner.dev;

import com.portaldesigner.json.Json;
import com.portaldesigner.service.ThemeService;
import com.portaldesigner.store.MemoryThemeRepository;
import com.portaldesigner.theme.ThemeException;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Local stand-in for Jira so the WYSIWYG editor can be opened without a Service Management instance.
 * Not packaged into the plugin.
 */
public final class DesignPreviewServer {
    private static final String PLUGIN_KEY = "com.portaldesigner.portal-designer";

    public static void main(String[] args) throws Exception {
        int port = args.length > 0 ? Integer.parseInt(args[0]) : 8765;
        Path resources = Paths.get("src/main/resources").toAbsolutePath().normalize();
        ThemeService themes = new ThemeService(new MemoryThemeRepository());
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", port), 0);
        server.createContext("/", exchange -> handle(exchange, resources, themes));
        server.start();
        System.out.println("Portal Designer preview: http://127.0.0.1:" + port + "/plugins/servlet/portal-designer");
        Thread.currentThread().join();
    }

    private static void handle(HttpExchange exchange, Path resources, ThemeService themes) throws IOException {
        String path = exchange.getRequestURI().getPath();
        String query = exchange.getRequestURI().getRawQuery();
        try {
            if ("/plugins/servlet/portal-designer".equals(path)) {
                String html = new String(Files.readAllBytes(resources.resolve("ui/designer.html")), StandardCharsets.UTF_8);
                html = html.replace("@@CONTEXT@@", "")
                        .replace("@@PLUGIN_KEY@@", PLUGIN_KEY)
                        .replace("@@CONTEXT_JSON@@", "\"\"")
                        .replace("@@KEY_JSON@@", Json.stringify(PLUGIN_KEY))
                        .replace("@@PROJECT_JSON@@", "\"IT\"");
                html = withAdminChrome(html);
                send(exchange, 200, "text/html; charset=UTF-8", html.getBytes(StandardCharsets.UTF_8));
                return;
            }
            if (path.startsWith("/download/resources/" + PLUGIN_KEY + ":")) {
                String rest = path.substring(path.lastIndexOf(':') + 1);
                Path relative;
                if ("designer-ui/designer.css".equals(rest)) {
                    relative = Paths.get("ui/designer.css");
                } else if ("designer-ui/designer.js".equals(rest)) {
                    relative = Paths.get("ui/designer.js");
                } else if ("portal-runtime/portal.css".equals(rest)) {
                    relative = Paths.get("css/portal.css");
                } else if ("portal-runtime/portal.js".equals(rest)) {
                    relative = Paths.get("js/portal.js");
                } else {
                    send(exchange, 404, "text/plain", "missing".getBytes(StandardCharsets.UTF_8));
                    return;
                }
                Path file = resources.resolve(relative).normalize();
                if (!file.startsWith(resources) || !Files.isRegularFile(file)) {
                    send(exchange, 404, "text/plain", "missing".getBytes(StandardCharsets.UTF_8));
                    return;
                }
                String type = file.toString().endsWith(".css") ? "text/css; charset=UTF-8" : "application/javascript; charset=UTF-8";
                send(exchange, 200, type, Files.readAllBytes(file));
                return;
            }
            if ("/rest/servicedeskapi/servicedesk".equals(path)) {
                sendJson(exchange, samplePortals());
                return;
            }
            if (path.startsWith("/rest/servicedeskapi/servicedesk/") && path.endsWith("/requesttype")) {
                sendJson(exchange, sampleTypes());
                return;
            }
            if (path.startsWith("/rest/portal-designer/1.0/")) {
                routeTheme(exchange, themes, path, query);
                return;
            }
            if (path.startsWith("/servicedesk/customer/")) {
                send(exchange, 200, "text/html; charset=UTF-8", customerPage(path).getBytes(StandardCharsets.UTF_8));
                return;
            }
            send(exchange, 404, "text/plain", "not found".getBytes(StandardCharsets.UTF_8));
        } catch (ThemeException ex) {
            sendJson(exchange, 400, error(ex.code()));
        } catch (RuntimeException ex) {
            ex.printStackTrace();
            send(exchange, 500, "text/plain", "error".getBytes(StandardCharsets.UTF_8));
        }
    }

    private static void routeTheme(HttpExchange exchange, ThemeService themes, String path, String query) throws IOException {
        String portalId = queryParam(query, "portalId");
        String method = exchange.getRequestMethod();
        if (path.endsWith("/public-theme") && "GET".equals(method)) {
            sendJson(exchange, themes.publicTheme(portalId));
        } else if (path.endsWith("/admin/presets") && "GET".equals(method)) {
            sendJson(exchange, themes.presets());
        } else if (path.endsWith("/admin/theme") && "GET".equals(method)) {
            sendJson(exchange, themes.adminTheme(portalId));
        } else if (path.endsWith("/admin/theme") && "PUT".equals(method)) {
            sendJson(exchange, themes.save(portalId, body(exchange)));
        } else if (path.endsWith("/admin/theme") && "DELETE".equals(method)) {
            themes.delete(portalId);
            sendJson(exchange, themes.adminTheme(portalId));
        } else if (path.endsWith("/admin/compile") && "POST".equals(method)) {
            sendJson(exchange, themes.compile(body(exchange)));
        } else {
            send(exchange, 404, "text/plain", "no route".getBytes(StandardCharsets.UTF_8));
        }
    }

    private static String customerPage(String path) {
        String body;
        if (path.matches(".*/[A-Z][A-Z0-9]*-\\d+$")) {
            body = "<header class=\"cv-smart-portal-header\"><a href=\"/servicedesk/customer/user/requests\">Запросы</a></header>"
                    + "<div id=\"cv-content\" class=\"cv-request\"><h1>IT-15</h1>"
                    + "<table><tr><td class=\"cv-request-summary\">Не работает почта</td></tr></table>"
                    + "<form><label>Комментарий<input type=\"text\"></label><button type=\"submit\">Отправить</button></form></div>";
        } else if (path.contains("/user/requests")) {
            body = "<header class=\"cv-smart-portal-header\"><a href=\"/servicedesk/customer/portals\">Порталы</a></header>"
                    + "<div id=\"cv-content\" class=\"cv-requests\"><h1>Запросы</h1>"
                    + "<input type=\"search\" class=\"cv-request-search\" placeholder=\"Найти заявку\">"
                    + "<a href=\"/servicedesk/customer/portal/1\">К порталу</a>"
                    + "<table><tr><td><a href=\"/servicedesk/customer/portal/1/IT-15\">IT-15</a></td>"
                    + "<td class=\"cv-request-summary\">Не работает почта</td></tr>"
                    + "<tr><td><a href=\"/servicedesk/customer/portal/1/IT-16\">IT-16</a></td>"
                    + "<td class=\"cv-request-summary\">Доступ для нового сотрудника</td></tr></table></div>";
        } else if (path.contains("/user/profile")) {
            body = "<header class=\"cv-smart-portal-header\"><a href=\"/servicedesk/customer/user/requests\">Запросы</a></header>"
                    + "<div id=\"cv-content\" class=\"cv-profile\"><h1>Профиль</h1>"
                    + "<form><label>Имя<input name=\"fullName\" type=\"text\" value=\"Анна\"></label>"
                    + "<label>Почта<input name=\"email\" type=\"email\" value=\"anna@example.com\"></label>"
                    + "<button type=\"submit\">Сохранить</button></form>"
                    + "<a href=\"/servicedesk/customer/portal/1\">Мой портал</a></div>";
        } else if (path.endsWith("/portals")) {
            body = "<header class=\"cv-smart-portal-header\">Порталы</header>"
                    + "<nav class=\"cv-nav\"><a href=\"/servicedesk/customer/portals\">Порталы</a>"
                    + "<a href=\"/servicedesk/customer/user/requests\">Запросы</a></nav>"
                    + "<div id=\"cv-content\">"
                    + "<a class=\"cv-portal\" href=\"/servicedesk/customer/portal/1\">IT поддержка</a>"
                    + "<a class=\"cv-portal\" href=\"/servicedesk/customer/portal/4\">Кадры</a></div>";
        } else if (path.contains("/create/")) {
            body = "<header class=\"cv-smart-portal-header\"><a href=\"/servicedesk/customer/portal/1\">Назад</a></header>"
                    + "<nav class=\"cv-project-nav\"><a href=\"/servicedesk/customer/portal/1\">Портал</a></nav>"
                    + "<div id=\"cv-content\"><form class=\"cv-create\"><h1>Новая заявка</h1>"
                    + "<label>Тема<input name=\"summary\" type=\"text\"></label>"
                    + "<label>Описание<textarea name=\"description\"></textarea></label>"
                    + "<button type=\"submit\">Отправить</button></form></div>";
        } else if (path.endsWith("/login")) {
            body = "<div id=\"cv-content\"><form class=\"cv-login\"><h1>Вход</h1><input type=\"email\"><button type=\"submit\">Войти</button></form></div>";
        } else {
            body = "<div id=\"jsd-portal-container\"><header class=\"cv-smart-portal-header\">"
                    + "<a class=\"cv-brand\" href=\"/servicedesk/customer/portal/1\">Центр поддержки</a></header>"
                    + "<nav class=\"cv-project-nav\"><a href=\"/servicedesk/customer/portal/1\">Портал</a>"
                    + "<a href=\"/servicedesk/customer/user/requests\">Запросы</a></nav>"
                    + "<div id=\"cv-content\" class=\"cv-smart-portal\"><h1>Чем мы можем помочь?</h1>"
                    + "<div class=\"cv-search\"><input type=\"search\" placeholder=\"Поиск\"></div>"
                    + "<div class=\"cv-request-types\">"
                    + "<a class=\"cv-request-type\" href=\"/servicedesk/customer/portal/1/create/10\">Доступ к системе</a>"
                    + "<a class=\"cv-request-type\" href=\"/servicedesk/customer/portal/1/create/11\">Не работает сервис</a>"
                    + "<a class=\"cv-request-type\" href=\"/servicedesk/customer/portal/1/create/12\">Новый сотрудник</a>"
                    + "</div></div></div>";
        }
        return "<!DOCTYPE html><html><head><meta charset=\"utf-8\"/>"
                + "<link rel=\"stylesheet\" href=\"/download/resources/" + PLUGIN_KEY + ":portal-runtime/portal.css\"/>"
                + "</head><body>" + body
                + "<script src=\"/download/resources/" + PLUGIN_KEY + ":portal-runtime/portal.js\"></script>"
                + "</body></html>";
    }

    private static Map<String, Object> samplePortals() {
        List<Map<String, Object>> values = new ArrayList<Map<String, Object>>();
        values.add(portal("1", "IT", "IT поддержка"));
        values.add(portal("4", "HR", "Кадры"));
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("values", values);
        return body;
    }

    private static Map<String, Object> portal(String id, String key, String name) {
        Map<String, Object> portal = new LinkedHashMap<String, Object>();
        portal.put("id", id);
        portal.put("projectKey", key);
        portal.put("projectName", name);
        return portal;
    }

    private static Map<String, Object> sampleTypes() {
        List<Map<String, Object>> values = new ArrayList<Map<String, Object>>();
        values.add(type("10", "Доступ к системе", "Учётная запись, права, VPN"));
        values.add(type("11", "Не работает сервис", "Сбой в рабочей системе"));
        values.add(type("12", "Новый сотрудник", "Техника, доступы, рабочее место"));
        values.add(type("13", "Закупка", "Лицензии и оборудование"));
        values.add(type("14", "Консультация", "Вопрос без поломки"));
        values.add(type("15", "Пропуск в офис", "Гость или постоянный доступ"));
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("values", values);
        return body;
    }

    private static Map<String, Object> type(String id, String name, String description) {
        Map<String, Object> type = new LinkedHashMap<String, Object>();
        type.put("id", id);
        type.put("name", name);
        type.put("description", description);
        return type;
    }

    private static Map<String, Object> error(String code) {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("error", code);
        return body;
    }

    private static String queryParam(String query, String name) throws IOException {
        if (query == null) {
            return "global";
        }
        for (String part : query.split("&")) {
            int eq = part.indexOf('=');
            if (eq > 0 && name.equals(URLDecoder.decode(part.substring(0, eq), "UTF-8"))) {
                return URLDecoder.decode(part.substring(eq + 1), "UTF-8");
            }
        }
        return "global";
    }

    private static String body(HttpExchange exchange) throws IOException {
        InputStream in = exchange.getRequestBody();
        byte[] data = read(in);
        return new String(data, StandardCharsets.UTF_8);
    }

    private static byte[] read(InputStream in) throws IOException {
        byte[] buffer = new byte[4096];
        int n;
        java.io.ByteArrayOutputStream out = new java.io.ByteArrayOutputStream();
        while ((n = in.read(buffer)) >= 0) {
            out.write(buffer, 0, n);
        }
        return out.toByteArray();
    }

    /**
     * Local stand-in for Jira's {@code atl.admin} decorator. The plugin page only asks for that
     * decorator; this wrapper is not packaged and is here so the editor can be viewed beside a
     * header and an administration sidebar without a Jira process.
     */
    private static String withAdminChrome(String html) {
        String chrome = ""
                + "<style id=\"pd-jira-chrome\">"
                + "html,body#jira{height:100%;margin:0;}"
                + "body#jira{display:flex;flex-direction:column;background:#f4f5f7;color:#172b4b;"
                + "font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif;font-size:14px;}"
                + "#header{flex:0 0 56px;background:#0747a6;color:#fff;}"
                + ".jira-header-inner{height:56px;display:flex;align-items:center;padding:0 12px 0 8px;gap:8px;}"
                + ".jira-logo{display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none;font-weight:700;padding:0 10px;}"
                + ".jira-logo i{width:24px;height:24px;border-radius:4px;background:#fff;color:#0747a6;display:inline-flex;align-items:center;justify-content:center;font-style:normal;font-size:14px;}"
                + ".jira-nav{display:flex;align-items:center;gap:2px;list-style:none;margin:0;padding:0;}"
                + ".jira-nav a{color:#fff;text-decoration:none;padding:8px 10px;border-radius:3px;}"
                + ".jira-nav a:hover{background:rgba(255,255,255,.16);}"
                + ".jira-spacer{margin-left:auto;display:flex;align-items:center;gap:10px;}"
                + ".jira-search{background:rgba(255,255,255,.16);color:#fff;border-radius:3px;padding:6px 10px;min-width:180px;}"
                + ".jira-create{background:#fff;color:#0747a6;border:0;border-radius:3px;padding:6px 10px;font-weight:600;}"
                + ".jira-avatar{width:28px;height:28px;border-radius:50%;background:#6554c0;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;}"
                + "#content{flex:1;min-height:0;display:flex;}"
                + ".aui-page-panel{flex:1;display:flex;min-width:0;background:#fff;}"
                + ".aui-page-panel-inner{display:flex;flex:1;min-width:0;min-height:0;}"
                + ".aui-page-panel-nav{width:240px;flex:0 0 240px;background:#f4f5f7;border-right:1px solid #dfe1e6;overflow:auto;padding:16px 0;}"
                + ".aui-page-panel-content{flex:1;min-width:0;padding:20px;background:#fff;overflow:hidden;}"
                + ".admin-section{margin:0;padding:14px 16px 4px;color:#6b778c;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;}"
                + ".admin-links{list-style:none;margin:0;padding:0;}"
                + ".admin-links a{display:block;padding:7px 16px 7px 20px;color:#172b4b;text-decoration:none;border-left:3px solid transparent;}"
                + ".admin-links a:hover{background:#ebecf0;}"
                + ".admin-links .is-selected a{background:#deebff;color:#0052cc;font-weight:600;border-left-color:#0052cc;}"
                + "#footer{flex:0 0 40px;display:flex;align-items:center;padding:0 16px;background:#f4f5f7;border-top:1px solid #dfe1e6;color:#6b778c;font-size:12px;}"
                + "</style>";
        String open = "<body id=\"jira\" class=\"pd-designer\">"
                + "<header id=\"header\" role=\"banner\">"
                + "<div class=\"jira-header-inner\">"
                + "<a class=\"jira-logo\" href=\"#\"><i>J</i>Jira</a>"
                + "<ul class=\"jira-nav\">"
                + "<li><a href=\"#\">Дашборды</a></li>"
                + "<li><a href=\"#\">Проекты</a></li>"
                + "<li><a href=\"#\">Задачи</a></li>"
                + "</ul>"
                + "<div class=\"jira-spacer\">"
                + "<div class=\"jira-search\">Поиск</div>"
                + "<button class=\"jira-create\" type=\"button\">Создать</button>"
                + "<span class=\"jira-avatar\">А</span>"
                + "</div></div></header>"
                + "<div id=\"content\"><div class=\"aui-page-panel\"><div class=\"aui-page-panel-inner\">"
                + "<aside class=\"aui-page-panel-nav\" aria-label=\"Администрирование\">"
                + "<div class=\"admin-section\">Приложения</div>"
                + "<ul class=\"admin-links\"><li><a href=\"#\">Версии и лицензии</a></li><li><a href=\"#\">Свойства приложения</a></li></ul>"
                + "<div class=\"admin-section\">Проекты</div>"
                + "<ul class=\"admin-links\"><li><a href=\"#\">Проекты</a></li></ul>"
                + "<div class=\"admin-section\">Задачи</div>"
                + "<ul class=\"admin-links\"><li><a href=\"#\">Типы задач</a></li></ul>"
                + "<div class=\"admin-section\">Управление приложениями</div>"
                + "<ul class=\"admin-links\">"
                + "<li><a href=\"#\">Найти приложения</a></li>"
                + "<li><a href=\"#\">Управление приложениями</a></li>"
                + "<li><a href=\"#\">Клиентский портал</a></li>"
                + "<li class=\"is-selected\"><a id=\"portal-designer-admin-link\" href=\"/plugins/servlet/portal-designer\">Конструктор портала</a></li>"
                + "</ul>"
                + "<div class=\"admin-section\">Пользователи</div>"
                + "<ul class=\"admin-links\"><li><a href=\"#\">Пользователи</a></li><li><a href=\"#\">Группы</a></li></ul>"
                + "<div class=\"admin-section\">Система</div>"
                + "<ul class=\"admin-links\"><li><a href=\"#\">Общие настройки</a></li><li><a href=\"#\">Системная информация</a></li></ul>"
                + "</aside><section class=\"aui-page-panel-content\">";
        String close = "</section></div></div></div>"
                + "<footer id=\"footer\">Jira</footer>";
        if (!html.contains("<body class=\"pd-designer\">") || !html.contains("</body>")) {
            return html;
        }
        html = html.replace("</head>", chrome + "</head>");
        html = html.replace("<body class=\"pd-designer\">", open);
        html = html.replace("</body>", close + "</body>");
        return html;
    }

    private static void sendJson(HttpExchange exchange, Object body) throws IOException {
        sendJson(exchange, 200, body);
    }

    private static void sendJson(HttpExchange exchange, int status, Object body) throws IOException {
        send(exchange, status, "application/json; charset=UTF-8", Json.stringify(body).getBytes(StandardCharsets.UTF_8));
    }

    private static void send(HttpExchange exchange, int status, String type, byte[] body) throws IOException {
        Headers headers = exchange.getResponseHeaders();
        headers.set("Content-Type", type);
        headers.set("Cache-Control", "no-store");
        exchange.sendResponseHeaders(status, body.length);
        OutputStream out = exchange.getResponseBody();
        out.write(body);
        out.close();
    }
}
