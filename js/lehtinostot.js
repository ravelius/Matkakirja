/*
 * KAUPUNKILEHDEN AIHESIVUJEN NOSTOT TAKAISIN SIVULLE — YKSI DATAREITTI
 * WEBILLE JA NATIIVILLE (omistaja 12.10.2026, päätoimittajan hyväksymä).
 *
 * Tausta: karttauudistuksen erissä 5 ja 10 (13.9.2026, v1850 ja v1854)
 * 14 aihesivun nostot tyhjennettiin (`nostot: []`,
 * js/packs/kulttuuri-kategoriat.js, kommenttilohkot "NOSTOT SIIRTYIVÄT
 * KARTALLE") ja jutut siirtyivät kartan pisteiksi. Omistaja palautti
 * 12.10.2026 sivujen alkuperäiset johdannot (PR #4518) ja päätti, että
 * jutut näkyvät taas myös sivulla.
 *
 * JUTTUJA EI KOPIOIDA TAKAISIN. Tämä moduuli ratkaisee sivun jutut
 * tunnuksella niiden NYKYISESTÄ lähteestä, joten kartta ja lehti
 * näyttävät aina saman tekstin ja kuvan:
 *
 *   nosto-<id>                 FOKUSVIRRAT[kaupunki].takynostot (id)
 *                              teksti = lunastus-kappaleet tyhjällä
 *                              rivillä yhdistettyinä (jaaKappaleiksi
 *                              taittaa ne takaisin kappaleiksi)
 *   syvennys-<kaupunki>-<id>   FOKUSVIRRAT[kaupunki].takyt (id)
 *   muu tunnus                 fokuskohde (js/packs/fokuskohteet-*.js)
 *   paakartta-listan id        takynostot tai takyt suoraan id:llä
 *
 * Kuva: noston `valokuva` (lehden vanha Commons-kuva), jos se on
 * erikseen, muuten `kuva`. Kartan havainnekuva jää kartalle. Kuvan
 * kentät (tiedosto/osoite, lyhyt, selite, lahde, lisenssirivit)
 * nostetaan noston päätasolle, kuten vanhassa nostomuodossa; noston
 * oma `lahde` (tekstin siirtomerkintä) ei tule lehteen, koska sivun
 * lähderivi on kuvan lisenssirivi.
 *
 * Tulos on SAMAA MUOTOA kuin vanha nosto (otsikko, teksti, tiedosto,
 * lyhyt, selite, lahde, galleria, musiikkikentät), joten webin
 * piirraKategoria (js/maalehti.js) ja natiivin vienti
 * (tools/vienti/lehdet.mjs) piirtävät sen omalla nostopohjallaan.
 * Uusi kenttä:
 *   karttaKohde  kohdekartan pisteen nosto-tunnus (js/packs/maakartat.js
 *                KAUPUNKIKARTAT.<kaupunki>.kohteet[].nosto) — "Näytä
 *                kartalla".
 *   paakartta    pääkartan merkin id (kohdekartan ulkopuolinen juttu,
 *                `kattoVapaa`), kun juttu ei ole kohdekartan piste.
 *
 * Moduuli on js/-juuressa eikä js/packs/-kansiossa, koska se on
 * funktioita: packs-kansion jokainen funktio-export vaatisi natiivin
 * logiikkaluettelorivin (tools/vienti/logiikka.mjs), ja natiivi saa
 * tuloksen valmiina viennin nostoina.
 *
 * Yhden tiedoston versio: top-level-nimet alkavat KAUPUNKILEHDEN_/
 * kaupunkilehden-etuliitteellä (tools/tarkista-niputus.mjs).
 */
import { FOKUSVIRRAT } from './packs/fokusvirrat.js';
import { FOKUSKOHTEET_DEU } from './packs/fokuskohteet-deu.js';

/*
 * Sivut, joiden nostot siirtyivät kartalle, ja jutut, jotka sivulle
 * kuuluvat. Lista siirtyi tests/lehdet.test.mjs:n OHJAAVAT-vartiosta
 * (PR #4518), joka tarkistaa sen yhä: johdanto on alkuperäinen ja
 * jokainen juttu on oikeasti kartalla.
 *
 *   vanhaVirke   johdannon vanha teksti sanatarkasti (vartion kaanon).
 *   kohdekartta  nosto-tunnukset, jotka ovat kaupungin kohdekartan
 *                pisteinä (js/packs/maakartat.js KAUPUNKIKARTAT).
 *   pooli        ne kohdekartan tunnuksista, jotka ovat myös kaupungin
 *                täkynostoja (js/packs/fokusvirrat.js takynostot).
 *   paakartta    jutut, jotka ovat pääkartan merkkeinä: tunnuksen on
 *                löydyttävä joko SYVENNYSPAIKAT- tai takynostotaulusta
 *                ja kannettava `kattoVapaa`-lippu.
 *   jarjestys    (valinnainen) sivun jutut vanhan sivun järjestyksessä,
 *                kun se poikkeaa järjestyksestä kohdekartta + paakartta.
 */
export const KAUPUNKILEHDEN_SIIRTYNEET = [
  {
    kaupunki: 'wien',
    sivu: 'musiikki',
    vanhaVirke: 'Valssi, jonka toinen isku tulee etuajassa, ja satuooppera, '
      + 'joka kirjoitettiin esikaupungin puiselle näyttämölle',
    kohdekartta: ['nosto-tonava-kaunoinen', 'nosto-taikahuilu-wiedenissa'],
    pooli: ['nosto-tonava-kaunoinen', 'nosto-taikahuilu-wiedenissa'],
  },
  {
    kaupunki: 'lontoo',
    sivu: 'nykytaide',
    vanhaVirke: 'Lontoossa nykytaide ei pysy museon seinällä: sitä maalataan '
      + 'junatunnelin kattoon, nostetaan tyhjälle patsasjalustalle ja '
      + 'kiedotaan liukumäeksi olympiapuiston veistoksen ympärille.',
    kohdekartta: ['nosto-leake-streetin-tunneli', 'nosto-neljas-jalusta',
      'nosto-tate-modernin-turbiinihalli', 'nosto-orbitin-liukumaki'],
    pooli: ['nosto-leake-streetin-tunneli', 'nosto-neljas-jalusta',
      'nosto-tate-modernin-turbiinihalli', 'nosto-orbitin-liukumaki'],
  },
  {
    kaupunki: 'lontoo',
    sivu: 'luonto',
    vanhaVirke: 'Thames on vuorovesijoki, ja laskuveden aikaan sen kivinen '
      + 'ranta paljastuu keskellä miljoonakaupunkia. Kulman takana on '
      + 'toinen maailma: aidattu puisto, jossa kulkee vapaana lauma hirviä.',
    kohdekartta: ['syvennys-lontoo-vuorovesi'],
    paakartta: ['hirvet'],
  },
  {
    kaupunki: 'wien',
    sivu: 'tiede',
    vanhaVirke: 'Isoisän matkavuonna Wien avasi maailmannäyttelyn ja '
      + 'vuoristovesijohdon. Näyttelyhallissa sattui myös vahinko, joka '
      + 'muutti tehtaat: kone pyörähti väärään suuntaan.',
    kohdekartta: ['syvennys-wien-vesijohto'],
    paakartta: ['sahko', 'maailmannayttely-1873'],
    // Vanha sivu: kone, vesijohto, näyttely.
    jarjestys: ['sahko', 'syvennys-wien-vesijohto', 'maailmannayttely-1873'],
  },
  {
    kaupunki: 'wien',
    sivu: 'luonto',
    vanhaVirke: 'Wienin keskushautausmaalla laiduntaa parikymmentä kaurista '
      + 'vanhojen hautakivien lomassa, ja Schönbrunniin tuotu kirahvi '
      + 'muutti aikoinaan kaupungin kampaukset, kankaat ja seuraelämän',
    paakartta: ['kauriit', 'kirahvimuoti'],
  },
  {
    kaupunki: 'madrid',
    sivu: 'urheilu',
    vanhaVirke: 'Kaupungissa on kaksi suurta jalkapalloseuraa, ja kummallakin '
      + 'on oma suihkulähde, jonka päälle mestaruus kiivetään juhlimaan',
    kohdekartta: ['nosto-madridin-kaksi-joukkuetta'],
    pooli: ['nosto-madridin-kaksi-joukkuetta'],
  },
  {
    kaupunki: 'madrid',
    sivu: 'rakennukset',
    vanhaVirke: 'Kaupungin läpi murrettiin katu hopeisella hakulla, ja '
      + 'palaneen linnan tilalle rakennettiin sellainen, joka ei voisi palaa.',
    kohdekartta: ['nosto-gran-vian-murto', 'nosto-palamaton-linna'],
    pooli: ['nosto-gran-vian-murto', 'nosto-palamaton-linna'],
  },
  {
    kaupunki: 'berliini',
    sivu: 'rakennukset',
    vanhaVirke: 'Syksyllä 1969 Alexanderplatzille valmistui neljän päivän '
      + 'välein kaksi asiaa: kello, joka näyttää maailman ajat, ja torni, '
      + 'joka näkyy kaikkialle kaupunkiin',
    kohdekartta: ['nosto-paavin-kosto', 'nosto-maailmankello'],
    pooli: ['nosto-paavin-kosto', 'nosto-maailmankello'],
  },
  {
    kaupunki: 'berliini',
    sivu: 'historia',
    vanhaVirke: 'Portti, josta alkaa Unter den Linden, sinetin karhu vuodelta '
      + '1280, univormu joka valtasi kaupungintalon — ja kivilaatta, josta '
      + 'museo maksoi 20 000 kultamarkkaa.',
    kohdekartta: ['brandenburgin-portti', 'syvennys-berliini-karhu',
      'nosto-archaeopteryx'],
    pooli: ['nosto-archaeopteryx'],
    paakartta: ['kopenickin-kapteeni'],
    // Johdannon (ja vanhan sivun) järjestys: portti, karhu, univormu, laatta.
    jarjestys: ['brandenburgin-portti', 'syvennys-berliini-karhu',
      'kopenickin-kapteeni', 'nosto-archaeopteryx'],
  },
  {
    kaupunki: 'pariisi',
    sivu: 'musiikki',
    vanhaVirke: 'Kaksi muusikkoa aloitti Pariisin kaduilta ja kaupungin '
      + 'laidan asuntovaunuleiriltä — ja yksi ooppera kaatui täällä '
      + 'ensi-illassaan ennen kuin se nousi maineeseen muualla.',
    kohdekartta: ['nosto-pariisi-soi', 'nosto-carmenin-ensi-ilta'],
    pooli: ['nosto-pariisi-soi', 'nosto-carmenin-ensi-ilta'],
  },
  {
    kaupunki: 'pariisi',
    sivu: 'historia',
    vanhaVirke: 'Isoisän matkavuoden Pariisi oli yhä piirityksen ja palon '
      + 'jäljiltä auki. Samat vuodet jättivät kaupunkiin kyyhkypostin, '
      + 'palatsin rauniot ja maalaussuunnan, jonka nimi oli alun perin '
      + 'pilkkaa.',
    kohdekartta: ['syvennys-pariisi-kyyhkyposti', 'syvennys-pariisi-tuileriat',
      'syvennys-pariisi-impressionistit'],
    // Vanha sivu: rauniot, kyyhkyposti, impressionistit.
    jarjestys: ['syvennys-pariisi-tuileriat', 'syvennys-pariisi-kyyhkyposti',
      'syvennys-pariisi-impressionistit'],
  },
  {
    kaupunki: 'amsterdam',
    sivu: 'taide',
    vanhaVirke: 'Kaksi maalausta samassa museossa: toisesta sahattiin palat '
      + 'pois, toisen alta löytyi tavaroita, jotka maalari itse peitti.',
    kohdekartta: ['nosto-amsterdamin-yovartio', 'nosto-amsterdamin-maitotytto'],
    pooli: ['nosto-amsterdamin-yovartio', 'nosto-amsterdamin-maitotytto'],
  },
  {
    kaupunki: 'rooma',
    sivu: 'arki',
    vanhaVirke: 'Roomassa vesi ei ole koskaan loppunut kesken: sama vuorilta '
      + 'tuleva virta, joka täytti keisarien kylpylät, tulee yhä ilmaiseksi '
      + 'kadunkulman rautapylväästä',
    kohdekartta: ['nosto-aqua-virgo', 'nosto-rooman-nasone'],
    pooli: ['nosto-aqua-virgo', 'nosto-rooman-nasone'],
  },
  {
    kaupunki: 'rooma',
    sivu: 'historia',
    vanhaVirke: 'Paavi jäi Vatikaaniin vangiksi kolme vuotta ennen isoisän '
      + 'käyntiä, Aventinuksella katsotaan avaimenreiästä kolmen valtion '
      + 'läpi, ja Caesarin murhapaikalla asuu kissalauma.',
    kohdekartta: ['syvennys-rooma-vatikaani', 'syvennys-rooma-kissat'],
    paakartta: ['avaimenreika'],
    // Johdannon (ja vanhan sivun) järjestys: Vatikaani, avaimenreikä, kissat.
    jarjestys: ['syvennys-rooma-vatikaani', 'avaimenreika', 'syvennys-rooma-kissat'],
  },
];

/* Fokuskohteet, joista tunnus ilman etuliitettä haetaan (nyt vain Berliinin portti). */
const KAUPUNKILEHDEN_FOKUSKOHTEET = [FOKUSKOHTEET_DEU];

/* Kuvan kentät, jotka nostetaan noston päätasolle (vanha nostomuoto). */
const KAUPUNKILEHDEN_KUVAKENTAT = [
  'tiedosto', 'osoite', 'ampari', 'lyhyt', 'selite', 'lahde', 'vuosi', 'tekija',
  'tekijaId', 'lisenssi', 'lahdeUrl', 'lisenssiUrl', 'asettelu',
];

/* Noston ääni- ja musiikkikentät kulkevat sellaisinaan (js/ui.js lisaaNostonNapit). */
const KAUPUNKILEHDEN_AANIKENTAT = [
  'musiikki', 'musiikkiNimi', 'musiikkiNayte', 'musiikkiNayteNimi', 'esikuuntelu', 'aani', 'aaniLahde',
];

/**
 * Sivun juttujen lähde tunnuksella. Palauttaa { otsikko, teksti, kuva,
 * galleria, juttu } tai null, jos tunnusta ei löydy mistään.
 */
function kaupunkilehdenLahde(kaupunki, tunnus, paakartalla) {
  const virta = FOKUSVIRRAT[kaupunki] ?? {};
  const takynosto = (id) => (virta.takynostot ?? []).find((n) => n.id === id) ?? null;
  const taky = (id) => (virta.takyt ?? []).find((n) => n.id === id) ?? null;
  const nostosta = (n) => (n ? {
    juttu: n,
    otsikko: n.otsikko,
    teksti: (n.lunastus ?? []).join('\n\n'),
    kuva: n.valokuva ?? n.kuva ?? null,
  } : null);
  const takysta = (t) => (t ? {
    juttu: t, otsikko: t.otsikko, teksti: t.teksti ?? '', kuva: t.valokuva ?? t.kuva ?? null,
  } : null);
  if (paakartalla) return nostosta(takynosto(tunnus)) ?? takysta(taky(tunnus));
  if (tunnus.startsWith('nosto-')) return nostosta(takynosto(tunnus.slice('nosto-'.length)));
  const syvennys = `syvennys-${kaupunki}-`;
  if (tunnus.startsWith(syvennys)) return takysta(taky(tunnus.slice(syvennys.length)));
  for (const lista of KAUPUNKILEHDEN_FOKUSKOHTEET) {
    const kohde = lista.find((k) => k.id === tunnus);
    if (kohde) return { juttu: kohde, otsikko: kohde.nimi, teksti: kohde.teksti ?? '', kuva: kohde.kuva ?? null };
  }
  return null;
}

function kaupunkilehdenNosto(kaupunki, tunnus, paakartalla) {
  const lahde = kaupunkilehdenLahde(kaupunki, tunnus, paakartalla);
  if (!lahde?.otsikko || !lahde.teksti) return null;
  const nosto = { otsikko: lahde.otsikko, teksti: lahde.teksti };
  for (const k of KAUPUNKILEHDEN_KUVAKENTAT) {
    if (lahde.kuva?.[k] != null) nosto[k] = lahde.kuva[k];
  }
  if (lahde.juttu.galleria?.length) nosto.galleria = lahde.juttu.galleria;
  // "Lue lisää aiheesta" (SK #4524 palautti 13.9. edeltävät linkit): merkkijono tai lista; lukijat (web ja natiivi)
  // odottavat yhtä artikkelia, joten listasta ensimmäinen.
  const wiki = Array.isArray(lahde.juttu.wiki) ? lahde.juttu.wiki.find((w) => typeof w === 'string' && w) : lahde.juttu.wiki;
  if (typeof wiki === 'string' && wiki) nosto.wiki = wiki;
  for (const k of KAUPUNKILEHDEN_AANIKENTAT) {
    if (lahde.juttu[k] != null) nosto[k] = lahde.juttu[k];
  }
  if (paakartalla) nosto.paakartta = tunnus;
  else nosto.karttaKohde = tunnus;
  return nosto;
}

const KAUPUNKILEHDEN_VALIMUISTI = new Map();

/**
 * Kartalle siirtyneet jutut kaupunkilehden sivulle vanhassa
 * nostomuodossa (ks. moduulin alku). Tyhjä lista, jos sivu ei ole
 * siirtyneiden listalla. Ratkaisematon tunnus jää pois.
 */
export function kaupunkilehdenSiirtyneetNostot(kaupunki, sivuId) {
  const avain = `${kaupunki}/${sivuId}`;
  if (KAUPUNKILEHDEN_VALIMUISTI.has(avain)) return KAUPUNKILEHDEN_VALIMUISTI.get(avain);
  const kohta = KAUPUNKILEHDEN_SIIRTYNEET.find((s) => s.kaupunki === kaupunki && s.sivu === sivuId);
  let nostot = [];
  if (kohta) {
    const paakartta = new Set(kohta.paakartta ?? []);
    const jarjestys = kohta.jarjestys ?? [...(kohta.kohdekartta ?? []), ...(kohta.paakartta ?? [])];
    nostot = jarjestys
      .map((tunnus) => kaupunkilehdenNosto(kaupunki, tunnus, paakartta.has(tunnus)))
      .filter(Boolean);
  }
  KAUPUNKILEHDEN_VALIMUISTI.set(avain, nostot);
  return nostot;
}

/**
 * Sivu nostoineen: jos sivun omat nostot ovat tyhjät ja sivun jutut
 * siirtyivät kartalle, palauttaa sivusta kopion, jonka nostot tulevat
 * kartan lähteistä. Muuten sivu itse. Kopio on vakaa (sama olio joka
 * kutsulla), eikä alkuperäistä sisältöpakettia muuteta.
 */
const KAUPUNKILEHDEN_SIVUKOPIOT = new Map();
export function kaupunkilehdenSivuNostoineen(kaupunki, sivu) {
  if (!sivu || (sivu.nostot ?? []).length) return sivu;
  const avain = `${kaupunki}/${sivu.id}`;
  const vanha = KAUPUNKILEHDEN_SIVUKOPIOT.get(avain);
  if (vanha?.alkuperainen === sivu) return vanha.kopio;
  const nostot = kaupunkilehdenSiirtyneetNostot(kaupunki, sivu.id);
  if (!nostot.length) return sivu;
  const kopio = { ...sivu, nostot };
  KAUPUNKILEHDEN_SIVUKOPIOT.set(avain, { alkuperainen: sivu, kopio });
  return kopio;
}
