# Nostokortti: galleria ja musiikki ensiluokkaisina + Rooman visan testi

*(Opus-työsessio → Fable, 14.9.2026. Haara `claude/era-nostokortti`.
Ei versionostoa, ei dist/:iä. Tilaus: erän 10 avoimet kohdat 11.1 ja
11.2. Lähteet: tehtävänanto, docs/raportit/viesti-fable-
karttauudistus-era10-20260913.md luvut 6 ja 11, CLAUDE.md,
docs/roolitus.md, Raamattu "Kaupungit" KARTTAUUDISTUS + PÄÄTÖKSET 1–6,
docs/moduulit/kaupunkilehti.md ja docs/moduulit/maalehti.md.)*

## 0. Lyhyesti

**11.1 on tehty ja kiertotie purettu.** Täkynoston kortti tuntee nyt
lehden noston `galleria`-kentän ja mediakentät (`aani`, `musiikki`,
`musiikkiNayte`, `esikuuntelu`) omina kenttinään. Galleria on **13
nostolla ja 25 lisäkuvalla**, mediarivi **kuudella nostolla**, ja
**viisi lehteen jäänyttä kaksoiskappaletta purettiin**.

**11.2 on tehty.** Rooman kulttuurivisalla on oma vartio
(tests/rooman-kulttuurivisa.test.mjs, 7 testiä): muoto, sisältö,
pisteytys ja lähdekytkös **ilman kaupungin nimen vartaloa**.

`npm test` **3335 testiä, # pass 3322, # fail 0** (skipped 13). Savuke
**209/209 läpi**. Punainen vastakoe ajettu ja kirjattu (luku 6).

**Ulkoasu ja minikysymykset ovat ennallaan.** Kuvaton ja yhden kuvan
nosto piirtyy merkilleen kuten ennen; uudet rivit syntyvät vain, kun
kenttä on olemassa.

---

## 1. Mikä kiertotie oli ja miksi se poistui

Erän 10 raportin luku 6 kirjasi kaksi sääntöä, jotka generaattori ajoi
itse — molemmat siksi, että **nostokortin datamallissa ei ollut paikkaa
lehden noston `galleria`- eikä mediakentille**:

1. **Galleria vietiin kohdekartan juttuun.** Siirtyvän noston
   `galleria`-kuvat ladottiin `NAHTAVYYSJUTUT`-merkinnän `kuvat`-listaan
   (js/packs/nahtavyysjutut.js). Kuvat säilyivät pelissä, mutta eivät
   kortilla — ja js/nahtavyydet.js näyttää jutusta enintään **viisi**
   kuvaa (`kuvat.slice(0, 5)`), joten `gaertnerin-berliini`in ja
   `goyan-kansankuvat`in **kuudes kuva oli datassa mutta ei
   pelaajalla**.
2. **Musiikki- ja äänikenttäinen nosto jäi lehden sivulle.** Viisi
   nostoa pidettiin kaupunkilehdessä kaksoiskappaleena pelkästään
   siksi, ettei linkille tai näytteelle ollut paikkaa kortilla.

Kiertotie poistui, koska **kortti sai kentille ensiluokkaisen tuen**:
`galleria` piirtyy nyt kortin omana selattavana kuvasarjana ja
mediakentät kortin omana rivinä, joka käyttää **samaa apuria kuin
lehden sivu** (js/ui.js `lisaaNostonNapit`). Kun paikka on, sekä jutun
viiden kuvan katto että lehden kaksoiskappale lakkasivat olemasta
välttämättömiä.

Sivutuotteena **kopioita ei syntynyt kolmatta**: skandaalikortin
selattava kuvasarja (js/skandaalit.js) nostettiin kortin yhteiseksi
toteutukseksi, ja skandaali kutsuu nyt samaa funktiota omilla
luokillaan ja omalla zoomiavaimellaan — ulkoasu, kuvaleveys ja
zoomiavain merkilleen entiset.

---

## 2. Korjauksen kohdat (tiedosto:rivi)

### Koodi

| tiedosto:rivi | mitä |
| --- | --- |
| js/fokusnosto.js:1283 | `nostonKuvat(nosto)` — `kuva` + `galleria` yhdeksi listaksi, kuvaton alkio karsitaan |
| js/fokusnosto.js:1316 | `piirraNostonKuvasarja(...)` — selattava kuvasarja: nuolet, laskuri, selite ja lähderivi vaihtuvat kuvan mukana; parametroitu luokilla ja zoomiavaimella |
| js/fokusnosto.js:1445 | `piirraNostonKuvat(...)` — yhden kuvan reitti muuttumaton, useampi kuva menee sarjalle |
| js/fokusnosto.js:1490 | `piirraNostonMedia(...)` — mediarivi `ui.lisaaNostonNapit`illa, syntyy vain jos kenttä on |
| js/fokusnosto.js:974–975 | `piirraNostonSisus` kutsuu kumpaakin; vanha `if (valmisKuva) … else if (nosto.kuva …)` poistui |
| js/skandaalit.js:62, 386–401 | `piirraSkandaalinGalleria` on nyt ohut kutsu yhteiseen toteutukseen |
| css/fokusnosto.css:863 | `.fokusnosto-media` — mediarivin taitto (napit itse tulevat css/styles.css:stä) |
| css/fokusnosto.css:883 ja ympärillä | `.nostosarja-kuvanuoli` / `.nostosarja-kuvalaskuri` / `.nostosarja-kuva` lisätty samoihin valitsinryhmiin kuin `.hetki-*` ja `.skandaali-*` — sama `--gallerian-reunakaista`, ei uutta lukua |

### Data (kiertotien purku)

| tiedosto | mitä |
| --- | --- |
| js/packs/fokusvirta-lontoo.js | `galleria` 1 nostolle (4 kuvaa); media `abbey-roadin-suojatie` |
| js/packs/fokusvirta-rooma.js | `galleria` 3 nostolle; media (`aani`) `rooman-kolikko` |
| js/packs/fokusvirta-berliini.js | `galleria` 3 nostolle (ml. 5 kuvan Gaertner); media `marlene-dietrich` |
| js/packs/fokusvirta-madrid.js | `galleria` 2 nostolle (ml. 5 kuvan Goya); media `chotis-laatalla` |
| js/packs/fokusvirta-wien.js | `galleria` 2 nostolle; media `tonava-kaunoinen` ja `taikahuilu-wiedenissa` |
| js/packs/fokusvirta-amsterdam.js | `galleria` 2 nostolle |
| js/packs/kulttuuri-kategoriat.js | viisi musiikkinostoa poistettu sivuilta; vanhentuneet kommentit (9 × "GALLERIAT SEURASIVAT MUKANA", 5 × "YKSI NOSTO JÄI … musiikki- tai äänikenttä") kirjoitettu uusiksi |

Kuvat ja mediakentät **siirtyivät merkki merkiltä**: gallerian alkiot
poimittiin lähdetekstinä lehden ja jutun listoista, ja siirto
todennettiin Nodessa `===`-vertailulla — **24/24 gallerian kuvaa** ja
**kaikki 6 noston mediakentät** täsmäävät alkuperäisiin (0 eroa).

**Kohdekartan jutun oma kuvalista jäi ennalleen.** Kuva on nyt samassa
asemassa kuin `kuva` jo oli: sama sisältö kahdella pinnalla, ei
kiertotie. Sen ansiosta Gaertnerin ja Goyan **kuudes kuva näkyy
kortilla**, vaikka juttu näyttää enintään viisi.

---

## 3. VANHA / UUSI — kortin todellinen sisältö

Otokset on tuotettu ajamalla kortti auki (`avaaNostonTunnuksella`,
"Lisää"-napautus) ja tulostamalla kortin elementtipuu. "VANHA" on sama
kortti, jolta `galleria`- ja mediakentät on riisuttu ajossa — eli
täsmälleen se, mitä pelaaja näki ennen tätä erää.

### 3.1 `gaertnerin-berliini` — galleria

```
===== VANHA
    <h3.fokusnosto-kortti-otsikko> "Gaertner maalasi Berliinin talo talolta"
    <figure.nostokuva-kehys>
      <button.nostokuva-nappi.nostokuva-nappi-zoom>
        <img.nostokuva-img>
      <figcaption.nostokuva-selite>
        <span.nostokuva-teksti> "Gaertnerin 1856 näkymässä Unter den Lindenin perällä on vielä kuninkaa…"
        <span.nostokuva-lahde> "Eduard Gaertner, Wikimedia Commons (Public domain)"
    <div.fokusnosto-teksti>
      <p> "Kun valokuvaa ei vielä ollut, Eduard Gaertner oli Berliinin kamera. En…"

===== UUSI
    <h3.fokusnosto-kortti-otsikko> "Gaertner maalasi Berliinin talo talolta"
    <figure.nostokuva-kehys.fokusnosto-kuva.nostosarja-kuva>
      <button.nostokuva-nappi.nostokuva-nappi-zoom>
        <img.nostokuva-img>
        <button.nostosarja-kuvanuoli.edellinen> "‹"
        <button.nostosarja-kuvanuoli.seuraava> "›"
        <span.nostosarja-kuvalaskuri> "1 / 6"
      <figcaption.nostokuva-selite>
        <span.nostokuva-teksti> "Gaertnerin 1856 näkymässä Unter den Lindenin perällä on vielä kuninkaa…"
        <span.nostokuva-lahde> "Eduard Gaertner, Wikimedia Commons (Public domain)"
    <div.fokusnosto-teksti>
      <p> "Kun valokuvaa ei vielä ollut, Eduard Gaertner oli Berliinin kamera. En…"
```

Otsikko, leipäteksti, lähderivi ja minikysymys ovat rivi riviltä samat.
Uutta on **kolme solmua saman kuvan päällä**: kaksi nuolta ja laskuri
`1 / 6`. Seuraava-nuoli vaihtaa kuvan, ja selite vaihtuu mukana
(savukkeen mittaus: `1 / 6 → 2 / 6`, selite eri).

### 3.2 `taikahuilu-wiedenissa` — musiikki ja galleria

```
===== VANHA
    <h3.fokusnosto-kortti-otsikko> "Taikahuilu tehtiin esikaupungin teatteriin"
    <figure.nostokuva-kehys>
      <button.nostokuva-nappi.nostokuva-nappi-zoom>
        <img.nostokuva-img>
      …

===== UUSI
    <h3.fokusnosto-kortti-otsikko> "Taikahuilu tehtiin esikaupungin teatteriin"
    <div.fokusnosto-media>
      <a.kulttuuri-musiikkilinkki>
      <button.kulttuuri-kuuntele>
    <figure.nostokuva-kehys.fokusnosto-kuva.nostosarja-kuva>
      <button.nostokuva-nappi.nostokuva-nappi-zoom>
        <img.nostokuva-img>
        <button.nostosarja-kuvanuoli.edellinen> "‹"
        <button.nostosarja-kuvanuoli.seuraava> "›"
        <span.nostosarja-kuvalaskuri> "1 / 2"
      …
```

Napit ovat lehden omia (`kulttuuri-musiikkilinkki` = "Apple Music",
`kulttuuri-kuuntele` = "Kuuntele musiikkia") — sama toteutus, samat
luokat, sama tyyli. Kuvakaappaus: `docs/raportit/kuvat/
nostot-media-taikahuilu-wiedenissa.png`.

### 3.3 Mitä lehdestä lähti

Viisi nostoa poistui kaupunkilehden sivulta, koska ne asuvat nyt
kartalla kokonaisina (teksti, kuva, galleria **ja** musiikki):

| kaupunki / osasto | poistunut nosto | kortilla nyt |
| --- | --- | --- |
| lontoo / kaupunki | "Suojatie, jota jonotetaan" | `abbey-roadin-suojatie` |
| rooma / kaupunki | "Kolikko olan yli" | `rooman-kolikko` |
| berliini / kaupunki | "Tyttö Schönebergistä lauloi maailman ympäri" | `marlene-dietrich` |
| wien / musiikki | "Kaupunki sävelsi oman jokensa" | `tonava-kaunoinen` |
| wien / musiikki | "Taikahuilu tehtiin esikaupungin teatteriin" | `taikahuilu-wiedenissa` |

**Madridin chotis jäi sivulle** — se on kaupungin kulttuurivisan
lähdejuttu, ei musiikkitapaus. Sen mediakentät ovat silti nyt myös
kortilla.

Osastot itse jäivät kaikki paikoilleen (lehtitehtävät on ankkuroitu
sivunumeroon). Wienin Musiikki-sivusta tuli tyhjä nostoista —
kaupunkilehdissä on jo ennestään 13 sellaista osastoa, joten muoto ei
ole uusi. **Tämä on ohuutta, joka kannattaa katsoa sisältöerässä.**

---

## 4. Testit

### 4.1 Uusi: tests/nostokortti-media.test.mjs (11.1) — 7 testiä

Mittaa kiertotien purun kahdelta puolelta, ja **kaatuu jos kiertotie
palautetaan**:

| testi | mitä mittaa |
| --- | --- |
| kohdekartan jutun kuvat ovat myös noston omalla kortilla | 66 kuvaa: jokainen juttuun sidotun noston jutunkuva on myös noston omassa kuvajoukossa |
| mediakenttäinen nosto ei jää lehteen kortin kaksoiskappaleeksi | jos sama otsikko on lehdessä ja kartalla, mediakenttien on oltava kortilla |
| erän 10 viisi musiikkinostoa asuvat kortilla eivätkä enää lehdessä | nimetty vartio raportin luvun 6 listalle |
| gallerian nosto saa kortille selailunuolet ja laskurin | kortti ladotaan oikeilla moduuleilla DOM-mallin päällä; laskuri `1 / 6` |
| kuvaton ja galleriaton nosto piirtyy kuten ennenkin | ei nuolia, ei mediariviä |
| musiikkinosto saa kortille mediarivin samoilla napeilla kuin lehti | `.fokusnosto-media`, linkki + nappi, ja apurille annetaan nosto sellaisenaan |
| ääninosto saa mediarivin myös ilman musiikkilinkkiä | `aani`-kenttä yksin riittää |

Kortti avataan **oikealla moduulilla** (`avaaNostonTunnuksella` +
"Lisää") pienen DOM-mallin päällä, samaan tapaan kuin
tests/nostokuva-kortit.test.mjs.

### 4.2 Uusi: tests/rooman-kulttuurivisa.test.mjs (11.2) — 7 testiä

| testi | mitä mittaa |
| --- | --- |
| kysymys, neljä vaihtoehtoa ja fakta | sama muotosääntö kuin tests/lehdet.test.mjs `tarkistaTehtava`: 4 eri vaihtoehtoa, `correct` 0–3, kysymys ja fakta olemassa, teksti ei mainitse palkkiota |
| oikea vastaus on painovoima, ei pumppu eikä ämpäri | sisältöregressio: kysymys koskee akvedukteja, vain yksi vaihtoehto puhuu painovoimasta, fakta perustelee kaltevuudella |
| avainsanoissa on muutakin kuin kaupungin nimi | **tämä on 11.2:n ydin**: visasta saadaan ≥ 3 sisältösanaa, kun "Rooma"-vartalot poistetaan |
| vastaus käsitellään pelin Rooma-sisällössä | kytkös mitataan ilman kaupungin nimeä koko Rooma-sisällöstä (lehti + kartan nostot); lähdejuttu on `aqua-virgo` ("Vesi kulkee yhä"), jonka tekstissä on sekä *akvedukti* että *painovoima* |
| palkitsee oikeasta kerran | `Game.actionKulttuuri` maksaa `KULTTUURI_PALKKIO` (25) kerran, toinen yritys ei mene läpi |
| ei maksa väärästä vastauksesta | väärä kirjataan, ei palkita, eikä uutta yritystä saa |
| jokainen vaihtoehto käyttäytyy oikein pisteytyksessä | koko nelivaihtoehtoinen lista ajetaan läpi omissa peleissään |

**Mitä 11.2:sta selvisi mittaamalla:** raportin havainto pitää
paikkansa ja on nyt tarkempi. `tests/lehdet.test.mjs` läpäisee Rooman
sanavartalolla `rooman` kansisivun nostossa "Norsu kantaa obeliskia".
Visan oikea lähdejuttu **ei ole lehdessä lainkaan** — se on erän 10
jäljiltä kohdekartan nosto `aqua-virgo`. Uusi testi mittaa kytköksen
sieltä ja hylkää kaupungin nimen osumaksi, joten se on vihreä oikeasta
syystä. **Kansisivun sisältöratkaisu on yhä Fablen** (siirretäänkö
"Vesi kulkee yhä" kannelle vai tiukennetaanko lehdet-testiä kaikkien
kaupunkien osalta) — sitä ei tehty, ks. luku 7.

### 4.3 Neljä olemassa olevaa vartiota päivitettiin

Nämä pinnoittivat vanhan rakenteen ja olisivat kaatuneet muutoksesta
eivätkä virheestä. Jokaisen muutos on kirjattu tiedostoon kommenttina:

| testi | muutos |
| --- | --- |
| tests/galleria.test.mjs | nuolialueen valitsinryhmään lisätty `.nostosarja-kuvanuoli` — sama `var(--gallerian-reunakaista)` |
| tests/kuvatekstit.test.mjs | js/skandaalit.js pois piirtopaikkalistalta: sen kuvatekstit piirtää nyt js/fokusnosto.js, joka on listalla |
| tests/nostokuva-kortit.test.mjs | `nayta(!valmisKehys)` -vartio osoittaa js/fokusnosto.js:ään, jossa gallerian runko nyt on |
| tests/sound.test.mjs | musiikkinäytteet luetaan nyt **kolmesta** paikasta (europe-kulttuuri, kategoriat, takynostot) — sama perustelu kuin testin omassa kommentissa jo oli kahdelle |

### 4.4 Numerot

```
npm test
# tests 3335
# pass  3322
# fail  0
# skipped 13
```

Muut tarkistukset:

```
node tools/tarkista-kaksoisavaimet.mjs   → ei kaksoisavaimia
node tools/tarkista-niputus.mjs          → 387 moduulia, 4203 julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs        → 1602 ui-viittausta, 404 metodia, 533 kenttää
grep -rn '^<<<<<<<' js css tests tools   → ei osumia
```

---

## 5. Savuke

Laajennettu `tools/savukkeet/savuke-kaupunkien-nostot.mjs` (erän 10 oma
savuke) neljällä uudella vartiolla (yhteensä 50 uutta väitettä). Ajo:

```
NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node tools/savukkeet/savuke-kaupunkien-nostot.mjs docs/raportit/kuvat
→ 209/209 läpi   (ennen laajennusta 159/159)
```

Uudet vartiot ja niiden osumat:

| vartio | väitteitä | mitä |
| --- | --- | --- |
| 7 + 7b | 26 | 13 gallerianostoa: kaksi nuolta, laskuri `1 / n`, ja nuoli vaihtaa kuvan **ja** selitteen |
| 7c | 6 | kaupungissa on oltava galleria- tai mediakenttäisiä nostoja — tyhjä silmukka ei mene läpi hiljaa |
| 8 | 6 | 6 mediaanostoa: mediarivi on kortilla, ja Apple Music -linkkejä täsmälleen niin monta kuin `musiikki`-kenttiä |
| 9 + 9b | 12 | kaupunkikohtainen vastakoe (ks. 6.1) |

Mitatut laskurit kaupungeittain:

```
lontoo     canaletto-lontoossa        1 / 5 → 2 / 5
rooma      colosseumin-kellari        1 / 2 → 2 / 2
rooma      minervan-norsu             1 / 2 → 2 / 2
rooma      rooman-nasone              1 / 2 → 2 / 2
berliini   gaertnerin-berliini        1 / 6 → 2 / 6
berliini   paavin-kosto               1 / 2 → 2 / 2
berliini   maailmankello              1 / 2 → 2 / 2
madrid     goyan-kansankuvat          1 / 6 → 2 / 6
madrid     madridin-kaksi-joukkuetta  1 / 2 → 2 / 2
wien       praterin-ratas             1 / 2 → 2 / 2
wien       taikahuilu-wiedenissa      1 / 2 → 2 / 2
amsterdam  amsterdamin-kissalaiva     1 / 3 → 2 / 3
amsterdam  amsterdamin-yovartio       1 / 2 → 2 / 2
```

Kuvat (`scale: 'css'`, kortti eikä koko ruutu):

- `docs/raportit/kuvat/nostot-galleria-gaertnerin-berliini.png` — kuusi kuvaa
- `docs/raportit/kuvat/nostot-galleria-goyan-kansankuvat.png` — kuusi kuvaa
- `docs/raportit/kuvat/nostot-galleria-taikahuilu-wiedenissa.png`
- `docs/raportit/kuvat/nostot-media-taikahuilu-wiedenissa.png` — galleria **ja** musiikki samalla kortilla
- `docs/raportit/kuvat/nostot-media-marlene-dietrich.png`

---

## 6. Vastakoe

### 6.1 Savukkeen sisäinen vastakoe (vartio 9)

Savuke avaa yhden kortin kaupunkia kohti niin, että `galleria`- ja
mediakentät on **poistettu ajossa** ja palautettu heti perään:

```
lontoo     vastakoe canaletto-lontoossa      riisuttuna nuolia 0, mediarivi false
rooma      vastakoe colosseumin-kellari      riisuttuna nuolia 0, mediarivi false
berliini   vastakoe gaertnerin-berliini      riisuttuna nuolia 0, mediarivi false
madrid     vastakoe goyan-kansankuvat        riisuttuna nuolia 0, mediarivi false
wien       vastakoe taikahuilu-wiedenissa    riisuttuna nuolia 0, mediarivi false
amsterdam  vastakoe amsterdamin-kissalaiva   riisuttuna nuolia 0, mediarivi false
```

Kortin leipäteksti säilyi joka kerta (`kappaleet > 0`), eli kortti ei
hajonnut — vain kentistä riippuvat osat katosivat. Vartio 9b tarkisti,
että kentät palautuivat ajon jälkeen.

### 6.2 Punainen ajo A: DATA palautettuna, koodi paikallaan

Kuusi fokusvirta-pakettia ja js/packs/kulttuuri-kategoriat.js
palautettiin `origin/main`-tilaan — eli galleria- ja mediakentät pois
korteilta ja musiikkinostot takaisin lehden sivuille — mutta uudet
testit, uusi koodi ja laajennettu savuke jätettiin paikoilleen.

| ajo | korjattu | data palautettuna |
| --- | --- | --- |
| tests/nostokortti-media.test.mjs | 7 läpi / 0 kaatui | **1 läpi / 6 kaatui** |
| savuke `berliini,wien` | 66/66 | **47/49** |

Kaatuneet väitteet, sanatarkasti:

```
not ok 1 - kohdekartan jutun kuvat ovat myös noston omalla kortilla
  lontoo/canaletto-lontoossa: kohdekartan jutun "Canaletto Lontoossa" kuva
  The Thames and the City Canaletto 46-47 National Gallery Prague.jpg
  ei ole noston omassa kuvajoukossa — galleria on taas kiertotiellä
not ok 2 - mediakenttäinen nosto ei jää lehteen kortin kaksoiskappaleeksi
not ok 3 - erän 10 viisi musiikkinostoa asuvat kortilla eivätkä enää lehdessä
  lontoo/abbey-roadin-suojatie: kortilta puuttuvat musiikki- ja äänikentät
not ok 4 - gallerian nosto saa kortille selailunuolet ja laskurin
  kuvasarjan kehys puuttuu kortilta
not ok 6 - musiikkinosto saa kortille mediarivin samoilla napeilla kuin lehti
  kortilta puuttuu mediarivi
not ok 7 - ääninosto saa mediarivin myös ilman musiikkilinkkiä
  kortilta puuttuu mediarivi

FAIL  7c. berliini: kaupungissa on galleria- tai mediakenttäisiä nostoja
      — galleriset 0, mediaiset 0
FAIL  7c. wien: kaupungissa on galleria- tai mediakenttäisiä nostoja
      — galleriset 0, mediaiset 0
```

Läpi meni vain "kuvaton ja galleriaton nosto piirtyy kuten ennenkin" —
juuri niin kuin pitääkin: se mittaa, ettei muutos koske kentättömiin
nostoihin.

**Vartio 7c syntyi tämän ajon takia.** Ensimmäinen punainen ajo antoi
savukkeelle 47/47 läpi, koska ilman kenttiä vartioiden 7–9 silmukat
jäivät tyhjiksi eivätkä väittäneet mitään. Savuke vaatii nyt, että
jokaisessa kaupungissa on vähintään yksi galleria- tai mediakenttäinen
nosto — tyhjä silmukka ei enää mene läpi hiljaa.

### 6.3 Punainen ajo B: KOODI palautettuna

Kun KOKO korjaus palautetaan `origin/main`-tilaan (js/fokusnosto.js,
js/skandaalit.js, css/fokusnosto.css, kuusi fokusvirta-pakettia,
js/packs/kulttuuri-kategoriat.js ja luvun 4.3 neljä päivitettyä
vartiota), `tests/nostokortti-media.test.mjs` ei käynnisty lainkaan:

```
SyntaxError: The requested module '../js/fokusnosto.js'
does not provide an export named 'nostonKuvat'
```

`npm test` antoi silloin **3329 testiä, # pass 3315, # fail 1** (koko
testitiedosto kaatuu yhtenä) — eli kaikki 7 väitettä menetetään.
Korjatussa tilassa vastaava luku on **3335 / 3322 / 0**.

Ero on siis se, mitä väitettiinkin: **ilman korjausta uudet vartiot
kaatuvat, korjauksen kanssa ne ovat vihreitä.**

---

## 7. Mitä EI tehty

Nämä olivat rajauksessa ulkopuolella tai ne ovat sisältö- tai
kaanonityötä, joka kuuluu Fablelle:

1. **Kainalokartat (11.3)** — Wienin "Keisarin aamiaishuone" ja
   Schönbrunnin rajaustarkistus. Ei koskettu.
2. **Amsterdamin ja Marseillen sisältötäydennykset (11.4)** — ei
   koskettu. Wienin Musiikki-sivu jäi tässä erässä tyhjäksi nostoista
   (luku 3.3), joten ohuita sivuja on nyt yksi lisää.
3. **Pääkartan 21 merkin raja (11.5)** ja **ITA-kohdekartan täyttyminen
   (11.6)** — ei koskettu; savuke mittaa yhä samat lähtötasot.
4. **Lähizoomiportti `nosto.lahi` (11.7.5)** — ei rakennettu.
5. **Rooman kulttuurivisan sisältöratkaisu.** Testi on kirjoitettu ja
   se mittaa kytköksen oikein, mutta **"Vesi kulkee yhä" on yhä
   kohdekartan nostona eikä kansisivulla**, ja tests/lehdet.test.mjs
   läpäisee Rooman edelleen sanavartalolla. Kumpikin raportin
   ehdottamista korjauksista (juttu kannelle / lehdet-testin
   tiukennus kaikille kaupungeille) on sisältö- tai kaanonipäätös.
6. **Pariisin kolme Apple Music -linkkiä (erä 5: Piaf, Django,
   Carmen).** Mekanismi on nyt olemassa, mutta linkkien palautus vaatii
   Fablen ratkaisun: erä 5 yhdisti Piafin ja Djangon **yhdeksi**
   nostoksi (`pariisi-soi`), ja nostolla on vain yksi `musiikki`-kenttä
   — kumpi linkki sinne tulee, tai tarvitaanko linkkilista, on
   sisältöpäätös. Carmenin linkki mahtuisi `carmenin-ensi-ilta`lle
   sellaisenaan. Linkit ovat yhä `git show 721efc3 --
   js/packs/kulttuuri-kategoriat.js` -diffissä.
7. **R2-ämpärin kuvajonon kuvat kortille** (`pariisin-vuosisadat`,
   `exchange-alleyn-kupla`). Erän 5 kohta 7.6: noston `osoite` on repon
   oma tiedosto, jonka olemassaolon tests/fokusvirta.test.mjs lukee
   levyltä. Rajoite on kuvatyötä eikä kenttätukea, joten uusi testi
   ohittaa nämä nimenomaisesti kommentoituna.
8. **Versionosto.** `tools/uusi-versio.mjs` ei ajettu, `js/main.js`,
   `sw.js` ja `js/muutokset.js` koskematta — Fable versioi ja julkaisee.

---

## 8. Fablen päätettäväksi

1. **Wienin Musiikki-sivu on nyt tyhjä nostoista.** Se on uudistuksen
   looginen seuraus (molemmat sen jutut ovat kartalla), mutta sivu
   lupaa johdannossaan valssia ja satuoopperaa. Jätetäänkö näin,
   kirjoitetaanko johdanto uusiksi, vai saako sivu uutta sisältöä?
2. **Rooman kulttuurivisan lähdejuttu** (kohta 7.5): kannelle vai
   lehdet-testin tiukennus?
3. **Pariisin musiikkilinkit** (kohta 7.6): mikä linkki mihinkin
   nostoon, vai tarvitaanko nostolle linkkilista?
