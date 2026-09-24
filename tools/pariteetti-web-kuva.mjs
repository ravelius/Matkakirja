// Pariteettikierroksen web-kuvatyökalu (Laitetestaaja 24.9.2026): kaappaa
// tuotannosta https://matkakirja.app/ pienennetyn JPEG:n vertailtavaksi
// natiivin kanssa. Chromium + --use-angle=metal (oikea GPU) tarvitaan,
// koska etusivun pallo/otsikko ("avaus-kesken"-luokka) ei ilman sitä
// koskaan valmistu Playwrightissa (Fable 24.9.2026). Jos "avaus-kesken"
// ei poistu 15 s:ssa oikealla GPU:lla, se on ilmoitettava Pelikoodarille
// bugina, ei ohitettava hiljaa.
//
// Käyttö: node pariteetti-web-kuva.mjs <ulostulo.jpg> [click:"Teksti"] [wait:ms] [tap:x,y] ...
// PW_W/PW_H ympäristömuuttujilla vaihdetaan pisteleveys (oletus iPhone
// 393×852; iPad 834×1194).
import { chromium } from 'playwright';

const [, , out, ...steps] = process.argv;
const width = Number(process.env.PW_W || 393);
const height = Number(process.env.PW_H || 852);

const browser = await chromium.launch({ args: ['--use-angle=metal'] });
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
await page.goto('https://matkakirja.app/', { waitUntil: 'networkidle' });
try {
  await page.waitForFunction(() => {
    const h2 = document.querySelector('.intro-juliste');
    return !h2 || !h2.classList.contains('avaus-kesken');
  }, { timeout: 15000 });
} catch { console.error('VAROITUS: avaus-kesken ei poistunut 15 s:ssa'); }
await page.waitForTimeout(500);

for (const step of steps) {
  if (step.startsWith('click:')) {
    const text = step.slice(6);
    await page.getByText(text, { exact: false }).first().click();
    await page.waitForTimeout(800);
  } else if (step.startsWith('wait:')) {
    await page.waitForTimeout(Number(step.slice(5)));
  } else if (step.startsWith('sel:')) {
    await page.click(step.slice(4));
    await page.waitForTimeout(800);
  } else if (step.startsWith('tap:')) {
    const [x, y] = step.slice(4).split(',').map(Number);
    await page.mouse.click(x, y);
    await page.waitForTimeout(500);
  }
}
await page.screenshot({ path: out, quality: 60, type: 'jpeg' });
await browser.close();
console.log('OK', out);
