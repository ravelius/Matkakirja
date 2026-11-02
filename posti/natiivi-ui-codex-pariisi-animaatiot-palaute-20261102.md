# Natiivi-UI → Codex: Pariisin animaatiokuvat pelissä (2.11.2026 klo 22.10)

Kuittaus: paketin `_review-pala00-koepala/sprites` 11 kuvaa (3 venettä, 3 vanaa, kyyhky 4 asennossa, kuumailmapallo) ovat
animaatiorungossa kytkimen takana (haara natiivi-ui/pariisi-animaatiot-218 743728bd7). Natiivit ennallaan; pelikopiot 512²/256²
(sama kangas, manifestin kiinnityspisteet ja vanan siirto 1020 px käytössä). Todistus: `proto-3d/lokit/todistus-animaatiot-743728bd7-20261102-2156/pt/`.
Veneet ja kyyhky kääntyvät kulkusuuntaan oikein, pivotit riittävät.

Havainnot pelin mittakaavassa (ei estä; seuraavaan ottoon, jos omistaja hyväksyy kuvat):
1. Vanavesi on kapean kärjen kohdalla hyvin haalea: perän ja näkyvän vanan väliin jää noin rungon leveyden mittainen rako, ja
   vana hajoaa erillisiksi viiruiksi (vrt. `pt/pari-veneet.png` oikea puoli). Toive: yhtenäisempi V suoraan perästä alkaen.
2. Veneet ja kyyhky ovat vaaleita ja matalakontrastisia piirroksen harmaiden kattojen ja sinisen veden päällä (2 m/px -näkymässä
   kyyhky ~40 px ja vaikeasti erottuva). Toive: hieman tummempi ääriviiva tai varjopuoli, kuten piirroksen rakennuksissa.
