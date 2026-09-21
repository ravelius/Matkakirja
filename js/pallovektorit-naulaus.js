/*
 * RANNIKON NAULAUS — PUHDAS LASKENTA (erotettu js/pallovektorit.js:stä
 * sulavuuserässä E1, 21.9.2026).
 *
 * Tämä moduuli ei tuo mitään eikä koske DOMiin tai three.js:ään, joten
 * sama koodi ajaa pääsäikeessä, Web Workerissa (js/pallovektorit-tyo.js)
 * ja Nodessa (testit). Syy erotukseen on mitattu: naulaus on 29–83 ms
 * yhtenä tehtävänä koko Ranskan rannikolle, ja puhelimen tehoilla
 * (CPU 4×) se oli 350–390 ms:n nykäys juuri silloin, kun zoom ylitti
 * naulauksen tiheysrajan. Kaikki viennit ovat ennallaan
 * js/pallovektorit.js:n kautta (se vie ne edelleen).
 */

/* ═══ RANNIKON NAULAUS (Fablen päätös 20.9.2026, vaihtoehto 2) ══════
 *
 * Omistaja: *"Täällä virheitä rajaviivassa"*. Sama rannikko piirtyi
 * kahdesta aineistosta: rannikkoviiva `ne_10m_ocean`ista ja pelaajan oman
 * maan korostuskehä `ne_10m_admin_0`:sta. Ne ovat eri mieltä rannan
 * kulusta (mediaani 72 m, p95 173 m, suurin 1,1 km), ja suistossa ero on
 * rakenteellinen: ocean kulkee suistoa ylös, admin_0 sulkee sen suulta
 * jänteellä. Sädekehä (v1971) peitti pienen eron, mutta suiston sulkeva
 * viiva jäi näkyviin.
 *
 * NAULAUS: korostuksen rannikko-osuus otetaan SAMASTA geometriasta kuin
 * rannikkoviiva. Korostuksen omista janoista pudotetaan ne, joiden
 * MOLEMMAT päät ovat rannikkoviivan tuntumassa — tämä kattaa sekä
 * rinnakkain kulkevan rannan että suiston sulkevan jänteen, jonka päät
 * ovat suun rannoilla mutta keskikohta vedessä. Tilalle piirretään maan
 * oman rannikon janat rannikkoaineistosta. Sisämaan rajat jäävät
 * admin_0:aan, jossa ne ovat ainoa lähde.
 */

/** Hilan solun avain asteina (ks. rannikkoHakemisto). */
export const NAULAUKSEN_RUUTU_ASTETTA = 0.05;
/**
 * Kuinka lähellä rannikkoviivaa korostuksen kärki on "rannalla".
 * 0,015° on noin 1,7 km päiväntasaajalla — aineistojen p95-ero on 173 m
 * ja suurin mitattu 1,1 km, joten kynnys kattaa erot mutta jättää
 * sisämaan rajat (lähin naapurin raja on kaukana rannasta) rauhaan.
 */
export const NAULAUKSEN_TOLERANSSI_ASTETTA = 0.015;
/**
 * Suiston mutka: kun admin_0 sulkee suun jänteellä, rannikkoaineiston
 * mutka poikkeaa korostuskehästä eikä pääsisi mukaan pelkällä
 * tuntumasäännöllä. Mutka silloitetaan, jos sen päät ovat korostuksen
 * tuntumassa lähekkäin (AUKON_RAJA, noin 55 km) ja rannan polku niiden
 * välillä on kohtuullinen (MUTKAN_RAJA, noin 220 km). Näin Gironde tulee
 * mukaan, mutta naapurimaan rannikko ei silloitu maan rajan yli.
 */
export const NAULAUKSEN_AUKON_RAJA_ASTETTA = 0.5;
export const NAULAUKSEN_MUTKAN_RAJA_ASTETTA = 2;
/**
 * MILLOIN NAULATAAN.
 *
 * KAKSI KERTAA VÄÄRIN, NYT MITATTU OIKEIN (20.9.2026).
 *
 * Portti oli ensin 120 (laskettu aineistojen p95-erosta 445 m) ja
 * sitten 30 (laskettu maksimipoikkeamasta 3 939 m). MOLEMMAT LUVUT
 * OLIVAT MITTARIN HARHAA: ne mittasivat kehän kärjen etäisyyttä
 * rantaviivan lähimpään KÄRKEEN, ja pitkän rantajanan keskikohta on
 * satoja metrejä lähimmästä kärjestä vaikka se on täsmälleen viivalla.
 * Oikea mitta on etäisyys lähimpään JANAAN, ja sillä ero on:
 *
 *   FRA  mediaani 62 m,  p95 141 m,  suurin 192 m
 *   DNK  mediaani 49 m,  p95 112 m,  suurin 140 m
 *   EST  mediaani 44 m,  p95 108 m,  suurin 141 m
 *   GRC  mediaani 65 m,  p95 145 m,  suurin 187 m (ompelun jälkeen)
 *
 * Yhden laitepikselin leveys on 111 320 m / tiheys, joten 190 metrin
 * ero täyttää pikselin vasta tiheydellä 586 px/aste. Kolmesataa on
 * siitä puolet: siinä ero on noin puoli pikseliä, eli juuri se raja,
 * jossa kaksi viivaa alkaa erottua toisistaan. Sitä karkeammassa
 * näkymässä naulaus ei paranna kuvaa mutta maksaa (ks. hinta alla) —
 * ja portti 30 teetti sitä koko ajan.
 *
 * HINTA: naulaus on mitattuna 29…83 ms koko Ranskan rannikolle tason
 * mukaan. Tiheydellä 300 kerroksella on tarkka taso muistissa, mutta
 * vain näkyvä alue — ja vaimennus (NAULAUKSEN_VAIMENNUS_MS) pitää
 * huolen siitä, ettei naulausta rakenneta joka kehyksellä.
 */
export const NAULAUKSEN_TIHEYS_RAJA = 300;
/** Naulausta ei rakenneta useammin kuin tämän välein (ms). */
export const NAULAUKSEN_VAIMENNUS_MS = 400;

/** Karkea asteetäisyys (pituusaste kutistuu leveyspiirillä). */
export function asteEtaisyys(a, b) {
  let dLon = a[0] - b[0];
  if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
  const kerroin = Math.max(0.05, Math.cos((a[1] + b[1]) / 2 * Math.PI / 180));
  const x = dLon * kerroin;
  const y = a[1] - b[1];
  return Math.sqrt(x * x + y * y);
}

/** Solun x-avain kierrettynä: 179,99° ja -179,99° osuvat naapureiksi. */
function solunX(lon, ruutu) {
  const jako = Math.round(360 / ruutu);
  const gx = Math.round(lon / ruutu);
  return ((gx % jako) + jako) % jako;
}

/**
 * Rannikon kärjet hilaan: avain on solu, arvo pisteet [lon, lat].
 * Puhdas funktio (tests/maakorostus.test.mjs).
 */
export function rannikkoHakemisto(viivat, ruutu = NAULAUKSEN_RUUTU_ASTETTA) {
  const hila = new Map();
  for (const viiva of viivat ?? []) {
    for (const p of viiva ?? []) {
      if (!Array.isArray(p) || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) continue;
      const avain = `${solunX(p[0], ruutu)}|${Math.round(p[1] / ruutu)}`;
      const lista = hila.get(avain);
      if (lista) lista.push(p); else hila.set(avain, [p]);
    }
  }
  return hila;
}

/** Onko piste rannikkohilan mukaan rannalla? Puhdas funktio. */
export function rannallaHilassa(piste, hila, {
  ruutu = NAULAUKSEN_RUUTU_ASTETTA, toleranssi = NAULAUKSEN_TOLERANSSI_ASTETTA,
} = {}) {
  if (!hila?.size || !Array.isArray(piste)) return false;
  const [lon, lat] = piste;
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return false;
  const jako = Math.round(360 / ruutu);
  const gx = solunX(lon, ruutu);
  const gy = Math.round(lat / ruutu);
  const raja = toleranssi * toleranssi;
  // Pituusasteen kutistuma leveyspiirillä: napojen lähellä aste on lyhyt.
  const kerroin = Math.max(0.05, Math.cos(lat * Math.PI / 180));
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      for (const q of hila.get(`${((gx + dx) % jako + jako) % jako}|${gy + dy}`) ?? []) {
        let dLon = lon - q[0];
        if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
        const x = dLon * kerroin;
        const y = lat - q[1];
        if (x * x + y * y <= raja) return true;
      }
    }
  }
  return false;
}

/**
 * Korostuksen janat naulattuna: sisämaan osuudet admin_0:sta ja rannikon
 * osuudet rannikkoaineistosta. Palauttaa viivat (polyviivoja) sekä
 * mittarit. Puhdas funktio (tests/maakorostus.test.mjs).
 *
 * @param {Array} renkaat korostuksen renkaat [[lon, lat], …]
 * @param {Array} rannikot rannikkoviivat samassa muodossa
 */
/*
 * JANAHAKEMISTO JA ETÄISYYS JANAAN (omistajan havainto v1982, 20.9.2026:
 * *"rajoissa kahdenlaista viivaa"*). Rannikon jana luettiin maan omaksi
 * vain, jos sen päät olivat kehän KÄRKIEN tuntumassa (0,015°) tai
 * silloitettavissa kahden tuntumakärjen väliin SAMASSA rannikkoviivassa.
 * Kehän kärjet ovat harvassa (harvennus 0,006° jättää suoraan rantaan
 * kilometrien välit) ja rannikkoviivat katkeavat solun reunaan, joten
 * osa rannasta jäi kehästä pois — MITATTU Gironden lähizoomilla
 * (2000 px, tiheys 699 px/aste): rannikon janoista 109, kehässä 71.
 * Siellä paksu kehä puuttui ja ohut rantaviiva kulki yksin sen
 * rinnalla. Nyt tuntuma mitataan kehän JANOIHIN: rannan kärki on maan
 * rantaa, jos se on toleranssin päässä lähimmästä kehän janasta —
 * sama korjaus kuin Opus 1:n mittausvirheessä (kärki vs jana).
 */
export const NAULAUKSEN_JANATOLERANSSI_ASTETTA = 0.02;

/** Janahakemisto: solun avain → janat [[a, b], …], jana lisätään joka soluun jonka laatikko peittää. */
export function janahakemisto(viivat, ruutu = NAULAUKSEN_RUUTU_ASTETTA) {
  const hila = new Map();
  const jako = Math.round(360 / ruutu);
  for (const viiva of viivat ?? []) {
    for (let k = 1; k < (viiva?.length ?? 0); k += 1) {
      const a = viiva[k - 1]; const b = viiva[k];
      if (!Array.isArray(a) || !Array.isArray(b)) continue;
      let dLon = b[0] - a[0];
      if (dLon > 180) dLon -= 360; else if (dLon < -180) dLon += 360;
      if (Math.abs(dLon) > 5 || Math.abs(b[1] - a[1]) > 5) continue; // saumajana tai roska
      const gx0 = Math.round(Math.min(a[0], a[0] + dLon) / ruutu); const gx1 = Math.round(Math.max(a[0], a[0] + dLon) / ruutu);
      const gy0 = Math.round(Math.min(a[1], b[1]) / ruutu); const gy1 = Math.round(Math.max(a[1], b[1]) / ruutu);
      for (let gx = gx0; gx <= gx1; gx += 1) {
        for (let gy = gy0; gy <= gy1; gy += 1) {
          const avain = `${((gx % jako) + jako) % jako}|${gy}`;
          const lista = hila.get(avain);
          if (lista) lista.push([a, b]); else hila.set(avain, [[a, b]]);
        }
      }
    }
  }
  return hila;
}

/** Onko piste toleranssin päässä jostakin hakemiston janasta (leveyspiirin kutistuma huomioiden)? */
export function lahellaJanaa(piste, hila, {
  ruutu = NAULAUKSEN_RUUTU_ASTETTA, toleranssi = NAULAUKSEN_JANATOLERANSSI_ASTETTA,
} = {}) {
  if (!hila?.size || !Array.isArray(piste)) return false;
  const [lon, lat] = piste;
  const jako = Math.round(360 / ruutu);
  const gx = solunX(lon, ruutu);
  const gy = Math.round(lat / ruutu);
  const kerroin = Math.max(0.05, Math.cos(lat * Math.PI / 180));
  const raja = toleranssi * toleranssi;
  const dx = (x, y) => { let d = x - y; if (d > 180) d -= 360; else if (d < -180) d += 360; return d * kerroin; };
  for (let ix = -1; ix <= 1; ix += 1) {
    for (let iy = -1; iy <= 1; iy += 1) {
      for (const [a, b] of hila.get(`${((gx + ix) % jako + jako) % jako}|${gy + iy}`) ?? []) {
        const ax = dx(a[0], lon); const ay = a[1] - lat;
        const bx = dx(b[0], lon); const by = b[1] - lat;
        const vx = bx - ax; const vy = by - ay;
        const l2 = vx * vx + vy * vy;
        let s = l2 > 0 ? -(ax * vx + ay * vy) / l2 : 0;
        s = Math.max(0, Math.min(1, s));
        const px = ax + s * vx; const py = ay + s * vy;
        if (px * px + py * py <= raja) return true;
      }
    }
  }
  return false;
}

export function naulaaKorostus(renkaat, rannikot, asetukset = {}) {
  const viivat = Array.isArray(renkaat) ? renkaat : [];
  const hila = rannikkoHakemisto(rannikot, asetukset.ruutu);
  if (!hila.size) {
    return { viivat, pudotettuja: 0, rannikkojanoja: 0, sisamaajanoja: null };
  }
  const ulos = [];
  let pudotettuja = 0;
  let sisamaajanoja = 0;
  for (const viiva of viivat) {
    if (!Array.isArray(viiva) || viiva.length < 2) continue;
    let pala = [];
    let edellinenRannalla = rannallaHilassa(viiva[0], hila, asetukset);
    for (let k = 1; k < viiva.length; k += 1) {
      const rannalla = rannallaHilassa(viiva[k], hila, asetukset);
      if (edellinenRannalla && rannalla) {
        // Rannikko piirtää tämän: myös suiston sulkeva jänne (päät rannalla).
        pudotettuja += 1;
        if (pala.length >= 2) ulos.push(pala);
        pala = [];
      } else {
        if (!pala.length) pala.push(viiva[k - 1]);
        pala.push(viiva[k]);
        sisamaajanoja += 1;
      }
      edellinenRannalla = rannalla;
    }
    if (pala.length >= 2) ulos.push(pala);
  }
  // Maan oma rannikko korostuksen väreillä: janat, joiden molemmat päät
  // ovat korostuskehän tuntumassa (eli tämän maan rantaa).
  const keha = rannikkoHakemisto(viivat, asetukset.ruutu);
  const kehanJanat = janahakemisto(viivat, asetukset.ruutu);
  const janaAsetukset = { ruutu: asetukset.ruutu, toleranssi: asetukset.janatoleranssi };
  const aukonRaja = asetukset.aukonRaja ?? NAULAUKSEN_AUKON_RAJA_ASTETTA;
  const mutkanRaja = asetukset.mutkanRaja ?? NAULAUKSEN_MUTKAN_RAJA_ASTETTA;
  let rannikkojanoja = 0;
  for (const viiva of rannikot ?? []) {
    if (!Array.isArray(viiva) || viiva.length < 2) continue;
    // Tuntuma kärkeen TAI janaan (ks. JANAHAKEMISTO JA ETÄISYYS JANAAN).
    const lahella = viiva.map((p) => rannallaHilassa(p, keha, asetukset) || lahellaJanaa(p, kehanJanat, janaAsetukset));
    // Kumulatiivinen polku ja lähimmät tuntumakärjet kumpaankin suuntaan,
    // jotta mutkan silloitus on vakioaikainen jokaiselle janalle.
    const matka = [0];
    const edel = [lahella[0] ? 0 : -1];
    for (let k = 1; k < viiva.length; k += 1) {
      matka.push(matka[k - 1] + asteEtaisyys(viiva[k - 1], viiva[k]));
      edel.push(lahella[k] ? k : edel[k - 1]);
    }
    const seur = new Array(viiva.length).fill(-1);
    for (let k = viiva.length - 1; k >= 0; k -= 1) {
      seur[k] = lahella[k] ? k : (k + 1 < viiva.length ? seur[k + 1] : -1);
    }
    let pala = [];
    for (let k = 1; k < viiva.length; k += 1) {
      let omaa = lahella[k - 1] && lahella[k];
      if (!omaa) {
        const a = edel[k - 1];
        const b = seur[k];
        omaa = a >= 0 && b >= 0
          && asteEtaisyys(viiva[a], viiva[b]) <= aukonRaja
          && (matka[b] - matka[a]) <= mutkanRaja;
      }
      if (omaa) {
        if (!pala.length) pala.push(viiva[k - 1]);
        pala.push(viiva[k]);
        rannikkojanoja += 1;
      } else if (pala.length >= 2) { ulos.push(pala); pala = []; } else pala = [];
    }
    if (pala.length >= 2) ulos.push(pala);
  }
  return { viivat: ulos, pudotettuja, rannikkojanoja, sisamaajanoja };
}

/*
 * ═══════════════════════════════════════════════════════════════════
 * PITKÄ JANA PAINUU PINNAN ALLE — JAETAAN PALOIKSI (mitattu 20.9.2026)
 * ═══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN VIKA (Raamattu, Gironde 20.9.2026): Ranskan pelikartalla
 * *"paksu tumma kehä seuraa suistoa ja toinen viiva kulkee suorana"*.
 * Kaappauksissa (docs/raportit/kaappaukset/omistaja-20260920/gironde-*)
 * Médocin Atlantin ranta Pointe de Gravesta Arcachoniin on ILMAN
 * korostusta ja ilman rantaviivaa — näkyvissä on vain laatan meren
 * täytön pehmeä reuna, ja se on se "toinen viiva".
 *
 * MITATTU JUURISYY (Chromium, Marseille-tallenne, kamera 45,45 N
 * −0,95 E korkeus 0,055): korostus SISÄLTÄÄ Médocin rannan — sekä
 * korostuksessa että rannikkosolussa on sama jana −1,199 E 45,121 N →
 * −1,260 E 44,627 N, 0,50 astetta eli 55 km yhtenä suorana (ne_10m:n
 * Côte d'Argent on oikeasti suora, ja 0,006 asteen harvennus jättää
 * siihen vain päät). Jänteen keskikohdalla ruudulla 0 tummaa pikseliä
 * 24 × 24:stä; kun korostuksen depthTest kytkettiin pois, samassa
 * kohdassa 206. Lyhyet janat (0,16–0,21 astetta) piirtyivät molemmilla
 * asetuksilla.
 *
 * SYY ON GEOMETRIAA: LineSegments2 piirtää janan SUORANA 3D-avaruudessa,
 * ja pallon pinnan kahden pisteen välinen jänne painuu pinnan alle
 * keskeltä R · (1 − cos(θ/2)) — 0,5 asteella 9,5 · 10⁻⁶ · R, kun taas
 * 0,2 asteella 1,5 · 10⁻⁶ · R. Laattakerros on itsekin pinnan jänteitä
 * (silmät 0,02–0,25 astetta), ja syvyyssiirto (−12 vs. laattojen −8)
 * kattaa vain lyhyiden janojen painuman. Pitkä jänne jää laatan alle
 * ja syvyystesti leikkaa sen keskeltä pois — se ei ole aineiston,
 * naulauksen eikä harvennuksen vika, vaan piirron.
 *
 * KORJAUS: jokainen jana, joka on pidempi kuin VEKTORIT_JANAN_ENIMMAIS-
 * PITUUS_AST, jaetaan tasavälein paloiksi, joiden päät ovat pinnalla.
 * 0,1 asteen palan painuma on 3,8 · 10⁻⁷ · R — neljäsosa siitä, mikä
 * mitattiin piirtyväksi (0,2 astetta). Palat lisätään VAIN pitkiin
 * janoihin; rosoinen ranta ja raja ovat lähes aina lyhyempiä, joten
 * janamäärä ei muutu niillä lainkaan. Sama kaava koskee korostusta ja
 * soluja, koska tämä on niiden ainoa yhteinen pisteiden latoja.
 *
 * MIKSI EI NOSTOA PINNASTA: VEKTORIT_KORKEUS 0 on mitattu valinta
 * (parallaksi 2–4 laitepikseliä, ks. yllä) — palat pitävät viivan
 * pinnalla ilman nostoa.
 */
