# Nostotasot: DEU/ITA/ESP jo tehty, GBR/POL/AUT ehdotus (2026-09-21)

## Tärkeä löydös ennen ehdotuksia

**DEU, ITA ja ESP on jo käsitelty** — eri tilaus samana päivänä
("muutama muu maa samalla tapaa" FRA:n jälkeen), dokumentoitu
`docs/raportit/nimisto-taso-esp-ita-deu-20260921.md`:ssä. Kolme
pushattua, VIELÄ MERGEAMATONTA haaraa:

- `sisalto-nimisto-taso-deu` (cca22bea): 8 taso-1-nostoa
- `sisalto-nimisto-taso-ita` (b8fcdbe0): 8 taso-1-nostoa
- `sisalto-nimisto-taso-esp` (f208c490): 8 taso-1-nostoa

Kukin 8, ei tämän tilauksen pyytämää 4-6 eikä tiukkaa "yksi per
tyyppi" -periaatetta (esim. DEU:lla on nyt 3× historia, ITA:lla 3×
vuori). Tarkat listat molemmilla vaihtoehdoilla (hyväksy 8 vs. karsi
4-6:een) ovat tutkimusagenttien vastauksissa — pyydä jos tarvitset,
en toista niitä tähän koska ne EIVÄT ole uusi tilaus vaan olemassa
olevaa työtä. **Päätöstä tarvitaan: hyväksytäänkö olemassa oleva 8/maa
vai karsitaanko 4-6:een yhtenäisyyden vuoksi?**

## GBR — ehdotus (6, tunnetuin ensin)

Pääkartan pooli: `maastokohteet-gbr.js` (10), `hahmotelma-gbr.js` (17),
`fokuskohteet-gbr.js` (3 "Matkakirjan ihmettä", myös pääkartalla).
Big Ben ja Lontoon silmä EIVÄT kelpaa — vain Lontoon kohdekartalla.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Stonehenge | maastokohteet-gbr.js | historia | Maailman tunnetuin esihistoriallinen monumentti, Unesco |
| Edinburghin linna | hahmotelma-gbr.js | historia | Skotlannin tunnetuin linna, myös pääkartan hahmotelmanosto (ei vain kohdekartalla) |
| Ben Nevis | maastokohteet-gbr.js | vuori | Brittein saarten korkein huippu |
| Ironbridge | maastokohteet-gbr.js | tekniikka | Maailman ensimmäinen valurautasilta, Unesco, teollisen vallankumouksen tunnus |
| Doverin liiduvuoret | hahmotelma-gbr.js | meri | Kansainvälisesti tunnistettavin Britannian rannikkosymboli |
| Bathin roomalaiset kylpylät | maastokohteet-gbr.js | kulttuuri | Parhaiten säilynyt roomalainen kylpylä Britanniassa, Unesco |

Lähellä: Giant's Causeway (vuori-paikasta hävisi Ben Nevisille),
Hadrianuksen muuri ja Skara Brae (historia-paikasta hävisivät).

## POL — ehdotus (6, tunnetuin ensin)

Pääkartan pooli: `maastokohteet-pol.js` (13), `hahmotelma-pol.js` (28).
Wieliczkan suolakaivos, Toruń ja Wrocław EIVÄT kelpaa — ne ovat jo
Krakovan kaupungin fokusvirran (kohdekartan) sisältöä.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Auschwitz-Birkenau | maastokohteet-pol.js | historia | Puolan kansainvälisesti tunnetuin kohde; asiallinen, ei sensaatiohakuinen |
| Malborkin linna | maastokohteet-pol.js | historia | Maailman suurin linna pinta-alaltaan, Unesco |
| Białowieżan metsä | hahmotelma-pol.js | kulttuuri | Euroopan viimeinen laaja alkumetsä, Unesco, Euroopan biisonit |
| Rysy | maastokohteet-pol.js | vuori | Puolan korkein huippu Tatroilla |
| Słowińskin dyynit | hahmotelma-pol.js | meri | Ainutlaatuinen liikkuva hiekkadyynialue Itämerellä |
| Elblągin kanava | maastokohteet-pol.js | tekniikka | Ainutlaatuinen vinohissijärjestelmä, alukset kulkevat maata pitkin |

Lähellä: Jasna Góra, Zamość, Westerplatte, Gniezno (historia/kulttuuri
-paikoista hävisivät).

## AUT — ehdotus (6, tunnetuin ensin)

Pääkartan pooli: `maastokohteet-aut.js` (14), `hahmotelma-aut.js` (28).
Wienin kohdekartan nostot (Schönbrunn, Stephansdom, Belvedere jne.)
EIVÄT kelpaa — eri näkyvyysjärjestelmä.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Hallstatt | maastokohteet-aut.js | historia | Itävallan kansainvälisesti tunnetuin yksittäinen kohde, Unesco, kopioitukin Kiinaan |
| Großglockner | maastokohteet-aut.js | vuori | Itävallan korkein huippu, ikoninen vuoristotie |
| Hohensalzburgin linnoitus | maastokohteet-aut.js | historia | Yksi Euroopan suurimmista ja parhaiten säilyneistä keskiaikaisista linnoista |
| Melkin luostari | maastokohteet-aut.js | kulttuuri | Maailmankuulu barokkiluostari, Wachaun laakson (Unesco) tunnetuin näkymä |
| Semmeringin rata | maastokohteet-aut.js | tekniikka | Maailman ensimmäinen vuoristorata, Unesco |
| Tonava | maastokohteet-aut.js | joki | Euroopan tärkein virta, korvaa "meri"-roolin sisämaavaltiolle |

Lähellä: Eisriesenwelt (toinen vuori-ehdokas), Mauthausen (jätetty
pois luonteensa vuoksi vaikka tunnettuus korkea), Carnuntum,
Bregenzin järvinäyttämö, Kitzbühel.

## Ei muutoksia tehty

Kaikki yllä on ehdotus/tutkimus — `taso`-kenttää ei ole vielä
kirjoitettu mihinkään tiedostoon GBR/POL/AUT:lle. Odotan hyväksyntää.
