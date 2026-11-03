# Valosepän luovutus 3.11.2026 klo 07.29

Syy: konteksti (pehmeä raja 26 %). Edellinen: viesti-valoseppa-luovutus-20261103-0556.md (pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B alla = tämä kansio). Python:
`$B/tulivuoret/venv/bin/python -I`. Proto: worktree /Users/Shared/Claude/wt/proto-linssiseppa2-tulivuoret, haara
linssiseppa2/pimennys-aito (natiivi-backup), kärki **bd3daf198**. Esikatselu vain JU:n "ESIKATSELU NYT" -viestillä, L2, ja
heti valmistuttua "VAPAA" JU:lle. Taustalla ajettu esikatselu kuolee nollauksessa → tarkista ajo.log.

## OPPI: rajaukset aina ERILLISINÄ ajoina
`astro kyyti siirra` säilyttää EDELLISEN näkymän ilmansuunnan → saman pelin toinen skenaario saa eri suuntiman (tl2 93° eikä
30°, pim6 282° eikä 296°). Yksi rajausskenaario per esikatseluajo; useampi ajo samalle vuorolle peräkkäin (sarja-*.zsh).

## Seuraavaksi: UMBRA (PT 07.2x: mittaa ensin, sitten päätös koko vs valotus, pari PT:lle)
- Aito ISS071-E-5000 (Nikon Z9, 28 mm FX = 65,5° × 46,4°), 19.34.42 UTC = pelin `hetki kuun-varjo-2024 77.45` (täsmää).
  ISS:n nadir 44,1 N 61,7 W (haku/pyyhkaisy.txt). Sarjan arkki haku/arkki-s0.jpg: kamera jyrkästi alas, horisonttia ei
  koko sarjassa (paitsi 3700); 5250–5450 Fundyn punaiset tasanteet → 5000:n keskus ~46,0 N 66,0 W, katse ~47° alas,
  suuntima ~303°. pim4–pim8:n Québec/Île d'Orléans -tunnistus oli VÄÄRÄ.
- pim9 (aidon ISS-paikasta, katse 33/36/40): pelin varjon keskus 46,51 N 67,15 W, umbra ~200 × 300 km ellipsi; aidossa tumma
  alue ≥ 400 km (5150–5200 lähes koko kuva musta). Fysiikka: kiinteällä valotuksella pikseli < 40/255 kun peitto > ~97 %
  (~100 km umbran reunasta) → aidon tumma ala ≈ umbra + 2 × 100 km. Hypoteesi: koko oikein, penumbran tummennuskäyrä
  (Pimennys.hlsl PimennysKuva, _PimLog 0,003) liian loiva kaukana reunasta.
- **pim10 VALMIS AJOON**: `$B/pimennys-aito/pim10/ajo.zsh` (bd3daf198): katse 44/47/50, siirra 46,20 −66,30 | 46,00 −66,00 |
  45,85 −65,75, suunta 174, kukin varjo päällä | pois (maamerkit kohdakkain). Vuoropyyntö JU:lle EI vielä lähetetty.
  Pari: `skriptit/pari.py large/5000.jpg <peli.png> 1x0.896 pim10/pari-X.jpg 90`. Mittaa: tumman alueen (< 40/255) leveys
  km:nä pelissä vs aidossa (maamerkeistä), ja penumbran kirkkausprofiili umbran keskeltä ulos (päällä / pois -suhde).
- Sitten ehdotus PT:lle: koko vai valotus (todennäköisesti _PimLog / käyrän muoto), pari ennen|jälkeen.

## Tehty tässä sessiossa (kaikki JONO.md:ssä)
- Sauma ed80de917 KUITATTU (PT 06.3x).
- Tähdenlento tl2–tl6: tl6-b e49ac8999 KUITATTU kokeena (PT 07.2x); bd3daf198 vana hieman magentampi (PT: ei uutta paria).
  Pituus 4,2° (aito 4,4°): ruutu 125→80 km, satunnaiset 110–125 → 78–92 km; halo 0,05/10; sivuhehku 0,12; _Ohut 14; _Hehku 1,2.
