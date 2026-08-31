/*
 * PISTENIPUT — kaupungin päälle osuvat merkit siististi sen molemmin
 * puolin, omiksi nostoikseen.
 *
 * Omistajan pelitestitilaus 26.8.2026 (kuvakaappaus Kreikan
 * fokuskartasta, Ateena): kaupungin kultaisen merkin päällä oli kaksi
 * kohde-/täkymerkkiä (mm. silmäsymboli), eikä kaupunkia meinannut
 * pystyä painamaan. *"Tällaiset pisteet voisi kasata nippuun kaupungin
 * pisteen oikealle puolelle siististi allekkain."*
 *
 * ── ESITYSSIIRTO ILMAN SIIRTOVIIVOJA (omistaja 31.8.2026) ──────────
 *
 * Sanatarkka tilaus kysymyskortilla: *"pystyisitkö osan nostoista vain
 * viemään hieman kaupungin viereen puhtaasti omaksi nostokseen ilman
 * siirtoviivoja … tähän pitäis keksiä joku tyylikkäämpi ratkaisu."*
 *
 * Kolme asiaa muuttui samassa erässä, ja ne ovat saman päätöksen kolme
 * puolta:
 *
 *   1. NOSTOT OVAT OMIA MERKKEJÄÄN. Kategoria per kaupunki -yhdistely
 *      (ent. js/fokusryhmat.js) purettiin: kartalla ei ole enää
 *      pilkkulistanimiöitä ("Olympieion, Iliou Melathron…") vaan
 *      jokainen nosto on oma symbolinsa ja oma nimiönsä.
 *
 *   2. SARAKKEITA ON KAKSI, KAUPUNGIN MOLEMMIN PUOLIN (sääntö 2), ja
 *      ne ovat puolta lähempänä ja puolta tiiviimpiä kuin entinen yksi
 *      sarake. Kymmenen merkin rypäs on siis viisi riviä eikä
 *      kymmenen, ja korkein rivi jää lähelle kaupungin omaa korkeutta.
 *
 *   3. YHDYSVIIVAT POISTUIVAT KOKONAAN (sääntö 6). Ne olivat vastaus
 *      pitkään sarakkeeseen: kun merkki oli kaukana laatasta, viiva
 *      kertoi mihin se kuuluu. Kun merkki on laatan kyljessä, viiva
 *      kertoo saman kahdesti — ja se oli juuri se sotkuisuus, josta
 *      omistaja halusi eroon.
 *
 * ── MITÄ TÄMÄ TIEDOSTO ON ──────────────────────────────────────────
 *
 * Yksi yhteinen kasauspassi KAHDELLE merkkikerrokselle: kartan
 * fokuskohteille (js/fokuskohteet.js) ja täkysymboleille
 * (js/fokusnosto-symbolit.js). Kumpikin kerros kutsuu tätä omassa
 * asemointifunktiossaan juuri ennen muunnosten kirjoittamista, ja passi
 * kirjoittaa jokaiselle ankkuriryhmätietueelle `nippu`-kentän: joko
 * korvaavan piirtopaikan laudan koordinaateissa tai null (merkki pysyy
 * omalla paikallaan). Yhteinen passi on välttämätön, koska sarake on
 * YKSI: kohde- ja täkymerkit menevät samaan jonoon eivätkä kahteen
 * päällekkäiseen.
 *
 * ── SÄÄNNÖT (omistajan tilaus + Raamatun fokuslinjaukset) ──────────
 *
 * 1. KAUPUNKIMERKKI EI SIIRRY KOSKAAN — vain kohde- ja täkymerkit
 *    väistävät. Merkki katsotaan kaupungin päälle osuneeksi, kun sen
 *    keskipiste on laatan NÄKYVÄN kiekon ja merkin oman aluslaatan
 *    säteiden summaa lähempänä kaupungin keskipistettä (sääntö 10).
 *
 * 2. KAKSI PYSTYSARAKETTA, KAUPUNGIN MOLEMMIN PUOLIN. Merkit jaetaan
 *    vuorotellen oikeaan ja vasempaan sarakkeeseen, ja kumpikin sarake
 *    keskitetään kaupungin korkeudelle (rivit 0, +1, −1, +2, …).
 *
 *    YKSI SARAKE OLI PITKÄ. Kymmenen merkin rypäs (Ateena, Sofia,
 *    Pariisi) oli kymmenen riviä eli pystysuora nauha, jonka ylä- ja
 *    alapää olivat kaukana laatasta — ja juuri siksi se tarvitsi
 *    yhdysviivat. Kahdella sarakkeella sama rypäs on viisi riviä
 *    KUMMALLAKIN puolella, eli mitattuna puolet matalampi, ja kaikki
 *    merkit ovat laatan kyljessä.
 *
 *    JAKO ON VUOROTTELU, EI MAANTIEDE. Merkin oma itä–länsi-suunta
 *    kaupungista olisi houkutteleva peruste, mutta se antaa Ateenan
 *    kaltaisessa ryppäässä yhdeksän merkkiä samalle puolelle ja yhden
 *    toiselle — sarake ei lyhene lainkaan. Vuorottelu on
 *    tasapainoinen ja deterministinen: järjestys tulee merkkien omista
 *    koordinaateista (y, sitten x, sitten jonon vakaa järjestys), joten
 *    sama lauta antaa aina saman kartan.
 *
 *    NIMIÖ SEURAA SARAKKEEN PUOLTA. Vasemman sarakkeen merkin nimiö
 *    ladotaan merkin vasemmalle puolelle (`nippuPuoli`), tai se
 *    kulkisi kaupungin laatan yli. Väistöpassi (js/fokuskohteet.js
 *    paivitaKohdeNimiot) saa puolen toiveena eikä käskynä: jos toivottu
 *    kylki on tukossa, se kokeilee yhä toista.
 *
 *    SARAKE ON KIINNI KAUPUNGISSA (omistajan päätös 28.8.2026,
 *    kysymyskortti "rypäs paljon lähemmäs"). Etäisyys oli aiemmin kahden
 *    SORMIALUEEN summa (24 + 22 + 2 = 48), koska napautuksen ratkaisi
 *    piirtojärjestys ja päällimmäinen merkki söi laatan napautuksen.
 *    Nyt ratkaisee LÄHIN KESKIPISTE (sääntö 9), joten sormialueet saavat
 *    mennä limittäin ja etäisyys mitoitetaan NÄKYVÄSTÄ merkinnästä.
 *
 * 3. KARTAN MITTAKAAVASSA (omistajan LOPULLINEN linjaus 26.8.2026,
 *    Raamattu): kaikki mitat ovat ruudun pikseleitä LEHDEN
 *    PERUSTASOLLA ja ne muunnetaan laudan yksiköiksi samalla
 *    vakioskaalalla kuin merkit itse (js/ui.js fokusMerkkiSkaala).
 *    Sarake elää siis kartan mukana kuten merkitkin, eikä nippu voi
 *    hajota tai mennä uusiksi zoomatessa.
 *
 * 4. VIHREÄ KOHTAAMISPISTE (js/fokuspiste.js) EI OLE NIPUTETTAVA —
 *    sen erilaisuus on sen merkki. Jos pisteen paikka osuu sarakkeen
 *    kohdalle, sarakkeen rivi hypätään yli eli MUUT väistävät sitä.
 *
 * 5. YLEINEN, EI ATEENA-KOHTAINEN: passi lukee nykyisen kaupungin
 *    pelistä (ui.game.cityOf) ja toimii jokaisella fokusmaalla ja
 *    mielivaltaisella määrällä päällekkäisiä merkkejä. Kiertävällä
 *    laudalla jokainen kaupungin kopio (ui.kiertoKohdat) saa oman
 *    sarakkeensa, ja saman merkin kopiot saavat saman rivin, koska
 *    jono järjestetään merkin omista koordinaateista.
 *
 * 6. EI YHDYSVIIVOJA (omistajan päätös 31.8.2026, ks. tiedoston alku).
 *
 *    Tämä kohta on kirjoitettu kolmesti, ja se on koko nipun historia
 *    pienoiskoossa. Ensin se luki "EI UUSIA ELEMENTTEJÄ": viiva
 *    harkittiin ja jätettiin pois, koska sarake on kiinni kaupungissa
 *    ja yhteys siksi ilmeinen. OMISTAJAN PELITESTI 27.8.2026 KUMOSI
 *    SEN: *"ateenan lisäpisteisiin sen oikealla puolella saisi tulla
 *    pienet vaaleat katkoviivat, jotta tajuaa niiden olevan oikeasti
 *    ateenassa"* — koska sarake oli silloin kymmenen riviä pitkä ja sen
 *    päät olivat kaukana laatasta.
 *
 *    NYT SYY ON POISSA. Kahdella sarakkeella (sääntö 2) rypäs on
 *    puolet matalampi ja puolet lähempänä, eikä yksikään merkki ole
 *    enää niin kaukana laatasta, että se näyttäisi omalta pisteeltään.
 *    Omistajan sanoin: nosto viedään *"hieman kaupungin viereen
 *    puhtaasti omaksi nostokseen ilman siirtoviivoja"*. Kaikki viivan
 *    mitat, sen oma kerros ja jananlaskenta on poistettu tästä
 *    tiedostosta; poltettu merkki ei myöskään enää kanna `viiva`-kenttää
 *    (tools/fokuskartta/nostot.mjs).
 *
 *    MITATTU: 120 nostoviivaa → 0.
 *
 *    Siirto itse on yhä ESITYSTÄ, EI DATAA — sama sopimus kuin
 *    kohtaamispisteellä (js/fokuspiste.js PISTE_ERO_MIN) ja
 *    kohdemerkkien erottelulla (js/fokuskohteet.js
 *    eritteleKohdeRyhmat): pakettien koordinaatit jäävät koskematta, ja
 *    osuma-alueet seuraavat merkkiä, koska ne ovat saman ankkuriryhmän
 *    lapsia.
 *
 * 7. SARAKE MAHTUU AINA LEHDEN IKKUNAAN — NYT ITSESTÄÄN.
 *
 *    Omistajan pelitesti 28.8.2026 (iPhone, Kreikan fokuskartta):
 *    *"Miksi iphonella näkyy näin monia pisteitä viivan kanssa?"* —
 *    Ateenan ryppään merkit sinkoutuivat katkoviivoineen ympäri lautaa,
 *    Epidauros Kreetan alapuolelle ja Akropolis Santorínin eteläpuolelle,
 *    vaikka niiden pitäisi asettua pieneen viuhkaan kaupungin viereen.
 *
 *    SYY OLI SÄÄNNÖN 3 MITTA KAPEALLA RUUDULLA: 30 pikselin riviväli on
 *    puhelimella 3,5-kertainen SUHTEESSA KARTTAAN, ja yhdeksän merkin
 *    sarake (8 × 30 px = 300 yksikköä) oli PIDEMPI KUIN KOKO LEHTI
 *    (292 yksikköä). Se korjaantui kahdesti: ensin tiivistyvällä
 *    rivivälillä, sitten (31.8.2026) sillä, että koko ladonta siirtyi
 *    lehden perustason vakioon (js/nostoladonta.js NOSTOLADONTA_S) eikä
 *    riipu ruudusta enää lainkaan.
 *
 *    TIIVISTYVÄ RIVIVÄLI POISTUI TÄSSÄ ERÄSSÄ, koska sillä ei ole enää
 *    varaa toimia: riviväli ON nyt se alaraja, johon se ennen tiivistyi
 *    (NIPPU_VALI = merkkien aluslaatat plus rako), eikä sitä voi
 *    puristaa siitä ilman että merkit menevät päällekkäin. Rivejä on
 *    samalla puolet vähemmän (sääntö 2). Mitattuna kymmenen merkin
 *    rypäs on 4 × 8,5 = 34 lautayksikköä korkea, kun se ennen oli
 *    9 × 18 = 162 — Kreikan lehti on 292 yksikköä korkea.
 *
 * 8. KAKSI MITTAA: MERKIN OMA JA SORMEN.
 *
 *    Omistajan pelitesti 28.8.2026 (jatko kohtaan 7): *"Viivat
 *    pisteisiin ovat isompia, varsinkin ne pisteet ja symbolit, ovat
 *    isompia kuin muut symbolit kartalla. --- selitetekstit, symbolit
 *    ja tekstit voisivat olla pienemmällä ja paljon lähempänä silloin
 *    Ateenaan."*
 *
 *    Merkkien NÄKYVÄ koko sai katon lehden omista mitoista (js/ui.js
 *    fokusMerkkiSkaalaKartalle): kapea ruutu ei enää paisuta merkkiä yli
 *    kartan omien symbolien. Nipun mitat jakautuvat siksi kahtia:
 *
 *      s       KATETTU merkkiskaala — rivien väli ja merkkien omat
 *              aluslaatat. Kun merkki pienenee, sarake tiivistyy
 *              samassa suhteessa ja rypäs kutistuu kaupungin viereen —
 *              juuri se, mitä tilattiin.
 *
 *      sRuutu  KATTAMATON skaala eli sormen mitta lehden perustasolla.
 *              Sillä lasketaan sarakkeiden etäisyys (NIPPU_DX), joka
 *              EI saa kutistua merkin mukana, koska laatta itse
 *              piirretään samassa kattamattomassa mitassa. (Vihreän
 *              pisteen väistövara oli tässä 31.8.2026 asti; se poistui
 *              polton myötä — ks. SARAKE ON LAUDAN ASIA, EI VUORON.)
 *
 *    NIPUTUSRAJA VAIHTOI PUOLTA 28.8.2026 (sääntö 10): se laskettiin
 *    ennen kattamattomasta sormialueesta, ja juuri siksi kapea ruutu
 *    niputti kolminkertaisen alueen verran kohteita. Nyt se on katetussa
 *    mitassa kuten merkki itse.
 *
 *    Leveällä ruudulla katto ei pure ja mitat ovat samat kuin ennen.
 *
 * 9. NAPAUTUKSEN VOITTAA LÄHIN KESKIPISTE — MYÖS KAUPUNKI.
 *
 *    OMISTAJAN PÄÄTÖS 28.8.2026 (kysymyskortti "rypäs paljon lähemmäs",
 *    valittu vaihtoehto *"lähin keskipiste voittaa"*).
 *
 *    Kohdemerkit ovat ratkoneet päällekkäiset napautuksensa v1218:sta
 *    asti lähimmän osumamuodon keskipisteen mukaan (js/fokuskohteet.js
 *    lahinKohde). Nyt samaan ratkontaan tulee mukaan KAUPUNGIN LAATTA:
 *    kun napautus osuu sekä laatan että merkin osuma-alueelle, voittaa
 *    se, jonka keskipiste on lähempänä. Laatan keskustaa lähempi
 *    napautus avaa kaupungin, merkin keskustaa lähempi avaa merkin.
 *
 *    JUURI TÄMÄ VAPAUTTI SARAKKEEN LÄHEMMÄS (sääntö 2). Ennen etäisyys
 *    oli kahden sormialueen summa, koska päällimmäinen kerros voitti
 *    napautuksen aina — merkkikerrokset piirtyvät laattakerroksen
 *    (js/ui.js fokusLaattaKerros) päälle, joten sarakkeen merkki söi
 *    laatan napautuksen heti kun alueet koskettivat. Nyt limittäisyys on
 *    sallittua, ja ainoa mitta on se, ettei merkki peitä laatan NÄKYVÄÄ
 *    osaa.
 *
 *    RATKONTA ASUU TÄSSÄ TIEDOSTOSSA (nippuLaatanEtaisyys,
 *    nippuAvaaKaupunki), koska molemmat merkkikerrokset tarvitsevat sen
 *    ja kumpikin tuo jo tämän moduulin. Vakioita ei voi tuoda
 *    js/ui.js:stä (ui.js tuo merkkikerrokset, ja tuonti toisin päin
 *    olisi kehä) — sama perustelu kuin muillakin laatan mitoilla.
 *
 * 10. NIPPUUN PÄÄSEE VAIN SE, MIKÄ ON KAUPUNGIN PÄÄLLÄ — SAMOILLA
 *    EHDOILLA JOKA RUUDULLA.
 *
 *    OMISTAJAN PELITESTI 28.8.2026 (kaksi kaappausta v1265:stä):
 *    *"työpöydän ratkaisu on paljon parempi"* — työpöydällä Ateenan
 *    lisäkohteet ovat omilla maantieteellisillä paikoillaan, iPhonella
 *    KAIKKI KAHDEKSAN kasautuivat pitkäksi katkoviivasarakkeeksi.
 *    *"Miksi ero on noin iso?"*
 *
 *    MITATTU SYY (Kreikan lehti, Ateena, zoom 2,7; lautayksiköitä
 *    kaupungin keskipisteestä): kaupungin päällä on oikeasti VAIN NELJÄ
 *    kohdetta — Olympieion 0,36, Akropolis-museo 0,40, Akropolis 0,51 ja
 *    Antiikin agora 0,63. Loput ovat kaukana: Marathon 10,3, Reunus-
 *    kilpikonna 22,2, Korintin kanava 25,2, Epidauros 26,5. Ketjuuntumista
 *    ei ole — sarakkeeseen siirtynyt merkki ei vedä naapureitaan mukaan,
 *    vaan jokainen mitataan erikseen kaupungista. Poimijana oli YKSIN
 *    RAJA, ja raja laskettiin kaupungin näkymättömästä SORMIALUEESTA
 *    kattamattomassa mitassa (24 * sRuutu): iPhonella 33,3 lautayksikköä
 *    mutta työpöydällä 10,5, koska sRuutu on 1,25 vastaan 0,36. Sama
 *    näkymätön 48 pikselin ympyrä on siis puhelimella lähes kymmenesosa
 *    koko lehden leveydestä, ja se nielaisi Marathonin, Epidauroksen ja
 *    Korintin kanavan asti.
 *
 *    KORJAUS: raja lasketaan NÄKYVÄSTÄ KIEKOSTA (NIPPU_KIEKKO_R) ja
 *    merkin omasta aluslaatasta, molemmat KATETUSSA merkkimitassa (s).
 *    Silloin se kertoo juuri sen, mitä niputus on varten: peittääkö
 *    merkki kaupungin. Uusi raja on iPhonella 7,7 ja työpöydällä 4,7
 *    lautayksikköä — molemmat samassa välissä 0,63 ja 10,3, joten
 *    KUMPIKIN RUUTU NIPUTTAA TÄSMÄLLEEN SAMAT NELJÄ, ja Marathon,
 *    Epidauros, Korintin kanava ja Reunuskilpikonna jäävät omille
 *    paikoilleen niin kuin työpöydällä.
 *
 *    NAPAUTUS EI ENÄÄ TARVITSE SIIRTOA. Sormialue sai ennen määrätä
 *    rajan, koska päällimmäinen merkki söi laatan napautuksen; sääntö 9
 *    poisti sen syyn. Merkkien keskinäiset päällekkäisyydet ratkeavat
 *    samalla säännöllä (js/fokuskohteet.js lahinKohde, v1218), joten
 *    44 px:n tapattavuus säilyy ilman että merkkiä pitää siirtää.
 *
 *    JÄÄNNÖSERO ON LAATAN OMASSA KOOSSA, EI TÄSSÄ. Laatta ja sen
 *    sykekehä piirretään yhä kattamattomassa mitassa (js/ui.js
 *    paivitaFokusLaatta), joten kapealla ruudulla ne ovat suhteessa
 *    karttaan 2,1-kertaiset työpöytään nähden. Se on oma linjauksensa
 *    (nappula seisoo laatalla) eikä kuulu tähän tiedostoon — mutta se on
 *    myös syy siihen, ettei rajaa voi laskea laatan piirretystä koosta.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NIPPU_/nippu-etuliitteellä.
 */

/*
 * MITAT RUUDUN PIKSELEINÄ LEHDEN PERUSTASOLLA (ks. sääntö 3).
 *
 * NIPPU_KOHDE_R on kohdemerkin aluslaatan säde (js/fokuskohteet.js
 * KOHDE_HALO_R) — törmäysraja lasketaan tästä perustason säteestä.
 */
const NIPPU_KOHDE_R = 5.6;

/*
 * KAUPUNGIN NÄKYVÄ KIEKKO, ruudun pikseleinä perustasolla. Lukua ei voi
 * tuoda js/ui.js:stä (ui.js tuo merkkikerrokset, ja tuonti toisin päin
 * olisi kehä), joten se on toistettu tässä.
 *
 * Laatan oma kiekko: js/ui.js FOKUS_LAATTA_PX (15) on LÄPIMITTA, joten
 * säde on 7,5. Tämä on se pinta, jonka merkki voi oikeasti peittää —
 * siitä lasketaan sekä se, onko merkki "kaupungin päällä" (sääntö 10),
 * että se, kuinka kauas sarakkeet asetetaan (NIPPU_DX).
 *
 * SYKEKEHÄN SÄDE (js/ui.js FOKUS_LAATTA_SYKE_PX = 12) POISTUI
 * 31.8.2026. Sitä tarvittiin vain yhdysviivan alkupäähän, ja viivat
 * poistuivat (sääntö 6). Sarakkeen etäisyys mitataan kiekosta, koska
 * kiekko on se, mitä merkki voisi peittää; kehä on läpikuultava syke
 * eikä peittyvää merkintää.
 *
 * Kaupungin näkymätön SORMIALUE (js/ui.js FOKUS_LAATTA_OSUMA_PX / 2 =
 * 24) ei ole yhdessäkään tämän tiedoston laskussa: napautusten
 * limittäisyyden ratkoo lähin keskipiste (sääntö 9), eikä näkymätön
 * ympyrä saa määrätä sitä, mikä näyttää olevan kaupungin päällä
 * (sääntö 10).
 */
const NIPPU_KIEKKO_R = 7.5;

/*
 * RAKO KAHDEN NÄKYVÄN MERKINNÄN VÄLIIN, ruudun pikseleinä perustasolla.
 * Sama luku palvelee kahta paikkaa: sarakkeen etäisyyttä laatasta
 * (NIPPU_DX) ja rivien väliä (NIPPU_VALI). Ilman rakoa aluslaatat
 * sipaisisivat toisiaan, ja kartta lukisi merkkikasana.
 */
const NIPPU_VALI_RAKO = 2.5;

/*
 * SARAKKEEN ETÄISYYS KAUPUNGIN KESKIPISTEESTÄ — nyt molempiin suuntiin.
 *
 * LUKU ON MITTOJEN SUMMA EIKÄ VALINTA, ja jokainen termi on tämän
 * tiedoston oma:
 *
 *     kaupungin näkyvä kiekko NIPPU_KIEKKO_R   7,5
 *   + merkin oma aluslaatta   NIPPU_KOHDE_R    5,6
 *   + rako                    NIPPU_VALI_RAKO  2,5
 *   ------------------------------------------------
 *                                             15,6  px  (9,4 lautayks.)
 *
 * Merkin aluslaatan reuna jää siis 2,5 pikselin päähän laatan kiekon
 * reunasta: rypäs on kiinni kaupungissa, mutta ei sen päällä.
 *
 * HISTORIA ON PELKKÄÄ LYHENEMISTÄ, ja jokainen askel on omistajan:
 * 48 (kaksi sormialuetta) → 37 (28.8., *"rypäs paljon lähemmäs"*) →
 * 28 (30.8., *"nostot voisi tuoda lähemmäksi Ateenaa"*) → 26 (31.8.,
 * kategoria per kaupunki) → 15,6 (31.8. ilta, esityssiirto ilman
 * viivoja).
 *
 * VIIMEINEN ASKEL OLI MAHDOLLINEN VASTA NYT. 26:n alarajan määräsi
 * YHDYSVIIVA ITSE: viivalle oli jäätävä tilaa olla viiva (sykekehä 12
 * + lyhin piirrettävä pätkä 5 + aluslaatta 5,6 + rako 2,5 = 25,1).
 * Kun viiva poistui (sääntö 6), alaraja palasi siihen, mistä se
 * lähtikin — siihen, etteivät merkinnät mene päällekkäin.
 */
const NIPPU_DX = NIPPU_KIEKKO_R + NIPPU_KOHDE_R + NIPPU_VALI_RAKO;

/*
 * RIVIEN PYSTYVÄLI, ruudun pikseleinä perustasolla.
 *
 * SAMA KAAVA KUIN VAAKAETÄISYYDELLÄ: kaksi aluslaattaa ja rako niiden
 * väliin. Nimiö ei kasvata lukua — nimiölaatikko on merkin korkuinen ja
 * KAPEAMPI kuin aluslaatta pystysuunnassa (js/fokusnosto-symbolit.js
 * nostosymNimioLaatikko: ±NOSTOSYM_MINI_RUUTU × KOHDE_SYMBOLI_SKAALA =
 * ±3,9 px, kun aluslaatta on ±5,6) — joten kun laatat eivät koske,
 * eivät nimiötkään.
 *
 * 30 → 14,2 (omistaja 31.8.2026, esityssiirto). Vanha 30 oli mitoitettu
 * täkysymbolin 20,8 pikselin laatalle silloin, kun täky oli oma
 * kerroksensa; yhtenäisen kohdemallin jälkeen kaikki merkit ovat
 * samankokoisia. Tiivistyvä riviväli (ent. nippuRiviVali) poistui
 * samalla: 14,2 ON se alaraja, johon se ennen puristi.
 */
const NIPPU_VALI = 2 * NIPPU_KOHDE_R + NIPPU_VALI_RAKO;

/**
 * Kerrosten ankkuriryhmätietueet yhtenä jonona.
 *
 * Tietueet ovat kerrosten omia ({ g, x, y, ... }); tämä passi lisää
 * niihin vain `nippu`-kentän. Lähteitä on YHTENÄISEN KOHDEMALLIN
 * (Raamattu 29.8.2026) jälkeen yksi: kohdemerkkien kerros, jossa myös
 * täkynostot ja syvennystarinat nykyään asuvat (js/fokuskohteet.js
 * nykyisenMaanKohteet lisäkohteineen). Erillinen täkypistekerros
 * (ui.nostosymRyhmat) purettiin sen mukana.
 */
function nippuMerkit(ui) {
  const merkit = [];
  for (const ryhma of ui.fokuskohdeRyhmat ?? []) {
    merkit.push({ ryhma, sade: NIPPU_KOHDE_R });
  }
  return merkit;
}

/**
 * SARAKKEIDEN ANKKURIT: maan kaupungit ja niiden kiertokopiot.
 *
 * Lista tulee kohdekerrokselta (`ui.fokuskohdeKaupungit`,
 * js/fokuskohteet.js maanKaupungit) eikä `cityOf`:sta — ks. SARAKE ON
 * LAUDAN ASIA, EI VUORON. Vanha yhden kaupungin polku jää varalle
 * niille näkymille, joissa kohdekerros ei ole vielä kirjoittanut
 * listaa; ilman sitäkin passi vain jättää niput tekemättä.
 *
 * Kiertokohdat lasketaan tässä KERRAN kaupunkia kohti, koska niitä
 * kysytään jokaista merkkiä kohti.
 */
function nippuKaupungit(ui) {
  if (!ui?.fokusmoodi || ui.katselu) return [];
  const lista = ui.fokuskohdeKaupungit?.length
    ? ui.fokuskohdeKaupungit
    : [ui.game?.cityOf?.()].filter(Boolean);
  const ulos = [];
  for (const kaupunki of lista) {
    if (!Number.isFinite(kaupunki?.x) || !Number.isFinite(kaupunki?.y)) continue;
    ulos.push({
      y: kaupunki.y,
      kohdat: ui.kiertoKohdat?.(kaupunki.x) ?? [kaupunki.x],
    });
  }
  return ulos;
}

/**
 * KAUPUNKIEN NÄKYVÄT KIEKOT ESTEINÄ, laudan koordinaateissa.
 *
 * Nimiöväistö (js/fokuskohteet.js paivitaKohdeNimiot) tunsi esteinä
 * vain merkkien omat symbolit, ei kaupungin laattaa — ja kun rypäs
 * latoutuu laatan MOLEMMIN puolin (sääntö 2), väärälle kyljelle
 * ladottu nimiö kulkisi suoraan kaupungin kultaisen kiekon yli. Kylki
 * valitaan ensisijaisesti sarakkeen mukaan (`nippuPuoli`), mutta
 * toivetta ei aina voi noudattaa, joten laatan on oltava myös este.
 *
 * MITTA ON KIEKKO EIKÄ SORMIALUE, samasta syystä kuin säännössä 10:
 * este on se muste, jonka nimi peittäisi, eikä näkymätön ympyrä.
 *
 * @param {object} ui
 * @param {number} s  merkkien vakioskaala
 * @returns {Array<{x1:number,x2:number,y1:number,y2:number}>}
 */
export function nippuLaattaEsteet(ui, s) {
  const ulos = [];
  if (!(s > 0)) return ulos;
  for (const kaupunki of nippuKaupungit(ui)) {
    for (const cx of kaupunki.kohdat) {
      ulos.push({
        x1: cx - NIPPU_KIEKKO_R * s,
        x2: cx + NIPPU_KIEKKO_R * s,
        y1: kaupunki.y - NIPPU_KIEKKO_R * s,
        y2: kaupunki.y + NIPPU_KIEKKO_R * s,
      });
    }
  }
  return ulos;
}

/*
 * ASETTELUN VERSIO. Kasvaa aina kun jonkin merkin nippupaikka oikeasti
 * muuttui — kohdemerkkien nimiöväistö (js/fokuskohteet.js
 * paivitaKohdeNimiot) tarvitsee halvan tavan tietää, onko sen laskema
 * asettelu vanhentunut. Ilman tätä se joutuisi joko rakentamaan
 * paikoista tunnisteen joka kutsulla tai laskemaan törmäykset turhaan.
 */
let NIPPU_VERSIO = 0;

/** Nippuasettelun versio: kasvaa vain, kun jokin merkki oikeasti siirtyi. */
export function nippuAsettelunVersio() {
  return NIPPU_VERSIO;
}

/* ============ LÄHIN KESKIPISTE VOITTAA — MYÖS KAUPUNKI (sääntö 9) ====
 *
 * Kaksi pientä palvelua merkkikerroksille. Kumpikin kerros kysyy ennen
 * oman napautuksensa työtä: "onko kaupungin laatan keskipiste lähempänä
 * kuin minun?" — ja jos on, työ luovutetaan laatalle. Kerrokset eivät
 * siis tarvitse tietoa toistensa mitoista, vain saman mittatikun.
 */

/**
 * Kaupungin laatan osuma-ympyrän keskipisteen etäisyys napautuksesta
 * ruudun pikseleinä, tai Infinity jos napautus ei osu yhteenkään.
 *
 * Mitta luetaan DOMista (getBoundingClientRect) eikä laudan
 * koordinaateista, koska sitä verrataan merkkien omiin ruutumittoihin
 * — sama tapa ja sama syy kuin js/fokuskohteet.js lahinKohde -haussa.
 *
 * KIERTÄVÄ LAUTA HOITUU ITSESTÄÄN: js/ui.js piirtää laatalle oman
 * osuma-ympyrän jokaiseen kiertokohtaan (kiertoKohdat), joten silmukka
 * käy ne kaikki läpi ja palauttaa lähimmän. Jos Tutki ei ole tarjolla,
 * kerros on tyhjä (fokusLaattaTutkii) eikä laatta kilpaile lainkaan.
 *
 * @param {object} ui
 * @param {object} tapahtuma  hiiri-/kosketustapahtuma (clientX/clientY)
 * @returns {number}
 */
export function nippuLaatanEtaisyys(ui, tapahtuma) {
  const x = tapahtuma?.clientX;
  const y = tapahtuma?.clientY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return Infinity;
  let lyhin = Infinity;
  const muodot = ui?.fokusLaattaKerros?.querySelectorAll?.('.fokuslaatta-osuma') ?? [];
  for (const muoto of muodot) {
    const r = muoto.getBoundingClientRect();
    if (!(r.width > 0) || !(r.height > 0)) continue;
    const etaisyys = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
    // Ympyrän laatikko on sen neliö: nurkat eivät kuulu alueeseen.
    if (etaisyys > r.width / 2) continue;
    if (etaisyys < lyhin) lyhin = etaisyys;
  }
  return lyhin;
}

/**
 * Kaupungin laatan napautuksen työ: sama kuin fokusnäkymän Tutki-napin.
 *
 * Kiireen esto on tässä samasta syystä kuin laatan omassa
 * kuuntelijassa (js/ui.js paivitaFokusLaatta): kartta ottaa napautuksia
 * vastaan myös kesken animaation, toisin kuin alarivin napit.
 *
 * @returns {boolean} tehtiinkö työ
 */
export function nippuAvaaKaupunki(ui) {
  const city = ui?.fokusmoodi && !ui.katselu ? ui.game?.cityOf?.() : null;
  if (!city || ui.busy || typeof ui.avaaTutkinta !== 'function') return false;
  ui.avaaTutkinta(city);
  return true;
}

/**
 * Yhden tietueen nippupaikka ja muunnos heti, jos paikka muuttui.
 *
 * MUUNNOS KIRJOITETAAN TÄSSÄ VAIN MUUTOKSESSA. Kumpikin kerros
 * kirjoittaa omat muunnoksensa joka asemointikutsulla heti tämän
 * passin perään — mutta kerrokset asemoituvat eri hetkinä (kohteet
 * pelin piirrossa, symbolit noston kartan vahdissa), ja ilman tätä
 * riviä toisen kerroksen merkki jäisi väärään paikkaan siihen asti,
 * kunnes sen oma asemointi sattuu ajautumaan.
 */
function nippuAseta(ryhma, nippu, vasemmalle, s) {
  const vanha = ryhma.nippu ?? null;
  const sama = (vanha === nippu || (vanha && nippu
    && Math.abs(vanha.x - nippu.x) < 0.01 && Math.abs(vanha.y - nippu.y) < 0.01))
    && Boolean(ryhma.nippuPuoli) === Boolean(vasemmalle);
  ryhma.nippu = nippu;
  /*
   * NIMIÖN TOIVOTTU KYLKI KULKEE TÄSSÄ KENTÄSSÄ (sääntö 2). Väistöpassi
   * (js/fokuskohteet.js paivitaKohdeNimiot) lukee sen ja kokeilee
   * toivottua puolta ensin; ilman sitä vasemman sarakkeen nimiö
   * ladottaisiin oletusjärjestyksessä oikealle eli kaupungin laatan yli.
   * Muutos kasvattaa asettelun version, koska väistön tulos muuttuu.
   */
  ryhma.nippuPuoli = nippu ? Boolean(vasemmalle) : false;
  if (sama) return;
  NIPPU_VERSIO += 1;
  const x = nippu ? nippu.x : ryhma.x + (ryhma.sx ?? 0);
  const y = nippu ? nippu.y : ryhma.y + (ryhma.sy ?? 0);
  ryhma.g?.setAttribute?.('transform',
    `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(4)})`);
}

/* ============ SARAKE ON LAUDAN ASIA, EI VUORON (31.8.2026) =========
 *
 * POLTON EHTO (Raamattu, KARTTANOSTOT POLTETAAN LAATTOIHIN; omistajan
 * sanatarkka ehto: *"karttamerkit pysyvät aina samoina ja paikallaan ja
 * näkyvissä"*). Laattaan poltettu merkki on siinä kohdassa arkkia,
 * johon se poltettiin — pelin loppuun asti. Jos sarake latoutuisi vain
 * sen kaupungin ympärille, jossa pelaaja SEURAAVAKSI seisoo, sama
 * merkki olisi kartalla kahdessa eri paikassa eri vuoroilla, ja
 * poltetun merkin alle jäävä näkymätön osumamuoto olisi milloin
 * missäkin.
 *
 * KAKSI PELITILARIIPPUVUUTTA POISTUI SIKSI TÄSTÄ PASSISTA:
 *
 *   1. NIPPU LATOUTUU MAAN JOKAISEN KAUPUNGIN YMPÄRILLE, ei vain
 *      nykyisen (`ui.fokuskohdeKaupungit`, js/fokuskohteet.js
 *      maanKaupungit). Sama lista ja sama sääntö kuin ryhmittelyllä,
 *      joka on tehnyt näin alusta asti: *"Nykyinen kaupunki ei ole
 *      erikoisasemassa — maan jokainen kaupunki kerää omat kohteensa"*
 *      (js/fokusryhmat.js). Merkki liittyy LÄHIMPÄÄN kaupunkiin, jonka
 *      päälle se osuu; tasapelin ratkaisee kaupunkilistan järjestys.
 *
 *   2. VIHREÄN KOHTAAMISPISTEEN VÄISTÖ (entinen NIPPU_VAPAA, sääntö 4)
 *      on poistettu. Piste on pelitilaa — se ilmestyy ja katoaa kesken
 *      pelin — eikä poltettu sarake voi väistää jotain, mitä laatassa
 *      ei ole. Piste piirtyy omassa kerroksessaan merkkien PÄÄLLE
 *      (js/fokuspiste.js varmistaPistekerros), joten se saa peittää
 *      merkin hetkeksi; napautuksen voittaa yhä lähin osumamuodon
 *      keskipiste (sääntö 9), ei piirtojärjestys.
 *
 * HINTA ON KIRJATTAVA: kun pelaaja on Ateenassa, Thessalonikin merkit
 * ovat nyt myös nipussa oman kaupunkinsa kyljessä eivätkä omissa
 * koordinaateissaan. Se on juuri se, mitä poltto tarkoittaa — kartta ei
 * enää muutu sen mukaan, missä pelaaja seisoo.
 */

/**
 * KASAUSPASSI — kutsutaan kerrosten asemoinnista ennen muunnoksia.
 *
 * @param {object} ui  Pelin UI-olio (fokuskohdeRyhmat,
 *   fokuskohdeKaupungit, kiertoKohdat, fokusmoodi, katselu) — tai
 *   laattageneraattorin sama tynkä ilman DOMia (js/nostoladonta.js).
 * @param {number} s   Merkkien vakioskaala (js/ui.js
 *   fokusMerkkiSkaalaPohja) — sama arvo, jolla kutsuja on juuri
 *   kirjoittamassa muunnoksiaan.
 * @param {number} sRuutu  Kattamaton mitta (sääntö 8); lehden omassa
 *   näkymässä sama luku kuin `s`.
 *
 * DETERMINISTINEN KOLMESTA SYYSTÄ, eikä yksikään niistä lue ruutua,
 * kelloa tai pelitilaa:
 *
 *   1. JONO järjestetään merkkien omista koordinaateista (y, sitten x,
 *      sitten jonon vakaa järjestys) — sama lauta antaa aina saman
 *      järjestyksen, eikä rivi vaihdu sen mukaan, kumpi kerros sattui
 *      asemoitumaan ensin.
 *   2. PUOLI on jonon indeksin pariteetti (parillinen oikealle),
 *      ei arvonta eikä merkin oma maantiede.
 *   3. RIVI on saman indeksin porras (0, +1, −1, +2, …) kerrottuna
 *      vakiovälillä, joka on tämän tiedoston vakioiden summa.
 *
 * Työ on muutaman merkin lajittelu ilman yhtäkään mittausta, joten
 * passin voi ajaa huoletta joka kutsulla.
 */
export function niputaFokusmerkit(ui, s, sRuutu = s) {
  if (!ui || !(s > 0)) return;
  /*
   * SARAKKEET OVAT LEHDEN MITASSA (omistaja 31.8.2026, Raamattu
   * KARTTANOSTOT POLTETAAN LAATTOIHIN). Kutsuja antaa nykyään VAIN
   * lehden perustason vakion (js/ui.js fokusMerkkiSkaalaPohja), joten
   * `sRuutu` on sama luku: rypäs latoutuu samoin puhelimella,
   * työpöydällä ja laattageneraattorin Nodessa. Parametri jää, koska
   * lehdetön varapolku voi yhä antaa kaksi eri mittaa.
   */
  const ruutu = sRuutu > 0 ? sRuutu : s;
  const merkit = nippuMerkit(ui);
  if (!merkit.length) return;
  const kaupungit = nippuKaupungit(ui);
  if (!kaupungit.length) {
    for (const { ryhma } of merkit) nippuAseta(ryhma, null, false, s);
    return;
  }
  /*
   * Kiertävällä laudalla kaupunki on kartalla kahdesti; jokainen
   * merkkikopio latoutuu LÄHIMMÄN kaupunkikopion viereen, jolloin
   * saman merkin kopiot saavat saman rivin omissa sarakkeissaan.
   */
  // Ryppään avain on kaupungin kopion x JA kaupungin y: kahdella
  // saman maan kaupungilla voi olla sama x mutta ei koskaan sama piste.
  const niput = new Map();
  merkit.forEach((merkki, jono) => {
    /*
     * RYPPÄÄSEEN PÄÄSEE VAIN SE, MIKÄ PEITTÄÄ KAUPUNGIN (säännöt 1
     * ja 10).
     *
     * Raja on laatan näkyvän kiekon ja merkin oman aluslaatan säteiden
     * summa — MOLEMMAT KATETUSSA MITASSA (s). Kattamaton sormialue
     * (24 * sRuutu) poimi kapealla ruudulla mukaan koko maakunnan:
     * iPhonella se oli 33 lautayksikköä, työpöydällä 10. Kun mitta on
     * sama kuin merkin piirtomitta, raja kertoo sen mitä pitääkin —
     * peittääkö merkki laatan — ja kumpikin ruutu poimii samat merkit.
     *
     * LÄHIN KAUPUNKI VOITTAA, kun useampi kelpaisi; tasapelin ratkaisee
     * kaupunkilistan järjestys.
     */
    const raja = (NIPPU_KIEKKO_R + merkki.sade) * s;
    let paras = null;
    let etaisyys = raja;
    for (const kaupunki of kaupungit) {
      for (const cx of kaupunki.kohdat) {
        const e = Math.hypot(merkki.ryhma.x - cx, merkki.ryhma.y - kaupunki.y);
        if (e < etaisyys) { etaisyys = e; paras = { cx, cy: kaupunki.y }; }
      }
    }
    if (!paras) { nippuAseta(merkki.ryhma, null, false, s); return; }
    const avain = `${paras.cx}|${paras.cy}`;
    const jold = niput.get(avain) ?? { cx: paras.cx, cy: paras.cy, jono: [] };
    jold.jono.push({ merkki, jono });
    niput.set(avain, jold);
  });
  for (const { cx, cy, jono } of niput.values()) {
    jono.sort((a, b) => (a.merkki.ryhma.y - b.merkki.ryhma.y)
      || (a.merkki.ryhma.x - b.merkki.ryhma.x)
      || (a.jono - b.jono));
    // Sarakkeiden etäisyys on sormen mitassa (sääntö 8): merkin
    // osuma-alue ei saa kutistua kartan mukana, tai rypäs valuisi
    // laatan päälle.
    const dx = NIPPU_DX * ruutu;
    const vali = NIPPU_VALI * s;
    /*
     * SARAKKEET KESKITETÄÄN KAUPUNGIN KORKEUDELLE (rivit 0, +1, −1,
     * +2, … — omistaja 26.8.2026, Akropolis: "piste on liian kaukana
     * ateenasta"). Ennen rivit laskivat vain alaspäin, ja kaupungin
     * keskellä oleva kohde valui diagonaalisesti kauas laatasta.
     * Yksittäinen merkki — tavallisin tapaus — istuu nyt suoraan
     * laatan viereen samalle korkeudelle.
     *
     * PORRAS ON SARAKKEEN OMA (jaettu indeksi), ei koko jonon: kun
     * jono on 0,1,2,3,4,5, oikea sarake saa portaat 0,1,2 ja vasen
     * portaat 0,1,2 — molemmat siis alkavat kaupungin korkeudelta.
     */
    const riviY = (porras) => cy
      + (porras === 0 ? 0 : (porras % 2 ? (porras + 1) / 2 : -(porras / 2))) * vali;
    let indeksi = 0;
    for (const { merkki } of jono) {
      // Parillinen oikealle, pariton vasemmalle (sääntö 2).
      const vasemmalle = indeksi % 2 === 1;
      const porras = Math.floor(indeksi / 2);
      nippuAseta(merkki.ryhma, {
        x: cx + (vasemmalle ? -dx : dx),
        y: riviY(porras),
      }, vasemmalle, s);
      indeksi += 1;
    }
  }
}
