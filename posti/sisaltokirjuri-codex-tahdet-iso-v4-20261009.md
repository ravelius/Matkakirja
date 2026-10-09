## 2026-10-09 — SISÄLTÖKIRJURI → CODEX: TÄHDET, ISO KUVA v4 (Otavan janojen suunnat enintään 5° pielessä; 1 kuva)

`tahdet-foto-iso-v3` (1600 × 900): Otava + Pohjantähti tunnistettavat, mutta **yksi jana on 22° pielessä** ja kuvion kierto on +13,7° referenssistä. Peli opettaa, joten iso kuva uusitaan: **v4**. **Generointilupa: enintään 2 yritystä** (tarkkuusyritykset), toimitetaan paras. Nykyinen v3-mini ja pelin käytössä oleva kuva eivät muutu.

### Tavoite: tähdet tarkoille pikselipaikoille
Liitteet `posti/liitteet/tahdet-v4/`:
- **`tahdet-iso-v4-tavoitepisteet.png`** (1600 × 900): tummalla pohjalla tähtien **tavoitepaikat** (valkoiset pisteet, ympärillä 16 px:n toleranssirengas, koko kirkkautta vastaten). Renkaat ja tekstit EIVÄT ole tuloskuvassa; ne ovat vain mittapisteitä.
- `tahdet-iso-v3-maisema-ei-tahtia.jpg`: v3 maisemareferenssiksi (järvi, metsänreuna, messinkinen kaukoputki). **Tähtien paikat v3:ssa ovat VÄÄRIÄ: älä käytä niitä.** Maisema saa olla kuten v3 (järvi, metsä, kaukoputki oikealla alhaalla), kunhan tähtikuvio ei peity.
- Kuvion lähde: referenssi `posti/liitteet/otava-referenssi-20261009.png` (Yale BSC, oikeat koordinaatit); **kierto 0° referenssiin nähden, skaala 0,55** (kuvion korkeus ~465 px, leveys ~300 px), ei peilausta.

**Tavoitepisteet iso-kuvassa (pikseleinä, vasen yläkulma 0,0; x oikealle, y alas):**
| tähti | x | y | kirkkaus (mag) |
|---|---|---|---|
| Pohjantähti | 760 | 120 | 2,0 (kirkas) |
| Dubhe | 861 | 441 | 1,8 (kirkas) |
| Merak | 884 | 502 | 2,4 |
| Phecda | 804 | 553 | 2,4 |
| Megrez | 765 | 514 | **3,3 (selvästi himmein seitsemästä)** |
| Alioth | 701 | 524 | 1,8 (kirkas) |
| Mizar | 649 | 528 | 2,3 |
| Alkaid | 583 | 585 | 1,9 (kirkas) |

**Janojen tavoitesuunnat** (kulma +x-akselista, asteina, y alaspäin, eli kuvassa myötäpäivään): Dubhe→Merak 69,3° · Merak→Phecda 147,5° · Phecda→Megrez −135,0° · Megrez→Dubhe −37,2° · Megrez→Alioth 171,1° · Alioth→Mizar 175,6° · Mizar→Alkaid 139,2° · Dubhe→Pohjantähti −107,5°. (Janoja EI piirretä kuvaan; ne ovat vain mittasuunnat.)

**Pakolliset toleranssit (mitataan QA:ssa):** jokainen tähti enintään **16 px (1 % leveydestä)** tavoitepaikastaan; **jokaisen janan suunta enintään 5°** tavoitteesta; Megrez himmein; täsmälleen **seitsemän Otavan tähteä + Pohjantähti** kirkkaina (ei kahdeksatta kirkasta tähteä kuvion lähellä, ei muita yhtä kirkkaita tähtiä kuvion sisällä); taustatähdet himmeitä.

### Muut ehdot
- **1600 × 900 JPG q90 sRGB**, läpinäkymätön; fotorealistinen havainnekuva (valokuvan näköinen yötaivas pimeän järven yllä; Linnunrata ei tarvita); ei yhdysviivoja, katkoviivoja, nimiä, tekstiä tai logoja; ei ihmisiä.
- Metatietoihin "Havainnekuva. Tekoälyllä tuotettu, ei valokuva." ja kuvateksti päättyy sanaan "Havainnekuva."
- **Jos tähtien paikat eivät osu toleransseihin generoimalla,** saat sijoittaa tähdet tavoitepisteisiin tarkasti kuva-editoinnilla (tähtien paikat ovat tässä tilauksessa tarkat koordinaatit, ei taiteellinen valinta); kirjaa menetelmä QA:han.

### Toimitus
- R2 `linssikatalogi/tahdet-foto-iso-v4.jpg` (tarkista julkinen URL `?t=`-parametrilla; älä ylikirjoita v2/v3). Manifesti `posti/kuvatoimitus-tahdet-iso-v4-20261009.json` (url, sha256, mitat, generationPrompt, mitatut tähtipaikat ja janasuunnat), kuittaus `posti/codex-fable-tahdet-iso-v4-20261009.md`. **QA:ssa taulukko: tähti → mitattu (x, y) → poikkeama px; jana → mitattu suunta → poikkeama °.**
- Ei main-mergeä, versionnostoa, pelikytkentää eikä julkaisua Codexilta. Sisältökirjuri mittaa itse ja antaa NUI:lle, kun kuva kelpaa.
