# Kingstown — rajattu A-faktapohja, tehtävä 19

Hakupäivä ja kirjoitus 12.10.2026. NAS-klooni e12. C-kirjoituksen rajattu lähdekooste, ei täyden A/B/D/E/F-putken hyväksyntä. Lähteet ja robots-todisteet omassa valiaikainen/nopea-e12-kingstown/-kansiossa. Tavalliset robots-sallitut sivut, yhteinen sallittu_haku.py ja globaali hakulukko. Ei estettyjä API-polkuja tai PDF-kiertoa.

## 0. Luetut lähteet ja 1873-kehys

Onnistuneet HTML/tekstit tallennettu omalla tunnisteella; kaikki hakupäivä 12.10.2026:

- K1: en-Wikipedia, [Kingstown](https://en.wikipedia.org/wiki/Kingstown), johdanto, History, Geography/Topography, infobox lempinimi. Tallenne kingstown-wp. Nykypolitiikan kohdat pois.
- K2: en-Wikivoyage, [Kingstown](https://en.wikivoyage.org/wiki/Kingstown), Get in, Get around, See, Eat. Tallenne kingstown-voy. Ei vanhoja hintoja, aukioloaikoja, lentoyhtiö-/ravintolalistoja tai yksittäisten toimijoiden laatulupauksia.
- K3: en-Wikipedia, [Saint Vincent and the Grenadines Botanic Gardens](https://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines_Botanic_Gardens), History (Botanical beginnings, Plant acquisition and cultivation), nykyinen lintutarha, oma koordinaatti. Tallenne garden-proper-wp.
- K4: en-Wikipedia, [Fort Charlotte, Saint Vincent](https://en.wikipedia.org/wiki/Fort_Charlotte,_Saint_Vincent), Origins, Recent history, Lighthouse, oma koordinaatti. Tallenne fort-wp.
- K5: en-Wikipedia, [William Bligh](https://en.wikipedia.org/wiki/William_Bligh), First breadfruit voyage ja Second breadfruit voyage. Tallenne bligh-wp. Ei henkilön ihannointia tai väkivallan kuvauksia.
- K6: en-Wikipedia, [Saint Vincent amazon](https://en.wikipedia.org/wiki/Saint_Vincent_amazon), Range ja Conservation. Tallenne parrot-wp.
- K7: en-Wikipedia, [Argyle International Airport](https://en.wikipedia.org/wiki/Argyle_International_Airport), johdanto, infobox IATA ja aiemman kentän korvaaminen. Tallenne argyle-wp. Ei lentoja, matkustajamääriä, kustannuksia, etäisyyksiä tai politiikkaa.
- K8: SVG National Parks, Rivers and Beaches Authority, [The Botanical Gardens](https://nationalparks.gov.vc/nationalparks/index.php/heritage/16-heritage-and-culture/8-the-botanical-gardens/). Tallenne npa-gardens. Puutarhan perustaminen, papukaijan suojelu, alueen säännöt. Hinta ja aukiololupaus pois.
- K9: sama viranomainen, [Home](https://nationalparks.gov.vc/nationalparks/). Tallenne nationalparks-official. Tunnistaa viranomaisen ja puutarhan oman kohdesivun; ei käytetä yleistä mainostekstiä kaupunkifaktana.
- K10: [SVG Airports](https://www.svg-airport.com/). Tallenne airport-official. Sivun luettava teksti vain Argyle International · SVD; tätä käytetään nimen/koodin tukena, ei yksityiskohtaisen matkaoppaan lähteenä.

1873: kaupunki perustettu 1700-luvulla (K1). Puutarha perustettu samalla vuosisadalla (K3+K8), siis oli olemassa 1873. Puutarha rapautui 1800-luvun puolivälin tienoilla ja sen elvytys alkoi vasta myöhemmin vuosisadan loppupuolella (K3); ei väitetä sen kukoistaneen isoisän matkavuonna. Fort Charlotte valmistui 1800-luvun alussa (K4), joten oli olemassa 1873. Ei keksittyjä isoisän käyntejä, reittejä, tekoja tai sitaatteja.

## 1. Perusfaktat

- Saint Vincentin ja Grenadiinien pääkaupunki Saint Vincentin pääsaarella, satama ja kauppakeskus (K1+K2).
- Jyrkät kukkulat ympäröivät kaupunkia (K1 Geography/Topography). Kapeat kadut, 1800-luvun kivirakennukset ja kirkot: nykyinen konteksti.json / kevytSisalto; ei uusien rakennusten arvattua historiaa.
- Lempinimi City of Arches, kaarien kaupunki (K1 infobox). Ei kaariaukkojen lukumäärää, tarkkaa kohdelistaa tai lähteetöntä synnyttämisselitystä. Suora käännös ja kaupunkikävelyn huomio.
- Nykyinen lentokenttä Argyle International Airport, SVD (K2+K7+K10). E. T. Joshua entinen, ei saapumisohjeeksi.
- Väestö C-tekstissä pois. Kontekstin 10 690 / 2023 koskee Kingstownin piirin kotitalousväestöä, 26 395 taajamaa; ei piirin lukua kaupungin väkiluvuksi. K1:n vanha eri vuosi/luku pois.

## 2. Kansi: neljä erillistä nostoaihetta

1. Kaarien kaupunki: lempinimi, pääkaupunki ja kaupallinen toiminta, keskustan/kukkuloiden/sataman sijainti (K1, konteksti). wiki Kingstown.
2. Kyyti alkaa H-kirjaimella: yksityiset pikkubussit, H-kilpi = for hire, mäkinen maasto, taksit/autot (K2 Get around). Ei hintaa, vauhtivitsiä tai vaarallisuuden leimaamista. wiki Kingstown.
3. Tulipalon jälkeen vesijohto: suuren 1800-luvun tulipalon jälkeiset vedenjakelusuunnitelmat, valmistuminen myöhemmin samalla vuosisadalla (K1 History). Vain tapahtumien järjestys, ei lähteetöntä palosta johdettua syyteoriaa; tarkat vuodet pois.
4. Sataman linnake katsoi sisämaahan: Fort Charlotte lännessä kukkulalla, tykit sisämaahan, varautuminen muualta rannikolta maitse tulevaan hyökkäykseen, viadukti ja redutti (K4 Origins). Lähde sanoo puolustuksen syyn; neutraali siirtomaahistoria, ei sankarikehystä tai nykykonfliktia. wiki Fort_Charlotte,_Saint_Vincent.

## 3. Teema: luonto — Kasvien merimatkat

1. Puutarha lääkkeitä ja ruokaa varten: Robert Melville ja sotilaslääkäri George Young, ravinto-/lääke-/kauppakasvit, kokeilu paikallisissa oloissa, myöhemmin kaakao, puuvilla, sokeriruoko ja nuolijuuri (K3 History). Tarkat vuodet/superlatiivit pois.
2. Bounty ei tuonut leipäpuita perille: Blighin Tahiti/Bounty-tehtävä, kapina, uusi Providence-matka, Kingstowniin päätyneet kasvit ja Alexander Andersonin hoito (K3+K5). Alkuperäisen leipäpuun kloonijälkeläinen nykykokoelmassa (K3). Ei vuosia, taimimäärää tai epätarkkaa "siemenet"-sanaa (K1 sanoo seed, K3 kertoo kasvit/klooni; käytetään kasveja).
3. Kaneli kulki saarien välillä: ranskalaisten kasvitieteilijöiden kasvivaihto Martiniquelta, Guadeloupelta ja Cayennesta; Guadeloupen kaneli; Kiinan siemenet Kew’n kautta ja Aasian kasvit (K3 Plant acquisition and cultivation/History). Ei määrällisiä kasvitilastoja.
4. Kasvien keskellä kasvatetaan lintua: kansallislintu Amazona guildingii, luontaisesti Saint Vincentin saarella, lintutarhan kasvatus-/suojeluohjelma (K3+K6+K8). Ei nykyistä uhanalaisuusluokkaa, yksilömäärää tai väriä ilman kuvan katselua.

Minitehtävä: kanelin lähtösaari Guadeloupe; vastaus saman sivun kasvinsiirtojen nostossa. Ei toista kysymysten maata, Providencea, tykkien suuntaa, eläinryhmää tai lentoasemaa. Faktavastaus omin sanoin.

## 4. Opas

1. Perille ja liikkeelle: Argyle/SVD ja maayhteys pääkaupunkiin (K2+K7+K10), H-kilvet, pikkubussit, taksit ja mäkisyys (K2). Ei täsmäminuutteja/kilometrejä.
2. Kaarien keskustassa: lempinimi (K1), kirkot/kivirakennukset nykyinen konteksti. Ei keskustan modernien taideteosten kuvausta tai kirkon sisätaiteen kohdistamista kuviin.
3. Puutarha ja kukkula: puutarha pohjoisella laidalla (K2/K3 koordinaatti), lintutarha (K3+K6+K8), Fort Charlotte lännen kukkulalla (K4). Käyntimahdollisuus tarkistettava; ei avattuna julistamista.
4. Ruoka: keskustassa lähteessä mainittu roti, keitot, kasvisruoka ja mehut (K2 Eat). Piirakka/herneateria oli toimijan historiatieto, poistettu nykyisestä ruokaohjeesta. Ei ravintolannimiä, hintaa tai aukioloaikaa.
5. Milloin: saapumis-/jatkomatkan sovitus, ulkokohteiden ennuste, jyrkät kukkulat. Ei sääaseman lukuja tai kuukausisuositusta.

Parasta 5: keskusta, puutarha, linnoitusnäkymä, lintutarha, ruoka. Hyvä tietää 3: Argyle, mäkisyys, puutarhan säännöt. K8 kieltää alkoholin, tupakoinnin ja lasipullot puutarhassa.

Ei varmennettua poikkeavaa UM-havaintoa; ei turvalliseksi julistamista eikä keksittyä rajoitusta.

## 5. Kohdekartta — partial 2/6–8

Kohteen omat Wikipedia-koordinaatit, pyöristetty 5 desimaaliin:

| Nimi | Tyyppi | lat | lon | Lähde ja aika |
|---|---|---:|---:|---|
| Kingstownin kasvitieteellinen puutarha | luonto | 13.16583 | -61.22708 | K3 oma koordinaatti; puutarha 1700-luvulta (K3+K8). |
| Fort Charlotte | rakennus | 13.15790 | -61.24210 | K4 oma koordinaatti; linnoitus 1800-luvun alusta. |

Rajaus kattaa puutarhan ja lännen linnakkeen noin 300 m marginaalilla. Kaupunkipistettä ei lainattu kummallekaan. K2:n puutarhapiste on epätarkempi/eri kuin K3:n oma WP-piste: käytössä K3, ei Wikivoyagen karttapiste.

Puutarha on aito kasvikokoelman luontokohde: moderni temppelirakennus, taideteokset ja muistomerkit eivät ole kohde tai kuvatilaus. Fort Charlotte on historiallinen linnoitus; moderni Garifuna-historiaa esittävä seinämaalaussarja ja museon taideteokset pois kuvista. Kirkoille ei lisätty pisteitä eikä oikeusauditointia arvattu. Puuttuvat 4–6 kohdetta avoimia.

## 6. Kysymykset ja tiedot

5 kysymystä: pääkaupungin maa K1; Providence K3+K5; Fort Charlotten tykkien suunta K4; puutarhan papukaija K3+K6+K8; Argyle K2+K7+K10. Tasot 1/2/3. Vastausten aiheet esiintyvät kirjoitetuissa teksteissä.

3 tietoa: leipäpuun kloonijälkeläinen K3; linnakkeen nimi kuningatar Charlottesta K4; Saint Vincentin Kingstown ja Jamaikan Kingston eri paikkoja K1:n täsmennys/Not to be confused.

## 7. Kuvatarpeet

20 roolia: kansi 3 (keskusta/kaariaukot laajana ympäristönä, satama, kukkulanäkymä), nostot 8, matkailijalle 1 pysty, opas 5, kohdejutut 2, valokuva 1. Kaikkien tiedosto/lyhyt/selite/lahde tyhjät. Ei kuvahakuja, Commons-valintoja, generointia tai tiedostonimien arvausta. Lopulliset kuvatekstit vasta valitun kuvan katselun jälkeen.

## 8. Epävarmat, ristiriidat ja haun rajat

- Puutarhan ensimmäinen arvattu en-Wikipedia-otsikko Botanical_Gardens_St._Vincent palautti 404. Oikea artikkeli löytyi K1:n linkistä (K3); 404 ei todiste.
- Vanha DiscoverSVG:n Kingstown-linkki ohjasi yleiselle kotisivulle. Kotisivu ei ole kaupungin oma historia-artikkeli, eikä sitä käytetä nostoihin tai vanhan sivun sisällön rekonstruktiona.
- Botanicalgarden.gov.vc/botanicalgarden/ palautti 404; K3:n linkin botanicalgardens.gov.vc ei nimipalvelussa löytynyt. Sisältöä ei käytetä. NPA:n oma puutarhasivu K8 löytyi toimivan viranomaisportaalin linkistä.
- SVG Airportsin kotisivu luettavissa vain hyvin suppeana; K10 tukee kentän nimeä/koodia, käytännön tiedot K2/K7:stä. Lentoliikenteen ajantasainen riippumaton tarkistus D/E/F:ssä.
- Puutarhan ja linnakkeen tarkat rakennusvuodet pois C-tekstistä; käytetään vuosisatoja. Suurten kasvimäärien, leipäpuutaimien ja kaupunkiväestön tarkat luvut pois.
- Sää 48/48 primäärivarmennus avoin, saatiedot null, saa.json koskematon.

## 9. Poisjätöt

Ei maan La Soufrière -purkauskertomusta, banaanitalouden yleiskatsausta tai itsenäistymistä omiksi nostoiksi. Puutarhaa ja linnaketta syvennetään kevyen pisteen kohdelistaa pidemmälle. Ei nykyvaaleja, suunniteltua kaupungin nimenvaihdosta, politiikkaa tai nykyrikollisuutta. Ei suojattuja taideteoksia kohteina/kuvina. Ei Git-, peli- tai julkaisumuutoksia.
