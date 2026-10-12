# Port of Spain — C-kirjoitusmuistio, 12.10.2026

Tila: C-tekstiluonnos tallennettu ja alkuperäinen paikallinen lyhyt tarkistin ajettu. Ei koko kaupungin/erän hyväksyntää.

- Artikkeli intro 901 merkkiä, 2 kappaletta / 10 virkettä / 1 lihavointi; teksti 835 merkkiä, 3 kappaletta.
- Kansi + historiasivu, yhteensä 8 nostoa: 494, 525, 501, 511, 500, 499, 506, 522 merkkiä. Ei nostojen mittavirheitä.
- Matkaopas 5 jaksoa, 5 parasta-riviä, 3 hyvä tietää -riviä. Viisi kysymystä (tasot 1 ja 3 mukana), kolme tietoa. Saman sivun nostoihin perustuva minitehtävä.
- Kartta partial 2/6: Savannah ja Royal Botanic Gardens, molempien oma WP-piste. 2 kohdejuttua, ei puuttuvien kohteiden arvauksia. Muut keskustakohteet kaipaavat omaa WP/WD-pistettä ja teosrajan varmennusta.
- Kuvaputkea odottaa 20 kuvapaikkaa. Jokaisen neljä kenttää tyhjiä; ei kuvahakua/generointia. Kuvapuutteet ovat tarkistimen todellisia virheitä, niitä ei piilotettu.
- saatiedot:null: 48/48 primäärivarmennus avoin, ei säänumeroita.

Alkuperäinen komento NAS-kloonissa: `node paakaupungit-pilvi/tyokalu.mjs tarkista e12 portofspain --lyhyt`. Exit 1. Tulos **20 virhettä, 2 varoitusta, 0 kuvaa**. Kaikki 20 virhettä ovat `tiedosto puuttuu`: 1 valokuva, 3 kansikuvaa, 8 nostokuvaa, 1 oppaan avaus, 5 jaksokuvaa, 2 kohdekuvaa. Ei tekstin/rakenteen muita virhetyyppejä. Varoitukset: karttakohteita alle 6 ja saatiedot puuttuu; kumpikin tarkoituksella avoin. Tarkistusloki `valiaikainen/nopea-e12-portofspain/tarkistus-lyhyt.txt`, mitat ja lähde-/SHA-todisteet samassa hakemistossa.

Faktapoikkeama: konteksti Holy Trinity Cathedral 1818 vs kohdeartikkelin 1823; ei tarkkaa vuotta luonnokseen. Rakennuksen nykyinen sisäänpääsy tarkistettava; korjaustilanne mainittu oppaassa. National Trustin yritykset 404 eivät ole todisteita. Tarkat väestö-/pinta-ala-/etäisyys-/ilmastoluvut jätetty pois.

A rajattu. B, riippumaton D, korjaus E, lopullinen F, matkustusturvallisuuden nykyvarmennus, kuvat, kartan 6–8 portti ja sääauditointi avoimia. Ei Git-operaatioita, pelikytkentää eikä julkaisua.
