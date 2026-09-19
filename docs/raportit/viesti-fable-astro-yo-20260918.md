# Viesti Fablelle: Astronautin laastari on yhtä hämärä kuin pohja (18.9.2026, Opus-agentti)

Erä: Raamattu **KARTTAUUDISTUKSEN PAATOKSET 41 kohta 4** ja
**ASTRONAUTIN KAMERA LISAYS 16 kohta 47**, jatkoa erälle
`docs/raportit/viesti-fable-astro-pyramidi-20260918.md`.

Fablen luenta kaappauksista: *"laastarin alue on kirkas päivänvalo,
astronautin tunnelma katoaa ja laastarin ja 4k-pohjan välillä on
kirkkausraja."* — **Pitää paikkansa, ja syitä oli kaksi.**

Haara `claude/bold-ride-vow4ki-astro-yo` (pohja
`claude/bold-ride-vow4ki-v1947`, commit 5962b701). Versiota EI nostettu,
PR:ää ei avattu. Toisen agentin avomeri-/napa-/aukkoerään
(`js/reliefipyramidi.js` meripeitto, `savuke-topografialinssi`) ei
koskettu: `meripeitonBitit`, `MERIVARI` ja luettelon haku ovat ennallaan,
lisäykset ovat omia funktioita astronauttiosiossa.

---

## 1. JUURISYY — KAKSI KERTOINTA, KUMPIKIN PALLON PINNASSA

Astronautin kamerassa **EI OLE YÖTÄ EIKÄ TERMINAATTORIA.** Pallon valot
ovat pelin omat, eikä niissä ole vuorokautta: `AmbientLight π` ja
`DirectionalLight 0,6 π` suoraan pohjoisnavan yläpuolelta. Kaappauksen
hämärä ("Italian saapas yöllä") syntyy kahdesta asiasta, ja laastari
ohitti molemmat.

### 1a. VALON VASTAKAAVA (kerroin 1 + 0,6 · sin φ, 41,6°:ssa 1,40)

Pinnan kirkkaus on `tekstuuri × (1 + 0,6 · sin φ)`. Linssin oma
4k-pohjatekstuuri EI ole valaistuksen armoilla: siihen poltetaan valon
**käänteisluku** rivi riviltä ennen käyttöä
(`js/linssit/satelliitti-avaruus.js` `valoLiuku`, `VALON_KOMPENSAATIO`,
`valokerroin`). Kertoimet kumoavat toisensa, ja ruudulla näkyy
täsmälleen se sävy, joka tekstuuriin on kirjoitettu.

Laastarin laatoilla on sama materiaalityyppi ja samat valot
(`MeshLambertMaterial`, laattamoottorin oma luokka) — mutta niiden
kankaalle ei poltettu käänteislukua. Ne saivat valon kertoimen ILMAN
vastakaavaa. Tämä kerroin on **leveysasteesta riippuva**, joten se on se
puoli viasta, joka teki laastarin reunasta rajan eikä pelkkää
kirkkauseroa.

### 1b. PALLON SÄVY (kerroin 0,60 — tämä oli suurempi)

Tämän löysi vasta mittaus: kun 1a oli korjattu, laastari oli yhä
**1,68-kertaisesti** kirkkaampi kuin pohja. Luku on `1 / 0,60`.

Omistaja tilasi pallon *"hieman tummemmaksi kauttaaltaan"* (LISÄYS 15
kohta 43), ja 18.9.2026 vielä tummemmaksi (LISÄYS 16 kohta 46). Se
tehtiin **materiaalin värillä** eikä tekstuuria muokkaamalla:
`PALLON_SAVY = 0x999999` eli 0,60 kertoo diffuse-uniformina koko pinnan.
Laastarin laatoilla on OMA materiaalinsa, joka syntyy laattakoneessa
eikä käy linssin kautta — se jäi valkoiseksi (1,00).

**Kylläisyyskerroin 0,8 ei ole kumpikaan näistä.** Se vie
värikylläisyyttä, ei valoa, ja se oli jo paikallaan edellisestä erästä.
Yhdessä kertoimet tekivät 41,6°:ssa `1,398 / 0,60 = 2,33`-kertaisen
kirkkauden — juuri sen, minkä Fable näki.

## 2. KORJAUS — SAMA KAHDESTI, YKSI VAKIO KUMPIKIN

1. **Valon vastakaava kankaalle.** `astronautinValokerroin(lat)` ja
   `astronautinValoliuunPysakit(korkeus, latRivilla)`
   (`js/reliefipyramidi.js`, puhtaita funktioita) antavat pystyliu'un
   pysäkit; `maalaaAstronautinValoliuku` (`js/pallolaatat.js`) maalaa ne
   `multiply`-sekoituksella laatan kankaalle heti kylläisyyssuodattimen
   jälkeen. Rivikohtainen kerroin, ei pikselisilmukkaa — sama ratkaisu
   kuin pallotekstuurin omassa `valoLiuku`ssa.
   Rivin leveysaste tulee samasta `yLat`-muunnoksesta kuin laatan oma
   pallonala, joten liuku ja verkko ovat samaa mieltä rivistä. Kangas on
   tässä vaiheessa läpinäkymätön (meriväri on maalattu taustaksi ennen
   laattaa), joten alfaa ei tarvitse palauttaa erikseen.
2. **Sävy materiaalille.** `ASTRONAUTIN_SAVY = 0x999999` annetaan laatan
   materiaalin `color`-kentäksi astronauttitilassa. Sama mekanismi kuin
   pohjalla, nolla pikselityötä: jos omistaja muuttaa sävyä, muuttuu
   yksi vakio ja molemmat seuraavat.

**Terävyys säilyy** (kangas ja tekstuuri ovat ennallaan; vain diffuse ja
liuku muuttuvat). **Kohdepisteet, ISS, tähdet ja pöly ovat yhä
laastarin päällä** — ne ovat kotelon kalvolla ja CSS2D-kerroksessa,
joihin ei koskettu.

Kumpikin luku on nyt KAHDESSA paikassa (linssi ei tuo laattakonetta eikä
laattakone linssiä, kuten `MERIVARI`). Kaksi uutta testiä vartioi, että
`astronautinValokerroin === valokerroin` ja
`ASTRONAUTIN_SAVY === PALLON_SAVY`.

## 3. MITTAUS — LUVUT ENNEN JA JÄLKEEN

Näkymä: Italia 41,6 N / 14,6 E, korkeus 0,14, kotelo iPhone 390 × 844
dpr 3, laatat ämpäristä Noden välityksellä. "Ennen" on
`?reliefipyramidi=0` (vanha 4k-polku eli **pohja**), "jälkeen" oletusajo
(laastari).

Mitta on ruudun pallonalan neljä vaakakaistaa (= neljä
leveysastevyöhykettä), `KAISTA_ALA` x 0,12…0,88 / y 0,08…0,52 eli pallo
ilman reunaa ja ilman pallodiag-lokia. Sama ala ja sama jako
molemmissa ajoissa, joten luvut vertautuvat pikseli pikseliltä.

### Chromium, iPhone 390 × 844 dpr 3

| mitta | pohja (4k) | laastari ENNEN korjausta | laastari JÄLKEEN |
| --- | --- | --- | --- |
| kaista 1 (pohjoisin) | 49,61 | 83,33 | **46,94** |
| kaista 2 | 57,42 | 92,27 | **51,97** |
| kaista 3 | 49,58 | 82,24 | **45,76** |
| kaista 4 (eteläisin) | 58,45 | 97,59 | **55,49** |
| suurin ero pohjaan | — | **39,14** (PUNAINEN) | **5,45** (VIHREÄ, < 8) |
| valon kaari (kaista 1 / kaista 4) | 0,8488 | 0,8539 | **0,8459** |
| kaaren ero pohjaan | — | 0,0051 | **0,0029** (VIHREÄ, < 0,04) |
| terävyys (gradienttisumma, keskiö 60 %) | 5,38 | 15,31 | **11,50** |
| fps (rAF 2 s) | 32,4 | 20,9 | **21,3** |
| JS-kasa | 242 Mt | 257 Mt | **257 Mt** |
| laattakerroksen GPU-tavut | 33 554 424 | 27 962 020 | **27 962 020** |
| reliefilaattapyyntöjä | 0 | 20 | **20** (1. **66 ms**) |
| seepiapohjan pyyntöjä | 0 | 0 | **0** |
| taso / laattoja valmiina | (kerros kiinni) | z5, 20/20 | **z5, 20/20** |
| materiaalin väri sulun jälkeen | 999999 | 999999 | **999999** |
| pisteitä / puute | 64 / ei | 64 / ei | **64 / ei** |

**"Ennen"-luku 83,33 / 49,61 = 1,68 on juuri `1 / 0,60`** — se on se
mittaus, joka paljasti kohdan 1b. Ensimmäisen korjauksen jälkeen jäljellä
oli enää sävy, ja sen kanssa laastari on 2,7…5,5 yksikköä pohjaa
TUMMEMPI, ei kirkkaampi. Loppuero on reliefin oma sisältö: laastari
näyttää vuorten varjopuolet, joita 4k-sumu tasoitti pois — ja se on
juuri se, mitä laastarilta halutaan.

**Terävyys on nyt 11,50 eli 2,14 × pohja (5,38).** Luku LASKI edellisen
erän 15,31:stä, koska gradienttisumma on absoluuttinen: kun koko kuva
tummenee kertoimella 0,60, myös naapuripikselien ero pienenee samassa
suhteessa. **Edellisen erän ehdotettu kynnys "terävyys ≥ 12" on siis
mitattu liian kirkkaasta laastarista eikä kelpaa** — rehellinen vartio on
SUHDE pohjaan (≥ 2,0), ei absoluuttiluku. Kynnystä ei lukittu tässä
erässä.

### WebKit, iPhone 390 × 844 dpr 3 — **EI SAATU, JA SYY ON NYT TIEDOSSA**

Ajo yritettiin kahdesti (portit 8831/8832 ja 8841/8842). Molemmat
kaatuivat samaan kohtaan **ennen kuin yhtään mittaa otettiin**:

```
page.goto: Timeout 60000ms exceeded.
  - navigating to "http://127.0.0.1:8841/index.html?lauta=pallo&pallodiag=1&reliefipyramidi=0",
    waiting until "load"
```

Aikakatko nostettiin 30 s:sta 60 s:iin (edellisen erän havainto 1), eikä
se riittänyt. **Vika ei ole hitaudessa.** Savukkeen oma otsikko kertoo
saman ilmiön toisesta kohdasta: WebKit pitää estetyt ulkoverkon pyynnöt
vireillä, eikä reitityksen `abort` sulje niitä WebKitin
`load`-laskurista — joten `load` ei laukea koskaan. Chromiumilla sama
ajo menee läpi, koska se sulkee abortoidun pyynnön heti.

**Oikea korjaus on `waitUntil: 'domcontentloaded'` + oma odotus linssin
valmiuteen** (pallodiag-rivi `avaruus-valmis`). Se on savukkeen
rakennemuutos eikä mahtunut tämän erän aikakattoon; 60 s:n aikakatko jäi
paikalleen ja on kommentoitu. **Omistajan päälaite on iPhone, joten tämä
kannattaa ottaa seuraavaksi eräksi.**

Se, mitä WebKitistä TIEDETÄÄN ilman ajoa: korjaus ei käytä mitään
WebKitissä puuttuvaa. Sekä `createLinearGradient` että
`globalCompositeOperation = 'multiply'` ovat Safarissa vanhastaan, ja
materiaalin `color` on kirjaston oma kenttä. Kylläisyyssuodattimen
varareitti (`ctx.filter` puuttuu vanhasta Safarista) ei koske näitä
kahta. `performance.memory` puuttuu WebKitistä, joten muistiluku jäisi
sielläkin nulliksi.

## 4. SAVUKKEEN TILA

`tools/savukkeet/savuke-astro-webkit.mjs` sai **VARTIO 5: laastari on
yhtä hämärä kuin pohja**, kaksi tuomiota samasta kaappauksesta:

* **5a KAISTAERO < 8.** Kaistan keskikirkkaus laastarin kanssa ja ilman.
  Tämä ON laastarin reunan kahden puolen ero: reuna on täsmälleen se
  paikka, jossa laastari kohtaa pohjan, ja jos kaista on pohjan kanssa
  samassa kirkkaudessa joka leveysasteella, rajaa ei ole missään.
* **5b VALON KAARI, ero pohjaan < 0,04.** Pohjoisimman ja eteläisimmän
  kaistan suhde kertoo, kulkeeko valon vaimennus laastarin yli. Pohjan
  suhde mitataan ensin ja laastarin verrataan siihen — juuri kuten
  tilauksessa sanottiin: *mittaa pohjasta ensin, käytä samaa suhdetta.*

**Tilauksen "yö < 60 % päivästä" ei ole mitattavissa, koska kameralla ei
ole kahta näkymää.** Astronautin kamerassa ei ole terminaattoria eikä
vuorokautta; hämärä on valon vastakaava ja kalvon reunavarjo. 5b on sen
korvaava suhde, ja se on mitattu pohjasta.

Vertailupari on AJOPARI: `LISAPARAMIT=&reliefipyramidi=0` kirjoittaa
lukunsa kaappauskansioon (`astro-laastari-pohja-<selain>-<kotelo>.json`),
oletusajo lukee ne ja tulostaa tuomion. Ilman pohjatiedostoa luvut
tulostuvat mittarina ilman tuomiota — vartija ei saa olla tiukempi kuin
sen tieto. Uusi `LAASTARIN_KUVA` antaa kaappausparille lyhyen nimen.

Chromium iPhone, yksi avaus, molemmat polut: **ei sivuvirheitä, ei
linssivirhe-ilmoitusta, pisteitä 64/64, vartija `puute=ei`, materiaalin
väri 999999 kaikilla viidellä näytteellä.** Musta pallo -juurisyy
(globe.gl `Color(0)`) ei rikkoutunut.

`node --test tests/*.test.mjs`: **# pass 3632 / # fail 0** (13 skipped).
Kolme uutta testiä (`tests/reliefipyramidi.test.mjs`), ja
`tests/pallolaatat.test.mjs`:n tuontilistavartio päivitettiin.
`node tools/build-standalone.mjs`: ok (32 751 kt). Uusia moduuleja ei
tullut.

**Kaappaukset** (390 px CSS, Italia):

* ennen (pohja, 4k): `tools/savukkeet/kaappaukset/astro-pyramidi/astro-laastari-yo-chromium-ennen.jpg`
* jälkeen (laastari korjattuna): `…/astro-laastari-yo-chromium-jalkeen.jpg`
* WebKit-paria EI ole (ajo kaatui sivunlataukseen, ks. kohta 3)
* pohjan luvut: `…/astro-laastari-pohja-chromium-iphone.json`
* JSON: `…/astro-webkit-mittaus-20260918.json` (kenttä `laastari.vartio5`)

Ero näkyy paljaalla silmällä: "jälkeen"-kuvassa on sama astronautin
hämärä kuin "ennen"-kuvassa, mutta Alpit, Apenniinit ja Korsikan vuoret
ovat eriteltyjä sen sijaan että ne olisivat tasaista sumua.

## 5. MUUTETUT TIEDOSTOT

* `js/reliefipyramidi.js` — `ASTRONAUTIN_SAVY`,
  `ASTRONAUTIN_VALON_KOMPENSAATIO`, `astronautinValokerroin`,
  `astronautinValoliuunPysakit` ja niiden perustelu. Meripeittoon,
  `MERIVARI`in ja luettelon hakuun ei koskettu.
* `js/laattapyramidi.js` — ovet `pyramidinReliefinValoliuku`,
  `pyramidinReliefinSavy`.
* `js/pallolaatat.js` — `maalaaAstronautinValoliuku` (uusi vienti),
  liu'un maalaus laatan kankaalle, sävy laatan materiaalille, mittari
  `valoliukuja`.
* `tools/savukkeet/savuke-astro-webkit.mjs` — VARTIO 5 (kaistat, valon
  kaari, pohjatiedosto, tuomio), `LAASTARIN_KUVA`.
* `tests/reliefipyramidi.test.mjs` — kolme uutta testiä.
* `tests/pallolaatat.test.mjs` — tuontilistavartio tuoreeseen muotoon.

## 6. MITÄ JÄI

1. **Terävyyden kynnys lukitsematta.** Edellisen erän ehdotus 12 on
   vanhentunut (ks. kohta 3). Ehdotus: `terävyys ≥ 2,0 × pohjan
   terävyys`, mitattu 2,14. Se vaatii pohjaluvun, joka nyt on jo
   pohjatiedostossa — yhden rivin lisäys vartio 5:n viereen.
2. **Vertailu topografialinssiin (Raamatun väite × 0,9)** on yhä
   ajamatta. Se on oma pieni eränsä `savuke-topografialinssi.mjs`:n ja
   tämän savukkeen väliin.
3. **WEBKIT-LUVUT — TÄRKEIN AVOIN.** Savuke ei pääse WebKitillä edes
   sivun latauksen läpi (ks. kohta 3). Korjaus on
   `waitUntil: 'domcontentloaded'` + odotus pallodiagin
   `avaruus-valmis`-riviin. Omistajan päälaite on iPhone.
4. **Laastarin z jäi z5:een** mittausnäkymässä, vaikka pyydetty korkeus
   oli 0,14 (sama havainto kuin edellisessä erässä; syy on linssin oma
   zoomiraja). Laastari on siis TARKEMPI kuin mitattu, jos pelaaja pääsee
   lähemmäs.

## 7. VIEREISET HAVAINNOT (EI KORJATTU)

1. **fps putosi 32,4:stä 21,3:een** tässä ajossa — mutta myös pohja-ajo
   oli 32,4 eikä edellisen erän 79,8, joten luku on Mac Studion sen
   hetkisen kuorman eikä laastarin. Kolme selainta ja testiajo olivat
   päällä yhtä aikaa. fps kannattaa mitata uudestaan rauhallisessa
   koneessa ennen kuin siitä tehdään vartiota.
2. `savuke-astro-webkit.mjs` **kaatuu `EADDRINUSE`en**, jos edellinen ajo
   on jäänyt kuuntelemaan porttia; savuke ei vapauta porttia siististi
   aikakatkolla. Yksi `palvelin.close()` lopussa (tai `PORTTI=0`)
   riittäisi. Tämä osui tähän erään: ensimmäinen WebKit-yritys jätti
   kuuntelijan porttiin 8831, ja toinen yritys tarvitsi uudet portit.
3. `avaaLinssiEleella` maksoi tässäkin **30 s** (Playwrightin napautukset
   raskaalla WebGL-sivulla). Sama havainto kuin edellisessä erässä:
   `ui.valitseLinssi` suoraan olisi mittauksissa nopeampi.
4. Edellisen erän havainto 1 (useamman kotelon `goto`-aikakatko 30 s) on
   yhä voimassa; kiertotie on `KOTELOT=iphone`.
