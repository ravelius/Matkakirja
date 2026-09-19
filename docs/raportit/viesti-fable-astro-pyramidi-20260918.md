# Viesti Fablelle: Astronautin kamera piirtää reliefipyramidista (18.9.2026, Opus-agentti)

Erä: Raamattu **KARTTAUUDISTUKSEN PAATOKSET 41 kohta 4** ja
**ASTRONAUTIN KAMERA LISAYS 16 kohta 47**. Omistaja sanatarkasti
(iPhone-kuva "Italian saapas yöllä", sumea): *"Tuleeko tarkempi
topografia myos tahan avaruuslinssiin?"* — **Tulee.**

Haara `claude/bold-ride-vow4ki-astro-pyramidi` (pohja
`claude/bold-ride-vow4ki-v1947`). Versiota EI nostettu, PR:ää ei avattu.
Toisen agentin erä (avomeri/napa/aukot, `js/reliefipyramidi.js`
meripeitto ja savuke-topografialinssi) ei ollut kosketuksissa tämän
kanssa: `meripeitonBitit` ja `MERIVARI` ovat ennallaan, lisäykset ovat
omia funktioita moduulin loppupäässä.

---

## 1. KYTKENTÄ — YKSI LAATTAKONE, EI KOPIOTA

Astronautin kamera ei saanut omaa laatastoaan. Se nostaa saman lipun
kuin topografialinssi, mutta kertoo samalla KUKA piirtää:

```
asetaReliefiLinssi(true, 'astronautti')   // js/linssit/satelliitti-avaruus.js
```

Siitä seuraa kolme asiaa, kaikki jo olemassa olevassa koneessa:

1. **Laatasto piirtyy pallolle.** `reliefiKaytossa()` on tosi, joten
   pallon oma laattakerros (`js/pallolaatat.js luoLaattakerros`, sama
   kuin pääkartalla ja topografialinssillä) latoo reliefilaatat
   z0–z7 näkyvälle ikkunalle. Yhtään uutta geometriaa, kangasta tai
   noutokirjanpitoa ei kirjoitettu.
2. **Pelin muste jää pois.** `pyramidinKerrostasot` palauttaa
   astronauttitilassa `[reliefi]` — ei rantaa, ei reittiverkkoa, ei
   poltettuja nimiöitä. Astronautin ikkunasta ei näy kartografiaa, ja
   kolme hakua ja kolme drawImagea laattaa kohti jää tekemättä.
3. **Sävy on sama kuin pohjalla.** Kangas saa `saturate(0.8)` —
   täsmälleen sen kertoimen, jolla linssi latoo oman
   4k-pallotekstuurinsa (`kyllaisyysAlas`) — joten laastarin reunalla
   ei ole sävyrajaa. Jos kankaan suodatinta ei ole (vanha WebKit),
   laatta piirtyy täydellä kylläisyydellä eikä jää piirtämättä.

**Laastari on päällä vain lähizoomissa.** `piilotaKarttapinnat` on
sulkenut laattakerroksen linssin ajaksi 12.9.2026 alkaen; nyt se
kysyy joka kehyksellä, kannattaako laastari, ja avaa kerroksen vain
silloin. Kynnys on sama ajatus kuin topografialinssin
tarkennuslaastarin `perusTiheys`: ruudun tarve (px/aste) kameran
korkeudesta vs. pohjatekstuurin oma tiheys (4 096/360 = 11,4
puhelimella, 8 192/360 = 22,8 leveällä ruudulla), hystereesi 1,15.
Kaava on `H / (53,43 · korkeus)` — globe.gl:n kamera on säteellä
R(1+korkeus) ja fov on pystysuunnan 50°. **Avausnäkymässä laastaria ei
siis ole lainkaan:** astronautin sininen pallo on täsmälleen se, joka
oli, eikä yhtään laattaa haeta. Kytkentä on reunatapahtuma (lukko auki
/ kiinni + yksi `kokoa`), ei joka kehyksen työ.

Sulussa lippu lasketaan ja kerros kootaan kerran, jotta reliefilaatat
mitätöityvät eivätkä jää pelin seepiakartan päälle (sama kaava kuin
topografialinssin `pura`ssa).

## 2. MITTAUS — ENNEN JA JÄLKEEN, SAMA NÄKYMÄ

Mitta on savukkeessa (`tools/savukkeet/savuke-astro-webkit.mjs`, uusi
ympäristömuuttuja `LISAPARAMIT`). "Ennen" on sama ajo lipulla
`?reliefipyramidi=0` eli vanha 4k-polku; "jälkeen" on oletus. Näkymä
on Italia (41,6 N / 14,6 E), kotelo iPhone 390 × 844 dpr 3,
Chromium 1234, laatat ämpäristä Noden välityksellä.

| mitta | ennen (4k) | jälkeen (pyramidi) |
| --- | --- | --- |
| **terävyys** (reunojen gradienttisumma, ruudun keskiö 60 %) | **5,34** | **19,55** |
| fps (rAF, 2 s) | 79,8 | **76,9** |
| JS-kasa | 237 Mt | **258 Mt** |
| laattakerroksen GPU-tavut | 33 554 424 | **27 962 020** |
| reliefilaattapyyntöjä | 0 | 20 |
| ensimmäinen reliefilaatta | — | **13 ms** |
| seepiapohjan pyyntöjä | 0 | **0** |
| valittu taso | (kerros suljettu) | z5, 20/20 laattaa valmiina |
| materiaalin väri sulun jälkeen | 999999 | **999999** (ei mustaa) |

**Terävyys 3,7-kertaistui** (19,55 / 5,34 = 3,66). Luku toistui
vastakokeessa (toinen istunto, sama näkymä): **19,53**, fps 87,3,
ensimmäinen reliefilaatta 33 ms, seepiapyyntöjä 0, taso z5, 20/20
laattaa valmiina — eli mitta ei ole yhden ajon sattumaa. Raamatun väite on
"≥ topografialinssin sama näkymä × 0,9"; sitä vertailua EI ajettu
(ks. kohta 5), mutta laastari lukee TÄSMÄLLEEN samat laatat samalta
tasolta samalla koneella kuin topografialinssi, joten ero voi tulla
vain kylläisyyskertoimesta 0,8 ja linssin varjokalvosta.

**Muisti ja fps ovat rajoissa.** JS-kasa +21 Mt, ja
laattakerroksen GPU-tavut itse asiassa PIENENIVÄT (33,6 → 28,0 Mt),
koska astronauttitilassa laattaa kohti ladotaan yksi kerros kolmen
sijaan. fps 76,9 ≥ 50. **Tasokattoa ei siis tarvittu** —
`ASTRONAUTIN_SYVIN_Z` on `null` (ei omaa kattoa), ja jos puhelimen
muisti joskus ylittää rajan, katto lasketaan siitä yhdestä vakiosta
eikä laattakoneeseen kosketa.

**Musta pallo -juurisyy (globe.gl Color(0)) ei rikkoutunut:**
materiaalin väri on `999999` sulun jälkeen kaikilla viidellä
näytteellä (0/50/200/1000/2500 ms) molemmissa ajoissa, pisteitä 64/64,
puute "ei", sivuvirheitä 0.

**Kaappaukset** (390 px, Italian saapas yöllä):

* ennen: `tools/savukkeet/kaappaukset/astro-pyramidi/astro-laastari-chromium-iphone-1-ennen-20260918.jpg`
* jälkeen: `tools/savukkeet/kaappaukset/astro-pyramidi/astro-laastari-chromium-iphone-1-jalkeen-20260918.jpg`
* koko linssin 15 s: `…/astro-webkit-chromium-iphone-1-20260918.jpg`
* JSON: `…/astro-webkit-mittaus-20260918.json`

Ero näkyy kaappauksissa paljaalla silmällä: Alppien rinteet, Apenniinit
ja Korsikan vuoret ovat "jälkeen"-kuvassa eriteltyjä, "ennen"-kuvassa
ne ovat tasaista vihreää sumua.

## 3. SAVUKKEEN TILA

`savuke-astro-webkit.mjs` sai neljä uutta mittaa samaan ajoon
(terävyys, ensimmäinen reliefilaatta, seepiapyynnöt, muisti/fps) ja ne
tulostuvat rivillä `LAASTARI Italia: …` sekä `laastari`-kenttänä
JSONissa. **Vartioita (punainen/vihreä) EI vielä kirjoitettu** —
mitat ovat lukuina, koska kynnykset kannattaa lukita vasta kun sama
ajo on nähty myös WebKitillä (ks. kohta 5).

Chromium iPhone, yksi avaus, molemmat polut: **ei sivuvirheitä, ei
linssivirhe-ilmoitusta, pisteitä 64/64, vartija `puute=ei`.** WebKitillä
savuke ei saanut peliä auki lainkaan (ks. kohta 5.1).

Savukkeen `goto`-korjauksen jälkeen ajettiin Chromiumilla vastakoe, jotta
harness jää varmasti toimivaksi: luvut yllä, `VÄRI SULUN JÄLKEEN
999999` kaikilla näytteillä, ei sivuvirheitä.

`node --test tests/*.test.mjs`: **# pass 3641 / # fail 0** (13 skipped)
— kaksi lähdevartiota päivitettiin tuoreeseen muotoon
(`tests/pallolaatat.test.mjs` tuontilista, `tests/pallolepokerros.test.mjs`
`lepokerroksenKerrokset`in kaksi uutta kenttää). Ei uusia testejä.
`node tools/build-standalone.mjs`: ok (32 745 kt). Uusia moduuleja ei
tullut — `js/reliefipyramidi.js` oli jo MODULESissa.

## 4. MUUTETUT TIEDOSTOT

* `js/reliefipyramidi.js` — linssitila (`asetaReliefiLinssi(paalla, tila)`,
  `reliefinLinssitila`, `reliefiAstronautilla`), astronautin
  kylläisyyssuodatin, oma tasokatto (`ASTRONAUTIN_SYVIN_Z`, nyt null) ja
  laastarin kynnys (`ruudunTarvePxAste`, `astronautinLaastariKannattaa`).
  Meripeittoon, MERIVARIin ja luettelon hakuun ei koskettu.
* `js/laattapyramidi.js` — `pyramidinKerrostasot` palauttaa
  astronauttitilassa pelkän reliefitason; uudet ovet
  `pyramidinReliefiAstronautilla`, `pyramidinReliefinSuodatin`.
* `js/pallolaatat.js` — `lepokerroksenKerrokset` sulkee merkkitasot
  astronauttitilassa ja välittää kankaan suodattimen; kangas latoo
  laatan suodattimen läpi ja nollaa sen piirron jälkeen.
* `js/linssit/satelliitti-avaruus.js` — lipun nosto/lasku,
  laastarin kynnys, `piilotaKarttapinnat` avaa laattakerroksen
  laastarin ajaksi (uusi `nakyviin`, mittarit `laastarilla`,
  `laastarikehyksia`).
* `tools/savukkeet/savuke-astro-webkit.mjs` — `LISAPARAMIT`,
  terävyysmitta, fps- ja muistiluenta, laattapyyntöjen laskuri,
  ennen/jälkeen-kaappaukset.
* `tests/pallolaatat.test.mjs`, `tests/pallolepokerros.test.mjs` —
  lähdevartiot tuoreeseen muotoon.

## 5. MITÄ JÄI

1. **WebKit-luvut puuttuvat — WebKit ei saanut peliä auki lainkaan.**
   Kaksi ajoa (`SELAIMET=webkit KOTELOT=iphone`, WebKit 26.5 Mac
   Studiolla) päättyi ennen linssin avausta, eikä kummastakaan saatu
   yhtään laastarin lukua:

   * ajo 1: `page.goto` aikakatkaisi Playwrightin 30 s:n oletukseen;
   * ajo 2 (katko nostettu 60 s:iin): `load` ei lauennut 60 s:ssä
     sielläkään, ja kun savuke navigoi varareitille, **WebKit sulki
     sivun kokonaan** (`Target page, context or browser has been
     closed`). Varareitti muutettiin tämän jälkeen sellaiseksi, ettei
     se navigoi uudestaan vaan jatkaa siitä, mikä on — toinen `goto`
     samaan osoitteeseen purkaa WebGL-kontekstin kesken alustuksen.

   **Vika ei ole tämän erän koodissa** vaan mittausympäristössä: peli ei
   ehdi `load`-tapahtumaan WebKitissä tällä koneella, eikä laastarin
   koodia päästy edes ajamaan. Tämä on sama oire, joka
   reliefi-veloissa (18.9.) kierrettiin `savuke-topografialinssi.mjs`:n
   omalla `--webkit`-polulla — se ajo MENI läpi, joten kierto on
   olemassa ja se kannattaa kopioida tähän savukkeeseen omana
   eränään. Huomaa myös, että **WebKitissä ei ole
   `performance.memory`a**, joten muistiluku jää sielläkin nulliksi.
   Raamatun väite "muisti/fps rajoissa WebKitillä" on siis yhä
   mittaamatta.
2. **Vertailu topografialinssiin (Raamatun väite × 0,9).** Vaatii
   saman näkymän ajamisen kummallakin linssillä samassa istunnossa;
   se on oma pieni eränsä `savuke-topografialinssi.mjs`:n ja tämän
   savukkeen väliin.
3. **Vartioiden kynnykset lukitsematta.** Ehdotus lukuina: terävyys
   ≥ 12 (mitattu 19,55, vanha polku 5,34), ensimmäinen reliefilaatta
   < 300 ms (mitattu 13 ms), seepiapyyntöjä = 0 (mitattu 0), fps ≥ 50
   (mitattu 76,9).
4. **Laastarin z jäi z5:een** mittausnäkymässä, vaikka pyydetty korkeus
   oli 0,14. Syy on todennäköisesti linssin oma zoomiraja
   (`ZOOMIN_LAHIN`, `lauta.zoomirajat`), joka kiristää kameran
   korkeuden ennen kuin laattakerros mittaa sen — eli laastari on
   TARKEMPI kuin mitä nyt mitattiin, jos pelaaja pääsee lähemmäs.
   Tämä kannattaa mitata omana pikkueränä (z7 pitäisi olla saavutettavissa).

## 6. VIEREISET HAVAINNOT (EI KORJATTU)

1. `savuke-astro-webkit.mjs` **kaatui `goto`-aikakatkoon** (Playwrightin
   30 s:n oletus) sekä WebKitin ensimmäisellä latauksella että
   Chromiumin toisella kotelolla. Juurisyy on savukkeen oman otsikon
   mukainen: estetyt ulkoverkon pyynnöt jäävät WebKitissä vireille, eikä
   `load` laukea siinä ajassa, vaikka sivu toimii. **KORJATTU TÄSSÄ
   erässä** (60 s + varareitti `domcontentloaded`; oikea vartija on joka
   tapauksessa sen jälkeen tuleva `waitForFunction(pallolauta)`).
2. `avaaLinssiEleella` maksoi mittauksessa **22 s** (Playwrightin omat
   napautukset raskaalla WebGL-sivulla). Se ei ole linssin aikaa, ja
   savuke kirjaa sen erikseen (`eleMs`) — mutta se tekee koko ajosta
   hitaan, ja kolmen napautuksen sijaan `ui.valitseLinssi` suoraan
   olisi mittauksissa nopeampi (ele-polku voisi olla oma väitteensä).
3. Astronautin kameran kaappauksissa näkyy `pallodiag`-loki ruudun
   alaosassa myös silloin kun se peittää kolmanneksen näkymästä;
   terävyysmitta on siksi rajattu keskiöön. Jos savuke joskus mittaa
   koko ruudun, loki on pantava pois (`?pallodiag=0`).
