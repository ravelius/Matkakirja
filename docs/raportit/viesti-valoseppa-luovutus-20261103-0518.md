# Valosepän luovutus 3.11.2026 klo 05.18

Syy: konteksti (pehmeä raja 26 %). Edellinen: viesti-valoseppa-luovutus-20261103-0413.md (pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`. Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python`.
Esikatselu vain JU:n "ESIKATSELU NYT" -viestillä (JU local_06f8c680…); ajo.zsh:ssä `PROTO_LINJA=2` → vaihda JU:n antamaan linjaan.
Proton haara: linssiseppa2/pimennys-aito (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-tulivuoret, natiivi-backup).

## Tehty tässä sessiossa
- **Hurrikaani VALMIS kokeena**: hur3 94d09ff61 KUITATTU (PT 04.5x). leivo.py-maski: lovi + laudan reuna kohinalla rikottu
  leveä häivytys (sarja4, kuvat ennallaan). Junaan aikanaan PT:n kautta muiden ISS-ilmiöiden kanssa.
- **Pimennys**: pim2: tummuus = lineaarinen penumbra (varjo pois → kirkas). 5493904d3: log-kuvakäyrä `PimennysKuva`
  (Pimennys.hlsl, globaali `_PimLog` oletus 0,003, säädin `pimennys _Log=x`) maalle (PimennysVarjo) ja Ilmakeha2:lle. pim3: 0,003
  lähinnä aitoa. PT: "suuri parannus, penumbra toimii"; ennen kuittausta (1) ydin lähes mustaksi, (2) koko 180–200 km.
  (2) mitattu pim3 pysty (0,30 km/px): ~178 × 300 km → OK (pituus = matalan auringon venymä). (1) ytimen sini = Ilmakeha2:n
  monisironnan hämäräosuus ei himmentynyt → **5a99783c6** (pim myös sille), EI VIELÄ NÄHTY.

## ODOTTAA JU:N VUOROA: pim4 (5a99783c6, pyydetty 04.5x)
`pimennys-aito/pim4/ajo.zsh`: aidon ISS071-E-5000:n rajaus (ISS nadir 44.1 N 61.7 W → kuvan keskus ~47.0 N 69.6 W: katse 33/38/28° alas
suunta 300°, siirra 47.0 -69.6, pois | päällä, hetki 77.45 ennen jokaista kuvaa) + `pysty-ydin` (vertaa pim3 pysty-log0p003: ydin
BGR 13/6/2 sininen). Aidon kuvan maamerkit: vasen ala Île d'Orléans (Québec), Saguenayn suu, umbra etelärannalla. Aito on pysty
(5504×8256, 28 mm: vaaka 46,4°, pysty 65,5°) → pelin rajaus = ruudun keskikaista 49,5 % (fov 66 = pysty), aito kierretty eri asentoon.
Sitten: pari aito | peli samasta rajauksesta + ydinpari PT:lle → kuittaus → sama ulkonäkö 12.8.2026:lle (pimennys kuun-varjo-2026).

## Jono 4 tähdenlennot (aloitettu, PT 04.5x: tee haku JU:n vuoroa odottaessa)
Tila: `_tyo/linssiseppa2/tahdenlennot-aito/LOYDOS.md` (Gateway feat=meteor = kraatterit; ISS028 13.8.2011 yösarjat 24799–24915
small-arkeissa ei selvää juovaa; 24600–24700 puuttuu Gatewaysta). Seuraavaksi siellä kuvatut vaihtoehdot (a) Garanin kuvan
kehysnumero tai (b) large 24799–24866 + juovahaku vain taivas/ilmahehkukaistalla. Levy: raja 15 Gi, ei yli ~300 Mt erää.
