/*
 * KARTTATYÖKALUN MAAKUNNAT-VÄLILEHTI — nykymaakuntien selaus ja kortit.
 *
 * Omistajan päätös 22.9.2026 (Fablen välittämä): karttaselitepaneeliin
 * (js/karttaselite.js) uusi välilehti, josta pelaaja selaa Aarnin
 * luettelon maiden NYKYISIÄ hallinnollisia alueita (Ranska, Saksa,
 * Italia, Espanja, Britannia, Puola, Itävalta, Sveitsi) ja lukee Livian
 * lyhyen luonnehdinnan kustakin. TÄMÄ ERÄ ON VAIN RUNKO ILMAN
 * KARTTAKYTKENTÄÄ — värjäys kartalla tulee myöhemmin Karttasepän
 * vektoritasolta (ks. `ui.karttatyokaluMaakunta`-koukku alla).
 *
 * ── KAKSI TYÖTÄ SAMAAN AIKAAN, YKSI RAJAPINTA ──────────────────────
 *
 * Toinen sessio rakentaa samaan aikaan paneelin välilehdet ja
 * peukalolevyn (js/karttaselite.js, js/karttaselite-levy.js). Tämä
 * tiedosto EI KOSKE kumpaankaan — sovittu rajapinta on:
 *
 *   rakenna(paneeliElementti, { levy: luoPeukalolevy })
 *
 * joka kutsutaan kun Maakunnat-välilehti avataan ENSIMMÄISEN kerran.
 * `luoPeukalolevy({ lista, rivit, valittu, valitse })` palauttaa
 * `{ paivita(valittu), pura() }`. Koska peukalolevy-moduulia ei vielä
 * ole tätä kirjoitettaessa, `rakennaMaakunnat` toimii TÄYSIN myös
 * ilman `levy`-funktiota (rivin napautus riittää) ja ottaa levyn käyttöön
 * vasta kun se annetaan — testaa siis molemmat polut.
 *
 * Rekisteröinti karttaselitteeseen tehdään tämän tiedoston lopussa
 * (kytkeMaakunnatKarttaselitteeseen); js/ui.js kutsuu sitä
 * kaynnistaKarttaselite(ui):n jälkeen. Kutsu on turvallinen myös
 * VANHALLA karttaselitteellä, jolla ei vielä ole asetaMaakunnat-koukkua.
 *
 * ── TIEDOSTON OSAT ──────────────────────────────────────────────────
 *   1. NIMISTÖ — MAAKUNTIEN_NIMET, MAAKUNTIEN_MAAT, maakunnanNimi
 *   2. APURIT — avaimen jako, tallennus, kuvien normalisointi
 *   3. LISTA — rakennaMaakunnat: maaryhmät, rivit, valinta
 *   4. KORTTI — plussan avaama pop-up (kuvat, pitkä teksti, Pulu)
 *   5. KYTKENTÄ — kytkeMaakunnatKarttaselitteeseen
 */
import { html, kuunteleSulkevaNapautus, nielaiseSulkevaNapautus } from './ui-apurit.js';
import { kohteidenNykyinenIso } from './fokuskohteet.js';
import { taytaLahderivi } from './tekijakortti.js';
import { MAAKUNTIEN_LUONNEHDINNAT } from './packs/maakunnat-luonnehdinnat.js';
import { MAAKUNTIEN_PULU } from './packs/maakunnat-pulu.js';

/* ===========================================================================
   1. NIMISTÖ
   ---------------------------------------------------------------------------
   Avaimet (ISO ja tunnus) ovat Karttasepän admin-1-datan tunnuksia
   TÄSMÄLLEEN (docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/
   avaimet.md): FRA/ITA/ESP Natural Earthin `region`-kenttä, GBR
   `geonunit`, POL/AUT/CHE `name`. Tunnus EI ole kartalle poltettu
   suomenkielinen nimi (nimiFi) — arvo tässä taulussa ON nimiFi, ja
   siksi taulukko on täsmälleen se "tunnus → nimiFi" -pari, jota kortit
   ja rivit näyttävät. Lähde tarkistettu suoraan datatiedostoista
   (nykyalueet-fra-deu.json ja vedos4/nykyalueet-*.json), ei pelkästä
   avaimet.md-proosasta, koska yksi tunnus poikkeaa nimiFi:stä vain
   välimerkin osalta (ks. Ranskan kommentti alla) — sellainen eroaa
   huomaisi vain lähdettä vertaamalla.
   =========================================================================== */
export const MAAKUNTIEN_NIMET = {
  FRA: {
    "Hauts-de-France": "Hauts-de-France",
    "Grand Est": "Grand Est",
    // Tunnus on väliviivalla d'Azurin edellä, nimiFi välilyönnillä —
    // katso myös js/packs/maakunnat-luonnehdinnat.js:n korjauskommentti
    // 22.9.2026, jossa sama pariutus oli aiemmin väärinpäin.
    "Provence-Alpes-Côte-d'Azur": "Provence-Alpes-Côte d'Azur",
    "Auvergne-Rhône-Alpes": "Auvergne-Rhône-Alpes",
    "Nouvelle-Aquitaine": "Nouvelle-Aquitaine",
    "Occitanie": "Occitanie",
    "Bourgogne-Franche-Comté": "Bourgogne-Franche-Comté",
    "Pays de la Loire": "Pays de la Loire",
    "Bretagne": "Bretagne",
    "Normandie": "Normandia",
    "Corse": "Korsika",
    "Centre-Val de Loire": "Centre-Val de Loire",
    "Île-de-France": "Île-de-France",
  },
  DEU: {
    "Sachsen": "Saksi",
    "Bayern": "Baijeri",
    "Rheinland-Pfalz": "Rheinland-Pfalz",
    "Saarland": "Saarland",
    "Schleswig-Holstein": "Schleswig-Holstein",
    "Niedersachsen": "Ala-Saksi",
    "Nordrhein-Westfalen": "Nordrhein-Westfalen",
    "Baden-Württemberg": "Baden-Württemberg",
    "Brandenburg": "Brandenburg",
    "Mecklenburg-Vorpommern": "Mecklenburg-Etu-Pommeri",
    "Bremen": "Bremen",
    "Hamburg": "Hampuri",
    "Hessen": "Hessen",
    "Thüringen": "Thüringen",
    "Sachsen-Anhalt": "Saksi-Anhalt",
    "Berlin": "Berliini",
  },
  ITA: {
    "Piemonte": "Piemonte",
    "Lombardia": "Lombardia",
    "Sicily": "Sisilia",
    "Toscana": "Toscana",
    "Emilia-Romagna": "Emilia-Romagna",
    "Sardegna": "Sardinia",
    "Veneto": "Veneto",
    "Apulia": "Apulia",
    "Lazio": "Lazio",
    "Trentino-Alto Adige": "Trentino-Alto Adige",
    "Calabria": "Calabria",
    "Campania": "Campania",
    "Abruzzo": "Abruzzo",
    "Basilicata": "Basilicata",
    "Marche": "Marche",
    "Umbria": "Umbria",
    "Friuli-Venezia Giulia": "Friuli-Venezia Giulia",
    "Liguria": "Liguria",
    "Molise": "Molise",
    "Valle d'Aosta": "Aostanlaakso",
  },
  ESP: {
    "Castilla y León": "Kastilia ja León",
    "Andalucía": "Andalusia",
    "Castilla-La Mancha": "Kastilia-La Mancha",
    "Aragón": "Aragonia",
    "Extremadura": "Extremadura",
    "Cataluña": "Katalonia",
    "Galicia": "Galicia",
    "Valenciana": "Valencia",
    "Asturias": "Asturia",
    "Murcia": "Murcia",
    "Foral de Navarra": "Navarra",
    "Madrid": "Madrid",
    "País Vasco": "Baskimaa",
    "Canary Is.": "Kanariansaaret",
    "Cantabria": "Kantabria",
    "La Rioja": "La Rioja",
    "Islas Baleares": "Baleaarit",
    "Ceuta": "Ceuta",
    "Melilla": "Melilla",
  },
  GBR: {
    "England": "Englanti",
    "Scotland": "Skotlanti",
    "Wales": "Wales",
    "Northern Ireland": "Pohjois-Irlanti",
  },
  POL: {
    "Masovian": "Masovia",
    "Greater Poland": "Suur-Puola",
    "Warmian-Masurian": "Varmia-Masuria",
    "West Pomeranian": "Länsi-Pommeri",
    "Lublin": "Lublin",
    "Podlachian": "Podlasia",
    "Pomeranian": "Pommeri",
    "Lower Silesian": "Ala-Sleesia",
    "Łódź": "Łódź",
    "Kuyavian-Pomeranian": "Kujavia-Pommeri",
    "Subcarpathian": "Podkarpackie",
    "Lesser Poland": "Vähä-Puola",
    "Lubusz": "Lubuskie",
    "Silesian": "Sleesia",
    "Świętokrzyskie": "Świętokrzyskie",
    "Opole": "Opole",
  },
  AUT: {
    "Niederösterreich": "Ala-Itävalta",
    "Steiermark": "Steiermark",
    "Tirol": "Tiroli",
    "Oberösterreich": "Ylä-Itävalta",
    "Kärnten": "Kärnten",
    "Salzburg": "Salzburg",
    "Burgenland": "Burgenland",
    "Vorarlberg": "Vorarlberg",
    "Wien": "Wien",
  },
  // Sveitsillä ei vielä ole luonnehdintoja (js/packs/maakunnat-luonnehdinnat.js):
  // rivit ja nimet ovat silti täydet, ja kuvauslaatikko näyttää
  // "Luonnehdinta tulossa." kunnes Fable kirjoittaa erän.
  CHE: {
    "Graubünden": "Graubünden",
    "Bern": "Bern",
    "Valais": "Valais",
    "Vaud": "Vaud",
    "Ticino": "Ticino",
    "Sankt Gallen": "St. Gallen",
    "Zürich": "Zürich",
    "Fribourg": "Fribourg",
    "Lucerne": "Luzern",
    "Aargau": "Aargau",
    "Uri": "Uri",
    "Thurgau": "Thurgau",
    "Schwyz": "Schwyz",
    "Jura": "Jura",
    "Neuchâtel": "Neuchâtel",
    "Solothurn": "Solothurn",
    "Glarus": "Glarus",
    "Basel-Landschaft": "Basel-Landschaft",
    "Obwalden": "Obwalden",
    "Schaffhausen": "Schaffhausen",
    "Genève": "Geneve",
    "Nidwalden": "Nidwalden",
    "Zug": "Zug",
    "Appenzell Ausserrhoden": "Appenzell Ausserrhoden",
    "Appenzell Innerrhoden": "Appenzell Innerrhoden",
    "Basel-Stadt": "Basel-Stadt",
  },
};

/** Maat listausjärjestyksessä, suomenkielisin nimin (maaotsikkorivit). */
export const MAAKUNTIEN_MAAT = [
  { iso: 'FRA', nimi: 'Ranska' },
  { iso: 'DEU', nimi: 'Saksa' },
  { iso: 'ITA', nimi: 'Italia' },
  { iso: 'ESP', nimi: 'Espanja' },
  { iso: 'GBR', nimi: 'Britannia' },
  { iso: 'POL', nimi: 'Puola' },
  { iso: 'AUT', nimi: 'Itävalta' },
  { iso: 'CHE', nimi: 'Sveitsi' },
];

/** Alueen suomenkielinen nimi; tuntematon avainpari palauttaa tunnuksen itsensä. */
export function maakunnanNimi(iso, tunnus) {
  return MAAKUNTIEN_NIMET[iso]?.[tunnus] ?? tunnus;
}

/* ===========================================================================
   2. APURIT
   =========================================================================== */

/** Rivin ja levyn yhteinen avain: "ISO:tunnus". */
function jaaAvain(avain) {
  if (typeof avain !== 'string') return null;
  const i = avain.indexOf(':');
  if (i < 0) return null;
  return { iso: avain.slice(0, i), tunnus: avain.slice(i + 1) };
}

/** Avain on kelvollinen vain, jos se osuu MAAKUNTIEN_NIMET-tauluun. */
function avainKelpaa(avain) {
  const osat = jaaAvain(avain);
  return Boolean(osat && MAAKUNTIEN_NIMET[osat.iso]?.[osat.tunnus] !== undefined);
}

function haeLuonnehdinta(avain) {
  const osat = jaaAvain(avain);
  return (osat && MAAKUNTIEN_LUONNEHDINNAT[osat.iso]?.[osat.tunnus]) || null;
}

function haePulu(avain) {
  const osat = jaaAvain(avain);
  return (osat && MAAKUNTIEN_PULU[osat.iso]?.[osat.tunnus]) || [];
}

/*
 * KUVA VOI OLLA YKSI OLIO TAI LISTA (js/packs/maakunnat-luonnehdinnat.js
 * ERÄ 2: "kuva — { osoite, lahde, lisenssi, tekija }, yksi Commons-kuva").
 * Kortti näyttää tulevaisuudessa sekä aidon Commons-kuvan että Codexin
 * havainnekuvan samasta alueesta, joten data voi kasvaa listaksi ilman
 * että tätä apuria tarvitsee muuttaa kutsupaikoissa — normalisointi on
 * yhdessä paikassa, testattavissa erikseen (tests/karttatyokalu-
 * maakunnat.test.mjs).
 */
export function maakunnanKuvat(alue) {
  const kuva = alue?.kuva;
  if (!kuva) return [];
  return Array.isArray(kuva) ? kuva.filter(Boolean) : [kuva];
}

const TALLENNUS_AVAIN = 'matkakirja-karttatyokalu-maakunta';

/** Edellisen istunnon valinta; yksityinen selaus tms. palauttaa null. */
function lueTallennettuValinta() {
  try {
    const arvo = globalThis.localStorage?.getItem(TALLENNUS_AVAIN);
    return typeof arvo === 'string' ? arvo : null;
  } catch {
    return null;
  }
}

function tallennaValinta(avain) {
  try {
    if (avain) globalThis.localStorage?.setItem(TALLENNUS_AVAIN, avain);
    else globalThis.localStorage?.removeItem(TALLENNUS_AVAIN);
  } catch {
    // Yksityinen selaus tai kiintiö täynnä — valinta jää vain istunnon ajaksi.
  }
}

/*
 * OLETUKSENA AUKI PELAAJAN NYKYINEN MAA. `kohteidenNykyinenIso(ui)`
 * (js/fokuskohteet.js) on jo YHTEINEN päättely tasokartalle JA
 * pallolaudalle — sen oma kommentti sanoo suoraan "pallolauta lukee
 * saman päättelyn kuin kohdekerros" ja js/pallolauta/lauta.js kutsuu
 * samaa funktiota. Siksi tässä ei toisteta pallolaudan omaa hakua
 * erikseen: yksi kutsu kattaa molemmat pelimuodot.
 */
/*
 * EI ENÄÄ RANSKAA VARALLE (löydös 70, Fable 25.9.2026: Kreikassa
 * välilehti näytti Ranskan). Maassa, jolla ei ole maakuntia, yhtäkään
 * ryhmää ei avata; lista kertoo sen tekstillä ja muut maat jäävät
 * suljettuina sen alle. null = maa ei tiedossa (esim. ennen peliä).
 */
export function maakuntienMaa(iso) {
  return MAAKUNTIEN_MAAT.some((m) => m.iso === iso) ? iso : null;
}

export const EI_MAAKUNTIA_TEKSTI = 'Tälle maalle ei ole vielä maakuntia';

/* ===========================================================================
   3. LISTA
   ---------------------------------------------------------------------------
   Rakenne: maaryhmä (otsikkonappi + rivikotelo) per maa, rivi per
   maakunta. `lista` on KAIKKIEN rivien yhteinen esi-isä ja pysyy
   `position: relative`-alkiona (css/styles.css), jotta tuleva
   peukalolevy voi liukua sen päällä samassa sarakkeessa kuin muillakin
   välilehdillä — rivit itse asuvat maaryhmän sisällä eivätkä listan
   suorina lapsina, mutta se ei vaikuta asemointiin: ryhmäkotelo ei aseta
   omaa position-arvoaan, joten `lista` on yhä lähin asemoitu esivanhempi.
   =========================================================================== */

/**
 * Rakentaa Maakunnat-välilehden sisällön annettuun paneelielementtiin.
 *
 * @param {HTMLElement} paneeli  välilehden oma, tyhjä säiliö (toinen
 *   sessio kutsuu tämän vain KERRAN, kun välilehti avataan ensin).
 * @param {{ levy?: Function, ui?: object }} [asetukset]
 *   `levy` on `luoPeukalolevy`-tehdas (js/karttaselite-levy.js, ei vielä
 *   olemassa); puuttuessaan rivin napautus riittää valintaan. `ui` on
 *   pelin UI-olio, jota käytetään vain nykyisen maan päättelyyn ja
 *   `ui.karttatyokaluMaakunta`-koukun kiinnitykseen — kumpikaan ei ole
 *   pakollinen.
 * @returns {{ valitse: (avain: string) => void, paivitaMaa: () => void, paivita: () => void }}
 */
export function rakennaMaakunnat(paneeli, { levy, ui } = {}) {
  if (!paneeli) return null;

  const juuri = html('div', 'maakunnat-tyokalu');
  const eiMaakuntia = html('p', 'maakunnat-ei-maakuntia', EI_MAAKUNTIA_TEKSTI);
  eiMaakuntia.hidden = true;
  const lista = html('div', 'maakunnat-lista');
  const kuvaus = html('div', 'maakunnat-luonnehdinta');
  kuvaus.hidden = true;
  juuri.append(eiMaakuntia, lista, kuvaus);
  paneeli.appendChild(juuri);

  const rivit = [];
  const rivitAvaimella = new Map();
  /** Peukalolevyn kahva; luodaan vasta kun rivit ovat olemassa (valitse voi ajaa jo ennen sitä). */
  let levykahva = null;
  const ryhmat = new Map();
  const kuuntelijat = new Set();

  const tallennettu = lueTallennettuValinta();
  let valittuAvain = avainKelpaa(tallennettu) ? tallennettu : null;
  /*
   * NYKYISEN MAAN RYHMÄ AUKI. Tallennettu valinta ei enää päätä avointa
   * ryhmää (se jäi Ranskaan Kreikassakin); vain jos maata ei tiedetä,
   * avataan valitun rivin ryhmä kuten ennen.
   */
  let nykyIso = kohteidenNykyinenIso(ui) ?? null;
  const avoinIso = nykyIso
    ? maakuntienMaa(nykyIso)
    : (valittuAvain ? jaaAvain(valittuAvain).iso : null);
  eiMaakuntia.hidden = !nykyIso || Boolean(avoinIso);

  /** Vain yksi maaryhmä auki kerrallaan — sama tila kuin karttaselitteen levyllä. */
  function vaihdaRyhma(iso) {
    const kohde = ryhmat.get(iso);
    if (!kohde) return;
    const oliAuki = kohde.otsikko.getAttribute('aria-expanded') === 'true';
    for (const [muuIso, r] of ryhmat) {
      const tuleeAuki = !oliAuki && muuIso === iso;
      r.otsikko.setAttribute('aria-expanded', String(tuleeAuki));
      r.rivitRyhma.hidden = !tuleeAuki;
    }
    // Rivit siirtyivät: levy uudelle paikalle (piiloon, jos valittu rivi on suljetussa ryhmässä).
    levykahva?.paivita(valittuAvain);
  }

  /**
   * Saapuminen toiseen maahan (karttaselitteen paivita kutsuu joka
   * renderöinnissä): maa vaihtui → sen ryhmä auki tai teksti ja kaikki
   * kiinni. Saman maan sisällä pelaajan omat avaukset säilyvät.
   */
  function paivitaMaa() {
    const iso = kohteidenNykyinenIso(ui) ?? null;
    if (!iso || iso === nykyIso) return;
    nykyIso = iso;
    const auki = maakuntienMaa(iso);
    eiMaakuntia.hidden = Boolean(auki);
    for (const [muuIso, r] of ryhmat) {
      r.otsikko.setAttribute('aria-expanded', String(muuIso === auki));
      r.rivitRyhma.hidden = muuIso !== auki;
    }
    levykahva?.paivita(valittuAvain);
  }

  /** Valitun alueen luonnehdintalaatikko: nimi, teksti ja tarvittaessa plus. */
  function paivitaLuonnehdinta(avain) {
    kuvaus.replaceChildren();
    if (!avain) { kuvaus.hidden = true; return; }
    const osat = jaaAvain(avain);
    const nimi = maakunnanNimi(osat.iso, osat.tunnus);
    const data = haeLuonnehdinta(avain);
    kuvaus.hidden = false;
    kuvaus.appendChild(html('p', 'maakunnat-luonnehdinta-nimi', nimi));
    kuvaus.appendChild(html('p', 'maakunnat-luonnehdinta-teksti', data?.lyhyt ?? 'Luonnehdinta tulossa.'));
    if (data) {
      const lisaa = html('button', 'maakunnat-luonnehdinta-lisaa');
      lisaa.type = 'button';
      lisaa.title = 'Lisää alueesta';
      lisaa.setAttribute('aria-label', 'Lisää alueesta');
      lisaa.innerHTML = PLUS_IKONI;
      lisaa.addEventListener('click', () => avaaMaakuntaKortti(avain, nimi, data));
      kuvaus.appendChild(lisaa);
    }
  }

  /*
   * VALITSE ON YHTEINEN PORTTI riville JA levylle (sovittu rajapinta:
   * levy kutsuu tätä samaa funktiota, kun pelaaja raahaa tai napauttaa).
   * VALINTA YKSI KERRALLAAN: vain yksi rivi kantaa aria-pressed='true'.
   */
  function valitse(avain) {
    if (!avainKelpaa(avain) || avain === valittuAvain) return;
    if (valittuAvain) rivitAvaimella.get(valittuAvain)?.setAttribute('aria-pressed', 'false');
    valittuAvain = avain;
    rivitAvaimella.get(avain)?.setAttribute('aria-pressed', 'true');
    tallennaValinta(avain);
    paivitaLuonnehdinta(avain);
    levykahva?.paivita(avain);
    for (const kuuntelija of kuuntelijat) kuuntelija(avain);
  }

  for (const { iso, nimi } of MAAKUNTIEN_MAAT) {
    const tunnukset = MAAKUNTIEN_NIMET[iso] ?? {};
    const ryhma = html('div', 'maakunnat-ryhma');
    const otsikko = html('button', 'maakunnat-maaotsikko', nimi);
    otsikko.type = 'button';
    const auki = iso === avoinIso;
    otsikko.setAttribute('aria-expanded', String(auki));
    otsikko.addEventListener('click', () => vaihdaRyhma(iso));

    const rivitRyhma = html('div', 'maakunnat-rivit-ryhma');
    rivitRyhma.hidden = !auki;

    for (const tunnus of Object.keys(tunnukset)) {
      const avain = `${iso}:${tunnus}`;
      const rivi = html('button', 'maakunnat-rivi');
      rivi.type = 'button';
      rivi.dataset.avain = avain;
      rivi.setAttribute('aria-pressed', String(avain === valittuAvain));
      rivi.append(
        html('span', 'maakunnat-rivi-nimi', maakunnanNimi(iso, tunnus)),
        // Tyhjä lukupaikka: sama sarake kuin Nostot-välilehden rivin
        // oikeassa laidassa, jotta peukalolevy voi liukua saman
        // sarakeleveyden yli riippumatta siitä, millä välilehdellä se on.
        html('span', 'maakunnat-luku', ''),
      );
      rivi.addEventListener('click', () => valitse(avain));
      rivitRyhma.appendChild(rivi);
      rivit.push(rivi);
      rivitAvaimella.set(avain, rivi);
    }

    ryhma.append(otsikko, rivitRyhma);
    lista.appendChild(ryhma);
    ryhmat.set(iso, { otsikko, rivitRyhma });
  }

  /*
   * LEVY ON VALINNAINEN (peukalolevy-moduulia ei vielä ole). Kutsutaan
   * VASTA kun rivit ovat kaikki olemassa — levy tarvitsee koko listan
   * mitatakseen rivien paikat.
   */
  // Levy lukee rivit Map-muodossa (avain → rivi), kuten karttaselite-levy.js dokumentoi.
  levykahva = typeof levy === 'function'
    ? levy({ lista, rivit: rivitAvaimella, valittu: valittuAvain, valitse })
    : null;

  paivitaLuonnehdinta(valittuAvain);

  if (ui) {
    ui.karttatyokaluMaakunta = {
      valittu: () => valittuAvain,
      kuuntele(fn) {
        if (typeof fn !== 'function') return () => {};
        kuuntelijat.add(fn);
        return () => kuuntelijat.delete(fn);
      },
    };
  }

  return { valitse, paivitaMaa, paivita: () => levykahva?.paivita(valittuAvain) };
}

/* ===========================================================================
   4. KORTTI
   ---------------------------------------------------------------------------
   Plussa avaa saman korttikerrosmallin kuin nostokortti (js/fokusnosto.js
   .fokusnosto-kerros): kelluva paperi kartan/paneelin päällä, ei koko
   ruudun modaali, turva-alue jokaisella reunalla, sulku ✕:llä, Escapella
   ja taustan napautuksella. OMA LUOKKAPERHE (.maakunta-kortti-kerros)
   eikä fokusnosto.js:n luokkien uudelleenkäyttö suoraan: kortit avataan
   kahdesta eri tiedostosta eikä kumpikaan tunne toisen sulkulogiikkaa,
   ja css/fokusnosto.css on toisen ominaisuuden tiedosto (sama sääntö
   kuin siellä: "OMA TIEDOSTO, EI styles.css").
   =========================================================================== */

const PLUS_IKONI = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" '
  + 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">'
  + '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>';

/*
 * PULUN IKONI ON YKSINKERTAINEN OMA SVG, EI js/pollo.js:n POLLO_IKONI.
 * Tehtävänannon grepillä (`pollo-nappi` index.html:ssä) ei löytynyt
 * mitään — oikea vakio asuu js/pollo.js:ssä, mutta koko tiedoston
 * tuonti pelkän kuvakkeen vuoksi kytkisi tämän rungon Livian koko
 * keskustelukoneistoon ilman hyötyä. Puhekupla kahdella pisteellä
 * riittää vihjeeksi "joku puhuu tässä" -kuvakkeeksi napissa.
 */
const PULU_IKONI = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" '
  + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
  + '<path d="M4 5h16v10H9l-4 4v-4H4z"/>'
  + '<circle cx="9.5" cy="10" r="0.9" fill="currentColor" stroke="none"/>'
  + '<circle cx="14.5" cy="10" r="0.9" fill="currentColor" stroke="none"/></svg>';

/** Auki oleva kortti (yksi kerrallaan, kuten fokusnosto.js:n ui.fokusnostoKortti). */
let avoinKortti = null;

function suljeMaakuntaKortti() {
  const auki = avoinKortti;
  avoinKortti = null;
  auki?.purku?.();
  auki?.kerros?.remove();
}

function avaaMaakuntaKortti(avain, nimi, data) {
  suljeMaakuntaKortti();

  const kerros = html('div', 'maakunta-kortti-kerros');
  const kortti = html('div', 'maakunta-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', nimi);

  const sulje = html('button', 'maakunta-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'maakunta-kortti-sisalto');
  sisalto.appendChild(html('h2', 'maakunta-kortti-otsikko', nimi));

  // KUVAT (voi puuttua kokonaan erässä 1) — kaksi vierekkäin, useampi
  // vaakakaruselliin (scroll-snap, ks. css). Ilman kuvia lohko jää pois.
  const kuvat = maakunnanKuvat(data);
  if (kuvat.length) {
    const kuvalohko = html('div', 'maakunta-kuvat');
    kuvalohko.classList.add(kuvat.length > 2 ? 'maakunta-kuvat-karuselli' : 'maakunta-kuvat-ruudukko');
    for (const kuva of kuvat) {
      const kehys = html('figure', 'maakunta-kuva');
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.src = kuva?.osoite ?? '';
      img.alt = '';
      kehys.appendChild(img);
      const lahdeteksti = [kuva?.lahde, kuva?.lisenssi].filter(Boolean).join(' · ');
      // Lähderivi kulkee talon apurin kautta (tekijakortti.js taytaLahderivi):
      // Commons- ja lisenssilinkit sekä havainnekuvan selite samoin kuin korteissa.
      if (lahdeteksti) kehys.appendChild(taytaLahderivi(html('figcaption', 'maakunta-kuva-lahde'), lahdeteksti, kuva));
      kuvalohko.appendChild(kehys);
    }
    sisalto.appendChild(kuvalohko);
  }

  // PITKÄ TEKSTI — jos `pitka` puuttuu (erä 2 ei ole vielä valmis), näytetään `lyhyt`.
  sisalto.appendChild(html('p', 'maakunta-kortti-teksti', data?.pitka ?? data?.lyhyt ?? ''));

  // PULUN KYSYMYKSET — ilman dataa (erä 3 tulossa) lohko jää kokonaan pois.
  const kysymykset = haePulu(avain);
  if (kysymykset.length) {
    const pulu = html('div', 'maakunta-pulu');
    let avoinVastaus = null;
    for (const { q, a } of kysymykset) {
      const nappi = html('button', 'maakunta-pulu-kysymys');
      nappi.type = 'button';
      nappi.setAttribute('aria-expanded', 'false');
      const ikoni = html('span', 'maakunta-pulu-ikoni');
      ikoni.setAttribute('aria-hidden', 'true');
      ikoni.innerHTML = PULU_IKONI;
      nappi.append(ikoni, html('span', 'maakunta-pulu-kysymys-teksti', q));
      nappi.addEventListener('click', () => {
        // Yksi vastaus kerrallaan: sama napautus sulkee sen uudestaan.
        if (avoinVastaus?.nappi === nappi) {
          avoinVastaus.vastaus.remove();
          nappi.setAttribute('aria-expanded', 'false');
          avoinVastaus = null;
          return;
        }
        if (avoinVastaus) {
          avoinVastaus.vastaus.remove();
          avoinVastaus.nappi.setAttribute('aria-expanded', 'false');
        }
        const vastaus = html('p', 'maakunta-pulu-vastaus', a);
        nappi.insertAdjacentElement('afterend', vastaus);
        nappi.setAttribute('aria-expanded', 'true');
        avoinVastaus = { nappi, vastaus };
      });
      pulu.appendChild(nappi);
    }
    sisalto.appendChild(pulu);
  }

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => suljeMaakuntaKortti();
  sulje.addEventListener('click', kiinni);

  // Napautus kortin ULKOPUOLELLE sulkee (sama malli kuin js/fokusnosto.js
  // avaaNostonKortti): veto ei sulje, jotta vierittäminen kortin
  // ulkopuolelta ei katkea napautukseksi tulkittuna.
  const puraNapautus = kuunteleSulkevaNapautus(kerros, {
    kelpaa: (tapahtuma) => !tapahtuma.target?.closest?.('.maakunta-kortti'),
    napautus: (tapahtuma) => { nielaiseSulkevaNapautus(tapahtuma); kiinni(); },
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    tapahtuma.stopPropagation();
    kiinni();
  };
  document.addEventListener('keydown', nappain, true);

  avoinKortti = {
    kerros,
    purku: () => {
      document.removeEventListener('keydown', nappain, true);
      puraNapautus();
    },
  };
  void kerros.offsetWidth;
  kerros.classList.add('maakunta-kortti-auki');
}

/* ===========================================================================
   5. KYTKENTÄ
   =========================================================================== */

/**
 * Rekisteröi tämän moduulin karttaselitteeseen. js/karttaselite.js
 * kutsuu MYÖHEMMIN `ui.karttaselite.asetaMaakunnat(rakenna)`, kun
 * Maakunnat-välilehti avataan ensi kerran — tätä ei ole vielä
 * olemassa tätä kirjoitettaessa, joten kutsu tehdään suojatusti
 * valinnaisketjulla eikä kaadu vanhalla karttaselitteellä.
 */
export function kytkeMaakunnatKarttaselitteeseen(ui) {
  ui?.karttaselite?.asetaMaakunnat?.((paneeli, apu) => rakennaMaakunnat(paneeli, { ...apu, ui }));
}
