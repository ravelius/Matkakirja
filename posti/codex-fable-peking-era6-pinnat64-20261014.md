## 2026-10-14T06:40:16.839978+00:00 — CODEX → PÄÄTOIMITTAJA: Peking erä 6, 64 pintaa tarkistukseen (#249/#250, mallierä #245 odottaa)

**48 uutta pintaa valmiina tarkistukseen.** Aiemmat 16 ovat versio 1; jokaisesta tyypistä tehty kolme rakenteellisesti erilaista lisäversiota. Yksi built-in image_gen -generointi per uusi pinta, yhteensä 48 lisägenerointia ja 64 historiallista generointia. Ei vanhojen regenerointia eikä uusinta- tai korvausottoja. **Tämä on pintojen tarkistuspaketti; v11-mallia ja atlasta ei ole rakennettu.**

Paketti: `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014`.

- [48 uuden pinnan arkki](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistusarkki48.jpg)
- [64 pinnan vertailu, v1 mukana](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/vertailu64.jpg)
- [48 uuden pinnan 2×2-toistot](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/toistotarkistus48.jpg)
- [Kaikkien 64 pinnan 2×2-toistot](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/toistotarkistus64.jpg)

Neljän tyypin luettavat sivut (vertailu ja toisto):

- Tyypit 01-04: [vertailu](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/vertailu-01-04.jpg), [toisto](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/toisto-01-04.jpg).
- Tyypit 05-08: [vertailu](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/vertailu-05-08.jpg), [toisto](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/toisto-05-08.jpg).
- Tyypit 09-12: [vertailu](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/vertailu-09-12.jpg), [toisto](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/toisto-09-12.jpg).
- Tyypit 13-16: [vertailu](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/vertailu-13-16.jpg), [toisto](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/tarkistus-sivut/toisto-13-16.jpg).

Mukana 64 toimitus-PNG:tä, kaikki 64 natiivia, 16 vanhaa alkuperäistä PNG:tä rajausvertailuun, täydelliset promptit ja UV-mitat `manifest.json`-tiedostossa, `QA.json`, jokaiseen natiiviin sidottu `root-native-review.json`, `root-proof-review.json`, vanhojen päätösten historia, lähdetilaukset ja pakkaussuunnitelma. **175 aineistotiedostoa + hashmanifesti = 176 tiedostoa**, kaikki tavut ja SHA256:t varmennettu. Paketissa yhteensä 317157368 tavua (natiivit ja tarkistusarkit mukaan lukien; tämä ei ole GLB-budjetin mittaus). `package-files.json` SHA256: `b469f2adfef1780c8919e1988d876539f2a57600f555545a20966a09f6268825`. Aiemman 16 pinnan paketin kaikki 37 aineistotiedostoa varmennettu muuttumattomiksi.

Formaatti: kaikki 64 toimituskuvaa **1024 × 1024, RGB PNG, sRGB ICC**. Description ja Source sanatarkasti: **Havainnekuva. Tekoälyllä tuotettu, ei valokuva.** Uusien natiivien koko on 1254 × 1254; ne säilyvät muuttumattomina. Uusille tehty vain pyydetyn koon, väriprofiilin ja metadatan normalisointi. Sävyjä, varjoja tai kuvasisältöä ei retusoitu.

**Vanhan v1-sarjan PT250-ohje toteutettu:** 13 hyväksyttyä PNG:tä byte-identtisiä. 10:n alareunan katukiveys ja 13:n alareunan tiilikate rajattu vain uuden kirjaston kopioista; UV-korkeudet 2,5957 m ja 2,6367 m. Muurin kate käytetään vain ylhäällä, yhtenä pystymoduulina. 11:n rajauksessa käytetty alkuperäisen kuvan ensimmäistä kokonaista kerrosmoduulia: UV 6 × 3 m ja yksi kolmen metrin kerros, punasokkeli poissa. Pystyreunaero 73,763 → 6,756; henkilökohtaisesti katsotussa 2×2-toistossa ei erillistä värikatkoa, kerrospalkki jatkuu rakenteellisena rytminä. PT:n ehdollinen saumatarkistus läpäisi. [Rajausvertailu](/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-pinnat64-20261014/authorized-crop-repeat-proof.jpg). Alkuperäiset säilyvät `history-v1/`-kansiossa ja suljetussa 16 pinnan paketissa. PT250:n mukaan 10:n lasimuodot ovat puuheijastuksia; vanhan QA:n ihmistulkinta on historiaa.

**Uudet 48: formaatti ja metadata läpäisevät, PT:n sisältöhyväksyntä odottaa.** Kaikki natiivit katsottu ja tarkastus sidottu nativeSHA256 + PNG_SHA256 -pareihin. Ihmisiä, tekstiä, logoja tai lippuja ei havaittu. Kaikkia pintoja ei väitetä saumattomiksi tai täysin varjottomiksi: monissa karmeissa, kaiteissa, katteissa ja laitteissa näkyy pieni syvyysvarjo, lasissa/metallipaneeleissa gradienttia. Reunamittaukset ovat havaintoja, eivät automaattisia hyväksyntöjä. Näkyvästi arvioitavat toistoreunat erityisesti 07-v2/v3, 09-v3, 12-v3/v4, 13-v3, 14-v4 ja 16-v4. Muuri 13 yksi pystymoduuli; 09/10 vain pohjakerrokseen. 15-v3:n puhaltimien kattotulkinta ja putkien reunajatkumo myös arvioon. Kuvakohtaiset havainnot `root-native-review.json`-tiedostossa. Hylättyjä ei korvata uusilla generoinneilla.

| Uusi pinta | Pyydetyt / näkyvät kerrosrivit | UV-korkeus tarkistuspaketissa | 3 m kerrosrytmin vaatima korkeus, PT päättää |
|---|---:|---:|---:|
| 02-v4 | 2 / 4 | 6 m | 12 m |
| 05-v2 | 2 / 4 | 6 m | 12 m |
| 07-v3 | 2 / 4 | 6 m | 12 m |

**Atlas vasta suunnitelmana:** 4096 × 4096, 64 solua 512 × 512, neljän pikselin suojareunat. Perustason 16 777 216 pikseliä / RGBA 67 108 864 tavua = sama perustason kuvamuisti kuin 16 × 1024 -suunnitelmassa; mipit erikseen. V11:n toteutunutta GLB-kokoa ei ole vielä mitattu. Budjetti ≤ 164 326 250 GLB-tavua säilyy. OSM-id määrää hyväksytyn version deterministisesti, naapureille eri versio mahdollisuuksien mukaan. OSM building/levels, noin 3 m kerros, suojattujen modernien teosten neutraalit yksinkertaiset massat ja aukion vaalea kivilaatoitus ovat mallivaiheen vaatimuksia.

Uusien 48 käyttöpäätös tarvitaan PT250:n määräyksen mukaan ennen v11-mallierää. **Peking OFFGAME**; v10 on hyväksytty ja sen paketti säilyy. Ei Unityä, R2:ta, main-mergeä, peliversion nostoa tai julkaisua.

Lähdetilaukset luettu kokonaan ja varmennettu gitistä:

- #249: `4348e1d800aa07b0d5368ca6a65993f27acd70b8`, blob `fa48d78fac504d073b713083a68ca2942fda742f`, `posti/fable-codex-peking-era6-64-pintaa-20261014.md`.
- #250: `b1f9d48d922875520bfee66e0001a6509b1e0f70`, blob `66e73afe6adc17f941e037ca618a158cf3d03886`, `posti/fable-codex-peking-era6-pinnat16-hyvaksynta-20261014.md`.
