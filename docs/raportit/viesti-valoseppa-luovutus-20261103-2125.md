# Valosepän luovutus 3.11.2026 klo 21.25

Syy: kontekstiraja 25 % (Raamattu 7.37), luonteva tauko: PT 21.2x "odota KS:n kuvia, levossa ei tarvitse ilmoittaa".
Edellinen: viesti-valoseppa-luovutus-20261103-2030.md (pysyvät työtavat -20261101-2124.md, -2220.md voimassa). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd ajaa ja ilmoittaa hakemiston).

## Tila
- pariisi-tyyli (natiivi-backup linssiseppa2/pariisi-tyyli, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k17) = **a1413d71c**
  (7e90b0bdd palaloki + NS:n K4-kertoimet d92b55063, KK: väliaikaiset; Kartta-testit 594/594, Unity kääntyy k7:ssä).
- 7e90b0bdd: komento `elavakartta loki 1|0` (jokainen näkyvän kartan elävä pala + lähde + ms lokiin) – diagnoosityökalu, jää.
- k6 8fc847bf4 (JU 20.45) ja k7 a1413d71c (21.08): yv2 60° + raivaus + K4 ok. TULOS: `$B/pariisi-tyyli/k{6,7,8}/TULOS.md`.
- **Sauma lon 2,351 RATKAISTU VS:n osalta**: k8 näytti sen myös tavallisella elävällä kartalla ilman koealuetta → Cesiumin tasovalinta
  Z14-rajalla 8298|8299, ei koealue. PT antoi NUI:lle (elävän kartan omistaja). Ei VS:n työtä.
- Notre-Damen nähtävyysalue **k2** (KS 20.4x, omistaja: liioittelu kuten G-kuva): `$B/pariisi-tyyli/nahtavyysalue-notre-dame/k2/`
  pohja + maski 1536 × 1024, 0,635 px/m, keskipiste 48.8545/2.3499, tekijä `k2.py <data> <ulos>` (Z17-palat ElavaKoe ELAVA_Z 17,
  ELAVA_ALUE 66385,45089,66397,45097 → puoleen; maski Seine Pont Neuf–Pont de Sully + saaret + rannat 150 m, HdV mustana).
  KS tilasi Codexilta e758cbac4; PT: hyväksytty muodoltaan, KS sovittaa värit 2029:n mukaan.
- **A2 kortteli k3** (KS/KK): saumaton harmaa 60°-korttelipohja 1254² 1,27 px/m, 5248 taloa: `$B/pariisi-tyyli/kortteli-a2-k3/`
  (kortteli.py <ulos> [siemen]; seinä 162 mallikuvan 176:n sijaan, jotta katto erottuu ilman reunaviivoja). KS tilaa Codexilta.

## SEURAAVAKSI (odottaa KS:ää, ei omaa jonoa)
1. KS:n kuvat → peliin: (a) ND k2 -alueen kuva: maaosa korvaa maskin alueen, yläosa (läpinäkyvä lisätila) pohjoisnaapureiden päälle;
   suunnittele esinekerroksen kuva pohjan koordinaatein (metatiedot notre-dame-k2-alue.json: z17_px_origo, z17_px_per_kuva_px) +
   raivaus maskista. NS tekee pääkohteille raivauksen nähtävyysalueen maskilla (NS 21.0x). (b) A2 kortteli k3 Codexilta →
   VERSIOT (`codex-pinnat.py`), julkisivu/katot pinnaksi, korttelikohtainen satunnaissiirto (riski 1), TyyliVersio yv3.
- Avoimet: seinän korkeus kapeilla kaduilla (riski 2), muste segmenteittäin (suorituskyky, iPad osa D), käännetty kartta,
  k5-laiteajo isolla iPadilla (JU, ea2d6912f-mittausten jälkeen).

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta. Rakettivideo tauolla. Juoksupelin valo ja taivas palatsiin
  yleiskäyttöisinä (omistaja 18.45), kun valo-erä alkaa. wt `proto-linssiseppa2-korjaus` poistettavissa, kun 99ebdaf89 junassa.
- PIL 13: `ImageDraw.floodfill` ei muuta `Image.fromarray`-kuvaa ilman `.copy()`:ta; isot MaxFilterit hitaita → numpy-laajennus (k2.py).
