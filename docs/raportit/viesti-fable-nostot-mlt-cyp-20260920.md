# Viesti Fablelle: Kyproksen ja Maltan hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 21.47 Suomen aikaa, Sonnet-sisältösessio "Matkakirja Sonnet nostot",
haara `sonnet-nostot-mlt-cyp` (pohja origin/main 39f1a2ee, v1965). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: KYPROS 11 nostoa (26 Commons-kuvaa, 10 rahavisaa), rekisteröity. MALTA 11 nostoa (23 Commons-kuvaa, 4 rahavisaa), valmis paketti, EI rekisteröity** (Fablen päätös 21.27: Malta ei ole vielä kartalla).

## Kypros (CYP)

Uusi tiedosto `js/packs/hahmotelma-cyp.js` (`HAHMOTELMA_CYP`). Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.CYP`), `sw.js` SHELL, `tools/build-standalone.mjs`; rivit ovat hahmotelma-svk-rivien jälkeen.
**Liitosjärjestys on tarkoituksellinen**: `KOHDE_MAAT.CYP = [...HAHMOTELMA_CYP, ...(KOHDE_MAAT.CYP ?? [])]` (uudet ENNEN nykyisiä) ja HAHMOTELMA_CYP:n sisäinen järjestys on valittu koneellisesti. Syy: nimiöladonta (`tests/nimiolimitys.test.mjs`) on järjestysriippuvainen, ja Kyproksen nykyiset nimiöt (Khirokitia, Asinou, Kykkos, skandaalit) ovat ahtaassa ryppäässä: nykyisten perään liitettynä mikä tahansa läntinen tai eteläinen uusi nosto (Akamas, Polis, Soli, Stavrovouni, Chrysorrogiatissa, Morphou) tuotti 1–3 nimiölimitystä nykyisten välille, vaikka uudet nimiöt eivät limittyneet mihinkään; pohjoisen viisi (Kyrenia, Kantara, Karpaasi, Kormakitis, Lapithos) meni läpi millä tahansa järjestyksellä. `nimio`-kenttä ei auttanut (nimien lyhentäminen ei muuttanut tulosta). Kommentti js/fokuskohteet.js:n blokissa selittää asian; jos järjestystä muutetaan, aja testi.

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys CYP-renkaan reunaan (lautayks.) |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| kormakitis | Kormakitis | kulttuuri | 826 | 2 | muffinn, HFrankDM | CC BY 2.0, CC BY-SA 4.0 | 7.3 (ulkopuolella) |
| karpas | Karpaasin niemimaa | vuori | 731 | 2 | Michal Klajban | CC BY-SA 4.0 | 19.7 (ulkopuolella) |
| akamas | Akamas | vuori | 653 | 3 | Michal Klajban, Krzysztof Ziarnek, Kenraiz | CC BY-SA 4.0 | 1.1 |
| chrysorrogiatissa | Chrysorrogiatissa | kulttuuri | 520 | 2 | Gerda Arendt, Rüdiger Stehn from Kiel, Deutschland | CC0, CC BY-SA 2.0 | 7.4 |
| soli | Soli | historia | 809 | 3 | ToprakM, Monoskolaggi | CC BY-SA 4.0 | 0.2 (ulkopuolella) |
| stavrovouni | Stavrovounin luostari | historia | 807 | 2 | Zairon | CC BY-SA 4.0 | 2.6 |
| kantara | Kantaran linna | historia | 796 | 2 | Berkeakyuz, George Groutas | CC BY-SA 4.0, CC BY 2.0 | 11.7 (ulkopuolella) |
| lapithos | Lapithos | historia | 924 | 3 | Adam Jones from Kelowna, BC, Canada, muffinn | CC BY-SA 2.0, CC BY 2.0 | 5.6 (ulkopuolella) |
| morphou | Morphou | ruoka | 698 | 3 | Xxlstier, ToprakM | CC BY-SA 4.0 | 2.5 (ulkopuolella) |
| polis | Polis | kulttuuri | 926 | 2 | Georgy Papantoniou, Paul Lakin | CC BY 3.0 | 2.1 |
| kyrenia | Kyrenia | historia | 830 | 2 | Zairon, DaenielN | CC BY-SA 4.0 | 6.2 (ulkopuolella) |

Kuvia yhteensä 26; lisenssijakauma: CC BY-SA 4.0 17, CC BY 2.0 4, CC BY-SA 2.0 2, CC BY 3.0 2, CC0 1.

**Rahavisat (10; oikea-indeksit 3,2,1,2,3,1,2,0,3,1)**

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| kormakitis | kulttuuri | Minkä kielen omaa muotoa Kormakitisin maroniitit perinteisesti puhuvat? | Arabiaa (3) |
| akamas | vuori | Minkä sankarin poika Akamas oli, jonka mukaan niemi on nimetty? | Theseuksen (2) |
| chrysorrogiatissa | kulttuuri | Minä vuonna Chrysorrogiatissan nykyinen rakennus on peräisin? | 1770 (1) |
| soli | historia | Kenen kerrotaan perimätiedon mukaan antaneen Solille nimen ja asemakaavan? | Solon (2) |
| stavrovouni | historia | Mitä nimi Stavrovouni tarkoittaa? | Ristin vuori (3) |
| kantara | historia | Mitä sana kandak tarkoittaa, josta Kantaran nimi johtuu? | Kivisilta (1) |
| lapithos | historia | Mitä nimi Lambousa tarkoittaa, jota Lapithos kantoi Rooman aikana? | Loistava (2) |
| morphou | ruoka | Mistä hedelmästä Morphou on kuuluisa? | Appelsiineista (0) |
| polis | kulttuuri | Mitä kreikan sana polis tarkoittaa? | Kaupunki (3) |
| kyrenia | historia | Kuka laajensi Kyrenian linnan nykyiseen asuunsa vuonna 1540? | Venetsialaiset (1) |

| Mittari (Kypros) | Tulos |
| --- | --- |
| Teksti ≥ 200 merkkiä, `lahde`, 2 kysymystä, korostukset tekstissä | 11/11 (teksti 520–926 merkkiä; Chrysorrogiatissan artikkeli on lyhyt, 705 merkkiä, teksti 520 merkkiä) |
| ≥ 2 kuvaa | 11/11 (kolme kuvaa: Akamas, Lapithos, Soli, Morphou) |
| Lisenssit | 26/26 sallittuja; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** |
| Kuvatiedostot olemassa, sha256 = tiedostonimen tunniste | 26/26 |
| Fokuslehden rajaus (`osuuLehteen('CYP')`) | 11/11 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 11/11 pääkartalla, `kaupunginKohdalla` = null |
| Etäisyys nykyisiin 13 CYP-nostoon | pienin Stavrovouni – Khirokitia 4,5; Chrysorrogiatissa – Kykkos 5,0, Morphou – Asinou 5,0, Soli – Kykkos 6,3; muut ≥ 9,1 |
| Etäisyys Nikosian merkkiin | ≥ 7,1 (Kyrenia); muut ≥ 9,2 |
| Nostot keskenään | ≥ 3,7 (Akamas – Polis) |
| Visat: kova sääntö (≤ 40 merkkiä, kysymys ≤ 95, ei "-malla", oikea ei selvästi pisin) | 10/10 (`tarkista-visakieli`-logiikka: 0 kovaa, 0 pehmeää) |

**Poikkeamat (Kypros)**
1. **Politiikka**: en-artikkelit Kyrenia, Polis, Soli, Kormakitis, Morphou, Karpas ja Lapithos sisältävät vuosien 1963–1974 tapahtumia ja nykyhallintoa; teksteissä on vain historia ja luonto (ei väestönsiirtoja, ei nykyhallintoa). Kuvissa ei ole lippuja (Kyrenian FAL-kuvat ja lippukuvat hylätty, Morphoun METU-kuva hylätty punaisen lipun vuoksi).
2. **Tyypit** listan mukaan (Polis `kulttuuri`, Karpaasi `vuori`, Kormakitis `kulttuuri`).
3. **Kuvat**: Polisin muinaisista raunioista (Marion) ei löytynyt sopivaa kuvaa (arkistokuvissa ihmisiä/hautakaivauksia), joten Polisilla on rantamaisema (auringonlasku) ja katukuva (pieni selin oleva ihmisryhmä); Morphoun sitrustarhoille ei löytynyt kuvaa: Pyhän Mamaksen kirkko, tasanko ja kivirelief; Soli: teatteri, Vounin palatsin ilmakuva ja rauniot katoksen alla. Lapithoksen kylänäkymässä näkyy minareetti kirkon tornin vieressä (historiallinen kuva kylästä).
4. **1873-näkökulma**: nappi-alaotsikot: Kyrenia (osmanien satamakaupunki), Kantara (linna autioitui 1525), Polis (kreikkalaiset ja turkkilaiset rinnakkain), Stavrovouni, Chrysorrogiatissa (nykyinen rakennus 1770), Soli (kaivaukset vasta 1927), Karpaasi (aasit), Kormakitis (maroniitit), Lapithos, Morphou (sitrus/pellava). Britit tulevat vasta 1878.

## Malta (MLT) — valmis paketti, ei rekisteröity

Paketti on tiedostossa `tools/odottavat-paketit/hahmotelma-mlt.js` (`HAHMOTELMA_MLT`), **EI `js/packs/`-kansiossa**: `tests/sw.test.mjs` ("kaikki js-moduulit ovat SHELLissä") ja `tests/...` (yhden tiedoston versio niputtaa kaikki karttapaketit) vaativat jokaisen js/-moduulin SHELLiin ja niputukseen, ja Fablen päätös oli olla rekisteröimättä. Ei KOHDE_MAAT.MLT:iä, ei sw.js- eikä build-standalone-riviä. Rekisteröintiohje on tiedoston alkukommentissa: (0) `git mv tools/odottavat-paketit/hahmotelma-mlt.js js/packs/hahmotelma-mlt.js`, (1) import + `KOHDE_MAAT.MLT` js/fokuskohteet.js:ään, (2) rivi sw.js SHELLiin ja tools/build-standalone.mjs:ään, (3) aja `node tools/tarkista-nostopaikat.mjs` ja testit; nimiölimitys ratkaistaan tarvittaessa `nimio`-kentällä ja HAHMOTELMA_MLT:n järjestyksellä.

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys renkaaseen |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| valletta | Valletta | historia | 780 | 2 | Frank Vincentz, Diego Delso | CC BY-SA 3.0, CC BY-SA 4.0 | – |
| mdina | Mdina | historia | 776 | 3 | Joseolgon, Godwin Borg, Diego Delso | CC BY 4.0, CC BY-SA 4.0 | – |
| hagar-qim | Ħaġar Qim | historia | 860 | 2 | Simon Burchell, Berthold Werner | CC BY-SA 4.0, CC BY-SA 3.0 | – |
| ggantija | Ġgantija | historia | 897 | 2 | Diego Delso | CC BY-SA 4.0 | – |
| marsaxlokk | Marsaxlokk | merenkulku | 557 | 2 | Diego Delso, MarcScic | CC BY-SA 4.0 | – |
| comino | Comino | saari | 732 | 2 | Frank Vincentz, Matthew Benn | CC BY-SA 3.0, CC BY-SA 4.0 | – |
| dingli | Dinglin kalliot | vuori | 729 | 2 | Christian Formosa, V. Epiney | CC BY-SA 4.0, CC BY-SA 2.0 | – |
| mosta | Mostan rotunda | historia | 830 | 2 | Diego Delso, Simon Burchell | CC BY-SA 4.0 | – |
| hypogeum | Ħal Saflieni | historia | 686 | 2 | xiquinhosilva, Ethan Doyle White | CC BY 2.0, CC BY-SA 4.0 | – |
| ta-pinu | Ta’ Pinu | kulttuuri | 847 | 2 | StefanM76, Simon Burchell | CC BY-SA 4.0 | – |
| birgu | Vittoriosa (Birgu) | historia | 736 | 2 | MrPanyGoff, Edelmauswaldgeist | CC BY-SA 3.0, CC0 | – |

Kuvia yhteensä 23; lisenssijakauma: CC BY-SA 4.0 15, CC BY-SA 3.0 4, CC BY 4.0 1, CC BY-SA 2.0 1, CC BY 2.0 1, CC0 1.

**Rahavisat (4; oikea-indeksit 1,2,0,3)**

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| valletta | historia | Kenen mukaan Valletta on nimetty? | Suurmestari Valette (1) |
| hagar-qim | historia | Minä vuonna Unesco hyväksyi Ħaġar Qimin maailmanperintökohteeksi? | 1992 (2) |
| ggantija | historia | Mitä nimi Ġgantija tarkoittaa? | Jättiläisten paikka (0) |
| marsaxlokk | merenkulku | Mitä sana xlokk tarkoittaa maltaksi? | Kaakko (3) |

| Mittari (Malta) | Tulos |
| --- | --- |
| Teksti ≥ 200 merkkiä, `lahde`, 2 kysymystä, korostukset tekstissä | 11/11 (teksti 557–897 merkkiä) |
| ≥ 2 kuvaa | 11/11 (kolme kuvaa: Mdina) |
| Lisenssit | 23/23 sallittuja; luettu uudelleen Commonsin API:sta |
| Kuvatiedostot olemassa, sha256 = tiedostonimen tunniste | 23/23 |
| Fokuslehden rajaus, karttarivi, etäisyydet nykyisiin | **ei tarkistettavissa**: MLT:llä ei ole countryShapea eikä fokuslehteä (`osuuLehteen('MLT')` = null); koordinaatit haettu Wikipediasta, laudat lasketaan `laudat()`-funktiolla |
| Visat: kova sääntö | 4/4 |

**Poikkeamat (Malta)**
1. **Pääkartalla nostot ovat 0,5–2 yksikön päässä toisistaan** (Valletta – Birgu on noin 0,5); ilman omaa fokuslehteä ne olisivat päällekkäin. Nimiölimitys on tarkistettava vasta rekisteröinnin jälkeen.
2. **Sisältö**: Ħaġar Qim -noston teksti kertoo myös Mnajdran ja Sinisen luolan; Dinglin teksti sanoo "lähellä Maltan korkeinta kohtaa" (artikkeli), ei "Maltan korkein"; Hypogeumin kuvia on vähän (sisäkuva ja sisäänkäynti); Fort St Angelon kuva jäi pois (yökuva, sotilaskohde).
3. **Kuvat**: Ħaġar Qimillä ei ole omaa Mnajdra-kuvaa (kuvat: Ħaġar Qimin temppeli suojatelttoineen ja Blue Grotto ylhäältä); Vallettan kuvista hylätty Saluting Battery -tykkikuvat (sotilaskohde), Mostan kuvista hylätty Kristus-patsaan sisäkuva; Marsaxlokkin, Cominon ja Vallettan kuvissa ei lähikuvahenkilöitä.
4. **1873-näkökulma**: Malta on brittiläinen kruununsiirtomaa; Valletta (linnoitusten purkamista ehdotetaan 1870-luvulla), Mosta (rotunda valmis, vihkiminen 1871), Ta' Pinu (ihmeet alkavat vasta 1883), Hypogeum (löytyy vasta 1902), Ġgantija (raivaus 1827).

## Yhteiset tarkistukset

| Mittari | Tulos |
| --- | --- |
| `node --test tests/*.test.mjs` | # tests 3707, # pass 3694, # fail 0, # skipped 13 (myös `tests/nimiolimitys.test.mjs`) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| Päällekkäisyys nykyisten CYP-nostojen kanssa | ei samoja id:itä eikä nimiä |

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): CYP 26 tiedostoa kansiosta `/Users/samireivinen/Matkakirja-nostot-kuvat/cyp/` ja MLT 23 tiedostoa kansiosta `/Users/samireivinen/Matkakirja-nostot-kuvat/mlt/` osoitteeseen `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkoihin etukäteen (ennen vientiä 404, puuttuva kuva pudotetaan). Kuvia ei ole committoitu. JSON-metatiedot kansioissa `_json/`.
- Maltan rekisteröinti, nimiölimitystarkistus ja HEAD-tarkistus ämpäriosoitteille (vasta kun MLT on kartalla ja kuvat viety).
- Kyproksen nostoankkureita ei ole lukittu (`LUKITUT_MAAT` on vain FRA).
- Peliä ei avattu selaimessa; piirto todettu samalla reitillä kuin hahmotelma-fra.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Silmäpistokoe: itse en katsonut yksittäisiä kuvia; viisi Sonnet-kuva-agenttia katsoi jokaisen ja listasi hylätyt ehdokkaat.
- Visat: vastauksen esiintyminen tekstissä tarkistettu käsin, ei koneellisesti.
