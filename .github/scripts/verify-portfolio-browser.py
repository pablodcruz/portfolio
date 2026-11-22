"""Verify the public illustrated export via localhost, without external navigation."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import urlparse
import sys
import tempfile

from playwright.sync_api import expect, sync_playwright

PUBLIC_WORK_LOG = 'https://pabstack-work.pablo-de-la-cruz-pro.chatgpt.site'
LAYOUTS = [(320, False), (390, True), (1440, True)]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def smoke(browser, url, width, scripts_enabled):
    page = browser.new_page(
        viewport={'width': width, 'height': 900}, java_script_enabled=scripts_enabled
    )
    external = []
    bad_responses = []
    errors = []

    def limit_to_localhost(route):
        if urlparse(route.request.url).netloc == urlparse(url).netloc:
            route.continue_()
        else:
            external.append(route.request.url)
            route.abort()

    def record_response(response):
        if response.status >= 400:
            bad_responses.append((response.status, response.url))

    page.route('**/*', limit_to_localhost)
    page.on('response', record_response)
    page.on('pageerror', lambda error: errors.append(str(error)))
    with page.expect_response(lambda r: '/art/section-study' in r.url) as art:
        response = page.goto(url, wait_until='networkidle')
        assert response and response.ok
    assert art.value.ok and art.value.headers.get('content-type') == 'image/webp'
    expected_asset = 'section-study-small.webp' if width <= 650 else 'section-study.webp'
    assert urlparse(art.value.url).path == '/portfolio/art/' + expected_asset
    image = page.locator('picture img')
    assert image.evaluate('(el) => el.complete && el.naturalWidth > 0')
    expect(page.locator('.entry')).to_have_count(7)
    expect(page.locator(f'a[href="{PUBLIC_WORK_LOG}"]')).to_have_count(1)

    source = response.text().lower()
    for prohibited in ('labnotes', '$99', 'chatgpt.com/space/', 'github.com/pablodcruz/pabstack',
                       'checkout', 'openai trainer'):
        assert prohibited not in source, prohibited
    assert page.evaluate('document.documentElement.scrollWidth') == width

    page.keyboard.press('Tab')
    expect(page.get_by_role('link', name='Skip to content')).to_be_focused()
    page.keyboard.press('Enter')
    expect(page.locator('main#content')).to_be_focused()
    summary = page.locator('.entry summary').first
    for _ in range(12):
        if summary.evaluate('(el) => el === document.activeElement'):
            break
        page.keyboard.press('Tab')
    expect(summary).to_be_focused()
    details = page.locator('.entry details').first
    page.keyboard.press('Space')
    expect(details).to_have_attribute('open', '')
    page.keyboard.press('Space')
    expect(details).not_to_have_attribute('open', '')
    assert not (external or bad_responses or errors), (external, bad_responses, errors)
    page.close()
    print(f'PASS {width}px (JS={scripts_enabled}): art, seven projects, Work Log, keyboard, no overflow')


def main(out):
    with tempfile.TemporaryDirectory() as directory:
        Path(directory, 'portfolio').symlink_to(out.resolve(), target_is_directory=True)
        handler = partial(QuietHandler, directory=directory)
        with ThreadingHTTPServer(('127.0.0.1', 0), handler) as serve:
            Thread(target=serve.serve_forever, daemon=True).start()
            try:
                with sync_playwright() as instance:
                    browser = instance.chromium.launch()
                    try:
                        for width, scripts_enabled in LAYOUTS:
                            smoke(browser, f'http://127.0.0.1:{serve.server_port}/portfolio/',
                                  width, scripts_enabled)
                    finally:
                        browser.close()
            finally:
                serve.shutdown()


if __name__ == '__main__':
    main(Path(sys.argv[1]))
