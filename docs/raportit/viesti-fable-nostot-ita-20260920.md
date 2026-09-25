# Viesti Fablelle: Italian hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 16.00 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-ita` (pohja origin/main 62c0053e). Versiota ei nostettu, PR:ää ei avattu,
ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 29 nostoa (kaikki hyväksytyn listan kohteet, mitään ei pudotettu), 67 Commons-kuvaa.**
Uusi tiedosto `js/packs/hahmotelma-ita.js` (`HAHMOTELMA_ITA`, rakenne täsmälleen kuin
hahmotelma-fra.js ja hahmotelma-esp.js). Rekisteröinti kuten ESP: `js/fokuskohteet.js` (import +
`KOHDE_MAAT.ITA`), `sw.js` SHELL, `tools/build-standalone.mjs`. HUOM: ESP-haaran (#2607)
rekisteröintirivit ovat samoissa kohdissa (hahmotelma-fra-rivin jälkeen), joten merge tuottaa
triviaalin kolmen rivin konfliktin — molemmat rivit jäävät.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | lähin pelikaupunki (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| monviso | Monviso | vuori | 546 | 3 | Marco, Toma15996, Achille Monneret | CC BY-SA 2.0, CC BY-SA 4.0, Public domain | firenze 143.5 |
| gran-sasso | Gran Sasso | vuori | 607 | 2 | Fiat 500e, Bouke ten Cate | CC BY 4.0 | rooma 42.8 |
| gran-paradiso | Gran Paradiso | vuori | 581 | 2 | Luca Casale, Bramfab | CC BY-SA 4.0 | firenze 150.9 |
| garda | Gardajärvi | jarvi | 480 | 2 | Zairon | CC BY-SA 4.0 | venetsia 59.9 |
| stromboli | Stromboli | vuori | 534 | 2 | Carsten Steger, Mark Ireland | CC BY-SA 4.0, CC BY 2.0 | sisilia 66.5 |
| elba | Elban saari | saari | 495 | 2 | Carsten Steger, Wolfgang Sauber | CC BY-SA 4.0, CC BY-SA 3.0 | firenze 51.7 |
| villa-adriana | Villa Adriana | historia | 663 | 2 | Paul VanDerWerf from Brunswick, Maine, USA, FrDr | CC BY 4.0, CC BY-SA 4.0 | rooma 9.7 |
| paestum | Paestum | historia | 606 | 3 | PaestumPaestum, Heinz-Josef Lücking | CC BY-SA 4.0, CC BY-SA 3.0 de | rooma 102.0 |
| agrigento | Agrigenton temppelilaakso | historia | 639 | 3 | Michal Osmenda, Berthold Werner, Benjamin Smith | CC BY-SA 2.0, CC BY-SA 4.0 | sisilia 32.9 |
| castel-del-monte | Castel del Monte | historia | 587 | 3 | C.lapia, Bernard Gagnon, Berthold Werner | CC BY-SA 4.0, CC0, CC BY-SA 3.0 | rooma 130.0 |
| tarquinia | Tarquinia | historia | 589 | 2 | Gleb Simonov, AlexanderVanLoon | CC0, CC BY-SA 4.0 | rooma 28.5 |
| monte-cassino | Monte Cassino | historia | 687 | 3 | DonGatley, Mattis, Marica Massaro | CC0, CC BY-SA 4.0 | rooma 46.8 |
| chianti | Chianti | ruoka | 576 | 2 | Rowan Heuvel, Repuli | CC0, CC BY-SA 4.0 | firenze 12.3 |
| val-d-orcia | Val d'Orcia | kulttuuri | 560 | 2 | Iaia quark, kuhnmi | CC0, CC BY 2.0 | firenze 30.2 |
| alba | Alba | ruoka | 621 | 2 | Davide Tomatis, Kent Wang | CC BY-SA 4.0, CC BY-SA 2.0 | firenze 113.9 |
| valdobbiadene | Valdobbiadene | ruoka | 569 | 2 | Patafisik, Civvì | CC BY-SA 4.0 | venetsia 25.5 |
| assisi | Assisin basilika | kulttuuri | 614 | 3 | Blackcat, Giotto, tekijä tuntematon | CC BY-SA 3.0, Public domain | rooma 48.0 |
| urbino | Urbino | kulttuuri | 565 | 2 | Stefano Sansavini, NikonZ7II | CC BY-SA 4.0 | firenze 46.0 |
| cremona | Cremona | kulttuuri | 569 | 2 | Monica Rondoni, Tarisio Auctions (lataaja Violachick68) | CC BY-SA 4.0, CC BY-SA 3.0 | firenze 69.2 |
| portofino | Portofino | kulttuuri | 592 | 2 | Luka Peternel, Benjamin Smith | CC BY-SA 4.0 | firenze 71.6 |
| carrara | Carraran marmorilouhokset | kauppa | 671 | 2 | Wittylama, Gabriele85 | CC BY-SA 4.0, CC0 | firenze 40.5 |
| larderello | Larderello | tekniikka | 651 | 2 | Paul Gipe, Guglielmo Jervis | CC BY-SA 4.0, Public domain | firenze 24.8 |
| brennero | Brenner | tekniikka | 589 | 2 | Haneburger, Hermann Hammer | Public domain, CC BY-SA 4.0 | venetsia 71.7 |
| stelvio | Stelvion sola | tekniikka | 636 | 2 | kallerna, tuntematon | CC BY-SA 4.0, Public domain | venetsia 80.1 |
| ivrea | Ivrea | kauppa | 672 | 2 | Laurom, Vfbia | Public domain, CC BY-SA 4.0 | firenze 132.2 |
| canossa | Canossan linna | historia | 600 | 3 | SIG SG 510, Paolo da Reggio, Donizo | CC0, CC BY 2.5, Public domain | firenze 42.3 |
| cannae | Cannae | historia | 733 | 3 | Roberto Ragno, Jörg Schulz, Gustav Adolf Closs | CC BY-SA 3.0, Public domain | rooma 124.2 |
| solferino | Solferino | historia | 632 | 3 | Massimo Telò, memedesimo, Carlo Bossoli | CC BY-SA 3.0, CC BY 2.0, Public domain | venetsia 63.0 |
| teano | Teano | historia | 627 | 2 | Carlo Ademollo (1825-1911), Mauro Riccio | Public domain, CC BY-SA 4.0 | rooma 58.3 |

Kuvia yhteensä 67; lisenssijakauma: CC BY-SA 4.0 31, Public domain 11, CC BY-SA 3.0 7, CC0 7, CC BY-SA 2.0 3, CC BY 4.0 3, CC BY 2.0 3, CC BY-SA 3.0 de 1, CC BY 2.5 1.

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 29 |
| Teksti ≥ 200 merkkiä | 29/29 (480–733 merkkiä, 4–6 virkettä) |
| `lahde`-rivi (artikkeli + 19.9.2026) | 29/29 |
| 2 kysymystä pululle | 29/29 |
| ≥ 2 kuvaa | 29/29 (9 kohteella 3 kuvaa) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 67/67 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 67/67; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (4 rinnakkain), yksikään ei ole NC/ND/GFDL/FAL |
| Kuvatiedostot olemassa, sha256-etuliite = tiedostonimen tunniste | 67/67 (yhden kuva-agentin 16 tiedoston tunnisteet korjattiin todellisen sha256:n mukaisiksi) |
| Korostukset löytyvät tekstistä | 29/29 |
| Fokuslehden rajaus (`osuuLehteen('ITA')`) | 29/29 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 29/29 pääkartalla, `kaupunginKohdalla` = null kaikilla |
| Etäisyys pelikaupunkiin | pienin Villa Adriana 9,7 (Rooma) ja Chianti 12,3 (Firenze), raja 7 |
| Päällekkäisyys 40 nykyisen ITA-noston kanssa | ei samoja id:itä eikä nimiä; lähin nykyinen nosto on Villa Adriana – Colosseum 9,7 lautayksikköä |
| Piste Italian maalla (pelin maailmankartan ITA-renkaat) | 27/29; renkaan ulkopuolella (etäisyys renkaasta lautayksikköä): stromboli 21.2, elba 10.9 |
| `node --test tests/*.test.mjs` | # tests 3663, # pass 3650, # fail 0, # skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |

## Poikkeamat ja päätettävää

1. **Stromboli ja Elba renkaan ulkopuolella** (Fablen pyynnöstä etäisyys): Stromboli 21,2 ja Elba 10,9
   lautayksikköä pelin karkean ITA-renkaan ulkopuolella, koska rengas ei sisällä pieniä saaria. Pisteet
   ovat oikeasti saarten kohdalla (en-Wikipedian koordinaatit).
   Ankkurilukitus (velka, kuten Finisterre) ratkaisee. Muut rannikko- ja raja-arvot ovat renkaan
   sisäpuolella: Portofino 0,6, Brenner 0,6, Agrigento 1,4, Tarquinia 1,4, Stelvio 1,7, Carrara 3,1.
2. **Kuvariskikohteet Cannae, Larderello, Ivrea**: kaikille löytyi kaksi kelvollista kuvaa
   (Cannae 3, Larderello: jäähdytystornit 1996 + kaiverrus 1868, Ivrea: Olivettin ensimmäinen tehdas 1908 +
   Appelsiinitaistelu), joten korvauksia ei tarvittu ja luku 29 säilyi.
3. **13+ ja kuvat**: kuva-agentit hylkäsivät verta ja väkivaltaa sisältävät kuvat (mm. Tarquinian
   Tomba degli Auguri, Phersu-kohtaus). Jäljellä on kaksi maalausta, joita kannattaa silmäillä:
   Tarquinia, Leopardien haudan seinämaalaus (kaksi alastonta palvelijahahmoa antiikin freskossa, PD/CC0)
   ja Solferinon Bossolin taistelumaalaus 1859 (savua ja joukkoja, ei verta).
4. **Kuvien käsittely**: kaksi PD-kuvaa on rajattu (Larderellon kaiverruksen kirjapainoteksti leikattu pois,
   Stelvion 1895 -valokuvan nimileima leikattu pois); Canossan Donizon miniatyyrin foliomerkintä "49"
   leikattu pois. Rajaus on kirjattu JSON:n `huomio`-kenttään; sha8 on rajatusta tiedostosta.
   Alle 1800 px:n alkuperäiset (Giotton fresko 1486 px, Ademollon Teano-maalaus 659 px, jne.) on
   tallennettu sellaisenaan eikä venytetty.
5. **Koordinaatit**: Chiantille käytetty Castellina in Chiantin piste, Agrigentolle Temple of Concordia,
   Assisille Basilica of Saint Francis, Canossalle Canossa Castle, Solferinolle Battle of Solferino
   (en-Wikipedia; en-Wikipedian oma artikkeli ilman pistettä). Lähderiveillä mainittu.
6. **Tekstit** ovat omin sanoin en-Wikipedian johdannoista ja artikkelien osioista; Chiantin tekstissä
   yhdistetty "Chianti"-(viini) ja "Castellina in Chianti" -artikkelit, Cannaessa "Cannae" ja "Battle of
   Cannae". Listan "miksi"-virkkeissä muistista kirjoitetut väitteet (esim. Gran Paradison alppikauris,
   Carraran Michelangelo) on jätetty pois teksteistä, ellei artikkeli niitä sisältänyt.
   Stelvion sola: lista sanoi "Euroopan toiseksi korkein päällystetty tie", artikkelin mukaan se on Itäalppien
   korkein ja Alppien toiseksi korkein päällystetty sola — teksti seuraa artikkelia.
7. **1873-näkökulma**: `nappi`-alaotsikot on kirjoitettu 1873-katseella (Larderello: "höyryävä
   boorihappokylä, josta syttyy myöhemmin ensimmäinen geoterminen sähkö", Ivrea: "tänne nousee myöhemmin
   kirjoituskonetehdas", Brenner: rautatie "juuri valmistunut" 1867, Monte Cassino: valtio on tehnyt
   luostarista kansallismonumentin 1866).

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 67 tiedostoa kansiosta
  `/Users/samireivinen/Matkakirja-nostot-kuvat/ita/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan
  etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole
  committoitu. JSON-metatiedot ovat kansiossa `_json/`.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- Italian nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA). Havainnekuvat odottavat.
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja
  testit ovat vihreitä.
- Silmäpistokoe: itse katsoin Solferinon ja Tarquinian kuvat; loput katsoi viisi Sonnet-kuva-agenttia
  (kukin omat 5–6 kohdettaan), jotka raportoivat jokaisen katsotuksi ja listasivat hylätyt ehdokkaat.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/ita/`: 67 kpl `ita-nosto-<id>-<sha8>.jpg`, alikansio
`_json/` (kuvatiedot kohteittain).
