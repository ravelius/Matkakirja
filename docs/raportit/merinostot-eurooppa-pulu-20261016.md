# Euroopan meri-nostot: inventaario ja Pulun vastausluonnokset (16.10.2026, Sisältökirjuri)

PT:n faktatarkistus 16.10. klo 00.3x (scratchpad merinostot-tarkistus-20261016.md) on tehty tähän: 3 virhettä korjattu, noin 20 varovammin muotoiltu, 79 yhdistetty 77:ään (tupla). Numerot ovat luonnosten järjestysnumeroita.

PT:n erä (omistaja 23.56: merien nimet klikattaviksi nostoiksi; tekstit; Pulun kysymykset). VAIN EUROOPPA. Ei äänitystä, ei kytkentää; PT vie omistajalle hyväksyttäväksi.

## 1. Inventaario

Lähde: js/packs/maastokohteet-<maa>.js, tyyppi 'meri' (sisältää myös järviä). Euroopan nostoiksi laskettu: ne, joilla on 'europe'-lauta (34), sekä Euroopan maiden meri- ja järvinostot ilman Euroopan lautaa (13: Peipsi, Saimaa, Vänern, Mývatn, Grönlanninmeri, Levantinmeri, Kap Greco, Jurassic Coast, Amalfin rannikko, Tropea, Kotorinlahti, Barentsinmeri ja Jäämeri Venäjän puolella). Pois: Arktiksen, Antarktiksen ja muiden maanosien nostot.

- Nostoja yhteensä: **47**. Jokaisella on **teksti** (250–950 merkkiä), `nappi`-selite ja **2 kysymystä**. Tekstit siis on tehty.
- Kysymyksiä yhteensä 94, **eri kysymyksiä 81** (sama kysymys toistuu eri maiden rannikoilla, esim. Itämeren murtovesi 6 nostossa, Gibraltarinsalmi 4).
- **Esikirjoitettuja Pulun vastauksia ei ole yhtään**: kortin kysymysnappi kutsuu polloKysy(kysymys, {aihe}) (js/fokusnosto.js piirraNostonKysymykset), ja vastaus tulee elävältä mallilta kortin tekstin pohjalta. Luonnokset alla ovat ensimmäiset esikirjoitetut vastaukset (45–60 sanaa, kuten pyydetty).
- Klikattavuus: nämä ovat kohdenostoja (kohde-rivi tyyppi meri, teksti + kysymykset), ei erillisiä merinimitekstejä. Onko merien NIMET kartalla klikattavia, on Pelikoodarin/Karttasepän tarkistettava; en muuttanut koodia.

| maa | id | nimi | lauta | teksti (merkkiä) | kysymykset (pelaajalle) | esikirjoitettu Pulun vastaus |
|---|---|---|---|---|---|---|
| bih | adrianmeri | Adrianmeri | europe | 293 | Miksi maan rannikko on niin lyhyt? / Mikä Otranton salmi on? | ei |
| cyp | levantinmeri | Levantinmeri | vain maailmankartta | 642 | Mikä on lessepsiläinen vaellus? / Miten Suezin kanava muutti Välimeren eliöstöä? | ei |
| cyp | kapgreco | Kap Greco | vain maailmankartta | 493 | Mikä oli niemen antiikinaikainen nimi? / Miten merenalaiset luolat syntyvät kalkkikiveen? | ei |
| dnk | pohjanmeri | Pohjanmeri | europe | 287 | Mikä Vattimeri on? / Miksi Jyllannin länsirannikko on niin suora? | ei |
| dnk | itameri | Itämeri | europe | 773 | Miksi Itämeren vesi on murtovettä? / Mitkä salmet yhdistävät Itämeren Pohjanmereen? | ei |
| dza | valimeri | Välimeri | europe | 414 | Mikä oli Messinan suolakriisi? / Miten kuivunut meri täyttyi uudelleen? | ei |
| esp | valimeri | Välimeri | europe | 317 | Kuinka kapea Gibraltarinsalmi todella on? / Mitä Espanjan Välimeren rannikolla kalastetaan? | ei |
| est | itameri | Itämeri | europe | 754 | Miksi Itämeren vesi on murtovettä? / Miksi Viron saaret ovat niin matalia? | ei |
| est | suomenlahti | Suomenlahti | europe | 250 | Miksi Tallinnasta tuli hansakaupunki? / Kuinka syvä Suomenlahti on? | ei |
| est | peipsi | Peipsijärvi | vain maailmankartta | 830 | Mitä järven jäällä tapahtui vuonna 1242? / Mihin Peipsin vedet lopulta laskevat? | ei |
| fin | pohjanlahti | Pohjanlahti | europe | 739 | Mikä Merenkurkku on? / Miksi Pohjanlahden rannat nousevat yhä? | ei |
| fin | suomenlahti | Suomenlahti | europe | 250 | Mikä joki laskee Suomenlahden pohjukkaan? / Miksi lahden ympäristöongelmat ovat pahimpia juuri täällä? | ei |
| fin | saimaa | Saimaa | vain maailmankartta | 931 | Miksi saimaannorppa elää vain täällä? / Mihin Saimaan vedet laskevat? | ei |
| fra | valimeri | Välimeri | europe | 394 | Kuinka kapea Gibraltarinsalmi todella on? / Miksi Välimeri on niin suolainen? | ei |
| fra | biskajanlahti | Biskajanlahti | europe | 306 | Miksi Biskajanlahti on niin pahamaineinen merenkulkijoille? / Mitä eläimiä lahdella tapaa? | ei |
| gbr | pohjanmeri | Pohjanmeri | europe | 305 | Miksi Pohjanmeri on niin matala? / Milloin Pohjanmereltä löydettiin öljy? | ei |
| gbr | irlanninmeri | Irlanninmeri | europe | 304 | Mikä Mansaari on? / Miksi merta kutsutaan joskus Manxinmereksi? | ei |
| gbr | jurassic-coast-durdle-door | Jurassic Coast ja Durdle Door | vain maailmankartta | 535 | Miten meri on muovannut kallioon valtavan kaaren? / Kuinka pitkän ajan geologinen historia näkyy Jurassic Coastilla? | ei |
| irl | irlanninmeri | Irlanninmeri | europe | 304 | Mikä Yrjönkanaali on? / Miksi Mansaari on oma alueensa? | ei |
| isl | gronlanninmeri | Grönlanninmeri | vain maailmankartta | 334 | Kuuluuko Grönlanninmeri Jäämereen vai Atlanttiin? / Mikä Framinsalmi on? | ei |
| isl | myvatn | Mývatn | vain maailmankartta | 821 | Mistä järvi on saanut nimensä? / Miksi sorsia on juuri täällä niin paljon? | ei |
| ita | adrianmeri | Adrianmeri | europe | 278 | Miksi Venetsia rakennettiin juuri tänne? / Mikä Otranton salmi on? | ei |
| ita | tyrrhenanmeri | Tyrrhenanmeri | europe | 724 | Keitä tyrrhenialaiset olivat? / Miksi meren pohjassa on tulivuoria? | ei |
| ita | ligurianmeri | Ligurianmeri | europe | 602 | Keitä liguurit olivat? / Mikä Välimeren valassuojelualue on? | ei |
| ita | messinansalmi | Messinansalmi | europe | 784 | Mikä oli Kharybdis? / Miksi salmen yli ei vieläkään kulje siltaa? | ei |
| ita | amalfin-rannikko | Amalfin rannikko | vain maailmankartta | 495 | Mistä limoncellon sitruunat tulevat? / Kuka ryösti Amalfin vuonna 1137? | ei |
| ita | tropea | Tropea | vain maailmankartta | 505 | Millä rannikolla Tropea sijaitsee? / Millaisella kalliolla Santa Maria dell'Isola on? | ei |
| ltu | itameri | Itämeri | europe | 737 | Mikä Kuurinkynnäs on? / Miksi Itämeren vesi on murtovettä? | ei |
| lva | itameri | Itämeri | europe | 767 | Miksi Itämeren vesi on murtovettä? / Miksi Riianlahti on erillinen? | ei |
| mne | kotorinlahti | Kotorinlahti | vain maailmankartta | 672 | Kuinka kapea Kotorinlahti on kapeimmillaan? / Minkä vuoristojen väliin lahti jää? | ei |
| nld | pohjanmeri | Pohjanmeri | europe | 302 | Miten hollantilaiset ovat vallanneet maata mereltä? / Miksi Pohjanmeri on niin matala? | ei |
| nor | norjanmeri | Norjanmeri | europe | 334 | Miksi Norjan rannikko pysyy sulana talvella? / Mikä Jan Mayenin harjanne on? | ei |
| nor | barentsinmeri | Barentsinmeri | europe | 717 | Kuka Willem Barentsz oli? / Miksi merta kutsuttiin ennen Murmanskinmereksi? | ei |
| pol | itameri | Itämeri | europe | 762 | Miksi Itämeren vesi on murtovettä? / Miksi Itämerellä ei ole vuorovettä? | ei |
| prt | atlantti | Atlantti | europe | 313 | Miksi juuri portugalilaiset lähtivät Atlantille ensimmäisinä? / Kuinka syvä Atlantti on? | ei |
| rou | mustameri | Mustameri | europe | 321 | Miksi Mustanmeren syvyys on hapeton? / Mistä meri sai nimensä? | ei |
| rus | barentsinmeri | Barentsinmeri | vain maailmankartta | 780 | Kuka Willem Barentsz oli? / Miksi Murmansk ei jäädy talvella? | ei |
| rus | jaameri | Jäämeri | vain maailmankartta | 481 | Kuinka paksua Jäämeren jää on? / Miksi jotkut kutsuvat sitä Atlantin suistoksi? | ei |
| swe | itameri | Itämeri | europe | 787 | Miksi Itämeren vesi on murtovettä? / Miksi Gotlanti oli kauppareittien risteys? | ei |
| swe | pohjanlahti | Pohjanlahti | europe | 744 | Mikä Merenkurkku on? / Miksi Pohjanlahden rannat nousevat? | ei |
| swe | vanern | Vänern | vain maailmankartta | 832 | Miksi järvessä elää merieläimiä? / Mihin Vänernin vedet laskevat? | ei |
| syr | valimeri | Välimeri | europe | 281 | Kuinka kapea Gibraltarinsalmi todella on? / Miksi Syyrian rannikkoa kutsutaan Levantiksi? | ei |
| tun | valimeri | Välimeri | europe | 678 | Miksi Välimerta ympäröi maa lähes joka suunnalta? / Mitä reittiä Välimereltä pääsee valtamerelle? | ei |
| tur | marmaranmeri | Marmaranmeri | europe | 380 | Miksi Bosporinsalmi on niin tärkeä? / Mikä Dardanellit on? | ei |
| tur | valimeri | Välimeri | europe | 349 | Kuinka kapea Gibraltarinsalmi todella on? / Miksi Anatolian etelärannikkoa kutsutaan Turkoosiksi rannikoksi? | ei |
| ukr | mustameri | Mustameri | europe | 321 | Miksi Mustameren syvyys on hapeton? / Mistä meri sai nimensä? | ei |
| ukr | asovanmeri | Asovanmeri | europe | 307 | Mikä Kertšinsalmi on? / Miksi Asovanmeri on niin matala? | ei |

## 2. Havaintoja

- Pohjanlahden nostokortti sanoo, että maa painui lähes kilometrin; NASAn arvio on yli 500 m. Vastaus ei käytä lukua; kortin teksti kannattaa tarkistaa (Karttaseppä).
- Merenkurkun Unesco-vuosi: Metsähallitus 2006 (en.wikipedia 2000); vastaus ei käytä vuotta.
- Kirjoitusvirhe: ukr/mustameri-nostossa kysymys "Miksi Mustameren syvyys on hapeton?" (rou/mustameri: "Mustanmeren", oikein); korjattava js/packs/maastokohteet-ukr.js:ään (Karttaseppä).
- Vänernin kysymys "Miksi järvessä elää merieläimiä?" sisältää osin väärän oletuksen (jääkauden jäännelajeja, ei merieläimiä); vastaus oikaisee.
- Heikoimmin tuetut ja pudotetut luvut: kunkin vastauksen kohdalla alla (sekä docs/kohtaukset/merinostot/meri-pulu-<1..6>.json tarkistus-kentät).

## 3. Pulun vastausluonnokset (81 kysymystä; korjattu PT:n tarkistuksen jälkeen)

Muoto: kysymys; vastaus (sanoja); käyttökohteet; huom. Lähteet ja tarkistukset JSON-tiedostoissa docs/kohtaukset/merinostot/meri-pulu-*.json.

### 1. Mikä Vattimeri on?

Vattimeri on Pohjanmeren kaakkoisrannan matala vuorovesialue Alankomaiden, Saksan ja Tanskan edustalla. Se ulottuu yli 400 kilometrin matkalla, ja pinta-alaa on yli 10 000 neliökilometriä. Unesco kuvaa sitä maailman laajimmaksi yhtenäiseksi vuorovesihiekan ja -mudan alueeksi. Se on tärkeä levähdyspaikka muuttolinnuille, ja laskuveden aikaan sen pohja paljastuu.

*45 sanaa · kohteet: dnk/pohjanmeri*

Huom (kirjoittaja): Lähteet antavat 450 ja 500 km sekä 10 000 ja 11 400 km2, joten vastauksessa käytetään vain alarajoja ('yli'). · Sivun whc.unesco.org WebFetch antoi 403, joten UNESCOn lause on vain hakutuloksen tiivistelmästä. · Lintujen lukumääriä (10-12 miljoonaa) ei käytetä, vain yksi lähde. · Kysymyksessä oleva nimi 'Vattimeri' vastaa Wadden Seaa (hollanniksi Waddenzee).

### 2. Miksi Jyllannin länsirannikko on niin suora?

Meri on tehnyt sen suoraksi. Länsiranta on hiekkaista ja avoinna Pohjanmeren länsituulille ja aalloille. Jäätikön jättämä irtonainen maa ei vastustanut aaltoja, ja ne kuluttivat kukkuloita ja rakensivat särkkiä lahtien eteen. Skagenista Skallingeniin kulkee lähes yhtenäinen dyynivyö, satoja kilometrejä pitkä. Rannikon muoto ei siis johdu maaston alkuperäisestä muodosta vaan aaltojen työstä.

*50 sanaa · kohteet: dnk/pohjanmeri*

**PT 16.10.: "noin 300 km" -> "satoja kilometrejä" (korjattu).**

Huom (kirjoittaja): Yksikään lähde ei sano suoraan 'suora koska X' kuin vuoden 1960 artikkeli; CoastalWiki tukee mekanismia (aallot, hiekan kuljetus, dyynit). Heikommin tuettu kuin muut. · 300 km vain yhdestä lähteestä, siksi 'noin'. · Jätetty pois vastauksesta, koska vain yksi lähde.

### 3. Miksi Itämeren vesi on murtovettä?

Koska mereen virtaa paljon makeaa jokivettä, mutta suolaista vettä pääsee sisään vain kapeiden ja matalien Tanskan salmien kautta. Itämeren suolaisuus on noin 7 promillea eli noin viidesosa valtamerten 35 promillesta. Salmien kynnykset ovat alle 20 metriä syviä. Murtovesi on siis suolaisempaa kuin järvivesi mutta paljon vähemmän suolaista kuin valtameri. Pohjoisissa lahdissa vesi on lähes makeaa.

*55 sanaa · kohteet: dnk/itameri, est/itameri, ltu/itameri, lva/itameri, pol/itameri, swe/itameri*

Huom (kirjoittaja): Meier & Kauker (hakutulos) antaa 7,4 promillea; sopii. · Lähteet eroavat metrillä, siksi 'alle 20 m' eikä tarkkoja lukuja.

### 4. Mitkä salmet yhdistävät Itämeren Pohjanmereen?

Tanskan salmet: Juutinrauma eli Öresund sekä Iso-Belt ja Vähä-Belt. Ne johtavat Itämereltä Kattegatin kautta Pohjanmerelle. Juutinrauman kapein kohta on Helsingørin ja Helsingborgin välillä, vain noin neljä kilometriä leveä. Juutinrauman kynnys on vain noin 8 metriä syvä. Siksi suolaista vettä pääsee Itämereen vain vähän ja harvakseltaan.

*45 sanaa · kohteet: dnk/itameri*

Huom (kirjoittaja): Toinen lähde on hakutulosten tiivistelmä. · Eri lähteet 7 ja 8 m, siksi 'noin 8'.

### 5. Miksi Viron saaret ovat niin matalia?

Ne ovat nousseet merestä vasta jääkauden jälkeen ja lepäävät tasaisen kalkkikiven päällä. Saarenmaan korkein kohta, Raunamägi, on vain 54 metriä, ja Hiidenmaankin korkein kohta vain 68. Maa kohoaa täällä yhä noin 2–3 millimetriä vuodessa, joten meri vetäytyy ja saaret kasvavat hitaasti. Matala maisema kertoo jäätiköiden painaman maan palautuvan yhä.

*49 sanaa · kohteet: est/itameri*

Huom (kirjoittaja): PeakVisor antaa 65 m; kaksi lähdettä sanoo 54 m, käytetään sitä. · Molemmat Wikipedian artikkeleita; riippumatonta toista lähdettä ei hakutuloksissa. · Vaihteluväli 2-3 mm eri paikoissa. · Vuosilukuja ei käytetä vastauksessa, koska saaret nousivat eri aikoina.

### 6. Miksi Tallinnasta tuli hansakaupunki?

Koska se sijaitsi Suomenlahden rannalla keskeisellä kauppareitillä Novgorodin ja Länsi-Euroopan välillä. Kaupunki sai Lyypekin kaupunkioikeudet vuonna 1248, mikä sitoi sen saksalaisten kauppakaupunkien verkostoon, ja liittyi Hansaan 1200-luvun lopulla. Hansakaupunkina Tallinna varakastui, ja sen kauppiaat rakensivat puutalonsa uudelleen kivestä. Vanhakaupunki on Unescon maailmanperintökohde, ja se kertoo keskiaikaisesta kauppakaupungista.

*47 sanaa · kohteet: est/suomenlahti*

Huom (kirjoittaja): Hakutulokset eroavat täsmällisestä vuodesta (osa antaa 1248), joten vastauksessa vain 'lopulla'. Vuosi 1285 on kirjattu vain Wikipediaan ja WorldAtlasiin. · UNESCOn sivun WebFetch antoi 403. · Kivestä rakentaminen 1400-luvulla vain hakutuloksessa (WorldAtlas); vastauksessa ei mainita vuosisataa.

### 7. Kuinka syvä Suomenlahti on?

Keskimäärin noin 38 metriä ja syvimmillään 123 metriä. Itämeren keskisyvyys on 54 metriä ja syvin kohta 459 metriä, joten Suomenlahti on verrattain matala. Lahti on Itämeren itäisin haara ja pinta-alaltaan noin 29 500 neliökilometriä. Matalaan lahteen kertyy ravinteita herkästi, siksi sen tila heijastaa koko meren ongelmia.

*46 sanaa · kohteet: est/suomenlahti*

Huom (kirjoittaja): Lähteet 37 ja 38; 'noin 38'. · en.wikipedia antaa 115 m, mutta kaksi lähdettä (mukaan lukien viranomaisen Itameri.fi) antaa 123 m. · Vain Itameri.fi; luvut ovat laajalti tunnettuja (Landsortin syvänne 459 m).

### 8. Mitä järven jäällä tapahtui vuonna 1242?

Novgorodin ja Vladimir-Suzdalin joukot voittivat Liivinmaan ritarikunnan ja Tartun piispan joukot 5. huhtikuuta 1242. Novgorodilaisia johti ruhtinas Aleksanteri Nevski. Voitto pysäytti ritarikunnan etenemisen itään. Tarina ritareista, jotka hukkuivat jään murtuessa, ei löydy varhaisimmista kronikoista, ja historioitsijat epäilevät sitä. Tarkka taistelupaikka tiedetään huonosti, koska esineitä ei ole löydetty.

*47 sanaa · kohteet: est/peipsi*

**PT 16.10.: vastaus ja huomautus yhdenmukaistettu: "historioitsijat epäilevät" (jään murtumistarina ei ole varhaisissa kronikoissa).**

Huom (kirjoittaja): Päivämäärä on vanhan ajanlaskun mukaan; Venäjän kirjaston mukaan gregoriaanisessa 12. huhtikuuta. · Aihe on kiistanalainen: vanhin kronikka tuntee jään pettämisen yksityiskohdan, mutta historioitsijat epäilevät koko ritarien hukkumiskuvaa; vastauksessa sanamuoto 'epäilevät'. Taistelupaikka on epävarma (1958-59 vedenalaiset haut eivät löytäneet esineitä). · Vain yksi lähde; muotoiltu varovasti ('tiedetään huonosti').

### 9. Mihin Peipsin vedet lopulta laskevat?

Suomenlahteen, Narvajoen kautta. Joki on noin 77 kilometriä pitkä, ja se alkaa Peipsin koillispäästä lähellä Vasknarvaa ja laskee Narvanlahteen. Narvajoki on Viron suurin joki virtaamaltaan, ja siitä on tullut myös osa Viron ja Venäjän rajaa. Peipsi kuuluu siis Narvan vesistöön, ja sen vedet päätyvät lopulta Itämereen.

*46 sanaa · kohteet: est/peipsi*

Huom (kirjoittaja): Nostokortin teksti sanoo samaa. · Raja kulkee järven keskellä ja Narvajoella.

### 10. Mikä Merenkurkku on?

Merenkurkku on Pohjanlahden kapein kohta Suomen ja Ruotsin välissä. Se erottaa pohjoisen Perämeren eteläisestä Selkämerestä. Mantereiden väli on noin 80 kilometriä, mutta ulkosaarten välillä vain noin 25. Merenkurkun saaristo on Unescon maailmanperintökohde vuodesta 2006, yhdessä Ruotsin Korkean rannikon kanssa, koska maa kohoaa siellä erityisen nopeasti.

*45 sanaa · kohteet: fin/pohjanlahti, swe/pohjanlahti*

Huom (kirjoittaja): Muita lukuja (60-70 km) esiintyy tietyille ylityspaikoille, siksi 'noin'. · en.wikipedia antaa 2000, mutta Metsähallitus ja hakutulokset (Unescon kuvaus) 2006; käytetty 2006. Muutos: jos tarkkuutta halutaan, voi jättää vuoden pois.

### 11. Miksi Pohjanlahden rannat nousevat yhä?

Koska jääkauden mannerjää painoi maankuoren alas, eikä se ole vielä palautunut. Jää oli täällä noin kolme kilometriä paksu. Pohjanlahdella maa kohoaa yhä noin 8–9 millimetriä vuodessa, eli lähes metrin sadassa vuodessa. Merenkurkun saaristo kasvaa vuosi vuodelta uutta maata. Maankuori joustaa siis vielä tuhansia vuosia jään poistumisen jälkeen.

*47 sanaa · kohteet: fin/pohjanlahti*

**PT 16.10.: Merenkurkun "neliökilometri vuodessa" pois (arviot 1–7 km²); nyt yleinen muotoilu.**

Huom (kirjoittaja): Nostokortin teksti sanoo maan painuneen 'lähes kilometrin', mikä ei vastaa NASAn arviota (yli 500 m alas Itämeren alla); tätä lukua ei käytetä. Korttitekstin lukua kannattaa tarkistaa. · Eri lähteet 8-10 mm/v, siksi 'noin 8-9 mm'. 'Lähes metri sadassa vuodessa' on laskettu (9 mm x 100 = 90 cm). Nostokortin '80 cm vuosisadassa' vastaa 8 mm:ää.

### 12. Mikä joki laskee Suomenlahden pohjukkaan?

Neva. Se on vain 74 kilometriä pitkä, mutta virtaamaltaan yksi Euroopan suurimmista joista. Neva lähtee Laatokasta, virtaa Pietarin läpi ja laskee Nevanlahteen Suomenlahden itäpäähän. Keskivirtaama on noin 2 500 kuutiometriä sekunnissa. Se tuo lahteen niin paljon makeaa vettä, että Nevanlahden vesi on lähes makeaa. Pietari on rakennettu Nevan suistoon.

*49 sanaa · kohteet: fin/suomenlahti*

**PT 16.10.: "neljänneksi suurin" -> "yksi Euroopan suurimmista"; "itäosa lähes makeaa" -> vain Nevanlahti.**

Huom (kirjoittaja): en.wikipedia lukuja ei käytetä; 'lähes makeaa' on tulkinta Nevanlahden ja itäosan suolaisuudesta.

### 13. Miksi lahden ympäristöongelmat ovat pahimpia juuri täällä?

Koska Suomenlahti on matala, ja sen vesi vaihtuu hitaasti, mutta rannoilta ja Nevasta tulee paljon ravinteita. Keskisyvyys on vain noin 38 metriä. Ravinteet rehevöittävät vettä, ja pohjaan aiemmin kertyneet ravinteet pitävät rehevöitymistä yllä vielä nytkin. Siksi kesäisin lahdessa on runsaasti sinilevää. Suomenlahti on yksi Itämeren rehevöityneimmistä osista.

*47 sanaa · kohteet: fin/suomenlahti*

**PT 16.10.: "rehevöitynein" -> "yksi rehevöityneimmistä".**

Huom (kirjoittaja): Syken tiedote sanoo, että Suomenlahdella pohjaan varastoituneet ravinteet pitävät rehevyyttä yllä. · Fosforiosuutta (puolet) ei käytetä vastauksessa: yksi hakutulos ilman suoraa vahvistusta. 'Vesi vaihtuu hitaasti' on Itämeren yleisestä viipymästä, ei Suomenlahden erillisestä luvusta.

### 14. Miksi saimaannorppa elää vain täällä?

Koska se jäi eristyksiin Saimaalle jääkauden jälkeen. Maa kohosi, ja norppa jäi järveen yli 9 000 vuotta sitten. Siitä on kehittynyt omanlaisensa norppa, joka elää nykyään vain Saimaalla: yksilöitä on noin 500. Norppa synnyttää poikasensa rannoille kinostuneisiin lumikinoksiin, joten lumi ja jää ovat sen tulevaisuudelle ratkaisevia.

*46 sanaa · kohteet: fin/saimaa*

Huom (kirjoittaja): Metsähallituksen mukaan norppa erosi Laatokan norpista; Wikipedian mukaan muista norpakannoista. Vastauksessa vain 'jäi eristyksiin'. Laatokannorppa (Pusa hispida ladogensis) elää Laatokalla, joten 'vain Saimaalla' koskee nimenomaan saimaannorppaa. · Luku vaihtelee vuosittain; 'noin 500'. · Vuonna 2025 on esitetty luokittelua omaksi lajikseen (Pusa saimensis), vain Wikipedia; ei käytetty.

### 15. Mihin Saimaan vedet laskevat?

Saimaan vedet laskevat Vuoksi-jokea pitkin Laatokkaan. Laivoille on rakennettu lisäksi oma reitti, Saimaan kanava, joka on noin 43 kilometriä pitkä ja avattiin vuonna 1856. Kanava yhdistää Saimaan Suomenlahteen Viipurin lähellä, ja sitä pitkin kulkevat laivat. Vuoksi on siis järven luonnollinen laskujoki, kanava ihmisen tekemä oikotie mereen.

*46 sanaa · kohteet: fin/saimaa*

Huom (kirjoittaja): Vuoksen pituus jätetty pois (150 km tai 162 km haarasta riippuen). · Alkuperäinen kanava oli pidempi (vanhemmat lähteet noin 58 km), nykyinen pituus noin 43 km. · Lähteet tiivistelmiä hakutuloksesta.

### 16. Mikä Kuurinkynnäs on?

Kuurinkynnäs on kapea, kaareva hiekkaniemi, joka erottaa Kuurinlahden Itämerestä. Se on noin 98 kilometriä pitkä ja vain 0,4–3,8 kilometriä leveä. Niemi jakautuu Liettuan ja Venäjän kesken, ja korkeimmat dyynit nousevat noin 60 metriin. UNESCO otti sen maailmanperintöluetteloon vuonna 2000. Se on esimerkki maisemasta, jota tuuli muokkaa jatkuvasti.

*47 sanaa · kohteet: ltu/itameri*

Huom (kirjoittaja): UNESCO-aineistosta lukua ei löytynyt; toinen lähde on toissijainen. Teksti sanoo "korkeimmat noin 60 m". · Suomenkielinen nimi Kuurinlahti on käännös englannin Curonian Lagoon -nimestä.

### 17. Miksi Riianlahti on erillinen?

Riianlahti on Itämeren oma sivumeri, koska sen yhteydet avomerelle ovat ahtaat: pääyhteys on Irbensalmi, ja pohjoisessa ovat Moonsundin matalat salmet. Lahti on noin 18 000 neliökilometriä ja keskimäärin 26 metriä syvä. Väinäjoki tuo siihen runsaasti makeaa vettä, joten vesi on etelässä selvästi vähäsuolaisempaa kuin Irbensalmessa. Lahden vesi vaihtuu hitaasti.

*49 sanaa · kohteet: lva/itameri*

**PT 16.10.: YHDEN LÄHTEEN VARASSA, vahvistettava toisesta ennen äänitystä.**

Huom (kirjoittaja): Yhden lähteen luvut; kirjoitettu "noin". Harkitse poistoa jos halutaan tiukka kahden lähteen sääntö. · Prosenttia ja suolaisuusarvoja ei käytetty tekstissä.

### 18. Miksi Norjan rannikko pysyy sulana talvella?

Norjan rannikkoa lämmittää Pohjois-Atlantin virta, Golfvirran jatke, joka tuo lämmintä ja suolaista vettä pohjoiseen. Siksi Norjanmeri on jäätön ympäri vuoden, toisin kuin arktiset meret. Jopa pohjoisessa, 70. leveyspiirin tienoilla, satamat pysyvät auki koko talven. Tutkijoiden mukaan merialueen suuri vesimäärä myös varastoi lämpöä ja pehmentää talvea.

*45 sanaa · kohteet: nor/norjanmeri*

Huom (kirjoittaja): Tutkimustulos; muotoiltu varovasti ("tutkijoiden mukaan"). Golfvirran osuudesta tutkijat ovat osin eri mieltä.

### 19. Mikä Jan Mayenin harjanne on?

Jan Mayenin harjanne on vedenalainen kohouma Islannin koillispuolella, Islanninmeren alueella. Se ei ole tavallista merenpohjaa, vaan yli 400 kilometriä pitkä mantereen kuoren palanen. Se kuului ennen Grönlantiin, kunnes merenpohjan leviäminen irrotti sen kymmeniä miljoonia vuosia sitten. Siksi sitä kutsutaan mikromantereeksi, eli pieneksi irronneeksi mantereen osaksi.

*45 sanaa · kohteet: nor/norjanmeri*

**PT 16.10.: harjanne kuuluu Islanninmeren alueelle; "erottaa Norjanmeren Grönlanninmerestä" pois (korjattu).**

Huom (kirjoittaja): Kortin teksti on tämän kanssa yhtäpitävä. · Lähteet antavat 400-500 km; teksti sanoo "yli 400". · Tarkkaa ajankohtaa ei annettu, lähteet eroavat.

### 20. Kuka Willem Barentsz oli?

Willem Barentsz oli hollantilainen merenkulkija, joka etsi koillisväylää Euroopasta Aasiaan. Hän teki kolme retkeä: vuosina 1594, 1595 ja 1596–1597. Viimeisellä retkellä laiva juuttui jäähän Novaja Zemljan luona, ja miehistö talvehti saarella. Barentsz kuoli kesäkuussa 1597 avoveneillä tehdyllä paluumatkalla. Hänen mukaansa on nimetty Barentsinmeri, ja hänen retkiään muistetaan pohjoisten merireittien etsinnästä.

*50 sanaa · kohteet: nor/barentsinmeri, rus/barentsinmeri*

Huom (kirjoittaja): Vuoden 1911 Britannica antaa 30.6.; teksti sanoo vain "kesäkuussa 1597".

### 21. Miksi merta kutsuttiin ennen Murmanskinmereksi?

Venäläiset kutsuivat Kolan niemimaan pohjoisrannikkoa Murmaniksi, ja meri nimettiin sen mukaan. Nimi Murmanskinmeri esiintyy jo 1500-luvun kartoissa, esimerkiksi Mercatorin Arktiksen kartassa vuodelta 1595. Nykyisen nimen meri sai myöhemmin hollantilaisen Barentszin kunniaksi. Sanan Murman alkuperä on kiistanalainen: se voi tulla saamesta tai norjalaisista, eivätkä lähteet ole yksimielisiä.

*46 sanaa · kohteet: nor/barentsinmeri*

Huom (kirjoittaja): Mercator-yksityiskohta toisessa lähteessä vain kauppiaan sivulla. · Päätelmä "nimetty rannikon mukaan" on johdettu; yksi venäläinen artikkeli (hakutulos) väittää nimen tulevan kaupungista, mikä on anakronismi (kaupunki 1900-luvulla). Varovaisempi muotoilu mahdollinen. · Lähteet ovat ristiriidassa, siksi teksti kertoo vain että alkuperä on kiistanalainen. · Vuosilukua (1853) ei käytetty, koska se jäi vahvistamatta.

### 22. Miksi Itämerellä ei ole vuorovettä?

Itämerellä on vuorovettä vain muutaman sentin verran, joten sillä ei ole käytännössä merkitystä. Meri yhtyy valtamereen vain kapeiden ja matalien Tanskan salmien kautta, jotka vaimentavat vuorovesiaallon. Vedenkorkeutta muuttavat paljon enemmän tuuli ja ilmanpaine: yhden hehtopascalin muutos vastaa noin senttiä, ja tavalliset vaihtelut voivat olla kymmeniä senttejä.

*46 sanaa · kohteet: pol/itameri*

Huom (kirjoittaja): Cm-lukuja ei käytetty. · Toinen lähde yleisluonteinen; 1 hPa = 1 cm löytyi vain Ilmatieteen laitoksen tiivistelmästä.

### 23. Miksi Murmansk ei jäädy talvella?

Murmanskin satama pysyy sulana, koska lämmin Pohjois-Atlantin virta tuo Barentsinmeren lounaisosaan lämmintä vettä. Murmansk on Venäjän pohjoisen tärkein ympärivuoden sula satama, ja siksi se kasvoi tärkeäksi pohjoiseksi satamakaupungiksi. Kaupunki itse ei pysy lämpimänä: talvella ilma on kylmää ja lunta on paljon, vain satamavesi pysyy auki.

*45 sanaa · kohteet: rus/barentsinmeri*

**PT 16.10. VIRHE korjattu: ei "Euroopan Venäjän ainoa jäätön satama" (Novorossijsk, Kaliningrad) -> "Venäjän pohjoisen tärkein ympärivuoden sula satama".**

Huom (kirjoittaja): WorldAtlas (hakutulos) sanoo "suurimman osan vuodesta" - teksti sanoo "pysyy sulana". · Muotoilu "ainoa" peräisin yhdestä toimituksellisesta lähteestä; hakutulos. · Ei erikseen lähteistetty luku; yleinen toteamus, ei lukuja.

### 24. Kuinka paksua Jäämeren jää on?

Jäämeren jää on yleensä parin–kolmen metrin paksuista. NASAn mukaan yhden talven aikana kasvanut jää yltää tavallisesti noin kahteen metriin, ja useamman kesän yli säilynyt vanha jää on keskimäärin noin kolme metriä. Paksuus vaihtelee siis alueen ja vuodenajan mukaan. Talvella jää kasvaa ja kesällä sulaa, joten peittoala vaihtelee vuoden mittaan.

*49 sanaa · kohteet: rus/jaameri*

**PT 16.10.: "huhtikuu 2018, 2,1 m" pois (lähde epäselvä).**

Huom (kirjoittaja): NASA-luvut ovat vuodelta 2009 (ICESat). NOAA-aineisto antaa monivuotiselle 2-4 m. · Vain talvimittaukset; kesällä ei mitata. Luvut vaihtelevat vuosittain.

### 25. Miksi jotkut kutsuvat sitä Atlantin suistoksi?

Joidenkin tutkijoiden mielestä Jäämeri on kuin Atlantin suisto, koska sen tärkein vesilähde on Atlantti. Fram-salmen kautta Atlantin vettä virtaa Jäämereen noin kymmenen kertaa enemmän kuin Tyyneltä mereltä Beringinsalmen kautta. Vesi muuttuu matkalla jäähtymisen ja jään jäätymisen sekä sulamisen vaikutuksesta. Nimitys on tutkijoiden vertaus eikä virallinen nimi.

*46 sanaa · kohteet: rus/jaameri*

Huom (kirjoittaja): Täsmälleen sanaa "estuary of the Atlantic" ei löytynyt toisesta lähteestä, vain vastaava "double estuary" -käsite. · Jokivesi (Ob, Jenisei, Lena) jätetty pois vastauksesta, koska sille ei löytynyt kahta lähdettä.

### 26. Miksi Gotlanti oli kauppareittien risteys?

Gotlanti on keskellä Itämerta, joten kauppareitit kulkivat luontevasti sen kautta idästä länteen. Viikinkiaikaan saarelle kertyi hopeaa: vuonna 1999 löytynyt Spillingsin aarre sisälsi yli 14 000 hopeakolikkoa. Keskiajalla saaren Visby oli Hansan tärkeimpiä kauppakaupunkeja Itämerellä. Sen keskiaikainen kaupunginmuuri on säilynyt, ja UNESCO otti kaupungin maailmanperintöön vuonna 1995, koska se on niin hyvin säilynyt.

*52 sanaa · kohteet: swe/itameri*

Huom (kirjoittaja): Yli 700 hopea-aarretta (Archaeology) jätetty pois: yksi lähde.

### 27. Miksi Pohjanlahden rannat nousevat?

Rannat nousevat, koska maa kohoaa vapauduttuaan jääkauden mannerjään painosta. Jää oli paksuimmillaan jopa noin kolme kilometriä, ja sen paino painoi maankuorta alas. Kohoaminen jatkuu yhä: Merenkurkussa noin 9 millimetriä vuodessa, ja Ruotsin Korkealla rannikolla maa on noussut jääkauden jälkeen noin 286 metriä. Tuhansien vuosien päästä pohjoinen Pohjanlahti voi erota omaksi järvekseen.

*51 sanaa · kohteet: swe/pohjanlahti*

Huom (kirjoittaja): Kortin "80 cm vuosisadassa" on yhtäpitävä (Wikipedia). · Lähteiden luvut vaihtelevat 285-300 m; käytetty NASAn lukua. · Maksimiarvio; teksti sanoo "jopa". · Teksti sanoo vain "tuhansien vuosien päästä".

### 28. Miksi järvessä elää merieläimiä?

Vänernissä elää pikemminkin meren jäänteitä kuin varsinaisia merieläimiä. Jääkauden jälkeen alue oli yhteydessä Itämeren edeltäjään, ja kun maa kohosi, Vänern katkesi merestä. Järveen jäi sieltä tulleita lajeja, esimerkiksi kuusi perinteisesti luetteloitua jääkauden jäänneravun lajia. Vänern ja Vättern ovat ainoat ruotsalaisjärvet, joista kaikki kuusi on löydetty.

*45 sanaa · kohteet: swe/vanern*

Huom (kirjoittaja): Mysis relicta on myöhemmin jaettu kahdeksi lajiksi, jolloin lajeja on seitsemän; teksti sanoo "perinteisesti luetteloitua kuusi".

### 29. Mihin Vänernin vedet laskevat?

Vänernin vedet laskevat länteen Göta älv -jokea pitkin Kattegatin merelle Göteborgin kohdalla. Järvi on 44 metrin korkeudella merenpinnasta, joten vesi putoaa sen verran matkallaan alas. Joessa on Trollhättanin kohdalla pato, kanavasulkuja ja vesivoimala, ja sulut tekevät siitä laivakulkuväylän. Vänern on siis sisämaan järvi, jolla on suora yhteys mereen.

*48 sanaa · kohteet: swe/vanern*

Huom (kirjoittaja): Joen pituutta (93 km) ei käytetty: vain Wikipedia.

### 30. Miksi Pohjanmeri on niin matala?

Pohjanmeri on matala, koska se lepää Euroopan mannerjalustalla eikä syvän valtamerialtaan päällä. Keskisyvyys on noin 90 metriä, vaikka Norjan edustalla on yli 300 metriä syviä kuiluja. Jääkaudella merenpinta oli yli sata metriä nykyistä alempana, ja eteläosa oli kuivaa maata, Doggerlandia. Dogger Bankin hiekkasärkkä on yhä vain 15–30 metriä veden alla.

*50 sanaa · kohteet: gbr/pohjanmeri, nld/pohjanmeri*

Huom (kirjoittaja): Mannerjalusta-termi vain Wikipediassa; nostokortti sanoo saman. · Lähteet eroavat (90-95 m), siksi "noin 90 metriä" (karkea). · Lähteet eroavat (120-137 m), käytetty "yli sata metriä".

### 31. Milloin Pohjanmereltä löydettiin öljy?

Pohjanmeren ensimmäinen kaupallinen öljylöytö tehtiin vuonna 1969 Norjan puolella, kun yhdysvaltalainen Phillips Petroleum löysi Ekofiskin kentän. Tuotanto alkoi vuonna 1971, ja öljy lastattiin aluksi suoraan tankkereihin merenpohjan kaivoista. Löytö vahvistui joulukuussa 1969. Pohjanmeri on sen jälkeen ollut yksi Euroopan tärkeimmistä öljyn tuotantoalueista, ja Norja ja Britannia ovat pumpanneet sieltä öljyä vuosikymmenten ajan.

*52 sanaa · kohteet: gbr/pohjanmeri*

**PT 16.10.: "yli 200 koeporauksen jälkeen" pois (Ekofisk noin 32. kaivo); löytö joulukuussa 1969 (korjattu).**

Huom (kirjoittaja): Joulukuussa 1969 löytö vahvistettiin/ilmoitettiin viranomaisille; vastauksessa vain lokakuu. · Vain yksi lähde; muotoilu pidetty tiiviinä. · Jätetty vastauksesta pois, koska vain yksi lähde. Vastaus rajattu öljyyn.

### 32. Mikä Mansaari on?

Mansaari on saari keskellä Irlanninmerta, meren toiseksi suurin Anglesey-saaren jälkeen. Se ei kuulu Yhdistyneeseen kuningaskuntaan eikä Euroopan unioniin, vaan on itsehallinnollinen Britannian kruunun alainen alue, jolla on oma parlamentti Tynwald. Kuningas on saaren herra, Lord of Mann. Mansaari kertoo, että Britannian saarilla on useita erilaisia valtiollisia asemia.

*47 sanaa · kohteet: gbr/irlanninmeri*

Huom (kirjoittaja): Järjestys vain Wikipediassa. · Pinta-alaa (noin 572 km2), asukaslukua ja Tynwaldin 979-vuotta ei käytetty: yksi lähde / epävarma.

### 33. Miksi merta kutsutaan joskus Manxinmereksi?

Manxinmeri on harvinainen sivunimi Irlanninmerelle, eikä se ole vakiintunut. Nimi tulee Mansaaresta: manx tarkoittaa mansaarelaista, ja saaren oma nimi on Mannin. Mansaari on meren keskellä, joten sen mukaan on joskus nimetty koko meri. Nimeä kuulee harvoin, ja lähteistä vain yksi mainitsee sen; tavallinen ja virallinen nimi on Irlanninmeri.

*48 sanaa · kohteet: gbr/irlanninmeri*

**PT 16.10.: HEIKKO TUKI ("Manxinmeri" mainitaan vain yhdessä lähteessä). SUOSITUS: poista kysymys ja vastaus; korvaa uudella kysymyksellä (Irlanninmeri-noston toinen kysymys).**

Huom (kirjoittaja): HEIKOSTI TUETTU: nimen käytölle vain yksi lähde. Syy "nimetty saaren mukaan" on johdettu, ei suoraan lähteessä.

### 34. Miten meri on muovannut kallioon valtavan kaaren?

Aallot ovat kuluttaneet Durdle Doorin kaaren rannan suuntaisesta kalliovyöhykkeestä. Durdle Door on Dorsetin Jurassic Coastilla Englannin etelärannikolla. Kova Portlandin kalkkikivi kesti, mutta sen takana oleva pehmeämpi kivi murtui ja huuhtoutui pois, ja aallot puhkaisivat kaaren. Rannikko rapautuu yhä, joten aallot jatkavat työtään ja kaari muuttuu hitaasti edelleen.

*47 sanaa · kohteet: gbr/jurassic-coast-durdle-door*

**PT 16.10. VIRHE korjattu: aallot kuluttivat pehmeämmän kiven Portlandin kalkkikivivyön takaa ja puhkaisivat kaaren (ei "merenkäynti poisti kalkkikiven lähes kaikkialta").**

Huom (kirjoittaja): Kaaren ikää, mittoja ja omistajaa ei käytetty: lähteet ristiriitaisia (140 / 170 milj. vuotta kivi).

### 35. Kuinka pitkän ajan geologinen historia näkyy Jurassic Coastilla?

Jurassic Coastin kallioissa näkyy noin 185 miljoonan vuoden historia. Kerrostumat kuuluvat kolmeen kauteen: triaskauteen, juuraan ja liitukauteen, jotka yhdessä muodostavat Maan keskiaikakauden. Rantajakso on noin 154 kilometriä pitkä Exmouthista Studland Bayhin, ja UNESCO kirjasi sen maailmanperintökohteeksi vuonna 2001. Rannalla kävellessä voi siis kulkea ajassa taaksepäin.

*45 sanaa · kohteet: gbr/jurassic-coast-durdle-door*

Huom (kirjoittaja): "Maan keskiaikakausi" = mesozoinen aikakausi; sana selitetty näin.

### 36. Mikä Yrjönkanaali on?

Yrjönkanaali on merikaista Irlannin kaakkoisosan ja Walesin lounaiskärjen välissä. Se yhdistää pohjoisessa olevan Irlanninmeren etelässä olevaan Kelttienmereen. Kapeimmillaan, Carnsore Pointin ja St Davidin niemen välillä, kaista on noin 76 kilometriä leveä. Meriraja kulkee juuri tuota linjaa pitkin. Kanaali on siis ovi, jonka kautta Irlanninmereltä päästään avoimelle Atlantille.

*47 sanaa · kohteet: irl/irlanninmeri*

**PT 16.10.: YHDEN LÄHTEEN VARASSA, vahvistettava.**

Huom (kirjoittaja): Lähteet ovat ristiriidassa siitä, onko 76 km kapein vai leveä kohta; Dictionary.com antaa jopa 145 km. Vastauksessa "kapeimmillaan" on siis epävarma; pituutta (noin 160 km, vain Britannica) ei käytetty. · Heikosti tuettu (yksi lähde); lause "meriraja kulkee juuri tuota linjaa pitkin" perustuu Wikipediaan.

### 37. Miksi Mansaari on oma alueensa?

Mansaari on oma alueensa, koska se on Britannian kruunun alainen itsehallintoalue eikä osa Yhdistynyttä kuningaskuntaa. Saarella on oma parlamentti Tynwald, oma hallitus, omat tuomioistuimet ja omat lait. Britannia vastaa puolustuksesta ja ulkosuhteista. Saari ei ole koskaan kuulunut EU:hun. Asetelma on kasvanut historiassa, eikä sitä ole luotu yhdellä päätöksellä.

*48 sanaa · kohteet: irl/irlanninmeri*

Huom (kirjoittaja): Viimeinen lause ("kasvanut historiassa") on yleistys; Britannican kruunuhallinta 1828 ja Tynwaldin 979 jätetty pois (yksi lähde).

### 38. Kuuluuko Grönlanninmeri Jäämereen vai Atlanttiin?

Siihen ei ole yhtä oikeaa vastausta. Britannica pitää Grönlanninmerta Jäämeren reunaosana, mutta osa lähteistä lukee sen Atlantin osaksi. Merentutkimuksessa se kuuluu Norjanmeren kanssa pohjoisiin meriin. Kansainvälinen merikarttajärjestö IHO on piirtänyt merelle rajat, mutta Jäämeren ja sen sivumerten rajat ovat yleisesti epätarkkoja. Rajat ovat sopimuksia, eivät luonnon viivoja.

*47 sanaa · kohteet: isl/gronlanninmeri*

Huom (kirjoittaja): Kysymys on määritelmäkysymys; vastaus kertoo tämän. · IHO:n tarkkaa määritelmää ei saatu primäärilähteestä; vain Wikipedia kertoo IHO:n rajaavan meren. Pinta-alaa (1,2 milj. km2) ei käytetty (yksi lähde).

### 39. Mikä Framinsalmi on?

Framinsalmi on meriväylä Grönlannin ja Huippuvuorten välillä, kaikkiaan noin 450 kilometriä leveä. Se on Jäämeren ainoa syvä yhteys muihin meriin, ja kynnys on yli 2 500 metriä syvä. Lämmin Atlantin vesi virtaa sitä pitkin pohjoiseen, ja noin 90 prosenttia Jäämeren viemästä merijäästä ajautuu etelään. Nimi tulee Nansenin Fram-laivasta.

*48 sanaa · kohteet: isl/gronlanninmeri*

Huom (kirjoittaja): Luvut eroavat, siksi "yli 2 500 metriä". · Nimi ei ole virallinen; nimen alkuperä venäläisessä tieteellisessä kirjallisuudessa.

### 40. Mistä järvi on saanut nimensä?

Mývatn tarkoittaa islanniksi sääskijärveä: mý on surviaissääski ja vatn järvi. Kesällä järven ympäristö on täynnä näitä pieniä hyönteisiä, joista valtaosa ei pure. Sääskien toukat elävät järven pohjassa, ja ravinteikas lähdevesi pitää ne runsaana. Nimi on siis rehellinen kuvaus, ja sääsket ovat koko järven eliöyhteisön perusta.

*45 sanaa · kohteet: isl/myvatn*

Huom (kirjoittaja): Huom: alueella on myös puraisevia mäkäriä; vastaus sanoo vain "valtaosa ei pure". Heikosti tuettu.

### 41. Miksi sorsia on juuri täällä niin paljon?

Sorsia on Mývatnilla paljon, koska ravinteikas lähdevesi tuottaa järveen valtavasti sääskentoukkia ja vesikirppuja, joita sorsat syövät. Alueella pesii noin 13–15 sorsalajia, lähteestä riippuen. Vain täällä Euroopassa pesii myös amerikkalainen Barrow'n telkkälaji, jota on noin 2 000 yksilöä ja joka pesii laavan onkaloissa. Runsas ravinto selittää runsaat linnut.

*47 sanaa · kohteet: isl/myvatn*

Huom (kirjoittaja): Lähteet eroavat (13/14/15) -> vaihteluväli; "enemmän kuin missään muualla Euroopassa" jätetty pois (vain Wikipedia). · Populaatioarvio vaihtelee ("noin 2 000" / "muutama tuhat").

### 42. Miten hollantilaiset ovat vallanneet maata mereltä?

Hollantilaiset ovat rakentaneet vesialueen ympärille penkereet ja pumpanneet veden pois, jolloin syntyy polderi. Suurin hanke oli Zuiderzeen työt: 32 kilometrin Afsluitdijk-pato sulki lahden vuonna 1932. Sen jälkeen kuivatetut polderit, viimeisenä Etelä-Flevoland 1968, lisäsivät maata noin 1 600 neliökilometriä. Hanke osoittaa, että maata voi tehdä ihmistyöllä.

*45 sanaa · kohteet: nld/pohjanmeri*

Huom (kirjoittaja): Molemmat Wikipediassa; yleisesti tunnettu tieto. · Suljettu 1932; juhlallisesti avattu 1933. · Pienet erot (1 620 / 1 650) -> "noin 1 600".

### 43. Kuinka kapea Gibraltarinsalmi todella on?

Kapeimmillaan salmi on vain noin 14 kilometriä leveä, vaikka se erottaa kaksi maanosaa, Euroopan ja Afrikan. Se on Välimeren ainoa yhteys Atlanttiin. Vesi kulkee salmessa kahdessa kerroksessa: Atlantin vettä virtaa pinnalla sisään ja raskaampaa, suolaisempaa Välimeren vettä syvemmällä ulos. Ahdas portti säätelee siis koko meren veden vaihtoa.

*47 sanaa · kohteet: esp/valimeri, fra/valimeri, syr/valimeri, tur/valimeri*

Huom (kirjoittaja): Britannican (hakutulos) mukaan 13 km, joten sanottu 'noin 14'. Britannican sivu antoi 403. · Vaite on kysymyksen kannalta luonnollinen yhteys; Suezin ja Bosporin kautta on yhteys muihin meriin, ei Atlanttiin.

### 44. Mitä Espanjan Välimeren rannikolla kalastetaan?

Yleisiä saaliita ovat pienet parvikalat, anjovis ja sardiini, joita pyydetään Välimerellä eniten. Pohjatroolarit hakevat syvältä kummeliturskaa ja punakatkarapua, ja Dénian punakatkarapu on kuuluisa herkku. Välimeren alueella punakatkaravun pyyntiä rajoitetaan saaliskiintiöillä. Pyyntiä ohjataan siis kiintiöillä ja pyyntikielloilla, jotta kalakannat säilyvät. Kalat ja äyriäiset kuuluvat rannikon ruokakulttuuriin.

*45 sanaa · kohteet: esp/valimeri*

**PT 16.10. VIRHE korjattu: punakatkaravun 45,9 t / 286 troolaria on koko Välimeren GFCM-luku, ei Espanjan; pois, nyt "Välimeren alueella".**

Huom (kirjoittaja): GFCM-luku koskee koko Välimerta, ei erikseen Espanjaa; Espanjan lajikohtaista saalisjakaumaa ei löytynyt. Muotoilu 'koko Välimeren alueella'. HEIKOSTI TUETTU Espanja-osuus. · Pyyntisyvyys jätetty pois: lähteet 600 m ja 900 m. · Kaksi riippumatonta lähdettä ei löytynyt; tietoa pidettävä yhden uutislähteen varassa. Ei viranomaisen omaa sivua.

### 45. Miksi Välimeri on niin suolainen?

Koska siellä haihtuu enemmän vettä kuin sateet ja joet tuovat. Haihtuessaan vesi jättää suolan jälkeensä. Välimeren vedessä on noin 3,8 prosenttia suolaa, kun valtamerissä se on yleensä 3,4–3,6 prosenttia. Gibraltarinsalmi on niin kapea, ettei vähäsuolaisempaa Atlantin vettä pääse sisään tarpeeksi laimentamaan merta. Kuuma ja ahdas meri väkevöityy siis hitaasti.

*49 sanaa · kohteet: fra/valimeri*

Huom (kirjoittaja): Luku vaihtelee alueittain; sanottu 'noin 3,8 prosenttia' (38 PSU on noin 38 g suolaa kilossa vettä) ammattikielen välttämiseksi. · Toinen lähde ei ole tutkimuslaitos; Wikipedia antaa Biskajanlahdelle 35 g/l, mikä on samaa suuruusluokkaa. · Vastauksessa ei lukuja.

### 46. Miksi Biskajanlahti on niin pahamaineinen merenkulkijoille?

Atlantin matalapaineet iskevät lahteen lännestä, etenkin talvella, ja myrskyt kuuluvat Atlantin kovimpiin. Lahti on keskimäärin noin 1 700 metriä syvä, mutta mannerjalusta ulottuu osin matalaksi, ja se tekee aalloista jyrkkiä. Purjelaivat eivät päässeet tuulta vastaan ja ajautuivat rantaan. Maine syntyi siis säästä, merenpohjasta ja rantojen läheisyydestä.

*46 sanaa · kohteet: fra/biskajanlahti*

Huom (kirjoittaja): Suurin syvyys jätetty pois: 4 735 m vs 2 790 m. · 'Aallot jyrkkiä' perustuu purjehduslähteeseen; ei viranomaislähdettä. · Merkittävin tukihuomio on purjehduslehdistä; HEIKOMMIN TUETTU osuus. Tuulta vastaan -kohta jätettävissä pois, jos halutaan vain yhden lähteen väitteet.

### 47. Mitä eläimiä lahdella tapaa?

Lahdella on paljon valaita ja delfiinejä. Alueella on havaittu 28 valaslajia, joista yhdeksän on tavallisia, kuten delfiinit, pyöriäinen, kaskelotti ja sillivalas. Kesäisin syvillä vesillä kerääntyy arviolta yli 10 000 sillivalasta. Suuret valaat näkyvät parhaiten mannerjalustan reunan takana, syvien kanjonien kohdalla. Lahti on siis merinisäkkäille rikas ruokapaikka.

*46 sanaa · kohteet: fra/biskajanlahti*

Huom (kirjoittaja): Lukua tukee vain ICES, mutta se on viranomaistaso. Wikipedia ei anna lajimääriä. · Kaksi riippumatonta lähdettä ei löytynyt; 'arviolta' säilytetty. Ei Wikipedia-vahvistusta.

### 48. Miksi juuri portugalilaiset lähtivät Atlantille ensimmäisinä?

Portugalin koko rannikko on Atlanttia, joten sen merimiehet katsoivat luontevasti länteen ja etelään. Ceutan valtaus vuonna 1415 herätti kiinnostuksen Afrikkaan, ja prinssi Henrik rahoitti retkiä, joilla etsittiin muun muassa kultaa. Karavelli purjehti vastatuuleen, ja Gil Eanes ohitti pelätyn Bojadorin niemen 1434. Etumatka syntyi siis sijainnista, laivoista ja sinnikkyydestä.

*48 sanaa · kohteet: prt/atlantti*

Huom (kirjoittaja): Perinteinen Sagresin merikoulu on Wikipedian mukaan myytti, joten sitä ei mainita; 'Navigator'-lisänimi 1800-luvun. · Käytännössä 'lähelle tuulta'; sanamuoto 'vastatuuleen' yleistys. · Ei erikseen tarkistettu lähteestä; Portugalilla ei ole Välimeren rantaa.

### 49. Kuinka syvä Atlantti on?

Keskimäärin noin 3 300–3 650 metriä, riippuen siitä lasketaanko sivumerten pohjat mukaan. Syvin kohta on Puerto Ricon hauta Karibian pohjoispuolella, noin 8 400 metriä merenpinnan alla. Luvut vaihtelevat lähteittäin, koska rajat ja mittaustavat vaihtelevat. Atlantti on siis keskimäärin useiden kilometrien syvyinen, ja syvimmät kohdat ovat harvinaisia kapeita hautoja.

*48 sanaa · kohteet: prt/atlantti*

Huom (kirjoittaja): Lähteet ovat ristiriidassa keskenään, siksi haarukka. · Joissain sivuissa 8 605 m ja 8 742 m (heikkolaatuisia); pyöristetty 'noin 8 400'. · Loppulause on tulkinta, ei lähteen väite; voi poistaa.

### 50. Miksi maan rannikko on niin lyhyt?

Rannikko on vain noin 20 kilometriä, koska Dubrovnikin tasavalta luovutti Neumin kohdalla kapean kaistaleen Osmanien valtakunnalle vuoden 1699 rauhan jälkeen. Tavoitteena oli, ettei sen raja koskettaisi Venetsian aluetta. Kaistale jäi Bosnian osaksi, ja Neum on maan ainoa merikaupunki. Pieni rannikko on siis seurausta 1600-luvun suurvaltapolitiikasta.

*45 sanaa · kohteet: bih/adrianmeri*

Huom (kirjoittaja): Kolmas lähde on blogityyppinen; luotettavin lähde on Wikipedian viitteet. 'Tavoitteena oli' -muotoilu vastaa kaikkia lähteitä. Rauha ei sanatarkasti nimetty vastauksessa, koska Karlowitzin vuosi 1699 riittää.

### 51. Mikä Otranton salmi on?

Otranton salmi on kapea vesiväylä Italian ja Albanian välissä, ja se on nimetty Italian puolella sijaitsevan Otranton kaupungin mukaan. Salmi yhdistää Adrianmeren Joonianmereen ja siten muuhun Välimereen. Kapeimmillaan se on noin 72 kilometriä leveä. Ensimmäisessä maailmansodassa liittoutuneet yrittivät sulkea salmen laivoilla ja ajoveneillä, ettei Itävalta-Unkarin laivasto pääsisi Välimerelle.

*48 sanaa · kohteet: bih/adrianmeri, ita/adrianmeri*

**PT 16.10.: YHDEN LÄHTEEN VARASSA, vahvistettava.**

Huom (kirjoittaja): Pieni vaihtelu; 'noin 72' säilytetty. Syvyysluvut jätetty pois (18 m vs 325 m). · Sulku ei pysäyttänyt sukellusveneitä; jätetty pois mahtuakseen sanarajaan. Aloitusvuodesta lähteet ristiriidassa (1915 vs 1917), joten vuotta ei mainita. · Tiivistelmätason tuki; HEIKOSTI TUETTU, voi poistaa.

### 52. Miksi Venetsia rakennettiin juuri tänne?

Koska laguunin saaret olivat turvallinen pakopaikka. Perimätiedon mukaan kaupunki perustettiin 25. maaliskuuta 421, ja monet asukkaat pakenivat mantereelta hunnien ja germaanien hyökkäyksiä, vaikka saarilla asui kalastajia jo ennenkin. Lisää väkeä tuli, kun langobardit hyökkäsivät Pohjois-Italiaan vuonna 568. Soinen laguuni oli vaikea saavuttaa maitse. Pakopaikasta kasvoi vähitellen merikauppaa käyvä kaupunki.

*49 sanaa · kohteet: ita/adrianmeri*

Huom (kirjoittaja): Päivämäärä on legenda; vastauksessa 'perimätiedon mukaan'. · Lähteiden mukaan laguunissa asui kalastajia jo ennen pakolaisia (hakutulos), joten vastauksessa sanotaan 'monet asukkaat' ja mainitaan kalastajat. · Wikipedia ei sano suoraan, että laguuni valittiin puolustuksen vuoksi. Paaluperustuksia ei mainita, koska kumpikaan luettu lähde ei kata niitä.

### 53. Keitä tyrrhenialaiset olivat?

Tyrrhenialaiset oli kreikkalaisten antama nimi etruskeille, Italian keskiosan muinaiselle kansalle, joka kukoisti noin 700-luvulta 300-luvulle eaa. Roomalaiset muodostivat nimestä merelle nimen Mare Tyrrhenum, ja meri kantaa sitä yhä. Rooma valtasi etruskien kaupungit vähitellen, ja heidän alueensa joutui lopulta kokonaan Rooman vallan alle. Nimi on siis kadonneen kansan muisto.

*48 sanaa · kohteet: ita/tyrrhenanmeri*

**PT 16.10.: ajoitus 700-luvulta 300-luvulle eaa.; "27 eaa." pois (korjattu).**

Huom (kirjoittaja): Britannican verkkosivu antoi 403. · Wikipedia laskee varhaisemman alun; käytetty World Historyn haarukkaa 'kukoisti'. · Vuosi 27 eaa. vain Wikipediassa; muut lähteet vahvistavat vähittäisen valloituksen. Etruskien oma nimi merelle jätetty pois (vain yksi lähde).

### 54. Miksi meren pohjassa on tulivuoria?

Koska Afrikan laatan reuna painuu Euraasian laatan alle, ja meren pohja venyy ja repeilee, jolloin sula kivi nousee ylös. Marsilin tulivuori on noin 70 kilometriä pitkä ja noin 3 000 metriä korkea, mutta sen huippu on yhä noin 500 metrin syvyydessä. Pinnan yläpuolelle kohoavat Aiolian saaret ja Stromboli. Tyrrhenanmeri on siis laattojen törmäysvyöhykettä.

*53 sanaa · kohteet: ita/tyrrhenanmeri*

**PT 16.10.: YHDEN LÄHTEEN VARASSA, vahvistettava.**

Huom (kirjoittaja): Ylempänä oleva laatta kiistanalainen lähteissä (Euraasian vs Apulian); sanottu 'Euraasian alle' Wikipedian mukaan. Springer ja CNR mainitsevat vain Ionian laatan. HEIKOSTI TUETTU tässä yksityiskohdassa. · Lähteet vaihtelevat 450-508 m; sanottu 'noin 500'. · Saarten lukumäärä (7/8) jätetty pois.

### 55. Keitä liguurit olivat?

Liguurit olivat muinainen kansa, joka asui Luoteis-Italian rannikolla ja vuoristossa sekä Kaakkois-Ranskan rannikolla. Heidän kielensä tunnetaan lähinnä paikan- ja henkilönnimistä, joten siitä tiedetään vähän. Rooma sotii heitä vastaan 200-luvulta eaa. 100-luvulle eaa. ja valloitti heidät vähitellen, mikä kesti yli sata vuotta. Nimi elää yhä Liguriassa ja Ligurianmeressä.

*47 sanaa · kohteet: ita/ligurianmeri*

Huom (kirjoittaja): Tarkka vuosi (180 eaa. apuaanien karkotus, 40 000 / 47 000) jätetty pois, koska luvut ovat ristiriitaiset.

### 56. Mikä Välimeren valassuojelualue on?

Se on Pelagos-suojelualue, jonka Ranska, Italia ja Monaco perustivat sopimuksella: se allekirjoitettiin vuonna 1999 ja tuli voimaan vuonna 2002. Alue on yli 80 000 neliökilometrin kokoinen ja ulottuu myös avomerelle kansallisten aluevesien ulkopuolelle. Valaat ja delfiinit kerääntyvät sinne kesäisin ruokailemaan. Alue osoittaa, että merinisäkkäitä voi suojella yhteistyöllä yli rajojen.

*49 sanaa · kohteet: ita/ligurianmeri*

Huom (kirjoittaja): Voimaantulo 2002; vastauksessa 'sopimuksella 1999' tarkoittaa allekirjoitusta. · Lähteet ristiriidassa; sanottu 'yli 80 000'. · Wikipedian sillivalasväite on 'believed'; vastauksessa yleinen muotoilu. Sanamäärälukuja (1 000 valasta, 40 000 delfiiniä) ei käytetty, vain yksi lähde.

### 57. Mikä oli Kharybdis?

Kharybdis oli Homeroksen Odysseiassa esiintyvä merihirviö, joka oli oikeastaan valtava vesipyörre. Antiikin kirjoittajat sijoittivat sen Messinansalmeen Sisilian rannikolle, vastapäätä Skyllan kalliota. Kertomusten mukaan se nieli vettä ja sylki sen ulos kolme kertaa päivässä. Salmessa on oikeasti pyörre, jossa virtaukset kohtaavat, mutta se on vaarallinen vain pienille veneille.

*47 sanaa · kohteet: ita/messinansalmi*

Huom (kirjoittaja): Homeros ei itse nimeä salmea; klassisella ajalla sijoitus vakiintui Messinansalmeen. · Ilmaistu "kertomusten mukaan", ei yksiselitteisesti Homeroksen tekstinä. · Toinen lähde vain hakutuloksen tiivistelmä.

### 58. Miksi salmen yli ei vieläkään kulje siltaa?

Koska hanke on yhä jumissa lupa- ja rahoituskiistoissa. Hallitus hyväksyi sillan elokuussa 2025, mutta Italian tilintarkastustuomioistuin kieltäytyi lokakuussa vahvistamasta päätöstä. Hankkeen kustannukset ovat kolminkertaistuneet, ja EU:n hankintasääntöjen mukaan yli 50 prosentin nousu vaatisi uuden kilpailutuksen. Siltaa on suunniteltu, hylätty ja herätetty henkiin jo vuosikymmeniä. Silta yhdistäisi Italian saappaan kärjen Sisiliaan.

*50 sanaa · kohteet: ita/messinansalmi*

**PT 16.10.: kustannusluvut 3,8 -> 10,5 mrd heikko tuki -> "kolminkertaistuneet" (korjattu).**

Huom (kirjoittaja): Luku kolmannen osapuolen raportoimana Il Postista; toinen lähde ei vahvista juuri tätä lukua. Pidetään, koska suunta (iso nousu) vahvistuu molemmista; vaihtoehtoisesti voi korvata "kustannukset ovat kolminkertaistuneet". · Aikajana vain Wikipediasta; muotoilu yleinen.

### 59. Mistä limoncellon sitruunat tulevat?

Pääosin Etelä-Italiasta, erityisesti Campanian Sorrenton ja Amalfin rannikoilta. Perinteisessä limoncellossa käytetään Sorrenton sitruunaa tai Amalfin rannikon sfusato amalfitano -sitruunaa, ja molemmilla on suojattu maantieteellinen merkintä, IGP. Likööriin otetaan vain sitruunan keltainen kuori, ei kitkerää valkoista osaa. Amalfin sitruunat ovat pitkänomaisia ja suippopäisiä, mistä nimi sfusato, ja ne poimitaan jyrkillä rinteillä käsin.

*51 sanaa · kohteet: ita/amalfin-rannikko*

**PT 16.10.: YHDEN LÄHTEEN VARASSA, vahvistettava (Kotorin kapein 340 m).**

Huom (kirjoittaja): Vastaus rajaa kysymyksen Campaniaan, koska nostokortti koskee Amalfia. · Wikipedian Limoncello- ja Sorrento lemon -sivut eivät (luetulta osalta) mainitse IGP:tä; jäi kahden toissijaisen lähteen varaan. Heikoin kohta. · Vain yksi lähde; ei kriittinen luku, mutta kirjataan.

### 60. Kuka ryösti Amalfin vuonna 1137?

Pisalaiset. Aiemmin Amalfi oli ollut itsenäinen ja vaikutusvaltainen merivalta, tasavalta. Pisa oli sen kauppakilpailija, ja se ryösti kaupungin sekä vuonna 1135 että 1137. Sitä ennen Sisilian normannit olivat jo alistaneet Amalfin vuonna 1131. Näiden iskujen jälkeen Amalfin loiston aika oli ohi, ja kaupunki menetti asemansa Välimeren merkittävänä kauppakaupunkina.

*48 sanaa · kohteet: ita/amalfin-rannikko*

Huom (kirjoittaja): Wikipedia ei nimeä Rogeria; sanamuoto "Sisilian normannit".

### 61. Millä rannikolla Tropea sijaitsee?

Tropea on Calabrian länsirannikolla Tyrrhenanmeren äärellä, Sant'Eufemian lahden reunalla. Tämä rannikko tunnetaan nimellä Costa degli Dei eli jumalten rannikko, ja se ulottuu Nicoterasta Pizzoon. Rannikon valkoiset hiekkarannat ja meren yllä kohoavat kalliot ovat sen tunnusmerkkejä. Kaupunki on rakentunut kalliotasanteelle meren yläpuolelle. Sen tunnetuin näkymä on kallionkielekkeellä oleva Santa Maria dell'Isola -kirkko.

*51 sanaa · kohteet: ita/tropea*

Huom (kirjoittaja): Italia.it ei nimeä merta, mutta kuvaa Calabrian rannikon. · Rajattu kuvailevaan sanamuotoon.

### 62. Millaisella kalliolla Santa Maria dell'Isola on?

Hiekkakivikalliolla. Kirkko seisoo hiekkakivestä koostuvalla kalliolla, joka oli ennen täysin meren ympäröimä ja jota kutsutaan siksi nimellä Isola eli saari. Nykyään kallio on kiinni mantereessa hiekkakannaksella, ja kirkolle noustaan portaita suoraan merenrannalta. Alueen maanjäristykset, erityisesti vuoden 1905 järistys, ovat vaurioittaneet rakennusta, joten sen nykyinen ulkoasu on myöhempää perua.

*48 sanaa · kohteet: ita/tropea*

**PT 16.10.: YHDEN LÄHTEEN VARASSA, vahvistettava.**

Huom (kirjoittaja): Avygeo on matkailuopas, ei geologinen lähde.

### 63. Kuinka kapea Kotorinlahti on kapeimmillaan?

Noin 340 metriä. Kapein kohta on Verigen salmi, jossa vastarannat ovat alle puolen kilometrin päässä toisistaan. Luku vaihtelee hieman mittauskohdan mukaan, ja koko lahti on pituudeltaan noin 28 kilometriä. Salmi erottaa lahden sisemmän osan Tivatinlahdesta, joten vuorten ympäröimä sisälahti on ikään kuin ahtaan portin takana. Tämä ahdas kohta tekee Kotorinlahdesta poikkeuksellisen suojaisen.

*52 sanaa · kohteet: mne/kotorinlahti*

**PT 16.10.: YHDEN LÄHTEEN VARASSA, vahvistettava.**

Huom (kirjoittaja): Matkailulähde mne.today (hakutulos) mainitsee salmen päässä 283 m, mikä viittaa eri mittauskohtaan; siksi "noin" ja maininta mittauskohdasta. · Päätelmä kapeudesta, ei erillinen faktaväite. · Toinen itsenäinen lähde puuttuu; luku noin-muodossa.

### 64. Minkä vuoristojen väliin lahti jää?

Kotorinlahti jää Orjenin ja Lovćenin vuoristojen väliin: Orjen on lännessä ja Lovćen idässä. Molemmat kuuluvat Dinaarisiin Alppeihin ja rajaavat lahtea jyrkillä kalkkikiviseinämillä, minkä vuoksi lahti näyttää työntyvän syvälle vuorten sisään. Lahden ympäristö on ollut Unescon maailmanperintökohde vuodesta 1979, ja Kotorin linnoitukset ovat pääosin Venetsian ajalta, sillä Venetsia hallitsi aluetta vuosina 1420-1797.

*51 sanaa · kohteet: mne/kotorinlahti*

Huom (kirjoittaja): Vain yksi lähde. · UNESCOn sivu antoi 403 suoraan; tieto hakutuloksen tiivistelmästä.

### 65. Mikä on lessepsiläinen vaellus?

Lessepsiläinen vaellus tarkoittaa merieliöiden siirtymistä Suezin kanavan kautta, yleensä Punaisestamerestä Välimereen. Nimi tulee kanavan rakentamista johtaneesta Ferdinand de Lessepsistä, ja kanava avattiin vuonna 1869. Aluksi suolaiset Katkerat järvet pysäyttivät lajeja, mutta este katosi ajan myötä. Sen jälkeen itäiseen Välimereen on asettunut satoja Punaisenmeren ja Intian valtameren lajeja.

*47 sanaa · kohteet: cyp/levantinmeri*

Huom (kirjoittaja): Mongabay ei nimeä Katkeria järviä. · Lähteiden luvut eroavat, joten vastauksessa vain "satoja".

### 66. Miten Suezin kanava muutti Välimeren eliöstöä?

Se avasi Välimerelle uuden reitin, jota pitkin Punaisenmeren ja Intian valtameren lajit ovat levinneet pohjoiseen. Itäisestä Välimerestä on löydetty satoja tulokaslajeja. Esimerkiksi kaniinikalat laiduntavat matalikoilla leväkasvillisuuden paljaaksi ja muuttavat elinympäristöjä. Kaikki vaikutukset eivät ole haitallisia, sillä osa tulokkaista on kalastajille arvokkaita. Muutos on silti niin suuri, että eliöyhteisöt joutuvat sopeutumaan.

*50 sanaa · kohteet: cyp/levantinmeri*

Huom (kirjoittaja): Täsmäluku jätetty pois, lähteet ristiriitaisia.

### 67. Mikä oli niemen antiikinaikainen nimi?

Pedalion. Antiikissa Kyproksen kaakkoiskulman niemi tunnettiin tällä nimellä. Nykyään sitä kutsutaan nimellä Kap Greco, ja se sijaitsee Famagustanlahden eteläpäässä. Kreikkalainen maantieteilijä Strabon kuvasi, että sen yllä kohoaa korkea puolisuunnikkaan muotoinen kukkula, joka oli pyhitetty Afroditelle. Kalkkikivijyrkänteisiin on kulunut luolia, ja alue on ollut tunnettu paikka jo yli kaksituhatta vuotta sitten.

*50 sanaa · kohteet: cyp/kapgreco*

Huom (kirjoittaja): Ei sanatarkkaa lainausta.

### 68. Miten merenalaiset luolat syntyvät kalkkikiveen?

Useimmiten ensin sade ja pohjavesi liuottavat kalkkikiveä, ja sitten meri laajentaa onkalot. Sadevesi ottaa ilmasta hiilidioksidia ja muuttuu heikoksi hiilihapoksi, joka syö halkeamia suuremmiksi. Rannalla aallot iskevät heikkoihin kohtiin ja leventävät niitä. Kun merenpinta nousi jääkauden jälkeen, osa luolista jäi veden alle. Rannan merelliset luolat ovat tavallisesti noin 5-50 metriä pitkiä, mutta pisimmät ylittävät 300 metriä.

*56 sanaa · kohteet: cyp/kapgreco*

Huom (kirjoittaja): Vain yksi lähde; muotoiltu yleisenä suuruusluokkana. · Yleinen selitys; Kap Grecon luolien tarkkaa syntyhistoriaa ei tarkistettu, joten vastaus ei väitä siitä muuta.

### 69. Mikä oli Messinan suolakriisi?

Messinan suolakriisi oli ajanjakso noin 5,96-5,33 miljoonaa vuotta sitten, jolloin Välimeri eristyi Atlantista ja sen vesi haihtui suurelta osin. Merenpinta laski huippuvaiheessa arviolta satoja metrejä, syvimmillä altailla yli kilometrin, ja pohjalle kertyi paksuja suolakerroksia. Kriisi päättyi, kun Gibraltarin kohta aukesi uudelleen. Se osoittaa, miten sulkeutunut merialtaan voi muuttua nopeasti.

*49 sanaa · kohteet: dza/valimeri*

**PT 16.10.: lisätty "syvimmillä altailla yli kilometrin".**

Huom (kirjoittaja): CIESM huomauttaa, ettei syvän altaan täydellinen kuivuminen ole varmaa; siksi "suurelta osin" ja "arviolta". · Paksuusarvio (3 km) pudotettu, koska vain vanha lähde; suolan kokonaismäärää ei esitetty.

### 70. Miten kuivunut meri täyttyi uudelleen?

Atlantin vesi syöksyi Gibraltarin kautta takaisin Välimereen noin 5,33 miljoonaa vuotta sitten, tapahtumassa nimeltä Zanclean-tulva. Vuoden 2009 Nature-tutkimuksen mukaan 90 prosenttia vedestä virtasi sisään muutamassa kuukaudessa tai korkeintaan kahdessa vuodessa. Merenpinta nousi parhaimmillaan yli kymmenen metriä päivässä. Luvut perustuvat laskennalliseen malliin, joten ne ovat arvioita.

*45 sanaa · kohteet: dza/valimeri*

Huom (kirjoittaja): Nature-artikkelin suora sivu vaati kirjautumisen; luku tiivistelmästä. SciAm antaa vähän väljemmän "muutaman vuoden".

### 71. Miksi Syyrian rannikkoa kutsutaan Levantiksi?

Nimi tulee ranskan sanasta levant, "nouseva", ja viittaa auringonnousuun eli itään. Taustalla on latinan levare, "nostaa". Eurooppalaisille Levantti oli Välimeren itäpuolen maat, joihin Syyrian rannikko kuuluu. Sama ajatus on sanassa orientti, joka tulee latinan sanasta "nouseva": itä on suunta, josta aurinko nousee. Sana on siis suuntanimi, ei varsinainen paikannimi.

*49 sanaa · kohteet: syr/valimeri*

Huom (kirjoittaja): Vuosilukua (englannissa 1497) ei käytetty, koska toista lähdettä ei vahvistettu. · Rajaus vaihtelee suppeasta laajaan, siksi vastaus sanoo vain "Välimeren itäpuolen maat".

### 72. Miksi Välimerta ympäröi maa lähes joka suunnalta?

Välimeri on jäänne muinaisesta Tethys-merestä, jonka Afrikan ja Euraasian mannerlaatat puristivat kasaan. Törmäys on kestänyt kymmeniä miljoonia vuosia, ja meri jäi lähes maan sulkemaksi. Valtamereen pääsee vain Gibraltarinsalmen kautta, joka on noin 14 kilometriä leveä. Mannerten liike muokkaa merta yhä. Salmi on siis meren ainoa luonnollinen ovi valtamerelle.

*48 sanaa · kohteet: tun/valimeri*

Huom (kirjoittaja): Ajankohdasta ("noin 30 milj. vuotta") lähteet vaihtelevat; vastaus sanoo vain "kymmeniä miljoonia vuosia". · Joissakin lähteissä 13 km; käytetty "noin 14".

### 73. Mitä reittiä Välimereltä pääsee valtamerelle?

Gibraltarinsalmen kautta Atlantille, Välimeren länsipäässä. Salmi erottaa Espanjan ja Marokon, ja kapeimmillaan se on noin 14 kilometriä leveä. Vuoteen 1869 asti se oli ainoa meriyhteys Välimereltä valtamerelle. Suezin kanava avasi sen jälkeen reitin Punaiselle merelle, mutta Gibraltar on edelleen ainoa luonnollinen yhteys. Euroopan ja Afrikan välinen matka on siellä lyhyt.

*50 sanaa · kohteet: tun/valimeri*

Huom (kirjoittaja): Punainenmeri johtaa Intian valtamerelle; vastaus ei väitä kanavan olevan valtamerireitti.

### 74. Miksi Bosporinsalmi on niin tärkeä?

Se on Mustanmeren ainoa meriyhteys Marmaranmerelle ja sitä kautta Välimerelle. Salmi on noin 30 kilometriä pitkä ja kapeimmillaan vain noin 700 metriä leveä, ja Istanbul sijaitsee sen molemmilla rannoilla. Siitä kulkee yli 40 000 alusta vuodessa, joten pieni salmi on yksi maailman vilkkaimmista vesiväylistä. Kulkua säätelee vuoden 1936 Montreux’n sopimus.

*50 sanaa · kohteet: tur/marmaranmeri*

Huom (kirjoittaja): Luvut vaihtelevat 38 000–56 000; käytetty varovaista "yli 40 000".

### 75. Mikä Dardanellit on?

Dardanellit on Turkin salmi, joka yhdistää Egeanmeren Marmaranmereen. Se on noin 61 kilometriä pitkä ja 1,2–6 kilometriä leveä. Antiikissa sitä kutsuttiin Hellespontokseksi. Salmen rannoilla käytiin vuonna 1915 Gallipolin taistelut ensimmäisessä maailmansodassa. Salmen eteläisellä Aasian rannalla on Çanakkalen kaupunki. Bosporin kanssa se muodostaa Mustanmeren meritien Välimerelle.

*45 sanaa · kohteet: tur/marmaranmeri*

Huom (kirjoittaja): Joissakin lähteissä viimeiset joukot lähtivät tammikuussa 1916; vastaus mainitsee vain vuoden 1915 taistelut.

### 76. Miksi Anatolian etelärannikkoa kutsutaan Turkoosiksi rannikoksi?

Nimi viittaa veden väriin: rannikon vesi näyttää kirkkaan turkoosin sinivihreältä. Turkoosi rannikko sijaitsee Turkin lounaisosassa, karkeasti Bodrumista Antalyaan. Sana turkoosi tulee ranskan ilmauksesta "turkkilainen kivi", koska jalokivi tuli Eurooppaan Turkin kautta. Nimi viittaa siis sekä veden väriin että maahan. Se on suosittu kansanomainen nimitys, jota käytetään myös englanniksi.

*48 sanaa · kohteet: tur/valimeri*

**PT 16.10.: nimen alkuperä -> "nimi viittaa veden väriin" (korjattu).**

Huom (kirjoittaja): Wikipedia (Turkish Riviera) kertoo vain, että rannikkoa kutsutaan Turkoosiksi rannikoksi, nimen alkuperää ei selitetä. Wikipedia kuvaa nimeä suosituksi (popular) nimitykseksi. · Rajaus vaihtelee lähteittäin (Antalya–Marmaris, Bodrum–Antalya); käytetty "karkeasti". Pituutta ei mainittu. · Kivi tuli Eurooppaan kaupan kautta Turkista; yksityiskohdat (Marco Polo vai basaarit) vaihtelevat, vastaus ei niitä mainitse.

### 77. Miksi Mustanmeren syvyys on hapeton?

Syvä vesi on hapetonta, koska meren kerrokset eivät sekoitu. Joet tuovat pinnalle kevyttä makeaa vettä, ja Bosporin kautta pohjalle valuu raskaampaa, suolaisempaa Välimeren vettä. Noin 100–200 metrin alapuolella happi on loppunut, ja lähes 90 prosenttia syvästä vedestä on hapetonta. Pohjalla on hapen sijaan rikkivetyä. Siksi vain pintakerroksessa on happea.

*49 sanaa · kohteet: rou/mustameri*

Huom (kirjoittaja): Lähteet antavat 80–90 %; käytetty muotoa "lähes 90 prosenttia". · Raja vaihtelee paikan ja vuoden mukaan; siksi väli. · Rikkivety pohjalla: National Academies (hakutulos) mainitsee rikkivetyä alle noin 200 m.

### 78. Mistä meri sai nimensä?

Varmaa vastausta ei ole. Antiikin kreikkalaiset kutsuivat merta ensin nimellä, joka tarkoitti vieraanvaraisuudetonta, ja sitten nimellä "vieraanvarainen". Alkuperäinen sana johdetaan usein iranilaisesta sanasta "tumma". Toisen teorian mukaan musta tarkoitti pohjoista. Suosittu selitys veden tummuudesta on mahdollinen, mutta kiistelty. Kielitieteilijät eivät ole yhtä mieltä, joten nimen alkuperää ei voi pitää ratkaistuna.

*50 sanaa · kohteet: rou/mustameri, ukr/mustameri*

Huom (kirjoittaja): Teoria, ei varmaa tietoa. · Nimen alkuperä on kiistanalainen; vastaus kertoo sen eikä ota kantaa.

### 79. Miksi Mustameren syvyys on hapeton?

**TUPLA 77:stä, yhdistetty (sama vastaus):**

Syvä vesi on hapetonta, koska meren kerrokset eivät sekoitu. Joet tuovat pinnalle kevyttä makeaa vettä, ja Bosporin kautta pohjalle valuu raskaampaa, suolaisempaa Välimeren vettä. Noin 100–200 metrin alapuolella happi on loppunut, ja lähes 90 prosenttia syvästä vedestä on hapetonta. Pohjalla on hapen sijaan rikkivetyä. Siksi vain pintakerroksessa on happea.

*49 sanaa · kohteet: ukr/mustameri*

**PT 16.10.: TUPLA 77:stä (sama vastaus); yhdistetty: käytä yhtä vastausta kummallekin nostolle. Ukrainan nostossa kysymys korjattu muotoon "Mustanmeren" (korjaus-PR #4685).**

Huom (kirjoittaja): Lähteet antavat 80–90 %; käytetty muotoa "lähes 90 prosenttia". · Raja vaihtelee paikan ja vuoden mukaan; siksi väli. · Rikkivety pohjalla: National Academies (hakutulos) mainitsee rikkivetyä alle noin 200 m. · Kysymys on kirjoitettu "Mustameren" (kirjoitusvirhe, oikein Mustanmeren); vastaus sama kuin Mustanmeren hapettomuuskysymykseen.

### 80. Mikä Kertšinsalmi on?

Kertšinsalmi on kapea salmi, joka yhdistää Mustanmeren ja Asovanmeren. Se on kapeimmillaan noin kolme kilometriä leveä ja korkeintaan noin 18 metriä syvä. Kapea ja matala salmi rajoittaa veden vaihtumista, ja Asovanmeren vesi on vähäsuolaista: noin kolmasosa valtameren suolaisuudesta. Se on myös Asovanmeren ainoa yhteys Mustaanmereen.

*45 sanaa · kohteet: ukr/asovanmeri*

Huom (kirjoittaja): Hakutulos antoi myös "noin 4 km"; käytetty "noin kolme". · Salmen pituudesta lähteet ovat ristiriidassa (35 vs 45 km), joten pituutta ei mainittu. · Joet (Don, Kuban) tuovat myös makeaa vettä; vastaus ei väitä salmea ainoaksi syyksi.

### 81. Miksi Asovanmeri on niin matala?

Jokien tuoma maa-aines täyttää sen pohjaa. Meri on suurimmillaankin vain noin 14 metriä syvä ja keskimäärin noin 7 metriä, joten sitä pidetään maailman matalimpana merenä. Don ja Kuban tuovat siihen suurimman osan jokivedestä sekä hiekkaa ja savea. Syvyys vähenee edelleen. Pohja on tasainen, ja syvyys kasvaa keskustaa kohti vain hitaasti.

*50 sanaa · kohteet: ukr/asovanmeri*

**PT 16.10.: "Don ja Kuban yli 90 %" -> "suurimman osan jokivedestä" (korjattu).**

Huom (kirjoittaja): Keskisyvyys 7–8 m lähteestä riippuen. · Syy-yhteys perustuu pääosin Wikipediaan; Encyclopedia of Ukraine ei selitä syytä. Maailman matalimpana merenä pitäminen perustuu Wikipediaan ja Britannicaan (hakutulos).

