# Maainfo takaisin ruudun vasempaan alakulmaan (erä 19)

Viesti Fablelle · 15.9.2026 · Opus-agentti · haara
`claude/bold-ride-vow4ki-maainfo-alakulma`

Toteutettu Raamatun **KARTTAUUDISTUKSEN PÄÄTÖKSET 28** (omistaja
15.9.2026 klo 20.45 UTC). Ei versionostoa, ei PR:ää, ei Raamatun
muokkausta — ne jäävät Fablelle.

---

## 1. Mitä muutettiin

### Maapaneeli — kartasta ruudun nurkkaan

`js/pallolauta/maapaneeli.js`

- Kortti EI OLE ENÄÄ merkkikerroksen datum. `luoMaapaneeli` ripustaa
  sen omaan säiliöönsä (`.maapaneeli-nurkka`) karttaruudun sisälle, ja
  säiliö ankkuroi sen ruudun vasempaan alakulmaan (`left: 0,7rem`,
  `bottom: 0,9rem` + iPhonen turva-alueet — sama marginaali kuin
  vanhalla nurkkataululla `.fokusmitat`).
- Mittakaava tulee RUUDUSTA eikä kamerasta (`nurkanSkaala`): korkeus
  ≤ 10 % ruudun korkeudesta, leveys ≤ 28 % ruudun leveydestä, rajat
  0,8…1,6. Kamera ei kirjoita kortin kokoa eikä paikkaa kertaakaan.
- `transform-origin: 0 100%` — kortin vasen alakulma on ankkuri, joten
  kortti kasvaa ylös ja oikealle eikä nurkan yli.
- Sisältö, typografia, kaksoisviivakehys ja kaikki kortin omat mitat
  (104 × 82 css-px peruskoko) ovat ENNALLAAN. Yhtään fonttikokoa,
  väriä tai riviä ei muutettu (PÄÄTÖKSET 7).
- `paneelinLaatikko()` palauttaa nyt laatikon SELLAISENAAN: paneeli ei
  enää laajenna saapumisrajausta eikä uloszoomauksen kattoa. Funktio
  ja sen kutsu lauta.js:ssä jäivät paikoilleen
  (tests/maakartuutsi.test.mjs vahtii kutsua).
- Ankkuritaulut `MAAPANEELIN_ANKKURIT` ja
  `MAAPANEELIN_KAPEAT_ANKKURIT` JÄTETTIIN paikoilleen: `paneelinAnkkuri`
  on yhä kartan oma mitta ja savukkeet lukevat sitä, mutta
  `luoMaapaneeli` ei kutsu sitä enää lainkaan. Biskajanlahti
  (PÄÄTÖKSET 7), maakohtaiset ankkurit (PÄÄTÖKSET 20) ja Kreikan
  Joonianmeri eivät siis sijoita enää mitään. **25 maan
  ehdotuslistaan ei koskettu.**
- PÄÄTÖKSET 21 säilyy: säiliö ja kortin runko ovat
  `pointer-events: none`, ja vain plus-nappi ja valikon rivit ottavat
  napautuksen vastaan — rulla, nipistys ja raahaus menevät kartalle.
- `mitat()` palauttaa nyt myös maan laatikon (savukkeet lukivat sen
  ennen merkkikerroksen datumista).

### Plus-valikko — plussan paikalle, ylös, kahteen sarakkeeseen

`css/styles.css` `.maapaneeli-valikko`

- Valikon ALAREUNA on plussan kohdalla (`bottom: calc(100% + 1px)`) ja
  rivit latoutuvat siitä ylöspäin.
- Ladonta on grid, `grid-auto-flow: column`; js (`sovitaValikko`) antaa
  rivimäärän `--valikko-rivit`, jolloin sarakkeita on kaksi — tai
  kolme, jos kaksi ei mahtuisi ruudulle (turvaventtiili, ei sitonut
  mitatuilla ruuduilla).
- Rivien pystyväli tulee yhä VAIN `line-height`ista (1,3), ei kartan
  mittakaavasta. Ei taustalaatikkoa (PÄÄTÖKSET 22 säilyy); luettavuus
  tulee tekstin kerman värisestä varjosta.
- Plus muuttuu auki ollessaan sulkumerkiksi (`rotate(45deg)`).
- Vasen reuna on KORTIN vasen reuna eikä plussan: plus on kortin
  oikeassa ylänurkassa, ja kortti on ruudun vasemmassa alakulmassa —
  plussaan ankkuroitu lista kasvaisi ruudun ulkopuolelle vasemmalle.
- `.maapaneeli-valikko.vasen` (kääntyminen plussan vasemmalle
  puolelle) poistettiin; ruudulla pysymisen hoitaa `--valikko-siirto`.

### Liiku — kuultava sana ruudun alareunan keskellä

`css/styles.css` `.toimintorivi.rivi-yksi .monitoimi-nappi`

- `position: fixed; left: 50%; transform: translateX(-50%)`, alareunan
  väli sama `var(--gap) + 0,4rem` + turva-alue.
- Kompassi piiloon, sana "Liiku" näkyviin: 11,5 px, peittävyys 0,65,
  kevyt kerman varjo luettavuudeksi.
- Tausta `rgba(244, 231, 202, 0)` (alpha 0 — savuke mittaa sen), ei
  reunusta, ei varjoa. Osuma-ala 44 × 36 px (vaadittu ≥ 32 × 32).
- Aarteen löytyessä (`body.liiku-laaja`) sana kirkastuu peittävyyteen
  1 ja 12,5 px:iin — entinen "neliö laajenee tekstinapiksi" poistui,
  koska nappi on jo sana. Mikään ei enää hypähdä.
- Piilotussäännöt ENNALLAAN: `body.luenta-aanessa`,
  `body.aikajana-paalla`, `body.pallo-auki`, `body.radio-tila` ja
  `body.maataulu-auki` osuvat yhä valitsimeen
  `.toimintorivi .monitoimi-nappi` — **PR #2534:n `body.nosto-popup-auki`
  -sääntö menee siis mainiin sellaisenaan, valitsinta ei ole muutettu.**

### Sivuvaikutus, joka piti korjata: alapalkki sieppasi napautuksen

Kun alarivin ainoa nappi on irrotettu `position: fixed`illä, sen
paikalle jää NÄKYMÄTÖN mutta napautuksia sieppaava kortti: `.turn-card`
(taustaton, koko alalaidan levyinen) → `#actions` → `.toimintorivi`.
Se peitti maapaneelin plus-napin ruudun vasemmassa alakulmassa —
mitattu Playwrightilla: `.maapaneeli-lisaa`-napautus ei mennyt läpi.

Korjaus: `body[data-mode] .turn-card:has(.toimintorivi.rivi-yksi)`,
sen `.actions`, `.toimintorivi.rivi-yksi` ja `.toimintorivi-perus` ovat
`pointer-events: none`; vain irrotettu Liiku ja AUKI oleva
matkustusliuku ottavat napautuksen. (Suljettua liukua ei saa avata —
se on `pointer-events: none` ja kattaa koko rivin alan.) Vartioitu
savukkeella `savuke-liiku.mjs` ja `savuke-maapaneeli.mjs` väite 4.

---

## 2. Mitat ennen ja jälkeen

Kaikki mitattu Chromiumilla, Ranska, Pariisin saapumisnäkymä,
`tools/savukkeet/savuke-maapaneeli.mjs`.

| Mitta | Ennen (v1916, kartassa) | Nyt (erä 19, nurkassa) |
|---|---|---|
| Kortti 390 × 844 | ~37 × 29 px, paikka Biskajanlahdella/Lyoninlahdella, liikkui ja kasvoi zoomatessa | **107 × 84 px**, x 19…126, y 737…821 |
| Kortti 1400 × 900 | ~86 × 68 px, Biskajanlahdella | **114 × 90 px**, x 22…136, y 785…875 |
| Väli ruudun vasempaan reunaan | vaihteli zoomin mukana | **11,2 px** (molemmat ruudut) |
| Väli ruudun alareunaan | vaihteli | **14,4 px** (molemmat ruudut) |
| Osuus ruudun korkeudesta | vaihteli 5…22 % | **10,0 %** (molemmat) |
| Kortin skaala | 0,45…64 kameran mukaan | **1,029** (390) / **1,098** (1400), vakio |
| Zoom 2× sisään | kortti leveni | **ei muutu: 107 × 84 / 114 × 90, ±0 px** |
| Valikko 390 px | pystylista plussan oikealla, y kortin tasalta alas | **8 riviä, 2 saraketta**, x 19…165, y 701…736 (kortin yläreuna 737) |
| Valikko 1400 px | sama | **8 riviä, 2 saraketta**, x 22…177, y 747…784 (kortin yläreuna 785) |
| Valikon rivinkorkeus / rivivali | 1,3 (v1916) | **8,68 / 8,68 px (suhde 1,00)** 390 px; **9,26 / 9,26 (1,00)** 1400 px |
| Liiku | 44 × 44 neliö, kompassi, pergamentti + reunus, vasen alanurkka | **44 × 36, sana "Liiku", tausta rgba(…,0), reunus 0px, peittävyys 0,65, keskipoikkeama 0,0 px** |
| Liiku vs. pulu / lappu / kaupunkikortti / paneeli | — | **ei yhtään päällekkäisyyttä** (390 ja 1400) |

---

## 3. Savukkeet

Kaikki ajettu yksi kerrallaan etualalla,
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

| Savuke | Tulos |
|---|---|
| `savuke-maapaneeli.mjs` | **13/13 vihreä** (uudet vartiot, ks. alla) |
| `savuke-iphone-tekstit.mjs` | **40/40 vihreä** |
| `savuke-liiku.mjs` | **40/43 — sama kuin mainissa** (vertailuajo `origin/main`-työtilassa antoi täsmälleen samat kolme punaista: uloimman matkanapin leikkaus 2033 px², lennon näkyvyys ja liftauksen nopeusprofiilin näytemäärä). Ei siis regressiota; matkustusliuku toimii pointer-events-muutoksen jälkeen. |
| `tests/maakartuutsi.test.mjs` + `tests/rules.test.mjs` | **347/347 vihreä** |

### savuke-maapaneeli.mjs kirjoitettiin uusiksi

Väitteet nyt:

1. Paneeli on ruudun vasemmassa alakulmassa, kokonaan ruudulla ja
   ≤ 10 % ruudun korkeudesta (390 ja 1400 px).
2. Paneeli EI liiku eikä kasva zoomatessa (nurkka ja koko ±1 px).
3. Valikko aukeaa plussan paikalle ylös, ≥ 2 saraketta, rivivali
   ≤ 1,5 × rivinkorkeus, kokonaan ruudulla.
4. Jokainen otsikko avaa maalehden oman sivunsa (ennallaan).
5. Värit ovat kartan omia `--sym-`sävyjä (ennallaan).
6. Liiku on kuultava sana ruudun alareunan keskellä (±8 px), tausta
   alpha 0, sana näkyy, osuma-ala ≥ 32 × 32, ei päällekkäisyyksiä.

Vastakokeet:

- **A** Maa ilman `MAA_KATEGORIAT`-riviä → paneeli on, valikkoa ei, ei
  virheitä. *(vihreä)*
- **B** `?maapaneeli=nurkka` purkaa paneelin → väite 1 KAATUU ja vanha
  kartuutsi-nurkkataulu palaa. *(vihreä)*
- **C** Kartan oma piste (Pariisin `getScreenCoords`) SIIRTYY samassa
  zoomissa, jossa paneeli ei siirry — muuten "ei liiku" ei todistaisi
  mitään. Mitattu 390 px: 188,193 → 189,1. *(vihreä)*
- **D** Pulun nappi EI ole ruudun keskilinjalla (poikkeama 129,4 px /
  634,4 px) → väitteen 6 keskitysmitta kaatuu siihen. *(vihreä)*

### savuke-iphone-tekstit.mjs

Vanhat Liiku-vartiot (44 × 44 neliö vasemmassa alanurkassa, symboli
näkyy / sana piilossa, marginaali sama kuin karttaselitteellä, neliö
laajenee tekstinapiksi) korvattiin keskitys-, läpinäkyvyys-, sana- ja
osuma-alavartioilla. Vastakoe `LIIKU_INSET0` päivitettiin: `left/bottom`
pakotetaan nollaan → KESKITYSvartion on kaaduttava (ennen se kaatoi
marginaalivartion). *(vihreä)*

### savuke-era9.mjs

Mittaus luki paneelin merkkikerroksen datumista; nyt
`l.maapaneeli.mitat()`. Vastakoe B (erän 3 mitat takaisin) päivitettiin
kumoamaan myös NURKAN katot, muuten se olisi mennyt läpi mittaamatta
mitään.

---

## 4. Kumoutuneet vanhat vartiot

`tools/savukkeet/savuke-era12.mjs` mittasi nimenomaan karttaan
kiinnitystä. Kumoutuneet vartiot **merkittiin `KUMOTTU`-riveiksi**
(mittaus ajetaan yhä, tulos jää lokiin, mutta se ei enää kaada
savuketta) tiedoston omalla `kumottu()`-apurilla, joka kertoo minkä
päätöksen se kumosi ja missä korvaava vartio on:

- 2. maapaneeli meren päällä
- 3. paneelin koko seuraa kartan mittakaavaa katkotta
- 6. paneelin leveys ≤ 10 % ruudun leveydestä
- 7. ja 7b. lisää-valikko plussan vierellä, rivivälin suhde kolmella
  zoomilla
- 8. ankkuri Lyoninlahti / Biskajanlahti
- 9. Kreikan maapaneeli Joonianmerellä / Aigeianmerellä
- vastakokeet B, C, E, F, H, I, K

Voimassa jäivät era12:n vartiot 1 (uloszoomauksen esto), 4
(sivuvirheet), 5 (saapumisrajaus), 6/7 pystypuhelimen korkeussovitus ja
10 (ele menee kortin läpi kartalle, PÄÄTÖKSET 21).

**Fablelle:** era12 on nyt puoliksi historiaa. Jos haluat, se voi
Raamatun kartan mukaisesti jäädä sellaisenaan (erän 12 muistiksi) tai
sen paneeliosuus voidaan poistaa kokonaan, kun PÄÄTÖKSET 28 on
julkaistu.

---

## 5. Kuvat

- `docs/raportit/kuvat/maainfo-alakulma-390-kiinni.jpg` — koko ruutu
  390 × 844, valikko kiinni (paneeli alakulmassa, Liiku keskellä alhaalla)
- `docs/raportit/kuvat/maainfo-alakulma-390-auki.jpg` — alakulma
  suurennettuna, valikko auki (2 saraketta ylöspäin)
- `docs/raportit/kuvat/maainfo-alakulma-1400-kiinni.jpg` — koko ruutu
  1400 × 900, valikko kiinni
- `docs/raportit/kuvat/maainfo-alakulma-1400-auki.jpg` — alakulma
  suurennettuna, valikko auki

Kaikki ≤ 100 kt, jpeg laatu 60.

Huomio kuvasta `maainfo-alakulma-1400-kiinni.jpg`: sana "Liiku" osuu
1400 px:n Ranska-näkymässä kartan oman **BARCELONA**-nimiön päälle.
Se on kartan nimiö eikä pelin kaluste, eikä sitä voi väistää ilman
että nappi siirtyy pois keskeltä — omistaja pyysi juuri keskelle, joten
jätin sen. Sana on kuultava (0,65), joten nimiö näkyy sen alta.

---

## 6. AVOIN ASIA OMISTAJALLE: paneelin teksti on yhä hyvin pientä

Tämä on tärkein asia, joka jää päätettäväksi.

Toimeksianto sanoi "säilytä nykyinen sisältö ja mitoitus (paneeli
≤ 10 % ruudusta)", ja niin tehtiin. Mutta kortin oma typografia on
mitoitettu sille, että KARTTA suurentaa korttia zoomatessa:

| Elementti | Kortin yksikkö | Ruudulla nyt (390 px, skaala 1,03) |
|---|---|---|
| Maan nimi | 6,5 px | **6,7 px** |
| Lukurivin otsikko | 3,5 px | **3,6 px** |
| Maan oma nimi | 4,25 px | **4,4 px** |
| Valikon rivi | 6,5 px | **6,7 px** |

Vertailun vuoksi ALKUPERÄINEN nurkkataulu, jonka omistaja pyysi
takaisin: kartuutsin nimi 1,05 rem = **16,8 px** puhelimella (1,35 rem
= 21,6 px työpöydällä), lukurivin otsikko 0,72 rem = **11,5 px**, arvo
0,84 rem = **13,4 px**.

Eli nykyisellä mitoituksella paneeli on oikeassa nurkassa ja oikean
näköinen — kaksoisviivakehys, kartuutsi, lukurivit, kielirivi ja plus
ovat kaikki paikoillaan — mutta sen tekstiä EI VOI LUKEA 390 px:n
ruudulla. Se näkyy kuvasta `maainfo-alakulma-390-kiinni.jpg`: kortti on
tunnistettava kartuutsi, mutta rivit ovat harmaata sumua. Kartalla ollessaan se oli
vielä pienempi (mitattu aiemmin 1,7…3,0 px leipätekstiä), joten tämä on
jo noin kaksinkertainen parannus — mutta ei vielä "alkuperäinen".

**Korjaus on kaksi vakiota** `js/pallolauta/maapaneeli.js`:ssä, ei
yhtään fonttia (PÄÄTÖKSET 7 ei siis riko):

```
MAAPANEELIN_NURKKA_KORKEUS_OSUUS  0.10 → 0.22
MAAPANEELIN_NURKKA_LEVEYS_OSUUS   0.28 → 0.58
MAAPANEELIN_NURKKA_SKAALA_MAX      1.6 → 3.2
```

Silloin mitat olisivat (laskettu, ei mitattu):

| Ruutu | Skaala | Kortti | Maan nimi | Lukurivin otsikko |
|---|---|---|---|---|
| 390 × 844 | 2,18 | 226 × 178 px (58 % lev., 21 % kork.) | 14,1 px | 7,6 px |
| 1400 × 900 | 2,41 | 251 × 198 px | 15,7 px | 8,4 px |

Sen kanssa on tehtävä YKSI lisämuutos: 390 px:n ruudulla noin 226 px
leveä kortti yltäisi ruudun keskilinjalle asti ja osuisi Liiku-sanaan.
Silloin Liiku on nostettava kortin korkeuden verran ylemmäs tai kortin
alareuna Liikun yläpuolelle. En tehnyt kumpaakaan omin päin, koska
molemmat muuttaisivat omistajan juuri päättämää "alas keskelle" -paikkaa
ja "≤ 10 %" -mitoitusta.

**Pyyntö Fablelle:** näytä omistajalle kuvat
`maainfo-alakulma-390-kiinni.jpg` ja `-auki.jpg` ja kysy, riittääkö
tämä koko vai halutaanko iso versio (taulukko yllä). Molemmat ovat
yhden vakion päässä.

---

## 7. Mitä EI tehty

- Ei versionostoa, ei muutosta `js/muutokset.js`:ään.
- Ei PR:ää.
- Ei muutosta Raamattuun (`js/tyohuone-raamattu.js`).
- Ei koskettu 25 maan ankkuriehdotuslistaan.
- Ei ajettu koko `npm test`iä — vain `tests/maakartuutsi.test.mjs`,
  `tests/rules.test.mjs` ja `node --check` muutetuille tiedostoille.
  `tests/sw.test.mjs` jätettiin ajamatta, koska uusia tiedostoja ei
  lisätty eikä service workerin kuori muuttunut.
