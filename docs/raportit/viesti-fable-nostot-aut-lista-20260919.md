# Viesti Fablelle: Itävallan hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-aut`
(pohja origin/main 88f43233, v1956). **29 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli
  taulukossa. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs`
  `laudat`, `osuuLehteen('AUT')`): **29/29 osuu Itävallan fokuslehteen**.
- Itävallan ainoa pelikaupunki on Wien. Etäisyys pääkartan laudalla: lähimmät ehdotukset ovat
  Kreuzenstein 8,2, Heiligenkreuz 10,8 ja Mayerling 11,9; raja `KAUPUNGIN_KOHDALLA_SADE` on 7, joten
  yksikään ei ole kaupungin kohdalla.
- Päällekkäisyys: verrattu `nostojenKarttapaikat()`-tulosteeseen (AUT:n 29 nykyistä nostoa) ja
  maastokohteet-aut.js:n kohteisiin. Nykyisiä ovat mm. Großglockner, Wildspitze, Tonava, Inn, Hallstatt,
  Melkin luostari, Hohensalzburg, Semmeringin rata, Mauthausen, Dürnstein, Carnuntum, Eisriesenwelt,
  Erzberg (Eisenerz), Bregenzin järvinäyttämö, Krimmlin vesiputoukset sekä Wienin nostot (mm. Maailmannäyttely 1873,
  jota ei nosteta). Hylätty päällekkäisyyden takia (alle 7 lautayksikköä nykyisestä merkistä): Gesäuse (5,4
  Erzbergistä), Achensee (5,8 Innistä), Schwaz (2,7 Innistä), Hallein (5,1 Hohensalzburgista), Rax (5,1 Semmeringistä),
  Klosterneuburg (5,2 Wienistä), Wagram (6,5 Wienin syvennyksestä), Grundlsee (6,9 Hallstattista) ja Altaussee.
  **Bad Ischl on 6,7 lautayksikön päässä Hallstattista** (Fablen ehdottama); mukana, koska kaupunkiraja koskee vain
  kaupunkeja. Muut ehdotukset ovat ≥ 7,1 lautayksikön päässä nykyisistä merkeistä.
- Ei kaupunkeja: Wien, Graz, Linz, Salzburg, Innsbruck, Klagenfurt, St. Pölten, Bregenz jne. jätetty pois. Mukana
  pieniä kaupunkeja ja kyliä (Steyr, Eisenstadt, Lienz, Bad Ischl, Kitzbühel, Gmunden, Hall in Tirol, Ferlach), koska
  niiden merkitys on kohde (aseet, suola, Haydn), ei kaupunki.
- Tyypit ovat pelin oma `KOHDE_TYYPPISYMBOLIT`-taulun arvot (luonto = vuori / jarvi; muut historia, kulttuuri,
  ruoka, kauppa, tekniikka).
- Ei saaria eikä rannikkoa, joten yksikään ei ole meressä; renkaan ulkopuolisia ei ole, tarkempi etäisyys huomiossa 1.

## Lista

### Luonto (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-neusiedl | Neusiedlinjärvi | jarvi | 47,8333 / 16,75 | Lake Neusiedl | Keski-Euroopan suurin arojärvi, matala ja suolainen, Unkarin rajalla. |
| 2 | hahmotelma-woerthersee | Wörthersee | jarvi | 46,625 / 14,15 | Wörthersee | Kärntenin suurin järvi, jonka rannoille kohoaa 1800-luvun huviloita. |
| 3 | hahmotelma-traunsee | Traunsee | jarvi | 47,8667 / 13,8 | Traunsee | Salzkammergutin syvä alppijärvi, jonka rannalla kohoaa Traunstein. |
| 4 | hahmotelma-zell-am-see | Zell am See | jarvi | 47,3167 / 12,8 | Zell am See | Salzburgin Pinzgaun alppijärvi, jonka rannalla on Kitzsteinhorn-vuori. |
| 5 | hahmotelma-millstatt | Millstätter See | jarvi | 46,795 / 13,5798 | Millstätter See | Kärntenin syvä alppijärvi ja Millstattin luostarin seutu. |
| 6 | hahmotelma-oetscher | Ötscher | vuori | 47,8558 / 15,2028 | Ötscher | Ala-Itävallan korkeimpiin kuuluva kalkkialppien huippu lähellä Mariazellia. |
| 7 | hahmotelma-grossvenediger | Großvenediger | vuori | 47,1094 / 12,3455 | Großvenediger | Hohe Tauernin jäätikkövuori, Itävallan neljänneksi korkein. |

### Historia (8)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 8 | hahmotelma-mariazell | Mariazell | historia | 47,7731 / 15,3164 | Mariazell | Keski-Euroopan tärkein pyhiinvaelluskohde Neitsyt Marian kuvan luona. |
| 9 | hahmotelma-heiligenkreuz | Heiligenkreuzin luostari | historia | 48,0551 / 16,1312 | Heiligenkreuz Abbey | Wienin metsän sisterssiläisluostari vuodelta 1133, joka toimii yhä. |
| 10 | hahmotelma-kremsmuenster | Kremsmünsterin luostari | historia | 48,055 / 14,1306 | Kremsmünster Abbey | Benediktiiniluostari vuodelta 777, jonka tähtitorni ("Mathematischer Turm") on Euroopan vanhimpia. |
| 11 | hahmotelma-admont | Admontin luostari | historia | 47,5731 / 14,4611 | Admont | Maailman suurin luostarikirjasto Gesäusen kynnyksellä. |
| 12 | hahmotelma-hochosterwitz | Hochosterwitz | historia | 46,755 / 14,4536 | Hochosterwitz Castle | Kärntenin kalliolla oleva linna, jonka 14 porttia nousevat kukkulalle. |
| 13 | hahmotelma-riegersburg | Riegersburg | historia | 47,0047 / 15,9325 | Riegersburg Castle | Steiermarkin tulivuorikallion linnoitus, jota ei ole koskaan valloitettu. |
| 14 | hahmotelma-kreuzenstein | Burg Kreuzenstein | historia | 48,3792 / 16,3089 | Burg Kreuzenstein | Keskiaikaiseksi rakennettu linna Wienin pohjoispuolella, valmistunut 1874–1906. |
| 15 | hahmotelma-forchtenstein | Forchtenstein | historia | 47,7094 / 16,3308 | Forchtenstein Castle | Esterházyjen linnoitus Burgenlandissa, jossa on suvun aarrekammio. |

### Kulttuuri ja ruoka (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 16 | hahmotelma-bad-ischl | Bad Ischl | kulttuuri | 47,7203 / 13,6333 | Bad Ischl | Keisari Frans Joosefin kesäpaikka Salzkammergutissa ja suolakylpylä. |
| 17 | hahmotelma-gmunden | Gmunden | kulttuuri | 47,9181 / 13,7994 | Gmunden | Traunseen rannalla oleva keramiikkakaupunki ja Traunseen kaupunki. |
| 18 | hahmotelma-kitzbuehel | Kitzbühel | kulttuuri | 47,4464 / 12,3919 | Kitzbühel | Tirolin keskiaikainen kaivoskaupunki, josta tuli alppihiihdon kotipaikka. |
| 19 | hahmotelma-piber | Piber | ruoka | 47,0806 / 15,1003 | Piber Federal Stud | Lipizzanien valtion siitoslaitos Steiermarkissa. |
| 20 | hahmotelma-eisenstadt | Eisenstadt | kulttuuri | 47,85 / 16,5167 | Eisenstadt | Burgenlandin pääkaupunki, jossa Haydn palveli Esterházyjen hovissa. |
| 21 | hahmotelma-lienz | Lienz | kulttuuri | 46,8297 / 12,7697 | Lienz | Itä-Tirolin kaupunki Dolomiittien juurella, jossa Drau ja Isel kohtaavat. |
| 22 | hahmotelma-bregenzerwald | Bregenzerwald | kulttuuri | 47,2656 / 9,88 | Bregenz Forest | Vorarlbergin metsäinen vuorialue, jonka kylät ovat säilyttäneet puurakennukset. |

### Kauppa ja tekniikka (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 23 | hahmotelma-steyr | Steyr | tekniikka | 48,0333 / 14,4167 | Steyr | Rautateollisuuden ja aseidenvalmistuksen kaupunki, joka on kuuluisa Steyr-aseista. |
| 24 | hahmotelma-hall-in-tirol | Hall in Tirol | kauppa | 47,2833 / 11,5 | Hall in Tirol | Suolan ja rahapajan kaupunki Inn-joen varrella; talleri lyötiin täällä. |
| 25 | hahmotelma-ferlach | Ferlach | kauppa | 46,5333 / 14,3 | Ferlach | Kärntenin asesepät, jotka ovat tehneet metsästyskivääreitä yli 400 vuotta. |
| 26 | hahmotelma-st-anton | St. Anton am Arlberg | tekniikka | 47,1167 / 10,2667 | St. Anton am Arlberg | Arlbergin ratatunneli (1880–84) yhdistää Tirolin ja Vorarlbergin; kylä on hiihdon kehto. |

### Skandaalit ja hetket (3)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 27 | hahmotelma-oberndorf | Oberndorf | historia | 47,9417 / 12,9417 | Oberndorf bei Salzburg | Paikka, jossa Stille Nacht -joululaulu esitettiin ensimmäisen kerran 1818. |
| 28 | hahmotelma-mayerling | Mayerling | historia | 48,0469 / 16,0983 | Mayerling | Kruununprinssi Rudolfin metsästyshuvila, jossa hän kuoli 1889. |
| 29 | hahmotelma-bad-gastein | Bad Gastein | historia | 47,1 / 13,0167 | Bad Gastein | Itävallan ja Preussin Gasteinin sopimus 1865. |

## Huomiot Fablelle

1. **Etäisyys AUT-renkaaseen**: kaikki 29 ovat renkaan sisällä (Itävallassa ei ole saaria eikä rannikkoa). Renkaan reunaa lähimpänä
   ovat Oberndorf 1,2 (Saksan rajalla), Hallein-tyyppisiä hylättyjä ei ole mukana, Ferlach 3,9, Eisenstadt 4,3, Neusiedlinjärvi 5,4,
   St. Anton 5,7 ja Großvenediger 6,4; loput ovat yli 6,9. Tarkat luvut kirjataan raporttiin kohteittain.
2. **Bad Ischl 6,7 Hallstattista**: alle 7, mutta kohde on pyydetty ja kaupunkiraja koskee vain kaupunkeja; sano, jos haluat
   toisen (esim. Wolfgangsee).
3. **Läheiset nykyisiin**: Kreuzenstein – Klimtin maalaukset 7,2, Oberndorf – Hohensalzburg 7,1, Grossvenediger – Krimml 7,1,
   Mayerling – Shakkiturkkilainen 9,2, Hall – Inn 8,3; yli 7, mutta merkit voivat törmätä lähizoomissa.
4. **1873:n jälkeiset**: Mayerling (1889), Arlbergin rata (1884), Kreuzenstein (1874–1906), Kitzbühelin hiihto, Lipizzanit;
   nappi-alaotsikko 1873-näkökulmasta ("tänne nousee myöhemmin…"). Wienin maailmannäyttelyä ei nosteta.
5. **Kuvariskit**: Ferlach (asesepäkuvia ei ehkä löydy ilman ampuma-aseita — 13+), Steyr (Steyr-aseita), Hall in Tirol,
   Millstätter See; jätän pois ja korvaan kohteella (Wolfgangsee, Mondsee, Mürzzuschlag, Bad Aussee), jos kahta
   kelvollista kuvaa ei löydy.
6. "Miksi"-virkkeet on kirjoitettu muistista listaa varten ja tarkistetaan Wikipedian tekstistä vaiheessa 2;
   vaiheessa 2 tekstit kirjoitetaan vain artikkelien pohjalta, ja jos artikkeli ei tue väitettä, vaihdan kohteen ja kirjaan
   poikkeaman (sääntö Portugalista).

Odotan hyväksyntää (tai muutoksia) ennen vaihetta 2.
