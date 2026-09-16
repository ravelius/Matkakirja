# Maainfo takaisin ruudun vasempaan alakulmaan (erät 19 ja 19b)

Viesti Fablelle · 15.–16.9.2026 · Opus-agentti · haara
`claude/bold-ride-vow4ki-maainfo-alakulma`

Toteutettu Raamatun **KARTTAUUDISTUKSEN PÄÄTÖKSET 28** (omistaja
15.9.2026 klo 20.45 UTC) ja sen jatkopäätös samana iltana: **maainfo
alkuperäiseen luettavaan kokoon** (nimi 14–16 px, lukurivit n. 8 px,
paneeli n. 22 % ruudun korkeudesta). Ei versionostoa, ei PR:ää, ei
Raamatun muokkausta — ne jäävät Fablelle.

> **Erä 19b (16.9.2026):** omistaja valitsi kortilla ison koon. Luvun 6
> avoin asia on siis RATKAISTU ja toteutettu; vakiot ovat nyt
> 0,22 / 0,58 / rajat 1,4…3,2. Luku 6 kertoo mitä tehtiin ja mitä siitä
> seurasi Liiku-sanalle.

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
  **≤ 22 %** ruudun korkeudesta, leveys **≤ 58 %** ruudun leveydestä,
  rajat **1,4…3,2** (erä 19b; ensimmäinen mitoitus oli 10 % / 28 % /
  0,8…1,6 ja se osoittautui lukukelvottomaksi, ks. luku 6). Kamera ei
  kirjoita kortin kokoa eikä paikkaa kertaakaan.
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
- **Erä 19b — sana väistää maainfoa pystyyn, ei sivuun.** Iso paneeli
  yltää 390 px:n ruudulla x 246:een asti eli ruudun keskilinjan (195)
  yli, jossa sana istuu. `js/pallolauta/maapaneeli.js`
  `tahdistaLiikunPohja` kirjoittaa muuttujan `--liiku-pohja` (kortin
  yläreuna ruudun alareunasta + 2 px) VAIN silloin kun kortin oikea
  reuna yltää sanan kaistalle (keskilinja − 34 px), ja CSS ottaa
  `bottom: max(perusväli, var(--liiku-pohja, 0px))`. Leveällä ruudulla
  muuttujaa ei kirjoiteta lainkaan eikä mikään muutu. Vaakasuunnassa
  sana pysyy keskilinjalla kummassakin tapauksessa.
- Mittaus hylkää kesken asettuvan ruudun (kortti ruudun ulkopuolella
  tai väistö yli puoli ruutua) ja otetaan uudestaan rAF:ssä ja 500 ms
  päästä: mitattu 16.9.2026, että ensimmäinen mittaus antoi 978 px ja
  olisi vienyt sanan kokonaan pois ruudulta. Savuke vartioi nyt myös
  sen, että sana on kokonaan ruudulla ja ruudun alemmassa puoliskossa.
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

| Mitta | Ennen (v1916, kartassa) | Erä 19 (10 %) | **Nyt, erä 19b (22 %)** |
|---|---|---|---|
| Kortti 390 × 844 | ~37 × 29 px, Biskajanlahdella, liikkui ja kasvoi zoomatessa | 107 × 84 px | **226 × 178 px**, x 19…246, y 643…821 |
| Kortti 1400 × 900 | ~86 × 68 px | 114 × 90 px | **251 × 198 px**, x 22…273, y 677…875 |
| Väli ruudun vasempaan reunaan | vaihteli zoomin mukana | 11,2 px | **11,2 px** |
| Väli ruudun alareunaan | vaihteli | 14,4 px | **14,4 px** |
| Osuus ruudun korkeudesta | vaihteli 5…22 % | 10,0 % | **21,1 %** (390) / **22,0 %** (1400) |
| Kortin skaala | 0,45…64 kameran mukaan | 1,03 / 1,10 | **2,175** (390) / **2,415** (1400), vakio |
| Zoom 2× sisään | kortti leveni | ei muutu | **ei muutu: 226 × 178 / 251 × 198, ±0 px** |
| Maan nimi ruudulla | 2…6 px | 6,7 px | **14,1 px** (390) / **15,7 px** (1400) |
| Lukurivin otsikko ruudulla | 1,7…3 px | 3,6 px | **7,6 px** (390) / **8,4 px** (1400) |
| Valikko 390 px | pystylista plussan oikealla | 8 riviä / 2 saraketta, x 19…165, y 701…736 | **8 riviä / 2 saraketta**, x 19…327, y 567…641 (kortin yläreuna 643) |
| Valikko 1400 px | sama | 8 / 2, x 22…177 | **8 riviä / 2 saraketta**, y 601…675 (kortin yläreuna 677) |
| Valikon rivinkorkeus / rivivali | 1,3 (v1916) | 8,68 / 8,68 (1,00) | **18,35 / 18,35 px (suhde 1,00)** 390 px |
| Liiku | 44 × 44 neliö, kompassi, pergamentti + reunus, vasen alanurkka | 44 × 36 sana, alareuna 16 px | **44 × 36, sana "Liiku", alpha 0, peitto 0,65, keskipoikkeama 0,0 px** |
| Liikun alareuna ruudun alareunasta | — | 16 px (molemmat) | **203 px (390, väistää paneelia)** / **16 px (1400)** |
| Liiku vs. paneeli / pulu / lappu / kaupunkikortti | — | ei päällekkäisyyttä | **ei päällekkäisyyttä** (390 ja 1400) |

Valikko mahtuu kokonaan ruudulle molemmilla: 390 px:llä se yltää
x 327:ään (ruutu 390) ja y 567:ään (ruudun yläreuna 0) — eli ruudun
yläreunan yli ei mennä edes isolla paneelilla.

---

## 3. Savukkeet

Kaikki ajettu yksi kerrallaan etualalla,
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

| Savuke | Tulos |
|---|---|
| `savuke-maapaneeli.mjs` | **15/15 vihreä** (uudet vartiot ja vastakokeet A–F, ks. alla) |
| `savuke-iphone-tekstit.mjs` | **40/40 vihreä** (ajettu uudestaan erän 19b jälkeen) |
| `savuke-liiku.mjs` | **40/43 — sama kuin mainissa** (vertailuajo `origin/main`-työtilassa antoi täsmälleen samat kolme punaista: uloimman matkanapin leikkaus 2033 px², lennon näkyvyys ja liftauksen nopeusprofiilin näytemäärä). Ei siis regressiota; matkustusliuku toimii pointer-events-muutoksen jälkeen. |
| `tests/maakartuutsi.test.mjs` + `tests/rules.test.mjs` | **347/347 vihreä** |

### savuke-maapaneeli.mjs kirjoitettiin uusiksi

Väitteet nyt:

1. Paneeli on ruudun vasemmassa alakulmassa, kokonaan ruudulla ja
   **22 % (± 2 %-yks.) ruudun korkeudesta** (390 ja 1400 px) — erässä
   19 tämä oli ≤ 10 %, ja se kumoutui omistajan päätöksellä.
2. Paneeli EI liiku eikä kasva zoomatessa (nurkka ja koko ±1 px).
3. Valikko aukeaa plussan paikalle ylös, ≥ 2 saraketta, rivivali
   ≤ 1,5 × rivinkorkeus, kokonaan ruudulla.
4. Jokainen otsikko avaa maalehden oman sivunsa (ennallaan).
5. Värit ovat kartan omia `--sym-`sävyjä (ennallaan).
6. Liiku on kuultava sana ruudun alareunan keskellä (±8 px), tausta
   alpha 0, sana näkyy, osuma-ala ≥ 32 × 32, **sana on kokonaan
   ruudulla ja ruudun alemmassa puoliskossa**, ei päällekkäisyyksiä
   paneelin, pulun, lapun eikä kaupunkikortin kanssa.

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
- **E** (erä 19b) Nurkan katot palautetaan pieniksi (10 % / 28 %,
  rajat 0,8…1,6) palvelimessa → väitteen 1 LUETTAVAN KOON osan on
  kaaduttava. *(vihreä)*
- **F** (erä 19b) Liikun `bottom: max(…, var(--liiku-pohja))`
  palautetaan pelkäksi perusväliksi → sanan ON osuttava paneeliin
  390 px:n ruudulla, tai väistö ei todistaisi mitään. *(vihreä)*

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

Uudet (erä 19b, iso paneeli) kirjoitettu samoihin polkuihin:

- `docs/raportit/kuvat/maainfo-alakulma-390-kiinni.jpg` — koko ruutu
  390 × 844, valikko kiinni: paneeli alakulmassa luettavana, Liiku
  keskellä paneelin yläreunan tasalla
- `docs/raportit/kuvat/maainfo-alakulma-390-auki.jpg` — koko ruutu,
  valikko auki (2 saraketta plussan paikalta ylöspäin)
- `docs/raportit/kuvat/maainfo-alakulma-1400-kiinni.jpg` — koko ruutu
  1400 × 900, valikko kiinni, Liiku ruudun alalaidassa keskellä
- `docs/raportit/kuvat/maainfo-alakulma-1400-auki.jpg` — koko ruutu,
  valikko auki

Kaikki ≤ 40 kt, jpeg laatu 60. Kuvissa näkyy nyt kartta terävänä:
saapumisen luentakuva ja luennan huntu on neutralisoitu kuvaa varten
(headless-ajossa luentavahti ei koskaan päästä puhujaa vaikenemaan) —
pelin omat tyylit ovat kuvissa muuten koskemattomat.

Kuvista näkyy myös kaksi asiaa, jotka kannattaa katsoa omistajan
kanssa:

1. **390 px, valikko auki:** sana "Liiku" nousee paneelin yläreunan
   tasalle, ja auki oleva valikko latoutuu samalle korkeudelle sen
   molemmin puolin — sana jää siis hetkeksi valikon sarakkeiden väliin.
   Valikko on auki vain napautuksen ajan, eikä kortti 28 vaadi tästä
   mitään, joten jätin sen; jos omistaja haluaa, sana voi väistää myös
   auki olevaa valikkoa (sama muuttuja, yksi ehto lisää).
2. **1400 px:** sana osuu kartan oman BARCELONA-nimiön kohdalle. Se on
   kartan nimiö eikä pelin kaluste, eikä sitä voi väistää ilman että
   sana siirtyy pois keskeltä. Sana on kuultava (0,65), joten nimiö
   näkyy sen alta.

---

## 6. RATKAISTU: paneeli alkuperäiseen luettavaan kokoon (erä 19b)

### Mikä oli vikana

Erän 19 ensimmäinen mitoitus noudatti vanhaa ≤ 10 % -kattoa, ja kortti
oli 390 px:n ruudulla 107 × 84 px. Koska kortin typografia on mitoitettu
sille, että KARTTA suurensi korttia zoomatessa, teksti oli ruudulla
mitattuna näin pientä:

| Elementti | Kortin yksikkö | Vanha (skaala 1,03) | **Nyt (skaala 2,175)** |
|---|---|---|---|
| Maan nimi | 6,5 px | 6,7 px | **14,1 px** |
| Maan oma nimi | 4,25 px | 4,4 px | **9,2 px** |
| Lukurivin otsikko | 3,5 px | 3,6 px | **7,6 px** |
| Valikon rivi | 6,5 px | 6,7 px | **14,1 px** |

Työpöydällä (skaala 2,415): maan nimi **15,7 px**, lukurivin otsikko
**8,4 px**, valikon rivi **15,7 px**.

Vertailun vuoksi ALKUPERÄINEN nurkkataulu, jonka omistaja pyysi
takaisin: kartuutsin nimi 1,05 rem = 16,8 px puhelimella (1,35 rem =
21,6 px työpöydällä), lukurivin otsikko 0,72 rem = 11,5 px.

### Omistajan päätös ja mitä tehtiin

Omistaja valitsi kortilla: **maainfo alkuperäiseen luettavaan kokoon**
(nimi 14–16 px, lukurivit n. 8 px, paneeli n. 22 % ruudun korkeudesta).
**≤ 10 % -mitoitus kumoutuu tämän paneelin osalta** — se oli kartalla
liukuvan kortin raja, ei nurkkakalusteen.

Muutos on KOLME VAKIOTA `js/pallolauta/maapaneeli.js`:ssä. **Yhtään
fonttikokoa, väriä tai riviä ei muutettu** (PÄÄTÖKSET 7 pitää): kortti
on yhä 104 × 82 css-px ja koko sen sisältö entisillä mitoillaan, vain
kerroin kasvaa, jolloin kehys, kartuutsi, lukurivit, kielirivi, plus ja
valikko suurenevat yhtenä kuvana.

```
MAAPANEELIN_NURKKA_KORKEUS_OSUUS  0.10 → 0.22
MAAPANEELIN_NURKKA_LEVEYS_OSUUS   0.28 → 0.58
MAAPANEELIN_NURKKA_SKAALA_MIN      0.8 → 1.4
MAAPANEELIN_NURKKA_SKAALA_MAX      1.6 → 3.2
```

### Seuraus: Liiku-sana väistää paneelia pystyyn

390 px:n ruudulla iso kortti yltää x 246:een asti, ja ruudun keskilinja
on 195 — sana olisi jäänyt kortin päälle. Ratkaisu on omistajan oma
ohje: *"nosta Liikun tekstiä tarvittaessa paneelin yläreunan tasalle"*.

- `tahdistaLiikunPohja` kirjoittaa `--liiku-pohja`n VAIN kun kortin
  oikea reuna yltää sanan kaistalle (keskilinja − 34 px = puoli nappia
  + 12 px rako).
- CSS: `bottom: max(perusväli, var(--liiku-pohja, 0px))`. Leveällä
  ruudulla muuttujaa ei kirjoiteta, joten mikään ei muutu.
- Vaakasuunnassa sana pysyy keskilinjalla molemmissa tapauksissa
  (keskipoikkeama mitattu 0,0 px).

Mitattu: 390 px `--liiku-pohja` **203 px**, sanan alareuna 203 px
ruudun alareunasta, kortin yläreuna 201 px — sana on siis tasan 2 px
kortin yläreunan yläpuolella, keskellä. 1400 px: muuttujaa ei aseteta,
sana on 16 px ruudun alareunasta kuten ennenkin, ja kortin yläreuna on
223 px korkeudella eli kaukana.

### Mittaus voi valehdella kesken saapumisen — ja valehteli

Ensimmäisessä ajossa mitta oli **978 px** ja olisi vienyt sanan
kokonaan ruudun yläpuolelle. Syy on sama kuin kortin koossa aiemmin:
karttaruutu on flex-lapsi, jonka korkeus heiluu saapumisen aikana, ja
kortin yläreuna oli mittaushetkellä 132 px ruudun yläpuolella.

Korjaus kahdessa osassa:

1. **Mittaus hylätään**, jos kortti ei ole kokonaan ruudulla tai
   väistö olisi yli puoli ruutua — hylätty mittaus ei pyyhi entistä
   arvoa, joten sana ei hypähdä.
2. **Mittaus otetaan kolmesti**: heti, seuraavassa kehyksessä (rAF) ja
   500 ms päästä (yksi ajastin, nollataan joka kirjoituksella).

Ja mikä tärkeintä: **savuke vartioi nyt sen, että sana on kokonaan
ruudulla ja ruudun alemmassa puoliskossa.** Ilman sitä vartiota
978 px:n virhe meni läpi kaikista muista vartioista (15/15 vihreä,
sana ruudun ulkopuolella) — se on kirjattu tähän muistiksi siitä, että
"ei osu mihinkään" ei ole sama asia kuin "on oikeassa paikassa".

## 7. Mitä EI tehty

- Ei versionostoa, ei muutosta `js/muutokset.js`:ään.
- Ei PR:ää.
- Ei muutosta Raamattuun (`js/tyohuone-raamattu.js`).
- Ei koskettu 25 maan ankkuriehdotuslistaan.
- Ei ajettu koko `npm test`iä — vain `tests/maakartuutsi.test.mjs`,
  `tests/rules.test.mjs` ja `node --check` muutetuille tiedostoille.
  `tests/sw.test.mjs` jätettiin ajamatta, koska uusia tiedostoja ei
  lisätty eikä service workerin kuori muuttunut.

---

## 8. Fablelle: mitä Raamattuun kannattaa kirjata

PÄÄTÖKSET 28:n tilaksi "toteutettu", ja sen perään omistajan
jatkopäätös 15.9.2026 illalta (kysymyskortti):

> **MAAINFO ALKUPERÄISEEN LUETTAVAAN KOKOON.** Nurkkapaneelin koko on
> 22 % ruudun korkeudesta (leveysraja 58 %), jolloin maan nimi on
> ruudulla 14–16 px ja lukurivit n. 8 px. Aiempi "paneeli
> kymmenesosaan" (v1885) ja saapumisnäkymän leveyskatto (v1903)
> KUMOUTUVAT tämän paneelin osalta: ne olivat kartalla liukuvan kortin
> rajoja, eivät ruudun nurkkakalusteen. Liiku-sana pysyy alhaalla
> keskellä, mutta nousee paneelin yläreunan tasalle silloin kun
> paneeli yltää ruudun keskilinjalle (390 px).

Mitattu 16.9.2026: 390 px kortti 226 × 178 px (21,1 %), 1400 px kortti
251 × 198 px (22,0 %); Liiku 203 px / 16 px ruudun alareunasta.
