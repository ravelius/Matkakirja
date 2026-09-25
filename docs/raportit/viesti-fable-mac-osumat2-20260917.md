# Mac-osumat 2: Pariisin lähizoomi 74/74, nostolaput 7/8

Opus-agentti, 17.9.2026 klo 21.10 Suomen aikaa. Haara
`claude/bold-ride-vow4ki-mac-osumat2` (origin/main f37d4102, v1932).

## Luvut

| Savuke | Ennen (Mac, run 35237332631) | Jälkeen (Mac Studio, tämä ajo) |
| --- | --- | --- |
| savuke-pariisi-lahizoom | 69/74 (4, 4b, 7c × 2 ruutua punaisena) | **74/74** |
| savuke-pallo-nostolaput | 6/8 (vartio 6 punainen) | **7/8** (vartio 6 vihreä; jäljellä vartio 2, vanha punainen) |
| `node --test tests/*.test.mjs` | — | pass 3572, fail 0, skipped 13 |

## Juurisyy — yksi, ei kolmea

Instrumentointi (uusi `lauta.viimeinenNapautus()`) kirjasi ne asteet,
jotka kirjasto antoi pelille jokaisesta napautuksesta. Kolme peräkkäistä
vartion 4 napautusta kirjautuivat **tasan yhden askeleen jäljessä**:

```
napautus nosto-maalehti-braille:            pelille 48,4963,2,2764 (kohde 48,2689,2,0522)
napautus nosto-maalehti-tour-de-france-1903: pelille 48,2638,2,0498 (kohde 49,4175,2,6138)  <- braillen kohde
napautus nosto-maalehti-bouquinistit:        pelille 49,4211,2,6156 (kohde 48,0760,2,0522)  <- tourin kohde
```

Playwrightin `mouse.click(x, y)` tuottaa siirron ja painalluksen samassa
kehyksessä. globe.gl säteittää osoittimen paikan kehyksessä ja käyttää
klikissä **viimeksi säteitettyä** osumaa, joten klikki luki yhä edellisen
pisteen. Napautus osui siis oikeaan pikseliin mutta väärään kohtaan
pallolla. Sama yksi vika selittää kaikki neljä oiretta:

- **4** *"ei korttia"* — napautus meni edellisen kohteen asteisiin.
- **4b** *"kohtia 0 / 5"* — aihemerkin napautus käytti kyltin vanhaa
  pistettä, joten viuhka ei avautunut lainkaan.
- **6 (nostolaput)** Transfăgărășanin napautus avasi Strousbergin:
  Strousberg oli edellinen kohde. **Ladonnan limitystä ei ole**, eikä
  osumasääntö valinnut väärin — v1932:n tasapelimitta (oma muste) on
  kunnossa.
- **7c** *"ei mitään"* — tässä syy oli toinen (alla).

## 7c: auki jäänyt viuhka nielaisi napautuksen

Esitilan luenta näytti, että kyltin napautushetkellä kartalla oli auki
jäänyt viuhka tai kortti. Lauta nielaisee silloin napautuksen omissa
porteissaan (`viuhkaAuki`, `korttiOliAuki`) eikä avaa mitään. Savuke
siivosi tilan vasta napautuksen JÄLKEEN. Nyt `napautaKylttia` odottaa
vapaan pisteen ennen napautusta — 7c on vihreä molemmilla ruuduilla.

## Mitä muutin

**Pelikoodi (js/pallolauta/lauta.js) — vain mittauskoukut, ei
käyttäytymismuutosta:**

- `lauta.napautusselitys(lat, lng)` — mitä osumasääntö valitsisi ja
  mitkä portit ovat auki. Pelkkä luenta.
- `lauta.viimeinenNapautus()` — asteet, jotka kirjasto antoi pelille.
  `napautaPintaan` kirjaa ne muuttujaan; mitään muuta se ei tee.

**VAATII VERSIONOSTON** (pelikoodi muuttui), mutta käyttäytyminen ei
muutu: molemmat ovat lisäyksiä, kutsujia ei ole pelissä. En ajanut
`tools/uusi-versio.mjs`.

**Savukkeet:**

- `savuke-pariisi-lahizoom.mjs`: `napauta()`-apuri (siirto → kaksi
  kehystä → painallus) kaikkiin viiteen napautukseen;
  `odotaAsettunut()` lukee merkin pisteen vasta kun sama laatikko tulee
  kahdesti; `esitila()` ja `jalkitila()` kirjaavat lokiin portit,
  `elementFromPoint`-elementin, osumasäännön valinnan ja pelille menneet
  asteet; `napautaKylttia` siivoaa kartan ENNEN napautusta.
- `savuke-pallo-nostolaput.mjs`: sama siirto-ennen-painallusta vartion 6
  napautukseen.

## Auki

- `savuke-pallo-nostolaput` vartio 2 (*"limityksiä 2"*) on vanha
  punainen, ei tämän erän aihe.
- Sarjat.jsoniin, Raamattuun tai muihin savukkeisiin en koskenut.
