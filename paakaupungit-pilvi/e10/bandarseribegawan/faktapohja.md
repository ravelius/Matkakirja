# Bandar Seri Begawan — rajattu A-lähdekooste C-luonnosta varten

Luettu 12.10.2026. NAS-klooni: sessio-72-20261011/e10. Omistus: vain e10/bandarseribegawan. Tämä kooste ei täytä A:n kuuden karttakohteen porttia; teksti on C-luonnos, ei toimitushyväksyntä.

## 0. Lähteet ja hakutapa

Kaikki sivut haettu yhteisen `valiaikainen/sallittu_haku.py`-apurin kautta. Robots tarkistettu molemmille ohjeen agenteille, redirectit tarkistettu, globaali yhden sekunnin lukko käytössä. Tavalliset Wiki-sivut, ei /w/- eikä /api/-hakua. HTML:t ja niistä poimitut tekstit ovat `valiaikainen/nopea-e10-bandarseribegawan/`-hakemistossa. SHA ja tarkistukset saman hakemiston todisteissa.

| Tunnus | URL | Käytetyt osiot |
|---|---|---|
| W1 | https://en.wikipedia.org/wiki/Bandar_Seri_Begawan | Johdanto, Etymology, History, Geography, Climate vain laadullisesti, Culture, Transport, Economy |
| W2 | https://en.wikipedia.org/wiki/Kampong_Ayer | Etymology, History, Administration, Infrastructure, Traditional houses |
| W3 | https://en.wikipedia.org/wiki/Malay_Technology_Museum | Johdanto, Location, Exhibitions ja kolme näyttelysalia |
| W4 | https://en.wikipedia.org/wiki/Tasek_Lama_Recreational_Park | Johdanto, History, Facilities and activities, Water infrastructure |
| V1 | https://en.wikivoyage.org/wiki/Bandar_Seri_Begawan | Get in, Get around, See, Buy, Eat; ei hintoja eikä aukioloaikoja |
| P1 | https://www.bruneitourism.com/brunei-muara/ | Pääkaupungin jokihistoria ja kaupungin kohteet |
| P2 | https://www.bruneitourism.com/cultural-heritage/ | Royal Regalia Museum, vesikylän galleria, Malay Technology Museum, Kampong Ayer |

Etusivua https://www.bruneitourism.com/ käytettiin vain P1/P2-linkkien löytämiseen. P1 ja P2 eivät ole keskenään riippumattomia lähteitä. W1/W2:n ristiintuki ei yksin todista kahden riippumattoman lähteen lukusääntöä.

## 1. 1873-kehys

W1 History ja W2 History kuvaavat joen vesiasutusta 1800-luvulla ja maalle rakentamisen vahvistumista 1900-luvun alussa. Siksi vuoden 1873 kohdalla saa sanoa vesiasutuksen olleen olemassa ja pääkaupungin elämän painottuneen joelle. Ei tarkkaa talomäärää, ulkoasukuvausta eikä isoisän vierailua tai reittiä. Nykyinen Tasek Laman virkistyspuisto on W4 Historyn mukaan 1900-luvun lopun kehitystä; ei väitettä vanhan luonnonympäristön tarkasta vuoden 1873 ulkoasusta.

## 2. Perusfaktat ja rajaus

W1: Brunein pääkaupunki Brunei-joen rannalla; aiemmin Brunei Town/Bandar Brunei. Nykyinen nimi viittaa Omar Ali Saifuddien III:n Seri Begawan -arvonimeen. Tarkka nimenvaihdosvuosi jätetty pois, koska tässä koosteessa riippumatonta toista tarkistusta ei tehty. Kaupungin, metropolialueen, Brunei-Muaran ja vesikylän lukuja ei sekoiteta. C:ssä ei asukas- eikä pinta-alalukuja.

Kontekstin vesikylän kuvauksen ilmaus ”kymmeniä tuhansia” on auditointihuomio: W2:n vuoden 2016 vesikyläluku on 10 250, kun W1:n Culture käyttää noin 30 000:n lukua ilman samaa aikaleimaa. Ei lukujen yhdistämistä eikä uutta varmaa väestöväitettä; Sisältökirjurin arvio avoin. Kunnan kontekstin vuoden 2021 luku jää kontekstiin.

## 3. Artikkeli ja kahdeksan nostoa: väitepohja

| JSON-polku / juttu | Sallitut väitteet | Lähde |
|---|---|---|
| artikkeli.intro/teksti; kansi 1 | Vesiasutus edelsi nykyistä maalle rakennettua keskustaa; residenttihallinnon aikana hallinto ja kaupat siirtyivät rannalle; vesiasutus säilyi | W1 History, W2 History; P1 jokihistoria |
| artikkeli.teksti; kansi 2 | Vanha nimi, arvonimestä johdettu uusi nimi, vallasta luopuminen pojan hyväksi; vain 1900-luku | W1 Etymology |
| kansi 3; opas 4 | Kianggeh: ruoka/hedelmät/vihannekset; Gadong: ruokakojut, satay, roti john, hedelmät | W1 Economy; V1 Buy/Eat |
| kansi 4; opas 3 | Royal Regalia Museumin juhlaesineet, vaunut, aseet/kilvet ja lahjat | P2 Royal Regalia Museum; V1 See |
| historia 1; tiedot 1; kysymys 2 | Kävelysillat, moottoriveneet, kouluja/moskeijoita paaluilla; sähkö, vesijohto, puhelin/verkkoyhteyksiä | W2 Infrastructure; V1 See |
| historia 2; tiedot 2; minitehtävä | rumah belah bumbung: harjakatto; rumah tungkup: eri sivuilla kiertävä katto; rumah loteng: kaksikerroksinen ja ullakko kutomiseen, käsityöhön/varastoon | W2 Traditional houses; W3 Hall Number 1 vain talotyypit |
| historia 3; kysymys 5 | Kylien nimiä jokien, arvonimien ja ammattien mukaan; Kampong Pandai Besi ja sepät | W2 Etymology; W3 Hall Number 2 |
| historia 4; kysymys 4; opas 3 | Kota Batun museo: vesikylän talot ja tekniikat, kudonta, metallityö, veneenrakennus; myös sisämaan yhteisöjen välineet/asuminen | W3 Location/Exhibitions; P2 Malay Technology Museum |
| kysymys 1 | Brunein pääkaupunki | W1 johdanto; P1 |
| kysymys 3; tiedot 3 | Vanha kaupunginnimi ja nykyisen nimen arvonimiyhteys | W1 Etymology |

## 4. Opas

V1 Get in: Brunein kansainvälinen lentoasema ja BWN, taksikuljetukset. W1 Air vahvistaa kentän pääkaupunkipalvelun. Ei hintoja, matka-aikaa, etäisyyttä tai reittilupausta. V1 Get around: keskustan kävely ja vesitaksit. V1 See: vesikylän galleria, vierailukäytännöt, venematkojen esteettömyyden rajoite ja moskeijoiden ohjeet. V1 Buy/Eat: torit, käteinen ja ambuyat kaupungin ravintoloissa. W4 Activities: Tasek Laman kävely-, juoksu- ja metsäpolut. W1 Climate: trooppinen sateinen ilmasto, ilman kuukausilukuja. Reitti-/kuvauslupa-/sadevarustussuositukset ovat kirjoittajan käytännön ehdotuksia, eivät paikallisia sääntöväitteitä.

## 5. Kartta ja kohdejutut — partial 2/6

| Kohde | Oma WP-piste | Valintaperuste |
|---|---|---|
| Kampong Ayer | 4.88250, 114.94250 — W2 Coordinates | Historiallinen vesiasutuskokonaisuus, ei yksittäinen nykyarkkitehdin teos; kartan piste kuvaa kyläaluetta |
| Tasek Lama | 4.90292, 114.94512 — W4 Coordinates 4.9029172,114.9451222 pyöristetty viiteen desimaaliin | Virkistyspuiston alue; tyyppi luonto, ei padon, näkötornin tai muun rakennelman nimellä kiertämistä |

Rajaus pisteistä noin 300 m marginaalilla: N 4.906 / S 4.8795 / W 114.9395 / E 114.9482. Karttapisteitä ei ole lainattu kaupungilta tai naapurikohteelta. W4 Water infrastructure: padon yhteys kaupungin vedenhankintaan; tarkat vuodet ja mitat jätetty pois. Kampong Ayer -juttu nojaa W2 History/Infrastructureen, Tasek Lama -juttu W4 History/Activities/Water infrastructureen. Molempien kuvavalinta avoin.

## 6. Tarkat luvut, sää ja superlatiivit

C:ssä ei täsmällisiä rakennus-, nimenvaihdos-, etäisyys-, väestö- tai pinta-alalukuja. Vuosi 1873 on tilauksen yhteinen historiallinen viite, jonka suhde vesiasutukseen/nykyiseen puistoon on yllä perusteltu. Koordinaatit ovat ohjeen mukaisia paikkojen omia WP-pisteitä. ”Maailman suurin vesikylä” ja palatsin suuruus jätetty pois. `saatiedot:null`: olemassa olevaa saa.json:ia ei muutettu, 48/48 primäärivarmennusta ei ole tässä osoitettu.

## 7. Kuvat ja suojatut teokset

Ei B-kuvavalintaa. Kaikkien 20 kuvaroolin tiedosto, lyhyt, selite ja lahde ovat tyhjät. Ei Commons-hakuja eikä generointia. Kuvaputki tarvitsee 3 laajaa kansikuvaa, 8 nostokuvan aihetta, matkailijan pystykuvan, 5 opasjakson kuvaa, 2 kohdekuvaa ja matkakirjan kuvan. Modernit moskeijat, palatsi, museorakennukset, patsaat ja muistomerkit jätetty karttakohteista pois: tekijän kuolemasta 70 vuoden porttia ei ole osoitettu. Museon kokoelmasta kertominen tekstissä ei ole lupa kuvata sen nykyisiä teoksia.

## 8. Toiston rajaus ja minitehtävä

Kontekstissa ei ole Brunein maalehteä eikä lähinostoja. Kevyen pisteen paalutalojen, moskeijoiden ja puiston maininnat laajenevat arkisiin palveluihin, työmenetelmiin ja nimen historiaan. Minitehtävä koskee ullakon työtilaa; se ei toista mitään viidestä kaupungin kysymyksestä. Vastaus löytyy historian nostosta 2, mutta vastausselite on uudelleen muotoiltu.

## 9. Avoimet portit

A-karttaminimi partial; B kaikki kuvat; sääauditointi; D riippumaton faktantarkistus; E korjaukset; F pääsession verkkotarkistus ja toimitushyväksyntä. Ei pelikytkentää eikä julkaisua. Vesikylän vanhan asukasväitteen arvio Päätoimittajalle.
