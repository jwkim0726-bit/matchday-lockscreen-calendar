import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("/Users/jiwon/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const appUrl = process.env.MATCHDAY_TEST_URL ?? "http://127.0.0.1:3010";

test("major Matchday actions push privacy-safe analytics events once", async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && message.text() !== "Failed to load resource: net::ERR_FAILED") consoleErrors.push(message.text());
  });

  await page.route("https://www.googletagmanager.com/**", (route) => route.abort());
  await page.goto(appUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".team-grid .team-card");
  await page.evaluate(() => { window.dataLayer = []; });

  const teamCards = page.locator(".team-grid .team-card");
  await teamCards.nth(1).click();
  await teamCards.nth(1).click();

  await page.locator('input[placeholder="2026-07"]').fill("2026-08");
  await page.locator('input[placeholder="2026-07"]').fill("2026-08");

  await page.getByRole("button", { name: "배경화면", exact: true }).click();
  await page.getByRole("button", { name: "배경화면", exact: true }).click();

  const backgroundInput = page.locator('label.upload input[type="file"]');
  await backgroundInput.setInputFiles({
    name: "private-user-photo.png",
    mimeType: "image/png",
    buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nWQAAAAASUVORK5CYII=", "base64"),
  });
  await page.waitForFunction(() => window.dataLayer?.some((item) => item.event === "background_upload"));

  await page.getByRole("button", { name: "미드나잇" }).click();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "저장↓" }).click();
  await downloadPromise;

  const events = await page.evaluate(() => window.dataLayer ?? []);
  const named = (name) => events.filter((item) => item.event === name);

  assert.equal(named("team_select").length, 1);
  assert.equal(named("month_select").length, 1);
  assert.equal(named("screen_type_select").length, 1);
  assert.equal(named("background_upload").length, 1);
  assert.equal(named("customize_start").length, 1);
  assert.equal(named("wallpaper_download").length, 1);

  assert.deepEqual(Object.keys(named("team_select")[0]).sort(), ["event", "sport", "team"]);
  assert.equal(named("month_select")[0].month, "2026-08");
  assert.equal(named("screen_type_select")[0].screen_type, "wallpaper");
  assert.equal(named("wallpaper_download")[0].screen_type, "wallpaper");
  assert.equal(named("wallpaper_download")[0].resolution, "original");
  assert.equal(named("wallpaper_download")[0].display_style, "text");

  const serialized = JSON.stringify(events);
  assert.equal(serialized.includes("private-user-photo.png"), false);
  assert.equal(serialized.includes("blob:"), false);
  assert.equal(serialized.includes("data:image"), false);
  assert.equal(serialized.includes("@"), false);
  assert.equal(await page.locator("[data-nextjs-dialog]").count(), 0);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(consoleErrors, []);

  await browser.close();
});
