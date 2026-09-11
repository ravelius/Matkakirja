/*
 * PELAAJAN MAAN ÄÄRIVIIVA — YKSI AINEISTO, KAKSI LAUTAA.
 *
 * OMISTAJA 11.9.2026 ilta, sanatarkasti: *"Peli voisi piirtää
 * vahvemmalla aina kyseisen valtion rajat jossa pelaaja on"*.
 *
 * Tasokartalla vahvistettu ääriviiva on ollut olemassa 31.8.2026
 * lähtien (js/maatummennus.js); PALLOLTA se puuttui kokonaan. Tämä
 * moduuli on se pala, joka puuttui: se lukee saman maakohtaisen
 * aineiston ja kääntää yhden maan renkaat ASTEIKSI, jotta pallon
 * vektorikerros (js/pallovektorit.js `korostaMaa`) voi piirtää ne
 * pinnalle samalla tavalla kuin rantaviivan ja rajat.
 *
 * === MIKSI EI UUTTA AINEISTOA (ratkaisu 11.9.2026) =================
 *
 * Tilaus ehdotti uuden ISO-A3-avaimellisen ääriviivasetin hakemista
 * Natural Earthin `ne_10m_admin_0_countries`-polygoneista. Sitä EI
 * tehty, koska se aineisto on jo repossa ja jo pelissä:
 *
 *   assets/data/maapolygonit.json (tools/generoi-maapolygonit.mjs)
 *   — ne_10m_admin_0_countries, harvennus 0,006°, avaimena ISO A3,
 *     134 maata, laudan `maailmankartta`-projektiossa (miller).
 *
 * Se on TÄSMÄLLEEN se aineisto, jota tilaus pyysi — ja lisäksi se on
 * jo mitattu samaksi geometriaksi kuin laattoihin poltettu rajaviiva
 * (tools/generoi-maapolygonit.mjs: 10m + DP 0,2 → mediaani 0,02
 * lautayksikköä poltetusta rajasta). Toinen setti samasta lähteestä
 * tarkoittaisi kahta totuutta, jotka ehtivät eriytyä — juuri se vika,
 * jonka omistaja korjautti 1.9.2026 (*"saako nuo rajat korjattua, että
 * tummennus ja maan rajan vahvistus menisi samaa reittiä kuin raja
 * kartassa?"*) — ja 1,4 megatavua lisää repoon ilman yhtään uutta
 * kärkipistettä.
 *
 * LAUDAN YKSIKÖT EIVÄT OLE ESTE. `maailmankartta` on Millerin lieriö,
 * jonka käänteiskaava on pelissä valmiina (js/fokusmitat.js
 * `laudaltaAsteiksi`, pallolaudalla `pallonAsteet`), joten käännös
 * asteiksi on tarkka eikä likimääräinen: sama kaava, jolla pallon
 * kaupunkipisteet ja maakerros jo lasketaan (js/vertailu.js
 * maapolygonitPallolle).
 *
 * === SAUMA ON SAMA ONGELMA KUIN MAAKERROKSELLA =====================
 *
 * `rengasAsteiksi` on siirretty tänne js/vertailu.js:stä sellaisenaan:
 * kaksi kerrosta kääntää saman laudan renkaita asteiksi, eikä kahta
 * sauman purkua saa kirjoittaa kahdesti. Vertailutila tuo sen nyt
 * täältä.
 */

let polygoniLupaus = null;

/**
 * Aineisto kerran per istunto; epäonnistunut haku palauttaa null ja
 * seuraava tarve yrittää uudestaan (siksi lupaus nollataan virheessä).
 * Sanasta sanaan sama malli kuin js/maakayrat.js lataaMaakayrat.
 *
 * LUPAUS ON JAETTU KAHDELLE LAUDALLE (11.9.2026): tasokartan
 * vahvistettu ääriviiva (js/maatummennus.js) ja pallon korostus
 * lukevat saman tiedoston, eikä 1,4 megatavua haeta kahdesti. Siksi
 * hakija asuu täällä aineiston kanssa eikä kummankaan piirtäjän
 * sisällä.
 */
export function lataaMaapolygonit() {
  polygoniLupaus ??= fetch('assets/data/maapolygonit.json')
    .then((v) => (v.ok ? v.json() : null))
    .catch(() => null)
    .then((data) => {
      if (!data?.maat) polygoniLupaus = null;
      return data?.maat ? data : null;
    });
  return polygoniLupaus;
}

/**
 * Yksi rengas (laudan pisteitä) asteiksi ja saumasta ehjäksi.
 * Palauttaa GeoJSON-renkaan [[lon, lat], …] suljettuna, tai null jos
 * pisteitä ei kertynyt kolmiollista.
 *
 * KIERTÄVÄN LAUDAN SAUMA. Maailmankartta jatkuu reunan yli, ja laudan
 * käännös (js/fokusmitat.js laudaltaAsteiksi) kietoo pituusasteen aina
 * välille [−180°, 180°]. Rengas, joka kulkee sauman yli, saisi siis
 * keskelleen 360 asteen hypyn — pallolla se piirtyisi vyönä maailman
 * ympäri. Hyppy puretaan kulkemalla rengas läpi ja pitämällä
 * peräkkäiset pisteet lähekkäin (`kierto`), minkä jälkeen koko rengas
 * siirretään takaisin niin, että sen keskikohta on välillä [−180°,
 * 180°]. Silloin YKSIKÄÄN RENKAAN SIVU ei ylitä 180 asteen pituuseroa,
 * ja Aleuttien kaltainen sauman ylittävä saarijono jää yhdeksi ehjäksi
 * kappaleeksi hieman ±180 asteen yli — pallolla se on sama piste,
 * mutta kolmiointi (tai viivan piirto) ei enää kierrä väärin päin
 * maailman ympäri.
 */
export function rengasAsteiksi(rengas, asteet) {
  const pisteet = [];
  let edellinen = null;
  let kierto = 0;
  for (const [x, y] of rengas) {
    const a = asteet({ x, y });
    const lat = a?.lat;
    const raaka = a?.lon ?? a?.lng;
    if (!Number.isFinite(lat) || !Number.isFinite(raaka)) continue;
    if (edellinen !== null) {
      while (raaka + kierto - edellinen > 180) kierto -= 360;
      while (raaka + kierto - edellinen < -180) kierto += 360;
    }
    const lon = raaka + kierto;
    edellinen = lon;
    pisteet.push([lon, lat]);
  }
  if (pisteet.length < 3) return null;
  // Rengas keskelle maailmaa: kierron purku on saattanut viedä sen
  // kokonaan sauman toiselle puolelle.
  let pieninLon = pisteet[0][0];
  let suurinLon = pisteet[0][0];
  for (const [lon] of pisteet) {
    if (lon < pieninLon) pieninLon = lon;
    if (lon > suurinLon) suurinLon = lon;
  }
  const keski = (pieninLon + suurinLon) / 2;
  let siirto = 0;
  while (keski + siirto > 180) siirto -= 360;
  while (keski + siirto < -180) siirto += 360;
  if (siirto) for (const p of pisteet) p[0] += siirto;
  // GeoJSON sulkee renkaan; laudan aineistossa osa on auki.
  const eka = pisteet[0];
  const vika = pisteet[pisteet.length - 1];
  if (eka[0] !== vika[0] || eka[1] !== vika[1]) pisteet.push([eka[0], eka[1]]);
  return pisteet;
}

/**
 * Yhden maan renkaat aineistosta LAUDAN yksiköihin.
 *
 * Aineisto on deltakoodattua kymmenesosayksikköä
 * (tools/generoi-maapolygonit.mjs `koodaa`), sama purku kuin
 * js/maatummennus.js `maanPolku` tekee polkumerkkijonoon — tässä
 * pisteinä, koska pallo tarvitsee luvut eikä `d`-attribuuttia.
 *
 * Tuntematon maa palauttaa tyhjän listan: se on TURVALLINEN TILA eikä
 * virhe (ks. js/maatummennus.js `piirra` — sama sääntö tasokartalla).
 */
export function puraMaanRenkaat(data, iso) {
  const renkaat = data?.maat?.[iso];
  if (!Array.isArray(renkaat) || !renkaat.length) return [];
  const tarkkuus = data.tarkkuus || 10;
  const ulos = [];
  for (const r of renkaat) {
    if (!Array.isArray(r) || r.length < 6) continue;
    const pisteet = [];
    let x = 0;
    let y = 0;
    for (let i = 0; i + 1 < r.length; i += 2) {
      x = i ? x + r[i] : r[i];
      y = i ? y + r[i + 1] : r[i + 1];
      pisteet.push([x / tarkkuus, y / tarkkuus]);
    }
    if (pisteet.length >= 3) ulos.push(pisteet);
  }
  return ulos;
}

/**
 * Yhden maan renkaat ASTEINA pallolle: [[[lon, lat], …], …].
 *
 * @param {object} data   assets/data/maapolygonit.json
 * @param {string} iso    ISO A3
 * @param {Function} asteet laudan käännös ({x, y}) → {lat, lon}
 */
export function maanRenkaatAsteina(data, iso, asteet) {
  if (typeof asteet !== 'function') return [];
  const ulos = [];
  for (const rengas of puraMaanRenkaat(data, iso)) {
    const kaannetty = rengasAsteiksi(rengas, asteet);
    if (kaannetty) ulos.push(kaannetty);
  }
  return ulos;
}

/*
 * ====== PALLON KOROSTUS: TILA JA PÄIVITYS ==========================
 *
 * Pallolautoja on kerrallaan yksi (js/ui.js avaaPallolauta), joten
 * muisti on moduulitasolla kuten js/maatummennus.js:n polkumuisti.
 * `nollaaPallonMaakorostus` ajetaan laudan purussa, jotta seuraava
 * lauta latoo korostuksen uudelleen.
 */
let korostettu = null;
const renkaatMuisti = new Map();

/** Lauta purettiin (tai testi alkaa): muisti ja tila nollille. */
export function nollaaPallonMaakorostus() {
  korostettu = null;
  renkaatMuisti.clear();
}

/** Mikä maa on juuri nyt korostettuna (savukkeet ja testit). */
export function pallonKorostettuMaa() {
  return korostettu;
}

/**
 * Pelaajan maan ääriviiva pallon vektorikerrokseen.
 *
 * Kutsutaan pallolaudan `paivita`-ohjauksesta (js/pallolauta/lauta.js),
 * eli joka kerta kun pelin tila muuttuu — maanvaihto tulee mukana
 * ilman omaa tapahtumaa. TYÖ TEHDÄÄN VAIN KUN MAA VAIHTUU: sama maa
 * palaa heti eikä koske kerrokseen.
 *
 * AINEISTO ON LAISKA ja jaettu tasokartan kanssa (lataaMaapolygonit).
 * Jos sitä ei saada (yhden tiedoston versio, verkoton käynnistys) tai
 * maata ei ole aineistossa, kerros jää tyhjäksi eikä peli muutu
 * miksikään — ei virhettä, ei tyhjää viivaa.
 *
 * @param {object}   p.vektorit js/pallovektorit.js -kahva tai null
 * @param {?string}  p.iso      pelaajan maa (ISO A3) tai null
 * @param {Function} p.asteet   laudan käännös ({x, y}) → {lat, lon}
 * @param {Function} p.lataa    aineiston hakija (testit antavat oman)
 */
export function paivitaPallonMaakorostus({
  vektorit, iso, asteet, lataa,
}) {
  if (!vektorit?.korostaMaa || typeof lataa !== 'function') return false;
  const uusi = iso || null;
  if (uusi === korostettu) return false;
  korostettu = uusi;
  if (!uusi) { vektorit.korostaMaa(null, null); return true; }
  const valmiit = renkaatMuisti.get(uusi);
  if (valmiit) { vektorit.korostaMaa(uusi, valmiit); return true; }
  Promise.resolve(lataa()).then((data) => {
    // Maa on voinut vaihtua haun aikana: vanha vastaus ei saa piirtyä.
    if (korostettu !== uusi) return;
    const renkaat = data ? maanRenkaatAsteina(data, uusi, asteet) : [];
    renkaatMuisti.set(uusi, renkaat);
    vektorit.korostaMaa(uusi, renkaat);
  }).catch(() => {
    /* Aineistoa ei saatu: kerros jää ennalleen (tyhjäksi). */
  });
  return true;
}
