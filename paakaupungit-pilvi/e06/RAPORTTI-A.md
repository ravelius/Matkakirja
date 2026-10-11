# e06 — A-faktakokoajan loppuraportti

Päiväys: 2026-10-11T21:47:43+03:00. Oma haara `paakaupungit-e06-codex`, pohja `e4f2845b3a82874550481fda26528df065820232`.

**9/9 kaupungin lähdelukukierrokset ja faktapohja.md tehty.** Kuudessa koottu 0–9-paketti kuudella lähteistetyllä karttakandidaatilla; varaukset eivät ole hyväksyttyjä poikkeuksia. **Kolmessa täysi A jää puutteeseen**. Kaupunkia ei ole kirjoitettu sisalto.json:ksi tai toimitettu peliin.

| Kaupunki | A-aineisto | Avoin olennainen asia |
|---|---|---|
| Libreville | 0–9, 6 ehdotusta | Estuaarin retkiluonnon rajaus ja torin aukio-sovitus |
| Ciudad de la Paz | Lähdeluku ja 0–9-puute-erittely | 0 kelvollista historiallista karttakohdetta; opas/teema eivät täytä minimiä. Uusi suojattu rakentaminen pois |
| São Tomé | 0–9, 6 ehdotusta | Obô-retkikohde rajauksen ulkopuolella; kahden kirkon nykyisten osien oikeus/historiallisuus |
| Bangui | Lähdeluku ja 0–9; ruokanosto täydennetty | 6–8 keskustakohteen ja käyntioppaan minimi puuttuu; ei kaupallista still-FOP:tä suojatuille teoksille |
| Brazzaville | 0–9, 6 ehdotusta | Ramsar-koordinaatin poikkeus, luontopaikkojen mahdollinen yhdistäminen, katedraalista vapaa vanha asu |
| Kinshasa | 0–9, 6 Wiki/Wikidata-ehdotusta | Eteläinen retkirajaus, zoo-nykytila, Lolan paikkalupa/kaupallinen kuvatiedosto |
| Luanda | 0–9, 6 historiallista ydinkohdetta | Jesusin myöhempien osien FOP/tekijä- ja kuvaportti; nykyinen kenttä NBJ korjattu |
| Kigali | 0–9, 6 Wiki/Wikidata-ehdotusta | Laaja luontokartan rajaus, Kandtin alkuperäinen rakenne/modernit osat kuvaportissa |
| Gitega | Lähdeluku ja 0–9-puute-erittely | 6 historiallista keskustakohdetta ei löytynyt; Gishoran perustaja/ajankohta ristiriitainen, 1873 epävarma |

Tarkat yksittäislähteiset vuodet/luvut poistettu tai vuosisata-/noin-muotoon, väestön laajuus ja vuosi kontekstista. Ristiriidat kirjoitettu auki. Luanda/Bata/Malabo ja vanhojen kirkkonimien korjaushavainnot faktapohjissa/TILANNE.md:ssä. Ei isoisän keksittyjä tekemisiä.

Kaikki lähdepyynnöt yhteisellä sallittu_haku.py:llä, robots ja ohjaukset tarkistettu. Omistajan tavallisen /wiki/-sivun ja EntityData-poikkeus kirjattu. Ei /w/ tai /api/ lähdepyyntöjä, Commons Special:Searchia tai kuvatiedostojen hakua/valintaa. Oikeusohjeiden Commons-sivut eivät olleet kuvahakuja. Ei apuagentteja/lisäsessioita tai postilaatikon/viestien kirjoitusta.

**Tarkistus:** omasta A-snapshotista 6f190ecc4a21af86f7c77f916a17e9859bbb6134 rakenteet 0–9 ja kontekstit 9/9, muutosraja vain e06, ei AppleDoublea indexissä, git diff --check OK. Ei varsinaista riippumatonta D-faktatarkistusta tai C/F-sisältötarkistinta; ei npm test -ajoa A/CODEX-poikkeuksen vuoksi. Tämä ei poista yllä olevia puutteita tai kuvaportteja.

**Omistajuus:** samassa NAS-kloonissa näkyy pääsession säävalmistelua, jota tämä agentti ei stageroi/nollaa. Sääsarjat, SAA-VALMISTELU.md, muuttunut saa-syote.json ja muiden säätaustalisäykset jäävät niiden kirjoittajalle. Gitegan omaan A-tiedostoon lisätty vain tausta-metatiedon viite. A-sääluvut/kaudet/kuvaus tehdään pääsession alkuperäisestä saa.json:sta, ei tässä käsin.

**Korjattu poikkeama:** yhden lukukomennon pycache-polun kirjoitusvirhe loi oman stdlib-välimuistin NAS-tehtäväjuuren ulkopuolelle. Vain .pyc/AppleDouble-aineisto tarkistettiin ja siirrettiin tehtäväjuureen; väärä hakemisto/sivutiedosto eivät jääneet ulkopuolelle. Käyttäjän muu aineisto koskematon. Muut repo-/työkirjoitukset e06:ssa ja väliaineistot tehtäväjuuren valiaikainen/e06:ssa.

Oman loppucommitin SHA tarkistetaan Gitistä ja etähaarasta pushin jälkeen; sitä ei kirjoiteta tähän itseään muuttavaan tiedostoon. Ei PR:ää, mergeä, pelikytkentää tai julkaisua.
