# Natiivi-UI: luovutus 3.11.2026 klo 15.35 (Viimeisen keisarin nosto, versiorivin koontiaika; kontekstivahti 25 %)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1501.md.

## Tehty (proto, haara natiivi-ui/keisari-nosto, pohja 429b75faf, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-keisari,
## peili natiivi-backup peili/proto/natiivi-ui/keisari-nosto; unity-tarkistus 0 virhettä, kielivahti ok; EI SIMUA VIELÄ)
- **6119d4a12** Viimeisen keisarin nosto (PT 15.1x, omistaja 13.30): Tarinanostot.cs + Resources/Tarinanostot/viimeinen-keisari.json
  (KK:n teksti 14.0x, 9 väliotsikkoa, 5 Commons PD -kuvaa PT:n v2-listasta, havainnekuvat a–e varauksina tiedosto null).
  Nostokortti "tarina:<id>" (laji Hetki, väliotsikot + lähderivi kuten tietokortti, Edelle() loppukortin päälle), juoksupelin ☰-rivi
  (TarinaAuki → Tauolla; PK tarkisti: Puyi/ajastin/opetus seisovat, merge-tree PK:n haaroihin 0 konfliktia) ja loppukortin
  oma nappirivi. QA: ui tarina, ui juoksuloppu tarina. Tiedot: proto-3d/lokit/nui-keisari-nosto-6119d4a12-20261103/tulos.md.
- **6eeffaa57** versiorivin koontiaika (PT 15.5x, omistaja 15.31): Rakennus.BuildNumeroTiedostoon kirjoittaa Data/Raw/koottu.txt;
  MitaUutta.Koottu; kehittäjätilassa "v0.1.0 (0) · koottu 3.11. 15.19 · kehittäjä". JU:lle 15.3x c9ab58e88:n päälle.
- JU 15.25: yhdistelmä c9ab58e88 = eed17074d (429b75faf − 252c190dc + NS 7d122e1d1 + a141413c2) + 6119d4a12. 6eeffaa57 pyydetty päälle.

## SEURAAJAN JONO
1. Kun JU antaa uuden yhdistelmän SHA:n (c9ab58e88 + 6eeffaa57) ja SIMU NYT / KÄÄNNÖS NYT L<n>: skripti valmiina
   /Users/Shared/Claude/proto-3d/lokit/nui-keisari-pariisi-c9ab58e88-20261103/ajo.zsh (syntaksi tarkistettu, ei ajettu):
   `KAANNA_VAIN=1 zsh ajo.zsh <n> <SHA>` taustalla → VAPAA JU:lle → `SIMU_ODOTA=3600 SIMU_MUISTIRAJA=16 OHITA_KAANNOS=1 zsh
   /Users/Shared/Claude/proto-3d/tyokalut/simu-lukko.sh kaari Natiivi-UI yhteinen-iPad13 -- zsh ajo.zsh <n> x` taustalla.
   Tarkista: (a) paluu-pariisi kolme eri kohdetta eri suunnista + "otsikon varjo" -lokirivi (koko 0 → asettelu, opasiteetti 0 → Aja,
   kuva EI → tekstuuri); (b) t1–t8 keisarin nosto (kuva latautuu Commonsista, väliotsikot, lähderivi, loppukortin päällä, ☰-rivi);
   (c) t9 versiorivi koontiajalla. Jos KÄÄNNÖS ei käytä kehitysbuildia, versiorivillä ei näy koontiaikaa (Asetukset.Kehittaja).
   Tulos PT:lle 3 riviä; t9-kuva PT:lle (PT pyysi simukuvan valikosta).
2. Keisarin nosto kartalle Pekingiin (Mielenrauhan halli 39.91838, 116.39239) vain kehitysversioissa: karttavalo "tarina:viimeinen-keisari"
   KS/PK:lta, ei tehty (Raamattu 2.200: Peking muuten kiinni). Codexin havainnekuvat a–e: lisää tiedosto-kenttään, kun tulevat.
3. Avoimet 1501-luovutuksesta: GBR-loittonema (kysy PT:ltä, jos KK huomauttaa); video iPadilta; veneet joen keskiviivaa;
   animaatiokuvien ämpärivienti PT:n luvalla; Codexin vana-otto.

## LISÄYS 15.4x (JU): YHDISTELMÄ 1087abf41 = c9ab58e88 + ASTC 6a7af2d9d + 6eeffaa57
Simu tällä SHA:lla: `KAANNA_VAIN=1 zsh ajo.zsh <n> 1087abf41` (skripti kansiossa nui-keisari-pariisi-c9ab58e88-20261103, kansion nimi
vanha). JU lähettää SIMU NYT, kun NS:n 1b-simu vapauttaa L2:n. JU:n koontiaika.txt-ehdotus peruttu: 6eeffaa57 kirjoittaa koottu.txt itse.
