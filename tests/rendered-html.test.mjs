import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("produces a native Next.js application build", async () => {
  await access(new URL("../.next/BUILD_ID", import.meta.url));
  await access(new URL("../.next/server/app/page.js", import.meta.url));

  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.dependencies.next, "16.2.6");
  assert.equal(packageJson.devDependencies?.vinext, undefined);
  assert.equal(packageJson.devDependencies?.wrangler, undefined);
  assert.equal(packageJson.devDependencies?.vite, undefined);
});

test("keeps the Arabic content, search metadata, and mobile behavior intact", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /المنصة الوطنية للقيادات النسائية العمانية/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /application\/ld\+json/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /"منصة قيادات"/);
  assert.match(layout, /"\/og\.png"/);
  assert.match(css, /max-width:\s*390px/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
