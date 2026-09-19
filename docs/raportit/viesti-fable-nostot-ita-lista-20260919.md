# Viesti Fablelle: Italian hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-ita`
(pohja origin/main 62c0053e). **29 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli
  taulukossa. Yhtään lukua ei ole arvattu. Kohteet, joilla en-Wikipediassa ei ollut pistettä
  (Valley of the Temples, Alberobello, Assisin kaupunki, Canossan kunta, Trapanin suola-altaat),
  vaihdettiin saman paikan artikkeliin, jolla piste on (Agrigento: Temple of Concordia, Assisi:
  Basilica of Saint Francis, Canossa: Canossa Castle), tai jätettiin pois.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs`
  `laudat`, `osuuLehteen('ITA')`): **29/29 osuu Italian fokuslehteen**.
- Italian pelikaupungit ovat Rooma, Firenze, Venetsia ja Sisilia. Etäisyys pääkartan laudalla:
  lähin on Villa Adriana 9,7 (Rooma), sitten Chianti 12,3 (Firenze); raja
  `KAUPUNGIN_KOHDALLA_SADE` on 7, joten yksikään ei ole kaupungin kohdalla.
- Päällekkäisyys: verrattu `nostojenKarttapaikat()`-tulosteeseen (ITA:n 39 nykyistä nostoa) sekä
  maastokohteet-ita.js:n ja fokuskohteet-ita.js:n kohteisiin. Jo kartalla ovat mm. Vesuvius,
  Pompeji, Napoli, Pisa, Capri, Cinque Terre, Matera, Dolomiitit, Etna, Milano, Torino, Comojärvi,
  Po, Sardinia, Forum Romanum, Colosseum, kolme merta, Padova 1610, Modiglianin päät, Cagliostro.
  Yksikään ehdotus ei ole samalla paikalla: lähin nykyinen nosto on Villa Adriana – Colosseum 9,7 ja
  Val d'Orcia/Chianti – Firenzen syvennykset 12–30. Hylätty päällekkäisyyden takia: Campi Flegrei
  (3,7 Napolista), Amalfi (5,5 Pompejista), Ostia Antica (8,4 Roomasta, 7,9 Sikstus 1510 -hetkestä).
  Hylätty rajan takia: Fréjus-tunneli (Ranskan rajalla, rengas ei osu), Lago Maggiore ja Aquileia
  (rannan tai rajan ulkopuolella), San Gimignano (6 yks. Chiantista).
- Ei kaupunkeja: Ravenna, Parma, Modena, Bologna, Genova, Siena, Verona, Padova, Palermo jne. jätetty
  pois. Mukana on muutama pieni kaupunki/kylä (Assisi, Urbino, Cremona, Alba, Ivrea), koska niiden
  merkitys on kohde (basilika, palatsi, viulut, tryffelit), ei kaupunki.
- Tyypit ovat pelin oma `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / saari / jarvi;
  muut historia, kulttuuri, ruoka, kauppa, tekniikka).

## Lista

### Luonto (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-monviso | Monviso | vuori | 44,6675 / 7,0917 | Monte Viso | Alppien länsiosan pyramidinmuotoinen huippu, josta Po-joki saa alkunsa. |
| 2 | hahmotelma-gran-sasso | Gran Sasso | vuori | 42,4694 / 13,5653 | Gran Sasso d'Italia | Apenniinien korkein vuoristo Abruzzossa, jonka huippu Corno Grande nousee yli 2 900 metriin. |
| 3 | hahmotelma-gran-paradiso | Gran Paradiso | vuori | 45,5144 / 7,2697 | Gran Paradiso | Piemontin ja Aostalaakson välinen huippu, jonka rinteillä alppikauris pelastui sukupuutolta. |
| 4 | hahmotelma-garda | Gardajärvi | jarvi | 45,6333 / 10,6667 | Lake Garda | Italian suurin järvi, jonka pohjoisosaa reunustavat vuoret ja eteläosaa moreenikukkulat. |
| 5 | hahmotelma-stromboli | Stromboli | vuori | 38,7939 / 15,2111 | Stromboli | Liparinsaarten tulivuori, joka on purkautunut lähes taukoamatta ja jota sanotaan Välimeren majakaksi. |
| 6 | hahmotelma-elba | Elban saari | saari | 42,78 / 10,275 | Elba | Toscanan rannikon saari, jonne Napoleon karkotettiin 1814. |

### Historia (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 7 | hahmotelma-villa-adriana | Villa Adriana | historia | 41,9460 / 12,7725 | Hadrian's Villa | Keisari Hadrianuksen valtava huvilakompleksi Tivolin alla, jonka rauniot kertovat imperiumin makutaidosta. |
| 8 | hahmotelma-paestum | Paestum | historia | 40,4222 / 15,0053 | Paestum | Kreikkalainen Poseidonia, jonka kolme doorilaista temppeliä ovat Euroopan parhaiten säilyneitä. |
| 9 | hahmotelma-agrigento | Agrigenton temppelilaakso | historia | 37,2897 / 13,5921 | Temple of Concordia, Agrigento | Sisilian kreikkalainen temppelilaakso, jonka Concordian temppeli on lähes täydellisesti säilynyt. |
| 10 | hahmotelma-castel-del-monte | Castel del Monte | historia | 41,0848 / 16,2709 | Castel del Monte, Apulia | Fredrik II:n kahdeksankulmainen linna Apulian kukkulalla, jonka tarkoitus on yhä arvoitus. |
| 11 | hahmotelma-tarquinia | Tarquinia | historia | 42,2492 / 11,7561 | Tarquinia | Etruskien kaupunki, jonka hautakammioiden seinämaalaukset ovat 2 500 vuotta vanhoja. |
| 12 | hahmotelma-monte-cassino | Monte Cassino | historia | 41,49 / 13,8139 | Monte Cassino | Benedictuksen perustama luostari vuoren laella, joka tuhoutui 1944 ja rakennettiin uudelleen. |

### Kulttuuri ja ruoka (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 13 | hahmotelma-chianti | Chianti | ruoka | 43,4692 / 11,2889 | Castellina in Chianti | Toscanan viinikukkulat, joiden Chianti Classico -viinin maantieteellinen alue rajattiin jo 1700-luvulla. |
| 14 | hahmotelma-val-d-orcia | Val d'Orcia | kulttuuri | 43,0667 / 11,55 | Val d'Orcia | Renessanssin taidemaalarien ihannoima, kumpuileva Toscanan maisema, UNESCOn perintökohde. |
| 15 | hahmotelma-alba | Alba | ruoka | 44,7 / 8,0333 | Alba, Piedmont | Piemontin tryffelien ja Barolo-viinin kaupunki Langhen kukkuloilla. |
| 16 | hahmotelma-valdobbiadene | Valdobbiadene | ruoka | 45,9 / 11,9167 | Valdobbiadene | Proseccon kotiseutu Venetossa, jyrkkien viinirinteiden kylä. |
| 17 | hahmotelma-assisi | Assisin basilika | kulttuuri | 43,0747 / 12,6056 | Basilica of Saint Francis of Assisi | Pyhän Franciscuksen hautakirkko, jonka seinät Giotto ja muut varhaiset mestarit maalasivat. |
| 18 | hahmotelma-urbino | Urbino | kulttuuri | 43,7264 / 12,6364 | Urbino | Renessanssin ihanteiden herttuakaupunki, Rafaelin syntymäpaikka. |
| 19 | hahmotelma-cremona | Cremona | kulttuuri | 45,1333 / 10,0247 | Cremona | Viulunrakennuksen kotikaupunki, jossa Amati, Guarneri ja Stradivari työskentelivät. |
| 20 | hahmotelma-portofino | Portofino | kulttuuri | 44,3039 / 9,2078 | Portofino | Ligurian kalastajakylä pienen satamalahden reunalla. |

### Kauppa ja tekniikka (5)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 21 | hahmotelma-carrara | Carraran marmorilouhokset | kauppa | 44,0792 / 10,1 | Carrara | Valkoisen marmorin louhokset, joista Michelangelo ja Rooman keisarit hakivat kiveään. |
| 22 | hahmotelma-larderello | Larderello | tekniikka | 43,2397 / 10,8889 | Larderello | Höyryä maasta puhuvien lähteiden kylä, jossa geotermistä energiaa käytettiin ensimmäisenä. |
| 23 | hahmotelma-brennero | Brenner | tekniikka | 47,0033 / 11,5075 | Brenner Pass | Alppien matalin ylikulkusola, jonka yli rautatie avattiin 1867. |
| 24 | hahmotelma-stelvio | Stelvion sola | tekniikka | 46,5286 / 10,4528 | Stelvio Pass | Euroopan toiseksi korkein päällystetty vuoristotie, rakennettu Itävallan vallan aikana 1820-luvulla. |
| 25 | hahmotelma-ivrea | Ivrea | kauppa | 45,4667 / 7,8833 | Ivrea | Olivettin kirjoituskonetehtaan ja teollisen utopian kaupunki Piemontissa. |

### Skandaalit ja hetket (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 26 | hahmotelma-canossa | Canossan linna | historia | 44,576 / 10,456 | Canossa Castle | Paikka, jossa keisari Henrik IV kävi paavin edessä katumuksessa talvella 1077. |
| 27 | hahmotelma-cannae | Cannae | historia | 41,2964 / 16,1517 | Cannae | Hannibalin voittoisa saarrostustaistelu roomalaisia vastaan 216 eaa. |
| 28 | hahmotelma-solferino | Solferino | historia | 45,3672 / 10,5664 | Battle of Solferino | 1859 taistelu, jonka verilöyly sai Henri Dunantin ehdottamaan Punaisen Ristin perustamista. |
| 29 | hahmotelma-teano | Teano | historia | 41,25 / 14,0667 | Teano | Paikka, jossa Garibaldi luovutti etelän Vittorio Emanuele II:lle vuonna 1860. |

## Huomiot Fablelle

1. **Saaret ja raja-alueet vs. pelin karkea ääriviiva**: pelin maailmankartan ITA-rengas ei sisällä
   Strombolia (21 yks. ulkona) eikä Elbaa (10,9 ulkona), koska ne ovat saaria, jotka rengas jättää pois
   (Sardinia on erikseen oma kohteensa). Kuten Finisterre Espanjassa: pisteet ovat oikeasti maalla, mutta
   rengas ei niitä tunne. Jos haluat pisteet renkaan sisälle, pudotan Stromboli ja Elba ja korvaan
   sisämaan kohteilla (esim. Aquileia ei kelpaa, sekin on rannalla). Brennerin pisteen rengas osuu
   (0,6 rajalle), Stelvio 1,7, Agrigento 1,4, Tarquinia 1,4, Portofino 0,6 — rannikko/raja-arvot
   ovat renkaassa sisäpuolella.
2. **Lähekkäin**: Villa Adriana – Colosseum 9,7 yks. (>7); Val d'Orcia ja Chianti n. 30 yks.
   Firenzen syvennyksistä. Ne, joissa oli alle 9 yks. kaupunkiin tai nykyiseen nostoon, on pudotettu.
3. **Kohteet vuoden 1873 jälkeen**: Larderello (geoterminen sähkö 1904), Ivrea (Olivetti 1908),
   Monte Cassinon tuho 1944, Solferino 1859 ja Teano 1860 (edeltävät 1873). Nappi-alaotsikot
   kirjoitetaan 1873-näkökulmasta ("tänne nousee myöhemmin…").
4. **Kuvariskit**: Cannae (vain maisema/muistomerkki), Larderello ja Ivrea (nykykuvia, ehkä vain
   yksi tunnistettava) ovat riskikohteita; jätän pois, jos kahta kelvollista kuvaa ei löydy.
5. Lähdesivun väitteet ("miksi"-virkkeet) on kirjoitettu muistista listaa varten ja tarkistetaan
   Wikipedian tekstistä vaiheessa 2; vaiheessa 2 tekstit kirjoitetaan vain artikkelien pohjalta.

Odotan hyväksyntää (tai muutoksia) ennen vaihetta 2.
