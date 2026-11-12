# arkkitehtuuri-ja-kirjastot · vastuu NS · tarkistettu 12.11.2026

TAVOITE: Peli on natiivi iOS-sovellus, joka on koottu yhteisistä osista. Sama osa toimii kartalla, kaupungeissa, museoissa ja peleissä, joten kaikki tuntuu yhtenäiseltä, ja uusi peli syntyy valmiista osista.

SÄÄNNÖT:
1. Peli tehdään iOS-sovellukseksi Unitylla ja Cesiumilla omin karttalaatoin. Selainversio on ylläpidossa (media-ja-ampari). [R-6.3]
2. Unity vaihdetaan LTS-versioon sen ilmestyttyä, siihen asti uusimpaan beetaan koehaaran kautta. App Storeen vain lopullisella versiolla; edellinen käännösketju säilyy. [R-6.3]
3. Osa tehdään kerran yhteiseksi niin, että sillä voi tehdä erityylisiä pelejä: tyyli tulee asetuksista, ei kopiosta. Ero korjataan yhteiseen osaan, ei pelikohtaisesti. [P-261112-1] [R-2.201]
4. Uusi yhteinen osa saa KIRJASTOT-rivin samassa muutoksessa. [P-261112-1]
5. Tiedolla ja suureella on yksi paikka ja yksi kirjoittaja; muut lukevat. [P-261112-18] [P-261111-3]
6. Moduulilla on yksi vastuu, kirjattu rajapinta ja hyväksymistesti. Riippuvuus kulkee yhteen suuntaan: pelitila ja säännöt eivät tunne näkymää, näkymä vain piirtää tilan, ja sisältö on dataa ilman koodia. [R-6.18] [P-261111-3]
7. Asetukset annetaan osalle luonnissa; muuttuvia staattisia kytkimiä ei ole. Kuvaparin toinen puoli tehdään haarassa tai testikomennolla, ja hylätty vaihtoehto poistetaan koodista. [P-261112-20]
8. Ruudulla lasketaan vain muuttuva; paikallaan pysyvä lasketaan etukäteen (omien mallien leivonta: valo-ja-materiaalit). [P-261112-19]
9. Mittarit, testikomennot ja lokit ovat omissa tiedostoissaan pelisilmukan ulkopuolella. Testi kirjoitetaan rajapintaa vasten ja poistuu koodin mukana. [P-261112-19]
10. Ulkopuolisista paketeista ensin Unityn omat; maksullinen vain omistajan ostona. [R-2.125] [R-11.5]
11. Natiivissa ei ole web-koodia eikä web-näkymää: lehdet tehdään UI Toolkitilla sisältöpaketin datasta. [R-6.4]
12. Selainversio lataa ulkoiset kirjastonsa ämpärin vendor-polusta laiskasti, ei repoon eikä CDN:stä. Sen turvatila kytkee raskaat kerrokset tunniksi pois toistuvan kaatumisen jälkeen. [R-2.41] [R-10.18]

EI VIKA:
- Natiivissa ei ole turvatilaa.
- Vanha koodi poikkeaa säännöistä 5–9: ne koskevat uutta ja uudelleen kirjoitettavaa koodia.

TEKOTAPA:
- Osat ja vastuut: docs/raamattu/KIRJASTOT.md. Natiivin rajapinnat: Assets/Matkakirja/RAJAPINTA.md.
- Pelin moduulimalli: docs/suunnitelmat/20261111-juoksupeli-tavoiterakenne.md.
