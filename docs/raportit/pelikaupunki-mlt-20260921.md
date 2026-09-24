# Viesti Fablelle: Maltan pelikaupunki Valletta valmis

21.9.2026, Sonnet-sisältösessio (dispatchattu Sisältökirjuri-session
kautta), haara `sisalto-pelikaupunki-mlt` (pohja origin/main). Versiota
ei nostettu, PR:ää ei avattu.

**Tulos: Valletta on Maltan pelikaupunki, `node --test tests/*.test.mjs`
3850/0 (13 skipped, ennallaan).** Kaikki reseptin
(`docs/raportit/viesti-fable-kaupunkiresepti-20260919.md`) 17 MINIMI-
kohtaa tehty, kohdekartta piirretty, kaupunkilehden kevyt kansisivu
kirjoitettu.

## 1. Mitatut koordinaatit ja etäisyydet

- Todellinen paikka: 35,8989° N, 14,5146° E (Valletta).
- `tools/vanha-maailma.mjs` `sovitaMaailma` palautti ajettuna
  **(6317,2, 1961,4)** — täsmälleen sama luku kuin tehtävänannossa, ja
  sama piste jota `js/packs/hahmotelma-mlt.js`:n Valletta-nosto jo
  käytti (6317,1/1961,4, ero pyöristyksessä).
- `europe.js`:n 1000×1000-kaava (x=(lon+11)×19,2, y=(72−lat)×26,3)
  antoi (489,88, 949,46), pyöristetty (490, 949).
- Lähin naapuri maailmankartalla: **Sisilia 93,4 yksikköä**, Tripoli
  121,3 — molemmat selvästi yli `minCityDistance`-rajan 60. Tarkistin
  KAIKKI 265 kaupungin etäisyydet ohjelmallisesti, ei vain näitä kahta.
- `isOnLand([6317.2, 1961.4], ...)` = false — Malta on saari (`islands`-
  taulukko), joten tämä on odotettu eikä vika.

## 2. Mitä lisättiin (reseptin 17 MINIMI-kohtaa)

| # | Tiedosto | Mitä |
| --: | --- | --- |
| 1–3 | `js/packs/europe.js` | `EU_CITIES`-rivi (id `valletta`, ambience `meri`, x/y 490/949) perustelukommentteineen; `EU_EDGES`: `sisilia–valletta` (2, sea); `counts.pieniAarre` 32→33, kommentti 48→49 kaupunkia |
| 4 | `js/packs/europe-countries.js` | `valletta: 'MLT'` |
| 5 | `js/packs/maailmankartta.js` | käsin-integrointi: kaupunkirivi (6317,2/1961,4), reitit `sisilia–valletta` ja `valletta–tripoli` (molemmat 2, sea, ei via-pisteitä — suorat reitit tarkistettu `isOnLand`-passilla), `CITY_COUNTRY`-rivi, `islands`-rivi, `counts.pieniAarre` 168→169 |
| 6 | `js/packs/europe-questions.js` | `EUROPE_QUESTIONS.valletta`: 3 kysymystä (ritarikunta 1566, Britannia 1873, Unesco 1980) |
| 7 | `js/packs/europe-questions.js` | `EUROPE_FACTS.valletta`: 3 tiesitkö-tietoa (mittakaava, Sciberras-niemi, isoisä-äänellä linnoitukset) |
| 8 | `js/packs/europe-valokuvat.js` | kuratoitu valokuva + lisäkuva (Commons, lisenssit tarkistettu extmetadata-rajapinnasta) |
| 9 | `js/packs/europe-artikkelit.js` | oma Lue lisää -artikkeli `Valletta` (en-Wikipedia Valletta / History of Malta / Great Siege of Malta, 1873-näkökulma) |
| 10–11 | `js/packs/fokusvirta-valletta.js` (uusi) + `js/packs/fokusvirrat.js` | kevyt fokusvirtapakki (matkakirja + Livian kupla), rekisteröity `KEVYET_FOKUSVIRRAT`-joukkoon |
| 12 | `sw.js`, `tools/build-standalone.mjs` | `fokusvirta-valletta.js`-rivi molempiin |
| 13 | `js/packs/radiot.js` | `MLT`: Calypso Radio 101.8 (ei valtion kanavaa löytynyt, ks. luku 5) |
| 14 | `js/packs/paikallisaarteet.js` | `MLT`-aarrepari (Maltan risti, Ħaġar Qim) |
| 15 | `js/kaupunkimusiikki.js` | `MLT: 'valimeri'` `ALUEEN_MAAT`-tauluun |
| 16 | `tests/pallonimet.test.mjs` | kovakoodattu kaupunkiluku 264→265 |
| 17 | nostoräikkä | ratkesi itsestään kohdekartan myötä (ks. luku 4) |

Lisäksi (Fablen erillinen tilaus A ja D):

- **A) Kaupunkilehden kevyt kansisivu** — `js/packs/kulttuuri-kategoriat.js`
  `valletta`: vain aihe `kaupunki` (2 kansikuvaa, matkailijalle-kuva ja
  -kappale), EI täyttä 6-aiheista lehteä. `arki`-täytenostoa ei lisätty
  (ei koettu tarpeelliseksi kevyellä kansisivulla).
- **D) Kohdekartta** — `js/packs/maakartat.js` `KAUPUNKIKARTAT.valletta`,
  piirretty `tools/piirra-kaupunkikartta.mjs valletta` (+ `--vari`),
  `numeroympyrat: true` (ei pienoismalleja, ks. luku 6). Kuusi kohdetta,
  ks. luku 3.
- **B) Maa numeroina** — ei vaatinut työtä, toimii automaattisesti
  `cityCountry`-taulun kautta (`MAA_KATEGORIAT.MLT` koskematon, oli jo
  täysi 5 aihetta / 20 nostoa).

Testikorjaukset (hardkoodatut luvut/nimetyt joukot muissa testeissä,
jotka kaatuivat uuden fokusvirtakaupungin myötä — sama ilmiö kuin
Bryssel/Ljubljana/Košice-erissä): `tests/liiku-nappi.test.mjs`
(KEVYET-lista), `tests/luentakuvakartta.test.mjs` (ILMAN_LUENTAKUVAA),
`tests/pollo-valmiskysymykset.test.mjs` (48→49, `pollo-kysymykset.js`
uusi `valletta.saapuminen`-rivi), `tests/pulu-tunteet.test.mjs`
(AANETTOMAT, 48→49), `tests/saapumispuhe-aineisto.test.mjs`
(ILMAN_SAAPUMISOTTOA), `tests/paikallisaarteet.test.mjs`
(KUVAA_ODOTTAVAT).

## 3. Kohdekartan kuusi kohdetta

Piirretty `tools/piirra-kaupunkikartta.mjs valletta` (Overpass, koko
niemi noin 1,1 × 1,2 km — Valletta on pieni, koko historiallinen ydin
mahtuu rajaukseen). `node tools/tarkista-karttapisteet.mjs valletta`:
kaikki 6 pistettä maalla, ei mittakaavajanan peittoa, ei numeroympyröiden
päällekkäisyyttä.

| Kohde | Koordinaatit | Sisältö |
| --- | --- | --- |
| Auberge de Castille | 35,8958/14,5114 | oma teksti (1744, Britannian armeijan päämaja 1800-luvulla) + kuva |
| Pyhän Johanneksen ko-katedraali | 35,8978/14,5128 | `wiki: "St John's Co-Cathedral"` |
| Suurmestarin palatsi | 35,8986/14,5142 | `wiki: 'Suurmestarin palatsi (Valletta)'` (fi-Wikipedia) |
| Yläbarrakan puutarhat | 35,8947/14,5122 | oma teksti (1661, avattu yleisölle 1824, tervehdyspatteri) + kuva |
| Piirityskello-muistomerkki | 35,8976/14,5183 | oma teksti — **huom: 1992, ei olemassa isoisän aikaan**, teksti selittää tämän suoraan (sama ratkaisu kuin Košicen Valtionteatterilla) |
| Pyhän Elmon linnake | 35,902/14,5188 | `wiki: 'Fort Saint Elmo'` |

Koordinaatit haettu en-Wikipedian `prop=coordinates`-rajapinnasta ja
Wikidatan P625-kentästä (Piirityskello, Auberge de Castille) 21.9.2026.

## 4. Nostoräikkä (reseptin kohta 17) — ratkesi itsestään

Malta on jo saanut 25 hahmotelmanostoa aiemmassa erässä
(`js/packs/hahmotelma-mlt.js`, jo rekisteröity `KOHDE_MAAT.MLT`:iin
ennen tätä haaraa). Mitattuna: **14–15 näistä olisi osunut
`KAUPUNGIN_KOHDALLA_SADEn` (7 yksikköä) sisään** Vallettan pisteestä —
paljon enemmän kuin Brysselin yksi (Tervuren). Syy on Maltan pieni koko:
koko saaristo on vain noin 13×9 laudan yksikköä.

Ratkaisu löytyi koodista eikä vaatinut nostojen siirtoa yksitellen:
KAIKILLA 25 hahmotelma-mlt-nostolla on jo `lahi: true` (aiempi agentti
merkitsi ne lähizoomiin, koska ne ovat 0,5–2 yksikön päässä toisistaan).
`js/fokuskohteet.js` `kaupunginKohdallaSyy`: jos kohdekartta EI ole
olemassa, syy on `'kohdekarttaa ei ole'` (laskettaisiin räikkään); heti
kun kohdekartta luotiin (luku 3), `kartta`-tarkistus läpäisee ja koodi
palauttaa `'lähizoomi'` ennen muita tarkistuksia — ja `'lähizoomi'` on
nimenomaisesti rajattu pois `muutKuinHetket`-laskurista
(`tests/nostot-kartalla.test.mjs`). Räikkä (katto 50) ei siis noussut
lainkaan; `node tools/tarkista-nostopaikat.mjs` näyttää kaikki 25 MLT-
nostoa tilassa "pääkartta".

**Huomio Fablelle:** tämä sama tarkistus kannattaa ajaa Kyprokselle ja
Luxemburgille ennen niiden kaupunkeja — jos niidenkin hahmotelmanostot
ovat valmiiksi `lahi: true`, sama itsestään-ratkeaminen pätee.

## 5. Avoimet kysymykset / velat

1. **Radiolähetys ei ole valtion kanava.** PBS:n (Public Broadcasting
   Services, Radio Malta / Radju Malta) suoratoisto-osoitetta ei
   löytynyt Radio Browserista eikä sen omalta sivustolta ilman
   selaimen JS-soitinta (osoite haetaan dynaamisesti tvmi.mt:n kautta).
   Käytin sen sijaan Calypso Radio 101.8:aa (calypsomalta.com, HTTP 200,
   audio/aac, CORS `*`, tarkistettu hakemalla). Jos joku löytää PBS:n
   suoran mp3/aac-osoitteen, `MLT`-rivi kannattaa vaihtaa.
2. **`arki`-täytenostoa ei kirjoitettu** kaupunkilehden kevyelle
   kansisivulle — tehtävänanto salli tämän ("tarvittaessa"), enkä
   nähnyt tarvetta yhden aiheen kansisivulla.
3. **Kohdekartan kuusi kohdetta**: kolmella on oma kirjoitettu teksti
   (Auberge de Castille, Yläbarrakan puutarhat, Piirityskello), kolmella
   `wiki`-linkki (Pyhän Johanneksen ko-katedraali, Suurmestarin palatsi,
   Pyhän Elmon linnake) — sama suhde kuin Košicella (yksi kuudesta
   wiki-linkki, loput omaa tekstiä; tässä käänsin suhteen toisin päin
   tasapainottaakseni kirjoitustyötä, koska kolmella kohteella on hyvä
   en-Wikipedia-artikkeli valmiina).
4. **Kuvia ei ole viety ämpäriin** — kaikki tässä erässä käytetyt kuvat
   (fokusvirta + kohdekartta + kaupunkilehti) ovat Commons-tiedosto-
   viittauksia (`tiedosto`-kenttä), eivät paikallisia tiedostoja, joten
   ämpäriin ei ole mitään vietävää tästä erästä.
5. **Malta-Tripoli ja Malta-Sisilia -reitit ovat suoria** (ei via-
   pisteitä). Tarkistin `isOnLand`-passilla jokaisen pisteen 2 %:n
   välein koko reitiltä: Tripoli-reitti on kokonaan puhdas, Sisilia-
   reitin maakosketukset (lähellä Sisilian rantaa) ovat kaikki alle 55
   yksikön päässä jommastakummasta kaupungista (`HARBOUR`-poikkeus,
   sama kuin Rooma–Sisilia ja Ateena–Kreeta -reiteillä).

## 6. PIENOISMALLITILAUS (Codexille — en piirtänyt näitä itse)

Kohdekartan kuusi kohdetta seepiamusteluonnoksiksi, sama tyyli kuin
muut Codex-tilaukset: yksivärinen seepiamusteluonnos, ei tekstiä,
tapahtuma/kohde esineenä tai hetkenä — ei muotokuvana.

1. **Auberge de Castille** — koristeellinen barokkijulkisivu: pylväät,
   aseeenkuvat ja koristeveistokset yhden julkisivun otteena.
2. **Pyhän Johanneksen ko-katedraali** — kahden kellotornin välinen
   koruton hiekkakivijulkisivu (ei sisätilaa, vain ulkoarkkitehtuuri).
3. **Suurmestarin palatsi** — sisäpihan arkadikäytävä tai palatsin
   pääporttia vartioivat tykit pihalla.
4. **Yläbarrakan puutarhat** — kaariholvillinen pergola/galleria
   puutarhassa, tykki tervehdyspatterilla etualalla.
5. **Piirityskello-muistomerkki** — pyöreä pylväikkö ja sen keskellä
   riippuva pronssikello (huom: 1900-luvun kohde, ei 1873).
6. **Pyhän Elmon linnake** — tähdenmuotoisen linnoituksen muuri ja
   kaivanto ylhäältä tai sivulta, ei ihmishahmoja.

## 7. Testitulos

`node --test tests/*.test.mjs`: **3850 tests, 3837 pass, 0 fail, 13
skipped** (skipped-määrä ennallaan — ei liity tähän erään).
`node tools/tarkista-kaksoisavaimet.mjs`: ei kaksoisavaimia.
`node tools/tarkista-karttapisteet.mjs valletta`: kaikki 6 pistettä ok.
`node tools/tarkista-nostopaikat.mjs`: kaikki 25 MLT-nostoa pääkartalla,
ei uusia rivejä "ILMAN PAIKKAA" -listalla.

Haara `sisalto-pelikaupunki-mlt`, pushattu origin/main-kärjestä. Ei
PR:ää (Julkaisija-rooli hoitaa mergen).
