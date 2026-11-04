# Pelikoodari: luovutus 4.11.2026 klo 05.50 – be56 oleskelu, muurin todistus ja LOD JU:lla

Korvaa tiedoston -0529 lisäyksineen; sen palikka-, omena- ja Palvelijatar-kohdat -0502:sta ennallaan. Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja. Kaikki _tyo- ja lokit-polut ovat kansiossa /Users/Shared/Claude/proto-3d/.

## Odottaa JU:n rivejä (ei omaa ajoa)
1. **"OLESKELU AJETTU"** (`_tyo/pelikoodari/kamera-219-be56/pk-be56-oleskelu.zsh`, skripti `muistipiikki-219/mittaa-oleskelu.zsh`, EI ole ajettu kertaakaan). KK 05.46: **be5632bdb ei junaan ennen tätä.** Ehdot: ei maalia tai kaukana, Puyi salissa koko mittauksen, kuvat alusta, keskeltä ja lopusta, muisti tasaantuu, xf ja sali 1, muisti-tarkka.log ei tyhjä tai kerro korvaava loki. Katso `lokit/pk-muistipiikki-219/oleskelu-be5632bdb-1{,-xf}/`: kaikki kuvat, `oleskelu.txt`, `hae.log`, vaiheet.txt.
   - Riskit: `valo sijoita` naulaa Puyin, mutta reitti etenee taustalla botilla; jos loppukohtaus laukeaa, kuvat näyttävät sen (ratkaisu: `saannot`-tauko, kuten LAV:n sk). Varaston paikka (-115.9 321.3) on puoliväli, ei mitattu piste. Naulausta ennen ehtii juosta enintään noin 5 s.
   - Tulos KK:lle PT:n kautta. Jos 0 tavua toistuu, katso hae.log.
2. **"MUURI AJETTU"** (`_tyo/pelikoodari/muuri-koe/todistus/aja.zsh`, runko 37f46a2da haarassa pelikoodari/muuri-todistus-219, worktree wt/proto-pelikoodari-muuri-todistus, ei junaan). Katso vanha.mp4 ja uusi.mp4 alusta loppuun; varmista kansio-*.txt:n lokista, että malli tuli koejuurista; KK:lle kuva vanha | uusi samasta kohdasta. Sama kamera on oletus: vertaa paikkaa lokista. Tarkista myös LAV:n avoimet: lohkon porras 3,78, sokkelin päät, LOD1–2-vaihtokohta. Todistus on minun, KK kohta 6. Vienti PT:n luvalla; täytöt + friisi + muuri yhtenä pakettina (`_tyo/linnanrakentaja/muuri/KORJAUS.md`).
3. **"LOD AJETTU"** (cb8b1f06c/2e2dfaf36 iPad, pk-lod-odotus.zsh): muistihuippu korjaus vs. edeltäjä, rivi PT:lle ja KK:lle. **cb8b1f06c vain samassa junassa muurin kanssa (KK 05.26).**

## Sovittu, ei minun työtäni nyt
- **Joki:** VS, avovesi ja vaalea reunakivi, tilaus PT:n kautta, kuva KK:lle ennen kytkentää (KK 05.32). Tausta VS:lle lähetetty.
- **Kaide ja vinot lovet:** LAV:n tilauksessa (KK 05.41). LAV: kaiteen normaalit ylös, ei muurin vika.

## Seuraavaan ohitusajoon, ei omaa jonoa
Maljakon kantaja lähikaistalta; palvelija heti käännöksen jälkeen, kun 1,3 s ei ehdi täyttyä; uusi Palvelijatar; muurikorjaus. **Kirkas vino alue (KK 05.41):** LOD-korjaus mukaan, katso sama aukio (ohitusajon ruudut 5605–5745). Jos näkyy yhä, vertaa 217:ään samasta kohdasta ja kerro KK:lle. Ei omaa ajoa ennen sitä. Palvelijalippu kiinni: iPad-muisti puuttuu, liikkuvaa kuvaa ei ole katsonut kukaan, ja se kerrotaan omistajalle.

## Mitattu tässä erässä
- be56 iPad: sali 3845, 3878; xf 3913, 3944; uudestaan 3909 Mt, raja 4080. Aiempi xf VIKA 4153 Mt oli oma virheeni (`palatsi kopiot 1`, poistettu). Huippu tulee ensimmäisessä aloituksessa. Kuvat eivät todistaneet salipaikkaa (xf 1/24, varasto 1/12), siksi oleskelu. `lokit/pk-muistipiikki-219/TULOS.md`, loppu.
- Silta-koe: `_tyo/pelikoodari/muuri-koe/TULOS.md`, loppu. Sen alun "kaksi pintaa" on LAV:n mukaan väärin: yksi pinta, normaali väärinpäin.

Haarat: arkihahmot-218 01e3bc89f, kuvarunko palvelijat-kuva-218 349e8f8db, lod-diag-218 a368fdf29, muuri-todistus-219 37f46a2da. Viestit KK:lle suoraan muuri-, kaide- ja vino alue -asioissa, be56 PT:n kautta.
