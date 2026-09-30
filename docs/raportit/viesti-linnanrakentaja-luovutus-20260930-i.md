# Linnanrakentajan luovutus 30.9.2026 (-i): Blender-vienti odottaa omistajaa, PR #3663 pidossa

Rooli: **Linnanrakentaja (Opus, high)**. Edelliset: `…-20260929-h.md` ja `…-g.md` (säännöt ja polut pätevät).

## Kärki: PR #3663 (TF 1.0.61 näytti palikkalinnan)
- **Juurisyy:** Blender-tuotokset (kuori, leivotut tilat ja päivä-/hämäräatlakset) olivat vain paikallisessa
  `_valmiit/olavinlinna-blender`-kansiossa ja Siirtosepän peilissä. Julkaistu paketti oli rakenna.mjs:n proseduraalinen.
- **Korjaus** (haara/worktree `linnanrakentaja-blender-vienti`, 262b1bc4f):
  - `tools/dioraama/vie-blender.sh` (OMISTAJA AJAA): 77 tiedostoa, 605 Mt, 78 PUT →
    `dioraama/olavinlinna/blender/410eaf99f75d79be/`, blender.json viimeisenä.
  - `js/dioraama/rakennukset/olavinlinna/blender.json` → rakenna.mjs kirjoittaa peilin kentät blender/-poluin
    (tunnelma, ulkokuori, tilat[].glb leivottuna, tilat[].valoatlas). Tilat rajataan 8:aan, massa pois.
  - `vie-dioraama.yml`: lähdetarkistus ennen latausta, palvelinpuolen kopio `<hash>/blender/`, määrätarkistus ennen
    osoitinta.
  - `lahteet.js`: Senaatti CC BY 4.0 (muokattu) ja Poly Haven CC0. Testit 5046/0.
- **Tila:** Siirtoseppä kuittasi jäsennyksen (1.0.57–1.0.61, 0 virhettä). Odotetaan: omistaja ajaa skriptin →
  Julkaisija mergeää → CI vaihtaa osoittimen → Siirtoseppä todentaa puhtaalla asennuksella.
  Jos merge tulee ennen vientiä, CI pysähtyy ennen osoitinta (turvallinen).
- **Latausmäärät** (Siirtoseppä, linna-valo): kevyt esikatseluksi + oma taso, vain hämärä-astc, levyvälimuisti tulossa.
  Huippulaite 107 Mt, normaali 74 Mt ja kevyt 18 Mt kuorelle. Valoatlakset: iPhone 9 × 5,6 Mt, iPad Pro 13" 9 × 22,4 Mt.
- **Tärkeä sääntö jatkossa:** jokainen _valmiit-muutos (uusi leivonta, kuori) vaatii uuden vie-blender.sh-ajon
  (uusi hash) + blender.json-commitin. Muuten julkaistu paketti jää vanhaan. Peili ei ole julkaisu.

## Valmiit tänään (mainissa)
#3651 (kohta 3: 4 huonetta, tarkistetut taulut), #3654 (pystykamerat + Pulu pois vihjeiden päältä, testi),
#3657 (sinetin uusi kuva, tools/dioraama/blender/sinetti_kuva.py).

## Seuraavaksi
1. #3663:n loppuun vienti (yllä). Kun osoitin on vaihtunut, poista worktree `linnanrakentaja-blender-vienti`.
2. Siirtoseppä kuvaa pystykuvan sinettiarkun (x ≈ 0,5) ja todentaa kuoren. Korjaa, jos kuva poikkeaa laskusta.
3. Äänet (keskushalli-ambienssi, kappeli-ambienssi, laulu-kaukaa) vasta omistajan hyväksynnän jälkeen, Pelikoodarin
   jonossa. Lisää ne aanet-listoihin, kun ne ovat pankissa.
4. Kone oli jumissa 30.9. yöllä (kuorma 70–130): raskaat ajot vasta kun kuorma < 10 (skriptimalli
   scratchpadissa: odota `vm.loadavg` + tools/gpu-vapaa.sh).
