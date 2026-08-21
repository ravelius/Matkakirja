/*
 * Pelin tekijänoikeus ja kaikkien aineistojen lähdeluettelo.
 *
 * Omistajan päätös 4.8.2026: lähdemerkinnät pois kartan päältä ja
 * yhteen paikkaan — "matkalaukun alareuna, missä linkki 'Unohdettu
 * aarre', mikä avaa pop up ikkunan missä pelin copyright ja
 * tekijätiedot sekä lista kaikista lähteistä pelissä."
 *
 * TÄMÄ EI OLE KOKO TOTUUS VAAN SEN HAKEMISTO. Jokaisen yksittäisen
 * valokuvan, äänitteen ja väitteen oma lähde on siinä tiedostossa,
 * jossa sisältö on (kentät `lahde`, `aaniLahde`, `credit`, `source`
 * sekä pakettien otsikkokommentit). Tänne on koottu ne kokoelmat ja
 * aineistot, joista sisältö on peräisin — se, mitä lisenssit vaativat
 * näytettäväksi pelaajalle, ja se, mitä pelaaja voi haluta tarkistaa.
 *
 * Ylläpito: kun peliin tulee uusi aineisto, lisää rivi tänne JA
 * README.md:n "Lähteet ja aineistot" -lukuun. Kaksi paikkaa on
 * tarkoituksellista — luettelo kuuluu sekä peliin että repoon — mutta
 * ne on pidettävä samana.
 *
 * `lisenssi: null` tarkoittaa, ettei lisenssiä ole kirjattu repoon.
 * Se EI ole sama kuin "vapaa": rivi näkyy pelissä erikseen merkittynä,
 * jotta epäselvyys on näkyvä eikä unohdu.
 */

/** Pelin oma tekijänoikeus. Sanamuodot ovat LICENSE-tiedostosta. */
export const PELI = {
  nimi: 'Matkakirja ja unohdettu aarre',
  englanniksi: 'The Travel Journal and the Forgotten Treasure (ehdotus, vahvistetaan käännösvaiheessa)',
  copyright: 'Copyright © 2026 Sami Reivinen. Kaikki oikeudet pidätetään.',
  tekija: 'Suunnittelu, tarina, tekstit, kartat ja koodi: Sami Reivinen.',
  apu: 'Toteutuksessa avustanut Claude (Anthropic).',
  ehdot: 'Peliä saa pelata ja lähdekoodia lukea vapaasti. Julkaisuun, '
    + 'levitykseen, muunnelmiin tai omaan tuotteeseen tarvitaan tekijän '
    + 'kirjallinen lupa.',
  kolmannet: 'Pelin näyttämät valokuvat, äänet ja tiedot eivät ole tekijän '
    + 'omaisuutta. Ne ovat avoimilla lisensseillään, ja jokaisen lähde, '
    + 'tekijä ja lisenssi on merkitty alle sekä pelin sisältötiedostoihin. '
    + 'Kokoaminen peliin ei muuta niiden lisenssejä.',
  johdanto: 'Peli on saanut inspiraationsa Jules Vernen teoksista, mutta se '
    + 'ei jäljittele niitä eikä sillä ole yhteyttä niiden oikeudenhaltijoihin.',
};

/*
 * Lähteet ryhmiteltyinä. Rivi on { nimi, tekija, lisenssi, huom }.
 *
 * Järjestys ryhmien sisällä on karkeasti tärkeysjärjestys: se, mistä
 * sisältöä on eniten, ensin.
 */
export const LAHTEET = [
  {
    otsikko: 'Kartta- ja korkeusaineistot',
    johdanto: 'Rannikot, rajat, joet, vuoret ja meren syvyys.',
    rivit: [
      {
        nimi: 'Natural Earth — rannikot, maarajat, joet, järvet ja meri '
          + '(1:10m, 1:50m ja 1:110m)',
        tekija: 'Natural Earth, naturalearthdata.com',
        lisenssi: 'Public domain',
      },
      {
        nimi: 'ETOPO1 Global Relief Model, Ice Surface (1 kaariminuutti) — '
          + 'maaston korkeus, meren syvyys, varjostus ja reliefikartta',
        tekija: 'Amante & Eakins 2009, NOAA NGDC / NCEI '
          + '(doi:10.7289/V5C8276M); haettu NOAA CoastWatch ERDDAPista',
        lisenssi: 'Public domain (Yhdysvaltain liittovaltion virasto)',
      },
      {
        nimi: 'Earth at Night (Black Marble) 2016 — yökartan valot',
        tekija: 'NASA Earth Observatory / Visible Earth; NASA Goddard Space '
          + 'Flight Center, tutkija Miguel Román, kuvankäsittely Joshua Stevens (SSAI)',
        lisenssi: 'Public domain (NASA), lähteen maininta ehtona',
      },
    ],
  },
  {
    otsikko: 'Tietoaineistot',
    johdanto: 'Taikalasien eli linssien numerot ja rajat sekä maiden tunnusluvut.',
    rivit: [
      {
        nimi: 'Köppen–Geiger-ilmastoluokitus, nykyilmasto 1980–2016',
        tekija: 'Beck, Zimmermann, McVicar, Vergopolan, Berg & Wood 2018, '
          + 'Scientific Data 5:180214 (doi:10.1038/sdata.2018.214)',
        lisenssi: 'CC BY 4.0',
      },
      {
        nimi: 'Glottolog 5.2 — kielikuntien sukupuu ja kielten sijainnit',
        tekija: 'Hammarström, Forkel, Haspelmath & Bank 2025, Max Planck '
          + 'Institute for Evolutionary Anthropology',
        lisenssi: 'CC BY 4.0',
      },
      {
        nimi: 'World Development Indicators — bkt, elinikä, väkiluku, '
          + 'lukutaito ja kaupungistuminen',
        tekija: 'Maailmanpankki (World Bank Open Data)',
        lisenssi: 'CC BY 4.0',
      },
      {
        nimi: 'World Happiness Report 2026, Cantrilin tikapuu',
        tekija: 'Helliwell, Layard, Sachs, De Neve, Aknin & Wang (toim.), '
          + 'University of Oxford; koneluettavana koosteena Our World in Data',
        lisenssi: 'Vapaa käyttö; Our World in Datan oma käsittely CC BY 4.0',
      },
      {
        nimi: 'Liberaalin demokratian indeksi',
        tekija: 'V-Dem-instituutti, jaeltuna Our World in Datan kautta',
        lisenssi: null,
        huom: 'Lisenssiä ei ole kirjattu repoon; molemmat julkaisijat käyttävät '
          + 'yleensä CC BY -ehtoja, mutta sitä ei ole tarkistettu tänne.',
      },
      {
        nimi: 'International Migrant Stock 2024 — muuttajakannat maittain',
        tekija: 'United Nations, Department of Economic and Social Affairs, '
          + 'Population Division (POP/DB/MIG/Stock/Rev.2024), © 2024 United Nations',
        lisenssi: 'CC BY 3.0 IGO',
      },
      {
        nimi: 'ICOADS 2° enhanced — laivahavaintojen tuulet 1971–2000',
        tekija: 'Freeman ym. 2017, International Journal of Climatology '
          + '37:2211–2232; tuote NOAA PSL',
        lisenssi: 'Vapaasti käytettävä (NOAA); ei tarkoitettu oikeudelliseen käyttöön',
      },
      {
        nimi: 'OSCAR Sea Surface Velocity — pintavirtaukset',
        tekija: 'Bonjean & Lagerloef 2002, Journal of Physical Oceanography '
          + '32:2938–2954; Earth & Space Research, NASAn rahoituksella',
        lisenssi: 'Vapaasti jaeltava tutkimusaineisto',
      },
      {
        nimi: 'Global Atmospheric Circulations — tuulivyöhykkeiden nimet ja '
          + 'kolmen kierron malli',
        tekija: 'NOAA / National Weather Service, JetStream',
        lisenssi: 'Public domain (Yhdysvaltain liittovaltion virasto)',
      },
      {
        nimi: 'Yale Bright Star Catalogue, 5. uudistettu laitos — 1656 tähteä',
        tekija: 'Hoffleit & Warren 1991, NASA Astronomical Data Center; '
          + 'jakelu CDS / VizieR (V/50, doi:10.26093/cds/vizier)',
        lisenssi: null,
        huom: 'Erillistä lisenssitekstiä ei ole. CDS jakaa luetteloa vapaasti ja '
          + 'pyytää mainitsemaan VizieRin ja luettelon tekijät — se on tehty tässä.',
      },
      {
        nimi: 'ConstellationLines — 88 tähdistön tikkukuviot',
        tekija: 'Marc van der Sluys 2005–2023 (doi:10.5281/zenodo.10397192)',
        lisenssi: 'CC BY 4.0',
        huom: 'Aineistotiedoston otsikkorivi sanoo CC BY-SA 4.0. Ristiriita on '
          + 'lähteessä; tässä noudatetaan repon virallista lisenssiä.',
      },
      {
        nimi: 'IAU Catalog of Star Names — tähtien viralliset erisnimet',
        tekija: 'International Astronomical Union, Working Group on Star Names 2022',
        lisenssi: 'CC BY',
      },
      {
        nimi: 'Wikidata — koordinaatit, ISO-koodit, maannimet ja puhujamäärät',
        tekija: 'Wikidata-yhteisö',
        lisenssi: 'CC0 1.0',
      },
      {
        nimi: 'Ihmisen leviämisen ajoitukset',
        tekija: 'Julkaistut tutkimusartikkelit: Hublin ym. 2017 ja 2020, Richter '
          + 'ym. 2017, Vidal ym. 2022, Hershkovitz ym. 2018, Groucutt ym. 2018, '
          + 'Clarkson ym. 2017, Fu ym. 2014, Bennett ym. 2021, Dillehay ym. 2008, '
          + 'Wilmshurst ym. 2011, Iasi ym. 2024',
        lisenssi: 'Lainauksia julkaistuista tutkimuksista; viite jokaisella rivillä',
      },
      {
        nimi: 'Silkkitien kauppakaupungit, reitit ja valtakuntien rajat',
        tekija: 'UNESCO Silk Roads Programme; International Dunhuang Programme '
          + '(British Library); Silk Road Seattle (University of Washington); '
          + 'Encyclopaedia Britannica; Wikipedia',
        lisenssi: 'Koordinaatit ja vuosiluvut ovat tosiasioita; selitetekstit '
          + 'kirjoitettu itse. Rajaviivat ovat tulkintoja, eivät mittauksia.',
      },
    ],
  },
  {
    otsikko: 'Valokuvat ja kuvitus',
    johdanto: 'Kuvakortit, kaupunkigalleriat, kulttuurinostot ja maastotekstien kuvat.',
    rivit: [
      {
        nimi: 'Wikimedia Commons — pelin valokuvien pääasiallinen lähde',
        tekija: 'Kuvaajat tiedostokohtaisesti; nimi ja lisenssi näkyvät kuvan '
          + 'selitteessä pelissä',
        lisenssi: 'Public domain, CC0, CC BY ja CC BY-SA. ND- ja NC-ehtoiset '
          + 'kuvat on rajattu pois.',
      },
      {
        nimi: 'Library of Congress — vanhat vedokset ja lasilevyt',
        tekija: 'mm. Matson Photo Service -kokoelma, Sergei Prokudin-Gorskin '
          + 'kokoelma ja Photochrom-kokoelma 1890–1910',
        lisenssi: 'Public domain',
      },
      {
        nimi: 'Rijksmuseum — vanhat piirrokset ja vedokset',
        tekija: 'Rijksmuseum, Amsterdam',
        lisenssi: 'Public domain',
      },
      {
        nimi: 'Internet Archive Book Images — kirjojen kuvitukset',
        tekija: 'Internet Archive',
        lisenssi: 'Public domain',
      },
      {
        nimi: 'Lippukuvat',
        tekija: 'Wikimedia Commons; valtaosa valtiontunnuksia. Nimeämistä '
          + 'vaativat neljä on lueteltu tiedostossa js/packs/lippu-tekijat.js: '
          + 'Sérgio Horta / Ungoliant MMDCCLXIV, Angelus, Daniele Schirmo '
          + '(Frankie688) ja Hosmich.',
        lisenssi: 'Public domain sekä CC BY-SA 2.5 ja 3.0',
      },
      {
        nimi: 'Kartan grafiikka, laattojen kuvakkeet, pulmien piirrokset, '
          + 'lehtien minitehtävien aikakausjulisteet ja sovelluskuvakkeet',
        tekija: 'Pelin omaa aineistoa (Sami Reivinen)',
        lisenssi: 'Copyright © 2026 Sami Reivinen',
      },
    ],
  },
  {
    otsikko: 'Äänet',
    johdanto: 'Kaupunkien äänimaisemat, kielinäytteet, radio ja tehosteet.',
    rivit: [
      {
        nimi: 'radio aporee ::: maps — kenttä-äänitykset kaupungeista '
          + '(äänimaisemat ja "Kuuntele kieltä")',
        tekija: 'Äänittäjät kohteittain; jakelu archive.orgin kautta. Nimi ja '
          + 'lisenssi näkyvät äänen selitteessä pelissä.',
        lisenssi: 'Public domain, CC BY, CC BY-SA ja CC BY-NC kohteittain',
      },
      {
        nimi: 'Freesound — äänimaisemat ja tehosteet (mm. nopan heitto, '
          + 'kirjoituskone, potkurikone, sivun kääntö)',
        tekija: 'Äänittäjät kohteittain, mm. LoafDV, brktkrgll, Hoscalegeek, AardsReal',
        lisenssi: 'CC0, CC BY ja CC BY-NC kohteittain',
      },
      {
        nimi: 'Lyhytaaltoäänitteet — maailmanradion viritysäänet',
        tekija: 'archive.orgin arkistot, mm. samnewton94',
        lisenssi: 'Public Domain Mark 1.0 ja CC0',
      },
      {
        nimi: '"Pocket camera start and shut down" — kartan zoomausääni',
        tekija: 'stephan, pdsounds.org Wikimedia Commonsin kautta',
        lisenssi: 'Public domain',
      },
      {
        nimi: 'Musiikkinäytteet kulttuurinostoissa',
        tekija: 'Wikimedia Commons sekä archive.org (vain kohteet, joilla on '
          + 'merkitty lisenssiosoite)',
        lisenssi: 'Kohteittain; ilman lisenssimerkintää olevat on jätetty pois',
      },
      {
        nimi: 'Suorat radiolähetykset — maailmanradio',
        tekija: 'Asemaluettelo koottu Radio Browserista (radio-browser.info); '
          + 'lähetysvirrat ovat asemien omia',
        lisenssi: null,
        huom: 'Asemaluettelo on avointa dataa, mutta itse lähetysten '
          + 'edelleenvälityksen ehtoja ei ole selvitetty. Peli soittaa aseman '
          + 'julkista virtaa suoraan eikä tallenna sitä.',
      },
      {
        nimi: 'Peliäänet ja avaustekstin lukuääni (efekti-*.mp3, intro-puhe.mp3)',
        tekija: 'Tuotettu ElevenLabsilla',
        lisenssi: null,
        huom: 'Käyttöoikeus perustuu ElevenLabsin tilausehtoihin; niitä ei ole '
          + 'kirjattu repoon.',
      },
      {
        nimi: 'Syntetisoidut tehosteet ja ambienssi (Web Audio)',
        tekija: 'Pelin omaa aineistoa (js/sound.js)',
        lisenssi: 'Copyright © 2026 Sami Reivinen',
      },
    ],
  },
  {
    otsikko: 'Tekstit',
    johdanto: 'Tietovisat, tiivistelmät, artikkelit ja aikalaislainaukset.',
    rivit: [
      {
        nimi: 'Wikipedia (suomi ja englanti) — "Lue lisää" -tiivistelmät ja '
          + 'artikkelit sekä kysymysten ja väittämien tarkistuslähteet',
        tekija: 'Wikipedian kirjoittajat',
        lisenssi: 'CC BY-SA — maininta ja linkki artikkeliin näkyvät pelissä',
      },
      {
        nimi: 'Project Gutenberg — aikalaislainaukset matkakertomuksista ja '
          + 'tutkimusmatkakirjallisuudesta',
        tekija: 'Alkuperäisteosten kirjoittajat; digitointi Project Gutenberg',
        lisenssi: 'Public domain (teokset)',
      },
      {
        nimi: 'Internet Archive ja Wikisource — lainaukset, joita Gutenbergissa '
          + 'ei ole',
        tekija: 'Alkuperäisteosten kirjoittajat',
        lisenssi: 'Public domain (teokset)',
      },
      {
        nimi: 'Pelin omat tekstit: tarina, päiväkirjamerkinnät, kysymykset, '
          + 'väittämät, tapahtumakortit, pulmat ja tiivistelmät',
        tekija: 'Sami Reivinen',
        lisenssi: 'Copyright © 2026 Sami Reivinen',
      },
    ],
  },
];

/** Rivien yhteismäärä — otsikkoon, jottei sitä tarvitse laskea käsin. */
export const LAHTEITA = LAHTEET.reduce((n, ryhma) => n + ryhma.rivit.length, 0);
