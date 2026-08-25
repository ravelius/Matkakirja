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
        'ALKUKOHTAUS V5 (omistajan teksti 25.8.2026, sanasta '
          + 'sanaan pelissä): paikkarivi "Heathrow, Lontoo, '
          + '<kuukausi vuosi>:" naputetaan kirjoituskoneella ilman '
          + 'luentaa; sitten kertoja: "Vintiltä löytyi isoisän '
          + 'matkalaukku ja kulunut matkakirja. Juoksen sisälle '
          + 'terminaaliin ja olen varma, että ukko oli löytänyt '
          + 'jotain. Mutta kuka on repinyt kirjasta viimeisen '
          + 'sivun?"; klikattava lause "Mistä aloitan?" (ei lueta).',
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
      tila: 'luonnos — rakennetaan, pilotti Kreikka',
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
          + 'pitkin Lontoosta kohteeseen. Kartta on tällöin jo '
          + 'fokusmoodin tapaan niukka: maat, joissa ei ole käyty '
          + 'tai joissa pelaaja ei ole, himmeinä/sumennettuina. '
          + 'Koko näkymä uusitaan.',
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
          + 'TÄKYSYMBOLIT (omistaja 25.8.2026): kartalla on '
          + 'tekstikuplassa VAIN YKSI täkynosto kerrallaan, ja '
          + 'kupla ankkuroituu SIIHEN KOHTAAN KARTTAA, jota '
          + 'tapahtuma koskee (omistajan tarkennus 25.8.2026 — '
          + 'ei alalaidan liuskana); muut '
          + 'vastaavat täkykohteet merkitään yksinkertaisilla '
          + 'symboleilla — keltainen huutomerkki tms. skandaalille/'
          + 'uskomattomalle, ja SÖPÖILLE eläinkohteille PÖLLÖVAUVAN '
          + 'kuva; muitakin symboleita voidaan kehittää. Symbolit '
          + 'tehdään kartan henkeen ja samalla tyylillä '
          + '(seepiamuste, aikakauden karttamerkki). '
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
          + 'KREIKAN TÄKYNOSTOT VALITTU (omistaja 25.8.2026, '
          + 'tarkennettu samana aamuna): pooli on kartoituksen '
          + 'kolme kärkeä — 1) "Valokuva paljasti aarrevarkauden '
          + '— rouva poseerasi Troijan koruissa" (Sofia '
          + 'Schliemann, kuva jo pelissä), 2) "Sukeltaja nousi '
          + 'pintaan kauhuissaan: pohjalla makasi kasa ruumiita" '
          + '(Antikythera), 3) "Kokonainen kylä istui oraakkelin '
          + 'päällä — eikä lähtenyt ennen kuin maa järisi" '
          + '(Delfoi, fokuskohde on jo). Näytetään yksi '
          + 'kerrallaan; luetun tilalle nousee poolista seuraava. '
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
          + 'jonka kytkin on AINA puhekuplan alla painettavissa '
          + 'päälle ja pois. LEHDEN LUKIJA aloittaa aina joko '
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
          + 'luettaessa). Fokusmoodissa alhaalla vain Liiku- ja '
          + 'Tutki-napit (Tutki-napin tarve fokusmoodissa vielä '
          + 'auki). Fokusmoodin kytkin matkalaukun oikealla puolella '
          + 'VAIN kehittäjätilassa; lisäksi kehittäjätilaan '
          + 'sumennukset päälle/pois -nappi. Muille aina päällä.',
        'PILOTTI: Kreikka/Ateena. Nykyinen aarrekysymys säilyy '
          + 'pääkysymyksenä; lämmittelyt lehdistä, tarvittaessa '
          + 'uusia. Ateenalle uusi matkakirjapätkä (Fable) '
          + 'täkytutkimuksen jälkeen.',
      ],
    },
    {
      otsikko: 'Aarteet ja eteneminen',
      tila: 'luonnos',
      kohdat: [
        'Laatta joka kaupungissa; oikea vastaus paljastaa, alta löytyy '
          + 'AINA aarre.',
        'AARTEET: pieni paikallisaarre (~100–250 p) · iso '
          + 'paikallisaarre (~500–800 p) · mantereen 1000 p aarre · '
          + 'PÄÄAARRE (2000 p + jää matkalaukkuun). Arvo vaihtelee '
          + 'löytöhetkellä; kiinteät vain 1000/2000.',
        'Paikallisaarteet: joka maalle oma pari (pieni + iso), '
          + 'paikkaan sopivia, osa hauskan yllättäviä. ~220 paria.',
        'Löytöteksti: lyhyt tosi fakta aarteesta + onnentoivotus.',
        'Huudahdukset: pääaarteen luetut säilyvät; muut korvataan '
          + 'korkeintaan kahden sanan huudahduksilla ("Jes!", '
          + '"No okei.").',
        'VARUSTEET ostetaan kaupasta (hampurilaisvalikko, ~1000 '
          + 'p/kpl) — eivät löydy laatoista.',
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
        'Kohteita saa olla entistä enemmän per kaupunki — kartta on '
          + 'zoomattava (linjaus 15.8.2026). Uudet kaupunkikartat '
          + 'tehdään 5 kaupungin erissä omistajan tsekattavaksi.',
        'UUSIIN KAUPUNKEIHIN JA MAIHIN EI VIELÄ TARINAKAARTA '
          + '(omistaja 17.8.2026): ei matkakirjatekstejä, ei '
          + 'kohtaamisia eikä kysymyksiä — koko kaari tulee '
          + 'muuttumaan. Tehdään VAIN kaupunkilehti ja maalehti; '
          + 'kaari kirjoitetaan myöhemmin uuden mallin mukaan.',
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
          + 'näyttötekstiä; muuttunut teksti striimataan. Uusia '
          + 'äänitteitä EI generoida — kaikki uusitaan kerralla, kun '
          + 'Raamattu on valmis ja tekstit kirjoitettu.',
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
        'HEROGENEROINTI TAUOLLA (omistaja 24.8.2026): uusia '
          + 'herokuvia ei generoida toistaiseksi — tekotavassa voi '
          + 'olla vielä virheitä (kierrosten 22–25 katselmointi: '
          + 'viitteettömät yleisnäkymät keksivät maamerkkejä). '
          + 'Valmiit, katselmoidut kuvat kytketään loppuun; '
          + 'hylättyjen uusinta-ajot ja uudet kierrokset vasta '
          + 'omistajan luvalla. Työ keskittyy nyt fokusmoodiin.',
        'Kaikki kuvat PD/CC (Commons, Finna, LoC, Flickr — lisenssi '
          + 'aina rajapinnasta), silmin tarkistettuina; tekijä ja '
          + 'lisenssi näkyvissä.',
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
          + 'lehti · työhuone = kehittäjävivun takaiset lehdet pelissä.',
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
          + 'aina aarre.',
        '— Erillinen vihjejärjestelmä; aarrevihjeet ovat tekstien '
          + 'sivuhuomioita.',
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
