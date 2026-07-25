import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", {
      headers: {
        accept: "text/html",
        host: "portfolio.example",
        "x-forwarded-host": "portfolio.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the finished public portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Pablo De La Cruz \| AI systems, data &amp; developer education<\/title>/i,
  );
  assert.match(html, /Technical Trainer at Revature/);
  assert.match(html, /Canvas Native Lab/);
  assert.match(html, /Data Analytics Learning Lab/);
  assert.match(html, /Data Engineering Workbench/);
  assert.match(html, /Clanker Build Journal/);
  assert.match(html, /Independent projects/);
  assert.match(html, /linkedin\.com\/in\/pdelac01/);
  assert.match(html, /github\.com\/pablodcruz/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
  assert.doesNotMatch(
    html,
    /OpenAI trainer|OpenAI consultant|OpenAI Trainer Consultant|new employer|upcoming role/i,
  );
});

test("uses the absolute production social card URL", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(
    html,
    /<meta[^>]+property="og:image"[^>]+content="https:\/\/pablodcruz\.github\.io\/portfolio\/og\.png"/i,
  );
});
