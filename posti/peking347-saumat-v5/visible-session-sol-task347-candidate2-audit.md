# Peking #347 seam-candidate2: riippumaton tekninen auditointi

**Rajattu offline-tekninen PASS. Estäviä virheitä ei löytynyt tässä laajuudessa.** Candidate1:n maan yläpuolelle nousevan saumapeiton virhe korjaantuu. Verhoa ei ole mukana; sen hylättyä jalkaliittymää ei sovelleta tähän seam-only-ehdokkaaseen. Visuaalinen arvio ja vastaanottajan pelitesti jäävät avoimiksi.

## Versio, V4-suojaus ja rakenne

Tarkastettu task346-348-work/seam-candidate2/glb-v4, kaikki 72 tallennettua GLB:tä. Hyväksytyn native51-puut-v4-manifestin SHA256 on 8c1a1ecdf69f75d6fa5d74e9106d720ab374682588565ed5b9af9d74fbdc29cd. Manifesti ja kaikkien 72 pohjatiedoston hashit täsmäävät. Myös rakentajan viittaus candidate1:n hylkäysauditin hashiin täsmää.

Rakentaja build-task347-seam-candidate2.py luettiin, mutta sitä tai muita generaattoreita ei ajettu. GLB:t purettiin omalla lukijalla. Kaikki 58 578 alkuperäistä maakolmiota ja niiden UV:t täsmäävät suoraan hyväksyttyyn V4:ään sekä parentin cacheen. Todelliset 24 ECEF-juurikehystä varmennettiin.

Kaikkien tiedostojen koko alkuperäinen V4-BIN säilyy tavuntarkkana prefixinä. Vanhat accessorit, indeksit, primitiivit, node-/scene-muunnokset, kuvat, tekstuurit ja muut vanhat JSON-arvot säilyvät semanttisesti täsmälleen. Kaikki 72 materiaalitaulukkoa ovat kokonaisuudessaan V4:n kanssa samat: puuväri ja katot säilyvät.

Lisäkolmioita on **2639 LOD0:ssa ja 7917 kolmella LOD-tasolla yhteensä**. Lisäposition-, normaali-, UV- ja indeksidata sekä materiaalikytkennät ovat identtiset kolmen LOD:n välillä. Kaikki lisäprimitiivit ovat below-ground-seam-cover-roolia. Verhomateriaalia tai -geometriaa ei ole.

Tarkastettu: äärelliset attribuutit, indeksirajat, GLB-/buffer-rajat, kolmioiden määrät, POSITION-bboxit, normaalit, proof-hashit ja laatat.jsonin 72 kokomerkintää. F32-lisäkolmioissa ei ollut degeneraatteja; pienin cross-pituus on 5.56465248e-08 m². Suurin normaalipituusvirhe on noin 1.33e-07.

Kaikki 7917 LOD0-lisäverteksiä verrattiin candidate1-peiton saman materiaalin tallennettuihin kolmioihin geodeettisen XY:n ja barysentristen UV-arvojen kautta. Lähde löytyi kaikille 50 µm:n F32-reunatoleranssilla. Suurin UV-ero oli 1.54200413e-05, p99 7.80172098e-06 UV-yksikköä.

## Koko leikkausgeometrian alaraja

Alarajaa ei päätelty pelkästä painopisteotoksesta. Tallennetut F32-lisäkolmiot ja kaikki vanhat maakerrokset muunnettiin oikeista ECEF-kehyksistä pinnitettyyn yhteiseen ENU-kehykseen. Kolmioiden Z-tasot laskettiin suoraan normaaleista. Affiinisen Z-erotuksen ääriarvot arvioitiin jokaisen projisoidun uuden/vanhan kolmioleikkauksen kärjissä, myös viiva-/pistekontakteissa.

Oma laskenta käsitteli **14685 leikkausparia**. Suurin uusi−vanha-ero oli **-0.019999917460 m**: uusi pinta jää vähintään **19.999917 mm** jokaisen päällekkäisen vanhan maakerroksen alle yhteisen ENU-Z:n suunnassa. Kaikki vanhat maakerrokset huomioitiin, ei vain ylintä näkyvää pintaa.

Rakentajan proof ilmoittaa 14 635 paria ja noin saman −20 mm:n maksimin. Oma lukija arvioi ECEF→yhteinen ENU -muunnoksen eri laskujärjestyksessä kuin rakentajan etukäteen yhdistetyt matriisit. Rajakontaktien pyöristys on mahdollinen parimääräeron lähde; sitä ei erikseen todistettu. Hyväksyntä perustuu oman laskennan kaikkiin 14 685 pariin ja ääriarvoihin, ei rakentajan lukujen kopiointiin.

Rakentajan proofin suurin lasku on **12.495566 m**, ja se koskee vain uutta apupintaa. Vanhan maan muuttumattomuus varmistuu V4:n säilyneistä BIN-/verteksitavuista. Syvän apupinnan mahdollinen näkyvä huononnus jää Astra/rootin arvioon.

## Candidate1:n 833 poikkeaman regressio

Kaikki aiemman auditin 833 poikkeavaa näytettä tarkastettiin samoissa GPS-pisteissä:

- **309:** candidate2-pinta löytyy ja jää vanhan maan alle.
- **524:** virheellinen lisäpinta on poistunut näytteen kohdalta; muuttumaton vanha maa peittää kohdan edelleen.
- **0:** aiempi poikkeama jää jäljelle.

Aiemmat kolme vahvistettua painopiste-esimerkkiä korjaantuvat:

| Lähdesegmentti | Vanha H | Candidate2 H | Candidate2−vanha |
|---|---:|---:|---:|
| 960 | 38.662173229 m | 38.634636992 m | -27.536237 mm |
| 1016 | 37.690502158 m | 37.645991935 m | -44.510224 mm |
| 650 | 34.556618305 m | 34.536609987 m | -20.008318 mm |

H-arvot ovat WGS84-ellipsoidikorkeuksia. Koko geometrian edellisen luvun alaraja koskee yhteistä ENU-Z:aa. JSON sisältää kaikki 833 tulosta ja kolmen esimerkin GPS-paikat.

## Rakopeitto ja vesi

Sama oma ruudukko kuin candidate1-auditissa: 1332 väliä, along 0,07 / 0,31 / 0,64 / 0,93 ja across 0,15 / 0,5 / 0,85. Säde leikattiin tallennettujen todellisten ECEF-kolmioiden kanssa.

| Tulos | Näytteitä |
|---|---:|
| Vanha aukko peittyy candidate2:lla | 12435 |
| Muuttumaton vanha maa peitti jo | 2649 |
| Alkuperäinen vesivaraus rajaa pois | 900 |
| Vain uusi 2 mm vesiguard rajaa pois | 0 |
| Avoimeksi jäävä näyte | 0 |
| Yhteensä | 15984 |

Parentin erillinen 11 988 pisteen otos tukee tulosta: 9324 peittyvää vanhaa aukkoa, 1989 jo peittyvää kohtaa, 675 vesivarausta ja nolla avointa. Sen 24 LOD0-hashia täsmäävät candidate2:een. Kumpikaan ruudukko ei ole jatkuva aukottomuustodistus tai runtime-/streaming-hyväksyntä.

Uuden todellisen geodeettisen footprintin leikkauspinta-ala alkuperäisen vesigeometrian kanssa on **0 m²**. Myös 1,95 mm ulospäin laajennetun vesigeometrian kanssa leikkaus on nolla: 2 mm:n guardille jää 50 µm:n F32-toleranssi. Mukana ovat kaikki neljä alkuperäistä vesialuetta ja sisäiset vesi-/Ion-käytävävaraukset.

Candidate2-footprintistä ei jää pinta-alaa candidate1-footprintin 50 µm:n toleranssin ulkopuolelle. 500 µm:n avainjako jakaa korkeuden alarajoja; se ei tarkoita vanhan maan tai GPS:n tarkoituksellista siirtämistä.

## Budjetti ja avoimet portit

| 72 GLB:n kokonaisuus | Tulos | Budjetti |
|---|---:|---:|
| Tavua | 157 667 960 | 164 326 250 |
| Kolmiota | 1 385 100 | 1 397 383 |

Varaa jää **6 658 290 tavua ja 12 283 kolmiota**. Alkuperäisiä V4-kolmioita on 1 377 183, lisäkolmioita 7917. Budjetti on aiemmin delegoitu käytäntö, ei uusi laiteraja.

**Tekninen paketti läpäisee tässä rajauksessa.** Avoinna pysyvät:

- Astra/rootin visuaalinen arvio, erityisesti syvän apupinnan näkyvä vaikutus.
- Todellisen Cesium-maskin GetCartographicPoints-/raster-kohdistus. Lähdekaavamalli ei ole runtime-readback eikä #350:n Ion-mittauksia siirretä sen pisteisiin.
- Vastaanottajan pelin ennen/jälkeen-tarkistus sekä liikkuva LOD ja streaming. Vanhan source-pavingin noin 7 cm:n porras ei muutu.
- Koko kaupungin ja omistajan hyväksyntä, joita tämä auditointi ei anna.

Lopuksi kaikkien 216 V4-/candidate1-/candidate2-GLB:n hashit tarkistettiin uudelleen: ei muutoksia. Kirjoitettu vain sallittu audit-MD/JSON T7:lle. Kaikki Python-ajot tehtiin ulkoisella wrapperilla nice 15 -prioriteetilla. Ei Blenderiä, Unityä, geometriaedittejä, Git-mutaatioita, delegointia tai rakentajien suorittamista.
