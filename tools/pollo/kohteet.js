/*
 * ELÄVÄN OPPAAN TÄKYLUETTELO (omistaja TF 144 -palaute 5.10.2026: "linssin pitää alkaa täkyluettelolla"; Päätoimittaja,
 * muoto Linssisepän kanssa; juna 146–147).
 *
 * GET /opas/kohteet → noin 8 kiinnostavinta kohdetta, joista opas aloittaa (pelaaja valitsee, kertoja odottaa):
 *   - ilman kaupunkia: KOKO MAAILMA, yksittäiset nähtävyydet ja kaupunginosat (ei pelkkiä kaupunkinimiä), painotus
 *     kaupunkeihin, joissa Googlen fotorealistinen 3D on hyvä; vaihtuu päivittäin (eilisiä ei toisteta),
 *   - kaupungin kanssa (?kaupunki=&lat=&lon=): kaupungin kärkikohteet.
 * Sonnet valitsee ja kirjoittaa koukkurivin; koordinaatit nimellä (P625/Wikipedia) ja kuva Wikidatan P18:sta vapailla
 * lisensseillä. Välimuisti KV:ssä päivittäin (UTC), eli yksi mallikutsu päivää ja luetteloa kohden.
 */

export const KOHTEITA = 8;
export const KOUKUN_KATTO = 90;

const siivoa = (t, katto) => String(t ?? '').replace(/[\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, katto);
/** Koukku sanarajalle: liian pitkä katkaistaan viimeiseen kokonaiseen sanaan ja päätetään pisteeseen (ei kesken sanan). */
function koukuksi(t) {
  const s = String(t ?? '').replace(/\s+/g, ' ').trim();
  if (s.length <= KOUKUN_KATTO) return s;
  const lyhyt = s.slice(0, KOUKUN_KATTO).replace(/\s+\S*$/, '').replace(/[,;:–-]+$/, '');
  return /[.!?]$/.test(lyhyt) ? lyhyt : `${lyhyt}.`;
}

export const KOHTEET_KEHOTE = `Valitset Matkakirja-pelin elävälle oppaalle täkyluettelon: tasan ${KOHTEITA} kohdetta, joista \
pelaaja valitsee yhden ja kamera lentää sen ylle kertojan kertoessa. Kohteet ovat yksittäisiä nähtävyyksiä tai \
kaupunginosia, jotka näkyvät ilmasta (esimerkiksi Venetsian Canal Grande, Akropolis, Central Park), eivät pelkkiä \
kaupunkien nimiä. Kirjoitat suomeksi.

KOUKKU. Jokaiselle kohteelle yksi lyhyt koukkurivi (enintään kahdeksan sanaa, yksi virke), joka herättää uteliaisuuden ja jonka \
pitää olla totta. Et käytä tarkkoja lukuja etkä vuosilukuja, ellet ole täysin varma. Ei mainoskieltä.

Vastaat vain riveillä, yksi kohde riviä kohden, ei mitään muuta:
KOHDE: <nimi suomeksi tai vakiintunut alkuperäinen> | <englanninkielisen Wikipedia-artikkelin tarkka otsikko> | \
<kaupunki suomeksi> | <maan ISO 3166-1 alpha-2 -koodi> | <koukkurivi>`;

export function kohteidenViesti({ kaupunki = null, eiNaita = [] } = {}) {
  if (kaupunki) {
    return [`Kaupunki: ${kaupunki}. Valitse tämän kaupungin ${KOHTEITA} kiinnostavinta kohdetta, eri tyyppejä (vanha, moderni, `
      + 'vesi, puisto, aukio).', eiNaita.length ? `Älä valitse näitä: ${eiNaita.join('; ')}` : ''].filter(Boolean).join('\n');
  }
  return [`Koko maailma. Valitse ${KOHTEITA} kohdetta eri maanosista ja maista, eri tyyppejä. Painota kaupunkeja, joista on `
    + 'hyvä fotorealistinen 3D-kaupunkimalli (suuret kaupungit Euroopassa, Pohjois-Amerikassa, Japanissa ja Australiassa); '
    + 'ainakin puolet Euroopasta.', eiNaita.length ? `Eilen näytettiin nämä, älä toista: ${eiNaita.join('; ')}` : '']
    .filter(Boolean).join('\n');
}

/** Mallin vastaus → [{ nimi, wikipedia, kaupunki, iso, koukku }] (enintään maara, kaksoiskappaleet pois). */
export function jasennaKohteet(teksti, maara = KOHTEITA) {
  const tulos = [];
  for (const m of String(teksti ?? '').matchAll(/^\s*KOHDE\s*:\s*(.+)$/gim)) {
    const [nimi, wikipedia, kaupunki, iso, ...koukku] = m[1].split('|').map((x) => x.trim());
    const k = { nimi: siivoa(nimi, 120), wikipedia: siivoa(wikipedia, 200) || null, kaupunki: siivoa(kaupunki, 80) || null,
      iso: /^[A-Za-z]{2}$/.test(iso ?? '') ? iso.toUpperCase() : null, koukku: koukuksi(koukku.join('|')) || null };
    if (k.nimi && k.koukku && !tulos.some((x) => x.nimi.toLowerCase() === k.nimi.toLowerCase())) tulos.push(k);
  }
  return tulos.slice(0, maara);
}

export const kohdeAvain = (kaupunki, paiva) => `opas:kohteet:v1:${kaupunki ? kaupunki.toLowerCase().replace(/\s+/g, '-') : 'maailma'}:${paiva}`;
export const paivaUtc = (nyt = new Date()) => nyt.toISOString().slice(0, 10);
export const eilenUtc = (nyt = new Date()) => new Date(nyt.getTime() - 86400000).toISOString().slice(0, 10);

/*
 * MAAILMAN 50 SUOSIKKIA (omistaja 6.10.2026: oppaan aloitukseen jopa 50 suosikkikohdetta koko maailmasta; juna 149).
 * GET /opas/kohteet?n=50 (ilman kaupunkia): vakaa lista (ei päivittäin vaihtuva), R2 30 vrk. Malli antaa 60 ehdokasta
 * maanosat sekoitettuina; koordinaatit ja kuvat erähaulla (opas.js kohteetErana), 50 ensimmäistä kelpaavaa.
 */
export const MAAILMAN_SUOSIKKEJA = 50;
export const maailmanSuosikitAvain = () => 'opas:kohteet:maailma50:v2';
export const MAAILMAN_SUOSIKIT_KEHOTE = `Valitset Matkakirja-pelin elävälle oppaalle maailman suosikkikohteet: 60 \
tunnetuinta ja kiinnostavinta nähtävyyttä, joista pelaaja valitsee yhden ja kamera lentää sen ylle kertojan kertoessa. \
Kohteet ovat yksittäisiä nähtävyyksiä, jotka näkyvät ilmasta (esimerkiksi Akropolis, Central Park, Sydneyn oopperatalo), \
eivät pelkkiä kaupunkien nimiä. Maanosat tasaisesti: noin 18 Euroopasta, 12 Aasiasta, 8 Pohjois-Amerikasta, 6 \
Etelä-Amerikasta, 6 Afrikasta, 5 Lähi-idästä ja 5 Oseaniasta. Painota paikkoja suurissa kaupungeissa, joista on hyvä \
fotorealistinen 3D-malli, mutta mukaan sopii myös luontokohteita. Sekoita maanosat järjestyksessä: ei kahta saman \
maanosan kohdetta peräkkäin. Kirjoitat suomeksi.

KOUKKU. Jokaiselle kohteelle yksi lyhyt koukkurivi (enintään kahdeksan sanaa, yksi virke), joka herättää uteliaisuuden \
ja jonka pitää olla totta. Ei tarkkoja lukuja eikä vuosilukuja, ellet ole täysin varma. Ei mainoskieltä.

Vastaat vain riveillä, yksi kohde riviä kohden, ei mitään muuta:
KOHDE: <nimi suomeksi tai vakiintunut alkuperäinen> | <englanninkielisen Wikipedia-artikkelin tarkka otsikko> | \
<kaupunki suomeksi> | <maan ISO 3166-1 alpha-2 -koodi> | <koukkurivi>`;
