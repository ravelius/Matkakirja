/*
 * IHMISEN MATKA — aineistopakka aikajanalinssille "ihmisen-matka".
 *
 * Omistajan päätös 5.9.2026 (Fablen suositus): toinen aikajanalinssi
 * kertoo nykyihmisen leviämisen Afrikasta koko maapallolle. Kaksikymmentä
 * pysäkkiä, 300 000 vuotta sitten → noin 1250–1300 jaa.
 *
 * Tämä tiedosto on PELKKÄ AINEISTO. Kaari, kello, valot ja kamera ovat
 * yhteistä moottoria (js/aikajana.js), ja itse linssi (LINSSI-vienti,
 * alue, musiikki, kytkentä rekisteriin) tehdään erikseen — Fable
 * hyväksyy tekstit ennen sitä. Rakenne on tarkoituksella sama kuin
 * js/linssit/keksinnot.js:n tapahtumataululla, jotta moottorin
 * kenttänimet (otsikko, selite, juttu, kuva, lahde) käyvät sellaisenaan.
 *
 * ── AIKA ──────────────────────────────────────────────────────────
 *
 * Keksintölinssin `vuosi` ei kelpaa tähän: kaari alkaa 300 000 vuoden
 * takaa eikä pääty vuosilukuun. Siksi jokaisella pysäkillä on kaksi
 * aikakenttää:
 *
 *   `vuosiaSitten`  LUKU, jolla taulu järjestetään ja jolla moottori
 *                   voi laskea kellon asennon. Kiistellyissä
 *                   ajoituksissa luku on haarukan keskikohta.
 *   `ajoitus`       PELAAJALLE NÄYTETTÄVÄ teksti, esimerkiksi
 *                   "noin 300 000 vuotta sitten" tai
 *                   "65 000–50 000 vuotta sitten".
 *
 * Ajat sanotaan aina "vuotta sitten" — ei eKr. Ainoa poikkeus on
 * viimeinen pysäkki, joka on niin lähellä nykyaikaa, että vuosiluku
 * ("noin 1250–1300 jaa.") on selvempi. Taulu on aikajärjestyksessä
 * vanhimmasta nuorimpaan; `n` on pysäkin numero kaaressa.
 *
 * ── KIISTELLYT AJOITUKSET ─────────────────────────────────────────
 *
 * Tämä on ala, jolla luvut liikkuvat. Kun tutkijat ovat eri mieltä,
 * `ajoitus` kertoo haarukan ja `juttu` kertoo, MIKSI kiista on
 * olemassa. Kiistellyt pysäkit: omo-kibish (195 000 vai 233 000, ja
 * kyseessä on vähimmäisikä), skhul-qafzeh (jäikö retkestä jälkeläisiä),
 * al-wusta (paikan malli 95 000–86 000), madjedbebe (65 000 vai
 * 50 000), lake-mungo (62 000 vai 40 000), niah (40 000 vai 37 000),
 * white-sands (siemenajoituksen luotettavuus) ja monte-verde
 * (vuoden 2026 uusi väite keskiholoseenista).
 *
 * ── IHMISKUVA ─────────────────────────────────────────────────────
 *
 * Kaikki kaaren ihmiset ovat nykyihmisiä, Homo sapiensia — ei
 * "luolaihmisiä" eikä karikatyyrejä. He tekivät työtä, hautasivat
 * kuolleensa, koristelivat itseään ja liikkuivat sinne, missä oli
 * ruokaa. Kohderyhmä on 13 vuotta täyttäneet ja aikuiset.
 *
 * ── KUVAT ─────────────────────────────────────────────────────────
 *
 *   `kuva`       kuvaputken generoima HAVAINNEKUVA hetkestä paikan
 *                päällä (20/20 toimitettu R2:een 5.9.2026, 1536×1024).
 *                Kentät:
 *                  `osoite`     valmis osoite ämpärissä
 *                  `kuvateksti` KUVAPUTKEN LOPULLINEN kuvarivi,
 *                               kopioitu kuittauksesta sanasta sanaan
 *                               (paikka + ajoitus). Ei muokata täällä.
 *                  `selite`     pysäkin `selite` sellaisenaan; se
 *                               kopioidaan taulun jälkeen silmukassa.
 *                  `lahde`      'Matkakirjan havainnekuva'
 *   `esine`      KORTIN KUVA eli itse löytö — kallo, helmi, jalanjälki,
 *                saviastia. Kuvat tulevat kuvaputkelta myöhemmin;
 *                osoitteet on kirjattu tässä valmiiksi.
 *   `esineAito`  aito PD/CC-kuva Wikimedia Commonsista. KAIKKI ovat
 *                toistaiseksi null: en varmentanut yhtäkään
 *                tiedostonimeä Commonsista, enkä kirjaa arvauksia.
 *                Tarkistus kuuluu kuvatoimitukselle (Sonnet).
 *
 * KUVAPUTKEN RAJAUKSET 5.9.2026 on kirjoitettu teksteihin sisään, jotta
 * sana ja kuva eivät sano eri asiaa: skhul-qafzehin kuva esittää
 * QAFZEHIA (noin 100 000 vuotta sitten) eikä hautaustilannetta;
 * pinnacle-point on "varhaisimpia tunnettuja" eikä ensimmäinen meren
 * antimien käyttö; blombosin noin 100 000 vuoden okrapaja on jätetty
 * pois, koska kohtaus on 75 000 vuoden takaa; yanassa EI ole
 * mammutinluista majaa; madjedbeben kuvassa ei ole rannikkoa eikä
 * venettä; denisovassa ei ole kasvokkaista kohtaamista eikä yhtäkään
 * esinettä ole kiinnitetty tiettyyn ihmisryhmään; beringian maisema on
 * jäätön; chauvet'n paneelissa ovat hevoset ja sarvikuonot.
 *
 * ── PAIKAT ────────────────────────────────────────────────────────
 *
 * `lat`/`lon` ovat desimaaliasteita, neljä desimaalia, haettu
 * en-Wikipedian artikkelien koordinaateista 5.9.2026. Laudan
 * `x`/`y` lasketaan vasta linssiä tehtäessä (js/fokusmitat.js
 * projisoiLaudalle), joten niitä ei ole tässä.
 *
 * NELJÄ KOORDINAATTIA ON LIKIARVO, ja ne on syytä tarkistaa ennen
 * julkaisua:
 *   lida-ajer    en-Wikipedialla ei ole artikkelia luolasta; käytetty
 *                Padangin ylänköjen Payakumbuhin seudun koordinaattia.
 *   tianyuan     Tianyuanin luolan artikkelilla ei ole koordinaattia;
 *                käytetty Zhoukoudianin koordinaattia (luola on sen
 *                välittömässä läheisyydessä).
 *   al-wusta     kaivauspaikan tarkkaa sijaintia ei ole Wikipediassa;
 *                käytetty Nefudin autiomaan koordinaattia.
 *   white-sands  jalanjäljet ovat Alkali Flatin kuivalla järvenpohjalla;
 *                käytetty kansallispuiston koordinaattia.
 *
 * Lähde jokaiselle pysäkille on `lahde`-kentässä: englanninkielinen
 * Wikipedia, artikkelit tarkistettu 5.9.2026.
 */

/**
 * Kuvaputken generoitujen kuvien juuri ämpärissä. Havainnekuvat ovat
 * juuressa (aikajana/ihmisen-matka/<tunnus>.jpg) ja löytöjen kuvat
 * alikansiossa `esine/`, samalla tavalla kuin keksintölinssin
 * muotokuvat (js/linssit/keksinnot.js KEKSINTO_KUVAJUURI).
 * Havainnekuvat toimitettiin 5.9.2026; löytökuvat tulevat myöhemmin.
 */
export const IHMISEN_MATKA_KUVAJUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/aikajana/ihmisen-matka';

/** Matkalaukun selite: mitä linssi on. */
export const IHMISEN_MATKA_ESITTELY = 'Ihmisen matka Afrikasta koko maapallolle: '
  + 'kaksikymmentä paikkaa, joista on löytynyt luu, jälki tai helmi. Kello juoksee '
  + 'kolmestasadastatuhannesta vuodesta tähän päivään, ja kartalle syttyy valo aina, '
  + 'kun jossakin oli joku ensimmäistä kertaa.';

/** Kaaren alkusanat (avausjakso ennen käynnistystä). */
export const IHMISEN_MATKA_ALOITUS = 'Tulet seuraavaksi näkemään, miten yksi laji '
  + 'levisi yhdestä maanosasta kaikkiin. Kukaan ei suunnitellut matkaa: jokainen '
  + 'sukupolvi siirtyi vain vähän kauemmas kuin edellinen, ja tuhat sukupolvea '
  + 'myöhemmin oltiin toisella puolella maapalloa. Valo syttyy aina, kun jostakin '
  + 'löytyy jälki siitä, että täällä oli joku ennen muita.';

/** Loppusanat, kun kaikki kaksikymmentä valoa palavat. */
export const IHMISEN_MATKA_LOPPU = 'Kaikki kaksikymmentä valoa palavat nyt, ja '
  + 'niiden ketju kiertää maapallon Marokon kukkulalta Tyynenmeren yli Uuteen-Seelantiin. '
  + 'Matkaan meni kolmesataatuhatta vuotta eikä yksikään kulkija tiennyt olevansa '
  + 'matkalla — jokainen vain siirsi leirinsä seuraavan rannan taakse. Ihminen oli '
  + 'siis kiertänyt maapallon kerran jo kauan ennen kuin kukaan keksi laskea päiviä; '
  + 'Fogg teki saman uudelleen, kello kädessä.';

export const IHMISEN_MATKA = [
  {
    n: 1, tunnus: 'jebel-irhoud',
    vuosiaSitten: 300000, ajoitus: 'noin 300 000 vuotta sitten',
    otsikko: 'Kasvot, jotka tunnistaisi',
    paikka: 'Jebel Irhoud', maa: 'Marokko', lat: 31.8550, lon: -8.8725,
    loyto: 'Kaivostyömies irrotti kallon luolan seinästä vuonna 1961, ja se kulki '
      + 'jonkin aikaa insinöörin matkamuistona ennen kuin päätyi Rabatin yliopistolle. '
      + 'Vuonna 2017 julkaistu uusi ajoitus teki löydöistä vanhimmat tunnetut '
      + 'Homo sapiensin jäänteet.',
    selite: 'Kalliolla istuva nainen iskee kiveä samalla otteella kuin hänen äitinsä '
      + 'ja isoäitinsä. Kasvot ovat jo meidän kasvomme, mutta kallon takaosa on pitkä '
      + 'ja vieras. Kukaan täällä ei tiedä olevansa ensimmäinen missään.',
    juttu: 'Jebel Irhoudin kukkula oli 1960-luvulla baryyttikaivos. Ensimmäiset '
      + 'kaivajat raivasivat paikalta pienillä räjähteillä kaksituhatta tonnia '
      + 'louhetta päästäkseen kerroksiin käsiksi. Koska luiden seurana oli '
      + 'mousterien-tyyppisiä kiviteriä, löydöt luokiteltiin neandertalilaisiksi — '
      + 'ja niin ne pysyivät yli neljäkymmentä vuotta.'
      + '\n\n'
      + 'Jean-Jacques Hublinin ryhmä palasi paikalle 2004, kaivoi kerrokset auki '
      + 'huolellisesti ja ajoitti ne uudelleen. Vuonna 2017 julkaistu painotettu '
      + 'keski-ikä oli noin 315 000 vuotta, ja luut tunnistettiin varhaisiksi '
      + 'Homo sapiensin edustajiksi. Se siirsi lajimme alkua sadallatuhannella '
      + 'vuodella taaksepäin ja samalla pois yhdestä itäafrikkalaisesta kehdosta: '
      + 'ihmisiä oli jo tuolloin Afrikan laidasta laitaan. Kasvot olivat meidän '
      + 'kasvomme, mutta aivokoppa oli vielä pitkulainen eikä pyöreä. Aivojen muoto '
      + 'muuttui hitaammin kuin kasvot. Paikalta on löytynyt gasellin luita, '
      + 'levallois-tekniikalla tehtyjä teriä ja jälkiä tulen käytöstä.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/jebel-irhoud.jpg`,
      kuvateksti: 'Jebel Irhoud, noin 300 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/jebel-irhoud.jpg`,
      selite: 'Irhoudin kallo: kasvot jo nykyihmisen, aivokoppa vielä pitkulainen.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Jebel Irhoud"',
  },
  {
    n: 2, tunnus: 'omo-kibish',
    vuosiaSitten: 233000, ajoitus: 'vähintään noin 230 000 vuotta sitten',
    otsikko: 'Tuhkakerroksen alta',
    paikka: 'Omo Kibish, Omo-joki', maa: 'Etiopia', lat: 4.8004, lon: 35.9671,
    loyto: 'Richard Leakeyn johtama retkikunta löysi 1967–1974 Omo-joen varrelta '
      + 'kaksi osittaista kalloa, leukoja ja satoja hampaita. Löydöt nimettiin '
      + 'Omo I:ksi ja Omo II:ksi, ja niitä pidettiin vuosikymmeniä maailman '
      + 'vanhimpina nykyihmisen luina.',
    selite: 'Joen mutkassa mies suoristaa puista vartta käsissään ja katsoo ylös. '
      + 'Taivaalta laskeutuu tuhkaa jostakin kaukaisesta tulivuoresta, ja se peittää '
      + 'hiljaa maan, joen ja jäljet. Juuri se tuhka kertoo tuhansia sukupolvia '
      + 'myöhemmin, milloin tämä päivä oli.',
    juttu: 'Omo Kibishin löydöt olivat pitkään pulmalliset, koska niiden ympäriltä '
      + 'ei juuri saatu eläinluita eikä kivityökaluja — eli mitään, mikä olisi '
      + 'kertonut iän. Ratkaisu tuli maaperästä. Alue on Itä-Afrikan hautavajoaman '
      + 'reunaa, jossa tulivuoret ovat jättäneet toistuvia tuhkakerroksia, ja '
      + 'kerrokset voidaan ajoittaa argonmenetelmällä. Vuonna 2004 luiden alapuolinen '
      + 'kerros ajoitettiin noin 195 000 vuoden ikäiseksi.'
      + '\n\n'
      + 'Vuonna 2022 tutkijaryhmä tunnisti luiden YLÄPUOLELLA olevan paksun '
      + 'tuhkakerroksen erään tunnetun purkauksen tuotteeksi ja sai näin '
      + 'vähimmäisiän: Omo I on vähintään noin 233 000 vuotta vanha. Luku on siis '
      + 'alaraja eikä tarkka ikä, ja kahden luvun ero on mittaustapa eikä riita — '
      + 'ensimmäinen kertoo, milloin maa oli valmiina, jälkimmäinen, milloin se '
      + 'peitettiin. Omo I:n kallo on jo selvästi nykyihmisen muotoinen: korkea '
      + 'otsa, pyöreä takaraivo, kevyet kulmakaaret. Näiden ihmisten maailma oli '
      + 'sateisempi kuin nykyinen kuiva laakso, ja Omo-joki virtasi täytenä.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/omo-kibish.jpg`,
      kuvateksti: 'Omo Kibish, noin 230 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/omo-kibish.jpg`,
      selite: 'Omo I:n kallonpalat: korkea otsa ja pyöreä takaraivo, jo nykyihmisen muoto.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Omo remains"',
  },
  {
    n: 3, tunnus: 'pinnacle-point',
    vuosiaSitten: 164000, ajoitus: 'noin 164 000 vuotta sitten',
    otsikko: 'Meri ruokkii',
    paikka: 'Pinnacle Point, Mosselbaai', maa: 'Etelä-Afrikka', lat: -34.2078, lon: 22.0894,
    loyto: 'Rantakallion luolista löytyi 2000-luvun kaivauksissa simpukankuoria, '
      + 'jauhettua okraa ja kuumennettuja kiventeriä. Ne ovat varhaisimpia '
      + 'tunnettuja todisteita siitä, että ihminen käytti meren antimia '
      + 'järjestelmällisesti.',
    selite: 'Luoteen aikaan nainen kahlaa kylmässä vedessä ja irrottaa simpukoita '
      + 'kalliosta lapsi selässään. Meri antaa ruokaa silloinkin, kun maa on kuiva '
      + 'ja saalis kaukana. Rantaviiva vaelsi vuosituhansien mittaan kilometrejä, '
      + 'joten tämä ranta ei ole enää siellä missä silloin.',
    juttu: 'Kun Homo sapiens oli nuori laji, maailma oli jääkaudessa ja Afrikka '
      + 'kuiva. Paleoantropologi Curtis Marean etsi kartalta paikkoja, joissa '
      + 'ihminen olisi voinut selvitä kuivuudesta, ja päätyi Etelä-Afrikan '
      + 'etelärannikolle: siellä missä maa ei anna, meri antaa. Pinnacle Pointin '
      + 'luola 13B osoitti hänen olleen oikeassa. Alimmista kerroksista löytyi '
      + 'simpukankuoria noin 164 000 vuoden takaa — ihmiset kävivät rannalla '
      + 'säännöllisesti, tunsivat vuoroveden ja osasivat ajoittaa retkensä.'
      + '\n\n'
      + 'Samoista kerroksista löytyi myös raaputettua ja jauhettua okraa, jota on '
      + 'käytetty väriaineeksi, sekä myöhemmistä kerroksista vanhimmat tunnetut '
      + 'jäljet kiven lämpökäsittelystä: kiveä haudattiin nuotion alle, jotta se '
      + 'lohkeaisi paremmin. Kumpikin on merkki siitä, ettei kyse ollut vain '
      + 'hengissä pysymisestä. Nämä ihmiset suunnittelivat monivaiheisia töitä ja '
      + 'käyttivät väriä johonkin, mitä emme enää tiedä. Vuonna 2024 alueesta tuli '
      + 'osa Unescon maailmanperintökohdetta.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/pinnacle-point.jpg`,
      kuvateksti: 'Pinnacle Point, noin 160 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/pinnacle-point.jpg`,
      selite: 'Simpukankuoria ja jauhettua okraa luolan 13B alimmista kerroksista.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Pinnacle Point"',
  },
  {
    n: 4, tunnus: 'skhul-qafzeh',
    vuosiaSitten: 105000, ajoitus: '120 000–90 000 vuotta sitten',
    otsikko: 'Varhainen retki Levanttiin',
    paikka: 'Skhulin ja Qafzehin luolat, Karmelvuori ja Nasaret', maa: 'Israel',
    lat: 32.6707, lon: 34.9661,
    loyto: 'Dorothy Garrodin johtamilla kaivauksilla 1929–1934 Karmelvuoren luolista '
      + 'nousi kymmenkunta luurankoa, ja lähellä Nasaretia sijaitsevasta Qafzehin '
      + 'luolasta löytyi myöhemmin hautoja, joissa oli okraa ja peuransarvia.',
    selite: 'Qafzehin luolan suulla muutama ihminen seisoo umpeen luodun haudan '
      + 'ympärillä eikä kukaan puhu. He ovat kaukana siitä maanosasta, jossa '
      + 'heidän isovanhempansa syntyivät. Kuolleet haudataan silti kuten kotona.',
    juttu: 'Karmelvuoren ja Nasaretin luolat kertovat varhaisesta nykyihmisen '
      + 'retkestä Afrikan ulkopuolelle. Skhulista ja Qafzehista löytyneet ihmiset '
      + 'ovat anatomisesti nykyihmisiä ja elivät Levantissa 120 000–90 000 vuotta '
      + 'sitten, aikana jolloin Saharan ja Siinain seutu oli tavallista '
      + 'sateisempaa. Haudat ovat maailman vanhimpia tunnettuja tarkoituksellisia '
      + 'hautauksia: vainajien mukana on okraa, simpukankuoria ja kerran myös '
      + 'peuran sarvet. Kaivajat luokittelivat löydöt 1939 omaksi lajikseen, '
      + 'kunnes ne tunnistettiin Homo sapiensiksi.'
      + '\n\n'
      + 'Kiistelty kysymys on, mitä näille ihmisille tapahtui. Kaikkien Afrikan '
      + 'ulkopuolisten nykyihmisten perimä osoittaa yhteistä lähtöä vasta noin '
      + '60 000 vuoden takaa, joten Skhulin ja Qafzehin väki ei todennäköisesti ole '
      + 'kenenkään nykyisen esivanhempi. Ilmasto kuivui, ja Levantissa asui pian '
      + 'taas neandertalilaisia. Retki ei siis päättynyt ihmisten takia vaan sään: '
      + 'kun vihreä käytävä sulkeutui, se sulkeutui myös paluulta. Sama alue '
      + 'kuljettiin uudelleen kymmeniätuhansia vuosia myöhemmin, ja vasta se matka '
      + 'jäi pysyväksi.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/skhul-qafzeh.jpg`,
      kuvateksti: 'Qafzeh, noin 100 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/skhul-qafzeh.jpg`,
      selite: 'Okralla värjätty simpukankuori Qafzehin hautakerroksesta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Skhul and Qafzeh hominins" ja "Skhul Cave"',
  },
  {
    n: 5, tunnus: 'al-wusta',
    vuosiaSitten: 88000, ajoitus: '95 000–86 000 vuotta sitten',
    otsikko: 'Sormiluu vihreässä Arabiassa',
    paikka: 'Al Wusta, Nefudin autiomaa', maa: 'Saudi-Arabia', lat: 28.3000, lon: 41.0000,
    loyto: 'Kuivuneen järven pohjalta löytyi yksi ainoa ihmisen sormen luu, joka '
      + 'ajoitettiin vuonna 2018 noin 88 000 vuoden ikäiseksi. Se on vanhin '
      + 'ihmisfossiili, joka tunnetaan Afrikan ja Levantin ulkopuolelta.',
    selite: 'Hiekan päälle kumartunut mies juo makeaa vettä järvestä, jota ei enää '
      + 'ole olemassa. Kauempana käyskentelee antilooppeja ja yksi virtahepo. '
      + 'Sama paikka on nyt hiekkadyyni, jolla ei kasva mitään.',
    juttu: 'Nykyinen Nefud on kivistä ja hiekkaista autiomaata, mutta jääkausien '
      + 'lämpimillä välikausilla monsuunit ylsivät Arabian niemimaalle ja sen '
      + 'painanteisiin syntyi satoja järviä. Al Wustan kaivaus tehtiin yhden '
      + 'tällaisen muinaisen järven pohjalle: sedimentistä nousi virtahevon, '
      + 'villinaudan ja antiloopin luita eli kokonainen savannin eläimistö. '
      + 'Ihmisestä löytyi yksi ainoa palanen, sormen keskijäsen, jonka muoto '
      + 'erotettiin mittaamalla neandertalilaisen vastaavasta luusta.'
      + '\n\n'
      + 'Löytö julkaistiin 2018. Järven kerrokset ajoittuvat noin 95 000–86 000 '
      + 'vuoden väliin ja luu itse noin 88 000 vuoden ikäiseksi, joten ihmisen '
      + 'tunnettu leviäminen ei kulkenut pelkkää rannikkoa pitkin: Arabian '
      + 'sisämaan läpi mentiin silloin, kun siellä oli vettä. Yksi luunpala ei '
      + 'kerro, kuinka monta ihmistä täällä oli tai kuinka kauan he viipyivät. Se '
      + 'kertoo, että joku käveli satojen kilometrien päähän rannikolta seuraamaan '
      + 'ruohoa ja eläimiä — ja että ilmasto avasi ja sulki tämän oven monta '
      + 'kertaa. Suurin osa Arabian ihmisistä jäi näiden ovien väliin, eikä '
      + 'heistä tiedetä mitään.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/al-wusta.jpg`,
      kuvateksti: 'Al Wusta, noin 85 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/al-wusta.jpg`,
      selite: 'Al Wustan sormiluu: yksi keskijäsen, koko todiste ihmisestä Arabiassa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Arabian Peninsula" ja "Nafud desert"',
  },
  {
    n: 6, tunnus: 'blombos',
    vuosiaSitten: 75000, ajoitus: 'noin 75 000 vuotta sitten',
    otsikko: 'Okra ja helmet',
    paikka: 'Blombosin luola', maa: 'Etelä-Afrikka', lat: -34.4144, lon: 21.2225,
    loyto: 'Christopher Henshilwoodin kaivauksista nousi 1990-luvulta alkaen '
      + 'kaiverrettuja okrapaloja, reiällisiä kotilonkuoria ja hiottuja luukärkiä. '
      + 'Helmet ovat noin 75 000 vuoden ikäisiä, vanhin piirros noin 73 000.',
    selite: 'Nuotion valossa joku pujottaa jouhen läpi pienten kotilonkuorien, '
      + 'joihin on hangattu reikä, ja toinen piirtää okrapalaan ristikkoa. '
      + 'Kaulakoru ei ruoki ketään — se kertoo, kuka sen kantaja on.',
    juttu: 'Blombosin luola on pieni kolo Etelä-Afrikan etelärannikon kalliossa, ja '
      + 'sen kerroksista on tullut yksi arkeologian tärkeimmistä paikoista. Sieltä '
      + 'löytyi kymmeniä Nassarius-kotilon kuoria, joihin on tehty reikä ja jotka '
      + 'ovat kuluneet toisiaan vasten kuin narussa roikkuneet helmet. Toinen '
      + 'löytö on okrapala, johon on kaiverrettu säännöllinen ristikkokuvio. '
      + 'Kolmas on kivensiru, jolle on piirretty okralla ristikko noin 73 000 '
      + 'vuotta sitten: se on vanhin tunnettu ihmisen tekemä piirros.'
      + '\n\n'
      + 'Näiden esineiden merkitys on siinä, etteivät ne tee mitään. Helmi ei '
      + 'leikkaa, kuvio ei metsästä. Ne ovat merkkejä — tapa kertoa jotain '
      + 'itsestään toiselle ihmiselle — ja siksi Blombos muutti käsitystä siitä, '
      + 'milloin ihminen alkoi ajatella symbolein. Aiemmin rajaa pidettiin noin '
      + '40 000 vuoden takaisena ja Euroopassa. Nyt tiedetään, että Afrikassa '
      + 'tehtiin samaa lähes kaksi kertaa aikaisemmin, vaikka kukaan ei väitä '
      + 'näiden olevan maailman ensimmäiset korut. Luolan asukkaat kalastivat, '
      + 'pyydystivät hylkeitä ja valmistivat teräviä luukärkiä.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/blombos.jpg`,
      kuvateksti: 'Blombos, noin 75 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/blombos.jpg`,
      selite: 'Ristikkokuvioinen okrapala ja reiällisiä kotilonkuoria Blomboksen kerroksista.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Blombos Cave"',
  },
  {
    n: 7, tunnus: 'lida-ajer',
    vuosiaSitten: 70000, ajoitus: '73 000–63 000 vuotta sitten',
    otsikko: 'Kaksi hammasta sademetsässä',
    paikka: 'Lida Ajerin luola, Padangin ylängöt', maa: 'Indonesia', lat: -0.2200, lon: 100.6300,
    loyto: 'Hollantilainen Eugène Dubois keräsi luolasta 1890-luvulla laatikollisen '
      + 'hampaita ja luita. Vasta vuonna 2017 kaksi hammasta tunnistettiin '
      + 'nykyihmisen hampaiksi ja kerrokset ajoitettiin 73 000–63 000 vuoden ikäisiksi.',
    selite: 'Sademetsän hämärässä ihminen pysähtyy kuuntelemaan latvustoa, jossa '
      + 'liikkuu jotain näkymätöntä. Täällä ei ole laumoja eikä avointa näkyvyyttä, '
      + 'vain kosteus, hyönteiset ja hajallaan oleva ravinto. Silti täälläkin '
      + 'opittiin elämään.',
    juttu: 'Eugène Dubois tuli Sumatralle etsimään "puuttuvaa rengasta" ja kaivoi '
      + 'kymmeniä luolia; Lida Ajerin löydöt jäivät sadaksi vuodeksi museon '
      + 'laatikoihin. Kun australialainen ryhmä otti ne uudelleen käsiteltäväksi, '
      + 'kaksi hammasta osoittautui mikroskoopissa nykyihmisen hampaiksi — '
      + 'kiillekerroksen paksuus ja juuren muoto erottavat ne orangin ja muiden '
      + 'ihmislajien hampaista. Luolan kerrokset ajoitettiin useilla menetelmillä, '
      + 'ja tulos oli 73 000–63 000 vuotta.'
      + '\n\n'
      + 'Ajoitus on tärkeä, koska se osuu Toban suurpurkauksen tienoille ja koska '
      + 'se sijoittaa nykyihmisen sademetsään paljon aiemmin kuin oli luultu. '
      + 'Sademetsä on vaikea elinympäristö: ravinto on hajallaan latvustossa, '
      + 'suuria saaliseläimiä on vähän ja sairaudet ovat ankaria. Elääkseen siellä '
      + 'täytyy tuntea sadat kasvit ja osata pyydystää pieniä eläimiä. Hampaiden '
      + 'tarkkaa löytöpaikkaa luolastossa ei enää tiedetä eikä sitä, millaista '
      + 'elämää ne edustavat. Ne kertovat kuitenkin yhden asian varmasti: matka '
      + 'Aasian halki ei kulkenut vain rantoja pitkin.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/lida-ajer.jpg`,
      kuvateksti: 'Lida Ajer, noin 70 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/lida-ajer.jpg`,
      selite: 'Kaksi hammasta museon laatikosta — sata vuotta väärin nimettyinä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "List of first human settlements"',
  },
  {
    n: 8, tunnus: 'madjedbebe',
    vuosiaSitten: 57500, ajoitus: '65 000–50 000 vuotta sitten',
    otsikko: 'Yli meren Sahuliin',
    paikka: 'Madjedbebe, Arnhemin maa', maa: 'Australia', lat: -12.5000, lon: 132.8833,
    loyto: 'Hiekkakivikallion suojasta on kaivettu yli satatuhatta esinettä: '
      + 'kiventeriä, hiottuja kirveenteriä, jauhinkiviä ja okraa. Vuoden 2017 '
      + 'ajoitus antoi alimmalle asutuskerrokselle iäksi 65 000 ± 6 000 vuotta.',
    selite: 'Kallion suojassa nainen hiertää siemeniä jauhinkivellä ja pyyhkii '
      + 'kätensä okraan. Toinen hioo kirveenterän särmää kiveä vasten, hitaasti, '
      + 'koska hiominen kestää päiviä. Työ on samaa kuin eilen ja huomenna.',
    juttu: 'Australiaan ei ole koskaan päässyt kuivin jaloin. Jääkauden matalimmillakin '
      + 'merenpinnoilla Sahulin — Australian, Uuden-Guinean ja Tasmanian yhteisen '
      + 'mantereen — ja Aasian väliin jäi vähintään sadan kilometrin merimatka, '
      + 'osa siitä avovettä ilman näköyhteyttä maahan. Madjedbebe on vanhin tunnettu '
      + 'todiste siitä, että tuo matka tehtiin. Paikka on Mirarr-kansan maata, ja '
      + 'kaivaukset on tehty heidän luvallaan ja valvonnassaan. Löydöissä on '
      + 'maailman vanhimpia hiottuja kirveenteriä ja jauhinkiviä sekä valtavasti '
      + 'okraa.'
      + '\n\n'
      + 'Ikä on kiistelty. Vuoden 2017 valoluminesenssiajoitus antoi 65 000 vuotta, '
      + 'mutta osa tutkijoista epäilee, että hiekkakerrosten läpi on valunut '
      + 'nuorempia esineitä alaspäin, ja pitää varmana vain 50 000 vuoden ikää — '
      + 'joka sekin on hyväksytty jo 1990-luvulta. Kummallakin luvulla Australian '
      + 'aboriginaalit ovat maailman pisimpään yhtäjaksoisesti samaa maata '
      + 'asuttanut kansa. Merimatka tarvitsi aluksen, suunnitelman ja ryhmän, joka '
      + 'oli valmis lähtemään näkymättömään suuntaan. Yhtään venettä ei ole '
      + 'säilynyt: koko matkasta on jäljellä vain se, että täällä ollaan.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/madjedbebe.jpg`,
      kuvateksti: 'Madjedbebe, noin 65 000–50 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/madjedbebe.jpg`,
      selite: 'Hiottu kirveenterä ja jauhinkivi Madjedbeben alimmasta asutuskerroksesta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Madjedbebe"',
  },
  {
    n: 9, tunnus: 'denisova',
    vuosiaSitten: 50000, ajoitus: 'noin 50 000 vuotta sitten',
    otsikko: 'Kolme ihmisryhmää, yksi luola',
    paikka: 'Denisovan luola, Altai', maa: 'Venäjä', lat: 51.3975, lon: 84.6761,
    loyto: 'Luolasta löytyi 2008 pieni sormiluun pala, jonka perimä osoitti 2010 '
      + 'kokonaan tuntemattoman ihmisryhmän, denisovalaiset. Samasta luolasta on '
      + 'löytynyt myös noin 50 000 vuotta vanha luuneula.',
    selite: 'Luolan suulle saapuva pieni joukko pysähtyy katsomaan mustaa aukkoa '
      + 'kalliossa. He eivät ole ensimmäisiä täällä eivätkä tiedä sitä. Samassa '
      + 'luolassa on asunut ihmisiä, joiden perimää he kantavat jo mukanaan.',
    juttu: 'Denisovan luola Altain vuorilla on ainoa tunnettu paikka, jossa on '
      + 'jälkiä kolmesta ihmisryhmästä: nykyihmisistä, neandertalilaisista ja '
      + 'denisovalaisista. Denisovalaiset tunnistettiin 2010 pelkästä perimästä, '
      + 'yhdestä sormiluun palasta ja hampaista — ensimmäinen ihmisryhmä, joka on '
      + 'nimetty ennen kuin siitä oli nähty kalloa. Luolasta löytyi myöhemmin myös '
      + 'luunsiru, joka kuului noin 13-vuotiaalle tytölle: hänen äitinsä oli '
      + 'neandertalilainen ja isänsä denisovalainen. Yksi luunpala, ja siinä kaksi '
      + 'ihmisryhmää samassa perheessä.'
      + '\n\n'
      + 'Kohtaamiset näkyvät yhä meissä. Afrikan ulkopuolisilla ihmisillä on noin '
      + 'kahden prosentin verran neandertalilaisperimää, ja Uuden-Guinean sekä '
      + 'Australian alkuperäisväestöillä lisäksi useita prosentteja '
      + 'denisovalaisperimää; Filippiinien aetoilla sitä on eniten maailmassa. '
      + 'Osa perinnöstä on ollut hyödyksi: tiibetiläisten kyky elää ohuessa '
      + 'ilmassa tulee denisovalaisilta. Luolan noin 50 000 vuotta vanha luuneula '
      + 'on maailman vanhin tunnettu, mutta kukaan ei tiedä, kenen käsissä se '
      + 'tehtiin — luolan esineitä ei ole voitu varmasti kiinnittää yhteenkään '
      + 'näistä kolmesta ryhmästä.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/denisova.jpg`,
      kuvateksti: 'Denisovan luola, noin 50 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/denisova.jpg`,
      selite: 'Luuneula, jonka silmä on porattu kivikärjellä — maailman vanhin tunnettu.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Denisova Cave" ja "Denisovan"',
  },
  {
    n: 10, tunnus: 'bacho-kiro',
    vuosiaSitten: 45000, ajoitus: '46 000–43 000 vuotta sitten',
    otsikko: 'Nykyihminen Euroopassa',
    paikka: 'Bacho Kiron luola, Drjanovo', maa: 'Bulgaria', lat: 42.9467, lon: 25.4303,
    loyto: 'Luolan kerroksesta 11 löytyi leukaluun paloja ja rei\'itettyjä '
      + 'karhunhampaita. Hampaat ovat Euroopan vanhimmat tunnetut korut, yli '
      + '43 000 vuotta vanhoja, ja perimä osoitti luiden kuuluneen nykyihmiselle.',
    selite: 'Luolan hämärässä joku kääntelee kädessään karhunhammasta, jonka '
      + 'juureen on porattu reikä. Ulkona on Euroopan jääkausitalvi ja naapureina '
      + 'ihmisiä, jotka eivät ole aivan samanlaisia. Koru kertoo, kenen joukkoon '
      + 'hän kuuluu.',
    juttu: 'Bacho Kiron luola kaivettiin ensin 1970-luvulla, mutta ratkaisu tuli '
      + 'vasta 2020, kun pienistä luunsiruista saatiin perimää. Kolme luolan '
      + 'ihmistä osoittautui nykyihmisiksi, ja he elivät 46 000–43 000 vuotta '
      + 'sitten — varhaisimpia tunnettuja nykyihmisiä Euroopassa. Sitä ennen '
      + 'mannerta olivat asuttaneet neandertalilaiset satojatuhansia vuosia. '
      + 'Kerroksesta 11 löytyneet rei\'itetyt karhunhampaat ovat maanosan vanhimmat '
      + 'tunnetut korut, ja ne muistuttavat hämmentävän paljon niitä, joita '
      + 'neandertalilaiset tekivät hieman myöhemmin Ranskassa.'
      + '\n\n'
      + 'Perimä kertoi vielä yhden asian: jokaisella kolmella oli lähisukulaisena '
      + 'neandertalilainen, kuudennen tai seitsemännen sukupolven takana. Kyse ei '
      + 'siis ollut kaukaisesta muinaisesta sekoittumisesta vaan tapahtumasta, joka '
      + 'oli sadan vuoden päässä heidän omasta elämästään. Bacho Kiron ihmisten '
      + 'jälkeläiset eivät jääneet Eurooppaan: heidän perimänsä näkyy paremmin '
      + 'nykyisissä itäaasialaisissa kuin eurooppalaisissa. Ensimmäinen tulo '
      + 'Eurooppaan ei siis ollut sama kuin jääminen.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/bacho-kiro.jpg`,
      kuvateksti: 'Bacho Kiro, noin 45 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/bacho-kiro.jpg`,
      selite: 'Rei\'itetty karhunhammas kerroksesta 11 — Euroopan vanhin tunnettu koru.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Bacho Kiro Cave"',
  },
  {
    n: 11, tunnus: 'lake-mungo',
    vuosiaSitten: 42000, ajoitus: 'noin 42 000 vuotta sitten',
    otsikko: 'Mungon nainen ja mies',
    paikka: 'Mungojärvi, Willandran järvialue', maa: 'Australia', lat: -33.7500, lon: 143.0833,
    loyto: 'Geologi Jim Bowler löysi 1968 hiekkatörmästä poltetut luut, jotka ovat '
      + 'maailman vanhimpia tunnettuja tuhkauksia. Kuusi vuotta myöhemmin samalta '
      + 'alueelta löytyi hauta, jonka vainaja oli peitetty punaisella okralla.',
    selite: 'Kuivuvan järven rannalla joku kohentaa tuhkaa kepillä ja katsoo veteen. '
      + 'Kädessä on punaista okraa, jota ei ole täältä; se on kannettu satojen '
      + 'kilometrien päästä. Kuolleiden muistamiseen nähtiin vaivaa jo silloin, '
      + 'kun ihmisiä oli koko mantereella vain kourallinen.',
    juttu: 'Willandran järvet olivat 40 000 vuotta sitten täynnä vettä, kalaa ja '
      + 'lintuja, ja niiden rannoilla asui ihmisiä. Mungon nainen poltettiin, '
      + 'luut murskattiin ja haudattiin; Mungon mies laskettiin selälleen, kädet '
      + 'ristissä sylissä, ja peitettiin okralla. Molemmat ovat vanhimpia tunnettuja '
      + 'todisteita monimutkaisista hautausmenoista koko maailmassa, eivät vain '
      + 'Australiassa. Alue kuuluu Paakantji-, Mutthi Mutthi- ja Ngiyampaa-kansoille, '
      + 'ja luut palautettiin heille — Mungon mies haudattiin uudelleen 2022.'
      + '\n\n'
      + 'Ajoitus on ollut riidan aihe. Vuonna 1999 julkaistu tutkimus antoi luille '
      + 'iäksi noin 62 000 vuotta, mikä olisi tehnyt niistä paljon vanhempia kuin '
      + 'muut Australian löydöt. Jim Bowlerin ryhmä mittasi haudan hiekkakerrokset '
      + 'uudelleen ja päätyi 2003 lukuun 40 000 ± 2 000 vuotta, jota nykyään '
      + 'pidetään luotettavimpana. Ero syntyi siitä, mitä oikeastaan ajoitettiin: '
      + 'luuta, sen ympärillä olevaa hiekkaa vai hiekan alla olevaa kerrosta. '
      + 'Mungon löydöt myös muuttivat Australian tapaa tehdä arkeologiaa — ne '
      + 'veivät alkuperäiskansojen oikeuden esivanhempiinsa julkiseen käsittelyyn.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/lake-mungo.jpg`,
      kuvateksti: 'Lake Mungo, noin 42 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/lake-mungo.jpg`,
      selite: 'Punaista okraa ja hiekkatörmän kerrokset, joista Mungon löydöt paljastuivat.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Lake Mungo remains"',
  },
  {
    n: 12, tunnus: 'tianyuan',
    vuosiaSitten: 40500, ajoitus: '42 000–39 000 vuotta sitten',
    otsikko: 'Kalastaja Pekingin lähellä',
    paikka: 'Tianyuanin luola, Peking', maa: 'Kiina', lat: 39.6797, lon: 115.9461,
    loyto: 'Luolasta kerättiin 34 luunpalaa, jotka kuuluvat samalle ihmiselle. '
      + 'Radiohiiliajoitus antoi iäksi 42 000–39 000 vuotta, ja luista saatiin '
      + 'perimä — yksi vanhimmista, joita nykyihmisestä on onnistuttu lukemaan.',
    selite: 'Pieni joukko nousee rinnettä kohti kalkkikiven halkeamia, sauvat '
      + 'käsissä. Yhden heistä luiden kemia kertoo, että makean veden kala ruokki '
      + 'hänet vuodesta toiseen. Hän eli nelikymppiseksi, hampaat kuluneina.',
    juttu: 'Tianyuanin luola on muutaman kilometrin päässä Zhoukoudianista, jossa '
      + 'löydettiin aikoinaan "Pekingin ihminen" — paljon vanhempi Homo erectus. '
      + 'Tianyuanin mies on nykyihminen ja eli 42 000–39 000 vuotta sitten. Hänen '
      + 'luidensa isotoopeista näkyy jotain harvinaista: suuri osa ravinnosta oli '
      + 'makean veden kalaa. Se on vanhin tunnettu merkki siitä, että ihminen '
      + 'kalasti järjestelmällisesti sisämaassa. Työkaluja tai muuta kulttuuria '
      + 'luolasta ei löytynyt, joten hänestä tiedetään vain se, minkä luut '
      + 'kertovat — eikä siitäkään, kenen kanssa hän kulki.'
      + '\n\n'
      + 'Perimä kertoi paljon. Tianyuanin mies oli jo eronnut eurooppalaisten '
      + 'esivanhemmista ja kuului siihen itäiseen sukuhaaraan, josta polveutuvat '
      + 'nykyiset itä- ja kaakkoisaasialaiset, siperialaiset ja Amerikan '
      + 'alkuperäiskansat. Hän ei kuitenkaan ollut suoraan kenenkään nykyisen '
      + 'esivanhempi vaan varhainen, sivuun jäänyt oksa samasta puusta. Hänellä oli '
      + 'myös denisovalaisperimää saman verran kuin nykyisillä itäaasialaisilla, '
      + 'eli kohtaamiset olivat tapahtuneet jo ennen häntä.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/tianyuan.jpg`,
      kuvateksti: 'Tianyuan, noin 40 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/tianyuan.jpg`,
      selite: 'Tianyuanin miehen sääriluu ja leukaluu — 34 palaa yhdestä ihmisestä.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Tianyuan man"',
  },
  {
    n: 13, tunnus: 'niah',
    vuosiaSitten: 40000, ajoitus: 'noin 40 000 vuotta sitten',
    otsikko: 'Syvä kallo',
    paikka: 'Niahin luolat, Sarawak', maa: 'Malesia', lat: 3.8139, lon: 113.7814,
    loyto: 'Barbara Harrisson löysi helmikuussa 1958 kuumaksi ristityn kaivauskuopan '
      + 'pohjalta osittaisen kallon lähes kolmen metrin syvyydestä. "Syvä kallo" oli '
      + 'kauan Kaakkois-Aasian vanhin tunnettu nykyihmisen jäänne.',
    selite: 'Valtavan luolan suulla ihmiset kantavat sisään polttopuita ja '
      + 'kasvinippuja ja katsovat ylös pimeään holviin. Luola on kuiva, viileä ja '
      + 'niin suuri, ettei sen kattoa erota. Ulkopuolella on sademetsä, jonka läpi '
      + 'ei näe sataa metriä.',
    juttu: 'Niahin jättiläismäiset luolat Borneon pohjoisosassa ovat olleet ihmisten '
      + 'käytössä kymmeniätuhansia vuosia. Sarawakin museon johtaja Tom Harrisson '
      + 'aloitti kaivaukset 1954 sillä perusteella, että luola oli viileä ja kuiva '
      + 'ja siellä oli syötäviä lepakoita ja pääskyjä. Vuonna 1958 hänen vaimonsa '
      + 'Barbara Harrisson löysi "Hell Trench" -nimisestä kuopasta osittaisen '
      + 'kallon. Hiilikerrosten radiohiiliajoitus antoi paikalle iäksi noin 40 000 '
      + 'vuotta, mikä oli aikanaan hämmästyttävä luku.'
      + '\n\n'
      + 'Ajoitusta epäiltiin vuosikymmeniä, koska luolan kerrokset ovat sekoittuneet '
      + 'ja koska 1950-luvun menetelmät olivat karkeita. Uudet kaivaukset '
      + '2000-luvulla vahvistivat, että kallo on aidosti pleistoseenikautinen, '
      + 'joskin tarkka ikä asettuu lähemmäs 37 000 vuotta. Löydöt kertovat, että '
      + 'sademetsässä osattiin elää: luolan ihmiset pyydystivät metsän eläimiä, '
      + 'keräsivät myrkyllisiä juuria ja osasivat käsitellä ne syötäviksi. Se '
      + 'vaatii tietoa, joka siirtyy vain puheen ja opetuksen kautta — eikä '
      + 'sellainen tieto jätä jälkeä maahan.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/niah.jpg`,
      kuvateksti: 'Niahin luola, noin 40 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/niah.jpg`,
      selite: 'Niahin "syvä kallo": yläleuka, kaksi poskihammasta ja kallonpohjan pala.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Niah National Park"',
  },
  {
    n: 14, tunnus: 'chauvet',
    vuosiaSitten: 36000, ajoitus: '37 000–33 500 vuotta sitten',
    otsikko: 'Hevoset ja sarvikuonot seinällä',
    paikka: 'Chauvet\'n luola, Ardèche', maa: 'Ranska', lat: 44.3875, lon: 4.4142,
    loyto: 'Kolme luolatutkijaa löysi 18. joulukuuta 1994 kallionkolosta käytävän, '
      + 'joka johti koskemattomaan luolaan. Seinillä oli satoja maalauksia, ja '
      + 'mustimmat niistä on ajoitettu 37 000–33 500 vuoden ikäisiksi.',
    selite: 'Kivikuppiin suojattu hiillos valaisee seinää, jolle piirtäjä vetää '
      + 'hevosen kaulan yhdellä varmalla liikkeellä. Vieressä kaksi sarvikuonoa '
      + 'painaa sarvet vastakkain. Kallion pullistuma jätetään näkyviin, jotta '
      + 'eläin näyttäisi kääntyvän.',
    juttu: 'Chauvet\'n luola sinetöityi vuorenvyörymässä yli kaksikymmentätuhatta '
      + 'vuotta sitten, ja siksi sen sisus on säilynyt niin kuin viimeinen kävijä '
      + 'sen jätti: seinillä maalauksia, lattialla luolakarhun kuoppia, tuhkaa ja '
      + 'lapsen jalanjälkiä. Maalauksissa on yli kolmesataa eläintä — hevosia, '
      + 'sarvikuonoja, leijonia, mammutteja — ja niissä käytetään varjostusta, '
      + 'päällekkäisyyttä ja kallion omia muotoja liikkeen tunnun luomiseen. '
      + 'Piirtäjät myös raaputtivat seinän puhtaaksi ennen työtä.'
      + '\n\n'
      + 'Ajoituksesta kiisteltiin pitkään, koska tekniikka näytti liian '
      + 'kehittyneeltä ollakseen vanhinta luolataidetta. Vuoden 2016 tutkimus, '
      + 'jossa käytettiin 88 uutta radiohiilinäytettä, osoitti luolassa käydyn '
      + 'kahdesti: ensin 37 000–33 500 ja sitten 31 000–28 000 vuotta sitten. '
      + 'Suurin osa mustista piirroksista on vanhemmalta jaksolta, mutta yksikään '
      + 'seinä ei syntynyt yhdessä illassa. Se tarkoittaa, ettei taito kehittynyt '
      + 'kömpelöstä taitavaan: ensimmäiset tunnetut maalarit olivat jo mestareita. '
      + 'Luola on suljettu yleisöltä, ja lähelle on rakennettu tarkka jäljennös.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/chauvet.jpg`,
      kuvateksti: 'Chauvet’n luola, noin 36 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/chauvet.jpg`,
      selite: 'Hevospaneelin hiilipiirros, jossa neljä päätä nousee peräkkäin kalliosta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Chauvet Cave"',
  },
  {
    n: 15, tunnus: 'yana',
    vuosiaSitten: 32000, ajoitus: 'noin 32 000 vuotta sitten',
    otsikko: 'Napapiirin pohjoispuolella',
    paikka: 'Yana RHS, Janajoki', maa: 'Venäjä', lat: 70.7236, lon: 135.4297,
    loyto: 'Geologi löysi 1993 jokitörmästä keihäänvarren, joka oli tehty '
      + 'villisarvikuonon sarvesta. Sen ohjaamana paikannettiin 2001 leiripaikka, '
      + 'joka on noin 32 000 vuotta vanha ja pohjoisin tunnettu tämän ikäinen.',
    selite: 'Matalan nahkasuojuksen takana mies sitoo sarvesta veistettyä kärkeä '
      + 'keihääseen paljain sormin, koska solmua ei saa rukkasilla. Ympärillä ei '
      + 'ole puita, vain heinää, luuta ja tuulta. Täällä ihminen elää siitä, minkä '
      + 'osaa tehdä itse.',
    juttu: 'Janajoen leiripaikka on satakunta kilometriä joen suulta, kaukana '
      + 'napapiirin pohjoispuolella. Se löytyi, kun ikirouta suli ja törmästä alkoi '
      + 'pudota luita. Paikka on aikansa pohjoisin tunnettu ihmisasumus koko '
      + 'maailmassa ja osoittaa, että jääkauden ihminen selvisi olosuhteissa, joissa '
      + 'talvi on pimeä ja kylmä kahdeksan kuukautta. Löydöissä on kymmeniätuhansia '
      + 'esineitä: helmiä, koristeltuja norsunluukiekkoja, neuloja ja keihäänvarsia. '
      + 'Yana on myös vanhin selvä todiste mammutinmetsästyksestä.'
      + '\n\n'
      + 'Vuonna 2019 kahden nuoren miehen hampaista saatiin perimä, ja se osoittautui '
      + 'kokonaan uudeksi väestöksi: "muinaiset pohjois-siperialaiset". Heidän '
      + 'jälkeläisensä sekoittuivat myöhemmin idästä tulleisiin ryhmiin, ja tuosta '
      + 'sekoituksesta syntyi se väestö, joka lopulta siirtyi Amerikkaan. Yanan '
      + 'ihmiset eivät siis olleet umpikuja vaan yksi Amerikan asuttamisen '
      + 'esivaiheista. Elääkseen täällä he tarvitsivat ommellut vaatteet — ja siksi '
      + 'neula on tässä kaaressa yhtä tärkeä keksintö kuin veneet ja kirveet.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/yana.jpg`,
      kuvateksti: 'Yana, noin 32 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/yana.jpg`,
      selite: 'Villisarvikuonon sarvesta veistetty keihäänvarsi, jonka routa työnsi esiin.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Yana Rhinoceros Horn Site"',
  },
  {
    n: 16, tunnus: 'white-sands',
    vuosiaSitten: 22000, ajoitus: '23 000–21 000 vuotta sitten',
    otsikko: 'Jalanjäljet järven rannalla',
    paikka: 'White Sands, Tularosan allas', maa: 'Yhdysvallat', lat: 32.7792, lon: -106.1719,
    loyto: 'Kuivuneen Otero-järven rannalta paljastui vuodesta 2009 alkaen 61 '
      + 'ihmisen jalanjälkeä. Vuonna 2021 jälkien kerroksista löytyneet siemenet '
      + 'ajoitettiin 23 000–21 000 vuoden ikäisiksi.',
    selite: 'Nuori nainen kantaa pikkulasta lonkallaan pitkin märkää rantaa, '
      + 'laskee sen välillä maahan ja nostaa taas. Kaukana rannan takana liikkuu '
      + 'maalaiska. Paluumatkalla jäljet ovat kevyemmät: lapsi jäi jonnekin.',
    juttu: 'Jalanjäljet ovat arkeologian herkin todiste: ne syntyvät yhdessä '
      + 'hetkessä eivätkä valehtele siitä, kuka niitä teki. White Sandsin jäljet '
      + 'ovat litteäjalkaisia kuin kengättömillä kulkijoilla, ja suurin osa niistä '
      + 'on lasten ja nuorten. Yksi jälkisarja seuraa maalaiskan jälkiä, ja laiska '
      + 'on kohdassa noussut takajaloilleen ja kääntynyt ympäri. Toinen sarja '
      + 'kertoo yli kilometrin matkasta, jonka joku kulki lapsi sylissä ja palasi '
      + 'ilman; kesken matkan jälkien yli on kävellyt mammutti poikkeamatta '
      + 'suunnastaan.'
      + '\n\n'
      + 'Ajoitus on yhä kiistelty. Ensimmäinen ikä saatiin vesikasvin siemenistä, '
      + 'ja vesikasvit voivat ottaa hiilensä vanhasta järvivedestä, jolloin '
      + 'radiohiili näyttää liian vanhaa. Myöhemmät mittaukset männyn siitepölystä '
      + 'ja kvartsihiekan valoluminesenssista antoivat kuitenkin saman tuloksen. '
      + 'Jos luku pitää, ihmisiä oli Pohjois-Amerikan eteläpuolella jo silloin, kun '
      + 'jäätiköt olivat laajimmillaan ja reitti etelään pitäisi olla suljettu. '
      + 'Sitä on vaikea sovittaa muuhun tietoon — ja juuri siksi jäljet ovat yksi '
      + 'alan kuumimmista kysymyksistä.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/white-sands.jpg`,
      kuvateksti: 'White Sands, noin 23 000–21 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/white-sands.jpg`,
      selite: 'Paljaan jalan jälki kipsihiekassa: kantapää, jalkaholvi ja varpaat.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "White Sands footprints"',
  },
  {
    n: 17, tunnus: 'beringia',
    vuosiaSitten: 20000, ajoitus: 'noin 20 000 vuotta sitten',
    otsikko: 'Maasilta, jota ei enää ole',
    paikka: 'Beringia, Beringinsalmi', maa: 'Beringinsalmi', lat: 65.7500, lon: -168.9769,
    loyto: 'Beringiaa ei kaivettu esiin vaan pääteltiin. Kasvitieteilijä Eric Hultén '
      + 'nimesi 1937 kasvien levinneisyyden perusteella maa-alueen, jonka meri on '
      + 'sittemmin peittänyt; merenpinnan historia ja perimäntutkimus ovat '
      + 'sittemmin vahvistaneet sen.',
    selite: 'Ruohoisella tasangolla kulkee perhe, eikä merta näy kumpaankaan '
      + 'suuntaan, vaikka sitä on molemmin puolin. Ei jäätä, ei jyrkänteitä — vain '
      + 'kuivaa aroa ja tuulen kuljettamaa pölyä. Kukaan täällä ei tiedä '
      + 'siirtyvänsä maanosasta toiseen.',
    juttu: 'Kun jääkausi sitoi vettä mannerjäätiköihin, meri laski yli sata metriä '
      + 'ja Beringinsalmen matala pohja nousi kuivaksi maaksi. Parhaimmillaan '
      + 'silta oli tuhat kilometriä leveä — ei siis silta vaan oma maansa, '
      + 'ruohoinen ja kuiva mammuttiaro, jolla asuttiin. Merenpinnan historian '
      + 'perusteella maayhteys oli auki noin 30 000 vuoden takaa siihen asti, kun '
      + 'meri palasi noin 11 000 vuotta sitten. Beringia oli myös kasvien ja '
      + 'eläinten turvapaikka, kun ympäröivä maailma oli jään alla.'
      + '\n\n'
      + 'Perimäntutkimus kertoo, mitä siellä tapahtui. Muutaman tuhannen ihmisen '
      + 'joukko siirtyi Siperiasta Beringiaan viimeisen jääkauden huipulla ja jäi '
      + 'sinne tuhansiksi vuosiksi eristyksiin: sitä kutsutaan Beringian '
      + 'pysähdykseksi, ja se näkyy Amerikan alkuperäiskansojen perimässä omana '
      + 'haaranaan. Kun jäätiköt vetäytyivät, joukko lähti etelään ja levisi '
      + 'kahdelle mantereelle. Tarkka ajankohta on auki: jos White Sandsin '
      + 'jalanjäljet ovat oikein ajoitettu, ihmisiä oli etelässä jo ennen kuin '
      + 'perinteinen reitti pitäisi olla auennut. Meri peitti maan lopullisesti, '
      + 'eikä kukaan mennyt sitä kautta enää takaisin.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/beringia.jpg`,
      kuvateksti: 'Beringia, noin 20 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/beringia.jpg`,
      selite: 'Mammuttiaron ruohoa ja luuta hiekassa — sillasta ei jäänyt muuta.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Beringia"',
  },
  {
    n: 18, tunnus: 'monte-verde',
    vuosiaSitten: 14500, ajoitus: 'noin 14 500 vuotta sitten',
    otsikko: 'Turpeen alle jäänyt leiri',
    paikka: 'Monte Verde, Llanquihue', maa: 'Chile', lat: -41.5047, lon: -73.2044,
    loyto: 'Puron törmä syöpyi 1975 auki ja paljasti luita, joita paikalliset '
      + 'pitivät lehmän jäänteinä. Turpeen alla oli säilynyt kokonainen leiri: '
      + 'pitkä puinen runko, köyttä, tulisijoja ja ruoantähteitä.',
    selite: 'Puron varressa seisoo pitkä puinen runko, joka on jaettu useaan '
      + 'lokeroon ja katettu nahoilla. Joku sitoo kasvikuidusta punottua narua '
      + 'tolpan ympäri. Muutaman vuoden kuluttua suo peittää tämän kaiken ja '
      + 'säilyttää sen neljäksitoista vuosituhanneksi.',
    juttu: 'Monte Verden kaivaus mursi arkeologian sitkeimmän oppirakennelman. '
      + 'Vuosikymmeniä uskottiin, että Amerikan ensimmäiset asukkaat olivat '
      + 'Clovis-kulttuurin metsästäjiä noin 13 000 vuotta sitten. Monte Verde on '
      + 'ainakin 14 500 vuotta vanha ja mantereen toisessa päässä, Chilen '
      + 'eteläosassa — mikä tarkoittaa, että ihmiset olivat kulkeneet koko '
      + 'Amerikan halki jo aiemmin. Tom Dillehayn kaivauksia epäiltiin ankarasti, '
      + 'kunnes tutkijaryhmä kävi paikan päällä 1997 ja hyväksyi ajoituksen.'
      + '\n\n'
      + 'Erikoista paikassa on säilyvyys. Suon hapeton turve säilytti puun, narun, '
      + 'nahan ja kasvinjätteet, joita ei tavallisesti jää jäljelle lainkaan. '
      + 'Leirin asukkaat söivät juurikasveja, pähkinöitä, merilevää ja '
      + 'gomphotherium-nimisen norsun sukuisen eläimen lihaa. Merilevä oli tuotu '
      + 'kuudenkymmenen kilometrin päästä rannikolta, mikä kertoo joko liikkumisesta '
      + 'tai vaihtokaupasta. Kiista ei ole ohi: vuonna 2026 julkaistiin väite, '
      + 'jonka mukaan itse leiri olisi paljon nuorempi ja vanhat esineet vain '
      + 'huuhtoutuneet mukaan. Väite on kiistetty, mutta se kertoo, kuinka tarkasti '
      + 'tällaista paikkaa punnitaan.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/monte-verde.jpg`,
      kuvateksti: 'Monte Verde, noin 14 500 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/monte-verde.jpg`,
      selite: 'Turpeessa säilynyt puutappi ja kasvikuidusta punottu naru.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Monte Verde"',
  },
  {
    n: 19, tunnus: 'lapita',
    vuosiaSitten: 2850, ajoitus: 'noin 3 000 vuotta sitten',
    otsikko: 'Savenvalajat avomerellä',
    paikka: 'Nukuleka, Tongatapu', maa: 'Tonga ja Samoa', lat: -21.1514, lon: -175.1261,
    loyto: 'Kalastajakylän mullasta kaivettiin 2000-luvulla lapita-kulttuurin '
      + 'leimakuvioisia saviastioita. Korallista tehty hiomakivi ajoitettiin 2012 '
      + 'uraani-torium-menetelmällä noin 2 840 vuoden ikäiseksi.',
    selite: 'Nainen painaa hammastetulla työkalulla riviä pisteitä märkään saveen, '
      + 'aina samalla kuviolla, jonka hänen äitinsä opetti. Rannassa on sika ja '
      + 'kaukana lahdella kanootin siluetti. Kylä on muutaman vuoden vanha, ja '
      + 'astia kertoo, mistä he tulivat.',
    juttu: 'Lapita-kulttuuri on Tyynenmeren asuttamisen nimi. Sen kantajat lähtivät '
      + 'liikkeelle Kaakkois-Aasian saarilta, veivät mukanaan sian, kanan, koiran, '
      + 'taron ja jamssin ja purjehtivat muutamassa vuosisadassa tuhansia '
      + 'kilometrejä itään. Heidät tunnistaa saviastioista, joihin on painettu '
      + 'hammastetulla leimalla hienoja geometrisia kuvioita — sama tyyli toistuu '
      + 'Bismarckin saaristosta Uuteen-Kaledoniaan, Fidžille, Tongaan ja Samoaan. '
      + 'Yhtään lapita-kanoottia ei ole säilynyt.'
      + '\n\n'
      + 'Nukuleka on ollut Tongan ensimmäinen kylä ja siten yksi Polynesian '
      + 'vanhimmista. Kaivauksia johtanut David Burley kutsui sitä "Polynesian '
      + 'kehdoksi", mikä ei ole jäänyt kiistattomaksi: Samoa on pitänyt samaa '
      + 'nimeä itsellään vuosikymmeniä, ja tongalainen tutkija Okusitino Māhina on '
      + 'arvostellut päätelmiä. Purjehdukset eivät olleet ajelehtimista. Ne '
      + 'vaativat kaksirunkoisen aluksen, tähtitaivaan lukemisen, tiedon '
      + 'aallokosta ja lintujen lentoreiteistä — sekä paluumatkan mahdollisuuden, '
      + 'sillä kukaan ei vie perhettään paikkaan, jota ei löydä uudelleen.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/lapita.jpg`,
      kuvateksti: 'Lapita, Tonga ja Samoa, noin 3 000 vuotta sitten',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/lapita.jpg`,
      selite: 'Lapita-astian pala, jonka reunaan on leimattu rivi hammastettuja kuvioita.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Nukuleka" ja "Lapita culture"',
  },
  {
    n: 20, tunnus: 'aotearoa',
    vuosiaSitten: 750, ajoitus: 'noin 1250–1300 jaa.',
    otsikko: 'Viimeinen suuri maa',
    paikka: 'Wairau Bar (Te Pokohiwi), Marlborough', maa: 'Uusi-Seelanti', lat: -41.5094, lon: 174.0638,
    loyto: 'Koulupoika Jim Eyles löysi 1939 joensuun sorasärkältä esineitä, ja '
      + 'kaivauksissa paljastui asuinpaikka ja hautausmaa. Se on Uuden-Seelannin '
      + 'varhaisimpia tunnettuja asuinpaikkoja, noin vuodelta 1280.',
    selite: 'Sorasärkän rannassa ihmiset kantavat mukanaan tuotuja taimia varovasti '
      + 'kuin lasta, ja kaukana lahdella lepää kanootti. Metsän reunassa seisoo '
      + 'moa, joka ei ole oppinut pelkäämään ketään. Tämä on viimeinen suuri maa, '
      + 'jolle kukaan ei ole ehtinyt ennen heitä.',
    juttu: 'Uusi-Seelanti oli viimeinen suuri asuinkelpoinen maa-alue maapallolla, '
      + 'jolle ihminen saapui. Itä-Polynesiasta purjehtineet kulkijat löysivät sen '
      + 'noin vuonna 1280 — samaan aikaan kun Euroopassa rakennettiin goottilaisia '
      + 'katedraaleja. Wairau Barin eli Te Pokohiwin sorasärkältä on kaivettu noin '
      + 'kaksituhatta esinettä ja 44 hautaa. Esineet, kuten kirveet ja '
      + 'yksiosaiset kalastusvieheet, ovat tyyliltään suoraan Itä-Polynesiasta, '
      + 'ja luiden analyysit osoittavat, että osa vainajista oli syntynyt muualla: '
      + 'nämä olivat ensimmäisen polven tulijoita.'
      + '\n\n'
      + 'Paikka on Rangitāne o Wairau -iwin esivanhempien hautausmaa. Vuonna 1939 '
      + 'alkaneet kaivaukset tehtiin aikansa tavalla, ja luut vietiin museoon; '
      + 'vuonna 2009 ne palautettiin ja haudattiin uudelleen seremonioin, ja '
      + 'tutkimus jatkui iwin luvalla ja ehdoilla. Luiden hampaat kertovat kovista '
      + 'lapsuusvuosista ja lyhyestä elämästä: vanhin haudatuista oli 39-vuotias. '
      + 'Uuden maan ensimmäiset vuodet olivat rankkoja — mutta tästä särkältä alkaa '
      + 'maorien historia Aotearoassa, ja tähän päättyy ihmisen ensimmäinen matka '
      + 'maapallon ympäri.',
    kuva: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/aotearoa.jpg`,
      kuvateksti: 'Aotearoa, noin 1250–1300 jaa.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esine: {
      osoite: `${IHMISEN_MATKA_KUVAJUURI}/esine/aotearoa.jpg`,
      selite: 'Yksiosainen kalastusviehe ja kivikirves Wairau Barin haudoista.',
      lahde: 'Matkakirjan havainnekuva',
    },
    esineAito: null,
    lahde: 'en-Wikipedia "Wairau Bar"',
  },
];

/*
 * HAVAINNEKUVAN SELITE ON AINA PYSÄKIN SELITE (tehtävänanto 5.9.2026).
 * Teksti kopioidaan tässä yhdestä paikasta, jotta se ei pääse
 * erkanemaan, kun selitettä hiotaan — kahdesti kirjoitettu kuvateksti
 * on juuri se kohta, joka jää päivittämättä. Kuvaputken oma lyhyt rivi
 * (`kuva.kuvateksti`) on eri asia eikä sitä kosketa täällä.
 */
for (const pysakki of IHMISEN_MATKA) pysakki.kuva.selite = pysakki.selite;
