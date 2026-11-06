# Natiivisepän luovutus 6.11.2026 klo 09.01 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa -0839:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" uudelleen (Raamattu 7.41; proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py): ajastus kuolee sessionnollauksessa. Tämän päivän 09-tarkistusta ei ajettu.

## SEURAAVA TYÖ
0. ENSIN, PT 09.0x (ehto "aito pieni kohde ei madallu" ei täyty; ennen v5:n ajoa, ilman omaa ajoa; tulos KK:lle ja PT:lle):
   - Nimetyt madaltuneet läpi yksitellen, ei vain listana (palat-v5-nd-ranta.muutokset.json, kentät nimi, ennen, nyt; 59 kpl). Octroi de Neuilly way/81203962 15 → 3,5 m on aito kohde (PT). Sellaiset oikeaan korkeuteen tai pois säännöstä. Katso myös nimettömät erikoislajit (civic, government, public).
   - 223 ylös noussutta: onko uusi pylväs. Suurin way/73112440 ja rinnakkaiset way/73113705, way/73117340 (noin 10 m², 15 → 36,2 m, 48.8956 2.4079) sekä height-merkityt way/78534896, way/78535883 (noin 9 m², 3 → 15 m). Tarkista, onko talo kiinni tornissa vai irrallaan; irrallinen on pylväs.
   - Muutos koodiin tarkoittaa UUTTA kansiota (esim. palat-v6-nd-ranta), koska KS:llä on v5:n polku. KS:lle sanottu 09.0x: älä aja v5:llä ennen seuraajan sanaa. Kerro uusi kansio KS:lle.
1. Tarkista viestit: KK:lta ja PT:ltä voi tulla vastaus v5:een (tasakattojen hinta, pylväät, kuopat).
2. Arvioi ajo 4: `/Users/Shared/Claude/proto-3d/lokit/karttaseppa-yhteinen-4-0b4d74011` (KS:n viesti 08.5x; v4:n ajo, EI v5).
   - sc-80: läikkä täysikoossa x 1485–1685, y 1840–1955, vertaa ajoon 127346f24 (KS ei verrannut). Read pienentää yli 2000 px:n kuvat: rajaa ensin. Seinän väri ja rinteiden sivuvaikutukset.
   - sc-45: painuvatko tai leijuvatko talot (odotus: ei muutosta).
   - etela-koe|etela-nyt, po-la-koe|po-la: talot rannassa, saari ilman taloja, seinäaukot, leijuminen. KS: litteä alue Louvren ja Châtelet'n välissä (po-la, x noin 1000–1250, y 1000–1350 2000 px:n leveydessä) näkyy molemmissa, ei johdu ND-maskista: selvitä, onko se v5:ssä korjaantunut katto vai eri vika.
   - ts-talot, hdv-talot ovat v4:llä, joten Hôtel de Ville seisoo ND-maskin litteällä alueella eikä Tour Saint-Jacques näy (ND:n takana). Eivät kelpaa arvioon; pyydä seuraavaan ajoon v5-nd-rannalla toisesta suunnasta.
   - keski-ylhaalta-nyt: ND:n sumea kiekko on KS:n pohja.png-asia, ei NS:n.
   - Tulos KK:lle viat nimettyinä, sc-80:n kuva mukaan; kopio PT:lle ≤ 3 riviä. KK 08.2x: tasainen oletukseksi vasta, kun v4:n seinät on nähty.
3. Kun KS:n v5-ajo tulee: katso kuvat pelistä (katso alla "ei nähty").
Ei omaa ajoa, ei junaan, ei iPadia.

## palat-v5-nd-ranta (KK 08.4x A, B, C ja PT 08.5x pieni talo; "KK:n ja PT:n sana viaksi, ei omistajan päätös")
- Kansio `_tyo/natiiviseppa/pariisi-talot/palat-v5-nd-ranta` (proto-3d), 0 virhettä (tarkista-palat.py). Koodi tee-palat.py sha 40b3ece2cef60c46, ei gitissä; v4:n koodi tee-palat-v4-nd-ranta.py.kopio (eb0d32671dfcb527). v4-kansiot ennallaan. Tasaista (ilman rantaa) v5:ttä ei tehty. tee-palat-v5.zsh estää kansion päälle ajon; rakensin saman kansion kolmesti ennen kuin sitä annettiin kenellekään (KS sai polun 09.00). **Tästä eteenpäin muutos vain uuteen kansioon.**
- Tehty: laivat building=boat/houseboat/ship pois (110); amenity=shelter pois (141; 261 aineistossa: 20 alueen ulkona, 74 alle 8 m², 25 roof, 2 maskissa); tasakatto vajaalle katolle; pienen talon korkeussääntö.
- Sääntö: alle 30 m² (relaatiossa koko talon ala), kioski tai 1-kerroksinen kauppa, jos ei omaa IGN:ää: oma height > kerrokset > 3,5 m; katon nousu 1 m, jos alle 8 m. Maa ennallaan. Omin päin lisätty: suojellut (historic, heritage, ref:mhs, wikidata, wikipedia, man_made, tower:type, memorial) ja kirkot ennallaan (59); ison IGN-talon sisällä ennallaan (29); height-merkintä. KK ja PT tietävät.
- Korkeudet: 5 025 muuttui, alas 4 802 (≥ 10 m 3 101, ≥ 30 m 24, suurin 64,6 → 3,5 way/81616238), ylös 223 (≥ 10 m 6, suurin 15 → 36,2 way/73112440). Lista palat-v5-nd-ranta.muutokset.json. Fontaine du Palmier ei muuttunut; way/49363302 18,7 → 4,2.
- Katot: puuttuva 2,18 → 0,18 km² / 34,0 km² (selvitys-yhteinen/v5-katto-kuva.py valmiista paloista, 1 px reuna pois). Jäljellä 31 taloa ≥ 100 m², pahin 407 m² way/74489765, reiättömiä kärkilistalla; syytä ei selvitetty (98 %:n raja? sisäänvedetty rengas?).
- Tapa: kattavuus < 98 % → tasakatto. Reiättömät kolmiot2; reiälliset viipale() (suorakaistat, peittää tarkasti), koska sillat menivät seinän läpi ja päällekkäiset kolmiot huijasivat pinta-alamittaria (Monnaie de Paris). Reiällisille lisätty peitto_kuva() myös ensimmäiseen tarkistukseen. Viipale tuottaa pitkiä kapeita kolmioita: etsi halkeamia pelikuvasta.
- Koko: 367 → 348 Mt, kolmiot 6 673 565 → 6 440 914, rinteet 1 408 306 → 942 433 (−33 %). Muistia ei mitattu.
- Tasakatto 17 701 talolla (14 %), myös kirkoilla (Saint-Séverin): KK:lle kerrottu hintana.
- Ei nähty pelissä. Riskit: 223 nousua (uudet pylväät), noin 930 madaltuvaa jakaa ≥ puolet seinistä (kortteliin kuoppia; luku esimittauksesta, sääntö tarkentui sen jälkeen), tasakattomaisema, viipaleen halkeamat. Kioskit ja KS:n 172: oma lukuni shop=kiosk 105, building=kiosk 90, päällekkäisyyttä ei laskettu.
- Kuvat selvitys-yhteinen/v5-parit/ (malli, ei peli; v4 vasemmalla, v5 oikealla). Skriptit: v5-parit.py, v5-ylhaalta.py, v5-muutokset.py, v5-katto-ulkona.py, v5-katto-kuva.py.

## Muu tila
Omistajan päätökset pätevät: rantakoe käytössä 08.40 (v5 tehtiin siksi vain rantaversiona), suojatut talot laatikoina, tasainen vasta v4:n seinien jälkeen. Koodi 7333833fe. Liiku 99748962f odottaa KK:n sanaa. Kyltit usvassa ilman rakennusta; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia. Valoseppä tekee Concorden aukiota OhjelmaKohteet-listaan: jos sen alalla on OSM-taloja, ne pitää lisätä OHJELMA-listaan; tarkistamatta.

## Viestit ja työtapa
Varakanava `mcp__ccd_session_mgmt__send_message` toimii. KK local_231e4bad, PT local_cf5b4eca, KS local_ddd980b0, NUI local_a3754ed8, JU local_b4a7e82a, Postivahti local_d8d003f6. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-marais. Palatiedostot python3.14:llä ilman -I:tä. `tee-palat.py <D> <uusi kansio> [korvaus.json]`. Korvaus: selvitys-yhteinen/nd-ranta/korvaus.json.
