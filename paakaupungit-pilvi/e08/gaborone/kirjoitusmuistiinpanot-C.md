# Gaborone — C-kirjoitusmuistio 12.10.2026

Tekstiluonnos kirjoitettu, luettu lähteitä vasten ja alkuperäinen paikallinen tarkistin ajettu. Tämä ei ole riippumaton D, hyväksyntä, pelikytkentä eikä julkaisu. Työ vain oman NAS-kloonin kaupunkikansiossa ja omassa väliaineistossa. Ei Git-operaatioita, uusia agentteja/sessioita tai pelitiedostojen muutoksia.

Artikkeli: intro 864 merkkiä, jatko 881 merkkiä / 3 kappaletta. Nostot 8 (469–499 merkkiä), opas 5 jaksoa, kysymykset 5, tiedot 3. Kansilehti + historia, minitehtävä erillinen visasta. Kohteet/jutut 3/3.

`node paakaupungit-pilvi/tyokalu.mjs tarkista e08 gaborone --lyhyt`: 21 virhettä, 2 varoitusta, exit 1. 21 tyhjää kuvaroolia. Varoitukset: kohteita 3 (pohjataso 6) ja saatiedot puuttuu. Ei muita koneen tekstirakenne-/mittavirheitä tai varoituksia. Tarkistinta ei muutettu eikä virheitä peitetty. Koko varoitustuloste tallennettu erikseen.

Kartta partial 3/6–8: Kgale Hill, Gaboronen pato ja kansallinen kasvitieteellinen puutarha oman WP-artikkelin pisteillä. Historiallisen ydinkeskustan kohdepisteet ja lisäkohteet avoimet. Ei patsaita, muistomerkkejä tai museoteoksia.

Kuvat odottavat erillistä kuvaputkea/B-valintaa ja oikeustarkistusta: 21 kuvaroolia, kaikki neljä kenttää tyhjiä; ei kuvanimiä/generointia/Commons-hakua. Sääauditointi avoin (48/48 primäärivarmennus): saatiedot null, saa.json säilytetty koskemattomana, teksteissä ei säämäärälukuja. Nykyinen turvallisuuslähde avoin; ei turvallisuustakuuta. Tarkat lukuväitteet jätetty pois/vuosikymmeniksi; 1873-kehys vain kaupungin olemassaolon aikavertailuna, ei isoisän toimintaa tai lähteetöntä ulkoasua. Faktapohjassa lähde ja osio per käytetty aihe sekä ristiriitojen ratkaisut. Riippumaton D, E ja F vielä tekemättä.

SHA256:
- sisalto.json: `8e34c178ae22663901842ff49dc88bd0c001ba87ecbe2929f3ba9d0c1f5edf9e`
- faktapohja.md: `ae989c67f81a2aab6b338e994448beb014e20f166091be0a0e06ff45bf52703c`

Todisteet: `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/nopea-e08-gaborone`: HTML/tekstipoiminnat, fetch-log.jsonl, tarkistin-lyhyt.txt, tarkistin-kaikki.txt, mitta-sha.json ja robots-lokit.jsonl.


## Task 118 — korjauskierros 13.10.2026

Korjauslistan nimetyt tekstilöydökset käsitelty. Lähdepohja ja tallennetut /wiki/-sivut luettu. Tuore origin/main haettu erän omaan klooniin; kaupungin/aiheiden js/data-päällekkäisyyshaku tehty. Koneellisen tarkistuksen kuva-, kartta- ja sääpuutteet ovat erillisiä avoimia portteja. Nykyiset kuvatiedostot ja muut kuin tekstikentät säilytetty. Kuvatekstien lyhyt ja selite erotettu; käytetyt Commons-kuvat ja tallennetut lähde-/pikselitodisteet tarkistettu. Ei generointia eikä pelikytkentää.

Paikallinen tarkistin (`--lyhyt`, ei verkkokierrosta):

```text
VIRHE gaborone: kansikuva 3: tiedosto puuttuu
VIRHE gaborone: kansi nosto 1: tiedosto puuttuu
VIRHE gaborone: kansi nosto 2: tiedosto puuttuu
VIRHE gaborone: kansi nosto 4: tiedosto puuttuu
VIRHE gaborone: matkailijalle.kuva: tiedosto puuttuu
VIRHE gaborone: opas jakso 1: tiedosto puuttuu
VIRHE gaborone: opas jakso 2: tiedosto puuttuu
VIRHE gaborone: opas jakso 3: tiedosto puuttuu
VIRHE gaborone: opas jakso 4: tiedosto puuttuu
VIRHE gaborone: opas jakso 5: tiedosto puuttuu
VIRHE gaborone: teemasivu historia nosto 1: tiedosto puuttuu
VIRHE gaborone: teemasivu historia nosto 2: tiedosto puuttuu
VIRHE gaborone: teemasivu historia nosto 3: tiedosto puuttuu
VIRHE gaborone: teemasivu historia nosto 4: tiedosto puuttuu
VIRHE gaborone: juttu Kansallinen kasvitieteellinen puutarha kuva 1: tiedosto puuttuu
== gaborone: 15 virhettä, 3 varoitusta, 6 kuvaa
YHTEENSÄ 1 kaupunkia: 15 virhettä, 3 varoitusta
```
SHA256: 13cc9ea5f3de2d8ef4e5e6531361964f130790e049f1f96cb64229a25dc7307a

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 04845ed6c138bfb44cccb188c65102e2dd060c12b8bbdeed35af8a5f3938d6ed. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS gaborone: teemasivu historia nosto 2: teksti 420 mrk (440–660)
VAROITUS gaborone: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS gaborone: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 04845ed6c138bfb44cccb188c65102e2dd060c12b8bbdeed35af8a5f3938d6ed. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS gaborone: teemasivu historia nosto 2: teksti 420 mrk (440–660)
VAROITUS gaborone: kohteita 3 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS gaborone: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
