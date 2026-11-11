# Valoseppä: luovutus 11.11.2026 klo 14.15

Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree k33 =
`/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, nyt haarassa `linssiseppa2/elava-muste` 1efd29cb4, puhdas ja pushattu. Kuvat ja ajot vain JU:n
vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; JU
`local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; NS `local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870`. Suunnitelma
Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saumat-ja-maet.md (osat 3 = työ 1, 4 = työ 2).

## TYÖ 1: RINNEVARJON HÄIVYTYS – HYVÄKSYTTY, JUNASSA
05065cf0e (haara linssiseppa2/rinnevarjo-haipyy). KK 14.06 hyväksyi (oletus päällä) → JU MR69 → 224.75 MR68:n jälkeen, lähtee PT:n pt-ok:lla.
Todiste lokit/linssiseppa2-rinne-2-05065cf0e (pilvet pois): ei porrasta, Montmartre koskematon, piirto pois 69/69 ms, päällä 65/66 ms.
rinne-1:n parit kelvottomia (pilvien liike 20 s:n välein) → opittu: Mac-pareihin aina `komento karttapilvet 0`.
KK: Île Seguinin joen suorakaide, r7:n vaakareuna ja r8:n terävä/pehmeä raja = sauma E, ei työtä, älä korjaa. iPad vasta KK:n erässä osien 1–3 jälkeen.

## TYÖ 2: MUSTE JA KUITU ELÄVÄÄN KARTTAAN – KOODI VALMIS, MAC-AJO JU:LLA
1efd29cb4 (linssiseppa2/elava-muste, pohja juna-224 fe1620cf0), koe, oletus pois.
- Shaders/Cesium/ElavaMuste.hlsl (File-funktio, GUID 7d2ec2f0137e429299f7cddf66744a84) raster-alikaavioon näytteen ja MatkakirjaSekoituksen
  väliin; vain paikka 0 (elävä kartta, NS) saa syötteet mustePos (Absolute World) ja musteSaato (= _elavaMuste). Avainsana _ELAVA_MUSTE
  (multi_compile, globaali, fragmentti) pois = näyte sellaisenaan.
- Lahde~/elava_muste.py: sama lisäys generaattorissa (tee_tileset.py kutsuu) ja valmiiden kaavioiden paikkaus (luku+kirjoitus tavulleen sama).
- Kartta/ElavaMuste.cs, komento `elavamuste paalle|pois|tila|vahvuus v|vaalea ala yla` (oletus vahvuus 0,65, vaalea 0,55–0,65 lineaarinen luma;
  elävän kartan katu ~0,70, paperi ~0,74, katot ~0,29).
- ODOTTAA: JU Mac-ajo `_tyo/linssiseppa2/elava-muste/sk-mac-muste-1.txt` → `lokit/linssiseppa2-muste-1-1efd29cb4`: parit ND lähin, 1 km kallistettuna,
  5 km (pitää olla ennallaan) + kehysajat 15 s pois/päällä ×2. Tarkista ensin Shader error -rivit (File-tyyppiä ei ole projektissa ennen).
- ODOTTAA: NS katsoo diffin ennen junaa (NS:n ehto).
- Sitten: karkea pari KK:lle ensin (täysikoko + rajaus), PT kopiona. KK päättää; ei omistajalle kokeena. Jos mustetta ei synny lainkaan,
  harjanteen vaste (A v2 tehtiin piirroksen viivoille) ei osu elävän kartan reunoihin → säädä vaalea/raja komennolla ennen koodia.
- Riski: magnifioitu karkeampi laatta latauksen aikana voi saada mustetta hetkeksi (portti on tekselikoko, ei taso).

## Muu
Maa A (8693823d2) SEIS. Pilvivarjo 51e33fb4f MR66 → 224.72. Kynä v4 MR63 (224.70). Vesitäyttö 0829caa4e JU:lla ennallaan.

## LISÄYS 14.2x
- JU: muste-1 jonossa (Mac) → lokit/linssiseppa2-muste-1-1efd29cb4, rivit vs-pyydetyt-rivit.txt.
- NS katsoi 1efd29cb4: OK junaehdokkaaksi, kun muste-1-pari katsottu ja unity-tarkistus 0. File-lähde, avainsana ja pois = ennallaan oikein.
  KERRO KK:LLE junaehdotuksessa: multi_compile kaksinkertaistaa tileset-varjostimen fragmenttivariantit (käännösaika ja varjostinmuisti kasvavat jonkin verran).
