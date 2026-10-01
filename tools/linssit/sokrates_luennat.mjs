/*
 * Sokrates-pilotin luennat (Linnanrakentaja 1.10.2026; omistajan lupa 23.1x, tekstit hyväksytty sanatarkasti).
 * Resepti kuten tools/generoi-luennat.mjs: ääni "Viisas Kertoja", eleven_v3, /v1/text-to-dialogue,
 * mp3_44100_192, stability 0.5, lopputauko 1,0 s. Enintään 3 ottoa per pätkä (--otto N).
 * Ääni ei kuulu repoon: ulos /Users/Shared/Claude/proto-3d/_lahteet/sokrates/luennat/<id>-otto<N>.mp3 + kuitti.json.
 *
 * Käyttö:  source ~/.zshrc >/dev/null 2>&1; node tools/linssit/sokrates_luennat.mjs [--vain a,b] [--otto 1]
 *          node tools/linssit/sokrates_luennat.mjs --dry-run
 * Avain luetaan ympäristöstä (ELEVEN_API_KEY); sitä ei tulosteta eikä tallenneta.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
// Vakiot kopioitu tools/generoi-luennat.mjs:stä; sitä EI tuoda, koska sen huipputason koodi ajaisi kaupunkiluennat.
const AANI = 'Sz0tRTEpybtDJ9ru2kgD';   // Viisas Kertoja
const MALLI = 'eleven_v3', OUTPUT_FORMAT = 'mp3_44100_192', STABILITY = 0.5, LOPPUTAUKO = ' <break time="1.0s" />';

export const PATKAT = {
  a: 'Tutkimaton elämä ei ole elämisen arvoinen ihmiselle.',
  b: 'Platonin mukaan sotilas Sokrates käveli talvella jäällä paljain jaloin ja seisoi kerran aamusta seuraavaan aamuun ajatuksiinsa vaipuneena. Taistelussa hän pelasti haavoittuneen Alkibiadeen.',
  c: 'Mitä en tiedä, en luulekaan tietäväni.',
  d: 'Delfoin oraakkeli vastasi Sokrateen ystävälle, ettei kukaan ole Sokratesta viisaampi. Hämmästynyt Sokrates lähti kysymään ateenalaisilta viisailta, mitä he oikeasti tiesivät.',
  e: 'Vääryyttä ei siis saa tehdä koskaan.',
  f: 'Vuonna 399 ennen ajanlaskun alkua Sokrates tuomittiin kuolemaan jumalattomuudesta ja nuorison turmelemisesta. Ystävät tarjosivat hänelle pakotietä vankilasta, mutta hän kieltäytyi, koska vääryyttä ei saa vastata vääryydellä.',
};
const ULOS = '/Users/Shared/Claude/proto-3d/_lahteet/sokrates/luennat';
const A = process.argv.slice(2);
const arvo = (lippu, oletus) => (A.includes(lippu) ? A[A.indexOf(lippu) + 1] : oletus);
const vain = arvo('--vain', Object.keys(PATKAT).join(',')).split(',');
const otto = Number(arvo('--otto', '1'));
if (!(otto >= 1 && otto <= 3)) throw new Error('otto 1–3 (omistaja: enintään 3 ottoa per pätkä)');

mkdirSync(ULOS, { recursive: true });
const kuittiPolku = `${ULOS}/kuitti.json`;
const kuitti = existsSync(kuittiPolku) ? JSON.parse(readFileSync(kuittiPolku, 'utf8')) : {};
for (const id of vain) {
  const teksti = PATKAT[id];
  const tiedosto = `${ULOS}/${id}-otto${otto}.mp3`;
  console.log(`${id}: ${teksti.length} merkkiä → ${tiedosto}`);
  if (A.includes('--dry-run')) continue;
  if (existsSync(tiedosto)) { console.log(`${id}: otto ${otto} on jo olemassa, ohitetaan`); continue; }
  const avain = process.env.ELEVEN_API_KEY;
  if (!avain) throw new Error('ELEVEN_API_KEY puuttuu (aja ensin: source ~/.zshrc)');
  const vastaus = await fetch(`https://api.elevenlabs.io/v1/text-to-dialogue?output_format=${OUTPUT_FORMAT}`, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: [{ text: teksti + LOPPUTAUKO, voice_id: AANI }], model_id: MALLI,
                           settings: { stability: STABILITY } }),
    signal: AbortSignal.timeout(180000),
  });
  if (!vastaus.ok) { console.error(`${id}: HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 300)}`); continue; }
  writeFileSync(tiedosto, Buffer.from(await vastaus.arrayBuffer()));
  kuitti[`${id}-otto${otto}`] = { merkit: teksti.length, aani: AANI, malli: MALLI, muoto: OUTPUT_FORMAT,
                                  stability: STABILITY, aika: new Date().toISOString() };
  writeFileSync(kuittiPolku, JSON.stringify(kuitti, null, 1));
}
