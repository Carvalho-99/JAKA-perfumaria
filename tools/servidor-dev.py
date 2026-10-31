"""
Servidor local para ver o site durante o desenvolvimento.

    python tools/servidor-dev.py            -> http://localhost:5510
    python tools/servidor-dev.py 8080       -> outra porta

Diferença para `python -m http.server`: manda "Cache-Control: no-store", então o navegador sempre
baixa a versão nova de HTML, CSS, JS e imagens. Sem isso, depois de uma alteração a página pode
continuar mostrando os arquivos antigos até um Ctrl+F5.
"""
import functools
import http.server
import os
import sys

porta = int(sys.argv[1]) if len(sys.argv) > 1 else 5510
raiz = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))


class SemCache(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      '.webp': 'image/webp', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json'}

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):  # silencioso
        pass


print(f'Jaka Perfumaria em http://localhost:{porta}  (Ctrl+C para parar)')
http.server.ThreadingHTTPServer(('', porta), functools.partial(SemCache, directory=raiz)).serve_forever()
