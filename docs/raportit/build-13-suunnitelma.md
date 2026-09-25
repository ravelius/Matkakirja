# Build 13 -suunnitelma (Natiiviseppä 25.9.2026 klo 05.1x)

Build 12 = proto-master b79f036 = TestFlight 1.0.12. Integraatiohaara **juna/b13** avattiin masterista b79f036.
Merget junaan: `proto-3d/tyokalut/juna-merge.sh <haara>`. Testikäännös tapahtumaohjatusti (launchd
fi.matkakirja.juna-vahti: uusi commit + 10 min hiljaisuus → Laitetestaajan ja pariteetin simulaattorit), 2 h
ajastin fi.matkakirja.juna varmistuksena. BUILD-sana master-merge-commitiin vasta Laitetestaajan savukierroksen
jälkeen (kaava: lokit/natiiviseppa-skriptit/build12-master.sh).

## Pääteema: liikkumisen ja reittien pariteettikierros (omistaja 25.9. klo 04.5x)

Löydökset 53–60 ovat saman ketjun oireita, ja ne korjataan kerralla tarkistuslistan kautta. Koko ketju verrataan
webiin vaihe vaiheelta: noppa → kohteet → valinta → matka tai lento → saapuminen → välikortti → kartta; lisäksi
reittiviivat, kuljettu reitti, siirtymäreitit, pulu, ohita ja lehti. Pelikoodari omistaa ketjun, Laitetestaaja
mittaa webin videot, Natiiviseppä hoitaa kameran ja Natiivi-UI lehdet. Jokaiselle korjaukselle webin käytös
mitattuna (video tai kuvapari) ennen korjausta (WEB ON MALLI).

## Löydökset (omistaja, build 12)

| # | Löydös | Omistaja | Tila |
|---|---|---|---|
| 53 | Ohita-nappi ei lopeta pulun puhetta | Pelikoodari | odottaa webin mittausta |
| 54 | Pululla puhekupla uuteen kaupunkiin saavuttaessa, vaikka ei pitäisi | Pelikoodari | odottaa webin mittausta |
| 55 | Nopan heitto ei jatku automaattisesti liftatessa | Pelikoodari | odottaa webin mittausta |
| 56 | Kartta ei zoomaa nopan heiton jälkeen, joten valittavat kohteet jäävät piiloon | Natiiviseppä (kamera) | odottaa Pelikoodarin webin mittoja (web ui.js sovitaKohteetNakyviin: rajaus, marginaali, kesto); ajo ease in/out |
| 57 | Reitti ei aina piirry | Pelikoodari | odottaa webin mittausta |
| 58 | Maailma-tilassa pelaaja ei pääse vaihtamaan kaupunkiin | Pelikoodari | odottaa webin mittausta |
| 59 | Kaupunkilehti avautuu saavuttaessa, vaikka ei pitäisi | Pelikoodari (logiikka) + Natiivi-UI (lehden avaus) | odottaa webin mittausta |
| 60 | Siirtymäreitit jäävät näkyviin saapumisen jälkeen | Pelikoodari (+ Natiiviseppä, Reitit.cs) | pariteettikierroksessa |
| 61 | Kaupungin napautus avaa oikean kortin, mutta kamera zoomaa yhä ulos (löydös 48:n kamerakytkentä puuttuu) | Pelikoodari + Natiiviseppä | kytkentä KaupunkiMerkit.ValitseKaupunki ↔ kortin avaus |
| 62 | Turistioppaan kappaleet päällekkäin | Natiivi-UI | |
| 63 | Nähtävyydet eivät toimi | Natiivi-UI + Pelikoodari | |
| 64 | Kaupunkilehti tökkii vierittäessä (vrt. löydös 51) | Natiivi-UI | |
| 65 | ☰-valikko ja linssit yhdistetään kaikilla laitteilla, Kokeet pois pelaajalta | Natiivi-UI | Raamattu päivitetty 05.0x |

## Natiivisepän erät

| # | Haara | Kärki | Tila |
|---|---|---|---|
| 1 | natiiviseppa/nimiasennot | 50ca8e2 | Kaupunkinimet webin ehdokaskehällä (laudan oma asettelu nimionAnkkuri, pinon kehä, 4 tavanomaista, 8 suuntaa × 2), nappula varauksiin, lukko. Testit 30/30. Testikäännös ja kuvapari (web kartta-393x852 Marseille) tekeillä |
| 2 | natiiviseppa/rasteriavain | cbf7f0f | Cesiumin "same material key" -varoitus pois: raster-kerrosten kierrätys (radio, linssit, väritaso) |
| 3 | löydös 56 kamera | – | Pelikoodarin mittojen jälkeen |
| 4 | löydös 61 kamera | – | Pelikoodarin kanssa |
| 5 | natiiviseppa/lento-pinta | 6a57441 | Kylmän alun sumeus: taustapallo + D:n uusintamittaus (b12o jäi latausnäkymään, ei kaatunut). Raskas ajo polton jälkeen (~08.45) |
| 6 | Black Marble -yövalot | – | Karttasepän poltto (~klo 9), uniformit valmiina (RadioMastot.YonValot) |
| 7 | E28 syvät tasot Z9–Z11 | – | Fablen ilmoitus uuden reseptin (2026-09-25) sarjasta |

## Muut sessiot

- Natiivi-UI: erä 2 merge-pyynnöt junaan b13 (juna-merge.sh; ristiriidoissa Natiivi-UI mergeää junan omaan
  haaraansa), löydökset 59 (lehden avaus), 62–65.
- Pelikoodari: löydökset 53–55, 57–60 pelilogiikkana webin mukaan, liikkumisen tarkistuslista.
- Laitetestaaja: webin videot ketjun vaiheista, savukierros ennen BUILD-mergeä.

## Kuorma 25.9. aamulla

Karttasepän peruskarttapoltto 16 ytimellä noin klo 08.45 asti. Testikäännöksiä ajetaan yksi kerrallaan
käännöspalvelulla; raskaat mittaukset (lentopinnan kylmäkoe, laitekäännökset) vasta polton jälkeen.
