# Viesti Fablelle: Ruotsin hahmotelmanostot valmiina (vaihe 2 ja 3)

19.9.2026 klo 20.10 Suomen aikaa, Sonnet-sisältösessio "Sonnet 3",
haara `sonnet3-nostot-swe` (pohja origin/main 883f09fb, v1961). Versiota ei nostettu,
PR:ää ei avattu, ämpäriin ei viety, Raamattuun ei koskettu.

**Tulos: 28 nostoa (Fablen hyväksymä lista sellaisenaan), 83 Commons-kuvaa, 10 rahavisaa (PAATOKSET 51).**
Uusi tiedosto `js/packs/hahmotelma-swe.js` (`HAHMOTELMA_SWE`, rakenne täsmälleen kuin hahmotelma-nld.js ja -dnk.js).
Rekisteröinti: `js/fokuskohteet.js` (import + `KOHDE_MAAT.SWE`), `sw.js` SHELL, `tools/build-standalone.mjs`.

## Nostot, kuvat ja lisenssit

| id | nimi | tyyppi | teksti (merkkiä) | kuvia | tekijät | lisenssit | etäisyys Tukholmaan | etäisyys SWE-renkaaseen |
| --- | --- | --- | ---: | ---: | --- | --- | ---: | ---: |
| sarek | Sarekin kansallispuisto | vuori | 661 | 3 | Tero Laakso, Uwe und Lukas, Trougnouf (Benoit Brummer) | CC BY 3.0, CC BY-SA 4.0, CC BY 4.0 | 418.7 | 0 |
| abisko | Abiskon kansallispuisto | vuori | 664 | 3 | Silverkey, Pavel.shyshkouski, Lapplaender | CC BY-SA 3.0, CC BY-SA 4.0, CC BY-SA 2.0 de | 477.9 | 0 |
| vattern | Vättern | jarvi | 690 | 3 | Ivo Kruusamägi, acediscovery, Jarl Strömbom | CC BY-SA 4.0, CC BY 4.0 | 124.2 | 0 |
| oland | Öland | saari | 609 | 3 | Bernt Fransson, Håkan Svensson (Xauxa), Håkan Dahlström | CC BY-SA 4.0, CC BY 2.5, CC BY 2.0 | 134.3 | 0 |
| faro | Fårö | saari | 656 | 3 | ArildV, Mattias Pontén | CC BY-SA 4.0 | 76.9 | 6 |
| hoga-kusten | Höga kusten | vuori | 690 | 2 | Pudelek, Tunegravity | CC BY-SA 4.0, CC0 | 186.5 | 4.6 |
| kosterhavet | Kosterhavetin kansallispuisto | meri | 587 | 3 | Bengt Nyman, Petr Vodička | CC BY 2.0, CC BY-SA 4.0 | 236.1 | 4.7 |
| kullaberg | Kullaberg | vuori | 598 | 3 | Moralist, Peterappelros, Silverkey (Mickaël Delcey) | CC BY-SA 4.0, Public domain | 237.2 | 0.4 |
| skokloster | Skoklosterin linna | historia | 559 | 3 | Pudelek, Kateryna Baiduzha, Giuseppe Arcimboldo | CC BY-SA 4.0, Public domain | 23.4 | 0 |
| sigtuna | Sigtuna | historia | 616 | 3 | Brorsson, Arild Vågen, Pudelek | CC BY-SA 3.0, CC BY-SA 4.0 | 18.0 | 0 |
| gripsholm | Gripsholmin linna | historia | 615 | 3 | Arkland, ThomasLendt, ArildV | CC BY-SA 4.0 | 28.4 | 0 |
| ystad | Ystad | historia | 494 | 3 | OleNeitzel, David Castor (dcastor), Mickaël Delcey (Silverkey) | CC BY 4.0, CC0, CC BY-SA 3.0 | 234.9 | 0 |
| lacko | Läckön linna | historia | 702 | 3 | L.G.foto, Billy Palmius, Netha Hussain | CC BY-SA 4.0 | 164.7 | 0 |
| marstrand | Marstrand | historia | 673 | 3 | Jenbuc, Peterannlov, Wazeld | CC BY 3.0, CC BY-SA 4.0, CC BY-SA 3.0 | 227.4 | 4.7 |
| kivik | Kivik | historia | 445 | 3 | User Fantomen on sv.wikipedia, Schorle, Arkland | CC BY-SA 3.0, CC BY-SA 4.0 | 217.0 | 0 |
| varberg | Varbergin linnoitus | historia | 681 | 3 | Kateryna Baiduzha, David J from Skara, Sweden., Wolfgangus Mozart | CC BY-SA 4.0, CC BY 2.0, CC BY-SA 3.0 | 222.2 | 1 |
| rattvik | Rättvik | kulttuuri | 590 | 3 | Annalovisa, TS Eriksson, Henrik Riomar | CC BY-SA 4.0, CC BY 3.0, CC BY-SA 3.0 | 124.4 | 0 |
| jokkmokk | Jokkmokk | kulttuuri | 661 | 3 | Dove SV, Tunegravity, Åsa Sundqvist | CC BY-SA 4.0 | 385.6 | 0 |
| vimmerby | Vimmerby | kulttuuri | 615 | 3 | I99pema, Västgöten | CC BY-SA 4.0, CC BY-SA 3.0 | 109.8 | 0 |
| kalix | Kalix | ruoka | 575 | 3 | Xauxa (Håkan Svensson), Dalmato99, Villr99 | CC BY-SA 3.0, CC BY-SA 4.0 | 379.1 | 0 |
| leksand | Leksand | kulttuuri | 672 | 3 | Jan Ainali, John Hertzberg (1871-1895), Calle Eklund/V-wolf | CC BY-SA 3.0, Public domain | 123.5 | 0 |
| granna | Gränna | ruoka | 658 | 3 | Florencia.wk, Niklas Morberg, kallerna | Public domain, CC BY-SA 2.0, CC BY-SA 4.0 | 136.1 | 0 |
| halsingegardar | Hälsingen koristellut maatilat | kulttuuri | 701 | 3 | Annika64, Tulipasylvestris, Catasa | CC BY-SA 3.0, CC BY-SA 4.0 | 103.1 | 0 |
| karlskoga | Karlskoga | tekniikka | 807 | 3 | Eskil Malmberg, Tomas er, AleWi | CC BY-SA 4.0, CC BY-SA 3.0 | 118.2 | 0 |
| eskilstuna | Eskilstuna | tekniikka | 745 | 3 | Calle Eklund/V-wolf, Jssfrk | CC BY-SA 3.0, CC0 | 51.7 | 0 |
| norrkoping | Norrköping | kauppa | 819 | 3 | ArildV, Arild Vågen, Geskel Saloman | CC BY-SA 4.0, Public domain | 71.9 | 0 |
| gammelstad | Gammelstadin kirkkokylä | kulttuuri | 737 | 3 | Tortap, Karl Brodowsky, Lars Falkdalen Lindahl | CC BY-SA 3.0 | 353.2 | 0 |
| almhult | Älmhult | kauppa | 664 | 3 | Kigsz, MPD01605 from Sterling, Virginia, United States, Sven pe | CC BY-SA 4.0, CC BY-SA 2.0 | 187.9 | 0 |

Kuvia yhteensä 83; lisenssijakauma: CC BY-SA 4.0 39, CC BY-SA 3.0 23, Public domain 5, CC BY 3.0 3, CC BY 4.0 3, CC BY 2.0 3, CC0 3, CC BY-SA 2.0 2, CC BY-SA 2.0 de 1, CC BY 2.5 1.
"Etäisyys Tukholmaan" on pelin oma passi (`nostojenKarttapaikat`, lautayksikköä), raja 7; lähin uusi nosto Sigtuna 18,0.

## Rahavisat (10 noston kenttä `visa`, muoto kuten NLD ja DNK)

Neljä vaihtoehtoa, oikea-indeksit vaihtelevat (2,0,3,2,1,3,2,1,1,3), vastaus löytyy noston omasta tekstistä; `fakta` on saman
Wikipedia-artikkelin muu tieto. Tyypit: jarvi, saari, vuori, 2 × historia, 3 × kulttuuri, ruoka, tekniikka.

| nosto | tyyppi | kysymys | oikea |
| --- | --- | --- | --- |
| vattern | jarvi | Miksi Vättern sisältää puolet Vänernin vesimäärästä, vaikka sen pinta-ala on vain kolmannes? | Koska se on paljon Vänerniä syvempi (indeksi 2) |
| oland | saari | Millainen luontotyyppi Ölandin tunnusmaisema Stora Alvaret on? | Kalkkikivitasanko (indeksi 0) |
| hoga-kusten | vuori | Mikä ilmiö on nostanut Höga kustenin rannikkoa lähes 300 metriä jääkauden jälkeen? | Jääkauden jälkeinen maankohoaminen (indeksi 3) |
| sigtuna | historia | Miksi Sigtunan merkitys alkoi vähetä 1200-luvulla? | Maankohoaminen vaikeutti laivaliikennettä (indeksi 2) |
| kivik | historia | Minä aikakautena Kiviksen Kuninkaanhauta on peräisin? | Pronssikaudelta (indeksi 1) |
| jokkmokk | kulttuuri | Mitä Jokkmokkin lule-saamenkielinen nimi tarkoittaa? | Joen mutka (indeksi 3) |
| vimmerby | kulttuuri | Milloin Vimmerbyn nykyinen uusklassinen kirkko rakennettiin? | 1854–1855 (indeksi 2) |
| granna | ruoka | Mitä sana polkagris tarkoittaa kirjaimellisesti? | Polkkasika (indeksi 1) |
| karlskoga | tekniikka | Millä alalla Boforsin yhtiö erikoistui 1880-luvulta alkaen? | Tykkien valmistukseen (indeksi 1) |
| eskilstuna | tekniikka | Minkä lempinimen Eskilstuna sai teollisen vallankumouksen aikana? | Teräksen kaupunki (Stålstaden) (indeksi 3) |

## Koneellinen tarkistus (vaihe 3)

| Mittari | Tulos |
| --- | --- |
| Nostoja | 28 |
| Teksti 400–900 merkkiä, 3–8 virkettä | 28/28 (445–819 merkkiä; Älmhult 664 uudelleenkirjoituksen jälkeen, Kivik 445) |
| `lahde`-rivi (en-Wikipedia + 19.9.2026) | 28/28 |
| 2 kysymystä pululle | 28/28 |
| ≥ 2 kuvaa | 28/28 (27 kohteella 3 kuvaa, Höga kusten 2) |
| Kuvan kentät (osoite, lyhyt, selite, lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) | 83/83 |
| Lisenssi kelvollinen (PD / CC0 / CC BY / CC BY-SA) | 83/83; **luettu uudelleen Commonsin extmetadata-rajapinnasta erikseen** (lisenssi ja tekijä täsmäävät, ei NC/ND) |
| Kuvatiedostot olemassa, JPEG, sha256-etuliite = tiedostonimen tunniste, ei orpoja | 83/83 |
| Korostukset löytyvät tekstistä | 28/28 |
| Fokuslehden rajaus (`osuuLehteen('SWE')`) | 28/28 |
| Karttarivi pelin omalla passilla (`nostojenKarttapaikat`) | 28/28 pääkartalla, kohdekartalla 0 |
| Etäisyys pelikaupunkiin (Tukholma) | pienin Sigtuna 18,0; raja 7 |
| Samat id:t tai nimet nykyisten 20 SWE-noston kanssa | ei |
| Visat: 4 vaihtoehtoa, eri vaihtoehdot, oikea-indeksi kelvollinen | 10/10 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node --test tests/*.test.mjs` | # tests 3671, # pass 3658, # fail 0, # skipped 13 (nimiölimitys ja `muu`-tyyppi kunnossa) |
| Kuvat katsottu | jokainen 83 ladatusta kuvasta katsottu yhteiskuvina (kontaktilehdet) ja kuva-agenttien esikatseluina |

## Etäisyys SWE-renkaaseen ja läheiset nostot

Pelin karkea maailmankartta (`countryShapes.SWE`): kaikki nostot renkaan sisällä paitsi rannikko/saaret lähellä reunaa (lautayksikköä renkaan ulkopuolella):
Fårö 6,0, Kosterhavet 4,7, Marstrand 4,7, Höga kusten 4,6, Varberg 1,0, Kullaberg 0,4. Lukitus (`LUKITUT_MAAT`) on velka kuten muillakin EU-mailla.
Alle 9 lautayksikköä toisistaan (merkit voivat peittää toisiaan lähikuvassa): Ystad – Ales stenar 7,6 (kaupunki-, ei kivikehäkuva), Norrköping – Göta-kanava 5,1,
Skokloster – Sigtuna 5,4, Rättvik – Leksand 8,8. Muuten ei päällekkäisyyksiä nykyisten 20 SWE-noston (+ Vasaloppet) kanssa.

## Poikkeamat ja päätettävää (lähdesääntö: jos artikkeli ei tue listan väitettä, kohteen tyyppi/teksti vaihdettu ja kirjattu)

1. **Sinun ehdotuksistasi pois** (jo olemassa tai päällekkäisiä, ks. listaviesti): Falun, Kiruna, Göta-kanava, Visby, Kalmar, Ales stenar, Vänern (kaikki jo nostoina), Uppsala (2,0 Gamla Uppsalasta -> Skokloster),
   Nusnäs (3,2 Vasaloppetista -> Rättvik), Trollhättan (Göta älv -nosto samassa paikassa -> Eskilstuna), Gotland (Visby jo -> Fårö).
2. **Rättvik**: en-Wikipedia "Rättvik" on pelkkä tynkä; teksti ja lähderivi perustuvat artikkeliin "Rättvik Municipality" (osio "Town"): kansanmusiikki, kirkko ja kirkkotallit, Music at Siljan, Dalhalla.
   Kirkkoveneistä artikkeli ei kerro, joten niitä ei mainita. Nappi (Boda erotetaan kunnasta vasta 1875) on kuva-agentin lukema artikkelista.
3. **Älmhult**: artikkeli "Älmhult" on tynkä (700 merkkiä). Teksti on kirjoitettu artikkeleista "Älmhult" ja "Älmhult Municipality" (markkinakaupunki 1901, Linnén syntymäseutu Råshult, ensimmäinen IKEA-myymälä, IKEA-museo 2016).
   Nappi ("IKEA-kaupunkia ei vielä ole: markkinapaikaksi tulee vasta 1901") on artikkelin tukema; IKEAn perustamisvuotta 1943 ei artikkeleissa ole, joten se ei ole nappissa. Kuvassa #1 IKEA-museon nimikyltti (rakennus, ei mainos).
4. **Leksand**: artikkeli ei mainitse juhannusta eikä kansanperinnettä, joten niitä ei ole; teksti kertoo Siljanista, jääkiekosta, baseballista ja Leksandsbrödistä.
5. **Kalix**: löjrom on artikkelin tukema (EU-suojattu nimi); nappi kertoo vain, että Suomen sodan antautuminen oli 64 vuotta aiemmin (1809). Löjrom-kuva #2 on alkuperäisenä 567×378 px (skaalattu, pehmeä).
6. **1873-napit, joissa artikkeli ei anna suoraa tietoa**: Abisko (asema 1903, puisto 1909), Sarek (kartoitus 1870, puisto 1909), Kosterhavet (2009), Kullaberg (Linné 1740-luvulla; majakka suunnitellaan 1898), Höga kusten (nimi vasta 1974),
   Fårö (majakka 1847; Bergmanin elokuvat 1960-luvulla), Vimmerby (kirkko 1854–55; Lindgren 1907), Skokloster (valtio ostaa 1967), Kivik, Läckö (muotokuvat Gripsholmiin ja huutokauppa 1830), Sigtuna (n. 600 asukasta 1800-luvun lopulla).
7. **Karlskoga**: Bofors muuttuu osakeyhtiöksi 1873 (artikkeli), Nobel tulee mukaan 1894. Gelleråsenin moottoriurheilukatastrofi jätetty pois (13+).
8. **Hälsingen koristellut maatilat**: sijoitettu Erik-Andersin (Söderala, en-Wikipedia "Erik-Anders" 61.272 N / 16.993 E) kohdalle Fablen ohjeen mukaan; lähderivillä molemmat artikkelit.
9. **Jokkmokk**: asiallisesti saamelaiskulttuurista (markkinat vuodesta 1605, Ájtte-museo, lule-saamenkielinen nimi "joen mutka"); tunnistettava henkilö gáktissa hylätty kuvista.
10. **Tyypit** (`muu` kielletty): Sarek, Abisko, Kullaberg ja Höga kusten `vuori`, Vättern `jarvi`, Kosterhavet `meri`, Öland ja Fårö `saari`, Rättvik/Jokkmokk/Vimmerby/Leksand/Hälsingegårdar/Gammelstad `kulttuuri`, Kalix ja Gränna `ruoka`, Karlskoga ja Eskilstuna `tekniikka`, Norrköping ja Älmhult `kauppa`, muut `historia`.
11. **Kuvat**: hylätty A.Savinin Ystad-kuvat (Free Art License), Ruotsin kulttuuriperintöviraston "No restrictions" -kuvat, Vimmerbyn Stångån-kuva (Åbro-tölkki), Älmhultin ja Kalixin heikot vaihtoehdot. Heikoimpia mukana: Vättern#2 (satelliitti/ilmakuva), Abisko#3 (Lapporten, 2.0 de -lisenssi, asuntovaunuja etualalla),
    Norrköping#3 (maalaus 1858, 1008 px lähde), Leksand#2 (vanha autokromi; Commonsin tekijätieto "John Hertzberg (1871-1895)" ei täsmää kuvan ajoitukseen, PD-merkintä silti kunnossa), Kalix#2 (567 px). `lisenssiUrl` normalisoitu https-muotoon ilman loppukauttaviivaa.
12. **Kuvakansion tapaturmat**: ei; kansiossa 83 nimeä, kaikki täsmäävät dataan.

## Mitä jäi tekemättä

- **Kuvien vienti ämpäriin** (Fable): 83 tiedostoa kansiosta `/Users/samireivinen/Matkakirja-nostot-kuvat/swe/` osoitteeseen
  `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`; osoitteet on kirjattu pakkaan etukäteen, ennen vientiä ne vastaavat 404:llä (puuttuva kuva pudotetaan sarjasta). Kuvia ei ole committoitu.
- HEAD-tarkistus ämpäriosoitteille (vasta viennin jälkeen).
- SWE-nostoankkureita ei ole lukittu (`LUKITUT_MAAT` vain FRA).
- Peliä ei avattu selaimessa (paitsi kuvien kontaktilehti); piirto todettu samalla reitillä kuin hahmotelma-nld.js/-dnk.js (KOHDE_MAAT) ja testit ovat vihreitä.
- Visat: vastauksen esiintyminen tekstissä on tarkistettu käsin; kysymysten oikeellisuus perustuu noston omaan tekstiin.

## Kuvat ja kansio

`/Users/samireivinen/Matkakirja-nostot-kuvat/swe/`: 83 kpl `swe-nosto-<id>-<sha8>.jpg`.
