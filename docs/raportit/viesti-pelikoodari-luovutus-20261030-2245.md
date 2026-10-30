# Pelikoodari: luovutus 30.10.2026 klo 22.45 (konteksti 30 %, pehmeä raja)

Edellinen luovutus: -20261030-2210 (+ lisäys). Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- P2 = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/leivonta-217; proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-v98c (haara pelikoodari/leivonta-217, 45b5492df).
- **OMISTAJA 22.27 (PT):** leivottu valo menee junaan **216** (ei 217). Juna lähtee vasta, kun valo on valmis ja hyväksytty. Proto-haara pohjautuu jo v5:een (a2d9e0c7b).

## 1. Leivottu valo: koeajo tehty, ST-suunta (VS 1b) yhä auki
- koe-valo1 ja koe-valo0 (45b5492df, LAV:n koepaketti v4) ajettu linjalla 2: lokit `esikatselu-20261030-221113` (valo1) ja `-222104` (valo0).
  - Valo1:n lokissa "leivottu valo: 86 atlasta, M 8". Kolme koeatlasta latautuivat, muille tuli odotettu "ei aukea" (koepaketissa vain 3 atlasta).
  - Valo1/valo0-kuvat ovat lähes identtiset (ero > 20: 0,0–1,5 % pikseleistä; erot ovat hahmossa ja friisin/seinän yläreunan syvyyskilpailussa, joka on vanha ja koskee molempia).
  - **Pari ei siis vielä todista, että atlas näkyy.** Sijoituspaikat ovat oikeissa ruuduissa: (−180, 280) → (−3,−5) ja (−300, 30) → (−5,−1).
- Kerroin 3 -koe (`P2/skenaariot/koe-valo1k3.txt`, `valo leivonta 1 3` ENNEN `v4 7`):
  - Ensimmäinen yritys oli virheellinen, koska kerroin asetettiin kesken juoksun ja `_JuoksuLeivonta` päivittyy vasta PeliValossa (seuraava juoksu).
  - Toinen yritys katkesi klo 22.43 signaaliin (exit 143, kuvia ei syntynyt; joku pysäytti Unityn).
  - **SEURAAVAKSI:** aja `zsh /Users/Shared/Claude/wt/proto-pelikoodari-v98c/tyokalut/esikatselu.sh 45b5492df P2/skenaariot/koe-valo1k3.txt ipad --batch` vasta, kun VS:n varjodiagnoosit ovat linjalla 2 valmiit (PT: VS ensin).
  - Vertaa tuloksia valo0-kuviin (`-222104`). Jos seinät kirkastuvat, atlas toimii. Tarkista sitten varjokuvio Blenderin `tarkistus-r_-3_-5-a/b.png`:tä vasten (1b: väärä kuvio → oy' = 1 − sy − oy).
- Pikselierotyökalut: scratchpad-skriptit ovat kertakäyttöisiä. Erot laskettu PIL:llä 1100 px:n pienennöksistä.
- LAV:n v6-paketti (osasarja-v6 + UV1 + valo.json) valmistuu ketjussa aamupäivällä 31.10. (LAV LISÄYS 157). Sitten toimi -2210:n kohdan 2 mukaan.

## 2. Kuja 02 (PT 22.3x: korjataan kysymättä junaan 216)
**Lähde (lähetetty PT:lle 22.3x):** OSM way/639122658 ja way/42509056 ovat barrier=wall, pohja.json antaa 4 m ja osasarja-v5:ssä on täysi seina-2m (muuri-lansi-pohj-23 länsi, -33 itä). Puut eivät tule lähteestä.

### 2a. Vasen (länsi)muuri puuttuu: kesken
- **Ladonta on kunnossa.** Diagnoositesti `Peli-testit/Testit/ZDiagKuja02.cs` (proto-worktree, EI committoitu) antaa:
  - seina-2m-sijoitukset ovat molemmilla puolilla: länsi x ≈ −248,1…−249,0, kierto 87,7°; itä x ≈ −241,9…−244,0, kierto −91,4°, sx ≈ 1.
  - Ajo: `MK_OSASARJA=…/juuri-216/kielletty-osasarja-v5 ./kaanna.sh ZDiagKuja02`.
  - seina-2m:n V4_red-osa on y 0…3,84, z 0…0,72 (kumpikin pinta). Kivijalka tulee vain pursotuksesta (−0,76…0,04).
- **Ajojen ero:**
  - Klo 20.59 (`esikatselu-20261030-205913`, 147730811, skenaario `piirrokset-20261030/skenaariot/v2-pari.txt`, `palatsi mallit` + `palatsi url pk7` + testikamera 0) **vasen muuri on kokonainen.**
  - Klo 21.48 (`havainne-editori-20261030-214850`, 00e19dfb0 = osasarja-v3, `v4juuri` + testikamera 3.3 6.88 10 45, ei `palatsi url`) **vasen punainen seinä puuttuu** (vain kivijalka ja pilasterit näkyvät).
- Seuraavat epäillyt järjestyksessä:
  - (a) 00e19dfb0 on vanha REF (osasarja-v3): aja sama editoriajo a2d9e0c7b:llä (junan 216 runko). Jos muuri näkyy, vika on vanhan REF:n ja paketin yhdistelmässä, ei junassa.
  - (b) Editori ei aseta pk7-pohjaa (`palatsi url`), joten pohja ja esto ovat oletusta.
  - (c) Testikameran kulma ja ruudun `worldBounds` (PiirraInst, `r.maailma`) frustum-karsinnassa: lähi/LOD1-raja (MuurikateLod1M).
- Editori: `tyokalut/havainne/editori.sh 02 <REF> ipad` (NUI:n työkalu, katso muisti havainne-editori). Sovitettu pari 02 peli vs havainne → PT.

### 2b. Puut pois kujalta 02: tekemättä
- 21 puuta kujan alueella (x −245…−249, z 296–364; esim. (−245,39, 312,05) ja (−247,74, 321,97)) tulevat lähteestä `kielletty-lahipuut-v11/puut.json`.
  - Syy: LAV:n v7-tihennys (puut_tihenna.py, "saavutettavien pihojen reunat 0,8–1,5 m seinästä") on käsitellyt kuja-40:n pihana.
  - Puut olivat jo klo 20.59:n kuvassa.
- Paketin omistaa LAV (LAV:n luovutus LISÄYS 109: lahipuut-v8 = a2_koristeet.py). Ehdotus:
  - lahipuut-v12 = v11 ilman kujan 02 puita: suodata puut.json pohja.json:n `kujat`-monikulmion kuja-40 (leveys 4,47) + 1 m mukaan. Tarkista samalla, kuinka monta puuta on muilla kujilla, ja kerro PT:lle.
  - Kysy LAV:lta (local_beb68834-6c4f-4839-ac75-7876b45052c3), tekeekö LAV vai PK. LAV:n Blender on varattu leivonnalle, mutta suodatus ei tarvitse Blenderiä.

## Huomiot
- Linja 2: VS:n varjodiagnoosi 2 (a855d9fb6) menee PT:n mukaan edelle. Ilmoitin VS:lle klo 22.45, että linja on vapaa.
- Muut junan 216 asiat ennallaan: osasarja-v5 a2d9e0c7b + esto-v23 NS:llä.

## LISÄYS 22.5x (PT KIIRE, sitova)
- Levy 85 Gi ja laskee: **ei uusia Unity-ajoja ennen PT:n lupaa** (Postivahti: ei ennen kuin levy > 95 Gi). Minulla ei ollut ajoja käynnissä (pid 43303 päättyi jo klo 22.43, exit 143).
- VS:n diagnoosi: editorikaappaus (esikatselu.sh / kuva3d) ei piirrä varjokarttaa eikä leivottua valoa lainkaan. Siksi valo1/0-parit ovat identtisiä, ja **kerroin 3 -koe (kohta 1) ei kerro mitään ennen VS:n korjausta. Älä aja sitä.** Odota VS:n korjausta ja PT:n lupaa.
- Kuja 02:n seinävika (kohta 2a) selvitetään **koodista käsin**, ei editoriajoilla.
