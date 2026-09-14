# Viesti Fablelle — karttauudistus, erä 12: zoomin rajaus ja maapaneeli Biskajanlahdelle (Ranska-pilotti)

**Opus-työagentti, 14.9.2026.** Haara
`claude/bold-ride-vow4ki-zoom-paneeli`, pohjana
`claude/bold-ride-vow4ki`. Toimeksianto: Raamatun KARTTAUUDISTUKSEN
PÄÄTÖKSET 9 kohdat 2–5 (omistaja 14.9.2026 klo 11.00 UTC: *"aloita
zoomin rajoittamisesta ja siirra maainfo laatikko biskajanlahden
paalle. silla pitaa olla kiintea paikka ja koko. eli koko pysyy
karttaan verrattuna samana, suurenee zoomatessa ja toisinpain.
laatikolla saisi olla isommat sisennykset tekstille (kehys liian
lahella)."*) sekä Fablen lisäys: erän 9 avoin löydös
*"saapumiskorkeuden kilpajuoksu"*.

**Lyhyesti:** uloszoomauksen esto EI pitänyt pelaajan kädessä, ja
juurisyy on sama kuin saapumiskorkeuden kilpajuoksussa — hetkellinen
kotelon mittauspiikki puristi kameran sisään ja jätti uloszoomausvaraa
49 %. Korjattu. Paneeli on nyt Biskajanlahdella ja skaalautuu kartan
mukana katkotta; sisennykset kaksinkertaistuivat. Kaikki portit
vihreinä, uusi savuke `savuke-era12.mjs` **9/9** kolmella pakollisella
vastakokeella.

---

## 1. Zoomin rajaus: mitattu nykytila ja juurisyy

Mittaus Playwrightilla (Chromium `/opt/pw-browsers/chromium`), peli
Pariisissa, pallolauta, **ei kehittäjätilaa**, kahdella ruudulla.

### 1.1 Mitä pidätti ja mitä ei (ENNEN)

| Mitta | 1400 × 900 | 390 × 844 |
|---|---|---|
| Saapumiskorkeus `altitude` | 0,2972 | 0,6268 → **0,4388** |
| Uloszoomauksen katto (`maxDistance`) | 0,3107 | 0,6553 |
| **Uloszoomausvara (katto / korkeus − 1)** | **4,5 %** | **49 %** |
| Näkyvä leveys lautayksikköinä | 889 | 539 → 384 |
| ctrl-rulla ulos ×25 | 0,2972 → 0,3107 (raja piti) | — |
| `pointOfView(altitude 2,5)` | → 0,3107 (raja piti) | → 0,6553 (raja piti) |
| Panorointi: veto 2 608–10 640 px itään | lng 2,213 → **11,764** (= raja) | lng 2,213 → **11,764** (= raja) |
| Maan laatikko vedon jälkeen ruudulla | kyllä | kyllä |

Kaksi havaintoa:

1. **Itse raja pitää.** `maxDistance` estää rullan, ohjelmallisen
   `pointOfView`in ja ohjaimet; panoroinnin raja puristaa keskipisteen
   täsmälleen laskettuun rajaan (Ranskan laatikko 14,69° × 1,3 / 2 =
   9,55° keskipisteestä 2,213 → 11,76). **Pituusasteen ja leveysasteen
   rajat toimivat sekä työpöydällä että puhelimella.**
2. **Kamera ei silti ole katossa.** Puhelimella kamera jää 0,4388:aan,
   vaikka katto on 0,6553 — pelaajalle jää 49 % uloszoomausvaraa eli
   40 % lisää näkyvää leveyttä. **Juuri tämän omistaja näkee.**

### 1.2 Juurisyy (mitattu, ei arvattu)

Instrumentoin `controls().maxDistance`- ja `minDistance`-kirjoitukset
pinoineen. Aikajana 390 × 844:

```
 1159 ms  maxDistance 2,5000 → 0,6553   tahdistaZoomirajat ← lauta.js:2890 (maan laatikko saapui)
 1194 ms  kamera       2,5000 → 0,6268   saapumisajo (kamera.kotiin)
10222 ms  minDistance  0,0698 → 0,0467   tahdistaZoomirajat ← ResizeObserver.mitoita
10225 ms  maxDistance  0,6553 → 0,4388   tahdistaZoomirajat ← ResizeObserver.mitoita
10865 ms  kamera       0,6268 → 0,4388   OrbitControls.update() puristaa kameran kattoon
10899 ms  min/max palaavat 0,0698 / 0,6553 — MUTTA KAMERA JÄÄ 0,4388:aan
```

**ResizeObserver ajaa `mitoita`n hetkellisellä kotelon mitalla**
(min ja max muuttuvat samassa suhteessa 0,669 → kuvasuhde hyppäsi
0,48:sta 0,72:een yhdeksi kehykseksi). Sen ajan uloszoomauksen katto
on laskettu väärällä kuvasuhteella, OrbitControls puristaa kameran
siihen **heti**, ja kun oikea mitta palaa 0,6 s myöhemmin, **katto
palaa mutta kamera ei**.

**Tämä on sama juurisyy kuin erän 9 raportin avoin löydös**
(docs/raportit/viesti-fable-karttauudistus-era9-20260913.md luku 2.4:
sama koodi päätyi korkeuksiin 0,4465 / 0,6268 / 0,6268). Se, kumpi
korkeus jää voimaan, ratkeaa pelkästään siitä, sattuuko mittauspiikki
ennen saapumisajoa vai sen jälkeen. **Kyllä — sama juurisyy, ja se on
nyt korjattu kertaalleen molempiin.**

### 1.3 Korjaus

`js/pallolauta/lauta.js` `tahdistaZoomirajat`: **katon lasku
muistetaan, ja kun katto nousee takaisin, kamera palautetaan sinne,
mistä puristus sen vei.** Palautus tehdään vain jos kamera on yhä
kiinni siinä alemmassa katossa — jos pelaaja on välissä zoomannut
itse, hänen zoominsa voittaa. Kuvasuhteen AITO muutos (ruudun kääntö)
rajaa kameran kuten ennenkin; hetkellinen mittauspiikki ei jätä
jälkeään.

En koskenut `ULOSZOOMAUKSEN_KERROIN`iin (1,15) enkä
`PANOROINNIN_KERROIN`iin (1,3) — mittaus osoitti, että ne tekevät
juuri sen mitä PÄÄTÖKSET 1–2 sanovat.

### 1.4 Tulos (JÄLKEEN)

| Mitta | 1400 × 900 | 390 × 844 |
|---|---|---|
| Saapumiskorkeus | 0,2509 | 0,6943 |
| Katto | 0,2623 | 0,6943 |
| **Uloszoomausvara** | **4,5 %** | **0 %** |
| ctrl-rulla ulos ×25 | +4,5 % (osuu kattoon) | **+0 %** |

Jäljelle jäävä 4,5 % työpöydällä on **suunniteltu** eikä vika:
uloszoomauksen kerroin on 1,15 ja saapumismarginaali 1 + 2 × 0,05 =
1,10, ja niiden suhde on tasan 1,045. Puhelimella kamera osuu
saapuessaan suoraan kattoon (vara 0 %), koska pystyruudulla korkeus
sitoo ensin. **Jos omistaja haluaa myös työpöydälle tarkan nollan,
säädin on `SAAPUMISRAJAUKSEN_MARGINAALI` tai kerroin 1,15 — mutta
kerroin on sidottu värilaataston laatikkoon, joten se on oma eränsä.**
En muuttanut sitä omin päin.

---

## 2. Maapaneeli Biskajanlahdelle, kiinteä paikka ja koko

### 2.1 Maakohtainen ankkuri

`js/pallolauta/maapaneeli.js` sai taulun `MAAPANEELIN_ANKKURIT`
(lat/lng, muunnos samalla `projisoiLaudalle`-kaavalla kuin koko
laudalla). Ranskalle **45,9 N / 4,6 W**; muut maat pitävät
eteläreunan oletuksen, koska Ranska on pilotti (PÄÄTÖKSET 9 kohta 1).
`paneelinAnkkuri(laatikko, iso)` ja `paneelinLaatikko(laatikko, iso)`
saivat ISO-parametrin; saapumislaatikko on nyt maan laatikon ja
paneelin nelikulmion **yhdiste** kaikkiin neljään suuntaan (ennen vain
alaspäin venytys).

Mitattu paikka (laudan yksiköt ja asteet, `assets/data/maapolygonit.json`):

| | |
|---|---|
| Ranskan laatikko | 489,8 × 406,3 yks = lon −5,13…9,56, lat 41,37…51,09 |
| Paneelin lautamitta | 93,8 × 74,0 yks |
| Paneeli asteina | **lon −6,01…−3,19, lat 44,10…45,90** |
| Maaosumia 25 näytepisteestä | **0 (kaikki merellä)** |
| Saapumislaatikko ennen / nyt | 489,8 × 488,4 / **518,9 × 406,3** |

Ranskan Atlantin rannikko on tällä leveydellä noin 1,2 W ja Espanjan
pohjoisrannikko 43,4 N, joten kortti on kokonaan avovedellä.
Kuvakaappaukset: `docs/raportit/kuvat/karttauudistus-12-tyopoyta.png`
ja `-puhelin.png`.

**Kortti mahtuu ruutuun saapumisnäkymässä molemmilla ruuduilla:**
työpöydällä x 335…508 / 0…1379 ja y 427…563 / 0…821; puhelimella
x 66…124 / 0…374 ja y 393…440 / 0…775. Sisällön ylivuoto 0 px.

### 2.2 Koko on kiinteä karttaan nähden

`MAAPANEELIN_SKAALA_MAX` **katkaisi skaalauksen kesken pelialueen**.
Mitattu Ranskassa: saapumisnäkymän ruutuskaala on työpöydällä 1,59 ja
puhelimella 0,57, ja lähin sallittu zoomi on työpöydällä 13,1× ja
puhelimella 9,9× sisempänä — skaala olisi siis **20,7** ja **5,6**,
mutta katto oli **3**. Katto tuli vastaan jo parin zoomiportaan jälkeen, ja
siitä eteenpäin paneeli liukui kartan päällä sen sijaan että olisi
pysynyt kartassa kiinni.

Katto on nyt **64** (yli kolminkertainen pelialueen suurimpaan
tarpeeseen) ja alaraja 0,45 ennallaan — kumpikaan ei sido pelialueella,
ne ovat vain kehittäjän maailmanäkymän ja linssien varaus.

**Todiste, kolme zoomitasoa (uloin sallittu, 1/4, 1/8 siitä):**

| Ruutu | alt / kortti px / `skaala × korkeus` | hajonta |
|---|---|---|
| 390 × 844 | 0,694 / 58,8 / **0,39263** · 0,174 / 235,3 / **0,39263** · 0,087 / 470,5 / **0,39263** | **0 %** |
| 1400 × 900 | 0,262 / 164,9 / **0,41593** · 0,066 / 659,6 / **0,41593** · 0,033 / 1319,2 / **0,41593** | **0 %** |

`skaala × korkeus` on vakio silloin ja vain silloin, kun mikään raja ei
katkaise skaalausta (skaala ∝ px per lautayksikkö ∝ 1 / korkeus).
Tehtävänannon pyytämä **ruutuleveyksien suhde** (kortti / maan laatikon
ruutuleveys) on 390 px:llä 0,2799 → 0,2847 → 0,2910 eli **hajonta
3,9 %** ja 1400 px:llä 0,2825 → 0,2951 → 0,3119 eli **9,9 %**. Ero ei
ole katko koodissa vaan **pallon geometria**: kortti on litteä
HTML-elementti, jonka mittakaava on ruudun keskipisteen mittakaava,
kun taas maan laatikon reunat projisoituvat pallolta perspektiivissä
lyhyemmiksi. Sama ilmiö on nähtävissä siinä, että kortin ruutuleveys
kaksinkertaistuu **tarkalleen** jokaisella zoomiportaalla (58,8 →
235,3 → 470,5 ja 164,9 → 659,6 → 1319,2). Kirjaan tämän avoimena
havaintona luvussa 5 enkä väännä koodia geometriaa vastaan.

---

## 3. Isommat sisennykset

Kehyksen **sisemmän** (paksun) viivan sisäreuna on 3,743 px kortin
reunasta (ohut 0,494 + väli 1,349 + paksu 1,900,
`js/kasinpiirto.js`). Sisuksen pehmuste oli 4 / 4,5 px:

| | ennen | nyt |
|---|---|---|
| Pehmuste (pysty / vaaka) | 4 / 4,5 px | **8 / 9 px** |
| **Tekstin ja sisemmän viivan väli** | **0,26 / 0,76 px** | **4,26 / 5,26 px** |
| Kortin peruskoko | 95 × 74 px | **104 × 82 px** |
| Sisällön ala | 86 × 66 px | **86 × 66 px (sama)** |
| Sisällön ylivuoto (mitattu) | 0 px | **0 px** |

**Tekstiä ei tiivistetty eikä fonttikokoja koskettu** (PÄÄTÖKSET 7).
Kortti kasvaa tasan pehmusteen lisäyksen verran, ja osuudet
(`MAAPANEELIN_LEVEYS_OSUUS` 0,175 → 0,1916, `KORKEUS_OSUUS`
0,21 → 0,2327) kasvavat samassa suhteessa, jolloin `perusta`
(lautayksikköä per css-px) pysyy **0,9024** — teksti on ruudulla
täsmälleen entisen kokoista, ja vain kortin oma reunus levenee. Sama
sääntö sovellettiin `.maapaneeli-nimi { padding-right }`iin (11 → 6
px): nimi loppuu yhä täsmälleen siihen, mistä plussa alkaa.

Paneelin lautamitta kasvoi 85,7 → 93,8 yks (+9,5 %). Ruudulla kortti
on puhelimella 58,8 px (ennen 59,5 px, käytännössä sama) ja
työpöydällä 172,4 px (ennen 133,0 px) — työpöydän kasvu ei tule
sisennyksestä vaan siitä, että saapumislaatikko ei enää veny paneelin
verran etelään, jolloin kamera on lähempänä (alt 0,2972 → 0,2509).
Osuus ruudun leveydestä: puhelin 15,7 % (ennen 15,9 %), työpöytä
12,5 % (ennen 9,6 %).

---

## 4. Portit ja vastakoe

```
npm test                              # pass 3354, fail 0
node tools/tarkista-kaksoisavaimet.mjs  # ei kaksoisavaimia
node tools/tarkista-niputus.mjs         # 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       # 1629 ui-viittausta, kunnossa
node tools/savukkeet/savuke-era12.mjs   # 9/9 vartiota läpi
```

Yksi olemassa oleva yksikkötesti päivitettiin
(`tests/maakartuutsi.test.mjs`: `paneelinLaatikko(laatikko, iso)`).

**Uusi savuke `tools/savukkeet/savuke-era12.mjs`** vartioi kolmea
väitettä molemmilla ruuduilla, ja se mittaa **9 sekunnin levon
jälkeen** — muuten luvun 1.2 mittauspiikki ei ehdi tapahtua eikä
savuke mittaisi mitään.

**VASTAKOKEET (kaikki tehdään tarjoiltavaan lähdetekstiin, joten peli
ajaa oikeasti vanhalla arvolla):**

| | Muutos | Tulos |
|---|---|---|
| **A** | `ULOSZOOMAUKSEN_KERROIN` 1,15 → 3 | katto 1,8111 vs. korkeus 0,6641 → **vara 172,7 %**, väite 1 **PUNAINEN** ✔ |
| **B** | `MAAPANEELIN_ANKKURIT` tyhjäksi (ankkuri takaisin eteläreunaan) | paneeli 41,161 N / 2,213 E, **3 maaosumaa (ESP)**, väite 2 **PUNAINEN** ✔ |
| **C** | `MAAPANEELIN_SKAALA_MAX` 64 → 3 | skaala 0,566 → 2,262 → **3 (katkaistu)**, `skaala × korkeus` 0,39263 → 0,39263 → **0,26035**, hajonta 38 %, väite 3 **PUNAINEN** ✔ |

Kaikki kolme vastakoetta kaatavat oman väitteensä, eli väitteet
mittaavat sitä mitä lupaavat.

---

## 5. Avoimet havainnot (en korjannut, kirjaan)

1. **Työpöydälle jää 4,5 % uloszoomausvaraa** (luku 1.4). Se on
   suunniteltu ero kertoimen 1,15 ja saapumismarginaalin 1,10 välillä.
   Tarkan nollan saisi vain siirtämällä toista lukua, ja 1,15 on
   sidottu värilaataston laatikkoon (`--laatikkokerroin`). Omistajan
   päätettävä, onko 4,5 % liikaa.
2. **Kotelon mittauspiikki on yhä olemassa** — korjasin sen
   *seurauksen* (kamera ei jää puristukseen), en syytä. Jokin asettelu
   muuttaa kotelon kuvasuhdetta 0,48 → 0,72 yhden kehyksen ajaksi noin
   7–10 s saapumisen jälkeen puhelinkoossa. Sama piikki voi häiritä
   muuta ruutuun sidottua mitoitusta (kaupunkipisteiden koko,
   laattataso). Ansaitsee oman erän.
3. **Kortin ruutuleveyden suhde maan laatikon ruutuleveyteen ei ole
   vakio** (luku 2.2): pallon perspektiivi litistää laatikon reunoja
   3,9 % (puhelin) ja 9,9 % (työpöytä) kolmen zoomiportaan yli. Täysin
   kartanmukainen kortti vaatisi kortin piirtämisen pallon pinnalle
   tekstuurina, ei HTML-elementtinä — iso remontti.
4. **Työpöydällä kortti on nyt 12,5 % ruudun leveydestä** (ennen
   9,6 %), koska saapumislaatikko ei enää veny etelään. Jos omistaja
   pitää tätä liian isona, säädin on `MAAPANEELIN_LEVEYS_OSUUS`.
5. Puhelimen uloimman zoomin tekstikoko on entinen (PÄÄTÖKSET 7:n
   mukaisesti hyväksytty), ja kortin pikselikoko ruudulla on sama kuin
   ennen erää — sisennys ei siis pienentänyt tekstiä.

---

## 6. Muutetut tiedostot

- `js/pallolauta/maapaneeli.js` — `MAAPANEELIN_ANKKURIT` (FRA),
  `paneelinAnkkuri(laatikko, iso)`, `paneelinLaatikko(laatikko, iso)`
  yhdisteenä, peruskoko 104 × 82, osuudet 0,1916 / 0,2327,
  `SKAALA_MAX` 3 → 64.
- `js/pallolauta/lauta.js` — `tahdistaZoomirajat`: katon puristuksen
  palautus; `saapumislaatikko` välittää ISO:n.
- `css/styles.css` — kortin koko 104 × 82, sisuksen pehmuste 8 / 9 px,
  nimen oikea varaus 6 px.
- `tests/maakartuutsi.test.mjs` — vartio uudelle allekirjoitukselle.
- `tools/savukkeet/savuke-era12.mjs` — uusi savuke vastakokeineen.
- `docs/raportit/kuvat/karttauudistus-12-{tyopoyta,puhelin}.png`.

Ei versionostoa, ei muutoslokiriviä, ei mergeä, ei dist-committia —
ohjeen mukaan.
