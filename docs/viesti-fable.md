# Viesti Fablelle — purun jäänteet korjattu (haara claude/purun-jaanteet)

*(Opus, 30.8.2026. Haara tuoreesta origin/mainista **ebad659b = v1365**.
Versiota EI nostettu, PR:ää EI tehty — sinä julkaiset. dist/ ei ole
mukana. tools/fokuskartta/-piirtokoodiin ja laattojen generointiin ei
koskettu.)*

## Lyhyesti

Kaikki viisi omistajan havaintoa korjattu ja **todennettu silmillä
Chromiumissa oikeilla R2-laatoilla** (390×844, dpr 3, iPhone-profiili) —
ei pelkillä testeillä. Juurisyy oli se, jonka annoit: `body.fokuspohja`
-luokan asettaja katosi purussa, ja luokkaan ripustettu käyttäytyminen
lakkasi vaikuttamasta. Kävin **jokaisen** `fokuspohja`-viittauksen
(js/ ja css/) läpi ja ratkaisin sen erikseen; taulukko luvussa 7.

Portit: `node --test tests/*.test.mjs` → **1047 pass / 0 fail**
(1 skipped), kaksoisavaimet ja niputus puhtaat, `build-standalone`
kääntyy (20 333 kt), `dist` poistettu. Karttasavukkeet luvussa 6 —
kolme niistä on nyt vihreämpänä kuin mainissa.

**Kaksi asiaa haluan sinun katsovan ennen julkaisua** (luku 8):
panorointirajojen paluu lukitsee kameran maahan, ja maastonimien
Wikipedia-nappi katosi kaksoisnimikorjauksen mukana.

---

## 1. Vanha maakyltti poistettu (havainto 1)

Kyltti (`.maa-pilleri`, "BULGARIA" + lippu) palasi oikeaan yläkulmaan,
koska sen piilotus oli `body.fokuspohja .maa-pilleri { display: none }`.

**Koodi pois, ei piilotusta.** `drawCountryBorders` ei enää kutsu
`paivitaMaaPilleri`ä, joten pelinäkymässä kylttiä ei ole DOM:ssa
lainkaan (mitattu: `.maa-pilleri` 0 kpl). CSS-säännöt poistettu:
`body.fokuspohja .maa-pilleri` ja `body.kartalento .maa-pilleri`.

**Yksi käyttö jäi, enkä poistanut sitä: MAASELAIN.** `js/vertailu.js`
maatiedot-tila näyttää kartalta valitun maan nimen ja lipun kyltissä, ja
kyltin napautus avaa maan lehden. Se on **omistajan oma tilaus
14.8.2026** (*"oikealla saisi näkyä sama maakyltti kuin
normaalitilassa"*), eikä Raamatun 24.8. linjaus koske sitä — linjaus
puhuu kartan oikeasta yläkulmasta fokusnäkymässä, jossa kartuutsi kertoo
maan nimen. Kyltti syntyy siis vain maaselaimen ajaksi ja katoaa tilan
sulkeutuessa (`palautaPilleriPelaajalle` piilottaa sen nyt sen sijaan
että palauttaisi pelaajan maan). Savuke-maaselain 6/6, savuke-maapilleri
3/3.

Jos haluat kyltin pois myös maaselaimesta, se on oma pieni eränsä:
selattu maa pitäisi silloin näyttää kartuutsissa.

## 2. Punainen viiva-animaatio poistettu (havainto 2)

Poistettu kokonaan, ei piilotettuna:

- `js/ui.js`: `.country-korostus`-polkujen piirto, `animoiMaanAariviiva`
  (~110 riviä), vakiot `AARIVIIVAN_PIIRTO_MS` ja
  `AARIVIIVAN_ASETTUMIS_MS`, `aariviivaAjastin`, `viimeMaa`
- `css/styles.css`: `.country-korostus`, `@keyframes
  maa-aariviivan-asettuminen`, `.country-borders.maa-asettuu …` ja sen
  liikeherkkyysvariantti, `body.fokuspohja`-piilotus,
  `body.kartalento .country-korostus`

**Perustelu on kirjattu koodiin rakenteellisena eikä makuasiana:** viiva
piirretään laudan karkeasta 50m-rannikosta, kun laattaan poltettu ranta
on tarkkaa 10m-aineistoa. Viiva osui eri kohtaan kuin ranta, jonka se
muka rajaa — ja pyramidissa laatta on aina alla, joten ero näkyy aina.

### `.country-tint` JÄI — ja tässä syy

Sävytys (`rgba(90,70,40,0.13)`, ei viivaa) on samasta kerroksesta,
mutta jätin sen. Kolme syytä:

1. **Omistaja moitti viivaa, ei sävytystä.** Sanatarkasti *"maan
   ympärille piirtyy vanha punainen viiva-animaatio"*.
2. **Tarkkuusero ei näy siinä.** Sävytyksellä ei ole reunaviivaa, joten
   50m/10m-ero on pehmeä sävyraja eikä väärässä paikassa oleva viiva.
   Katsoin Kreikan saariston lähikuvasta: rannikolle ei jää haloa.
3. **Se on kartan ainoa merkki siitä, minkä maan rajojen sisällä
   matkaaja on** — nyt kun maakyltti on poissa. Kartuutsi kertoo maan
   nimen, mutta ei sitä missä maa on.

Jos haluat sävytyksenkin pois, se on yksi rivi
(`drawCountryBorders`in `el('path', …, 'country-tint')`) — sano vain.

## 3. Kaupunkien pisteet lukittu karttaan (havainto 3)

Tämä ja havainto 4 osoittautuivat **samaksi vialaksi**. Merkkien
mittakaava lasketaan `fokusMerkkiSkaala`ssa maan ikkunasta; ilman
ikkunaa se putoaa varapolulle `1 / skaala`, joka on nimenomaan
ruutuavaruus. Kun ikkuna palasi (luku 4), merkit palasivat kartan
mittakaavaan ilman muuta koodia.

**Mitattu Ateenassa, sama ajo, kaksi zoomtasoa** (390×844, oikeat
laatat):

| mitta | maan ikkuna (z5) | lähikuva (z7) | suhde |
| --- | --- | --- | --- |
| näkymän mittakaava | 0,7993 | 2,4933 | **×3,119** |
| Ateenan kaupunkipiste | 7,72 px | 24,08 px | **×3,119** |
| kohdemerkki kartalla | 51,53 px | 160,51 px | **×3,115** |

Ennen korjausta sama mittaus Sofiassa antoi eläintäylle ja
kohdemerkeille **61–65 px riippumatta zoomista** (skaala 0,42 → 3,74).

**Mitä päätin kunkin elävän merkin kohdalla:**

| merkki | ennen | nyt | miksi |
| --- | --- | --- | --- |
| kaupunkipiste (muut kaupungit) | laudan yksiköitä | ennallaan | oli jo kartan mitassa |
| nykyisen kaupungin laatta | ruutuvakio | **kartan mitta** | `paivitaFokusLaatta` sai ikkunan |
| kaupunkien nimilaput | ruutuvakio | **poistettu** | nimi on laatassa, ks. luku 5 |
| pelinappula | ruutuvakio | **kartan mitta** | ×3,119 mitattu |
| kohdemerkit (valittavat) | ruutuvakio | **kartan mitta** | `paivitaFokusKohdeMitat` |
| kartan kohteet + eläintäyt | ruutuvakio | **kartan mitta** | ×3,115 mitattu |
| kohtaamispiste | ruutuvakio | **kartan mitta** | sama kerroin |
| kartuutsi, mittajana, maataulu, viivaimet | ruutuun ankkuroitu HTML | **ennallaan ruudussa** | ne ovat kartan KEHYS eivät kartan päällä olevaa; kuuluvat pysyä nurkassa |

Viimeinen rivi on tietoinen poikkeus: kartuutsi ei ole kartalla vaan
kartan kehyksellä, ja jos se skaalautuisi, se karkaisi ruudulta.

## 4. Panorointirajat ja kartuutsi takaisin (havainto 4)

Toteutin edellisen agentin ehdotuksen: **`ui.fokusPohjaBbox` /
`-Rajaus` syötetään suoraan `FOKUS_POHJAT`-taulusta** — ei kuvaa, ei
latausta, ei odotusta. Uusi metodi `paivitaMaanIkkuna()` ajetaan joka
piirrossa (`paivitaFokusKerros`); `paivitaFokusPohja` palaa heti, jos
maa ei vaihtunut. Samalla asetetaan `ui.fokuskarttaAvain` (ISO), jota
`js/fokusmitat.js` vaatii — se oli jäänyt asettamatta, joten pelkkä
bbox ei olisi riittänyt kartuutsille.

Kuluttajat yksitellen, ohjeesi mukaan:

| kuluttaja | päätös | todennus |
| --- | --- | --- |
| panorointirajat maan ympärille (js/kartta.js `fokusRajaukset`) | **PÄÄLLE** | `{ikkuna:{x:6399,y:1726,w:468,h:292}, kuva:{…w:608,h:380}}` Kreikassa |
| kartuutsi + mittajana + maataulu (js/fokusmitat.js) | **PÄÄLLE** | kartuutsi vasen 19 px, ylä 774/844 → **vasen alareuna** ✓; maataulu vasen 19, ylä 590, korkeus 179 → nousee kartuutsin takaa ✓ |
| kartan klikattavat kohteet, kohtaamispiste, eläintäyt, selitevalikon laskurit (js/fokuskohteet.js:442) | **PÄÄLLE** | 50 kohdetta Bulgariassa, 84 Kreikassa; napautus avaa kortin (todennettu: *Maratonin salamatkustaja 1896* minivisoineen) |
| `paivitaFokusPallot`in pelimerkkien piilotus | **POIS** | `.fokus-lehden-alla` ei kirjoiteta kenellekään; CSS-sääntö poistettu |
| sumuverho | **POIS** | oli jo lakkautettu (`fokusSumuPaalla()` palauttaa false); en herättänyt sitä |

**Kaksi tilaa, joissa ikkunaa EI anneta** (lisäsin nämä, koska ne
osoittautuivat tarpeellisiksi):

- **Lähtökaupungin valinta.** Matkaaja ei ole missään maassa, ja
  ikkuna olisi rajannut panoroinnin Iso-Britanniaan — puolet
  valittavista kaupungeista olisi jäänyt ulottumattomiin. Sama raja kuin
  kohdemerkeillä (`fokusKohdeMerkit`) ja selitevalikolla.
- **Aloituslento.** Peli siirtää matkaajan perille jo lennon alussa,
  joten kohdemaan kartuutsi paljastaisi määränpään ennen kuin kone on
  siellä — sama syy, jolla lennon ajaksi häivytetään maan sävytys.

**Taulussa on vain Eurooppa (39 maata).** Muissa maanosissa maan ikkunaa
ei ole, ja kaikki neljä yllä olevaa jäävät pois täsmälleen kuten
v1362:ssa. Se ei ole tämän korjauksen rajaus vaan taulun kattavuus.
Harkitsin ikkunan johtamista `map.countryShapes`in laatikosta (kattaisi
koko maailman), mutta **hylkäsin sen**: merkkien peruskoko on
`min(ruutu/ikkuna)`, joten Venäjän kokoinen ikkuna paisuttaisi merkit
lähikuvassa ruudun kokoisiksi. Se vaatisi oman mitoitussääntönsä eikä
kuulu tähän erään.

## 5. Kaksoisnimet: paikannimi kuuluu laattaan (lisätehtäväsi)

Omistajan Sofia-kaappaus oli oikeassa, ja vika oli laajempi kuin
kaupunginnimet — sama toistui maastonimillä ja kohdemerkeillä.
Ratkaisin sen **yhtenä yleisenä sääntönä kolmessa kerroksessa**, en
nimilistalla.

**Sääntö:** laudalla, jonka arkki on pyramidissa (`pyramidiKattaa`),
elävä kerros ei latoa yhtään paikannimeä. Kaikki pysyvät nimet on
poltettu laattoihin omalla typografiallaan ja omalla
törmäyksenvältelyllään (luku 6c).

| kerros | ennen | nyt |
| --- | --- | --- |
| `.cities .city-label` (261 kaupunkia) | ladottiin joka laudalle | **ei ladota** pyramidilaudalla (drawBoard) |
| `.maastonimi` (vuoret, järvet, joet) | ladottiin ja piilotettiin | **ei ladota** pyramidilaudalla (paivitaMaastonimet) |
| kohteen nimiö (js/fokuskohteet.js) | väisti vain poltettua KAUPUNGINnimeä | **väistää myös samannimistä poltettua MAASTONIMEÄ** |

**Kumpi jää ja miksi — perusteltu koodiin.** Poltettu nimi on
kartografiaa: oikea kirjasin, oikea mittakaava, törmäyksenvältely tehty
kerran koko arkille, eikä se maksa kehysaikaa. Elävä nimi on pelin
tilaa, eikä paikannimi ole pelin tilaa — se on sama eilen ja huomenna.
Näkemyksesi oli siis oikea, ja se on nyt koodin perustelu.

**Kolmas kerros on sinun havaintosi vuorista.** `Balkanvuoret` oli
kartalla kahdesti: kerran laatassa ja kerran kohdemerkin nimiönä.
Toteutin sen samalla säännöllä kuin laatat itse
(`tools/fokuskartta/sisalto.mjs` `parita`, luku 6c.1): **sama
normalisoitu nimi lähempänä kuin 400 lautayksikköä = sama kohde**.
Samat vakiot samasta mittauksesta, ja normalisointi on identtinen
(NFD, tarkkeet ja välimerkit pois). **Merkki jää, vain nimiö väistyy** —
kolmio kertoo mistä on kyse ja on yhä napautettava. Todennettu
silmillä: `Balkanvuoret`-nimiö katosi kohdemerkiltä, kolmio jäi, ja
laatan oma nimi näkyy.

**Mikään pelimekaniikka ei riipu elävästä kaupunginnimestä.** Kävin
läpi: valittavan matkakohteen nimi on `.target-nimi` (drawTargets,
kohdekerros, JÄÄ), kohteiden nimiöt ovat js/fokuskohteet.js (JÄÄVÄT),
maaselaimen nimi on kyltissä, ja lähtökaupungin valinta lukee nimet
laatoista — todensin sen silmillä (kuva
`todistus/`-sarjan ulkopuolella, luku 9): maailmakuvassa lukevat
Lontoo, Berliini, Moskova, Madrid, Rooma, Istanbul, Ateena, Kairo,
Dakar, Lagos, Nairobi, Rio de Janeiro… ja lähtökaupungeilla on omat
kultarenkaansa.

**Yksi asia menetettiin, ja se on päätöskysymys 2 luvussa 8:**
maastonimen i-ikoni avasi Wikipedia-ikkunan.

**HUOM (kirjaan sen vaikka et pyytänyt korjaamaan):** poltetut nimet ja
rantaviivat ovat omistajan laitteella jättimäisiä, koska laatat on ajettu
ennen v1364:ää. Tämä erä **kasvattaa** sen näkyvyyttä: nyt ne ovat kartan
ainoat nimet. Suositukseni on siis ajaa pyramidi uudelleen ennen tämän
julkaisua tai heti sen perään.

## 6. Savukkeet

Ajoin kaikki karttasavukkeet oikeilla tai pilottilaatoilla.

| savuke | ennen (main) | nyt | muutos |
| --- | --- | --- | --- |
| savuke-maailmanakyma | 10/14 | **15/15** | 10a/10b mittasivat elävien nimien zoomporttia → nyt vartioivat että elävää nimeä EI ole; uusi 10c maastonimille; 0b:n raja 400→250 |
| savuke-kartan-sujuvuus | 47/49 | **40/40** | kymmenen ääriviiva-animaation väitettä tilalle yksi käänteinen vartio: sävytys on, punaista viivaa ei |
| savuke-panorointi | 10/11 | **11/11** | 6a vaati `.fokus-piiri`ä, joka poistui v1363/v1365:ssä |
| savuke-selitevalikko | 30/31 | **32/32** | vartio 3 mittasi *"luku kasvaa kamera-ajossa"*; nyt luku seuraa MAATA, ks. alla |
| savuke-jalkamatka | 21/22 | **22/22** | 7c vaati elävää nimilappua; nyt vaatii ettei sitä ole |
| savuke-laattapyramidi | 9/9 | **9/9** | ennallaan (z7, 18 laattaa, 0 epäonnistunutta, p95 17,5 ms) |
| savuke-kartta-tila | 20/20 | **20/20** | ennallaan |
| savuke-fokuskohteet | — | **96/96** | ennallaan |
| savuke-maastokohteet | — | **8/8** | ennallaan |
| savuke-elaintaky | — | **23/23** | ennallaan |
| savuke-takyportti | — | **22/22** | ennallaan |
| savuke-maapilleri | — | **3/3** | ennallaan |
| savuke-maaselain | — | **6/6** | ennallaan |
| savuke-mannerlento | — | **11/11** | ennallaan |
| savuke-karttazoom | 30 ok / 5 EI | **sama 5 EI** | main-peräinen, koskee Matkasanomien kaupunkikarttaa |

**Miksi savuke-selitevalikon vartio 3 muuttui.** Se mittasi, että maan
omat kohteet ILMESTYVÄT kartalle vasta kun kamera ajaa maalehdelle —
mutta se odotus oli lehden KUVAN latautumista. Pyramidissa maan ikkuna
tiedetään heti, joten kohteet ovat kartalla ennen kamera-ajoa. Raamattu
sanoo luvusta juuri näin: *"montako sen aiheen kohdetta nykyisen näkymän
MAASSA on"*. Vartio mittaa nyt sen: kohteet ovat kartalla ennen ajoa
eikä ajo kadota yhtäkään aihetta.

## 7. Jokainen `fokuspohja`-viittaus, ratkaisu erikseen

| paikka | ratkaisu |
| --- | --- |
| js/ui.js `paivitaFokusPohja` (luokan asetus) | **jää** — luokka on nyt aina voimassa Euroopassa, ja neljä CSS-sääntöä nojaa siihen oikein |
| css `body.fokuspohja[data-mode] .turn-card` + `.toimintorivi*` (4 sääntöä) | **jäävät** — ne ratkaisevat mitä kartuutsin ja mittajanan naapuruus vaatii, eli ovat oikein sidottuja juuri siihen tilaan jossa kartuutsi on ruudulla |
| css `body.fokuspohja .maa-pilleri` | **poistettu** — kylttiä ei enää luoda |
| css `body.fokuspohja .country-tint/-korostus` | **poistettu** — korostusta ei enää piirretä, sävytys saa näkyä |
| css `body.fokuspohja .cities .city-label` (2 sääntöä) | **poistettu** — elävää nimilappua ei ole |
| js/ui.js `paivitaFokusNimilaput` (~150 riviä) | **poistettu** kuolleena, samoin vakiot `FOKUS_NIMI_PX`, `FOKUS_NIMI_VAHIN_PX`, `FOKUS_NIMI_NAPPULAN_ALLE_PX` |
| js/ui.js `himmennaMaastonimet` `maastonimi-kuvan-alla` | **poistettu** — kerros on pyramidilaudalla tyhjä |
| css `.maastonimi-kuvan-alla`, `.fokus-lehden-alla` | **poistettu** — kumpaakaan luokkaa ei kirjoiteta |
| js/fokusmitat.js kommentti maakyltin väistöstä | **päivitetty** |
| js/ui.js kommentti esilatauksesta (`fokuskartta.esilammitaFokuspohja`) | **päivitetty** — moduulia ei ole |
| js/packs/fokus-grc.js, tests/fokuspohjat.test.mjs | **koskematta** — data ja sen testi |

## 8. PÄÄTÖSKYSYMYKSET

### 1. Panorointirajat lukitsevat kameran maahan — onko se ok?

Rajat toimivat nyt kuten Raamattu vaatii (*"maatila rajaa panoroinnin
maan ympärille"*), ja **se on mitattavissa**: pyysin kameraa 900
lautayksikön ikkunaan Bulgariassa ja se pysyi 284 yksikön maan
ikkunassa.

Seuraus, jonka haluan sinun näkevän: **pelaaja ei enää voi loitontaa
maailmakuvaan ollessaan maassa.** Ainoa löysennys on
`panorointiVapaa`, joka vaatii kehittäjätilan + maailmanapin. Matkavalinta
laajentaa rajat kohteisiin (`matkakohteidenAlue`), joten umpikujaa ei
synny — mutta *"haluan katsoa missä päin maailmaa olen"* ei onnistu.

Omistaja on pelannut v1363–v1365 ilman rajoja, joten tämä tuntuu
laitteella **uudelta rajoitukselta** vaikka se on paluu speksiin.
Vaihtoehdot: (a) jätetään kuten Raamattu sanoo, (b) uloszoomauksen raja
löysennetään esim. kolminkertaiseen maan ikkunaan, (c) maailmanapista
tehdään pelaajan nappi. En tehnyt mitään näistä omin päin.

### 2. Maastonimen Wikipedia-nappi katosi

`.maastonimi`-ryhmässä oli i-ikoni, joka avasi Wikipedia-ikkunan
(`avaaMaastonimi`). Kun elävä kerros vaikeni, ele katosi: laattaan
poltettuun nimeen ei voi tarttua. Alppeja, Karpaatteja, Apenniineja ja
123 jokea ei siis enää voi napauttaa.

Luonteva jatko on nostaa maastokohteet `js/fokuskohteet.js`:n
merkkikerrokseen, jossa on jo symboli, napautusala, aihevalo ja
poltettujen nimien väistö — silloin kolmio on napautettava eikä nimeä
tarvitse piirtää kahdesti. Se on oma eränsä ja vaatii aineiston
(`MAAILMANKARTAN_NIMET` → kohdemuoto), joten en tehnyt sitä tässä.

### 3. Nimetyt erikoispiirit (edellisen agentin kysymys 2)

Päiväntasaaja, kääntöpiirit, napapiiri ja Greenwich ovat yhä poissa
(`.fokus-piiri`). Jouduin poistamaan niitä vartioineen väitteen
savuke-panoroinnista. Kysymys on yhä auki: pelitilakerroksena vai
laattoihin poltettuna?

### 4. Saapumisen kamera-ajo maan ikkunaan (edellisen agentin kysymys 3)

**En palauttanut sitä.** Maan ikkuna on nyt olemassa, joten ajo olisi
teknisesti helppo — mutta se on ominaisuuden palautus eikä jäänteen
korjaus, eikä se ollut listallasi. Kamera osuu maan ikkunaan nyt
epäsuorasti: uloszoomauksen raja ON maan ikkuna, joten saapumisen
jälkeen kartta ei voi jäädä maata laajempaan näkymään.

---

## 9. Miten todensin — silmillä, ei vain testeillä

Ajoin pelin Chromiumissa (`/opt/pw-browsers/chromium`, 390×844, dpr 3)
**oikeilla tuotannon laatoilla**: laatat haettiin R2:sta Noden fetchillä
(proxy) ja tarjoiltiin selaimelle levyvälimuistista, joten kuva on sama
kuin omistajan laitteella. Peli istutettiin pelitallenteella suoraan
Ateenaan ja Sofiaan (sama tapa kuin savukkeissa).

**Ennen–jälkeen samassa tilanteessa (Sofia, maan ikkuna):**

| havainto | ennen | jälkeen |
| --- | --- | --- |
| maakyltti oikeassa yläkulmassa | "BULGARIA" + lippu | 0 kpl DOM:ssa |
| punainen viiva maan ympärillä | 1 polku, näkyvä | 0 polkua |
| eläviä kaupunginnimiä | 19 näkyvissä (Sofia, Bukarest, Ateena…) | 0 |
| eläviä maastonimiä | 2 (Karpaatit, Apenniinit) — kumpikin laatassa myös | 0 |
| kartuutsi | 0×0 px (piilossa) | vasen 19 px, ylä 774 px |
| kartan kohteet | 0 | 50 |
| panorointirajat | null | ikkuna 284×169, kuva 369×231 |

**Kuvakaappaukset** (`/tmp/claude-0/.../scratchpad/opus-jaanteet/`):

- `ennen-sofia/a-maa.png` — omistajan havainnot toistettuina: BULGARIA-kyltti, punainen viiva, tuplat *Karpaatit*
- `todistus/a-maan-ikkuna.png` — (a) ei kylttiä, (b) ei viivaa, (d) kartuutsi vasemmassa alareunassa
- `todistus/b-lahikuva.png` — (c) sama näkymä lähempää: pisteet ja merkit kasvaneet kartan mukana ×3,12
- `todistus/c-maataulu.png` — maataulu auki vasemmasta alareunasta (VÄKILUKU, PINTA-ALA, DEMOKRATIA, KESKITULO, KIELET)
- `tarkistus/kohde-kortti.png` — (e) kohde napautettavissa: *Maratonin salamatkustaja 1896* minivisoineen
- `kulku/p1-pickstart.png` — lähtökaupungin valinta: laattojen nimet luettavina, ei kartuutsia, ei kylttiä
- `jalkeen2/c-zoom-B.png` — *Balkanvuoret* enää kerran (kolmio jäi, nimiö väistyi)
- `katselu/africa.png` — katselutilan manterelauta ennallaan nimineen

**Katselutila todennettu erikseen:** `?lauta=africa` piirtää oman
karttansa, 41 kaupunginnimeä, 0 laattaa, ei kylttiä eikä ääriviivaa.
`?lauta=maailmankartta` katselussa: 6 laattaa, 0 elävää nimeä.

---

## 10. Palautuspiste

Palautuspiste on **ebad659b** (main ennen tämän haaran ensimmäistä
committia). Yksittäinen tiedosto palautetaan näin:

    git checkout ebad659b -- js/ui.js

Committeja on kolme, ja ne ovat aihepiireittäin erillisiä: (1) itse
korjaus js/- ja css/-puolella, (2) savukkeiden vartiot uuteen sääntöön,
(3) viimeistelyt ja tämä raportti. Mitään ei ole poistettu levyltä —
`FOKUS_POHJAT`, `FOKUS_LISANIMET`, `tools/patina.mjs` ja R2:n vanhat
lehdet ovat koskemattomia.
