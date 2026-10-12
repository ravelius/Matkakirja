# San José — rajattu A-lähdekooste, 12.10.2026

C-tekstityön lähdepohja, ei täysi A/B/D/F-hyväksyntä. Oma kaupunki `e11/sanjose`, maa CRI. Luettu konteksti.json ja ohjeiden A/C/13/LISÄSÄÄNTÖ, lehtityöresepti, kaupunkilehden mitat/kuvat/toistuvat viat sekä Pohjois-Amerikan sisältöspec. Pelitiedostoihin ei koskettu.

## 0. Lähteet ja todisteet

Kaikki alla mainitut sisällöt haettu 12.10.2026 robots-sallitun `sallittu_haku.py`-apurin kautta. HTML, tekstipoiminnat, URL/HTTP/SHA-manifesti ja robots-todisteet: NAS-juuren `valiaikainen/nopea-e11-sanjose/`. Verkkohaku käytti yhteistä lukkoa ja vähintään sekunnin pyyntöväliä. Ei rajapinta-, kuva- eikä PDF-hakuja.

- S1: [San José, Costa Rica](https://en.wikipedia.org/wiki/San_Jos%C3%A9,_Costa_Rica), johdanto, History, Museums, Parks, Transport/Airports, Cuisine. `kaupunki.html/txt`.
- S2: [National Theatre of Costa Rica](https://en.wikipedia.org/wiki/National_Theatre_of_Costa_Rica), johdanto, History, Current theatre use. `teatteri.html/txt`.
- S3: [Museo Nacional de Costa Rica](https://en.wikipedia.org/wiki/Museo_Nacional_de_Costa_Rica), johdanto ja Gallery. `museo.html/txt`.
- S4: [San José Central Market](https://en.wikipedia.org/wiki/San_Jos%C3%A9_Central_Market), johdanto. `tori.html/txt`.
- S5: [Pre-Columbian Gold Museum](https://en.wikipedia.org/wiki/Pre-Columbian_Gold_Museum), johdanto ja Gold collection. `kulta.html/txt`.
- S6: [Rail transport in Costa Rica](https://en.wikipedia.org/wiki/Rail_transport_in_Costa_Rica), johdanto, History, Current status, Interurbano Line. `juna.html/txt`.
- S7: [San José (Costa Rica), Wikivoyage](https://en.wikivoyage.org/wiki/San_Jos%C3%A9_(Costa_Rica)), Understand/Climate, Get in, Get around, See, Eat. `opas.html/txt`. Ei hinnastoja tai aikatauluja tekstiin.
- S8: [Barrio Amón](https://es.wikipedia.org/wiki/Barrio_Am%C3%B3n), Historia, Arquitectura. `amon-es.html/txt`.
- S9: [Edificio Metálico](https://es.wikipedia.org/wiki/Edificio_Met%C3%A1lico), johdanto/infobox. Haettu sallitusta aliasosoitteesta `/wiki/Escuela_Buenaventura_Corrales`; vastaanotettu sivu on Edificio Metálico. `metallikoulu-es.html/txt`.
- P1: [Costa Rican matkailuorganisaatio, Central Valley](https://www.visitcostarica.com/where-to-go/central-valley), yleisesittely ja kohta 1 San José. `matkailu.html/txt`. Alkuperäisen URL:n HTTP-ohjaukset tarkistettu apurilla.
- P2: [Teatro Nacionalin oma sivusto](https://www.teatronacional.go.cr/), etusivun ohjelmatarjonta ja Planee su visita. `teatteri-oma.html/txt`. Vahvistaa nykyisen esitys-/vierailutoiminnan, ei käytetty historiallisten lukujen tukena.

## 1. 1873-kehys ja tarkkojen vuosien käsittely

S1 sijoittaa pääkaupunkiaseman alun 1800-luvun alkupuolelle. S2 ja P1 sijoittavat nykyisen kansallisteatterin valmistumisen 1800-luvun lopulle: 1873 San José oli jo pääkaupunki, mutta nykyinen kansallisteatteri ei vielä ollut avannut oviaan. S4:n keskuskauppahallin perustamisajankohta on myöhempi kuin 1873; kirjoitettu vain 1800-luvun loppupuoli, ei lähteen tarkkaa perustamisvuotta. Ei isoisän toimia, reittiä, päiväkirjaääntä tai lainauksia.

Kaikki tarkat historialliset vuodet ja määrät jätetty pois C:stä. Ainoat tekstin vuosiluvut 1873 ovat pelin kiinteä vertailuvuosi. Koordinaatit ovat kaupungin kontekstista; kohdepisteitä ei arvattu.

## 2. Perusfaktat ja artikkelin väitteet

- San José = Costa Rican pääkaupunki Keskilaaksossa; nimi viittaa Joosefiin (S1 johdanto/History). Asutus kasvoi kappelin yhteyteen 1700-luvulla; tupakkatehdas ja viljelmien pääoma vahvistivat taloutta (S1 History).
- Kahvitalouden aikakausi, Barrio Amón ja kansallisteatteri kytkeytyvät kaupungin kehitykseen (S1 History, S8 Historia, S2 History).
- Mercado Central on kokonaisen korttelin kattava kauppahalli, jossa kapeita käytäviä, liha/kala/kasvikset/kahvi/kukat/satulat/käsityöt sekä sodas-ruokapaikkoja (S4 johdanto; soda ja ateriat myös S1 Cuisine).
- Kultamuseo on aukion alla; kansallismuseo vanhassa kasarmissa (S5 johdanto, S3 johdanto). Näitä ei käsitellä saman museon kokoelmina.
- Väestölukuja tai pinta-aloja ei C:ssä. Kontekstin 352381 / 2022 tarkoittaa San Josén kantonia, ei metropolialuetta; ei kopioitu lukijan tekstiin.

## 3. Kansi — neljä erillistä nostoa

1. Joosefin kylästä pääkaupungiksi: S1 History; kappeli, seurakunnan pyhimys, tupakkatalous, pääkaupunkiasema. Ei tarkkaa perustamisvuotta.
2. Tori on kokonainen kortteli: S4 johdanto ja S1 Cuisine; kokonainen kortteli, kapeat käytävät, tuotteet ja sodas. Ei myymälä-/kävijämääriä eikä superlatiivia.
3. Kahvikauppa näkyy taloissa: S8 Historia/Arquitectura; ranskalainen Amón Fasileau-Duplantier, alueen kehitys, uusklassiset/viktoriaaniset julkisivut, sisällä usein vanha siirtomaa-ajan huonejärjestys. Kahvin vauraus myös S1 History. Noston wiki-avaimena toimiva en-sivu San José, Costa Rica on laajempi lukulinkki; yksityiskohtien lähde on S8, ei englanninkielinen Barrio Amón -sivu, joka palautti 404.
4. Juna ylittää kaupunginrajoja: S6 johdanto/History/Current status/Interurbano Line ja S7 By train. Keskilaakson lähijunat, vanhat rannikkoihin ulottuvat ratayhteydet, ratojen kunnostaminen, katua pitkin kulkevat junat. Ei väitettä nykyisestä koko maan läpiajettavasta ratayhteydestä.

## 4. Teemasivu — rakennusten muuttuva tehtävä

1. Koulu tuli Belgiasta: S9; koulun metalliosat valmistettiin Belgiassa, kuljetettiin laivalla ja koottiin Costa Ricassa, 1800-luvun loppu. Arkkitehti Charles Thirionin elinaikaa ei tutkittu: koulu ei karttakohde tai kuvavalinta. Wiki-lukulinkki laajempi en-San José, Costa Rica; visan lähde täsmällinen es-Edificio Metálico.
2. Kahvi muuttui näyttämöksi: S2 History; rahoitukseen kahvin vientivero, Aleardo Villan kahvi-/banaaniallegoria, nykyiset esitykset S2 Current theatre use/P2. Ei rakennuksen veistosaiheita kuvaputkelle.
3. Kasarmi vaihtoi tehtävää: S3 johdanto/Gallery; sotilasrakennus 1900-luvun alusta, museokäyttö myöhemmin samalla vuosisadalla, esikolumbiaanisia esineitä ja historia-aineistoa. Ei tuoretta politiikkaa, armeijan lakkautusjuttua tai konfliktin yksityiskohtia.
4. Aukion alla on kultaa: S5 johdanto/Gold collection; Plaza de la Cultura, keskuspankin hallinnoima museo, eläin-/ihmisfiguureja, vallan tunnus ja metallityö. Ei kokoelman tarkkoja määriä tai ajoitusväliä.

## 5. Oppaan väitteet

Perille/liikkeelle: Juan Santamaría Alajuelassa, bussit/taksit, eri bussiterminaalit, käveltävä keskusta, lähijunat (S1 Airports, S7 Get in/Get around). Ei matka-aikaa, etäisyyttä, hintaa tai ajantasaista reittilupausta.

Teatteri/kultamuseo: S2/S5/S7 See/P2. Barrio Amón/kansallismuseo/La Sabana: S8/S3/S1 Parks/S7 See. Tapahtuma-/käyntiajat tarkistettava kohteesta.

Ruoka: S1 Cuisine ja S4; gallo pinto = riisiä ja mustia papuja, tavallisesti aamiainen; casado = riisiä, papuja, lihaa ja lisukkeita; sana tarkoittaa naimisissa olevaa; kahvia torilla. Ei casadon alkuperälegendaa.

Milloin: vain laadullinen kuivempi/sateisempi kausi S1 Climate/S7 Climate sekä viileät illat S7 Climate. Ei lämpötiloja, kuukausia tai sademääriä. Sääaseman numerodata erillinen avoin portti.

## 6. Kartta ja kohdejutut — partial

Kohteita 0, rajat tyhjät, nahtavyydet {}. S3/S4/S9 sisältävät omia kohdekoordinaatteja, mutta täysi teos-/arkkitehtioikeuksien auditointi ei valmis; pisteiden olemassaolo ei yksin täytä porttia. Ei kaupungin koordinaatin lainaamista nähtävyydelle. Ei suojattua rakennusta luontopisteeksi. Historiallisen keskustan esittelytekstin pohja S1/S4/S5/S8. Kartan vähintään kuuden kohteen ja kohdejuttujen portit avoimet; ei väitettä, että San José olisi pieni pääkaupunki, joka oikeuttaisi pysyvän poikkeuksen.

## 7. Visa, minitehtävä ja tiedot

Visat lähteineen: maa S1; soda S4/S1; metallikoulun valmistusmaa S9; teatterin kahvivientivero S2; kultamuseon sijainti S5. Tasot 1/2/3 mukana, oikea 0. Vihjeet eivät kerro vastausvaihtoehtoa suoraan.

Minitehtävä = entinen sotilaiden majoituspaikka, vastaus kansallismuseo teemasivun kasarmijutussa. Ei toista yhtäkään visaa; fakta muotoiltu erikseen. Tiedot: Amónin ranskalainen yrittäjä S8, kultamuseon sijainti S5, casado-nimi ja annos S1.

## 8. Kuvat

Ei B-valintaa tai kuvaesikatselua; kaikki 18 roolia neljältä kentältään tyhjiä. Ei Commons-hakua, generointia, tiedostonimien arvauksia tai vanhojen kuvien omistamista valituiksi. Tarpeet C-muistiossa.

## 9. Epävarmuudet, ristiriidat ja poisjätöt

- S1 antaa perustamiselle eri vuosia infoboxissa ja historiassa; ei valittu yhtä, käytössä 1700-luku.
- S2:n johdanto ja historia ristiriidassa rakentamisen aloitusajasta; C ei sisällä aloitusvuotta tai kestoa.
- S2 kuvaa kahvin vientiveroa, P1 tuontiverorahoitusta. C väittää vain kahviveron osallistuneen rahoitukseen S2:n perusteella, ei sen olleen ainoa tai koko rahoitus. Riippumattomassa D:ssä tarkistettava verotuksen vaiheistus teatterin historiasta.
- P1:n keskuspankin museon aukioviite eroaa S5:n Plaza de la Cultura -paikasta; käytetty yksityiskohtaisen museosivun nimeä, ei P1:n aukioviitettä.
- Korkeusluvut vaihtelevat S1/S7/P1:ssa; ei lukua tekstiin. Väestöluvuilla eri laajuuksia; ei lukua tekstiin.
- Englanninkieliset Barrio Amón ja Buenaventura Corrales School olivat 404; korvattu sallituilla es-sivuilla, ei 404-sisällön käyttöä.
- UM:n kokeiltu Costa Rica -osoite oli 404. Ei johdettu siitä turvallisuustietoa tai väitettä rajoitusten puuttumisesta; nykyinen matkustusturvallisuusauditointi avoin.
- Tarkat rautatievuodet, teatterin avajaisteos, väestö/pinta-ala, sääluvut, modernit veistokset ja yksilöimättömät taideteokset pois.
- Maalehden metsä/tulivuori/ekoturismi/armeijan lakkauttaminen eivät tämän lehden pääaiheita.
