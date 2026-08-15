/*
 * Rakennustyön tilannetaulu työhuoneen etusivulle (omistajan toive
 * 8.8.2026: "yhteenveto, joka päivittyy, siitä missä tämänhetkinen
 * rakennustyö on menossa").
 *
 * TÄTÄ TIEDOSTOA PÄIVITTÄÄ FABLE aina, kun sessioilta saapuu
 * raportti tai työjono muuttuu — muut sessiot eivät kirjoita tähän.
 * Työhuone näyttää taulun etusivun kärjessä. Tilat: 'tyossa',
 * 'valmis', 'odottaa' (selväkielinen selite riville).
 */

export const TILANNE = {
  paivitetty: '14.8.2026 ilta — lukijaäänipäivä (v653–v658)',
  tavoite: 'Kehitys jatkuu uudella tilillä (kapulanvaihto 14.8., '
    + 'docs/kapulanvaihto.md). Päivän sato: lukijaääni lennossa '
    + 'säätöineen (v653–v657) ja Berliinin satelliittikarttapilotti '
    + '(v658). Lehtityö: Siperian kahdeksan kaupunkikannen erät '
    + 'käynnissä. Kartoitus 14.8.: 62 laudan maata ilman maalehteä, '
    + '185 kaupunkia ilman kantta. '
    + 'Matkakirjamerkintöjä EI generoida ennen tekstityylipäätöstä.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'tarina + koordinaatio',
      tila: 'tyossa',
      tehtava: 'Lukijaääniuudistus julkaistu (v653–v657): OpenAI-'
        + 'puhesynteesi kaikkiin luentoihin (myös merkinnät, '
        + 'ElevenLabs varalle), säätöpaneeli, työhuoneen Lukijaääni-'
        + 'välilehti, äänisäilöt (laite+reuna+R2), synkkakysely pois, '
        + 'kehittäjätila säilyy. Satelliittiselvitys tehty ja pilotti '
        + 'delegoitu Opus 7:lle (valmis v658).',
      seuraavaksi: 'Vahtii Opus 6:n Siperia-eriä ja katselmoi ne; '
        + 'satelliittiskaalaus 52 kaupunkiin odottaa omistajan '
        + 'hyväksyntää pilotille. Avoin: pöllön Matkakirja-linkit.',
    },
    {
      tekija: 'Opus 7',
      rooli: 'kartat (satelliitti)',
      tila: 'valmis',
      tehtava: 'PILOTTI VALMIS (v658): Berliinin kaupunkikartalla '
        + 'vipu piirros ↔ satelliittikuva (EOX Sentinel-2, sama '
        + 'bbox — pisteet paikoillaan), hakutyökalu ja lähderivi. '
        + 'Ei skaalattu — odottaa omistajan hyväksyntää.',
      seuraavaksi: 'Savukkeiden /opt-polkukorjaus valmis (#1011, '
        + '12/12 savuketta vihreänä ilman npm installia). Valmiudessa: '
        + 'skaalaus 52 kaupunkiin omistajan luvalla (yksi ajo per '
        + 'kaupunki).',
    },
    {
      tekija: 'Opus 6',
      rooli: 'lehdet (Siperia)',
      tila: 'tyossa',
      tehtava: 'Siperian kaupunkikannet kolmena eränä: 1) '
        + 'Jekaterinburg, Novosibirsk, Irkutsk; 2) Jakutsk, Magadan; '
        + '3) Kamtšatka, Sahalin, Vladivostok. Kansi + sää per '
        + 'kaupunki; EI uutis-/mediaosioita (linjaus 13.8.), ei '
        + 'kohtaamisia (tarinatekstit Fablella).',
      seuraavaksi: 'Erä kerrallaan PR:ksi; raportti Fablelle joka '
        + 'erästä.',
    },
    {
      tekija: 'Fable max 2',
      rooli: 'syväajattelu (apusessio)',
      tila: 'valmis',
      tehtava: 'Ateena, pituusbudjetti, hiontaerät 1–3, Sonnet-'
        + 'korjaukset, mysteerikannanotto ja kulkija-passi — '
        + 'kaikki mainissa.',
      seuraavaksi: 'Ei vastaanota viestejä tilinvaihdon jälkeen; '
        + 'uusi tili perustaa oman Max-session tarvittaessa.',
    },
    {
      tekija: 'Opus (ME)',
      rooli: 'lehdet + rakenne',
      tila: 'valmis',
      tehtava: 'ME-SEITSIKON TASAVAHVISTUS VALMIS (v579): JOR OMN '
        + 'QAT KWT BHR SAU ARE uuteen 4×4-malliin — 64 nostoa ja '
        + 'tarkistettua kuvaa. Koko Lähi-itä (12 maata) on nyt '
        + 'uudessa lehtimallissa.',
      seuraavaksi: 'Valmiudessa; jonossa Aasian jatkoerä (VNM IDN '
        + 'MYS PHL PAK…), sitten Afrikka (26 maata).',
    },
    {
      tekija: 'Opus (Aasia)',
      rooli: 'lehdet + kuvatyöt',
      tila: 'valmis',
      tehtava: 'AASIAN VIISI ENSIMMÄISTÄ MAALEHTEÄ VALMIINA '
        + '(v578): JPN CHN IND THA KOR — 25 aihesivua, 100 '
        + 'nostoa. Lisäksi KOR sai Musiikki-sivun (v579): K-pop, '
        + 'hallyu ja pansori (omistajan tilaus).',
      seuraavaksi: 'Valmiudessa; Aasian jatkoerä leveänä '
        + 'työnkulkuajona (Opus-kirjoittajat + Sonnet-tarkistajat).',
    },
    {
      tekija: 'Sonnet 1',
      rooli: 'QA',
      tila: 'valmis',
      tehtava: 'Kolme tarkistuskierrosta euro-hiontaan (7+15+1 '
        + 'löydöstä, kaikki korjattu) — Eurooppa sinetöity.',
      seuraavaksi: 'Valmiudessa; seuraava erä uudelta Fablelta '
        + '(esim. mekaniikkaerän savutestit).',
    },
  ],
  odottaaPaatosta: [
    'Uudelleenkirjoituksen pohjamalli: Fablen ehdotus — vanha '
      + 'kahden äänen rakenne (Reginaldin havainto + isoisän ääni '
      + 'johtolausevariaatioilla), kaariteksteistä vain parhaat '
      + 'kohtaukset ja faktat ilman mystiikkaa. Omistaja miettii.',
    'Kulkijan henkilöllisyys: hoitaja + kerääjä (suositus; kerääjä '
      + 'on Grimshawin jälkeläinen, revityn sivun palat) vai yksi '
      + 'hahmo — pääaarteen paljastusteksti kirjoitetaan tästä. '
      + 'HUOM: punnittava uudelleen 11.8. linjauksia vasten '
      + '(kukaan ei odota poikaa, mystiikka pois).',
    'Superlinssin ja tulevien kauppalinssien toiminnot — '
      + 'luonnostellaan yhdessä (omistajalla paljon ideoita).',
    'Aloituskaupunkiarvio: BA→Lima harkinnainen (LA→Chicago tehty).',
    '36 käyttämätöntä vihjeluentaa (puhe-*-vihje-*.mp3) repossa — '
      + 'poistetaanko mediat vai säilytetäänkö varalle?',
    'Aarrepotti: 7 × 2000 p = 14 000 p vaelluksessa — säädetäänkö '
      + 'STAR_PRIZE, jos palkkiot alkavat latistaa löytöjä?',
    'Afrikan jakotauluehdotus omistajalla luettavana.',
    'Ämpärin jäänteet kuvat/.jpg ja kuvat/..jpg — poisto vaatii '
      + 'ämpärioikeudet.',
  ],
};

/**
 * Testattavaa juuri nyt: uusimmat ominaisuudet ja mistä ne löytää.
 * Fable päivittää tätä julkaisujen tahdissa — Testaa-välilehti
 * näyttää listan pelilinkkien vieressä. Uusin ensin. Vanhat rivit
 * siivotaan pois kun ne on katsottu tai ne vanhenevat.
 */
export const TESTATTAVAA = [
  {
    otsikko: 'Kehittäjän liitteet: Raamattu ja Tilannelehti pelissä (v697)',
    ohje: 'Kytke kehittäjätila ja avaa pelin hampurilaisvalikko: '
      + 'uudesta Kehittäjä-osiosta aukeavat Raamattu 2.0 ja '
      + 'Tilannelehti luettavina lehtinä — sivunkäännöt, sisällys, '
      + 'lukija ja puskurit toimivat kuten muissakin lehdissä. '
      + 'Työhuone integroidaan jatkossa peliin tätä reittiä.',
  },
  {
    otsikko: 'ElevenLabs-äänitteet palasivat ajantasaisiin merkintöihin (v694)',
    ohje: 'Saavu kaupunkiin, jonka matkakirjateksti ei ole muuttunut '
      + '(esim. useimmat Euroopan ja Afrikan kaupungit): merkinnän '
      + 'lukee taas Viisas Kertoja -äänite. Muuttuneet tekstit '
      + '(Madrid, Berliini, Tukholma) ja äänitteettömät kaupungit '
      + 'striimataan lukijaäänellä kuten ennen. 39/42 äänitettä oli '
      + 'ajan tasalla. Uusia äänitteitä ei generoida ennen '
      + 'matkakirjatekstien uudistusta.',
  },
  {
    otsikko: 'Taustaäänet tasattu (v692)',
    ohje: 'Kierrä muutamaa kaupunkia ja kuuntele taustaääniä: tasot '
      + 'mitattiin K-painotetulla LUFS-mittarilla ja kaikki 125 raitaa '
      + 'ajettiin -33 LUFSin tavoitteeseen — hajonta oli 35 dB, nyt '
      + '4 dB. Kova raita ei enää huuda eikä hiljainen huku puheen '
      + 'väistön alle. Etusivun lähtöaula soi entisellä tasollaan. '
      + 'Venäjän kaupungeissa radio kuuluu taas (v691).',
  },
  {
    otsikko: 'Otsikkotauko ja yläotsikko sivunvaihdossa (v687)',
    ohje: 'Kuuntele sivu, jolla on väliotsikoita: ennen otsikolla '
      + 'alkavaa kohtaa lukija pitää nyt selvästi pidemmän tauon '
      + '(~1 s) kuin tavallisten kappaleiden välissä. Jatkuvassa '
      + 'luennassa sivunvaihdon jälkeen luetaan ensin sivun '
      + 'yläotsikko (esim. "Historia") — käsin käynnistetty luenta '
      + 'alkaa yhä suoraan leipätekstistä, ja masto/lehden nimi jää '
      + 'lukematta kummassakin.',
  },
  {
    otsikko: 'Taustan väistö luennan alla (v685)',
    ohje: 'Käynnistä lehden luenta äänimaiseman soidessa: taustan '
      + 'pitäisi laskea pehmeällä 650 ms feidillä selvästi puheen alle '
      + 'ja nousta samaa liukua takaisin, kun luenta loppuu tai '
      + 'pysäytetään. Sama väistö koskee nyt kaikkia luentapolkuja — '
      + 'myös kaiuttimen sivuluentaa ja pöllön striimattua vastausta, '
      + 'jotka eivät aiemmin väistäneet lainkaan. Jatkuvassa luennassa '
      + 'tausta kohoaa hetkeksi sivunvaihdon hengähdyksen ajaksi — '
      + 'sano, jos se häiritsee.',
  },
  {
    otsikko: 'Jatkuva luenta ja pehmeät siirtymät (v683)',
    ohje: 'Käynnistä lehden luenta ja paina soittimen uutta '
      + 'kiertonuolikytkintä: luennan loputtua lehden pitäisi kääntää '
      + 'sivu itse ja jatkaa lukemista (tekstittömät sivut ohitetaan, '
      + 'viimeiseen sivuun luenta päättyy). Käynnistys ei enää liikuta '
      + 'näkymää — sivu lähtee seuraamaan vasta toisesta kappaleesta. '
      + 'Reunanapautusten ja luennan seurannan vieritykset kulkevat '
      + 'nyt omalla ease-in-out-käyrällä: liike kiihtyy ja pehmenee '
      + 'molemmista päistä, ja oma sormi katkaisee koneen liikkeen.',
  },
  {
    otsikko: 'Luennan äänenlaatu ja kertojaluennat (v672–v678)',
    ohje: 'Kuuntele lehden luenta: saumojen pitäisi kulkea tasaisella '
      + 'virkevälillä ilman nykäyksiä (puskurisoitin leikkaa '
      + 'hiljaisuudet palojen päistä), nopeus generoidaan OpenAI:n '
      + 'omalla säädöllä ja soitin piiloutuu itsestään — kaiutin '
      + 'vipuaa sen esiin luentaa katkaisematta. Uutta: kohtaamisten '
      + 'tervehdykset, löytörepliikit ja tarinakaaren aarretekstit '
      + 'luetaan nyt lukijaäänellä (äänite varapolkuna) — myös '
      + 'kaupungeissa, joille äänitettä ei koskaan nauhoitettu.',
  },
  {
    otsikko: 'Lukijan seuranta (v668)',
    ohje: 'Vieritä lehden sivua alas ja paina kaiutinta: luenta alkaa '
      + 'näytöllä olevasta kohdasta, kuuluvat virkkeet maalautuvat '
      + 'kevyesti ja sivu vierii luennan perässä. Väliotsikko kuuluu '
      + 'nyt samaan kohtaan seuraavan kappaleen kanssa — säätimen '
      + 'kappalehyppy laskeutuu otsikkoon ja jatkaa suoraan tekstiin. '
      + 'Kappaleen vaihdot käynnistyvät myös entistä nopeammin.',
  },
  {
    otsikko: 'Lehden asettelu-uudistus (v666)',
    ohje: 'Avaa maa- tai kaupunkilehti: lippu on keskitetty otsikon '
      + 'perään, lukijan kaiutin lukittu otsikkorivin oikeaan reunaan '
      + 'molemmissa lehdissä, alalaidan sivupilleri ja alanuoli ovat '
      + 'poissa. Napauta ruudun alareunaa (sivu vierii pohjaan) ja '
      + 'yläreunaa tai otsikkoa (takaisin alkuun). Sivut vaihtuvat '
      + 'pyyhkäisyllä, sivun lopun napeilla ja sisällysvalikosta.',
  },
  {
    otsikko: 'Satelliittinäkymä Berliinin kartalla (v658) — PILOTTI',
    ohje: 'Avaa Berliinin lehden Kaupunki kartalla -sivu: kartan yllä '
      + 'on kaksi nappia, Piirros ja Satelliitti. Vaihda näkymää — '
      + 'kohdepisteet ja mittajana pysyvät paikoillaan, lähderivi '
      + 'vaihtuu. Jos näkymä kelpaa, sano niin: skaalaus kaikkiin '
      + '52 muuhun karttakaupunkiin on yhden ajon työ per kaupunki.',
  },
  {
    otsikko: 'Lukijan säätöpaneeli ja äänikorjaukset (v655–v657)',
    ohje: 'Paina lehtisivun kaiutinta: napin alle aukeaa paneeli '
      + '(tauko, kappale eteen/taakse, laskuri, lopetus). Luenta ei '
      + 'enää napsahda alussa, ei lue lehden nimeä eikä sivun '
      + 'ensimmäistä otsikkoa, eikä pidä outoa taukoa otsikon '
      + 'jälkeen. Äänten säätö: työhuoneen Lukijaääni-välilehti '
      + '(vaatii kehittäjäkoodin säätöihin).',
  },
  {
    otsikko: 'Lukijaääni lennossa (v653)',
    ohje: 'Avaa mikä tahansa lehtisivu ja paina kaiutinta: luennan '
      + 'pitäisi alkaa parissa sekunnissa uudella lukijaäänellä '
      + '(OpenAI, kertoja-persoona). Kysy sitten pöllöltä jotain '
      + 'kaiutinvipu päällä — vastaus luetaan striimin tahdissa pöllön '
      + 'omalla äänellä, myös iPadin kuoressa. Sama sivu toiseen '
      + 'kertaan alkaa heti (säilöt). Jos worker-avainta ei ole vielä '
      + 'viety, kaiutin lukee laitteen omalla äänellä kuten ennenkin. '
      + 'Työhuoneen Tilanne-välilehden kärjessä näkyy nyt myös peilin '
      + 'tilankäyttö jaoteltuna.',
  },
  {
    otsikko: 'Kertojan ääni palasi saapumisiin (v577)',
    ohje: 'Saavu mihin tahansa Euroopan kaupunkiin: saapumiskortti '
      + 'näyttää taas lyhyen kahden äänen merkinnän (Reginaldin '
      + 'havainto + isoisän nosto) ja kertoja lukee sen ääneen — '
      + 'kaaritekstien mykkä kausi on ohi. Tilapäinen ratkaisu '
      + 'kunnes tekstit kirjoitetaan uusiksi Raamattu 2.0:n mukaan. '
      + 'Vertailu: työhuoneen Näytteet-välilehden lopussa kaikki '
      + '41 merkintää.',
  },
  {
    otsikko: 'Seitsemän aarretta ja mannerlento (v576)',
    ohje: 'Aloita uusi peli: jokaisella mantereella on nyt oma Aarnin '
      + 'luettelon aarre (Meripihkahuone, kivilintu, jadesinetti…) — '
      + 'matkalaukun luettelo kertoo mitkä on löydetty. Kun mantereen '
      + 'aarre löytyy, Laiva & lento -valikkoon ilmestyy "Lennä '
      + 'Eurooppaan: Lontoo" -tyyliset napit mantereille, joiden aarre '
      + 'on vielä kateissa. Isoisän vihjekortti (revitty sivu) on '
      + 'poistunut pelistä. Vanhat tallennukset toimivat yhä.',
  },
  {
    otsikko: 'Vuorten kuvagalleriat kaikkialla (v551 + v555)',
    ohje: 'Zoomaa kartalla mille tahansa vuoristolle (esim. Kaukasus, '
      + 'Himalaja, Atlas) ja avaa i-napista Lue lisää: jokaisella '
      + '52 vuorikohteella on nyt käsin kuratoitu kuvakaruselli, '
      + 'yhteensä 324 Commons-valokuvaa suomenkielisin selittein.',
  },
  {
    otsikko: 'Matkakirjan saapumiset uudella rimalla (v552–v557)',
    ohje: 'Euroopan rimakierros on valmis: 34/41 kohteen merkinnät '
      + 'uusittu tai silattu. Saavu Istanbuliin, Prahaan, Kiovaan '
      + 'tai Madridiin: '
      + 'isoisän merkinnät ovat nyt kommelluksia, tosihuomioita ja '
      + 'mittaajan persoonaa — mm. Bradshaw\'n käsittämätön '
      + 'aikataulukirja ja kolmentoista lyönnin varmistus kahtena '
      + 'yönä. Uusitut tekstit ovat toistaiseksi ilman luentaa '
      + '(generointi odottaa lupaa), vanha ääni ei soi niiden päällä.',
  },
  {
    otsikko: 'Kohtaaminen joka kaupungissa + Tapaa X -nappi (v506)',
    ohje: 'Avaa mikä tahansa Euroopan kaupunki ja paina Tutki: '
      + 'kortin napissa lukee nyt henkilön nimi (esim. Tapaa Nikos '
      + 'Ateenassa), henkilö esittäytyy ja kertoja lukee kohtaamisen '
      + '— myös kaupungeissa joissa ei ole laattaa. Pulma tulee '
      + 'vasta toisella pysähdyksellä. Tutki-nappi ei enää katoa '
      + 'väärien vastausten jälkeen: lehti on aina luettavissa.',
  },
  {
    otsikko: 'Valokuvapulma (v503) ja popup-hienosäädöt (v505)',
    ohje: 'Ateenan pylväspulman vaihtoehdot ovat nyt oikeita '
      + 'valokuvia (neljäntenä karyatidi-harhautus). Nähtävyys-'
      + 'popupin alle jää pieni rako, ja täysikoon kuvaa voi selata '
      + 'nuolilla ja pyyhkäisyllä kuten lehden kuvakotelossa.',
  },
  {
    otsikko: 'Illan testipelikorjaukset (v475)',
    ohje: 'Avaa Ateenan kartalta Akropolis: kolme kuvaa on nyt yhtenä '
      + 'karusellina nuolineen ja 1/3-laskureineen. Istanbulin lehden '
      + 'lopussa Etsi kätkö -nappi ei enää jää sivunumeron alle. '
      + 'Espanjalaisten portaiden Lue lisää päättyy asiatekstiin — '
      + 'tyhjät Kuvia/Lähteet-otsikot ovat poissa.',
  },
  {
    otsikko: 'Eurooppa on lehtien osalta täysi (v481)',
    ohje: 'Viisi viimeistä kaupunkilehteä: Dubrovnikilla Tasavalta, '
      + 'Riialla Vanhakaupunki, Vilnalla Oppi, Oslolla Laivat ja '
      + 'Kööpenhaminalla Sadut. Aiemmin aluelehdet Kreeta, Sisilia '
      + 'ja Alpit (v473).',
  },
  {
    otsikko: 'Yksi tehtävä per pysähdys (v478) ja Engel (v479)',
    ohje: 'Pulma korvaa nyt kohtaamisvisan — pysähdyksessä on aina '
      + 'täsmälleen yksi tehtävä ja muodot vaihtelevat. Helsingin '
      + 'Tuomiokirkko-jutussa Engelin nimi on linkki hänen omaan '
      + 'juttuunsa.',
  },
  {
    otsikko: 'Maakyltit nousevat kaupunkien päälle (v474)',
    ohje: 'Zoomaa Euroopan karttaa: maan nimikyltti ei enää peitä '
      + 'kaupunkien nimiä (esim. Kreikka/Ateena) — sijainnit '
      + 'mitattiin törmäystarkistuksella.',
  },
  {
    otsikko: 'Tarinakaari pelissä (v460, QA-tarkastettu)',
    ohje: 'Pelaa Eurooppaa: saapumiskortti lukee isoisän merkinnän, '
      + 'kaupungin ensimmäinen aarrevisa on kohtaaminen jonka henkilö '
      + 'esittää isoisän kysymyksen, ja aarteen paljastus päättyy auki '
      + 'jäävään vihjeeseen — kaikki luettuna ääneen. 41 kohdetta; '
      + 'faktatarkistettu ja integraatio-QA puhdas.',
  },
];
