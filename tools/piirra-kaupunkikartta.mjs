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
    rajat: { pohjoinen: 59.342, etela: 59.313, lansi: 18.03, ita: 18.11 },
  },
  venetsia: {
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
function kokoaKerrokset(elementit, x, y) {
  const pisteet = (geom) => geom.map((p) => `${x(p.lon)},${y(p.lat)}`).join(' ');
  const kerrokset = { puistot: [], vedet: [], joet: [], radat: [], kadut: KADUT.map(() => []) };
  for (const e of elementit) {
    /*
     * Vesirelaation jäsenpolut piirretään samana rantanauhana kuin
     * rantaviiva: monikulmion kokoaminen ulko- ja sisärenkaineen olisi
     * paljon työtä siitä, mikä tässä tyylissä näkyy vain reunana.
     * Sisärenkaat (saaret järvessä) ovat sama nauha, ja se on oikein —
     * saaren ranta on ranta.
     */
    if (e.type === 'relation') {
      for (const jasen of e.members ?? []) {
        if (jasen.type === 'way' && jasen.geometry?.length) {
          kerrokset.joet.push(`<polyline points="${pisteet(jasen.geometry)}"/>`);
        }
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
      /*
       * Meri on OSM:ssä rantaviiva, ei vesialue: avomerta ei ole
       * piirretty minkään monikulmion sisään, vaan maa on rantaviivan
       * vasemmalla puolella. Sen täyttäminen vaatisi renkaiden
       * kokoamisen rajauslaatikkoa vasten, ja saaristossa siitä tulee
       * herkkä. Siksi rantaviiva piirretään SAMOIN KUIN JOKI: leveänä
       * vesivetona rannan myötäisesti.
       *
       * Se ei ole hätäratkaisu vaan pelin oma kartankieli — pääkartalla
       * meri on juuri tällainen rantaa myötäilevä viiva (.sea-echo,
       * sama sävy #b99a68). Ilman tätä Tukholma piirtyi kaupungiksi,
       * jonka keskellä on tyhjiä peltoja: Riddarfjärden ja Saltsjön
       * ovat rantaviivaa, joten ne jäivät paperin värisiksi.
       *
       * Mitta: veto on 14 px, ja 1600 px:n kuvassa se on Tukholman
       * rajauksella noin 40 metriä. Kapeimmatkin salmet (Strömmen,
       * noin 200 m) pysyvät siis auki.
       */
      kerrokset.joet.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.natural === 'water') {
      kerrokset.vedet.push(`<polygon points="${pisteet(e.geometry)}"/>`);
    } else if (t.railway) {
      kerrokset.radat.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else {
      kerrokset.puistot.push(`<polygon points="${pisteet(e.geometry)}"/>`);
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
  const kerrokset = kokoaKerrokset(elementit, x, y);
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
  const { rajat, kainalot = [] } = KAUPUNGIT[kaupunki];
  const W = 1600;
  const H = Math.round(W / kuvasuhde(rajat));
  const x = (lon) => (((lon - rajat.lansi) / (rajat.ita - rajat.lansi)) * W).toFixed(1);
  const y = (lat) => (((rajat.pohjoinen - lat) / (rajat.pohjoinen - rajat.etela)) * H).toFixed(1);
  const kerrokset = kokoaKerrokset(elementit, x, y);
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
