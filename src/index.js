require("dotenv").config({ path: "./src/.env" });

const puppe = require("puppeteer");

let username = process.env.USER_NAME;
let password = process.env.PASSWORD;

let browser = null;
let page = null;
(async () => {
  browser = await puppe.launch({ headless: false });

  page = await browser.newPage();
  page.setViewport({
    width: 1700,
    height: 900,
    isMobile: false,
  });

  await page.goto("https://instagram.com", { waitUntil: "networkidle2" });

  await page.type(`input[name="username"]`, username, { delay: 25 });
  await page.type(`input[name="password"]`, password, { delay: 25 });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  const [button] = await page.$x("//button[contains(., 'Not Now')]");
  if (button) {
    await button.click();
  }
  await page.waitForTimeout(2000);
  const [button2] = await page.$x("//button[contains(., 'Not Now')]");
  if (button2) {
    await button2.click();
  }

  await page.type(`input[placeholder="Search"]`, "reels");
  await page.waitForTimeout(2000);
  await page.click(`div[role="none"] a`);
  await page.waitForTimeout(4000);
  await page.click("div._9AhH0");
  await page.waitForTimeout(4000);
  await page.click(`svg[aria-label="Like"]`);
})();
