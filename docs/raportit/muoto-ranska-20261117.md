# Muoto (tyyppi) Ranskan 67 maatasolla näkyvälle paikalle (SK 17.11.2026, KK:lle)

Suunnitelma `20261117-maakartan-kohteet` kohta 8. Data: `data/muoto.json` (avain = karttavalon id, arvo `{tyyppi}`); PK vie kentän `muoto`. Pohja TULOS-tyypit kohta 5, jokainen rivi tarkistettu käsin paikan mukaan (ei nimisäännöllä).

## Tyypit
kaupunki 16, ei-muotoa 12, vuori 7, palatsi 6, kirkko 5, maasto 5, vesi 4, linna 3, silta 3, raunio 2, luostari 1, luola 1, megaliitti 1, muistomerkki 1. Kohteen saavat kirkko, linna, palatsi, luostari, raunio, silta, luola, muistomerkki ja megaliitti; vuori ja maasto ovat maisemaa (ei kohdetta, sukellus maisemaan), vesi on viivamerkki, kaupunki ja ei-muotoa pisteitä.

## Eroja TULOS-tyypit-ehdotukseen
- Carnac: raunio → megaliitti (uusi tyyppi). Mont-Saint-Michel, Pont du Gard ja muut tason 1 paikat ennallaan. Roquefavour on silta (akvedukti), Canal du Midi vesi.
- Kaupungit (Lyon, Reims, Vichy, Ajaccio, Le Puy, Biarritz, Bonifacio, Saint-Malo...) ovat tyyppi kaupunki eivätkä raunio, kaupunkitalo tai satama: valo on kaupunki, ei sen rakennus.
- Ruoka-, tapahtuma- ja eläinvalot (Chandeleur, Pétanque, Le Mans 24 h, Michelinin opas, Montgolfier, Roquefort, Kaulanauhajuttu, Bayeux'n seinävaate, Camarguen hevoset, camarguenvarsa, Vuorovesi 2015) ovat ei-muotoa.

## Epäselvät rivit (KK päättää; nykyinen arvo on paras arvaukseni)
| Valon id | Nimi | Nyt | Miksi epäselvä |
|---|---|---|---|
| `kohde:carnacin-kivirivit` | Carnacin kivirivit | megaliitti | TSV:ssä raunio; uusi tyyppi megaliitti |
| `kohde:avignonin-paavinpalatsi` | Avignonin paavinpalatsi | linna | linnoitettu palatsi; linna vai palatsi |
| `kohde:camargue` | Camargue | vesi | suiston alue; vesi vai maasto |
| `kohde:hahmotelma-saint-cloud` | Saint-Cloud’n linna | palatsi | palatsi paloi 1870 (kadonnut); onko muoto olemassa vai raunio |
| `kohde:hahmotelma-lourdes` | Lourdes | kaupunki | pyhiinvaelluspaikka; kaupunki vai kirkko |
| `kohde:hahmotelma-etretat` | Étretat | maasto | suunnitelman mukaan oma pieni muoto (jyrkänne, kaari, neula); tyyppi maasto kunnes muoto on tehty |
| `kohde:hahmotelma-vezelay` | Vézelay | kirkko | basilika ja luostari; kirkko vai luostari |
| `kohde:hahmotelma-beaune` | Beaunen Hôtel-Dieu | palatsi | sairaalarakennus; ei sopivaa tyyppiä |
| `kohde:hahmotelma-place-stanislas` | Nancy, Place Stanislas | palatsi | aukio ja palatsit; ei sopivaa tyyppiä |
| `kohde:hahmotelma-rocamadour` | Rocamadour | kirkko | pyhiinvaelluskylä kalliossa; kirkko vai kaupunki |
| `kohde:hahmotelma-saint-emilion` | Saint-Émilion | kaupunki | kylä ja viinialue; kaupunki vai ei muotoa |
| `kohde:hahmotelma-cognac` | Cognac | ei-muotoa | kaupunki vai juoma; kategoria ruoka |
| `kohde:hahmotelma-canal-du-midi` | Canal du Midi | vesi | kanava; TSV:ssä silta |
| `kohde:hahmotelma-cluny` | Cluny | raunio | luostarin jäänteet |
| `nosto:maalehti-chaine-des-puys` | Chaîne des Puys | vuori | tulivuoriketju; vuori vai maasto |

Lisäksi: Dune du Pilat on kahtena valona (`kohde:dune-du-pilat` ja `nosto:maalehti-dune-du-pilat`), molemmilla tyyppi maasto; yhdistäminen ei kuulu tähän.

## KK:n päätös 17.11. klo 12.51 (15 epäselvää)
12 jää ennalleen. Kolme muuttui: Camargue → maasto (alue, ei viiva), Saint-Cloud → ei-muotoa (palatsi paloi 1870 ja purettiin; tyyppimalli näyttäisi rakennuksen, jota ei ole), Place Stanislas → kaupunki (aukio, ei yksi rakennus). Sääntö jatkoon: tyyppi vain, jos tyyppimalli näyttäisi oikean lajin; muuten piste.
