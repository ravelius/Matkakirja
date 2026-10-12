# Washington — C-tekstiluonnos 12.10.2026

Tehtävä 12. Kirjoitus ja tarkistus tehty oikeassa NAS-kloonissa e11. Ei Git-operaatioita, muiden kaupunkien kirjoitusta, kuvatyötä, pelitiedostojen muutoksia tai julkaisua.

Kirjoitettu: artikkeli (intro 890 merkkiä, 9 virkettä, 2 kappaletta ja 2 lihavointia; lisäteksti 923 merkkiä / 3 kappaletta), kansi ja tiede-teemasivu, 8 nostoa (514–547 merkkiä), 5 oppaan jaksoa, matkailijalle-kappale, 5 parasta / 4 hyvä tietää, 5 kysymystä (tasot 1–3), 3 tietoa ja 6 kohdejuttua (776–833 merkkiä / 2 kappaletta). Minitehtävä kysyy rakennusmuseon salipylväiden tiilimateriaalia; kaupungin kysymykset kysyvät muita asioita.

Rajattu A-lähdekooste: 15 onnistunutta robots-sallittua HTTP 200 -lähdettä. Mukana kolme alkuperäislähdettä: NPS:n monumentti- ja Old Stone House -sivut sekä Smithsonianin linnan sivu. 1873-kulma varmennettu monumentille, linnalle ja vanhalle kivitalolle kahdella riippumattomalla lähteellä. Tarkat rakennusvuodet, väkiluvut, etäisyydet, pylväiden mitat, tunnelin nopeus ja reseptisuhde jätetty pelaajateksteistä pois. Säässä ei lukuja. Linnan nykyinen sulkeminen peruskorjaukseen varmennettu Smithsonianin omalta sivulta.

## Alkuperäinen tarkistin

`node paakaupungit-pilvi/tyokalu.mjs tarkista e11 washington --lyhyt`

Todellinen tulos: **24 virhettä, 1 varoitus, 0 kuvaa**. Kaikki 24 virhettä ovat `tiedosto puuttuu` tyhjissä kuvarooleissa. Varsinaista artikkeli-, nosto-, kysymys-, opas- tai kohdetekstin rakenne-/mittavirhettä ei jäänyt. Täysi paikallinen ajo kertoo varoituksen: `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`. Tarkistinta ei muutettu, virheitä ei piilotettu. Lyhyen ja täyden ajon tulosteet NASin omassa väliaineistossa. Exit 1 kuvavirheiden vuoksi; tämä ei ole erän hyväksyntä.

## Kuvaroolit ja kuvaputken tarpeet

Kaikkien roolien `tiedosto`, `lyhyt`, `selite` ja `lahde` ovat tyhjiä. 24 roolia: valokuva, kolme laajaa kansikuvaa (kaupunki / Georgetown / Mall), kahdeksan nostoaihetta, matkailijalle pystykuva, viisi opasjaksoa, kuusi kohdetta. Nostoaiheet: katuverkon ruudukko ja diagonaalit; Old Stone House; monumentin eri kivivaiheet; kanavan vetotie; Smithsonianin historiallinen linnarakennus; kasvien merikuljetus ja elävä kokoelma; kirjaston nidekuljetus; rakennusmuseon tiilipylväät. Kirjatunnelista ei tehdä dokumentaarista kuvaa ilman erillistä todellista lähdeaineistoa. Kohteet nimetty sisalto.json:ssa. Historiallisia teoksia ei korvata suojatuilla moderniversioilla. B/asset-liite avoin.

## Avoimet portit

- A on rajattu lähdekooste; rakennusten täydellinen tekijä-/restaurointiketju ja kuvituksen oikeusrajat avoinna. Kapitolia tai moderneja muistomerkkejä ei valittu kartalle.
- Kartalla 6 oman paikan WP-pistettä. Kanavanvartijan talon oma nimetty pistelinkki on C&O-artikkelissa; myöhemmän siirron vertailu tarkistetaan D:ssä. Kartan paikallinen rakenne läpäisee; riippumaton sijainti-/oikeusauditointi avoin.
- Kirjastotalon, rakennusmuseon ja kanavanvartijan talon tarkka 1873-rakennusvaihe tarvitsee toisen lähteen. Kohdejutuissa ei väitetä niistä täsmällistä 1873-tilaa.
- Sään 48/48 primäärivarmennus puuttuu, `saatiedot:null`. Olemassa olevaa sääaineistoa ei muutettu.
- B, riippumaton D, korjaukset E, pääsession F, hyväksyntä, pelikytkentä ja julkaisu avoinna.

Väliaineisto ja SHA-manifesti: `valiaikainen/nopea-e11-washington/`. Seuraava omistettu kaupunki on Pjongjang, vasta e10-erän viiden tavallisen kaupungin tekstiluonnosten ja C-muistioiden valmistuttua.
