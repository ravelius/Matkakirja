# Viesti Fablelle: Alankomaiden hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 18.08 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-nld` (pohja origin/main b9d8f213, v1957). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 29 nostoa (Fablen hyväksymä lista, ei korvauksia; Bergen op Zoom / Zierikzee / Ameland / Roermond -varasuunnitelmaa ei tarvittu), 73 Commons-kuvaa, 10 rahavisaa (Fablen lisäohje klo 18.00, PAATOKSET 51).**
Uusi tiedosto `js/packs/hahmotelma-nld.js` (`HAHMOTELMA_NLD`, rakenne täsmälleen kuin
hahmotelma-fra.js ja muut EU-pakat). Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.NLD`),
`sw.js` SHELL, `tools/build-standalone.mjs`. HUOM: haara on v1957:n päällä ilman DEU-, PRT-, GRC- ja AUT-rivejä, joten
rekisteröintirivit tulevat hahmotelma-fra-rivien jälkeen samoihin kohtiin kuin niiden — merge tuottaa triviaalin
konfliktin, ja kaikki rivit jäävät.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys Amsterdamiin (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| texel | Texel | saari | 553 | 2 | Michielverbeek, Txllxt TxllxT | CC BY-SA 4.0 | 30.2 |
| vlieland | Vlieland | saari | 648 | 2 | Hertha56, Paul Arps from The Netherlands | CC BY-SA 4.0, CC BY 2.0 | 41.8 |
| terschelling | Terschelling | saari | 639 | 2 | Ruben Holthuijsen, Smiley.toerist | CC BY 2.0, CC BY-SA 4.0 | 48.2 |
| schiermonnikoog | Schiermonnikoog | saari | 729 | 2 | acediscovery, Uberprutser | CC BY 4.0, CC BY-SA 3.0 nl | 67.0 |
| dwingelderveld | Dwingelderveld | kulttuuri | 566 | 2 | Agnes Monkelbaan | CC BY-SA 4.0 | 53.9 |
| oostvaardersplassen | Oostvaardersplassen | jarvi | 646 | 2 | EM Kintzel, I Van Stokkum, Dominicus Johannes Bergsma | CC BY 3.0, CC BY-SA 4.0 | 16.3 |
| biesbosch | Biesbosch | jarvi | 662 | 2 | FrDr, Ymblanter | CC BY-SA 4.0 | 29.2 |
| naarden | Naarden | historia | 685 | 2 | Nederlands Vestingmuseum, Jan Kranendonk | CC BY-SA 4.0, CC0 | 10.0 |
| dokkum | Dokkum | historia | 668 | 3 | Agnes Monkelbaan, Theun at Western Frisian Wikipedia, Jack de Nijs (Anefo) | CC BY-SA 4.0, CC BY-SA 3.0, CC0 | 56.5 |
| oudewater | Oudewater | historia | 686 | 3 | Rumex12, Gerard Dukker (Rijksdienst voor het Cultureel Erfgoed), Hendrik de Winter | CC BY-SA 3.0 nl, CC BY-SA 4.0, CC0 | 16.3 |
| kampen | Kampen | historia | 639 | 2 | Gouwenaar, Steven Lek | CC0, CC BY-SA 4.0 | 35.2 |
| hoorn | Hoorn | historia | 726 | 3 | Michielverbeek, Hendrick Cornelisz Vroom, Dqfn13 | CC BY-SA 4.0, Public domain | 13.5 |
| het-loo | Het Loon palatsi | historia | 725 | 3 | Zairon, Remi Mathis, Bastiaen Stopendael | CC BY-SA 4.0, CC BY-SA 3.0, CC0 | 35.9 |
| borger | Borger | historia | 554 | 2 | Alex Hoekerd, Wdejager | CC0, CC BY-SA 4.0 | 68.2 |
| elburg | Elburg | historia | 665 | 3 | KLM Aerophoto, Richard Broekhuijzen, Spotter2 | Public domain, CC BY-SA 4.0, CC BY-SA 3.0 | 32.2 |
| keukenhof | Keukenhof | kulttuuri | 792 | 3 | Elena.laps, Atamari, MPhernambucq | CC BY-SA 4.0 | 12.3 |
| gouda | Gouda | ruoka | 576 | 3 | Ralf Roletschek, Andy Li, Steven Lek | CC BY 3.0, CC0, CC BY-SA 4.0 | 17.5 |
| edam | Edam | ruoka | 672 | 3 | Gouwenaar, Lupo | CC0, CC BY-SA 3.0 | 8.2 |
| leiden | Leiden | kulttuuri | 731 | 3 | FrDr, Johan Bakker, Roger Veringmeier | CC BY-SA 4.0, CC BY-SA 3.0 NL, CC BY 4.0 | 16.5 |
| hindeloopen | Hindeloopen | kulttuuri | 727 | 3 | Gouwenaar, Weetjesman, Wutsje | CC BY-SA 4.0, CC BY-SA 3.0 | 30.8 |
| urk | Urk | kulttuuri | 598 | 3 | Uberprutser, George Christopher Davies (Rijksmuseum), Baykedevries | CC BY-SA 3.0, CC0, CC BY-SA 3.0 NL | 27.0 |
| thorn | Thorn | kulttuuri | 733 | 3 | Alupus, Bert Kaufmann, Microtoerisme | CC BY-SA 3.0 | 62.6 |
| nuenen | Nuenen | kulttuuri | 640 | 3 | DorineSaes, Vincent van Gogh, Bob MacInnes | CC0, Public domain, CC BY 2.0 | 46.0 |
| orvelte | Orvelte | kulttuuri | 607 | 3 | Kris Roderburg, Antoine, Anthony Ruijtenbeek | CC BY-SA 4.0, CC BY-SA 3.0 | 62.7 |
| sneek | Sneek | kulttuuri | 661 | 2 | Gouwenaar | CC BY-SA 4.0 | 39.0 |
| kinderdijk | Kinderdijkin myllyt | tekniikka | 635 | 2 | Norbert Reimer from Mettlach-Orscholz, Saarland, Uberprutser | CC BY-SA 2.0, CC BY-SA 4.0 | 23.6 |
| cruquius | Cruquius | tekniikka | 648 | 2 | Caspar, Cees de Boer | CC BY-SA 2.5, CC0 | 8.5 |
| enkhuizen | Enkhuizen | kauppa | 653 | 2 | Gouwenaar, Steven Lek | CC BY-SA 4.0 | 19.9 |
| franeker | Franeker | tekniikka | 653 | 3 | Erik Zachte, Bouwe Brouwer, Zairon | CC BY-SA 4.0, CC BY-SA 3.0 | 42.1 |

Kuvia yhteensä 73; lisenssijakauma: CC BY-SA 4.0 34, CC0 12, CC BY-SA 3.0 11, CC BY 2.0 3, Public domain 3, CC BY 4.0 2, CC BY-SA 3.0 nl 2, CC BY 3.0 2, CC BY-SA 3.0 NL 2, CC BY-SA 2.0 1, CC BY-SA 2.5 1.

## Rahavisat (10 noston kenttä `visa`, muoto kuten fokusvirta-*.js)

Neljä vaihtoehtoa, oikea-indeksit vaihtelevat (1,3,0,2,3,1,0,2,1,0), vastaus löytyy noston omasta tekstistä; `fakta` on saman
Wikipedia-artikkelin muu tieto. Tyypit: saari, järvi, 2 × historia, 3 × kulttuuri, ruoka, tekniikka, kauppa.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| texel | saari | Minne suuntasi ensimmäinen hollantilainen retkikunta, joka lähti Texelistä 5. kesäkuuta 1594? | Koillisväylälle (indeksi 1) |
| oostvaardersplassen | jarvi | Mitkä eläimet asettuivat hylätylle polderille ensimmäisinä? | Merihanhet (indeksi 3) |
| naarden | historia | Minkä muotoinen Naardenin linnoitus on? | Tähti (indeksi 0) |
| oudewater | historia | Mihin vanhaan uskomukseen noitavaa'an punnitus perustui? | Noidalla ei ole sielua, joten hän painaa selvästi tavallista vähemmän (indeksi 2) |
| keukenhof | kulttuuri | Mitä Keukenhof-nimi tarkoittaa? | Keittiöpuutarhaa (indeksi 3) |
| gouda | ruoka | Missä Goudan juusto valmistetaan? | Kaupungin ympäristössä (indeksi 1) |
| leiden | kulttuuri | Miksi Oranian Vilhelm I perusti Leidenin yliopiston? | Palkkioksi kaupungin sankarillisesta puolustuksesta (indeksi 0) |
| urk | kulttuuri | Miksi Urkin murre on säilynyt omaleimaisena? | Urk oli toiseen maailmansotaan asti saari, jolle pääsi vain veneellä (indeksi 2) |
| cruquius | tekniikka | Mitä Cruquiuksen koneesta uskotaan? | Että se on suurin koskaan rakennettu höyrykone (indeksi 1) |
| enkhuizen | kauppa | Mitä VOC säilytti Enkhuizenin Peperhuis-varastossa? | Mausteita (indeksi 0) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 29 |
| Teksti ≥ 200 merkkiä | 29/29 (553–792 merkkiä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 29/29 |
| 2 kysymystä pululle | 29/29 |
| ≥ 2 kuvaa | 29/29 (15 kohteella 3 kuvaa) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 73/73 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 73/73; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain) |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 73/73 |
| Korostukset löytyvät tekstistä | 29/29 |
| Fokuslehden rajaus (`osuuLehteen('NLD')`) | 29/29 (Watteninsaaret mukana) |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 29/29 pääkartalla, `kaupunginKohdalla` = null kaikilla |
| Etäisyys pelikaupunkiin (Amsterdam) | pienin Cruquius 8,5 ja Naarden 10,0; raja 7 |
| Päällekkäisyys 28 nykyisen NLD-noston kanssa | ei samoja id:itä eikä nimiä; lähimmät nykyiset: Kinderdijk – Van Meegeren 6,1 (Fable hyväksyi), Leiden – Vredespaleis 7,2, Hindeloopen – Afsluitdijk 7,1, Het Loo – Kröller-Müller 7,5 |
| Visat: 4 vaihtoehtoa, oikea-indeksi kelvollinen, ei kaksoisvaihtoehtoja | 10/10 |
| `node --test tests/*.test.mjs` | # tests 3663, # pass 3650, # fail 0, # skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Etäisyys NLD-renkaaseen (lautayksikköä renkaan reunasta, Fablen pyynnöstä)

**Renkaan ulkopuolella neljä Watteninsaarta** (pelin karkea maailmankartta ei ulotu saarille): Texel 4,8, Vlieland 12,7, Terschelling 8,9,
Schiermonnikoog 3,8. Koordinaatit ovat silti Wikipedian todelliset ja kaikki neljä osuvat Alankomaiden fokuslehteen. Renkaan sisällä olevista
lähimpänä reunaa: Thorn 1,7, Franeker 2,8, Dokkum 2,9, Keukenhof 3,1, Cruquius 4,8, Leiden 5,1, Hindeloopen 6,6; loput vähintään 8,5.
Koko lista: texel 4.8, vlieland 12.7, terschelling 8.9, schiermonnikoog 3.8, dwingelderveld 13.6, oostvaardersplassen 25.5, biesbosch 10.5, naarden 22, dokkum 2.9, oudewater 18.7, kampen 25.5, hoorn 13.3, het-loo 17, borger 10.7, elburg 27.1, keukenhof 3.1, gouda 15, edam 15.4, leiden 5.1, hindeloopen 6.6, urk 21.1, thorn 1.7, nuenen 8.5, orvelte 9.6, sneek 10.2, kinderdijk 17.4, cruquius 4.8, enkhuizen 14.6, franeker 2.8.

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Kinderdijk – nimiölimitys ja `nimio`-kenttä**: Kinderdijkin ja Goudan nimiöt veivät Van Meegerenin alakyljen, jolloin Van Meegeren siirtyi oikealle
   Loevesteinin arkun päälle ja `tests/nimiolimitys.test.mjs` kaatui. Korjaus: Kinderdijkin kortilla on `nimi: 'Kinderdijkin myllyt'`, mutta karttanimiö
   `nimio: 'Kinderdijk'` (`js/fokuskohteet.js` lukee `nimio ?? nimi`). Testit vihreät. Jos jokin muu maa törmää samaan, sama keino.
2. **Oudewater**: listassa "keisari Kaarle V:n aikana" — artikkeli ei mainitse Kaarle V:tä, joten teksti sanoo vain "1500-luvun noitaoikeudenkäynnit".
3. **Dwingelderveld**: tyyppi `kulttuuri` (pelissä ei ole nummi- eikä luontotyyppiä, joka sopisi); teksti on luontokohde. Fable hyväksyi listassa.
4. **Franeker**: listan "planetaario 1774" — artikkeli: rakennettu 1774–1781; teksti kertoo molemmat vuodet. Tyyppi `tekniikka` (orrery), ei kulttuuri.
5. **Gouda**: en-Wikipedian "smoking pipes" on tupakkapiippu; tekstissä "tupakkapiipuistaan".
6. **Nappi-alaotsikot 1873-katseella**: Nuenen ("Van Gogh muuttaa 1883"), Keukenhof (Zocherit 1857; tulppaanipuisto vasta 1949), Oostvaardersplassen
   ("vuonna 1873 tässä on vielä meren pohjaa"), Cruquius, Orvelte (museokylä 1967) ja Elburg (rautatie ohitti 1863).
7. **Delftin posliini**: ei omaa nostoa; `nosto-leeuwenhoek` on samassa paikassa (ei koskettu).
8. **Kuvarajoitukset**: Texelin lampaista ja hylkeistä ei löytynyt kelvollista kuvaa (Texelin kuvat ovat Eierlandin majakka ja dyynit); Dwingelderveldin
   kuvissa ei ole lampaita (kanervanummi ja lampi); Kap Hoorn -patsaasta ei kuvaa (Hoornin kuvat: satama, Vroomin maalaus, Westfries Museum). Hindeloopenin
   maalatusta huonekalusta ei löytynyt lähikuvaa; kuvana Fries Museumin huone. Borgerin ilmakuvan Commons-kuvaus on vain "Hunebed Borger" (selite ei väitä sitä D27:ksi).
   Elburgin pääkuva on KLM Aerophoton vanha ilmakuva (1564 px). Rajattuja: Het Loon Stopendael-kaiverrus (kuvateksti pois), Dokkumin Elfstedentocht-kuva (filmireuna pois),
   Oudewaterin piirros (paspartuu pois), Cruquiuksen arkistokuva (paspartuu pois), Urkin Rijksmuseum-valokuva (kehyksen kuvateksti pois; 940 px, alle 1800). Edamin kolmannessa
   kuvassa (Lupo) on yleisöä: turisteille järjestetty juustomarkkinan uudelleenesitys, selite kertoo sen. Naardenin ilmakuva on alkuperäinen 925 px.
9. **Kuvakansion tapaturma**: yksi kuva-agentti poisti hetkeksi (17.57–17.58) muiden agenttien 55 kuvaa `*.jpg`-siivouksessa ja palautti ne heti scratchpad-kopioista
   sha8-tunnisteen perusteella; koko kansio tarkistettiin sen jälkeen (jokainen JSON-tiedosto, sha8 täsmää, ei orpoja, ei puuttuvia). Toistuva 73/73 sha-tarkistus on tehty tämän jälkeen.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 73 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/nld/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Alankomaiden nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Watteninsaarten sijoittuminen renkaan ulkopuolelle jää ankkurilukon varaan.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia tässä erässä; viisi Sonnet-kuva-agenttia (kukin omat 5–6 kohdettaan) katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä on tarkistettu käsin (ei koneellisesti); kysymysten oikeellisuus perustuu noston omaan tekstiin.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/nld/`: 73 kpl `nld-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
