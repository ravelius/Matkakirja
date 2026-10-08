/*
 * OPPAAN SYÖTESUODATIN (Päätoimittaja 7.10.2026, docs/raportit/opas-alaikaiset-tarkistus.md kohta 2; Anthropicin ohje
 * "Guidelines for Organizations Serving Minors"): toinen kerros kehotteen turvaosion rinnalle. Ei kattava moderointi:
 * selvät henkilötiedot ja selvästi asiattomat pyynnöt saavat valmiin ystävällisen vastauksen ilman mallikutsua ja ilman
 * ääntä. Pelaajan omaa hätää ilmaiseva viesti saa lämpimän ohjauksen aikuisen ja avun luo. Historian aiheet (murha,
 * sota, itsemurha historiallisena tapahtumana) eivät laukaise suodatinta: vain ensimmäisen persoonan hätä.
 */

const HENKILOTIETO = [
  /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/,                                   // sähköposti
  /(?:\+|\b0)\d[\d\s-]{6,}\d\b/,                                    // puhelinnumero
  /\b\d{6}[-+A-FU-Y]\d{3}[0-9A-Y]\b/i,                              // henkilötunnus
  /(?<![\p{L}])(?:osoitteeni|kotiosoite|asun\s+\p{L}+(?:kadulla|tiellä|kujalla)|puhelinnumeroni|numeroni on|sähköpostini)(?![\p{L}])/iu,
];

const HATA = /(?<![\p{L}])(?:haluan kuolla|tapan itseni|tappaa itseni|satutan itseäni|satuttaa itseäni|en jaksa elää|kill myself|want to die|hurt myself)(?![\p{L}])/iu;

// Selvästi seksuaalinen tai muu alaikäisille sopimaton pyyntö (sanaraja, ei osittaisosumia historiallisiin sanoihin).
const ASIATON = /(?<![\p{L}])(?:porno\p{L}*|porn\p{L}*|seksi\p{L}*|sex|alasti|nude\p{L}*|huume\p{L}* (?:osta|ostaa|hanki|tee)\p{L}*|miten teen pommin|how to make a bomb)(?![\p{L}])/iu;

export const VASTAUS_HENKILOTIETO = 'Kiitos, mutta älä kerro minulle henkilötietojasi, kuten nimeä, osoitetta tai puhelinnumeroa. '
  + 'Kysy mieluummin jotain tästä kaupungista, niin kerron.';
export const VASTAUS_ASIATON = 'Siinä en voi auttaa. Kerron mieluummin tästä kaupungista: kysy vaikka, mikä tuolla alhaalla on.';
export const VASTAUS_HATA = 'Kiitos, että kerroit. Puhu tästä luotettavan aikuisen kanssa. Hätätilanteessa soita 112, '
  + 'ja nuorten keskusteluapua saa esimerkiksi MIELI ry:n Sekasin-chatista.';
export const TURVA_JATKOT = ['Mikä tuo rakennus on?', 'Mitä täällä kannattaa nähdä?'];

/** Pelaajan vapaa teksti → null (ok) tai { tyyppi: 'henkilotieto'|'asiaton'|'hata', teksti } valmiiksi vastaukseksi. */
export function tarkistaSyote(teksti) {
  const t = String(teksti ?? '');
  if (!t.trim()) return null;
  if (HATA.test(t)) return { tyyppi: 'hata', teksti: VASTAUS_HATA };
  if (HENKILOTIETO.some((r) => r.test(t))) return { tyyppi: 'henkilotieto', teksti: VASTAUS_HENKILOTIETO };
  if (ASIATON.test(t)) return { tyyppi: 'asiaton', teksti: VASTAUS_ASIATON };
  return null;
}
