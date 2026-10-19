# kaksi erillistä lisäluonnosta: sali ja oppitunti — QA 19.10.2026

Kaksi valittua havainnekuvaa. **5 sisäistä image_gen-kutsua**, kaikki kokonaan uusia kuvia; 3 aiempaa ehdokasta säilytetty NAS/T7-historiassa mutta ei toimiteta lisäluonnoksina. Pysyvää kuvalupaa käytettiin uusien tilausten laatuun, ei vanhojen kutsurajoitettujen tilausten avaamiseen.

Molemmat **1448×1086 RGB-PNG**, täsmällinen 4:3, täysi suorakaide. Purettuna alfa on **255 jokaisessa pikselissä**; ei leivottua soikiota, läpinäkyvyyttä tai häivytystä. Natiivit säilytetty; toimituksiin lisätty vain tekstimetatietoa. Kuvapikselit identtiset natiivien kanssa.

Valitut kuvat katsottu täysinä ja 160×120 px koossa sekä samalla diagnostisella soikealla maskilla vaalealla/tummalla taustalla. Pääsisältö ei leikkaudu tai häivy. Arvioiden mukaan vähintään20% sivuvarat ja keskimmäinen~60% tärkeille kohteille toteutuvat; tämä on käsin tehty visuaalinen arvio, ei kalibroitu automaattisegmentointi. Salin vaaleaa arkkitehtuuria jää reunoille: tausta on rauhallinen ja vähäkontrastinen, ei kaikkialla täysin yksivärinen.

- **tyyppi2-sali**: Ehjä maljakko, arvokas jalusta ja ihmisten puuttuminen erottuvat vaaleassa suuressa salissa; taustalla jää vähäkontrastista arkkitehtuuria myös reunoille. Reunavarojen käsinarvio: {"left": 39, "right": 39, "top": 32, "bottom": 32}.
- **tyyppi3-oppitunti**: Kartta, karttakeppi, opettaja ja pulpetissa istuva lapsi tunnistuvat; ilmeiden hienot yksityiskohdat ovat pieniä ja kartta on kuvitteellinen, ei varmennettua opetustietoa. Reunavarojen käsinarvio: {"left": 27, "right": 28, "top": 20, "bottom": 25}.

Valoisuusohje498 tarkistettu: vaalea ilmava pehmeä päivänvalo, esineiden todentuntuiset värit säilyvät. Ei seepiaa, värien haalistusta, lisättyä raetta, mustan pisteen nostoa, aaltoilua tai muita muistotehosteita. Peli tekee yhteisen soikean häivytyksen itse.

`qa/160px-oval.png` on **vain diagnostiikkaa**, ei kolmas varsinainen kuva eikä pelin todellinen varjostin. Maskin sisäsäde0,78 / ulkosäde1,0 ja smoothstep on kuvattu JSONissa. Oikeaa2–3sekunnin peli-/yläkulmatestiä ei tehty. Hienot ilmeet/koristeet ja kartan merkit eivät ole pienessä koossa yksityiskohtaisesti luettavaa tietoa.

Ihmiset ovat keksittyjä, huoneet, esinekoristelu ja opetuskartta tulkittuja. Ei aitoja historiallisia valokuvia, varmennettuja museoesinekopioita tai todellisten henkilöiden muotokuvia. Naisen väljän mantšukaavun leikkaus/leveät hihat/epäsymmetrinen reunustus ohjattu museoviitteestä: [Met,47.136.1](https://www.metmuseum.org/art/collection/search/69864), myöhäinen1800-/varhainen1900-luku, museon sivulla Public Domain. Värit ja asun tarkat yksityiskohdat ovat tulkintaa, eivät autenttisuuden täyttä varmennusta.

Vanhojen01/02-kuvien ja kuittausten historia säilyy. Omistajan aiempi hyväksyntä koskee realistisen värivalokuvan **tyyliä**; näiden uusien tiedostojen PT-/omistajahyväksyntä on avoin. Ei peli-/runtime-kytkentää, mergeä, julkaisua tai Tripo-tuotantoa. Vähintään50esineen+jadepersikan sarja ja lopullinen8tyypin jako odottavat edelleen omistajan hyväksyttyä listaa/vahvistusta.
