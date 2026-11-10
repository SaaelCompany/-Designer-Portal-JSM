package com.portaldesigner.servlet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.WriteListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

/**
 * Customer-portal shells are ordinary HTML, and JSM then boots a single-page app inside them.
 * The web-resource context covers that shell; this filter covers portals that never request it.
 */
public class PortalInjectFilter implements Filter {
    static final String PLUGIN_KEY = "com.portaldesigner.portal-designer";
    private static final int MAX_BYTES = 2_000_000;
    private static final Logger log = LoggerFactory.getLogger(PortalInjectFilter.class);

    @Override
    public void init(FilterConfig filterConfig) {
        log.info("Portal Designer will decorate /servicedesk/customer HTML");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (!(request instanceof HttpServletRequest) || !(response instanceof HttpServletResponse)) {
            chain.doFilter(request, response);
            return;
        }
        HttpServletRequest http = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        if (!"GET".equalsIgnoreCase(http.getMethod()) || !wantsHtml(http)) {
            chain.doFilter(request, response);
            return;
        }
        Capture capture = new Capture(httpResponse);
        chain.doFilter(request, capture);
        byte[] raw = capture.body();
        if (!PortalSnippet.shouldRewrite(http.getMethod(), httpResponse.getStatus(),
                httpResponse.getContentType(), httpResponse.getHeader("Content-Encoding"))
                || raw.length == 0 || raw.length > MAX_BYTES || capture.overflow()) {
            if (raw.length > 0 && !httpResponse.isCommitted()) {
                writeThrough(httpResponse, raw);
            }
            return;
        }
        Charset charset = charset(httpResponse);
        String html = new String(raw, charset);
        String script = http.getContextPath()
                + "/download/resources/" + PLUGIN_KEY + ":portal-runtime/portal.js";
        byte[] out = PortalSnippet.inject(html, script).getBytes(charset);
        httpResponse.setContentLength(out.length);
        writeThrough(httpResponse, out);
    }

    private static boolean wantsHtml(HttpServletRequest request) {
        String uri = request.getRequestURI();
        if (uri == null || uri.contains("/rest/") || uri.contains("attachment")) {
            return false;
        }
        String accept = request.getHeader("Accept");
        return accept == null || accept.contains("text/html") || accept.contains("*/*");
    }

    private static Charset charset(HttpServletResponse response) {
        String encoding = response.getCharacterEncoding();
        if (encoding == null || encoding.isEmpty()) {
            return StandardCharsets.UTF_8;
        }
        try {
            return Charset.forName(encoding);
        } catch (RuntimeException ex) {
            return StandardCharsets.UTF_8;
        }
    }

    private static void writeThrough(HttpServletResponse response, byte[] body) throws IOException {
        if (body == null || response.isCommitted() && body.length == 0) {
            return;
        }
        ServletOutputStream stream = response.getOutputStream();
        stream.write(body);
        stream.flush();
    }

    @Override
    public void destroy() {
    }

    static final class Capture extends HttpServletResponseWrapper {
        private final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        private ServletOutputStream stream;
        private PrintWriter writer;
        private boolean overflow;

        Capture(HttpServletResponse response) {
            super(response);
        }

        @Override
        public ServletOutputStream getOutputStream() {
            if (writer != null) {
                throw new IllegalStateException("writer already used");
            }
            if (stream == null) {
                stream = new ServletOutputStream() {
                    @Override
                    public void write(int b) {
                        if (bytes.size() <= MAX_BYTES) {
                            bytes.write(b);
                        } else {
                            overflow = true;
                        }
                    }

                    @Override
                    public boolean isReady() {
                        return true;
                    }

                    @Override
                    public void setWriteListener(WriteListener writeListener) {
                    }
                };
            }
            return stream;
        }

        @Override
        public PrintWriter getWriter() throws IOException {
            if (stream != null) {
                throw new IllegalStateException("stream already used");
            }
            if (writer == null) {
                writer = new PrintWriter(new OutputStreamWriter(getOutputStream(), charset(this)));
            }
            return writer;
        }

        byte[] body() throws IOException {
            if (writer != null) {
                writer.flush();
            }
            return bytes.toByteArray();
        }

        boolean overflow() {
            return overflow;
        }

        @Override
        public void flushBuffer() {
            // Keep the shell buffered until the filter writes the rewritten HTML.
        }

        @Override
        public void setContentLength(int len) {
        }

        @Override
        public void setContentLengthLong(long len) {
        }
    }
}
