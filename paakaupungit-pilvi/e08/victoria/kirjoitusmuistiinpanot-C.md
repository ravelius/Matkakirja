# Victoria — C-tekstiluonnos 12.10.2026

Alkuperäisen Dakar-mallin rakenne: intro 866 merkkiä / 9 virkettä / 2 kappaletta / 2 lihavointia; lisäteksti 813 merkkiä / 3 kappaletta. Kansi + luonto-teemasivu, yhteensä 8 nostoa (501–524 merkkiä). Opas 5 jaksoa, parasta 5 / hyvä tietää 3. Visa 5 ja tiedot 3. Kartta 1 kohde / 1 kolmikappaleinen nähtävyysjuttu. Koko lähde- ja väitekooste faktapohjassa.

Alkuperäinen paikallinen `node paakaupungit-pilvi/tyokalu.mjs tarkista e08 victoria --lyhyt`: **19 virhettä, 3 varoitusta, 0 kuvaa**, exit 1. Kaikki virheet ovat `tiedosto puuttuu`: valokuva 1, kansikuvat 3, nostot 8, matkailijalle 1, oppaan kuvat 5, nähtävyysjuttu 1. Ei teksti- tai rakennevirheitä. Varoitukset: `kaupunki.pallo poikkeaa yli 0,1°`, `kohteita 1 (pohjataso 6)`, `saatiedot puuttuu`. Alkuperäiset lokit NASin `valiaikainen/nopea-e08-victoria/`-hakemistossa; tarkistinta ei muutettu.

Pallopoikkeama johtuu kontekstin todellisesta virheestä: +4.6236 sijoittaisi kaupungin pohjoiselle pallonpuoliskolle. Luetun kaupungin oman WP-artikkelin piste on -4.62306, 55.45250. C käyttää varmennettua pistettä ja täsmällistä `Victoria (Seychellit)`-wikiavainta. Kontekstia/pelidataa ei muutettu. Väestöä ei käytetä: kontekstin luku on Central-alueen yhdeksästä piiristä, ei erillinen Victoria-kunta.

Kartta partial 1/6: vain puutarhan oma WP-piste ja sen luonto-/historiaketju. Kellotornin piste löytyy, mutta monumentin tekijä-/oikeusketju on vielä avoin. Muiden rakennusten pisteitä ei lainattu kaupungilta. Kaikkien 19 kuvaroolin neljä kenttää ovat tyhjiä; ei kuva-, lisenssi- tai selitearvauksia. Kuva-assetit tulevat erillisestä putkesta, kuvahakuja/generointia ei tehty.

Sää `null`, 48/48-primäärivarmennus avoin. Tekstissä vain lähteestä luettu sanallinen ilmaston luonnehdinta ilman lukuja. Torin viranomaistiedote kertoo kunnostus-/väistötilasuunnitelmasta, ei varmenna nykyistä myyntipaikkaa. Myös museoiden nykyinen käyntitilanne jätetty varmistettavaksi. Kellotornin alkuperäisvärin ristiriita on faktapohjassa: paikallinen primääri valittu, D:n tulee tarkistaa valinta.

Ei Git-operaatioita, muiden kaupunkien kirjoitusta, pelimuutoksia, hyväksyntää tai julkaisua. **C-luonnos on olemassa ja tekstimitat tarkistettu; koko kaupunki ei ole toimitusvalmis.** D/E/F ja lähteiden riippumaton tarkistus ovat avoinna.
