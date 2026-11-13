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
                send(exchange, 200, "text/html; charset=UTF-8", embedInJiraChrome(html).getBytes(StandardCharsets.UTF_8));
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
            if ("/servicedesk/customer/portals".equals(path)) {
                send(exchange, 200, "text/html; charset=UTF-8", customerHtml(portalsBody()).getBytes(StandardCharsets.UTF_8));
                return;
            }
            if ("/servicedesk/customer/portal/1".equals(path)) {
                send(exchange, 200, "text/html; charset=UTF-8", customerHtml(projectBody()).getBytes(StandardCharsets.UTF_8));
                return;
            }
            if ("/rest/api/2/myself".equals(path)) {
                sendJson(exchange, sampleUser());
                return;
            }
            if ("/rest/servicedeskapi/request".equals(path)) {
                sendJson(exchange, sampleRequests());
                return;
            }
            if ("/servicedesk/customer/user/requests".equals(path) || "/servicedesk/customer/user/profile".equals(path)) {
                send(exchange, 200, "text/html; charset=UTF-8", customerHtml("<header id=\"jira-header\">Jira Service Management</header>").getBytes(StandardCharsets.UTF_8));
                return;
            }
            if ("/servicedesk/customer/portal/1/ATS-1".equals(path)) {
                send(exchange, 200, "text/html; charset=UTF-8", customerHtml(requestBody()).getBytes(StandardCharsets.UTF_8));
                return;
            }
            if ("/servicedesk/customer/portal/1/create/10".equals(path)) {
                send(exchange, 200, "text/html; charset=UTF-8", customerHtml(createBody()).getBytes(StandardCharsets.UTF_8));
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
        } else if (path.endsWith("/admin/switch") && "GET".equals(method)) {
            sendJson(exchange, switchBody(themes));
        } else if (path.endsWith("/admin/switch") && "PUT".equals(method)) {
            themes.setPluginActive(!"{\"active\":false}".equals(body(exchange).replace(" ", "")));
            sendJson(exchange, switchBody(themes));
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

    /** Stand-in for Jira's atl.admin decorator: header plus the administration menu. */
    private static String embedInJiraChrome(String page) {
        int headStart = page.indexOf("<head>");
        int headEnd = page.indexOf("</head>");
        int bodyStart = page.indexOf("<body>");
        int bodyEnd = page.indexOf("</body>");
        String head = page.substring(headStart + "<head>".length(), headEnd);
        String body = page.substring(bodyStart + "<body>".length(), bodyEnd);
        return "<!DOCTYPE html><html lang=\"ru\"><head>" + head + "<style>"
                + "#header{height:40px;background:#0747a6;color:#fff;display:flex;align-items:center;padding:0 16px;font:14px/1.2 sans-serif}"
                + "#header span{margin-left:24px;opacity:.85}"
                + "#content{display:flex;align-items:stretch;min-height:calc(100vh - 40px)}"
                + "#admin-menu{width:220px;flex:0 0 220px;background:#f4f5f7;border-right:1px solid #dfe1e6;padding:16px;font:14px/1.4 sans-serif;color:#172b4d}"
                + "#admin-menu strong{display:block;margin-bottom:8px}"
                + "#admin-menu .on{background:#fff;border-radius:3px;padding:6px 8px}"
                + "#admin-content{flex:1;min-width:0;padding:20px}"
                + "</style></head><body>"
                + "<header id=\"header\">Jira<span>Администрирование</span></header>"
                + "<div id=\"content\"><nav id=\"admin-menu\"><strong>Клиентский портал</strong>"
                + "<div class=\"on\">Конструктор портала</div></nav>"
                + "<div id=\"admin-content\">" + body + "</div></div></body></html>";
    }

    private static String customerHtml(String body) {
        return "<!DOCTYPE html><html><head><meta charset=\"utf-8\"/>"
                + "<meta name=\"ajs-remote-user\" content=\"anna\"/>"
                + "<meta name=\"ajs-remote-user-fullname\" content=\"Анна Ковалева\"/>"
                + "<link rel=\"stylesheet\" href=\"/download/resources/" + PLUGIN_KEY + ":portal-runtime/portal.css\"/>"
                + "</head><body>" + body
                + "<a href=\"/logout\">Выйти</a>"
                + "<script src=\"/download/resources/" + PLUGIN_KEY + ":portal-runtime/portal.js\"></script>"
                + "</body></html>";
    }

    private static String portalsBody() {
        return "<header id=\"jira-header\">Jira Service Management</header>"
                + "<h1>Порталы</h1>"
                + "<a href=\"/servicedesk/customer/portal/1\">IT поддержка <p>Техника и доступы</p></a>"
                + "<a href=\"/servicedesk/customer/portal/4\">Кадры <p>Отпуска и справки</p></a>"
                + "<a href=\"/servicedesk/customer/portal/1/create/99\">Случайная заявка</a>";
    }

    private static String projectBody() {
        return "<header id=\"jira-header\">Jira Service Management</header>"
                + "<h1>IT поддержка</h1>"
                + "<a href=\"/servicedesk/customer/portal/1/create/10\">Доступ к системе <p>Учётная запись, права, VPN</p></a>"
                + "<a href=\"/servicedesk/customer/portal/1/create/11\">Не работает сервис <p>Сбой в рабочей системе</p></a>";
    }

    private static String requestBody() {
        return "<header class=\"cv-smart-portal-header\">Центр поддержки</header>"
                + "<form id=\"create-form\"><h1>Что я просматриваю?</h1>"
                + "<p>Описание запроса</p></form>";
    }

    private static String createBody() {
        return "<header id=\"jira-header\">Jira Service Management</header>"
                + "<form id=\"create-form\"><h1>Новая заявка</h1>"
                + "<label>Тема<input name=\"summary\"/></label>"
                + "<button type=\"submit\">Отправить</button></form>";
    }

    private static Map<String, Object> samplePortals() {
        List<Map<String, Object>> values = new ArrayList<Map<String, Object>>();
        values.add(portal("1", "IT", "IT поддержка"));
        values.add(portal("2", "HR", "Кадры"));
        values.add(portal("3", "FIN", "Финансы"));
        values.add(portal("4", "LEG", "Юристы"));
        values.add(portal("5", "FAC", "АХО"));
        values.add(portal("6", "SEC", "Безопасность"));
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("values", values);
        body.put("isLastPage", Boolean.TRUE);
        return body;
    }

    private static Map<String, Object> switchBody(ThemeService themes) {
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("active", Boolean.valueOf(themes.pluginActive()));
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
        body.put("isLastPage", Boolean.TRUE);
        return body;
    }

    private static Map<String, Object> sampleUser() {
        Map<String, Object> user = new LinkedHashMap<String, Object>();
        user.put("name", "anna");
        user.put("key", "anna");
        user.put("displayName", "Анна Ковалева");
        user.put("emailAddress", "anna@example.com");
        Map<String, Object> avatars = new LinkedHashMap<String, Object>();
        avatars.put("24x24", "");
        user.put("avatarUrls", avatars);
        return user;
    }

    private static Map<String, Object> sampleRequests() {
        List<Map<String, Object>> values = new ArrayList<Map<String, Object>>();
        values.add(request("STP-50", "Тест", "Ожидание поддержки"));
        values.add(request("STP-47", "Заявка", "Ожидание поддержки"));
        values.add(request("STP-46", "Доступ", "Ожидание поддержки"));
        Map<String, Object> body = new LinkedHashMap<String, Object>();
        body.put("values", values);
        body.put("isLastPage", Boolean.TRUE);
        return body;
    }

    private static Map<String, Object> request(String key, String summary, String status) {
        Map<String, Object> item = new LinkedHashMap<String, Object>();
        item.put("issueKey", key);
        item.put("serviceDeskId", "1");
        List<Map<String, Object>> fields = new ArrayList<Map<String, Object>>();
        Map<String, Object> summaryField = new LinkedHashMap<String, Object>();
        summaryField.put("fieldId", "summary");
        summaryField.put("label", "Тема");
        summaryField.put("value", summary);
        fields.add(summaryField);
        Map<String, Object> other = new LinkedHashMap<String, Object>();
        other.put("fieldId", "customfield_10050");
        other.put("label", "Лишнее");
        Map<String, Object> nested = new LinkedHashMap<String, Object>();
        nested.put("displayName", "Не тема");
        other.put("value", nested);
        fields.add(other);
        item.put("requestFieldValues", fields);
        Map<String, Object> current = new LinkedHashMap<String, Object>();
        current.put("status", status);
        item.put("currentStatus", current);
        return item;
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
