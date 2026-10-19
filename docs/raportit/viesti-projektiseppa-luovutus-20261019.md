# Projektiseppä (ent. Siirtoseppä): luovutus 19.10.2026 klo 17.18

Rooli: Projektiseppä (Opus, high), kansio /Users/Shared/Claude/Matkakirja-siirtoseppa. Projektina on Olavinlinna, joka on **TAUOLLA omistajan päätöksellä 19.10. klo 17.05** (PT). Tauon aikana linnaan ei tehdä uusia eriä, käännöksiä, simuja eikä Codex- tai Tripo-tilauksia.
Muisti: memory/projektiseppa-tila-20261019.md.

## KÄYNNISSÄ LUOVUTUSHETKELLÄ
- Ei mitään. Omia käännöksiä, simuajoja tai testisarjoja ei ole käynnissä, eikä mitään tarvitse irrottaa. Julkaisija poisti 6963950c3:n käännösjonosta klo 17.09.

## ENSIN seuraajalle
1. Ilmoita PT:lle yhdellä rivillä, että olet aloittanut ja levossa, kunnes PT antaa uuden erän. Jos jono on tyhjä, rivi on "JONO TYHJÄ: Projektiseppä".
2. Linnaan ei kosketa ennen kuin PT purkaa tauon. Jatko on kirjattu tiedostoon docs/raportit/olavinlinna-valmiiksi-lista-20261019.md osioon 6 (main fa9fc11da).

## Tehty tänään 12.1x–17.1x (proto-haara projektiseppa/linna-botti-10, worktree /Users/Shared/Claude/wt/proto-projektiseppa-linna-botti, peili natiivi-backup peili/proto/projektiseppa/linna-botti-10 = a78533229, EI mergetty)
- 7254653e5: pakon reittipisteet 0,35 m:n tarkkuudella ja jumissa paluu edelliselle pisteelle. Botti ajettiin simulla (käännös 586c9f105): 10/10 tekoa ja tyrmä 3/3 LÄPI.
- 80b591b06: botti kiipeää tikkaat kuten pelaaja (junatarkistuksen jumi 88).
- 2e3990d00: köysilasku pysyy irti törmäysmallista. Botti ajettiin simulla (käännös 82d984f28): osa-ajo 51/51, jumit 0, 10/10 ja tyrmä 3/3 LÄPI, ja PT kuittasi tuloksen. Videot ovat kansiossa proto-3d/_tyo/siirtoseppa/linna-botti-2e3990d00/.
- 6963950c3 (EI ajettu): köysilasku pysyy irti myös näkyvästä kalliosta (NakyvaSade), ja botti kirjaa kameralokin joka otteelle. PT:n videohavainnot ovat vielä todistamatta: kamera kallion sisällä ja maisema ylösalaisin. Arvioni: ylösalaisin näkyvä kuva on järven heijastus.
- a78533229 (testit EI ajettu): Lavastajan v49b on kiinnitetty (pala a36f4199985ef096, esittely 9c0897bec9044c1f, piste 86 irti tikkaista), ja kultaiset tiedostot on tehty paketista.
- Ajoskripti proto-3d/tyokalut/siirtoseppa-ajot/ajo-botti-pelaa.zsh: video käännetään transpose=1:llä ja koodataan h264_videotoolboxilla, koska simun iPad-tallenne on pystyssä ja tallenteessa voi olla aukkoja.
- Levystä vapautui ~1,5 Gi (vanhat appit 0f6bb529f ja 1286d90ed sekä vanhat todistuslokit).

## Avoimet (muiden roolien työ)
- Junatarkistuksen botti-osat.sh ei lue "botti: pelaa tyrma" -rivejä → Työkaluseppä (PT tietää).
- Komeron tiilet leijuvat, koska muurin täyttö puuttuu. Ne korjautuvat Codexin huone 9 -geometrialla (Lavastaja).
- Tripo-pilotti ja Codexin huoneet 6–10 odottavat tauon purkua.
- Pääsäikeen jumit (konsoli hiljaa 19–46 s) ovat ympäristön aiheuttamia: varjostimen käännös simussa, GPU-odotus ja kuorma. Ne eivät ole pelilogiikan vikoja.
