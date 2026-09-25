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
| 56 | Kartta ei zoomaa nopan heiton jälkeen, joten valittavat kohteet jäävät piiloon | Natiiviseppä (kamera) | natiiviseppa/kohdesovitus 8961981 (webin kaava) |
| 57 | Reitti ei aina piirry | Pelikoodari | odottaa webin mittausta |
| 58 | Maailma-tilassa pelaaja ei pääse vaihtamaan kaupunkiin | Pelikoodari | odottaa webin mittausta |
| 59 | Kaupunkilehti avautuu saavuttaessa, vaikka ei pitäisi | Pelikoodari (logiikka) + Natiivi-UI (lehden avaus) | odottaa webin mittausta |
| 60 | Siirtymäreitit jäävät näkyviin saapumisen jälkeen | Pelikoodari (+ Natiiviseppä, Reitit.cs) | pariteettikierroksessa |
| 61 | Kaupungin napautus avaa oikean kortin, mutta kamera zoomaa yhä ulos (löydös 48:n kamerakytkentä puuttuu) | Pelikoodari + Natiiviseppä | kytkentä KaupunkiMerkit.ValitseKaupunki ↔ kortin avaus |
| 62 | Turistioppaan kappaleet päällekkäin | Natiivi-UI | |
| 63 | Nähtävyydet eivät toimi | Natiivi-UI + Pelikoodari | |
| 64 | Kaupunkilehti tökkii vierittäessä (vrt. löydös 51) | Natiivi-UI | |
| 65 | ☰-valikko ja linssit yhdistetään kaikilla laitteilla, Kokeet pois pelaajalta | Natiivi-UI | Raamattu päivitetty 05.0x |
| 74 | Ihmisen matka: rajaviivat mustana läiskänä, teksti pallon päällä, pallo vilahtaa isona (d–e) | Natiiviseppä (f Linssiseppä) | agentti |
| 75 | Unityn logoruutu pois, oma LaunchScreen ja saumaton avaus | Natiiviseppä | natiiviseppa/aloitusruutu |

## Natiivisepän erät (päivitetty 25.9. klo 05.5x)

| # | Haara | Kärki | Sisältö | Tila |
|---|---|---|---|---|
| 1 | natiiviseppa/nimiasennot | 8705474 | Kaupunkinimet webin ehdokaskehällä: laudan oma asettelu (paketin nimionAnkkuri, skeema 1.31), pinon kehä, 4 tavanomaista, 8 suuntaa × 2, lukko, liikevara 0,5; nappula varauksiin | kuvat b13a (vanha versio: reunalla väärä kylki → liikevara korjattu) |
| 2 | natiiviseppa/rasteriavain | cbf7f0f | Cesiumin "same material key" pois (raster-kerrosten kierrätys) | tekninen |
| 3 | natiiviseppa/kohdesovitus | 8961981 | Löydös 56 / A16 / A17 / B18 / B22: nappula + kohteet ruutuun, 0,14, 720 ms, vain loitonnus | maarajat sisältää |
| 4 | natiiviseppa/maarajat | 8c8ea63 | D7/D8/D11: loitonnuksen katto = saapumisnäkymä, panorointi maan laatikko × 1,3; MaailmaTila-API | Pelikoodari kytkee |
| 5 | natiiviseppa/reitit-b13 | nimiasennot mergetty | B4 varjo, B5 helmet, B10/D18/A3/A15/C18 PeliOhjaaReitit, B23 lentokaaret, A14 osumasäde 44, D15 PeliSuodatin, NaytaPeli, ReittiPiste | Pelikoodari kytketty (pelikoodari/liikkuminen) |
| 6 | natiiviseppa/saattokamera | 1cc64cd | A20/B15 ennakkozoomi, B16 saatto, A21/B12–B14 hyppyketju/bussi/laiva, Matkaliike-API, Laskeutui (B21); B24 kaari lennolla oletuksena pois (B25) | Pelikoodari kytketty |
| 7 | natiiviseppa/aloitusruutu | f82f6f4 | Löydös 75: Unityn logoruutu pois, LaunchScreen pergamentti + logo, Aloitusverho samalla kuvalla kunnes pallo ladattu | laitevideo kylmästä käynnistyksestä tekemättä |
| 8 | natiiviseppa/loydos74 | – | Löydös 74 d–e: avaruuspallon rajaviivat, teksti pallon päällä, alkuzoomi verhon taakse | agentti työssä |
| 9 | natiiviseppa/lento-pinta | 6a57441 | Kylmän alun sumeus: taustapallo + D:n uusintamittaus | polton jälkeen (~08.45); Aloitusverho peittää osan |
| 10 | Black Marble -yövalot | – | Karttasepän poltto (~klo 9) | odottaa |
| 11 | E28 syvät tasot Z9–Z11 | – | Fablen ilmoitus | odottaa |

**Junassa 07.2x: juna/b13 2abbbcf** — erät 1–7 ja loydos77 (3d7efce, löydös 77: radion jäänteiden vahti) sekä Natiivi-UI:n
valikko-65 ja opas-62; Unityn luomat .metat omana committinaan. Testikäännös ed1a627 (koe/b13-yhdistelma) FBBD41D7:ssä,
kuvat lokit/b13-yhdistelma: nimet (kuvapari webin Marseille-kuvan kanssa; Lyon vasemmalla kuten webissä), nipistys
pysähtyy saapumisnäkymään, veto pysyy Ranskassa, noppa sovittaa kohteet ruutuun, kylmä käynnistys ilman Unityn ruutua.
Kuvasta korjattu: varattu lukko vapautuu (Pariisi ja Marseille olivat ilman nimeä) 24eff66.
Löydös 74: Linssisepän linssiseppa/ihminen-74 286cf64 korvaa natiiviseppa/loydos74:n (mergetään Linssisepän
Unity-varmistuksen jälkeen, myös linssiseppa/radio-sulku-varmistus 2cf6ed9). Levysiivous 06.3x: 24,5 Gt vapautettu.
Kuvaus: lokit/natiiviseppa-skriptit/nimikuvat.sh (Marseille, Ranska, nipistys ulos, veto itään, noppa).

Hyväksytyt poikkeamat (Fable 05.3x): B25 ja D14 — LENNON ESITYS kaikille lennoille, kesto TEMPO-linjauksen mukaan
(ei kiinnitetä 2,8 s:iin), ennen lähtöä ja laskun jälkeen webin tila.

## Muut sessiot

- Natiivi-UI: erä 2 merge-pyynnöt junaan b13 (juna-merge.sh; ristiriidoissa Natiivi-UI mergeää junan omaan
  haaraansa), löydökset 59 (lehden avaus), 62–65.
- Pelikoodari: löydökset 53–55, 57–60 pelilogiikkana webin mukaan, liikkumisen tarkistuslista.
- Laitetestaaja: webin videot ketjun vaiheista, savukierros ennen BUILD-mergeä.

## Kuorma 25.9. aamulla

Karttasepän peruskarttapoltto 16 ytimellä noin klo 08.45 asti. Testikäännöksiä ajetaan yksi kerrallaan
käännöspalvelulla; raskaat mittaukset (lentopinnan kylmäkoe, laitekäännökset) vasta polton jälkeen.
