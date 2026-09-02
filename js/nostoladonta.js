/*
 * NOSTOJEN LADONTA ILMAN SELAINTA — se laskenta, joka poltetaan
 * laattoihin, ja se sama laskenta, jonka paalle peli latoo
 * napautusalueensa.
 *
 * OMISTAJAN PÄÄTÖS 31.8.2026 (Raamattu, KARTTANOSTOT POLTETAAN
 * LAATTOIHIN), sanatarkasti: *"mikään karttanostoista ei kuulu kadota
 * laudalta missään vaiheessa peliä, joten ne voidaan aivan hyvin
 * polttaa suoraan karttaan. Ainoa, mitä ei polteta, on ne vilkkuvat
 * valot sekä tietysti muut pelin aikana vaihtelevat asiat, mutta
 * karttamerkit pysyvät aina samoina ja paikallaan ja näkyvissä."* — ja
 * saman päivän tarkennus: *"myös nostojen tekstit on hyvä polttaa
 * suoraan kartalle."*
 *
 * ── TÄMÄ MODUULI EI LADO MITÄÄN ───────────────────────────────────
 *
 * Täällä on VAIN se, mitä poltettu ja elävä kerros tarvitsevat
 * yhteisesti: ladonnan mittakaava ja merkin sisältötiiviste. Itse
 * ladonta on pelin omissa passeissa, ja laattageneraattori ajaa ne
 * sellaisenaan ilman DOMia — tynkä `ui` kootaan
 * tools/fokuskartta/nostot.mjs:ssä, ja passit ovat nämä:
 *
 *   merkkirivit         js/fokuskohteet.js  kohdeKarttarivit
 *   kasaus ja viivat    js/fokusniput.js    niputaFokusmerkit
 *   erottelusiirto      js/fokuskohteet.js  eritteleKohdeRyhmat
 *   nimioiden vaisto    js/fokuskohteet.js  paivitaKohdeNimiot
 *   nimion mitta        js/fokusnosto-symbolit.js  nostosymNimioMitta
 *
 * Raamattu vaatii tämän sanatarkasti: *"Poltetun ladonnan ja selaimen
 * osumamuotojen on tultava SAMASTA lähteestä, ettei kahta ladontaa
 * pääse eriytymään."* Jos generaattoriin joskus kirjoitetaan oma kaava
 * jostakin yllä olevasta, poltettu merkki ja sen näkymätön
 * kosketusalue alkavat erota — ensin pyöristyksen verran, sitten
 * kokonaan.
 *
 * ── TÄMÄ ON LEHTIMODUULI, EIKÄ SE SAA TUODA MITÄÄN ────────────────
 *
 * js/fokuskohteet.js kysyy täältä tiivisteen (onko merkki poltettu) ja
 * js/ui.js mittakaavan. Jos tämä toisi kohdekerroksen, syntyisi kehä —
 * ja yhden tiedoston versiossa (tools/build-standalone.mjs) kehä ei ole
 * varoitus vaan ladontajärjestyksen virhe.
 *
 * ── MIKSI TÄMÄ ON MAHDOLLISTA VASTA NYT (v1382) ───────────────────
 *
 * Ladonta riippui neljästä ruudun mitasta v1382:een asti. Siinä
 * erässä ne kiinnitettiin lehden perustason vakioon
 * (`nostoladontaSkaala`, ent. js/ui.js fokusMerkkiSkaalaPohja), ja
 * nimiön leveys siirtyi merkkileveystaulukkoon `measureText`in tilalle
 * (js/fokusnosto-symbolit.js nostosymNimioMitta). Sen jälkeen iPad,
 * iPhone, työpöytä ja Node antavat saman ladonnan.
 *
 * ── MITÄ EI POLTETA, JA MIKSI ─────────────────────────────────────
 *
 * 1. VILKKUVAT VALOT (js/karttavalot.js), PELAAJAN NAPPULA,
 *    VUORORENGAS, NYKYISEN KAUPUNGIN KOROSTUSLAATTA ja VIHREÄ
 *    KOHTAAMISPISTE. Omistajan oma rajaus: nämä vaihtuvat pelin
 *    aikana.
 *
 * 2. NAPAUTUSALUEET. Poltettu merkki on pikseleitä laatassa eikä ota
 *    vastaan kosketusta, joten näkymättömät osumamuodot jäävät
 *    selaimeen — ja ne piirretään TÄSTÄ ladonnasta, samaan pisteeseen.
 *
 * 3. TÄKYNOSTOT (js/fokusnosto.js). Nämä JÄÄVÄT ELÄVIKSI, ja syy on
 *    mitattu eikä mielipide: täkypooli luetaan KAUPUNGIN omasta
 *    paketista (js/fokusvirta.js fokusvirtaSisalto -> `takynostot`) ja
 *    vasta sen puuttuessa maapoolista, joten saman maan kaksi
 *    kaupunkia näyttävät eri joukon täkyjä. Joukko siis muuttuu pelin
 *    aikana — ja koska täky menee samaan sarakkeeseen kuin muut merkit
 *    (js/fokusniput.js), se siirtäisi KOKO sarakkeen rivit — ja
 *    naapureitaan vielä erottelusiirrolla (js/fokuskohteet.js
 *    eritteleKohdeRyhmat). Lisäksi täky ilman omia koordinaatteja
 *    asettuu siihen kaupunkiin, jossa pelaaja sillä hetkellä on
 *    (js/fokusnosto.js nostonPaikka).
 *
 *    SEURAUS ON KIRJATTAVA: MAA, JONKA TÄKYJOUKKO EI OLE VAKAA, JÄÄ
 *    KOKONAAN POLTTAMATTA (jokainen sen merkki saa `poltettava:
 *    false`). Sarakekohtainen esto ei riittäisi, koska täky liikuttaa
 *    myös oman sarakkeensa ulkopuolisia merkkejä. Se on omistajan oma
 *    malli: *"uusia karttanostoja tulee vielä … ne voi väliaikaisesti
 *    tehdä samalla tavalla kuin tähän asti … tehdään vain sitten uusi
 *    poltto kartalle sopivassa vaiheessa."*
 *
 *    MITATTU 31.8.2026: seitsemän maata (BGR, BIH, ESP, GBR, ITA, ROU,
 *    UKR) jäi ulos, ja 624 merkistä poltettiin 413. Jokainen esto oli
 *    korjattavissa DATASSA eikä koodissa — viisi täkyä tarvitsi omat
 *    koordinaatit ja kaksi maata yhtenäisen täkypoolin.
 *
 *    NE VIISI PAIKKA-KENTTÄÄ ON NYT KIRJOITETTU (31.8.2026, sama
 *    päivä): `areena` (BGR), `pyramidi` (BIH), `kissat` (ITA),
 *    `dracula` (ROU) ja `sofian-mosaiikit` (UKR) saivat omat
 *    koordinaattinsa kaupunkipaketteihinsa. Mitattu uudelleen: 628
 *    merkistä poltetaan 510, ja ulos jää enää KAKSI maata (ESP, GBR),
 *    joiden täkypooli vaihtuu kaupungeittain — se on täkyjoukon
 *    sisällön kysymys eikä paikka-kentän, joten se jää päätettäväksi.
 *
 * ── NIMET ON PREFIKSOITU ──────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTOLADONTA_/nostoladonta-etuliitteellä.
 */
/*
 * LEHDEN OMA PROTOTYYPPILEVEYS JA MERKIN KATTO.
 *
 * Luvut asuivat js/ui.js:ssä (FOKUS_LEHTI_PROTO, FOKUS_MERKKI_KATTO).
 * Ne muuttivat tänne, koska laattageneraattori tarvitsee saman kaavan
 * eikä voi tuoda js/ui.js:ää — se vetäisi mukanaan koko pelin
 * käyttöliittymän. js/ui.js tuo ne nyt täältä, joten kaava on yhdessä
 * paikassa ja sen arvo on täsmälleen entinen.
 *
 * PROTO on tools/fokuskartta/piirto.js:n `S`: lehden kaikki ladonta —
 * kirjainkoot, viivanleveydet, vuorikolmiot — on annettu 1600 pikselin
 * levyisen lehden pikseleinä.
 *
 * KATTO on se, montako lehden omaa pikseliä yksi merkin perustason
 * pikseli saa olla. 2,0 tekee kohdemerkin symbolista lehden
 * vuorikolmion mittaisen ja nimiöstä poltetun vuorennimen kokoisen.
 */
export const NOSTOLADONTA_PROTO = 1600;
export const NOSTOLADONTA_KATTO = 2.0;

/*
 * YKSI GLOBAALI MITTAKAAVA KOKO LAUDALLE (omistajan valinta
 * kysymyskortilla 31.8.2026: "0,60 — Kreikan mitta").
 *
 * Vanha kaava KATTO * rajaus.w / PROTO oli MAAKOHTAINEN: se oli oikea
 * silloin, kun jokainen lehti katsottiin erikseen ruudulle
 * sovitettuna, mutta yhdellä yhteisellä pyramidikartalla se antoi
 * 134 maalle 129-kertaisen hajonnan (RUS 7,215 … SHN 0,056).
 * Mitattuna: Venäjän nostonimiöt olivat 500 km:n janalla 24,4 px kun
 * kartan omat paikannimet ovat 10,5 px; Kreikan 3,0 px samalla
 * janalla.
 *
 * 0,60 on "Kreikan mitta koko maailmalle": omistajan jo hyväksymät
 * maat (GRC 0,585, FIN, ITA, EGY) pysyvät käytännössä ennallaan ja
 * vain jättiläiset kutistuvat (RUS ÷12). Keskizoomilla (z6) nimiö on
 * kartan oman paikannimen kokoinen; syvimmällä tasolla 2,4-kertainen.
 */
export const NOSTOLADONTA_S = 0.6;

/**
 * MERKKIEN LADONNAN MITTAKAAVA — laudan oma, ei ruudun eikä lehden.
 *
 * Lautayksikköä kirjaston yksikköä kohti. Yksi globaali vakio koko
 * laudalle (NOSTOLADONTA_S) — sama luku joka ruudulla, joka
 * laitteella, joka maassa ja Nodessa — ja juuri se koko, joka
 * laattaan poltetaan.
 *
 * Rajaus on yhä portti: ilman lehden ikkunaa 0, sillä siinä
 * näkymässä ei ole poltettavaakaan, ja kutsuja jää entiseen
 * ruutumittaan. Rajausta ei enää käytetä mittana — se hajotti koon
 * maittain (ks. NOSTOLADONTA_S).
 */
export function nostoladontaSkaala(rajaus) {
  if (!(rajaus?.w > 0)) return 0;
  return NOSTOLADONTA_S;
}

/* ============ RUUTUKATTO: NOSTO EI OHITA KAUPUNKIA ================
 *
 * OMISTAJA 1.9.2026 aamu (kuvakaappaus Sofian fokusnäkymästä,
 * mittajana 25 km), sanatarkasti: *"Karttanostot ovat aivan liian
 * isolla. Tee max sama koko kuin kohdekaupungin koko."*
 *
 * ── MIKÄ VIKA ON ──────────────────────────────────────────────────
 *
 * Nosto on KARTTAVAKIO (NOSTOLADONTA_S): sen koko on lautayksiköitä,
 * joten se kasvaa kartan mukana. Kartan oma paikannimi on
 * PAPERIVAKIO: 10,5–12 CSS-pikseliä joka zoomilla (js/karttanimet.js
 * KOKO). Kaksi eri mittajärjestelmää eroavat sitä enemmän mitä
 * syvemmälle zoomataan, ja juuri sen omistaja luki ruudulta.
 *
 * MITATTU (Chromium 1024x768 dpr 2, Sofian fokusnäkymä, zoomiportaat
 * pohjaan asti; nimiön ruutukoko = NOSTOLADONTA_NIMIO_KOKO x porras x
 * mittakaava, kaupungin nimi luettu ruudulta):
 *
 *     mittakaava   nostonimiö   Sofian nimi   suhde
 *      1,18 px/y      4,1 px       12,0 px     0,34
 *      3,21           11,1         12,0        0,93
 *      4,82           16,7         12,0        1,39
 *      7,23           25,0         12,0        2,08   <- omistajan kuva
 *     11,40 (pohja)   39,4         12,0        3,28
 *
 * ── KATTO ON KARTAN OMA NIMI ──────────────────────────────────────
 *
 * Yläraja on se koko, jonka SAMA nimiö saa elävänä: kohdenimi
 * luovutetaan ruutuavaruuden ladontaan (js/fokuskohteet.js
 * luovutaKohdeNimiot -> js/karttanimet.js KOKO.kohde), ja se on
 * omistajan oma päätös 30.8.2026 *"sama koko"* kuin kaupungin nimellä.
 * Katto ei siis ole uusi luku vaan sama luku toisesta kerroksesta.
 *
 * KATTO KOSKEE KOKO MERKKIÄ, ei pelkkää tekstiä: symboli ja nimiö ovat
 * yhtä rasteria (js/fokusnosto-symbolit.js piirraNostosymKartalle), ja
 * pelkän tekstin kutistaminen irrottaisi ne toisistaan.
 *
 * KATTO EI KOSKE LADONTAA. Merkkien PAIKAT (kasaus, erottelusiirto,
 * nimiöväistö) lasketaan yhä kattamattomalla NOSTOLADONTA_S:llä, koska
 * poltetun ladonnan on oltava sama joka tasolla — muuten yhdestä
 * merkistä olisi kolme eri paikkaa kolmessa laatassa eikä luettelon
 * yksi tiiviste voisi kuvata niitä. Katto kutistaa vain PIIRRON, joten
 * väistö on katon purressa hieman varovainen (nimiöiden väliin jää
 * ilmaa) — se ei voi koskaan päästää niitä päällekkäin.
 */
/** Nimiön kirjasinkoko kirjaston yksikköinä (js/fokusnosto-symbolit.js
 * NOSTOSYM_NIMIO_KOKO — tuplattu tänne, koska tämä moduuli ei saa tuoda
 * mitään; tests/nostoladonta.test.mjs vahtii että luvut ovat samat). */
export const NOSTOLADONTA_NIMIO_KOKO = 11;
/** Merkin säde samoissa yksiköissä (js/fokusnosto-symbolit.js
 * NOSTOSYM_MINI_R — tuplattu tänne samasta syystä kuin nimiön koko;
 * tests/nostoladonta.test.mjs vahtii että luvut ovat samat). */
export const NOSTOLADONTA_SYMBOLI_R = 6.5;

/* ====== YKSI SUHDE KAIKILLE MERKKIPERHEILLE (omistaja 2.9.2026) =====
 *
 * OMISTAJAN BUGIRAPORTTI, sanatarkasti: *"Siirto viivat aivan liian
 * paksuja. Osa nostoista vielä polttamatta ja väärän kokoisia"*
 * (iPhone, Kreikka, mittajana 25 km).
 *
 * Kaappauksessa oli samassa näkymässä NELJÄ eri kokojärjestelmää:
 * eläintäky jättimäisenä, karttanostot pieninä, maastokolmio siltä
 * väliltä ja poltettu nosto omanaan. Mitattuna (iPhone 402 x 874
 * dpr 3, Sofia, mittajana 25 km, skaala 6,655 — symbolin halkaisija ja
 * nimen kirjasinkoko ruudun pikseleinä):
 *
 *     perhe            symboli   nimi   symboli/nimi
 *     karttanosto       10,0     8,5       1,18
 *     eläintäky         27,2    23,0       1,18   <- 2,7 x nosto
 *     maastokolmio       8,0    11,0       0,73
 *     poltettu nosto    18,6    15,7       1,18   (laskettu, z7 x 1,85)
 *
 * ── MIKÄ SUHDE ON OIKEA ───────────────────────────────────────────
 *
 * Se, jolla nosto POLTETAAN laattaan, koska poltettua kuvaa ei voi
 * enää muuttaa: merkin halkaisija on 2 x NOSTOSYM_MINI_R ja nimiön
 * kirjasinkoko NOSTOSYM_NIMIO_KOKO samassa kirjaston yksikössä, eli
 * 13 / 11 = 1,18. Kaikki muut perheet mitataan tätä vasten — se ei ole
 * uusi luku vaan sama luku luettuna toisesta kerroksesta, aivan kuten
 * ruutukaton yläraja on kartan oma kohdenimi.
 *
 * KAUPUNGIN PISTE EI KUULU TÄHÄN. Piste ja rengas ovat PAIKAN merkkejä
 * eivätkä piktogrammeja: nimen mittainen piste olisi kartalla musta
 * nappi (js/karttanimet.js MERKKI, *"musta pippuri"*). Suhde koskee
 * niitä perheitä, joissa symboli on kuva — nosto, eläintäky ja
 * maastokolmio.
 */
export const NOSTOLADONTA_MERKKISUHDE
  = (2 * NOSTOLADONTA_SYMBOLI_R) / NOSTOLADONTA_NIMIO_KOKO;
/*
 * KATTO LASKI 10,5 -> 8,5 (omistaja 1.9.2026 ilta, kuvakaappaus
 * Bulgarian lehtinäkymästä, sanatarkasti: *"kaupunkien nimet pitäisi
 * olla isommalla (suurenna) kuin karttanostojen nimet joita voi
 * pienentää"*).
 *
 * KATTO ON YHÄ SAMA LUKU KUIN KARTAN OMA KOHDENIMI, ja juuri se luku
 * pieneni (js/karttanimet.js KOKO.kohde). Aamun katto oli *"max sama
 * koko kuin kohdekaupungin koko"*; illan tilaus erottaa nämä kaksi
 * toisistaan — kaupunki 12,5 px, nosto 8,5 px — jotta katse tietää,
 * kumpi nimi on paikka ja kumpi sen vieras.
 */
/** Nimiön suurin ruutukoko, CSS-pikseliä (js/karttanimet.js KOKO.kohde). */
export const NOSTOLADONTA_NIMIO_KATTO = 8.5;
/*
 * LAATTA EI TIEDÄ KATSOJAN PIKSELITIHEYTTÄ, JA SE ON MITATTU RAJA.
 *
 * Peli valitsee laattatason tarpeesta `mittakaava * dpr`
 * (js/laattapyramidi.js valitseTaso), joten tason omat pikselit ovat
 * LAITEPIKSELEITÄ. Ruutukatto on CSS-pikseleissä, ja muunnos niiden
 * välillä on juuri se dpr, jota poltettaessa ei voi tietää — sama
 * juurisyy, jonka takia paikannimiä ei polteta lainkaan
 * (tools/fokuskartta/maailmapiirto.js luku 8b).
 *
 * Poltto olettaa siksi tarkkanäytön (dpr 2): se on omistajan iPadin ja
 * työpöytänäyttöjen tiheys. dpr 1 näkee poltetun nimiön kaksinkertaisena
 * kattoon nähden ja dpr 3 kaksi kolmasosaa siitä — ELÄVÄ kerros on
 * tarkka joka laitteella, koska se tuntee mittakaavan.
 */
export const NOSTOLADONTA_POLTON_TIHEYS = 2;

/* ==== LAATAN VENYTYS: Z7:N YLI KARTTA ON SUURENNUSLASIN ALLA =======
 *
 * OMISTAJAN PÄÄTÖS 2.9.2026 (kysymyskortilla), sanatarkasti: *"kun
 * zoomataan z7:n yli, piirretyt merkit kasvavat samassa suhteessa kuin
 * suurennettu karttakuva — koko kartta kuin yksi paperi suurennuslasin
 * alla. Ei uutta zoomitasoa, ei polttoa."*
 *
 * ── MIKÄ VIKA OLI, MITATTUNA ──────────────────────────────────────
 *
 * Pyramidin syvin taso on z7, ja SEN YLI PELI EI LATAA UUTTA TASOA
 * VAAN VENYTTÄÄ z7-LAATTAA (js/laattapyramidi.js valitseTaso valitsee
 * lähimmän tason tarpeelle `skaala * dpr`, eikä syvempää ole).
 *
 * Poltettu nosto on laatan omia pikseleitä, joten se venyy laatan
 * mukana. Elävä nosto oli ruutukatossa (NOSTOLADONTA_NIMIO_KATTO), joka
 * on CSS-pikselivakio — se EI venynyt. Samassa kuvassa oli siis kaksi
 * eri kokoista nostoa sen mukaan, kumpi sattui olemaan poltettu:
 *
 *     näkymä                        skaala  venytys  poltettu  elävä
 *     iPhone 402x874 dpr 3, 25 km    6,26     1,74    14,8 px  8,5 px
 *     iPad 834x1112 dpr 2, 25 km     9,24     2,57    21,8 px  8,5 px
 *
 * (poltetun nimiön ruutukoko = NOSTOLADONTA_NIMIO_KATTO x venytys,
 * tools/savukkeet/mittaa-syvazoomi.mjs poltetunNostonMitat). Poltettu
 * Marathon oli siis 1,7-2,6 kertaa elävän Delfoin kokoinen, eikä
 * kumpaakaan voi lukea vääräksi omassa kerroksessaan: vika on VÄLISSÄ,
 * ja se kasvaa syvyyden mukana.
 *
 * ── VENYTYS ON YKSI LUKU, JA SE ON JOHDETTU EIKÄ ARVATTU ──────────
 *
 * Laatta on 1:1 silloin, kun näkymän mittakaava vastaa tason omaa
 * tiheyttä. Tason pikselit ovat LAITEPIKSELEITÄ (valitseTaso saa
 * tarpeen muodossa `skaala * dpr`), ja poltto olettaa tarkkanäytön
 * (NOSTOLADONTA_POLTON_TIHEYS = 2, ks. sen perustelu yllä), joten
 * syvimmän tason 1:1-mittakaava CSS-pikseleinä on
 *
 *     NOSTOLADONTA_SYVIN_TIHEYS / NOSTOLADONTA_POLTON_TIHEYS
 *       = 7,2 / 2 = 3,6 CSS-pikseliä lautayksikköä kohti,
 *
 * ja venytys on näkymän mittakaava jaettuna sillä. Sama laskutoimitus
 * on jo mitassa (mittaa-syvazoomi.mjs poltetunNostonMitat: `2 * skaala
 * / tasonTiheys`), ja juuri se on tämän erän vertailukohta.
 *
 * DPR EI OLE KAAVASSA, JA SE ON TAHALLISTA. Laattaan poltettu muste on
 * poltettu dpr 2:n oletuksella; katsojan oma pikselitiheys ei muuta
 * sitä KUVAA vaan ainoastaan sen terävyyden. Jos venytys luettaisiin
 * todellisesta dpr:stä, sama näkymä antaisi puhelimella (dpr 3) eri
 * merkkikoon kuin iPadilla (dpr 2) — eli täsmälleen sen laitekohtaisen
 * hajonnan, jonka v1382 ladonnasta poisti.
 *
 * ── MIKSI VAKIO EIKÄ LUETTELON LUKU ───────────────────────────────
 *
 * Syvin tiheys on LAUDAN GEOMETRIAA eikä ajonaikainen tieto: 7,2 px
 * lautayksikköä kohti on omistajan lukitsema mitta (Raamattu 30.8.2026
 * PYRAMIDIN LUKITUT MITAT: *"syvin taso 7,2 px maailmanyksikkoa kohti
 * = 240 px/aste"*), ja sen muuttaminen tarkoittaa koko pyramidin — ja
 * nostojen polton — ajamista uusiksi.
 *
 * LUETTELO EI KELPAA LÄHTEEKSI, koska se voi olla tynkä: mittatyökalut
 * syöttävät pelille yhden tason luettelon (tools/savukkeet/
 * mittaa-syvazoomi.mjs PYRAMIDILUETTELO, vain z0), ja jos venytys
 * luettaisiin siitä, elävien merkkien koko riippuisi siitä, mitkä
 * laatat sattuvat olemaan levyllä — mittaus mittaisi omaa tynkäänsä.
 *
 * KOPIO ON SILTI KOPIO, JOTEN SE ON VAHDITTU KONEELLISESTI. Luku asuu
 * laattageneraattorissa (tools/generoi-laattapyramidi.mjs `TIHEYS` ja
 * `TASOJA`), eikä js/ saa tuoda tools/-moduulia (yhden tiedoston versio
 * ketjuttaa vain js/:n). tests/nostoladonta.test.mjs lukee generaattorin
 * omat vakiot ja kaatuu, jos tämä luku jää niistä jälkeen — sama tapa
 * kuin js/ui.js REITTIYKSIKKO_LAUDALLA:lla ja tests/viivataso.test.mjs:n
 * SYVIN_TIHEYS-vahdilla.
 *
 * ── MITÄ VENYTYS KOSKEE JA MITÄ EI ────────────────────────────────
 *
 * KATTOA, EI LADONTAA. Katto kerrotaan venytyksellä, jolloin z7:n yli
 * merkin PORRAS on vakio lautayksiköissä — merkki, nimiö, sarakkeen
 * siirtymä, siirtoviiva ja nimiön rako kasvavat kaikki kartan mukana
 * samassa suhteessa, koska ne kulkevat saman katon läpi
 * (nostoladontaKattoSuhde). Ladonta — kasaus, erottelusiirto,
 * nimiöväistö — on yhä kattamattomassa NOSTOLADONTA_S:ssä, joten
 * yksikään merkin kenttä eikä yksikään tiiviste muutu.
 *
 * POLTTOA EI SIIS TARVITA, ja NOSTOLADONTA_SAANTO PYSYY v7:SSÄ. Se on
 * osa omistajan päätöstä (*"ei uutta zoomitasoa, ei polttoa"*), ja se
 * on myös laskettavissa: generaattori kysyy katon tason omalla
 * tiheydellä (px / NOSTOLADONTA_POLTON_TIHEYS), joka on syvimmällä
 * tasolla täsmälleen 3,6 ja jokaisella karkeammalla pienempi — venytys
 * on polton kaikilla tasoilla tasan 1, ja laatoista tulee tavulleen
 * samat kuin ennen tätä erää.
 *
 * Z7:N ALAPUOLELLA MIKÄÄN EI MUUTU (Math.max(1, …)): sama porras
 * samalla mittakaavalla kuin ennen. Vartija on testi
 * (tests/nostoladonta.test.mjs) eikä silmämääräinen tarkistus.
 */
/**
 * Pyramidin SYVIMMÄN tason tiheys, LAITEPIKSELIÄ lautayksikköä kohti
 * (tools/generoi-laattapyramidi.mjs `TIHEYS`, syvin taso `TASOJA - 1`).
 */
export const NOSTOLADONTA_SYVIN_TIHEYS = 7.2;

/**
 * Syvimmän tason 1:1-mittakaava, CSS-PIKSELIÄ lautayksikköä kohti:
 * sitä lähempänä laatta venyy eikä uutta tasoa ole. 7,2 / 2 = 3,6.
 */
export const NOSTOLADONTA_SYVIN_RUUTUPX
  = NOSTOLADONTA_SYVIN_TIHEYS / NOSTOLADONTA_POLTON_TIHEYS;

/**
 * KUINKA MONINKERTAISEKSI LAATTA ON VENYTETTY — ks. lohko yllä.
 *
 * @param {number} ruutuPx CSS-pikseliä lautayksikköä kohti (pelissä
 *   `nakyvaAlue().skaala`, generaattorissa tason oma tiheys jaettuna
 *   NOSTOLADONTA_POLTON_TIHEYDELLÄ)
 * @returns {number} >= 1; tasan 1 syvimmällä tasolla ja sitä ulompana
 */
export function nostoladontaVenytys(ruutuPx) {
  if (!(ruutuPx > 0)) return 1;
  return Math.max(1, ruutuPx / NOSTOLADONTA_SYVIN_RUUTUPX);
}

/**
 * PIIRTOMITTA KATOLLA — yksi kaava pelille ja laattageneraattorille.
 *
 * KATTO VENYY LAATAN MUKANA (omistaja 2.9.2026, ks. lohko yllä): z7:n
 * yli yläraja on `NOSTOLADONTA_NIMIO_KATTO * venytys`, jolloin porras
 * on vakio lautayksiköissä ja merkki kasvaa kartan mukana. Sitä
 * ulompana venytys on 1 eikä kaava muutu tavuakaan.
 *
 * @param {number} porras  lautayksikköä KIRJASTON yksikköä kohti
 *   (js/fokuskohteet.js KOHDE_SYMBOLI_SKAALA * nostoladontaSkaala)
 * @param {number} ruutuPx CSS-pikseliä lautayksikköä kohti — pelissä
 *   `nakyvaAlue().skaala`, laattageneraattorissa tason oma tiheys
 *   jaettuna NOSTOLADONTA_POLTON_TIHEYDELLÄ
 * @returns {number} porras katolla leikattuna (<= porras)
 */
export function nostoladontaKattoPorras(porras, ruutuPx) {
  if (!(porras > 0) || !(ruutuPx > 0)) return porras;
  const katto = NOSTOLADONTA_NIMIO_KATTO * nostoladontaVenytys(ruutuPx);
  return Math.min(porras, katto / (NOSTOLADONTA_NIMIO_KOKO * ruutuPx));
}

/* ====== KATTO KOSKEE KOKO PIIRROSTA, EI VAIN MERKIN KOKOA ==========
 *
 * OMISTAJA 2.9.2026, sanatarkasti: *"symbolit heittelee muodoiltaa ja
 * tekstejä puuttuu"* (Bulgaria, mittajana 50 km) — ja saman päivän
 * toinen kaappaus Sofiasta: siirtoviivat *valtavina*, nostosymbolit
 * pikkuruisina ja niiden nimet 60–100 pikselin päässä symbolistaan.
 *
 * ── JUURISYY, MITATTUNA ───────────────────────────────────────────
 *
 * Nosto on YKSI PIIRROS — symboli, nimiö, sarakkeen siirtymä
 * kaupungista ja siirtoviiva niiden välissä. Ruutukatto
 * (nostoladontaKattoPorras) kutisti niistä vain YHDEN: merkin oman
 * skaalan. Kaikki muu jäi kattamattomaan ladontamittaan
 * (NOSTOLADONTA_S) eli karttavakioksi, joka kasvaa rajatta
 * lähennettäessä. Ero on täsmälleen `skaala x NOSTOLADONTA_S`, ja
 * mitattuna se on syvässä zoomissa yli viisinkertainen:
 *
 *   Sofia, iPad 834 x 1112 dpr 2, mittajana 50 km, skaala 9,24 px/yks.
 *     nostosymboli (katossa)          11,3 px
 *     siirtoviivan leveys             8,87 px   (tilattu 1,6)
 *     siirtoviivan katko / väli   16,6 / 11,1   (tilattu 3 / 2)
 *     sarakkeen siirtymä             ~86 px     (tilattu ~23)
 *     nimiön rako merkin reunaan     ~34 px     (merkin oma säde 5,6)
 *
 * Silmä lukee juuri tämän: merkki on pieni, sen nimi on kaukana, ja
 * niiden välissä on sormenpaksuinen katkoviiva.
 *
 * ── SÄÄNTÖ ────────────────────────────────────────────────────────
 *
 * Katto on SUHDE, jolla koko piirros kutistetaan sen ANKKURIN ympäri
 * (kaupungin piste sarakkeessa, merkin oma datapiste muualla).
 * Ankkuri pysyy paikallaan, ja siirtymä, viiva, symboli ja nimiö
 * kertautuvat samalla luvulla — piirros pysyy kasassa joka zoomilla.
 *
 * LADONTA EI MUUTU MILLIÄKÄÄN. Merkkien paikat (kasaus, erottelusiirto,
 * nimiöväistö) lasketaan yhä kattamattomalla NOSTOLADONTA_S:llä, ja
 * juuri ne menevät tiivisteeseen ja laattaan — ks. edellisen lohkon
 * "KATTO EI KOSKE LADONTAA". Muutos on PIIRTOSÄÄNTÖ, ja siksi
 * NOSTOLADONTA_SAANTO nousee (v7).
 *
 * SAMA KAAVA MOLEMMILLE: peli antaa näkymän oman mittakaavan,
 * laattageneraattori tason tiheyden jaettuna NOSTOLADONTA_POLTON_
 * TIHEYDELLÄ. Tason omalla tarkkuudella katsottuna poltettu ja elävä
 * piirros ovat siis edelleen sama kuva.
 *
 * @param {number} porras  lautayksikköä KIRJASTON yksikköä kohti
 * @param {number} ruutuPx CSS-pikseliä lautayksikköä kohti
 * @returns {number} 0 < suhde <= 1 — se luku, jolla koko piirros
 *   (siirtymä, viiva, symboli, nimiö) kerrotaan ankkurinsa ympäri
 */
export function nostoladontaKattoSuhde(porras, ruutuPx) {
  if (!(porras > 0)) return 1;
  const katettu = nostoladontaKattoPorras(porras, ruutuPx);
  return katettu > 0 ? katettu / porras : 1;
}

/* ============ TIIVISTE: MUUTOS ON HUOMATTAVA =======================
 *
 * Raamattu 31.8.2026: luettelo kantaa tiedon siitä, MITKÄ nostot
 * ajossa poltettiin, ja *"Pelkkä totuusarvo EI riitä kuten nimiöillä,
 * koska kerrokset ovat rinnakkain eivätkä toisensa poissulkevia."*
 *
 * Tunnus yksin ei riitä sekään: jos noston SISÄLTÖ muuttuu polton
 * jälkeen — kohteelle kirjoitetaan uusi nimi, ryhmään tulee jäsen,
 * merkki siirtyy — laatassa on vanha kuva, ja pelkkään tunnukseen
 * luottava peli vaikenisi ja näyttäisi vanhentunutta. Tiiviste tekee
 * erosta näkyvän: luettelon ja pelin tiivisteet eroavat, peli piirtää
 * merkin elävänä, ja seuraava poltto korjaa laatan.
 *
 * TIIVISTEESEEN KUULUU SE, MIKÄ LAATTAAN MENI JA MIKÄ VOI MUUTTUA
 * DATASSA: tunnus, symboli, merkin laji, nimiö sellaisena kuin se
 * piirtyy (lyhennettynä ja katkaistuna), merkin lopullinen paikka
 * laudalla ja ryhmän jäsenet järjestyksessä.
 *
 * VÄISTÖN PÄÄTÖS — näkyykö nimiö ja kummalla puolella — EI OLE
 * TIIVISTEESSÄ, ja se on tarkoitus. Päätös on FUNKTIO edellisistä:
 * merkkijoukosta, paikoista ja nimiöteksteistä (js/fokuskohteet.js
 * paivitaKohdeNimiot). Jos jokin niistä muuttuu, tiiviste muuttuu jo
 * niiden kautta; jos mikään ei muutu, päätöskin on sama. Ainoa tapa
 * saada päätös muuttumaan tiivisteen huomaamatta on muuttaa väistön
 * ALGORITMIA, ja se on koodimuutos, joka vaatii uuden polton siinä
 * missä symbolin muodon muutoskin.
 *
 * SYY, MIKSI SE ON POIS, ON RAKENTEELLINEN: peli päättää merkin
 * poltetuksi ENNEN väistöpassia (väistö tarvitsee tiedon siitä, mitkä
 * merkit ovat eläviä), joten päätös ei voi olla tiivisteen syötettä
 * ilman kehää.
 *
 * PAIKKA PYÖRISTETÄÄN kolmeen desimaaliin. Ilman sitä kelluvan
 * pisteen viimeinen bitti tekisi jokaisesta ajosta eri tiivisteen,
 * eikä kenttä kertoisi enää mitään; kolme desimaalia on lautayksikön
 * tuhannesosa eli Ateenan leveydellä noin kaksi ja puoli millimetriä.
 *
 * FNV-1a 32 bittiä. Tiiviste ei suojaa miltään — se erottaa kaksi
 * versiota samasta merkistä — joten kryptografista tiivistettä ei
 * tarvita eikä sitä saisi tuoda riippuvuutena kahteen ajoympäristöön.
 * Kahdeksan heksamerkkiä riittää: kuudellasadalla merkillä
 * yhteentörmäyksen todennäköisyys on suuruusluokkaa 4e-5, ja
 * törmäyksen hinta on yksi merkki, joka jää päivittymättä seuraavaan
 * polttoon asti.
 */
/*
 * PIIRTOSÄÄNNÖN TUNNUS ON TIIVISTEEN SYÖTETTÄ (1.9.2026).
 *
 * Tiivisteen johdanto sanoo sen itse: väistön päätös ei ole
 * tiivisteessä, koska *"ainoa tapa saada päätös muuttumaan tiivisteen
 * huomaamatta on muuttaa väistön ALGORITMIA, ja se on koodimuutos, joka
 * vaatii uuden polton siinä missä symbolin muodon muutoskin."* Juuri
 * niin kävi tässä erässä kahdesti — merkin ruutukatto
 * (nostoladontaKattoPorras) ja nimiöväistön neljä kylkeä
 * (js/fokuskohteet.js paivitaKohdeNimiot) — eikä yksikään merkin kenttä
 * muuttunut, joten luettelo olisi väittänyt vanhoja laattoja tuoreiksi
 * ja peli olisi vaiennut merkeistä, jotka laatassa ovat väärän
 * kokoisina ja osa ilman nimiötä.
 *
 * SÄÄNNÖN TUNNUS on siksi tiivisteessä mukana: kun piirtosääntö
 * muuttuu, tämä luku nostetaan, JOKAINEN tiiviste eroaa luettelosta ja
 * peli piirtää merkit elävinä siihen asti kunnes uusi poltto ajetaan.
 * Se on tiivisteen koko tarkoitus, ja hinta on yhden ajon mittainen
 * kaksoispiirto — sama, jonka luettelon oletus "mitään ei ole poltettu"
 * jo hyväksyy (js/laattapyramidi.js nostoOnPoltettu).
 */
/*
 * v3 (omistaja 1.9.2026): kaupunkinostojen katto — kaupungin viereen
 * jää enintään kolme nostoa, ihmeet ja skandaalit ensin
 * (js/fokuskohteet.js karsiKaupunkiruuhka). Versio nostettiin, jotta
 * v2-säännöllä poltettu taso piiloutuu kunnes uusi poltto on ajossa.
 *
 * v4 (omistaja 1.9.2026 ilta, kuvakaappaus Bulgarian lehtinäkymästä):
 * KAKSI piirtosäännön muutosta, kumpikin sanatarkasti tilattu, ja
 * kumpikin muuttaa poltetun nimiön kokoa tai laatikkoa:
 *
 *   1. *"kaupunkien nimet pitäisi olla isommalla (suurenna) kuin
 *      karttanostojen nimet joita voi pienentää"* — nimiön ruutukatto
 *      10,5 -> 8,5 px (NOSTOLADONTA_NIMIO_KATTO yllä). Poltettu nimiö
 *      on siis pienempi kuin v3:n laatoissa.
 *   2. *"otetaan pois karttanostojen teksteistä valkoinen ääriviiva,
 *      eli tekstit pelkällä tummalla"* — halo pois
 *      (js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_ASUT `haloLeveys: 0`).
 *      Halo oli osa nimiön TÖRMÄYSLAATIKKOA, joten nimiöiden väistö
 *      päättää nyt toisin.
 *
 * Kumpikaan ei muuta yhtäkään merkin kenttää, joten ilman tätä
 * versiokorotusta luettelo väittäisi v3-laattoja tuoreiksi ja peli
 * vaikenisi merkeistä, jotka laatassa ovat väärän kokoisia ja väärin
 * ladottuja. Sama syy kuin v3:ssa — ks. lohkon johdanto.
 *
 * v5 (omistaja 1.9.2026 ilta, sanatarkasti: *"otetaan siirtoviivat
 * takaisin karttanostoille (esim. ateena)"*): jokainen siirretty
 * karttanosto saa taas ohuen katkoviivan merkin reunalta sen omalle
 * paikalle (js/fokusniput.js sääntö 6), ja viiva poltetaan laattaan
 * merkin ja nimiön kanssa samaan kuvaan
 * (tools/fokuskartta/maailmapiirto.js piirraNostotKankaalle).
 *
 * VIIVA EI OLE TIIVISTEEN SYÖTETTÄ, JA JUURI SIKSI TÄMÄ NOSTO ON
 * PAKOLLINEN. Viiva on funktio merkin lopullisesta paikasta ja sen
 * ankkurista, ja paikka on jo tiivisteessä — mutta v4-laatoissa on
 * merkki ILMAN viivaa täsmälleen samassa pisteessä, joten jokainen
 * tiiviste täsmäisi ja peli vaikenisi merkeistä, joiden viiva ei ole
 * missään. Nostettuna luettelo ei kelpaa lainkaan (js/laattapyramidi.js
 * `nt.saanto !== NOSTOLADONTA_SAANTO`), peli piirtää nostot elävinä
 * viivoineen, ja seuraava nostotason poltto tekee niistä taas laattaa.
 *
 * v6 (omistaja 2.9.2026 aamu, sanatarkasti: *"Lisää siirto viivat, ne
 * ei vielä näy"*; kaappaus Ateenasta): v5:n viiva OLI kartalla ja
 * laatoissa, mutta puhelimen ruudulla se oli kahden CSS-pikselin veto
 * 30 %:n peitolla haalealla okralla — mitattuna sama asia kuin paperin
 * oma rae. Viiva on nyt selvästi näkyvä: leveys 0,8 -> 1,6, himmeys
 * 0,3 -> 0,7, katko 2,0 -> 3,0 välillä 2,0, ja muste merkin omaa
 * (#3a2819) haalean okran sijasta (js/fokusniput.js NIPPU_VIIVA_*).
 *
 * SAMA SYY KUIN v5:SSÄ, VAIN TOISIN PÄIN: viiva ei ole tiivisteen
 * syötettä, joten v5-laatoissa on merkki, jonka viiva on OLEMASSA
 * mutta väärän näköinen, ja jokainen tiiviste täsmäisi. Ilman tätä
 * nostoa peli hyväksyisi v5-laatat tuoreiksi ja omistaja katsoisi
 * yhä samaa näkymätöntä viivaa — nyt luettelo ei kelpaa lainkaan,
 * peli piirtää nostot elävinä uusilla mitoilla, ja seuraava
 * nostotason poltto tekee niistä taas laattaa.
 *
 * v7 (omistaja 2.9.2026, sanatarkasti: *"symbolit heittelee muodoiltaa
 * ja tekstejä puuttuu"*): ruutukatto koskee nyt KOKO piirrosta eikä
 * vain merkin skaalaa — sarakkeen siirtymä, siirtoviiva ja nimiön rako
 * kutistuvat merkin mukana ankkurinsa ympäri (nostoladontaKattoSuhde
 * yllä). Merkin PAIKKA laudalla — se, mikä tiivisteessä on — ei muutu
 * tavuakaan, mutta piirros on toinen: v6-laatoissa merkki on
 * kaukaisemmassa kohdassa kuin peli sen nyt piirtää ja viiva on
 * paksumpi. Sama syy kuin v5:ssä ja v6:ssa — piirtosäännön muutos ei
 * näy yhdessäkään merkin kentässä, joten ilman tätä nostoa luettelo
 * väittäisi vanhoja laattoja tuoreiksi.
 */
export const NOSTOLADONTA_SAANTO = 'v7';

export function nostoladontaTiiviste(merkki) {
  const osat = [
    NOSTOLADONTA_SAANTO,
    merkki.tunnus,
    merkki.symboli ?? '',
    merkki.laji ?? '',
    merkki.nimio ?? '',
    Number(merkki.x).toFixed(3),
    Number(merkki.y).toFixed(3),
    (merkki.osat ?? []).join('+'),
  ].join('');
  let h = 0x811c9dc5;
  for (let i = 0; i < osat.length; i += 1) {
    h ^= osat.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
