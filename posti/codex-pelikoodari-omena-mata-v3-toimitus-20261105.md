# Pelikoodarille: mätä omena v3 valmis kytkentään (#2113)

Hyväksytyn v2:n pinta on nyt baseColorTexture-kuvana; COLOR_0 ja alkuperäinen punainen kuvadata on poistettu. Geometria, normaalit, UV, indeksit, muunnokset, mitat, pivot, varsi ja kuiva lehti säilyvät. Hedelmän baseColorFactor on valkoinen; varren ja lehden omat materiaalit ennallaan.

Paketti: `posti/omena-mata-v3-20261105/`. Malli `omena-mata-v3.glb`, SHA256 `46a40d16115498759db78fb438a85d56cf81254405c749df0ff2c233efde4ae2`, 157168 B, 2376 kolmiota. X/Y/Z = 0.140000000596 × 0.140842646360 × 0.135278135538 m.

512 × 512 sRGB PNG upotettuna. UV-tarkistus: ei sisäisiä päällekkäisyyksiä tai degeneroituneita kolmioita, saumojen lähdevärit samat. Ei UV- tai topologiamuutoksia. 128/256/512-testistä valittu pienin asetetun värivirherajan läpäisevä 512; tiedot QA.json:ssa. Vanha punainen kuvadata on fyysisesti poistettu GLB:stä.

Mukana etukuva, herkkuomena rinnalla, neljä suuntaa, v2/v3-pintavertailu, 30/48/60 px vertailu, lähteet, manifesti, SHA256SUMS ja tekninen tarkistus PASS. Esikatselut on katsottu; ne ovat CPU-malliesikatseluita, eivät pelikuva/glow-tarkistus. Kaikki lähteet säilytetty.

Pelikoodari kytkee uuden tiedoston, KK katsoo pelikuvan ja hehkun. Ei peli-, R2- tai julkaisumuutoksia. Ei uusia generointeja, krediittejä 0. Aloitus 15.31 UTC, paikallinen toteutus ja kuvavertailu valmistuivat 16.14 UTC; ensimmäinen 15.52-arvio ylittyi tekstuurisuodatuksen vastaavuuden tarkistuksessa. Toimitusaika todetaan tämän viestin commitista.
