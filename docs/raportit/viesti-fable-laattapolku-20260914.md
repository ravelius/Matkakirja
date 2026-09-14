# Tasoituslaatat maakohtaiseen polkuun — ja kolme muuta korjausta (14.9.2026)

*(Opus-työsessio Fablelle. Haara `claude/julkaisu-laattapolku`, pohja
origin/main v1857, julkaisu v1858. Jokainen luku on MITATTU tässä
kontissa; arviot on merkitty sanalla "arvio".)*

## 0. Lyhyesti

Neljä korjausta samassa erässä. Kaikki neljä ovat rakennusaikaisia:
**pelin ulkoasu ei muutu tässä erässä lainkaan** ennen kuin laatat on
ajettu uudelleen (luku 7, AJOLISTA).

| # | asia | tila |
| --- | --- | --- |
| 1 | **MAA POLKUUN** — `<variversio>/vari/<ISO>/z…` molemmissa päissä | tehty, mitattu testillä |
| 2 | **HÄIVE ULOSPÄIN** — laatikon sisällä ja reunalla täyspeitto | tehty, mitattu laatan alfasta |
| 3 | **LAATIKKO KUVASUHTEELLE 2,0** — laattamäärä 1195 → 1377 (+15,2 %) | tehty, mitattu kuiva-ajolla |
| 4 | **VERSIOPORTTI** — lukee yhä pelin oman funktion, hyväksyy uuden polun | tarkistettu, ei muutostarvetta |

Polun VANHA/UUSI-otos (todelliset merkkijonot, Ranska, z4/9/3):

```
VANHA  https://media.matkakirja.app/julisteet/pyramidi/2026-09-13-tasoitus/vari/z4/9/3.webp
UUSI   https://media.matkakirja.app/julisteet/pyramidi/2026-09-14-tasoitus/vari/FRA/z4/9/3.webp
```

**HUOM. ÄMPÄRI ON NYT ERI POLUSSA KUIN PELI.** Vanhassa polussa oleva
laatasto on 13.9.2026:n ajojen sekasotku (27 maata samassa
osoitteessa), eikä peli enää lue sitä. Kunnes laatat on ajettu uuteen
polkuun, peli maalaa tasoituksen ilman laattoja: kerma suojatun
suorakaiteen ulkopuolelle ja kohdemaan laatikko alkuperäisenä
(v1857:n `maalaaTasoitus`, puuttuva laatta → kerma). Kartta on siis
ehjä mutta kohdemaan naapurit jäävät laatikon sisällä
tasoittamatta — tämä on sama tila kuin ennen 13.9:n ajoja, ja se
korjaantuu ajolistalla.

---

## 1. Korjaus 1: maa polkuun (päävika)

### 1.1 Mitattu juurisyy (kertaus, edellinen erä)

`docs/raportit/viesti-fable-kaistat-20260913.md` luku 5: laatan osoite
oli `julisteet/pyramidi/<versio>/vari/z<z>/<x>/<y>.webp` — **ilman
maata** — ja kaikkien 27 maan `varitasot[ISO].versio` on sama
merkkijono `2026-09-13-tasoitus` (tarkistettu ämpäristä uudelleen
tänään: 27 maata, kaikilla sama versio ja kaikilla `tasoitus: true`).
Maiden laatikot menevät päällekkäin, joten saman avaimen kirjoitti moni
ajo ja voimaan jäi viimeinen. Mitattu todiste oli kolme eri
Last-Modified-leimaa saman "Ranskan" laatastossa ja laatan z4/9/4
alfassa musta ala Pohjois-Espanjassa, jota Ranskan ajo ei ole voinut
piirtää; ruudulla se näkyi 41 px:n vaaleana suorakaiteena.

### 1.2 Valittu muoto ja miksi

```
<variversio>/vari/<ISO>/z<taso>/<sarake>/<rivi>.<muoto>
```

Maa tulee **`vari/`:n jälkeen** eikä version eteen kolmesta syystä,
ja kaikki kolme ovat koodissa eivätkä maun asia:

1. Työnkulun vientisilmukka ja savukkeiden paikallinen tarjoilu
   leikkaavat polun juuri `/vari/`-kohdasta
   (`osa.slice(osa.indexOf('/vari/') + 1)`,
   tools/savukkeet/savuke-tasoitus-pallo.mjs). Maa version edessä olisi
   vaatinut molempien leikkauksen uudelleenkirjoittamisen; tässä
   muodossa savukkeen tarjoilu toimi muuttumattomana.
2. `variversio` on ajon tunnus ja se on jo luettelossa maakohtaisena
   kenttänä (`varitasot[ISO].versio`) — polun ensimmäinen osa pysyy
   siis sinä, mitä työnkulun syöte `variversio` sanoo, eikä työnkulkuun
   tarvittu uutta kenttää.
3. Ämpärissä `<versio>/vari/<ISO>/` listautuu maittain, eli yhden maan
   laatat voi poistaa tai laskea yhdellä prefiksillä.

### 1.3 Polku on YKSI funktio, ja se on mitattu

Kohdat tiedosto:rivi:

| tiedosto:rivi | muutos |
| --- | --- |
| `js/media.js:360` | **UUSI vienti `varitasonPolku(versio, iso, z, sarake, rivi, muoto)`** — pelin ja työkalun yhteinen polku. media.js on lehtimoduuli (ei yhtään tuontia), joten generaattori voi tuoda sen sellaisenaan. |
| `js/laattapyramidi.js:91` | tuonti `varitasonPolku` |
| `js/laattapyramidi.js:678` | `laattaUrl` väritason haara käyttää yhteistä funktiota ja antaa sille kohdemaan (`variMaaNyt`) |
| `js/laattapyramidi.js:615` | laatan välimuistiavaimeen myös MAA (`<versio>/<ISO>`) — kaikilla mailla on sama versio, joten pelkkä versio ei enää erota kahta tiedostoa |
| `tools/generoi-laattapyramidi.mjs:107` | tuonti `varitasonPolku` `../js/media.js`:stä |
| `tools/generoi-laattapyramidi.mjs:3187` | vientikansio `vari/<ISO>/z<taso>/<sarake>` |
| `tools/generoi-laattapyramidi.mjs:3466` | **laataston bittikartta luetaan samasta kansiosta** (`laatastoBase64(m, join('vari', VARI_MAA))`). TÄMÄ OLI ERÄN OMA ANSA: maaton skannaus antoi tyhjän bittikartan, peli päätteli ettei yhtään laattaa ole eikä pyytänyt mitään. Savuke näki sen (V0 punaisena, `varillisia 0`), ja siksi savuke on erässä mukana. |
| `tools/generoi-laattapyramidi.mjs:1155` | lokirivi `polku vari/<ISO>/z<taso>` |
| `tools/generoi-laattapyramidi.mjs:1969` | kuiva-ajon **polkuotos**: todellinen merkkijono ensimmäisestä laatasta |
| `tools/generoi-laattapyramidi.mjs:3692` | loppurivi `Vie ämpäriin: pyramidi/<variversio>/vari/<ISO>/z…` |
| `.github/workflows/generoi-varitaso.yml` | vientisilmukka lukee `ulos/vari/$MAA/z*` ja vie `…/$VARIVERSIO/vari/$MAA/$z`; kuiva-ajon tuloste ja `variversio`-kentän kuvaus päivitetty; uusi kommenttilohko "MAA ON POLUSSA" |

**Mittaus (tests/varitasopolku.test.mjs, UUSI, 4 väitettä):**

1. *Generaattorin ja pelin polku on sama merkkijono.* Generaattori
   ajetaan oikeasti (`--kuiva`) ja sen **polkuotos** luetaan
   tulosteesta; peli tuodaan moduulina ja siltä kysytään
   `pyramidinLaattaUrl({ vari: true, z }, sarake, rivi)`. Väite on
   merkkijonojen yhtäsuuruus, ei muodon tarkistus.
2. *Eri maat tuottavat eri polun samalla `variversio`lla* — FRA vs.
   ESP, sekä generaattorin että pelin päässä. Juuri tämä puuttui.
3. *Kumpikin pää rakentaa polun yhteisestä funktiosta* (ja pelissä ei
   ole enää maatonta `…/vari/z${…}`-mallinetta).
4. *Väritason laatta-avaimessa on maa.*

```
tests/varitasopolku.test.mjs   # pass 4  # fail 0
```

## 2. Korjaus 2: häive laatikosta ULOSPÄIN

`tools/fokuskartta/maailmapiirto.js:463-480` (`polttaVariLeikkuri`) piirsi
häiveen neljänä kaistaleena laatikon reunasta **sisäänpäin**
(`kaista(lx0, 0, lx0 + rx, H, true)`, `destination-out`): kerma pyyhkiytyi
nollaan juuri reunalla ja palasi täyteen sekä sisempänä että laatikon
ulkopuolella. Se on kaksi terävää reunaa yhden pehmennyksen sijaan.

Nyt liuku menee toisin päin (`kaista(lx0 - rx, 0, lx0, …)`) ja häiveen
takana kerma pyyhitään kokonaan (`pyyhi`) — muuten se palaisi täyteen
ja liuku olisi vain uusi porras. Laatikon sisällä ja reunalla on
täyspeitto, eli sama peitto, jonka peli maalaa suojatun suorakaiteen
ulkopuolelle (v1857 `js/pallolaatat.js maalaaTasoitus`): laatasto ja
asiakkaan kerma liittyvät toisiinsa saumattomasti.

**MITATTU LAATAN ALFAKANAVASTA**, Ranska, z4/9/4, laatikon läntinen
reuna laatan x-koordinaatissa 287,9 (häive 126 px = 140 lautayksikköä),
nimellinen peitto 0,85 → alfa **217**. Mediaani koko pystyriviltä:

| dx laatikon reunasta (px) | −146 | −126 | −106 | −66 | −26 | **+4** | +44 | +124 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **UUSI (häive ulospäin)** | 0 | 1 | 36 | 104 | 173 | **217** | 217 | 217 |
| **VANHA (häive sisään)** | 217 | 217 | 217 | 217 | 217 | **8** | 77 | 215 |

Vanha profiili on täsmälleen se 217 → 20 → 217, jonka edellinen erä
mittasi laatasta `2026-09-13-tasoitus/vari/z4/9/4.webp`. Uusi on yksi
monotoninen liuku 0 → 217 ja sen jälkeen tasainen.

Vastakoe on generaattorin lippu **`--haive-sisaan`** (sama tapa kuin
`--ilman-rajausta`): se ajaa laatat entisellä, väärinpäin olleella
häiveellä, jolloin savukkeen V10 on kaaduttava (luku 5).

## 3. Korjaus 3: laatikko kuvasuhteelle 2,0

`tools/generoi-laattapyramidi.mjs:736` `NAKYMAN_KUVASUHTEET`: levein
ruutu oli 1920 × 1080 = **1,778**, mutta rootin oma ruutu on
2560 × 1352 = **1,893** — leveämpi kuin laatikko, jolloin laatasto
loppuu kesken ja kartalla näkyy laattaruudukon reuna. Listaan lisättiin
`[2560, 1280]` eli tasan **2,0**.

Mitattu Ranskalla (`--kuiva`, tasot 4–8, `--laatikko-nakyma`):

| | laatikko laudalla | leveys | häive | laattoja |
| --- | --- | ---: | ---: | ---: |
| ilman `--laatikko-nakyma` (vertailu) | x 5625,5…6188,7 · y 1312,1…1779,4 | 563,2 | 84 | **329** |
| ennen (kuvasuhde 1,778) | x 5491,8…6322,4 · y 936,3…2155,2 | 830,6 | 125 | **1195** |
| **nyt (kuvasuhde 2,0)** | x 5439,9…6374,3 · y 936,3…2155,2 | **934,4** | 140 | **1377** |

Kasvu on **+182 laattaa (+15,2 %)**; korkeus ei muutu, koska sen
määrää kapein ruutu (390 × 844). Todellinen ajo mitattuna tässä
kontissa: **1377 laattaa, 2,05 Mt, 45,0 s** (z4 9 · z5 24 · z6 70 ·
z7 266 · z8 1008). Tehtävänannon vertailuluku 329 on laatikko ILMAN
näkymäunionia; 569 lautayksikköä on z4:n laatan leveys, ei laatikko.

Laatikko on yhä unioni entisen kanssa, joten aluevesipuskuri ja
kerroin 1,15 pysyvät alarajana eikä pikkuvaltio kutistu.

## 4. Korjaus 4: versioportti

`tools/tarkista-varitason-portti.mjs` lukee edelleen **pelin oman
funktion** (`import { lepokerroksenKerrokset } from '../js/pallolaatat.js'`)
eikä YAML:iin kirjoitettua kopiota ehdosta. Portti tarkistaa
`pyramidi.varitasot[ISO]`-kirjauksen eikä laatan polkua, joten uusi
polkumuoto ei vaikuta siihen — ja juuri siksi se ei tarvinnut
muutosta. Ajettu molemmilla luetteloilla:

```
# 1) ÄMPÄRIN NYKYINEN LUETTELO (ladattu tänään)
$ node tools/tarkista-varitason-portti.mjs --pallo laatat-ampari.json \
    --pyramidi pyramidi-ampari.json --maa FRA
  pallon sarja    versio 2026-09-07a · viivat 2026-09-08a-viivat · nostot 2026-09-08a-nostot · ranta –
  pyramidi        versio 2026-09-07a · viivataso 2026-09-08a-viivat · nostotaso 2026-09-08a-nostot · rantataso 2026-09-07a-ranta
  varitasot[FRA]  versio 2026-09-13-tasoitus · paletti tasoitus · tasot 4,5,6,7,8
  kerrokset       {"pohja":true,"ranta":false,"viiva":true,"nosto":true,"vari":true}
  TULOS           laattakerros on päällä ja FRA:n väritaso näkyy.   (exit 0)

# 2) TÄMÄN ERÄN OIKEAN FRA-AJON LUETTELO, yhdistettynä ämpärin luetteloon
#    samalla funktiolla ja samoilla valitsimilla kuin ajossa
#    (tools/pyramidiluettelo.mjs yhdistaLuettelo, generaattorin rivi 3646)
$ node tools/tarkista-varitason-portti.mjs --pallo laatat-ampari.json \
    --pyramidi pyramidi-uusi.json --maa FRA
  pyramidi        versio 2026-09-07a · viivataso 2026-09-08a-viivat · nostotaso 2026-09-08a-nostot · rantataso 2026-09-07a-ranta
  varitasot[FRA]  versio pilotti-uusi · paletti tasoitus · tasot 4,5,6,7,8
  kerrokset       {"pohja":true,"ranta":false,"viiva":true,"nosto":true,"vari":true}
  TULOS           laattakerros on päällä ja FRA:n väritaso näkyy.   (exit 0)
```

Pohjan versio säilyi (`2026-09-07a`) ja kaikkien 27 maan kirjaukset
säilyivät (mitattu: `maita 27`). `ranta: false` on ämpärin nykytila
eikä tämän erän muutos: pallon sarjan `laatat.json`:issa ei ole
`ranta`-kenttää. Myös `tests/varitaso-luettelo.test.mjs` ajaa portin ja
on vihreä.

## 5. Savuke ja vastakoe

Laajennettu **`tools/savukkeet/savuke-tasoitus-pallo.mjs`** (ei uutta
savuketta): kaksi uutta väitettä entisten kahdeksan päälle.

* **V9 MAA ON LAATAN POLUSSA.** Luetaan reitittimen kirjanpidosta eli
  niistä osoitteista, jotka **peli oikeasti pyysi** — ei savukkeen
  omasta mallineesta. Väite: jokainen pyyntö on muotoa
  `<versio>/vari/FRA/z<z>/<x>/<y>.webp` ja vähintään yksi löytyi
  kansiosta, johon generaattori kirjoitti. Tämä mittaa molemmat päät
  kerralla: laatat tulevat generaattorin tuotoskansiosta.
* **V10 HÄIVE ULOSPÄIN.** Mitataan **laatan alfakanavasta**, koska
  pelin oma maalaus peittää laatikon reunan ruudulla (v1857) — kartalta
  häivettä ei enää näe, mutta laatassa se on yhä, ja se on se, mitä
  muut asiakkaat ja tulevat kerrokset lukevat. Laatta ja mittauskohdat
  lasketaan luettelon omasta laatikosta; savukkeeseen ei kirjoiteta
  yhtään sarake- tai pikselilukua.

```
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_USE_ENV_PROXY=1 \
  node tools/savukkeet/savuke-tasoitus-pallo.mjs --laatat <kansio>
```

SAVUKKEEN_TULOS

**VASTAKOE ON PAKOLLINEN JA SE ON PUNAINEN.** Sama savuke, samat
asetukset, mutta laatat ajettu generaattorin lipulla
`--haive-sisaan` eli korjaus palautettuna:

VASTAKOE_TULOS

`savuke-kaistat-levea.mjs` (edellisen erän savuke, mittaa TUOTANNON
laatastoa) sai tässä erässä ohituksen: se tarkistaa nyt, onko
ämpärissä laatastoa maakohtaisessa polussa, ja jos ei ole, se tulostaa
`OHITUS` ja poistuu nollalla. Perustelu: puuttuva laatasto on ämpärin
tila eikä tämän haaran vika, ja peli on silloin ehjä (puuttuvan laatan
tilalle maalataan kerma). Kun ajolista on ajettu, savuke alkaa mitata
itsestään uudelleen — otoslaatta luetaan laataston omasta
bittikartasta eikä ole kirjoitettu savukkeeseen.

## 6. Julkaisu

JULKAISU_TULOS

## 7. AJOLISTA: 27 maata, PERÄKKÄIN

**Ajot on ajettava PERÄKKÄIN, yksi kerrallaan.** Syy ei ole enää
laattojen törmäys (maa on polussa) vaan **luettelo**: jokainen ajo
lataa ämpärin `pyramidi.json`:in, yhdistää siihen oman
`varitasot[ISO]`-kirjauksensa ja kirjoittaa sen takaisin
(työnkulun "LUETTELO TÄYDENTYY"). Kaksi rinnakkaista ajoa lukisi saman
lähtöluettelon ja jälkimmäinen pyyhkisi edellisen kirjauksen.

**Syötteet jokaiselle ajolle** (.github/workflows/generoi-varitaso.yml):

| kenttä | arvo |
| --- | --- |
| `maa` | listan ISO A3 |
| `paletti` | `tasoitus` |
| `peitto` | `0.85` |
| `kerma` | tyhjä (paletin oletus #faf4d6) |
| `variversio` | **`2026-09-14-tasoitus`** — uusi versio, koska laatikko (kuvasuhde 2,0) ja häive muuttuivat; vanha `2026-09-13-tasoitus` jää ämpäriin lukematta |
| `tasot` | `4-8` |
| `laatikko_nakyma` | **päällä** |
| `laatikkokerroin` | tyhjä (1,15) |
| `feidausreuna` | tyhjä (15 % laatikon lyhyemmästä sivusta) |
| `kuiva` | pois (ensimmäisellä maalla voi ajaa ensin `kuiva: true`) |
| `vie` | päällä |

Järjestys on ämpärin luettelon nykyinen järjestys eli sama, jolla erä
ajettiin 13.9.2026 — FRA ensin (pilotti, jonka omistaja on hyväksynyt),
sitten pelin kannalta tiheimmin käydyt maat. **Ei RUS, ei ISL.**

| # | maa | tarkistus: HEAD 200 |
| ---: | --- | --- |
| 1 | FRA | `curl -sI https://media.matkakirja.app/julisteet/pyramidi/2026-09-14-tasoitus/vari/FRA/z4/9/3.webp` |
| 2 | GBR | `…/vari/GBR/z4/9/3.webp` |
| 3 | ESP | `…/vari/ESP/z4/9/4.webp` |
| 4 | DEU | `…/vari/DEU/z4/10/3.webp` |
| 5 | ITA | `…/vari/ITA/z4/10/4.webp` |
| 6 | NLD | `…/vari/NLD/z4/10/3.webp` |
| 7 | AUT | `…/vari/AUT/z4/10/3.webp` |
| 8 | CHE | `…/vari/CHE/z4/10/4.webp` |
| 9 | PRT | `…/vari/PRT/z4/9/4.webp` |
| 10 | IRL | `…/vari/IRL/z4/9/3.webp` |
| 11 | CZE | `…/vari/CZE/z4/10/3.webp` |
| 12 | HUN | `…/vari/HUN/z4/11/4.webp` |
| 13 | POL | `…/vari/POL/z4/10/3.webp` |
| 14 | GRC | `…/vari/GRC/z4/11/4.webp` |
| 15 | HRV | `…/vari/HRV/z4/10/4.webp` |
| 16 | BIH | `…/vari/BIH/z4/11/4.webp` |
| 17 | BGR | `…/vari/BGR/z4/11/4.webp` |
| 18 | ROU | `…/vari/ROU/z4/11/3.webp` |
| 19 | UKR | `…/vari/UKR/z4/11/3.webp` |
| 20 | FIN | `…/vari/FIN/z4/10/2.webp` |
| 21 | EST | `…/vari/EST/z4/11/3.webp` |
| 22 | LVA | `…/vari/LVA/z4/11/3.webp` |
| 23 | LTU | `…/vari/LTU/z4/11/3.webp` |
| 24 | SWE | `…/vari/SWE/z4/10/2.webp` |
| 25 | NOR | `…/vari/NOR/z4/10/1.webp` |
| 26 | DNK | `…/vari/DNK/z4/10/3.webp` |
| 27 | TUR | `…/vari/TUR/z4/11/3.webp` |

Otoslaatat EIVÄT ole arvattuja: ne on luettu ämpärin nykyisen
luettelon `varitasot[ISO].laatastot[4]`-bittikartoista (ensimmäinen
olemassa oleva z4-laatta kullekin maalle). Uusi laatikko on entisen
YLIJOUKKO (leveys kasvaa, korkeus ei muutu), joten jokainen näistä
laatoista on olemassa myös uuden ajon jälkeen.

**Luettelon tarkistus jokaisen ajon jälkeen** (sama komento, vaihda
ISO):

```
curl -s https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json \
  | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
      const v=JSON.parse(s).varitasot?.FRA;
      console.log(v ? `${v.maa} ${v.versio} · tasot ${v.tasot} · peitto ${v.peitto}`
        + ` · häive ${v.feidausReuna} · laatikko ${JSON.stringify(v.laatikko)}` : "EI KIRJAUSTA");
    })'
```

Odotusarvo uuden ajon jälkeen: `versio 2026-09-14-tasoitus`,
`tasot 4,5,6,7,8`, `peitto 0.85`, ja Ranskalla `laatikko` leveys
934,4 (ennen 830,6). Työnkulku ajaa versioportin itse sekä ennen ajoa
että ennen ensimmäistäkään vietyä tavua, joten sammunut kerros ei voi
päästä ämpäriin.

Ajolista on **eri erä**: tämä sessio EI ajanut työnkulkua.

## 8. Mitä EI koskettu

Tekstit, äänet, kuvat, Pulun ohjain, lehdet, tarinasisältö, kamera ja
uloszoomauksen esto ovat ennallaan. Kohdemaan laatta on edelleen
alkuperäinen (leikkurin puskuri 0, ei sinisiä aluevesiä) — päätös 4
pysyy sanatarkasti voimassa. Vanhaa polkua ei siivottu ämpäristä:
siihen ei kosketa, koska poisto on peruuttamaton eikä sitä tarvita.

## 9. Avoimet asiat

1. **Laatat on ajettava** (luku 7). Siihen asti kohdemaan naapurit
   jäävät laatikon sisällä tasoittamatta.
2. `savuke-kaistat-levea.mjs` ohittaa itsensä, kunnes ajolista on
   ajettu. Se kannattaa ajaa uudelleen heti FRA:n ajon jälkeen —
   silloin se mittaa kaikki neljä rajaa uudesta laatastosta ja on
   ensimmäinen koneellinen todiste siitä, että laatasto ja asiakkaan
   kerma liittyvät saumattomasti.
3. Edellisen erän suositus 2 (**tasoitus kokonaan ilman laatastoa**,
   renkailla leikattu maalaus) on yhä auki. Tämä erä teki polusta ja
   häiveestä oikeat, mutta ei poistanut laatastoa; se olisi isompi
   muutos ja oma eränsä.
