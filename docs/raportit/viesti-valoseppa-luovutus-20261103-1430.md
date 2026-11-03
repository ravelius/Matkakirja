# Valosepän luovutus 3.11.2026 klo 14.30

Syy: konteksti (pehmeä raja 26 %). Edellinen: viesti-valoseppa-luovutus-20261103-1110.md (pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B alla = tämä kansio). Python:
`$B/tulivuoret/venv/bin/python -I`. Esikatselu ja laitekäännös vain JU:n "ESIKATSELU NYT L<n>" -viestillä; heti käännöksen jälkeen
"VAPAA L<n>" JU:lle, iPad-osuudesta "iPad valmis" erikseen. Ison iPadin palautusrunko on nyt **1420265d7**
(`/Users/Shared/Claude/proto-3d/lokit/julkaisija-laite-218-1420265d7/Matkakirja3D.app`), varmista JU:lta ennen ajoa.

## Tehty: KONTAKTIVARJON HINTA → k6 KUITATTU JUNAAN 218 (PT 14.3x)
- Haara **linssiseppa2/kontakti-218** (wt/proto-linssiseppa2-kontakti218): 836b12440 (k3 + oletus 0,8 × 1,3) → d76e2f552 (k4) →
  4864d0e24 (QA kalustemäärä) → ed5dbfe9e (k5) → **d68385bac (k6)**. JU vie haaran junaan; minulta ei toimia.
- iPad13-hinta GPU (B/kontakti218/tulos-ipad-k3.md, -k4, -k5, tulos-k6.md): k3 piha +4,6–10 ms, py +4, pch +17 → k6 piha +0,4–0,7,
  salit +0,1–0,5, 60 fps. Kevennykset: pallojen ja laatikoiden omat raja-alueet, pallot 4 r:n ikkunalla, muut hahmot ≤ 25 m,
  laatikot 8 × 8 solumaskilla (firstbitlow), sokkelilistat (< 0,55 × > 2,8 m) pois kalusteista. QA `valo kontakti 1 voima pk N`.
- Kuvapari k3|k6 kontakti218/pari-k3-k6.jpg (koe 458c289b2 = 218y + k6, haara linssiseppa2/kontakti-218y). Skriptit ajo-ipad-k*.zsh
  (laitekäännös laite-sha.sh + ipad-lukko + `ui lasi mittaa` ABAB + runko takaisin), ajo-k6-kaikki.zsh (käännös + Unity-pari + iPad).

## TYÖN ALLA: ISS-ilmiöt junahaaraksi (PT 14.3x: a), sitten b)
- **a) Haara linssiseppa2/iss-218 = 4acdf8c22** (natiivi-backup): merge 1420265d7 (juna-218-runko) + 53b918b3a (pimennys-aito =
  ketju tulivuoret a46f4180d…3be61a0e3, salamat aaf2af3b1…e90183d39, hurrikaani 0365a9668…94d09ff61, pimennys d3196b537…53b918b3a,
  tähdenlennot 0e062a128…bd3daf198, S2-sauma ed80de917). Yhdistys puhdas (ei ristiriitoja), EI vielä käännetty.
- SEURAAVAKSI: 1) tarkista oletukset junaa varten – kokeet olivat kytkimen takana (esim. salamat `_Aito` oletus pois, ks.
  aaf2af3b1): aidot kuvat oletuksena päälle, jotta juna näyttää kuitatun tuloksen (tulivuoret, salamat, hurrikaani, tähdenlennot;
  pimennys OletusLog 0 = lineaarinen kuten junassa). Oletusmuutos omaksi commitiksi iss-218:aan.
  2) Pari PT:lle: juna-218 (1420265d7) | iss-218 samasta rajauksesta kullekin ilmiölle (skenaariot: tulivuoret/viiva5, salamat-aito/sal9,
  hurrikaani-aito/hur3, tahdenlennot-aito/tl6, pimennys-aito/pim11 – kunkin sk-*.txt kansiossaan), vuoro JU:lta.
  3) Junaan vasta PT:n kuittauksella.
- **b) jälkeen:** salamoiden keijun oikean sivun suora pystyreuna → kevyt sivuhäivytys (PT 03.29), erillisenä kokeena.

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta, ei kuulu ISS-haaraan.
- Työlistan rivit päivitetty: kontaktivarjo (JU vie) ja ISS (kokeet kuitattu, junaan PT:n päätöksellä).
