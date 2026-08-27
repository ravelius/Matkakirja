/*
 * RAAMATTU — koko pelin idea yhdessä tiedostossa. Vain Fable
 * kirjoittaa. Ristiriidassa hyväksytty osio voittaa muut dokumentit.
 * Lähdekaanon: docs/tarina.md ja docs/isoisan-raamattu.md.
 * Kirjoitettu uusiksi äärimmäisen tiiviiksi 15.8.2026 (omistajan
 * tilaus); vanhat sanamuodot git-historiassa.
 */

export const RAAMATTU = {
  paivitetty: '25.8.2026',
  johdanto: 'Koko pelin idea yhdessä dokumentissa — tämän lukeminen '
    + 'riittää pelin kehittämiseen. Käydään läpi omistajan kanssa osio '
    + 'kerrallaan; valmis Raamattu laukaisee kaikkien '
    + 'matkakirjatekstien uudistuksen. ILMAISU: äärimmäisen lyhyt ja '
    + 'yksiselitteinen — selkeys tärkeintä.',
  osiot: [
    {
      otsikko: 'Ydinajatus ja kohderyhmä',
      tila: 'hyväksytty 11.8.2026',
      kohdat: [
        'LAATU ON AINA TÄRKEIN PRIORITEETTI. Laatu voittaa vauhdin, '
          + 'määrän ja kustannuksen. Vähemmän ja viimeisteltyä.',
        'Suomenkielinen selainseikkailu: Reginald Fogg kiertää '
          + 'maailman isoisänsä 1873-päiväkirjan jäljillä ja etsii '
          + 'Aarnin luettelon unohdettuja aarteita.',
        'Kohderyhmä 13+ ja aikuiset. Ei lastenpeli.',
        'Peli näyttää maailmaa: kulttuurit, kielet, historia, '
          + 'keksinnöt — tarkoin valituin kuvin, tekstein, pelein, '
          + 'kartoin ja radioin. Hurjia tarinoita 1873:sta ja nyt.',
        'Imu: aarteet, vaarat ja aikapaine — maailman ympäri alle 80 '
          + 'päivässä. Raja on tavoite, ei tuomio: ylityksestä ei '
          + 'rangaista, alitus palkitaan, kuluvista päivistä '
          + 'muistutetaan.',
        'Oppiminen on sivutuote: uteliaisuus kuljettaa, mikään ei '
          + 'tunnu koululta. Kaikki tieto on totta ja tarkistettua. '
          + 'Pieni yksityiskohta laajenee ymmärrykseksi maasta.',
        'Tekoäly kuratoi valtavan PD/CC-aineiston — ihminen valitsee '
          + 'ja hyväksyy.',
        'SYDÄNTEEMA: ihminen on peruskysymysten äärellä yhtä pihalla '
          + 'kuin ennenkin. Poika yrittää ymmärtää isoisäänsä — siihen '
          + 'pelin loppu päättyy.',
        'NIMEN KAKSI TASOA (omistaja 26.8.2026): Unohdetulla '
          + 'aarteella on kaksi tasoa. (a) PELIN MAAILMASSA: Aarnin '
          + 'luettelon aarteet ovat oikeasti olemassa — ne on vain '
          + 'unohdettu. Samaa etsintää on isoisä itse: hänen '
          + 'tarinansa on pojanpojalle aluksi yhtä kadoksissa ja '
          + 'löytyy matkan varrella (sydänteeman jatke). (b) PELIN '
          + 'YDINIDEANA: unohdettu aarre on kaikki se '
          + 'kulttuuriperimän, taiteen, tieteen, löydösten ja '
          + 'maailman epäkummallisuuksien rikkaus, joka tekee '
          + 'ihmisenä olemisesta mielenkiintoista ja elämisen '
          + 'arvoista — ja joka nykyisen some- ja AI-moskan keskellä '
          + 'äkkiä unohtuu.',
        'PELIN MISSIO AI-AIKANA (omistaja 26.8.2026): peli '
          + 'valjastaa tekoälyn nimenomaan LÖYTÄMÄÄN tuon rikkauden '
          + 'ja johdattamaan pelaajat rikastuttamaan omaa elämäänsä '
          + 'eri maiden kulttuureilla, yleistiedolla ja '
          + 'laaja-alaisemmalla ymmärryksellä historian ja politiikan '
          + 'tapahtumista ja niiden vaikutuksista. AI on VASTAVOIMA '
          + 'sisältömoskalle, ei sen lähde.',
      ],
    },
    {
      otsikko: 'Perustuslaki: viisi pilaria',
      tila: 'hyväksytty (siirretty periaatteet.md:stä 15.8.2026)',
      kohdat: [
        'MIKSI: edistämme tietoa maailmasta — elinoloista, '
          + 'kulttuurista, maantieteestä, geopolitiikasta. Väline on '
          + 'koukuttava peli. Pilareita muutetaan vain yhdessä.',
        '1. PELI EDELLÄ: ei oppikirja, johon on liimattu noppa. '
          + 'Sisältö, joka ei ole hauskaa pelata, ei kuulu peliin.',
        '2. TOTUUS JA LÄHTEET: jokainen väittämä tarkistettavissa. '
          + 'Epävarmaa ei väitetä. PR kertoo lähteet.',
        '2b. PAIKKA ENNEN LAJIA: ääni ja kuva kaupungista itsestään, '
          + 'sitten maasta, vasta viimeisenä lajista. Paikkojen ero on '
          + 'osa opetusta.',
        '3. KUNNIOITUS: jokainen maa asukkaidensa silmin. Ei '
          + 'stereotypioita, pilkkaa, säälittelyä eikä pelkkiä '
          + 'turistikliseitä. Geopolitiikka kuvataan, ei tuomita.',
        '4. IKÄSOPIVUUS: vaikeita aiheita ei kaunistella eikä '
          + 'kauhistella. Mitään ei lisätä järkyttämään.',
        '5. AVOIMUUS: vapaat lisenssit, julkiset päätökset, '
          + 'automaattitestit valvovat mitattavan.',
        'Tekniset jatkeet (laudan hyväksyminen, etukäteispuskuri): '
          + 'CONTRIBUTING.md.',
      ],
    },
    {
      otsikko: 'Tarina ja hahmot',
      tila: 'luonnos',
      kohdat: [
        'ASETELMA: Reginald perii isoisän matkalaukun — kartta 1872, '
          + 'puntia, passi, päiväkirja 1873. Hän päättää tehdä matkan '
          + 'samassa ajassa: alle 80 päivässä.',
        'MATKAKIRJA on isoisän päiväkirja: ei kirjoitettu kenellekään, '
          + 'ei puhuttele lukijaa. Revitty viimeinen sivu ajaa '
          + 'matkaan — arvoitus EI koskaan ratkea.',
        'HORATIO FOGG (isoisä): laivaston kartanpiirtäjä, erosi 1873. '
          + 'Mittaa kaiken (barometri nyt Reginaldin laukussa), pelkää '
          + 'hevosia, ei myrskyjä, kohtelias kaikille. Persoona '
          + 'välittyy merkinnöistä.',
        'KAKSI ÄÄNTÄ: isoisä 1873, nuori herra nyt. Huumori syntyy '
          + 'välistä. Isoisä on joskus yhä oikeassa — ei narri. Ivaa '
          + 'paikallisille ei koskaan; piikki herroihin itseensä.',
        'VASTUSTAJAT: isoisällä Ezekiel Grimshaw (mahtipontinen, aina '
          + 'myöhässä, ei koskaan vaarallinen). Reginaldilla NÄKYMÄTÖN '
          + 'seuraaja: tummansininen sateenvarjo tunnusmerkkinä, ei '
          + 'näyttäydy, ei paljastu koskaan — jää auki kuten revitty '
          + 'sivu.',
        'AARNI: 1800-luvun alun tutkimusmatkailija; luettelossa '
          + 'maailman unohdetut aarteet, yksi per maanosa. Aikalaiset '
          + 'pitivät satuna, isoisä uskoi.',
        'AARREVIHJEET: ei symboleja eikä järjestelmiä — vain harvat '
          + 'sivuhuomiot (muutama per manner) vihjaavat pääaarteen '
          + 'olevan totta. Loksahtavat paikoilleen löydössä.',
        'KAANON: kukaan ei ole odottanut poikaa 150 vuotta, eikä '
          + 'isoisä virittänyt mitään ajan yli. Kirja saa olla '
          + 'arvoitus, koska vanhan päiväkirjan lukeminen on hidasta.',
        'Tekstit: isoisän seikkailut + nuoren herran tarkat '
          + 'arkihavainnot ja kommellukset. Tarina avaa kaupungin '
          + 'tunnelman; lehti syventää tiedoksi.',
        'Herroille saa luonnostella uusia piirteitä '
          + '(etikettivirheet, hassu asu) — yhdessä omistajan kanssa.',
        'ISOISÄ ON PIIRTÄJÄ, EI VALOKUVAAJA (25.8.2026): kuvakieli '
          + 'on kirkas — 1873 = isoisän piirros, nykyhetki = '
          + 'valokuva. Matkakirja on nimetön kulunut muistikirja '
          + '(kannessa ei painettua nimeä).',
        'JULISTEOTSIKKO ON VERNEN NIMI + OSA TOINEN (omistaja '
          + '26.8.2026): etusivun otsikko on "Maailman ympäri '
          + 'kahdeksassakymmenessä päivässä · OSA II · UNOHDETTU '
          + 'AARRE" (roomalainen numero ja jatko-osan oma alaotsikko '
          + '1800-luvun tapaan, omistaja 26.8.2026). Vernen '
          + 'romaani (1873) on public domain eikä lyhyt nimi ylitä '
          + 'teoskynnystä, joten käyttö on vapaata. RAJAT: mistään '
          + 'suojatusta SUOMENNOKSESTA ei lainata tekstiä (kääntäjän '
          + 'oikeudet), eikä mihinkään elokuva-/tv-sovitukseen '
          + 'vihjata. "V2.0" hylättiin — ei istu 1873-typografiaan.',
        'ALKUKOHTAUS V5 (omistajan teksti 25.8.2026, sanasta '
          + 'sanaan pelissä): paikkarivi "Heathrow, Lontoo, '
          + '<kuukausi vuosi>:" naputetaan kirjoituskoneella ilman '
          + 'luentaa; sitten kertoja: "Vintiltä löytyi isoisän '
          + 'matkalaukku ja kulunut matkakirja. Juoksen sisälle '
          + 'terminaaliin ja olen varma, että ukko oli löytänyt '
          + 'jotain. Mutta kuka on repinyt kirjasta viimeisen '
          + 'sivun?"; aloitusnappi on KEHYSTETTY 1873-NAPPI ilman '
          + 'sykettä, tekstinä "Valitse aloituskaupunki" (omistaja '
          + '26.8.2026 ilta — "Mistä aloitan?" oli epäselvä; kumoaa '
          + 'saman päivän ALOITA MATKA -välivaiheen). '
          + 'ETUSIVUN ASETTELU 26.8.2026: maailmankartta pienenä '
          + 'ylälohkona jonka päällä julisteotsikko; sen alla '
          + 'tyhjää vaaleaa karttapohjaa ja tekstit sen päällä.',
        'VAANIJAKAARI ALKOI (kaanonit 25.8.2026): Istanbulin '
          + 'aarremerkintä on ensimmäinen vaanijavihje ("mies, joka '
          + 'oli kysellyt minusta satamassa, seisoi jo sillalla"); '
          + 'Rooman merkintä on twist-siemen ("Rooman aarre oli '
          + 'ainoa, jota en yrittänytkään... Jonain päivänä '
          + 'ymmärrät miksi"); Bukarest kuittaa hiljaisuuden '
          + '("Sillalla ei tällä kertaa seissyt ketään"). Kaari '
          + 'hengittää — ei joka maassa.',
      ],
    },
    {
      otsikko: 'Kirjoittajan säännöt (matkakirjatekstit)',
      tila: 'luonnos',
      kohdat: [
        'Isoisä loistaa pysyvissä (joet, tuoksut, satamat), '
          + 'vanhentuu nimissä ja tekniikassa. Nuori herra ei ole '
          + 'viisaampi — elää vain 150 vuotta myöhemmin.',
        'Vaara tulee maailmasta ja kilpajuoksusta, ei ihmisten '
          + 'pahuudesta. Seuraaja kaihertaa, ei uhkaa.',
        'Joka kirjoituserässä vähintään yksi aito kommellus. Suoraa '
          + 'itsepilkkaa säästeliäästi.',
        'Motiivibudjetit (barometri, sateenvarjo, aarrevihje…) '
          + 'sovitaan mantereittain ja lasketaan ennen julkaisua. '
          + 'Aistiankkuri ~joka kolmanteen kohteeseen. Aitoja '
          + '1873-tositapahtumia ankkureiksi.',
        'Lyhyttä ja konkreettista: sivuhuomiot sivulauseita, ei '
          + 'kryptisyyttä eikä selittelyä.',
        'Faktakuri: kaikki tarkistetaan, lähde merkitään. Luenta = '
          + 'teksti sanasta sanaan.',
        'Uusi teksti aina puhtaalta pöydältä; vanhasta vain '
          + 'raaka-aineet (beatit, faktat, persoonat).',
        'PITUUSBUDJETIT (mrk): saapuminen 280–350 (katto 380), '
          + 'kohtaaminen 180–240 (260), aarreteksti 140–200 (220), '
          + 'kohde yhteensä ≤800 — ääniaika alle minuutin.',
        'KOLME TARKISTUSTA per kohde: tunnistuuko päiväkirjaksi '
          + 'ilman kylttiä; lunastuuko kohtaamisen lupaus '
          + 'aarretekstissä; onko joka yksityiskohdalla merkitys.',
        'SPOILERISÄÄNTÖ: mikään ennen visaa näkyvä ei paljasta '
          + 'visan vastausta.',
      ],
    },
    {
      otsikko: 'Tekstien vetovoima',
      tila: 'luonnos',
      kohdat: [
        'KANTAVAT (usein): kommellus · aikakontrasti (1873 väittää, '
          + 'nyt vastaa) · auki jäävä koukku · aistiankkuri · '
          + 'konkreettinen nimetty ihminen.',
        'MAUSTEET (budjetti mantereittain): yllätysfakta · pienestä '
          + 'suureen · skandaali (ei eläviä yksityishenkilöitä) · '
          + 'historian oikku · arjen hinnat 1873 · nykyhetken kiinne '
          + '(menneessä muodossa, ettei vanhene) · yllätyskohtaaminen '
          + '· elokuvallinen avaus · ketju kaupunkien välillä · '
          + 'paikallinen sana · kirjan fyysiset jäljet (ei viritettyjä '
          + 'viestejä) · seuraajan varjo · aarrevihje · 80 päivän '
          + 'paine.',
        'KERRONNAN TAVAT: mittaajan persoona · johtolausevariaatiot '
          + '(9 kaavaa) · henkilö liikkeellä · löytöhetken tunne.',
        'VÄLTETTÄVÄT: mystiset viittaukset, jotka eivät johda '
          + 'mihinkään · "odottanut 150 vuotta" -siirappi.',
      ],
    },
    {
      otsikko: 'Pelin kulku',
      tila: 'luonnos',
      kohdat: [
        'Yksi lauta: koko maailma yhdellä kartalla.',
        'ALKU: tarina alkaa Lontoosta. Ensimmäisen kohteen saa '
          + 'valita kartalta — valinta ratkaisee, minkä mantereen '
          + 'pääaarretta etsitään ensin. BETA-RAJAUS (25.8.2026): '
          + 'toistaiseksi valittavissa vain Ateena; vapaa valinta '
          + 'palaa kun fokusmaita on tarpeeksi.',
        'VUORO: matkustustapa (jalan/laiva/lento) → noppa → siirto. '
          + 'Heitto, laiva tai lento = 6 h matka-aikaa.',
        'MANNERRAJA: uudelle mantereelle vasta pääaarteella tai '
          + 'maksamalla 1000 p (per ylitys). Rajakaupunkiin pääsee.',
        'Kaupungissa fokusmoodin annostelu korvaa vanhan '
          + 'Tutki-napin: saapumisesittely alkaa itsestään, muu '
          + 'aukeaa pelaajan valinnoista (ks. Fokusmoodi). Vapaa '
          + 'vaellus.',
        'LOPPU: seitsemäs pääaarre. Revitty sivu ja seuraaja jäävät '
          + 'auki — Reginald ymmärtää vihdoin isoisäänsä '
          + '(sydänteeman lunastus).',
        '80 PÄIVÄN PALKINTO: SEITSEMÄN PENINKULMAN LINSSI — vapaa '
          + 'siirtyminen mihin tahansa kaupunkiin ilman noppaa; '
          + 'samalla kaikki linssit auki. Ei ostettavissa.',
      ],
    },
    {
      otsikko: 'Fokusmoodi',
      tila: 'toteutuksessa — pilotti Kreikka valmis; pelissä 25.8.2026 '
        + 'kuusi fokusmaata (Kreikka, Bulgaria, Italia, Turkki, '
        + 'Bosnia, Romania)',
      kohdat: [
        'FOKUSMOODI (omistaja 24.8.2026): pelin oletustila heti '
          + 'alusta — tietoa, kysymyksiä ja valintoja niukasti '
          + 'kerrallaan. Kaikki rakennettu säilyy; tämä on '
          + 'esitystapa- ja annostelukerros sen päällä.',
        'KARTTA: nykyinen maa tarkkana topografioineen; käymättömät '
          + 'maat himmeinä ja epäterävinä ilman dataa (ei reittejä, '
          + 'kaupunkeja, kohteita), blur kasvaa rajan takana; käydyt '
          + 'maat jäävät tarkoiksi. Tarinaperustelu: isoisän '
          + '1873-atlas — kartoittamaton päiväkirja tarkentuu vasta '
          + 'kun jäljillä kuljetaan.',
        'PIIRTO: maakohtainen esirenderöity topografia PD-datasta '
          + '(Natural Earth, SRTM/ETOPO), 1873-atlaksen '
          + 'akvarellityyliin — sama kieli kuin julisteissa. Laatan '
          + 'lisäksi maan muita kaupunkeja (ei pelattavia), jokia, '
          + 'järviä, vuoria.',
        'ANNOSTELU (omistaja 24.8.2026, tarkennettu kulku): uuteen '
          + 'kaupunkiin saavuttaessa esittely alkaa AUTOMAATTISESTI '
          + '(fokusmoodin poikkeus "mikään ei ponnahda" -sääntöön). '
          + 'Kulku: (1) matkakirja — VAIN MUUTAMA LAUSE suoraan '
          + 'isoisän äänellä + VANHA kuva isoisän huomioon; '
          + '(2) Pöllön nykypäivän huomio + UUSI kuva (ensiesittely '
          + 'jo generoidusta herokuvasta); (3) Pöllö kysyy heti '
          + '2–3 valintapainikkeella, mikä kiinnostaa; (4) valitusta '
          + 'täkystä syvennysteksti + kuva → PIENI TIETOVISA → '
          + 'palkkio: rahaa + generoitu juliste; (5) oppitunti eli '
          + 'uusi nosto (kuva + teksti), joka pohjustaa varsinaista '
          + 'kysymystä; (6) PAIKALLINEN HENKILÖ (kohtaamiset-palikka '
          + 'säilyy) esittää vaikeamman aarrekysymyksen. Tekstit ja '
          + 'kuvat tulevat karttapinnan päälle; kuvat klikattavissa '
          + 'suuremmiksi. Pöllö saa siteerata matkakirjaa suoraan '
          + '(on lukenut sen) ja viitata uuteen tai vanhaan asiaan; '
          + 'syvennykset poimitaan kaupunki-/maalehdistä.',
        'KOHDEKOROSTUS (omistaja 24.8.2026): kun jostakin kohteesta '
          + '(esim. Tonava) halutaan lisätietoa, kartta piirtyy '
          + 'muuten niukkana mutta näyttää juuri sen kohteen '
          + 'selkeänä — niukkuus on keino nostaa yksi asia esiin, '
          + 'koska täydellä kartalla esim. jokien havainnointi on '
          + 'ollut vaikeaa.',
        'ETENEMINEN (omistaja 24.8.2026): vähintään YKSI täky on '
          + 'tehtävä ennen pääsyä varsinaisen aarrekysymyksen luo; '
          + 'loput täkyt vapaaehtoisia, niistä lisää rahaa '
          + 'minipalkintoina. Aarteen jälkeen vapaa tutkinta: '
          + 'kaupunki- ja maalehdet aukeavat, ja kartan '
          + 'erityiskohteista (vuoret, joet, muut kaupungit) aukeaa '
          + 'pienet pop-up-tietoruudut — tai pelaaja jatkaa matkaa.',
        'ALOITUSLENTO UUSIKSI (omistaja 24.8.2026): kun pelaaja '
          + 'valitsee pelin alussa ensimmäisen kohteen, kartta '
          + 'rajautuu automaattisesti niin, että lähtömaa (Lontoo/'
          + 'Britannia) ja kohdemaa näkyvät molemmat sopivalla '
          + 'marginaalilla, ja lentokone lentää punaista viivaa '
          + 'pitkin Lontoosta kohteeseen. (Lennon karttapohjasta '
          + 'määrää nyt "VANHA KARTTA KOKONAAN POIS" -linjaus: '
          + 'pohja on atlas-lehdet + pergamentti, ei niukka vanha '
          + 'piirros.)',
        'NOPPA JA REITIT (omistaja 24.8.2026): nykyinen noppa ja '
          + 'reittien viivat/pisteet säilyvät ennallaan — pienellä '
          + 'luvulla aika kuluu jo nyt hitaammin, kun heittoja '
          + 'tarvitaan useampi. EHTO: reittipisteiden on istuttava '
          + 'fokusnäkymän grafiikkaan; tarkistetaan Kreikka-pilotin '
          + 'kuvasta. Erillinen väliheitto-idea jää harkintaan '
          + 'siihen asti.',
        'TÄKY: uusi sisältötyyppi — tarkistettu uteliaisuuskoukku '
          + 'kaupungin yksityiskohdasta (tyyliä "lukonreiästä näkyy '
          + 'täydellisesti rajautuva rakennus"). Pöllö tarjoaa '
          + 'täkyjä, pelaaja tarttuu; käsittely 13+ -rajoissa.',
        'PÖLLÖ-CHAT: ensisijaisesti kuratoitua sisältöä (lehdet, '
          + 'tarkistetut faktat); mallin oma selittely selvästi '
          + 'kehystettynä. Sonnet nyt, Haiku 5 kun julkaistaan.',
        'KEVYT KULKU -KOKEILU (omistaja 24.8.2026, ilta): '
          + 'kaupunkilehden ALIN KOHTA (josta pääsi tapaamaan '
          + 'henkilön) POIS. Tilalle: kun kaupunkilehti AUKEAA, '
          + 'pöllö vinkkaa MAHDOLLISIMMAN LYHYESTI minitehtävästä '
          + '(vinkissä ruksi "älä näytä jatkossa"). Lehden sivuilla '
          + '2 ja 3 on KUMMALLAKIN YKSI minitehtävä, erikseen '
          + 'nimettyinä: toinen AARTEEN AVAUS -tehtävä ja toinen '
          + 'JULISTE-tehtävä. Aarteen avaus -tehtävän suoritus '
          + 'sytyttää kartalle PIENEN VIHREÄNÄ HEHKUVAN PISTEEN, '
          + 'jota klikkaamalla tapaa henkilön ja yrittää aarteen '
          + 'avausta; juliste-tehtävästä saa julisteen. Kohtaamisen '
          + 'paikan voi sitoa muuhunkin kuin kaupunkipisteeseen '
          + '(kehyskertomus). KOKEILU: katsotaan riittääkö tämä '
          + 'pelkkä karttafokus — omistaja pelaa ja iteroi; '
          + 'raskaampi korttiannostelu lipun taakse, ei poisteta. '
          + 'TARKENNUKSET (omistaja 25.8.2026, aamu): tehtävän '
          + 'otsikko VINKKAA palkinnon (AARTEEN AVAUS -otsikko + '
          + 'vihje että oikea vastaus paljastaa aarteen jäljen; '
          + 'JULISTE vastaavasti), ja oikean vastauksen jälkeen '
          + 'pöllö kertoo SUORAAN että aarre on näkyvissä ja että '
          + 'seuraavan sivun tehtävästä saa vielä julisteen. '
          + 'Kartan pallurat (laatta, kohde- ja matkapisteet, '
          + 'kohtaamispiste, aarremerkit, nappula) elävät KARTAN '
          + 'MITTAKAAVASSA (omistajan lopullinen linjaus 25.8.2026, '
          + 'kumoaa aiemman kiinteän ruutukoon): merkki suurenee kun '
          + 'karttaa lähennetään ja pienenee loitonnettaessa — koko '
          + 'on aina sama suhteessa kartan muihin elementteihin. '
          + 'Peruskoko viritetään maan lehtinäkymän zoomiin. '
          + 'Kuvasuurennos: kehys kuvan muotoinen, taustalle jää '
          + 'pikkukuva ja tietoruutu näkyviin (saumaton liuku, ei '
          + 'pomppua), taustaan hyvin kevyt blur ja tummennos. '
          + 'Kaupungin laatta SYKKII KEVYESTI houkutellen '
          + 'klikkaamaan. Liiku-nappi on TEKSTINAPPI keskitettynä '
          + 'sivusuunnassa alareunaan, ja se on PIILOSSA kunnes '
          + 'maan aarre on löydetty; aarteen löydyttyä pöllö '
          + 'kertoo että nyt voi matkustaa seuraavaan kaupunkiin '
          + 'tai jäädä tutkimaan maata (kohteita klikkaamalla), '
          + 'ja samalla kartalta NOUSEE YKSI TÄKYNOSTO: lyhyt '
          + 'KELTAISTEN LEHTIEN KLIKKIOTSIKKOTASOINEN lause '
          + '(henkilöskandaali tai uskomaton tositarina, lupaus '
          + 'lunastetaan faktalla) + miniatyyrikuva perässä, '
          + 'houkuttelemassa kohteen auki. Täkynostot kartoitetaan '
          + 'ja pohditaan kunnolla ennen toteutusta '
          + '(docs/mantereet-tyoaineisto/takynostot-kreikka.md). '
          + 'TÄKYKUPLA (omistaja 25.8.2026, UUDISTETTU 26.8.2026 '
          + 'ilta: "Täkyjä josta tulee puhekupla pitää olla vain '
          + 'yksi per maa. Kaikki muut normaaleita. Ja kun täkyä '
          + 'painaa niin sen pitäisi aueta suoraan pop upiksi '
          + 'ilman pelkkää otsikko nostoa"): jokaisella maalla on '
          + 'TASAN YKSI kuplatäky — poolin kärkivalinta — ja kupla '
          + 'ankkuroituu siihen kohtaan karttaa, jota tapahtuma '
          + 'koskee (ei alalaidan liuskana). KOKO KUPLA on '
          + 'osumapinta ja avaa lunastuskortin suoraan. Muut '
          + 'entiset täkyaiheet ovat kartan TAVALLISIA KOHTEITA, '
          + 'jotka saavat kategoriasymbolinsa (huutomerkki, '
          + 'pöllönpoikanen jne.) SYMBOLITAKSONOMIAN kirjastosta. '
          + 'KOHDEPOPUP JA PÖLLÖ (omistaja 25.8.2026): kohteen '
          + 'pop-up EI sulkeudu pöllönapista — se jää auki, ja '
          + 'PÖLLÖ TIETÄÄ mikä pop-up on auki (sisältö chatin '
          + 'kontekstiin). Pop-upissa on KAKSI ETUKÄTEEN laadittua '
          + 'kysymystä pöllölle nappeina, ja tekstissä voi olla '
          + 'ALLEVIIVATTUJA sanoja, joita napauttamalla pöllö '
          + 'kertoo lisää juuri siitä. '
          + 'KEHITTÄJÄNAPIT JA JATKUVA MAAILMANKARTTA (omistaja '
          + '25.8.2026): yläreunan kaksi kehittäjänappia saavat '
          + 'uudet tehtävät — toinen kytkee LIIKKUVUUSRAJOITTEEN '
          + 'päälle/pois (autenttinen pelaajan rajoite vs. vapaa '
          + 'liikkuminen), toinen kytkee KAUPUNGIT JA REITTIPISTEET '
          + 'näkyviin koko maailmaan (suora hyppy kaupunkeihin '
          + 'testaamista varten). Fokuskarttapiirros (jatkuva '
          + 'atlas-kartta) on KOKO AJAN PÄÄLLÄ ja näkyy niiltä '
          + 'osin kuin maita on valmistunut, koko maailman '
          + 'mittakaavassa. '
          + 'KREIKAN KUPLATÄKY (25.8.2026 pooli, kavennettu '
          + '26.8.2026 yhteen per maa): kuplana on kartoituksen '
          + 'kärki "Valokuva paljasti aarrevarkauden — rouva '
          + 'poseerasi Troijan koruissa" (Sofia Schliemann); '
          + 'Antikythera ja Delfoi palvelevat kartan omina '
          + 'kohteinaan. Luettu kupla ei nouse enää. '
          + 'LEHDEN KYSYMYKSET (omistaja 25.8.2026): jokaisella '
          + 'lehden sivulla PAITSI etusivulla (herokuvat) on '
          + 'kysymys lopussa; jokaisesta saa rahaa; jos '
          + 'kysymyksellä ei ole julistepalkintoa, se AVAA '
          + 'AARTEEN (myös vanha kulttuurivisa muuntuu aarteen '
          + 'avaavaksi); kun aarre on jo auki, aarteen avaavista '
          + 'saa enää pelkkää rahaa. '
          + 'AARREMERKINTÄMALLI (omistaja hyväksyi 25.8.2026): kun '
          + 'aarre löytyy, matkakirjasta aukeaa ISOISÄN 2 VIRKKEEN '
          + 'MERKINTÄ juuri tästä aarteesta — aina: kuinka lähelle '
          + 'isoisä pääsi ja miksi jäi kesken — ja heti perään '
          + 'pöllön toimintakuittaus (matkusta/tutki + täkynosto). '
          + 'NUORI HERRA juhlii vain virstanpylväissä yhdellä '
          + 'lauseella (ensimmäinen aarre koskaan, mantereen '
          + 'viimeinen, pelin päätös); arkinen jälki on tekoja. '
          + 'Joka 3.-4. maan aarremerkintä vihjaa vaanijasta tai '
          + 'isoisän omasta salaisuudesta. Ateenan aarremerkintä '
          + '(kaanon): "Seisoin samalla kalliolla enkä uskaltanut '
          + 'kaivaa vartijan nähden — piirsin vain ristin '
          + 'luettelon reunaan. Jos sinä pitelet nyt sitä, mitä '
          + 'minä vain katselin, olemme molemmat löytäneet '
          + 'omamme." SEURAAVAT FOKUSMAAT (omistajan lupa '
          + '25.8.2026): Sofia, Istanbul, Sarajevo ja Bukarest '
          + 'tehdään YHTÄ VALMIIKSI KUIN KREIKKA (fokusvirta, '
          + 'lehtitehtävät, kohteet, täkynostot, aarremerkintä, '
          + 'luennat); kaanontekstit kirjoittaa Fable. LISÄYS '
          + '(omistaja 25.8.2026): ITALIA/ROOMA jonoon KIIREELLISENÄ '
          + '(kaverit kiinnostuneita). BETA-TAVOITE: peli '
          + 'ensimmäisille beta-testaajille NOIN VIIKON PÄÄSTÄ '
          + '(~1.9.2026) — siihen mennessä pelilogiikka mielekäs ja '
          + 'sisältöä tarpeeksi palautteen keruuseen; uusi logiikka '
          + 'testataan kuntoon ennen laajentamista. '
          + 'ELÄINTÄYT (omistaja 25.8.2026): täkyihin ja '
          + 'täkynostoihin myös SÖPÖJÄ ELÄINJUTTUJA — eläinkuvia '
          + 'ja mahdollisuuksien mukaan live-kameroita eläimistä; '
          + 'eläimet ovat tärkeitä kohdeyleisölle. Tavoite: joka '
          + 'maahan vähintään yksi eläinaihe (esim. Istanbulin '
          + 'kissat, Romanian karhut). Live-kameroiden tekninen '
          + 'toteutus (upotus, CORS) selvitetään erikseen ennen '
          + 'lupaamista. Omistaja hankkii eläinmateriaalia myös '
          + 'PRO-SISÄLLÖNTUOTTAJILTA: oikeudet ja nimeämisrivi '
          + 'kirjataan aina kirjallisesti, materiaali ämpäriin '
          + 'normaalilla vientiputkella (PD/CC-sääntö koskee vain '
          + 'Commonsista haettavaa). '
          + 'SÄHKEJÄRJESTELMÄ — MONINPELI ILMAN VAPAATA TEKSTIÄ '
          + '(omistaja 25.8.2026; "Tee vain kaikki moninpeli '
          + 'palikat mitä pystyt"): kaikki pelaajien välinen '
          + 'viestintä on RAKENTEISTA — valmispohjaiset sähkeet '
          + '1873-lennätinteemalla ("AARRE LÖYTYNYT SOFIASTA '
          + 'STOP"), vinkkisähkeet valmiista lauseista (vinkata '
          + 'saa vain itse löydetystä aarteesta), '
          + 'julistepostikortit, RETKIKUNTA liittymiskoodilla '
          + '(jäsenten virstanpylväet näkyvät, yhteinen kartta '
          + 'täyttyy), nimimerkit generaattorista ("Utelias '
          + 'Ilves") — pelissä EI OLE yhtään pelaajan '
          + 'kirjoittamaa vapaata merkkiä, jolloin '
          + 'UGC-moderointitaakkaa ei synny. KAVERIAPU '
          + 'AARREKYSYMYKSESSÄ: yksi apuvaihtoehto on KYSY '
          + 'KAVERILTA — hinta 25 puntaa, aika pysähtyy, '
          + 'retkikunnan jäsen saa kysymyksen ja antaa oman '
          + 'veikkauksensa vaihtoehdoista; veikkaus palaa '
          + 'kysyjälle näkyviin. Pöllö on sähkeiden '
          + 'postinkantaja. Vaiheet: 0 = sähkekortin jako '
          + '(ei palvelinta), 1 = retkikunta + sähkeet + '
          + 'kaveriapu omalla workerilla, 2 = Game Center '
          + '-tulostaulut iOS-kuoreen. '
          + 'ISOISÄ PIIRTÄJÄNÄ (omistaja + Fable 25.8.2026): isoisän '
          + 'matkakirja on NIMETÖN, kulunut aikakauden muistikirja — '
          + 'kannessa EI ole painettua nimeä (aiempi kansiteksti oli '
          + 'ajatusvirhe; "Maailman ympäri kahdeksassakymmenessä '
          + 'päivässä" on etusivun JULISTEMAINEN OTSIKKO, joka '
          + 'ladotaan HTML-typografiana, ei generoituna kuvatekstinä). '
          + 'Isoisä oli TAITAVA PIIRTÄJÄ ja luonnosteli matkoillaan '
          + 'paljon rakennuksia ja näkymiä, joita oli nähnyt — '
          + 'kenttämuistiinpanotyyliin (docs/mantereet-tyoaineisto/'
          + 'idea-kenttamuistiinpanotyyli.md). KAMERAA HÄNELLÄ EI '
          + 'OLLUT — kuvakieli on kirkas: 1873 = isoisän piirros, '
          + 'nykyhetki = valokuva. Isoisän luonnoksia näytetään '
          + 'monesta paikasta pelin edetessä; etusivulla kirjasta '
          + 'repsottaa lähes kokonaan esiin yksi luonnossivu. '
          + 'TARINAKAAREN KOKEILU, MALLI 3 (omistaja 25.8.2026): '
          + 'äänet jaetaan niin ettei tekstiä tule lisää — isoisä '
          + '= tarina ja tunne (max 4 virkettä, 3 optimi; Ateenan '
          + 'nykyinen pituus on ehdoton katto), pöllö = nykypäivän '
          + 'toiminta, ja pelaajan jälki syntyy TEOISTA (aarteet, '
          + 'julisteet, käydyt kohteet kertyvät matkakirjaan '
          + 'merkinnöiksi ilman uutta proosaa). LUENTA: isoisän '
          + 'päiväkirjamerkinnät generoidaan puheeksi '
          + '(ElevenLabs-resepti, tools/generoi-luennat.mjs); '
          + 'PÖLLÖN repliikkejä EI lueta. Luenta on striimiääni, '
          + 'jonka kytkin on kortin KAIUTINKUVAKE (omistaja '
          + '25.8.2026, kumoaa liukukytkimen puhekuplan alla): '
          + 'mykistettynä kuvakkeen päällä on vinoviiva; päälle '
          + 'kytkeminen aloittaa ruudulla olevan merkinnän alusta. '
          + 'LEHDEN LUKIJA aloittaa aina joko '
          + 'ihan alusta tai ylimpänä näkyvästä väliotsikosta — '
          + 'ei koskaan leipätekstin puolivälistä. '
          + 'Asteikot (viivaimet) '
          + 'NELJÄLLÄ SIVULLA; ne liukuvat pois ruudusta kartan '
          + 'liikuttelun ajaksi ja palaavat pienen viiveen '
          + 'jälkeen kun liike loppuu.',
        'KAMERA PELIN KÄSISSÄ (omistaja 24.8.2026, ilta; '
          + 'tarkennettu samana iltana): peli siirtää karttaa itse '
          + 'pelin edetessä (kamera-ajot), mutta käsin liikuttelu '
          + 'SALLITAAN VALLOITETULLA ALUEELLA JA SEN LÄHEISYYDESSÄ '
          + '(käytyjen maiden alue + marginaali). Kehittäjätilassa '
          + 'vapaa panorointi säilyy. Liiku-tilan matkakohteet '
          + 'piirretään pieninä pisteinä Ateenan laatan tapaan '
          + '(ei isoja renkaita) ja kohteiden nimet näkyvät '
          + 'valittaessa; valittavien nimet hieman isommalla, '
          + 'nykyisen sijainnin nimet paljon pienemmällä.',
        'FOKUSNAPIT (omistaja 24.8.2026, illan pelitesti): '
          + 'vasemman alareunan maannimi (KREIKKA-kartuutsi) on '
          + 'jatkossa MAALEHDEN NAPPI dynaamisella sijainnilla: '
          + 'kertapainallus nostaa alhaalta liukuvan, kevyesti '
          + 'läpinäkyvän taulun (pinta-ala, väkiluku ym. perustiedot '
          + 'maalehden datasta, kielet lippuineen) ja taulun '
          + 'plus-nappi avaa varsinaisen maalehden; avautuminen ja '
          + 'sulku animoidaan. Kartuutsin alarivi on maan nimi omalla '
          + 'kielellään (GRC: "ΕΛΛΑΣ · Hellas") + pieni aikakausilisä '
          + '("kuningaskunta v. 1873"). "Isoisän matkakirjan mukaan" '
          + '-rivi POIS kokonaan: kartta on sisällöltään NYKYAIKAINEN '
          + 'vaikka tyyliltään aikakauden — aikakausiviittaukset '
          + 'nimeen ja valtiomuotoon ovat hauska lisä, eivät kehys; '
          + 'oikean yläkulman maakyltti poistetaan. Kaupungin laatta '
          + 'palaa fokusnäkymään PALJON PIENEMPÄNÄ dynaamisella '
          + 'koolla, ja TUTKI-NAPPI poistetaan alariviltä — sen '
          + 'toiminto siirtyy kaupungin nappiin. Pöllön '
          + 'valmiskysymykset otetaan toistaiseksi pois. '
          + 'TARKENNUS (omistaja 24.8.2026, myöhäisilta): maataulu '
          + 'on KOKONAAN läpinäkyvällä pohjalla (ei taustalaattaa, '
          + 'teksti suoraan kartan päälle) ja se sijoitetaan '
          + 'LÄHELLE kartuutsia yhtenäiseksi kokonaisuudeksi; '
          + 'kielten tarkenteet (esim. "turkki · Länsi-Traakia") '
          + 'näytetään, jotta vähemmistökieli ei näytä virheeltä.',
        'JATKUVA KARTTA JA DYNAAMISET MITAT (omistaja 24.8.2026, '
          + 'illan pelitesti): fokuskartta on JATKUVA pinta — ei '
          + 'lehden kehystä, maasto jatkuu reunoille ja naapureihin '
          + 'saumatta. Mittataulukot (mittajana, asteet, maan nimi) '
          + 'ovat DYNAAMISIA pelin piirtämiä elementtejä, jotka '
          + 'elävät zoomin ja sijainnin mukana — eivät kuvaan '
          + 'poltettuja.',
        'KUVAT KARTALLE (omistaja 24.8.2026): fokusvirran kuvat '
          + 'piirtyvät PIENENÄ kartalle kohteen päälle (Ateenan kuva '
          + 'Ateenan sijaintiin), ja pelaaja klikkaa ne auki isoksi '
          + '(zoomaus pop-up-näkymään).',
        'ASETTELU (omistaja 24.8.2026): isoisän teksti näytetään '
          + 'PERINTEISESSÄ matkakirjakortissa YLÄVASEMMALLA (sama '
          + 'kortti kuin saapumisteksteillä), ja pöllön huomio '
          + 'PUHEKUPLASSA OIKEALLA ALHAALLA niin, että kupla lähtee '
          + 'kelluvasta pöllöstä. Fontti luettava, pöllön tekstit '
          + 'lyhyitä.',
        'UI: pöllö pysyvästi leijuvana sivuelementtinä kaikissa '
          + 'tiloissa (pois alanapeista, kuten nyt lehtiä '
          + 'luettaessa). Fokusmoodissa alhaalla vain Liiku-nappi '
          + '(Tutki poistui — toiminto on kaupungin laatassa). '
          + 'Fokusmoodin kytkin matkalaukun oikealla puolella '
          + 'VAIN kehittäjätilassa; lisäksi kehittäjätilaan '
          + 'sumennukset päälle/pois -nappi. Muille aina päällä. '
          + 'PÄIVITYS 27.8.2026 (kumoaa kytkinvaatimuksen): '
          + 'kehittäjätilan yläpalkissa VAIN YKSI nappi — '
          + 'maailmannäkymä, joka näyttää koko maailmanlaudan ja '
          + 'kohdekaupungit maiden välillä siirtymistä varten, '
          + 'pitää lento- ja maareitit piilossa sekä poistaa '
          + 'sumennuksen ja kartan vieritysrajoitteen. Fokusmoodi- '
          + 'ja sumennuskytkimet poistettu hampurilaisvalikosta; '
          + 'pelaajalle fokusmoodi on yhä aina päällä.',
        'PELITESTIKIERROSTEN LINJAUKSET 25.8.2026 (toteutettu): '
          + 'KÄÄNNETTY LAATTA KORVAUTUU AARREMERKILLÄ — pieni pyöreä '
          + 'merkki löytyneen aarteen kuvalla kaupungin paikalla, ei '
          + 'koskaan kahta laattaa vierekkäin. VIHREÄ KOHTAAMISPISTE '
          + 'on pieni ja TUIKKII (löytyminen hoituu tuikkeella, ei '
          + 'koolla) ja piirretty merkki siirtyy sivuun laatasta, '
          + 'jottei se korvaa kaupungin pistettä. KOHTAAMISKORTTI '
          + 'aukeaa keskelle ruutua (hetken päänäyttämö). KOHDEPOPUP: '
          + 'isommat marginaalit, "Kysy pöllöltä" -rivi kysymysten '
          + 'yllä, RAAHATTAVA (napautus sulkee sormen noustessa, veto '
          + 'siirtää; raahattu paikka voittaa automaattiasemoinnin). '
          + 'VANHA MAAILMANKARTTA JA PAPERIRAE EIVÄT PIIRRY atlaksen '
          + 'alla fokusnäkymässä (mitattu: pudonneet kehykset '
          + '~kolmannekseen), eikä piilotettua lautaa rasteroida — '
          + 'yleiskuvaan palatessa kartta tarkentuu hetken. NOPEA '
          + 'AVAUS: raskas työ esilämmitetään alkukertomuksen aikana, '
          + 'lautaa ei maalata pergamenttiarkin alla; järjestys on '
          + 'kartta feidaten → ääni → kone (klikkauksesta karttaan '
          + '~5 s, oli ~24 s). Kertoja vaikenee kun matka alkaa. '
          + 'Maataulun plus on PALJAS PAKSU PLUS ilman ympyrää, '
          + 'taulun yläreunassa keskellä omalla rivillään. '
          + 'KEHITTÄJÄN VÄRILAATTAKOODIT POISTETTU kartalta — '
          + 'valmiusvärit elävät vain työhuoneen Tilastot-taulussa.',
        'PELITESTIKIERROS 26.8.2026 (aamu): (1) nähtävyyspisteet '
          + '-15 % ja nykyisen kaupungin pääpiste -12 % (kosketus- '
          + 'alueet ennallaan 44/48 px); (2) PÄÄLLEKKÄISET PISTEET '
          + 'siirretään ESITYSSIIRROLLA erilleen — saa poiketa '
          + 'kartan oikeasta paikasta (omistajan linjaus), data ei '
          + 'muutu; (3) kohdepopup aukeaa irti ylä-/alalaidasta '
          + '(vara 10 % ruudun korkeudesta); (4) maataulun plus '
          + 'aidosti keskellä + reilu avaussykäys; (5) lennon '
          + 'jälkeen EI Astu mantereelle -nappia — automaattinen '
          + 'jatko, ja napautus ohittaa lentoanimaation; (6) '
          + 'lentokohtaus juhlavammaksi: paksumpi katkoviivareitti, '
          + 'saapumisleima, harsopilvet hitaasti kartan yli.',
        'SAAPUMISSEKVENSSI (omistaja 26.8.2026, sanamuodot kaanon): '
          + 'lennon jälkeen feidi tyhjään pergamenttiin → '
          + 'konekirjoitettu välikortti "<KAUPUNKI> · PÄIVÄ <n>/80" '
          + '→ kartta feidautuu suoraan oikeaan zoomiin ILMAN ajoa '
          + '→ pöllö "Tervetuloa <maahan>. Sinun on ratkaistava '
          + 'tehtävä <kaupungissa> ennen kuin voit etsiä aarretta." '
          + '→ TOINEN kupla alle (ensimmäinen jää): "Klikkaa '
          + 'kaupungin kultaista merkkiä kartalla." (oikaisu 26.8: '
          + 'merkki EI ole vihreä — teksti kuvaa todellisen '
          + 'kultaisen kiekon). KUPLIEN AJASTUS SIDOTAAN LUENTAAN '
          + '(26.8 ilta): kumpikin kupla tulee vasta edellisen '
          + 'luennan PÄÄTYTTYÄ + ~0,9 s hengähdys, ei kiinteillä '
          + 'sekuntiviiveillä. Saapumiskamera zoomaa LÄHEMMÄS: '
          + '~60 % maan ikkunasta, kaupunki keskellä. Napautusohitus '
          + 'hyppää sekvenssiin, ei yli. SAAPUMISLEIMA POISTETTIIN '
          + '(26.8 ilta — kumoaa aamun leimalinjauksen): leiman '
          + 'tilalla lentokartalle piirtyvät himmeät LAIVAREITIT '
          + '1873-atlaksen tapaan. Toistaiseksi vain avauslennossa; '
          + 'laajennus muihin lentoihin on oma päätös.',
        'PELITESTIKIERROS 26.8.2026 (ilta, v1120): (1) KAHDEN '
          + 'YRITYKSEN SÄÄNTÖ — kohtaamiskortti kysyy "Haluatko '
          + 'varmasti tavata <hahmon> juuri nyt?" (Kyllä/Ei) ja '
          + 'pränttinä "Sinulla on vain kaksi yritystä, jonka '
          + 'jälkeen aarre sulkeutuu ikuisesti"; kahden epä- '
          + 'onnistumisen jälkeen aarre LUKKIUTUU, mutta lukko EI '
          + 'JUMITA peliä: tähti siirtyy ja MATKUSTA aukeaa. (2) '
          + 'TÄKYANNOSTELU: ruudulla korkeintaan YKSI täkykupla '
          + 'kerrallaan; muut täyt näkyvät kartalla heti '
          + 'SYMBOLEINA (huutomerkki = skandaali/hurja, '
          + 'pöllönpoikanen = eläin, silmä = nähtävyys/multimedia); '
          + 'ensimmäinen nosto vasta kun aarre löytyi ja pöllön '
          + 'kupla on ehtinyt tulla. (3) TEHTÄVÄKOHTAINEN JULISTE: '
          + 'fokustehtävä voi kantaa juliste-avaimen, joka avaa '
          + 'aiheeseen sidotun julisteen (esim. Athena Nike). (4) '
          + 'MATKUSTA-nappi (ent. Liiku) kevyen oranssi ja ylempänä; '
          + 'matkustusnäkymä zoomaa reittiin ja askellus kulkee '
          + 'atlaksen päälle piirretyllä reittikerroksella kuten '
          + 'ennen. (5) VIRTUAALIKIERROSIKKUNA: ulkoinen kierros '
          + 'saa aueta pelin sisäiseen ikkunaan vain jos sivusto ei '
          + 'estä upotusta EIKÄ KIELLÄ sitä ehdoissaan; muuten '
          + 'linkkinä laitteen selaimeen (avaustapa on datassa, '
          + 'oletus linkki). TARKENNUS (omistaja 26.8.2026 ilta): '
          + 'kierros otetaan peliin VAIN jos se aukeaa pelin sisällä '
          + '— acropolisvirtualtour.gr jäi siksi kokonaan pois '
          + '(ministeriön ehdot kieltävät kehystämisen), ja tilalle '
          + 'tulivat Akropolis-museon KOLME Google Arts & Culture '
          + '-upotusta (Parthenon-galleria, rinteet, kaivaus museon '
          + 'alla; museo julkaisee embed-osoitteet itse, joten upotus '
          + 'on sekä sallittu että tarkoitettu). (6) AARTEEN PALJASTUS '
          + 'mustalla pohjalla + JATKA MATKAA -nappi; "taskuun"-rivi '
          + 'pois toistaiseksi. (7) ÄÄNIVALIKKO erittelee KERTOJAN '
          + 'ja TAUSTAÄÄNET; matkakirjan kaiutinnappi synkassa '
          + 'hampurilaisvalikon kytkimen kanssa, pysyvä valinta. '
          + '(8) LEHTIVINKKI: viive ~1,4 s, teksti "Etsi minitehtävä '
          + 'lehdestä ja ratkaise se, niin saat vinkin aarteen '
          + 'paikasta kartalla." + suora linkki lehden oikeaan '
          + 'kappaleeseen; aarrekuittaus "Aarteen jälki syttyi: '
          + 'vihreä piste kartalla näyttää paikan." ~2,5 s viiveellä.',
        'PULU-KOKEILU (omistaja 27.8.2026, idea vaimolta): Viisas Pollo '
          + 'korvataan KOKEILUNA kirjekyyhkyhahmolla KEVYENA '
          + 'VALIVERSIONA pelitestia varten. Hahmo: LIVIA, taydelta '
          + 'nimeltaan Columba Livia (kalliokyyhkyn tieteellinen nimi - '
          + '"suku on vanhaa roomalaista" on totta). Tausta 1873: isoaiti '
          + 'lensi Pariisin piirityksen kyyhkypostia 1870-71, seta kantoi '
          + 'kursseja Reuterille ennen lennatinta. AANI: aidosti '
          + 'asiantunteva viestinvieja joka puolustautuu refleksina '
          + '(sukua ei arvosteta) - komiikka arvostuksen puutteesta, EI '
          + 'tyhmyydesta; loukkaantuu sanasta pulu mutta antaa heti '
          + 'anteeksi; ei huutomerkkeja. VALIVERSIOSSA vaihtuivat VAIN '
          + 'persoona (workerin kehote), kayttajanakyvat tekstit ja '
          + 'nimet; kuvat, tietajatasot, varssyt, koodinimet ja '
          + 'localStorage sailyvat polloasuisina kunnes pelitesti '
          + 'ratkaisee jatkon (taysvaihto / pollo takaisin / pari). '
          + 'Ateenan pikkupollo-karttakohde on faktasisaltoa ja sailyy.',
        'LIVIA TUURAAJANA (omistaja 27.8.2026 ilta, "joo"): pulukokeilu '
          + 'syveni kaanoniksi ILMAN tietajatasojen muutosta. Livia on '
          + 'Viisaan Pollon SIJAINEN, joka on luvannut kasvattaa pelaajan '
          + 'untuvikkopolloa silla aikaa kun pollo on matkoilla tai '
          + 'toipumassa siipirikosta - siksi avatar ja tasot pysyvat '
          + 'polloina. Polloa "odotetaan hetkena mina hyvansa", mutta '
          + 'hetki siirtyy aina. Livia on ensin epavarma kasvattajana '
          + 'mutta iloitsee aidosti untuvikon edistysaskelista. Otsikoissa '
          + 'kasin piirretty VINO punainen yliviivaus: "Viisas pollo" '
          + 'yliviivattuna, perassa "Pulu" (SVG, ylaoikealta yli tekstin '
          + 'korkeuden). ANNOSTELU: isot persoonaelementit (sivupolku, '
          + 'sijaisuusmaininta, Livian lisays) korkeintaan yksi per '
          + 'vastaus ja enintaan joka 10. vastaus sivupoluille.',
        'LIVIAN LISAYS JA KEVYT MAUSTE (omistaja 27.8.2026 ilta: '
          + '"pulu\'s take" + "sepittelisi vahan omalla tyylillaan... ei '
          + 'tarvitse montaakaan sanaa"): faktavastaukset elavoityvat '
          + 'kahdella tasolla. LIVIAN LISAYS = noin joka 3.-4. '
          + 'faktavastauksen loppuun oma osio rivilla "Livian lisays:" '
          + '(1-3 virketta pulun nakokulmaa). KEVYT MAUSTE = useimpiin '
          + 'faktavastauksiin muutaman sanan kevennys alkuun TAI loppuun '
          + '- savy, ei vaite, eika koskaan ison elementin rinnalla. '
          + 'Fakta ei saa vaaristya kummassakaan.',
        'ISOISAN MAADOITUS KEVYESSA KULUSSA (omistaja 27.8.2026 ilta): '
          + 'Livian maadoituskommentti isoisan merkinnasta tulee '
          + 'ENSIMMAISENA saapumiskuplana kaupungeissa joissa muita '
          + 'kuplia ei viela ole (Sofia, Sarajevo, Bukarest, Istanbul, '
          + 'Rooma) - Ateenassa EI heti pelin alussa. Kerran per '
          + 'saapuminen, matkakirjaluennan jalkeen.',
        'TAKYNOSTO ON TUIKKIVA PISTE (omistaja 27.8.2026 ilta): '
          + 'takynostot ovat pelkka pieni tuikkiva keltainen piste '
          + 'kartalla, YKSI KERRALLAAN - seuraava syttyy vasta kun '
          + 'edellinen on katsottu. Ei tekstikuplaa eika symbolia. '
          + 'Livia vihjaa ensimmaisesta pisteesta kerran istunnossa.',
        'IHMENAUHAN LOPULLINEN MALLI (omistaja 27.8.2026 ilta, monen '
          + 'kierroksen jalkeen): esikuva on pelin oma MATKAOPAS-nauha - '
          + 'pelkka vino TASAINEN kaista, joka leikkautuu tasmalleen '
          + 'kuvan reunaan EIKA jatku valkoiselle paperille. Ei '
          + 'taitekappaleita eika kaantyneita paita ("ylimaarainen kumpu '
          + 'reunassa" hylattiin); paiden varjostus on kaistan omassa '
          + 'pinnassa satiiniliukuna. Paksu kaista, juhlava antiikva '
          + 'harvennettuna ja tahtikoristeet (sopivat ihmeeseen); teksti '
          + 'irti kaistan paista reilulla varalla.',
        'PELINAPPULA VALKOISEKSI (omistaja 27.8.2026 ilta, kokeilu): '
          + 'tinaherra oli visuaalisesti liian raskas - nappula on nyt '
          + 'mahdollisimman yksinkertainen klassinen lautapelinappula, '
          + 'lammin valkoinen ohuella aariviivalla. Tinaherra sailyy '
          + 'kytkimen takana (NAPPULA_TYYLI).',
        'KLIKATTAVUUSLINJAN VARTIO (omistaja 27.8.2026: "tamantyyppiset '
          + 'virheet tsekattava kaikista maista"): kaikkien fokusmaiden '
          + 'poltetut nimet auditoitiin koneellisesti ja '
          + 'tests/fokusnimet.test.mjs valvoo jatkossa: jokaisella '
          + 'kohdemaalla FOKUS_LISANIMET-kirjaus (tyhja lista on paatos, '
          + 'puuttuva on unohdus), poltettu nimi ilman kohdetta vaatii '
          + 'velkakirjarivin, nimio ei saa katketa (lyhyt nimio-kentta '
          + 'jos nimi on pitka). Uudet kuratoidut lehdet (HUN, HRV, DEU) '
          + 'syntyvat linja edella: kaikki kartalla nimetty on '
          + 'napautettavissa.',
        'KARTTAMERKIT MINIMALISTISIKSI (omistaja 27.8.2026, laitteelta: '
          + '"symbolit aivan liian raskaita... mennaan hyvin '
          + 'minimalistiseen suuntaan"): kartalla fokuskohteen merkki on '
          + 'SUPERYKSINKERTAINEN viivamerkki kartan musteella, samaa '
          + 'kokoluokkaa kuin lehteen ennen poltettu vuorikolmio, ja '
          + 'nimio ladotaan POLTETUN NIMEN typografialla ja koolla '
          + '(vuorityyli kursiivilla, merityyli harvennetulla '
          + 'kapiteelilla) - vanhan kartan tuntu ratkaisee. Generoitu '
          + 'mustepiirrosglyyfi elaa pop-upin ylarivilla, EI kartalla. '
          + 'Kaupunkikohteet ilman nimiota. Nimipoltto poistetaan '
          + 'lehdista joilla kohteet hoitavat nimeamisen (GRC '
          + 'ensimmainen); pudonneet nimet palautetaan kohteina, ei '
          + 'polttoa palauttamalla. Ahtaissa ryppaissa nimio vaistaa '
          + '(tormayspassi, symboli nakyy aina). TASMENTAA '
          + 'SYMBOLITAKSONOMIAA: taksonomia ja symboli-datakentta '
          + 'sailyvat, vain kartan piirtoasu keveni.',
        'HEROKUVIEN RAJAUS (omistaja 27.8.2026): jos kohteen lahella '
          + 'on muita rakennuksia, kuva rajataan tiukemmin niin etta '
          + 'naapurit nakyvat vain vahan reunoilla - niiden keskinainen '
          + 'sijoittelu saa olla vaara; kaukainen taustasiluetti saa '
          + 'nakya entiseen tapaan. LAATUKALIBROINTI: rakennus itse ja '
          + 'yleisvaikutelma ratkaisevat hyvaksynnan, ymparoivien '
          + 'rakennusten sijoittelu saa poiketa todellisuudesta.',
        'SYMBOLITAKSONOMIA (omistaja 26.8.2026 ilta: "tee kaikki '
          + 'ehdotetut symbolit ja myös lisäkandidaatit; katsotaan '
          + 'miten toimivat ja muutetaan sen perusteella"): kartan '
          + 'täky- ja kohdemerkit kertovat KATEGORIANSA symbolilla — '
          + 'ei enää pelkkiä pisteitä. KAKSITOISTA kategoriaa, '
          + 'symbolia ja vaimeaa heraldista väriä: HUUTOMERKKI = '
          + 'skandaalit ja hurjat tarinat (keltainen); PÖLLÖNPOIKANEN '
          + '= eläimet (ruskea); SILMÄ = nähtävyydet ja multimedia '
          + '(sininen); MURTUNUT PYLVÄS = historia ja rauniot '
          + '(punaruskea); VUORENHUIPPU JA AALTO = luonto: vuoret, '
          + 'joet, järvet (sinivihreä); HÖYRYÄVÄ MALJA = ruoka ja '
          + 'juoma (viininpunainen); LYYRA = kulttuuri: musiikki, '
          + 'teatteri, taide (violetti); HAMMASRATAS = tekniikka ja '
          + 'keksinnöt (teräksenharmaa); VAAKA = kauppa ja raha '
          + '(oliivi); SULKAKYNÄ = kieli, kirjallisuus ja legendat '
          + '(tummansininen); ANKKURI = merenkulku ja satamat '
          + '(meren tummansininen); LAAKERISEPPELE = urheilu ja kisat '
          + '(kullanvihreä). MUOTO RATKAISEE, väri on toissijainen '
          + 'vihje (pergamentilla vaimeat värit sekoittuvat). '
          + 'Symbolin GLYYFI on generoitu kaiverruskuva (26.8.2026: '
          + '"Symboleista voisi tehdä generoimalla paremmat"; 12 kuvaa '
          + 'assets/kartat/symbolit/), mutta pergamenttilaatan ja '
          + 'mustereunan piirtää edelleen koodi, ja koodiglyyfit ovat '
          + 'VARAPOLKU jos kuva ei lataudu. Kaikki kulkee yhteisen '
          + 'kirjaston kautta, jota käyttävät sekä täkysymbolit että '
          + 'kohdemerkit; datakenttä on `symboli`, ja ilman kenttää '
          + 'täky saa huutomerkin ja kohde tyyppijohdon mukaisen '
          + 'symbolin (vain kaupunki ja muu jäävät pisteiksi; '
          + 'tarkennettu 26.8.2026 toteutuksen mukaiseksi). Vihreä '
          + 'tuikkiva kohtaamispiste EI saa symbolia — sen erilaisuus '
          + 'on sen merkki. ENSIMMÄINEN SISÄLTÖERÄ tällä sapluunalla: '
          + 'Kreikka ja pelattavat naapurit (BGR, TUR) saavat eri '
          + 'kategorioiden kohteita ja täkyjä.',
        'ASTEVERKKOERÄ (omistaja 26.8.2026): (1) ERIKOISPIIRIT '
          + '1800-luvun atlastyyliin — päiväntasaaja, Kravun ja '
          + 'Kauriin kääntöpiirit, pohjoinen napapiiri ja '
          + 'Greenwichin meridiaani hentona piste-viivana '
          + 'kursiivinimin, himmeänä lehtien päällä (etelänapapiiri '
          + 'jää laudan ulkopuolelle; päivämäärärajaa EI piirretä — '
          + 'sitä ei ollut 1873); (2) reunojen leveys-/pituuslukemat '
          + 'päivittyvät REAALIAJASSA panoroidessa (ei asettelun- '
          + 'lukuja silmukassa — v1115:n sääntö); (3) laattojen '
          + 'suomalaisnimille NIMIALIAKSET NE-aineistoa vasten (37 '
          + 'ryhmää) — tuplakaupungit pois lehdiltä.',
        'YLEISLEHTI ON KARTAN POHJA (26.8.2026, laajentaa kauko- '
          + 'zoomilinjausta): MAAILMA-yleislehti piirtyy maalehtien '
          + 'ALLA aina fokusmoodissa — lataamattomien maiden '
          + 'kohdalla näkyy oikea kartta eikä pergamentti+vuotoja. '
          + 'Jättiläislehdet (RUS, CAN, GRL, CHL, CHN) kelpaavat '
          + 'atlakseen vain pohjaa selvästi tarkempina, muuten '
          + 'niiden sumea jätti-ikkuna peittäisi tarkat naapurit '
          + '(omistajan kuvien "groteskit jokikiemurat" olivat '
          + 'Venäjän lehteä 12-kertaisena). Turvatilassa pohjaa ei '
          + 'pureta. Purku on sarjoitettu myös työpöydällä.',
        'VANHA KARTTA KOKONAAN POIS PELISTÄ TOISTAISEKSI (omistaja '
          + '25.8.2026, ilta — laajentaa aiempaa fokusnäkymärajausta): '
          + 'pelilaudan vanhaa piirrosta ei näytetä MISSÄÄN pelin '
          + 'aikana — ei myöskään avauslennossa eikä yleiskuvassa. '
          + 'Atlas-lehdet + sumuverho/pergamentti ovat ainoa kartta; '
          + 'lennon punainen viiva ja kone piirtyvät niiden päälle. '
          + 'KUMOAA aiemman "lento on niukka vanha kartta" -linjan. '
          + 'Etusivun (pickstart) taustakartta ja katselulaudat '
          + 'ennallaan — niillä ei ole atlasta. Vanhaa piirtokoodia '
          + 'EI poisteta (toistaiseksi-linjaus). TOTEUTETTU v1115. '
          + 'Hyväksytty välitila kunnes lehtiä on joka maasta: '
          + 'yleiskuva on pergamenttia + valmiiden maiden lehdet, '
          + 'ja lento lehdettömään maahan näyttää vain pergamentin, '
          + 'harson ja punaisen viivan.',
        'TILANNE 25.8.2026: Kreikka-pilotti valmis ja viisi uutta '
          + 'maata pelissä Kreikan tasolla (Sofia, Rooma, Istanbul, '
          + 'Sarajevo, Bukarest — fokusvirrat, lehtitehtävät, '
          + 'kohteet, täkynostot, aarremerkinnät, luennat, '
          + 'kohtaamiskuvat). Seuraavaksi loput Euroopan maat '
          + 'samalla Sofia-rakentajamallilla kaanoneista.',
        'KOKO MAAILMAN LEHDET (25.8.2026, yö): maanosaparvi '
          + 'generoi 93 uutta fokuslehteä yleisellä reitillä '
          + '(Afrikka, Aasia, Amerikat, Oseania, Lähi-itä) — '
          + 'atlas kattaa nyt 132 maata eli koko pelilaudan paitsi '
          + 'Venäjän ja Kanadan (niiden ikkunat ylittävät yleisen '
          + 'reitin rajat; tarvitaan kuratoidut ikkunat). Samalla '
          + 'piirtomoottoriin: matalan meren porras (Persianlahti '
          + 'näkyy), meren ala ocean-maskista (Kaspia vetenä, '
          + 'toimii päivämäärärajan yli), tuplanimisuodatin '
          + 'laattoja vasten. Euroopan 39 lehteä ovat vanhalla '
          + 'sävyasteikolla — uusinta on omistajan päätös, koska '
          + 'hyväksyttyjen lehtien ilme muuttuisi.',
      ],
    },
    {
      otsikko: 'Arkkikirjasto: pop-upien yhteinen kieli',
      tila: 'linjattu 26.8.2026 (omistaja: "pelin pop upit saisi tulla '
        + 'yhtenaisesta tyylikirjastosta ... Mieti kokonaisuus '
        + 'tarkkaan") — toteutus erissä',
      kohdat: [
        'YKSI SANASTO KAIKILLE KELLUVILLE PINNOILLE: pop-up kootaan '
          + 'aina samoista paloista — ylärivi (pikkuotsake, esim. '
          + 'KOHTAAMINEN tai symboli+luokka), otsikko, leipä, '
          + 'korostettu kysymysrivi, nappirivi, reunahuomautukset '
          + '(varoitus ja vihjelinkki pienellä) ja lähderivi. '
          + 'NAPPIEN KOLME ROOLIA: kullattu päänappi on etenevä tai '
          + 'peruuttamaton valinta (Aloita peli, Kyllä), kehystetty '
          + 'paperinappi on sivuvalinta (Ei), ja musteviivarivi jää '
          + 'kortin sisäisille listavalinnoille (24.8. kevennys).',
        'TAUSTAN KOLME ASTETTA OVAT PANOKSEN MITTARI. Aste 0, '
          + 'selailu: ei tummennusta (kohdekortti, minipopup) — '
          + 'kartta elää kortin takana. Aste 1, harkinta: kevyt '
          + 'tummennus ja sumennus (varmistukset, lippu- ja '
          + 'Tutki-ikkunat) — päätöstä punnitaan, perääntyä voi. '
          + 'Aste 2, panos: tumma sumennus, joka kuultaa '
          + 'reunoiltaan (v1134:n säteittäinen malli; tehtäväkortti '
          + 'ja aarrepaljastus) — on sitouduttu, jännite nousee '
          + '(omistaja 26.8.2026: "tummemman taustan voisi tuoda '
          + 'mukaan kysymyksen alkaessa"). Tummuus kertoo aina '
          + 'panoksesta — se ei ole koristeen asia.',
        'SULKEMISSOPIMUS SEURAA ASTETTA: selailupinta sulkeutuu '
          + 'rastista ja ulkopuolelta napauttaen; harkintapinta '
          + 'napeistaan ja ulkopuolelta; panospinta vain omalla '
          + 'toiminnollaan — kulman rastia sillä ei ole (omistaja '
          + '26.8.2026: "Yläkulman ruksi on turha").',
        'TOTEUTUS ERISSÄ, EI KERTARYSÄYKSELLÄ: yhteinen tyylipohja '
          + 'ja pieni apuri, siirrot pari pintaa kerrallaan '
          + '(panospinnat ensin, sitten fokusvirran kortti ja kupla, '
          + 'selailupinnat, isot dialogit), savukkeet vartioivat '
          + 'ettei siirto muuta käytöstä. UUSI pop-up tehdään AINA '
          + 'kirjastosta — erillistyylit ovat jatkossa virhe.',
      ],
    },
    {
      otsikko: 'Aarteet ja eteneminen',
      tila: 'mekaniikka toteutettu v1109–v1110 (25.8.2026); '
        + 'maakohtaiset parit sisältötyönä jäljellä',
      kohdat: [
        'Laatta joka kaupungissa; oikea vastaus paljastaa, alta löytyy '
          + 'AINA aarre. Vanhat laattatyypit (jalokivet, tyhjät, '
          + 'hevosenkengät, rosvot, linssilaatat) on POISTETTU '
          + 'pelistä; vanhat tallenteet migratoituvat.',
        'AARTEET: pieni paikallisaarre (~100–250 p) · iso '
          + 'paikallisaarre (~500–800 p) · mantereen 1000 p aarre · '
          + 'PÄÄAARRE (2000 p + jää matkalaukkuun; entinen '
          + 'tähtimekaniikka, avaa mannerlennon). Arvo arvotaan '
          + 'löytöhetkellä 10 punnan tarkkuudella; kiinteät vain '
          + '1000/2000. Jako: 1 pääaarre + 1 mantereen aarre per '
          + 'manner, lopuista ~1/3 isoja ja ~2/3 pieniä.',
        'Paikallisaarteet: joka maalle oma pari (pieni + iso), '
          + 'paikkaan sopivia, osa hauskan yllättäviä. ~220 paria — '
          + 'mekaniikka valmis (js/packs/paikallisaarteet.js, '
          + 'ISO3-avaimet), sisältö kirjoitetaan erissä. SIIHEN ASTI '
          + 'väliaikaisina pareina mantereiden entiset aarteet '
          + 'nimineen ja kuvineen (esim. Eurooppa: Meripihka / '
          + 'Ritarin hopeamiekka).',
        'Löytöteksti: lyhyt tosi fakta aarteesta + onnentoivotus '
          + '(fakta-kenttä valmiina; kortille kun parit tulevat).',
        'Huudahdukset: pääaarteen luetut säilyvät; muut ovat '
          + 'korkeintaan kahden sanan huudahduksia ("Jes!", '
          + '"No okei.") — toteutettu.',
        'VARUSTEET ostetaan kaupasta (hampurilaisvalikko, ~1000 '
          + 'p/kpl) — eivät löydy laatoista. AVOIN 25.8.2026: '
          + 'kauppaa ei ole vielä rakennettu, joten mannerkohtaiset '
          + 'linssit eivät tällä hetkellä ole saatavissa mistään '
          + '(vain tietäjäpisterajojen linssit aukeavat).',
        'Pääaarre voi osua mantereen ensimmäiseen kätköön; varma '
          + 'viimeisessä. Löytö avaa mannerlennon seuraavalle.',
      ],
    },
    {
      otsikko: 'Karttalinssit',
      tila: 'luonnos',
      kohdat: [
        'LINSSIT KYTKETÄÄN VAIN MATKALAUKUSTA (omistaja '
          + '18.8.2026): hampurilaisvalikko on pelin ympäryksiä '
          + '(äänet, uusi peli, ehdota sisältöä, versio), ei '
          + 'pelisisältöä.',
        'Kartta on pelin keskusesine, ei valikko: pelaaja oppii '
          + 'näkemään siitä yhä uusia asioita.',
        'Linssi = animoitu visualisointi kartalla juoksevine '
          + 'vuosilukuineen. Avaa kaikki vuosisadat, ei vain 1873:n.',
        'Linssit aukeavat pelin aikana (osa kaupasta, osa matkalla) '
          + 'ja jaksottavat pelirytmiä. Superlinssi on eri asia '
          + '(läpipeluupalkinto).',
        'PAIKKASIDONTA: linssi aukeaa missä merkitsee eniten — '
          + 'leviäminen Afrikassa, Kolumbus Espanjassa, Rooma '
          + 'Roomassa, kauppakomppania Intiassa, dynastiat Kiinassa.',
        'Ideapankki: imperiumit, kauppareitit, viestinnän historia, '
          + 'tutkimusmatkat, aikapyyhkäisy. Kerroksia enintään 2–3 '
          + 'kerralla.',
        'IDEAPANKIN TÄYDENNYS (omistaja 26.8.2026): ihmisten '
          + 'leviäminen maapallolla, silkkitiet, ristiretket, '
          + 'kolonialismi, kielten leviäminen, öljynporauksen '
          + 'vaikutus rahaliikenteeseen, dataverkkojen ja '
          + 'puhelinverkkojen kehitys, rautateiden kehitys; lisäksi '
          + 'kuvaajat, joilla näkee yksittäisen kaupungin kasvun '
          + 'kerros kerrokselta (lavalinssin aihe). Linsseillä '
          + 'karttapohjiin animoidaan aikajanatekniikalla erilaisia '
          + 'näkökulmia.',
        'Toteutus: käsin tarkistettu data, pelin oma animaatio. '
          + 'Etusivulla kevyt vihjeanimaatio.',
        'KAMERA-AJOT (omistaja 24.8.2026): piirtomoottoriin '
          + 'kehitetään sulavat zoomausanimaatiot sisään ja ulos — '
          + 'zoomi kiihtyy ja hidastuu luontevasti alussa ja '
          + 'lopussa (easing). Tarvitaan paljon jatkossa: linssien '
          + 'animaatiot (esim. Silkkitien reitit, ihmispopulaation '
          + 'leviäminen Afrikasta), joissa kartta liikkuu itsestään '
          + 'ja zoomautuu tarvittaessa.',
        'AIKAJANA-AJO (omistaja 17.8.2026): animaatiolinsseillä '
          + 'yhteinen aikajanamoottori juoksevine vuosilukuineen — '
          + 'pelaajan käynnistämä, ele keskeyttää.',
        'LAVALINSSI (omistaja 17.8.2026): lähikuvakehyksen '
          + 'linssityyppi ilmiöille, jotka eivät erotu laudan '
          + 'mittakaavassa (esim. kaupungin kasvu; pilotti Rooma).',
      ],
    },
    {
      otsikko: 'Viisas Pöllö',
      tila: 'luonnos — ideointi, ei vielä toteutukseen',
      kohdat: [
        'VAIKEAT NYKYAIHEET (omistaja 20.8.2026): Pöllö vastaa '
          + 'asiallisesti suoriin kysymyksiin vaikeista nykyaiheista '
          + '(esim. "miksi Mosul on tuhoutunut", "onko siellä elämää '
          + 'nyt"): mitä tapahtui ja milloin, millainen tilanne nyt '
          + 'on, ja maininta jos tieto voi olla vanhentunutta. '
          + 'Neutraalisti: ei osapuolten syyttelyä, ei julmuuksien '
          + 'yksityiskohtia. Aidosti kiistanalaisessa asiassa '
          + 'kerrotaan molemmat vakiintuneet kannat lyhyesti '
          + 'valitsematta puolta. Sotaan ei syvennytä oma-'
          + 'aloitteisesti, mutta suoraa kysymystä ei väistetä. '
          + 'Toteutettu tools/pollo/worker.js-kehotteeseen.',
        'PÖLLÖN KARAKTÄÄRI (omistaja + Fable 25.8.2026): pöllö on '
          + 'IKIVANHA SILMINNÄKIJÄ-REPORTTERI — istunut räystäillä '
          + 'pari sataa vuotta ja nähnyt kaiken itse. Rakastaa '
          + 'skandaaleja ja mehukkaita juttuja (täkynostot ovat sen '
          + 'heiniä) mutta tarkistaa aina faktat. PUHESÄÄNNÖT: '
          + 'kuiva huumori ja vähättelevä toteavuus; enintään kaksi '
          + 'virkettä; ei huutomerkkejä (paitsi purkauksissa); '
          + 'minä-muotoinen silminnäkijäheitto korkeintaan kerran '
          + 'per maa; lempeä ironia, ei ilkeyttä; ei koskaan '
          + '1873-ääntä (se on isoisän) eikä pelaajan puhuttelua '
          + 'ylhäältä. SULKASATOHETKET: pidätelty rääväsuupuoli '
          + 'pääsee valloilleen HARVOIN ja vain sisällöstä — '
          + 'räikeät vääryydet ja huijarit (ryöstöt, dynamiitti) — '
          + 'enintään kerran per maa, ja SILLOIN SAA PÄÄSTELLÄ '
          + 'KUNNOLLA (omistaja 25.8.2026): purkaus saa revetä '
          + 'täysillä — versaalit, huutomerkit, useampi huudahdus '
          + '— kunhan heti perään tulee pahoittelu ja paluu '
          + 'kuivaan ("...Anteeksi. Jatketaan."); ei oikeita '
          + 'kirosanoja vaan pöllön omat voimasanat ja höyhenkieli '
          + '("Höyhenissäni sähköisti"); ei koskaan pelaajaa kohti. '
          + 'Sama karaktääriohje annetaan pöllö-chatin mallille. '
          + 'Puvustus päivitetään reportteri-ilmeeseen kun '
          + 'herotauko puretaan (lehtimieskortti/lasit/vihko).',
        'PÖLLÖ MUKANA ALUSTA (omistaja 24.8.2026, kumoaa alla '
          + 'olevan toistaiseksi): kehitysvaiheessa pöllö on pelissä '
          + 'heti alusta — fokusmoodin esittely tarvitsee sen. '
          + '"Pöllö on aarre" -idea säästetään ja voidaan tuoda '
          + 'takaisin myöhemmin (vaatii erikoisjärjestelyt '
          + 'ensimmäisen maan/kaupungin kohdalla).',
        'PÖLLÖ ON AARRE (omistaja 18.8.2026, TAUOLLA 24.8.2026 — '
          + 'ks. yllä): peli alkaa ilman '
          + 'pöllöä — nappi piilossa, ei kuplia eikä vihjeitä, eikä '
          + 'ennen ensimmäistä laattaa anneta ohjeita tai korvaavaa '
          + 'opastetta. Pöllö löytyy omana aarteenaan ensimmäisen '
          + 'käännetyn laatan alta (mikä tahansa laatta); pöllö '
          + 'KORVAA ensimmäisen laatan aarteen kokonaan (omistaja '
          + '18.8.2026) — laatan omaa sisältöä ei näytetä eikä '
          + 'anneta, eikä pöllö tuo pisteitä, rahaa eikä '
          + 'laukkutavaraa. Laukussa pöllön '
          + 'paikka on tietäjäpisterivin kuvake, ei TAVARAT-ruudukko. '
          + 'Ennen löytöä syntyneet tasonnousuonnittelut puretaan '
          + 'jonosta löydön jälkeen. Vanhassa tallennuksessa pöllö on '
          + 'valmiiksi löydetty.',
        'KALEVALAINEN KEHYS (omistaja 18.8.2026, "toteuta '
          + 'pöllöidea"): Viisas Pöllö on muuttumaton EMO — huuhkaja, '
          + 'jolla on karjalainen kirjontanauha harteillaan — tietäjien '
          + 'ikivanha matkakumppani, joka kasvattaa pelaajaa tiedon '
          + 'tiellä. Pelaajan oma avatar on lehtopöllö, joka varttuu '
          + 'untuvikosta tasojen myötä (10 kuvaa, assets/tietaja/). '
          + 'Jokaisella tasolla on kaksisäkeinen kalevalamittainen '
          + 'värssy, joka lausutaan tasonnousun juhlakuplassa; nimet, '
          + 'rajat ja värssyt ovat päätoimittajan kaanontekstiä '
          + '(js/tietajatasot.js). Ylin taso on "Tietäjä iänikuinen". '
          + 'Tasonnousu ei tuo pelietuja — vain nimikkeen, värssyn ja '
          + 'emon onnittelun.',
        'Ruudulla aina pieni pöllö → chat. Vastaa näkyvästä '
          + 'sisällöstä (saa kontekstin) + vapaa kenttä + '
          + 'kysymysehdotukset.',
        'Tiedon hahmo, ei tarinan: ei paljasta visavastauksia eikä '
          + 'juonisalaisuuksia. Faktakuri ja kunnioitus koskevat; '
          + 'myöntää kun ei tiedä.',
        'Tekniikka: pieni malli oman workerin kautta, käyttörajat, '
          + 'avain vain salaisuuksissa. Tausta vaihdettavissa '
          + '(laitemalli, tilaus).',
        'Vaiheistus: testi omistajan avaimella; ansainta päätetään '
          + 'kokeilun jälkeen.',
        'PUHEKUPLA (idea): esiohjelmoidut proaktiiviset vihjeet (80 '
          + 'päivän muistutus, alkuohjeet). Vihjaa, ei keskeytä — ei '
          + 'modaalia, ei ääntä, harvoin.',
        'VALMISKYSYMYKSET (omistaja 18.8.2026, "kannatan"): '
          + 'jokaiselle laatalle ja lehden etusivulle viisi valmista '
          + 'kysymystä PAKETTISISÄLTÖNÄ (js/packs/pollo-kysymykset.js; '
          + '≤70 mrk, pelaajan äänellä, aiheet pelin aineistosta, ei '
          + 'visavastauksia eikä juonispoilereita). Chatin alussa kaksi '
          + 'näkyvissä + väkänen; ensimmäisen kysymyksen jälkeen '
          + 'dynaamiset jatkot kuten ennenkin. AJANTASAISUUS HOIDETAAN '
          + 'JULKAISUPUTKESSA sisältötunnisteella (vaihe 2) — ei '
          + 'pelinaikaista generointia eikä pelinaikaista tallennusta; '
          + 'lennossa generoidaan vain jatkokysymykset.',
        'Ehdota sisältöä -nappi on myös pöllön chatissa (lehdillä '
          + 'hampurilaista ei näy) — sama lomake, sivukonteksti '
          + 'mukana.',
      ],
    },
    {
      otsikko: 'Tutki kätkö -pelit',
      tila: 'luonnos',
      kohdat: [
        'Pysähdyksessä täsmälleen yksi peli. Ensimmäinen aina '
          + 'luettu kohtaaminen; sitten painotettu arvonta: tietovisa, '
          + 'isoisän väittämä, valokuvakysymys, lippukysymys, isoisän '
          + 'pulma, vaikea kysymys.',
        'Pelin on auettava siitä mitä ruudulla näkyy — ei ulkoa '
          + 'opettelua. Kuvat oikeita ja tarkistettuja.',
        'Rahalla apua: visavihje ja 50:50 (hinnat: Talous).',
        'Katalogi ja uudet ehdotukset: Raamatun Pelit taulukkona -sivu. Uudet '
          + 'tyypit pilotoidaan yhdessä kaupungissa.',
      ],
    },
    {
      otsikko: 'Kohtaamiset ja henkilöt',
      tila: 'luonnos',
      kohdat: [
        'KEHYS: maisema on muuttunut 150 vuodessa — kätkö löytyy '
          + 'vain isoisän kuvauksen JA paikallisen hiljaisen tiedon '
          + 'yhdistelmällä.',
        'HILJAISEN TIEDON ARKKU: paikallinen auttaa vasta, kun '
          + 'tietämys hänen maastaan on todistettu — siksi kysymys on '
          + 'aina paikasta. Tämä on visamekaniikan tarinallinen syy.',
        'Joka kaupungille käsin kirjoitettu tyypillinen paikallinen '
          + '(ammatti sidottu paikkaan) + piirretyt kasvot '
          + '(yhtenäinen tyyli). Repliikki, kysymys, aarreteksti — '
          + 'luetaan ääneen.',
        'Aarrejahti on pelin satua; kaikki tieto paikoista totta.',
        'Nappi nimeää henkilön ("Tapaa Nikos"). Aloita peli -nappi '
          + 'erottaa luennan ja tehtävän — tiimalasi ei kulu puheen '
          + 'aikana.',
        'Epäonnistumisesta yksi uusinta; toisesta arkku jää kiinni. '
          + 'Kohtaamiset istuntokohtaisia.',
      ],
    },
    {
      otsikko: 'Kaupungit',
      tila: 'luonnos',
      kohdat: [
        'Saapumiskortti: luettu matkakirjamerkintä + esittely '
          + 'kuvineen.',
        'Lehtikaupungissa kortti on paikallislehti: sivut, '
          + 'kuvataitto, sää, media — sekä kohdekartta '
          + 'numeropisteineen ja omat nähtävyysjutut.',
        'Kohdekartta on PELKKÄ VÄRIKARTTA (linjaus 15.8.2026: '
          + '"Piirroskartan voi ottaa kokonaan pois ja pitää vain '
          + 'värillisen"). Kohteet leikattuina piirroksina kartalla; '
          + 'klikkaus keskittää ja suurentaa 75 %:iin, numerokyltistä '
          + 'juttuun.',
        'KOHDEKARTAN KOHDEMÄÄRÄ (omistaja 26.8.2026 ilta: "Kohteita '
          + 'voi olla jopa 15 jos ovat vain mielenkiintoisia"): 6-8 '
          + 'on pohjataso ja 15 yläraja — määrä ei ole tavoite, '
          + 'mielenkiintoisuus ratkaisee. Jokainen uusi kohde '
          + 'tarvitsee kuratoidun jutun lähteineen, paikan kartalta '
          + 'ja miniatyyrin; täytekohteita ei lisätä ylärajan '
          + 'täyttämiseksi.',
        'Kohteita saa olla entistä enemmän per kaupunki — kartta on '
          + 'zoomattava (linjaus 15.8.2026). Uudet kaupunkikartat '
          + 'tehdään 5 kaupungin erissä omistajan tsekattavaksi.',
        'UUSI TARINAKAARI ON FOKUSVIRTA (korvaa 17.8. jäädytyksen; '
          + '25.8.2026): uusi maa rakennetaan Sofia-mallilla — Fable '
          + 'kirjoittaa sitovan kaanonin (matkakirja, pöllön huomio, '
          + 'täyt, aarremerkintä, täkynostot; docs/moduulit/'
          + 'tarinakaari.md), rakentaja siirtää sen sanasta sanaan '
          + 'fokusvirtapaketiksi ja kohdelistaksi tutkimusraporttien '
          + 'faktoilla. Kuusi maata tehty tällä mallilla.',
        'MATKAILIJAN OPAS on pelin kevyt ja viihteellinen osa, joka '
          + 'houkuttelee matkustamaan itse kohteeseen (linjaus '
          + '16.8.2026): se saa käyttää muuta lehteä iloisempia '
          + 'värejä, ja etusivulla siihen kutsuu pirteä kulmalappu. '
          + 'Rakenne: aihejaksot isoine kuvineen, tekstinosto sekä '
          + 'sää- ja suunnittelulaatikot '
          + '(docs/kuvakasikirjoitukset.md + työlistan speksit).',
        'Valmiustilanne kaupungeittain: Tilastot-lehti, ei tämä.',
      ],
    },
    {
      otsikko: 'Matkakirjan ihmeet',
      tila: 'luonnos',
      kohdat: [
        'YDIN (omistaja 27.8.2026): kadonnut suuruus palautetaan '
          + 'pelaajan silmien eteen FOTOREALISTISENA KESKELLÄ '
          + 'NYKYMAAILMAA — Faros nyky-Aleksandrian Cornichen '
          + 'ruuhkassa, kolossi Mandrakin jahtisatamassa, värikäs '
          + 'Parthenon nykyturistien ympäröimänä. "Saa kokea pienen '
          + 'ihmeen kun näkee jotain mitä on jo tavallaan kadonnut '
          + 'nykymaailmasta." Tämä on YKSI PELIN KOHOKOHDISTA ja '
          + 'käy sellaisenaan MARKKINOINTIIN.',
        'KAKSI ESITYSTAPAA (omistaja 27.8.2026): jos kohde on YHÄ '
          + 'OLEMASSA (Akropolis, pyramidi, rauniokohteet), kartalla '
          + 'on normaali merkintä, pääkuvana nykytilan valokuva ja '
          + 'sen alla oma nappi, josta ihmeen pääsee kokemaan '
          + '(nykyaikakuva '
          + 'aukeaa). Jos kohde on KOKONAAN KADONNUT (Faros, '
          + 'kolossi, mausoleumi...), kartalla on suoraan oma '
          + 'TÄHTISYMBOLI ja popupin kuva aukeaa suoraan '
          + 'nykyaikakuvaan.',
        'Kuvien vasempaan yläkulmaan pelin piirtämä pieni nauha '
          + '("Matkakirjan ihme" tms.) pelin kartuutsityylillä — '
          + 'peli piirtää nauhan kuvan päälle, sitä ei polteta '
          + 'kuvatiedostoon.',
        'GENEROINTIKANAVA (omistaja 27.8.2026): uudet ihmekuvat '
          + 'generoidaan herokuvien tapaan ChatGPT:n '
          + 'käyttöliittymässä — Fable antaa promptit, omistaja '
          + 'generoi ja vie kuvat Drive-kansioon, Fable noutaa ja '
          + 'tarkistaa silmin ennen peliä. API-työnkulku '
          + '(generoi-ihmeet.yml) jää varakanavaksi. Kuvissa ei '
          + 'tekstiä eikä vesileimaa, ja lähteeksi merkitään '
          + 'Matkakirjan havainnekuva.',
      ],
    },
    {
      otsikko: 'Maalehdet ja lukeminen',
      tila: 'luonnos',
      kohdat: [
        'Joka lehtimaalla maalehti: 2–4 aihesivua (3 juttua/sivu), '
          + 'minitehtävät, menovinkit, Maa numeroina.',
        'Kuva ja aihe aina omasta maasta — naapurilta ei lainata.',
        'MAALEHDEN NIMIÖ (omistaja 16.8.2026): pelkkä maan nimi ja '
          + 'lippu sen perässä — ei selittäviä lisäsanoja ("Ranska '
          + 'kartalla"), kartta näkyy sivulla itsestään.',
        'MAALEHDEN LAAJUUS (omistaja 17.8.2026): määräytyy maan '
          + 'SISÄLLÖN mukaan, ei kohdemäärän. Jokainen maa '
          + 'suunnitellaan ennen tekemistä: mitä siellä on, mitä '
          + 'kannattaa nostaa esiin — ja toteutetaan siinä '
          + 'laajuudessa kuin tarve on.',
        'Pyhät kaupungit: oma sivutyyppi, johdannot kirjoittaa '
          + 'Fable.',
        'PITKÄT ARTIKKELIT (idea): professorimaisia syväjuttuja, '
          + 'luettavia ja kuunneltavia; pöllö ehdottaa linkkeinä.',
        'KAUPALLISTAMINEN: julkaistaan ilmaisena; maksulliseksi '
          + 'vaihdettaessa aiemmat lataajat säilyttävät ilmaiseksi '
          + '(App Storen hinnanvaihto, ei StoreKit-koodia). Pöllö '
          + 'ensisijaisesti ilmaiseksi Applen laitemallilla — suomen '
          + 'laatu testataan ensin.',
        'OIKEUDET JA TEKIJYYS (omistaja 27.8.2026, AVEK-haku): pelin '
          + 'oikeudet ovat Visuaaliviestinnän Instituutti Tampere '
          + 'Oy:llä. Julkisissa teksteissä tekijä on VVI, ei '
          + 'yksityishenkilö, eikä sanaa harrastusprojekti käytetä. '
          + 'Peli pysyy toistaiseksi ilmaisena.',
        'KÄÄNNÖKSET: vasta kun suomi on lukittu; ensin englanti. '
          + 'Kielikohtaiset sisältöpaketit, ei rivi-i18n:ää.',
      ],
    },
    {
      otsikko: 'Äänet ja luennat',
      tila: 'luonnos',
      kohdat: [
        'Viisas Kertoja lukee saapumiset, kohtaamiset ja '
          + 'aarretekstit. Luenta = teksti sanasta sanaan; arvottavia '
          + 'pulmia ei lueta.',
        'LUENTAPOLITIIKKA (omistaja 18.8.2026): lukija lukee VAIN '
          + 'varsinaiset leipätekstit ja niiden otsikot. Taulukot, '
          + 'kainalorivit, nostolistat, kuvatekstit, lähderivit, '
          + 'opasteet ja napit jäävät aina lukematta; otsikko luetaan '
          + 'vain jos sen alta löytyy leipätekstiä. Valinta tehdään '
          + 'VALKOLISTANA (uusi taittolaji on oletuksena hiljainen; '
          + 'luentaan pääsee merkitsemällä data-lukija="leipa") — '
          + 'ohituslista vaatisi muistamista joka taittolajista ja '
          + 'unohdus vuotaisi ääneen, valkolistan virhe kuuluu heti.',
        'LUKIJAN PYSYVÄ KAHVA (omistaja 18.8.2026, tarkennettu samana '
          + 'iltana): luennan kahva on sivun tarttuvan otsikkorivin '
          + 'kaiutin — lehdissä ja Matkailijan oppaassa rivi pysyy '
          + 'näkyvissä vieritettäessä, kaiutin sen oikeassa reunassa '
          + 'korkeussuunnassa keskitettynä. Se avaa säätöpaneelin myös '
          + 'kesken luennan; erillistä kelluvaa kaiutinta ei ole '
          + '(v868:n kelluva kahva poistettu — kaksi kaiutinta samassa '
          + 'kulmassa).',
        'LUENTAPOLKU: äänite soi kun luenta-kenttä vastaa '
          + 'näyttötekstiä; muuttunut teksti striimataan. '
          + 'Matkakirjaluennat generoidaan maittain kaanonin '
          + 'valmistuessa (ElevenLabs, Viisas Kertoja, tunnetagit; '
          + 'tools/generoi-luennat.mjs) — 25.8.2026 mennessä kuusi '
          + 'fokusmaata ja avaustekstit. Vanha "kaikki kerralla '
          + 'lopussa" -varaus on kumottu.',
        'Lisäksi tehosteet, mietintämusiikki, äänimaisemat ja '
          + 'musiikkinäytteet. Uudet taustaäänet LUFS-mitataan heti '
          + '(testi valvoo).',
        'ÄÄNTEN JAKELU (linjaus 16.8.2026): audiotiedostot jaellaan '
          + 'R2:sta kuten kuvatkin, eivät gitistä. Esiladataan vain '
          + 'pieni ydinsetti (huudahdukset, käyttöliittymä-äänet); '
          + 'luennat, taustaäänet ja musiikki haetaan ja '
          + 'välimuistitetaan tarvepohjaisesti.',
      ],
    },
    {
      otsikko: 'Kuvat ja lähteet',
      tila: 'luonnos',
      kohdat: [
        'KUVAGENEROINNIN TYÖNJAKO (omistaja 26.8.2026 ilta: "Saat '
          + 'generoida aina kaiken muun apin kautta paitsi '
          + 'herokuvat" — laajentaa saman päivän pyydettäessä-'
          + 'linjauksen vakioluvaksi): KAIKKI MUU kuvagenerointi '
          + '(karttasymbolit, aarrekuvat, kohtaamiskuvat, varusteet, '
          + 'avatarit, miniatyyrit) saa kulkea API-työnkulkujen '
          + 'kautta ilman erillistä kysymistä — avaimet VAIN repon '
          + 'secreteissä (OPENAI_API_KEY, GOOGLE_API_KEY), reitit '
          + '.github/workflows/generoi-*.yml (dispatch, kuvat '
          + 'artifaktina tai työhaarana). VAIN HEROKUVAT ja '
          + 'julisteet omistaja generoi itse ChatGPT:n '
          + 'käyttöliittymässä (STEP 1-3 -resepti) — niitä ei tehdä '
          + 'API:lla ilman omistajan erillistä pyyntöä. '
          + 'KUVAMALLI (omistaja 27.8.2026): OpenAI:n kuvissa '
          + 'käytetään AINA uusinta mallia — nyt gpt-image-2 '
          + '(vertailussa selvästi valokuvamaisempi kuin '
          + 'gpt-image-1); kun uudempi julkaistaan, vaihdetaan '
          + 'siihen vertailukokeen kautta. Työnkulkujen oletusmalli '
          + 'pidetään tässä linjassa.',
        'HEROKUVIEN HYBRIDIMALLI (omistaja 25.8.2026, korvaa 24.8. '
          + 'tauon API-massa-ajojen osalta): omistaja generoi '
          + 'herokuvat ChatGPT Plus -käyttöliittymässä Fablen '
          + 'promptiarkeilla (VAKIO-resepti tools/hero-kuvakulmat.'
          + 'mjs; arkin mukana 2–3 Commons-valokuvaa viitteeksi), '
          + 'ja API:a käytetään vain täsmäajoihin — kiinteä '
          + 'kuukausihinta voittaa kuvakohtaisen API-hinnan '
          + '(~0,17–0,25 $/kuva). Kuvat toimitetaan Fablelle, joka '
          + 'vie ne ämpäriin. Viitteettömiä yleisnäkymiä ei '
          + 'generoida (kierrosten 22–25 oppi: ne keksivät '
          + 'maamerkkejä).',
        'Kaikki kuvat PD/CC (Commons, Finna, LoC, Flickr — lisenssi '
          + 'aina rajapinnasta), silmin tarkistettuina; tekijä ja '
          + 'lisenssi näkyvissä.',
        'ELÄINKOHTEEN KUVA NÄYTTÄÄ ITSE ELÄIMEN (omistaja 26.8.2026 '
          + 'ilta: "Pitäisi saada kuva itse eläimestä aina jos on '
          + 'söpöysmerkki"): eläinkategorian (pöllönpoikas-symboli) '
          + 'kohteen kuvassa on eläin lähikuvassa, ei maisemaa. Jos '
          + 'paikan omat otokset ovat kaukaisia läiskiä, kuva saa '
          + 'olla lajista muualta — selite kertoo paikan '
          + 'rehellisesti. LAAJENNUS (omistaja samana iltana: "Söpö '
          + 'kohteissa voisi olla useampikin kuva jos vain löytyy. '
          + 'Myös live kamerat hyviä jos löytyy"): eläinkohde saa '
          + 'USEAMMAN kuvan kun hyviä löytyy, ja LIVEKAMERAN '
          + 'kierros-mekanismilla (pelin sisäinen selainikkuna + '
          + 'Avaa selaimessa -linkki) — vain virallisia, upotuksen '
          + 'sallivia lähteitä, ja toimivuus tarkistetaan ennen '
          + 'julkaisua.',
        'Etusivukuvien kaava (omistaja 16.8.2026): kuva-aiheet '
          + 'speksataan kaupunkikohtaisesti ENNEN hakua '
          + '(docs/kuvakasikirjoitukset.md). Pääkuva = tärkein kohde '
          + 'näyttävänä laajakulmana erikoisvalossa (karuselliin voi '
          + 'lisätä muita näyttäviä); pikkunosto 1 = toiseksi tärkein '
          + 'kohde; pikkunosto 2 = yllättävä, oivaltava yksityiskohta. '
          + 'Pikkunostoihin ei karusellia ja vain vaakarajauksen '
          + 'kestäviä kuvia. Haut Commonsin FP/QI- ja '
          + 'valokategorioista.',
        'OPPAAN AVAUSKUVA (linjaus 17.8.2026): aina kolmen kuvan '
          + 'karuselli, ja kuvat valitaan JAKSON TEKSTIN mukaan eikä '
          + 'kaupungin yleisistä maamerkeistä — jos teksti mainitsee '
          + 'emalikyltin, se myös näkyy. Karuselli on sisältöä, ei '
          + 'koriste.',
        'MATKAILIJALLE-KUVAN KAAVA (omistaja 16.8.2026): osion kuva '
          + 'on sen myyntikuva — yksi aihe joka täyttää ruudun, '
          + 'paikan oma erikoisuus ("wow-efekti"), FP/QI jos on, '
          + 'selkeä valo, lukee pienessä koossa ja pääaihe ei jää '
          + 'diagonaalinauhan alle.',
        'KAIKKI SISÄLTÖ ÄMPÄRISTÄ (omistaja 18.8.2026): pelin '
          + 'lataama media tarjoillaan aina omasta peilistä (R2), '
          + 'alkuperäisosoite on vain varareitti. Uusi kuva- tai '
          + 'äänilähde saa tulla peliin vasta kun peilausputki '
          + '(tools/peilaa-media.mjs) kattaa sen osoitteet. Repon '
          + 'mukana kulkevat tiedostot (esim. miniatyyrit, liput) '
          + 'ovat osa sovellusta eivätkä tarvitse peiliä.',
        'VALOKUVAKOPIOT EIVÄT MENE REPOON (omistaja 19.8.2026: '
          + '"pitäisi mennä pelkästään ämpäriin"): haetut valokuvat '
          + '(Flickr-kopiot, Commons-peilaukset ja assets/valokuvat-'
          + 'kansion uusi aineisto) tallennetaan ämpäriin, josta peli '
          + 'hakee ne — service worker välimuistittaa, joten kerran '
          + 'nähty toimii offline. Itse generoidut kartat ja '
          + 'sovelluksen omat assetit pysyvät repossa. Git-historian '
          + 'purku on erillinen kertatyö (tehtävä #57). Kunnes '
          + 'valokuvien peilausputki on rakennettu, Flickr-kuva saa '
          + 'vielä paikallisen kopion — laatu voittaa repon painon '
          + '(omistaja 19.8.2026).',
        'KUVAKOPIOT ÄMPÄRIIN, EI REPOON (omistaja 19.8.2026): '
          + 'paikalliset valokuvakopiot (Flickr-reitti, Commons-'
          + 'peilaukset, assets/valokuvat) kuuluvat R2:een eivätkä '
          + 'repoon; service worker välimuistittaa ne verkosta, joten '
          + 'kerran nähty toimii offline. Kunnes latausputki on '
          + 'rakennettu, uudet kopiot saavat väliaikaisesti mennä '
          + 'repoon — laatu voittaa repon painon ("käytä Flickriä '
          + 'jos siellä on parempia kuvia") — ja ne siirretään '
          + 'ämpäriin kerralla putken valmistuttua. Itse generoidut '
          + 'kartat ja sovelluksen osat (miniatyyrit, liput, '
          + 'kohdekartat) pysyvät repossa; git-historian purku on '
          + 'erillinen kertapäätös (työjonossa).',
        'KAIKKI UUSI MEDIA ÄMPÄRIIN, EI REPOON (omistaja 21.8.2026: '
          + '"Kaikki aina ämpäriin eikä repoon"): tästä eteenpäin '
          + 'KAIKKI uusi media — myös itse generoitu (julisteet, '
          + 'äänitallenteet, tulevat kuvasarjat) — viedään R2-'
          + 'ämpäriin, josta peli hakee sen PEILI_JUUREN kautta; '
          + 'repoon ei lisätä uusia mediatiedostoja. Tämä tiukentaa '
          + '19.8. linjausta: myös generoitu aineisto kuuluu '
          + 'ämpäriin, ALKUPERÄISESSÄ LAADUSSA (omistaja 21.8.2026: '
          + 'julisteita ei pakata pienemmiksi — ämpärissä koko ei '
          + 'ole ongelma). Olemassaolevat repossa asuvat assetit '
          + '(kohdekartat, miniatyyrit, liput) siirretään ämpäriin '
          + 'hiljaisena hetkenä (omistaja 21.8.2026: "siirrä kaikki '
          + 'ämpäriin kun tulee hiljainen hetki") — kertatyö, joka '
          + 'vaatii R2_ACCOUNT_ID- ja R2_BUCKET-arvot ympäristöön '
          + 'sekä latauspolkujen muutoksen ja git-historian purun '
          + 'harkinnan.',
        'Miniatyyripiirrokset generoidaan yhdellä otolla per kohde '
          + '(kustannuslinjaus 16.8.2026).',
        'MATKAOPAS ON NYKYTIETOA (omistaja 20.8.2026): '
          + 'Matkailijalle-osion ja matkaoppaan kuvat ovat TUOREITA '
          + 'kuvia — historialliset kuvat kuuluvat historia- ja '
          + 'nosto-osioihin. Matkailijalle-etusivukuva on AINA PYSTY '
          + '(omistaja 20.8.2026: "Matkaoppaan kuva etusivulla pitää '
          + 'olla pysty") — mutta MALTILLINEN pysty, ei ääripitkää '
          + 'tornikuvaa joka venyttää palstan (Mosul-tapaus). '
          + 'Opas sanoo SUORAAN, jos '
          + 'matkustaminen kohteeseen on nykyisin vaarallista tai '
          + 'rajoitettua — asiallisesti ja lyhyesti, ilman '
          + 'pelottelua; pelaajaa ei jätetä kuvittelemaan että kohde '
          + 'on tavallinen lomakohde jos se ei ole.',
        'KANSIKARUSELLI ON KOLME LAAJAA YLEISKUVAA (omistaja '
          + '21.8.2026: "kolme kuvaa pitäisi olla ennemmin laajoja '
          + 'yleiskuvia kaupungin eri puolilta tunnetuimmista '
          + 'kohdista. ei saisi olla ollenkaan yksityiskohtakuvaa '
          + 'näissä"): kaupunkilehden etusivun ensimmäisen '
          + 'kuvakarusellin kolme kansikuvaa ovat laajoja näkymiä — '
          + 'siluetteja, aukioita, rantoja, maamerkki ympäristössään '
          + '— kaupungin ERI puolilta. Lähikuvat, sisäkuvat, '
          + 'reliefit, ruoka ja esineet kuuluvat nostoihin ja '
          + 'jaksoihin, eivät kanteen. Koskee myös vanhoja lehtiä: '
          + 'yksityiskohtakuvat vaihdetaan laajoihin.',
        'TUHOUTUNEEN KAUPUNGIN NYKYKUVAT (omistaja 20.8.2026): '
          + 'sodassa tai katastrofissa vaurioituneesta kaupungista '
          + 'näytetään MYÖS tuoreita kuvia, vaikka niissä näkyy '
          + 'vaurioita tai jälleenrakennusta — ja lehti kertoo '
          + 'lukijalle selkeästi, mistä kaupungin nykyilme johtuu, '
          + 'ettei pelaaja jää ihmettelemään miksi kuvat ovat '
          + 'vanhoja. Tuho kerrotaan tapahtumana neutraalisti, ilman '
          + 'julmuuksien yksityiskohtia ja ilman osapuolikehystä; '
          + 'kuvateksti sanoo mitä kuvassa näkyy. Edelleen EI '
          + 'taistelukuvia eikä uhreja. Korvaa aiemman "kuvat eivät '
          + 'saa näyttää tuhoja" -käytännön.',
        'TEKSTIEN PAINOPISTE (omistaja 20.8.2026: "Kuvatekstit '
          + 'liian pitkiä ja leipäteksti liian lyhyt"): lehden '
          + 'ETUSIVUN LEIPÄTEKSTI — se on ARTIKKELIT-paketin '
          + 'intro-kenttä, EI kulttuuri-kategorioiden johdanto — on '
          + '7–10 virkkeen johdatus: millainen kaupunki on, mikä sen '
          + 'merkitys ja historia; kaikki oleellinen alkuun. Sivujen '
          + 'johdanto-kentät pysyvät lyhyinä (1–2 virkettä). '
          + 'KUVATEKSTI on YKSI virke (omistajan tarkennus '
          + '20.8.2026). Etusivun leipäteksti latoutuu kahdelle '
          + 'palstalle leveällä näytöllä. '
          + 'Kohdekartan esittelyteksti lyhyeksi: kartan kuvailu ei '
          + 'ole oleellista tietoa. Korvaa vanhat mitat (johdanto '
          + '154–232 mrk); vanhat lehdet kirjoitetaan uusiksi tähän '
          + 'asuun erissä.',
        'KUVATEKSTI KERTOO KOHTEESTA, EI KUVASTA (omistaja '
          + '22.8.2026: "Kuvatekstit pitää kertoa rakennuksesta, sen '
          + 'historiasta ja merkityksestä ei kuvailla kuvaa '
          + 'visuaalisesti. Tämä koskee kaikkia kuvatekstejä"): '
          + 'kuvateksti kertoo mitä kuvattu rakennus tai paikka ON — '
          + 'historian, merkityksen tai kiinnostavan faktan — eikä '
          + 'luettele mitä kuvassa näkyy (valoa, värejä, '
          + 'sommittelua, "vasemmalla kohoaa..."). Visuaalinen '
          + 'kuvailu sallitaan vain kun se itse on asia, kuten '
          + 'tuhoutuneen kaupungin nykytila (ks. TUHOUTUNEEN '
          + 'KAUPUNGIN NYKYKUVAT). Yksivirkesääntö pysyy (TEKSTIEN '
          + 'PAINOPISTE). Koskee KAIKKIA kuvatekstejä; vanhat '
          + 'kuvailevat selitteet kirjoitetaan uusiksi erissä.',
        'Faktat tarkistetaan, lähteet merkitään. API-avaimia ei '
          + 'koskaan repoon eikä lokiin.',
        'SALAISUUDET (omistaja 26.8.2026): POLLO_KEHITTAJAKOODI ja '
          + 'EHDOTUS_AVAIN elävät VAIN GitHubin repo-secreteissä — '
          + 'niitä ei pyydetä keskusteluun, ei talleteta tiedostoihin '
          + 'eikä kirjoiteta lokiin. Täysi pöllösavuke ajetaan '
          + 'julkaisuporttina Actions-työnkululla '
          + '(.github/workflows/savuke-pollo.yml, workflow_dispatch), '
          + 'joka saa arvot secreteistä; paikallinen savuke ajaa '
          + 'ilman koodeja osittaisena.',
      ],
    },
    {
      otsikko: 'Lukijoiden ehdotukset',
      tila: 'luonnos',
      kohdat: [
        'KANAVA (omistajan tilaus 18.8.2026): palautelomake laajenee '
          + 'niin, että pelaaja voi lähettää kuvia ja juttuideoita '
          + 'lehtiin. Lähetykset ladataan ämpäriin ja ne näkyvät '
          + 'AUTOMAATTISESTI omistajalle työhuoneen uudella '
          + 'Lukijoilta-lehdellä (hampurilaisvalikko) — Fablen '
          + 'esikuratointi kommentteineen ajetaan vain omistajan '
          + 'komennolla "kuratoi", eikä mikään julkaisu tapahdu ilman '
          + 'omistajan arviota.',
        'PRO-TUOTTAJAT (omistaja 18.8.2026): kanava vain omistajan '
          + 'henkilökohtaisesti kutsumille ammattilaisille. Omistaja '
          + 'myöntää pysyvän koodin työhuoneesta; vastineeksi '
          + 'sisällöstä tuottaja saa krediitin ja tekijäsivun (oma '
          + 'kuva, esittely, linkit). Kolme sääntöä: (1) mikään ei '
          + 'näy pelaajalle ennen omistajan hyväksyntää ja muutos '
          + 'palaa jonoon, (2) sähköposti ja koodi eivät koskaan '
          + 'vuoda julkiseen vastaukseen eivätkä lokiin, (3) lupa '
          + 'aina lupapohjalla (rinnakkainen ei-yksinomainen '
          + 'lisenssi, peruutus koskee uusia julkaisuja).',
        'Lomake ehdottaa automaattisesti sitä sivua, jolla pelaaja on; '
          + 'vapaa tarkennuskenttä on vapaaehtoinen. Pelaaja voi antaa '
          + 'nimen tai nimimerkin pelin kredititteihin ja sähköpostin, '
          + 'jos haluaa viestin kun kuratointi on valmis — molemmat '
          + 'vapaaehtoisia, ja sähköposti jää vain omistajan nähville '
          + '(ei koskaan repoon eikä peliin).',
        'Pöllö opastaa kanavan käyttöön ja saa joskus ehdottaa '
          + 'minipuhekuplassa osallistumista ("haluatko osallistua '
          + 'pelin rakentamiseen?").',
        'Lähetetyt kuvat eivät ole pelisisältöä ennen kuin omistaja on '
          + 'hyväksynyt ne ja lisenssi on varmistettu — lomake pyytää '
          + 'vakuutuksen, että kuva on lähettäjän oma ja saa julkaista '
          + '(CC BY -henkisesti); ilman sitä kuvaa ei oteta lehteen.',
        'PALKKIO (omistaja 18.8.2026): kuratoinnin läpäissyt ehdotus '
          + 'palkitaan pelirahalla. Omistaja määrittelee summan aluksi '
          + 'itse ehdotuksen laadun mukaan. Palkkio toimitetaan '
          + 'lunastuskoodilla, jonka pelaaja syöttää peliin (pelissä '
          + 'ei ole tilejä, joten koodi on ainoa reitti oikealle '
          + 'pelaajalle).',
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
        'EDITORIN KAUNEIN IDEA (omistajan visio 26.8.2026): kuka '
          + 'tahansa voi tuottaa peliin näkyville asioita, jotka hän '
          + 'kokee mielenkiintoisiksi ja merkityksellisiksi, mistä '
          + 'päin maailmaa tahansa.',
        'KOLME NÄKYVYYSTASOA: vain itselle → oma yhteisö → kaikille '
          + 'pelaajille, kun sisältö täyttää pelin fakta- ja '
          + 'laatukriteerit.',
        'KURATOINTI: AI kokoaa ehdotetuista muutoksista tiiviin '
          + 'tietopaketin, mutta RATKAISUT TEKEE AINA IHMINEN.',
        'Nykyinen Lukijoilta-kanava ja pro-tuottajat (osio '
          + '"Lukijoiden ehdotukset") ovat tämän ensimmäinen vaihe.',
      ],
    },
    {
      otsikko: 'Talous ja palkkiot',
      tila: 'luonnos',
      kohdat: [
        'TULOT: paikallisaarteet, mantereen 1000 p, pääaarre 2000 p, '
          + 'oikeat vastaukset.',
        'MENOT: laiva ja lento · mannerraja 1000 p · varusteet '
          + '~1000 p · visavihje ja 50:50.',
        'Kokemuspisteet ovat pelaajalle TIETÄJÄPISTEITÄ (tp; '
          + 'omistaja 18.8.2026). Ne nostavat kymmentä tietäjätasoa '
          + '(Untuvikko 0 tp → Tietäjä iänikuinen 8000 tp, '
          + 'js/tietajatasot.js; rajat korotettu 18.8.2026 — '
          + 'omistaja: tasot tulivat aivan liian helposti, ylimmän '
          + 'tason kuuluu vaatia kymmeniä pelipäiviä) '
          + 'ja kysymysten vaikeutta. Tasonnousu ei anna muuta kuin '
          + 'nimikkeen; pöllö onnittelee minipuhekuplalla. Nimikkeet '
          + 'ja rajat ovat päätoimittajan sisältöpäätös.',
        'Varusteet ovat linssejä; ostetaan kaupasta. Superlinssi '
          + 'vain ansaitsemalla.',
        'KAKSI VIHJETTÄ: visavihje = ostettava apu visassa; '
          + 'aarrevihje = tekstin sivuhuomio, ei mekaniikkaa.',
      ],
    },
    {
      otsikko: 'Rajaukset ja turvalinjat',
      tila: 'luonnos',
      kohdat: [
        'Ei nykysotasisältöä: Venäjä, Ukraina ja Syyria '
          + 'kulttuurikohteina. HISTORIALLISET taistelut saa näyttää '
          + '— ne ovat perushistoriaa.',
        'Mekka ja Medina vain omistajan erillisellä päätöksellä, '
          + 'kunnioittavasti.',
        'Venäjän kaupungit ja Kabul mukana, mutta ilman '
          + 'uutisosiota (omistaja 13.8.2026).',
        'Grimshaw ei ole koskaan vaarallinen. Kukaan ei iva '
          + 'paikallisia — koskee myös kohtaamishahmoja.',
      ],
    },
    {
      otsikko: 'Sanasto',
      tila: 'luonnos',
      kohdat: [
        'unohdettu aarre = Aarnin luettelon manneraarre · '
          + 'paikallisaarre = maan oma pieni/iso aarre · laatta = '
          + 'käännettävä kätkö · tutki kätkö -pelit = Etsi kätkö '
          + '-napin tehtävät · kohtaaminen = kaupungin henkilö '
          + 'kysymyksineen · hiljaisen tiedon arkku = kohtaamisten '
          + 'kehys · valokuvapulma = vaihtoehdot oikeita valokuvia · '
          + 'mannerraja / mannerlento = eteneminen mantereelta '
          + 'toiselle · varustekauppa = valikon Käy kaupassa · '
          + 'superlinssi = alle 80 päivän palkinto · visavihje / '
          + 'aarrevihje = ks. Talous · johtolause = isoisän äänen '
          + 'esittelytapa · lehtikaupunki / maalehti = luettava '
          + 'lehti · työhuone = kehittäjävivun takaiset lehdet '
          + 'pelissä · fokuslehti = maan esirenderöity karttakuva · '
          + 'atlas = kaikkien valmiiden maiden lehdet kartalla · '
          + 'täky / täkynosto = uteliaisuuskoukku ja sen '
          + 'klikkiotsikkokupla · sähke / retkikunta = rakenteinen '
          + 'moninpeliviestintä · kaveriapu = retkikunnan veikkaus '
          + 'aarrekysymykseen (25 p) · turvatila = kaatumissilmukan '
          + 'itsekorjaus (lehdet pois tunniksi).',
      ],
    },
    {
      otsikko: 'Moduulit',
      tila: 'linjaus 17.8.2026 (remontin M1–M6, suunnitelman luku 3)',
      kohdat: [
        'Kaksitoista moduulia, kullakin yksi vastuu. Tekninen '
          + 'sisältö (tiedostolistat, siirtomallit) ei kuulu tähän '
          + 'vaan moduuliohjeisiin (docs/moduulit/) ja '
          + 'suunnitelmaan.',
        'Ydin = pelitila ja säännöt · Kartta = laudan piirto ja '
          + 'kamera · Linssit = karttakerrokset sopimuksineen · '
          + 'Tarinakaari = saapumiset, kohtaamiset, aarteet · '
          + 'Kätköpelit = visa, pulmat, tiimalasi (js/visa.js).',
        'Kaupunkilehti = lehden taitto ja sivupino (js/lehti.js) · '
          + 'Maalehti ja liput (js/maalehti.js, js/liput.js) · '
          + 'Matkailijan opas (js/opas.js) · Nähtävyydet ja '
          + 'kohdekartta (js/nahtavyydet.js).',
        'Äänet ja lukija = kaikki kuuluva: tehosteet, kertojaluennat '
          + '(js/luenta.js), laiteääni · Viisas Pöllö = chat-apuri · '
          + 'Alusta = käynnistys, tallennus, jakelu ja työhuone.',
        'RAJAPINTASÄÄNNÖT: datapaketit eivät tuo mitään — ne ovat '
          + 'lehtiä puussa.',
        'Pinnat tuovat toisiaan vain kirjatusti ja yksisuuntaisesti '
          + '(opas → nähtävyydet, lehti → maalehti, visa → luenta); '
          + 'kehäriski kierretään ui-delegaattorilla.',
        'Ydin ei tunne pintoja; pinnat kutsuvat Ydintä vain '
          + 'run/doAction-portin kautta.',
        'Laiska raja (dynaaminen tuonti), kun moduuli ei kuulu yhden '
          + 'tiedoston versioon (linssit, maakäyrät).',
      ],
    },
    {
      otsikko: 'Jakelu ja iOS-kuori',
      tila: 'kirjattu 25.8.2026 (omistajan huomautuksesta — tämä puuttui)',
      kohdat: [
        'PELIÄ PELATAAN ENSISIJAISESTI TESTFLIGHTIN KAUTTA: '
          + 'iOS-kuorisovellus (WKWebView) lataa pelin Pagesista '
          + '(ravelius.github.io/Matkakirja). Kuoren lähdekoodi ON '
          + 'TÄSSÄ REPOSSA kansiossa ios/ (SwiftUI + PeliSelain.swift '
          + '+ sillat + widget + fastlane; ks. ios/OHJE.md) — Claude '
          + 'on rakentanut sen aiemmissa sessioissa. Pelin puoleiset '
          + 'kytkennät ovat js/natiivi.js (silta '
          + 'window.matkakirjaNatiivi: iCloud-synkka, widget, Game '
          + 'Center, luentasilta js/lukija.js, haptiikka). Selain '
          + 'ilman kuorta on aina tuettu varapolku. HUOM: kuoren '
          + 'muutokset päätyvät laitteille vasta omistajan uudesta '
          + 'TestFlight-buildista — web-muutokset heti Pagesista.',
        'WKWEBVIEW ON AHTAAMPI KUIN SAFARI: sisältöprosessin '
          + 'muistikatto on tiukempi ja ylitys tappaa prosessin '
          + 'ilman virhettä — kuori lataa sivun uudelleen, mikä '
          + 'näkyy pelaajalle aloituslogosilmukkana. Muistipiikit '
          + '(isojen kuvien purku, rasterointi) on mitoitettava '
          + 'kuoren mukaan, ei pöytäselaimen. Vikaraportit, joissa '
          + '"peli jää logoruutuun", ovat ensisijaisesti '
          + 'muistikuolemia kuoressa.',
        'TURVATILA (v1112–v1113): kolme käynnistystä neljän '
          + 'minuutin sisään kytkee fokuslehdet ja atlaksen pois '
          + 'tunniksi, jolloin kaatumissilmukka purkautuu itsestään '
          + '(js/main.js kirjaaKaynnistys, js/fokuskartta.js '
          + 'atlasTurvatila).',
        'HÄTÄKEINO pelaajalle: TestFlight-sovelluksen poisto ja '
          + 'uudelleenasennus nollaa kuoren välimuistin ja '
          + 'paikallisen tallenteen (iCloud-synkka voi palauttaa '
          + 'pelin).',
      ],
    },
    {
      otsikko: 'Poistetut ideat',
      tila: 'toimintatapa kirjattu 17.8.2026',
      kohdat: [
        'TOIMINTATAPA (omistaja 17.8.2026): pelistä poistettu idea '
          + 'ei jää varsinaisiin osioihin selityksineen — kohta '
          + 'poistetaan ja idea kirjataan tähän yhdellä rivillä. '
          + 'Raamattu pidetään mahdollisimman lyhyenä ja tiiviinä.',
        '— Matkakassa-osio oppaassa (17.8.2026); hintataso kerrotaan '
          + 'sivun alun kainalotaulussa plussana/miinuksena.',
        '— Offline-pelaus tavoitteena (16.8.2026); verkkoyhteyden '
          + 'saa olettaa, välimuisti on nopeutta varten.',
        '— Rosvo-, tyhjä- ja hevosenkenkälaatat; laatan alta löytyy '
          + 'aina aarre (poistettu pelistä v1109, 25.8.2026).',
        '— Erillinen vihjejärjestelmä; aarrevihjeet ovat tekstien '
          + 'sivuhuomioita.',
        '— Jalokivi- ja linssilaatat (25.8.2026); tilalla pieni ja '
          + 'iso paikallisaarre, linssit kauppaan.',
        '— Kiinteä ruutukoko kartan merkeillä (25.8.2026); merkit '
          + 'elävät kartan mittakaavassa.',
        '— LUENTA-liukukytkin puhekuplan alla (25.8.2026); '
          + 'kaiutinkuvake on kytkin.',
        '— Kehittäjän värilaattakoodit kartalla (25.8.2026); '
          + 'valmiusvärit vain Tilastot-taulussa.',
        '— Täkynoston alalaidan liuska (25.8.2026); nosto on '
          + 'puhekupla tapahtuman kohdalla.',
        '— Etusivun kirjakuva toistaiseksi (omistaja 25.8.2026); '
          + 'palataan kuvaan myöhemmin.',
      ],
    },
    {
      otsikko: 'Ohjedokumenttien kartta',
      tila: 'luonnos (omistajan tilaus 15.8.2026)',
      kohdat: [
        'Tieto kulkee sessiolta toiselle vain kirjoitettuna. Kartta '
          + 'on täydellinen: dokumentti, jota ei ole listalla, ei ole '
          + 'ohje. Testi valvoo (tests/dokumentit.test.mjs).',
        'SIIRTOPROMPTIT (omistaja 19.8.2026): kun sessio kirjoittaa '
          + 'omistajalle promptin toiselle sessiolle vietäväksi, se '
          + 'annetaan vastauksessa AINA yhtenä koodilohkona, jotta '
          + 'omistajan ympäristöön tulee kopioi-nappi — ei koskaan '
          + 'juoksevana tekstinä tai vaakaviivoin rajattuna.',
        'CLAUDE.md — sisääntulo, osoittaa tänne.',
        'docs/tarina.md + docs/isoisan-raamattu.md — tarinan kaanon '
          + '(vain Fable kirjoittaa).',
        'docs/roolitus.md — työnjako, viestintä, julkaisusäännöt, '
          + 'pistokokeet.',
        'docs/moduulit/linssit.md · docs/moduulit/kaupunkilehti.md · '
          + 'docs/moduulit/maalehti.md · docs/tyolista-opukselle.md · '
          + 'docs/moduulit/tarinakaari.md '
          + '· docs/mantereen-resepti.md · '
          + 'docs/kuvakasikirjoitukset.md — sisältöreseptit ja '
          + 'työlistat.',
        'docs/moduulit/lukijoilta.md — lukijoiden ehdotukset: worker, '
          + 'lomake, Lukijoilta-lehti ja kuratointi.',
        'docs/moduulit/viitekuvat.md — viitekuvallinen herogenerointi: '
          + 'kohde tunnistetaan sen omasta Commons-kategoriasta, '
          + 'generointi ankkuroidaan 2–4 vapaasti lisensoituun '
          + 'nykyvalokuvaan, ja generointiportti estää kuvan syntymisen '
          + 'jos viitteitä on alle kaksi tai tunnistus jää epävarmaksi.',
        'docs/pro-lisenssilupa.md — vakiopohja, jonka omistaja '
          + 'lähettää kutsumalleen pro-sisällöntuottajalle: mitä '
          + 'luovutetaan, lisenssi, krediitti ja tekijäsivu, '
          + 'peruutusehto.',
        'CONTRIBUTING.md — avoin lähdekoodi + tekniset periaatteet. '
          + 'README.md — esittely.',
        'docs/viesti-fable.md — viestikanava, ei ohje. docs/arkisto/ '
          + 'ja docs/raportit/ — ei ohjeita; vanhentunut tilannekuva '
          + 'arkistoidaan heti.',
        'TYÖSESSIOIDEN SPEKSIOPPI (omistajan havainto 16.8.2026): '
          + 'tarkasti rajattu toimeksianto tuottaa Opukselta '
          + 'erinomaista jälkeä; väljä rajaus johtaa turhien asioiden '
          + 'toteuttamiseen. Jokaiseen pakettiin: täsmälliset '
          + 'tiedostot, mitä EI tehdä, ja valmis malli.',
        'TOTEUTETTU 17.8.2026: dokumenttiremontti (D1–D7) ja '
          + 'moduulijako (M1–M6) ajettiin Max-sessiossa, Fable '
          + 'katselmoi ja mergasi. Raamattu on ainoa linjauslähde; '
          + 'moduuliohjeet docs/moduulit/-kansiossa. Lehtitila-olio '
          + 'ja savukevartija tehty 17.8.2026. M7+ (Kartta-luokka '
          + 'animaatiolinssialustaksi) hyväksytty 17.8.2026, työn '
          + 'alla vaiheina M7a–M7f. '
          + 'Max-työlista arkistoitu (docs/arkisto/).',
        'docs/moduulirakenne-suunnitelma.md — moduulijaon '
          + 'suunnitelma (M1–M6 toteutettu, M7+ hyväksytty ja työn '
          + 'alla; dokumenttiremontin suunnitelma arkistoitu '
          + '17.8.2026).',
        'docs/tuotantosuunnitelma.md — jäljellä olevien kaupunkien '
          + 'ja maiden tuotantosuunnitelma (Fablemax 17.8.2026; '
          + 'EHDOTUS, odottaa omistajan hyväksyntää).',
        'Työkalujen alkukommentit ovat käyttöohjeita. Sääntö, jonka '
          + 'kone voi valvoa, kirjataan testiksi.',
        'Työhuone integroidaan peliin kehittäjävivun taakse — ei '
          + 'erillisiä näkymiä.',
      ],
    },
  ],
};
