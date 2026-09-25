# Astronautin kameran napa, laattalaikut ja kohdeotsikko (Opus, 19.9.2026 klo 14.36–15.10 Suomen aikaa)

Erä: Sonnetin puhelintestin (v1952) löydökset 4 ja 5. Haara
`claude/bold-ride-vow4ki-astro-napa`, pohja `fd8c8d19` (v1952).
Aikakatto 45 min täyttyi kesken juurisyyn varmistuksen; tämä raportti
kertoo tarkalleen, mikä on mitattu ja mikä ei.

**Rehellinen rajaus:** löydös 5 (kohdeotsikko) on korjattu.
Löydös 4 (napa + laattalaikut) on **JÄÄNYT KORJAAMATTA**: paikallinen
Playwright-ajo ei toista vikaa lainkaan, eikä arvaukselle tehtyä
piirtomuutosta saa työntää linssiin mittaamatta. Juurisyylle on
koodinluvusta yksi vahva ehdokas ja sille valmis, yhden rivin korjaus
— se on alla, mutta sitä EI ole tehty tässä erässä.

## 1. Miksi paikallinen ajo ei toista napalöydöstä

Luotain (Chromium 390 × 844, dpr 2, portti 8896, sama avausketju kuin
`tools/savukkeet/savuke-astro-pallo.mjs`: peli auki → satelliittilinssi
laukusta → `pointOfView` navan ylle) antoi kolme näkymää ja linssin
oman tilan. Mitatut luvut:

| Näkymä | lat / korkeus | `reliefi` | `pinnanOsoite` | navan lum. (r = 140 px) | hajonta |
|---|---|---|---|---|---|
| laaja | 60° / 2,2 | false | `data:image/png;base64,…` | 45,5 | 16,8 |
| keski | 82° / 0,9 | false | `data:image/png;base64,…` | 95,8 | 0,1 |
| lähi | 84° / 0,51 | false | `data:image/png;base64,…` | 95,9 | 0,1 |

`reliefi: false` ja `pinnanOsoite = data:` tarkoittavat, että linssi
putosi **generoituun vyöhykepalloon** (`maapallonVarit`) — 4k-
reliefitekstuuri ei ehtinyt ladata `RELIEFIN_AIKAKATKO_MS`-katkon
sisällä. Ja mikä ratkaisevampaa, näyttämön läpikäynti löysi:

```
NAPAT {"skene":139,"kansia":[],"kalotteja":[],"laattakerroksia":0,"lepokerroksia":0}
```

eli **juuri ne oliot, joista PAATOKSET 41 puhuu (napakansi, napakalotti,
laattakerros, lepokerros), puuttuvat ajosta kokonaan**. Linssin oma
mittari sanoo saman: `piilotettuja: 0`. Paikallinen ajo mittaa siis
tyhjää pintaa, ei sitä palloa, jonka omistaja näkee. Sama näkyy
silmällä: navan pikselit ovat tasaista harmaata (95, 96, 98), hajonta
0,1 — ei beigeä (0 %) eikä tummansinistä (0 %).

Ämpäri itse vastaa (`…/napakalotit/2026-09-11b/pohjoinen.webp` → 200),
joten kyse ei ole verkosta vaan siitä, ettei pelin laatta- ja
kansikerros ehdi/pääse rakentumaan tässä avausketjussa. **Tämä on
seuraavan erän ensimmäinen työ:** ilman sitä yhtäkään napaväitettä ei
voi mitata koneellisesti.

Sivulöydös, joka myös pitää kiertää: **linssi lukitsee kameran
korkeuden**. `pointOfView({ altitude: 0.14 })` päätyi joka kerta
arvoon 0,511 — linssin oma kehyssilmukka kirjoittaa korkeuden takaisin
(`js/linssit/satelliitti-avaruus.js` `kameranKorkeus`). Lähizoomia ja
siten reliefilaastaria ei siis saa päälle `pointOfView`illa lainkaan;
mittauksen on ajettava linssin omaa zoomipolkua.

## 2. Juurisyyn ehdokas: astrolinssin pyyhkäisy kumoaa PAATOKSET 41:n

Koodinluvusta löytyy yksi kohta, joka selittää täsmälleen sen, **miksi
topografialinssin korjaus ei periytynyt Astronautin kameraan**.

- `js/pallo.js` `linssiinPaivitys` (rivit ~1550–1560) on PAATOKSET 41
  kohdan 2 korjaus: linssin ajan **yksivärinen napakansi näkyy** ja saa
  reliefin sävyn (`NAPAKANSI_RELIEFI_POHJOINEN = MERIVARI`,
  `…_ETELA = JAAVARI`), ja **seepiakalotti menee piiloon**. Korjaus
  laukeaa `kuunteleReliefiLinssi`-kuuntelijasta, jonka
  `asetaReliefiLinssi(true, 'astronautti')` ajaa aivan yhtä lailla kuin
  topografialinssi.
- `js/linssit/satelliitti-avaruus.js` rivi **2107** (`piilotaKarttapinnat`
  → `pyyhkaise`) ajaa joka kehyksellä:

  ```js
  } else if (ud.lepokerros || ud.napakansi || ud.napakalotti) piiloon(o);
  ```

  `piiloon` nollaa `layers.mask`in, jota mikään pelin kerros ei
  kirjoita takaisin. Astronautin kamera siis **maskaa pois myös sen
  reliefinsävyisen kannen, jonka pallo.js juuri sytytti** — ja napaan
  jää reikä, jossa näkyy globe.gl:n oma pallo (`PALLON_SAVY #999999`)
  ja sen alle ladottu pohja. Topografialinssi ei tee tätä pyyhkäisyä
  lainkaan, joten siellä korjaus pitää.

Ehdotettu minimikorjaus (EI tehty, koska mittaamatta): jaa rivin 2107
ehto kahtia — `napakalotti` (pelin seepiakartta) piiloon kuten nyt,
`napakansi` **näkyviin**, koska pallo.js on jo värittänyt sen reliefin
sävyyn. Se on sama sääntö kuin topografialinssissä, yhtenä rivinä, eikä
kosketa topografialinssiä millään tavalla. Vastakoe: sama luotain
ilman muutosta → navan beige-osuus > 0.

Laattalaikkuja (suorakulmaiset eri sävyiset alueet Grönlannin ja
Norjan ympärillä) **ei päästy mittaamaan lainkaan**, koska
laattakerrosta ei ollut ajossa. PAATOKSET 41:n tilarivin mukaan
täydennyspoltto (z5 278, z6 1 144, z7 4 548 laattaa) oli kesken 18.–19.9.
yönä eikä vientiä ämpäriin ollut vielä tehty — on tarkistettava
ENSIN, ovatko ne laatat nyt ämpärissä, ennen kuin laikkuja etsitään
koodista.

## 3. Korjattu: kohdeotsikko ei katkea kesken sanaa (löydös 5)

Juurisyy: kelatun selitteen otsikkorivi on `white-space: nowrap` +
`text-overflow: ellipsis` (`css/satelliitti.css`
`.satelliitti-selite.satelliitti-selite-kiinni .satelliitti-selite-otsikko`),
ja `js/linssit/satelliitti.js` `sovitaOtsikko` kutistaa fonttia
16 → 11 px. Kun 11 px ei riitä, **CSS katkaisee pikselistä** — siitä
"Zeeland, Alankom…". Ellipsi siis toimi, mutta keskeltä sanaa.

Muutos (`js/linssit/satelliitti.js`): seutuosa (`.satelliitti-seutu`)
on nyt oma kahva, ja kun pieninkään fonttikoko ei mahdu, se pudottaa
**sanan kerrallaan** ja lisää ellipsin vasta kokonaisen sanan perään;
viimeisenä keinona seutu jää kokonaan pois. Kohteen oma nimi ei lyhene
koskaan. Otsikko palautuu täyteen mittaan aina, kun selite avataan tai
ruutu muuttuu (`resize`, `orientationchange` kutsuvat samaa funktiota).
Rivitystä ei otettu käyttöön, koska yksi rivi on omistajan linjaus
(LISÄYS 6 ja 7).

`tests/satelliitti.test.mjs`: vanha ladonta-assertio päivitetty uuteen
rakenteeseen ja lisätty kaksi assertiota sanarajalyhennyksestä.

## 4. Mittarit ja testit

- `node --test tests/*.test.mjs`: **3 649 pass / 1 fail** ennen
  testipäivitystä (kaatui juuri se assertio, jonka ladontarivi muuttui);
  `tests/satelliitti.test.mjs` yksin päivityksen jälkeen **59 pass /
  0 fail**. `tests/napakalotit.test.mjs` ei muuttunut — pallon
  napakalottirakenne ei muuttunut tässä erässä.
- Astro-savukkeita (`savuke-astro-sumu.mjs`, `savuke-astro-pallo.mjs`
  `NAKYMAT=puhelin`) ei ajettu: muutos on vain selitteen otsikossa,
  eikä yhtäkään pallo- tai sumuväitettä koskettu. Ne on ajettava, jos
  luvun 2 napakorjaus tehdään.
- Väitteitä ei lisätty `savuke-astro-pallo.mjs`:ään. Luvun 1 mukaan ne
  mittaisivat tyhjää palloa, ja vihreä väite väärästä pinnasta on
  huonompi kuin puuttuva väite.
- Kuvakaappauksia navasta ennen/jälkeen ei liitetty: luotaimen kuvat
  näyttävät generoidun vyöhykepallon, eivät omistajan näkemää vikaa.
  Sonnetin kuvat 07–09 haarassa `sonnet-local-ranska-5` ovat yhä ainoa
  pätevä todiste.

## 5. Mitä seuraava erä tekee ensin

1. Saa laatta-, lepo- ja kansikerroksen rakentumaan paikalliseen
   Playwright-ajoon (nyt `kansia: 0`, `laattakerroksia: 0`) ja
   reliefitekstuurin latautumaan (`reliefi: true`). Ilman tätä napaa ei
   voi mitata.
2. Kiertää linssin korkeuslukon, jotta lähizoomi ja reliefilaastari
   saadaan päälle mittauksessa.
3. Vasta sitten luvun 2 yhden rivin korjaus + vastakoe, ja
   laattalaikut (tarkista ensin, onko yön täydennyspoltto viety
   ämpäriin).

Ei versionostoa, ei PR:ää, ei Raamattu-muutoksia.

---

# ERÄ 2: NAPA MITATTU OIKEALLA ALUSTALLA — VIKA TOISTUI, KORJAUSEHDOTUS EI KELVANNUT (Opus, 19.9.2026 klo 14.54–15.25 Suomen aikaa)

Haara `claude/bold-ride-vow4ki-astro-napa-2`, pohja erä 1 + v1954.
Ei versionostoa, ei PR:ää, ei Raamattu-muutoksia.

**Lyhyesti:** vika TOISTUI paikallisesti, kun mittaus ajettiin
`savuke-astro-pallo.mjs`:n omalla alustalla (reliefi `true`, 4k pinnalta,
64 laattaa, kamera navan yllä korkeudella 3). Erän 1 ehdottama
yhden rivin korjaus TEHTIIN, MITATTIIN ja PERUTTIIN: se poistaa vian
mutta tuo tilalle toisen. Korjaamatta jäi siis navan vaalea levy, ja
sen mitta on nyt savukkeessa. Päätös siitä, mitä 76°–90° näyttää, on
Fablen — tämä erä ei arvannut sitä.

## 1. Alusta, jolla vika toistuu

Erän 1 oma luotain putosi generoituun vyöhykepalloon. Savukkeen alusta
ei putoa: `reliefi true`, `pinnanOsoite blob:`, `reliefinTarkkuus 4k`,
`kansia 4`, `kalotteja 2`, `laattoja 28–39`. Korkeuslukko kierrettiin
ilman kahvan vientiä: linssin kaista tässä ajossa on 0,51–5,53, ja
**korkeus 3 mahtuu siihen sellaisenaan** — ja juuri 3 on se
keskikorkeus, jolla omistajan kuvassa napa näkyy (ruudulla koko
76°–90°:n kalotti). Erä 1 yritti 0,14:ää, jonka kaistan lattia 0,511
söi; lähizoomia ei tähän tarvittu lainkaan.

Mittauksen ajaksi viedään pois **pilvikuori JA reunavarjo** (molemmat
ovat näytteiden päällä) ja palautetaan heti lohkon jälkeen.

## 2. Luvut (puhelin 390 × 844, dpr 2, kamera lat 90, korkeus 3)

Kiekko = 0–70 px navasta (napakannen ala), kehä = 90–115 px.
"Sinisyys" = sininen − punainen; se erottaa sävyt myös varjon puolella,
jossa pelkkä kirkkaus ei erota mitään (valo kertoo molemmat värit alas
samassa suhteessa). Vertailukohdat: MERIVARI (38,78,145) = +107,
generoitu napajää (214,220,224) = +10, vanha seepiakansi
(201,194,175) = −26.

| Mitta | NYKYTILA (main) | KOKEILTU korjaus (kansi näkyviin) |
|---|---|---|
| napakansia näkyvissä | 0 / 4 | 4 / 4 (väri 5,19,72 = MERIVARI lineaarisessa) |
| napakalotteja näkyvissä | 0 / 2 | 0 / 2 |
| kiekon kirkkaus | 95,9 ± 6,0 | 96,0 ± 5,6 |
| kiekon sinisyys | **12,4** | **33,5** |
| kiekon "levypikselit" (sinisyys < 20) | **100 %** | **75,5 %** |
| kiekon vaaleat (L > 140) | 0 % | 0 % |
| kehän kirkkaus / sinisyys | 92,3 ± 13,3 / 12,2 | 91,9 ± 13,8 / 12,1 |
| laattasaumoja 60–80° N (240 × 240 px) | pysty 0, vaaka 0 | pysty 0, vaaka 0 |

Kuvat (kumpikin alle 60 kt):
`docs/raportit/kaappaukset/astro-napa-20260919/napa-nykytila-390.jpg` ja
`…/napa-kokeiltu-kansi-nakyviin-390.jpg`.

## 3. Mitä kuvat näyttävät — ja miksi korjaus perutettiin

**Nykytila.** Navalla on iso VAALEA LEVY. Se ei ole napakansi eikä
kalotti (kumpikin mitattiin piilossa oleviksi), vaan **generoitu
napajää**: 4k-reliefikuvan alfa häivytetään nollaan jo 70°–76°:ssa
(`RELIEFIN_HAIVYTYS`), eli reliefiä ei ole navalla lainkaan, ja alta
paistaa vyöhykepallon napasävy (214,220,224). Levy alkaa siis 76°:sta,
ei 83,7°:sta. Omistajan kuvan tummansinistä rengasta paikallinen ajo
EI toistanut (kiekon ja kehän kirkkausero 3,6).

**Kokeiltu korjaus.** Erän 1 ehdotus — `piilotaKarttapinnat`in rivi
jaetaan niin, että `napakansi` jää näkyviin — toimii täsmälleen kuten
luvattiin: kansi tulee näkyviin oikeassa sävyssä ja kiekon sinisyys
nousee 12,4 → 33,5. Mutta RUUDULLA (kuva
`napa-kokeiltu-kansi-nakyviin-390.jpg`) se on **tasainen
kirkkaansininen kiekko keskellä vaaleaa napaa** — vika vaihtuu
toiseen, ja levystä jää yhä 75 % jäljelle.

Syy on linssien ero, joka erän 1 koodinluvusta ei näkynyt:

- **Topografialinssissä** pinta on reliefipyramidi, joka loppuu
  85°:een. 83,7°:n napakansi tukkii juuri sen reiän, ja MERIVARI on
  sama sävy kuin pyramidin viereinen avomeri → sauma ei näy. Siksi
  PAATOKSET 41 kohta 2 toimi siellä.
- **Astronautin kamerassa** pinta on 4k-reliefikuva, jonka alfa loppuu
  jo 76°:ssa. 83,7°:n kansi jää keskelle generoitua napajäätä eikä
  peitä siitä kuin sisimmän kolmanneksen — eikä MERIVARI ole sama sävy
  kuin ympäröivä vaalea jää.

Astronautin kameran napa on siis **eri reikä** kuin topografialinssin.
Muutos perettiin, ja `js/linssit/satelliitti-avaruus.js`:ään jäi
rivin viereen mitattu kommentti, jottei seuraava erä tee samaa
kokeilua uudestaan koodinluvun perusteella.

## 4. Mitä haaraan jäi

- `tools/savukkeet/savuke-astro-pallo.mjs`: uusi lohko **47** (vain
  puhelinnäkymä) — kamera navan ylle, pilvet ja reunavarjo pois
  mittauksen ajaksi, neljä väitettä ja `NAPA`-lokirivi kaikilla
  luvuilla. Väitteet: 47a pelin napapinnat ovat linssin ajan piilossa
  (vastakoe: kansi näkyviin → punainen), 47b navalla ei ole
  seepiakannen beigeä, 47c navan ympärillä ei ole kirkkausrengasta,
  47d 60–80° N:ssä ei akselinsuuntaisia laattasaumoja. Lohko tallentaa
  myös kaksi kuvaa (`astro-napa-*`), kun `KAAPPAUKSET` on asetettu.
- `js/linssit/satelliitti-avaruus.js`: `tila()` kertoo nyt
  `laastarilla` ja `laastarikehyksia` (mittarit savukkeelle;
  `piilotaKarttapinnat` tarjosi ne jo, mutta niitä ei viety ulos), ja
  napapintojen rivin viereen kirjattiin yllä mitattu perustelu.
  **Piirtoon ei koskettu.**

## 5. Mittarit

- `node --test tests/*.test.mjs`: **3 650 pass / 0 fail** (13 skipped).
  `tests/napakalotit.test.mjs` ei tarvinnut päivitystä — pallon
  napakalottirakenne ei muuttunut.
- `savuke-astro-pallo.mjs NAKYMAT=puhelin`: **53/53** (ennen lohkoa
  49/49 + neljä uutta). Vastakoe ajettiin: kun `napakansi` jätettiin
  näkyviin, 47a meni punaiseksi (52/53).
- `savuke-astro-pallo.mjs NAKYMAT=tyopoyta,ei-vartija`: **49/49**.
- `savuke-astro-sumu.mjs`: **8/8**. Pinnan mustuusvartiot (45a–c,
  Safari-mustuus, 43 ja 43b) pysyivät vihreinä kaikissa ajoissa.

## 6. Mitä seuraava erä tarvitsee Fablelta

Yksi päätös: **mitä Astronautin kamerassa näkyy 76°–90°:lla?** Kolme
polkua, kaikki mitattavissa yllä olevalla lohkolla:

1. Napakannen ala levennetään linssin ajaksi 76°:een (yksi vakio,
   `NAPAKANNEN_LEVEYS`, vain reliefilinssin tilassa) ja sävy otetaan
   reliefin reunasta eikä vakiosta — silloin kansi tukkii koko reiän.
2. 4k-reliefikuvaan poltetaan navat mukaan (lähde loppuu 76°:een, eli
   tämä on ämpärityö, ei pelikoodia).
3. Generoidun napajään sävy ja reuna sovitetaan reliefin reunaan niin,
   ettei levyä erota — halvin, mutta ei poista sitä, että navalla ei
   ole topografiaa lainkaan.

Omistajan kuvan **tummansininen rengas** ei toistunut Chromiumilla;
se voi olla WebKitin oma (sama epäily kuin PAATOKSET 43 TILA 3:ssa).
Sen mitta on nyt olemassa (47c), joten se näkyy heti, jos joku ajaa
tämän savukkeen WebKitillä tai simulaattorissa.
