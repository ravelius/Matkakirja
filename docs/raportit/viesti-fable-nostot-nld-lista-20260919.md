# Viesti Fablelle: Alankomaiden hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-nld`
(pohja origin/main b9d8f213, v1957). **29 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli
  taulukossa. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs`
  `laudat`, `osuuLehteen('NLD')`): **29/29 osuu Alankomaiden fokuslehteen**, myös neljä Watteninsaarta.
- Alankomaiden ainoa pelikaupunki on Amsterdam. Etäisyys pääkartan laudalla: lähimmät ehdotukset ovat
  Edam 8,2 ja Cruquius 8,5; raja `KAUPUNGIN_KOHDALLA_SADE` on 7, joten yksikään ei
  ole kaupungin kohdalla.
- Maa on tiheä: Alankomaiden nykyiset 25 nostoa (Vaalserberg, Pohjanmeri, Maas, Woudagemaal, Deltatyöt,
  Vredespaleis, Domtoren, Bourtange, Giethoorn, Kröller-Müller, Nijmegen, Afsluitdijk, Maastricht, Alkmaarin
  huutokauppa, Delftin linssit, Loevestein, Van Meegeren, Naundorff, Oera Linda ja Amsterdamin nostot) täyttävät
  keskimaan. Hylätty päällekkäisyyden takia (alle 7 lautayksikköä nykyisestä merkistä): **Delft (posliini)** (nykyinen
  `nosto-leeuwenhoek` on samassa paikassa — Delftin posliini jää sen alaotsikkoon, samoin kuin Kreikan Mykene),
  Zaanse Schans (5,0), Muiderslot (5,5), Kasteel de Haar (4,7 Domtorenista), Schiedam (2,4), Veere (4,8),
  Doorwerth (5,9), Arnhem (6,0), Valkenburg (4,9), Rolduc (5,4), Haarlemmermeer (6,8) ja Haarlem (kaupunki).
  Muut ehdotukset ovat ≥ 7,1 lautayksikön päässä nykyisistä merkeistä.
- Ei kaupunkeja: Amsterdam, Rotterdam, Haag, Utrecht, Eindhoven, Groningen, Tilburg, Breda, Arnhem, Maastricht jne. jätetty
  pois. Mukana on pieniä kaupunkeja ja kyliä (Leiden ja Gouda ovat suurimmat, noin 125 000 ja 75 000 asukasta; Fable pyysi
  Leidenin yliopistoa ja Goudan juustoa nimenomaan), koska niiden merkitys on kohde, ei kaupunki.
- Tyypit ovat pelin oma `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi / meri; muut historia,
  kulttuuri, ruoka, kauppa, tekniikka).

## Lista

### Luonto (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-texel | Texel | saari | 53,05 / 4,8 | Texel | Watteninsaarista suurin, jonka rannikolla lampaat laiduntavat ja hylkeet lepäävät. |
| 2 | hahmotelma-vlieland | Vlieland | saari | 53,3 / 5,0667 | Vlieland | Watteninsaari ilman kaupunkia, jossa autot ovat lähes kokonaan kielletty. |
| 3 | hahmotelma-terschelling | Terschelling | saari | 53,4 / 5,3167 | Terschelling | Watteninsaari, jonka karpalot ja dyynit ovat tunnettuja. |
| 4 | hahmotelma-schiermonnikoog | Schiermonnikoog | saari | 53,49 / 6,225 | Schiermonnikoog | Pohjoisin Watteninsaari, jolla on kansallispuisto ja jossa autoja on vähän. |
| 5 | hahmotelma-dwingelderveld | Dwingelderveld | kulttuuri | 52,803 / 6,399 | Dwingelderveld National Park | Euroopan suurimpia märkiä nummia Drenthessä, lampaiden laiduntamaa. |
| 6 | hahmotelma-oostvaardersplassen | Oostvaardersplassen | jarvi | 52,45 / 5,3667 | Oostvaardersplassen | Zuiderzee-polderin uudisluonto, jossa lintukosteikko syntyi itsestään. |
| 7 | hahmotelma-biesbosch | Biesbosch | jarvi | 51,7333 / 4,75 | De Biesbosch National Park | Jokisuiston vuoroveden luoma tulvametsä ja kanavaverkko Rotterdamin eteläpuolella. |

### Historia (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 8 | hahmotelma-naarden | Naarden | historia | 52,2953 / 5,1622 | Naarden | Tähtimuotoinen linnoituskaupunki, joka on säilynyt lähes muuttumattomana. |
| 9 | hahmotelma-dokkum | Dokkum | historia | 53,3269 / 5,998 | Dokkum | Paikka, jossa Bonifatius sai marttyyrikuoleman 754. |
| 10 | hahmotelma-oudewater | Oudewater | historia | 52,0167 / 4,8667 | Oudewater | Noitavaaka, jolla keisari Kaarle V:n aikana tutkittiin noituussyytteitä. |
| 11 | hahmotelma-kampen | Kampen | historia | 52,55 / 5,9167 | Kampen, Overijssel | Hansakaupunki IJssel-joen suulla, jonka portit ovat säilyneet. |
| 12 | hahmotelma-hoorn | Hoorn | historia | 52,65 / 5,0667 | Hoorn | VOC:n kotikaupunki ja Kap Hoornin nimen alkuperä. |
| 13 | hahmotelma-het-loo | Het Loon palatsi | historia | 52,2342 / 5,9458 | Het Loo Palace | Oranian ruhtinaiden barokkipalatsi Apeldoornin lähellä (1684–1686). |
| 14 | hahmotelma-borger | Borger | historia | 52,9167 / 6,8 | Borger, Netherlands | Hunebedit eli kivikautiset jättiläishaudat Drenthessä. |
| 15 | hahmotelma-elburg | Elburg | historia | 52,45 / 5,85 | Elburg | Kalastuskaupunki Zuiderzee-rannalla, rakennettu ruudukkokaavaan. |

### Kulttuuri ja ruoka (10)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 16 | hahmotelma-keukenhof | Keukenhof | kulttuuri | 52,2713 / 4,5464 | Keukenhof | Lissen puisto, jonka tulppaanit kukkivat huhti–toukokuussa. |
| 17 | hahmotelma-gouda | Gouda | ruoka | 52,0111 / 4,7111 | Gouda, South Holland | Juuston kauppapaikka, jonka torilla juusto punnitaan. |
| 18 | hahmotelma-edam | Edam | ruoka | 52,5167 / 5,05 | Edam, Netherlands | Punavahaisen juuston kotikaupunki Zuiderzeen rannalla. |
| 19 | hahmotelma-leiden | Leiden | kulttuuri | 52,16 / 4,49 | Leiden | Alankomaiden vanhin yliopisto (1575) ja kaupunki, jonka piiritys 1574 murtui. |
| 20 | hahmotelma-hindeloopen | Hindeloopen | kulttuuri | 52,95 / 5,4 | Hindeloopen | Frisian entinen hansakaupunki, jonka maalatut huonekalut ovat tunnettuja. |
| 21 | hahmotelma-urk | Urk | kulttuuri | 52,663 / 5,5986 | Urk | Kalastajakylä, joka oli saari ennen Zuiderzeen kuivatusta. |
| 22 | hahmotelma-thorn | Thorn | kulttuuri | 51,1667 / 5,8333 | Thorn, Netherlands | Valkoiseksi rapatuilla taloilla tunnettu Limburgin kylä. |
| 23 | hahmotelma-nuenen | Nuenen | kulttuuri | 51,4733 / 5,5467 | Nuenen | Paikka, jossa Vincent van Gogh asui 1883–85 ja maalasi Perunansyöjät. |
| 24 | hahmotelma-orvelte | Orvelte | kulttuuri | 52,8436 / 6,6597 | Orvelte | Drenthen elävä ulkoilmamuseokylä perinteisine taloineen. |
| 25 | hahmotelma-sneek | Sneek | kulttuuri | 53,0325 / 5,66 | Sneek | Frisian vesiurheilukaupunki, jonka Waterpoort-portti on tunnettu. |

### Tekniikka ja kauppa (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 26 | hahmotelma-kinderdijk | Kinderdijkin myllyt | tekniikka | 51,8825 / 4,6494 | Kinderdijk windmills | 19 tuulimyllyä, jotka pumppasivat Alblasserwaardin polderin kuivana. |
| 27 | hahmotelma-cruquius | Cruquius | tekniikka | 52,3381 / 4,6383 | Museum De Cruquius | Höyrypumppuasema, joka kuivatti Haarlemmermeerin 1849–1852. |
| 28 | hahmotelma-enkhuizen | Enkhuizen | kauppa | 52,7 / 5,3 | Enkhuizen | Zuiderzee-satama, jonka museo esittelee maailman ennen Afsluitdijkiä. |
| 29 | hahmotelma-franeker | Franeker | tekniikka | 53,1833 / 5,5333 | Franeker | Eise Eisingan planetaario (1774), maailman vanhin yhä käytössä oleva. |

## Huomiot Fablelle

1. **Etäisyys NLD-renkaaseen** (pelin maailmankartan NLD-rengas, pistemäinen sisällä-testi; lautayksikköä
   renkaan reunasta): neljä Watteninsaarta on renkaan ulkopuolella — Texel 4,8, Vlieland 12,7, Terschelling 8,9,
   Schiermonnikoog 3,8; muut 25 ovat sisällä (lähimpänä reunaa Franeker 2,8 ja Dokkum 2,9).
   Ameland jätettiin pois, koska neljä saarta riittää.
2. **Delft (posliini)**: ei omaa nostoa, koska `nosto-leeuwenhoek` on samassa paikassa; posliini sopii sen alaotsikkoon.
   Zuiderzeen kuivatus on jo Afsluitdijk-nostossa ja Woudagemaalissa; Haarlemmermeerin kuivatus 1852 on Cruquiuksen nosto,
   ja Zuiderzee ennen patoa on Enkhuizenin, Urkin ja Elburgin asia.
3. **Läheiset nykyisiin**: Edam – VOC-hylky (syvennys) 7,9, Cruquius – Maitotyttö 8,4, Kinderdijk – Van Meegeren 6,1
   (Fablen pyytämä Kinderdijk, alle 7), Hindeloopen – Afsluitdijk 7,1, Het Loo – Kröller-Müller 7,5, Biesbosch – Loevestein 7,9.
   Kaupunkiraja 7 koskee vain kaupunkeja. Sano, jos haluat pudottaa jonkin.
4. **1873:n jälkeiset**: Keukenhof (1949), Oostvaardersplassen (1970-luvun polder), Zuiderzeen kuivatus 1932; nappi-alaotsikko
   1873-näkökulmasta ("tänne nousee myöhemmin…").
5. **Kuvariskit**: Vlieland, Oostvaardersplassen, Orvelte, Franeker (planetaarion sisäkuvia), Thorn; jätän pois ja korvaan
   kohteella (Bergen op Zoom, Zierikzee, Ameland, Roermond), jos kahta kelvollista kuvaa ei löydy.
6. "Miksi"-virkkeet on kirjoitettu muistista listaa varten ja tarkistetaan Wikipedian tekstistä vaiheessa 2; jos artikkeli
   ei tue väitettä, vaihdan kohteen tai tekstin ja kirjaan poikkeaman (sääntö Portugalista).

Odotan hyväksyntää (tai muutoksia) ennen vaihetta 2.
