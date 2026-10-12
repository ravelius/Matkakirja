# Paramaribo — rajattu A-faktapohja ja C-lähdetuki

Luettu 12.10.2026. Omistus: e13/paramaribo. Tämä on tekstiluonnoksen lähdekooste; täysi A/B/D/E/F-portti ei ole läpäisty.

## 0. Lähteet ja 1873-kehys

Kaikki alla olevat sivut haettiin yhteisellä sallittu_haku.py-apurilla, joka tarkisti robots-säännöt sekä Claude-Userille että omalle User-Agentille ja tarkisti mahdolliset HTTP-ohjaukset. HTML, luettava teksti ja hakutiedot ovat NASin `valiaikainen/nopea-e13-paramaribo/`-kansiossa. Ei API-/Commons-/kuvahakuja.

| Tunnus | Luettu lähde ja olennaiset osiot |
|---|---|
| P1 | en-Wikipedia [Paramaribo](https://en.wikipedia.org/wiki/Paramaribo): History, Geography, Economy, Transport, Historic inner city. `kaupunki.html/txt`. |
| P2 | UNESCO [Historic Inner City of Paramaribo](https://whc.unesco.org/en/list/940/): Brief synthesis, Criteria, Integrity, Authenticity. `unesco.html/txt`. |
| P3 | en-Wikivoyage [Paramaribo](https://en.wikivoyage.org/wiki/Paramaribo): Understand, Get in, Get around, See, Buy, Eat. `opas.html/txt`. |
| P4 | en-Wikipedia [Culture of Suriname](https://en.wikipedia.org/wiki/Culture_of_Suriname): Cuisine. Haku Surinamese cuisine ohjautui tähän sisältöön. `ruoka.html/txt`. |
| P5 | en-Wikipedia [Pom (dish)](https://en.wikipedia.org/wiki/Pom_(dish)): History, ainesosat ja valmistus. `pom.html/txt`. |
| P6 | en-Wikipedia [Fort Zeelandia (Paramaribo)](https://en.wikipedia.org/wiki/Fort_Zeelandia_(Paramaribo)): johdanto, History, museo. Hakunimi Fort Zeelandia (Suriname). `fort.html/txt`. |
| P7 | en-Wikipedia [Garden of Palms](https://en.wikipedia.org/wiki/Garden_of_Palms): johdanto ja historia. Hakunimi Palmentuin. `palmut.html/txt`. |
| P8 | en-Wikipedia [Waterkant](https://en.wikipedia.org/wiki/Waterkant): johdanto, History, 21st century. `waterkant.html/txt`. |
| P9 | en-Wikipedia [Saint Peter and Paul Cathedral, Paramaribo](https://en.wikipedia.org/wiki/Saint_Peter_and_Paul_Cathedral,_Paramaribo): historia. `katedraali.html/txt`. Vain ennen/jälkeen 1873 -kehys; ei karttakohteeksi. |

1873: Paramaribo oli jo Alankomaiden siirtomaan hallintokaupunki (P1 History; P2 kuvaa 1600–1700-luvun kaupunkia). Fort Zeelandia oli olemassa (P2, P6); palmupuutarha oli olemassa mutta sen julkinen uudelleenavaus oli vasta 1900-luvun alussa (P7; P3). Nykyinen puukatedraali on myöhempi (P2, P9). Ei isoisän reittiä, tekemisiä tai lainauksia.

## 1. Perusfaktat ja rajaus

- Surinamen pääkaupunki Surinamejoen rannalla, Atlantin tuntumassa: P1 johdanto/Geography, P2 sijaintikuvaus. Ei etäisyyslukua.
- Vanhan alkuperäiskansan kylän paikalle kasvanut siirtomaa-ajan kaupunki: P1 History, P3 Understand. Tarkkaa perustamisvuotta tai nimen etymologiaa ei käytetä ristiriitojen vuoksi.
- Kaupan ja rahoituksen keskus; paikallisia lentoja Zorg en Hoopista ja pieniä matkustajalauttoja jokiväylällä: P1 Economy/Transport, P3 Get in/Get around.
- Kontekstin tarkistettu 240 924 (2012) tarkoittaa Paramaribon piiriä. Lukua ei siirretä lukijateksteihin; eri aluelaajuuksien ja uudempien arvioiden sekoittaminen vältetään.
- Hollanti, sranan tongo, sarnami hindustani ja jaava kaupungin kielinä: P3 Understand, kontekstin maan perustiedot.
- Maalehteä tai lähikaupunkien nostoja ei kontekstissa ole. Kevyen pisteen puutalot/linnoitus/katedraali käsitellään artikkelin ankkureina; nostot painottavat uusia yksityiskohtia.

## 2. Kansi — nostoaiheet ja väitteet

1. **Kadun alla on simpukoita** — P2 Brief synthesis: pääkadut seuraavat shell ridges -harjanteita; luonnostaan kuivuva rakennuspohja; katuverkko Fort Zeelandian ympäriltä; ruutukaava; myöhempi laajentaminen suomaalle; katuverkko kuuluu säilyneeseen kokonaisuuteen. Wiki Paramaribo.
2. **Uusi nimi ei tarttunut** — P1 History, P3 Understand: New Middelburg ei tarttunut asukkaille; Fort Zeelandia jäi nimeksi; linnoituksen nimi viittaa hollantilaiseen maakuntaan, joka rahoitti laivaston; Paramaribon nimi liittyy paikalla olleeseen kylään. Nimen tarkkaa alkuperäistä kirjoitusasua tai käännöstä ei lukita. Wiki Paramaribo.
3. **Hollantilainen muoto, paikallinen puu** — P2 Brief synthesis/Criteria/Integrity: pääosin puurakennuksia; symmetrinen ja selkeä muoto; eurooppalaiset vaikutteet + paikalliset materiaalit ja taidot; kreolikulttuurin vaikutus; tuli uhkaa puutaloja; perinteiset korjausmateriaalit. Wiki Paramaribo.
4. **Ostokset vaihtavat kerrosta** — P3 See/Buy: Keskustori Waterkantilla; alakerrassa kala/liha/vihannekset/hedelmät; yläkerrassa vaatteet/kengät/keittiötavarat; välipaloja; osa myyjistä vastustaa valokuvausta. Ei myyntikojujen lukua, superlatiivia tai aikataulua. Wiki Paramaribo.

## 3. Teemasivu: ruoka — Sama kaupunki, monta keittiötä

1. **Uunivuoassa on maavarsi** — P5: pomtajer on tayerin maanalainen varsi, ei kaikista kasvin osista tehty sose; kana kahden raastekerroksen välissä; sitrusmehu; sipuli, tomaatti ja mausteet; uunissa kullanruskeaksi; juhlaruoka; broodje pom. P3 Eat vahvistaa pom-leivät kaupungissa. Kreolinen/juutalainen tausta muotoillaan liittämiseksi, ei varmaksi yksittäiseksi alkuperätarinaksi.
2. **Roti kokoaa juhlaväkeä** — P4 Cuisine: roti, currykanan/perunan/vihannesten tavallinen yhdistelmä; myös juhlia suurille joukoille; eteläaasialaiset, kreoliset ja jaavalaiset vaikutteet; yhteisöt vaikuttivat toistensa ruokiin ja aineksiin. P3 Eat: roti kaupungin ruokapaikoissa.
3. **Warung on kaupunginosan ruokapaikka** — P3 Do/Eat: Blauwgrondin jaavalainen yhteisö; warung pieni ravintola/kauppa; pienet vaatimattomat ruokapaikat, ulkopöytiä. P4 Cuisine: nasi goreng ja mie goreng jaavalaisessa ruokaperinteessä.
4. **Maniokki päätyy myös kakkuun** — P4 Cuisine: boyo kookoksesta ja maniokista; maniokki myös perusruokaa; fiadussa rusinat/mantelit/sokeroidut hedelmät; vaniljaiset maissitärkkelyskeksit. Kakku ei väitetty Paramaribossa keksityksi.

Minitehtävä: boyo-kakun maniokki, löytyy neljännestä nostosta; ei sama kuin pomia käsittelevä kaupunkivisa. Vastaus kirjoitettu eri sanoin.

## 4. Matkailijan viisi jaksoa

- Perille ja liikkeelle: P1 Transport, P3 Get in/Get around. Johan Adolf Pengel International Airport Zanderijissa (PBM); eri kenttä Zorg en Hoop; vanha keskusta jalan; yksityiset bussit voivat odottaa täyttymistä; vasemmanpuoleinen liikenne. Ei syytä liikennepuolelle, hintoja, aikatauluja tai lentoreittejä.
- Puutalojen ja joen reitti: P3 Get around/See, P2 katuverkon arvo, P1/P8 lautta Meerzorgiin.
- Torilta Blauwgrondiin: P3 See/Buy/Do/Eat. Torin kerrokset; pienet ruokapaikat; warungin merkitys.
- Mitä täällä syödään: P4/P5/P3: roti, pom, bakkeljauw, paistettu riisi/nuudelit, Madame Jeanette -chili. Ei reseptin terveysväitteitä.
- Milloin kannattaa tulla: P1 Climate/P3 Climate vain laadullinen lämmin/kostea/sateisempi ja vähemmän sateinen. Ei kuukauden, lämpötilan tai sademäärän lukuja. Sääauditointi erillinen.

Parasta 5: puutalokadut, linnoituksen museo, Keskustori, Blauwgrond, Palmupuisto. Hyvä tietää 4: kentät erikseen, kuvauslupa, vasen liikenne, kielet. Nykyinen turvallisuusarvio ja palvelujen toiminta jäävät D-vaiheeseen; tässä ei matkustuslupaväitettä.

## 5. Kohdekartta — partial 2/6–8

| Kohde | Tyyppi | lat | lon | Oma pistelähde |
|---|---|---|---|---|
| Fort Zeelandia | rakennus | 5.82520 | -55.14987 | P6 infoboxin desimaalikoordinaatti 5.8252; -55.149872, pyöristetty 5 desimaaliin. |
| Palmupuisto | luonto | 5.82820 | -55.15020 | P7 sivun oma koordinaatti. |

Rajat kattavat nämä kaksi kohdetta noin 300 m marginaalilla. Fortin sivulla on myös DMS-koordinaatista laskettu 5.82528; -55.15000; valittu infoboxin desimaalipiste, ero kirjattu eikä lainattu kaupungin pistettä. Tarkempi kartta-auditointi avoin.

Fortin juttu: P6/P3: ranskalainen puulinnoitus, brittiläinen vahvistaminen, Willoughby-nimi, hollantilainen vallanvaihto ja Zeelandia-nimi, pitkä käyttöhistoria, Suriname Museum, arkeologia/tekstiilit/valokuvat/huonekalut, upseeritalot ja komentajantalon taidekoulu. Ei rakennusvuotta, taistelukestoa tai modernia politiikkaa.

Palmupuiston juttu: P7/P2/P3: kuningaspalmut, kuvernööri Cornelis van Aerssen van Sommelsdijckin istutusmääräys, puutarhan trooppiset linnut, palatsin takainen sijainti, 1600-luvun julkinen avaus, pitkä sulkeminen, 1900-luvun alun uudelleenavaus, maailmanperintöympäristö, leikkipaikka ja juhlapäivien kojut. Kohde on oikea puutarha. Sen myöhempiä patsaita ei saa sisällyttää kuviin. Ei tekijäsuojatun rakennuksen uudelleennimeämistä luonnoksi.

## 6. Kysymykset ja kolme tietoa

Kysymykset: maa (P1), simpukkaharjanteiden rakennuspohja (P2), Willoughby-nimi (P6), pomin maavarsi (P5), Blauwgrondin jaavalaiset warungit (P3). Tasot 1, 2 ja 3 mukana. Vihjeet eivät sisällä oikeaa vastausta.
Tiedot: New Middelburg/Zeelandia-nimien ero (P1); torin kerrokset (P3); pom juhlassa ja leivässä (P3/P5).

## 7. Kuvatarpeet — ei kuvahakua

Kaikkien 20 kuvaroolin tiedosto/lahde/lyhyt/selite ovat tyhjät: valokuva 1, kansi 3, nostot 8, matkailijalle 1, oppaan jaksot 5, kohdejutut 2. Kuvaputkelle: yleiset puutalokadut, jokiranta ja palatsin ympäristö; simpukkaharjanteisiin liittyvä katunäkymä; nimenvaihdokseen sopiva vanha linnoitus; puutalojen rakentaminen; Keskustorin tavarat; pom/roti/warung/boyo; tuore pystykuva keskustasta; lentokenttä/liikkuminen/joenranta/Blauwgrond/ruoka/sadevarustus; Fort Zeelandia ilman uusia teoksia sekä Palmupuiston puusto ilman myöhempiä patsaita. Ei kuvitteellista Commons-nimeä tai ennen–nyt-paria.

## 8. Epävarmat ja tarkkuuden ratkaisut

- Kaupungin tarkka perustamisvuosi eroaa P1/P3/P8 välillä; pois tekstistä. Varhaiset ranskalaiset ja englantilaiset linnoitusvaiheetkin ajoitetaan vuosisadalla.
- P2:n Fort Zeelandia -vuosi kuvaa nimenvaihtoa/siirtomaavaihetta, P6 eri rakennusvaihetta: ei yhtä perustamisvuotta.
- Nimen etymologia ja kylän kirjoitusasu vaihtelevat: ei varmaa sanakäännöstä.
- P4/P5 sisältävät lähdehuomautuksia. Ruokien perustiedot käytetty rajatusti, ei tarkkoja alkuperä- tai suosioväitteitä; riippumaton D-tarkistus tarpeen.
- P3:n käytännön tieto sisältää vanhoja päivämääräisiä kohtia. Ei käytetty hintoja/lentoja/aukioloa; reitti- ja palvelutarkistus avoin.
- `saa.json` ei 48/48 primäärivarmennettu tässä työssä: saatiedot null, tiedostoa ei muokata.

## 9. Pois jätetty

Nykypolitiikka, modernit väkivaltatapahtumat ja muistomerkit; Arya Diwaker ja moderni moskeijarakennus karttakohteina; katedraali kohteena ennen tekijä-/muutosvaiheketjun auditointia; Waterkant karttamerkkinä, koska katu ei ole sallittu rakennus/aukio/luonto-tyyppi; numeroimaton täydellinen 6–8 kohteen kartta. Kuvat tulevat toisesta putkesta. Ei Git-operaatioita, pelikytkentää tai julkaisua.
