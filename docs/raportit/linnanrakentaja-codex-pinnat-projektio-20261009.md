# Codexin valokuvamaiset pinnat ND:lle ja KL:lle: ohjekuvat ja projektiosuunnitelma

Linnanrakentaja 9.10.2026. Tausta: PT 15.0x. ND v8 ja KL v2b erottuvat Googlen fotogrammetriasta, koska katossa ja tiilissä
toistuu yksi tekstuuri ja rakennus näyttää erilaiselta kuin ympäristö. Osoitinta ei vaihdeta. Uusi linja: Codex tekee
valokuvamaiset pinnat julkisivu ja katto kerrallaan. Linnanrakentaja kiinnittää ne malliin planaariprojektiolla, kokoaa ne
UV-atlakseen ja leipoo AO:n. LS2 näyttää tuloksen valaisemattomana kuten Googlen laatat.

## 1. Ohjekuvat (valmiit)

Kansiot (kumpikin alle 15 Mt):

- `/Users/Shared/Claude/proto-3d/_valmiit/notre-dame-v1/codex-ohje/`
- `/Users/Shared/Claude/proto-3d/_valmiit/kuninkaanlinna-v1/codex-ohje/`

| Malli | Näkymä | Koko px | px/m | Leveys × korkeus m | Codex-osat | Aukkoja (tyyppejä) |
|---|---|---|---|---|---|---|
| ND | lansi (länsijulkisivu, tornit) | 3475 × 4084 | 38 | 79,9 × 97,3 | 1 | 195 (50) |
| ND | etela | 4088 × 2981 | 26,5 | 137,7 × 97,3 | 1 | 31 (14) |
| ND | pohjoinen | 4088 × 2981 | 26,5 | 137,7 × 96,0 | 1 | 35 (18) |
| ND | apsis (itäpää) | 3475 × 4084 | 38 | 79,9 × 97,2 | 1 | 33 (22) |
| ND | katot (ylhäältä) | 4088 × 2557 | 26,5 | 137,7 × 80,0 | 1 | – |
| ND | spiira (torni etelästä) | 1464 × 4089 | 63,5 | 16,2 × 57,5 | 1 | 11 (7) |
| KL | etela | 8119 × 1900 | 34 | 213,2 × 37,9 | 4 | 177 (25) |
| KL | pohjoinen | 8119 × 1900 | 34 | 213,2 × 37,9 | 4 | 203 (20) |
| KL | ita | 4868 × 1552 | 34 | 127,8 × 37,9 | 3 | 129 (17) |
| KL | lansi | 4868 × 1552 | 34 | 127,8 × 37,9 | 3 | 117 (8) |
| KL | katot (ylhäältä) | 8119 × 5216 | 34 | 213,2 × 127,8 | 4 | – |

Jokaisessa näkymäkansiossa (`<näkymä>/`) on seuraavat tiedostot:

- **`*_ohje.png`** on Codexin pääohje: varjostettu ortokuva, 5 m:n ruudukko, korot, listatasot (oranssi katkoviiva), räystäs, harja ja
  huippu (punainen), aukot tyyppikirjaimin (sininen = ikkuna, punainen = ovi tai portaali, violetti = säleaukko), kokonaisleveys ja
  10 m:n mittakaava. Yli 4096 px:n näkymissä tiedosto on pienennetty yleiskuva, jossa osien rajat näkyvät.
- **`*_puhdas.png`** on sama ortokuva ilman merkintöjä. Se on Codexin rajaus- ja muotoviite.
- **`*_luokat.png`** näyttää pintaluokat tasavärein. Selite on ohjekuvassa.
- **`maskit/*_maski_<luokka>.png`**: 0/255-maskit samassa kehyksessä. Luokat ovat rakennus, seina, kivikoriste (KL:n hiekkakivi),
  ikkuna, puite, ovi, aukko (säleet), katto, veistos, kulta, paneeli (KL:n aurinkopaneelit), ulkonema (seinätason edessä > 12 cm),
  lista (vaakasuorat ulkonemat), ura (KL:n rustiikin vaakaurat) ja aukot_kaikki.
- **`*_syvyys.png`** (16-bit) ja **`*_normaali.png`**: kohokuva ja pintojen suunta. Codex näkee niistä, mikä on lähempänä.
  Projektio käyttää syvyyttä näkyvyystestiin.
- **`*_mitat.json`** sisältää kehyksen (pikseli → maailma), korot, listatasot, aukkotyypit (leveys × korkeus 0,25 m:n
  tarkkuudella ja kappalemäärä) sekä jokaisen aukon pikselirajat, mitat, alareunan ja yläreunan korot ja syvyyden.
- **`osat/osa<k>/`** (KL): Codexille sopivat rajaukset täydellä tarkkuudella. Julkisivujen osat ovat tasan 3:2 (etelä ja
  pohjoinen 2467 × 1645 px, itä ja länsi 2206 × 1471 px), ja niiden limitys on 30–44 %. Kattojen osat ovat 3753 × 2301 px.
  Jokaisessa osassa on oma ohje, puhdas kuva, luokat, syvyys ja maskit sekä alakulmassa sen aukkotyyppien selite.

Näkymien katselusuunnat seuraavat rakennuksen omaa akselia, joka on laskettu seinäpintojen normaaleista: ND −25,6° (laiva
WNW–ESE) ja KL +31,4°. ND:n eteläjulkisivu katsotaan siis atsimuuttiin 26°, ei suoraan pohjoiseen. Maan alle jatkuvat
seinät (helma, 4 m) on leikattu pois maaston korkeuskartan (0,5 m) mukaan, joten maskin alareuna on todellinen maanraja.

Työkalut: `_valmiit/kaupunkipinnat-v1/lahde/ortho_ohje.py` (Blender, Cycles-CPU, tarkat passit) ja `ortho_merkinnat.py`
(venv-rembg-python: maskit, ohjekuvat, mitat). Ajokomennot ovat tiedostojen otsakkeissa. KL ajetaan `--ppm 34`:llä. Väli-.npy:t
poistetaan ajon jälkeen, sillä ne syntyvät uudelleen muutamassa minuutissa.

## 2. Tilausohje Codexille (Sisältökirjurille)

Yksi tilaus on yksi näkymä tai yksi osa (KL). Liitteeksi tulevat `*_ohje.png`, `*_puhdas.png` ja `*_maski_aukot_kaikki.png` sekä
Commons-referenssit samasta julkisivusta.

1. **Kehys pikselilleen sama kuin `*_puhdas.png`:ssä**: sama kuvasuhde, rakennuksen ääriviiva maskin `rakennus` mukaan ja
   ortografinen kuva ilman perspektiiviä ja kameran kallistusta. Aukot (ikkunat, ovet ja säleet) ovat täsmälleen maskien kohdilla,
   eikä uusia aukkoja keksitä. Listat ovat niillä korkeuksilla, jotka ohjekuva kertoo.
2. **Valo:** tasainen pilvipouta. Kuvassa ei ole luotuja varjoja eikä aurinkoa, ja kaikki julkisivut tilataan samalla valolla.
   Syvennykset saavat tummua luonnollisesti (AO leivotaan kuitenkin erikseen).
3. **Sisältö:** pelkkä rakennus nykyasussaan (AIKA). Kuvassa ei ole ihmisiä, ajoneuvoja, telineitä, nostureita, puita, lyhtypylväitä,
   kylttejä eikä taivasta. Rakennuksen ulkopuolelle tulee tasainen valkoinen tai läpinäkyvä tausta.
   - ND: vaalea kermankeltainen kalkkikivi, jossa kivikohtainen vaihtelu ja likajuovat. Lyijykatto on vaalean hopeanharmaa ja
     spiira tummempi sinertävänharmaa. Patsaat ovat vihertävää pronssia.
   - KL: varmrosa rappaus noin 223/185/164 (SFV) ja vaalea hiekkakivi. Kupari on hillitty harmaanvihreä patina.
     Aurinkopaneelit ovat sisäpihan puoleisilla lappeilla.
4. **Ei toistuvaa kuviota:** jokainen kivi, ikkuna ja katon kohta on ainutkertainen, kuten valokuvassa. Juuri tästä omistaja huomautti.
5. **Tarkkuus:** vähintään ohjekuvan koko, ja suurempi on parempi. Kuvaan ei tule tekstiä, merkintöjä, vesileimaa eikä
   "havainnekuva"-merkintää, koska kuva projisoidaan malliin. Merkintä kulkee tiedostonimessä ja saatteessa.
6. **Katot ylhäältä:** pystysuora ilmakuva kuten ortokuva. Lappeiden saumat ja harjat ovat ohjekuvan kohdilla.
7. **Spiira:** kahdeksankulmainen, ja ohjekuva näyttää sen etelästä. Codexilta tilataan yksi sivu, ja sama kuva käytetään kaikilla
   kahdeksalla sivulla peilaten. Ero ei näy 300 m:stä.

Palautus: `<malli>_<näkymä>[_osa<k>]_codex_v<n>.png` Sisältökirjurin kautta. Ennen projektiota Linnanrakentaja tarkistaa jokaisen
kuvan kohdistuksen (kohta 3.1).

## 3. Projektiosuunnitelma

### 3.1 Kohdistus (työkalu `kohdista.py`, uusi)

1. Codexin kuva skaalataan ohjekuvan kokoon.
2. Kuvasta tunnistetaan aukot: tummat suorakaiteet maskin `aukot_kaikki` ympäriltä ±0,5 m:n ikkunassa. Niiden keskipisteitä
   verrataan `mitat.json`:n aukkoihin.
3. Kuvaan sovitetaan ensin siirto ja mittakaava pienimmän neliösumman menetelmällä. Jos jäännös on yli 0,15 m, sovitetaan
   ohutlevyinterpolaatio (TPS), jonka ohjauspisteinä ovat aukkojen keskipisteet ja rakennusmaskin kulmat.
4. Hyväksyntärajat:
   - Aukkojen jäännös on mediaanina ≤ 0,15 m ja enintään 0,4 m.
   - Rakennusmaskin IoU on ≥ 0,97.
   - Muuten kuva palaa Codexille. Palautteeseen tulee eroavien aukkojen lista.
5. KL:n osien limitysalueet (vähintään 12 %) häivytetään lineaarisesti. Sauma osuu limityksen keskelle, ja jos mahdollista
   pilasterin tai rännin kohdalle. Ennen häivytystä osien kirkkaus ja sävy tasataan limitysalueen keskiarvon mukaan.

### 3.2 Planaariprojektio ja atlas (työkalu `projisoi.py`, valmis ja testattu 9.10. puhdas-kuvilla)

`_valmiit/kaupunkipinnat-v1/lahde/projisoi.py`. Ajo: `Blender -b --factory-startup -P projisoi.py -- <nd|kl> <ulos> --lahde codex
--atlas 4096 --ao 64`. Työkalu lukee jokaisesta näkymästä uusimman `<malli>_<näkymä>_codex_v<n>.png`:n. Jos sitä ei ole, se
käyttää `puhdas.png`:tä, joten koko ketju voidaan ajaa jo nyt.

Jokainen ortonäkymä on projektori, jonka `*_mitat.json` → `kehys` määrää. Pisteen P projektio-UV on:
`u = (P·oikea − x0) / leveys_m` ja `v = (y0 − P·ylos) / korkeus_m`.

- **Projektorin valinta** tehdään kolmio kerrallaan: valitaan näkymä, jossa |n·v| on suurin (> 0,3) ja jossa kolmio näkyy.
  Normaalin itseisarvo tarvitaan, koska osa OSM-renkaista on väärinpäin. Valitun näkymän kolmiot käännetään kohti kameraa, ja
  KL:ssä niitä käännettiin 9 200. Ilman kääntöä AO mustui ja pinnat näkyisivät pelissä takapintoina. Esimerkiksi ND:n 55°:n
  laivakatto saa pinnan sivunäkymästä, koska venymä jää siten alle 1,4×.
- **Näkyvyys:** näytepisteitä on viisi: keskipiste ja neljä kulmaa 20 % keskelle päin. Näyte on näkyvissä, kun sen syvyys poikkeaa
  näkymän `syvyys.png`:stä alle 0,25 m (3 × 3 px:n minimi). Kolmio hyväksytään, kun ≥ 60 % maanpäällisistä näytteistä näkyy.
  Maan alle jäävät näytteet (helma) eivät äänestä.
- **Atlas (muutos alkuperäiseen suunnitelmaan):** Smart UV Projectin pakkaus jätti projisoiduille pinnoille vain 27 % atlaksesta,
  ja ND:n tiheys oli 16,6 cm/px 2048²:ssa. Atlas kootaan siksi näkymien rakennusrajauksista suorakaiteina hyllypakkauksella:
  metrinen tiheys on tasainen ja spiiralla 2×. Kolmiot käyttävät suoraan projektio-UV:ta, joten Codex-kuvaa ei näytteistetä
  uudelleen eikä julkisivun sisällä ole saumoja. Rakennuksen värit venytetään taustaan 24 px, ja sitä kauempana tausta saa
  keskivärin, joten mipit eivät vuoda.
  - Tulos 4096²:ssa: ND 7,15 cm/px ja KL 6,25 cm/px.
  - Varapinnat (piilossa olevat sisäseinät ja kannet, peitetyt pielet) ovat yhdessä 16 px:n tasavärilohkossa.
- **Kattavuus pinta-alasta** (testiajo puhdas-kuvilla):
  - ND: näkymät 30 %, varapinta 70 %. Varapinnoista valtaosa on piilossa OSM:n building:part-prismojen välissä.
  - KL: näkymät 47 %, varapinta 53 %.
  - Näkyviä varapintoja on vain KL:n sisäpihalla ja itäsiipien välissä. Niille tilataan lisänäkymät: sisäpiha 4 ja itäsiipien
    väli 2 (`ortho_ohje.py`:hin rajausvalinta). Siihen asti ne saavat rappauksen keskisävyn.
- **Rajoite:** osittain peitetty iso kolmio saa peittäjän kuvan peitetylle osalleen. ND:n verkko on tihennetty 2 m:n välein,
  joten virhe jää alle 2 m:iin. KL:n suurille rappausnelikulmioille tehdään sama tihennys ennen tuotantoajoa.

### 3.3 AO ja vienti

1. **AO** leivotaan atlas-UV:hen Cyclesillä: 64 näytettä ja etäisyys 6 m. Varjostajana on oma maa (maa-objekti). AO kerrotaan
   väriin voimakkuudella 0,7 vain näkymäsuorakaiteissa. LS2:n valaisematon esitys ei lue occlusionTexturea, joten AO:n on oltava
   itse värissä.
2. **Vanha COLOR_0-AO** (`syvyys.leivo`) poistetaan, jottei syvennyksiä tummenneta kahdesti. PBR-pinnat ja niiden normal- ja
   ORM-kartat jäävät pois. Materiaali on yksi baseColor (karheus 1, metalli 0).
3. **Sävyn sovitus Googleen:** LS2 ottaa pelistä kolme näytettä Googlen laatoista rakennuksen vierestä (maa, naapurijulkisivu ja
   naapurikatto). Atlakseen sovitetaan yksi globaali vahvistus ja gamma niin, että sama materiaali osuu ±5 %:iin Googlen
   luminanssista.
4. **Vienti:** GLB lod0 (nyt), lod1 ja lod2 samalla atlaksella. Versiokansio on uusi, esimerkiksi ND v10 ja KL v3. Osoitinta ei
   vaihdeta ennen omistajan hyväksyntää.

### 3.4 Työnjako ja järjestys

| Vaihe | Tekijä | Edellyttää |
|---|---|---|
| Ohjekuvat ND (6) + KL (5 + 14 osaa) | Linnanrakentaja | valmis 9.10. |
| Commons-referenssit + Codex-tilaukset | Sisältökirjuri | ohjekuvat |
| Pilotti: ND eteläjulkisivu + ND katot | Codex → Linnanrakentaja | ensimmäiset kaksi kuvaa |
| projisoi.py (valmis 9.10.), kohdista.py | Linnanrakentaja | pilottikuvat |
| Valaisematon esitys + Google-sävynäytteet | LS2 | atlas-GLB |
| Pelikuvat omistajalle (kulma ja versio kuvassa) | LS2 → PT | vienti uuteen versiokansioon |

Pilotin jälkeen PT ja omistaja arvioivat yhden julkisivun pelikuvana, ennen kuin loput tilataan.

### 3.5 Riskit

- **Codex ei noudata geometriaa** (aukkoja puuttuu tai on liikaa). Kohdistuksen hyväksyntärajat estävät huonon kuvan, ja palaute
  annetaan aukkolistana. Pitkät KL:n julkisivut tilataan siksi osina.
- **Valo vaihtelee julkisivujen välillä.** Kaikki tilataan samalla valolla, ja sävy tasataan limityksessä ja Google-sovituksessa.
- **Atlaksen tarkkuus:** 300–700 m:n etäisyydellä 6–7 cm/px riittää moninkertaisesti. Lähikuvassa (spiira, länsiportaalit)
  pikselöinti voi näkyä, joten spiiralle ja länsijulkisivulle varataan tarvittaessa oma 2048²-alue.
- **Lupa:** Codexin kuvat ovat omaa generoitua sisältöä. Commons-referenssit ovat vain tyyliohjeita, eikä niistä kopioida paloja
  malliin.
