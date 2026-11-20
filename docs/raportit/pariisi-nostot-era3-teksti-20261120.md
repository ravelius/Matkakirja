# Pariisin nostotekstit, erä 3: 14 nähtävyysjuttua kolmeen kappaleeseen (SK 20.11.2026, L5-5)

Haara `sk/l5-nostotekstit-era3` (erän 2 kuvahaaran `sk/k4-era2-kuvat` päälle; EI mainiin ennen KK:n sanaa; ei junaa). Data: `js/packs/nahtavyysjutut.js` (pariisi, 14 juttua) ja `js/packs/fokusvirta-pariisi.js` (Metro 1900 -takynoston lunastus, sama teksti). Ei uusia kuvia, ei uusia nostoja, ei äänityksiä, ei natiivikoodia, ei karttanimien muutoksia, ei F:ää (6 hetkeä). Tarkistustyökalu `tools/sisalto/noston-tarkistus.mjs` tarkistaa nyt myös C:n vuosirivit (`tarkistaRivit`), ja lähtöluettelosta on poistettu 9 c:-riviä.

## 1. M1–M5 riveittäin

- **M1 silmin:** luku 4: jokaisesta 14 jutusta taulukko ENNEN | NYT (otsikko, tarinarivi-EHDOTUS ≤ 40 merkkiä ilman vuotta, kappaleet merkkimäärineen, vuosirivit, kuvat) ja täydet tekstit. Nähtävyysjutulla ei ole `otsikko`/tarinarivi-kenttää (se on takynostoilla ja jaksollisilla), joten tarinarivit ovat EHDOTUKSIA KK:lle; kenttää ei lisätty.
- **M2 luvuin:** erän 1 kuusi tarkistusta vihreät 14:lle (`node tools/sisalto/noston-tarkistus.mjs`: C-ryhmän rikkeet 9 → 0; kaikki 46 tekstiä: alku 1, järjestys 0, pituus 4, isoisä 0, rivit 0, jäljellä vain F:n 5 hetkeä ja 0 muuta). Kolme kappaletta jokaisella. Pituusraja L5.5: 700–1 000 merkkiä (kappalevälit pois). Merkkimäärät (ENNEN → NYT): Riemukaari 694→734, Concorde 715→726, Luxembourg 1 295→805, Sacré-Cœur 760→729, Panthéon 1 422→967, Notre-Dame 791→767, Saint-Jacques 1 000→975, Saint-Eustache 988→727, Pompidou 897→982, Place des Vosges 721→780, Invalidit 1 121→996, Petit Palais 885→720, Montparnasse 900→859, Metro 513→734. Vuosirivejä 3–6 kaikilla paitsi **Metro 1900: 2 riviä** (tekstissä ja lähteissä vain 1900 ja 1978; kolmatta ei keksitty). Täysi suite 5 992 testiä, 0 kaatuu.
- **M3 luvuin:** lähdetaulukot liitteissä A–D (neljä Sonnet-lähdetarkistajaa, kaksi itsenäistä lähdettä per väite, EPÄVARMA/EI-väitteet korjattu tekstiin; liitteiden tuomiot kuvaavat luonnoksen 1. kierrosta); riippumattoman tarkistajan rivit luvussa 6; heikoimmat kohdat luvussa 3.
- **M4 luvuin:** sana isoisä ei esiinny missään näiden 14 jutun kentässä (testi: koko juttuolio JSON-muodossa; Metron takynosto erikseen). Nappi/tarinarivi/lähderivi: isoisä-kenttiä ei ole.
- **M5 luvuin:** 13 juttua: olemassa oleva kuva/kuvat ennallaan (näytetään avauskappaleen jälkeen, eli kappaleen 1 kuvana). **Pompidou-keskuksella ei ole kuvaa (kuvat: [])**: ei keksitty uutta, kuuluu K-4 erään 3. Karttakohteen kautta toiseen nostoon kuvansa tuovat: Notre-Dame (`nosto-notre-damen-kukko`, D-noston nykykuva) ja Metro 1900 (`nosto-guimardin-metro`, lunastus on sama teksti kuin jutussa). Muut 12 pistettä avaavat jutun omalla kuvallaan.
- **M6 / ÄLÄ RIKO:** Guimard-visan vastaus ("Tyyli meni pois muodista") yhä tekstissä (testi); Pulun kysymykset ennallaan; erien 1 ja 2 tekstit ja kuvat ennallaan; noston-jaksot-, tasalaatu-, nahtavyys-nosto-, nosto-kysymykset- ja noston-vuodet-testit vihreät; äänitteellisiä paloja ei näissä.

## 2. Mitä muuttui (yhteenveto)

Jokainen juttu: ensimmäinen virke kertoo paikan nimen ja koukun; aikajärjestys vanhimmasta uusimpaan, jokainen aikahyppy vuodella tai vuosikymmenellä; viimeinen kappale kertoo nykytilan; vuosirivit täsmäävät tekstin vuosiin. Isoimmat järjestyskorjaukset: Riemukaari (1919 oli viimeisenä), Saint-Eustache (1213 ja 1649 vasta lopussa), Pompidou (kilpailu 1970–1971 ennen rakennusta 1972 ja avausta 1977), Petit Palais (1897 ennen 1900), Montparnasse (veturi 1895 ensin, vuosi 2011 viimeisenä). Lyhennetyt: Luxembourg, Panthéon, Invalidit (kaikki alle 1 000). Pidennetty: Metro 1900 (maailmannäyttely, ensimmäinen linja, jugend). Notre-Dame ja Tour Saint-Jacques lähes ennallaan (vain lähteillä korjatut sanamuodot). Pois jätetty lähteillä heikko: Hugon Kurjat ja Vapaudenpatsas (Luxembourg), Colbert-jakso (Saint-Eustache, aikajärjestys ja lähteettömyys), Mirabeaun ulosvienti "kuukausien kuluttua" (oikein: noin 3 vuotta, 1794), Foucaultin heilurin purun syy.

## 3. Heikoimmat kohdat KK:lle ja päätettävät

Lähteillä kapeimmat (jäljellä tekstissä; tarkistajan kolmannen kierroksen "OK (heikko)"): Riemukaari: "yli sadan taistelun" (128 sisäseinällä + 30 attikassa), "reilua vuotta myöhemmin", "sodassa kaatuneista". Concorde: obeliskin lahjavuosi 1830 (lähteet 1829–1830), "yli tuhat" teloitettua. Luxembourg: nukketeatteri 1933 (yksi vahva lähde, BnF). Sacré-Cœur: "valmistui pääosin 1914" (virallinen 1923), "lähes 80 ehdotusta", "Ranskan suurin kello", mosaiikin "yksi suurimmista". Panthéon: rakennustyö "1750-luvulla" (lähteet 1755–1764), Mirabeau ulos 1794. Saint-Jacques: sääasema 1891 (paris.fr), purkukielto "kerrotaan". Saint-Eustache: vihkiminen 1637 ja Maanviljelyksen temppeli (Wikipedia). Invalidit: ensimmäiset asukkaat 1674 (yksi lähde 1675), verstaat (Musée de l'Armée), sarkofagi Äänisjärveltä Karjalasta (Fondation Napoléon sanoo virheellisesti Suomesta). Montparnasse: "noin 210 m ja 59 kerrosta" (CTBUH 209/58), korkeusrajoituksen ajankohta ("muutama vuosi"). Metro 1900: "yli 140" ja "noin 90" sisäänkäyntiä (lähteet 141/167 ja 86/88), suojelu 1978 (Wikipedia). Pompidou: remontin ajankohta.

**Korjattu tarkistajien kierroksilla ja jätetty pois:** Luxembourgin hehtaariluvut ja 2 000 jalavaa, Hugon Kurjat ja Vapaudenpatsas; Saint-Eustachen 1213 ja Colbert-jakso; Place des Vosgesin "kuningaspari ei asunut" ja "vuoteen 1800 Place Royale"; Invalidien "4 000" asukasta ja "Ludvig XIV:n sodat"; Petit Palaisin koristetyöt 1903–1925, graniittipylväät ja "alusta asti"; Montparnassen "ainoa pilvenpiirtäjä" ja 25/37 m -rajat; Metron "167/88" ja "yksikään 21 ehdotuksesta ei kelvannut"; Panthéonin heilurin purun syy ja Mirabeaun "kuukausien kuluttua"; Notre-Damen "182 vuotta" ja "ennätysajassa".

**KK päätettäväksi:**
1. **Metro 1900: visa ja Pulun kysymys.** Tekstistä poistui "yksikään 21 ehdotuksesta ei kelvannut" (lähteet ristiriidassa: yksi nimeää kilpailun voittajaksi Henri Duray'n). Takynoston Pulun kysymys 1 ("Miksi arkkitehtikilpailun 21 ehdotuksesta yksikään ei kelvannut?"), visan `fakta`-rivi ("Kilpailun 21 ehdotuksesta yksikään ei kelvannut…") ja kysymys "…tehtiin yli 140, mutta puolet niistä purettiin" (luvut vaihdettu 167/88 → yli 140/noin 90, "puolet" jäi; tekstissä nyt "monet") pitäisi päivittää samaan; en muuttanut Pulun kysymyksiä (ÄLÄ RIKO) ennen KK:n sanaa. Ehdotus: kysymys "Miksi työ annettiin Hector Guimardille, vaikka hän ei osallistunut kilpailuun?".
2. Tarinarivit (14 EHDOTUSTA luvussa 4; nähtävyysjutulla ei ole kenttää: NUI vai pois).
3. Pompidou-keskuksen kuva K-4 erään 3 (jutulla ei ole yhtään kuvaa).
4. Metro 1900: juttu ja takynosto ovat sama teksti kahdessa paikassa (testi vartioi); yhdistetäänkö.

## 4. M1: jokaisesta jutusta ENNEN | NYT

### Riemukaari

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Riemukaari | Riemukaari |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Kaari, jota Napoleon ei nähnyt** (30 merkkiä) |
| Kappaleita / merkkejä | 3 / 694 | 3 / 734 |
| Vuosirivit | 1806 Napoleonin käsky · 1836 valmistui · 1920 sotilas tuotiin · 1921 haudattiin · 1919 lento kaaren läpi | 1806 Napoleonin käsky · 1836 valmistui · 1919 lento kaaren läpi · 1920 sotilas tuotiin · 1921 haudattiin |
| Kuvat | 1. Arc de Triomphe, Paris 21 October 2010.jpg | 1. Arc de Triomphe, Paris 21 October 2010.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [323] Pariisin Riemukaari on lähes 50 metriä korkea voitonmerkki, jonka keisari Napoleon ei koskaan nähnyt valmiina. Hän käski rakentaa sen vuonna 1806 juhlistamaan Austerlitzin taistelun voittoa, mutta kaari saatiin valmiiksi vasta vuonna 1836. Sen pintoihin on kaiverrettu yli sadan taistelun ja satojen sotapäälliköiden nimet.
2. [321] Vuonna 1919 lentäjä Charles Godefroy lensi kaksitasokoneellaan kaaren läpi. Temppu oli uskomaton, sillä aukko on vain reilut 14 metriä leveä. Reilua vuotta myöhemmin kaaren alle haudattiin nimetön ranskalaissotilas muistoksi sodassa kaatuneista: hänet tuotiin sinne 11. marraskuuta 1920 ja haudattiin 28. tammikuuta 1921.
3. [90] Tuntemattoman sotilaan haudalla palaa ikuinen liekki, joka sytytetään uudelleen joka ilta.

**ENNEN:**

1. [306] Keisari Napoleon käski rakentaa valtavan riemukaaren vuonna 1806 juhlistamaan Austerlitzin taistelun voittoa. Kaari on lähes 50 metriä korkea, ja sen pintoihin on kaiverrettu 158 taistelun ja 660 sotapäällikön nimet. Napoleon ei koskaan nähnyt valmista kaarta, sillä se saatiin valmiiksi vasta vuonna 1836.
2. [250] Kaaren alla lepää Tuntemattoman sotilaan hauta, jonne tuotiin 11. marraskuuta 1920 nimetön ranskalaissotilas muistoksi kaikista sodissa kadonneista ja haudattiin 28. tammikuuta 1921. Haudalla palaa ikuinen liekki, joka sytytetään uudelleen joka ilta.
3. [138] Vuonna 1919 lentäjä Charles Godefroy lensi kaksitasokoneellaan kaaren läpi — uskomaton temppu, sillä aukko on vain reilut 14 metriä leveä.

### Concorden aukio

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Concorden aukio | Concorden aukio |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Aukio, jossa kuningas mestattiin** (32 merkkiä) |
| Kappaleita / merkkejä | 3 / 715 | 3 / 726 |
| Vuosirivit | 1830 obeliski lahjaksi · 1836 obeliski pystyyn | 1793 kuninkaan mestaus · 1830 obeliski lahjaksi · 1836 obeliski pystyyn |
| Kuvat | 1. Obelisk and fountain in Place de la Concorde, Paris.JPG | 1. Obelisk and fountain in Place de la Concorde, Paris.JPG (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [171] Concorden aukio on Pariisin suurin aukio, ja sen paikalla mestattiin kuningas. Arkkitehti Ange-Jacques Gabriel suunnitteli sen 1700-luvulla kuningas Ludvig XV:n kunniaksi.
2. [209] Vallankumouksen aikana aukiolle pystytettiin giljotiini. Vuonna 1793 siellä mestattiin kuningas Ludvig XVI, ja samana vuonna myös kuningatar Marie Antoinette. Kaikkiaan aukiolla teloitettiin yli tuhat ihmistä.
3. [346] Vuonna 1830 Egyptin hallitsija lahjoitti Ranskalle 3 300 vuotta vanhan Luxorin obeliskin. Kivijättiläinen tuotiin laivalla Niililtä asti ja pystytettiin aukiolle vuonna 1836 valtavan väkijoukon seuratessa. Nykyään 23-metrisen obeliskin ympärillä poreilevat suihkulähteet, ja aukiota reunustavat naispatsaat, jotka kuvaavat Ranskan suurkaupunkeja.

**ENNEN:**

1. [328] Arkkitehti Ange-Jacques Gabriel suunnitteli Pariisin suurimman aukion 1700-luvulla kuningas Ludvig XV:n kunniaksi. Vallankumouksen aikana aukiolle pystytettiin giljotiini, ja siellä mestattiin muun muassa kuningas Ludvig XVI ja kuningatar Marie Antoinette. Kaikkiaan aukiolla teloitettiin yli tuhat ihmistä reilun vuoden aikana.
2. [256] Aukion keskellä kohoaa 23-metrinen, yli 3 300 vuotta vanha Luxorin obeliski, jonka Egyptin hallitsija lahjoitti Ranskalle marraskuussa 1830. Kivijättiläinen tuotiin laivalla Niililtä asti ja pystytettiin aukiolle vuonna 1836 valtavan väkijoukon seuratessa.
3. [131] Nykyään aukiolla poreilevat komeat suihkulähteet ja sitä reunustavat kahdeksan naispatsasta, jotka kuvaavat Ranskan suurkaupunkeja.

### Luxembourgin puisto

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Luxembourgin puisto | Luxembourgin puisto |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Kuningattaren oma puutarha** (26 merkkiä) |
| Kappaleita / merkkejä | 3 / 1295 | 3 / 805 |
| Vuosirivit | 1610 Henrik IV murhattiin · 1612 kartano ostettiin · 1933 nukketeatteri alkoi · 2012 patsas Orsayhin | 1610 Henrik IV murhattiin · 1612 kartano ostettiin · 1933 nukketeatteri alkoi |
| Kuvat | 1. Sunday in the Luxembourg Gardens, Paris May 2014.jpg; 2. Albert Edelfelt - The Luxembourg Gardens, Paris.jpg | 1. Sunday in the Luxembourg Gardens, Paris May 2014.jpg; 2. Albert Edelfelt - The Luxembourg Gardens, Paris.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [342] Luxembourgin puiston loi Pariisiin kuningatar, joka kaipasi omaa palatsia. Kun kuningas Henrik IV murhattiin vuonna 1610, hänen leskensä Maria de’ Medici jäi hallitsemaan Ranskaa poikansa puolesta. Hän osti vuonna 1612 Luxembourgin kartanon ja rakennutti sen viereen palatsin, jonka esikuvana oli hänen kotikaupunkinsa Firenzen Palazzo Pitti.
2. [218] Puistoon istutettiin jalavia, ja muotoilussa oli mukana firenzeläinen suihkulähdemestari Tommaso Francini. Puisto on kasvanut ja kutistunut vallanpitäjien mukana: Napoleon III:n katutyöt veivät 1860-luvulla osan siitä.
3. [245] Nykyinen nukketeatteri on toiminut puistossa vuodesta 1933, ja kahdeksankulmaisella altaalla lapset uittavat purjeveneitä. Patsaita on toista sataa, muiden muassa kaksikymmentä kuningatarta ja merkkinaista. Palatsissa kokoontuu nykyään senaatti.

**ENNEN:**

1. [447] Kun kuningas Henrik IV murhattiin 1610, hänen leskensä Maria de’ Medici jäi hallitsemaan Ranskaa poikansa puolesta — eikä viihtynyt Louvressa. Hän osti vuonna 1612 Luxembourgin kartanon ja rakennutti sen viereen palatsin, joka jäljitteli hänen kotikaupunkinsa Firenzen Palazzo Pittiä. Puistoon istutettiin 2 000 jalavaa, ja firenzeläinen suihkulähdemestari Tommaso Francini muotoili maisemasta sellaisen, jollaisen kuningatar oli lapsena tuntenut.
2. [428] Puisto on kasvanut ja kutistunut vallanpitäjien mukana. Alun kahdeksasta hehtaarista se laajeni kolmeenkymmeneen 1630-luvulla ja vallankumouksen jälkeen neljäänkymmeneen, kun naapuriluostarin maat takavarikoitiin. Napoleon III:n katutyöt veivät 1860-luvulla noin seitsemän hehtaaria, ja Medici-suihkulähde jouduttiin purkamaan ja kokoamaan uudelleen toiseen paikkaan. Nykyään puiston omistaa senaatti, joka kokoontuu palatsissa.
3. [420] Pariisilaiset sanovat puistoa lyhyesti Lucoksi. Kahdeksankulmaisella altaalla lapset uittavat purjeveneitä, nukketeatteri on toiminut puistossa vuodesta 1933, ja patsaita on toista sataa — niiden joukossa kaksikymmentä Ranskan kuningatarta ja jäljennös Bartholdin pienoismallista Vapaudenpatsaasta (alkuperäinen siirrettiin Musée d'Orsayhin 2012). Victor Hugo pani Kurjissa Mariuksen ja Cosetten kohtaamaan juuri täällä.

### Sacré-Cœur

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Sacré-Cœur | Sacré-Cœur |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Valkoinen kirkko kukkulan päällä** (32 merkkiä) |
| Kappaleita / merkkejä | 3 / 760 | 3 / 729 |
| Vuosirivit | 1870 sodan häviö | 1870–1871 sodan häviö · 1875 työ alkoi · 1914 valmistui · 1919 vihittiin |
| Kuvat | 1. Paris - Basilique du Sacré-Cœur de Montmartre - 2025-09-30 23-31-57 001.jpg | 1. Paris - Basilique du Sacré-Cœur de Montmartre - 2025-09-30 23-31-57 001.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [349] Sacré-Cœur eli Pyhän sydämen basilika kohoaa Montmartren kukkulan huipulla, ja se rakennettiin hävityn sodan jälkeen. Ranska hävisi sodan Preussille vuosina 1870–1871, ja Paul Abadie valittiin kirkon suunnittelijaksi lähes 80 ehdotuksen joukosta. Rakennustyöt alkoivat vuonna 1875, ja kirkko valmistui pääosin vuonna 1914 ja vihittiin käyttöön 1919.
2. [253] Ulkoseinät on tehty erikoisesta kalkkikivestä, joka valkenee sateella ja pysyy siksi valkoisena. Kirkko hohtaa yhä, vaikka se on jo yli sata vuotta vanha. Sisällä kattoa koristaa yksi maailman suurimmista mosaiikeista, jonka ala on noin 470 neliömetriä.
3. [127] Tornissa riippuu ”Savoyarde”, Ranskan suurin kello, joka painaa lähes 19 tonnia. Kirkon huipulta avautuu näkymä koko Pariisiin.

**ENNEN:**

1. [282] Basilika Sacré-Cœur eli Pyhän sydämen kirkko rakennettiin Montmartren kukkulan huipulle sen jälkeen, kun Ranska oli hävinnyt sodan Preussille vuonna 1870. Arkkitehti Paul Abadie valittiin suunnittelijaksi peräti 77 ehdotuksen joukosta, ja kirkko valmistui vasta 40 vuotta myöhemmin.
2. [303] Kirkon ulkoseinät on tehty erikoisesta travertiini-kalkkikivestä, joka valkenee sateella eikä koskaan tummu — siksi kirkko hohtaa yhä valkoisena, vaikka se on jo yli sata vuotta vanha. Sisällä kattoa koristaa yksi maailman suurimmista mosaiikeista, joka on koottu 25 000 pienestä keraamisesta palasesta.
3. [175] Tornissa riippuu ”Savoyarde”, Ranskan suurin kello, joka painaa lähes 19 tonnia. Kirkon huipulta, 200 metrin korkeudesta Seine-joen yläpuolelta, avautuu näkymä koko Pariisiin.

### Panthéon

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Panthéon | Panthéon |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Kirkko, josta tuli suurmiesten hauta** (36 merkkiä) |
| Kappaleita / merkkejä | 3 / 1422 | 3 / 967 |
| Vuosirivit | 1744 kuningas sairastui · 1780 Soufflot kuoli · 1790 valmistui · 1791 suurmiesten hauta · 1851 Foucaultin heiluri · 1995 Curie siirrettiin | 1790 valmistui · 1791 suurmiesten hauta · 1794 Mirabeau ulos · 1851 Foucaultin heiluri · 1995 Curie siirrettiin |
| Kuvat | 1. Panthéon, Paris 15 August 2011.jpg; 2. Foucault pendulum at Panthéon de Paris, August 2023.JPG | 1. Panthéon, Paris 15 August 2011.jpg; 2. Foucault pendulum at Panthéon de Paris, August 2023.JPG (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [290] Panthéon on Pariisin kirkko, josta tuli suurmiesten hautapaikka. Kuningas Ludvig XV sairastui vakavasti sotaretkellä ja lupasi, että jos hän toipuu, Pariisin suojeluspyhimys Geneviève saa uuden kirkon. Kuningas toipui, ja Soufflot’n suunnitteleman kirkon rakennustyöt alkoivat 1750-luvulla.
2. [339] Työ kesti yli kolmekymmentä vuotta: Soufflot kuoli, ja hänen oppilaansa Jean-Baptiste Rondelet sai kirkon valmiiksi vasta 1790. Vuonna 1791 kansalliskokous määräsi kirkon suurmiesten hautapaikaksi. Ensimmäisenä kryptaan kannettiin kreivi Mirabeau, mutta vuonna 1794 hänet kannettiin ulos, kun hänen salaiset yhteytensä hoviin paljastuivat.
3. [338] Vuonna 1851 fyysikko Léon Foucault ripusti kupolista 67 metriä pitkän heilurin ja näytti, että maa kääntyy sen alla. Heiluri poistettiin jo samana vuonna, mutta kopio heiluu holvin alla yhä. Kryptassa lepäävät muiden muassa Voltaire ja Victor Hugo, ja Marie Curie siirrettiin sinne 1995 ensimmäisenä naisena omien ansioidensa perusteella.

**ENNEN:**

1. [462] Kuningas Ludvig XV sairastui vakavasti sotaretkellä 1744 ja lupasi, että jos hän toipuu, Pariisin suojeluspyhimys Geneviève saa rappeutuneen kirkkonsa tilalle uuden. Kuningas toipui, ja Jacques-Germain Soufflot’n suunnitteleman kirkon rakennustyöt alkoivat 1758. Rahapula venytti työtä vuosikymmeniä: Soufflot kuoli 1780, ja hänen oppilaansa Jean-Baptiste Rondelet sai rakennuksen valmiiksi vasta 1790. Kumpikaan, ei kuningas eikä arkkitehti, ehtinyt nähdä sitä.
2. [492] Kirkko valmistui juuri kun vallankumous oli alkanut, ja 1791 kansalliskokous määräsi sen suurmiesten hautapaikaksi. Ensimmäisenä kryptaan kannettiin kreivi Mirabeau — ja muutamaa kuukautta myöhemmin hänet kannettiin ulos, kun hänen salaiset yhteytensä hoviin paljastuivat. Voltairen tuhkat tuotiin heinäkuussa 1791. Jotta sisätila tuntuisi hautaholvilta eikä kirkolta, arkkitehti Quatremère de Quincy muurasi umpeen 38 rakennuksen 42 ikkunasta — valoisaksi suunniteltu sali muuttui hämäräksi.
3. [468] Vuonna 1851 fyysikko Léon Foucault ripusti kupolista 67 metriä pitkän heilurin ja näytti yleisölle, ettei heilahdustaso käänny vaan maa kääntyy sen alla. Kirkon vaatimuksesta laite purettiin jo saman vuoden joulukuussa, mutta kopio heiluu holvin alla edelleen. Kryptassa lepäävät muiden muassa Voltaire, Rousseau, Victor Hugo, Émile Zola ja pistekirjoituksen keksijä Louis Braille; Marie Curie siirrettiin sinne 1995 ensimmäisenä naisena omien ansioidensa perusteella.

### Notre-Dame

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Notre-Dame | Notre-Dame |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Katedraali, joka paloi ja nousi** (31 merkkiä) |
| Kappaleita / merkkejä | 3 / 791 | 3 / 767 |
| Vuosirivit | 1163 rakennus alkoi · 1345 valmistui · 1804 Napoleonin kruunaus · 1944 de Gaulle kiitti · 2019 tulipalo · 2024 avattiin uudelleen | 1163 rakennus alkoi · 1804 Napoleonin kruunaus · 1944 de Gaulle kiitti · 2019 tulipalo · 2024 avattiin uudelleen |
| Kuvat | 1. https://media.matkakirja.app/kuvat/notre-dame-2019-nyt.jpg | 1. https://media.matkakirja.app/kuvat/notre-dame-2019-nyt.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [250] Notre-Damen katedraalin rakentaminen alkoi vuonna 1163, ja sen valmistuminen kesti uskomattomat yli sata vuotta. Kirkko oli aikansa insinööritaidon huippu, sillä sen kivikattoa kannattelevat ulkopuoliset tukikaaret, niin sanotut lentävät tukipilarit.
2. [231] Katedraalissa on tapahtunut historian suuria hetkiä: vuonna 1804 Napoleon kruunasi itsensä keisariksi kirkon alttarilla, ja vuonna 1944 kenraali de Gaulle osallistui samassa kirkossa Pariisin vapautumisen kiitosjumalanpalvelukseen.
3. [286] Huhtikuussa 2019 katedraalin vintillä syttyi tulipalo, joka tuhosi vanhan puukaton ja tornihuipun. Palomiehet onnistuivat kuitenkin pelastamaan tornit ja julkisivun, ja ruusuikkunatkin säilyivät. Katedraali avattiin yleisölle uudelleen joulukuussa 2024, alle kuusi vuotta palon jälkeen.

**ENNEN:**

1. [309] Notre-Damen katedraalin rakentaminen kesti uskomattomat 182 vuotta — työ alkoi vuonna 1163 ja valmistui vasta 1345. Kirkko oli aikansa insinööritaidon huippu: sen kivikattoa kannattelevat ulkopuoliset tukikaaret, niin sanotut lentävät tukipilarit, jotka keksittiin juuri tällaisia jättimäisiä kirkkoja varten.
2. [211] Katedraalissa on tapahtunut historian suuria hetkiä: vuonna 1804 Napoleon kruunasi itsensä keisariksi kirkon alttarilla, ja vuonna 1944 kenraali de Gaulle kiitti Jumalaa Pariisin vapautumisesta samassa kirkossa.
3. [271] Huhtikuussa 2019 katedraalin vintillä syttyi tulipalo, joka tuhosi vanhan puukaton ja tornihuipun. Palomiehet onnistuivat kuitenkin pelastamaan tornit, julkisivun ja lasimaalaukset. Katedraali korjattiin ennätysajassa, ja se avattiin yleisölle uudelleen joulukuussa 2024.

### Tour Saint-Jacques

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Tour Saint-Jacques | Tour Saint-Jacques |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Torni, jonka kirkko myytiin kivinä** (34 merkkiä) |
| Kappaleita / merkkejä | 3 / 1000 | 3 / 975 |
| Vuosirivit | 1509–1523 rakennettiin · 1836 kaupunki osti · 1891 sääasema | 1509–1523 rakennettiin · 1836 kaupunki osti · 1891 sääasema |
| Kuvat | 1. Tour Saint-Jacques and Fontaine du Palmier, South-East View 140207 1.jpg | 1. Tour Saint-Jacques and Fontaine du Palmier, South-East View 140207 1.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [287] Tour Saint-Jacques on Pariisin keskustassa seisova kellotorni, joka jäi jäljelle kirkosta, jonka vallankumous myi louhokseksi. Torni rakennettiin 1509–1523 keskiaikaisen Saint-Jacques-de-la-Boucherien kirkon kellotorniksi Grande Boucherien, Pariisin teurastajien kaupunginosan, keskelle.
2. [405] 1790-luvun vallankumouksessa kirkko myytiin louhokseksi, ja sen kivet kelpasivat rakennusaineeksi. Kellotorni säästyi: kaupan ehtona kerrotaan olleen, ettei tornia saa purkaa. Huipulla seisonut pyhä Jaakob tuhoutui, ja nykyinen patsas on tehty 1800-luvulla. Vuonna 1836 Pariisin kaupunki osti tornin, ja 1850-luvulla sen ympärille tehtiin puisto, kun Haussmannin työt avasivat Rue de Rivolin tornin eteen.
3. [283] Torniin perustettiin sääasema vasta 1891. Tornin juurella on Blaise Pascalin patsas, koska hänen kerrotaan tehneen tornissa ilmanpainekokeita, vaikka asiasta kiistellään. Nykyään tornin juurelta alkaa yhä Via Turonensis, yksi Santiago de Compostelaan vievistä pyhiinvaellusreiteistä.

**ENNEN:**

1. [319] Tour Saint-Jacques rakennettiin 1509–1523, ja se on ainoa jäljelle jäänyt osa keskiaikaisesta Saint-Jacques-de-la-Boucherien kirkosta. Kirkko seisoi Grande Boucherien, Pariisin teurastajien kaupunginosan, keskellä. Tornin juurelta alkaa yhä Via Turonensis, yksi Santiago de Compostelaan vievistä pyhiinvaellusreiteistä.
2. [353] Vallankumouksen vuosina kirkko myytiin louhokseksi, ja sen kivet kelpasivat rakennusaineeksi. Kellotorni säästyi: kaupan ehtona kerrotaan olleen, ettei tornia saa purkaa. Vuonna 1836 Pariisin kaupunki osti tornin, ja 1850-luvulla sen ympärille tehtiin puisto, kun Haussmannin työt avasivat Rue de Rivolin ja Boulevard de Sébastopolin juuri tornin eteen.
3. [328] Huipulla seisoo pyhä Jaakob pyhiinvaeltajana. Alkuperäinen patsas syöstiin alas vallankumouksen aikana, ja nykyinen on 1800-luvun jäljennös. Tornin juurella on Blaise Pascalin patsas, koska hänen sanotaan tehneen tornissa ilmanpainekokeita — tosin historioitsijat ovat tästä eri mieltä. Sääasema perustettiin torniin vasta 1891.

### Saint-Eustache

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Saint-Eustache | Saint-Eustache |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Goottilainen kirkko renessanssiasussa** (37 merkkiä) |
| Kappaleita / merkkejä | 3 / 988 | 3 / 727 |
| Vuosirivit | 1532 rakennus alkoi · 1637 vihittiin · 1754 julkisivutyö alkoi · 1969 tori Rungisiin · 1213 kappeli | 1532 rakennus alkoi · 1637 vihittiin · 1649 Ludvigin ehtoollinen · 1754 julkisivutyö alkoi · 1969 tori Rungisiin |
| Kuvat | 1. Saint Eustache.jpg | 1. Saint Eustache.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [257] Saint-Eustache on Pariisin kirkko, jonka rakenne on goottilaista mutta koristeet renessanssia. Paikalla oli 1200-luvun alussa rakennettu vaatimaton kappeli. Uutta kirkkoa alettiin rakentaa vuonna 1532, ja se vihittiin vuonna 1637, yli sata vuotta myöhemmin.
2. [290] Kirkossa on kastettu Richelieu ja Molière, ja nuori Ludvig XIV kävi siellä ensimmäisellä ehtoollisellaan 1649. Länsijulkisivua alettiin rakentaa uudelleen vuonna 1754, mutta uusi julkisivu jäi kesken. 1790-luvun vallankumouksessa kirkko suljettiin ja siitä tehtiin Maanviljelyksen temppeli.
3. [180] Arkkitehti Victor Baltard johti kirkon korjausta 1800-luvun puolivälissä. Kirkko seisoo Les Hallesin, Pariisin entisen ruokatorin, vieressä: tori siirrettiin Rungisiin vuonna 1969.

**ENNEN:**

1. [153] Saint-Eustachea alettiin rakentaa vuonna 1532, ja kirkko vihittiin vuonna 1637. Länsijulkisivu on myöhempi: sitä alettiin rakentaa uudelleen vuonna 1754.
2. [323] Kirkko seisoo Les Hallesin, Pariisin entisen ruokatorin, vieressä; tori siirrettiin Rungisiin vuonna 1969. Kirkon paikalla oli ennen vaatimaton kappeli vuodelta 1213, mutta seurakunta kasvoi ja kappeli kävi pieneksi. Rakentaminen kesti yli sata vuotta, ja tulos on sekoitus: rakenne on goottilaista, koristeet renessanssia.
3. [512] Julkisivun uusimiseen johti Colbert, seurakuntalainen, joka hoiti kirkon raha-asioita ja josta tuli myöhemmin Ludvig XIV:n ministeri: hän rakennutti tornien alle kaksi kappelia, ja julkisivu heikkeni niin, että se piti purkaa. Uusi julkisivu jäi kesken. Täällä on kastettu Richelieu ja Molière, ja nuori Ludvig XIV kävi täällä ensimmäisellä ehtoollisellaan 1649. Vallankumouksessa kirkko suljettiin ja siitä tehtiin Maanviljelyksen temppeli. Arkkitehti Victor Baltard johti sen korjausta 1800-luvun puolivälissä.

### Pompidou-keskus

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Pompidou-keskus | Pompidou-keskus |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Talo, jonka putket ovat ulkona** (30 merkkiä) |
| Kappaleita / merkkejä | 3 / 897 | 3 / 982 |
| Vuosirivit | 1972 rakennus alkoi · 1977 avattiin · 2000 peruskorjaus valmis · 2030 suunniteltu avaus | 1970–1971 arkkitehtikilpailu · 1972 rakennus alkoi · 1977 avattiin · 2000 peruskorjaus valmis · 2030 suunniteltu avaus |
| Kuvat | ei kuvaa | ei kuvaa (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [340] Pompidou-keskus on Pariisin nykytaiteen keskus, jonka putket, portaat ja hissit on viety rakennuksen ulkopuolelle. Se on nimetty Ranskan presidentin Georges Pompidoun mukaan. Vuosina 1970–1971 sen suunnittelusta järjestettiin kansainvälinen arkkitehtikilpailu, jonka voittivat italialainen Renzo Piano ja britti Richard Rogers työryhmineen.
2. [345] Rakennustyöt alkoivat vuonna 1972. Voittajat veivät rakenteet ja kulkureitit ulkopuolelle, jotta sisälle jäisi vapaita tasoja. Putket on maalattu käyttönsä mukaan: ilma on sininen, vesi vihreä, sähkö keltainen ja kulku eli liukuportaat ja hissit punainen. Rakennus vei vain puolet tontista, ja toinen puoli jäi aukioksi, jota sanotaan piazzaksi.
3. [297] Keskus avattiin vuonna 1977. Talossa on nykytaiteen museo ja yleinen kirjasto, ja musiikin ja äänen tutkimuskeskus IRCAM toimii viereisessä rakennuksessa. Ensimmäinen peruskorjaus päättyi vuonna 2000. Nykyään talo on suljettu uuteen peruskorjaukseen, ja sen on määrä avautua uudelleen vuonna 2030.

**ENNEN:**

1. [310] Pompidou-keskuksen rakennustyöt alkoivat vuonna 1972, ja keskus avattiin vuonna 1977. Keskus on nimetty Ranskan presidentin Georges Pompidoun mukaan, ja sen suunnittelusta järjestettiin 1970–1971 kansainvälinen arkkitehtikilpailu, jonka voittivat italialainen Renzo Piano ja britti Richard Rogers työryhmineen.
2. [322] Voittajat veivät rakenteet, putket, portaat ja hissit ulkopuolelle, jotta sisälle jäisi vapaita tasoja. Putket on maalattu käyttönsä mukaan: ilma on sininen, vesi vihreä, sähkö keltainen ja kulku — liukuportaat ja hissit — punainen. Rakennus vei vain puolet tontista, ja toinen puoli jäi aukioksi, jota sanotaan piazzaksi.
3. [265] Talossa on nykytaiteen museo ja yleinen kirjasto; musiikin ja äänen tutkimuskeskus IRCAM toimii viereisessä rakennuksessa. Ensimmäinen peruskorjaus päättyi vuonna 2000. Nykyään talo on suljettu uuteen peruskorjaukseen, ja sen on määrä avautua uudelleen vuonna 2030.

### Place des Vosges

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Place des Vosges | Place des Vosges |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Aukio, jota kuningas ei nähnyt** (30 merkkiä) |
| Kappaleita / merkkejä | 3 / 721 | 3 / 780 |
| Vuosirivit | 1612 vihkiäiset · 1800 nimi vaihtui | 1610 Henrik IV murhattiin · 1612 vihkiäiset · 1800 nimi vaihtui · 1832 Victor Hugo muutti |
| Kuvat | 1. Paris Place des Vosges Arkaden 1.jpg | 1. Paris Place des Vosges Arkaden 1.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [312] Place des Vosges on Pariisin vanhin suunniteltu aukio, jonka tilaaja ei elänyt nähdäkseen sitä valmiina. Kuningas Henrik IV määräsi sen rakennettavaksi hovin juhlien ja kävelyn paikaksi, mutta hänet murhattiin vuonna 1610. Aukio vihittiin vuonna 1612 Ludvig XIII:n ja Anna Itävaltalaisen kihlajaisten yhteydessä.
2. [266] Aukiota ympäröi 36 samanmallista taloa, yhdeksän joka sivulla, ja kaikilla on samanlainen punatiilinen julkisivu ja jyrkkä katto. Korkeampina erottuvat kuninkaan ja kuningattaren paviljongit etelä- ja pohjoislaidalla. 1600-luvulla aukiolla järjestettiin turnajaisia.
3. [202] Aukio sai nimen Place des Vosges vuonna 1800 Vosgesin departementin mukaan, ja sitä oli ennen kutsuttu nimellä Place Royale. Vuodesta 1832 aukion laidalla asui kuusitoista vuotta kirjailija Victor Hugo.

**ENNEN:**

1. [302] Place des Vosges on Pariisin vanhin aukio. Se rakennettiin kuningas Henrik IV:n määräyksestä hovielämän julkiseksi keskukseksi, mutta valmistui vasta kuninkaan kuoleman jälkeen — vihkiäisiä vietettiin 1612 Ludvig XIII:n ja Anna Itävaltalaisen häiden yhteydessä, eikä kuningaspari koskaan asunut siellä.
2. [266] Aukiota ympäröi 36 kolmikerroksista taloa, yhdeksän joka sivulla, ja kaikilla on samanlainen punatiilinen julkisivu ja aumakatto. Korkeampina erottuvat kuninkaan ja kuningattaren paviljongit etelä- ja pohjoislaidalla. 1600-luvulla aukiolla järjestettiin turnajaisia.
3. [153] Nimi oli Place Royale vuoteen 1800, jolloin se vaihdettiin Vosgesin departementin mukaan. Aukion laidalla asui kuusitoista vuotta kirjailija Victor Hugo.

### Invalidit

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Invalidit | Invalidit |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Koti sodan haavoittamille** (25 merkkiä) |
| Kappaleita / merkkejä | 3 / 1121 | 3 / 996 |
| Vuosirivit | 1670 kuningas määräsi · 1674 ensimmäiset asukkaat · 1789 kiväärit viety · 1840 jäännökset tuotiin · 1861 keisari siirrettiin | 1670 kuningas määräsi · 1674 ensimmäiset asukkaat · 1789 kiväärit viety · 1840 jäännökset tuotiin · 1861 keisari siirrettiin |
| Kuvat | 1. Hôtel des Invalides, North View, Paris 7e 140402 1.jpg; 2. Tomb of Napoleon by Auguste Gérardin 1896.jpg | 1. Hôtel des Invalides, North View, Paris 7e 140402 1.jpg; 2. Tomb of Napoleon by Auguste Gérardin 1896.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [432] Invalidit eli Les Invalides rakennettiin kodiksi sotilaille, jotka sodat olivat jättäneet haavoittuneina ja vanhentuneina kerjäämään Pariisin kaduille. Vuonna 1670 kuningas määräsi kodin rakennettavaksi, ja Libéral Bruantin suunnittelemaan taloon muuttivat ensimmäiset asukkaat jo 1674. Talo oli kuin pieni kaupunki: parhaimmillaan siellä asui useita tuhansia entisiä sotilaita, ja verstaissa tehtiin kenkiä, sukkia ja kuvakudoksia.
2. [178] Heinäkuun 14. päivän aamuna 1789 kansanjoukko tunkeutui Invalideihin ja vei asevarastosta noin 30 000 kivääriä. Ruutia ei juuri löytynyt, ja sitä lähdettiin hakemaan Bastiljista.
3. [386] Vuonna 1840 Napoleonin jäännökset tuotiin Saint Helenan saarelta, ja Hardouin-Mansartin kullatun kupolin alle rakennettiin avoin krypta. Sarkofagi veistettiin punaisesta kvartsiitista, joka louhittiin Äänisjärven rannalta Karjalasta, ja keisari siirrettiin siihen 1861. Veteraanien kodista on jäljellä yhä toimiva sairaala ja hoitokoti, ja käytävillä kulkevat nyt armeijamuseon kävijät.

**ENNEN:**

1. [466] Ludvig XIV:n sodat jättivät jälkeensä tuhansia haavoittuneita ja vanhentuneita sotilaita, jotka päätyivät kerjäämään Pariisin kaduille. Vuonna 1670 kuningas määräsi rakennettavaksi heille kodin, ja Libéral Bruantin suunnittelemaan taloon muuttivat ensimmäiset asukkaat jo 1674. Parhaimmillaan siellä asui noin 4 000 entistä sotilasta. Talo oli kuin pieni kaupunki: asukkaat tekivät verstaissa kenkiä, univormuja ja kuvakudoksia, ja heillä oli oma sairaala ja kirkko.
2. [303] Kuninkaalle rakennettiin vielä oma kirkko, Jules Hardouin-Mansartin Dôme des Invalides, jonka kullattu kupoli nousee 107 metriin. Heinäkuun 14. päivän aamuna 1789 kansanjoukko tunkeutui Invalideihin ja vei asevarastosta lähes 30 000 kivääriä. Ruutia ei löytynyt, ja sitä lähdettiin hakemaan Bastiljista.
3. [352] Vuonna 1840 Napoleonin jäännökset tuotiin Saint Helenan saarelta, ja kupolin alle kaivettiin avoin krypta. Sarkofagi veistettiin punaisesta kvartsiitista, joka louhittiin Äänisjärven rannalta Karjalasta; keisari siirrettiin siihen 1861. Tuhansien veteraanien kodista on jäljellä enää pieni hoitolaitos, ja käytävillä kulkevat nyt armeijamuseon kävijät.

### Petit Palais

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Petit Palais | Petit Palais |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Pieni palatsi, joka jäi** (23 merkkiä) |
| Kappaleita / merkkejä | 3 / 885 | 3 / 720 |
| Vuosirivit | 1897 työ alkoi · 1900 valmistui · 1902 kaupungin museo · 1903–1925 koristetyöt · 1975 suojeltu | 1897 työ alkoi · 1900 valmistui · 1902 kaupungin museo · 1975 suojeltu |
| Kuvat | 1. Petit Palais, Paris 8th 003.JPG | 1. Petit Palais, Paris 8th 003.JPG (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [313] Petit Palais eli pieni palatsi rakennettiin maailmannäyttelyyn, mutta toisin kuin monet näyttelyn rakennukset, sen oli tarkoitus jäädä pysyväksi taidemuseoksi. Arkkitehti Charles Girault aloitti työn Champs-Élysées’n tuntumassa, Grand Palais’ta vastapäätä, lokakuussa 1897, ja rakennus valmistui huhtikuussa 1900.
2. [218] Vuonna 1902 siitä tuli Pariisin kaupungin kuvataidemuseo, ja samana vuonna museo sai Dutuitin veljesten keräämän taidekokoelman. Julkisivun päätyä koristaa Jean Antoine Injalbertin veistämä Pariisi muusien ympäröimänä.
3. [189] Rakennuksen keskellä on puoliympyrän muotoinen pylväskäytävä, joka avautuu puutarhaan. Koristeissa on kullattua metallia. Rakennus on ollut suojeltu historiallinen monumentti vuodesta 1975.

**ENNEN:**

1. [314] Petit Palais rakennettiin vuoden 1900 maailmannäyttelyyn Champs-Élysées’n tuntumaan, Grand Palais’ta vastapäätä. Arkkitehti Charles Girault aloitti työn 10. lokakuuta 1897, ja rakennus valmistui huhtikuussa 1900. Toisin kuin monet näyttelyn rakennukset, sen oli alusta asti tarkoitus jäädä pysyväksi taidemuseoksi.
2. [250] Vuonna 1902 siitä tuli Pariisin kaupungin kuvataidemuseo. Samana vuonna museolle tuli Dutuitin veljesten lahjoittama keskiajan ja renessanssin teosten kokoelma. Julkisivun päätyä koristaa Jean Antoine Injalbertin veistämä Pariisi muusien ympäröimänä.
3. [321] Rakennuksen keskellä on puoliympyrän muotoinen pylväskäytävä, joka avautuu puutarhaan. Sen pylväät ovat vaaleanpunaista Vosgesien graniittia, ja koristeissa on kullattua pronssia. Koristemaalaukset ja -veistokset valmistuivat vasta vuosina 1903–1925, ja rakennus on ollut suojeltu historiallinen monumentti vuodesta 1975.

### Tour Montparnasse

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Tour Montparnasse | Tour Montparnasse |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Torni vanhan aseman paikalla** (28 merkkiä) |
| Kappaleita / merkkejä | 3 / 900 | 3 / 859 |
| Vuosirivit | 1895 veturi seinän läpi · 1969–1973 rakennettiin · 2011 korkein vuoteen | 1895 veturi seinän läpi · 1969–1973 rakennettiin · 2011 korkein vuoteen |
| Kuvat | 1. Train wreck at Montparnasse 1895.jpg; 2. Paris 75006 Jardin du Luxembourg - Tour Montparnasse.jpg | 1. Train wreck at Montparnasse 1895.jpg; 2. Paris 75006 Jardin du Luxembourg - Tour Montparnasse.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [294] Tour Montparnasse on Pariisin kantakaupungin korkein pilvenpiirtäjä, ja sen paikalla seisoi ennen rautatieasema, jonka seinästä veturi syöksyi kadulle. Lokakuussa 1895 Granvillestä tullut juna ei pysähtynyt ajoissa, ja veturi jäi seisomaan nokka alaspäin. Onnettomuudesta jäi kuuluisa valokuva.
2. [204] Vanha asema purettiin 1960-luvulla, ja uusi rakennettiin hieman etelämmäs. Tilalle nousi vuosina 1969–1973 Tour Montparnasse, noin 210 metriä ja 59 kerrosta. Tumma lasijulkisivu oli koristeeton ja ankara.
3. [361] Pariisilaiset eivät pitäneet tornista. Muutama vuosi sen valmistumisen jälkeen keskustan uusien rakennusten korkeutta alettiin rajoittaa, eikä vastaavaa nostettu enää vanhaan Pariisiin. Usein toistetun sanonnan mukaan kaupungin kaunein näköala avautuu tornin huipulta, koska sieltä ei näe itse tornia. Torni oli Ranskan korkein pilvenpiirtäjä vuoteen 2011 asti.

**ENNEN:**

1. [331] Tornin paikalla seisoi vanha Montparnassen rautatieasema. Lokakuussa 1895 Granvillestä tullut juna ei pysähtynyt ajoissa: veturi syöksyi raiteiden päästä aseman seinän läpi ja jäi roikkumaan nokka alaspäin kadulle. Valokuva onnettomuudesta kiersi maailmaa. Vanha asema purettiin 1960-luvulla, ja uusi rakennettiin hieman etelämmäs.
2. [236] Tilalle nousi vuosina 1969–1973 Tour Montparnasse, 210 metriä ja 59 kerrosta. Se oli Ranskan korkein rakennus vuoteen 2011 asti. Tumma lasi- ja teräsjulkisivu edusti sodanjälkeistä kansainvälistä tyyliä, jossa koristeet karsittiin pois.
3. [333] Pariisilaiset eivät pitäneet tornista. Muutama vuosi sen valmistumisen jälkeen keskustan uusien rakennusten korkeus rajattiin 25 metriin ja reuna-alueilla 31–37 metriin, eikä vastaavaa nostettu enää vanhaan Pariisiin. Usein toistetun sanonnan mukaan kaupungin kaunein näköala avautuu tornin huipulta, koska sieltä ei näe itse tornia.

### Metro 1900

| | ENNEN | NYT |
|---|---|---|
| Otsikko (kartan nimi) | Metro 1900 | Metro 1900 |
| Tarinarivi | ei kenttää nähtävyysjutulla | EHDOTUS: **Sisäänkäynnit kuin rakennussarja** (32 merkkiä) |
| Kappaleita / merkkejä | 1 / 513 | 3 / 734 |
| Vuosirivit | 1900 metro avattiin · 1978 valtaosa suojeltiin | 1900 metro avattiin · 1978 valtaosa suojeltiin |
| Kuvat | 1. 01 Guimard's Métropolitain.jpg | 1. 01 Guimard's Métropolitain.jpg (ennallaan; avauskappaleen jälkeen) |

**NYT:**

1. [379] Pariisin metron kuuluisat sisäänkäynnit teki arkkitehti, joka ei ollut edes osallistunut niiden suunnittelukilpailuun. Metro avattiin maailmannäyttelyn aikaan 19. heinäkuuta 1900, ja ensimmäinen linja yhdisti Porte de Vincennes’in ja Porte Maillot’n. Sisäänkäynneistä oli järjestetty arkkitehtikilpailu, johon Guimard ei osallistunut, ja työ annettiin lopulta Hector Guimardille.
2. [226] Guimard piirsi valurautaisia vakio-osia, jotka sopivat yhteen kuin rakennussarja: samoista paloista sai kasattua sopivan sisäänkäynnin mihin tahansa kadunkulmaan. Hänen tyylinsä oli jugendia, ja sisäänkäyntejä tehtiin yli 140.
3. [129] Sitten tyyli meni pois muodista ja monet sisäänkäynnit purettiin. Jäljellä on noin 90, ja valtaosa niistä suojeltiin vuonna 1978.

**ENNEN:**

1. [513] Pariisin metro avattiin 19. heinäkuuta 1900. Sisäänkäynneistä oli järjestetty arkkitehtikilpailu, mutta yksikään 21 ehdotuksesta ei kelvannut, ja työ annettiin Hector Guimardille, joka ei ollut edes osallistunut kilpailuun. Hän piirsi valurautaisia vakio-osia, jotka sopivat yhteen kuin rakennussarja: samoista paloista sai kasattua sopivan sisäänkäynnin mihin tahansa kadunkulmaan. Niitä tehtiin 167. Sitten tyyli meni pois muodista ja puolet purettiin. Jäljellä on 88, ja valtaosa niistä suojeltiin vuonna 1978.

## 5. M3: lähdetaulukot (luonnoksen 1. kierros; EPÄVARMA/EI-väitteet korjattu tekstiin, ks. luku 3)

Liitteet A–D alla.

### Liite A: Riemukaari, Concorde, Luxembourg, Sacré-Cœur

# Lähdetaulukko A: Riemukaari, Concorden aukio, Luxembourgin puisto, Sacré-Cœur

Tarkistettu 20.11.2026. Kaikki URLit on avattu WebFetchillä, ellei merkitty "(haku)": silloin väite näkyi vain hakutuloksen tiivistelmässä (sivu antoi 403 tai en saanut sitä auki).
Merkinnät: OK = kaksi itsenäistä lähdettä tukee; EPÄVARMA = yksi lähde tai lähteet eroavat; EI = lähde ristiriidassa.
Lyhenteet: EN-wiki = en.wikipedia.org, FR-wiki = fr.wikipedia.org (Wikipedia on aina vain toinen lähde).

---

## 1. Riemukaari

Yhteenveto: 11 OK, 2 EPÄVARMA, 0 EI.

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| 1 | Lähes 50 m korkea | https://www.napoleon.org/histoire-des-2-empires/articles/la-curieuse-histoire-de-larc-de-triomphe/ ("près de cinquante mètres de haut") | https://www.pariszigzag.fr/insolite/histoire-insolite-paris/arc-de-triomphe-etoile-paris/ ("50 mètres de haut"); myös sortiraparis "environ 50 m"; EN-wiki/FR-wiki 49,54 m | OK | 49,54 m (CMN, Wikipedia) = "lähes 50" oikein |
| 2 | Napoleon ei nähnyt kaarta valmiina | https://www.completefrance.com/travel/iconic-landmarks-the-story-behind-paris-arc-de-triomphe/ ("never saw the finished Arc", kuoli 1821, 15 v ennen valmistumista) | https://www.napoleon.org/en/magazine/places/arc-de-triomphe-de-letoile-paris-2/ (valmis/vihitty 29.7.1836; Napoleonin ruumisvaunut kulkevat kaaren alta vasta 15.12.1840). Ei suoraa lausetta, päätelmä aikajanasta | OK | Napoleon kuoli 1821, vihkiäiset 1836. Hän näki puisen mallin 1810 (napoleon.org), ei valmista kaarta |
| 3 | Käski rakentaa 1806 Austerlitzin voiton kunniaksi | https://www.paris-arc-de-triomphe.fr/en/discover/genesis-and-first-stone (virallinen: päätös 18.2.1806, Napoleon käski ministeriä aloittaa kaaren Austerlitzin jälkeisenä päivänä 1805) | https://www.napoleon.org/histoire-des-2-empires/articles/la-curieuse-histoire-de-larc-de-triomphe/ (asetus 18.2.1806; Austerlitzin julistus "sous des arcs de triomphe") | OK | Ensimmäinen kivi 15.8.1806 (EN-wiki: 6.8., lähteet eroavat; ei tekstissä) |
| 4 | Valmis vasta 1836 | https://www.sortiraparis.com/arts-culture/histoire-patrimoine/articles/211414-l-arc-de-triomphe-le-monument-emblematique-en-haut-des-champs-elysees ("inauguré en 1836", 29.7.1836) | https://www.paris-arc-de-triomphe.fr/decouvrir/histoire-de-l-arc-de-triomphe ("de 1806 à 1836", inauguré 29.7.1836) | OK | napoleon.org: rakenne valmis 1830, vihkiäiset 1836. "Valmistui 1836" on vakiintunut |
| 5 | 158 taistelun nimet | https://www.napoleon.org/magazine/livres/les-noms-graves-sur-larc-de-triomphe/ (Fondation Napoléon: "660 noms de héros ... et 158 noms de bataille ou de siège") | https://en.wikipedia.org/wiki/Arc_de_Triomphe ("names of 158 battles"); erittely 96+32+30 https://www.frenchempire.net/articles/arcbattles (haku) | OK | Kolmas luku vaihtelee lähteissä: napoleon.org-matkaopas "128 taistelua holvissa" + 30 kilpeä = 158. Wikipedia voi nojata samaan Drivyyn, joten itsenäisyys heikko mutta lähteet eri tahoja |
| 6 | 660 sotapäällikön nimet | https://www.napoleon.org/magazine/livres/les-noms-graves-sur-larc-de-triomphe/ ("660 noms de héros", valikoima yli 2 200 kenraalista ja amiraalista) | https://www.pariszigzag.fr/insolite/histoire-insolite-paris/arc-de-triomphe-etoile-paris/ ("660 noms", joista "653 noms de généraux"); EN-wiki "660 military leaders" | OK | Tarkka kenraalimäärä 653 / 558 vaihtelee, joten "sotapäällikkö" on turvallinen sana |
| 7 | Godefroy lensi 1919 kaksitasokoneella kaaren läpi | https://www.pariszigzag.fr/?p=419 (torstai 7.8.1919, "biplan Nieuport 11") | https://www.air-journal.fr/2020-08-07-le-7-aout-1919-dans-le-ciel-larc-de-triomphe-franchit-par-un-aviateur-5221925.html (7.8.1919, "biplan Nieuport XVII"); myös https://migflug.com/afterburner/charles-godefroy-arc-de-triomphe-1919/ ja EN-wiki | OK | Koneen malli vaihtelee (Nieuport 11/17/27), tekstissä ei mainita mallia: hyvä |
| 8 | Aukko "reilut 14 m" leveä | https://www.pariszigzag.fr/?p=419 ("large de 14,60m et haute de 29 m") | https://www.air-journal.fr/2020-08-07-le-7-aout-1919-dans-le-ciel-larc-de-triomphe-franchit-par-un-aviateur-5221925.html ("14,62 mètres de largeur"); EN-wiki/FR-wiki 14,62 m; migflug "roughly 14 m" | OK | Ilmailulähde antaa korkeudeksi 29 m, ei tekstissä |
| 9 | "Muutamaa vuotta myöhemmin" (1919 -> sotilaan tuonti/hautaus) | (aikaväli laskettu lähteiden päivämääristä: 7.8.1919 -> 11.11.1920 = 15 kk; -> 28.1.1921 = 17 kk) | – | EPÄVARMA | Ei virhe lähteissä vaan ajanilmaus: "muutama vuosi" ylittää. Ehdotus: "Reilua vuotta myöhemmin" (102 merkkiä, alkuperäinen 113) |
| 10 | Nimetön ranskalaissotilas "muistoksi kaikista sodissa kadonneista" | https://www.paris-arc-de-triomphe.fr/decouvrir/le-soldat-inconnu (virallinen: "honore l'ensemble des combattants tombés pendant la Première Guerre mondiale", "mémoire de millions d'hommes") | https://en.wikipedia.org/wiki/Tomb_of_the_Unknown_Soldier_(France) (1. maailmansodan tuntematon sotilas) | EPÄVARMA | Lähteet sanovat ensimmäisen maailmansodan kaatuneet; "kaikista sodissa kadonneista" on laajennus. Ehdotus: "muistoksi sodassa kaatuneista" (lyhyempi) tai "ensimmäisen maailmansodan kaatuneiden muistoksi" |
| 11 | Tuotiin kaaren alle 11.11.1920 | https://fr.wikipedia.org/wiki/Arc_de_triomphe_de_l'Étoile ("installée sous l'arc ... le 11 novembre 1920") | https://www.connexionfrance.com/magazine/what-is-the-history-behind-pariss-tomb-of-the-unknown-soldier/104700 ("coffin arrived at the Arc de Triomphe on November 11, 1920"); virallinen sivu: 11.11.1920 hautajaiskulkue | OK | Arkku oli yön Denfert-Rochereaun lähellä kappelissa (virallinen sivu); 10.11. ei tarvita |
| 12 | Haudattiin 28.1.1921 | https://www.paris-arc-de-triomphe.fr/decouvrir/le-soldat-inconnu ("inhumation définitive le 28 janvier 1921") | https://www.connexionfrance.com/magazine/what-is-the-history-behind-pariss-tomb-of-the-unknown-soldier/104700 ("January 28, 1921"); EN-wiki, FR-wiki | OK | |
| 13 | Ikuinen liekki "sytytetään uudelleen joka ilta" | https://www.paris-arc-de-triomphe.fr/decouvrir/le-soldat-inconnu ("chaque soir, à 18h30, la Flamme est ravivée"; ensisytytys 11.11.1923 Maginot) | https://www.sortiraparis.com/arts-culture/histoire-patrimoine/articles/211414-l-arc-de-triomphe-le-monument-emblematique-en-haut-des-champs-elysees ("ravivée" joka ilta 18.30); FR-wiki; connexionfrance | OK | "Sytytetään uudelleen" = "ravivée" (virittäminen uudelleen), liekki ei sammu |

---

## 2. Concorden aukio

Yhteenveto: 13 OK, 1 EPÄVARMA, 0 EI.

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| 1 | Pariisin suurin aukio | https://www.paris.fr/pages/la-concorde-une-place-aux-multiples-facettes-22106 ("La plus grande place de Paris", 8,64 ha) | https://en.wikipedia.org/wiki/Place_de_la_Concorde ("the largest square in the city", 7,6 ha); Britannica "largest public square in the French capital" (haku) | OK | Pinta-ala 7,6 / 8,64 ha vaihtelee, ei tekstissä |
| 2 | Paikalla mestattiin kuningas | https://parcoursrevolution.paris.fr/en/points-of-interest/44-the-guillotine (Ludvig XVI mestattu 21.1.1793 aukion toisella puolella) | https://en.wikipedia.org/wiki/Place_de_la_Concorde (21.1.1793) | OK | |
| 3 | Gabriel suunnitteli 1700-luvulla Ludvig XV:n kunniaksi | https://www.paris.fr/pages/la-concorde-une-place-aux-multiples-facettes-22106 ("inaugurée en 1772 en l'honneur de Louis XV ... Jacques-Ange Gabriel") | https://en.wikipedia.org/wiki/Place_de_la_Concorde (rakennettu 1757-1772, Gabrielin hanke 1758) | OK | Nimen muoto: Ange-Jacques / Jacques-Ange vaihtelee. Ei vaikuta |
| 4 | Vallankumouksen aikana pystytettiin giljotiini | https://parcoursrevolution.paris.fr/en/points-of-interest/44-the-guillotine (Place de la Révolution 11.5.1793-9.6.1794) | https://parcoursrevolution.paris.fr/en/neighborhoods/12-the-place-de-la-concorde-and-its-neighborhood (sama; sama Pariisin kaupunki) + EN-wiki | OK | Molemmat Pariisin kaupungin sivuja. EN-wiki kolmantena |
| 5 | Ludvig XVI mestattiin 1793 | https://parcoursrevolution.paris.fr/en/points-of-interest/44-the-guillotine ("January 21, 1793") | https://en.wikipedia.org/wiki/Place_de_la_Concorde (21.1.1793) | OK | |
| 6 | Marie Antoinette samana vuonna | https://parcoursrevolution.paris.fr/en/neighborhoods/12-the-place-de-la-concorde-and-its-neighborhood ("Execution of Marie-Antoinette" 16.10.1793) | https://en.wikipedia.org/wiki/Place_de_la_Concorde (16.10.1793) | OK | |
| 7 | Yli tuhat teloitettua | https://parcoursrevolution.paris.fr/en/points-of-interest/44-the-guillotine ("More than a thousand people were executed here") | https://en.wikipedia.org/wiki/Place_de_la_Concorde (1 119 / 2 498 pariisilaisesta) | OK | Tarkka luku 1 119 on Wikipediassa |
| 8 | Marraskuussa 1830 Egyptin hallitsija lahjoitti Luxorin obeliskin | https://www.culture.gouv.fr/Regions/Drac-Ile-de-France/Actualites/Actualite-a-la-une/L-Obelisque-de-Louxor-fait-peau-neuve (tarjous 1829, Méhémet Ali "confirme son don en novembre 1830") | https://www.sortiraparis.com/arts-culture/histoire-patrimoine/articles/262297-ephemeride-du-25-octobre-a-paris-installation-de-l-obelisque-de-louxor-sur-la-place-de-la-concorde (lahjoitus 29.11.1830); FR-wiki sama | OK | EN-wiki Concorde: lahjatarjous 1829. Teksti OK, koska "lahjoitti marraskuussa 1830" = vahvisti. Jos halutaan tarkka: "vahvisti lahjoituksen" |
| 9 | Obeliski "yli 3 300 vuotta" vanha | https://www.sortiraparis.com/arts-culture/histoire-patrimoine/articles/262297-ephemeride-du-25-octobre-a-paris-installation-de-l-obelisque-de-louxor-sur-la-place-de-la-concorde ("vieux de 3300 ans") | https://en.wikipedia.org/wiki/Place_de_la_Concorde ("3,300-year-old"); culture.gouv.fr vain "XIIIe siècle av. J.-C." (= 3 200-3 300 v) | EPÄVARMA | Lähteet sanovat "3 300", eivät "yli". 1200-luku eKr. antaa n. 3 230-3 320. Ehdotus: "3 300 vuotta vanhan Luxorin obeliskin" (37 merkkiä, alkuperäinen 41) |
| 10 | Tuotiin laivalla Niililtä asti | https://www.culture.gouv.fr/Regions/Drac-Ile-de-France/Actualites/Actualite-a-la-une/L-Obelisque-de-Louxor-fait-peau-neuve (erikoisrakenteinen alus "Louxor" Luxorista Pariisiin) | https://www.paris.fr/pages/la-concorde-une-place-aux-multiples-facettes-22106 ("après un long voyage par bateau"); FR-wiki Obélisque de Louxor (Théba -> Aleksandria -> Rouen -> Seine, saapui 23.12.1833) | OK | Tarkkaan: lastattiin Thebassa Niilin rannalla |
| 11 | Pystytettiin 1836 väkijoukon seuratessa | https://www.culture.gouv.fr/Regions/Drac-Ile-de-France/Actualites/Actualite-a-la-une/L-Obelisque-de-Louxor-fait-peau-neuve (25.10.1836, "devant 200 000 personnes") | https://www.sortiraparis.com/arts-culture/histoire-patrimoine/articles/262297-ephemeride-du-25-octobre-a-paris-installation-de-l-obelisque-de-louxor-sur-la-place-de-la-concorde ("près de 200 000 Parisiens"); EN-wiki 25.10.1836 | OK | |
| 12 | Obeliski 23 m | https://www.culture.gouv.fr/Regions/Drac-Ile-de-France/Actualites/Actualite-a-la-une/L-Obelisque-de-Louxor-fait-peau-neuve ("23 mètres de hauteur") | https://fr.wikipedia.org/wiki/Obélisque_de_Louxor ("vingt-trois mètres de hauteur"); sortiraparis "23 mètres" | OK | Paris.fr sanoo 22 m; EN-wiki "23 m sisältäen jalustan" (virheellinen: jalusta lisäksi, huippu 33,37 m FR-wikin mukaan) |
| 13 | Obeliskin ympärillä suihkulähteet | https://www.paris.fr/pages/la-concorde-une-place-aux-multiples-facettes-22106 (kaksi suihkulähdettä vihitty 1840: Fleuves pohjoisessa, Mers etelässä) | https://en.wikipedia.org/wiki/Place_de_la_Concorde (kaksi suihkulähdettä, 9 m) | OK | "Poreilevat" ja "ympärillä" vapaata kieltä: ne ovat obeliskin pohjois- ja eteläpuolella. Vaihtoehto "kahden suihkulähteen välissä" |
| 14 | Kahdeksan naispatsasta, Ranskan suurkaupunkeja | https://www.paris.fr/pages/la-concorde-une-place-aux-multiples-facettes-22106 (huit statues "visage féminin des principales villes": Brest, Rouen, Bordeaux, Nantes, Lyon, Marseille, Lille, Strasbourg) | https://en.wikipedia.org/wiki/Place_de_la_Concorde ("eight statues representing the major cities of France", Pradier, Cortot) | OK | Brest/Rouen eivät ole nykyisin suurkaupunkeja, mutta lähteiden sana on "principales/major" |

---

## 3. Luxembourgin puisto

Yhteenveto: 11 OK, 5 EPÄVARMA, 1 EI. Suurin riski: hehtaariluvut ja "20 kuningatarta".

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| 1 | Kuningatar "ei viihtynyt Louvressa" | https://www.senat.fr/lng/en/the-luxembourg-palace/a-princely-residence.html (Marie tyytymätön "Louvre, still semi-medieval") | (ei toista itsenäistä; EN-wiki Luxembourg Palace ei mainitse syytä; italyonthisday.com vain mainitsee) | EPÄVARMA | Ehdotus (74 merkkiä, alk. 75): "Luxembourgin puiston loi Pariisiin kuningatar, joka kaipasi omaa palatsia." |
| 2 | Henrik IV murhattiin 1610 | https://www.senat.fr/lng/en/the-luxembourg-palace/a-princely-residence.html ("assassinated in 1610") | https://jardin.senat.fr/histoire-patrimoine/histoire.html ("décès d'Henri IV en 1610") ; Britannica (haku) 14.5.1610 | OK | Molemmat Senaatin sivuja. Britannica/Wikipedia kolmantena |
| 3 | Maria de' Medici jäi hallitsemaan poikansa puolesta | https://www.britannica.com/print/article/365073 (haku: Pariisin parlamentti nimesi hänet valtionhoitajaksi) | https://www.encyclopedia.com/history/encyclopedias-almanacs-transcripts-and-maps/marie-de-medicis-1573-1642 (haku) | OK | Regentti 1610-1617. Ei avattu sivuja suoraan, vain haun kautta |
| 4 | Osti 1612 Luxembourgin kartanon | https://www.senat.fr/lng/de/der-luxembourg-palast/ein-fuerstlicher-wohnsitz.html ("im Jahr 1612 ... Stadthaus von François de Luxembourg", 8 ha puisto) | https://en.wikipedia.org/wiki/Luxembourg_Palace ("bought the Hôtel de Luxembourg ... in 1612"); jardin.senat.fr history ("acquis le Petit Luxembourg en 1612") | OK | |
| 5 | Palatsi jäljitteli Palazzo Pittiä | https://www.senat.fr/lng/de/der-luxembourg-palast/ein-fuerstlicher-wohnsitz.html ("Nachbildung des Palazzo Pitti", mutta de Brosse otti vain muutaman viittauksen) | https://en.wikipedia.org/wiki/Luxembourg_Palace ("modeled after the Palazzo Pitti") | OK | Tarkoitus oli jäljitelmä, toteutus vapaa. Turvallinen vaihtoehto: "joka otti mallia ... Palazzo Pittistä" |
| 6 | Istutettiin 2 000 jalavaa | https://en.wikipedia.org/wiki/Jardin_du_Luxembourg ("about 2,000 elms") | https://jardin.senat.fr/en/botany/remarkable-trees.html (Marie istutti jalavia, ei lukua) | EPÄVARMA | Vain Wikipedia + matkailusivut antavat luvun. Ehdotus: "Puistoon istutettiin jalavia, ja" (32 merkkiä, alk. 38) |
| 7 | Tommaso Francini, firenzeläinen suihkulähdemestari | https://en.wikipedia.org/wiki/Tommaso_and_Alessandro_Francini ("Florentine hydraulics engineers", Luxembourgin vesijohto ja Medici-lähde) | https://fr.wikipedia.org/wiki/Jardin_du_Luxembourg (Francini, "ingénieur florentin"); Sorbonne-väitös (haku): Francini puistossa 1625 alkaen | OK | |
| 8 | Maisema sellaiseksi kuin kuningatar lapsena tuntenut | https://en.wikipedia.org/wiki/Jardin_du_Luxembourg ("in the Italian style she had known as a child in Florence") | https://www.senat.fr/lng/en/the-luxembourg-palace/a-princely-residence.html (Palazzo Pitti ja Boboli-puutarha, jossa hän kasvoi) | OK | |
| 9 | Alkuperäinen ala 8 ha | https://www.senat.fr/lng/de/der-luxembourg-palast/ein-fuerstlicher-wohnsitz.html ("Park von acht Hektar") | https://fr.wikipedia.org/wiki/Jardin_du_Luxembourg ("Les huit hectares de terrain qui entouraient la demeure") | OK | |
| 10 | Laajeni 30 ha:iin 1630-luvulla | https://en.wikipedia.org/wiki/Jardin_du_Luxembourg ("In 1630 ... thirty hectares") | https://jardin.senat.fr/histoire-patrimoine/histoire.html: Marien hankinnat 1614-1631 vastaavat nykyistä "23 hectares environ" | EPÄVARMA | Vain yksi lähde antaa 30 ha; Senaatti viittaa 23 ha:iin. Katso korjaus alla (rivi 12) |
| 11 | Vallankumouksen jälkeen 40 ha | https://en.wikipedia.org/wiki/Jardin_du_Luxembourg ("After the French Revolution ... forty hectares") | https://fr.wikipedia.org/wiki/Jardin_du_Luxembourg (kartusiaanien "26 hectares ... annexés"; nykyala 23 ha) | EPÄVARMA | Lähteet eroavat. Katso korjaus alla |
| 12 | Napoleon III:n katutyöt 1860-luvulla veivät noin 7 ha | https://jardin.senat.fr/en/history-heritage/history-of-the-garden.html ("Haussmann's renovations largely at the expense of the park", 1865 raja etelässä) | https://en.wikipedia.org/wiki/Jardin_du_Luxembourg (1865, "about seven hectares") | EPÄVARMA | Katutyöt OK (2 lähdettä), "noin 7 ha" vain EN-wiki; FR-geneawiki: 22 ha. **Korjaus rivien 10-12 virkkeille** (133 merkkiä, alk. 188): "Alun kahdeksasta hehtaarista puisto laajeni nykyiseen 23 hehtaariin. Napoleon III:n aikaiset katutyöt veivät 1860-luvulla osan siitä." (23 ha: jardin.senat.fr "23 hectares environ"; EN-wiki 23 ha; FR-wiki 23 ha) |
| 13 | Nukketeatteri vuodesta 1933 | https://fr.wikipedia.org/wiki/Jardin_du_Luxembourg (Théâtre des Marionnettes perustettu 1933) | https://wepa.unima.org/en/?p=6301 (haku: 1933 teatterin toimilupa Desarthisille); BnF-tietue (haku: 16.4.1933) | OK | WEPA ja BnF vain hakutiivistelmän kautta |
| 14 | Kahdeksankulmainen allas, lapset uittavat purjeveneitä | https://en.wikipedia.org/wiki/Jardin_du_Luxembourg ("octagonal Grand Bassin ... sail model boats") | https://fr.wikipedia.org/wiki/Jardin_du_Luxembourg (pääaltaalla "modèles réduits ... à voile"); Lonely Planet https://www.lonelyplanet.com/pois/372163 (haku: "octagonal Grand Bassin") | OK | Kahdeksankulmaisuutta ei avattu FR-wikissä, vaan EN-wiki + Lonely Planet (haku) |
| 15 | Patsaita toista sataa | https://jardin.senat.fr/en/history-heritage/heritage/the-gardens-statues.html ("102 statues") | https://fr.wikipedia.org/wiki/Jardin_du_Luxembourg ("106 statues") | OK | |
| 16 | "kaksikymmentä Ranskan kuningatarta" | https://jardin.senat.fr/en/history-heritage/heritage/the-gardens-statues.html (20 patsasta ryhmässä "Reines de France et Femmes Illustres"; mukana ei-kuningattaria, esim. Clémence Isaure ja Laure de Noves) | https://fr.wikipedia.org/wiki/Jardin_du_Luxembourg ("vingt statues Reines de France et Femmes illustres") | EI | Ryhmä on kuningattaria ja merkkinaisia, ei pelkkiä kuningattaria. Ehdotus (71 merkkiä, alk. 75): "Patsaita on toista sataa, muiden muassa 20 kuningatarta ja merkkinaista." |
| 17 | Senaatti kokoontuu palatsissa | https://www.senat.fr/connaitre-le-senat/patrimoine/lhistoire-du-palais-du-luxembourg.html (Vème République -senaatti 1958 alkaen) | https://en.wikipedia.org/wiki/Luxembourg_Palace ("home to the Senate of the Fifth Republic since 1958") | OK | |

---

## 4. Sacré-Cœur

Yhteenveto: 11 OK, 4 EPÄVARMA, 0 EI. Suurin riski: "travertiini", "77", "eikä koskaan tummu".

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| 1 | Montmartren kukkulan huipulla, rakennettu sodan jälkeen (laki 1873) | https://www.sacre-coeur-montmartre.com/decouvrir/notre-histoire/le-voeu-national/ (virallinen: vala 1870 tappion jälkeen) | https://en.wikipedia.org/wiki/Sacr%C3%A9-C%C5%93ur,_Paris (kansallinen lupaus, 1870-71) | OK | |
| 2 | Ranska hävisi sodan Preussille 1870 | https://www.sacre-coeur-montmartre.com/decouvrir/notre-histoire/le-voeu-national/ (8.12.1870 "défaite militaire de la France face à la Prusse") | https://en.wikipedia.org/wiki/Sacr%C3%A9-C%C5%93ur,_Paris (tappio Sedanissa 1870) | OK | Sota päättyi virallisesti 1871. Ehdotus lisävarmuuteen: "hävisi sodan Preussille 1870-1871"; nyt teksti OK |
| 3 | Abadie valittiin 77 ehdotuksen joukosta | https://en.wikipedia.org/wiki/Sacr%C3%A9-C%C5%93ur,_Paris ("chosen from 77 proposals") | https://www.paris.fr/pages/le-sacre-coeur-de-montmartre-qui-fete-ses-150-ans-n-a-pas-pris-une-ride-30567 ("parmi 78 propositions"); FR-wiki 78 | EPÄVARMA | Pariisin kaupunki ja FR-wiki: 78. Ehdotus: "lähes 80 ehdotuksen joukosta" (28 merkkiä, alk. 29 ja "peräti" pois) |
| 4 | Rakennustyöt alkoivat 1875 | https://www.sacre-coeur-montmartre.com/decouvrir/notre-histoire/les-grandes-etapes-de-la-construction/ (ensimmäinen kivi 1875) | https://www.paris.fr/pages/le-sacre-coeur-de-montmartre-qui-fete-ses-150-ans-n-a-pas-pris-une-ride-30567 ("Le 16 juin 1875, la première pierre est posée") | OK | |
| 5 | Valmistui 1914 | https://en.wikipedia.org/wiki/Sacr%C3%A9-C%C5%93ur,_Paris ("completed in 1914") | https://www.pariszigzag.fr/insolite/histoire-insolite-paris/construction-sacre-coeur-montmartre/ ("En 1914 ... les travaux sont finis"); virallinen sivu: kampanile 1912, vihkiäiset oli tarkoitus pitää 17.10.1914 | EPÄVARMA | FR-wiki: kirkko "virallisesti valmis 1923" (mosaiikki 1923). Ehdotus: "kirkko valmistui pääosin 1914" (+1 merkki; säästyy "peräti"-poistolla rivistä 3) |
| 6 | Vihittiin käyttöön 1919 | https://www.sacre-coeur-montmartre.com/decouvrir/notre-histoire/les-grandes-etapes-de-la-construction/ ("16 octobre 1919 : Consécration") | https://www.paris.fr/pages/le-sacre-coeur-de-montmartre-qui-fete-ses-150-ans-n-a-pas-pris-une-ride-30567 ("le 16 octobre 1919 qu'elle est officiellement consacrée") | OK | |
| 7 | Ulkoseinät "travertiini-kalkkikivestä" | https://www.pariszigzag.fr/insolite/histoire-insolite-paris/pourquoi-le-sacre-coeur-est-toujours-plus-blanc-au-fil-des-ans/ (Château-Landonin kivi, Souppes-sur-Loing; ei travertiinia) | https://fr.wikipedia.org/wiki/Basilique_du_Sacré-Cœur_de_Montmartre ("calcaire lacustre" Château-Landon; EN-wiki: "travertine limestone (Château-Landon type)") | EPÄVARMA | Tavallisessa ranskankielisessä kirjallisuudessa kivi on "calcaire de Château-Landon"; "travertin" vain EN-wikissä ja matkailusivuilla. Katso korjaus rivi 9 |
| 8 | Valkenee sateella | https://www.pariszigzag.fr/insolite/histoire-insolite-paris/pourquoi-le-sacre-coeur-est-toujours-plus-blanc-au-fil-des-ans/ (kivi erittää "calcin"-valkoista ainetta veden kosketuksesta, sade "refait une petite beauté") | https://www.france.fr/fr/article/sacre-coeur/ ("sous l'action de la pluie, blanchit de plus belle"); FR-wiki ja EN-wiki | OK | |
| 9 | "eikä koskaan tummu" | (ei lähdettä: pariszigzag sanoo vain, että calcin uusii valkoisuuden) | https://www.pariszigzag.fr/insolite/histoire-insolite-paris/sacre-coeur-paris/ | EPÄVARMA | Ei lähdettä "ei koskaan". **Korjaus rivien 7 ja 9 virkkeelle** (96 merkkiä, alk. 101): "Ulkoseinät on tehty erikoisesta kalkkikivestä, joka valkenee sateella ja pysyy siksi valkoisena." |
| 10 | "Yli sata vuotta vanha" | 1914/1919 (kts. rivit 5-6) | – | OK | 2026 - 1914 = 112 |
| 11 | "Yksi maailman suurimmista mosaiikeista" | https://www.paris.fr/pages/le-sacre-coeur-de-montmartre-qui-fete-ses-150-ans-n-a-pas-pris-une-ride-30567 ("surface de 475 mètres carrés", voi olla maailman suurin) | https://en.wikipedia.org/wiki/Sacr%C3%A9-C%C5%93ur,_Paris ("one of the largest mosaics in the world", 475 m2; "25 000 palaa" on sama lähde, ei enää tekstissä) | OK | FR-wiki: "plus grande de France", 473,78 m2. Lähteet eroavat vain pinta-alassa (473,78-475 m2). Jos halutaan varma muotoilu: "Ranskan suurin mosaiikki". Taiteilijat Merson, Magne, Martin, valmis 1923. Valittu "yksi maailman suurimmista" riittävän katettu |
| 12 | Savoyarde "lähes 19 t" | https://www.sacre-coeur-montmartre.com/decouvrir/patrimoine-et-art-sacre/la-savoyarde/ ("19 tonnes") | https://fr.wikipedia.org/wiki/Basilique_du_Sacré-Cœur_de_Montmartre (18 835 kg); EN-wiki 18 835 kg | OK | "Lähes 19" sopii 18 835 kg:aan |
| 13 | Ranskan suurin kello | https://www.sacre-coeur-montmartre.com/decouvrir/patrimoine-et-art-sacre/la-savoyarde/ ("C'est la plus grosse cloche de France !") | https://en.wikipedia.org/wiki/Sacr%C3%A9-C%C5%93ur,_Paris ("biggest bell in France"); FR-wiki sama | OK | "Suurin" = painavin |
| 14 | Kello tornissa | https://www.france.fr/fr/article/sacre-coeur/ (kello kampanilessa) | https://www.sacre-coeur-montmartre.com/decouvrir/notre-histoire/les-grandes-etapes-de-la-construction/ (kampanile valmis 1912) | OK | |
| 15 | Näkymä koko Pariisiin | https://www.sacre-coeur-montmartre.com/en/ (kupolikierros, "amazing view of Paris"); france.fr "vue imprenable sur Paris" | https://www.paris.fr/pages/le-sacre-coeur-de-montmartre-qui-fete-ses-150-ans-n-a-pas-pris-une-ride-30567 ("panorama improbable sur Paris"); EN-wiki | OK | Näkymä avautuu kupolin galleriasta, ei "kirkon huipulta" (83 m, france.fr) |

Huom: Sacré-Cœurissa 15 riviä, joista rivit 3, 5, 7, 9 EPÄVARMA; rivien 7 ja 9 korjaus on yhteinen virke.


### Liite B: Panthéon, Notre-Dame, Saint-Jacques, Saint-Eustache

# Lähdetaulukko B: Panthéon, Notre-Dame, Tour Saint-Jacques, Saint-Eustache

Tarkistettu 20.11.2026 verkosta. Merkintä (haku) = sisältö nähty vain hakutuloksen tiivistelmässä, sivua ei saatu auki (esim. Britannica palautti 403). Kaikki muut URLit on avattu ja luettu.

Lyhenteet: WP-en = en.wikipedia.org, WP-fr = fr.wikipedia.org.

## 1. Panthéon (16 väitettä, rivi P17 on vain yhteenveto: OK 12, EPÄVARMA 3, EI 1)

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| P1 | Ludvig XV sairastui vakavasti Metzissä 1744 (sotaretkellä) ja lupasi kirkon, jos paranee | https://www.herodote.net/Aux_grands_hommes_la_patrie_reconnaissante-article-14.php ("Gravement malade à Metz en 1744, le roi Louis XV fait le voeu, en cas de guérison, de reconstruire l'église Sainte-Geneviève") | https://fr.wikipedia.org/wiki/Panth%C3%A9on_de_Paris (kuningas sairastuu Metzissä 4.8.1744, lupaa kirkon Geneviève-pyhimykselle) | OK | WP-en mainitsee vain sairauden ja lupauksen, ei Metziä. "Sotaretkellä" on taustatieto (Metz 1744 = armeijan mukana), lähteissä vain "Metz". |
| P2 | Soufflot suunnitteli kirkon | https://www.cca.qc.ca/en/issues/9/let-us-assure-you/32749/the-political-life-of-a-building (1755 "Soufflot takes charge of design and construction") | https://en.wikipedia.org/wiki/Panth%C3%A9on,_Paris (Soufflot valittu 1755, kuoli 1780) ; Britannica (haku) https://www.britannica.com/biography/Jacques-Germain-Soufflot | OK | |
| P3 | Rakennustyöt alkoivat 1758 | https://en.wikipedia.org/wiki/Panth%C3%A9on,_Paris ("Foundations were laid in 1758") ; WP-fr: tontti siunattu 1.8.1758, perustukset sen jälkeen | https://www.britannica.com/topic/Pantheon-building-Paris-France (haku: "begun about 1757") ; herodote.net: Soufflot aloittaa 1755 ; WP-fr: työmaa alkaa 1757, peruskivi 6.9.1764 (CMN-aineisto sama 1764) | EPÄVARMA | Lähteet vaihtelevat 1755 / 1757 / 1758 / 1764 sen mukaan, mitä "alku" tarkoittaa. Ehdotus: "rakennustyöt alkoivat 1750-luvun lopulla" (tai "perustukset aloitettiin 1750-luvun lopulla, peruskivi laskettiin 1764"). Vuodet-rivi 'alkoivat 1758' pitää muuttaa vastaavasti ('1750-luvun lopulla' tai poistaa). |
| P4 | Soufflot kuoli 1780 | https://www.cca.qc.ca/en/issues/9/let-us-assure-you/32749/the-political-life-of-a-building ("Death of Soufflot" 1780) | https://fr.wikipedia.org/wiki/Panth%C3%A9on_de_Paris ("Soufflot mourut le 29 août 1780") ; WP-en | OK | |
| P5 | Rondelet sai kirkon valmiiksi 1790 | https://www.cca.qc.ca/en/issues/9/let-us-assure-you/32749/the-political-life-of-a-building (1790 "Rondelet completes the dome") | https://fr.wikipedia.org/wiki/Panth%C3%A9on_de_Paris ("achevé en 1790", Rondelet ja Brébion) ; WP-en (valmis 1790) | OK | Rondelet sai valmiiksi yhdessä Brébionin kanssa; CCA: kupoli. Sana "valmiiksi" kestää. |
| P6 | Kansalliskokous määräsi 1791 kirkon suurmiesten hautapaikaksi | https://www.cca.qc.ca/en/issues/9/let-us-assure-you/32749/the-political-life-of-a-building (4.4.1791, Constituent Assembly) | https://fr.wikipedia.org/wiki/Panth%C3%A9on_de_Paris (4.4.1791 "Panthéon des grands hommes") ; WP-en ("National Constituent Assembly") | OK | |
| P7 | Mirabeau ensimmäisenä kryptaan | https://en.wikipedia.org/wiki/Panth%C3%A9on,_Paris (4.4.1791, ensimmäinen) | https://parcoursrevolution.paris.fr/en/points-of-interest/109-to-the-great-men-a-grateful-homeland (Pariisin kaupunki: "first to enter the Panthéon in 1791") | OK | |
| P8 | Mirabeau kannettiin ulos "jo kuukausien kuluttua" | https://www.cca.qc.ca/en/issues/9/let-us-assure-you/32749/the-political-life-of-a-building (21.9.1794 Marat sisään, Mirabeau ulos) | https://parcoursrevolution.paris.fr/en/points-of-interest/109-to-the-great-men-a-grateful-homeland ("expelled three years later") ; WP-en (poistettu 1794) | EI | Ulos vasta noin kolme ja puoli vuotta myöhemmin (21.9.1794). Vain WP-fr sanoo "quelques mois plus tard", muut lähteet ristiriidassa. Korjaus: "mutta hänet kannettiin ulos kolmisen vuotta myöhemmin" (tai "vuonna 1794"). |
| P9 | Syy: hänen salaiset yhteytensä hoviin paljastuivat | https://parcoursrevolution.paris.fr/en/points-of-interest/109-to-the-great-men-a-grateful-homeland ("conspired with Louis XVI") | https://www.assemblee-nationale.fr/13/evenements/images/patrimoine-2010/kakemonos/mirabeau.pdf (haku: poistettu 1794 salaisen kirjeenvaihdon paljastuttua) ; WP-fr "relations secrètes avec la royauté" | OK | Taustalla "armoire de fer" -löytö (paljastui marraskuussa 1792). |
| P10 | "Rahapula venytti työtä" | Aviewoncities / muut matkasivustot (haku): "mainly due to financial problems" | WP-en (rahoitus lotolla; ei suoraa väitettä viivästyksestä) | EPÄVARMA | Ei vahvaa itsenäistä lähdettä. Korjaus: "Työ kesti vuosikymmeniä:" tai "Työ kesti yli kolmekymmentä vuotta:" (1758-1790 on katettu). |
| P11 | Foucault ripusti 1851 kupolista 67 m heilurin | https://en.wikipedia.org/wiki/Foucault_pendulum (helmi 1851 Observatorio, viikkoja myöhemmin Panthéonin kupolista, lanka ~67 m, 28 kg) | https://www.amusingplanet.com/2018/10/foucault-pendulum-and-pantheon.html ("March 1851 ... 67 meters") ; https://www.pariszigzag.fr/?p=142110 (67 m, kupolin huipusta) | OK | Fyysikko Léon Foucault, "näytti että maa pyörii" tuettu. |
| P12 | Heiluri purettiin saman vuoden joulukuussa | https://www.cca.qc.ca/en/issues/9/let-us-assure-you/32749/the-political-life-of-a-building ("pendulum installed under the dome, 19 February-1 December" 1851) | https://en.wikipedia.org/wiki/Panth%C3%A9on,_Paris ("removed in December 1851") | OK | Alkuperäinen heilurin paino siirtyi Conservatoireen 1855 (WP-en Foucault pendulum); joulukuu 1851 koskee ripustusta kupolista. |
| P13 | ...kirkon vaatimuksesta | https://en.wikipedia.org/wiki/Panth%C3%A9on,_Paris ("after complaints from the Church") | CCA-aikajana: 1851 Louis-Napoléon määrää Panthéonin takaisin uskonnolliseen käyttöön (ei mainitse heilurin vaatimusta) | EPÄVARMA | Vain WP-en tukee syytä suoraan. Korjaus: "Se purettiin saman vuoden joulukuussa" (jätä syy pois) tai "...kun rakennus palautettiin kirkon käyttöön" (CCA tukee palautusta, ei päivämäärää). |
| P14 | Kopio heiluu kupolin alla nykyisin | https://en.wikipedia.org/wiki/Foucault_pendulum ("exact copy ... under the dome of the Panthéon since 1995") | Le Monde 2015 (haku, https://comptes-rendus.academie-sciences.fr/physique/item/10.1016/j.crhy.2017.11.003.pdf mainitsee kopion; kopio tehty 1996 ja asennettu uudelleen kupolin restauroinnin jälkeen) ; https://www.pariszigzag.fr/?p=142110 (heiluri ihailtavissa yhä) | OK | Kopion vuosi 1995/1996 vaihtelee, tekstissä ei vuotta. |
| P14b | Kryptassa Voltaire ja Victor Hugo | https://en.wikipedia.org/wiki/Panth%C3%A9on,_Paris (Voltaire 11.7.1791; Hugo 1885) | https://www.britannica.com/topic/Pantheon-building-Paris-France (haku: Voltaire, Rousseau, Hugo, Zola, Curie) ; WP-fr | OK | |
| P15 | Marie Curie siirretty 1995 ensimmäisenä naisena omin ansioin | https://en.wikipedia.org/wiki/Panth%C3%A9on,_Paris ("first woman interred on merit" 1995) | https://bonjourparis.com/archives/marie-curie-she-and-pierre-rest-parthenon/ ; https://www.spokesman.com/stories/1995/apr/21/marie-curie-joins-great-men-of-france-in-the (Mitterrand: ensimmäinen nainen omien ansioidensa vuoksi; siirto 20.4.1995) | OK | Huom: Sophie Berthelot haudattiin 1907 miehensä mukana (ei omin ansioin), joten muotoilu "omien ansioidensa perusteella" on oikea. |
| P16 | Pariisin suojeluspyhimys Geneviève | WP-en / WP-fr (Geneviève Pariisin suojelija) | Britannica (haku) "St. Geneviève" | OK | Yleistieto. |
| P17 | Valmis 1790 / vuodet-rivit 1790, 1791, 1851, 1995 | ks. P5, P6, P11, P15 | | OK | Rivi 'alkoivat 1758' ks. P3. |

## 2. Notre-Dame (10 väitettä: OK 8, EPÄVARMA 2, EI 0)

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| N1 | Rakentaminen alkoi 1163 | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris (Maurice de Sully 1163) | https://france.fr/en/article/10-dates-history-notre-dame ("foundation stone laid ... 1163") ; Britannica (haku) https://www.britannica.com/topic/Notre-Dame-de-Paris | OK | |
| N2 | Valmistui 1345, "182 vuotta" | Britannica (haku): rakennustyö jatkui vuoteen 1345 ; WP-en infobox 1345 | https://france.fr/en/article/10-dates-history-notre-dame (valmis 1272, "yli 100 vuotta") ; WP-en teksti ("largely completed by 1260") ; Smarthistory (haku) 1163-1250 | EPÄVARMA | Lähteet eroavat: 1250 / 1260 / 1272 / 1330 / 1345. "182" on pelkkä 1345-1163. Korjaus (sama pituus): "kesti uskomattomat yli sata vuotta: työ alkoi vuonna 1163, ja pääosa valmistui 1200-luvulla." Vuodet on null, joten rivejä ei tarvitse muuttaa. |
| N3 | Lentävät tukikaaret kannattelevat kivikattoa | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris (ulkoiset tuet kantavat katon painon) | Britannica (haku): flying buttresses support high vaults | OK | |
| N4 | Napoleon kruunasi itsensä keisariksi 1804 | https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-the-coronation-of-napoleon-i/ (haku: ottaa kruunun paavin käsistä ja asettaa omalle päälleen; 2.12.1804) | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris ("crowned himself Emperor ... 2 December 1804") ; https://www.britannica.com/topic/The-Coronation-of-Napoleon (haku) | OK | Paavi Pius VII oli paikalla. |
| N5 | De Gaulle kiitti Jumalaa Pariisin vapautumisesta 1944 | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris (26.8.1944 messu, Magnificat) | https://france.fr/en/article/10-dates-history-notre-dame (26.8.1944 Magnificat) ; https://www.herodote.net/almanach-ID-3495.php (haku) ; https://fr.aleteia.org/2024/12/02/un-magnificat-sous-les-balles-a-notre-dame-lors-de-la-liberation-de-paris/ | OK | Laulettiin Magnificat (ei Te Deum, joka oli suunniteltu). Jos halutaan tarkka: "de Gaulle osallistui kiitosmessuun". |
| N6 | Tulipalo huhtikuussa 2019 vintillä | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris (15.4.2019, ullakolla) | https://france.fr/en/article/10-dates-history-notre-dame (15.4.2019) ; https://www.rte.ie/news/europe/2024/0412/1443244-notre-dame-fire (haku: roof space) | OK | |
| N7 | Tuhosi puukaton ja tornihuipun | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris (flèche ja tammipuinen kattorakenne tuhoutuivat) | https://france.fr/en/article/10-dates-history-notre-dame (katto menetetty) ; RTE (haku: spire and roof destroyed) | OK | |
| N8 | Tornit, julkisivu, lasimaalaukset pelastuivat | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris (julkisivu, tornit, muurit, lasimaalaukset pelastettiin) | https://catholicnewsagency.com/news/41058/famous-rose-windows-survive-massive-notre-dame-fire ; https://www.irishtimes.com/news/world/europe/notre-dame-rose-windows-among-artefacts-to-survive-blaze-1.3862797 ; france.fr (julkisivu ehjä) | OK | Osa uudemmista ikkunoista vaurioitui; ruusuikkunat säilyivät. Tarvittaessa tarkempi: "tornit, julkisivu ja ruusuikkunat". |
| N9 | Korjattiin "ennätysajassa" | https://theartnewspaper.com/2024/12/02/out-of-the-ashes-how-notre-dame-has-been-resurrected-in-a-miraculously-short-time (haku: "miraculously short time") | https://www.kiro7.com/news/trending/notre-dame-cathedral-reopen-5-years-after-massive-blaze/IVYHHUDVAZGLBHNE2DBSXA262M (haku: 5 vuotta) | EPÄVARMA | "Ennätys" ei ole lähteissä todennettu. Korjaus: "Katedraali korjattiin alle kuudessa vuodessa" tai "viidessä vuodessa" (15.4.2019-7.12.2024, ~5,6 v). |
| N10 | Avattiin yleisölle uudelleen joulukuussa 2024 | https://en.wikipedia.org/wiki/Notre-Dame_de_Paris (7.-8.12.2024) | https://france.fr/en/article/10-dates-history-notre-dame (7.-15.12.2024) ; RTE / domusweb (haku) | OK | |

## 3. Tour Saint-Jacques (13 väitettä: OK 10, EPÄVARMA 3, EI 0)

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| T1 | Torni rakennettu 1509-1523 | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 ("de 1509 à 1523") | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques ("entre 1509 et 1523") ; https://en.wikipedia.org/wiki/Saint-Jacques_Tower | OK | Päivämäärät koskevat tornia, kirkko on paljon vanhempi (1100-luvulta). |
| T2 | Ainoa jäänne Saint-Jacques-de-la-Boucherien kirkosta | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques ("l'unique vestige") | https://en.wikipedia.org/wiki/Saint-Jacques_Tower ("all that remains") ; paris.fr | OK | |
| T3 | Kirkko Grande Boucherien (teurastajien kaupunginosa) keskellä | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 ("au cœur du quartier de la Grande Boucherie") | https://halshs.archives-ouvertes.fr/halshs-00117495v1 (L'Eglise et les artisans : l'attachement des bouchers; kirkko teurastajien pääseurakunta) ; WP-en (tilaajina Hallien teurastajat) | OK | |
| T4 | Kirkko myytiin vallankumouksessa louhokseksi (1790-luvulla) | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (myyty 1797 kivilouhokseksi) | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques ("détruite après sa vente en 1797") ; WP-en (1793 tai 1797) | OK | Tarkka vuosi 1797 (vaihtelee 1793/1797 lähteissä). Teksti "1790-luvulla" kestää. |
| T5 | Kaupan ehtona kerrotaan olleen, ettei tornia saa purkaa | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (myyty "sous réserve que son clocher soit épargné") | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques (ehto olemassaolo "contestée") ; WP-en ("condition of the contract") | EPÄVARMA | Ehto esiintyy lähteissä, mutta WP-fr sanoo sen olevan kiistanalainen. Nykyinen sanamuoto "kerrotaan olleen" on jo varovainen ja kelpaa. Vaihtoehto: "kaupan ehdoksi kerrotaan tornin säästämistä". |
| T6 | Huipulla seisonut pyhä Jaakob syöstiin alas | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (pudotettiin jalustaltaan vuonna IV ja rikkoutui) | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques ("abattue à la Révolution") | OK | |
| T7 | Nykyinen patsas on 1800-luvun jäljennös | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 ("reproduction du XIXe siècle") | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques (korvaaja Chenillonin työ, kipsimalli 3,80 m; ei sana "jäljennös") | EPÄVARMA | Vain paris.fr sanoo jäljennös. Korjaus: "nykyinen patsas on 1800-luvulla tehty uusi patsas" (sama pituus). |
| T8 | Kaupunki osti tornin 1836 | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (27.8.1836) | https://en.wikipedia.org/wiki/Saint-Jacques_Tower ("repurchased by the City of Paris in 1836") ; WP-fr | OK | |
| T9 | Puisto 1850-luvulla, kun Haussmannin työt avasivat Rue de Rivolin tornin eteen | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (Haussmann prefekti 1853, square tornin ympärille, Rue de Rivolin työt) | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques (Rue de Rivolin työt 1852, square 1856) | OK | Rue de Rivolin jatko oli Napoleon III:n aikaista; "Haussmannin työt" kelpaa löyhänä ilmaisuna, tarkempi: "Rue de Rivolin jatkamistyöt". |
| T10 | Sääasema 1891 | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques (asema 1891-1999) | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (laboratorio julkiseksi 1891; Jaubertin kokeet jo 1885) | OK | "Perustettiin vasta 1891": kokeita tehtiin jo 1885, asema/laboratorio julkiseksi 1891. |
| T11 | Tornin juurella Blaise Pascalin patsas | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques (kuvateksti, Jules Cavelier) | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (patsas jalustalle 1800-luvun restauroinnissa) | OK | |
| T12 | Pascal teki tornissa ilmanpainekokeita | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 (Pascal tutki ilmanpainetta tornin huipulla ja juurella 1647-48) | https://en.wikipedia.org/wiki/Saint-Jacques_Tower ("debated whether here or at Saint-Jacques-du-Haut-Pas") | EPÄVARMA | Kiistanalainen. Nykyinen "hänen sanotaan tehneen" on varovainen; parempi: "koska hänen kerrotaan tehneen tornin lähellä ilmanpainekokeita (asia on kiistanalainen)" tai "koska hänen kerrotaan tehneen tornissa ilmanpainekokeita". |
| T13 | Via Turonensis alkaa tornin juurelta | https://www.paris.fr/pages/sept-choses-a-savoir-sur-la-tour-saint-jacques-23432 ("démarre à son pied") | https://fr.wikipedia.org/wiki/Tour_Saint-Jacques (Via Turonensis, kokoontumispaikka) ; https://dioceseparis.fr/143-Saint-Jacques-le-Camino-a.html (haku) | OK | |

## 4. Saint-Eustache (11 väitettä: OK 10, EPÄVARMA 1, EI 0)

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| S1 | Goottilainen rakenne, renessanssikoristeet | https://www.paris.fr/equipements/eglise-saint-eustache-19451 ("éléments gothiques ... décoratifs de style renaissance") | https://en.wikipedia.org/wiki/Saint-Eustache,_Paris ("Flamboyant Gothic", sisustus renessanssia) ; WP-fr | OK | |
| S2 | Kappeli vuodelta 1213 | https://www.saint-eustache.org/histoire ("1213: modest chapel") | https://www.paris.fr/equipements/eglise-saint-eustache-19451 ("modeste chapelle bâtie en 1213") ; WP-en | OK | Osa lähteistä (pariszigzag) antaa 1223 (pyhäinjäännökset/seurakunta), 1213 on virallisissa lähteissä. |
| S3 | Seurakunta kasvoi ja kappeli kävi pieneksi | WP-fr: "décidé de construire une église digne du cœur de Paris" | (ei toista lähdettä, jossa syy olisi sanottu) | EPÄVARMA | Syy "kävi pieneksi" ei näy lähteissä. Korjaus: "mutta vuonna 1532 päätettiin rakentaa tilalle Pariisin sydämen arvoinen kirkko" tai "mutta seurakunta kasvoi, ja uusi kirkko tuli tarpeeseen" (kasvu ei varmennettu). Turvallinen: "Paikalla oli ennen vaatimaton kappeli vuodelta 1213." (ilman syytä). |
| S4 | Rakennus alkoi 1532 | https://www.saint-eustache.org/histoire (19.8.1532, François I) | https://www.paris.fr/equipements/eglise-saint-eustache-19451 ("à partir de 1532") ; WP-en | OK | |
| S5 | Vihittiin 1637 ("yli sata vuotta myöhemmin") | https://www.saint-eustache.org/histoire (26.4.1637, Gondi) | https://fr.wikipedia.org/wiki/%C3%89glise_Saint-Eustache_de_Paris ("consacrée le 26 avril 1637") ; WP-en | OK | 1532 -> 1637 = 105 v. |
| S6 | Richelieu ja Molière kastettu siellä | https://www.saint-eustache.org/histoire ("Richelieu est baptisé à Saint-Eustache, ainsi que Molière") | https://fr.wikipedia.org/wiki/%C3%89glise_Saint-Eustache_de_Paris (Richelieu 1585, Molière 1622) ; WP-en | OK | |
| S7 | Ludvig XIV ensikommuunio 1649 | https://www.saint-eustache.org/histoire ("1649: the young Louis XIV makes his first communion") | https://en.wikipedia.org/wiki/Saint-Eustache,_Paris ("1649") ; WP-fr ("vers 1649") | OK | |
| S8 | Länsijulkisivun uusiminen alkoi 1754, jäi kesken | https://www.saint-eustache.org/histoire (22.5.1754, "It remains unfinished") | https://www.paris.fr/equipements/eglise-saint-eustache-19451 (Mansart de Jouy, Moreau-Desproux) ; https://fr.wikipedia.org/wiki/%C3%89glise_Saint-Eustache_de_Paris (etelätorni jäi kesken) ; WP-en | OK | |
| S9 | Vallankumouksessa suljettiin, "Maanviljelyksen temppeli" | https://www.saint-eustache.org/histoire (1793, "temple de l'Agriculture") | https://en.wikipedia.org/wiki/Saint-Eustache,_Paris ("closed 1793, Temple of Agriculture") | OK | |
| S10 | Baltard johti korjausta 1800-luvun puolivälissä | https://www.saint-eustache.org/histoire (1846-1854 täydellinen restaurointi) | https://www.paris.fr/equipements/eglise-saint-eustache-19451 (1846-1854 kappelit) ; WP-en (1846-1854, tulipalo 1844) | OK | WP-fr antaa 1842-1860. |
| S11 | Les Halles siirrettiin Rungisiin 1969 | https://en.wikipedia.org/wiki/Saint-Eustache,_Paris (1969) | https://www.larousse.fr/encyclopedie/divers/les_Halles_de_Paris/123023 ("effectué en mars 1969 à Rungis") ; Rungis/Semmaris-lehdistömappi (haku) | OK | Les Halles = Pariisin entinen ruokatori, kirkon vieressä: kelpaa. |

## Yhteenveto vuodet-kenttiin

- Panthéon: rivi 'alkoivat 1758' on EPÄVARMA (ks. P3). Muut (1790, 1791, 1851, 1995) OK.
- Tour Saint-Jacques: rivit 1509-1523, 1836, 1891 OK.
- Saint-Eustache: rivit 1213, 1532, 1637, 1649, 1754, 1969 OK.
- Notre-Dame: vuodet null; tekstin 1345/182 on EPÄVARMA, jos muutetaan, ei vaikutusta riveihin.

## Rajoitteet

- Britannica, notredamedeparis.fr, paris-pantheon.fr ja osin CMN eivät avautuneet (403/404/tyhjä sivu), joten niiden sanamuodot ovat hakutuloksen tiivistelmistä; vastaavat väitteet on tuettu muilla avatuilla lähteillä.
- WP-en ja WP-fr lasketaan yhdeksi tahoksi, ellei toinen lähde ole muu kuin Wikipedia.


### Liite C: Pompidou, Place des Vosges, Invalidit

# Lähdetaulukko C: Pompidou-keskus, Place des Vosges, Invalidit

Tarkistus tehty 20.11.2026 (WebSearch/WebFetch; PDF:t luettu pdftotextilla). Tuomio: OK = kaksi itsenäistä lähdettä tukee, EPÄVARMA = lähteet eroavat tai vain yksi, EI = ristiriidassa.
Lyhenteet: WP-en/WP-fr = Wikipedia (käytetty vain toisena lähteenä). "PDF-ML" = Pariisin kaupungin PLU-patrimoine-raportti, "PDF-MA" = Musée de l'Armée, Hôtel des Invalides -opetusaineisto.

Lähteet (lyhenteet taulukoissa):
- POM-chrono = https://www.centrepompidou.fr/fileadmin/user_upload/dossier-ressources-architecture-centre-pompidou-chrono_20230829.pdf
- POM-arkki = https://www.centrepompidou.fr/en/the-centre-pompidou-is-transforming-itself/an-iconic-architecture
- POM-sulku = https://www.centrepompidou.fr/fr/fermeture-provisoire-pour-travaux/le-projet-de-reouverture ja https://www.centrepompidou.fr/en/the-centre-pompidou-is-transforming-itself
- POP = https://pop.culture.gouv.fr/notice/merimee/ACR0000721
- Kulttuuriministeriö = https://www.culture.gouv.fr/nous-connaitre/decouvrir-le-ministere/histoire-du-ministere/ministere-de-la-culture-60-ans-d-action-en-500-dates/jeudi-11-decembre-1969-Centre-Georges-Pompidou
- RPBW = https://www.rpbw.com/project/centre-georges-pompidou
- Dezeen = https://www.dezeen.com/2019/11/05/centre-pompidou-piano-rogers-high-tech-architecture/
- IRCAM = https://www-prod.ircam.fr/en/ircam/the-building
- PDF-ML = https://cdn.paris.fr/paris/2020/02/26/f518e2989d8970e2dc5d899968876a7c.pdf
- PDF-MA = https://www.musee-armee.fr/fileadmin/user_upload/Ressources_pedagogiques/2025/DossierPedagogique_Hotel_des_invalides_BAT2.pdf

---

## 1. Pompidou-keskus (12 väitettä: 12 OK, 0 EPÄVARMA, 0 EI)

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| P1 | Nimetty presidentti Georges Pompidoun mukaan | POP: "le 2 avril 1975, un décret stipule que le Centre reçoit le nom de son initiateur" (https://pop.culture.gouv.fr/notice/merimee/ACR0000721) | WP-en: "named after Georges Pompidou, who was French president 1969-1974" (https://en.wikipedia.org/wiki/Centre_Pompidou); Kulttuuriministeriö: laitos "Centre national d'art et de culture Georges Pompidou" | OK | Pompidou kuoli 1974 kesken rakentamisen. |
| P2 | Kansainvälinen arkkitehtikilpailu 1970–1971 | Kulttuuriministeriö: kilpailu joulukuussa 1970, voittaja heinäkuussa 1971 (URL yllä) | WP-fr: "lancé en décembre 1970", jury 15.7.1971, 681 hanketta (https://fr.wikipedia.org/wiki/Centre_Pompidou) | OK | Pompidoun oma aikajana (POM-chrono), RPBW ja Dezeen sanovat vain "1971", joten 1970–1971 on turvallinen. Jos halutaan yksi vuosi: "vuonna 1971 ratkaistiin". |
| P3 | Voittajat Renzo Piano (italialainen) ja Richard Rogers (britti) työryhmineen | POP: "Renzo Piano, Richard Rogers, Gianfranco Franchini, John Young et le groupe Ove Arup & Partners" (POP-URL) | RPBW: "Renzo Piano and Richard Rogers won" (https://www.rpbw.com/project/centre-georges-pompidou); myös Dezeen, ArchDaily (https://www.archdaily.com/1038918/unbuilt-visions-for-the-centre-pompidou-presented-at-concours-beaubourg-1971-exhibition-in-paris) | OK | Franchini oli kolmas nimetty; "työryhmineen" kattaa hänet. |
| P4 | Rakennustyöt alkoivat 1972 | POM-chrono: "En mai 1972, les travaux d'excavation débutent" | POP: "Les travaux démarrent en mai 1972" | OK | Rankenointi 1974–75. |
| P5 | Avattiin 1977 | Kulttuuriministeriö: avajaiset 31.1.1977 | POP: "est inauguré par le Président Valéry Giscard d'Estaing" 31.1.1977; WP-fr: yleisölle 2.2.1977; Britannica-hakutulos (britannica.com/topic/Pompidou-Centre) sama | OK | |
| P6 | Putkien värit: ilma sininen, vesi vihreä, sähkö keltainen, kulku (liukuportaat, hissit) punainen | POM-arkki: "Blue ... air flows, Yellow ... electricity, Green ... water, Red for pedestrian flow (escalators and lifts)" | Dezeen: "blue for air-conditioning, yellow for electrics, green for water pipes, red for the tubular escalators and elevators"; WP-en samoin | OK | Pompidoun toinen sivu lisää punaiseen myös turvalaitteet ja teokset, valkoinen = jäähdytystornit; luonnoksen sanamuoto kestää. |
| P7 | Rakenteet ja kulkureitit viety ulkopuolelle, sisälle vapaita tasoja | Dezeen: structure, services, corridors, lifts outside so "internal spaces can be easily rearranged" | POM-arkki/RPBW: flexible open floors; WP-en sama | OK | |
| P8 | Rakennus vei vain puolet tontista, toinen puoli piazza | RPBW: "Unique amongst all the competition entries, the Piano and Rogers project proposed to only occupy half the site" | POP: "n'occupe que la moitié de la parcelle ... vaste esplanade inclinée, la piazza"; Dezeen sama | OK | |
| P9 | Nykytaiteen museo ja yleinen kirjasto | POM-arkki: Musée national d'art moderne (12 210 m2) ja Bibliothèque publique d'information (10 400 m2) | RPBW: BPI + museo; WP-en | OK | |
| P10 | IRCAM viereisessä rakennuksessa | IRCAM: "stands alongside the Centre Pompidou on the Place Igor Stravinsky" (https://www-prod.ircam.fr/en/ircam/the-building) | POM-sulku: "Ircam remains at its Place Stravinsky location" (https://www.centrepompidou.fr/en/the-centre-pompidou-is-transforming-itself); WP-fr: "bâtiment annexe" | OK | Rakennus on pääosin maan alla Stravinsky-aukion alla (Piano ja Rogers, 1978) ja on oma laitoksensa; se pysyy auki remontin ajan. |
| P11 | Ensimmäinen peruskorjaus päättyi 2000 | POM-arkki: remontti alkoi 1.10.1997, "reopening on 1 January 2000" | WP-en: "re-opening on 1 January 2000"; WP-fr sama | OK | Remontti 1997–1999, avaus 1.1.2000. "Päättyi 2000" kestää. |
| P12 | Suljettu uutta peruskorjausta varten, avautuu uudelleen 2030 | POM-sulku: "fermeture complète du site de 2025 à 2030", rakennus suljettu syyskuun 2025 lopussa (22.9.2025), työt alkavat huhtikuussa 2026, "Réouverture ... 2030" | The Art Newspaper 11.5.2023: "will close from 2025 to 2030" (https://www.theartnewspaper.com/2023/05/11/pariss-centre-pompidou-to-shut-for-five-years-as-part-of-radical-renovation-project); WP-en: reopen 2030 | OK | Ajantasaisin löytämäni tieto; viivästysuutisia (esim. 2031) en löytänyt. Muotoilu "on määrä avautua" on oikea. |

---

## 2. Place des Vosges (15 väitettä: 10 OK, 3 EPÄVARMA, 2 EI)

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| V1 | Pariisin vanhin aukio | WP-fr: "la place la plus ancienne de Paris, juste avant la place Dauphine" (https://fr.wikipedia.org/wiki/Place_des_Vosges) | Time Out: "Paris's first planned square" (https://www.timeout.com/paris/en/things-to-do/attractions/place-des-vosges); WP-en: "oldest planned square in Paris" | OK | Tarkka muoto on "vanhin suunniteltu aukio". Valinnainen tarkennus: "Pariisin vanhin suunniteltu aukio". |
| V2 | Henrik IV määräsi sen rakennettavaksi | PDF-ML: Henrik IV "annonce par l'édit royal de juillet 1605, sa volonté de créer une place" | Paris.fr: "C'est en 1605 que la place prit le nom de place Royale ... Henri IV voulait" (https://www.paris.fr/lieux/square-louis-xiii-36) | OK | Käsky 1605. |
| V3 | ...määräsi sen "hovielämän julkiseksi keskukseksi" | PDF-ML: kolme tavoitetta: tukea silkkimanufaktuuria (asunnot käsityöläisille), "lieu de détente et de promenade aux Parisiens", "lieu pour les fêtes de la Cour" | Paris.fr (URL yllä): Henrik IV halusi porvarillisia punatiilitaloja; ei mainitse "hovielämän keskusta" | EPÄVARMA | Vain yksi lähde kolmesta tavoitteesta; "hovielämän keskus" ei ole sanatarkka. Korvaava (sama pituus): "hovin juhlien ja kävelyn paikaksi". |
| V4 | Henrik IV murhattiin 1610 | PDF-ML: "A la mort du roi en 1610, la place vient d'être achevée" | WP-fr: aukio vihitty 1612 "deux ans après le décès du roi Henri IV" (murhaaja Ravaillac) | OK | |
| V5 | Aukio vihittiin 1612 | PDF-ML: "inaugurée deux ans plus tard" (1612) | Paris.fr: "ne fut achevée qu'en 1612"; WP-en: "inaugurated in 1612" | OK | 5.–7.4.1612 karuselli (Ranskan puolustusministeriön digikirjasto: https://bibliotheques-numeriques.defense.gouv.fr/impression/document/8ebed8c0-095d-42f9-864b-2fb81835258f). |
| V6 | Vihittiin "Ludvig XIII:n ja Anna Itävaltalaisen **häiden** yhteydessä" | WP-fr: "à l'occasion des fiançailles de Louis XIII et d'Anne d'Autriche", karuselli Pluvinelin johdolla | WP-en: "engagement"; Ranskan puolustusministeriön digikirjasto, kaiverruksen teksti: "à l'occasion de la célébration des fiançailles" | EI | Häät olivat vasta 1615. Pariisin PLU-raportti sanoo löyhästi "mariage", mutta kolme muuta lähdettä sanoo kihlajaiset. Korjaus: "...häiden" -> "kihlajaisten" ("Ludvig XIII:n ja Anna Itävaltalaisen kihlajaisten yhteydessä"; +1 merkki). |
| V7 | Kuningaspari ei koskaan asunut siellä | WP-fr: Ludvig XIII majoittui vihkiäisjuhlien ajan Hôtel de Chaulnesissa (nro 9); Kuninkaan paviljonki oli talonmiehen asunto, ei kuninkaan | WP-en: "no royal has ever lived ... except for Anne of Austria", joka asui hetken Pavillon de la Reinessa; Pavillon de la Reine -hotellin sivu: Anne asui siipirakennuksessa (https://en.pavillon-de-la-reine.com/histoire); Yonder: Anne "a séjourné" ennen 1615 avioliittoa | EPÄVARMA | Annen lyhyt oleskelu on lähteiden mukaan mahdollinen (heikko lähde: hotellit + WP-en). Korvaava: "eikä kuningas itse koskaan asettunut sinne asumaan" tai poista lause. |
| V8 | 36 taloa, yhdeksän joka sivulla | PDF-ML: "Les quatre côtés de place comptent neuf pavillons chacun, soit 36 au total" | Paris.fr: "trente-six pavillons symétriques à arcades"; WP-fr: "les trente-six pavillons" | OK | Monumentum laskee 35, mutta kaupungin virallinen luku on 36. "Yhdeksän per sivu" vain PDF-ML + Geneawiki. Kaksi paviljonkia (Kuningas, Kuningatar) on muita korkeammat ja leveämmät, 34 samaa mallia. |
| V9 | ...36 **kolmikerroksista** taloa | PDF-ML: kellari, "deux étages carrés et un niveau sous comble", pohjakerroksessa arkadi | Muu: pohjakerros + kaksi kerrosta + kaksi ullakkokerrosta (hakutulos, ei kaksi itsenäistä) | EPÄVARMA | Kerrosluku riippuu laskutavasta. Korvaava: "36 arkadikäytävän päälle nousevaa taloa" tai jätä pois "kolmikerroksista" ("36 samanmallista taloa"). |
| V10 | Punatiilinen julkisivu ja aumakatto | PDF-ML: tiili ja kivi, "comble droit à deux croupes couvert d'ardoises" | Time Out: "red-brick and stone arcaded façades", "steeply pitched slate roofs"; WP-fr: "toits d'ardoise bleue très pentus" | OK | Katto = jyrkkä liuskekatto, päistään viistetty (croupe). "Aumakatto" kelpaa; valinnainen: "jyrkkä liuskekatto". Osa tiilestä on tekotiiltä (PDF-ML). |
| V11 | Kuninkaan ja kuningattaren paviljongit korkeampina, etelä- ja pohjoislaidalla | PDF-ML: "pavillons du Roi et de la Reine, plus hauts et plus larges que les autres" | WP-fr: pavillon du Roi etelässä, pavillon de la Reine pohjoisessa; Time Out sama | OK | |
| V12 | 1600-luvulla aukiolla järjestettiin turnajaisia | WP-fr: keskusta "sert de terrain aux cavalcades, aux tournois, aux jeux de bagues" | Ranskan puolustusministeriön digikirjasto + PDF-ML: suuri karuselli aukion vihkiäisinä 5.–7.4.1612, juhlat hovin tapahtumapaikkana "à partir de 1612" | OK | Tarkemmin: ratsastuskarusellit ja turnajaiset; luonnos kelpaa. |
| V13 | Nimi oli Place Royale **vuoteen 1800** | PDF-ML: 1792 "place des fédérés", 1800 "place des Vosges", Restauraation aikana uudelleen "place royale" | WP-fr: 1792 des Fédérés, 1793 de l'Indivisibilité, 1800 des Vosges, uudelleen Royale 1814–1830 ja 1852–1870 | EI | Lauseena virheellinen (nimi vaihtui jo vallankumouksessa, ja Royale palasi). Korvaava: "Nimi oli aluksi Place Royale, ja vuonna 1800 se vaihdettiin Vosgesin departementin mukaan." (pituus sama). |
| V14 | Vaihdettiin 1800 Vosgesin departementin mukaan | PDF-ML: "En 1800, elle est dénommée place des Vosges pour récompenser le premier département à avoir payé ses contributions" | WP-fr: 1800, kunniaksi Vosgesin departementille; WP-en: 1800 | OK | Paris.fr sanoo 1799 (https://www.paris.fr/lieux/square-louis-xiii-36), joten vuosi on hieman lähdekohtainen; "1800" on enemmistön luku. Syy: ensimmäinen vero maksanut departementti. |
| V15 | Victor Hugo asui aukiolla 16 vuotta alkaen 1832 (1832–1848) | napoleon.org: "C'est en octobre 1832 que la famille Hugo s'installa ... place Royale", asui siellä "jusqu'à la Révolution de 1848" (https://www.napoleon.org/magazine/lieux/maison-de-victor-hugo-paris/) | WP-fr: "Victor Hugo occupa de 1832 à 1848" nro 6; WP-en: "1832 to 1848"; Paris Musées / Maisons de Victor Hugo -hakutulos: 16 vuotta | OK | Täsmennys 1832–1848 luonnokseen: "Vuosina 1832–1848 aukion laidalla asui kirjailija Victor Hugo". |

---

## 3. Invalidit (14 väitettä: 11 OK, 3 EPÄVARMA, 0 EI)

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| I1 | Koti haavoittuneille ja vanhoille sotilaille, jotka kerjäsivät | PDF-MA: invalidisotilaat "livrés à la mendicité et au brigandage", "réduites à mendier" | WP-fr: sotilaista tuli "mendiants, valets, voleurs" | OK | Kuningas halusi myös karkottaa kerjäläiset kaduilta (PDF-MA). |
| I2 | Kuningas määräsi 1670 | PDF-MA: "En 1670, Louis XIV décide, par un édit" | WP-en: "dated 24 November 1670" (https://en.wikipedia.org/wiki/Les_Invalides); Musée de l'Armée -sivu | OK | Rakennus alkoi 1671. |
| I3 | Suunnittelija Libéral Bruant | PDF-MA: "confie les travaux à l'architecte Libéral Bruant" | WP-en: "initial architect ... Libéral Bruant" | OK | Hardouin-Mansart jatkoi 1676. |
| I4 | Ensimmäiset asukkaat 1674 | PDF-MA: "les premiers pensionnaires arrivent dès 1674" | WP-fr "dès 1674"; eutouring: lokakuu 1674 | OK | |
| I5 | Parhaimmillaan noin 4 000 asukasta | PDF-MA: suunniteltu 1 500:lle, "en accueille finalement plus de 4000" | Geneawiki ja eutouring.com ("up to 4,000 residents", 1700-luku) | OK | Toinen lähde heikko (matkablogi, geneawiki); WP-fr ei anna lukua. Jos halutaan varmempi: "useita tuhansia" tai "yli 4 000" (Musée de l'Armée). |
| I6 | Verstaissa tehtiin kenkiä, univormuja ja kuvakudoksia | PDF-MA: verstaat valmistivat sukkia ja kenkiä, kuvakudoksia, tekstiilejä, "équipement pour les armées", käsikirjoituksia | Geneawiki: "uniformes, cordonnerie, tapisserie, enluminure"; WP-fr: alkuperäiset verstaat hylättiin pian dormitorioiden tieltä | EPÄVARMA | "Univormuja" ei ole museon aineistossa sanatarkasti, ja WP-fr sanoo alkuverstaiden lakanneen. Korvaava (sama pituus): "tekivät verstaissa kenkiä, sukkia ja kuvakudoksia". |
| I7 | 14.7.1789 kansanjoukko vei "lähes 30 000" kivääriä | WP-en (Storming of the Bastille): "29,000 to 32,000 muskets, but without powder or shot"; WP-en (Les Invalides): "32,000 rifles" | WP-fr (Prise de la Bastille): "30 000 à 40 000 fusils"; Hérodote/muut: 28 000 | EPÄVARMA | Luvut 28 000–40 000. Musée de l'Armée (PDF-MA) ei anna lukua (joukko 7 000–40 000). Korvaava: "noin 30 000 kivääriä" (tai "kymmeniä tuhansia kiväärejä"). Ajankohta 14.7. aamu OK (PDF-MA, WP-fr kello 10; WP-en sanoo 13.7.). |
| I8 | Ruutia ei löytynyt, ja sitä haettiin Bastiljista | WP-en: Invalideissa ei ruutia, komentaja oli siirtänyt 250 tynnyriä Bastiljiin | PDF-MA: "ne trouvent qu'une faible quantité de poudre et de balles ... se rendre à la Bastille"; WP-fr: ruuti ja luodit puuttuvat, Besenval oli käskenyt varastoida ruudin linnakkeeseen | EPÄVARMA | Museo sanoo "vähän ruutia" eikä "ei lainkaan". Korvaava: "Ruutia ei juuri löytynyt, ja sitä lähdettiin hakemaan Bastiljista." (+4 merkkiä; vaihtoehto: "Ruuti puuttui"). |
| I9 | Napoleonin jäännökset tuotiin Saint Helenalta 1840 | PDF-MA: "En 1840, Louis-Philippe fait transférer le corps de Napoléon Ier, de l'île de Sainte-Hélène aux Invalides" | WP-en: "returned to France in 1840"; napoleon.org: valtiolliset hautajaiset 15.12.1840 | OK | |
| I10 | Hardouin-Mansartin kullattu kupoli | PDF-MA: Dôme Hardouin-Mansartin rakentama, koristeet "dorés à la feuille" (1989 restaurointi 12,6 kg kultaa) | WP-fr: "redoré en 1807, 1830, 1839, 1937", 1989 12 kg kultaa; WP-en: 12,65 kg kultalehteä | OK | |
| I11 | Kupolin alla avoin krypta | WP-fr: "crypte ouverte de forme circulaire" | napoleon.org (Fondation Napoléon): "crypte circulaire sans couvrement" (https://www.napoleon.org/magazine/lieux/les-invalides-le-tombeau-de-napoleon-paris); WP-en: "open crypt" | OK | Krypta rakennettiin Visconti 1840-luvulta, ei heti 1840; luonnoksen lause yhdistää ne, mutta ei väitä valmistumisvuotta. |
| I12 | Sarkofagi punaisesta kvartsiitista, louhittu Äänisjärven rannalta Karjalasta | Touret ja Bulakh 2017, SPbU: "Quartzite was quarried at the Onega Lake in Russia" (https://escjournal.spbu.ru/article/download/1303/1255/2604) | Karelian Research Centre -tutkimus: kvartsiitti Shokshan kylän lähellä Äänisjärven rannalla, Karjalassa (https://doaj.org/article/4ad86d4661d842aebd673c8e6f6adf47); WP-en: "purple Shoksha quartzite mined in Russian Karelia" | OK | Värissä lähteet eroavat: napoleon.org ja WP-fr "rouge", Musée de l'Armée "pourpre", WP-en "purple". Sana "punainen" kelpaa, tarkempi "purppuranpunainen". Huom: osa lähteistä (Fondation Napoléon, WP-fr) sanoo "Finlande"; akateemiset lähteet sanovat Karjala/Äänisjärvi. |
| I13 | Keisari siirrettiin sarkofagiin 1861 | PDF-MA: hauta vihitty 2.4.1861 (Napoleon III), "En 1861, les cendres ... sont placées dans ce tombeau" | napoleon.org: "définitivement" 2.4.1861; WP-en: 2.4.1861 | OK | |
| I14 | Nyt pieni hoitolaitos ja armeijamuseo | WP-fr: Institution nationale des Invalides, "une centaine de grands invalides de guerre" | PDF-MA: "le site a conservé ses fonctions hospitalières et militaires" + Musée de l'Armée, Plans-Reliefs, Ordre de la Libération | OK | Paikalla on kolme museota; "armeijamuseo" on pääasia. |

---

## Yhteenveto

| Juttu | OK | EPÄVARMA | EI |
|---|---|---|---|
| Pompidou-keskus | 12 | 0 | 0 |
| Place des Vosges | 10 | 3 | 2 |
| Invalidit | 11 | 3 | 0 |

### Korjausehdotukset (vain EPÄVARMA ja EI)
- Place des Vosges V6 (EI): "häiden yhteydessä" -> "kihlajaisten yhteydessä".
- Place des Vosges V13 (EI): "Nimi oli Place Royale vuoteen 1800, jolloin se vaihdettiin Vosgesin departementin mukaan." -> "Nimi oli aluksi Place Royale, ja vuonna 1800 se vaihdettiin Vosgesin departementin mukaan."
- Place des Vosges V3: "hovielämän julkiseksi keskukseksi" -> "hovin juhlien ja kävelyn paikaksi".
- Place des Vosges V7: "eikä kuningaspari koskaan asunut siellä" -> "eikä kuningas itse koskaan asettunut sinne asumaan" (tai poista).
- Place des Vosges V9: "36 kolmikerroksista taloa" -> "36 samanmallista taloa" (tai "arkadikäytävän päälle nousevaa").
- Invalidit I6: "kenkiä, univormuja ja kuvakudoksia" -> "kenkiä, sukkia ja kuvakudoksia".
- Invalidit I7: "lähes 30 000 kivääriä" -> "noin 30 000 kivääriä".
- Invalidit I8: "Ruutia ei löytynyt" -> "Ruutia ei juuri löytynyt".

### Muut huomiot
- Pompidou P12: ajantasainen tieto = suljettu 22.9.2025, työt huhtikuusta 2026, avaus 2030 (ei tarkkaa päivää); viivästystä ei löytynyt.
- Invalidit I12: kuvaus "Karjalasta" pitää, vaikka suosituissa lähteissä lukee "Suomesta"; akateemiset lähteet tukevat Äänisjärveä.


### Liite D: Petit Palais, Montparnasse, Metro 1900

# Lähdetaulukko D: Petit Palais, Tour Montparnasse, Metro 1900

Tarkistettu 20.11.2026. Tuomiot: OK = kaksi itsenäistä lähdettä tukee; EPÄVARMA = yksi lähde tai lähteet eroavat; EI = lähde ristiriidassa.
Menetelmä- ja luotettavuushuomio: petitpalais.paris.fr/en/node/*-sivut ja ratp.fr palauttivat 403 hakutyökalulle. RATP:n luvut (167/88/86/1978) on luettu RATP:n historiantutkija André Mignardin tekstistä (PDF, haettu ja avattu: ars-metallica.fr-kopio) sekä RATP:n sivun hakutiivistelmästä. "Dossier enseignant" = Petit Palais'n oma opettajan aineisto (PDF, avattu pdftotextilla), jossa on virallinen rakennuksen kronologia.
Merkintä: PP = Petit Palais, W-EN/W-FR = Wikipedia (käy vain toiseksi lähteeksi).

Lyhenteet lähteille (täydet URLit taulukoissa):
- PP-historia = https://www.petitpalais.paris.fr/explorer/le-petit-palais/lhistoire-du-petit-palais
- PP-dossier = https://www.petitpalais.paris.fr/sites/default/files/dossier_enseignant_paris_a_la_belle_epoque.pdf

---

## 1. Petit Palais

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| P1 | Rakennettu maailmannäyttelyyn (1900) | https://www.petitpalais.paris.fr/explorer/le-petit-palais/lhistoire-du-petit-palais ("Construit pour l'Exposition universelle de 1900") | https://www.pop.culture.gouv.fr/notice/merimee/PA00088878 ("Construit pour exposition universelle de 1900") | OK | |
| P2 | Alusta asti tarkoitettu pysyväksi taidemuseoksi, toisin kuin monet näyttelyn rakennukset | PP-dossier (s. 18-19: Grand ja Petit Palais luotiin "ensemble urbain pérenne" -kaupunkikokonaisuudeksi; näyttelyn jälkeen Petit Palais "à devenir le Musée des Beaux-Arts de la Ville de Paris"; muu näyttely myytiin osina) https://www.petitpalais.paris.fr/sites/default/files/dossier_enseignant_paris_a_la_belle_epoque.pdf | https://www.pariszigzag.fr/insolite/lieux-insolites/le-petit-palais-lautre-joyau-architectural-de-lexpo-1900/ (rakennettu kestämään, toisin kuin monet näyttelyrakennukset); lisäksi W-EN https://en.wikipedia.org/wiki/Petit_Palais (Apollo 2014, Leribault: "a lasting building that would become a permanent fine arts museum") | OK | Nyanssi: Pariisin kaupunki sai talon haltuunsa 8.3.1901 ja päätös museosta kirjataan joissain lähteissä vuoteen 1901-1902 (anecdotrip, paris.fr), mutta virallinen aineisto ja Apollo-haastattelu tukevat "alusta asti". |
| P3 | Arkkitehti Charles Girault | PP-dossier (kronologia: Girault voitti huhtikuun 1896 kilpailun yksimielisesti) | https://www.paris.fr/equipements/petit-palais-musee-des-beaux-arts-de-la-ville-de-paris-1526 ("Joyau architectural édifié par Charles Girault") ; POP PA00088878 | OK | |
| P4 | Girault aloitti työn 10. lokakuuta 1897 (täsmäpäivä) | W-EN https://en.wikipedia.org/wiki/Petit_Palais ("began on 10 October 1897", Worsdale, Apollo 1978); sama päivä https://partir.ouest-france.fr/france/villes/paris/activites/petit-palais ("du 10 octobre 1897 à avril 1900") | **Ristiriita:** PP-dossier kronologia: "15 octobre 1897 : Début des travaux" (museon oma aineisto); W-FR https://fr.wikipedia.org/wiki/Petit_Palais: rakennus alkoi "entre septembre et octobre 1897" (Le Génie civil 1899) | EPÄVARMA | Päivämäärä 10. vs 15.10.1897 eroaa; Ouest-France todennäköisesti kopioi W-EN:n. **Korjaus:** "10. lokakuuta 1897" -> "lokakuussa 1897" (3 merkkiä lyhyempi). Vuodet-rivin `kohta` 'lokakuuta 1897' pitää muuttaa muotoon 'lokakuussa 1897' (vuosi 1897 säilyy). |
| P5 | Rakennus valmistui huhtikuussa 1900 | PP-dossier ("Avril 1900 : L'essentiel du Petit Palais est achevé pour l'inauguration de l'Exposition") | W-EN (completed April 1900) ; https://en.anecdotrip.com/1900-paris-worlds-fair-the-petit-palais-genesis-by-vinaigrette ("Work ended in April 1900") | OK | Virallinen sanamuoto on "pääosin valmis"; maalaukset puuttuivat vielä (ks. P10). Voi halutessaan lisätä "pääosin". |
| P6 | Sijainti Champs-Élysées'n tuntumassa, Grand Palais'ta vastapäätä | PP-dossier (Grand ja Petit Palais uuden avenue Nicolas II:n molemmin puolin, Champs-Élysées'n ja Seinen välissä) | https://www.paris.fr/equipements/petit-palais-musee-des-beaux-arts-de-la-ville-de-paris-1526 (Seinen ja Champs-Élysées'n välissä); W-EN (across from the Grand Palais) | OK | |
| P7 | 1902 Pariisin kaupungin kuvataidemuseo | PP-historia ("Palais des Beaux-Arts de la Ville de Paris" 1902) | PP-dossier (11.12.1902 museon vihkiäiset; 8.3.1901 talo luovutettu kaupungille) ; https://www.paris.fr/pages/dans-les-coulisses-du-petit-palais-7421 | OK | Vihkiäiset 11.12.1902, kaupunki omisti talon jo 1901. "Vuonna 1902" kestää. |
| P8 | Samana vuonna (1902) museolle tuli Dutuitin veljesten kokoelma | https://www.paris.fr/pages/dans-les-coulisses-du-petit-palais-7421 (1902: notaarin kirje Dutuitin veljesten testamentista muutti museon suuntaa) | PP-dossier ("donation Dutuit" museon avajaisissa 11.12.1902); W-EN https://en.wikipedia.org/wiki/Eug%C3%A8ne_Dutuit (testamentattu kaupungille 1902) | OK | Oikeampi sana "testamenttaama" kuin "lahjoittama" (Auguste Dutuit kuoli 1902; Eugène jo 1886). Ks. P9. |
| P9 | Kokoelma on keskiajan ja renessanssin teoksia | https://www.petitpalais.paris.fr/collections/moyen-age ja https://www.petitpalais.paris.fr/collections/renaissance (keskiaika- ja renessanssiosastot pääosin Dutuit-kokoelmaa) | https://www.parismusees.paris.fr/fr/parcours-thematiques/la-collection-dutuit (kokoelma n. 20 000 teosta, joista n. 12 000 grafiikkaa; myös maalauksia, antiikkia) | EPÄVARMA | Kokoelma on laajempi kuin "keskiajan ja renessanssin teokset" (suuri osa grafiikkaa). **Korjaus (lyhyempi):** "Dutuitin veljesten testamenttaama taidekokoelma" (47 merkkiä; alkuperäinen 73) tai "Dutuitin veljesten testamenttaama kokoelma, mm. keskiajan ja renessanssin esineitä" (+7). |
| P10 | Koristemaalaukset ja -veistokset valmistuivat vasta 1903–1925 | PP-historia ("de 1903 à 1925" maalatut ja veistetyt koristeet, yli 20 vuotta) | PP-dossier ("Décor peint ... de 1903 à 1925", seitsemän taiteilijaa) ; https://partir.ouest-france.fr/france/villes/paris/activites/petit-palais (1903-1925); https://www.eutouring.com/history_petit_palais_museum.html (koristetyöt alkoivat 1903, kesti yli 20 v) | OK | Molemmat ensimmäiset ovat museon omia; Ouest-France ja eutouring vahvistavat ajanjakson. Tarkka: maalatut koristeet 1903-1925. |
| P11 | Injalbertin veistämä Pariisi muusien ympäröimänä julkisivun päädyssä | W-EN (tympanum "city of Paris surrounded by muses" by Jean Antoine Injalbert, Worsdale 1978) ; https://partir.ouest-france.fr/france/villes/paris/activites/petit-palais ("Injalbert, tympan: la Ville de Paris entourée des muses") | PP-dossier (Antonin Injalbert, korkokuva päädyssä (fronton en plein cintre); teos nimeltä "La Ville de Paris protégeant les Arts") ; POP PA00088878 (Injalbert listattu kuvanveistäjäksi) | OK | Teoksen nimi vaihtelee: museo "Pariisi suojelee taiteita", muut "Pariisi muusien ympäröimänä". Sama teos ja tekijä (Jean-Antoine "Antonin" Injalbert). |
| P12 | Puoliympyrän pylväskäytävä avautuu puutarhaan | PP-dossier (puolipyöreä sisäpuutarha, jota ympäröi péristyle, "colonnade dorique") | W-EN (semicircular peristyled courtyard) ; https://partir.ouest-france.fr/france/villes/paris/activites/petit-palais | OK | Tarkempi sanamuoto: pylväskäytävä ympäröi puoliympyrän muotoista puutarhaa. Lähteet kuvaavat pylväiden ritarikunnaksi dorilaisen/toscanalaisen/joonialaisen eri tavoin; vältä sitä. |
| P13 | Pylväät ovat vaaleanpunaista Vosgesien graniittia | W-EN (coupled columns of pink Vosges granite; Anderson 1900/Worsdale 1978) ; https://partir.ouest-france.fr/france/villes/paris/activites/petit-palais ("colonnes de granit rose des Vosges") | **Ristiriita:** PP-dossier: "fûts de colonnes en granit gris-vert" (puutarhan péristyle). Museon ja Pariisin kaupungin sivut eivät mainitse Vosgesia | EPÄVARMA | Vain Wikipedia/Ouest-France sanovat "vaaleanpunainen Vosges"; museon oma aineisto sanoo harmaanvihreä. **Korjaus:** "Sen pylväät ovat graniittia" (lyhyempi) tai "Sen pylväät ovat harmaanvihreää graniittia" (museo). |
| P14 | Koristeissa on kullattua pronssia | W-EN ("gilt-bronze", Anderson 1900/Worsdale) | **Ristiriita:** PP-historia: "guirlandes de métal doré" (Girault suunnitteli); PP-dossier: "statues en zinc doré" | EPÄVARMA | Museo puhuu kullatusta metallista/sinkistä, ei pronssista. **Korjaus:** "koristeissa on kullattua metallia" (+1 merkki). |
| P15 | Suojeltu historiallinen monumentti vuodesta 1975 | https://www.pop.culture.gouv.fr/notice/merimee/PA00088878 (inscrit MH, arrêté 15.1.1975) | https://www.parismusees.paris.fr/fr/actualite/portrait-d-un-lieu-le-petit-palais-musee-des-beaux-arts-de-paris ("monument historique depuis 1975"); W-FR | OK | Tarkka status: "inscrit" (lisätty luetteloon), ei "classé". |

Yhteenveto PP: OK 11, EPÄVARMA 4 (P4, P9, P13, P14), EI 0.

---

## 2. Tour Montparnasse

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| T1 | "Vanhan Pariisin ainoa pilvenpiirtäjä" | https://www.paris.fr/pages/la-tour-montparnasse-fete-ses-50-ans-24034 ("seul gratte-ciel du centre de Paris") | W-EN https://en.wikipedia.org/wiki/Tour_Montparnasse (tallest in Paris proper; ei "ainoa") ; https://www.pariszigzag.fr/insolite/histoire-insolite-paris/la-tour-montparnasse-une-histoire-de-records-et-de-controverses/ ("plus haut gratte-ciel de Paris intra-muros") | EPÄVARMA | Vain Pariisin kaupunki sanoo "keskustan ainoa pilvenpiirtäjä"; kaupungissa on muita korkeita torneja (mm. Front de Seine) ja Tour Triangle on rakenteilla. **Korjaus:** "Pariisin keskustan ainoa pilvenpiirtäjä" (+3 merkkiä, Pariisin kaupunki) tai "Pariisin korkein rakennus" (lyhyempi, W-EN + Paris Zigzag). |
| T2 | Paikalla seisoi ennen rautatieasema | https://www.paris.fr/pages/la-tour-montparnasse-fete-ses-50-ans-24034 (torni entisen aseman paikalla) | https://en.wikipedia.org/wiki/Gare_Montparnasse (vanha asema purettiin 1969, torni sen paikalle) ; W-FR Tour Montparnasse | OK | Huom: onnettomuuden 1895 asema oli 1852 rakennus, purettu asema oli myöhempi (W-EN: 1934 asema); torni on joka tapauksessa saman aseman paikalla. |
| T3 | Lokakuussa 1895 Granvillestä tullut juna ei pysähtynyt ajoissa | https://en.wikipedia.org/wiki/Montparnasse_derailment (22.10.1895, Granville-Paris Express, jarru ei tehonnut) | https://www.pariszigzag.fr/insolite/histoire-insolite-paris/en-1895-un-train-transpercait-la-facade-de-la-gare-montparnasse/ (22.10.1895, Granvillestä, juna 56) | OK | |
| T4 | Veturi syöksyi aseman seinästä kadulle | W-EN Montparnasse derailment (läpi 60 cm seinän, putosi n. 10 m Place de Rennesille) | Paris Zigzag (sama, https://www.pariszigzag.fr/insolite/histoire-insolite-paris/en-1895-un-train-transpercait-la-facade-de-la-gare-montparnasse/) ; Musée d'Orsayn "Accident at the Gare de l'Ouest" (viitattu W-EN:ssä, ei avattu) | OK | |
| T5 | Veturi jäi roikkumaan nokka alaspäin | W-EN Montparnasse derailment ("stood on its nose" kadulla, ei roikkunut) | Paris Zigzag (veturi päätyi Place de Rennesille, useita metrejä alemmas) | EPÄVARMA | "Roikkumaan" ei tue lähteitä: veturi putosi kadulle ja jäi pystyyn nokkansa varaan. **Korjaus:** "veturi jäi seisomaan nokka alaspäin" (35 merkkiä, alkuperäinen 36). |
| T6 | Valokuva onnettomuudesta kiersi maailmaa | W-EN Montparnasse derailment ("one of the most famous in transportation history", Lévy & Fils) | Paris Zigzag: valokuvat säilyttivät muiston (ei "maailmaa kiertänyt") | EPÄVARMA | Vain W-EN tukee "kuuluisin"; "kiersi maailmaa" ei suoraan sanottu. **Korjaus:** "Onnettomuudesta jäi kuuluisa valokuva" (37; alkuperäinen 40). |
| T7 | Vanha asema purettiin 1960-luvulla, uusi rakennettiin hieman etelämmäs | https://en.wikipedia.org/wiki/Gare_Montparnasse (1960-luvulla uusi asema vähän etelään; vanha purettiin 1969) | https://www.paris.fr/pages/la-tour-montparnasse-fete-ses-50-ans-24034 (asema "déplacée"); W-FR Tour Montparnasse (uusi asema muutaman sadan metrin päähän etelään 1966-1969) | OK | Toinen lähde tukee siirtoa, ei purkua erikseen; purku seuraa siitä, että torni nousi paikalle. |
| T8 | Torni rakennettiin 1969–1973 | https://www.paris.fr/pages/la-tour-montparnasse-fete-ses-50-ans-24034 (1969-1973; ensimmäinen kivi 1970; 18.6.1973) | W-EN/FR ; https://www.skyscrapercenter.com/building/tour-montparnasse/1487 (valmis 1973) | OK | |
| T9 | 210 metriä ja 59 kerrosta | https://www.paris.fr/pages/la-tour-montparnasse-fete-ses-50-ans-24034 (210 m, 59 kerrosta) | **Eroaa:** CTBUH Skyscraper Center https://www.skyscrapercenter.com/building/tour-montparnasse/1487: 209 m, 58 kerrosta; Paris Zigzag: 209 m, 59 krs; W-EN: 210 m, 59 (infobox 60) | EPÄVARMA | Lukuja käytetään vaihtelevasti. **Korjaus:** "noin 210 metriä ja 59 kerrosta" (+5 merkkiä) tai "yli 200 metriä korkea ja 59-kerroksinen". |
| T10 | Tumma lasi- ja teräsjulkisivu | https://bonjourparis.com/monuments-and-sights/do-you-know-the-most-visible-monument-in-paris/ ("glass paneled black giant") | W-FR (julkisivu tumma ja karu); https://theb1m.com/video/the-plan-to-save-paris-most-hated-building (tumma julkisivu korvataan läpinäkyvällä lasilla); paris.fr: "betonirakenne ja lasijulkisivu" (ei terästä) | EPÄVARMA | Tumma lasi OK, "teräs" ei tuettu (paris.fr: betoni + lasi; vain W-EN mainitsee "glass and steel wall" sivulauseessa). **Korjaus:** "Tumma lasijulkisivu" (lyhyempi). |
| T11 | Edusti sodanjälkeistä kansainvälistä tyyliä, jossa koristeet karsittiin pois | W-FR (International Style, tumma ja karu julkisivu) | Ei toista lähdettä: haku ei löytänyt "style international" -luonnehdintaa millään luotettavalla arkkitehtuurilähteellä | EPÄVARMA | Vain Wikipedia. **Korjaus:** "Tumma lasijulkisivu oli koristeeton ja ankara." (lähteet: "austère" W-FR, "monolithic" Bonjour Paris, B1M), tai jos tyyli halutaan mainita: "edusti sodanjälkeistä modernia rakentamista" (yleisluonne, ei suoraa lähdettä). |
| T12 | Pariisilaiset eivät pitäneet tornista | https://www.paris.fr/pages/la-tour-montparnasse-fete-ses-50-ans-24034 (kriittinen vastaanotto; "hérésie urbaine", "veuve noire") | https://bonjourparis.com/monuments-and-sights/do-you-know-the-most-visible-monument-in-paris/ ; https://www.euronews.com/2023/06/14/paris-says-non-to-tall-buildings-but-whats-behind-the-ban ("blot on the landscape") ; W-EN (Criticism) | OK | |
| T13 | Muutama vuosi valmistumisen jälkeen keskustan uusien rakennusten korkeus rajattiin 25 metriin ja reuna-alueilla 31–37 metriin | https://www.dezeen.com/2023/06/06/paris-skyscraper-ban/ ja https://www.euronews.com/2023/06/14/paris-says-non-to-tall-buildings-but-whats-behind-the-ban (1977 raja, osin vastaus Montparnassen torniin; 37 m) | https://theb1m.com/video/the-plan-to-save-paris-most-hated-building (1977, 25 m keskustassa); Le Moniteur (hakutiiv., sivu 403): POS 1977: 25 m keskusta / 31 m reuna-arrondissementit / 37 m UD-vyöhyke https://www.lemoniteur.fr/article/construire-de-nouvelles-tours-a-paris.463674 ; https://mediation.centrepompidou.fr/education/ressources/ENS-architecture-Centre-Pompidou/monument_dans_ville/p2_sp_1.htm (keskustassa 25 m) ; **eroaa:** W-FR/W-EN: 7 kerroksen kielto 1975 (W-EN: "kaksi vuotta valmistumisen jälkeen"); fr-academic (W-FR-peilaus): PUD 1967 sanoo 31 m keskusta / 37 m reuna | EPÄVARMA | Vuosi 1977 ja 25 m keskustassa ovat hyvin tuettuja; 31 m ja 37 m -jako vaihtelee lähteittäin (31 m vain Moniteur ja Wikipedia-peilaus, monissa vain "37 m") ja jotkut sijoittavat rajoituksen 1974-75. Syy-yhteys Montparnasseen on lähteissä "osin". **Korjaus:** "Muutama vuosi sen valmistumisen jälkeen Pariisin keskustan uusien rakennusten korkeus rajattiin 25 metriin ja muualla enintään 37 metriin" (+7 merkkiä); tiukempi: "...rajattiin 25 metriin keskustassa" (sama pituus). |
| T14 | Sanonta: kaunein näköala on tornin huipulta, koska sieltä ei näe tornia | https://bonjourparis.com/monuments-and-sights/do-you-know-the-most-visible-monument-in-paris/ (vitsi, Maupassant-logiikalla) | W-EN Tour Montparnasse (Criticism, viite NYT 2008 Ouroussoff); matkaoppaat (parispass, urbansider) toistavat saman | OK | Sanonta on vitsi, "usein toistettu" kestää. Maupassantin alkuperäinen koski Eiffel-tornia (Paris Zigzag). |
| T15 | Ranskan korkein rakennus vuoteen 2011 asti | https://www.paris.fr/pages/la-tour-montparnasse-fete-ses-50-ans-24034 (korkein 38 vuotta, kunnes La Défensen First-torni (231 m) ohitti) | W-EN ja W-FR (Tour First valmistui 2011) ; Paris Zigzag (records-artikkeli): korkein 2011 asti | OK | Korvaaja: Tour First (231 m, La Défense, 2011). |

Yhteenveto TM: OK 8 (T2, T3, T4, T7, T8, T12, T14, T15), EPÄVARMA 7 (T1, T5, T6, T9, T10, T11, T13), EI 0.

---

## 3. Metro 1900

| # | Väite | Lähde 1 | Lähde 2 | Tuomio | Huom / korjausehdotus |
|---|---|---|---|---|---|
| M1 | Metro avattiin maailmannäyttelyn aikaan 19.7.1900 | RATP, André Mignard (RATP:n Guimard-historiaprojektin vetäjä): "la Ville de Paris inaugure le 19 juillet 1900 son ... métropolitain" https://www.ars-metallica.fr/wp-content/uploads/2015/08/guimard-texte-historique-ratp.pdf | https://ebsco.com/research-starters/history/paris-metro-opens (19.7.1900) ; RATP ligne 1 -sivu https://www.ratp.fr/decouvrir/patrimoine/histoire-metro-ligne-1 (hakutiiv.); W-EN (avattu Expon alettua) | OK | Näyttely 15.4.-12.11.1900. |
| M2 | Ensimmäinen linja (1) yhdisti Porte de Vincennes'in ja Porte Maillot'n | https://ebsco.com/research-starters/history/paris-metro-opens (Porte de Vincennes - Porte Maillot) | RATP ligne 1 https://www.ratp.fr/decouvrir/patrimoine/histoire-metro-ligne-1 (hakutiiv., 8 asemaa avajaisissa, loput 6.8.-1.9.1900) ; https://en.wikipedia.org/wiki/Paris_Metro_Line_1 | OK | |
| M3 | Sisäänkäynneistä järjestettiin kilpailu, 21 ehdotusta, yksikään ei kelvannut | RATP/Mignard PDF: kilpailu päättyi elokuussa 1899, "il y eut 21 projets"; prefekti hylkäsi joulukuun lopussa kaksi tunnetun arkkitehdin (Friesé, Formigé) ehdotusta | https://fr.wikipedia.org/wiki/Entr%C3%A9e_de_m%C3%A9tro_Guimard ("sur 21 projets, aucun n'est retenu"); https://www.lecercleguimard.fr/?p=2851 (21 projektia, joulukuun hylkäys) | OK | RATP ei sano sanatarkasti "yksikään ei kelvannut", mutta W-FR ja Cercle Guimard sanovat. Kestää. |
| M4 | Guimard ei ollut osallistunut kilpailuun | W-FR (Guimard "hors concours"; CMP palkkasi 12.1.1900) | https://www.lecercleguimard.fr/?p=2851 (Guimard ei osallistu 1899 kilpailuun); Cairn https://shs.cairn.info/revue-histoire-economie-et-societe-2021-2-page-103?lang=fr (hakutiiv.: hänet valittiin vaikka hän ei osallistunut) | OK | RATP-teksti toteaa vain, että hänet palkattiin "au vu de ses dessins" ja että valinnassa on "zones d'ombre". |
| M5 | Työ annettiin Hector Guimardille | RATP/Mignard PDF (CMP palkkaa Guimardin 12.1.1900) | https://en.wikipedia.org/wiki/Paris_Metro_entrances_by_Hector_Guimard ; https://www.paris.fr/pages/paris-celebre-hector-guimard-en-2024-25892 | OK | |
| M6 | Valurautaiset vakio-osat, joista koottiin sisäänkäynti mihin tahansa kadunkulmaan | W-FR (vakioidut valurautaelementit, toistettavissa ja sovitettavissa paikkaan; Val d'Osne -valimo) | https://passerelles.essentiels.bnf.fr/fr/article/d031488c-5e75-4c6a-a1eb-775aca8e02c4-guimard-et-metro-parisien (valurauta, useita malleja yhdestä peruspiirustuksesta) ; https://en.wikipedia.org/wiki/Paris_Metro_entrances_by_Hector_Guimard (standardised, adaptable components) ; https://www.paris.fr/pages/paris-celebre-hector-guimard-en-2024-25892 (valurauta, emali-laava) | OK | "Kuin rakennussarja" on kuvaus; "kit of parts" -ajatus tukee. |
| M7 | Guimardin tyyli oli jugendia (Art Nouveau) | https://www.paris.fr/pages/paris-celebre-hector-guimard-en-2024-25892 | RATP/Mignard PDF ("chefs-d'œuvre de l'Art Nouveau") ; BnF Passerelles | OK | |
| M8 | Sisäänkäyntejä tehtiin 167 | RATP/Mignard PDF (88 jäljellä) ja RATP:n Guimard-sivu https://www.ratp.fr/en/discover/heritage/hector-guimard (hakutiiv.: 167 toteutettu) | https://www.paris.fr/pages/paris-celebre-hector-guimard-en-2024-25892 (167 teosta 107 asemalla) ; W-FR (167) | OK | W-EN antaa 141 ja BnF 141/166: luku vaihtelee laskutavan mukaan, mutta RATP, Pariisin kaupunki ja W-FR sanovat 167. |
| M9 | Tyyli meni pois muodista ja puolet purettiin | https://www.paris.fr/pages/paris-celebre-hector-guimard-en-2024-25892 (muoti vaihtui; 1904-1969 purettiin asteittain) | W-FR (ensimmäisen maailmansodan jälkeen suurin osa pikkuhuviloista ja lähes puolet ympäröivistä kaiteista purettiin); RATP/Mignard PDF (maku muuttui sodan jälkeen) | OK | 167 -> 88 = 79 purettu (47 %), joten "lähes puolet" olisi tarkin; "puolet" kestää pyöristyksenä. |
| M10 | Jäljellä 88 | RATP/Mignard PDF ("88 ouvrages subsistants") | https://www.paris.fr/pages/paris-celebre-hector-guimard-en-2024-25892 ("il n'en reste que 88") | OK | W-EN antaa 86 (vanhempi luku). |
| M11 | Valtaosa suojeltiin 1978 | RATP Guimard-sivu https://www.ratp.fr/en/discover/heritage/hector-guimard (hakutiiv.: 86 suojeltu historiallisina monumentteina vuodesta 1978) | W-FR (29.5.1978: 86 teosta suojeltu); W-EN (kuusi 1965, loput 1978); POP PA00086548 https://pop.culture.gouv.fr/notice/merimee/PA00086548 (1978 suojelu korvattu 2016 uudella) | OK | 86 / 88 = valtaosa. Tarkennus: 1978 päätös, osa uudistettu 2016. |

Yhteenveto Metro 1900: OK 11, EPÄVARMA 0, EI 0.

---

## Kokonaisyhteenveto

| Juttu | OK | EPÄVARMA | EI |
|---|---|---|---|
| Petit Palais | 11 | 4 (P4, P9, P13, P14) | 0 |
| Tour Montparnasse | 8 | 7 (T1, T5, T6, T9, T10, T11, T13) | 0 |
| Metro 1900 | 11 | 0 | 0 |

## Valmiit korvaussanamuodot (EPÄVARMA)

Petit Palais
- P4: "10. lokakuuta 1897" -> "lokakuussa 1897"; vuodet-rivi `kohta` 'lokakuuta 1897' -> 'lokakuussa 1897'. Syy: museon oma kronologia sanoo 15.10.1897, W-EN ja Ouest-France 10.10.
- P9: "Dutuitin veljesten lahjoittama keskiajan ja renessanssin teosten kokoelma" -> "Dutuitin veljesten testamenttaama taidekokoelma" (tai +"mm. keskiajan ja renessanssin esineitä").
- P13: "Sen pylväät ovat vaaleanpunaista Vosgesien graniittia" -> "Sen pylväät ovat graniittia".
- P14: "kullattua pronssia" -> "kullattua metallia".

Tour Montparnasse
- T1: "vanhan Pariisin ainoa pilvenpiirtäjä" -> "Pariisin keskustan ainoa pilvenpiirtäjä" (paris.fr) tai "Pariisin korkein rakennus".
- T5: "veturi jäi roikkumaan nokka alaspäin" -> "veturi jäi seisomaan nokka alaspäin".
- T6: "Valokuva onnettomuudesta kiersi maailmaa" -> "Onnettomuudesta jäi kuuluisa valokuva".
- T9: "210 metriä ja 59 kerrosta" -> "noin 210 metriä ja 59 kerrosta".
- T10 + T11: "Tumma lasi- ja teräsjulkisivu edusti sodanjälkeistä kansainvälistä tyyliä, jossa koristeet karsittiin pois." -> "Tumma lasijulkisivu oli koristeeton ja ankara." (tai "...edusti sodanjälkeistä modernia rakentamista").
- T13: "keskustan uusien rakennusten korkeus rajattiin 25 metriin ja reuna-alueilla 31–37 metriin" -> "Pariisin keskustan uusien rakennusten korkeus rajattiin 25 metriin ja muualla enintään 37 metriin" (vuosi 1977; syy "osin vastaus torniin" -> sana "muutama vuosi" kestää).

## Muita huomioita
- Petit Palais: museon oman aineiston (dossier) "pääosin valmis huhtikuussa 1900" on tarkempi kuin "valmistui".
- Tour Montparnasse: Wikipedia-peilaussivuja (4everland, cavac.at, pages.dev, llmpedia) ei käytetty lähteinä.
- Metro: kaikki kolme kohdan M3-M4 lähdettä (Cercle Guimard, W-FR, RATP) pohjautuvat osin samaan RATP:n historiatutkimukseen (Mignard 2000), mutta Cairn-artikkeli (Histoire, économie et société 2021) on itsenäinen akateeminen lähde.


## 6. M3: riippumattomien tarkistajien rivit (Sonnet, ei Fable; omat haut, tietämättä aiempia lähteitä)

Kierros 1 (tarkistaja 1 ja 2): 14 juttua, lopullinen teksti. OK: Riemukaari, Sacré-Cœur, Tour Saint-Jacques, Pompidou; EI OK: Concorde, Luxembourg, Panthéon, Notre-Dame, Saint-Eustache, Place des Vosges, Invalidit, Petit Palais, Montparnasse, Metro (kaikki korjattu varovaisemmiksi). Kierros 2 (uusintatarkistus, kaikki 14): **OK:** Notre-Dame, Saint-Eustache, Pompidou, Petit Palais ja Riemukaari (heikko), Concorde (heikko), Luxembourg (heikko), Sacré-Cœur (heikko), Saint-Jacques (heikko), Invalidit (heikko), Montparnasse (heikko); **EI OK:** Panthéon (heilurin purku), Place des Vosges (nimenvaihto), Metro 1900 (21 ehdotusta, "puolet purettiin"). Näiden kolmen ja kierroksen 2 muiden hedge-ehdotusten korjaukset on tehty tarkistajan ehdottamin tai varovaisempin sanoin (commit tämän raportin kanssa); **kolmen EI OK -rivin korjattua tekstiä ei ole tarkistettu neljännellä kierroksella** (konteksti): KK/PT voi tilata sen halutessaan. Taulukot: tarkistaja-1..3 (scratchpad, 20.11.2026).

