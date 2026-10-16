# Valoseppä → Codex: Peking p340i – Ion-maski toimii, Ion on oman maan yläpuolella → reunaverho (16.10. 05.3x)

Lennetty piilopaketti p340v3i (PT336–340 v3) pelin uudella Ion-maskilla (kaikki 12 ion_leikkaus-osaa), iltavalolla ja Ion-välin mittauksella, klo 13 ja 18.
Pelin haara on kuitattu junaan 196.

- **OK:** palatsin pihoilla ei enää Ionin taustakuvaa, vedet näkyvät; illalla maa, muurit ja katot samassa valossa; puut vihreämmät kuin v3:n ensimmäisessä testissä.
- **Ion-väli (593 näytettäsi, ion-naytteet.json):** 579/593 alle 0,30 m; Ion on oman pinnan **yläpuolella**: mediaani −5,43 m, pienin −16,37 m
  (palatsimaa 39,915085 116,391867: oma 37,14, Ion 53,51). Vesireuna-maa pienin −11,47 m.
  Arvio: korkeusjärjestelmä on kunnossa (oma maa ≈ 45–47 m merenpinnasta geoidilla −9…−10 m, kuten Kielletty kaupunki);
  Ionin maasto on Pekingissä pintamalli (rakennukset/puut mukana) – ero vaihtelee ja on suurin hallien kohdalla. Pelistä Ionia ei voi laskea.
- **Näkyvä seuraus A – seinämät:** maskin reunoilla Ionin laatan kylki näkyy venyneenä pystyseinämänä.
- **Näkyvä seuraus B – saumat:** pihan maassa ohuita suoria viivoja (klo 18 vaaleat, klo 13 tummat) – laattojen välinen rako, josta näkyy läpi
  (ennen maskia Ionin maa oli alla eikä rakoa huomannut).

## Pyyntö
1. **Reunaverho** oman maan ulkoreunaan maskin (ion_leikkaus) rajalle: kaista, joka nousee oman maan tasosta Ionin korkeuteen ja peittää seinämän
   (pinta/väri kuten muuri tai maa). Ionin korkeudet reunalta mittaan seuraavalla ajolla: maskin 12 osan reuna 5 m välein (4004 pistettä,
   `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/peking284/ion-naytteet-reuna.json`) → tulos `ion-vali-tulos.json` [lat, lon, oma, ioni, tyyppi]
   lähetetään sinulle heti kun ajo on tehty. Voit aloittaa verhon geometriasta jo nyt; korkeudet tulevat datana.
2. **Saumat:** sulje laattojen väliset raot oman maan reunoilla (päällekkäisyys tai yhteinen reunaverteksi).
3. Ion-välin ehto "oma ≥ Ion + 0,30 m" ei ole tässä kaupungissa saavutettavissa nostamatta omaa maata – älä nosta; verho korvaa sen.

Kuvat: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/peking284/p340i-klo13.jpg`, `p340i-klo18.jpg`, `p340i-klo18-ion-seinamat.jpg` (rajaus).
Arvio: `…/peking284/ARVIO-p340i.md`. PT344 V4 (vihreämmät puut) kuitataan ja lennetään erikseen.
