# Viesti Fablelle: Portugalin hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-prt`
(pohja origin/main 88f43233, v1956). **29 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli
  taulukossa. Yhtään lukua ei ole arvattu. Kohteet, joilla en-Wikipediassa ei ollut pistettä
  (Pinhão, Barcelos, Berlengas, Laurisilva), vaihdettiin toiseen kohteeseen tai saman paikan
  artikkeliin.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs`
  `laudat`, `osuuLehteen('PRT')`): **27/29 osuu Portugalin fokuslehteen**; poikkeukset ovat kaksi
  Azorien ja Madeiran kohdetta (ks. huomio 1).
- Portugalin ainoa pelikaupunki on Lissabon. Etäisyys pääkartan laudalla: lähin ehdotus on Vimeiro/Torres
  Vedras (Torres Vedras 14,5); raja `KAUPUNGIN_KOHDALLA_SADE` on 7, joten yksikään ei ole kaupungin
  kohdalla.
- Päällekkäisyys: verrattu `nostojenKarttapaikat()`-tulosteeseen (PRT:n 25 nykyistä nostoa) ja
  maastokohteet-prt.js:n kohteisiin. Nykyisiä ovat mm. Torre (Serra da Estrela), Atlantti, Tejo, Douro,
  Sintra, Batalha, Tomar, Guimarães, Almendres, São Vicente, Elvas, Óbidos, Aveiro, Joanina, Nazaré,
  São Bento, korkkitammi, Alves dos Reis, nunnan kirjeet, Ultimaatum 1890, Restelo 1497 ja Lissabon 1484.
  Hylätty päällekkäisyyden takia (alle 7 lautayksikköä nykyisestä noston merkistä): Conímbriga (4,9
  Joaninasta), Almourol (5,7 Tomarista), Fátima (5,3 Batalhasta), Buçaco (6,2 Joaninasta), Marão (4,8
  Douro-merkistä) ja Ericeira (6,4 Sintrasta). Muut ehdotukset ovat ≥ 7,4 lautayksikön päässä nykyisistä.
- Ei kaupunkeja: Porto, Coimbra, Braga, Faro, Évora, Viseu, Setúbal, Funchal jne. jätetty pois. Mukana on
  pieniä kaupunkeja ja kyliä (Tavira, Amarante, Chaves, Estremoz, Vila Viçosa), koska niiden merkitys on
  kohde (silta, palatsi, marmori), ei kaupunki.
- Tyypit ovat pelin oma `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / meri / saari / jarvi; muut
  historia, kulttuuri, ruoka, kauppa, tekniikka).

## Lista

### Luonto (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-peneda-geres | Peneda-Gerês | vuori | 41,7247 / −8,1628 | Peneda-Gerês National Park | Portugalin ainoa kansallispuisto, jossa vuoret, graniittikalliot ja vanhat tammimetsät kohtaavat. |
| 2 | hahmotelma-ria-formosa | Ria Formosa | meri | 36,9976 / −7,8609 | Ria Formosa | Algarven rannikon laguuni- ja hiekkasaaristo, jossa kalastetaan ja jossa lintuja lepää muuttomatkalla. |
| 3 | hahmotelma-arrabida | Arrábidan vuoret | vuori | 38,4814 / −8,9892 | Arrábida Natural Park | Välimerellinen kalkkikivivuoristo, joka putoaa jyrkästi Atlantille Setúbalin lahden kohdalla. |
| 4 | hahmotelma-ponta-da-piedade | Ponta da Piedade | meri | 37,081 / −8,67 | Ponta da Piedade | Algarven kultaiset kalliomuodostelmat ja luolat Lagosin edustalla. |
| 5 | hahmotelma-berlengas | Berlengasin saaret | saari | 39,45 / −9,53 | Berlengas | Atlantin graniittisaaristo Peniche-niemen edustalla, jossa on linnoitus ja lintujen pesimäkallioita. |
| 6 | hahmotelma-pico | Pico (Azorit) | vuori | 38,4689 / −28,3989 | Mount Pico | Portugalin korkein vuori, 2 351 m, Azorien tulivuori keskellä Atlanttia. |
| 7 | hahmotelma-pico-ruivo | Pico Ruivo (Madeira) | vuori | 32,7586 / −16,9422 | Pico Ruivo | Madeiran korkein huippu (1 862 m), jonne kulkee reitti laurisilva-metsän läpi. |

### Historia (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 8 | hahmotelma-monsanto | Monsanto | historia | 40,039 / −7,114 | Monsanto (Idanha-a-Nova) | Kylä, jonka talot on rakennettu jättimäisten lohkareiden väliin ja jota on kutsuttu Portugalin "portugalisimmaksi kyläksi". |
| 9 | hahmotelma-marvao | Marvão | historia | 39,3942 / −7,3768 | Marvão | Vuorenhuipun linnoituskylä Espanjan rajalla, jonka muurit pitävät yhä. |
| 10 | hahmotelma-mertola | Mértola | historia | 37,6403 / −7,6611 | Mértola | Guadianan jokisatama, jossa roomalais-, mauri- ja kristillinen historia kerrostuvat. |
| 11 | hahmotelma-foz-coa | Côa-laakson kalliopiirrokset | historia | 41,08 / −7,14 | Vila Nova de Foz Côa | Kymmenien tuhansien vuosien ikäisiä kalliopiirroksia, joiden takia padon rakentaminen keskeytettiin. |
| 12 | hahmotelma-castelo-rodrigo | Castelo Rodrigo | historia | 40,8774 / −6,9643 | Castle of Castelo Rodrigo | Rajakylä vuorella, jonka linnan ja muurin Portugali ja Kastilia ovat vuorotellen vallanneet. |
| 13 | hahmotelma-castelo-de-vide | Castelo de Vide | historia | 39,3333 / −7,5167 | Castelo de Vide | Muurien ympäröimä kylä, jonka juutalaiskortteli on yksi Portugalin vanhimmista. |
| 14 | hahmotelma-belmonte | Belmonte | historia | 40,35 / −7,35 | Belmonte, Portugal | Pedro Álvares Cabralin, Brasilian löytäjän, kotikylä ja vanhan juutalaisyhteisön paikka. |

### Kulttuuri ja ruoka (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 15 | hahmotelma-monsaraz | Monsaraz | kulttuuri | 38,444 / −7,381 | Monsaraz | Alentejon kukkulakylä, jonka linnasta näkee Guadianan laaksoon. |
| 16 | hahmotelma-ponte-de-lima | Ponte de Lima | ruoka | 41,7667 / −8,5667 | Ponte de Lima | Portugalin vanhimpia kaupunkeja, joka on tunnettu roomalaisesta sillastaan ja Vinho Verde -viinialueestaan. |
| 17 | hahmotelma-vila-vicosa | Vila Viçosa | kulttuuri | 38,7764 / −7,4181 | Vila Viçosa | Braganzan herttuoiden palatsikaupunki ja marmorin kotiseutu. |
| 18 | hahmotelma-tavira | Tavira | kulttuuri | 37,1167 / −7,65 | Tavira | Algarven kalastajakaupunki, jonka roomalainen silta ylittää Gilão-joen. |
| 19 | hahmotelma-amarante | Amarante | kulttuuri | 41,2703 / −8,0808 | Amarante, Portugal | Tâmega-joen kaupunki, jonka São Gonçalon silta on ollut jokiylityksenä vuosisatoja. |
| 20 | hahmotelma-chaves | Chaves | kulttuuri | 41,7406 / −7,4714 | Chaves, Portugal | Roomalaisen sillan ja kuumien lähteiden kaupunki Tâmegan laaksossa. |

### Kauppa ja tekniikka (5)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 21 | hahmotelma-sao-domingos | São Domingosin kaivos | tekniikka | 37,6689 / −7,4939 | São Domingos Mine | Brittiläisten 1850-luvulla avaama kuparikaivos ja rautatie Guadianan satamaan. |
| 22 | hahmotelma-castro-marim | Castro Marimin suola-altaat | kauppa | 37,2167 / −7,45 | Castro Marim | Algarven idän suolasoita, joista suolaa on kerätty vuosisatoja. |
| 23 | hahmotelma-rio-maior | Rio Maiorin suolanotto | kauppa | 39,3333 / −8,9333 | Rio Maior | Sisämaan suolakaivo, jossa suola tulee maan alta kaivetuista lähteistä. |
| 24 | hahmotelma-panasqueira | Panasqueiran kaivos | tekniikka | 40,15 / −7,75 | Panasqueira | Wolframi- ja tinamalmin kaivos Serra da Estrelan juurella. |
| 25 | hahmotelma-estremoz | Estremozin marmori | kauppa | 38,85 / −7,5833 | Estremoz | Alentejon marmorikaupunki, jonka louhoksista kivi lähtee eri puolille maailmaa. |

### Skandaalit ja hetket (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 26 | hahmotelma-torres-vedras | Torres Vedrasin linjat | historia | 39,0833 / −9,2667 | Torres Vedras | Wellingtonin rakennuttamat linnoituslinjat 1809–1810, jotka pysäyttivät Napoleonin joukot. |
| 27 | hahmotelma-vimeiro | Vimeiron taistelu | historia | 39,1761 / −9,3158 | Battle of Vimeiro | Britannian ja Portugalin voitto Ranskasta elokuussa 1808. |
| 28 | hahmotelma-almeida | Almeidan linnoitus | historia | 40,7167 / −6,9 | Almeida, Portugal | Tähtimuotoinen rajalinnoitus, joka räjähti ranskalaisten piirityksessä 1810. |
| 29 | hahmotelma-peniche | Penichen linnoitus | historia | 39,3542 / −9,3798 | Peniche Fortress | Linnoitus, jossa oli 1900-luvulla poliittisten vankien vankila. |

## Huomiot Fablelle

1. **Azorit ja Madeira** (Fablen pyynnöstä yksi kummastakin): Pico (Azorit) on 630,5 ja Pico Ruivo
   (Madeira) 309,9 lautayksikköä PRT-renkaan ulkopuolella, ja `osuuLehteen('PRT')` on molemmilla **false** —
   ne eivät osu Portugalin fokuslehden rajaukseen. Maastokohde-työkalu jättäisi ne pois ("ikkunan
   ulkopuolinen merkki olisi olemassa mutta pelaajan ulottumattomissa", maastokohteet-esp.js Teide).
   Jos haluat, että jokainen nosto on pelaajan ulottuvilla, pudotan ne ja korvaan sisämaan kohteilla
   (esim. Sabugal, Serra do Marão, Viseu-alueen kylä); muuten kirjoitan ne ja merkitsen raportissa.
2. **Muut renkaan ulkopuoliset**: Ria Formosa 0,9, Arrábida 0,6, Ponta da Piedade 1,4, Berlengas 6,4 ja
   Peniche 0,2 lautayksikköä renkaan ulkopuolella (rannikko/saaret, pieniä eroja renkaan karkeudesta).
3. **Lähekkäin nykyisiä**: Rio Maior – Óbidos 7,6, Peniche – Óbidos 7,4, Vila Viçosa – Elvas 9,6,
   Vimeiro – Óbidos 8,9, Belmonte – Torre 8,8 lautayksikköä. Kaikki yli 7, mutta merkit voivat törmätä
   lähizoomissa.
4. **1873:n jälkeiset**: São Domingos (kaivos 1858–1966, osa ennen), Peniche (vankila 1934–1974),
   Panasqueira (kaivos 1896 alkaen); nappi-alaotsikko 1873-näkökulmasta ("tänne nousee myöhemmin…").
5. **Kuvariskit**: Côa-laakson kalliopiirrokset (vain museo- ja laaksokuvia), Panasqueira ja Rio Maior;
   jätän pois ja korvaan sisämaan kohteella (Sabugal, Vila Nova de Cerveira, Bragança-alueen kylä), jos kahta
   kelvollista kuvaa ei löydy, niin että 29 säilyy.
6. **Miksi-virkkeet** on kirjoitettu muistista listaa varten ja tarkistetaan Wikipedian tekstistä vaiheessa 2;
   vaiheessa 2 tekstit kirjoitetaan vain artikkelien pohjalta.

Odotan hyväksyntää (tai muutoksia) ennen vaihetta 2.
