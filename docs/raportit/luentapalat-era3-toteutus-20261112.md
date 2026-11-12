# Luentapalat erä 3: toteutus koodiin (SK 12.11.2026)

KK:n päätökset (osio B, 39 ei-ok-palaa): 25 hyväksyttyä sellaisenaan (faktatarkistuksen `korjattu_teksti`) ja 14 poikkeusta (seulonnan valmiit tekstit tai KK:n oma sanamuoto). Kaikki 39 vietiin koodiin; yhtään palaa ei jäänyt "ei koodissa" -tilaan.

## Tulos

- Vietyjä paloja: 39 / 39 (25 sellaisenaan, 14 poikkeusta; BEL Maison du Peuple 2: "arkkitehteja ja taiteilijoita" -> "arkkitehteja").
- "Ei koodissa": 0.
- Vaihdettu 8 tiedostoa: js/packs/monumentit-eurooppa.js, maastokohteet-esp.js, maastokohteet-prt.js, skandaalit.js, historian-hetket.js, kulttuuri-kategoriat.js, nahtavyysjutut.js, fokusvirta-berliini.js; lisäksi data/aanitysjono.tsv (uudet avaimet).
- Vaihto skriptillä (sanatason diff, jokainen muutos löydetty tasan yhdestä paikasta; "+"-pätkitys ja lainausmerkit säilytetty, vaihdettu osa pätkitty uudelleen rivileveyden mukaan).
- Samat tekstit useassa paikassa vaihdettu yhdenmukaisesti: Bastilji 2 (3 paikkaa) ja Radialsystem V 1 (2 paikkaa).
- Pala-avaimet ovat tekstin tiivisteitä, joten jono päivitettiin `node tools/aanitysjono/tarkista.mjs --lisaa --siivoa`: vanhat avaimet pois, uudet sisään; ÄÄNITYSJONO: OK.

## Sivuvaikutukset (Äänittäjälle tiedoksi)

1. Palarajaus siirtyi kuudessa palassa: luentapalat jaetaan kohteen virkkeiden puoliskoihin, ja korjausten muuttama virkkeiden määrä siirsi rajaa kohteissa hahmotelma-ciutadella, san-geminiano, septizodium ja vilnan-alalinna. Näissä "pala N" on nyt uusi rajaus; ääni tehdään nykyisestä tekstistä (era3-hyvaksytyt-korjatut.json, kenttä `huomio`).
2. Lisärivit, joita ei ollut erä 3:n 39 palan joukossa (tiedosto era3-hyvaksytyt-korjatut-lisarivit.json): ESP Ciutadella pala 2 ja LTU Vilnan alalinna pala 2 (rajaus siirtyi), Berliinin fokusvirran täky "Hobrechtin putket" palat 1 ja 2 (sama teksti kuin Radialsystem V; olivat jo äänitettyinä, nyt uusi teksti ja uusi avain) sekä Pariisi / nahtavyysjutut / Bastilji 1789 pala 1 (sama Bastilji-teksti; oli äänitettynä).
3. Radialsystem V: avausvirke korvattu KK:n ohjeen mukaan ja sovitettu: "Pääputkien rakentaminen alkoi 1873 ja viimeinen valmistui 1893" -> "Pääputkien rakentaminen jatkui, ja viimeinen valmistui 1893" (vuosi 1873 on nyt avausvirkkeessä, ei toistoa).
4. Luxemburg 1: seulonnan virke "linnoitus sai nykyisen ilmeensä" käytetty sellaisenaan (KK:n päätös); sanamuoto "nykyisen" on huomioitava, jos linnoituksen purkuvaihe halutaan myöhemmin mukaan.

## Mercato Vecchio 2 (f74a5479...): lopullinen teksti ja lähteet

Teksti: "Siellä seisoivat myös Giorgio Vasarin suunnittelema kalahalli Loggia del Pesce ja Abbondanza-pylväs, ja osassa aluetta asui juutalaisia, jotka oli määrätty gettoon 1571. Kun Firenze oli ollut Italian pääkaupunki, kaupunki päätti vanhan keskustan saneerauksesta; hanke hyväksyttiin vuonna 1885, ja alueen asukkaat häädettiin. Tilalle nousi Piazza Vittorio Emanuele II, nykyinen Piazza della Repubblica, jonka kaareen kirjoitettiin: ”kaupungin vanha keskusta”."

Tarkistus (WebFetch/WebSearch 12.11.2026):
- Vuosi 1885: it.wikipedia "Mercato Vecchio (Firenze)" ja it.wikipedia "Risanamento di Firenze" antavat molemmat hankkeen hyväksymisen 1885:ksi (en.wikipedia "Piazza della Repubblica, Florence" ja muut haut: työt 1885-1895). Kuukausi/päivä pois KK:n ohjeen mukaan.
- Perheiden määrä (1 778 perhettä, 5 822 ihmistä): löytyi vain it.wikipedia "Mercato Vecchio (Firenze)" -sivulta; "Risanamento di Firenze" -sivu ei anna lukua (vain: alue evakuoitiin kesäkuuhun 1885 mennessä), eikä kahdella hakukierroksella löytynyt toista lähdettä. Ei kahta lähdettä, joten luku pois: "alueen asukkaat häädettiin".
- Italiankielinen kaarikirjoitus suomennettu: ”L’antico centro della città” -> ”kaupungin vanha keskusta”.

Pont transbordeur 2: "loput romahtivat"; "kannen pohjoispäässä" pois (fr.wikipedia sanoo ravintolan olleen kannen pohjoispuolella, ei pohjoispäässä; tarkka sijainti vain yhdessä lähteessä).

## Palat

| avain | kaupunki | kohde | pala | laji | paikat |
|---|---|---|---|---|---|
| 18114be4037a06d336213abcccef737e | AUT | hahmotelma-karntnertor | 1 | poikkeus | js/packs/monumentit-eurooppa.js |
| 968dfeecebddbfd9efaa21308a8cc8b6 | AUT | hahmotelma-karntnertor | 2 | poikkeus | js/packs/monumentit-eurooppa.js |
| d692b0b1b5d41d11b594ded3d8727faa | BEL | hahmotelma-maison-du-peuple | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 536877e3efc45fa96e18e93bc865fa29 | BEL | hahmotelma-maison-du-peuple | 2 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 52d5f31f124d0d702e918e25c1978bd7 | CZE | hahmotelma-praha-raatihuone | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 39c8d39621aa6d68e85890639de5b5f7 | CZE | hahmotelma-praha-raatihuone | 2 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 50be73cbf6d9f3924241868df10054f2 | DEU | hahmotelma-anhalter-bahnhof | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| fe66fbeca2f6c994db413a8fe60b3331 | DEU | hahmotelma-anhalter-bahnhof | 2 | poikkeus | js/packs/monumentit-eurooppa.js |
| 3f348cd3ad4483433f9b54390461df1b | DEU | hahmotelma-palast-der-republik | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 3126848a2839464bf1ec1ef1cfd77344 | ESP | hahmotelma-ciutadella | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 72b6135bfd01fc424588a4fe5a9dcbe9 | ESP | teide | 1 | sellaisenaan | js/packs/maastokohteet-esp.js |
| a08ce0f91d2e70e6814643a11bb2275a | FRA | hahmotelma-pont-transbordeur | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 92bd84cea6eecc21a0364baf90207548 | FRA | hahmotelma-pont-transbordeur | 2 | poikkeus | js/packs/monumentit-eurooppa.js |
| fac49762134a129461a731254df2d00f | FRA | ranskan-vallankumous-bastilji-1789 | 2 | sellaisenaan | js/packs/historian-hetket.js, js/packs/kulttuuri-kategoriat.js, js/packs/nahtavyysjutut.js |
| 45889d0062cf2047134c2626ca2ab7a3 | FRA | mona-lisan-varkaus-1911 | 4 | poikkeus | js/packs/skandaalit.js |
| 83887b05481163002e690eb9e3208899 | HUN | hahmotelma-erzsebet-silta | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| f74a5479aa6e4ba55e61d7c0a59b1a2e | ITA | hahmotelma-mercato-vecchio | 2 | poikkeus | js/packs/monumentit-eurooppa.js |
| e0e6e97c1b6ae34f60d4b9c09e4c3b49 | ITA | hahmotelma-san-geminiano | 1 | poikkeus | js/packs/monumentit-eurooppa.js |
| ed1a1f31bd63028742834cabf7333bfd | ITA | hahmotelma-san-geminiano | 2 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 004aefb3ed6a5c241df16f7e391ab35d | ITA | hahmotelma-septizodium | 1 | poikkeus | js/packs/monumentit-eurooppa.js |
| 56cd4fc9422dc97578c0f06c30ce3189 | ITA | hahmotelma-septizodium | 2 | poikkeus | js/packs/monumentit-eurooppa.js |
| 51168b23e77124eb6b98fee0e8853630 | LTU | hahmotelma-vilnan-alalinna | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 50ab0a95a26d5de24688c902aba63018 | LUX | hahmotelma-luxemburgin-linnoitus | 1 | poikkeus | js/packs/monumentit-eurooppa.js |
| f386cf98fbdb9bfe110d21b42b8e9ba0 | POL | hahmotelma-nevski-varsova | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 35fc46d661c7205ef3274727ad085f78 | POL | hahmotelma-suuri-synagoga-varsova | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 0efa142989e67386a92c2a2e25fc202f | PRT | hahmotelma-tejo-ooppera | 1 | poikkeus | js/packs/monumentit-eurooppa.js |
| 7389b83e4e19a96ed536d9752bac00c8 | PRT | hahmotelma-tejo-ooppera | 2 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| f98c5401ec44d70dd77a1b7aac6b4f8a | PRT | madeiran-laurisilva | 1 | sellaisenaan | js/packs/maastokohteet-prt.js |
| 8593bb965393df33e3745ec6d5a9940f | PRT | madeiran-laurisilva | 2 | poikkeus | js/packs/maastokohteet-prt.js |
| e1065770063204cff823f0c11e3c85d2 | PRT | sete-cidades | 1 | sellaisenaan | js/packs/maastokohteet-prt.js |
| 3df54874859955f1c849ff4d7e7f5cad | PRT | sete-cidades | 2 | poikkeus | js/packs/maastokohteet-prt.js |
| 57f1e50c24e45482b178da39972414d5 | ROU | hahmotelma-vacaresti | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| bd64bd726f000dac25d334d7649a4218 | ROU | hahmotelma-vacaresti | 2 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| f0150b604c20471b536063ff647350c4 | RUS | hahmotelma-nyenskans | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| bb48d24df6c9e12020275036b4064eb5 | RUS | hahmotelma-nyenskans | 2 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 0a4e55529628b9c8cdaadb7933fbf971 | RUS | hahmotelma-sukharev | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| d350e0d0767525393a83b6bff27894da | RUS | hahmotelma-sukharev | 2 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 567d92a277fe3832ede45d725f4e897e | SWE | hahmotelma-kustaa-ooppera | 1 | sellaisenaan | js/packs/monumentit-eurooppa.js |
| 32e3f9fad8463dc8b7220969538009b3 | berliini | Radialsystem V | 1 | poikkeus | js/packs/fokusvirta-berliini.js, js/packs/nahtavyysjutut.js |

## Siirtyneet palarajaukset

- ESP hahmotelma-ciutadella pala 1: Barcelonan Ciutadellan linnake. Ciutadella oli Barcelonan linnake, jonka Espanjan kuningas...
- ITA hahmotelma-san-geminiano pala 1: San Geminianon kirkko. San Geminianon kirkko seisoi Pyhän Markuksen torin länsilaidalla, j...
- ITA hahmotelma-san-geminiano pala 2: Uusi, keskikupolinen kirkko aloitettiin 1505, ja Jacopo Sansovinon suunnittelema julkisivu...
- ITA hahmotelma-septizodium pala 1: Septizodium. Septizodium oli monumentaalinen julkisivu Rooman Palatinus-kukkulan juurella ...
- ITA hahmotelma-septizodium pala 2: Yksi heistä kuoli kesken vaalin, ja valittu Selestinus IV kuoli vain pari viikkoa valintan...
- LTU hahmotelma-vilnan-alalinna pala 1: Vilnan alalinna. Vilnan alalinnan suurruhtinaiden palatsi oli Liettuan hallinnon keskus 14...

## Testit

- `node --test tests/kuvatekstit.test.mjs tests/vanha-maailma.test.mjs tests/sisaltopaketti.test.mjs tests/fokusvirta.test.mjs tests/horatio-livia-europe-batches.test.mjs tests/aanitysjono.test.mjs`: 176 / 176 läpi.
- Bastilji-teksti on testattu myös tests/nostot-kartalla.test.mjs ja tests/miniatyyrit-leikkaus.test.mjs (sanatarkka vertailu nostoon): 11 / 11 läpi kolmen paikan päivityksen jälkeen (testit löysivät kaksi ensin ohitettua Bastilji-paikkaa).
- Koko `npm test` (tests/*.test.mjs, 526 tiedostoa): 5712 läpi, 0 virhettä.
- `node tools/aanitysjono/tarkista.mjs`: ÄÄNITYSJONO: OK (puuttuvat 227, kaikki jonossa).
