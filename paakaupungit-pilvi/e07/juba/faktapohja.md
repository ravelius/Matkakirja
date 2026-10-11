# Juba — vaihe A: faktapohja

**Tila 11.10.2026:** lähdeaineisto ja osiot 0–9 on koottu. Neljä kansiaihetta, neljä historianostoaihetta, viisi opasjaksoa sekä kysymys- ja kuvarooliehdotukset ovat lähteistettyjä. **A:n kohdekartta on avoin:** kuuden–kahdeksan hyväksyttävän historiallisen tai luonnonpaikan joukkoa ei ole vahvistettu. Kuusi paikallista WP/WD-pistettä on kirjattu selvitystä varten, mutta ne eivät ole kuusi hyväksyttyä kohdetta. Jebel Kujurin ja Konyo Konyon omat WP/WD-koordinaatit puuttuvat. **Säädata on null** alkuperäisen sääajon hylkäyksen vuoksi. B–F ei ole tehty tällä faktatyöllä.

Kirjoitusalue on tämä tiedosto; raakatekstit ovat NAS-kansiossa `valiaikainen/juba-A`. Ei Commons-kuvahakuja, Git-toimia, sisältö-JSONia tai pelitiedostomuutoksia. Omistajan hyväksymä robots-sallittujen tavallisten lähdesivujen poikkeus on käytössä; estettyjä API-polkuja ei ole pyydetty. Kuva- ja teosoikeuden hyväksyntää ei päätellä tekstilähteen olemassaolosta.

## 0. Luetut lähteet ja 1873-kehys

### Lähdeluettelo

Kaikki alla käytetyt verkkolähteet on haettu ja luettu **11.10.2026** yhteisen `sallittu_haku.py`-apurilla. Apuri tarkistaa robots-säännöt molemmille työajon käyttäjäagenteille, myös uudelleenohjauksen kohteelle. Raakaversiot, hakupolut ja tiivisteet ovat NAS:lla; yhteinen loki on `valiaikainen/sallitut-haut.jsonl`. Hakukoneella löydetyt osoitteet ovat olleet vain paikantimia ennen sallittua lähdehakua. Commons- tai karttapalveluiden hakutuloksia ei ole käytetty koordinaattilähteinä.

| Tunnus | Luettu lähde, rajaus | Käyttö ja alkuperäisketju |
|---|---|---|
| S1 | [en-Wikipedia: Juba](https://en.wikipedia.org/wiki/Juba), revisio 1378671508; History, Transportation, Food, Education, Demographics | Kaupunki, kylä ja CMS-koulu, kreikkalaiset kauppiaat, ruoka. Historialuku viittaa mm. Richardsoniin, Badieyhyn, Nakaoon ja Tuttleen. Samasta viitteestä johdettu teksti ei ole toinen riippumaton lähde. |
| S2 | [en-Wikipedia: Juba Bridge](https://en.wikipedia.org/wiki/Juba_Bridge), revisio 1356897447, koko kohdeartikkeli | Sillan oma piste, 1900-luvun alkuperäinen Bailey-rakenne ja 2000-luvun korvaavat rakenteet. Aloitusvuodet ovat ristiriitaisia. |
| S3 | [en-Wikipedia: St. Theresa Cathedral, Juba](https://en.wikipedia.org/wiki/St._Theresa_Cathedral,_Juba), revisio 1368612095, koko kohdeartikkeli | Katolinen kirkko Katorissa Unity Avenuella. Rakentamisen alku ja katedraalin asema ovat eri asioita. Rakennuksen tekijäketjua ei ilmoiteta. |
| S4 | [en-Wikipedia: University of Juba](https://en.wikipedia.org/wiki/University_of_Juba), revisio 1369518740, johdanto, historia ja Academic structure | Julkinen englanninkielinen yliopisto ja sen oma kampuspiste. Ei todiste yksittäisen vanhan rakennuksen paikasta tai oikeuksista. |
| S5 | [en-Wikipedia: Juba Airport](https://en.wikipedia.org/wiki/Juba_Airport), revisio 1363046511, johdanto ja History | Lentokentän nimi ja IATA, vanha lentopaikka, myöhemmät kiitotie- ja terminaalivaiheet. Historialähde on osittain S15. Ei nykyisiä lentoaikatauluja oppaaseen. |
| S6 | [en-Wikipedia: Rejaf](https://en.wikipedia.org/wiki/Rejaf), koko artikkeli | Vertailupaikka vanhalle liikenteelle; yhteisö, ei Jebel Rejafin huipun piste. Ei Juban ydinkartan kohteeksi. |
| S7 | [en-Wikipedia: Juba Stadium](https://en.wikipedia.org/wiki/Juba_Stadium), revisio 1377474572, koko artikkeli | Stadionin oma piste, käyttö ja vanhan stadionin sekä nykyisen uudistuksen ero. Ei hyväksytty suojatuksi rakennusteokseksi kohdelistaan. |
| S8 | [en-Wikipedia: Juba Teaching Hospital](https://en.wikipedia.org/wiki/Juba_Teaching_Hospital), revisio 1362271070, koko artikkeli | Opetussairaalan oma WP-piste ja toiminnallinen historia. Vanhan Juba Hospitalin ja nykyisen opetussairaalan rakennusketju ei ratkea tästä. |
| S9 | [Juba in the Making: To The Juba Wharf](https://jubainthemaking.com/to-the-juba-wharf/), Brendan Tuttle, koko historiallinen essee ja lähdeviitteet | Kaupungin sijoittuminen harjanteelle, laituri ja maantie, arjen kaupunkitoiminnot. WP:n historiassa nimenomaisesti viitattu alkuperäinen tutkijan essee; viitteissä arkisto- ja tutkimuslähteet. Nykyisiä sotia tai poliittisia kertomuksia ei oteta sisältöön. |
| S10 | [Juba in the Making: Juba in Maps, 1938–1949](https://jubainthemaking.com/juba-in-maps-1938-1949/), Brendan Tuttle, koko essee, kuvien tekstiselitteet ja viitteet | Vanhat kartat, Khor Bau, pihat ja polut, koulupaikka ja vanhat yhteisöt. Pelkän kartan tyhjä tila ei tarkoita asumatonta paikkaa. Kuvaselitteet on luettu tekstifaktoina; itse arkistokuvia ei ole valittu tai hyväksytty. |
| S11 | [Juba in the Making: Jebel Kujur](https://jubainthemaking.com/jebel-kudjur/), koko paikkateksti | Pitkänomainen kukkula, vanha Korok-nimi, kivi- ja soramateriaalit, kaupungin kasvu sen ympärille. Lähteen korkeusluku jätetään pois ilman toista riippumatonta vahvistusta. Ei WP/WD-koordinaattilähde. |
| S12 | [Juba in the Making: Konyo Konyo Market](https://jubainthemaking.com/konyo-konyo-market/), koko paikkateksti | Ruokatori, paikalliset ja tuontituotteet, arkiston pop-up-esittely. Hinnoista, aukiolosta ja nykyisistä tapahtumista ei anneta lupauksia. Ei WP/WD-koordinaattilähde. |
| S13 | [Juba in the Making: A Night At The Movies](https://jubainthemaking.com/a-night-at-the-movies/), Brendan Tuttle, Juba Picture House, What was playing?, Westerns, Indian romance films, Hai Cinema | Alkuperäinen paikallinen elokuvahistoria; osa tutkijoiden Tuttle ja Joseph Chol Duot tutkimuksesta. Näytösten lajityypit ja yleisön toiminta. Heitetyn keihään anekdootin luotettavuutta itse tekijä varoittaa: pois. |
| S14 | [Juba in the Making: Hai Cinema](https://jubainthemaking.com/hai-cinema/), koko paikkateksti | Elokuvateatterin jälkeinen seurakuntakäyttö, alueen säilynyt nimi. Teatterin tarkka perustamisaika ei vastaa S13:n aikajanaa; vain 1900-luku. Ei omaa WP/WD-pistettä. |
| S15 | [Juba in the Making: Aviation in colonial Sudan and South Sudan, 1916–1930](https://jubainthemaking.com/as-imposing-a-show-as-possible-aviation-colonial-sudan/), Brendan Tuttle; erityisesti Juban lentopaikka, hotelli ja paikallinen työ | Vanha lentopaikka, murram-pinta, välilaskut ja paikalliset työntekijät. Gondokoron jo olemassa oleva tarina, lentosankarit ja väkivaltainen siirtomaakehys eivät tule uusiksi nostoiksi. |
| S16 | [Juba in the Making: Juba Town](https://jubainthemaking.com/juba-town/), koko paikkateksti | Vanhan hotellin purkaminen ja säilyneet osat. Väite kuningattaren sota-aikaisesta vierailusta on vain uskomus, ei tarkistettu fakta: pois. Hallinnollisen päämajan ajoitus poikkeaa tarkemmista esseistä. |
| S17 | [University of Sydney: MBA student establishes NGO to improve literacy in South Sudan](https://www.sydney.edu.au/business/news-and-events/news/2019/02/07/mba-student-establishes-ngo-to-improve-literacy-in-south-sudan.html), 7.2.2019, Kevin Lenahanin omakohtainen kuvaus | Yawusa Kinthan ja Lenahanin yhteistyö sekä kirjastosäätiön perustaminen. Tässä kirjasto on vasta suunnitteilla: ei todiste myöhemmän avaamisen päivämäärästä tai toteutuneesta palvelulistasta. Poistettu yksittäisiä ihmisiä leimaavat arvailut, lukutaitosuperlatiivi ja viranomaisanekdootit. |
| S18 | [The Christian Times: First public library opens in South Sudan, advocates for peace](https://www.thechristiantimes.net/index.php/s-sudan/19-education/2434-first-public-library-opens-in-south-sudan-advocates-for-peace), 2.10.2019, Philip Buda; perustajien haastattelun referaatti | Juba Peace Library, Gudele, yleinen kirjasto, kirjojen keruu ja lukemisen edistäminen. Referoi City Review Weeklyn haastattelua: ei tästä ja samasta referaatista kahta riippumatonta lähdettä. Tulevia tietokone-, kahvila- ja elokuvapalveluita ei esitetä jo toteutuneina. |
| S19 | [CSRF South Sudan: Juba County profile](https://csrf-southsudan.org/county_profile/juba/), väestötaulukko ja County Overview | Kontekstin 2021 NBS PES -arvion laajuus: **piirikunta**, ei kaupungin väkiluku. Konyo Konyo ja Gumbo ovat tuoretuotteiden välityspaikkoja pienemmille toreille. Nykyiset konflikti-, talouskriisi- ja rikollisuusosuudet eivät tule sisältöön. |
| L1 | [fr-Wikipedia: Djouba](https://fr.wikipedia.org/wiki/Djouba) ja [ar-Wikipedia: جوبا](https://ar.wikipedia.org/wiki/%D8%AC%D9%88%D8%A8%D8%A7) | Luettu paikkojen ja koordinaattien ristiintarkistukseen. Näistä ei löydy Kujurin tai Konyo Konyon omaa lähdepistettä. Kaupungin yleispistettä ei siirretä niille. Ilmastotaulukoita ei käytetä korvaamaan hylättyä työkalusarjaa. |
| V1 | [en-Wikivoyage: Juba](https://en.wikivoyage.org/wiki/Juba), revisio 5384266, koko kaupunkiopas | Historiallisia kohde- ja ruokailuaiheita, ei hintoja/aukioloa. Listing-piste ei ole tilauksen WP/WD-koordinaattivaatimuksen mukainen. Viisumi- ja liikennetiedossa on vanhaa Sudan-aikaa sekä ristiriitaisia päivityksiä: nykyiset säännöt eivät tästä. |
| T1 | [UM: Etelä-Sudan, matkustustiedote](https://um.fi/matkustustiedote/-/c/SS), **25.8.2026**, luettu 11.10.2026 | Poistu välittömästi maasta; vältä kaikkea matkustamista. Heikko hoidon saatavuus, kuljetusrajoitteet, kuvauslupa. UM:n Etelä-Sudanin oma maakohtainen sisältö oli saatavilla; FCDO-varalähdettä ei tarvita. |
| W0 | `valiaikainen/e07/saa/alkuperainen-saa-ajo.txt`, Juban hylkäysrivi | Alkuperäinen `tyokalu.mjs saa` hylkäsi taulukon. Ei `saa.json`-tiedostoa eikä käsin tehtyä korvaavaa sarjaa. Ks. osio 4. |

Juba in the Making -aineisto on eritelty alkuperäiseksi paikallishistorialliseksi lisälähteeksi, koska pääartikkeli ohjaa suoraan sen esseisiin. Sen omat alkuperäisviitteet ovat tekstissä näkyvissä, mutta tässä työssä avaamatta jäänyt arkisto ei muutu erikseen luetuksi toiseksi lähteeksi. Lähdesivun omat valokuvat eivät ole käytettäviä kuvituksia ilman B:n Commons- ja oikeusketjua.

### Wikidata-lähteet

Luetut EntityData-tiedostot ovat `valiaikainen/juba-A/Q*.json`. Oma artikkeli ja WD eivät yleensä ole riippumattomia: moni P625 on Wikipediasta tuotu.

| Tunnus | EntityData | Mitä tarkistettiin |
|---|---|---|
| WD1 | [Q1947: Juba](https://www.wikidata.org/wiki/Special:EntityData/Q1947.json) | Kaupungin yleispiste; ei kukkulan, torin, laiturin tai yksittäisen kirkon sijainti. |
| WD2 | [Q48789861: Juba Nile Bridge](https://www.wikidata.org/wiki/Special:EntityData/Q48789861.json) | Kaksi normaalirankista P625:tä samalle sillalle. Ei Freedom Bridgen piste. |
| WD3 | [Q2942508: St. Theresa Cathedral](https://www.wikidata.org/wiki/Special:EntityData/Q2942508.json) | Oman kirkon P625, karkea precision 0.01. Koordinaatin monet numerot eivät tee siitä oven tarkkaa sijaintia. |
| WD4 | [Q1231063: University of Juba](https://www.wikidata.org/wiki/Special:EntityData/Q1231063.json) | Yliopiston kampuspiste, ei yhden vanhan rakennuksen P625. |
| WD5 | [Q1122958: Juba International Airport](https://www.wikidata.org/wiki/Special:EntityData/Q1122958.json) | Lentokenttäalueen oma P625. Ei vanhan vuoden 1873 kohteen sijainti tai terminaalin teosoikeustodiste. |
| WD6 | [Q3067207: Rejaf](https://www.wikidata.org/wiki/Special:EntityData/Q3067207.json) | Paikkakunnan karkea piste poikkeaa WP:stä. Ei Jebel Rejafin huipun tai lentoveneiden kiinnityspaikan P625. |
| WD7 | [Q2718479: Juba Stadium](https://www.wikidata.org/wiki/Special:EntityData/Q2718479.json) | Stadionin oma P625, ei arkkitehdin tai uudistuksen tekijäketju. |
| WD8 | [Q116986804: Juba Teaching Hospital](https://www.wikidata.org/wiki/Special:EntityData/Q116986804.json) | Oma sairaalaentiteetti, **ei P625:tä**. Käytettävissä on vain S8:n oman sairaalan WP-koordinaatti. |

### Tarkkojen vuosien ja määrien käsittely

Tarkat lähde- ja revisiotunnukset, hakupäivä, UM:n tiedotepäivä, koordinaatit ja W0:n tarkastusvirhe ovat työaineiston metatietoa. Niitä ei pidetä automaattisesti pelaajatekstin historiallisina vuosina. Muut tarkat väitteet tarvitsevat kaksi **riippumatonta** lähdettä. Tässä tekstisuunnitelmassa käytetään pääosin 1900- tai 2000-lukua ja jätetään puutteellisesti varmennetut määrät pois.

- Kaupungin infoboksi sanoo perustamisvuodeksi **1922**, johdanto **1920–21**, historialuku suuren rakentamisen olleen käynnissä **1927**, S9 rakennustöiden aluksi **1928**. Kyse on myös eri asioista: kylä, koulu, uusi hallintopaikka ja rakentaminen. Pelaajalle **1900-luvun alussa koulun ja hallinnon ympärille kehittynyt kaupunki**, ei yksi selittämätön perustamisvuosi.
- Yliopiston tarkka perustamisvuosi **1975** on lähteessä; pääartikkeli ja yliopistoartikkeli eivät yksin muodosta kahden riippumattoman alkuperäislähteen todistetta. Pelaajalle **1900-luvun jälkipuoliskolla perustettu julkinen yliopisto**.
- Kirjaston avaamispäivä **1.10.2019** on S18:ssa ja sitä käyttävässä S1:ssä, ei kahdessa riippumattomassa avaamislähteessä. Pelaajalle **2000-luvulla avattu yleinen kirjasto**. S17 vahvistaa erillisen perustamistyön, ei avaamispäivää.
- Kirjamäärä **yli 13 000** S1:ssä ja **15 000 aloitusvaiheessa** S18:ssa. Ajankohta/laajuus eivät ole yhtenäinen tuplavarmennettu kokonaisuus; pelaajalle **lahjoituksilla koottu kirjakokoelma**, ei lukumäärää.
- Kukkulan **684 m** S11:ssä, sillan pituus, stadionin kapasiteetti, katujen etäisyydet ja historialliset väestö-/kuljetusmäärät: pois pelaajatekstistä tässä vaiheessa.
- Maan pääkaupunkiasema on nykyinen perustieto. Itsenäistymisen tarkka päivä kontekstissa on metatietona tallessa; pääkaupunkilehti ei tee maan nimeämisestä tai itsenäistymisjuhlista uutta maalehden nostoa.

### 1873-kehys

**Nykyinen kaupunkirakenne on 1873:a nuorempi.** S1, S9 ja S10 kuvaavat nykyisen kaupungin rakentumisen alkaneen 1900-luvulla vanhan Bari-asutuksen paikalle. Isoisän matkavuonna ei ollut nykyistä lentokenttää, yliopistoa, nykyisiä siltoja eikä näiden lähteiden kuvaamaa uutta hallintokaupunkia. Tämä ei tarkoita, että paikka olisi ollut asumaton: lähteet korostavat aiempia Bari-kotipaikkoja ja myöhemmin syrjäytettyjä paikallisia käyttöjä. Näissä lähteissä ei ole kylätasoista vuoden 1873 asukaskartoitusta; älä nimeä täsmällistä kotitaloutta tai paikallista johtajaa tuolle vuodelle ilman lisälähdettä.

Valkoinen Niili ja Jebel Kujur ovat kaupungin luonnollinen ympäristö; niiden olemassaoloa ei johdeta uuden rakennuksen perustamisvuodesta. **Gondokoron kauppa-aseman ja purjehdusrajan tarina on jo lähinostona**: se ei tule lehden uudeksi pääjutuksi. Ei sepitettyä isoisän käyntiä, reittiä, lainattua päiväkirjaa, lentoa, torivierailua tai paikallista tuttavuutta.

## 1. Perusfaktat

- **Nimi ja artikkeliavain:** Juba; `wiki.ehdotus = Juba`. Suomeksi ei vaihdeta nimeä Djouba/Yuba-muotoon. [konteksti; S1]
- **Maa ja pelitunnus:** Etelä-Sudan; kontekstin `maa = SDS`. Tunnusta ei muuteta faktatyössä. Ei sekoiteta Sudaniin tai Khartumiin. [konteksti]
- **Asema:** Etelä-Sudanin pääkaupunki ja Keski-Equatorian osavaltion keskus. [S1, johdanto]
- **Paikka:** Valkoisen Niilin varrella. Kaupungin syntyyn liittyivät sekä paikallinen koulu että jokikuljetuksen läheisyys. [S1, History; S9]
- **Pallopiste:** säilytetään kontekstin **4.851, 31.583**. Nykyisen WD1:n **4.853888888888889, 31.5825** on kirjattu ero, ei peruste siirtää pallo- tai karttapaikkoja omin päin.
- **Äänimaisemaehdotus:** `kaupunki`. Jokisatama on historiallinen ja maantieteellinen aihe, mutta nykyisen sataman liikenteen aktiivisuutta ei vahvisteta vanhasta matkaoppaasta. [S1, Transportation; V1]
- **Väestölaajuus:** kontekstin **690 918 / 2021** on NBS Population Estimation Survey -arvio **Juban piirikunnasta (Juba County)**, ei Juban kaupungin rajattu väkiluku. S19:n oma taulukko vahvistaa tämän lähdeketjun. Pelaajalle tarvittaessa **noin 690 000 asukasta Juban piirikunnassa vuoden 2021 arvion mukaan**, tai väkiluku kokonaan pois kaupungin introsta. Konteksti ja S19 perustuvat samaan arvioon: eivät kaksi erillistä mittausta.
- **Väestövertailun ristiriita:** S1:n kaupunki-, taajama-, metro- ja uusien arvioiden luvut eivät ole sama laajuus kuin kontekstin piirikunta. S19:ssä NBS-, OCHA- ja IPC-arviot poikkeavat myös toisistaan. Niistä ei tehdä näennäistä vuosikasvukäyrää tai valita suurinta kaupungin väkiluvuksi.
- **Lentoasema:** **Juba International Airport (JUB)**. S5:n oma lentoasema; tieto kertoo nimen ja paikan, ei matkan turvallisuutta, saatavilla olevaa lentoa tai kuljetusvarmuutta.
- **Lukeminen ja opiskelu:** julkinen University of Juba ja Juba Peace Library ovat todettuja kaupungin toimintoja. Oppilaitos tai kirjasto ei yksin yksilöi PD-rakennusteosta. [S4; S17–S18]

### Artikkelin runko C:lle

Introa varten kahdeksan lähteistettyä virkefunktiota: (1) maan pääkaupunki ja Valkoinen Niili; (2) uusi kaupunkirakenne vanhan paikallisen asutuksen paikalla; (3) koulu yhtenä uuden hallintopaikan sijoittumisen perusteista; (4) joen ja maareittien historiallinen yhteys; (5) Jebel Kujur ja sen rakennuskivimateriaali; (6) Konyo Konyon ruokakauppa; (7) opin ja lukemisen paikalliset toimijat; (8) vanhojen karttojen ja elokuvateatterin jättämät kaupunkimuistot. Muotoillaan kahteen–kolmeen kappaleeseen, ei luetteloksi eikä kahta julkaisematonta väkilukulaajuutta rinnakkain. [S1, S9–S15, S17–S19]

Lue lisää -tekstin kolme kappaletta: paikallinen asutus ja koulun ympärille kehittyvä kaupunki; kauppa ja arkielämän kaupunkitoiminnot; paperikarttojen sekä elokuvateatterin muistot. Nykyinen matkustusrajoitus kuuluu oppaaseen. Siitä ei rakenneta historiakappaleeseen nykyistä konflikti- tai rikollisuuskertomusta.

## 2. Kansi ja neljä nostoaihetta

**Sivu:** `kaupunki`, nimi Juba. Johdannon ydin: nuori pääkaupunkirakenne ja vanhempi jokivarren paikallinen elämä. Neljä seuraavaa ovat erillisiä aiheita, joista C voi kirjoittaa 440–660 merkin nostot. Faktat eivät ole valmiita kuvatekstejä; kuvan pääaihe tarkistetaan B–D:ssä.

### K1 — Koulu ehti paikalle ennen kaupunkisuunnitelmaa

1. Nykyisen kaupungin paikalla oli Bari-kylä ennen uutta hallintokaupunkia. [S1, History; S10, kylä ja CMS]
2. Church Missionary Society perusti paikalle lähetysaseman ja Nugent Memorial Intermediate School -koulun 1900-luvun alussa. [S1, History; S10, viite 14]
3. Koulupaikkaan kuului talo, koulu, kirkko, työpaja ja oppilaiden majoja. Yksittäistä majojen lukumäärää ei julkaista. [S10, viite 14]
4. Anglo-egyptiläisten viranomaisten uuden keskuksen valintaan vaikutti koulun olemassaolo. [S1, History]
5. Valintaan liittyi myös jokikuljetuksen läheisyys. [S1, History; S9, alku]
6. Uuden kaupungin rakentamiseen tuli hallintorakennuksia ja kauppaa, ja Rejafin kauppiaita muutti Jubaankin. Tarkat muutto- ja hallinnon siirtovuodet pois nostosta. [S1, History; S9]
7. Koulu ei ole sama asia kuin myöhemmin perustettu University of Juba; koulun myöhempi siirto Lokaankin on eri vaihe. [S4, History; S10, viite 14]

**Kulma ja 1873:** kaupunki ei ala yhdestä taikavuodesta. Kouluyhteisö ja myöhempi suunniteltu hallintopaikka ovat eri vaiheita; nykyistä koulua tai kampusta ei aseteta isoisän matkavuoteen.

**Kuva-aihe:** vanha yleisnäkymä koulun aikaisen kaupungin ympäristöstä, jos Commonsissa hyväksyttävä, tai koulutyötä havainnollistava yleinen välinekuva selvästi yleiseksi rajattuna. Ei nykyistä suojattua koulurakennusta pääaiheeksi, ei nykyoppilaiden lähikasvoja, ei arkistossa olevan kuvan automaattista PD-oletusta.

### K2 — Kukkulasta on tullut myös rakennusmateriaalia

1. Jebel Kujur on pitkänomainen, kaupungin maisemassa tunnistettava luonnonkukkula. [S11, alku]
2. Lähde kertoo sen vanhaksi paikalliseksi nimeksi Korok; laajempi nimenmuutoksen ja uskomusperinteen tarina jätetään maalehden kieli- ja uskomusaiheiden vuoksi pois. [S11, loppu]
3. Kaupungin kasvu on ympäröinyt aiemmin syrjemmällä seisoneen kukkulan. [S11, alku]
4. Sen juurelle on sijoittunut varastoja ja kivimateriaalin käsittelyä. [S11, toinen kappale]
5. Kukkulan kiveä ja soraa on käytetty teihin ja betonirakentamiseen. Tämä syy- ja käyttösuhde sanotaan lähteessä; sitä ei päätellä vain kivikuvan ulkonäöstä. [S11, toinen kappale]
6. Materiaalia käsitellään sekä käsin että koneellisesti. [S11, toinen ja viides kappale]
7. Kukkulan rinteillä lähde kuvaa myös pienimuotoista viljelyä. Tieto on dokumentoitu kuvaus, ei nykyhetken lupa vapaille retkille tai vierailulle ihmisten kotiin. [S11, viides kappale]

**Kulma:** kaupungin tuttu luonnonmuoto toimii myös materiaalilähteenä. Ei korkeuslukua, pohjattomasti jatkuvan louhinnan oletusta tai retkisuositusta. Nykyiset rakennukset eivät ole aiheen kuvitettava teospääaihe.

**Kuva-aihe:** kukkulan oma luonnonmuoto tai kiviaines; ei kuvitettua rituaalia, mainostettua modernia louhintalaitetta tai työntekijän tunnistettavaa lähikuvaa. Kohdekartta odottaa kukkulan omaa WP/WD-pistettä.

### K3 — Ruokatori välittää tavaraa eteenpäinkin

1. Konyo Konyossa myydään kaupungin päivittäisiä ruokatarvikkeita. [S12, ensimmäinen kappale]
2. Torin tavaraan kuuluvat myös vaatteet ja ruoanvalmistusvälineet. [S12, ensimmäinen kappale]
3. Mukana on paikallisesti kasvatettuja maataloustuotteita. [S12, kolmas kappale]
4. Lähteen kuvauksessa suuri osa tuoreista hedelmistä ja vihanneksista tuodaan Ugandasta maanteitse. Ei prosenttilukua tai nykyistä kaikkien tuotteiden alkuperälupausta. [S12, kolmas kappale]
5. S19 kuvaa Konyo Konyon ja Gumbo Marketin tuoretuotteiden välityspaikoiksi pienemmille toreille Juban piirikunnassa ja sen ulkopuolella. [S19, County Overview]
6. Torilla on esitelty kansallisarkiston historiallisia asiakirjoja pop-up-näyttelyssä. Yksi dokumentoitu esittely ei tarkoita pysyvää arkistomuseota tai tänään jatkuvaa näyttelyä. [S12, viimeinen kappale]

**Kulma:** tori on sekä ostospaikka että tavaran jatkoyhteys. Arkiston käynti on pieni paikallinen yllätys, ei aihe uuden maan nimeämisestä, sodasta tai maalehden kielitarinasta. Pois tarkka näyttelypäivä, inflaatioluvut, nykyiset hintaväitteet ja aukiolokellonajat.

**Kuva-aihe:** tunnistettu Konyo Konyon torikokonaisuus, tuoretuotteet tai astiamyynti. Tavallinen Juban torikuva ei nimeydy Konyo Konyoksi ilman identiteettitodistetta. Arkiston asiakirja- tai näyttelykuva tarvitsee oman oikeusketjunsa; ei lähdesivun kuvan lainaamista.

### K4 — Yleinen kirjasto oli yhteistyöprojekti

1. Kaupunkiin on avattu yleinen Juba Peace Library -kirjasto. [S1, Education; S18]
2. Kirjaston taustalla on South Sudan Library Foundation. [S1, Education; S17–S18]
3. Säätiön perustajia ovat Yawusa Kintha ja Kevin Lenahan. Kirjoitusasu Yawusa Daud Kintha esiintyy S18:ssa; samaksi henkilöksi yhdistetään vain lähteiden oma toimija, ei eri henkilöä. [S17–S18]
4. S17 kertoo perustamistyöstä kahden toimijan yhteistyönä ja järjestön rekisteröinnistä; paikallinen Kintha ei katoa ulkopuolisen lahjoittajan kertomuksen sivuhahmoksi. [S17, oma kertomus]
5. S18 kuvaa lahjoittajien ja yhteistyökumppanien tukemaa kirjakokoelman kokoamista. [S18, haastattelu]
6. Kirjaston tavoitteeksi kerrotaan opiskelun, tutkimisen ja yleisen lukemisen tukeminen. [S18, alku ja perustajan haastattelu]
7. Avausvaiheen tilaisuuteen osallistui koululaisia ja muuta yleisöä; sijainti kerrotaan Gudeleksi. Ei näistä tarkkaa katuosoitetta, avoinnaoloa tai nykyistä käyntilupausta. [S18, avaus]

**Kulma:** lukupaikka syntyy yhteisestä valmistelusta ja kokoelmasta. Pois väite kaikki eteläsudanilaiset lukutaidottomina, tuntemattoman viranomaisen lukutaidon arvaus, kirjojen tarkka määrä sekä toteutumattomien suunnitelmien esittäminen valmiina palveluina. “Maan ensimmäinen” jää pois ilman riippumatonta vahvistusta.

**Kuva-aihe:** lukeminen tai kirjat, tarvittaessa geneerinen kirjahylly tarkasti yleiseksi rajattuna; ei väärää paikannusta, näkyviä suojattuja kansikuvia pääaiheena tai suojattua uutta kirjastotaloa. Kirjaston oma WP/WD-paikkapiste ei ole löytynyt.

## 3. Teemasivu: historia

**Vakioaihe:** `historia`. **Nimi:** Arjen jäljet kaupungissa.

Johdannon aihe: kaupunkia muistetaan myös pihojen, elokuvailtojen, kauppatalojen ja matkanteon kautta. Tarinat ovat Juban paikallista historiaa. Ne eivät toista maalehden kuninkaan terveyttä, viskikohtaamista, heittoveistä, valtion nimeä, oraakkeleita, ruokia, Skylarks/Rejaf Jazz -musiikkia tai Juban arabian syntytarinaa.

### H1 — Kartta näyttää kadut mutta kadottaa pihat

1. S10 tarkastelee kaupungin 1900-luvun alkupuolen kartoissa hallintorajoja, katuja, kortteleita ja tonttinumeroita. [S10, karttojen sisältö]
2. Niissä näkyvät myös lentopaikka, virallisia rakennuksia ja metsävarauksia. [S10, karttojen sisältö]
3. Niistä puuttuvat tavallisten majojen välisiä polkuja ja kujia. [S10, omissions]
4. Pihoja, joilla levättiin ja syötiin yhdessä, ei kuvata. [S10, omissions]
5. Myös vedenhakupaikat jäävät pois. [S10, omissions]
6. Paperilla tyhjältä näyttävä tila saattoi siten sisältää asuttuja kotipaikkoja. Lähde tekee tämän eron nimenomaisesti; ei oletusta, että maanomistus olisi ollut tyhjä tai kartoittaja kaikkitietävä. [S10, omissions ja vanhat kotipaikat]
7. Khor Bau -puro erotti vanhassa kaupungissa pohjoista hallinto- ja kauppa-aluetta eteläisemmästä Malakiasta. Tällä luonnonpaikalla ei ole tässä löytynyt omaa WP/WD-pistettä; topografista karttaa ei jäljennetä pisteeksi käsin. [S10, Khor Bau -kappale]

**Kulma:** kartta on valikoiva kuva, ei kaikki paikan elämä. Ei historiallisten väestömäärien tai kartan mittakaavamäärien luetteloa. Vanhojen epätasaisten asuinolojen voi nimetä neutraalisti, ei julmuuksien kuvausta tai nykyisiä osapuolia.

**Kuva-aihe:** sallittu vanha kartta tai yleinen kartanluku, jos Commons-ketju löytyy. Ajantasaisen kuvan ei väitetä näyttävän kadonnutta pihaa. Karttateoksen oikeus ja valokuvan/skannauksen oikeus tarkistetaan erikseen.

### H2 — Elokuvailta jatkui yleisössä

1. Jubassa toimi 1900-luvulla Juba Picture House -elokuvateatteri. [S13, Juba Picture House; S14]
2. Ohjelmistossa oli eri maista tulleita elokuvia: esimerkiksi intialaisia, egyptiläisiä ja yhdysvaltalaisia tuotantoja. [S13, What was playing?]
3. Lajityyppeihin kuului lännenelokuvia, rakkaustarinoita, seikkailuja ja luontokuvauksia. [S13, What was playing?]
4. Katsojat saattoivat nauraa, huutaa tai selittää ja kääntää tapahtumia toisilleen. [S13, yleisökappaleet]
5. Samassa salissa oli eri hintaluokan istumapaikkoja. Ei historiallista hinnastoa tai kapasiteettia pelaajatekstiin. [S13, Juba Picture House]
6. Rakennusta käytettiin myöhemmin seurakuntatilana, vaikka alue tunnetaan edelleen nimellä Hai Cinema. Seurakunnan käyttö on rakennuksen myöhempi vaihe, ei elokuvan katselua tänään. [S14, ensimmäinen kappale]
7. Elokuvamuistojen lähde on paikallisen yleisön haastatteluja ja vanhoja ohjelmistoilmoituksia hyödyntävä tutkimus. Älä tee yksittäisen haastateltavan makua koko kaupungin luonteeksi. [S13, lähde- ja menetelmäosuudet]

**Kulma:** katsominen saattoi olla yhteinen, äänekäs tapahtuma; teatterin nimi jää alueelle käyttötarkoituksen vaihtuessa. Pois keihään heitto valkokankaaseen: tekijä itse huomauttaa tällaisten kertomusten usein epäluotettavasta kierrosta. Ei elokuvien suojattuja ruutuja, julisteita, tähtikuvia tai rikos- ja sotajuonien jäljittelyä.

**Kuva-aihe:** vanha katsomo tai tekninen projektori yleiseksi havainnollistukseksi; vain hyväksytty lisenssi ja oikea ajallinen rajaus. Nykyisen kirkoksi muutetun rakennuksen tuntematon tekijäketju estää automaattisen hyväksynnän pääaiheeksi.

### H3 — Kauppiaat jättivät jälkiä kivitaloihin

1. Kreikkalaiset kauppiaat toimivat Juban varhaisessa kaupassa 1900-luvulla. [S1, History]
2. Lähde kertoo heidän toimittaneen tarvikkeita brittiläiselle armeijalle. Se ei tee heistä kaupungin ainoita perustajia. [S1, History]
3. He tekivät yhteistyötä paikallisten Bari-asukkaiden kanssa. [S1, History]
4. Rakentamista sijoittui sekä Juba Market -alueelle että aikanaan Greek Quarteriksi kutsutulle alueelle. [S1, History]
5. Greek Quarter -nimellä tarkoitettu alue tunnistetaan S1:ssä Hai Jalabaksi. [S1, History]
6. Lähde nimeää kauppiaiden rakennuskohteina muun muassa Ivory Bankin ja vanhan Sudan Airways -rakennuksen; nimen käyttö ei vahvista nykyisen talon kaikkiin osiin samaa rakentamisikää. [S1, History]
7. S16 kertoo vanhan Juba Hotelin suurelta osin puretuksi ja joidenkin osien säilyneen. Vanhan hotellin historiallinen rooli ei siten tarkoita ehjää vanhaa hotellia nykykuvassa. [S16, hotellia koskeva kappale]

**Kulma:** paikallinen kaupunkityö ja eri taustoista tulleiden kauppiaiden jäljet, ei ulkopuolisen rakentajan sankarikehystä. S1:n ja S9/S15:n hotellivuodet poikkeavat toisistaan; julkaistaan vain 1900-luvun varhainen hotellivaihe.

**Kuva-aihe:** historiallinen laaja katu- tai kauppanäkymä, jossa pääaiheeksi ei valita tekijäketjultaan tuntematonta modernia teosta. Vuosisadan ikä tai puuttuva tekijänimi ei yksin tee kivitalosta PD:tä. Nykyiset pankkilogot, mainokset ja suojatut julkisivut eivät ole kuvan pääaiheita.

### H4 — Lentomatka tarvitsi maassa paljon työtä

1. Jubaan raivattiin lentopaikka 1900-luvun alkupuolella, uuden hallintokaupungin rakennusvaiheessa. [S5, History; S15, Juban lentopaikka]
2. Lentopaikan pinnaksi rakennettiin myöhemmin murskatusta lateriitista tai murramista tehty kiitotie. [S5, History; S15, Juban lentopaikka]
3. Juba kuului varhaisen kaukoliikenteen välilaskupaikkoihin. [S15, Imperial Airways ja overnight stops]
4. Jokireitillä käytettiin myös lentoveneitä, joiden pysähdyspaikkoja oli Juban eteläpuolella Rejafin lähellä. Tämä ei siirrä Rejafin yhteisöpistettä lentovenelaituriksi. [S5, History; S15]
5. Yöksi pysähtyneitä lentomatkustajia vietiin autolla Juba Hoteliin. [S15, overnight stops]
6. Lentotoiminta edellytti lentopaikkojen raivaamista, polttoaineen kuljettamista ja koneiden sekä matkatavaroiden käsittelyä. Näistä paikallisista maassa tehtävistä töistä lähde puhuu nimenomaisesti. [S15, Imperial Airways: a view from the ground]
7. S9 puolestaan kuvaa Juban laiturin toimineen maanteitse saapuneen tavaran ja jokikuljetuksen liittymänä. [S9, wharf ja kuljetusketju]

**Kulma:** nopea matka ilmassa oli monen paikallisen työn varassa. Ei lentosankaria, ennätysaikaluetteloa, nykyisten lentoyhtiöiden palvelulupausta eikä maalehden Gondokoro-tarinan uusintaa. S9:n Léopoldville/Brazzaville/Kinshasa-sulkeissa oleva maantieteellinen sekaannus ei siirry tekstiin; ulkopuolinen koko kuljetusreitti jätetään pois.

**Kuva-aihe:** hyväksytty historiallinen yleisnäkymä Juban lentopaikasta tai laiturista; ei arkistosivun kuvan automaattista käyttöä, ei nykyterminaalin suojattua rakennusta pääaiheena. Tarvittaessa yleinen vanha tekninen työväline selitteessä yleiseksi rajattuna.

### Teemasivun minitehtävä

**Kysymysaihe:** Mitä vanha tarkka kaupunkikartta saattoi jättää näyttämättä?

- Oikea: **Kotipihat ja niiden väliset polut.**
- Väärät vaihtoehdot: Lentopaikan ja viralliset kadut; hallintorajat ja korttelinumerot; viralliset rakennukset ja metsävaraukset.
- Faktaselitys: S10:n tarkastelemissa kartoissa arjen pihat ja kulkureitit jäävät usein pois, vaikka virallinen kaupunkirakenne on piirretty näkyviin.

Vastaus löytyy H1:stä. Tätä aihetta ei käytetä osion 6 kaupungin viisassa. Väärät vaihtoehdot ovat keskenään samantyyppisiä eikä oikeaa vastausta tarvitse paljastaa vihjeellä. Lopullinen minitehtävän fakta kirjoitetaan omaksi lauseekseen, ei H1:n nostovirkkeen kopiona.

## 4. Opas

### Nykyinen matkustusrajoitus ja käyttötapa

T1 on luettu maakohtaisena tiedotteena. Päiväys **25.8.2026**, tarkistus **11.10.2026**; taso **Poistu välittömästi maasta**. Kaikkea matkustamista Etelä-Sudaniin on syytä välttää toistaiseksi ja maassa olevia suomalaisia kehotetaan poistumaan. Tämä koskee myös Jubaa. Oppaasta ei rakenneta tällä hetkellä toteutettavaa torikävelyä, kukkulavaellusta, yöelämää tai jokiristeilyä.

Pelaajalle tulevan lyhyen pääkappaleen runko: **Jubaan matkustamista tulee toistaiseksi välttää. Maassa olevia kehotetaan poistumaan. Kaupungin jokivarsi, torit ja historialliset koulupaikat auttavat silti ymmärtämään sen syntyä. Hoidon ja kuljetusten saatavuuteen liittyy suuria rajoitteita. Valokuvaaminen vaatii erillisen luvan.** [T1; kaupungin aiheiden tausta S1, S9–S12]

Viranomaisviittaus ja tiedotepäivä jäävät faktapohjaan; lopulliseen opastekstiin ei kirjoiteta “UM:n mukaan” tai nykyisen konfliktin tapahtumakertomusta. Pelissä oppaan otsikko voi säilyä “Matkailijan Juba”, mutta kutsuvirke kutsuu tuntemaan kaupunkia, ei ostamaan matkaa.

### O1 — Perille ja liikkeelle

- Lentoaseman nimi **Juba International Airport**, tunnus **JUB**. [S5]
- Lentokenttä on oma paikkansa kaupungin pohjois-/koillispuolella; S5:n tarkkaa etäisyyttä ei toisteta ilman riippumatonta varmennusta.
- T1:n nykyinen matkustusrajoitus on ensisijainen käytännön ohje.
- T1 kertoo kuljetuspalveluiden rajallisuudesta ja päällystämättömien teiden ongelmista sateiden yhteydessä. Ei tarkkoja sadekuukausia ilman hyväksyttyä sääsarjaa, ei matka- tai taksimaksuja.
- V1:n vanhat bussit, säännölliset alukset, Khartoum-lennot ja viisumikäytännöt eivät ole vahvistettuja nykyreittejä. S5:stä ei kopioida vanhentuvia lentoyhtiöaikatauluja.

**Kuvaehdotus:** kaupungin yleinen tienäkymä ilman suojattua rakennusteosta tai mainospääaihetta. Ei lentokentän kuvaamista suosittelevana toimintana eikä epävarmaa terminaaliteoskuvaa.

### O2 — Torit ja kaupunkipaikat

- Konyo Konyo on lähteistetty tuoretuotteiden ja arkitavaran kauppapaikka. [S12]
- Se välittää tuotteita myös pienemmille markkinoille; ei pelkkä matkamuistotori. [S19, County Overview]
- Jokikuljetus ja paikallisen koulun olemassaolo liittyivät kaupungin historian sijoittumiseen. [S1, History]
- Oppaassa nämä ovat kaupungin ymmärtämisen aiheita, eivät nykyisiä avointen ovien tai turvallisen kävelyreitin lupauksia.

**Kuvaehdotus:** tuore, identiteetiltään vahvistettu torin yleiskuva; jos vain nimeämätön Juban tori löytyy, teksti ja rooli muutetaan näkyvästi yleiseksi eikä nimetä sitä Konyo Konyoksi.

### O3 — Kukkula ja oppiminen

- Jebel Kujur on paikallinen luonnonmuoto, johon kaupungin kasvu ja rakennuskivimateriaali kytkeytyvät. [S11]
- University of Juba on julkinen yliopisto ja Juba Peace Library yleinen kirjasto. [S4; S18]
- Kukkulalle ei tässä anneta retkisuositusta; kirjastoon ja yliopistoon ei luvata nykyistä sisäänpääsyä tai käyntiaikaa.
- Koulun ja nykyisen yliopiston eri historialliset vaiheet pidetään erillään. [S1, History; S4]

**Kuvaehdotus:** kukkulan luonnonmuoto tai geneerinen lukemisen väline ilman väärää paikannusta. Nykyistä kampusrakennusta ei hyväksytä pelkän yliopiston institutionaalisen iän nojalla.

### O4 — Mitä täällä syödään

- **Ful medames** mainitaan Juban aamiaisruokana. [S1, Food]
- Siinä käytetään kypsennettyjä härkäpapuja, joita muussataan. [S1, Food]
- Lähteen reseptikuvauksessa mausteita ovat valkosipuli, sitruunamehu ja oliiviöljy. Ei väitetä jokaisen ravintolan käyttävän samaa reseptiä. [S1, Food]
- Se voidaan tarjota leivän kanssa. [S1, Food]
- Tämä on kaupungin lähteessä kuvattu ruoka-aihe, ei väite ruoan yksinomaisesta eteläsudanilaisesta alkuperästä tai ravintolan tämänpäiväisestä listasta.
- Maalehden sama taikina paistettuna/keitettynä, maapähkinäinen lehtipata, suuri kala sekä karjan käyttö jäävät pois tästä uudesta jutusta. V1:n vanhat ravintolan nimet ja hintasuositukset eivät siirry oppaaseen.

**Kuvaehdotus:** aidosti tunnistettu ful medames tai tarvittaessa yleinen härkäpapukuva rajatulla selitteellä. Geneeristä papukuvaa ei väitetä Jubassa kuvatuksi paikallisannokseksi.

### O5 — Vuodenaika ja matkan ajoitus

- **Hyväksyttyä sääsarjaa ei ole.** Ei keskilämpöä, päivän ylimpiä/alimpia lämpötiloja, millimetrilukuja, vuosisadetta tai “parhaan kuukauden” laskentaa oppaaseen.
- S1 luonnehtii ilmastoa trooppiseksi sateisen ja kuivan kauden ilmastoksi. Jos laadullinen ilmastovirke tarvitaan, sallittu muoto on **Jubassa sateinen ja kuiva kausi vuorottelevat**. Tähän ei liitetä kuukausia, lämpötiloja, keskimääräistä sadetta tai matkustuskehotusta.
- Nykyinen matkustusrajoitus ratkaisee: kaupungin tuntemiseen tarkoitettua opasta ei muotoilla vuodenajan perusteella matkasuositukseksi. [T1]
- S11:n kukkulan kasvillisuuden vuodenaikainen vaihtelu voidaan kertoa lähteistettynä luonnonkuvauksena, jos sitä tarvitaan; se ei korvaa puuttuvaa sääasemadatasettiä.

**Kuvaehdotus:** tuore luonto-/kukkulayleiskuva, jos hyväksyttävä löytyy. Kuvan vihreydestä ei johdeta kuukautta, ilmaston normaalilukua tai yleistä sääennustetta.

### Säätausta: null on tarkoituksellinen

- Alkuperäinen työkaluloki: `valiaikainen/e07/saa/alkuperainen-saa-ajo.txt`.
- Lähdeartikkeli S1: Juba, revisio **1378671508**.
- Hylätty taulukko: **Climate data for Juba (1991–2020, extremes 1931–present)**.
- Taulukon ilmoittamia lähteitä ovat WMO; NOAA (aurinko ja kosteus, vanha normaalikausi); Deutscher Wetterdienst (ääriarvot ja keskilämmöt). Näiden nimien näkeminen ei korjaa sarjojen yhteensopivuusvirhettä.
- W0:n virhe: **vuosisarake 1145 mm, kuukausien summa 1074 mm**. Tämä on toimituksellinen tarkastusvirhe, ei pelaajalle julkaistava sadehavainto tai kaksi vaihtoehtoista normaalia.
- Työkalu hylkäsi taulukon eikä tuottanut Juballe `saa.json`:ia. **C:n `saatiedot: null`.** Ei käsinkopiointia, summaa korjatuksi vuosisateeksi, vaihtoehtoista reanalyysiä tai fr-Wikipedian toista taulukkoa ohittamaan alkuperäistä porttia.
- Mahdollinen sääkorjaus vaatii uuden hyväksyttävän taulukon ja alkuperäisen työkalun onnistuvan ajon pääsession kautta. A ei muokkaa säätyökalua eikä tee uutta datasettiä.

### Parasta: viisi tiedollista nostoa

Tähdet ovat lehden aihepainoa, eivät turvallisuusarviota tai avoinnaolotietoa. Otsikko ja selitteet on muotoiltava kaupungin **tuntemisen**, ei nykyisen matkan, aiheiksi.

| Aihe | Ehdotus tähdiksi | Faktapohja |
|---|---:|---|
| Koulupaikasta kehittyvä kaupunki | 3 | CMS-koulu ja uuden hallintokaupungin sijoittuminen. S1, S10. |
| Kukkulan rakennuskivi | 3 | Jebel Kujurin luonnonmuoto ja kivimateriaalit. S11. |
| Ruokatorin tavaravirta | 2 | Konyo Konyon arkitavara ja tuotteiden välitys. S12, S19. |
| Elokuvailtojen muisto | 2 | Juba Picture House ja Hai Cinema -nimi. S13–S14. |
| Yleinen lukupaikka | 2 | Juba Peace Libraryn paikallinen yhteistyö. S17–S18. |

### Hyvä tietää: neljä riviä

1. **Matkustusrajoitus:** Jubaan matkustamista tulee toistaiseksi välttää ja maassa olevia kehotetaan poistumaan. [T1]
2. **Hoidon saatavuus:** terveydenhuollon saatavuus on hyvin heikko. Vakuutuksen todellinen voimassaolo ja hoidon sekä kuljetuksen järjestelyt on tarkistettava, ei luvata lähimmän sairaalan ratkaisevan kaiken. [T1]
3. **Kuvauslupa:** T1:n Etelä-Sudanin oma kohta sanoo valokuvaamisen vaativan informaatioministeriön luvan ja lähtökohtaisesti kaiken kuvaamisen olevan kiellettyä ilman lupaa. Ei lievennetä tätä yleiseksi “kysy lupa vain ihmisiltä” -ohjeeksi. [T1, Maan lait ja käytännöt]
4. **Asiakirjat:** ajantasaiset maahantulosäännöt on varmistettava kohdemaan viranomaiselta. V1:n vanhaa Sudan-viisumia tai hintaa ei käytetä Etelä-Sudanin nykyehdoksi. [T1, Maahantulosäännökset; V1:n ristiriita]

## 5. Kohdekartta: paikalliset ehdokkaat ja aito vaje

**Tavoite 6–8 hyväksyttävää kohdetta ei täyty.** Jubaa ei perustella pieneksi pääkaupungiksi väestölaajuuksia kaventamalla. Historiallista ydintä ei paisuteta etäisillä kansallispuistoilla tai Gondokoron jo käytetyllä lähitarinalla. Vanhan luonnonpaikan tai markkina-alueen sijaintia ei johdeta kaupungin pisteestä, valokuvan kuvakulmasta tai kartan käsin luetusta kohdasta.

Alla A–F ovat **selvitysdossiereita**, eivät valmiin kartan numerointia. G–K ovat ilman hyväksyttävää WP/WD-pistettä olevia paikallisia aiheita. Tyyppi, tekijäketju ja faktamäärä on ratkaistava ennen C:n listaa. Karttarajaus ja 300 metrin marginaali tehdään vasta hyväksyttyyn listaan: tässä ei anneta ehdollisten ja hylättyjen pisteiden yhteistä bboxia valmiina karttana.

### A. Pyhän Teresan katedraali — lupaava mutta ehdollinen rakennus

**Oma lähdekoordinaatti:** S3 WP **4.82730, 31.60030**. WD3 **4.82727, 31.60030**, precision **0.01**, normaalirankki; arvo on karkea, ei tarkka sisäänkäynti. Piste tarkoittaa nimettyä katedraalia, ei koko katolista arkkihiippakuntaa. Mahdollinen tyyppi rakennus.

Lähteistetyt tekstifaktat:

1. Rakennus on roomalaiskatolinen kirkko Jubassa. [S3]
2. Se sijaitsee Katorin kaupunginosassa. [S3]
3. Katu on Unity Avenue. [S3]
4. Kirkko toimii myös seurakuntana. [S3]
5. Se on Juban metropoliittisen arkkihiippakunnan katedraali. [S3]
6. Rakentaminen alkoi 1900-luvun puolivälin vaiheilla. Tarkka lähdevuosi 1952 on työmuistiin kirjattu, ei kahdesti riippumattomasti varmennettu. [S3]
7. Katedraaliasema tuli rakentamisen alkua myöhemmin, arkkihiippakunnan perustamisen yhteydessä. Tarkka lähdevuosi 1974 ei korvaa rakennuksen ikää. [S3]

**1873:** nykyistä kirkkoa ei ollut. **Portti:** arkkitehti, rakennuksen teosketju, tekijän kuolinvuosi ja mahdolliset myöhemmät osat eivät ole lähteissä varmistettuja. Aloitusvuosi ei yksin todista tilaajan alle/ylitse 70 vuoden tekijärajan täyttymistä. **Ei hyväksytty kohde eikä kuva.** Nykyiset turvapaikka- ja konfliktikertomukset poistetaan.

### B. Juban yliopiston kampus — instituutiopiste, ei yksilöity vanha rakennus

**Oma lähdekoordinaatti:** S4 WP **4.84111, 31.59000**; WD4 **4.84103, 31.58990** (alkuarvo 4.841030555555555, 31.5899). Pisteen identiteetti on **University of Juba**, kampus, ei Nugent-koulu eikä tietty historiallinen rakennus. Ei hyväksytty rakennuskohde.

Lähteistetyt institutionaaliset faktat:

1. Yliopisto on julkinen. [S4]
2. Opetuskieli kuvataan englanniksi. [S4]
3. Pääkampus on kaupungissa, keskustan alueella. [S4]
4. Instituutio perustettiin 1900-luvun jälkipuoliskolla. [S4]
5. Opetuksen ja koulutuksen alueita ovat esimerkiksi tekniikka ja lääketiede. [S4, Academic structure]
6. Mukana on myös luonnonvarojen ja ympäristön tutkimuksen koulutusta. [S4, Schools]
7. Jatkokoulutus ja etä-/jatkuvan oppimisen keskukset mainitaan organisaatiorakenteessa. [S4, Colleges ja Specialized centres]

**1873:** ei nykyistä yliopistoa. **Portti:** instituution perustamisaika ei määritä kampusrakennusten ikää tai tekijänoikeutta. Arvioitava erikseen, voiko paikallinen kokonaisuus ylipäätään olla kohde tällä rakennus-/aukio-/luonto-rajauksella ja hyväksyttävällä pääaiheella. Nykyisten rakennusteosten, teosten tai tekijöiden ketju ei ole osoitettu. **Ei lasketa kartan valmiiksi kohteeksi.** Ei nykyisten johtajien, hallinnon tai opiskelijamäärien tarinaa.

### C. Juba Teaching Hospital — oman toimipaikan piste, ei vanhan sairaalarakennuksen todiste

**Oma lähdekoordinaatti:** S8 WP desimaaliesitys **4.85008, 31.60853**, alkuarvo **4.850082, 31.608532**. Samassa koordinaattimerkinnässä näkyvä aste/minuutti/sekuntimuoto on pyöristetty ja antaa hieman eri tuloksen; käytetään artikkelin omaa desimaaliesitystä dokumentoituna. WD8:lla **ei P625:tä**.

Kuusi institutionaalista faktakandidaattia: valtiohallinnon sairaala; opetussairaala; yhteys Juban yliopistoon; Unity Avenuella; sekä Keski-Equatorian että valtakunnallisen lähetehoidon rooli; useita hoidon aloja kuten synnytys-, päivystys- ja leikkaustoiminta. [S8, johdanto ja Services]

**1873:** nykyinen opetussairaala on myöhempi instituutio. **Portti:** S10:n vanhassa kartassa ja S16:n tekstissä esiintyvä Juba Hospital ei yksilöi tässä samaa fyysistä taloa kuin S8:n opetussairaala ja myöhemmin uudistetut rakennukset. S8:n opetussairaalan avausvuosi 1975 ja S16:n 1940-luvun sairaalaviittaus voivat koskea eri toimintavaihetta. Niitä ei yhdistetä yhdeksi vanhaksi PD-taloksi. Nykyisen hoidon saatavuuden heikkous T1:ssä estää myös käynti-/hoitolupaukset. **Ei kohdekartalle nykyisessä aineistossa.**

### D. Juban Niilin silta — nykyiset osat eivät muutu vanhoiksi materiaalitarinalla

**Oma lähdekoordinaatti:** S2 WP **4.82300, 31.60860**. WD2 sisältää myös **4.82290, 31.60851** (alkuarvo 4.82289722, 31.60850833), molemmat normaalirankkisia. WP-piste on nimenomaan Juba Nile Bridge, **ei ylävirran Freedom Bridge** tai jokisuun luontopiste.

Lähteistetyt sillan faktat:

1. Se ylittää Valkoisen Niilin Jubassa. [S2]
2. Se liittyy Juba–Nimule-tiehen. [S2]
3. Vanha rakenne toteutettiin elementtisiltamateriaalista. [S2, History]
4. Rakennushistoriassa käytettiin toisen maailmansodan aikaisen Bailey-järjestelmän materiaalia. [S2, History]
5. Alkuperäiseen suunnitelmaan kuului myös jalankulkuosuus. [S2, History]
6. Juba–Nimule-reitti välitti tavaraliikennettä Ugandan ja Kenian suunnasta. [S2, History]
7. Vanhoja rakenteita on korvattu ja korjattu; nykyiset vierekkäiset Compact 200 -rakenteet ovat 2000-luvun vaihetta. [S2, myöhemmät rakenteet]

**1873:** ei lähteen kuvaamaa siltaa. **Portti ja ristiriita:** S2:n alussa alkuperäinen rakennusvuosi **1972**, historiassa rakentaminen ja avaaminen **1974**; lisäksi nykyiset korvaavat sillat **2006**. Ei julkaista yhtä tarkkaa alkuvuotta ilman riippumatonta ratkaisua. Vanhan järjestelmän tai teräsmateriaalin ikä ei anna nykyiselle koko sillalle vapautunutta teosketjua. Rakennusteoksen mahdollinen omaperäisyys ja tekijäketju eivät ole ratkaistuja; ei automaattisesti väitetä tavallista teknistä siltaa taiteeksi eikä myöskään automaattisesti vapautuneeksi. **Ei hyväksytty kohde** nyt voimassa olevan tilausrajauksen nojalla.

### E. Juban stadion — uusittu urheilupaikka, ei vanha vapautunut rakennus

**Oma lähdekoordinaatti:** S7 WP **4.84306, 31.61583**; WD7 alkuarvo **4.843056, 31.615833**, precision **0.0001**, normaalirankki. Identiteetti on Juba Stadium, ei toinen suunniteltu stadion.

Lähteistettyjä institutionaalisia faktoja: monikäyttöinen urheilupaikka; jalkapallokäyttö; kansallisen joukkueen kotikenttärooli; paikallisseurojen Atlabara FC, Al-Malakia FC ja Al-Salam FC käyttö; vanha avaus 1900-luvulla; myöhempi uudistus/laajennus. [S7, johdanto ja historia]

**1873:** stadionia ei ollut. **Portti:** vanhan avauksen 1962 ja myöhemmän uudistuksen 2022–2024 ajankohdat ovat lähdemetatietoa, eivät tekijänoikeustodiste tai kaksi riippumatonta historiavarmennusta. Vanha ja nykyinen fyysinen rakennusketju erotettava; moderni suojattu stadionrakennusteos ei tule kartan kohteeksi. Artikkelissa on toteutuneita kapasiteetteja ja tulevan toisen stadionin suunnitelmia sekaisin: ei kapasiteettia pelaajatekstiin. **Pois valmiista kohdejoukosta.**

### F. Juban kansainvälinen lentoasema — opastieto ja vanha lentopaikkahistoria

**Oma lähdekoordinaatti:** S5 WP **4.87194, 31.60111**; WD5 **4.87201, 31.60112** (alkuarvo 4.87200556, 31.60111667). Piste tarkoittaa lentoasema-aluetta, ei vanhan lentopaikan tiettyä rakennusta. Tunnus **JUB**.

Seitsemän tekstifaktaa: lentoasema palvelee Jubaa; sijaitsee Keski-Equatoriassa; kuuluu kaupungin pohjois-/koillisosan ympäristöön; sen vanha lentopaikka raivattiin 1900-luvulla; pinta oli myöhemmin murskattu lateriitti; kiitotietä pidennettiin ja päällystettiin myöhemmässä vaiheessa; nykyinen terminaali on 2000-luvun uudisrakennus. [S5, johdanto ja History]

**1873:** lentopaikkaa ei ollut. **Portti:** uusien terminaalien ja osien rakennusteosoikeus ei ole ratkaistu. Lentokenttä on oppaan nimetty saapumispaikka ja H4:n historiallinen aihe, **ei ytimen nähtävyyskartan kohde** nykyisessä rajauksessa. T1:n kuvausrajoitus on erillinen nykyinen lupa-asia; ei sekoiteta sitä kuvassa näkyvän rakennuksen tekijänoikeuden päättymiseen.

### G. Jebel Kujur — hyvä paikallinen luontokohde, oma WP/WD-piste puuttuu

S11 yksilöi kukkulan, vanhan Korok-nimen, muodon, kaupungin kasvun ja materiaalinkäytön; K2:ssa seitsemän lähteistettyä faktanäkökulmaa. Luontokohde ei edellytä modernin rakennustaiteen pääaihetta. **Koordinaatti kuitenkin puuttuu.** `Jebel Kujur`, `Jebel Kujur Forest Reserve`, `Jebel Kujur in south sudan` ja kirjoitusasu `Jebel Kujuor` eivät tuottaneet omaa en-Wikipedia-kohdeartikkelia. fr-/ar-pääartikkelit eivät anna omaa pistettä, WD-omaentiteetin P625:tä ei ole löydetty. Karttapalvelun tai valokuvan koordinaattia ei siirretä WP/WD-lähteeksi. **Ei arvattua pistettä eikä valmista karttariviä.**

### H. Konyo Konyo — hyvä paikallinen markkinapaikka, oma WP/WD-piste puuttuu

S12 ja S19 yksilöivät markkinapaikan ja riittävän paikallisen faktajoukon K3:ssa. Toiminnallinen tori ei automaattisesti ole suojattu taideteos; mahdollinen uusi rakennus kuvan pääaiheena on silti eri oikeuskysymys. **En-Wikipedia-otsikot Konyo Konyo Market ja Konyokonyo eivät tuottaneet omaa artikkelia. Oma WD-entiteetti/P625 ei ole löydetty.** Hai Konyo Konyo -kaupunginosan karttapalvelupiste ei ole todistettu markkinapaikan omaksi WP/WD-pisteeksi. Puuttuvaa pisteen identiteettiä ei paikata sairaalan, sillan tai maahanmuuttotoimiston läheisellä pisteellä. **Ei hyväksytty karttarivi.**

### I. Vanha laituri ja Khor Bau — historia on paikallista, piste ei vahvistettu

S9:n laituri ja S10:n Khor Bau on yksilöity topografisessa historiassa. Joen yleis-P625 tai Juban kaupungin P625 ei kuitenkaan tarkoita vanhaa laituria, puron omaa nimeä tai jokisuualueen täsmällistä paikkaa. **Oma WP/WD-piste puuttuu**, eikä sitä piirretä vanhasta kartasta käsin. Valkoinen Niili kokonaisena jokena ei korvaa paikallista rantakohdetta.

### J. Kirjasto, teatteri ja vanhat kivitalot — kohdeketju avoin

Kirjaston Gudele-paikannus on S18:ssa, Juba Picture House/Hai Cinema S13–S14:ssä ja vanhat kivitalot S1/S16:ssa. Oman hyväksyttävän WP/WD-kohdepisteen lisäksi tarvitaan yksittäisen rakennuksen tai paikkakokonaisuuden identiteetti sekä nykyosien/tekijöiden ketju. Yliopiston tai kaupungin yleispistettä ei käytetä näiden sijaisena. Hotellin purku, teatterin muuttunut käyttö ja pankkien uudet osat on erotettava. **Ei valmis karttakohde**, vaikka faktateksti soveltuu lehteen.

### K. Rejaf — rajauksen ja identiteetin vuoksi pois

S6:n yhteisöpiste **4.75167, 31.60972**, WD6:n karkea **4.75000, 31.58333** eivät vastaa toisiaan eikä kumpikaan todista Jebel Rejafin huipun tai vanhan lentovenepaikan pistettä. Paikka ei ole Juban historiallinen ydinkohde. Yhteisöartikkelin sotilaalliset tapahtumat ja Gondokoroa lähellä oleva vanhan jokiliikenteen kertomus eivät täytä puuttuvaa keskustakarttaa. **Ei lisätä kohdekiintiöön.**

## 6. Viisi kysymysaihetta ja kolme tietoa

Nämä ovat C:n kysymystyön lähdeaiheet. Vastaukset kirjoitetaan myös lehtitekstiin. Vihje auttaa oikeaan havaintoon eikä toista vastausta; neljä vaihtoehtoa ovat samaa lajia ja suunnilleen yhtä pitkiä. Oikea vastaus ei ole toinen pelikaupunki.

| Taso | Kysymysaihe | Oikea vastaus ja tekstikohta | Vihjeen suunta | Lähde |
|---:|---|---|---|---|
| 1 | Minkä maan pääkaupunki Juba on? | Etelä-Sudan; artikkelin intro/perusfaktat | Maan nimi erotettava samannimisestä pohjoisemmasta valtiosta; ei vastaus suoraan vihjeeseen. | S1, johdanto |
| 2 | Mikä auttoi uuden hallintokaupungin paikan valinnassa jokiliikenteen ohella? | Paikalla ollut koulu; K1 | Mieti paikkaa, johon ihmiset tulevat oppimaan. Lopullinen vihje ei mainitse oppilaitoksen nimeä tai vaihtoehdon sanaa. | S1, History |
| 3 | Mitä Jebel Kujur on toimittanut kaupungin rakentamiseen? | Kiveä ja soraa; K2 | Vastauksen käyttö liittyy teihin ja betonirakentamiseen, ei maagiseen uskomukseen. | S11 |
| 2 | Mihin Konyo Konyosta välitetään tuotteita? | Pienemmille toreille; K3 | Ajattele ostoksia pidempää tavaran matkaa; ei sama vaihtoehtosana vihjeeseen. | S19, County Overview |
| 3 | Miksi Hai Cinema -nimi säilyi, vaikka vanhan elokuvateatterin käyttö vaihtui? | Nimi muistuttaa alueen teatterihistoriasta; H2 | Katso paikan aiempaa käyttöä, älä nykyistä kylttiä. | S14 |

**Kolme tiesitkö-aihetta:**

1. Nykyinen Juban kaupunkirakenne on nuorempi kuin paikalla aiemmin asunut kyläyhteisö. [S1, History; K1]
2. Jebel Kujurin kiviaines on ollut yksi kaupungin rakennusmateriaaleista. [S11; K2]
3. Elokuvateatterin toiminnan päätyttyä sen muisto jäi Hai Cinema -alueen nimeen. [S14; H2]

Ei tarkkoja historiallisia määrälukuja, sääasteita, maan musiikki-/kielitarinoita tai isoisän keksittyjä havaintoja. Minitehtävän kartalta puuttuvat pihat ja polut eivät ole yksi näistä kysymyksistä.

## 7. Kuvatarpeet B:lle

**A ei ole hakenut tai valinnut Commons-kuvia.** Seuraavat roolit ovat tutkimiseen annetut aihe- ja identiteettivaatimukset, eivät hyväksytyn kuvaluettelon tiedostonimiä. Kuva katsotaan ja Commons-tiedostosivun lisenssi, Artist, koko ja Restrictions tarkistetaan omistajan hyväksytyllä lähdekanavalla. Kuvan tekijän oikeus, kuvatun teoksen oikeus, mahdolliset erityisluvat sekä paikan kuvaus-/käyttörajat ovat eri portit.

| Rooli | Kuva-aihe | Identiteetti ja rajaus |
|---|---|---|
| Kansi 1 | Laaja Juban kaupunkinäkymä | Nimetty kaupunki; suojattu nykyinen rakennusteos, muistomerkki tai mainos ei pääaiheena. |
| Kansi 2 | Juban Valkoisen Niilin rantaympäristö | Oma paikannus; ei Gondokoroa Juban ydinkeskustana. Ei modernia siltaa teospääaiheena. |
| Kansi 3 | Jebel Kujurin luonnonmuoto ympäristössä | Kukkula tunnistettava omakseen; ei mielivaltaista Juba-alueen mäkeä. Kansi on laaja ympäristökuva. |
| K1 | Vanha koulun aikainen kaupunkinäkymä tai yleinen koulutyön väline | Ei väitettä juuri Nugent-koulun rakennuksesta ilman identiteettitodistetta. |
| K2 | Kujur tai kiviaines | Luonto-/materiaaliaihe; nykyiset louhintalaitteet tai mainostetut merkit eivät pääaiheena. |
| K3 | Konyo Konyon tunnistettu tori tai tuoretuotteet | Väärä “Juba market” -kuva ei yksin nimeä toria; yleiseksi vaihto kirjataan. |
| K4 | Kirjat ja lukeminen | Oma kirjaston kuva vain tunnistettuna; geneerinen hylly nimetään geneeriseksi. Suojattu kansitaide ei pääaiheena. |
| H1 | Vanha kartta tai kartanlukuväline | Karttateoksen oma oikeus ja digitoinnin ketju. Arkistosivun löytö ei ole Commons-lisenssi. |
| H2 | Vanha projektori/katsomo | Tekninen kuvitus voi olla yleinen; ei kuvassa suojattua elokuvajulistetta tai ruutua. |
| H3 | Vanha kauppakatu/yleiskuva | Eri talot ja rakennusvaiheet erotettava. Ei oleteta vanhaa Juba Hotelia kokonaan säilyneeksi. |
| H4 | Vanha Juban lentopaikka/laituri | Arkistokuvan oma kuvaaja ja kuolin-/lisenssiketju. Ei vedosta olemassa olevaksi vuonna 1873. |
| Matkailijalle | Tuore maltillinen pysty Kujurin luonnonmuodosta tai tunnistetusta arkitavaran yksityiskohdasta | Leveys/korkeus 0.60–0.85, yksi aihe. Ei nykyaikaista suojattua julkisivua tai tunnistettavaa lähikasvoa. |
| O1 | Nykyinen yleinen tienäkymä | Ei lentokentän kuvaamista ehdottava toiminta, ei väärä matkustuslupaus. |
| O2 | Tuore torin yleiskuva | Oma paikannus ja eri tiedosto kuin K3. |
| O3 | Kujur tai yleinen lukemisen väline | Ei suojattua kampusrakennusta pääaiheena, ei väärä kirjastopaikka. |
| O4 | Ful medames tai yleinen härkäpapukuva | Ei yleistä papuannosta väärällä nimellä; tarvittaessa selvä geneerinen rajaus. |
| O5 | Luonnonympäristö | Ei vuodenaikaa, kuukautta tai aste-/sademäärää päätellä kuvasta. |
| Karttakohteet | Vasta hyväksytyn paikkajoukon mukaan | Katedraali/yliopisto/sairaala/silta/stadion/lentoasema ovat tässä ehdollisia tai poissuljettuja, eivät kuvauskohdetilaus. |
| Matkakirjan valokuva | Nykyinen laaja kaupungin/luonnon kuva, jos hyväksyttävä | Ei ennen–nyt-paria ilman hyväksyttyä vanhaa PD-kuvaa. Ei keksittyä vuoden 1873 kaupunkikuvaa. |

**Tekniset ehdot:** vähintään 1200 pikselin leveys; PD/CC0/CC BY/CC BY-SA; ei NC/ND/fair use. Artist sanatarkasti metatiedosta, käyttäjänimestä ei arvata henkilönimeä. Jokainen tiedosto katsotaan; ei vesileimoja, arkistoleimoja, aikaleimoja, kuvan päälle lisättyjä tekstejä, mainospääaiheita, tunnistettavia lähikasvoja tai epäterävää todistuskuvaa. Sama tiedosto kerran kaupungissa, sallittu ennen–nyt/valokuva-poikkeus erikseen.

**Teosoikeus:** Etelä-Sudanin kaupallista FOP-oikeutta ei ole tässä varmennettu. Puuttuva FOP ei palauta päättynyttä tekijänoikeutta; toisaalta vanha rakennusvuosi ei yksin todista tekijän kuolemasta kuluneen yli 70 vuotta. Algeriaa ja Kap Verdeä koskevia PD/folklore-maksusäännöksiä ei siirretä tähän maahan ilman maakohtaista lähdetukea. Tilaajan voimassa oleva rakennus-/tekijäraja sekä #74 on ratkaistava pääsession toimitusportissa, ei kiertää valitsemalla toiminnallisen paikan nimeä kuvan suojatulle päärakennukselle.

**Paikan lupa:** T1:n valokuvaamista koskeva lupavaatimus ei ole sama kysymys kuin kuvan CC-lisenssi. A ei tilaa uutta paikan päällä kuvaamista eikä väitä Commons-kuvan lisenssin antavan yleistä matkailijan kuvauslupaa.

**Kuvattomuus:** oppaassa enintään kaksi viidestä jaksosta kuvatonta ilman erillistä poikkeamaa. Jos hyväksyttäviä nykykuvia ei löydy, B raportoi aidon vajeen eikä täytä roolia kuvan kohdetta väärin nimeämällä. Mahdollinen kuvaroolin vaihto muuttaa myös tekstin sisältöä ja selitettä näkyvästi.

## 8. Ristiriidat ja avoimet asiat

| Kohta | Havainto | Ratkaisu tässä A:ssa / puuttuva työ |
|---|---|---|
| Kaupungin ikä | 1922, 1920–21, 1927 ja 1928 koskevat eri lähteissä perustamista, koulua, rakentamista ja hallintopaikkaa. | 1900-luvun varhainen kehitys, ei yhtä tarkkaa perustamisvuotta. Kylää ei julisteta asumattomaksi. |
| 1873 | Kaupungin nykyiset instituutiot ovat myöhempiä, mutta lähteissä ei ole täydellistä kyläkohtaista tuon vuoden kartoitusta. | Ei isoisän toimia, oppilaitoksia tai nykyisiä kohteita tuohon vuoteen; vanha paikallinen asutus mainitaan yleisesti. |
| Väestö | Konteksti 690 918/2021 on piirikunta; WP:n kaupunki-, taajama- ja metroarviot eri laajuuksia. | Nimetty piirikunta, noin 690 000 tai kaupungin väkiluku pois. Ei näennäistä ajantasaista kaupungin väkilukua. |
| Kartan kohdemäärä | Ei kuutta–kahdeksaa hyväksyttyä historiallista/natural paikkaa. | **A avoin karttavajeen vuoksi**, ei suurkaupungille automaattista pienen kaupungin poikkeusta. |
| Kujur ja Konyo Konyo | Hyvät paikalliset lähteet ja faktat; oma WP/WD-piste puuttuu. | Ei kaupungin, kaupunginosan, sillan tai lähiviranomaispaikan sijaispistettä. Tarvitaan oma hyväksyttävä koordinaattilähde tai toimituksen lähdepoikkeama. |
| Khor Bau ja laituri | Historiassa täsmällisiä paikallisia nimiä; yleisjoen piste ei niiden sijainti. | Ei käsin kartasta luettuja pisteitä. |
| Pyhä Teresa | Rakennusvaihe vs. myöhempi katedraaliasema; tekijäketju ei tiedossa. | Ehdollinen dossieri, ei hyväksytty kohde tai kuva. |
| Yliopisto | Kampuspiste on instituutiolle, ei vanhalle koululle tai nimetylle talolle. | Ei kampuspistettä historialliselle rakennukselle eikä instituution ikää nykyjulkisivun oikeudeksi. |
| Sairaala | S8:n opetussairaalan avaus 1975 vs. S16:n vanha sairaala 1940-luvulla ja S10:n kartoissa. | Toimintavaiheita ei yhdistetä yhden PD-talon todistukseksi; ei nähtävyyskohde nyt. |
| Silta | 1972/1974 alkuvaihe ja 2006 korvaavat rakenteet. | Vuosisata; nykyosat erikseen. Freedom Bridge ei sama silta. Ei vanhan materiaalin perusteella koko sillan hyväksyntää. |
| Stadion | Vanha avaus ja nykyinen uudistus; toteutunut kapasiteetti vs. toisen stadionin suunnitelma. | Ei kapasiteettia, tekijä- ja rakennusketju avoin; pois hyväksytystä kartasta. |
| Hotelli | S1 “mid-1930s”; S9 kertoo hotellin valmistuneen 1929; S16 kertoo suurelta osin puretuksi. | Varhainen 1900-luku ja erillinen purku/säilyneet osat. Ei tarkkaa vuotta tai kokonaan säilynyttä nykyhotellia. |
| Elokuvateatteri | S14 puhuu 1960-luvulla perustetusta, S13 kuvaa aiempaa Picture House -vaihetta. | 1900-luku; ei yhtä tarkkaa avaamisvuotta. Eri vaihe/identiteetti ratkaistava ennen rakennuskohdetta. |
| Keihäsanekdootti | S13 varoittaa yleisistä, luultavasti epätosista yleisöä koskevista kertomuksista. | Pois kokonaan, vaikka yksittäinen haastattelu toistaa sen. |
| Kirjasto | Suunnittelu vs. avaus; 13 000/15 000 kirjaa; osa palveluista tulevia suunnitelmia. | Yleinen kirjasto, perustajat, kokoelma ja lukemistavoite. Ei määrää, päiväystä, nykyisiä palvelu-/aukiololupauksia. |
| S15/S9 ulkoinen reitti | S9:n Léopoldville/Brazzaville/Kinshasa-sulkeet maantieteellisesti sekaiset. | Ulkopuolinen reittikuvaus pois; vain varmistettu Juban tie-/laiturirooli. |
| S16 kuningatar | Vain “it is believed”, ei luettua alkuperäistä vahvistusta. | Ei anekdoottia. |
| Sää | Alkuperäinen työkalu hylkäsi vuosi-/kuukausisumman. | `saatiedot:null`, ei aste/mm-lukuja, korvaavaa datasettiä tai parhaan matkakuukauden laskentaa. |
| Nykyinen opas | V1:ssä vanhoja Sudan-viisumeita, aikatauluja ja käyttötilanteita; T1 poistumiskehotus. | UM:n nykyrajaus; ei hinnastoja, vanhoja lentolistoja, ulkoilu-/kulkusuosituksia tai nykykonfliktin tarinaa. |
| Kuvan oikeus ja paikan lupa | CC-valokuva ei vapauta suojattua päärakennusta eikä anna kuvauslupaa paikan päälle. | B:n erilliset kuva/teos/lupa-portit; A ei hyväksy. |

### Hakujen täsmälliset epäonnistumiset

Omistajan hyväksytyllä kanavalla tehty `History of Juba` ohjautui pääartikkeliin ja tuotti saman tekstin: **ei itsenäinen toinen historialähde**. Oman paikkatekstin 404:t: Jebel Kujur; Konyo Konyo Market; All Saints Cathedral, Juba; Juba Public Peace Library; Juba Public Library; South Sudan National Archives; St. Joseph Church, Juba; Konyokonyo; Juba National Game Reserve; Jebel Kujur Forest Reserve; Hai Malakal; Munuki; Jebel Kujur in south sudan; Jebel Kujuor. `Malakia` on georgialainen henkilönnimisivu; `Kator` ohjaa afganistanilaiseen Katir-kansaan: **ei käytetä Juban paikantamiseen tai faktoihin**. Juba-kategorian lyhyt raakateksti ei anna kadonneita paikkapisteitä.

Aluksi väärät Juba in the Making -slugit `river-port`, `juba-town-hai-jallaba-mosque`, `juba-town-hai-jallaba`, `juba-public-peace-library` ja pitkä väärä aviation-slug palauttivat 404. Oikeat luetut osoitteet ovat S9–S16:n taulukossa. Sydneyn yliopiston väärä `/news-opinion/`-osoite palautti 404; oikea Business School -osoite on S17. Kirjastosäätiön `www.southsudanlibrary.org` ei ratkennut verkossa: ei teeskennelty luettua virallista nykyistä palvelusivua. Tarkistusloki ja mahdolliset virheet ovat NAS:lla.

## 9. Poisjätöt ja toimituksen portit

### Tietoiset poisjätöt

- John Garangin mausoleumi, uudet patsaat, muistomerkit, Freedom Bridge ja modernit nykyiset rakennusteokset: ei hyväksytyiksi kuvapääaiheiksi tai karttakohteiksi epävarmalla tekijäketjulla. Kontekstin maamerkin olemassaolo ei ole suojatun teoksen hyväksyntä.
- Gondokoron saari/kauppa-asema, purjehduskelpoisuuden rajatarina ja pitkän Niilin retken kertomus: jo olemassa oleva lähinosto, ei uusi kaupunkinosto eikä kohdemäärän täyte.
- Bandingilon ja kaukaisten suojelualueiden lisääminen kaupungin ytimeen: ei kartan paikkaus.
- Maalehden kuningas-/oraakkeli-/kielisynty-/Skylarks/Rejaf Jazz -tarinat, maapähkinäpata, taikinan kaksi käyttötapaa, suuri kala ja karjan asema: toistoraja luettu, jätetään pois uusista nostoista.
- Juba in the Making -sivujen nykysota, nykypolitiikka, rikollisuus, inflaatio ja ihmisten kurjuuden dramatisointi: ei pelaajan kaupunginkuvaksi. Sama rajaus koskee pääartikkelia, CSRF-profiilia ja kirjaston perustamiskertomusta.
- “Maan ensimmäinen”, “uusin”, “suurin”, ennätys-/suosituinlentokenttä- ja lukutaitosuperlatiivit: ei ilman kahden riippumattoman lähteen porttia. Harhaanjohtava lentoaseman huonouslista ei ole kaupungin nosto.
- V1:n hinnat, kellonajat, Sudan-viisumi, yöelämä-, retki- ja liikkumislupaukset: eivät tämänhetkiseen oppaaseen.
- Kokonainen vanha hotelli nykykuvassa, tuntemattomat rakennusarkkitehdit, koordinaattien arvaaminen ja yleisjoen piste paikalliseksi laituriksi: ei.
- Ilmastolukujen manuaalinen korjaus tai kopiointi: ei. `saatiedot:null` pysyy tarkoituksellisena poikkeamana.

### Vaihevalmius

| Portti | Tila |
|---|---|
| A:n lähteet, osiot 0–9, 4+4 aihetta, 5 opasjaksoa, visa/tiedot ja toistorajat | **Koottu ja lähteistetty**; lukujen epävarmuus ja poisjätöt kirjattu. |
| A:n kohdekartta / 6–8 hyväksyttävää paikallista paikkaketjua | **Avoin.** Omat koordinaatit löytyvät lähinnä teosketjultaan ehdollisille tai rajaukseen sopimattomille nykyinstituutioille. Kujur ja Konyo Konyo tarvitsevat oman hyväksyttävän WP/WD-pisteen. |
| Sää | **Tarkoituksellinen null.** Alkuperäinen ajon hylkäys, ei A:n tekemä käsidata. |
| B kuvat ja oikeudet | **Ei tehty A:ssa.** Aihe- ja identiteettiohje osiossa 7, ei Commons-hakuja tai lisenssivarmennusta. |
| C teksti ja sisältö-JSON | **Ei tehty.** Faktapohja on lähdeaineisto ja kirjoitussuunnitelma. |
| D kuvatekstien näyttöä vasten tarkistus | **Ei tehty.** Edellyttää oikeat B-kuvat ja C-tekstit. |
| E/F lukujen, paikkojen, työkalun ja julkaisukelpoisuuden portit | **Ei kuitattu.** Karttavaje ja teos-/koordinaattipoikkeamat on ratkaistava erikseen. |
| Git, erätarkistus, yhdistäminen, julkaisu | **Ei tehty tässä tehtävässä.** Pääsession vastuu. |

**Palautus pääsessioon:** Juban teksti- ja lähdevalmistelu on tehty, mutta koko A:ta ei lasketa hyväksytyksi ennen karttavajeen ratkaisua. Neljän kansiaiheen ja neljän teema-aiheen kirjoittaminen voi jatkua lähdepohjaisesti. Puuttuvia koordinaatteja tai rakennusoikeuksia ei keksitä, FOP/70 vuoden toimituskysymystä ei ratkaista hiljaa tässä A:ssa.
