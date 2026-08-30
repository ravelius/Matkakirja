# Viesti Fablelle — nimet laatoista peliin (haara claude/nimet-peliin)

*(Opus, 30.8.2026. Haara tuoreesta origin/mainista **222502ed = v1367**.
Versiota EI nostettu, PR:ää EI tehty, pyramidin generointityönkulkua EI
ajettu — sinä julkaiset. dist/ ei ole mukana. js/kartta.js:n kamera- ja
panorointikoodiin ei koskettu: toinen agentti on siellä.*

*Edellinen raportti (lehtipurku + merten nimet) on gitissä commitissa
222502ed; tämä tiedosto on kirjoitettu sen päälle, koska sen
päätöskysymykset A, B ja "MIKSI EN TEHNYT NIMIÖIDEN CSS-PIKSELI-
MITOITUSTA" ovat kaikki tässä erässä ratkaistu.)*

---

## LUE TÄMÄ ENSIN — JULKAISU VAATII KAKSI ASKELTA OIKEASSA JÄRJESTYKSESSÄ

Nimet ovat nyt kahdessa maailmassa: vanhoissa laatoissa ne ovat
poltettuina, uusissa niitä ei ole. **Kumpikaan ei saa puhua yhtä aikaa
eikä kumpikaan vaieta yhtä aikaa.** v1366 korjasi kaksoisnimen
vaientamalla elävän kerroksen; tässä suunta kääntyy.

Ratkaisin sen niin, ettei julkaisujärjestyksellä ole väliä ja ettei
mikään välitila riko peliä: **päätöksen tekee LUETTELO, ei
versionumero.** `pyramidi.json` kantaa uuden kentän `nimiot: false`, ja
`js/laattapyramidi.js laatoissaOnNimet()` lukee sen.

| luettelo ämpärissä | mitä pelaaja näkee |
| --- | --- |
| **nykyinen** (kenttää ei ole) | nimet laatoista, kuten nyt — peli vaikenee |
| **uusi** (`nimiot: false`) | nimet pelistä, oikean kokoisina — laatta vaikenee |

Eli: **tämän voi julkaista koodina heti**, ja mikään ei muutu ennen
kuin pyramidi on ajettu uudestaan ja uusi luettelo on ämpärissä.
Nimet vaihtavat kerrosta samalla hetkellä kun uusi luettelo saapuu, ei
hetkeäkään ennen. Jos pyramidia ei koskaan ajeta, peli jää nykytilaan
eikä mitään ole rikki.

**Pyramidin uusiajo on siis se, mikä tämän erän oikeasti julkaisee.**
Se on sinun ja omistajan päätös; minä en ajanut sitä.

---

## Lyhyesti

Kolme omistajan päätöstä kysymyskortilta, kaikki tehty.

1. **Poltettu mittajana pois laatoista.** Se oli atlaskehyksen ainoa
   kaluste, joka väitti jotain mitattavaa, eikä se voinut pitää
   väitettään (enimmillään 41 % pielessä). Pelin oma ruutuun ankkuroitu
   jana jää ainoaksi. Kartussi ja painajanrivi jäävät.
2. **Kehysviivat paperivakioksi.** Ennen z0:lla 0,15 px (näkymätön) ja
   z7:llä 40,5 px; nyt sama kynä joka tasolla. Uloimmalla tasolla
   kehys tuli näkyviin — se oli tarkoitus, ja se on todennettu
   silmillä.
3. **Nimiöt ja niiden merkit pois laatoista, peli latoo ne
   ruutuavaruudessa** (uusi `js/karttanimet.js`). Nimi on nyt sama
   koko dpr 1:llä, 2:lla ja 3:lla (mitattu laatikko 14,0 CSS-px
   kaikilla) — ennen sama nimi oli 10,7 ja 5,3 CSS-pikseliä.

Portit: `node --test tests/*.test.mjs` → **# pass 1047, # fail 0**
(1 skipped). Kaksoisavaimet ja niputus puhtaat, `build-standalone`
kääntyy (20 363 kt), `dist` poistettu.

Dokumentaatio: `docs/moduulit/laattapyramidi.md` **luku 6g** (uusi) —
kaikki kolme päätöstä, perustelut ja mitatut luvut. Luvut 4 ja 6c
saivat viittauksen siihen, ja luvun 12 avoimet kohdat 1c, 1d ja 1e on
merkitty ratkaistuiksi.

---

## 1. Mitä laatoista poistuu ja mitä jää

**Poistuu:** kaupunkien, vuorten ja järvien nimiöt; kaupunkipiste
(2,0 / 2,6 px), sen rengas (4,6 px), vuorisymboli (4–5 px) ja
kohderengas (3,2 px).

**Jää:** maasto, meri, rannat, joet, järvet, asteverkko, atlaskehys,
kartussi, painajanrivi, kompassiruusu, merten nimet — **ja reitit**
(408 + 71 lentoreittiä sekä 123 joen uomat).

### Miksi merkit lähtevät nimien mukana (kysyit perustelua)

Sääntö, jonka annoit, ratkaisee kaikki kolme: *piste ja sen nimi on
pidettävä samassa suhteessa.*

- **Kaupunkipiste ja sen rengas** ovat nimen ANKKURI, eivät koriste:
  ladonta varaa pisteen ennen nimiä, jottei nimi peitä toisen kaupungin
  merkkiä. Jos piste jäisi laattaan ja nimi lähtisi peliin, varaus ei
  enää vastaisi sitä, mitä ruudulla on — ja piste olisi dpr 3:lla
  0,7 px eli tahra nimensä vieressä.
- **Vuorisymboli** on saman nimiön merkki: nimi kirjoitetaan 11 pikseliä
  sen alle. Sama kappale.
- **Kohderengas lähtee ILMAN korvaajaa**, ja tämä on ainoa kohta, jossa
  jotain oikeasti katoaa. Perustelu: kohteilla on jo elävä, ruutuun
  mitoitettu merkki nimineen ja napautusaloineen (`js/fokuskohteet.js`)
  siinä maassa, jossa pelaaja on — poltettu rengas oli sen alla toinen,
  pienempi merkki samasta asiasta. Muualla siitä jäi **nimetön ympyrä,
  joka on dpr 3:lla yhden CSS-pikselin kokoinen**. Kaikkien 197 kohteen
  tuominen elävään kerrokseen vaatisi kaikkien 22 maapaketin lataamisen
  heti alussa (ne ladataan nyt maa kerrallaan), enkä pitänyt sitä
  hintansa arvoisena yhdestä pikselistä. **Jos omistaja haluaa
  maailmanlaajuisen kohdemerkin takaisin, se on oma pieni eränsä** —
  sano, niin teen sen.

### Miksi reitit ja joet JÄÄVÄT

Ne ovat viivatyötä samassa paperivakioluokassa kuin rannikko (luku 6d),
niissä ei ole tekstiä eikä siis luettavuusvaatimusta, ja 602 polyviivaa
elävässä kerroksessa palauttaisi juuri sen kuorman, jonka purkaminen
teki panoroinnista sujuvan v1365:ssä. Ne eivät myöskään ole minkään
nimen ankkureita.

---

## 2. Ladonta on SIIRRETTY, ei keksitty uudestaan

`js/karttanimet.js` on suora käännös generaattorin `__ladonta`-
funktiosta. Mukana tulivat kaikki säännöt, jotka teit laatoille:

- laudan oma asettelu (`la/lx/ly`) ensin — se on käsin hiottua työtä —
  ja vasta törmätessä neljä tavanomaista karttapaikkaa, viimeisenä
  pudotus (yleistystä, ei virhe)
- tärkeysjärjestys lähtökaupunki (+8) → lentokenttä (+4) →
  reittisolmun aste (+0…3)
- kaupunkien PISTEET varataan ennen nimiä
- kaksoisnimi vain kerran, tasokohtaisella päätöksellä (Alpit, Ahaggar,
  Appalakit, Titicaca, Tanganjika, Tšad-järvi)
- yleistyskynnykset nimitiheydestä
- leveys mitataan `measureText`illä samalla kirjasimella jolla piirretään

**Kolme asiaa muuttui, ja jokainen on korjaus:**

1. **Kynnysten yksikkö on CSS-pikseli**, ei laitepikseli. Kynnykset
   johdettiin nimitiheydestä (*"60 pikselin nimi tarvitsee vähintään
   W/16 pikselin välin"*), ja sekä nimen leveys että lukukelpoinen väli
   ovat ruudun ominaisuuksia. Työpöydän käytös säilyy sellaisenaan;
   tiheä näyttö saa saman sen sijaan että nimet syttyisivät kolme
   kertaa liian aikaisin ja kolmasosan kokoisina.
2. **Kirjasin on pelin oma kartta-antiikva** (`.city-label`in perhe)
   eikä kontin Liberation Serif — se on lähempänä aikakauden atlasta ja
   se on laitteella oikeasti olemassa. Mittari ja piirto käyttävät
   samaa merkkijonoa, joten törmäystesti pysyy totena.
3. **Ladonta ajetaan kerran ZOOMIA kohti**, ei kerran tasoa kohti.
   Tulos on laudan yksiköissä, joten panorointi ei laske mitään
   uudelleen — eikä nimi voi hypätä paikasta toiseen kartan liikkuessa.
   Tulos muistetaan mittakaavan mukaan (zoomiportaita on kuusi).

**Yksi mitattu ero laattoihin:** vuorisymbolia ei varata. Laatoillakaan
sitä ei varattu; kun kokeilin varata, jokainen vuoren nimi törmäsi
omaan symboliinsa (296 nimiötä, 49 pudotettua). Ilman varausta tulos on
sama **345** kuin laatoilla.

---

## 3. MITATUT LUVUT

### Nimen koko ruudulla — tämä on koko korjauksen ydin

Sama näkymä (390×844, skaala 0,7993), sama laattakansio, eri
pikselitiheys. Luku on lähtökaupungin nimen kirjainkoko CSS-pikseleinä
(ladonnan `koko` on 12; poltetun sai laskettua siitä, minkä tason
asiakas valitsi):

| | valittu taso | ENNEN (poltettu) | JÄLKEEN (ladottu) |
| --- | --- | --- | --- |
| dpr 1 | z4 (0,9 px/yks) | **10,7 CSS-px** | **12,0 CSS-px** |
| dpr 2 | z5 (1,8 px/yks) | 5,3 CSS-px | **12,0 CSS-px** |
| dpr 3 | z5 (1,8 px/yks) | **5,3 CSS-px** | **12,0 CSS-px** |

Ladotun nimen ladottu laatikko mitattiin ruudulta
(`getBoundingClientRect`): **14,0 CSS-px kaikilla kolmella**, ja
ladottujen nimien määrä (29) sekä paikat olivat täsmälleen samat.

Yleisesti poltettu nimi on `koko · skaala / taso.px`, ja koska taso on
√2:n päässä luvusta `skaala · dpr`, 12 pikselin nimi on dpr 3:lla
2,8…5,7 CSS-pikseliä ja dpr 1:llä 8,5…17,0. Sama nimi, sama zoomi, eri
laite — juuri se, minkä omistaja näki.

### Nimimäärä per zoomtaso

| skaala (CSS-px/yks) | ladottu koko laudalle | pudotettu | ruudulla 390×844 |
| --- | --- | --- | --- |
| 0,799 | 307 | 6 | 29 |
| 1,198 | 342 | 3 | 12 |
| 1,797 | 345 | 0 | 5 |
| 2,696 | 345 | 0 | 3 |
| 4,044 ja yli | 345 | 0 | 1 |

Vertailu laattoihin (koko arkki): z2 62, z3 297 (19 pudotettu), z4 344
(7), z5 350 (1), z6–z7 351 (0). Sama suuruusluokka; ero tulee
yksikönvaihdosta.

### Kehysaika panoroinnissa — muutoksen todellinen hinta

Mitattu Chromiumissa 390×844 dpr 3, samat laatat, sama ele:

| | ENNEN | JÄLKEEN |
| --- | --- | --- |
| kehysaika panoroinnissa p50 | 16,7 ms | **16,7 ms** |
| kehysaika panoroinnissa p95 | 17,3 ms | **17,2 ms** |
| panoroinnin longtaskit | 0 ms | **0 ms** |
| `paivitaMaastonimet` asettumisessa, mediaani | 0,8–1,1 ms | **1,6–1,8 ms** |
| sama, pahin | 1,5–2,0 ms | 2,2–3,4 ms |
| kylmä ladonta uudelle mittakaavalle | — | 2,0–2,4 ms (pahin 3,5–7,3) |
| SVG-solmuja uloimmassa näkymässä | 2026 | 2091 (+65) |

**Panorointi ei maksa mitään**, ja se on rakenteellista eikä onnea:
ladonta on funktio pelkästä mittakaavasta, joten panorointi ei laske
sitä uudelleen, ja kerrokseen syntyy vain näkyvät nimet (29, ei 345).
Vanha elävä nimikerros piti 261 lappua puussa aina — juuri siksi se
poistettiin v1366:ssa. Hinta on **alle millisekunti asettumista kohti**
ja kertaluonteinen 2–7 ms uudelle zoomportaalle.

Nämä ovat emulaattorilukuja. Raamattu vaatii kehysajan mittaamisen
oikealla iOS-laitteella; p95 17 ms on 60 kehystä sekunnissa, ja ennen
ja jälkeen ovat mittaustarkkuuden sisällä samat.

### Laattojen koko

Pilotti z0–z4, 395 laattaa, sama kone ja sama aineisto ennen ja jälkeen:

| taso | ennen | jälkeen |
| --- | --- | --- |
| z0 | 0,09 Mt | 0,09 Mt |
| z1 | 0,34 Mt | 0,33 Mt |
| z2 | 1,24 Mt | 1,23 Mt |
| z3 | 4,62 Mt | 4,58 Mt |
| z4 | 17,54 Mt | 17,48 Mt |
| **yhteensä** | **23,83 Mt** | **23,71 Mt** |

**Säästö on vain 0,5 %**, ja se kannattaa kertoa omistajalle
sellaisenaan: nimien poisto EI pienennä pyramidia. Syy on luvussa 6d jo
mitattu — valtaosa tavuista on paperin raetta, korkeataajuista kohinaa,
jota kuvanpakkaus ei voi pakata. Nimet ovat sen rinnalla ohutta
mustetta. Koko pyramidissa (1,32…1,48 Gt) tämä on noin 7 Mt.
Generointiaika ei muuttunut mitattavasti (251,5 s → 257,9 s, sama
kone kuormitettuna).

---

## 4. Mitä muutin tiedostoittain

| tiedosto | mitä |
| --- | --- |
| `js/karttanimet.js` | **uusi.** Ladonta ruutuavaruudessa, aineisto, kaksoisnimien paritus, välimuisti, piirto |
| `js/laattapyramidi.js` | `laatoissaOnNimet()`; luettelon saapuminen ajaa myös merkkiketjun |
| `js/ui.js` | nimikerros `drawBoard`iin, kutsu `paivitaMaastonimet`iin, mittakahva `__karttanimienMitat()` |
| `js/fokuskohteet.js` | kaksoisnimisäännön kolme vakiota tuodaan nyt `karttanimet.js`:stä eikä kopioida |
| `js/mapart.js` | `saumasiirto` viety (sama sauma, yksi toteutus) |
| `css/styles.css` | `.karttanimet` / `.karttanimi` / `.karttamerkki` |
| `sw.js`, `tools/build-standalone.mjs` | uusi moduuli listoille |
| `tools/fokuskartta/maailmapiirto.js` | mittajana pois, kehysviivat P:hen, nimiöt ja merkit pois |
| `tools/fokuskartta/sisalto.mjs` | kerää enää reitit ja joet |
| `tools/generoi-laattapyramidi.mjs` | `__ladonta` pois, luetteloon `nimiot: false` |
| `tools/savukkeet/savuke-laattapyramidi.mjs` | uusi P6-ryhmä |
| `tools/savukkeet/savuke-maailmanakyma.mjs` | 10a–10c ajan tasalle, uusi 10d |
| `docs/moduulit/laattapyramidi.md` | uusi luku 6g, luvut 4/6c/12 päivitetty |

## 5. Savukkeiden tila

| savuke | tulos |
| --- | --- |
| laattapyramidi (uudet laatat) | 10/13 |
| laattapyramidi (vanhat laatat) | 8/11 |
| maailmanakyma | **16/16** (main 15/15; uusi väite 10d) |
| panorointi | 11/11 |
| kartta-tila | 20/20 |
| kartan-sujuvuus | 40/40 |
| fokuskohteet | 96/96 |
| jalkamatka | 22/22 |

Laattapyramidin kolme kaatunutta väitettä (P3b, P4a, P4b) **eivät ole
regressio**: ne kaatuvat täsmälleen samalla tavalla vanhoilla
laatoilla, koska pilottikansiossani on z5 vain Balkanin alueelta.
Puuttuvat z5-laatat antavat 404:iä ja pitävät tason samana. Tuotannon
täysajossa nämä eivät kaadu. Kaikki uudet nimiväitteet (P6a–P6d)
menivät läpi molempiin suuntiin: nimettömien laattojen päällä peli
latoo, vanhojen päällä ei.

---

## 6. HAVAINTOJA — en korjannut, kirjaan sinulle

1. **Kohdenimiöt (`js/fokuskohteet.js`) ovat nyt selvästi pienempiä
   kuin paikannimet.** Kuvakaappauksessa "Ólympos" ja "Évros" ovat
   silminnähden pienempiä kuin "Balkanvuoret" samassa näkymässä. Ne
   ovat elävä kerros, joten korjaus on sama kuin tässä erässä: mitoita
   ne CSS-pikseleihin. Oma pieni eränsä.
2. **Kompassiruusun viivat ovat yhä `paksuus * S`** (0,75/0,8/1,5 * S).
   Ruusu piirretään vain tasoille z0–z2, joten sen kehäviivat ovat
   0,08…0,63 px eli käytännössä näkymättömiä juuri siellä missä ruusua
   katsotaan. Sama vikaluokka kuin kehysviivoilla, neljä riviä. Rajasin
   sen pois, koska sait rajaukseksi "kehysviivat".
3. **Jokien nimet ovat kadonneet vesistölinssistä pyramidilaudalla.**
   Tämä ei ole tämän erän aiheuttama: v1366 vaiensi `.maastonimi`-
   kerroksen kokonaan, ja jokien nimet asuivat siellä. Laatoissa niitä
   ei koskaan ollut, eikä uusi nimikerros lado niitä (laatoillakaan ei
   ladottu). Korjaus olisi pieni ja turvallinen: päästä vanha kerros
   latomaan pyramidilaudalla VAIN joet, kun linssi on päällä —
   kaksoisnimeä ei voi syntyä, koska kumpikaan muu kerros ei kirjoita
   joen nimeä. Odotan sanaasi.
4. **Uloszoomaus loppuu skaalaan 0,7993 myös maailmanäkymässä**
   mitatessani. En koskenut siihen (toinen agentti on kamerassa), mutta
   se tarkoittaa, että uloimmat laattatasot z0–z2 eivät käytännössä
   koskaan tule näkyviin pelissä — ja juuri niille arkin kalusteet
   (kartussi, painajanrivi, kompassi, merten nimet, nyt myös näkyvä
   kehys) on rajattu. Kun uloszoomaus löysenee, kalusteet tulevat
   esiin; kannattaa katsoa ne silloin silmällä kerran.
5. **Pyramidi on ajettava uudestaan**, jotta tämä erä näkyy pelaajalle
   (ks. LUE TÄMÄ ENSIN). En ajanut työnkulkua.

---

## 7. Miten todensin

- `node --test tests/*.test.mjs` → 1047 pass / 0 fail / 1 skipped
- `tarkista-kaksoisavaimet` ja `tarkista-niputus` puhtaat,
  `build-standalone` kääntyy, `dist` poistettu
- **kaksi pilottipyramidia** samoista lähteistä, toinen mainin koodilla
  ja toinen tämän haaran koodilla (z0–z4 koko maailma + z5 Balkanilta),
  ja peli ajettu molempia vasten
- **silmillä Chromiumissa** dpr 1, 2 ja 3: nimen korkeus mitattu
  `getBoundingClientRect`illä, kuvakaappaukset katsottu
- **silmillä laattakuvista**: z0 ennen/jälkeen (kehys ja mittajana),
  z3 ennen/jälkeen (nimet ja merkit poissa, joet ja reitit tallella)
