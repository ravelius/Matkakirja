/*
 * VENÄJÄN HAHMOTELMANOSTOT — täydentävä erä js/packs/maastokohteet-rus.js
 * -tiedoston kuudentoista kohteen rinnalle (elbrus, narodnaja,
 * barentsinmeri, jaameri, ohotanmeri, beringinmeri, volga, ob,
 * kizhin-pogosta, solovetskin-luostari, kazanin-kreml, veliki-novgorod,
 * kolan-syvareika, tunguskan-rajahdys, tobolskin-kreml, jasnaja-poljana).
 * Tämä tiedosto EI koske maastokohteet-rus.js:ään lainkaan — kaikki
 * neljätoista uutta kohdetta ovat tässä, uudessa tiedostossa.
 *
 * === MALLI JA MENETELMÄ ===============================================
 *
 * Malli on muiden maiden hahmotelmapakit, viimeisimpänä Slovenia
 * (js/packs/hahmotelma-svn.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian artikkelista omin sanoin suomeksi
 * (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli
 * ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna). Viidellä nostolla on lisäksi `visa`-kenttä
 * (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta) täsmälleen kuten
 * kaupunkien täkynostoilla: vastaus löytyy noston omasta tekstistä.
 *
 * === MIKSI PYSYTTIIN EUROOPAN-VENÄJÄLLÄ ================================
 *
 * Toimeksianto (omistaja 21.9.2026): peli näyttää Venäjän pelaajalle
 * lähinnä Euroopan puoleisena maana, joten uudet neljätoista kohdetta
 * pysyvät Uralille asti (poikkeuksena ei yhtään; olemassa olevan sarjan
 * Siperia-poikkeukset — Ob, Tunguska, Tobolsk — jäivät ennalleen
 * omaan tiedostoonsa eikä niitä toisteta). Itäisin uusi kohde on
 * Jekaterinburg, joka on kirjaimellisesti Euroopan ja Aasian rajalla —
 * kaupunki perustettiin juuri sille harjanteelle.
 *
 * MIKSI NÄMÄ NELJÄTOISTA: 16 olemassa olevaa kohdetta kattoivat korkeimman
 * vuoren, neljä merta, kaksi jokea, puukirkon, luostarin, kaksi kremliä,
 * Kuolan niemimaan, Tunguskan ja Tolstoin kotitilan — mutta Pietari,
 * Moskova (osittain), Kultaisen renkaan kaupungit, ruokaperinne ja
 * tekniikka puuttuivat lähes kokonaan (`tyyppi: 'ruoka'` ei esiintynyt
 * ollenkaan, `tyyppi: 'tekniikka'` vain kerran). Tämä erä korjaa vajeen:
 * kaksi keisarillista huvilinnaa/kaupunkia (Peterhof, Jekaterinburg),
 * kaksi Kultaisen renkaan kaupunkia (Suzdal, Rostov Veliki) kolmannen,
 * Sergiev Posadin, lisäksi, yksi suurkauppapaikka (Nižni Novgorod), yksi
 * järvi (Laatokka — ensimmäinen `tyyppi: 'jarvi'` Venäjän kohteissa),
 * kolme ruokakohdetta (pelmenit, kaviaari, Vologdan voi) ja kaksi
 * tekniikkakohdetta lisää (Jekaterinburgin raja/rahapaja, Tsiolkovski)
 * sekä kaksi historiallista kulttuurikohdetta (Mihailovskoje, Ipatievin
 * luostari) ja yksi läntinen linnoituskaupunki (Smolensk).
 *
 * MOSKOVAN PUNAINEN TORI JA PIETARIN TALVIPALATSI EIVÄT OLE TÄSSÄ
 * PAKISSA. Molemmat ovat jo pelikaupunkien omaa sisältöä: Kreml ja
 * Tsaarikello ovat js/packs/fokusvirta-moskova.js:ssä ja Talvipalatsi
 * js/packs/fokusvirta-pietari.js:ssä. Lisäksi kumpikin sijaitsee alle
 * KAUPUNGIN_KOHDALLA_SADE-säteen (7 yksikköä, js/fokuskohteet.js) päässä
 * oman kaupunkinsa laatasta, joten ne eivät voisi olla pääkartan
 * hahmotelmamerkkejä ilman kohdekarttalinkkiä. Peterhof (13,5 yksikköä
 * Pietarista) ja Sergiev Posad (30,7 Moskovasta) ovat kumpikin selvästi
 * säteen ulkopuolella ja siksi kelvollisia.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `rus-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ja niiden JSON-metadata ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/rus/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) JA LAHI-LIPPU ======================
 *
 * Sama reitti kuin muidenkin maiden hahmotelmilla (js/fokuskohteet.js
 * liittäisi rivit KOHDE_MAAT.RUS:ään) — TÄTÄ KYTKENTÄÄ EI OLE TEHTY
 * TÄSSÄ ERÄSSÄ, koska js/fokuskohteet.js on jaettu tiedosto, jota muut
 * rinnakkaiset sessiot muokkaavat samanaikaisesti; kytkeminen jätetään
 * omistajalle. `lahi: true` on sama lähizoomiportti kuin muilla maiden
 * hahmotelmilla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian artikkelista (tarkistettu
 * 21.9.2026), ja artikkelin nimi on kirjattu rivin viereen. Laudan
 * luvut on laskettu tools/johda-maastokohteet.mjs:n `laudat`-funktiolla
 * (Millerin lieriö maailmankartalle, tasaväli Euroopan laudalle);
 * funktio jättää `europe`-rivin itse pois, jos kohde on laudan kaavan
 * (lon −11…41, lat 34…72) ulkopuolella — kuusi neljästätoista kohteesta
 * (Jekaterinburg, Nižni Novgorod, pelmenit/Perm, kaviaari/Astrahan)
 * ovat, joten niillä on vain maailmankartan rivi.
 *
 * ETÄISYYDET PELIKAUPUNKEIHIN (js/packs/maailmankartta.js CITIES) on
 * mitattu jokaiselle kohteelle maailmankartan laudan yksiköissä samaan
 * tapaan kuin maastokohteet-rus.js:n K2-erässä; kaikki neljätoista ovat
 * selvästi KAUPUNGIN_KOHDALLA_SADE-säteen (7 yksikköä) ulkopuolella —
 * lähin on Sergiev Posad 30,7 yksikön päässä Moskovasta.
 *
 * NIMIÖLIMITYSTÄ EI VOITU TARKISTAA TÄYSIN KONEELLISESTI TÄSSÄ ERÄSSÄ,
 * koska pakkia ei ole kytketty KOHDE_MAAT-tauluun (yllä); sen sijaan
 * jokaisen uuden kohteen etäisyys jokaiseen muuhun kohteeseen (16
 * vanhaa + 14 uutta) laskettiin käsin maailmankartan laudan yksiköissä,
 * ja lähin pari on yli 100 yksikön päässä toisistaan — reilusti
 * enemmän kuin minkään yksittäisen nimiön koko. Kun pakki kytketään
 * peliin, `node tools/tarkista-nimiolimitys.mjs RUS` kannattaa silti
 * ajaa uudelleen varmuuden vuoksi.
 */

/** Venäjän hahmotelmanostot: sisällölliset kohteet. */
import { EUROOPAN_KADONNEET } from './monumentit-eurooppa.js';

export const HAHMOTELMA_RUS = [
  ...EUROOPAN_KADONNEET.RUS,
  {
    id: 'hahmotelma-peterhof',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-peterhof-16ec7fcf.jpg',
      lyhyt: 'Peterhofin Suuri vesiputouskaskadi ja kultaiset patsaat palatsin edustalla.',
      selite: 'Kymmenet vesisuihkut nousevat kultaisten patsaiden ja portaiden keskeltä palatsin '
        + 'keltaista julkisivua vasten. Vesi putoaa altaasta altaaseen ilman yhtäkään pumppua.',
      lahde: 'Valokuva: Florstein (Telegram: WikiPhoto.Space), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Florstein (Telegram: WikiPhoto.Space)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grand_Cascade_of_Peterhof_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-peterhof-a8646ee5.jpg',
        lyhyt: 'Kultaiset patsaat vesisuihkujen keskellä, taustalla Peterhofin palatsi.',
        selite: 'Kaksi kullattua patsasta seisoo suihkuavan veden ympäröimänä portaikon reunalla. '
          + 'Palatsin ikkunarivistö kohoaa taustalla.',
        lahde: 'Valokuva: Florstein (Telegram: WikiPhoto.Space), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Florstein (Telegram: WikiPhoto.Space)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sculptures_on_the_Grand_Cascade_of_Peterhof_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Peterhof',
    tyyppi: 'historia',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Miksi Peterhofia kutsutaan "Venäjän Versailles\'ksi"?',
      'Miten Peterhofin Suuren kaskadin suihkulähteet saavat vetensä liikkeelle?',
    ],
    korostukset: ['Rastrelli|Rastrellin', 'Suuri kaskadi|Suuri kaskadi'],
    nappi: 'Keisariperheen suosittu kesäasunto Suomenlahden rannalla; tsaari Aleksanteri II '
      + 'viettää täällä kesiään',
    // 29.9089 E / 59.8844 N — en-Wikipedia "Peterhof Palace"
    laudat: {
      maailmankartta: { x: 6830.3, y: 931.5 },
      europe: { x: 785.5, y: 318.6 },
    },
    teksti: 'Pietari Suuri perusti Peterhofin 1700-luvun alussa Ranskan-matkansa 1717 '
      + 'innoittamana, ja palatsista tuli hänen vastauksensa Ludvig XIV:n Versailles\'lle. '
      + 'Nykyinen laajempi kokonaisuus syntyi keisarinna Elisabetin aikana 1740–50-luvuilla '
      + 'arkkitehti Bartolomeo Rastrellin suunnitelmien mukaan. Puiston kuuluisin nähtävyys on '
      + 'Suuri kaskadi, jonka kymmenet kultaiset patsaat ja suihkulähteet toimivat ilman '
      + 'ainuttakaan pumppua: ylätarhan luonnollisista lähteistä valuva vesi ja korkeusero '
      + 'riittävät yksin käyttövoimaksi. Peterhof sijaitsee Suomenlahden rannalla lähellä '
      + 'Pietaria, ja se kattaa nykyisin lähes 4 000 hehtaaria puistoja ja rakennuksia.',
    lahde: 'en-Wikipedia "Peterhof Palace", johdanto-osa ja osiot "History", "The Grand Cascade" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Miten Peterhofin Suuren kaskadin suihkulähteet saavat vetensä liikkeelle?',
      vaihtoehdot: [
        'Höyrykoneen pumpuilla',
        'Pelkällä painovoimalla ilman pumppuja',
        'Tuulimyllyillä',
        'Käsin pumppaamalla',
      ],
      oikea: 1,
      fakta: 'Vesi virtaa kilometrien pituista kanavaverkostoa pitkin ylätarhan lähteistä alas, '
        + 'ja korkeusero riittää yksin käyttämään yli 60 suihkulähdettä ja 200 patsasta.',
    },
  },
  {
    id: 'hahmotelma-jekaterinburg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-jekaterinburg-b56e0dbd.jpg',
      lyhyt: 'Lumen peittämä Euroopan ja Aasian rajaobeliski Jekaterinburgin lähellä.',
      selite: 'Metallinen obeliski nousee lumihankien keskeltä havumetsän edustalla. Jalustaan '
        + 'on valettu sanat AASIA ja EUROOPPA kummallekin puolelle rajaa.',
      lahde: 'Valokuva: Bertol at Dutch Wikipedia, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bertol at Dutch Wikipedia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grensmonument_Jekaterinburg.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-jekaterinburg-5e52fe51.jpg',
        lyhyt: 'Jekaterinburgin kattojen ja tornitalojen siluetti hämärässä.',
        selite: 'Kaupunki levittäytyy horisonttiin asti kerrostaloineen ja nostureineen. '
          + 'Etualalla erottuu oopperatalon vaalea rakennus puiden keskellä.',
        lahde: 'Valokuva: Jason Eppink, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Jason Eppink',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ekaterinburg_cityscape.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Jekaterinburg',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Jekaterinburg perustettiin juuri Uralin harjanteelle?',
      'Mitä Jekaterinburgin rahapajassa valmistettiin 1870-luvulla?',
    ],
    korostukset: ['Vasili Tatištšev|Vasili Tatištševin', 'Georg Wilhelm de Gennin|Georg Wilhelm de Genninin'],
    nappi: 'Rahapajakaupunki, jonka kolikot kiertävät koko keisarikunnassa; rautatie Siperiaan '
      + 'on vielä rakentamatta',
    // 60.6128 E / 56.8356 N — en-Wikipedia "Yekaterinburg"
    laudat: {
      maailmankartta: { x: 7853.8, y: 1079.6 },
    },
    teksti: 'Jekaterinburg perustettiin marraskuussa 1723 historioitsija Vasili Tatištševin ja '
      + 'saksalaissyntyisen insinööri Georg Wilhelm de Genninin johdolla Pietari Suuren '
      + 'käskystä, ja kaupunki sai nimensä keisarin puolisosta Jekaterinasta. Se rakennettiin '
      + 'metalliteollisuuden keskukseksi ja linnoitukseksi juuri Uralin harjanteelle, Euroopan '
      + 'ja Aasian rajalle. Vuosina 1820–1845 lähes 45 prosenttia koko maailman kullasta '
      + 'louhittiin Jekaterinburgin seudulta, ja kaupungin rahapaja löi suurimman osan Venäjän '
      + 'keisarikunnan kolikoista aina vuoteen 1876 asti. Siperian valtatie teki kaupungista '
      + 'Aasian portin jo 1760-luvulta lähtien, vuosikymmeniä ennen Trans-Siperian rautatietä.',
    lahde: 'en-Wikipedia "Yekaterinburg", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-suzdal',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-suzdal-685e9baa.jpg',
      lyhyt: 'Suzdalin kremlin siniset tähtikupolit iltavalossa vallien takaa.',
      selite: 'Valkoinen katedraali kultaisin kupolein kohoaa maavallien takana kirkkaan sinistä '
        + 'taivasta vasten. Oikealla seisoo tumma hirsinen kellotapuli.',
      lahde: 'Valokuva: C.caramba2010, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'C.caramba2010',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Suzdal_Kremlin15.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-suzdal-794de962.jpg',
        lyhyt: 'Ilmakuva Suzdalin kremlistä ja ympäröivästä pikkukaupungista syksyllä.',
        selite: 'Valkoiset kremlin rakennukset vihreine kattoineen erottuvat syksyisen '
          + 'kaupungin keskeltä. Kaukana horisontissa siintävät lisää kirkontorneja.',
        lahde: 'Valokuva: Ludvig14, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ludvig14',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Suzdal_Kremlin_0111.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Suzdal',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Suzdal on säilynyt niin hyvin verrattuna moniin muihin Venäjän kaupunkeihin?',
      'Mikä on Kultainen rengas?',
    ],
    korostukset: ['Kultainen rengas|Kultaisen renkaan', 'Juri Dolgoruki|Juri Dolgoruki'],
    nappi: 'Pieni, syrjäinen kauppala, jonka ohi rautatie ei koskaan kulje — juuri se säilyttää '
      + 'sen vanhan ilmeen',
    // 40.45 E / 56.417 N — en-Wikipedia "Suzdal"
    laudat: {
      maailmankartta: { x: 7181.7, y: 1099.5 },
      europe: { x: 987.8, y: 409.8 },
    },
    teksti: 'Suzdal mainitaan lähteissä ensi kerran vuonna 1024, ja 1100-luvun alussa siitä '
      + 'tuli Rostov-Suzdalin ruhtinaskunnan pääkaupunki Vladimir Monomahin aikana; ruhtinas '
      + 'Juri Dolgoruki, myöhemmin Moskovan perustajaksi mainittu hallitsija, hallitsi täältä '
      + 'käsin. Kaupunki on nykyisin Kultaisen renkaan pienin jäsen, mutta se säästyi '
      + 'neuvostoajan teollistumiselta, joten 1200–1800-lukujen arkkitehtuuri on säilynyt '
      + 'lähes koskemattomana. Suzdalissa on yli 300 suojeltua muistomerkkiä, kolmisenkymmentä '
      + 'kirkkoa ja viisi luostaria pienellä alueella, ja Unesco listasi Vladimirin ja '
      + 'Suzdalin valkoiset muistomerkit maailmanperintöön 1992. Kaupungin ainutlaatuinen '
      + 'tunnelma on houkutellut yli 60 elokuvantekijää kuvauspaikaksi, muun muassa '
      + 'klassikon Andrei Rubljov.',
    lahde: 'en-Wikipedia "Suzdal", johdanto-osa ja osiot "History", "Tourism" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-nizni-novgorod',
    nimio: 'Nižni Novgorod',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-nizni-novgorod-7b0cc70c.jpg',
      lyhyt: 'Vanha postikortti Nižni Novgorodin messujen päärakennuksesta noin 1903.',
      selite: 'Värjätyssä postikortissa messujen koristeellinen päärakennus torneineen '
        + 'hallitsee toria. Hevosvankkureita kulkee rakennuksen edustalla.',
      lahde: 'Valokuva: Andrei Osipovitš Karelin, Wikimedia Commons (Public domain).',
      tekija: 'Andrei Osipovitš Karelin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nizhny_Novgorod_Fair_1903.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-nizni-novgorod-82a8d473.jpg',
        lyhyt: 'Messujen päärakennuksen muistomitali vuodelta 1890, kultaa ja emalia.',
        selite: 'Ovaalinmuotoinen mitali esittää kaksipäistä kotkaa punaisella emalipohjalla, '
          + 'kruunattuna ja nauhoin koristeltuna.',
        lahde: 'Valokuva: shakko, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'shakko',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nizhny_Novgorod_Fair_badge_1890_by_shakko.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Nižni Novgorodin messut',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Miksi Nižni Novgorodin messut perustettiin alun perin Kazanin lähelle?',
      'Kuinka suuri osa Venäjän vientituotannosta kulki messujen kautta parhaimmillaan?',
    ],
    korostukset: ['Makarjevin luostari|Makarjevin luostarin', 'Kazan|Kazanin'],
    nappi: 'Messut ovat jo täydessä vauhdissa uudella paikallaan Nižni Novgorodissa, avoinna '
      + 'joka kesä heinä-syyskuussa',
    // 43.9608 E / 56.3283 N — en-Wikipedia "Nizhny Novgorod Fair"
    laudat: {
      maailmankartta: { x: 7298.7, y: 1103.7 },
    },
    teksti: 'Nižni Novgorodin messut olivat Venäjän suurin kauppatapahtuma, jonka juuret '
      + 'ulottuvat 1500-luvulle Makarjevin luostarin liepeille Volgan varrella. Moskovan '
      + 'suurruhtinaat perustivat messut alun perin houkutellakseen kauppaa pois Kazanin '
      + 'markkinoilta, jotka olivat toimineet jo vuodesta 1257. Vuoden 1816 tulipalon jälkeen '
      + 'messut siirrettiin nykyiselle paikalleen Nižni Novgorodiin, ja parhaimmillaan ne '
      + 'kokosivat kauppiaita aina Intiasta, Persiasta ja Keski-Aasiasta asti. Huipussaan '
      + '1900-luvun alussa messualueella oli 60 rakennusta ja peräti 2 500 kauppapaikkaa, ja '
      + 'messujen kautta kulki jopa puolet koko Venäjän vientituotannosta.',
    lahde: 'en-Wikipedia "Nizhny Novgorod Fair", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-pelmenit',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-pelmenit-c32b6832.jpg',
      lyhyt: 'Lautasellinen keitettyjä pelmenejä smetanan ja ruohosipulin kera.',
      selite: 'Valkoisella lautasella on kasa pieniä täytettyjä taikinakukkaroita liemessä. '
        + 'Päällä on smetanaa ja silputtua ruohosipulia.',
      lahde: 'Valokuva: Bernd Hutschenreuther, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bernd Hutschenreuther',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pelmeni.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-pelmenit-81681e62.jpg',
        lyhyt: 'Paistettuja pelmenejä kasassa lasisella tarjoiluvadilla.',
        selite: 'Kultaruskeiksi paistetut pelmenit kiiltävät rasvasta vadilla. Osa on '
          + 'paistunut rapeaksi laidoiltaan.',
        lahde: 'Valokuva: Pannet, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pannet',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%D0%9F%D0%B5%D0%BB%D1%8C%D0%BC%D0%B5%D0%BD%D0%B8_%D0%B6%D0%B0%D1%80%D0%B5%D0%BD%D1%8B%D0%B5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pelmenit',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      "Mistä kielistä pelmenien nimi juontuu ja mitä se tarkoittaa?",
      'Miksi siperialaiset pakastivat pelmenejä talveksi ulos?',
    ],
    korostukset: ["pel'n'an'|pel'n'an'", 'Siperia|Siperiaan'],
    nappi: 'Uralin ja Siperian talonpoikien arkiruoka, joka ei ole vielä matkannut '
      + 'ranskalaisiin ravintoloihin',
    // 56.25 E / 58.00 N — en-Wikipedia "Pelmeni" (Permin seutu, Uralin läntinen juuri)
    laudat: {
      maailmankartta: { x: 7708.3, y: 1023.8 },
    },
    teksti: "Pelmeni-sana juontuu komin ja udmurtin kielten sanasta pel'n'an', joka tarkoittaa "
      + 'kirjaimellisesti leipäkorvaa — ohuen taikinan sisään käärittyä lihatäytettä. Ruoka '
      + 'levisi venäläiseen keittiöön, kun asutus laajeni Uralille ja Siperiaan, ja Komin '
      + 'tasavalta sekä Udmurtia pitävät yhä pelmenejä omana kansallisruokanaan. Perinteisesti '
      + 'siperialaiset metsästäjät ja matkalaiset pakastivat suuria määriä pelmenejä ulos '
      + 'talven pakkasessa ja kuljettivat niitä mukanaan eväänä pitkillä matkoilla. Ruoka '
      + 'tunnettiin jo 1800-luvun lopulla myös Ranskassa, sillä kokki Auguste Escoffier otti '
      + 'sen mukaan omaan keittokirjaansa.',
    lahde: 'en-Wikipedia "Pelmeni", johdanto-osa ja osiot "Etymology", "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-tsiolkovski',
    nimio: 'Tsiolkovski',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-tsiolkovski-8690839d.jpg',
      lyhyt: 'Konstantin Tsiolkovskin muotokuva Kalugassa noin 1908.',
      selite: 'Mustavalkoisessa ateljeekuvassa parrakas mies silmälaseissa katsoo suoraan '
        + 'kameraan tummassa puvussa.',
      lahde: 'Valokuva: fotoateljee S. A. Adamovitš, Wikimedia Commons (Public domain).',
      tekija: 'fotoateljee S. A. Adamovitš',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Konstantin_Tsiolkovsky_1908-1909_(full_face).jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-tsiolkovski-179ef0bd.jpg',
        lyhyt: 'Tsiolkovskin puinen kotitalo Kalugassa, nyt museona.',
        selite: 'Harmaa hirsitalo punaisine peltikattoineen seisoo puiden keskellä. Seinässä '
          + 'on muistolaatta talon entisestä asukkaasta.',
        lahde: 'Valokuva: Darja Apasova, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Darja Apasova',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%D0%94%D0%BE%D0%BC-%D0%BC%D1%83%D0%B7%D0%B5%D0%B9_%D0%9A._%D0%AD._%D0%A6%D0%B8%D0%BE%D0%BB%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Konstantin Tsiolkovski',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Tsiolkovski opiskeli lähes kokonaan itsenäisesti kirjoja lukemalla?',
      'Mihin vuoteen 1903 julkaistu Tsiolkovskin rakettiyhtälö johti?',
    ],
    korostukset: ['Tsiolkovskin rakettiyhtälö|Tsiolkovskin rakettiyhtälön', 'Kaluga|Kalugaan'],
    nappi: 'Kuusitoistavuotias, kuuro ja itseopiskeleva poika, joka jo haaveilee '
      + 'avaruusmatkoista — rakettiyhtälö syntyy vasta 1896',
    // 36.2754 E / 54.5293 N — en-Wikipedia "Konstantin Tsiolkovsky" (Kaluga)
    laudat: {
      maailmankartta: { x: 7042.5, y: 1187.5 },
      europe: { x: 907.7, y: 459.5 },
    },
    teksti: 'Konstantin Tsiolkovski syntyi 1857, ja yhdeksänvuotiaana sairastettu tulirokko vei '
      + 'suurimman osan hänen kuulostaan, minkä vuoksi hän opiskeli lähes kokonaan '
      + 'itsenäisesti kirjoja lukemalla. Vuonna 1892 hän muutti Kalugaan, jossa hän asui '
      + 'suurimman osan elämästään vaatimattomassa hirsitalossa — talosta tuli myöhemmin '
      + 'kotimuseo. Vuonna 1896 hän johti systemaattisesti niin sanotun Tsiolkovskin '
      + 'rakettiyhtälön, joka kuvaa raketin nopeuden, polttoaineen kulutuksen ja massasuhteen '
      + 'yhteyttä, ja vuoden 1903 julkaisussaan hän esitti, että monivaiheiset '
      + 'nesterakettimoottorit voisivat viedä aluksen kiertoradalle asti. Häntä pidetään '
      + 'yhdessä Hermann Oberthin ja Robert Goddardin kanssa nykyaikaisen raketti- ja '
      + 'avaruustekniikan uranuurtajana.',
    lahde: 'en-Wikipedia "Konstantin Tsiolkovsky", johdanto-osa ja osiot "Early life", '
      + '"Scientific work" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Tsiolkovski johti kuuluisan rakettiyhtälönsä?',
      vaihtoehdot: [
        '1873',
        '1892',
        '1896',
        '1903',
      ],
      oikea: 2,
      fakta: 'Vuoden 1903 julkaisussaan hän meni pidemmälle ja esitti, että monivaiheiset '
        + 'nesterakettimoottorit voisivat viedä aluksen aina kiertoradalle asti.',
    },
  },
  {
    id: 'hahmotelma-kaviaari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-kaviaari-6931bd5f.jpg',
      lyhyt: 'Astrahanin kremlin vihreäkupoliset katedraalit puiston takaa.',
      selite: 'Valkoinen katedraali ja korkea kellotorni kohoavat vihreiden puiden yllä '
        + 'pilvisenä päivänä. Etualalla nurmikentällä kävelee ihmisiä.',
      lahde: 'Valokuva: Alexxx1979, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alexxx1979',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Astrakhan_Kremlin_P5090805_2200.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-kaviaari-21891278.jpg',
        lyhyt: "Jean-Pierre Moynet'n kaiverrus sammen pyynnistä Volgalla vuodelta 1867.",
        selite: 'Kaiverruksessa kalastajat nostavat valtavaa sampea portaita pitkin joen '
          + 'rannalle. Nainen seisoo vieressä kori käsissään, kalaverkko kuivuu katolla.',
        lahde: "Kaiverrus: Jean-Pierre Moynet, Wikimedia Commons (Public domain).",
        tekija: 'Jean-Pierre Moynet',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jean_Pierre_Moynet_-_Fishing_the_sturgeon_on_the_Volga_river_Russia_1867_(engraving)_-_(MeisterDrucke-1473318).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Kaviaari',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mistä kalasta parhain kaviaari saadaan?',
      'Miksi juuri Astrahanista tuli Venäjän kaviaariteollisuuden keskus?',
    ],
    korostukset: ['sampi|sammen', 'beluga|beluga'],
    nappi: 'Astrahanin kaviaariteollisuus kukoistaa jo, ja Kaspianmeren sammet ovat vielä '
      + 'runsaita — ylikalastuksen uhka tulee vasta 1900-luvulla',
    // 48.035 E / 46.35 N — en-Wikipedia "Caviar" ja "Astrakhan"
    laudat: {
      maailmankartta: { x: 7434.5, y: 1545.8 },
    },
    teksti: 'Kaviaari on suolattua sammen mätiä, ja arvostetuimmat lajikkeet — beluga, ossetra '
      + 'ja sevruga — pyydystetään Kaspian- ja Mustaltamereltä. Kun Venäjä valtasi koko Volgan '
      + 'sen suulle asti 1500-luvulla, Astrahanista tuli maan tärkein kalastus- ja '
      + 'jalostuskeskus, ja se on ollut sitä lähes 400 vuotta. Belugan mäti on lajikkeista '
      + 'harvinaisinta ja kalleinta suurten, herneen kokoisten mätijyvien vuoksi, ja jo '
      + '1500-luvulla ranskalainen kirjailija François Rabelais mainitsi kaviaarin hienoimpana '
      + 'herkkuna. Astrahanin kremli kohoaa yhä Volgan rannalla kaupungin keskustassa, samalla '
      + 'seudulla, josta kaviaarikauppa on vuosisatoja käynyt.',
    lahde: 'en-Wikipedia "Caviar" ja "Astrakhan", johdanto-osat (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Mikä sammilaji tuottaa arvostetuinta ja kalleinta kaviaaria?',
      vaihtoehdot: [
        'Ossetra',
        'Sevruga',
        'Beluga',
        'Sterletti',
      ],
      oikea: 2,
      fakta: 'Belugan mäti on lajikkeista suurijyväisintä, ja vuonna 2012 luonnonvaraisen '
        + 'belugakaviaarin hinta nousi jopa 16 000 dollariin kilolta.',
    },
  },
  {
    id: 'hahmotelma-mihailovskoje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-mihailovskoje-39bde75b.jpg',
      lyhyt: 'Mihailovskojen kartanon päärakennuksen nurkkaus punaisine kattoineen.',
      selite: 'Vaaleanharmaa puurakennus punaisine peltikattoineen seisoo puiden keskellä. '
        + 'Kuistin portaat johtavat valkoiselle ovelle.',
      lahde: 'Valokuva: Reshinna, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Reshinna',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:DSC09681_2022_%D0%9F%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B5_%D0%B3%D0%BE%D1%80%D1%8B,_%D1%83%D1%81%D0%B0%D0%B4%D1%8C%D0%B1%D0%B0_%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5,_%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9_%D0%B4%D0%BE%D0%BC.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-mihailovskoje-7c5bde6e.jpg',
        lyhyt: 'Pronssiveistos Puškinin lyseotoverista Mihailovskojen puistossa.',
        selite: 'Makaava pronssihahmo lepää jalustalla omenapuutarhan keskellä. Kävelijöitä '
          + 'näkyy puiden lomassa taustalla.',
        lahde: 'Valokuva: Aleksandrov, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Aleksandrov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:652._%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Mihailovskoje',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Puškin joutui Mihailovskojeen vasten tahtoaan vuosina 1824–1826?',
      'Mitä mestariteosta hän kirjoitti siellä?',
    ],
    korostukset: ['Aleksandr Puškin|Aleksandr Puškinin', 'karkotus|karkotettiin'],
    nappi: 'Kartano on yhä Puškinin suvun omistuksessa — valtio ostaa sen pojalta Grigorilta '
      + 'vasta 1899',
    // 28.9333 E / 57.05 N — en-Wikipedia "Mikhaylovskoye Museum Reserve"
    laudat: {
      maailmankartta: { x: 6797.8, y: 1069.4 },
      europe: { x: 766.7, y: 393.2 },
    },
    teksti: 'Mihailovskoje on Aleksandr Puškinin perheen kartano Pihkovan alueella, ja maa oli '
      + 'lahjoitettu vuonna 1742 hänen äitinsä isoisälle Abram Gannibalille. Puškin vieraili '
      + 'tilalla säännöllisesti, mutta vuosina 1824–1826 hänet karkotettiin sinne poliittisen '
      + 'epäluulon vuoksi, kauas pääkaupunkien vaikutuspiiristä. Karkotusvuosina hän kirjoitti '
      + 'suuren osan mestariteoksestaan Jevgeni Onegin. Valtio osti kartanon Puškinin pojalta '
      + 'Grigorilta vasta 1899, ja vuodesta 1922 se on toiminut museona; toisen '
      + 'maailmansodan aikana kartano ryöstettiin ja tuhoutui pahoin, mutta se kunnostettiin '
      + 'sodan jälkeen.',
    lahde: 'en-Wikipedia "Mikhaylovskoye Museum Reserve", johdanto-osa ja osio "History" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-smolensk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-smolensk-3b33ec95.jpg',
      lyhyt: 'Smolenskin muurin Kotkantorni punatiilisena pilvisen taivaan alla.',
      selite: 'Pyöreä punatiilinen torni kohoaa muurinpätkän päässä. Nurmikko peittää muurin '
        + 'juuren.',
      lahde: 'Valokuva: Spiridonova Svetlana, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Spiridonova Svetlana',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%D0%A1%D0%BC%D0%BE%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D0%B5%D0%BD%D0%B0,_%D0%91%D0%B0%D1%88%D0%BD%D1%8F_%D0%9E%D1%80%D0%B5%D0%BB.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-smolensk-bf26297a.jpg',
        lyhyt: 'Vanha postikortti Smolenskin muurista ja Iloisen tornista.',
        selite: 'Mustavalkoisessa postikortissa muuri ja pyöreä torni kohoavat aidatun kentän '
          + 'takana. Kortin yläreunassa lukee Smolensk, Krepostnaja stena.',
        lahde: 'Valokuva: Tuntematon tekijä, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon tekijä',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Smolensk_fortress_wall_4.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Smolensk',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Smolenskin muuri oli niin strategisesti tärkeä?',
      'Mitä Smolenskissa tapahtui elokuussa 1812?',
    ],
    korostukset: ['Dnepr|Dneprin', 'Napoleon|Napoleon'],
    nappi: 'Napoleonin sodista on kulunut 61 vuotta, ja Tolstoi on juuri kirjoittanut niistä '
      + 'Sodan ja rauhan; rauniomuuri seisoo yhä kaupungin ympärillä',
    // 32.0453 E / 54.7828 N — en-Wikipedia "Smolensk"
    laudat: {
      maailmankartta: { x: 6901.5, y: 1175.8 },
      europe: { x: 826.5, y: 452.8 },
    },
    teksti: 'Smolensk mainitaan lähteissä ensi kerran jo vuonna 863, mikä tekee siitä yhden '
      + 'Venäjän vanhimmista kaupungeista, ja se sijaitsee ylä-Dneprin varrella strategisesti '
      + 'tärkeällä kauppareitillä Länsi-Euroopasta Moskovaan. Vuosina 1597–1602 rakennettu '
      + 'kivikremli on Venäjän suurin, ja sen paksut muurit ja lukuisat tornit hallitsivat '
      + 'aikoinaan Länsi-Venäjän puolustusta. Elokuussa 1812 kaupungin muurien juurella '
      + 'kohtasivat kaksi historian suurinta armeijaa, kun Napoleon valtasi Smolenskin noin '
      + '30 000 sotilaan hinnalla — taistelun kuvasi myöhemmin Lev Tolstoi romaanissaan Sota '
      + 'ja rauha. Keskiajalla kaupunki oli oman ruhtinaskuntansa pääkaupunki, ja se siirtyi '
      + 'vuorotellen liettualaisten, puolalaisten ja venäläisten hallintaan ennen kuin '
      + 'vakiintui osaksi Venäjää.',
    lahde: 'en-Wikipedia "Smolensk", johdanto-osa ja osiot "History", "Kremlin" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-rostov-veliki',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-rostov-veliki-34b601d4.jpg',
      lyhyt: 'Rostovin kremlin hopeiset sipulikupolit kirkkaalla taivaalla.',
      selite: 'Useita hopeisia ja mustia sipulikupoleja kohoaa valkoisten kirkkorakennusten '
        + 'päällä. Portin läpi kulkee polku lammikon ohi.',
      lahde: 'Valokuva: Ludvig14, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ludvig14',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rostov_Kremlin_ResurrectionChurch_crop.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-rostov-veliki-3b0f3bf7.jpg',
        lyhyt: 'Rostovin kremlin pohjapiirros vuodelta 1913.',
        selite: 'Vanha viivapiirros näyttää kremlin muurit, tornit ja rakennukset numeroituna: '
          + 'katedraali, kellotapuli, kirkot ja ruhtinaallinen terema.',
        lahde: 'Piirros: B. K. Gindtse, Wikimedia Commons (Public domain).',
        tekija: 'B. K. Gindtse',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rostov-Veliky_Kreml_1913.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Rostov Veliki',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti Rostovin komean kremlin ja miksi?',
      'Kuinka painava sen suurin kello, Sysoi, on?',
    ],
    korostukset: ['Iona Sysojevitš|Iona Sysojevitš', 'Assumptionin katedraali|Assumptionin katedraalin'],
    nappi: 'Pieni kauppala Nerojärven rannalla, tunnettu emalityöstään; kremli on jo '
      + '200-vuotias mutta yhä pystyssä',
    // 39.417 E / 57.183 N — en-Wikipedia "Rostov, Yaroslavl Oblast"
    laudat: {
      maailmankartta: { x: 7147.2, y: 1063.1 },
      europe: { x: 968, y: 389.7 },
    },
    teksti: 'Rostov Veliki mainitaan lähteissä jo vuonna 862, ja se oli keskiajalla oman '
      + 'ruhtinaskuntansa keskus ennen liittämistään Moskovaan 1474. Kaupungin komean kremlin '
      + 'rakennutti metropoliitta Iona Sysojevitš vuosina 1667–1694 omaksi '
      + 'hallintokeskuksekseen, ja sitä pidetään yhtenä Venäjän kauneimmista Moskovan kremlin '
      + 'ulkopuolella. Assumptionin katedraalin kellotapulissa riippuu useita valtavia '
      + 'kelloja, joista suurin, vuonna 1688 valettu Sysoi, painaa 32 000 kiloa. Nykyään '
      + 'Rostov on tunnettu Kultaisen renkaan matkailukohteena ja perinteisestä '
      + 'emalikäsityöstään, finiftistä.',
    lahde: 'en-Wikipedia "Rostov, Yaroslavl Oblast", johdanto-osa ja osio "Kremlin" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuinka painava on Rostovin kremlin suurin kello, Sysoi?',
      vaihtoehdot: [
        '3 200 kiloa',
        '12 000 kiloa',
        '32 000 kiloa',
        '62 000 kiloa',
      ],
      oikea: 2,
      fakta: 'Sysoi valettiin vuonna 1688, ja Rostovin kellojen erityinen sointi tunnetaan '
        + 'koko Venäjällä; kellonsoittajien taito periytyi suvussa sukupolvelta toiselle.',
    },
  },
  {
    id: 'hahmotelma-sergiev-posad',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-sergiev-posad-5b511b46.jpg',
      lyhyt: 'Trinity-Sergein Lavran kultaiset kupolit puiden takaa Sergijev Posadissa.',
      selite: 'Kullatut sipulikupolit ja vihreä katedraalinkatto kohoavat vehreiden puiden '
        + 'yllä. Taivas on tumman pilvinen.',
      lahde: 'Valokuva: Alexxx1979, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Alexxx1979',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sergiyev_Posad._Trinity_Lavra_of_Saint_Sergius_P7160387_2350.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-sergiev-posad-1869a179.jpg',
        lyhyt: 'Koristeellinen punainen kappeli kultaisine kupoleineen luostarin pihalla.',
        selite: 'Kaksikerroksinen punainen ja valkoinen kappelirakennus koristeltuine '
          + 'pylväineen kohoaa mäntyjen keskellä. Ihmisiä seisoo sen ovella.',
        lahde: 'Valokuva: Max Ryazanov, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Max Ryazanov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trinity_Lavra_of_St._Sergius_08.03.2014.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Sergiev Posad',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuka perusti Kolminaisuus-Sergein Lavran ja minä vuonna?',
      'Miten luostari kesti pitkän piirityksen 1600-luvun alussa?',
    ],
    korostukset: ['Sergei Radonezhilainen|Sergei Radonezhilainen', 'Andrei Rubljov|Andrei Rubljovin'],
    nappi: 'Venäjän ortodoksisen kirkon hengellinen keskus ja suosittu pyhiinvaellus jo nyt — '
      + 'patriarkaatin virallinen istuin siirtyy tänne vasta 1900-luvulla',
    // 38.1367 E / 56.315 N — en-Wikipedia "Trinity Lavra of St. Sergius"
    laudat: {
      maailmankartta: { x: 7104.6, y: 1104.3 },
      europe: { x: 943.4, y: 412.5 },
    },
    teksti: 'Kolminaisuus-Sergein Lavra perustettiin vuonna 1337, kun munkki Sergei '
      + 'Radonezhilainen rakensi puisen Pyhän Kolminaisuuden kirkon Makovets-kukkulalle. '
      + 'Luostarista tuli Venäjän tärkein ja arvostetuin, ja sen Kolminaisuuskatedraalissa '
      + 'säilytetään Andrei Rubljovin kuuluisaa Kolminaisuus-ikonia. Vahvat 1550-luvulla '
      + 'rakennetut kivimuurit auttoivat luostaria kestämään puolalais-liettualaisten '
      + '16 kuukauden piirityksen vuosina 1608–1610. Nykyisin alueella toimii yli 300 munkkia, '
      + 'ja keisarinna Elisabetin tilaama 88-metrinen kellotorni oli aikanaan yksi Venäjän '
      + 'korkeimmista rakennuksista.',
    lahde: 'en-Wikipedia "Trinity Lavra of St. Sergius", johdanto-osa ja osiot "History", '
      + '"Buildings" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-ipatievin-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-ipatievin-luostari-921668ca.jpg',
      lyhyt: 'Ipatievin luostarin Kolminaisuuskatedraali kultaisine kupoleineen.',
      selite: 'Valkoinen katedraali viidellä kultaisella sipulikupolilla kohoaa sinistä '
        + 'taivasta vasten. Portaat johtavat katettuun sisäänkäyntiin.',
      lahde: 'Valokuva: Alexxx1979, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Alexxx1979',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kostroma_Ipatiev_Monastery_Trinity_Cathedral_IMG_0651_1725.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-ipatievin-luostari-9e50ebe3.jpg',
        lyhyt: 'Vladimir Plotnikovin akvarellimaalaus Ipatievin luostarin katedraalista.',
        selite: 'Maalauksessa katedraalin tummat sipulikupolit ja freskoin koristellut '
          + 'seinät kuvataan lämpiminä keltaruskeina sävyinä.',
        lahde: 'Maalaus: Vladimir Aleksandrovitš Plotnikov, Wikimedia Commons (Public domain).',
        tekija: 'Vladimir Aleksandrovitš Plotnikov (1866-1917)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ipatiev_Monastery_in_Kostroma_by_V._Plotnikov.jpeg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Ipatievin luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä merkittävä päätös tehtiin luostarissa 14. maaliskuuta 1613?',
      'Mikä arvokas aikakirja löytyi luostarin kirjastosta?',
    ],
    korostukset: ['Mihail Romanov|Mihail Romanovin', 'Zemski sobor|Zemski sobor'],
    nappi: 'Romanovien suvulla on ollut valtaistuin 260 vuotta — juuri tässä luostarissa se '
      + 'alkoi',
    // 40.8944 E / 57.7764 N — en-Wikipedia "Ipatiev Monastery" (Kostroma)
    laudat: {
      maailmankartta: { x: 7196.5, y: 1034.6 },
      europe: { x: 996.4, y: 374.1 },
    },
    teksti: 'Ipatievin luostari perustettiin noin 1330 tataarilähtöisen ruhtinas Tšetin '
      + 'toimesta, joka kääntyi kristityksi nimellä Zakarias, ja se sijaitsee Kostroma-joen '
      + 'rannalla vastapäätä Kostroman kaupunkia. Luostari nousi historiaan 14. maaliskuuta '
      + '1613, kun Zemski sobor -kokous ilmoitti juuri täällä oleskelleen nuoren Mihail '
      + 'Romanovin Venäjän uudeksi tsaariksi — hetki, joka käynnisti Romanovien '
      + '300-vuotisen hallituskauden. Luostarin kirjastosta löytyi myös arvokas Ipatievin '
      + 'aikakirja, joka sisältää keskeisiä 1300-luvun venäläisiä kronikoita ja jonka '
      + 'historioitsija Nikolai Karamzin toi tunnetuksi. Suurin osa nykyisistä rakennuksista '
      + 'on 1500–1600-luvuilta, ja tsaari Aleksanteri II käynnisti 1800-luvulla Mihail '
      + 'Romanovin asuinsijan entisöinnin.',
    lahde: 'en-Wikipedia "Ipatiev Monastery", johdanto-osa ja osiot "History", "Romanov '
      + 'connection" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-laatokka',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-laatokka-b2072481.jpg',
      lyhyt: 'Laatokan kallioinen ranta ja tyyni selkä iltavalossa.',
      selite: 'Tumma vesi heijastaa rantametsän puita tyynenä iltana. Kalliorannalla lepää '
        + 'soutuvene ja retkeilyvarusteita.',
      lahde: 'Valokuva: Vitold Muratov, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Vitold Muratov',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ladoga_Lake_evening.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-laatokka-d1a0b7e7.jpg',
        lyhyt: 'Fjodor Vasiljevin maalaus Laatokan rannasta pilvisenä päivänä, 1867.',
        selite: 'Maalauksessa matala hiekkaranta ja kalastajamökki avautuvat kohti pilvistä, '
          + 'valoisaa taivasta. Vene lepää rannalla kivien keskellä.',
        lahde: 'Maalaus: Fjodor Vasiljev, Wikimedia Commons (Public domain).',
        tekija: 'Fjodor Vasiljev',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:0186Fd._Vasilyev_F.A._Painting_%22The_Shore_of_Lake_Ladoga._Cloudy_Day%22,_1867.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Laatokka',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Laatokka on erikoinen Euroopan järvien joukossa?',
      'Mikä saari luostareineen sijaitsee järven keskellä?',
    ],
    korostukset: ['Valamon luostari|Valamon luostari', 'Nevajoki|Nevajokea'],
    nappi: 'Taidemaalari Fjodor Vasiljev, joka maalasi tämän rantakuvan 1867, kuolee jo tänä '
      + 'vuonna, 1873, vain 23-vuotiaana',
    // 31.5 E / 61.00 N — en-Wikipedia "Lake Ladoga"
    laudat: {
      maailmankartta: { x: 6883.3, y: 875.5 },
      europe: { x: 816, y: 289.3 },
    },
    teksti: 'Laatokka on Euroopassa kokonaan sijaitsevista järvistä suurin, pinta-alaltaan '
      + 'lähes 17 900 neliökilometriä, ja se ulottuu Pietarin lähistöltä Karjalan tasavaltaan '
      + 'asti. Järvi täyttää muinaisen hautavajoaman ja poimulaakson, jota jääkauden liike '
      + 'syvensi entisestään — koillisosassa syvyys ylittää 200 metriä, vaikka keskisyvyys on '
      + 'vain noin 47 metriä. Järvellä ja sen noin 660 saaressa on pitkä henkinen historia: '
      + 'suurimmalla saarella sijaitsee keskiaikainen Valamon luostari, yksi Venäjän '
      + 'ortodoksisen kirkon merkittävimmistä pyhiinvaelluskohteista. Järvi laskee luoteeseen '
      + 'Nevajokea pitkin Suomenlahteen, ja sen rannalla maalasi muun muassa nuorena kuollut '
      + 'Fjodor Vasiljev, jonka pilvinen rantamaisema on vuodelta 1867.',
    lahde: 'en-Wikipedia "Lake Ladoga", johdanto-osa ja osiot "Geography", "History" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuinka vanhana taidemaalari Fjodor Vasiljev kuoli?',
      vaihtoehdot: [
        '19-vuotiaana',
        '23-vuotiaana',
        '31-vuotiaana',
        '45-vuotiaana',
      ],
      oikea: 1,
      fakta: 'Vasiljev kuoli keuhkotautiin Krimillä vuonna 1873 — täsmälleen samana vuonna, '
        + 'johon isoisän matkakirja sijoittuu — mutta ehti jo nuorena vaikuttaa koko '
        + 'venäläisen maisemamaalauksen suuntaan.',
    },
  },
  {
    id: 'hahmotelma-vologdan-voi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-vologdan-voi-9e254978.jpg',
      lyhyt: 'Vologdan voita savipurkissa, kannessa perinteinen koristemaalaus.',
      selite: 'Ruskea savipurkki kantineen on maalattu valkoisin kukkakuvioin ja tekstillä '
        + 'Vologodskoje maslo. Kannen alta pilkottaa keltainen voi.',
      lahde: 'Valokuva: Sergejev Pavel, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Sergejev Pavel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vologda_butter_9.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-vologdan-voi-15d45c75.jpg',
        lyhyt: 'Piirros Nikolai Vereštšaginista ja Dmitri Mendelejevistä Jedimonovon kylässä.',
        selite: 'Kaksi parrakasta miestä istuu teepöydän ääressä talon kuistilla. Taustalla '
          + 'näkyy kylän meijerirakennuksia savupiippuineen.',
        lahde: 'Piirros: V. I. Blandov (1889), Wikimedia Commons (Public domain).',
        tekija: 'V. I. Blandov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%D0%9D.%D0%92._%D0%92%D0%B5%D1%80%D0%B5%D1%89%D0%B0%D0%B3%D0%B8%D0%BD_%D0%B8_%D0%94.%D0%98._%D0%9C%D0%B5%D0%BD%D0%B4%D0%B5%D0%BB%D0%B5%D0%B5%D0%B2_%D0%B2_%D1%81%D0%B5%D0%BB%D0%B5_%D0%95%D0%B4%D0%B8%D0%BC%D0%BE%D0%BD%D0%BE%D0%B2%D0%BE.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Vologdan voi',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Kuka kehitti Vologdan voin valmistustavan ja mistä hän sai idean?',
      'Miksi voita myytiin aluksi nimellä "Pariisin voi"?',
    ],
    korostukset: ['Nikolai Vereštšagin|Nikolai Vereštšagin', 'pähkinäinen maku|pähkinäisen maun'],
    nappi: 'Vereštšagin kehittää parhaillaan menetelmäänsä Jedimonovon meijerikoulussa — '
      + 'Vologdan voi -nimi otetaan käyttöön vasta 1939',
    // 39.884 E / 59.2239 N — en-Wikipedia "Vologda butter"
    laudat: {
      maailmankartta: { x: 7162.8, y: 964.1 },
      europe: { x: 977, y: 336 },
    },
    teksti: 'Nikolai Vereštšagin maistoi normandialaista voita Pariisin maailmannäyttelyssä '
      + '1867 ja alkoi sen jälkeen kehittää omaa versiotaan, jossa kerma kuumennetaan '
      + 'tarkasti tietyssä lämpötilassa ennen kirnuamista. Menetelmä antaa voille '
      + 'tunnusomaisen makean, pähkinäisen maun, ja Vereštšagin esitteli lopputuloksensa '
      + 'Pariisin näyttelyssä 1878, jossa se voitti kultamitalin. Koska idea oli lähtöisin '
      + 'Ranskasta, voita myytiin aluksi nimellä Pariisin voi, ja vasta vuonna 1939 se '
      + 'nimettiin uudelleen Vologdan voiksi kotiseutunsa mukaan. Tuoteväärennösten vuoksi '
      + 'Venäjä rajasi nimen vuonna 2010 suojatuksi alkuperänimitykseksi, joka kuuluu vain '
      + 'aidosti Vologdan alueella valmistetulle voille.',
    lahde: 'en-Wikipedia "Vologda butter", johdanto-osa (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Missä Nikolai Vereštšagin maistoi voita, joka innoitti hänet kehittämään '
        + 'oman menetelmänsä?',
      vaihtoehdot: [
        'Lontoon maailmannäyttelyssä',
        'Pariisin maailmannäyttelyssä',
        'Berliinin maailmannäyttelyssä',
        'Wienin maailmannäyttelyssä',
      ],
      oikea: 1,
      fakta: 'Vereštšagin esitteli oman voinsa Pariisin näyttelyssä uudelleen vuonna 1878, '
        + 'jolloin se voitti kultamitalin — mutta koska idea oli ranskalaislähtöinen, voita '
        + 'myytiin pitkään nimellä Pariisin voi.',
    },
  },
  {
    id: 'hahmotelma-staraja-rjazan',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/rus-nosto-staraja-rjazan-91939ff8.jpg',
      lyhyt: 'Vanhan Rjazanin muinaisjäännösalue ilmasta kuvattuna Okajoen mutkassa.',
      selite: 'Ilmakuvassa näkyy Vanhan Rjazanin laaja linnavuoren ja esikaupungin alue '
        + 'vihreine maavalleineen Okajoen rannalla. Muinaisen kaupungin rakennuksista ei ole '
        + 'maan päällä jäljellä juuri mitään — vain nurmettuneet valli- ja kaivantolinjat '
        + 'piirtävät entisen asutuksen ääriviivat.',
      lahde: 'Valokuva: Mikhey77777, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Mikhey77777',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Городище_Старая_Рязань._Вид_со_стороны_Оки.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Vanha Rjazan',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka oli Vanhan Rjazanin ruhtinas, joka sai surmansa kaupungin tuhoutuessa?',
      'Minne ruhtinaskunnan pääkaupunki siirrettiin tuhon jälkeen?',
    ],
    korostukset: ['Batu-kaani|Batu-kaanin', 'Juri Igorevitš|Juri Igorevitšin'],
    nappi: 'Ruhtinaskunnan pääkaupunki makaa jo 636 vuotta autiona mongolien tuhon jäljiltä',
    // 40.424167 E / 54.405278 N — en-Wikipedia "Siege of Ryazan" (coord-malline)
    laudat: {
      maailmankartta: { x: 7180.8, y: 1193.2 },
      europe: { x: 987.3, y: 462.7 },
    },
    teksti: 'Vanha Rjazan eli Staraja Rjazan oli Rjazanin ruhtinaskunnan alkuperäinen '
      + 'pääkaupunki Okajoen rannalla, noin 50 kilometriä nykyisestä Rjazanista itään. '
      + 'Joulukuussa 1237 Batu-kaanin mongolijoukot piirittivät kaupunkia viiden päivän '
      + 'ajan, ja 21. joulukuuta ne murtautuivat sisään heittokoneilla revittyjen muurien '
      + 'läpi. Hyökkääjät tappoivat ruhtinas Juri Igorevitšin puolisoineen ja lähes koko '
      + 'väestön sekä polttivat kaupungin maan tasalle — arkeologit ovat myöhemmin '
      + 'löytäneet joukkohautoja väkivaltaisesti kuolleista asukkaista. Kaupunkia ei '
      + 'koskaan rakennettu uudelleen, vaan ruhtinaskunnan pääkaupunki siirtyi pysyvästi '
      + 'Perejaslavl-Rjazanskiin, joka nimettiin vasta 1778 Rjazaniksi. Nykyisin entisen '
      + 'kaupungin paikalla näkyy enää maavalleja, ja se on arkeologinen kaivauskohde.',
    lahde: 'en-Wikipedia "Siege of Ryazan" (johdanto-osa) ja "Ryazan" (osio "History"), '
      + 'tarkistettu 21.9.2026.',
    ihme: {
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-staraja-rjazan-loistoaika.jpg',
      kadonnut: false,
      selite: 'Loistokaudellaan 1200-luvun alussa Vanha Rjazan oli Rjazanin ruhtinaskunnan '
        + 'vauras, linnoitettu pääkaupunki Okajoen rannalla, jonka puumuurien ja kivikirkkojen '
        + 'sisällä kauppiaat ja ruhtinaan hovi elivät vielä rauhan aikaa ennen mongolien tuloa.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. Faktat: '
        + 'en-Wikipedia "Siege of Ryazan" ja "Ryazan", tarkistettu 21.9.2026.',
      url: 'https://en.wikipedia.org/wiki/Siege_of_Ryazan',
    },
  },
];
