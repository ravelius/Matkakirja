# Kenttäkartta 2.0:aan: raakapolku → päätaso

Siirtoseppä 24.9.2026, skeema 1.31 (koepaketti v39, 2.0-koe
`/Users/Shared/Claude/sisalto-koe-2`). 2.0 poistaa alkioilta `data`-kentän.
Tämä kartta kertoo, mistä natiivin nykyinen `data.*`-luku löytyy päätasolta.
Kaikki kentät ovat 1.x-paketissa jo nyt, joten lukijan voi vaihtaa ennen 2.0:aa.

## Sääntö

Useimmissa kokoelmissa `data.X` on 2.0:ssa `X`, eli nimi ja rakenne ovat samat:
skandaalit, historianHetket, monumentit ja fokusvirrat (1.31), nahtavyydet,
paikallisaarteet, kohtaamiset, tarinakaari ja saapumispuheet (1.26, ks.
kokoelman `kuvaus`). Alla on vain poikkeukset, joissa nimi tai rakenne muuttuu.

## fokusvirrat

| 1.x raaka | päätaso |
|---|---|
| `data.lehtitehtavat[]` = `{ id, palkinto, … }` | `lehtitehtavat` = id-lista; olio (palkinto, kuvaus) kokoelmasta `lehtitehtavat` id:llä |
| muut `data.X` (aarremerkinta, kohtaaminen, kohteet, matkakirja, oppitunti, pollo, takynostot, takyt, valinta, kohtaamispiste, sahketehtava) | `X`, sama rakenne |
| (uusi) | `virta` = saapumisvirta valmiiksi ratkaistuna (kuvat url-olioina); valinnainen, raakanimiset kentät riittävät |

Pelikoodarin mainitsemat 207 poikkeavaa kenttää ovat `virta`n ja `data`n ero.
Kun luet raakanimisiä kenttiä päätasolta, eroa ei tarvitse ottaa huomioon.

## kaupunkilehdet

`data` on webin raaka aiheluettelo (KULTTUURI_KATEGORIAT[kaupunki]). Päätaso jakaa sen:

| 1.x raaka | päätaso |
|---|---|
| `data[]`, jonka `id == "kaupunki"`: `kansikuvat`, `avauskuvat`, `ennenNyt`, `matkailijalle` | `kansi.kansikuvat`, `kansi.avauskuvat`, `kansi.ennenNyt`, `kansi.matkailijalle` |
| sama aihe: `nimi`, `johdanto`, `nostot` | etusivun esittely `kaupungit.intro`; kaupunkiaiheen nostot ovat `aiheet[]`:ssä id:llä `kaupunki` |
| muut `data[]`-aiheet: `{ id, nimi, johdanto, nostot, tehtava }` | `aiheet[]` = `{ id, nimi, otsikko, sivunOtsikko, johdanto, ikoni, taitto, nostot, tehtava, lista, hero }` |
| `data[].tehtava` = `{ kysymys, vaihtoehdot, oikea, fakta }` | `aiheet[].tehtava` = sama + `palkkio` |

### Nosto (aiheet[].nostot[])

| raaka nosto | tyypitetty nosto |
|---|---|
| `otsikko`, `aika`, `tyyppi`, `vuosi`, `leveys`, `teksti` | samat |
| (teksti) | `kappaleet[]` (webin jaaKappaleiksi) |
| `tiedosto` / `osoite` / `ampari` + `lyhyt`, `selite`, `lahde` | `kuva` = `{ arvo, url, varat, leveys, korkeus, lyhyt, selite, lahde, … }` (arvo = raaka tiedosto/osoite/ampari) |
| `galleria[]` (samat kuvakentät) | `galleria[]` kuva-olioina |
| `lahde` (+ `aaniLahde` litteällä) | `lahderivi` (valmis teksti kuvan alle) |
| `aani` (merkkijono, voi sisältää `#t=`), `aaniLahde` | `aani` = `{ url, varat, alku, voima, lahde }` |
| `musiikki`, `musiikkiNimi` | `musiikki` = `[{ url, nakyva, otsake }]` ja `esikuuntelu` = `{ termi, musiikki, musiikkiNimi }` |
| `musiikkiNayte`, `musiikkiNayteNimi` | `musiikkiNayte` = `{ url, varat, alku, voima, nimi }` |
| `esikuuntelu` | `esikuuntelu.termi` |
| `linkki`, `linkkiNimi` | `linkki` = `{ url, nimi }` |
| `wiki` (otsikko) | `wiki` = `{ otsikko, omaArtikkeli, haut[] }` |

### Kansi (kansi.*)

| raaka (`data[id=kaupunki]`) | päätaso |
|---|---|
| `kansikuvat[]` = `{ tiedosto, lyhyt, selite, lahde }` | `kansi.kansikuvat[]` kuva-olioina (`arvo` = tiedosto, `url`, `varat`, mitat, `lyhyt`, `selite`, `lahde`) |
| `avauskuvat[]` | `kansi.avauskuvat[]` kuva-olioina |
| `ennenNyt` = `[ennen, nyt]` | `kansi.ennenNyt` = `[kuva, kuva]` tai null |
| `matkailijalle` | `kansi.matkailijalle` (kuvat kuva-olioina) |

## maalehdet

Maalehdillä on sama rakenne kuin kaupunkilehdillä (`aiheet[]`, nostot samoin).
Maan etusivun tiedot ovat kokoelmassa `maat` (intro, maakartta, rajat, radio,
vanhaAani, uutislahde, lipputarina, numeroina; 1.15).

## kaupungit

| 1.x raaka | päätaso |
|---|---|
| `data.name` | `nimi` |
| `data.x`, `data.y` | `lauta.x`, `lauta.y` |
| `data.airport` | `lentokentta` |
| `data.start` | `aloitus` |
| `data.pallo.lat/lon` | `lat`, `lon` (pallon oma piste on jo huomioitu) |
| `data.wiki` | `wiki` (1.31) |
| `data.ambience` | `ambienssi` (1.31) |
| `data.la`, `data.lx`, `data.ly` | `nimionAnkkuri` = `{ tasaus, dx, dy }` (1.31) |

## laatat, reitit, äänitaulut (1.21 ja 1.30)

- laatat: `data.types` → `tyypit`, `data.mannerTypes` → `mannerTyypit`, `data.counts` → `maarat`. Tyyppiolioissa 2.0:ssa vain `nimi`, `symboli`, `arvo`, `vari` (ei `name`, `symbol`, `value`, `color`) sekä `fakta` ja `kuva`.
- reitit: `data.steps` → `askelia`, `data.type` → `laji`, maksu → `maksu`.
- aanitaulut: siirtymän, tila- ja paikkaraidan sekä pulun kentät samannimisinä päätasolla.

## media.json 2.0:ssa

`viitteet[]` = `{ arvo, laji, avain, url, varat, alkuperainen, suurennos, leveys, korkeus }`,
`esiintymat` pois. Raa'an arvon (esim. skandaalin `kuva`-tiedostonimen) osoite: `arvo` → `url`.
