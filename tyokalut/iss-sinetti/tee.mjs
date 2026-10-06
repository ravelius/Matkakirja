const m = await import(process.env.PW); const chromium = m.chromium ?? m.default.chromium;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1024, height: 1024 } });
await p.goto('file://' + process.env.HTML); await p.waitForTimeout(300);
await p.locator('#s').screenshot({ path: process.env.ULOS, omitBackground: true }); await b.close();
