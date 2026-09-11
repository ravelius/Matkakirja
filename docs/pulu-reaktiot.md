# Pulun reaktiorekisteri

*(Omistajan toimeksianto 10.9.2026: "fable voisi tehdä mahdollisimman
laajan selvityksen kaikista tilanteista ja kirjoittaa jatkossa tilanteet
suoraan ylös reaktioita varten". Raamattu: PULUN REAKTIOREKISTERI.
Elävä työväline — ei kertaraportti. Omistaja: Fable. Tekniset kytkennät
tekee tekstisessio tämän rekisterin puutelistasta.)*

## Käyttö

- Jokainen merkityksellinen pelitilanne saa rivin. Jokainen tekninen
  renderöinti ei ole tilanne. Pulu seuraa peliä ymmärrettävästi, mutta
  ei elehdi jatkuvasti eikä kilpaile tarinan tai puheen kanssa.
- Sisältö ei nimeä SVG-eleitä. Sisältöön merkitään semanttinen
  tunnetagi `{ tunne, voimakkuus }` (js/livia-tilanteet.js
  `ilmoitaLivianTunne(tagi, { lahde, tunnus })`). Sallitut tunteet:
  `utelias`, `lammin`, `ilo`, `hammastys`, `miettiva`, `vakava`,
  `ylpea`, `rakkaus`, `hammentynyt`, `jannitys`. Voimakkuus 0–1.
- Tekniset tilannetapahtumat (js/livia-tilanteet.js
  `ilmoitaLivianTilanne`): `narration/narrationEnd`, `card/cardEnd`,
  `photo`, `chatOpen/chatClose`, `microphone`, `answer`,
  `success/retry`, `emotion`, `waiting/waitingEnd`.
- **Tarkistuskohta (Raamattu):** uusi tai muuttuva kohtaus, kaupunki,
  linssi tai käyttöliittymätila ei ole valmis ennen kuin sen tilanteet
  on kirjattu tänne ja tunnetagi on merkitty sisältöön samassa
  muutoksessa.

## Toimituslinja (Fable)

- Pulu on Livia: utelias, lämmin, hieman nokkava; vakava synkässä
  tarinassa. Voimakkuus tavallisesti 0,3–0,6; ≥ 0,7 vain suurissa
  hetkissä (aarteen löytö, Venetsian rakkaus, ensimmäinen saapuminen
  uuteen maanosaan, linssin huippukohta).
- Kertojan luennan aikana pulu kuuntelee (tekninen `narration`), ei
  reagoi tarinan tunteisiin päälle. Tunnetagi laukeaa kuplan tai
  jakson alussa, ei kesken puheen.
- Odotus, kortti ja taustaele eivät saa käynnistää ristiriitaisia
  reaktioita; vanhentunutta elettä ei jonoteta. Hiljennys ja vähennetty
  liike huomioidaan teknisessä kerroksessa.

## Rivin muoto

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |

Tila-sarake: **D** dokumentoitu · **M** merkitty sisältöön · **K**
teknisesti kytketty · **T** testattu pelissä. Tunne `—` = perusteltu
hiljaisuus (syy Ajoitus-sarakkeeseen). ID on pysyvä muotoa
`alue.tilanne` (esim. `saapuminen.kaupunki.alku`).


## Rekisteri

*(Ensimmäinen kartoitus 10.9.2026: Opus-parvi luki koodin osa-alueittain
A–F, Fable katselmoi. Rekisteri on jaettu osa-alueisiin samassa
järjestyksessä. Tila-sarakkeen merkinnät: **D** dokumentoitu · **M**
merkitty sisältöön · **K** teknisesti kytketty · **T** testattu ·
**D/sis.** = js/livia-eleet.js hoitaa jo omalla polullaan, ei kulje
tilannerekisterin kautta.)*

### A. Aloitus, ensimmäinen Pulu, kartta ja matkat

Testipolut olettavat oletuslaudan (maailmankartta, pallo) ellei toisin
sanota. `?lauta=pallo` on katselutila (mykkä, ei tallennusta); useimmat
rivit vaativat oikean pelin, jolloin polku alkaa localStorage-avaimista
`matkakirja-save-v1`, `matkakirja-livia-avaus`,
`matkakirja-livia-paljastus`, `matkakirja-livia-lehtivinkki`.

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `aloitus.uusi-peli` | Etusivu / avausteksti | js/main.js:488 `startGame` → js/main.js:468 `attach` | UI syntyy → avausteksti alkaa | — | Pulu ei ole vielä pelissä (pöllö on aarre, Livia esittäytyy vasta kartalla). Hiljaisuus on tarkoitus. | — | — | — | — | D | Tyhjennä `matkakirja-save-v1`, lataa sivu |
| `aloitus.jatko-tallenteesta` | Kartta, ladattu tila | js/main.js:1283–1290 (`loadGame` → `attach`) | Lataus → ensimmäinen render | `lammin` (0,35) | Kerran per sivulataus, noin 1,2 s renderin jälkeen; ei toistoa saman istunnon aikana | Väistyy, jos luenta tai kupla on jo käynnissä; ei jonoteta | Lepo | Katse pelaajaan | Mobiilissa sama; ei modaalin päällä | D | Pelaa yksi saapuminen, lataa sivu uudelleen |
| `aloitus.paivitys-nollaus` | Kartta | js/main.js:1284–1292 (`paivitysTapahtui` → `nollaaValitila`) | Versiopäivityksen jälkeinen lataus | — | Sama hetki kuin `aloitus.jatko-tallenteesta`; ei omaa reaktiota, ettei päivitysruudun perään tule kahta elettä | — | — | — | — | D | Aja `merkitsePaivitys()`, lataa sivu |
| `aloitus.katselutila` | ?lauta=… | js/main.js:1281 `avaaKatselu` | Katselulaudan avaus | — | Perusteltu hiljaisuus: katselutila on mykkä eikä pelisessio (js/main.js:1187–1199). Livian avaus on jo portitettu vaiheeseen `pickstart`. | — | — | — | — | D | `?lauta=pallo` |
| `aloitus.karttaikkuna` | Aloitusvalinta (pallo) | js/ui.js:16306 `aloitaPallolta` → js/ui.js:16309 `naytaLivianAvaus` | Kamera aloitusnäkymään → avaussarja alkaa | `ilo` (0,6) | Kerran per laite (`matkakirja-livia-avaus`), viive `LIVIAN_AVAUKSEN_VIIVE_MS` 1500 ms (js/livia.js:213) | Korkea: tämä on Livian sisääntulo. Pelaajan valinta keskeyttää (`peruLivianAvaus`) | Lepo kuplan jälkeen | Katse pelaajaan, sitten karttaan | Kuplat eivät estä valintaa | D | Poista `matkakirja-livia-avaus`, tyhjennä save, lataa sivu |
| `aloitus.karttaikkuna.tasokartta` | Aloitusvalinta (tasokartta) | js/kartta.js:1791 `naytaLivianAvaus` (zoomaaAloituskartta) | Lähikuva Lontooseen valmis → avaussarja | sama kuin yllä | Sama portti; varapolku jos Globe.gl ei lataudu | sama | sama | sama | sama | D | `aloitaTasokartalta()` konsolista tai pallon varapolku |
| `avaus.repliikki` | Aloitusvalinta | js/livia.js:303 `naytaRepliikki`, sarja js/livia.js:185 `livianAvausSarja` | Kupla ilmestyy → lukuaika umpeutuu | `utelias` (0,45), viimeinen `lammin` (0,55) | Tagi kuplan ALUSSA, ei kesken puheen (toimituslinja). Yksi tagi per repliikki, ei per sana | Ei kilpaile äänen kanssa; napautus siirtää seuraavaan | Lepo | Katse kuplaan | Kuplapino mobiilissa | D | Sama kuin `aloitus.karttaikkuna`, napauta kuplia |
| `avaus.perutaan` | Aloitusvalinta | js/livia.js:408 `peruLivianAvaus`, kutsu js/ui.js:11855 `doPickStart` | Pelaaja napauttaa kaupunkia kesken sarjan | `jannitys` (0,4) | Kerran; ele saa kestää lentokalvon alle | Voittaa jäljellä olevat kuplat; ei jonota kesken jäänyttä | Lento-asento | Katse kohteeseen | — | D | Napauta kohdekaupunkia heti ensimmäisen kuplan aikana |
| `aloitus.lento.lahto` | Aloituslento | js/ui.js:11849 `doPickStart` (naksahdus 11881, kabiiniääni 11890) | Napautus → arkki nousee | `jannitys` (0,55) | Kerran per peli; ele ennen arkkia, ei sen alla | Väistyy heti, kun aloitusverho peittää ruudun | — | Katse ylös/kohteeseen | Arkki peittää mobiilissa koko ruudun | D | Uusi peli → napauta Ateenaa |
| `aloitus.lento.matka` | Aloituslento kartalla | js/ui.js:20727 `aloituslento`, js/ui.js:20816 `aloituslentoSisalla` | Kone lähtee → kohtaus purkautuu | — | Perusteltu hiljaisuus: kertoja lukee ja kirjoituskone naputtaa; pulu on kuulolla (tekninen `narration`), ei elehdi päälle | Luenta omistaa hetken | — | — | Kalvo/verho päällä | D | Sama, katso koko avauslento |
| `aloitus.lento.perilla` | Saapumiskortti | js/ui.js:21204 `naytaSaapumiskortti`, js/ui.js:21240 `aloituslentoKesken=false` | Kortti kirjoittuu → arkki väistyy | `hammastys` (0,5) | Kerran per peli, kortin kirjoituksen lopussa | Ei saa mennä tuurauspaljastuksen päälle — paljastus alkaa heti perään (js/ui.js:21243) | Lepo | Katse kaupunkiin | Arkki on modaali | D | Uusi peli → ensimmäinen lento loppuun |
| `paljastus.tuuraus.alku` | Kaupunki, ensisaapuminen | js/livia.js:565 `naytaLivianPaljastus`, kutsu js/ui.js:20318 | Kaksi ensimmäistä kuplaa ENNEN isoisän luentaa | `hammentynyt` (0,55) | Kerran koskaan (`matkakirja-livia-paljastus`). Korvaa saapumisen maadoituskuplan | Korkein prioriteetti saapumisessa; luenta on lykkäyksessä (js/ui.js:21243 `luennanLykkays`) | Lepo | Katse pelaajaan | Kuplapino | D | Poista `matkakirja-livia-paljastus` + save, uusi peli, lennä Ateenaan |
| `paljastus.tuuraus.loppu` | Kaupunki, ensisaapuminen | js/livia.js:594 `paljastusRepliikki`, luennan odotus js/livia.js:701 `odotaLuenta` | Kolmas kupla VASTA isoisän luennan jälkeen | `ylpea` (0,5) | Kerran koskaan; odottaa `luennanLoppuun` | Linssi pysäyttää kellon (js/fokusvirta.js:1124) | Lepo | Katse pelaajaan | — | D | Sama polku, odota luenta loppuun |
| `vihje.lehtivinkki` | Kaupunkilehti | js/livia.js:774 `livianLehtivinkkiOdottaa`, näyttö js/fokusvirta.js:4756–4771 | Lehti auki → vinkkikupla | `utelias` (0,4) | Kerran per laite (`matkakirja-livia-lehtivinkki`) + istuntolippu | Ei kesken luennan | Lepo | Katse lehteen | Lehti on modaali — ele pienenä; dialogiportti estää nykyisin (ks. puutelista T1) | D | Poista `matkakirja-livia-lehtivinkki`, avaa kaupunkilehti |
| `vihje.mannerivihje` | Kartta | js/livia.js:860 `paivitaMannerivihje`, kutsu js/ui.js:13465 | Tilanne täyttyy → yksi kupla | `miettiva` (0,45) | Kerran per peli, tilannelaukaisin (ei kalenteri): manteren aarre löytynyt + rahaa + pitkä viipymä | Ei koskaan luennan tai linssin päälle (`ruutuVarattu`, js/livia.js:833) | Lepo | Katse kartalle | — | D | Löydä manteren aarre, viivy samassa maassa, odota renderiä |
| `kartta.aloitusvalinta.kohde` | Aloitusvalinta | js/ui.js:11620 `sovitaLentokohteet`, kohdemerkit | Kohdemerkki korostuu osoittimen alla | — | Perusteltu hiljaisuus: 14 kohdetta, hover-reaktio olisi jatkuvaa elehdintää (toimituslinja: "ei elehdi jatkuvasti") | — | — | — | — | D | `?lauta=pallo`, liikuta osoitinta kohdemerkkien yli |
| `kartta.panorointi` | Kartta | js/kartta.js `asetaPan` / js/pallolauta/kamera.js:260 | Pelaaja raahaa tai zoomaa | — | Perusteltu hiljaisuus: pelaajan oma kameraele ei ole tapahtuma. Kosketus kuitenkin nollaa joutokellon (js/livia-eleet.js:168 `toiminta`) | — | — | — | — | D/sis. | Raahaa karttaa |
| `kartta.linssikartta` | Linssikartta | js/ui.js:13414 `tarkistaLinssikartta` | Linssikartta sulkeutuu perillä | — | Rajaus: yksityiskohdat osa-alueella F | — | — | — | — | D | — |
| `saapuminen.kaupunki.alku` | Kartta, kaupunki | js/game.js:1067 `visitCity`; render js/ui.js:13443 `fokusvirtaSaapuminen`; kamera js/saapumisasento.js:95 / js/kartta.js:1915 | Nappula maassa → kamera asettuu | `ilo` (0,45) | KERRAN PER SAAPUMINEN (kaikki 45+ kaupunkia yksi rivi). Muisti: `ui.saapumiskuplaNaytetty` -avain `pack:city` | Väistyy tuurauspaljastuksen tieltä; ei toistu, vaikka render ajetaan uudelleen | Lepo | Katse kaupunkiin (alin kolmannes) | Saapumisasento varaa ylälaidan luentakuvalle | D | Lennä mihin tahansa kaupunkiin |
| `saapuminen.kaupunki.uusi` | Kartta, kaupunki | js/game.js:1073–1081 (`world.visited` kasvaa, XP_NEW_CITY) | Ensikäynti juuri tässä kaupungissa | `utelias` (0,5) | Kerran per kaupunki per peli; erottuu paluukäynnistä | Sama hetki kuin `saapuminen.kaupunki.alku` — vain toinen näistä laukeaa | Lepo | Katse kaupunkiin | — | D | Lennä kaupunkiin, jossa ei ole käyty |
| `saapuminen.kaupunki.paluu` | Kartta, kaupunki | js/game.js:1071 (`visited.has` → return 0) | Paluu jo käytyyn kaupunkiin | `lammin` (0,3) | Matalampi kuin ensikäynti; enintään kerran per saapuminen | Väistyy kaikelle muulle | Lepo | Katse kaupunkiin | — | D | Kävele pois ja takaisin samaan kaupunkiin |
| `saapuminen.maa.uusi` | Kartta | js/ui.js:13684 `pack.map.cityCountry`; maalehti js/ui.js `avaaMaalehti` | Uusi maa ensi kertaa | `hammastys` (0,55) | Kerran per maa; lippu ja maan nimi nousevat samassa piirrossa | Voittaa kaupunkitason reaktion samassa saapumisessa | Lepo | Katse lippuun | — | D | Lennä maahan, jossa ei ole käyty |
| `saapuminen.manner.uusi` | Kartta | js/game.js:858 `mannerOf`, js/game.js:1368 `actionMannerLento`, js/game.js:2779 `kirjaaLoytopaikka` | Ensimmäinen saapuminen uudelle mantereelle | `hammastys` (0,75) | Toimituslinjan nimetty suuri hetki (≥ 0,7 sallittu). Kerran per manner | Korkein A-osan tunnepiikki matkoissa | Lepo | Katse laajaan karttaan | — | D | Löydä manteren aarre → mannerlento toiselle mantereelle |
| `poistuminen.kaupunki` | Kartta | js/ui.js:12054 `vaiennaPaikanPuhe`, kutsu js/ui.js:19437 (`doFly`) ja js/ui.js:12066 (`doWalk`) | Matka alkaa → paikan puhe vaikenee | `miettiva` (0,3) | Kerran per lähtö; sama kutsu kattaa kaikki kolme matkatapaa | Väistyy heti matka-animaation tieltä | Liikeasento | Katse suuntaan | — | D | Klikkaa uutta kohdetta kaupungista |
| `poistuminen.tutkinta` | Lehti sulkeutuu | js/ui.js:15857 `closeArrival` | Lehti kiinni → luenta jatkuu | — | Perusteltu hiljaisuus: tauolle jäänyt luenta jatkuu samassa hetkessä (js/ui.js:15880), eikä sen päälle elehditä | — | — | — | Modaali sulkeutuu | D | Avaa Tutki paikka, sulje se |
| `saapuminen.kortti` | Saapumiskortti | js/ui.js:20240 `naytaSaapumiskortti`, teksti js/ui.js:20226 | Kortti kirjoittuu arkille | — | Perusteltu hiljaisuus: kortti on arkin alla eikä pulu näy sen päällä | — | — | — | Arkki on modaali | D | Uusi peli, katso saapumiskortti |
| `saapuminen.ohjekuplat` | Kartta, kupla | js/ui.js:20350 `saapumisenOhjekuplat`, kutsu js/ui.js:20325 | Tervetuloa + toimintaohje | `lammin` (0,35) | Vain kun paljastus ei alkanut (jo nähty tai paneeli auki); kaksi kuplaa `SAAPUMISEN_KUPLA_VALI_MS` välein | Ohje ei saa syödä hetkeä — matala voimakkuus | Lepo | Katse pelaajaan | Kuplapino | D | Toinen saapuminen (paljastus jo nähty) |
| `matka.valinta.auki` | Alapalkki | js/ui.js:10991 `avaaMatkavalikko`, vaihtoehdot js/ui.js:10848 `renderTravelChoice`, js/game.js:956 `travelModes` | Matkustustavat näkyviin | `utelias` (0,35) | Kerran per avaus; ei toistoa saman vuoron aikana | Matala — pelaaja lukee valikkoa | Lepo | Katse valikkoon | Mobiilissa valikko peittää alalaidan | D | Avaa alapalkin matkavalikko kaupungissa |
| `matka.valinta.este` | Alapalkki | js/ui.js:11039 `laivaEste`, js/ui.js:11050 `lentoEste` | Estetty tapa napautetaan | `hammentynyt` (0,4) | Joka napautuksella, mutta 2,8 s vähimmäisväli suojaa toiston | Väistyy, jos kupla jo näkyy | Lepo | Katse pelaajaan | — | D | Yritä laivaa ilman rahaa (`money < SEA_FARE`) |
| `matka.noppa` | Kartta | js/game.js:1556 `actionRoll`, js/ui.js:12066 `doWalk` → `heitaJaSovita` | Noppa pyörähtää → luku näkyy | `jannitys` (0,4) | Kerran per heitto; automaattiheitto (js/ui.js `automaattiheittoPaikka`) EI saa jonottaa elettä | Ei kesken luennan (luenta vaiennetaan js/ui.js:12065) | Lepo | Katse noppaan | — | D | Kaupungissa: Kävele → noppa |
| `matka.jumissa` | Kartta | js/game.js:1565 `emit('stuck', …)` | Heitto ei anna siirtoa | `hammentynyt` (0,45) | Harvinainen; kerran per heitto | Ohittaa `matka.noppa`n paluueleen | Lepo | Katse pelaajaan | — | D | Heitä umpikujassa (moves.size === 0) |
| `matka.kavely.lahto` | Kartta | js/ui.js:12061 `doWalk`, siirto js/ui.js:19392 `doMove` (`maitse=true`), ääni js/ui.js:21393 `aloitaJalkamatkanAani` | Ennakkozoomi ohi → nappula lähtee | `ilo` (0,4) | Kerran per siirto; ele ennen ensimmäistä askelta | Ennakkozoomi (js/ui.js:21277) omistaa hetken sitä ennen | Liikeasento (`walkRight`) | Katse suuntaan | Liikeherkkyys ohittaa animaation (js/ui.js:21278) | D | Kaupungissa: Kävele → valitse päätepiste |
| `matka.kavely.matka` | Kartta | js/ui.js:21267 `animatePawn`, saatto js/ui.js:21334 `aloitaSaattavaKamera` | Askeleet + saattava kamera | — | Perusteltu hiljaisuus: askeltahti on jo oma esityksensä, ja `nykyinen?.group==='Liike'` estää tilannereaktiot (js/livia-eleet.js:123) | — | — | — | — | D/sis. | Kävele kuutosen matka |
| `matka.kavely.perilla` | Kartta | js/ui.js:21405 `lopetaJalkamatkanAani`, saapumisasento js/ui.js:21374 | Viimeinen askel → kamera saapumisasentoon | (ks. `saapuminen.kaupunki.*`) | Ei omaa tagia — saapumisrivi hoitaa. Reitille jäätäessä (edge) hiljaisuus | — | — | — | — | D | Kävele kaupunkiin asti |
| `matka.reitille` | Kartta, reitti | js/game.js:1591 (`pos.type === 'edge'`) | Matka päättyy reitin varrelle | `miettiva` (0,35) | Kerran; erottuu kaupunkiin saapumisesta | Matala; automaattiheitto jatkaa pian (js/game.js:1455 `jatkaMatkaaItsestaan`) | Lepo | Katse eteenpäin | — | D | Heitä lyhyt luku pitkällä reitillä |
| `matka.laiva.lahto` | Kartta | js/game.js:1530 `actionTravel('sea')` (lippu js/game.js:1540 `pendingFare`), musiikki js/ui.js:19424 (`musiikki='laiva'`) | Laivalippu maksetaan → nappula lähtee | `ilo` (0,45) | Kerran per merimatka; vain satamasta lähtiessä maksetaan | Ei kesken luennan | Liikeasento | Katse merelle | — | D | Kaupungissa: Laiva → noppa → päätepiste |
| `matka.laiva.maksu` | Yläpalkki | js/game.js:1593 `emit('fare', …)` | Kukkaro pienenee | `hammentynyt` (0,3) | Sama hetki kuin `matka.laiva.lahto` — vain toinen laukeaa | Väistyy lähtöeleelle | — | Katse kukkaroon | — | D | Sama polku, katso yläpalkin £ |
| `matka.laiva.perilla` | Kartta | js/ui.js:19426 `animatePawn` valmis | Nappula satamassa | (ks. `saapuminen.kaupunki.*`) | Ei omaa tagia | — | — | — | — | D | Purjehdi satamakaupunkiin |
| `matka.lento.lahto` | Kartta | js/ui.js:19434 `doFly` (naksu/kalvo js/ui.js:19452–19456), js/game.js:2746 `actionFly` | Napautus → `flight-active`, kaari kartalle | `jannitys` (0,5) | Kerran per lento | Ele ENNEN kalvoa; kalvon aikana `flight-active` estää kaiken (js/livia-eleet.js:155) | Lentoasento | Katse ylös | Kalvo vain maailmankartalla; mantereella suora hyppy | D | Kaupungissa: Lennä → valitse kohde |
| `matka.lento.matka` | Lentokalvo | js/ui.js:19520 `animateFlight`, js/ui.js:19526 `animateFlightSisalla` | Kalvo päällä | — | Perusteltu hiljaisuus: `body.flight-active` ja `body.kartalento` sulkevat pulun rauhallisuustestin (js/livia-eleet.js:155) | — | — | — | Kalvo peittää ruudun | D/sis. | Lennä maailmankartalla |
| `matka.lento.hinta` | Yläpalkki | js/game.js:2755 (`money -= FLIGHT_PRICE`), js/game.js:2759 `emit('flight', …)` | £100 pois | `hammentynyt` (0,3) | Sama hetki kuin lähtö; vain toinen laukeaa | Väistyy lähtöeleelle | — | Katse kukkaroon | — | D | Lennä, katso yläpalkki |
| `matka.lento.perilla` | Kartta | js/ui.js:19487–19492 `animatePawn` valmis | Nappula maassa kohdekaupungissa | (ks. `saapuminen.kaupunki.*`) | Ei omaa tagia — saapumisrivi hoitaa | — | — | — | — | D | Lennä kaupunkiin |
| `matka.mannerlento.lahto` | Kartta | js/game.js:1368 `actionMannerLento`, valikko js/game.js:1339 `mannerLennot`, UI js/ui.js:10954 | Mannerlento alkaa | `jannitys` (0,6) | Harvinainen (vain kun manteren aarre löytynyt ja rahaa on) | Korkeampi kuin tavallinen lento | Lentoasento | Katse laajaan karttaan | — | D | Löydä manteren aarre → mannerlentonappi |
| `laukku.auki` | Matkalaukku | js/ui.js:16951 `openPassport` (showModal js/ui.js:16960) | Laukku aukeaa | `utelias` (0,4) | Kerran per avaus | Modaali: pulu on kartalla laukun alla — ele vain, jos pulu näkyy (js/livia-eleet.js:123 estää `dialog[open]`) | Lepo | — | **Modaali estää nykyisin kaiken** — ks. puutelista T1 | D | Napauta yläpalkin pilleriä |
| `laukku.kiinni` | Kartta | js/ui.js:16977 `suljeLaukku` | Laukku sulkeutuu, kartta palaa | `lammin` (0,3) | Kerran per sulku | Väistyy, jos kartalla on kesken oleva kupla | Lepo | Katse karttaan | — | D | Sulje laukku |
| `laukku.uusi-linssi` | Matkalaukku / kartta | js/game.js:1035 `tarkistaLinssikynnys`, js/game.js:1038 `emit('aid','Uusi linssi')` | Uusi varuste avautuu | `ylpea` (0,6) | Kerran per linssi | Merkittävä eteneminen — ohittaa ohjekuplat | Lepo | Katse linssiin | Linssin yksityiskohdat osa-alueella F | D | Kerää XP linssikynnykseen |
| `laukku.uusi-juliste` | Matkalaukku | js/game.js:1317 `myonnaJuliste` | Juliste palkintona | `ilo` (0,55) | Kerran per juliste | — | Lepo | Katse julisteeseen | — | D | Voita kaupungin julistepalkinto |
| `eteneminen.raha.nousi` | Yläpalkki | js/game.js:1417 (`emit('aid')`), js/game.js:1863, js/game.js:2415 | Kukkaro kasvaa | `ilo` (0,45) | Kerran per palkkio; pikkupalkkiot (< 25 £) ilman elettä, ettei elehdi jatkuvasti | Väistyy aarrejuhlan tieltä (osa-alue E) | Lepo | Katse kukkaroon | Yläpalkki kapea mobiilissa | D | Vastaa kysymykseen oikein / löytöpalkkio |
| `eteneminen.raha.loppu` | Yläpalkki | js/game.js:1471 `needsAid`, js/game.js:1417 `STRANDED_AID` | Rahat loppuivat, pankki auttaa | `hammentynyt` (0,5) | Kerran per avustus; ks. myös `peli.vararikko.pankkiapu` (E5) | — | Lepo | Katse pelaajaan | — | D | Kuluta rahat alle laivalipun |
| `eteneminen.paiva` | Yläpalkki | js/game.js:1109 `dayCount`, välähdys js/ui.js:10527 (`aika-valahdys`) | Päivämäärä vaihtuu | `miettiva` (0,3) | Vain kun `clockLabel` oikeasti muuttuu (js/ui.js:10526); ensimmäinen piirto ei väläytä. HUOM: E5 (`peli.paiva.vaihtuu`) ehdottaa tähän hiljaisuutta — ks. Päällekkäisyydet | Hyvin matala — aika on tarinaa, ei uhkaa | Lepo | Katse kelloon | — | D | Tee useita vuoroja, seuraa "Päivä n" |
| `eteneminen.aikataulu` | Tietoruutu | js/game.js:1128 `updateSchedule` | Isoisän aikataulurivi nousee | `vakava` (0,45) | Kerran per rivi (`scheduleShown`); ks. `peli.aikataulu.merkinta` (E5) | Ei kesken luennan | Kuuntelu | Katse riviin | — | D | Pelaa yli merkinnän päivän |
| `eteneminen.ennatys` | Tietoruutu / passi | js/game.js:1147 `noteRecord` | Isoisän ennätys rikkoutuu tai ohittuu | `ylpea` (0,7) / `vakava` (0,5) | Kerran per peli; kaksi haaraa (alle/yli `RECORD_DAYS`); ks. `aarre.ennatys` ja `peli.ennatys.ohi` (E) | Suuri hetki — 0,7 sallittu | Lepo | Katse pelaajaan | — | D | Löydä ensimmäinen aarre ennen päivää `RECORD_DAYS` |
| `joutohetki.tyhja` | Kartta | js/livia-eleet.js:157 `ajasta` (30 s / 22 s portit), rauha js/livia-eleet.js:151 `rauhallinen` | Mitään ei tapahdu 30 s | — | Kiertää 16 lepoelettä; EI tunnetagia — tämä on tekninen taustaele, ei sisällön reaktio | Matalin prioriteetti; kaikki muu ohittaa | Lepo | Vaihtelee | Estyy dialogin, kuplan ja lennon aikana | D/sis. | Jätä peli koskematta 30 s kartalla |
| `joutohetki.nukahdus` | Kartta | js/livia-eleet.js:161 (`tauko >= 180000` → `sleep`) | 3 min ilman toimintaa | — | Tekninen lepotila | — | Uni | Silmät kiinni | — | D/sis. | Odota 3 min |
| `joutohetki.herays` | Kartta | js/livia-eleet.js:168 `toiminta` (`wake`) | Pelaaja koskee ruutua nukkuvan pulun aikana | `hammastys` (0,4) | Kerran per herätys | Ohittaa lepoeleen | Lepo | Katse pelaajaan | pointerdown/keydown, capture | D/sis. | Nuku pulu, napauta ruutua |
| `tausta.piiloon` | — | js/livia-eleet.js:180 `tausta` (`doc.hidden`) + js/main.js:1176 `visibilitychange` | Välilehti taustalle | — | Perusteltu hiljaisuus: animaatio katkaistaan ja lepokuva jää | — | Lepo | — | `pagehide` kattaa iOS-kuoren | D/sis. | Vaihda välilehteä |
| `tausta.paluu` | Kartta | js/livia-eleet.js:181–182 (`else`-haara: puhe luetaan uusiksi, `kaynnista`) | Peli palaa esiin | `lammin` (0,4) | Kerran per paluu, vähintään 30 s poissaolon jälkeen (mittari puuttuu koodista) | Väistyy, jos puhe tai kupla jatkuu | Lepo | Katse pelaajaan | Myös SW-päivitystarkistus samassa hetkessä (js/main.js:1176) | D/sis. | Vaihda pois ja takaisin |
| `hiljennys.vahennetty-liike` | Kaikki | js/livia-eleet.js:54 (`prefers-reduced-motion`), js/livia-eleet.js:179 `liikeAsetus` | Asetus päälle | — | Perusteltu hiljaisuus: eleet piirretään lepokuvana, `toista` palauttaa false (js/livia-eleet.js:111). Tunnetagi saa silti kulkea — se ei saa kaataa mitään | Ohittaa kaiken | Lepo | — | Sama koko pelissä | D/sis. | `prefers-reduced-motion: reduce` selaimen asetuksista |
| `hiljennys.aani-pois` | Kaikki | js/livia-eleet.js:203 `AANIVALINTA_TAPAHTUMA` → `vaienna` | Kertoja/musiikki pois | — | Perusteltu hiljaisuus äänessä; kuvaele jatkuu normaalisti | — | — | — | — | D/sis. | Kytke kertoja pois asetuksista |

Osa-alueen A rivit `saapuminen.kommentti`, `saapuminen.valihuuto`,
`saapuminen.luentakuva`, `saapuminen.pulunkuvat` ja
`saapuminen.etsi-aarre-nappi` on yhdistetty osa-alueen B riveihin
`pulu.kommentti.alku`, `pulu.huudahdus.valihuuto`, `luentakuva.nousu`,
`pakka.nousu` ja `etsiaarre.nappi.nousu` — samat hetket, sama koodi.

### B. Isoisän matkakirja, luenta ja kortit

**B1 Matkakirjakortti ja kirjoituskone**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `matkakirja.kortti.avaus` | kartta + kortti ylävasen | js/ui.js:12755 (`renderFact` → `uusiFactKey` 12453) | kortti näkyviin → kirjoituskone alkaa | `utelias` (0,4) | kerran per korttiavain (`lauta:kaupunki`), ei toistu uudelleenpiirrossa | väistyy heti luennalle; ei kilpaile huudahduksen kanssa | ele purkautuu ennen luennan alkua | katse korttiin (ylävasen) | mobiilissa kortti kapea, ei modaali | D | `node --test tests/fokusvirta.test.mjs` + selain: aja fokuskaupunkiin |
| `matkakirja.kirjoituskone.loppu` | kortti | js/ui.js:12797 → js/fokusvirta.js:547 | viimeinen lyönti → `fokusvirtaMerkintaLuettu` | — | kone ehtii maaliin ennen kertojaa; reaktio kuuluu kommentille, ei koneelle | — | — | katse pysyy kortissa | — | D | selain: kirjoituskone loppuu, pulu ei elehdi ennen kommenttia |
| `matkakirja.merkinta.vaihtuu` | kortti | js/ui.js:12453 `uusiFactKey` | vanha teksti pois → uusi avain | — | tekninen vaihto; ele jäisi vanhan merkinnän päälle | pysäyttää lukijan, peruu kortin palautuksen | — | — | — | D | selain: aikataulurivi ratkeaa samassa kaupungissa |
| `matkakirja.kortti.kutistus` | kartta | js/ui.js:12547 `kutistaKortinLiikkeesta` | kartan liike → kortti lapuksi | — | pelaajan oma ele, ei kommentoitava tapahtuma; toistuu joka vedossa | ei saa keskeyttää luennan kuuntelua | — | — | mobiilissa yleisin polku | D | selain: raahaa karttaa luennan aikana |
| `matkakirja.kortti.palautus` | kartta | js/ui.js:12556 `ajastaKortinPalautus` | hiljaisuus → kortti auki | — | vain luennan ajan; peruuntuu kun luenta loppuu (js/luenta.js:528) | — | — | — | — | D | `tests/puhevuoro.test.mjs` + selain: veto kesken luennan |
| `matkakirja.kortti.lappu.avaus` | kartta | js/ui.js:2751 (click) / 2760 (keydown) | pelaaja napauttaa lappua → kortti auki | `utelias` (0,3) | kerran per napautus, ei toistoa jos jo auki | häviää käynnissä olevalle kuplalle | ele purkautuu 1 s | katse korttiin | kosketus + näppäimistö; ei modaali | D | selain: kutista kortti, napauta lappua |
| `matkakirja.kortti.piilotus` | kartta | js/ui.js:12849 | lehtilukko → kortti pois | — | tekninen tila, ei tapahtuma pelaajalle | — | — | — | — | D | selain: kaupunki jonka lehti on lukossa |

**B2 Luenta (kertoja), lataus ja varareitit**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `matkakirja.luenta.alku` | kartta + kortti | js/ui.js:12824 → js/luenta.js:502, 625 | `playDiaryVoice` → `playing` | — (kuuntelee) | tekninen `narration`, ei tunnetagia: kertojan luennan aikana pulu kuuntelee | luenta odottaa pulun lauseen loppuun (js/luenta.js:641 `PULUN_ODOTUS`) | — | katse kohti korttia/kertojaa | — | K js/luenta.js:625, js/livia-tilanteet.js:48 | `node --test tests/livia-tilanteet.test.mjs` |
| `matkakirja.luenta.kuuntelu` | kartta | js/livia-tilanteet.js:44–48 | `timeupdate` → nyökkäys ~12 s välein | — | vuorottelu listen/nod/aihe-ele; ei tunnetagia kesken puheen | vanhentunutta elettä ei jonoteta (`viime`-vahti) | — | pieni liike, ei asusteita | liikevähennys huomioidaan teknisessä kerroksessa | K js/livia-tilanteet.js:48 | `tests/livia-tilanteet.test.mjs`: syötä timeupdate-sarja |
| `matkakirja.luenta.tauko` | kartta | js/livia-tilanteet.js:51 (`pause`/`waiting`/`stalled`) | puhe katkeaa → `narrationEnd` | — | puskurointi ei ole tarinan tauko | — | ele purkautuu heti | — | — | K js/livia-tilanteet.js:51 | `tests/livia-tilanteet.test.mjs`: pause → narrationEnd |
| `matkakirja.luenta.jatko` | kartta | js/livia-tilanteet.js:49 (`playing`) | puskuri täyttyi → `narration` alkaa uudestaan | — | sama vuoro jatkuu, ei uutta aloitusta | — | — | — | — | K js/livia-tilanteet.js:48–49 | selain: hidasta verkkoa, luenta yskii |
| `matkakirja.luenta.loppu` | kartta | js/luenta.js:528 `luennanLoppuVahti`, 795 `luennanLoppuun` | `ended` → kommentti, kuvan pienennys, kortin palautus peruuntuu | — | tunne kuuluu seuraavalle kuplalle (`pulu.kommentti.alku`), ei loppuun | ratkaisee kolme kelloa: kommentti, luentakuva, kortin palautus | — | — | — | K (narrationEnd) js/livia-tilanteet.js:51 | `tests/luentakuva.test.mjs` + selain |
| `matkakirja.luenta.lataus` | kartta | js/ui.js:12824 (`viive: 1000`), js/luenta.js:686 | kortti valmis → luenta ei vielä ala | — | hengähdys on tarkoituksellinen; ele täyttäisi tauon väärin | — | — | — | — | D | selain: kortti piirtyy, sekunnin hiljaisuus ennen ääntä |
| `matkakirja.luenta.varareitti` | kartta | js/luenta.js:512–521 (`error` → `peiliPetti('aanet')`) | ämpäri pettää → repon polku soi | — | tekninen, ei näy pelaajalle; kaksi porrasta kerran | ei saa laukaista `narrationEnd`-elettä ennen kuin varareitti on kokeiltu | — | — | — | D | `node --test tests/puhe.test.mjs` + selain: estä ämpäriosoite |
| `matkakirja.luenta.epaonnistui` | kartta | js/luenta.js:679–692 (`play().catch`) | soitto ei käynnisty → `error` | — | hiljaisuus, ei virhe-elettä; peli jatkuu kirjoituskoneen kellolla | pudottaa kommentin ja kuvan pienennyksen varapolulle | — | — | iOS NotAllowedError yleisin | D | selain iOS: saapuminen ilman käyttäjän elettä |
| `matkakirja.luenta.kaiutinnappi` | kortti | js/ui.js:2650–2683, js/luenta.js:419 | pelaaja käynnistää/pysäyttää luennan | — | sama sääntö kuin kertojalla: luennan aikana kuunnellaan | pysäyttää laitteen lukijan ja äänitteen | — | katse korttiin | nappi näkyy vain äänitteellisille | D | selain: paina kaiutinta kesken merkinnän |
| `matkakirja.luenta.mykistys` | kartta | js/luenta.js:99 `luentaKytkinPaalla`, js/ui.js:2660 | kytkin pois → kaikki puhe vaikenee | — | mykistetty peli on mykistetty myös pulun osalta | vaientaa myös pulun äänet (js/liviapuhe.js:976) | — | — | — | D | selain: mykistä kesken luennan |

**B3 Luentakuva ja PULU-CAM-pakka**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `luentakuva.esilataus` | — | js/fokusvirta.js:1830 `esilataaLuentakuva` | saapumisrender → Image muistiin | — | tekninen, ei näy | — | — | — | — | D | `node --test tests/luentakuva.test.mjs` |
| `luentakuva.nousu` | kartta | js/fokusvirta.js:1858 `naytaLuentakuva` (js/ui.js:12844) | kuva nousee isona luennan alkaessa | — (A ehdotti `utelias` 0,4; ks. Epävarmat) | nousee samassa hetkessä kuin kertoja aloittaa → kuunteluvuoro voittaa | ei saa kilpailla `narration`-eleen kanssa | — | katse kuvaan ilman elettä | ankkuroitu kartan pisteeseen, ei modaali | D | `tests/luentakuva.test.mjs`, `tests/luentakuvakartta.test.mjs` |
| `luentakuva.pienennys.kartanliike` | kartta | js/fokusvirta.js:2578 `pienennaLuentakuva` | pointerdown → kuva peukalonkynneksi | — | idempotentti, toistuu joka vedossa | pakan ollessa päällä kutistaa molemmat yhdessä | — | — | — | D | `tests/luentakuva.test.mjs`: toinen kutsu ei tee mitään |
| `luentakuva.pienennys.luennanloppu` | kartta | js/fokusvirta.js:2622 `pienennaLuennanJalkeen` | luenta loppui → kuva pieneksi | — | sama kello kuin kommentilla; PULU-CAM-pakka voittaa tämän kellon | kaupunginvaihto = poisto, ei pienennys | — | — | — | D | `tests/luentakuva.test.mjs` + `tests/pulucam.test.mjs` |
| `luentakuva.poisto` | kartta | js/fokusvirta.js:2650 `piilotaLuentakuva` (858) | kaupungista lähtö → kuva ja pakka pois | — | tekninen siivous; lähtö vaientaa koko kaupungin puheenvuoron | vie mukanaan pakan ajastimet | — | — | — | D | selain: lähde kaupungista kesken luennan |
| `luentakuva.rikki` | kartta | js/fokusvirta.js:1943 (`asetaKuva` onVirhe) | kuva ei lataudu → koko paneeli pois | — | hiljaisuus: pelaaja ei näe mitään, josta reagoida | luenta jatkuu häiriöttä | — | — | — | D | selain: riko luentakuvan osoite |
| `luentakuva.raahaus` | kartta | js/fokusvirta.js:1953–1962 (raahattu-lippu) | pelaaja siirtää kuvan | — | pelaajan säätö, ei tarinan tapahtuma; klikki raahauksen perässä ei avaa | raahaus ei saa laukaista suurennosta | — | — | kosketusraahaus | D | selain: raahaa kuvaa, tarkista ettei karuselli aukea |
| `luentakuva.suurennos.avaus` | kartta (suurennos) | js/fokusvirta.js:2074 `avaaLuentakuvanKaruselli` → 2789 `avaaSuurennos` | napautus → isoisän kuva isona | `utelias` (0,5) | kerran per napautus; ei jos pakan alin kortti vasta nousi | kevyt suurennos, kartta näkyy taustalla; ei modaali | ele purkautuu suurennoksen sulkeutuessa | katse kuvaan | pyyhkäisy vaihtaa kuvaa (2760) | D | `node --test tests/kuvasuurennos.test.mjs` |
| `luentakuva.suurennos.sulku` | kartta | js/fokusvirta.js:2768 `suljeSuurennos` | ruksi/Esc/tausta → kartta takaisin | — | paluu näkymään, ei uutta puheenvuoroa | — | — | — | — | D | `tests/kuvasuurennos.test.mjs` |
| `pakka.nousu` | kartta | js/fokusvirta.js:2110 `naytaPulunKuvapakka` (kutsu 1180) | pulun kommentin alkaessa → pakka isoisän kuvan päälle | `ylpea` (0,55) | kerran per saapuminen, samasta koukusta kuin Etsi aarre -nappi | peruu luennan pienennyksen; kuuluu samaan hetkeen kuin `pulu.kommentti.alku` | ele purkautuu ensimmäisen kuplan jälkeen | katse pakkaan | pohjaton pakka saa oman paneelin | D | `node --test tests/pulucam.test.mjs` |
| `pakka.kortti.pulpahdus` | kartta | js/pulucam.js:455–468, viiveet 163 `PULUCAM_VALIT_MS` | kortit nousevat 0/950/1150/1050/1100 ms | `ilo` (0,4) vain ensimmäisessä, muut — | enintään 5 korttia (`PULUCAM_KATTO`); ei elettä joka kortista | ei saa kilpailla kommenttikuplien kanssa | — | — | — | K js/fokusvirta.js:2152 (`photo`) | `tests/pulucam.test.mjs`: viiveet ja kuvateksti |
| `pakka.kortti.nosto` | kartta | js/pulucam.js:443 (click) → 358 `nostaPuluCamKortti` | alemman kortin napautus → se päälle | `utelias` (0,35) | toistuu jokaisesta nostosta; kevyt ele, ei joka kerta | ei avaa karusellia (nosto voittaa) | ele purkautuu 1 s | katse nostettuun kuvaan | kortin napautus ei kutista matkakirjaa (stopPropagation) | K js/fokusvirta.js:2152 (`photo`) | `tests/pulucam.test.mjs`: nosto vaihtaa kuvatekstin |
| `pakka.kortti.avaus` | kartta (suurennos) | js/pulucam.js:446 → js/fokusvirta.js:2143 | päällimmäisen kortin napautus → karuselli siitä kuvasta | `ilo` (0,5) | kerran per napautus | karuselli alkaa päällimmäisestä; isoisä on listalla ensin | ele purkautuu suurennoksen kanssa | — | PULU-CAM-merkki näkyy vain pulun kuvissa (2819) | D | `tests/pulucam.test.mjs` + `tests/kuvasuurennos.test.mjs` |
| `pakka.isoisankuva.nosto` | kartta | js/fokusvirta.js:2079 (`nostaPuluCamKortti(PULUCAM_POHJA)`) | isoisän kuvan reunan napautus → se päälle | `miettiva` (0,35) | vain kun kuva on pakan alla | nosto ennen karusellia | — | katse isoisän kuvaan | — | D | `tests/pulucam.test.mjs`: pohjakortti järjestyksessä |
| `pakka.poisto` | kartta | js/pulucam.js:475 `piilotaPuluCamPakka` | kaupungista lähtö / uusi luentakuva → pakka pois | — | tekninen siivous, ajastimet seis | — | — | — | — | D | `tests/pulucam.test.mjs` |

**B4 Pulun oma huudahdus ja kommentti**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `pulu.huudahdus.valihuuto` | kartta | js/fokusvirta.js:1004 (`ajastaHuudahdus` → `nayta`), ajastus 979 | kupla kesken luennan → 2 s | `hammastys` (0,45) | kerran per saapuminen; ajoitus = kohdan osuus merkinnän tekstistä | POIKKEUS "ei kesken puheen" -sääntöön: soi kertojan PÄÄLLE hiljempaa (0,7), kertoja ei väisty (js/liviapuhe.js:995) | kuuntelu (`listen`); kupla häipyy 2 s (`HUUDAHDUS_NAKYY_MS`) | katse ylös, lyhyt ele | pieni kupla, ei modaali | D | selain: kaupunki, jonka `pollo.huudahdus.kohta` osuu tekstiin |
| `pulu.huudahdus.varapolku` | kartta | js/fokusvirta.js:1039 (kirjoituskoneen kello) | metatiedot puuttuvat → sama kupla eri kellolla | — (kupla laukaisee saman tunteen kuin yllä) | 1,2 s odotus, sitten `teksti.length * 50 ms * osuus` | ei kahta huudahdusta (`ajastettu`-lippu) | — | — | mykistetyssä pelissä ainoa polku | D | selain mykistettynä: huudahdus tulee silti |
| `pulu.kommentti.alku` | kartta | js/fokusvirta.js:1085 `fokusvirtaSaapumiskupla` → `nayta` (1138/1160) | luenta ohi + tauko → ensimmäinen kupla | `utelias` (0,5) tai kaupungin oma tagi (ks. E3) | kerran per `lauta:kaupunki` (`saapumiskuplaNaytetty`) | odottaa luennan JA paljastussarjan; linssi pysäyttää kellon | ele purkautuu kuplan lukuajan päättyessä | katse pelaajaan | kuplapino nousee oikeasta alanurkasta | D | `node --test tests/fokusvirta.test.mjs` + selain |
| `pulu.kommentti.osa` | kartta | js/fokusvirta.js:1162 `polloPuheenvuoro`, js/liviapuhe.js:863 | seuraava kupla samaan pinoon | sisällöstä (0,3–0,6) | kupla odottaa oman äänitteensä loppuun; kaupungista lähtö katkaisee | uusi kupla häivyttää edellisen | — | — | — | D | selain: monikuplainen kommentti (esim. Sofia) |
| `pulu.kommentti.loppu` | kartta | js/fokusvirta.js:1160 (jatkuuko-vahti) | viimeinen kupla luettu | — | vuoro päättyy hiljaisuuteen; seuraava ele kuuluu Etsi aarre -napille | — | — | — | — | D | selain: kommentin jälkeen ruutu rauhoittuu |
| `pulu.kommentti.odotus` | kartta | js/fokusvirta.js:1204 `kommenttiLuennanJalkeen`, 1120 `odotaPaljastus` | odottaa luentaa/paljastusta enintään katon verran | — | 500 ms kysely; linssin aikana kello pysähtyy | ei saa puhua isoisän päälle | — | — | — | D | `tests/fokusvirta.test.mjs` + selain: ensisaapuminen |
| `pulu.kuplasarja.paluu` | kartta | js/fokusvirta.js:4482, 4721 `polloKuplasarja` | sähkelennon paluu → kuplasarja | `ilo` (0,6) | kerran per sähketehtävä; sarjan loppu vain samassa kaupungissa | aarrepaljastus odottaa sarjan viimeistä kuplaa | — | palaa lennolta, katse pelaajaan | — | D | selain: ratkaise sähketehtävä |
| `pulu.aani.portti.kertoja` | — | js/liviapuhe.js:1008 (`vaista && puhujaAanessa`) | pulun äänite vaikenee, kupla jää | — | tekninen portti; tunne on jo laukennut kuplan alussa | välihuuto (`vaista:false`) kulkee portista ohi | — | — | — | D | `node --test tests/puhevuoro.test.mjs` |
| `pulu.aani.vanhentunut` | — | js/liviapuhe.js:1007 `livianAaniAjanTasalla` | teksti muuttunut → äänite hiljaa | — | sama sopimus kuin puuttuvalla äänitteellä | kupla ja ele säilyvät | — | — | — | D | `node --test tests/livia-aani.test.mjs` |
| `pulu.kaupungista.lahto` | kartta | js/fokusvirta.js:858 `vaiennaLivianKaupunkipuhe` | lähtö → ajastimet, ääni, luentakuva ja nappi pois | — | tekninen katkaisu; kuplat jäävät luettaviksi | katkaisee kaikki B-osan ketjut kerralla | ele purkautuu | — | — | D | selain: siirto kaupungista toiseen kesken luennan |

**B5 Etsi aarre -nappi**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `etsiaarre.nappi.nousu` | kartta | js/etsi-aarre-nappi.js:222 `naytaEtsiAarreNappi` (kutsu js/fokusvirta.js:1168–1172) | kommentti ruudulla → nappi laatan viereen | `jannitys` (0,5); E ehdotti `utelias` 0,45 | kerran per kaupunki; sama kaupunki kahdesti ei tee toista nappia | tulee heti kommentin perään — ei samaan hetkeen kuin ensimmäinen kupla; vähintään 2,8 s väli (js/livia-eleet.js:126) | ele purkautuu 1,5 s | katse nappiin/laattaan | ankkuroitu kartan pisteeseen, toimii molemmilla laudoilla | D | `node --test tests/etsi-aarre-nappi.test.mjs` |
| `etsiaarre.nappi.painallus` | kartta → lehti | js/etsi-aarre-nappi.js:253 | napautus → kaupunkilehti auki, nappi pois | — | lehti ottaa puheenvuoron; ele jäisi modaalin alle | jos lehti ei auennut, nappi palaa | — | — | lehti on modaali | D | `tests/etsi-aarre-nappi.test.mjs`: click avaa dialogin |
| `etsiaarre.nappi.paluu` | kartta | js/etsi-aarre-nappi.js:202 `palautaNappiLehdenJalkeen` | lehti kiinni ilman aarretta → nappi takaisin | `miettiva` (0,35) | vain jos sama kaupunki eikä visa käynnissä | ei nouse visan alle | ele purkautuu 1 s | katse nappiin | — | D | `tests/etsi-aarre-nappi.test.mjs`: close-tapahtuma |
| `etsiaarre.nappi.poistuu` | kartta | js/etsi-aarre-nappi.js:285 (kutsu js/fokusvirta.js:880) | kaupungista lähtö / kätkö löytyi → nappi pois | — | tekninen siivous | — | — | — | — | D | selain: lähde kaupungista napin ollessa kartalla |

**B6 Nostokortit ja tietokortit**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `kortti.nosto.avaus` | kartta + kortti | js/fokusnosto.js:973 `avaaNostonKortti`, 1004 `merkitseLivianNosto` | kortti nousee kartan päälle | sisällöstä: `livianAiheEle` symbolista/tekstistä (0,4–0,6) | kerran per avaus; sama nosto voi avautua uudestaan | pulu siirtyy kortin viereen (js/livia-nostotila.js:38) eikä tekstin päälle | ele purkautuu kortin sulkeutuessa | katse korttiin | kortti ei ole modaali; kapealla siirtyy sivuun (`side`) | K js/livia-nostotila.js:38 (`card`), js/fokusnosto.js:1004 | `node --test tests/nostot-kartalla.test.mjs` |
| `kortti.nosto.sulku` | kartta | js/fokusnosto.js:1082 `suljeNostonKortti` → js/livia-nostotila.js:39 | kortti pois → `cardEnd` | — | paluu perusasentoon, ei uutta elettä | pulu palaa omalle paikalleen kartalla | — | — | — | K js/livia-nostotila.js:39 | `tests/nostot-kartalla.test.mjs` |
| `kortti.nosto.linssiportti` | kartta | js/fokusnosto.js:881, 975 `linssiEstaa` | napautus linssin aikana → ei mitään | — | linssin aikana kaikki muu on kiinni | linssi voittaa | — | — | — | D | `node --test tests/linssikartta.test.mjs` |
| `kortti.nosto.kohdenappi` | kortti → kohdekortti | js/fokusnosto.js:992 | "Katso kartalla" → nosto kiinni, kohde auki | — | siirtymä kortista toiseen, tunne kuuluu kohdekortille | `cardEnd` + uusi `card` peräkkäin — ei kahta elettä | — | — | — | D | selain: nosto, jolla on karttakohde |
| `kortti.nosto.lukunappi` | kortti | js/fokusnosto.js:1007 → js/lukija.js:2147 | "Kuuntele kortti" → luenta | — | luennan aikana kuunnellaan, kuten matkakirjalla | uusi kortti pysäyttää edellisen luennan (js/lukija.js:2161) | — | — | — | D | selain: paina kaiutinta nostokortilla |
| `kortti.nosto.kysymys` | kortti → visa | js/fokusnosto.js:1257 `piirraNostonKysymykset` → js/visa.js:110 | vastaus → `success`/`retry` | `ilo` (0,6) / `miettiva` (0,4) | kerran per vastaus | visa on modaali; ele kortin ulkopuolella | — | katse pelaajaan | modaali | K js/visa.js:110 | `node --test tests/fokusvirta.test.mjs` |

**B7 Isoisän aarremerkintä matkakirjakorttiin**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `matkakirja.aarremerkinta.avaus` | kortti | js/fokusvirta.js:4964 `avaaAarremerkinta` → 5013 `fokusvirtaAarremerkinta` | laatta kääntyi → merkintä korttiin, kirjoituskone | `hammastys` (0,7); E ehdotti `vakava` 0,55 (ks. Epävarmat) | kerran per `lauta:kaupunki` (`fokusaarreKerrottu`) | suuri hetki: voittaa kaikki muut kuplat samassa hetkessä | ele purkautuu ennen kuittausta | katse korttiin | ei modaali; kortti nousee auki | D | `node --test tests/fokusvirta.test.mjs` |
| `matkakirja.aarremerkinta.luettu` | kortti | js/fokusvirta.js:5040 `aarremerkintaLuettu` | kirjoituskone maaliin → tauko → pulun kuittaus | — | tunne kuuluu kuittauskuplalle | varmistus 20 s (js/fokusvirta.js:4990) jos kutsu jää tulematta | — | — | — | D | selain: anna merkinnän kirjoittua loppuun |
| `matkakirja.aarremerkinta.kuittaus` | kartta | js/fokusvirta.js:4858 `kerroAarteesta` | pulun kupla aarteesta ("Tiesin paikan koko ajan…") | `ylpea` (0,6) | odottaa kunnes yksikään dialogi ei ole auki (enintään 40 × 700 ms) | ei nouse modaalin päälle | ele purkautuu kuplan lukuajassa | katse sivuun, nokkava | kartta, ei modaali | D | selain: aarteen löytö, kuittaus tulee lehden sulkeuduttua |

### C. Kaupunkilehti ja maalehti

Kaikki rivit ovat tilassa **D**, paitsi erikseen merkityt: osa-alueella C
EI ole yhtään lehtikohtaista `ilmoitaLivianTilanne`-kutsua (js/lehti.js ja
js/maalehti.js eivät tuo js/livia-tilanteet.js:ää lainkaan). Tila K syntyy
vain lehden kautta avautuvista nostokorteista ja visasta.

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `lehti.avaus` | Kaupunkilehti aukeaa | js/ui.js:13749 (`showModal`) | dialogin avaus → 1. sivu piirretty | `utelias` (0,5) | kerran per avaus, ei uudelleen sivunvaihdosta | väistää kertojan luentaa; ei jonoon jos kohtaamiskupla auki | lepo | lasit päähän (lehti = lukutilanne) | pulu 72 % lehden päällä, iPhonessa vasemmalla | D | Lontoo → "Etsi aarre" → lehti aukeaa |
| `lehti.maalehti.avaus` | Maalehti aukeaa (myös liitenapista) | js/lehti.js:705, :814 | avaus → sivu 1 | `utelias` (0,45) | kerran; ei toistu jos sama maa jo auki | ei keskeytä kaupunkilehden ele-jonoa, korvaa sen | lepo | lasit | sama kuin yllä | D | Kartta → Maiden lehdet → Suomi |
| `lehti.kehittaja.avaus` | Kehittäjän liite / Raamattu-lehti | js/lehti.js:839, :873 | — | — | Kehittäjän työkalu, ei pelaajan sisältöä: pulu ei reagoi | — | — | — | — | D | Kehittäjä-vipu → Raamattu: ei elettä |
| `lehti.sulku` | Lehti sulkeutuu kartalle | js/ui.js:15877 (`closeArrival`) | close → kartta näkyvissä | `lammin` (0,35) | kerran, vain jos lehdessä oltiin > 3 s | ei laukea, jos sulku johtaa suoraan visaan (`etsiKatko`) | lepo | lasit pois | — | D | Lehti auki → Poistu |
| `lehti.sivu.vaihto` | Sivunvaihto alanapista | js/lehti.js:1574 `vaihdaTutkiSivu` | — | — | **Lukurauha:** 5–9 sivun lehdessä ele joka käännöksestä olisi levotonta | — | — | — | — | D | Selaa Lontoon lehti läpi: ei elettä |
| `lehti.sivu.pyyhkaisy` | Sormiveto / nuolinäppäin | js/lehti.js:1861 `kytkeTutkiSelaus` | — | — | sama lukurauha kuin yllä; veto on jo oma animaationsa | — | — | — | — | D | Pyyhkäise iPadilla: pulu paikallaan |
| `lehti.sivu.viimeinen` | Viimeinen sivu luettu | js/lehti.js:1608 `paivitaTutkiAlapalkki` (`viimeisella`) | alapalkki vaihtuu "Poistu" | `ylpea` (0,4) | kerran per lehti (lippu lehtitilaan) | ei jos kätkölaatta laukeaa samalla | lepo | lasit | — | D | Selaa Rooman lehti loppuun |
| `lehti.sisallys.avaus` | Sisällyslevy | js/lehti.js:1774 | — | — | Navigointi, ei sisältö | — | — | — | levy peittää sivun | D | Hampurilainen: ei elettä |
| `lehti.hampurilainen` | Ylälaidan valikkonappi | js/lehti.js:1736 | — | — | sama kuin yllä | — | — | — | — | D | — |
| `lehti.paluu.kartalle` | Sisällyksen "Palaa kartalle" | js/lehti.js:1838 | — | — | Sama tapahtuma kuin `lehti.sulku` (nappi painaa `arrival-no`) | ei omaa riviä, ettei ele tule kahdesti | — | — | — | D | Hampurilainen → Palaa kartalle |
| `lehti.aihe.kaupunki` | Aihesivu, id `kaupunki` (190 sivua) | js/lehti.js:553 → js/maalehti.js:859 | otsikko piirretty | `ylpea` (0,4) | kerran per sivu, aiheen vaihtuessa | ei kesken luennan | lepo | esittelevä (`present`) | — | D | Lontoo → sivu "Lontoo pintaa syvemmältä" |
| `lehti.aihe.historia` | id `historia` (82+89) | js/maalehti.js:859 | otsikko | `miettiva` (0,45); sota/kuolema → **`vakava` (0,5)** | kerran per sivu | `livianAiheEle` pudottaa jo synkän tekstin `listen`-eleeseen | lepo | lasit | — | D | Krakova → Historia |
| `lehti.aihe.luonto` | id `luonto`, `vuoret`, `aavikko` | js/maalehti.js:859 | otsikko | `utelias` (0,45) | kerran per sivu | — | lepo | pään kallistus | — | D | Islanti → Luonto |
| `lehti.aihe.ruoka` | id `ruoka` | js/maalehti.js:859 | otsikko | `lammin` (0,5); leipä/pulla → `ilo` (0,6) | kerran per sivu | pullasana voittaa muun sävyn (`livianAiheEle`) | lepo | — | — | D | Ranska → Ruokaa ja tapoja |
| `lehti.aihe.kulttuuri` | id `musiikki`, `taide`, `kuvataide`, `nykytaide` | js/maalehti.js:859 | otsikko | `lammin` (0,45) | kerran per sivu | — | lepo | — | — | D | Itävalta → Musiikki |
| `lehti.aihe.tekniikka` | id `tiede`, `keksinnot` | js/maalehti.js:859 | otsikko | `miettiva` (0,5) | kerran per sivu | — | lepo | lasit | — | D | Britannia → Keksinnöt |
| `lehti.aihe.kauppa` | id `kauppa`, `menovinkit` | js/maalehti.js:859 (+ listamalli :925) | otsikko | `ylpea` (0,4) | kerran per sivu | — | lepo | asiantuntija | — | D | Italia → Menovinkit |
| `lehti.aihe.sana` | id `kirjallisuus`, `kielet`, `sadut`, `kirjat` | js/maalehti.js:859 | otsikko | `miettiva` (0,4) | kerran per sivu | — | lepo | lasit | — | D | Tanska → Sadut |
| `lehti.aihe.merenkulku` | id `meri`, `laivat` | js/maalehti.js:859 | otsikko | `utelias` (0,5) | kerran per sivu | — | lepo | katse ylös | — | D | Portugali → Meri |
| `lehti.aihe.urheilu` | id `urheilu` | js/maalehti.js:859 | otsikko | `ilo` (0,55) | kerran per sivu | — | lepo | virne | — | D | Brasilia → Urheilu |
| `lehti.aihe.elain` | id `elaimet` | js/maalehti.js:859 | otsikko | `ilo` (0,55); lintujutussa 0,65 | kerran per sivu | lintu/kyyhky nostaa voimakkuutta (pulu itse aiheena) | lepo | — | — | D | Australia → Eläimet |
| `lehti.aihe.huuto` | Skandaalinosto aihesivulla | js/fokusnosto-symbolit.js:637 (symboli), js/maalehti.js:859 | otsikko | `hammastys` (0,55) | kerran per sivu | — | lepo | — | — | D | Kaupunki, jolla skandaalisivu |
| `lehti.aihe.silma` | Havainto-/katsaussivu | js/maalehti.js:859 | otsikko | `utelias` (0,5) | kerran per sivu | — | lepo | katse ylös | — | D | — |
| `lehti.aihe.ihme` | Kadonnut ihme lehtisivulla | js/fokuskohteet.js:4452 (symboli) | otsikko | `hammastys` (0,6) | kerran per sivu | ≥ 0,6 sallittu: ihme on suuri hetki | lepo | — | — | D | Aleksandria → ihmesivu |
| `lehti.aihe.hetki` | id `hetki-*` (33 sivua) | js/packs/kulttuuri-kategoriat.js | otsikko | `jannitys` (0,5) | kerran per sivu | `vakava`, jos hetki on tuho (Lontoon palo, muuri) | lepo | lasit | — | D | Lontoo → "Lontoon palo 1666" |
| `lehti.aihe.vaihto` | Aihesivu vaihtuu toiseksi | js/lehti.js:553 | — | — | Yllä olevat aiherivit ovat aihesivun AINOA reaktio; erillistä vaihtoelettä ei ole | — | — | — | — | D | — |
| `lehti.hero.karuselli` | Herokuvan / avauskuvien selaus | js/lehti.js:2098 → js/nahtavyydet.js:2321 | — | — | Selaus on kuvien katselua, ei tapahtuma | — | — | — | reunakaistat 24 % (js/galleria.js:43) | D | Lontoo → herokuvan nuolet |
| `lehti.kuva.suurennus` | Kuva avataan isoksi | js/ui.js:14441 `naytaKulttuuriKuva` | suurennos avautuu → sulku | `hammastys` (0,5) | kerran per avaus, ei sarjan selauksesta | tekninen laji `photo` (menee läpi myös puheen aikana) | lepo | katse kuvaan | kortti `ui.suurennosIsanta()`, päällimmäinen dialogi | D | Lontoo → napauta Tower Bridgeä |
| `lehti.kuva.sarja.selaus` | Nuolet suurennoksessa | js/ui.js:14478 (`lista`, `indeksi`) | — | — | Sarjan sisällä ele joka kuvasta olisi sekava | — | — | — | — | D | Selaa kansikuvasarjaa |
| `lehti.kuva.sulku` | Suurennos sulkeutuu | js/ui.js:14667 `suljeKulttuuriKuva` | — | — | Paluu lukemiseen — hiljaisuus | — | — | — | — | D | Sulje suurennos |
| `lehti.ennennyt.suurennus` | Ennen/nyt-parin kuva isoksi | js/lehti.js:2084 `piirraPari` | avaus | `hammastys` (0,55) | kerran, kun pari avataan; vain "Nyt"-puoli nostaa voimaa | korvaa `lehti.kuva.suurennus` samalla parilla | lepo | — | — | D | Lontoo → Ennen/nyt → napauta "Nyt" |
| `lehti.matkailijalle.opas` | Matkaopas-kyltti / kuva / linkki | js/nahtavyydet.js:1432, :1447 | opas avautuu | `utelias` (0,5) | kerran per avaus | kolme sisäänkäyntiä, yksi ele | lepo | lasit | oma dialogi `nahtavyys-dialog` | D | Lontoo etusivu → Matkaopas-kyltti |
| `lehti.nahtavyys.avaus` | Nähtävyysjuttu | js/nahtavyydet.js:1637 `avaaNahtavyys` | avaus → sulku | `utelias` (0,5) | kerran per juttu; henkilölinkin vaihto ei toista | jos jutussa hautaus/sota → `vakava` (0,45) | lepo | lasit | — | D | Kohdekartan piste → juttu aukeaa |
| `lehti.nahtavyys.paluu` | Paluunuoli linkkipolulla | js/nahtavyydet.js:1665 | — | — | Navigointi | — | — | — | — | D | Engelin juttu → takaisin |
| `lehti.kartta.suurennus` | Kohdekartta / maakartta isoksi | js/nahtavyydet.js:1015, js/maalehti.js:396 | suurennos | `miettiva` (0,4) | kerran per avaus | — | lepo | lasit | fullscreen-kortti | K osittain (nostotila kytketty, ei omaa tunnetta) | Lontoo etusivu → kartta isoksi |
| `lehti.tekijakortti.avaus` | Lähderivin tekijänappi | js/tekijakortti.js:98, :207 | dialogi auki | `ylpea` (0,35) | kerran; ei toistu samasta tekijästä | pieni ele, ei saa kilpailla lähdetiedon lukemisen kanssa | lepo | lasit | oma `<dialog>` | D | Kuvateksti → tekijän nimi |
| `lehti.uutinen.avaus` | Uutiskortti | js/lehti.js:2262 `avaaUutinen` | kortti auki | `vakava` (0,45) | kerran per uutinen | uutiset ovat päivän tapahtumia: sävy neutraali–vakava, ei virnettä | lepo | lasit | kevythuntu + kortti | D | Suomi-liite → uutinen |
| `lehti.uutinen.kaannos` | "Käännä"-nappi | js/lehti.js:2281 | — | — | Työkalu | — | — | — | — | D | — |
| `lehti.media.radio` | Radionappi (suora lähetys) | js/maalehti.js:306 | soitto alkaa | `ilo` (0,5) | kerran per soiton aloitus, ei pysäytyksestä | lehden radio on `ui.kulttuuriAaniNapista`, EI js/linssit/radio.js (ks. F) | lepo | korva kohti | soitin taustalla | D | Suomi-liite → Yle Radio 1 |
| `lehti.media.vanhaAani` | "Ennen"-tallenne | js/maalehti.js:257 | soitto alkaa | `lammin` (0,5) | kerran | vanha vaharulla → `miettiva` | lepo | — | — | D | Britannia → Ennen-nappi |
| `lehti.saa.vuosikaavio` | Säärivi → vuoden graafi | js/lehti.js:2158 `naytaVuosiSaa` | kortti auki | `utelias` (0,4) | kerran per avaus | — | lepo | lasit | postikortti | D | Lehden mastossa säärivi |
| `lehti.lippu.tarina` | Lipun tarina otsikkorivistä | js/maalehti.js:800 | ikkuna auki | `utelias` (0,45) | kerran | — | lepo | — | — | D | Suomi-liite → lippu |
| `lehti.katko.laatta` | "Etsi kätkö" / aarrekysymys | js/ui.js:13581 `paivitaTehtavaNappi`, :13607 `etsiKatko` | napin painallus → lehti sulkeutuu, visa alkaa | `jannitys` (0,7) | kerran; ≥ 0,7 perusteltu (aarteen kynnys) | voittaa `lehti.sulku`-eleen — sulku ei saa laukaista omaansa | visan tilanne ottaa vuoron | lasit pois | visa on oma dialoginsa | D | Lehden alapalkki → Etsi kätkö |
| `lehti.visa.oikein` / `lehti.visa.vaarin` | Kulttuurivisa lehden sivulla | js/visa.js:110 | vastaus → tulos | `ilo` (0,6) / `lammin` (0,35) | kerran per vastaus | jo kytketty `success`/`retry` | lepo | — | — | K | Vastaa Lontoon visaan |
| `lehti.nosto.syvennys` | Nostokortti / syvennys lehden sivulta | js/syvennys.js:198, js/fokusnosto.js:1004 | kortti auki | aiheen mukaan (`livianAiheEle`) | kerran per kortti | `merkitseLivianNosto` + js/livia-nostotila.js hoitaa; sama polku kuin `kortti.nosto.avaus` (B6) | lepo | — | nostotila | K | Aihesivu → nosto → kortti |
| `lehti.wiki.luelisaa` | "Lue lisää aiheesta" | js/maalehti.js:1143 | — | — | Vie pois pelistä (wikiartikkeli) — ei elettä | — | — | — | — | D | — |
| `lehti.maaliite.avaus` | "Suomi-liite" viimeiseltä sivulta | js/lehti.js:1645 | maalehti aukeaa | — | Sama tapahtuma kuin `lehti.maalehti.avaus`; ei kahta elettä | — | — | — | — | D | Lontoo → viimeinen sivu → Britannia-liite |
| `lehti.lukija.aloitus` | Kaiuttimen luenta lehden sivulla | js/lehti.js:663 `varustaLukija` | — | — | Kertojan luennan aikana pulu KUUNTELEE (tekninen `narration`), ei tunnetagia | — | — | — | — | D (tekninen) | Paina kaiutinta: pulu nyökkää `seuraaLivianKuuntelua`-rytmissä |

### D. Chat, kysymisreitit, mikrofoni ja odotus

Rivit ja tila-merkinnät luettu origin/main -tilasta (v1739); v1738:n
työhaarassa `waiting`/`waitingEnd` ei vielä ole, joten niiden K-merkinnät
pätevät vasta mainin kanssa.

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `chat.avaus` | Chat auki | js/pollo.js:3882 `avaa` → js/livia-eleet.js:196 (`chatOpen`) | napautus → welcome loppuu | `lammin` (0,5) | kerran per avaus; ei toistoa | puhe estää (`if(!puhe)`, :196) | lepo | katse pelaajaan | chat-tila siirtää pulun (js/livia-chat-tila.js:22) | K | Napauta pöllönappia kartalla |
| `chat.avaus.nukkuva` | Chat ilman palvelinta | js/pollo.js:4093 `naytaNukkuva` | paneeli auki | `miettiva` (0,3) | kerran | `chatOpen` ehtii ensin | lepo | — | sama | D | Aja ilman POLLOPALVELINta |
| `chat.sulku` | Chat kiinni | js/pollo.js:4050 `sulje` → js/livia-eleet.js:196 (`chatClose`) | Esc / ulkonapautus → wink | `lammin` (0,35) | kerran | puhe estää | lepo | — | mobiilissa nappirivi palaa | K | Esc auki olevassa chatissa |
| `chat.hiljaiset` | Chat | js/pollo.js:4778 tervehdys, 1942 valmiskysymykset, 4002 `tarkistaKonteksti`, 4684 jatkot, 4405 poiminta | teksti/napit ilmestyvät | — | perusteltu hiljaisuus: käyttöliittymää, ei pelaajan tekoa pulua kohtaan | `chat.avaus` kattaa avaushetken | — | — | — | D | Avaa chat ja selaa lehteä |
| `chat.ehdotus.odotus` | Ehdotusrivi | js/pollo.js:5318 `haeEhdotukset` → 5063 `pyyda` → waiting | haku alkaa → tulos | `miettiva` (0,35) | koko haun ajan, uusinta 8 s välein | odotusrivi vaimentaa muut (js/livia-eleet.js:140) | `palaa()` waitingEnd | — | — | K | Avaa chat kaupungissa ilman valmiskysymyksiä |
| `chat.kysymys.lahetys` | Chat | js/pollo.js:5457 `kysy`, 5506 odotusrivi, 4721 uusintanappi | Enter / nappi → odotusrivi | `utelias` (0,45) | kerran per kysymys | ehtii ennen waiting-elettä | odotukseen | katse kenttään | näppäimistö auki: js/livia-chat-tila.js:37 | D | Kirjoita kysymys ja lähetä |
| `chat.odotus.alku` | Chat, mietintärivi | js/pollo.js:5063/5110 `aloitaLivianOdotus` → js/livia-eleet.js:124 | pyyntö lähtee → 1. pala tai valmis | `miettiva` (0,4) | kerran, ele `think` (lehdessä `scratch`) | ohittaa muut tilanteet; puhe estää | — | lukulasit lehdessä | modaali ei estä | K | Kysy mitä tahansa |
| `chat.odotus.jatkuu` | Sama | js/livia-eleet.js:181 | 8 s välein think/lookRight/reading | `miettiva` (0,35) | kierto 3 eleen sykli | ei jonoteta | — | — | — | K | Hidasta verkkoa devtoolsilla |
| `chat.odotus.pitka` | Sama | js/pollo.js:1434 mietintärivi, 1386 `MIETINNAN_JATKOVIIVE` 6000 | 6 s → rivi vaihtuu `pitkat`-repliikkiin | `hammentynyt` (0,3) | kerran, ei toistoa | ei saa keskeyttää odotuselettä | — | — | — | D | Throttle 3G, kysy pitkä kysymys |
| `chat.vastaus.striimi.alku` | Chat | js/pollo.js:5155 `lopetaOdotus` + 5537 `avaaKupla` | 1. pala → kupla | `utelias` (0,4) | kerran per vastaus | waitingEnd → `palaa()` | lepo | katse kuplaan | — | K (vain waitingEnd) | Kysy ja katso ensimmäistä palaa |
| `chat.vastaus.valmis` | Chat | js/pollo.js:5688 (`answer`, js/livia-eleet.js:132) | teksti valmis → ele repliikin sävystä | `ylpea` / `lammin` (0,5) | kerran; vain aito vastaus | ei varatekstille eikä katkenneelle | lepo | — | — | K | Kysy onnistuva kysymys |
| `chat.vastaus.varateksti` | Chat | js/pollo.js:5628 (`varateksti`/`syy`) | worker kieltäytyy | hammentynyt (0,3) | kerran | `answer` on nimenomaan estetty tässä | lepo | — | — | K/T (v1745) | Kysy kysymys, johon worker kieltäytyy |
| `chat.vastaus.katkesi` | Chat | js/pollo.js:5645 virherivi "Ajatus katkesi" | virta katkeaa | hammentynyt (0,4) | kerran | uusintanappi seuraa | lepo | — | — | K/T (v1745) | Katkaise verkko kesken striimin |
| `chat.virhe` | Chat | js/pollo.js:5710 catch, 5717 virheviesti | pyyntö kaatuu → virherivi | hammentynyt (0,5) | kerran | keskeyttää odotuseleen (waitingEnd finally) | `palaa()` | — | — | K/T (v1745) | Estä workers.dev route |
| `chat.virhe.kayttoraja` | Chat | js/pollo.js:5731 päiväraja/kuukausiraja | raja täynnä → virherivi ilman uusintanappia | vakava (0,4) | kerran | erottuu tavallisesta virheestä | `palaa()` | — | — | K/T (v1745) | Kuluta päiväraja |
| `chat.peruutus` | Chat | js/pollo.js `kysy` (AbortController per kierros) → `sulje` peruu vain oman pyynnön (v1744) | sulku kesken pyynnön → pyyntö perutaan, waitingEnd heti | — | kerran per sulku; muiden kanavien haut jatkuvat | ratkaistu v1744: chatClose ja waitingEnd samassa hetkessä, vanha vastaus tai finally ei koske uuteen kysymykseen | lepo | — | — | K (v1744) | Kysy hidas kysymys, sulje chat, kysy uusi → vanha tulos ei näy (tests: 7 peruutustestiä) |
| `chat.linkki.matkakirja` | Vastauksen linkki | js/pollo.js:4643 `sidoLinkki` → 4152 `avaaKohde` | napautus → kohde aukeaa | `utelias` (0,4) | kerran per napautus | chat sulkeutuu; chatClose ehtii päälle | lepo | katse linkkiin | mobiilissa vie pois chatista | D | Kysy nähtävyydestä, napauta alleviivausta |
| `chat.vastaus.kuva` | Vastauksen kuva | js/pollo.js:4328/4475, popup 4212 | kuva latautuu vastaukseen | `utelias` (0,4) | kerran per kuva | sama sääntö kuin linkillä | lepo | katse kuvaan | popup mobiilissa koko leveys | D | Kysy kuvallinen kysymys |
| `chat.paikka.kartalla` | Kartta + chat | js/pollo.js:5426 `naytaPaikkaKartalla`, 5443 paikkarivi | kysymys tunnistaa paikan → kamera | `utelias` (0,5) | kerran per kysymys | kilpailee odotuseleen kanssa | odotukseen | katse karttaan | — | D | Kysy "Missä Ateena on?" |
| `chat.aani.asetus` | Chatin kaiutinnappi | js/pollo.js:2135 `vaihdaAani`, 181 `POLLO_AANI_AVAIN` | napautus → vipu | `lammin` (0,3) | kerran; ei toistoa vaihtelussa | luenta alkaa heti perään | lepo | — | — | D | Napauta kaiutinta vastauksen jälkeen |
| `chat.luenta.alku` / `chat.luenta.tauko` / `chat.luenta.loppu` | Chat, pöllön ääni | js/lukija.js:1403/1371/1537, js/puhe.js:884 → js/livia-eleet.js:187, js/livia-puhetila.js:21 | puhe alkaa → nokka liikkuu → tauko palauttaa ilmeen | — (tekninen) | koko puheen ajan, jokainen tauko | puhe estää chatOpen/waiting/answer-eleet | js/livia-eleet.js:191 palauttaa odotuseleen | nokka rytmissä | — | K | Kytke kaiutin, kysy, sulje chat kesken luennan |
| `chat.nappaimisto` | Puhelin, chat auki | js/livia-chat-tila.js:37 `paivita` (visualViewport) | näppäimistö auki / kiinni | — | geometria, ei ele | `paikkaMuuttui` vain piirtää | — | — | mobiili: pulu näppäimistön yläpuolelle | K | Avaa chat puhelimella, kosketa kenttää |
| `mikrofoni.alku` | Sanelu | js/pollo.js:5776 `merkitseMikki` → `microphone`; natiivi 5829 | napautus → listen | `jannitys` (0,4) | kerran per sanelu | ei toistu osittaisista | lepo | katse pelaajaan | iOS-sanelupalkki muuttaa viewportin | K | Napauta mikkiä ja puhu |
| `mikrofoni.kuuntelu` | Tilarivi | js/pollo.js:5971 käynnistys, 5947 `onaudiostart`, 5852 sanelu-alkoi, 5938 `onresult` | "Käynnistän…" → "Kuuntelen…" → teksti | — | perusteltu hiljaisuus: pulu ei elehdi puhujan päälle; `mikrofoni.alku` kattaa | — | — | katse jää pelaajaan | — | D | Napauta mikkiä ja seuraa tilariviä |
| `mikrofoni.loppu` | Sanelu | js/pollo.js:5953 `onend` → 6067 `lopetaSanelu`; 5904/2188 ei-tuettu → kirjoitustila | lopetus → kysy | — | `chat.kysymys.lahetys` ottaa vuoron; mikitön laite ei näytä nappia | `merkitseMikki(false)` ei laukaise mitään | — | — | `oikaiseNakyma` 5761 | D | Paina "Lopeta"; aja ilman SpeechRecognitionia |
| `mikrofoni.eikuullut` | Tilarivi | js/pollo.js:5966 / 6161 (`no-speech`), muu virhe 6178 | hiljaisuus → "En kuullut mitään" | hammentynyt (0,3) | kerran per yritys | — | lepo | — | — | K/T (v1745) | Napauta mikkiä ja ole hiljaa |
| `mikrofoni.virhe.lupa` | Tilarivi | js/pollo.js:6136 (`not-allowed`) | lupa evätty → kirjoitustila | hammentynyt (0,5) | kerran | vaihtaa kirjoitustilaan | lepo | — | selaimen lupakysely päällä | K/T (v1745) | Estä mikrofonilupa selaimessa |
| `mikrofoni.virhe.audiocapture` | Tilarivi | js/pollo.js:6144 (hiljainen uusinta 400 ms), 6165 diagnoosi | 2. epäonnistuminen → "Mikrofonia ei löytynyt (…)" | hammentynyt (0,45) | vain toisella kerralla, ei uusinnasta | ensimmäinen yritys hiljainen | lepo | — | iOS-erikoistapaus | K/T (v1745) | Varaa mikki toiselle sovellukselle |
| `kupla.vihje` / `kupla.lisavihje` | Kartta, chat kiinni | js/pollo.js:2340 `naytaVihje`, 2414 lisävihje → 2969 `kasvoEleet.kupla` | kupla ilmestyy → repliikin ele | `utelias` (0,4) | kerran per kupla | odotusrivi estää (js/livia-eleet.js:205) | lepo | — | linssi estää kokonaan | K | Jätä valinta tekemättä, odota vihjettä |
| `kupla.vihje.valikko` | Hampurilaisnappi | js/pollo.js:2374 (pinon ohi) | kupla ylös | `utelias` (0,4) | ei kulje `lisaaPinoon` → EI elettä | tekninen puute (ks. puutelista) | — | — | — | D | Laukaise valikkovihje |
| `kupla.saapuminen` | Kaupunki | js/pollo.js:2464 `naytaSaapumiskupla` | luennan jälkeen | `lammin` (0,5) | kerran per saapuminen | linssi jonottaa (`lykkaaLinssiin` 3176); sama hetki kuin `pulu.kommentti.alku` (B4) | lepo | — | chat auki: vain virtaan | K | Saavu uuteen kaupunkiin |
| `kupla.avaus` | Aloitusvalinta | js/pollo.js:2518 `naytaAvauskupla` (`lennahda` → clumsyLand) | sarjan avaus | `ilo` (0,5) | kerran sarjan alussa | linssi estää ilman jonoa; ks. `avaus.repliikki` (A) | lepo | — | nappi piilossa, kupla silti | K | Käynnistä peli alusta |
| `kupla.paljastus` | Aloitusvalinta | js/pollo.js:2518 + js/livia.js kuittaussarja | napautus vie seuraavaan | `hammastys` (0,7) | kerran; suuri hetki | sarja odottaa napautusta; ks. `paljastus.tuuraus.*` (A) | lepo | katse pelaajaan | — | D | Napauta avauskuplia läpi |
| `kupla.juhla` | Kartta | js/pollo.js:3339 `naytaOnnittelu` (`pollo-vihje-juhla`) | tehtävä ratkeaa | `ilo` (0,7) | kerran per juhla | linssi jonottaa | lepo | — | kuvan lataus siirtää pinoa | K | Ratkaise fokustehtävä |
| `kupla.pino` | Kuplapino | js/pollo.js:2698/2712/3525, 6408 | laajennus, supistus, tyhjennys | — | pelkkää käyttöliittymää | — | — | — | — | D | Laajenna pino napauttamalla |
| `kupla.linssi` | Välinäytös | js/pollo.js:6392 `polloLinssikupla` → 3580 `naytaPuheenvuoro` | linssin oma kommentti | `miettiva` (0,45) | ohittaa linssiportin | vain js/aikajana.js:5434; ks. `linssi.keksinnot.merkkipaalu.pulu` (F) | lepo | — | linssi päällä | K | Avaa merkkipaalun välinäytös |

### E. Aarteenetsintä, kohtaamiset ja tarinan tunnetilanteet

Koko E-alueella ei ole yhtäkään `ilmoitaLivianTunne`-kutsua eikä yhtäkään
`tunne`-kenttää sisällössä (ainoa tagi koko pelissä on
js/linssit/ihmisen-matka-esitys.js:1546). Poikkeus: 45 kaupungin
saapumiskommentin tagit merkitään sisältöön v1741:ssä (`pollo.tunne`),
jolloin niiden Tila on **M/K (v1741)**.

**E1 Aarteenetsintä — vihjeestä löytöön**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `aarre.lehti.avautuu` | kaupunkilehti | js/etsi-aarre-nappi.js (painallus → `ui.avaaTutkinta(city,{ohitaLehtilukko:true})`); js/lehti.js | lehden ensimmäinen sivu piirtyy | — (perusteltu hiljaisuus) | lehti on lukutila; pulu ei elehdi sivunkäännöksiin | tekninen `card` riittää; vrt. `lehti.avaus` (C) | — | — | modaali, pulu sivussa | D | tests/lehdet.test.mjs |
| `aarre.lehti.aarrekysymys` | kaupunkilehden aarretehtävä | js/fokustehtavat.js `piirraSivunTehtava`, `aarteenAvaajat` | tehtävälaatikko piirtyy sivulle | `utelias` (0,5) | kerran per kaupunki, kun aarrekysymys ensi kertaa näkyy | ei kilpaile lehden luennan kanssa | palaa perustilaan | — | modaali | D | tests/fokusvirta.test.mjs |
| `aarre.vihje` | visakortti, "Vihje (40 p)" | js/visa.js `renderQuiz` (`ui.quizHint`); js/game.js `actionHint` (HINT_PRICE) | nappi painetaan → vihjeteksti näkyviin | `miettiva` (0,45) | kerran per kysymys (`quiz.hintShown`) | ei keskeytä kirjoituskonetta; laukeaa vasta kun vihjerivi on esillä | perustila | katse vihjeriviin | modaali (quiz-dialog) | D | tests/visajakauma.test.mjs |
| `aarre.vihje.pulla` | lehden aarretehtävä, pullanappi | js/fokustehtavat.js `pullaOstosnappi`; js/game.js `actionPullaVinkki` / `actionPullaOstos` | ostos onnistuu → vihreä piste kartalle | `ilo` (0,6) | kerran per kaupunki (`pullaVinkit`); toinen yritys palaa virheellä ilman elettä | pulla on Livian oma persous (Raamattu) — saa olla suurempi kuin muu vihje | perustila | — | modaali | D | tests/fokusvirta.test.mjs |
| `aarre.vihje.pulla.eiVaraa` | sama | js/game.js `actionPullaOstos` → `{ok:false,error:'Rahat eivät riitä'}` | virheilmoitus | `hammentynyt` (0,4) | ei toistoa samalla painalluksella | ks. myös `peli.raha.eiRiita` (E5, hiljaisuus) | perustila | — | modaali | D | — (ei omaa testiä) |
| `aarre.5050` | visakortti | js/visa.js `renderQuiz` (`ui.quizFifty`); js/game.js `actionFifty` | kaksi väärää katoaa | `miettiva` (0,4) | kerran per kysymys (`quiz.hidden.length`) | ei päälle kirjoituskoneen | perustila | — | modaali | D | tests/visajakauma.test.mjs |
| `aarre.kysymys.tervehdys` | kohtaamiskortin sivu 1 | js/visa.js `renderQuiz` → `avaus()`; teksti js/packs/tarinakaari.js `kohtaaminen` tai js/packs/kohtaamiset.js `tervehdys` | otsikko kirjoittuu → tervehdys → "Aloita peli" | ks. E2 (`kohtaaminen.<id>.tervehdys`) | tervehdys vain ENSIMMÄISELLÄ kerralla (`ui.kohtaamisetNahty`) | kirjoituskone päällä — tagi kuplan/jakson ALUSSA, ei kesken | perustila | katse hahmon kuvaan | modaali, kuva iso | D | tests/kohtaamistesti.test.mjs |
| `aarre.kysymys.viimeinenYritys` | sivu 1, varoitusrivi | js/visa.js `VIIMEISEN_YRITYKSEN_VAROITUS`, `viimeinenYritys` | varoitus nousee napin ylle | `jannitys` (0,6) | vain kun `yritysLuku.nyt >= kaikki` (2/2) | voittaa tervehdyksen tagin — sävy on nyt varoitus | perustila | — | modaali | D | tests/kohtaamistesti.test.mjs |
| `aarre.kysymys.esilla` | kohtaamiskortin sivu 2 | js/visa.js `pelkistaKysymysvaihe(ui,true)`, `kysymys()`, `vaihtoehdot()` | kuva kutistuu, kysymys ja vaihtoehdot esiin, tiimalasi käynnistyy | `jannitys` (0,45) | kerran per kysymys | ei toistu `renderQuiz`-uusinta-ajoilla (`ui.typedQuizFor`) | perustila | katse vaihtoehtoihin | modaali; `.quiz.kysymysvaihe` mahduttaa puhelimeen | D | tests/kohtaamistesti.test.mjs |
| `aarre.tiimalasi.loppusuora` | tiimalasi | js/visa.js `tickTimer` / `updateTimer` (`urgent`, `sfx.play('tick')` kun ≤ 10 s) | 10 s jäljellä → 0 | `jannitys` (0,6) | kerran per kysymys, kun `whole === 10` | ei jonoteta joka sekunnille; vanhentunutta elettä ei jonoteta | perustila | — | modaali | D | tests/visajakauma.test.mjs |
| `aarre.vastaus.oikein` | tuomiorivi | js/visa.js `answerQuiz` → `sfx.play('correct')`, `liviaVisaJalkiele(ui,true)` | "Oikein!" → paljastus | `ilo` (0,6) | kerran per vastaus; tekninen `success` tulee vasta dialogin sulkeuduttua | tunnetagi tuomion hetkellä, tekninen `success` erikseen | perustila | katse tuomioriviin | modaali | D | tests/livia-tilanteet.test.mjs, tests/kohtaamistesti.test.mjs |
| `aarre.vastaus.vaarin` | tuomiorivi | js/visa.js `answerQuiz` (`quiz.right === false`), `liviaVisaJalkiele(ui,false)` | "Väärin." → oikea vastaus + "vielä yksi yritys" | `hammentynyt` (0,4) | kerran per vastaus | ei saarnaa; toimituslinjan kiinteä 0,4. Vain tämä TAI `kohtaaminen.<id>.vaarin` | perustila | katse pois kortilta | modaali | D | tests/kohtaamistesti.test.mjs |
| `aarre.vastaus.aikaLoppui` | tuomiorivi | js/visa.js `timeUp` → `game.timeoutQuiz()` | "Aika loppui!" | `hammentynyt` (0,4) | kerran; sama kuin väärä vastaus | ei erillistä elettä tiimalasin loppuun JA tuomioon | perustila | — | modaali | D | tests/visajakauma.test.mjs |
| `aarre.uusiYritys` | tuloskortti, ohje | js/visa.js `UUSI_YRITYS_OHJE` (`quiz.kaari && !quiz.aarreLukittui`) | ohjerivi näkyviin | `miettiva` (0,45) | vain kaarikaupungissa ensimmäisen väärän jälkeen | korvaa `aarre.vastaus.vaarin`-tagin, ei tule sen perään | perustila | — | modaali | D | tests/kohtaamistesti.test.mjs |
| `aarre.lukittui` | tuomio + tuloskortti | js/visa.js `lukkoRivi(quiz)`; js/game.js `lukitseAarre` (r. 1794) | "Aarre jäi löytymättä — <nimi> ei kerro enempää." | `vakava` (0,6) | kerran per kaupunki; lukko on pysyvä (`aarreLukot`, tallenteessa) | voittaa `hammentynyt`in: menetys on vakava, ei hämmentävä | perustila | katse alas | modaali | D | tests/kohtaamistesti.test.mjs |
| `aarre.paljastus.alku` | paljastuslappu (overlay) | js/ui.js `playTokenReveal` (r. 18907), `rakennaPaljastus` | musta ruutu → kuva nousee | `jannitys` (0,6) | kerran per laatta (`ui.revealShownFor`) | tunnetagi lapun ALUSSA; kuvan nousun aikana ei uutta tagia | perustila | katse kuvaan | oma overlay quiz-dialogin päällä; pulu jää alle | D | tests/livian-paljastus.test.mjs |
| `aarre.loyto` | paljastuslappu, nimirivi | js/ui.js `playTokenReveal` (paikallisaarre / mannerAarre); js/game.js `revealToken` default-haara | "Löysit: …" + arvo | `ilo` (0,75) | kerran per laatta | **suuri hetki** — toimituslinjan ≥ 0,7 | palaa perustilaan lapun sulkeuduttua | katse ylös kuvaan | modaali, kuva 56 px kortilla / koko ruutu overlayssä | D | tests/livian-paljastus.test.mjs, tests/paikallisaarteet.test.mjs |
| `aarre.loyto.unohdettu` | paljastuslappu, "Aarnin luettelo" | js/ui.js `playTokenReveal` (`type === 'star'`); js/game.js `revealToken` case 'star' | diplomiteksti ja leima "Löydetty" | `ylpea` (0,8) | kerran per manner (`world.starsFound`) | pelin suurin hetki mantereella; voittaa kaiken muun | perustila | katse suoraan, ylväs | modaali | D | tests/tahdet.test.mjs, tests/livian-paljastus.test.mjs |
| `aarre.loyto.pollo` | Livian oma paljastuskortti | js/ui.js `naytaPolloAarre` (r. 19131); js/pollo.js `POLLO_AARRE` | "Se liikkui — kätkössä oli jotain elävää!" → esittely | `lammin` (0,7) | KERRAN PER PELI (ensimmäinen laatta, `polloPaljastus`) | Livia esittelee itsensä — tagi on hänen omansa, ei reaktio | perustila | katse suoraan pelaajaan | modaali | D | tests/livian-paljastus.test.mjs, tests/pollo.test.mjs |
| `aarre.loyto.katko` | tuloskortti, laatattoman löytö | js/visa.js `renderQuiz` (`quiz.explore` + `TARINAKAARI[..].aarre`), kätkökuva | "Kätkö löytyi! +200 puntaa." + kaaren aarreteksti | `ilo` (0,7) | kerran per kaupunki | sama painoarvo kuin laatan löydöllä | perustila | — | modaali | D | tests/kohtaamistesti.test.mjs |
| `aarre.palkkio.explore` | ilmoituskupla | js/game.js `answerQuiz` → `emit('aid', 'Löytöpalkkio +200 puntaa')` (r. 2415) | palkkiokupla | `ilo` (0,5) | kerran per kaupunki | ei omaa elettä, jos `aarre.loyto.katko` juuri laukesi — yksi tagi riittää | perustila | — | kartta/ilmoituskerros | D | tests/rules.test.mjs |
| `aarre.mannerlento` | lokirivi / kupla | js/game.js `MANNERLENTO_ILMOITUS` (r. 53), `revealToken` case 'star' | "Mantereen aarre on laukussa…" | `jannitys` (0,6) | vain jos jollakin muulla mantereella on aarre kateissa | seuraa `aarre.loyto.unohdettu`-tagia; ei omaa elettä, jos ilmoitusta ei tule | perustila | — | ilmoituskerros | D | tests/rules.test.mjs |
| `aarre.ennatys` | passileima | js/game.js `noteRecord` (r. 1150–1157), `RECORD_DAYS` = 80 | "Isoisän ennätys oli 80 päivää — se on nyt rikottu." | `ylpea` (0,7) | kerran per peli (`recordNoted`) | suuri hetki; yli 80 päivän haara on `peli.ennatys.ohi` (E5) | perustila | — | ilmoituskerros | D | tests/rules.test.mjs |
| `aarre.sahke.avaus` | pöllön sähketehtävä | js/packs/fokusvirta-tukholma.js `sahketehtava`, js/packs/fokusvirta-sofia.js; moottori js/game.js `avaaAarreSahkeella` (r. 1846) | sähke piirtyy, aukot auki | `utelias` (0,55) | kaksi kaupunkia (tukholma, sofia); yrityksiä EI rajata | — | perustila | katse sähkeeseen | modaali | D | tests/sahketehtava.test.mjs |
| `aarre.sahke.oikein` | sähketehtävä | js/game.js `avaaAarreSahkeella` → `emit('aid', 'Sähkepalkkio …')` (r. 1863) | aarre aukeaa ilman lukitusriskiä | `ilo` (0,7) | kerran per tehtävä | sama painoarvo kuin visan löydöllä; ks. `pulu.kuplasarja.paluu` (B4) | perustila | — | modaali | D | tests/sahketehtava.test.mjs |
| `aarre.sahke.vaarin` | sähketehtävä | js/fokusvirta.js (r. ~4311) | palkkio pienenee | `hammentynyt` (0,4) | joka ohilyönnillä; ei kasvavaa voimakkuutta | ei vakavaa: aarre ei lukitu koskaan | perustila | — | modaali | D | tests/sahketehtava.test.mjs |
| `aarre.rosvo.alku` | kaksintaistelukortti | js/game.js `revealToken` case 'robber'; js/visa.js `renderDuel` | "Ryöstäjä yllätti…" | `jannitys` (0,7) | kerran per laatta | rosvo EI ole aarre — ei ilo-tagia, ei laukkuheilautusta | perustila | katse ylös, säikähdys | modaali | D | tests/rules.test.mjs |
| `aarre.rosvo.helpotus` | kaksintaistelu | js/visa.js `renderDuel` (`duel.reliefs`) | rahat puolittuvat | `hammentynyt` (0,5) | enintään kahdesti (`reliefs >= 2`) | — | perustila | — | modaali | D | tests/rules.test.mjs |
| `aarre.rosvo.voitto` | tuloskortti | js/visa.js `answerDuelUi` (`duel.right`) | "Voitit rosvon — saalis N puntaa!" | `ilo` (0,65) | kerran per kaksintaistelu | alle löytökynnyksen (0,7): saalis ei ole aarre | perustila | — | modaali | D | tests/rules.test.mjs |
| `aarre.rosvo.tappio` | tuloskortti | js/visa.js `answerDuelUi` / `timeUp` (duel-haara) | "Rosvo vei rahat" | `vakava` (0,55) | kerran | menetys on vakava, ei hämmentävä | perustila | — | modaali | D | tests/rules.test.mjs |

Osa-alueen E rivit `aarre.nappi.ilmestyy`, `aarre.merkinta` ja
`aarre.kuittaus` on yhdistetty osa-alueen B riveihin
`etsiaarre.nappi.nousu`, `matkakirja.aarremerkinta.avaus` ja
`matkakirja.aarremerkinta.kuittaus`.

**E2 Kohtaamiset**

Kohtaamisia on kahdesta lähteestä, eivätkä ne ole päällekkäisiä samassa
hetkessä (js/visa.js: `kaariTarina` voittaa kaupungin ensimmäisessä
aarrevisassa): js/packs/tarinakaari.js `TARINAKAARI` (41 kohdetta,
aineisto js/tyohuone-kehitys-data.js `KAARI_PAKETIT`) ja
js/packs/kohtaamiset.js `KOHTAAMISET` (8 kaupunkia). Lisäksi
js/packs/fokusvirta-*.js kentässä `kohtaaminen` (39 täyttä
fokuskaupunkia; Tukholmalla ja Sofialla myös `sahketehtava`).

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `kohtaaminen.<id>.tervehdys` — yhteiset ehdot (41 + 8 riviä) | visakortin sivu 1 | js/visa.js `renderQuiz` → `tervehdys`; js/packs/tarinakaari.js / js/packs/kohtaamiset.js | tervehdys kirjoittuu → "Aloita peli" | oletus **`lammin` (0,5)**; poikkeukset alla | kerran per pakka+kaupunki (`ui.kohtaamisetNahty`) | ei kertojan luennan päälle (kertoja ei lue tervehdystä); tagi kuplan alussa | perustila | katse hahmon kuvaan (js/kohtaamiskuvat-data.js) | modaali, kuva iso; sivulla 2 kuva kutistuu | D | tests/kohtaamistesti.test.mjs, tests/kohtaamisbriefit.test.mjs |
| `kohtaaminen.<id>.loyto` — yhteiset ehdot | tuloskortti | js/visa.js `renderQuiz` (`quiz.explore` tai `quiz.found` → `kohtaaminen.loyto`) | hahmon repliikki löydöstä; Lontoossa myös `loytoLuenta` (ääni) | **`ilo` (0,7)** | kerran per kysymys; luenta vain kerran (`ui.loytoLuentaFor`) | jos luenta soi, tagi ENNEN luentaa, ei kesken | perustila | katse hahmoon | modaali | D | tests/kohtaamistesti.test.mjs |
| `kohtaaminen.<id>.tyhja` — yhteiset ehdot | tuloskortti | js/visa.js (`kohtaaminen.tyhja`) | "Tyhjä…" | `miettiva` (0,45) | kerran; ei lueta ääneen | ei `hammentynyt`: oikea vastaus meni silti oikein | perustila | — | modaali | D | tests/kohtaamistesti.test.mjs |
| `kohtaaminen.<id>.vaarin` — yhteiset ehdot | tuloskortti | js/visa.js (`kohtaaminen.vaarin`) | lohdutusrepliikki | `hammentynyt` (0,4) | kerran; ei lueta ääneen | sama tagi kuin `aarre.vastaus.vaarin` — vain toinen laukaistaan | perustila | — | modaali | D | tests/kohtaamistesti.test.mjs |
| `kohtaaminen.kuva.avaus` | kohtaamiskuva suurennoksena | js/visa.js `ui.naytaKohtaamiskuva`; js/kohtaamiskuvat-data.js; js/kuvatekstit.js | kuva avataan koko näytölle | `utelias` (0,45) | joka avauksella, mutta enintään kerran per kortti | ei kilpaile tervehdyksen kanssa | perustila | katse kuvaan | lightbox | D | tests/kohtaamiskuvat.test.mjs, tests/kuvasuurennos.test.mjs |
| `kohtaaminen.varmistus` | varmistuskysymys | js/packs/fokusvirta-*.js `kohtaaminen.varmistus` | dialogi ("Haluatko varmasti tavata Dafnin juuri nyt?") | `jannitys` (0,5) | kerran per painallus | — | perustila | — | modaali | D | tests/fokusvirta.test.mjs |
| `kohtaaminen.piste` | kartan vihreä piste | js/fokuspiste.js; js/fokusvirta.js `fokusvirtaKohtaaminenPisteessa`; data `kohtaamispiste` | piste syttyy kartalle | `ilo` (0,55) | kerran per kaupunki; sammuu kun aarre on avattu | ei toistu joka piirrolla | perustila | katse pisteeseen | kartta | D | tests/fokusvirta.test.mjs |

Poikkeukset tervehdyksen oletustagiin (sävy voittaa luokan,
js/livia-tilanteet.js `livianAiheEle`-periaate):

| Kaupunki | Hahmo | Tunne (voim.) | Perustelu |
| --- | --- | --- | --- |
| venetsia | naamiontekijä Lucia | `rakkaus` (0,55) | Venetsia = Livian rakkauskohtaus (Raamattu; ks. E4). Matalampi kuin albumi, koska kohtaaminen on eri hetki |
| kairo | kirjakauppias Faruk | `jannitys` (0,6) | ainoa tervehdys, joka nimeää isoisän kirjan ja "kartan, jota ei ollut muilla" |
| madrid | kellomestari Pilar | `miettiva` (0,5) | "Odota. Ensin kerrot, mistä sait tuon kirjan." — epäluulo, ei lämpö |
| berliini | posetiivari Otto | `lammin` (0,6) | posetiivi + isoisän muisto; lämpimin tervehdys |
| lontoo | muotialan opiskelija Leila | `utelias` (0,55) | kuvakulmien vertailu, ei tarinaa isoisästä |
| dubrovnik | merimelontaopas Mara | `utelias` (0,5) | mereltä piirretty kuva, käytännön ehdotus |
| odessa | torimyyjä Iryna | `lammin` (0,5) | "vanhaa paperia … varovasti kuin munakennon" |
| tukholma | konemestari Elsa | `ylpea` (0,5) | kone ja suku — Livia arvostaa asiantuntijaa |
| kiova, odessa, varsova, sarajevo (kaari) | — | `vakava` (0,55) | kaupungit, joiden nykytilanne on sodan varjossa (ks. E3) |

**E3 Tarinan tunnetilanteet kaupungeittain**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `tarina.kaupunki.kommentti` — yhteiset ehdot | Livian kupla kartalla (kevyt kulku) / pöllön kortti | js/fokusvirta.js `fokusvirtaSaapumiskupla`, `fokusvirtaMerkintaLuettu`; data js/packs/fokusvirta-*.js `pollo.kommentti[0]` | isoisän merkinnän luenta/kirjoitus loppuu → `MERKINNAN_TAUKO_MS` 1400 ms → kupla | kaupunkikohtainen, ks. taulukko alla | kerran per saapuminen (`ui.saapumiskuplaNaytetty`); yksi kupla per kaupunki | EI kertojan luennan päälle — tagi vasta kuplan alussa; `SAAPUMISKUPLA_VAITI` nyt tyhjä. Tekniset ehdot: `pulu.kommentti.alku` (B4) | perustila kuplan sulkeuduttua | katse merkinnästä pelaajaan | kartta, ei modaali; kupla lähtee kelluvasta pulunapista | M/K (v1741) | tests/fokusvirta.test.mjs, tests/luentakuva.test.mjs |
| `tarina.kaupunki.merkinta.alku` | matkakirjakortti | js/ui.js `renderFact`; js/fokusvirta.js `fokusvirtaMatkakirja`; data `matkakirja.teksti` + `luenta` + `aanite` | luenta/kirjoituskone alkaa | `vakava` (0,4) tai — | kerran per saapuminen | **kuuntelutila**: tekninen `narration` hoitaa eleet; sisältötagia EI saa laukaista kesken luennan | narrationEnd | katse kirjaan | kartta + luentakuva (`matkakirja.luentakuva`) | D | tests/luentakuva.test.mjs, tests/luentakuvakartta.test.mjs |

Kaupunkikohtaiset tunnetagit (45 kpl, kentästä `pollo.kommentti[0]`).
Perustelu = saapumiskommentin sävy sanatarkasti luettuna. Tila
**M/K (v1741)**: tagit merkitään `pollo.tunne`-kenttään fokusvirta-*.js
-pakkeihin ja js/fokusvirta.js:n kutsu tehdään samassa julkaisussa.

| ID | Tunne (voim.) | Perustelu (kommentin sävy) | Tila |
| --- | --- | --- | --- |
| `tarina.ateena.kommentti` | `ilo` (0,5) | rahamuseo vs. "tarkistan ensin kahvilan pihan" — oma agenda, kuiva itseironia | M/K (v1741) |
| `tarina.sofia.kommentti` | `ilo` (0,45) | "Maa ei ole korottanut hintaa arvonimen takia" — kuiva vitsi | M/K (v1741) |
| `tarina.istanbul.kommentti` | `lammin` (0,5) | myötätunto kantajalle: "missä saa levätä" | M/K (v1741) |
| `tarina.rooma.kommentti` | `miettiva` (0,45) | "minäkin käyttäydyn siellä kuin vieras" — nöyrä huomio | M/K (v1741) |
| `tarina.bukarest.kommentti` | `ilo` (0,55) | ruoka-into: "Minä löydän keittiön samoin" (persous) | M/K (v1741) |
| `tarina.sarajevo.kommentti` | `lammin` (0,5) | hyväntahtoinen kuittaus isoisälle: "Hyvä alku" | M/K (v1741) |
| `tarina.madrid.kommentti` | `ilo` (0,5) | "isoisä huomasi vallanvaihdon, minä koiran" — eläinperspektiivi | M/K (v1741) |
| `tarina.wien.kommentti` | `lammin` (0,55) | "ymmärsi koneita, mutta tuossa hän ymmärsi ihmistä" | M/K (v1741) |
| `tarina.pariisi.kommentti` | `ilo` (0,55) | "Leipä kainalossa? Olisin seurannut minäkin" — pullapersous | M/K (v1741) |
| `tarina.berliini.kommentti` | `vakava` (0,5) | poika ja poljettu lehti: "Poikaa mietin minäkin" | M/K (v1741) |
| `tarina.lontoo.kommentti` | `ylpea` (0,5) | "en vaihtaisi taivasta pehmustettuun penkkiin, Fogg" | M/K (v1741) |
| `tarina.budapest.kommentti` | `ilo` (0,5) | "Kerrankin ihmisillä on oikea kerros" — nokkava korkeusvitsi | M/K (v1741) |
| `tarina.dubrovnik.kommentti` | `utelias` (0,45) | "olisin laskenut nokat ennen juomista" — laskeva tarkkailija | M/K (v1741) |
| `tarina.praha.kommentti` | `miettiva` (0,5) | "silti he katsovat tuota. Ymmärrän." | M/K (v1741) |
| `tarina.tukholma.kommentti` | `ylpea` (0,5) | "näkymä paranee, kun pääsee ylemmäs" — lintuperspektiivi | M/K (v1741) |
| `tarina.kobenhavn.kommentti` | `lammin` (0,5) | hitaat tanssijat + "pöydät pitkään vapaina" (murut) | M/K (v1741) |
| `tarina.helsinki.kommentti` | `ilo` (0,5) | lokit ja silakkapaperipaino — lajitoverikuittaus | M/K (v1741) |
| `tarina.tallinna.kommentti` | `lammin` (0,55) | "Se mies osasi kuunnella potilasta" | M/K (v1741) |
| `tarina.sevilla.kommentti` | `ilo` (0,55) | "Portista mennään yhä leipä kädessä. Sivistys alkaa lupaavasti." | M/K (v1741) |
| `tarina.bergen.kommentti` | `miettiva` (0,45) | "Kumman suojelu onnistui paremmin?" — avoin kysymys | M/K (v1741) |
| `tarina.amsterdam.kommentti` | `ylpea` (0,5) | "Lentotaidottomaksi lajiksi olette varsin kekseliäitä" | M/K (v1741) |
| `tarina.dublin.kommentti` | `hammastys` (0,5) | "Yhdeksäntuhatta vuotta?" — aito hämmästys | M/K (v1741) |
| `tarina.edinburgh.kommentti` | `ylpea` (0,5) | "Isoisä eksyi kerroksiin; minä valitsen katon" | M/K (v1741) |
| `tarina.lissabon.kommentti` | `ilo` (0,5) | "Ihmiset eivät saaneet siipiä, joten piti ryhtyä rakennustöihin" | M/K (v1741) |
| `tarina.riika.kommentti` | `lammin` (0,5) | laulujuhlat; "ymmärsi sentään olla puhumatta päälle" | M/K (v1741) |
| `tarina.barcelona.kommentti` | `ilo` (0,5) | "Minä olisin äänestänyt kaalia" — ruoka voittaa liikenteen | M/K (v1741) |
| `tarina.firenze.kommentti` | `ilo` (0,5) | "isoisälläsi oli sentään taskut. Patsaan on pärjättävä ilmeellä." | M/K (v1741) |
| `tarina.venetsia.kommentti` | **`rakkaus` (0,8)** | albumirepliikki: "Nuo ovat yksityisiä … Sulje albumi." (ks. E4; vain tämä TAI albumin kuva 5 samassa käynnissä) | M/K (v1741) |
| `tarina.marseille.kommentti` | `ilo` (0,5) | "Sataman lokit eivät ole kuulleetkaan puhtaasta pöydästä" | M/K (v1741) |
| `tarina.oslo.kommentti` | `ylpea` (0,45) | "kävellään oopperan katolla. Siihen suuntaan kaupunkien pitäisi kasvaa." | M/K (v1741) |
| `tarina.tampere.kommentti` | `ilo` (0,5) | "Isoisä seurasi lankaa, minä tarjoilijaa. Molemmilla oli hyvä syy." | M/K (v1741) |
| `tarina.vilna.kommentti` | `miettiva` (0,45) | "Tähtiä tutkitaan kauempana kaupungin valoista. Tuoli ei riitä." | M/K (v1741) |
| `tarina.granada.kommentti` | `lammin` (0,5) | "Minä käyn vain juomassa sen peilikuvan reunasta" | M/K (v1741) |
| `tarina.kiova.kommentti` | **`vakava` (0,6)** | "Luostari on kärsinyt sodassa. Tätä isoisän sivua luen hiljaa." — päätoimittajan katselmus laski 0,7 → 0,6 | M/K (v1741) |
| `tarina.krakova.kommentti` | `miettiva` (0,45) | "arvostan soittajaa, joka osaa lopettaa" — katkeava hejnał | M/K (v1741) |
| `tarina.moskova.kommentti` | `ilo` (0,5) | "Minäkin tulen syömään pienemmästä kutsusta" — ruoka | M/K (v1741) |
| `tarina.odessa.kommentti` | **`vakava` (0,6)** | "sodan uhkaamaa maailmanperintöä … katson tänään toisin" — katselmus laski 0,7 → 0,6 | M/K (v1741) |
| `tarina.pietari.kommentti` | `miettiva` (0,5) | Leningrad-maininta + "Isoisän kellosta taisi loppua valta" | M/K (v1741) |
| `tarina.varsova.kommentti` | `vakava` (0,55) | jälleenrakennus: "Isoisä olisi tunnistanut torin. Se oli rakentajien tarkoitus." | M/K (v1741) |
| `tarina.kreeta.kommentti` | `lammin` (0,5) | "Kalastaja vastasi paremmin kuin isoisän kartta" | M/K (v1741) |
| `tarina.sisilia.kommentti` | `ylpea` (0,45) | "Katto ansaitsee edelleen puheenvuoron" | M/K (v1741) |
| `tarina.islanti.kommentti` | `lammin` (0,5) | "Minä arvostan lämmintä räystästä" — räystäsperspektiivi | M/K (v1741) |
| `tarina.alpit.kommentti` | `vakava` (0,55) | "Hänen kivensä saattaa olla tallessa; jää sen alta on poissa" — menetys | M/K (v1741) |
| `tarina.lappi.kommentti` | `utelias` (0,5) | "Joet kohtaavat yhä. Minusta niissäkin olisi matkan aihetta." | M/K (v1741) |
| `tarina.tromssa.kommentti` | `utelias` (0,5) | "pienestä simpukasta voi alkaa pitkä matka" | M/K (v1741) |

**E4 Venetsian rakkauskohtaus**

Venetsia on ainoa kaupunki, jossa `pollo.kuvat` on viisi kuvaa
(js/packs/fokusvirta-venetsia.js r. 227–310, pulucam-erä `r20260909`).
Kuvatekstit muodostavat jatkuvan juonen, ja albumirepliikki
(`pollo.kommentti[0]`) sulkee kohtauksen. **Päätoimittajan päätös:
albumin kuva 5 ja saapumiskommentti ovat molemmat `rakkaus` 0,8, mutta
vain toinen laukeaa samassa käynnissä.**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `tarina.venetsia.albumi.1` | pulucam-karuselli, kuva 1/5 | js/packs/fokusvirta-venetsia.js `pollo.kuvat[0]`; js/pulucam.js; js/fokusvirta.js:2152 (`photo`) | "aivan sattumalta yksi paikallinen" | `utelias` (0,5) | kerran per kuva; tekninen `photo` on jo kytketty | tunnetagi kuvan vaihtuessa, ei kesken selitteen | perustila | katse kuvaan | karuselli, mobiilissa swipe | D | tests/pulucam.test.mjs |
| `tarina.venetsia.albumi.2` | kuva 2/5 | `pollo.kuvat[1]` | "sama paikallinen. Kaupunki on yllättävän pieni." | `lammin` (0,6) | kerran | — | perustila | — | karuselli | D | tests/pulucam.test.mjs |
| `tarina.venetsia.albumi.3` | kuva 3/5 | `pollo.kuvat[2]` | "aukion nimi on… tiedän kyllä. Aivan varmasti." | `hammentynyt` (0,6) | kerran | hämmennys on tässä rakastumisen oire, ei vastausvirhe | perustila | katse sivuun | karuselli | D | tests/pulucam.test.mjs |
| `tarina.venetsia.albumi.4` | kuva 4/5 | `pollo.kuvat[3]` | "tämä kuva käsittelee kuulemma lentoreittejä" · "Sydämiä on reunoilla nyt useampia." | `rakkaus` (0,7) | kerran | — | perustila | — | karuselli | D | tests/pulucam.test.mjs |
| `tarina.venetsia.albumi.5` | kuva 5/5 | `pollo.kuvat[4]` | "nämä eivät kaikki kuuluneet esitykseen … Kuinka monta näistä sinä jo näit?" | `rakkaus` (0,8) | kerran — kohtauksen huippu | voittaa kaiken muun Venetsiassa; **vain tämä TAI `tarina.venetsia.kommentti` samassa käynnissä** | perustila vasta albumin sulkeuduttua | katse suoraan pelaajaan, kiinni jäänyt | karuselli | D | tests/pulucam.test.mjs |

**E5 Pelin loppu, raha ja päivän vaihtuminen**

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `peli.voitto` | winnerDialog | js/ui.js `showWinner` (r. 18363); js/game.js `checkWin` (r. 2925) | `sfx.play('win')` → "N voitti!" kirjoittuu | **`ilo` (0,9)** — päätoimittajan hyväksymä poikkeus toimituslinjan kattoon | kerran per peli (`game.winner`) | pelin suurin hetki — keskeyttää kaiken; botti-ajastimet nollataan | ei paluuta perustilaan ennen lapun sulkua | katse suoraan, juhlava | modaali (`#winner-dialog`) | D | tests/rules.test.mjs |
| `peli.voitto.jatka` | winnerDialog, "Jatka vaeltaen" | js/ui.js `showWinner` → `winner-roam` → `game.continueRoaming()` | lappu sulkeutuu, matka jatkuu | `utelias` (0,55) | kerran | seuraa `peli.voitto`-tagia | perustila | — | modaali | D | tests/rules.test.mjs |
| `peli.vararikko.pankkiapu` | ilmoituskupla vuoron alussa | js/game.js `endTurn` → `needsAid(p)` (r. 1414–1418, 1471) | "jumissa ilman rahaa" → rahat kukkaroon | `lammin` (0,5) | joka kerta kun `needsAid` on tosi vuoron alussa — ei kiihdy toistuessa | ei nolaa pelaajaa: peli ei voi loppua rahattomuuteen. Vrt. `eteneminen.raha.loppu` (A) | perustila | katse kukkaroon | ilmoituskerros | D | tests/rules.test.mjs |
| `peli.raha.eiRiita` | nappien estotilat | js/game.js `actionHint` / `actionFifty` / `actionKaveriapu` / `actionPullaOstos` → `'Rahat eivät riitä'` | nappi disabloituu | — (perusteltu hiljaisuus) | nappi on jo harmaa; ele olisi moite | — | — | — | modaali | D | tests/rules.test.mjs |
| `peli.paiva.vaihtuu` | yläpalkin kello | js/game.js `dayCount` / `clockLabel` (r. 1108–1120); js/ui.js r. 20228 | "Päivä n, aamu" | — (perusteltu hiljaisuus) | vaihtuu joka 4. vuorolla (`TURN_HOURS`); reaktio olisi jatkuvaa elehdintää | ei tilanne vaan tekninen renderöinti; ristiriita `eteneminen.paiva` (A) — ks. Päällekkäisyydet | — | — | yläpalkki | D | tests/rules.test.mjs |
| `peli.aikataulu.merkinta` | tietoruutu | js/game.js `updateSchedule` (r. 1127–1139), `pack.texts.schedule` | isoisän aikataulurivi nousee | `miettiva` (0,5) | kerran per rivi (`scheduleShown`, tallenteessa) | tämä ON tilanne: isoisä ohitti tämän päivän 1873. Vrt. `eteneminen.aikataulu` (A, `vakava` 0,45) | perustila | katse kirjaan | tietoruutu | D | tests/rules.test.mjs |
| `peli.ennatys.ohi` | passileima | js/game.js `noteRecord` (`day > RECORD_DAYS`) | "Isoisä olisi ollut jo kotona — mutta hän ei nähnyt tätä kaikkea." | `lammin` (0,55) | kerran per peli | ei moite — Raamatun linja: ennätys on tavoite, ei tuomio | perustila | — | ilmoituskerros | D | tests/rules.test.mjs |
| `peli.linssi.avautui` | ilmoituskupla | js/game.js r. 1030–1038 `emit('aid','Uusi linssi', …)` | uusi katselutapa aukeaa | `ilo` (0,65) | kerran per linssi | kokemuksella ansaittu, ei laatan alta. Sama hetki kuin `laukku.uusi-linssi` (A) | perustila | — | ilmoituskerros | D | tests/matkalaukun-linssit.test.mjs |
| `peli.laukku.heilahtaa` | yläpalkin Laukku-nappi | js/ui.js `playTokenReveal` loppu → `elavoitaLaukku()` | nappi heilahtaa | — (perusteltu hiljaisuus) | ele on napissa, ei pulussa | `aarre.loyto`-tagi kattaa hetken | — | — | yläpalkki | D | tests/livian-paljastus.test.mjs |

### F. Linssit

Linssit valitaan MATKALAUKUSTA kaksivaiheisesti (ruudun napautus = selite,
"Aktivoi" = kytkentä). URL-parametria `?linssi=` EI ole — testipolku on
aina "laukku → <linssi> → Aktivoi". Linssin sulku, alusta, kertoja ja
musiikki ovat linssipalkin hampurilaisessa (js/aikajana-valikko.js).

| ID | Näkymä | Tiedosto:kohta | Alku → loppu | Tunne (voim.) | Ajoitus / toisto | Prioriteetti / keskeytys | Paluu | Asusteet / katse | Mobiili / modaali | Tila | Testipolku |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **YHTEISET (kaikki linssit)** | | | | | | | | | | | |
| `linssi.yhteinen.esikatselu` | Matkalaukku | js/ui.js:17921 `esikatseleLinssi` | napautus → selite piirtyy | `miettiva` (0,3) | kerran per napautettu tunnus; sama tunnus uudestaan ei toista | laukku on modaali, ei kilpaile kuplien kanssa | laukku auki | katse laukkuun | mobiili: ruudukko 2 saraketta | D | laukku → linssin ruutu |
| `linssi.yhteinen.avaus` | Kartta | js/ui.js:17686 `sytytaLinssi`, js/linssit/kerros.js:419 `vaihda` | Aktivoi → kerros syttyy (häivytys 220 ms) | `utelias` (0,4) | kerran per sytytys; laudan uudelleenpiirto ei saa toistaa (sytytys tehdään uudelleen js/ui.js:17650) | kuplat pois ja chatti kiinni linssin alkaessa (js/pollo.js:6410 `polloLinssiAlkoi`) | laukku sulkeutuu | katse kartalle | ✕ / valikko oikeassa laidassa | D | laukku → linssi → Aktivoi |
| `linssi.yhteinen.sulku` | Kartta | js/aikajana.js:6393 `pysaytaAikajana`; js/pollo.js `polloLinssiPaattyi` | Poistu → kerros pois, lykätyt kuplat vapautuvat | `lammin` (0,35) | kerran; ei saa laueta pudotuksesta (virhe) | lykätyt puheenvuorot purkautuvat heti perään — tunne ennen niitä | kartta ilman linssiä | katse pelaajaan | valikkorivi 1 | D | linssipalkki ☰ → Poistu |
| `linssi.yhteinen.vaihto` | Kartta | js/linssit/kerros.js:419 (sammuta → vaihda) | vanha sammuu → uusi syttyy | `utelias` (0,4) | vain UUDEN linssin avaus tagitetaan; vanhan sulku EI (kaksi tagia peräkkäin = elejono) | vanhentunutta elettä ei jonoteta | uusi linssi päällä | — | — | D | laukku → toinen linssi → Aktivoi |
| `linssi.yhteinen.pudotus` | Kartta | js/ui.js:17771 `pudotaLinssi` | linssi ei kelpaa laudalle → putoaa valikoimasta | — | hiljaisuus: tekninen virhe, ei pelitilanne | — | kartta entisellään | — | — | D | rikkinäinen linssi (dev) |
| `linssi.yhteinen.aloituskortti` | Musta peite | js/aikajana.js:698–753 avausjakso | musta 500 ms → esittelylaatikko → Käynnistä | `utelias` (0,4) | laatikon ILMESTYESSÄ, ei Käynnistä-napista | peite on modaali; kello ei käy, kertoja vaikenee | esitys alkaa | katse laatikkoon | mobiili: kuva tekstin yllä | D | Keksinnöt tai Ihmisen matka → avaus |
| `linssi.yhteinen.kaynnista` | Musta peite | js/aikajana.js:744 (vaihe POIS) | Käynnistä → peite väistyy, kello lähtee | `jannitys` (0,45) | kerran per ajo; Alusta ei tuo avausta takaisin | ei saa osua aloituskortin tagin päälle (≥ 1,5 s väli) | ajo käynnissä | katse kartalle | — | D | avaus → Käynnistä |
| `linssi.yhteinen.valikko.kertoja` | Linssipalkki | js/aikajana-valikko.js `luoLinssivalikko` | kytkin pois / päälle | `miettiva` (0,3) | vain PÄÄLLE kytkettäessä; pois = hiljaisuus (pelaaja halusi hiljaisuutta) | pois kytkiessä `pysaytaLinssiluenta` vaientaa heti — tunnetta ei saa jäädä | ajo jatkuu | — | valikkorivi 3 | D | ☰ → Kertoja |
| `linssi.yhteinen.valikko.musiikki` | Linssipalkki | js/aikajana-valikko.js | kytkin pois / päälle | — | hiljaisuus: asetus, ei tilanne | — | — | — | valikkorivi 4 | D | ☰ → Taustamusiikki |
| `linssi.yhteinen.alusta` | Linssipalkki | js/aikajana.js:3053 `aloitaAlusta` | Alusta alusta → muisti pois, ajo uudestaan | `utelias` (0,4) | kerran per painallus; ei jonoteta jos ajo on jo alussa | katkaisee kesken olevan luennan ja välinäytöksen | jakso 1 | — | valikkorivi 2 | D | ☰ → Aloita alusta |
| `linssi.yhteinen.aikaselain.veto` | Alareunan nauha | js/linssit/aikaselain.js:232 `onEsikatselu` | sormi nauhalla → esikatselu | — | hiljaisuus: jatkuva liike, ele kilpailisi sormen kanssa | — | — | — | mobiili: pääkäyttötapa | D | ajo → alareunan nauha |
| `linssi.yhteinen.aikaselain.valinta` | Alareunan nauha | js/linssit/aikaselain.js:246 `onValinta` | sormi irtoaa → jakso valitaan | `utelias` (0,38) | kerran per irrotus; nopea selaus ei saa toistaa (vaimennus ≥ 1,2 s) | keskeyttää kertojan → tagi vasta uuden jakson alussa | valittu jakso | — | — | D | nauha → napautus |
| **IHMISEN MATKA — avaus ja kehys** | | | | | | | | | | | |
| `linssi.ihmisen-matka.avaus.musta` | Musta ruutu | *(työn alla toisessa haarassa)* | linssi kytkeytyy → musta, tähdet | `utelias` (0,4) | kerran, tähtien ilmestyessä | peite modaali; kertoja ei ole vielä alkanut | avausjakso | katse ylös | — | D | laukku → Ihmisen matka → Aktivoi |
| `linssi.ihmisen-matka.avaus.afrikka` | Musta → pallo | *(työn alla toisessa haarassa)* | Afrikka syttyy pallolle | `hammastys` (0,55) | kerran, `valot`-vaiheen alussa | ei kertojan luennan päälle | jakso `afrikka` | — | — | D | sama |
| `linssi.ihmisen-matka.avaus.marokko` | Pallo | *(työn alla)*; pehmennys js/linssit/ihmisen-matka-esitys.js:752 | kamera jarruttaa Marokkoon | `utelias` (0,45) | kerran, jarrun alussa | — | jakso `jebel-irhoud` | — | — | D | sama |
| `linssi.ihmisen-matka.pulun-sisaantulo` | Pallo | *(työn alla toisessa haarassa)* | pulu saapuu ruutuun | `lammin` (0,5) | kerran per ajo; Alusta EI toista | ei saa osua kertojan ensimmäisen lauseen päälle | esitys jatkuu | katse pelaajaan | mobiili: pulu alareunaan | D | sama |
| `linssi.ihmisen-matka.tauko` | Linssipalkki | js/linssit/ihmisen-matka-esitys.js:2023 `tauko` | Tauko-nappi → kello ja kamera seis | `miettiva` (0,35) | kerran per tauko | kertoja pysähtyy samalla → tagi on sallittu | tauolla | — | — | D | ajo → Tauko |
| `linssi.ihmisen-matka.jatka` | Linssipalkki | js/linssit/ihmisen-matka-esitys.js:2033 `jatka` | Jatka → kello käy | — | hiljaisuus: kertoja jatkaa samasta hetkestä | — | ajo | — | — | D | tauko → Jatka |
| `linssi.ihmisen-matka.muisti.jatko` | Kartta | js/linssit/ihmisen-matka-esitys.js:1949 `jatkaMuistista` | sulun jälkeen palataan jaksoon/vaiheeseen | `lammin` (0,35) | kerran; ei avausjaksoa eikä mustaa | ei toista jakson omaa tagia | jatkettu jakso | — | — | D | linssi auki → Poistu → Aktivoi |
| **IHMISEN MATKA — jaksot** (kaikki: js/linssit/ihmisen-matka-kertomus.js; kytkentä js/linssit/ihmisen-matka-esitys.js:1546 `ilmoitaLivianTunne`, laukeaa jakson alussa) | | | | | | | | | | | |
| `linssi.ihmisen-matka.jakso.avaus` | Pimeä | kertomus.js:70–72 | jakso alkaa | `utelias` (0,42) | jakson alussa, kerran | kertojan luenta alkaa heti perään | — | — | — | M/K | Ihmisen matka → jakso 1 |
| `linssi.ihmisen-matka.jakso.afrikka` | Valot | kertomus.js:81 | jakso alkaa | *ehdotus:* `hammastys` (0,5) — maanosa syttyy | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 2 |
| `linssi.ihmisen-matka.jakso.jebel-irhoud` | Marokko | kertomus.js:90–92 | jakso alkaa | `lammin` (0,4) | jakson alussa | — | — | — | — | M/K | jakso 3 |
| `linssi.ihmisen-matka.jakso.siirtyma-afrikka` | Itä-Afrikka | kertomus.js:104 | jakso alkaa | *ehdotus:* `utelias` (0,35) | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 4 |
| `linssi.ihmisen-matka.jakso.omo` | Jokilaakso | kertomus.js:113 | jakso alkaa | *ehdotus:* `miettiva` (0,4) — "meille ikuisuus, heille kotiseutu" | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 5 |
| `linssi.ihmisen-matka.jakso.ranta` | Meren ranta | kertomus.js:124–126 | jakso alkaa; pulun kupla "Simpukoita. Hyvä alku." lopussa | `ilo` (0,5) | jakson alussa; kupla erikseen (`puhe`-hetkellä) | kupla ei pysäytä kertomusta | — | — | — | M/K | jakso 6 |
| `linssi.ihmisen-matka.jakso.levantti` | Karmelvuori | kertomus.js:136 | jakso alkaa | *ehdotus:* `vakava` (0,4) — asutus katosi | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 7 |
| `linssi.ihmisen-matka.jakso.arabia` | Arabia | kertomus.js:151 | jakso alkaa; Blombos syttyy hiljaisena nostona | *ehdotus:* `hammastys` (0,5) | jakson alussa, ei hiljaisen noston kohdalla | hiljainen nosto ei saa omaa tagia | — | — | — | D (tagi puuttuu) | jakso 8 |
| `linssi.ihmisen-matka.jakso.intian-rannat` | Sumatra | kertomus.js:179 | jakso alkaa | *ehdotus:* — (hiljaisuus antaa tilaa Australialle) | — | — | — | — | — | D (tagi puuttuu) | jakso 9 |
| `linssi.ihmisen-matka.jakso.australia` | Rannikkomeri | kertomus.js:191–193 | jakso alkaa | `hammastys` **0,68** (nykyinen sisältö 0,72 ylittää katon — **korjattava sisällössä**) | jakson alussa | huippukohta; toimituslinjan katto 0,7 | — | — | — | M/K (ylitys, korjattava sisällössä) | jakso 10 |
| `linssi.ihmisen-matka.jakso.denisova` | Luola | kertomus.js:205–207 | jakso alkaa; pulun kupla lopussa | `hammentynyt` (0,56) | jakson alussa | kupla kertojan hännän päälle | — | — | — | M/K | jakso 11 |
| `linssi.ihmisen-matka.jakso.napapiiri` | Arktinen | kertomus.js:220 | jakso alkaa | *ehdotus:* `vakava` (0,45) — "silti he jäivät" | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 12 |
| `linssi.ihmisen-matka.jakso.beringia` | Tundra | kertomus.js:231–233 | jakso alkaa; pulun kupla lopussa | `jannitys` (0,66) | jakson alussa | huippukohta, alle 0,7 | — | — | — | M/K | jakso 13 |
| `linssi.ihmisen-matka.jakso.white-sands` | Tundra | kertomus.js:245 | jakso alkaa | *ehdotus:* `lammin` (0,42) — lapsen ja aikuisen jalanjäljet | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 14 |
| `linssi.ihmisen-matka.jakso.chile` | Metsäsade | kertomus.js:258 | jakso alkaa | *ehdotus:* `ylpea` (0,5) — "pisin kävelymatka" | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 15 |
| `linssi.ihmisen-matka.jakso.aikahyppy` | Kelaus | kertomus.js:271 | kello kelaa taaksepäin | *ehdotus:* — (tekninen liike) | — | — | — | — | — | D (tagi puuttuu) | jakso 16 |
| `linssi.ihmisen-matka.jakso.eurooppa` | Bulgaria | kertomus.js:280 | jakso alkaa | *ehdotus:* `vakava` (0,45) — neandertalilaiset katosivat | jakson alussa | synkkä sävy: ei virnettä | — | — | — | D (tagi puuttuu) | jakso 17 |
| `linssi.ihmisen-matka.jakso.chauvet` | Luola | kertomus.js:293–295 | jakso alkaa | `rakkaus` (0,48) | jakson alussa | — | — | — | — | M/K | jakso 18 |
| `linssi.ihmisen-matka.jakso.meri` | Avomeri | kertomus.js:307 | jakso alkaa | *ehdotus:* `utelias` (0,45) — purjehdus tähtien avulla | jakson alussa | — | — | — | — | D (tagi puuttuu) | jakso 19 |
| `linssi.ihmisen-matka.jakso.uusi-seelanti` | Rantalinnut | kertomus.js:318 | jakso alkaa | *ehdotus:* `ylpea` (0,5) — viimeinen suuri maa | jakson alussa | ei saa syödä `loppu`-jakson lämpöä | — | — | — | D (tagi puuttuu) | jakso 20 |
| `linssi.ihmisen-matka.jakso.loppu` | Maailma | kertomus.js:331–333 | jakso alkaa; pulun kupla "Kartta on sinun…" päättää esityksen | `lammin` (0,44) | jakson alussa; kupla kertaalleen (tutkimusvaihe EI toista) | kupla kahdesti = virhe | tutkimusvaihe | katse pelaajaan | — | M/K | jakso 22 |
| **IHMISEN MATKA — tutkimusvaihe ja kortit** | | | | | | | | | | | |
| `linssi.ihmisen-matka.tutkimus.alku` | Kartta | js/linssit/ihmisen-matka-tutkimus.js:277 | esitys päättyy → nostot hehkuvat, chatin portti aukeaa | — | hiljaisuus: `loppu`-jakson tagi ja pulun kupla juuri soivat | body `aikajana-tutkimus-auki` päästää chatin (js/ui-apurit.js:1821) | pelaajan kartta | — | — | D | esitys loppuun asti |
| `linssi.ihmisen-matka.tutkimus.virtanappi` | Linssipalkki | js/linssit/ihmisen-matka-tutkimus.js:223 `luoVirtanapit` | nappi → pallo kääntyy, vana korostuu | `utelias` (0,4) | kerran per nappi; toinen napautus (palautus) hiljaa | ei jonoteta jos pelaaja rummuttaa nappeja | vana korostettuna | katse kartalle | 5 nappia yhdessä palkissa | D | tutkimusvaihe → virtanappi |
| `linssi.ihmisen-matka.nostokortti.avaus` | Nostokortti | js/linssit/ihmisen-matka-kortti.js:350 `avaa` | nosto/lamppu/kuva → kortti auki, esitys tauolle | `hammastys` (0,45) | kerran per avaus; sama nosto uudestaan = sulku | kortti on modaali; kertoja pysähtyy | kortti auki | katse korttiin | mobiili: kortti koko ruutu | D | nosto kartalla |
| `linssi.ihmisen-matka.nostokortti.sulku` | Kartta | js/linssit/ihmisen-matka-kortti.js:296 `sulje` | ✕ → esitys jatkuu | — | hiljaisuus: kertoja jatkaa | — | ajo / tutkimus | — | — | D | kortti → ✕ |
| `linssi.ihmisen-matka.nostokortti.kysymys` | Kortti → chat | js/linssit/ihmisen-matka-kortti.js:406–413 `kysyPululta` | valmis kysymys → chattiin | `ylpea` (0,45) | kerran per napautus; 2–3 kysymystä per kortti | chatin portti auki (`aikajana-nostokortti-auki`) | chat auki | katse pelaajaan | modaali: kortti + chat | D | kortti → kysymysnappi |
| `linssi.ihmisen-matka.nostokortti.juttu` | Tiedeliite | js/linssit/ihmisen-matka-kortti.js:398–402 | "Lue lisää" → tiedeliite | `utelias` (0,4) | kerran per avaus | musiikin vaimennus kulkee moottorin kautta | liite auki | — | modaali | D | kortti → Lue lisää |
| **KEKSINNÖT** | | | | | | | | | | | |
| `linssi.keksinnot.avaus` | Kartta | js/linssit/keksinnot.js:1782; js/aikajana.js:6355 | Aktivoi → avausjakso → kello lähtee 1769 | `utelias` (0,4) | kerran (yhteinen aloituskortti kattaa avausjakson) | ks. `linssi.yhteinen.aloituskortti` | ajo | — | — | D | laukku → Keksintölinssi |
| `linssi.keksinnot.pysakki` | Kartta | js/aikajana.js:5238 `sytyta` | kello saapuu vuoteen → valo syttyy + kilahdus + kertojan luenta | — | hiljaisuus: kertoja lukee jokaisen pysäkin (js/linssipuhe.js) | tagi luennan päälle olisi toimituslinjan vastainen | seuraava pysäkki | — | — | D | ajo, mikä tahansa vuosi |
| `linssi.keksinnot.pulun-huomio` | Kupla | kertomus.js:346–353 `KEKSINNOT_PULUN_HUOMIOT` (1796, 1898, 1909) | pysäkin luennan jälkeen → pulun kupla | `ilo` (0,5) 1796/1909 · `ylpea` (0,55) 1898 (Curie) | luennan päätyttyä; 3 kertaa per ajo | ei kertojan päälle | ajo jatkuu | katse pelaajaan | — | D (teksti M, tagi puuttuu) | ajo → 1796 / 1898 / 1909 |
| `linssi.keksinnot.merkkipaalu` | Välinäytös | js/aikajana.js:5324 `avaaValinaytos`, 767–790 | kello 1873 → kello pysähtyy, laatikko nousee | `vakava` (0,5) — isoisän hetki | KERRAN PER AJO (Alusta nollaa); kelaus ei avaa | laatikko modaali, tausta himmenee kevyesti | tauko | katse laatikkoon | mobiili: kuva tekstin yllä | D | ajo → 1873 |
| `linssi.keksinnot.merkkipaalu.pulu` | Kupla | js/aikajana.js:5427 `aloitaValinaytoksenPuhe` | kertojan luenta loppuu → pulu kommentoi | `miettiva` (0,45) | luennan `ended` tai 600 ms viive; kerran | ei luennan päälle (kertoja ensin, pulu sen jälkeen) — malliesimerkki | laatikko auki | — | — | D | 1873 → odota luenta |
| `linssi.keksinnot.merkkipaalu.jatka` | Kartta | js/aikajana.js:5445 `jatkaValinaytoksesta` | Jatka → kuplat pois, kello jatkaa | — | hiljaisuus: kuplat juuri poistettiin | — | ajo | — | — | D | välinäytös → Jatka |
| `linssi.keksinnot.karuselli.veto` | Alarivi | js/aikajana.js:1748–1848 | sormi vetää karusellia | — | hiljaisuus: jatkuva liike | — | — | — | mobiili: pääkäyttötapa | D | ajo → alarivi |
| `linssi.keksinnot.kelaus` | Kartta | docs/moduulit/linssit.md 1119 (9.2) | kelaus sytyttää kaikki valot ja pysäyttää esityksen | `hammastys` (0,5) | kerran per kelaus; nopea selaus vaimennetaan | pysäyttää kertojan → tagi vasta pysähdyttyä | tauko | — | — | D | karuselli → kelaus loppuun |
| `linssi.keksinnot.tiedeliite.avaus` | Tiedeliite | js/tiedeliite.js:627 `avaaTiedeliite` | keksijän kortti → lehtisivu | `utelias` (0,4) | kerran per avaus | modaali; musiikki vaimenee | liite auki | katse liitteeseen | mobiili: yksi palsta | D | pysäkki → keksijä |
| `linssi.keksinnot.tiedeliite.sivunvaihto` | Tiedeliite | js/tiedeliite.js:192 `naapurit`, :307 `karusellinKohta` | ‹ edellinen / seuraava › | `miettiva` (0,3) | vaimennus ≥ 1,5 s, selaaminen ei saa eleillä joka sivulla | — | uusi sivu | — | ☰ hampurilainen | D | liite → alanapit |
| `linssi.keksinnot.tiedeliite.sulku` | Kartta | js/tiedeliite.js:897 `suljeTiedeliite` | ✕ → ajo jatkuu | — | hiljaisuus | — | ajo | — | — | D | liite → ✕ |
| `linssi.keksinnot.loppu` | Kartta | js/aikajana.js (ajon päätös 1928) | viimeinen pysäkki → kello seisoo | `lammin` (0,45) | kerran per ajo | — | vapaa selaus | katse pelaajaan | — | D (tagi puuttuu) | ajo loppuun asti |
| **RADIO** | | | | | | | | | | | |
| `linssi.radio.avaus` | Kartta | js/linssit/radio.js:1500 `paalle`; js/ui.js:17736 `tahdistaRadio` | Aktivoi → kaupungit muuttuvat play-napeiksi | `utelias` (0,4) | kerran per kytkentä | kerrokseton linssi: kartan TILA | radiotila | katse kartalle | — | D | laukku → Maailmanradio |
| `linssi.radio.kanava` | Kartta | js/linssit/radio.js:1270 `soitaKaupunki` | kaupungin napautus → viritys alkaa | `jannitys` (0,45) | kerran per VALINTA; sama kaupunki uudestaan soidessa ei tee mitään | vaihto kesken virityksen mitätöi vanhat ajastimet (:826) | viritys | katse näyttöön | mobiili: soitin alareunassa | D | radio → kaupunki |
| `linssi.radio.viritys` | Soitin | js/linssit/radio.js:760 `aloitaViritys`, :892 `lukitseAsema` | kohina nousee → asema lukittuu | — | hiljaisuus: viritys kestää vähimmäisajan, ele kilpailisi kohinan kanssa | — | lukitus | — | — | D | kaupunki → odota |
| `linssi.radio.kuuntelu` | Soitin | js/linssit/radio.js:919 `haivytaLahetysSisaan` | lähetys kuuluu | `ilo` (0,5) | kerran per lukittu kanava; ei toistoa kesken kuuntelun | ei elehdi jatkuvasti lähetyksen aikana | kuuntelu | katse pelaajaan | — | D | kaupunki → kanava kuuluu |
| `linssi.radio.ei-kanavaa` | Kartta | js/linssit/radio.js:444 `onkoKanavaa` (sammunut nappi) | kaupungilla ei ole kanavaa | `hammentynyt` (0,35) | kerran; sammunutta nappia rummuttava pelaaja ei saa toistoa | — | radiotila | — | — | D (tagi puuttuu) | radio → maa ilman kanavaa |
| `linssi.radio.kuollut-asema` | Soitin | js/linssit/radio.js:1222–1224 | toisto estyy tai asema on kuollut | `vakava` (0,4) | kerran per asema | "estetyn toiston korjaa uusi napautus, kuolleen aseman ei mikään" | radiotila | — | — | D (tagi puuttuu) | radio → kuollut asema |
| `linssi.radio.aani` | Soitin | js/linssit/radio.js:1348 `asetaAani` | äänisäädin | — | hiljaisuus: jatkuva säätö | — | — | — | mobiili: liukusäädin | D | soitin → säädin |
| `linssi.radio.tauko` | Soitin | js/linssit/radio.js:1383 `tauko` / :1393 `asetaTauko` | stop / tauko | — | hiljaisuus | — | — | — | — | D | soitin → stop |
| `linssi.radio.sulku` | Kartta | js/linssit/radio.js:1712 `pois` | linssi pois → kanava vaikenee | `lammin` (0,35) | kerran; yhteinen sulkutagi riittää | — | kartta | — | — | D | ☰ → Poistu |
| **MUUT LINSSIT** | | | | | | | | | | | |
| `linssi.topografia.avaus` | Kartta | js/linssit/topografia.js:243 | Aktivoi → maasto värittyy | `utelias` (0,4) | kerran per sytytys | kerroksellinen linssi (rasteroidaan yli 400 elementin) | kartta | katse kartalle | — | D | laukku → Topografialinssi |
| `linssi.vesistot.avaus` | Kartta | js/linssit/vesistot.js:446 | Aktivoi → joet ja järvet + maastonimet | `utelias` (0,4) | kerran per sytytys | nimikerros nollataan käsin (js/ui.js:17777) | kartta | — | — | D | laukku → Vesistölinssi |
| `linssi.pallo.avaus` | Karttapallo | js/linssit/pallo.js:27; js/ui.js:17784 `valitseLinssi` | valinta sulkee laukun ja avaa pallon | `ilo` (0,5) | kerran per avaus; pallo on TOIMINTO, ei tila | pallolaudalla pallo ei ole linssi (js/ui.js:17580) | pallo | katse palloon | — | D | laukku → Karttapallo (tasokartalla) |
| `linssi.pallo.sukellus` | Kartta | js/ui.js:21222 | napautus pallolla → kameran sukellus kaupunkiin | `jannitys` (0,5) | kerran per sukellus | kamera-ajo kesken: tagi ajon ALUSSA | kaupunki | — | — | D (tagi puuttuu) | pallo → napautus |
| `linssi.vertailu.avaus` | Kartta | js/linssit/vertailu.js:32; js/vertailu.js:284 `tahdistaVertailu` | Aktivoi → maat valittavina, Suomi pohjana | `utelias` (0,4) | kerran per kytkentä | kartan TILA, ei kerros | vertailutila | — | — | D | laukku → Vertailulinssi |
| `linssi.vertailu.valinta` | Kartta | js/vertailu.js:284 | maa 1–3 valitaan Suomen rinnalle | `miettiva` (0,35); kolmas valinta `ylpea` (0,45) | kerran per maa | ei jonoteta nopeassa valinnassa | asteikot | katse asteikkoon | mobiili: kortti alareunaan | D (tagi puuttuu) | vertailu → maa |
| `linssi.maatiedot.avaus` | Kartta | js/linssit/maatiedot.js:32; js/vertailu.js:391 `tahdistaMaatiedot` | Aktivoi → jokainen maa napautettavissa | `utelias` (0,4) | kerran; tila voi olla päällä myös kartan omasta napista | kartan TILA | maatietotila | — | — | D | laukku → Maiden tiedot |
| `linssi.maatiedot.maalehti` | Maalehti | js/vertailu.js:391 → maalehti | maan napautus → maalehti aukeaa | `hammastys` (0,45) | kerran per lehti | modaali; ks. osa-alue C (`lehti.maalehti.avaus` voittaa) | lehti auki | katse lehteen | mobiili: koko ruutu | D (tagi puuttuu) | maatiedot → maa |

## Kattavuus

| Alue | Luetut tiedostot | Puuttuvat / kattamattomat alueet |
| --- | --- | --- |
| A. Aloitus, kartta, matkat | js/livia-tilanteet.js (koko), js/livia-eleet.js:100–210, js/livia.js (avaus, paljastus, lehtivinkki, mannerivihje), js/main.js:129–500 ja 1160–1315, js/kartta.js:1775–1800/1915/3765/4260–4301, js/ui.js:10491–10531, 11620–11900, 12054–12075, 13400–13475, 15857–15885, 16295–16320, 16943–16995, 19392–19530, 20226–20410, 21200–21410, js/pallolauta/{lauta,kamera,siirto}.js, js/game.js (visitCity, travelModes, mannerlennot, actionTravel/Roll/Move/Fly, XP, päivä, aikataulu, ennätys, juliste, kaikki `emit`) | `tausta.paluu`-poissaolon mittaria ei ole koodissa; muiden lautojen `cityCountry`/`cityManner`-taulut (erillislaudoista luovuttu 30.8.2026); js/pollo.js luettu vain rajapinnan osalta |
| B. Matkakirja, luenta, kortit | js/ui.js (renderFact, kortin kutistus/palautus, kaiutinnappi), js/luenta.js, js/livia-tilanteet.js, js/fokusvirta.js (huudahdus, saapumiskupla, luentakuva, pulucam, aarremerkintä), js/pulucam.js, js/fokusnosto.js, js/etsi-aarre-nappi.js, js/liviapuhe.js, js/visa.js:110 | js/nostoladonta.js (pelkkää ladontaa), js/lukija.js:n valikot ja äänivalinnat, js/media.js muutoin kuin luennan varareittinä |
| C. Kaupunkilehti ja maalehti | js/lehti.js (2413 r.), js/maalehti.js (1186 r.), js/nahtavyydet.js, js/kuvatekstit.js, js/tekijakortti.js, js/galleria.js, js/ui.js (openArrival, closeArrival, naytaKulttuuriKuva, paivitaTehtavaNappi/etsiKatko), docs/moduulit/kaupunkilehti.md, docs/moduulit/maalehti.md | Aihesivuilla ei ole `symboli`-kenttää eikä nähtyjen sivujen kirjanpitoa; postikorttipino (js/ui.js:2616) ja eläinkaruselli (js/elaintaky.js:768) kuuluvat matkakirjan ja kartan alueille |
| D. Chat, mikrofoni, odotus | js/pollo.js (chat, kysymisreitit, molemmat pyyntösovittimet, striimi, virheet, koko sanelupolku, kuplaperhe), js/livia-eleet.js:120–210, js/livia-chat-tila.js, js/livia-puhetila.js, js/lukija.js, js/puhe.js | Työhaara oli v1738:ssa: `waiting`/`waitingEnd` vasta v1739:ssä; chatin peruutuspolkua (AbortController) ei ole olemassa |
| E. Aarre, kohtaamiset, tarina | js/visa.js (824 r.), js/packs/kohtaamiset.js (276 r.), js/packs/fokusvirrat.js, js/packs/tarinakaari.js, js/kohtaamiskuvat.js, js/game.js (aarre-, voitto-, raha-, päivä-, lukkokohdat), js/ui.js (showWinner, playTokenReveal, naytaPolloAarre), js/fokusvirta.js, js/fokustehtavat.js, js/etsi-aarre-nappi.js, docs/tarina.md, docs/isoisan-raamattu.md, js/tyohuone-raamattu.js; kaikki 45 fokusvirtapakkia luettu ajonaikaisesti | **Horation väärinymmärrys-kohtauksia ja Raamatun sanastoa (yok, mañana, bitte, tere, boh, polako, saudade, gezellig, nicevo, aye; PEILAUS, PAINOLASTI, K3, YOVAHTI, LAKKIPISTE) ei ole vielä teksteissä** → rivejä `tarina.<kaupunki>.vaarinymmarrys` ei voi kirjata. **Muissa maanosissa ei ole fokusvirtaa lainkaan** (Afrikka, Aasia, Pohjois- ja Etelä-Amerikka, Oseania, Lähi-itä): saapumiset kulkevat vanhaa saapumistaulua, eikä pulun kuplaa ole. Kevyissä pakeissa (6 kpl) ei ole `aarremerkinta`-kenttää eikä kohtaamista |
| F. Linssit | js/linssit/rekisteri.js ja kaikki kahdeksan käytössä olevaa linssiä (ihmisen-matka + sen -kertomus/-esitys/-luenta/-tutkimus/-kortti/-muisti, keksinnot, radio, pallo, topografia, vesistot, vertailu, maatiedot), js/aikajana.js, js/aikajana-valikko.js, js/linssit/aikaselain.js, js/tiedeliite.js, docs/moduulit/linssit.md | Ihmisen matkan avaus (musta, tähdet, Afrikka, Marokko, pulun sisääntulo) on työn alla toisessa haarassa — tiedosto:kohta täytettävä haaran sulautuessa. Vertailu- ja maatiedot-linssien sisäiset tilanteet (asteikon vaihto, maan poisto) kartoittamatta. Rekisterissä kommentoidut linssit (historia, ilmasto, kielet, leviaminen, maaluvut, muuttoliike, tahdet, tuulet, yokartta) eivät ole olemassa |

## Päällekkäisyydet ja sovitussäännöt

**Sääntö (Fable 10.9.2026):** puhe/luenta > odotus > kortti > tunnetagi >
taustaele. Vanhentunutta elettä ei jonoteta: myöhästynyt tagi jätetään
laukaisematta, ei siirretä seuraavaan rakoon.

| # | Pari tai ryhmä | Voittaja |
| --- | --- | --- |
| 1 | `matkakirja.luenta.*` (kuuntelu) vs. `pulu.kommentti.alku` | Luenta. Kommentti odottaa `luennanLoppuun`-lupausta (js/fokusvirta.js:1204) |
| 2 | Luenta vs. `pulu.huudahdus.valihuuto` | Äänessä kertoja, eleessä välihuuto (2 s). Ainoa sallittu päällekkäisyys (`vaista:false`) |
| 3 | `pulu.kommentti.alku` vs. `paljastus.tuuraus.*` (ensisaapuminen) | Paljastussarja; `odotaPaljastus` pidättää kommentin |
| 4 | `pulu.kommentti.alku` vs. `etsiaarre.nappi.nousu` vs. `pakka.nousu` (sama koukku js/fokusvirta.js:1160–1181) | `pulu.kommentti.alku`. Pakka ja nappi ajastetaan ensimmäisen kuplan jälkeen tai jätetään tagittomiksi |
| 5 | Luennan loppu vs. `luentakuva.pienennys.luennanloppu` vs. kortin palautuksen peruutus | Hiljaisuus — kaikki kolme ovat teknisiä; tunne kuuluu vasta kommentille |
| 6 | `pakka.nousu` vs. luennan pienennyskello | Pakka (js/fokusvirta.js:2625 `puluCamPakassa`); kartan liike kutistaa molemmat yhdessä |
| 7 | `kortti.nosto.avaus` vs. käynnissä oleva luenta | Kortti voittaa yhden kerran (pulu siirtyy kortin viereen), sen jälkeen palataan kuunteluun |
| 8 | `matkakirja.aarremerkinta.avaus` vs. `pulu.kommentti.alku` | Aarremerkintä (isoisän suuri hetki) |
| 9 | Linssi vs. kaikki kartan tilanteet | Linssi. `linssiEstaa` sulkee nostokortit ja pysäyttää kommentin kellon |
| 10 | Kaupungista lähtö vs. mikä tahansa kesken oleva ketju | Lähtö (`vaiennaLivianKaupunkipuhe`, js/fokusvirta.js:858) |
| 11 | `lehti.paluu.kartalle` ja `lehti.maaliite.avaus` vs. kohdetapahtuma | Kohdetapahtuma (`lehti.sulku`, `lehti.maalehti.avaus`) — nappirivit eivät saa omaa tagia |
| 12 | `lehti.katko.laatta` vs. `lehti.sulku` | Kätkö; sulkueleen on vaiettava (js/ui.js:13614 kutsuu `closeArrival`:n itse) |
| 13 | `lehti.ennennyt.suurennus` vs. `lehti.kuva.suurennus` | Ennen/nyt-erikoistapaus (sama `naytaKulttuuriKuva`) — vain toinen laukeaa |
| 14 | `lehti.nosto.syvennys` ja `lehti.kartta.suurennus` vs. `kortti.nosto.avaus` | Nostotila (B6) — C ei saa kytkeä toista reaktiota samaan korttiin |
| 15 | Puhe vs. `chat.avaus` / `chat.sulku` / `chat.odotus.*` / `chat.vastaus.valmis` | Puhe (js/livia-eleet.js:196 ja :126) |
| 16 | Odotus vs. muut chat-tilanteet | Odotus (js/livia-eleet.js:140 pudottaa kaiken kun `odotukset.size > 0`) |
| 17 | `chat.peruutus`: `chat.sulku` vs. käynnissä oleva odotus | Ratkaistu v1744: sulku peruu pyynnön ja odotuksen samalla hetkellä (T3 tehty) |
| 18 | Lehti + odotus | Odotus (`scratch`); lehden `glasses` ei laukea odotuksen päällä |
| 19 | `kupla.saapuminen` (D) vs. `pulu.kommentti.alku` (B) vs. `tarina.kaupunki.kommentti` (E3) | Sama hetki: B kuvaa mekaniikan, E3 kantaa sisältötagin, D:n rivi on pöllökerroksen näkymä. Tagin lähde on E3 |
| 20 | `aarre.vastaus.vaarin` vs. `kohtaaminen.<id>.vaarin` | Hahmon repliikki (`kohtaaminen.<id>.vaarin`), kun kohtaaminen on olemassa; muuten moottorin tuomio. Vain toinen |
| 21 | `aarre.uusiYritys` vs. `aarre.vastaus.vaarin` | `aarre.uusiYritys` korvaa väärän vastauksen tagin kaarikaupungissa |
| 22 | `aarre.loyto.katko` vs. `aarre.palkkio.explore` | Löytö; palkkiokupla jää tagittomaksi |
| 23 | `aarre.loyto.unohdettu` vs. `aarre.mannerlento` | Löytö; mannerlentoilmoitus seuraa sen tagia |
| 24 | `tarina.venetsia.albumi.5` vs. `tarina.venetsia.kommentti` (molemmat `rakkaus` 0,8) | **Vain toinen samassa käynnissä** (päätoimittajan päätös): kumpi ehtii ensin, se laukeaa |
| 25 | `eteneminen.paiva` (A) vs. `peli.paiva.vaihtuu` (E5) | Hiljaisuus (E5) — päivän vaihtuminen on renderöinti, ei tilanne. A:n `miettiva` 0,3 poistuu |
| 26 | `eteneminen.aikataulu` (A) vs. `peli.aikataulu.merkinta` (E5) | E5:n `miettiva` (0,5) — aikataulurivi on tarinaa, ei uhkaa |
| 27 | `eteneminen.ennatys` (A) vs. `aarre.ennatys` / `peli.ennatys.ohi` (E) | E:n kaksi riviä (`ylpea` 0,7 alle 80 pv, `lammin` 0,55 yli) |
| 28 | `eteneminen.raha.loppu` (A) vs. `peli.vararikko.pankkiapu` (E5) | E5:n `lammin` (0,5) — pankkiapu ei nolaa pelaajaa |
| 29 | `laukku.uusi-linssi` (A) vs. `peli.linssi.avautui` (E5) | Sama hetki; tagi `ilo` (0,65), lähde js/game.js:1035 |
| 30 | Kertoja vs. jakson tunnetagi (Ihmisen matka) | Jakson tagi voittaa jakson alussa; kun `seuraaLivianKuuntelua` kytketään linssiluentaan, `narration` täyttää vain välit |
| 31 | Jakson tagi vs. jakson pulun kupla (ranta, denisova, beringia, loppu) | Jakson tagi; kupla jää eleettömäksi tai saa matalan tagin (≤ 0,35) — Fablen päätettävä |
| 32 | `linssi.yhteinen.sulku` vs. lykätyn kuplajonon purku | Sulkutagi ajastetaan jonon PURUN EDELLE tai jätetään pois |
| 33 | Linssin vaihto: vanhan sammutus vs. uuden sytytys (`kerros.js:419`) | Uuden linssin avaus; vanhan sulku ei saa tagia |
| 34 | `linssi.maatiedot.maalehti` vs. `lehti.maalehti.avaus` | `lehti.maalehti.avaus` (C) — yksi ele lehden avautumisesta |

## Epävarmat kohdat (omistajalle)

1. **Näkyykö pulu modaalin päällä?** js/livia-eleet.js:123/128 estää kaikki
   tilannereaktiot, kun `dialog[open]` osuu. Laukku, kaupunkilehti,
   saapumiskortti ja visa ovat dialogeja. Onko kyse hiljaisuusriveistä vai
   portin höllennyksestä (esim. salli, kun avoin dialogi on lehti)?
2. **Kuuluuko raha pulun repertuaariin?** `eteneminen.raha.nousi`
   laukeaisi jokaisesta oikeasta vastauksesta. Ehdotettu 25 £ kynnys on
   arvaus; vaihtoehto on jättää raha kokonaan aarrejuhlaan.
3. **Yksi vai kolme saapumisriviä?** `saapuminen.kaupunki.alku` / `.uusi` /
   `.paluu` kuvaavat samaa hetkeä. Riittäisikö yksi rivi + `uusi`-lippu?
4. **Aarremerkinnän sävy.** B ehdottaa `hammastys` 0,7 (avaus) + `ylpea`
   0,6 (kuittaus), E `vakava` 0,55. Kaksi lähes 0,7:n elettä alle minuutin
   sisällä on paljon.
5. **Aihesivun symboli.** `KULTTUURI_KATEGORIAT` / `MAA_KATEGORIAT`
   kantavat vain `id` ja `nimi`. Kirjataanko symboli aineistoon vai
   johdetaanko se id:stä koodissa?
6. **Venetsian `photo`-tagi lehdessä.** Sama `cityId`-ehto antaisi
   Venetsian lehden jokaiselle kuvalle rakkauseleen — rajattava kartan
   pulucam-pakkaan.
7. **Chatin pitkä odotus.** `chat.odotus.pitka` (6 s) — korvataanko `think`
   vai lisätäänkö kertaluonteinen `hammentynyt`?
8. **Ateenan saapumiskupla.** `SAAPUMISKUPLA_VAITI` on tyhjä (vaiennus
   purettu 8.9.2026), mutta js/packs/fokusvirta-ateena.js:n kommentti
   väittää yhä toisin; lisäksi Ateenassa tulee kaksi ohjekuplaa. Tagien
   törmäys tarkistettava pelissä ja vanhentunut kommentti poistettava.
9. **`pollo.teksti` vs. `pollo.kommentti`.** 20 kaupungilla on molemmat
   kentät. Jos vanha `teksti` piirtyy jossain kulussa vielä ruudulle, se
   tarvitsee oman rivinsä.
10. **Radion sammunut nappi.** Onko napautus kanavattomaan kaupunkiin
    ylipäätään tapahtuma, jonka pulun pitäisi huomata?

## Puutelista (priorisoitu)

### 1. TEKNISET HOOKIT (tekstisessiolle)

**A. Rakenteelliset esteet — nämä ensin, muuten kytkennät eivät näy.**

- **T1. `dialog[open]`-portti (js/livia-eleet.js:123 ja :128).**
  `if(!nakyy()||odotusrivi||doc.querySelector('dialog[open]')||…)return false;`
  estää jokaisen tilannereaktion, kun mikä tahansa dialogi on auki.
  Kaupunkilehti (`#arrival-dialog`), matkalaukku, saapumiskortti, visa ja
  kohtaamiskortti ovat dialogeja → koko osa-alue C, `laukku.*`,
  `vihje.lehtivinkki` ja kaikki visan tilanteet ovat kytkettävissä vain
  paperilla. Tarkennettava (esim. salli, kun avoin dialogi on juuri se
  näkymä, jossa pulu on) tai kirjattava hiljaisuudeksi. **Odottaa
  Epävarma 1:n päätöstä.**
- **T2. `seuraaLivianKuuntelua` ei kata kaikkia luentoja.**
  js/luenta.js:541 kytkee kuuntelun VAIN kun `url === ui.diaryFullUrl`.
  Aarremerkinnän luenta, nostokortin luenta, lehden lukija ja koko
  linssikerros (js/linssipuhe.js, js/linssit/ihmisen-matka-luenta.js)
  jäävät ulos — pulu ei "kuuntele" kertojaa niissä lainkaan.
- **T3. TEHTY v1744** (tekstisessio, PR #2217): `kysy`-kierros omistaa
  AbortControllerin, `sulje` peruu vain oman pyynnön ja vapauttaa odotuksen
  heti; `pyyda`/`pyydaStriimi` ottavat valinnaisen signaalin.
- **T2 TEHTY v1747** (PR #2220): pulu kuuntelee myös lehden ja nostokorttien
  lukijaa (erillinen lukijasoitin). Koko T2 valmis.
- **T2 linssit v1746** (PR #2219): pulu kuuntelee myös linssien kertojaa
  (js/linssipuhe.js, Ihmisen matkan kertomusluenta). Jäljellä: erillinen
  lukijasoitin (aarremerkintä, nostokortit, lehden lukija).
- **T2 osittain v1743** (PR #2216): pulun kuuntelu säilyy odotuksen ja
  taukojen yli (livia-eleet, livia-nostotila, livia-tilanteet, luenta.js).
  Erilliset lukija-/linssisoittimet yhä ilman kuuntelua (tekstisession jono).
- **T4. TEHTY v1745** (tekstisessio, PR #2218): virhetagit keskitetyllä
  error-tapahtumalla (Pollo.virhereaktio); ohittaa vain 2,8 s reaktiovälin,
  ei puhetta, luentaa tai odotusta. Alkuperäinen puute:
- **T4 (vanha). Virhepolut ovat mykkiä.** `chat.virhe` (5710), `chat.virhe.kayttoraja`
  (5731), `chat.vastaus.varateksti` (5628), `chat.vastaus.katkesi` (5645)
  ja mikrofonin virheet (6136, 6144/6165, 6161) eivät ilmoita mitään;
  `answer` on nimenomaan estetty näissä eikä korvaavaa tilannetta ole.

**B. Tilanne-ID → funktio, johon kutsu kuuluu** (tiedostoittain).

| Tiedosto | Funktio / kohta | Tilanne-ID:t |
| --- | --- | --- |
| js/fokusvirta.js | `fokusvirtaSaapumiskupla` → `nayta` (r. ~1160–1172) | `pulu.kommentti.alku`, **kaikki 45 `tarina.<kaupunki>.kommentti`** (tagi `data.pollo.tunne`), `etsiaarre.nappi.nousu`, `pakka.nousu` (ajastettuna) |
| js/fokusvirta.js | `ajastaHuudahdus` → `nayta` (r. 1004, ajastin 979) | `pulu.huudahdus.valihuuto` |
| js/fokusvirta.js | `naytaLuentakuva` (1858/1863) | `luentakuva.nousu` (jos Fable antaa sille tunteen) |
| js/fokusvirta.js | `avaaSuurennos` (2789) | `luentakuva.suurennos.avaus`, `pakka.kortti.avaus` |
| js/fokusvirta.js | `avaaLuentakuvanKaruselli` (2079), `nostaPuluCamKortti`-haara | `pakka.isoisankuva.nosto` |
| js/fokusvirta.js | `ilmoitaLivianTilanne('photo', …)` -rivin viereen (2152) | `tarina.venetsia.albumi.1–5` (tagi `kuva.tunne`) |
| js/fokusvirta.js | `avaaAarremerkinta` (4964, merkinnän kirjoituksen alussa) | `matkakirja.aarremerkinta.avaus` (tagi `data.aarremerkinta.tunne`) |
| js/fokusvirta.js | `kerroAarteesta` (4858–4862, kuplan noustua) | `matkakirja.aarremerkinta.kuittaus` |
| js/fokusvirta.js | `polloKuplasarja` (4721), vain kun `i === 0` | `pulu.kuplasarja.paluu` |
| js/fokusvirta.js | `naytaPolloKupla`-kutsun viereen (4764) | `vihje.lehtivinkki` (vaatii T1) |
| js/visa.js | `renderQuiz` → `avaus()`, `ui.kohtaamisetNahty.add(...)` -rivin jälkeen | `kohtaaminen.<id>.tervehdys` (tagi `kaariTarina?.tunne ?? kohtaaminen?.tunne`) |
| js/visa.js | `renderQuiz` → `kysymys()` ennen `pelkistaKysymysvaihe` | `aarre.kysymys.esilla` |
| js/visa.js | `renderQuiz`, varoituslohko (`viimeinenYritys`) | `aarre.kysymys.viimeinenYritys` |
| js/visa.js | `renderQuiz`, `quizHint`-painallus | `aarre.vihje` |
| js/visa.js | `renderQuiz` tuloskortti, `kohtaaminen`-repliikkilohko | `kohtaaminen.<id>.loyto` / `.tyhja` / `.vaarin` (tagit `tunneLoyto`/`tunneTyhja`/`tunneVaarin`) |
| js/visa.js | `answerQuiz` → `after`, `sfx.play(...)` -rivin jälkeen | `aarre.vastaus.oikein`, `aarre.vastaus.vaarin`, `aarre.lukittui` |
| js/visa.js | `answerDuelUi` → `after` | `aarre.rosvo.voitto`, `aarre.rosvo.tappio` |
| js/visa.js | `timeUp` (molemmat haarat) | `aarre.vastaus.aikaLoppui` |
| js/ui.js | `playTokenReveal` heti `rakennaPaljastus`-kutsun jälkeen (~18990) | `aarre.paljastus.alku`, `aarre.loyto`, `aarre.loyto.unohdettu` |
| js/ui.js | `naytaPolloAarre` (19131) alussa | `aarre.loyto.pollo` |
| js/ui.js | `showWinner` heti `sfx.play('win')` -rivin jälkeen (18366) | `peli.voitto` |
| js/ui.js | `renderFact` fokusvirtahaara (12757, `uusiFactKey`-kutsun jälkeen) | `matkakirja.kortti.avaus` |
| js/ui.js | `factCard` click-kuuntelija (2751) | `matkakirja.kortti.lappu.avaus` |
| js/ui.js | `openArrival` (13749) / `closeArrival` (15877) | `lehti.avaus`, `lehti.sulku` (vaatii T1) |
| js/ui.js | `naytaKulttuuriKuva` (14441) | `lehti.kuva.suurennus`, `lehti.ennennyt.suurennus` |
| js/ui.js | `etsiKatko` (13607) | `lehti.katko.laatta` |
| js/ui.js | `openPassport` (16960) / `suljeLaukku` (16978) | `laukku.auki`, `laukku.kiinni` (vaatii T1) |
| js/ui.js | `renderTurnPill` (10527, `kelloEdellinen !== kello`) | `eteneminen.paiva` (jos ei jää hiljaisuudeksi) |
| js/ui.js | `emit('aid', …)` -kuuntelija (moottorin sijaan, ettei js/game.js tarvitse DOM-kuorta) | `peli.vararikko.pankkiapu`, `aarre.ennatys`, `peli.ennatys.ohi`, `laukku.uusi-linssi` / `peli.linssi.avautui`, `eteneminen.raha.nousi` |
| js/ui.js | `aloituslento`-polku (13443 `fokusvirtaSaapuminen`-kutsun vierestä) | `saapuminen.kaupunki.alku` / `.uusi` / `.paluu`, `saapuminen.maa.uusi`, `saapuminen.manner.uusi` |
| js/ui.js | `doFly` (19452, ennen `flight-active`-luokkaa) | `matka.lento.lahto` |
| js/ui.js | `this.run(...)` (19424) maitse/meritse-haaroissa | `matka.kavely.lahto`, `matka.laiva.lahto` |
| js/ui.js | `vaiennaPaikanPuhe` (12054) | `poistuminen.kaupunki` (yksi kytkentä kattaa doWalkin ja doFlyn) |
| js/main.js | `attach(saved)` jälkeen, ennen `saveGame` (1286) | `aloitus.jatko-tallenteesta` (tarvitsee lipun, ettei laukea `startGame`-polulla) |
| js/livia.js | `naytaRepliikki` (303) | `avaus.repliikki` (tagi `LIVIAN_AVAUS`-taulukon riveihin) |
| js/livia.js | `peruLivianAvaus` (408) | `avaus.perutaan` |
| js/livia.js | `paljastusRepliikki` (594) | `paljastus.tuuraus.alku`, `.loppu` |
| js/livia.js | `paivitaMannerivihje` (860, kuplan näyttökohta) | `vihje.mannerivihje` |
| js/etsi-aarre-nappi.js | `naytaEtsiAarreNappi` (222, ennen `return true`) | `etsiaarre.nappi.nousu`, `etsiaarre.nappi.paluu` |
| js/fokusnosto.js | `avaaNostonKortti` (1004, `merkitseLivianNosto` kuljettaa `nosto.tunne`) | `kortti.nosto.avaus`, `lehti.nosto.syvennys` |
| js/fokustehtavat.js | `pullaOstosnappi` (onnistunut `actionPullaOstos`) | `aarre.vihje.pulla` |
| js/game.js | `emit('stuck', …)` (1565) | `matka.jumissa` |
| js/lehti.js / js/maalehti.js | Kumpikaan ei tuo js/livia-tilanteet.js:ää lainkaan. Kutsupaikat: `avaaMaalehti` (lehti.js:814), `piirraTutkiSivu` aihesivun kohdalla (lehti.js:553), `avaaUutinen` (lehti.js:2262), radionapit (maalehti.js:257, :306) | `lehti.maalehti.avaus`, `lehti.aihe.*`, `lehti.uutinen.avaus`, `lehti.media.*` |
| js/tekijakortti.js | `avaaTekijaKortti` (98) | `lehti.tekijakortti.avaus` |
| js/nahtavyydet.js | `avaaNahtavyys` (1637), matkaopas (1432/1447), karttasuurennos (1015) | `lehti.nahtavyys.avaus`, `lehti.matkailijalle.opas`, `lehti.kartta.suurennus` |
| js/pollo.js | `naytaNukkuva` (4093), `avaaKohde` (4152), `naytaPaikkaKartalla` (5426), valikkovihje `lisaaPinoon`-ohitus (2374) | `chat.avaus.nukkuva`, `chat.linkki.matkakirja`, `chat.paikka.kartalla`, `kupla.vihje.valikko` |
| js/aikajana.js | avausjakso (698–753), Käynnistä (744), `aloitaAlusta` (3053), `avaaValinaytos` (5324), `aloitaValinaytoksenPuhe` (5427), ajon päätös (1928), `pysaytaAikajana` (6393) | `linssi.yhteinen.aloituskortti`, `.kaynnista`, `.alusta`, `linssi.keksinnot.merkkipaalu`, `.merkkipaalu.pulu`, `.loppu`, `linssi.yhteinen.sulku` |
| js/linssit/kerros.js + js/ui.js | `vaihda` (kerros.js:419), `sytytaLinssi` (ui.js:17686), `esikatseleLinssi` (ui.js:17921) | `linssi.yhteinen.avaus`, `.vaihto`, `.esikatselu` |
| js/linssit/aikaselain.js | `onValinta` (246) | `linssi.yhteinen.aikaselain.valinta` |
| js/linssit/ihmisen-matka-kertomus.js | `KEKSINNOT_PULUN_HUOMIOT` (346–353) — merkkijono → `{ teksti, tunne }`; js/aikajana.js:n lukupaikka päivitettävä samalla | `linssi.keksinnot.pulun-huomio` |
| js/linssit/ihmisen-matka-tutkimus.js / -kortti.js | `luoVirtanapit` (223), `avaa` (kortti.js:350), `kysyPululta` (406) | `linssi.ihmisen-matka.tutkimus.virtanappi`, `.nostokortti.avaus`, `.nostokortti.kysymys` |
| js/linssit/radio.js | `soitaKaupunki` (1270), `lukitseAsema` (892), `haivytaLahetysSisaan` (919), `onkoKanavaa` (444), kuollut asema (1222), `pois` (1712) | `linssi.radio.kanava`, `.kuuntelu`, `.ei-kanavaa`, `.kuollut-asema`, `.sulku` |
| js/tiedeliite.js | `avaaTiedeliite` (627), `karusellinKohta` (307) | `linssi.keksinnot.tiedeliite.avaus`, `.sivunvaihto` |
| js/vertailu.js | `tahdistaVertailu` (284), `tahdistaMaatiedot` (391) | `linssi.vertailu.valinta`, `linssi.maatiedot.maalehti` |

**Ei tarvitse hookia** (jo kytketty tai perusteltu hiljaisuus):
`saapuminen.pulunkuvat`/`pakka.kortti.*` (K, js/fokusvirta.js:2152),
`joutohetki.*`, `tausta.piiloon`, `hiljennys.*`, `matka.kavely.matka`,
`matka.lento.matka`, `kartta.panorointi` — nämä elävät
js/livia-eleet.js:n omassa kerroksessa.

### 2. SISÄLTÖTAGIT (Fablelle)

Nämä odottavat tietomallia. Periaate: **ei rakennemuutosta** — tagi on
yksi valinnainen kenttä siellä, missä teksti jo on, ja puuttuva kenttä
käyttäytyy täsmälleen kuten tänään (ei elettä).

1. **js/packs/fokusvirta-*.js — `pollo.tunne`** (45 kaupunkia,
   `{ tunne, voimakkuus }`; taulukko sallittu, jos kuplia on useampi:
   `kommentti[i]` ↔ `tunne[i]`). **Tämä on v1741:n työ** — rinnakkainen
   agentti lisää kentät ja js/fokusvirta.js:n kutsun samassa julkaisussa.
   Samalla kaavalla: `matkakirja.tunne` (useimmiten jätetään pois:
   luennan aikana kuunnellaan), `aarremerkinta.tunne` (oletus `vakava`
   0,55), `pollo.kuvat[i].tunne` (**Venetsian viisi kuvaa**: utelias 0,5
   → lammin 0,6 → hammentynyt 0,6 → rakkaus 0,7 → rakkaus 0,8),
   `kohtaaminen.tunne`.
2. **js/packs/kohtaamiset.js — `tunneTervehdys`, `tunneLoyto`,
   `tunneTyhja`, `tunneVaarin`** (8 kaupunkia, kaikki valinnaisia).
   Erilliset kentät eikä sisäkkäinen olio, koska js/visa.js valitsee
   repliikin jo nyt kolmen kentän joukosta ja osaa poimia tagin yhdellä
   merkkijonoliitoksella (`kohtaaminen['tunne' + Nimi]`). Oletukset
   annetaan js/visa.js:ssä vakioina → kentät kirjoitetaan vain
   poikkeuksiin (E2:n taulukko).
3. **js/tyohuone-kehitys-data.js — `KAARI_PAKETIT.kohteet[i]`:
   `tunneKohtaaminen`, `tunneAarre`** (41 kaarikohdetta). js/packs/
   tarinakaari.js kopioi kohteen sellaisenaan, joten kentät ovat pelissä
   ilman muutoksia hakemistoon; työhuoneen esikatselu ei riko.
4. **Ihmisen matkan 14 jaksoa ilman tagia**: afrikka, siirtyma-afrikka,
   omo, levantti, arabia, intian-rannat (ehdotettu hiljaisuus),
   napapiiri, white-sands, chile, aikahyppy (ehdotettu hiljaisuus),
   eurooppa, meri, uusi-seelanti + `linssi.keksinnot.loppu`.
   Lisäksi **`australia` 0,72 → 0,68 korjattava sisällössä**
   (js/linssit/ihmisen-matka-kertomus.js).
5. **`KEKSINNOT_PULUN_HUOMIOT` (3 kuplaa)** tarvitsee muodon
   `{ teksti, tunne }` ennen kuin tagi voidaan kirjata.
6. **Kiinteät tagit koodissa, ei dataan** (jotta toimituslinjan luvut
   pysyvät yhdessä paikassa): `aarre.vastaus.*`,
   `aarre.tiimalasi.loppusuora`, `aarre.loyto*`, `aarre.kuittaus`,
   `peli.voitto` (0,9), `peli.vararikko.pankkiapu`, `aarre.rosvo.*`.
7. **Odottaa sisältöä:** Horation väärinymmärrys-kohtaukset (noin 12
   kaupunkia) ja Raamatun sanasto. Kun ne kirjoitetaan, luonteva tagipari
   on Horation kohdalla `hammentynyt` (0,5) ja Livian korjauksessa
   `ylpea` (0,55) tai `ilo` (0,5). Rivejä `tarina.<kaupunki>.vaarinymmarrys`
   ei voi kirjata ennen sitä.
8. **Aihesivujen id → symboli -taulu** (osa-alue C) tarvitaan, ennen kuin
   `lehti.aihe.*` -rivit voivat saada tagin datasta.

## Muutosloki

10.9.2026 — ensimmäinen kartoitus (Opus-parvi A–F, Fablen katselmus);
45 kaupungin tunnetagit sisältöön v1741.
11.9.2026 — T3 tehty (v1744, chat.peruutus K); T2 osittain (v1743,
kuuntelu säilyy odotuksen ja taukojen yli); T4 tehty (v1745, 7 virheriviä
K/T); T2 linssit v1746; T2 valmis v1747 (lukija). Fable.
