#!/usr/bin/env python3
"""NovaOS Theme Studio — server HTTP senza dipendenze esterne.

Oltre allo Studio serve anche la shell reale di NovaOS sotto /shell/, così
l'anteprima interattiva carica la vera home in un iframe (stessa origine).

Espone anche /theme/current: il feed del tema corrente. Lo Studio vi pubblica
il tema (POST) a ogni modifica; la shell in anteprima sul dispositivo
(?preview=1&themeFeed=/theme/current) lo polla (GET) e lo applica dal vivo.

Uso:  python3 server.py [porta]     (porta predefinita: 8099)
"""
import os, sys, json, time, threading, posixpath
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
SHELL = os.path.abspath(os.path.join(ROOT, "..", "os", "shell"))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8099

# per lo sviluppo non vogliamo cache: l'anteprima ricarica sempre i file freschi
HEADERS = {"Cache-Control": "no-store"}

# feed tema corrente (in memoria: basta per l'anteprima dal vivo)
THEME_FEED = {"rev": None, "theme": None}
THEME_LOCK = threading.Lock()


def lan_ip():
    """IP LAN del computer, per l'anteprima sul dispositivo (stessa rete)."""
    try:
        s = __import__("socket").socket(__import__("socket").AF_INET, __import__("socket").SOCK_DGRAM)
        s.connect(("8.8.8.8", 80)); ip = s.getsockname()[0]; s.close()
        return ip
    except Exception:
        return "localhost"


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = posixpath.normpath(path.split("?", 1)[0].split("#", 1)[0])
        if p == "/shell" or p.startswith("/shell/"):
            rel = p[len("/shell"):].lstrip("/")
            base = os.path.abspath(os.path.join(SHELL, rel))
            if base != SHELL and not base.startswith(SHELL + os.sep):
                base = SHELL
            return base
        return super().translate_path(path)

    def _theme_path(self):
        return self.path.split("?", 1)[0].split("#", 1)[0] == "/theme/current"

    def _cors(self):
        # la shell può vivere su un'altra origine (es. file:// dentro l'APK):
        # il feed deve rispondere con CORS aperto per essere pollabile dal telefono.
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        if self._theme_path():
            self.send_response(204)
            self._cors()
            self.end_headers()
            return
        self.send_response(404)
        self.end_headers()

    def do_GET(self):
        if self._theme_path():
            with THEME_LOCK:
                body = json.dumps({"rev": THEME_FEED["rev"], "theme": THEME_FEED["theme"]}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self._cors()
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()

    def do_POST(self):
        if self._theme_path():
            try:
                n = int(self.headers.get("Content-Length") or 0)
                data = json.loads(self.rfile.read(n).decode("utf-8")) if n else {}
            except Exception:
                data = {}
            if isinstance(data.get("theme"), dict):
                with THEME_LOCK:
                    THEME_FEED["theme"] = data["theme"]
                    THEME_FEED["rev"] = data.get("rev") or int(time.time() * 1000)
            self.send_response(204)
            self._cors()
            self.end_headers()
            return
        self.send_response(404)
        self.end_headers()

    def send_head(self):
        if self.path in ("/", "/index.html"):
            self.send_response(302)
            self.send_header("Location", "/studio/")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            return None
        return super().send_head()

    def end_headers(self):
        for k, v in HEADERS.items():
            self.send_header(k, v)
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("[nova-studio] %s\n" % (fmt % args))


if __name__ == "__main__":
    os.chdir(ROOT)
    httpd = ThreadingHTTPServer(("", PORT), Handler)
    ip = lan_ip()
    print("NovaOS Theme Studio")
    print("  Editor            → http://localhost:%d/studio/" % PORT)
    print("  Galleria          → http://localhost:%d/gallery/launcher-lab.html" % PORT)
    print("  Shell anteprima   → http://localhost:%d/shell/index.html?preview=1" % PORT)
    print("  Tema sul telefono → http://%s:%d/shell/index.html?preview=1&themeFeed=/theme/current" % (ip, PORT))
    print("    (apri l'URL sul telefono sulla stessa rete Wi-Fi, oppure usa 10.0.2.2 nell'emulatore Android)")
    print("  (Ctrl+C per fermare il server)")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()
