/*
 * BOSNIA JA HERTSEGOVINAN HAHMOTELMANOSTOT — maalla on ennestään 16
 * karttanostoa (js/packs/maastokohteet-bih.js: Maglić, Adrianmeri,
 * Blidinje, Bobovac; js/packs/fokuskohteet-bih.js: Mostar, Blagaj, Una,
 * Jajce, Višegrad, Neretva, Sutjeska, Travnik, Neum, Banja Luka,
 * Vjetrenica, Hutovo Blato), ja tässä on 14 uutta samalla mallilla kuin
 * muiden Euroopan maiden hahmotelmapakit (esim. js/packs/hahmotelma-
 * svn.js, js/packs/hahmotelma-che.js): jokaisella nostolla on valmis
 * sisältö — `teksti` 3–5 virkettä en-Wikipedian (tarvittaessa toisen
 * kielen Wikipedian lisälähteenä, kun en-artikkeli on tynkä) artikkelista
 * omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä faktoja,
 * `lahde`-riville artikkeli, osiot ja tarkistuspäivä), 1873-näkökulman
 * `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset` ja vähintään
 * kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public domain / CC0 /
 * CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu kirjattuna, jokaisen
 * kuvan tiedot luettu Commonsin extmetadata-rajapinnasta; kuvatekstit
 * ilman lähdeviittauksia lukijalle). Viidellä nostolla on lisäksi
 * `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta)
 * täsmälleen kuten kaupunkien täkynostoilla (js/fokusnosto.js
 * nostonVisa): vastaus löytyy noston omasta tekstistä.
 *
 * MIKSI JUURI NÄMÄ KOHTEET. Vanha 16 kattaa vuoren, meren, keskiaikaisen
 * linnan, kaksi kuuluisaa siltakaupunkia, dervissiluostarin, kaksi jokea,
 * kansallispuiston aarniometsineen, entisen kuvernöörikaupungin,
 * rannikkokaupungin, toisen suurkaupungin (Banja Luka), luolan ja
 * kosteikon. PÄÄKAUPUNKI SARAJEVO PUUTTUI KOKONAAN — se on erän
 * tärkein täydennys. Muut 13 tuovat aidot puuttuvat aihepiirit: 1984
 * talviolympialaiset (Bjelašnica), toinen putousmaisema (Kravice, kaukana
 * Neumin rannikkokäytävästä), suola- ja puunveistoperinne (Tuzla, Konjic
 * — 'tekniikka'-tyyppi puuttui kokonaan), viini ja juusto (Tvrdoš,
 * Livno — 'ruoka'-tyyppi puuttui kokonaan), jäätikköjärvi Vranican
 * vuorilla (Prokoško), kaksi keskiaikaista/1800-luvun linnaa lisää
 * (Doboj, Ostrožac — jälkimmäinen ainutlaatuisine patsaspuistoineen),
 * Bosnian kansannousun 1831 linnoitus (Gradačac), antiikin illyrialainen
 * pääkaupunki (Daorson — ainoa esiroomalainen kerros koko maan
 * nostoissa) ja aarniometsä toisaalla maata (Kozara).
 *
 * SÄVYRAJAUS (sama sääntö kuin fokuskohteet-bih.js:ssä): 1990-luvun
 * sotaa ei käsitellä missään nostossa eikä kysymyksessä. Kozaran
 * toisen maailmansodan vastarintahistoria mainitaan yhdellä lauseella
 * vain muistomerkin taiteena, ei väkivaltana. Gradačacin kansannousu
 * 1831 on ottomaanihallintoa vastaan käyty autonomiakapina 1800-luvulta,
 * ei osa 1990-luvun konfliktia, ja sekin kerrotaan asiatasolla.
 *
 * 1873-KERROS: koko maa on osa Osmanivaltakuntaa. Itävalta-Unkarin
 * miehitys alkaa vasta 1878 Berliinin kongressin päätöksellä ja
 * liittäminen 1908 — sama huomio kuin fokuskohteet-bih.js:ssä, ja
 * jokaisen noston `nappi` katsoo tästä näkökulmasta.
 *
 * EI VIELÄ LIITETTY KOHDE_MAAT.BIH:HEN (21.9.2026) — SAMA TILANNE KUIN
 * hahmotelma-che.js:llä äskettäin. Kaikki 14 uutta noston sijaintia
 * pysyvät tarkoituksella kaukana Neumin rannikkokäytävästä, mutta
 * KOHDE_MAAT.BIH:n liittäminen (import + rivi js/fokuskohteet.js:ään)
 * kaatoi silti tools/tarkista-nimiolimitys.mjs:n rivillä "BIH/neum +
 * HRV/stonin-muurit" — sama ladonnan yksisuuntaisuuskaskadi kuin AUT/
 * CHE/DEU:ssä (ks. hahmotelma-che.js:n oma kommentti), ei minkään
 * uuden rivin sijainnista kiinni. Neum-Ston-pari oli jo ennestään
 * "tiedoksi"-listalla lähes limittäin naapurin symbolien kanssa, joten
 * mikä tahansa lisäys tähän maahan olisi todennäköisesti tehnyt saman.
 * RATKAISU: sama kuin Karttasepän CHE-korjaus (haara karttaseppa-
 * bodensee, DEU/bodensee siirretty) — Neumin tai Stonin muurien nimiön
 * siirto, Karttasepän päätös. Kytke KOHDE_MAAT.BIH kun se on tehty.
 *
 * ── RANNIKKOVAROITUS (omistajan ohje 21.9.2026) ────────────────────
 *
 * Yhtään uutta kohdetta ei sijoitettu Neumin kapean rannikkokäytävän
 * lähelle: Neumin nimiö on jo ennestään lähes limittäin Kroatian
 * Mljetin ja Stonin muurien kanssa (tools/tarkista-nimiolimitys.mjs).
 * Lähin uusi kohde (Kravice) on Neumista noin 9 lautayksikköä
 * pohjoiseen, eikä Vjetrenican tai Hutovo Blaton kylkeen lisätty mitään.
 *
 * ── KOORDINAATIT ───────────────────────────────────────────────────
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 21.9.2026), ja laudat on
 * laskettu työkalulla tools/johda-maastokohteet.mjs (`laudat`-funktio,
 * Millerin lieriö maailmankartalle ja europe-tasaväli). Jokainen rivi
 * on tarkistettu osuvan BIH:n fokuslehden rajaukseen (maailmankartalla
 * x 6333,79…6510,72 / y 1565,17…1725,21, sama ikkuna kuin
 * fokuskohteet-bih.js:ssä).
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `bih-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon; siihen asti
 * osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan sarjasta.
 * Tiedostot ja niiden JSON-metadata ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/bih/ (kuvat juuressa,
 * metadata _json/-alikansiossa).
 *
 * ── KOHDE_MAAT-KYTKENTÄ ────────────────────────────────────────────
 *
 * TÄTÄ TIEDOSTOA EI OLE LIITETTY js/fokuskohteet.js:n KOHDE_MAAT.BIH:iin
 * — se on tarkoituksella jätetty omistajalle, kuten tehtävänannossa
 * pyydettiin (muut sessiot saattavat muokata js/fokuskohteet.js:ää
 * samaan aikaan).
 */

/** Bosnia ja Hertsegovinan hahmotelmanostot: sisällölliset kohteet. */
export const HAHMOTELMA_BIH = [
  {
    id: 'hahmotelma-sarajevo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-sarajevo-8099167a.jpg',
      lyhyt: 'Sebilj-suihkulähde ja Gazi Husrev-begin moskeija valaistuina illalla Baščaršijalla.',
      selite: 'Puinen, koristeellinen Sebilj-suihkukaivo seisoo torin keskellä valaistuna. Taustalla '
        + 'kohoaa moskeijan kupoli ja minareetti, ja ihmiset istuvat portailla.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sarajevo_Sebilj.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-sarajevo-16922e22.jpg',
        lyhyt: 'Sarajevon vanhakaupunki Baščaršija ja Miljacka-joki ylhäältä Trebevićin vuorelta nähtynä.',
        selite: 'Tiiviisti rakennettu vanhakaupunki punaisine kattoineen ja moskeijoiden minareetteineen '
          + 'leviää joen molemmin puolin.',
        lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Julian Nyča',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sarajevo_Bascarsija_from_Trebevic.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Sarajevo',
    tyyppi: 'kaupunki',
    lahi: true,
    kysymykset: [
      'Mistä Sarajevon nimi juontuu?',
      'Miksi Sarajevoa on kutsuttu Euroopan Jerusalemiksi?',
    ],
    korostukset: ['Isa-Beg Ishaković|Isa-Beg Ishakovićin', 'Baščaršija|Baščaršijan'],
    nappi: 'Franz Ferdinandin murhaan on vielä 41 vuotta ja talviolympialaisiin 111 vuotta',
    // 18.41306 E / 43.85639 N — en-Wikipedia "Sarajevo"
    laudat: {
      maailmankartta: { x: 6447.1, y: 1648.6 },
      europe: { x: 564.7, y: 740.2 },
    },
    teksti: 'Sarajevo on Bosnia ja Hertsegovinan pääkaupunki Miljacka-joen varrella Dinaaristen '
      + 'vuorten keskellä, ja sitä on pitkän uskonnollisen ja kulttuurisen moninaisuutensa vuoksi '
      + 'kutsuttu Euroopan Jerusalemiksi: samassa kaupunginosassa on moskeija, katolinen kirkko, '
      + 'ortodoksikirkko ja synagoga. Ottomaanit perustivat kaupungin 1450-luvulla, ja sen '
      + 'ensimmäinen kuvernööri Isa-Beg Ishaković rakennutti moskeijan, katetun torin, hammamin ja '
      + 'karavaanimajatalon — nimi Sarajevo juontuu näistä rakennuksista, sanoista "saray" ja '
      + '"evo". Kaupunki kasvoi nopeasti, ja 1660-luvulla se oli Istanbulin jälkeen Ottomaanien '
      + 'valtakunnan suurin kaupunki Balkanilla. Baščaršijan kauppatori on ollut kaupungin sydän '
      + 'jo perustamisesta asti, ja vuoteen 1850 mennessä Sarajevosta oli tullut koko Bosnian '
      + 'hallinnollinen keskus.',
    lahde: 'en-Wikipedia "Sarajevo", johdanto-osa ja osiot "Ottoman era" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Sarajevossa tapahtui arkkiherttua Franz Ferdinandin murha, joka '
        + 'sytytti ensimmäisen maailmansodan?',
      vaihtoehdot: ['1908', '1914', '1918', '1929'],
      oikea: 1,
      fakta: 'Itävalta-Unkari käytti Sarajevoa myös uusien keksintöjen koelaboratoriona: '
        + 'raitiotie otettiin käyttöön kaupungissa vuonna 1885, ennen kuin Wienissä oli omaa.',
    },
  },
  {
    id: 'hahmotelma-bjelasnica',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-bjelasnica-19ebf732.jpg',
      lyhyt: 'Bjelašnica-vuoren lumitäpläiset rinteet ja hiihtoladut Trebevićiltä nähtynä.',
      selite: 'Vuoren pyöreä huippu kohoaa metsäisten rinteiden yläpuolelle, ja rinteillä erottuvat '
        + 'hiihtoladut ja lumilaikut.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bjelašnica_from_Trebević.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-bjelasnica-d2b71d6b.jpg',
        lyhyt: 'Katsojajoukko seuraa miesten suurpujottelua Bjelašnicalla talviolympialaisissa 1984.',
        selite: 'Vanha valokuva näyttää tuloslistan tolppineen ja lumihangessa seisovan yleisön '
          + 'hiihtokilpailun maalialueella.',
        lahde: 'Valokuva: Zavičajac, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zavičajac',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bjelašnica_1984.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bjelašnica',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mistä Bjelašnican nimi tulee?',
      'Ketkä voittivat kultaa Bjelašnican rinteillä vuoden 1984 olympialaisissa?',
    ],
    korostukset: ['Bill Johnson|Bill Johnson', 'Max Julen|Max Julen'],
    nappi: 'Huipulle nousee ensimmäinen sääasema vasta viiden vuoden päästä, Itävalta-Unkarin '
      + 'miehityksen jälkeen 1878',
    // 18.257 E / 43.704 N — en-Wikipedia "Bjelašnica"
    laudat: {
      maailmankartta: { x: 6441.9, y: 1654.8 },
      europe: { x: 561.7, y: 744.2 },
    },
    teksti: 'Bjelašnica on Dinaaristen vuorten huippu Sarajevon lounaispuolella, vain kahdenkymmenen '
      + 'minuutin matkan päässä kaupungista. Sen korkein kohta kohoaa 2 067 metriin, ja nimi tulee '
      + 'sanasta "bijel", valkoinen. Vuoren rinteillä hiihdettiin vuoden 1984 talviolympialaisten '
      + 'miesten alppihiihtolajit: amerikkalainen Bill Johnson yllätti kaikki voittamalla laskettelun '
      + 'ennustettuaan voittonsa etukäteen, kaksoset Phil ja Steve Mahre veivät pujottelun kulta- ja '
      + 'hopeamitalin, ja sveitsiläinen Max Julen voitti suurpujottelun jugoslavialaisen Jure '
      + 'Frankon jäädessä hopealle.',
    lahde: 'en-Wikipedia "Bjelašnica", johdanto-osa ja osiot "Etymology", "1984 Winter Olympics" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuka voitti kultaa Bjelašnican suurpujottelussa talviolympialaisissa 1984?',
      vaihtoehdot: ['Bill Johnson', 'Phil Mahre', 'Max Julen', 'Jure Franko'],
      oikea: 2,
      fakta: 'Huipun sääasema on yksi vanhimpia koko Balkanilla: Itävalta-Unkari pystytti sen lähes '
        + 'heti miehityksen jälkeen 1878, ja se toimii yhä osana Balkanin ilmastoseurantaa.',
    },
  },
  {
    id: 'hahmotelma-kravice',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-kravice-6cb0317e.jpg',
      lyhyt: 'Kravicen putoukset syöksyvät kymmenissä juovissa turkoosiin altaaseen.',
      selite: 'Leveä kalkkikivijyrkänne on täynnä rinnakkaisia vesiputouksia, jotka valuvat vehreän '
        + 'kasvillisuuden läpi altaaseen.',
      lahde: 'Valokuva: Jocelyn Erskine-Kellie, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jocelyn Erskine-Kellie',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kravice_Waterfalls.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-kravice-2616e16c.jpg',
        lyhyt: 'Kravicen putousten vesi kaatuu kevään tulvassa alas turkoosiin altaaseen.',
        selite: 'Useat vesijuovat putoavat kalliokorkeudelta veden peittämän altaan pintaan, ja '
          + 'rannalla kasvaa vielä lehdettömiä puita.',
        lahde: 'Valokuva: Niegodzisie, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Niegodzisie',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kravica_111753.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kravicen putoukset',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mitä joen vettä Kravicen putoukset kuljettavat?',
      'Kuka omisti putousten ympäristön ja mitä hän teki paikkakunnalleen?',
    ],
    korostukset: ['Trebižat|Trebižat-joen', 'Zaim-beg Selimić|Zaim-beg Selimić'],
    nappi: 'Paikallisten suosima uimapaikka jo kauan; laajempi matkailu löytää sen vasta '
      + 'vuosikymmenten päästä',
    // 17.60367 E / 43.15412 N — en-Wikipedia "Kravica (waterfall)"
    laudat: {
      maailmankartta: { x: 6420.1, y: 1677.1 },
      europe: { x: 549.2, y: 758.6 },
    },
    teksti: 'Kravice on suuri tuffikivinen putoussarja Trebižat-joessa Hertsegovinan karstialueella, '
      + 'noin kymmenen kilometriä Ljubuškista etelään ja neljäkymmentä kilometriä Mostarista '
      + 'etelään. Putoukset ovat noin kaksikymmentäviisi metriä korkeat, ja niiden alla oleva allas '
      + 'on halkaisijaltaan noin sata kaksikymmentä metriä. Kesäisin putoukset ovat suosittu uinti- '
      + 'ja piknikpaikka, ja lähellä on pieni tippukivigrotta, vanha mylly ja purjelaiva. Putousten '
      + 'ympäristön omisti aikanaan Zaim-beg Selimić, tunnettu ljubuškilainen kunnanvaltuutettu, '
      + 'maanomistaja ja hyväntekijä.',
    lahde: 'en-Wikipedia "Kravica (waterfall)", johdanto-osa (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-tuzla',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-tuzla-b877393b.jpg',
      lyhyt: 'Tuzlan suolajärvi jäätyneenä talvella, rannalla lunta.',
      selite: 'Suuri pyöreä järvi on jäässä ja ympäröivä ranta-alue lumen peitossa. Taustalla näkyy '
        + 'mäkistä esikaupunkia.',
      lahde: 'Valokuva: KalyEV., Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'KalyEV.',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pannonian_Lakes,_Winter.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-tuzla-595f92ab.jpg',
        lyhyt: 'Tuzlan vanhaa puutaloasutusta ja puusilta vuonna 1886.',
        selite: 'Mustavalkoisessa valokuvassa näkyy tuulahoisia harjakattoisia puutaloja rinteellä '
          + 'sekä puinen silta etualalla. Kaukana erottuu minareetti.',
        lahde: 'Valokuva: Tuntematon tekijä, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon tekijä',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tuzla_1886.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Tuzla',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mistä Tuzlan nimi tulee?',
      'Mikä Panonsko-järvi on ja miksi se on Euroopassa ainutlaatuinen?',
    ],
    korostukset: ['Panonsko|Panonsko-järvi', 'Soli|Solin'],
    nappi: 'Suolakaivokset ovat jo tuottaneet verotuloja vuosisatoja; nykyinen suolajärvipuisto '
      + 'avautuu vasta 1900-luvulla',
    // 18.67611 E / 44.53806 N — en-Wikipedia "Tuzla"
    laudat: {
      maailmankartta: { x: 6455.9, y: 1620.8 },
      europe: { x: 569.8, y: 722.2 },
    },
    teksti: 'Tuzla on Bosnia ja Hertsegovinan kolmanneksi suurin kaupunki, ja sen nimi tulee '
      + 'ottomaanien turkin sanasta tuzla, suolakaivos — kaupungin alla on laajat suolaesiintymät, '
      + 'joita on louhittu vuosisatoja verotulojen lähteeksi. Keskiajalla paikkaa kutsuttiin nimellä '
      + 'Soli, "suolat", ja jo 900-luvulla se tunnettiin Bysantin lähteissä linnoituksena nimeltä '
      + 'Salines. Nykyinen kaupunki juontuu vuodesta 1510, jolloin siitä tuli tärkeä ottomaanien '
      + 'varuskuntakaupunki. Kaupungin keskuspuistossa on Panonsko-järvi, Euroopan ainoa '
      + 'suolajärvi, jonka rannoilla käy vuosittain yli kolmesataaviisikymmentätuhatta kävijää.',
    lahde: 'en-Wikipedia "Tuzla", johdanto-osa ja osiot "Etymology", "Early history" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-konjic',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-konjic-b9538052.jpg',
      lyhyt: 'Konjicin kivinen Stara Ćuprija -silta Neretvan yli.',
      selite: 'Vanha kaarisilta ylittää joen kirkkaan veden. Rannalla on perinteisiä taloja ja '
        + 'taustalla siintävät vuoret.',
      lahde: 'Valokuva: Bdx, Wikimedia Commons (CC0).',
      tekija: 'Bdx',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Historic_Konjic_Bridge_2024_1.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-konjic-79589bfd.jpg',
        lyhyt: 'Konjicin vanha silta ja kaupunki talvisessa auringonpaisteessa.',
        selite: 'Kivisilta kaartuu joen yli, ja rannalla kivikkoinen ranta johtaa kohti kaupungin '
          + 'taloja ja moskeijaa.',
        lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Julian Nyča',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Konjic_Stari_most_1.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Konjic',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mikä on Konjicin puunveisto ja mihin sitä käytetään?',
      'Kuinka vanha Konjicin Stara Ćuprija -silta on ja mihin sen kuva on päätynyt?',
    ],
    korostukset: ['Stara Ćuprija|Stara Ćuprijan', 'drvorezbarstvo|puunveistoperinne'],
    nappi: 'Kivisilta on jo kaupungin tunnus; puunveistoperinteen Unesco-tunnustukseen on vielä '
      + '144 vuotta',
    // 17.96078 E / 43.65442 N — en-Wikipedia "Konjic"
    laudat: {
      maailmankartta: { x: 6432, y: 1656.8 },
      europe: { x: 556, y: 745.5 },
    },
    teksti: 'Konjic on yksi Bosnia ja Hertsegovinan vanhimmista jatkuvasti asutuista paikoista — '
      + 'seutu on ollut asuttu jo lähes neljätuhatta vuotta, vaikka kaupunki nykyisessä muodossaan '
      + 'syntyi vasta 1300-luvun lopulla. Ensimmäinen kirjallinen maininta on Dubrovnikin '
      + 'tasavallan asiakirjoissa vuodelta 1382. Ottomaanien ajalta on peräisin kaupungin '
      + 'tunnusmerkki, kivinen Stara Ćuprija -silta Neretvan yli, joka on päätynyt myös Konjicin '
      + 'omaan vaakunaan. Kaupunki tunnetaan yhä puunveistoperinteestään, Konjicin '
      + 'drvorezbarstvosta: käsin veistetyt huonekalut ja koristeesineet ovat osa paikallisyhteisön '
      + 'identiteettiä, ja Unesco lisäsi perinteen ihmiskunnan aineettoman kulttuuriperinnön '
      + 'listalle vuonna 2017.',
    lahde: 'en-Wikipedia "Konjic", johdanto-osa ja osio "History"; en-Wikipedia "Konjic '
      + 'woodcarving" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Unesco lisäsi Konjicin puunveiston ihmiskunnan aineettoman '
        + 'kulttuuriperinnön listalle?',
      vaihtoehdot: ['1997', '2007', '2017', '2021'],
      oikea: 2,
      fakta: 'Konjicin lähelle louhittiin kylmän sodan aikana salassa vuosina 1953–1979 valtava, '
        + '300 metriä vuoreen ulottuva ydinbunkkeri nimeltä ARK.',
    },
  },
  {
    id: 'hahmotelma-tvrdos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-tvrdos-dd2dcecb.jpg',
      lyhyt: 'Tvrdošin luostarin viinitynnyri, jossa luostarin nimi ja koristekaiverrus.',
      selite: 'Suuri tammitynnyri seisoo holvatussa kivikellarissa, ja sen päädyssä on luostarin '
        + 'kyrillinen nimi ja viiniköynnöskuvio.',
      lahde: 'Valokuva: Boris Maric, Wikimedia Commons (CC0).',
      tekija: 'Boris Maric',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wine_Barrel_in_Tvrdos_Monastery.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-tvrdos-175ae46d.jpg',
        lyhyt: 'Tvrdošin luostarin holvattu viinikellari pylväineen.',
        selite: 'Kivinen ristiholvikellari jatkuu kaarien takana, ja vasemmalla näkyy tynnyreitä '
          + 'rivissä telineillä.',
        lahde: 'Valokuva: Stolbovsky, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Stolbovsky',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tvrdoš_Monastery_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tvrdošin luostari',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mitkä rypälelajikkeet ovat Tvrdošin viinin tärkeimmät?',
      'Mitä luostarille tapahtui vuonna 1694?',
    ],
    korostukset: ['Vranac|Vranac', 'Žilavka|Žilavka'],
    nappi: 'Luostari on ollut raunioina jo lähes 180 vuotta; uusi rakennus nousee vasta 1924',
    // 18.2967 E / 42.7186 N — en-Wikipedia "Tvrdoš Monastery"
    laudat: {
      maailmankartta: { x: 6443.2, y: 1694.7 },
      europe: { x: 562.5, y: 770.1 },
    },
    teksti: 'Tvrdoš on serbi-ortodoksinen luostari Trebinjen lähellä Itä-Hertsegovinassa, '
      + 'perustettu 1400-luvun lopulla tai 1500-luvun alussa. Se toimi Hertsegovinan arkkipiispojen '
      + 'istuimena, kunnes Venetsian laivasto tuhosi sen vuonna 1694, ja nykyinen rakennus '
      + 'valmistui vasta vuonna 1924. Luostari tunnetaan nykyään erityisesti viininviljelystään: '
      + 'tärkeimmät rypälelajikkeet ovat Vranac ja Žilavka, ja sen viinikellarit — yksi niistä '
      + '1500-luvulta — ovat suosittu matkailukohde.',
    lahde: 'en-Wikipedia "Tvrdoš Monastery", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-livno',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-livno-23536f6c.jpg',
      lyhyt: 'Livnon Hajji Ahmedin moskeija ja 1600-luvun kellotorni.',
      selite: 'Valkoinen kivimoskeija kupoleineen ja minareetteineen seisoo kellotornin vieressä '
        + 'kallion juurella.',
      lahde: 'Valokuva: Martin Brož, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Martin Brož',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Livno,_mesita_a_hodinova_vez,_17._stol.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-livno-8a8cfe23.jpg',
        lyhyt: 'Pala livnonjuustoa alkuperäisessä pakkauksessaan ja tuoteselosteessa.',
        selite: 'Vaalean kellertävä juustopala on puolittain muovipakkauksessa, jonka etiketissä '
          + 'lukee Livanjski sir.',
        lahde: 'Valokuva: Uniquenick, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Uniquenick',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Livanjski_Cheese_with_label.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Livno',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mihin tekniikkaan livnonjuuston valmistus perustuu ja mistä maidosta se alun perin tehtiin?',
      'Kuka suunnitteli Livnon moskeijan?',
    ],
    korostukset: ['Mimar Sinan|Mimar Sinanin', 'gruyère|gruyère-juuston'],
    nappi: 'Livnonjuustoa valmistetaan jo; Itävalta-Unkarin joukot valtaavat kaupungin vasta '
      + 'viiden vuoden päästä, 1878',
    // 17.0075 E / 43.82694 N — en-Wikipedia "Livno"
    laudat: {
      maailmankartta: { x: 6400.3, y: 1649.8 },
      europe: { x: 537.7, y: 741 },
    },
    teksti: 'Livno on Länsi-Bosnian kaupunki Bistrica-joen varrella, Cincar-vuoren juurella, ja se '
      + 'juontaa juurensa aina vuoteen 892, johon sen perustaminen kirjataan herttua Mutimirin '
      + 'asiakirjassa. Ottomaanien aikaan kaupunkiin nousi 1570-luvulla Hajji Ahmed the Ducat '
      + 'Minterin moskeija, jonka suunnitteli arkkitehti Mimar Sinan ja jonka kellotorni valmistui '
      + 'noin 1659. Seudulla on 1800-luvulla alettu valmistaa livnonjuustoa eli Livanjski siriä, '
      + 'joka perustuu ranskalaiseen gruyère-juuston valmistustekniikkaan; alun perin juusto '
      + 'tehtiin lampaanmaidosta, nykyään useimmiten lampaan- ja lehmänmaidon seoksesta.',
    lahde: 'en-Wikipedia "Livno", johdanto-osa ja osio "History"; en-Wikipedia "Livno cheese" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-prokosko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-prokosko-b2ee7cd1.jpg',
      lyhyt: 'Prokoškon järvi laaksossa Vranican vuoriston paimenmajojen keskellä.',
      selite: 'Pieni sininen järvi lepää vihreässä laaksossa, jota ympäröivät loivat niityt ja '
        + 'hajallaan olevat paimenmajat.',
      lahde: 'Valokuva: The photonaut, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'The photonaut',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tikva_Prokosko_jezero-07-2018-Vranica.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-prokosko-0c3e892e.jpg',
        lyhyt: 'Kävelypolun opastaulu Prokoškon järven rannalla sumuisessa säässä.',
        selite: 'Puinen portti ja kyltti "Pjesacka staza" johtavat polulle, joka häviää sumuun '
          + 'järven rannalla.',
        lahde: 'Valokuva: Emin Tarahija, Wikimedia Commons (CC0).',
        tekija: 'Emin Tarahija',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Prokoško_jezero,_planina_Vranica.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Prokoškon järvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä eläinlaji tekee Prokoškon järvestä tieteellisesti erityisen?',
      'Miksi järveen istutettu kalifornianpurotaimen osoittautui virheeksi?',
    ],
    korostukset: ['bosanski alpski triton|bosanjalpintritonin', 'Nadkrstac|Nadkrstacin'],
    nappi: 'Tutkijat kiinnittävät huomion järven ainutlaatuiseen tritoniin vasta 1890-luvulla',
    // 17.75472 E / 43.95722 N — en-Wikipedia "Prokoško Lake"; bs-Wikipedia
    // "Prokoško jezero" lisälähteenä, koska en-artikkeli on tynkä.
    laudat: {
      maailmankartta: { x: 6425.2, y: 1644.5 },
      europe: { x: 552.1, y: 737.5 },
    },
    teksti: 'Prokoškon järvi lepää Vranican vuoriston rinteellä Fojnican kunnassa, tuhannen '
      + 'kuudensadan seitsemänkymmenen metrin korkeudessa, ja sitä ympäröi Vranican korkein '
      + 'huippu Nadkrstac. Altaan uskotaan syntyneen soraisen maa-aineksen kasautumisesta '
      + 'riolittikallion päälle. Järven ainutlaatuisuus on siinä elävä bosnialainen alppitriton, '
      + 'harvinainen vuoristovesiliskon alalaji, joka säilyttää toukkamaisia piirteitään vielä '
      + 'aikuisenakin. Tutkijat löysivät järven merkityksen tieteelle 1890-luvulla: ornitologi '
      + 'Othmar Reiser kiinnitti huomion sen eliölajistoon vuonna 1891, ja herpetologi Franz '
      + 'Werner kuvasi tritonin vuonna 1902. Myöhemmin järveen istutettu kalifornianpurotaimen '
      + 'osoittautui virheeksi, sillä laji saalistaa tritonia.',
    lahde: 'en-Wikipedia "Prokoško Lake", johdanto-osa; bs-Wikipedia "Prokoško jezero", osiot '
      + 'eliöstöstä ja tutkimushistoriasta (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-doboj',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-doboj-a0d80a76.jpg',
      lyhyt: 'Dobojin linnan kivimuurit ja näkymä kaupunkiin.',
      selite: 'Vanhat harmaat kivimuurit reunustavat linnanpihaa, ja niiden takana avautuu näkymä '
        + 'kaupungin punakattoisiin taloihin.',
      lahde: 'Valokuva: Castrum 1415, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Castrum 1415',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Doboj_castle.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-doboj-797d6cba.jpg',
        lyhyt: 'Dobojin linnoitus kukkulalla kaupungin yläpuolella.',
        selite: 'Muurien ja tornin ympäröimä linnoitus kohoaa kukkulalla, jonka rinteillä on '
          + 'hautausmaa ja alempana kaupungin taloja.',
        lahde: 'Valokuva: Timka1988, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Timka1988',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gradina_Tvrdjava.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dobojin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti Dobojin linnan ensimmäisen kivilinnoituksen ja milloin?',
      'Miksi Doboj on nykyään maan tärkein rautatiesolmu?',
    ],
    korostukset: ['Kotromanić|Kotromanićien', 'Usora|Usoran'],
    nappi: 'Linna on jo laajennettu ottomaanien hallinnassa 1490; rautatiesolmuksi kaupunki '
      + 'kasvaa vasta Itävalta-Unkarin aikana',
    // 18.08444 E / 44.73139 N — en-Wikipedia "Doboj"
    laudat: {
      maailmankartta: { x: 6436.1, y: 1612.8 },
      europe: { x: 558.4, y: 717.2 },
    },
    teksti: 'Doboj on kaupunki Bosna-joen varrella Pohjois-Bosniassa, ja sen yllä kohoava linna oli '
      + 'aikanaan Bosnian kuninkaallisen Kotromanić-suvun linnoitus. Ensimmäinen kivilinnoitus '
      + 'rakennettiin jo 1200-luvun alussa entisen roomalaisen leirin paikalle, ja sitä laajennettiin '
      + 'vuonna 1415, jolloin kaupunki mainitaan ensi kertaa kirjallisessa lähteessä. Ottomaanit '
      + 'laajensivat linnaa edelleen vuonna 1490 vallattuaan alueen. Nykyään Doboj on maan suurin '
      + 'rautatiesolmu ja Bosna-joen laakson tärkein liikennekeskus Banja Lukan ohella.',
    lahde: 'en-Wikipedia "Doboj", johdanto-osa ja osiot "Ancient times", "Middle Ages" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-gradacac',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-gradacac-79c1a7c8.jpg',
      lyhyt: 'Husein-kapetan Gradaščevićin vartiotorni Gradačacin linnoituksessa.',
      selite: 'Kivinen, kapeneva torni puisine parvekkeineen kohoaa linnoituksen muurien '
        + 'yläpuolelle.',
      lahde: 'Valokuva: Okimsi, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Okimsi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kula_Husein-kapetana_Gradaščevića_u_tvrđavi_Gradačac.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-gradacac-18895082.jpg',
        lyhyt: 'Gradačacin linnoituksen tiilimuurit ja torni köynnösten peitossa.',
        selite: 'Paksut tiili- ja kivimuurit nousevat pihan reunalla, ja muurin takaa kohoaa '
          + 'valkoinen torni puisine ullakkokerroksineen.',
        lahde: 'Valokuva: MirkoS18, Wikimedia Commons (CC BY 4.0).',
        tekija: 'MirkoS18',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gradačac_Castle_01.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Gradačacin linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka oli Husein-kapetan Gradaščević ja mistä lisänimi "Bosnian lohikäärme" tulee?',
      'Mitä kapteeni tavoitteli vuoden 1831 kansannousussaan?',
    ],
    korostukset: ['Zmaj od Bosne|Zmaj od Bosnen', 'Tanzimat|Tanzimat-uudistuksia'],
    nappi: 'Kapteenin kansannoususta ottomaanihallintoa vastaan on kulunut jo 38 vuotta',
    // 18.42583 E / 44.87889 N — en-Wikipedia "Gradačac" ja "Husein Gradaščević"
    laudat: {
      maailmankartta: { x: 6447.5, y: 1606.8 },
      europe: { x: 565, y: 713.3 },
    },
    teksti: 'Gradačac on Koillis-Bosnian kaupunki, joka tunnetaan linnoituksestaan. Gradaščevićien '
      + 'kapteenisuku kehitti kaupunkia 1700-luvulta lähtien, ja suvun kuuluisin jäsen, '
      + 'Husein-kapetan Gradaščević eli Zmaj od Bosne — "Bosnian lohikäärme" — nousi vuonna 1831 '
      + 'lähes kaikkien Bosnian ottomaanikapteenien johtoon kansannousussa, jonka tavoitteena oli '
      + 'autonomia ja joka vastusti sulttaani Mahmud II:n Tanzimat-uudistuksia. Kansannousu kesti '
      + 'kolme vuotta ja kukistui lopulta 1835, minkä jälkeen kapteenikunnat lakkautettiin '
      + 'kokonaan. Linnoituksen kaksikymmentäkaksimetrinen vartiotorni on Husein-kapetanin oma '
      + 'rakennuttama vuodelta 1824, roomalaisten perustusten päälle nostettu.',
    lahde: 'en-Wikipedia "Gradačac", osio "History"; en-Wikipedia "Husein Gradaščević", '
      + 'johdanto-osa (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuinka kauan Husein-kapetan Gradaščevićin kansannousu kesti?',
      vaihtoehdot: ['1 vuoden', '2 vuotta', '3 vuotta', '5 vuotta'],
      oikea: 2,
      fakta: 'Kansannousun kukistuttua kapteeni pakeni Itävaltaan, ja sulttaani salli hänen '
        + 'palata kaikkialle Ottomaanien valtakuntaan paitsi Bosniaan — hän kuoli pian '
        + 'kiistanalaisissa olosuhteissa vuonna 1834.',
    },
  },
  {
    id: 'hahmotelma-kupres',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-kupres-c31beff6.jpg',
      lyhyt: 'Kupresin karstiylängön laaja tasanko Novo Selon kylän luona.',
      selite: 'Laaja, avoin ylänkötasanko ulottuu horisonttiin asti, ja etualalla kylän harvat '
        + 'talot reunustavat kivistä uomaa.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Novo_Selo_–_Kupreško_polje.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-kupres-2fa88a95.jpg',
        lyhyt: 'Kupresin ylängön niittyjä ja maatalo kesällä, taustalla hiihtorinne.',
        selite: 'Vehreä niitty täynnä kukkia ympäröi punakattoista maalaistaloa, ja kaukana '
          + 'kohoaa vuori, jonka rinteessä erottuu hiihtolatu.',
        lahde: 'Valokuva: Anto, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Anto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kupreško_polje.740.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kupresin ylänkö',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitkä kansat asuttivat Kupresin ylänköä ennen roomalaisia?',
      'Miksi Kupresilla sataa lunta niin usein?',
    ],
    korostukset: ['Dalmatae|Dalmatae-heimo', 'Kupreška vrata|Kupreška vrata'],
    nappi: 'Ylänkö on osa ottomaanien Bosniaa; Itävalta-Unkarin miehitykseen on vielä viisi vuotta',
    // 17.27944 E / 43.99056 N — en-Wikipedia "Kupres"
    laudat: {
      maailmankartta: { x: 6409.3, y: 1643.2 },
      europe: { x: 543, y: 736.6 },
    },
    teksti: 'Kupres on tuhannen sadankahdenkymmenen ja tuhannen kahdensadanviidenkymmenen '
      + 'metrin korkeudella sijaitseva ylänkö Länsi-Bosniassa, jonka sijainti Dinaaristen vuorten '
      + 'sydämessä tuo sille keskimäärin viisikymmentäviisi lumipäivää vuodessa. Alueella asui '
      + 'esiroomalaisella kaudella illyrialainen Dalmatae-heimo yhdessä kelttien kanssa, kunnes '
      + 'keisari Augustuksen roomalaiset valloittivat seudun. Myöhemmin ylänkö on kuulunut '
      + 'vuorotellen Kroatian kuningaskuntaan, Bosnian kuningaskuntaan ja Ottomaanien '
      + 'valtakuntaan. Kupreška vrata -tunneli yhdistää ylängön Bugojnon suuntaan, ja nykyään '
      + 'alue tunnetaan myös talviurheilukeskuksistaan.',
    lahde: 'en-Wikipedia "Kupres", johdanto-osa ja osiot "Location", "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-daorson',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-daorson-361fd880.jpg',
      lyhyt: 'Daorsonin kyklooppimuurin valtavat kiviset lohkareet.',
      selite: 'Massiiviset, epäsäännölliset kivilohkareet on ladottu tiiviisti muuriksi, jonka '
        + 'takana avautuu ylängön maisema.',
      lahde: 'Valokuva: Ma▀▄Ga, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Ma▀▄Ga',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Daorson_(03).JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-daorson-390c743b.jpg',
        lyhyt: 'Daorsonin illyrialaislinnoituksen kivimuurin jäänteet Ošanićin kukkulalla.',
        selite: 'Vanhat, sammaloituneet kivimuurin rivit erottuvat maastosta linnoituksen '
          + 'alueella.',
        lahde: 'Valokuva: Lsimon, Wikimedia Commons (CC0).',
        tekija: 'Lsimon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Daorson_2.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Daorson',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä olivat daorsit ja missä heidän pääkaupunkinsa Daorson sijaitsi?',
      'Mitä Daorsonin rahapajasta löytyi?',
    ],
    korostukset: ['kyklooppimuuri|kyklooppimuurin', 'kuningas Ballaios|kuningas Ballaioksen'],
    nappi: 'Aikanaan mahtava illyrialaiskaupunki lepää jo kauan tuntemattomana raunioläjänä '
      + 'kukkulalla',
    // Ošanići-kukkula Stolacin lähellä (en-Wikipedia "Daorson" ei anna omia
    // koordinaatteja); piste otettu Stolacin kaupungin koordinaatista
    // 17.9558 E / 43.0825 N.
    laudat: {
      maailmankartta: { x: 6431.9, y: 1680 },
      europe: { x: 556, y: 760.5 },
    },
    teksti: 'Daorson oli illyrialaisen daorsi-heimon pääkaupunki Neretva-joen laaksossa, nykyisen '
      + 'Stolacin lähellä sijaitsevalla Ošanićin kukkulalla. Daorsit asuivat seudulla 300–50 '
      + 'eaa. ja olivat varhain yhteyksissä kreikkalaisiin kauppiaisiin, mikä hellenisoi kaupunkia '
      + 'jonkin verran. Rauhansopimuksen jälkeen Rooman kanssa vuosina 168–167 eaa. daorsit '
      + 'alkoivat lyödä omia rahojaan. Kaupungin akropoliin ympärillä on jykevä kyklooppimuuri, '
      + 'joka on koottu valtavista kivilohkareista samaan tapaan kuin Mykenen muurit Kreikassa. '
      + 'Kaivauksissa on löytynyt muun muassa pronssinen, mytologisin hahmoin koristeltu kypärä '
      + 'sekä rahapaja, jonka kolmestakymmenestäyhdeksästä kolikosta suurin osa esittää kuningas '
      + 'Ballaiosta.',
    lahde: 'en-Wikipedia "Daorson", johdanto-osa ja osiot "History", "Site description" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-kozara',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-kozara-575961ac.jpg',
      lyhyt: 'Kozaran kansallispuiston lehtimetsää kesäisin.',
      selite: 'Korkeat, suoraan taivasta kohti kasvavat lehtipuut muodostavat tiheän latvuston, ja '
        + 'aluskasvillisuus on rehevää.',
      lahde: 'Valokuva: elektronak, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'elektronak',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:NP002_-_16.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-kozara-ac5db8c1.jpg',
        lyhyt: 'Aurinko siivilöityy Kozaran kansallispuiston puiden latvuston läpi.',
        selite: 'Korkeiden runkojen välistä siivilöityvä auringonvalo valaisee metsän lehtikattoa '
          + 'alhaalta katsottuna.',
        lahde: 'Valokuva: elektronak, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'elektronak',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:NP002_-_7.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kozaran kansallispuisto',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Minä vuonna Kozaran kansallispuisto perustettiin ja kuka sen julisti suojelluksi?',
      'Mitä liikunnallista Kozarassa voi nykyään harrastaa?',
    ],
    korostukset: ['Josip Broz Tito|Josip Broz Titon', 'Kozara Ultra Trail|Kozara Ultra Trailia'],
    nappi: 'Kansallispuisto perustetaan vasta 94 vuotta myöhemmin, 1967',
    // 16.89167 E / 45.00833 N — en-Wikipedia "Kozara National Park"
    laudat: {
      maailmankartta: { x: 6396.4, y: 1601.4 },
      europe: { x: 535.5, y: 709.9 },
    },
    teksti: 'Kozara on kansallispuisto Luoteis-Bosniassa Una-, Sava-, Sana- ja Vrbas-jokien '
      + 'välissä, ja Josip Broz Tito julisti sen suojelluksi valtionmetsäksi vuonna 1967. Alueen '
      + 'metsät olivat toisessa maailmansodassa vastarintaliikkeen näyttämönä, ja tapahtumien '
      + 'muistoksi pystytettiin vuonna 1972 muistomerkki sekä myöhemmin museo. Nykyään puisto '
      + 'tunnetaan ennen kaikkea luonnostaan ja ulkoilumahdollisuuksistaan: siellä järjestetään '
      + 'vuosittain Kozara Ultra Trail -maastojuoksutapahtuma ja kansainvälisen '
      + 'pyöräilyliiton kalenteriin kuuluva Kozara Grand Prix -maastopyöräilykilpailu, ja alueella '
      + 'on lukuisia vaellus- ja pyöräilyreittejä.',
    lahde: 'en-Wikipedia "Kozara National Park", johdanto-osa ja osio "History and cultural '
      + 'significance" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Kozaran kansallispuisto perustettiin?',
      vaihtoehdot: ['1945', '1958', '1967', '1974'],
      oikea: 2,
      fakta: 'Puiston Kozara Grand Prix -maastopyöräkilpailu kuuluu kansainvälisen '
        + 'pyöräilyliiton UCI:n viralliseen kilpailukalenteriin.',
    },
  },
  {
    id: 'hahmotelma-ostrozac',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-ostrozac-a335f6df.jpg',
      lyhyt: 'Ostrožacin linnan tornit ja muurit kaupungin yläpuolella.',
      selite: 'Vaaleat linnantornit kartiokattoineen kohoavat kukkulalla, jonka juurella talot '
        + 'levittäytyvät laakson pohjalle.',
      lahde: 'Valokuva: Flammard, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Flammard',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Utvrda_Ostrozac01.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/bih-nosto-hahmotelma-ostrozac-618cc259.jpg',
        lyhyt: 'Ostrožacin linnan muurikäytävä ja tornit pilvisenä päivänä.',
        selite: 'Kivinen muurikäytävä kiertyy kohti tornia, ja taustalla erottuu lisää linnan '
          + 'rakennuksia ja rauniomuureja.',
        lahde: 'Valokuva: Flammard, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Flammard',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Utvrda_Ostrozac02.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Ostrožacin linna',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kenelle Bihaćin pormestari Lothar von Berks rakennutti linnan uudelleen 1900-luvun alussa?',
      'Mikä patsaspuisto linnan pihalla toimii ja mistä kivestä veistokset on tehty?',
    ],
    korostukset: ['Babonić|Babonićien', 'bihaciitti|bihaciittikivestä'],
    nappi: 'Keskiaikainen raja-linna on ottomaanien hallussa jo vuodesta 1592; uusgoottilainen '
      + 'jälleenrakennus koittaa vasta 1900-luvun alussa',
    // 15.937 E / 44.904 N — en-Wikipedia "Ostrožac Castle"
    laudat: {
      maailmankartta: { x: 6364.6, y: 1605.7 },
      europe: { x: 517.2, y: 712.6 },
    },
    teksti: 'Ostrožacin linna kohoaa Cazinin liepeillä Luoteis-Bosniassa, ja sen juuret ulottuvat '
      + '1200-luvulle, jolloin se kuului kroatialaiselle Babonić-aatelissuvulle. Ottomaanit '
      + 'valtasivat linnan vuonna 1592. Nykyinen, satumainen ulkoasu tornikattoineen on paljon '
      + 'myöhempää perua: Bihaćin pormestari Lothar von Berks rakennutti linnan uudelleen '
      + 'vuosina 1900–1906 syntymäpäivälahjaksi habsburgilaissyntyiselle vaimolleen. Linnan '
      + 'pihalla toimii nykyään Ostrožacin kuvanveistäjäsiirtokunta, jonka yli viisikymmentä '
      + 'vuotta kestäneen perinteen aikana on syntynyt yli sata viisikymmentä bihaciittikivestä '
      + 'veistettyä monumentaaliveistosta — ainutlaatuinen ulkoilmapatsaspuisto Kaakkois-'
      + 'Euroopassa.',
    lahde: 'en-Wikipedia "Ostrožac Castle", johdanto-osa (tarkistettu 21.9.2026).',
  },
];
