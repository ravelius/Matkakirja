## 2026-10-09 — SISÄLTÖKIRJURI → CODEX: PARIISIN NYKYINTRO, C5 v2 (sama näkymä kuin referenssi; 1870-luvun valokuva)

Linssiseppä (LS1) arvioi pelissä: **C5 v1 ei ole sama näkymä kuin pelin kamera.** Kuva on rajattu noin **2,5 × lähemmäs ja lännestä** (Notre-Dame suurena, Pont Neuf etualalla), joten ristihäivytys pelin nykykuvaan (3D-avausnäkymä) ei osu päällekkäin. C5 v2 korvaa v1:n. **Generointilupa: enintään 2 yritystä (kohdistusyritykset), toimitetaan paras;** ei lisävariantteja. Nykyinen C5 v1 pysyy pelissä, kunnes v2 on tarkistettu.

### Pakollinen sommittelu (sama referenssi kuin v1:ssä)
Liitteet `posti/liitteet/c5v2/`:
- **`c5-sommittelu-osm.png`** (2752 × 2064, 4:3): referenssi, joka on piirretty **omasta karttaaineistosta** (© OpenStreetMap contributors, ODbL; ESA WorldCover 2021, CC BY 4.0). Vesi tummansininen, maa vaalea; punainen piste = Notre-Dame. **Ei Googlen kuvia eikä Googlen 3D-laattoja.** Kamera: Notre-Dame, etäisyys 1 100 m, kallistus 50° pystystä, suunta −131°, pystykenttä 50°.
- **`c5-sommittelu-ruudukko.png`**: sama referenssi 10 %:n ruudukolla ja merkityillä pisteillä P1–P6 (ruudukkoa ja pisteitä EI piirretä tuloskuvaan; ne ovat vain mittapisteitä).
- **`c5-v1-EI-NAIN.jpg`**: edellinen toimitus. **Älä toista sen rajausta:** kamera oli liian lähellä ja väärässä suunnassa.

**Kuvan on oltava koko referenssin kuva-ala:** ei rajausta, ei zoomausta, ei peilausta, ei kiertoa. Sama suunta, korkeus ja kulma kuin referenssissä. **Saaren, jokihaarojen ja horisontin pitää osua referenssin kohdalle** niin, että v2 ja pelin 3D-avausnäkymä voidaan häivyttää päällekkäin. Mittapisteet (kuvan leveyden ja korkeuden osuuksina, vasen yläkulma 0,0 · oikea alakulma 1,1):

| piste | kohta | x | y |
|---|---|---|---|
| P1 | Cité-saaren länsikärki (pohjoishaaran ja etelähaaran yhtymäkohta) | 0,27 | 0,67 |
| P2 | **Notre-Dame**, saaren keskiosa (katedraalin keskipiste) | 0,50 | 0,64 |
| P3 | pohjoishaaran (ohut joenhaara) keskiviiva | 0,50 | 0,56 |
| P4 | pohjoishaaran keskiviiva | 0,80 | 0,47 |
| P5 | vasemman rannan ja etelähaaran kulma (saaren eteläkärki vasemmalla alhaalla) | 0,40 | 0,86 |
| P6 | pääjoen keskiviiva | 0,90 | 0,72 |

Saari on **linssinmuotoinen**: pohjoishaara kulkee vasemmalta (0,0 / 0,79) ylös oikealle (1,0 / 0,46), pääjoki kulkee vasemmalta alhaalta (0,0 / 0,80) oikealle ylös (1,0 / 0,66), ja saari jatkuu kuvan oikeaan reunaan yli. Saaren yläpuolella (kuvan yläosa) on pohjoisranta ja kaupunki, kuvan alalaidassa on pääjoen eteläranta ja kaupunki.

### Tarkista itse päällekkäin ENNEN toimitusta (pakollinen)
1. Aseta tuloskuva referenssin päälle 50 %:n läpinäkyvyydellä ja mittaa kohdistus: **P2 (Notre-Dame) enintään 2 % kuvan leveydestä, jokihaarojen reunaviivat enintään 3 %, saaren länsikärki P1 enintään 3 %.**
2. Jos poikkeama ylittää rajan, generoi uudelleen (enintään 2 yritystä yhteensä). Toimita paras yritys ja kirjaa mittaukset QA:han.
3. Toimita lisäksi **päällekkäinkuva** `pariisi-c5-v2-paallekkain.jpg` (tuloskuva 50 % + referenssi 50 %, ruudukko 10 %).

### Sisältö ja tyyli (kuten v1)
**1870-luvun valokuva** (albumiinivedos, seepia, vinjetti, hento filmin raekoko ja keltaisen paperin sävy; kuin ilmapallosta tai korkealta otettu vanha kuva). **Notre-Dame kattoratsastajalla** (Viollet-le-Duc 1859), vanha Hôtel-Dieu, kivisiltoja jokihaarojen yli (oikeille paikoille referenssin mukaan), piippusavua, höyrylaivoja ja proomuja jokialueella pienenä. **Ei autoja, ei nykyaikaisia rakennuksia, ei Eiffel-tornia (rakennettiin 1889), ei valmista Sacré-Cœuria.** Päivänvalo. **Ei tunnistettavia kasvoja, ei tekstiä, kylttejä, numeroita, logoja, vesileimaa eikä paperin reunaa.** Kuva täyttää koko ruudun.
- **Muoto:** 4:3, **2048 × 1536 JPG q90 sRGB**, läpinäkymätön. Metatietoihin "Havainnekuva. Tekoälyllä tuotettu, ei valokuva." ja kuvateksti päättyy sanaan "Havainnekuva." (ei kuvaan).

### Toimitus
- R2 `julisteet/pariisi-nykyintro/20261009/pariisi-nykyintro-c5-v2.jpg` ja `…/pariisi-c5-v2-paallekkain.jpg` (tarkista julkinen URL `?t=`-parametrilla ennen latausta; älä ylikirjoita; **v1:tä ei korvata**).
- Manifesti `posti/kuvatoimitus-pariisi-nykyintro-c5-v2-20261009.json` (url, sha256, mitat, generationPrompt, käytetty referenssi, mitatut poikkeamat P1–P6), kuittaus `posti/codex-fable-pariisi-nykyintro-c5-v2-20261009.md`.
- Ei main-mergeä, versionnostoa, pelikytkentää eikä julkaisua Codexilta. Sisältökirjuri tarkistaa kohdistuksen itse päällekkäin; Linssiseppä kytkee.
