# Linnanrakentajan luovutus 13.10.2026 myöhäisilta (~21.3x) — TILINVAIHTO (PT 21.30)

Luovuttaja: Linnanrakentaja (Opus, high), konteksti ~33 %. Edellinen: `viesti-linnanrakentaja-luovutus-20261013-ilta.md`
(Olavinlinnan tila, työtavat; edelleen voimassa). **OLAVINLINNA TAUOLLA, PEKING CODEXILLA (ei mitään). Rodin-patsaiden pakkaus on LS2:n (ei sinun).**

## 1. Tila: Ranskan taidemuseo v2 → v2d (VALMIS, toimitettu)
Lähde `/Users/Shared/Claude/proto-3d/_valmiit/taidemuseo-ranska-v2/` (LUEMINUT.md: versiot ja avoimet; `lahde/ranska.py` → sali.json,
`zsh lahde/aja_v2.zsh` = sali.json → glb lod1/lod0 → leivonta → taivas → atlas-kuvat → mittaus, n. 6 min; ajo irrota.pl:llä).
| Versio | Sisältö | Tila |
|---|---|---|
| v2 | Rodinin puutarha (parterrit, ruusut, lehmuskujat, kartiot, aidat, puurivit), Hôtel Bironin julkisivu, taivas.glb (unlit, r 60 m), Mona Lisa keila 300 lx / 3000 K + leivottu seinäkeila 520 lx | PT OK, LS1 kytki (museo-maa-188 9fecfada9) |
| v2b | kehysten kulta 184/152/96 (LS1), louvre-mi-1448 pois (PT) | LS1:lle |
| v2c | vain sali.json: rp ev100 11 → 7,2 (simussa puutarha musta; shaderin kuva-arvo = ρ·E/π/(1,2·2^EV)) | LS1/LS2 |
| v2d | Helvetin portit → **Kolme haamua** rp-haamut (jalusta 2,2 × 0,4 × 1,6, paikka.y 0,35 = uppoaa 5 cm, katse +z, 2 × 5600 K), 2,6 m:n puksisyvennys (selkä piiloon, ≤ ~60°) | Paketti `_valmiit/taidemuseo-ranska-v2d-vienti-20261013/`; LS2 korjasi SHA256SUMS:n (sali-v2d.json pois paketista) ja kytki haarassa linssiseppa2/museo-ranska-rodin2 a29af6561 |

- Paketointi: `venv-rembg/bin/python -I lahde/paketti_v2.py <ulos> <versio>` (taivas.glb/jpg/astcm mukana). **sali-*.json EI pakettiin** (Julkaisija hylkäsi; skripti ohittaa nyt juuren .json:t) — toimita JSON erikseen.
- Rungon v2-muutokset (`runko/lahde/`): `puutarha.py` (aita, latvus, runko, kartio, ruusupenkki, puu; julkisivut), tasoprojektion UV-korjaus
  (`f.normal_update()`), `valot.py` korostus, `leivo_sali.py` kaukopintojen atlastiheys, `atlas_kuvat.py` taivas + ulkovalotus (650 lx = 1,0) + `TEOS_PAIKKA`-paikkamerkki.
- Rooliraja (LS2 13.10.): LR = sali.json, glb, esteet, atlas, Mona Lisa; LS2 = veistokset.json, kierros, patsaspaketti, simu; sauma = veistospaikkojen id:t ja sijainnit.

## 2. Avoimet / odottaa
- LS2:n simukuva Kolmesta haamusta syvennyksessä ja LS1:n mahdolliset uudet kytkentähuomiot → seuraava versio (v2e) vain niistä.
- Ei uutta erää ennen PT:n käskyä.

## 3. Aloitusviesti
```
Olet Linnanrakentaja (Opus, high) Matkakirja-pelissä. Checkout /Users/Shared/Claude/Matkakirja-linnanrakentaja, haara linnanrakentaja-tyo-20260929.
Aja git fetch origin. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linnanrakentaja-luovutus-20261013-myohaisilta.md KOKONAAN.
Ranskan museo v2d toimitettu (Kolme haamua); odota LS1/LS2:n huomioita tai PT:n uutta erää. OLAVINLINNA TAUOLLA, PEKING CODEXILLA.
Agentit vain Opus/Sonnet; skriptit tiedostoihin; yksi leivonta kerrallaan; ei poistoja.
```
