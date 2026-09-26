/*
 * SVEITSIN HAHMOTELMANOSTOT — Sveitsin kahdeksantoista pääkartan
 * karttamerkin ja kahdeksan maastokohteen (js/packs/maastokohteet-che.js
 * K2-erä) jälkeen tässä on 13 uutta, käsin kirjoitettua nostoa samalla
 * mallilla kuin muiden EU-/Euroopan-maiden hahmotelmapakit (esim.
 * js/packs/hahmotelma-svn.js, js/packs/hahmotelma-rou.js): jokaisella
 * nostolla on valmis sisältö — `teksti` 3–5 virkettä en-Wikipedian
 * artikkelista omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä
 * faktoja, `lahde`-riville artikkeli, osiot ja tarkistuspäivä), 1873-
 * näkökulman `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset`
 * ja vähintään kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public
 * domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu
 * kirjattuna, jokaisen kuvan tiedot luettu Commonsin extmetadata-
 * rajapinnasta; kuvatekstit ilman lähdeviittauksia lukijalle). Viidellä
 * nostolla on lisäksi `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea
 * indeksi, fakta) täsmälleen kuten kaupunkien täkynostoilla
 * (js/fokusnosto.js nostonVisa): vastaus löytyy noston omasta tekstistä.
 *
 * MIKSI JUURI NÄMÄ KOHTEET. Aiemmat 16 pääkartan hahmotelmaa (Sveitsin
 * korkeimmat huiput, joet, sillat, kirjasto, linna, tunneli, sola,
 * kellotorni, kellonvalmistuskaupunki, juustokylä, Rütli-niitty,
 * viadukti, putous) eivät kata suuria kaupunkeja, italiankielistä
 * Ticinoa, Graubündenin vuoristokyliä eivätkä laajemmin ruoka- tai
 * tekniikkaperinnettä. Uudet 13 täydentävät näitä aitoja aukkoja:
 * Geneve ja Zürich (kaupungit), Lavaux, Vevey ja Emmental
 * (ruokakulttuuri — suklaa, juusto), CERN, Basel ja Grande
 * Dixence (tekniikka), Lugano (Ticino) ja Fribourg (kielirajakaupunki),
 * St. Moritz ja Scuol (Graubündenin vuoristokylät, talvimatkailu ja
 * romantsin kieli), Aletschin jäätikkö (Alppien suurin jäätikkö).
 * Yksikään uusi id, nimi tai sijainti ei toista 16 vanhan nostoin
 * joukkoa (tools/tarkista-nimiolimitys.mjs ajettu, ei limityksiä).
 *
 * KYTKENTÄ OLI BLOKATTU 21.9.2026 (AUT/bregenzin-jarvinayttamo +
 * DEU/bodensee -nimiörypäs, ks. Raamatun loki) — Karttaseppä siirsi
 * DEU/Bodensee-nimiön (haara karttaseppa-bodensee, mergetty
 * v1973-prepiin 21.9.2026), ja `KOHDE_MAAT.CHE` on nyt liitetty
 * js/fokuskohteet.js:ään.
 *
 * Neljäs ruokakohde, Appenzell (9.41 E / 47.33 N), kirjoitettiin ja
 * kuvitettiin alunperin mutta poistettiin tästä tiedostosta kokonaan
 * 21.9.2026, koska se on maantieteellisesti ihan tämän saman kulman
 * päällä (kantoninsa sisällä ei ollut riittävästi tilaa siirtoon); kolme
 * muuta ruokakohdetta (Lavaux, Vevey, Emmental) riittävät ruoka-tyypin
 * edustukseen, joten tavoite on 29/30 riippumatta yllä olevasta
 * kytkentäblokista.
 *
 * VUOSI 1873. Sveitsi on liittovaltio vuodesta 1848, ja uusi
 * liittovaltiollinen perustuslaki on hyväksytty juuri 1874 — siis
 * hieman noston oman ajan jälkeen. Osa kohteista on 1873 vielä
 * kaukana tulevaisuudessa (CERN, Grande Dixence, useimmat St.
 * Moritzin talvi-urheilun "ensimmäiset"), ja `nappi` sanoo sen
 * rehellisesti. Yksi kohde, Baselin väriteollisuus, osuu kirjaimel-
 * lisesti samaan vuoteen: Alexander Clavel myi värjäämönsä
 * Bindschedlerille ja Buschille vain viikkoja ennen kuolemaansa
 * 22.2.1873.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `che-nosto-<id>-<8 hex sha256>.jpg`, ja osoite
 * on kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ja niiden JSON-metadata (osoite, lyhyt, selite,
 * lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl per kuva) ovat
 * kansiossa /Users/samireivinen/Matkakirja-nostot-kuvat/che/ (kuvat
 * juuressa, metadata _json/-alikansiossa yksi tiedosto per nosto-id).
 *
 * === REITTI (KOHDE_MAAT) — KESKENERÄINEN, EI VIELÄ KYTKETTY ==========
 *
 * Toisin kuin hahmotelma-svn.js ja hahmotelma-rou.js, tätä pakkia EI
 * ole vielä liitetty js/fokuskohteet.js:n KOHDE_MAAT-tauluun: sitä
 * varten tarvittaisiin `import { HAHMOTELMA_CHE } from
 * './packs/hahmotelma-che.js';` sekä rivi
 * `KOHDE_MAAT.CHE = [...(KOHDE_MAAT.CHE ?? []), ...HAHMOTELMA_CHE];`
 * js/fokuskohteet.js:ään. Tämä erä on rajattu sisällöntuotantoon
 * (tools/tarkista-nimiolimitys.mjs ja tests/*.test.mjs kattavat vain
 * sen, mikä on jo tiedostoissa), ja js/fokuskohteet.js on rinnakkaisten
 * erien jaettu tiedosto — kytkentä jätetään seuraavalle sessiolle, joka
 * ei aja päällekkäin toisen erän kanssa. Peli ei näe eroa kytkennän
 * jälkeen: js/fokuskohteet.js liittää nämä maan omaan listaan täsmälleen
 * kuten muidenkin hahmotelmapakkien kohteet.
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 21.9.2026) ja artikkelin
 * nimi on kirjattu rivin viereen. Laudan luvut on laskettu pelin
 * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin
 * lieriö ja europe-tasaväli). Jokainen rivi osuu Sveitsin fokuslehden
 * rajaukseen (`osuuLehteen`) ja CHE-renkaan sisään.
 */

/** Sveitsin hahmotelmanostot: sisällölliset kohteet. */
import { EUROOPAN_KADONNEET } from './monumentit-eurooppa.js';

export const HAHMOTELMA_CHE = [
  ...EUROOPAN_KADONNEET.CHE,
  {
    id: 'hahmotelma-geneve',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-geneve-82bd17ed.jpg',
      lyhyt: 'Geneven suihkulähde nousee järveltä korkealle, taustalla kaupungin ranta.',
      selite: 'Genevenjärven yllä kohoava vesisuihku näkyy kauas, ja rannalla kaupungin talot ja purjeveneet piirtyvät vuorten taustaa vasten.',
      lahde: 'Valokuva: Ank Kumar, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ank Kumar',
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Jet_d'eau,_Lake_Geneva_(Ank_Kumar)_02.jpg",
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-geneve-71aa6053.jpg',
        lyhyt: 'Matkustajavene ylittää Genevenjärveä auringonlaskun aikaan.',
        selite: 'Keltainen lauttavene kulkee hiljaisella järvellä, taustalla Geneven vanhakaupunki ja katedraalin torni siluettina.',
        lahde: 'Valokuva: Schnäggli, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Schnäggli',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mouette_genevoise_et_rade.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Geneve',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Miksi Geneveä kutsutaan rauhan pääkaupungiksi?',
      'Mitä Genevessä sovittiin vuonna 1864?',
    ],
    korostukset: ['Henry Dunant|Henry Dunantin', 'Punainen Risti|Punaisen Ristin'],
    nappi: 'Kansainliitto syntyy vasta maailmansodan jälkeen; Punainen Risti on juuri aloittanut',
    // 6.1469 E / 46.2017 N — en-Wikipedia "Geneva"
    laudat: {
      maailmankartta: { x: 6038.2, y: 1552 },
      europe: { x: 329.2, y: 678.5 },
    },
    teksti: 'Geneve sijaitsee Sveitsin lounaiskulmassa siinä kohdassa, jossa Rhône-joki virtaa ulos '
      + 'Genevenjärvestä, ja on ranskankielisen Romandian väkirikkain kaupunki. Roomalaiset valtasivat '
      + 'sen allobrogien rajakaupunkina vuonna 121 eaa., ja keskiajalla siitä kasvoi itsehallinnollinen '
      + 'piispankaupunki. Genevestä on tullut kansainvälisen diplomatian keskus: Henry Dunantin '
      + 'perustaman Punaisen Ristin toiminta alkoi juuri täällä, ja vuonna 1864 allekirjoitettiin '
      + 'ensimmäinen Geneven sopimus sodan haavoittuneiden suojelemiseksi. Myöhemmin, ensimmäisen '
      + 'maailmansodan jälkeen, Genevestä tulee myös Kansainliiton kotikaupunki.',
    lahde: 'en-Wikipedia "Geneva", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna solmittiin ensimmäinen Geneven sopimus sodan uhrien suojelusta?',
      vaihtoehdot: ['1848', '1864', '1899', '1920'],
      oikea: 1,
      fakta: 'Geneven sopimusten sarja on kasvanut siitä lähtien: viimeisin merkittävä laajennus '
        + 'tehtiin vuonna 1949, toisen maailmansodan jälkeen.',
    },
  },
  {
    id: 'hahmotelma-lavaux',
    nimio: 'Lavaux',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-lavaux-cdc09343.jpg',
      lyhyt: "Lavaux'n viinitarhapenkereet kiertyvät rinteessä Genevenjärven yllä.",
      selite: 'Terassoidut viinitarhat laskeutuvat jyrkkää rinnettä kohti sinistä järveä, ja etäällä siintävät Alppien lumihuiput.',
      lahde: 'Valokuva: Theo Baracchini, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Theo Baracchini',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vine_Terraces_of_Lavaux_and_the_Leman_lake_in_Switzerland.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-lavaux-c80baa9e.jpg',
        lyhyt: 'Kivimuurein tuetut viinipenkereet St-Saphorinin kylän lähellä.',
        selite: 'Rivissä kasvavat viiniköynnökset seuraavat rinteen muotoa, ja alempana järven rannalla näkyy pieni kylä.',
        lahde: 'Valokuva: JoachimKohler-HB, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'JoachimKohler-HB',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Terrassierte_Weinbau_bei_St-Saphorin,_Kanton_Waadt_(2013).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: "Lavaux'n viinitarhat",
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Ketkä raivasivat Lavaux\'n ensimmäiset viinipenkereet?',
      'Mikä rypälelajike on alueen tärkein?',
    ],
    korostukset: ['chasselas|chasselas'],
    nappi: 'Penkereet ovat jo lähes 800 vuotta vanhat; Unescon maailmanperintöasema tulee vasta 2000-luvulla',
    // 6.7461 E / 46.4919 N — en-Wikipedia "Lavaux"
    laudat: {
      maailmankartta: { x: 6058.2, y: 1539.8 },
      europe: { x: 340.7, y: 670.9 },
    },
    teksti: 'Lavaux on viinitarhojen alue Genevenjärven pohjoisrannalla Vaudin kantonissa, ja sen '
      + 'kivetyt penkereet kiertyvät noin 30 kilometrin matkalla järven yllä. Penkereiden raivaaminen '
      + 'alkoi jo 1000-luvulla benediktiini- ja sistersiläismunkkien toimesta, joten viininviljelyllä '
      + 'on takanaan jo lähes 800 vuotta historiaa. Alueen tärkein rypälelajike on chasselas, joka '
      + 'antaa nimensä myös monille paikallisille valkoviineille. Penkereiltä avautuu näkymä järven '
      + 'yli Savoijin vuorille, ja kylät kuten Saint-Saphorin ja Epesses ovat pysyneet lähes '
      + 'muuttumattomina satojen vuosien ajan.',
    lahde: 'en-Wikipedia "Lavaux", johdanto-osa ja osio "Description" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-cern',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-cern-554c3242.jpg',
      lyhyt: 'CERNin puinen kupolirakennus, Tiede- ja innovaatiopallo.',
      selite: 'Pyöreä, ohuista puusäleistä koottu rakennus kohoaa tasangolla, edustalla pieni huoltoauto.',
      lahde: 'Valokuva: Adam Nieman, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Adam Nieman',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:CERN_Globe_of_Science_and_Innovation.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-cern-b90eb388.jpg',
        lyhyt: 'Hiukkaskiihdyttimen maanalainen tunneli magneetteineen.',
        selite: 'Kaareva betonitunneli täynnä putkia ja kaapeleita johtaa kohti kiihdyttimen magneettiketjua.',
        lahde: 'Valokuva: Muriel, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Muriel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:LHC_tunnel_near_point_5.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'CERN',
    tyyppi: 'tekniikka',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Missä CERN sijaitsee?',
      'Mikä maailmanlaajuinen keksintö syntyi CERNin tarpeesta jakaa tietoa?',
    ],
    korostukset: ['Large Hadron Collider|Large Hadron Collider', 'World Wide Web|World Wide Web'],
    nappi: 'Perustamiseen on vielä 81 vuotta; atomin sisäistä rakennettakaan ei tunneta 1870-luvulla',
    // 6.0556 E / 46.233 N — en-Wikipedia "CERN"
    laudat: {
      maailmankartta: { x: 6035.2, y: 1550.7 },
      europe: { x: 327.5, y: 677.7 },
    },
    teksti: 'CERN eli Euroopan hiukkasfysiikan tutkimuskeskus toimii Meyrinissä, Geneven länsipuolella '
      + 'aivan Ranskan rajalla. Se on maailman suurin hiukkasfysiikan laboratorio, ja sen ydin on '
      + 'Large Hadron Collider, valtava maan alle louhittu rengasmainen hiukkaskiihdytin. CERNin '
      + 'tutkijat tarvitsivat 1980-luvun lopulla keinon jakaa tietoa eri puolilla maailmaa oleville '
      + 'kollegoilleen, ja tästä tarpeesta syntyi World Wide Web. Keskus perustettiin vuonna 1954 '
      + 'kahdentoista Länsi-Euroopan valtion sopimuksella.',
    lahde: 'en-Wikipedia "CERN", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna CERN perustettiin?',
      vaihtoehdot: ['1919', '1954', '1973', '1989'],
      oikea: 1,
      fakta: 'CERN on myös World Wide Webin syntypaikka: se kehitettiin alun perin tutkijoiden omaan '
        + 'tiedonjakoon 1980–1990-lukujen taitteessa.',
    },
  },
  {
    id: 'hahmotelma-fribourg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-fribourg-456bcf48.jpg',
      lyhyt: 'Fribourgin vanhakaupunki ja katedraalin torni Sarine-joen yllä.',
      selite: 'Talot kiipeävät jyrkkää kalliota joen rannalla, ja korkea goottilainen tornin huippu kohoaa niiden yläpuolelle.',
      lahde: 'Valokuva: JoachimKohler-HB, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JoachimKohler-HB',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Altstadt_Fribourg_mit_Kathedalenturm_und_Saane_(2019).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-fribourg-3c79ef4e.jpg',
        lyhyt: 'Sarine-joki virtaa Fribourgin läpi auringonlaskun aikaan.',
        selite: 'Joki mutkittelee metsäisessä rotkossa, ja etäällä siitä erottuu riippusilta hämärässä valossa.',
        lahde: 'Valokuva: E. Wassmer, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'E. Wassmer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sarine_sunset.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Fribourg',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka perusti Fribourgin ja minä vuonna?',
      'Mistä kahdesta sanasta kaupungin saksankielinen nimi Freiburg muodostuu?',
    ],
    korostukset: ['Berthold IV|Berthold IV', 'Sarine|Sarine-joen'],
    nappi: 'Kaupunki on jo yli 700-vuotias, ja kielirajalla eläminen on ollut arkea koko sen historian ajan',
    // 7.15 E / 46.8 N — en-Wikipedia "Fribourg"
    laudat: {
      maailmankartta: { x: 6071.7, y: 1526.9 },
      europe: { x: 348.5, y: 662.8 },
    },
    teksti: 'Fribourg, saksaksi Freiburg im Üechtland, sijaitsee Sarine-joen mutkassa kielirajalla '
      + 'saksankielisen ja ranskankielisen Sveitsin välissä. Zähringenin herttua Berthold IV perusti '
      + 'kaupungin vuonna 1157 kalliolle, jota joki suojaa kolmelta sivulta, ja nimi tulee saksan '
      + 'sanoista "vapaa" ja "linnoitus". Kaupunki siirtyi Kyburgin suvulle herttuakunnan sammuessa '
      + '1218 ja myytiin Habsburgeille 1277, ja jo 1300-luvulla se oli tunnettu kangas- ja '
      + 'nahkatuotannostaan ympäri Keski-Eurooppaa. Vanhakaupunki on säilynyt yhtenä Sveitsin '
      + 'parhaiten säilyneistä, ja sen kaduilla kuulee vieläkin sekä ranskaa että saksaa.',
    lahde: 'en-Wikipedia "Fribourg", johdanto-osa ja osio "Middle Ages" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-zurich',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-zurich-62a5e894.jpg',
      lyhyt: 'Zürichin vanhakaupunki Limmat-joen molemmin puolin.',
      selite: 'Joki virtaa kaupungin läpi, ja rannoilla kohoavat kirkontornit sekä tiiviisti rakennettu vanhakaupunki.',
      lahde: 'Valokuva: A. Tigelaar, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'A. Tigelaar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pano-Zurich-CityScape-FromGrossMunster-RiverSide.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-zurich-5c2d0a4b.jpg',
        lyhyt: 'Zürichin kaupunginmuseo ja Limmat-joki syksyisenä päivänä.',
        selite: 'Tornillinen linnamainen rakennus kohoaa joen rannalla puiden keskellä, taustalla vanhankaupungin kirkontorneja.',
        lahde: 'Valokuva: CEphoto, Uwe Aranas, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'CEphoto, Uwe Aranas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zürich_Switzerland-City-view-01.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Zürich',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Mikä oli Zürichin roomalaisaikainen nimi?',
      'Kuka johti Zürichin uskonpuhdistusta 1500-luvulla?',
    ],
    korostukset: ['Huldrych Zwingli|Huldrych Zwinglin', 'Limmat|Limmat-joki'],
    nappi: 'Zwinglin uskonpuhdistuksesta on kulunut jo yli 350 vuotta',
    // 8.5411 E / 47.3744 N — en-Wikipedia "Zurich"
    laudat: {
      maailmankartta: { x: 6118, y: 1502.7 },
      europe: { x: 375.2, y: 647.7 },
    },
    teksti: 'Zürich on Sveitsin suurin kaupunki ja Zürichin kantonin pääkaupunki, Zürichinjärven '
      + 'luoteiskärjessä. Roomalaiset perustivat paikalle tulliaseman nimeltä Turicum, ja keskiajalla '
      + 'kaupunki sai valtakunnanvälittömyyden erioikeuden Pyhän saksalais-roomalaisen keisarikunnan '
      + 'alaisuudessa. Vuonna 1519 Zürichistä tuli Huldrych Zwinglin johdolla yksi protestanttisen '
      + 'uskonpuhdistuksen tärkeimmistä keskuksista Euroopassa. Kaupungin halki virtaava Limmat-joki '
      + 'laskee Zürichinjärvestä, ja sen rannoilla sijaitsee torneineen vanhakaupunki.',
    lahde: 'en-Wikipedia "Zurich", johdanto-osa ja osio "Name" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-basel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-basel-34b3a00b.jpg',
      lyhyt: 'Baselin tuomiokirkko kohoaa Reinin yllä.',
      selite: 'Punaisen hiekkakiven kaksitorninen tuomiokirkko seisoo muurin päällä joen rantatörmällä.',
      lahde: 'Valokuva: Lucazzitto, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Lucazzitto',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basel_Cathedral_dominating_river_Rhine.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-basel-3af071fc.jpg',
        lyhyt: 'Baselin vanhakaupunki ja tuomiokirkko joen toiselta rannalta.',
        selite: 'Vanhankaupungin talot ja tuomiokirkon tornit kohoavat Reinin rannalla, pieni matkustajavene kulkee joella.',
        lahde: 'Valokuva: M.Strīķis, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'M.Strīķis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rhein,_Basel_Münster,_Basel,_Switzerland_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Basel',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä väriainetta Alexander Clavel alkoi valmistaa Baselissa vuonna 1859?',
      'Kenelle Clavel myi tehtaansa juuri ennen kuolemaansa?',
    ],
    korostukset: ['Alexander Clavel|Alexander Clavel', 'fuksiini|fuksiini-väriainetta'],
    nappi: 'Kauppa on solmittu vain muutama viikko sitten — Clavel itse kuoli 22. helmikuuta 1873',
    // 7.5906 E / 47.5547 N — en-Wikipedia "Alexander Clavel"
    laudat: {
      maailmankartta: { x: 6086.4, y: 1495.1 },
      europe: { x: 356.9, y: 642.9 },
    },
    teksti: 'Basel on Sveitsin kolmanneksi suurin kaupunki Reinin varrella, ja siitä kasvaa 1900-luvulla '
      + 'maan kemian- ja lääketeollisuuden keskus. Perusta on jo olemassa: silkinvärjääjä Alexander '
      + 'Clavel alkoi vuonna 1859 valmistaa Baselissa synteettistä fuksiini-väriainetta '
      + 'silkkinauhateollisuudelle, yhtenä ensimmäisistä koko Sveitsissä. Väriaineen valmistuksessa '
      + 'syntyneet arseenihuurut ajoivat tehtaan kaupungin laidalle Klybeckin Reininrantaan vuonna '
      + '1864. Vain viikkoja sitten, alkuvuodesta 1873, Clavel myi tehtaansa kemisti Robert '
      + 'Bindschedlerille ja liikemies Albert Buschille — kauppa, josta kasvaa vuosikymmenten '
      + 'kuluessa kemianjätti Ciba.',
    lahde: 'en-Wikipedia "Alexander Clavel", osio "Career" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Alexander Clavel alkoi valmistaa synteettistä fuksiini-väriainetta Baselissa?',
      vaihtoehdot: ['1848', '1859', '1873', '1884'],
      oikea: 1,
      fakta: 'Clavelin tehtaasta kasvoi vuosikymmenten kuluessa kemianjätti Ciba, joka yhdistyy '
        + '1900-luvun lopulla Sandoziin Novartisiksi.',
    },
  },
  {
    id: 'hahmotelma-emmental',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-emmental-5fdcc9ad.jpg',
      lyhyt: 'Emmentaler-juuston lohko suurine reikineen.',
      selite: 'Vaaleankeltaisessa juustopalassa näkyy useita erikokoisia pyöreitä reikiä.',
      lahde: 'Valokuva: Coyau, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Coyau',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Emmental_(fromage)_01.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-emmental-8a1b99ba.jpg',
        lyhyt: 'Juustomestari työskentelee kuparikattilan ääressä meijerissä.',
        selite: 'Kaksi suurta kuparista juustopataa täyttävät meijerin tilan, ja työntekijä säätää nostolaitetta niiden välissä.',
        lahde: 'Valokuva: GabrielleMerk, Wikimedia Commons (CC BY 4.0).',
        tekija: 'GabrielleMerk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Affoltern-Emmental-Dairy.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Emmental',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mistä kahdesta joesta Emmental-laakso koostuu?',
      'Kuka kuvasi emmentalilaista talonpoikaiselämää kirjoissaan?',
    ],
    korostukset: ['Jeremias Gotthelf|Jeremias Gotthelf', 'Emmentaler|Emmentaler-juusto'],
    nappi: 'Gotthelf on kuollut jo lähes 19 vuotta sitten, mutta hänen kirjansa elävät yhä',
    // 7.7632 E / 46.9849 N — en-Wikipedia "Emmental" ja "Emmental cheese"
    laudat: {
      maailmankartta: { x: 6092.1, y: 1519.2 },
      europe: { x: 360.3, y: 657.9 },
    },
    teksti: 'Emmental on kukkulainen laakso Bernin kantonissa, Emme- ja Ilfis-jokien varrella, ja sen '
      + 'tärkeimmät kylät ovat Burgdorf ja Langnau. Seutu elää pääasiassa maidontuotannosta, ja juuri '
      + 'täältä on kotoisin reikäinen Emmentaler-juusto, joka on levinnyt maailmalle sveitsiläisen '
      + 'juuston esikuvana. Pappi ja kirjailija Jeremias Gotthelf kuvasi 1800-luvun alkupuolella '
      + 'emmentalilaista talonpoikaiselämää romaaneissaan, ja hänen teoksensa tekivät laakson '
      + 'tunnetuksi kaukana kotikantonin ulkopuolella. Perinteiset emmentalilaiset maatalot tunnistaa '
      + 'niiden jyrkistä, lähes maahan asti ulottuvista kattokaarista.',
    lahde: 'en-Wikipedia "Emmental" ja "Emmental cheese", osiot "Culture" ja "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-lugano',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-lugano-3d4e721f.jpg',
      lyhyt: 'Luganonjärvi ja Monte San Salvatoren huippu.',
      selite: 'Matkustajalaiva risteilee järvellä, taustalla kohoaa teräväpiirteinen San Salvatoren vuori.',
      lahde: 'Valokuva: Visem, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Visem',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Lugano_in_Lugano_city_15.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-lugano-c1d834f0.jpg',
        lyhyt: 'Lugano ja sen järvi ylhäältä kuvattuna.',
        selite: 'Kaupunki levittäytyy järven rannalle vuorten väliin, pilvet peittävät taivaan.',
        lahde: 'Valokuva: Mateus2019, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Mateus2019',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:CHE_—_TI_—_Bezirk_Lugano_—_Stadt_Lugano_—_Sentiero_trona_54_(view_of_Lugano_and_its_lake_·_pano)_—_2024-05-14_Mattes.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Lugano',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minkä kahden mahtisuvun kanssa Lugano kiisteli ennen liittymistään Sveitsiin?',
      'Minä vuonna Ticinon kantoni perustettiin?',
    ],
    korostukset: ['San Salvatore|San Salvatore'],
    nappi: 'Gotthardin rautatie saapuu Luganoon vasta yhdeksän vuoden kuluttua, vuonna 1882',
    // 8.9525 E / 46.005 N — en-Wikipedia "Lugano"
    laudat: {
      maailmankartta: { x: 6131.8, y: 1560.2 },
      europe: { x: 383.1, y: 683.7 },
    },
    teksti: 'Lugano on Ticinon kantonin suurin kaupunki ja italiankielisen Sveitsin merkittävin '
      + 'keskus, Luganonjärven rannalla. Se mainitaan markkinapaikkana jo vuodesta 984, ja Comon '
      + 'ja Milanon ruhtinaat kiistelivät siitä vuosisatoja ennen kuin kaupunki liittyi vanhaan '
      + 'Sveitsin valaliittoon vuonna 1513. Ticinon kantoni perustettiin vasta vuonna 1803, ja '
      + 'Lugano sai oman poliittisen kunnallishallintonsa samana vuonna. Kaupungin ympärillä '
      + 'kohoavat jyrkät vuoret, muun muassa San Salvatore, ja katujen kieli on italia, vaikka '
      + 'Sveitsi muuten on saksan- ja ranskankielinen.',
    lahde: 'en-Wikipedia "Lugano", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-st-moritz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-st-moritz-0c451a9a.jpg',
      lyhyt: 'St. Moritzin järvi ja kylä vuorten keskellä.',
      selite: 'Kirkasvetinen järvi heijastaa ympäröiviä huippuja, ja kylän rakennukset kiipeävät rinnettä rannan yllä.',
      lahde: 'Valokuva: JoachimKohler-HB, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JoachimKohler-HB',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blick_über_den_Sankt_Moritzersee_auf_Sankt_Moritz.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-st-moritz-4cfa3f65.jpg',
        lyhyt: 'St. Moritzin järvi syksyisessä maisemassa.',
        selite: 'Keltaiset lehtikuuset reunustavat järveä, jonka toisella rannalla kylä levittäytyy vuorten juurelle.',
        lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Isiwal',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sankt_Moritz_Lake_Piz_Muragl.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'St. Moritz',
    tyyppi: 'urheilu',
    lahi: true,
    kysymykset: [
      'Minkä vedon Caspar Badrutt löi brittivieraidensa kanssa?',
      'Mihin vuosisataan St. Moritzin lähteille tehdyt pyhiinvaellukset juontavat?',
    ],
    korostukset: ['Caspar Badrutt|Caspar Badrutt', 'Paracelsus|Paracelsus'],
    nappi: 'Badruttin veto lyötiin vain yhdeksän vuotta sitten; sähkövalo, luistelu-EM ja bobikilpailut ovat vielä edessä',
    // 9.8378 E / 46.4972 N — en-Wikipedia "St. Moritz"
    laudat: {
      maailmankartta: { x: 6161.3, y: 1539.6 },
      europe: { x: 400.1, y: 670.7 },
    },
    teksti: 'St. Moritz on korkealla Ylä-Engadinissa sijaitseva kylpyläkylä, lähes 1 800 metrin '
      + 'korkeudessa Graubündenin kantonissa. Sen mineraalilähteille on tehty pyhiinvaelluksia jo '
      + 'keskiajalta asti, ja 1500-luvulla myös lääkäri Paracelsus vietti siellä aikaa. Talvimatkailu '
      + 'koko Alpeilla sai alkunsa juuri täältä syyskuussa 1864, kun hotelli-isäntä Caspar Badrutt '
      + 'löi vetoa neljän brittiläisen kesävieraansa kanssa: jos he eivät pitäisi kylästä talvella, '
      + 'hän maksaisi heidän matkakulunsa, mutta jos pitäisivät, he saisivat jäädä hänen vierainaan '
      + 'niin pitkäksi aikaa kuin halusivat. Vieraat ihastuivat, ja St. Moritzista tuli Alppien '
      + 'ensimmäinen talvikohde.',
    lahde: 'en-Wikipedia "St. Moritz", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Caspar Badrutt löi vetonsa brittiläisten kesävieraidensa kanssa?',
      vaihtoehdot: ['1864', '1878', '1889', '1928'],
      oikea: 0,
      fakta: 'St. Moritz isännöi myöhemmin kahdet talviolympialaiset, vuosina 1928 ja 1948.',
    },
  },
  {
    id: 'hahmotelma-scuol',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-scuol-099f5aba.jpg',
      lyhyt: 'Scuolin kylä ja kirkontorni vuorten juurella.',
      selite: 'Valkoiset ja harmaat talot ryhmittyvät kylän ympärille, ja niiden takana kohoaa teräväpiirteinen kirkontorni.',
      lahde: 'Valokuva: Manuel Schmalstieg, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Manuel Schmalstieg',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Scuol_(view_of_village).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-scuol-ab97ec61.jpg',
        lyhyt: 'Näkymä Scuoliin ja Silvretta-vuoriin tuntureilta.',
        selite: 'Laaksossa siintävä kylä ja pellot avautuvat vaeltajan edessä, taustalla kohoavat lumihuippuiset vuorenhuiput.',
        lahde: 'Valokuva: Whgler, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Whgler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blick_von_Chamanna_Lischana_auf_Scuol.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Scuol',
    tyyppi: 'sana',
    lahi: true,
    kysymykset: [
      'Mikä kieli on Scuolin virallinen kieli?',
      'Milloin Scuolin parantavia lähteitä alettiin käyttää laajemmin?',
    ],
    korostukset: ['romantsi|romantsi', 'vallader|valladeriksi'],
    nappi: 'Romantsista tulee kantonin virallinen kieli vasta seitsemän vuoden kuluttua, 1880',
    // 10.2833 E / 46.8 N — en-Wikipedia "Scuol" ja "Romansh language"
    laudat: {
      maailmankartta: { x: 6176.1, y: 1526.9 },
      europe: { x: 408.6, y: 662.8 },
    },
    teksti: 'Scuol on kylä Ala-Engadinissa Graubündenin kantonissa, ja sen virallinen kieli on '
      + 'retoromaani eli romantsi, latinasta polveutuva kieli, jota puhutaan enää tässä yhdessä '
      + 'sveitsiläiskantonissa. Kylän parantavia lähteitä on käytetty laajemmin vasta 1860-luvulta '
      + 'lähtien, ja kylpylämatkailu on juuri alkamassa. Romantsin kielelle on 1800-luvun '
      + 'puolivälissä syntynyt elvytysliike: vuonna 1860 kieli otettiin opetusaineeksi '
      + 'opettajaseminaariin, ja vuonna 1863 tehtiin ensimmäinen yritys perustaa yhteinen yhdistys '
      + 'kaikille romantsinkielisille alueille. Kieli jakautuu viiteen murteeseen, joiden puhujat '
      + 'eivät aina ymmärrä toisiaan, ja Scuolin ympäristössä puhuttua muotoa kutsutaan valladeriksi.',
    lahde: 'en-Wikipedia "Scuol" ja "Romansh language", osiot "History" ja "Revival" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-aletsch',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-aletsch-cecc8171.jpg',
      lyhyt: 'Aletschin jäätikkö virtaa laaksossa Bettmerhornilta nähtynä.',
      selite: 'Jäätikön harmaanvalkoinen massa kiemurtelee vuorten välissä kohti kaukaisia lumihuippuja.',
      lahde: 'Valokuva: Valo139, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Valo139',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aletschgletscher_-_Bettmerhorn_(valo139).JPEG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-aletsch-5a486040.jpg',
        lyhyt: 'Aletschin jäätikön pintaa moreeniviiruineen.',
        selite: 'Jäätikön pinnassa erottuu tummia pitkittäisiä moreenivöitä, taustalla lumipeitteisiä huippuja.',
        lahde: 'Valokuva: GabrielleMerk, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'GabrielleMerk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:AletschGlacier_Bettmerhorn.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Aletschin jäätikkö',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Kuinka monesta pienemmästä jäätiköstä Aletschin jäätikkö syntyy?',
      'Mikä joki saa alkunsa Aletschin jäätiköltä?',
    ],
    korostukset: ['Konkordiaplatz|Konkordiaplatzilla', 'Aletschhorn|Aletschhorn'],
    nappi: 'Jäätikkö on jo vetäytymässä, mutta Unescon maailmanperintöasema tulee vasta 2000-luvulla',
    // 8.0772 E / 46.4422 N — en-Wikipedia "Aletsch Glacier"
    laudat: {
      maailmankartta: { x: 6102.6, y: 1541.9 },
      europe: { x: 366.3, y: 672.2 },
    },
    teksti: 'Aletschin jäätikkö on Alppien suurin jäätikkö, noin 23 kilometriä pitkä ja lähes 82 '
      + 'neliökilometrin laajuinen, Berner Alpeilla Valais\'n kantonissa. Se syntyy neljän pienemmän '
      + 'jäätikön yhtyessä Konkordiaplatzilla, jossa jää on paksuimmillaan yli 900 metriä, ja jatkaa '
      + 'sieltä kohti Rhônen laaksoa antaen alkunsa Massa-joelle. Jäätikköä reunustavat Alppien '
      + 'korkeimmat huiput, muun muassa Jungfrau ja Mönch pohjoisessa sekä Aletschhorn lännessä. '
      + 'Jäätikkö on jo vetäytymässä: vuodesta 1870 se on lyhentynyt yli kolme kilometriä.',
    lahde: 'en-Wikipedia "Aletsch Glacier", johdanto-osa ja osio "Geography" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuinka pitkä Aletschin jäätikkö suunnilleen on?',
      vaihtoehdot: ['8 km', '15 km', '23 km', '40 km'],
      oikea: 2,
      fakta: 'Jäätikön jää on paksuimmillaan Konkordiaplatzilla, jossa syvyys on mitattu yli 900 '
        + 'metriksi.',
    },
  },
  {
    id: 'hahmotelma-grande-dixence',
    nimio: 'Grande Dixence',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-grande-dixence-e4c37b63.jpg',
      lyhyt: 'Grande Dixencen pato ja tekojärvi vuorten keskellä.',
      selite: 'Turkoosinvärinen tekojärvi täyttää laakson padon takana, ja rinteet ovat paljasta kalliota ja karua tunturimaastoa.',
      lahde: 'Valokuva: AndiP66, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'AndiP66',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grand_Dixence_Panorama.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-grande-dixence-852d4c47.jpg',
        lyhyt: 'Grande Dixencen padon jyrkkä etuseinä ylhäältä kuvattuna.',
        selite: 'Harmaa betoniseinä laskeutuu jyrkästi laaksoon, ja padon takana järven vesi hohtaa turkoosina.',
        lahde: 'Valokuva: Jérémy Toma, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jérémy Toma',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Barrage_de_la_Grande-Dixence.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Grande Dixence -pato',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Missä kantonissa Grande Dixence sijaitsee?',
      'Mihin tarkoitukseen pato rakennetaan?',
    ],
    korostukset: ["Val d'Hérémence|Val d'Hérémencen", 'Lac des Dix|Lac des Dix'],
    nappi: 'Padon rakentamiseen on vielä lähes 80 vuotta; laakso on täysin koskematon',
    // 7.4039 E / 46.0806 N — en-Wikipedia "Grande Dixence Dam"
    laudat: {
      maailmankartta: { x: 6080.1, y: 1557 },
      europe: { x: 353.4, y: 681.7 },
    },
    teksti: 'Grande Dixence on Sveitsin ja koko Euroopan korkein pato, 285 metriä korkea betoninen '
      + "painovoimapato Val d'Hérémencen perukoilla Valais'n kantonissa. Se patoaa Dixence-joen Lac "
      + 'des Dix -tekojärveksi ja syöttää vettä neljälle voimalaitokselle, jotka riittävät sadoille '
      + 'tuhansille kotitalouksille. Pato ja sen tekojärvi rakennetaan vasta 1900-luvun puolivälissä, '
      + 'kun sodanjälkeinen teollisuus tarvitsee yhä enemmän sähköä; vuoteen 1873 mennessä laakso on '
      + 'yhä koskematon vuoristolaakso. Ensimmäinen, paljon pienempi Dixencen pato valmistuu vasta '
      + '1935, ja nykyinen jättipato vasta 1961.',
    lahde: 'en-Wikipedia "Grande Dixence Dam", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-vevey',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-vevey-29744634.jpg',
      lyhyt: 'Veveyn rantaraitti ja kirkontorni Genevenjärven rannalla.',
      selite: 'Viinitarhat peittävät rinteet Veveyn yllä, ja rannassa kohoaa vaalea hotellirakennus sekä kirkon torni.',
      lahde: 'Valokuva: Norbert Aepli, Switzerland (User:Noebu), Wikimedia Commons (CC BY 3.0).',
      tekija: 'Norbert Aepli, Switzerland (User:Noebu)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2009-08-27_Lake_Geneva_390.JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/che-nosto-vevey-98e313ce.jpg',
        lyhyt: 'Auringonlasku Genevenjärvellä Veveyn rannasta nähtynä.',
        selite: 'Taivas hehkuu oranssina järven yllä, ja rannalla seisovat hahmot katselevat auringonlaskua.',
        lahde: 'Valokuva: Paradise Chronicle, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Paradise Chronicle',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:At_the_shores_of_Lake_Geneva_in_Vevey_4-2-2024.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vevey',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä ongelman Daniel Peter yritti ratkaista?',
      'Mitä Henri Nestlé myi Veveystä käsin?',
    ],
    korostukset: ['Henri Nestlé|Henri Nestlé', 'Daniel Peter|Daniel Peter'],
    nappi: 'Peter kamppailee yhä maitosuklaan kaavan kanssa; ratkaisu löytyy vasta parin vuoden kuluttua',
    // 6.85 E / 46.4667 N — en-Wikipedia "Nestlé"
    laudat: {
      maailmankartta: { x: 6061.7, y: 1540.9 },
      europe: { x: 342.7, y: 671.5 },
    },
    teksti: 'Vevey on pieni kaupunki Genevenjärven rannalla, ja siitä on tullut sveitsiläisen '
      + 'elintarviketeollisuuden syntysija. Henri Nestlé alkoi vuonna 1867 myydä Veveystä käsin '
      + 'kehittämäänsä äidinmaidonkorviketta, jonka reseptin hän oli keksinyt pelastaakseen '
      + 'kylän vauvoja. Samoihin aikoihin paikallinen makeistehtailija Daniel Peter yritti keksiä '
      + 'tavan valmistaa maitosuklaata, mutta maidon vedestä ei tahtonut päästä eroon ilman että '
      + 'suklaa homehtui. Nestlé neuvoi Peteriä, ja ratkaisu löytyi vasta vuosia myöhemmin, minkä '
      + 'jälkeen Peter yhdisti yrityksensä Nestlén kanssa.',
    lahde: 'en-Wikipedia "Nestlé", osio "1866–1900: Founding and early years" (tarkistettu 21.9.2026).',
  },
];
