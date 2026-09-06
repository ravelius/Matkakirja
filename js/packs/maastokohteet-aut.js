/*
 * MAASTOKOHTEET — AUT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AUT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AUT.json. Työkalu laskee laudan
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
 * Itävallan maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 *
 * ── K2-ERÄ 2 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ─────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Itävalta oli erän 2 heikoimpia: nolla kuratoitua kohdetta ja
 * kaksitoista karttamerkkiä (docs/moduulit/karttanostot-kattavuus.md).
 * Tavoite on kahdeksan KOHDETTA maastokohteiden lisäksi, ja tässä ne
 * ovat — sama malli kuin erässä 1 (js/packs/maastokohteet-isl.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-aut.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Carnuntum)
 * on 15,9 lautayksikön päässä Wienistä, eli reilusti yli kaupungin
 * kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js).
 * Yksikään ei siis kuulu kohdekartalle, vaan kaikki ovat pääkartan
 * merkkejä.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti kantaa
 * tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto olisi
 * huonompi kuin kuvaton kortti (Perustuslaki, faktakuri). Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_AUT = [
  {
    id: 'groglockner',
    nimi: 'Großglockner',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Pasterze on?',
      'Miksi korkeus mitataan Adrianmerestä?',
    ],
    korostukset: ['Hohe Tauern|Hohe Tauernin'],
    nappi: 'Itävallan korkein huippu',
    // 12.6953 E / 47.0749 N — en-Wikipedia "Grossglockner"
    laudat: {
      maailmankartta: { x: 6256.5, y: 1515.4 },
      europe: { x: 454.9, y: 655.5 },
    },
    teksti: 'Großglockner on 3 798 metriä Adrianmeren pinnasta ja siten Itävallan korkein vuori '
      + 'sekä Alppien korkein Brennerin solan itäpuolella. Se kuuluu Hohe Tauernin vuoriston '
      + 'Glockner-ryhmään Keski-Itäalppien pääharjanteella. Sen itärinteellä lepää Pasterze, '
      + 'Itävallan laajin jäätikkö.',
    lahde: 'en-Wikipedia "Grossglockner", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'wildspitze',
    nimi: 'Wildspitze',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren korkein huippu vaihtui?',
      'Kuka oli Leander Klotz?',
    ],
    korostukset: ['Ötztalin Alpit|Ötztalin Alppien'],
    nappi: 'Ötztalin Alppien katto',
    // 10.8672 E / 46.8853 N — en-Wikipedia "Wildspitze"
    laudat: {
      maailmankartta: { x: 6195.6, y: 1523.3 },
      europe: { x: 419.9, y: 660.5 },
    },
    teksti: 'Wildspitzellä on kaksi huippua, ja se kumpi niistä on korkeampi, on vaihtunut kesken '
      + 'kaiken. Kalliosta koostuva eteläinen huippu nousee 3 768 metriin, ja pohjoinen oli '
      + 'pitkään sitä korkeampi — 1800-luvulla se mitattiin 11 947 wieniläisen jalan '
      + 'korkuiseksi. Mutta pohjoinen huippu on lunta ja jäätä, ja sulaminen madalsi sen '
      + '1900-luvun loppuun mennessä noin 3 765 metriin. Niinpä korkein kohta on nykyään '
      + 'etelässä, ja samalla ensinousun vuodeksi vaihtui 1848, jolloin Rofenin laakson '
      + 'karjatilallinen ja opas Leander Klotz nousi sinne nimettömän naapurinsa kanssa. Vuori '
      + 'on Ötztalin Alppien ja Pohjois-Tirolin korkein sekä Itävallan toiseksi korkein '
      + 'Großglocknerin jälkeen.',
    lahde: 'en-Wikipedia "Wildspitze", johdanto-osa sekä osiot "Location" ja "Early ascents" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'tonava',
    nimi: 'Tonava',
    tyyppi: 'joki',
    kysymykset: [
      'Kuinka monen pääkaupungin läpi Tonava virtaa?',
      'Mikä Wachaun laakso on?',
    ],
    korostukset: ['Rooman valtakunta|Rooman valtakunnan'],
    nappi: 'Euroopan toiseksi pisin joki',
    // 15.42 E / 48.37 N — Wachaun laakso Itävallan puolella; artikkelin koordinaatti 29,761 / 45,218 on suistossa Romaniassa
    laudat: {
      maailmankartta: { x: 6347.3, y: 1460.4 },
      europe: { x: 507.3, y: 621.5 },
    },
    teksti: 'Tonava on Volgan jälkeen Euroopan toiseksi pisin joki: 2 850 kilometriä Saksan '
      + 'Schwarzwaldista Mustallemerelle. Se yhdistää nykyisin kymmenen Euroopan maata ja oli '
      + 'aikoinaan Rooman valtakunnan rajajoki. Sen varrella on neljä pääkaupunkia — Wien, '
      + 'Bratislava, Budapest ja Belgrad — ja valuma-alue on 817 000 neliökilometriä.',
    lahde: 'en-Wikipedia "Danube", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'inn',
    nimi: 'Inn',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Engadin on?',
      'Miksi Inn on niin vetinen?',
    ],
    nappi: 'Tonavan kolmanneksi suurin sivujoki',
    // 11.75 E / 47.3 N — Innin laakso Innsbruckin alapuolella; artikkelin koordinaatti 13,477 / 48,574 on yhtymäkohdassa Passaussa
    laudat: {
      maailmankartta: { x: 6225, y: 1505.9 },
      europe: { x: 436.8, y: 649.6 },
    },
    teksti: 'Inn on 518 kilometrin pituinen joki Sveitsissä, Itävallassa ja Saksassa ja '
      + 'virtaamaltaan Tonavan kolmanneksi suurin sivujoki. Sen valuma-alueen korkein kohta on '
      + 'Piz Berninan huippu 4 049 metrissä. Engadin, joen laakso Sveitsin puolella, on maan '
      + 'ainoa laakso, jonka vedet päätyvät Mustallemerelle.',
    lahde: 'en-Wikipedia "Inn (river)", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'hallstatt',
    nimi: 'Hallstatt',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kaivoksesta löytyy tuhansia vuosia vanhoja kenkiä?',
      'Mikä Hallstattin kulttuuri on?',
    ],
    korostukset: ['Hallstattin kulttuuri|Hallstattin kulttuurille'],
    nappi: 'Suola, joka säilytti rautakauden',
    // 13.649 E / 47.562 N — en-Wikipedia "Hallstatt"
    laudat: {
      maailmankartta: { x: 6288.3, y: 1494.8 },
      europe: { x: 473.3, y: 642.7 },
    },
    teksti: 'Hallstatt on pieni kaupunki Ylä-Itävallassa, Hallstätter Seen lounaisrannan ja '
      + 'Dachstein-massiivin jyrkkien rinteiden välissä Salzkammergutin alueella.\n\n'
      + 'Kaupunki tunnetaan suolantuotannostaan, joka ulottuu esihistoriaan asti, ja se on '
      + 'antanut nimen Hallstattin kulttuurille — varhaisen rautakauden arkeologiselle '
      + 'kulttuurille, joka liitetään esikelttiläisiin ja varhaisiin keltteihin noin '
      + '800–450 eaa. Pronssikaudella suolantuotanto oli jokapäiväistä kauppaa ja '
      + 'ilmeisen järjestäytynyttä, ja sen tuoma vauraus näkyy kaupungin '
      + 'esihistoriallisissa kalmistoissa.\n\n'
      + 'Vuonna 1846 Johann Georg Ramsauer löysi Salzbergin kaivosten läheltä suuren '
      + 'esihistoriallisen kalmiston ja kaivoi sitä 1800-luvun jälkipuoliskon ajan. '
      + 'Kaivauksista tuli lopulta 1 045 hautaa, vaikka itse asuinpaikkaa ei ole vieläkään '
      + 'löydetty — se saattaa olla myöhemmän kylän alla.\n\n'
      + 'Kaivoskäytävissä suola on säilyttänyt orgaanista ainesta, jota ei tavallisesti jää '
      + 'jäljelle: tekstiilejä, puuta ja nahkaa. Hyväkuntoisina ovat säilyneet muun muassa '
      + 'kengät, kangaspalat, työkalut ja kaivosmiesten reput. Hallstatt kuuluu vuonna 1997 '
      + 'maailmanperintöluetteloon merkittyyn Hallstatt–Dachsteinin kulttuurimaisemaan.',
    lahde: 'en-Wikipedia "Hallstatt", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'melkin-luostari',
    nimi: 'Melkin luostari',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi Melk säästyi lakkauttamiselta?',
      'Kuka on Melkin Adso?',
    ],
    korostukset: ['Melkin reformi|Melkin reformin'],
    nappi: 'Kirjasto kallion päällä',
    // 15.3339 E / 48.2281 N — en-Wikipedia "Melk Abbey"
    laudat: {
      maailmankartta: { x: 6344.5, y: 1466.5 },
      europe: { x: 505.6, y: 625.2 },
    },
    teksti: 'Melkin luostari on benediktiiniluostari Melkin kaupungin yläpuolella '
      + 'kalliokielekkeellä, joka kohoaa Tonavan yllä Wachaun laakson kupeessa. Kirkossa on '
      + 'pyhän Kolomanin hauta ja useiden Babenbergien — Itävallan ensimmäisen '
      + 'hallitsijasuvun — jäännökset.\n\n'
      + 'Luostari perustettiin 1089, kun Itävallan rajakreivi Leopold II antoi yhden '
      + 'linnoistaan Lambachin benediktiinimunkeille. Luostarikoulu perustettiin '
      + '1100-luvulla, ja kirjasto tuli pian kuuluisaksi laajasta '
      + 'käsikirjoituskokoelmastaan ja käsikirjoitusten valmistuksesta. 1400-luvulla '
      + 'luostarista tuli Melkin reformin keskus, joka uudisti Itävallan ja Etelä-Saksan '
      + 'luostarielämää.\n\n'
      + 'Nykyinen barokkiluostari rakennettiin 1702–1736 Jakob Prandtauerin suunnitelmien '
      + 'mukaan; kirkon freskot ovat Johann Michael Rottmayrin ja Paul Trogerin. '
      + '1700-luvun lopulla Melk oli valistusajattelun keskus, ja luostarissa toimi jopa '
      + 'vapaamuurariloosi.\n\n'
      + 'Maineensa ja oppineisuutensa ansiosta Melk vältti lakkauttamisen keisari Joosef '
      + 'II:n aikana, vaikka monet muut Itävallan luostarit takavarikoitiin ja lakkautettiin '
      + '1780–1790. Umberto Eco nimesi Ruusun nimen kertojan Melkin Adsoksi kunnianosoituksena '
      + 'luostarille.',
    lahde: 'en-Wikipedia "Melk Abbey", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hohensalzburg',
    nimi: 'Hohensalzburgin linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Reisszug on?',
      'Milloin linnoitusta piiritettiin?',
    ],
    korostukset: ['Reisszug|Reisszugin'],
    nappi: 'Maailman vanhin rautatie linnan kyljessä',
    // 13.0472 E / 47.795 N — en-Wikipedia "Hohensalzburg Fortress"
    laudat: {
      maailmankartta: { x: 6268.2, y: 1484.9 },
      europe: { x: 461.7, y: 636.6 },
    },
    teksti: 'Hohensalzburgin linnoitus on suuri keskiaikainen linnoitus Salzburgin '
      + 'kaupungissa. Se seisoo Festungsbergin päällä 506 metrin korkeudessa, ja sen '
      + 'rakennuttivat Salzburgin ruhtinasarkkipiispat. Linnoitus on 250 metriä pitkä ja '
      + '150 metriä leveä, mikä tekee siitä yhden Euroopan suurimmista keskiaikaisista '
      + 'linnoista.\n\n'
      + 'Rakentaminen alkoi 1077 arkkipiispa Gebhard von Helfensteinin aikana. '
      + 'Alkuperäinen suunnitelma oli yksinkertainen puumuurinen esilinna. Helfensteinin '
      + 'riita keisari Henrik IV:n kanssa investituurakiistassa vauhditti laajennuksia: '
      + 'arkkipiispa asettui paavi Gregorius VII:n puolelle.\n\n'
      + 'Vuonna 1515 koadjutori Matthäus Lang von Wellenburg kuvasi Reisszugin, hyvin '
      + 'varhaisen ja alkeellisen köysiradan, joka toi tavaraa linnan ylemmälle pihalle. '
      + 'Rata on yhä olemassa uudistettuna, ja se on todennäköisesti maailman vanhin '
      + 'toiminnassa oleva rautatie.\n\n'
      + 'Ainoa kerta, kun linnoitus joutui todella piiritetyksi, oli Saksan '
      + 'talonpoikaissota vuonna 1525: kaivosmiesten, talonpoikien ja kaupunkilaisten '
      + 'joukko yritti syöstä ruhtinasarkkipiispa Matthäus Langin vallasta mutta ei saanut '
      + 'linnoitusta haltuunsa.',
    lahde: 'en-Wikipedia "Hohensalzburg Fortress", johdanto-osa ja osio "Early history" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'semmeringin-rata',
    nimi: 'Semmeringin rata',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi radalle piti kehittää oma veturityyppi?',
      'Kuinka paljon rata nousee?',
    ],
    korostukset: ['Carl von Ghega|Carl von Ghega'],
    nappi: 'Euroopan ensimmäinen vuoristorata',
    // 15.831 E / 47.643 N — en-Wikipedia "Semmering railway"
    laudat: {
      maailmankartta: { x: 6361, y: 1491.4 },
      europe: { x: 515.2, y: 640.6 },
    },
    teksti: 'Semmeringin rata alkaa Gloggnitzista ja kulkee Semmeringin yli '
      + 'Mürzzuschlagiin. Se oli Euroopan ensimmäinen normaaliraiteinen vuoristorata, ja '
      + 'sitä pidetään yleisesti maailman ensimmäisenä varsinaisena vuoristoratana — sekä '
      + 'maasto että korkeusero olivat siihen asti näkemättömän vaikeita.\n\n'
      + 'Rata rakennettiin 1848–1854. Työssä oli noin 20 000 ihmistä, ja hanketta johti sen '
      + 'suunnittelija Carl von Ghega. Radalla on neljätoista tunnelia, joista pisin on '
      + 'huipputunneli 1 431 metriä, kuusitoista viaduktia ja yli sata kiviholvisiltaa. '
      + 'Asemat ja työnjohtajien rakennukset tehtiin usein suoraan tunneleista louhitusta '
      + 'kivestä.\n\n'
      + 'Neljänkymmenenyhden kilometrin matkalla rata voittaa 460 metrin korkeuseron. '
      + 'Kuudellakymmenellä prosentilla matkasta nousu on 2,0–2,5 prosenttia, ja '
      + 'kuudellatoista prosentilla kaarresäde on vain 190 metriä. Rakennusaikana oli '
      + 'kehitettävä uudet mittausvälineet ja -menetelmät, ja Engerth-veturit otettiin '
      + 'käyttöön siksi, etteivät ajan tavalliset veturityypit selvinneet näin jyrkistä '
      + 'nousuista ja tiukoista kaarteista.\n\n'
      + 'Rata on yhä täydessä käytössä osana Eteläistä rataa yli 160 vuotta '
      + 'valmistumisensa jälkeen.',
    lahde: 'en-Wikipedia "Semmering railway", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'mauthausen',
    nimi: 'Mauthausen',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi leiri perustettiin juuri tähän paikkaan?',
      'Kuinka moni vangeista kuoli?',
    ],
    korostukset: ['graniittilouhos|graniittilouhoksen'],
    nappi: 'Louhos, jonka takia leiri rakennettiin',
    // 14.5011 E / 48.2569 N — en-Wikipedia "Mauthausen concentration camp"
    laudat: {
      maailmankartta: { x: 6316.7, y: 1465.3 },
      europe: { x: 489.6, y: 624.4 },
    },
    teksti: 'Mauthausen oli kansallissosialistien keskitysleiri kukkulalla Mauthausenin '
      + 'kauppalan yllä Ylä-Itävallassa, noin kaksikymmentä kilometriä Linzistä itään. Se '
      + 'oli pääleiri ryhmälle, johon kuului lähes sata alaleiriä eri puolilla Itävaltaa ja '
      + 'Etelä-Saksaa.\n\n'
      + 'Pääleiri toimi 8. elokuuta 1938 alkaen — muutama kuukausi Itävallan liittämisen '
      + 'jälkeen — 5. toukokuuta 1945 asti, jolloin Yhdysvaltain armeija vapautti sen. '
      + 'Tammikuussa 1945 leireillä oli noin 85 000 vankia.\n\n'
      + 'Paikka valittiin läheisen graniittilouhoksen ja Linzin läheisyyden takia. Vaikka '
      + 'leiri oli alusta asti Saksan valtion hallinnassa, sen perusti yksityinen yhtiö '
      + 'taloudellisena hankkeena. Vangit pakotettiin orjatyöhön louhoksissa, kaivoksissa, '
      + 'ammustehtaissa ja asetehtaissa oloissa, jotka tappoivat.\n\n'
      + 'Mauthausenin olot olivat ankarammat kuin useimmissa muissa leireissä: sen ja '
      + 'alaleiriensä 190 000 vangista puolet kuoli. Se oli yksi ensimmäisistä suurista '
      + 'keskitysleirikokonaisuuksista ja viimeinen, jonka liittoutuneet vapauttivat. '
      + 'Pääleiri on nykyään museo.',
    lahde: 'en-Wikipedia "Mauthausen concentration camp", johdanto-osa ja osio '
      + '"Establishment of the main camp" (tarkistettu 6.9.2026).',
  },
  {
    id: 'durnstein',
    nimi: 'Dürnstein',
    tyyppi: 'sana',
    kysymykset: [
      'Miksi Leopold vangitsi Rikhardin?',
      'Mistä nimi Dürnstein tulee?',
    ],
    korostukset: ['Rikhard Leijonamieli|Rikhard Leijonamieli'],
    nappi: 'Linna, jossa Leijonamieltä pidettiin',
    // 15.5203 E / 48.3956 N — en-Wikipedia "Dürnstein"
    laudat: {
      maailmankartta: { x: 6350.7, y: 1459.4 },
      europe: { x: 509.2, y: 620.8 },
    },
    teksti: 'Dürnstein on pieni kaupunki Tonavan rannalla Ala-Itävallassa. Se on Wachaun '
      + 'alueen käydyimpiä matkakohteita ja tunnettu viinialue.\n\n'
      + 'Nimi tulee keskiaikaisesta Dürnsteinin linnasta, joka kohosi kaupungin yllä. '
      + 'Linnan nimi taas tulee saksan sanoista dürr, kuiva, ja Stein, kivi: kivilinna oli '
      + 'kuiva, koska se seisoi kalliokummulla korkealla Tonavan kostean rannan '
      + 'yläpuolella. Nykyinen kaupunki on linnan ja joen välissä.\n\n'
      + 'Dürnstein mainitaan ensi kerran vuonna 1192, kun Englannin kuningas Rikhard I oli '
      + 'kaupungin yläpuolisessa linnassa Itävallan herttuan Leopold V:n vankina. Rikhard '
      + 'Leijonamieli oli loukannut Leopoldia heittämällä tämän lipun alas muureilta Akkonin '
      + 'valtauksen jälkeen, ja herttua epäili kuninkaan määränneen serkkunsa Konrad '
      + 'Montferratilaisen murhan Jerusalemissa. Paavi Kölestinus III julisti Leopoldin '
      + 'pannaan ristiretkeläistoverin vangitsemisesta.\n\n'
      + 'Lopulta herttua luovutti kuninkaan keisari Henrik VI:lle, joka vangitsi hänet '
      + 'Trifelsin linnaan. Dürnsteinin linnan itsensä tuhosivat lähes kokonaan Ruotsin '
      + 'joukot sotamarsalkka Lennart Torstenssonin johdolla vuonna 1645.',
    lahde: 'en-Wikipedia "Dürnstein", osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'carnuntum',
    nimi: 'Carnuntum',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuinka suuri Carnuntum oli?',
      'Mikä meripihkatie oli?',
    ],
    korostukset: ['meripihkatie|meripihkatien'],
    nappi: '50 000 asukasta Tonavan rajalla',
    // 16.8614 E / 48.1133 N — en-Wikipedia "Carnuntum"
    laudat: {
      maailmankartta: { x: 6395.4, y: 1471.4 },
      europe: { x: 534.9, y: 628.2 },
    },
    teksti: 'Carnuntum oli roomalainen legioonalinnoitus ja Pannonian laivaston päämaja '
      + 'vuodesta 50 jaa. Ensimmäisen vuosisadan jälkeen siitä tuli Pannonia Superior '
      + '-provinssin pääkaupunki, ja se kasvoi noin viidenkymmenentuhannen asukkaan '
      + 'suurkaupungiksi.\n\n'
      + 'Rauniot ovat Tonavan varrella Ala-Itävallassa puolimatkassa Wienin ja Bratislavan '
      + 'välillä. Arkeologinen puisto kattaa kymmenen neliökilometriä Petronell-Carnuntumin '
      + 'ja Bad Deutsch-Altenburgin kylien liepeillä.\n\n'
      + 'Carnuntum tulee historiaan Augustuksen aikana vuonna 6 jaa., kun Tiberius teki '
      + 'siitä tukikohtansa sotaretkillään Maroboduusta vastaan. Legio XV Apollinaris '
      + 'sijoitettiin sinne varuskunnaksi ennen vuotta 14, ja paikasta tuli Tonavan '
      + 'varustusketjun keskus Vindobonasta eli Wienistä Brigetioon. Vuosina 117–118 '
      + 'Carnuntumista tuli Legio XIV Geminan pysyvä sijoituspaikka, ja legioona pysyi '
      + 'siellä kolme vuosisataa, kunnes raja romahti vuonna 430.\n\n'
      + 'Kaupunki oli myös meripihkan suuri kauppapaikka: pohjoisesta tuotua meripihkaa '
      + 'myytiin täällä kauppiaille, jotka veivät sen Italiaan, ja meripihkatien päähaara '
      + 'ylitti Tonavan juuri Carnuntumin kohdalla.',
    lahde: 'en-Wikipedia "Carnuntum", johdanto-osa sekä osiot "Military history" ja '
      + '"History of the city" (tarkistettu 6.9.2026).',
  },
  {
    id: 'eisriesenwelt',
    nimi: 'Eisriesenwelt',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi jää ei sula kesällä?',
      'Miksi paikalliset eivät menneet luolaan?',
    ],
    korostukset: ['jääluola|jääluola'],
    nappi: 'Maailman suurin jääluola',
    // 13.1903 E / 47.5029 N — en-Wikipedia "Eisriesenwelt"
    laudat: {
      maailmankartta: { x: 6273, y: 1497.3 },
      europe: { x: 464.5, y: 644.3 },
    },
    teksti: 'Eisriesenwelt — saksaksi jääjättiläisten maailma — on kalkkikivestä ja jäästä '
      + 'muodostuva luola Werfenissä, noin neljäkymmentä kilometriä Salzburgista etelään. '
      + 'Se on Hochkogel-vuoren sisässä Tennengebirgessä ja on maailman suurin jääluola: '
      + 'yli 42 kilometriä pitkä ja noin 200 000 kävijää vuodessa.\n\n'
      + 'Vaikka luola on 42 kilometriä pitkä, vain ensimmäinen kilometri — juuri se osa, '
      + 'johon matkailijat pääsevät — on jään peitossa. Loppu on paljasta kalkkikiveä. '
      + 'Luolan kaiversi Salzach-joki, ja jäämuodostelmat syntyivät sulavasta lumesta, '
      + 'joka valui luolaan ja jäätyi talvella.\n\n'
      + 'Jää säilyy, koska sisäänkäynti on auki ympäri vuoden. Talvella kylmä tuuli '
      + 'puhaltaa sisään ja jäädyttää lumen, ja kesällä kylmä ilmavirta puhaltaa luolasta '
      + 'ulos päin eikä päästä lämpimää sisään sulattamaan muodostelmia.\n\n'
      + 'Luonnontieteilijä Anton Posselt löysi luolan virallisesti 1879, mutta hän tutki '
      + 'siitä vain ensimmäiset kaksisataa metriä. Paikalliset tunsivat luolan jo ennestään '
      + 'mutta kieltäytyivät menemästä sisään: he uskoivat sen olevan helvetin portti.',
    lahde: 'en-Wikipedia "Eisriesenwelt", johdanto-osa sekä osiot "Geology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
];
