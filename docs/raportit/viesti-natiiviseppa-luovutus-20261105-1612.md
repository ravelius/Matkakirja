# Natiivisepän luovutus 5.11.2026 klo 16.12 (konteksti yli 25 %, pehmeä raja, 7.37)

Korvaa -1558:n jonon. Muu -1558, -1543, -1525 ja -1510 lisäyksineen pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta. Lue Raamattu 7.47:n rivi. Remote päälle, T7-Monitor uudelleen (pid 58484, kopioi.log vain ALOITUS 13.28; ei poistoja ennen PT:n lupaa).

## Jono
1. Tyhjä pohja: uusi johtolanka alla, EI korjattu. Omistajan sana "lähti hän miten nopeasti tahansa" -1525:ssä.
2. Intro KK 16.01 sanasta sanaan: "Sanat 15.18 eivät vielä täyty kohdassa '3d rakennukset näkyvät hyvin': kamera lähemmäs ja keskemmälle, niin että Notre-Dame ja Louvre ovat kierron aikana selvästi näkyvissä eivätkä pieniä ruudun yläosassa. Samassa: i07:ssä nimet ja kyltit häipyvät PARIISI-otsikon ajaksi, pieni PARIISI, RANSKA -rivi ei osu kirjaimiin, ja selvitä sumeus. Jättinimet ja muut n-1km-85:n viat jatkuvat." Aloittamatta. Rungon vaihtoehto -1543:ssa: matalampi kierto (KaariAst), KiertoOhje.
3. n-1km-85:n viat (-1558).
4. JU:n ajo natiiviseppa-liiku-99748962f (pyydetty 16.0x, jonossa, 6 kuvaa): katso l2-ranska (kaikki kohteet ruudussa, rengas ei PARIISI-nimen päällä; `komento nimet etsi Pariisi` lokissa), l4-paluu-valmis (sama kuin l0-lepo, 60° palasi), l5. Sitten kuva KK:lle ja PT:lle, KK:n sanat -1510:ssä: myös ruudukko merellä kanaalilla (ei tarkistettu) ja "Lippu odottaa Pariisia". -1510:ssä lupasin katsoa, onko ruudukko vain Macin ajossa: vertaa iPadin vanhaan kuvaan, ei uutta iPad-ajoa.

## Haara: natiiviseppa/liiku-loitonnus-219 99748962f
Pohja 5282b9fc4, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto-koe, peili natiivi-backup peili/proto/natiiviseppa/liiku-loitonnus-219. Oma haara, koska porras-haara oli silloin JU:n ajon työpuussa (-1558 pyysi samaa haaraa). PalloLiikeTestit 15/15, tarkista.sh 0 virhettä (tyylikirjan kolme tiedostoa palautettu). Ei nähty ajossa.
- PeliOhjain.LiikuLoitonna: PalloKierto.SovitaPisteet (moottori sama kuin nopan kohteilla), oma paikka + MahdollisetReitit-toiset päät, marginaali 14 %, kallistus 0, pohjoinen ylös, AjoPystyyn. Kesto KeskustaanS 2,6 s: 1,4 s rikkoi kameratestin zoomausnopeuden 5,4 ln/s.
- Paluu (AjaNakymaan, KaannaSuuntimaan): Liiku-napin toinen painallus (testi `ui liiku peru`), kartan napautus, painallus muualle UI:ssa, Odota. Ei paluuta: pelaajan veto tai nipistys, kaupungin napautus, kulkutavan valinta, kaupunki vaihtunut. Kartan napautusta ei testata.
- Omat valintani, kerrottava KK:lle: koskee kaikkia kaupunkeja, joissa kohteet eivät mahdu ruutuun, ei vain Pariisia; "Ranskan taso" syntyy kohteista, ei maan laatikosta.
- Renkaat l103:ssa ovat reittien askelhelmiä (Reitit.Helmet), eivät kohdekaupunkeja. Reitit.HelmiLaatikot varataan nimiltä KaupunkiMerkit- ja Nimikerros-kerroksissa. Riippuu siitä, että PARIISI-nimi väistää varauksia (Merkittavat.Siirto); NUI hoitaa samaa nimeä (KK 15.30, kyltit-219): katso, ettei jää ristiin.
- Riski: vaakapuhelimella Liiku-rivi voi peittää kohteen, marginaali on symmetrinen.

## Porras 5282b9fc4 katsottu (kerrottu KK:lle ja PT:lle 16.1x)
lokit/natiiviseppa-porras-5282b9fc4. p01–p03 pienennettyinä, p04–p14 katsomatta. PUUTE oleta aloitusintro Lontoo, sama kuin ennen; POIKKEUS ArgumentOutOfRange 16.00.55 ennen pelin alkua.
- Ennakko toimii kuten pitikin: pyynnöt alkavat 0,26 s (z11 14/10, z12 14/8), 0,89 s z12–z13; ennen 3,31 s. Olettama kuvakoosta siis piti tässä ajossa.
- Tyhjä pohja EI korjautunut: p01 yhä hiekkaa Ranskan tasolla. p02 kartta, mutta oikeassa yläosassa vino raja vaaleampaan tasoon, syy auki. p03 kartta valmis.
- JOHTOLANKA (loki, ei vielä selitetty): 4,00 s pallo 100 % 137 laattaa 769 km:ssä; 4,26 s heti laskun alettua pallo 14 % 0 laattaa, ruudulla 0, eikä mitään 6,26 s asti (45 km); 6,52 s 25 laattaa. Kartta siis oli piirrettynä ja katosi laskun alkaessa. Etsi, mikä nollaa kartan 4,0–4,26 s (tyylin vaihto, tileset- tai overlay-vaihto, SaapuminenAlkaa, siirtymä zoomaukseen). Tämä voi tehdä portaan turhaksi: tarkista, ennen kuin lisäät mitään.

## Muuta
KK:n 16.01 sanoi, että KK vie i03 ja i07 omistajalle. Työpuu wt/proto-natiiviseppa-kierto vapaa (ajo valmis). Zsh: `echo ====` kaataa komennon. tarkista.sh muuttaa aina tyylikirjan kolme tiedostoa: git restore ennen committia.
