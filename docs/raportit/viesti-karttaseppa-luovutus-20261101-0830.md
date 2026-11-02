# Karttaseppä: luovutus 1.11.2026 klo 08.30 (KS local_740947d7)
Edellinen: viesti-karttaseppa-luovutus-20261101-0755.md (sen avoimet a–d tehty). Syy: konteksti 26 % (pehmeä raja).
P = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/`, C = `P/codex-pseudo3d/`.

## 1. TEHTY (0,5 m/px -lähitaso)
- JU vei 17/17 mediaan 07.55. NS mergesi lipun (juna-216 ead9e4835), käänsi ja kuvasi L1/L2 → PT. Kuvat ovat teräviä,
  LahiKorkeusM pysyy ennallaan.
- Proto-haarat piirros-lahitaso-216 ja -true-216 on puskettu natiivi-backupiin.
- Tuileries'n palatsin nimiö oli L2:ssa pyramidin päällä → proto `karttaseppa/tuileries-lahitaso-216` 136ed2af2
  (NostotKartalla.PiirrosPeitot: Louvren karikatyyrin ala on kaluste tälle nimiölle, ja yli 50 % päällä → häipyy).
  NS:llä merge, käännös ja L2/P2 PT:lle; PT kuittasi. **Nimiö jää** (omistaja 31.10. 08.22: ihme loistonsa aikana),
  PT kuittasi tämän 08.1x.

## 2. KESKEN: PARIISI G:N MUKAAN (omistaja 08.07 ja 08.1x, PT 08.12 / 08.1x / 08.2x)
**(A) Pääkohteet G:n kokoon**: `C/g-maamerkit-20261101/` (MUISTIO.md, aja.zsh, pari.py).
- G:stä mitatut kertoimet: Louvre ×1,4, Notre-Dame ×2,0, Sainte-Chapelle ×1,25, ja PT hyväksyi ne 08.2x.
  Notre-Dame on siirretty 200 m itään, jotta Sainte-Chapelle näkyy (G:n tapaan).
- kooste-1m.py sai ympäristömuuttujat KOOSTE_MAAMERKIT ja KOOSTE_SIIRTO (oletus ennallaan). Pari G:n rajauksella (lon 2.3215–2.3585):
  `pari-G-peli-g-koko.jpg` on lähetetty PT:lle 08.2x. PT hyväksyi koot jatkoon 08.3x. **Omistajalle EI tätä paria, vaan vain yksi
  yhdistetty pari: G | Codexin koepala + G-kokoiset maamerkit, samalla rajauksella ja zoomilla kuin G (PT 08.3x).**
- **Lopullisen parin mitta (PT 08.2x):** pyramidin kärki – ruusuikkuna yhtä monta pikseliä kuin G:ssä (428 px / 1280).
  Skaalatuilla maamerkeillä väli on noin 1272 m, joten rajaus on noin 3,8 km leveä (res 2: x 6487–10291, y 3205–5627,
  ensimmäinen pari.py:n kehys). Koepala (lon 2.3215–2.3585, 2,7 km) peittää vain keskiosan, joten reunat tulevat nykyisestä
  pohjasta tai rajausta tasataan. Notre-Dame ei saa leikkautua reunaan. Omistajalle yksi rivi: "Notre-Dame on siirretty
  200 m itään, jotta Sainte-Chapelle näkyy sen vieressä kuten G:ssä." 
- Uudet Codex-maamerkit tarvitaan vain 0,5 m:n tasolle (Louvre ≥ 2500 px, Notre-Dame ≥ 1650 px). Tilaus tehdään vasta,
  kun koko on hyväksytty. Muut maamerkit eivät ole G:n alueella, joten niitä ei ole skaalattu.
- Peliin vienti hyväksynnän jälkeen: koko kooste (1 m/px ja 0,5 m/px) + KOOSTE_PELI → JU.
**(B) Korttelien yleistyksen koepala**: Codex-tilaus postilaatikossa 0b4c84ce3 (v3; v1 4551726b3),
  `posti/karttaseppa-codex-pariisi-yleistys-koepala-20261101.md`. Toimitus tulee polkuun
  `proto-3d/_tyo/codex/pariisi-yleistys/pariisi-yleistys-koepala-v1.png`.
- Ohje: `C/yleistys-koepala-20261101/` (MUISTIO.md, aja.zsh). renderoi-g6.py sai yleistyksen säätimet G6_KADUT_POIS,
  G6_KATU_K, G6_SULKU, G6_TALO, G6_PIHA_SYV, G6_PIHA_MIN, saaren kasvatuksen G6_SAARI_KASVU/G6_SAARI_UOMA (Cité +70 m,
  uoma ≥ 30 m) ja tarkan vesimaskin G6_VESI_ULOS. Varmuuskopio: renderoi-g6.ennen-yleistys-20261101.py.
- **Kun koepala tulee:** tarkista SHA ja vesi (vesimaski postin kansiossa) → liitä päälle G-kokoiset maamerkit samoilla
  kertoimilla ja siirrolla. Koepala on 1,76 m/px; maamerkin leveys px = lev_m·kerroin/1,76, ja rajaus sekä
  px-muunnos ovat C/yleistys-koepala-20261101/aja.zsh:ssa. Sitten pari G | koepala → PT → KK → omistaja, ja kuittaus
  Codexille postilaatikkoon.
- Hyväksynnän jälkeen yleistys koko kaupunkiin: uudet ohjeet (ohjeet-1m.py ja ohjeet-05m.py samoilla G6_*-arvoilla) ja
  Codex-palat kokonaan uudelleen. **Kysy PT:ltä erät ja määrä ennen tilausta.**

## 3. MUUT
- Kooste-97-kk kumottu (PT 08.12), mutta 0,5 m:n palat jäävät runkoon koepalan hyväksyntään asti (ei purkua).
- Siivottavissa: `P/_muokkaa_*.py`, `P/*.ennen-*.py`, `C/tilaus-05m-…/vanha-36/`, `C/maamerkit-05m-koe/`.
- Postilaatikko-wt `/Users/Shared/Claude/wt/karttaseppa-postilaatikko` (haara seuraa origin/claude/postilaatikko).
