# Pääkaupunkilehden pistokoe: MONACO (erä e02, 11.10.2026)

Tarkistaja: Sonnet-agentti. Aineisto (vain luku): `pk-e02/paakaupungit-pilvi/e02/monaco/` (sisalto.json, faktapohja.md, kuvat.md, tarkistus.md, konteksti.json, saa.json) ja erän RAPORTTI.md. Muodon esikuva: pulu-pistokoe-tur-a-20261010.md. Aineistoon ei ole tehty korjauksia; kaikki "Korjattu lause" -rivit ovat ehdotuksia. Lehti sijoittuu isoisän vuoteen 1873, mutta kertoo nykyajasta, joten väitteet on arvioitu nykytiedon mukaan.

Menetelmä: jokainen väite vähintään kahdella itsenäisellä lähteellä (Wikipedia + toinen: Monacon hallitus gouv.mc, IMSEE, Société des Bains de Mer (SBM), Valtamerimuseon oma sivusto oceano.org, Météo-France (Wikipedian taulukon lähde), hakuteos- tai matkaopassivusto, tutkimus). Pelkkää Wikipediaa ei hyväksytty lähteettömälle väitteelle. Merkintä "hakutuloksen kautta" = sivua ei haettu suoraan, vaan tieto saatiin hakutuloksen otteesta. Yksikään sivu ei estänyt (403); gouv.mc:n keskiaikasivu aikakatkaistiin, joten sen sisältö on haettu hakutuloksen kautta. Commons-tiedot haettu Commonsin API:sta (extmetadata, yksi pyyntö kerrallaan, tunnistautuen) ja kuvat katsottu esikatselukuvina.

## 1. Yhteenveto

Väitteet (42 väitettä tai väiteryhmää, joista osa kattaa useita lukuja): **OIKEIN 26, EPÄTARKKA 12, VIRHE 4.**

Kuvat (9 tarkistettua): **OIKEIN 7, EPÄTARKKA 2, VIRHE 0.** Tiedostot ovat kaikki Commonsissa, lisenssit ja tekijät täsmäävät. Ei tunnistettavia kasvoja, ei väkivaltaa. Tekijän kuolemasta < 70 v: ei riskiä (Koehler k. 1931, Gilletta k. 1933; N3-kartan tekijä tuntematon, 1800-luvun käsinpiirros, Commonsissa PD France / PD-old assumed). Kaksi epätarkkaa on kuvatekstin ja kuvan välisiä ristiriitoja.

Neljä VIRHETTÄ:
1. **Monoikos perustettiin "600-luvulla eaa."** (kolme paikkaa). Lähteet sanovat 6. vuosisata eaa. = suomeksi 500-luku eaa. Faktapohjassa luki oikein "500-luvulla", sisältö kirjoitettiin väärin.
2. **"Seitsemän julkista hissiä ja liukuporrasta"** (neljä paikkaa). Luku on Wikivoyagen; viranomaistilastojen mukaan hissejä on noin 80 ja liukuportaita noin 37.
3. **Anafylaksia löytyi "Hirondellen laboratoriossa"** (kaksi paikkaa). Valtamerimuseon oman sivuston mukaan koe tehtiin Princesse Alice II -jahdilla.
4. **Ilmasto-osio** (lämpötilat ja sateet "kuukausinormaalien mukaan"): luvut eivät ole normaaleja eivätkä täsmää Météo-Francen 1981–2010-keskiarvoihin (tammikuu 8,1 vs 10,2 °C; lämpimin kuukausi heinäkuu vs elokuu; heinäkuun sade 29 vs 14 mm; vuosisade 711 vs 744 mm). Sama ongelma, jonka RAPORTTI §5 jo epäili.

**Toistuvan virhetyypin arvio (yksi rivi):** pääosin LUVUT: yhden lähteen (usein Wikipedian tai Wikivoyagen) tarkka luku esitetään varmana vaikka muut lähteet poikkeavat (12 kaikista 16 ei-OIKEIN-väitteestä), sen lisäksi yksi suomennos-/ajanlaskuvirhe (600-luku eaa.) ja yksi syy-seuraus-/nimivirhe (Hirondelle vs Princesse Alice); lisenssi- ja kuvatekstivirheitä vähän (2 kuvatekstiristiriitaa).

## 2. Väitetaulukko

Polut ovat sisalto.json:n polkuja. "Lähteet" lyhennetty; täydet perustelut ja URL:t luvussa 3.

| # | Väite | Polku | Tulos |
|---|---|---|---|
| 1 | Pinta-ala 2,08 km², 38 857 asukasta 2025 | .artikkeli.intro | OIKEIN |
| 2 | Maailman toiseksi pienin valtio | .artikkeli.intro, .kaupunkilehti[0].johdanto | OIKEIN |
| 3 | Maaraja 5,47 km; korkein kohta 164,4 m | .artikkeli.teksti | OIKEIN (IMSEE 164,5 m) |
| 4 | Rantaviiva 3,83 km | .artikkeli.teksti | EPÄTARKKA |
| 5 | Monoikos perustettiin "600-luvulla eaa." | .artikkeli.teksti; .kaupunkilehti[0].nostot[0].teksti; .nahtavyydet.Port Hercule.teksti | VIRHE |
| 6 | François Grimaldi 8.1.1297 fransiskaaniksi pukeutuneena; vaakunan fransiskaanit; karkotus muutaman vuoden päästä | .kaupunkilehti[0].nostot[0].teksti; .kysymykset[1] | OIKEIN |
| 7 | Grimaldit ostivat Monacon Aragonian kruunulta 1419 | .kaupunkilehti[0].nostot[0].teksti | OIKEIN |
| 8 | Honoré II käyttää ruhtinaan arvonimeä 1612 | .kaupunkilehti[0].nostot[0].teksti; .artikkeli.teksti | OIKEIN |
| 9 | Menton hankittu 1346, Roquebrune 1355 | .kaupunkilehti[0].nostot[2].teksti | OIKEIN |
| 10 | Nämä "kasvattivat ruhtinaskunnan lähes kymmenkertaiseksi" | .kaupunkilehti[0].nostot[2].teksti | EPÄTARKKA |
| 11 | Vapaat kaupungit 1848; Ranskan ja Monacon sopimus 1861, Menton ja Roquebrune Ranskalle | .artikkeli.intro; nostot[2].teksti, .lyhyt, .selite | OIKEIN |
| 12 | Ranska maksoi 4 100 000 frangia | .kaupunkilehti[0].nostot[2].teksti | EPÄTARKKA |
| 13 | Tuloveroa ei kerätä vuodesta 1869 | .artikkeli.intro; nostot[2].teksti | OIKEIN (huom.) |
| 14 | Kasino valmistui 1863; Spélugues-rakennus alkoi 1858; Blanc 50 v toimilupa | .nahtavyydet.Monte Carlon kasino.teksti; nostot[1].teksti | OIKEIN |
| 15 | Ensimmäinen kasino Villa Bellevuessa 14.12.1856 ("lähteen mukaan", muut 1858/1862) | .kaupunkilehti[0].nostot[1].teksti | OIKEIN (varauksella ilmaistu) |
| 16 | SBM perustettu 15 miljoonan frangin pääomalla | .nahtavyydet.Monte Carlon kasino.teksti | EPÄTARKKA |
| 17 | Hôtel de Paris rakennettu 1862 ("lähteen mukaan") | .nahtavyydet.Monte Carlon kasino.teksti | EPÄTARKKA |
| 18 | Rautatie saapui 1868 | .artikkeli.teksti; nostot[1].teksti | EPÄTARKKA (lievä) |
| 19 | Garnier + Dutrou laajensivat kasinoa 1878–79; Trente-et-Quarante 1880–81 | .nahtavyydet.Monte Carlon kasino.teksti; nostot[3].selite | OIKEIN |
| 20 | Jagger "rikkoi pankin" 1873 tai noin 1881 (lähteet ristiriitaiset) | .nahtavyydet.Monte Carlon kasino.teksti; nostot[1].teksti | OIKEIN (varauksella ilmaistu) |
| 21 | Salle Garnier: avajaiset 25.1.1879 (Sarah Bernhardt), 8,5 kk, 524 paikkaa vs noin 2 000, Le Chevalier Gaston 8.2.1879, Gunsbourg 1892–, Berlioz 1893, Wagner 1909 | .nahtavyydet.Salle Garnier; .tiedot[0]; .kysymykset[2] | OIKEIN |
| 22 | Katedraali: 1875–1903, vihitty 11.6.1911, edeltäjä Pyhä Nikolaus 1252, purettu 1874; Carrara-alttari; urut 1976 | .nahtavyydet.Monacon katedraali | OIKEIN |
| 23 | Valtamerimuseo vihitty 1910, julkisivu 85,04 m, rakentaminen 11 v, Cousteau 1957–1988 | .kaupunkilehti[1].nostot[1]; .nahtavyydet.Valtamerimuseo | OIKEIN |
| 24 | "100 000 tonnia" La Turbien kiveä | .kaupunkilehti[1].nostot[1].teksti; .nahtavyydet.Valtamerimuseo.teksti | EPÄTARKKA |
| 25 | Akvaariossa "4 000 kalalajia" | nostot[1].teksti; .nahtavyydet.Valtamerimuseo.teksti; matkailu.parasta[1].selite | EPÄTARKKA |
| 26 | "Barokkityylinen" julkisivu | nostot[1].teksti; .nahtavyydet.Valtamerimuseo.teksti | EPÄTARKKA (lievä) |
| 27 | Hirondellen laboratorion havainnoista syntyi anafylaksian tutkimus | .kaupunkilehti[1].nostot[0].teksti; .nahtavyydet.Valtamerimuseo.teksti | VIRHE |
| 28 | Albert I aloitti oseanografian "22-vuotiaana" | .kaupunkilehti[1].nostot[0].teksti | EPÄTARKKA |
| 29 | Albert I ruhtinas 1889–1922; neljä jahtia; Princess Alice Bank 1896; Richetin Nobel 1913; Ihmisen paleontologian instituutti Pariisiin; tukea napatutkijoille | .kaupunkilehti[1].nostot[0].teksti | OIKEIN |
| 30 | Jardin Exotique: Albert I osti kallion 1912, Notari, rakennus alkoi 1913, luola 1916, avattu 1931, museo siirretty 1959, Gastaud 1895, Vatrican 1933–69 | .nahtavyydet.Jardin Exotique; nostot[2] | OIKEIN |
| 31 | Jardin: vihitty "7.2.1933"; museo perustettu 1901 | nostot[2].teksti; .nahtavyydet.Jardin Exotique.teksti | EPÄTARKKA |
| 32 | Jardin suljettu 2020, avaus suunniteltu 2026, "tarkista onko avoinna" | matkailu.hyvaTietaa[3]; .ehdotukset.huomiot[1] | EPÄTARKKA (vanhentunut) |
| 33 | Ruhtinaanlinna: 1191 linnake, 1215 linnoitus (4 tornia), 7 vuosisataa samassa rakennuksessa, 1793, 1814, Charles III:n kunnostus, Orazio de Ferrari, Catone | .nahtavyydet.Ruhtinaanlinna; nostot[3] | OIKEIN |
| 34 | Port Hercule: nykyinen satama 1926, 16 ha, 700 alusta, syvyys 7/40 m, Marinetek 2011 | .nahtavyydet.Port Hercule | OIKEIN (huom.) |
| 35 | Ainoa rautatieasema osin maan alla, avattu 1999 | .tiedot[1]; matkailijalle.jaksot[0] | OIKEIN |
| 36 | "Seitsemän julkista hissiä ja liukuporrasta" | .tiedot[2]; .kaupunkilehti[0].matkailijalle.kappale; matkailijalle.artikkeli.jaksot[0].teksti | VIRHE |
| 37 | Monaco voitti Eurovisionin 1971 (Séverine, Un banc, un arbre, une rue) | .kysymykset[3] | OIKEIN |
| 38 | Kesällä 1913 pallo osui mustaan 26 kertaa peräkkäin | .kysymykset[4] | OIKEIN (huom.) |
| 39 | Monte Carlo -menetelmä: Ulam, nimi Metropolis (setä pelasi), Los Alamos, ENIAC kevät 1948 | .kaupunkilehti[1].tehtava; nostot[3].teksti | OIKEIN (huom.) |
| 40 | Monte Carlo nimetty ruhtinas Charles III:n mukaan ("Charlesin vuori") | .kysymykset[0]; kansikuvat[1].selite | OIKEIN |
| 41 | Larvotto kuului 1911 perustettuun Monte Carlon kuntaan, joka yhdistyi 1917 | matkailijalle.jaksot[2].kuva.selite | OIKEIN |
| 42 | Ilmasto: tammikuu 8,1 °C, heinäkuu 24,3 °C ("kuukausinormaalien mukaan"), lokakuu 144 mm, huhti-/heinäkuu 29 mm, vuosi 711 mm | .kaupunkilehti[0].matkailijalle.artikkeli.jaksot[4].teksti; .saatiedot | VIRHE |

Huomio kysymyksistä: kaikissa kysymyksissä (kysymykset[0–4] ja tehtava) oikea vastaus on indeksi 0 / ensimmäinen vaihtoehto. Jos peli ei sekoita vaihtoehtoja ajonaikaisesti, tämä on arvattavissa; tarkistettava pelikoodista.

## 3. Perustelut lähteineen ja korjatut lauseet

### Virheet

**5. "600-luvulla eaa." (VIRHE).** Port Hercules (en.wikipedia), History of Monaco ja useat opassivustot: fokaialaiset Massaliasta perustivat Monoikoksen "6th century BC". Suomessa 6. vuosisata eaa. on 500-luku eaa. (vrt. 600-luku eaa. = 7. vuosisata). Faktapohja (kohdat 2 N1 ja 5.3) sanoo oikein 500-luvulla; sisältöön se muuttui virheeksi. Lähteet: https://en.wikipedia.org/wiki/Port_Hercules ; https://en.wikipedia.org/wiki/History_of_Monaco ; https://www.worldatlas.com/articles/how-did-monaco-get-its-name.html (hakutuloksen kautta).
- `.artikkeli.teksti`, `.kaupunkilehti[0].nostot[0].teksti`, `.nahtavyydet.Port Hercule.teksti`.
- Korjattu lause: "fokaialaiset kreikkalaiset perustivat sinne 500-luvulla eaa. Monoikoksen siirtokunnan" (ja Port Hercule: "kreikkalaiset siirtokuntalaiset perustivat Monoikoksen 500-luvulla eaa.").
- (Vääriä hälytyksiä ei ole: `.nahtavyydet.Ruhtinaanlinna.teksti` "1600-luvulla" on oikein.)

**27. Anafylaksia ja Hirondelle (VIRHE).** Valtamerimuseon oma resurssisivu: Richet ja Portier tekivät kokeen kesällä 1901 "on board the second Princess-Alice"; Nobel 1913. Hakutulokset (Hakai Magazine, centrescientifique.mc) antavat saman. Wikipedian museoartikkeli mainitsee Hirondellen, joten virhe periytyy sieltä; museon oma sivusto painaa enemmän. Lähteet: https://www.oceano.org/en/resources/5-the-discovery-of-anaphylaxis ; https://hakaimagazine.com/article-short/unexpected-discovery-anaphylaxis/ (hakutuloksen kautta).
- `.kaupunkilehti[1].nostot[0].teksti`: "Hirondellen laboratoriossa tehdyt havainnot johtivat anafylaksian ymmärtämiseen".
- Korjattu lause: "Princesse Alice II -jahdilla 1901 tehdyt kokeet, joihin Albert I oli kutsunut Charles Richet'n ja Paul Portier'n, johtivat anafylaksian löytämiseen, ja Richet sai siitä lääketieteen Nobel-palkinnon 1913."
- `.nahtavyydet.Valtamerimuseo.teksti` (2. kappale): "Laboratorion havainnoista syntyi anafylaksian tutkimus" -> "Anafylaksian löytö, josta Charles Richet sai Nobelin 1913, tehtiin Albert I:n tutkimusretkellä Princesse Alice II -jahdilla."

**36. Seitsemän julkista hissiä ja liukuporrasta (VIRHE).** Luku on Wikivoyagen ("seven public escalators and elevators (all free)"). Viranomaistilastot: Monaco en chiffres 2020 antaa 84 hissiä ja 37 liukuporrasta (2019), 2023-painos 88 hissiä (2022); Monaco Tribune 3/2021: noin 80 julkista hissiä, 37 liukuporrasta, 8 liikkuvaa kävelytietä. Lähteet: https://en.wikivoyage.org/wiki/Monaco ; https://www.monaco-tribune.com/2021/03/monaco-modernise-son-reseau-de-liaisons-mecaniques/ ; Monaco en Chiffres 2020 (en.gouv.mc, hakutuloksen kautta). Maksuttomuudelle vain Wikivoyage.
- `.tiedot[2]`, `.kaupunkilehti[0].matkailijalle.kappale`, `.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[0].teksti`.
- Korjattu lause (tiedot[2]): "Monacossa on kymmeniä julkisia hissejä ja liukuportaita (viranomaistilastojen mukaan noin 80 hissiä ja 37 liukuporrasta), jotka helpottavat liikkumista rinteillä." (Maksuttomuus vain Wikivoyagen mukaan; jos säilytetään, lisää "Wikivoyagen mukaan".)

**42. Ilmasto (VIRHE).** Wikipedian taulukko (lähde Météo-France, 1981–2010): päivän keskilämpö tammi 10,2, helmi 10,2, heinä 23,8, elo 24,2 °C; sade tammi 67,7, huhti 71,3, heinä 13,7, loka 128,7 mm; vuosi 743,6 mm. Sisällössä: tammikuu 8,1, heinäkuu 24,3 (lämpimin), elokuu 23,8, heinäkuu ja huhtikuu 29 mm (kuivimmat), loka 144 mm, vuosi 711 mm. Muut sivustot (WeatherSpark: heinäkuu kuivin noin 10 mm, elokuu kuumin; Weather2Travel heinäkuu 23 mm, loka 102 mm) tukevat sitä, että heinäkuu on kuivin ja elokuu lämpimin. `saa.json` on Open-Meteo-mallidataa (tuli epäilyttäväksi jo RAPORTTI §5), ei kuukausinormaali, eikä sitä saa esittää normaaleina. Lähteet: https://en.wikipedia.org/wiki/Monaco (Climate) ; https://weatherspark.com/countries/MC ; https://www.weather2travel.com/climate-guides/monaco/ (kaksi viimeistä hakutuloksen kautta).
- `.kaupunkilehti[0].matkailijalle.artikkeli.jaksot[4].teksti`; `.saatiedot.luonnehdinta`; `.saatiedot.keskilampo`/`.sade` (data).
- Korjattu lause: "Météo-Francen vuosien 1981–2010 keskiarvojen mukaan lämpimin kuukausi on elokuu, 24,2 astetta, ja kylmimmät ovat tammi- ja helmikuu, 10,2 astetta. Sateisin kuukausi on lokakuu, 129 millimetriä, ja kuivin heinäkuu, 14 millimetriä; vuodessa sataa noin 744 millimetriä." Vaihtoehto: korvaa `saatiedot`-taulukot Météo-Francen luvuilla tai poista "kuukausinormaalien mukaan" ja kuvaa lukuja mallidatana.

### Epätarkat

**4. Rantaviiva 3,83 km.** IMSEE Monaco en chiffres: 2018–2019 3 829 m, 2021-painos 4 856 m (ulkopuoli, satamat ja rannat); CIA Factbook 4,1 km; Wikipedia 3,83 km. Lähteet: https://en.wikipedia.org/wiki/Monaco ; IMSEE Monaco en chiffres 2019/2021 ja CIA Factbook (hakutuloksen kautta). Maaraja 5,47 km (IMSEE 5 469 m) ja pinta-ala 2,08 km² täsmäävät.
- `.artikkeli.teksti`. Korjattu lause: "Maaraja Ranskan kanssa on 5,47 kilometriä, rantaviivaa on lähteestä riippuen noin 4–5 kilometriä, ja korkein kohta on noin 164 metrin korkeudessa merenpinnasta."

**10. "Lähes kymmenkertaiseksi".** Vain Wikipedia ("almost ten times"). Muut lähteet: menetys 95 % (1/20 jäljelle), 80–90 %, "puolet" (gouv.mc ei anna lukua). Menton 1346 ja Roquebrune 1355 vahvistettu (gouv.mc, hakutuloksen kautta). RAPORTTI kertoo jättäneensä osuusluvun pois ristiriidan takia, mutta tämä kerroin on samaa luokkaa.
- `.kaupunkilehti[0].nostot[2].teksti`. Korjattu lause: "Menton ja Roquebrune ostettiin Grimaldien haltuun 1346 ja 1355, ja ne kasvattivat ruhtinaskunnan alueen moninkertaiseksi."

**12. 4 100 000 frangia.** Ensisijaisen lähteen (Monacon hallitus, 1861 sopimus) mukaan korvaus oli neljä miljoonaa frangia; Journal de Monaco 1861 puhuu neljän miljoonan lisämäärärahasta; Wikipedian Franco-Monégasque Treaties -artikkeli sanoo 4 miljoonaa. 4,1 milj. vain en-Wikipedian Monaco-artikkelissa (ja yhdessä muussa sivussa). Sopimus 2.2.1861 (gouv.mc) vs Wikipedia 11.2. Lähteet: https://www.gouv.mc/en/government-institutions/history-and-heritage/periods/times-of-trouble-1793-1861/secession-of-menton-and-roquebrune ; https://en.wikipedia.org/wiki/Franco-Mon%C3%A9gasque_Treaties .
- `.kaupunkilehti[0].nostot[2].teksti`. Korjattu lause: "Charles III luopui vaatimuksesta, ja Ranska maksoi hänelle neljä miljoonaa frangia."

**16. SBM:n pääoma.** en-Wikipedian kasinoartikkeli: 15 milj. frangia; en-Wikipedian SBM-artikkeli: 8 milj. frangia (32 000 osaketta); SBM:n oma historiasivu ei anna lukua. Lähteet: https://en.wikipedia.org/wiki/Monte_Carlo_Casino ; https://en.wikipedia.org/wiki/Soci%C3%A9t%C3%A9_des_Bains_de_Mer_de_Monaco ; https://www.montecarlosbm-corporate.com/the-company/history/ .
- `.nahtavyydet.Monte Carlon kasino.teksti`. Korjattu lause: "François Blanc sai 50 vuoden toimiluvan, ja Société des Bains de Mer perustettiin 1863." (pääomaluku pois)

**17. Hôtel de Paris 1862.** Wikipedian kasinoartikkeli: 1862 (rakennettu). SBM:n oma sivu ja HelloMonaco: hotelli avattiin vuotta kasinon jälkeen eli 1864 (ruokasalin laajennus tammikuussa 1866 "kaksi vuotta avauksen jälkeen"). Tekstissä "lähteen mukaan", mutta lähdeksi riittää tarkempi. Lähteet: https://www.montecarlosbm-corporate.com/the-company/history/ ; https://www.hellomonaco.com/sightseeing/history-pages/the-history-of-societe-des-bains-de-mer-the-oldest-hospitality-management-company-in-the-world/ .
- `.nahtavyydet.Monte Carlon kasino.teksti`. Korjattu lause: "Hôtel de Paris, saman arkkitehdin työ, avattiin vuotta kasinon jälkeen, 1864."

**18. Rautatie 1868.** Monaco–Monte-Carlo -aseman ja Rail transport in Monaco -artikkelit: rata Monacoon 1867 (Wikipedia, HelloMonaco "valmistui 1867"); muut lähteet 1868 (Wikipedian Monaco-artikkelin tieto, Monaco Tribune: koko Nizza–Menton–Ventimiglia 1872). Lähteet: https://en.wikipedia.org/wiki/Rail_transport_in_Monaco ; https://www.hellomonaco.com/sightseeing/history-pages/the-strategic-talent-of-prince-charles-iii-the-155th-anniversary-of-monacos-railway/ .
- `.artikkeli.teksti`, `.kaupunkilehti[0].nostot[1].teksti`. Korjattu lause: "Rautatie saapui Monacoon 1860-luvun lopulla (1867–68) ja toi kävijät."

**24. "100 000 tonnia".** Vain en-Wikipedia ja siitä kopioitu Pixeo-listaus; museon omasta aineistosta ei löytynyt. Tekstissä "lähteen mukaan" (RAPORTTI §3 tunnistaa tonnin lajin epäselväksi). Rakentamisen kesto 11 v on vahva (ensimmäinen kivi 25.4.1899, vihkiäiset 29.3.1910, structurae.net, hakutuloksen kautta).
- `.kaupunkilehti[1].nostot[1].teksti`, `.nahtavyydet.Valtamerimuseo.teksti`. Korjattu lause: "Rakentaminen kesti 11 vuotta (1899–1910), ja rakennus on tehty pääosin La Turbien valkoisesta kalkkikivestä."

**25. "4 000 kalalajia".** Wikipedia: 4 000 lajia kaloja ja yli 200 selkärangattomien heimoa. Muut: Lonely Planet noin 90 allasta ja 450 lajia; HelloMonaco yli 350 kalalajia ja 6 000 yksilöä; Musement yli 6 000 yksilöä; eläintarhalistaus 650 lajia. 4 000 on selvästi yläreuna, ja se toistuu kolmessa paikassa. Lähteet: https://en.wikipedia.org/wiki/Oceanographic_Museum_of_Monaco ; https://www.hellomonaco.com/sightseeing/must-sees/the-oceanographic-museum-of-monaco-temple-of-the-sea/ ; https://www.lonelyplanet.com/pois/1188681 (hakutuloksen kautta).
- `.kaupunkilehti[1].nostot[1].teksti`, `.nahtavyydet.Valtamerimuseo.teksti`, `.kaupunkilehti[0].matkailijalle.artikkeli.matkailu.parasta[1].selite`. Korjattu lause: "akvaariossa on satoja lajeja ja noin 6 000 yksilöä" (matkailu: "akvaariossa on lähteiden mukaan satoja kalalajeja").

**26. "Barokkityylinen".** Wikipedia: "Baroque Revival", muut lähteet uusbarokki (neo-Baroque, arkkitehti Paul Delefortrie, 1899–1910). Lähteet: https://en.wikipedia.org/wiki/Oceanographic_Museum_of_Monaco ; https://structurae.net/fr/ouvrages/musee-oceanographique (hakutuloksen kautta).
- Korjattu lause: "Uusbarokkinen julkisivu kohoaa jyrkän kalliojyrkänteen yläpuolelle 85 metrin korkeuteen." (85,04 m on Wikipedia; muut 85 m.)

**28. Albert I "22-vuotiaana".** Vain en-Wikipedia (Albert I -artikkeli). Muut: Hirondelle-kuunari 1873 (hän 24–25-vuotias), tutkimusretket 1885 alkaen (centrescientifique.mc, hakutuloksen kautta). Muut yksityiskohdat täsmäävät (1889–1922, neljä jahtia, Princess Alice Bank 9.7.1896, IPH 1910, Richet 1913).
- `.kaupunkilehti[1].nostot[0].teksti`. Korjattu lause: "Oseanografian uransa hän aloitti nuorena: ensimmäinen tutkimusjahti Hirondelle oli kuunari vuodelta 1873, ja laajat tutkimusretket alkoivat 1885."

**31. Jardinin vihkiäispäivä ja museon perustamisvuosi.** Wikipedia: vihitty 7.2.1933, museo perustettu 1901. Ranskankieliset lähteet: virallinen vihkiminen 13.2.1933 (prinssi Louis II), museo perustettu 1902. Lähteet: https://en.wikipedia.org/wiki/Jardin_Exotique_de_Monaco ; https://museedupatrimoine.fr/jardin-exotique-de-monaco-principaute-de-monaco/32990.html?lang=en (hakutuloksen kautta).
- `.kaupunkilehti[1].nostot[2].teksti`, `.nahtavyydet.Jardin Exotique.teksti`. Korjattu lause: "Puutarha avattiin 1931 ja vihittiin virallisesti helmikuussa 1933. Esihistoriallisen antropologian museo, jonka Albert I perusti 1900-luvun alussa (1901–02), siirrettiin puutarhaan 1959."

**32. Jardinin avautuminen.** Puutarha avattiin uudelleen kuuden vuoden remontin jälkeen maaliskuussa 2026 (Monaco Tribune 3/2026, siviaggia.it, letribunaldunet.fr; hakutuloksen kautta). Teksti (kirjoitettu vanhan tiedon pohjalta) on nyt vanhentunut vaikka se kehottaakin tarkistamaan. Lähteet: https://www.monaco-tribune.com/2026/03/le-couple-princier-et-la-princesse-caroline-decouvrent-ensemble-la-renaissance-du-jardin-exotique-de-monaco/ ; https://en.wikipedia.org/wiki/Jardin_Exotique_de_Monaco .
- `.kaupunkilehti[0].matkailijalle.artikkeli.matkailu.hyvaTietaa[3].teksti`, `.ehdotukset.huomiot[1]`. Korjattu lause: "Puutarha oli suljettuna vuodesta 2020 kunnostusta varten ja avattiin uudelleen maaliskuussa 2026; tarkista aukioloajat ennen vierailua."

### Oikein (tiivis perustelu)

- **1–3.** IMSEE: 38 857 asukasta 31.12.2025 (Monaco Tribune 5/2026, hakutuloksen kautta; Wikipedian infobox; Wikipedian johdanto antaa vielä 38 423 = 2024). Pinta-ala 2,08 km² (IMSEE-esite 2022; 208,4 ha), maaraja 5 469 m (IMSEE). Toiseksi pienin valtio Vatikaanin jälkeen (Wikipedia, yleisesti). Korkein kohta IMSEE 164,5 m, Wikipedia 164,4 m. https://www.monaco-tribune.com/2026/05/population-emploi-logement-ce-quil-faut-retenir-du-dernier-recensement-de-monaco/
- **6–8.** gouv.mc: valtaus 8.1.1297, "Malizia", fransiskaanipuvun aseet, aseistettu munkki vaakunassa; François Grimaldi hallitsi 1297–1301; Honoré II otti ruhtinaan arvon 1612 (gouv.mc Honoré II -sivu). 1419: Wikipedia + pilotguides.com + belgialainen akateeminen julkaisu (Jean I Grimaldi); gouv.mc:n sivua ei saatu auki tähän kohtaan, joten kaksi toissijaista lähdettä. https://en.gouv.mc/Government-Institutions/History-and-Heritage/Periods/The-beginnings-of-independence-Middle-Ages/Occupation-of-the-Rocher-by-Francois-Grimaldi
- **9, 11.** Charles I osti Menton 1346 ja Roquebrune 1355 (gouv.mc "Charles I: Formation of the land"); vapaat kaupungit 20.–21.3.1848; sopimus 2.2.1861 (gouv.mc).
- **13.** 1869: kasinotulot mahdollistivat suorien verojen poiston alamaisilta (Wikipedia, Monaco Now, HelloMonaco). Huom.: nykyään ranskalaiset kansalaiset ovat poikkeus (1963 sopimus), joten "asukkailta" on yleistys; ei virhe 1873-viitekehyksessä.
- **14, 19.** Wikipedia (rakennus alkoi 13.5.1858, valmis 1863; arkkitehti Gobineau de la Bretonnerie; Blanc 50 v; 1878–79 Garnier ja Dutrou; Trente-et-Quarante 1880–81). SBM:n oma sivu: "perustettu 1863 ruhtinaan asetuksella", kasino avattiin keväällä 1863, ensimmäinen kivi viisi vuotta aiemmin; Blancin toimilupa 2.4.1863 asetuksella; Garnier 1878 ja Salle des Amériques 1881. (Wikipedian infoboxin "1865" on poikkeus.) https://www.montecarlosbm-corporate.com/the-company/history/
- **15.** 14.12.1856 on vain Wikipedian tarkka päivä; SBM:n ja HelloMonacon mukaan ensimmäinen peliasaali oli Villa Bellevuessa La Condamine -alueella (päiväys puuttuu). Teksti ilmaisee varauksen ("lähteen mukaan, muut 1858 tai 1862"), joten ei virhe.
- **20.** Jagger: Wikipedian Joseph Jagger -artikkeli noin 1881, kasinoartikkeli 1873, Snopes/arXiv 1873, Daily Express 1880. Teksti tunnistaa ristiriidan oikein. https://en.wikipedia.org/wiki/Joseph_Jagger ; https://www.snopes.com/luck/monte.asp
- **21.** Wikipedia (Opéra de Monte-Carlo): 8,5 kk, 524 paikkaa vs noin 2 000, 25.1.1879, Planquette 8.2.1879, Schmit 1898–99, Gunsbourg 1892–, Berlioz 1893, Wagner 1909. Toinen lähde: SBM (Bernhardt avasi 25.1.1879 -illan) ja L'Écuyer (524 paikkaa, kahdeksan kuukautta, Schmit 1898–99). "Esiintyi nymfinä" ja Planquette-päivä vain Wikipedia; muut kuvaavat Bernhardtin roolin eri tavoin (runon lausunta), joten tämä yksityiskohta on heikoin. https://en.wikipedia.org/wiki/Op%C3%A9ra_de_Monte-Carlo
- **22.** Wikipedia + Monacon hiippakunnan dokumentti (diocese.mc: kirkko perustettu 1252, tuhottu 1874; ensimmäinen kivi 6.1.1875, valmis 12.11.1903) + visitmonaco.com; arkkitehti Charles Lenormand; tyyli romano-bysanttilainen (ranskalaiset lähteet), uusromaaninen (Wikipedia); alttari valkoista Carraran marmoria (ranskalaiset lähteet), piispantuoli (Wikipedia). Pieni varaus: Pyhän Nikolauksen kirkon purku 1873/1874 vaihtelee. https://diocese.mc/storage/documents/64Z9eFnaihJuxQBURMZvyL5ZjLRWp7vFsayHfr77.pdf (hakutuloksen kautta)
- **23.** Museo vihitty 29.3.1910 (structurae, oceano.org-hakutulos), julkisivu 85 m (kaksi lähdettä; 85,04 m vain Wikipedia), 11 v (1899–1910), Cousteau 1957–1988 (Wikipedia, monaconow.com, futura-sciences). Friisin "20 tutkimusaluksen nimeä": vain Wikipedia tekstinä, mutta kuvassa (Suicasmo) näkyy julkisivulla alusnimi "HIRONDELLE" (visuaalinen varmistus).
- **29, 30.** Albert I: https://en.wikipedia.org/wiki/Albert_I,_Prince_of_Monaco ; Princess Alice Bank 9.7.1896 (HelloMonaco, hakutuloksen kautta); IPH 1910. Jardin: Wikipedia + monacolife.net/HelloMonaco: 1912, Notari, 1913, avattu 1931; luola 1916 vain yhdessä lähteessä mutta ristiriidatta.
- **33.** Wikipedia (Prince's Palace) + finestresullarte.info, palais.mc, gouv.mc (hakutuloksen kautta): 1191 linnake, 1215 neljä tornia, 1793 ryöstö ja sotilassairaala, Pariisin sopimus 30.5.1814, Charles III:n työt. Pyhän Marian tornin rakennustyölle ei löytynyt erillistä lähdettä (vain Wikipedia).
- **34.** Wikipedia: 16 ha, 700 alusta, 7/40 m, 1926; toinen lähde: 1926 laiturien valmistuminen (hakutulos); 700 on paikkoja (berths), Marinetek 2011 vain Wikipedia. Huom.: "nykyinen satama valmistui 1926" yksinkertaistaa, koska uusi Digue Rainier III valmistui 2000-luvun alussa; ei virhe.
- **35.** 7.12.1999, pituus 466 m (Wikipedia, HelloMonaco, gouv.mc). https://en.wikipedia.org/wiki/Monaco%E2%80%93Monte-Carlo_station
- **37.** Eurovision 3.4.1971 Dublin, 128 pistettä (Wikipedia, eurovision.com, escbubble). Monaco Tribunen "kesäkuu" on virhe heidän päässään. https://en.wikipedia.org/wiki/Eurovision_Song_Contest_1971
- **38.** 18.8.1913, 26 kertaa (Wikipedia, MJA 2011, useat). Huom.: "miljoonia" on suosittu uudelleenkerronta eikä ensisijaisista lähteistä varmistettu; teksti on ajan puolesta (kesä) oikein.
- **39.** Metropolis ehdotti nimeä, Ulamin setä (Ulamin 1983 muistelu; LANL, Wikipedia); ENIAC-ajot maalis–toukokuussa 1948 (ENIAC in Action, LANL, arXiv). Huom.: Ulam itse väitti nimeämisen; teksti sanoo "ehdotti" ja ottaa Metropolisin version. https://discover.lanl.gov/publications/actinide-research-quarterly/first-quarter-2023/hitting-the-jackpot-the-birth-of-the-monte-carlo-method/
- **40.** Wikipedia (Monte Carlo Casino: nimi Charlesin kunniaksi), Wikipedia Monaco (Blancit pyysivät nimenmuutosta), HelloMonaco.
- **41.** Wikipedia (Monte Carlo) + provence7.com: kunta 1911, yhdistyminen 1917.

## 4. Kuvat

Tarkistettu 9 kuvaa (Commons API + esikatselukuva). Kaikki tiedostot olemassa; tekijät ja lisenssit täsmäävät kuvat.md:n ja sisalto.json:n `lahde`-kenttien kanssa.

| Kohta | Tiedosto | Lisenssi / tekijä Commonsissa | Sisältö vs. kuvateksti | Tulos |
|---|---|---|---|---|
| Kansi 1 | Hafen und Felsen von Monaco-La Turbie.jpg | CC BY-SA 3.0, Tobi 87 (täsmää) | Satama ja kallio La Turbien näköalapaikalta 2011; vastaa. Nykyaikainen risteilijä näkyy satamassa (ei ongelma, lehti kertoo nykyajasta). Ei kasvoja eikä tekstiä. `kansikuvat[0].selite` on sanasta sanaan sama kuin `nostot[0].selite` (kaksoiskappale). | OIKEIN |
| Nosto N3 | Plan de Menton - btv1b53061965j.jpg | PD (BnF/Gallica); Commonsissa "no machine-readable author", PD France, PD-old assumed, "19th century" (täsmää: tekijä tuntematon) | Käsin piirretty Mentonin kartta, rantakaupunki punaisella, tekstit "MER", "MEDITERRANEE" ja käsinkirjoitetut paikannimet; ei Monacoa. Kuvateksti kertoo Mentonista (kuvat.md:n huomio pitää). Ei kasvoja. Tekijän kuolinvuosi tuntematon mutta 1800-luvun asiakirja, riski pieni. | OIKEIN |
| Nosto N2 | Monte Carlo Casino, gardens, Monaco (Riviera)-LCCN2002707983.jpg | PD (Library of Congress, Photochrom Print Collection, 1890–1900; täsmää) | `lyhyt` sanoo "Monte Carlon kasino rakennettiin Spélugues-alueelle ja valmistui 1863", mutta kuvassa ei näy kasinoa vaan puutarha, suihkulähde, vuoristo ja Hôtel de Londres (pieni teksti julkisivussa); edustalla kolme pientä hahmoa (ei tunnistettavia). Faktoiltaan teksti OK, kuva ei kuvaa sitä. | EPÄTARKKA (kuvateksti) |
| Teema T1 | Résultats des campagnes scientifiques ... Fascicule XII (1898) planche 1 (cropped).jpg | PD, Jean Baptiste François René Koehler (täsmää; k. 1931, yli 70 v) | Merisiili (Phormosa uranus), ventraalipuoli, punertava; vastaa kuvausta. Ei tekstiä (rajattu). Teksti Albert I:n raporttisarjasta OK. | OIKEIN |
| Kohde 5.2 | Opéra de Monte-Carlo (50326975807).jpg | CC BY 2.0, Jorge Láscar (Flickr, FlickreviewR; täsmää) | Opéran kullanruskea julkisivu patsaineen, kaareva sisäänkäynti, portaat, meri taustalla; vastaa. Lipuissa Monacon liput, ei kasvoja. Kuvattu 2014. | OIKEIN |
| Kohde 5.5 | Musée Océanographique de Monaco 20150807.jpg | CC BY-SA 4.0, Suicasmo (täsmää) | Pääjulkisivu; **näkyvää tekstiä**: "INSTITUT OCÉANOGRAPHIQUE MUSÉE", alusnimi "HIRONDELLE" friisissä (tukee tekstin "20 aluksen nimeä"), alareunassa nykyaikainen mainosbanneri "S'AMUSER". Ei kasvoja. | OIKEIN |
| Matkailijalle (pysty) | Monaco-Ville u prosincu.jpg | CC0, August Dominus, kuvattu 15.12.2025 (täsmää, vuosi 2025) | Vaalea talo vihreine ikkunaluukkuineen, parvekkeella lippu, seinällä maalattu pyöreä tunnus. **`selite` kertoo "Katukyltit ovat kaksikielisiä" mutta kuvassa ei ole katukylttiä.** `lyhyt` ("lähes pelkästään kävelykatuja") ei myöskään näy. Tunnus ei näytä valtion vaakunalta (ei fransiskaaneja); kuvat.md kutsuu sitä "Monacon vaakunaksi". Ei kasvoja. Ehdotus: `selite` -> "Monaco-Villen vaaleiden talojen seinillä ja parvekkeilla näkyy usein Monacon punavalkoinen lippu ja maalattuja tunnuksia." | EPÄTARKKA (kuvateksti) |
| Kansi 2 | Monaco 02.jpg | CC BY-SA 4.0, Spike (täsmää); Commons: "Monaco as seen from the Place du Palais" (2019) | Panoraama kallion puolelta Monte Carloon; vastaa (kuvat.md:n "länsipuolelta" on epätarkka, mutta sitä ei ole sisalto.jsonissa). Vain metatiedot tarkistettu, ei esikatselua. | OIKEIN |
| Teema T4 | Monte Carlo Casino north facade on the Place du Casino - Jean Gilletta - Leniaud 2003 p79.jpg | PD, Jean Gilletta (k. 1933; täsmää) | Mustavalkoinen kuva kasinon pohjoisjulkisivusta noin 1910; Commonsin selite huomauttaa lähteen virheellisestä ajoituksesta 1878–1881. Kuvateksti ("valmistui 1863, laajennettiin 1878–79") on oikein, mutta kuva näyttää 1910-luvun asun (tornit, myöhemmät laajennukset). Pieniä hahmoja, ei tunnistettavia kasvoja. | OIKEIN |

Kuvahuomioita: N3-karttaa koskeva RAPORTTI-kysymys (tekijätön Gallica/BnF) on kunnossa: Commonsissa PD France ja PD-old assumed, kuvateksti merkitsee lähteeksi BnF:n. Kenenkään kuvan tekijä ei ole kuollut < 70 v sitten. Yhtään kuvaa ei katsottu väkivaltaiseksi; tunnistettavia kasvoja ei ollut yhdessäkään katsotussa kuvassa.

## 5. Käytetyt päälähteet

Wikipedia (en): Monaco, Monte Carlo Casino, Opéra de Monte-Carlo, Oceanographic Museum of Monaco, Jardin Exotique de Monaco, Prince's Palace of Monaco, Cathedral of Our Lady Immaculate, Port Hercules, Albert I Prince of Monaco, Joseph Jagger, Société des Bains de Mer de Monaco, Franco-Monégasque Treaties, Eurovision Song Contest 1971. Wikivoyage Monaco. Monacon hallitus (gouv.mc): Secession of Menton and Roquebrune, Charles I, Occupation of the Rocher, Honoré II; IMSEE Monaco en chiffres (2019–2023, hakutuloksen kautta). SBM-yhtiön historia (montecarlosbm-corporate.com). Valtamerimuseon oceano.org (anafylaksia). HelloMonaco, Monaco Tribune, Monacon hiippakunta (diocese.mc), LANL, ENIAC in Action, Snopes, arXiv 1204.6412, Météo-Francen luvut Wikipedian taulukon kautta, WeatherSpark, Weather2Travel, Commons API (kuvametatiedot).
