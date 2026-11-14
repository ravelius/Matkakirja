# Viiden lukitun kaupungin sisällön tilannetaulu (SK 14.11.2026, KK 22.48)

Luvut ovat pelin datasta (origin/main ccf6b5026; Unity-data /proto-3d/Matkakirja-proto-esikatselu aa814e2c6; natiivi-mainia ei varmistettu), ei aiemmista luonnoksista. Ruutu: **data | luonnos (PR) | puuttuu Pariisin malliin verrattuna**. Vain docs. Laskutapa kohdan 4 lopussa.

## 1. Taulu (kohteet: js/packs/maakartat.js, KAUPUNKIKARTAT[kaupunki].kohteet)
| | Nähtävyydet | Tarinapaikat | Kadonneet | Museot |
|---|---|---|---|---|
| **Pariisi** (malli) | 17 (26 kartalla − 9 kadonnutta) | 15 (+ Bastilji 1789 ilman tarinapaikkaa) | 9 | 1 museolinssi (Louvre); 51 teosta: Louvre 27, Orsay 23, Marmottan 1; 10 Rodin-veistosta |
| | #6714 auki: +3 (Tour Saint-Jacques, Saint-Eustache, Pompidou) | – | docs #6744, #6749–51, #6756 | – |
| **Lontoo** | 26 | 6 | 6 | 0 teosta (British Museum, NHM vain karttakylttinä) |
| | #6553 auki (vain UI/vienti) | – | lähteet #6737–39 | – |
| | nähtävyyksiä jo enemmän kuin Pariisissa; puuttuu: piirroskartta; tarinapaikkoja 9 vähemmän | | | puuttuu: koko museo |
| **Amsterdam** | 8 | 0 | 0 | 1 linssi (Rijks); 64 teosta (Amsterdam 57, Haag 5, Haarlem 1, Antwerpen 1) |
| | – | – | – | – |
| | 9 vähemmän kuin Pariisissa | puuttuu: kaikki (Pariisi 15) | puuttuu: kaikki (Pariisi 9) | – |
| **Wien** | 7 | 0 | 2 | 0 |
| | – | (Beethoven, Mozart, Krahi vain tarinakohteita) | #6748 | – |
| | 10 vähemmän | puuttuu: kaikki | 7 vähemmän | puuttuu: koko museo |
| **Rooma** | 10 | 0 | 2 | 0 |
| | – | (Michelangelo, Banca Romana vain tarinakohteita) | #6743 | – |
| | 7 vähemmän | puuttuu: kaikki | 7 vähemmän | puuttuu: koko museo |

| | Lehden jutut | Tehtävätyypit | Kertojan tekstit |
|---|---|---|---|
| **Pariisi** (malli) | 12 juttua 9 sivulla; 6 hetkeä | tietovisa; Näyttämö yhdistä 3 + vaikea 1; kohtaaminen 1 | Williamin kohdetekstit 45; isoisän 4 |
| | #6669/#6670, #6696–6703, #6712, #6728/29, #6700 | – | – |
| **Lontoo** | 12 juttua 8 sivulla; 5 hetkeä | tietovisa; kohtaaminen 1 | 44; isoisän 4; + 7 ilmapallokierroksen pysähdystä (vain Lontoo) |
| | #6680, #6681, #6716/#6717 (Yhdistä keksintö–keksijä, docs) | puuttuu: Näyttämö yhdistä | – |
| **Amsterdam** | 5 juttua 3 sivulla; 0 hetkeä | tietovisa; kohtaaminen 1; Näyttämö erottele 1 | 13; isoisän 4 |
| | #6709/#6718 (Erottele, docs) | puuttuu: vaikea, yhdistä | 32 vähemmän kuin Pariisissa (13 vs 45) |
| **Wien** | 12 juttua 7 sivulla; 3 hetkeä | tietovisa; kohtaaminen 1 | 18; isoisän 4 |
| | #6740/#6741/#6743/#6745/#6748 (Yhdistä sävelmä, docs) | puuttuu: Näyttämö (datana) | – |
| **Rooma** | 7 juttua 4 sivulla; 1 hetki | tietovisa; kohtaaminen 1 (+ valinta-portti); Näyttämö valitse (lippu) 1 | 18; isoisän 4 |
| | #6716/#6717 (Paljasta, docs), #6723, #6746 | puuttuu: Paljasta-data | – |

Huom. "vähemmän"-luvut ovat omaa vähennyslaskua Pariisin luvusta (data-ruudut ovat datasta). Avoimia PR:iä kaupunkiasioissa vain #6714 (Pariisin 3 kohdetta, luonnos) ja #6553 (aihe-kenttä, UI). #6669 (Pariisin lisätyypit) on YHDISTETTY.

## 2. Pariisi: lehti ↔ kartta
**Lehden jutut ilman karttakohdetta (6):**
1. Saint-Eustache (NAHTAVYYSJUTUT.pariisi): kohde puuttuu kartalta; #6714 lisää sen.
2. maalehti-braille (Braillen pisteet)
3. maalehti-tour-de-france-1903
4. maalehti-bouquinistit (sama aihe kartalla Bukinistit 1859, eri id)
5. maalehti-pasteur-meister (Pasteur-instituutti)
6. maalehti-roland-garros (kaupungin rajojen läntinen ulkopuoli)
(Kohdat 2–6: js/packs/maalehtinostot-fra.js; maalehti-peilisali = Versailles, ei lasketa.)
**Kartan kohteet ilman juttua:** ei yhtään (42/42 kohteella joko NAHTAVYYSJUTUT-merkintä, 35/42, tai nosto). Seitsemällä kadonneella on vain hahmotelma-teksti + ihmekortti ilman nähtävyysjuttua: Grand Châtelet, Temple-torni, Palais d'Orsay, Palais de l'Industrie, Trocadéron palatsi, Galerie des Machines, Les Halles.

## 3. Viisi tärkeintä puuttuvaa sisältöä (kirjoitettavissa ilman koodia, järjestyksessä)
1. **Lontoon tarinapaikat** (6; Pariisissa 15): 9 uutta tarinapaikkaa teksteineen, lähteineen ja Commons-kuvineen. Suurin yksittäinen ero Pariisiin ja Lontoo on pisimmällä; aloita tästä.
2. **Amsterdamin tarinapaikat ja kadonneet** (0/0): 5 tarinakohdetta (Timanttihiomo, Amsterdam-laiva, Maitotyttö, Kissalaiva, Yövartio) pelkästään lehdessä → tarinapaikoiksi, + 2–3 kadonnutta (lähteet viisi-kaupunkia-20261113/amsterdam-tutkimus.md).
3. **Wienin ja Rooman tarinapaikat** (0/0): Wien 10 ja Rooma 6 tarinakohdetta, jotka ovat vain lehdessä (Beethoven, Mozart, Krahi; Michelangelo, Banca Romana) → tarinapaikkatekstit.
4. **Näyttämötehtävät dataksi** (ei koodia): Lontoo yhdistä (luonnos #6716/#6717), Wien yhdistä (#6740/#6741/#6743/#6745/#6748, Egmont lukittu), Rooma Paljasta (valokuvilla, 5 luvallista; #6723/#6746) → tarinakaari.<kaupunki>.nayttamo[] -luonnokset; data-PR vasta KK:n sanalla.
5. **Pariisi: 7 kadonneen nähtävyysjuttua** ja KK:n päätös 5 jutun paikasta (kohta 2: Braille, Tour de France, Pasteur-Meister, Roland-Garros, Bukinistit-päällekkäisyys).

## 4. Laskutapa ja varaukset
- Nähtävyydet/tarinapaikat/kadonneet: maakartat.js kohteet; kartalla = tyyppi rakennus/aukio/luonto; kadonnut = nosto alkaa "hahmotelma-" tai on tuileries/bastilji/vanha-london-bridge (ihme kadonnut:true); nähtävyydet = kartalla − kadonnut; tarinapaikka = ei kartalla, tarinapaikka:true. Kohteet: Pariisi 42, Lontoo 43, Amsterdam 13, Wien 19, Rooma 18.
- Museot: Unity Museo/{ranska,alankomaat}/teokset.json (vain nämä kaksi); Alankomaiden 64: Rijks 41 maalausta + 7 grafiikkaa + 5 valokuvaa.
- Lehden jutut: kulttuuri-kategoriat.js + lehtinostot.js (kuten tools/vienti/lehdet.mjs); hetket historian-hetket.js.
- Tehtävät: fokusvirrat.js (tietovisa), tarinakaari.js (kohtaamiset), nayttamo.json (Näyttämö; varadataa, ei vielä paketissa).
- Kertojan tekstit: NAHTAVYYSJUTUT-avaimet (Pariisi 38, Lontoo 39, Amsterdam 13, Wien 16, Rooma 16) + kadonneet vain hahmotelmalla (7/5/0/2/2); isoisä: 3 + saapumispuhe 1.
- Ei määritetty: 3D-koodimallien määrä (vain tiedostonimistä: Pariisi 12, Lontoo 6, muut 0), museot per kaupunki kartalla, onko Unity-työpuu natiivi-mainissa. Nähtävyyslukuun (Pariisi 17) ei ole luettu "Metro 1900" -tyyppipoikkeamaa tarkasti.
- Lähdeluvut kerätty Sonnet-apulaisella (read-only); skriptit sessio-scratchpadissa, ei repossa.
