# Majuro — rajattu A-kooste / C-luonnoksen lähdepohja

Omistus e14/majuro, tehtävä 26. Luettu 12.10.2026. Nopean tekstityön rajattu lähdekooste, ei täyden A-portin läpäisy. Kaupungin konteksti luettu: ei maalehteä/lähikaupunkien nostoja. Uudet aiheet ulottuvat kevyen pisteen atollimuotoa ja rakennusluetteloa pidemmälle: kiitotien sadevesi, tonnikalan siirtokuormaus, kookosöljykokeilu, Alelen nimen merkitys, aaltonavigointi, karttojen käyttö, WAM:n puutyöopetus ja Lauran pohjavesi.

## 0. Lähteet ja hakutodisteet

Yhteinen `valiaikainen/sallittu_haku.py`, robots ennen polkuja, tavalliset HTML-sivut, ei API-/PDF-/kuvahakuja. HTML, lukutekstit ja oma `lahteet.jsonl` ovat `valiaikainen/nopea-e14-majuro/`-kansiossa. Hakutodisteisiin kopioidaan vain tämän kaupungin lähteisiin liittyvät omat lokirivit.

- S1 [Majuro](https://en.wikipedia.org/wiki/Majuro): lead, Geography, History, Economy, Education, Infrastructure/Water and sewage, Transport. `majuro.html/txt`.
- S2 [Majuro, Wikivoyage](https://en.wikivoyage.org/wiki/Majuro): Get in, Get around, See, Do, Eat. Osin vanhaa matkailutietoa; ei hintoja/aukioloaikoja/aikatauluja. `voyage.html/txt`.
- S3 [Marshall Islands stick chart](https://en.wikipedia.org/wiki/Marshall_Islands_stick_chart): lead, Significance, Swell patterns, General types. `charts.html/txt`.
- S4 [Alele Museum & Public Library](https://en.wikipedia.org/wiki/Alele_Museum_%26_Public_Library): History, Museum, Library, National archives. `museum.html/txt`.
- P1 [Waan Aelõñ in Majel (WAM)](https://www.canoesmarshallislands.com/): ohjelman oma etusivu, puutyötuotteet/opetus, purjehdus Majuron laguunilla, vierailukeskus. `wam.html/txt`. Etusivun vanhoja uutispäiviä tai kuvatekstien vuosia ei tuoda C:hen. Päivittäinen toiminta/varaus varmistettava suoraan.
- P2 [Majuro Water & Sewer Company: About Us](https://majurowater.com/about/): kiitotien sadevesi, kaivot, Laura varalähteenä, meriveden WC-huuhteluverkosto. `water.html/txt`.
- P3 [Office of Commerce, Investment & Tourism: Plan Your Trip](https://www.visitmarshallislands.mh/plan-your-trip): lentoasema atollilla, taksit ja vuokra-autot Majurossa. `tourism.html/txt`. Lentoyhtiöluettelo poikkeaa S1:stä; yhtiö- tai lentoaikataulutietoa ei käytetä.
- S5 [Copra](https://en.wikipedia.org/wiki/Copra): lead, kuivatun kookosytimen määritelmä. Jo saman tehtävän omistetulle South Tarawalle haettu ja luettu HTML/lukuteksti kopioitu omaan lähdekansioon; ei uutta verkkohakua.

## 1. 1873-kehys

S1/History: Majuron asutus on vanhaa; Lauran maauunilöydöt tukevat sitä. Nykyisten marshallilaisten esivanhemmat asuivat atollilla kauan ennen saksalaista 1800-luvun loppupuolen siirtomaahallintoa. Majuron valtakunnallinen pääkaupunkiasema kuuluu 1900-luvun myöhempään historiaan. Turvallinen muoto: 1873 paikka oli jo asuttu, muttei nykyisen tasavallan pääkaupunki. Ei tarkkaa asutuksen ikää, hiiliajoitusväliä, lähetys-/kauppayhtiövuosia tai perustamisvuotta yhdestä lähteestä. Ei isoisän tekoja tai matkapäiväkirjaa.

## 2. Perusfaktat ja väiteluettelo

| C-tekstien fakta | Lähde / osio |
|---|---|
| Marshallinsaarten pääkaupunki; Majuro myös atollin nimi; kaupungin ydin Delap–Uliga–Djarrit eli DUD | S1 / lead; hyväksytty konteksti |
| Laguuni ja kapeat maakaistaleet; Laura länsiosassa, kaupunkiydin idässä | S1 / Geography; konteksti |
| Sadevesi kerätään lentoaseman kiitotieltä vesihuollon käyttöön | S1 / Water and sewage; P2 / About Us |
| Tonnikalaa siirretään kurenuotta-aluksista kuljetusaluksiin Majuron laguunilla | S1 / Transport/Sea; ei tonnimäärää, vuotta tai superlatiivia |
| Tobolarin yhteydessä kerrottu kookosöljykokeilu dieselpolttoaineen vaihtoehtona ajoneuvoissa, generaattoreissa ja laivoissa | S1 / Economy; muotoillaan historialliseksi kokeiluksi 2000-luvulla, ei nykyisen liikenteen polttoaineeksi |
| Kookosöljy saadaan koprasta, joka on kuivattua kookospähkinän ydintä | S1 / Economy, S5 / lead; ei tuotantosaantoa |
| Alele tarkoittaa laukkua/koria, perheen arvoesineiden säilytysastia | S4 / History |
| Alele on museo, julkinen kirjasto ja kansallinen arkisto; työkalut, käsityöt, kalastus, veneet ja navigointi kokoelmissa | S4 / lead, Museum, Collections |
| Alelen radio-ohjelma tavoittaa ulkosaaria; kulttuuriperinnön keruu/tallennus | S4 / Museum; ei perustamisvuosia, yleisömäärää tai jatkuvan lähetyksen aikataulua |
| Tikkukarttojen osat kookoslehden ruodeista; simpukankuoret tai risteävät tikut kuvaavat saaria | S3 / lead |
| Tikkukartat esittävät valtameriaallokkoa ja saarten vaikutuksia siihen, opiskellaan/muistetaan ennen matkaa eikä käytetä matkalla karttana | S3 / lead, Significance |
| Navigoija tuntee veneen liikkeistä aallokkoa; aaltojen taittuminen ja kaartuminen saarten ympärillä | S3 / Significance, Swell patterns; ei väitettä taidon kattavuudesta kaikille asukkaille |
| WAM opettaa nuoria, puutyöohjaajat ja oppilaat tekevät käsin malliveneitä, kookosraastimia ja tikkukarttoja; tuotto ohjelmaan | P1 / Welcome, Hand-made WAM products |
| WAM:n vierailukeskus ja mahdollisuus tiedustella perinteisellä veneellä purjehdusta Majuron laguunilla | P1 / Sailing, Visitors Center; ei saatavuus- tai aikataululupausta |
| Lauran kaivot varalähde kuivana kautena; pohjavesikaivot vesihuollossa | P2 / About Us; linssin geometriaa ei väitetä ilman paikan tutkimuslähdettä |
| Meriveden jakelu WC-huuhteluun verkoston osassa, makea vesi/jätevesi/merivesi eri järjestelmiä | P2 / About Us |
| Kansainvälinen lentoasema, taksit, vuokra-autot, jaetut taksimatkat | S1 / Air, S2 / Get in/Get around, P3 / Getting Here/Getting Around |
| Ruokapaikoissa tonnikalaa, myös kiinalaista ja länsimaista ruokaa | S2 / Eat; ei ravintolasuositusta tai paikallisen ruoan olemusta koskevaa yleistystä |
| Lämmin, sateinen ilmasto, myös kuivuusongelmia | S1 / Climate, Water and sewage; ei aste-/sade-/kuukausilukuja |

## 3. Kansi ja teema

Kansi kertoo kaupungin infrastruktuurista, työstä ja tiedon säilyttämisestä; tiede-teema lukee aaltoja, erottaa muistiin opeteltavan kartan laivan työvälineestä, näyttää elävää WAM:n työtä sekä makean veden/meriveden/jäteveden erilaisia tehtäviä vesihuollossa. Saariryhmän navigointitieto ankkuroidaan Majuron Alele-kokoelmiin ja WAM:n työhön, ei irralliseksi maalehtijutuksi.

## 4. Matkailijan opas

Viisi jaksoa: perille/liikkuminen, Alele/WAM, laguuni/Laura, ruoka, sää/vesi. Ei tarkkoja taksihintoja, lentoyhtiöpäiviä, aukioloaikoja, reittitakuita tai vesihuollon päivittäisiä tuntiväitteitä. Toimitukselliset neuvot yhteyksien, varausten ja juomaveden selvittämiseen eivät ole väitteitä paikallisesta pakollisesta säännöstä. Viranomaisen matkustusvaroituksen nykytila D-tarkistuksessa avoin.

## 5. Kartta / suojatut teokset

Partial: 0 yksittäistä omaa WP/WD-pistettä varmennettu. Wikivoyagen Laura Beach -pistettä ei hyväksytä tämän tehtävän WP/WD-portin tilalle. Majuron atollin tai DUD:n pisteitä ei lainata museoille, rannalle tai WAM:n rakennukselle. `rajat:{}`, `kohteet:[]`, `nahtavyydet:{}`. Alele/WAM kuvataan laitoksina, ei niiden nykyistä arkkitehtuuria tai moderneja kokoelmateoksia kartan/kuvan kohteina. Tekijän kuolinajan ja oikeuden tarkistus puuttuu moderneista rakennuksista; parlamentti ja muistomerkit jäävät pois.

## 6. Kysymykset

Suunnitelma: valtio, kiitotien vesikäyttö, Alelen nimen merkitys, siirtokuormattu kala, tikkukartan muistikäyttö. Vastaus jokaisella lähteistettynä ja tekstissä. Taso 1 ja 3. Minitehtävä WAM:n tuotteiden tuoton käyttötarkoituksesta; sama kysymys ei ole visassa, vastaus teeman omissa nostoissa.

## 7. Kuvaputki

18 kuvaroolia, kaikki neljä kuvakenttää tyhjiä. Ei kuvia valittu, katsottu tai generoitu tässä tehtävässä. Muistio sisältää puutelistana aiheita, ei tiedostonimiä/lisenssejä.

## 8. Ristiriidat / poisjätöt

- Kontekstin 23 156/2021 koskee koko Majuron atollia, kaupunkiydin DUD on siinä erikseen 14 149. S1:n lead nimeää saman 23 156:n DUD:n väkiluvuksi. Kontekstia ei korvata; kaikki väestöluku jätetään C:stä pois.
- Lauran etäisyys vaihtelee WP:n ja Wikivoyagen välillä ja lähtöpiste/rajaukset poikkeavat; ei kilometrilukua.
- S3:n väite tikkukarttojen käytön loppumisesta toisen maailmansodan jälkeen on ristiriidassa P1:n navigoinnin opetuskuvauksen ja nykyisten tuotteiden kanssa. Ei käytetä väitettä kulttuurin/taidon katoamisesta.
- Kookosöljyn käyttö on lähteen raportoima kokeilu, ei väite nykyisen liikenteen polttoainejärjestelmästä.
- Tarkat luvut/vuodet, superlatiivit ja kapasiteetit pois, koska kahden riippumattoman lähteen tuki puuttuu. 1873 on annettu tarinakehys.
- Sää `saatiedot:null`; olemassa olevaan saa.json:iin ei kosketa, 48/48 primääriauditointi puuttuu. Ei säälukujen käsin kopiointia.

## 9. Portit

Rajattu A-kooste ja C-tekstiluonnos kirjoitettu näistä lähteistä. Täysi kartan A-portti, B/D/E/F, sääauditointi, hyväksyntä, pelikytkentä ja julkaisu avoimia. Lopullisen alkuperäisen lyhyen tarkistimen tiedosto ja exit tallennetaan omaan väliaineistoon. Ensimmäisen ajon visavaihtoehdon pituusvaroitus korjattiin (uskottavat samankokoiset kalanimet); sitä ei piilotettu tarkistimen muutoksella.
