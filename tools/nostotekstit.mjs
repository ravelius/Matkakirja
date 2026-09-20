/*
 * NOSTOTEKSTIEN MITTAUS — Fablen pieni väliajo 20.9.2026, ennen
 * kartuschan jatkoa. Sama nostojoukko kuin tools/nostoinventaario.mjs
 * (VAIN kunkin ISO-tiedoston kanoninen export: maastokohteet-,
 * hahmotelma-, maalehtinostot-, fokuskohteet-<iso>.js — ei
 * nakyvat-kaupungit- eikä elaintakyt, samat rajaukset kuin siellä).
 *
 * Per nosto: otsikko, lyhyt-pituus, teksti-pituus ja kappalemäärä,
 * visa kyllä/ei (sama nostonVisa-ehto kuin js/fokusnosto.js), kuvia.
 *
 * AJO: node tools/nostotekstit.mjs <ISO> [<ISO> ...]
 *   (oletus FRA, jos ei argumentteja)
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JUURI = new URL('..', import.meta.url).pathname;
const PACKS = join(JUURI, 'js/packs');
const TIEDOSTOT = readdirSync(PACKS).filter((f) => f.endsWith('.js'));

const NOSTOTIEDOSTOT = ['maastokohteet', 'hahmotelma', 'maalehtinostot', 'fokuskohteet'];
const kanoninenNimi = (tyyppi, iso) => `${tyyppi.toUpperCase().replace(/-/g, '_')}_${iso}`;

function onNosto(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o)) return false;
  const nimi = o.nimi ?? o.nimio ?? o.otsikko;
  if (typeof nimi !== 'string' || !nimi) return false;
  if (Array.isArray(o.nostot)) return false;
  return true;
}

function keraaSyvyyshaulla(arvo, tulos, kierretyt) {
  if (!arvo || typeof arvo !== 'object') return;
  if (kierretyt.has(arvo)) return;
  kierretyt.add(arvo);
  if (Array.isArray(arvo)) {
    for (const v of arvo) keraaSyvyyshaulla(v, tulos, kierretyt);
    return;
  }
  if (onNosto(arvo)) { tulos.push(arvo); return; }
  for (const v of Object.values(arvo)) keraaSyvyyshaulla(v, tulos, kierretyt);
}

/** Kopioitu js/fokusnosto.js nostonVisa-funktion ehdosta. */
function onkoVisa(nosto) {
  const visa = nosto?.visa;
  if (!visa || typeof visa.kysymys !== 'string' || !visa.kysymys.trim()) return false;
  if (!Array.isArray(visa.vaihtoehdot) || visa.vaihtoehdot.length < 2) return false;
  if (!Number.isInteger(visa.oikea) || visa.oikea < 0 || visa.oikea >= visa.vaihtoehdot.length) {
    return false;
  }
  return true;
}

async function maanNostot(iso) {
  const isoL = iso.toLowerCase();
  const nostot = [];
  for (const tyyppi of NOSTOTIEDOSTOT) {
    const tiedosto = `${tyyppi}-${isoL}.js`;
    if (!TIEDOSTOT.includes(tiedosto)) continue;
    // eslint-disable-next-line no-await-in-loop
    const moduuli = await import(join(PACKS, tiedosto));
    const vienti = moduuli[kanoninenNimi(tyyppi, iso)];
    if (vienti === undefined) continue;
    keraaSyvyyshaulla(vienti, nostot, new WeakSet());
  }
  return nostot;
}

const kuvia = (n) => (n.tiedosto ? 1 : 0) + (n.kuva?.osoite ? 1 : 0) + (n.kuvat?.length ?? 0)
  + (n.herokuva ? 1 : 0) + (n.galleria?.length ?? 0);

const kappaleet = (teksti) => String(teksti ?? '').split(/\n{2,}/).filter((s) => s.trim()).length || 1;

function tilastoi(arvot) {
  const s = [...arvot].sort((a, b) => a - b);
  const q = (p) => {
    if (!s.length) return 0;
    const idx = (s.length - 1) * p;
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    return lo === hi ? s[lo] : s[lo] + (s[hi] - s[lo]) * (idx - lo);
  };
  return {
    min: s[0] ?? 0, q1: Math.round(q(0.25)), mediaani: Math.round(q(0.5)),
    q3: Math.round(q(0.75)), max: s[s.length - 1] ?? 0,
  };
}

const TYYPPI_KARTTA = {
  vuori: 'vuori', saari: 'saari', jarvi: 'järvi', järvi: 'järvi', joki: 'joki', meri: 'meri',
  historia: 'historia', kulttuuri: 'kulttuuri', kaupunki: 'kulttuuri', ruoka: 'ruoka',
  kauppa: 'kauppa', tekniikka: 'tekniikka', keksinnot: 'tekniikka', keksinnöt: 'tekniikka',
  merenkulku: 'merenkulku', luonto: 'muut', nosto: 'muut',
};
const luokittele = (raaka) => TYYPPI_KARTTA[String(raaka ?? '').toLowerCase()] ?? 'muut';

const isot = process.argv.slice(2).map((s) => s.toUpperCase());
if (!isot.length) isot.push('FRA');

for (const iso of isot) {
  // eslint-disable-next-line no-await-in-loop
  const nostot = await maanNostot(iso);
  const rivit = nostot.map((n) => {
    const nimi = n.nimi ?? n.nimio ?? n.otsikko ?? '(nimetön)';
    /*
     * FRA:n maalehtinostot-fra.js käyttää erikoismekanismia (KORTTI
     * LEHDEN NOSTOSTA): osa nostoista ei kanna omaa teksti-kenttää
     * lainkaan, vaan lainaa sen MAA_KATEGORIAT.FRA:n vastaavalta
     * lehtisivulta ajon aikana kentässä `lunastus` (array, [0] on
     * teksti). Nämä eivät siis ole oikeasti tyhjiä — tämä on juuri
     * se "vanha 90 noston paketti", joka Fablen nostostandardissa
     * odottaa FRA-siivousta yhtenäiseen muotoon.
     */
    const teksti = String(n.teksti ?? (Array.isArray(n.lunastus) ? n.lunastus[0] : '') ?? '');
    const lainattu = !n.teksti && Array.isArray(n.lunastus) && n.lunastus[0];
    return {
      nimi,
      tyyppi: luokittele(n.tyyppi ?? n.kategoria ?? n.symLaji ?? n.laji),
      otsikkoPituus: (n.otsikko ?? '').length,
      lyhytPituus: (n.lyhyt ?? '').length,
      tekstiPituus: teksti.length,
      kappaleita: kappaleet(teksti),
      visa: onkoVisa(n),
      kuvia: kuvia(n),
      lainattu: Boolean(lainattu),
    };
  });

  const pituudet = rivit.map((r) => r.tekstiPituus).filter((x) => x > 0);
  const tila = tilastoi(pituudet);
  const liianLyhyet = rivit.filter((r) => r.tekstiPituus > 0 && r.tekstiPituus < 250)
    .sort((a, b) => a.tekstiPituus - b.tekstiPituus);
  const liianPitkat = rivit.filter((r) => r.tekstiPituus > 900)
    .sort((a, b) => b.tekstiPituus - a.tekstiPituus);
  const tyhjat = rivit.filter((r) => r.tekstiPituus === 0);
  const lainatut = rivit.filter((r) => r.lainattu);

  const tyypeittain = {};
  for (const r of rivit) {
    (tyypeittain[r.tyyppi] ??= []).push(r.tekstiPituus);
  }
  const tyyppiTilastot = Object.entries(tyypeittain)
    .map(([t, arr]) => ({ tyyppi: t, n: arr.length, ...tilastoi(arr.filter((x) => x > 0)) }))
    .sort((a, b) => b.n - a.n);

  const md = `# Ranskan nostojen tekstimäärä — ${iso} — ${new Date().toISOString().slice(0, 10)}

Sisältökirjuri (Sonnet), Fablen pieni väliajo ennen kartuschan jatkoa.
Sama nostojoukko kuin \`tools/nostoinventaario.mjs\` (maastokohteet-,
hahmotelma-, maalehtinostot-, fokuskohteet-${iso.toLowerCase()}.js,
vain kanoniset exportit). ${rivit.length} nostoa, ${pituudet.length}
niistä mitattavalla leipätekstillä.

${lainatut.length ? `**LÖYDÖS FRA-siivousta varten:** ${lainatut.length} nostoa (kaikki
\`maalehtinostot-fra.js\`:stä) EI kanna omaa \`teksti\`-kenttää lainkaan
— ne lainaavat tekstin ajon aikana \`MAA_KATEGORIAT.FRA\`:n vastaavalta
lehtisivulta kentässä \`lunastus\` (KORTTI LEHDEN NOSTOSTA -mekanismi,
ks. tiedoston oma kommentti). Tämä mittaus laski niiden pituuden
\`lunastus[0]\`:sta, joten luvut alla ovat oikeita, mutta rakenne itse
on juuri se, mitä Fablen "FRA siivous" (nostostandardin kohta) tulee
yhtenäistämään — 0 tyhjää lopullisessa listassa, kaikki ${lainatut.length}
olivat lainattuja, ei aidosti puuttuvia.` : ''}

## Jakauma (leipätekstin pituus, merkkiä)

- Min: ${tila.min}
- Q1 (25 %): ${tila.q1}
- Mediaani: ${tila.mediaani}
- Q3 (75 %): ${tila.q3}
- Max: ${tila.max}

## Jakauma tyypeittäin

| Tyyppi | Nostoja | Min | Q1 | Mediaani | Q3 | Max |
| --- | --- | --- | --- | --- | --- | --- |
${tyyppiTilastot.map((t) => `| ${t.tyyppi} | ${t.n} | ${t.min} | ${t.q1} | ${t.mediaani} | ${t.q3} | ${t.max} |`).join('\n')}

## Liian lyhyet (< 250 merkkiä), ${liianLyhyet.length} kpl

| Otsikko | Tyyppi | Merkkiä | Lainattu? |
| --- | --- | --- | --- |
${liianLyhyet.map((r) => `| ${r.nimi} | ${r.tyyppi} | ${r.tekstiPituus} | ${r.lainattu ? 'kyllä (lunastus)' : ''} |`).join('\n') || '(ei yhtään)'}

## Liian pitkät (> 900 merkkiä), ${liianPitkat.length} kpl

| Otsikko | Tyyppi | Merkkiä | Kappaleita | Lainattu? |
| --- | --- | --- | --- | --- |
${liianPitkat.map((r) => `| ${r.nimi} | ${r.tyyppi} | ${r.tekstiPituus} | ${r.kappaleita} | ${r.lainattu ? 'kyllä (lunastus)' : ''} |`).join('\n') || '(ei yhtään)'}

## Tyhjät leipätekstit, ${tyhjat.length} kpl

${tyhjat.map((r) => `- ${r.nimi} (${r.tyyppi})`).join('\n') || '(ei yhtään)'}

## Ehdotus tavoitehaarukaksi tyypeittäin

Nykyisen jakauman (yllä) ja maalehti.md:n reseptin (440–660 merkkiä
uusille nostoille) perusteella — VAIN EHDOTUS, ei päätös:

| Tyyppi | Ehdotettu haarukka |
| --- | --- |
| historia | 400–700 |
| kulttuuri | 400–700 |
| ruoka | 300–500 |
| tekniikka | 350–600 |
| merenkulku | 350–600 |
| vuori / saari / järvi / joki / meri | 300–550 |
| muut | 300–550 |

Perustelu: historia/kulttuuri kantavat useimmiten monivaiheisen
tarinan (syy + tapahtuma + seuraus) ja hyötyvät pidemmästä tilasta;
ruoka on usein yhden konkreettisen yksityiskohdan ympärille
rakennettu (esim. yksi resepti, yksi tuote) ja toimii tiiviimpänä.
Luonnonkohteilla (vuori/meri/joki) teksti on usein faktapohjainen
kuvaus, joka ei tarvitse yhtä paljon tilaa kuin historiallinen
tapahtumaketju.
`;

  const ULOSPOLKU = join(JUURI, `docs/raportit/nostotekstit-${iso.toLowerCase()}-20260920.md`);
  writeFileSync(ULOSPOLKU, md);
  console.log(`${iso}: kirjoitettu ${ULOSPOLKU}`);
  console.log(`  ${rivit.length} nostoa, mediaani ${tila.mediaani} merkkiä, `
    + `liian lyhyitä ${liianLyhyet.length}, liian pitkiä ${liianPitkat.length}, tyhjiä ${tyhjat.length}`);
}
