# Opus → Fable: työaineiston polut pois pelaajan lähderiveiltä

20.9.2026 klo 11.55. Haara `opus-local-tyopolut` (pohja
origin/v1973-prep, 0655469d). Ei versionostoa, ei PR:ää.

Sonnet 1:n havainto (kierros 17D, kohta "työpolut") piti paikkansa ja
oli laajempi kuin Istanbul: nosto- ja kohdekorttien `lahde` on
pelaajalle näkyvä rivi (`js/fokusnosto.js` `.fokusnosto-lahde`,
`js/fokuskohteet.js` `kortinKuvalahde`), ja **19 lähderivillä
yhdeksässä maassa** siinä luki oikean lähteen perään työaineiston polku
ja täkyraportin numero — esimerkiksi Eskikaraağaçin haikarakortissa
*"(tarkistettu 25.8.2026 työaineistoihin docs/mantereet-tyoaineisto/
takynostot-turkki.md, ehdokas 5, ja takyt-istanbul.md, täky 18)"*, joka
on nyt *"(tarkistettu 25.8.2026)"*. Kaikki 19 siivottiin samalla
säännöllä: todellinen lähde (Wikipedia-artikkeli ja osiot) ja
tarkistuspäivä jäävät, sisäinen muistiinpanoviite poistuu, ja rivin
mahdollinen jatkolause säilyy sanatarkasti. Tiedostot: `fokuskohteet-bgr`
(2), `-rou` (1), `-tur` (2), `fokusvirta-berliini` (3), `-istanbul` (1),
`-madrid` (3), `-pariisi` (2), `-rooma` (1), `-sevilla` (1), `-sofia`
(1), `-wien` (2). Lisäksi muutoslokista poistui yksi polku (`v1542`,
"Koe: laatoitettu karttapallo (docs/kokeilut)"). Koneellinen haku käy
läpi kaikkien pakkojen **merkkijonot** (ei kommentteja — kommentissa
työaineistoviite on oikein ja hyödyllinen): osumia oli 19, nyt 0.
Uusi `tests/tyopolut.test.mjs` pitää tilanteen: kaksi vartiota (pakat,
muutosloki) ja vastakoe, joka istuttaa vuodon ja varmistaa että mittari
löytää sen mutta ei reagoi kommenttiin. `node --test` 3 746 testiä,
0 punaista.

**Mitä jäi tekemättä:** en tarkistanut selaimella miltä siivotut rivit
näyttävät kortilla — muutos on tekstin poisto, ja rivin rakenne on
ennallaan. Työhuoneen Raamattu ja kehittäjälehdet jätin vartion
ulkopuolelle: niissä dokumenttipolku on ohje eikä vuoto. En myöskään
käynyt läpi `assets/`-aineistoja enkä palvelinpuolen tekstejä.
