# Lavastajan luovutus 23.10.2026 (Opus, medium; tili vvi＠vvi.fi)

Edellinen: `viesti-lavastaja-luovutus-20261020-1925.md` (lisäykset 21.10. asti, f5d05219d). Sen ENSIN- ja jono-osat ovat yhä
voimassa siltä osin kuin alla ei toisin sanota (Codexin toimitukset odottavat). Lautaspino HOLD. PT:lle enintään 3 riviä.
Omistaja 12.26 (PT:n kautta): juoksupelin painopiste on grafiikassa, ei pelattavuusmuutoksia.

## Valmiit tällä vuorolla
1. **Studiojako B + C** (PT 23.10.): PR https://github.com/ravelius/Matkakirja/pull/5181 (e6e4bc617, haara lavastaja-studiojako,
   worktree /Users/Shared/Claude/wt/lavastaja-studiojako): `docs/tuotanto/tekotavat/3d-ja-kuvat.md`, `reseptit/museo.md`,
   `reseptit/3d-maamerkki.md`. Odottaa JU:n mergeä → sitten `tools/uusi-worktree.sh --poista lavastaja-studiojako`.
2. **Juoksupelin tavoiteluuppi k1b (PT hyväksyi 23.10.; havainnekuvissa 1,2–1,5 m kivimuurausta):** sokkeli 1,0 → 1,3 m kaikkiin
   muureihin ja seiniin; kivikerrat näkyviin (kivi.jpg 0,4 m:n kerrokset, laji 11).
   - kielletty-tausta-v18 (`peking_tausta.py` TAUSTA_SOKKELI_H, `aja_tausta_v18.zsh`, `pakkaa_tausta_v18.zsh`; SHA256SUMS e08e897e87f0)
   - avoimet-v15 (`avoimet_sokkeli.py` AVOIMET_SOKKELI_H=1.25 AVOIMET_SOKKELI_ULKO=1 v13:sta: vain ulkopinnalle, sisäpaneelit näkyviin; 540e11443759)
   - osamallit791-v6 (`osamallit791/kuoret_sokkeli.py`: 弘义阁-kuoren sokkeli 0,9 → 1,3 m, materiaali V4_sokkeli; 9f7ff6d4ee44)
   - paketit `pakkaa_k1b.zsh`; kaikki kolme ämpärissä (JU 12.03, 0 virhettä).
   - proto `lavastaja/sokkeli-k1b-210` **4ea7fec01** (pohja natiiviseppa/juna-210; worktree /Users/Shared/Claude/wt/proto-lavastaja-sokkeli-k1b):
     kansiot v18/v15/v6 + LattiaLaji: `V4_sokkeli*` → SokkelonPinta myös huoneissa ja kuorissa (ennen tasaväri). VS rakentaa k2:n päälle (6a95e2973).
   - Kuvapari PT:lle 12.5x: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/k1b-kuvapari-sokkeli.jpg`
     (havainne 810 01–06 | pelaajan kamera maasta; esikatselut lokit/esikatselu-20261023-1223 ja -1237; skenaariot samassa kansiossa
     sk-sokkeli-k1b*.txt). Puutteet: 05 porttikäytävän sisältä ei kuvaa (alku 13.2,-385 vei aukiolle), salissa kamera katon yllä;
     pelaajan kamera on havainnekuvia ylempänä, joten seinät näkyvät lyhyinä (kamera ei ole Lavastajan).
   - VS:lle "mittaa uudelleen" lähetetty 12.5x.
   - Ei tehty: läntisen kujan muuriaukkojen päätypilarit (kuori-lantinen-kuja.glb) ilman sokkelia.

## Kesken / seuraavalle
- Odottaa PT:n kuittausta k1b-kuvaparista → sitten NS:lle merge-pyyntö (lavastaja/sokkeli-k1b-210 4ea7fec01 → juna 210; VS:n k2 6a95e2973
  on sen päällä, joten NS voi ottaa molemmat kerralla). Testejä (tarkista.sh, Linssit) EI ole ajettu tälle haaralle: aja ennen pyyntöä.
- Esikatselun opit: komennot ui-komento.txt:hen vähintään 3 s välein (muuten edellinen korvautuu), peli auki ensin `ui juoksupeli v4 7`
  ja palatsin lataus, 25 s odotus juoksun alusta (latauskuva); ajo noin 6–13 min.
- **Tiedostojako VS:n kanssa (23.10.):** VS = varjostimet, valo, katot, pinnat (JuoksuLattia/Maailma.shader, JuoksuValo.hlsl, Valo/Taivas/Pinnat.cs);
  Lavastaja = glb:t + LattiaLaji/SokkelonPinta-rivit + Palatsi/Osamallit.cs:n kansiovakiot.
- **VS:n pyyntö:** pääharjan korotus geometriana omalla materiaalilla `V4_harja` (VS kytkee lajiin 13). Chiwen-päätteet ja
  eläinrivit = uudet koristemallit → Tripo Codexin kautta, omistajan lupa KK:n kautta (VS vie PT:lle).
