/*
 * VUOSILUVUT NUMEROINA MALLILTA, SANOINA PUHEESEEN (Päätoimittaja 7.10.2026 00.2x, #4082:n jatko): malli sotki pitkiä
 * lukusanoja ("tuhatkahdeksansataaltakahdeksankymmentäyhdeksän"). Malli kirjoittaa nyt vuosiluvut numeroina (näytölle
 * numerot), ja tämä muuntaa ne deterministisesti suomeksi vasta ElevenLabsille lähtevään tekstiin.
 *
 *   vuonna 1889        → vuonna tuhatkahdeksansataakahdeksankymmentäyhdeksän
 *   1300-luvulla       → tuhatkolmesataaluvulla        (alkuosa perusmuodossa; vain 2000-luku = kaksituhatluku)
 *   1870-luvun lopulla → tuhatkahdeksansataaseitsemänkymmentäluvun lopulla
 *   1600- ja 1700-luvuilla → tuhatkuusisataa- ja tuhatseitsemänsataaluvuilla
 *
 * Sama luku-algoritmi kuin js/linssipuhe.js:n lukuSanoina (worker ei tuo selainmoduuleja).
 */
const YKSIKOT = ['', 'yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän'];

function alleTuhat(n) {
  let sanat = '';
  const sadat = Math.floor(n / 100), kymmenet = Math.floor((n % 100) / 10), ykkoset = n % 10;
  if (sadat) sanat += sadat === 1 ? 'sata' : `${YKSIKOT[sadat]}sataa`;
  if (kymmenet === 1) sanat += ykkoset ? `${YKSIKOT[ykkoset]}toista` : 'kymmenen';
  else {
    if (kymmenet) sanat += `${YKSIKOT[kymmenet]}kymmentä`;
    if (ykkoset) sanat += YKSIKOT[ykkoset];
  }
  return sanat;
}

/** 0–9 999 suomeksi yhteen kirjoitettuna (perusmuoto). */
export function lukuSanoina(luku) {
  const n = Number(luku);
  if (!Number.isInteger(n) || n < 0 || n > 9999) return String(luku);
  if (n === 0) return 'nolla';
  const tuhannet = Math.floor(n / 1000);
  return (tuhannet === 1 ? 'tuhat' : tuhannet ? `${YKSIKOT[tuhannet]}tuhatta` : '') + alleTuhat(n % 1000);
}

/** Luku-yhdyssanan alkuosa: 1600 → tuhatkuusisataa, 1870 → tuhatkahdeksansataaseitsemänkymmentä, 2000 → kaksituhat. */
export function lukuAlkuosana(luku) {
  return lukuSanoina(luku).replace(/tuhatta$/, 'tuhat');
}

/** Oppaan teksti puhuttavaksi: vuosiluvut ja vuosisadat/-kymmenet sanoiksi, muu teksti sellaisenaan. */
export function vuosiluvutSanoiksi(teksti) {
  return String(teksti ?? '')
    // 1300-luku, 1870-luvulla, 1600-lukua …
    .replace(/(?<![\d,.])(\d{2,4})-(luku|luvu|luvi)/g, (_, n, loppu) => `${lukuAlkuosana(n)}${loppu}`)
    // 1600- ja 1700-luvuilla (yhdysmerkki jää: tuhatkuusisataa- ja …)
    .replace(/(?<![\d,.])(\d{2,4})-(?=\s+(?:ja|tai|sekä)\s)/g, (_, n) => `${lukuAlkuosana(n)}-`)
    // vuonna 800 / vuoden 476
    .replace(/\b(vuonna|vuoden|vuodesta|vuoteen)\s+(\d{2,3})\b(?![\d,.:]\d)/gi, (_, sana, n) => `${sana} ${lukuSanoina(n)}`)
    // nelinumeroiset vuodet 1000–2099 (ei desimaali- tai ryhmiteltyjen lukujen osana)
    .replace(/(?<![\d,. ])\b(1\d{3}|20\d{2})\b(?!\d|[,.:]\d|[\s ]\d{3}\b)/g, (n) => lukuSanoina(n));
}
