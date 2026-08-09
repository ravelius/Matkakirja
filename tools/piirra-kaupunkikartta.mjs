/*
 * Kaupunkisivun kohdekartan piirtäjä (omistajan toive 7.8.2026):
 * "pelkkä ydinkeskusta ... niin että hahmottaa hieman katuja",
 * malliksi näytetty Mapiful-juliste — yksinkertaistettu, taiteellinen
 * katuverkko ilman nimiä.
 *
 * Mapiful piirtää julisteensa OpenStreetMap-aineistosta, ja sama
 * tehdään tässä itse: Overpass-rajapinnasta haetaan ydinkeskustan
 * kadut, vedet, puistot ja radat, ja niistä piirretään SVG pelin
 * paperi- ja mustesävyin. SVG rasteroidaan PNG:ksi pelin omalla
 * Chromiumilla (sama kuin Playwright-tarkistuksissa) ja tallennetaan
 * assets/kartat/-kansioon — kartta toimii siis myös ilman verkkoa
 * eikä riipu Commonsin tiedostoista.
 *
 * Käyttö:  node tools/piirra-kaupunkikartta.mjs berliini
 * Tuloste: assets/kartat/<kaupunki>-keskusta.png ja rajat-lohko,
 *          joka liitetään js/packs/maakartat.js:n KAUPUNKIKARTAT-
 *          tauluun (pisteet asemoidaan siitä prosentteina).
 *
 * Uusi kaupunki: lisää KAUPUNGIT-tauluun rajaus, joka kattaa vain
 * ydinkeskustan kuuluisimmat kohteet (n. 5–8 km leveä alue — laajempi
 * muuttuu puuroksi). Aja työkalu ja KATSO kuva silmin ennen käyttöä.
 *
 * Lisenssi: OpenStreetMapin aineisto on ODbL — lähderiviksi peliin
 * "© OpenStreetMap-tekijät (ODbL)". Tyyli on pelin oma.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Ydinkeskustojen rajaukset. Rajat asteina (WGS84). */
const KAUPUNGIT = {
  berliini: {
    // Mitte Tiergartenista East Side Gallerylle; kaikki kuusi
    // kohdetta (valtiopäivätalo, portti, Museumsinsel, tv-torni,
    // Checkpoint Charlie, East Side Gallery) osuvat alueelle.
    rajat: { pohjoinen: 52.54, etela: 52.485, lansi: 13.34, ita: 13.46 },
  },
  kairo: {
    // Niilin molemmat rannat Tahrir-aukiolta Islamilaiseen Kairoon:
    // Geziran saari lännessä, Khan el-Khalilin kujat ja sitadelli
    // idässä. Ensimmäinen rajaus jätti Niilin kuvan vasempaan reunaan
    // ja kohteet alalaitaan — tämä keskittää joen ja kohteet.
    // Pyramidit jäävät ulkopuolelle: ne ovat 15 km lännessä eivätkä
    // mahdu ydinkeskustaan ilman että kartta muuttuu puuroksi.
    rajat: { pohjoinen: 30.068, etela: 30.018, lansi: 31.198, ita: 31.278 },
  },
  madrid: {
    // Kuninkaanlinnalta Retiron puistoon, Gran Vían pohjoispuolelta
    // Atochan asemalle. Kaikki kuusi kohdetta (linna, Plaza Mayor,
    // Puerta del Sol, Cibeles, Prado, Alcalán portti) osuvat alueelle,
    // ja Retiron puisto tuo itälaitaan ison vihreän vastapainon
    // ruutukaavalle.
    rajat: { pohjoinen: 40.43, etela: 40.406, lansi: -3.72, ita: -3.675 },
  },
  tukholma: {
    // Kaupungintalolta Skansenille: Gamla stanin saari keskellä,
    // Riddarfjärden lännessä ja Djurgården idässä. Kaikki kuusi
    // kohdetta osuvat alueelle, ja vesi jakaa kuvan niin kuin se
    // jakaa kaupungin — Tukholmassa ranta on kartan pääpiirre.
    //
    // Ainoa jo julkaistu kartta, joka piirrettiin uudestaan
    // merentäytöllä (9.8.2026). Ennen vesi oli rannan myötäinen nauha
    // ja Riddarfjärdenin sekä Saltsjön keskiosat jäivät paperin
    // värisiksi; nyt ne ovat vettä ja saaret lukevat saarina.
    // Tarkistettu silmällä: kaikki kuusi pistettä osuvat yhä oikein.
    rajat: { pohjoinen: 59.342, etela: 59.313, lansi: 18.03, ita: 18.11 },
    meri: true,
  },
  venetsia: {
    /*
     * ÄLÄ LISÄÄ TÄHÄN meri: true. Kokeiltu 9.8.2026, ja tulos oli
     * kartta, jossa MERI PEITTI KOKO KAUPUNGIN: laguunissa rantaviiva
     * pilkkoutuu kymmeniksi pätkiksi, joista osa sulkeutuu väärin
     * päin, ja saaret jäivät veden alle. Venetsian kanavat piirtyvät
     * oikein rantanauhana, koska ne ovat kapeita — juuri siihen nauha
     * on tehty.
     */
    // Koko historiallinen keskusta rautatieasemalta Arsenaalille:
    // Canal Grande kaartaa kuvan halki S-kirjaimena, ja kaikki kuusi
    // kohdetta (asema, Ca' d'Oro, Rialto, Accademia, San Marco,
    // Arsenaali) osuvat alueelle. Muut Venetsian kartat ovat tästä
    // poikkeus siinä, että kohteiden väliset "kadut" ovat kujia ja
    // kanavia — ks. KADUT-taulun kommentti jalankulkuluokista.
    rajat: { pohjoinen: 45.445, etela: 45.4265, lansi: 12.3155, ita: 12.352 },
  },
  praha: {
    // Vltavan mutka: Petřínin kukkula ja Hradčany lännessä,
    // Vanhankaupungin sokkelo idässä, Václavin aukio oikeassa
    // alanurkassa. Joki tulee kuvaan alhaalta, kaartaa Kaarlensillan
    // kohdalla ja poistuu oikeasta ylänurkasta — loiva S kuvan halki.
    // Vyšehrad jää ulkopuolelle: se on 1,2 km etelämpänä, ja mukaan
    // ottaminen leventäisi kuvan niin ettei joen mutka enää erotu.
    rajat: { pohjoinen: 50.095, etela: 50.074, lansi: 14.382, ita: 14.446 },
  },
  wien: {
    // Ring on kuvan pääpiirre: purettu kaupunginmuuri jätti soikean
    // kehäkadun, jonka sisäpuolella katuverkko on sokkelo ja
    // ulkopuolella suoraviivainen. Koillisessa kaartaa Donaukanal ja
    // sen takana on Praterin vihreä.
    //
    // Schönbrunn on 4,3 km lounaaseen, ja päärajaukseen ottaminen
    // vaatisi 7,2 km leveän kuvan — silloin Ring, koko kuvan juoni,
    // kutistuisi täpläksi. Se palasi siksi KAINALOKARTTANA vasempaan
    // alanurkkaan, jossa ei ole yhtään numeroitua kohdetta.
    // Karl-Marx-Hof (4,3 km pohjoiseen) jää yhä ulkopuolelle: se on
    // lehden arkisivun nosto eikä kartan kohde.
    rajat: { pohjoinen: 48.22, etela: 48.188, lansi: 16.34, ita: 16.404 },
    kainalot: [
      {
        rajat: { pohjoinen: 48.191, etela: 48.178, lansi: 16.303, ita: 16.325 },
        x: 2, y: 56, leveys: 30, suunta: '4 km lounaaseen',
      },
    ],
  },
  budapest: {
    // Kaksi kaupunkia yhdessä kuvassa: Budan kukkula lännessä, Pestin
    // tasanko idässä, ja Tonava vinosti niiden välissä (joen keskilinja
    // x 37 % ylhäällä, x 64 % alhaalla). Margitin sillalta
    // Vapaudensillalle eli neljä siltaa.
    //
    // Sankarien aukio on lehden kansikuva mutta 3 km koilliseen, ja
    // päärajaukseen ottaminen olisi työntänyt Tonavan kuvan laitaan —
    // eli hukannut sen, mitä kartta on tekemässä. Se palasi
    // KAINALOKARTTANA oikeaan ylänurkkaan, jossa ei ole numeroituja
    // kohteita. Kainalo ottaa mukaan myös Városligetin ja Széchenyin
    // kylpylän, eli lehden kolmas koillinen kohde näkyy sekin.
    rajat: { pohjoinen: 47.5125, etela: 47.4825, lansi: 19.019, ita: 19.079 },
    kainalot: [
      {
        rajat: { pohjoinen: 47.5215, etela: 47.5095, lansi: 19.07, ita: 19.092 },
        x: 70, y: 3, leveys: 28, suunta: '3 km koilliseen',
      },
    ],
  },
  pariisi: {
    // Eiffel-tornilta Notre-Damelle ja Montmartren laelle. Molemmat
    // mahtuvat (4,8 km toisistaan), eikä 6,6 km ole puuroa: Pariisin
    // korttelit ovat isoja, joten katutiheys on pienempi kuin
    // Lontoossa, jonka kartta on jo julkaistu.
    //
    // Hinta on etelälaita: Panthéon ja Luxembourgin puutarha jäävät
    // ulos. Vaihtoehto oli tiukempi rajaus ilman Montmartrea, mutta
    // silloin lapsen kaksi tunnetuinta kohdetta eivät olisi samassa
    // kuvassa.
    rajat: { pohjoinen: 48.892, etela: 48.847, lansi: 2.277, ita: 2.3675 },
  },
  amsterdam: {
    // Kanavakehä on hevosenkengän muotoinen, ei soikea, joten rajaus on
    // tarkoituksella lähes neliö: leveämpi kuva litistäisi kaaret ja
    // jättäisi sivut tyhjiksi. Pohjoisreuna ottaa mukaan IJ-lahden
    // avoveden — lahti on syy koko kaupungin olemassaoloon.
    //
    // Kanavat piirtyvät ilman lisäyksiä: ne ovat OSM:ssä
    // waterway=canal -viivoja, jotka kysely jo hakee (Prinsengracht,
    // Keizersgracht ja Herengracht yhteensä yli 90 polkua), ja IJ
    // tulee vesirelaationa, jonka Tukholmaa varten lisätty rivi
    // hoitaa. Vesiveto 14 px vastaa tällä mittakaavalla noin 32 metriä
    // eli kanavien todellista leveyttä; kaaret eivät sula yhteen.
    rajat: { pohjoinen: 52.3855, etela: 52.356, lansi: 4.868, ita: 4.922 },
  },
  dublin: {
    // Liffey kulkee vaakasuoraan kuvan halki ja jakaa sen. Ydinkeskusta
    // on todella pieni, joten 3,3 × 2,2 km riittää: koko keskiaikainen
    // Dublin — linna, katedraali ja se musta lammikko, josta kaupunki
    // sai nimensä — mahtuu kuvan alaosaan.
    //
    // Samuel Beckettin silta jää 173 metriä itärajan ulkopuolelle,
    // vaikka se on lehden kansikuva. Sisään ottaminen olisi työntänyt
    // Guinnessin kuvan reunaan. Croke Park on 634 m pohjoiseen.
    rajat: { pohjoinen: 53.355, etela: 53.335, lansi: -6.294, ita: -6.244 },
  },
  ateena: {
    // Ateenassa ei ole jokea eikä rantaa, joten kuvan selkäranka on
    // kukkularivi lounaasta koilliseen: Filopáppos, Akropolis,
    // Kansallispuutarha ja Lykavittós. Pireus on 8 km lounaaseen eikä
    // mahdu millään ydinkeskustarajauksella.
    rajat: { pohjoinen: 37.9855, etela: 37.9625, lansi: 23.707, ita: 23.758 },
  },
  lontoo: {
    // Hyde Parkin itälaidalta Tower Bridgelle, Regent's Parkin
    // eteläpuolelta Thamesin etelärannalle. Kaikki kuusi kohdetta
    // (Buckinghamin palatsi, Trafalgar Square, Big Ben, Lontoon silmä,
    // Pyhän Paavalin katedraali, Tower Bridge) osuvat alueelle, ja
    // Thames kaartaa kuvan halki tunnistettavana.
    rajat: { pohjoinen: 51.525, etela: 51.4925, lansi: -0.16, ita: -0.06 },
  },
};

/*
 * Katuluokkien piirtojärjestys ja -tyyli (pienestä isoon).
 *
 * MIEDOMPI KONTRASTI (omistajan toive 7.8.2026: "kokeile tehdä
 * kaupungin kartta miedommalla kontrastilla"). Ensimmäinen versio veti
 * pääkadut lähes mustina (#322717) vaalealle paperille, ja kartta
 * hallitsi sivua enemmän kuin sen kohteet. Sävyt nostettiin
 * pergamentin puoleen niin, että ero pienimmän ja suurimman kadun
 * välillä säilyy — kartta on yhä luettava, mutta se on nyt tausta eikä
 * julistetta. Viivanleveyksiä hiukan ohennettiin samasta syystä.
 *
 * TOINEN KEVENNYS (omistajan palaute 8.8.2026: "viivat vaaleammiksi,
 * erityisesti tummimmat"). Kevennys ei ole tasainen, ja se on
 * tarkoituksellista: tummin pää nousi paljon (#7a6a4d → #a08e64,
 * kontrasti paperiin 4,0:1 → 2,7:1) ja ohuin pää vain vähän
 * (#bcae91 → #c8bb9e). Jos molempia olisi kevennetty yhtä paljon,
 * tiheimpien kaupunkien pikkukadut olisivat kadonneet kokonaan —
 * Madridin ydinkeskusta on pelkkää pikkukatua ilman jokea tai rantaa,
 * ja se on näistä kuudesta herkin. Nyt luokkien väliset erot ovat
 * kapeammat mutta kaikki viisi luokkaa erottuvat yhä toisistaan.
 */
const KADUT = [
  { luokat: ['residential', 'unclassified', 'living_street', 'pedestrian'], vari: '#c8bb9e', leveys: 1.4 },
  { luokat: ['tertiary', 'tertiary_link'], vari: '#c1b394', leveys: 2.2 },
  { luokat: ['secondary', 'secondary_link'], vari: '#b5a583', leveys: 2.9 },
  { luokat: ['primary', 'primary_link'], vari: '#ab9a73', leveys: 3.7 },
  { luokat: ['trunk', 'trunk_link', 'motorway', 'motorway_link'], vari: '#a08e64', leveys: 4.6 },
];

/*
 * Sävyt pääkartan pergamenttipaletista (omistajan tarkennus 7.8.2026:
 * "pääkartan sävyinen, eli siniset ja vihreät pois"): vesi on järvien
 * #ecd9ae-perhettä hieman tummempana, jotta se erottuu paperista, ja
 * vesireuna sama #b99a68 kuin pääkartan meriviivoissa (.sea-echo).
 * Puistot ovat pelkkä kuiskaus paperia tummempaa — ei vihreää.
 */
const VESI = '#e8d5a9';
const VESIREUNA = '#b99a68';
const PUISTO = '#efe6ca';
const RATA = '#d5c9b0';
const PAPERI = '#f6eeda';

async function haeOverpass(rajat) {
  const alue = `(${rajat.etela},${rajat.lansi},${rajat.pohjoinen},${rajat.ita})`;
  const luokat = KADUT.flatMap((k) => k.luokat).join('|');
  const kysely = `[out:json][timeout:120];(
    way["highway"~"^(${luokat})$"]${alue};
    way["waterway"~"^(river|canal)$"]${alue};
    way["natural"~"^(water|coastline)$"]${alue};
    /*
     * Metsäiset rinteet eivät ole OSM:ssä puistoja vaan luontoa, joten
     * ilman tätä riviä ne jäävät paperin värisiksi.
     *
     * TÄMÄ EI RIITÄ ISOILLE KUKKULOILLE. Ateenan Lykavittós on
     * relaatio (natural=wood + landuse=forest), ja kysely hakee
     * relaatioista vain vedet — kukkula jää siksi yhä piirtymättä.
     * Sen korjaaminen vaatisi relaatiohaaran uudelleenkirjoituksen:
     * nyt jokaisen relaation jäsenpolut työnnetään joet-listaan, eli
     * puistorelaatio piirtyisi jokena. Ks. piirra().
     */
    way["natural"~"^(wood|scrub)$"]${alue};
    way["leisure"~"^(park|garden)$"]${alue};
    way["landuse"~"^(forest|grass|recreation_ground|cemetery)$"]${alue};
    way["railway"="rail"]${alue};
    /*
     * Isot järvet ja lahdet ovat OSM:ssä monikulmiorelaatioita, ja
     * niiden jäsenpoluilla ei ole omia merkintöjä — pelkkä
     * way["natural"="water"] ei siis löydä niitä lainkaan. Tukholmassa
     * se tarkoitti, että Riddarfjärden puuttui kartalta kokonaan.
     */
    relation["natural"="water"]${alue};
  );out geom;`;
  const vastaus = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'User-Agent': 'matkakirja/1.0 (opetuspeli)' },
    // Rivinvaihdot pois: Overpass vastaa monirivisille 406.
    body: new URLSearchParams({ data: kysely.replace(/\s+/g, ' ') }),
    signal: AbortSignal.timeout(180000),
  });
  if (!vastaus.ok) throw new Error(`Overpass ${vastaus.status}`);
  return (await vastaus.json()).elements ?? [];
}

/*
 * Overpass on julkinen ja ruuhkainen: se vastaa 429:llä liian tiheään
 * ajettuun kyselyyn ja 504:llä silloin kun se on itse kuormittunut.
 * Kumpikin on ohimenevä, mutta ilman uusintaa ne kaatavat koko ajon —
 * ja koska aineisto haetaan ennen piirtoa, hukkaan menee myös se
 * minuutti, jonka kysely ehti kestää. Kolme yritystä kasvavalla
 * odotuksella riitti kaikkiin tässä kohdattuihin katkoihin.
 */
async function haeOverpassSitkeasti(rajat, yrityksia = 3) {
  for (let i = 1; ; i++) {
    try {
      return await haeOverpass(rajat);
    } catch (virhe) {
      if (i >= yrityksia) throw virhe;
      const odotus = 15000 * i;
      console.log(`  ${virhe.message} — uusi yritys ${odotus / 1000} s kuluttua…`);
      await new Promise((r) => setTimeout(r, odotus));
    }
  }
}

const avain = (p) => `${p.lat.toFixed(7)},${p.lon.toFixed(7)}`;

/** Monikulmion pinta-ala asteneliöinä (kenkänauhakaava). */
function renkaanAla(rengas) {
  let a = 0;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
    a += (rengas[j].lon * rengas[i].lat) - (rengas[i].lon * rengas[j].lat);
  }
  return Math.abs(a / 2);
}

/**
 * Ketjuttaa polkujoukon renkaiksi päätepisteitä yhdistellen. Polun
 * suunnalla ei ole väliä, joten polkuja saa kääntää — käytetään
 * vesirelaatioiden ulkorenkaisiin.
 */
function ketjuta(polut) {
  const jaljella = polut.map((g) => g.slice());
  const ketjut = [];
  while (jaljella.length) {
    let k = jaljella.pop();
    for (let muuttui = true; muuttui;) {
      muuttui = false;
      for (let i = 0; i < jaljella.length; i += 1) {
        const o = jaljella[i];
        const paa = avain(k[k.length - 1]);
        const alku = avain(k[0]);
        if (paa === avain(o[0])) k = k.concat(o.slice(1));
        else if (paa === avain(o[o.length - 1])) k = k.concat(o.slice().reverse().slice(1));
        else if (alku === avain(o[o.length - 1])) k = o.slice(0, -1).concat(k);
        else if (alku === avain(o[0])) k = o.slice().reverse().slice(0, -1).concat(k);
        else continue;
        jaljella.splice(i, 1);
        muuttui = true;
        break;
      }
    }
    ketjut.push(k);
  }
  return ketjut;
}

/*
 * Rantaviivalle OMA ketjutus: polkuja EI SAA KÄÄNTÄÄ. OSM piirtää
 * rantaviivan aina niin, että maa on kulkusuunnan vasemmalla ja vesi
 * oikealla, ja peräkkäiset polut liittyvät pää–häntä. Jos ketjutus
 * kääntää polun, suuntatieto katoaa ja meri täyttyy kaupungin päälle.
 */
function ketjutaSuunnassa(polut) {
  const alut = new Map();
  polut.forEach((g, i) => {
    const a = avain(g[0]);
    if (!alut.has(a)) alut.set(a, []);
    alut.get(a).push(i);
  });
  const paat = new Set(polut.map((g) => avain(g[g.length - 1])));
  const kaytetty = new Set();
  const ketjut = [];
  const kasvata = (i) => {
    kaytetty.add(i);
    let ketju = polut[i].slice();
    for (;;) {
      const seur = (alut.get(avain(ketju[ketju.length - 1])) ?? []).find((j) => !kaytetty.has(j));
      if (seur === undefined) break;
      kaytetty.add(seur);
      ketju = ketju.concat(polut[seur].slice(1));
    }
    ketjut.push(ketju);
  };
  // Ensin ketjut, joiden alkuun ei liity mitään; sitten loput (renkaat).
  polut.forEach((g, i) => { if (!kaytetty.has(i) && !paat.has(avain(g[0]))) kasvata(i); });
  polut.forEach((g, i) => { if (!kaytetty.has(i)) kasvata(i); });
  return ketjut;
}

/*
 * MEREN TÄYTTÖ RANTAVIIVASTA (Fablen päätös 9.8.2026, vaihtoehto a).
 *
 * Avomeri ei ole OSM:ssä monikulmio vaan pelkkä rantaviiva: maa on
 * viivan vasemmalla puolella ja vesi oikealla, eikä vettä ole
 * piirretty minkään muodon sisään. Tukholmassa tämä ei haitannut,
 * koska siellä vedet ovat kapeita salmia ja rantaa myötäilevä
 * vesiveto riitti. Marseillessa koko kuvan länsipuoli jäi paperin
 * väriseksi ja Istanbulissa Bosporin 1,2–2 km olisi jäänyt tyhjäksi.
 *
 * Ratkaisu: ketjuta rantaviivat suunnassa, leikkaa ne rajauslaatikkoon
 * ja sulje kukin pätkä laatikon reunaa pitkin vesipuolelle.
 *
 * Kolme sudenkuoppaa, jotka kaikki on kierretty tässä:
 *  1. Sulkusuunta valitaan KOEPISTEELLÄ eikä päättelemällä. Rannan
 *     keskikohdasta otetaan pieni askel kulkusuunnan oikealle eli
 *     veteen, ja valitaan se rengas, jonka sisään koepiste jää.
 *     Pelkkä orientaation päättely menee helposti väärin, koska
 *     ruutukoordinaatiston y-akseli osoittaa alas.
 *  2. Lähes koko laatikon peittävät renkaat hylätään. Pätkä, joka
 *     poikkeaa laatikkoon ja palaa samalta reunalta, sulkeutuisi
 *     muuten koko kehän ympäri ja täyttäisi kaupungin merellä.
 *  3. Suljetut ketjut ovat saaria, ja ne piirretään paperin värillä
 *     meren päälle.
 *
 * Tunnettu puute: jos rantaviiva poistuu laatikosta sivureunan kautta
 * ja palaa samalle reunalle, väliin jäävä reunapätkä jää täyttämättä.
 * Se näkyy paperinvärisenä kiilana reunassa. Rajaus kannattaa valita
 * niin, ettei näin käy — ja kuva pitää joka tapauksessa katsoa.
 */
function merenTaytto(ketjut, r) {
  const sisalla = (p) => p.lon >= r.lansi && p.lon <= r.ita && p.lat >= r.etela && p.lat <= r.pohjoinen;
  const W = r.ita - r.lansi;
  const H = r.pohjoinen - r.etela;
  // Myötäpäivään kiertävä reunaparametri 0..4, jotta reunaa pitkin
  // kävely osaa valita oikeat kulmat oikeassa järjestyksessä.
  const t = (p) => {
    const eL = Math.abs(p.lon - r.lansi);
    const eI = Math.abs(p.lon - r.ita);
    const eE = Math.abs(p.lat - r.etela);
    const eP = Math.abs(p.lat - r.pohjoinen);
    const m = Math.min(eL, eI, eE, eP);
    if (m === eL) return (p.lat - r.etela) / H;
    if (m === eP) return 1 + (p.lon - r.lansi) / W;
    if (m === eI) return 2 + (r.pohjoinen - p.lat) / H;
    return 3 + (r.ita - p.lon) / W;
  };
  const kulmat = [
    { t: 1, lon: r.lansi, lat: r.pohjoinen },
    { t: 2, lon: r.ita, lat: r.pohjoinen },
    { t: 3, lon: r.ita, lat: r.etela },
    { t: 0, lon: r.lansi, lat: r.etela },
  ];
  const leikkaa = (a, b) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 40; i += 1) {
      const m = (lo + hi) / 2;
      const p = { lon: a.lon + (b.lon - a.lon) * m, lat: a.lat + (b.lat - a.lat) * m };
      if (sisalla(p)) lo = m; else hi = m;
    }
    return {
      lon: Math.min(r.ita, Math.max(r.lansi, a.lon + (b.lon - a.lon) * lo)),
      lat: Math.min(r.pohjoinen, Math.max(r.etela, a.lat + (b.lat - a.lat) * lo)),
    };
  };

  const palat = [];
  const saaret = [];
  for (const k of ketjut) {
    if (avain(k[0]) === avain(k[k.length - 1])) {
      if (k.some(sisalla)) saaret.push(k);
      continue;
    }
    let pala = null;
    for (let i = 0; i < k.length; i += 1) {
      const p = k[i];
      if (sisalla(p)) {
        if (!pala) {
          pala = [];
          if (i > 0) pala.push(leikkaa(p, k[i - 1]));
        }
        pala.push(p);
      } else if (pala) {
        pala.push(leikkaa(k[i - 1], p));
        palat.push(pala);
        pala = null;
      }
    }
    if (pala) palat.push(pala);
  }

  const kavele = (pala, eteen) => {
    const tA = t(pala[0]);
    const rengas = pala.slice();
    let kaynti = t(pala[pala.length - 1]);
    for (let kierros = 0; kierros < 8; kierros += 1) {
      const etaisyys = (c) => (eteen ? ((c.t - kaynti) + 4) % 4 : ((kaynti - c.t) + 4) % 4) || 4;
      const kohde = (eteen ? ((tA - kaynti) + 4) % 4 : ((kaynti - tA) + 4) % 4);
      const c = kulmat.map((k) => ({ ...k, d: etaisyys(k) })).sort((a, b) => a.d - b.d)[0];
      if (kohde === 0 || c.d >= kohde) break;
      rengas.push({ lat: c.lat, lon: c.lon });
      kaynti = c.t;
    }
    return rengas;
  };
  const sisassa = (rengas, p) => {
    let osuu = false;
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
      const a = rengas[i];
      const b = rengas[j];
      if ((a.lat > p.lat) !== (b.lat > p.lat)
        && p.lon < ((b.lon - a.lon) * (p.lat - a.lat)) / (b.lat - a.lat) + a.lon) osuu = !osuu;
    }
    return osuu;
  };
  const ala = (rengas) => {
    let a = 0;
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
      a += (rengas[j].lon * rengas[i].lat) - (rengas[i].lon * rengas[j].lat);
    }
    return Math.abs(a / 2);
  };
  const renkaat = palat.flatMap((pala) => {
    const m = Math.max(1, Math.floor(pala.length / 2));
    const a = pala[m - 1];
    const b = pala[m];
    const dx = b.lon - a.lon;
    const dy = b.lat - a.lat;
    const pit = Math.hypot(dx, dy) || 1;
    const askel = 0.00025;
    // Oikea puoli kulkusuunnasta on vesi: (dy, −dx).
    const koe = {
      lon: (a.lon + b.lon) / 2 + (dy / pit) * askel,
      lat: (a.lat + b.lat) / 2 - (dx / pit) * askel,
    };
    if (!sisalla(koe) || pala.length < 6) return [];
    const ehdokkaat = [kavele(pala, true), kavele(pala, false)]
      .filter((rg) => sisassa(rg, koe) && ala(rg) < W * H * 0.9)
      .sort((x, y) => ala(x) - ala(y));
    return ehdokkaat.length ? [ehdokkaat[0]] : [];
  });
  return { renkaat, saaret };
}

/**
 * Rajauksen kuvasuhde: leveys yhtä korkeusyksikköä kohden.
 *
 * Leveyspiirin venytys keskileveydellä — sama tasavälinen projektio
 * kuin sijaintikartoissa, joten prosenttiasemointi pysyy suorana.
 */
function kuvasuhde(rajat) {
  const venytys = 1 / Math.cos(((rajat.pohjoinen + rajat.etela) / 2) * (Math.PI / 180));
  return (rajat.ita - rajat.lansi) / ((rajat.pohjoinen - rajat.etela) * venytys);
}

/**
 * Kokoaa piirtokerrokset elementeistä annetulla koordinaattimuunnoksella.
 *
 * Muunnos on parametri, koska sama koodi piirtää sekä pääkartan että
 * kainalokartat — kainalossa vain x ja y osoittavat pieneen ruutuun
 * pääkuvan sisällä.
 */
function kokoaKerrokset(elementit, x, y, rajat, meri = false) {
  const pisteet = (geom) => geom.map((p) => `${x(p.lon)},${y(p.lat)}`).join(' ');
  const kerrokset = {
    meri: [], saaret: [], puistot: [], vedet: [], joet: [], radat: [], kadut: KADUT.map(() => []),
  };
  const rantaviivat = [];
  const laatikonAla = (rajat.ita - rajat.lansi) * (rajat.pohjoinen - rajat.etela);
  for (const e of elementit) {
    /*
     * Vesirelaatio TÄYTETÄÄN, ei piirretä nauhana. Aiemmin jäsenpolut
     * työnnettiin joet-listaan, jolloin Marseillen Vanhasatama —
     * relaatio 10793156 — piirtyi ontoksi suorakaiteeksi keskelle
     * kaupunkia. Ulkorenkaat ketjutetaan jäsenpoluista; suunnalla ei
     * ole väliä, joten yleiskäyttöinen ketjuta riittää.
     *
     * VAROITUS: tämä haara olettaa relaation olevan VESI, koska
     * kysely hakee vain relation["natural"="water"]. Jos joku lisää
     * kyselyyn puisto- tai metsärelaatioita, ne täyttyisivät vetenä.
     * Lisää silloin tagitarkistus tähän.
     */
    if (e.type === 'relation') {
      const ulko = (e.members ?? [])
        .filter((m) => m.type === 'way' && m.geometry?.length && m.role !== 'inner')
        .map((m) => m.geometry);
      for (const rengas of ketjuta(ulko)) {
        if (rengas.length < 4) continue;
        /*
         * VAIN PIENET ALTAAT TÄYTETÄÄN. Iso vesirelaatio on
         * ympäröivä vesistö, jonka SISÄLLÄ kartta on — ja koska
         * työkalulla ei ole maa-alueita, täyttö peittäisi kaupungin.
         * Venetsiassa kävi juuri niin: laguuni on yksi relaatio, ja
         * täytettynä koko kuva muuttui vedeksi. Marseillen
         * Vanhasatama on 3 % rajauksesta ja täyttyy oikein.
         */
        if (renkaanAla(rengas) > laatikonAla * 0.3) {
          for (const geom of ulko) kerrokset.joet.push(`<polyline points="${pisteet(geom)}"/>`);
          break;
        }
        kerrokset.vedet.push(`<polygon points="${pisteet(rengas)}"/>`);
      }
      continue;
    }
    if (e.type !== 'way' || !e.geometry?.length) continue;
    const t = e.tags ?? {};
    if (t.highway) {
      const i = KADUT.findIndex((k) => k.luokat.includes(t.highway));
      if (i >= 0) kerrokset.kadut[i].push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.waterway) {
      kerrokset.joet.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.natural === 'coastline') {
      // Kerätään talteen; meri täytetään näistä alempana.
      rantaviivat.push(e.geometry);
    } else if (t.natural === 'water') {
      kerrokset.vedet.push(`<polygon points="${pisteet(e.geometry)}"/>`);
    } else if (t.railway) {
      kerrokset.radat.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else {
      kerrokset.puistot.push(`<polygon points="${pisteet(e.geometry)}"/>`);
    }
  }

  /*
   * MERI ON KAUPUNKIKOHTAISESTI VALITTAVA (meri: true), eikä se ole
   * oletuksena päällä. Syy on kova ja mitattu: Venetsiassa täyttö
   * peitti KOKO KAUPUNGIN vedellä. Laguunissa rantaviiva pilkkoutuu
   * kymmeniksi pätkiksi, joista osa sulkeutuu väärin päin, ja
   * lopputulos oli kartta jossa saaret olivat meren alla.
   *
   * Luulin ensin, että tyhjään tulokseen peräytyminen riittäisi
   * turvaksi. Ei riitä: peräännytys laukeaa vain kun renkaita ei
   * synny lainkaan, ei silloin kun ne ovat vääriä. Geometrinen
   * heuristiikka, joka voi kääntää maan ja meren päikseen, ei kuulu
   * oletukseksi — se kuuluu valinnaksi, jonka tekijä on katsonut.
   *
   * Toinen vahti on pinta-ala: jos renkaat peittävät yli 85 %
   * rajauksesta, jotain meni pieleen ja piirretään vanha rantanauha.
   * Kaupunkia ei ole, jossa meri veisi niin paljon ja kartta olisi
   * silti mielekäs.
   *
   * Vanha nauha ei ole hätäratkaisu vaan pelin oma kartankieli:
   * pääkartalla meri on rantaa myötäilevä viiva (.sea-echo, sama sävy
   * #b99a68). Kapeille salmille se riittää yhä, ja juuri niin
   * Tukholma piirrettiin ennen.
   */
  if (rantaviivat.length) {
    const nauhaksi = () => {
      for (const geom of rantaviivat) kerrokset.joet.push(`<polyline points="${pisteet(geom)}"/>`);
    };
    if (!meri) {
      nauhaksi();
    } else {
      const { renkaat, saaret } = merenTaytto(ketjutaSuunnassa(rantaviivat), rajat);
      const pintaAla = renkaat.reduce((summa, rengas) => summa + renkaanAla(rengas), 0);
      if (!renkaat.length || pintaAla > laatikonAla * 0.85) {
        if (renkaat.length) {
          console.log(`  VAROITUS: meri peittäisi ${Math.round((pintaAla / laatikonAla) * 100)} %`
            + ' rajauksesta — piirretään rantanauha. Tarkista rajaus.');
        }
        nauhaksi();
      } else {
        for (const rengas of renkaat) kerrokset.meri.push(`<polygon points="${pisteet(rengas)}"/>`);
        for (const saari of saaret) kerrokset.saaret.push(`<polygon points="${pisteet(saari)}"/>`);
      }
    }
  }
  return kerrokset;
}

/**
 * Kerrokset SVG-ryhmiksi. `mitta` skaalaa viivanleveydet: kainalossa
 * on pienempi mittakaava, joten samat pikselileveydet tekisivät siitä
 * mustan mötkön.
 */
function kerrosKuvaus(kerrokset, mitta = 1) {
  const v = (n) => (n * mitta).toFixed(2);
  const katuryhmat = KADUT.map((k, i) => `<g fill="none" stroke="${k.vari}" stroke-width="${v(k.leveys)}"
    stroke-linecap="round" stroke-linejoin="round">${kerrokset.kadut[i].join('')}</g>`).join('\n');
  return `
  <!-- Meri pohjimmaiseksi, saaret sen päälle: saaren ranta on
       rantaviivan sisärengas, ja ilman tätä järjestystä luodot
       katoaisivat veden alle. -->
  <g fill="${VESI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.meri.join('')}</g>
  <g fill="${PAPERI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.saaret.join('')}</g>
  <g fill="${PUISTO}" stroke="none">${kerrokset.puistot.join('')}</g>
  <!-- Joen reunaviiva: leveämpi tumma veto alle, vesi päälle — jokeen
       tulee sama ohut ranta kuin vesialtaiden stroke-reunaan. -->
  <g fill="none" stroke="${VESIREUNA}" stroke-width="${v(16.4)}" stroke-linecap="round"
     stroke-linejoin="round" opacity="0.55">${kerrokset.joet.join('')}</g>
  <g fill="none" stroke="${VESI}" stroke-width="${v(14)}" stroke-linecap="round"
     stroke-linejoin="round">${kerrokset.joet.join('')}</g>
  <g fill="${VESI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.vedet.join('')}</g>
  <g fill="none" stroke="${RATA}" stroke-width="${v(1.4)}" stroke-dasharray="${v(7)} ${v(5)}">${kerrokset.radat.join('')}</g>
  ${katuryhmat}`;
}

/*
 * KAINALOKARTTA (omistajan ratkaisu 9.8.2026: "Liian laajoissa
 * kartoissa voisi tehdä pienen kainalon kartan siihen kohtaa missä ei
 * ole tärkeää ja laittaa minikartan kaukokohteen kera siihen").
 *
 * Ongelma oli tämä: kun lehdessä mainittu kohde on 4 km keskustasta,
 * sen mukaan ottaminen levittää rajauksen katupuuroksi ja työntää
 * kaupungin oman juonen — joen, rannan, kanavakehän — kuvan laitaan.
 * Wienin Schönbrunn ja Budapestin Sankarien aukio jäivät tästä syystä
 * ensin kokonaan pois.
 *
 * Kainalo on oma tiukka rajaus kaukokohteen ympäriltä, piirrettynä
 * pääkuvan tyhjään kulmaan omine kehyksineen. Kohde numeroidaan samaan
 * sarjaan pääkartan kanssa, ja koska karttapiste() osaa sijoittaa sen
 * (ks. maakartat.js), se on pelissä napautettava kuten muutkin.
 *
 * Sijainti (x, y, leveys) annetaan prosentteina pääkuvasta. KORKEUTTA
 * EI ANNETA vaan se lasketaan kainalon omasta kuvasuhteesta — muuten
 * minikartta venyisi ja sen kadut valehtelisivat.
 */
function piirraKainalo(kainalo, elementit, W, H) {
  const x0 = (kainalo.x / 100) * W;
  const y0 = (kainalo.y / 100) * H;
  const w = (kainalo.leveys / 100) * W;
  const h = w / kuvasuhde(kainalo.rajat);
  const r = kainalo.rajat;
  const x = (lon) => (x0 + ((lon - r.lansi) / (r.ita - r.lansi)) * w).toFixed(1);
  const y = (lat) => (y0 + ((r.pohjoinen - lat) / (r.pohjoinen - r.etela)) * h).toFixed(1);
  // Viivat kainalon mittakaavaan: sama suhde kuin ruudun leveys
  // pääkuvan leveyteen, pohjalla 0,45 jottei kaikki katoa.
  const mitta = Math.max(0.45, w / W);
  const kerrokset = kokoaKerrokset(elementit, x, y, kainalo.rajat, kainalo.meri);
  const tunnus = `kainalo${Math.round(x0)}_${Math.round(y0)}`;
  /*
   * Suuntamerkinnän koko on mitattu eikä arvattu. Lehti näyttää kuvan
   * palstan levyisenä, eli puhelimessa noin 360 CSS-pikselinä, joten
   * 1600 pikselin kuva kutistuu suhteessa 0,22. Ensimmäinen versio
   * käytti kokoa W/80 = 20 px, mikä on ruudulla 4,5 px — se ei ole
   * pieni vaan näkymätön. W/35 antaa noin 10 CSS-pikseliä, joka on
   * luettavissa. Siksi myös teksti pidetään lyhyenä ("4 km
   * lounaaseen"): kohteen nimi on joka tapauksessa kartan alla
   * selitelistassa, jossa se on aina luettava.
   */
  const koko = Math.round(W / 35);
  /*
   * Teksti ruudun ylle, paitsi jos ruutu on liian lähellä ylälaitaa —
   * silloin se leikkautuisi kuvan reunaan. Budapestissa kävi juuri
   * niin: kainalo on 3 %:n korkeudella, ja "3 km koilliseen" jäi
   * puoliksi kuvan ulkopuolelle. Alapuolella tilaa on aina, koska
   * ruutu ei ulotu kuvan alareunaan asti.
   */
  const ylla = y0 > koko * 1.4;
  const tekstiY = ylla ? y0 - 12 : y0 + h + koko;
  const teksti = kainalo.suunta
    ? `<text x="${(x0 + w / 2).toFixed(1)}" y="${tekstiY.toFixed(1)}" text-anchor="middle"
        font-family="Georgia, serif" font-size="${koko}" fill="#8a7654">${kainalo.suunta}</text>`
    : '';
  return `
  <clipPath id="${tunnus}"><rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}"
    width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="6"/></clipPath>
  <rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"
    rx="6" fill="${PAPERI}"/>
  <g clip-path="url(#${tunnus})">${kerrosKuvaus(kerrokset, mitta)}</g>
  <rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"
    rx="6" fill="none" stroke="${VESIREUNA}" stroke-width="2.5"/>
  ${teksti}`;
}

function piirra(kaupunki, elementit, kainaloAineistot = []) {
  const { rajat, kainalot = [], meri = false } = KAUPUNGIT[kaupunki];
  const W = 1600;
  const H = Math.round(W / kuvasuhde(rajat));
  const x = (lon) => (((lon - rajat.lansi) / (rajat.ita - rajat.lansi)) * W).toFixed(1);
  const y = (lat) => (((rajat.pohjoinen - lat) / (rajat.pohjoinen - rajat.etela)) * H).toFixed(1);
  const kerrokset = kokoaKerrokset(elementit, x, y, rajat, meri);
  const kainaloKuvat = kainalot
    .map((k, i) => piirraKainalo(k, kainaloAineistot[i] ?? [], W, H)).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPERI}"/>
  ${kerrosKuvaus(kerrokset)}
  ${kainaloKuvat}
</svg>`;
}

const kaupunki = process.argv[2];
if (!KAUPUNGIT[kaupunki]) {
  console.error(`Anna kaupunki: ${Object.keys(KAUPUNGIT).join(', ')}`);
  process.exit(1);
}
console.log('Haetaan OpenStreetMap-aineisto (Overpass)…');
const elementit = await haeOverpassSitkeasti(KAUPUNGIT[kaupunki].rajat);
console.log(`${elementit.length} elementtiä.`);
/*
 * Kainalot haetaan omina kyselyinään ja TAUON TAKAA: Overpass
 * rate-limittaa peräkkäiset ajot, ja kolmen kaupungin erässä se
 * kaatoi ajon kerran jo ilman kainaloita.
 */
const kainaloAineistot = [];
for (const [i, kainalo] of (KAUPUNGIT[kaupunki].kainalot ?? []).entries()) {
  await new Promise((r) => setTimeout(r, 4000));
  console.log(`Haetaan kainalo ${i + 1}…`);
  const osat = await haeOverpassSitkeasti(kainalo.rajat);
  console.log(`  ${osat.length} elementtiä.`);
  kainaloAineistot.push(osat);
}
const svg = piirra(kaupunki, elementit, kainaloAineistot);
mkdirSync(resolve(JUURI, 'assets/kartat'), { recursive: true });
const svgPolku = resolve(JUURI, `assets/kartat/${kaupunki}-keskusta.svg`);
writeFileSync(svgPolku, svg);
// Rasterointi PNG:ksi pelin Chromiumilla: SVG:n koko katuverkko on
// selaimelle raskas joka avauksella — PNG piirtyy heti.
const pngPolku = resolve(JUURI, `assets/kartat/${kaupunki}-keskusta.png`);
const skripti = `
const { chromium } = require('playwright');
(async () => {
  const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
  const sivu = await (await selain.newContext({ viewport: { width: 10, height: 10 } })).newPage();
  await sivu.goto('file://${svgPolku}');
  const koko = await sivu.evaluate(() => {
    const s = document.querySelector('svg');
    return { w: Number(s.getAttribute('width')), h: Number(s.getAttribute('height')) };
  });
  await sivu.setViewportSize({ width: koko.w, height: koko.h });
  await sivu.screenshot({ path: '${pngPolku}' });
  await selain.close();
})();`;
/*
 * NODE_PATH mukaan, koska playwright ei ole pelin riippuvuus vaan
 * ympäristön: kontissa se on /opt/node22/lib/node_modules. Ilman tätä
 * rasterointi kaatui "Cannot find module 'playwright-core'" -virheeseen
 * vasta SVG:n valmistuttua, eli työ oli jo tehty kun se kaatui.
 */
execFileSync('node', ['-e', skripti], {
  cwd: JUURI,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_PATH: [process.env.NODE_PATH, '/opt/node22/lib/node_modules']
      .filter(Boolean).join(':'),
  },
});
const rajat = KAUPUNGIT[kaupunki].rajat;
console.log(`Valmis: assets/kartat/${kaupunki}-keskusta.png`);
console.log('KAUPUNKIKARTAT-rivit:');
console.log(`    polku: 'assets/kartat/${kaupunki}-keskusta.png',`);
console.log(`    lahde: '© OpenStreetMap-tekijät (ODbL)',`);
console.log(`    rajat: { pohjoinen: ${rajat.pohjoinen}, etela: ${rajat.etela}, lansi: ${rajat.lansi}, ita: ${rajat.ita} },`);
/*
 * Kainalon KORKEUS lasketaan tässä eikä kirjoiteta käsin: peli tarvitsee
 * sen asemoidakseen kainalon kohteet, ja jos luku poikkeaisi piirretystä,
 * numero osuisi eri kohtaan kuin kartta. Yksi laskenta, kaksi käyttäjää.
 */
const kainalot = KAUPUNGIT[kaupunki].kainalot ?? [];
if (kainalot.length) {
  console.log('    kainalot: [');
  for (const k of kainalot) {
    const korkeus = +((k.leveys * kuvasuhde(rajat)) / kuvasuhde(k.rajat)).toFixed(2);
    console.log(`      { rajat: { pohjoinen: ${k.rajat.pohjoinen}, etela: ${k.rajat.etela},`
      + ` lansi: ${k.rajat.lansi}, ita: ${k.rajat.ita} },`);
    console.log(`        x: ${k.x}, y: ${k.y}, leveys: ${k.leveys}, korkeus: ${korkeus} },`);
  }
  console.log('    ],');
}
