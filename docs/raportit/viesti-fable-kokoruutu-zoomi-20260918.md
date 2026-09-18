# Viesti Fablelle: kokoruudun zoomi täyttää ylä- ja alaosan

**Erä:** PAATOKSET 34 kohta 18 h (TARKENNUS 2 b), omistaja 18.9.2026:
*"Ylä ja alaosa täyttyy kun käyttäjä zoomaa sisään"*.
**Haara:** `claude/bold-ride-vow4ki-kokoruutu-zoomi`
**Versiota EI nostettu** (Fable julkaisee).

## Mitä tehtiin

### 1. Juurisyy oli toinen kuin tehtävänannossa oletettiin

Tehtävänanto oletti, ettei kokoruudun kloonilla ole zoomikonetta lainkaan.
Mitattu tilanne: **kone oli jo kytketty** (`js/nahtavyydet.js:1560`,
`kytkeKarttaZoom(ui, iso, lava, isoNapit, ydin, { zoomMuuttui: levita })`,
22.8.2026 alkaen), ja kehyksen levitys tyhjän päälle (`levita`) toimi.
Nipistys, rulla, tuplanapautus, panorointi ja kohteen napautus olivat
kokoruudulla jo olemassa — niitä ei vain ollut mitattu, eikä omistajan
vaatimusta ollut kirjattu vartioksi.

Ainoa todellinen puute oli **zoomin yläraja**. `js/karttazoom.js` piti
kattoa vakiona 3, ja kokoruudun ikkunan korkeus on
`min(näkyvä × 0,98, kartan lepokorkeus × kerroin)`. Ylä- ja alaosa
täyttyvät siis vasta kertoimella `näkyvä × 0,98 / lepokorkeus`:

| Ruutu | Kartan lepokorkeus kokoruudulla | Vaadittu kerroin |
|---|---|---|
| 390 × 844 (omistajan iPhone-mitta) | 291 px | **2,84** |
| 430 × 932 (isompi iPhone) | ~321 px | **2,85** |
| 390 × 844, jos kartan kuvasuhde olisi 1,8 | 212 px | **3,90** |

390 px:llä vakio 3 siis riittää niukasti, mutta se on sattuma: katto ei
saa olla vakio, kun ikkunan mitat ja kartan kuvasuhde elävät. Katto
annetaan nyt kutsujalta.

### 2. Muutokset

**`js/karttazoom.js`** — `SUURIN`-vakio (3) korvattiin `ylaraja()`
-funktiolla. Katto luetaan `ohjain.suurin`-kentästä, joka saa olla luku
tai **funktio** (ruudun kääntö muuttaa arvoa kesken katselun).
Peruskatto 3 on yhä pohja: jos kutsuja ei anna kattoa tai antaa
pienemmän, yläraja on tasan entinen. **Arkin kartta ei anna kattoa,
joten lehden kartan zoomi ei muutu pikselinkään verran.**

**`js/nahtavyydet.js`** (`avaaKarttaSuurennos`) — uusi `ruudunKatto()`
laskee `(näkyvä korkeus × 0,98) / (ydinrajauksen lepokorkeus lavalla)`
ja annetaan `kytkeKarttaZoom`in ohjaimeen `suurin`-kenttänä.

**`tools/savukkeet/savuke-kaupunkipopup.mjs`** — uusi **vartio 13**
(viisi väitettä) `nähtävyysnäkymä`-osioon vartion 12 perään. Ei uutta
savuketta: erä mahtui olemassa olevaan, jossa kokoruutuvartiot jo
asuvat. `tools/savukkeet/sarjat.json` ei siis muuttunut (savuke on jo
julkaisusarjassa kahtena rivinä, `#390` ja `#1400`).

### 3. Ele on aito nipistys

Playwrightilla ei ole nipistyselettä, joten savuke lähettää kehykseen
**kahden sormen kosketustapahtumat** (`touchstart` → 4 × `touchmove` →
`touchend`, `Touch`-oliot `touches`-listassa). Tämä on tarkoituksella
sama koodipolku, jota `js/karttazoom.js` lukee omistajan iPhonella:
widget ei lue nipistystä osoitintapahtumista, koska iOS peruu ne kesken
eleen. Nappireitti ei olisi todistanut mitään — kokoruudun kloonillakin
on +/- -painikkeet, mutta nähtävyyskartalla ei (kohta 18 g), eikä
sormi käytä niitä. Panorointi ja kohteen napautus mitataan aidoilla
hiiren eleillä samasta zoomatusta tilasta.

## Mittausluvut (390 × 844, Pariisi, nähtävyysnäkymä, Chromium)

| Mitta | Arvo |
|---|---|
| Kokoruudun avaus, kortin leveys | **382 px / 390 px = 98 %** (leveyteen sovitettu) |
| Kartan kehys avattaessa | 291 px (34 % ruudusta — kuvasuhteen laki) |
| Lava avattaessa | 611 × 462 px (Pariisin kartta on laajennettu) |
| Kerroin nipistyksen jälkeen | **3,0** (katto; 390 px:llä ruudun vaatima 2,84) |
| **Lavan rajaus zoomattuna** | **1386 px = 164 % näkyvästä korkeudesta** (vaadittu ≥ 95 %) |
| **Kehys (näkyvä kartta) zoomattuna** | **829 px = 98 % näkyvästä korkeudesta** (vaadittu ≥ 95 %) |
| Panorointi (raahaus 120 px vasemmalle) | lavan vasen reuna **−721 → −841 px** |
| Kohteen napautus zoomattuna | piirros suureni (`.kartta-kohdevalinta`) ja toinen napautus avasi kohteen arkin |

Ylä- ja alaosa siis täyttyvät: kartta on zoomattuna 164 % ruudun
korkeudesta ja näkyvä ikkuna 98 % — mustaa reunusta ei jää.

**Pystypanorointi on katossa tarkoituksella nolla:** kehys kasvatetaan
tasan niin korkeaksi kuin zoomattua karttaa riittää, joten kartta on
pystyssä täsmälleen ikkunan mittainen. Vaakasuunnassa karttaa on
moninkertaisesti yli, ja siellä raahaus liikkuu (mitattu yllä).

## Savukkeen tila

`SAVUKE_RUUTU=390 node tools/savukkeet/savuke-kaupunkipopup.mjs`
→ **41/44 vartiota läpi.** Uudet viisi vartiota kaikki vihreitä.

Kolme punaista ovat **ennestään punaisia eivätkä liity tähän erään**
(sama kolmikko punaisena myös ensimmäisessä ajossa ennen savukkeen
korjausta, ja ne kaatuvat ennen kuin mikään karttakoodi ajetaan):

1. `Marseille @ 390 px: kaupunkimerkin napautus avaa liuskan eikä isoa pop-upia`
   — *liuskan rivit: ei yhtään*. Marseillen kaupunkimerkin napautus ei
   avannut liuskaa lainkaan; Pariisilla sama vartio on vihreä.
2. `Marseille @ 390 px: liuskan yläryhmä on 3 riviä` — seuraus 1:stä.
3. `vastakoe 1: kuvaton kaupunki avaa pop-upin silti` — seuraus 1:stä
   (vastakoe napauttaa samaa merkkiä).

Nämä näyttävät joko Marseille-kohtaiselta virheeltä liuskan avauksessa
tai pallolaudan ajoitusflakelta (savuke ei yritä Marseillen merkkiä
uudelleen samalla logiikalla kuin rivin napautusta). **En korjannut
niitä** — Kustannuskuri kohta 1.

Yksikkötestit: `node --test tests/*.test.mjs` → **# pass 3625, # fail 0**
(3638 testiä, 13 skipattu). `node tools/build-standalone.mjs` → OK,
dist 32 651 kt. Uusia moduuleja ei tullut, joten MODULES-listaan ja
`sw.js`:n SHELLiin ei koskettu.

## WebKit-näkökulma (omistajan päälaite on iPhone)

- `.kartta-suurennos .kartta-kehys` on jo `touch-action: none`
  (css/styles.css), ja `js/karttazoom.js` kutsuu `preventDefault()`
  jokaisessa kahden sormen `touchmove`ssa — se on ainoa asia, joka
  pysäyttää Safarin oman sivunzoomin. Klooni perii säännön luokistaan,
  eli kokoruutu on tässä samalla viivalla kuin arkin kartta.
- Uusi katto ei koske kosketuspolkuun mitenkään: `ylaraja()` on vain
  luku, jolla `rajaa` leikkaa kertoimen. Nipistyksen, rullan,
  tuplanapautuksen ja näppäimistön reitit ovat entiset.
- **Mittaamatta jäi oikea WebKit:** ajo tehtiin Chromiumilla, koska
  savuke on Chromium-savuke. Nipistys mitattiin kuitenkin juuri sitä
  koodipolkua pitkin, jota iOS käyttää (kosketustapahtumat), joten
  riski on pieni mutta ei nolla — puhelintesti kannattaa tehdä.

## Viereiset havainnot (EN korjannut)

1. **Raahaus ei ala kohteen piirroksesta.** `js/karttazoom.js`
   ohittaa `pointerdown`in, jos `e.target.closest('button, a')` osuu —
   linjaus on vanha ja perusteltu (raahaus kaappaa osoittimen, eikä
   kaapatun osoittimen napsautus enää osu nappiin, jolloin kohteen
   avaaminen kuolisi). Kokoruudulla kolminkertaisessa zoomissa
   piirrokset ovat kuitenkin isoja: **kehyksen keskipiste osui
   mitattuna suoraan yhteen piirrokseen**, eikä raahaus siitä
   lähtenyt. Savuke hakee siksi otteen ruudulta (lähin kohta keskestä,
   jossa päällimmäisenä on kartta). Sormella tämä näkyy siltä, että
   panorointi ei joskus lähde ensimmäisestä otteesta. Korjaus olisi
   aloittaa raahaus myös napilta mutta jättää `setPointerCapture`
   tekemättä ennen 4 px:n kynnystä — oma eränsä, oma vartionsa.
2. **Marseillen liuska ei aukea savukkeessa** (ks. yllä) — kolme
   punaista vartiota odottaa omistajaa tai omaa erää.
3. Kokoruudun kloonilla on yhä `+`/`−` -painikkeet
   (`kartta-suurennos-tyokalut`), vaikka arkin nähtävyyskartalta ne
   poistettiin kohdassa 18 g. Ne eivät ole ristiriidassa kirjatun
   päätöksen kanssa (päätös koskee arkin karttaa), mutta jos omistaja
   haluaa kokoruudunkin ilman nappeja, se on yhden rivin muutos.

## Mitä jäi

- Puhelintesti oikealla iPhonella (WebKit) — Chromium-mittaus on
  vihreä, mutta omistajan laitteella ele ei ole vielä mitattu.
- 1400 px:n ruutu: uusi vartio 13 ajetaan vain 390 px:llä
  (`if (ruutu.width === 390)`), koska työpöydällä vaakakartta täyttää
  korkeuden jo lepotilassa eikä väite tarkoita siellä mitään.
- Versionosto ja julkaisu (Fable).
