# Siirtosepän luovutus 12.10.2026 aamu ~07.00 (Opus 5.5, high)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Edellinen: viesti-siirtoseppa-luovutus-20261011-ilta2.md.
Linnahaara /Users/Shared/Claude/wt/proto-siirtoseppa-kello, haara **siirtoseppa/laituri-varoitus**, kärki **fa8fb26d1**
(= linnapaketti v48k c58921fcb9d82780 / nyky 0ed22c60646dbba2 + LS2:n keittiögrafiikka V3 + NS:n MetaHuman-materiaali 64ec7994f + botin korjaukset).
Pakettihaarat wt/proto-siirtoseppa-v47g: siirtoseppa/v47t … v48k (27c65bfc1 + nyky 13dd72d86). Kiinnitys: proto-3d/tyokalut/siirtoseppa-ajot/kiinnita-paketti.sh.
Olavinlinna junaan 183 (PT): **BOTTI 17/17 v48k:lla** (koostettu: täysi ajo 15/17 06.02 + uusinnat muuriportaat 06.24, sali 06.49; kaatumiset kuormaa).

## JATKOKOHTA
1. **LT:n 8. kierros** käynnistetty 06.57 (app proto-3d/lokit/olavinlinna-auto-1012-0645, A/B-osajako). Tulokset LT:ltä → löydökset korjattaviksi.
   Kun LT puhdas: **tunnus NS:lle** (linnahaara fa8fb26d1 / paketti c58921fcb9d82780) ja PT:lle.
2. PT: myöhemmät MH-erät (vain hahmoja) → botti 17/17 + pelikuvat, ei LT-kierrosta. Kuvat: skenaario mh-hahmot (poikki kavely katso <hahmo> 1.1 / 3.2).
   MH v2 -kuvat v48k: proto-3d/lokit/siirtoseppa-botti-v48k/mh-pelikuvat-v2/ (vartijoista ja vesipojasta puuttuu kasvokuva – partioivat).
3. Irralliset ajot: proto-3d/lokit/siirtoseppa-botti-<tunnus>/odota-ja-aja.sh (odottaa vahdin KÄÄNNÖS+VALMIS → botti A + B DBA3A288).

## YÖN OPIT
- Botin katseen kääntö kulkusuuntaan pitää palauttaa kuvan jälkeen (pysyvä kääntö toi jumin 55). Yksivärinen ruutu = vika vain silmä pinnassa
  (pisteet ja aloitus), musta aina. Kävelyraja 60 s (sali 72 ~34–39 s).
- Jumien juurisyyt olivat datassa: kaistaleveys < 0,9 m (NavMesh r 0,3), askelma 0,37 > 0,35 (16), holvi 2,2 m < kapselin 1,81 m + askel (55/61),
  näkyvä ilman törmäystä (harja). NavMesh-seinäkokeet (r 0,2 ja 0,3) heikensivät → pois. NavMesh: solu 0,05, korkeus 1,75.
- Perustaso 182:n v47f nykybotilla 7/17 (61 läpäisi v47f:llä → korjattu v48g/i).
- CC: height 1,75, radius 0,30, skin 0,03, step 0,35, slope 40.
