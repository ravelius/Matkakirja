# Pulun taustaohjeen läpikäynti (8.10.2026, Pelikoodari)

Omistajan lupa ("joo teetä") Päätoimittajan kautta. Läpi käytiin tools/pollo/worker.js:n JARJESTELMAKEHOTE (23 145 merkkiä, 3 194 sanaa) sekä KASITEKEHOTE, JATKOKEHOTE, PAIKKAKEHOTE, PUHETAGIKEHOTE ja AANIKESKUSTELUKEHOTE. **OTETTU KÄYTTÖÖN 8.10.2026 klo 23.4x (omistaja: "ota käyttöön")**: siivottu teksti on nyt worker.js:n JARJESTELMAKEHOTE (ehdotustiedosto poistettu). Puhetta ei generoitu.

## Tulos lyhyesti
- **Uusi pituus 17 654 merkkiä ja 2 393 sanaa (−24 %).** Kolmiosainen vastauskaava (alustus, ydinvastaus kirjakielellä, loppukommentti) säilyy sellaisenaan. Raamatun mukaan "kaavaa muutetaan vain omistajan luvalla" (PULUN VASTAUSKAAVA 26.9.), ja ehdotus poistaa vain toistot ja vanhentuneen. Kaikki sisältösäännöt ja esimerkkiäänet ovat tallella.
- **Testit:**
  - Ennen: pollo 149/149, fokusvirta 42/42, pulu-realtime 10/10.
  - Jälkeen: kun ehdotus vaihdettiin väliaikaisesti worker.js:ään, samat 149/149, 42/42 ja 10/10, ja koko `npm test` 5406/5406. Vaihto palautettiin.
  - Testit vartioivat noin 30 kehotteen otsikkoa ja ilmaisua (esim. OLET SIJAINEN, ANNOSTELLAAN SATUNNAISESTI ja EI MAUSTETTA JATKOKYSYMYSVASTAUKSESSA), ja ehdotus säilyttää ne kaikki.
- **Muut kehotteet** (KASITE, JATKO, PAIKKA, PUHETAGI, AANIKESKUSTELU) ovat jo tiiviitä ja ajantasaisia. Niihin ei ehdoteta muutoksia (ks. alla).

## Löydökset

### Päällekkäiset (poistettu toistot, sisältö säilyy kerran)
1. **Faktojen keksimisen kielto oli viidesti:** ÄLÄ KEKSI FAKTAA, MITÄ ET TEE -kohta "Et keksi faktoja", lopun "Tarkistat aina faktan…", pukeutumisen "keksiä uskottavaa väärää tietoa" ja pullan "FAKTA EI VENY". Ehdotuksessa ne on yhdistetty yhdeksi ÄLÄ KEKSI FAKTAA -osioksi, jossa pukeutuminen, leivonnaiset ja sukutarinat mainitaan. "En osaa" -esimerkki ("Tota ei oo koskaan uskottu kyyhkyn kannettavaksi…") siirtyi sinne lopusta.
2. **Huutomerkkikielto oli neljästi** (sävy, alustus, kehyksen loppu, ohjeen viimeinen rivi), nyt kerran SÄVY-osiossa.
3. **Esittelylause "Olen pöllö. Sijaisena. Eli pulu…" oli kahdesti** (avaus ja KARAKTÄÄRI), nyt vain KARAKTÄÄRIssä.
4. **Annostelusäännöt olivat hajallaan viidessä osiossa:**
   - "korkeintaan yksi iso persoonaelementti" sekä LIVIAN LISÄYKSESSÄ että KEVYESSÄ MAUSTEESSA
   - "korkeintaan joka kymmenes" erikseen sijaisuudessa, sivupolussa ja nimipröystäilyssä
   - "kevyitä lisiä korkeintaan yksi"
   - poissulkulistat (jatko, kieltäytyminen, "en tiedä", small talk, oikaisu) kolmesti

   Ne on koottu yhdeksi uudeksi **ANNOSTELU**-osioksi (665 merkkiä). Osiot viittaavat siihen, ja testien vaatimat lauseet ovat paikallaan.
5. **Jatkokysymyksen poissulkulista oli kolmesti** (JATKOKYSYMYS, LIVIAN LISÄYS, KEVYT MAUSTE) ja neljännen kerran kehysOhje('jatko')-rivillä. Ehdotuksessa lista on JATKOKYSYMYS-osiossa ja kehysohjeessa. Lisäys- ja mausteosioissa on vain testien vaatima yhden rivin kielto.
6. **Lyhentymien katto oli kolmesti** (OMA ÄÄNESI, ALUSTUS: "yksi tai korkeintaan kaksi", LOPPUKOMMENTTI: "saman katon mukaan"), nyt kerran OMA ÄÄNESI -osion 1. säännössä.
7. **Vaikeiden aiheiden ristiviittaukset oli neljästi** (VUOSI 1873, ISOISÄN MAADOITUS, SYNKKÄ AIHE ja VAIKEAT NYKYAIHEET viittasivat toisiinsa). Nyt viittauksia on yksi kumpaankin suuntaan.
8. **Lopun sävykappale** ("kuiva ja toteava, lempeän ironinen", "et puhu 1873-vuoden äänellä") roikkui ISOISÄN MAADOITUKSEN perässä irrallaan. Se on siirretty SÄVY-osioon, johon se kuuluu.

### Vanhentuneet (korjattu)
1. **LUKIJOIDEN EHDOTUKSET:** "palaute (huutomerkki ruudun alakulmassa) … osio 'Ehdota lehteen'" kuvaa webin käyttöliittymää. Natiivissa palaute ja ehdotukset ovat **☰-valikon napissa "ehdota sisältöä"** (proto UI/PalauteLomake.cs). Lomakkeen sisältö (≤ 3 kuvaa, juttuidea, nimimerkki, sähköposti, lisenssivakuutus) on sama, joten vain reitti on korjattu.
2. **ROOLISI:** "näkyvissä laudalla tai lehdessä" on muutettu muotoon "kartalla, kohteessa tai lehdessä". Natiivissa ei ole lautaa, mutta Pulu syventää karttaa, kohteita, linssejä ja lehtiä.

### Ristiriidat Raamatun kanssa (Raamattu vanhentunut, ehdotus ei muuta kaavaa, PT tai Fable päättää kirjauksen)
1. **Livian lisäyksen otsikko.** Raamatun LIVIAN PUHEKIELI (28.8.2026) sanoo "loppuun rivillä 'Livian lisäys:'". Kehotteen omistajalinjaus 30.8.2026 on uudempi ja kieltää otsikon ("ÄLÄ OTSIKOI SITÄ"). Ehdotus noudattaa uudempaa, ja Raamatun lause kannattaa korjata.
2. **Alustus.** Raamatun LIVIAN PUHEKIELI sanoo "Chatin hopotys-alku ('Niin,', 'Annas kun mietin.') on kumottu — pulun alustukset pois (8.9.2026)". Myöhempi omistajan sitova PULUN VASTAUSKAAVA (26.9.2026) palauttaa kolmiosaisen kaavan, joka alkaa Pulun omalla tyylillä, ja kehote toteuttaa sen. Ehdotus pitää alustuksen ja listan, mukaan lukien "Annas ku mietin.". Raamatun 8.9.-lause on 26.9.:n kumoama, joten sen voi poistaa. Jos omistaja haluaa nimenomaan "Annas ku mietin" -muodon pois, se on yhden rivin muutos.
3. **"Pulu pois videopeleistä" (omistaja 8.10.):** kehote ei puhu seikkailuista eikä linnoista, joten ristiriitaa ei ole. Linjausta ei ole vielä kirjattu Raamattuun (vain Siirtosepän commit c15eb5b8a), joten se kannattaa kirjata.
4. **Sävy ja kohderyhmä 13+:** kehote on linjassa ("13 vuotta täyttäneet ja aikuiset", ei hymiöitä, ei huutomerkkejä, synkissä aiheissa ei julmuuksia). Muutoksia ei tarvita.

### Sisäiset ristiriidat
- **Ei varsinaisia.** Pieni jännite: oikaisussa "alustus on pelkkä äännähdys" (KEVYT MAUSTE) ja "alustus on AINA" (ALUSTUS). Nämä sopivat yhteen (äännähdys on alustus), ja ehdotus pitää molemmat.
- **Ydinvastauksen pituus:** chatissa 2–5 virkettä (SÄVY), äänikeskustelussa 2–4 (AANIKESKUSTELUKEHOTE). Se on tarkoituksellinen ohitus äänessä.

## Rinnakkain (osioittain, merkkiä ennen → jälkeen)
| osio | ennen | jälkeen | mitä poistui ja miksi |
|---|---|---|---|
| avaus | 355 | 246 | esittelylause (sama KARAKTÄÄRIssä) |
| ROOLISI | 323 | 334 | "laudalla" → "kartalla, kohteessa" (natiivi) |
| PELIN OMA AINEISTO | 795 | 487 | toistava sivulause; kielletty aloitus säilyy |
| SIJAINTI | 659 | 514 | tiivistys, testien lauseet säilyvät |
| ÄLÄ KEKSI FAKTAA | 270 | 603 | **kokoaa** viisi faktakieltoa ja "en osaa" -esimerkin |
| MITÄ ET TEE + VAIKEAT NYKYAIHEET | 1 423 | 1 214 | "Et keksi faktoja" -kohta (siirtyi ylös), tiivistys |
| LUKIJOIDEN EHDOTUKSET + SÄVY | 1 102 | 1 072 | webin reitti → natiivin ☰ "ehdota sisältöä"; lopun sävykappale siirtyi SÄVYyn |
| KAKSI ÄÄNTÄ | 935 | 852 | tiivistys |
| JATKOKYSYMYS | 588 | 529 | tiivistys (lista säilyy tässä) |
| OMA ÄÄNESI | 1 727 | 1 549 | lyhentymäkatto kerran (ALUSTUS ja LOPPUKOMMENTTI viittasivat) |
| ALUSTUS | 1 424 | 930 | huutomerkki- ja lyhentymäsäännön toisto; lista lyheni kolmella esimerkillä |
| LOPPUKOMMENTTI | 1 194 | 738 | "saman katon mukaan" -kappale, kaksi esimerkkiä |
| KARAKTÄÄRI | 464 | 455 | ennallaan |
| ANNOSTELU (uusi) | 0 | 665 | kokoaa hajallaan olleet tiheys- ja poissulkusäännöt |
| OLET SIJAINEN | 609 | 493 | "joka kymmenes" siirtyi ANNOSTELUun |
| KASVATAT PÖLLÖÄ | 617 | 525 | tiivistys |
| ET AINA ONNISTU | 1 485 | 1 086 | annostelun toisto, yksi esimerkkilause |
| PULLA-PERSOUS | 1 279 | 731 | annostelun ja faktakiellon toisto (molemmat keskitetty) |
| TÄYSI NIMI | 424 | 305 | "joka kymmenes" siirtyi ANNOSTELUun |
| PUKEUTUMINEN | 624 | 427 | faktakielto siirtyi ÄLÄ KEKSI FAKTAA -osioon |
| VUOSI 1873 | 856 | 562 | ristiviittaus vaikeisiin aiheisiin |
| LIVIAN LISÄYS | 1 481 | 617 | poissulkulistat ja annostelu (ANNOSTELU), otsikkokielto säilyy |
| KEVYT MAUSTE | 1 561 | 652 | poissulut ja "kevyitä lisiä yksi" (ANNOSTELU) |
| SYNKKÄ AIHE | 1 412 | 1 004 | ristiviittaus, tiivistys; pariperiaate säilyy |
| ISOISÄN MAADOITUS | 1 539 | 1 065 | lopun irrallinen sävykappale (→ SÄVY) ja faktatoisto |
| **yhteensä** | **23 145** | **17 654** | **−24 %** |

## Muut kehotteet
- **KASITEKEHOTE** (avainkäsitteet), **JATKOKEHOTE**, **PAIKKAKEHOTE** ja **PUHETAGIKEHOTE** ovat lyhyitä ja ajantasaisia: xAI-äänitagit ovat yhä käytössä, Raamattu STRIIMIPUHE 27.9. Ei muutoksia.
- **AANIKESKUSTELUKEHOTE** kumoaa tekstimerkinnät äänimuodossa, ja se on yhä tarpeen, koska pohjakehote mainitsee JATKOT- ja käsitemerkinnät.
- Huomio: kehysOhje('jatko') toistaa jatkokysymyksen poissulkulistan. Toisto on tarkoituksellinen (viimeinen ohje ennen kirjoittamista), joten se säilyy.

## Käyttöönotto (vasta omistajan hyväksynnällä)
1. worker.js: `JARJESTELMAKEHOTE` ← ehdotuksen teksti (yksi vakio). pulunKehote ja pulunKehoteOsat pysyvät, joten vastausmuoto ja välimuistilohkot ovat ennallaan.
2. Välimuisti: pohjalohkon sisältö muuttuu, joten ensimmäinen pyyntö kirjoittaa välimuistin uudelleen kerran (noin 4 400 tokenia vähemmän kuin nyt, joten jatkossa myös halvempi).
3. Ennen julkaisua vertailuajo: 10 tyypillistä kysymystä (uusi aihe, jatko, puhuttelu, synkkä aihe, oikaisu, pulla) vanhalla ja uudella testimallilla (Haiku, `OPAS_TESTI_MALLI`) rinnakkain omistajalle luettavaksi. Ei puhetta.
