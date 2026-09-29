# Linnanrakentajan luovutus 29.9.2026 klo 22.4x (-g): ELÄVÄ LINNA vaihe 1 alkaa

Rooli: **Linnanrakentaja (Opus, high)**. Päätoimittaja local_593b89a1… (viestit NIMELLÄ). Siirtoseppä = Unity-puoli.
Edellinen: `…-20260929-f.md` (kuori v11→v13, 7 tilaa sijoitettu ja leivottu, tunnelma v1, luonnokset) — lue sen "Säännöt".
(Päätoimittaja pyysi nimeä -b, mutta -b oli jo käytössä → -g.)

## OMISTAJAN PÄÄTÖS 29.9. klo 22.28 (Päätoimittajan kautta, sitova)
Elävän linnan suunta hyväksytty: **A:n tunnelma** (hämärä, lämpimät ikkunat, heijastus) + **C:n sisätilat eläviksi**.
**B (muurinharja) vasta kun leikkausreunan vasemman laidan fotogrammetriarepeämä on siivottu.** Käsikirjoitus:
haara claude/bold-ride-vow4ki `docs/raportit/linna-elava-kasikirjoitus-20260929.md` (luettava kokonaan, 83 riviä).
Luonnoskuvat: rooli-haara `docs/raportit/kuvat/linnanrakentaja-elava/{A,B,C,D-varaversio}*.jpg`; natiivi-D
`/Users/Shared/Claude/proto-3d/lokit/siirtoseppa-luonnos-BD/luonnos-D-natiivi.jpg`.
Valmistumisviesti Päätoimittajalle ≤ 8 riviä + kuvapari (nykyinen | uusi, kulma ja versio kuvaan, Arial-fontti).

## Työnjako (sovittu Siirtosepän kanssa 22.4x)
- **Siirtoseppä (Unity)**: saapumiskaari + soihtujen syttyminen (lähimmästä kauimpaan), yleisnäkymä ilman lappuja,
  napautus lähimpään elava.kohde, sykkivä vihje, leikkausikkunalento 0,8–1,2 s (lupa muuttaa Kameraliikettä annettu),
  hämärä oletukseksi, reittihahmot 3D:nä.
- **Linnanrakentaja (data + leivonta)**, järjestyksessä:
  1. **Hämäräatlakset** (valoatlas.hamara): muurinharja valmis; kuusi muuta leipoo taustalla
     `/Users/Shared/Claude/proto-3d/lokit/linnanrakentaja-hamara-20260929/ajo.log` (skripti leivo-hamara.sh samassa
     kansiossa: --hamara --leikkaa --leivo, UV1-tarkistus uvvert.py, kopio `_valmiit/.../valot/<id>-hamara{,-2k}.jpg`
     + astcm). Tarkista loki: "TILA <id> OK" ×6 → kerro Siirtosepälle.
  2. **rakennus.json -kentät** (Siirtosepän muodot): olavinlinna.js `saapuminen: { alku: { atsimuutti: 200,
     etaisyys: 600, korkeus: 8 }, kesto: 18, lyhyt: 6 }`; jokaiselle tilalle `elava: { kohde: [x,y,z], sade: 6,
     vihje: (vain keittiö true), reitti?: { henkilo, pisteet: [[x,y,z]…], nopeus: 0.8, edestakaisin: true, lyhty } }`.
     Reitit: vartija muurinharjalla (kannen päästä päähän, sijoitetuissa koordinaateissa y ≈ 16), soutaja laiturilla.
     Kohteet = tilan näkyvä kohta ulkoa (keittiön ikkuna, kappelin torni, laiturin lyhty…). Testit: dioraama-data.
  3. **Lämpimät ikkunat** kuoren hämärätekstuuriin (A:n "lämpimät ikkunat"): idea — kuori_hamara.py leipoo lisäksi
     POSITION + NORMAL -passit ja lisää lämpimän hehkun pystypinnoille valituissa rakennuslaatikoissa (pohjoisrakennus
     y ≈ 9 julkisivu, keittiön siipi, keskushalli, kappelin torni), kun valokuvan tekseli on paikallista keskiarvoa
     selvästi tummempi (ikkuna-aukko). Esikatselu tunnelma_kuva.py, vertailu A-kuvaan.
  4. **Repeämän siivous** B:tä varten: Kellotornin puolella leikkausreunaan jää fotogrammetrian sirpaleita (näkyi
     B:n vasemmassa laidassa, ks. luonnos B ennen rajausta). Selvitä, onko se kuoren sisäpintoja (siivous) vai
     leikkauksen muoto (Siirtosepän varjostin); B uudelleen kun kunnossa.
  5. C:n sisätilat eläviksi: hahmojen työanimaatiot ovat Siirtosepän/Pelikoodarin (henkilöt hahmot3d); minulta
     tulisija/kynttilä ainoana valona = hämäräatlas (kohta 1) + liekit.

## Tärkeät polut ja komennot
- Pelin repo worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-3` (haara linnanrakentaja-linna-3, uusin 896607af7).
  Rakennus: `nice -n 15 node tools/dioraama/rakenna.mjs olavinlinna` → dist/dioraama/olavinlinna; kopio
  `_valmiit/olavinlinna-blender/rakennus-sijoitettu.json`. Testit `node --test $(ls tests/*.test.mjs | grep -i dioraama)`.
- Luonnosrender: `leivo_tila.py … --kuori <normaali.glb> --leikkaa --hamara --hahmot [--lyhty vartija] --luonnos
  --kamera " x,y,z,kx,ky,kz" --renderoi` (kamera-argumentti välilyönnillä alkavana, koska miinus).
- Yleis/järvi-esikatselu: `tunnelma_kuva.py <kuori.glb> <hamara-4k.jpg> <tunnelma.glb> <atlas> <ulos> az kk d fov [kx ky]
  [--syttyneet 0.6]`.
