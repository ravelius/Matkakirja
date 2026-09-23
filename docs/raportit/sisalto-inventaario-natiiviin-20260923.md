# Sisältöinventaario natiiviin — 2026-09-23

Sisältökirjuri (Sonnet), Fablen tilaus: mitä sisältöä natiivi vielä
tarvitsee webiin verrattuna ja mitä paketista puuttuu, lukuina.
Natiivi lukee saman sisällön kuin web samojen pakettien kautta
(tools/vienti/vie-sisalto.mjs), joten jokainen tässä listattu aukko on
aukko molemmissa — natiivilla ei ole omaa erillistä sisältövajetta,
vain web-sisällön nykytila kopioituna sellaisenaan. Luvut haettu
suoraan pelin paketeista Node-importilla `origin/main`ista (ei käsin
laskettu). Ei sisältömuutoksia tässä erässä.

## Yhteenveto: viisi lukua

1. **Kaupunkilehdet: 71/266 kaupungilta puuttuu kokonaan.**
   `KULTTUURI_KATEGORIAT`issa on 195/266 kaupunkia. 71 kaupungilla ei
   ole yhtään sivua — ei kantta, ei visaa. Näistä suuri osa on
   Afrikan/muiden mantereiden O-sarjan seuraavia paketteja (mm.
   ahaggar, angola, darfur, kongo, madagaskar, sahara — täysi lista
   raportin lopussa). Lisäksi **3 kaupunkia** (luxemburg, sanfrancisco,
   valletta) ovat "kansi + 0 aihetta" -tilassa: journal on aloitettu
   muttei viimeistelty. Näistä 195:stä täydestä/osittaisesta lehdestä
   puuttuu **kohdekartta 12:lta** (kaikki alueen pääkaupunkeja, joille
   kohdekarttaa ei ohjeen mukaan tehdäkään — kapadokia, siinai,
   rubalkhali, islanti, lappi, kreeta, sisilia, alpit, kamtsatka,
   sahalin, borneo, sumatra — **ei todellinen aukko**) ja
   **nähtävyysjutut 17:ltä** (samat 12 + 5 oikeaa aukkoa: luxemburg,
   bryssel, ljubljana, kosice, valletta).

2. **Maalehdet Euroopan 34 maalle: 0/34 puuttuu.** Kaikilla laudan
   eurooppalaisilla mailla on `MAA_KATEGORIAT`-maalehti. Tämä kohta
   Fablen tilauksessa vaikuttaa jo hoidetulta — 21.9. inventaario
   (docs/raportit/sisaltoinventaario-eurooppa-20260921.md) löysi vielä
   kolme maata (CYP, LUX, MLT) joilla oli maalehti muttei
   kaupunkilehteä; nyt kaikilla kolmella on ainakin aloitettu
   kaupunkilehti (LUX ja MLT ovat kuitenkin yllä mainitut
   "kansi + 0" -tapaukset).

3. **Herot (avauskuva) ilman kuvaa: 8/45 Euroopan saapumiskaupungista.**
   37/45 käyttää generoitua hero-kuvaa (`ampari: 'herokoe/...'`
   fokusvirta-tiedostoissa), 5 (bergen, istanbul, oslo, rooma, sofia)
   korvaa sen tarkoituksella aidolla Commons-valokuvalla (dokumentoitu
   koodikommentissa). **8:lla ei ole hero-viittausta lainkaan:**
   barcelona, bryssel, bukarest, kosice, ljubljana, luxemburg,
   sarajevo, valletta. Sama neljän kaupungin klusteri (bryssel,
   ljubljana, kosice, + luxemburg/valletta) toistuu kohdassa 1 —
   nämä samat kaupungit ovat viimeistelemättä usealla mittarilla
   yhtä aikaa.

4. **Kartuschan tunnusluvut: 21/135 maalta puuttuu kokonaan.**
   Täysi kartuscha vaatii viisi kenttää (vakiluku, pintaAla,
   demokratia, keskitulo, tervehdykset). 114/135 laudan maasta on
   `MAATIEDOT`-rivi, ja NÄMÄ 114 ovat kaikki kenttätäydellisiä (ei
   yhtään osittaista) — kun maa on aloitettu, se on aina viety
   loppuun. 21 maalla ei ole riviä lainkaan: ALB, BLR, MDA, MKD, MNE,
   SRB, SHN (Eurooppa/Afrikka), HKG, ARM, AZE, GEO, PRK, KHM, LAO,
   BGD, BTN, KGZ, TJK, TKM (Aasia), GRL, VUT (Amerikka/Oseania). Yksi
   ylimääräinen BHR-rivi ei vastaa mitään laudan maata — luultavasti
   vanhentunut/käyttämätön, ei siivottu tässä.

5. **Pulmapiirrosten aiheet: 11/266 kaupungilla oma pulma.** Kaikki 11
   nykyistä "Tutki kätkö" -erikoispulmaa (5 Afrikassa, 6 Euroopassa)
   ovat täysin toteutettuja — jokaisella piirroksella on generaattori,
   ei aukkoja siellä. Loput 255 kaupunkia käyttävät geneeristä "Etsi
   kätkö" -tehtävää ilman omaa piirrosta. EPÄSELVÄÄ onko tämä 11
   tarkoituksella lopullinen määrä (harvinaisuus/erikoisuus osa
   suunnittelua) vai onko lisää tulossa — tarvitsee Fablen kannan
   ennen kuin tätä voi laittaa erien jonoon.

## Menetelmä

Luvut Node-importilla suoraan paketeista `origin/main`ista:
`js/packs/maailmankartta.js` (266 kaupunkia, `COUNTRY_SHAPES` 135
maata), `js/packs/kulttuuri-kategoriat.js` (`KULTTUURI_KATEGORIAT`),
`js/packs/maakartat.js` (`KAUPUNKIKARTAT`), `js/packs/nahtavyysjutut.js`
(`NAHTAVYYSJUTUT`), `js/packs/europe-countries.js`
(`EUROPE_CITY_COUNTRY`, 34 ISO3:a), `js/packs/maa-kategoriat.js`
(`MAA_KATEGORIAT`, 119 avainta), `js/packs/*-maatiedot.js` (yhdistetty
`MAATIEDOT.maailmankartta`), `js/packs/*-puzzles.js` (`SKETCHES` /
`EUROPE_SKETCHES`), sekä `js/packs/fokusvirta-<kaupunki>.js`
(hero-viittaukset greppinä). Kohdat 1–2 ja 5 ovat täsmällisiä
(avainjoukkojen erotus); kohta 3 on grep-pohjainen (luotettava
37/8-jaolle, "tarkoituksellinen korvaus" -luokittelu nojaa
koodikommentteihin); kohta 4 täsmällinen läsnäolon osalta.

## Ehdotus: seuraavat kolme erää järjestyksessä

**Erä N1 — viimeistele neljän kaupungin klusteri (pieni, nopea).**
bryssel, ljubljana, kosice + luxemburg/valletta/sanfrancisco: hero-kuva
(Commons tai tilaus), nähtävyysjutut + kohdekartta niille jotka
puuttuvat, ja luxemburg/vallettalle toinen aihesivu kannen lisäksi.
Näistä useimmat ovat jo lähes valmiita usealla muulla mittarilla — pieni
työ, sulkee neljä eri auk­koa samalla kertaa. Ei uutta tutkimustyötä,
vain viimeistelyä olemassa olevaan pohjaan.

**Erä N2 — jatka O-sarjan kaupunkilehtiä (suurin raaka aukko).**
71 kokonaan puuttuvasta kaupungista seuraava luonnollinen erä
(O7:n jälkeen, ks. docs/tyolista-opukselle.md): 6–10 kaupunkia
kerrallaan samalla kansi+1 aihe -mallilla kuin tämän päivän O7-erät
(PR #2966, #2972), rinnakkaisilla Opus-agenteilla. Mantereen valinta
ja järjestys Fablen päätettävissä — Afrikan loput (kimberley-tyyppiset
jo tehty, seuraavaksi esim. darfur/kongo/madagaskar-ryhmä) tai uusi
manner.

**Erä N3 — kartuschan 21 puuttuvaa maata.** Riippumaton kaupunkityöstä,
tarvitaan natiivin maapaneelia varten: vakiluku, pintaAla, sijat,
demokratia, keskitulo, tervehdykset kullekin 21 maalle
(en-Wikipedia/tunnetut tilastolähteet, sama malli kuin olemassa olevat
114 riviä). Voi tehdä yhtä aikaa N2:n kanssa eri agentilla, koska ei
kosketa samoja tiedostoja.

**Pulmapiirrokset (kohta 5) ei ole omana eränä** — kysytään Fablelta
ensin, onko 11 tarkoituksella kattava vai halutaanko lisää, ennen kuin
sille varataan työtä.

## Kaikki 71 kokonaan puuttuvaa kaupunkilehteä

ahaggar, alkufra, angola, appalakit, bahrelghazal, bali, bananal,
bermuda, birdsville, boavista, broome, campogrande, caphorn, cayenne,
churchill, cooberpedy, darfur, exmouth, falkland, galapagos, gao,
geraldton, grandcanyon, hawaii, iguazu, joaopessoa, kalgoorlie,
kamerun, kappalmas, karthago, kilimandzaro, kimberley, kongo,
labrador, macapa, machupicchu, madagaskar, managua, milfordsound,
mosambik, mountisa, mountrushmore, murzuk, namib, nome, norfolk,
noumea, nullarbor, orjarannikko, ouropreto, portovelho, puertomontt,
rashafun, robinsoncrusoe, sahara, sanambrosio, sanjuan, santarem,
saoluis, sepik, sierraleone, sitka, sthelena, suakin, tanganjika,
titicaca, tshadjarvi, uluru, viktoria, viktorianputoukset, yellowstone

**HUOM tämän listan tuoreus:** luvut laskettiin `origin/main`ista
ennen tämän session kahden O7-erä-PR:n (#2966, #2972) mergeä —
karthago, gao, murzuk, alkufra, kimberley, mosambik, suakin, rashafun,
viktorianputoukset ja kilimandzaro (10 kpl) ovat jo valmiita ja
poistuvat tästä listasta heti kun PR:t on mergetty. Todellinen jäljellä
oleva puute on siis **61, ei 71**.
