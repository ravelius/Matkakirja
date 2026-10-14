# Peking — omistajan suora jatko-ohje 15.10.2026

Omistaja antoi Pekingin 3D-mallinnus-chatissa uuden suoran ohjeen aiemman PT261-välitoimituksen jälkeen. Hän pyysi myös ilmoittamaan Claudelle, että tämä on hänen määräyksensä.

Omistajan viestit sanatarkasti:

> jatka parantelua. onko näissä jo generoimiasi tekstuureita käytössä?

> tee ainakin toiset kymmenen kierrosta lisää

> ota ne lisätekstuurit mukaan ja teetä lisää jos ei muuten lopputulos parane. tee niin kauan kunnes lopputulos on aivan loistava

> informoi claudea että käsin sinun tehdä näin

## Codexin toteutus

Pekingin sama omistava chat `01a136eb-438c-77b2-85f2-7ab55020e302` jatkaa mallin parantamista nykyisestä, tarkistetusta PT261-kierroksen 10 versiosta. Uuteen työhön kuuluu vähintään kymmenen uutta varsinaista 3D-mallikierrosta. Työ jatkuu niiden jälkeenkin, jos tavoiteltu laatu jää saavuttamatta; aiempi kymmenen kierroksen pysähdysraja ei lopeta tätä omistajan valtuuttamaa jatkoa.

Aiemmin tuotetut 48 lisätekstuuria otetaan mukaan 64 tekstuurin kirjastona alkuperäisten 16:n rinnalle. Tarvittaessa tehdään kokonaan uusia tekstuureja ja sovelletaan niitä varsinaiseen 3D-malliin. Vanhoja kuvia ja suljettuja paketteja säilytetään. Mallin parannukset, tekstuurien todellinen käyttö ja vientiuskollisuus tarkistetaan kuudesta kiinteästä näkymästä; kuvia ei korvata pelkillä uusilla havainnekuvilla.

Nykyinen lähtöpaketti: `/Users/Shared/Claude/proto-3d/_valmiit/peking-codex-v11-pt261-20261014`, manifesti SHA256 `77a928d5b7ea289149ef57565551326f4678e00b97ddaca77ac5d06a386e1d42`. Sen toimituscommit on `9d1f5576708190b9cbd3a6d2d1d5b31b8bbb6f85`. Nykyisessä mallissa on käytössä aiemmin generoitu 16 tekstuurin atlas sekä yhdeksän laskennallista/arvioitua PBR-karttaa. Lisä48 oli aiemmin jätetty pois vaikutusvertailun jälkeen; uusi omistajan ohje nimenomaisesti muuttaa tämän valinnan.

Uusi tuotanto tehdään omassa työjuuressa `/Users/Shared/Claude/proto-3d/_tyo/codex/peking/model-loop-owner-20261015`. Suuret jäljellä olevat erot ovat historiallisten rakenteiden yksityiskohdissa, puuston rakenteessa sekä veden ja maapintojen uskottavuudessa. Niitä korjataan todellisena geometriana, materiaaleina ja renderöintiasetuksina. Varmentamattomia siluetti-/sävyvastaavuuden lukuja ei keksitä; ne pidetään nullina. Lähdekorkeudet ja aiempi historiallinen korkeuspoikkeus säilytetään näkyvästi raportoituina.

Tämä on ilmoitus omistajan ohjeesta ja tuotannon jatkosta, ei uusi mallitoimitus tai tavoitehyväksyntä. Peking pysyy poissa pelistä. Tämä ei valtuuta Unity-integraatiota, R2-vientiä, main-yhdistämistä tai julkaisua. Petřín ei kuulu tämän chatin työhön.
