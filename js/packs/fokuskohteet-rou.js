/*
 * FOKUSKOHTEET — ROMANIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-bgr.js:lle ja
 * js/packs/fokuskohteet-grc.js:lle, ja rakenne on kopioitu niistä
 * sellaisenaan: SAMA LISTA palvelee kahta pintaa, kohdenostoa
 * fokusvirrassa (js/fokusvirta.js poimii kohteita tunnuksilla, pöllö
 * puhuu `teksti`-kentän kuplasta, painikkeen lupaus on `nappi`) ja
 * kartan klikattavaa pop-upia (js/fokuskohteet.js lukee `nimi`,
 * `tyyppi`, `kuva`, `teksti` ja `lahde`). Kentät ja niiden perustelut on
 * selitetty Kreikan tiedoston alussa; tässä on vain se, mikä Romaniassa
 * on toisin.
 *
 * KAKSI KENTTÄÄ PÖLLÖÄ VARTEN (omistajan tilaus 25.8.2026) on nekin
 * kuvattu Kreikan tiedoston alussa: `kysymykset` on kaksi valmista,
 * pelaajan äänellä kirjoitettua kysymystä kartan tietoruudun loppuun,
 * ja `korostukset` on lista sanoista, jotka alleviivataan
 * leipätekstistä ja joista pöllö kertoo lisää ('perusmuoto|näkyvä
 * muoto', jos taivutus eroaa). Romaniassa pätee sama sääntö kuin
 * muualla: kysymys ei toista sitä, minkä teksti jo kertoo.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * docs/mantereet-tyoaineisto/fokuskohteet-romania.md, kohteet 1–12
 * samassa järjestyksessä kuin aineistossa. Aineiston pop-up-tekstit on
 * siirretty tänne sellaisinaan: yhtään faktaa ei ole lisätty eikä
 * muutettu. Kolme tietoista muotoseikkaa, joista yksikään ei kosketa
 * väitteitä:
 *
 *   1. Ajatusviivat on kirjoitettu talon tapaan pitkinä (—).
 *   2. Aineiston pop-up-teksti kirjoitti kylän nimen muodossa
 *      "Säpänțan", vaikka sama kohta (aineiston kohde 6, HUOM
 *      kirjoitusasusta) kieltää suomalaistetun asun nimenomaisesti:
 *      *"kylän nimi on Săpânța"*. Tässä on aineiston oma ohje eikä sen
 *      lipsahdus.
 *   3. Corvinin linnan pop-upista on JÄTETTY POIS viimeinen virke
 *      (linna elokuvien kuvauspaikkana). Aineisto merkitsee sen itse
 *      varmentamattomaksi ja käskee jättää pois tai korvata — se on
 *      jätetty pois, eikä tilalle ole keksitty mitään. Kohteen teksti
 *      on siksi listan lyhyin.
 *
 * ── AJOITUS, JOKA KOSKEE KOKO MAATA ────────────────────────────────
 *
 * Aineiston oma varoitus (osio "Vuoden 1873 rajaus"): isoisän
 * matkatessa Romania ei ollut itsenäinen eikä nykyisen kokoinen.
 * Constanța ja Tonavan suisto olivat Ottomaanien valtakuntaa (siirtyivät
 * Romanialle 1878), ja koko Transilvania — Bran, Sighișoara, Corvin,
 * Sarmizegetusa, Turda ja Făgărașin vuoret — kuului Itävalta-Unkariin
 * vuoteen 1920 asti. Peleș oli 1873 vasta peruskivi. Aineisto pitää tätä
 * etuna eikä haittana, ja niin pitää tämäkin tiedosto: jokainen on
 * luonteva kohta sanoa, mitä isoisä olisi nähnyt ja mitä ei.
 *
 * VLAD SEIVÄSTÄJÄ on käsitelty samalla periaatteella kuin Ali-pasha
 * Kreikassa ja osmanikausi Bulgariassa (Perustuslain ikäsopivuuskohta,
 * ks. takynostot-romania.md sääntö 2): hänen teoistaan ei kerrota
 * mitään. Bran sanoo, ettei hän asunut siellä; Sighișoara puhuu vain
 * hänen isästään — aineiston oma rajaus, koska syntymäpaikka on
 * lähteessä yhden historioitsijan kantana eikä varmennettuna faktana.
 *
 * ── KOORDINAATIT ───────────────────────────────────────────────────
 *
 * Sama kaksi kaavaa ja samat vakiot kuin Kreikassa ja Bulgariassa,
 * koska Bukarest on pelattavissa kummallakin laudalla:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *     Tarkistus: Bukarest 26,10389 E / 44,4325 N → 6703,5 / 1625,1, ja
 *     laudalla laatta on kohdassa 6702,8 / 1625,1 — 0,7 yksikön
 *     osumatarkkuus, sama luokka kuin Kreikan ja Bulgarian
 *     tarkistuksissa.
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js). Tarkistus: Bukarest → 712,4 / 725,0,
 *     laudalla 712 / 725.
 *
 * KARKEAT YLEISPISTEET on merkitty kohteittain: Tonavan suiston
 * koordinaatti on koko suiston yleispiste (aineiston oma huomio
 * kohteessa 5), ja Turdan suolakaivoksen koordinaatti on aineiston
 * ainoa, joka EI tullut en-Wikipedian coordinates-rajapinnasta vaan
 * Commonsin kautta (aineiston hylkylistan kohta 1) — se on merkitty
 * myös tänne, jottei sitä luultaisi muiden veroiseksi.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti, ja jokainen on aineiston itsensä ehdottama
 * tiedosto. Aineisto oli jo kysynyt Commonsin imageinfo-rajapinnalta
 * olemassaolon, koon, lisenssin, tekijän ja päiväyksen; sama kysely on
 * toistettu tässä tiedosto kerrallaan 25.8.2026 — ei arvattuja nimiä.
 * Kaikki ovat PD, CC0 tai CC, ja tekijä on `lahde`-rivillä, koska CC BY
 * vaatii maininnan.
 *
 * KAKSI KUVAA ON AINEISTON VAIHTOEHTO EIKÄ SEN ENSISIJAINEN: Sighișoara
 * saa Vlad Draculin talon (kohteen teksti kertoo juuri hänestä, ei
 * kaupungin siluetista) ja Tonavan suisto pelikaaniparven (kohteen
 * teksti nimeää pelikaanit). Molemmat ovat aineiston listalla, ja
 * peruste on merkitty kohteeseen.
 */

/**
 * Romanian fokuskohteet: aineiston kaikki 12 kohdetta samassa
 * järjestyksessä kuin docs/mantereet-tyoaineisto/fokuskohteet-romania.md.
 */
export const FOKUSKOHTEET_ROU = [
  {
    id: 'bran',
    nimi: 'Branin linna',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'sana',
    tyyppi: 'muu',
    kysymykset: [
      'Missä Vlad Seivästäjä sitten asui?',
      'Kuka linnassa on oikeasti asunut?',
    ],
    korostukset: ['Kronstadt|Kronstadtin', 'Valakia|Valakian'],
    /* Valintakuplan painike. Lupaus on se, mitä linna EI ole. */
    nappi: 'Linna, jossa Dracula ei asunut',
    // 45,515 N / 25,36722 E — en-Wikipedia "Bran Castle".
    laudat: {
      maailmankartta: { x: 6678.9, y: 1580.5 },
      europe: { x: 698.3, y: 696.6 },
    },
    teksti: 'Linnan rakensivat Kronstadtin eli Brașovin saksalaiset omalla '
      + 'kustannuksellaan ja omalla työvoimallaan, kun Unkarin kuningas '
      + 'Ludvig I antoi siihen luvan 19. marraskuuta 1377. Se vartioi '
      + 'Transilvanian ja Valakian välistä vuoristosolaa ja toimi myöhemmin '
      + 'tullipaikkana. Maailmalla sitä markkinoidaan Draculan linnana — '
      + 'mutta Vlad Seivästäjä ei asunut täällä, eikä Bram Stoker '
      + 'tiettävästi tiennyt linnasta mitään.',
    lahde: 'en-Wikipedia "Bran Castle", osiot "Stone castle of the Kronstadt '
      + 'Saxons" ja "\'Dracula\'s Castle\'" (tarkistettu 25.8.2026). HUOM: '
      + 'fi-Wikipedia sanoo linnan valmistuneen 1382; tässä on '
      + 'en-Wikipedian muotoilu eli vuoden 1377 rakennuslupa.',
    // Category:Bran Castle. Commons 25.8.2026: 3791×2516, CC BY-SA 3.0 ro,
    // Dobre Cezar, kuvattu 24.5.2012.
    kuva: {
      tiedosto: 'Castelul Bran2.jpg',
      selite: 'Branin linna Transilvanian ja Valakian välisen vuoristosolan '
        + 'yllä. Rakennuslupa on vuodelta 1377.',
      lahde: 'Dobre Cezar, Wikimedia Commons (CC BY-SA 3.0 ro)',
    },
  },
  {
    id: 'sighisoara',
    nimi: 'Sighișoara',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Vlad Dracul oli maanpaossa?',
      'Millä muilla nimillä kaupunki tunnetaan?',
    ],
    korostukset: ['maanpako|maanpaossa', 'rahanlyönti'],
    /* Valintakuplan painike. Lupaus on luvaton kolikko. */
    nappi: 'Ruhtinas, joka löi omia kolikoitaan',
    // 46,21694 N / 24,79111 E — en-Wikipedia "Sighișoara".
    laudat: {
      maailmankartta: { x: 6659.7, y: 1551.3 },
      europe: { x: 687.2, y: 678.1 },
    },
    teksti: 'Sighișoara on yksi harvoista yhä asutuista keskiaikaisista '
      + 'linnoituskaupungeista Itä-Euroopassa, ja sen vanhakaupunki on ollut '
      + 'Unescon maailmanperintökohteena vuodesta 1999. Kaupungissa asui '
      + 'maanpaossa Vlad Dracul — Vlad Seivästäjän isä — joka löi täällä '
      + 'omia kolikoitaan, vaikka rahanlyönti kuului Unkarin kuninkaille. '
      + 'Hänen asiakirjassaan esiintyy myös kaupungin romanialainen nimi '
      + 'ensimmäistä kertaa, vuonna 1435.',
    lahde: 'en-Wikipedia "Sighișoara", johdanto-osa ja osio "History" '
      + '(tarkistettu 25.8.2026). Poika mainitaan vain isän kautta: '
      + 'en-Wikipedia esittää Vlad Seivästäjän syntymäpaikan yhden '
      + 'historioitsijan (Radu Florescu) kantana, ei varmuutena.',
    /*
     * Category:Casa Vlad Dracul. Aineisto tarjosi myös kaupungin
     * yleiskuvan, mutta kohteen teksti kertoo nimenomaan Vlad Draculista
     * — tässä on se talo, jossa hän asui. Commons 25.8.2026: 4000×3000,
     * CC BY-SA 4.0, Cezar Suceveanu, kuvattu 29.8.2015, kuvaus "Vlad
     * Dracul House in Sighișoara".
     */
    kuva: {
      tiedosto: 'Casa Vlad Dracul din Sighisoara4.JPG',
      selite: 'Vlad Draculin talo Sighișoaran vanhassakaupungissa. '
        + 'Vanhakaupunki on ollut Unescon listalla vuodesta 1999.',
      lahde: 'Cezar Suceveanu, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'peles',
    nimi: 'Peleșin linna',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä linnan oma sähkö tuotettiin?',
      'Ketkä työmaalla noita kieliä puhuivat?',
    ],
    korostukset: ['Carol I'],
    /* Valintakuplan painike. Lupaus on isoisän matkavuosi. */
    nappi: 'Peruskivi isoisän matkavuonna',
    // 45,35984 N / 25,54265 E — en-Wikipedia "Peleș Castle".
    laudat: {
      maailmankartta: { x: 6684.8, y: 1586.9 },
      europe: { x: 701.6, y: 700.6 },
    },
    teksti: 'Peruskivi laskettiin 22. elokuuta 1873 — täsmälleen isoisän '
      + 'matkavuonna. Carol I oli ihastunut vuoristomaisemaan jo 1866 ja '
      + 'osti Kruunulle viisi neliökilometriä maata 1872; linna valmistui '
      + 'lopullisesti vasta 1914, ja vihkiäisiä vietettiin 1883. Siitä tuli '
      + 'maailman ensimmäinen linna, joka toimi kokonaan omalla, paikan '
      + 'päällä tuotetulla sähköllä. Työmaalla puhuttiin kuningattaren '
      + 'mukaan neljäätoista kieltä.',
    lahde: 'en-Wikipedia "Peleș Castle", johdanto-osa ja osio "History" '
      + '(tarkistettu 25.8.2026). Neljätoista kieltä on kuningatar '
      + 'Elisabethin päiväkirjalainaus samassa osiossa. Suomenkielinen nimi '
      + '"Peleșin linna" on aineiston koostajan muodostama: fi-Wikipediassa '
      + 'ei ole omaa artikkelia.',
    // Category:Peleș Castle. Commons 25.8.2026: 3986×2848, CC BY-SA 3.0,
    // Myrabella, kuvattu 29.7.2012, kuvaus "Peleș Castle in Sinaia, Romania".
    kuva: {
      tiedosto: '01 Chateau Peles.jpg',
      selite: 'Peleșin linna Sinaiassa. Peruskivi laskettiin 22. elokuuta '
        + '1873, ja linna valmistui lopullisesti vasta 1914.',
      lahde: 'Myrabella, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'transfagarasan',
    nimi: 'Transfăgărășan',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'tekniikka',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä linna tien varrella on?',
      'Miksi reitti vedettiin juuri tähän kohtaan vuoristoa?',
    ],
    korostukset: ['dynamiitti|dynamiittia'],
    /* Valintakuplan painike. Lupaus on rakentamisen syy. */
    nappi: 'Vuoristotie, joka rakennettiin pelosta',
    // 45,5981 N / 24,6165 E — en-Wikipedia "Transfăgărășan", tien korkein
    // kohta (ei tien keskipiste eikä sen päätepiste).
    laudat: {
      maailmankartta: { x: 6653.9, y: 1577.1 },
      europe: { x: 683.8, y: 694.4 },
    },
    teksti: 'Yhdeksänkymmenen kilometrin vuoristotie rakennettiin 1970–1974 '
      + 'Nicolae Ceaușescun käskystä, vastauksena Neuvostoliiton hyökkäykseen '
      + 'Tšekkoslovakiaan 1968: hän halusi reitin, jota vihollinen ei voisi '
      + 'tukkia jokilaaksossa. Työhön kului noin kuusi miljoonaa kiloa '
      + 'dynamiittia 2 000 metrin korkeudessa, ja hinta oli kova. Tie '
      + 'kiipeää 2 042 metriin ja on lumen takia auki vain kesäkuun lopusta '
      + 'lokakuulle.',
    /*
     * IKÄSOPIVUUSRAJAUS (aineiston oma, kohde 4): lähde kertoo, että
     * räjäytystöissä käytettiin kouluttamattomia varusmiehiä ja että moni
     * kuoli — virallisesti 40 sotilasta, työntekijöiden epävirallisten
     * arvioiden mukaan satoja. Aineisto määrää tämän lauseen
     * LOPPUPAINOKSI ("hinta oli kova") eikä ensimmäiseksi virkkeeksi, ja
     * jos luvut kerrotaan, molemmat kerrotaan. Lähderivi tekee sen, mitä
     * pop-up ei tee: sanoo mistä lause on.
     */
    lahde: 'en-Wikipedia "Transfăgărășan", osiot "History" ja "Route" '
      + '(tarkistettu 25.8.2026). Lause "hinta oli kova" viittaa saman '
      + 'osion tietoon uhreista: virallisesti 40 sotilasta, työntekijöiden '
      + 'epävirallisten arvioiden mukaan satoja.',
    // Category:Transfăgărășan. Commons 25.8.2026: 1600×1067, CC BY 2.0,
    // Horia Varlan, kuvattu 1.8.2008, kuvaus paikantaa kuvan Bâlea-järven
    // alapuolelle tien pohjoisosaan.
    kuva: {
      tiedosto: 'Wide view over the northern Transfagarasan.jpg',
      selite: 'Transfăgărășanin pohjoisosan mutkia Bâlea-järven alapuolella. '
        + 'Tien korkein kohta on 2 042 metrissä.',
      lahde: 'Horia Varlan, Wikimedia Commons (CC BY 2.0)',
    },
  },
  {
    id: 'tonavan-suisto',
    nimi: 'Tonavan suisto',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Milloin pelikaanit saapuvat suistoon?',
      'Miten suistossa liikutaan?',
    ],
    korostukset: ['jokisuisto', 'ruovikko|ruovikkoa'],
    /* Valintakuplan painike. Lupaus on asukasluvun ja lintumäärän suhde. */
    nappi: 'Suisto, jossa on enemmän lintuja kuin ihmisiä',
    /*
     * 45,2 N / 29,5 E — en-Wikipedia "Danube Delta". KOKO SUISTON
     * YLEISPISTE, ei täsmäpaikka (aineiston oma huomio kohteessa 5).
     */
    laudat: {
      maailmankartta: { x: 6816.7, y: 1593.5 },
      europe: { x: 777.6, y: 704.8 },
    },
    teksti: 'Euroopan toiseksi suurin jokisuisto ja maanosan parhaiten '
      + 'säilynyt: yli 4 000 neliökilometriä ruovikkoa, kanavia ja '
      + 'hiekkasärkkiä. Kesäisin täällä on yli 320 lintulajia ja talvella '
      + 'yli miljoona lintua, ja yli puolet koko Euraasian pelikaanikannasta '
      + 'pesii juuri täällä. Asukkaita on kaksi neliökilometriä kohti — '
      + 'vähemmän kuin melkein missään muualla lauhkeassa Euroopassa. '
      + 'Isoisän aikaan 1873 suisto kuului yhä Ottomaanien valtakuntaan.',
    lahde: 'en-Wikipedia "Danube Delta", johdanto-osa sekä osiot "Main '
      + 'ecosystems", "Inhabitants" ja "History"; pelikaanit en-Wikipedia '
      + '"Great white pelican" (tarkistettu 25.8.2026).',
    /*
     * Category:Danube Delta. Aineisto tarjosi myös Kiepertin kartan
     * vuodelta 1867, mutta kohteen teksti nimeää nimenomaan pelikaanit —
     * tässä on niiden parvi. Commons 25.8.2026: 6000×4000, CC BY-SA 4.0,
     * Joe Mabel, kuvattu 25.9.2024.
     */
    kuva: {
      tiedosto: 'Danube Delta 2024-09-25 - 47 - flock of Great white pelicans.jpg',
      selite: 'Pelikaaniparvi Tonavan suistossa. Yli puolet koko Euraasian '
        + 'pelikaanikannasta pesii täällä.',
      lahde: 'Joe Mabel, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'iloinen-hautausmaa',
    nimi: 'Iloinen hautausmaa',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'kulttuuri',
    tyyppi: 'muu',
    kysymykset: [
      'Kuka ristit veistää nykyään?',
      'Millaisia runot ovat sanoiltaan?',
    ],
    korostukset: ['naiivi taide|naiivi'],
    /* Valintakuplan painike. Lupaus on hautausmaan sävy. */
    nappi: 'Hautausmaa, jolla on huumorintajua',
    // 47,97139 N / 23,69556 E — en-Wikipedia "Merry Cemetery".
    laudat: {
      maailmankartta: { x: 6623.2, y: 1477.4 },
      europe: { x: 666.2, y: 632.0 },
    },
    teksti: 'Săpânțan kylässä haudat ovat kirkkaanvärisiä puuristejä, joihin '
      + 'on maalattu naiivi kuva vainajan elämästä ja kirjoitettu runo '
      + 'hänestä — usein huumorilla. Ensimmäisen ristin veisti paikallinen '
      + 'taiteilija Stan Ioan Pătraș vuonna 1935, ja 1960-luvulta lähtien '
      + 'tammiristejä on kertynyt yli 800. Hautausmaa poikkeaa tietoisesti '
      + 'eurooppalaisesta tavasta pitää kuolemaa yksinomaan juhlallisena.',
    lahde: 'en-Wikipedia "Merry Cemetery", johdanto-osa ja osio "Founder" '
      + '(tarkistettu 25.8.2026). Suomenkielinen nimi on aineiston '
      + 'koostajan käännös: fi-Wikipediassa ei ole omaa artikkelia. '
      + 'Yhtään esimerkkirunoa ei ole tässä, koska niiden tekstit eivät '
      + 'tulleet aineiston haussa mukaan — keksittyä käännöstä ei tehdä.',
    // Category:Cimitirul Vesel. Commons 25.8.2026: 3024×4235, CC BY-SA 4.0,
    // Chainwit., kuvattu 13.4.2023, kuvaus "Merry Cemetery, Maramures".
    kuva: {
      tiedosto: 'Cimitirul Vesel, Săpânța, Maramureș - (2023) - IMG 18.jpg',
      selite: 'Iloisen hautausmaan maalattuja puuristejä Săpânțassa. '
        + 'Tammiristejä on kertynyt yli 800.',
      lahde: 'Chainwit., Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'moldoveanu',
    nimi: 'Moldoveanu',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä eläimiä Făgărașin vuorilla elää?',
      'Miksi tähti nimettiin vuoren mukaan?',
    ],
    korostukset: ['Făgăraș|Făgărașin', 'Pohjankruunu|Pohjankruunun'],
    /* Valintakuplan painike. Lupaus on tähti, ei korkeus. */
    nappi: 'Huippu, jonka mukaan nimettiin tähti',
    // 45,6 N / 24,73778 E — en-Wikipedia "Moldoveanu Peak".
    laudat: {
      maailmankartta: { x: 6657.9, y: 1577.0 },
      europe: { x: 686.2, y: 694.3 },
    },
    teksti: 'Moldoveanu on Romanian korkein huippu, 2 545 metriä, ja se '
      + 'kohoaa Etelä-Karpaattien Făgărașin vuoristossa. Suosituimmat '
      + 'reitit nousevat viereisen Viștea Maren (2 527 m) kautta, ja '
      + 'lähimmät kylät ovat Victoria pohjoisessa ja Câmpulung etelässä. '
      + 'Vuoden 2019 joulukuussa Moldoveanun mukaan nimettiin tähti: XO-1, '
      + '536 valovuoden päässä Pohjankruunun tähdistössä.',
    lahde: 'en-Wikipedia "Moldoveanu Peak", johdanto-osa, reittiosio ja '
      + 'tähtinimen kohta (tarkistettu 25.8.2026). HUOM: fi-Wikipedia antaa '
      + 'korkeudeksi 2 544 m, en-Wikipedia 2 545 m — tässä on aineiston '
      + 'tarkistusstandardin mukaisesti en-Wikipedian luku.',
    // Category:Moldoveanu Peak. Commons 25.8.2026: 6704×3136, CC BY-SA 4.0,
    // MIHAIL, kuvattu 23.8.2018, kuvaus "Highest mountain peak in Romania".
    kuva: {
      tiedosto: 'Moldoveanu Peak (Romania).jpg',
      selite: 'Moldoveanu Făgărașin vuoristossa. Huippu on Romanian korkein, '
        + '2 545 metriä.',
      lahde: 'MIHAIL, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'rautaportti',
    nimi: 'Rautaportti',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Minne Ada Kalehin asukkaat muuttivat?',
      'Kulkevatko laivat rotkon läpi nykyään?',
    ],
    korostukset: ['kalauz', 'erillisalue'],
    /* Valintakuplan painike. Lupaus on saari, ei rotko. */
    nappi: 'Saari, joka jäi Tonavan pohjaan',
    // 44,67111 N / 22,52972 E — en-Wikipedia "Iron Gates".
    laudat: {
      maailmankartta: { x: 6584.3, y: 1615.3 },
      europe: { x: 643.8, y: 718.7 },
    },
    teksti: 'Tonava kaivautuu tässä Karpaattien ja Balkanin vuorten väliin, '
      + 'ja virta oli vuosisatoja niin vaarallinen, että laivat tarvitsivat '
      + 'paikallisen luotsin — ottomaanien aikaan luotsia kutsuttiin nimellä '
      + 'kalauz, "opas". Vielä 1900-luvulla laivat vedettiin kanavan läpi '
      + 'veturilla. Kun patoja rakennettiin 1960–70-luvulla, vedenpinta '
      + 'nousi 35 metriä ja Ada Kalehin saari jäi pinnan alle: entinen '
      + 'turkkilainen erillisalue, moskeija ja tuhat kujaa.',
    lahde: 'en-Wikipedia "Iron Gates", johdanto-osa sekä osiot "Navigation '
      + 'and channels", "Dams" ja "Ada Kaleh" (tarkistettu 25.8.2026).',
    /*
     * Category:Ada Kaleh. Kuva on ISOISÄN OMALTA VUOSISADALTA: saari
     * sellaisena kuin hän olisi voinut sen nähdä — ja se on aineiston
     * mukaan tämän kohteen vahvin 1873-kytkös, koska pelaaja ei voi nähdä
     * sitä enää millään. Commons 25.8.2026: 985×600, public domain, tekijä
     * tuntematon, päiväys "late 19th century".
     */
    kuva: {
      tiedosto: 'Ada-Kaleh.jpg',
      selite: 'Ada Kalehin saari 1800-luvun lopulla. Se jäi patoaltaan alle, '
        + 'kun vedenpinta nousi 35 metriä.',
      lahde: 'Tuntematon kuvaaja, Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'constanta',
    nimi: 'Constanța',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Augustus karkotti Ovidiuksen?',
      'Millainen satama Constanța on nykyään?',
    ],
    korostukset: ['Tomis', 'Tristia'],
    /* Valintakuplan painike. Lupaus on karkotus. */
    nappi: 'Kaupunki, jonne runoilija karkotettiin',
    // 44,16667 N / 28,63333 E — en-Wikipedia "Constanța".
    laudat: {
      maailmankartta: { x: 6787.8, y: 1636.0 },
      europe: { x: 761.0, y: 732.0 },
    },
    teksti: 'Romanian vanhin yhtäjaksoisesti asuttu kaupunki, perustettu '
      + 'kreikkalaisena siirtokuntana Tomis noin 600 eaa. Vuonna 8 jaa. '
      + 'keisari Augustus karkotti tänne runoilija Ovidiuksen, joka vietti '
      + 'elämänsä kahdeksan viimeistä vuotta valittaen kohtaloaan runoissaan '
      + 'Tristia ja Epistulae ex Ponto — hänen mukaansa kaupunki oli "sodan '
      + 'runtelema kulttuurierämaa valtakunnan kaukaisimmalla laidalla". '
      + 'Isoisän aikaan 1873 Constanța oli yhä ottomaanien kaupunki; '
      + 'Romanialle se siirtyi vasta 1878.',
    lahde: 'en-Wikipedia "Constanța", johdanto-osa sekä osiot "Ancient '
      + 'history" ja "Recent history" (tarkistettu 25.8.2026).',
    // Category:Statue of Ovid, Constanța. Kuvassa on Ettore Ferrarin
    // veistämä Ovidiuksen patsas (1887) aukiolla, joka on nimetty hänen
    // mukaansa. Commons 25.8.2026: 3124×2082, CC BY-SA 2.0, Alexandru
    // Pănoiu, kuvattu 27.8.2009.
    kuva: {
      tiedosto: 'Statue of Ovid and National History Museum in Constantza.jpg',
      selite: 'Ovidiuksen patsas Constanțan vanhassakaupungissa, taustalla '
        + 'kansallinen historiamuseo.',
      lahde: 'Alexandru Pănoiu, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
  {
    id: 'sarmizegetusa',
    nimi: 'Sarmizegetusa Regia',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Keitä daakialaiset olivat?',
      'Mitä pyhäkön kalenterista tiedetään?',
    ],
    korostukset: ['murus dacicus', 'daakialaiset|Daakialaisten'],
    /* Valintakuplan painike. Lupaus on pyhäkkö, ei linnoitus. */
    nappi: 'Kalenteri vuoren huipulla',
    // 45,6219 N / 23,3093 E — en-Wikipedia "Sarmizegetusa Regia".
    laudat: {
      maailmankartta: { x: 6610.3, y: 1576.1 },
      europe: { x: 658.7, y: 693.7 },
    },
    teksti: 'Daakialaisten pääkaupunki ennen Rooman sotia: kuusi linnoitusta '
      + '1 200 metrin korkuisen vuoren päällä Orăștien vuoristossa, '
      + 'linnoitusala lähes 30 000 neliömetriä. Muurit on ladottu '
      + 'tekniikalla, jolla on oma nimensä, murus dacicus. Pyhällä alueella '
      + 'on suuri pyöreä pyhäkkö, jota kutsutaan usein kalenteriksi: '
      + 'puupylväitä D-kirjaimen muotoon, ympärillä puinen kehä ja '
      + 'kivireunus — asetelma muistuttaa jonkin verran englantilaista '
      + 'Stonehengeä.',
    lahde: 'en-Wikipedia "Sarmizegetusa Regia", johdanto-osa ja osio '
      + '"Layout" (tarkistettu 25.8.2026). Lähde sanoo "bears some '
      + 'resemblance", joten teksti sanoo "muistuttaa jonkin verran" — '
      + 'ei "Romanian Stonehenge". Kohdetta ei pidä sekoittaa Ulpia Traiana '
      + 'Sarmizegetusaan, joka on Trajanuksen rakentama roomalainen Daakian '
      + 'pääkaupunki noin 40 kilometrin päässä.',
    // Category:Sarmizegetusa Regia. Commons 25.8.2026: 3872×2592,
    // CC BY-SA 3.0 ro, Calin Jorza, 2011 — juuri se pyöreä pyhäkkö,
    // jonka teksti nimeää.
    kuva: {
      tiedosto: 'Sarmizegetusa Regia - Sanctuarul mare circular. (Zona sacra).jpg',
      selite: 'Suuri pyöreä pyhäkkö Sarmizegetusa Regian pyhällä alueella. '
        + 'Sitä kutsutaan usein kalenteriksi.',
      lahde: 'Calin Jorza, Wikimedia Commons (CC BY-SA 3.0 ro)',
    },
  },
  {
    id: 'turda',
    nimi: 'Turdan suolakaivos',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'tekniikka',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka syvällä maanalainen järvi on?',
      'Millaista kaivoksessa on käydä?',
    ],
    korostukset: ['Transilvania|Transilvanian'],
    /* Valintakuplan painike. Lupaus on soutuvene maan alla. */
    nappi: 'Soutuvene suolakaivoksen pohjalla',
    /*
     * 46,58771 N / 23,78740 E. HUOM: en-Wikipedian artikkelilla "Salina
     * Turda" EI ole coordinates-tietoa, ja aineisto haki tämän pisteen
     * Commonsin kautta (aineiston hylkylistan kohta 1). Se on listan
     * ainoa koordinaatti, joka ei ole samasta lähteestä kuin muut —
     * kelpaa kohteen nimeämiseen kartalla, mutta ei täsmäpaikaksi ilman
     * uutta tarkistusta.
     */
    laudat: {
      maailmankartta: { x: 6626.2, y: 1535.8 },
      europe: { x: 667.9, y: 668.3 },
    },
    teksti: 'Turdan suolakaivos Durgău-Valea Sărată -alueella avattiin '
      + 'turisteille vasta vuonna 1992, ja siitä tuli nopeasti yksi '
      + 'Transilvanian oudoimmista käyntikohteista: vanhojen kaivoskuilujen '
      + 'pohjalla on maanalainen järvi, jolla soudetaan, ja valaistuja '
      + 'rakennelmia luolan katosta riippumassa. Vuonna 2017 kaivoksessa '
      + 'kävi noin 618 000 vierasta.',
    lahde: 'en-Wikipedia "Salina Turda", johdanto-osa (tarkistettu '
      + '25.8.2026). Suomenkielinen nimi on aineiston koostajan käännös: '
      + 'fi-Wikipediassa ei ole omaa artikkelia. Kaivoksen iästä ja '
      + 'varhaisemmasta historiasta ei sanota mitään, koska lähdeartikkeli '
      + 'ei kerro niistä.',
    // Category:Salina Turda. Commons 25.8.2026: 5839×3882, CC0, DimiTalen,
    // 2017 — maanalainen järvi ja katosta riippuvat valaistut rakennelmat,
    // eli täsmälleen se, mistä teksti kertoo.
    kuva: {
      tiedosto: 'UFO-shaped constructions in the underground lake, Mina Terezia, Turda salt mine, Turda, 2017.jpg',
      selite: 'Maanalainen järvi ja valaistuja rakennelmia Turdan '
        + 'suolakaivoksen Terezia-kuilussa.',
      lahde: 'DimiTalen, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'corvin',
    nimi: 'Corvinin linna',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Mitkä ovat Romanian seitsemän ihmettä?',
      'Kuka linnan rakennutti?',
    ],
    korostukset: ['Hunyadi|Hunyadin'],
    /* Valintakuplan painike. Lupaus on seitsemän ihmeen lista. */
    nappi: 'Linna Romanian seitsemästä ihmeestä',
    // 45,74917 N / 22,88833 E — en-Wikipedia "Corvin Castle".
    laudat: {
      maailmankartta: { x: 6596.3, y: 1570.8 },
      europe: { x: 650.7, y: 690.4 },
    },
    /*
     * LISTAN LYHYIN TEKSTI, JA SE ON TARKOITUS. Aineisto merkitsee tämän
     * kohteen lähdepohjaltaan heikoimmaksi (siitä haettiin vain
     * johdanto-osa) ja käskee jättää pois varmentamattoman virkkeen
     * elokuvien kuvauspaikasta. Se on jätetty pois, eikä tilalle ole
     * keksitty mitään — kaksi varmennettua virkettä on parempi kuin
     * kolmas, jota lähde ei sano.
     */
    teksti: 'Hunedoaran goottilais-renessanssilinna on yksi Euroopan '
      + 'suurimmista linnoista ja kuuluu "Romanian seitsemään ihmeeseen". '
      + 'Se tunnetaan myös nimillä Hunyadin linna ja Hunedoaran linna.',
    lahde: 'en-Wikipedia "Corvin Castle", johdanto-osa (tarkistettu '
      + '25.8.2026). Vain johdanto on tarkistettu, joten kohteesta ei '
      + 'sanota enempää kuin siinä lukee.',
    // Category:Corvin Castle. Commons 25.8.2026: 2400×2107, CC BY-SA 4.0,
    // Pasztilla aka Attila Terbócs, 2019.
    kuva: {
      tiedosto: 'Castle of Hunedoara 2019 01.jpg',
      selite: 'Corvinin linna Hunedoarassa. Se on yksi Euroopan '
        + 'suurimmista linnoista.',
      lahde: 'Pasztilla aka Attila Terbócs, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  /*
   * ── ENTINEN TÄKYNOSTO NORMAALINA KOHTEENA (omistaja 26.8.2026 ilta:
   *    *"Täkyjä josta tulee puhekupla pitää olla vain yksi per maa.
   *    Kaikki muut normaaleita."*) ────────────────────────────────────
   *
   * Bukarestin täkypoolissa (js/packs/fokusvirta-bukarest.js
   * takynostot) oli kolme nostoa; siellä on nyt tasan yksi. Eläinnosto
   * "hevoset" jäi kokonaan pois, koska työaineisto sitoo sen suoraan
   * tämän tiedoston kohteeseen `tonavan-suisto`
   * (docs/mantereet-tyoaineisto/takynostot-romania.md, ehdokas 9:
   * *"Kohde: Tonavan suisto (fokuskohde 5)"*) — kahta merkkiä samaan
   * paikkaan ei tehdä. Tämä kolmas on siirretty tähän sellaisenaan.
   *
   * TEKSTI, KUVA JA LÄHTEET OVAT NOSTON OMAT eikä niitä ole
   * kirjoitettu uudelleen: `lunastus` → `teksti`, `otsikko` → `nappi`,
   * kuva kaikkine kenttineen entisellään.
   *
   * PAIKKA ON AINEISTON OMA, EI ARVATTU. Nostolla ei ollut
   * koordinaatteja, koska se piirtyi ruudun alalaidan liuskana, mutta
   * kohde tarvitsee paikan kartalla. Työaineisto nimeää sen itse
   * (takynostot-romania.md, ehdokas 3: *"Kohde: Romania yleisesti;
   * syntymäkaupunki Onești, Bacăun lääni"*), ja asteluvut on muunnettu
   * laudan yksiköiksi tiedoston alussa kuvatuilla kaavoilla. Piste on
   * siis se kaupunki, josta voimistelija on kotoisin — tapahtuma itse
   * oli Montrealissa, eikä sitä väitetä tässä muuksi.
   */
  {
    id: 'comaneci',
    nimi: 'Nadia Comăneci',
    tyyppi: 'muu',
    symboli: 'urheilu',
    /* Valintakuplan painike: noston oma klikkiotsikko sellaisenaan. */
    nappi: 'Tulostaulu ei osannut näyttää täyttä kymppiä — se näytti 1.00',
    // 26,76917 E / 46,25861 N — en-Wikipedia "Onești" (syntymäkaupunki,
    // takynostot-romania.md, ehdokas 3).
    laudat: {
      maailmankartta: { x: 6725.6, y: 1549.6 },
      europe: { x: 725.2, y: 677.0 },
    },
    /* Faktat: takynostot-romania.md, ehdokas 3 (VARMA). */
    teksti: '18. heinäkuuta 1976 Montrealin olympialaisissa 14-vuotias '
      + 'Nadia Comăneci sai ensimmäisenä voimistelijana '
      + 'olympiahistoriassa täydet kymmenen pistettä eritasonojapuilta. '
      + 'Tulostaulut toimittanut Omega oli saanut ymmärtää, ettei täyttä '
      + 'kymppiä voi saada, eikä ollut ohjelmoinut taulua näyttämään '
      + 'sitä — niinpä tuomarit saivat sen näkyviin ainoalla jäljellä '
      + 'olleella tavalla, muodossa 1.00. Samoissa kisoissa hän sai vielä '
      + 'kuusi kymppiä lisää ja voitti kolme kultaa.',
    lahde: 'en-Wikipedia "Nadia Comăneci", johdanto ja osio "1976 Summer '
      + 'Olympics" (tarkistettu 25.8.2026 työaineistoon '
      + 'docs/mantereet-tyoaineisto/takynostot-romania.md, ehdokas 3).',
    /*
     * Commons 25.8.2026: 480×722, public domain, tekijä tuntematon
     * (agerpres-arkisto), kuvattu 3.8.1976, kuvaus "Nadia Comăneci at
     * the 1976 Olympics".
     */
    kuva: {
      tiedosto: 'Nadia Comăneci 1976.jpg',
      selite: 'Nadia Comăneci Montrealin olympialaisissa 1976.',
      lahde: 'Tuntematon kuvaaja (Agerpres-arkisto) 1976, Wikimedia '
        + 'Commons (public domain)',
    },
  },
];

const ROU_TUNNUKSITTAIN = new Map(FOKUSKOHTEET_ROU.map((k) => [k.id, k]));

/**
 * Poimii Romanian kohteet tunnuksilla siinä järjestyksessä kuin ne on
 * pyydetty. Tuntematon tunnus jätetään pois hiljaa — sama sääntö ja
 * sama syy kuin Kreikassa ja Bulgariassa: kirjoitusvirhe listassa ei saa
 * kaataa koko kaupungin virtaa.
 *
 * NIMI ON PREFIKSOITU (rouFokuskohteet), koska yhden tiedoston versio
 * ketjuttaa kaikki moduulit samaan näkyvyysalueeseen: paljas
 * `fokuskohteet` olisi niputuksessa uudelleenjulistus Kreikan ja
 * Bulgarian vastaavien kanssa (tools/tarkista-niputus.mjs).
 */
export function rouFokuskohteet(tunnukset) {
  return (tunnukset ?? []).map((id) => ROU_TUNNUKSITTAIN.get(id)).filter(Boolean);
}
