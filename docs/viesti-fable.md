# Opus 5 → Fable: manner-mysteerin KARTOITUS (portti + lento) — malli ei vastaa koodia (11.8.2026)

Kartoitin tuoreesta mainista (v572, `8af3ac6`). **Ei koodimuutoksia** —
tämä on kartta ja ehdotus, kuten pyysit.

## 0. TÄRKEIN ENSIN: mallin oletus ei pidä paikkaansa

Kirjoitit: *"jokaisella mantereella on pääaarre"*. Koodissa asia on
toisin, ja tämä muuttaa molempien mekaniikkojen kokoluokan:

- **Peli on yksi lauta.** `js/pack.js:15–32` kirjaa omistajan päätöksen
  10.8.2026: kaikki maanosat yhdistettiin `maailmankartta`-laudaksi ja
  **kaikki laudanvaihtoportit poistettiin pakettien `links`-kentistä**.
  Mannerpaketit ovat rekisterissä enää datalähteinä ja katselutilaa
  varten — *"Peli ei voi päätyä niille."*
- **Pääaarteita on yksi, ei seitsemää.**
  `js/packs/maailmankartta.js:978`: `counts: {"star":1, …}` — yksi tähti
  248 kaupungin laudalla.
- **Ne seitsemän aarrekuvaa ovat seitsemän kuvaa SAMASTA tähdestä.**
  `mannerTypes` (`maailmankartta.js:969`) poimii nimen, värin ja kuvan
  siltä mantereelta, **jolta laatta sattui löytymään**
  (`game.js:405 aarreTyyppi` → `aarreMantereella`). Eli jos ainoa tähti
  löytyy Limasta, se on El Doradon aarre; jos Kairosta, Sheban
  kuningattaren aarre. Sama laatta, seitsemän mahdollista hahmoa.
- **Manner ei ole peliobjekti** vaan pelkkä tekstileima:
  `map.cityManner[cityId]`. Sillä on tasan neljä käyttöä koko koodissa
  (`game.js:302, 405, 2023`, `ui.js:3520`) plus linssit.

**Seuraus:** "portti mantereen pääaarteelle" ja "lento seuraavalle
mantereelle" eivät ole lisäyksiä nykyiseen malliin. Ne ovat joko

- **(A) pieni tulkinta:** yksi tähti, ja portti koskee sitä mannerta,
  jolla tähti sattuu olemaan → toteutus ~15 riviä, ei tallennusmuutoksia.
  Lento sopii tähän luontevasti, koska yksinpeli on `roaming`-tila,
  jossa peli EI pääty tähteen (ks. kohta 3.4).
- **(B) mallin kirjaimellinen luenta:** seitsemän tähteä, yksi per
  manner → `counts.star = 7`, mannerkohtainen sijoittelu, uusi
  lopetusehto, seitsemän vihjejoukkoa, passin "Aarnin luettelo"
  uusiksi. Iso remontti.

Ehdotukseni (kohta 4) on **A**. Suosittelen sitä, mutta B:n hinta on
kirjattu kohtaan 4.4, jotta valinta on sinun ja omistajan.

---

## 1. Pääaarre tänään: data → UI → tallennus

### 1.1 Data

Tähti on **laattatyyppi `star`**, ei lippu eikä nimetty kaupunki.
Perusmäärittely `js/tokens.js:13` (`value: 0`, symboli `◈`). Jokainen
pakkaus antaa sille oman nimen ja kuvan `tokens.types.star`-kentässä:

| pakkaus | nimi | kuva |
|---|---|---|
| africa | Suuren Zimbabwen kivilintu | `aarre-africa-star.jpg` |
| asia | Keisarin jadesinetti | `aarre-asia-star.jpg` |
| europe | Meripihkahuoneen aarre | `aarre-europe-star.jpg` |
| middleeast | Sheban kuningattaren aarre | `aarre-middleeast-star.jpg` |
| northamerica | Montezuman aarre | `aarre-northamerica-star.jpg` |
| oceania | Eteläristin helmi | `aarre-oceania-star.jpg` |
| southamerica | El Doradon aarre | `aarre-southamerica-star.jpg` |

Kaikki seitsemän ovat `assets/aarteet/`-hakemistossa ja niihin
viitataan **vain** noiden pakettien `tokens.types.star.kuva`-kentästä.
Maailmankartta perii ne `mannerTypes`-taulun kautta.

**Sijoittelu on arvottu.** `enterWorld` (`game.js:264–284`) sekoittaa
pinon `counts`-luvuista ja jakaa yhden laatan per kaupunki; `jaaLaatat`
(`game.js:300–352`) tekee jälkikäteen yhden korjauksen: jos tähti osui
aloituskaupunkiin, se vaihtaa paikkaa arvotun tavallisen kaupungin
kanssa. Kommentti `:338–345` kertoo syyn — päämaali lähtöruudussa olisi
latistus, eikä aloituskaupungeille ole vihjetekstejä.

### 1.2 Löytyminen

Ei kätköpeliä, ei johtolankaketjua: **tavallinen laatan kääntö, jonka
edessä on kysymys.** Kaupungissa "Etsi kätkö" → `actionQuiz`
(`game.js:1130`) → oikea vastaus → `revealToken(cityId)`
(`game.js:2011`, kutsut `:1628` ja `:1676`). Pelaaja ei voi tähdätä
tähteen; hän saa tietää mikä laatta se oli vasta käännettyään sen.

`revealToken`in `case 'star'` (`game.js:2027–2045`) tekee kuusi asiaa:
`p.hasStar = true`, `world.starFound = true`, `world.starCity = cityId`,
`awardXp(p, XP_STAR)` (100 kp — pelin suurin yksittäinen palkinto),
`noteRecord(p)` (isoisän ennätysleima), ja sitten haarautuu:

- **`roaming`-tilassa** (= yksinpeli) tähti maksaa `STAR_PRIZE = 2000`
  puntaa eikä peli pääty.
- **Muuten** alkaa kotiinjuoksu: `checkWin` (`game.js:2095`) vaatii
  `starFound` + aloituskaupunki + (`hasStar` tai hevosenkenkä).

### 1.3 Vihjejärjestelmä — ja sen iso aukko

`starHint()` (`game.js:729–736`) palauttaa tekstin `texts.starHints`
-taulusta tähden todellisen kaupungin avaimella, mutta **vain** kun
`!starFound` ja pelaaja on kaupunkien VÄLISSÄ (`pos.type === 'edge'`,
omistajan linjaus 7.8.2026). Harvennus `HINT_EVERY_TURNS = 4`
(`game.js:19`) on käyttöliittymässä.

**Mittasin:** maailmankartta perii tekstinsä Euroopalta, ja
`texts.starHints` sisältää **39 avainta — kaikki Euroopan kaupunkeja.**
Laudalla on 248 kaupunkia. Toisin sanoen tänään:

> Jos tähti osuu Euroopan ulkopuolelle — mikä on **84 %:n
> todennäköisyys** — pelaaja ei saa yhtään vihjettä koko peliin.

Tämä on olemassa oleva reikä, ei uusi, mutta manner-mysteerimalli
nostaa sen pintaan: portti hidastaa löytymistä nimenomaan silloin kun
mitään ohjausta ei ole. Suosittelen käsittelemään tämän samassa
paketissa.

### 1.4 Tallennus

`toJSON` (`game.js:2116–2157`), maailmakohtaisesti:

```js
worlds: { <packId>: { tokens, revealed, visited, starFound, starCity } }
```

`fromJSON` (`game.js:2161–2240`) palauttaa nämä; `version: 1` on
tarkoituksella jäädytetty (`:2162` portti, perustelu `:2207–2211`),
uudet kentät tulevat oletusarvoina spreadin edessä.

Huomio, joka kannattaa tietää: **tallennustiedosto paljastaa
vastauksen.** `tokens` sarjallistetaan kokonaan, joten tähden paikka on
luettavissa tallennuksesta vaikkei `starCity` olisi vielä asetettu
(`starCityOf` `game.js:712` skannaa juuri sen). Portti ei muuta tätä
suuntaan eikä toiseen.

### 1.5 Yksi bugi matkan varrelta

`sw.js:161–181` esilataa **21 jalokivikuvaa** ("21 kpl, 7 lautaa")
mutta **ei yhtään seitsemästä `aarre-*-star.jpg`-kuvasta** (tarkistin:
osumia 0). Pelin tärkein paljastuskuva ei siis ole käytettävissä
offline-tilassa. Erillinen pieni korjaus, ei osa tätä työtä.

---

## 2. Käytyjen kaupunkien määrä per manner

### 2.1 Mistä se luetaan

Kaikki tarvittava on jo olemassa, kahdessa palasessa:

- **`world.visited`** — `Set` kaupunkitunnuksia. Täytetään `visitCity`
  (`game.js:623–630`) saapumishetkellä, idempotentisti.
- **`map.cityManner[cityId]`** — mantereen tunnus.

Valmista laskuria ei ole. `visited`-joukolla on koko koodissa vain
kaksi lukijaa: `visitCity` itse ja `ui.js:11038` (minun
suurennuslasisykkeeni).

### 2.2 Missä laskuri kuuluisi olla

**Malli on jo olemassa: `js/linssit/omistus.js`.** Se tekee täsmälleen
saman asian toisesta syystä — yksi linssilaatta per manner, manner
luetaan `map.cityManner`-kentästä (`linssiKaupungista`), ja
kanoninen mannerlista tulee funktiosta `laattamantereet()`, jota
`game.js:308` kutsuu. Se on olemassa juuri siksi, ettei `game.js`:n
tarvitse tuntea mannerien muotoa.

Suosittelen samaa kuviota: **uusi pieni moduuli `js/manner.js`**, jossa

```
mantereenKaupungit(pack, manner)   // kaikki
kaydytMantereella(game, manner)    // visited ∩ manner
mannerAuki(game, manner)           // >= puolet
```

ja `game.js`:ään vain kutsut. Portti pysyy silloin yhdessä
tiedostossa, testattavissa erikseen.

### 2.3 Luvut (mittasin laudalta)

| manner | kaupunkeja | puolet (portti aukeaa) | aloituskaupunkeja | lentokenttiä |
|---|---|---|---|---|
| europe | 40 | 20 | 3 | 8 |
| africa | 38 | 19 | 2 | 10 |
| asia | 37 | 19 | 4 | 11 |
| southamerica | 37 | 19 | 2 | 8 |
| northamerica | 36 | 18 | 3 | 10 |
| oceania | 32 | 16 | 2 | 9 |
| middleeast | 28 | 14 | 3 | 6 |
| **yhteensä** | **248** | — | **19** | **62** |

Mittakaava: uusi kaupunki = 10 kp, ja `LINSSIKYNNYKSET`-kommentti
(`omistus.js`) mitoittaa 400 kp:n ≈ "noin kaksikymmentä uutta
kaupunkia vastauksineen". Portti on siis suunnilleen yhden
linssikynnyksen mittainen urakka — ei kohtuuton, mutta ei pikkujuttu.

---

## 3. Mantereelta toiselle tänään

### 3.1 Lyhyt vastaus: siirtymää ei ole

Pelaaja aloittaa `maailma`-laudalta (aloitusnäyttö, 14 porttikaupunkia),
tekee yhden ilmaisen `actionPickStart`-hypyn maailmankartalle — ja jää
sinne. `maailmankartta.js`:ssä ei ole yhtään `links`-kenttää, joten
`gatewayOptions()` ja `countryGateOptions()` palauttavat aina tyhjän.
**Mantereet ylitetään tavallisena liikkumisena samalla laudalla.**

Koneisto on silti tallella ja lautariippumaton: `actionGateway`
(`game.js:779–795`) veloittaa `FLIGHT_PRICE`, kutsuu `enterWorld`,
asettaa `packId`+`pos`, `visitCity` ja `emit('flight')`. Sitä ei siis
tarvitse kirjoittaa uudestaan, jos B-malliin joskus mennään.

Sivuhuomio: `index.html`:n Säännöt-dialogi kuvaa yhä porttikaupunkeja
tapana hypätä laudalta toiselle. **Teksti on vanhentunut** suhteessa
dataan.

### 3.2 Miten mantereiden väliin todella pääsee — ja Oseanian ongelma

Laskin kaikki mannerrajan ylittävät reitit maailmankartalta:

| pari | reitit |
|---|---|
| africa–middleeast | tripoli–kairo (maa 4), alkufra–kairo (maa 3), kairo–suakin (maa 3) |
| europe–middleeast | sofia–istanbul (maa 3), istanbul–odessa (meri 4) |
| asia–middleeast | tabriz–teheran (maa 3), teheran–isfahan (maa 2) |
| europe–northamerica | islanti–nuuk (meri 4), dublin–stjohns (meri 5), lissabon–newyork (meri 6) |
| northamerica–southamerica | managua–panama (maa 4), havanna–panama (meri 5) |
| africa–southamerica | dakar–joaopessoa (meri 5) |
| asia–northamerica | tokio–sanfrancisco (meri 7) |
| **oceania–southamerica** | **suva–panama (meri 7)** |

**Oseanialla on 45 reunaa, joista tasan YKSI johtaa ulos** — Suva–Panama,
merta, 7 askelta. Asian ja Oseanian välillä ei ole yhtään reittiä.
Australiaan pääsee siis tänään vain Panaman kautta, ja meriaskeleet
kuluvat noppasilmillä useassa vuorossa. **Tämä on jo nyt pelin pahin
saavutettavuusongelma, eikä sitä ole kirjattu mihinkään.** Lento
korjaisi sen sivutuotteena — hyvä argumentti mekaniikan puolesta.

Lentoreitit eivät auta: `maailmankartta.js:955` perii `airRoutes`
-listat seitsemältä mannerpaketilta, jolloin **71 reitistä vain 9
ylittää mannerrajan** (rooma–istanbul, istanbul–moskova, tripoli–kairo,
kairo–addisabeba, kairo–nairobi, bagdad–teheran, dubai–teheran,
miami–panama, mexico–panama) — neljä mannerparia, kaikki naapureita.
`maailma.js`:n valtamerten yli menevät reitit (lontoo–newyork,
tokio–losangeles, …) ovat vain aloitusnäytön laudalla. **Pelattavalla
laudalla ei ole yhtään valtamerilentoa.**

### 3.3 Talousmalli

| erä | arvo | mistä |
|---|---|---|
| aloitusraha | 300 | `game.js:9 START_MONEY` |
| laivamatka | 100 | `game.js:10 SEA_FARE`, veloitetaan vain kaupungista lähtiessä |
| lento (laudan sisällä) | 300 | `rules.js:6 FLIGHT_PRICE` |
| topaasi / smaragdi / rubiini | 300 / 600 / 1000 | `tokens.js:16–18` |
| pääaarre roaming-tilassa | 2000 | `game.js:16 STAR_PRIZE` |
| hätäapu rahattomalle | 100 | `game.js:14 STRANDED_AID` |
| **aika** | **1 vuoro = 6 h** | `game.js:23 TURN_HOURS` |

Kaksi asiaa on syytä huomata. **(a)** Aika ei riipu matkustustavasta
eikä matkasta — jokainen siirto on yksi vuoro. **(b)** Laudalla on 34
rubiinia, 43 smaragdia ja 57 topaasia, joten keskivaiheilla raha ei ole
niukkuutta. 300 punnan lento on symbolinen hinta, ei valinta.

### 3.4 Mihin lento istuisi — ja miksi `roaming` ratkaisee ristiriidan

Ensi silmäyksellä "kun pääaarre on löytynyt, saat jatkaa seuraavalle
mantereelle" on ristiriidassa pelin lopetuksen kanssa: `checkWin`
käynnistyy juuri tähdestä ja kehottaa kotiin.

Ristiriitaa ei ole, koska **yksinpeli on `roaming`-tila**:
`game.js:136` `this.roaming = roaming ?? players.length === 1`, ja
`main.js:154` käynnistää pelin yhdellä pelaajalla. `checkWin` palauttaa
roamingissa aina `false` (`game.js:2096`), ja tähti maksaa 2000 puntaa.
**Oletuspelissä tähden löytyminen ei siis lopeta mitään — se vain
palkitsee ja jättää pelaajan seisomaan.** Juuri siihen tyhjään kohtaan
omistajan lause istuu täydellisesti: nyt kun aarre on löytynyt, matka
voi jatkua toiselle mantereelle.

Moninpelissä (2+ pelaajaa) lentoa **ei pidä tarjota** — siellä tähti
aloittaa kotiinjuoksun ja lento olisi suoraan sitä vastaan.

### 3.5 UI-kiinnityskohta

`UI.renderTravelChoice(modes)` (`ui.js:5341–5461`) on kaksivaiheinen
matkavalikko, ja sen **vaihe B** ("Laiva & lento") on valmis paikka:
siellä ovat jo laivanappi, lentokohteet (`ikoniTekstiNappi('kone', …)`)
ja — mikä tärkeintä — **valmis kuvio juuri tällaiselle napille**:
poistuneet porttinapit piirrettiin siellä `ikoniTekstiNappi('kompassi',
link.label, 'wide')` -muodossa, ja kommentti `ui.js:5085–5087` selittää
miksi ne pysyivät nappeina eivätkä kartan kohteina: *"koska niiden
kohde ei ole tällä kartalla"*. Mannerlennon kohde ON tällä kartalla,
joten se voi olla kumpi vain; suosittelen nappia, koska kohde on kaukana
ruudun ulkopuolella.

Kartalla on jo lentokenttäkuvake ✈ (`ui.js:4841–4845`) ja porttirengas
(`ui.js:4828–4840`, `city-gate`), jos visuaalista vihjettä halutaan.

### 3.6 Mitä tallennukseen tarvitaan

**Portti: ei mitään.** Se lasketaan `visited` + `cityManner`
-tiedoista, jotka ovat jo tallennuksessa.

**Lento: ei mitään pakollista.** `starFound` on jo tallennuksessa.
Vain jos halutaan "kerrotaan kerran" -logiikka, tarvitaan yksi
pelaajakohtainen lippu (esim. `lentoKerrottu`), ja se menee
oletusarvona spreadin eteen `fromJSON`:issa (`game.js:2212–2220`) —
**`version` pysyy ykkösenä**, kuten koodin oma kommentti vaatii.

---

## 4. EHDOTUS: pienin mahdollinen toteutus

### 4.1 PORTTI — "tähti liukuu syvemmälle"

**Idea:** kun pelaaja kääntää laatan ja se sattuu olemaan tähti, mutta
mantereesta on nähty alle puolet, **tähti vaihtaa hiljaa paikkaa** toisen
kääntämättömän saman mantereen laatan kanssa. Pelaaja saa sen laatan,
joka vaihdossa tuli tilalle. Mitään ei kerrota.

Yksi kohta `revealToken`in alussa (`game.js:2011`), ennen kuin `type`
luetaan käyttöön:

```
jos type === 'star' ja !mannerAuki(kaupungin manner):
    vaihda tähti arvottuun kääntämättömään saman mantereen kaupunkiin
    type = tokens.get(cityId)     // tämä kaupunki antaa nyt vaihdon tuoman laatan
```

Kokoluokka: **~15 riviä `game.js`:ään + pieni `js/manner.js` + testit.**

Miksi vaihto eikä kielto? Vaihtoehto olisi kieltäytyä kääntämästä
("laatta ei liikahda"). Se **tuhoaisi mysteerin kertaheitolla**:
pelaaja tietäisi täsmälleen missä tähti on ja voisi palata sinne
myöhemmin. Vaihto on ainoa muoto, joka pitää arvoituksen pystyssä.

Neljä tarkistusta, jotka tein:

1. **Ei lukkiutumista.** Laatan voi kääntää vain käydyssä
   kaupungissa, joten käännettyjä ≤ käytyjä. Jos portti on kiinni,
   käytyjä on alle puolet mantereesta ⇒ kääntämättömiä on yli puolet
   ⇒ vaihtokohde löytyy aina. Portti ei voi jumittaa peliä.
   (Maailmankartalla jokainen 248 kaupungista saa laatan, joten
   "kaupunki ilman laattaa" ei ole olemassa.)
2. **Satunnaisuus säilyy toistettavana.** `rngCalls` tallennetaan
   (`game.js:2122`) ja toistetaan (`:2169`), joten vaihdon kuluttama
   arvonta ei riko determinismiä. Laattajako ei myöskään lasketa
   uudelleen latauksessa — se luetaan tallennuksesta.
3. **Ei vaikuta vihjeisiin väärin.** `starCityOf` skannaa
   `tokens`-taulun, joten vihje osoittaa vaihdon jälkeen uuteen
   paikkaan itsestään.
4. **Ei näy pelaajalle.** Laatat ovat piilossa; vaihto on
   havaitsematon.

### 4.2 LENTO — "seuraava manner"

**Idea:** kun `world.starFound` ja peli on `roaming`, pelaaja saa
mistä tahansa kaupungista napin "Lennä toiselle mantereelle". Ei
noppaa, yksi vuoro, hinta `FLIGHT_PRICE` (300). Kohde: sen mantereen
aloituskaupunki (niitä on 2–4 joka mantereella, ks. taulukko 2.3).

Toteutus istuu olemassa olevaan `actionFly`-runkoon (`game.js:1988`)
lähes sellaisenaan — ainoa ero on mistä kohteet tulevat:

```
mannerLennot()   // starFound && roaming ? muiden mantereiden
                 // aloituskaupungit : []
actionMannerLento(kaupunki)   // = actionFly ilman airport/airRoutes-ehtoa
```

UI: yksi nappi `renderTravelChoice`in vaiheeseen B, samalla kuviolla
kuin poistuneet porttinapit.

Kokoluokka: **~30 riviä `game.js` + ~20 riviä `ui.js` + testit.**

Kolme huomiota:

- **Omistajan lause ohjaa suoraan:** *"nykymaailmassa lentokentälle
  pääsee käytännössä joka kaupungista"* ⇒ **ei** `city.airport`-ehtoa.
  Se on tietoinen poikkeus laudan omaan lentologiikkaan, ja siksi se
  ansaitsee oman metodinsa `actionFly`n rinnalle eikä ehtoa sen sisään.
- **Hinta:** suosittelen `FLIGHT_PRICE` (300) ja yhtä vuoroa.
  Perustelu: tähti maksoi juuri 2000 puntaa, joten hinta ei ole valinta
  vaan ele — ja lause "pääsee käytännössä joka kaupungista" kuvaa
  helppoutta, ei kalleutta. Jos halutaan oikea päätös, vaihtoehto on
  500 puntaa **tai** kaksi vuoroa (12 h). En suosittele molempia.
- **Sivuvoitto:** tämä on ainoa järkevä tapa päästä Oseaniaan (kohta
  3.2). Kannattaa harkita, tarjotaanko lento myös ilman tähteä
  nimenomaan Oseaniaan — mutta se on eri päätös, en niputa sitä tähän.

### 4.3 Riskit

| riski | vakavuus | mitä sille voi |
|---|---|---|
| **Vihjeet kattavat vain Euroopan** (39/248). Portti pidentää etsintää juuri siellä missä ohjausta ei ole. | **suuri** | Tämä kannattaa ratkaista ennen porttia tai sen kanssa. Halvin muoto: yksi kompassisuuntavihje per manner Euroopan mallin mukaan (`europe.js:520–539` käyttää 4 tekstiä 39 kaupungille). |
| Portti pidentää peliä tuntemattomalla määrällä. Puolet mantereesta = 14–20 kaupunkia. | keskisuuri | Kynnys kannattaa tehdä yhdeksi vakioksi (`MANNER_OSUUS = 0.5`), jotta omistaja voi säätää sen ilman koodin lukemista. |
| Lento tekee merireiteistä merkityksettömiä valtamerten yli. | keskisuuri | Rajoita lento mantereiden **aloituskaupunkeihin** (kuten yllä), älä mihin tahansa kaupunkiin. Meri jää lyhyille ylityksille. |
| Moninpeli: lento sotisi kotiinjuoksua vastaan. | pieni | `roaming`-ehto sulkee sen pois automaattisesti. |
| Pelaaja saattaa kokea, että peli "huijasi" jos hän joskus saa tietää tähden liikkuvan. | pieni | Tarinallinen kehys ratkaisee: aarre ei liiku, vaan sitä *ei vielä osata nähdä*. Ks. tekstikysymys T2. |

### 4.4 Jos omistaja tarkoitti seitsemää aarretta (malli B)

Kirjaan hinnan, jotta valinta on tietoinen: `counts.star = 7`,
mannerkohtainen sijoittelu `jaaLaatat`iin (kuvio on jo olemassa
linssilaatoille, `game.js:306–313`), `world.starFound`/`starCity`
muuttuvat mannerkohtaisiksi tauluiksi (**tämä on ainoa kohta koko
työssä, joka muuttaa tallennusmuotoa**), `checkWin` uusiksi,
`p.hasStar` → laskuri, "Aarnin luettelo" (`ui.js:11211–11261`) uusiksi,
seitsemän vihjejoukkoa ja seitsemän löytötekstijoukkoa. Karkeasti
**5–10× A:n työ**, ja se on ensimmäinen kerta kun `version: 1` pitäisi
oikeasti harkita nostettavaksi.

---

## 5. Rikkooko portti nykyiset tallennukset?

**Ei riko — mutta yksi reunatapaus on syytä tietää.**

- **Muoto ei muutu.** Portti lukee `visited`- ja `cityManner`-tietoja,
  jotka ovat jo tallennuksessa. `version: 1` pysyy, eikä vanha
  tallennus torju uutta koodia (`game.js:2162` vaatii vain
  `version === 1`).
- **Vanha koodi lukee uuden tallennuksen.** Kentät eivät lisäänny,
  joten paluu edelliseen versioon on turvallinen. (Jos lennolle
  lisätään `lentoKerrottu`, sekin on vain ylimääräinen kenttä, jonka
  vanha koodi ohittaa.)
- **Tähti jo löytynyt ⇒ ei vaikutusta.** Portti toimii vain
  paljastushetkellä.
- **Reunatapaus:** aivan vanhoissa tallennuksissa, joissa `visited`
  puuttuu, se rekonstruoidaan käännetyistä laatoista:
  `visited: new Set(w.visited ?? (w.revealed ?? []).map(([city]) => city))`
  (`game.js:2196`). Silloin käydyt kaupungit, joissa laattaa ei
  käännetty, **katoavat laskuista** — portti olisi noille pelaajille
  luultua tiukempi. Ei rikko, vaan epätarkkuus, ja se koskee vain
  ennen `visited`-kentän lisäystä tehtyjä tallennuksia. Ei kannata
  korjata; kannattaa tietää.

---

## 6. Tarinatekstit — mitkä tarvitaan (sinun pöydältäsi)

En kirjoita näitä; listaan mitä koodi tulee kysymään. Merkitsin
tähdellä ne, joita ilman mekaniikka ei toimi.

**Portti**

- **T1 ★ Seitsemän mantereen nimeä suomeksi, taivutuksineen.** Tämä
  yllätti minut: **pelissä ei ole mannerten suomenkielisiä nimiä
  missään.** `map.cityManner` antaa `"southamerica"`, ja
  mannerpakettien `name`-kentät ovat aarteiden nimiä ("El Dorado",
  "Meripihkahuone"), eivät maanosia. Tarvitaan sekä perusmuoto
  ("Oseania") että tulosija ("Oseaniaan", "Etelä-Amerikkaan") — molempia
  tarvitaan alla.
- **T2 Kehystarina sille, miksi aarre ei löydy liian aikaisin.** Tämä
  on mallin sydän. Ehdotan suuntaa: aarre ei piiloudu — *pelaaja ei
  vielä osaa nähdä sitä*, koska mannerta on nähty liian vähän.
  Isoisän päiväkirjaan sopiva ajatus, mutta sanamuoto on sinun.
- **T3 Kertooko peli portista mitään?** Tämä on aito valinta, ei
  puute. Vaihtoehdot: (a) täysi hiljaisuus — mysteeri säilyy, pelaaja
  ei tiedä että portti on olemassa; (b) yksi rivi vihjeen tilalla
  ("… et ole nähnyt tästä mantereesta tarpeeksi"); (c) mittari
  ("Afrikka 11/19"). **Suositukseni: (b).** (a) on liian mykkä 19
  kaupungin urakkaan, (c) muuttaa arvoituksen tehtävälistaksi.
  Jos (b): **1 teksti**, joka nimeää mantereen (⇒ T1).
- **T4 (jos b) Rivi hetkelle, kun portti aukeaa.** "Manner alkaa
  hahmottua…" — 1 teksti, mahdollisesti 7 mannerkohtaista.
- **T5 Vihjeaukko (kohta 1.3).** Jos päätätte täyttää sen: Euroopan
  malli on 4 kompassisuuntatekstiä per manner ⇒ **24 tekstiä** (6
  mannerta × 4). Tämä on suurin yksittäinen kirjoitustyö koko
  paketissa, ja suosittelen sitä lämpimästi — ilman sitä 84 % peleistä
  on vihjeetön.

**Lento**

- **T6 ★ Löytöhetken rivi, joka kertoo että matka voi jatkua.**
  Nykyinen `roaming`-rivi kuuluu: *"◈ N löysi aarteen X kaupungista Y
  — arvo 2000 puntaa!"* ja jää siihen. Tähän tarvitaan jatko.
- **T7 ★ Napin teksti.** Yksi geneerinen ("Lennä toiselle mantereelle")
  vai seitsemän kohdekohtaista ("Lennä Oseaniaan")? Suosittelen
  seitsemää — se on konkreettisempi, ja lista mahtuu vaiheeseen B.
  ⇒ T1.
- **T8 Saapumisrivi uudelle mantereelle.** 1 geneerinen tai 7
  mannerkohtaista.
- **T9 `texts.flightRegret`** nalkuttaa nyt löytymättömästä aarteesta
  35 %:n todennäköisyydellä (`game.js:1490`). Löytymisen jälkeen se
  vaikenee. Halutaanko tilalle jotain?
- **T10 Säännöt-dialogin päivitys** (`index.html`) — siellä oleva
  porttikaupunkiteksti on jo nyt vanhentunut, ks. 3.1.

**Vähimmäismäärä, jotta mekaniikat toimivat:** T1 (7+7 nimeä), T2, T6,
T7. **Suositukseni koko paketiksi:** + T3/T4 ja ennen kaikkea T5.

---

## 7. Yhteenveto

- Malli olettaa 7 pääaarretta; koodissa on **1**. Mantereet ovat
  pelkkiä tekstileimoja, ja laudanvaihto poistettiin tarkoituksella
  10.8.2026. Molemmat mekaniikat ovat **suunnittelumuutos**, eivät
  lisäys.
- **Portti** on silti pieni: ~15 riviä + apumoduuli, **ei
  tallennusmuutoksia**, ei lukkiutumisriskiä. Muoto: tähti liukuu
  hiljaa syvemmälle mantereelle, ei kieltäydy kääntymästä.
- **Lento** istuu luontevasti, koska **yksinpeli on `roaming`-tila**,
  jossa peli ei pääty tähteen — juuri siihen tyhjään kohtaan omistajan
  lause menee. Moninpelissä sitä ei tarjota.
- **Kaksi asiaa kannattaa päättää samalla:** vihjeet kattavat vain
  Euroopan (39/248), ja Oseaniaan johtaa koko laudalla yksi ainoa
  7 askeleen merireitti.
- Testit vihreinä (552/553, 1 ohitettu; `tarkista-kaksoisavaimet` puhdas),
  ei koodimuutoksia tässä erässä.

**Suositukseni on malli A.** Jos poimit sen, portti (kohta 4.1) on
valmis tehtäväksi heti apumoduuleineen ja testeineen — se ei tarvitse
yhtään tarinatekstiä toimiakseen, koska vaihto on äänetön. Lento (4.2)
odottaa tekstejä T1, T6 ja T7. Jos malli onkin B, kartoitan sen
erikseen ennen kuin kirjoitan riviäkään koodia.


---

# Opus 1 → Fable: JEMEN VALMIS (v570, #813) — kolme uutta ansaa (11.8.2026 iltapäivä)

**Jemen on valmis:** neljä aihetta (historia, rakennukset, luonto,
ruoka), 14 nostoa, neljä minitehtävää. PR #813, v570.

- **Historia:** Maribin muinainen pato, Bar'anin temppeli ja sen
  kuudes pylväs, vanha Marib rauniokummun päällä, Zabidin tiilikaupunki.
- **Rakennukset:** Shibam, Dar al-Hajar, Al-Hajjarah, Kawkaban.
- **Luonto:** Tihama ja Jabal an-Nabi Shuayb, kaksi sadekautta ja Ibb,
  mantelipaviaani.
- **Ruoka:** madra-kivipata ja hulba, masoob, bint al-sahn.

Kaksi sivua on kolmen noston mittainen (kuten SYR ja IRQ) — syyt
kohdassa 3.

## 1. TÄRKEIN: kilpailijoita on neljäs, jota luovutuspapereissa ei ole

Edeltäjieni sääntö oli: *maalehden kilpailija on saman maan karttasivu
ja kaupunkilehti.* Se ei riitä. **`js/packs/maasto-tekstit.js` on
neljäs kilpailija**, ja se oli varannut puolet suunnittelemastani
luontosivusta:

Sarawat-vuorten lohko (`maasto-tekstit.js`, hakusana `sarawat`)
sisältää jo Jemenin ylängön terassit, **saman kuvan**
(`Haraz Mountains, Yemen (12633745063).jpg`), saman selityksen
("muuri pitää mullan paikallaan"), kylien sijoittelun harjanteille
*ja* kahvin — mokka on sataman nimi, ei pavun, sekä hollantilaiset ja
Jaava. Olin suunnitellut `vuoret`-sivun, joka olisi ollut lähes kopio.
Vaihdoin sen `luonto`-sivuksi.

**Kahvi on siis varattu kahdesti**, ei kerran: Sanan kulttuurivisassa
(`q:`-avain) ja tässä maastotekstissä. Luovutuspaperi listasi
mokkakahvin ja al-Makhan vapaaksi suunnaksi — se tieto oli väärä, ja
korjaan sen luovutuspaperiin.

**Ehdotus `tools/tarkista-maa.mjs`:ään** (kirjaan tämän myös
kohtaan 1d): työkalu lukee vain `kysymys:`-avaimia. Jos siihen
lisätään `q:`-avainten ja `maasto-tekstit.js`:n tekstihaku uuden maan
aiheita vasten, kaksi viime erän kalleinta löytöä olisi tullut ilmaiseksi.

## 2. Kolme tarkastusta löysi kolme asiavirhettä ja kahdeksan väärää
   kuvatekstiä

Ajoin kohdan 7b vakiotyötavan (kuvat/selitteet, faktat, kieli).
Löydökset, jotka **olisivat menneet läpi** ilman sitä:

**Asiavirheet:**

1. **Tihaman rinne.** Kirjoitin, että rannalta noustaan yli kahden
   kilometrin korkeuteen "parissakymmenessä kilometrissä". Todellinen
   matka on noin 90 km rannalta ja ~50 km tasangon sisäreunalta, ja
   välissä on vielä 300–1 100 metrin esivuoret. Korjattu.
2. **Mantelipaviaanin laumarakenne.** Kirjoitin "kaksiportainen".
   Laji on primatologian oppikirjaesimerkki **nelitasoisesta**
   yhteisöstä (yhden uroksen yksikkö → klaani → joukko → lauma).
   Korjattu.
3. **Zabidin kaupunginmuuri.** Kirjoitin, että osmanit muurasivat sen
   1539. Kaupunki oli muurien ympäröimä jo perustamisestaan, ja
   säilynyt muuri portteineen on **1800-luvun alusta**. Korjattu.
   (Commonsin oma kuvateksti sanoo "Ottoman Wall" — tiedostosivukaan
   ei siis ole lähde.)

Lisäksi poistin kolme väitettä, joille ei löytynyt vahvistusta
(Ibbin "sato neljästi vuodessa", Zabidin tiilikuviointitekniikka,
Dar al-Hajarin kaivon syvyys) ja korjasin madran kivilajin:
se on **vuolukiveä**, ei vulkaanista kiveä, vaikka jälkimmäinen
toistuu joka ruokablogissa.

**Kuvatekstit:** kahdeksaan selitteeseen tuli tarkennus. Nyt
mainitaan mm. Bar'anin temppelin nykyaikaiset metallituet ja
kaivauskenttää kiertävä teräsaita, Kawkabanin sähkötolpat ja etualan
roskat, Ibbin kaksi suurjännitepylvästä sekä se, että Ibbin peltolohkot
ovat rinteen muotoja seuraavia kaistaleita eivätkä suorakulmioita.
Tarkistin kaksi vakavinta löydöstä itse suurennoksina ennen korjausta;
molemmat pitivät paikkansa.

**Poliittisia julisteita, lippuja, aseita tai vesileimoja ei löytynyt
yhdestäkään 14 kuvasta.** Syyrian Assad-löydön jälkeen tämä
tarkistettiin erikseen 2400 px:n suurennoksina.

## 3. Miksi kaksi sivua on kolmen noston mittainen

Sama syy kuin Syyriassa: kuvapula, ei aihepula.

- **Ruoka.** `Category:Cuisine of Yemen` on 26 tiedostoa, joista suuri
  osa on Nokia C5-00 -puhelimella otettuja. Hylkäsin `Yemeni
  Sweet.jpg`:n (kaksi tunnistettavaa miestä kasvot kameraan),
  `وجبة يمنية شهيرة.jpg`:n (**vesileima ja logo**) ja `Sayadiyah
  Fish.jpg`:n (CC0 mutta jemeniläisyys varmistamatta).
- **Luonto.** Neljäs aihe olisi ollut terassit — ja juuri se osui
  Sarawat-maastotekstiin.

**Sidr-hunajaa ja qishriä ei voi tehdä lainkaan:** Commonsissa ei ole
kummastakaan yhtään kuvaa. Molemmat olivat luovutuspaperin
"vapaat ja lupaavat" -listalla.

## 4. Unesco on kontista estetty — mutta sen oma data ei ole

`whc.unesco.org` palauttaa 403:n (Cloudflare) niin WebFetchillä,
curlilla kuin Playwrightillakin, ja `web.archive.org` on egress-
policyn takana. Luovutuspaperin sääntö "Unesco-kohteiden luvut
Unescolta, EI Wikipediasta" näytti siis mahdottomalta noudattaa.

**Reitti löytyi:** `https://data.unesco.org/api/explore/v2.1/catalog/`
`datasets/whc001/records` on maailmanperintökeskuksen oma
syndikaatioaineisto ja sisältää kentät `date_inscribed`,
`danger_list` ja `justification_en` (= "Brief synthesis" sanasta
sanaan). Sitä kautta vahvistettiin Shibam 1982, Zabid 1993 +
vaarantuneet 2000 ja Marib 2023. **Tämä kannattaa kirjata pysyväksi
ohjeeksi** — se on sama data, jonka whc.unesco.org itse julkaisee.

## 5. Kaksi pienempää, mutta kirjaamisen arvoista

- **Liitostyökaluni katkoi kaksi pitkää tiedostonimeä kahdelle
  riville** (arabiankielinen Kawkaban-nimi ja iNaturalist-paviaani).
  Kuvat eivät olisi päätyneet R2-peiliin. `tests/media.test.mjs`
  nappasi sen — se testi ansaitsee kiitoksen. Korjasin sekä työkalun
  että tiedoston.
- **Otsikkotörmäys julkaistuun Syyria-lehteen:** ensimmäinen
  otsikkoni oli "Kylä, joka jätettiin seisomaan", ja SYR:ssä on
  "Kylä, jonka talot jäivät seisomaan" — sama aihe ja lähes sama
  otsikko. Vaihdoin Jemenin otsikoksi "Kumpu on vanhojen talojen
  tekemä". Kannattaa muistaa: esitarkistin vahtii *kysymysten*
  ainutkertaisuutta, ei otsikoiden.

## 6. Päätöstä vaativat (ei estä mitään)

1. **Maribin padon korkeus on riidanalainen:** MDPI 2026
   (vertaisarvioitu) päättää sarjan 7 metriin, Wikipedia sanoo 14 ja
   Britannica yli 15. Jätin luvun kokonaan pois ja kerron vain
   vaiheet 4 → 7 metriä, jotka kaikki lähteet jakavat. Jos haluat
   kärkiluvun, se pitää valita.
2. **Vanhan Maribin tyhjeneminen** kirjoitettiin neutraalisti
   ("kylä tyhjeni 1900-luvun kuluessa"). Pääsyy oli 1960-luvun
   sisällissodan pommitukset; sovelsin sotarajausta samoin kuin
   Irakin soiden vesihistoriassa.
3. **Jemenin lippu** on pelissä nykyinen eikä vaadi toimia — mainitsen
   vain, koska Syyrian lippulinjaus on jonossa.

## 7. Seuraavaksi

CYP on työn alla. Päällekkäisyyskartta on jo mitattu (Kyrenian hylky,
venetsialainen muuri, halloumi ja kupari ovat varattuja; Kyprosta ei
ole `maasto-tekstit.js`:ssä lainkaan), ja neljä kuvaa on katsottu.
**Ansa CYP:ssä:** Khirokitian komeimmat kuvat (A.Savin) ovat
FAL-lisenssillä eli kiellettyjä, vaikka haku nostaa ne ensimmäisenä.

Kun CYP on sisällä, ME-puutelista on tyhjä ja kirjoitan
kokonaisyhteenvedon.

---

# Opus 1 → Fable: SYYRIA VALMIS (v564, #807) — kuvatarkastus löysi Assadin muotokuvan (11.8.2026 aamu)

**Syyria on valmis:** kolme aihetta (historia, käsityö, ruoka),
11 nostoa, kolme minitehtävää. PR #807, v564.

- **Historia:** Serjilla ja kuolleet kaupungit, Bosran basalttiteatteri,
  Ugaritin 30-merkkinen aakkosto, Simeon Styliitan pylväskirkko.
- **Käsityö:** ajami-kohomaalaus, damaskoslainen lasinmaalaus,
  kupariastioiden tinaus Aleppossa, ruokokynäkalligrafia.
- **Ruoka:** booza ja sen survominen, zaatar, Aleppon
  "vitamiini"-mehukojut.

Kolme sivua neljän sijaan on tietoinen valinta, ei oikominen: ks.
kohta "Miksi ei neljättä sivua" alempana.

## 1. TÄRKEIN: kuvatarkastus löysi Bashar al-Assadin muotokuvan

Valitsin ajami-käsityön kuvaksi damaskoslaisen verstaskuvan
(`مشغل لفن الرسم العجمي في دمشق.jpg`, AlUmawi, CC BY 4.0). **Olin
katsonut sen itse 960 pikselin levyisenä** enkä nähnyt mitään
huomautettavaa: mies maalaa paneelia kadulla, taustalla kaksi muuta
työssä.

Tarkastusagentti löysi kuvan yläreunasta, noin 68 % leveydeltä,
**kehystetyn Bashar al-Assadin muotokuvajulisteen** liikkeen oven
yläpuolella. Latasin alkuperäisen 3840 px:n tiedoston ja rajasin
kohdan kuusinkertaiseksi: puku, solmio, viikset, virallinen
presidenttikuva-asetelma, arabiankielinen teksti alla. Ei
tulkinnanvaraa.

**Kuva vaihdettiin.** Tilalle tuli Metropolitan-museon damaskoslainen
vierashuone vuodelta 1707 (`Damascus Room - MET - Joy of Museums
1.jpg`, CC BY-SA 4.0) — sama huone, jonka nostoteksti jo mainitsi.

**Opetus perittäväksi:** 480–600 px:n silmätarkistus riittää kuvan
pääkohteen arviointiin, mutta **ei taustan poliittisiin merkkeihin.**
Kadulla ja liikkeissä otetuissa kuvissa seinillä on julisteita, ja
480 px:ssä valtionpäämiehen muotokuva on kymmenen pikselin täplä.
Ehdotan lisättäväksi kuvasääntöihin: *kaupunki- ja liikeympäristössä
otetuista kuvista tarkistetaan taustan seinät ja ikkunat erikseen
suurennettuna.*

## 2. Toinen kuva vaihdettiin: saavi oli tyhjä

Boozanoston kuvassa (`صناعة البوظة الدمشقية.jpg`) mies pitelee
survinta metallisaavissa. Rajasin saavin: **se on käytännössä tyhjä** —
paljas metallipohja ja ohut kuivunut valuma seinämässä, survin lepää
pohjaa vasten, mies katsoo kameraan. Otsikko lupaa jäätelön
hakkaamista, eikä kuvassa ole jäätelöä.

Tilalle tuli saman kuvaajan laajempi kuva samasta liikkeestä
(`عامل بوظة.jpg`, AlUmawi, CC BY 4.0), jossa etualan toinen saavi on
täynnä sileää valkoista massaa. Tarkistin senkin taustan
suurennettuna kohdan 1 jälkeen: pelkkiä vanhoja mustavalkoisia
kaupunkikuvia kehyksissä.

## 3. Esitarkistin esti neljä päällekkäisyyttä — enemmän kuin kertaakaan

Edeltäjäni sääntö ("maalehden kilpailija on saman maan karttasivu ja
kaupunkilehti") osui Syyriassa täydellisesti. Edeltäjän ehdottama
käsityösivu olisi ollut lähes kokonaan päällekkäinen:

| Aihe | Missä jo on |
|---|---|
| Aleppon saippua | kaupunkilehden kuva, kaupungin artikkeli JA kulttuurivisa |
| Damastikangas | Damaskoksen kulttuurivisa |
| Damaskoksen teräs | Damaskoksen kulttuurivisa |
| Haman vesirattaat | maan karttasivun nosto |

Kolme neljästä oli **kulttuurivisassa**, jota `tarkista-maa.mjs` ei
lue (se lukee vain `kysymys:`-avaimia, visat käyttävät `q:`). Löysin
ne käsin grepillä. **Ehdotan työkaluun lisäystä:** visakysymysten
(`q:`) ja niiden vastausvaihtoehtojen tekstihaku uuden maan aiheita
vasten. Se olisi säästänyt tässä erässä puoli tuntia ja estää
myöhemmin virheen, jota kukaan ei huomaa.

## 4. Faktatarkastus: neljä numeroa pois tai muutettu

- **Bosran katsojaluku poistettiin kokonaan.** Kirjoitin ~17 000
  (en-Wikipedia). Arviot vaihtelevat 6 000:sta 17 000:een, ja
  **Unesco ei anna lukua lainkaan** — ja Unesco on maailmanperintö-
  kohteissa se lähde, jota sääntömme käskee käyttää. Tilalle Unescon
  oma perustelu: katsomo on säilynyt kokonaisena ylintä
  pylväskäytävää myöten. Poistin myös "80 000 asukasta", joka on
  lähteetön kiertoluku.
- **Simeonin pylväs 18 m → runsaat 15 m.** Kaksi Wikipedian
  artikkelia ovat keskenään eri mieltä; Britannica ja Catholic
  Encyclopedia tukevat 15:tä.
- **Bakdash 1885 → "1800-luvun lopulta".** Tarkistin artikkelin
  raakatekstin itse: infolaatikko sanoo 1895, leipäteksti 1885,
  **molemmat samaan lähteeseen viitaten.**
- **Ugaritin löytövuosi täsmennettiin:** kumpu paljastui 1928, mutta
  kirjoitetut savitaulut nousivat esiin vasta vuoden 1929
  kaivauksissa. Olin niputtanut nämä yhdeksi.

## 5. Kieli: minitehtävän fakta kumosi oman vastauksensa

Historian minitehtävä kysyi, mikä säilytti Bosran katsomon. Oikea
vastaus nimesi linnoituksen — mutta kirjoittamani `fakta` sanoi
"molemmat suojasivat istuinrivejä yhtä lailla", eli teki oikeasta
vastauksesta puolet totuudesta. Kirjoitin faktan niin, että syyt
sisäkkäistyvät: muurit keräsivät hiekan, joka peitti rivit.

Muuta: rektiovirheet, kahdeksan puuttuvaa pilkkua rinnasteisten
päälauseiden välistä, ja kolme kohtaa joissa **teksti ja sen oma
kuvateksti käyttivät eri sanaa samasta esineestä** (survin/puuvarsi,
pumpulituppo/pumpulitukko, kuparipata/kupariastia — kuvassa on kannu).

## 6. Miksi ei neljättä sivua

Etsin luonto- ja musiikkisivua varten kuvat Commonsista ja
**hylkäsin molemmat aiheet kuvapulan takia**, en aiheen takia:

- **Luonto:** Syyrian maisemakuvasto Commonsissa on ohutta.
  Nabi Mattan suojelualueen kuvat ovat pimeitä ja sumuisia, Kasabin
  kuvassa on päivämääräleima ja se esittää lähinnä taloja, Jabbulin
  suolajärvi on utuinen tienvarsikuva. Yksi hyvä löytyi:
  `Al Khawabi River - tartus - 2019.jpg` (ACEsAF, CC BY-SA 4.0) —
  vihreät metsäiset vuoret, kevätniitty täynnä kukkia ja retkeilijöitä.
  Se yksin ei kanna sivua. **Jos haluat luontosivun, tämä on hyvä
  aloitus** ja se rikkoisi mielikuvan Syyriasta pelkkänä aavikkona.
- **Musiikki:** `Category:Music of Syria` on 14 tiedostoa, joista
  suurin osa pieniä tai nuottikuvia. Turkilla on jo musiikkisivu,
  jossa on oud-perhe ja pyörivät dervissit, joten päällekkäisyysriski
  olisi lisäksi suuri.

Kolme sivua on reseptin sisällä (2–4 aihesivua per maa), joten pidän
Syyriaa valmiina — mutta neljäs sivu on tehtävissä, jos haluat.

## 7. Lippuasia — kirjattu, ei tehty

Nostin maalehden otsikkopalkin Syyrian lipun (vuotta 2024 edeltävä) ja
saman lipun rintapinssin lasinmaalaajan kuvassa. **Fable vastasi
11.8.: maalehdet näyttävät nykymaailman, eli lippu päivitetään
2024 jälkeiseen, mutta jaetun maadatan eränä jonossa — ei nyt.**
Pinssikuva jää siis ennalleen siihen asti; kun otsikkolippu
vaihdetaan, tämä kannattaa katsoa samalla. Commonsissa ei ole toista
syyrialaista lasinmaalauskuvaa, joten vaihto tarkoittaisi aiheen
vaihtoa.

**Palmyra on yhä koskematon** edeltäjäni linjauksen mukaisesti.

## 7b. Mergen opit (Fablen palaute 11.8.)

Fable joutui viimeistelemään #807:n mergen: olin ajanut
versionoston ennen kuin hänen v563:nsa ehti mainiin, joten
sw.js/main.js/muutokset.js olivat konfliktissa. Lisäksi #807:n CI ei
koskaan käynnistynyt (Actions-häikkä) — työnsin tyhjän commitin
herättääkseni sen, eikä sekään auttanut.

Kaksi sääntöä jatkoon, molemmat nyt käytössä:

1. **Versionosto vasta juuri ennen PR:n avaamista**, `git fetch
   origin main` välittömästi ennen sitä. Jos PR odottaa pitkään, nosto
   ajetaan uudelleen ennen mergeä.
2. **Jos CI ei käynnisty, portit ajetaan paikallisesti ja se
   kirjataan PR:ään.** Hiljainen CI ei ole vihreä CI.

## 8. Jemenin päällekkäisyydet kartoitettu valmiiksi

Ajoin YEM:n tarkistuksen jo odotellessa. Varattuja aiheita:

- **Karttasivun nosto vie Sokotran kokonaan:** traakkipuu,
  endeemisyys, pullorunkoinen kurkkupuu, sokotran kieli, Unesco 2008.
- **Sanaan artikkeli:** tornitalot, mafraj, kipsikehysikkunat,
  2 250 m korkeus.
- **Adenin artikkeli:** kraatteri, Suezin hiiliasema, Tawilan
  vesisäiliöt.

Vapaita ja lupaavia: **kahvi ja al-Makha** (mokan alkuperä),
**Shibamin savitiilitornit** (Unesco 1982), **sidr-hunaja**,
hopeasepäntyö ja korikudonta, Harazin vuoriterassit.

## 9. Portit

`tarkista-maa.mjs SYR` 0 virhettä (varmistin rikkomalla yhden
vastauksen tahallaan — tarkistin huomasi sen); `node --test` 552 pass
0 fail; kaksoisavaimet puhdas; selainajo 11/11 kuvaa, rikki 0,
kolme kaappausta katsottu.

Uudet kuvat eivät ole vielä R2-peilissä ennen kuin `peilaa-media`
ajetaan.

---

# Opus 1 → Fable: IRAK KOKONAINEN (v562, #805), SYR pohjustettu — konteksti loppumassa, tein luovutuksen (11.8.2026 aamuyö)

**Irak on valmis:** neljä aihetta (muinaisuus, ruoka, rakennukset,
suot), 15 nostoa, neljä minitehtävää. Tämän vuoron neljä PR:ää:

| PR | versio | sisältö |
|---|---|---|
| #802 | v560 | IRN ruoka + käsityö → **Iran kokonainen** |
| #803 | v561 | IRQ muinaisuus + ruoka |
| #804 | — | kolme lehtityökalua repoon |
| #805 | v562 | IRQ rakennukset + suot → **Irak kokonainen** |

Rakennussivulle tulivat Samarran Malwiya (52 m, ramppi ulkopinnalla),
Al-Ukhaidir, Bagdadin Mustansiriya (neljä lakikoulukuntaa saman pihan
ympärillä, vesikello 1235) ja Ktesifonin Taq Kasra. Suosivulle
keinosaaret ja vesipuhveli, mudhifin sisus ja ruokosato veneissä.

## Esitarkistin esti toisen päällekkäisyyden — ja se oli pahempi

Valitsemani mudhif-kuva oli jo `maakartat.js`:ssä **Irakin oman
karttasivun** nostona, otsikolla "Talo, jossa ei ole yhtään naulaa".
Karttasivu on saman maalehden ensimmäinen sivu, joten lukija olisi
nähnyt saman kuvan ja saman jutun kahden sivun välein. Poistin oman
nostoni ja jätin suot-sivulle kolme nostoa neljän sijaan.

**Tästä syntyi sääntö, jonka kirjasin luovutuspaperiin:** maalehden
kilpailija ei ole toinen maalehti vaan saman maan **karttasivu ja
kaupunkilehti**. Ne on katsottava ennen kuin aihe lyödään lukkoon.

## Kaksi kohtaa, joissa noudatin sinun aiempaa päätöstäsi

1. **Soiden vesihistoria neutraalisti.** Löysin `maakartat.js`:n
   kommentista päätöksesi 9.8.: ei sorto- eikä sotamainintoja edes
   yhden lauseen verran, kun neutraali vaihtoehto on olemassa.
   Kirjoitin siksi kanavat, padot, pinta-alan putoamisen
   kymmenesosaan, palautuksen 58 prosenttiin 2006 ja nykyisen noin
   kolmanneksen — ilman toimijoita. Jos haluat rajata tiukemmin
   (koko vesihistoria pois), se on yhden noston viimeisen kolmen
   virkkeen poisto.
2. **Erbilin kansi jätettiin pois.** Luokassa on kaksi kuvaa: toinen
   on kolmen kuvan yhdistelmä, jonka etualalla on yksittäinen
   tunnistettava lapsi, toinen kaivantokuva jossa kohdetta ei
   tunnista. Neljänneksi rakennusnostoksi tuli Taq Kasra.

## Yksi asiavirhe, jonka lähde esti

Olin kirjoittamassa Taq Kasran holvin olevan **maailman suurin**
yhden jännevälin raudoittamaton tiiliholvi. Se on toiseksi suurin.
Sama kuvio kuin Iranin pistaasiluvuissa: uskottava numero, jota ei
huomaa vääräksi lukemalla.

## SYR pohjustettu, kolme kuvaa jo katsottu

Ehdin katsoa Syyrian kuvaehdokkaita ennen kuin konteksti alkoi loppua.
Luovutuspaperissa on nimet ja lisenssit; lyhyesti: Serjillan
kaksikerroksinen kalkkikivitalo (Gerhard Haubold, CC BY-SA 4.0) ja
kaksi Aleppon saippuakuvaa (Bernard Gagnon, CC BY-SA 3.0) — kuivumaan
ladottu vihreä saippuamuuri ja lattiaan upotettu keittopata. Bosran
teatterikuva hylättiin: se on lähikuva yhdestä kapiteelista.

**Yksi päätös sinulle: Palmyra.** Aihe on kulttuurihistoriaa ja
aineistoa on paljon, mutta Palmyra tunnetaan nykyään ennen kaikkea
tuhoamisesta, eikä sitä voi käsitellä mainitsematta sitä. En ottanut
sitä ehdotukseeni; sano jos haluat sen mukaan ja millä rajauksella.

## Miksi lopetan tähän enkä aloita Syyriaa

Konteksti on käytetty pitkälti, ja kesken jäävä erä olisi huonompi
kuin siisti luovutus: docs/opus1-tilanne.md:n kohta 1b on nyt
kirjoitettu niin, että seuraava sessio pääsee Syyriaan kiinni ilman
tätä keskustelua — mukana aihe-ehdotus, katsotut kuvat, karttasivun
päällekkäisyyssääntö, neutraalin sanamuodon perustelu ja selainajon
neljä ansaa. Merkitsin myös luovutuspaperin vanhentuneet kohdat
vanhentuneiksi (mm. "lehdettömät maat pysyvät kahden sivun mallissa"),
koska ne olisivat ohjanneet seuraavan session väärään.

Puutelista: **SYR, YEM, CYP.**

# Opus 1 → Fable: Iran valmis (v560), Irak aloitettu (v561), työkalut repoon (#804) (11.8.2026 yö)

Kolme PR:ää sisään tämän vuoron aikana, kaikki mergettyinä:

| PR | versio | sisältö |
|---|---|---|
| #802 | v560 | **IRN ruoka + käsityö** → Iran kokonainen, 5 aihetta × 4 nostoa |
| #803 | v561 | **IRQ muinaisuus + ruoka**, 4 + 4 nostoa |
| #804 | — | kolme lehtityökalua `tools/`-kansioon (ei versionostoa) |

**Puutelista on nyt kolme maata: SYR, YEM, CYP.** Irakilta puuttuu
vielä kaksi aihetta (rakennukset ja suot), joille kuvat on jo katsottu
— ne ovat docs/opus1-tilanne.md:n jatkokohdassa nimeltä ja
lisenssiltään.

## Mitä Irakiin tuli

**Muinaisuus:** Urin ziggurat (Ur-Nammu n. 2100-luvulla eaa., pohja
64 × 45 m, poltettu tiilikuori kuivatun savitiilen päällä), Gilgamesh-
eepoksen viides taulu Sulaymaniyahin museossa, Babylon
(jälleenrakennus 1978 alkaen, maailmanperintöluetteloon vasta 2019) ja
Hatra (muurit lähes 2 km halkaisijaltaan, yli 160 tornia, luetteloon
1985).

**Ruoka:** tanoor-leipä, tashrib, gaymar ja dibs, kleicha.

Sotasisältörajaus piti, ja se vaati Irakissa enemmän työtä kuin
Iranissa: luokat `Great Ziggurat of Ur`, `Mudhif` ja
`Mesopotamian Marshes` ovat puolillaan Yhdysvaltain armeijan kuvia.
Lisenssi ei pysäytä niitä (ne ovat PD), joten tekijäkenttä on
katsottava joka kerta. Hatran teksti kertoo muurien mitat ja
rakennustavan, ei piirityksiä.

## Kaksi asiaa, jotka esitarkistin esti

1. **Valitsemani masgouf-kuva oli jo pelissä** — Bagdadin
   kaupunkilehdessä (`asia-valokuvat.js`), ja masgouf on kerrottu myös
   Bagdadin artikkelissa. Vaihdoin noston tashribiin, joten Irakin
   maalehti ja Bagdadin kaupunkilehti eivät kerro samaa asiaa.
2. **Iranin ruokasivun johdanto lupasi kalan**, jota sivulla ei ollut
   masgouf-vaihdon jälkeen. Johdanto kirjoitettiin uusiksi vastaamaan
   sivun sisältöä.

## Työkalut ovat nyt repossa (#804)

`tools/tarkista-maa.mjs`, `tools/kuvaa-maalehti.mjs` ja
`tools/hae-commons.mjs`. Edellinen sessio menetti vastaavat `/tmp`:hen;
nämä eivät katoa enää. Selainajon kolme ansaa on kommentoitu
tiedostoon ja luovutuspaperiin, koska jokainen niistä antaa
korjaamattomana valheellisen "rikki 0":

1. maalehti aukeaa vain, jos maalla on muoto nykyisen laudan kartalla
   (`index.html?lauta=middleeast` on toimiva reitti),
2. `naytaTutkiSivu(i)` on indeksi ja `vaihdaTutkiSivu(d)` suunta — ja
   indeksissä on yhden siirtymä,
3. reittikoukun on katettava kaikki ulkopuoliset osoitteet, eikä
   peilin virhesivua saa tarjoilla `image/jpeg`-otsakkeella.

## Peili

Iranin kahdeksan kuvaa **ovat jo R2-peilissä** (viimeinen selainajo
haki ne sieltä). Irakin kahdeksan eivät vielä olleet; peli hakee ne
silloin Commonsista omalla varareitillään, joten mikään ei ole rikki,
mutta `peilaa-media` kannattaa ajaa Irak-erien jälkeen.

## Avoimet, ei kiireellisiä

1. **IRN `rakennukset`-minitehtävä** antaa esitarkistimessa väärän
   hälytyksen ("viileän" vs. tekstin "viileämmän"). Sisältö on oikein,
   joten en muuttanut mitään. Sanon vaihtoehdon tekstin muotoon jos
   haluat listan puhtaaksi.
2. **§7b:n kolmen agentin ristiintarkastus** jäi ajamatta: tämän
   session ajo-ohje kieltää agenttien käynnistämisen ilman erillistä
   pyyntöä. Tein tarkastuksen itse (luvut alkulähteistä, kuvat kahdesti
   eri koossa). Sopisi Sonnetille luettavana tehtävänä.
3. **IRN runous** olisi luonteva kuudes aihe: Shahnamehin
   käsikirjoitussivut ja Hafezin hauta ovat PD/CC.
4. **Erbilin kansi:** luokassa on vain kaksi kuvaa, ja toinen niistä
   on hylätty (kolmen kuvan yhdistelmä, etualalla tunnistettava lapsi).
   Jos toinenkaan ei kelpaa, Irakin rakennussivun neljäs nosto
   kannattaa ottaa muualta.

Jatkan Irakin rakennus- ja suoaiheisiin.

# Opus 1 → Fable: IRAN KOKONAINEN, julkaistu v560 (#802) — jatkan Irakiin (11.8.2026)

Iranin maalehdessä on nyt **viisi aihetta × neljä nostoa + minitehtävä**:
historia, rakennukset, puutarhat, **ruoka** ja **käsityö**. Ruoka ja
käsityö ovat tämän erän työtä; PR #802 on mergetty, versio v560.

**Ruoka:** sahrami (150 000 kukkaa kiloon, Iranin osuus ~90 %),
sangak (jokikivillä paistettu täysjyväleipä), pistaasi (kuori halkeaa
itsestään; Rafsanjanin pohjavesi ja maanpainuma) ja tee (Kashef
as-Saltaneh salakuljetti 4 000 tainta Intiasta 1898; Lahijanissa
300 000 pensasta 1903).

**Käsityö:** mattosolmu kangaspuilla (Unesco 2010: Kashan ja Fars),
khatam (~250 palaa kuutiosenttimetrissä), mina eli emali kuparille
(~700 asteen poltot, Isfahan) ja termeh Yazdista (boteh-kuvio).

Runous jätettiin tekemättä: se olisi ollut kuudes aihe eikä tehtävässä
pyydetty ("+ runous jos aineisto kantaa"). Aineisto kantaisi hyvin —
Ferdowsin Shahnamehin käsikirjoitussivut ja Hafezin hauta Shirazissa
ovat PD/CC — joten se on valmis aihe poimittavaksi, jos haluat Iranille
kuudennen sivun.

## Kuvat (8 uutta, kaikki katsottu silmällä)

| kuva | tekijä | lisenssi |
|---|---|---|
| Saffronfarm-860808 | Safa Daneshvar | CC BY-SA 3.0 |
| Sangak bread in Tehran … (28604326958) | Ninara | CC BY 2.0 |
| 860631-Pistachio-IMG 6862-2 | Safa Daneshvar | CC BY-SA 3.0 |
| Persian Tea.JPG | Zereshk | CC BY-SA 3.0 |
| Carpet weaving, Mahan, Iran (1249317642) | Fulvio Spada | CC BY-SA 2.0 |
| Khatam detail | Fabienkhan | CC BY-SA 2.5 |
| Iranian handicraft | Reza Hajipour | CC BY 3.0 |
| Termeh fabric motifs … Yazd (29078803508) | Ninara | CC BY 2.0 |

`tools/tarkista-tekijat.mjs maa-kategoriat.js`: näistä kahdeksasta
**ei yhtään poikkeamaa**. Jokainen kuva katsottiin ensin 900 px:llä ja
neljä vielä 1200–1400 px:llä — ja se toinen katselu **muutti neljää
kuvatekstiä**: sahramipellolla poimijoilla on hengityssuojaimet ja
kukkaa pitelee kaksi eri kättä (ei yksi), teelasin sokeripala on
puutikun päässä, lautaset ovat raidalliset eivät kukalliset, ja
emalimaljakon keskellä on vinoneliöruutu, jota en ollut huomannut.

**Teen ja pistaasin hakusanat oli vaihdettava**, kuten varoitit:
`Tea in Iran` -luokka ajautuu surujuhlakuviin. Kelvollinen reitti oli
`Category:Tea drinking in Iran` ja `Category:Pistacia vera of Iran`.
Sivuhavainto: Iranin uutistoimistojen kuvat (Tasnim, Mehr, Fars) ovat
CC BY 4.0 mutta **vesileimattuja** — Lahijanin teenpoiminta ja giveh-
kenkien kudonta olisivat muuten olleet hyviä nostoja. Jos vesileima on
sinusta hyväksyttävä, niistä saa nopeasti kaksi lisäaihetta.

## Kolme asiaa, jotka tarkistus esti

1. **Pistaasi:** olin kirjoittamassa Iranin olevan maailman suurin
   tuottaja. Se ei pidä paikkaansa 2024 luvuilla: Yhdysvallat 499 000 t,
   Turkki 383 000 t, Iran 316 000 t. Teksti sanoo nyt "kolmen
   suurimman joukossa".
2. **Termeh:** suurin osa nykyisestä termehistä on jacquard-koneella
   kudottua. Kuvatekstissä ei väitetä kaupan pakkoja käsintehdyiksi;
   koneistuminen on kerrottu leipätekstissä.
3. **Sotasisältörajaus piti.** Ruoka- ja käsityöaiheissa ei ollut
   houkutusta, mutta Irakin puolella se tulee heti vastaan (ks. alla).

## Portit, jotka ajettiin

- Oma esitarkistin minitehtäväsäännöille (vastaus nostotekstissä, ei
  vuotoa otsikkoon/johdantoon, oikea ei pisin, kysymys ainutkertainen
  186 kysymyksen joukossa, kuvaduplikaatit kaikista 87 paketista).
  **Rikoin sen kerran tahallaan** ja katsoin, että se huomaa.
  Tarkistin löysi kaksi omaa vikaani ennen julkaisua.
- Selainajo 390 px:llä, `serviceWorkers: 'block'` + reittikoukku:
  molemmat sivut renderöityvät, **8/8 kuvaa latautuu**, kaappaukset
  katsottu. Huom. koukun on katettava KAIKKI ulkopuoliset osoitteet:
  kuvat tulevat R2-peilin kautta, ei suoraan Commonsista, joten pelkkä
  `commons.wikimedia.org` -sääntö näytti "0 pyyntöä" ja silti "rikki 0".
- `node --test tests/*.test.mjs`: # pass 552, # fail 0, # skipped 1.
  `tarkista-kaksoisavaimet`: puhdas. Build ajettu.

## Kaksi asiaa sinulle päätettäväksi (ei estä minua etenemästä)

1. **Esitarkistin antaa yhden vanhan väärän hälytyksen:** IRN
   `rakennukset`-minitehtävän vastaus "Johtaa viileän tuulen alas"
   ei löydy sanahaulla, koska tekstissä lukee "viileämmän". Vastaus on
   sisällöllisesti oikein tekstissä, joten **en muuttanut mitään** —
   mutta jos haluat sen menevän myös koneellisesti läpi, vaihdan
   vaihtoehdon muotoon, joka on tekstissä.
2. **§7b:n kolmen agentin ristiintarkastus jäi ajamatta.** Tämän
   session ajo-ohje kieltää agenttien käynnistämisen ilman erillistä
   pyyntöä, joten tein tarkastuksen itse (lähteet alkulähteistä,
   kuvat kahteen kertaan eri koossa). Jos haluat sen silti ajettavan,
   se sopii Sonnetille luettavaksi tehtäväksi ilman että minun
   tarvitsee koskea sisältöön.

## Seuraavaksi: IRQ

Aloitan Irakin samalla reseptillä. Ehdokkaat, jotka ovat jo
lisenssitarkistettuja mutta **eivät vielä katsottuja**: masgouf
(Al Jazeera English, CC BY-SA 2.0) ja ruokomajat eli mudhif
(Hassan Al-Jarrah, CC BY-SA 4.0). Sotasisältörajaus on Irakissa
tiukempi kuin Iranissa: `Category:Mudhif` sisältää yhdysvaltalaisen
armeijan kuvia ja `Culture of Iraq` haarautuu suoraan
surujuhla-aiheisiin, joten kuvat poimitaan luokka kerrallaan eikä
vapaalla haulla. Aiheet tulevat muinaisuudesta, ruoasta, soilta ja
musiikista.

# Opus 1 → Fable: Iranin puutarhat valmiina (3/5 aihetta), jään valmiuteen (10.8.2026)

Päätöksesi kuitattu. **En julkaise vielä**, koska annoit luvan vasta
kun Iran on kokonainen — sillä on nyt kolme aihetta, ei viisi.

**Uutta tässä erässä: IRN puutarhat** (4 nostoa): chahar bagh -kaava
Kashanin Finin puutarhassa, qanat Shafiabadissa, Chehel Sotounin
heijastusallas, Shirazin Eramin puutarha kasvitieteellisenä kokoelmana.

Kuvat katsottu silmin, tekijät ja lisenssit Commonsin API:sta:

| kuva | tekijä | lisenssi |
|---|---|---|
| Jardín de Fin, Kashan (DD 22) | Diego Delso | CC BY-SA 4.0 |
| Shafiabad (Shahdad), qanat | Ninara | CC BY 2.0 |
| Chehel Sotoun Palace | Ninara | CC BY 2.0 |
| Eram Garden Shiraz 02 | Mostafameraji | CC BY-SA 4.0 |

Qanat-kuvan kohdalla varmistin Commonsin kuvauksesta, että kyse on
todella qanatista eikä jostain muusta maanalaisesta käytävästä ennen
kuin kirjoitin siitä — tiedostonimessä lukee vain kylän nimi.

## Yksi työkaluansa, joka olisi mennyt läpi hiljaa

Liitin ensin aiheen työkalulla, joka etsi maan taulukon lopun
tekstihaulla `rindex('  ],')`. Taulukon sisällä on kymmeniä samalta
näyttäviä rivejä — jokaisen aiheen `nostot`-lista päättyy niin — joten
haku osui väärään ja **hukkasi juuri lisätyn aiheen**. Tiedosto
jäsentyi yhä, testit menivät läpi, eikä mikään portti huomannut
mitään; vika näkyi vasta kun laskin aiheet. Palautin tiedoston gitistä
ja kirjoitin liittimen uudelleen laskemaan hakasulkeita ja ohittamaan
merkkijonot. Ansa on kirjattu docs/opus1-tilanne.md:hen: **jäsennys ei
ole todiste, laske aiheet ja nostot joka liitoksen jälkeen.**

## Jatkokohta kirjattu, kuten pyysit

`docs/opus1-tilanne.md` kohta **1b** kertoo haaran, valmiin osuuden,
seuraavat askeleet järjestyksessä ja neljä kuvaehdokasta, jotka on jo
lisenssitarkistettu mutta **joita ei ole katsottu silmin** — ne on
katsottava ennen kuin niistä kirjoitetaan. Samassa kohdassa on
muistutus siitä, että pistaasille ja teelle ei löytynyt kelvollista
hakua: teehaku ajautui uskonnollisiin surujuhlakuviin, joten hakusanat
on vaihdettava.

## Portit

- `node --test tests/*.test.mjs` → **552 pass, 0 fail**, 1 skip
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- Minitehtäväsäännöt tarkistettu: vastaus nostotekstissä, ei vuoda
  otsikkoon eikä johdantoon, oikea vaihtoehto ei ole pisin (26 vs 34),
  kysymys ainutkertainen koko pelissä
- Ei uusia kuvaduplikaatteja

Konteksti on siinä pisteessä, jossa uuden maan aloittaminen olisi juuri
sitä mitä kielsit, joten en aloita ruokaa enkä käsityötä tässä
vuorossa. Jään valmiuteen; jatkosessio voi jatkaa suoraan kohdasta 1b.

---

# Opus 1 → Fable: ME-lehdet käynnissä — cityCountry korjattu + Iran aloitettu (10.8.2026)

Haara: **`claude/opus1-me-lehdet`**, pohja v554-main. Ei PR:ää, kuten
pyysit. Kaksi checkpoint-committia. **Kaksi asiaa vaatii päätöksesi
ennen kuin jatkan** — ne ovat heti alla.

## 1. PÄÄTÖSTÄ VAATIVA: tilauksesi kumoaa oman kaanonpäätöksesi

`middleeast-countries.js`:n otsikkokommentissa luki sanatarkasti:

> KUUSI LAUDAN KOHDETTA PUUTTUU TAHALLAAN kaupunki-maa-taulusta:
> Jerusalem, Petra, Siinai, Rub al-Khali, Persepolis ja Kappadokia.
> Ne eivät ole kaupunkeja vaan erikoiskohteita, eivätkä ne saa
> maa-attribuutiota (**Fablen kaanonpäätös 9.8.2026**) — isoisän
> päiväkirja puhuu paikasta itsestään eikä valtiosta. Esitystapa on
> Fablen pöydällä. **ÄLÄ lisää niitä tauluun ilman Fablen päätöstä.**

Tehtävänantosi puhui *puuttuvasta merkinnästä* eli näytti pitävän
tätä huolimattomuutena, ei päätöksen perumisena. **Tein muutoksen**,
koska tilaus tulee samalta taholta joka säännön asetti ja käytännön
peruste on vahva: maailmankartalla näillä viidellä on ollut sama
maatunnus koko ajan, joten laudat olivat keskenään ristiriidassa.
Päivitin myös otsikkokommentin, ettei tiedosto ole itsensä kanssa
ristiriidassa. **Jos kaanonpäätös oli tarkoitus pitää voimassa,
tämä commit on peruttava** — se on erillinen ja helppo kumota.

**Jerusalem jätettiin ennalleen**, kuten ohjeistit. Perustelu ei ole
mielipide: sitä ei ole kummallakaan laudalla, eikä laudalla ole
ISR- tai PSE-muotoa lainkaan. Tunnuksen antaminen olisi kannanotto.

Petra osoittaa nyt Jordaniaan, jolla ei ole muotoa tällä laudalla.
Tarkistin ettei se riko mitään: maan aihesivut haetaan
ISO-tunnuksella, ja saapumiskortin minikartta ohittaa muodottoman maan
omalla vartijallaan (`js/ui.js` piirraMaakartta).

## 2. Mittaukseni poikkeaa tehtävänannosta yhdessä kohdassa

Mittasin kattavuuden itse `maa-kategoriat.js`:stä enkä luottanut
listaan. **Jordania ei puutu** — sillä on jo kaksi aihetta (vedet,
rauniot). Petralta puuttui vain cityCountry-rivi, joka on nyt lisätty,
joten Jordanian lehti aukeaa Petrassa ilman uutta sisältöä.

Oikea puutelista on siis **viisi maata, ei kuusi**: IRN, IRQ, SYR,
YEM, CYP.

Sivuhavainto: nykyisistä ME-maista useimmilla on vain 2–4 aihetta
(KWT 2, SAU 3, QAT 2, BHR 2, OMN 2, ARE 4), eli alle tilaamasi 5–6:n
mitan. Jos mitta on tarkoitus nostaa myös niille, se on oma erillinen
työnsä.

## 3. Iran: kaksi aihetta valmiina, neljä kesken

**IRN historia** (4 nostoa): Apadanan lahjakulkue-reliefi, Kyroksen
sylinteri, Kserkseen kalliohauta Naqsh-e Rostamissa, Meybodin
karavaaniseraabi.
**IRN rakennukset** (4 nostoa): Naqsh-e Jahanin aukio, Si-o-se-polin
silta, Yazdin tuulitornit, Sheikh Lotfollahin kupoli.

Kuvat ja lisenssit (kaikki katsottu silmin, tekijät Commonsin API:sta):

| kuva | tekijä | lisenssi |
|---|---|---|
| Persepolis stairs of the Apadana relief | Phillip Maiwald (Nikopol) | CC BY-SA 3.0 |
| Cyrus Cylinder – British Museum | Joyofmuseums | CC BY-SA 4.0 |
| Xerxes tomb at Naqsh-e Rostam | dynamosquito | CC BY-SA 2.0 |
| Courtyard of a silk road caravanserail at Meybod | dynamosquito | CC BY-SA 2.0 |
| Naghshe Jahan Square Isfahan modified | Arad | CC BY-SA 3.0 |
| Si-o-se-Pol | Reza Haji-pour | CC BY 3.0 |
| Shish Badgiri, Yazd (DD 01) | Diego Delso | CC BY-SA 4.0 |
| Isfahan Lotfollah mosque ceiling | Phillip Maiwald (Nikopol) | CC BY-SA 3.0 |

**Kolme kuvaa oli GFDL-kategoriassa** — tarkistin kunkin
lisenssiwikitekstin: kaikki kolme ovat monilisensoituja
(`{{self|GFDL|cc-by-sa-3.0…}}`), joten käytämme CC BY-SA 3.0:aa ja
GFDL-kielto ei esty.

**Yksi ehdokas hylättiin silmätarkistuksessa:** Naqsh-e Rostamin kuvaan
`Ka'ba-ye Zartosht and Achaemenid Tombs …` on poltettu valokuvaajan
vesileima ("JULIA MAUDLIN | PHOTO") koko alareunan levyiseksi. Tilalle
Kserkseen haudan julkisivu.

Toinenkin karsinta tehtiin, ja se liittyy rajaukseesi: Naqsh-e
Rostamin **tunnetuimmat** reliefit esittävät Shapur I:n voittoa
roomalaisista keisareista ja Bahram II:n ratsastustaistelua. Ne ovat
sotasisältöä, joten jätin ne pois, vaikka ne olisivat kuvina hyviä.
Sama linja koski koko erää: aiheet ovat historiaa, arkkitehtuuria,
ruokaa, käsityötä ja luontoa.

**Minitehtäväsäännöistä kaksi rikkoutui ensimmäisessä versiossani** ja
korjattiin: historian otsikko "Kansat kantavat lahjansa" vuoti
vastauksen, ja rakennusten oikea vaihtoehto oli kahdeksan merkkiä
pisin. Molemmat ajettiin läpi tarkistimella, joka lukee myös
ainutkertaisuuden koko pelistä.

## Mitä on vielä tekemättä

- **IRN**: puutarhat, ruoka, käsityö (+ mahdollinen runous). Kuvaehdokkaat
  on jo haettu ja lisenssitarkistettu puutarhoille (Finin puutarha,
  Eramin puutarha, qanat Shahdadissa, Chehel Sotoun) — ne odottavat
  vain silmätarkistusta ja tekstejä.
- **IRQ, SYR, YEM, CYP**: aloittamatta.

Työ jäi kesken kontekstibudjettiin, ei esteeseen. En halunnut kirjoittaa
kuvatekstejä kuvista joita en ole katsonut — se on se sääntö, joka on
tässä erässä jo kerran pelastanut (vesileima).

## Portit

- `node --test tests/*.test.mjs` → **552 pass, 0 fail**, 1 skip
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/tarkista-maakyltit.mjs` → 13 maata kunnossa
- Ei uusia kuvaduplikaatteja: jokainen 8 kuvasta esiintyy pelissä kerran
- Genetiivit: Iranin, Irakin, Syyrian, Jemenin syntyvät säännöstä;
  Kypros → Kyproksen on jo `MAAN_GENETIIVIT`-taulussa. Ei muutoksia.

---

# Opus 5 → Fable: vuorikohteiden kuvakarusellit

Haara: `claude/opus5-vuorikuvat`. Työ ei koske mainiin eikä nosta
versiota — poimi ja julkaise sinä.

**Tilanne 10.8.2026 ilta: mekanismi valmis ja käytössä.
21/52 kohdetta kuratoitu, 146 kuvaa. Loput 31 kesken — lista alla.**

Erä on julkaisukelpoinen sellaisenaan: kuratoimaton kohde toimii
täsmälleen kuten ennenkin (Wikipedian oma kuvasto), joten mitään ei
riko se, että työ on kesken.

## Tehtävä

Omistajan tilaus (kuvakaappaus Kaukasus-popupista): "Vuorilta on
varmasti hienoja kuvia. Niitä voisi lisätä jopa kymmenen. Tällaisiin
kohteisiin, samanlaisiin karuselliin, voi käydä kaikki vuorikohteet
läpi samalla tavalla ja lisätä laadukkaita kuvia."

Kohteita on 52 (`js/packs/maasto-nimet-vuoret.js`).

## Mikä mekanismi on jo olemassa

Karusellia ei tarvitse rakentaa: maastonimen i-nappi avaa saman
Lue lisää -ikkunan kuin kaupungit (`ui.js: avaaMaastonimi` →
`openWikiArticle`), ja siinä on jo nuolet, laskuri ja suurennos
(`wiki-kuvakotelo`). Kuvat tulevat `cachedGallery(title)`:sta, joka
katsoo ENSIN käsin kuratoidun listan `OMAT_GALLERIAT` ja vasta sitten
Wikipedian artikkelin kuvat. Victoria-järvi on tämän ainoa nykyinen
käyttäjä.

Vuoret saavat siis kuratoidut kuvansa samasta hanasta — oma
pakettitiedosto, ei 400 riviä lisää ui.js:ään.

## Työtapa

1. `tools/hae-vuorikuvat.mjs` kokoaa ehdokkaat Commonsin
   KATEGORIASTA (Wikidatan P373 kautta, ei nimihausta) — vain
   PD/CC-lisenssit ilman ND- ja NC-ehtoa, vähintään 1600 px leveä,
   vaakakuva, kartat ja kaaviot karsittuna. Commonsin omat laatuluokat
   (Quality/Featured/Valued) nostetaan jonon kärkeen.
2. `tools/tee-kuvataulu.py` latoo ehdokkaat yhdeksän ruudun tauluksi,
   ruutu 480 px — jokainen kuva KATSOTAAN silmällä ennen hyväksyntää.
   Työkalu ei valitse mitään.
3. Hyväksytyt kirjataan pakettiin lisenssirivin kanssa.

Kumpikaan työkalu ei tarvitse avaimia.

## PÄÄTÖSTÄ VAATIVA LÖYDÖS: peilin nimeämissääntö rikkoo kuvia

Tämä ei ollut tehtävässä, mutta se tuli vastaan heti ensimmäisessä
kuvassa, ja se on pahempi kuin miltä kuulostaa.

`turvanimi` (js/media.js) pudottaa kaiken a-z0-9:n ulkopuolisen. Siksi
**kokonaan arabialainen, kyrillinen tai kiinalainen tiedostonimi
kutistui tyhjäksi**, ja peli haki niitä kaikkia samasta osoitteesta
`kuvat/.jpg`. Ämpärissä ne ovat kirjoittuneet toistensa päälle.

Mitattu 10.8.2026: `kuvat/.jpg` (406 kt) ja `kuvat/..jpg` (512 kt)
vastaavat molemmat 200:lla ja ovat kelvollisia JPEG-kuvia. Pelaaja ei
siis näe rikkinäistä ruutua vaan **väärän valokuvan** — ja se on
näyttänyt oikealta kuvakaappauksissa koko ajan.

Osumia nykyisessä aineistossa **21 kuvaa** seitsemässä paketissa:
africa-valokuvat, asia-valokuvat, asia-lisat-valokuvat,
kulttuuri-kategoriat, maa-kategoriat, maasto-tekstit, nahtavyysjutut
(mm. Bagdadin, Odessan, Kiovan, Pietarin ja Sahalinin kuvat).

**Korjasin tämän**, koska Kaukasuksen kuvista kolmella on venäjänkielinen
nimi eikä erää voi julkaista rikkinäisenä: nimi, josta ei jää yhtään
kirjainta tai numeroa, saa perään tiivisteen alkuperäisestä nimestä
(`kuva-19cxnn5.jpg`). Latinalaiset nimet eivät muutu lainkaan, joten jo
peilatut tiedostot pysyvät paikallaan.

Sama vika toistui vielä toisessa muodossa, ja sen löysi tähän eränä
kirjoitettu testi: kiinalaisista nimistä "…玉珠峰雪山 02.jpg" ja
"…昆仑山 02.jpg" jäi jäljelle pelkkä **"02"**, joka törmäsi keskenään
JA erääseen jo pelissä olevaan ruokakuvaan (`普通腊汁肉夹馍 02.jpg`).
Yksikin näistä vuorikuvista olisi siis korvannut ämpärissä olemassa
olevan kuvan. Sääntö on nyt: nimi, josta ei jää yhtään KIRJAINTA, saa
tiivisteen — pelkkä numero on yhtä hyödytön nimi kuin tyhjä.

**Sinulle jää kaksi asiaa:**

1. **Peili on ajettava uudelleen** (`tools/peilaa-media.mjs`), jotta ne
   21 kuvaa ilmestyvät omilla nimillään. Siihen asti ne latautuvat
   Commonsista varareittiä pitkin — eli oikein, mutta hitaammin.
   Nimi vaihtuu kaikkiaan **15 tiedostolla**, joista 8 on tämän erän
   omia. Seitsemän muuta ovat nykyisiä kuvia, joiden nimeksi jäi pelkkä
   numero (`02`, `2018`, `3754`, `1910`, `2020`): asia-valokuvat,
   asia-lisat-valokuvat, kulttuuri-kategoriat, maa-kategoriat ja
   nahtavyysjutut. Ne näkyvät pelissä oikein koko ajan — vain hakupolku
   vaihtuu.
2. **Neljä törmäystä jäi korjaamatta**, koska niiden korjaus vaihtaisi
   JO PEILATTUJEN tiedostojen nimet (404 kunnes peili ajetaan). Ne ovat
   tests/media.test.mjs:n `TUNNETUT_TORMAYKSET`-listalla, ja uusi
   törmäys kaataa testin. Luokat: 90 merkin katkaisu (kaksi pitkää
   nimeä samasta teoksesta), pelkkä latinalainen häntä
   ("- panoramio"), ja pelkkä kirjainkoko ("Potemkin stairs" vs
   "Potemkin Stairs" — Commonsissa kaksi eri tiedostoa).

## Mitä koodiin muuttui

- `js/packs/vuori-valokuvat.js` (uusi) — kuratoidut kuvat avaimella.
- `js/ui.js` — `avaaMaastonimi` antaa kuratoidun listan mukaan;
  `openWikiArticle` näyttää sen HETI ennen verkkoa; kuvateksti ja
  lähderivi karusellin alle; suurennos jatkaa samasta listasta.
- `index.html`, `css/styles.css` — kuvatekstin paikka ja tyyli
  (samat luokat kuin nähtävyysjutuissa).
- `js/media.js` — yllä kuvattu nimikorjaus.
- `sw.js`, `tools/build-standalone.mjs` — uusi paketti listoille.
- `tests/vuorikuvat.test.mjs` (uusi), `tests/media.test.mjs` —
  lisenssirivin muoto, kymmenen kuvan katto, ei duplikaatteja, ei
  peilipolkujen törmäyksiä.

Testit vihreinä: 552 pass, 0 fail. **Versiota ei ole nostettu eikä
buildia ajettu** — ne kuuluvat sinulle.

## Valmiit kohteet (21)

himalaja 10, karakoram 10, kaukasus 10, alpit 10, skandit 8,
kamtshatka 8, elburz 7, japanin-alpit 7, hindukush 7, pamir 7,
tienshan 7, apenniinit 7, zagros 6, tiibetin-ylatasanko 6,
verhojansk 6, pyreneet 6, ural 5, kunlun 5, taurusvuoret 5,
lansi-ghatit 5, karpaatit 4.

Kuvamäärä vaihtelee tarkoituksella: kymmenen tuli sinne, missä oli
kymmenen upeaa kuvaa. Karpaateilla jäi neljä, koska puolet ehdokkaista
oli saman valokuvaajan VESILEIMATTUJA otoksia — ne hylättiin.

## Kesken (31)

altai, annamin-ylanko, sarawat, dinaariset-alpit, balkanvuoret,
atlas, etiopian-ylangot, drakensberg, ruwenzori, kilimanjaro,
kenia-vuori, ahaggar, tibesti, kamerunvuori, kapmaan-taittovuoret,
madagaskarin-ylanko, kalliovuoret, sierra-nevada, appalakit,
sierra-madre-occidental, sierra-madre-oriental, alaskan-vuoristo,
kaskadit, rannikkovuoret, andit, guyanan-ylanko, brasilian-ylanko,
kaakkois-australian-ylangot, suuri-vedenjakajavuoristo,
uuden-seelannin-alpit, uuden-guinean-ylangot.

Kaikilla näillä ehdokaslistat ovat valmiina
(`tools/vuorikuva-aineisto/`, ei repossa — aja `hae-vuorikuvat.mjs`).
Jatko on mekaanista: taulu → silmätarkistus → merkintä pakettiin.

## Mitä silmätarkistus on hylännyt

Nämä eivät ole teoriaa — jokainen näistä oli automaattiseulan
läpäissyt, oikein lisensoitu ehdokas, ja vain katsominen paljasti sen:

- **Vesileimat.** Karpaateilla useassa kuvassa oli valokuvaajan nimi
  poltettuna kulmaan. Kuvataulun keskirajaus PIILOTTI osan niistä,
  joten valituille tehdään vielä kokonaisen kuvan tarkistus
  (`tee-kuvataulu.py --koko`).
- **Väärä vuori.** Commonsin sarja "Province of L'Aquila in 2013" on
  kuvattu Dolomiiteilla, ei Apenniineilla. Otsikko valehteli
  suoraan — juuri siksi kategoriat tarkistetaan ja kuvat katsotaan.
- **Tuntematon paikka.** Hammondin diakuvien oma kuvaus sanoo, ettei
  kuvauspaikkaa tiedetä. Sellainen ei voi esittää "juuri sitä
  vuoristoa".
- **Ei vuorta lainkaan.** Uralin kategoriapuu oli mineraalinäytteitä ja
  kuorolaulajia, Pyreneiden leipää ja koruja, Karakoramin arkiston
  albumiaukeamia, Kamtšatkan satelliittirenderöintejä. Nämä kaikki on
  nyt seulottu koneella, mutta ne löytyivät silmällä.

## Kategoriat, jotka piti valita käsin

Wikidatan P373 osoitti tyhjään tai väärään paikkaan yhdeksällä
kohteella. Perustelut ovat koodissa (`KATEGORIA`), tässä tiivistys:
kolmella vuoristolla ei ole omaa kategoriaa lainkaan, joten tilalle
valittiin sen tunnetuin osa — Brasilian ylänkö → Serra da Mantiqueira
(kohteen oma huippu Pico da Bandeira), Guyanan ylänkö → Mount Roraima,
Apenniinit → Gran Sasso (Corno Grande). Nämä kolme kannattaa katsoa
läpi: valinta on tulkinta, ei tosiasia.
