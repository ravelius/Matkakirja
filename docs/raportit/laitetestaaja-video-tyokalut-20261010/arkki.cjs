const { createRequire } = require('module');
const req = createRequire('/Users/Shared/Claude/wt/codex-eurooppa-miniatyyrit-koonti-20261008/package.json');
const sharp = req('sharp');
const { execFileSync } = require('child_process');
const fs = require('fs');
const S = process.argv[2];
const rows = JSON.parse(fs.readFileSync(S + '/rows.json', 'utf8'));
const W = '/Users/Shared/Claude/wt/codex-eurooppa-miniatyyrit-koonti-20261008/';
const T = 100, G = 4, LBL = 120, BLK = 7 * (T + G), DIV = 20;
const PAPER = { r: 240, g: 232, b: 212 };
const H = 36 + rows.length * (T + G + 2);
const WIDTH = LBL + BLK + DIV + BLK + 8;
(async () => {
  const thumb = async (buf) => sharp(buf).resize(T, T, { fit: 'contain', background: { ...PAPER, alpha: 1 } }).flatten({ background: PAPER }).png().toBuffer();
  const comps = [];
  const svg = (x, y, w, h, txt, size = 14, anchor = 'start') => Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><text x="${anchor === 'middle' ? w / 2 : 2}" y="${size + 2}" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="bold" fill="#222" text-anchor="${anchor}">${txt}</text></svg>`);
  comps.push({ input: svg(0, 0, BLK, 30, 'ENNEN (main 52a8fa7bf)', 16, 'middle'), left: LBL, top: 4 });
  comps.push({ input: svg(0, 0, BLK, 30, 'JÄLKEEN (koonti)', 16, 'middle'), left: LBL + BLK + DIV, top: 4 });
  let y = 34, total = 0;
  for (const r of rows) {
    comps.push({ input: svg(0, 0, LBL, 40, `${r.city}`, 15), left: 4, top: y + 8 });
    comps.push({ input: svg(0, 0, LBL, 24, `PR ${r.pr} · ${r.files.length} kuvaa`, 11), left: 4, top: y + 32 });
    let x = LBL;
    for (const f of r.files) {
      const p = f;
      const oldb = execFileSync('git', ['-C', W, 'show', 'origin/main:' + p], { maxBuffer: 1 << 26 });
      comps.push({ input: await thumb(oldb), left: x, top: y });
      comps.push({ input: await thumb(fs.readFileSync(W + p)), left: x + BLK + DIV, top: y });
      x += T + G; total++;
    }
    y += T + G + 2;
  }
  await sharp({ create: { width: WIDTH, height: H, channels: 3, background: { r: 255, g: 255, b: 255 } } })
    .composite(comps).png().toFile(S + '/miniatyyrit-koonti-ennen-jalkeen-20261008.png');
  console.log('ok', WIDTH, H, 'kuvia', total);
})();
