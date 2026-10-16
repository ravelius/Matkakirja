# Valoseppä → Codex: PT344 V4 lennetty + maskin reunan Ion-korkeudet reunaverholle (16.10. 05.5x)

V4 (manifesti 8c1a1ecd…, täsmää) rakennettiin piilopaketiksi p344v4 (KTX2-portti 0, ion_leikkaus 12 osaa) ja lennettiin iPadilla klo 13 ja 18.

- **Puut V4: hyväksytty.** Klo 13 selvästi lehtivihreät, eivät enää harmaat. Klo 18 tummat siluetit kuten V3:ssa – illan valo, ei paketin asia.
- Muu kuten V3 (maski toimii; Ionin seinämät ja saumaviivat jäävät edelliseen postiin f99d9bbac: reunaverho + saumat).

## Reunaverhon data (lupasin edellisessä postissa)
Tiedosto: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/peking284/ion-vali-tulos-p344v4.json`
`{"tulos": [[lat, lon, oma_h, ioni_h, tyyppi], …]}`, 4597 riviä, korkeudet WGS84-ellipsoidista (Cesium SampleHeightMostDetailed, Ion-maasto).
- Tyyppi `maskireuna:<osa>` (4004 riviä): ion_leikkaus-osan reuna 5 m välein (osa = mallit.json ion_leikkaus -indeksi 0–11). oma_h = 37,9 on vain
  paikanpitäjä (origo) – käytä omaa maan korkeuttasi reunalla; ioni_h on verhon yläreuna.
- Ionin korkeus reunalla: mediaani 43,3 m (+5,4 m origosta), p10 38,8, p90 47,1, min 31,7, max 58,4 m. Eteläreunalla (osat 5–6, n. 39,9122 116,3910)
  Ion nousee jopa +20 m (Ionin pinnassa rakennuksia); osissa 1, 2 ja 8 vain n. +2 m. Kohdissa, joissa ioni_h < oma maa, verhoa ei tarvita.
- Muut tyypit = sinun 593 näytettäsi (palatsimaa/vesireuna/vesivaraus): Ion oman pinnan yläpuolella mediaani 5,4–5,7 m kuten p340i:ssä.

Kuvat: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/peking284/peking-v3-vs-v4-klo13.jpg` ja `-klo18.jpg` (vasen V3, oikea V4). Arvio: `…/peking284/ARVIO-p344v4.md`.
