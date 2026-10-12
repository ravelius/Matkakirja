# Naypyidaw — rajattu A-lähdekooste C:tä varten

Luettu 12.10.2026, oma NAS-klooni sessio-72-20261011/e10. Omistus vain e10/naypyidaw. Herkkä kaupunki: C kirjoitettu vasta kun male/vientiane/phnompenh/kualalumpur/bandarseribegawan olivat kaikki tuottaneet sisalto.json:n, C-muistion ja tilatut tekstiosiot; passed true -todiste omassa väliaineistossa. Kuvat ja D/E/F eivät ole tämän järjestysportin ehtoja.

## 0. Lähteet ja hakutapa

Robots ensin, redirectit ja globaali yhden sekunnin haku yhteisellä `sallittu_haku.py`:llä. Tavalliset Wiki-sivut, ei estettyjä API-/raw-polkuja. Tallennetut HTML:t/tekstiotteet ja todisteet `valiaikainen/nopea-e10-naypyidaw/`. Mahdollisia failed-haun tuloksia ei käytetä lähdetodisteena.

| Tunnus | Lähde | Käytettävät osiot |
|---|---|---|
| W1 | https://en.wikipedia.org/wiki/Naypyidaw | Johdanto; Etymology; History vain perustaminen ja Pyinmanan aiempi asutus, ei siirron poliittisia motiiveja; Geography; Climate vain laadullisesti; Cityscape ei hallinto-/sotilasrakennuksia; Transport; Recreation; Shopping |
| W2 | https://en.wikipedia.org/wiki/National_Museum_(Naypyidaw) → HTML:n otsikko National Museum of Myanmar (Naypyidaw) | Exhibitions: primates/fossils, prehistoric, protohistoric; museon nykyisten teosten nimiä ja replikoita ei kartta-/kuvakohteiksi |
| W3 | https://en.wikipedia.org/wiki/National_Herbal_Park | Johdanto ja oma koordinaatti; kasveja maan eri alueista, perinteiseen käyttöön liittyvä kasvikokoelma ja suojelutarkoitus; ei lääkinnällisiä teholupauksia |
| V1 | https://en.wikivoyage.org/wiki/Naypyidaw | Get in/Get around, See, Buy/Eat; ei hintoja eikä aukioloaikoja, ei vanhojen yhteyksien toimivuuslupauksia |
| P1 | https://um.fi/matkustustiedote/-/c/MM | Turvallisuustaso: vältä kaikkea matkustamista; oppaaseen vain yleinen turvallisuusvaraus ilman politiikkaa tai tapahtumakuvauksia |
| P2 | https://whc.unesco.org/en/list/1444/ | Pyu Ancient Cities: Halin, Beikthano, Sri Ksetra; vanha kaupunkikulttuuri. Haku onnistui; Description ja Outstanding Universal Value luettu |
| P3 | https://mdn.gov.mm/en/revamped-nay-pyi-taw-national-museum-reopens-public | 12.3.2026 julkaistu tieto museon joidenkin salien uudelleenavauksesta maanjäristyskorjausten jälkeen; ei hintoja eikä aukioloaikoja C:hen |

P3 haettu onnistuneesti robots-tarkistuksen jälkeen. Se vahvistaa museon osittaista uudelleenavausta; ei lokakuun vierailutilanteen lupausta. www.myanmar.gov.mm:n robots-haussa SSL-varmennevirhe: ei sivuhakua eikä sen hakutulosotteen käyttöä. Väärä UM-osoite /myanmar-matkustustiedote palautti 404, eikä sitä käytetä.

## 1. 1873-kehys

W1 History: nykyinen suunniteltu pääkaupunki rakennettiin vasta 2000-luvulla. Sitä ei ollut isoisän matkavuonna 1873. Pyinmana on seudun vanhempi asutus; ei väitettä isoisän matkasta sinne eikä vanhojen kylien olleen tyhjiä. National Herbal Park kuuluu uuden kaupungin aikaan (W3), joten nykyinen kasvipuisto ei ollut olemassa vuonna 1873.

## 2. Perusfaktat, laajuus ja herkkyys

W1: Myanmarin hallinnollinen pääkaupunki keskisessä Myanmarissa, Bago Yoman ja Shan Yoman välisellä alueella. Naypyidaw/Nay Pyi Taw -nimen merkitys liittyy kuninkaalliseen asuinpaikkaan tai pääkaupunkiin. Kaupunki ja Naypyidawin liittoalue eivät ole sama tilastollinen kohde. Kontekstin 1 129 322 (2024) koskee liittoaluetta; sitä ei kirjoiteta kaupungin asukasluvuksi. C:ssä ei pinta-ala-, väestö-, rakennus-, katu-, laji- tai etäisyyslukuja. Tarkka perustamis-/siirtovuosi yleistetään 2000-luvuksi.

Ei nyky-/juntta-/konfliktipolitiikkaa, pääkaupungin siirron motiiviarvauksia, hallinto-/sotilaskohteita, kuningaspatsaita, suojattua Uppatasanti-pagodia eikä valoesitystä. Hallinnollinen pääkaupunkiasema on neutraali tosiasia. Luonnonkatastrofin museovauriot voi kirjata toimitukselliseen epävarmuusosioon ilman tapahtumalukuja, mutta nykyisten vierailuolosuhteiden väittäminen vaatii tuoreen vahvistuksen.

## 3. Artikkelin ja nostojen väitepohja

Kannen aiheet: (1) alueittain järjestetty kaupunki, hotellialue erillään; (2) vanhaa kuninkaallista sanastoa säilyttävä nimi; (3) Pyinmana ennen uutta pääkaupunkia; (4) rautatie ja uusi keskusasema, aiemmin Pyinmana/Lewe. Lähde W1 Etymology, History, Cityscape/Hotel zone, Railways. V1 vahvistaa suuria etäisyyksiä ja liikkumisen ennakkosuunnittelua. Ei kadun kaistamääriä, kattovärin ammattiluokkia tai kaupungin syitä.

Teemasivu `tiede`: (1) National Herbal Parkin kokoelma ja kasvien säilyttäminen W3; (2) kansallismuseon Pondaung-fossiilit ja kivettyneet kasvit W2 Primates/Fossils, ei sitaatiton ihmisalkuperän superlatiivi; (3) esihistorian työkalut ja kaivausmallit W2 Prehistoric; (4) Pyu-kaupunkien rakennusosat/pienoismallit W2 Protohistoric, kaupungit ja vanha kaupunkikulttuuri P2. Museo sijaitsee Naypyidawissa; fossiilit ja muinaiskaupungit tulevat muualta Myanmarista, eikä niitä esitetä paikallisina löydöksinä.

## 4. Opas ja kysymysaiheet

Opas 5 jaksoa: perille/liikkuminen (kenttä/rautatie/bussit V1, nykyyhteydet tarkistettava); kaupungin alueet ja etäisyydet W1/V1; museot/kasvipuisto W2/W3, vierailutilanne avoin; syöminen ostoskeskusten/hotellien ravintoloissa V1 Buy/Sleep; trooppinen ilmasto, märkä ja kuiva jakso W1 Climate ilman tarkkoja kuukausi- tai mittauslukuja. Turvallisuusvaraus P1. Ruokajaksossa ei toisteta Myanmarin maalehden fermentoitua teetä, lokerolautasta, kalatahnaa tai vuoristonuudeleita.

Kysymykset: Myanmarin pääkaupunki; nimen merkitys; suunnitellun kaupungin ikä 2000-luku; kasvikokoelman luonne; museon fossiililöytöjen Pondaung-tausta. Tiedot: nimen vanha käyttö; liittoalueen ja kaupungin ero; kasvipuiston alueellinen kokoelma. Minitehtävä kysyy, mitä materiaalia esihistorian näyttelyn työkalut edustavat (kivi/pronssi/rauta), ei fossiileja tai kasvipuistoa. Vastaus löytyy samalta tiedesivulta, teksti muotoillaan uudelleen.

## 5. Kartta — partial 1/6

National Herbal Park: W3 oma koordinaatti 19.7495194,96.1079306 → viisi desimaalia 19.74952,96.10793. Paikka on kasvikokoelma/puisto, `tyyppi:luonto`; ei porttirakennusta, patsasta, keinotekoista vesiesitystä tai pagoditaitoa luontanimen takana. Rajaus tehdään tästä varmennetusta pisteestä noin 300 metrin marginaalilla. Juttu kertoo kokoelman luonteesta ja 1873-kehyksestä; tarkkoja kasvimääriä ei julkaista yhdestä lähteestä.

Muut pisteet avoinna. Ngalaikin ja Yezinin järvet ovat patojen yhteydessä: niitä ei nimetä luontokohteiksi suojatun rakennelman kuvaamisen kiertämiseksi. Museon, rautatieaseman, pagodin ja modernien rakennusten tekijän kuolemasta 70 vuotta ei ole osoitettu. Ei pisteitä lainaksi kaupungilta tai toiselta kohteelta.

## 6. Sää

`saatiedot:null`. Ei saa.json-numeroiden muutoksia eikä erillistä sääpoimintaa. 48/48 primäärivarmennus avoinna. Opas vain laadullinen trooppisen märän/kuivan jakson ero, ilman kalenterikuukausia tai lukuja.

## 7. Kuvat

B puuttuu, kaikki kuvaroolien tiedosto/lyhyt/selite/lahde tyhjiksi. Ei kuvahakua, generointia eikä Commons-nimitiedostojen keksimistä. Suojattu moderni arkkitehtuuri ja museon nykyiset replika-/pienoismalliteokset eivät ole kuva-aiheita ilman oikeusporttia. Luonnonkasvit ja alkuperäiset vanhat työkalut/fossiilit mahdollisia aihekategorioita, myöhemmän kuvaputken tunnistuksen ja oikeusvalinnan jälkeen.

## 8. Maalehden toistot

Kontekstissa Myanmarin maalehti käsittelee delfiinejä, Popaa, järvitarinaa, teakpuuta, teeruokaa, lakkatyötä, samettikuvia, harppua, orkesteria, nukketeatteria, kirjoitusmateriaaleja ja kirjallisuutta. Näitä tarinoita ei siirretä tähän lehteen. Pyu-aihe kertoo museon kaupunkimalleista, ei maalehden kadonneen kielen kivitarinaa. Fossiilit, kasvikokoelma ja esihistorian työvälineet ovat erillisiä näkökulmia.

## 9. Avoimet portit

Järjestysportti täytetty ennen C:tä; A karttaminimi partial; B kuvat; sää; D/E/F; toimituksellinen tarkistus; pelikytkentä ja julkaisu. Museon lokakuun ajantasaiset vierailutiedot avoinna; P3 vahvistaa vain aiemman osittaisen uudelleenavauksen. Mahdollisia lisälähteitä arvioidaan erikseen, eikä uuden tarkkuuden puutetta täytetä arvauksilla.
