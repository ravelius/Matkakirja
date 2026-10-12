# Linnanrakentajan luovutus 12.10.2026 ilta (tilinvaihto, PT 19.3x)

Edellinen: `viesti-linnanrakentaja-luovutus-20261011-ilta.md` (JATKO-osiot 12.10. asti). Tämä kokoaa tilanteen.

## Pysyvät säännöt (12.10.)
- Omistajan toimia vaativa asia → Asemataulu: ArtifactData set, url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix,
  kokoelma "talo", doc_id "toimi-linnanrakentaja", data {rooli, kysymys (yksi rivi), ts}. Ei onnistu → Postivahdille "VAATII TOIMIA: …".
  Hoidettu → get + delete if_version.
- Omistajalle vain pelistä otettuja kuvia, TÄYDELLÄ TARKKUUDELLA (yksittäinen tai pari nykyinen | uusi natiivikorkeudella, merkintä
  isona alareunaan, JPEG 90). Blender-kuvat ja monen ruudun arkit vain PT:lle. Pelikuvat ottaa Siirtoseppä.
- Ali-agenttien ohjeisiin AINA: skriptit tiedostoon ja ajo tiedostosta (ei stdin-heredocia, ei python -c, ei zsh -c, ei evalia),
  ei rm:ää/poistoja (uusi tulostekansio per ajo), ei cd:tä, ei &&/;-ketjuja. (Lupakyselyt pysäyttivät omistajan 11.00–11.27.)
- Vapaasti lisensoidut (CC0, CC BY, PD) saa ladata; ei ostoja. Julkaisu vain omistajan pyynnöstä.

## Olavinlinna (juna 184)
Vientiketju: worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45k` (haara linnanrakentaja-linna-v45k), paketit
`_valmiit/olavinlinna-blender-v44` (1499) ja `-v44-nyky` (hahmot/ symlinkki v44:ään). Vientiskripti mallina `_valmiit/olavinlinna-kavely-v1/lahde/tyokalut-lr/vie_v48s.zsh`
(muut `vie_v48*.zsh` scratchpadissa /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linnanrakentaja/5ab64f62-6697-4edf-834c-735c7cfcf3d5/scratchpad/: paketointi → vie-blender.sh → commit/push → gh workflow vie-dioraama.yml osoitin=false → TULOS-tunnus) ; uusi versio = kopio, vaihda v48s → v48t (sed), ajetaan irrotettuna (perl setsid). Tunnukset Siirtosepälle (botti + pelikuvat) ja PT:lle.

| Versio | Sisältö | 1499 / NYKY |
|---|---|---|
| v48m | isoille esineille törmäys (tyokalut-lr/esine_tormays.py) | 5b6233733a9496db / 9bb1bf514e5bd5f4 |
| v48o | + keittiön tulisijan ja padan törmäys (esine_tormays.py VAIN_LISA=1 LISA=…) | 3e5e938d7957d540 / 33468a6d087b503f |
| v48p | + 1500-luvun väljät asut kaikille 11 MH-hahmolle + v48n-kevennys (mh_kevenna.py) | c09695d47f8023dc / d157042efd7826d8 |
| v48q | + vartijoille rautahattu ja keihäs/hilpari (ase-luu), portinvartijan avaimet, sileät kengät | d5afe736572c06bb / 5943527a63233fd8 |
| v48r | + vartijoiden housut takin alle, paljaat kädet, sileä kypärä | 9041e5d5d162dfee / c4b18baf3f7299c8 |
| v48s | + matala kettle hat, voudin kapeat hihat (KESKEN: vienti ajossa 19.3x, katso alla) | — |

- v48r:n pelikuvat (PT 18.5x): apulainen ja portinvartija hyviä; korjattiin v48s:ään kypärä ja voudin hihat. KAPPALAINEN kallistui
  pelikuvassa taaksepäin: agentti vertasi kaikki 11 v48o:hon (hahmot/ennen-v48p/) — leikkeet, luuranko ja pää tavulleen samat → kyse
  kuvaushetkestä/leikkeestä natiivissa, ei mallista. Pyydä Siirtoseppää kuvaamaan sama hetki kuin v48o:ssa.
- v48s:n tila: scratchpadin `vie_v48s.log` (KAIKKI VALMIS → TULOS-rivit). Jos loki puuttuu (uusi tili), tarkista worktreen git log
  ("Olavinlinna v48s") ja gh run list --workflow vie-dioraama.yml; tunnukset Siirtosepälle ja PT:lle.
- Asut: `_valmiit/linna-hahmot/vaatteet-v1/` (lahde/aja.py <id>, asut.py, vertailu.py, kokovartalo.py, vertaa_kaikki.py; lähtö
  metahuman-<id>-v1/glb = v48o:n MH v3). Paketointi: mh_kevenna.py → hahmot/<id>-mh.glb + vaatteet-v1/<id>/astc/*.astcm.
  Jäljellä pienet: niska kauluksen takana ≤ 8 mm eleissä, kengän kärki lahkeen yli kävelyssä 2 cm. Siivottava lopuksi: vaatteet-v1/tyo/
  testikansiot (deb, uusi, nyk, k*, k-*, vertailu-*, lahdekuvat, */ase-koe*.glb, paikkaa_*.py, *-arkki*.jpg).
- Botti v48k 17/17; v48p:n MH-tarkistus Siirtosepällä OK (11/11 latautuu, visemit, muisti ennallaan).

## Muut valmiit tänään (LS2 kytkenyt)
- Raketti v2 (`_valmiit/iss-raketti-v2/`): sahalaita = float-tarkkuus (origo maapallon keskellä) → LS2 siirsi origon; vaihe B (tekstuurit) 184.
- Karttamallit: `_valmiit/olavinlinna-torni-kartta-v1/olavinlinna_torni.glb` ja `_valmiit/iss-raketti-kartta-v2/iss_raketti_kartta.glb`
  (palettilaatat, Tyylikirjan värit); paletin säädöt vasta LS2:n iPad-kuvien perusteella.
- Keittiön koehuone (`_valmiit/olavinlinna-keittio-koehuone-v1/`): v3 (pata, paisti), v3b/ajo16 (halot, hiillos, tuhka; iPadilla OK),
  päivä paiva/ajo2 (LS2 kytkee kun PT pyytää). Vartaan liekkien väri = natiivin DioraamaLiekit (LS2).

## Jono
1. v48s-tunnukset Siirtosepälle ja PT:lle (ja kappalaisen kuvaushetki), sitten omistajan pelikuvat PT:n kautta.
2. PT:n/omistajan palaute asuista → v48t tarvittaessa.
3. LS1:n museopilotin mallinnusapu (holvikatto, Cuypersin listat), SK:n sisätilojen totuuskorjaukset (#4417), Pariisi v3c/v3d LS2:lla.
