# Port Louis — C-tekstiluonnos 12.10.2026

Tuotettu alkuperäisen Dakar-mallin rakenteella: artikkelin intro 814 merkkiä / 8 virkettä / 2 kappaletta / 2 lihavointia; lisäteksti 785 merkkiä / 3 kappaletta. Kansi + historia-teemasivu, yhteensä 8 nostoa (496–521 merkkiä). Opas 5 jaksoa, parasta 5 / hyvä tietää 3. Visa 5 ja tiedot 3. Kartta ja nähtävyysjutut 2/6, jutut 2 kappaletta. Kaikki teksti on suomeksi; lähdekooste erillisessä faktapohjassa.

Alkuperäinen paikallinen `node paakaupungit-pilvi/tyokalu.mjs tarkista e08 portlouis --lyhyt`: **20 virhettä, 2 varoitusta, 0 kuvaa**. Kaikki 20 konevirhettä ovat `tiedosto puuttuu` -kuvavirheitä: valokuva 1, kansikuvat 3, nostot 8, matkailijalle 1, oppaan jaksot 5 ja nähtävyysjutut 2. Teksti- tai rakennevirheitä ei tullut. Kaksi varoitusta ovat kartan 2 kohdetta alle 6 ja puuttuvat säätiedot. Lokit NASin `valiaikainen/nopea-e08-portlouis/`-hakemistossa. Tarkistinta ei muutettu, eikä virheitä ohitettu.

Kuvat: kaikkien 20 roolin neljä kenttää tyhjät. Ei Commons-valintaa, kuvahakua, generointia, kuvaselitearvausta tai ennen–nyt-paria. Kuvaputken liite odotetaan erikseen. Champ de Marsin mahdollisessa kuvassa modernit katsomot ja muistomerkit vaativat oman oikeustarkistuksen.

Kartta partial: vastaanottopaikan ja laukkaradan pisteet niiden omista WP-artikkeleista. Torin, linnoituksen ja muiden pisteitä ei lainattu kaupungin pisteestä. Sää `null`: 48/48-primäärivarmennus avoinna. Tekstissä vain kaupungin luetun Climate-osion sanallinen kausiluonnehdinta ilman lukuja. Pelin kevyen pisteen ravirata-termi raportoitu; luonnoksessa laukkarata.

Ei Git-operaatioita, muiden kaupunkien kirjoitusta, pelimuutoksia, hyväksyntää tai julkaisua. **C-luonnos on olemassa ja tekstimitat tarkistettu; koko kaupunki ei ole toimitusvalmis.** Riippumaton D/E/F ja lähteiden vahvempi ristiintarkistus tarvitaan.


## Task 118 — korjauskierros 13.10.2026

Korjauslistan nimetyt tekstilöydökset käsitelty. Lähdepohja ja tallennetut /wiki/-sivut luettu. Tuore origin/main haettu erän omaan klooniin; kaupungin/aiheiden js/data-päällekkäisyyshaku tehty. Koneellisen tarkistuksen kuva-, kartta- ja sääpuutteet ovat erillisiä avoimia portteja. Nykyiset kuvatiedostot ja muut kuin tekstikentät säilytetty. Kuvatekstien lyhyt ja selite erotettu; käytetyt Commons-kuvat ja tallennetut lähde-/pikselitodisteet tarkistettu. Ei generointia eikä pelikytkentää.

Paikallinen tarkistin (`--lyhyt`, ei verkkokierrosta):

```text
VIRHE portlouis: kansikuva 3: tiedosto puuttuu
VIRHE portlouis: kansi nosto 1: tiedosto puuttuu
VIRHE portlouis: kansi nosto 2: tiedosto puuttuu
VIRHE portlouis: kansi nosto 3: tiedosto puuttuu
VIRHE portlouis: kansi nosto 4: tiedosto puuttuu
VIRHE portlouis: matkailijalle.kuva: tiedosto puuttuu
VIRHE portlouis: opas jakso 1: tiedosto puuttuu
VIRHE portlouis: opas jakso 2: tiedosto puuttuu
VIRHE portlouis: opas jakso 3: tiedosto puuttuu
VIRHE portlouis: opas jakso 4: tiedosto puuttuu
VIRHE portlouis: opas jakso 5: tiedosto puuttuu
VIRHE portlouis: teemasivu historia nosto 1: tiedosto puuttuu
VIRHE portlouis: teemasivu historia nosto 2: tiedosto puuttuu
VIRHE portlouis: teemasivu historia nosto 3: tiedosto puuttuu
VIRHE portlouis: teemasivu historia nosto 4: tiedosto puuttuu
VIRHE portlouis: juttu Aapravasi Ghat kuva 1: tiedosto puuttuu
== portlouis: 16 virhettä, 2 varoitusta, 4 kuvaa
YHTEENSÄ 1 kaupunkia: 16 virhettä, 2 varoitusta
```
SHA256: 2da393c7d358fcb85daeca3fd29091480a3fcadd2e4cfc026ef5aac780063fe8

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash a2772051a7dcbc8bc05b2d8d43ee2186954b3815258271a7eca4ab4bf51a75e2. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS portlouis: kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS portlouis: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash a2772051a7dcbc8bc05b2d8d43ee2186954b3815258271a7eca4ab4bf51a75e2. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS portlouis: kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS portlouis: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
