/*
 * !!! AGENTIT VAIN OPUS JA SONNET. FABLE-MALLIA EI KOSKAAN AGENTTINA !!!
 * (omistaja 1.9.2026 ja 7.9.2026 — sitova, ensimmäinen sääntö;
 * parvina saa ajaa. Fablemax-agenttityyppi poistettu 7.9.2026.)
 *
 * TYÖTAPA JA SESSIOT (roolit, viestintä Fablelle, tokenikuri): Ydinajatus-
 * osion kohta 2, sitova 20.9.2026. Päätösloki: docs/raamattu-loki/.
 *
 * RAAMATTU — koko pelin idea yhdessä tiedostossa. Vain Fable
 * kirjoittaa. Ristiriidassa hyväksytty osio voittaa muut dokumentit.
 * Lähdekaanon: docs/tarina.md ja docs/isoisan-raamattu.md.
 * Kirjoitettu uusiksi äärimmäisen tiiviiksi 15.8.2026 (omistajan
 * tilaus); vanhat sanamuodot git-historiassa.
 */

export const RAAMATTU = {
  paivitetty: '13.9.2026',
  johdanto: 'ENSIMMÄINEN SÄÄNTÖ: AGENTIT VAIN OPUS JA SONNET, FABLE-MALLIA EI KOSKAAN AGENTTINA (omistaja 1.9. ja 7.9.2026; parvina saa ajaa). Koko pelin idea yhdessä dokumentissa — tämän lukeminen '
    + 'riittää pelin kehittämiseen. Käydään läpi omistajan kanssa osio kerrallaan; valmis Raamattu laukaisee kaikkien matkakirjatekstien uudistuksen. ILMAISU: äärimmäisen lyhyt ja yksiselitteinen — '
    + 'selkeys tärkeintä.',
  osiot: [
    {
      otsikko: 'Ydinajatus ja kohderyhmä',
      tila: 'hyväksytty 11.8.2026',
      kohdat: [
        '!!! AGENTIT VAIN OPUS JA SONNET — FABLE-MALLIA EI KOSKAAN AGENTTINA, EI EDES VAIKEAAN ONGELMAAN, EI KYSYMÄLLÄKÄÄN !!! (omistaja 7.9.2026 ilta, sanatarkasti: "Onhan sinulla ohjeena selvä, '
          + 'että agentteina saa käyttää vain opusta ja sonnettia. Mutta voit niitä ajaa parvina." ja "Tämä on todella tärkeä sääntö ja jostain syystä se aina lipeää pois siitä."): jokainen '
          + 'ali-agentti, parvi ja workflow-ajo ajetaan Opuksella (koodi, sisältö) tai Sonnetilla (lukeva työ, tarkistukset). Vaativakin työ jaetaan Opus-parvelle. Fablemax-agenttityyppi on '
          + 'poistettu reposta 7.9.2026. Sama sääntö on CLAUDE.md:n ja docs/roolitus.md:n ensimmäisellä rivillä. Kumoaa 1.9.2026 kohdan poikkeuksen "todella vaikeaan ongelmaan kysyen".',
        'VAIN EUROOPPA, KUNNES OMISTAJA TOTEAA SEN VALMIIKSI — EI KOSKE LINSSEJÄ: LINSSIT (ISS, radio, datalinssit, aikajanat, alue- ja virtalinssit) JA NIIDEN UUSI SISÄLTÖ KATTAVAT AINA KOKO '
          + 'MAAILMAN; älä rajaa linssejä Eurooppaan äläkä kysy siitä (omistaja 13.10.2026 klo 23.5x: "usko jo että linsseissä ei ole mitään Eurooppa rajoitusta"). (omistaja 27.9.2026 klo 13.5x, '
          + 'sitova, kaikki roolit): sisältöä, nostoja, lehtiä, kuvia, malleja ja karttatyötä tehdään nyt vain Euroopan kaupunkeihin ja maihin. Muihin maanosiin ei tehdä mitään uutta (ei aloituksia, '
          + 'ei pilotteja, ei suunnitelmia), ennen kuin omistaja on todennut Euroopan omasta mielestään valmiiksi; siirtymä muihin maanosiin vain omistajan erillisellä päätöksellä. Olemassa oleva '
          + 'maailmanlaajuinen sisältö ja pelin maailmanlaajuiset perustoiminnot (pallo, kartta, lennot) pysyvät ja niiden vikoja korjataan. KOHDEKAUPUNGIT VAIN EUROOPASTA (omistaja 11.10.2026 klo '
          + '20.3x, TF 182 -kuvasta: "piti näkyä vain euroopan kohteet"): rajaus koskee myös kohdekaupunkeja, eli pelaajalle tarjotaan matkan kohteiksi vain Euroopan 50 kaupunkia (Istanbul mukaan '
          + 'lukien). LINSSIT EIVÄT KUULU RAJAUKSEEN (omistaja 28.9.2026 klo 23.4x; linjaus koskee vain karttaa ja sisältöä): linssit (radio, ISS ja astronautin kamera, datalinssit, aikajanat, alue- '
          + 'ja virtalinssit) kattavat koko maailman, esim. radiolinssiin kaikki maailman maat. Sama koskee linssien omaa sisältöä, myös linssien 3D-malleja ja kohdekohtaista työtä (omistaja '
          + '6.10.2026 klo 23.5x; esim. elävän oppaan kuvat ja Gizan pyramidien omat mallit). KIELLETTY KAUPUNKI ON OMISTAJAN ERILLINEN POIKKEUS (omistaja 7.10.2026 klo 01.3x): Pekingin Kielletty '
          + 'kaupunki tehdään omana dioraamana ilman Cesiumia (kuten linna); poikkeus ei avaa muita Euroopan ulkopuolisia kohteita. KOEKAUPUNKI PEKING (omistaja 10.10.2026 klo 09.3x, kortti "Kyllä, '
          + 'yksi koekaupunki (suositus)"): Kielletyn kaupungin ympäristö (Jingshan, Beihai, Taivaallisen rauhan aukio ja hutongit, noin 2 × 2 km) tehdään koekaupunkina, jolla verrataan avoimesta '
          + 'aineistosta (OSM, 3D-GloBFP CC BY 4.0, omat julkisivut Blenderissä) tehtyä kaupunkia Googlen 3D-kaupunkiin; taidemuseo menee sen edelle, koekaupungin tekee Codex pääkaupunkien jälkeen '
          + '(omistaja 11.10.2026 klo 18.0x, ks. TYONJAKO FABLE / CODEX), eikä poikkeus avaa muita Euroopan ulkopuolisia kohteita (muoto ja suojatut teokset: PEKING JA SUOJATUT TEOKSET). EUROOPAN '
          + 'KAUPUNKIEN OMAT BLENDER-PARANNUKSET ODOTTAVAT (omistaja 7.10.2026 klo 01.3x): Tallinna, Visby ja muut kaupunkien 3D-parannukset aloitetaan vasta omistajan päätöksellä; ensin Olavinlinna '
          + 'valmiiksi. EGYPTI (GIZA) ON TOINEN POIKKEUS (omistaja 7.10.2026 klo 08.4x): nykyajan oppaan Giza viedään kokeeksi omilla Blender-malleilla mahdollisimman valmiiksi, mutta sen jälkeen ei '
          + 'tehdä muita kaupunkeja, ja Egyptistä tehdään historiallinen versio (ks. HISTORIALLISET KOHTEET SEIKKAILUINA). ALOITUSKARTAN VIHJEET ON POIKKEUS (omistaja 15.10.2026 klo 18.10 ja 18.31): aloituskaupunkia valittaessa kartalla voi olla vihjeitä mielenkiintoisista paikoista ympäri maapalloa kartan tyylillä ja paletilla, mutta ne tehdään vasta, kun jokaiselle on selkeä suunnitelma siitä, mitä paikassa tapahtuu (18.31: "Tehdään ne vasta kun niile on tehty selkeä suunnitelma mitä niissä tapahtuu"); poikkeus ei avaa muuta sisältöä Euroopan ulkopuolelle.'
          + 'KAIKKI MAAT JA PÄÄKAUPUNGIT ON POIKKEUS (omistaja 10.10.2026 klo 11.5x, '
          + 'PÄÄKAUPUNKIEN ESITTELYT ARVIOIDAAN ITSE (omistaja 16.10.2026 klo 19.51: "Älä kysy näistä minulta: pääkaupunkien esittelyt. Osaat itse arvioida nämä"): kartan ja oppaan esittelyt sekä niihin liittyvät historiaosiot arvioi PT riippumattomalla tarkistuksella (tosiasiat, kaanon, Williamin ääni, pituus), korjataan ja avataan pelaajille ilman omistajan rastia; omistajalle vain yksi rivi, kun kaupungit ovat auki. '
          + 'kortti "Kaikille 171 (suositus)", ja 12.0x): jokaiseen maailman maahan tulee pääkaupunki, maan ja kaupungin perustiedot ja rajat (puutelista '
          + 'docs/raportit/puuttuvat-maat-ja-paakaupungit-20261010.md; järjestys Eurooppa → Kaukasus ja Lähi-itä → Afrikka → Aasia → Amerikat → Oseania, PR per alue). Minivaltiot (Andorra, '
          + 'Liechtenstein, Monaco, San Marino, Vatikaani) saavat kevyen sisällön: lippu, perustiedot, 3–5 lauseen esittely, ei maalehteä. Pääkaupunkipiste on oma kokoelma '
          + 'kokoelmat/paakaupungit.json eikä pysäkki (ei reittejä eikä välisääntöä; reitit vain omistajan päätöksellä): se piirretään olemassa olevalla kaupunkimerkillä ja nimellä pienimmässä '
          + 'tärkeysluokassa, pelin pysäkit voittavat päällekkäisyydessä, ja napautus avaa olemassa olevan maakortin (natiivi ja web samoin). Maat, joilla ei ole laudan kaupunkia, näyttävät '
          + 'pääkaupunkinsa aina, koska se on ainoa tie maahan; kohdemaan sääntö ("vain pelaajan maan kaupungit") koskee vain maita, joilla on laudan kaupunkeja (Päätoimittaja 14.4x). Codexilta '
          + 'tilataan 2 havainnekuvaa jokaiselle 171 pääkaupungille, joilta ne puuttuvat (342 kuvaa, fotorealistiset, havainnekuva-merkintä, Eurooppa ensin). Päiväntasaajan Guinean pääkaupunki on '
          + 'Ciudad de la Paz (asetus 2.1.2026; lähteet ArchDaily, Le360 ja allAfrica; esittelyssä mainitaan Malabo). Jerusalem on kaupunkina ilman kannanottoa ja Ramallah Palestiinan hallinnon '
          + 'paikkana: Jerusalemille ei tule pääkaupunkipistettä, ja Israelin maakortissa lukee "hallinnon paikka: Jerusalem" symmetrisesti Ramallahin kanssa, ilman kannanottoa pääkaupunkikiistaan '
          + '(Päätoimittaja 15.0x). POIKKEUS 10.10.2026 klo 21.5x (omistaja kortilla): 118 kevyen pääkaupunkipisteen täysi tekstisisältö tehdään koko maailmalle, Eurooppa ensin: erät e01–e03 '
          + 'pilvisessioissa (Sonnet, effort low) ja e04–e14 Codex (omistaja 11.10.2026 klo 17.5x, ks. TYONJAKO FABLE / CODEX); muu uusi sisältö muille maanosille vaatii yhä omistajan erillisen '
          + 'päätöksen. Loki: docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 11.10.2026: VAIN EUROOPPA (11.10.2026 klo 15.44).',
        'LATAUS ON SAMA KAIKILLA VERKOILLA — EI EROA WI-FIN JA MOBIILIDATAN VÄLILLÄ (omistaja 25.9.2026 ja 4.10.2026 klo 14.5x, SITOVA, kaikki roolit, kaikki lataukset; omistaja 4.10. sanatarkasti: '
          + '"tee lataus samalla tavalla riippumatta onko wifiä vai ei. olen sanonut tästä jo monta kertaa että ei tehdä eroa näiden kahden välillä."): sovellus lataa, esilataa ja päivittää kaiken '
          + '(sisältöpaketit ja niiden deltat, linnat ja muut dioraamapaketit, laatat, kuvat, äänet, ISS-kameran kuvat ja tulevat paketit) TÄSMÄLLEEN SAMALLA TAVALLA Wi-Fi- ja mobiiliverkossa: ei '
          + 'kokorajoja, ei lykkäystä mobiiliverkossa eikä Low Data Mode -tilassa, ei "vain Wi-Fillä" -asetuksia eikä pelaajalle esitettäviä kysymyksiä verkon takia. Koodin latauspolulla ei ole '
          + 'verkkotyypin mukaisia ehtoja (ei NWPathMonitorin isExpensive-, isConstrained- tai cellular-haaroja); tunnistuskoodi saa jäädä valmiuteen käyttämättömänä. Ehdotuksia, suunnitelmia tai '
          + 'vaihtoehtoja, joissa verkkotyypit erotellaan, EI tehdä eikä viedä omistajalle. Erottelua harkitaan vasta, jos peli julkaistaan Yhdysvalloissa, ja silloinkin vain omistajan erillisellä '
          + 'päätöksellä. Tausta: Päätoimittaja vahvisti 4.10. Olavinlinnan esilataukseen Wi-Fi/mobiili-erottelun, vaikka sama kielto oli jo 25.9. linjattu.',
        'NATIIVI ENSIN, WEB RAJATUMPI (omistaja 29.9.2026 klo 19.2x, sitova; KUMOAA kaikki "web on malli, natiivi seuraa" -linjaukset; rajatumpi web kannustaa lataamaan sovelluksen): sovellus '
          + '(Unity) johtaa: linssit, linna ja uudet näkymät tehdään natiivin parhailla keinoilla (Unityn valaistus, Blender, fotogrammetria, Cesium) ilman web-versiota. Web-pelin käyttöliittymä on '
          + 'tauolla: ei uusia web-PR:iä eikä pariteettityötä; webiin kuuluvat muutokset kirjataan docs/web-jono.md:hen ja tehdään myöhemmin yhtenä eränä. Sisältö, kartta ja työkalut jatkuvat, koska '
          + 'natiivi käyttää niitä. Tuotannon pelaajalle näkyvät viat korjataan. EI WEBIÄ LAINKAAN (omistaja 3.10.2026 klo 19.00, kortti): myös ajattelijat tehdään suoraan natiiviin, eikä webiä '
          + 'käytetä luonnosalustanakaan; webin ajattelijalinssi jäädytetään kehittäjätilaan v14:n (#3902) jälkeen, ajattelijoiden data kulkee Linnanrakentajan luvuista suoraan natiiviin, ja '
          + 'omistajalle näytettävät tallenteet otetaan sovelluksesta. PARITEETTIMUUTOKSET VAIN OMISTAJAN LUVALLA (omistaja 30.9.2026 klo 22.2x): mitään ei muuteta natiivissa eikä webissä sillä '
          + 'perusteella, että toinen alusta tekee sen toisin; pariteettikatsaukset saa tehdä, mutta erot tulevat Päätoimittajalle yhdellä rivillä (web / natiivi / suositus), ja Päätoimittaja kysyy '
          + 'omistajalta kortilla. TESTIT: omistaja 29.9.: testi, joka ei ole pakollinen ja jonka omistaja voi itse testata, ohitetaan, jos se nopeuttaa kehitystä.',
        'EI SAAVUTETTAVUUSOHJEITA ULKOASUUN (omistaja 29.9.2026 klo 23.0x, sitova; vahvistaa 27.9. hylkäyksen): "älä tuo mukaan saavutettavuus ohjeita, ne pilaavat asettelun." Kukaan rooli ei muuta '
          + 'näkyvää ulkoasua saavutettavuusohjeiden (WCAG-kontrasti, 44 pt:n kosketusrivit, fonttiminimit) perusteella eikä ehdota sellaista. Sallittua on vain näkymätön: VoiceOver-nimet ja '
          + '-vihjeet sekä laajennettu osuma-ala ilman ulkoasumuutosta. Värit, koot ja välit tulevat omistajan palautteesta ja natiivin UI-pohjista ja tyylikirjasta.',
        'UUSIA ÄÄNIÄ EI GENEROIDA ILMAN OMISTAJAN LUPAA (omistaja 30.9.2026 klo 15.0x, sitova, kaikki roolit): kukaan rooli ei tuota uusia ääniä generoivilla palveluilla (puhesynteesi: ElevenLabs, '
          + 'xAI tai muu; tekoälyllä luodut ääniefektit ja musiikki) ilman omistajan erillistä, etukäteen pyydettyä lupaa. Syy on kustannus: lupapyynnössä omistaja näkee KAIKKI generoitavat tekstit '
          + '(tai ääniefektien kuvaukset) sanatarkasti sekä palvelun, määrän ja arvioidun merkkimäärän tai hinnan; generointi vasta hyväksytyistä teksteistä. Lupa koskee vain nimettyä erää. MÄÄRÄN '
          + 'PÄÄTTÄÄ OMISTAJA (omistaja 5.10.2026 klo 22.0x, sitova, myös Päätoimittaja): generoinnin määrä (leikkeet, otot, mallilauseet × nimet, merkit) on aina omistajan päätös: Päätoimittaja tai '
          + 'rooli ei kasvata erää omalla päätöksellään eikä tulkitse idean hyväksyntää määrän luvaksi. Lupapyynnössä on tarkka leikemäärä ja merkkimäärä, ja jokainen lisäys tai ylitys vaatii uuden '
          + 'luvan ennen generointia. Sama koskee striimiääntä testeissä (omistaja 6.10.2026 klo 08.39): roolien testit ajetaan testitunnuksella tai testiotsakkeella, jotka eivät koskaan tuota '
          + 'ääntä, ja ohitus (POLLO_AANILUPA) tehdään vain omistajan luvalla. Vapaat valmiit äänitteet (CC0/PD, lähde ja lisenssi kirjattuna) ja jo hyväksyttyjen äänien uudelleenkoodaus eivät ole '
          + 'generointia. MAKSULLISET LÄHTEET (omistaja 7.10.2026 klo 09.2x, sitova): maksullisia äänikirjastoja, liitännäisiä (myös Unity Asset Store) ja 3D-malleja käytetään, kun ne nopeuttavat '
          + 'työtä olennaisesti tai parantavat lopullista laatua; ostoehdotus (tuote, hinta, lisenssi, hyöty) tuodaan Päätoimittajan kautta omistajalle, joka ostaa. TOISTAISEKSI EI OSTOJA (omistaja '
          + '12.10.2026 klo 04.51: "Ei osteta mitään vielä"): ostoehdotuksia ei tuoda ennen kuin omistaja itse avaa asian; pilotit (taidehallin ilme ja elämä, linnan keittiön koehuone) tehdään vain '
          + 'vapaasti lisensoiduilla (CC0, CC BY, PD) ja omilla aineistoilla, jotka roolit saavat ladata ilman erillistä lupaa (omistaja 12.10. n. 04.52). SOUNDLY PRO (omistaja 9.10.2026 klo '
          + '14.4x–15.0x; ladataan laajasti myös pelin tulevaisuutta varten): ensin haetaan ilmaisesta Sonniss-kasasta, sitten Soundlysta pelin äänitarvekartoituksen erissä '
          + '(scratchpad/aanitarve-soundly-20261009.md); raakatiedostot NAS:lle (Matkakirja-arkisto/aanet/soundly/), jokainen eristysportin kautta, ja ämpäriin vain käsitellyt peliäänet. Tilaus '
          + 'pidetään voimassa niin kauan kuin aineistoa käytetään; jos tilaus lopetetaan, peliin viemättömät raakatiedostot poistetaan (EULA). Lataus tehdään Soundlyn Send to folder -toiminnolla '
          + 'koodaus-käyttäjän näytöllä, kun omistaja ei käytä sitä (ei cmd+shift-yhdistelmiä: omistajan pikanäppäinsovellus). ÄMPÄRI EI OLE JAKELUA (omistaja 9.10.2026 klo 00.15, sitova): pelin oma '
          + 'ämpäri (media.matkakirja.app) ei ole jakelua. Ostetut ja ladatut äänet ja 3D-mallit (esim. Sonniss, Fab, Asset Store) viedään sinne normaalia vientireittiä kuten muukin media; '
          + 'AssetBundle-pakettia, sovellukseen upottamista tai myyjän kirjallista vahvistusta ei vaadita, ja lisenssistä tarkistetaan vain, saako sisältöä käyttää pelissä (kaupallinen käyttö, '
          + 'nimeäminen, tekoälykoulutuskielto). Kumoaa Päätoimittajan 8.10.2026 klo 21.20 AssetBundle-linjan ja jakeluperusteella tehdyt hylkäykset: Sonnissin äänet kulkevat ämpärireitillä. '
          + 'SUOJATUT VALAISTUKSET (Päätoimittaja 10.10.2026 klo 03.3x): pelissä ei jäljitellä valaistussuunnitelmia, joita pidetään tekijänoikeuden suojaamina (esim. Eiffel-tornin yövalaistus ja '
          + 'tuntivälke). Maamerkit valaistaan yleisellä lämpimällä valonheittimellä, ja Eiffel-torni näkyy yöllä vain katuvalojen keskellä. SUOJATUT TEOKSET HAVAINNEKUVISSA (Päätoimittaja '
          + '10.10.2026 klo 09.2x): havainnekuvien tilauksiin (Codex ym.) ei oteta tekijänoikeudella suojattuja teoksia (veistokset, installaatiot, muistomerkit ja valaistukset, joiden tekijän '
          + 'kuolemasta on alle 70 vuotta, esim. Christon käärity Pont Neuf ja Epsteinin Wilden hautamuistomerkki); sellainen kohde jätetään pois ja mainitaan kuittauksessa. SUOJATUT TEOKSET '
          + 'KAIKISSA OMISSA JÄLJENNÖKSISSÄ (Päätoimittaja 11.10.2026 klo 15.5x ja 18.2x, Karttasepän ja Sisältökirjurin suojatarkastusten jälkeen): suojattu taideteos jätetään pois kaikista omista '
          + 'jäljennöksistä (kuvat, havainnekuvat ja 3D-mallit). Arkkitehtuuri ratkaistaan maan lain mukaan: missä rakennusten kuvausvapaus on (esim. Suomi ja Ruotsi), rakennus jää, ja muualla '
          + '(esim. Ranska) suojatusta rakennuksesta ei tehdä omia kuvia eikä malleja. Koska peli on kaupallinen, pelkkä ei-kaupallinen panoraamavapaus on sama kuin ei panoraamavapautta (esim. '
          + 'Bulgaria, Romania, Slovenia, Latvia, Ukraina, Kreikka, osin Viro ja Liettua). Googlen laattojen kohteet ja kertojan maininnat ovat sallittuja; Ranskan suojattu arkkitehtuuri (Louvren '
          + 'pyramidi, Pompidou, Grande Arche) on App Store -julkaisun tarkistuslistalla; POIKKEUS (omistaja 16.10.2026 klo 23.28 "Tehdään oma pyramidi"): Louvren lasipyramidi tehdään omana mallina (suojattu vuoteen 2089, voi joutua pois ennen App Store -julkaisua, tarkistuslistalla). Suojatarkastuksen RISKI- ja EPÄSELVÄ-kohteet vaihdetaan vapaaseen korvaajaan, muuten ne poistetaan. PEKING '
          + 'JA SUOJATUT TEOKSET (Päätoimittaja 10.10.2026 klo 10.2x, Linnanrakentajan kysymys): koekaupunki Peking tehdään omina Blender-malleina GLB-laattoina kaupunkitilaan kuten Notre-Dame ja '
          + 'Kuninkaanlinna, ei dioraamana eikä Cesium-laattoina; Tiananmenin Maon muotokuvaa ei mallinneta eikä tilalle tehdä tyhjää kehystä (suojattu teos, elävän taiteilijan maalaus; ei '
          + 'poliittista kannanottoa), ja iskulausetaulut tehdään ilman tekstiä tai jätetään pois. Kuvat ovat yhä vain PD/CC. Fakta (kerrottu omistajalle 9.10.2026 klo 00.28): ämpäriä ei voi selata, '
          + 'mutta tarkan osoitteen tietävä voi ladata yksittäisen tiedoston ilman kirjautumista, kuten peli itsekin lataa; linja pysyy, ellei omistaja muuta sitä. ElevenLabsin ääniefektit ovat '
          + 'sallittuja kuumailmapallon kokeilussa ("kokeillaan vain ensin"; katto 10 000 krediittiä), ja niitä verrataan muihin käytettävissä oleviin äänikirjastoihin. Pelin jo hyväksytyt '
          + 'ajonaikaiset puhetoiminnot (pelaajan käynnistämä luenta ja Pulun chat-puhe) jatkuvat ennallaan. Taustatapaus: Olavinlinnan keittiön 31 ElevenLabs-ääntä 29.9. tehtiin ilman lupaa; ne '
          + 'jäävät peliin, kunnes omistaja on kuunnellut ne ja päättää. ÄÄNIVALINTA (omistaja 30.9.2026 klo 23.1x): ElevenLabsilla käytetään aina v4-mallia (kaikki äänet toimivat sillä suomeksi), '
          + 'EI koskaan suomeksi merkattuja ääniä (kirjaston language/accent = fi/finnish), ja äänet valitaan ensisijaisesti ElevenLabsin eniten käytetyistä äänistä. Koskee lukijaa, Pulua, '
          + 'hahmoääniä ja kaikkia tulevia äänieriä. SUOMI LUKITTU JA SUOMENKIELINEN ALKU (omistaja 7.10.2026 klo 10.0x): kieli lukitaan aina suomeksi (language_code fi; omistaja 17.10.2026 klo 23.04 "pidä huoli että jatkossa aina suomi pakotettuna": JOKAINEN suomenkielinen äänigenerointi kaikilla malleilla ja työkaluilla ilman poikkeuksia, myös aikaleimat; kielikoodia tukematon malli hylätään virheellä ja automaattinen testi valvoo; Louvren alku äännettiin 13.10. ranskan aksentilla ilman pakotusta), ja koska malli ääntää '
          + 'tekstin alussa olevan vieraskielisen nimen silti vieraalla kielellä, ääneen luettava teksti alkaa aina suomenkielisellä sanalla (esim. "Katedraali Notre-Dame"). POIKKEUS KERTOJA '
          + '(omistaja 30.9.2026, muutettu 6.10.2026 klo 09.44): isoisän tekstit luetaan isoisän äänellä (Viisas Kertoja) mallilla eleven_v3, koska ääni ei toimi v4:llä, ja Euroopan valmiit isoisän '
          + 'äänet käytetään myös natiivissa; kaikki muut kertojat ovat William (eleven_v4_turbo, ks. MALLI): luennat, linssien (myös Ihmisen matka) ja linnan kertoja, nostot ja lukija. Omistajan '
          + 'erikseen valitsemat keittiön kokki ja vesipoika (30.9.) säilyvät. MALLI (omistaja 7.10.2026 klo 13.1x, sitova): kaikki uudet äänet (hahmot, kertojat, esittelyt, repliikit) generoidaan '
          + 'mallilla eleven_v4_turbo, joka on puolet halvempi kuin eleven_v4 ja jossa tunnetagit toimivat; määräarviot lasketaan sen hinnalla, ja isoisän eleven_v3-poikkeus pysyy (vahvistettu '
          + '14.10.2026 klo 12.16: isoisän teksti AINA vanhemmalla mallilla, resepti tools/generoi-avaus.mjs: Viisas Kertoja, eleven_v3, text-to-dialogue, stability 0,5). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 11.10.2026: UUSIA ÄÄNIÄ EI GENEROIDA (11.10.2026 klo 15.44).',
        'EI VARATEKSTEJÄ (omistaja 6.10.2026 klo 09.38, sitova: "Nuo varatekstit kannattaa poistaa koko pelistä. Se kuulostaa vaaralliselta, että siellä on roikkumassa tälläisiä tekstejä. Voivat '
          + 'äkkiä vain sotkea asioita."): peliin ei jätetä piilotettuja varasisältöjä, jotka koostavat tekstiä muusta aineistosta, kun oikea sisältö puuttuu (esim. saapumisen havaintovara '
          + 'paikkatiedon ensimmäisestä virkkeestä). Jos sisältöä ei ole, kohta jätetään pois. Näkyvä tilateksti, kuten "Matkalla — X", ei ole varateksti.',
        'AIKA: KARTASSA ELETÄÄN NYKYAJASSA, VAIN ESTETIIKKA ON VANHAA (omistaja 26.9.2026 klo 10.0x, sitova; yleinen sekaannus, joka toistuu koko ajan): pelin maailma on nykyaika — Fogg matkustaa '
          + 'tänään isoisänsä vuoden 1873 päiväkirjan jäljillä. Kartalla, nostoissa, elävissä elementeissä ja linsseissä saa siis olla nykyajan kohteita (Lontoon maailmanpyörä, Korintin kanava, '
          + 'nykyiset rautatiet) — vain ULKOASU on vanhaa (pergamentti, muste, 1873-rajat ja -lippu tyylinä, isoisän ääni). Vuoden 1873 tarkistusta ei tehdä nykyajan kohteille; vain isoisän '
          + 'päiväkirjan ja 1873-reittien sisältö on aikakauden mukaista. Kukaan rooli ei hylkää ideaa "koska sitä ei ollut 1873". LINNAN DIORAAMA (omistaja 1.10.2026: "Linnan ympäristö saisi '
          + 'mukailla linnan kultakauden aikaa"): linnan ympäristö mukailee dioraaman omaa aikakerrosta (Olavinlinna n1500 = 1500-luvun alku, ennen Savonlinnan kaupunkia 1639) — nykykaupunki, '
          + 'sillat, tiet, katot ja moottoriveneet pois, tilalle luonnonranta, vanha metsä ja harkiten ajan puurakennukset; linna itse, maasto ja vesi ennallaan (seikkailussa linna on vuoden 1499 '
          + 'asussa, ks. OLAVINLINNA OIKEANA VUODEN 1499 LINNANA).',
        'HISTORIALLISET KOHTEET SEIKKAILUINA MAAN TASALTA (omistaja 7.10.2026 klo 08.4x–08.5x, sitova): Olavinlinna, Kielletty kaupunki ja Gizan historiallinen versio (pyramidien kulta-aika, tarina '
          + 'ja elävät henkilöt kuten Olavinlinnassa) tehdään samalla moottorilla, mutta ENSIN VAIN OLAVINLINNA (omistaja 08.5x); Kielletty kaupunki ja Giza sen jälkeen. OLAVINLINNASSA PELIOSA ENSIN '
          + '(omistaja 7.10.2026 klo 13.3x, kortti "Kyllä, peliosa ensin"): kehitys keskittyy ensimmäiseen pelattavaan palaan (Laituri → Keittiö → Kappeli); vanhaan linnakierrokseen ja sen '
          + 'kohtauksiin tehdään vain virhekorjaukset, ja puhujakuvista on luovuttu, koska ilmeet tehdään suoraan kasvoihin. Pelaaja liikkuu pääasiassa maan tasalla. Ei aloiteta historian '
          + 'esittelyllä (tornien nimet, vuosiluvut): pelaaja astuu suoraan toiminnan ja seikkailun keskelle, ja tehtävänä on selvittää arvoitus tai löytää aarre; historia opitaan pelatessa, vihjeet '
          + 'nojaavat oikeisiin paikkoihin, esineisiin ja henkilöihin, ja tietokerros (drone-näkymä, lähteet) tarjotaan vasta lopussa tai pyydettäessä. Olavinlinna alkaa veneellä saapumisesta '
          + 'alaperspektiivistä elokuvamaisesti, drone-näkymä vasta lopussa; pelaaja liikkuu itse linnassa, ratkaisee arvoituksen, ja palkintona on huomattava aarre. Toteutus: yksi yhteinen '
          + 'historiamoottori (liikkuminen, katselu, esineiden tutkiminen, arvoitukset, tallennus, elokuvamaiset siirtymät), Olavinlinna pilottina. PELIN TUNTU (omistaja 7.10.2026 klo 08.4x, '
          + 'sitova): VAPAA KÄVELY; tekstuurit saavat olla sinne päin, kunhan näyttävät mahdollisimman hyvältä, mutta huoneiden mittasuhteet ja muut elementit ovat oikein. PELIN AIKANA EI OPETETA '
          + 'MITÄÄN: tavoite on jännittävä, hurja ja visuaalisesti näyttävä kokemus, johon pääsee heti ilman selostuksia; opastus mahdollisimman pienin vihjein, ja tehtävä ymmärretään heti. Joka '
          + 'huoneessa on tekemistä (ratkaisut haetaan muiden pelien toimivista esimerkeistä); vähän tappelua saa olla, mutta tarvitaan myös oveluutta, reaktiota ja muita taitoja. Opettava anti on, '
          + 'että paikka tulee visuaalisesti tutuksi; tarinoita ja tietoa saa halutessaan pelin aikana tai sen jälkeen, mutta mitään oppimiseen liittyvää ei ole pakko tehdä. KAMERA JA VIHJEET '
          + '(omistaja 7.10.2026 klo 08.5x, kamera muutettu 18.5x, vihjeet 8.10.2026 klo 18.58, sitova): ENSIMMÄINEN PERSOONA kaikissa videopeleissä, jotta pelaaja ei identifioidu minkään näköiseksi '
          + 'eikä mihinkään sukupuoleen (omistaja 18.5x): ei näkyvää vartaloa eikä peilikuvaa, kannettu esine kameran edessä; pelattavuuden mallina Thief (ensimmäisen persoonan hiiviskely, valo ja '
          + 'varjo, harhautus), esineiden käsittely Amnesian tapaan ilman kauhua (kumoaa 08.5x:n "kamera olan yli"); kolmannen persoonan kohtauksia vain kaukokuvina (omistaja 18.6x): hahmo pieni, '
          + 'pääpaino ympäristössä, esimerkiksi saapuminen, siirtymät, pako ja loppu; kädet saavat näkyä hetkittäin roolivaatteissa ja hanskoissa (omistaja 18.6x); takaa kuvattu kolmas persoona on '
          + 'sallittu toissijaisena (huppu tai hattu ja peittävät vaatteet, ei kasvoja), mutta päätila on ensimmäinen persoona hanskakäsin (omistaja 18.7x); POIKKEUS (omistaja 16.10.2026 klo 19.41): Kielletyn kaupungin juoksupelissä pelaaja on Puyi eikä perillinen, joten se kuvataan takaa yläviistosta ja Puyi näkyy (etukulmat vain lyhyinä välikohtauksina); JUOKSUPELIN LINJAUS (omistaja 17.10.2026 klo 21.51–21.54): jatkuva juoksu (Puyi ei pysähdy eikä piiloudu), pelaaja valitsee reitin myös katottomien talojen sisällä ja harhauttaa vastaan tulevat kiinniottajat reitinvalinnalla, yksinkertainen reaktiopeli, kamera korkealla suoraan juoksijan takana, pelkistetty grafiikka, nopeus tärkeintä; huoneista kerätään esineitä juostessa; PERUSLOGIIKKA (omistaja 17.10.2026 klo 21.59): joku tulee koko ajan perässä ja vartijoita tulee myös sivuilta; oikealla peukalolla pyyhkäisy oikealle tai vasemmalle valitsee reitin, vasemmalla peukalolla liuku: ajoitettu liuku kiinniottajan alta, kun tämä hyppää kiinni (liian aikaisin tai myöhään = kiinni); sama nappi myös hyppy, jolla kerätään talosta aarteita lisäpisteiksi; lähellä useampi katoton talo; OHJAUS (omistaja 17.10.2026 klo 21.59, kortti "Alas liuku, ylös hyppy"): vasen peukalo pyyhkäisy alas = liuku vartijan alta, pyyhkäisy ylös = hyppy aarteen luo; oikea peukalo pyyhkäisy vasemmalle tai oikealle = reitin vaihto; PITUUS (omistaja 17.10.2026 klo 22.02): Kielletyn kaupungin juoksu saa olla epärealistisen pitkä: juoksu kestää niin kauan kuin pelaaja pysyy karkuteillä, rata kootaan palatsin toistuvista paloista (portti, piha, katoton talo, muurikäytävä) aina uudessa järjestyksessä, ja välillä tulee oikea nimetty paikka (esim. Korkeimman sopusoinnun halli, kulmatorni); OMENAT (omistaja 17.10.2026 klo 22.08, kortti "Kyllä, napautus vartijaan"): omenoita kerätään hyppäämällä talojen hyllyiltä ja pihojen puista, taskuun mahtuu vain muutama; napautus vartijaan heittää omenan ja osuma saa vartijan liukastumaan hetkeksi; reitinvalinta ja liuku pysyvät pääasiana; esikuvat Subway Surfers (ohjaus, takaa-ajo) ja Disneyn Aladdin 1993 (omenat palatsin vartijoita pakoillessa); SPURTTI (omistaja 17.10.2026 klo 22.13, kortti "Kyllä, spurtti suojaa"): vauhtiviitat täyttävät spurttimittarin; vasemman ohjaimen vieressä oleva nappi käynnistää spurtin, jolloin Puyi syöksyy hetkeksi eteenpäin viitta liehuen eivätkä kiinniottajat saa sinä aikana otetta (esikuva Temple Run 2:n vauhtimittari); KATTOREITTI (omistaja 17.10.2026 klo 22.18): muurien reunoilla ja kattojen päällä voi juosta, mutta siellä pysyminen vaatii tarkkoja oikea-aikaisia hyppyjä; ylös pääsee portaista tai hypyllä muurin kulmasta, ylhäällä on enemmän aarteita ja omenoita eivätkä vartijat yllä sinne; kattojen raot ylitetään ajoitetulla hypyllä (pyyhkäisy ylös); huti ei päätä peliä, vaan Puyi putoaa pihalle lähemmäs kiinniottajia; RUUDUKKO JA KÄÄNNÖKSET (omistaja 17.10.2026 klo 22.32): kääntyminen on aina 90 astetta ja koko peli kääntyy mukana, joten pelaaja voi kääntyä juoksemaan myös takaisinpäin; palatsi on suorakulmainen ruudukko pihoja ja käytäviä kuten oikea Kielletty kaupunki; risteyksessä pyyhkäisy vasemmalle tai oikealle kääntää 90 astetta, suoralla sama pyyhkäisy vaihtaa väylää; kamera kääntyy nopeasti ja pehmeästi Puyin taakse; takaisin pääsee kääntymällä kahdesti tai kiertämällä talon; kuljetut korttelit säilyvät hetken, uusia syntyy eteen; perässä juoksija seuraa ruudukossa, joten talon kiertäminen on harhautus (esikuvat Temple Runin käännökset ja Pac-Manin ruudukko); TUOTANTOPUTKI (omistaja 17.10.2026 klo 22.17, kortti "Kyllä, harmaa versio ensin"; aloitetaan heti, Codexin Pekingiä ei odoteta): 1) PT + PK pelikirja (perussilmukka, ohjaus, kiinnijääminen, pisteet, kunkin vaiheen valmiin määritelmä); 2) PK harmaa pelattava versio harmailla palikoilla (loputon rata portti, piha, katoton talo 2–3 väylällä, muurikäytävä; perässä juoksija ja vartijat sivuilta; kaikki ohjaukset ja kiihtyvä vauhti) Kehittäjä › Kokeet › Juoksupeli -valikkoon + alle minuutin video; 3) omistaja pelaa ja vauhti, liukumisen ajoitusikkuna ja vartijat hiotaan hänen palautteellaan; 4) vasta sitten LR ja VS palatsin palasarja yhteisellä pohjalla (samat mitat ja liitoskohdat, pelkistetty tyyli korkealle kameralle, maamerkkipalat nimineen) Codexin j8–j10-kuvien suuntaan; 5) hahmot ja liikkeet (juoksu, liuku, hyppy, heitto, syöksy, liukastuminen); 6) NUI pelinäyttö (spurttimittari, omenat, pisteet) nykyisillä UI-pohjilla, puuttuva pohja omistajalle; 7) SS ja Äänittäjä äänet ja kertoja, aarteista faktakortit, generointiluvat kortilla; 8) lopuksi Kielletyn kaupungin kohteeseen Pelaa-valinnaksi Olavinlinnan mallin mukaan omistajan hyväksynnällä; '
          + 'PUHUTTELU "sinä" ja käännettävyys '
          + 'englanniksi lähtökohtana (omistaja 18.6x): pelaajasta ei sukupuolitettuja sanoja; VIDEOPELEISSÄ EI PULUA (omistaja 8.10.2026 klo 18.58): vihjeet tulevat maailman sisältä pyydettäessä (☰ '
          + '› Vihje) ja kevyesti itse noin 3 minuutin jumin jälkeen (hento kuunvalon tai liekin kimallus oikeassa paikassa ja pieni ääni), ratkaisua kertomatta, ilman tekstiä ja ilman hahmoa; Pulun '
          + 'reunakuvaa, vihjelentoja ja äännähdyksiä ei ole. OLAVINLINNA TAUOLLA (omistaja 13.10.2026 klo 09.2x, loki OLAVINLINNA TAUOLLE VIIDEN TILAN JÄLKEEN): linnatyö pysäytettiin heti, ja 5 '
          + 'tunnin kiintiön nollauksen jälkeen viimeistellään vain viisi keittiön tasoista tilaa (keittiö, porttikäytävä, pikkupiha, linnantupa ja voudin sali) peliin junaan muistiajon kanssa. Sen '
          + 'jälkeen linna on toistaiseksi tauolla: ei uusia tiloja (Kuninkaansali, tyrmä, portaat, Kellobastionin pakoreitti, ranta, itäsiipi), kunnes omistaja päättää toisin. Syy: linnan roolit '
          + 'käyttivät noin kolmanneksen Clauden kiintiöstä. OLAVINLINNAN PELIN TOTEUTUS (omistaja 7.10.2026 klo 20.3x, 15 kohtaa; työohje docs/raportit/pelattavuusmalli-olavinlinna.md): pala noin '
          + '15 min ja koko linna noin 25–35 min ilman täytettä; anteeksiantava (varoitus aina ennen kiinniottoa, tallennus kynnyksillä, tyrmästä alle minuutissa, ei vaikeustasovalintaa); ei '
          + 'lyöntejä, verta eikä aseita ihmisiä vastaan (irtipääsy otteesta, köyden katkaisu, töytäisy matalaan veteen vahingoittamatta); realistinen kuva, valona vain liekit ja kuu; kosketus: '
          + 'napautus lattiaan kävelee ja esineeseen käyttää, vasen tappi tarkka liike (kevyt = hiivintä), oikea veto katse, ei kyykkynappia; ruudulla vain liikkumistappi, toimintonappi '
          + 'kontekstikuvakkein (käsi, kaari, liekki) ja tauko (ei Pulun reunakuvaa, ks. KAMERA JA VIHJEET); ei pään keinuntaa; hiiviskelyssä ei musiikkia (sydän vaarassa, kanteleaihe löydössä ja '
          + 'lopussa); Freesound CC0 ja Sonnissin ilmaiset GDC-paketit sallittu (ämpäriin normaalia reittiä, ks. ÄMPÄRI EI OLE JAKELUA); keskeneräinen jätetään pois julkaisusta. KEHITYKSEN NOPEUTUS '
          + '(Päätoimittaja 11.10.2026 klo 09.2x): 1) jokaisessa linnan osassa (laituri, porttikäytävä, keittiö, sisäpihat, kappeli, tyrmä, paluu) on kehittäjätilan aloituskohta, jossa tila on kuin '
          + 'pelaaja olisi tullut sinne (ei näy pelaajalle); 2) kävelevä botti ajaa jokaisen osan erikseen Unity-editorissa jokaisen linnacommitin jälkeen, ja botin läpäisy on portti ennen '
          + 'Laitetestaajan läpipeluuta, joka testaa läpäisseet osat aloituskohdista; 3) Julkaisijan olavinlinna-vahti kääntää linnan yhdistelmän automaattisesti pushien jälkeen '
          + '(lokit/olavinlinna-uusin; taukolippu junan, VIE:n ja muistiajon ajaksi), linnalla on päivällä oma simupaikka, ja linnahaaroihin pushataan vain valmiita committeja. Tavoite on noin 30 '
          + 'minuutin testikierros. OLAVINLINNA OIKEANA VUODEN 1499 LINNANA (omistaja 8.10.2026 klo 08.1x–08.2x "Kannatan", sitova): seikkailu tehdään historiallisesti oikeaan vuoden 1499 linnaan: '
          + 'myöhemmät bastionit (Kellobastioni, vesiportin bastioni) rajataan 1499-näkymistä, ja tilalla ovat kallioranta, matala etuvarustus ja puusilta; nykylinna näkyy vain loppukuvan '
          + 'dronenäkymässä. Pelin valmistuttua tehdään Olavinlinnan historia-animaatio (tyhjä saari → rakentaminen 1475 → laajennusvaiheet → nykylinna, mukana Suomen esihistoriaa), ja alussa '
          + 'pelaaja valitsee, katsooko linnan ja sen historian vai pelaako. ESITTELY NÄYTTÄÄ LINNAN VAIHEET (omistaja 10.10.2026 klo 07.1x): esittely ei ole 1499-asussa, vaan se näyttää linnan '
          + 'rakennusvaiheet Historiajanan vuosileikkauksilla nykylinnaan asti; vain pelattava pala on vuoden 1499 linna. PINNAT (omistaja 8.10.2026 klo 20.58): toistuvat peruspinnat (kivi, rappaus, '
          + 'puu, lankku) tehdään vapaista CC0-skannauksista (Poly Haven, ambientCG) normaali- ja karheuskarttoineen, ja Codexilta tilataan vain ainutlaatuiset pinnat (holvimaalaukset, vaakunat, '
          + 'kuvakudokset, kankaat, ovet ja helat, kirjat, asiakirjat, pöydän esineet) fotorealistisina. Linnanrakentaja tekee niistä normaali- ja karheuskartat, ja Päätoimittaja tarkistaa vaakunat '
          + 'ja historian ennen kytkentää. Linnan ulkokuorta ei teksturoida Codexilla (UV-saaret), vaan se tarkennetaan omalla lähidetaljilla. HAHMOT (omistaja 8.10.2026 klo 21.20): videopelien '
          + 'hahmot tehdään ensin ilmaisella MetaHumanilla (maksuton alle miljoonan dollarin vuosiliikevaihdolla, ja käyttö Unityssä on sallittu; Unreal Engine on T7:n koodaus-kansiossa, ja editori '
          + 'avataan vain työn ajaksi ja suljetaan heti sen jälkeen, koska se kuormittaa näytönohjainta saman Macin käännösten aikana, Päätoimittaja 9.10.2026 klo 13.5x), ja Character Creator '
          + 'ostetaan vain, jos MetaHuman ei toimi. METAHUMAN HYVÄKSYTTY OLAVINLINNAAN (omistaja 11.10.2026 klo 22.4x: "ei kun tee meta human, se on tärkeää saada huomiseksi"): Olavinlinnan puhuvat '
          + 'hahmot tehdään MetaHumanilla soutajasta alkaen, ja muistiraja varmistetaan Natiivisepän mittauksella. VERKKOLÄHTEET (Päätoimittaja 7.10.2026 klo 21.0x): haetaan vain virallisilla '
          + 'rajapinnoilla tai robots.txt:n ja käyttöehtojen sallimilla poluilla, robottitarkistuksia ei ohiteta; Freesound vain API:lla (Actions-salaisuus); muuten omistaja lataa käsin tai lähde '
          + 'jätetään. HETKET JA TARINAT (omistaja 7.10.2026 klo 09.4x–10.0x, kortit, sitova): OLAVINLINNA = "Aarnivalkea", elokuun ilta ja yö 1499 (docs/raportit/ehdotus-olavinlinna-seikkailu.md: '
          + 'salamatkustajana huoltoveneessä, kiertävä valo Kirkkotornissa, pystyleike Laituri → Keittiö → Kappeli noin 10 min, arvoitus todellisten vaakunalaattojen ja umpeen muurattujen komeroiden '
          + 'varassa, aarre fiktiota, kiinnijäänti = tyrmä); KIELLETTY KAUPUNKI = kesä 1923 ilman isoisää (viimeinen keisari Puyi 17 v sisäpalatsissa, aarteita katoaa, inventaario ja 27.6.1923 '
          + 'Jianfugongin alueen palo, jota Puyi epäili varkauksien peittämiseksi); GIZA = Suuren pyramidin rakennustyömaa Khufun 26./27. vuonna Niilin tulvan aikaan (Mererin päiväkirja). '
          + 'Historiakohteiden aarteet ovat Aarnin luettelon aarnivalkeita (kaanonin lisäys docs/tarina.md). Pystyleikkeen noin 25 uutta repliikkiä saa generoida, loput seikkailun loppuosan '
          + 'varmistuttua. Loki: docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 11.10.2026: HISTORIALLISET KOHTEET (11.10.2026 klo 15.44).',
        'PELIT, TALOUS JA LUENTA (omistaja 27.9.2026 klo 09.2x–10.4x, sitova; ideat omistajan 12-vuotiaalta tyttäreltä): 1) PELIT ovat yhtä merkittävä osa kuin linssit — oma kehittämissivu '
          + 'docs/pelikatalogi.md (+ pelikatalogi.html) samalla mallilla kuin linssikatalogi; vähemmän pelkkää tietovisaa, tilalle ja lisäksi pelejä joissa oppii; minipelejä pelataan bottia tai '
          + 'kaveria vastaan ja ne kertyvät matkakirjaan. KAKSI PELILAJIA (omistaja 7.10.2026 klo 09.1x, sitova): LAUTAPELIT (Mylly, Tavli ym.; katalogin kortti- ja pihapelit samaan osioon) ja '
          + 'VIDEOPELIT (historialliset seikkailut: Olavinlinna 1499, Kielletty kaupunki kesä 1923 ja Giza, sekä Lentopeli). Videopelit-termi perustelee aikahypyn: pelaaja on koko ajan nykyajassa ja '
          + 'siirtyy videopelien avulla ajassa taaksepäin. Pelivalikossa on kaksi osiota (jako tehdään, kun Olavinlinnan ensimmäinen osuus on pelattavissa; tyhjää osiota ei näytetä), ja tekniikassa '
          + 'kaksi yhteistä moottoria: lautapelien moottori ja historiamoottori videopeleille. OLAVINLINNA JA LAUTAPELIT NOSTOINA (omistaja 11.10.2026 klo 14.0x–17.3x): Olavinlinna on Suomen '
          + 'kartalla nostona kimmeltävällä, hieman elävällä sinisellä taustalla (videopeli ja nähtävyys), ja sen sininen merkki sykkii (rengas 1 → 1,35, 0,9 s, 3 s:n välein; vähennetty liike: '
          + 'häivytys): esittely ja luenta ovat ilmaisia, ja esittelyn lopussa on lukijan kysymys olemassa olevalla minivisapohjalla (oikeasta vastauksesta £25 kerran kuten noston visassa; 17.3x); '
          + 'pelaaminen maksaa £20 ja alusta aloittaminen aina £10 lisää (jatkaminen ilmainen). LAUTAPELEIHIN EI VÄRIKOROSTUSTA (17.2x: "Lautapeleihin ei tule väri korostusta"): Mylly (Berliini) ja '
          + 'Tavli (Ateena) ovat tavallisina paperisina nostoina (merkki ja kortti) ilman sinistä rengasta, sykäystä ja hintaa, aina ilmaisia, ja niiden nappi tulee kartalle näkyviin vasta, kun '
          + 'kaupungin aarteen sijainti on paljastunut (omistaja 11.10.2026 klo 20.5x). HOUKUTTIMET HUNNUN PÄÄLLÄ (14.3x ja 17.3x): linssikaupungit sykkivät hitaasti violettina, Olavinlinna sinisenä '
          + 'ja aarteet kultaisena, ja ne näkyvät kuumailmapallojen tavoin aina hunnun päällä; lautapeleille (Berliini, Ateena) ei tule sinistä houkutinta. 2) TALOUS: rahaa kuluu kuin oikeassa '
          + 'elämässä — matkustamisen lisäksi syömiseen ja asumiseen (päiväkulu: ruoka £8 + majoitus £12 × maan hintataso 0,6 / 1,0 / 1,6 eli £12 / £20 / £32 vuorokauden vaihtuessa) ja huvituksiin: '
          + 'linssit ja pelit ostettavissa Kaupasta (edelleen löydettävissä myös ilmaiseksi); huvipuistoissa sisäänpääsymaksu ja pelivoittoja; aloitusraha £300 (RAHA AINA £-MUODOSSA kaikissa '
          + 'summissa, hinnoissa, hintalapuissa ja ilmoituksissa: £300, −£20, Kuumailmapallo £200; omistajan "200p" tarkoittaa £200; omistaja 2.10. ja 11.10.2026); ALKURAHA JA MATKAT (omistaja '
          + '11.10.2026 klo 22.4x: "400 puntaa on liian iso alkuraha. pienennetään se 300 puntaan."): matkustaminen maksaa niin paljon, ettei pelkällä alkurahalla pääse aloituskaupungista Euroopan '
          + 'toiselle laidalle (esim. Ateenasta Pariisiin) ratkaisematta yhtään tehtävää: liftauksen kyytimaksu £50 veloitetaan kerran kaupungista lähdettäessä (reitiltä jatketaan ilmaiseksi), bussi '
          + 'maksaa £80, laiva £200 ja lento £350 (Pelikoodari, juna 183); rosvon häviö vie 50 %; pankin apu pois; kun rahat loppuvat, peli loppuu kahdessa vuorokaudessa (varoitusaikana liftausta ei '
          + 'tarjota ilman kyytirahaa, ja jos mihinkään ei pääse, liftauksen paikalla on Odota-nappi, joka kuluttaa vuoron) → loppukortti ja jatko viimeisestä tallennuksesta. KUKKARON PALAUTE '
          + '(omistaja 11.10.2026 klo 13.5x–15.2x): rahan muutos näkyy vain yläpalkin rahapillerissä oikeassa yläkulmassa (ei keskileimaa eikä tuplailmoituksia; monen päivän kulut yhdeksi '
          + 'päivitykseksi): animaation ajaksi päivämäärä piiloutuu, ja koko summa £-merkkeineen muuttuu punaiseksi (matkakulut, ruoka ja yöpyminen) tai vihreäksi (aarre, tehtävä) ja lihavoiduksi, '
          + 'suurenee ja pienenee noin sekunnissa ja palaa sitten normaaliksi; samalla kuuluu pieni ääni (lisäyksessä kolikkoääni, äänet kirjastoista), ja puhelin antaa haptisen palautteen (lisäys '
          + 'onnistumisvärinä, väheneminen kevyenä napautuksena); aarteen löytyessä summa päivittyy noin 1 s kartalle paluun jälkeen; värit tyylikirjan tila.raha-vahenee ja tila.raha-kasvaa. '
          + 'PELISTREAK: kun pelaaja pelaa vähintään kolmena peräkkäisenä päivänä, hän saa rahapalkinnon, ja mitä pidempi streak, sitä isompi päivittäinen tai viikoittainen palkinto. LENTOPELI: '
          + 'kaksitasokoneen (Tiger Moth, lento v3) lentämisestä oma peli — vapaa lento ja tehtäviä; polttoaine kuluu ja maksaa; lähtöpaikkaan on päästävä takaisin tai tulee sakko; tehtävistä (esim. '
          + 'renkaan läpi lento) saa lisää polttoainetta. Suunnitelma docs/raportit/talous-suunnitelma-20260927.md. 3) STRIIMIPUHE (Pulun vastaus Pulun omalla äänellä, ks. LUKIJAÄÄNI WILLIAM) ei ole '
          + 'sidottu mihinkään äänikytkimeen (Kertoja, Musiikki, Äänimaisema, mykistys) — se on aina päällä, koska lähtee vain pyynnöstä; vain Pulun oma kaiutinvipu ohjaa. Nostojen luennassa: '
          + 'kaiutin tauko/jatka (keskeytettynä vilkkuu, luenta jatkuu samasta kohdasta), VU kaiuttimen kaarissa kuten isoisän luennassa; ääni ks. LUKIJAÄÄNI WILLIAM ja ääniasetukset STRIIMILUKIJAN '
          + 'KAKSI NAPPIA. 4) KARTTA: kohdemaan kaikki nostot näkyvät heti täydellä ulkoasulla (poikkeus pelin ensimmäinen maa, ks. Kaupungit, ALOITUSMAAN NOSTOT); maakuntien vaiheittainen '
          + 'herääminen, maakuntasalaisuudet ja alkuanimaation muut vaiheet pois (vain pohjavärin täyttö jää; maa valmis → lippu liehuu jää); muiden maiden nostojen piilotus ja mannerlentojen '
          + 'aarre-ehto JÄÄVÄT. MAAKUNTA TUPLANAPAUTUKSELLA (omistaja 11.10.2026 klo 20.5x): yksi napautus kartan tyhjään kohtaan ei tee mitään, tuplanapautus avaa maakunnan, ja sulkeminen tapahtuu '
          + 'edelleen yhdellä napautuksella. 3D-nostoissa lähitaso LOD0 (2–3 × kolmiot, vain lähellä), kategoriasymbolit seepiarampilla (vuori lumihuipulla), meren koristeet 10 lajia. 5) '
          + 'VIIKKOKIINTIÖ: ks. TYÖTAPA JA SESSIOT, VIIKKOKIINTIÖ (siirretty 14.10.2026).',
        'PÄÄTOIMITTAJA = FABLE (omistaja 28.9.2026): päätoimittajan rooli on nimeltään PÄÄTOIMITTAJA, koska se ei ole sidottu Fable-malliin (nyt Opus medium); session nimi ISOILLA KIRJAIMILLA '
          + '"PÄÄTOIMITTAJA (<malli>, <effort>)" (omistaja 6.10.2026: helpompi löytää sivupalkista; muiden roolien nimet tavallisesti, esim. "Julkaisija (Opus, high)"). "Fable" on roolin vanha nimi '
          + 'ja pätee edelleen kaikissa ohjeissa, lokissa ja luovutuksissa (JUMI → FABLE, viestit Fablelle ym. = päätoimittajalle); vanhoja viittauksia ei kirjoiteta uudelleen. Codexille omistaja '
          + 'puhuu "viesti Claudelle" (postilaatikko → Julkaisija → päätoimittaja). Päätoimittajan haara on toistaiseksi claude/bold-ride-vow4ki (sovelluksen antama nimi); nimenvaihto tehdään '
          + 'tilinvaihdossa luovutuksen mukana.',
        'TYÖTAPA JA SESSIOT — NOPEUS JA TOKENITEHOKKUUS (omistaja 20.9.2026, SITOVA kaikille sessioille; uudet säännöt vain omistajan kortilla; tiivistetty 14.10.2026 niin, että kullakin aiheella on '
          + 'yksi voimassa oleva kohta, historia ja kumotut sanatarkasti lokissa): A) ROOLIT (täysi lista ja kansiot: ROOLIEN KANSIOT JA MALLIT). PÄÄTOIMITTAJA (PT; vanha nimi Fable, ks. '
          + 'PÄÄTOIMITTAJA = FABLE; malli vaihtelee, 14.10.2026 alkaen Opus medium) = tarina ja kaanon, päätökset, erien jako ja kuittaukset (kuvat katsottava), junat, Asemataulun tapahtumat, '
          + 'Codex-posti sekä Raamattu ja loki (ainoa kirjoittaja); ei koodaa, ei julkaise, ei seuraa CI:tä. KESKUSTELUKANAVA (KK; Opus, max) = omistajan keskustelu ja ideointi: omistaja puhuu vain '
          + 'sinne, ja sieltä tulevat ohjeet ja "OMISTAJAN PÄÄTÖS … sanatarkasti" -viestit ovat omistajan sanaa (omistaja 14.10.2026 klo 23.16, kortti "Kyllä"): KK:n välittämä "OMISTAJAN PÄÄTÖS" '
          + 'on omistajan päätös, ja rooli nollaa itsensä luovutuksen jälkeen; lupa-asetukset, avaimet ja CLAUDE.md muuttuvat vain omistajan omalla viestillä. '
          + 'JULKAISIJA (Opus, medium) = merget työhaaraan ja mainiin (node --test 0 fail, '
          + 'uusi-versio.mjs, tarkista-kaksoisavaimet, build-standalone, merge vihreänä; --admin vain kun ainoastaan kuormaherkkä rivi on punainen), PT:n haaran synkkaus, tuotannon '
          + 'APP_VERSION-tarkistus, luettelot ämpäriin vain PT:n käskystä ja vasta kun osoitin on mainissa, käännös- ja simuvuorot, Codex-toimitusten haku tunneittain (~/Documents/Codex/<pvm>/ ja '
          + 'postilaatikkohaara; tekstit PT:lle, animaatiot Pelikoodarille, kuvat Sisältökirjurille) ja siivoukset. KARTTASEPPÄ (Opus) = laattapyramidi, poltot (vuoro Julkaisijan kanssa: ei PR-CI:tä '
          + 'polton aikana), pallolauta, vektorit, luettelot. PELIKOODARI (Opus) = UI, äänten kytkennät peliin (AaniTaulut, arvonta), Pulu, linssit, savukkeet. SISÄLTÖKIRJURI (Sonnet) = nostot, '
          + 'lehdet, kohdekartat, kartuschan sisältö, Commons-kuvat, inventaariot. LAITETESTAAJA (Sonnet) = iOS-simulaattori, laitekierrokset raportteina, kontaktiarkit; tulos kirjoitetaan vuoron '
          + 'viimeiseksi riviksi "TULOS <build>: OK/VIKA – …" ja raporttiin, ja Julkaisija ja PT lukevat sen list_eventsillä (ei tulosviestejä; omistajaa ei koskaan pyydetä kirjoittamaan "jatka"). '
          + 'ÄÄNITTÄJÄ (Sonnet) = musiikki (Lyria), äänet (ElevenLabs), äänisivu, ääniportti ja häiriötarkistus, viennit vie-paketti.sh:lla; pelin kytkennät tekee Pelikoodari valmiista tiedostoista. '
          + 'ASEMATAULU (Sonnet, low) = Asemataulun hoitaja (ks. ASEMATAULU). POSTIVAHTI (Sonnet) = kierros, herätteet ja nollaukset (ks. POSTIVAHDIN KIERROS). Tilapäiset sessiot (esim. '
          + 'Raamatunkarsija) suljetaan tehtävän jälkeen. SESSION NIMI (omistaja 29.9.2026): "Rooli (malli, effort)", esim. "Julkaisija (Opus, high)", PT ja KK isoin kirjaimin; nimi päivitetään '
          + 'set_session_titlella aina, kun sessio luodaan tai nollataan tai sen malli tai effort muuttuu; Postivahti valvoo. TEHTÄVÄKOHTAINEN EFFORT (omistaja 28.9., 10.10. ja 14.10.2026): high on '
          + 'koodaavien roolien oletus, Julkaisija medium (high vain CI-vian ajaksi, omistaja 14.10.2026 klo 22.4x); max vain uuden kokonaisuuden suunnitteluun ja juurisyihin, joihin yksi yritys ei '
          + 'riittänyt, toteutus highilla ja palautus heti tehtävän jälkeen; medium PT:lle, Postivahdille ja pelkkään valvontaan. PT vaihtaa effortin tehtävää antaessaan (set_session_effort; '
          + 'sallinta PT:n .claude/settings.local.json:ssa). REMOTE CONTROL on päällä kaikissa sessioissa, myös Postivahdissa; PT kytkee sen set_remote_control-työkalulla heti, kun sessio on avattu '
          + 'tai nollattu (lepäävään sessioon lähetetään ensin viesti, koska työkalu vaatii aktiivisen session). AGENTIT (ensimmäinen sääntö: vain Opus tai Sonnet, ei koskaan Fable-mallia): '
          + 'roolisessiot pysyvät Opuksella pitkinä linjoina (1M), ja kevyet roolit (Postivahti, Sisältökirjuri, Laitetestaaja, Äänittäjä, Asemataulu) ajavat Sonnetilla. SONNET RAJATTUIHIN TEHTÄVIIN '
          + '(omistaja 28.9.2026): jokainen rajattu tehtävä (myös haastava bugiselvitys, juurisyy koodista, testien korjaus, aineistoerä, tekstitarkistus) annetaan Sonnet-ali-agentille '
          + 'tehtävänannolla polkuineen; ali-agentti palauttaa tuloksen ja diffin, ja rooli todentaa ja julkaisee. Ali-agentti ei käytä simulaattoreita, käännöspalvelua eikä tuotannon workeria. '
          + 'Enintään 3 rinnakkaista agenttia per rooli, selain- ja rakennusagentteja enintään 2. Ali-agentit ovat kertakäyttöisiä: ei jatkoviestejä yli 5 minuutin tauon jälkeen, vaan uusi tehtävä = '
          + 'uusi ali-agentti. Jokaisen agentin tehtävänannon alkuun KOMENTOSÄÄNNÖT. Mallivalinta tehdään kyvyn, ei kiintiön mukaan. LISÄOSAT (omistaja 11.10.2026): tilin lisäosat '
          + '(web-artifacts-builder, Unity, unity-perf) ovat apuna, mutta Raamattu ja nykyisen koodin tyyli voittavat; Unity CLI tai editorisilta asennetaan vain Natiivisepän kautta PT:n '
          + 'kuittauksella, eikä muita lisäosia oteta. PILVIAJOT (omistaja 10.10.2026): pilvikrediitti on käytetty; pilvisessiot kuluttavat viikkosaldoa, joten uusia avataan vain omistajan '
          + 'päätöksellä. B) TYÖTILAT (omistaja 23.9.2026): kaikki Clauden kansiot ovat /Users/Shared/Claude/ -kansiossa (yhteinen kaikille Macin käyttäjille, ACL staff), ei koskaan käyttäjän '
          + 'kotihakemistossa. Kukaan ei koske PT:n checkoutiin /Users/Shared/Claude/Matkakirja-fable; jokaisella roolilla on oma checkout /Users/Shared/Claude/Matkakirja-<rooli>. Erä-worktreet vain '
          + '/Users/Shared/Claude/wt/<rooli>-<aihe> työkalulla tools/uusi-worktree.sh; haarat <rooli>-<aihe>, yksi erä = yksi haara, ennen ilmoitusta testit 0 fail. Proto-git '
          + '/Users/Shared/Claude/proto-3d/Matkakirja-proto. WORKTREE (PT 14.10.2026): enintään 3 per rooli ja alle 20 yhteensä; poisto heti mergen jälkeen komennolla tools/uusi-worktree.sh --poista '
          + '<nimi>, kun git status on puhdas ja grep ei löydä viittauksia polkuun (proto-3d/lokit/*-skriptit, proto-3d/tyokalut, ~/Library/LaunchAgents); haaraa ei poisteta (ei --delete-branch); '
          + 'node_modulesia ei asenneta worktreeen. Postivahti ajaa tools/tarkista-tyotilat.sh ja lähettää poistolistan suoraan roolille. SIMULAATTORIT T7-SARJASSA (omistaja 7.10.2026): kaikki '
          + 'simulaattorit ovat sarjassa /Volumes/T7 4TB/Simulaattorit/Sarja (UDID:t proto-3d/tyokalut/simusarja-udid.tsv, haku zsh proto-3d/tyokalut/simusarja.sh udid <nimi>); zsh-skripti alkaa '
          + 'rivillä source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh || exit 2 (sh ja python: zsh …/simusarja.sh simctl <argumentit>); pelkkä xcrun simctl osuu vanhaan sisäiseen sarjaan, '
          + 'eikä sitä käytetä (MCP-simutyökalu näkee vain sisäisen sarjan). SIMULAATTORIEN OMISTUS: iPhone 18 Pro ja iPad Pro 13-inch (M5) = Laitetestaaja, iPhone 17 = Natiivi-UI, roolien omat '
          + 'laitteet (esim. natiiviseppa-iPhone, linssiseppa-iPad13) = kyseinen rooli, pariteettilaitteet pariteettiajoille, fyysinen iso iPad 00008103… = Linssiseppä ja Laitetestaaja vuoroin; '
          + 'kukaan ei asenna toisen simulaattoriin, uusia luodaan vain tarpeeseen, ja ajon jälkeen rooli sammuttaa vain omat simunsa UDID:llä (ei koskaan shutdown all) ennen SIMU VAPAA -ilmoitusta. '
          + 'SIMULAATTORI VAIN TARVITTAESSA (omistaja 5.10.2026): simulaattoria käytetään vain vian toistoon, kun automaattinen testi ei riitä ja vian syy on muuten epäselvä. SIMUN MUISTIVAHTI: '
          + 'jokaisella SIMULAATTORI NYT -vuorolla Julkaisija käynnistää julkaisija-tyokalut/simu-muistivahti.zsh <UDID> (raja appi + oma SimMetalHost 12 Gt kevyille ja 16 Gt yhdelle raskaalle '
          + 'simulle, kill omalla pid:llä); simuja enintään kaksi, raskaita (Pariisi, Tukholma) enintään yksi, ja memory_pressure-vapaa on vähintään 20 % ennen käynnistystä. Simussa '
          + 'os_proc_available_memory on 0, joten muistikorjaukset todennetaan aina iPadilla. LEVYJAKO JA KÄYNNISTYSLEVY (omistaja 8.–9.10.2026, PT 14.10.2026, sitova myös Codexille): '
          + 'käynnistyslevyllä (/Users/Shared/Claude) on vain päivittäinen työ (Unity-projekti, roolien kansiot, tuoreet lokit) ja aina vähintään 100 Gi vapaana. Työn alla oleva ja usein luettava '
          + 'aineisto, työkalut ja välimuistit (editoriversiot, Python-venvit, Whisper- ja Hugging Face -mallit, npm- ja pip-välimuistit, vanhat työkansiot) ovat T7:llä /Volumes/T7 '
          + '4TB/koodaus/<aihe>/ (symlinkki vanhaan polkuun, jos työkalu vaatii); pysyvä arkisto (ostetut ja ladatut kirjastot, generoinnin raaka-aineistot ja masterit, poltot, satelliittiaineistot, '
          + 'vanhat julkaisuversiot) NAS:lla /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/<aihe tai rooli>/ ilman symlinkkejä, koska NAS ei ole aina liitettynä. Uusi aineisto tallennetaan '
          + 'suoraan oikeaan paikkaan; käynnistyslevylle vain juuri käsittelyssä oleva, ja se siirretään pois samana päivänä. LOKIT: proto-3d/lokit-kansiot siirretään NAS:lle '
          + '(Matkakirja-arkisto/lokit/) vuorokauden jälkeen .app-kopioineen; kuvat, joihin committoitu raportti viittaa, kopioidaan ensin pienennettyinä docs/raportit/kuvat/-kansioon. _valmiit- ja '
          + '_tyo-kansiot, joita ei ole käytetty vuorokauteen, siirretään T7:lle symlinkillä (ensin grep työkaluista); Clauden istuntotiedostot (~/.claude/projects) yli 7 vrk vanhoina NAS:lle '
          + '(memory-kansiot jäävät); Codexin työkansiot ja vanhat istunnot NAS:lle. Postivahti mittaa levyn joka kierroksella ja herättää PT:n, kun vapaata on alle 80 Gi; PT käynnistää siirrot heti '
          + '(scratchpad/levykartoitus-<pvm>.md -malli). Kansion siirtää vain sen omistava rooli, ja PT ilmoittaa sille ennen omaa siirtoajoaan. Ei tuplavarmuuskopioita (GitHub kattaa koodin, '
          + 'sisällön, raportit ja lokin; proto-git pushataan). Siirrot tehdään ennen poistoja, ja poistetaan vain itsestään palautuvia välimuisteja tai turhaa (esim. vanhat .app-kopiot, uusin '
          + 'kustakin sarjasta jää) omistajan luvalla tai KOMENTOSÄÄNNÖT-kohdan mukaan. C) JUNAT, KÄÄNNÖKSET JA TESTAUS. JUNA (PT 14.10.2026 omistajan 12.10. ja 16.0x-linjan mukaan): TF-juna lähtee '
          + 'vain omistajan pyynnöstä, merkinnällä "OMISTAJA PYYSI JULKAISUA", enintään kaksi päivässä, ellei omistaja pyydä enempää; YKSI JUNA (omistaja 16.10.2026 klo 22.24, pysyvä: "kerää aina kaikki vain yhteen junaan"): auki on vain yksi juna kerrallaan, kaikki kuitattu kerätään siihen, ei '
          + 'rinnakkaisia seuraavan junan jonoja; keskeneräinen ei pidätä junaa vaan odottaa avoimessa junassa seuraavaa julkaisupyyntöä. Kun TF on sisäisillä testaajilla, Julkaisija lähettää heti rivin PT:lle ja KK:lle, ja Postivahti varmistaa sen tf*-ketju.logista (14.10.2026). TESTAUS VAIN '
          + 'AUTOMAATTISIN (omistaja 7.10.2026): ennen junaa ja TestFlightiä ajetaan vain automaattiset testit (unity-tarkistus, EditMode/PlayMode, npm-testit) ja käännös; koekäännöksen savua, '
          + 'laiterutiinia, kuittausstillejä tai -videoita, iPad-mittauksia, välikokeita ja toistoajoja ennen korjausta ei tehdä. PT kuittaa yhden rivin perusteella (mitä muuttui, testit, SHA), ja '
          + 'pienet virheet korjataan seuraavassa junassa. Omistajalle hänen pyynnöstään lähetettävät kuvat ja videot tarkistetaan silti. EI TESTEJÄ JUNAAN (omistaja 15.10.2026 klo 09.36, uusin linjaus): junaan ei tehdä simu-, muisti- eikä todistusajoja eikä kuva-arkkeja edes liikkuvista kohtauksista, joten alla oleva MUISTIAJO ja liikkuvien kohtausten kuva-arkki jäävät pois; käännöksen automaattitarkistukset jäävät. Ainoa poikkeus on omistajan erikseen pyytämä video tai kuva, jonka PT tarkistaa ennen omistajaa. MUISTIAJO ENNEN TESTFLIGHTIÄ (omistaja 9.10.2026): kun juna '
          + 'sisältää muistia lisääviä muutoksia (uudet mallit tai tekstuurit, esilataukset, introt, renderöintiasetukset), Release-laitekäännös ajetaan ennen vientiä iPad Pro 13:lla (00008103) '
          + 'Pariisin kaupunkitilassa muistilokilla (vapaa muisti, tekstuurit, laatat); jetsam tai alle 0,5 Gt vapaata pysäyttää junan. Kun omistaja pyytää julkaisua "ilman testejä", muistiajokin '
          + 'jää pois (omistaja 14.10.2026). KÄÄNNÖKSET HARVEMMIN: roolit eivät tee omia iOS-, iPad- tai Mac-käännöksiään; haaraan riittävät kääntymistarkistus ja automaattiset testit. Ennen '
          + 'jokaista käännöspyyntöä rooli ajaa proto-worktreessaan zsh tyokalut/tarkista.sh 2>&1 | grep -E "virheitä yhteensä|vahti", ja tuloksena pitää olla "virheitä yhteensä 0". Täysi käännös '
          + 'tehdään vain junalle, simulaattorikäännös vain, jos vian syytä ei saa muuten selville. KÄÄNNÖSLINJAT (PT 11.10.2026): linja 1 = juna ja TestFlight, linja 2 = roolien testikäännökset '
          + 'omasta projektikopiosta (PROTO_LINJA=2) omalla lukollaan; Julkaisija jakaa vuorot (KÄÄNNÖS NYT, SIMULAATTORI NYT, LUKKO NYT), juna menee aina ensin, ja ajot ovat nice 15. Linja 2 ja '
          + 'toinen simu ovat käytössä vain, kun kone on omistajalta vapaa. Natiivi-UI:n keskitysajot (ei käännöstä eikä simua) saa ajaa linjalla 2 ilman pyyntöä, kun linja on vapaa, ja ilmoitus '
          + 'LUKKO VAPAA tulee heti perään. Jaetun käännösinfran (proto-kaanna.sh, lukot, toisten prosessit) muutokset vain omistajan luvalla. TF-NUMEROINTI (PT 10.10.2026): kun Apple hylkää '
          + 'buildin, sama sisältö ladataan uudelleen seuraavalla buildinumerolla ja seuraava juna saa sitä seuraavan; haara- ja osoitinnimet säilyvät. NATIIVI MAC-APPI (omistaja 6.10.2026): '
          + 'macOS-appi tehdään iPad-appin rinnalle, ja Mac-käännös tehdään vain joka kolmannessa junassa tai tarpeen mukaan. VERSIOT JUNASSA: junaan menevään koodi-PR:ään ei tehdä omaa versionostoa '
          + '(juna nostaa version); jos PR on ristiriidassa versiorivien takia, sw.js, js/main.js ja js/muutokset.js otetaan mainista. CLAUDE.md:n versiosääntö koskee vain PR:iä, joita ei ajeta '
          + 'junassa. Junaan otettuun PR:ään ei enää pushata. OMISTAJAN PALAUTE-ERÄ menee junaan heti, kun pääosa on todennettu; PT tarkistaa jokaisen TF:n kohdalla, mitkä palaute-erät puuttuvat '
          + 'junasta. SISÄLTÖJUNAT (omistaja 25.9.2026): sisältö-PR:t (kohdekartat, lehdet, sisältöpaketit) mergetään eräjunana yhdellä versionostolla, kun vihreitä on vähintään neljä tai vanhin on '
          + 'odottanut yli 4 tuntia; toimintokorjaukset heti. CI: suorituskykysavukkeet omassa sarjassa (schedule, yksi työntekijä), PR-portissa vain toiminnalliset vartiot; push käynnistää '
          + 'Mac-jobin samalla Mac Studiolla, joten pushit niputetaan. TARKISTA–KORJAA–TARKISTA (omistaja 3.10.2026, SITOVA kaikille rooleille): jokainen rooli tarkistaa oman lopputuloksensa itse '
          + 'pelistä (ei vain testeillä), korjaa puutteet ja tarkistaa korjatun version vielä kerran ennen kuin lähettää sen PT:lle tai merge-pyyntöön. PT tarkistaa itse vain omistajalle uudet asiat '
          + '(uudet näkymät, äänet ja sisällön, maku ja luettavuus; videot ruutu ruudulta) ja näyttää omistajalle vain sen, mihin on itse tyytyväinen; välivaiheita ei näytetä. Pienet korjaukset '
          + 'menevät roolin oman tarkistuksen varassa. KUVA-ARKIT APUAGENTILLE (omistaja 14.10.2026 klo 22.4x): välivaiheiden kuva-arkit ja pitkät lokit tarkistaa tuore Sonnet-apuagentti, joka '
          + 'palauttaa lyhyen arvion; rooli katsoo itse vain lopullisen kuvaparin. Merge-pyynnön todisteet tuotetaan todistusajolla (proto tyokalut/todistusajo/), ja TODISTUS.md:n polku liitetään '
          + 'pyyntöön. VIKA TOISTETAAN ENNEN KORJAUSTA (PT 5.10.2026): korjaus lähetetään kuitattavaksi vasta, kun todistusajo tai testi on näyttänyt vian toistuvan oikealla polulla ja sama ajo on '
          + 'mennyt korjattuna läpi. Ämpäristä tuleva sisältö (dioraama, laatat, äänet, kuvat) todennetaan puhtaalla asennuksella ilman paikallisia peilejä tuotannon osoittimen kautta. VANHOJA '
          + 'APPEJA EI RIKOTA (PT 8.10.2026): osoittimet (esim. dioraama/<rakennus>/uusin.json) ovat yhteisiä kaikille appiversioille ilman versiovahtia, joten data, jota vanha appi ei osaa, '
          + 'sidotaan koodiin kiinnitettynä hashina tai uuteen versioituun osoittimeen; jos aineiston koko tai kattavuus kasvaa oleellisesti, Natiiviseppä vahvistaa ennen mergeä, että julkaistu '
          + 'build kestää sen. OSOITINVAIHDOT (omistaja 5.10.2026): vie-dioraama osoitin=true ja muut sisällön osoittimet ajaa Julkaisija PT:n kuittauksen jälkeen, kun kukaan ei aja kyseistä '
          + 'sisältöä simulla tai iPadilla (vaihdon kellonaika ilmoitetaan), eikä omistajan ajoriviä tarvita. Muutosloki kulkee junan mukana: Natiiviseppä kirjoittaa, PT tarkistaa, Julkaisija vie. '
          + 'Sisältö ja asetukset ovat dataa (asetukset.json sisältöpaketissa), jotta ne vaihtuvat osoitinvaihdolla ilman käännöstä. HYVÄKSYTYT MALLIT PYSYVÄÄN TALTEEN (PT 6.10.2026): kun omistaja '
          + 'hyväksyy mallikuvan tai asettelun, jota ei vielä ole pelissä, kuvat ja niiden tekotyökalu kopioidaan samassa vuorossa kansioon proto-3d/_valmiit/hyvaksytyt-mallit/<aihe>-<pvm>/ '
          + '(LAHTEET.md mukaan), ja polku kirjataan lokiin. TAVOITELUUPPI (omistaja 14.10.2026, vaiheet lokissa): malli tehdään kierroksittain Codexin havainnekuvia vastaan (pohjakartta + leikkaus '
          + '+ Commons-kuvat → PT hyväksyy → _valmiit/hyvaksytyt-mallit/), Blenderin vertailuarkki ja luvut joka kierros, tuore Sonnet-arvioija ennen valmista, pysähdys rajoissa tai 2 kierrosta '
          + 'ilman parannusta tai 10 kierroksen jälkeen; peliin vasta automaattisen kuvakierroksen kautta; enintään 2 luuppia kerrallaan. LUUPIN TYÖNJAKO (omistaja 15.10.2026 klo 17.23, nopein ja halvin): Codex tekee tavoitekuvat ja '
          + 'kohdemaskit pallokierroksen kulmista + 2–3 lähintä pallokulmaa (PT hyväksyy kerran); rakentaja on ainoa pysyvä sessio (Opus medium) ja aloittaa kierroksen kierroslokista; '
          + 'kierrosskripti rakentaa, kuvaa kulmat, ajaa vertaa.py:n ja tekee yhden arkin + 5 rivin yhteenvedon; arvioija on joka kierros tuore Sonnet-ali-agentti (3 suurinta eroa tekstinä, '
          + 'kuvat eivät kerry rakentajalle); mekaaniset osat Sonnet-ali-agenteille; pelikytkentä ja pelikuvapari lopuksi Valoseppä; PT vain tavoitekuvat ja lopputarkistus. Julkisivujakso '
          + 'tehdään kerran huolella ja monistetaan, yksityiskohtia vain pallon etäisyydelle; pelikäännös vasta lopuksi; tokenit ja aika kirjataan joka kierros. 3D-MALLIT CODEXILLE (omistaja 15.10.2026 klo 17.22): uudet 3D-mallit (maamerkit, rakennukset) '
          + 'tilataan jatkossa Codexilta postilaatikon kautta; pelin kytkentä, laattojen vienti ja tarkistukset jäävät Clauden rooleille. Louvre tehdään vielä Claudella (Linnanrakentaja, '
          + 'tavoiteluuppi) vertailuksi: kierrokset, kesto, kulutus ja lopputulos kirjataan ja verrataan samoilla mittareilla Codexin seuraavaan vastaavaan maamerkkiin. D) VIESTINTÄ. VIESTIT (omistaja 14.10.2026): viestit '
          + 'lähetetään aina send_messagella (mcp__ccd_session_mgmt__send_message) session id:llä osoitekirjasta, ei nimellä; nollauksen jälkeen työkalu ladataan ToolSearchilla '
          + '"select:mcp__ccd_session_mgmt__send_message,mcp__ccd_session_mgmt__list_sessions". "Failed to send … ENOENT" tarkoittaa, että vastaanottaja nollattiin: uusi id osoitekirjasta tai '
          + 'list_sessionsista ja heti uudelleen. Viestiä ei lykätä eikä välitetä omistajan kautta. Jos kanava estyy, sessio kirjoittaa viestin tiedostoon docs/raportit/posti-<rooli>-<pvm>.md ja '
          + 'pushaa, ja Postivahti välittää sen. VIESTIRAJAN HOOK (omistaja 30.9.2026): tools/hooks/viestiraja-muistutus.sh on projektin .claude/settings.json:ssa ja käyttäjätason '
          + '~/.claude/settings.json:ssa (asennin tools/hooks/asenna-viestiraja-hook.sh, kopio /Users/Shared/Claude/hooks/); tilinvaihdon tai Mac-käyttäjän vaihdon jälkeen PT ajaa bash '
          + 'tools/hooks/asenna-viestiraja-hook.sh --tarkista, ja Postivahti tarkistaa saman kierroksellaan; hookia ei poisteta eikä ohiteta. VIESTINTÄ FABLELLE eli PT:lle (tärkein tokenisäästö): '
          + 'viesti VAIN, kun a) erä on valmis ja pushattu, b) sessio on jumissa tai tarvitsee päätöksen, c) PT kysyy. Ei kuittauksia eikä väliraportteja. Viesti on enintään 3 riviä: mitä (haara + '
          + 'commit, testit), SHA ja kuvien polku; pitkä raportti tiedostoon docs/raportit/ ja viestiin vain polku. SHA kopioidaan vain samassa vuorossa ajetun git log --oneline -1 -tulosteesta '
          + '(commit ensin, ei arvattuja SHA:ita). Omistajan löydösraportin rivit päivittää PT; rooli lähettää merkinnän rivinä (löydösnumero, tila, SHA, kuvan polku) eikä tee omaa haaraa. Sessiot '
          + 'puhuvat keskenään suoraan, kun asia ei vaadi päätöstä (esim. Karttaseppä ja Julkaisija polttovuoroista). Kaikki, mikä muuttaa sääntöä tai linjausta, tulee PT:lle yhdellä rivillä lokia '
          + 'varten. Viestit niputetaan, eikä pitkään levossa ollutta roolia herätetä pikkuasialla. LUKEMINEN: kukaan ei lue Raamattua tai lokia kokonaan; luovutusdokumentti ja kohdennetut haut noin '
          + '30 riviä osuman ympäriltä; tiedostot luetaan grep- ja head-otteina. PERUTUT TYÖT (omistaja 14.10.2026 klo 23.59): ennen perutun tai '
          + 'tauotetun työn uudelleenaloitusta PT ja jokainen rooli tarkistaa lokista (grep docs/raamattu-loki/), onko se peruttu; luovutuksissa ei siirretä peruttua työtä eteenpäin. ROOLIN ALOITUS KEVYEKSI (omistaja 14.10.2026 klo 22.4x, kortti "Aloitus"; tavoite: aloitus nollauksen jälkeen '
          + 'enintään 8 % kontekstista): jokaisella roolilla on oma lukulista aloitusviestissään (docs/aloitusviestit/<rooli>.md tai roolin viesti-<rooli>-aloitus.md): LUE ALUSSA enintään 5 kohtaa '
          + '(oma luovutus, omat Raamatun osiot otsikoittain, oma pääohje) ja ÄLÄ LUE (koko Raamattu, muiden luovutukset, kokonaiset lokit); roolitaulukko rooli → lukulista → tarvittavat työkalut on '
          + 'docs/vastuukartta.md:ssä. Luovutus on enintään 60 riviä (docs/moduulit/siirtoraportti.md). Roolilta poistetaan työkalut, joita se ei käytä (deny-rivit roolin '
          + '.claude/settings.local.json:ssa vastuukartan mukaan; Keskustelukanava kokeilee ensin yhdellä roolilla ja mittaa get_usagen System tools- ja MCP tools -osuudet ennen ja jälkeen). '
          + 'Jokaisen roolin MEMORY.md puolitetaan, ja säännöt siirretään Raamattuun. TYÖJONOT (omistaja 8.10.2026): PT pitää tiedostossa /Users/Shared/Claude/Matkakirja-fable/scratchpad/tyojonot.md '
          + 'jokaiselle roolille kohdat NYT ja 1–3 esihyväksyttyä seuraavaa erää sekä junan kuitattujen listan, josta Natiiviseppä kokoaa junan sisällön lukitushetkellä. Kun erä on valmis, rooli '
          + 'ilmoittaa yhdellä rivillä ja aloittaa heti seuraavan ilman kuittausta; [LUPA]-kohdat (omistajan päätös) ja [PT]-kohdat (kysy ensin) ohitetaan. Tyhjä jono → rivi "JONO TYHJÄ: <rooli>" '
          + 'ennen lepoa. PT lisää seuraavan erän jonoon jokaisen kuittauksen yhteydessä. Scratchpadin työtiedostoja muokataan aina väliaikaisen kautta (tmp + os.replace; suoritettavalle tiedostolle '
          + 'shutil.copymode). TYHJÄKÄYNTIVAHTI (omistaja 14.10.2026): PT antaa JONO TYHJÄ -roolille heti seuraavan työn. PT EI AJA JONOKIERROS-CRONIA (omistaja 14.10.2026 klo 22.34), vaan herää '
          + 'Postivahdin herätteestä (ks. POSTIVAHDIN KIERROS); Postivahti herättää PT:n, kun rooli on levossa tai hiljaa yli 20 minuuttia työn ollessa auki (Codex yli 30 min), ja asian jatkuessa '
          + 'Keskustelukanavan. HILJAINEN JUMI: jos rooli on ollut hiljaa yli 30 minuuttia eikä se ole käynnissä (get_session), PT lukee sen viimeiset viestit (list_events, 12) ennen uutta viestiä. '
          + 'E) OMISTAJA. OMISTAJAN KANAVAT: uudet toiminnot sekä bugit ja pienet ideat → PT (pilkkoo ja reitittää), kaappaukset docs/raportit/kaappaukset/omistaja-<pvm>/; Codex-toimitukset → '
          + 'Julkaisija hakee. KYSYMYKSET (omistaja 14.10.2026, KYSYMYKSET-SESSIO → KESKUSTELUKANAVA; korvaa osion 0 kohdan KYSYMYKSET OMISTAJALLE TEKSTINÄ VUORON LOPUSSA): omistajan päätöstä '
          + 'vaativa kysymys lähetetään vain Keskustelukanavalle viestinä "KYSYMYS <tunnus>" (kysyjä, tilanne, vaihtoehdot, suositus ensin), ja työ jatkuu heti; Keskustelukanava näyttää kortin '
          + '(AskUserQuestion) ja palauttaa vastauksen sanatarkasti. PT ei näytä kortteja eikä kirjoita omistajalle suoraan. Kortteja saa esittää milloin vain; yöllä (noin 00–07) ja kun omistaja on '
          + 'mennyt nukkumaan, PT ei odota vastausta vaan jatkaa oletuksella, ja rooli saa oletuksen. Kysymys esitetään vasta, kun vastauksesta riippumaton työ on tehty, 1–4 kerrallaan; jos omistaja '
          + 'vastaa omin sanoin ja kysyy jotain, PT vastaa ensin ja kysyy samasta aiheesta uudelleen vain, jos päätös yhä puuttuu. Roolit eivät kysy omistajalta mitään, vaan raportoivat PT:lle (JUMI '
          + '→ FABLE). Kaavan mukaisista askelista (vihreät PR:t, oman toimivallan luvat) ei kysytä. TAVOITELTU KOKEMUS: PT:n käsky kuvaa, mitä pelaaja näkee ja tuntee, ja rooli tuo yhden '
          + 'suositellun version (kuvapari tai video ja 3–4 riviä perusteluja); omistajalle vain aidot makuvalinnat, ei numeroparametreja. EI VÄLIAIKAISIA POIKKEAMIA: kun rooli ilmoittaa poikkeaman '
          + 'omistajan päätöksestä, sitä ei hyväksytä väliaikaisena, vaan poikkeava osa poistetaan ja julkaisu sidotaan riippuvuuteen. OMISTAJAN TOIMET: kun omistajan pitää tehdä jotain, viesti '
          + 'alkaa otsikolla "TOIMI TARVITAAN: <aihe>", sen alla lihavoitu yhden rivin ohje (mihin ikkunaan ja mitä), ja jokainen ajettava komento on omassa bash-lohkossaan yhdellä rivillä '
          + '(salaisuus kysytään read -s:llä, arvoa ei kirjoiteta chattiin); kortti vain kuittaukseen (Tehty / Ei nyt). Toisen session lupaikkunaa ei hyväksytä sen puolesta. Omistajaa ei pyydetä '
          + 'muuttamaan näytön asetuksia (2560 × 1440 on oikea); korjaus tehdään koodiin. VAATII TOIMIA (omistaja 12.10.2026, SITOVA kaikille sessioille myös PT:lle): kun sessiolla on omistajalle '
          + 'kysymys tai pyyntö, joka vaatii hänen toimiaan (lupaikkuna tai vastaus session omassa ikkunassa, kirjautuminen, ostos tai päätös, jonka vain omistaja voi tehdä), se nostetaan '
          + 'Asemataululle HETI: ArtifactData set kokoelma "talo", dokumentti "toimi-<rooli>" (pienin kirjaimin ilman ääkkösiä, välilyönti viivaksi, esim. toimi-natiiviseppa), kentät rooli, '
          + 'kysymys (yksi rivi: mitä omistajan pitää tehdä ja missä ikkunassa) ja ts. Artifact-työkalu on vain PT:llä, Asemataululla, Julkaisijalla, Natiivisepällä ja Postivahdilla (KK:n työkalukevennys 14.10.2026 klo 23.14, Postivahti 23.39); '
          + 'muut lähettävät PT:lle rivin "VAATII TOIMIA: <rooli>: <asia>", ja PT kirjoittaa dokumentin. Kun asia on hoidettu, dokumentin kirjoittaja poistaa sen '
          + '(ArtifactData delete if_version). ODOTTAA OMISTAJAA (omistaja 4.10.2026): rooli ilmoittaa PT:lle ennen '
          + 'kuin jää odottamaan omistajaa; omistaja näkee odotuksen session omasta ponnahdusikkunasta (Remote Control) ja Asemataululta, ja Postivahti kertoo sen PT:lle rivillä. EI PUSH-ILMOITUKSIA '
          + '(omistaja 14.10.2026): mikään sessio ei lähetä PushNotificationia. OMISTAJALLE VAIN HÄNTÄ KOSKEVAT ASIAT (omistaja 9.10.2026): PT raportoi vain sen, mikä vaatii omistajan päätöstä, '
          + 'toimea tai hyväksyntää, tai näkyy hänelle valmiina (TestFlight valmis, hyväksyttävät pelikuvat, vastaukset hänen kysymyksiinsä); omistajalle näytetään vain se, mitä pelaaja näkisi. '
          + 'Valmiit asiat menevät Keskustelukanavalle yhdellä rivillä, ja se välittää oleelliset. Roolien nollaukset, kuittaukset, sisäiset päätökset, levysiirrot ja kierrokset eivät mene chattiin, '
          + 'vaan lokiin ja tyojonot.md:hen. Vastaus omistajan kysymykseen kirjoitetaan vuoron VIIMEISEKSI tekstiksi, koska työkalukutsujen väliin jäävä teksti ei näy puhelimessa. RUTIINIVUORO ILMAN '
          + 'TEKSTIÄ (omistaja 10.10.2026): PT:n rutiinivuoro päättyy pelkkään viivaan "–", eikä "Ei sinulle uutta" -rivejä kirjoiteta. VAIN SUOMEKSI (omistaja 1.10.2026): kaikki omistajalle näkyvä '
          + 'teksti (vastaukset, väliviestit, kortit, kuvatekstit ja komentojen kuvaukset) kirjoitetaan suomeksi ilman selittämätöntä ammattisanastoa (esim. pystyleike, ABAB, VIE, runko, SHA: sano '
          + 'mitä tarkoitetaan tai selitä samassa lauseessa); tekniset nimet (tiedostot, komennot, haarat) saavat jäädä. F) PT:N TOIMIVALTA JA KIRJAUS. FABLEN KÄSKYT ILMAN OMISTAJAN VÄLITYSTÄ '
          + '(omistaja 23.9.2026): PT antaa kaikille sessioille käskyt suoraan, ja ne ovat sitovia Raamatun linjausten sisällä; estot raportoidaan, niitä ei kierretä. Sessiot eivät pyydä omistajalta '
          + 'lupaa asioihin, jotka Raamattu tai PT:n käsky jo sallii (mm. merget, julkaisut, ämpärikirjoitus, TestFlight-ajot sisäiseen ryhmään, omien samana päivänä luotujen varmenteiden '
          + 'peruminen); omistajalta kysytään vain Raamatun mukaan kysyttävät asiat (julkisen TestFlight-linkin ryhmä, App Store -lähetys ja hinta, kuoriappin varmenteet, lupakirjeiden lähetys, '
          + 'maksut). TYÖNJOHTAJAN HARKINTA (omistaja 25.9.2026): PT kysyy jokaisessa käskyssä ensin itseltään, miten asia kannattaa tehdä juuri tässä tilanteessa (kone vapaa vai kuormassa, yö vai '
          + 'päivä, omistaja hereillä vai ei, mitä muuta on kesken), eikä sovella sääntöä sokeasti; aidosti omistajalle kuuluva valinta menee Keskustelukanavalle (KYSYMYKSET). OPERATIIVISET '
          + 'PÄÄTÖKSET (omistaja 11.10.2026): PT päättää koneen resurssit, vuorot, järjestyksen ja työnjaon itse kysymättä ja kertoo omistajalle vain häntä koskevan tuloksen; Raamatun erikseen '
          + 'vaatimat luvat pysyvät. JUMI → FABLE (omistaja 25.9.2026): jos sessio jää jumiin (päätös puuttuu, työ ei etene, luokitin tai lupakysely estää toimen), se ei kysy omistajalta eikä jää '
          + 'odottamaan, vaan lähettää PT:lle yhden viestin (tilanne, vaihtoehdot, oma suositus) ja jatkaa jonon muuta työtä. Hylätty tai vastaamaton lupa estää vain sen yhden komennon; PT antaa '
          + 'toisen toteutustavan, eikä toinen sessio aja hylättyä komentoa sen puolesta. PT päättää Raamatun sisällä itse. MERGET: PT mergeää vain raportti-, loki- ja README-PR:t; js/-, tools/-, '
          + 'packs- ja workflow-PR:t sekä docs-PR:t, joita testi tai *-data.js lukee, menevät Julkaisijan junaan. Ei --delete-branchia; oma mergetty PR → unbind_pr heti; lokia ei mergetä suoraan, '
          + 'kun junassa on lokia muuttava PR. PT:N HAARA: ennen Raamattu-muutosta git rev-list --count HEAD..origin/main, ja yli noin 20 → merge origin/main; Raamattu- ja lokimuutokset menevät '
          + 'mainiin omalla PR:llä worktreestä. VANHENTUNEET OHJEET (omistajan kortti 14.10.2026): vanhentuneet tiedot CLAUDE.md:ssä, Raamatussa ja docs/:ssa korjataan kysymättä (CLAUDE.md:n korjaa '
          + 'Keskustelukanava, muut PT); uudet säännöt aina omistajan kortilla. MUISTI = RAAMATTU (omistaja 8.10.2026, SITOVA): Clauden oma muisti ei kulje tilien, Mac-käyttäjien, pilvisessioiden '
          + 'eikä Codexin välillä, joten jokainen pysyvä linjaus, työtapa, opittu virhe ja omistajan toive kirjataan samassa vuorossa Raamattuun (voimassa oleva) ja lokiin (historia); mikään sääntö '
          + 'ei saa olla pelkästään muistissa, ja luovutukset viittaavat Raamattuun ja lokiin. KIRJAUS: PT kirjaa jokaisen päätöksen lokiin tools/raamattu-kirjaa.mjs:llä date-ajalla (ei arvattuja '
          + 'kellonaikoja); Raamatun linjausta muutetaan vain, kun sääntö muuttuu; luovutus session lopussa docs/raportit/viesti-fable-luovutus-<pvm>.md, ja PT:n luovutuksessa on oma lista "ODOTTAA '
          + 'OMISTAJAA". G) KOMENTOSÄÄNNÖT (koskevat kaikkia sessioita ja jokaista ali-agenttia; omistaja 8.10. ja 11.10.2026, PT 3.10.–13.10.2026): komentoja ei kääritä muotoon zsh -c tai bash -c '
          + 'eikä evalia käytetä, koska Claude Code ei pysty tarkistamaan niitä ja kysyy lupaa omistajalta myös ohitustilassa; pidemmät skriptit kirjoitetaan tiedostoon (scratchpad) ja ajetaan '
          + 'tiedostosta, ei tulkin stdin-heredocina. Agentit eivät käytä cd:tä eivätkä &&- tai ;-ketjuja, vaan absoluuttisia polkuja. rm:ää ei ajeta muuttujapoluilla eikä -c-merkkijonossa; poistot '
          + 'ja siirrot tehdään vain valmiilla työkaluilla, jotka eivät avaa lupaikkunaa, ja EI POISTOJA OMAN CHECKOUTIN ULKOPUOLELTA (rooli ei poista mitään oman checkoutinsa tai erä-worktreensä '
          + 'ulkopuolelta; vanhat lokit ja .app-kopiot jäävät yösiivoukselle). XTRACE KIELLETTY: zsh -x, bash -x ja set -x tulostavat ladatut avaimet transkriptiin. Haut (find, grep) aina rajattuun '
          + 'kansioon, ei juuresta eikä koko NAS:lta tai T7:ltä. Prosessit lopetetaan vain omalla pid:llä, ei koskaan pkill- tai killall-komennolla yleisellä kuviolla. Aikarajallinen lippu (esim. '
          + '/tmp/matkakirja-kevyt) saa ajastetun poiston samalla, kun se luodaan. Yli noin 10 minuutin poltot, viennit ja ketjut käynnistetään omaan prosessiryhmäänsä (setsid, exec listamuodossa) '
          + 'mkdir-lukolla. Jos lupakysely silti tulee, JUMI → FABLE. AJOT AINA MYKISTETTYINÄ (omistaja 14.10.2026): simu-, Mac- ja Unityn batch- ja editoriajot alkavat komennolla aani mykistys, '
          + 'Macin kaiuttimista ei soiteta mitään, ja esikatselun välilehti suljetaan aina tabs_close-komennolla (preview_stop ei sulje sivua); äänellinen tallenne kootaan klipeistä tiedostoon. '
          + 'HUOLTOKOMENNOT ILMAN OMISTAJAA (omistaja 25.9.2026): koodaus-käyttäjällä on sudo ilman salasanaa täsmälleen neljälle komennolle (/etc/sudoers.d/matkakirja-huolto): killall coreaudiod '
          + '(äänidemoni yli 200 % CPU yli 2 min), killall -9 com.apple.CoreSimulator.CoreSimulatorService, killall mDNSResponder ja purge. Postivahti ajaa coreaudiod-komennon kierroksellaan '
          + 'raja-arvon ylittyessä; muut ajaa rooli, jonka työ on jumissa, ja ilmoittaa PT:lle rivillä. Laajempaa sudoa ei anneta, ja uusi komento lisätään omistajan päätöksellä. Sallintasäännöt '
          + 'ovat projektin .claude/settings.json:ssa. H) KONE. NICE-OLETUS (omistaja 28.9.2026, sitova): kaikki raskaat työt (poltot, käännökset, testisarjat, savukkeet, agenttiajot, Mac-ajurin CI) '
          + 'ajetaan nice -n 15, jolloin ne käyttävät kaikkia ytimiä mutta omistajan ohjelmat menevät edelle. GPU ja muisti eivät väisty: Mac-savukkeita enintään 2 rinnakkain, simulaattoreita '
          + 'päivällä 1, ja paistot yksi kerrallaan ilman rinnakkaisia testejä (ennen ajoa vm_stat free + inactive + speculative vähintään 20 Gt ja swap alle 2 Gt). Ennen simun boottia, '
          + 'Unity-renderöintiä, Metal-Chromiumia ja GPU-polttoa ajetaan tools/gpu-vapaa.sh. HILJAINEN TUNTI (PT 14.10.2026; kumoaa linjan, jonka mukaan raskaat ajot jatkuivat taskpolicy -b:llä): '
          + 'kun omistaja käyttää Macia ("OMISTAJA KÄYTTÄÄ MACIA"), raskaita ajoja (testit, piirrot ja laskennat, paistot, agentit) ei tehdä, vaan ne odottavat; vain verkkolataukset jatkuvat, ja '
          + 'linja 2 ja toinen simu tauotetaan ensimmäisinä. Kevyt tila: lippu /tmp/matkakirja-kevyt ajastetulla poistolla ja KIIREELLINEN-viesti rooleille; käännökset nice 15 ja -jobs 4, ei '
          + 'taskpolicy -b:tä. GUI-automaatiota (napsautukset, näppäinkomennot) ei ajeta, kun omistaja on koneella (HIDIdleTime alle noin 60 s). I) NOLLAUS JA KIINTIÖT. NOLLAUSRAJAT ROOLEITTAIN '
          + '(omistaja 14.10.2026 klo 22.55, kortti "Rajat"; korvaa 50 %:n (10.10.) ja 35 %:n (22.4x) yhteisen rajan; peruste scratchpad/keskustelukanava/nollausraja-20261014.md): jokainen '
          + 'työkalukutsu lukee koko kontekstin uudelleen, ja yli välimuistin elinajan (pääsessiot 1 h, ali-agentit 5 min) levossa ollut sessio lukee sen täyshintaisena, joten nollaus kannattaa '
          + 'lähellä roolin kulutusoptimia. Rajat: Postivahti 20 %; koodi-, kartta- ja sisältöroolit, Julkaisija ja Asemataulu 25 %; Päätoimittaja, Laitetestaaja ja Äänittäjä 30 %; Keskustelukanava '
          + '40 %. LIUKUMA (omistaja 14.10.2026 klo 22.57, kortti "Liukuma"): luvut ovat pehmeitä rajoja; niiden ylityttyä rooli nollautuu ensimmäisellä luontevalla tauolla (tehtävä valmis, muutos '
          + 'pushattu tai odottaa käännöstä), viimeistään kovalla rajalla = pehmeä + 10 %-yksikköä (Postivahti 20–30, koodi-, kartta- ja sisältöroolit, Julkaisija ja Asemataulu 25–35, PT, '
          + 'Laitetestaaja ja Äänittäjä 30–40, KK 40–50 kortilla). Uutta isoa tehtävää ei aloiteta pehmeän rajan yli, vaan nollaus ensin. Voimaan viimeistään roolin seuraavassa nollauksessa; '
          + 'Postivahti mittaa myös levossa olevat. '
          + 'VALVONTA JA PAKKONOLLAUS (omistaja 15.10.2026 klo 14.39; syy: PT:n konteksti karkasi 59 %:iin, koska rajaa ei valvottu): 1) KONTEKSTIVAHTI-koukku (Päätoimittajan kansio, /Users/Shared/Claude/hooks/pt-taulu-muistutus.py) lukee jokaisen saapuvan ja lähetetyn viestin yhteydessä session oman kontekstin ja muistuttaa 30 %:ssa (PT pehmeä), 35 %:ssa (KK aloitus.md) ja 40 %:ssa (PT kova raja: luovutus heti, toistuu 10 min välein; KK nollauskortti); koukun muistutus on käsky. 2) Postivahti lukee joka kierroksella, myös harvennetulla, PT:n ja KK:n kontekstin sekä jokaisen roolin, jonka lastActivityAt on muuttunut; PT ≥ 40 % = pakkonollaus (rivi PT:lle ja KK:lle, LUOVUTUS VALMIS → nollaus, 20 min ilman luovutusta → KK hoitaa); roolin kovalla rajalla Postivahti käskee myös roolia suoraan luovuttamaan (KK 15.10.2026 klo 16.1x). 3) PT lukee oman kontekstinsa (get_usage self) jokaisen KK:n tai omistajan pyynnön alussa ja ennen raskasta vaihetta; pehmeän rajan yli ei aloiteta uutta isoa tehtävää. 4) Tilinvaihdon tai muun raskaan kertatyön (sessioiden luonti, Asemataulun julkaisu) jälkeen PT luovuttaa ja nollautuu heti. 5) Raskaat lukemat (Asemataulun HTML, kokonaiset muistikansiot, pitkät lokit, list_sessions include_archived) Sonnet-ali-agentille, joka palauttaa tiivistelmän. 6) Ennen PT:n nollausta keskustelu tallennetaan (tools/tallenna-keskustelu.py), ja Postivahti tarkistaa tiedoston ennen clear_sessionia. 7) KK avaa Asemataulun nollauksen jälkeen Artifact-työkalun open-toiminnolla (ei lukua eikä uudelleenjulkaisua). '
          + 'VAIN KESKUSTELUKANAVAN NOLLAUS KYSYTÄÄN OMISTAJALTA, koska omistaja keskustelee vain sen kanssa; muut nollautuvat luovutuksen jälkeen ilman '
          + 'omistajan vahvistusta (Postivahti hoitaa, pysyvä lupa 14.10.2026 klo 22.51). ROOLIN NOLLAUS: kun konteksti ylittää roolin rajan, rooli kirjoittaa luovutuksen '
          + 'docs/raportit/viesti-<rooli>-luovutus-<pvm>.md (enintään 60 riviä), pushaa ja lähettää Postivahdille "LUOVUTUS VALMIS <sha>", ja Postivahti nollaa sen Matkakirja-posti/NOLLAUS.md:n '
          + 'mukaan. PT:N OMA NOLLAUS (30 %): PT tallentaa keskustelunsa (python3 tools/tallenna-keskustelu.py → /Users/Shared/Claude/keskustelut/, polku luovutukseen), kirjoittaa luovutuksen '
          + 'docs/raportit/viesti-fable-luovutus-<pvm>.md ja aloitusviestin docs/raportit/viesti-fable-aloitus.md, pushaa ja pyytää Postivahtia nollaamaan; uusi sessio avaa ensimmäisenä Asemataulun '
          + 'ja jatkaa CLAUDE.md:stä, tästä kohdasta ja luovutuksesta. KESKUSTELUKANAVA (40 %, OMA NOLLAUS VAIN KORTILLA, omistaja 14.10.2026): KK päivittää ensin aloitus.md:nsä ja kysyy kortilla '
          + '"Nollaanko nyt?"; se nollataan vain omistajan Kyllä-vastauksella, eikä Postivahti nollaa sitä. Heti nollauksen jälkeen KK kytkee set_remote_control self true ja avaa Asemataulun. '
          + 'POSTIVAHTI nollaa itsensä, kun PT pyytää ja luovutus on valmis. Ei /compact eikä "Resume previous session". VIIKKOKIINTIÖ (omistaja 24.9., 2.–7.10. ja 12.10.2026; siirretty 14.10.2026 '
          + 'osion 0 kohdasta PELIT, TALOUS JA LUENTA): koodaustileillä viikkokäytön 99 % → vain yksi rivi omistajalle, ei keventämistä eikä pysäytystä; omistajan päätili (jolla hän käyttää Claudea '
          + 'myös muuhun) vaihdetaan jo 50 %:ssa: PT kirjoittaa siirtopromptin ja kertoo siitä omistajalle yhdellä rivillä, ja Postivahti hälyttää 50 %:ssa. 5 tunnin kiintiön perusteella taukoja ei '
          + 'määrätä ennen 98 %:a. J) POSTIVAHTI JA ASEMATAULU. POSTIVAHDIN KIERROS (omistaja 9.10. ja 14.10.2026): Postivahti ajaa kierroksen ScheduleWakeupilla kehotteella "Lue '
          + '/Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan" 4–5 minuutin välein ja 20 minuutin välein, kun kaikki roolit lepäävät eikä junaa ole käynnissä (omistaja '
          + '14.10.2026 klo 22.34); KIERROS.md (peili tools/tyotavat/) on sitova sisältö. Uusi, nollattu tai tilinvaihdon jälkeen avattu Postivahti käynnistää ajastuksen ensimmäisenä toimenaan ja '
          + 'uusii sen viikoittain (CronCreate vanhenee 7 vuorokaudessa). HERÄTTEET PT:LLE (omistaja 14.10.2026 klo 22.34): rooli levossa tai hiljaa yli 20 min, Codex-posti, äänisivun valinta, levy '
          + 'alle 80 Gi, kontekstiraja, TF-vaihe ja ODOTTAA. PT lukee oman asteensa (get_usage self) herätteen yhteydessä ja tarkistaa kerran tunnissa list_eventsillä, että Postivahdin viimeisin '
          + 'kierros sisältää kontekstiluvut; puuttuvat luvut = ajastus rikki, korjataan heti. ASEMATAULU (omistaja 10.10.–14.10.2026): kehityksen tilataulu on artefakti Asemataulu (Talon tila '
          + '-lisäosa ja Postivahdin tilataulu.md on poistettu). JOKAISELLA TILILLÄ ON OMA KOPIO, koska toisen tilin taulun tietokantaan ei voi kirjoittaa; osoitteet ovat tiedostossa '
          + 'Matkakirja-fable/scratchpad/asemataulu/osoitteet.md (id:itä ei kirjoiteta Raamattuun), tilinvaihdon vaiheet docs/tilinvaihto.md. Sivun hyväksytty lähde on '
          + 'tools/asemataulu/asemataulu.html (jokainen muutos myös repoon samana päivänä docs-PR:llä tools/asemataulu/-kansioon), ja tiedot ovat Macin tiedostoissa '
          + 'Matkakirja-fable/scratchpad/asemataulu/data/talo/<dokumentti>.json. AVATAAN AINA SESSION ALUSSA: PT avaa tilin oman Asemataulun (Artifact open) omistajan näkyviin ENSIMMÄISENÄ, ennen '
          + 'muuta työtä, jokaisen uuden session, oman nollauksen ja tilinvaihdon alussa. KIRJOITTAJAT: tietokannan kokoelman "talo" jokaisella dokumentilla on yksi kirjoittaja, ja kirjoitus tehdään '
          + 'ArtifactDatalla if_version-ehdolla: Asemataulu-sessio = mittarit, roolit, laitteet sekä Raati ja Testaajat; PT = junat, tyolista, tehtavat, viestit ja huom (tapahtumat, kuten '
          + 'kuittaukset ja omistajan uudet pyynnöt, AINA samassa vuorossa tiedostoihin; PT:n hook tools/hooks/pt-taulu-muistutus.py muistuttaa); Natiiviseppä (vaiheet 1–4) ja Julkaisija (vaihe 5) = '
          + 'eteneminen; Postivahti lukee talo/boost (omistaja 23.39); toimi-<rooli> = rooli itse, jos sillä on Artifact-työkalu, muuten PT. Muilta rooleilta Artifact-työkalut on estetty (KK:n '
          + 'työkalukevennys 14.10.2026 klo 23.14; Äänittäjällä Artifact vain äänisivun julkaisuun, PT 14.10.2026; Boost-napin rakentaa Asemataulu-sessio asemataulu-julkaisu.html:ään). Kukaan ei kirjoita toisen dokumenttiin; puuttuva tieto pyydetään omistavalta roolilta. Päivitä-napin vienti ja PT:n etenemisen tyhjennys '
          + 'junan saavuttua TF:ään ovat ainoat poikkeukset. ASEMATAULUN OMA SESSIO (omistaja 13.10.2026): rooli Asemataulu (Sonnet, low), checkout Matkakirja-asemataulu, ohje '
          + 'Matkakirja-fable/scratchpad/asemataulu/ASEMATAULU-ROOLI.md; vie muuttuneet tiedostot tauluun (tools/asemataulu/synkka.py, batch if_versionilla) ja tarkistaa junat, työlistan ja tehtävät '
          + 'roolien todellisesta tilasta (valmistunut kohta osioon Junassa N; epävarmasta kysytään PT:ltä); ilmoittaa PT:lle "ASEMATAULU VANHA", kun junat tai työlista on yli 45 min vanhempi kuin '
          + 'viimeisin tapahtuma tai työlista yli 6 h. PÄIVITYSRYTMI JA BOOST (omistaja 14.10.2026 klo 22.34, 22.40 ja 23.39; korvaa sykkeen ja "5 min päivällä / 1 h yöllä" -linjan): mittarit '
          + '(kulutus, muisti, kone), roolit ja laitteet päivittyvät vain BOOSTIN aikana 5 minuutin välein (yksi koontiskripti, vienti vain muuttuneesta, versiot tiedostosta); Boost-nappi '
          + 'kirjoittaa talo/boost, Postivahti lukee sen kierroksellaan (enintään 20 min) ja herättää Asemataulun, ja Boost sammuu itsestään tunnin kuluttua; muulloin kierros A ja viennit ovat '
          + 'tauolla. Junien vaiheet ja VAATII TOIMIA -nostot tauluun heti; sisällön tarkistus tunnin välein; Raati- ja Testaajat-luvut kerran päivässä (klo 08) ja kun uusi juna saapuu TF:ään. Kun kirjoittava rooli tarvitsee omistajan '
          + 'luvan (esim. artefaktiin kirjoittamiseen nollauksen jälkeen), se kertoo siitä heti PT:lle. JUNAKORTTI (omistaja 14.10.2026 klo 23.59): valmiin junan (TF N) kortissa on vain yksi Uutta-lista (pyydetyt muutokset ja '
          + 'muut uudistukset), ei Valmiina-osiota; kertyvän junan kortissa Valmiina ja Työn alla ennallaan. Ulkoasu, tietomuodot, Päivitä-nappi, junan eteneminen, Sinulle-osio ja taulun tyyli: '
          + 'docs/moduulit/asemataulu.md. K) SESSIOIDEN LUONTI JA TILINVAIHTO. SESSIOIDEN LUONTI ILMAN OMISTAJAA (omistaja 25.9.2026): jos roolisessioita ei ole (tilinvaihto, appin '
          + 'uudelleenkäynnistys, uusi rooli), PT luo ne itse ohjaamalla Claude-appia osascriptillä ja kuvakaappauksilla (sallinnat Bash(osascript:*), Bash(screencapture:*) ja Bash(sleep:*) PT:n '
          + '.claude/settings.local.json:ssa). Kaava per sessio, kuvakaappaus ja tarkistus joka vaiheen jälkeen: 1) Tiedosto › Uusi istunto (valikot suomeksi); 2) Tiedosto › Avaa kansio…; 3) '
          + 'valitsimeen "/" ja ERILLISENÄ näppäilynä loppupolku Users/Shared/Claude/Matkakirja-<rooli>, Return; 4) Avaa; 5) "Trust this workspace?" → Tab + Return (vain '
          + '/Users/Shared/Claude/-roolikansioille); 6) malli mallichipistä pikanäppäimellä (1 = Opus, 3 = Sonnet); 7) aloitusviesti kenttään yhdellä rivillä ("Olet <rooli> (<malli>), checkout '
          + '<polku>, aja ensin git fetch origin && git checkout <haara> && git pull, lue docs/raportit/viesti-<rooli>-aloitus.md kokonaan ja toimi sen mukaan, PT:n session id <id>, kuittaa PT:lle '
          + 'yhdellä rivillä") ja Return; 8) list_sessions → id, set_session_title roolinimeksi, id osoitekirjaan. Radix-valikot eivät reagoi click at -klikkiin, näppäimet toimivat; '
          + 'modifier-näppäimiä ei käytetä; koordinaatit otetaan kuvakaappauksesta. ENSISIJAINEN KAAVA 15.10.2026 ALKAEN (PT, tilinvaihto): start_session (cwd roolikansio, use_worktree false, malli, effort enintään PT:n oma, lupatila) ja heti detach_session, jolloin sessio on itsenäinen eikä GUI-ohjausta tarvita; tilin vanhat sessiot tyhjennetään send_messagella (rooli kutsuu clear_session self), ja yllä oleva osascript-kaava jää varalle. UUSI TILI TARKISTAA (omistaja 28.9.2026): uudella tilillä tai sessiolla PT tarkistaa heti Asemataulun avauksen '
          + 'jälkeen, että set_session_effort-sallinta on voimassa; jos ei, PT antaa omistajalle komennon bash-lohkona ennen roolisessioiden luontia. TILINVAIHDON TARKISTUSLISTA: docs/tilinvaihto.md '
          + '(ks. osion 0 kohta TYÖSKENTELYTAVAT AINA RAAMATTUUN). ROOLIEN KANSIOT JA MALLIT (kaikki /Users/Shared/Claude/ alla; haara = rooli-checkoutin työhaara, aloitusviesti '
          + 'docs/raportit/viesti-<rooli>-aloitus.md roolin uusimmassa origin-haarassa): Julkaisija Matkakirja-julkaisija (Opus); Natiiviseppä Matkakirja-3d-selvittaja, haara selvittaja-3d-luovutus '
          + '(Opus); Pelikoodari Matkakirja-pelikoodari (Opus); Natiivi-UI Matkakirja-natiivi-ui (Opus); Linssiseppä Matkakirja-linssiseppa (Opus; museot ja opas); VALOSEPPÄ (ent. Linssiseppä 2, '
          + 'omistaja 14.10.2026) Matkakirja-linssiseppa-2 (Opus; valo, ilmakehä, materiaalit, avaruuskohtaukset); Siirtoseppä Matkakirja-siirtoseppa (Opus); Karttaseppä Matkakirja-karttaseppa '
          + '(Opus); Sisältökirjuri Matkakirja-sisaltokirjuri (Sonnet); Laitetestaaja Matkakirja-laitetestaaja (Sonnet); Äänittäjä Matkakirja-aanittaja, haara aanittaja-tyo-20261011 (Sonnet); '
          + 'Postivahti Matkakirja-posti, haara postivahti (Sonnet); Asemataulu Matkakirja-asemataulu, haara asemataulu/tyo (Sonnet); Päätoimittaja Matkakirja-fable (malli vaihtelee; vanha nimi '
          + 'Fable); Keskustelukanava Matkakirja-fable (Opus, max). OSOITEKIRJA (omistaja 14.10.2026): /Users/Shared/Claude/osoitekirja.md (rooli → session id, kansio, malli; PT päivittää jokaisessa '
          + 'muutoksessa). VASTUUKARTTA: docs/vastuukartta.md (aineisto tai koodialue → omistava rooli). Loki: docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 11.10.2026: TYÖTAPA JA SESSIOT '
          + '(11.10.2026 klo 15.44), #KARSINTA 11.10.2026: KYSYMYKSET KORTILLA (11.10.2026 klo 15.44), #KARSINTA 0.11 JUNAT JA TESTAUS 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 PILVIAJOT '
          + '14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 ROOLIT 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 TYÖTILAT, SIMULAATTORIT JA LEVY 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA '
          + '0.11 KÄÄNNÖKSET, TARKISTUS JA MALLIT 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 VIESTINTÄ JA TYÖJONOT 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 OMISTAJAN KANAVAT JA '
          + 'KYSYMYKSET 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 KOMENTOSÄÄNNÖT, MUISTI, KIRJAUS JA CI 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 KONTEKSTIN NOLLAUS 14.10.2026 '
          + '(14.10.2026 klo 22.55), #KARSINTA 0.11 POSTIVAHTI JA ASEMATAULU 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 NOLLAUKSET JA KIINTIÖ 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 '
          + 'KÄÄNNÖSLINJAT JA TILATAULU 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 VIESTIRAJA 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.11 KÄSKYT, HARKINTA, NICE JA JUMI 14.10.2026 '
          + '(14.10.2026 klo 22.55), #KARSINTA 0.11 HUOLTO, SESSIOIDEN LUONTI JA ROOLIEN KANSIOT 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.9 VIIKKOKIINTIÖ 14.10.2026 (14.10.2026 klo 22.55), '
          + '#KARSINTA 0.12 SILMUKAT 14.10.2026 (14.10.2026 klo 22.55), #KARSINTA 0.19 KYSYMYKSET OMISTAJALLE 14.10.2026 (14.10.2026 klo 22.55), #OMISTAJAN PÄÄTÖS: ASEMATAULUN PÄIVITYSRYTMI JA PT:N '
          + 'HERÄTTEET (14.10.2026 klo 22.55), #OMISTAJAN PÄÄTÖS: RAATI JA TESTAAJAT HARVEMMIN, KOLMAS PALKKI KESKUSTELUKANAVALLE (14.10.2026 klo 22.55), #OMISTAJAN PÄÄTÖS: SÄÄSTÖT 2 (KUVA-ARKIT, '
          + 'NOLLAUSRAJA 35 %, JULKAISIJA MEDIUM) (14.10.2026 klo 22.55), #OMISTAJAN PÄÄTÖS: ROOLIEN ALOITUS KEVYEMMÄKSI JA LUKULISTAT (14.10.2026 klo 22.55), #PT:N PÄÄTÖKSET: TYÖTAVAN RISTIRIIDAT '
          + '(LÄPIKÄYNTI 0.11) (14.10.2026 klo 22.55), #OMISTAJAN PÄÄTÖS: NOLLAUSRAJAT ROOLEITTAIN (14.10.2026 klo 22.57), #OMISTAJAN PÄÄTÖS: NOLLAUSRAJAT LIUKUMINA (14.10.2026 klo 22.59), #OMISTAJAN PÄÄTÖS: KESKUSTELUKANAVAN VÄLITTÄMÄ PÄÄTÖS ON '
          + 'OMISTAJAN PÄÄTÖS (14.10.2026 klo 23.34), #KK:N TYÖKALUKEVENNYS: ASEMATAULUN KIRJOITTAJAT JA ARTIFACT-ESTO (14.10.2026 klo 23.34), #OMISTAJAN PÄÄTÖS: ASEMATAULUN BOOST-NAPPI (14.10.2026 klo 23.41), #PT:N PÄÄTÖS: ÄÄNITTÄJÄLLE ARTIFACT ÄÄNISIVUA VARTEN, BOOST-NAPPI ASEMATAULULLE (14.10.2026 klo 23.49), #OMISTAJAN PÄÄTÖS: JUNAKORTTI YHDELLÄ UUTTA-LISTALLA (15.10.2026 klo 00.07), #OMISTAJAN PÄÄTÖS: EIFFELIN OMA MALLI LOPETETAAN, PERUTUT TYÖT LOKISTA (15.10.2026 klo 00.07).',
        'UI-POHJAT JA TYYLIMÄÄRITTELYT (omistaja 1.10.2026, SITOVA, koskee jokaista sessiota ja jokaista uutta ominaisuutta, linssiä, ikkunaa, korttia, nostoa ja paneelia sekä natiivissa että '
          + 'webissä; erotettu 14.10.2026 omaksi kohdakseen kohdasta TYÖTAPA JA SESSIOT): uudet asiat tehdään AINA olemassa olevilla tyylimäärittelyillä ja pohjilla (värit, typografia, koot, kortit, '
          + 'nostot, paneelit, napit, Pulun chat ja taulut; tokenitiedosto, pohjagalleria ja tyylikirja linssikatalogin alla). Jos jokin tarvittava elementti tai muunnelma puuttuu, OMAA RATKAISUA EI '
          + 'TEHDÄ: sessio kysyy ensin Päätoimittajalta (JUMI → FABLE), joka vie kysymyksen omistajalle; vasta omistajan päätöksen jälkeen uusi elementti lisätään pohjiin ja tyylikirjaan. Tarkoitus: '
          + 'peliin ei synny vahingossa uusia erityyppisiä ikkunoita, värejä tai asetteluja. Merge-pyynnössä kerrotaan, mitä pohjaa käytettiin; Natiiviseppä ja Julkaisija eivät mergeä pohjista '
          + 'poikkeavaa käyttöliittymää ilman omistajan päätöstä. Natiivissa Natiivi-UI:n pohjavahti (proto tyokalut/pohjavahti.py, lähtötaso tyylikirja/pohjavahti.json) laskee uudet värivakiot, '
          + 'kovakoodatut värit ja fonttikoot sekä yli 250 ms siirtymät; määrä saa vain pienentyä, ja vahti ajetaan ennen merge-pyyntöä. UI KEVYT (omistaja 2.10.2026 ja 14.10.2026 klo 22.4x: '
          + '"Molemmat alle 250 ms"): ei koristeita (leimat, kehykset, turha tyhjä tila); kortti tai paneeli peittää enintään 45 % ruudusta ja on kohteen vieressä eikä koko leveyden arkkina; kaikki '
          + 'käyttöliittymän siirtymät ja animaatiot ovat alle 250 ms (myös aiemmat 320 ja 280 ms:n poikkeukset poistuvat); jatkuva sisältöliike (esim. pallon heilunta) ei ole siirtymä. '
          + 'LASIPOHJA (omistaja 14.10.2026 klo 23.33, kortti "Kyllä"; korvaa 21.42:n läpinäkyvän paneelilinjan; RAJAUS omistaja 17.10.2026 klo 06.5x: "Lasielementit kuuluvat vain linsseihin ja peleihin ei perus kartalle. Siellä vanha seepian sävyinen pohja on oikea, älä muuta sitä." — peruskartalla seepiapohja, lasi vain linsseissä ja peleissä): linssien ja pelien korteilla ja paneeleilla on YKSI YHTEINEN '
          + 'LASIPOHJA (Applen liquid glass -tyyppinen): tausta sumenee lasin takana (pienennetty sumennus vain kortin kohdalta, ei hidasta peliä), kevyt tummennus ja ohut vaalea reuna; '
          + 'se tehdään yhteiseen paneelipohjaan, jolloin kaikki pelit ja linssit saavat sen kerralla. Järjestys: ensin ISS-näkymä kuvaparina, omistajan hyväksyntä, sitten muualle. '
          + 'Täysin läpinäkyviä ovat vain yksittäiset napit ja enintään lauseen mittaiset yksittäiset tekstit. Pienen ohuen tekstin luettavuutta ei korjata paksulla ääriviivalla tai hehkulla (PT 14.10.2026: tulos on sotkuinen). UUDET VÄRIT NIMETTYINÄ '
          + 'TOKENEINA (PT 11.10.2026): omistajan pyytämä uusi väri tai värimerkitys on lupa sellaisenaan, mutta se lisätään ensin tyylikirjaan nimettynä tokenina ja käytetään vain sen kautta (esim. '
          + 'teemat.videopeli, erikois.linssi-hehku, tila.raha-vahenee ja tila.raha-kasvaa). KARTAN KOHTEET KARTTAPALETILLA (omistaja 15.10.2026 klo 18.31: "Kyllä sekä muillekin samanlaisille kohteille"): kartalla olevat 3D-kohteet (esim. ISS-raketti) käyttävät pallon paperin ja akvarellipienoismallien karttapalettia (kerma, murrettu tiili, okra, haalistunut messinki, seepia), eivät tyylikirjan kirkkaita UI-värejä; paletti tyylikirjaan nimettynä. HYVÄKSYTTY POHJA KÄY VASTAAVIIN (omistaja 9.10.2026): hyväksyttyä pohjaa tai varianttia sovelletaan '
          + 'vastaaviin tilanteisiin kysymättä (esim. pimeä näkymä → tumma teema); käyttö kirjataan lokiin ja kerrotaan omistajalle jälkikäteen, ja omistajalta kysytään vain kokonaan uusi pohja tai '
          + 'muunnelma. TUMMA KORTTI (omistaja 8.10.2026): kortti- ja löytöpohjalla on tumma variantti pelin tummista tokeneista (tk-tumma-*) videopeleihin ja muihin pimeisiin näkymiin; muualla '
          + 'kortit pysyvät paperisina. EI OVAALEJA (omistaja 2.10.2026): ovaalit ja kapselit eivät kuulu muotokieleen; napit, kytkimet, pillerit, valitsimet ja merkit ovat kevyitä suorakulmioita '
          + 'pyöristetyin kulmin (kulma-tokenit, malli nostopaneelin Kysy-nappi). OHJAUSNAPIT: kaikki kuvakenapit (✕, ‹, asetukset, linssi, lista ym.) ovat yhtenäisiä neliöitä pyöristetyin kulmin '
          + '(yksi OHJAUSNAPPI-pohja), ja näkymän napit ryhmitellään yhteen paikkaan; Pulu-hahmo ei ole nappi. EI TURHIA ✕-NAPPEJA (omistaja 5.10.2026): ✕ jää vain, kun sulkemiseen ei ole muuta '
          + 'luontevaa tapaa (esim. ohinapautus). MODERNI-KIRJASIN JA TAPPI (omistaja 5.10.2026): Moderni = iOS:n SF Pro (webissä -apple-system, system-ui, sans-serif) vain nykyajan näkymiin '
          + 'harmaassa lasiteemassa (tk-teema-harmaa), muualla pelin omat kirjasimet; TAPPI-pohja: Ø 64/26 pt harmaa lasi, himmeä levossa, alakulmissa, näkyy vain kun ohjattava kohde on ruudulla. '
          + 'LATAUSPALKKI: latauksissa pieni edistymispalkki nimiruudun alla (EDISTYMINEN-pohja, ohut terävä viiva). LATAUSKUVA (omistaja 8.10.2026; tyylikirja LATAUSKUVA): vain 3D-maailmoihin '
          + '(kuumailmapallo, historiakohteet); tausta, 1–2 liikkuvaa alfakerrosta ja vektoreina piirretyt köydet, liike vähäeleinen (±0,5–0,75°, nousu enintään 4 pt, jakso 7–8 s), kuva täyttää '
          + 'ruudun myös kierron jälkeen; nopeasti latautuvat näkymät (Cupola, astronautin kamera) ilman. KUUMAILMAPALLO HEILUU SELVÄSTI (omistaja 10.10.2026): pallo kallistuu noin ±2–3° ja liikkuu '
          + 'sivuttain ±10–15 pt, jakso 5–7 s, pieni puuskaisuus; köysi on ketjukäyrä, joka seuraa koria joka ruudussa ja häipyy alareunan sumuun. NIMIKYLTIT HETKEN, INFO NAPAUTUKSESTA (omistaja '
          + '5.10.2026, koko pelissä): nimikyltti näkyy saavuttaessa noin 3 s ja häivytetään; infokortit, huonekortit ja nimilaput tulevat vain pelaajan napautuksesta. PIN-KUVAKE JA PINNATTU PALKKI '
          + '(omistaja 5.10.2026): nostojen, Pulun chatin ja vastaavien ikkunoiden ylärivillä on pin-kuvake rivin muiden kuvakkeiden koossa (nostoissa vasta Auton mukana, ks. Äänet ja luennat, '
          + 'STRIIMILUKIJAN KAKSI NAPPIA); pinnattu ikkuna pienenee karttaa liikutettaessa yhden rivin palkiksi oikeaan yläreunaan nappien alle (otsikko ja tauko/jatka, napautus palauttaa, ei ✕:ää); '
          + 'striimipuhe jatkuu taustalla, vain uusi striimiluenta sulkee aiemman, yksi pinnattu kerrallaan, ja linssin avaus sulkee sen. PUHE ÄÄNENÄ, EI KUPLINA (omistaja 2.10.2026): äänenä '
          + 'kuuluvaa repliikkiä ei näytetä puhekuplana eikä tekstityksenä; teksti näytetään vain, jos sitä ei puhuta; lukunäkymät ja Pulun chat säilyvät. KOHTAUKSET YHTENÄ OTTONA (omistaja '
          + '5.10.2026, linnoissa ja muissa esittelyissä): henkilöiden keskustelu generoidaan kohtaus kerrallaan YHTENÄ monipuhujaottona (ElevenLabs Text to Dialogue); kertoja (oma tiedosto, William '
          + 'kuten ajattelijoissa) puhuu vain ennen keskustelua tai sen jälkeen, ei keskellä; Pulu ei puhu esittelyssä, vaan vain pelaajan napautuksesta lyhyesti siitä kohdasta, jota pelaaja '
          + 'osoitti. YHTEISET POHJAT: LIIKE, ÄÄNI JA VALO (omistaja 16.10.2026 klo 20.54, kortti "Kyllä, kaikki yhtä aikaa"): pehmeä liike, äänet ja valaistus ovat '
          + 'lasipohjan tapaan yhteisiä pohjia, joita jokainen uusi linssi ja peli käyttää alusta asti; parannus tehdään pohjaan, ja se leviää kaikkiin valmiisiin linsseihin ja peleihin. '
          + 'LIIKEPOHJA: nimetyt liikkeet (kävely, liuku, suurennus, katseen käännös, kortin avaus ja sulku) alkavat ja pysähtyvät pehmeästi (ease in/out), kesto ja käyrä tyylikirjassa Keston '
          + 'vieressä; museon kävely ja auto zoom ovat ensimmäinen käyttäjä. ÄÄNIPOHJA: yhteinen mikseri (puhe, musiikki, tehosteet, maisema), tasot, pehmeät häivytykset, musiikin vaimennus '
          + 'kertojan alle ja askeleet alustan mukaan; jaetun mikserin kertoimet (worker /mikseri/tasot) säilyvät. VALO- JA KUVAPOHJA: yhteiset valaistus-, varjo-, sävykäsittely- ja '
          + 'materiaaliprofiilit. Omaa liikettä, ääntä tai valoa ei tehdä yksittäiseen linssiin (ei väliaikaisia paikallisia korjauksia); automaattinen tarkistus listaa pohjan ohittavat, '
          + 'ja vanhat siirtyvät pohjiin vuorollaan. Omistajat ja tila: docs/moduulit/yhteiset-pohjat.md. '
          + 'TUOTANTOPOHJAT (omistaja 16.10.2026 klo 23.38, kortti "Kyllä, seitsemän pohjaa"; sisar YHTEISILLE POHJILLE): jokainen uusi työ aloitetaan tyyppinsä tuotantopohjasta, ja '
          + 'jokaisen työn opit kirjataan pohjaan, joten seuraava työ käyttää aina uusinta tapaa. Seitsemän pohjaa: 3D-maamerkki, kuumailmapallokierros, taidemuseon maa, pääkaupungin avaus, '
          + 'uusi linssi, historiapeli sekä kertojan teksti ja ääni; kukin tiedostona docs/moduulit/tuotantopohjat/<tyyppi>.md, jossa työvaiheet ja valmiin työn tarkistuslista (esim. '
          + '"pelaaja pääsee sisään"). Pohjan omistaa tyypin rakentaja, PT hyväksyy muutokset. PT ei hyväksy uutta pakettia ilman pohjaa; paketti on valmis vasta, kun sen opit on viety '
          + 'pohjaan; automaattinen tarkistus valvoo pohjat kuten dokumenttikartan. Pohjat kootaan nykyisistä ohjeista (TAVOITELUUPPI, tarinakaari.md, Firenzen resepti, museon monistettava '
          + 'runko) ja luovutusten opeista; tekijät kirjoittavat ne junan 197 jälkeen. Ensimmäinen oppi: Ranskan museolta puuttui pelaajan reitti sisään (avattiin Pariisista 16.10.). '
          + 'TUOTANTOPOHJIEN SANASTO (omistaja 16.10.2026 klo 23.41 "nuo kaikki termit on hyvä ottaa käytäntöön ja kirjata ylös"; käytetään myös viesteissä, luovutuksissa ja Asemataululla): '
          + 'TUOTANTOPOHJA = meidän nimemme pelikirjalle (playbook) eli vakiotoimintamallille (SOP); TUOTANTOPUTKI (production pipeline) = tyypin vaiheketju rooleineen, esim. 3D-maamerkki: '
          + 'vertailukuvat → rakentaja → arvioija → Valoseppä → kuvakierros → juna; VALMIIN MÄÄRITELMÄ (definition of done) = pohjan lopun tarkistuslista, paketti ei ole valmis ennen sitä; '
          + 'RETROSPEKTIIVI = jokaisen työn lopussa kirjattava "mikä toimi, mikä hidasti, mikä muuttuu pohjassa"; JATKUVA PARANTAMINEN (kaizen) = jokainen työ parantaa pohjaa; '
          + 'KULTAINEN POLKU (golden path) = pohjan oletustapa, poikkeaminen vain PT:n hyväksynnällä, ja poikkeama joko kirjataan uudeksi poluksi tai jätetään pois. '
          + 'Loki: docs/raamattu-loki/paatokset-2026-10.md #OMISTAJAN PÄÄTÖS: YHTEISET POHJAT LIIKKEELLE, ÄÄNELLE JA VALOLLE (16.10.2026 klo 20.56), #OMISTAJAN PÄÄTÖS: TUOTANTOPOHJAT UUSIEN ASIOIDEN RAKENTAMISELLE (16.10.2026 klo 23.41), #OMISTAJAN PÄÄTÖS: TUOTANTOPOHJIEN SANASTO (16.10.2026 klo 23.58); docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 0.11 UI-POHJAT JA KOHTAUKSET 14.10.2026 (14.10.2026 klo 22.55), #OMISTAJAN PÄÄTÖS: YKSI YHTEINEN LASIPOHJA KORTEILLE JA '
          + 'PANEELEILLE (14.10.2026 klo 23.34), #KARSINTA 7.1 ANIMAATIOPOIKKEUKSET 14.10.2026 '
          + '(14.10.2026 klo 22.55), #OMISTAJAN PÄÄTÖS: ANIMAATIOT ALLE 250 MS (14.10.2026 klo 22.55).',
        'TYÖSKENTELYTAVAT AINA RAAMATTUUN (omistaja 14.10.2026 klo 20.3x, SITOVA: "tällaiset työskentelytavat on todella tärkeä kirjata, koska muuten seuraava tili ei osaa käyttää tätä '
          + 'työskentelytapaa" ja "kirjaa se. myös raamattuun, että työskentelytavat kirjataan aina raamattuun"): jokainen käyttöön otettu työtapa (sessiot ja roolit, silmukat, cronit ja vahdit, '
          + 'ohjetiedostot, skriptit, hookit, viestisäännöt) kirjataan tähän kohtaan 2 ja alla olevaan listaan samassa vuorossa, ei vain muistiin tai ohjetiedostoihin; lopetettu poistetaan. '
          + 'SILMUKAT, VAHDIT JA OHJETIEDOSTOT (14.10.2026; S = /Users/Shared/Claude, F = S/Matkakirja-fable/scratchpad): 1) PT: ei jonokierros-cronia (omistaja 14.10.2026 klo 22.34; PT herää '
          + 'Postivahdin herätteestä, ks. TYÖTAPA JA SESSIOT, POSTIVAHDIN KIERROS); ODOTTAJAVAHTI Monitor python3 -u S/hooks/odottajat-vahti.py (30 min, uudelleen joka vanhenemisella). 2) '
          + 'POSTIVAHTI: ScheduleWakeup 4–5 min (20 min, kun kaikki roolit lepäävät eikä junaa ole käynnissä), S/Matkakirja-posti/KIERROS.md (hälytykset, LEPÄÄ, Tyhjäkäyntivahti + codex-odottaa.py, '
          + 'juna-edistys; KK 40 % → aloitus.md ja nollauskysymys; Raati ja Testaajat eivät enää kierroksella) ja NOLLAUS.md. 3) ASEMATAULU-SESSIO: F/asemataulu/ASEMATAULU-ROOLI.md, cronit TYÖTAPA '
          + 'JA SESSIOT, PÄIVITYSRYTMI -kohdan mukaan (vienti 5 min klo 07–24 ja kerran tunnissa 00–07, sisällön tarkistus tunnin välein, kulutus.py klo 08 ja 20, Raati ja Testaajat klo 08 ja TF:n '
          + 'saapuessa), KK ja PT omilla riveillään; taulujen osoitteet F/asemataulu/osoitteet.md. Hoitaja luo päivityscronit (A */5, B 13,43, kulutus 7) AINA heti '
          + 'nollauksen jälkeen ilman uutta lupaa (omistaja 15.10.2026 klo 23.35; syy: hoitaja kieltäytyi 21.15 vertaisen pyynnöstä ja taulu jäi 21.11:n tilaan). 4) JULKAISIJA: S/julkaisija-tyokalut/ valoseppa-vahti.zsh, olavinlinna-vahti.zsh, lukkovahti.zsh. '
          + '5) NATIIVISEPPÄ: cron "4 9 * * *" unity-julkaisut.py. 6) LAUNCHAGENTIT (~/Library/LaunchAgents, Macin käyttäjä): fi.matkakirja.juna (08–22 joka toinen tunti), juna-vahti (10 min), '
          + 'naytto-auki (caffeinate), siivous (03), app.matkakirja.natiivi-bundle (04), Actions-runnerit. 7) HOOKIT (tools/hooks/): viestiraja-muistutus.sh (SendMessage epäonnistuu → varakanava; '
          + 'asenna-viestiraja-hook.sh), pt-taulu-muistutus.py (PT:n settings.local.json: muistutus kirjata Asemataululle). 8) OHJEET: S/osoitekirja.md, F/keskustelukanava/aloitus.md, '
          + 'docs/raportit/viesti-<rooli>-aloitus.md ja docs/aloitusviestit/, F/tyojonot.md; vain-Mac-ohjeiden ja -skriptien peili tools/tyotavat/ (bash tools/tyotavat/peili.sh, Mac-polku on '
          + 'totuus). 9) CODEX-POSTI: haara claude/postilaatikko, kansio posti/. Roolien cronit ovat session-only CronCreate-ajastuksia: ne kuolevat session mukana ja luodaan aloitusviestissä. '
          + 'TILINVAIHDON TARKISTUSLISTA: docs/tilinvaihto.md (tili ja omistajan toimet ensin, luovutukset ja keskustelut talteen, sessiot roolitaulukolla, id:t, Asemataulu, silmukat, RC, sallinnat, '
          + 'Macin tarkistukset; VOIMASSA OLEVA ARVO -taulu ristiriitoihin).',
        'NATIIVI PELI ETUSIJALLE (omistaja 23.9.2026, sitova; tarkennus klo 16.2x: KOKO PELI KAIKKINE LINSSEINEEN TEHDÄÄN VALMIIKSI NATIIVIIN PYSÄHTYMÄTTÄ, web-kehitys jätetään kesken toistaiseksi, '
          + 'nopeutukset ja lisäsessiot vapaasti käyttöön): peli siirretään natiiviksi iOS-sovellukseksi (Unity 6.7 + Cesium, omat pergamenttilaatat; Googlen laatat ja Cesium ion vain elävän oppaan '
          + 'kaupunkinäkymässä, ks. Karttalinssit; UNITY 6.7 HETI (omistaja 10.10.2026 klo 07.4x; kumoaa 9.10.2026 linjan "vaihto vasta 6.7:n LTS-julkaisun jälkeen"): peli siirtyy beetaan 6000.7.0b4 '
          + 'ja päivitetään 6.7 LTS:ään sen ilmestyessä; paluuta varten 6.3 jää (tagi unity63-viimeinen, projektikopio ja editori), ja ensimmäinen 6.7-TestFlight lähtee vasta iPad Pro 13:n '
          + 'Release-muistiajon jälkeen; Unity 7 vasta vakiinnuttuaan) mahdollisimman pian, koska se antaa tökkimättömän ruudunpäivityksen, korkeuserot, kameran kallistuksen ja kamera-ajot. Web-peli '
          + 'on ylläpidossa: vain bugikorjaukset ja sisältö, joka siirtyy natiiviin yhteisen sisältöpaketin (sisalto/1/) kautta. Laattapoltot jatkuvat, koska natiivi käyttää samoja laattoja. '
          + 'Natiivin ensimmäinen pelattava tavoite: matkustus pallolla ja kaupunkilehdet; sen jälkeen korkeusmalli, kallistus ja auringonvalo. ANSAINTA (omistaja 24.9.2026 klo 11.5x, sitova; korvaa '
          + '23.9.:n "natiivi maksullinen"): peli on ilmainen mahdollisimman pitkälle sekä webissä että natiivissa, ja rahaa kerätään vain lisätoiminnoista (IAP) — maksullisuus on välttämätön '
          + 'ainakin siksi, että pulun vastaukset vaativat maksullisen AI-mallin; peli EI ole avointa lähdekoodia (kaikki oikeudet pidätetään, LICENSE), ja tämä sanotaan myös lupakirjeissä; '
          + 'maailmanradioon palaa aito VU-mittari (omistaja 24.9.2026 klo 11.3x, kortti: natiivissa ei WebKitin rajaa — AVPlayer-liitännäiseen äänitappi, todellinen äänitaso Unitylle joka kehys; '
          + 'HLS-asemilla ajastettu varakuvio); isoisän luennan kaiutin sykkii aidosta äänitasosta kuten webissä; lisensseissä attribuutio riittää (ei juristia). Peli on mahdollisimman pieni: '
          + 'sisältö, media, laatat ja maasto striimataan ämpäristä, pelaaja voi ladata alueita offline-käyttöön MAANOSITTAIN tai ylimpänä vaihtoehtona KAIKKI halutessaan, ei yksittäisiä maita '
          + '(omistaja 23.9.2026 klo 23.2x). Prototyyppi /Users/Shared/Claude/proto-3d. VAIN AJANTASAISTA JA VAIN NATIIVIA (omistaja 23.9.2026 klo 20.1x, sitova): natiiviin siirretään vain se, mikä '
          + 'on Raamatun VOIMASSA OLEVAA kaanonia — ei webin koodissa olevia kuolleita polkuja (esim. rosvon kaksintaistelu, poistettu 25.8.2026). Siirto tehdään Raamatun ja siirtosuunnitelman '
          + 'mukaan, ei koodin mukaan, ja jokainen siirretty ominaisuus tarkistetaan Raamattua vasten. Vanhasta pelistä ei tuoda mitään kuorta: ei WKWebView-lehtiä eikä muuta web-koodia appiin — '
          + 'kaupunki- ja maalehdet tehdään natiivisti UI Toolkitilla sisältöpaketin datasta (omistajan kortti 23.9. klo 20.1x). Uuteen peliin lisätään vain natiiveja ominaisuuksia. TÄYSI '
          + 'TOIMINTOPARITEETTI (omistaja 23.9.2026 klo 20.2x, sitova): kaikki pelin nykyiset toiminnot ja napit kopioidaan natiiviin natiivisti toteutettuina — myös radio-linssi (asemat '
          + 'striimataan, lisenssit tarkistetaan maksulliseen appiin). Kehittäjäsäätimet (koeliput, piirtokokeet, mittarit) vain kehittäjätilassa: piilotettu KOKEET-valikko TestFlight-buildeissa, ei '
          + 'App Store -versiossa. Sessiot kysyvät Fablelta heti, jos jokin toiminto mietityttää; Fable kysyy omistajalta. EI WEBISSÄ → KYSY (omistaja 23.9.2026 klo 22.3x, sitova): jos natiiviin '
          + 'oltaisiin tekemässä mitään, mitä web-pelissä ei ole (ominaisuus, näkymä, sisältö, sääntö), Fable kysyy omistajalta erillisellä kortilla ENNEN työtä. Jos omistaja ei ehdi vastata, sitä '
          + 'ei tehdä, vaan se merkitään puuttuvien listaan (docs/raportit/nappi-inventaario-natiivi-*.md, osio "Ei webissä, odottaa omistajaa"). Poikkeukset 23.9.: peninkulmalinssi ja '
          + 'huipennusnäkymä hyväksytty; aloituskaupungin valinta kortilla hylätty → valitaan kartalta kuten webissä. OMISTAJALLE VAIN PELAAJAN NÄKYMÄ (omistaja 2.10.2026 klo 12.1x, sitova): '
          + 'omistajalle näytetään vain pelistä (web tai sovellus, tarvittaessa lipun takaa) otettuja kuvia ja tallenteita; Blender-mallivideot, offline-renderöinnit ja mallikuvat ovat roolien '
          + 'sisäisiä työvälineitä (poikkeus: pelaajalle sellaisenaan annettava tuote, esim. juliste). NATIIVI ON MALLI (omistaja 5.10.2026 klo 23.1x, sitova; KUMOAA 24.9.2026:n WEB ON MALLI, '
          + 'MITATTUNA -työjärjestyksen, historia lokissa): natiivin näkymiin ja toimintoihin ei tarvita web-kuvaa, web-mittoja eikä web–natiivi-kuvaparia ennen koodausta, mergeä tai Laitetestaajan '
          + 'hyväksyntää. Mallina ovat natiivin UI-pohjat ja tyylikirja (UI-POHJAT-linja pätee: puuttuva elementti → Päätoimittaja → omistaja). NATIIVIN ALOITUSKAAVA (omistaja 23.9.2026 klo 22.4x, '
          + 'sitova): aloituskaupunki valitaan kartalta; valinnan jälkeen pallo jää näkyviin ja kamera zoomaa Lontooseen (tarinan alku); lentokone lähtee Lontoosta kaarta pitkin kohti valittua '
          + 'kaupunkia kameran seuratessa; samalla hetkellä alkavat koneen ääni ja lennon luenta; saapuminen jatkuu normaalina saapumisena. Valittu kaupunki on ensimmäinen kohde, ei lähtöpaikka. '
          + 'ALOITUSKAUPUNGIT VAIN EUROOPASTA (omistaja 10.10.2026 klo 23.4x, VAIN EUROOPPA; lista päivitetty 11.10.2026 klo 11.5x): alkulennon aloituskaupungit ovat toistaiseksi Ateena, Pariisi ja '
          + 'Tukholma (saapuminen niihin: SAAPUMINEN UUTEEN KAUPUNKIIN, ALOITUSKAUPUNKI JA KAUPUNGIN INTRO); Lontoo on lähtöpaikka eikä aloituskaupunki, ja muiden maanosien aloituskaupungit on '
          + 'piilotettu alkulennosta palautettavasti (data ja natiivi). AVAUSTEKSTI ALOITUSNÄYTÖLLE (omistaja 24.9.2026 klo 16.1x, sitova; korvaa klo 12.1x:n kohdan "kertojan avaus pallonäkymässä '
          + 'Lontoon kohdalla"): Avausteksti ("Ullakolta löytyi matkalaukku…", INTRO_TEXT luennan intro-puhe.mp3 tahdissa) palaa ALOITUSNÄYTÖLLE: se näytetään, kun pelaaja on painanut "Aloita '
          + 'seikkailu" / "Uusi matka", ENNEN karttaa; kartalla (Lontoo-zoomissa) sitä ei enää näytetä, koska se oli siinä liian sekava. Tekstin jälkeen (tai ohituksesta napauttamalla) siirrytään '
          + 'pallonäkymään, jossa kohdekaupunki valitaan. ALOITUKSEN TEKSTIT NATIIVISSA (omistaja 24.9.2026 klo 12.1x, sitova; korvaa 23.9.:n ja klo 12.0x:n kaavat, hyväksytty poikkeama webistä; '
          + 'AVAUSTEKSTIN PAIKKA KUMOTTU klo 16.1x, ks. edellä): aloitusruutu pysyy natiivin nykyisenä (omistaja 24.9. klo 12.2x, kumoaa saman päivän "portti webin mukaan" -ohjeen): otsikkolohko, '
          + '"Laita äänet päälle", napit "Jatka matkaa" (tallennus jatkuu) ja "Uusi matka" sekä niiden alla apurahakortin nappi "Apurahahakemus – katso tämä ensin" (APURAHAKORTTI, omistaja 7.10.2026 '
          + 'klo 09.3x–09.5x: lyhyt ja ytimekäs teksti, alussa pelin filosofia, sitten miksi kehitys siirtyi Unityyn, Maapallo, Kuumailmapallo, ISS, lauta- ja videopelit; "Oppiminen on hauskaa" '
          + '-linkki poistettu ja kortti korvaa periaatetiedot, joten sen loppuun siirretään lippukuvien tekijät ja ©-rivi; kuvat vain pelistä, pieninä oman kappaleensa vieressä leveämmässä kortissa '
          + '(omistaja 7.10.2026 klo 14.4x); palautelohko ja lomakkeet poistettu apurahakierroksen ajaksi kytkimellä (APURAHA_PALAUTE), palautus kierroksen jälkeen; kortin nappi "Avaa valmiit '
          + 'linssit" avaa heti kaikki pelaajille julkaistut linssit, ei kehitteillä olevia (omistaja 15.0x; lista esittely.json valmiitLinssit); apurahaprosessin jälkeen kortista muokataan '
          + 'neutraalimpi pelin esittely); "Uusi matka" (ja ☰-valikon Uusi peli aloitusruudun kautta) vie SUORAAN maapallonäkymään, jossa kohdekaupunki valitaan — ei erillistä avausruutua. '
          + 'Pallonäkymässä pallo on aluksi zoomattuna Lontoon kohdalle, ja kertojan avaus kuuluu siinä: paikkarivi "Heathrow, Lontoo" + kuukausi ja vuosi laitteen kellosta ja avausteksti '
          + '(INTRO_TEXT) luennan intro-puhe.mp3 tahdissa; kun luenta loppuu, kamera zoomaa automaattisesti ulos (pehmeä ajo, KAMERA-AJOT) niin että valittavat kohdekaupungit näkyvät, ja samaan '
          + 'aikaan pulu lentää ruutuun ja aloittaa omat esittelyrepliikkinsä (webin pulun ensiesittely); sitten pelaaja valitsee kohteen pallolta (omistaja 24.9. klo 12.2x). Pelaaja voi OHITTAA '
          + 'luennat milloin tahansa valitsemalla kohdekaupungin — luenta ja pulu keskeytyvät ja lentokonekohtaus alkaa heti. Lennolla vain lentorepliikki flightFirst ("Kone nousee. Isoisän kirja '
          + 'aukeaa sylissäni…") ja luenta puhe-lento-alku.mp3; muilla lennoilla ei alapalkkia; tekstit sisältöpaketista, kirjoituskoneen tahti luennan aikaleimoista. LENNON ESITYS NATIIVISSA '
          + '(omistaja 23.9.2026 klo 22.5x, sitova; koskee kaikkia lentoja): aurinko valaisee mantereet pelin kellonajan mukaan (oma Aurinko.cs; CesiumSunSky on vain Unrealissa), kamera lentokoneen '
          + 'ETUVIISTOSTA ja läheltä (omistaja 24.9.2026 klo 09.5x: ei yläviistosta kaukaa; klo 12.2x: konetta kuvataan pääasiassa etuviistosta tai sivulta, takaa korkeintaan takaviistosta — ei '
          + 'suoraan takaa) ja muuttaa KOKO AJAN hitaasti kulmaa ja korkeutta lennon vaiheen mukaan, jotta animaatio pysyy kiinnostavana; aloituslennossa kaikki kaupunkien pisteet ovat piilossa '
          + 'paitsi kohdekaupunki (omistaja 24.9.); lennossa näkyy kolmiulotteinen maasto ja auringon piirtämät rinteet ja varjot pelin kellonajan mukaan, ja taivas on sininen ilmakehän gradientti '
          + '(horisontissa vaalea, ylhäällä syvempi), ei musta — musta avaruus vain astronauttilinssissä (omistaja 24.9.2026 klo 10.1x); laskussa puoliorbitti koneen ympäri. SAAPUMISLENTO V3 — '
          + 'KAKSITASO PERGAMENTTIKARTAN YLLÄ (omistaja 26.9.2026 klo 22.2x ja kortti 23.5x, sitova; toteutus 1.0.28, vanha lento A/B-kytkimen takana varalla): pelaaja matkustaa retro-kaksitasolla '
          + '(Tiger Moth seepiana, kartan paletissa; matkustaja punaisella huivilla on Fogg eli pelaaja, lentäjä nimetön) MATALALLA, ja kartta on lennon aikana pergamentti (nykyinen ruskea sävy), ei '
          + 'satelliitti; ei alun feidiä eikä verhoa (odotus elävässä näkymässä: käynnistysääni + sykkivä rengas, teksti vain jos > 2 s); 15 s:n otos lennon lopusta: kamera alkaa lähikuvasta '
          + 'koneesta ja liukuu kauemmas mutta pysyy matalalla (≤ 20 km), jolloin kartta piirtyy matalasta kulmasta ja näkymä vaihtuu nopeasti; lähestymissuunta on kaupungin kuvauslinja (Ateena '
          + 'etelästä Välimeren yli), loppu on lasku ja rullaus kaupungin renkaalle, pilvet pelkkä utu; esilatauskäytävä reitille ennen lentoa (alku kun ≥ 96 %). Alkulennossa ei yöosuutta: koko '
          + 'maapallo on päivänvalossa vuorokausiasetuksesta riippumatta, kone näkyy kartalla pienenä alusta asti ja suurenee lähdössä, eikä kartta nykäise; jos lähtöpaikka vaatii kartan siirtoa, '
          + 'kartta pyörii pehmeästi oikeaan kohtaan (omistaja 7.10.2026 klo 14.5x). ALOITUSLENNON KAMERA (omistaja 14.10.2026 klo 23.54, tarkentaa edellistä): '
          + 'kone lähtee heti; kamera liukuu 2 sekunnissa pehmeästi pelaajan nykyisestä näkymästä (zoom ja paikka napautushetkellä) aloituslennon 2 sekunnin kohtaan ja seuraa '
          + 'liikkuvaa kohtaa koko liukuman ajan (ei pumppausta); kaukaa reitiltä liukuma pitenee hieman; jos palloon ei ole koskettu, aloituslento on ennallaan. Speksi Linssisepän raportissa (lento v3, ks. loki 26.9. klo 22.2x ja 27.9. klo 00.0x). V3 on hyväksytty (loki '
          + '27.9.2026 klo 00.00 ja v3e2 28.9.2026 klo 13.34) ja korvasi lennon satelliittipinnan, DC-3:n, savujanan, pilvisumun, elokuvallisen aloituslennon ja aloituslennon kamerakäsikirjoituksen '
          + 'kestoineen (historia lokissa); KAMERA-AJOT, TEMPO, kone aina näkyvissä, ei suoraan takaa, saapumissekvenssi ja AIKA säilyvät. MAAPALLON TILA -LINSSI (omistaja 24.9.2026 klo 08.3x, '
          + 'sitova): ensimmäinen vain natiivissa oleva ominaisuus — linssi NASA:n ja NSIDC:n public domain -aineistoista (merijään vuosiminimi 1979–2026 animaationa, lämpötilapoikkeamat, '
          + 'merenpinta, jäätiköt), aineisto alkuperäislähteestä (NASA SVS, NSIDC) attribuutiolla "NASA / NSIDC"; Linssiseppä suunnittelee heti, toteutus vasta pariteettikierroksen ja omistajan '
          + 'kokeilun korjausten jälkeen. RADIOLINSSIN UUDISTUS NATIIVISSA (omistaja 24.9.2026 klo 19.2x, kortti, sitova; vain natiivissa, web ennallaan): radiopaneelille parempi visuaali kuvaputken '
          + 'tekstuureilla (puu, metalli, lasi — viitekuvina ja tekstuureina, ei valmiina UI-kuvana), VU-mittari ja nestekidenäyttö samaan riviin, viivain alle; kartta hämärä (ei yö: rannat ja rajat '
          + 'näkyvät, kaupunkien valot syttyvät valitun maston ympärillä); POHJA (omistaja 24.9.2026 klo 22.3x, sitova, korvaa pergamentin): radiolinssin kartta on VÄRILLINEN TOPOGRAFIAKARTTA '
          + '(natiivin topografialinssin pohja) hämärässä Black Marble -yövaloineen, mastoineen ja hehkuineen — hyväksytty havainnekuva A '
          + 'docs/raportit/kaappaukset/radiouudistus-20260924/3-topografia-a.jpg (PR #3122); pergamentti ei ole radion pohja; jokainen asema on liioitellun korkea, aidosti kolmiulotteinen RADIOMASTO '
          + 'kolmessa koossa kaupungin koon mukaan; mastot vilkkuvat punaisena hitaasti ja epätahdissa (lentoestevalot), valittu masto vilkkuu aidon VU-tason tahdissa ja valaisee ympäristöään '
          + 'voimakkaammin; valitusta mastosta leviää hitaasti laajenevia radioaaltorenkaita pintaa pitkin kuuluvuusalueen reunaan; viivainta pyöritettäessä kaukaisten asemien välillä rahinaa ja '
          + 'ääni kirkastuu lukittuessa (webin kaava säilyy); asemaa vaihdettaessa pieni kaareva kamera-ajo uudelle mastolle (KAMERA-AJOT); YÖN VALOT (omistaja klo 19.3x): hämärässä koko maailman '
          + 'kaupunkien valot NASA Black Marble -yövalokuvasta (VIIRS, public domain) hehkuvana kerroksena, joka valaisee karttaa mastojen lisäksi — Karttaseppä polttaa kevyen sarjan Z0–Z6 '
          + 'satelliittiputkella, Natiiviseppä sekoittaa emissiivisenä; sama kerros palvelee myöhemmin yön valot -datalinssiä ja lennon yöosuutta; LINNUT (omistaja klo 19.3x): pallolla lentää '
          + 'lintuparvia (boid-simulaatio, 20–40 siluettia kameran lähellä matalalla pinnan yllä) hämärässä ja lennolla, reitit muuttolintureittien mukaan; ei oletuskarttanäkymään (pariteetti '
          + 'webiin), määrä pieni iPhonen ruudunpäivityksen takia. TAIDEMUSEO-LINSSI (omistaja 24.9.2026 klo 12.3x, sitova, kortti; vain natiivissa): teoksia ja veistoksia varten oma virtuaalinen '
          + 'museo, jonka saleja pelaaja kiertää; jokaisessa salissa opastettu kierros, jossa kamera lentää tilassa automaattisesti (koreografiakirjasto, tempon dramaturgia) ja kertoja kuuluu '
          + 'taustalla (luentaputki, aikaleimasynkka); ilmaan piirtyvät vuosiluvut, taidesuuntausten nimet, taiteilijoiden omakuvat ja karttapiirrokset, joista pääsee pallolle teoksen '
          + 'syntykaupunkiin; kierroksen voi ohittaa tai pysäyttää teoksen ääreen. Siivet aikakausittain (antiikki, renessanssi, barokki, romantiikka, impressionismi, moderni), ovet kaupunkilehdistä '
          + '(Louvre, Uffizi, Prado, Rijksmuseum…). Teokset vain PD/CC0 (museoiden avoimet aineistot, Commons; tekijä kuollut yli 70 v sitten), veistokset PD/CC0-3D-skannauksina; sali '
          + 'proseduraalinen klassinen halli, filmiefektipino käytössä. MAITTAIN, ALANKOMAAT ENSIN (omistaja 9.10.2026 klo 11.0x–11.13, korvaa renessanssisali-pilotin; loki): ensimmäinen taidemuseo '
          + 'tehdään NYT rinnakkain muiden töiden kanssa ja ennen Pekingin koekaupunkia (omistaja 10.10.2026 klo 09.4x; kumoaa ajoituksen Olavinlinnan pelin jälkeen); sisältö kootaan koko maan '
          + 'näytettävistä teoksista hulppeaan 3D-galleriaan, joka tehdään maan tyylillä mutta kaupunkeihin monistettavalla yhteisellä perustalla; maalaukset, valokuvat ja grafiikka ovat seinillä ja '
          + 'patsaat ja tilataide huoneissa; väritys ja valaistus ovat maailman parhaiden taidenäyttelyiden tasoa; liikkuminen kuten kuumailmapallossa (valmis esittelykierros tai vapaa kulku, ja '
          + 'teoksen esittely kuuluu napista; esityksen aikana napeista näkyvät vain tauko ja ☰, ks. TAIDEHALLIN OHJAUS); ensimmäinen maa on Alankomaat (aineisto '
          + 'docs/raportit/taidemuseo-alankomaat-aineisto-20261009.md). KUVALÄHTEET JA PATSAAT (omistajan kortit 10.10.2026 klo 09.5x): Van Goghin, Halsin ja Mauritshuisin teokset Wikimedia '
          + 'Commonsin kopioina, vaikka museoiden omat sivut rajaavat kaupallisen käytön (teokset ovat vapaita, EU DSM art. 14; kuva poistetaan, jos museo huomauttaa); Rijksmuseumin kuvat Commonsin '
          + 'tai rajapinnan kautta, ei iiif.micr.io:n massahakua (robots.txt); patsaat kävijöiden CC BY -skannauksina tekijät mainiten ja Leidenin RMO:n CC0-antiikkina omana siipenään, puuttuvat '
          + 'mallinnetaan itse; Mondrian, Van Doesburg ja Escher eivät ole mukana. GRAFIIKKA: VARJOT JA LATTIAHEIJASTUS (omistaja 10.10.2026 klo 17.2x, kortti "Varjot ja lattiaheijastus"): museon '
          + 'oma MuseoValaistu-varjostin, leivottu salin heijastuva valo, HDR, hillitty hehku ja TAA säilyvät; lisäksi kehysten, patsaiden ja nurkkien varjot lasketaan valmiiksi (Linnanrakentajan '
          + 'leivonta; kehyksille pehmeä varjo seinän paikkakartasta kohdevalon suuntaan) ja lattia heijastaa kevyimmällä hyvältä näyttävällä tavalla (raskas osa vain uusimmille laitteille); Unityn '
          + 'reaaliaikaisia varjoja, Surface Cache GI:tä ja SSAO:ta ei käytetä muistin takia. KATSELU LÄHELTÄ (omistaja 11.10.2026 klo 09.2x ja 12.4x; kumoaa 00.4x:n 60–70 %:n ruutuosuuden ja '
          + '09.2x:n "teos noin 95 %"): pysähdyksessä teos näkyy KEHYKSINEEN kokonaan, ja kehys täyttää ruudun rajaavassa suunnassa noin 92–95 %; seinää saa näkyä kuvasuhde-eron vuoksi kohdevalon '
          + 'reunatummennuksessa; sali ja muut teokset näkyvät vain siirtymissä teoksesta toiseen. TAIDEHALLIN OHJAUS (omistaja 12.10.2026 klo 00.1x–00.2x; taidehalli = taidemuseo): alussa on '
          + 'valikko, josta pelaaja valitsee näyttelyn (näyttely = huone). Esityksen aikana näkyvissä on vain tauko (pysäyttää kertojan ja tekstityksen, ks. LIIKKUVAT KOHTAUKSET) ja ☰, muut museon '
          + 'napit (myös zoom- ja info-nappi) eivät näy, ja ☰:ssä ovat kaikki näyttelyt, joista vaihdetaan huonetta. Teoksen nimen ylä- ja alapuolella näkyvät hyvin pienellä edellisen ja seuraavan '
          + 'teoksen nimet; minkä tahansa nimen napautus levittää kaikkien teosten nimet ruudun vasemmalle sivulle, ja listaa kelataan vetämällä sormea nimien päällä: valittu nimi on suurin, '
          + 'viereiset vähän suurempia, ja koot muuttuvat pehmeästi animoiden. Valitun nimen uusi napautus siirtää teokseen, ja jos pelaaja ei tee mitään 1,5 s:n kuluessa, valitun nimen oikealle '
          + 'puolelle tulee Siirry-nappi, josta pääsee myös teokseen. Siirtymä toisen teoksen luo tapahtuu automaattisesti kävellen pelaajan silmin. SUURENNUS ELEILLÄ (omistaja 11.10.2026 klo 12.4x '
          + 'ja 12.10.2026 klo 00.1x; zoom-nappi poistettu): tuplanapautus tai nipistys vie lähemmäs (noin 2,5×), vetämällä tutkitaan yksityiskohtia, ja kierros pysähtyy suurennuksen ajaksi. TEKSTIT '
          + 'JA INFO (omistaja 11.10.2026 klo 13.0x ja 14.0x): museon tekstit ovat Moderni-kirjasimella, ei keskiaikaisella; jokaisesta teoksesta on tietokortti (taiteilija elinvuosineen, nimi, '
          + 'vuosi, tekniikka ja materiaali, koko, museo, lyhyt esittely; Wikidata ja Commons, puuttuva kenttä jää pois), ja kierros pysähtyy kortin ajaksi; info-nappia (OHJAUSNAPPI, Ikonit) ei '
          + 'näytetä esityksen aikana. I-KORTTI JA YMPYRÄT (omistaja 16.10.2026 klo 21.38 ja 21.51, kortti "Kyllä, teksti ja puhe"; kumoaa 13.10. "vain puhe"): '
          + 'i-nappi on seinällä nimen vieressä, ei koskaan kehyksen tai teoksen päällä; se avaa kehyksen yläpuolelle lasikortin, jossa on taiteilijan pieni muotokuva (Commons PD, tuntemattomalle '
          + 'ei kuvaa) ja teoksen lyhyet tiedot (MUOTOKUVARIVI, omistaja 21.54 "Pyöreä kuva yläriville": ylärivillä pieni pyöreä muotokuva kuten linssivalitsimen rivikuva, vieressä tekijä ja elinvuodet, alla tiedot; tuntemattomalla sama rivi ilman kuvaa; tyylikirjan pohja), ja samalla taululle syttyvät ympyrät; ympyrän otsikko ja teksti tulevat kehyksen alle, kun kertoja lukee ne. Taulu ei peity koskaan; jos tila ei '
          + 'riitä, kamera perääntyy pehmeästi liikepohjalla. Museon napit ovat läpinäkyviä (OHJAUSNAPPI-teema harmaa-kuulto). KEHYKSET (omistaja 11.10.2026 klo 09.0x): ebonoiduissa aaltolistakehyksissä lakan kiilto, '
          + 'valoa poimiva aaltokuvio ja kapea kultainen sisäreuna (tärkeimmille kultakehys), ja jokaisella teoksella lämmin kohdevalo, jolloin maalaus on seinää kirkkaampi ja sali tummuu reunoilta. '
          + 'VALAISTUS KATOSTA JA TERÄVÄ SEINÄ (omistaja 11.10.2026 klo 10.0x): kohdevalo on katossa katsojan pään yläpuolella teoksen edessä noin 30° pystysuorasta, ja leveä tasainen lämmin keila '
          + 'valaisee koko teoksen ja kehyksen ilman kuumaa kohtaa, kehyksen varjoa teoksen yläosassa ja heijastusta; pysähdyksen ajaksi sali himmenee lähes mustaksi, jotta puhelimen pystykuvassakin '
          + 'valossa on vain teos ja kehys; seinä näkyy terävänä pysähdysetäisyydeltä (seinän tekstuurin toisto ja suodatus mitoitetaan sille). ITALIA (omistajan kortti 14.10.2026 klo 21.02 "Mukaan '
          + 'myös Italian museot, Italia pois App Storesta"; kumoaa 24.9./9.10. alueittaisen piilotuksen, loki): kun taidemuseon Italian sali tehdään (ei vielä; ensin Ranskan salin kertomukset ja '
          + 'zoomikohdat), mukaan myös Italian valtion museoiden teokset Commonsin PD-kuvin, ja koko sovellus jätetään pois Italian App Storesta. Riski tiedossa (Codice art. 107–108, '
          + 'docs/raportit/italia-kulttuuriperintolaki-20261009.md: Italia vaatii maailmanlaajuista kieltoa; LG/OLG Stuttgart 2024: vain Italiassa). Vatikaani ei kuulu tähän. APP STORE -ALUEIDEN '
          + 'TARKISTUSLISTA (Julkaisija, joka App Store -julkaisu): Kreikan piilotus GRC voimassa; Italian sali pelissä → sovellus pois Italian App Store -alueelta (App Store Connect: Saatavuus). '
          + 'KREIKKA (omistaja 12.10.2026 klo 11.5x: "piilotetaan ne kreikan app storessa"): Kreikan laki (3028/2002, nyk. 4858/2021 art. 46) vaatii luvan ja maksun valtion muistomerkkien '
          + 'kaupalliseen kuvaamiseen, myös 3D-näkymiin ja havainnekuviin (docs/raportit/kreikka-kulttuuriperintolaki-20261012.md, PR #4492); Kreikan valtion muistomerkkien kuvat, havainnekuvat ja '
          + '3D-opas (Ateena ym.) piilotetaan VAIN Kreikan App Storessa (storefront GRC), muualla ennallaan; uusia kuumailmapallokierroksia ei tehdä Kreikan muistomerkkikohteisiin (Ateenan tilalle '
          + 'Praha, 12.10.). ESITYSMOOTTORI (omistaja 24.9. klo 12.4x, Fablen linjaus): museo rakennetaan yhdeksi modulaariseksi esitysmoottoriksi — aikajana, kamerakoreografia, kertoja '
          + 'aikaleimasynkalla ja ilmaan piirtyvät merkinnät — jonka päälle tulee eri lavoja: SALI (aikakausisiivet ja kaupunkien omat museot, sisältö datana sisältöpaketista) ja PALLO (kaupungin '
          + 'kasvu vuosisatojen yli 3D-pallon päällä, esim. Rooma ja Lontoo, automaattinen aikajana, hidas orbit tai vaihtuvat kulmat, historialliset kaupunkirajat avoimesta datasta); uudet museot '
          + 'ja kasvuesitykset ovat sen jälkeen vain sisältöä. Ensisijaisesti Unityn omat paketit (Cinemachine, Splines, Timeline, TextMeshPro, Addressables, glTFast, URP); maksulliset Asset Store '
          + '-paketit vain MAKSULLISET LÄHTEET -linjan mukaan (omistaja 7.10.2026). DATALINSSIT (omistaja 24.9.2026 klo 11.0x–11.2x, sitova): julkisen datan visualisointeja kartalle tehdään sarjana; '
          + 'selvitys docs/raportit/datalahteet-linsseille-20260924.md ja ideat linssikatalogin osassa R (35 ideaa; järjestys Maapallon tila → laivat 1873 → yön valot → palot ja savu → myrskyt → '
          + 'järistykset ja tulivuoret → väestö → kauppavirrat 1873 → isoisän sää ja taivas → lämpenevä meri). Lisenssit: vain PD/CC0/CC BY/avoin attribuutiolla; jakoehdolliset (ODbL, CC BY-SA) '
          + 'sallittu niin, että ämpärin johdettu aineisto julkaistaan samalla lisenssillä ja lisenssi kirjataan lahde-kenttään ja attribuutioon; NC-lisenssit eivät kelpaa (käytetään avoimia '
          + 'vaihtoehtoja). Ilmaiset datatilit (ECMWF/Copernicus, EOG, GBIF) sallittu, Earthdata ei; avaimet vain Macin ympäristössä ja Actions-secreteissä. Toteutus alkaa Maapallon tila -linssin '
          + 'ehdolla (pariteetin ja omistajan build-kokeilun jälkeen). NATIIVIN YLÄPALKKI iPHONELLA JA iPADILLA (omistaja 24.9.2026 klo 16.1x, sitova; KORVAA klo 09.5x:n kelluvat pillerit ja napit): '
          + 'iPhonella palaa webin ja iPadin ruskea yläpalkki — laukkuryhmän pillerit ja kelluvat napit poistetaan. TARKENNUS (omistaja 24.9.2026 klo 19.4x, build 10:n kuvasta, sitova): iPhonen '
          + 'palkki MATALAMPI kuin webin (ei webin 57 pt:n mittaa eikä ylimääräistä tyhjää Dynamic Islandin alla), LOGO POIS, raha/päivä-pilleri vasempaan yläkulmaan ja ☰ (ja muut napit) oikeaan; '
          + 'palkki itse jää ylös rauhoittamaan taustaa; iPadilla logo ja webin mitta säilyvät. Palkki PIILOUTUU AUTOMAATTISESTI, kun pelaaja vierittää karttaa, ja vaakamuodossa se on piilossa '
          + 'oletuksena (muut piilotustilanteet päätetään myöhemmin). Kun palkki on piilossa, oikeassa yläkulmassa näkyy vain kolmen väkäsen nappi, jonka painallus TUO PALKIN TAKAISIN näkyviin '
          + '(TARKENNUS omistaja 25.9.2026 klo 05.1x, build 12:n kuvista, löydös 68: nappi on kolme VÄKÄSTÄ (⌄-merkit), EI hampurilainen ☰, ja se on täsmälleen hampurilaisen paikalla, ei alempana; '
          + 'hampurilainen ja raha/päivä-pilleri siirretään hieman sisemmäs reunoista; isoisän paikkakupla-teksti häviää samaan aikaan yläpalkin kanssa ja palaa sen mukana) — ei kelluvia nappeja '
          + 'eikä pillereitä, myös vaakamuodossa (nykyinen vaakatilan käytös, jossa ☰ avaa kelluvat napit, poistetaan). iPadin palkki on hieman liian matala → korotetaan webin mittaan. KORKEUS '
          + '(omistaja 25.9.2026 klo 09.4x, build 12:sta, sitova): ruskea yläpalkki on sekä iPadilla että iPhonella HIEMAN KORKEAMPI kuin build 12:ssa — iPadilla webin mitta (57 pt), iPhonella '
          + 'nykyistä hieman korkeampi mutta yhä webiä matalampi; Natiivi-UI ehdottaa mitat kuvaparilla. PERUUTUS (omistaja 25.9.2026 klo 05.4x, sitova): iPhonen PYSTYASENNOSSA yläpalkkia EI '
          + 'piiloteta — se on aina näkyvissä; automaattinen piilotus vierityksessä ja väkäsnappi koskevat vain vaakamuotoa. Muut yläpalkin muutokset ovat voimassa. LISÄKSI: raha/päivä-pilleri '
          + 'hieman matalammaksi, samaan korkeuteen Dynamic Islandin kanssa, ja hampurilainen sovitetaan samaan korkeuteen; isoisän paikkakupla on PIENENNETTYNÄ vain tekstin vaatiman levyinen ja '
          + 'näyttää silloin vain kaupungin nimen (koko teksti "<kaupunki>, <kuukausi> 1873" vain avattuna). Fablen oletukset kunnes omistaja tarkentaa: vaakamuodossa palkki palaa myös napautuksesta '
          + 'karttaan tai kaupunkiin vierityksen jälkeen; iPadilla palkki ei piiloudu. Alla oleva klo 09.5x:n kuvaus säilyy vain ☰-valikon ja Liiku-napin osalta. NATIIVIN iPHONE-ASETTELU (omistaja '
          + '24.9.2026 klo 09.5x–10.0x; yläpalkin osalta KUMOTTU klo 16.1x, ks. edellä): hampurilainen avaa linssivalikon samassa teemassa (silmälasinappi poistuu, valikon yläkaista matala, linssit '
          + 'saavat koko tilan), hammasratas on valikon viimeinen rivi "Kehittäjä" vain kehittäjätilassa (omistaja 24.9. klo 11.2x, kortti); ☰-VALIKON YLÄOSA (omistaja 24.9. klo 13.3x): kaksi '
          + 'tiivistä riviä — ylin rivi äänet kolmena suorana kytkinnappina (webin Äänet-paneelin kolme kytkintä), toinen rivi napit "Uusi peli", "Muut" ja "Kehittäjä" (vain kehittäjätilassa); '
          + '"Muut" avaa uuden valikon suoraan tämän valikon päälle (ei laajene riviksi), jossa Offline-kartat, Asetukset, Ehdota sisältöä, Tekijätiedot ja lähteet, Mitä uutta; sen alla viiva ja '
          + 'LINSSIT koko lopputilassa; ylin rivi Dynamic Islandin korkeudella sen kummallakin puolella (omistaja 24.9. klo 10.4x); Liiku-nappi läpinäkyvä (vain teksti ja kevyt reuna, omistaja 24.9. '
          + 'klo 11.1x) ja pienempi; linssit pois matkalaukusta, linsseihin vain hampurilaisvalikosta; web ennallaan. ☰-VALIKKO KAIKILLE LAITTEILLE (omistaja 25.9.2026 klo 05.0x, build 12:n '
          + 'iPad-kuvasta, sitova; korvaa "iPad katsotaan erikseen"): sama yhdistetty ☰-valikko (äänet, Uusi peli / Muut / Kehittäjä, viiva, linssit) myös iPadilla — erillinen linssipaneeli ja '
          + 'silmälasinappi poistuvat kaikilta laitteilta; RETKIKUNTA piilotetaan yhden napin taakse ("Retkikunta" avaa oman paneelin, ei laajene valikkoon); KOKEET-ryhmä poistuu pelaajalta — '
          + 'Maailma-kytkin siirtyy KARTTA-ryhmään Pieni liike -rivin alle, ja Astronautin reliefi, Linssien kynnykset, Raamattu ja Kehittäjälehti siirtyvät Kehittäjä-riville (vain kehittäjätilassa) '
          + 'tai poistuvat, jos niitä ei tarvita. UUSIA LINSSEJÄ EI ALOITETA ENNEN PARITEETTIA (omistaja 25.9.2026 klo 09.3x, sitova): yhtään uutta linssiä (Maapallon tila, Taidemuseo, datalinssit, '
          + 'muut katalogin ideat) ei aloiteta — ei toteutusta eikä uutta suunnittelutyötä — ennen kuin pariteetti on varmasti valmis: liikkumisen pariteettilistassa 0 ERI-riviä, pariteettiajossa 0 '
          + 'yli 16 px:n ERI-riviä, ja omistajan build-kokeilu ilman uusia pariteettilöydöksiä. Siihen asti Linssiseppä tekee olemassa olevien linssien pariteettia ja radiouudistuksen loppuun; '
          + 'valmiit suunnitelmat odottavat. Fable toteaa pariteetin valmiiksi omistajan kanssa. POIKKEUS — IHMISEN MATKA II (omistaja 25.9.2026 klo 17.1x, sitova, vain natiivi): nykyinen Ihmisen '
          + 'matka säilyy sellaisenaan, ja sen rinnalle tehdään TOINEN VERSIO samalla sisällöllä (sama kaari, kertoja, pysäkit ja kuvat), johon lisätään aiemmin sovitut valoefektit ja muut '
          + 'tehosteet: KOHDENNETTU VALO (aurinko tai valokeila vain siihen osaan palloa, missä tarina on käynnissä, muu pallo hämärämpi — valokeila laattojen varjostimessa, 23.9.), KERROKSELLINEN '
          + 'SUMU eri korkeuksilla (kohina, parallaksi), havainnekuva valokeilassa vinjetoituna (4.9.), vanat rannikkoa maalaavina kaistoina (7.9.), aidot äänimaisemat (7.9.); Linssisepällä on '
          + 'VAPAAT KÄDET lisätä niin paljon visuaalisia tehosteita kuin keksii. Lisäksi II-versiossa: 1) TEKSTITYS OLETUKSENA POIS, yläpalkkiin oma CC-nappi, joka kytkee tekstityksen päälle ja pois '
          + '(LINSSIEN YLÄPALKKI iPHONELLA -säännön mukaan); aivan ensimmäinen teksti (kysymys "Tiedätkö, mistä kaikki alkoi?" tai vastaava) saa jäädä näkyviin; 2) HAVAINNEKUVAT ISOMMALLA, ja kartta '
          + 'väistää sivuun niin, että kuva mahtuu näkymään paremmin; 3) VÄRILLISET LEVIÄMISREITIT KORJATAAN — nyt niihin tulee raidoitusta ja väri leviää kuvaan; kaistojen pitää olla tasaisia (ei '
          + 'porrastusta tai välkettä) ja pysyä kartalla, ei havainnekuvan päällä. Työjärjestys: Linssiseppä tekee yhden sivun suunnitelman ja ensimmäisen videon, Natiiviseppä toteuttaa pallon '
          + 'puolen (valokeila, hämärrys, sumu) rajapintana, Natiivi-UI CC-napin; omistaja arvioi TestFlight-buildista. Tämä on omistajan päättämä poikkeus linssikieltoon; muut uudet linssit '
          + 'odottavat edelleen pariteettia. MATKAKIRJA-LOGO iPHONELLA (omistaja 25.9.2026 klo 05.5x, sitova): koska iPhonen yläpalkissa ei ole logoa, Matkakirja-logo näkyy avatun matkalaukun '
          + 'oikeassa yläkulmassa, ja siinä on sama linkki tekijätietoihin ja lähteisiin kuin webin logossa. LINSSIEN YLÄPALKKI iPHONELLA (omistaja 25.9.2026 klo 05.4x, Ihmisen matka -linssin '
          + 'kuvista, sitova, kaikki linssit): linssin logo/otsikko, hampurilainen tai sulje-linssi-symboli ja säätimet (Tauko/Jatka) ovat Dynamic Islandin korkeudella sen kummallakin puolella, '
          + 'eivät sen alla; sijoittelussa otetaan aina huomioon ruudun kaarevat yläkulmat (safe area + kulman säde); Jatka/Tauko-nappi ja hampurilainen linssin teeman taustavärillä (ei harmaa); '
          + 'aikajanan vuosiluku vasempaan reunaan; linssin alkaessa maapallon alkuzoomi tapahtuu verhon takana — pallo ei vilahda isona ja kutistu näkyvissä; linssin uudelleenaloitus aloittaa '
          + 'kertojan alusta. KARTAN SUMENNUS KUVIEN AIKANA (omistaja 24.9. klo 11.1x, koskee KAIKKIA natiivin laitteita, myös iPadia — Fable 24.9. klo 12.2x): kartta kevyesti sumennettuna aina kun '
          + 'isoisän tai pulun kuvia on näkyvillä (paikkakupla, kortit, pulun kuvakupla; sama mekanismi kuin portin verhossa, miedompi); web ennallaan. LENNON KARTTA JA MAAMERKIT (omistaja 24.9.2026 '
          + 'klo 13.4x, kortti, sitova): lennon aikana kartan viivapiirrokset (reittikaari, tiet, joet lähikuvassa) piilotetaan tai häivytetään (satelliittipinnan tultua tarpeeton), ja lähtö- ja '
          + 'kohdekaupunkiin tulee punainen piste tai pieni hehkurengas; jokaiselle kaupungille yksi matalapolyinen 3D-maamerkki (Lontoo: Big Ben ja Tower Bridge, Ateena: Akropolis) omana '
          + 'Blender-skriptinä (CC0), sijoitettuna kaupungin pisteeseen niin, että se erottuu lähtiessä ja laskeutuessa kaukaa — pilotti Lontoo + Ateena elokuvalennon erän 2 jälkeen, sitten kaikki '
          + 'kaupungit sisältötyönä; ei kokonaisia kaupunkeja eikä Cesium ionin OSM-rakennuksia. KONE AINA NÄKYVISSÄ (omistaja 25.9.2026 klo 19.0x, löydöksen 120 videoparista, sitova): LENTOKONE ON '
          + 'KOKO AJAN NÄKYVISSÄ — kamera ei missään vaiheessa kadota konetta ruudusta (ei syöksyjä tai kaartoja, joissa kone jää ulos kuvasta), ja LENNON ALKU NÄKYY, vaikka kaukaa: nousu '
          + 'lähtökaupungista on kuvassa ennen kuin kamera lähestyy konetta. Yhtenäinen spline ja tempon vaihtelu säilyvät. TEMPO (omistaja 24.9.2026 klo 10.2x): nopeuden vaihtelu on olennaista — '
          + 'alussa nopeasti lähelle konetta ja kuminauhamainen jarrutus, hetki lähes paikallaan hitaasti panoroiden, sitten kiihtyvä irtautuminen kauemmas, tasainen matka, lopuksi kierto; koko ajan '
          + 'harkittuja nopeuden muutoksia (tasaista ja kiihtyvää vuorotellen), kaikki siirtymät kuminauhamaisia, hitaita tai nopeita tilanteen mukaan. KAMERA-AJOT (omistaja 24.9.2026 klo 10.1x, '
          + 'sitova): kaikissa kameraliikkeissä ease in ja ease out — mahdollisimman pehmeät, elokuvamaiset liikkeet ilman lineaarisia pätkiä tai hyppyjä vaiheiden välillä (yhtenäinen spline, '
          + 'vaiheet sulautuvat toisiinsa); aloituslento on alkukohtaus, jonka pitää säväyttää: visuaalisesti vaikuttava ja elokuvamainen. Sama tempon dramaturgia (nopeuden vaihtelu, kuminauhamaiset '
          + 'kiihdytykset ja jarrutukset, tasaisen ja kiihtyvän vuorottelu) sovelletaan KAIKKIIN pelin kohtauksiin, joissa kamera liikkuu automaattisesti: lennot ja matkat, saapuminen, kaupungin '
          + 'vaihto, zoomit, linssien avaukset ja pysäkkiajot, aarteen paljastus, huipennus ja aloitusnäytön pallo (omistaja 24.9.2026 klo 10.2x); ajot rakennetaan yhteisellä aikajana- ja '
          + 'käyräkirjastolla. AVAIMET NATIIVISSA (Fable 24.9.2026, sitova): kuratointiavain, pollo-kehittäjäkoodi ja muut avaimet tallennetaan vain iOS Keychainiin (MatkakirjaAvaimet), ei '
          + 'PlayerPrefsiin, ei sovelluksen binääriin, ei lokiin; kentät salasanatyyppisiä, vain kehittäjätilassa, App Store -käännöksessä arvo aina tyhjä. PERUSKARTAN RESEPTI 2026-09-25 (omistaja '
          + '25.9.2026 klo 00.0x, kortti, sitova; löydös 46, web ja natiivi): pohja ilman rantamustetta (maan ja meren raja antialiasoitu vektorimaskista, ei portaikkoa), meri ilman syvyyskäyriä ja '
          + 'vesiviivoitusta — syvyys vain pehmeänä sävyliukuna pergamentin sävyssä —, reliefi GLO-30:stä kaikille tasoille monisuuntaisella varjostuksella ja lämpimällä hypsometrialla (vedos C/D2, '
          + 'docs/raportit/kaappaukset/kartta-46-20260924/); pallosarja poltetaan Z0–Z9 koko maailmalle (Z10 myöhemmin kattavuuslistalla), JPEG 90 4:4:4 ja laatikkosuodatin '
          + 'Miller→Mercator-näytteistykseen. RESEPTI 2026-09-26 (omistaja 25.9.2026 klo 23.0x, kortti, löydös 129): sama kuin 2026-09-25 + meren litistys 1 ja syvyyskontrasti 1,35 ("vahvempi" '
          + 'kuvakolmikosta); pallosarja 2026-09-26-pohja-20260926 poltetaan yöllä, osoitinvaihto erikseen; kermahuntu poltetaan 26-pohjasta peitolla p060 (omistaja 26.9.2026 klo 05.0x, löydös 128; '
          + 'kuvakolmikosta p080/p060/p045); maarajan paino Kevyt (1,0–1,8 pt, peitto 0,8; omistaja 26.9. klo 05.0x, löydös 127). Rannat ja rajat piirretään NATIIVISSA vektorina omana viivaverkkona '
          + '(Maarajan tekniikka, 0,8–1,2 pt, peitto 0,58, webin GSHHS-sarja; rajoille korkeus pisteittäin) kuten web piirtää ne tasokartalla; natiivin paksu Maaraja-kehä poistuu. TARKENNUS '
          + '(omistaja 25.9.2026 klo 00.0x): RANTAVIIVA vektorina himmeänä tai kokonaan pois — maan ja meren rajan tekee pohjan antialiasoitu väriraja; MAIDEN RAJAT vektorina täydellä webin '
          + 'voimalla, koska ne erottavat maat toisistaan; vektorirantaviiva on natiivissa kokonaan pois (omistaja 25.9.2026 klo 22.3x, löydös 126: meren ja maan tuplaraja). Karttaseppä polttaa, '
          + 'Natiiviseppä piirtää; omistaja hyväksyy kuvaparista ennen tuotantoon vientiä. KAUPUNKIKORTTI JA KAMERA KOHDETTA NAPAUTETTAESSA (omistaja 25.9.2026 klo 00.1x, sitova, löydös 48): '
          + 'kohdekaupungin napautus avaa natiivissa webin yksinkertaisen kortin (kaupungin nimi, Nähtävyydet, Turistiopas, viiva, nostoluokat lukumäärineen värillisin pistein — kuva '
          + 'docs/raportit/kaappaukset/omistaja-20260925/loydos48-web-kaupunkikortti-pariisi.png), ja kamera EI zoomaa ulos vaan siirtyy vain vähän sivulle, jotta kortti mahtuu avautumaan (webin '
          + 'mitat: siirto ja kesto mitataan tuotannosta); natiivin nykyinen ulos zoomaava avaus poistuu. Hyväksytty poikkeama: natiivin pieni herokuva kaupungista saa jäädä korttiin. ÄÄNET '
          + 'NATIIVIIN (omistaja 25.9.2026 klo 00.1x, löydös 49): kaikki webin äänet (luennat, efektit, musiikki, radio, pulu) kuuluvat natiivissa samoin kuin webissä (AVAudioSession-kategoria '
          + '.playback, jolloin äänet soivat myös mykistyskytkimellä kuten webissä). ELEET: KIERRON ESTIN, KALLISTUS JA MAASTON TARKKUUS (omistaja 24.9.2026 klo 22.4x, Google Earth -vertailusta, '
          + 'sitova, natiivi): 1) tahattoman kierron estin — kahden sormen nipistyksessä syntyvä pieni kierto jätetään huomiotta ja pohjoinen pysyy paikallaan, kunnes pelaaja kääntää kahdella '
          + 'sormella selvästi enemmän (kynnys mitataan Google Earthista, n. 15–20°; kynnyksen ylityttyä kierto seuraa sormia ilman hyppyä); 2) kahden sormen kallistus aavistuksen hitaampi kuin nyt, '
          + 'ja suunta käännetään: veto alhaalta ylös kallistaa näkymän viistoon, veto ylhäältä alas palauttaa ylhäältä katsottavaksi; 3) maaston muodot tarvitsevat lisää tarkkuutta maatasolla — '
          + 'Google Earthissakin muodot tulevat vasta lähempää, joten maatasolla ladataan tarkempi maastotaso (pienempi ruutuvirhe tai tarkempi quantized-mesh -taso) yhdessä valon kanssa (löydös '
          + '46). ESILATAUSPOLITIIKKA (omistaja 25.9.2026 klo 16.1x, hyväksyi Fablen ehdotuksen, sitova, natiivi): pelaaja ei saa koskaan odottaa verkkoa kohdassa, jonka peli tiesi olevan tulossa — '
          + 'jokaisella siirtymällä (aloitus, valinta, lento, saapuminen, kaupungin avaus, nosto, linssi, matka) tiedetään, mitä seuraavaksi voi näkyä, ja se pyydetään edellisen vaiheen aikana; '
          + 'latausajat piilotetaan vaiheisiin, jotka kestävät joka tapauksessa (musta feidi, lento, kortti, luenta). 1) BUILDISSA MUKANA, ei verkkoa koskaan: koodi, fontit, UI-grafiikka, pulu, '
          + 'lentokone, kaikki efektiäänet, logo ja avauskuva (löydös 80), pallon pohja Z0–Z5 koko maailmasta, aloitusnäytön reittidata, aloituskaupunkien perustiedot; offline-paketti tuo Z8:n '
          + 'maailmasta ja Z9:n kaupunkien ympäriltä. 2) KÄYNNISTYKSESSÄ verhon takana: sisältöpaketin versiotarkistus ja päivitys taustalla (ei koskaan estä pelaamista; käyttöön seuraavassa '
          + 'käynnistyksessä tai joutilaana), aloitusnäytön pallon laatat, lentokoneen reitin kaupungit. 3) VALINNAN JA LENNON AIKANA (musta feidi + lento + kortti) kaikki, mitä saapuminen tarvitsee '
          + 'valitussa kaupungissa: laatat Z7–Z10 ympäristöineen ja kotimaan korostus, lennon pinta reitiltä, saapumiskortti, isoisän molemmat valokuvat, luennan ja pulun puhe-mp3:t, nostodata, '
          + 'miniatyyrit ja nähtävyyskuvat, maakuntarajat, maalehden ja kaupunkilehden sisältö — tavoite saapumisessa nolla verkko-odotusta, savuke vartioi. 4) KAUPUNGISSA JOUTILAANA '
          + 'prioriteettijärjestyksessä: nostojen isot kuvat ja galleria (pieni ensin, iso taustalla), lehtien kuvat, kaupungin kaikki puheäänet, linssien data näkyvälle alueelle (radiomastot ja '
          + 'yövalot, avaruuslinssin topografia nykyisellä zoomilla ±1, Ihmisen matkan kaari pienenä), sitten nopalla saavutettavien kaupunkien saapumisassetit ja reittien varren laatat '
          + 'matka-animaation zoomilla, viimeisenä niiden nostot. 5) ENNAKOINTI LIIKKUMISESSA: kun kohteet näkyvät, kohdekaupunkien kohdan 3 lista alkaa heti; kun matka alkaa, kohdekaupunki saa '
          + 'saman kohtelun kuin aloituskaupunki lennolla. 6) LINSSIT AVATTAESSA webin sääntö: koko kaari pienenä heti, kaksi ensimmäistä pysäkkiä täysinä; radiossa nykyinen ja seuraava asema '
          + 'puskuroituna; avaruuslinssissä topografia ±1 zoom. MEKANISMI: yksi Esilataaja-palvelu prioriteettijonolla (näkyvä > seuraava ruutu > tämä kaupunki > kohdekaupungit > muu), 4–6 '
          + 'rinnakkaista pyyntöä, ruudulla näkyvä pyyntö ohittaa aina taustajonon; kaksi välimuistia — levyllä pysyvä (laatat sarjan nimellä, kuvat osoitteella, paketti versiolla; siivous '
          + 'vanhimmasta yli 2 Gt:ssa) ja muistissa purettujen tekstuurien LRU (iPhone ~200 Mt, iPad ~300 Mt), kuvat puretaan taustasäikeessä; 429- ja verkkovirheet uusitaan viiveellä, epäonnistunut '
          + 'esilataus ei jää lopulliseksi; MOBIILIDATA LATAA AINA SAMAT KUIN WIFI (ks. LATAUS ON SAMA KAIKILLA VERKOILLA — EI EROA WI-FIN JA MOBIILIDATAN VÄLILLÄ) — kohdat 1–6 ja paketin päivitys '
          + 'kaikilla verkoilla, virransäästötila pysäyttää kohdat 4–5; MITTARIT: esilatauksen osumaprosentti ja "pelaaja odotti verkkoa" -millisekunnit per vaihe lokiin ja savukkeeseen. EI '
          + 'ESILADATA: koko maailman Z9–Z11, muiden kaupunkien galleriat ja wiki-tekstit, taidemuseo, Sentinelin Z11 muualta kuin lentokaupungeista. LÄMPÖ JA VIRRANKULUTUS NATIIVISSA (omistaja '
          + '25.9.2026 klo 18.2x, kortti, sitova): peli ei saa kuumentaa laitetta levossa. 1) DYNAAMINEN RUUDUNPÄIVITYS (Pelikoodari): täysi taajuus vain kosketuksen, liu’un, kamera-ajojen, lennon, '
          + 'linssiajojen ja UI-animaatioiden aikana; levossa (0,5 s ilman muutosta) 30 fps; kun mikään ei muutu (kamera, laatat, UI, pulu, äänet), ei piirtoa lainkaan OnDemandRenderingillä — webin '
          + 'lepopiirron vastine; koko ruudun lehden alla pallon piirto seis. 2) LÄMPÖTILA JA VIRRANSÄÄSTÖ (Pelikoodari): thermalState ja Low Power Mode luetaan; serious: katto 30 fps, renderScale '
          + '0,7, bloom pois; critical: 20 fps; virransäästötila = serious; Esilataajan taustajono (tasot 4–5) pysähtyy kuumana. 3) PIKKUSÄÄDÖT KUVAPARILLA (Natiiviseppä): HDR pois, jos ei näkyvää '
          + 'eroa; päävalon varjot pois, kun maamerkkejä ei ole näkyvissä; accelerometerFrequency 0; KehysMittarin tiedostokirjaus vain kehittäjätilassa. 4) MITTARI (Laitetestaaja): laitteella 10 '
          + 'min pelijakso (aloitus, Ateena, lehti, linssi) — lämpötila-aste ja akkuprosentti ennen ja jälkeen, tulos löydösraporttiin; savukkeeseen vartija lepo ≤ 30 fps ja lepopiirto päällä. '
          + 'Liikkeen sulavuus ei saa huonontua (60 fps iPhonella liikkeessä, kehysaikamittaus jokaisesta erästä). PALLO 40 FPS (omistaja 11.10.2026 klo 00.0x, kortti "40 kuvaa sekunnissa '
          + '(suositus)"; 60 fps kuumensi iPad Pro 13:n): kuumailmapallo piirretään 40 fps:llä myös viileänä, lämpöhidastus alkaa jo lämpimänä ja kartan lepo on 10 Hz; resoluution ja piirtovälin '
          + 'muutokset vasta uuden laitemittauksen jälkeen. GRAFIIKKA JA MUISTI MAKSIMIIN (omistaja 8.10.2026 klo 19.53, sitova): natiivissa otetaan käyttöön kaikki grafiikan parannukset, jotka '
          + 'laite kantaa, ja muistia käytetään laitteen sallimaan maksimiin. Muistibudjetti lasketaan ajonaikaisesti laitteen vapaasta muistista (os_proc_available_memory, turvamarginaali vähintään '
          + '0,7 Gt tai 15 %, hätävahti), ja increased-memory-limit-oikeus on käytössä. M-sarjan laitteilla on Ultra-laatutaso (lisävalojen ja pehmeät varjot, varjokartta 4096, renderScale 1, MSAA '
          + '4×, SSAO, HDR), ja vanhemmat laitteet saavat kevyemmän tason automaattisesti. Kiinteä +60 Mt:n linnaraja on poistettu. Kuumana kevennetään kuvaskaalaa, reunanpehmennystä ja volumetrisiä '
          + 'valoja, mutta laatutasoa ei vaihdeta kesken linnan. OMIEN MALLIEN VIENTI JA MUISTIONGELMAT (Natiiviseppä ja Päätoimittaja 10.10.2026 klo 00.3x): omien mallien vienneissä toistuvat osat '
          + '(puut, rekvisiitta) yhdistetään yhdeksi meshiksi per tyyppi jaetulla materiaalilla, ja vienti tarkistetaan automaattisesti (teksturoitu mesh useassa solmussa tai tekstuuriarvio yli 2 × '
          + 'kuvat + 8 = virhe). Muistiongelmassa MITATAAN ENNEN KORJAUSTA laitteella luokittain (tekstuurit, laatat, renderöintikohteet, omat mallit), ja korjaus tehdään vasta mittauksen jälkeen. '
          + 'ELÄVÄ KARTTA — ISOISÄN MUSTE (omistaja 25.9.2026 klo 23.5x tilaus, 26.9. klo 00.0x kortti, sitova, vain natiivi): kartan elävöitys suunnitelman '
          + 'docs/raportit/elava-kartta-suunnitelma-20260926.md mukaan — 1) saapuminen kohdemaahan (huntu kuivuu pois musteena, joet ja maakuntarajat piirtyvät, aamuaurinko ja kallistettu kierto; ≤ '
          + '5 s, ohitettava), 2) nostojen kolme kokoluokkaa (pääkohde, kohde, pieni), 3) maa valmis → lippu liehuu (EI väriä eikä pysyvää täyttöä — omistaja 26.9.2026 klo 19.3x, löydös 168: noston '
          + 'avaus ei saa värjätä maakuntaa), 4) kirjoitettu maailma (reitti kynänjälkenä, luonnokset käydyissä kaupungeissa, yövalot vain käydyissä kaupungeissa), 5) elävät hetket (3 s tapahtumia '
          + 'muutaman minuutin välein: laivat 1873-reiteillä, lintuparvet, junan savu, sadekuuro; lepopiirto säilyy). Kaikki 1–5 prototypoidaan ensin VIDEOKSI (Linssiseppä vetää, Natiiviseppä pallo, '
          + 'muut roolit datana), suunta hyväksytty 26.9.2026 (Kreikka-video); pelattavana kohta 1 (saapuminen) ensin, sitten 2–3 ja 4–5; kuvapari omistajalle jokaisesta erästä. JOHTOAJATUS '
          + 'VISUAALISUUDESTA — NIUKKUUS JA ELÄVÄ ANIMOINTI (omistaja 26.9.2026 klo 10.0x, sitova, koko peli): pelin visuaalinen johtoajatus on niukkuus yhdistettynä sulavaan ja elävään animointiin '
          + '— yksinkertaisten elementtien animointi on tärkein asia. Kartta saa näyttää aavistuksen tietokonepeliltä, mutta visuaalisesti rajoitettuna niin, ettei se muutu sekavaksi: hillitty '
          + 'paletti (vain kohdemaan lippu täysvärinen), harvat mutta liikkuvat elementit — liioitellun iso lipputanko kohdemaassa (161), elävät hetket, animoidut erikoismallit (esim. Lontoon '
          + 'maailmanpyörä hieman sivuun siirrettynä, Kööpenhaminan pyörivä Tivoli), hitaasti kävelevät eläimet (esim. Afrikassa) — ja kaikki animointi yleisellä ELÄVÄLLÄ KERROKSELLA: kamera '
          + 'paikallaan → kartta piirretään kerran (väri ja syvyys talteen), vain rekisteröidyt animoidut kohteet piirretään omalla kerroksella 30 fps, kerros pysähtyy 0 kehykseen kun mikään ei '
          + 'animoi, kameran liike → täysi piirto; animointi pidetään koko ajan päällä (ei jähmetystä levossa), lämpö mitataan laitteella. EI MONOTONIAA (omistaja 26.9.2026 klo 13.4x, sitova, kaikki '
          + 'animoidut elementit): jokaisella animoidulla kohteella on vaihtelua — välillä pysähdys, eri nopeus, eri vaihe tai eri taso — niin ettei liike ole koskaan tasaista toistoa; sama sääntö '
          + 'koskee kaikkia vastaavia kohteita (karuselli, maailmanpyörä, eläimet, lippu). AITO 3D, EI POP-UP (omistaja 26.9.2026 klo 13.5x, sitova): 3D-nostot ja erikoismallit ovat aidosti '
          + 'kolmiulotteisia ja reagoivat katselukulmaan — ylhäältä näkyy katto, kallistaessa sivu — ne seisovat maan pinnalla (ei leijuntaa: jalka pisteen korkeudelle, ks. 166) ja niissä on pieniä '
          + 'valoja; värit hillittyinä, koristeet (esim. puut) pois ja valoja lisää. Kokeillaan pelissä laitteella, ei pelkästä kuvasta. LIIOITELTU PERSPEKTIIVI (omistaja 26.9.2026 klo 21.4x ja '
          + '22.4x, sitova; lippu, 3D-nostot, elävät elementit): kun kamera on suoraan kohteen yläpuolella (kohde ruudun keskellä), kohde näkyy suoraan ylhäältä ja lippu on lähes näkymätön; keskeltä '
          + 'poispäin kohdetta näytetään liioitellusti sivusta, kuin kamera olisi paljon alempana — tangon ja mallin suunta on aina radiaalisesti poispäin ruudun keskipisteestä (ruudun alaosassa '
          + 'tanko alaspäin), näkyvä pituus kasvaa 0 → täysi keskeltä reunaan, kangas kääntyy mukana. 3D-NOSTOT = KATEGORIASYMBOLIT (omistaja 26.9.2026 klo 21.5x ja 27.9. klo 00.1x, sitova): '
          + '3D-nostoja ovat VAIN NOSTOT-paneelin kategoriasymbolit (kaari, tähti, tiimalasi, salama, vuori, tulivuori, aallot, tassu, kellotorni, malja ja leipä, vaaka, ratas, ankkuri, '
          + 'kaupunkipiste), samat joka maassa — ei rakennusarkkityyppejä lajin mukaan. Ne ovat OIKEITA 3D-ESINEITÄ (aito geometria, valo, varjostus ja kameran perspektiivi kuten lipputangolla; '
          + 'visuaalisesti yhtä hyviä kuin 2D-kuvamerkit), EIVÄT pursotettuja 2D-kuvamerkkejä (reliefit hylätty: muoto vääntyy). Paletti mitataan kuvamerkeistä (paperi #efe4cc, seepia #8a6a44, muste '
          + '#3b2f22, kaiverrusreuna, aksentti ≤ 10 %), koko ≤ 40 pt, ei jalustaa (maavarjo), löydetty ja löytämätön samannäköiset, kategoriasymboleita EI animoida. Mallit näkyvät vasta kynnyksellä '
          + '(kerroin ≥ 2,5) ja kallistetussa kamerassa; ylhäältä ja kaukaa 2D-kuvamerkki. ERIKOISMALLIT (omistaja 26.9.2026 klo 22.0x, sitova): lisäksi 2–3 erikoismallia maata kohden tason 1 '
          + 'nostoista (esim. Akropolis, Mont-Saint-Michel, Stonehenge, Colosseum; lista Linssisepän ja Natiivisepän esityksessä, ks. loki 26.9. klo 21.5x), 1,5 × kategoriasymbolin koko, ≤ 1 500 '
          + 'kolmiota, ja ne ANIMOIDAAN Tivolin logiikalla (elämänidea: perusliike, harvinainen tapahtuma ~1/10, reaktio pelaajaan, yövalot; ei monotoniaa). Tekijä Opus max-effortilla (nimessä), '
          + 'mahdollisimman hyvät, speksi per malli (Linssisepän speksipohja, ks. loki 26.9. klo 22.0x), muutama kerrallaan ja omistaja tarkastaa välissä (3 kuvakulmaa isona + 10 s video). MEREN '
          + 'KORISTEANIMAATIOT (omistaja 26.9.2026 klo 22.0x, sitova): merelle kymmenkunta koristelajia (siipiratashöyry, purjelaiva, kalastusvene, nykyaikainen lautta, valas, delfiinit, lokkiparvi, '
          + 'jäävuori, majakkalaiva, kartografinen merihirviö), joista kohdemaalle valikoituu 1–2 meren mukaan (merikohdat.json), enintään 2 näkyvissä kerralla, Tivolin logiikka; kokeilu höyrylaiva '
          + '+ valas Norjan länsirannikolla. NOSTOMERKIT KARTALLA (Fable 26.9.2026, web on malli): löytämätöntä EI himmennetä (omistaja 21.9.); kynnyksen (kerroin 2,5) alla nosto on piste paitsi '
          + 'vuori, vesi, skandaali ja tassu (omistaja 2.9.), kynnyksen yllä kuvamerkki webin koossa; musteläikkää ei piirretä missään zoomissa. OMISTAJALLE TOIMITETTAVAT ESIMERKKIKUVAT (omistaja '
          + '27.9.2026 klo 00.2x, sitova, kaikki roolit): jokaiseen esimerkki- ja vertailukuvaan merkitään SUORAAN KUVAAN, mistä kulmasta se on kuvattu (esim. ylhäältä 0°, kallistus 27°, sivusta) ja '
          + 'mikä versio tai vaihtoehto on kyseessä (esim. ennen / jälkeen, A / B, 35 % / 45 %), niin ettei kuvia tarvitse tulkita erillisestä tekstistä. Kuvat rajataan laitteen ruutuun ja kohde '
          + 'näytetään suurennettuna (≥ 300 px), koska omistaja katsoo ne puhelimella. Järjestys: ensin selvitys sopivista ideoista Euroopan muutamaan kaupunkiin eri aiheineen (Linssiseppä vetää, '
          + 'Sisältökirjuri aiheet, Natiiviseppä kehysbudjetti; selvitys docs/raportit/-kansioon Linssisepän nimellä), omistaja valitsee kortilla, sitten kokeillaan yksi kerrallaan laitteella, lippu '
          + 'ensin. TESTFLIGHT-BUILDIT KEHITYKSEN AIKANA (omistaja 24.9.2026 klo 08.1x, sitova): build ajetaan aina, kun masteriin on tullut merkittäviä muutoksia (uusi toiminto, omistajan löydöksen '
          + 'korjaus, sisältöpaketin versio, suorituskykykorjaus), ei vain yöllä: Natiiviseppä ilmoittaa masterin SHA:n joka merge-erän jälkeen, Fable käskee buildin, Julkaisija ajaa sen heti (yksi '
          + 'kerrallaan, ei polton eikä omistajan mittausikkunan aikana; UNITY-EDITORI KIINNI JA SIMULAATTORIKÄÄNNÖKSET TAUOLLA VIENNIN AJAN — avoin editori jumittaa batchmode-viennin hiljaa '
          + '(24.9.2026 klo 13.4x); Julkaisija tarkistaa pgrep:llä ennen ajoa ja ilmoittaa Natiivisepälle ajon alun ja lopun; kaatumisesta ilmoitus Fablelle heti; Unity-vienti ajetaan lipulla '
          + '-nographics, jolloin se toimii vaikka Macin konsolissa on toinen käyttäjä (ilman lippua batchmode jää jumiin ilman ikkunapalvelinta; konsolinvaihtoa ei tarvita), ja Fable ilmoittaa '
          + 'omistajalle jokaisesta saatavilla olevasta buildista yhdellä rivillä. Yöllinen ajo klo 04 jää varmistukseksi. VAIN UUSIN VERSIO PELAAJALLE (omistaja 11.10.2026 klo 22.2x: "saako '
          + 'jotenkin estettyä että test flightista ei voi ladata kuin uusimman version?" ja "kyllä"): TestFlightissa on asennettavissa vain uusin hyväksytty build: kun uusi build on hyväksytty '
          + 'testaajille, Julkaisija vanhentaa kaikki vanhemmat (iOS ja Mac; pysyvä vaihe TF-ketjussa, eikä edelliseen voi palata), eikä peli koskaan käytä sisältöpakettia, joka on vanhempi kuin se, '
          + 'jolla build on testattu. VARMENTEET JA PROFIILIT (omistaja 23.9.2026 klo 23.0x, sitova): Julkaisija saa ilman kysymistä perua vain varmenteet ja profiilit, jotka automaatio on itse '
          + 'luonut samana päivänä ja jotka ovat ylimääräisiä; jokainen peruminen kirjataan lokiin. Kuoriappin ja muiden vanhojen varmenteiden perumiseen tarvitaan aina omistajan lupa. '
          + 'Allekirjoitusvarmenne säilyy ajurin pysyvässä avainnipussa, eikä työnkulku luo uutta, jos käyttökelpoinen on. Loki: docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 11.10.2026: NATIIVI '
          + 'PELI ETUSIJALLE (11.10.2026 klo 15.44), #OMISTAJAN PÄÄTÖS: ALOITUSLENNON KAMERA (14.10.2026 klo 23.57).',
        'CLAUDEN JA CHATGPT/CODEXIN AGENTTISÄÄNNÖT ERIKSEEN (omistaja 11.9.2026 tekstisession kautta, sanatarkasti: "Peliä kehitetään Claudella ja ChatGPT/Codexilla. Opus/Sonnet-rajoitus ja '
          + 'Fable-mallin agenttikäytön kielto koskevat Clauden agentteja. ChatGPT/Codex saa käyttää Solia ja muita kevyempiä saatavilla olevia agenttimalleja aina, kun tehtävä soveltuu niille. '
          + 'Molempien pääsessioiden tulee delegoida selvästi rajattuja tehtäviä kevyimmälle riittävän kyvykkäälle mallille, kun se säästää kokonaiskäyttöä laadusta tinkimättä. Huomioi myös '
          + 'kontekstin siirron, koordinoinnin ja tarkistuksen kulutus: aivan pientä työtä ei tarvitse delegoida. Pääsessio vastaa työnjaosta, tulosten tarkistamisesta ja kokonaisuudesta; vaativa '
          + 'päättely ja harkinta jäävät riittävän kyvykkäälle mallille."): yllä oleva ensimmäinen sääntö koskee Clauden (Fablen) agentteja eikä sitä pureta; Codexin agenttivalinta on Codexin oma. '
          + 'Sama täsmennys CLAUDE.md:ssä ja docs/roolitus.md:ssä. Tarkennus (omistaja 11.9.2026 klo 13.45, sanatarkasti: "codex voi käyttää agentteina sol, terra ja luna malleja"): Codexin '
          + 'agenttimallit ovat Sol, Terra ja Luna.',
        'PULU VALMIIKSI KAIKISSA PELITILANTEISSA, JULKAISUT HETI PORTTIEN JÄLKEEN (omistaja 11.9.2026 tekstisession kautta, sanatarkasti: "tee kaikki mahdollisimman pitkälle ja valmiiksi ja '
          + 'julkaiskaa ne peliin heti kuin mahdollista. tämä on tällä hetkellä tärkeää saada valmiiksi ja mahdollisimman hyväksi kaikissa pelin tilanteissa. käytä työssäsi apuna agentteja nopeuden '
          + 'ja kustannusten vuoksi"): Julkaisulupa porttien jälkeen on omistajalta suora. Poikkeus: videopeleissä (historialliset seikkailut) Pulua ei ole (omistaja 8.10.2026 klo 18.58, ks. KAMERA '
          + 'JA VIHJEET).',
        'YHTEISKEHITYKSEN KEVENNYS: TILANNEKORTTI, RAJAPINTASOPIMUS ENNEN TOTEUTUSTA, YKSI JULKAISUVASTAAVA (omistaja 11.9.2026 tekstisession kautta: "omistaja pyysi ottamaan käyttöön '
          + 'keskustelussamme esitetyt yhteistyön parannukset"): 1) yksi lyhyt tilannekortti per yhteinen ominaisuus postilaatikossa (posti/pulu-luentareaktiot-tila.md; ylläpitäjä Codex), pitkät '
          + 'postit ovat historiaa; 2) ennen rinnakkaista toteutusta sovitaan tapahtumat, kentät, virhe- ja keskeytyspolut ja testattava lopputulos, rajapintamuutos kuitataan molemmin puolin, ei '
          + 'hiljaisia paikkauksia toisen tiedostoihin; 3) yhteiselle ominaisuudelle yksi julkaisuvastaava - Pulun kokonaisuudessa Fable, Codex tekee integraatio-QA:n; tiedostojen muutosomistajuus '
          + 'ei siirry; 4) kevyet agentit rajattuihin tehtäviin, pääsessio tarkistaa; 5) git-postilaatikko on toimituskanava, kortti nykytila, ei jatkuvaa pollausta; 6) omistajalle vain valmis '
          + 'vaihe, olennainen ongelma tai tuotevalinta; erotetaan aina testattu / toimitettu / kuitattu / mainissa / julkaistu / oikeassa pelissä tarkistettu. Työnkulku docs/roolitus.md:ssä.',
        'CODEXIN TAHTI: EI PITKIÄ TAUKOJA (omistaja 16.10.2026 klo 18.05: "Pitä huolehtia, että kodeksille ei tule liian pitkiä taukoja ja että se työskentely etenee. '
          + 'Haluan päästä kokeilemaan Pekingiä kipillä heti, kun se on valmis."): Codexilla on aina 2–3 hyväksyttyä seuraavaa tehtävää jonossa; jokainen Codex-toimitus arvioidaan alle 30 minuutissa '
          + 'vapaalla roolilla (ei odoteta kiireistä roolia); Postivahti tarkistaa kierroksellaan ledger.jsonin ja postilaatikon ja hälyttää PT:lle, jos toimitus on odottanut yli 30 min tai Codexilla '
          + 'ei ole tehtävää. Jokainen arvioitu Peking-paketti viedään ämpäriin ilman junaa omistajan piilotettuun kippiin ja siitä rivi KK:lle. Loki PAATOKSET 16.10.2026 klo 18.05. '
          + 'CODEXIN VAHTI (omistajan kortti 17.10.2026 klo 07.25 "Kyllä (Suositus)": "Vahti seuraa kaikkia Codexin viestejä. Jos viestiin ei ole vastattu 30 minuutissa, Päätoimittaja vastaa itse tai antaa sen toiselle. Tunnin jälkeen asia näkyy Asemataululla, kunnes siihen on vastattu."): '
          + 'S/Matkakirja-posti/codex-odottaa.py katsoo kaikki posti/codex-<rooli>-* -viestit ja vastaukset posti/<rooli>-codex-*; 30 min → PT, 60 min → KK + Asemataulun VAATII TOIMIA, kunnes vastattu. '
          + 'Vastaus tai kuittaus aina tiedostonimellä <rooli>-codex-<aihe>-…, jotta vahti tunnistaa sen; avoimet Codex-viestit kirjataan roolin luovutukseen.',
        'TYONJAKO FABLE / CODEX SELKEYTETTY (omistaja 15.9.2026 klo 19.10 UTC; kortin tarkennukset "Kaanon Fablella, tekstit Codexilla" ja "Ei, Opus-kuvaputki jatkaa"): 1) CODEX: pelin TEKSTIT '
          + 'kaanonin mukaan (kaupunki- ja pulutekstit, luennat, selitteet, iskulauseet), AANIGENEROINTI kokonaan (tyonkulut, aaniviat, ElevenLabs-ajot, R2-vienti, kuitit), ANIMAATIOT (pulu, '
          + 'minipulu, eleet, hahmot) ja GENEROIDUT KUVAT (havainnekuvat, hahmokuvat); 2) FABLE: TARINAKAANON (docs/tarina.md, Isoisan raamattu, Fogg-suku, Grimshaw; hyvaksyy tekstien ristiriidat '
          + 'kaanoniin), Raamattu, karttauudistus, kayttoliittyma, linssit, julkaisut, portit, tyokalut ja valmiin sisallon KYTKEMINEN peliin manifestista; 3) KUVAPUTKI (Commons-haut, skaalaus 1800 '
          + 'px, R2, manifestit) pysyy erillisena Opus-sessiona, jota Fable ohjaa; 4) KORJAUKSET vain omaan alueeseen: jos toisen tyo on rikki, siita yksi postilaatikkoviesti, ei korjata ohi - '
          + 'poikkeuslupa vain omistajalta; 5) toimitus = manifesti + kuittaus postilaatikkoon, kytkenta = Fablen agentti; 6) tama korvaa aiemmat osittaiset jaot (Codex tekniset eleet / Fable '
          + 'sisaltotagit) silta osin kuin ne ovat ristiriidassa. Tyonkulku docs/roolitus.md:ssa. TARKENNUS (omistaja 17.9.2026 klo 17.10 Suomen aikaa): Fable kirjoittaa postilaatikkoon vain '
          + 'tilauksen (kuvat, kertojan tai pulun aanet, animaatiot) tai vastauksen Codexin kysymykseen - ei julkaisukuittauksia, ei testipyyntoja, ei tilannepaivityksia. QA:n ja WebKit-todennuksen '
          + 'Fable tekee itse Macilla (Playwright WebKit). PÄÄKAUPUNGIT JA PEKING CODEXILLE (omistaja 11.10.2026 klo 17.5x–18.0x): Codex tekee pääkaupunkien erät e04–e14 tekstisisältönä (ohje '
          + 'paakaupungit-pilvi/CODEX.md haarassa paakaupungit-codex-pohja) ja sen jälkeen koekaupunki Pekingin 3D:n avoimesta aineistosta (erillinen tilaus, ei Googlen laattoja); meidän puoli '
          + 'tarkistaa ja kytkee (pääkaupungeissa Sisältökirjurin pistokoe, Pelikoodarin kytkentä ja Julkaisijan vienti). Clauden puolella musiikin (Lyria) ja äänet (ElevenLabs) tekee 11.10.2026 '
          + 'alkaen Äänittäjä (ks. TYÖTAPA JA SESSIOT, A) ROOLIT).',
        'LAATU ON AINA TÄRKEIN PRIORITEETTI. Laatu voittaa vauhdin, määrän ja kustannuksen. Vähemmän ja viimeisteltyä.',
        'Suomenkielinen selainseikkailu: Foggin perillinen kiertää maailman isoisänsä 1873-päiväkirjan jäljillä ja etsii Aarnin luettelon unohdettuja aarteita.',
        'Kohderyhmä 13+ ja aikuiset. Ei lastenpeli.',
        'Peli näyttää maailmaa: kulttuurit, kielet, historia, keksinnöt — tarkoin valituin kuvin, tekstein, pelein, kartoin ja radioin. Hurjia tarinoita 1873:sta ja nyt.',
        'Imu: aarteet, vaarat ja aikapaine — maailman ympäri alle 80 päivässä. Raja on tavoite, ei tuomio: ylityksestä ei rangaista, alitus palkitaan, kuluvista päivistä muistutetaan.',
        'Oppiminen on sivutuote: uteliaisuus kuljettaa, mikään ei tunnu koululta. Pieni yksityiskohta laajenee ymmärrykseksi maasta.',
        'Tekoäly kuratoi valtavan PD/CC-aineiston — ihminen valitsee ja hyväksyy.',
        'SYDÄNTEEMA: ihminen on peruskysymysten äärellä yhtä pihalla kuin ennenkin. Lapsenlapsi yrittää ymmärtää isoisäänsä — siihen pelin loppu päättyy.',
        'NIMEN KAKSI TASOA (omistaja 26.8.2026): Unohdetulla aarteella on kaksi tasoa. (a) PELIN MAAILMASSA: Aarnin luettelon aarteet ovat oikeasti olemassa — ne on vain unohdettu. Samaa etsintää on '
          + 'isoisä itse: hänen tarinansa on lapsenlapselle aluksi yhtä kadoksissa ja löytyy matkan varrella (sydänteeman jatke). (b) PELIN YDINIDEANA: unohdettu aarre on kaikki se kulttuuriperimän, '
          + 'taiteen, tieteen, löydösten ja maailman epäkummallisuuksien rikkaus, joka tekee ihmisenä olemisesta mielenkiintoista ja elämisen arvoista — ja joka nykyisen some- ja AI-moskan keskellä '
          + 'äkkiä unohtuu.',
        'PELIN NIMI PELAAJALLE ON MATKAKIRJA (omistaja 11.10.2026 klo 22.2x, sitova: "nimen pitäisi olla kaikkialla pelkkä "Matkakirja""): sovelluksen nimi näkyy pelaajalle kaikkialla pelkkänä '
          + 'Matkakirjana ilman "3D":tä (kotinäyttö, App Store Connect ja TestFlight, Macin sovellus, ikkunan otsikko ja valikot), ja testi valvoo sitä.',
        'PELIN MISSIO AI-AIKANA (omistaja 26.8.2026): peli valjastaa tekoälyn nimenomaan LÖYTÄMÄÄN tuon rikkauden ja johdattamaan pelaajat rikastuttamaan omaa elämäänsä eri maiden kulttuureilla, '
          + 'yleistiedolla ja laaja-alaisemmalla ymmärryksellä historian ja politiikan tapahtumista ja niiden vaikutuksista. AI on VASTAVOIMA sisältömoskalle, ei sen lähde.',
      ],
    },
    {
      otsikko: 'Perustuslaki: viisi pilaria',
      tila: 'hyväksytty (siirretty periaatteet.md:stä 15.8.2026)',
      kohdat: [
        'MIKSI: edistämme tietoa maailmasta — elinoloista, kulttuurista, maantieteestä, geopolitiikasta. Väline on koukuttava peli. Pilareita muutetaan vain yhdessä.',
        '1. PELI EDELLÄ: ei oppikirja, johon on liimattu noppa. Sisältö, joka ei ole hauskaa pelata, ei kuulu peliin.',
        '2. TOTUUS JA LÄHTEET: jokainen väittämä tarkistettavissa. Epävarmaa ei väitetä. PR kertoo lähteet.',
        '2b. PAIKKA ENNEN LAJIA: ääni ja kuva kaupungista itsestään, sitten maasta, vasta viimeisenä lajista. Paikkojen ero on osa opetusta.',
        '3. KUNNIOITUS: jokainen maa asukkaidensa silmin. Ei stereotypioita, pilkkaa, säälittelyä eikä pelkkiä turistikliseitä. Geopolitiikka kuvataan, ei tuomita.',
        '4. IKÄSOPIVUUS: vaikeita aiheita ei kaunistella eikä kauhistella. Mitään ei lisätä järkyttämään.',
        '5. AVOIMUUS: vapaat lisenssit, julkiset päätökset, automaattitestit valvovat mitattavan.',
        'Tekniset jatkeet (laudan hyväksyminen, etukäteispuskuri): CONTRIBUTING.md.',
      ],
    },
    {
      otsikko: 'Tarina ja hahmot',
      tila: 'luonnos',
      kohdat: [
        'HORATION INHIMILLINEN EPATAYDELLISYYS JA VUODEN 1873 TODELLISUUS; KAUPUNKIPARIN PITUUS ELAA (omistaja 13.9.2026 klo 09.19-09.21 UTC tekstisession kautta, sanatarkasti: "nama kannattaa myos '
          + 'paivittaa heti raamattuun kun saadaan lyotya lukkoon. isoisassa voi siis olla myos ns. epataydellisia puolia niinkuin meissa kaikissa ja etenkin siina maailmassa missa isoisa eli", '
          + '"hyva, kuulostaa juuri oikealta suunnalta. voit itse kirjoittaa nama tekstit suoraan. menisiko silloin paremmin vai uskotko etta agentti osaisi yhta hyvin?", "ja jos tarina vaatii, niin '
          + 'joissain kaupungeissa yhteispituus voi olla pidempi", "se on jopa parempi etta myos pituudet elavat hieman, niin ei tunnu niin laskelmoidulta.", "pulun iskulauseita voi varioida, jotta '
          + 'eivat toista kaavaa. eli valilla voi vain lukea iskulauseen ja valilla voi pistaa omiaan mukaan jne."): HAHMO: Horatio sailyy lampimana, uteliaana ja kuivan humoristisena, mutta han ei '
          + 'ole virheeton moraalinen esikuva. Han voi olla itsepainen, turhamainen, itseaan puolusteleva, aikansa ja asemansa sokeuttama ja tehda aidosti kyseenalaisen valinnan - ei vain '
          + 'sivullinen, joka huomaa muiden virheet. Epataydellisyys nakyy teossa tai seurauksessa, ei joka merkinnassa. Han kirjoittaa itselleen eika opeta tulevaa lukijaa; katumus tai oivallus ei '
          + 'valttamatta tule saman kappaleen lopussa. KONTEKSTI: historiallinen konteksti tekee valinnan ymmarrettavaksi, ei automaattisesti oikeaksi. Aikalaisilla oli eri nakemyksia, paikalliset '
          + 'voivat tietaa Horatiota paremmin, eika kertojan vinouma ole pelin vaite kokonaisesta kansasta. Yleisinhimillinen epataydellisyys ei ole vain menneisyyden ominaisuus. VAARAT: vaarat ja '
          + 'kovat realiteetit sidotaan oikeaan paikkaan ja vuoteen ja tarkistettuihin faktoihin, ja fiktiivinen kokemus erotetaan todellisista tapahtumista. Muutama vahva kohtaus Eurooppaan, ei '
          + 'koko paketin synkentamista eika pakollista loppuarvoitusta joka kaupunkiin. LIVIA: Livia tuo vaihtuvan nykyhetken nakokulman (oma havainto, muutos oloissa, hammastys, ristiriita tai '
          + 'vakava reaktio), ei jokakaupungin saarnaa eika vakio- oikaisua. Todelliseen karsimykseen ei automaattista pullavitsia, eika kaavaa "ennen paha, nyt kaikki hyvin". EI MUUTU: Grimshawin '
          + 'kilpailija-ei-vaarallinen-kaanon, revityn sivun ratkaisu ja aarteen henkilollisyys pysyvat ennallaan. Rootin 4-6 tekstin pilotti ei ole pysyva kiintio eika hyvaksyttya kaupunkisisaltoa. '
          + 'PITUUS (uusin voittaa): kaupunkiparin pituudet saavat elaa, joissakin kaupungeissa tarina saa lisatilaa, eivatka kaikki kaupungit saa samaa sana-, virke- tai merkkimittaa. Luontevasti '
          + 'lyhyt pysyy lyhyena; kuunneltavuus, merkitys ja rytmi ratkaisevat. Sana- ja merkkimaarat ovat katselmuksen tietoa, eivat ehdottomia rajoja. Tama KUMOAA aiemman "kaupunkikohtainen '
          + 'kokonaispituus ei kasva" -saannon. PAIVITYS 16.9.2026 (omistaja Codexin tekstisessiossa 15.9., Codexin postin mukaan sanatarkasti: "Nyt hyva. Tee kaikkiin ja vie peliin."): '
          + 'SAAPUMISAANET OVAT HORATION YKSIN - isoisa sanoo kaupungin nimen ja nykyisen iskulauseen YHTENA OTTONA, tauko nimen ja iskulauseen valissa aanen omasta rytmista; PULU EI PUHU EIKA NAY '
          + 'saapumisaanessa; ei lisasanoja, ei tunnetageja. 45 Euroopan kaupungin aanet ovat R2:ssa (Codexin manifesti posti/codex-horatio-saapumisaanet-eurooppa-20260915.json, PR #2535). Fable '
          + 'kytkee saapumistraileriin: yksi tiedosto per saapuminen, kertojan luentakytkin ja voimakkuus, iOS-vahvistin, ohitus/navigointi siivoaa soittimen, ei paallekkaisyytta matkakirjaluennan '
          + 'kanssa, loppu ended-tapahtumasta.',
        'PAAHAHMO ON NIMETON PERILLINEN (omistajan paatos 28.8.2026 ilta, inventaarion jalkeen): pelaajan etunimea ja sukupuolta ei koskaan paljasteta - peli on samaistuttava kaikille. Sukunimi FOGG '
          + 'sailyy kehyksena (OSA II -kytkos): pelaaja on Foggin suvun perillinen, UI-nimena pelkka Fogg. Isoisa Horatio ja Grimshaw ennallaan; sydanteema on lapsenlapsen ja isoisan suhde; '
          + 'piikittely osuu isoisaan ja taman aikalaisherroihin, ei koskaan pelaajaan. KUMOAA aiemmat Reginald-maininnat; kaanondokumentit paivitetty samassa erassa. AVAUSKERTOMUS ON SINA-MUODOSSA '
          + '(omistajan kortti 28.8.2026, tasmentaa alkukohtaus V5:n sanamuotoa): kertoja puhuttelee pelaajaa ("Juokset sisalle terminaaliin ja olet varma...") - mies aani on nain yksiselitteisesti '
          + 'ulkopuolinen kertoja eika paahenkilo, eika avausluenta maarita pelaajan sukupuolta. Isoisan 1873-luennat pysyvat mina-muodossa (ne ovat hanen aantaan). AVOINNA: avauksen, Venetsian ja '
          + 'Edinburghin luentojen uusinta (3 kpl, ElevenLabs) omistajan ajoluvalla.',
        'ASETELMA: nuori Fogg perii isoisän matkalaukun — kartta 1872, puntia, passi, päiväkirja 1873. Hän päättää tehdä matkan samassa ajassa: alle 80 päivässä.',
        'MATKAKIRJA on isoisän päiväkirja: ei kirjoitettu kenellekään, ei puhuttele lukijaa. Revitty viimeinen sivu ajaa matkaan — arvoitus EI koskaan ratkea.',
        'HORATIO FOGG (isoisä): laivaston kartanpiirtäjä, erosi 1873. Mittaa kaiken (barometri nyt nuoren Foggin laukussa), pelkää hevosia, ei myrskyjä, kohtelias kaikille (tarkennettu 13.9.2026: '
          + 'ks. kohta HORATION INHIMILLINEN EPATAYDELLISYYS). Persoona välittyy merkinnöistä.',
        'KAKSI ÄÄNTÄ (omistaja 21.9.2026): isoisä 1873 ja Livia-kirjekyyhky nyt. Nuori Fogg on pelaaja: ei koskaan kommentoi eikä havainnoi, ei omia repliikkejä; kaupunkikuvaukset ovat kertojan '
          + 'neutraalia tekstiä. Pöllö on kolmas, nostojen ääni. Huumori syntyy isoisän ja Livian välistä. Isoisä on joskus yhä oikeassa — ei narri. Ivaa paikallisille ei koskaan; piikki isoisään ja '
          + 'tämän aikalaisherroihin.',
        'VASTUSTAJAT: isoisällä Ezekiel Grimshaw (mahtipontinen, aina myöhässä, ei koskaan vaarallinen). Nuorella Foggilla NÄKYMÄTÖN seuraaja: tummansininen sateenvarjo tunnusmerkkinä, ei näyttäydy, '
          + 'ei paljastu koskaan — jää auki kuten revitty sivu.',
        'AARNI: 1800-luvun alun tutkimusmatkailija; luettelossa maailman unohdetut aarteet, yksi per maanosa. Aikalaiset pitivät satuna, isoisä uskoi. EUROOPAN UNOHDETTU AARRE ON KOLME VELJESTÄ '
          + '(omistaja 11.10.2026 klo 21.5x: "vaihdetaan tuohon riipukseen"; korvaa Meripihkahuoneen, joka ei mahdu matkalaukkuun): riipus vuodelta 1389 (Juhana Peloton), kateissa 1640-luvulta; '
          + 'Euroopan pikkuaarre Itämeren meripihka säilyy. MITTASÄÄNTÖ (omistaja 21.5x): unohdettu aarre on yhden ihmisen kannettavissa (Suuren Zimbabwen kivilintu käy). NIMET (Päätoimittaja '
          + '11.10.2026 klo 23.0x): Euroopan aarre on "Kolme veljestä -riipus" ja Riian nähtävyys "Kolme veljestä -talot", jotta ne eivät sekoitu (Sisältökirjuri muuttaa datan). AARNIN LUETTELO '
          + 'ESITELLÄÄN VASTA MYÖHEMMIN (omistaja 21.3x ja 15.10.2026 17.0x): pelin alussa isoisän uni ei mainitse Aarnia eikä luetteloa; luettelo paljastuu, kun Kolme veljestä löytyy '
          + '(ks. Kaupungit, ISOISÄN UNI).',
        'AARREVIHJEET: ei symboleja eikä järjestelmiä — vain harvat sivuhuomiot (muutama per manner) vihjaavat pääaarteen olevan totta. Loksahtavat paikoilleen löydössä.',
        'KAANON: kukaan ei ole odottanut lapsenlasta 150 vuotta, eikä isoisä virittänyt mitään ajan yli. Kirja saa olla arvoitus, koska vanhan päiväkirjan lukeminen on hidasta.',
        'Tekstit: isoisän seikkailut. Tarina avaa kaupungin tunnelman; lehti syventää tiedoksi.',
        'Isoisälle ja Grimshawlle saa luonnostella uusia piirteitä (etikettivirheet, hassu asu) — yhdessä omistajan kanssa.',
        'ISOISÄ ON PIIRTÄJÄ, EI VALOKUVAAJA (25.8.2026): kuvakieli on kirkas — 1873 = isoisän piirros, nykyhetki = valokuva. Matkakirja on nimetön kulunut muistikirja (kannessa ei painettua nimeä). '
          + 'ISOISÄN PIIRROKSET OVAT NOPEITA KYNÄLUONNOKSIA (omistaja 11.10.2026 klo 21.3x ja 22.1x: "piirros on liian hieno. pitäisi olla kynällä luonnosteltu ja vanha paperi pitäisi näkyä '
          + 'pohjalla"): isoisän piirrokset ovat nopeita kynäluonnoksia vanhalla paperilla, joka näkyy pohjalla, eivätkä viimeisteltyjä kaiverruksia; ne ovat samaa mustavalkoista tyyliä kuin luennan '
          + 'muut kuvat, ja reunoilla saa olla vinjetti valkoiseen.',
        'JULISTEOTSIKKO ON VERNEN NIMI + OSA TOINEN (omistaja 26.8.2026): etusivun otsikko on "Maailman ympäri kahdeksassakymmenessä päivässä · OSA II · UNOHDETTU AARRE" (roomalainen numero ja '
          + 'jatko-osan oma alaotsikko 1800-luvun tapaan, omistaja 26.8.2026). Vernen romaani (1873) on public domain eikä lyhyt nimi ylitä teoskynnystä, joten käyttö on vapaata. RAJAT: mistään '
          + 'suojatusta SUOMENNOKSESTA ei lainata tekstiä (kääntäjän oikeudet), eikä mihinkään elokuva-/tv-sovitukseen vihjata. "V2.0" hylättiin — ei istu 1873-typografiaan.',
        'ALKUKOHTAUS V5 (omistajan teksti 25.8.2026; sanamuoto päivitetty 28.8.2026 sinä-muotoon, sanasta sanaan pelissä): paikkarivi "Heathrow, Lontoo, <kuukausi vuosi>:" naputetaan '
          + 'kirjoituskoneella ilman luentaa; sitten kertoja: "Vintiltä löytyi isoisän matkalaukku ja kulunut matkakirja. Juokset sisälle terminaaliin ja olet varma, että ukko oli löytänyt jotain. '
          + 'Mutta kuka on repinyt kirjasta viimeisen sivun?"',
        'VAANIJAKAARI ALKOI (kaanonit 25.8.2026): kaari hengittää — ei joka maassa. Kaaren aarremerkintäosuus (Istanbul, Rooma ja Bukarest) poistettiin 11.10.2026 aarremerkintöjen mukana, ja kaari '
          + 'jatkuu muiden tekstien varassa.',
      ],
    },
    {
      otsikko: 'Kirjoittajan säännöt (matkakirjatekstit)',
      tila: 'luonnos',
      kohdat: [
        'AIHEVALINNAN KYNNYS: NIIN KOVA JUTTU, ETTA HALUAA LUKEA SEURAAVANKIN (omistaja 13.9.2026 tekstisession kautta, sanatarkasti: "Bergen Amsterdam ja Edinburgh pitaa tehda kokonaan uudestaan. '
          + 'Ja niissa pitaa pitaa mielessa tuo uusi periaate, etta pitaa olla niin kova juttu, etta haluaa lukea seuraavankin tai kertoa siita kaverille. Naissa ei sita ollut"): jokaisen '
          + 'kaupunkiparin puheessa on oltava niin kova juttu, etta lukija haluaa lukea seuraavankin tai kertoa siita kaverille. Tarinan keskeinen tapahtuma, panos tai vahva yllatys ja merkitys '
          + 'kerrotaan itse puheessa. Pelkka kuriositeetti tai suloinen lintureaktio ei riita. Tarvittaessa enemman pituutta, ei sanakiintiolla leikattua ydinta. Ei kaikkien kaupunkien vakisin '
          + 'synkentamista eika historian keksimista. Roolirajaus: Bergen, Amsterdam ja Edinburgh uusitaan MOLEMPIEN kertojien osalta (myos Horatio) rootin Astra-tehtavassa; root tarkistaa '
          + 'lahteistetyt aihevalinnat ennen lopullisia puheita; era3-r2:n naita puheita ei kayteta tuotannon lahteena; Lissabon ja Berliini ennallaan (hiljaisuus ei ole hyvaksynta); Fable ei '
          + 'kirjoita rinnakkaista versiota.',
        'LAUSEIDEN YMMARRETTAVYYS (omistaja 13.9.2026 tekstisession kautta, sanatarkasti: "en ihan heti ymmartanyt alpeilla etta opas oli ollut vaarassa. tama lause on epamaarainen: Hanen katensa '
          + 'olivat auenneet koydesta. mutta muuten on hyvaa tekstia. pida vain huoli etta lauseet ovat helposti ymmarrettavissa. tee vain vaikka kaikki loppuun niin luen ne sitten lapi"): vaaran '
          + 'tai kaanteen on avauduttava ensilukemalla; epamaarainen lause korjataan ennen aanitysta. Euroopan 45 kohteen lukuversio luetaan omistajalla kokonaisena; sina aikana ei rinnakkaista '
          + 'kirjoitusta eika aanitysta.',
        'Isoisä loistaa pysyvissä (joet, tuoksut, satamat), vanhentuu nimissä ja tekniikassa. Nuori Fogg ei ole viisaampi — elää vain 150 vuotta myöhemmin.',
        'Seuraaja kaihertaa, ei uhkaa.',
        'Joka kirjoituserässä vähintään yksi aito kommellus. Suoraa itsepilkkaa säästeliäästi.',
        'Motiivibudjetit (barometri, sateenvarjo, aarrevihje…) sovitaan mantereittain ja lasketaan ennen julkaisua. Aistiankkuri ~joka kolmanteen kohteeseen. Aitoja 1873-tositapahtumia ankkureiksi.',
        'Lyhyttä ja konkreettista: sivuhuomiot sivulauseita, ei kryptisyyttä eikä selittelyä.',
        'Faktakuri: ks. Perustuslaki, pilari 2. Luenta = teksti sanasta sanaan.',
        'Uusi teksti aina puhtaalta pöydältä; vanhasta vain raaka-aineet (beatit, faktat, persoonat).',
        'PITUUSBUDJETIT (mrk): saapuminen 280–350 (katto 380), kohtaaminen 180–240 (260), aarreteksti 140–200 (220), kohde yhteensä ≤800 — ääniaika alle minuutin.',
        'KOLME TARKISTUSTA per kohde: tunnistuuko päiväkirjaksi ilman kylttiä; lunastuuko kohtaamisen lupaus aarretekstissä; onko joka yksityiskohdalla merkitys.',
        'SPOILERISÄÄNTÖ: mikään ennen visaa näkyvä ei paljasta visan vastausta.',
      ],
    },
    {
      otsikko: 'Tekstien vetovoima',
      tila: 'luonnos',
      kohdat: [
        'KANTAVAT (usein): kommellus · aikakontrasti (1873 väittää, nyt vastaa) · auki jäävä koukku · aistiankkuri · konkreettinen nimetty ihminen.',
        'MAUSTEET (budjetti mantereittain): yllätysfakta · pienestä suureen · skandaali (ei eläviä yksityishenkilöitä) · historian oikku · arjen hinnat 1873 · nykyhetken kiinne (menneessä muodossa, '
          + 'ettei vanhene) · yllätyskohtaaminen · elokuvallinen avaus · ketju kaupunkien välillä · paikallinen sana · kirjan fyysiset jäljet (ei viritettyjä viestejä) · seuraajan varjo · aarrevihje '
          + '· 80 päivän paine.',
        'KERRONNAN TAVAT: mittaajan persoona · johtolausevariaatiot (9 kaavaa) · henkilö liikkeellä · löytöhetken tunne.',
        'VÄLTETTÄVÄT: mystiset viittaukset, jotka eivät johda mihinkään · "odottanut 150 vuotta" -siirappi.',
      ],
    },
    {
      otsikko: 'Pelin kulku',
      tila: 'luonnos',
      kohdat: [
        'Yksi lauta: koko maailma yhdellä kartalla.',
        'ALKU: tarina alkaa Lontoosta. Ensimmäisen kohteen saa valita kartalta — valinta ratkaisee, minkä mantereen pääaarretta etsitään ensin. Aloituskaupunki valitaan laudan start-merkityistä '
          + 'kaupungeista (aktiivinen lauta maailmankartta; 23.9.2026 tilanne 19 kaupunkia Lontoosta Perthiin; paketin kaupungit[].aloitus on sama lista ja natiivi lukee sen). Vanha beta-rajaus '
          + '"vain Ateena" (25.8.2026) on purettu.',
        'VUORO: matkustustapa (liftaus/bussi/laiva/lento, ks. LIIKKUMINEN) → noppa → siirto. Heitto, laiva tai lento = 6 h matka-aikaa.',
        'MANNERRAJA: uudelle mantereelle vasta pääaarteella tai maksamalla 1000 p (per ylitys). Rajakaupunkiin pääsee.',
        'Kaupungissa fokusmoodin annostelu korvaa vanhan Tutki-napin: saapumisesittely alkaa itsestään, muu aukeaa pelaajan valinnoista (ks. Fokusmoodi). Vapaa vaellus.',
        'LOPPU: seitsemäs pääaarre. Revitty sivu ja seuraaja jäävät auki — perillinen ymmärtää vihdoin isoisäänsä (sydänteeman lunastus).',
        '80 PÄIVÄN PALKINTO: SEITSEMÄN PENINKULMAN LINSSI — vapaa siirtyminen mihin tahansa kaupunkiin ilman noppaa; samalla kaikki linssit auki. Ei ostettavissa. TARKENNUS (Fable 23.9.2026, '
          + 'natiivin toteutus): ehto = seitsemäs pääaarre löydetty päivään 80 mennessä, myöntö huipennuksessa; leima säilyy passissa ja pitää linssit auki myös myöhemmissä peleissä, mutta vapaa '
          + 'siirtyminen (hinta 0, kuluttaa vuoron) koskee vain peliä, jossa se ansaittiin. Tunnus "peninkulma".',
      ],
    },
    {
      otsikko: 'Fokusmoodi',
      tila: 'toteutettu pallolaudalla; historia lokissa',
      kohdat: [
        'FOKUSMOODI ON PELIN OLETUSTILA (omistaja 24.8.2026): tietoa, kysymyksiä ja valintoja niukasti kerrallaan; esitystapa- ja annostelukerros kaiken rakennetun päällä. Kohdekorostus: niukka '
          + 'kartta nostaa yhden kohteen esiin. MOTIVAATIOTEORIA ON PELIN YDIN (28.8.2026, TÄRKEÄ): ei opiskella suoraan "mikä on Makedonia", vaan lähdetään siitä mikä kiinnostaa (mitä siellä '
          + 'syödään, pulla) ja laajennetaan, kun kiinnostus on herännyt; pulla ja pulu kantavat periaatetta maasta toiseen; kirjataan myös READMEen. Loki: '
          + 'docs/raamattu-loki/paatokset-2026-08-24--09-03.md #FOKUSMOODI, #KOHDEKOROSTUS, #MOTIVAATIOTEORIA ON PELIN YDIN.',
        'KULKU KAUPUNGISSA (voimassa 20.9.2026): fokusvirran korttiannostelu (matkakirja-, oppitunti- ja kohtaamiskortit) EI näy missään kaupungissa — FOKUSVIRTA_KORTIT = false (js/fokusvirta.js), '
          + 'koodi säilyy lipun takana eikä sitä käännetä päälle ilman omistajan uutta päätöstä (2.9.2026). Saapumisen kulku, kaupunkilehden korvaaminen kartan nostoilla ja liuskalla: Kaupungit-osio '
          + '(karttauudistus 13.9.2026 alkaen). Syvyysportaat (28.8.2026): täysi pino vain maan pää-/aarrekaupungille; osa kaupungeista tehdään tarkoituksella kevyinä hengähdyskaupunkeina — rytmi '
          + 'syntyy vaihtelusta. Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #FOKUSVIRRAN KORTIT POIS, #KOHDEKAUPUNKI AVAA AINA KAUPUNKILEHDEN, #SYVYYSPORTAAT SAAPUMISIIN.',
        'AARRETEHTÄVÄ: kahden yrityksen sääntö — kohtaamiskortti varmistaa ("Haluatko varmasti tavata … juuri nyt?", "vain kaksi yritystä"), kahden epäonnistumisen jälkeen aarre lukkiutuu, mutta '
          + 'lukko ei jumita peliä: tähti siirtyy ja Matkusta aukeaa (26.8.2026). Pelitehtävän aihe ratkaisee, ei mekaniikka (28.8.2026): aarretehtävä kytketään aina kaupungin tarinaverkkoon — '
          + 'isoisän väittämä tai pulma kylvetään saman kaupungin merkintään ja kohtaaminen lunastaa sen; painotettu arvonta on varapolku; valokuvakysymys taka-alalla. Pullavinkki on ensisijainen ja '
          + 'näkyvin apu, 50:50 hiljainen vara; vinkin voi ostaa pelin punnilla pullana pululle, pullan nimi on maan pullavastine (tsoureki, kozunak, simit), halvempi kuin matkalippu, kerran per '
          + 'aarre (28.8.2026). Pääaarteen paljastus on tumma, ei diplomi: kuvan tumma tausta jatkuu overlayn mustaan, ei kehystä, otsakkeita eikä leimaa (28.8.2026). Löytö näkyy kaupungin merkin '
          + 'värinä: käyty kaupunki on kultainen piste (8.9.2026) — ei aarremerkkiä, tähteä eikä vinoneliötä kartalla. Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #PELITESTIKIERROS '
          + '26.8.2026 (2), #PELITEHTAVAN AIHE RATKAISEE, EI MEKANIIKKA, #PULLAVINKKI AARRETEHTAVASSA, #PAAAARTEEN PALJASTUS ON TUMMA, EI DIPLOMI, #LOYTO NAKYY LAATAN VARINVAIHTONA.',
        'SÄHKETEHTÄVÄ — FLIPPED LEARNING (29.8.2026): vaihtoehtoinen aarteen avaustapa. Pöllö lähettää sähkeen Livialle, Livia antaa tehtävän: ratkaisu on kaivettava maan omista aineistoista '
          + '(lehdet, kohteet, kortit), usein yhdistettävä kaksi asiaa; vastaus rakennetaan valinnoilla, ei vapaatekstillä; sähke kertoo aina minkä tyyppisestä aineistosta ratkaisu löytyy; pulun '
          + 'lento ei lukitse peliä; maassa jossa on sähketehtävä ei ole kohtaamista. Sähke on lyhyt ja kysymys ensin (2.9.2026): enintään viisi riviä (tervehdys, kysymys, "VASTAA KOHDE JA VUOSI", '
          + 'mistä vastaus löytyy, allekirjoitus), Livian saate enintään kolme virkettä. Sähke taitetaan aidolle sähkösanomapaperille rivi kerrallaan kirjoituskoneen äänin ja loppublingillä; pulla '
          + 'pululle 50 p antaa vinkin, 25 p puolikas pulla (3.9.2026). Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #POLLON SAHKETEHTAVA - FLIPPED LEARNING, #SAHKE ON LYHYT JA KYSYMYS '
          + 'ENSIN; docs/raamattu-loki/paatokset-2026-09-03--09-14.md #SAHKETEHTAVA LEHTIMAISEKSI JA PULLA VINKIKSI.',
        'LIVIA (Columba Livia) ON PYSYVÄ HAHMO JA VIISAAN PÖLLÖN SIJAINEN (27.–28.8.2026): kirjekyyhky, "suku on vanhaa roomalaista"; isoäiti lensi Pariisin piirityksen kyyhkypostia 1870–71, setä '
          + 'kantoi kursseja Reuterille. Ääni: aidosti asiantunteva viestinviejä, joka puolustautuu refleksinä — komiikka arvostuksen puutteesta, EI tyhmyydestä; loukkaantuu sanasta pulu mutta antaa '
          + 'heti anteeksi; ei huutomerkkejä. Tuuraa Viisasta Pöllöä, joka on "matkoilla tai toipumassa siipirikosta" ja jota odotetaan hetkenä minä hyvänsä — hetki siirtyy aina; avatar ja '
          + 'tietäjätasot pysyvät pöllöinä. Otsikoissa käsin piirretty vino punainen yliviivaus "Viisas pöllö" → "Pulu" (vaihtuvat arvonimet: Kaupungit-osio 19.9.2026). Perso pullalle ja eri maiden '
          + 'pullavastineille, pröystäilee latinankielisellä nimellään. Annostelu: isot persoonaelementit korkeintaan yksi per vastaus, sivupolut enintään joka 10. vastaus. Loki: '
          + 'docs/raamattu-loki/paatokset-2026-08-24--09-03.md #PULU-KOKEILU, #LIVIA TUURAAJANA, #LIVIA PYSYVAKSI JA PULLA-PERSOUS.',
        'LIVIAN PUHEKIELI — TYYLIMÄÄRITTELY (28.8.2026, TÄRKEÄ): Livia puhuu aina puhekieltä, ei koskaan kirjakieltä. 1) Painopiste reunoilla: loppuheitot ja lyhentymät (mut, siit, sillon, viiskyt) '
          + 'vain tekstin alussa ja lopussa; keskellä rytmi ja arkisanasto säilyvät, mutta sanat kirjoitetaan auki, enintään yksi lyhentymä keskellä tehokeinona. 2) Pronominit kokonaisina: '
          + 'minä/sinä, ei mä/sä. 3) Kevyet täytesanat säästellen, Kaak-ääntely vain aidoissa säikähdyksissä; ei huutomerkkejä. KEHYSMALLI CHATISSA: kun aiheesta kysytään ensimmäistä kertaa, alkuun '
          + 'Livian puhekielinen alustus, sitten vastaus TÄYSIN KIRJAKIELELLÄ kuin pöllö vastaisi, loppuun pieni oma kommentti; jatkokysymykset samasta aiheesta kokonaan pöllön äänellä; uusi aihe '
          + 'palauttaa kehyksen. LIVIAN LISÄYS noin joka 3.–4. faktavastauksen loppuun omana viimeisenä kappaleenaan ILMAN OTSIKKOA (omistajan linjaus 30.8.2026: ei "Livian lisäys:" -etikettiä; 1–3 '
          + 'virkettä pulun näkökulmaa, korvaa loppukommentin) ja KEVYT MAUSTE muutaman sanan kevennyksenä alkuun tai loppuun — fakta ei vääristy. MIETINTÄMUODOT: odotushetkien vaihtelevat '
          + 'puhekieliset repliikit, joista osa vie kysymyksen tarinallisesti pöllölle; sama repliikki ei toistu peräkkäin. Alustus kuuluu kolmiosaiseen vastauskaavaan (PULUN VASTAUSKAAVA 26.9.2026 '
          + 'kumosi 8.9.2026:n "alustukset pois" -linjan). TOTEUTUS: siivottu taustaohje, tools/pollo/worker.js:n JARJESTELMAKEHOTE (omistaja 8.10.2026 klo 23.33: "ota käyttöön mutta voisiko pulun '
          + 'ohjetta parantaa jotenkin?"; PR #4239, käytössä 8.10.2026 klo 23.55; läpikäynti docs/raportit/pulu-taustaohje-lapikaynti-20261008.md): toistot on koottu ja annostelusäännöt ovat yhdessä '
          + 'ANNOSTELU-osiossa, mutta kaava ja säännöt ovat ennallaan. Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #LIVIAN PUHEKIELI - TYYLIMAARITTELY, #LIVIAN KEHYSMALLI CHATISSA, '
          + '#LIVIAN LISAYS JA KEVYT MAUSTE, #LIVIAN MIETINTAMUODOT.',
        'LIVE-TEKOÄLY KAIKILLE, ALLE 18 KURATOITU (omistaja 10.10.2026 klo 08.0x, korttivastaus "live kaikille, kuratoitu alle 18v"; syy: Anthropicin ehdot alaikäisille tarjottavasta '
          + 'live-Claudesta): ennen julkaisua peli kysyy kerran syntymävuoden ja tallentaa vain tiedon aikuinen kyllä/ei. IKÄKYSELYN MYÖHEMPI VASTAUS (Päätoimittaja 10.10.2026 klo 11.5x N-UI:n '
          + 'suosituksesta; junassa 177): jos pelaaja valitsee "Ei nyt", ikärajan voi asettaa myöhemmin Asetuksista (Muut-osion rivi "Ikäraja: <tila>" avaa saman ikäkortin); peli ei itse kysy '
          + 'uudelleen ("kysyy kerran" säilyy), ja annettu vastaus vaihtuu Asetuksista vain tiukempaan suuntaan (aikuinen → alle 18, ei toisin päin); kehityskomento nollaa. Aikuisille live-kysyminen '
          + 'toimii kuten nyt. Alle 18-vuotiaille ja tuntemattomalle iälle live on kuratoitu: vain pelin paikat ja aiheet ikätasolle sopivasti (oma järjestelmäkehote), kysymysten ja vastausten '
          + 'suodatus (estetty → ystävällinen ohjaus valmiisiin vastauksiin), väärinkäytösten seuranta ilman henkilötietoja ja Ilmoita ongelmasta -mahdollisuus. Kuratoidussa livessä pelin '
          + 'ulkopuoliset ajankohtaisaiheet (urheilutulokset, julkkikset, uutiset, viihde) ohjataan ystävällisesti pelin paikkoihin; urheilu kaupungin historiana tai nähtävyytenä on sallittu '
          + '(Päätoimittaja 11.10.2026). Kaikille näkyy merkintä "Vastaukset tuottaa tekoäly (Claude)". Tietosuojaseloste kertoo chatin tietojen käsittelyn, pelissä on lyhyt ohje tekoälyn '
          + 'turvallisesta käytöstä, ja julkinen lausunto kertoo suojauksista. Worker valvoo tilaa (vanhoja appeja ei rikota), ja sama koskee webiä. ULKOINEN TESTFLIGHT AUKI (omistaja 11.10.2026 klo '
          + '09.5x, kortti "Kyllä, junasta 181 alkaen (suositus)"; testaajille oma linkki, sama versio kummallekin; kumoaa 10.10. eston, koska ikäkysely ja kuratoitu live ovat pelissä): junasta 181 '
          + 'alkaen jokainen PASS-build menee sisäisen ryhmän rinnalla Applen beta-arvioon ja samana versiona kahdelle ulkoiselle ryhmälle: Arvioijat (apurahahakemuksen raati, julkinen linkki '
          + 'https://testflight.apple.com/join/KxKekB4n) ja Beta-testaajat (testaajien oma linkki https://testflight.apple.com/join/BBAT7tBm), kummassakin raja 100; Mitä testata -teksti tulee junan '
          + 'muutoslokista. Julkaisijan ASC-seuranta kirjaa ryhmien asentaneet testaajat tiedostoon julkaisija-tyokalut/asc-testaajat.json neljästi päivässä (9.07, 13.07, 17.07 ja 21.07); Postivahti '
          + 'lukee sen ja lähettää Päätoimittajalle rivin RAATI: +N (omistaja 10.1x), ja Päätoimittaja kertoo omistajalle, kun raadista ladataan peli; Asemataululla laatat Raati ja Testaajat. Peli '
          + 'on 13 vuotta täyttäneille ja aikuisille.',
        'PULU-CHAT YHTENÄINEN (omistaja 5.10.2026 klo 16.4x, sitova): PULU ESIGENEROITUNA (omistaja 9.10.2026 klo 11.4x–11.5x, korvaa 5.10. linjan "ei valmiita vastauksia"; loki): peruspelin Pulu '
          + 'vastaa etukäteen generoiduilla vastauksilla — valmiit kysymykset (tavoite vähintään 5 kohtaa kohden; näkyvissä 2, loput vierittämällä), niiden vastaukset sekä vastausten alleviivattujen '
          + 'linkkien ja jatkokysymysten vastaukset generoidaan valmiiksi ja tallennetaan (ehdotus: ämpäripaketti maittain), joten peruspeli ei käytä API-krediittejä; vapaa kysyminen on myöhemmin '
          + 'maksullinen lisäosa, joka käyttää API:a. Generoinnin määrä ja syvyys omistajan luvalla. ENSIMMÄINEN ERÄ (omistaja 9.10.2026 klo 12.2x kortti ja 13.3x–13.4x: "low-tasohan näyttää '
          + 'paremmalta kuin ilman asetusta. Se on nopein ja vie vähiten kredittejä" ja "Pilvikredittejä on 250 dollaria jäljellä, niin käytä ennemmin niitä ensin"): 5 kysymystä ja 1 linkkitaso, '
          + 'mallin ajattelutaso low, ensin koko Ranska ja Sisältökirjurin pistokoe 30 vastauksesta ennen ämpäriä; ajo käyttää ensin tilin ilmaiset pilvikrediitit ja sitten viikkokiintiötä, ja muut '
          + 'maat aloitetaan vasta, kun Ranskan kesto ja kulutus on kerrottu omistajalle. Live-Pulu pysyy pelaajilla käytössä maissa, joille paketti puuttuu, kunnes koko Euroopan paketit ovat '
          + 'valmiit (Päätoimittaja 9.10.2026); luentaäänet vasta, kun Pulun ääni on valittu. Jokaisen vastauksen perään tulee aina tasan kaksi uutta jatkokysymystä syöttörivin yläpuolelle, eivätkä '
          + 'vanhat kysymykset jää pinoon vastauksen alle. Chat toimii täsmälleen samoin kaikkialla pelissä ulkoasua ja nappeja myöten; vain värit saavat vaihdella linssin mukaan. Uusi paikka '
          + 'aloittaa puhtaan keskustelun. Pulun kaiutin on aina joko Auto- tai ei luentaa -tilassa, ja jälkimmäisen merkki on kaiutin ja yksi vino viiva. Pulun äänen päiväkatto on 15 000 merkkiä '
          + 'vuorokaudessa, ja ylityksessä vastaus tulee tekstinä ilman ääntä; kehittäjäkoodilla kattoa ei ole. Astronauttikuvissa chatin konteksti ja valmiit kysymykset vaihtuvat näytöllä olevan '
          + 'kuvan mukaan: worker tekee kuvalle kolme enintään kuuden sanan kokonaista kysymystä kerran ensimmäisellä katselulla ja tallentaa ne kuvan tunnuksella (omistaja 6.10.2026 klo 00.1x).',
        'PULUN VASTAUSKAAVA (omistaja 26.9.2026 klo 23.4x, sitova): Pulun (Livian) chat-vastaus on kolmiosainen — se alkaa Pulun omalla tyylillä, jatkuu luontevasti asiantuntevaan sävyyn ja palaa '
          + 'lopuksi pulumaiseen yhteenvetoon. Omistaja pitää tästä erittäin paljon: malli ja kehote kiinnitetään, ja kaavaa muutetaan vain omistajan luvalla. Kaikki vastaukset syntyvät '
          + 'live-mallilla (ks. PULU-CHAT YHTENÄINEN).',
        'LIVIA ISOISÄN MERKINNÄN KOMMENTAATTORINA — PARIPERIAATE (28.8.2026): reaktio suunnitellaan aina parina isoisän kertomuksen kanssa. Hurja tai synkkä merkintä (Sofian hirttokertomus) → Livia '
          + 'ei naljaile isoisälle vaan toimii välittäjänä aikasiirtymän kohdalla: avaa historiakontekstia (150 vuotta sitten, maailma toisenlainen) ja pehmentää; kevyt tai arkinen merkintä → '
          + 'naljailu, pulla, sukutarina. Jälkikommentti: yksi kupla per saapuminen, maadoitus, kansallisherkku, sukutarina tai mitä on tapahtunut 1873:n ja nykyhetken välissä; siksi isoisän '
          + 'merkinnät pidetään lyhyinä (kuplan mitta ja sapluuna: Viisas Pöllö -osio 8.9.2026). Livian avausesittely aloitusvalinnassa on kaanonia: neljä kuplaa (hiessä / minä olen Livia ja kannoin '
          + 'sähkeet / valitse rauhassa mistä aloitat / perillä odottaa Viisas Pöllö, minä olen vain viestinviejä), kerran per laite, kuplat eivät estä valintaa; beta-rajoitus kerrotaan tarinan '
          + 'sisällä ilman sanaa "beta" (29.8.2026). Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #LIVIA AIKASIIRTYMAN VALITTAJANA - PARIPERIAATE, #LIVIA JALKIKOMMENTAATTORINA, #LIVIAN '
          + 'AVAUSESITTELY.',
        'REAKTIOJÄRJESTELMÄ (28.8.2026, koko suunnitelma käytössä): viisi kaiverrettua symbolia — laakeriseppele (Hieno), sydän (Ihana), suurennuslasi (Mielenkiintoinen), tiimalasi (Tylsä), '
          + 'mustetahra (Virhe) — rivi jokaisessa sisällössä (lehtijutut, kohdekortit, nähtävyydet, ihmeet) ja lehtien väliotsikoissa; lepotila yksi himmeä nappi (voittajasymboli + määrä), napautus '
          + 'levittää viisi. Laskurit jaettuja: ehdotuskanavan worker säilöö äänet R2:een (reaktiot/-etuliite, ei laitetunnistetta eikä IP:tä), 1 ääni/laite/kohde (localStorage), vaihdettavissa ja '
          + 'peruttavissa. Vain mustetahra kysyy vapaatekstin ja lähettää sen Lukijoilta-lehdelle; tahran jälkeen Livian nolo kiitos. Työhuoneessa Reaktiot- ja Virheilmoitukset-sivut. Loki: '
          + 'docs/raamattu-loki/paatokset-2026-08-24--09-03.md #REAKTIOJARJESTELMA.',
        'YHTENÄINEN KOHDEMALLI — KAIKKI KARTAN NOSTOT OVAT SAMAA LAJIA (28.–29.8.2026): fokuskohteet, täkynostot, eläintäkyt, syvennystarinat ja skandaalit ovat yhtä lajia KOHDE: karttapiste, josta '
          + 'aukeaa sama yhtenäinen kortti; erot ovat dataa — sisällön laajuus (pieni fakta / tarina+kuva / tarina+visa), palkkio ja aihesymboli. Täkymekaniikasta (tuikkiva piste, yksi kerrallaan '
          + '-pooli, valinta-askel) on luovuttu; löytäminen tapahtuu selitevalikon aihevaloilla. Kaikki nostot rakennetaan samalle tasolle kuin Sofian areenapilotti: generoitu havainnekuva '
          + 'pääkuvana, nykytilan valokuva CC-riveineen, lunastus kappaleina, 2–3 pulu-kysymystä, kohdenappi vain aidolle kohteelle. Nostokortilla on ingressin lisäksi täysi teksti (3–4 kappaletta, '
          + 'n. 160–240 sanaa, päivätty lähderivi) — pelkkä ingressi + visa on tynkä; kuvat listana: generoitu havainnekuva ensin, sitten Commonsin aikalaiskuvat ja valokuvat lisensseineen '
          + '(2.9.2026). Nostojen määrä vaihtelee maittain sisältörikkauden mukaan (pieni maa 1–2, keskitaso 2–3, rikkaat 4–6), ei kiintiöllä (29.8.2026). Maastokohteet (tärkeimmät vuoret, meret, '
          + 'joet) avattaviksi kohteiksi jokaisessa pelimaassa, datavetoisesti (29.8.2026). Skandaalit: 2–3 aikakauteen sopivaa skandaalia, kohua tai huijausta per pelimaa todellisiin paikkoihin '
          + 'ankkuroituina; historiallista ja opettavaa, ei nykyihmisten yksityisasioita eikä verellä maustamista, 13+ (30.8.2026). Nostojen sijoittelu ja sisältö pallolla: Kaupungit-osio. Loki: '
          + 'docs/raamattu-loki/paatokset-2026-08-24--09-03.md #YHTENAINEN KOHDEMALLI - TAKYMEKANIIKASTA LUOVUTAAN, #KAIKKI NOSTOT OVAT TAKYJA - YKSI PERUSLOGIIKKA JA TASO, #NOSTOKORTIN KUVAT JA '
          + 'TEKSTI, #NOSTOJEN MAARA VAIHTELEE MAITTAIN, #MAASTOKOHTEET KAIKKIIN MAIHIN, #SKANDAALIT-KATEGORIAN SISALTO, #SAAPUMISKULUN KOLME TASMENNYSTA.',
        'KARTTASELITEVALIKKO, AIHEVALOT JA KAHDEKSAN PÄÄKATEGORIAA (29.8.2026): kartan oikean yläkulman popup-valikko listaa karttaselitteet; rivin väripallo sytyttää staattisen valotäplän (ei '
          + 'sykkivän) kaikkiin aiheen kohteisiin, valot pysyvät kunnes sammutetaan, useita yhtä aikaa, OFF- ja ALL-napit, tila talletetaan laitteelle; päälle kytketyn aiheen pallo syttyy myös '
          + 'valikon rivillä. Pääkategoriat: Kaupungit (portti), Nähtävyydet (silmä), Kadonneet ihmeet (tähti), Luonto (lehvä — myös vuoret, meret, joet), Eläimet (pöllö), Historia ja tarinat '
          + '(pylväs), Kulttuuri ja ruoka (lyyra), Kauppa ja tekniikka (vaaka); yhdeksäs rivi TIIMALASI = historian hetket (2.9.2026). Merkkien ja korttien tarkat symbolit (12 kategorian '
          + 'symbolitaksonomia 26.8.2026: huutomerkki, pöllönpoikanen, silmä, murtunut pylväs, vuorenhuippu ja aalto, höyryävä malja, lyyra, hammasratas, vaaka, sulkakynä, ankkuri, laakeriseppele) '
          + 'säilyvät datassa; valikko ryhmittelee mapping-taululla. Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #KARTTASELITEVALIKKO JA AIHEVALOT, #KAHDEKSAN PAAKATEGORIAA, #HISTORIAN '
          + 'HETKET KARTALLA JA LEHDESSA, #SYMBOLITAKSONOMIA.',
        'KARTTAMERKIT JA NIMIÖT (27.8.–3.9.2026, voimassa myös pallolla): merkit minimalistisia viivamerkkejä kartan musteella, generoitu mustepiirrosglyyfi vain kortin ylärivillä (27.8.); kartalla '
          + 'nostomerkki on kategorian värinen kiekko ohuessa mustereunassa ja MUOTO säilyy vain viidellä: vuori (kolmio), vesi (aallot), skandaali (salama — yksi veto, erottuu pienimmässäkin '
          + 'koossa; tunnus `huuto` säilyy datassa), eläintäky (tassu), Matkakirjan ihme (kompassiruusu) (2.–3.9.); jokainen näkyvä karttamerkki on nimetty ja napautettava, myös maastonimet ja '
          + 'kolmiot; vartio on koneellinen (tools/tarkista-karttamerkit.mjs julkaisuportissa) (2.9.); piste vain nimen kanssa — merkki on nimen ankkuri ja piirtyy tasan kun nimi piirtyy, maastopari '
          + 'kelpaa nimeksi (31.8.); noston teksti on kokonaan napautettava (1.9.); nimiölle neljä kylkeä, pudotus vain todelliseen törmäykseen (1.9.); poltetut nimiöt eivät limity — maat ladotaan '
          + 'maatunnusjärjestyksessä esteineen (3.9.); noston ruutukatto = kohdekaupungin merkki+nimi, ladontasäännön versio on tiivisteen syöte ja vanhalla säännöllä poltettu nostotaso piilotetaan '
          + '(1.9.); kaikki merkkiperheet yhdessä mitassa, symboli/nimi 13/11 (2.9.); siirretyn noston katkoviiva merkin reunasta ankkuriin, 0,9 px, himmeys 0,55 — viiva on merkin jatke (2.9.); '
          + 'kaupungin piste on karttavakio, nimet ruutumitassa (31.8.); pääkaupunki 1800-luvun atlaskonventiolla: kaksoisrengas + harvennettu kapiteeli (31.8.); läheltä näkyvä maastonimi on '
          + 'kohdenimiön asua, nauha on kuvan osa, kortti ei aukea reunaan (3.9.); pallolla kaupungin nimi on ensisijainen ja nostojen laput väistävät (7.9.2026, Viisas Pöllö -osio). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-08-24--09-03.md #KARTTAMERKIT MINIMALISTISIKSI, #KARTALLA NOSTOMERKKI ON PISTE, #SKANDAALIN MERKKI ON SALAMA, #JOKAINEN NAKYVA KARTTAMERKKI ON NIMETTY '
          + 'JA NAPAUTETTAVA, #PISTE VAIN NIMEN KANSSA, #NOSTON TEKSTI ON KOKONAAN NAPAUTETTAVA, #NIMIOLLE NELJA KYLKEA, #KARTTANIMIOT EIVAT LIMITY, #NOSTON RUUTUKATTO, #KARTAN MERKKIPERHEET YHDESSA '
          + 'MITASSA, #NOSTOJEN SIIRTOVIIVAT, #KAUPUNGIN PISTE ON KARTTAVAKIO, #PAAKAUPUNKI AIKAKAUDEN TAPAAN, #KOLME KARTTAKORJAUSTA 3.9.2026, #KLIKATTAVUUSLINJAN VARTIO.',
        'LAATTAPYRAMIDI — KARTAN ARKKITEHTUURI (29.–31.8.2026, SITOVA; 5.9.2026 alkaen pallon pintana, ks. Viisas Pöllö -osio): kaikki pysyvä — topografia, joet, nimet, kohteet, reitit — poltetaan '
          + 'ämpäriin esirenderöityyn laattapyramidiin Actions-ajossa; selain lataa vain näkyvät laatat; eläväksi jää vain se, mikä vaihtuu pelin edetessä (valot, nappula, vuororengas, nykyisen '
          + 'kaupungin korostus, napautusalueet). YKSI maailmanlaajuinen pyramidi, ei maakohtaisia bittikarttoja; maalehdet, erillislauta ja vanha piirretty maailmankartta poistuivat pelaajalta '
          + '(25.8., 30.8.). KOLME TASOA samalla ruudukolla: POHJA (topografia, meri, joet; rantaviiva omalla rantatasolla), NOSTOTASO omana läpinäkyvänä pyramidina z5–z7 (poltetaan '
          + '--ilman-hahmotelmia, hahmotelmanostot elävinä pisteinä; tyhjiä laattoja ei generoida, luettelo kertoo mitkä ovat olemassa) ja VIIVATASO z0–z7 (reitit, askelhelmet, lentoreitit, '
          + 'erikoispiirit, maiden nykyrajat NE admin-0). Sisältöpäivitys = pyramidin uudelleenajo; pohja-, nosto-, viiva- ja paikkausajot ilman erillistä lupaa (1.9.2026). JULKAISUJÄRJESTYS '
          + '(20.9.2026): pohjan TAI viivatason versionvaihto vaatii aina pallosarjan polton perässä; luettelo viedään ämpärin juureen vasta kun pallosarja on ämpärissä; luettelo → CI → merge, ei '
          + 'toisinpäin; polttoskriptin ajo ei peri generaattorin lippuja — shardirivit tarkistetaan ennen globaalia ajoa; vanhoja pyramidikansioita ei poisteta ajossa. Ei eläviä animaatioita '
          + 'siirtymien aikana; nipistys päättyy siihen mittakaavaan mihin sormet jäivät (30.8.). Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #BITTIKARTTAKARTTA - KARTAN ARKKITEHTUURI, '
          + '#LAATTAPYRAMIDI JA KARTAN PATINA, #YKSI MAAILMANBITTIKARTTA - MAALEHDISTA LUOVUTAAN, #ERILLISLAUDASTA LUOVUTAAN, #VANHA KARTTA KOKONAAN POIS PELISTÄ TOISTAISEKSI, #KARTTANOSTOT '
          + 'POLTETAAN LAATTOIHIN, #NOSTOTASO - NOSTOT OMALLE LAPINAKYVALLE LAATTATASOLLE, #VIIVATASO - REITIT, ERIKOISPIIRIT JA MAIDEN RAJAT OMALLE LAPINAKYVALLE TASOLLE, #PYRAMIDIAJOT ILMAN '
          + 'ERILLISTA LUPAA, #NIPISTYS EI ENAA NAPSAHDA PORTAIKKOON; docs/raamattu-loki/paatokset-2026-09-13--09-20.md #MAAT ILMAN PELIKAUPUNKIA SAAVAT PELIKAUPUNGIN.',
        'KARTAN TYYLI JA DATA: 1873-atlaksen akvarellityyli, patina poltettu laattoihin — viivat tummanruskeita, valkoinen kermaksi, lumppupaperin syy ja ikääntymissävy, akvarellin reunakertymä '
          + '(29.8.); PAPERIVAKIOT (rae, syy, musteen leviäminen, kohdistusheitto, viivojen rosoisuus) mitoitetaan laitepikseleinä ja KARTTAVAKIOT (rannikko, hypsometria, varjostus) kartan '
          + 'mittakaavassa — sama koskee nimiöitä, pisteitä ja viivoja (30.8.); korkeusdata ETOPO1 1 kaariminuutin tarkkuudella (1.9.2026, kumoaa 3 kaariminuutin ruudukon); ikilumi alkaa 5500 '
          + 'metristä, järvillä peittävä rannikkovesisävy (31.8.); meren syvyysporrastus kaksinkertaistettu monotonisella kuutiokäyrällä, matalan meren porras loivin (30.8.); geneerinen '
          + 'vesiviivoitus pois kunnes se on oikeaa syvyysdataa (30.8.); naapurimaiden tummennus purettu, jäljellä vain nykyisen maan vahvistettu rajaviiva (2.9.; kohdemaan korostus ja '
          + 'tasoituskerma: Kaupungit-osio); erikoispiirit (päiväntasaaja, kääntöpiirit, pohjoinen napapiiri, Greenwich) hentona piste-viivana kursiivinimin, päivämäärärajaa EI piirretä — sitä ei '
          + 'ollut 1873 (26.8.); kartta on sisällöltään nykyaikainen, tyyliltään aikakauden. Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #LAATTAPYRAMIDI JA KARTAN PATINA, #PAPERIVAKIOT '
          + 'JA KARTTAVAKIOT, #KORKEUSDATA 3 KAARIMINUUTTIA, ASTEIKKO 8850 METRIIN, #IKILUMI 5500 METRIIN JA JARVILLE VESISAVY, #MEREN SYVYYSPORRASTUS KAKSINKERTAISTETAAN, #VESIVIIVOITUS POIS KUNNES '
          + 'SE ON OIKEAA DATAA, #MAATUMMENNUS ON PURETTU, #ASTEVERKKOERÄ, #FOKUSNAPIT.',
        'REITIT JA SIIRROT: reitit lautapelityyliin — paksumpi harvempi katkoviiva, pyöreät päät, deterministinen käsivarahuojunta, meren katko tiheämpi; pysyvä sääntö: katkon on pysyttävä yli '
          + '1,5-kertaisena helmen leveyteen, testi vartioi (1.–2.9.2026). Noppa ja reittien viivat/pisteet säilyvät (24.8.). Matka jatkuu itsestään kaupunkiin asti: askelpisteessä seuraava heitto '
          + 'laukeaa 750 ms siirtoanimaation jälkeen, suunnan valinta jää pelaajalle, jokainen heitto kuluttaa vuoron (2.9.; bussi, liftaus ja laiva: Kaupungit-osio). Matkusta ja kulkumuodon valinta '
          + 'eivät liikuta kameraa; heiton jälkeen sovitus nappulaan ja kaikkiin vaihtoehtoihin (720 ms, marginaali 14 %), lennossa sovitus lentokohteisiin heti (2.9.). Siirron koreografia: '
          + 'ennakkozoomi → kamera-ajo trapetsiprofiililla → nappula lähtee 300 ms kameran jälkeen ja saapuu 280 ms ennen kameraa; kamera-ajot pehmeästi peräkkäin, uusi ajo alkaa kesken olevan '
          + 'nykyisestä kehyksestä ja kesto sovitetaan liikkeeseen (2.–3.9.; hyppyjen lähizoomi ja nappulan kulku joka pisteen läpi: Kaupungit-osio). Siirtymämusiikkia ei soi kartalla (KARTAN '
          + 'MUSIIKKI 10.10.2026, Viisas Pöllö -osio). Avauslento valmiiksi ladattuna: laatat ja nimikerros piirretään ennen lentoa, lennossa vain Lontoon ja kohteen nimet, kertojan luenta kuuluu '
          + '(3.9.). Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #REITIT LAUTAPELITYYLIIN, #NOPPA JA REITIT, #MATKA JATKUU ITSESTAAN KAUPUNKIIN ASTI, #MATKUSTA-KAMERA, #SIIRRON '
          + 'KOREOGRAFIA JA SIIRTYMAMUSIIKKI, #KAMERA-AJOT PEHMEASTI PERAKKAIN ENNEN NAPPULAN LAHTOA, #NOPANHEITON KAMERA: ZOOMI ENSIN, NAPPULA VASTA SITTEN, #JALANKULKUMUSIIKKI RYTMIKKAAKSI JA SOI '
          + 'NOPANHEITTOJEN YLI, #AVAUSLENTO VALMIIKSI LADATTUNA.',
        'KAMERA JA NAPPULA: peli siirtää karttaa itse (kamera-ajot) (24.8.); panorointi rajataan kohdemaan ympärille (KARTTAUUDISTUKSEN PAATOKSET 6, Kaupungit-osio), kehittäjän maailmatilassa '
          + 'vapaasti. Pulu näyttää paikan: kun pelaaja kysyy pululta paikkaa, kamera lentää sinne pehmeästi ja paluunappi vie takaisin (6.9.; lento vain sijaintikysymyksistä 11.9., Viisas Pöllö '
          + '-osio). Pelinappula on mahdollisimman yksinkertainen klassinen lautapelinappula, lämmin valkoinen ohuella ääriviivalla; tinaherra kytkimen NAPPULA_TYYLI takana (27.8.). Uloin zoomi '
          + 'näyttää koko laudan kerran ja ympärille jää samaa pergamentin pohjaa (2.9.; pallolla kohdemaan zoomikatto: Kaupungit-osio). Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md '
          + '#KAMERA PELIN KÄSISSÄ, #PELINAPPULA VALKOISEKSI, #ULOIN ZOOMI NAYTTAA KOKO LAUDAN, LAUTA KERRAN, PAPERIA YMPARILLE.',
        'HAVAINNEKUVA-SANA (omistaja 27.9.2026 klo 13.4x, sitova): kaikista generoiduista (tekoälyllä tehdyistä) kuvista käytetään pelissä, lehdissä, kuvateksteissä, tekijä- ja lähdetiedoissa, '
          + 'projektisivustolla ja raporteissa sanaa HAVAINNEKUVA — ei "kuvitus", "AI-kuva", "generoitu kuva" tai "tekoälykuva".',
        'KUVAT — TYYLI JA TUOTANTO: kaikki generoidut kuvat (kohtaamiset, hetket, ennen/nyt, nostot, eläintäkyt, aarteet, ihmeet, kannet, kuvitukset) fotorealistisia valokuvia, ei piirroksia eikä '
          + 'maalauksia; poikkeus miniatyyrit; piirrosmainen tulos on hylkäysperuste (28.8., 2.9.). Sama koskee Codexin havainnekuvia ja historiallisia hetkiä (omistaja 7.10.2026 klo 13.2x, kortti '
          + '"Kaikki fotorealistisina"; myös Olavinlinna 1499, Kielletty kaupunki 1923 ja Giza): jokaisessa kuvatekstissä ja metatiedoissa on merkintä havainnekuva, kartan nähtävyysminiatyyrit '
          + 'pysyvät nykyisen akvarellisarjan tyylissä (käyttöliittymän kuvakkeita), mutta matkalaukun varustekuvat (assets/varusteet/: linssien ja pelien minikuva listassa ja iso kuva ennen '
          + 'aktivointia) tehdään fotorealistisina (omistaja 9.10.2026 klo 12.0x kolmen tyylin vertailun jälkeen: "tee mini ja iso kumpikin fotona"; korvaa saman päivän klo 08.4x akvarellilinjan), '
          + 'ja Codexilta tilataan mahdollisimman paljon, koska sillä on käyttämättömiä krediittejä (13.1x). Kaksi kastia: generoidut kuvat tunnelmaan, pulmiin ja hahmoihin; faktatehtävissä ja '
          + 'valokuvakysymyksissä aina aito tarkistettu valokuva. Loistoaikakuvat puhtaasti omassa ajassaan — aikasiirtymän hoitaa kortin kuvapari (loistoaika + aito nykyvalokuva), ei yksi kuva '
          + '(29.8.); aikasarjaihmeet (sama kaupunki eri vuosisatoina) samalla säännöllä (30.8., idea). Herokuvien rajaus tiukka: naapurirakennukset vain reunoilla ja niiden sijoittelu saa poiketa, '
          + 'rakennus itse ratkaisee (27.8.). Kohtaamisilla ON kuvat (kuvaputki, 12.9.2026) ja omistaja arvioi kohtaamiskuvat itse (5.9.); kaanonia ei muuteta kuvan takia ali-agentin päätöksellä, '
          + 'vain omistajan (12.9., Viisas Pöllö -osio). Kuvaputken kuvatyypit ovat omia kategorioita ja jokainen tilaus nimeää kategorian otsikossa; tilaukset ja kuittaukset postilaatikon kautta, '
          + 'R2-polku kohtaamiset/<kategoria>/ (2.9.); Fable tilaa ja hyväksyy kuvaputken kuvat omistajan puolesta, kohtaamiskuvat (henkilöt) jäävät omistajan arviointiin (5.9.); omistajan pelistä '
          + 'antamat kuvapyynnöt aina kiireellisinä (3.9.). Havainnekuvan selitelinkki kaikkialla lähderivillä (js/havainnekuva.js) (2.9.); lähde ja havainnekuvamerkintä näkyvät vain suurennoksessa '
          + '(19.9., Kaupungit-osio). Ihmenauha: vino tasainen kaista, joka leikkautuu kuvan reunaan, juhlava antiikva harvennettuna (27.8.). Ihmeselitteissä myös kohteen koko lähteistä ja kevyt '
          + 'isoisän mittausviittaus, jos kohde oli olemassa 1873 (28.8.). Isoisän karttaliite: 1800-luvun kaiverrettu käsinväritetty kartta aarrekortin, kohtaamisen tai noston kylkeen — '
          + 'ensisijaisesti aito PD-aikalaiskartta Commonsista; roolijako: valokuva = nykyhetki, loistoaikakuva = mennyt elävänä, kaiverruskartta = paikka kuten isoisä sen tunsi (29.8.). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-08-24--09-03.md #KUVAGENEROINNIN TYYLILINJA, #KAIKKI GENEROIDUT KUVAT MAHDOLLISIMMAN VALOKUVAMAISIA, #LOISTOAIKAKUVAT PUHTAASTI OMASSA AJASSAAN, '
          + '#KAUPUNKINAKYMA ERI AIKOINA - AIKASARJAIHMEET, #HEROKUVIEN RAJAUS, #KOHTAAMISET ILMAN KUVAA TOISTAISEKSI, #KUVAPUTKEN KUVATYYPIT, #HAVAINNEKUVAN SELITELINKKI KAIKKIALLA, #IHMENAUHAN '
          + 'LOPULLINEN MALLI, #IHMEIDEN MITTAKAAVA JA ISOISAN MITTAUKSET, #ISOISAN KARTTALIITE; docs/raamattu-loki/paatokset-2026-09-03--09-14.md #FABLE HYVAKSYY KUVAPUTKEN KUVAT OMISTAJAN '
          + 'PUOLESTA, #KUVAPUTKEN PYYNNOT AINA KIIREELLISINA.',
        'HISTORIAN HETKET JA HETKIEN TEKSTIT (2.9.2026): historian hetki = katsoja on paikalla sillä sekunnilla, kun jotain tapahtuu. Kaksi kuvakulmaa per kohtaus: pääkuva lähikuva 1–3 ihmisestä '
          + 'silmien korkeudella tapahtuma taustalla, toinen kaukokuva mittakaavoineen. Sijoitus: jos tapahtumapaikka ei ole kohdekaupunki, hetki on oma nostolaji kartalla JA sama kuva+teksti '
          + 'lehdessä omalla sivullaan; kohdekaupungissa tai sen vieressä vain lehteen (kaupunkilehti jos on, muuten maalehden Historia); kaukana kaupungeista oleva hetki on pakko olla myös '
          + 'kartalla, kartalle päässeellä minivisa. Tekstit ihminen edellä, maailma vastapainona: hetken teksti ja kuvateksti alkavat siitä, mitä kuvan ihminen kokee, pelkää tai ajattelee, suuri '
          + 'kaari lyhyesti sen jälkeen; keksitty minitarina sallittu uskottavana ja merkittynä ("ehkä", "kerrotaan"), faktarivi erillään; rakenne vaihtelee. Loki: '
          + 'docs/raamattu-loki/paatokset-2026-08-24--09-03.md #HISTORIAN HETKET JA ENNEN/NYT - KAKSI HAVAINNEKUVASARJAA, #HISTORIAN HETKET KARTALLA JA LEHDESSA, #HETKIEN TEKSTIT: IHMINEN EDELLA, '
          + 'MAAILMA VASTAPAINONA.',
        'SKANDAALINOSTO ON LISÄLEHTI (3.9.2026): skandaalinoston kortti taitetaan lehdeksi — nimiö "Lisälehti" (1800-luvun tapa myydä skandaali numeron välissä; "looppi" hylätty 1900-luvun sanana), '
          + 'päiväysrivi kaksoisviivoin, pääotsikko isolla, ingressi, kuva kuvatekstein, leipäteksti anfangilla ja leveällä ruudulla kahdessa palstassa; hieman keltaisempi pohja ja kaupunkilehteä '
          + 'pienempi koko, jottei sekoitu siihen. Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md #SKANDAALINOSTON LOOPPITAITTO.',
        'EI ENÄÄ VOIMASSA (historia lokissa): kevyt kulku -kokeilu ja lehtitehtävät, täkyannostelu ja tuikkiva piste, fokusnapit ja kartuutsi, jatkuva tasokartta ja maalehdet, saapumissekvenssi '
          + '26.8., pelitestikierrosten mitat, bittikartan välivaiheet ja kuoren rasterointi, maatummennus, kaupunkilaatan kasvukatto, miniatyyrimaapallo-suunnitelma, aallot 1–4 ja koko maailman '
          + 'lehdet — korvattu pallolla (5.9.2026, Viisas Pöllö -osio) ja karttauudistuksella (13.9.2026, Kaupungit-osio). Loki: docs/raamattu-loki/paatokset-2026-08-24--09-03.md (koko tiedosto, 125 '
          + 'kohtaa 24.8.–3.9.2026).',
      ],
    },
    {
      otsikko: 'Arkkikirjasto: pop-upien yhteinen kieli',
      tila: 'linjattu 26.8.2026 (omistaja: "pelin pop upit saisi tulla yhtenaisesta tyylikirjastosta ... Mieti kokonaisuus tarkkaan") — toteutus erissä',
      kohdat: [
        'PIENENNETTY = MAHDOLLISIMMAN TIIVIS, ANIMOIDEN (omistaja 28.9.2026, sanatarkasti astrolinssin selitteestä: "pitää pienentää tuo selittelen palkki kun se on Pienennetty. Tee siitä yleinen '
          + 'tapa. Se on jo matkakirjassa. Eli animoitu pienennys mahdollisimman tiiviiksi."): kaikki pienennettävät selitteet, inforuudut, palkit ja paneelit kutistuvat pienennettäessä pehmeällä '
          + 'animaatiolla sisältönsä kokoisiksi eivätkä jätä tyhjää tilaa (ei ✕:ään tai avatun leveyteen venyvää palkkia); mallina Matkakirjan pienennys. Koskee kaikkia linssejä, webiä ja natiivia. '
          + 'Astrolinssin selite luetaan lisäksi ääneen striimiluennalla, automaattisesti päällä (omistaja 28.9.2026: "Tee selitteelle myös striinilukija joka automaattisesti päällä").',
        'KAIKKI LIIKE ANIMOIDAAN PEHMEASTI (omistaja 3.9.2026; animaatiot tuovat peliin elävyyttä): jokainen ilmestyminen, poistuminen ja paikanvaihto ruudulla on animaatio, jossa on nopeutus ja '
          + 'hidastus (ease-in-out; sisaantulo pehmealla jarrutuksella, poistuminen kevyella kiihdytyksella), ei koskaan hyppy. Kesto lyhyt (200-400 ms), liike pieni, prefers-reduced-motion '
          + 'kunnioitetaan (pelkka haivytys). Fable tekee tallaiset animaatiot OMA-ALOITTEISESTI aina kun jokin ruudulla muuttuu, vaikka omistaja ei niita pyytaisi. Poikkeus pysyy: kartan '
          + 'siirtymissa elavat animaatiot on kytketty pois suorituskyvyn takia (ks. Fokusmoodi). AVAUS JA SULKU AINA ANIMOIDEN (omistaja 29.9.2026, maakuntalapusta): jokainen lappu, kortti, '
          + 'paneeli, selite ja pop-up avautuu kasvaen ja häivyttyen esiin sen avanneen napin tai kohdan suunnasta ja sulkeutuu samaa reittiä takaisin (myös ✕:llä, ohinapautuksella ja uuden '
          + 'avautuessa), yhteinen apuri 220 ms auki / 200 ms kiinni, pehmeä jarrutus sisään ja kevyt kiihdytys ulos; webissä ja natiivissa samat kestot (web on malli). Animaatio alkaa samalla '
          + 'ruudunpäivityksellä kuin napautus — ei viivettä ennen avausta (nosto aukeaa yhä välittömästi, löydös 134). Myös kuvan suurennos koko ruutuun ja kaupungin avauskortti ovat alle 250 ms '
          + '(omistaja 14.10.2026 klo 22.4x: "Molemmat alle 250 ms"; vanhat poikkeukset lokissa). Koko ja paikka pysyvät avattuna kiinteinä (omistaja 29.9.2026) — sisältö vierittyy kortin sisällä.',
        'LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA (omistaja 9.10.2026 klo 09.1x, sitova: pallokierrokset, Olavinlinnan historia-animaatio ja kaikki tulevat vastaavat kamera-, kertoja- ja '
          + 'esittelykohtaukset; työtapa omistajan lukemasta Motion Engineering -artikkelista, ei uusia työkaluja, kuvat omasta pelimoottorista): 1) OHJAAJAN SUUNNITELMA ennen tekoa: mitä katsojan '
          + 'pitää muistaa ja kohtauslista, jossa jokaisella kohtauksella on alkutila, lopputila ja syy olla olemassa; pelkkä siirtymä ilman syytä karsitaan. 2) LIIKESÄÄNNÖT LUOKITTAIN: kamera hidas '
          + 'ja lähes huomaamaton, pehmeä kiihdytys ja jarrutus, ei äkkikäännöksiä; korostukset, kuvat ja käyttöliittymä KAIKKI LIIKE ANIMOIDAAN PEHMEASTI -linjan mukaan; kova kiihdytys vain '
          + 'harkittuna tehokeinona. 3) KERTOJA, TEHOSTEET JA KAMERA SAMALLA AIKAJANALLA: kertojan sana-ajat kohdistetaan kameran liikkeisiin, ei tyhjiä taukoja eikä päällekkäistä puhetta. 4) '
          + 'KUVA-ARKKI JA ARVIO ennen Päätoimittajaa ja omistajaa: pelistä kuva jokaisesta tärkeästä hetkestä ja nopeimmista siirtymistä; arvioija katsoo vain tallennettuja kuvia, nimeää kolme '
          + 'suurinta virhettä aikaleimoineen, korjaa paikallisesti ja ottaa kuvat uudelleen (sallittu poikkeus 7.10. kevyestä testauksesta näissä kohtauksissa). 5) KAIKKI TIEDOSTOIHIN: suunnitelma, '
          + 'liikesäännöt, kohtauslista ja arviot kohtauksen kansioon, ei vain keskusteluun. TAUKO PYSÄYTTÄÄ KERTOJAN JA TEKSTITYKSEN (omistaja 12.10.2026 klo 00.2x: "Jätä kuitenkin se pause nappi '
          + 'ja silloin kertojan ääni pitää myös katketa"; kaikki esitykset ja kierrokset): tauko pysäyttää kertojan äänen ja tekstityksen heti, ja toisto jatkaa samasta kohdasta.',
        'KAHDENLAISET KUVAT ESITTELYISSÄ (omistaja 9.10.2026 klo 09.5x, sitova: pallokierrokset ja vastaavat esittelyt): 1) TARINAKUVAT seuraavat kertojaa ja tulevat lentäen näkyviin kerronnan '
          + 'kohdalla 2) LISÄKUVAT näkyvät pieninä ruudun oikeassa alareunassa sen mukaan, mikä kohde on näkyvissä (esim. Kuninkaanlinnan aarteet, joista kertoja puhuu), ja suurenevat vain '
          + 'napautuksesta. Melkein koko ruudun kuvia ei koskaan avata automaattisesti, ei myöskään laattojen latautumisen varakuvana.',
        'YKSI SANASTO KAIKILLE KELLUVILLE PINNOILLE: pop-up kootaan aina samoista paloista — ylärivi (pikkuotsake, esim. KOHTAAMINEN tai symboli+luokka), otsikko, leipä, korostettu kysymysrivi, '
          + 'nappirivi, reunahuomautukset (varoitus ja vihjelinkki pienellä) ja lähderivi. NAPPIEN KOLME ROOLIA: kullattu päänappi on etenevä tai peruuttamaton valinta (Aloita peli, Kyllä), '
          + 'kehystetty paperinappi on sivuvalinta (Ei), ja musteviivarivi jää kortin sisäisille listavalinnoille (24.8. kevennys).',
        'TAUSTAN KOLME ASTETTA OVAT PANOKSEN MITTARI. Aste 0, selailu: ei tummennusta (kohdekortti, minipopup) — kartta elää kortin takana. Aste 1, harkinta: kevyt tummennus ja sumennus '
          + '(varmistukset, lippu- ja Tutki-ikkunat) — päätöstä punnitaan, perääntyä voi. Aste 2, panos: tumma sumennus, joka kuultaa reunoiltaan (v1134:n säteittäinen malli; tehtäväkortti ja '
          + 'aarrepaljastus) — on sitouduttu, jännite nousee (omistaja 26.8.2026: "tummemman taustan voisi tuoda mukaan kysymyksen alkaessa"). Tummuus kertoo aina panoksesta — se ei ole koristeen '
          + 'asia.',
        'SULKEMISSOPIMUS SEURAA ASTETTA: selailupinta sulkeutuu rastista ja ulkopuolelta napauttaen; harkintapinta napeistaan ja ulkopuolelta; panospinta vain omalla toiminnollaan — kulman rastia '
          + 'sillä ei ole (omistaja 26.8.2026: "Yläkulman ruksi on turha"). SULKUTAPA-ASETUS (omistaja 11.10.2026 klo 21.3x): Pulun chat-ikkunat ja nostot sulkeutuvat oletuksena ✕-napista, joka on '
          + 'ikkunan yläpuolella oikeassa yläreunassa (ikkunan asettelu ei muutu); asetuksista pelaaja voi itse valita, että ne sulkeutuvat napauttamalla mitä tahansa kohtaa kartalla.',
        'TOTEUTUS ERISSÄ, EI KERTARYSÄYKSELLÄ: yhteinen tyylipohja ja pieni apuri, siirrot pari pintaa kerrallaan (panospinnat ensin, sitten fokusvirran kortti ja kupla, selailupinnat, isot '
          + 'dialogit), savukkeet vartioivat ettei siirto muuta käytöstä. UUSI pop-up tehdään AINA kirjastosta — erillistyylit ovat jatkossa virhe.',
      ],
    },
    {
      otsikko: 'Aarteet ja eteneminen',
      tila: 'mekaniikka toteutettu v1109–v1110 (25.8.2026); maakohtaiset parit sisältötyönä jäljellä',
      kohdat: [
        'Laatta joka kaupungissa; oikea vastaus paljastaa, alta löytyy AINA aarre. Vanhat laattatyypit (jalokivet, tyhjät, hevosenkengät, rosvot, linssilaatat) on POISTETTU pelistä; vanhat '
          + 'tallenteet migratoituvat.',
        'AARTEET: pieni paikallisaarre (~100–250 p) · iso paikallisaarre (~500–800 p) · mantereen 1000 p aarre · PÄÄAARRE (2000 p + jää matkalaukkuun; entinen tähtimekaniikka, avaa mannerlennon). '
          + 'Arvo arvotaan löytöhetkellä 10 punnan tarkkuudella; kiinteät vain 1000/2000. Jako: 1 pääaarre + 1 mantereen aarre per manner, lopuista ~1/3 isoja ja ~2/3 pieniä. LINSSIT AARTEINA '
          + 'EUROOPASSA (omistaja 11.10.2026 klo 14.2x): kun kaupungin aarre avataan ensimmäisen kerran, aarteen sisällön lisäksi avautuu kaupungin linssi: Alpit Topografialinssi, Lontoo '
          + 'Maailmanradio, Edinburgh Keksintölinssi, Istanbul Ihmisen matka, Amsterdam Taidemuseo ja Lappi Tähtitaivas, kun se on valmis; pisteillä avautuminen jää rinnalle, ja ISS avautuu '
          + 'raketilla, ei aarteena (ks. Karttalinssit, ISS-RAKETTI).',
        'Paikallisaarteet: joka maalle oma pari (pieni + iso), paikkaan sopivia, osa hauskan yllättäviä. ~220 paria — mekaniikka valmis (js/packs/paikallisaarteet.js, ISO3-avaimet), sisältö '
          + 'kirjoitetaan erissä. EUROOPAN 29 MAAN PARIT KIRJATTU (omistaja hyväksyi listan kortilla 28.8.2026; arvoankkurit pieni ~150 ja iso ~600 puntaa): pieni = paikallinen herkku tai '
          + 'luonnontuote (mustikat, kanelipullat, parmesaanitahko...), iso = kadonnut kansallisaarre (Gallehusin kultasarvet, Irlannin kruununjalokivet, Rafaelin muotokuva, Fabergen munat...); '
          + 'legendat (Sampo, Nibelungit, Tell, Attila, Egill, Polubotok) merkitaan faktateksteissa rehellisesti taruiksi. LISTA ASUU paikallisaarteet.js:ssa - se on totuuden lahde, ei tama osio. '
          + 'Muut mantereet viela valiaikaisilla laudan pareilla.',
        'AARREPALJASTUKSEN KOLME MALLIA (leiskapaatokset 28.8.2026, toteutettu peliin samana paivana; leiskat docs/mantereet-tyoaineisto/aarreleiskat/): paikallisaarre maan omalla vaalealla kuvalla '
          + 'saa koko ruudun pergamenttimallin (ks. PAIVITYS 3.9.2026 alla) ja FAKTA nakyy oppimistekstina kortilla; PAAAARRE saa AARNIN LUETTELON DIPLOMIN (kaiverruskehys, kartussiotsake, alanauhan '
          + 'arvo, punainen LOYDETTY-leima paivayksella) - kaanoni: luettelossa ovat VAIN paaaarteet; muut kuvat (laudan mustapohjaiset) jaavat tummaan malliin. POHJAPAATOS (omistajan kortti '
          + '28.8.2026): diplomissa TUMMA -> VAALEA siirtyma - leima lyodaan tummassa valokeilassa ja pohja kirkastuu vasta sitten vaaleaan lopputilaan. AVOINNA: vaaleapohjaiset paaaarrekuvat (7+2) '
          + 'ja Livian jalkikommentit paljastukselle. PAIVITYS 3.9.2026 (omistaja Hymettoksen hunajan kortista, sanatarkasti: "tama kaipaa viela saatoa. taustan voisi levittaa koko ruudun alueella '
          + 'ja poistaa vinjetit"): paikallisaarteen paljastus on KOKO RUUDUN tasainen pergamentti - ei purppuraa laitaa, ei valokeilaa, ei kuvan sateittaista maskia; kuva sulautuu '
          + 'darken-sulautuksella ja vain uloin 9 % reunasta hoyhennetaan sauman takia. Jatka matkaa -nappi tumma pergamentilla. Kuvat, joiden oma pohja on teksturoitu (esim. FIN tervatynnyri), '
          + 'erottuvat himmeasti - ne voi generoida uudelleen tasaiselle pohjalle. (v1499)',
        'Löytöteksti: lyhyt tosi fakta aarteesta + onnentoivotus (fakta-kenttä valmiina; kortille kun parit tulevat).',
        'Huudahdukset: pääaarteen luetut säilyvät; muut ovat korkeintaan kahden sanan huudahduksia ("Jes!", "No okei.") — toteutettu.',
        'VARUSTEET ostetaan kaupasta (hampurilaisvalikko, ~1000 p/kpl) — eivät löydy laatoista. AVOIN 25.8.2026: kauppaa ei ole vielä rakennettu, joten mannerkohtaiset linssit eivät tällä hetkellä '
          + 'ole saatavissa mistään (vain tietäjäpisterajojen linssit aukeavat).',
        'Pääaarre voi osua mantereen ensimmäiseen kätköön; varma viimeisessä. Löytö avaa mannerlennon seuraavalle.',
      ],
    },
    {
      otsikko: 'Karttalinssit',
      tila: 'luonnos',
      kohdat: [
        'ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.4x–22.0x ja 7.10.2026 klo 00.4x, sitova; korvaa Lontoo-pilotin): VAIN HYVÄN 3D:N KAUPUNGIT (omistaja 7.10.2026 klo 00.4x): opas avautuu vain '
          + 'kaupunkeihin, joissa on oikea hyvä 3D-aineisto (LS2:n luokitus sallitut-3d.json, 7.10.2026: 36 kaupunkia Euroopassa, kierroksen kohteet hyvän 3D:n säteellä); muut kaupungit eivät näy '
          + 'ehdotuksissa, täkyissä, Vaihda kohde -listoissa eivätkä lennoissa, kohteiden vapaata hakua ei ole, ja "vie minut X" puheella tai kirjoittamalla toimii vain sallittuihin. Kaupunkeja '
          + 'lisätään, kun ne on parannettu itse Blenderillä (omistajan päätöksellä, ks. VAIN EUROOPPA). ESITTELYT ESIGENEROIDAAN (omistaja 7.10.2026 klo 00.4x): kaupunkiesittelyt ja muu etukäteen '
          + 'tehtävissä oleva sisältö kirjoitetaan Claude Coden Opus-agenteilla (ei workerin API:lla) ja tarkistetaan erillisellä kieli- ja faktatarkistuksella ennen ääntä, ja äänet esigeneroidaan '
          + '(määrä omistajan luvalla, pilotti ensin). Pelaajan omiin kysymyksiin vastaa reaaliajassa Sonnet 5.5 Pulun workerissa, ja se tulkitsee pelaajan vastaukset. Googlen paikkatietoja (Places: '
          + 'aukioloajat, arvosanat, arvostelut, kuvat) ei käytetä (omistaja 7.10.2026 klo 00.26; Googlen ehdot kieltävät karttasisällön puhesynteesissä ja käytön muun kuin Googlen kartan kanssa). '
          + 'KAUPUNKIOPAS KARTALLA (omistaja 7.10.2026 klo 08.3x): kartalla jokaisen sallitun kaupungin kohdalla on kiinnitetty kuumailmapallo (Vernen Viisi viikkoa ilmapallossa 1863; '
          + 'proseduraalinen Blender-malli ilman maksullista generointia) ajattelijoiden elementtien tapaan; pallot luetaan palvelimen sallitut-listasta. PALLOT PELAAJALLE (omistaja 11.10.2026 klo '
          + '13.4x ja 14.4x; kumoaa 7.10.:n "vain siinä maassa, jossa pelaaja on"): pelaajalle näkyvät aina vain kehityskaupunkien pallot (ks. KEHITYSKAUPUNGIT), muiden kaupunkien vain kehittäjälle; '
          + 'pallolento maksaa £200 (Kysely-kaava kuten 50:50), muualta kuin kohdemaasta napautettaessa viereen tulee hetkeksi hintalappu "Kuumailmapallo £200", ja kohdemaassa ilman riittäviä rahoja '
          + 'tulee vain rahapulailmoitus OK-napilla; koko Euroopan loitonnuksessa hunnun päällä näkyvät pallot, himmeät kohdekaupunkipisteet ja kevyet rajat. Pallo sijoittuu kaupungin nostokortin '
          + 'vastakkaiselle puolelle, ettei kortti peitä sitä (7.10. klo 12.4x, Ateena). Napautus avaa suoraan sen kaupungin oppaan ilman aloitusvalintaa, ja ☰-valikossa ei ole Vaihda kohde -kohtaa; '
          + 'Kysy, Liiku ja Seuraava toimivat vain kaupungin sisällä, ja toive muuhun kaupunkiin saa torjuntatekstin. Laaja Elävä opas pysyy linssivalikossa ennallaan. NIMI KUUMAILMAPALLO JA '
          + 'KORINÄKYMÄ (omistaja 7.10.2026 klo 09.1x): linssin näkyvä nimi on Kuumailmapallo (sisäiset tunnisteet ennallaan), ja jokainen opaskaupunki näkyy kartalla omana 3D-pallonaan. Korinäkymä '
          + 'tehdään ensin kokeiluna Prahassa: ruudun alalaidassa on punotun korin nahkareunus ja sivuilla kaksi köyttä omalla kerroksellaan; kori ja köydet keinuvat hiljaa kuin kupolassa myös '
          + 'kameran kierron aikana, ja sivulle tai eteen kiihdyttäessä ne jäävät jousen tavoin hieman vastasuuntaan (pienet liikkeet, köysillä viive), mutta kaupunki ja horisontti pysyvät vakaina. '
          + 'Äänet seuraavat korkeutta: ylhäällä lähes hiljaista (korin narina, köysien natina), nousussa liekin humahdus, laskussa kankaan huokaus, ja kaupungin äänimaisema voimistuu alas '
          + 'mentäessä. Korin narinaa ja köysien kiristystä käytetään säästeliäästi vain nopeammissa siirtymissä, "jotta ei rasita korvia" (omistaja 09.2x). KOMPASSI (omistaja 9.10.2026 klo '
          + '00.38–00.39): korin reunalla on pieni messinkinen nestekompassi lasikupuineen, joka osoittaa oikeaan pohjoiseen, näyttää kehällä pienellä merkillä seuraavan kohteen suunnan ja keinuu '
          + 'korin mukana; se on 3D-esine korissa, ei valikko eikä ruudun päällä oleva kuvake. Liikkuminen on suhteellisen hidasta kuin pallolla, mutta "pieniä fysiikan lakien ylityksiä" saa tehdä, '
          + 'jotta kaikki kiinnostavat kohteet mahtuvat kokemukseen. Jokaisella kaupungilla on noin 20 sekunnin AVAUS ("Tervetuloa Pariisiin. …": kaupunki yhdellä ylhäältä nähtävällä kuvalla ja '
          + 'kierroksen alku; omistaja 7.10.2026 klo 10.0x). Aloitussiru Esittele kaupunki käynnistää noin 8 pysähdyksen kierroksen, joka jatkuu ilman valintaa ja päättyy kysymykseen. OHJAIMET '
          + '(omistaja 6.10.2026 klo 11.5x, kiireellinen, oma juna): ruudun alareunan keskellä on neljä kiinteää neliönappia pyöristetyin kulmin (kartan Liiku-napin pohja, tekstit ja kuvakkeet '
          + 'keskitettyinä). Kysy avaa heti vähintään viisi kysymystä, jotka Sonnet on tehnyt taustalla valmiiksi paikkaan saavuttaessa; Liiku avaa kaupungin tärkeimmät kohteet (6–20 kaupungin koon '
          + 'ja kiinnostavien kohteiden mukaan, omistaja 6.10.2026 klo 20.1x), ja listan alimpana on aina Kaupunkikierros, joka käy itsestään läpi 8–10 tärkeintä; mikrofoni puhuu suoraan '
          + 'matkaoppaalle eikä avaa Pulun chattia, ja oppaalta voi kysyä, pyytää siirtymään johonkin paikkaan kartalla tai mitä tahansa muuta; näppäimistö on sama keskustelu kirjoittamalla. '
          + 'Wikipedian tekstejä ei käytetä: kertoja (esigeneroinnissa Opus, livenä Sonnet) kertoo omasta tiedostaan, pelin tarkistetut kaupunkitekstit annetaan sille taustatiedoksi kuten Pulun '
          + 'valmiit vastaukset, isoisän 1873-merkintä kuullaan kerran oikeassa paikassa, vuosiluvut vain aineistosta, ja koordinaatit tarkistetaan Wikidatasta (P625). Ruudulla kaupunki on koko '
          + 'ruudulla, paikan nimi ja yksi rivi häivyttyvät noin 5 sekunnissa, chat ei ole oletuksena auki, ja hampurilaisessa ovat Vaihda kohde (maanosa → maa → maan sallitut kaupungit), Näytä '
          + 'teksti, Mikseri (omistaja 9.10.2026 klo 00.43; samat säätimet kuin muualla, olemassa olevalla pohjalla) ja Poistu linssistä (ei erillistä ✕:ää). Kuvat (nostojen havainnekuvat ja '
          + 'Commonsin vapaat kuvat lisenssiriveineen, ei lennossa luotuja) näkyvät kuvakorttina pysähdyksen ajan: kortissa on yksi kuva ja kuvalaskuri +N (nostokortin pohja), ja napautus avaa '
          + 'Kuvasuurennoksen sarjana, jota selataan pyyhkäisemällä (kohteella 1–5 kuvaa kohteen mukaan, omistaja 6.10.2026 klo 20.1x; lisenssirivi kuvakohtaisesti; omistaja 5.10. klo 23.5x, ainoa '
          + 'poikkeus KUVAGALLERIA POIS -linjaan). VAIN SPEKSATUT KUVAT (omistaja 6.10.2026 klo 19.1x–20.0x, sitova): opas näyttää kuvia ainoastaan ämpärin oppaan kuvalistasta (avain Wikidata Q): '
          + 'pelin omat silmin tarkistetut CC/PD-valokuvat ja havainnekuvat sekä Sisältökirjurin Sonnet-parven hakemat ja silmin tarkistetut Commons-kuvat; ajonaikaista Wikidata P18- tai '
          + 'Commons-hakua ei käytetä, ja kohteella ilman listan kuvaa ei näytetä kuvaa. KUVIEN KÄYTTÖOIKEUS (Päätoimittaja 7.–8.10.2026, sitova kaikille oppaan ja nostojen kuville, koska peli on '
          + 'kaupallinen): panoraamavapaus tarkistetaan maittain, eikä pelkkä ei-kaupallinen panoraamavapaus riitä (ks. SUOJATUT TEOKSET KAIKISSA OMISSA JÄLJENNÖKSISSÄ, Ydinajatus). Ranskassa sitä '
          + 'ei ole (esim. Pompidou ja Stravinsky-suihkulähde jäivät pois). Suomessa ja Liettuassa se koskee vain rakennuksia, ei taideteosta pääaiheena. Jos tilanne on epäselvä (esim. Monaco), '
          + 'elävän taiteilijan teos ei saa olla pääaiheena. Italiassa art. 107–108 koskee julkisen omistajan (valtio, alue, kunta, Fondo Edifici di Culto) kulttuurikohteiden sisäkuvia ja '
          + 'kokoelmateoksia, joten ne jätetään pois. Kirkollisen omistajan kirkkojen sisäkuvat ovat sallittuja, kun omistaja on tarkistettu. KREIKKA JA RANSKAN DOMAANIT VAROVASTI (omistaja '
          + '9.10.2026 klo 18.5x, kortti "Kyllä, varovainen (suositus)"; raportti docs/raportit/selvitys-eurooppa-kulttuuriperinto-20261009.md): Kreikan laki 4858/2021 vaatii luvan ja maksun valtion '
          + 'muistomerkkien ja valtion museoiden esineiden kuvien kaupalliseen käyttöön (virallisessa hinnastossa sovellus 20 % myyntihinnasta). Siksi niistä ei lisätä uusia valokuvia, vaan tilalle '
          + 'tehdään havainnekuva tai oma 3D-malli. Ennen pelin julkaisua juristi tarkistaa Kreikan maksun ja Ranskan 21 kansallisen domaanin (esim. Louvre-Tuileries, Versailles, Fontainebleau, '
          + 'Chambord) opetusvapautuksen; Sisältökirjurin kuvainventaario on pohjana, eikä olemassa olevia kuvia poisteta ennen sitä. Mainoskuviin (App Store, some) ei laiteta näitä kohteita eikä '
          + 'Eiffelin yövaloa. Elävistä tunnistettavista ihmisistä ei tehdä havainnekuvia eikä valita lähikuvia, eikä tuotemerkki saa olla pääaiheena. Poistetut kuvat arkistoidaan tarkistussummineen '
          + 'NAS:lle (Matkakirja-arkisto/<rooli>/, ks. LEVYJAKO) ennen kuin ne poistetaan ämpäristä. Pysähdykset valitaan ensisijaisesti kaupungin lukitusta kohdelistasta (12 kohdetta); puuttuvat '
          + 'kuvat ja kadonneet kohteet tilataan Codexilta havainnekuvina; kuvat kytketään ☰-valikon rivistä Kuvat, oletus päällä, ja valinta muistetaan (omistaja 11.10.2026 klo 23.1x: yläkulmassa '
          + 'näkyy vain hampurilainen; omistaja 12.10.2026 klo 00.2x: hampurilainen on oikeassa yläkulmassa). Päällys on Moderni-kirjasimella harmaassa lasiteemassa. Avaus ja kaupungin vaihto '
          + 'alkavat 5 km:n yläkuvasta kaupungin keskustasta (Wikidata P625, ei Natural Earthin pistettä); yleiskuva ja ensimmäinen kohde ladataan etukäteen latauspalkin aikana, ja pallo laskeutuu '
          + 'alkuesittelyn aikana yhtenäisesti ensimmäiseen kohteeseen odottamatta yläilmoissa (omistaja 8.10.2026 klo 08.2x). Kaupungin ulkopuolelle (yli 30 km) siirrytään ilman lentoa: näyttö '
          + 'tummuu, ruudulla on Siirrytään ja kohteen nimi sekä todellista latausta näyttävä palkki, näkymä aukeaa vasta tarkkana, ja kertoja aloittaa vasta sen jälkeen (omistaja 6.10.2026 klo '
          + '12.0x). Kaupungin sisällä kamera lentää ajonaikaisesti kahden paikan välillä pehmeästi, ei turhan nopeasti eikä turhan ylhäältä (omistaja 6.10.2026 klo 23.4x ja 9.10.2026 klo 13.1x): '
          + 'pehmeys on tärkeämpää kuin kesto, ja siirtymä saa olla nopeakin, varsinkin lähikohteeseen, kun kiihdytys ja jarrutus ovat pehmeitä (kulmanopeudelle ei ole erillistä rajaa): kesto matkan '
          + 'mukaan, jatkuva nopeus ja kiihtyvyys ilman nykäyksiä, pitkillä matkoilla pehmeä kiihdytys, tasainen matkavauhti ja pehmeä jarrutus, kaaren korkeus maltillinen matkaan nähden '
          + '(lähikohteisiin matala kaari), loiva lasku eikä matalaa liukua maan yllä (omistaja TF 144); kaupunkikierroksen järjestys ja katselusuunnat valitaan ensin pienimmän kokonaiskierron ja '
          + 'sitten matkan mukaan (ks. PALLON LIIKE), pysähdyksellä kamera kehystää kohteen tiukasti (noin 35–45 % ruudun leveydestä), ja seuraava kohde esiladataan lennon aikana (Cesiumin oma '
          + 'lennon kohteen esilataus: vain seuraava pysähdys, esikamera pois suunnitelman muuttuessa, ei varastoa, ei offline-käyttöä eikä omaa tallennusta; laattojen välimuisti '
          + 'Cache-Control-otsakkeiden mukaan, Map Tiles -ehdot tarkistettu 7.10.2026). Pysähdyksellä pelaajalla on TAPPI-ohjaimet: oikea kiertää kohteen ympäri (↔) ja nostaa tai laskee (↕), vasen '
          + 'ylös vie lähemmäs ja alas kauemmas, ja kamera katsoo aina kohteeseen. VAPAA LENTO JA PALAA KIERROKSELLE (omistaja 9.10.2026 klo 01.23): kierroksen nappirivillä on Vapaa lento -nappi, ja '
          + 'vapaassa lennossa Palaa kierrokselle vie pelaajan keskeytyskohtaan, josta kierros jatkuu (olemassa olevat pohjat). DRONE-OHJAUS (omistaja 9.10.2026 klo 01.37): vapaassa lennossa '
          + 'molempia tappeja käytetään yhtä aikaa ja liikkeet yhdistyvät (esim. alas ja eteen), ja vasemmalla keskellä on pieni nopeusvipu enimmäisnopeudelle (olemassa oleva liukusäädinpohja, näkyy '
          + 'vain vapaassa lennossa). Kohde korostetaan omilla 3D-objekteilla (nimilappu harmaalla lasilla, viiva kadulle tai kanavalle reittipisteiden kautta; ei laatoista johdettuja), ja korostus '
          + 'seuraa kohteen omaa muotoa: OSM-pohjapiirroksen mukainen ääriviiva ja julkisivun lämmin kultainen valo, joka syttyy pallon saapuessa ja himmenee sitten, pyöreän pilven ja maarenkaan '
          + 'tilalla (omistaja 9.10.2026 klo 00.39–00.42). William lukee jokaisen pysähdyksen yhtenä ottona, eikä kierroksella ole taukoja: seuraavan kohteen kertomus alkaa jo lennon aikana, ja '
          + 'lennoilla kuullaan myös kaupungin historiaa tai muuta taustaa omina osioinaan (omistaja 9.10.2026 klo 01.23–01.29; uudet äänet omistajan luvan rajoissa); odotusajan täyttävät '
          + 'esigeneroidut siltalauseet (pallon liikkeistä vain harvoin, ks. PALLOSANASTO) sekä maiden ja pääkaupunkien nimet jatkolauseineen (erillisinä otoina omistajan luvalla, ks. MÄÄRÄN PÄÄTTÄÄ '
          + 'OMISTAJA). KEHITYSKAUPUNGIT (omistaja 8.10.2026 klo 20.43, sitova; Kööpenhamina 13.10.2026; LONTOO, PRAHA JA ATEENA omistaja 14.10.2026 klo 09.0x kortilla "Kyllä, Lontoo ja perässä '
          + 'Praha ja Ateena (Suositus)"): kuumailmapallon parannukset tehdään kehityskaupunkeihin Tukholma, Pariisi ja Kööpenhamina; Lontoo, Praha ja Ateena lisätään listaan tässä järjestyksessä, '
          + 'kukin vasta kun Päätoimittaja on tarkistanut kierroksen pelikuvista, ja muihin kaupunkeihin jatketaan vasta omistajan päätöksellä. Muiden kaupunkien pallot näkyvät kartalla vain '
          + 'kehittäjälle, harmaina (olemassa olevalla tyylillä; ks. PALLOT PELAAJALLE). Kaupunkinäkymä käyttää Googlen fotorealistisia laattoja Cesium ionin kautta (asset 2275207) kehitys- ja '
          + 'testikäytössä; julkaisu vasta maksullisen lisenssin ja Cesiumin kirjallisen vahvistuksen jälkeen. Laatat haetaan aina Cesium ionin kautta eikä omalla Google Cloud -avaimella (omistaja '
          + '11.10.2026 klo 18.5x: "cesium on parempi koska se on jenkki yhtiö ja käyttää omaa apia, niin ei tule ongelmia sen google eu säännön kanssa"). Samassa näkymässä ei ole muuta karttaa: '
          + 'laattojen 404-reiät täytetään ilman karttakuvaa (maan perussävy, maastomuodon varjostus ja ilmaperspektiivi mitatuista utu-taulukoista), eikä Bingin, Sentinel-2:n, OSM-rasterin tai muun '
          + 'palvelun kuvalla edes laattojen takana tai horisontissa (Päätoimittaja 9.10.2026 klo 19.5x–20.0x; testi LahtoLaatatTestit vahtii). Oma teemadata valona, merkkeinä ja viivoina on '
          + 'sallittu, esimerkiksi yövalot vain hehkuna ja valopisteinä yöllä (aurinko alle −2°), ei päiväkuvaa eikä lähteen omia värejä, ei laattojen reikien täyttöä, ja lähde Data sources '
          + '-rivillä. VESI JA KORKEUDET (omistaja 8.10.2026 klo 20.23; Karttasepän ehtoraportti #4224): pallon vesi on oma vesipinta Googlen laattojen päällä, ei laatoista johdettu eikä Googlen '
          + 'pinnan muokkaus (ei maskia Googlen varjostimessa); rantaviivat tulevat OSM:n vesialueista, ESA WorldCover 2021 täydentää, ja krediitit ovat ☰ › Lähteet -kohdassa (OSM ODbL, ESA '
          + 'WorldCover CC BY 4.0). Korkeuksia ei lueta Googlen laatoista (Päätoimittaja 8.10.2026 klo 20.48 Googlen ehtojen mukaan): kehystys, törmäykset, veneet ja linnut käyttävät avoimia '
          + 'maastomalleja (Copernicus GLO-30 kaikissa pallokaupungeissa, kehityskaupungeissa tarkemmat kansalliset mallit; Karttasepän raportti #4230). OMAT 3D-MALLIT (omistaja 9.10.2026 klo '
          + '00.42–01.05; JÄRJESTYS 9.10.2026 klo 12.3x): ensin Notre-Dame ja Kuninkaanlinna valmiiksi ja omistajalle pelin kuvina, muihin kohteisiin vasta hyväksynnän jälkeen ja tarvearvion mukaan '
          + '(vain ilmeisimmät virheet ja tärkeimmät kohteet, docs/raportit/tarvearvio-pariisi-tukholma-20261009.md); EIFFEL-TORNI (omistaja 10.10.2026 klo 12.3x, '
          + 'vahvistettu 14.10.2026 klo 23.59): omaa mallia ei tehdä, Googlen torni jää; VALOKUVAPOHJAISET PINNAT (omistaja 9.10.2026 klo 15.0x): Googlen laattojen '
          + 'keskellä olevien omien mallien pinnat tehdään valokuvapohjaisiksi eikä toistuvista tekstuureista: Codex tekee julkisivu- ja kattopinnat Linnanrakentajan ortografisista ohjekuvista ja '
          + 'Commonsin PD-, CC0- tai CC BY -referensseistä, valo ja AO leivotaan, malli esitetään valaisemattomana kuten Googlen laatat, ja kontrasti ja terävyys sovitetaan ympäröiviin rakennuksiin, '
          + 'mutta sävy ja kirkkaus mitataan oikeaan maailmaan (VERTAILU OIKEAAN MAAILMAAN). Ennen omistajaa pelikuva verrataan oikeaan valokuvaan samasta kulmasta (ylhäältä ja edestä). Googlen '
          + 'laattoja sisältäviä pelikuvia ei anneta Codexille eikä muulle generoinnille pohjaksi tai referenssiksi (Googlen ehdot); referenssit tehdään omasta aineistosta (OSM, oma maasto) tai '
          + 'Commonsista. VERTAILU OIKEAAN MAAILMAAN (omistaja 10.10.2026 klo 11.2x; Päätoimittaja 12.0x, sitova): jokainen uusi kaupunkimallin tai rakennuksen versio ajetaan Linnanrakentajan '
          + 'vertailuportin läpi (kaupunkipinnat-v1/lahde/vertailuportti.zsh <kohde> <lod0.glb>; 0 läpi, 1 hylkäys, 2 kaatui) ennen luovutusta Linssiseppä 2:lle, ja tulos kirjataan LAHTEET.md:hen. '
          + 'Portti vertaa mallin ortonäkymää oikeaan avoimeen ortokuvaan samassa rajauksessa vyöhykkeittäin (maa, katot, ulokkeet): rajat ovat kirkkaus ±15 %, sävy ±15 sekä ulokkeet ja katot ±0,12, '
          + 'kohdekohtainen poikkeus vain perusteltuna kohteen rajat-jsonissa (Linnanrakentaja 15.0x), ja taivasvalo sovitetaan automaattisesti oikean ortokuvan maan varjoihin (14.3x). Aineistona '
          + 'ovat Karttasepän ortokuvat (_tyo/karttaseppa/vertailu/, lisenssi ja vuosi metatiedoissa) ja Sisältökirjurin Commons-vertailukuvat (_tyo/sisaltokirjuri/vertailu/). Tavoite on oikea '
          + 'maailma, ei ympäröivän Google-aineiston sävy. Pelissä olevat mallit korjataan seuraavassa versiossaan. TEKOÄLYPINNAT KOKEILUUN (omistaja 9.10.2026 klo 17.3x, kortti "Kyllä, kokeillaan '
          + '(suositus)"): pintoja kokeillaan myös geometriaohjatulla generoinnilla omalla koneella (ComfyUI, SDXL, ControlNet ja IP-Adapter T7:llä: syvyys-, reuna- ja normaaliohjaus samasta '
          + 'kamerasta, projisointi malliin ja saumojen paikkaus) vain kaupallisen käytön sallivilla malleilla (ei FLUX.1-deviä eikä Hunyuania). Olavinlinnan pilottiseinästä ja Notre-Damen '
          + 'eteläjulkisivusta tehdään vertailu (nykyinen, Codex, uusi) Päätoimittajalle ja sitten omistajalle. Codexin kuva ei korjaa mallin muotoa (Notre-Damen pilotti #57 hylättiin: tornien katot '
          + 'ja ruusuikkuna väärin); Pariisin ja Tukholman heikoimmat kohteet korvataan omilla tarkoilla 3D-malleilla niin, että Googlen versio piilotetaan kohteen kohdalta ja tilalle tulee oma '
          + 'malli (Map Tiles -ehdot sallivat omat 3D-objektit laattojen päällä, kun niitä ei ole jäljitetty tai johdettu laatoista ja Googlen osuus kerrotaan; tarkistettu 9.10.2026). Oman mallin '
          + 'saa tehdä myös Googlen sumentaman kohteen kohdalle, koska ehdoissa ei ole sumennuksia koskevaa kieltoa ja malli tehdään vain julkisista vapaista lähteistä (Päätoimittaja 9.10.2026: '
          + 'Pariisin poliisiprefektuurin kortteli avausnäkymässä). Mallit rakennetaan itse ilman ostoja ja ilman ostettuja pohjia vapaista lähteistä (Commons PD/CC, mitat, OSM; ei mitään Googlen '
          + 'laatoista johdettua). Järjestys: Concorden aukio (laatoissa vuoden 2024 olympiarakennelmat) → Riddarholmenin kirkko (pitsitorni mustana möhkäleenä) → Notre-Dame (vuoden 2024 jälkeinen '
          + 'asu, laatoissa telineet ja nosturit) → Kuninkaanlinna (remonttipeite). Mallin korkeus tulee vain omasta korkeusmallista (ks. VESI JA KORKEUDET), ja pysähdys tuodaan niin lähelle, että '
          + 'kohde erottuu (esim. Concorden obeliski). Googlen omat sumennukset (esim. Élysée) ohitetaan korkeammalta lentämällä (8.10.2026), ellei kohteen kohdalle ole tehty omaa mallia, eikä '
          + 'sumennuksen päälle tehdä erillistä peittokerrosta tai laikkua. Googlen logo näkyy aina, datakrediitit ovat yhdellä rivillä Data sources -napin takana (Googlen Map Tiles -ehdot '
          + 'tarkistettu 5.10.2026), eikä laattoja tallenneta offline-käyttöön. Linssi avautuu täkyluetteloon (kuva, nimi ja koukkurivi LINSSIRIVI-pohjalla, alla Tai valitse paikka: maanosa › maa › '
          + 'kaupunki); jos täkyjä ei tule, opas alkaa kuten ennen. Ohjausryhmässä on tauko (II/▶), joka pysäyttää kerronnan, lennon ja kierron, ja vaihtoehtopysähdys odottaa pelaajan valintaa '
          + '(omistajan TF 144 -palaute 5.10. klo 23.5x). PALLON LIIKE (omistaja 8.10.2026 klo 08.3x–08.4x ja 9.10.2026 klo 01.09–01.14, sitova): kohdepysähdyksellä pallo kiertää kohdetta selvästi '
          + 'ja laskeutuu samalla alemmas ja lähemmäs (spiraali), ja kamera katsoo koko ajan kohteeseen (omistaja 9.10. klo 01.14; kumoaa 8.10.:n kaaren samalla etäisyydellä). Kaupungin alussa pallo '
          + 'kiertää hitaasti koko aloituksen ajan ja lähestyy samalla ensimmäistä kohdetta ilman nopeaa pyörähdystä (01.09). Heti esittelyn jälkeen pallo kääntyy hitaasti S-käyrällä seuraavan '
          + 'kohteen katselusuuntaan; kameran kääntyminen oman akselinsa ympäri on silmille raskainta, pehmeästi kiihdytetty matka ei, joten reitit ja katselusuunnat valitaan pienimmän '
          + 'kokonaiskierron mukaan ja kiihdytykset ovat pehmeitä; KIERROKSEN REITTI JA KORKEUS (omistaja 9.10.2026 klo 01.23–01.29): reitti on mahdollisimman lyhyt ilman siksakkia, ja kaukaiset '
          + 'kohteet jätetään kierrokselta pois (tilalle lähempiä); kaupunkia katsellaan matalammalta jatkuvasti hitaasti kiertäen ja panoroiden, ja pelkkiä siirtymiä on mahdollisimman vähän; '
          + 'reitille jätetään silti 1–2 nopeaa kiihdytystä kovaan vauhtiin; kohteiden järjestystä saa muuttaa, jos reitti järkevöityy (ensimmäinen kohde pysyy, ja tekstit eivät viittaa '
          + 'järjestykseen). Pallo käynnistyy aina päivänvalossa (omistaja 09.1x). PALLOSANASTO (omistaja 8.10.2026 klo 08.3x; docs/raportit/pallosanasto-kertoja-20261008.md): kertoja viittaa '
          + 'palloon ja sen liikkeisiin oikein termein (poltin, kupu, kori, yläventtiili, noste, tuulikerros, ajelehtiminen) vain harvoin, ei jokaisen kohdan välissä eikä koskaan kohteen kuvauksen '
          + 'keskellä (omistaja 9.10.2026 klo 01.14; tiukentaa 8.10.:n rajaa "enintään joka toisessa siirtymässä"). Kaikki pallo-tekstit noudattavat kahta fysiikkasääntöä: noste syntyy kuvun ja '
          + 'ympäröivän ilman lämpötilaerosta (lämmin ilma ei kanna palloa), ja poltin vain nostaa, vaakaliike tulee aina tuulesta (vauhti ja suunta haetaan eri korkeuden tuulesta). PÄIVÄ, SÄÄ JA '
          + 'LIVE (omistaja 8.10.2026 klo 09.1x–09.2x, sää muutettu 9.10.2026 klo 01.20–01.25, sitova): ☰-valikon rivi Aika ja sää avaa listan, jonka ylimpänä on LIVE omassa laatikossaan (pois '
          + 'harmaa, päällä oranssi tila.live); LIVE päälle = paikallinen vuorokaudenaika ja todellinen sää (MET Norway Pöllön kautta, CC BY 4.0 Lähteisiin), pois = palauttaa muistetut käsivalinnat, '
          + 'ja käsivalinta sammuttaa LIVEn; alla AIKA päivä | yö (oletus päivä). SÄÄTÄ EI VALITA (omistaja 9.10.2026 klo 01.20–01.25): listassa ei ole säävalintoja, oletus on selkeä, ja sää tulee '
          + 'itsestään: harvoin lyhyt sadekuuro pilvien tummuessa (30–60 s, joskus ukkonen, ei joka kierroksella) ja märät kiiltävät kadut, jos ne saadaan toteutettua (kuvapari ensin); vanha '
          + 'tallennettu käsisää nollataan selkeäksi. AIKA JA SÄÄ ☰-VALIKOSSA (omistaja 11.10.2026 klo 23.1x: "siirrä aurinko nappi eli mistä voi vaihtaa vuorokauden aikaa hampurilaisen sisään"): '
          + 'erillistä ☾/☀-nappia ei näytetä yläkulmassa, vaan lista avataan ☰-valikon rivistä Aika ja sää. Ensimmäisellä pallokerralla hampurilaisen (☰) luona näkyy noin 15 s käynnistyksestä 5 s '
          + 'ajan vihje nykyisestä vuorokaudenajasta ja säätilasta (NIMILAPPU-pohja), vain kerran eikä LIVEn aikana. Säätehosteet ovat kevyitä ja mahtuvat iPadin budjettiin. ELÄVÄ TAIVAS JA KAUPUNKI '
          + '(omistaja 9.10.2026 klo 01.20–01.30): selkeälläkin säällä taivaalla on kevyt kumpupilvikerros ja maassa liukuvat pilvien varjot, kaukana hento usva (ilmaperspektiivi), ja kaupungissa on '
          + 'pieniä liikkeitä (liput, savu piipuista, välke vedessä, aamusumu joen yllä, ikkunavalot illalla); lintuja on runsaammin, lentokoneita korkealla ja harvoin toinen kuumailmapallo kaukana. '
          + 'YÖVALAISTUS (omistaja 9.10.2026 klo 01.30): yöllä kohteiden julkisivut valaistaan OSM-pohjapiirroksen mukaan Googlen laattojen päällä ilman omia malleja (omissa malleissa tarkemmin), '
          + 'mutta Eiffel-tornin kultaista valaistusta ja kimallusta ei jäljitellä, koska ne ovat suojattuja (SETE). YÖ ON LOPPUILTA (omistaja 9.10.2026 klo 01.41): pallon yö näytetään loppuiltana: '
          + 'taivaanrannassa on vielä purppuraa ja iltaruskoa, katuvalot ja valomainokset valaisevat katuja ja rakennusten valot rakennuksia, ja harvoin taivaalle osoittaa valonheittimiä; päivällä '
          + 'näkyy harvoin pala sateenkaarta, luontevimmin kuuron jälkeen. ELOKUVAMAINEN KUVA (omistaja 9.10.2026 klo 01.38–01.42): kuumailmapallon kuvassa on yksi elokuvamainen jälkikäsittely ilman '
          + 'pelaajan säätimiä: värien tummennus (tummemmat varjot ja keskisävyt, maltillinen kylläisyys, lämmin valo ja viileät varjot), kevyt filmirae, pehmennys vain kaukana (ei koko kuvan '
          + 'reunoja sumentavaa pehmennystä, joka tekisi kaupungista pienoismallin näköisen), hento hehku valoihin ja kevyt vinjetti; omistaja näkee kuvaparin Tukholmasta ja Pariisista päivällä ja '
          + 'yöllä ennen käyttöönottoa. OHJAIMET KIERROKSELLA (omistaja 11.10.2026 klo 23.1x): opaskierroksen aikana näkyy vain tauko; tauolla näkyvät lopetus (tauon vasemmalla puolella), Seuraava, '
          + 'Kysy, mikrofoni, näppäimistö ja kompassi; vapaan ohjauksen ohjaimet tulevat vasta kierroksen lopussa tai lopetuksen jälkeen; lopetus kysyy vahvistuksen ("Haluatko varmasti lopettaa '
          + 'kierroksen?" KYLLÄ / EI), ja Palaa-nappi vie takaisin kierrokselle. Oma ohjaus kierroksen aikana on poistettu kokonaan. Katsetta saa kääntää kierroksen aikana vetämällä sormella joka '
          + 'suuntaan (peilikuvana: alas vetäminen kääntää katseen ylös), ja näkymä palautuu pehmeästi keskelle (kumoaa pysähdysten TAPPI-ohjaimet). GOOGLEN RUUHKAVARA (Päätoimittajan tarkennus '
          + '11.10.2026 klo 23.1x): Bing Aerial (Cesium ion asset 2) on sallittu Googlen ruuhkakatkon (429) varana, koska se ei koskaan näy samaan aikaan Googlen laattojen kanssa; muun palvelun kuva '
          + 'Googlen laattojen takana samassa näkymässä on edelleen kielletty. Loki: docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 11.10.2026: ELÄVÄ OPAS (11.10.2026 klo 15.44), #OMISTAJAN PÄÄTÖS: EIFFELIN OMA MALLI LOPETETAAN, PERUTUT TYÖT LOKISTA (15.10.2026 klo 00.07).',
        'ISS-KYYTI, ISS-OHJAAMO JA ISS-KAMERA (omistaja 30.9.–6.10.2026, sitova; historia lokissa, grep ISS-KAMERA ja ISS-OHJAAMO): pelaaja voi kuvata ISS:ltä mitä tahansa paikkaa koko maailmassa, '
          + 'ja kuva tehdään laitteella tarkemmasta aineistosta (Sentinel-2, GIBS-pilvet). Ostot (0,50 €/kuva) ovat valmiina kytkimen takana mutta pois päältä, ja kuvia saa ottaa rajattomasti. '
          + 'Kuvauksen ajan ohjaamon LCD näyttää "KEHITETÄÄN…" ja pienistä neliöistä koostuvan latauspalkin LCD-väreissä, valmistuessa "KUVA VALMIS" 2 s; valmis kuva näkyy heti Cupolan isossa '
          + 'ikkunassa, pienenee vasempaan alakulmaan pikkukuvapinoksi ja tallentuu Kuviin, ja myöhemmin se näkyy Matkalaukun julisteissa. Objektiivi on oletuksena LAAJA (pystykenttä 30°), ja TELE '
          + '(14°) valitaan LCD-napista kameranapin yläpuolella. Kuva on JULISTE omistajan hyväksymän vedoksen E v3 mukaan (1.10.2026 klo 22.02; malli '
          + 'proto-3d/_valmiit/hyvaksytyt-mallit/iss-juliste-e3-20261001/): ulkomitta 4:5 pysty (2160 × 2700, julkaistavaksi esim. Instagramissa) mustalla arkilla, kuva lähes neliö ohuessa vaaleassa '
          + 'kehyksessä, Matkakirjan logo avaruudessa maapallon kaaren yläpuolella, paikannimi kuvan päällä vasemmassa alakulmassa valkoisin versaalein ja koordinaatit kultaisina sen alla, '
          + 'ISS-aurinkopaneelin siluetti oikeassa alakulmassa; alamarginaalissa keskellä INTERNATIONAL SPACE STATION ISS, tekninen rivi (päiväys ja UTC-aika, korkeus, nopeus, etäisyys, polttoväli, '
          + 'aukko, valotusaika, ISO, auringon korkeus) ja datalähderivi, oikealla pyöreä ISS-sinetti (kultarengas, ISS ja kiertorata maapallon kaaren yllä); jakonappi ja Kuviin tallennus antavat '
          + 'juliste-version. Julisteen kuva tehdään tarkimmasta aineistosta (Sentinel-2 10 m koko lähialueelta) maapallon pintaan, ilmakehän halo on syvän sininen ja siniset sävyt korostetaan koko '
          + 'kuvassa (omistaja 6.10.2026). ISS-ohjaamossa maapallon kosketus ei tee mitään, vain ohjaamon omat säätimet toimivat, ja joystick on keskeltä tarttuessa neutraali (omistaja '
          + '5.–6.10.2026). OHJAAMO v3b (omistaja 6.10.2026): nopeuskahva vasemmalla ja joystick oikealla, kaikki välit reunat mukaan lukien yhtä leveät, ei kerroinlaatikkoa eikä numeroita, asteikko '
          + 'alkaa vivun juuresta, iso LCD lähes tasaisella hyvin haalealla vihreällä taustalla; vaakanäkymässä paneeli on alareunassa, ja äänisäätimet ovat Pulun valikossa. Kahva on portaaton: '
          + 'kaasua muutettaessa LCD näyttää 3 s ajan kertoimen vasemmalla ja oikean nopeuden oikealla sekä vähintään 0,1 %:sta rivin "x,x % valon nopeudesta"; lukema on vihreä, 300×:stä oranssi ja '
          + '1000×:llä punainen, eikä TÄYSI NOPEUS -tekstiä käytetä. Suuressa vauhdissa ruudun reunat sumenevat ja alus heiluu, hienovaraisesti oranssista alkaen ja voimakkaammin punaisella; tähdet '
          + 'pysyvät paikallaan. Cupolan alkuteksti kirjoittuu mustalle taustalle keskelle kahdessa osassa. Cupolan ikkuna on tarkka myös zoomattuna, ja iPadilla kehystä näkyy enemmän. Ohjaamon '
          + 'äänimaisema säilyy; Maapallolla ja Astronauttien kuvissa on oma hiljaisempi kohina ja vähäeleinen hidas avaruusambient. ISS-ÄÄNET (omistaja 11.10.2026 klo 12.5x): nykyiset tehosteet '
          + 'pysyvät, ja ISS-näkymässä soivat satunnaisesti välillä NASAn aidot radioäänitteet (PD), myös muilla kielillä kuin englanniksi. ISS-RAKETTI (omistaja 11.10.2026 klo 14.3x–14.5x): ISS:lle '
          + 'lennetään raketilla Andøyan avaruuskeskuksesta (Norja, Tromssan lähellä); raketti näkyy kartalla valmiina lähtöön ja on käytössä heti, kun pelaaja on Tromssassa ja rahaa on £500 (ei '
          + 'aarre-ehtoa); ensimmäinen lento maksaa £500, sen jälkeen ISS aukeaa ilmaiseksi suoraan linssivalikosta ja raketilla saa lentää uudelleen ilmaiseksi; muualta napautettaessa viereen tulee '
          + 'hintalappu "ISS £500", ja Tromssassa ilman riittäviä rahoja rahapulailmoitus OK-napilla. Laukaisu animoidaan vaiheineen kameran seuratessa, ruudulla nopeus, korkeus, aika ja G sekä '
          + 'faktoja kahdesta lähteestä, ei logoja; ensimmäinen laukaisu 60–90 s, myöhemmin lyhyt, Ohita aina.',
        'AJATTELIJALINSSI JA KULTTUURIPERINNÖN ARKKI (omistaja 1.–3.10.2026; yksityiskohdat lokissa, grep AJATTELIJ): yksi ajattelija kerrallaan kipsibystinä valokeilassa. ALKU (v14, omistaja '
          + 'hyväksyi 3.10.2026): pimeästä kytkin napsahtaa (aito äänite ja salikaiku) ja ääriviivavalo syttyy (prologi 2,5 s); oma sävellys (Zarathustra lipun takana) kuuluu heti ja on tiivis, niin '
          + 'että kertoja alkaa noin 12 s linssin avaamisesta; leikkaukset vain kuuluviin iskuihin (suuri sointu noin 4,5 s, kolme patarumpua, huippu noin 8,6 s). Intron leikkauskuvat ovat mystisiä, '
          + 'enemmän varjoa kuin valoa: kapea valo paljastaa kussakin yhden tunnistettavan piirteen (profiili, silmät, parta, pää ylhäältä), ei irrallisia valoläiskiä eikä mustia silmäkuoppia; '
          + 'kasvot näkyvät kunnolla vasta nimen kohdalla Rembrandt-valossa. TEKSTIVAIHE: Rembrandt-valon jälkeen valospotti tummenee, ja vasta sitten taustarivit lähtevät yksi kerrallaan kasvojen '
          + 'eri puolilta kameran lähestyessä; taustarivit ovat luettavia mutta hennosti pehmeitä (noin 1 px puhelimessa), himmeämpiä ja ruudulla enintään noin 60 % päälainauksen kirjainkoosta, ja '
          + 'hipaisukulmassa venyvät rivit häivytetään (omistaja 3.10.2026 klo 23.4x); vain päälainaus on terävä ja näkyy kokonaan ruudulla (2–3 riviä otsalla); kasvot ovat melko tummat tekstien '
          + 'aikana, ja tekstittömissä jaksoissa tarinavalo tulee sivulta niin, että silmät näkyvät. Kaikukuvat värittöminä, yhtenä rajattuna hahmona ilman taustaa, kuvioita ja suoria '
          + 'leikkausreunoja (reunat häivytetään); savu oletuksena päällä pehmeäreunaisena harsona eikä terävänä varjona (omistaja 3.10.2026). Natiivissa musiikki, puhe ja kuva kulkevat samalla '
          + 'äänikellolla (dspTime) ja laitteen äänilatenssi kompensoidaan (myös Bluetooth); tahti mitataan äänellisestä tallenteesta. Kertoja yhtenä ottona yhdestä yhtenäisestä kertomuksesta, jossa '
          + 'elämä ja muutama lainaus vuorottelevat (ääni Iv4 William, eleven_v4_turbo, oletusvakaus, välimerkit mukana). Kasvoille heijastetaan valona lauseita ja kaikukuvia: kaikukuva on yksi '
          + 'rajattu, yksinkertainen hahmo ilman taustaa ja kehystä, viistosti kasvojen mukaan taipuva, ei hehkua; tekstit liikkuvat lähes samalla nopeudella. Yläkulman ✕ piilossa, kunnes ruutua '
          + 'napautetaan. Neljä hillittyä ääniefektiä (projektorin naksahdus, hallin ovi, savimalja, kytkin pois). LUKITTU 3.10.2026: kaikki ajattelijat ja tulevat taideteokset ovat YHDESSÄ koko '
          + 'maailman kulttuuriperinnön varastossa (arkki), ei maanosakohtaisia halleja; maanosa tai kulttuuri tarvittaessa osastona saman hallin sisällä. Varasto on vielä havainnekuvavaiheessa.',
        'ISOISÄN LINSSI — VUOSI 1873 (omistaja 21.09.2026 klo 09.07, Fablen linjaus): oma vahvasti retro linssi VAIN vuodesta 1873, isoisän matkan vuodesta: sen vuoden rajat ja maiden nimet (27 '
          + 'poliittista nimeä nimistöstä aika=1873; raja-aineisto historical-basemaps GPL-3.0, 1878 → 1873 käsin, tarkennus nykyrajoilla, muutokset dokumentoidaan), Horation reitti katkoviivana, '
          + 'isoisän ottamat valokuvat matkan varrelta (havainnekuvat), sen ajan äänet ja media (CC-julisteet, ääninäytteet) kun niitä saadaan. Ei aikajanaa tässä linssissä: muut historialliset '
          + 'tapahtumat (mm. kumpikin maailmansota) saavat omat linssinsä, jotka pyörivät nykyisen kartan päällä. Erillinen rasterinen ATLASLEHTI-linssi (Stieler 1875 PD-skannit) päätetään vedoksen '
          + 'jälkeen. Toteutus alkaa vasta Fablen sanasta.',
        'ENSIMMAINEN AIKAJANALINSSI: KEKSINNOT EUROOPASSA (omistajan tilaus 2.9.2026 ilta; Fablen ensimmainen kierros): yhteinen aikajanamoottori js/aikajana.js + linssi js/linssit/keksinnot.js '
          + '(kerros: false, kuten radio). Kulku: kello rullaa ylalaidassa tyhjien vuosien yli ja pysahtyy tapahtumaan; kartalle syttyy valo tyon kaupunkiin ja JAA PALAMAAN (lopussa koko kaaren '
          + 'valokartta); FILMINAUHA alalaidassa: seuraava kortti vasemmalla sumeana, nykyinen tarkkana, menneet oikealle pienenevina nimineen ja vuosineen; ILMIOPANEELI oikeassa ylakulmassa: '
          + 'ilmiokuva + keksijan nimi + selite + Lue juttu. Kaikki vaihdokset liukuen. Napautus kelloon/korttiin pysayttaa; nykyinen kortti avaa jutun nahtavyyskorttina. Kaari 1769 Watt - 1928 '
          + 'Fleming, 25 pysakkia + merkkipaalu 1873 (isoisan matka); rehellinen rajaus: Bell, Edison ja Wrightit mainitaan loppusanoissa Atlantin takaisina. KUVAT: keksijoiden muotokuvat Commonsin '
          + 'PD-kuvia; ilmiokuvan paikalle GENEROITU kuva kun kuvaputki tuottaa sen (yksi kentta datassa). Kamera vapautuu maan ikkunasta ajon ajaksi (ui.kameraVapaa). Kaynnistin toistaiseksi '
          + 'kehittajavalikon rivi "aikajana: keksinnot"; pelillinen ovi paatetaan omistajan kanssa. OMA MUSIIKKI ON PAATETTY (omistaja 2.9.2026 ilta: "Generoi linssille oma musiikki"): linssilla on '
          + 'oma raita (Google Lyria 3.5, ks. AANET JA MUSIIKKI Viisas Pollo -osiossa; 45-60 s saumaton looppi, -33 LUFS; luonne 1800-luvun kellokoneiston tikitys ja tasainen pulssi, akustinen, ei '
          + 'laulua). Soi linssin kaynnistyksesta sulkemiseen, hiljenee puoleen pysaytyksessa, vaistyy pollon ja lukijan alta kuten siirtymamusiikki. Tama on linssien musiikin malli: jokainen '
          + 'aikajanalinssi saa oman raitansa samalla putkella. Linssisopimuksen kielto jatkuvasta animaatiosta koskee SVG-kerrosta: valo syttyy kerran, kello ja nauha ovat DOM:ia kartan paalla.',
        'USKONNOT SAAVAT KUVANSA JA LINSSINSA - JA LINSSEJA MONISTETAAN (omistaja 2.9.2026 ilta): JARJESTYS on (1) Keksinnot Euroopassa hiotaan valmiiksi, (2) uskontojen linssit (suuret uskonnot '
          + 'syntyvat; uskonpuhdistus) samalla moottorilla ja omalla musiikilla, kuvat kuvaputkelta historian hetkien tapaan (lahi + kauko, fotorealistinen; profeettoja ei esiteta kasvoista '
          + 'tunnistettavina), (3) muut aiheet. AIHELUETTELO on docs/linssikatalogi.md (elava tyolista; omistaja 24.9.2026 klo 22.1x: jaettu TOTEUTUSTAVAN mukaan kuuteen osaan — aikajana, alue, '
          + 'virta, data, esitysmoottori, pohjakartat — seka Pelissa nyt -osa; teema ja manner ovat suodattimia; jokaisella rivilla mita opitaan, pelikytkos, 1873-sidos ja aineisto; seuraava-tila '
          + 'enintaan 8 linssilla; koneluettava kopio linssikatalogi-data.js) ja sama sisalto artefaktisivuna omistajalle; tila per linssi valmis / rakenteilla / seuraava / idea. TOINEN MOOTTORI: '
          + 'ALUELINSSI (omistaja 2.9.2026 ilta): sama kello ja filminauha, mutta kartalle piirretaan varialueita, joiden rajat liukuvat avainvuodesta toiseen yksinkertaistetulla pohjalla; '
          + 'katalogissa oma valilehti (M-P: valtakunnat, sodat, imperiumit, leviamiset). Aloitetaan Kiinan dynastioista vasta kun aikajanamoottori on hiottu; rajaaineiston lisenssi tarkistetaan '
          + 'ennen kayttoa. JARJESTYS (omistaja 2.9.2026 ilta): Kiinan dynastiat, Napoleon, ensimmainen maailmansota, Rooma, toinen maailmansota (savy 13+: rintamat ja rauhat). Uusi linssi ei ala '
          + 'ilman omistajan valintaa luettelosta.',
        'KOLMAS MOOTTORI: VIRTALINSSI (omistaja 2.9.2026 ilta: "visuaalisesti voimakkain linssi jonka pohjana olisi koko maailmankartta ja aiheena siirtomaat ... salamanisku merireittia pitkin ... '
          + 'pienia veneita jotka kuljettaisivat banaania, teeta ... aaniefektit ja kuulutukset megafonista"): Siirtomaat-linssi on kolmas linssi jarjestyksessa (Keksinnot, Kiinan dynastiat, '
          + 'Siirtomaat) ja se rakennetaan HIUKKASMOOTTORILLA Canvas-kerrokseen (M7+-linssialusta): salama emamaasta alueelle ensimmaisen alistuksen vuonna, alue saa emamaan varin, sitten laivavirta '
          + 'reitilla, jonka maara ja lasti seuraavat vuosia. Aanet: satama-ambienssi, torvi, megafonikuulutus pysakeilla, generoidaan lukijaaanella etukateen. ORJAT KUULUTETAAN KUTEN MUU LASTI '
          + '(omistaja 2.9.2026 ilta, kadonneen korttivastauksen toisto): "laiva on lastattu orjilla" kuulutetaan samalla megafonilla kuin tee ja sokeri, koska niin heihin silloin suhtauduttiin - se '
          + 'ei halvenna orjia vaan nayttaa, mita se kaytannossa oli. Orjalaivat vetavat perassaan mustaa viivaa. PULU TULEE VALIIN ja selittaa tilanteen (orjuutta on ollut pyramidien rakentamisesta '
          + 'asti; mika kolmiokaupassa oli uutta). TYHJALLE MERELLE PROJISOIDAAN generoituja aikalaiskuvia orjien oloista ja elamasta seka siirtomaavaltojen arjesta: kuvat kestavat 13 vuoden '
          + 'ikarajan, mutta asia kerrotaan niin kuin se oli. Savy on isoisan aikalaisen havainto, ei mainos. SAMA MOOTTORI LUONNONVAROILLE (omistaja 2.9.2026): louhintamaa nakyy varilanttina, joka '
          + 'alkaa valua eri puolille maailmaa - oljy, timantit, kumi, kupari, guano, harvinaiset maametallit - kukin omalla varillaan (katalogi S6), ja LAHI-ITA JA MUSTA KULTA omana linssinaan '
          + '(omistaja 2.9.2026: "lahi-itakin oli aluksi siirtomaa ja alistettu"): ensin salama ja mandaatin vari, sitten oljy valuu ulos (katalogi S7). ISOISAN MATKA 1873 NAKYY LINSSISSA (omistaja '
          + '2.9.2026: "isoisa mukaan ehdottomasti"): kun kello saapuu vuoteen 1873, isoisan reitti piirtyy virtojen keskelle ja kulkee ajan mukana - se kertoo, mita maailmaa han kulki. Aiheluettelo '
          + 'docs/linssikatalogi.md osa 3 (Virtalinssit).',
        'LINSSEJA EI TAUOTETA (omistajan kortti 28.8.2026): epailtiin etta linssit pitavat vanhaa maailmankarttaa hengissa ja kuluttavat resursseja. Mittaus (v1280-eran tutkinta) osoitti ettei nain '
          + 'ole: vanhan laudan vektorikuva on fokusnakymassa tyhja, joutilas nakyma hiljainen, eika yksikaan linssi pida vanhaa karttaa elossa. Linssit sailyvat pelissa sellaisinaan.',
        'LINSSIT KYTKETÄÄN VAIN MATKALAUKUSTA (omistaja 18.8.2026): hampurilaisvalikko on pelin ympäryksiä (äänet, uusi peli, ehdota sisältöä, versio), ei pelisisältöä.',
        'Kartta on pelin keskusesine, ei valikko: pelaaja oppii näkemään siitä yhä uusia asioita.',
        'Linssi = animoitu visualisointi kartalla juoksevine vuosilukuineen. Avaa kaikki vuosisadat, ei vain 1873:n.',
        'Linssit aukeavat pelin aikana (osa kaupasta, osa matkalla) ja jaksottavat pelirytmiä. Superlinssi on eri asia (läpipeluupalkinto).',
        'PAIKKASIDONTA: linssi aukeaa missä merkitsee eniten — leviäminen Afrikassa, Kolumbus Espanjassa, Rooma Roomassa, kauppakomppania Intiassa, dynastiat Kiinassa.',
        'Ideapankki: imperiumit, kauppareitit, viestinnän historia, tutkimusmatkat, aikapyyhkäisy. Kerroksia enintään 2–3 kerralla.',
        'IDEAPANKIN TÄYDENNYS (omistaja 26.8.2026): ihmisten leviäminen maapallolla, silkkitiet, ristiretket, kolonialismi, kielten leviäminen, öljynporauksen vaikutus rahaliikenteeseen, '
          + 'dataverkkojen ja puhelinverkkojen kehitys, rautateiden kehitys; lisäksi kuvaajat, joilla näkee yksittäisen kaupungin kasvun kerros kerrokselta (lavalinssin aihe). Linsseillä '
          + 'karttapohjiin animoidaan aikajanatekniikalla erilaisia näkökulmia.',
        'Toteutus: käsin tarkistettu data, pelin oma animaatio. Etusivulla kevyt vihjeanimaatio.',
        'KAMERA-AJOT (omistaja 24.8.2026): piirtomoottoriin kehitetään sulavat zoomausanimaatiot sisään ja ulos — zoomi kiihtyy ja hidastuu luontevasti alussa ja lopussa (easing). Tarvitaan paljon '
          + 'jatkossa: linssien animaatiot (esim. Silkkitien reitit, ihmispopulaation leviäminen Afrikasta), joissa kartta liikkuu itsestään ja zoomautuu tarvittaessa. EI PYÖRITYSTÄ (omistaja 17.10.2026 klo 23.14, koskee KAIKKIA kamera-ajoja, ensin museo): "näkymän pyörittäminen on katsojalle ikävää, joten sitä pitää välttää kaikin mahdollisin keinoin"; kamera etenee sivuttain tai vinosti, kääntyy menosuuntaan vain vähän (~15°) ja lopuksi kohti seuraavaa kohdetta kuin sivuttain astuva ihminen; iso suunnanmuutos tehdään mustalla välähdyksellä (< 250 ms) pyörityksen sijaan. Siirrot oikovat esteiden (kaiteet, penkit, jalustat, kävijät) läpi suoraan kohteen eteen, reitinhaku vain seinien ja oviaukkojen takia; kesto määräytyy etäisyydestä normaalilla kävelynopeudella suorinta reittiä, pehmein lähdöin ja pysähdyksin (omistaja 23.17: aika säästyy suorasta linjasta ja kääntämisen poistosta, ei vauhdista). Testi valvoo siirron kokonaiskäännön ja keston.',
        'AIKAJANA-AJO (omistaja 17.8.2026): animaatiolinsseillä yhteinen aikajanamoottori juoksevine vuosilukuineen — pelaajan käynnistämä, ele keskeyttää.',
        'LAVALINSSI (omistaja 17.8.2026): lähikuvakehyksen linssityyppi ilmiöille, jotka eivät erotu laudan mittakaavassa (esim. kaupungin kasvu; pilotti Rooma).',
      ],
    },
    {
      otsikko: 'Viisas Pöllö',
      tila: 'toteutettu (pöllöchat käytössä); 3.–19.9. päätökset lokissa',
      kohdat: [
        'TÄMÄN OSION KOHDAT 3.9.–19.9.2026 (225 päätöstä linsseistä, pallosta, pulusta, äänistä ja työtavoista) on siirretty sanatarkasti lokiin docs/raamattu-loki/paatokset-2026-09-03--09-14.md '
          + '(Raamatun jako 20.9.2026). Alla on vain voimassa oleva linjaus aiheittain; osion lopussa Viisaan Pöllön alkuperäinen karaktääri- ja chat-linjaus (18.–25.8.2026) koskemattomana.',
        'AGENTIT VAIN OPUS JA SONNET, PARVINA SAA AJAA (omistaja 7.9.2026 klo 19.05): sääntö on Raamatun ensimmäinen rivi (Ydinajatus-osio) eikä sitä toisteta tässä. Lisäksi: kustannuskurin rajat '
          + 'parville — selvärajaiset erät, enintään noin 8 rinnakkain. Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #AGENTIT VAIN OPUS JA SONNET, PARVINA SAA AJAA, #FABLEMAX VAIN '
          + 'TARPEESEEN, OPUS HETI KUN VOI.',
        'TYÖTAVAT (voimassa): kysymyskortit aina — Fablen kysymys omistajalle on aina kortti vaihtoehdoin ja suositus ensimmäisenä, vastaukset kirjataan (5.9.2026); tekstisession ehdotukset ovat '
          + 'omistajan sana ja menevät peliin sanasta sanaan, vain mittarajat tarkistetaan (9.9.2026); uusi sarjatehtävä (kuvat, tekstit, äänet, kaupungit) aloitetaan aina pienellä valmiiksi '
          + 'toteutetulla kokeiluerällä omistajan katsottavaksi (9.9.2026); uusi asia tehdään tarkastuskierroksina — toteutus, oma tarkastus, korjaus, uusi tarkastus — kunnes tekijä on itse '
          + 'tyytyväinen; testien läpäisy ei ole esteettinen hyväksyntä, tarkistamatta jääneitä osia ei väitetä tarkistetuiksi (10.9.2026). Claude Projects EI ole käytössä (omistaja 19.9.2026 ilta); '
          + '19.9. aamun Projects-työnjako on kumottu ja sessiosetti 20.9.2026 (Kaupungit-osio) korvaa sen. Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #KYSYMYSKORTIT AINA, #KELLONAJAT '
          + 'SUOMEN AIKAA, #TEKSTISESSION EHDOTUKSET OVAT OMISTAJAN SANA, #UUSI SARJATEHTAVA ALOITETAAN AINA PIENELLA KOKEILUERALLA, #UUSI ASIA TEHDAAN TARKASTUSKIERROKSINA, KUNNES TEKIJA ON ITSE '
          + 'TYYTYVAINEN, #CLAUDE PROJECTS -PROJEKTI RINNALLA: PELI JA JULKAISUT FABLELLE MACILLA, DOKUMENTTI- JA SIIVOUSTYO PROJEKTILLE, RAAMATTU VAIN FABLEN KAUTTA.',
        'KARTTAPALLO ON PELILAUTA (4.–7.9.2026): Globe.gl (MIT, three.js) on pelin lauta — kaupungit, reitit, nappula, siirrot, kamera, nostot, linssit; LAUTA_OLETUS = pallo (v1554, 5.9.). Vanha '
          + 'tasokartta on pois kokonaan: sitä ei ladata eikä alusteta, ?lauta=kartta ja vivut eivät kytke sitä, service worker ei esilataa; koodi jää repoon (7.9.; VANHA_KARTTA_KAYTOSSA=false). '
          + 'Pallo on laatoitettu: Web Mercator -laatat 256 px tasot 0–7 pelin julisteesta (tools/tee-pallolaatat.mjs, ämpäri julisteet/pallo/laatat/<versio>/), nostotaso poltetaan pallon laattoihin '
          + 'omaan kansioon; tuotanto käyttää pallosarjaa ilman nostoja, nostot lepokerroksesta (4.–5.9., 20.9.). Kaupunkien nimet ja rajat elävinä elementteinä laattojen päällä, laatoissa '
          + 'poltettuina varana (5.9.). Vedon jälkeen pallo liukuu kitkalla (nopeus puolittuu ~250 ms), uusi kosketus pysäyttää (5.9.). Pallo levossa yhtä terävä kuin tasokartta: lepokerros kootaan '
          + 'pyramidin laatoista täydellä tarkkuudella (LAATU_TERAVYYS 1,0), häipyy päälle kun kamera pysähtyy; z8 = 182 px/aste (6.9.). Tasainen kehystahti, ei pudotuksia — 55 fps näkyy nykäyksinä '
          + '(7.9.). Rantaviivat ja rajat ovat vektorikerrosta (js/pallovektorit.js), muste ruskeampi ja läpinäkyvämpi, viiva yksinkertaistettu zoomin mukaan (7.9.). Kaupunkipisteet pysyvät '
          + 'paikallaan panoroitaessa (pointAltitude ~0,003) (8.9.); pisteiden koko: lattia vain pelaajan kaupungille, muut 7 px joka zoomilla, lähizoomissa pelikaupungit selvästi kohdepisteitä '
          + 'suuremmat ja nimi klikattava (8.–9.9.); käymättömän kaupungin piste kartan seepiaa, käyty ja alku kultaa (8.9.). Pelaajan maan rajat piirretään muita vahvempina (11.9.; korostus: '
          + 'Kaupungit-osio). Navat parhaalla mahdollisella jäljellä: molemmille navoille oma karttakuva atsimutaalisessa projektiossa samassa 1873-tyylissä, pohjoisnavalle ja Etelämantereelle omat '
          + 'nostot asteisiin sidottuina (11.9.). Valikon sulkeva napautus ei avaa kohdetta (7.9.). Kartta ei saa koskaan hypätä paikasta toiseen eleen aikana (7.9.). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-03--09-14.md #KARTTAPALLO: GLOBE.GL MAAILMANVALIKOKSI, #KARTTAPALLO ON PELILAUTA, LINSSIT VANHALLA KARTALLA, #PALLO ON OLETUSLAUTA HETI, LAATU PALAA '
          + 'LEVOSSA, #KAIKKI PALLOLLE, VANHA KARTTA SULJETAAN, #VANHA KARTTA POIS KOKONAAN, VALIAIKAISESTI, #KARTTAPALLO ON LAATOITETTU, #KARTTAPALLO: LIUKU JA NIMIKERROS, #PALLO LEVOSSA YHTA '
          + 'TERAVA KUIN TASOKARTTA, #PALLO TERAVA LEVOSSA, #PALLON SULAVUUS: TASAINEN KEHYSTAHTI, EI PUDOTUKSIA, #RANTAVIIVAT PEHMEAMMIKSI VANHAN KARTAN TYYLIIN, #PALLON KAUPUNKIPISTEET PYSYVAT '
          + 'PAIKALLAAN PANOROITAESSA, #PALLON KAUPUNKIPISTEET: LATTIA VAIN PELAAJAN KAUPUNGILLE, MUUT 7 PX JOKA ZOOMILLA, #PALLON KAUPUNKIPISTEET ISOMMIKSI LAHIZOOMISSA JA KAUPUNGIN NIMI '
          + 'KLIKATTAVAKSI, #PALLON KAUPUNKIPISTEET VAALEAMMIKSI, #PELAAJAN MAAN RAJAT VAHVEMMALLA, #PARAS LOPPUTULOS RATKAISEE NAPA-ALUEILLA, #NAPA-ALUEET PARHAALLA MAHDOLLISELLA JALJELLA, '
          + 'POHJOISNAVALLE OMAT NOSTOT, HAVAINNEKUVIA PALJON, #ETELAMANTEREELLE OMAT NOSTOT JA HYVA PIIRTO ZOOMATESSA, #MAAPALLON NAPA-ALUEET OIKEIN PIIRRETYIKSI, #VIAT v1670: HELSINKI SISAMAASSA, '
          + 'MERKIT HEILUVAT, VALIKON SULKU AVAA KOHTEEN, #VIKA v1664.',
        'ETUSIVU JA AVAUS: pelin osoite on https://matkakirja.app/ (GitHub Pages, DNS Cloudflaressa) ja media https://media.matkakirja.app/ (R2:n oma verkkotunnus Cloudflaren välimuistin takana; '
          + 'pub-*.r2.dev-osoitetta ei enää kirjoiteta koodiin) (6.9.2026). Aloitusportissa näkyy vain himmeä pallo ja "Aloita seikkailu" keskellä; painalluksen jälkeen yläviiva, otsikko salamana '
          + '(koko ja kirkkaus välähtää), "Osa II", alaviiva, kirjoituskoneteksti (6.9.); kirjoituskone ei hypi, paikkarivi lihavana (6.9.); avauksen ääni: musiikki hiljenee liu\'ulla, terminaalin '
          + 'äänimaisema nousee, kertojan luenta alkaa omalla ajallaan (7.9.); harsoissa ei suoraa rajaa, tekstin vaalea pohja hillitty (6.9.); isoisän kuvat pois etusivulta (6.9.), avauslennolla '
          + 'mahdollisimman vaalea isoisän kuva matkakirjan välistä (3.9., 6.9.). Aloitusvalinta: pallo ei pyöri, kamera omistajan rajauksessa (Eurooppa, Afrikka ja Lähi-itä näkyvissä, Lontoo '
          + 'ylhäällä), kohdekaupunkien huomioympyrä tehostettu, kaikki kohdekaupungit takaisin kokeeksi, Los Angeles → San Francisco, Istanbul lisätty (7.9.). Avauslento seuraa konetta zoomaten '
          + 'tasaisesti saapumisnäkymään, pallo ei pyöri (6.9.). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #PELIN OSOITE ON matkakirja.app, #MEDIALLA OMA VERKKOTUNNUS '
          + 'media.matkakirja.app, #ETUSIVUN AVAUS: PORTISSA VAIN NAPPI, OTSIKKO SALAMANA, #KIRJOITUSKONE EI HYPI, PAIKKARIVI LIHAVANA, #AVAUKSEN AANI: MUSIIKKI HILJENEE, TERMINAALI NOUSEE, LUENTA '
          + 'OMALLA AJALLAAN, #ETUSIVUN HARSOSSA EI SUORAA RAJAA, #ISOISAN KUVAT POIS ETUSIVULTA, #ISOISAN VAALEAT KUVAT REITILLA JA ATEENAN LENNOLLA, #ISOISAN VALOKUVAT, #ALOITUSVALINTA: PALLO '
          + 'PAIKALLAAN, KAIKKI KOHTEET TAKAISIN KOKEEKSI, #KOHTEET: SAN FRANCISCO JA ISTANBUL; VAIN EUROOPPA TYON ALLA, #HITAAMPI ALOITUSPALLO, LENTO SEURAA KONETTA, MAAPALLO VAALEAMPI.',
        'LINSSIT — YHTEISET SÄÄNNÖT (3.–16.9.2026; linssi on oma näkymä, ks. MUUT LINSSIT, Kaupungit-osio): Avausjakso: kartta feidaa mustaan, keskelle otsikko ja lyhyt esittelyteksti, joka luo '
          + 'historiallisen kaaren ja jättää kysymyksen leijumaan (ei yksittäisiä nimiä), Käynnistä-nappi; avauslaatikko repaleista paperia — reuna on yhteinen SVG-maskiosa kaikille '
          + 'pergamenttilaatikoille, vaakareunat rauhalliset, ei tulta — ja yläkulmissa loimuavat lyhdyt (js/lyhty.js) (4.9., 7.9.). Yläpalkki matala: linssin nimi ja kello vasemmalla, oikealla '
          + 'hampurilainen (Poistu, Aloita alusta, Kertoja päällä/pois, Taustamusiikki päällä/pois) ja X (4.9., 8.9.; Astronautin kamerassa ei palkkia: Kaupungit-osio); väkäsikoni kolme leveää V:tä '
          + 'linssien valikoissa (13.9.). Havainnekuva valokeilassa vinjetoituna, siirrettävä ja nipistämällä mitoitettava, koko ja paikka muistetaan laitteella; oletusasettelut näyttöluokittain '
          + '(3.–4.9.). Aikaselain alareunassa yhteisenä moduulina (pystyviivat, valittu pidempi, kelaus sormella) (7.9.); Keksinnöissä alarivin karuselli on aikaselain (8.9.). Selostaja lukee '
          + 'pysäkin ja puhuu loppuun ennen seuraavaa, vuodet sanoina (4.9.); vuosiluku rullaa hedelmäpelin tapaan ja naksahtaa, logaritmiset kiihdytykset (3.9.). Lamput tummuvat leimahduksen '
          + 'jälkeen, vain nykyinen kirkas; vinjetti pysyy ikkunan reunoilla (3.9.). Loppulappu rullautuu ylös kun karttaan kosketaan, sulku oikeassa yläkulmassa (7.9.). Linssin selite laukussa on '
          + 'yksi rivi (6.9.); laukku vierii, tilastot väkäsen alla, Aktivoi on nappi, uusille linsseille omat ikonit (6.9.). Matkakirjan luentakuva piilotetaan linssin ajaksi (9.9.). Linssien aidot '
          + 'nauhoitetut äänimaisemat musiikin ja kertojien lisäksi (7.9.). Karusellin kuvat valmiiksi pieninä, blur rasteroidaan kerran (3.9.). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-03--09-14.md #LINSSI BLOKKAA MUUN, KARUSELLI ENNAKOI, MATALA YLAPALKKI, #LINSSIN AVAUSJAKSO: MUSTA, OTSIKKO, KAYNNISTA, #LINSSIN ESITTELYTEKSTI JA '
          + '1873-VALINAYTOS, #HAVAINNEKUVA VALOKEILASSA, AVAUSLAATIKKO PAPERIA, #LYHDYT LOIMUAVAT AVAUSLAATIKON YLAKULMISSA, #PAPERIN REUNA LUONNOLLISEKSI, YHTEINEN OSA, #PAPERIN REUNA: VAAKAREUNAT '
          + 'RAUHALLISIKSI, EI TULTA, TEKSTILLE TILAA, #LINSSIEN HAMPURILAINEN OIKEASSA YLAKULMASSA: POISTU, ALOITA ALUSTA, KERTOJA, TAUSTAMUSIIKKI, #VAKASIKONI: KOLME LEVEAA V:TA, SAMA KAIKKIALLA, '
          + '#HAVAINNEKUVAPANEELI NIPISTAMALLA SOPIVAN KOKOISEKSI, #LINSSIN OLETUSASETTELUT NAYTTOLUOKITTAIN JA ISOISAN HAVAINNEKUVA, #LINSSIEN AIKASELAIN ALAREUNAAN, #LINSSIN SELOSTAJA LUKEE '
          + 'PYSAKIN, #SELOSTAJA PUHUU LOPPUUN, KUVAN JOKA REUNA HAIPYY, VUODET SANOINA, #LINSSIN VUOSILUKU RULLAA JA NAKSAHTAA, #LINSSIN LIIKKEET PEHMEIKSI, #LAMPUT TUMMUVAT, KARTTA TUMMEMPI, '
          + 'VINJETTI IKKUNAN REUNOILLA, #LINSSIN LOPPULAPPU VAISTYY, SULKU OIKEAAN YLAKULMAAN, #LINSSIN SELITE LAUKUSSA ON YKSI RIVI, #LAUKKU VIERII, TILASTOT VAKASEN ALLA, AKTIVOI ON NAPPI, '
          + '#IHMISEN MATKA: LUENTAKUVA EI SAA JAADA LINSSIN PAALLE, JA TEKSTI KESKELLE RUUTUA, #LINSSIEN AIDOT AANIMAISEMAT, #KARUSELLIN KUVAT VALMIIKSI PIENINA.',
        'KEKSINNÖT-LINSSI (3.–8.9.2026): tumma asu — kartta tummennettuna, syttyvä valo vaalentaa kohtaa lampun lailla; matkakirja piiloon, luenta ja taustaääni pois; yksinkertainen kilahdus uudesta '
          + 'keksinnöstä, kohahdus vain keksinnön kohdalla (3.9.). Keksijät alarivillä karusellina: nykyinen keskellä isona, muut pienempiä, vasemmalla sumeita; generoidut yhtenäiset värilliset '
          + 'rintapotretit (kuvaputki), kelaus sytyttää kaikki valot kartalle ja pysäyttää esityksen, karuselli vieritetään sormella ja asettuu lähimpään keksijään (3.9., 8.9.). Pysäkin klikkaus '
          + 'avaa TIEDELIITTEEN lehtitaittona: nimiö, päiväys, otsikko, keksijä, ingressi; leipäteksti vasemmalla ja generoitu muotokuva oikealla; havainnekuva(t) karusellina; osio KEKSIJÄ '
          + 'henkilötekstillä (elämä, luonne, sidos vuoteen 1873) ja aidolla Commons-kuvalla; lähderivi; yksi palsta, kuva reunasta reunaan, lyhyt kuvateksti ja pitkä avatussa kuvassa (3.9., 8.9.). '
          + 'Havainnekuva palaa itsestään kartan liikkeen loputtua (8.9.). Yläpalkki Ihmisen matkan tyyliin, Aloita alusta (8.9.). Isoisää ei tunnista 1873-pysäkilläkään — muotokuva kaukaa, '
          + 'havainnekuva ilman kasvoja (8.9.). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #KEKSINNOT-LINSSIN TUMMA ASU JA VAPAA SELAUS, #LINSSIN VIIMEISTELY, #KEKSIJAT LINSSIN '
          + 'ALARIVILLA JA TIEDELIITE, #TIEDELIITTEEN TAITTO, #TIEDELIITE KAIKILLE KEKSIJOILLE JA HAVAINNEKUVAKARUSELLI, #TIEDELIITTEEN ULKOASU: YLAREUNA KUNTOON, LYHYT KUVATEKSTI, YKSI PALSTA, KUVA '
          + 'REUNASTA REUNAAN, EI KLIKKAUSTA VIERITYKSESTA, #KEKSINTOLINSSIN KARUSELLIN KELAUS SYTYTTAA KAIKKI VALOT JA PYSAYTTAA ESITYKSEN, #KEKSINTOLINSSIN KARUSELLI ON SEN AIKASELAIN, JA SE '
          + 'VIERITETAAN SORMELLA, #KEKSINTOLINSSIN YLAPALKKI IHMISEN MATKAN TYYLIIN, JA ALOITA ALUSTA, #KEKSINTOLINSSIN HAVAINNEKUVA PALAA ITSESTAAN, KUN KARTAN LIIKE LOPPUU, #ISOISAA EI TUNNISTA '
          + 'MYOSKAAN KEKSINTOLINSSIN 1873-PYSAKILLA, #OMISTAJAN PAATOKSET KORTILLA 3.9.2026, #LINSSIN VUOSILUKU JUOKSEE JATKUVASTI, PISTEET KLIKATTAVIA, HAVAINNEKUVA SIIRRETTAVA.',
        'IHMISEN MATKA -LINSSI (5.–10.9.2026): nykyihmisen leviäminen Afrikasta koko maapallolle pallolla; ajoitukset haarukkana ja lähteellä, kaikki ovat nykyihmisiä (5.9.). Leviäminen on '
          + 'VÄRIVIRTOJA, ei pisteitä — vanat rannikkoa maalaavina kaistoina, Amerikkaan eriytyvä populaatio omalla värillään (6.–7.9.); yksi kaari, ei pysäkkejä: kertoja kertoo reitin etenemisen, '
          + 'kuvat poksahtelevat kartalle lisäkuvituksena (7.9.); kertoja lukee koko kertomuksen putkeen ja pulu puhuu hiljempaa päälle (9.9.); kertomus soljuva, ei vuosilukuja joka jakson alkuun, '
          + 'jaksot aikajärjestyksessä, ainoa taaksepäin kulku on ääneen kerrottu aikahyppy, Etelä-Afrikka vain kerran (7.–8.9.). Alku: ensimmäinen virke täysin mustalle ruudulle — pimeys on '
          + 'avaruus, kertoja alkaa jo pimeydestä — pallo tähtien keskellä pisteenä, Afrikka täyttää ruudun noin 1,2 s "Afrikasta"-sanan jälkeen, kamera kiihtyy Marokkoon (7.–10.9.). Aloituskortti: '
          + 'Ken Burns -kuvat sumennettuina taustalla, paperi ja lyhyt teksti päällä, Käynnistä alimpana, avaustekstissä ei muotoa "tulet seuraavaksi näkemään" (9.9.); avauslaatikko kokonaan musta, '
          + 'ei pulua (6.9.). Aikajanan ajo: kamera lähempänä, liikkuu pidempään viivaa piirtäen, kello vilistää; alkujaksoissa kamera niin kaukana, että vanan kärki näkyy (6.9., 7.9.). Yksi palkki, '
          + 'ei karusellia; esityksen jälkeen tutkimusvaihe: kaikki nostot klikattavia ja jokaisessa vähintään yksi kuva; linssi muistaa paikkansa (7.9.). Pulu piilossa kunnes teksti on alhaalla, '
          + 'kävelee sitten oikealta sisään (10.9.). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #SEURAAVA LINSSI: IHMISEN MATKA, #IHMISEN MATKA ON VARIVIRTOJA, EI PISTEITA, #IHMISEN '
          + 'MATKA: VANAT RANNIKKOA MAALAAVINA KAISTOINA, EI VIIVA JA HALO, #IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA, #IHMISEN MATKA: KERTOJA LUKEE KOKO KERTOMUKSEN PUTKEEN, PULU PUHUU HILJEMPAA '
          + 'KERTOJAN PAALLE, #IHMISEN MATKA: KERTOMUS SOLJUVAKSI, EI VUOSILUKUJA ALKUUN, PALUU AASIAAN, #IHMISEN MATKA: KELLO EI KULJE TAAKSEPAIN, PAITSI AIKAHYPYSSA, #IHMISEN MATKA: ETELA-AFRIKKA '
          + 'VAIN KERRAN, SELKEAT LAUSEET, YKSI YHTENAINEN LUENTA, JA AVAUS MUSTASTA TAHTIIN JA AFRIKKAAN SANAN KOHDALLA, #IHMISEN MATKA ALKAA MUSTASTA RUUDUSTA, #IHMISEN MATKA: MUSTA ALKU ON '
          + 'AVARUUS, PALLO ZOOMAUTUU PIMEYDESTA AFRIKKA EDELLA, #IHMISEN MATKAN ALKUANIMAATIO: ENSIMMAINEN VIRKE MUSTALLE, PALLO TAHTIEN KESKELLA PISTEENA, AFRIKKA TAYTTAA RUUDUN KUN SE MAINITAAN, '
          + 'KAMERA KIIHTYY MAROKKOON, #IHMISEN MATKA: AFRIKKA TAYTTAA RUUDUN REILUN SEKUNNIN SANAN JALKEEN, #IHMISEN MATKAN ALOITUSKORTTI: KEN BURNS -KUVAT TAUSTALLA, PAPERI JA LYHYEMPI TEKSTI '
          + 'PAALLA, KAYNNISTA ALIMPANA, #IHMISEN MATKAN AVAUSTEKSTI LYHYEKSI, KUVA RINNALLE, #AIKAJANAN AVAUSLAATIKKO: MUSTA TAUSTA, EI PULUA, NAKYVA NAPPI, ELAVA LOIMU JA PAPERI, #AIKAJANAN AJO: '
          + 'KAMERA LAHEMPANA, LIIKKUU PIDEMPAAN VIIVAA PIIRTAEN, KELLO VILISTAA, #IHMISEN MATKA: ETELA-AFRIKASSA KAMERA ULOS, VANA EI SAA HUKKUA, #IHMISEN MATKA: YKSI PALKKI, EI KARUSELLIA, '
          + 'KAIKKIIN NOSTOIHIN KUVA, LINSSI MUISTAA PAIKKANSA, #IHMISEN MATKA: KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA, PULUN VALIHUOMIOT, #IHMISEN MATKA: AFRIKKA 0,7 S SANAN JALKEEN, PULU '
          + 'PIILOSSA KUNNES TEKSTI ON ALHAALLA JA KAVELEE SITTEN OIKEALTA SISAAN, VANOJEN PAAT EIVAT RAPSY.',
        'SATELLIITTILINSSI → ASTRONAUTIN KAMERA (12.9.2026): linssin aineisto on NASAn avaruusasemalta otetut valokuvat Maasta (kaupungit yöllä, tulivuoret, atollit, suistot) — harmaa tutkakuva ei '
          + 'kerro katsojalle mitään; havaintokohteet hohtavina vihreinä pisteinä nykyisellä pallolla, vain ne klikattavia; havaintokuva täyttää ruudun heti, muut otokset pikkukuvina ison päälle, '
          + 'tiedot selitteessä. Uusin asettelu, avaus, ISS ja pulu: Kaupungit-osio (15.–20.9.2026). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #SATELLIITTILINSSI: OIKEITA '
          + 'TUTKAHAVAINTOJA PALLOLTA, #SATELLIITTILINSSIN AINEISTO: ASTRONAUTTIEN MAA-KUVAT, #SATELLIITTILINSSIN HAVAINTO: KUVA KOKO RUUTUUN, TIETO INFO-NAPIN TAAKSE.',
        'ÄÄNET JA MUSIIKKI (3.–14.9.2026, tarkennus 9.10.2026): musiikkimoottori on Google Lyria 3.5; ElevenLabs Musicia ei käytetä musiikkiin lainkaan (omistaja 9.10.2026), ja vaihtoehdoiksi '
          + 'voidaan etsiä oikeita, ihmisen säveltämiä vapaita kappaleita (CC0/CC BY, ei NC/ND) — Olavinlinnan loppumusiikki The Bard\'s Tale (RandomMind, CC0) pysyy; pelin jokaiselle kohtaukselle '
          + 'oma Lyria-raita (linssit, lehti, laukku, kohtaaminen, välinäytös, loppu; kartalla vain kaupungin oma kappale, ks. KARTAN MUSIIKKI), luennat lyhyitä (5.9.). MUSIIKKIPROMPTIT (omistaja '
          + '11.10.2026 klo 12.5x): Lyria-kehotteet ovat lyhyitä ja pelkästään myönteisiä kuvauksia, ei kieltoja (esim. "ei säröä"). Taustamusiikin perustaso selvästi kertojan ja pulun alle; '
          + 'hammasrattaan säädin ohjaa kaikkea pelin musiikkia yhden kertoimen kautta ja toimii myös iOS Safarissa (Web Audio GainNode, logaritminen väli) (8.–9.9.); MIKSERI (omistaja 9.10.2026, '
          + 'korvaa 11.9. liukulistan): mikseri on kehittäjän työkalu, joka näkyy vain kehittäjäkoodilla; muut pelaajat eivät näe mikseriä vaan saavat valmiit tasot. Tasot ovat peli- ja '
          + 'linssikohtaisia; jokaisella ryhmällä (kertoja ja puhe, repliikit, musiikki, tehosteet, äänimaisema, sää, pulu) on master-säädin ja pieni väkänen, joka avaa ryhmän yksittäiset äänet omin '
          + 'säätimin — yleinen tapa kaikissa peleissä ja linsseissä, ja jokainen soiva ääni rekisteröityy mikseriin. Tallenna kaikille -nappi (vain kehittäjäkoodilla) tallentaa omistajan tasot '
          + 'workerin kautta kaikkien pelaajien oletuksiksi; kehittäjäkoodi tarkistetaan palvelimella. Pulu ja kertoja eivät puhu päällekkäin; poikkeus: pulun huudahdus kesken luennan soi hiljempaa '
          + 'päälle pysäyttämättä lukijaa (8.9.); pulun äänissä ei numeroita, vuosiluvut sanoina (8.9.). Striimattu äänimaisema on musiikkikytkimestä riippumaton (7.9.). Sarajevon ambienssi ilman '
          + 'jatkuvaa kellonsoittoa; kehittäjän Musiikki-sivu listaa raidat (3.9.). PULUN ÄÄNI on päätetty: ElevenLabs Flicker piI8Kku0DcvcL6TTSeQt, malli eleven_v4_turbo (ks. ÄÄNIVALINTA ja MALLI '
          + 'Ydinajatus-osiossa), muuten ElevenLabsin oletusasetukset; Pulun v4-tiedostot tasoitetaan -17,2 LUFS:iin (28.9.; ks. ÄÄNET PCM:NÄ, PAKKAUS KERRAN), tahtia säädetään tageilla (12.–14.9.); '
          + 'pulun repliikit lyhyitä, vokaalisia, tehosteet (kaiku saapuessa) (6.9.); pulun äänen perustaso hieman kertojan alle (8.9.). ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA: jokaisen '
          + 'maksullisen äänigeneroinnin raakatuotos tallennetaan ämpäriin versionoituun avaimeen ennen mitään käsittelyä ja kuitti kirjaa avaimen ja tarkistussumman; raakatiedostoa ei koskaan '
          + 'poisteta eikä ylikirjoiteta (14.9.). Äänen osoite syntyy tekstin tiivisteestä, joten hionta mitätöi äänitteen (12.9.). Fable ei tarkista Codexin isoisä- ja pulutekstejä sisällöllisesti '
          + '(13.–14.9.). play()-kutsu ei ole ääni — mitataan currentTime (20.9.2026, Kaupungit-loki). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #LYRIA PELIIN, ELEVENLABSIN MUSIIKKI '
          + 'POIS, #MUSIIKKIA KAIKKIIN KOHTIIN, LUENNAT LYHYITA, #TAUSTAMUSIIKKI HILJEMMALLE JA RATTAAN SAADIN OHJAA KAIKKEA MUSIIKKIA, #TAUSTAMUSIIKIN SAADIN TOIMII OIKEASTI JA LAAJALLA VALILLA, '
          + 'MYOS IPHONELLA, #KAIKKI AANENTASOT SAMASSA LISTASSA, #AANENTASOT HAMMASRATTAASEEN, PULUCAM VASTA PULUN REPLIIKISTA, TOINEN LUENTAKUVA PUOLIVALISSA, #PULU JA KERTOJA EIVAT PUHU '
          + 'PAALLEKKAIN, JA PULUN AANISSA EI NUMEROITA, #PULUN HUUDAHDUS EI KESKEYTA LUKIJAA, JA KUPLAPINO NAKYY KAHDEKSAAN RIVIIN ASTI KUNNES KARTTA LIIKKUU, #VIAT v1672: NOSTON TEKSTI '
          + 'KLIKATTAVAKSI, AANIMAISEMA IRTI MUSIIKISTA, #SARAJEVON AANIMAISEMA VAIHDETAAN JA KEHITTAJAN VOIMAKKUUSSAATIMET, #KEHITTAJAN MUSIIKKISIVU, #PULUN AANI ON FLICKER, V3-MOOTTORILLA, #PULUN '
          + 'AANI: ELEVENLABSIN OLETUSASETUKSET, EI FFMPEG-KASITTELYA, #PULUN AANESSA EI OLE FFMPEG-NOPEUTUSTA, #PULU PUHUU: OMA AANI, LYHYET REPLIIKIT, TEHOSTEET, #PULUN AANI HIEMAN HILJAISEMMAKSI '
          + 'JA KUPLAT TYHJIKSI UUDESSA KAUPUNGISSA, #ALKUPERAISET AANITIEDOSTOT SAILYTETAAN AINA, #AANIA EI GENEROIDA ILMAN LUPAA, EIKA ENNEN KUIN TEKSTIT OVAT VALMIIT, #KOKO EUROOPAN LUENNAT '
          + 'VALTUUTETTU CODEXILLE, #AANI-HOLD PURETTU, FABLE EI ENAA TARKISTA CODEXIN TEKSTEJA, CODEXIN PAKETTI OHITUSKAISTALLE, #PULUN AANET AJETAAN UUDESTAAN NORMAALILLA NOPEUDELLA, HISTORIA '
          + 'ENSIN.',
        'KARTAN MUSIIKKI (omistaja 10.10.2026 klo 11.1x, sitova, kortin vastaus "vain kaupunkien omat kappaleet"): kartalla soi vain kaupungin oma kappale kyseisessä kaupungissa, ja kaupungista '
          + 'lähtiessä kappale häipyy. Pois ovat pohjavire, alue-, maanosa-, saapumis- ja siirtymämusiikit sekä aloituslennon marssi (Päätoimittajan tulkinta 11.5x: aloituslento ilman musiikkia, '
          + 'ensimmäisen kaupungin kappale perillä). Pariisin nopea alku → tauko → hidas säilyy. SOITTOSÄÄNTÖ (omistaja 11.10.2026 klo 15.5x): kaupungissa soi ensin nopea intro (tehdään kaikille '
          + 'Euroopan kaupungeille) ja sitten hidas kappale nopeaa hiljempaa ja vain kerran, minkä jälkeen musiikkia ei ole ennen seuraavaa kaupunkia. Oman pelissä olevan 1800-luvun kappaleensa '
          + 'pitävät Ateena, Pariisi, Lontoo, Rooma, Istanbul, Kairo ja Pietari; muille kaupungeille arvotaan joka saapumisella yksi kymmenestä uudesta hitaasta kappaleesta (ei samaa peräkkäin), '
          + 'eikä hitaita tehdä toistaiseksi enempää. Linssien, pelien ja tilaraitojen musiikit ovat ennallaan. Tavoite on oma kappale jokaiselle kaupungille (Eurooppa ensin) ja myöhemmin oma '
          + 'moderni alkumusiikki kuten Pariisissa; uudet kappaleet menevät omistajan kuunneltaviksi äänisivulle ennen peliin vientiä (1. erä 16 kappaletta 10.10.2026, Lyria 3.5, yksi otto; loput '
          + 'kuuntelun jälkeen).',
        'ÄÄNISIVU OMANA SUOJATTUNA SIVUNA (omistaja 10.10.2026 klo 18.2x: "täytyy tehdä musiikista sitten ennemmin oma nettisivu githubin tms kautta. saatko ladattua artefaktista nykyiset tiedot '
          + 'sinne ja liitettyä nämä uudet?" ja kortti "Suojattu sivu"): pelin äänet ja kappaleet kuunnellaan sivulla https://matkakirja-aanet.pages.dev/ (Cloudflare Pages + Access: aukeaa vain '
          + 'omistajan sähköpostikirjautumisella kertakoodilla, istunto 30 vrk), koska ostetut tehosteet ja vertailukappaleet eivät saa olla julkisia. Julkaisija ylläpitää sivua (lisäys yhdellä '
          + 'komennolla /Users/Shared/Claude/julkaisija-tyokalut/aanisivu-lisaa.py, ohje aanisivu-OHJE.md); sivulle siirrettiin jaetun äänisivuartefaktin (Qr7WvfZvKiNxGNwbFEeW2t) 485 tiedostoa. Syy '
          + 'siirtoon (testattu 10.10.2026): toisen organisaation jakamaan artefaktiin vieras tili voi julkaista vain sivuja, tyylejä, skriptejä, tekstidataa, kuvia, videoita ja fontteja, ei ääntä, '
          + 'eikä sitä voi kiinnittää muokkausoikeudesta huolimatta. VALINNAT (omistaja 11.10.2026 klo 09.3x: "saisiko äänisivuille suoraan checkboxit niille jotka ovat hyviä näytteitä ja napin ylös '
          + '"lähetä claudelle" tms"): jokaisella näyterivillä on valintaruutu, joka tallentuu heti palvelimelle (Pages Function, Accessin takana), ja ylhäällä Lähetä Claudelle (N) ja valinnainen '
          + 'viesti; Äänittäjä (11.10.2026 klo 18.3x alkaen) lisää uudet kappaleet sivulle, lukee uudet lähetykset (tools/aanisivu/valinnat.mjs) ja reitittää ne (pelin kytkennät Pelikoodarille, '
          + 'taidemuseon äänet Linssiseppä 2:lle), ja Päätoimittaja kuittaa omistajalle lyhyesti; aanisivu-lisaa.py pysyy yhteensopivana.',
        'KAUPUNGIN ESITTELY ON SAAPUMISESITYKSEN JATKE (omistaja 10.10.2026 klo 16.5x ja 17.3x: "Pariisin esittelyhän ei pitäisi liittyä siihen [kuumailmapalloon] mitenkään vaan se pitää tulla kun '
          + 'pelaaja saapuu kaupunkiin ja korvaa tai jatkaa sitä nykyistä kolmen kuvan esittelyä joka tulee nyt jokaiseen kaupunkiin saavuttaessa"): kaupungin nykypäivän esittely jatkaa '
          + 'saapumisesitystä luennan kolmen kuvan jälkeen samalla pakalla ja Ohita-napilla; nykykuvat (Pariisissa C1–C5) tulevat kaupungin modernin alkumusiikin tahdissa, ja Ohita tai lähtö '
          + 'lopettaa. Kuumailmapallo aukeaa aina ilman esittelyä ja sen musiikkia (Pariisi ensin, juna 179).',
        'PULU PELISSÄ — HAHMO, ELEET JA REAKTIOT (3.–13.9.2026): linsseissä minipulu (15.9.); pulu leijuu kartan liikkeen ajan ja laskeutuu pysähdyttyä (11.9.); nokkii karttaa levossa 30 s '
          + 'hiljaisuuden jälkeen (11.9.); pullan ostaminen laukaisee pullariemun (bunFeast) joka kaupunkilehdessä ja sähkeen pullamaksuissa (11.9.); odotusrepliikit (52) mapattu täsmällisiin '
          + 'eleisiin, pyyntökohtainen asioille lähtö ja paluu vastauksen kera (11.9.); pikselikasvot tulossa omistajalta, B-kasvo väliaikainen (10.9.). PULU REAGOI TEKSTIN SISÄLLÄ: kaikki '
          + 'matkakirjat tagitetaan läpi tekstin, perusasento yläviistokatse, perusilmeet ja pelisynkronointi ensin, rekvisiitta myöhemmin (11.9.); reaktiorekisteri docs/pulu-reaktiot.md on elävä — '
          + 'jokainen merkityksellinen pelitilanne kirjataan reaktiota varten (10.9.); pulu reagoi myös lehdessä, laukussa ja visassa (ei asetuksissa tai ilmoituksissa), aarteen löytö yksi iso ele, '
          + 'raha vain pankkiapu, pitkä odotus kerran (11.9.); puhelimen lehdessä pulu oikeaan reunaan, reagoi myös artikkelin chatissa (11.9.). Livia kommentoi matkakirjaa myös ensimmäisessä '
          + 'kaupungissa (3.9.). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #PULU LEIJUU KARTAN LIIKKEEN AJAN, #PULU NOKKII KARTTAA LEVOSSA, #PULUN PULLARIEMU JOKAISESSA '
          + 'KAUPUNKILEHDESSA, #ODOTUSREPLIIKIT MAPATAAN SOPIVIIN ANIMAATIOIHIN, #PULUN PIKSELIKASVOT TULOSSA; B-KASVO ON VALIAIKAINEN PELIKOKEILU, #PULU REAGOI TEKSTIN SISALLA: KAIKKI MATKAKIRJAT '
          + 'TAGITETAAN LAPI TEKSTIN, PERUSASENTO YLAVIISTOKATSE, PERUSILMEET ENSIN, #PULUN REAKTIOREKISTERI: JOKAINEN PELITILANNE KIRJATAAN REAKTIOTA VARTEN, #PULU REAGOI MYOS LEHDESSA, LAUKUSSA JA '
          + 'VISASSA; AARRE YKSI ISO ELE; RAHA VAIN PANKKIAPU; PITKA ODOTUS KERRAN, #PUHELIMEN LEHDESSA PULU OIKEAAN REUNAAN; PULU REAGOI ARTIKKELIN CHATISSA JA CHAT LAHEMMAS PULUA, #LIVIA KOMMENTOI '
          + 'MATKAKIRJAA MYOS ENSIMMAISESSA KAUPUNGISSA.',
        'PULUN KUPLAT JA CHAT (3.–13.9.2026; pluskupla 18.9.): kuplat pinoutuvat, uusi vanhan alle; oletuksena näkyvissä vain viimeisin kupla, vieritys laajentaa kahdeksaan riviin, kartan liike '
          + 'supistaa; edellisen kuplan alaosa pilkottaa häipyen, ensimmäisen kuplan yläreunaa ei häivytetä (7.9., 10.9.); kuplat piiloutuvat itsestään 3 s puheen jälkeen tai kartan liikkeestä '
          + '(11.9.); kupla sulkeutuu napauttamalla (sulkuruksi pois) (13.9.); pluskupla on poistettu ja chatin ylärivillä on "Näytä puhekuplat" (18.9.2026, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 20, '
          + 'Kaupungit-loki); saapuminen uuteen kaupunkiin tyhjentää kuplapinon (8.9.); automaattiset kuplat eivät näy chatin historiassa (11.9.). Pulun kaupunkikommentti: yksi kupla per kaupunki, '
          + 'enintään 125 merkkiä, kaksi asiaa (mikä on nyt toisin / mikä yhä ennallaan), pulun näkökulma tärkein, huudahdus luennan väliin vain noin puolessa kaupungeista, kommentit avaavat '
          + 'nykypäivää, yksinkertaiset lauseet, kuittaus isoisälle ekstrakuplana joissain kaupungeissa (8.9.); pulun alustukset ennen luentaa pois (8.9.). Saapumisen jälkeen chat aukeaa parilla '
          + 'valmiilla kysymyksellä isoisän ja pulun teksteistä, aiemmat viestit vieritettynä ylös, tervehdys vain kerran (11.9.); kartta lentää pulun vastauksesta vain sijaintikysymyksistä (11.9.). '
          + 'Chatin "kysyn pöllöltä" -odotuksessa pulu käy jossain ja palaa vastauksen kera; juhlakupla tietäjätasosta Livian pinoon (3.9.). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md '
          + '#LIVIAN KUPLAPINO, #PULUN KUPLAT: VAIN VIIMEISIN, HISTORIA CHATISSA, #KUPLAPINON KAHDEKSAN RIVIN KATTO, LINSSIN PALUU JA RATTAAN SIIVOUS, #PULUN KUPLAPINO: EDELLINEN KUPLA PILKOTTAA '
          + 'HAIPYEN, #ENSIMMAISEN PULUKUPLAN YLAREUNAA EI HAIVYTETA, #KUPLAT PIILOON ITSESTAAN, PLUS PALAUTTAA, CHAT SISALTOON SIDOTUKSI, #PULUN PUHEKUPLAT SULKEUTUVAT NAPAUTUKSESTA JA IMEYTYVAT '
          + 'PLUSKUPLAAN, #PULULLA YKSI KUPLA PER KAUPUNKI, #PULUN KUPLASSA PULUN NAKOKULMA, RAJA 125, JA KUITTAUS ISOISALLE EKSTRA KUPLANA JOISSAIN KAUPUNGEISSA, #PULUN KAUPUNKITEKSTIT UUSIKSI: '
          + 'PUOLET HUUDAHDUKSISTA POIS, KOMMENTIT AVAAVAT NYKYPAIVAA, YKSINKERTAISET LAUSEET, #PULUN ALUSTUKSET POIS, JA MATKAKIRJAN OTSIKKO ON PAIKKA JA AIKA, ALLA KURSIIVILLA SAAN JA TUNNELMAN '
          + 'RIVI, #PULUN UUSI RYTMI ATEENASSA JA LEHTIVINKKI KERRAN, #SAAPUMISEN JALKEEN CHAT AUKEAA PARILLA VALMIILLA KYSYMYKSELLA, TERVEHDYS VAIN KERRAN, #KARTTA LENTAA VAIN SIJAINTIKYSYMYKSISTA, '
          + '#OMISTAJAN PAATOKSET KORTILLA 3.9.2026.',
        'MATKAKIRJA JA HORATIO (5.–13.9.2026): isoisän matkakirjatekstin yleinen yläraja on 400 merkkiä (hyväksytyt 360–400, lyhyet laajennetaan), pituus aina näkyviin merkkeinä (8.9.); '
          + 'pelikaupunkien Bryssel, Ljubljana ja Košice kaaritekstit enintään 450 merkkiä, vanhoja tekstejä ei lyhennetä (19.9., Fable 20.9.); otsikko on paikka ja aika ("Sarajevo, syyskuussa '
          + '1873") ja alla kursiivilla sään ja tunnelman rivi (8.9.); isoisän tekstin lyhennys on pois päältä, merkintä kokonaan ja luenta loppuun (13.9.). Horation oma sanasto on viisi meri- ja '
          + 'mittaussanaa, jotka toistuvat kaupungista toiseen ja jotka Livia tulkkaa kuplassaan: PEILAUS, PAINOLASTI, K3, YÖVAHTI, LAKKIPISTE; G. on nimi (Grimshaw) (9.9.); Horatio ymmärtää '
          + 'paikallisen kielen väärin noin kahdessatoista kaupungissa, Livia osaa kaikki kielet, oudot sanat opitaan kontekstista (8.9.); kaanonin pahuuden rajaus on poistettu (8.9.); isoisä jää '
          + 'arvoitukseksi: kuvat ovat hänen ottamiaan tai hänestä tunnistamattomia, kasvokuvaa ei tehdä (5.9., 8.9.). Koko Eurooppa kulkee fokusvirtapakkien kautta, europe-saapumiset arkistoitu EI '
          + 'ENÄÄ KÄYTÖSSÄ -otsikolla (8.9.). Matkakirjakortti aukeaa saapumisessa ja palaa auki luennan ajan kartan liikkeen jälkeen (10.9.; puhelimella piilossa ja trailerin ajan piilossa: '
          + 'Kaupungit-osio). Kaanonimuutos kuvan takia vain omistajan päätöksellä (Oslo Liv, Pietari Polina, Sarajevo Adnan, 12.9.). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md '
          + '#MATKAKIRJAN TEKSTIN YLARAJA 400 MERKKIA, PITUUS AINA NAKYVIIN, JA LOPUT EUROOPAN TEKSTIT UUSIKSI YHTENA ERANA KOOSTEEKSI, #ISOISAN TEKSTIN LYHENNYS ON POIS PAALTA, #HORATION SANASTO '
          + 'KARSITTU VIITEEN JA JUURRUTETTU MEREEN JA MITTAUKSEEN, #HORATION OMA KIELI: KAHDEKSAN SANAA, JOTKA TOISTUVAT JA JOTKA LIVIA TULKKAA, #HORATIO YMMARTAA PAIKALLISEN KIELEN VAARIN, LIVIA '
          + 'OSAA KAIKKI KIELET, JA OUDOT SANAT OPITAAN KONTEKSTISTA, #ISOISA EI KIRJOITA KENELLEKAAN, JA PAHUUDEN RAJAUS POIS KAANONISTA, #ISOISA JAA ARVOITUKSEKSI, #KOKO EUROOPPA KULKEE '
          + 'FOKUSVIRTAPAKKIEN KAUTTA, EUROPE-SAAPUMISET ARKISTOON, #MATKAKIRJAKORTTI AUKEAA SAAPUMISESSA JA PALAA AUKI LUENNAN AJAN KARTAN LIIKKEEN JALKEEN, #KAANONI VAISTYY KUVAN TIELTA, KUN KUVA '
          + 'ON PAREMPI, #KAUPUNGIN KULKU: EI KUVIA, PULU - LUENTA - PULU - LEHTI.',
        'LUENTAKUVAT JA PULUCAM (9.–11.9.2026; asettelu saapumisessa: Kaupungit-osio): matkakirjan luennan aikana kartan päällä näkyy isoisän luentakuva (postilaatikon kuvatoimitus), toinen kuva '
          + 'luennan puolivälissä (9.9., 11.9.); PULUCAM: pulun nykyajan laajakulmakuvat (n. 14 mm) pakkana isoisän kuvan päälle pulun repliikin alkaessa, tavallinen kohde 1–3 kuvaa, rakkauskohtaus '
          + '3–5 sydänreunoin, musteensininen PULU CAM -sinetti kuvan oikeassa yläkulmassa (9.9.); kuvat tehdään suoraan peliin tekstisession prompteista (9.9.). Kaksi kuvatekstiä sekä isoisän että '
          + 'pulun kuviin: lyhyt suoraan kuvan alla (ei havainnekuvalinkkiä), pitkä (300–600 merkkiä, oma kertova teksti) vasta koko ruudun näkymässä; havainnekuvalinkki vain pitkässä; LYHYT '
          + 'KUVATEKSTI SIVULLA, PITKÄ VASTA AVATUSSA KUVASSA on sääntö kaikkiin pelin kuvateksteihin (9.9., 12.9.); albumin suurennoksessa lyhyt kuvateksti ja havainnekuvamerkintä vain kerran '
          + '(10.9.). Pakassa päällimmäisen kortin kuvateksti kiinni kortin alalaidassa, alemman kuvan napautus nostaa sen päälle (10.9.); luentakuvassa ei kehystä, varjo saa jäädä (9.9.); kuvapino '
          + 'kolme vaihetta: pieni, viuhka, koko ruutu (11.9.); pieni kuva pienenee kartan tahdissa (11.9.); luentakuvaa voi liikuttaa ja se on ankkuroitu kartan kohtaan (9.9.); iPadilla '
          + '1,5-kertainen (10.9.). Kuvagalleria ("Lisää kuvia tästä kohteesta/kaupungista") pois koko pelistä, KUVAGALLERIA_KAYTOSSA epätosi (11.9.). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-03--09-14.md #POSTILAATIKOSTA TULEE LUENTAKUVIA KARTAN PAALLE JA UUSIA EUROOPAN TEKSTEJA, #PULU-CAM: PULUN NYKYAJAN KUVAT PAKKANA ISOISAN KUVAN '
          + 'PAALLE, YHTEINEN KARUSELLI, #PULU-CAM: RAKKAUSKOHTAUS 3-5 KUVAA, KAKSI KUVATEKSTIA MOLEMMILLE, HAVAINNEKUVA-LINKKI PITKAN LOPUSSA, TARRA YHTENA PNG:NA OMISTAJAN VALINNASTA, #PULU-CAM: '
          + 'NOIN 14 MM:N LAAJAKULMA JA RAKASTUMISKUVIIN SYDANREUNAT, #PULUCAM-MERKKI ON MUSTEENSININEN SINETTI OIKEASSA YLAKULMASSA, B JAA ARKISTOON, #PULUCAM SUORAAN PELIIN VAIN TEKSTISESSION '
          + 'PROMPTEISTA; TARRA B; ISOISAN KUVISTA UUSITAAN VAIN TEKSTIIN OSUMATTOMAT, #LYHYT KUVATEKSTI SIVULLA, PITKA VASTA AVATUSSA KUVASSA - SAMA SAANTO KAIKKIIN PELIN KUVATEKSTEIHIN, '
          + '#HAVAINNEKUVALINKKI VAIN PITKASSA KUVATEKSTISSA, #ALBUMIN SUURENNOKSESSA LYHYT KUVATEKSTI, HAVAINNEKUVAMERKINTA VAIN KERRAN, #PULUN KUVALLE KUVATEKSTI, PAKAN ALEMMAN KUVAN NAPAUTUS '
          + 'NOSTAA SEN PAALLE, MATKAKIRJA PALAA HETI JA PYSYY PAKKAA SELATTAESSA, KUVA YLEMMAS LAATASTA, #PULUN KORTIN KUVATEKSTI KIINNI KORTIN OMASSA ALALAIDASSA, #ISOISAN LUENTAKUVASSA EI '
          + 'KEHYSTA, KUVATEKSTI KIINNI KUVAN ALALAIDASSA, #LUENTAKUVA ISOMPANA, VINOSSA JA ILMAN LAATIKKOA; LYHYT KUVATEKSTI OMASSA VAALEASSA LAATIKOSSA; KARTAN LIIKE PIENENTAA, EI PIILOTA, '
          + '#KUVAPINON KOLME VAIHETTA: PIENI, VIUHKA, KOKO RUUTU, #KARTAN ESINEET PIENENEVAT KARTAN TAHDISSA, #PIENENNETTY LUENTAKUVA KARTAN MITTAKAAVASSA, #LUENTAKUVAA VOI ITSE LIIKUTTAA, JA SE ON '
          + 'ANKKUROITU KARTAN KOHTAAN, #LUENTAKUVA IPADILLA PUOLTA ISOMPANA, #KAIKKI EUROOPAN ISOISAN JA PULUN KUVAT PELIIN; TEKSTISESSIO KYTKEE, #KUVAGALLERIA POIS KOKO PELISTA.',
        'LEHDET, NOSTOT JA GALLERIAT (4.–12.9.2026): nosto aukeaa kuva edellä — ensin lähes koko ruudun kuva ja lyhyt kuvateksti, LISÄÄ-nappi avaa tekstin, kuva ei liiku (11.9.); auki oleva nosto ei '
          + 'sulkeudu vierittämällä ja alkaa ruudun yläreunasta (12.9.); noston nimilappu on osa osumapintaa (7.9.); jokaisessa nostossa havainnekuvan lisäksi vähintään yksi oikea valokuva '
          + 'julkisesta lähteestä (12.9.); kuvan suurennos: vastakkainen suunta täyttää ruudun, sama suunta jättää reunan (8.9.); gallerioiden selausalueet kapeat reunakaistat, keskeltä klikki '
          + 'suurentaa (9.9.); lehden sivunkääntö ei pompauta sisältöä — vierityspalkki ei muuta sivun leveyttä (9.9.); kohdekartan kohteiden nimet vain zoomattuna (4.9.); lehden Tapaa-nappi pois '
          + '(6.9.); välinäytös ilman korttia, yksi tauko/jatka-nappi, kuvakierto (4.9.). Kirjastot: StPageFlip (sivunkääntö, kääntöteatteri) ja Tuna (tehosteketjut: megafoni, radio, luola) '
          + 'käytössä; säännöt kaikille valmiille kirjastoille: ämpärin vendor/-polusta (ei repoon eikä CDN:stä tuotannossa), laiska lataus ja virhehaara, kartoitus ei ole linjaus (5.9.). '
          + 'Kaupunkilehden korvaaminen liuskalla ja aarteen etsinnän alku: Kaupungit-osio. Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #NOSTO AUKEAA KUVA EDELLA, KUVA EI LIIKU, #AUKI '
          + 'OLEVA NOSTO EI SULKEUDU VIERITTAMALLA, JA SE ALKAA RUUDUN YLAREUNASTA, #JOKAISEEN NOSTOON MYOS OIKEA VALOKUVA, #KUVAN SUURENNOS: VASTAKKAINEN SUUNTA TAYTTAA, SAMA SUUNTA JATTAA REUNAN, '
          + '#GALLERIOIDEN SELAUSALUEET KAPEAMMIKSI, KESKELTA KLIKKI SUURENTAA, #LEHDEN SIVUNKAANTO EI SAA POMPAUTTAA SISALTOA: VIERITYSPALKKI EI MUUTA SIVUN LEVEYTTA, #KOHDEKARTAN NIMET VAIN '
          + 'ZOOMATTUNA, #LEHDEN TAPAA-NAPPI POIS, #VALINAYTOS ILMAN KORTTIA, YKSI TAUKO/JATKA-NAPPI, KUVAKIERTO, #KIRJASTOT KAYTOSSA, #VALMIIT KIRJASTOT: STPAGEFLIP ENSIN.',
        'KEHITTÄJÄTILA JA VALIKOT (5.–13.9.2026): Raamattu on muokattavissa pelissä — jokaisen sivun kohdat ovat omistajalle tekstikenttiä ja Lähetä muutokset lähettää muuttuneet ehdotuskanavaan '
          + '(RAAMATTU-olio ei muutu, vain Fable kirjoittaa tiedostoon); työhuoneen valikko on kaksi nappia (Raamattu, Kehittäjälehti) alimmaisina ilman Työhuone-otsikkoa (11.9.); kehittäjävalikon '
          + 'vivut pois ja ilme pois päältä, äänisäätimiin tehosteet, pulu ja lukija (11.9.); vaakapuhelimella ei yläpalkkia: oikean yläkulman hampurilainen avaa päävalikon suoraan napin päälle, '
          + 'koska valikossa ovat palkin tiedot (2.10.; ennen 13.9. väkänen toi palkin väliaikaisesti; päävalikon ikoni alkuperäinen, 14.9., Kaupungit-osio); kohtaamislista kehittäjätilaan '
          + 'maanosittain kaikkien aarrekohtaamisten testaamiseen (5.9.); kehittäjän maailmanäkymään sama saapumiszoom kuin pelissä (11.9.). TESTFLIGHT JA APP STORE (omistaja 7.10.2026 klo 12.5x, '
          + 'sitova): versionumeron napautus avaa Mitä uutta -listan, jonka Kehittäjätila-nappi kysyy koodin; kehittäjäkoodi avaa kehittäjätilan myös TestFlight- ja App Store -käännöksissä, ja '
          + 'toinen koodi avaa TESTAAJATILAN (kaikki linssit heti näkyviin ja vapaa liikkuminen kartalla, ei äänisäätimiä eikä muita syvempiä kehittäjätoimintoja), jota omistaja antaa '
          + 'beetatestaajille; koodeja ei kirjoiteta repoon (vain tiiviste), ja avaimet ovat vain ajon aikana laitteen avainnipussa. Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #RAAMATTU '
          + 'MUOKATTAVAKSI PELISSA JA TYOHUONEEN VALIKKO KAHTEEN NAPPIIN, #RAAMATTU JA KEHITTAJALEHTI ALIMMAISINA, ILMAN OTSIKKOA, #KEHITTAJAVALIKON VIVUT POIS, ILME POIS PAALTA, AANISAATIMIIN '
          + 'TEHOSTEET, PULU JA LUKIJA, #YLAPALKKI PIILOSSA VAAKAPUHELIMELLA, #KOHTAAMISTEN TESTITILA JA EUROOPPA ENSIN, #MAAN NIMI, INFOLAATIKKO JA MAALEHTILINKKI TAKAISIN; SAAPUMISZOOM MYOS '
          + 'KEHITTAJAN MAAILMATILAAN.',
        'SISÄLTÖTUOTANNON LAAJUUS JA IDEAT: karttanostojen tavoite 8 kohdetta + 3 maastoa + 1 eläintäky + 2 skandaalia per maa kaikkiin 112 maahan (6.9., mittari tools/laske-karttanostot.mjs) on '
          + 'PITKÄN AIKAVÄLIN TAVOITE, ei työjonossa; sisältötyön rajaus on kohdassa VAIN EUROOPPA, KUNNES OMISTAJA TOTEAA SEN VALMIIKSI (Ydinajatus). Eläinkuviin tarinaa ja toimintaa, samasta '
          + 'aiheesta saa olla kaksi kuvaa (5.9.). Ideat hautumaan: pelinappula-avatarit (pöllö, kotka, hevonen), kauppa ja tuunatut linssit (4.9.); Vanhin maailmankuva -linssi (1500-luvun projektio '
          + 'pallon päällä) (5.9.). Loki: docs/raamattu-loki/paatokset-2026-09-03--09-14.md #MAAILMA VALMIIKSI, PAITSI TEKSTIT JA AARREKAARI, #KARTTANOSTOT KOKO MAAILMAAN, LEHDET JATKUVAT, '
          + '#ELAINKUVIIN TARINAA, KAKSI KUVAA SAMASTA AIHEESTA, #IDEA HAUTUMAAN: AVATARIT, KAUPPA JA TUUNATUT LINSSIT, #PELAAJAN LAUTAKYTKIN, VANHIN MAAILMANKUVA -LINSSI, ETUSIVUN PALLO, #IDEA '
          + 'JONOON: LYRIA 3.5 MUSIIKKIIN.',
        'MAC STUDIO: UUDEN SESSION ALOITUS ILMAN OMISTAJAN OHJETTA, JA MISSA AVAIMET OVAT (omistaja 18.9.2026 klo 09.50 Suomen aikaa: uudet sessiot ajavat Macilla suoraan ilman omistajan ohjetta, ja '
          + 'kaikkien avainten sijainnit on listattu tähän): A) ALOITUS MACILLA: tyokansio /Users/Shared/Claude/Matkakirja-<rooli> (Ydinajatus, TYÖTAPA JA SESSIOT, B) TYÖTILAT, omistaja 23.9.2026); '
          + 'lue CLAUDE.md, docs/roolitus.md ja taman Raamatun osiot AGENTIT VAIN OPUS JA SONNET (tarkennukset 1-8); agentit Agent-tyokalulla Opus/Sonnet, enintaan kolme rinnakkain, '
          + 'worktree-eristys, aikakatto 45 min, ei PR:ia agenteilta, yksi kohdemittaus, commit+push heti; Savukkeet ajaa Macin runnerilla PR:ssa (SamiMacStudio2, launchd). Ymparisto: node '
          + '/opt/homebrew/opt/node@22/bin, Playwright-moduuli roolikansion node_modules/playwright/index.js (PLAYWRIGHT_JS), Chromium '
          + '~/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing (CHROMIUM), WebKit '
          + '~/Library/Caches/ms-playwright/webkit-2336; savukkeille PORTTI-ymparistomuuttuja rinnakkaisajoihin; worktreessa git-identiteetti `-c user.name=ravelius -c '
          + 'user.email=sami@valokuvaamoklik.fi`; gh on kirjautunut tilille ravelius (keyring; scopet repo, workflow); curl on estetty, kayta Nodea; tilapaiset tiedostot session scratchpadiin. '
          + 'Codexille viesti vain tilauksesta (kuvat, aanet). B) AVAIMET - MISSA NE OVAT (arvoja ei koskaan kirjoiteta repoon, lokiin eika viestiin; omistajalta EI kysyta avaimia): 1) MACIN '
          + 'YMPARISTO ~/.zshrc (lataa `source ~/.zshrc`): AWS_ACCESS_KEY_ID ja AWS_SECRET_ACCESS_KEY = R2-avain, AMPARI = ampari, PAATE = R2-paatepiste - amparivienti Macilta: `aws s3 cp ... '
          + '--endpoint-url $PAATE` (esim. reliefipyramidi 18.9.2026), ELEVEN_API_KEY = ElevenLabs (koodaus-käyttäjän ~/.zshrc, 29.9.2026: Bash-työkalun kuori ei lataa .zshrc:tä itse, joten `source '
          + '~/.zshrc` samaan komentoon ennen generointia; omistaja ei anna avainta erikseen), XAI_API_KEY ja POLLO_KEHITTAJAKOODI = ~/.matkakirja-avaimet-koodaus.zsh; 2) GITHUB ACTIONS SECRETS '
          + '(repo ravelius/Matkakirja; kaytto vain tyonkulkujen kautta workflow_dispatchilla, esim. generoi-pyramidi.yml, patinoi-fokus.yml, savuke-pollo.yml, aani- ja kuvatyonkulut): '
          + 'R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, ANTHROPIC_API_KEY, ANTHROPIC_ADMIN_KEY, OPENAI_API_KEY, OPENAI_ADMIN_KEY, '
          + 'ELEVEN_API_KEY (ElevenLabs-luennat), GOOGLE_API_KEY (Googlen laskutusvientiä EI ole secreteissä; Asemataulun Google-palkki peruttu 16.10.2026 klo 16.47, palvelutiliavainta ei ole), EUROPEANA_API, FLICKR_API_KEY, FREESOUND(_API/_API_KEY/_AVAIN/_TOKEN), EHDOTUS_AVAIN, '
          + 'EHDOTUS_BUCKET, POLLO_KEHITTAJAKOODI, SAHKE_TIETOKANTA, SAMIREIVINEN_DRIVE_API, TEAM_ID, ASC_ISSUER_ID, ASC_KEY_ID, ASC_KEY_P8 (App Store Connect); 3) gh-token keyringissa (git push, '
          + 'PR:t, workflow run). CLAUDE-API CONSOLE-KREDIITEILLÄ (omistaja 11.10.2026 klo 10.3x, kortti "Nyt iPadilla (suositus)"): Claude-API:n käyttö (Pulun live-chat workerissa ja muut API-ajot) '
          + 'laskutetaan omistajan Claude Consolen krediittiorganisaatiosta: omistaja luo sinne avaimen ja tallentaa sen itse GitHub-salaisuuteen ANTHROPIC_API_KEY (avainta ei pyydetä chattiin), '
          + 'minkä jälkeen Julkaisija vie sen workeriin ajamalla pollo-julkaisu.yml ja tarkistaa savuke-pollo.yml:llä; ANTHROPIC_ADMIN_KEY (kustannusseuranta) jää toistaiseksi vanhaan '
          + 'organisaatioon. TILA 17.10.2026 klo 23.48 (omistaja): käytössä on Visuaaliviestinnän Inst. -organisaation avain Matkakirja (luotu 11.10., GitHub-salaisuus päivitetty 11.10.); vanhan KLIK-organisaation matkakirja-avain poistetaan, ja Macin avaintiedoston ANTHROPIC_API_KEY on VANHA eikä mikään työkalu käytä sitä. AVAIMET JA AJOT MACILLA (korvasi heti alkuperäisen Actions-säännön, historia lokissa; omistaja 18.9.2026 klo 09.55 Suomen aikaa): SAANTO: 1) kaikki, mika voidaan ajaa '
          + 'Macilla, ajetaan Macilla - GitHub Actions vain PR:n porttiin (Testit, Savukkeet) ja siihen, mika ei Macilla onnistu; 2) ennen avaimen kysymista ETSITAAN se: `source ~/.zshrc` ja `env | '
          + 'grep -E "^(AWS_|R2_|ELEVEN|OPENAI|ANTHROPIC|GOOGLE|CLOUDFLARE|FREESOUND|EUROPEANA|FLICKR)"` (nimet, ei arvoja), ~/.zshrc, ~/.zprofile, ~/.aws/credentials, macOS avainnippu (`security '
          + 'find-generic-password -s <nimi> -w` vain jos nimi tiedetaan), gh auth status, tyokalujen omat process.env-nimet (tools/*.mjs) - ja Raamatun lista yllä paivitetaan aina kun uusi sijainti '
          + 'loytyy; 3) VASTA jos avainta ei loydy mistaan, kysytaan omistajalta kortilla ja avain laitetaan Macille (~/.zshrc-vienti), ei repoon. TARKENNUS (omistaja 18.9.2026 klo 10.05 Suomen '
          + 'aikaa, kortit "Kylla, molemmat" ja "Liitan ne itse ~/.zshrc:hen"): 4) TYONKULUT MACILLE: kaikki workflow_dispatch-generaattorit ja -viennit (generoi-*, kuva- ja aanihaut, vie-*, '
          + 'tee-pallo*, pyramidi, varitaso, savuke-pollo) ajetaan Macilla suoraan tools/-skripteina (tools/aja-macilla.mjs kokoaa komennot); GitHubiin jaavat vain testit.yml ja savukkeet.yml '
          + '(PR-portti), pages.yml (Pages-julkaisu), Cloudflare Workers -julkaisut ja iOS-tyonkulut varalla; kertakayttoiset push-tyonkulut (vie-hyvaksytyt-*, vie-isoisa-*, vie-livia-*, '
          + 'vie-yleiskuvitus-*) poistetaan; 5) AVAIMET MACILLE: Fable kirjoittaa ~/.zshrc:hen export-rivit tyhjilla arvoilla (ELEVEN_API_KEY, OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY, '
          + 'CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, FREESOUND_API_KEY, EUROPEANA_API, FLICKR_API_KEY, SAMIREIVINEN_DRIVE_API, R2_ACCOUNT_ID, R2_BUCKET), omistaja tayttaa arvot; Fable tarkistaa '
          + 'nimet `env`-listalla arvoja nakematta. Macin ~/.zshrc:ssä ovat (omistaja täytti 18.9.2026) ELEVEN_API_KEY, OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY (Gemini), '
          + 'CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, FLICKR_API_KEY ja SAMIREIVINEN_DRIVE_API; R2_* johdetaan AWS_*/AMPARI/PAATE-riveistä; FREESOUND_API_KEY ja EUROPEANA_API täytetään '
          + 'tarvittaessa; Actionsin secretit jäävät ennalleen. C) AANILAITE JA SAVUKKEET (Fable 19.9.2026 klo 01.30 Suomen aikaa): Macin OLETUSAANILAITE vaikuttaa Chromiumin Web Audioon: sammutettu '
          + 'oletuslaite (Scarlett Solo USB) pysäyttää AudioContext-kellon, jolloin kaikki ääntä odottavat vartiot kaatuvat. SAANTO: jos aanivartiot kaatuvat kaikki kerralla, tarkista ensin '
          + 'oletuslaite (system_profiler SPAudioDataType, "Default Output Device") ennen koodin epailya; omistaja saa vaihtaa Scarlettin takaisin, kun se on paalla - runnerille riittaa mika tahansa '
          + 'aktiivinen laite. C2) AANIPALVELU SAMASSA PROSESSISSA (Fable 19.9.2026 klo 08.45 Suomen aikaa): headless Chromiumin ERILLINEN äänipalvelu (AudioServiceOutOfProcess) voi antaa '
          + 'AudioContext-kellolle vain noin 1/7 reaaliajasta; korjaus on sarjat.jsonin rivikohtainen SAVUKE_CHROMIUM_LIPUT (--disable-features=AudioServiceOutOfProcess), ensimmäisenä astro-äänelle. '
          + 'SAANTO: jos aanivartio mittaa AJAN kulkua (feidi, ramppi, kesto) eika vain aanen alkamista, sen riville annetaan sama lippu; kellon nopeus mitataan ensin, koodia ei epailla. D) '
          + 'KELLONAJAT AINA SUOMEN AIKAA (omistaja 19.9.2026 klo 01.45 Suomen aikaa): jokainen Raamatun, raporttien, commit-viestien ja omistajalle annettujen viestien kellonaika ilmoitetaan Suomen '
          + 'aikana (Europe/Helsinki, kesalla EEST = UTC+3, talvella EET = UTC+2) ja merkitaan "Suomen aikaa"; UTC-aikoja ei kirjata. Fable tarkistaa ajan komennolla date ennen kirjausta (Macin '
          + 'kello on Suomen ajassa). E) KUORMA JA CI:N JAKO (omistaja 19.9.2026 klo 15.30 Suomen aikaa; kuorma kaatoi savukkeita): PAATOS: 1) Testit-tyonkulku ajetaan GitHubin ubuntu-runnerilla '
          + '(alustariippumaton, vapauttaa Macin toisen runnerin); 2) Macin savukesarjan rinnakkaisuus 6 -> 4; 3) Fable ei aja agenttien selaineria CI-ajon aikana - enintaan kaksi selainta Macilla '
          + 'CI:n ulkopuolella; 4) Chromium-osasarjan siirto GitHub-matriisiin vain, jos kuorma toistuu (WebKit- ja aikamittaukset pysyvat aina Macilla). AVAINSAANTO (Fable 21.9.2026, omistaja: '
          + 'avaimia ei kierrateta): avaintiedostoja (~/.zshrc ym.) ei koskaan tulosteta - ei cat/head/less/echo $AVAIN; vain nimet: grep -o "^export [A-Z_]*" ~/.zshrc, arvot luetaan '
          + 'source-komennolla hiljaa. Rikkomus kirjataan lokiin ja omistajalle. Loki: docs/raamattu-loki/paatokset-2026-09.md #KARSINTA 11.10.2026: MAC STUDIO JA AVAIMET (11.10.2026 klo 15.44).',
        'VAIKEAT NYKYAIHEET (omistaja 20.8.2026): Pöllö vastaa asiallisesti suoriin kysymyksiin vaikeista nykyaiheista (esim. "miksi Mosul on tuhoutunut", "onko siellä elämää nyt"): mitä tapahtui ja '
          + 'milloin, millainen tilanne nyt on, ja maininta jos tieto voi olla vanhentunutta. Neutraalisti: ei osapuolten syyttelyä, ei julmuuksien yksityiskohtia. Aidosti kiistanalaisessa asiassa '
          + 'kerrotaan molemmat vakiintuneet kannat lyhyesti valitsematta puolta. Sotaan ei syvennytä oma-aloitteisesti, mutta suoraa kysymystä ei väistetä. Toteutettu '
          + 'tools/pollo/worker.js-kehotteeseen.',
        'PÖLLÖN KARAKTÄÄRI (omistaja + Fable 25.8.2026): pöllö on IKIVANHA SILMINNÄKIJÄ-REPORTTERI — istunut räystäillä pari sataa vuotta ja nähnyt kaiken itse. Rakastaa skandaaleja ja mehukkaita '
          + 'juttuja (täkynostot ovat sen heiniä) mutta tarkistaa aina faktat. PUHESÄÄNNÖT: kuiva huumori ja vähättelevä toteavuus; enintään kaksi virkettä; ei huutomerkkejä (paitsi purkauksissa); '
          + 'minä-muotoinen silminnäkijäheitto korkeintaan kerran per maa; lempeä ironia, ei ilkeyttä; ei koskaan 1873-ääntä (se on isoisän) eikä pelaajan puhuttelua ylhäältä. SULKASATOHETKET: '
          + 'pidätelty rääväsuupuoli pääsee valloilleen HARVOIN ja vain sisällöstä — räikeät vääryydet ja huijarit (ryöstöt, dynamiitti) — enintään kerran per maa, ja SILLOIN SAA PÄÄSTELLÄ KUNNOLLA '
          + '(omistaja 25.8.2026): purkaus saa revetä täysillä — versaalit, huutomerkit, useampi huudahdus — kunhan heti perään tulee pahoittelu ja paluu kuivaan ("...Anteeksi. Jatketaan."); ei '
          + 'oikeita kirosanoja vaan pöllön omat voimasanat ja höyhenkieli ("Höyhenissäni sähköisti"); ei koskaan pelaajaa kohti. Sama karaktääriohje annetaan pöllö-chatin mallille. Puvustus '
          + 'päivitetään reportteri-ilmeeseen kun herotauko puretaan (lehtimieskortti/lasit/vihko).',
        'PÖLLÖ MUKANA ALUSTA (omistaja 24.8.2026, kumoaa alla olevan toistaiseksi): kehitysvaiheessa pöllö on pelissä heti alusta — fokusmoodin esittely tarvitsee sen. "Pöllö on aarre" -idea '
          + 'säästetään ja voidaan tuoda takaisin myöhemmin (vaatii erikoisjärjestelyt ensimmäisen maan/kaupungin kohdalla).',
        'PÖLLÖ ON AARRE (omistaja 18.8.2026, TAUOLLA 24.8.2026 — ks. yllä): peli alkaa ilman pöllöä — nappi piilossa, ei kuplia eikä vihjeitä, eikä ennen ensimmäistä laattaa anneta ohjeita tai '
          + 'korvaavaa opastetta. Pöllö löytyy omana aarteenaan ensimmäisen käännetyn laatan alta (mikä tahansa laatta); pöllö KORVAA ensimmäisen laatan aarteen kokonaan (omistaja 18.8.2026) — '
          + 'laatan omaa sisältöä ei näytetä eikä anneta, eikä pöllö tuo pisteitä, rahaa eikä laukkutavaraa. Laukussa pöllön paikka on tietäjäpisterivin kuvake, ei TAVARAT-ruudukko. Ennen löytöä '
          + 'syntyneet tasonnousuonnittelut puretaan jonosta löydön jälkeen. Vanhassa tallennuksessa pöllö on valmiiksi löydetty.',
        'KALEVALAINEN KEHYS (omistaja 18.8.2026, "toteuta pöllöidea"): Viisas Pöllö on muuttumaton EMO — huuhkaja, jolla on karjalainen kirjontanauha harteillaan — tietäjien ikivanha matkakumppani, '
          + 'joka kasvattaa pelaajaa tiedon tiellä. Pelaajan oma avatar on lehtopöllö, joka varttuu untuvikosta tasojen myötä (10 kuvaa, assets/tietaja/). Jokaisella tasolla on kaksisäkeinen '
          + 'kalevalamittainen värssy, joka lausutaan tasonnousun juhlakuplassa; nimet, rajat ja värssyt ovat päätoimittajan kaanontekstiä (js/tietajatasot.js). Ylin taso on "Tietäjä iänikuinen".',
        'Ruudulla aina pieni pöllö → chat. Vastaa näkyvästä sisällöstä (saa kontekstin) + vapaa kenttä + kysymysehdotukset.',
        'Tiedon hahmo, ei tarinan: ei paljasta visavastauksia eikä juonisalaisuuksia. Faktakuri ja kunnioitus koskevat; myöntää kun ei tiedä.',
        'Tekniikka: pieni malli oman workerin kautta, käyttörajat, avain vain salaisuuksissa. Tausta vaihdettavissa (laitemalli, tilaus).',
        'Vaiheistus: testi omistajan avaimella; ansainta päätetään kokeilun jälkeen.',
        'PUHEKUPLA (idea): esiohjelmoidut proaktiiviset vihjeet (80 päivän muistutus, alkuohjeet). Vihjaa, ei keskeytä — ei modaalia, ei ääntä, harvoin.',
        'VALMISKYSYMYKSET (omistaja 18.8.2026, "kannatan"): jokaiselle laatalle ja lehden etusivulle viisi valmista kysymystä PAKETTISISÄLTÖNÄ (js/packs/pollo-kysymykset.js; ≤70 mrk, pelaajan '
          + 'äänellä, aiheet pelin aineistosta, ei visavastauksia eikä juonispoilereita). Chatin alussa kaksi näkyvissä + väkänen; ensimmäisen kysymyksen jälkeen dynaamiset jatkot kuten ennenkin. '
          + 'AJANTASAISUUS HOIDETAAN JULKAISUPUTKESSA sisältötunnisteella (vaihe 2) — ei pelinaikaista generointia eikä pelinaikaista tallennusta; lennossa generoidaan vain jatkokysymykset.',
        'LEHTIJUTTUJEN KYSYMYKSET RUNTIME-HAULLA (omistajan kortti + tilaus 28.8.2026): kun juttu tai alijuttu on auki ja chat avataan, Livia generoi ehdotuskysymykset LENNOSSA jutun sisallosta '
          + '(js/pollo.js haeEhdotukset; generoinnin ajan pieni odotusanimaatio). Etukateiskuratointiin siirrytaan vain jos runtime-laatu ei riita - paatos tehdaan pelitestin, ei arvauksen pohjalta. '
          + 'Takynostokorteilla on LISAKSI kasin kirjoitetut 2-3 kysymysnappia (nostorikastus, kortti 28.8.2026). Chatin AVAUSVALMISKYSYMYKSET (laatat, etusivut) sailyvat omana pakettisisaltonaan '
          + 'entiseen tapaan.',
        'Ehdota sisältöä -nappi on myös pöllön chatissa (lehdillä hampurilaista ei näy) — sama lomake, sivukonteksti mukana.',
      ],
    },
    {
      otsikko: 'Tutki kätkö -pelit',
      tila: 'luonnos',
      kohdat: [
        'Pysähdyksessä täsmälleen yksi peli. Ensimmäinen aina luettu kohtaaminen; sitten painotettu arvonta: tietovisa, isoisän väittämä, valokuvakysymys, lippukysymys, isoisän pulma, vaikea kysymys.',
        'Pelin on auettava siitä mitä ruudulla näkyy — ei ulkoa opettelua. Kuvat oikeita ja tarkistettuja.',
        'Rahalla apua: visavihje ja 50:50 (hinnat: Talous).',
        'Katalogi ja uudet ehdotukset: Raamatun Pelit taulukkona -sivu. Uudet tyypit pilotoidaan yhdessä kaupungissa.',
      ],
    },
    {
      otsikko: 'Kohtaamiset ja henkilöt',
      tila: 'luonnos',
      kohdat: [
        'KOHTAAMISEN AVAUS (omistaja 25.9.2026 klo 23.0x, sitova, web ja natiivi; löydös 145): kohtaaminen ei aukea lehden kautta. Kun pelaaja ratkaisee YHDEN tietovisan (lehdestä tai '
          + 'karttanostosta) oikein, kartalle syttyy vihreä piste, josta pääsee tapaamaan henkilön ja ratkaisemaan tehtävän (kynnys pudotettu kahdesta yhteen). Pulun ohje yksikössä: "Löytämällä '
          + 'kartalta kysymyksen ja vastaamalla siihen oikein saat vihjeen aarteen sijainnista." Kohtaamiset ovat muuten vielä vaiheessa; omistaja palaa niihin.',
        'KEHYS: maisema on muuttunut 150 vuodessa — kätkö löytyy vain isoisän kuvauksen JA paikallisen hiljaisen tiedon yhdistelmällä.',
        'HILJAISEN TIEDON ARKKU: paikallinen auttaa vasta, kun tietämys hänen maastaan on todistettu — siksi kysymys on aina paikasta. Tämä on visamekaniikan tarinallinen syy.',
        'Joka kaupungille käsin kirjoitettu tyypillinen paikallinen (ammatti sidottu paikkaan) + fotorealistiset kasvot (yhtenäinen tyyli). Repliikki, kysymys, aarreteksti — luetaan ääneen.',
        'Aarrejahti on pelin satua; kaikki tieto paikoista totta.',
        'Aloita peli -nappi erottaa luennan ja tehtävän — tiimalasi ei kulu puheen aikana.',
        'Epäonnistumisesta yksi uusinta; toisesta arkku jää kiinni. Kohtaamiset istuntokohtaisia.',
      ],
    },
    {
      otsikko: 'Kaupungit',
      tila: 'toteutuksessa; historia lokissa',
      kohdat: [
        'KAUPUNGIN AVAUSKORTTI (omistaja 26.9.2026 klo 23.0x–27.9. klo 00.1x, sitova; web on malli, natiivi seuraa): kaupungin napautus avaa AVAUSKORTIN, jossa päällekkäin (1) kaupungin herokuva, '
          + 'kaksi lausetta esittelyä ja "Lue kaupunkilehti" -linkki tekstin lopussa, (2) pelin oma nähtävyyskartta ILMAN tekstejä (korkeus 35 % ruudusta iPhonessa ja iPadissa; mitä tahansa kohtaa '
          + 'napauttamalla avautuu lähes kokoruudun popup, tausta sumennettuna, kartan ulkopuolinen osa vaaleana, karttaa voi zoomata koko popupin kokoiseksi), (3) turisti-info linkkinä: otsikko, '
          + '1–2 ensimmäistä lausetta ja kuva. Kortti kootaan valmiista osista, uutta tekstiä ei tarvita. Kartalla kohdekaupungin ja pelaajan merkin vieressä yläviistossa on pieni MINIATYYRI '
          + 'kortista, joka suurenee pehmeästi kortiksi napautettaessa (ei peitä nostomerkkejä eikä Pulua). SAAPUESSA EI AVAUDU MITÄÄN automaattisesti (openArrival-lehti pois saapumisesta). '
          + 'Kaupungin nostot-liuska poistuu. KAUPUNKILEHTI säilyy syventävänä: siitä poistetaan Nähtävyydet, Turisti-info ja Radio (radio on kartussissa) sekä "Tapaa henkilö" -tehtävänappi (löydös '
          + '179: kohtaaminen alkaa vain vihreästä fokuspisteestä kuten webissä); etusivun alaosaan LEHDEN OSIOT: jokainen osio linkkinä, alla osion jutunotsikot ja yksi kuva per osio. '
          + 'Kaupunkilehden jutut, jotka eivät oleellisesti liity kaupunkiin (esim. Pariisin keksinnöt, Marie Curie), siirretään maalehteen omistajan hyväksymän listan mukaan (Sisältökirjurin '
          + 'luokitteluraportti). Maan muut nostot säilyvät kartalla. NÄHTÄVYYSKARTALLA VAIN PAIKAT (omistaja 26.9.2026 klo 22.0x–22.4x, löydös 178): kaupungin nähtävyyskartalla ovat rakennukset ja '
          + 'rakennelmat sekä aukiot ja luontokohteet (kevyemmällä merkillä); maalaukset, esineet, veistokset, henkilöt, tapahtumat ja ilmiöt eivät ole karttakohteita — tarinakohteet (skandaalit, '
          + 'historian hetket) kuuluvat kaupungin nostoihin ja lehden osioihin, muut museon tai rakennuksen nähtävyysjuttuun galleriana; jokaisella kaupungilla vähintään yksi karttakohde.',
        'TÄMÄN OSION KOHDAT 13.9.–20.9.2026 (KARTTAUUDISTUKSEN PAATOKSET 1–53 tarkennuksineen, astronautin kamera, luentakuvat, työtapa- ja tilamerkinnät) on siirretty sanatarkasti lokiin '
          + 'docs/raamattu-loki/paatokset-2026-09-13--09-20.md (Raamatun jako, omistaja 20.9.2026 klo 18.08). Alla vain voimassa oleva linjaus aiheittain; uudet päätökset kirjataan lokiin '
          + 'docs/raamattu-loki/paatokset-2026-09.md työkalulla tools/raamattu-kirjaa.mjs, ja Raamatun linjausta muutetaan vain kun sääntö muuttuu. Osion lopussa kaupunkien alkuperäinen linjaus '
          + '(15.–26.8.2026).',
        'KARTTAUUDISTUS — KAUPUNKILEHDESTÄ LUOVUTAAN, KAIKKI MATERIAALI PIENIKSI KLIKATTAVIKSI PALOIKSI KARTALLE (omistaja 13.9.2026): uudistus toteutetaan pallolle, tasokartta ei palaa (P3). '
          + 'Saavuttaessa kartta zoomaa kohdemaan niin suureksi kuin mahdollista; pelaaja ei voi zoomata saapumisnäkymää kauemmas — uloin sallittu näkymä on saapumisnäkymä (P1, P17); kapealla '
          + 'ruudulla saapumisnäkymä sovitetaan korkeuteen ja sivuille panoroidaan (P17); panorointi rajattu kohdemaan ympärille (P6); kehittäjän maailmatilassa saa zoomata ulos (P34 kohta 19). '
          + 'Kohdemaa pysyy alkuperäisenä seepiareliefinä; muiden maiden korkeuserot peitetään TASOITUSKERMALLA (kerma, paperia vaaleampi), jonka peitto on KERMAN_PEITTO_KIINTEA = 0,8 (omistaja '
          + '20.9.2026 klo 16.05; kumoaa 0,85/0,95); meret jäävät alkuperäiselle korkeuskartalle ja kerma ei saa välkkyä panoroitaessa (P4, P37); maailmanäkymässä ei kermaa (P23); kerma pois '
          + 'liikkeen ajaksi (P29). Staattinen kartta: nimikyltit ja maapaneeli sidotaan karttakoordinaatteihin ja skaalautuvat zoomin mukana, kyltin ankkuri suhteessa merkkiin on kiinteä (P2, P12, '
          + 'P14, P24). Kohdemaan raja: käsinpiirretyn näköinen, muiden rajojen värinen (punainen ja musteensininen kumottu), lähipäässä 3 px, rannikko-osuus naulattu ne_10m-rantaviivaan ja '
          + 'piirretty rantaviivan alle ohuempana (P7, P15, 20.9.2026). Pariisin sivujako (Menovinkit maan valikkoon, Musiikki yhdeksi, Historia kolmeksi pisteeksi + nostoksi) on malli (P1). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-13--09-20.md #KARTTAUUDISTUS - KAUPUNKILEHDESTA LUOVUTAAN, KAIKKI MATERIAALI PIENIKSI KLIKATTAVIKSI PALOIKSI KARTALLE, #KARTTAUUDISTUKSEN PAATOKSET '
          + '1, #KARTTAUUDISTUKSEN PAATOKSET 2: MURRETUT SAVYT, FEIDAUS JA STAATTINEN KASINPIIRRETTY KARTTA, #KARTTAUUDISTUKSEN PAATOKSET 3: UUDISTUS TEHDAAN PALLOLLE, #KARTTAUUDISTUKSEN PAATOKSET '
          + '4: KOHDEMAA ALKUPERAISENA, MUISTA MAISTA KORKEUSEROT POIS, #KARTTAUUDISTUKSEN PAATOKSET 6: PILOTIN PALAUTE, #KARTTAUUDISTUKSEN PAATOKSET 7: MAAPANEELI JA AARIVIIVAT KASINPIIRRETYIKSI, '
          + '#KARTTAUUDISTUKSEN PAATOKSET 14: NIMIKYLTIT KARTTAAN, MAAN AARIVIIVA MUSTEENSINISEKSI, #KARTTAUUDISTUKSEN PAATOKSET 15: PUHELINKUVA v1877+ - KARTTABUGI, MAAINFO YHA LIIAN ISO, MAAN RAJA '
          + 'MUIDEN RAJOJEN VARISEKSI, #KARTTAUUDISTUKSEN PAATOKSET 17: PUHELIMEN SAAPUMISNAKYMA SOVITETAAN KORKEUTEEN, SIVUILLE PANOROIDAAN, #KARTTAUUDISTUKSEN PAATOKSET 23: MAAILMANAKYMASSA EI '
          + 'KERMAHUNTUA - KORKEUSEROT NAKYVIIN KAIKKIALLE, #KARTTAUUDISTUKSEN PAATOKSET 24: KAUPUNKIEN NIMIKYLTIT PYSYVAT SAMASSA KOHDASSA ZOOMATESSA, #KARTTAUUDISTUKSEN PAATOKSET 37: TASOITUSKERMA '
          + 'ILMAN VALKKYMISTA; MERET ALKUPERAISELLA KORKEUSKARTALLA.',
        'KAUPUNKI ON YKSI PISTE (KARTTAUUDISTUKSEN PAATOKSET 34, 17.–18.9.2026; nostot-liuska poistettu 26.–27.9.2026, ks. KAUPUNGIN AVAUSKORTTI): jokainen kaupunki on kartalla yksi piste (merkki + '
          + 'nimi); kaupungin sisäisiä nostoja ei piirretä kartalle, aidosti kaupungin ulkopuoliset (Versailles, Chartres, vuoret, linnat) jäävät kartalle omina pisteinään poltetun merkin kokoisina; '
          + 'siirtovaiheessa tarjolla olevan kohdekaupungin napautus valitsee kohteen (P42). Myös maalehden sivut siirretään nostoiksi kartalle, kopio maalehdestä säilyy — mitä vähemmän asioita on '
          + 'sivujen takana, sen parempi (P13). Lisäkaupungeille (Lyon, Bordeaux…) kaupunkikortti: herokuva (kuvaputki, PD/CC), Fablen 2–3 lauseen esittely, yksi kaupunkiin ankkuroitu nosto (P16). '
          + 'Kohdekartat uusille kaupungeille numeroympyröin ilman miniatyyrejä, numerot väistävät toisiaan (20.9.2026). Loki: docs/raamattu-loki/paatokset-2026-09-13--09-20.md #KARTTAUUDISTUKSEN '
          + 'PAATOKSET 34: KAUPUNKI ON YKSI PISTE, LISTA KATEGORIOITTAIN; KAUPUNGIN ULKOPUOLISET NOSTOT JAAVAT KARTALLE, #KARTTAUUDISTUKSEN PAATOKSET 10: KAUPUNKIA KLIKKAAMALLA TIIVISTETTY KOPIO '
          + 'KAUPUNKILEHDEN ETUSIVUSTA; VANHA LEHTI KOSKEMATON; LOPUT TYOJONON TEHTAVAT RINNAKKAIN, #KARTTAUUDISTUKSEN PAATOKSET 13: MYOS MAALEHDEN SIVUT NOSTOIKSI KARTALLE, KOPIO MAALEHDESTA '
          + 'SAILYY, LISAA KAUPUNKEJA NAKYVIIN, #KARTTAUUDISTUKSEN PAATOKSET 16: RANSKAN LISAKAUPUNGEILLE KAUPUNKIKORTTI - HEROKUVA, ESITTELY, YKSI NOSTO, #KARTTAUUDISTUKSEN PAATOKSET 42: '
          + 'SIIRTOVAIHEESSA KOHDEKAUPUNGIN NAPAUTUS VALITSEE KOHTEEN, EI AVAA LIUSKAA, #KARTTAUUDISTUKSEN PAATOKSET 27: SAMAN AIHEEN NOSTOT YHDEKSI MERKIKSI, VIUHKA KLIKATTAESSA.',
        'LÖYTÄMISEN SUMU (omistaja 21.9.2026 kortilla, julkaisu v1988): kohdemaan löytämättömät nostot piirretään luonnoksina (peitto 0,55, katkoviivarengas ikonin ympärillä); nosto löytyy noin 150 '
          + 'km:n säteellä käydystä kaupungista tai avaamalla, jolloin se mustetaan (600 ms); ykköstaso aina musteena; löydöt localStoragessa. Käymättömien maiden rajat vaaleina (0,35). Monen '
          + 'kohdekaupungin maissa käymättömän osan reliefi sisäsumussa (kerma 50 %, 200 km:n pehmeä aukko käytyjen ympärillä; merentakaiset kaupungit eivät pidä sumua mantereella). Hunnun 80 % '
          + 'muualla maailmassa ennallaan. ?sumu=0 sammuttaa vertailuun. Loki: paatokset-2026-09.md#SUMU.',
        'KARTAN NIMISTÖ: PYSYVÄT NIMET POHJALLE, 1873-POLIITTISET LINSSIIN (omistaja 21.09.2026 klo 08.21 kortilla): kartta on nykyajan kartta isoisän ajan atlaksen ilmeellä. Pohjakartan '
          + 'nimiötasolla vain pysyvät nimet: meret, lahdet, salmet ja tänäänkin käytössä olevat kulttuurialueet (Bretagne, Provence, Toscana, Baijeri, Andalusia …). Vuoden 1873 poliittiset nimet ja '
          + 'rajat (Elsass-Lothringen DEU, Preussin provinssit, Itävalta-Unkari …) kuuluvat VUOSI 1873 -LINSSIIN (isoisän silmin: sen vuoden rajat ja maiden nimet); rajojen eläminen pidemmällä '
          + 'aikavälillä on erillinen aikajanalinssi samalla aineistolla (historiallinen raja-aineisto selvitettävä, ei Natural Earth). Sisältökirjurin nimistö merkitään luokkaan pysyvä/1873; '
          + 'nimiötaso poltetaan uudelleen ilman poliittisia nimiä.',
        'NIMIÖIDEN VAKAUS — GOOGLE EARTHIN MALLI (Fable 21.9.2026, omistajan havainto v1985: nostot pomppivat panoroidessa): nimiö ei liiku eleen aikana. Asento valitaan ankkurin ympäriltä kerran '
          + 'lepotilassa (8 ehdokasasentoa karttakoordinaateissa) ja pidetään; eleen aikana lappu vain seuraa ankkuria, reunan yli saa mennä. Törmäys ratkaistaan näkyvyydellä, ei siirrolla: heikompi '
          + 'häivytetään ja palaa kun tilaa on; prioriteetti kiinteä (kaupunki > taso 1 > taso 2 > taso 3; ykköstaso häipyy vain kaupungin nimen tieltä, ikoni jää). Päätökset vasta eleen päätyttyä '
          + '(~150 ms) ja zoomiportaittain, hystereesi estää vilkkumisen. Ykköstaso ei häivy eikä vaihda asentoa. Loki: paatokset-2026-09.md#OMISTAJA v1985 VAKAVUUS 1.',
        'NOSTOT KARTALLA JA NIIDEN SISÄLTÖ (15.–20.9.2026): kohdemaalle ei merkkikattoa — kaikki nostot ja kaupungit piirtyvät heti saapuessa, muiden maiden merkit katon (21) alla; lisäkaupunkien '
          + 'nimiö n. 11–12 px (P25). Nostot ympäri maata (vuoret, linnat, alueet), kaikki poltetun merkin kokoisia, eivät liiku zoomatessa, yksikään teksti ei mene toisen päälle; ensin pisteet ja '
          + 'otsikot, sisältö sitten (P32, P33). Nostoankkurit lukitaan (vie-nostoankkurit --lukitse; saaripoikkeus ja meripoikkeus; kaupungittoman maan nostot näkyvät kun kamera on maan '
          + 'rajauksessa, 19.9.). Hahmotelmanostot pysyvät elävinä pisteinä, nostotaso poltetaan --ilman-hahmotelmia (P48, 20.9.). SISÄLTÖ: teksti 3–5 virkettä Wikipedian johdannosta lähde '
          + 'päivämäärällä, ei keksittyjä faktoja, 1873-näkökulma alaotsikossa; kaksi kysymystä pululle; vähintään kaksi Commons-kuvaa (vain PD/CC), havainnekuvat myöhemmin (P44); nostokuvassa ei '
          + 'saa olla poltettua aikaleimaa, vesileimaa, tekstipäällystä eikä tunnistettavia yksityishenkilöitä — koko erä tarkistetaan täydessä koossa ennen ämpärilatausta (20.9.); kuvaselitteissä '
          + 'ei lähdeviittauksia lukijalle ("Commonsin kuvauksen mukaan"), lähde kuuluu lähdekenttään (19.9.); kuvan lähde ja havainnekuvamerkintä näkyvät kaikkialla vasta suurennoksessa, kortissa '
          + 'vain lyhyt kuvateksti (19.9.). EU-maiden nostot tehdään maa kerrallaan täysin speksattuna, Fable hyväksyy kohdelistan ennen kirjoitusta (P48); määrä ja pistokoe: NOSTOSTANDARDI '
          + 'EUROOPALLE. Rahavisa noin joka kolmanteen hahmotelmanostoon täkynostojen datamallilla (`visa`, +25 puntaa, vastaus löytyy noston tekstistä) (P51); nostovisa piirretään paperin tyyliin '
          + 'kuten lehden kulttuurivisa, vaihtoehdot luontevaa suomea (19.9.). Laaja nostokortti (LISÄÄ) ei sulkeudu sisällön napautuksesta (19.9.; sulkutapa: Arkkikirjasto, SULKUTAPA-ASETUS); '
          + 'puolikkaana avautuvan nostoikkunan yläreunassa on ylöspäin osoittavat väkäset ja niiden oikealla puolella pienellä teksti (laajenna) (omistaja 11.10.2026 klo 21.3x); nostopopupin aikana '
          + 'matkakirja ja Liiku piiloon (P26). ETSI AARRE -NAPPI ON POISTETTU (P6, 13.9.2026): aarteeseen mennään kartan vihreästä pisteestä (js/fokuspiste.js), joka on kartalla alusta asti, ja '
          + 'aarrekysymys esitetään kohtaamiskortissa kuten ennen. Maat ilman pelikaupunkia saavat pelikaupungin Firenzen reseptillä: Bryssel, Ljubljana, Košice (Kassa 1873) tehty; tulevat '
          + 'Luxemburg, Malta, Kypros, Baltia (19.9.); pelikaupungin lisäys muuttaa kaupunkimäärää ja reittejä → kaupungit-piiloon ja noppa-savukkeet tarkistetaan joka kaupunkierässä (20.9.). '
          + 'Otsikkokortti = kartan nimi (OSLO), isoisän 1873-tekstit = ajan nimi (Christiania) (20.9.). Kuvaputken toimituskoko: vain yli 1800 px:n kuvat skaalataan pitkältä sivultaan 1800 px:iin '
          + '(15.9.). Loki: docs/raamattu-loki/paatokset-2026-09-13--09-20.md #KARTTAUUDISTUKSEN PAATOKSET 25: KOHDEMAALLE EI MERKKIKATTOA, KAUPUNKINIMIO ISOMMAKSI, #KARTTAUUDISTUKSEN PAATOKSET 32: '
          + 'NOSTOT EIVAT LIIKU ZOOMATESSA, VIUHKA SIISTIKSI LISTAKSI, KAIKKI NOSTOT POLTETUN KARTAN KOKOA, EI TEKSTIA TOISEN PAALLE, #KARTTAUUDISTUKSEN PAATOKSET 33: NOSTOT YMPARI RANSKAA, ENSIN '
          + 'PISTEET JA OTSIKOT, KAIKKI POLTETUN MERKIN KOKOA, #KARTTAUUDISTUKSEN PAATOKSET 44: RANSKAN NOSTOJEN SISALLOT JA KUVAT, #KARTTAUUDISTUKSEN PAATOKSET 48: EU-MAIDEN KARTTANOSTOT '
          + 'PAIKALLISELLA SONNET-SISALTOSESSIOLLA, PILOTTI ESPANJA, #KARTTAUUDISTUKSEN PAATOKSET 51: HAHMOTELMANOSTOIHIN RAHAVISA NOIN JOKA KOLMANTEEN, #NOSTOVISAN ULKOASU JA VAIHTOEHTOJEN KIELI, '
          + '#KUVASELITTEISSA EI LAHDEVIITTAUKSIA LUKIJALLE, #KUVAN LAHDE JA HAVAINNEKUVAMERKINTA VAIN SUURENNOKSESSA, KAIKKIALLA, #LAAJA NOSTOKORTTI SULKEUTUU LEIPATEKSTIN NAPAUTUKSESTA - KORJAUS, '
          + '#KARTTAUUDISTUKSEN PAATOKSET 26: NOSTOPOPUPIN AIKANA MATKAKIRJA JA LIIKU PIILOON, #KAUPUNGITTOMAN MAAN NOSTOT NAKYVAT KAMERAN OLLESSA MAAN RAJAUKSESSA, #MAAT ILMAN PELIKAUPUNKIA SAAVAT '
          + 'PELIKAUPUNGIN, #KUVAPUTKEN TOIMITUSKOKO: 1800 PX, #HAHMOTELMANOSTOJEN VISA EI PIIRRY LAITTEELLA, #SELVITYS: RANSKAN NOSTOT JA MUUT KAUPUNGIT PUUTTUVAT.',
        'NOSTOSTANDARDI EUROOPALLE (omistaja 20.9.2026 klo 20.30 kortilla, inventaario docs/raportit/nostoinventaario-20260920.md; loki: docs/raamattu-loki/paatokset-2026-09.md#NOSTOINVENTAARIO): 1) '
          + 'Maara per maa: EU-maat 40-50 nostoa, pienet maat (MLT, LUX) vahintaan 15, muu Eurooppa (GBR, NOR, CHE, ISL, UKR, RUS, TUR, BIH) 30; Ranskan vanha 90 noston paketti siivotaan samaan '
          + 'muotoon. 2) Jokaisella nostolla kuva: Commons (PD/CC) ensin, havainnekuva vasta kun valokuvaa ei ole (merkki ja lahde: HAVAINNEKUVAT NOSTOISSA). 3) Tietovisa noin joka kolmannessa '
          + 'nostossa: osuus on 21 % (254/1198; FRA 25 %, 29 maata alle kolmasosan, 8 maata ilman yhtaan visaa), joten visoja LISATAAN sisaltotyona kunnes joka maassa vahintaan kolmasosalla '
          + 'nostoista on kelvollinen visa (kysymys, >= 2 vaihtoehtoa, oikea vastaus); nayttorajoitusta ei tarvita. 4) Tyypit: jokaisessa maassa vahintaan vuori/vesi, historia, kulttuuri, ruoka ja '
          + 'tekniikka edustettuina; jakauma inventaarion taulukon mukaan. 5) Ennen mergea Fablen pistokoe 3 nostoa + 3 kuvaa per maa. Ei-EU-maat ilman nostoja (ALB, AND, BLR, MDA, MKD, MNE, SRB, '
          + 'XKX) eivat kuulu taman ajon piiriin.',
        'HAVAINNEKUVAT NOSTOISSA — LINJAUS (omistaja 20.09.2026 klo 20.48): nostolla on yleensa seka oikeita kuvia etta havainnekuvia, ja kayttö harkitaan aina nostokohtaisesti. Oikeat kuvat '
          + '(Commons PD/CC) hankkii Sisaltokirjuri; Codexilta tilataan VAIN havainnekuvat. Kolme luokkaa: 1) KADONNUT KOHDE eli Matkakirjan ihme (ei enaa olemassa sellaisenaan): havainnekuva on '
          + 'paakuva ja kuvateksti nimeaa ajan ("Havainnekuva: X vuonna 1873"); 2) RAPPEUTUNUT KOHDE: parikuva - nykytila Commonsista ja kulta-ajan havainnekuva; 3) OLEMASSA OLEVA KOHDE, josta on '
          + 'hyva CC-kuva: havainnekuvaa ei tarvita, paitsi kun se tuo selvasti lisaa visuaalisuutta (sisatilat, tapahtumat, ruoka, tekniikka toiminnassa). Aina: pieni "Havainnekuva"-merkinta '
          + 'kuvatekstissa, lahde alkaa "Tekoalylla tuotettu havainnekuva.", ei poltettuja aikaleimoja. TARKENNUS (omistaja 20.09.2026 klo 20.51): havainnekuvissa SAA olla todellisia historiallisia '
          + 'henkiloita (kielto koskee vain nykyisia yksityishenkiloita valokuvissa), ja kohteen aika voi olla paljon vanhempi kuin isoisan vuosi 1873 - kuvataan kohteen oma kulta-aika (esim. '
          + 'antiikki, keskiaika), ei valttamatta 1873. Tilausjarjestys Codexille: ihmeet ensin, sitten rappeutuneet, sitten visuaalisuuden lisays; Fable tarkastaa ihmeiden kuvaukset kaanonia vasten '
          + 'ennen tilausta. Inventaarioon sarake ihme/rappeutunut.',
        'MAAPANEELI / MAALEHDEN KARTUSCHA (14.–20.9.2026, uusin voimassa): maainfo on KIINTEÄ ruudun vasemmassa alakulmassa (ei karttaan ankkuroitu; P28 kumoaa Biskajanlahden ja Lyoninlahden '
          + 'ankkurit P9, P18–P20), vaalealla pohjalla vanhan kartan kartussin tapaan, koko neljäsosa alkuperäisestä, leipäteksti nostojen nimiöiden koossa (P7, P11, P15); plus-merkistä avautuva '
          + 'valikko ilman taustalaatikkoa, kategoriat tiiviisti allekkain plus-merkin kohdalta ylös (P22, P28); paneeli ei estä vieritystä eikä zoomia (P21). AVATTU INFOTAULU (19.9.): '
          + 'paperikartuscha noin 40 % ruudusta, ei törmää kartan nimiöihin; järjestys masthead (RANSKA · France), tunnusluvut, kategoriat napautettavina; Liiku piiloon kun taulu on auki; '
          + 'pienennetty muoto ennallaan. KARTUSCHA 20.9.: väkäset pois pienestä ja isosta muodosta; isosta pois rivit "France – tasavalta v. 1873", "VALTIOMUOTO 1873" ja "NYT"; radio-merkki isossa '
          + 'muodossa oikeassa yläkulmassa otsikon keskellä (punainen valo palaa striimin soidessa, vilkkuu kanavaa haettaessa viritysäänellä, alla pienellä "radio"; piilossa mailta ilman '
          + 'lähetystä); maan nimen perässä lippu nimen korkuisena, napautus avaa lippuikkunan — pienessä muodossa ei lippua; kortti pienenee automaattisesti kun karttaan kosketaan; iso muoto yhtä '
          + 'paljon irti vasemmasta reunasta kuin alareunasta. MAAN KARTUSSI AINA NÄKYVISSÄ (omistaja 11.10.2026 klo 09.0x): oman maan kartussi ei häivy kartalla liikuttaessa eikä levossa, vaan '
          + 'pysyy vasemmassa alareunassa, ja sen napautus laajentaa sen maakortiksi kuten ennenkin; pysäkkimaiden tyhjän kohdan napautus (NUI 70b2d75ca) jäi pois (natiivi juna 181). MAAKORTIN '
          + 'NOSTOT TIIVIINÄ (omistaja 11.10.2026 klo 09.1x): maakortissa ei ole maakuntarivejä (pikkukuvat, käsialanimet, mustepisteet); avatut nostot ja valmiit maakunnat näkyvät tiiviisti '
          + 'olemassa olevalla tilastorivipohjalla ja ohuella palkilla (NOSTOT avatut/kaikki, MAAKUNNAT valmiit/kaikki); natiivi juna 181, web samaan malliin (Pelikoodari). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-13--09-20.md #KARTTAUUDISTUKSEN PAATOKSET 28: MAAINFO TAKAISIN RUUDUN VASEMPAAN ALAKULMAAN, VALIKKO KASVAA YLOS KAHDESSA SARAKKEESSA, LIIKU TEKSTINA '
          + 'ALAS KESKELLE, #KARTTAUUDISTUKSEN PAATOKSET 7: MAAPANEELI JA AARIVIIVAT KASINPIIRRETYIKSI, #KARTTAUUDISTUKSEN PAATOKSET 11: RANSKA-PILOTIN PALAUTE v1870:STA, #KARTTAUUDISTUKSEN '
          + 'PAATOKSET 21: MAAPANEELI EI ESTA VIERITYSTA EIKA ZOOMIA, #KARTTAUUDISTUKSEN PAATOKSET 22: LISAA-VALIKKO ILMAN TAUSTAA, KATEGORIAT ALLEKKAIN, #KARTTAUUDISTUKSEN PAATOKSET 9: RANSKA '
          + 'PILOTTINA VALMIIKSI ENNEN MUITA; ZOOMIN RAJAUS, MAAPANEELI BISKAJANLAHDELLE KIINTEALLA KARTTAKOOLLA, REITTIVIUHKAN VIKA, #KARTTAUUDISTUKSEN PAATOKSET 18: PUHELIMELLE OMA PANEELIANKKURI '
          + 'LYONINLAHDELLE, #KARTTAUUDISTUKSEN PAATOKSET 19: LYONINLAHDEN ANKKURIIN VARA PULUN NOKKAAN, #KARTTAUUDISTUKSEN PAATOKSET 20: MAAPANEELILLE JOKA MAALLE OMA PAIKKA, FABLE ARVIOI '
          + 'VISUAALISESTI, #MAALEHDEN INFOTAULU.',
        'SAAPUMINEN UUTEEN KAUPUNKIIN (voimassa 20.9.2026 klo 11.15): saapumisen kamera-ajo päättyy asentoon, jossa kaupunki on ruudun alimmassa kolmanneksessa (9.9.). Kulku: minitraileri '
          + '(kirjaimet, kaupungin iskulause) → isoisän ja pulun luentakuvat isoina keskellä ilman häivytystä, vinoon pakaksi vuorotellen kallistettuina, hieman pienempinä, kuvateksti valkoisella '
          + 'paperilla kuvan alareunassa, alla pieni "ohita"-teksti; kuvat lentävät lopuksi animaationa pienennettyyn matkakirjaan, jonka lopussa ne ovat pikkukuvina (P35, P38). KARTTA ON TERÄVÄ '
          + 'kuvien aikana (blur-vaatimus kumottu 20.9. klo 10.45), mutta MATKAKIRJAPANEELI JA PULUN PUHEKUPLA EIVÄT SAA NÄKYÄ trailerin ja kuvien aikana (klo 11.15; toteutettu v1975: runkoluokka '
          + 'saapumistraileri-paalla). Isoisän ja pulun tekstit pysyvät piilossa kunnes napautetaan; työpöydällä kortti ei avaudu itsestään luennan jälkeen (P38); puhelimella isoisän ja pulun '
          + 'tekstit eivät näy lainkaan ja Liiku on piilossa luennan ajan ja huomaamaton näkyessään (14.9.). Saapumiskortin ylärivin kaiutinkuvake on samalla rivillä otsikon kanssa ja sen kolme '
          + 'kaarta elävät VU-mittarina todellisesta äänitasosta (Web Audio -analysaattori; ajastettu kuvio vain jos AudioContext puuttuu); pulun repliikissä ei merkkiä, eleet riittävät (14.–15.9.). '
          + 'HUNTU: saapumiskuvien aikana kartta on terävä eikä huntua ole (omistaja 20.9. klo 10.45 ja 11.15); luentakuvien ja pulun kuvien huntu (kartta tummempi ja pehmeä, 14.–16.9.) on muuten '
          + 'ennallaan, ja se koskee vain karttaa — luentakuva, kuvateksti, pakka ja napit pysyvät terävinä joka selaimessa (15.9.); kerma (KERMAN_PEITTO_KIINTEA, arvo KARTTAUUDISTUS-kohdassa) on '
          + 'eri asia; huntua ei ole poistettu pelistä kokonaan (Fable 20.9.). Asetusten avaaminen kesken luennan ei kutista luentakuvia (15.9.); pulun kuvat pysyvät näkyvissä pulun tarinan loppuun '
          + 'ja hiipuvat n. 1 s ennen puheen loppua (16.9.). Luentakuvien pieni pakka on pois kartalta toistaiseksi, parempi paikka päätetään myöhemmin (P31). Kuvapakka on kaupungin yläpuolella '
          + 'kartalla, mutta pulun hahmo ja kuplanappi pysyvät aina oikeassa alakulmassa (P12 tarkennus 15.9.). ALOITUSKAUPUNKI JA KAUPUNGIN INTRO (omistaja 11.10.2026 klo 12.0x ja 12.1x; korvaa '
          + '10.5x:n ensimmäisen saapumisen opastuksen ja 11.1x:n tuuraustervehdyksen): aloituskaupungit ovat Ateena, Pariisi ja Tukholma. VALINTA: aloituskaupungin valinnassa Pulu sanoo neljä '
          + 'repliikkiä (lopulliset 11.10.2026 klo 11.3x, korvaavat sähke- ja maanosarepliikit): "Hei, odotas kaveri. Sinähän olet ihan hiessä!", "Minä olen Livia, kirjekyyhky.", "Tiedän isoisästäsi '
          + 'enemmän kuin uskotkaan." (avoin juonilanka, docs/tarina.md) ja "Valitse rauhassa kartalta, mistä aloitat. Perillä sinua odottaa tietäjä iänikuinen, itse Suuri ja Viisas Pöllö."; '
          + 'mahtipontinen Pöllö-pohjustus ja saapumisen "Kääk! Apua!" ovat tarkoituksellinen koominen käänne. SAAPUMINEN ALOITUSKAUPUNKIIN: 1) intro 18 s: William sanoo kaupungin nimen ja '
          + 'iskulauseen, taustalla kaupungin nopea kappale (aluksi Pariisin kappale kaikille), 6 avauskuvaa lähes koko ruudun kokoisina 3 s välein, Ohita; 2) kartta ja Pulu: "Kääk! Apua! Pöllö on '
          + 'kadonnut!" ja "Kuuntele sillä välin isoisän matkakirjaa, minä jatkan etsimistä!"; 3) isoisän luenta ja kuvat; 4) luennan jälkeen Pulu: "Pöllö sähkötti, että oli taittanut siipensä, ja '
          + 'pyysi, että tuuraisin häntä." ja "No, jos tulee kysyttävää, napauta minua. Enköhän minäkin jotain osaa vastata – olenhan sentään kuuluisaa kirjekyyhkyjen sukua!" (odottaa, että avoin '
          + 'nosto suljetaan). ISOISÄN UNI (omistaja 15.10.2026 klo 16.33–17.0x; korvaa 11.10. ensimmäisen saapumisen aarretekstin ja kynäluonnoksen): aarrejahti alkaa alkusoitolla heti Uusi matka '
          + '-valinnan jälkeen ennen aloituslentoa: isoisä kertoo unestaan (uusi teksti, Sisältökirjuri tarkistaa faktat, omistaja hyväksyy Tekstit-osastossa ennen äänitystä), ja ruudulle '
          + 'häivyttyy suurina unikuvina eri kohtiin hitaasti liikkuen kolme näyttävää aarretta (El Dorado, Montezuman turkoosinaamio, keisarin jadesinetti) ja lopuksi Kolme veljestä; kuvien '
          + 'reunat häipyvät pehmeästi läpinäkyviksi (ei näkyviä rajoja), kuvat Codexin tarkkoina versioina tummalla taustalla. Eteläristin helmi ei ole mukana (löytyi 1883, päiväkirja 1873). '
          + 'Aarnia ja luetteloa ei mainita unessa; LUETTELO PALJASTUU, KUN KOLME VELJESTÄ LÖYTYY: silloin unien aarteet tunnistetaan sen sivuilta ja matka muihin maanosiin aukeaa. '
          + 'Kaupungin intro säilyy, mutta ALOITUSKAUPUNGISSA EI OLE ISOISÄN PUHETTA (omistaja 17.12: "lennon ja intron jälkeen ei tule enää mitään isoisän puhetta, vaan Pulu voi suoraan '
          + 'aloittaa siitä, että pöllö on kadonnut, ja kertoa sitten, miten peliä pelataan"): intron jälkeen Pulu aloittaa suoraan Pöllön katoamisesta ja kertoo, miten peliä pelataan; '
          + 'isoisän ensimmäinen matkakirjateksti kuuluu vasta seuraavassa kaupungissa. Alla olevat kohdat 3–4 (isoisän luenta ja luennan jälkeiset repliikit) korvautuvat tällä; Pulun '
          + 'sovitetut repliikit hyväksytään Tekstit-osastossa. Luennan jälkeen Pulu sanoo "Isoisäsi ei tiettävästi koskaan löytänyt sitä aarretta. Ehkä sinä olet '
          + 'etevämpi!" (ennallaan, omistaja 21.6x), sitten kohdan 4 repliikit ja lopuksi "Napauta kohteita kartalta ja vastaa oikein kysymykseen, niin löydät aarteen.", ja sama teksti näkyy samalla '
          + 'hetkellä ruudun ohjeena (aloituksen ainoa ohjerivi). ALOITUSMAAN NOSTOT (omistaja 20.5x): pelin ensimmäisessä maassa kartalla näkyvät aluksi vain nostot, joissa on visa; ensimmäinen '
          + 'oikea vastaus sytyttää kartalle aarteen vihreän pisteen, ja vasta sen jälkeen syttyvät muut nostot. ETSITYT KAUPUNGIT (omistaja 13.5x ja 20.5x): laskuri "Etsityt kaupungit X/50" (avatut '
          + 'aarteet / Euroopan aarrekaupungit, luku datasta, päivälaskurin tyyli) näkyy kartan yläreunan keskellä 7 s jokaisen maan alussa, kun isoisän ja Pulun luennat ovat ohi, ja koko ajan '
          + 'matkalaukussa avatarin ja rahatietojen alla omalla rivillään. Pulun Pöllö-repliikit (kohdat 2 ja 4) kuuluvat vain pelin ensimmäisellä saapumisella ja Uusi matka -valinnan jälkeen: Uusi '
          + 'matka nollaa kaikki ensimmäisen kerran liput (myös valinnan repliikit), joten alku kuuluu kuin ensimmäisellä kerralla, ja Taas matkaan? -tervehdykset jäävät pois uudelta matkalta; Jatka '
          + 'matkaa ennallaan. Aloituskaupungin oma Pulu-kommentti ja kuvat jäävät pois, eikä tuuraustervehdystä ja opastuksen lauseita 1–3 käytetä. INTRO JOKA SAAPUMISELLA (omistaja 11.10.2026 klo '
          + '12.1x): kaikissa intro-kaupungeissa (Pariisi ja aloituskaupungit) intro tulee oletuksena joka saapumisella ja sen kuvat ovat lähes koko ruudun kokoisia; Ohita on aina käytössä, eikä '
          + 'uutta asetusta tehdä. Loki: docs/raamattu-loki/paatokset-2026-09-13--09-20.md #SAAPUMINEN UUTEEN KAUPUNKIIN: KARTTA BLURRINA JO ESITTELYKUVIEN TAUSTALLA, #KARTTATAUSTA LUENNAN JA '
          + 'KAUPUNKIESITTELYN AIKANA: TUMMEMPI JA PEHMEA, #KARTTAUUDISTUKSEN PAATOKSET 35: LUENTAKUVAT PIENEMMIKSI, KUVATEKSTI PAPERILLA, OHITA-TEKSTI, PIKKUKUVAT MATKAKIRJAN LOPPUUN, '
          + '#KARTTAUUDISTUKSEN PAATOKSET 38: TEKSTIT PIILOSSA KUNNES NAPAUTETAAN, KUVAT LENTAVAT PIENENNETTYYN MATKAKIRJAAN, #KAIUTIN SAMALLE RIVILLE JA VU-MITTARIKSI; LUENTAKUVAT VINOON PAKAKSI '
          + 'ILMAN HAIVYTYSTA, #IPHONE: ISOISAN JA PULUN TEKSTIT PIILOON, LIIKU-NAPPI PIILOON LUENNAN AJAKSI JA HUOMAAMATTOMAMMAKSI, #LUENNAN MERKKI: KAIUTINKUVA SYKKII MATKAKIRJAN YLARIVILLA, '
          + '#KAIUTTIMEN KAARET SEURAAVAT PUHETTA, EIVAT AJASTUSTA, #HUNTUVIKA IPHONELLA: LUENTAKUVA SUMENEE HUNNUN MUKANA, #VIKA: ASETUSTEN AVAAMINEN KESKEN LUENNAN KUTISTAA LUENTAKUVAT, #PULUN '
          + 'KUVAT: SAMA HUNTU KUIN ISOISAN KUVILLA, NAKYVISSA PULUN TARINAN LOPPUUN, #KARTTAUUDISTUKSEN PAATOKSET 31: LUENTAKUVAT POIS KARTALTA TOISTAISEKSI; VIKA PARIISIN LAHIZOOMISSA, '
          + '#KARTTAUUDISTUKSEN PAATOKSET 12 TARKENNUS: PULUN HAHMO PYSYY KULMASSA, #KARTTAUUDISTUKSEN PAATOKSET 12: RANSKA-PILOTIN PALAUTE, TOINEN KIERROS.',
        'LIIKKUMINEN — LIFTAUS, BUSSI, LAIVA, LENTO (13.–20.9.2026): LIFTAUS = noppa uudella nimellä ja autokyytianimaatiolla (P1), ja sen kyytimaksu £50 maksetaan kerran kaupungista lähdettäessä '
          + '(omistaja 11.10.2026 klo 22.4x, juna 183; hinnat: Ydinajatus, PELIT, TALOUS JA LUENTA); automaattinen nopanheitto on voimassa liftauksessa ja laivareitillä (asetuksen mukaan), bussin '
          + 'olemassaolo ei estä sitä (P5, 19.9.); bussi (£80) vie suoraan seuraavaan kaupunkiin ilman noppaa ja aikakulua; bussi ja lento valitaan Liiku-napista ennen heittoa (P5); Liiku on '
          + 'läpinäkyvä tekstinappi alhaalla keskellä (P28); LIIKU AARTEEN MUKAAN (omistaja 11.10.2026 klo 20.5x): Liiku on himmeä, kunnes kaupungin aarre on avattu, ja erottuu sen jälkeen '
          + 'selvemmin; seuraavassa kaupungissa se on taas himmeä, kunnes aarre on löydetty. Reittiviuhka näkyy vain matkasession ajan: alkaa Liiku-napista ja päättyy saapumiseen tai peruutukseen '
          + '(P8); liftatessa piirretään heiton kantaman kaaret normaalisti ja kaikki muut laudan kaaret himmeinä staattisena kerroksena (omistaja 20.9. klo 13.50). Pelinappula kulkee joka '
          + 'matkapisteen läpi kiihdyttäen ja jarruttaen, hyppy askel askeleelta kaarena kuten 2.9.2026, kamera edellä ja nappula perässä; reitti ei katoa siirtymän ajaksi (P29, 19.9.); välipisteet '
          + 'piirretään päätepisteen kokoisina ympyröinä ilman punaista korostusta (P39); hyppyjen ajaksi kamera ajaa nappulan lähelle niin, että yksi askel on selvästi näkyvä (≥ 25 % ruudun '
          + 'mitasta), katto puhelimen syvin sallittu zoomi (40 lautayksikköä), perillä kamera jää lähelle (P40); nopan jälkeen ulossovitus voittaa kohdemaan zoomikaton (P47); noppanappi ei saa '
          + 'jäädä suljettuun liukuun (P45). Lento kaupungista toiseen: kamera asettuu ennen lentoa niin, että lähtö ja kohde näkyvät vastakkaisilla reunoilla, kone piirtää punaisen viivan, pulu '
          + 'pois kartalta lennon ajaksi (P30); lentonäkymässä (lentolista auki tai lento valittu) ei liftauskaaria, lentokohteet pisteinä ja niminä (20.9.). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-13--09-20.md #KARTTAUUDISTUKSEN PAATOKSET 1, #KARTTAUUDISTUKSEN PAATOKSET 5: AUTOMAATTINEN NOPANHEITTO SAILYY, BUSSI VIE SUORAAN, #KARTTAUUDISTUKSEN '
          + 'PAATOKSET 8: REITTIVIUHKA NAKYY VAIN MATKAN AJAN, #KARTTAUUDISTUKSEN PAATOKSET 29: PELINAPPULA KULKEE JOKA MATKAPISTEEN LAPI, KERMA POIS LIIKKEEN AJAKSI, #KARTTAUUDISTUKSEN PAATOKSET '
          + '30: LENTO RAJATAAN LAHTO- JA PAATEPISTEEN MUKAAN, PUNAINEN VIIVA PIIRTYY, PULU POIS, #KARTTAUUDISTUKSEN PAATOKSET 39: VALIPISTEET PAATEPISTEEN KOKOISINA ILMAN PUNAISTA, '
          + '#KARTTAUUDISTUKSEN PAATOKSET 40: KAMERA LAHEMMAS NAPPULAA HYPPYJEN AJAKSI, #KARTTAUUDISTUKSEN PAATOKSET 45: LAIVAMATKAN NOPPA JAI NAKYMATTOMAAN LIUKUUN, #KARTTAUUDISTUKSEN PAATOKSET 47: '
          + 'NOPAN JALKEEN KAMERA JAI TYHJAAN KOHTAAN - KOHDEMAAN ZOOMIKATTO KUMOSI ULOSSOVITUKSEN, #NAPPULAN HYPPY TAKAISIN, AUTOMAATTINEN NOPANHEITTO, REITTI KATOAA - KORJAUS, #ASTROPULU JA '
          + 'LENTONAKYMA TEHTY.',
        'ASTRONAUTIN KAMERA -LINSSI (15.–20.9.2026, uusin voimassa): NASA-KUVIEN VALKOINEN PALKKI (omistaja 20.9. ja 30.9.2026 klo 23.5x: "jos tulee lisää kuvia joskus myöhemmin peliin, niin niistä '
          + 'pitää poistaa se jo lisäämisvaiheessa"): alareunan valkoinen tunnuspalkki rajataan pois kaikista ISS-/NASA-kuvista jo lisäysvaiheessa (lisäystyökalun tarkistus + testi hylkää '
          + 'palkillisen kuvan); tunnus ja lähde säilyvät metatiedoissa. Pallon reliefi renderoidaan koko maapallolle tarkasta korkeusdatasta omistajan Macilla (tools/tee-reliefikartta.mjs; '
          + 'puhelimella 4k, muuten 8k), saturaatio hieman alas, pallo tummempi, auringon sivuvalo (P28-sarja 16.9.). AVAUS: linssi rakennetaan valmiiksi piilossa; musta ruutu ja NASA-tyylinen logo '
          + 'vähimmäisajan, sitten paljastus valmiiseen palloon pilvisumuineen (Blue Marble -pilvikerros, häipyy lähizoomissa); pallo täyttää ruudun melkein kokonaan, ISS kiertää palloa (inklinaatio '
          + '51,6°, tummempi viiva, ISS:n näköinen merkki kiekon sisällä) ja pallo pyörii hitaasti ISS:ää seuraten kunnes pelaaja pysäyttää liikkeen (P41, P52, P53). Ei yläpalkkia, ei hampurilaista, '
          + 'ei Liiku-nappia, ei karttaselitteiden väkästä; kohdepisteet ovat pelkkiä hehkuvia vihreitä pisteitä ruutuvakiokokoisina; tähtitaivas paikallaan, pölykerros pyöreinä hiukkasina. '
          + 'VALOKUVANÄKYMÄ: kuva koko ruutuun heti; selite kuvan päällä vasemmassa yläkulmassa avautuu pienennettynä otsikkoriviksi (kohteen nimi – maa), väkänen laajentaa lisätietoihin (aineisto, '
          + 'aika, paikka, lisenssi, lähde), selite pienenee kun kuvaa napautetaan, panoroidaan tai zoomataan; pienennetty inforuutu kutistuu animoiden tekstinsä levyiseksi (Arkkikirjasto: '
          + 'PIENENNETTY = MAHDOLLISIMMAN TIIVIS; avatun katto min(46 %, 560 px)); harmaa pyöreä X oikeassa yläkulmassa; pienoiskuvat kelluvat vasemmassa alakulmassa. PULU: minipulu ilman ympyrää, '
          + 'astronautin kypärä ja avaruusleijunta (Codexin toimitus 20.9.), teksti tummalla pohjalla, valmiit kysymykset vierittyvät pois, vastauksen alku pysyy paikallaan ja lisäteksti kasvaa '
          + 'piiloon alle (kortti 62 vh) (20.9., tehty); astropulu ei vuoda pelaajan sijaintia ja tuntee avatun kuvan nimen ja selitteen; kaksi valmista kysymystä per kohde esikirjoitetuin '
          + 'vastauksin (js/linssit/astronaut-kysymykset.js). ÄÄNI: yksi yhteinen avaruushumina on TAUSTAÄÄNI (taustaäänen säädin, ei musiikkikytkin), musiikki pois linssin ajaksi. Zoomikatto 25–35 '
          + '% lähemmäs (P50). Varusteruudukkoon oma kuvake (astronautti ja kamera), Fable hyväksyy ennen julkaisua (tilattu 20.9.). Loki: docs/raamattu-loki/paatokset-2026-09-13--09-20.md '
          + '#ASTRONAUTIN KAMERA -LINSSI: TARKEMPI RELIEFI, X-NAPPI, NASA-RIVI, EI LIIKU-NAPPIA, #ASTRONAUTIN KAMERA: VALOKUVANAKYMAN ASETTELU, #ASTRONAUTIN KAMERA: VALOKUVANAKYMA UUSIKSI 2 - SELITE '
          + 'KUVAN PAALLA, HAMPURILAINEN, HARMAA X, PIENOISKUVAT KELLUVAT, ISS JA PALLON VALAISTUS, #KARTTAUUDISTUKSEN PAATOKSET 41: TOPOGRAFIALINSSIN AVOMERI, NAPA JA PUUTTUVAT LAATAT; ASTRONAUTIN '
          + 'KAMERALLE PYRAMIDI, #KARTTAUUDISTUKSEN PAATOKSET 43: PUHELINTESTIN LOYDOKSET 7-11, #KARTTAUUDISTUKSEN PAATOKSET 49: MUSTA LAATTA PANOROITAESSA - MOOTTORIN POHJAPALLO SAA KARTAN SAVYN, '
          + '#KARTTAUUDISTUKSEN PAATOKSET 50: ASTRONAUTIN KAMERAN ZOOMIKATTO HIEMAN LAHEMMAS, JA LAATAT JOTKA EIVAT PIIRRY iOS:LLA, #KARTTAUUDISTUKSEN PAATOKSET 52: ASTRONAUTIN KAMERAN AVAUS - '
          + 'VALMIIKSI PIILOSSA, MUSTA RUUTU JA PALJASTUS; PALLO LAHEMMAS; ISS, #KARTTAUUDISTUKSEN PAATOKSET 53: ASTRONAUTIN KAMERAN PULU JA AVAUKSEN RAUHA, #ASTROPULU JA LENTONAKYMA TEHTY.',
        'LINSSIEN SUUNTA (omistaja 21.9.2026): tavoitteena ovat myös linssit, joissa on KOLMIULOTTEINEN TILA, jossa pelaaja voi kulkea — esim. arkeologinen kohde loistonsa päivinä tai historiallinen '
          + 'hetki (kirjattu apurahahakemukseen AVEK DigiDemo 2026). Linssit lajitellaan maanosittain: maanosaan sidotut ja ripoteltavat (sopivat minne vain); linssien määrä tasataan maanosien '
          + 'kesken. Ideavarasto MAAPALLON VOIMAT (El Niño ensimmäisenä) lokissa 21.9.2026. DATALÄHDE TALTEEN (omistaja 8.10.2026 klo 17.3x: "ota dynamical.org talteen datalähteenä"): dynamical.org '
          + 'tarjoaa avoimia sääennuste- ja analyysiaineistoja koko maapallolta analyysivalmiina pilviaineistoina (esim. GFS ja ECMWF). Se on mahdollinen lähde MAAPALLON VOIMAT -linssin tuuli- ja '
          + 'pilvikerroksille ja kuumailmapallon todelliselle tuulelle. Se ei ole vielä käytössä, ja lisenssi ja käyttöehdot tarkistetaan ennen käyttöä. Nykyinen LIVE-sää tulee MET Norwaysta. MUUT '
          + 'LINSSIT (14.–20.9.2026): linssi on oma näkymä — kohdemaan korostus, maapaneeli, nostot ja tasoituskerma eivät näy linssissä, ja pelin muut äänet (luenta, pulu, musiikki) pysähtyvät '
          + 'linssin avautuessa (14.9.); linssien kehys (yläpalkki, alapalkki, reunojen napit) palaa mustan tai avaruusvaiheen jälkeen LIUKUMALLA ruudun ulkopuolelta paikalleen, ei feidaten — oletus '
          + 'kaikkiin linsseihin (16.9.). IHMISEN MATKA: leviämisrintaman etuosa ei välky, musta alku täysin tyhjä (ei palkin viivaa eikä nuolta), Liiku pois; lisänostoille aito Commons-kuva heti ja '
          + 'kuvaputken havainnekuva toisena kuvana myöhemmin; pulun keskustelussa 2–3 jakson mukaista valmista kysymystä esikirjoitetuin vastauksin tervehdyksen tilalla (15.9., 19.9.). '
          + 'TOPOGRAFIALINSSI: pelin elementit pois, koko maapallo katsottavissa maailmatilasta riippumatta, reliefi 1\' tarkkuudella laastarina (tarkempi vain 15 kaarisekunnin datalla), meret ja '
          + 'sisäjärvet mukana (järvimaski, reliefi poltettu 20.9.), taustamusiikki pois linssin ajaksi; pohjalaattojen jono ei valu linssin puolelle (P46). Keskeneräiset linssit (vertailu, maiden '
          + 'tiedot, vesistö) merkitään harmaalla omalla rivillään pienemmin ikonein (20.9.). Loki: docs/raamattu-loki/paatokset-2026-09-13--09-20.md #LINSSIVIKA: KOHDEMAAN KOROSTUS JA MAAPANEELI '
          + 'VUOTAVAT LINSSIIN, KARTAN REUNA VAREILEE, #LINSSIEN KEHYS LIUKUU SISAAN MUSTAN JALKEEN, EI FEIDAA, #IHMISEN MATKA -LINSSI: RINTAMAN VALKKYMINEN, MUSTA ALKU, LIIKU POIS; '
          + 'ASTRONAUTTILINSSILLE OMA KUVAKE, #IHMISEN MATKA: LISANOSTOILLE AITO COMMONS-KUVA NYT, HAVAINNEKUVA MYOHEMMIN, #IHMISEN MATKA: PULUN VALMIIT KYSYMYKSET JOKA JAKSOON, #TOPOGRAFIALINSSI: '
          + 'TARKKUUS EI NAY, PELIN ELEMENTIT POIS, KOKO MAAPALLO KATSOTTAVISSA, #KARTTAUUDISTUKSEN PAATOKSET 46: POHJALAATTOJEN JONO EI VALU TOPOGRAFIALINSSIN PUOLELLE.',
        'MATKALAUKKU ON FOGGIN MATTOLAUKKU (omistaja 15.9.2026): 1873 matkustettiin mattolaukulla (Vernen Fogg); pelin laukun kuvake on mattolaukku, nimi säilyy Matkalaukkuna. Päävalikon '
          + 'hampurilaisikoni on alkuperäinen kolmen viivan ikoni kaikissa asennoissa; vaakatilan väkäsikoni vaihtui tavalliseksi hampurilaiseksi (14.9., 2.10.2026). Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-13--09-20.md #MATKALAUKKU ON FOGGIN MATTOLAUKKU, #HAMPURILAISEN IKONI: ALKUPERAINEN TAKAISIN, NYKYINEN VAIN IPHONEN VAAKATILASSA KUN YLAPALKKI ON '
          + 'PIILOSSA.',
        'VIISAAN PÖLLÖN ARVONIMET (omistaja 19.9.2026): yliviivausvitsi ei vanhene — js/packs/pollon-arvonimet.js sisältää 30 yleistä arvonimeä ("Kaikkitietävältä Pöllöltä", "Yön Professorilta", '
          + '"Hänen Höyhenisyydeltään"…) ja 37 maanosittaista; pitkät tiivistetään vaakasuunnassa yliviivatun osalta; arvonimi valitaan kohteen maan mukaan, ei pelaajan sijainnin. Loki: '
          + 'docs/raamattu-loki/paatokset-2026-09-13--09-20.md #VIISAAN POLLON ARVONIMET - NIMILAPPUVITSIN YLIVIIVAUS VAIHTELEE.',
        'TYÖTAPA JA SESSIOT: ks. Ydinajatus-osion kohta 2 (sitova, omistaja 20.9.2026).',
        'Saapumiskortti: luettu matkakirjamerkintä + esittely kuvineen.',
        'Lehtikaupungissa kortti on paikallislehti: sivut, kuvataitto, sää, media (ks. KAUPUNGIN AVAUSKORTTI: nähtävyyskartta ja turisti-info ovat avauskortissa, ei lehdessä).',
        'Kohdekartta on PELKKÄ VÄRIKARTTA (linjaus 15.8.2026: "Piirroskartan voi ottaa kokonaan pois ja pitää vain värillisen"). Kohteet leikattuina piirroksina kartalla; klikkaus keskittää ja '
          + 'suurentaa 75 %:iin, numerokyltistä juttuun.',
        'KOHDEKARTAN KOHDEMÄÄRÄ (omistaja 26.8.2026 ilta: "Kohteita voi olla jopa 15 jos ovat vain mielenkiintoisia"): 6-8 on pohjataso ja 15 yläraja — määrä ei ole tavoite, mielenkiintoisuus '
          + 'ratkaisee. Jokainen uusi kohde tarvitsee kuratoidun jutun lähteineen, paikan kartalta ja miniatyyrin; täytekohteita ei lisätä ylärajan täyttämiseksi.',
        'Kohteita saa olla entistä enemmän per kaupunki — kartta on zoomattava (linjaus 15.8.2026). Uudet kaupunkikartat tehdään 5 kaupungin erissä omistajan tsekattavaksi.',
        'UUSI TARINAKAARI ON FOKUSVIRTA (korvaa 17.8. jäädytyksen; 25.8.2026): uusi maa rakennetaan Sofia-mallilla — Fable kirjoittaa sitovan kaanonin (matkakirja, pöllön huomio, täyt, täkynostot; '
          + 'docs/moduulit/tarinakaari.md), rakentaja siirtää sen sanasta sanaan fokusvirtapaketiksi ja kohdelistaksi tutkimusraporttien faktoilla. Kuusi maata tehty tällä mallilla.',
        'MATKAILIJAN OPAS on pelin kevyt ja viihteellinen osa, joka houkuttelee matkustamaan itse kohteeseen (linjaus 16.8.2026): se saa käyttää muuta lehteä iloisempia värejä, ja etusivulla siihen '
          + 'kutsuu pirteä kulmalappu. Rakenne: aihejaksot isoine kuvineen, tekstinosto sekä sää- ja suunnittelulaatikot (docs/kuvakasikirjoitukset.md + työlistan speksit).',
        'Valmiustilanne kaupungeittain: Tilastot-lehti, ei tämä.',
      ],
    },
    {
      otsikko: 'Matkakirjan ihmeet',
      tila: 'luonnos',
      kohdat: [
        'YDIN (omistaja 27.8.2026): kadonnut suuruus palautetaan pelaajan silmien eteen FOTOREALISTISENA KESKELLÄ NYKYMAAILMAA — Faros nyky-Aleksandrian Cornichen ruuhkassa, kolossi Mandrakin '
          + 'jahtisatamassa, värikäs Parthenon nykyturistien ympäröimänä. "Saa kokea pienen ihmeen kun näkee jotain mitä on jo tavallaan kadonnut nykymaailmasta." Tämä on YKSI PELIN KOHOKOHDISTA ja '
          + 'käy sellaisenaan MARKKINOINTIIN.',
        'KAKSI ESITYSTAPAA (omistaja 27.8.2026): jos kohde on YHÄ OLEMASSA (Akropolis, pyramidi, rauniokohteet), kartalla on normaali merkintä, pääkuvana nykytilan valokuva ja sen alla oma nappi, '
          + 'josta ihmeen pääsee kokemaan (nykyaikakuva aukeaa). Jos kohde on KOKONAAN KADONNUT (Faros, kolossi, mausoleumi...), kartalla on suoraan oma TÄHTISYMBOLI ja popupin kuva aukeaa suoraan '
          + 'nykyaikakuvaan.',
        'Kuvien vasempaan yläkulmaan pelin piirtämä pieni nauha ("Matkakirjan ihme" tms.) pelin kartuutsityylillä — peli piirtää nauhan kuvan päälle, sitä ei polteta kuvatiedostoon.',
        'GENEROINTIKANAVA (omistaja 27.8.2026): uudet ihmekuvat generoidaan herokuvien tapaan ChatGPT:n käyttöliittymässä — Fable antaa promptit, omistaja generoi ja vie kuvat Drive-kansioon, Fable '
          + 'noutaa ja tarkistaa silmin ennen peliä. API-työnkulku (generoi-ihmeet.yml) jää varakanavaksi. Kuvissa ei tekstiä eikä vesileimaa, ja lähteeksi merkitään Matkakirjan havainnekuva.',
      ],
    },
    {
      otsikko: 'Maalehdet ja lukeminen',
      tila: 'luonnos',
      kohdat: [
        'Joka lehtimaalla maalehti: 2–4 aihesivua (3 juttua/sivu), minitehtävät, menovinkit, Maa numeroina.',
        'Kuva ja aihe aina omasta maasta — naapurilta ei lainata.',
        'MAALEHDEN NIMIÖ (omistaja 16.8.2026): pelkkä maan nimi ja lippu sen perässä — ei selittäviä lisäsanoja ("Ranska kartalla"), kartta näkyy sivulla itsestään.',
        'MAALEHDEN LAAJUUS (omistaja 17.8.2026): määräytyy maan SISÄLLÖN mukaan, ei kohdemäärän. Jokainen maa suunnitellaan ennen tekemistä: mitä siellä on, mitä kannattaa nostaa esiin — ja '
          + 'toteutetaan siinä laajuudessa kuin tarve on.',
        'Pyhät kaupungit: oma sivutyyppi, johdannot kirjoittaa Fable.',
        'PITKÄT ARTIKKELIT (idea): professorimaisia syväjuttuja, luettavia ja kuunneltavia; pöllö ehdottaa linkkeinä.',
        'KAUPALLISTAMINEN: julkaistaan ilmaisena; maksulliseksi vaihdettaessa aiemmat lataajat säilyttävät ilmaiseksi (App Storen hinnanvaihto, ei StoreKit-koodia). Pöllö ensisijaisesti ilmaiseksi '
          + 'Applen laitemallilla — suomen laatu testataan ensin.',
        'OIKEUDET JA TEKIJYYS (omistaja 27.8.2026, AVEK-haku): pelin oikeudet ovat Visuaaliviestinnän Instituutti Tampere Oy:llä. Julkisissa teksteissä tekijä on VVI, ei yksityishenkilö, eikä sanaa '
          + 'harrastusprojekti käytetä. Peli pysyy toistaiseksi ilmaisena.',
        'KÄÄNNÖKSET: vasta kun suomi on lukittu; ensin englanti. Kielikohtaiset sisältöpaketit, ei rivi-i18n:ää.',
      ],
    },
    {
      otsikko: 'Äänet ja luennat',
      tila: 'luonnos',
      kohdat: [
        'ÄÄNIPANKKI (omistaja 5.10.2026 klo 13.1x, sitova): pelin henkilöäänet tulevat yhdestä 20 äänen pankista, joka on suunniteltu ElevenLabsin Voice Designilla samalla pohjalla (studiolaatu, '
          + 'lähimikki, kuiva, ei kaikua, ei suomi-merkintää; v4-äänet puhuvat hyvää suomea). Äänet nimetään tyypin mukaan (esim. mies-50-jamakka-karhea), ja henkilöt viittaavat pankkiin; uutta '
          + 'ääntä ei suunnitella, jos pankista löytyy sopiva, eikä sama ääni puhu kahta henkilöä samassa paikassa. Kaiku ja tila lisätään pelissä (Steam Audio), ei ääneen. Kertoja (William), Pulu '
          + 'ja isoisä ovat pankin ulkopuolella. Vanhat kirjastoäänet poistetaan linnasta kokonaan. Lähde: tools/aanipankki/ (rekisteri.json v1 lukittu, kartta-olavinlinna.json, LAHTEET.md).',
        'ÄÄNET PCM:NÄ, PAKKAUS KERRAN (omistaja 5.10.2026 klo 13.4x, sitova): kaikki generoitavat äänet tilataan muodossa pcm_44100, tasoitus ja limitteri tehdään PCM:nä, ja mp3 pakataan vain kerran '
          + 'lopullisesta masterista. Koosteet tehdään WAV-mastereista, eikä jo pakattua ääntä pakata uudelleen. LYHYET KERTAÄÄNET (Pelikoodari 10.10.2026 klo 01.4x: 61 lyhyttä kertaääntä oli '
          + 'tasoitettu integroituun LUFSiin, ja ne jäivät +18…+24 dB liian koviksi ja yli 0 dBTP:n, esim. Olavinlinnan askeleet): alle noin sekunnin kertaäänet tasoitetaan huippuun tai lyhyen '
          + 'aikavälin kovuuteen, ja kaikkien äänten true peak on PCM-masterissa enintään −1 dBTP. ÄÄNIPORTTI (Pelikoodari ja Päätoimittaja 10.10.2026 klo 04.5x): kaikki äänipaketit läpäisevät '
          + 'proto-3d/tyokalut/aaniportti.py:n ennen vientiä (vie-paketti.sh:n pakollinen vaihe): true peak enintään 0 dBTP (tavoite −1 dBTP PCM:nä) ja lyhyiden kertaäänten kovuus lyhyen aikavälin '
          + 'mittarilla. Perustellut poikkeukset ovat portin POIKKEUKSET-listalla (esim. Lyria-raidat omistajan linjalla ilman tasokorjauksia), ja määräaikainen poikkeus poistetaan, kun korjaus on '
          + 'tehty. GENEROIDUT ÄÄNET ILMAN KUUNTELUA (omistaja 11.10.2026 klo 11.3x): ääntämistä ei tarkisteta kuuntelemalla eikä omistajalta, puheentunnistuksen epäilyt eivät pysäytä vientiä; '
          + 'ehtona kieli määritelty suomeksi (language_code fi); ääniportin tekniset tarkistukset pysyvät. DIALOGIT YHTENÄ OTTONA (omistaja 12.10.2026 klo 00.1x: "Äänitä kumpikin repliikki yhtenä '
          + 'pitkänä dialogi ottona jotta rytmi säilyy luontevana"; jatke omistajan 3.10.2026 säännölle "Pitäisi generoida yksi pitkä teksti kerralla jotta tulisi luonnollinen ääni"): kahden tai '
          + 'useamman äänen keskustelu, myös kertojan ja Pulun yhteinen selostus, generoidaan yhtenä dialogiottona aikaleimoin, ei repliikki kerrallaan (linnojen kohtauksissa samoin, ks. KOHTAUKSET '
          + 'YHTENÄ OTTONA).',
        'LUKIJAÄÄNI WILLIAM, EI KONELUKIJAA (omistaja 5.10.2026 klo 13.2x, sitova): kuvaselitteet, nostokortit ja lehdet luetaan Williamin äänellä (ElevenLabs-striimi), Pulun chatin vastaukset Pulun '
          + 'omalla äänellä; xAI:n Aino-ääntä ei käytetä. ISS:n kuvaselitteitä ei lueta automaattisesti, vaan vain kaiutinnapista (pelaaja päättää, milloin kuulee lisää); POIKKEUS AUTO (omistaja '
          + '14.10.2026 klo 09.4x): AUTO kytkee luennan heti, nappi on päällä oranssi, ja luennan aikana näkyvät vain otsikko, kuva ja maapallo (yksi napautus palauttaa napit ja Pulun). ISS:n '
          + 'tekstien äänet tehdään etukäteen; määrän päättää omistaja.',
        'STRIIMILUKIJAN KAKSI NAPPIA (omistaja 28.9.2026, sitova, web ja natiivi): kaikissa luentakohdissa näkyy vain kaiutin (toisto/tauko + VU) ja mini-hampurilainen; hammaspyörä-nappi poistuu. '
          + 'Hampurilainen avaa tiiviin valikon: tekstin kappaleet listana (napautus hyppää kappaleeseen, nykyinen korostettuna), alimpana kelausrivi — vasemmalla vierekkäin kappale taakse ja −10 s, '
          + 'oikealla +10 s ja kappale eteen — sekä entisen hammaspyörän ääniasetukset. AUTO JA ÄÄNEEN LUKU OLETUKSENA POIS (omistaja 11.10.2026 klo 20.5x): nostoissa Auto ja ääneen luku ovat '
          + 'oletuksena pois päältä. Auto on mini-hampurilaisen valikon pohjalla, ja sen oikealla puolella on lyhyt selitys siitä, mitä se tekee; kun pelaaja on kerran kytkenyt sen päälle, Auto '
          + 'ilmestyy noston nykyiselle paikalleen ja on siitä lähtien käytettävissä normaalisti. Pin-kuvakkeella ei ole omaa aktivointia: se tulee näkyviin Auton mukana ja on sen jälkeen aina '
          + 'käytettävissä. AUTO JA NOSTOJEN OHJAUS KYTKINRIVEINÄ (omistaja 11.10.2026 klo 23.4x): mini-hampurilaisen valikossa on vaakaviiva, jonka alla ovat tavallisina tekstiriveinä "Auto" ja '
          + '"Nostojen ohjaus", kummankin rivin lopussa kytkin, ja molemmat ovat oletuksena pois päältä.',
        'EI AANITIEDOSTOJA REPOSSA, KAIKKI VAIN AMPARISSA (omistaja 11.9.2026 klo 11.05, sanatarkasti: "repossa ei saa olla aanitiedostoja, kaikki vain amparissa"): assets/audio-kansion mp3:t '
          + 'poistetaan reposta (git-historiaa ei kirjoiteta uusiksi) ja peli hakee KAIKKI omat aanitteet - myos tehosteet ja huudahdukset - amparista media.matkakirja.app/audio/. Tama KUMOAA '
          + '16.8.2026 linjauksen repossa asuvasta ydinsetista: ydinsetin nopeus hoidetaan esilataamalla se service workerin koriin amparista, ei repon polusta. Generointityokalut (luennat, kaaret, '
          + 'kohtaamiset, huudahdukset, musiikki) kirjoittavat paikalliseen assets/audio-kansioon, joka on .gitignoressa, ja Actions-ajot vievat tuotoksen suoraan ampariin - mp3:ia ei committoida '
          + 'haaroihin eika PR:iin. Repon polkua ei ole enaa varareittina; amparin pettaessa aani jaa soimatta (peili on ainoa lahde). Tarkentaa linjauksia KAIKKI SISALTO AMPARISTA (18.8.) ja KAIKKI '
          + 'UUSI MEDIA AMPARIIN (21.8.).',
        'Viisas Kertoja lukee saapumiset, kohtaamiset ja aarretekstit. Luenta = teksti sanasta sanaan; arvottavia pulmia ei lueta.',
        'LUENTAPOLITIIKKA (omistaja 18.8.2026): lukija lukee VAIN varsinaiset leipätekstit ja niiden otsikot. Taulukot, kainalorivit, nostolistat, kuvatekstit, lähderivit, opasteet ja napit jäävät '
          + 'aina lukematta; otsikko luetaan vain jos sen alta löytyy leipätekstiä. Valinta tehdään VALKOLISTANA (uusi taittolaji on oletuksena hiljainen; luentaan pääsee merkitsemällä '
          + 'data-lukija="leipa") — ohituslista vaatisi muistamista joka taittolajista ja unohdus vuotaisi ääneen, valkolistan virhe kuuluu heti.',
        'LUKIJAN PYSYVÄ KAHVA (omistaja 18.8.2026, tarkennettu samana iltana): luennan kahva on sivun tarttuvan otsikkorivin kaiutin — lehdissä ja Matkailijan oppaassa rivi pysyy näkyvissä '
          + 'vieritettäessä, kaiutin sen oikeassa reunassa korkeussuunnassa keskitettynä. Se avaa säätöpaneelin myös kesken luennan; erillistä kelluvaa kaiutinta ei ole (v868:n kelluva kahva '
          + 'poistettu — kaksi kaiutinta samassa kulmassa).',
        'LUENTAPOLKU: äänite soi kun luenta-kenttä vastaa näyttötekstiä; muuttunut teksti striimataan. Matkakirjaluennat generoidaan maittain kaanonin valmistuessa (ElevenLabs, Viisas Kertoja, '
          + 'tunnetagit; tools/generoi-luennat.mjs).',
        'Lisäksi tehosteet, mietintämusiikki, äänimaisemat ja musiikkinäytteet. Uudet taustaäänet LUFS-mitataan heti (testi valvoo).',
      ],
    },
    {
      otsikko: 'Kuvat ja lähteet',
      tila: 'luonnos',
      kohdat: [
        'SEITSEMAN KUVAVAIHTOEHDON RAJAUS JA EHDOLLINEN KUVALUPA (omistaja 13.9.2026 tekstisession kautta, sanatarkasti: "poistin nuo 7 kuvaa tarkistussivuilla, koska samanlaisista kuvista oli kaksi '
          + 'eri vaihtoehtoa ja hyvaksyin kustakin vain yhden peliin" ja "ja tee sitten uudet kuvat niihin kaupunkeihin joissa tarina on muuttunut kun ollaan siina vaiheessa etta tekstien aanet '
          + 'generoidaan"): Mont Blanc, Vignemale, Mont-Saint-Michel, Ales stenar, Urnes, Visby ja Gamla Uppsala pitavat kukin yhden hyvaksytyn kuvan, hylatty rinnakkaisvaihtoehto poistuu '
          + 'pelikytkennoista; kohteita ei poisteta. EHDOLLINEN LUPA: tarinaltaan muuttuneisiin kaupunkeihin (alustava lista Ateena, Sofia, Istanbul, Rooma, Wien, Lontoo, Amsterdam, Dublin, '
          + 'Edinburgh, Islanti, Alpit) uudet kokonaiset kuvaversiot VASTA kun hyvaksytyn tekstiversion aanten generointivaihe alkaa - ei nyt. Ei muita uusia kuvia talla perusteella.',
        'CHATGPT-IKKUNA ENSISIJAISEKSI KAIKESSA KUVAGENEROINNISSA (omistaja 28.8.2026: "Generoidaan kuvat mieluiten minun chatgpt ikkunassa... Tulee paljon edullisemmaksi kuin apilla" - KUMOAA 26.8. '
          + 'API-vakioluvan (KUVAGENEROINNIN TYÖNJAKO, historia lokissa) oletuksena): Fable antaa promptit NIPUSSA chatissa (tyylikaare + kohdelista + tiedostonimiehdotukset), omistaja generoi '
          + 'ChatGPT:ssa ja vie kuvat Driven matkakirja-kansioon, nouto nouda-drive.yml:lla ja Fable silmatarkistaa ennen pelia. API-tyonkulut jaavat VARAKANAVAKSI (kaytto vaatii syyn, esim. kiire '
          + 'tai referenssikuvaohjaus). KOLME PUTKEA JA JAOTTELUSAANTO (omistaja 28.8.2026 ilta): jokainen kuvatilaus jaotellaan aina putkeen HERO (kohde nahtavissa nykyaan - pisin kaava, viitekuvat '
          + 'ja tarkka syynays koska kuvan on vastattava todellisuutta), IHME (loistoaika- tai havainnekuva kadonneesta - kevyempi, ei tarvitse vastata nykytodellisuutta; myos takynostojen '
          + 'loistoaikakuvat kuuluvat tahan) tai AARRE (esinekuva vakiotaustalla, vaalea pergamentti). Drive-kansio kertoo putken (matkakirja/herot|Ihmeet|aarre), ja Fable poimii kuvat kansiosta '
          + 'oikeisiin paikkoihin pelissa - pelin kayttopaikka ei maaraa kansiota. KUVAMUOTO ON JPG (omistaja 28.8.2026: vie vahemman tilaa); peliin paatyessa Fable saa konvertoida webp:ksi. '
          + 'PROMPTIEN TOIMITUSMUOTO (omistaja 28.8.2026 ilta): promptit annetaan chatissa AINA KOODILOHKONA (kopiointinappi), ja koko satsi YHTENA ISONA LOHKONA aihetta kohti - jokaisen promptin '
          + 'edella oma rivinsa jarjestysnumerolle ja tiedostonimelle, ja tyylikaare leivottuna valmiiksi jokaiseen promptiin (yksi kopiointi = yksi valmis prompti).',
        'KUVAMALLI (omistaja 27.8.2026): OpenAI:n kuvissa käytetään AINA uusinta mallia — nyt gpt-image-2 (vertailussa selvästi valokuvamaisempi kuin gpt-image-1); kun uudempi julkaistaan, '
          + 'vaihdetaan siihen vertailukokeen kautta. Työnkulkujen oletusmalli pidetään tässä linjassa.',
        'HEROKUVIEN HYBRIDIMALLI (omistaja 25.8.2026, korvaa 24.8. tauon API-massa-ajojen osalta): omistaja generoi herokuvat ChatGPT Plus -käyttöliittymässä Fablen promptiarkeilla (VAKIO-resepti '
          + 'tools/hero-kuvakulmat.mjs; arkin mukana 2–3 Commons-valokuvaa viitteeksi), ja API:a käytetään vain täsmäajoihin — kiinteä kuukausihinta voittaa kuvakohtaisen API-hinnan (~0,17–0,25 '
          + '$/kuva). Kuvat toimitetaan Fablelle, joka vie ne ämpäriin. Viitteettömiä yleisnäkymiä ei generoida (kierrosten 22–25 oppi: ne keksivät maamerkkejä).',
        'Kaikki kuvat PD/CC (Commons, Finna, LoC, Flickr — lisenssi aina rajapinnasta), silmin tarkistettuina; tekijä ja lisenssi näkyvissä.',
        'ELÄINKOHTEEN KUVA NÄYTTÄÄ ITSE ELÄIMEN (omistaja 26.8.2026 ilta: "Pitäisi saada kuva itse eläimestä aina jos on söpöysmerkki"): eläinkategorian (pöllönpoikas-symboli) kohteen kuvassa on '
          + 'eläin lähikuvassa, ei maisemaa. Jos paikan omat otokset ovat kaukaisia läiskiä, kuva saa olla lajista muualta — selite kertoo paikan rehellisesti. LAAJENNUS (omistaja samana iltana: '
          + '"Söpö kohteissa voisi olla useampikin kuva jos vain löytyy. Myös live kamerat hyviä jos löytyy"): eläinkohde saa USEAMMAN kuvan kun hyviä löytyy, ja LIVEKAMERAN kierros-mekanismilla '
          + '(pelin sisäinen selainikkuna + Avaa selaimessa -linkki) — vain virallisia, upotuksen sallivia lähteitä, ja toimivuus tarkistetaan ennen julkaisua.',
        'Etusivukuvien kaava (omistaja 16.8.2026): kuva-aiheet speksataan kaupunkikohtaisesti ENNEN hakua (docs/kuvakasikirjoitukset.md). Pääkuva = tärkein kohde näyttävänä laajakulmana '
          + 'erikoisvalossa (karuselliin voi lisätä muita näyttäviä); pikkunosto 1 = toiseksi tärkein kohde; pikkunosto 2 = yllättävä, oivaltava yksityiskohta. Pikkunostoihin ei karusellia ja vain '
          + 'vaakarajauksen kestäviä kuvia. Haut Commonsin FP/QI- ja valokategorioista.',
        'OPPAAN AVAUSKUVA (linjaus 17.8.2026): aina kolmen kuvan karuselli, ja kuvat valitaan JAKSON TEKSTIN mukaan eikä kaupungin yleisistä maamerkeistä — jos teksti mainitsee emalikyltin, se myös '
          + 'näkyy. Karuselli on sisältöä, ei koriste.',
        'MATKAILIJALLE-KUVAN KAAVA (omistaja 16.8.2026): osion kuva on sen myyntikuva — yksi aihe joka täyttää ruudun, paikan oma erikoisuus ("wow-efekti"), FP/QI jos on, selkeä valo, lukee pienessä '
          + 'koossa ja pääaihe ei jää diagonaalinauhan alle.',
        'KAIKKI SISÄLTÖ ÄMPÄRISTÄ (omistaja 18.8.2026): pelin lataama media tarjoillaan aina omasta peilistä (R2), alkuperäisosoite on vain varareitti. Uusi kuva- tai äänilähde saa tulla peliin '
          + 'vasta kun peilausputki (tools/peilaa-media.mjs) kattaa sen osoitteet. Repon mukana kulkevat tiedostot (esim. miniatyyrit, liput) ovat osa sovellusta eivätkä tarvitse peiliä.',
        'VALOKUVAKOPIOT EIVÄT MENE REPOON (omistaja 19.8.2026: "pitäisi mennä pelkästään ämpäriin"): haetut valokuvat (Flickr-kopiot, Commons-peilaukset ja assets/valokuvat-kansion uusi aineisto) '
          + 'tallennetaan ämpäriin, josta peli hakee ne — service worker välimuistittaa, joten kerran nähty toimii offline. Itse generoidut kartat ja sovelluksen omat assetit pysyvät repossa. '
          + 'Git-historian purku on erillinen kertatyö (tehtävä #57).',
        'KAIKKI UUSI MEDIA ÄMPÄRIIN, EI REPOON (omistaja 21.8.2026: "Kaikki aina ämpäriin eikä repoon"): tästä eteenpäin KAIKKI uusi media — myös itse generoitu (julisteet, äänitallenteet, tulevat '
          + 'kuvasarjat) — viedään R2-ämpäriin, josta peli hakee sen PEILI_JUUREN kautta; repoon ei lisätä uusia mediatiedostoja. Tämä tiukentaa 19.8. linjausta: myös generoitu aineisto kuuluu '
          + 'ämpäriin, ALKUPERÄISESSÄ LAADUSSA (omistaja 21.8.2026: julisteita ei pakata pienemmiksi — ämpärissä koko ei ole ongelma). Olemassaolevat repossa asuvat assetit (kohdekartat, '
          + 'miniatyyrit, liput) siirretään ämpäriin hiljaisena hetkenä (omistaja 21.8.2026: "siirrä kaikki ämpäriin kun tulee hiljainen hetki") — kertatyö, joka vaatii R2_ACCOUNT_ID- ja '
          + 'R2_BUCKET-arvot ympäristöön sekä latauspolkujen muutoksen ja git-historian purun harkinnan.',
        'Miniatyyripiirrokset generoidaan yhdellä otolla per kohde (kustannuslinjaus 16.8.2026).',
        'MATKAOPAS ON NYKYTIETOA (omistaja 20.8.2026): Matkailijalle-osion ja matkaoppaan kuvat ovat TUOREITA kuvia — historialliset kuvat kuuluvat historia- ja nosto-osioihin. '
          + 'Matkailijalle-etusivukuva on AINA PYSTY (omistaja 20.8.2026: "Matkaoppaan kuva etusivulla pitää olla pysty") — mutta MALTILLINEN pysty, ei ääripitkää tornikuvaa joka venyttää palstan '
          + '(Mosul-tapaus). Opas sanoo SUORAAN, jos matkustaminen kohteeseen on nykyisin vaarallista tai rajoitettua — asiallisesti ja lyhyesti, ilman pelottelua; pelaajaa ei jätetä kuvittelemaan '
          + 'että kohde on tavallinen lomakohde jos se ei ole.',
        'KANSIKARUSELLI ON KOLME LAAJAA YLEISKUVAA (omistaja 21.8.2026: "kolme kuvaa pitäisi olla ennemmin laajoja yleiskuvia kaupungin eri puolilta tunnetuimmista kohdista. ei saisi olla ollenkaan '
          + 'yksityiskohtakuvaa näissä"): kaupunkilehden etusivun ensimmäisen kuvakarusellin kolme kansikuvaa ovat laajoja näkymiä — siluetteja, aukioita, rantoja, maamerkki ympäristössään — '
          + 'kaupungin ERI puolilta. Lähikuvat, sisäkuvat, reliefit, ruoka ja esineet kuuluvat nostoihin ja jaksoihin, eivät kanteen. Koskee myös vanhoja lehtiä: yksityiskohtakuvat vaihdetaan '
          + 'laajoihin.',
        'TUHOUTUNEEN KAUPUNGIN NYKYKUVAT (omistaja 20.8.2026): sodassa tai katastrofissa vaurioituneesta kaupungista näytetään MYÖS tuoreita kuvia, vaikka niissä näkyy vaurioita tai '
          + 'jälleenrakennusta — ja lehti kertoo lukijalle selkeästi, mistä kaupungin nykyilme johtuu, ettei pelaaja jää ihmettelemään miksi kuvat ovat vanhoja. Tuho kerrotaan tapahtumana '
          + 'neutraalisti, ilman julmuuksien yksityiskohtia ja ilman osapuolikehystä; kuvateksti sanoo mitä kuvassa näkyy. Edelleen EI taistelukuvia eikä uhreja. Korvaa aiemman "kuvat eivät saa '
          + 'näyttää tuhoja" -käytännön.',
        'TEKSTIEN PAINOPISTE (omistaja 20.8.2026: "Kuvatekstit liian pitkiä ja leipäteksti liian lyhyt"): lehden ETUSIVUN LEIPÄTEKSTI — se on ARTIKKELIT-paketin intro-kenttä, EI '
          + 'kulttuuri-kategorioiden johdanto — on 7–10 virkkeen johdatus: millainen kaupunki on, mikä sen merkitys ja historia; kaikki oleellinen alkuun. Sivujen johdanto-kentät pysyvät lyhyinä '
          + '(1–2 virkettä). KUVATEKSTI on YKSI virke (omistajan tarkennus 20.8.2026). Etusivun leipäteksti latoutuu kahdelle palstalle leveällä näytöllä. Kohdekartan esittelyteksti lyhyeksi: kartan '
          + 'kuvailu ei ole oleellista tietoa. Korvaa vanhat mitat (johdanto 154–232 mrk); vanhat lehdet kirjoitetaan uusiksi tähän asuun erissä.',
        'KUVATEKSTI KERTOO KOHTEESTA, EI KUVASTA (omistaja 22.8.2026: "Kuvatekstit pitää kertoa rakennuksesta, sen historiasta ja merkityksestä ei kuvailla kuvaa visuaalisesti. Tämä koskee kaikkia '
          + 'kuvatekstejä"): kuvateksti kertoo mitä kuvattu rakennus tai paikka ON — historian, merkityksen tai kiinnostavan faktan — eikä luettele mitä kuvassa näkyy (valoa, värejä, sommittelua, '
          + '"vasemmalla kohoaa..."). Visuaalinen kuvailu sallitaan vain kun se itse on asia, kuten tuhoutuneen kaupungin nykytila (ks. TUHOUTUNEEN KAUPUNGIN NYKYKUVAT). Yksivirkesääntö pysyy '
          + '(TEKSTIEN PAINOPISTE). Koskee KAIKKIA kuvatekstejä; vanhat kuvailevat selitteet kirjoitetaan uusiksi erissä.',
        'API-avaimia ei koskaan repoon eikä lokiin.',
        'SALAISUUDET (omistaja 26.8.2026): POLLO_KEHITTAJAKOODI ja EHDOTUS_AVAIN elävät VAIN GitHubin repo-secreteissä — niitä ei pyydetä keskusteluun, ei talleteta tiedostoihin eikä kirjoiteta '
          + 'lokiin. Täysi pöllösavuke ajetaan julkaisuporttina Actions-työnkululla (.github/workflows/savuke-pollo.yml, workflow_dispatch), joka saa arvot secreteistä; paikallinen savuke ajaa ilman '
          + 'koodeja osittaisena. TARKISTA AINA ENSIN, ONKO SALAISUUS JO GITHUBISSA (omistaja 2.9.2026: "ELEVEN_API_KEY on secretissa. Kannattaa aina tarkistaa onko. Koska siella pitaisi olla '
          + 'kaikki"): repo-secreteissa on kaikki pelin avaimet (R2, Cloudflare, ElevenLabs, OpenAI, Google, Anthropic, Drive, Freesound, Flickr, Europeana, App Store Connect). Secretien nimet nakee '
          + 'ilman oikeuksia komennolla `grep -rhoE "secrets\\.[A-Z0-9_]+" .github/workflows/*.yml | sort -u`. Avainta ei pyydeta omistajalta, ennen kuin tuo lista on katsottu; vasta jos avainta ei '
          + 'loydy, pyydetaan omistajaa lisaamaan se secretiin (ei koskaan keskusteluun). Syy (omistaja 2.9.2026): "Naita tulee yllattavan paljon, etta avain jo on olemassa mutta hommat ei etene" - '
          + 'tyo ei saa pysahtya odottamaan avainta, joka on jo paikallaan.',
      ],
    },
    {
      otsikko: 'Lukijoiden ehdotukset',
      tila: 'luonnos',
      kohdat: [
        'KANAVA (omistajan tilaus 18.8.2026): palautelomake laajenee niin, että pelaaja voi lähettää kuvia ja juttuideoita lehtiin. Lähetykset ladataan ämpäriin ja ne näkyvät AUTOMAATTISESTI '
          + 'omistajalle työhuoneen uudella Lukijoilta-lehdellä (hampurilaisvalikko) — Fablen esikuratointi kommentteineen ajetaan vain omistajan komennolla "kuratoi", eikä mikään julkaisu tapahdu '
          + 'ilman omistajan arviota.',
        'PRO-TUOTTAJAT (omistaja 18.8.2026): kanava vain omistajan henkilökohtaisesti kutsumille ammattilaisille. Omistaja myöntää pysyvän koodin työhuoneesta; vastineeksi sisällöstä tuottaja saa '
          + 'krediitin ja tekijäsivun (oma kuva, esittely, linkit). Kolme sääntöä: (1) mikään ei näy pelaajalle ennen omistajan hyväksyntää ja muutos palaa jonoon, (2) sähköposti ja koodi eivät '
          + 'koskaan vuoda julkiseen vastaukseen eivätkä lokiin, (3) lupa aina lupapohjalla (rinnakkainen ei-yksinomainen lisenssi, peruutus koskee uusia julkaisuja).',
        'Lomake ehdottaa automaattisesti sitä sivua, jolla pelaaja on; vapaa tarkennuskenttä on vapaaehtoinen. Pelaaja voi antaa nimen tai nimimerkin pelin kredititteihin ja sähköpostin, jos haluaa '
          + 'viestin kun kuratointi on valmis — molemmat vapaaehtoisia, ja sähköposti jää vain omistajan nähville (ei koskaan repoon eikä peliin).',
        'Pöllö opastaa kanavan käyttöön ja saa joskus ehdottaa minipuhekuplassa osallistumista ("haluatko osallistua pelin rakentamiseen?").',
        'Lähetetyt kuvat eivät ole pelisisältöä ennen kuin omistaja on hyväksynyt ne ja lisenssi on varmistettu — lomake pyytää vakuutuksen, että kuva on lähettäjän oma ja saa julkaista (CC BY '
          + '-henkisesti); ilman sitä kuvaa ei oteta lehteen.',
        'PALKKIO (omistaja 18.8.2026): kuratoinnin läpäissyt ehdotus palkitaan pelirahalla. Omistaja määrittelee summan aluksi itse ehdotuksen laadun mukaan. Palkkio toimitetaan lunastuskoodilla, '
          + 'jonka pelaaja syöttää peliin (pelissä ei ole tilejä, joten koodi on ainoa reitti oikealle pelaajalle).',
      ],
    },
    {
      /*
       * Oma osio eikä Lukijoiden ehdotusten kohta: visio on pelin
       * filosofista ydintä (ks. Ydinajatus, PELIN MISSIO AI-AIKANA)
       * ja kantaa pidemmälle kuin nykyinen kanava.
       */
      otsikko: 'Sisältöeditori (visio)',
      tila: 'luonnos — suunniteltu kehityssuunta',
      kohdat: [
        'EDITORIN KAUNEIN IDEA (omistajan visio 26.8.2026): kuka tahansa voi tuottaa peliin näkyville asioita, jotka hän kokee mielenkiintoisiksi ja merkityksellisiksi, mistä päin maailmaa tahansa.',
        'KOLME NÄKYVYYSTASOA: vain itselle → oma yhteisö → kaikille pelaajille, kun sisältö täyttää pelin fakta- ja laatukriteerit.',
        'KURATOINTI: AI kokoaa ehdotetuista muutoksista tiiviin tietopaketin, mutta RATKAISUT TEKEE AINA IHMINEN.',
        'Nykyinen Lukijoilta-kanava ja pro-tuottajat (osio "Lukijoiden ehdotukset") ovat tämän ensimmäinen vaihe.',
      ],
    },
    {
      otsikko: 'Talous ja palkkiot',
      tila: 'luonnos',
      kohdat: [
        'TULOT: paikallisaarteet, mantereen 1000 p, pääaarre 2000 p, oikeat vastaukset.',
        'MENOT: liftauksen kyytimaksu, bussi, laiva ja lento (hinnat: Ydinajatus, PELIT, TALOUS JA LUENTA) · mannerraja 1000 p · varusteet ~1000 p · visavihje ja 50:50.',
        'Kokemuspisteet ovat pelaajalle TIETÄJÄPISTEITÄ (tp; omistaja 18.8.2026). Ne nostavat kymmentä tietäjätasoa (Untuvikko 0 tp → Tietäjä iänikuinen 8000 tp, js/tietajatasot.js; rajat korotettu '
          + '18.8.2026 — omistaja: tasot tulivat aivan liian helposti, ylimmän tason kuuluu vaatia kymmeniä pelipäiviä) ja kysymysten vaikeutta. Tasonnousu ei anna muuta kuin nimikkeen; pöllö '
          + 'onnittelee minipuhekuplalla. Nimikkeet ja rajat ovat päätoimittajan sisältöpäätös.',
        'KAKSI VIHJETTÄ: visavihje = ostettava apu visassa; aarrevihje = tekstin sivuhuomio, ei mekaniikkaa.',
      ],
    },
    {
      otsikko: 'Rajaukset ja turvalinjat',
      tila: 'luonnos',
      kohdat: [
        'Ei nykysotasisältöä: Venäjä, Ukraina ja Syyria kulttuurikohteina. HISTORIALLISET taistelut saa näyttää — ne ovat perushistoriaa.',
        'Mekka ja Medina vain omistajan erillisellä päätöksellä, kunnioittavasti.',
        'Venäjän kaupungit ja Kabul mukana, mutta ilman uutisosiota (omistaja 13.8.2026).',
        'Kukaan ei iva paikallisia — koskee myös kohtaamishahmoja.',
      ],
    },
    {
      otsikko: 'Sanasto',
      tila: 'luonnos',
      kohdat: [
        'unohdettu aarre = Aarnin luettelon manneraarre · paikallisaarre = maan oma pieni/iso aarre · laatta = käännettävä kätkö · tutki kätkö -pelit = Etsi kätkö -napin tehtävät · kohtaaminen = '
          + 'kaupungin henkilö kysymyksineen · hiljaisen tiedon arkku = kohtaamisten kehys · valokuvapulma = vaihtoehdot oikeita valokuvia · mannerraja / mannerlento = eteneminen mantereelta '
          + 'toiselle · varustekauppa = valikon Käy kaupassa · superlinssi = alle 80 päivän palkinto · visavihje / aarrevihje = ks. Talous · johtolause = isoisän äänen esittelytapa · lehtikaupunki / '
          + 'maalehti = luettava lehti · työhuone = kehittäjävivun takaiset lehdet pelissä · fokuslehti = maan esirenderöity karttakuva · atlas = kaikkien valmiiden maiden lehdet kartalla · täky / '
          + 'täkynosto = uteliaisuuskoukku ja sen klikkiotsikkokupla · sähke / retkikunta = rakenteinen moninpeliviestintä · kaveriapu = retkikunnan veikkaus aarrekysymykseen (25 p) · turvatila = '
          + 'kaatumissilmukan itsekorjaus (lehdet pois tunniksi).',
      ],
    },
    {
      otsikko: 'Moduulit',
      tila: 'linjaus 17.8.2026 (remontin M1–M6, suunnitelman luku 3)',
      kohdat: [
        'Kaksitoista moduulia, kullakin yksi vastuu. Tekninen sisältö (tiedostolistat, siirtomallit) ei kuulu tähän vaan moduuliohjeisiin (docs/moduulit/) ja suunnitelmaan.',
        'Ydin = pelitila ja säännöt · Kartta = laudan piirto ja kamera · Linssit = karttakerrokset sopimuksineen · Tarinakaari = saapumiset, kohtaamiset, aarteet · Kätköpelit = visa, pulmat, '
          + 'tiimalasi (js/visa.js).',
        'Kaupunkilehti = lehden taitto ja sivupino (js/lehti.js) · Maalehti ja liput (js/maalehti.js, js/liput.js) · Matkailijan opas (js/opas.js) · Nähtävyydet ja kohdekartta (js/nahtavyydet.js).',
        'Äänet ja lukija = kaikki kuuluva: tehosteet, kertojaluennat (js/luenta.js), laiteääni · Viisas Pöllö = chat-apuri · Alusta = käynnistys, tallennus, jakelu ja työhuone.',
        'RAJAPINTASÄÄNNÖT: datapaketit eivät tuo mitään — ne ovat lehtiä puussa.',
        'Pinnat tuovat toisiaan vain kirjatusti ja yksisuuntaisesti (opas → nähtävyydet, lehti → maalehti, visa → luenta); kehäriski kierretään ui-delegaattorilla.',
        'Ydin ei tunne pintoja; pinnat kutsuvat Ydintä vain run/doAction-portin kautta.',
        'Laiska raja (dynaaminen tuonti), kun moduuli ei kuulu yhden tiedoston versioon (linssit, maakäyrät).',
      ],
    },
    {
      otsikko: 'Jakelu ja iOS-kuori',
      tila: 'kirjattu 25.8.2026 (omistajan huomautuksesta — tämä puuttui)',
      kohdat: [
        'PELIÄ PELATAAN ENSISIJAISESTI TESTFLIGHTIN KAUTTA: iOS-kuorisovellus (WKWebView) lataa pelin Pagesista (ravelius.github.io/Matkakirja). Kuoren lähdekoodi ON TÄSSÄ REPOSSA kansiossa ios/ '
          + '(SwiftUI + PeliSelain.swift + sillat + widget + fastlane; ks. ios/OHJE.md) — Claude on rakentanut sen aiemmissa sessioissa. Pelin puoleiset kytkennät ovat js/natiivi.js (silta '
          + 'window.matkakirjaNatiivi: iCloud-synkka, widget, Game Center, luentasilta js/lukija.js, haptiikka). Selain ilman kuorta on aina tuettu varapolku. HUOM: kuoren muutokset päätyvät '
          + 'laitteille vasta omistajan uudesta TestFlight-buildista — web-muutokset heti Pagesista.',
        'WKWEBVIEW ON AHTAAMPI KUIN SAFARI: sisältöprosessin muistikatto on tiukempi ja ylitys tappaa prosessin ilman virhettä — kuori lataa sivun uudelleen, mikä näkyy pelaajalle '
          + 'aloituslogosilmukkana. Muistipiikit (isojen kuvien purku, rasterointi) on mitoitettava kuoren mukaan, ei pöytäselaimen. Vikaraportit, joissa "peli jää logoruutuun", ovat ensisijaisesti '
          + 'muistikuolemia kuoressa.',
        'TURVATILA (v1112–v1113): kolme käynnistystä neljän minuutin sisään kytkee fokuslehdet ja atlaksen pois tunniksi, jolloin kaatumissilmukka purkautuu itsestään (js/main.js kirjaaKaynnistys, '
          + 'js/fokuskartta.js atlasTurvatila).',
        'HÄTÄKEINO pelaajalle: TestFlight-sovelluksen poisto ja uudelleenasennus nollaa kuoren välimuistin ja paikallisen tallenteen (iCloud-synkka voi palauttaa pelin).',
      ],
    },
    {
      otsikko: 'Poistetut ideat',
      tila: 'toimintatapa kirjattu 17.8.2026',
      kohdat: [
        'TOIMINTATAPA (omistaja 17.8.2026): pelistä poistettu idea ei jää varsinaisiin osioihin selityksineen — kohta poistetaan ja idea kirjataan tähän yhdellä rivillä. Raamattu pidetään '
          + 'mahdollisimman lyhyenä ja tiiviinä. POISTETTUJA TEKSTEJÄ EI ARKISTOIDA REPOON (omistaja 11.10.2026 klo 21.7x: "älä jätä tekstejä arkistoon ettei ne ala kummittelemaan peliin takaisin '
          + 'vahingossa"): pelistä poistetuista teksteistä ei jätetä kopioita repoon (ei raportteihin eikä arkistoon).',
        '— Matkakassa-osio oppaassa (17.8.2026); hintataso kerrotaan sivun alun kainalotaulussa plussana/miinuksena.',
        '— Offline-pelaus tavoitteena (16.8.2026); verkkoyhteyden saa olettaa, välimuisti on nopeutta varten.',
        '— Rosvo-, tyhjä- ja hevosenkenkälaatat; laatan alta löytyy aina aarre (poistettu pelistä v1109, 25.8.2026).',
        '— Erillinen vihjejärjestelmä; aarrevihjeet ovat tekstien sivuhuomioita.',
        '— Jalokivi- ja linssilaatat (25.8.2026); tilalla pieni ja iso paikallisaarre, linssit kauppaan.',
        '— Kiinteä ruutukoko kartan merkeillä (25.8.2026); merkit elävät kartan mittakaavassa.',
        '— LUENTA-liukukytkin puhekuplan alla (25.8.2026); kaiutinkuvake on kytkin.',
        '— Kehittäjän värilaattakoodit kartalla (25.8.2026); valmiusvärit vain Tilastot-taulussa.',
        '— Täkynoston alalaidan liuska (25.8.2026); nosto on puhekupla tapahtuman kohdalla.',
        '— Etusivun kirjakuva toistaiseksi (omistaja 25.8.2026); palataan kuvaan myöhemmin.',
        '— Isoisän aarremerkinnät aarteen avauksen jälkeen (omistaja 11.10.2026 klo 21.6x: "peli ei tarvitse niitä"; kumoaa saman päivän klo 13.5x:n mallin).',
      ],
    },
    {
      otsikko: 'Ohjedokumenttien kartta',
      tila: 'luonnos (omistajan tilaus 15.8.2026)',
      kohdat: [
        'PÄÄTÖSLOKI ON RAAMATUN LIITE (Raamatun jako, omistaja 20.9.2026 klo 18.08): Raamatussa on vain voimassa oleva linjaus per aihe (uusin päätös voittaa, päivämäärä ja lokiviite mukana); koko '
          + 'päätöshistoria on sanatarkasti kansiossa docs/raamattu-loki/ samoilla otsikoilla kuin ennen (KARTTAUUDISTUKSEN PAATOKSET n, TARKENNUS, TILA), jotta testien, savukkeiden ja koodin '
          + 'viittaukset löytyvät. Loki ei lataudu peliin eikä sessioille. UUDET PÄÄTÖKSET kirjataan lokiin, ei Raamattuun: `node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"` lisää tiedoston '
          + 'docs/raamattu-loki/paatokset-2026-09.md loppuun kohdan "## OTSIKKO (pp.kk.vvvv klo hh.mm)"; Raamatun linjausta muutetaan vain kun sääntö muuttuu. Loki on Raamatun liite, ei erillinen '
          + 'ohje.',
        'docs/raamattu-loki/paatokset-2026-08-24--09-03.md — päätösloki 24.8.–3.9.2026 (Fokusmoodi-osion 125 kohtaa sanatarkasti).',
        'docs/raamattu-loki/paatokset-2026-09-03--09-14.md — päätösloki 3.9.–19.9.2026 (Viisas Pöllö -osion 225 kohtaa: linssit, pallo, pulu, äänet, työtavat).',
        'docs/raamattu-loki/paatokset-2026-09-13--09-20.md — päätösloki 13.9.–20.9.2026 (Kaupungit-osion 101 kohtaa: KARTTAUUDISTUKSEN PAATOKSET 1–53, astronautin kamera, sessiot).',
        'docs/raamattu-loki/paatokset-2026-09.md — juokseva päätösloki 20.9.2026 illasta eteenpäin (tools/raamattu-kirjaa.mjs kirjoittaa).',
        'docs/raamattu-loki/paatokset-2026-10.md — juokseva päätösloki lokakuu 2026 (15.10.2026 alkaen kuukausitiedosto; tools/raamattu-kirjaa.mjs kirjoittaa).',
        'Tieto kulkee sessiolta toiselle vain kirjoitettuna. Kartta on täydellinen: dokumentti, jota ei ole listalla, ei ole ohje. Testi valvoo (tests/dokumentit.test.mjs).',
        'SIIRTOPROMPTIT (omistaja 19.8.2026): kun sessio kirjoittaa omistajalle promptin toiselle sessiolle vietäväksi, se annetaan vastauksessa AINA yhtenä koodilohkona, jotta omistajan ympäristöön '
          + 'tulee kopioi-nappi — ei koskaan juoksevana tekstinä tai vaakaviivoin rajattuna.',
        'CLAUDE.md — sisääntulo, osoittaa tänne.',
        'docs/tarina.md + docs/isoisan-raamattu.md — tarinan kaanon (vain Fable kirjoittaa).',
        'docs/tilinvaihto.md — tilinvaihdon käytännön ohje: järjestys, roolitaulukko (malli, kansio, aloitusviesti, silmukat) ja VOIMASSA OLEVA ARVO (14.10.2026).',
        'docs/aloitusviestit/ — aloitusviestit rooleille, joilla ei ole viesti-<rooli>-aloitus.md:tä mainissa (aanittaja, asemataulu, keskustelukanava, linnanrakentaja, postivahti, valoseppa).',
        'tools/tyotavat/ — Macin vain-paikallisten ohjeiden ja skriptien peili (LUEMINUT.md: alkuperäinen polku, ylläpitäjä, päivitys).',
        'docs/roolitus.md — työnjako, viestintä, julkaisusäännöt, pistokokeet.',
        'docs/vastuukartta.md — aineisto ja koodialue → omistava rooli (omistaja 14.10.2026; session id:t /Users/Shared/Claude/osoitekirja.md).',
        'docs/kuvatuotanto-kohtaamiset.md — kohtaamiskuvien julkinen tuotantoloki, hyväksytty kuvalinja ja toimitustilat.',
        'docs/moduulit/linssit.md · docs/moduulit/kaupunkilehti.md · docs/moduulit/maalehti.md · docs/tyolista-opukselle.md · docs/moduulit/tarinakaari.md · docs/pulu-reaktiot.md (pulun '
          + 'reaktiorekisteri, elava) · docs/mantereen-resepti.md · docs/kuvakasikirjoitukset.md — sisältöreseptit ja työlistat.',
        'docs/siirto-2026-08-30.md — session siirtodokumentti: kesken olevat erät, auki olevat PR:t ja jono (Fable 30.8.2026; arkistoidaan kun listat on ajettu loppuun).',
        'docs/moduulit/siirtoraportti.md — siirtoraportin ohje: mihin luovutus tallennetaan (docs/raportit/viesti-fable-luovutus-<pvm>.md) ja mitkä kymmenen osiota siinä on aina oltava, '
          + 'aloitusviesti yhtenä koodilohkona ja tarkistuslista. Koottu kaikista 24.8.–19.9.2026 kirjoitetuista siirto- ja luovutusraporteista.',
        'docs/moduulit/asemataulu.md — Asemataulun toteutus: ulkoasu, dokumentit ja kirjoittajat, junarivit, junan eteneminen ja päivitysrytmi (säännöt Raamatussa TYÖTAPA JA SESSIOT, ASEMATAULU; 14.10.2026).',
        'docs/moduulit/karttapallo.md — karttapallo pelilautana: arkkitehtuuri, kytkin ja palautusoptio, vaiheistus.',
        'docs/moduulit/laattapyramidi.md — laattapyramidin mitoitus, generointi ja siirtymä: lukitut mitat (7,2 px/yksikkö, 3 kaariminuuttia, 8 tasoa), mitatut koot ja ajat, sauman todistus ja '
          + 'parven työnjako.',
        'docs/moduulit/lukijoilta.md — lukijoiden ehdotukset: worker, lomake, Lukijoilta-lehti ja kuratointi.',
        'docs/linssikatalogi.md — linssikatalogi (n. 150 linssiä kuudessa moottoriosassa: aikajana, alue, virta, data, esitysmoottori, pohjakartat, sekä Pelissä nyt; moottorikortit, mitä opitaan, '
          + 'pelikytkös, 1873-sidos, aineisto, tila ja järjestys; koneluettava kopio linssikatalogi-data.js ja julkinen sivu linssikatalogi.html; elävä työlista, jonka Fable päivittää omistajan '
          + 'valintojen mukaan).',
        'docs/pelikatalogi.md — pelikatalogi (Euroopan perinteiset pelit maittain, 117 peliä kahdeksassa maantieteellisessä osassa: sääntö, oppimiskytkös, sopivuus 13+, botti/kaveri, pelikytkös, '
          + 'oikeudet ja lähde; elävä työlista samalla mallilla kuin linssikatalogi.md, ensimmäisten 10 pelin ehdotus ja omistajan ideat -osio; koneluettava data ja HTML-sivu Pelikoodarin vastuulla).',
        'docs/tilannekatsaus.md — tilannekatsaus (omistaja 27.9.2026: yhteisen kehityssivuston etusivu apurahan arvioijille ja yhteistyökumppaneille; osa-alueittain tila, kuvaus ja seuraavat '
          + 'askeleet; vain Fable kirjoittaa, Pelikoodarin sivusto renderöi sen Tilanne-välilehdelle linssien ja pelien rinnalle; vain suomeksi, julkinen linkillä mutta noindex, ei sisäisiä tietoja).',
        'docs/raportit/talous-suunnitelma-20260927.md — pelin talouden suunnitelma (päiväkulu, Kaupan hinnat, huvipuistot, tulolähteet, 2 vrk:n loppu, omistajan päätökset 27.9.2026).',
        'docs/moduulit/ihmisen-matka-virrat.md — Ihmisen matka varivirtoina: nelja virtaa, ylitykset ja portit, 0,5 asteen maamaski ja saapumisajan laskenta, canvas-kalvo pallolla, virtaa seuraava '
          + 'kamera, mitattu suorituskyky, vaiheistus ja avoimet kysymykset omistajalle; luku 11 omistajan paatokset, luku 13 hiontakierros (Fablemax 6.9.2026; TOTEUTETTU js/aikajana-virrat*.js, '
          + 'odottaa omistajan katselmusta ennen julkaisua).',
        'docs/moduulit/pallon-liike-taydella-tarkkuudella.md — pallon liike ja zoom taydella tarkkuudella: mittaukset (rantaviivan paksuus, laattamoottorin hinta), kirjastovertailu (MapLibre, '
          + '3d-tiles-renderer, Cesium, OpenGlobus), valittu ratkaisu (oma laattakerros pyramidin laatoista Globe.gl:n sisalla) ja Opus-parven erat E0-E5 tehtavanantoineen (Fablemax 6.9.2026; '
          + 'SUUNNITELMA, toteutus Opus-parvella).',
        'docs/moduulit/pallon-vektoriviivat.md — pallon vektoriviivat: rantaviivat ja maiden rajat laattojen paalle tasan pikselin levyisina (Line2 Globe.gl:n omasta nipusta, sama Natural Earth 10m '
          + '-geometria kuin poltetulla viivalla, viisi yksinkertaistustasoa 10 asteen soluina amparissa): mittaukset (leveys levossa, liikkeessa ja zoomissa, syvyysjarjestys, horisontti, '
          + 'kehyshinta), hylatyt tavat (pathsData, SVG, oma nauha) ja Opus-parven erat V0-V4 tehtavanantoineen (Fablemax 6.9.2026; SUUNNITELMA, toteutus Opus-parvella laattakerroksen E1:n rinnalla).',
        'docs/moduulit/ihmisen-matka-vanat.md — Ihmisen matka vanoina: paareitin ja haarojen johtaminen saapumisaikakentasta (edeltajapolku), Line2-piirto ja kaista, selkarankaa seuraava kamera, '
          + 'kuusi esityksen kuvaa ja loytogalleria (Tiedeliite), tekstiehdotus, mitatut vaihtoehdot ja Opus-parven erat V0-V5 (Fablemax 6.9.2026; SUUNNITELMA, toteutus Opus-parvella).',
        'docs/moduulit/karttanostot-kattavuus.md — karttanostojen kattavuus maittain (kohteet, maastokohteet, eläintäyt, skandaalit, hetket) ja tavoite per maa; täytetään koneellisesti erissä.',
        'docs/moduulit/livia-aani.md — pulun ääni: ElevenLabs-resepti, tagit, kaiku, manifesti ja repliikkien pituusraja.',
        'docs/moduulit/minipulu.md — nykyisen SVG-pulun pieni hahmo-API linssien kuvanäkymiin, sijoittelu, kuplakytkentä ja selainkoe.',
        'docs/moduulit/horatio-livia-tuotanto.md — Horatio ja Livia: hahmojen tuotantoketju, kaupunkiparin työnjako, pituus- ja kuvapäätökset sekä erien tarkistuslistat (toteutusohje; kanoniset '
          + 'linjaukset pysyvät Raamatussa).',
        'docs/moduulit/huipennus-teksti.md — huipennuksen kaanoniteksti (kaikki unohdetut aarteet löytyivät): otsikko, Foggin merkintä, napit ja isoisän luentalause; sitova natiivissa ja webissä.',
        'docs/moduulit/yhteiset-pohjat.md — yhteiset liike-, ääni- ja valopohjat: mitä kukin sisältää, omistava rooli, ensimmäinen käyttäjä, tarkistus ja siirtojärjestys.',
        'docs/moduulit/aanipohja.md — natiivin äänipohja (AaniPohja + PohjaLahde): luonti, taso mikserin kautta, häivytykset, väistö kertojan alla, askeleet alustan mukaan, vahti ja siirtojärjestys.',
        'docs/moduulit/aanet.md — siirtymämusiikki ja äänet: raitojen tuotanto-ohje (kesto, looppisauma, -33 LUFS, vienti).',
        'docs/moduulit/viitekuvat.md — viitekuvallinen herogenerointi: kohde tunnistetaan sen omasta Commons-kategoriasta, generointi ankkuroidaan 2–4 vapaasti lisensoituun nykyvalokuvaan, ja '
          + 'generointiportti estää kuvan syntymisen jos viitteitä on alle kaksi tai tunnistus jää epävarmaksi.',
        'docs/pro-lisenssilupa.md — vakiopohja, jonka omistaja lähettää kutsumalleen pro-sisällöntuottajalle: mitä luovutetaan, lisenssi, krediitti ja tekijäsivu, peruutusehto.',
        'AGENTS.md — agentin ensimmäinen päivä: projektin kuvaus, hakemistorakenne, asennus- ja ajokomennot, testit ja portit, kielivalinnat, kielletyt tiedostot ja git-käytännöt yhdeltä istumalta; '
          + 'koottu olemassa olevista ohjeista, ei uusi säännöstö (Claude Projects -thread 19.9.2026, PR #2591; Fable vei karttaan).',
        'CONTRIBUTING.md — yhteistyön ja tekniset periaatteet (peli ei ole avointa lähdekoodia). README.md — esittely.',
        'TYÖSESSIOIDEN SPEKSIOPPI (omistajan havainto 16.8.2026): tarkasti rajattu toimeksianto tuottaa Opukselta erinomaista jälkeä; väljä rajaus johtaa turhien asioiden toteuttamiseen. Jokaiseen '
          + 'pakettiin: täsmälliset tiedostot, mitä EI tehdä, ja valmis malli.',
        'TOTEUTETTU 17.8.2026: dokumenttiremontti (D1–D7) ja moduulijako (M1–M6) ajettiin Max-sessiossa, Fable katselmoi ja mergasi. Raamattu on ainoa linjauslähde; moduuliohjeet '
          + 'docs/moduulit/-kansiossa. Lehtitila-olio ja savukevartija tehty 17.8.2026. M7+ (Kartta-luokka animaatiolinssialustaksi) hyväksytty 17.8.2026, työn alla vaiheina M7a–M7f. Max-työlista '
          + 'arkistoitu (docs/arkisto/).',
        'docs/moduulirakenne-suunnitelma.md — moduulijaon suunnitelma (M1–M6 toteutettu, M7+ hyväksytty ja työn alla; dokumenttiremontin suunnitelma arkistoitu 17.8.2026).',
        'docs/tuotantosuunnitelma.md — jäljellä olevien kaupunkien ja maiden tuotantosuunnitelma (Fablemax 17.8.2026; EHDOTUS, odottaa omistajan hyväksyntää).',
        'Työkalujen alkukommentit ovat käyttöohjeita. Sääntö, jonka kone voi valvoa, kirjataan testiksi.',
        'Työhuone integroidaan peliin kehittäjävivun taakse — ei erillisiä näkymiä.',
      ],
    },
  ],
};
