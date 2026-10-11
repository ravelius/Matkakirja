# e05 — A-faktakokoajan raportti

2026-10-11T21:28:39+03:00

**10 lähdekoostetta kirjoitettu ja 1/10 A valmis. Muut 9 eivät täytä kaikkia A-portteja.** Tämä on A-vaiheen työraportti, ei valmis erä, kaupunkitoimitus tai julkaisukuittaus.

| kaupunki | A | Wiki/P625-paikat | jatkoportti |
|---|---|---|---|
| bamako | ESTE | 0 + 2 tutkimuspistettä | Wiki/P625-paikannus ja kuuden vapaan paikan määrä |
| ouagadougou | ESTE | 2 | Kohdemäärä ja väestöalueen täsmätermi |
| niamey | ESTE | 3 | Kohdemäärä ja ennusteen alkuperäinen vahvistus |
| yamoussoukro | ESTE | 0 | Paikallinen 1873-kehys, vapaat karttapaikat ja säälähteet |
| accra | A valmis | 6 | B–F ja kuvaoikeudet vielä avoinna |
| lome | ESTE | 1 | Kohdemäärä ja rakennusten oikeusketjut |
| portonovo | ESTE | 1 | Kohdemäärä/oikeusketjut, nimetty opasruokalähde ja säärivi |
| abuja | ESTE | 2 | Kohdemäärä ja joidenkin nykytilatietojen vahvistus |
| ndjamena | ESTE | 1 | Kohdemäärä, museo-/kuvaidentiteetti ja opaslisälähde |
| yaounde | ESTE | 4 | Kohdemäärä, väestöalue ja ajantasaiset eläin-/kokoelmatiedot |

## Toimitettu oma aineisto

- Kaikkien kymmenen konteksti.json sekä saa-syote.json tuotettu alkuperäisellä konteksti-työkalulla; myöhempi saa-syote.json-työpuumuutos on pääsession.
- Jokaisella kaupungilla faktapohja.md:n osiot 0–9: lähteet/1873, perusfaktat, kansi, teema, opas, karttaehdotukset, visa/tiedot, sanalliset kuvatarpeet, epävarmat ja toistorajaus.
- Täyden kartan määrää ei täytetty suojatuilla nykyteoksilla, väärillä kaupunkipisteillä tai esineillä. Hylkäykset ja puuttuvat tiedot on nimetty.
- Kaikki lähdehaut yhteisellä robots-/redirect-/1s-apurilla. Estettyjä API-/Commons Special:Search -polkuja ei pyydetty. Wikidata Special:Search -tarkistus hylkäsi polun ennen sivuhakua.
- Säärivien taustametadata lisätty yhdeksään A-pohjaan pääsession NAS-tiedostoista. Säärivejä ei tuotettu tai muokattu tässä työssä, eikä niitä lisätä omaan committiin. Porto-Novo ilman sääriviä, Yamoussoukron lähdeorganisaatiot puuttuvat metadatasta.

## Tarkistuksen rajat

Kaupungit/maa-id:t ja osiot 0–9 tarkistettu 10/10. Pienet kirjoitusvirheet korjattu. Git-ero pohjaan rajataan paakaupungit-pilvi/e05/-kansioon ja lisättävät tiedostot yksilöidään. AppleDouble-sivutiedostoja ei indexiin; oman .git/objects/pack-alueen haitalliset ._*-metadatajäljennökset siirretty NAS-väliaikaisalueelle.

Ei npm test -ajoa tai sisalto.json-tarkistinta (sisältötyön A-poikkeus). Ei riippumatonta D-tarkistusta. Ei Commons-kuvahakua, kuvalisenssin hyväksyntää, sisalto.json:ia, PR:ää, mergeä, pelikytkentää, julkaisua, apuagentteja tai postilaatikkoviestiä.

## Haara ja säilytys

Oma NAS-klooni sessio-72-20261011/e05, haara paakaupungit-e05-codex, pohja e4f2845b3a82874550481fda26528df065820232. A-koosteet commit/push jokaisen kaupungin jälkeen; koontiin mukaan viimeiset metadatapäivitykset ja Yaoundé. Etäkärki varmistetaan lopussa ja SHA ilmoitetaan chatin loppuraportissa. Pääsession keskeneräiset säätiedostot jäävät omaan työpuuhun koskematta.
