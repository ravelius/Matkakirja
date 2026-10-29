# Natiivi-UI: luovutus 29.10.2026 klo 23.14 (Postivahdin kova raja 36 %)

## Työ: Taihedianin halli havainnekuvan näköiseksi (juna 215)
Erolista 03/03b kohdat 1, 2 ja 5 (/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/erolista-aukio-03-03b-20261029.md)
+ PT 22.4x ovet. Rajat: mitat ja paikat pysyvät (omistaja 20.10. klo 07.30), muodot ja pinnat tasaisessa valossa (27.10. klo 10.56).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/halli-215/ (H alla), proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-halli.

## Valmis ja PT:n kuittaama (22.4x, 3bdf0ba90)
- Katto ja ovet: H/v3/g-taihedian-lod1.glb ja -lod2.glb (LR liittää pakettiinsa; LR:n v81 sisältää jo kaiteet-v2:n). Työkalut
  H/tyokalut/lod1_katto_lod0sta.py (katto ja V4_wood LOD0:sta) ja H/tyokalut/ovet_uv.py (ovien UV:t kaikkiin LODeihin: LOD0:ssa joka
  välin toinen kolmio venytti 1070:n vinoksi; keskiväliin V4_keskiovi 1269, UV 0–1). LR ajoi ovet_uv.py:n omaan LOD0:aansa (v79/v65)
  ja paaharja.py:n LOD1:een on ajettu v3:ssa (v3:n pääharjaa EI kuvattu pelistä).
- Kaiteet: aukion kamerasta g-jalusta on LOD0-etäisyydellä → terassilla C2:n kaiteet. g-jalustan C2-sarjan LOD1 (yli 25 m) korvattu
  osasarjan osilla (1061 → kaide-pylvas, 1062 → kaide-johde-1.5m), 1b15f5877. Johteen valkoinen nauha → LR korjasi sävyn v81:ssä.
- Kuvat: H/kuvat-pari5/ (03/03b ennen/nyt).

## Proto-haara natiivi-ui/halli-215 (pohja PK pelikoodari/osasarja-215 5c924489e), tarkista.sh 0 virhettä (3bdf0ba90 asti)
fd7c3a390 kaiteet jalustan LOD1:een · 1b15f5877 C2-LOD1 osasarjasta · 3bdf0ba90 V4_keskiovi sallittuihin pintoihin ·
b49275c00 kallistus (OsaSijoitus.Kallistus, kokoaja leikkaa y += k·x; Osasarja 9/9) · 51ee353a6 OsasarjaKaiteetKansio oletus
"kielletty-halli-kaiteet-v2/" (LR v81, PK:n kytkentä NUI:lle). Peili: peili/proto/natiivi-ui/halli-215-v73 (3bdf0ba90; force-push
vanhaan nimeen estettiin) → pushaa uudet commitit: git push natiivi-backup natiivi-ui/halli-215:peili/proto/natiivi-ui/halli-215-v73.
Junaan: SHA PT:lle ja NS:lle osasarja-215:n kanssa, kun portaat ratkaistu (tai ilman b49275c00:aa, jos PT niin päättää).

## Kesken: portaiden johteet (PT: "pari minulle")
- Ladonta H/halli-kaiteet-v3/ (H/tyokalut/halli_kaiteet_ladonta.py: porraspylväät = pylväät ilman 1062-paneelia, peräkkäiset → johde
  3D-polkuna; 222 porrasjohdetta). LR odottaa v3:a, sama sävykorjaus siihen.
- Pari 6 (H/ajo-pari-6.zsh, kuvat H/kuvat-pari6/) EI näyttänyt eroa: 03/03b:ssä jalusta on LOD0 (portailla C2:n omat kaltevat 1063-kaiteet),
  ja pakotetulla LOD1:llä (QA palatsi lodkerroin 0.5) jalustan LOD1-paketti ei näy lainkaan (ei v2:ssakaan). PT:lle kerrottu.
- Debug käynnissä: haara natiivi-ui/halli-215-debug 7893e868c (EI junaan): lokittaa "NUI-DEBUG kaiteet/lod" (renderöijät, layer, bounds;
  5 s välein jalustan LOD, isa/kaiteet activeInHierarchy, isVisible). Tulos H/ajo-debug.log → grep NUI-DEBUG
  proto-3d/lokit/esikatselu-<aika>/unity.log. Uusinta: H/ajo-debug.log:n komento (REF=7893e868c, kohta 03, ESIKOM kuten ajo-pari-6.zsh).
  Epäilyt: jalusta onkin LOD2 / paketti LOD1:n alla häivytetty tai piilossa / LOD1-olio vaihdettu latauksen jälkeen.
- Valmis = näkyvyysvika korjattu, pari 6 uudelleen (ennen 3bdf0ba90 + v2, nyt korjaus + v3) → PT; debug-haara pois.

## LISÄYS 23.2x: debug-tulos (ajo valmis, lokit/esikatselu-20261029-230738)
Jalusta on LOD1 (lodNyt 1), isa ja kaiteet activeInHierarchy True, mutta renderöijä isVisible False. Paketin bounds maailmassa
Center (2.90, 4.6, −426.7), Extents (74, 4.6, 134) → z −560…−293, kun kamera 03:ssa on (2.6, 5.2, −194.8) ja katsoo pohjoiseen (+z).
Paketti on siis ~450 m etelässä kameran takana: kokoajan/rakennan kehys tai siirtymä on väärin LOD1-paketissa (C2-korvaus näkyy oikein,
koska sen verkot ovat mallin omassa kehyksessä origossa ja paikka tulee instanssimatriisista). Seuraava askel: vertaa palatsiJuuren alle
rakennetun paketin paikkoja C2-palojen maailmapaikkoihin (palatsiJuuri.TransformPoint(S·p)) ja korjaa (todennäköisesti glTF→Unity
-z-käännös tai palatsiJuuren siirtymä puuttuu/tuplana). Tarkista samalla PK:n LataaOsasarja (sama polku), näkyykö se oikeassa paikassa.
