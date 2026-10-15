# Linnanrakentajan luovutus 15.10.2026 ilta 17.18 (Linnanrakentaja, Opus high) – PT pyysi (konteksti)

Edellinen: `viesti-linnanrakentaja-luovutus-20261015-iltapaiva.md`. Viestit AINA id:llä osoitekirjasta `/Users/Shared/Claude/osoitekirja.md`
(PT local_5df52e10…, Postivahti local_a24c43c0…, Valoseppä local_c238f4af…). PT:lle ≤ 3 riviä. OLAVINLINNA TAUOLLA.
Nollaus: tämä luovutus + push → Postivahdille "LUOVUTUS VALMIS <sha>".

## 1. LOUVRE – v2e viety 17.18, pari Valosepällä (→ PT)
Kaikki: `/Users/Shared/Claude/proto-3d/_valmiit/louvre-v1/` – LUEMINUT.md:n loppu kertoo versiot v1b…v2e (lue ensin).
Lähde `lahde/louvre.py` + `lahde/louvre_osat.py`, vanhat `*.ennen-v1c`, `*.ennen-v2`, `louvre.py.ennen-v2e`.
Ajo: `nice -n 15 /Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P lahde/louvre.py -- vie`
(cwd = louvre-v1; leikkaus + LOD0–2 + AO), renderöinti `-- renderoi` + LOUVRE_KAMERA=u,v,z,katse,kallistus,fov.
- TILA: PT hyväksyi v2d:n ja vei sen KK:lle omistajan nähtäväksi (17.1x). v2e (PT:n pyyntö): kupoli vaaleampi/kapeampi,
  julkisivun syvyys (pilasterit 0,5, listat, reliefit, veistokset ikkunoiden välissä), kiveys 8 m pehmeä + laikut.
  Valoseppä ajaa v2e-parin (kulma B) → PT. SEURAAVA: PT:n palaute v2e-parista → sitten Cour Carrée (Lescot, kolonnadi)
  ja Richelieun lohkon Rivolin julkisivun 5,5° vinous (LUEMINUT v1c).
- Pelikuvaparit: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/louvre1/louvre-v2*-pari-kulmaB.jpg`, mittaukset
  `HAVAINNOT-v2.md` (Valoseppä ajaa `kuvat-v2*.zsh` Julkaisijan simuvuorolla; paketoi _valmiit/glb:n omaan lv2*-kansioon).
- Kamerakulma B (PT hyväksyi): palatsin kehyksessä -150,0,32,0,4.9,47.6 = katse 110°, 5° alas, 32 m, 147 m pyramidista.
- Googlelle jätetyt (Pein tekijänoikeus / parempi): pyramidi + altaat + pienet pyramidit, Ludvig XIV:n ratsastajapatsas
  (AUKKO-lista; leikkaus pitää AUKKO-reiät koosta riippumatta).

## Opit (tärkeät)
- glTF-vienti leikkaa tekstuurin Mix-sävytyskertoimen ≤ 1:een → sävy leivotaan tekstuuriin (`lahde/tekstuurit/*_savy.jpg`).
  Muisti: gltf-savy-leivotaan-tekstuuriin.md.
- Sävyt sovitetaan VAIN pelikuvaparista (T = havaittu / vientialbedo, tavoite = Google / T); Blender-render valehtelee
  (kivi näyttää Blenderissä punertavalta, pelissä oikealta).
- LiDAR nDSM (`_tyo/linnanrakentaja/louvre/ndsm-kehys.npy`) paljasti isot virheet (Turgot/Mollien 26 m, Rivolin siipi 4,7°,
  Sully 30 → 20 m) → tarkista jokainen massa profiileilla ennen yksityiskohtia. Leikkauksen tarkistuskuva
  `esikatselu/v1c-leikkaus-lidar.png` (skripti scratchpadissa: rengas latlon → palatsin kehys nDSM:n päälle).
- Pari ajettiin kerran vanhoilla tiedostoilla (vienti ja paketointi limittäin) → kerro Valosepälle vientiaika ja pyydä
  paketoimaan sen jälkeen.

## 2. Valaan luuranko – Valosepällä (ennallaan edellisestä luovutuksesta)
Proto-haara `linnanrakentaja/valas-luuranko-195` @ b55630222, worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-valasluuranko`
(poista kun Valoseppä on ottanut haaran).
