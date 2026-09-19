/*
 * MAASTOKOHTEET — CHE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CHE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CHE.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * ── K2-ERÄ 2.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ───────────
 *
 * Omistaja 2.9.2026: *"pitäisi jatkaa kaikki Euroopan maat loppuun
 * näiden karttanostojen osalta."* Sveitsi oli yksi laudan tyhjimmistä
 * maista: kahdeksan karttamerkkiä ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-che.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei voitu
 * tehdä tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (La Chaux-de-Fonds)
 * on 29,1 lautayksikön päässä lähimmästä pelikaupungista, eli
 * reilusti yli kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä — omistajan sääntö kohdekaupunkien
 * nostoista ei koske näitä.
 *
 * KUVAT (20.9.2026). Vanhat kuvattomat kortit ovat saaneet kaksi Commons-kuvaa
 * (PD/CC, lisenssi ja tekijä Commonsin rajapinnasta), ämpärin osoite
 * karttanostot/20260920/.
 *
 * Sveitsin maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 */
export const MAASTOKOHTEET_CHE = [
  {
    id: 'dufourspitze',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-dufourspitze-338dca2c.jpg',
      lyhyt: 'Monte Rosan lumihuippuinen massiivi ja jäätikkö Gornergratilta nähtynä.',
      selite: 'Monte Rosan massiivin korkein huippu Dufourspitze (4 634 m) kohoaa lumen ja jäätiköiden peittämänä kirkkaan sinistä taivasta vasten.',
      lahde: 'Valokuva: Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ximonic (Simo Räsänen)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dufourspitze_(Monte_Rosa)_and_Monte_Rosa_Glacier_as_seen_from_Gornergrat,_Wallis,_Switzerland,_2012_August.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-dufourspitze-97babe83.jpg',
        lyhyt: 'Monte Rosan jyrkkä itäseinämä ilmasta nähtynä.',
        selite: 'Ilmakuva Monte Rosan massiivin yli kahden kilometrin korkuisesta itäseinämästä, jonka huipulla kohoaa Dufourspitze.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_Monte_Rosa_east_face_(view_from_the_east).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dufourspitze',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka Guillaume-Henri Dufour oli?',
      'Kuinka monta neljäntuhannen metrin huippua Monte Rosassa on?',
    ],
    korostukset: ['Monte Rosa|Monte Rosa'],
    nappi: 'Sveitsin korkein huippu',
    // 7.8667 E / 45.9369 N — en-Wikipedia "Monte Rosa" (massiivin koordinaatti)
    laudat: {
      maailmankartta: { x: 6095.6, y: 1563 },
      europe: { x: 362.2, y: 685.5 },
    },
    teksti: 'Dufourspitze on 4 634 metriä korkea ja Alppien sekä Länsi-Euroopan toiseksi korkein '
      + 'vuori heti Mont Blancin jälkeen. Se on Monte Rosa -massiivin korkein huippu '
      + 'Pennialpeilla ja kokonaan Sveitsin puolella, ja se on nimetty maanmittari '
      + 'Guillaume-Henri Dufourin mukaan. Massiivissa on useita muitakin yli neljäntuhannen '
      + 'metrin huippuja, ja se on vedenjakaja Rhônen ja Pon vesistöjen välillä.',
    lahde: 'en-Wikipedia "Monte Rosa", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'matterhorn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-matterhorn-88a7024d.jpg',
      lyhyt: 'Matterhornin jyrkkä pyramidihuippu Zermattin suunnasta.',
      selite: 'Matterhornin lumen peittämä koillisseinämä kohoaa kirkkaan sinistä taivasta vasten Zermattin laakson yläpuolella.',
      lahde: 'Valokuva: Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ximonic (Simo Räsänen)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Matterhorn_as_seen_from_Zermatt,_Wallis,_Switzerland,_2012_August.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-matterhorn-1837ca35.jpg',
        lyhyt: 'Matterhorn heijastuu Stellisee-järven pintaan auringonlaskussa.',
        selite: 'Matterhornin terävä huippu ja värikkäät pilvet peilautuvat tyyneen Stellisee-järveen.',
        lahde: 'Valokuva: Giles Laurent, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Giles Laurent',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:043_Matterhorn_reflecting_in_Stellisee_at_sunset_Photo_by_Giles_Laurent.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Matterhorn',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka nousi Matterhornille ensimmäisenä?',
      'Miksi Matterhorn on niin tarkan pyramidin muotoinen?',
    ],
    korostukset: ['Pennialpit|Pennialpeilla'],
    nappi: 'Maailman kuvatuin vuori',
    // 7.6586 E / 45.9764 N — en-Wikipedia "Matterhorn"
    laudat: {
      maailmankartta: { x: 6088.6, y: 1561.3 },
      europe: { x: 358.2, y: 684.4 },
    },
    teksti: 'Matterhorn seisoo Sveitsin ja Italian rajalla päävedenjakajalla, ja sen 4 478 metrin '
      + 'huippu on lähes symmetrinen pyramidi Pennialpeilla Monte Rosan alueella. Sitä on '
      + 'kutsuttu vuorten vuoreksi ja Sveitsin sekä koko Alppien tunnukseksi. Sitä on myös '
      + 'kuvattu maailman kauneimmaksi vuoreksi ja väitetty maailman valokuvatuimmaksi.',
    lahde: 'en-Wikipedia "Matterhorn", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'jungfrau',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-jungfrau-b3973167.jpg',
      lyhyt: 'Jungfraun lumiset rinteet Kleine Scheideggin suunnasta.',
      selite: 'Jungfrau (4 158 m) kohoaa Bernin Alppien jäätikköisenä huippuna vihreän alppiniityn ja polun yläpuolella.',
      lahde: 'Valokuva: Dirk Beyer, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Dirk Beyer',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jungfrau_2416.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-jungfrau-1279d63c.jpg',
        lyhyt: 'Kleine Scheidegg talvisessa lumimaisemassa Jungfraun juurella.',
        selite: 'Kleine Scheideggin rakennukset ja hiihtorinteet lumen keskellä, taustalla Jungfrau.',
        lahde: 'Valokuva: Albinfo, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Albinfo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kleine_Scheidegg_und_Jungfrau.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Jungfrau',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Eiger ja Mönch?',
      'Miten Jungfraulle päästään nykyään?',
    ],
    nappi: 'Kolmen vuoren muurista korkein',
    // 7.9626 E / 46.5368 N — en-Wikipedia "Jungfrau"
    laudat: {
      maailmankartta: { x: 6098.8, y: 1538 },
      europe: { x: 364.1, y: 669.7 },
    },
    teksti: 'Jungfrau kohoaa 4 158 metriin ja on yksi Bernin Alppien päähuipuista Bernin ja '
      + 'Valais\'n kantonien välissä, puolimatkassa Interlakenista Fieschiin. Yhdessä Eigerin ja '
      + 'Mönchin kanssa se muodostaa valtavan vuorimuurin, joka kohoaa Bernin Oberlandin ja '
      + 'Sveitsin ylätasangon yllä. Muuri on Sveitsin Alppien tunnistettavimpia näkyjä.',
    lahde: 'en-Wikipedia "Jungfrau", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rein',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-rein-11ae70f6.jpg',
      lyhyt: 'Reinin (Vorderrhein) vaaleiden kallioseinämien reunustama rotko Graubündenissä.',
      selite: 'Vaaleat, jyrkät kalliot kohoavat metsän ja Vorderrhein-joen yläpuolella Ruinaulta-rotkossa, jossa kulkee myös rautatie.',
      lahde: 'Valokuva: JoachimKohler-HB, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JoachimKohler-HB',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rheinschlucht_bei_Versam-Safien_(2014).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-rein-4a77cac5.jpg',
        lyhyt: 'Tomasee, Vorderrheinin lähdejärvi Graubündenin Alpeilla.',
        selite: 'Kirkkaansininen vuoristojärvi rinteiden ja kalliojyrkänteiden ympäröimänä. Tomasee lasketaan Vorderrheinin ja siten koko Reinin lähdejärveksi.',
        lahde: 'Valokuva: Albinfo, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Albinfo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tomasee_1.JPG',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Rein',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Reinin varsinainen lähde on?',
      'Kuinka monen maan rajaa Rein muodostaa?',
    ],
    nappi: 'Joki, joka alkaa Sveitsistä',
    // 9.53 E / 46.85 N — Chur Alppien Reinin varrella; artikkelin koordinaatti 4,081 / 51,982 on suistossa Alankomaissa
    laudat: {
      maailmankartta: { x: 6151, y: 1524.8 },
      europe: { x: 394.2, y: 661.4 },
    },
    teksti: 'Rein on yksi Euroopan suurista joista, ja se alkaa Graubündenin kantonista '
      + 'Kaakkois-Sveitsin Alpeilta. Se muodostaa osan Sveitsin ja Liechtensteinin sekä '
      + 'Sveitsin ja Itävallan rajasta, ja Bodenjärvestä alaspäin osan Sveitsin ja Saksan '
      + 'rajasta. Sieltä se jatkaa Ranskan ja Saksan rajaa, kääntyy pohjoiseen Saksan halki ja '
      + 'laskee lopulta Alankomaissa Pohjanmereen.',
    lahde: 'en-Wikipedia "Rhine", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rhone',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-rhone-de5ac5f6.jpg',
      lyhyt: 'Rhônen jäätikkö Valais\'n Alpeilla, joen lähde.',
      selite: 'Halkeillut jäätikkö laskeutuu vuorten välistä; kaukana jäätikön pinnalla näkyy pieniä retkeilijöitä. Rhône saa alkunsa jäätikön alta.',
      lahde: 'Valokuva: Jamcib, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Jamcib',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Glacier_du_Rhône_2009.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-rhone-4caad0c3.jpg',
        lyhyt: 'Rhône virtaa Sionin kohdalla Valais\'n laaksossa.',
        selite: 'Leveä Rhône-joki, kaareva kävelysilta ja viinitarharinteet Sionin lähellä Valais\'n kantonissa.',
        lahde: 'Valokuva: Tiia Monto, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Tiia Monto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rhône_River_in_Sion_2.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Rhône',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Rhône-jäätikkö on?',
      'Miksi Genevenjärvi on niin kirkas?',
    ],
    nappi: 'Joki, joka syntyy jäätiköllä',
    // 7.36 E / 46.23 N — Sion Valais'n Rhône-laaksossa; artikkelin koordinaatti 4,846 / 43,331 on suistossa Ranskassa
    laudat: {
      maailmankartta: { x: 6078.7, y: 1550.8 },
      europe: { x: 352.5, y: 677.8 },
    },
    teksti: 'Rhône saa alkunsa Alpeilta Sveitsin Valais\'n kantonista, virtaa Genevenjärven läpi ja '
      + 'jatkaa siitä Kaakkois-Ranskaan ja Välimereen. Sveitsin puolella se kulkee koko '
      + 'Valais\'n laakson pituudelta. Arles\'n kohdalla lähellä suistoa se jakautuu Suureksi ja '
      + 'Pieneksi Rhôneksi.',
    lahde: 'en-Wikipedia "Rhône", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'kapellbrucke',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-kapellbrucke-f6ccdea3.jpg',
      lyhyt: 'Kapellbrücke ja Wasserturm-vesitorni Reuss-joen yllä Luzernissa.',
      selite: 'Katettu puinen silta kukkaistutuksineen ulottuu Reussin yli, ja sen vieressä kohoaa kivinen kahdeksankulmainen vesitorni.',
      lahde: 'Valokuva: Ikiwaner, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ikiwaner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luzern_Kapellbruecke.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-kapellbrucke-1d6cd0a2.jpg',
        lyhyt: 'Katetun sillan sisäpuoli, jonka orsien alla on maalattuja kolmiotauluja.',
        selite: 'Puinen käytävä jatkuu pitkälle Reussin yli, ja kattoristikoiden alla riippuu 1600-luvulla maalattuja kolmionmuotoisia kuvatauluja.',
        lahde: 'Valokuva: Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Dennis G. Jarvis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Switzerland-03442_-_Chapel_Bridge_Paintings_(23216397583).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Kapellbrücke',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi sillan kolmiokehykset ovat ainutlaatuisia?',
      'Mihin Wasserturmia on käytetty?',
    ],
    korostukset: ['Wasserturm|Wasserturm'],
    nappi: 'Euroopan vanhin katettu puusilta',
    // 8.3075 E / 47.0517 N — en-Wikipedia "Kapellbrücke"
    laudat: {
      maailmankartta: { x: 6110.3, y: 1516.3 },
    },
    teksti: 'Kapellbrücke on katettu puinen kävelysilta, joka ylittää Reussin '
      + 'vinottain keskellä Luzernia. Nimensä se on saanut viereisestä Pyhän '
      + 'Pietarin kappelista. Silta rakennettiin noin vuonna 1365 osaksi kaupungin '
      + 'linnoituksia: se yhdisti vanhankaupungin oikealla rannalla uuteen '
      + 'kaupunkiin vasemmalla ja suojasi kaupunkia järven suunnasta tulevalta '
      + 'hyökkäykseltä. Alun perin se oli yli 270 metriä pitkä; lyhennysten ja '
      + 'rantatäyttöjen jälkeen pituus on 204,7 metriä.\n\n'
      + 'Siltakokonaisuuteen kuuluu kahdeksankulmainen, maasta mitattuna 34,5 metriä '
      + 'korkea Wasserturm eli vesitorni — torni, joka seisoo vedessä. Se on noin '
      + 'kolmekymmentä vuotta siltaa vanhempi, ja sitä on vuosisatojen mittaan '
      + 'käytetty vankilana, kidutuskammiona ja myöhemmin kaupungin arkistona ja '
      + 'rahastona.\n\n'
      + 'Sillan sisäkatossa on kolmion muotoisia maalauksia 1600-luvulta. Luzern on '
      + 'siinä ainutlaatuinen: kaupungin kolmessa puisessa kävelysillassa oli '
      + 'kaikissa maalatut kolmiokehykset, eikä yhdessäkään muussa Euroopan '
      + 'puusillassa ole tätä piirrettä. Maalaukset teki paikallinen maalari Hans '
      + 'Heinrich Wägmann. Elokuun 18. päivänä 1993 silta paloi lähes kokonaan ja '
      + 'kaksi kolmasosaa maalauksista tuhoutui; silta avattiin uudelleen '
      + '14. huhtikuuta 1994.',
    lahde: 'en-Wikipedia "Kapellbrücke", johdanto-osa sekä osiot "History" ja '
      + '"Paintings" (tarkistettu 2.9.2026).',
  },
  {
    id: 'stiftsbibliothek',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-stiftsbibliothek-d24194e4.jpg',
      lyhyt: 'St. Gallenin luostarikirjaston barokkisali kirjahyllyineen ja kattofreskoineen.',
      selite: 'Kirjahyllyjen reunustama sali, jossa on puukoristeellinen parkettilattia, parvekekäytävät ja lasivitriinejä, ja katossa maalauksia sekä stukkia.',
      lahde: 'Valokuva: Martin Thurnherr, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Martin Thurnherr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stiftsbibliothek_St,_Gallen_Barocksaal_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-stiftsbibliothek-8472edd4.jpg',
        lyhyt: 'St. Gallenin luostarikirjaston sali pitkittäin katsottuna, katossa rokokoofreskoja.',
        selite: 'Kirjaparvekkeiden ja hyllyjen välissä avautuu pitkä sali, jonka lattiassa on kuviollinen puuparketti ja katossa maalauksia sekä stukkikoristeita.',
        lahde: 'Valokuva: Bobo11, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Bobo11',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stiftsbibliothek_Saal_2023_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Stiftsbibliothek',
    tyyppi: 'sana',
    kysymykset: [
      'Mitä oven yllä oleva kreikankielinen kirjoitus tarkoittaa?',
      'Mistä näkee, mitä kirjakaapissa on?',
    ],
    korostukset: ['inkunaabeli|inkunaabelia'],
    nappi: 'Sielun parantola',
    // 9.3764 E / 47.4228 N — en-Wikipedia "Abbey library of Saint Gall"
    laudat: {
      maailmankartta: { x: 6145.9, y: 1500.7 },
    },
    teksti: 'St. Gallenin luostarikirjasto on yksi maailman vanhimmista '
      + 'luostarikirjastoista. Sen perusti Pyhä Othmar, luostarin perustaja. Kun '
      + 'luostari paloi vuonna 937, kirjasto säilyi ehjänä. Nykyinen kirjastosali '
      + 'rakennettiin vuosina 1758–1767 arkkitehti Peter Thumbin rokokoopiirustusten '
      + 'mukaan. Oven yllä lukee kreikaksi ΨΥΧΗΣ ΙΑΤΡΕΙΟΝ, "sielun parantola" — '
      + 'kirjoitus on lainattu Ramses II:n kirjaston kaiverruksesta.\n\n'
      + 'Kokoelma on Sveitsin vanhin: lähes 160 000 nidettä, joista 1 650 on '
      + 'inkunaabelia eli ennen vuotta 1500 painettua kirjaa, ja 2 100 käsikirjoitusta '
      + '700-luvulta 1400-luvulle. Käsikirjoitukset ovat lasikaapeissa, ja jokaisen '
      + 'kaapin päällä on veistetty kerubi, joka kertoo katseella mitä hyllyssä on: '
      + 'tähtitieteen kaapin kerubi tähyilee kirjoja kaukoputkella.\n\n'
      + 'Talossa on kaksi kuuluisaa vierasta. Nibelungenliedin käsikirjoitus B '
      + 'säilytetään täällä, ja kirjastossa asuu myös muumio, Shep-en-Isis. '
      + 'Kirjasto ja luostari otettiin maailmanperintöluetteloon 1983 esimerkkinä '
      + 'suuresta karolingisesta luostarista, joka oli 700-luvulta vuoden 1805 '
      + 'sekularisaatioon asti yksi Euroopan tärkeimmistä kulttuurikeskuksista.',
    lahde: 'en-Wikipedia "Abbey library of Saint Gall", johdanto-osa sekä osiot '
      + '"History and architecture" ja "Collections" (tarkistettu 2.9.2026).',
  },
  {
    id: 'chillon',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-chillon-8052ab90.jpg',
      lyhyt: 'Chillonin linna Genevenjärven rannalla, taustalla lumihuippuiset Dents du Midi -vuoret.',
      selite: 'Kivilinna torneineen kohoaa suoraan järven rannalta, ja taustalla näkyy lumen peittämä vuoristo.',
      lahde: 'Valokuva: Christian David, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Christian David',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Château_de_Chillon_and_the_snow-capped_Dents_du_Midi,_Veytaux,_Vaud.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-chillon-f7cbddb1.jpg',
        lyhyt: 'Chillonin linnan katettu puusilta ja tornit.',
        selite: 'Kivipilarien varassa seisova katettu puusilta johtaa linnan portille, ja taustalla kohoavat linnan tornit ja kivimuurit.',
        lahde: 'Valokuva: Llez, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Llez',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Château_de_Chillon_-_Veytaux_06.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Chillonin linna',
    nimio: 'Chillon',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linna rakennettiin juuri tähän kohtaan?',
      'Mitä nimi Chillon tarkoittaa?',
    ],
    korostukset: ['tulli|tullia'],
    nappi: 'Linna kalliolautalla Genevenjärvessä',
    // 6.9275 E / 46.4142 N — en-Wikipedia "Chillon Castle"
    laudat: {
      maailmankartta: { x: 6064.3, y: 1543.1 },
    },
    teksti: 'Chillonin linna seisoo pienellä jyrkkäreunaisella kalkkikivisaarella '
      + 'Genevenjärvessä, Montreux’n ja Villeneuven välisellä kapealla rannalla. '
      + 'Sveitsiläisen kansatieteilijän Albert Samuel Gatschet’n mukaan nimi tulee '
      + 'valdolaismurteen sanasta, joka tarkoittaa litteää kiveä tai lavaa: vuodesta '
      + '1195 tunnettu Castrum Quilonis olisi siis "kalliolavalle rakennettu linna".\n\n'
      + 'Paikka on valittu tarkasti. Linna vartioi kulkua Vaud’n rivieran — reitin '
      + 'pohjoiseen Saksaan ja Ranskaan — ja Rhônen laakson välillä, joka on nopea tie '
      + 'Italiaan. Varuskunta pystyi siis valvomaan Italian-tietä sekä sotilaallisesti '
      + 'että kaupallisesti ja perimään tullia ohikulkijoilta.\n\n'
      + 'Neliömäinen päätorni rakennettiin saarelle 1000-luvulla valvomaan '
      + 'Burgundista Suuren Pyhän Bernhardin solaan johtavaa tietä. Vuoden 1150 '
      + 'asiakirja osoittaa linnan kuuluneen Savoijin suvulle, ja 1100-luvun '
      + 'puolivälistä se oli Savoijin kreivien kesäasunto; heillä oli järvellä oma '
      + 'laivasto. Kreivi Pietari II laajensi linnaa 1248 ja 1266–67, ja sen '
      + 'omaleimaiset ikkunat teki mestari Jaakko Saint Georgelainen. Bernin '
      + 'kaupunki hallitsi linnaa vuodesta 1536 vuoteen 1798; nyt se kuuluu Vaud’n '
      + 'kantonille.',
    lahde: 'en-Wikipedia "Chillon Castle", johdanto-osa sekä osiot "Etymology", '
      + '"Introduction" ja "History/Savoy period" (tarkistettu 2.9.2026).',
  },
  {
    id: 'gotthardin-tunneli',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-gotthardin-tunneli-92cb82c2.jpg',
      lyhyt: 'Gotthardin rautatietunnelin pohjoisportaali Göschenenissä.',
      selite: 'Kivinen tunnelin suuaukko, jossa roomalaisin numeroin merkitty vuosiluku 1882, ja sen edessä junaraiteita.',
      lahde: 'Valokuva: Kecko, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Kecko',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Göschenen_traforo_Gottardo_portale_nord.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-gotthardin-tunneli-d7f72faa.jpg',
        lyhyt: 'Vanha valokuva Gotthardin tunnelin portaalista ja Göschenenin rautatiealueesta.',
        selite: '1800-luvun valokuvassa tunnelin kivinen suuaukko avautuu vuorenrinteen alla, ja sen edessä näkyvät raiteet, silta, vartijan talo sekä Reuss-joki.',
        lahde: 'Valokuva: Giorgio Sommer, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Giorgio Sommer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:SBB_Historic_-_F_111_00001_027_-_Göschenen,_Reussbrücke,_Gotthard-Tunnelportal_und_Wärterhaus.tiff',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gotthardin tunneli',
    nimio: 'Gotthard',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi Louis Favre ei nähnyt tunnelin valmistuvan?',
      'Mikä uusi keksintö otettiin täällä ensi kertaa suureen käyttöön?',
    ],
    korostukset: ['dynamiitti|dynamiittia'],
    nappi: 'Viisitoista kilometriä vuoren läpi',
    // 8.5956 E / 46.5956 N — en-Wikipedia "Gotthard Tunnel"
    laudat: {
      maailmankartta: { x: 6119.9, y: 1535.5 },
    },
    teksti: 'Gotthardin tunneli on viisitoista kilometriä pitkä rautatietunneli, '
      + 'joka yhdistää Göschenenin ja Airolon Saint-Gotthardin vuorimassiivin läpi. '
      + 'Se oli ensimmäinen tunneli massiivin läpi ja kiersi vanhan Gotthardin solan. '
      + 'Kun se avattiin 1882, se oli maailman pisin tunneli.\n\n'
      + 'Varsinainen louhinta alkoi vuonna 1871 ja kesti kymmenen vuotta. Tunnelia '
      + 'kaivettiin molemmista päistä yhtä aikaa, mikä vaati tarkkaa maanmittausta. '
      + 'Työmaa oli ensimmäinen paikka, jossa vasta 1867 patentoitua dynamiittia '
      + 'käytettiin suuressa mitassa, ja urakoitsija Louis Favre ajoi läpi myös '
      + 'koneellisten poravaunujen käytön. Energia siirrettiin työmaalle '
      + 'paineilmana genevalaisen insinööri Colladonin ehdotuksesta, ja kalliopintaa '
      + 'jäähdytettiin vesisuihkuilla.\n\n'
      + 'Hinta oli kova. Yhdessä ainoassa onnettomuudessa kuoli noin 200 työmiestä, '
      + 'suurin osa paineilmaveturien alle; muita kuoli kivivyöryissä ja '
      + 'räjähdyksissä. Selvinneistä moni sairastui koukkumatoepidemiassa, jonka '
      + 'tutkiminen vei loisoppia eteenpäin. Vuonna 1875 työläiset menivät lakkoon, '
      + 'ja Altdorfin poliisit tukahduttivat sen väkivaltaisesti: neljä työmiestä '
      + 'kuoli. Favre itse sai sydänkohtauksen tunnelissa 19. heinäkuuta 1879, '
      + 'puoli vuotta ennen läpimurtoa.\n\n'
      + 'Läpimurto tapahtui 29. helmikuuta 1880, ja mittaustarkkuus osoittautui '
      + 'erinomaiseksi. Insinööri Adolphe Gautier kutsui työtä aikanaan "suurimmaksi '
      + 'teoksi, mihin ihminen on tähän mennessä ryhtynyt".',
    lahde: 'en-Wikipedia "Gotthard Tunnel", johdanto-osa ja osio '
      + '"History/Construction" (tarkistettu 2.9.2026).',
  },
  {
    id: 'grand-st-bernard',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-grand-st-bernard-883627e1.jpg',
      lyhyt: 'Suuren Pyhän Bernhardin hospitaalin rakennukset vuoristosolassa.',
      selite: 'Vaaleat, useampikerroksiset hospitaalirakennukset seisovat karun vuoristorinteen juurella solatien varrella; pihalla näkyy pieni joukko kävijöitä ja autoja.',
      lahde: 'Valokuva: Ludovic Péron, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ludovic Péron',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hospice_du_Grand_Saint-Bernard_-_1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-grand-st-bernard-367dd5ff.jpg',
        lyhyt: 'Hospitaali ja jäinen vuoristojärvi Suuren Pyhän Bernhardin solassa.',
        selite: 'Jäätynyt ja osin sulanut järvi lumen keskellä, sen takana hospitaalirakennus ja lumiset vuorenhuiput.',
        lahde: 'Valokuva: Olaf brandt, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Olaf brandt',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blick_auf_den_vereisten_See_und_das_Hospiz_am_Grossen_St._Bernhard_Pass.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Suuren Pyhän Bernhardin hospitaali',
    nimio: 'Pyhä Bernhard',
    tyyppi: 'elain',
    kysymykset: [
      'Miksi juuri nämä koirat kelpasivat pelastustyöhön?',
      'Onko konjakkitynnyri koiran kaulassa totta?',
    ],
    korostukset: ['bernhardilainen|bernhardilaiset'],
    nappi: 'Majatalo solassa ja sen koirat',
    // 7.1706 E / 45.8689 N — en-Wikipedia "Great St Bernard Hospice"
    laudat: {
      maailmankartta: { x: 6072.4, y: 1565.8 },
    },
    teksti: 'Suuren Pyhän Bernhardin hospitaali on matkalaisten majatalo Suuren '
      + 'Pyhän Bernhardin solassa 2 469 metrin korkeudessa Pennialpeilla, muutaman '
      + 'sadan metrin päässä Italian rajasta. Sitä on hoitanut sama sääntökuntaisten '
      + 'kanonikkien yhteisö perustamisesta asti.\n\n'
      + 'Ensimmäinen hospitaali rakennettiin 800-luvulla Bourg-Saint-Pierreen, mutta '
      + 'saraseenien ryöstöretket tuhosivat sen 900-luvun puolivälissä. Noin vuonna '
      + '1050 Aostan arkkidiakoni Bernhard Menthonilainen näki solassa jatkuvasti '
      + 'kauhistuneita ja hädänalaisia matkalaisia ja päätti tehdä lopun alueen '
      + 'rosvoudesta. Niin syntyi hospitaali, joka sai myöhemmin hänen nimensä.\n\n'
      + 'Bernhardilaiset koirat jalostettiin juuri täällä, todennäköisesti '
      + 'Valais’n perheiden lahjoittamista koirista 1660- ja 1670-luvuilla; ensimmäinen '
      + 'varma maininta rodusta on vuodelta 1709. Alun perin ne olivat vahtikoiria ja '
      + 'vasta myöhemmin pelastuskoiria: ne olivat kyllin vahvoja kahlaamaan syvien '
      + 'kinosten läpi ja pystyivät jäljittämään eksyneen hajun perusteella. '
      + 'Vanhimmat todisteet koirista ovat Salvator Rosan kaksi maalausta vuodelta '
      + '1690. Kaulassa roikkuva konjakkitynnyri sen sijaan näyttää olleen enimmäkseen '
      + '1800-luvun myytti — vaikka ainakin yksi koira sellaista kantoikin.',
    lahde: 'en-Wikipedia "Great St Bernard Hospice", johdanto-osa sekä osiot '
      + '"History" ja "St. Bernard dog" (tarkistettu 2.9.2026).',
  },
  {
    id: 'zytglogge',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-zytglogge-2abc406e.jpg',
      lyhyt: 'Zytglogge-tornin tähtitieteellinen kello Bernissä.',
      selite: 'Punainen ja tumman sininen kellotaulu roomalaisin numeroin, keskellä eläinradan merkein koristeltu tähtitieteellinen mekanismi.',
      lahde: 'Valokuva: Sandstein, Wikimedia Commons (public domain).',
      tekija: 'Sandstein',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zytglogge_astronomical_clock.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-zytglogge-e574afef.jpg',
        lyhyt: 'Zytglogge-torni Kramgassen päässä vanhassa valokuvassa vuodelta 1865.',
        selite: 'Vanhan kaupungin katu johtaa tornille, jonka kellotaulu ja terävä torninhuippu kohoavat rakennusten yläpuolelle; kadulla näkyy hevosvaunuja ja muutama kulkija.',
        lahde: 'Kuva: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zytglogge_1865.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Zytglogge',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mistä torni sai nimensä?',
      'Mihin tornia käytettiin ennen kelloa?',
    ],
    korostukset: ['astronominen kello|astronominen kello'],
    nappi: 'Aikakello Bernin vanhassa portissa',
    // 7.4478 E / 46.9481 N — en-Wikipedia "Zytglogge"
    laudat: {
      maailmankartta: { x: 6081.6, y: 1520.7 },
    },
    teksti: 'Zytglogge on keskiaikainen torni Bernin vanhassakaupungissa ja '
      + 'kaupungin vanhin muistomerkki. Kahdeksansadan vuoden aikana se on ollut '
      + 'vartiotorni, vankila, kellotorni, kaupunkielämän keskus ja muistomerkki.\n\n'
      + 'Torni rakennettiin noin 1218–1220 Bernin läntisten linnoitusten '
      + 'porttitorniksi, ja se oli silloin vain kuusitoista metriä korkea. Kun '
      + 'kaupunki kasvoi ja muurit siirtyivät kauemmas noin 1270–1275, tornia '
      + 'korotettiin seitsemällä metrillä, jotta se yhä näkisi talojen yli. Kun '
      + 'länsipuolustus laajeni jälleen 1344–1346, tornista tehtiin naisvankila.\n\n'
      + 'Vuoden 1405 suurpalossa torni paloi sisältä kokonaan. Vankisellit jätettiin '
      + 'pois, ja portin ylle asennettiin 1400-luvun alussa kello, luultavasti jo '
      + 'yksinkertainen astronominen kello ja soittokoneisto. Juuri tämä kello ja '
      + 'samana vuonna valettu suuri kirkonkello antoivat tornille nimen: Zytglogge '
      + 'tarkoittaa Bernin murteella aikakelloa. 1400-luvun lopulla torni sai uuden '
      + 'lyhdyn kellonlyöjineen, neljä kulmatornia ja vaakunakoristeet, ja '
      + 'astronominen kello laajennettiin nykyiseen asuunsa.',
    lahde: 'en-Wikipedia "Zytglogge", johdanto-osa ja osio "History" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'la-chaux-de-fonds',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-la-chaux-de-fonds-9b57320e.jpg',
      lyhyt: 'La Chaux-de-Fondsin kaupunki Juravuorilla ilmasta nähtynä.',
      selite: 'Ilmakuva kaupungin punakattoisista kortteleista, rautatieasemasta ja ympäröivästä metsäisestä ylängöstä.',
      lahde: 'Valokuva: Jérémy Toma, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jérémy Toma',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:La_Chaux-de-Fonds_vue_du_ciel.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-la-chaux-de-fonds-f9a41a4b.jpg',
        lyhyt: 'Kansainvälisen kelloteollisuusmuseon sisäänkäynti La Chaux-de-Fondsissa.',
        selite: 'Museon betoninen, köynnösten peittämä katos suojaa lasista sisäänkäyntiä. Museo esittelee kellonvalmistuksen historiaa.',
        lahde: 'Valokuva: Tomleighmartin, Wikimedia Commons (CC0).',
        tekija: 'Tomleighmartin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:LaChauxDeFondsMuseeDHorlogerieCH1.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'La Chaux-de-Fonds',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miksi kaupunki elää kellosepäntyöstä eikä maanviljelystä?',
      'Miksi kadut kulkevat suorassa ruudukossa?',
    ],
    korostukset: ['ruudukkokaava|ruudukkokaavan'],
    nappi: 'Kaupunki, joka rakennettiin kellojen ehdoilla',
    // 6.83 E / 47.1028 N — en-Wikipedia "La Chaux-de-Fonds"
    laudat: {
      maailmankartta: { x: 6061, y: 1514.2 },
    },
    teksti: 'La Chaux-de-Fonds on kaupunki Neuchâtelin kantonissa Juravuorilla '
      + '992 metrin korkeudessa, muutaman kilometrin päässä Ranskan rajasta. Se '
      + 'perustettiin 1656, ja sen kasvu ja vauraus ovat kiinni kellonvalmistuksessa: '
      + 'kaupunki on Watch Valley -alueen tärkein kellosepänteollisuuden keskus.\n\n'
      + 'Syy on maaperässä. Korkeus ja veden puute — kallioperä on huokoista '
      + 'hiekkakiveä — tekevät maasta huonoa viljelyyn, ja kaupunki jäi elämään '
      + 'kellojen valmistuksesta ja viennistä. Kaavoitus ja rakennukset noudattavat '
      + 'kellosepän työn vaatimaa järjestystä: asuintalot ja verstaat lomittuvat '
      + 'rinnakkaisiksi nauhoiksi.\n\n'
      + 'Vuoden 1794 tulipalo tuhosi osan kaupungista, ja se rakennettiin uudelleen '
      + 'ruudukkokaavan mukaan — ainutlaatuisesti Sveitsin kaupunkien joukossa. Vain '
      + 'itäisin osa säästyi palolta, ja siellä kadut ovat yhä kapeita ja mutkaisia. '
      + 'Kaupungissa syntyivät muun muassa arkkitehti Le Corbusier, kirjailija Blaise '
      + 'Cendrars ja autonrakentaja Louis Chevrolet. Vuonna 2009 La Chaux-de-Fonds ja '
      + 'sen sisarkaupunki Le Locle otettiin yhdessä maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "La Chaux-de-Fonds", johdanto-osa ja osio "UNESCO World '
      + 'Heritage Sites" (tarkistettu 2.9.2026).',
  },
  {
    id: 'gruyeres',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-gruyeres-7c7c922b.jpg',
      lyhyt: 'Gruyèresin vanha kaupunki ja linna kukkulan rinteellä.',
      selite: 'Keskiaikaisen kaupungin talot ja kivilinna torneineen kohoavat vihreän kukkulan rinteellä Fribourgin kantonissa.',
      lahde: 'Valokuva: JoachimKohler-HB, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JoachimKohler-HB',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Altstadthügel_und_Schloss_Greyerz_(2014).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-gruyeres-4cb60b74.jpg',
        lyhyt: 'Gruyères kukkulan laella metsäisten vuorten ja niittyjen keskellä.',
        selite: 'Kukkulan päällä kohoava keskiaikainen kaupunki ja linna nähtynä kauempaa, ympärillä niittyjä, taloja ja Fribourgin esialppien vuoria.',
        lahde: 'Valokuva: Christian David, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Christian David',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gruyères_et_sa_cité_médiévale.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gruyères',
    tyyppi: 'ruoka',
    kysymykset: [
      'Mistä gruyère-juusto sai nimensä?',
      'Kuinka suuri osa pitäjän maasta on alppilaidunta?',
    ],
    korostukset: ['alppilaidun|alppilaidunta'],
    nappi: 'Kukkulakaupunki, joka nimesi juuston',
    // 7.0833 E / 46.5833 N — en-Wikipedia "Gruyères"
    laudat: {
      maailmankartta: { x: 6069.4, y: 1536 },
    },
    teksti: 'Gruyères on pikkukaupunki Gruyèren piirikunnassa Fribourgin kantonissa. '
      + 'Keskiaikainen kaupunki seisoo 82 metriä korkean kukkulan laella Saanen '
      + 'laakson ja Gruyèren järven yllä, ja se on antanut nimensä gruyère-juustolle.\n\n'
      + 'Kaupunki on 810 metrin korkeudessa, 4,5 kilometriä piirikunnan pääkaupungista '
      + 'Bullesta kaakkoon. Kukkula nousee yksinään Alppien pohjoispuolella, Moléson-vuoren '
      + 'juurella, siinä kohdassa jossa Saane jättää Fribourgin alpit.\n\n'
      + 'Pitäjän maasta 40,5 prosenttia on maatalouskäytössä ja puolet metsää. '
      + 'Maatalousmaasta vain 4,6 prosenttia on peltoa: 12,9 prosenttia on laidunta ja '
      + '22,9 prosenttia alppilaidunta. Juuri se suhde kertoo, mihin seudun elanto '
      + 'perustuu.',
    lahde: 'en-Wikipedia "Gruyères", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 2.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 3, 11.9.2026 — KOLME KOHDETTA LISÄÄ. Omistaja 11.9.2026:
   * *"Agentit voisivat tarkastaa myös muut Euroopan maat että
   * kaikissa tarpeeksi nostoja."* Tavoite on vähintään 20 pääkartan
   * nostoa per Euroopan maa; Sveitsi oli 17:ssä.
   *
   * Kaikki kolme ovat kaukana Alppien laatasta (lähinkin Reininputous
   * 43 lautayksikköä), joten ne ovat pääkartan merkkejä. Kuvat lisätty 20.9.2026;
   * faktat en-Wikipediasta kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'rutli',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-rutli-87fbb1b2.jpg',
      lyhyt: 'Rütlin niitty Luzernin järven rannalla ilmasta nähtynä.',
      selite: 'Vihreä vuoristoniitty rakennuksineen ja polkuineen kohoaa metsäisen rinteen ja turkoosinvihreän järven välissä.',
      lahde: 'Valokuva: Daniel Reust, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Daniel Reust',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rütliwiese.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-rutli-4565d752.jpg',
        lyhyt: 'Maalaus Luzernin järven maisemasta Rütlin niityn suunnalta vuodelta 1855.',
        selite: 'François Didayn maalaamassa maisemassa järven ylle nousevat jyrkät vuoret, ja etualan kalliorannalla istuu kaksi pientä hahmoa.',
        lahde: 'Maalaus: François Diday, Wikimedia Commons (public domain).',
        tekija: 'François Diday',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:François_Diday_-_Lake_Lucerne_near_Brunnen_with_a_view_of_Seelisberg,_the_Rütli_meadow_and_the_Engelberger_Rotstock_(1855).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Rütlin niitty',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi niitystä tuli kansallinen symboli vasta 1700-luvulla?',
      'Mitä Rütlillä tapahtui heinäkuussa 1940?',
    ],
    korostukset: ['Rütlischwur|Rütlischwurin'],
    nappi: 'Niitty, jolla valan kerrotaan vannotun',
    // 8.5936 E / 46.9689 N — Seelisberg, Uri; en-Wikipedia "Rütli"
    laudat: {
      maailmankartta: { x: 6119.8, y: 1519.8 },
    },
    teksti: 'Rütli on vuoristoniitty Luzernin järven rannalla Seelisbergin '
      + 'kunnassa Urin kantonissa. Perinteisessä sveitsiläisessä '
      + 'historiankirjoituksessa se on Rütlischwurin paikka: valan, joka '
      + 'merkitsee alkuperäisen Sveitsin valaliiton syntyä. Niittyä pidetään '
      + 'kansallisena muistomerkkinä, ja sinne pääsee vain veneellä järveltä '
      + 'tai jalan Seelisbergistä.\n\n'
      + 'Symboliksi paikka nousi vasta 1700-luvun alussa kansallisromantiikan '
      + 'myötä. 1780-luvulla ehdotettiin vapaudenmuistomerkin pystyttämistä, '
      + 'mutta hanke ei toteutunut, ja Helvetian tasavallan aikana Rütlistä '
      + 'tuli konservatiivisten toisinajattelijoiden pyhiinvaelluskohde. Vuonna '
      + '1804 Friedrich Schiller julkaisi Wilhelm Tellin, joka dramatisoi '
      + 'Rütlin valan, ja 1820 Johann Krauer ja Franz Joseph Greith tekivät '
      + 'isänmaallisen Rütlilied-laulun.\n\n'
      + 'Vuonna 1859 niityn osti yleishyödyllinen seura Schweizerische '
      + 'Gemeinnützige Gesellschaft, koska paikalle aiottiin rakentaa hotelli. '
      + 'Seura luovutti maan valaliitolle ehdolla, ettei sitä saa myydä ja että '
      + 'hoito jää seuralle.\n\n'
      + 'Heinäkuun 25. päivänä 1940 kenraali Henri Guisan kutsui Sveitsin '
      + 'armeijan komentajat Rütlille ja piti puheen, joka tunnetaan nimellä '
      + 'Rütlirapport. Siinä hän esitteli Reduit-strategian ja sanoi, ettei '
      + 'Sveitsi antautuisi hyökkääjälle. Vuodesta 1860 seura on järjestänyt '
      + 'niityllä juhlan elokuun ensimmäisenä päivänä, joka on vuodesta 1994 '
      + 'ollut virallinen vapaapäivä.',
    lahde: 'en-Wikipedia "Rütli", johdanto-osa ja osio "History" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'landwasserin-viadukti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-landwasserin-viadukti-c636a02c.jpg',
      lyhyt: 'Punainen juna Landwasserin viaduktilla, taustalla vuorenrinne.',
      selite: 'Kaareva kivinen viadukti ylittää rotkon, ja juna on saapumassa kalliorinteeseen louhittuun tunneliin.',
      lahde: 'Valokuva: Ikiwaner, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ikiwaner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Landwasserviadukt.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-landwasserin-viadukti-9db928e7.jpg',
        lyhyt: 'Landwasserin viadukti ilmasta nähtynä.',
        selite: 'Kivinen kaarisilta kohoaa korkealle Landwasser-joen rotkon yllä, ja junan vaunut ylittävät sen metsäisten rinteiden välissä.',
        lahde: 'Valokuva: Capricorn4049, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Capricorn4049',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Landwasserviadukt,_aerial_photography_from_northeast_2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Landwasserin viadukti',
    nimio: 'Landwasser',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi kaarre on niin jyrkkä?',
      'Mihin junat katoavat heti sillan jälkeen?',
    ],
    korostukset: ['kaari|kaarta'],
    nappi: 'Kaartuva silta, joka päättyy kallion sisään',
    // 9.6753 E / 46.68 N — Schmitten–Filisur, Graubünden;
    // en-Wikipedia "Landwasser Viaduct"
    laudat: {
      maailmankartta: { x: 6155.8, y: 1532.0 },
    },
    teksti: 'Landwasserin viadukti on yksiraiteinen, kaartuva kalkkikivisilta '
      + 'Landwasser-joen yli Schmittenin ja Filisurin välillä Graubündenin '
      + 'kantonissa. Sen suunnitteli Alexander Acatos, ja Müller & Zeerleder '
      + 'rakensi sen vuosina 1901–1902 Rhätische Bahnille, joka omistaa ja '
      + 'liikennöi siltaa yhä. Silta on maailmanperintöluetteloon kuuluvan '
      + 'Albula-radan tunnusrakennelma: korkeutta on 65 metriä ja pituutta '
      + 'noin 140.\n\n'
      + 'Silmiinpistävin piirre on jyrkkä kaarre, jonka säde on sata metriä — '
      + 'pienin koko radalla. Kantavia kaaria on kuusi, kukin kaksikymmentä '
      + 'metriä leveä, ja ne lepäävät viiden korkean pilarin varassa; yhtäkään '
      + 'kaarta ei ole nostettu korkeaksi, vaan ne ovat tarkoituksella laakeita. Muurausta '
      + 'on noin 9 200 kuutiometriä, ja saumat on tehty dolomiittisella '
      + 'kalkkikivellä. Radan kaltevuus sillalla on kaksi prosenttia.\n\n'
      + 'Silta on osa Albula-radan osuutta Tiefencastelin ja Filisurin välillä, '
      + '63 kilometrin päässä Thusisista. Tiefencastelin ja Alvaneun suunnasta '
      + 'tuleva matkustaja näkee sen jo kaukaa. Ensin ylitetään Schmittentobelin '
      + 'viadukti, ja kun juna kaartaa Landwasserin sillalle, matkustaja näkee '
      + 'oman junansa keulan katoavan suoraan kallioon: sillan kaakkoinen '
      + 'maatuki liittyy Landwasserin tunneliin.\n\n'
      + 'Vuonna 2009 viadukti kunnostettiin ensimmäistä kertaa rakentamisensa '
      + 'jälkeen.',
    lahde: 'en-Wikipedia "Landwasser Viaduct", johdanto-osa sekä osiot '
      + '"Location" ja "Technical details" (tarkistettu 11.9.2026).',
  },
  {
    id: 'reininputous',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-reininputous-6ba56bef.jpg',
      lyhyt: 'Reininputous syksyllä, Laufenin linna ja rautatiesilta taustalla.',
      selite: 'Vaahtoava Rein putoaa kalliosaarekkeen ohi, ja rannalla kohoaa Laufenin linna syksyn värittämän metsän keskellä.',
      lahde: 'Valokuva: Christian David, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Christian David',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chutes_du_Rhin_-_Octobre_2021.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/che-nosto-reininputous-9280f1f4.jpg',
        lyhyt: 'Reininputouksen keskellä kohoava kallio ilmasta nähtynä.',
        selite: 'Ilmakuvassa vaahtoava vesi ympäröi putouksen keskellä olevaa kalliota, jonne johtavat portaat, ja taustalla näkyvät silta ja linna.',
        lahde: 'Valokuva: Hansueli Krapf, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hansueli Krapf',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2016-08-30_18-36-45_324.2_Switzerland_Kanton_Schaffhausen_Neuhausen_Rheinfall.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Reininputous',
    nimio: 'Rheinfall',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka paljon virtaama vaihtelee vuoden mittaan?',
      'Miksi putouksen keskellä oleva kallio ei kulu?',
    ],
    korostukset: ['kalkkikivi|kalkkikiven'],
    nappi: 'Euroopan voimakkain vesiputous',
    // 8.6153 E / 47.6778 N — Neuhausen am Rheinfall;
    // en-Wikipedia "Rhine Falls"
    laudat: {
      maailmankartta: { x: 6120.5, y: 1489.9 },
    },
    teksti: 'Reininputous on Ylä-Reinin vesiputous Sveitsissä ja Euroopan '
      + 'voimakkain. Se on Schaffhausenin ja Zürichin kantonien rajalla '
      + 'Neuhausen am Rheinfallin ja Laufen-Uhwiesenin välissä, noin kolme '
      + 'kilometriä Schaffhausenin kaupungista etelään ja aivan Saksan rajan '
      + 'tuntumassa.\n\n'
      + 'Putous on 150 metriä leveä ja 23 metriä korkea. Talvikuukausina '
      + 'keskimääräinen virtaama on 250 kuutiometriä sekunnissa ja kesällä 600. '
      + 'Suurin koskaan mitattu oli 1 250 kuutiometriä sekunnissa vuonna 1965 '
      + 'ja pienin 95 kuutiometriä vuonna 1921. Sveitsin korkein putous ei ole '
      + 'tämä vaan Mürrenbachin putous, 417 metriä.\n\n'
      + 'Putous syntyi viime jääkaudella noin 14 000–17 000 vuotta sitten, kun '
      + 'kulutusta kestävät kivilajit kavensivat uomaa. Joen reitti on vaihtunut '
      + 'monta kertaa: vielä noin 132 000 vuotta sitten Rein virtasi '
      + 'Schaffhausenista länteen Klettgaun laaksoon, ja vanha uoma täyttyi '
      + 'soralla. Würm-jäätiköitymisen aikana joki työntyi etelään nykyiselle '
      + 'reitilleen kovan myöhäisjuran kalkkikiven päälle, ja kun vesi kulutti '
      + 'vuoroin kalkkikiveä ja vanhaa pehmeää soraa, putous syntyi.\n\n'
      + 'Keskellä putousta kohoava kallio Rheinfallfelsen on jäänne '
      + 'alkuperäisestä kalkkikivijyrkänteestä. Se on kulunut hyvin vähän, '
      + 'koska Bodenjärvestä tulee Reiniin vain niukasti kiintoainesta. Kallion '
      + 'kivi on noin 150 miljoonaa vuotta vanhaa.',
    lahde: 'en-Wikipedia "Rhine Falls", johdanto-osa ja osio "Geology" '
      + '(tarkistettu 11.9.2026).',
  },
];
