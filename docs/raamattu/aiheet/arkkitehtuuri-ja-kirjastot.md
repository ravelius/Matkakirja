# arkkitehtuuri-ja-kirjastot · vastuu NS · tarkistettu 21.11.2026

TAVOITE: Peli on natiivi iOS-sovellus, joka on koottu yhteisistä osista. Sama osa toimii kartalla, kaupungeissa, museoissa ja peleissä, ja uusi peli syntyy valmiista osista.

SÄÄNNÖT:
1. Peli tehdään iOS-sovellukseksi Unitylla ja Cesiumilla omin karttalaatoin. Selainversio on ylläpidossa (media-ja-ampari). [R-6.3]
2. Unity vaihdetaan LTS-versioon sen ilmestyttyä, siihen asti uusimpaan beetaan koehaaran kautta; App Storeen vain lopullisella, edellinen käännösketju säilyy. [R-6.3]
3. Osa tehdään kerran yhteiseksi niin, että sillä voi tehdä erityylisiä pelejä: tyyli tulee asetuksista, ei kopiosta. Ero korjataan yhteiseen osaan, ei pelikohtaisesti. [P-261112-1] [R-2.201]
4. Uusi yhteinen osa saa KIRJASTOT-rivin samassa muutoksessa. [P-261112-1]
5. Tiedolla ja suureella on yksi paikka ja yksi kirjoittaja; muut lukevat. [P-261112-18] [P-261111-3]
6. Moduulilla on yksi vastuu, kirjattu rajapinta ja hyväksymistesti. Riippuvuus kulkee yhteen suuntaan: säännöt eivät tunne näkymää, näkymä piirtää tilan, sisältö on dataa. [R-6.18] [P-261111-3]
7. Asetukset annetaan osalle luonnissa; muuttuvia staattisia kytkimiä ei ole. Kuvaparin toinen puoli haarassa tai testikomennolla; hylätty vaihtoehto poistetaan. [P-261112-20]
8. Ruudulla lasketaan vain muuttuva; paikallaan pysyvä lasketaan etukäteen (omien mallien leivonta: valo-ja-materiaalit). [P-261112-19]
9. Mittarit, testikomennot ja lokit ovat omissa tiedostoissaan pelisilmukan ulkopuolella. Testi kirjoitetaan rajapintaa vasten ja poistuu koodin mukana. [P-261112-19]
10. Ulkopuolisista paketeista ensin Unityn omat; maksullinen vain omistajan ostona. [R-2.125] [R-11.5]
11. Natiivissa ei ole web-koodia eikä web-näkymää: lehdet tehdään UI Toolkitilla sisältöpaketin datasta. [R-6.4]
12. Selainversio lataa ulkoiset kirjastonsa ämpärin vendor-polusta laiskasti; turvatila kytkee raskaat kerrokset tunniksi pois toistuvan kaatumisen jälkeen. [R-2.41] [R-10.18]
13. Käsin tehdyn paremman version palautus kertoo, mitä osia työstä lisätään kirjastoon tai miksi ei mitään. [P-261121-8]
14. Kirjastoilla on yksi kokonaissuunnitelma. Parannettu osa päivittyy kaikkiin kaupunkeihin; hyväksytyistä kaupungeista yöllä vertailukuvat, selvä muutos kerrotaan omistajalle. [P-261121-24] [P-261121-26] [P-261121-30]
15. Uudet kirjastoalueet järjestyksessä: talot ja katot Eurooppaan maittain, puut ja puistot, kaupunkien äänimaisema. Käyttöliittymän osat myöhemmin (nyt vain huononemisen estävät tarkistukset); pelien runko Juoksupelin uudistuksen mukana. [P-261121-31] [P-261121-32]

EI VIKA:
- Natiivissa ei ole turvatilaa.
- Vanha koodi poikkeaa säännöistä 5–9: ne koskevat uutta ja uudelleen kirjoitettavaa koodia.

TEKOTAPA:
- Osat ja vastuut: KIRJASTOT.md; rajapinnat: Assets/Matkakirja/RAJAPINTA.md; kokonaisuus: suunnitelmat/20261121-kirjastojen-kokonaisuus.md.
- Pelin moduulimalli: docs/suunnitelmat/20261111-juoksupeli-tavoiterakenne.md.



