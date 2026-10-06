/*
 * ELÄVÄN OPPAAN OHJAIMET (omistaja 6.10.2026; Päätoimittajan yksi sopimus 12.0x, opas-juna 148): Kysy, Liiku, mikrofoni ja
 * näppäimistö puhuvat suoraan matkaoppaalle (ei Pulun chattiin).
 *   GET  /opas/kysymykset?paikka&nimi&kaupunki → { paikka, kysymykset: [5–6] }   (esihaku pysähdyksen yhteydessä, R2 30 vrk)
 *   POST /opas/kysy { kaupunki, paikka, kysymys, historia, istunto, kaydyt }
 *        → { teksti, aani…, toiminto, kysymykset: [2] }
 *   GET  /opas/liiku?kaupunki[&lat&lon] → { kaupunki, kohteet: [12 tärkeysjärjestyksessä] }  (R2 30 vrk)
 * toiminto: { tyyppi: 'siirry', nimi, lat, lon, ulkona } | { tyyppi: 'kohde', id } | { tyyppi: 'kaupunki', nimi, lat, lon }
 *   | { tyyppi: 'kierros' } | { tyyppi: 'tauko' } | { tyyppi: 'jatka' } | null.
 */

const siivoa = (t, katto) => String(t ?? '').replace(/[\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, katto);

export const KYSYMYKSIA = 6;
export const LIIKU_KOHTEITA = 12;
export const ULKONA_KM = 30;
export const KESKUSTELU_TTL_S = 30 * 86400;
export const kysymysAvain = (paikka) => `opas:kysymykset:v1:${String(paikka ?? '').slice(0, 120)}`;
export const liikuAvain = (kaupunki) => `opas:liiku:v1:${String(kaupunki ?? '').toLowerCase().replace(/\s+/g, '-').slice(0, 80)}`;

/** Lyhyt kokonainen kysymys (≤ 60 mrk, päättyy kysymysmerkkiin) tai null. */
export function kysymykseksi(t) {
  const s = siivoa(String(t ?? '').replace(/^[-–•*\d.)\s]+/, ''), 80);
  return s.length >= 6 && s.length <= 60 && s.endsWith('?') ? s : null;
}

export function poimiKysymykset(teksti, maara = KYSYMYKSIA) {
  const tulos = [];
  for (const rivi of String(teksti ?? '').split(/\n|;/)) {
    const k = kysymykseksi(rivi.replace(/^\s*(KYSYMYS|JATKO)\s*:\s*/i, ''));
    if (k && !tulos.some((x) => x.toLowerCase() === k.toLowerCase())) tulos.push(k);
  }
  return tulos.slice(0, maara);
}

export const KYSYMYKSET_KEHOTE = `Keksit Matkakirja-pelin elävän oppaan pelaajalle valmiita kysymyksiä, joita hän voi \
napauttaa oppaalta. Pelaaja katsoo paikkaa ylhäältä. Kirjoitat suomeksi.

Kirjoita kuusi eri kysymystä juuri tästä paikasta, yksi kysymys riville, ilman numerointia ja johdantoa. Jokainen on \
kokonainen, luonteva kysymyslause verbin kanssa, enintään kuusi sanaa ja enintään kuusikymmentä merkkiä, ja päättyy \
kysymysmerkkiin. Kysy asioista, joihin opas osaa vastata varmasti: historia, rakentaminen, käyttö nyt, nähtävää, \
tarinat ja ihmiset. Ei hintoja, aukioloaikoja eikä liikenneyhteyksiä. Hyviä: "Kuka rakensi tämän sillan?", \
"Miksi kanava on niin leveä?".`;

export const kysymystenViesti = ({ nimi, kaupunki }) => `Paikka: ${nimi}${kaupunki ? `, ${kaupunki}` : ''}.`;

export const KESKUSTELU_KEHOTE = `Olet Matkakirja-pelin kertoja ja matkaopas, ja puhut suomea. Kuulijasi on nuori Fogg, \
joka katsoo kaupunkia ylhäältä ja puhuu sinulle mikrofonilla tai näppäimistöllä. Kuulijat ovat kolmetoistavuotiaita ja \
aikuisia. Et ole Pulu. Puhut kuin kokenut suomalainen opas: luontevaa yleiskieltä, ei käännöskieltä eikä mainoskieltä.

VASTAUS. Kaksi tai kolme lyhyttä virkettä puhuttavaksi, ei luetteloita, sulkeita, lyhenteitä eikä emojeita; vuosiluvut ja \
numerot sanoina. Käytät vain varmaa yleistietoa; jos et tiedä, sanot sen lyhyesti. Ei hintoja, aukioloaikoja eikä \
liikenneyhteyksiä. Ei poliittisia kannanottoja.

TOIMINTO. Päättele, mitä pelaaja haluaa:
- siirry: hän haluaa nähdä tietyn paikan (nimeä se tarkasti; englanninkielisen Wikipedian otsikko mukaan)
- kohde: hän valitsee paikan alla olevasta kohdelistasta (anna listan tunnus)
- kaupunki: hän haluaa toiseen kaupunkiin
- kierros: hän haluaa kaupunkikierroksen
- tauko: hän haluaa pysähtyä tai hiljaisuutta
- jatka: hän haluaa jatkaa
- ei: hän kysyy jotain tai juttelee; vastaat nykyisestä paikasta tai kaupungista
Kun toiminto on siirry, kohde tai kaupunki, vastaus on lyhyt luonteva siirtymälause (esimerkiksi "Lennetään Rialton \
sillalle."), ei kappaletta paikasta.

JATKOT. Kaksi lyhyttä jatkokysymystä pelaajan suulla, kokonaisia kysymyksiä verbin kanssa, enintään kuusi sanaa.

VASTAUKSEN MUOTO, ei mitään muuta:
TOIMINTO: <ei | siirry | kohde | kaupunki | kierros | tauko | jatka>
KOHDE: <siirry: paikan nimi | englanninkielisen Wikipedian otsikko; kohde: listan tunnus; kaupunki: kaupungin nimi suomeksi; muuten jätä pois>
TEKSTI: <vastaus>
JATKO: <ensimmäinen jatkokysymys>
JATKO: <toinen jatkokysymys>`;

export function keskustelunViesti({ kaupunki, paikka, kysymys, historia = [], kohteet = [] }) {
  return [
    `Kaupunki: ${kaupunki ?? 'tuntematon'}.`,
    paikka?.nimi ? `Pelaaja katsoo nyt: ${paikka.nimi}.` : 'Pelaaja katsoo kaupunkia.',
    kohteet.length ? `Kohdelista (tunnus: nimi): ${kohteet.map((k) => `${k.id}: ${k.nimi}`).join('; ')}` : '',
    historia.length ? `Aiemmin:\n${historia.map((h) => `${h.rooli === 'opas' ? 'Opas' : 'Pelaaja'}: ${h.teksti}`).join('\n')}` : '',
    `Pelaaja sanoo: ${kysymys}`,
  ].filter(Boolean).join('\n');
}

const TOIMINNOT = ['ei', 'siirry', 'kohde', 'kaupunki', 'kierros', 'tauko', 'jatka'];
const kentta = (t, n) => new RegExp(`^\\s*${n}\\s*:\\s*(.+)$`, 'im').exec(String(t ?? ''))?.[1]?.trim() ?? null;

/** Mallin vastaus → { toiminto, kohde, teksti, jatkot } tai null (ei tekstiä). */
export function jasennaKeskustelu(teksti) {
  const vastaus = siivoa(kentta(teksti, 'TEKSTI'), 600);
  if (!vastaus) return null;
  const t = String(kentta(teksti, 'TOIMINTO') ?? 'ei').toLowerCase().replace(/[^a-zäö]/g, '');
  const [nimi, wikipedia] = String(kentta(teksti, 'KOHDE') ?? '').split('|').map((x) => siivoa(x, 160));
  const jatkot = [...String(teksti ?? '').matchAll(/^\s*JATKO\s*:\s*(.+)$/gim)].map((m) => kysymykseksi(m[1])).filter(Boolean).slice(0, 2);
  return { toiminto: TOIMINNOT.includes(t) ? t : 'ei', kohde: nimi || null, wikipedia: wikipedia || null, teksti: vastaus, jatkot };
}

export function siivoaKeskustelu(runko) {
  const p = runko?.paikka;
  const lat = Number(p?.lat), lon = Number(p?.lon);
  return {
    kaupunki: siivoa(runko?.kaupunki, 80) || null,
    paikka: p && typeof p === 'object' ? { id: siivoa(p.id, 120) || null, nimi: siivoa(p.nimi, 120) || null,
      lat: Number.isFinite(lat) ? lat : null, lon: Number.isFinite(lon) ? lon : null } : null,
    kysymys: siivoa(runko?.kysymys, 400),
    historia: (Array.isArray(runko?.historia) ? runko.historia : []).slice(-6)
      .map((h) => ({ rooli: h?.rooli === 'opas' ? 'opas' : 'pelaaja', teksti: siivoa(h?.teksti, 400) })).filter((h) => h.teksti),
    istunto: siivoa(runko?.istunto, 64) || null,
  };
}

export const LIIKU_KEHOTE = `Valitset Matkakirja-pelin elävälle oppaalle kaupungin tärkeimmät kohteet tärkeysjärjestyksessä: \
ne, jotka matkailija haluaisi nähdä ensin. Kohteet näkyvät ilmasta (rakennus, aukio, puisto, satama, kanava, silta, \
kaupunginosa), eivät museoesineitä. Vain todellisia paikkoja, joilla on artikkeli englanninkielisessä Wikipediassa. \
Kirjoitat suomeksi.

Tasan ${LIIKU_KOHTEITA} riviä tärkeimmästä alkaen, ei mitään muuta:
KOHDE: <nimi suomeksi tai vakiintunut alkuperäinen> | <englanninkielisen Wikipedia-artikkelin tarkka otsikko> | \
<lyhyt kuvaus enintään viisi sanaa> | <luokka: katu, kanava, aukio, rakennus, torni, kirkko, linnoitus, puisto, vesi, silta tai muu>`;

const LUOKAT = ['katu', 'kanava', 'aukio', 'rakennus', 'torni', 'kirkko', 'linnoitus', 'puisto', 'vesi', 'silta', 'muu'];

export function jasennaLiiku(teksti) {
  const tulos = [];
  for (const m of String(teksti ?? '').matchAll(/^\s*KOHDE\s*:\s*(.+)$/gim)) {
    const [nimi, wikipedia, alarivi, luokka] = m[1].split('|').map((x) => x.trim());
    const k = { nimi: siivoa(nimi, 120), wikipedia: siivoa(wikipedia, 200) || null, alarivi: siivoa(alarivi, 60) || null,
      luokka: LUOKAT.includes(String(luokka ?? '').toLowerCase()) ? luokka.toLowerCase() : null };
    if (k.nimi && !tulos.some((x) => x.nimi.toLowerCase() === k.nimi.toLowerCase())) tulos.push(k);
  }
  return tulos.slice(0, LIIKU_KOHTEITA);
}

/** Isoympyräetäisyys km. */
export function etaisyysKm(a, b) {
  const r = Math.PI / 180;
  const s = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(s)));
}
