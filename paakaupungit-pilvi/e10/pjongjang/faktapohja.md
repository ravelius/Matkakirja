# Pjongjang — rajattu A-lähdekooste ja C:n faktaperusta

Tehtävä 12, vain e10/pjongjang tässä kloonissa. Lähteet luettu 12.10.2026. Herkkä kaupunki kirjoitetaan e10:n viiden tavallisen kaupungin jälkeen. Niiden sisalto.json-tekstit ja C-muistiot tarkistettiin ennen tämän kaupungin C-tuotantoa: male, vientiane, phnompenh, kualalumpur ja bandarseribegawan, kaikissa artikkeli, 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. SHA-todiste: `valiaikainen/nopea-e10-pjongjang/e10-tavallisten-tekstiportti.json`. Toisten kaupunkien tiedostoja vain luettiin, ei muutettu.

## 0. Lähteet, hakutapa ja 1873-kehys

Yhteinen `sallittu_haku.py`, robots ensin, molemmat agentit sallittu, uudelleenohjaukset tarkistettu, globaali 1 s haku. HTML:t, tekstit, URL-luettelo, SHA:t ja valitut hakulokit omassa NAS-väliaineistossa `valiaikainen/nopea-e10-pjongjang/`. HTTP 404 -sisältöä ei käytetty faktana.

Luetut lähdeavaimet: city = en-Wikipedia Pyongyang; fortress = Pyongyang Castle; river = Taedong River; hill = Moranbong; noodle = Naengmyeon; gate = Taedongmun; pavilion = Ryongwang Pavilion; pubyok = Pubyok Pavilion; guide = en-Wikivoyage Pyongyang; soup-correct = alkuperäinen Taedonggang sungeoguk -URL, robots-tarkistetun ohjauksen jälkeen Sungeo-guk. Alkuperäislähteet: unesco = UNESCO ICH, Pyongyang Raengmyon custom; unesco-tombs = UNESCO WHC, Complex of Koguryo Tombs; um-correct = UM, Pohjois-Korea: matkustustiedote, 17.8.2026, haettu 12.10.2026. Yhteensä 13 onnistunutta lähdettä.

Onban, Taedonggang_sungeo-guk sekä pohjois-korea-matkustustiedote ensimmäisillä arvatuilla URL-otsikoilla antoivat HTTP 404:n. Niiden vastauksia ei käytetty. Onbanin ruokatieto luettiin city-artikkelin Cuisine-osiosta. Kelttikeiton oikea linkki luettiin city-artikkelista. UM:n maakohtainen `/matkustustiedote/-/c/KP`-reitti antoi robots-tarkistettuna varsinaisen tiedotteen. Varsinainen hakulista/error-lista `sources.json`.

1873 on kaanonin matkavuosi, ei tähän kaupunkiin keksitty tapahtuma. Artikkelin ainoa 1873-lause on väljä aikakehys: kaupungin vanhojen Goguryeo/Goryeo-pääkaupunkivaiheiden menneisyys oli silloin jo takana. Näiden historia luettu city/fortress-artikkeleista (History); UNESCO:n hautakohde vahvistaa Goguryeon kulttuurin historiallisen läsnäolon Pjongjangissa ja sen ympäristössä. Tarkkoja pääkaupungiksi siirtymisen vuosia ei käytetä; city ja fortress ovat osin samaa tietoketjua, eivät kahden riippumattoman lähteen lupakirja tarkkoihin vuosiin. 1873:n yksityiskohtainen paikallinen rakennus-/ulkoasukehys on avoin. Ei isoisän tekoja, reittiä, havaintolainauksia tai fiktiota.

## 1. Perusfaktat

Pohjois-Korean pääkaupunki Taedongin varrella (city, johdanto). Nimi Pyongyang tarkoittaa tasaista maata (city, Names). Kaupunki sijaitsee Korean niemimaan läntisen rannikon tasangolla (city, Geography). Moranbong eli pionikukkula muodostaa keskustan puistoalueen (hill, johdanto). Taedong alkaa Rangrim-vuorilta ja virtaa lounaaseen Koreanlahteen Nampon luona (river, johdanto). Kaupunkipallo kontekstista, ei kohdepisteeksi lainattu.

Kontekstin asukasluku koskee Pjongjangin hallinnollista kaupunkialuetta, ei pelkkää ydinkaupunkia tai taajamaa; sitä ei käytetä C-teksteissä. Kaikki väestö-, pinta-ala-, etäisyys-, korkeusarvot ja lähteiden tarkat rakennusvuodet poistettu pelaajateksteistä tai yleistetty vuosisatoihin.

## 2. Kansi: neljä nostoaihetta

| Aihe | Käytetyt faktat ja lähdekohdat |
|---|---|
| Tasainen maa / Moran-kukkula | Nimen merkitys ja tasanko (city, Names/Geography); pionikukkula ja puisto keskustassa (hill); Taedongin lähde Rangrimilla ja reitti Nampon kautta Koreanlahteen (river). Ei korkeuksia, joen pituutta tai tasangon pinta-alaa. |
| Portti, jolle saavuttiin joelta | Taedongmun sisemmän linnoituksen itäportti; joen mukainen nimi; lautta portin ulkopuolella; vesiliikenne ihmisille/tavaroille; porttikatu keskustan pääväylänä; graniittialusta ja paviljonki; siltojen myötä muuttunut kulkureitin merkitys (gate, johdanto/History/Administration by the Empire of Japan -osion vain liikenne- ja paikkafaktat). Ei sodan tapahtumia, tarkkoja vuosia, mittoja tai kerrosmäärää. |
| Puolustuspaikasta näköalapaikaksi | Ryongwang joenrannassa; Sansu-nimi Goguryeo-kaudella; puolustusyhteys Taedongmuniin; Goryeo-kauden näköalakäyttö; Joseon-kauden uudistaminen/nimeäminen; palautettu ja myöhemmin korjattu rakennus (pavilion, johdanto/History). Sodan yksityiskohdat, henkilöjuonet ja mestattu komentaja jätetty pois. Ei legendaa väitetä tapahtuneeksi. |
| Kelluvat muurit | Pubyok Moran-kukkulan rantatörmällä; nimi viittaa kelluviin muureihin; aikaisempi Yongmyong, temppelin yhteydessä; keskiaikainen nimenmuutos; pylväät/katto korealaista puurakentamista; runoperinteen paikka (pubyok, koko lyhyt artikkeli). Ei tekijästä tehtyä kuolinvuosioletusta, tarkkoja mittoja, alkuvuosia tai runolainauksia. |

## 3. Teema: Ruoka — Kulho ja hyvä toivotus

| Aihe | Käytetyt faktat ja lähteet |
|---|---|
| Viileä liemi kuuluu annokseen | Tattarinuudelit; viileä lihaliemi tai vetinen retiisikimchi; liha/kimchi/vihannekset/hedelmät; päärynä; kastikkeella sekoitettu tyyppi eri variantti: UNESCO ICH, varsinainen kuvaus; noodle, johdanto/Variations; city, Cuisine. Ei yhtä määrä- tai ainesosasuhdetta. |
| Kylmää ruokaa talven juhlaan | Naengmyeonin historiallinen talvikäyttö (noodle, johdanto); Jongwoldaeborum-aaton perhe/naapurit, pitkän elämän toive, syntymäpäivät/häät ja toivotukset (UNESCO ICH). Perinteen uskomus kerrotaan ihmisten toivomuksena, ei nuudelien terveysvaikutuksena. |
| Perintö jatkuu keittiössä | Äitien/isoäitien taitojen siirtäminen lapsille, ravintoloiden työssäoppiminen/koulutus, kilpailut/festivaalit/näyttelyt, valmistus/tarjoilu/tapaperinne (UNESCO ICH). Ei tiettyä käsin puristamisen työkalua tai reseptivaihetta keksitty. |
| Joki keiton nimessä | Sungeo-guk Pjongjangin paikallisruoka; Taedonggang-nimi; flathead grey mullet eli kelttikala; kirkas liemi, mustapippuri, suola, valkosipuli, inkivääri, sipulinvarret; arvostetuille vieraille tarjoaminen (soup-correct, johdanto/Preparation; city, Cuisine). Ei kalan vuodenaikaisia makuväitteitä, leikekokoa tai reseptimääriä. |

Minitehtävä: pitkät nuudelit toivottavat pitkää elämää. Vastaus löytyy saman ruoka-sivun talvijuhla-nostosta, ei kopioi sen virkettä. Kaupungin kysymykset eivät kysy pitkän elämän toivotusta. UNESCO ICH:n tarkka listausvuosi jätetty pois, vaikka julkaisu kertoo sen.

## 4. Matkailuopas

Viisi jaksoa: Sunan/perille ja ohjattu liikkuminen; joen vanhat portti/paviljonkipaikat; Moran-puisto ja Pubyok-paikkaperinne; raengmyon/kelttikeitto/onban; vuodenajat ja järjestelyjen vaikutus matkan mahdollisuuteen.

Nykyrajoitukset: UM:n lähteessä turvallisuustaso “Vältä tarpeetonta matkustamista”; omaehtoinen matkailu ei käytännössä mahdollinen, Pjongjangissakin liikutaan oppaan sallimiin paikkoihin, kuvauslupa kysyttävä ja järjestelyt varmennettava. C sanoo nämä lyhyesti ilman uutisia, nyky-/juntta-/konfliktipolitiikkaa, rikollisuusaiheita, rangaistusten kuvailua tai viranomaisviittausta lukijalle. Lento-/junayhteyksiä tai tiettyä maahantulon avaamista ei luvata. Sunan ja FNJ varmennettu guide, Get in.

Ruoka: paikallisnuudelit (city/noodle/UNESCO), kelttikeitto (soup-correct), onban (city, Cuisine: riisi, kana, sienet, mungpapupannukakut; ei pannukakkujen tarkkaa määrää). Ravintolaohjelma sovitaan oppaan kanssa (guide, Eat/Get around).

Sää ilman lukuja: lämmin/kuuma kostea kesä ja kylmä melko kuiva talvi (city, Climate). Ei lämpötila-, sade-, lumikertymä-, kuukausi- tai vuodenaikojen kestolukuja. Ei sääsuperlatiiveja. Säätiedot null, koska 48/48 primäärivarmennus on avoin; saa.json:a ei muuteta.

Parasta viisi riviä: raengmyon-perinne, Taedongmun, Ryongwang, Moran-kukkula, paikalliset ruoat. Hyvä tietää neljä riviä: ohjattu vierailu, järjestelyjen varmistaminen, kuvausluvat, tarpeettoman matkustamisen välttäminen. Tähtiarvot toimituksellisia, eivät lähdemittoja. Kohteen maininta ei lupaa pääsyä.

## 5. Kohdekartta: partial, yksi luonnollinen paikka

Moran-kukkula / puisto, tyyppi luonto, **39.04028, 125.75833**. hill-artikkelin oma geo on 39.04028;125.75833, ei kaupungin tai kaupunginosan laina. Kukkulan kuvaukseen luettiin myös Pubyokin paikkafaktat, mutta paviljonkia ei valittu karttakohteeksi. Rajat pisteen ympärille noin 300 m. Moran-juttu 2 kappaletta. Valittu on puisto ja luonnollinen kukkula; ei TV-torni, muistomerkki, stadion, teatteri, riemukaari eikä moderni installaatio. Tulevan luonnonkuvan rajauksessa nämä modernit teokset jätettävä pois. Niitä ei peitetä luontopaikan nimellä.

**6–8 kohteen portti ei täyty.** Pubyok-artikkelista ei saatu omaa WP/WD-koordinaattia; ei lainata kukkulan pistettä sille. Taedongmunin oma piste 39.02250;125.75667 ja Ryongwangin 39.02333;125.75722 luettiin, mutta molempien kunnostus-/restaurointiversion tekijäketju ja oikeusraja on avoin. Ne ovat teksti- ja opasaiheita, eivät tämän C:n kuvitettavia karttakohteita. Pyongyang Castle -sivu ei anna tähän rajattuun koosteen tarpeeksi erillisen näkyvän kohteen paikkafaktoja. Joen artikkelin piste on joen alueen piste, ei joen tietylle kaupunginrantakohteelle hyväksytty piste. Moderneja maamerkkejä ei oteta tilalle.

1873:n tarkka paikallinen puiston ja rakennusten ulkoasu jää avoimeksi; juttu ei keksi sitä. A/D:n kartta- ja oikeustarkistus sekä lisäkohteet jäävät myöhempään vaiheeseen.

## 6. Kysymykset ja tiedot

Kysymykset: Taedong-joki (river), portin jokiliikenne (gate), Pubyokin kelluvien muurien nimi (pubyok), tattari raengmyonissa (noodle ja riippumaton UNESCO), joen Rangrim-alku (river). Tasot 1–3; oikean vastauksen nimi ei esiinny vihjeessä. Kolme tietoa: kylmien nuudelien talviperinne (noodle/UNESCO), pitkän elämän toive (UNESCO), Taedongmunin lautta (gate). Ei isoisän ääntä.

## 7. Kuvatarpeet

Ei B-valintaa, ei kuva-/Commons-hakuja, esikatseluita tai generointia. Kuvaroolien tiedosto/lyhyt/selite/lahde tyhjät: valokuva 1, kansi 3, nostot 8, matkailijalle 1, oppaan jaksot 5, Moran-juttu 1 = 19 roolia. Kaupungin yleiskuvat, vanhojen rantapaikkojen paikkaperinne, nuudeli-/kelttikeittoruokaperinne, Moran-kukkulan luonnollinen puistomaisema. Historiallisten portti/paviljonkikuva-aiheiden oikeus-/tekijäketju tarkistettava ennen valintaa; tarvittaessa aihe jätetään kuvituksesta pois. Ei moderneja poliittisia muistomerkkejä, toreja taideteoksineen tai suojattuja rakennuksia. Havainnekuvan tuleva asset-liite ei ole Commons-tiedosto.

## 8. Ristiriidat ja epävarmat

City-artikkelin englanninkielinen keittotervehdys käyttää virheellisesti sanaa “trout”; varsinainen ruokalaji ja Sungeo-guk-artikkeli nimeävät flathead grey mullet -kalan. C käyttää kelttikalaa, ei taimenta, eikä toista tervehdysanekdoottia. Raengmyonin nuudelien leikkaamattomuuden symboliikassa noodle-sivulla on lähdepuutemerkintä; pitkän elämän toive käytetään vain alkuperäisen UNESCO ICH -kuvauksen perusteella. Pubyok/Ryongwang-runoilijalegendaa ei väitetä tositapahtumaksi eikä siitä kopioida runosäkeitä. Dynasty-vuodet, rakennusvuodet, tarkat mitat ja väestöarvot jätetty pois. Pjongjangin 1873-kehys on väljä historiallinen tausta, ei itsenäisesti täydellinen aikataso-auditointi.

## 9. Pois jätetyt aiheet ja avoimet portit

Ei nyky-/juntta-/konfliktipolitiikkaa, nykyhallituksia, sotatapahtumia, poliittisia johtajia, rikollisuutta, teko- tai uhrikuvauksia. Ei Pjongjangin moderneja monumentteja, ideologisia taideteoksia tai suojattujen tekijöiden teoksia kohteina/kuvina. Ei keksittyjä 1873-tapahtumia, kuvafilenimiä, karttapisteitä tai säälukuja. Kontekstissa ei maalehteä/lähikaupunkilehtiä toistettavana.

A rajattu/partial: puuttuvat karttakohteet ja niiden 1873-/oikeusketju. B, sääauditointi, riippumaton D, korjaukset E, pääsession F, hyväksyntä, pelikytkentä ja julkaisu avoinna. C-tekstiluonnos ei tarkoita valmista erää.
