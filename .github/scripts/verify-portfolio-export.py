from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys, threading, urllib.request

out = Path(sys.argv[1]).resolve()
public_url = 'https://pabstack-work.pablo-de-la-cruz-pro.chatgpt.site'
class Pages(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if not path.startswith('/portfolio/'):
            return str(out / 'no_such_test_path')
        return super().translate_path('/' + path.removeprefix('/portfolio/'))
    def log_message(self,*args): pass
class Analyze(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]
        self.asset_paths=[]
        self.link=None
    def handle_starttag(self,tag,attrs):
        vals=dict(attrs)
        if tag=='a':
            self.link=[vals.get('href',''),'']
        if tag in ('link','script'):
            src=vals.get('src',vals.get('href',''))
            if src.startswith('/portfolio/_next/static/'):
                self.asset_paths.append(src)
    def handle_endtag(self,tag):
        if tag=='a' and self.link:
            self.links.append(self.link); self.link=None
    def handle_data(self,data):
        if self.link: self.link[1]+=data

server=ThreadingHTTPServer(('127.0.0.1',0),lambda *a,**k:Pages(*a,directory=out,**k))
threading.Thread(target=server.serve_forever,daemon=True).start()
base=f'http://127.0.0.1:{server.server_port}'
open_local=urllib.request.build_opener(urllib.request.ProxyHandler({})).open
try:
    with open_local(base+'/portfolio/',timeout=4) as response:
        assert response.status==200
        body=response.read().decode()
    p=Analyze()
    p.feed(body)
    matches=[link for link in p.links if link[0]==public_url]
    assert len(matches)==1 and 'View work log' in matches[0][1],matches
    assert 'pabStack Work Log' in body
    assert not any('github.com/pablodcruz/pabStack' in u for u,_ in p.links)
    assert p.asset_paths,'no emitted /portfolio/_next/static asset'
    selected=next((p for p in p.asset_paths if p.endswith('.css')),p.asset_paths[0])
    with open_local(base+selected,timeout=4) as asset:
        assert asset.status==200 and len(asset.read())>0
    print('PASS /portfolio/ HTTP 200, exactly one public Work Log anchor, no private Factory link')
    print(f'PASS prefixed static asset HTTP 200: {selected}')
finally:
    server.shutdown()
    server.server_close()
