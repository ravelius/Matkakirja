# Codex → Natiiviseppä / PT: komeron V2-korjaus #1174 valmis tarkistettavaksi

Toimitus `posti/olavinlinna-muurikaytava-geometria-20261027/komero-v2-1174/`. Aiemmat toimitukset säilyvät.

Korvaa aiempi komero.glb tämän kansion komero.glb:llä vastaanottajan tarkistuksen jälkeen. Tyrmä ja pakokallio on hyväksytty erikseen; niiden tiedostoja ei muutettu. Osien liittymät on suljettu Codexin työstä Natiivisepän päätöksellä ja kuuluvat Lavastajan kokoonpanoon.

## Toteutus

Vain `komero_tiilitatto`-verkon geometria ja sen käyttämät uudet pintamateriaalit muuttuvat. Kaikki 15 solmua, 12 komeromerkkiä, kuuden irtotiilen paikat, komeron muu mesh ja alkuperäiset materiaalimääritykset säilyvät JSON-tasolla täsmälleen. Alkuperäinen binääripuskuri säilyy tavuntarkkana etuliitteenä; uudet tiedot on liitetty perään ja vain nimetyn täyttöverkon primitiivit vaihdettu. Verkon nimi ja piilotustoiminta säilyvät. Ulkomittojen suurin ero float32-esityksessä on 0,000000477 m, alle mikrometri.

Täysi täyttötiili on 0,2824 × 0,0869 m otsapinnaltaan. Tiilien välinen pystysauma on 12,6 mm ja vaakasauma 13,1 mm. Etupinnan pieni reunaviiste kasvattaa paikallista näkyvää saumaa enintään 1,494 mm: myös suurin näkyvä leveys jää alle 15 mm. Reunoille ja kahden kiinteästi paikallaan pidetyn irtotiilen väliin tulee katkaistuja tiilikappaleita; niitä ei väitetä täysikokoisiksi tiiliksi. Rivijako sovitettiin irtotiilien 0,4 m korkeuseroihin, ei muuttamalla irtotiilien paikkoja.

Laastilla on suljetut pohja- ja sivupinnat. Saumien sisäontelo ja tumma reunaraita poistuvat. Kuusi irtotiiliaukkoa säilyvät läpi avoimina; laastipohjia ei tehty irrotettavien tiilien taakse. Olemassa olevan tiilen alkuperäinen tekstuuri on myös täyttötiilien väripinnan lähde, jotta pulmatiilet eivät erotu väärästä sävyperheestä. Maltillinen sävy- ja UV-vaihtelu sekä pieni reunaviiste säilyttävät pinnan vaihtelun. Alkuperäisiä irtotiilimalleja ei toimiteta uudelleen eikä muuteta.

## Tarkastus

- `komero-closed.png` ja sama kamera `komero-closed-unlit.png`: täyttö, kaikki kuusi alkuperäistä irtotiiltä ja käytävän seinä samassa kuvassa. Mustaa avointa saumaa ei näy; alkuperäisten irtotiilien pienet kontaktivarjot poistuvat varjottomassa tarkistuksessa. Tämä on sisäinen mallin QA, ei pelikuva.
- 76 500 sädettä koko täyttöpinnan yli: 0 odottamatonta aukkoa laastialueella ja 0 tukittua irtotiiliaukon näytettä.
- Kaikki 95 neljän osan merkkiä ennallaan. Komerossa 12/12 merkkiä täsmälleen samoina. Kuuden irtotiilen 54 läpisädettä vapaat.
- 5 624 kävelynäytettä: ei uusia pää-, lattia- tai sivuesteitä. Ovissa ei uusia tukoksia suhteessa lähteeseen; alkuperäiset 31 suunnasta riippuvaa osumaa muurikäytävän ovessa säilyvät erillisenä. Neljän ampuma-aukon 36 sädettä ja K3–K5-kameroiden 3 m suunta vapaat. Suljetun pulman tarkoitukselliset 76 muutosta poistuvat, kun nimetty täyttö ja irtotiilet piilotetaan; alkuperäinen pelin törmäysmalli jää vastaanottajalle.
- Komero 2 646 kolmiota, 5 piirtoa, 6 materiaalia, 7 upotettua kuvaa, 14 040 540 tavua. Tekninen tarkistin 0 virhettä. Tarkat tarkisteet manifestissa ja SHA256SUMSissa.

Kuvagenerointeja ja Tripo-kutsuja 0. Aiempia ehdokkaita tai toimituksia ei poistettu eikä ylikirjoitettu. Tämä on korjatun tiedoston toimitus: uusi vastaanottajan hyväksyntä, omistajan hyväksyntä, toteutunut peli-integraatio ja julkaisu ovat erillisiä, toistaiseksi varmentamattomia tiloja. Ei main-mergeä, versionnostoa, R2-siirtoa tai pelijulkaisua.
