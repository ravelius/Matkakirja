# Palikir — rajattu A-lähdekooste ja C:n väitekartta

Tila 12.10.2026: rajattu A, kokonainen artikkeli/lehti/opas/visa-luonnos C; kartta ja kuvavalinnat puuttuvat. Ei A–F-valmis kaupunki. Omistus e14/palikir, sessio 27. Kaikki lähdetallenteet: NAS `valiaikainen/nopea-e14-palikir/`.

## 0. Lähteet ja hakutapa

Haettu 12.10.2026 yhteisellä `sallittu_haku.py`-apurilla: robots molemmille agenteille, jokainen redirect erikseen ja yhteinen verkkolukko. HTTP 200 -tallenteita käytetty, virhevastauksia ei.

- P1 https://en.wikipedia.org/wiki/Palikir — johdanto, History, Geography, Education, Transportation (`palikir.html`). Palikir liittovaltion pääkaupunkina, sijainti Sokehsissa ja metsässä, suunniteltu hallintokeskus, lentoasema Kolonian lähellä.
- P2 https://en.wikipedia.org/wiki/Pohnpei — johdanto, History, Geography, Administrative divisions, Transportation, Education (`pohnpei.html`). Tuliperäinen saari ja riutta; Sokehs sisältää Palikirin ja Pakinin; kotoperäiset linnut; ka-puu vain Pohnpeilla/Kosraella; alkuperäiset maanisäkkäät lepakot, tuodut siat/rotat/koirat; kampukset ja FSM-FMI Yapilla; lentoasema Deketikillä.
- P3 https://en.wikipedia.org/wiki/Kolonia — johdanto, Description, History, Sights (`kolonia.html`). Osavaltion pääkaupunki ja saaren kaupan keskus; Mesenieng ja tuuleen liittyvä merkitys; espanjalainen hallintokaupunki 1800-luvun lopulla, muurin jäänteet; pengertie lentoasemalle; palvelut.
- P4 https://en.wikipedia.org/wiki/Sakau → https://en.wikipedia.org/wiki/Kava — johdanto, nimet, Traditional preparation (`sakau.html`). Sivun sisältö on Kava, ei erillinen Sakau-artikkeli. Piper methysticum, juuret, seremoniallinen/seurustelukäyttö, Pohnpeilla Hibiscus tiliaceus -kuori ennen puristamista. Ei vaikutus-, lääke- tai terveysväitteitä.
- P5 https://en.wikivoyage.org/wiki/Pohnpei — Get in/Get around/See/Do/Eat/Buy/Drink/Understand (`voyage.html`). Taksit/vuokra-autot, kehätie, Kolonia kävelypaikkana, Sokehs Ridge, mangroverannikko, vene sukelluskohteille, kala/sashimi/riisi/leipäpuu/banaani; lämmin ja sateinen ilman selvää kuivaa kautta. Ei hintoja, aikatauluja, ravintolasuperlatiiveja, turvallisuustakuita eikä tarkkoja sääarvoja. Wikivoyagen kampuksen sijaintitieto on epätarkka: käytetty P2:ta ja P6:ta.
- P6 https://www.comfsm.fm/ → https://www.comfsm.edu.fm/ — korkeakoulun oma etusivu ja Contact Us (`college.html`), osoite Palikir ja kansallinen yhteystieto; kampusuutiset Yapilta/Chuukilta. Tukee koulutustoimintaa ja sijaintia, ei lupaa kampusvierailulle.

Rajatut lisäyritykset https://www.visit-micronesia.fm/ ja https://www.cspngo.org/ päättyivät apurin HTTPError 302/301 -vastauksiin; niiden sisältöä ei saatu eikä käytetty. Verkkosivujen kiertoa tai API/PDF-kiertoa ei tehty. Alkuperäislähteistä korkeakoulun sivu onnistui. Lopullinen HTTP/robots-todiste poimitaan omaan `lahdeloki.jsonl`-tiedostoon.

## 1. Vuosi 1873

Nykyinen liittovaltion hallintokeskus on P1:n mukaan 1900-luvun lopun ratkaisu. Kolonian espanjalainen hallintokaupunki syntyi P3:n mukaan 1800-luvun lopulla. Vuoteen 1873 verrataan vain näitä yleisesti ajoitettuja vaiheita. Ei väitettä isoisän käynnistä tai paikallisen kylän ulkoasusta. P2/P3 antavat Espanjan kaupungin vaiheesta eri tarkkoja vuosia; käytetty vuosisadan loppua.

## 2. Perustiedot ja väestöalue

Kaupunki-id/wiki/maakoodi/pallopiste otetaan `konteksti.json`:sta. P1:n WP-piste poikkeaa kontekstin WD-pisteestä; pallopiste jätetään kontekstin mukaiseksi eikä sitä lainata nähtävyydelle. Palikir kuuluu Sokehsiin (P1/P2). Kontekstin väkiluku koskee koko Sokehsin kuntaa; ei kaupungin luku. P1:n infolaatikossa/leipätekstissä on eri lukuja ja eri laajuuksia. Kaikki väestöluvut jätetään C:n lukijatekstistä pois. P1:n itsenäistymisvuosi ristiriidassa P2/P3:n kanssa: valtion itsenäistymisvaihe pois.

## 3. Artikkelin ja kannen väitteet

Intro ja teksti: P1–P4/P6. Nostot: (1) Palikir/Kolonia-työnjako P1/P3; (2) Sokehs, Palikir ja Pakin P2; (3) Mesenieng, tuulinimi, Espanjan kaupunki ja muuri P3; (4) kansallinen kampus ja saarille ulottuva koulutus P2/P6. Ei tarkkoja rakennusvuosia, etäisyyksiä tai määriä.

## 4. Teema luonto

(1) Korkea tuliperäinen Pohnpei/riutta/laguuni ja Pakin-atollin ero P1/P2; (2) kotoperäiset lintulajit nimeltä ja Pohnpei starling arvioitu hävinneeksi P2; (3) ka-puun levinneisyys, alkuperäiset ja tuodut maanisäkkäät P2; (4) sakau, juuret ja Hibiscus-kuori P4. Maalehden Nan Madol -pääkertomusta ei toisteta. Lintunimet jätetty lähteen varmennettuun englanninkieliseen asuun: suomennoksia ei arvattu.

## 5. Opas

Perille: P2/P3/P5. Palikir/kampus: P1/P2/P6, vierailun pääsy ei varmennettu eikä luvattu. Kolonia/Sokehs Ridge/riutta/mangrove: P3/P5. Ruoka: P1/P5; sakau P4. Ajankohta: vain laadullinen ilmasto P1/P2/P5, ei kuukausi- tai vuositilastoja. Tämänhetkiset lentopäivät/yritykset/hinnat jätetty pois.

## 6. Kartta partial

Ei kohteita. Modernin hallintokeskuksen ja kampusrakennusten tekijän kuolema/teossuoja sekä yksittäisten kohteiden omat WP/WD-pisteet varmentamatta. Sokehs Ridge -reitti on oppaassa, ei arvattu piste kartalla. Nanlaudin tarkka korkeus ristiriitainen eikä aihetta/kohdetta käytetty. Karttarajaus null, kohteet [], nahtavyydet {}. A:n 6–8 kohteen portti avoin; kaupungin pieni hallintokeskus ei oikeuta keksimään pisteitä.

## 7. Kysymykset ja tiedot

5 kysymystä: Pohnpei P1, Sokehs P2, kampus P2/P6, sakau-juuret P4, kotoperäisyys P2. Vastaukset esiintyvät lehdessä. Teeman minitehtävä kysyy Hibiscus-kuorta, ei juuria eikä kotoperäisyyttä; vastaus saman sivun sakau-nostossa. Kolme tietoa: kampusverkko P2/P6, ka-puu P2, Mesenieng P3.

## 8. Kuvat ja sää

Ei B-valintoja. Kaikissa 18 kuvaroolissa tiedosto/lyhyt/selite/lahde tyhjät. Kuvaputken liite myöhemmin, ei kuvahakuja. Sää null: 48/48-primäärivarmennusta ei ole tässä sessiossa; ei muutoksia saa.json:iin, ei lukuarvoja ilmastotekstiin.

## 9. Avoimet portit

Riippumaton väitetarkistus D/E/F, lintunimien mahdolliset vakiintuneet suomennokset, kampusvierailun käytäntö, kohdepisteet ja teossuoja, B-kuvat, sääauditointi, pelikytkentä ja julkaisu. C on luonnos, ei hyväksytty kaupunki.
