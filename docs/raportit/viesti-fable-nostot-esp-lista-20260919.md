# Viesti Fablelle: Espanjan hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara
`sonnet-nostot-esp`. **29 ehdotusta, odotan hyväksyntää ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`,
  19.9.2026); artikkeli kirjattu taulukkoon. Yhtään lukua ei ole arvattu.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla
  (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('ESP')`): **29/29
  osuu Espanjan fokuslehteen**.
- Etäisyys Espanjan pelikaupunkeihin (Madrid, Barcelona, Granada, Sevilla)
  laskettu pääkartan laudalla: lähin on Aranjuez 15,0 (Madrid) ja El Escorial
  16,5 (Madrid), raja `KAUPUNGIN_KOHDALLA_SADE` on 7 — yksikään ei ole
  kaupungin kohdalla.
- Ei päällekkäisyyksiä: verrattu `nostojenKarttapaikat()`-tulosteeseen (ESP:n
  40 nykyistä nostoa: 13 maasto-/kohdepakkia, 9 syvennystä, 3 skandaalia,
  8 aihenostoa, 4 hetkeä ja Doñana-syvennys). Ei kaupunkeja; Alhambra,
  Sagrada Família, Prado, Guggenheim, Valencia, Bilbao, Burgos ym. jätetty pois.
- Ei merellä: kaikki 29 ovat mantereella (Finisterre on niemen kärki, ks.
  huomio alla). Kanariansaaret ja Baleaarit jätetty pois (fokuslehden ikkuna).
- Tyyppi on pelin oma `KOHDE_TYYPPISYMBOLIT`-taulun arvo (luonto = vuori /
  meri / joki / jarvi; muut historia, kulttuuri, ruoka, tekniikka, kauppa).

## Lista

### Luonto (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-picos-de-europa | Picos de Europa | vuori | 43,2 / −4,8 | Picos de Europa | Atlantin vuoret, joiden kalkkikivihuiput näkyvät merelle asti — Espanjan ensimmäinen kansallispuisto. |
| 2 | hahmotelma-cabo-de-finisterre | Finisterren niemi | meri | 42,8825 / −9,2722 | Cape Finisterre | Roomalaisten mielestä maailman pää, jonne Jaakobin tien pyhiinvaeltajat jatkavat Santiagosta. |
| 3 | hahmotelma-bardenas-reales | Bardenas Reales | vuori | 42,1908 / −1,47 | Bardenas Reales | Navarran puoliaavikko savi- ja hiekkakivikielekkeineen, oikea kuivan Espanjan maisema. |
| 4 | hahmotelma-tablas-de-daimiel | Tablas de Daimiel | jarvi | 39,15 / −3,6667 | Tablas de Daimiel National Park | La Manchan kosteikko, jossa Guadianan ja Cigüelan vedet leviävät matalaksi järvimaisemaksi. |
| 5 | hahmotelma-sierra-de-gredos | Sierra de Gredos | vuori | 40,3 / −5,0833 | Sierra de Gredos | Kastilian selkä, graniittivuoristo, jonka jäätikköjärvet ja Almanzor-huippu erottavat pohjois- ja etelälaakson. |
| 6 | hahmotelma-tabernas | Tabernasin autiomaa | vuori | 37,0 / −2,45 | Tabernas Desert | Euroopan harvoja aavikoita, jonka hiekka ja rotkot palvelivat myöhemmin länkkäreiden kulissina. |
| 7 | hahmotelma-sierra-de-cazorla | Sierra de Cazorla | vuori | 37,9367 / −2,9583 | Sierra de Cazorla | Vuoristo, josta Guadalquivir-joki saa alkunsa ja jonne mäntymetsät peittävät rotkot. |

### Historia (7)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 8 | hahmotelma-atapuerca | Atapuerca | historia | 42,3667 / −3,5222 | Atapuerca Mountains | Luolat, joista on löytynyt Euroopan vanhimpia ihmisen jäännöksiä lähes miljoonan vuoden takaa. |
| 9 | hahmotelma-covadonga | Covadonga | historia | 43,3089 / −5,0556 | Battle of Covadonga | Paikka, jossa Pelayo pysäytti maurit noin 722 ja Reconquistan taru alkoi. |
| 10 | hahmotelma-roncesvalles | Roncesvalles | historia | 43,0092 / −1,32 | Roncesvalles | Pyreneiden solan luostari, jonka lähellä taistelu 778 synnytti Rolandin laulun ja josta pyhiinvaellus lähtee. |
| 11 | hahmotelma-numancia | Numancia | historia | 41,8096 / −2,4443 | Numantia | Keltiberien kaupunki, joka piti Roomaa vastaan vuosia ja valitsi lopulta tuhon antautumisen sijaan (133 eaa). |
| 12 | hahmotelma-trujillo | Trujillo | historia | 39,4653 / −5,8788 | Trujillo, Spain | Extremadura-kaupunki, josta Pizarro ja monet muut conquistadorit lähtivät Amerikkaan. |
| 13 | hahmotelma-el-escorial | El Escorial | historia | 40,59 / −4,15 | El Escorial | Filip II:n luostarilinna Guadarraman juurella — kuningaskunnan hautakirkko, kirjasto ja hovi samassa kivipaadessa. |
| 14 | hahmotelma-yuste | Yusten luostari | historia | 40,1142 / −5,7389 | Monastery of Yuste | Paikka, jonne keisari Kaarle V vetäytyi luopuessaan vallasta ja jossa hän kuoli 1558. |

### Kulttuuri ja ruoka (6)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 15 | hahmotelma-campo-de-criptana | Campo de Criptanan tuulimyllyt | kulttuuri | 39,4 / −3,1167 | Campo de Criptana | Myllyt, joita Don Quijoten kerrotaan luulleen jättiläisiksi. |
| 16 | hahmotelma-albufera | Albufera | ruoka | 39,3317 / −0,3522 | Albufera de Valencia | Riisipeltojen laguuni, jonka ympäriltä paellan kerrotaan lähteneen. |
| 17 | hahmotelma-la-tomatina | La Tomatina, Buñol | ruoka | 39,4194 / −0,7906 | La Tomatina | Kylä, jossa tomaatteja heitetään toisia päin joka elokuu (vuodesta 1945). |
| 18 | hahmotelma-rioja-haro | Rioja ja Haro | ruoka | 42,5833 / −2,85 | Haro, La Rioja | Espanjan viinialue, joka nousi 1800-luvun lopulla, kun Ranskan viinitarhat kärsivät filoksera-tuhosta. |
| 19 | hahmotelma-jabugo | Jabugo | ruoka | 37,9167 / −6,7333 | Jabugo | Sierra de Aracenan kylä, jonka tammikaurilla ruokitut siat antavat ibérico-kinkun. |
| 20 | hahmotelma-ronda | Ronda | kulttuuri | 36,7372 / −5,1647 | Ronda | Rotkon reunan kylä, jossa härkätaistelun nykyinen muoto ja bandoleron romantiikka syntyivät. |

### Kauppa ja tekniikka (5)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 21 | hahmotelma-riotinto | Riotinton kaivokset | tekniikka | 37,7033 / −6,6028 | Corta Atalaya (artikkeli: Riotinto-Nerva mining basin) | Vuosituhansien kuparikaivos, jonka brittiyhtiö osti juuri 1873 — vuosi, jona kaivos alkoi vaikuttaa maailmankauppaan. |
| 22 | hahmotelma-almaden | Almadén | kauppa | 38,7764 / −4,8369 | Almadén | Maailman suurin elohopeakaivos, jonka hopeanhuuhtoja tarvitsivat Amerikassa. |
| 23 | hahmotelma-vizcayan-silta | Vizcayan silta | tekniikka | 43,3231 / −3,0169 | Vizcaya Bridge | Maailman ensimmäinen kuljetussilta 1893, riippuva lautta ylittää Nervión-joen. |
| 24 | hahmotelma-alcantaran-silta | Alcántaran silta | tekniikka | 39,7224 / −6,8924 | Alcántara Bridge | Roomalainen kivisilta Tejon yllä, valmistunut 106 jaa ja yhä pystyssä. |
| 25 | hahmotelma-canal-de-castilla | Kastilian kanava | tekniikka | 41,7494 / −4,6469 | Canal de Castilla | 1700-luvun kanava, jolla viljaa vietiin Kastilian lakeuksilta merelle. |

### Skandaalit ja hetket (4)

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 26 | hahmotelma-gernikako-arbola | Guernican tammi | historia | 43,3147 / −2,6798 | Tree of Gernika (Gernikako Arbola) | Baskien pyhä tammi, jonka alla lupaus alueen vanhoista oikeuksista vannottiin — ja jonka takia karlistisota 1872–76 käytiin. |
| 27 | hahmotelma-tordesillas | Tordesillas | historia | 41,5 / −5,0 | Tordesillas | Kaupunki, jossa Espanja ja Portugali jakoivat maailman sopimuksella 1494. |
| 28 | hahmotelma-aranjuez | Aranjuez | historia | 40,0333 / −3,6028 | Aranjuez | Kuninkaallisten puutarhojen kaupunki, jossa kansa kaatoi ministeri Godoyn maaliskuussa 1808. |
| 29 | hahmotelma-poblet | Pobletin luostari | historia | 41,3808 / 1,0825 | Poblet Abbey | Katalonian suurin sisterssiläisluostari, joka ryöstettiin ja poltettiin 1835. |

## Huomiot Fablelle

1. **Luontotyypit**: pelin taulussa ei ole aavikko- tai niemityyppiä.
   Bardenas Reales ja Tabernas on merkitty `vuori` (luontosymboli), Finisterre
   `meri`, Tablas de Daimiel `jarvi`. Jos haluat toisin (esim. `kulttuuri`
   Tabernasille länkkäreiden vuoksi), sano.
2. **Ei koordinaattia en-Wikipediassa**: Las Navas de Tolosan taistelu ja
   Tordesillasin sopimus (jälkimmäiselle käytetty Tordesillasin kaupungin
   piste). Las Navas jätettiin pois. Riotinto: kaivosaltaan artikkelilla ei
   ole pistettä, joten piste on Corta Atalaya -avolouhoksen (en-Wikipedia).
3. **Läheisyys keskenään**: Picos de Europa (#1) ja Covadonga (#9) ovat n. 9
   lautayksikön päässä toisistaan, Vizcayan silta (#23) ja Guernica (#26)
   11 yksikköä. Jos haluat harvemman, pudotan Covadongan tai Picosin.
4. **Näkökulma**: 1873 (kolmas karlistisota, ensimmäinen tasavalta,
   Riotinton osto) sopii Guernicalle, Riotintolle, Rondalle ja Rioja-
   viinille; muille nappi-alaotsikko on nykyaikainen pulun 1873-katse
   ("kuten matkailija näkisi sen 1873").
5. **Kuvat**: jokaiselle 2+ Commons-kuvaa ennakkoarvio on hyvä (kaikki ovat
   valokuvattuja Unesco-/luontokohteita), mutta Numancia, Almadén ja
   Tordesillas ovat riskikohteita — jätän pois, jos kahta kelvollista ei löydy.
6. Tavoite 25–30: ehdotan 29, joista 25–27 saataisiin, jos jokin kuvitus
   pettää.

Odotan hyväksyntää (tai muutoksia) ennen vaihetta 2.
