# Antananarivo — rajattu A-lähdekooste C-luonnosta varten

Omistus: sessio 05, vain e08/antananarivo. Luettu 12.10.2026. Tämä on rajattu faktapohja, ei täyden A-portin eikä riippumattoman D-tarkistuksen hyväksyntä. Työjuuri on olemassa oleva NAS-klooni `sessio-72-20261011/e08`.

## 0. Lähteet ja hakutapa

Tavalliset sivut haettu yhteisellä `valiaikainen/sallittu_haku.py`-apurilla: robots ensin, redirectit uudelleen tarkistaen ja yhteinen yhden sekunnin hakuportti. Ei API-, Commons-, kuva- eikä PDF-hakuja. Tallenteet ovat `valiaikainen/nopea-e08-antananarivo/`-kansiossa, sisältö-SHA:t `SHA256SUMS.txt`:ssä ja hakutodisteet `robots-ja-haut.jsonl`:ssä.

- S1: [Antananarivo](https://en.wikipedia.org/wiki/Antananarivo), osiot Etymology; Kingdom of Imerina; Kingdom of Madagascar; French colonial period; Cityscape; Architecture; Culture; Transportation. Tallenne `city.html`, luettu `city.txt`.
- S2: [Antananarivo, Wikivoyage](https://en.wikivoyage.org/wiki/Antananarivo), osiot Climate; Get in; By train; Get around; Eat; Drink. Tallenne `voyage.html`, luettu `voyage.txt`. Ajantasaiset reitit ja palvelut tarkistetaan uudelleen ennen käyttöä; ei hintoja, aukioloaikoja tai nimettyjä ravintolasuosituksia tekstiin.
- S3: [Lake Anosy](https://en.wikipedia.org/wiki/Lake_Anosy), johdanto, rakentaminen ja koordinaattitaulu. Tallenne `lake.html`, luettu `lake.txt`.
- S4: [Ravinala Airports](https://www.ravinala-airports.aero/en/), lentoasemaoperaattorin oma sivu, osio Airport Operator of Antananarivo and Nosy Be. Tallenne `airport.html/txt`. Vahvistaa Antananarivon kansainvälisen lentoaseman; Ivato-nimi ja TNR tunnus S2:sta.
- S5: [Madagascar Tourism](https://madagascar-tourisme.com/en/), kansallisen matkailuorganisaation oma sivu ja sen Antananarivo-kohdesivu `https://madagascar-tourisme.com/en/discover/the-highlands/antananarivo/`. Jälkimmäisen käytettävät tiedot kirjattu C-muistioon lukemisen jälkeen.

## 1. Olemassa oleva aineisto ja rajaus

`konteksti.json` luettu. Madagaskarin maalehdellä ovat jo meritse saapunut kieli, aakkoset ja univormut, kolmen kuningattaren pääministeri, Rovan palo, saaren eläinten erikoisuudet, riisiaterian perusidea, romazava, vaniljan pölytys, koba, valiha, hira gasy, salegy ja kansalliset kirjallisuusaiheet. Niitä ei avata tämän kaupungin nostoina. Ambohimanga on olemassa oleva lähikohde, ei tämän kartan lisäkohde.

Uusi aineisto keskittyy torijärjestelyihin, asemarakennuksen käytön muutokseen, tunneleihin, nimien kirjoitusasuihin, rakentamisen materiaalikäsitykseen, asuintalon malliin, Andohalon aukion tehtävään ja kaupungin koulutukseen. Rova mainitaan vain kaupungin historiataustan tasolla; paloa tai pääministerin avioliittoja ei toisteta.

## 2. Ajallinen kehys ja luvut

Kaupunki oli Merinan pääkaupunki ennen siirtomaakautta. Anosy rakennettiin Radama I:n aikana 1800-luvun alkupuolella (S1 Kingdom of Madagascar, S3 rakentaminen); järvi oli siten olemassa isoisän matkavuoteen mennessä. Isoisän tekoja, reittiä, lainauksia tai järven tarkkaa silloista ulkoasua ei kirjoiteta. S1:n perustamisvuodet eroavat keskenään: käytetään pitkää historiaa ilman täsmällistä perustamisvuotta.

S1 sanoo rakennusmateriaalien ediktin vuodeksi 1867 mutta yhdistää sen Ranavalona II:een. Tätä täsmäyhdistelmää ei käytetä; Architecture-osio antaa 1860-luvun. C sanoo vain 1800-luvun jälkipuolisko. Myös radan ja toripaviljonkien vuosia vältetään. Perjantaitorin siirto ajoitetaan viime vuosisadan lopulle; tarkkaa 1997-vuotta ei julkaista.

Väestöluku jätetty pois. Kontekstin INSTAT-luku koskee Antananarivo Renivohitra -piiriä, eikä sitä saa vaihtaa Wikipedian kaupunki- tai metropolilukuun. Tarkkoja matkaetäisyyksiä, lämpö- tai sademääriä ei ole. Karttakoordinaatti on paikan oma lähdepiste, ei kertovassa tekstissä esitetty tilastoluku.

## 3. Tekstien väitepohja

| Sisältö | Lähde ja tarkistettu asia |
|---|---|
| Intro ja Lue lisää | S1 Cityscape, History, Architecture: ylä-, keski- ja alakaupunki, Analakely laaksossa, portaat, tunnelit, kuningaskunnan pääkaupunki, kivirakentamisen muutos, verannalliset tiilitalot; S2 Get around ja By train: kahvilat ja aseman liiketilat |
| Perjantai muutti osoitetta | S1 Cityscape: Zoma=perjantai, Andrianampoinimerinan toripäivä, valkoiset päivänvarjot, kauppiaiden siirto eri kaupunginosiin liikenteen ja turvallisuuden vuoksi, Analakelyn kauppapaviljongit |
| Asema, josta ei kannata päätellä aikataulua | S1 French colonial period ja Transportation: Soarano Avenue de l’Indépendancen päässä ja rata Toamasinaan; S2 By train: rakennuksen kauppakeskuskäyttö ja vähäinen/puuttuva matkustajaliikenne |
| Kukkulan voi myös läpäistä | S1 French colonial period ja Cityscape: tunnelit kukkuloiden läpi, Ambohijatovo–eteläiset alueet ja Anosyyn avautuva yhteys, päällystetyt kadut ja alakaupungin suunnittelu |
| Kolme nimeä samalle kaupungille | S1 johdanto, Etymology ja French colonial period: Tana, Tananarive ja Analamanga=sininen metsä. Nimen kirjaimellista tuhannen sotilaan selitystä ei käytetä |
| Kivi kuului aluksi vainajille | S1 Architecture: kasviaineista tehdyt talot, kivi hautakammioissa ja elävien/vainajien materiaalikäsitys; rajoitusten poistuminen 1800-luvun loppupuolella |
| Veranta kertoo vaikutteiden matkasta | S1 Kingdom of Madagascar ja Architecture: trano gasy, englanti-, kreoli- ja paikalliset vaikutteet, tiili ja puuveranta, mallin leviäminen keskiylängölle. Kerrosten tarkkaa lukua ei väitetä |
| Aukio oli julkinen puhujapaikka | S1 Kingdom of Imerina ja French colonial period: Andohalo portin ulkopuolella, Andriamasinavalona ja hallitsijoiden julkiset puheet; myöhemmät istutukset ja kävelyväylät |
| Koulut tulivat käsityöläisten mukana | S1 Kingdom of Madagascar: LMS:n käsityöläiset ja koulut, myöhempi opettajankoulutus ja lääketieteen opetus. Ei tarkkoja vuosia, oppilasmääriä tai ensimmäisyysväitteitä |
| Opas 1 | S2 Get in, By train, Get around; S4 lentoasemaoperaattori: lentoasema, ruuhkat, kuljetus, taksit ilman mittaria, bussit, junien erikseen tarkistettava saatavuus |
| Opas 2–3 | S1 Cityscape, Architecture, S3: Analakely, pääkatu, portaat, siirretty Zoma, rakennettu Anosy ja verannalliset talot |
| Opas 4 | S1 Cityscape Isorakan ravintolat ja majatalot; S2 Eat/Drink malagassi-, ranskalaisvaikutteinen ja kasvisruoka sekä pullotettu juomavesi. Ei maalehden ruokalajitarinoita |
| Opas 5 | S2 Climate: keskiylängön viileät illat ja kuiva/sateinen kausi; S3 jakarandat. Ei ilmastolukuja tai täsmällistä kukinta-ajankohtaa |
| Visa 1–5 | S1 pääkaupunki, torin siirto, trano gasy ja Andohalon puheet; S3 rakennettu järvi. Vastaukset esiintyvät muissa teksteissä |
| Tiedot 1–3 | S1 nimet ja tunnelit; S3 järven saaren sepäntyöpaja ja lähteen eksplisiittinen paloturvallisuusperuste |
| Minitehtävä | Materiaalien käytön muutos saman historia-sivun ensimmäisestä nostosta, eri asia kuin kaupungin viisi visakysymystä |

## 4. Kartta ja kohdejuttu — partial

Vain **Anosy-järvi**, tyyppi luonto. Oman Lake Anosy -artikkelin koordinaattitaulu: `-18.9152, 47.5216`, tallennetaan viiden desimaalin tarkkuudella `-18.91520, 47.52160`. Ei lainattu kaupungin pisteestä. Rajaus kattaa järven sekä marginaalin; kartan toteutus on myöhempi portti.

Jutun väitteet S3: suo, rakennettu järvi, Radama I:n aika, James Cameron, saari ja maayhteys, sepäntyöpaja ja palon leviämisen vaara, jakarandat. Vesivoima S1 Kingdom of Madagascar. Historiakehys on yleinen, ei täsmävuosi. Kartta on **1/6–8**, joten täysi karttaportti ei täyty.

Saaren muistomerkki ei ole kohde eikä kuva-aihe. Sen tekijäketjua ja kuolinvuosia ei selvitetty tähän rajattuun tehtävään, eikä sitä nimetä luontokohteeksi. Soarano, Andohalo ja muut rakennuspaikat jätetään kartalta, kunnes niiden omat WP/WD-pisteet ja teosrajat on varmennettu.

## 5. Kuvat, sää ja avoimet portit

Ei B-valintaa. Kaikissa 19 kuvaroolissa `tiedosto`, `lyhyt`, `selite`, `lahde` ovat tyhjät. Ei kuvahakuja, generointia, vanhojen kuvien lainaamista eikä keksittyjä asset-nimiä.

`saatiedot:null`, koska sääpoiminnan 48/48 primäärivarmennus on avoin. `saa.json` ei muutettu. Yleinen ilmastoteksti on S2:sta, ilman astelukuja, sademääriä tai kuukausinumeroita.

Avoinna: täysi A-kartta-/tekijävarmennus, kuvaputki ja B, sääauditointi, riippumaton D, mahdolliset E-korjaukset, F-kokonaisportti, toimituksellinen hyväksyntä, integrointi ja julkaisu. Paikallinen tekstiluonnos ei läpäise koko tarkistinta ennen kuvia.
