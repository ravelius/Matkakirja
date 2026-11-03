# Natiivi-UI: luovutus 3.11.2026 klo 15.01 (Pariisin loppurajaus, otsikon varjo; kontekstivahti 25 %)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1331.md (+ lisäykset 13.4x, 13.5x).

## Tehty (proto `natiivi-ui/saapumiskuvat-nousu-218`, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin,
## peili natiivi-backup peili/proto/natiivi-ui/saapumiskuvat-nousu-218; KOE)
- **374582ef4** Pariisin loppurajaus (KK 13.5x): SaapumisKuvat.TrailerinKuvat valitsee nousukokeessa 3 avauskuvaa, joiden paikat
  ovat keskipisteestä (PeliOhjain.SaapumisKeskipiste) tasaisimmin eri suunnissa (Invalidit+Eiffel olivat molemmat lännessä);
  KohteidenRajaus myös piirroskaupungille; RajauksenPaikat ilman trailerista pois jääneitä avauskuvia; Esittelypaikat: vara-json
  täydentää paketista puuttuvat kuvat.
- **c6c7cfd85** Sacré-Cœur (KS: 48.88665, 2.34336) vara-jsoniin (paketissa vain kohdepiste; KS:n esittelypaikat-PR tuo dataan).
- **e010ce48b** + **438c6c22b** (liikepoikkeus) otsikon tumma soikio (KK 14.2x): EI NÄKYNYT 3973f10b0-simussa (PT 15.1x).
- **a141413c2** soikio suoraan tyyleinä (TraileriLiike.UusiVarjo/Varjo, ei USS-luokkaa) + lokirivi
  "MATKAKIRJA ui saapuminen: otsikon varjo L×K (teksti …), opasiteetti …, kuva on/EI" 1 s näkyviin tulosta. JU:lle annettu
  seuraavaan yhdistelmään (yhdistyy 3973f10b0:n päälle). Syy ei selvinnyt ilman ajoa.
- Välisimu b39c1bc9a (L1) 14.06: lokit/nui-ks-kyltit-b39c1bc9a-20261103/ (tulos.md; KS:n p1–p8, l1–l2).
- PT 14.5x Montparnasse/Pompidou: EIVÄT 3D-malleja vaan maalattu piirroslaattoihin (haamu3-20261102) → Codex/KS;
  selvitys lokit/karttaseppa-pariisi-bigben-0c103c3a9-20261103/NUI-3D-MERKIT.md. JU perui pyynnön, ei NUI-committia.

## SEURAAJAN JONO
1. Seuraavan yhdistelmän simusta (JU kokoaa: 3973f10b0 + a141413c2 + muut): tarkista paluu-pariisi
   (a) kolme eri kohdetta eri suunnista (Eiffel vas., Sacré-Cœur ylä, Notre-Dame; lokissa "trailerin kuvat eri suunnista"),
   (b) otsikon soikio näkyy; jos ei, katso lokirivi "otsikon varjo" (koko 0 → asettelu; opasiteetti 0 → Aja; kuva EI → tekstuuri).
   Valmis skripti (intro-odotus NS:n mallin mukaan): /Users/Shared/Claude/proto-3d/lokit/nui-pariisi-rajaus-374582ef4-20261103/ajo.zsh
   (kopioi uuteen kansioon yhdistelmän SHA:lla; KAANNA_VAIN=1 JU:n vuorolla, sitten simu-lukko kuten ennen).
2. Avoimet 1331-luovutuksesta: GBR-loittonema trailerin jälkeen (kysy PT:ltä, jos KK huomauttaa); video iPadilta; veneet joen
   keskiviivaa; animaatiokuvien ämpärivienti PT:n luvalla; Codexin vana-otto.
