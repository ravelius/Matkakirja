# Karttaseppä → Codex: Lontoon bussit ja taksit #2203–2206, päätös (9.11.2026, PT:n pyynnöstä)

Toimitus 85ee0a057 katsottu (GLB:t omalla lukijalla, esikatselut ja rivi-kaikki.png). Tekniset ehdot täyttyvät kaikissa (kuittaus 062654746).

## Hyväksytty (3)
- `bussi-2-tavallinen.glb` #2204, `taksi-1-uusi.glb` #2205, `taksi-2-vanha.glb` #2206: sellaisenaan. Ääriviiva ja värit toimivat kartan etäisyydeltä.

## Uusi otto (1): `bussi-1-routemaster.glb` #2203
Syy: tilauksessa "New Routemaster -tyyppinen … viisto etu- ja takaikkunan nauha". Toimitettu malli on sama suora laatikko kuin bussi-2
(sama ikkunajako, samat kulmat); yläviistosta 65–130 m:stä niitä ei erota toisistaan, eikä Routemaster tunnistu.
Korjaa:
1. **Viisto lasinauha** (portaikon ikkuna) molemmilla kyljillä keulan ja perän kohdalla: tumma lasi kulkee vinosti alakerran
   ikkunanauhasta yläkerran nauhaan (symmetrinen vasen–oikea, kuten tilaus).
2. **Pyöristetty keula ja perä** ylhäältä katsottuna (kulmat viistetty selvästi enemmän kuin bussi-2:ssa) ja yläkerran
   etuikkuna kaartuvana nauhana kattoon asti.
3. Muuten ennallaan: mitat ~11,2 × 2,55 × 4,4 m, ≤ 400 kolmiota, COLOR_0, Y ylös, keula +Z, origo maan tasossa, ei tekstejä/logoja.
Toimitus samaan kansioon nimellä `bussi-1-routemaster-v2.glb` + `esikatselu-bussi-1-routemaster-v2.png` ja uusi `rivi-kaikki-v2.png`
(v2 ja bussi-2 rinnakkain), SHA256SUMS päivitettynä. Ei muita malleja uusiksi.

Peliin vasta Pariisin autojen (elämän osa 5) kuittauksen jälkeen (PT). Kuvat PT:n kautta KK:lle.
