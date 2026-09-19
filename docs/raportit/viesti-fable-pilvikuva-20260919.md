# Viesti Fablelle: aito NASA-pilvikuva kytkettiin ja astro-savukkeet kalibroitiin (19.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-pilvikuva` (pohja
`claude/bold-ride-vow4ki`, cec3c08d). Ei versionnostoa, ei PR:ää,
ei Raamattu-muutoksia. Kellonajat Suomen aikaa (erä 19.9.2026 klo
09.27–09.45).

## Tehtävä

Raamattu PAATOKSET 43 kohta 7 ja sen TILA 2: `PILVIEN_OSOITE` oli
`null` (proseduraalinen pilvikangas), vaikka NASA Blue Marble
-pilvikuva (PD, 2048 × 1024) on jo ämpärissä. Kun osoite kytkettiin
v1948:n CI-ajossa 35425678571, kuusi savuketta meni punaiseksi.

## 1. JUURISYY — YKSI, JA SE ON PELISSÄ: JPEGILLÄ EI OLE ALFAA

Ämpärin kuva on **JPEG-luminanssikartta**: musta = pilvetön taivas,
valkoinen = paksu pilvi (mitattu kuvasta: 37,2 % pikseleistä alle
luminanssin 32, keskiarvo 75,7/255). JPEG ei kanna alfakanavaa.

`luoAstroSumu` antoi osoitteen suoraan laudan kalvolle
(`kuva: PILVIEN_OSOITE ?? pilvikangasOlio`), joka teki siitä
tekstuurin sellaisenaan ja piirsi sen **peittävyydellä 0,9 pinnan
päälle**. Lopputulos ei ollut pilvikuori vaan **musta pallo, jossa on
valkoisia pilviä** — ja jokainen pintaa katsova mittari luki kuorta
eikä pintaa.

Tämä yksi juurisyy selittää kaikki kuusi punaista:

| savuke / väite | punaisen luku | mistä se tuli |
| --- | --- | --- |
| astro-sumu: ruudun kirkkausero | kauko +9,7 / keski −3,3 | ero sumuttomaan ajoon oli pilvikuoren ja sumun SUMMA; musta kuori TUMMENSI keskizoomin ruudun (−3,3) |
| astro-pallo #puhelin: varjomittaus pysäytetystä tilasta | ero 0,9 ja 2 (raja 0,5) | terävä pilvireuna näytepisteen päällä + kuoren oma hidas pyöriminen ja sumukalvojen ajelehtiminen |
| astro-pallo #puhelin ja #tyopoyta: varjo ei ulotu puoliväliin | vasen/oikea liikkui > 2 | sama: näytteet luettiin kuoren ja ajelehtivan sumuharson läpi |
| astro-pallo #tyopoyta: keskusta jää koskematta | 143,2 → 146,9 | keskiön näyte oli pilviä, ei pintaa |
| astro-pallo #puhelin: 45b pinta pisteen vieressä | ero 0,3 (vaadittu ≥ 3) | 10 px:n ja 40 px:n kehät olivat molemmat kuorta |
| astro-pallo #tyopoyta: SAFARIN RAJOILLA pallo ei ole musta | kirkkaus 13,6 (kynnys 20) | **aito löydös**: pallo OLI musta — musta kuori peitti pinnan |
| astro-aani: kohteen ja kuvan vaihto ei luo uutta soitinta | 7 → 8 | kuormahäily; pilvikuva ei koske soitinlogiikkaan (7 → 7 tässä ajossa) |

Savukkeiden reitityksessä oli lisäksi oma vikansa: **astro-sumun
`route.fulfill` ei antanut `access-control-allow-origin`-otsaketta**
(astro-pallossa se oli). Ämpäri ei anna CORS-lupaa 127.0.0.1:lle, joten
ilman otsaketta astro-sumu olisi mitannut proseduraalisia pilviä
luullen niitä aidoiksi.

## 2. KORJAUS PELISSÄ: ALFA LUMINANSSISTA

`js/linssit/astro-sumu.js`

- `PILVIEN_OSOITE` = ämpärin osoite (väliaikainen kommentti pois).
- **Uusi puhdas funktio `pilvikuvanAlfa(data, leveys, korkeus)`**:
  RGB on pilven oma valkoinen (luminanssi antaa hienoisen vaihtelun),
  **alfa on luminanssi** kynnystettynä (`PILVIEN_KUVAN_KYNNYS` 0,06 —
  JPEGin pakkauskohina pois) ja napahäivytettynä samalla
  `PILVIEN_NAPAHAIVYTYS`-säännöllä (66–80°) kuin proseduraalinen
  kangas. Tasavälisen kuvan navat venyvät säteittäisiksi juoviksi
  ilman sitä.
- **Kangas ensin, aito kuva sen päälle.** Kalvo saa yhä
  proseduraalisen kankaan (kuori syntyy heti, toimii offline), ja
  `maalaaAitoPilvikuva()` hakee ämpärin kuvan `fetch` +
  `createImageBitmap` -parilla, maalaa **saman kankaan** uusiksi
  luminanssialfalla ja vie tekstuurin kerran näytönohjaimelle
  (`pilvet.paivita()`). Kangasta ei kosketa ennen kuin bittikartta on
  käsissä, joten epäonnistunut haku (offline, 404, CORS) jättää
  proseduraaliset pilvet voimaan. Blob on samaa alkuperää → kangas ei
  tahriinnu eikä `getImageData` heitä.
- `tila()` sai kentän `pilvienLahde` (`'ampari'` / `'kangas'`).

`js/linssit/satelliitti-avaruus.js`

- Kahvalle **`piilotaPilvet(kylla)`** (sama kytkin kuin
  `pinnanKirkkaus`illa jo oli sisäisesti, nyt savukkeiden
  käytettävissä). Ei pelin polkua — pelaajalle pilvet ovat aina
  päällä.

**Muisti: 2048 × 1024 RGBA = 8 Mt**, PAATOKSET 36:n raja 32 Mt. Vartio
on savukkeessa ja yksikkötestissä; kangas on sama olio kuin ennenkin,
eli aito kuva ei lisää yhtään tekstuuria.

## 3. KORJAUS MITTAREISSA: PINTAA MITATAAN PINNASTA

Sama käytäntö kuin 3a30fbf8 teki mustuusmittaukselle, laajennettuna
kaikkiin pinnan mittauksiin — kuori pois `visible`-lipulla mittauksen
ajaksi ja takaisin heti perään.

`tools/savukkeet/savuke-astro-pallo.mjs`

- Varjolohkon jäädytys piilottaa nyt **pilvikuoren** (`piilotaPilvet`)
  ja **avaruussumun kalvot** (`.astro-sumu` samaan tyylilappuun kuin
  `.astro-rata` ja `.astro-iss`). Sumukalvot ovat CSS-kerros, joka
  ajelehtii joka kehyksellä ja tulee kaappaukseen mukaan — juuri ne
  pitivät "pysäytettyä tilaa" liikkeessä (ero 0,9). Väitteen lisätieto
  kertoo nyt kuoren tilan ja peiton.
- 45a/b/c-lohko (sädekehän valaisu) mittaa pilvikuori piilossa.
- `SAFARIN RAJOILLA: pallo ei ole musta` kaappaa pinnan kuoren alta.

`tools/savukkeet/savuke-astro-sumu.mjs`

- `route.fulfill` antaa `access-control-allow-origin: *` (ks. yllä).
- Ruutukaappaukset otetaan **pilvikuori piilossa** ja ISS/ratakaari
  piilossa; peiton oma profiili luetaan `tila`sta ennen piilotusta.
- **Väite 2 kirjoitettiin uusiksi.** Vanha vaati, että keskiruudun
  keskihajonta on sumullisessa ajossa suurempi kuin sumuttomassa —
  se meni punaiseksi (13,93 vs. 16,29), mutta luku mittasi MAASTOA:
  0,62:n harso vaimentaa maaston kontrastia enemmän kuin tuo omaansa.
  Nyt mitataan **sumun oma osuus**: sama näkymä sumukalvot
  piilotettuna ja erotuskuva näiden kahden välillä. Tasainen himmennys
  antaisi vakion eron (hajonta ≈ 0).
- Väite 1b:n nimi on nyt `ruudun kirkkausero (pilvikuori piilossa)`.

`tests/astro-sumu.test.mjs` — viisi uutta testiä: osoite on kytketty,
`pilvikuvanAlfa` tekee mustasta läpinäkyvää ja valkoisesta peittävää,
navat häivytetään, kalvolle ei anneta osoitetta suoraan, ja savukkeet
piilottavat kuoren (+ CORS-otsake).

## 4. MITTAUSTULOKSET (ennen → jälkeen)

Kaikki ajot **paikallisesti, yksin, enintään kaksi Chromiumia
rinnakkain**, oma portti per ajo (8850–8853).

| ajo | ennen (CI 35425678571) | jälkeen (Mac 19.9. klo 09.31–09.44) |
| --- | --- | --- |
| `savuke-astro-sumu.mjs` | 6/8 | **8/8** |
| `savuke-astro-pallo.mjs` `NAKYMAT=puhelin` | 47/49 | **49/49** |
| `savuke-astro-pallo.mjs` `NAKYMAT=tyopoyta,ei-vartija` | 46/49 | **49/49** |
| `savuke-astro-aani.mjs` | 23/24 | **24/24** |
| `node --test tests/*.test.mjs` | 3644 pass / 0 fail | **3650 pass / 0 fail** (13 skipped) |
| `tests/astro-sumu.test.mjs` | 12/12 | **17/17** |

Väitekohtaiset luvut:

| väite | ennen | jälkeen |
| --- | --- | --- |
| astro-sumu: ruudun kirkkausero | kauko 9,7 / keski −3,3 / lähi 0 | **kauko 11,89 / keski 23,75 / lähi 0** |
| astro-sumu: sumu ei ole tasainen himmennys | hajonta 13,93 vs. 16,29 (punainen) | **sumun oma osuus: keskiarvo 23,75, hajonta 8,8** |
| astro-sumu: fps / pilvitekstuuri | — | **77,2 fps (sumuton 83,2); 8 Mt / 32 Mt** |
| puhelin: varjomittaus pysäytetystä tilasta | ero 0,9 / 2 (raja 0,5) | **0 / 0 / 0** |
| puhelin: varjo ei ulotu puoliväliin | vasen 54,9→54,8, oikea 63,8→67,4 | **vasen 55,9→55,9, oikea 28,3→28,3** |
| puhelin: 45b | ero 0,3 (vaadittu ≥ 3) | **ero 32,8** |
| tyopoyta: keskusta jää koskematta | 143,2 → 146,9 | **32,3 → 32,3** |
| tyopoyta: SAFARIN RAJOILLA pallo ei ole musta | kirkkaus 13,6 (kynnys 20) | **49,9**; puhelimella **80,4** |
| tyopoyta: 45c (tunnettu kuormapunainen) | 4,8 (raja 5) | **5,7** |
| aani: kohteen ja kuvan vaihto ei luo uutta soitinta | 7 → 8 | **7 → 7** |

Ei uusia tunnettuja punaisia. `sarjat.json`:n `#tyopoyta`-rivin
tunnettu punainen *45c: valaisu tulee sädekehästä eikä maastosta* oli
tässä ajossa vihreä (5,7) — **en poistanut sitä listalta**, koska ohje
on poistaa kahden peräkkäisen vihreän jälkeen ja tämä on ensimmäinen.

Silmämääräinen tarkistus: `astro-pallo-390-20260916.jpg` näyttää
Tyynenmeren pyörremyrskyt ja mantereet pilvien raoista, navat
häivytettyinä — ei mustaa palloa.

## 5. MUUTOKSET TIEDOSTOITTAIN

| tiedosto | mitä |
| --- | --- |
| `js/linssit/astro-sumu.js` | `PILVIEN_OSOITE` ämpäriin; `PILVIEN_KUVAN_KYNNYS`; uusi `pilvikuvanAlfa`; `maalaaAitoPilvikuva`; `tila().pilvienLahde`; alkukommentti |
| `js/linssit/satelliitti-avaruus.js` | kahvalle `piilotaPilvet(kylla)` |
| `tools/savukkeet/savuke-astro-sumu.mjs` | CORS-otsake reitille; kuori + ISS/rata pois kaappauksen ajaksi; `erotuksenTilastot`; väitteet 1b ja 2 uusiksi |
| `tools/savukkeet/savuke-astro-pallo.mjs` | kuori pois varjolohkosta, 45-lohkosta ja Safari-mustuudesta; `.astro-sumu` jäädytykseen |
| `tests/astro-sumu.test.mjs` | viisi uutta testiä |
| `docs/raportit/viesti-fable-pilvikuva-20260919.md` | tämä raportti |

## 6. MITÄ JÄI TEKEMÄTTÄ

- **Raamattua ei päivitetty** (ohje). PAATOKSET 43 kohta 7:n TILA 2
  sanoo yhä "pilvet proseduraaliset kunnes … viedaan ampariin
  (PILVIEN_OSOITE) - Fablen tyo". Fable kirjaa tilan: kuva on
  ämpärissä ja kytketty, ja alfa tulee luminanssista.
- **Versionnostoa ja PR:ää ei tehty** (ohje).
- `sarjat.json`:n 45c-tunnettu punainen jätettiin paikalleen (ks. yllä).
- Vartijalohkoja (`NAKYMAT=vartija-a/b/c`) **ei ajettu** — erän ohje
  rajasi ajot muutettuihin riveihin, eikä vartijalohkoihin tullut
  muutoksia. `#vartija-b`:n MUSTA PINTA -väitteet kulkevat
  `pinnanKirkkaus`in oman esteenkytkimen kautta, joka oli jo kunnossa
  (3a30fbf8); CI ajaa ne.
- Aitoa iOS-laitetta ei ole käytettävissä; WebKit-polku (`savuke-astro-
  webkit.mjs`) jäi ajamatta, koska siihen ei tullut muutoksia.
