# kaupungit · vastuu KS · tarkistettu 12.11.2026

TAVOITE: Kaupungin tunnistaa jo tavallisista taloista, ja kirkko, asema ja palatsi näyttävät siltä, mitä ne ovat. Kaukaa kuva on rauhallinen lämmin kuvakartta. Uusi kaupunki syntyy samalla koneella ilman käsityötä.

SÄÄNNÖT:
1. Kaupungit tehdään koodilla: talokone tavallisille taloille, tyyppimallit merkkirakennuksille (hillitympinä, jotta nähtävyydet erottuvat) ja tunnetuimmat nähtävyydet yksitellen. Uusia Tripo- tai Codex-malleja ei tehdä ilman omistajan sanaa; tehdyt jäävät. [P-261109-2] [P-261111-13]
2. Uusi kaupunki tehdään yhteisillä työkaluilla: pohja yhdellä komennolla, merkkirakennukset tyypittämällä ja sama vakioajo (arkki ja muistimittaus). Koodissa ei ole kaupunkikohtaisia ehtoja: kaupunki on rivi kaupunkitaulussa. [P-261111-13]
3. Talojen korkeus tulee GHSL-aineistosta kaupungin omalla kertoimella, nimetyt tornit korkeustaulusta. Katukuvat otetaan pelin lähimmältä tasolta lähes vaakaan. [P-261112-12]
4. Uusi tekotapa kokeillaan ensin pienellä alueella; koko kaupunkiin vasta hyväksynnän jälkeen. [P-261109-2]
5. Piirretyn kartan saanut kaupunki näytetään sillä kokonaan, noin 2,5 m/px, yksinkertaistettuna isoisän ajan matkailijan karttana. Muut kaupungit pysyvät ennallaan. [R-2.204] [P-261102-2]
6. Kaupungin loppulista lukitaan; uudet löydöt menevät toisen kierroksen listalle eivätkä viivästytä valmis-päätöstä. [R-2.215] [P-261112-13]
7. Kaupungin nimen tai merkin napautus zoomaa kaupunkiin eikä avaa korttia. Avauskortti (kuva, lyhyt esittely, nähtävyyskartta ilman tekstejä, turisti-info) aukeaa pelaajan kaupungin pienestä kutsukortista. Piirroskartan kaupungissa kutsukorttia ei ole: sisältö avautuu kartan kohteista ja turisti-infosta. Saapuessa ei avaudu mitään; kaupunkilehti jää syventäväksi. [P-261110-11] [P-261102-3] [R-2.138]
8. Fokusvirran kortit eivät näy kaupungeissa. Täysi sisältö vain maan pää- ja aarrekaupungilla; muut ovat tarkoituksella kevyitä. [R-2.10]
9. Maa ilman pelikaupunkia saa sellaisen Firenzen mallin mukaan; lisäyksen jälkeen reitit tarkistetaan. [R-2.147]
10. Jokaisella maalla on pääkaupunki omana kokoelmanaan, ei pysäkkinä eikä reitteinä; napautus avaa maakortin. Maa ilman pelikaupunkia näyttää pääkaupunkinsa aina. [R-1.13]
11. Minivaltiot saavat kevyen sisällön: lippu, perustiedot ja lyhyt esittely, ei maalehteä. Pääkaupunkien uudet kuvat vain Commonsista. [R-1.13]
12. Jerusalemilla ei ole pääkaupunkipistettä; Israelin kortissa hallinnon paikka mainitaan samoin kuin Ramallah Palestiinalle, ilman kannanottoa. [R-1.13]

EI VIKA:
- Kaupungin napautus tai saapuminen ei avaa korttia; Pariisissa ei ole kutsukorttia.
- Natiivin kaupunkikortissa on pieni herokuva.

TEKOTAPA:
- Koodi ja napautukset nyt: docs/moduulit/kaupungit.md.
- Työkalut ja taulu: docs/suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md.
- Piirroskaupungin teko: tiedosto RAKENNUSPERIAATE.md.
- Pääkaupungit: kokoelmat/paakaupungit.json. Fokusvirta: js/fokusvirta.js.
