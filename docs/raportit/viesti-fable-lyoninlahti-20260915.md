# Viesti Fablelle: pystypuhelimella maapaneeli Lyoninlahdelle (Ranska)

Opus-työagentti, 15.9.2026. Haara
`claude/bold-ride-vow4ki-lyoninlahti`, pohja
`claude/bold-ride-vow4ki-paneeli-puhelin` (#2492, main v1902).
Ei versionostoa, ei Raamattua, ei mergeä, ei dist/:iä.

## 1. Mitä tehtiin

Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 18 (omistaja 15.9.2026):
pystypuhelimella Ranskan maapaneelin ankkuri on **Lyoninlahdella**;
työpöytä ja vaakatila pitävät Biskajanlahden (PÄÄTÖKSET 9).

- `js/pallolauta/maapaneeli.js`: uusi taulu
  `MAAPANEELIN_KAPEAT_ANKKURIT = { FRA: { lat: 42.6, lng: 3.9 } }`.
  `paneelinAnkkuri` ja `paneelinLaatikko` saivat neljännen/kolmannen
  valinnaisen argumentin `{ kapea }`; ilman sitä käytös on entinen.
  `luoMaapaneeli` sai kahvan `kapeaRuutu`, ja myös `tahdistaKoko`
  lukee ankkurin uudestaan (ruudun kääntö vaihtaa ehdon kesken pelin).
- `js/pallolauta/kamera.js`: **vain uusi export**, ei logiikkamuutosta —
  `korkeuteenSovitettu(bbox, vara)` on `korkeuteenSovitus`in ehto
  luettavaksi ulos (`Boolean(korkeuteenSovitus(...))`).
- `js/pallolauta/lauta.js`: `kapeaRuutu(laatikko) =
  kamera.korkeuteenSovitettu(laatikko)` ja se annetaan sekä
  paneelikerrokselle että `paneelinLaatikko`-laajennukselle.

**Valinta seuraa samaa kuvasuhde-ehtoa kuin korkeussovitus** (PÄÄTÖKSET
17, v1898): ruudun kuvasuhde < maan laatikon kuvasuhde pallolla. **Ei
laitetunnistusta.** Ehto luetaan MAAN omasta laatikosta eikä
paneelilla laajennetusta, jottei ankkurin valinta muuttaisi omaa
ehtoaan (takaisinkytkentä katki).

**Vain Ranskalla on kapea-ankkuri.** Muilla mailla puuttuva rivi
tarkoittaa oletusankkuria (laatikon eteläreuna) kuten ennen —
pilotti on yhä pilotti (PÄÄTÖKSET 9 kohta 1).

## 2. Miksi Lyoninlahti eikä Biskaja

Korkeuteen sovitettu saapumisnäkymä rajaa ruudun Ranskan
PYSTYMITTAAN, jolloin maan itä- ja länsireuna jäävät ruudun
ulkopuolelle (mitattu tyhjä X −119,7 %). Biskajanlahti on laatikon
LÄNSIREUNAN takana, joten kortti jää siellä saapuessa ruudun
vasemmalle puolelle näkymättä — juuri sen vastakoe H mittaa.
Lyoninlahti on laatikon ALLA ja lähellä sen X-keskilinjaa.

## 3. Mittaustaulukko (Chromium, dpr 1, Ranska, Fogg Pariisissa)

Kortin `getBoundingClientRect()` kotelon koordinaateissa.
Kotelo on ruutua pienempi (yläpalkki): 390 → 374 × 775.

### 3.1 Ankkuri, kortti ja saapumisnäkymä

| ruutu | kuvasuhde-ehto | ankkuri | vaihe | kortti (px) | kortin paikka kotelossa | kokonaan ruudulla | osuus kotelon leveydestä |
|---|---|---|---|---|---|---|---|
| 390 × 844 | kapea (korkeussovitus) | Lyoninlahti 42,6 N / 3,9 E | saapuminen | 35,5 × 28,0 | x 257,9…293,4 · y 674,8…702,8 / 374 × 775 | **kyllä** | **9,51 %** |
| 390 × 844 | kapea | Lyoninlahti | 1 porras sisään | 41,3 × 32,6 | x 269,2…310,5 · y 720,7…753,3 | kyllä | 11,05 % (katto koskee vain saapumista) |
| 390 × 844 | kapea | Lyoninlahti | panorointi länteen | 41,3 × 32,6 | x 531,6…572,9 | ei (kortti on kartassa kiinni) | — |
| 390 × 844 | kapea | Lyoninlahti | panorointi itään | 41,3 × 32,6 | x 17,4…58,7 · y 766,4…799,0 | ei (kartassa kiinni) | — |
| 393 × 852 | kapea | Lyoninlahti 42,6 N / 3,9 E | saapuminen | 35,8 × 28,2 | x 260,2…296,0 · y 681,8…710,0 / 377 × 783 | **kyllä** | **9,51 %** |
| 393 × 852 | kapea | Lyoninlahti | 1 porras sisään | 41,6 × 32,8 | x 271,5…313,2 · y 728,2…761,0 | kyllä | 11,05 % |
| 393 × 852 | kapea | Lyoninlahti | panorointi länteen | 41,6 × 32,8 | x 537,2…578,8 | ei (kartassa kiinni) | — |
| 393 × 852 | kapea | Lyoninlahti | panorointi itään | 41,6 × 32,8 | x 16,7…58,3 | ei (kartassa kiinni) | — |
| 844 × 390 | leveä | **Biskajanlahti 45,9 N / −4,6 E** | saapuminen | **38,6 × 30,4** | x 220,0…258,6 · y 193,5…223,9 / 823 × 369 | kyllä | **4,69 %** |
| 1400 × 900 | leveä | **Biskajanlahti 45,9 N / −4,6 E** | saapuminen | **85,9 × 67,7** | x 263,5…349,4 · y 430,5…498,2 / 1379 × 821 | kyllä | **6,23 %** |

**Biskaja on ennallaan pikselilleen.** Erän 15 raportin luvut olivat
844 × 390 → 38,6 px / 4,7 % ja 1400 × 900 → 85,9 px / 6,2 % — samat
luvut, sama ankkuri, sama paikka. Vaakatila ja työpöytä eivät
liikkuneet lainkaan.

Panorointirivit ovat INFOa, eivät vaatimus: kortti on PÄÄTÖKSET 9:n
mukaan kartassa kiinni, joten se kulkee kartan mukana ruudun ulos.
Vaatimus *"kokonaan ruudulla"* koskee saapumisnäkymää, ja se täyttyy.

### 3.2 Päällekkäisyydet (390 × 844 ja 393 × 852, saapuminen ja 1 porras sisään)

| mitta | 390 × 844 | 393 × 852 |
|---|---|---|
| Marseillen nimikyltti / kaupunkimerkki (`nimet.osumat()`) | **0 päällekkäisyyttä** | **0** |
| Nostot (`nostot.osumat()`, 16 kpl ruudulla) | **0** | **0** |
| Liiku-rivin napit (vasen alanurkka) | **0** | **0** |
| Pulu (Livian ruutuhahmo oikeassa alanurkassa) | **0 päällekkäisyyttä**, rako 0,6 px | **0**, rako 1,0 px |
| Paneeli maan päällä (25 näytepistettä) | **0 maaosumaa** | **0** |

- **Itään panoroitaessa** kortti kulkee ruudun vasempaan alalaitaan
  (390 × 844: x 17,4…58,7), mutta y 766,4…799,0 on Liiku-rivin
  (y 680…724) ALAPUOLELLA — päällekkäisyys 0 myös siellä.
- **Liiku-napit.** Liikkumisrivin napit ovat pallolaudalla
  `display: none` tässä tilassa; kun ne on ladottu, ne ovat rivin
  vasemmassa päässä (Liftaus x −13…69, Bussilla 74…157, Laivalla
  162…244, Lentäen 249…332). Kortin vasen reuna on 257,9, eli
  **189 px** vasemman alanurkan napin oikeasta reunasta. Rivin OMA
  laatikko (x 14…359) leikkaa kortin laatikkoa 808 px², mutta rivi on
  tyhjä ja kortti maalataan sen päälle.
- **Pulu on ruutuhahmo, ei DOM-solmu** — se piirtyy pallon kanvaalle,
  joten DOM-päällekkäisyys on nolla määritelmän nojalla. Mitta on siksi
  otettu KUVAKAAPPAUKSEN PIKSELEISTÄ: pulun vasemmanpuoleisin
  sinertävä pikseli (nokka) on 390 × 844 -ruudulla kotelon x = 294,0 ja
  kortin oikea reuna x = 293,4 → **rako 0,6 px, ei leikkausta**.
  393 × 852: 297,0 vs. 296,0 → **1,0 px**.
  **Tämä on tiukka ja Fablen päätettävä:** saapumiskorkeus heilahtaa
  ajosta toiseen muutaman prosentin, joten alle pikselin rako voi
  jonain ajona mennä nollan alle. Ankkuria EI siirretty omin päin —
  omistajan ehdottama 3,9 E mittaa puhtaasti läpi (0 maaosumaa,
  0 päällekkäisyyttä). Jos varaa halutaan, 0,13° länteen (≈ 3,77 E)
  antaisi noin 10 px rakoa, mutta vie korttia kohti Cap de Creusia ja
  vaatii oman merimittauksen.

### 3.3 Miksi juuri 42,6 N / 3,9 E

Paneeli on Ranskassa kapealla ruudulla 15,2 × 12,0 lautayksikköä eli
0,456° × 0,360°, ja ankkuri on kortin YLÄREUNAN KESKIKOHTA. Kortti
peittää siis lat 42,24…42,60 N ja lng 3,672…4,128 E — Lyoninlahden
avovettä. Savukkeen 25 näytepistettä osuvat 0 kertaa mihinkään maan
polygoniin (ei Ranska, ei Espanja, ei Korsika) sekä saapumiszoomilla
että porras sisään.


## 4. Savuke: uusi väite ja uusi vastakoe

`tools/savukkeet/savuke-era12.mjs`:

- **Väite 8 (uusi).** Kapealla ruudulla (390 × 844) Ranskan ankkuri on
  Lyoninlahdella, leveällä (1400 × 900) Biskajanlahdella; kummallakin
  kortti on kokonaan ruudulla ja 25 näytepistettä meren päällä.
  Ankkuri luetaan AJOSSA OLEVASTA pelistä (`lauta.maapaneeli.mitat()`)
  ja verrataan päätöksen lukuun 0,05°:n varalla. Kuvasuhde-ehto
  luetaan pelin omasta kamerasta (`kamera.korkeuteenSovitettu`), ei
  ruutukoosta — ruutuleveys ei ole väitteen ehto vaan sen olosuhde.
- **Vastakoe H (uusi).** `MAAPANEELIN_KAPEAT_ANKKURIT` tyhjäksi
  tarjoiltuun lähdetekstiin → Ranska jää Biskajanlahdelle myös
  pystypuhelimella, ja kortti jää ruudun ULKOPUOLELLE. Väitteen 8 on
  kaaduttava.
- **Vastakoe B korjattiin samalla.** Se tyhjentää nyt MOLEMMAT
  ankkuritaulut; muuten kapea ruutu olisi jäänyt Lyoninlahdelle eikä
  koe olisi enää palauttanut ankkuria eteläreunaan.
- `mittaa()` palauttaa uuden kentän `kapea`.

## 5. Portit

| portti | tulos |
|---|---|
| `npm test` | **# pass 3427, # fail 0** (3440 testiä, 13 ohitettua) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | kunnossa: 390 moduulia, 4308 top-level-julistusta, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | kunnossa: 1694 ui-viittausta, 407 metodia, 536 kenttää |
| `savuke-era12.mjs` | **21/21 vartiota läpi** (ennen: 19/19) — uusi väite 8 ja uusi vastakoe H |

`pollo.test.mjs`:n kuormavartiot eivät antaneet varoituksia tässä
ajossa.

Savukkeen olennaiset rivit:

    INFO  390 px · maapaneelin ankkuri (erä 16): korkeussovitus true →
          odotettu Lyoninlahti 42.6 N / 3.9 E, mitattu 42.6 N / 3.9 E
          (ero 0°, vara 0.05°), kortti kokonaan ruudulla true, merellä true
    INFO  1400 px · maapaneelin ankkuri (erä 16): korkeussovitus false →
          odotettu Biskajanlahti 45.9 N / -4.6 E, mitattu 45.9 N / -4.6 E
          (ero 0°), kortti kokonaan ruudulla true, merellä true
    OK    8. ankkuri: kapealla ruudulla Lyoninlahti, leveällä Biskajanlahti
    INFO  vastakoe H: keskiylä 45.9 N / -4.6 E, kortti x -198.5…-163 /
          0…373.6 → väite 8 PUNAINEN
    OK    VASTAKOE H: ilman kapea-ankkuria paneeli jää pystypuhelimella
          ruudun ulkopuolelle
    INFO  vastakoe B (ankkuri takaisin eteläreunaan): keskiylä 41.161 N /
          2.213 E, maaosumia 3 (ESP) → väite 2 PUNAINEN


## 6. Mitä EI tehty

Ei muita maita (vain Ranskan pilotti), ei muutosta `kamera.js`:n
logiikkaan (vain uusi export), ei Raamattua, ei versionostoa, ei
mergeä, ei `dist/`:iä.
