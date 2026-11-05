# Natiivisepän luovutus 5.11.2026 klo 14.57 (konteksti 27 %, pehmeä raja, 7.37)

Täydentää luovutusta -1438 (lue se loppuun asti lisäyksineen, sen vika 1:n ja vika 2:n tiedot pätevät). Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta. Raamatun kohtaa 2.215 ei 14.48 löytynyt origin/mainista; omistajan sanat ovat -1438:n lisäyksessä 4.

## 90° kallistus: koodi valmis, EI nähty ajossa
Haara **natiiviseppa/kallistus-90-219 ca88b1830** (pohja runko d5850ff4e), työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto. Peili natiivi-backup peili/proto/natiiviseppa/kallistus-90-219. Testit `Kartta-testit/kaanna.sh PariisiKallistus` 9/9, Karttavalo 19/19, tarkistus 0 virhettä. tarkista.sh muuttaa kolme tyylikirjatiedostoa: git restore.
- Uusi `PariisiKallistus.cs` (puhdas laskenta). Alue: täysi 14 km:iin keskustasta ja 25 km:n etäisyyteen, nolla 30 km:ssä ja 60 km:ssä; raja liukuu muun kartan rajaan, joten hyppyä ei pitäisi tulla.
- `PalloKierto.LaskeAsento`: raon alittuessa Pariisissa kallistus ei pienene, vaan katsepiste ja silmä nousevat yhdessä. Rako 100 m tai 5 % etäisyydestä (6,6 km → 330 m). Maastonäyte pehmennetty 0,4 s:n aikavakiolla, jotta silmä ei hypi. Ennen ensimmäistä näytettä maasto on 0, joten silmä voi hetken olla liian matalalla: katso kuvista.
- `Aurinko`: sumun raja vaakatasossa vähintään 22 km, alku 60 % lopusta (siirtymä 55–85°). Horisonttiusva.Sumu ei kelpaa 90°:ssa (malli olettaa silmän maahan).
- Ruudun usva kartan tahdissa NUI:n ehdotuksesta: `RuutuRajaY` ja uusi `RuutuLiuku` kartan sumusta (`PariisiKallistus.RuutuUsva`). Karttataivas lukee samoja arvoja.
- Komento `kallista N` sallii nyt 90.
Valintani, omistaja ei ole nähnyt: 100 m ja 5 %, usvan 22 km. Varjokamera (saumakorjaus) on yhä pois ≥ 20°:ssa: kuuluu loppumittaukseen, ei korjata nyt (PT).
Avoin, EI testattu: panorointi ja nipistys 90°:ssa (Kierra skaalaa korkeudesta, ei sormen alta), napautus taivaalle, 3D-mallin läpi meno. Piirros on näkyvissä vain alle 1°:n kallistuksella ja palauttaa kartan suoraksi kerran lähennystä kohden (omistaja 2.11., PiirrosKerros, ei muutettu), joten kuvissa näkyy striimikartta.

## Rajapinta NUI:lle
Sovittu viestein 14.57, NUI:n kuittaus auki: nimet lukevat `Horisonttiusva.Peitto(yYlhaalta)`, oma funktio ei tarvita. Lisäksi `PalloKierto.VaakatasoOsuus`, `HorisontinRuutuOsuus()`, `SilmaMaanYllaM`. Pyysin antamaan Peitolle nimen maapisteen, ei kyltin y:tä. NUI odottaa haaraa ja sha:ta: lähetetty.

## JU:n jono (vahvistettu 14.5x, välissä KS)
1. liiku d5850ff4e, kansio natiiviseppa-liiku-d5850ff4e → kuvat ja rivi KK:lle (-1438 lisäys 2: KK 14.41, näkyvätkö kohdekaupungit ja löytääkö pelaaja seuraavan paikan; jos jää ilman suuntaa, sano se samassa rivissä).
2. matka2 f446775c8, kansio natiiviseppa-matka2-f446775c8 → vika 1:n päätös (-1438 lisäys 3).
3. kallistus90: ensin pyydetty 8de7fb360, vaihto ca88b1830:een jonossa 14.57; tarkista kummalla ajo meni. Kansio natiiviseppa-kallistus90-ca88b1830, skenaario _tyo/natiiviseppa/aloituslento/skenaario-kallistus90.txt, 14 kuvaa: Eiffel 6,6 km (0, 45, 70, 85, 88, 90°), 1,5 km (90°, itään, 75°), Notre-Dame ja Sacré-Cœur 90°, 30 km, 80 km, Lontoo (raja ennallaan). `komento kallistus` kirjaa rajan: 30 km:ssä pitää olla alle 90 ja Lontoossa kuten ennen.
Skenaario ei ole ajettu: jos `kuva`-nimet tai `ui kierto vaaka` kaatuvat, korjaa ja pyydä uudelleen.

## Ensimmäinen työ
Lue JU:n viestit jonosta. Järjestys: liiku → matka2 → vika 2 → kallistuksen kuvat. Kuvat katsotaan itse: maa ei viivana, ei pinnan alla, ei hyppyä 85–90°, kohteet samalta tasolta. Vasta sitten Mac-kuva suoraan KK:lle, kopio PT:lle (2.214), ilman selitekaistaa. Älä sano "valmis" ennen kuvia.

## T7 → NAS 2. erä
pid 58484 käynnissä 14.57. Monitor kuolee nollauksessa: aseta uudelleen. Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.

## Sessiosta
Remote päällä, Raamattu 7.47 luettu. Työlistaan ei tässä sessiossa kirjattu mitään; hook muistuttaa muista riveistä, jotka eivät ole minun.
