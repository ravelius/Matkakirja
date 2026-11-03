# Pelikoodari: luovutus 3.11.2026 klo 23.41 – kuvia odotetaan

Edellinen: -20261103-2319 (5a79321c4), voimassa ellei alla toisin. Syy: kontekstiraja 28 % (7.37). Ei omia taustaketjuja.

## Tehty 23.23–23.41
- **JU:n korjauspyyntö**: otsikko-219 bf54a5c4f. QA `ui juoksupeli avauskuvat 1` kirjaa juoksupelin rivit Documents/avaus-loki.txt:hen (oikea aika), mukana "avauksen tekstit rivi N". aja.zsh ilman --consolea; lokirivit.txt tulee avaus-loki.txt:stä. Pelissä ajamatta.
- **Palvelijat v6 katsottu**: reaktio toimii, KK hyväksyi.
- **KK 23.30 (ohittaa PT:n "märkä kivi" -ohjeen)**: arkihahmot-218 4da09ab21: lätäkkö vaalea kiiltävä vesi epäsäännöllisellä reunalla (JuoksuMarka.shader), sirpaleet 2,2× ja leviäminen 1,3×, sinivalkoinen kuvio (JuoksuSirpale.shader). Kuvarunko palvelijat-kuva a79caa5a4, vesi-219 06651653d. Unity-tarkistus 0 virhettä kaikilla, valovahti ok. Varjostimia EI ole käännetty: Metal-tarkistus ajamatta.
- **Palvelijatar v2 tilattu**: posti/pelikoodari-tripo3d-palvelijatar-v2-tilaus-20261103.md (b5ef4e9fc, claude/postilaatikko; pysyvä lupa 7.15). Asun lähde auki: oma haku löysi vain pukukauppoja, Tripo 3D:ltä pyydetty museolähteet.
- **Tausta-v124**: saumat-v1-219 15d7274ad; JU vei 23.33, kuvat jonossa (LAV). Paketti ja SHA256SUMS d132fc9df176 täsmäävät.
- **Muistipiikki 4286 Mt (4397cf20d sali-ys3)**: PT pyysi latausrivit ja jumimittauksen NUI:n vianhakuajoon. Pelikoodia ei tarvittu: MuistiTarkka kirjaa ne (L, N, U, T). NUI:lle annettu proto-3d/_tyo/pelikoodari/latausloki/analysoi.py ja huomio, että mittaa-sali-vianhaku.zsh käyttää rikkinäistä --consolea. Syy ei ole todistettu; NUI ajaa ja lukee.

## AVOIN
1. **Otsikko-219**: iPhone-ajo (878ac7755, lokit/pk-otsikko-219-878ac7755-2325/) ja iPad-ajo (bf54a5c4f, -2336) käynnissä 23.40. iPhone-ajossa ei ole rivien hetkiä; B4 iPadilta. Katso kuvat itse; tarkistus kuten -2319:n kohta 2. Kuvat PT:lle, KK:lle 0,5 s välein yksittäisinä, ei koosteita.
2. **B5 keltainen katto**: ennallaan -2319:n kohta 3 ja lisäys: ehdokkaat kuvaan (myös LAV x ≈ −97, z ≈ −205), ei korjausta ennen KK:n vahvistusta.
3. **Palvelijat v7**: JU-jonossa L1 lav-v124:n jälkeen (_tyo/pelikoodari/palvelijat-v7/aja-v7.zsh, a79caa5a4; Pariisi ensin). Varjostinvirhe tulee sinulle. Katso osuma1 + osuma2 itse, pari KK:lle (KK pyysi) ja rivi PT:lle.
4. **Palvelijatar v2**: toimitus posti/palvelijatar-v2-20261103/. Tarkista luuranko, leikkeet, kolmiot, SHA; kuvat edestä ja takaa KK:lle ennen kytkentää. Hyväksynnän jälkeen uusi versioitu kansio (ei arkiset-v1:n päälle), JU vie.
5. **Vesi-219**: JU: pyydä erikseen. Virtaputki käyttää ämpärin veden materiaalia, joka voi näyttää yhtä tummalta kuin vanha lätäkkö; katso kuvasta.
6. Muut kohdat -2255:stä (5–6) ennallaan. Checkout: koti/Matkakirja-pelikoodari.
