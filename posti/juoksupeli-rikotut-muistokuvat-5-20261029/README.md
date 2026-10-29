# Codex → Pelikoodari ja KK: viisi uutta esinevastaavuuden muistokuvaa

Lähde: `pelikoodari-codex-rikotut-muistokuvat-5-tilaus-20261029.md`, b340dd4738ea65186140f822bd985da0c9fee1b6, tehtävät #1237–1241.

Toimituskansio: `posti/juoksupeli-rikotut-muistokuvat-5-20261029/`.

Viisi kokonaan uutta valokuvallista 768×1024 RGB JPEG -ehdokasta. Jokaisessa on käytetty kuvareferenssinä täsmälleen saman id:n A-renderiä aiemmasta toimituksesta 459f75c54. Vanhat kuvat ja alkuperäiset generointitiedostot on säilytetty; muita yhdeksää muistokuvaa ei muutettu.

- `posliinimaljakko.jpg`: valkoinen maljakko, kapea kaula, levitetty suu, harvat siniset kukka-/lehtivyöt ja ohuet siniset rajaukset; vaalea jalusta palatsisalissa, ei ihmisiä.
- `lakkarasia.jpg`: punainen pyöreä matala rasia, leveä kukkareliefi kannessa ja harva lehtikoristelu kyljissä; vanha mantšuasuinen nainen esittelee rasiaa. Uusi korjausmääräys ohittaa vanhan kuplatekstin mustan värin.
- `jadeastia.jpg`: vaalea vihreä avoin kulho matalalla jalalla, kaksi rengaskahvaa; ei kantta tai suitsutusastian osia.
- `kello.jpg`: sininen taustalevy, pyöreä kellotaulu, kultaiset pylväät, yläosan renkaat/nupit ja suorakulmainen porrasjalusta.
- `kaaretaulu.jpg`: leveä vaakarulla kahden punaruskean pylvään välissä, kahdella lattiajalalla, sama paperin kaareva yläreuna ja kirjoitusasetelma. Ei pystyrullaa tai seinäripustusta.

`arkki.png` näyttää jokaisen A-renderin ja uuden muistokuvan vierekkäin. `QA.json` ja `SHA256SUMS` sisältävät tarkistukset ja tiedostojen yksilöinnin; `prompts/` sisältää valittujen kuvien täydelliset promptit. Kuvat tuotettiin sisäänrakennetulla image_gen-työkalulla kokonaan uusina ottoina. Niihin ei tehty osittaisia korjauksia tai päälle liimattuja esineyhdistelmiä. JPEG:t ovat suorakaiteita ilman leivottua soikiota. Nykyisen lähdekoodin soikiohäivytys tarkistettiin myös erillisessä staattisessa esikatselussa; se ei ole pelin runtime-testi.

## Vain arviointiin — ei pelikytkentää vielä
PK vastaanottaa tiedostot, KK tarkistaa, ja peliin nämä viisi menevät vasta omistajan valinnan jälkeen. Tämä toimitus ei ole omistajahyväksyntä tai julkaisu eikä muuta aiempien kuvien peliversiota. Aiempien A-kuvien ja kahden B-kuvan käyttöönotto on PK:n ilmoittama tila; tästä korjauserästä ei ole tehty runtime-kytkentää.
