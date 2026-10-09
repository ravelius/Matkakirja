// VALMISLUENNAT V1 KULTAISENA (PT 9.10.2026: toistotesti Peli-testinä, ei simua). Tuottaa
//   valmisluennat-v1/manifest.json.gz  = ämpärin aanet/luennat/v1/manifest.json sellaisenaan (vienti 9.10. 15.51, SHA b104ec1e…)
//   valmisluennat-v1/pyynnot.jsonl.gz  = pelin pyytämät kappaleet (Natiivi-UI:n `ui nostoluennat` -vienti simussa 9.10.: nostot +
//     5 lajia ja lehdet), yksilöitynä (teksti, loppuTagi); m = kuuluu esigeneroituun joukkoon (false = maalehden muu kuin etusivu,
//     omistajan rajaus 9.10. → palavirta). Ensimmäinen rivi = otsake (aani, nopeus, malli).
// Käyttö: node tee-valmisluennat-kultainen.mjs <vienti-1219.jsonl> <vienti-1317.jsonl> [manifest.json]
import fs from 'node:fs';
import zlib from 'node:zlib';
const [a, b, m] = process.argv.slice(2);
const rivit = [a, b].flatMap((p) => fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)));
const otsake = rivit.find((r) => r.otsake);
const rajattu = (p) => p.laji === 'lehdet' && String(p.lahde ?? '').startsWith('maa:') && !String(p.lahde ?? '').endsWith('@etusivu');
const pyynnot = new Map();
for (const p of rivit.filter((r) => !r.otsake)) {
  const k = `${p.teksti.normalize('NFC')}\u0000${p.loppuTagi ?? ''}`;
  const e = pyynnot.get(k) ?? { t: p.teksti, l: p.loppuTagi ?? '', laji: p.laji ?? 'nostot', m: false };
  e.m ||= !rajattu(p); pyynnot.set(k, e);
}
const manifesti = m ? fs.readFileSync(m) : Buffer.from(await (await fetch(`https://media.matkakirja.app/aanet/luennat/v1/manifest.json?t=${Date.now()}`)).arrayBuffer());
fs.mkdirSync('valmisluennat-v1', { recursive: true });
fs.writeFileSync('valmisluennat-v1/manifest.json.gz', zlib.gzipSync(manifesti, { level: 9 }));
const ots = { otsake: true, aani: otsake.aani, nopeus: otsake.nopeus, malli: 'eleven_v4_turbo', luotu: otsake.luotu, maat: otsake.maat };
const teksti = [ots, ...pyynnot.values()].map((r) => JSON.stringify(r)).join('\n') + '\n';
fs.writeFileSync('valmisluennat-v1/pyynnot.jsonl.gz', zlib.gzipSync(Buffer.from(teksti, 'utf8'), { level: 9 }));
const n = [...pyynnot.values()];
console.log(`pyyntöjä ${n.length} (esigeneroitu ${n.filter((x) => x.m).length}, rajattu ${n.filter((x) => !x.m).length}), manifesti ${manifesti.length} t`);
