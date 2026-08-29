/*
 * DUBROVNIKIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle ja -wien.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Ragusan laivaston kulta (aarremerkintä).
 *
 * SÄVEL ON KAANONISTA. docs/isoisan-raamattu.md, kaupunkijako:
 * *"Dubrovnik (hengähdys/viisaus: ostettu rauha)"*. Sävel koskee
 * merkinnän ÄÄNTÄ eikä syvyysporrasta — Dubrovnik on Kroatian
 * aarrekaupunki, joten se saa Raamatun syvyysportaikon täyden pinon.
 * Ostettu rauha kantaa koko paketin: se on merkinnän ensimmäinen
 * lause, oppitunnin aihe ja kohtaamisen kysymyksen tausta.
 *
 * FAKTAPOHJA. Aalto 2:n maille EI ole takynostot-työaineistoa, joten
 * täyt, oppitunti, lehtitehtävät ja täkynosto on rakennettu kahdesta
 * lähteestä ja vain niistä: pelin omasta kuratoidusta aineistosta
 * (js/packs/kulttuuri-kategoriat.js dubrovnik, js/packs/
 * nahtavyysjutut.js dubrovnik, js/packs/fokuskohteet-hrv.js) sekä
 * Wikipedian rajapinnasta 29.8.2026 haetuista lisätiedoista, joista
 * jokainen on katsottu KAHDESTA riippumattomasta lähteestä. Lähteet on
 * nimetty kunkin kohdan omassa kommentissa.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero.
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ÄÄNITE PUUTTUU VIELÄ: `matkakirja.aanite` kirjoitetaan samassa
 * erässä kuin assets/audio/puhe-fokus-matkakirja-dubrovnik.mp3
 * (tools/generoi-luennat.mjs dubrovnik). Ilman kenttää js/ui.js
 * piilottaa kaiuttimen.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions). Ihmisiä sisältävät kuvat on katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Karanteenikysymys on Dubrovnikin lehden
 * sivun 2 ("Tasavalta") oman noston "Laivat joutuivat odottamaan
 * kuukauden saarella" tekstiä ja apteekkikysymys sivun 1
 * ("Dubrovnik") oman noston "Euroopan vanhin apteekki" tekstiä
 * (js/packs/kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole
 * kummassakaan.
 *
 * MIKSI EI VAPAUSKYSYMYSTÄ: kaupungin laattakysymys koskee tasavallan
 * lipun sanaa (ks. KOHTAAMINEN alempana). Jos lehden aarteen avaava
 * tehtävä kysyisi samasta vapaudesta, aarrekysymys olisi ratkaistu
 * ennen kuin Ivo on tavattu.
 */
const KARANTEENI_VISA = {
  kysymys: 'Vuonna 1377 Dubrovnikin suuri neuvosto määräsi '
    + 'kulkutautialueilta tulevat odottamaan asumattomalla saarella. '
    + 'Mistä sanasta odotusaika sai nimensä?',
  vaihtoehdot: [
    'Italian sanasta quaranta, neljäkymmentä',
    'Latinan sanasta carantia, vartiointi',
    'Kreikan sanasta charax, aitaus',
  ],
  oikea: 0,
  fakta: 'Ensin odotusaika oli kuukausi ja myöhemmin neljäkymmentä '
    + 'päivää. Odottajille rakennettiin puumajoja, koska puun pystyi '
    + 'polttamaan, jos tauti oli tarttunut.',
};

const APTEEKKI_VISA = {
  kysymys: 'Dubrovnikin fransiskaaniluostarin apteekki avattiin vuonna '
    + '1317. Mikä siinä on erityistä?',
  vaihtoehdot: [
    'Se on Euroopan vanhin yhtäjaksoisesti toiminut apteekki',
    'Se on rakennettu kokonaan lasista',
    'Se sai myydä lääkkeitä vain merimiehille',
  ],
  oikea: 0,
  fakta: 'Munkit valmistivat voiteita yrteistä, ja osa resepteistä on '
    + 'yhä käytössä. Apteekki palvelee asiakkaita edelleen.',
};

export const FOKUSVIRTA_DUBROVNIK = {
  kaupunki: 'dubrovnik',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi on syyskuu: merkintä
     * kertoo koko muurikierroksesta, ja Dalmatian kesähelteessä
     * kahden kilometrin kivikierros paljaalla muurilla olisi eri
     * merkintä. Sääkommentti on isoisän havainto eikä mitattu väite.
     */
    paikkarivi: 'Dubrovnik, syyskuussa 1873. Poutaa; muurilla käy tuuli '
      + 'mereltä.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Ragusa osti rauhansa joka vuosi uudestaan — halvempaa kuin '
      + 'sota, ja kauniimpaa. Kävelin muurin koko kierroksen ja laskin '
      + 'torneja; kaupunki on kuin laiva, joka päätti jäädä satamaan ja '
      + 'kivettyä.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu. Äänitettä
     * ei ole vielä generoitu, joten `aanite` puuttuu (ks. tiedoston
     * alku).
     */
    luenta: '[curious] Ragusa osti rauhansa joka vuosi uudestaan — '
      + '[softly] halvempaa kuin sota, ja kauniimpaa. Kävelin muurin koko '
      + 'kierroksen ja laskin torneja; [whispers] kaupunki on kuin laiva, '
      + 'joka päätti jäädä satamaan ja kivettyä.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS — PARIPERIAATE (Raamattu, "LIVIA AIKASIIRTYMÄN
     * VÄLITTÄJÄNÄ"): merkintä on rauhallinen ja viisas, ei synkkä,
     * joten Livia saa naljailla. Nalja ei osu isoisän ajatukseen vaan
     * yhteen puuttuvaan tietoon, ja tieto on tarkistettavissa.
     *
     * FAKTAKURI: kolme väitettä, kaikki tarkistettavia. (1) Ragusan
     * tasavalta lakkasi olemasta 1808, kuusikymmentäviisi vuotta ennen
     * isoisän käyntiä (js/packs/nahtavyysjutut.js, "Pilen portti", jo
     * hyväksyttyä pelidataa; en-Wikipedia "Republic of Ragusa",
     * tietolaatikko: 1358–1808). (2) Muurikierros on noin 1 940 metriä
     * (js/packs/kulttuuri-kategoriat.js, dubrovnik/avauskuvat).
     * (3) Muureilla kävi vuonna 2019 yli 1,2 miljoonaa kävijää
     * (en-Wikipedia "Walls of Dubrovnik", johdanto). Fritulet ovat
     * pelin omaa Livia-aineistoa (js/fokusvirta.js LIVIAN_SAAPUMISET).
     *
     * PUHEKIELIPASSI: lyhentymät vain reunoilla ("Kääk", "Mut"),
     * keskellä sanat auki; pronominit kokonaisina; ei huutomerkkejä.
     */
    maadoitus: 'Kääk. Laiva, joka päätti jäädä satamaan ja kivettyä — '
      + 'kauniisti sanottu, ja minä sanon sen mieluummin kuin keksin '
      + 'itse. Yksi asia isoisältäsi vain jäi huomaamatta: se tasavalta, '
      + 'jonka rauhaa hän ihaili, oli lakannut olemasta jo 1808, '
      + 'kuusikymmentäviisi vuotta ennen kuin hän nousi muurille. Hän '
      + 'laski siis torneja, joilla ei ollut enää yhtään vartijaa. Muuri '
      + 'seisoo silti: kierros on lähes kaksituhatta metriä, ja vuonna '
      + '2019 sen käveli yli miljoona kaksisataatuhatta ihmistä. Mut '
      + 'fritulet on yhä pieniä ja paistettuja, eikä niitä laske kukaan '
      + 'muu kuin minä.',
    /*
     * Huomio viittaa herokuvan kohteeseen (kaupunginmuurit). Faktat
     * ovat lehden oman avauskuvan selitteestä (js/packs/
     * kulttuuri-kategoriat.js, dubrovnik/avauskuvat): kierros noin
     * 1 940 metriä, korkeus paikoin 25 metriä, maan puolella 4–6
     * metriä paksut, Unescon maailmanperintöluettelossa 1979, ja
     * edustalla Lokrumin saari.
     */
    teksti: 'Se sama muuri, jonka isoisäsi kiersi, on tuossa: noin 1 940 '
      + 'metriä kiveä, paikoin kaksikymmentäviisi metriä korkeaa ja maan '
      + 'puolella neljästä kuuteen metriä paksua. Vanhakaupunki pääsi '
      + 'Unescon maailmanperintöluetteloon 1979, ja tuo saari edustalla '
      + 'on Lokrum. Katso ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-dubrovnik-kaupunginmuurit.jpg',
      selite: 'Dubrovnikin kaupunginmuurit kiertävät vanhankaupungin noin '
        + '1 940 metrin matkalta, ne nousevat paikoin 25 metriin ja ovat '
        + 'maan puolella 4–6 metriä paksut.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän toinen lause sanoo, että isoisä
       * laski torneja. Täky vastaa siihen, mitä hän laski — ja siihen,
       * miksi luku riippuu siitä, mitä lasketaan.
       *
       * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta
       * lähteestä):
       *   - en-Wikipedia "Walls of Dubrovnik" (johdanto ja
       *     tietolaatikko): muurit rakennettiin pääosin 1200–1600-luvuilla,
       *     kehä on katkeamaton ja noin 1 940 metriä, korkeimmillaan noin
       *     25 metriä; vahvistuksina kolme pyöreää ja neljätoista
       *     nelikulmaista tornia, viisi bastionia, kaksi kulmalinnoitusta
       *     ja suuri Pyhän Johanneksen linnake; maanpuoleisella muurilla
       *     lisäksi yksi suuri ja yhdeksän pientä puoliympyrän muotoista
       *     bastionia, joista kasemattibastioni Bokar on Euroopan vanhin
       *     säilynyt sen tyyppinen linnake; muurin ulkopuolella kulki
       *     vallihauta, ja tykkejä oli yli 120; nykyinen muoto määriteltiin
       *     vuoden 1292 tulipalon jälkeen; rakentajina 1319 Nicifor
       *     Ranjina, 1461–1464 Michelozzo, 1465–1466 Giorgio da Sebenico,
       *     1466–1516 Paskoje Miličević; Unescon luettelossa 1979.
       *   - js/packs/nahtavyysjutut.js, "Minčetan torni" (pelin omaa
       *     tarkistettua aineistoa): vuonna 1319 paikalla oli vaatimaton
       *     nelikulmainen linnoitus, joka sai nimensä Menčetićin suvulta;
       *     osmanien uhka toi paikalle italialaiset insinöörit, työtä
       *     johti Michelozzo ja lopullisen piirustuksen teki Giorgio da
       *     Sebenico; torni valmistui 1464 ja sen muurit ovat paikoin
       *     kuusi metriä paksut; tornin alta on löydetty yli 500 vuotta
       *     vanha tykkivalimo.
       */
      id: 'tornit',
      nappi: 'Montako tornia muurilla oikeasti on',
      otsikko: 'Muurin laskuoppi',
      teksti: 'Isoisäsi laski torneja ja väitteli vartijan kanssa — ja '
        + 'kumpikin saattoi olla oikeassa, koska luku riippuu siitä, mitä '
        + 'lasketaan. Kehä on katkeamaton, noin 1 940 metriä, ja '
        + 'korkeimmillaan kaksikymmentäviisi metriä. Vahvistuksina siinä '
        + 'on kolme pyöreää ja neljätoista nelikulmaista tornia, viisi '
        + 'bastionia, kaksi kulmalinnoitusta ja suuri Pyhän Johanneksen '
        + 'linnake. Maan puolella on vielä yksi iso ja yhdeksän pientä '
        + 'puoliympyrän muotoista bastionia; niistä Bokar on Euroopan '
        + 'vanhin säilynyt kasemattilinnake. Ulkopuolella kulki '
        + 'vallihauta, ja aikanaan muurilla oli yli sata kaksikymmentä '
        + 'tykkiä. Nykyinen muoto '
        + 'määriteltiin vuoden 1292 tulipalon jälkeen, ja työ jatkui '
        + 'sukupolvesta toiseen: 1319 Nicifor Ranjina, 1461–1464 '
        + 'firenzeläinen Michelozzo, 1465–1466 Giorgio da Sebenico, '
        + '1466–1516 Paskoje Miličević. Korkein niistä kaikista on '
        + 'Minčetan pyöreä torni, jonka muuri on paikoin kuusi metriä '
        + 'paksu — ja jonka alta on löydetty yli viisisataa vuotta vanha '
        + 'tykkivalimo.',
      /*
       * Commons 29.8.2026: 3264×2448, CC BY-SA 2.0, Ramón from Llanera,
       * España, kuvattu 26.9.2011, kuvaus "Fortress Minčeta and Walls,
       * Dubrovnik". Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa
       * on muuri ja torni, kävijät kaukaisina hahmoina muurin päällä.
       */
      kuva: {
        tiedosto: 'Minčeta fortress and Walls.jpg',
        selite: 'Minčetan pyöreä torni ja kaupunginmuuri. Torni on '
          + 'kehän korkein kohta.',
        lahde: 'Ramón from Llanera, Wikimedia Commons (CC BY-SA 2.0)',
      },
      visa: {
        kysymys: 'Kuinka monta PYÖREÄÄ tornia Dubrovnikin '
          + 'kaupunginmuurilla on?',
        vaihtoehdot: [
          'Kolme',
          'Neljätoista',
          'Kaksikymmentäviisi',
        ],
        oikea: 0,
        fakta: 'Nelikulmaisia torneja on neljätoista, bastioneja viisi ja '
          + 'kulmalinnoituksia kaksi — siksi kaksi laskijaa päätyy '
          + 'harvoin samaan lukuun.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: saari näkyy herokuvassa ja se on mainittu
       * lehden oman avauskuvan selitteessä, joten pelaaja on jo
       * nähnyt sen. Riikinkukot tuotiin sinne isoisän matkaa
       * edeltäneellä vuosikymmenellä, ja ne ovat yhä siellä.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kolmesta
       * riippumattomasta lähteestä, koska riikinkukkojen alkuperä on
       * yksittäisen artikkelin varassa muuten):
       *   - en-Wikipedia "Lokrum": saari Adrianmerellä Dubrovnikin
       *     edustalla, säännöllinen lauttayhteys vanhankaupungin
       *     satamasta; benediktiiniluostari mainitaan ensimmäisen kerran
       *     1023 ja viimeiset benediktiinit lähtivät 1808; nimi tulee
       *     latinan happamaa hedelmää tarkoittavasta sanasta, koska
       *     saarella on kasvatettu vieraita kasveja munkkien ajoista
       *     asti; perimätiedon mukaan munkit valelivat lähtöyönään
       *     saaren kynttilänvahalla ja kirosivat sen; saarella on
       *     riikinkukkoperheitä, jotka Maksimilian toi sinne;
       *     kasvitieteellinen puutarha perustettiin 1959.
       *   - hr-Wikipedia "Lokrum": arkkiherttua Maksimilian osti saaren
       *     1859 Tomaševićin suvulta, muutti benediktiiniluostarin
       *     kesähuvilaksi ja teetti puutarhat tuoden mullan ja taimet
       *     Kärntenistä, ja valvoi töitä itse; huipulla on Fort Royal,
       *     jonka ranskalaiset rakensivat 1806 ja jota itävaltalaiset
       *     laajensivat 1830.
       *   - fr-Wikipedia "Lokrum": saarella asuu riikinkukkoperhe,
       *     jonka yksilöt Maksimilian toi saarelle; it-Wikipedia
       *     "Lacroma": saarella asuu riikinkukkoyhdyskunta ja saaren
       *     Kuollutmeri on pieni suolajärvi, joka yhdistyy Adrianmereen
       *     vedenalaisten luolien kautta.
       *
       * MITÄ EI KERROTA: en-Wikipedia sanoo lintujen tulleen
       * Kanariansaarilta, mutta yksikään muu kieliversio ei toista
       * sitä, joten alkuperämaata ei mainita.
       */
      id: 'lokrum',
      nappi: 'Saari, jolla kävelee riikinkukkoja',
      otsikko: 'Lokrumin asukkaat',
      teksti: 'Se saari muurin edustalla on Lokrum, ja sinne pääsee '
        + 'lautalla vanhankaupungin satamasta. Sen vanhin rakennus on '
        + 'benediktiiniluostari, joka mainitaan ensimmäisen kerran '
        + 'vuonna 1023; viimeiset munkit lähtivät 1808. Perimätiedon '
        + 'mukaan he kiersivät lähtöyönään saaren tiputellen '
        + 'kynttilänvahaa ja kirosivat sen jokaiselle, joka yrittäisi '
        + 'ottaa saaren omakseen. Saaren nimi tulee latinan happamaa '
        + 'hedelmää tarkoittavasta sanasta, koska siellä on kasvatettu '
        + 'vieraita kasveja munkkien ajoista asti. Vuonna 1859 — '
        + 'neljätoista vuotta ennen isoisäsi käyntiä — Itävallan '
        + 'arkkiherttua Maksimilian osti saaren, muutti luostarin '
        + 'kesähuvilaksi ja teetti sinne puutarhan, jonka mullan ja '
        + 'taimet hän tuotti Kärntenistä asti ja jonka töitä hän valvoi '
        + 'itse. Samalla hän toi saarelle riikinkukkoja. Puutarhurit ja '
        + 'omistajat ovat vaihtuneet, mutta linnut eivät: niiden '
        + 'jälkeläiset kävelevät yhä luostarin raunioilla. Saaren '
        + 'eteläpäässä on lisäksi pieni suolajärvi, jota sanotaan '
        + 'Kuolleeksimereksi — se saa vetensä Adrianmereltä '
        + 'vedenalaisten luolien kautta.',
      /*
       * Commons 29.8.2026: 3264×2448, CC BY-SA 3.0, Bizutage, kuvattu
       * 18.5.2013, kuvaus "Peacock roaming ruins of a Benedictan
       * monastery on an Island of Lokrum, Croatia". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on riikinkukko luostarin
       * raunioilla, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Lokrum Peacock.jpg',
        selite: 'Riikinkukko benediktiiniluostarin raunioilla Lokrumin '
          + 'saarella Dubrovnikin edustalla.',
        lahde: 'Bizutage, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Kuka toi riikinkukot Lokrumin saarelle?',
        vaihtoehdot: [
          'Arkkiherttua Maksimilian, joka osti saaren 1859',
          'Benediktiiniläismunkit 1000-luvulla',
          'Ragusan tasavallan viimeinen rehtori',
        ],
        oikea: 0,
        fakta: 'Maksimilian muutti luostarin kesähuvilaksi ja tuotti '
          + 'puutarhaansa mullan ja taimet Kärntenistä asti. Linnut '
          + 'jäivät, vaikka omistajat vaihtuivat.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: tasavalta, joka osti rauhansa, joutui myös
       * kirjaamaan jokaisen maksun. Täky kertoo talosta, jossa se
       * tehtiin — ja pohjustaa hiljaa aarremerkinnän arkistonhoitajan.
       * Merkintä aukeaa vasta aarteen löydyttyä, joten pohjustus ei
       * paljasta mitään.
       *
       * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta
       * lähteestä):
       *   - en-Wikipedia "Sponza Palace": rakennettu 1516–1522, tekijä
       *     Paskoje Miličević Mihov, loggian ja veistokset tekivät
       *     Andrijićin veljekset; nimi Divona tulee sanasta dogana,
       *     tulli, ja Sponza latinan sanasta, joka tarkoittaa paikkaa
       *     johon sadevesi kerääntyy; talossa on toiminut tulli,
       *     tullivarasto, rahapaja, asevarasto, rahasto, pankki ja
       *     koulu; siitä tuli tasavallan kulttuurikeskus, kun sinne
       *     perustettiin 1500-luvulla kirjallisuusakatemia Academia dei
       *     Concordi; talo selvisi vuoden 1667 maanjäristyksestä
       *     vaurioitta; pihakäytävän holvikaaressa on latinankielinen
       *     kirjoitus rehellisestä punnitsemisesta; nykyään talossa on
       *     Dubrovnikin valtionarkisto, jonka asiakirjat ulottuvat
       *     1100-luvulle ja vanhin on vuodelta 1022, ja jossa on yli
       *     7 000 käsikirjoitusnidettä ja noin 100 000 yksittäistä
       *     käsikirjoitusta.
       *   - js/packs/nahtavyysjutut.js, "Sponzan palatsi" (pelin omaa
       *     tarkistettua aineistoa): samat rakennusvuodet ja tekijä,
       *     sama luettelo toiminnoista, sama maanjäristystieto, sama
       *     asiakirjamäärä ja pihan latinankielinen muistutus.
       */
      id: 'sponza',
      nappi: 'Talo, johon jokainen maksu kirjattiin',
      otsikko: 'Sponzan palatsi ja tasavallan kirjat',
      teksti: 'Rauha, joka ostetaan joka vuosi uudestaan, on ennen kaikkea '
        + 'kirjanpitoa — ja tämä on talo, jossa se pidettiin. Sponzan '
        + 'palatsi rakennettiin 1516–1522 Paskoje Miličevićin '
        + 'suunnitelmien mukaan, ja loggian veistokset tekivät '
        + 'Andrijićin veljekset. Toinen nimi Divona tulee sanasta '
        + 'dogana, tulli; Sponza taas latinan sanasta, joka tarkoittaa '
        + 'paikkaa, johon sadevesi kerääntyy. Saman katon alla toimivat '
        + 'tulli, tullivarasto, rahapaja, asevarasto, rahasto, pankki ja '
        + 'koulu, ja 1500-luvulla myös kirjallisuusakatemia. Pihan '
        + 'holvikaaressa on latinaksi muistutus: meidän vaakamme eivät '
        + 'salli petosta, ja kun minä punnitsen tavaraa, Jumala punnitsee '
        + 'kanssani. Talo selvisi vuoden 1667 suuresta maanjäristyksestä '
        + 'vaurioitta, vaikka kaupunki sen ympäriltä kaatui. Nykyään '
        + 'siellä on Dubrovnikin valtionarkisto: yli 7 000 '
        + 'käsikirjoitusnidettä ja noin satatuhatta yksittäistä '
        + 'asiakirjaa, vanhin vuodelta 1022. Tasavalta ehti kadota, '
        + 'mutta sen kirjat eivät.',
      /*
       * Commons 29.8.2026: 5970×3954, CC BY 2.0, Richard Mortel,
       * kuvattu 8.9.2016, kuvaus "Sponza Palace, Dubrovnik, 16th
       * century (13)". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on palatsin sisäpiha holvikaarineen, ei tunnistettavia
       * ihmisiä.
       */
      kuva: {
        tiedosto: 'Sponza Palace, Dubrovnik, 16th century (13) (29858392800).jpg',
        selite: 'Sponzan palatsin sisäpiha, jossa kauppiaat punnitsivat '
          + 'tavaransa julkisesti. Talo selvisi vuoden 1667 '
          + 'maanjäristyksestä vaurioitta.',
        lahde: 'Richard Mortel, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Miltä vuodelta Dubrovnikin arkiston vanhin asiakirja '
          + 'on?',
        vaihtoehdot: [
          'Vuodelta 1022',
          'Vuodelta 1522',
          'Vuodelta 1808',
        ],
        oikea: 0,
        fakta: 'Arkistossa on yli 7 000 käsikirjoitusnidettä ja noin '
          + 'satatuhatta yksittäistä asiakirjaa. Talo itse rakennettiin '
          + 'vasta 1516–1522.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, dubrovnik: *"Mikä sana sen lipussa luki?"* →
   * Libertas). Visasääntö täyttyy: vastaus on tekstissä, mutta
   * kysymyksen sanamuoto ei toistu siinä sellaisenaan — teksti ei puhu
   * lipusta vaan siitä, mitä sana maksoi.
   *
   * FAKTAT (tarkistettu 29.8.2026 kahdesta riippumattomasta lähteestä):
   *   - en-Wikipedia "Republic of Ragusa" (tietolaatikko sekä osiot
   *     "Ottoman suzerainty" ja hallinnosta): tasavalta 1358–1808 ja
   *     veronmaksaja järjestyksessä Unkarin kuningaskunnalle
   *     (1358–1458), osmanien valtakunnalle (1458–1684),
   *     Habsburg-Itävallalle (1684–1806) ja Ranskan keisarikunnalle
   *     (1806–1808); vuoden 1458 sopimus teki tasavallasta sulttaanin
   *     veronmaksajan, ja vuosivero määriteltiin 1481 kahdeksitoista ja
   *     puoleksi tuhanneksi kultarahaksi; sulttaani takasi vastineeksi
   *     suojelun ja laajat kauppaoikeudet, ja tasavalta säilyi
   *     itsehallinnollisena ja käytännössä itsenäisenä; 1684 lähettiläät
   *     hyväksyivät Habsburgien ylivallan viidensadan dukaatin
   *     vuosiverolla ja tunnustivat samaan aikaan yhä osmanien
   *     ylivallan, mikä oli aikanaan tavallinen järjestely; tasavallan
   *     lipussa luki Libertas, ja Lovrijenacin linnakkeen portin yllä
   *     lukee "Non bene pro toto libertas venditur auro"; neuvoston
   *     ovessa luki "Obliti privatorum publica curate"; orjakauppa
   *     kiellettiin 1416.
   *   - js/packs/nahtavyysjutut.js, "Lovrijenacin linnake" ja "Pilen
   *     portti" (pelin omaa tarkistettua aineistoa): linnake pystytettiin
   *     tarun mukaan kolmessa kuukaudessa ennen venetsialaisia,
   *     ensimmäinen kirjallinen maininta 1301, merenpuoleiset muurit
   *     lähes 12 metriä ja kaupunginpuoleiset noin 60 senttiä;
   *     portin latinankielinen lause suomeksi; ranskalaiset valtasivat
   *     kaupungin 1806 ja tasavalta lakkasi olemasta pian sen jälkeen.
   */
  oppitunti: {
    otsikko: 'Ostettu rauha — mitä Ragusa maksoi ja mitä se sai',
    teksti: 'Isoisäsi arvasi hinnan oikein. Ragusa oli tasavalta '
      + 'vuodesta 1358 vuoteen 1808, eikä se ollut yhtenäkään näistä '
      + 'vuosista yksin: se maksoi vuosiveroa vuoron perään Unkarin '
      + 'kuningaskunnalle, osmanien valtakunnalle, Habsburgien '
      + 'Itävallalle ja lopuksi Ranskan keisarikunnalle. Vuoden 1458 '
      + 'sopimus teki siitä sulttaanin veronmaksajan, ja vuonna 1481 '
      + 'summa lyötiin lukkoon: kaksitoista ja puoli tuhatta kultarahaa '
      + 'vuodessa. Vastineeksi sulttaani lupasi suojella kaupunkia ja '
      + 'antoi sen laivoille laajat kauppaoikeudet — ja tasavalta säilyi '
      + 'itsehallinnollisena ja käytännössä itsenäisenä. Vuonna 1684 '
      + 'lähettiläät hyväksyivät lisäksi Habsburgien ylivallan '
      + 'viidensadan dukaatin vuosiverolla eivätkä lopettaneet osmanien '
      + 'veroa: kahden isännän palveleminen oli aikanaan tavallista, ja '
      + 'juuri se piti kaupungin pystyssä. Sitä, mitä rahalla '
      + 'todella ostettiin, ei kuitenkaan kirjoitettu tilikirjaan vaan '
      + 'kiveen. Neuvoston ovessa luki, että unohtakaa yksityiset asiat '
      + 'ja hoitakaa julkiset. Lovrijenacin linnakkeen portin yllä lukee '
      + 'yhä latinaksi Non bene pro toto libertas venditur auro — '
      + 'vapautta ei myydä kaikella maailman kullalla. Ja sama sana, '
      + 'libertas, oli kirjoitettu tasavallan lippuun. Kaupunki maksoi '
      + 'kullassa juuri siksi, ettei sen tarvitsisi maksaa sillä '
      + 'sanalla.',
    /*
     * Commons 29.8.2026: 6194×4288, CC BY-SA 2.0, Dennis G. Jarvis,
     * kuvattu 8.6.2013, kuvaus "Fortress Lovrijenac". Restrictions
     * tyhjä. SILMÄTARKISTUS tehty: kuvassa on linnake kalliolla, ei
     * tunnistettavia ihmisiä.
     */
    kuva: {
      tiedosto: 'Croatia-01664 - Fortress Lovrijenac (10088562716).jpg',
      selite: 'Lovrijenacin linnake omalla kalliollaan muurin '
        + 'ulkopuolella. Sen portin yllä on tasavallan tunnetuin '
        + 'kirjoitus.',
      lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja kysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'dubrovnik'):
   * muurinvartija Ivo kävelee kehän joka ilta ja laskee askeleensa.
   *
   * KYSYMYSTÄ EI VAIHDETTU, ja se on harkittu. Raamattu (omistaja
   * 28.8.2026): *"PELITEHTÄVÄN AIHE RATKAISEE… aarretehtävän aihe
   * kytketään aina kaupungin muuhun tarinaverkkoon."* Kaaren vanha
   * kysymys tasavallan lipun sanasta on jo täsmälleen siinä verkossa:
   * merkintä alkaa ostetusta rauhasta, oppitunti kertoo mitä rauha
   * maksoi ja mitä sanaa ei myyty, ja kohtaaminen lunastaa sen. Aallon
   * 2 kolmesta muusta kaupungista poiketen täällä ei siis ollut mitään
   * korjattavaa. Tämä kortti ei kertaa Ivon repliikkiä eikä paljasta
   * vastausta.
   */
  kohtaaminen: {
    hahmo: 'Muurinvartija Ivo',
    nappi: 'Tapaa muurinvartija',
    teksti: 'Ivo kävelee kehän joka ilta ja laskee askeleensa, koska niin '
      + 'on tehty vapaan tasavallan ajoista asti. Hän tuntee jokaisen '
      + 'portaan, jokaisen tuulisen kulman ja sen kohdan, jossa meri '
      + 'kuuluu kovimmin. Vieraita hän on nähnyt enemmän kuin haluaisi '
      + 'laskea. Ennen kuin hän avaa portin ja päästää mukaansa, hän '
      + 'haluaa tietää, onko vieras ymmärtänyt, mitä tämä kaupunki ei '
      + 'suostunut myymään.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: PILEN PORTTI. Kaaren teksti asettaa Ivon portin
   * holviin avainrenkaineen, ja pelin oma Dubrovnik-aineisto sanoo,
   * että Pilen portti on yksi vain kolmesta paikasta, joista
   * muurikävelyn voi aloittaa (js/packs/nahtavyysjutut.js, "Pilen
   * portti").
   *
   * 42,64173333 N / 18,10681389 E — hr-Wikipedia "Vrata od Pila",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja
   * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((18,10681389 − (−175)) mod 360) × (12000/360)
   *                     = 193,10681389 × 33,3333… = 6436,9
   *                   y = (millerY(76) − millerY(42,64173333)) × 12000/2π
   *                     = 1697,8
   *   europe          x = (18,10681389 + 11) × 19,2 = 558,9
   *                   y = (72 − 42,64173333) × 26,3 = 772,1
   *
   * TARKISTUS LAATTAA VASTEN: Dubrovnikin laatta on Euroopan laudalla
   * 560 / 770 ja maailmankartalla 6438,9 / 1694,6, eli piste on sen
   * vieressä parin yksikön päässä. Niin pitääkin — portti on
   * vanhankaupungin länsireunassa, ja laudan yksikkö on
   * maailmankartalla noin kolme kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Pilen portti',
    laudat: {
      maailmankartta: { x: 6436.9, y: 1697.8 },
      europe: { x: 558.9, y: 772.1 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Dubrovnikin sivupino
   * (js/lehti.js rakennaSivut) on Wienin mittainen, koska kaupungilla
   * on kaksi kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 =
   * etusivu, 1 = kaupunkisivu "Dubrovnik", 2 = Tasavalta,
   * 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (Orlandon kyynärvarsi) väistyy nimetyn tieltä,
   * joten sivulla on Raamatun vaatima yksi minitehtävä eikä kahta.
   * Sivun 1 kysymys on Dubrovnikin kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: KARANTEENI_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: APTEEKKI_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Kroatia) ----------
   *
   * UUSI POOLI, EI SIIRTO. Kroatia ei ole js/fokusnosto.js:n
   * NOSTO_MAAT-taulussa; js/fokusnosto.js nostoMaanPooli lukee
   * kaupungin oman `takynostot`-kentän ennen maapoolia, joten uusi maa
   * ei vaadi riviä moottoriin.
   *
   * MIKSI PULAN AREENA: merkinnän vertaus on kivettynyt laiva, ja
   * tämä on saman maan toinen rakennus, jota melkein purettiin ja
   * siirrettiin pois — yhden äänestyksen verran. Nosto EI kerro
   * aarteesta mitään.
   *
   * PISTE OSUU PULAN FOKUSKOHTEEN PÄÄLLE, ja se on tietoista: sama
   * kohde, kaksi eri sisältöä (js/packs/fokuskohteet-hrv.js,
   * pulan-areena). Koordinaatit on otettu sieltä bitilleen samoina.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki).
       *
       * FAKTAT:
       *   - js/packs/fokuskohteet-hrv.js, pulan-areena (pelin omaa
       *     tarkistettua aineistoa): amfiteatteri rakennettiin vuosien
       *     27 eaa. ja 68 jaa. välillä; se on säilyneistä roomalaisista
       *     areenoista harvoja, joissa koko ulkomuuri on yhä pystyssä,
       *     ja ainoa, jossa on tallella kaikki neljä sivutornia;
       *     katsojia mahtui kymmeniätuhansia; vuonna 1583 Venetsian
       *     senaatti käsitteli ehdotusta, että areena purettaisiin ja
       *     siirrettäisiin kivi kerrallaan Venetsiaan; äänestys hävisi
       *     ja rakennus jäi paikalleen.
       *   - Commonsin oma kohdekuvaus alla olevalle kuvalle (haettu
       *     imageinfo-rajapinnasta 29.8.2026): sama rakennusaika 27 eaa.
       *     – 68 jaa., suurimpia säilyneitä roomalaisia areenoita, Kroatian
       *     parhaiten säilynyt antiikin monumentti ja ainoa, jossa on
       *     tallella kaikki sivutornit.
       */
      id: 'pulan-areena',
      nimio: 'Pulan areena',
      otsikko: 'Venetsia äänesti amfiteatterin purkamisesta ja '
        + 'siirtämisestä kivi kerrallaan — ja hävisi äänestyksen',
      lunastus: [
        'Istrian niemen kärjessä Pulassa seisoo roomalainen amfiteatteri, '
          + 'joka rakennettiin vuosien 27 eaa. ja 68 jaa. välillä. Se on '
          + 'säilyneistä areenoista harvoja, joissa koko ulkomuuri on yhä '
          + 'pystyssä, ja ainoa, jossa on tallella kaikki neljä '
          + 'sivutornia. Katsojia mahtui kymmeniätuhansia — enemmän kuin '
          + 'kaupungissa oli asukkaita.',
        'Vuonna 1583 Venetsian senaatissa käsiteltiin ehdotus, jonka '
          + 'mukaan areena purettaisiin ja siirrettäisiin kivi kerrallaan '
          + 'Venetsiaan pystytettäväksi uudelleen. Ehdotus meni '
          + 'äänestykseen ja hävisi. Rakennus jäi paikalleen, ja siellä '
          + 'se yhä on: nykyään sen kaarien sisällä pidetään konsertteja '
          + 'ja elokuvafestivaali.',
      ],
      lahde: 'js/packs/fokuskohteet-hrv.js (pulan-areena, pelin omaa '
        + 'tarkistettua aineistoa) sekä Wikimedia Commonsin kohdekuvaus '
        + 'kuvalle "Anfiteatro de Pula" (tarkistettu 29.8.2026).',
      /* Commons 29.8.2026: 7398×4184, CC BY-SA 4.0, Diego Delso,
       * kuvattu 17.4.2017. Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on areenan ulkomuuri, ihmiset kaukaisina hahmoina. */
      valokuva: {
        tiedosto: 'Anfiteatro de Pula, Croacia, 2017-04-17, DD 13-18 HDR PAN.jpg',
        selite: 'Pulan amfiteatterin ulkomuuri on yhä kokonaan pystyssä, '
          + 'ja kaikki neljä sivutornia ovat tallella.',
        lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi Venetsia halusi siirtää areenan itselleen?',
        'Miten roomalainen amfiteatteri rakennettiin?',
        'Mitä Pulan areenassa tehdään nykyään?',
      ],
      // 44,8735 N / 13,8490 E — js/packs/fokuskohteet-hrv.js,
      // pulan-areena. Koordinaatit kopioitu sieltä sellaisinaan.
      paikka: {
        nimi: 'Pula',
        laudat: {
          maailmankartta: { x: 6295, y: 1607 },
          europe: { x: 477.1, y: 713.4 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Ragusan laivaston
   * kulta. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Arkistonhoitaja näytti laivaston tilikirjat: kultaa lähti '
      + 'maailmalle sadalla purjeella, eikä kaikki koskaan palannut '
      + 'kirjoihin. Merkitsin kolme haaksirikkoa luetteloon ja jätin '
      + 'neljännen merkitsemättä — sen kohdalla vanhus lakkasi puhumasta.',
  },
};
