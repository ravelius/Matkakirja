/**
 * Ihmisen matka -linssin valmiit kysymykset ja esikirjoitetut vastaukset.
 *
 * Omistajan linjaus 19.9.2026 klo 18.02 (Raamattu): "Tässä pitäisi olla
 * tuon tekstin tilalla muutama valmis kysymys riippuen siitä missä
 * kohtaa pelaaja on. Ne voisi tehdä valmiiksi etukäteen joka paikkaan
 * Linssissä." Livia-pulu (tuuraa Viisasta Pöllöä tässä linssissä)
 * esittää kolme valmista kysymystä jokaisella kaaren PÄÄJAKSOLLA — ei
 * IHMISEN_MATKA_LISANOSTOT-taulun kohteille, joilla on jo oma
 * `kysymykset`-kenttänsä (js/linssit/ihmisen-matka-data.js).
 *
 * Rakenne on tarkoituksella sama kuin js/linssit/astronaut-kysymykset.js:
 * kolme kysymystä per jakso ja niille esikirjoitetut vastaukset lähteineen.
 * Tieto on peräisin joko jakson omasta tekstistä (loyto/selite/juttu) tai
 * en-Wikipedian vastaavasta artikkelista (sama artikkeli, joka on jakson
 * `lahde`-kentässä) — ei arvattuja lukuja eikä vuosilukuja.
 */
export const IHMISEN_MATKAN_KYSYMYKSET = {
  'jebel-irhoud': {
    kysymykset: [
      'Miten kallo päätyi ensin kaivostyömiehen matkamuistoksi?',
      'Miksi löydöt luokiteltiin aluksi neandertalilaisiksi?',
      'Mitä vuoden 2017 uusi ajoitus muutti käsityksessä ihmislajin alusta?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten kallo päätyi ensin kaivostyömiehen matkamuistoksi?',
        vastaus: 'Jebel Irhoudin kukkula oli 1960-luvulla baryyttikaivos, ja vuonna 1961 kaivostyömies irrotti kallon luolan seinästä. Se kulki jonkin aikaa hänen omana matkamuistonaan, ennen kuin päätyi Rabatin yliopistolle tutkittavaksi.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Jebel_Irhoud', title: 'en-Wikipedia: Jebel Irhoud' }],
      },
      {
        kysymys: 'Miksi löydöt luokiteltiin aluksi neandertalilaisiksi?',
        vastaus: 'Luiden seurana kaivettiin mousterien-tyyppisiä kiviteriä, jollaisia tunnettiin neandertalilaisten käytöstä, ja siksi löydöt merkittiin heidän jäänteikseen. Virhe seisoi yli neljäkymmentä vuotta, kunnes uusi kaivausryhmä palasi paikalle 2004.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Jebel_Irhoud', title: 'en-Wikipedia: Jebel Irhoud' }],
      },
      {
        kysymys: 'Mitä vuoden 2017 uusi ajoitus muutti käsityksessä ihmislajin alusta?',
        vastaus: 'Uusi ajoitus siirsi lajimme alkua noin sadallatuhannella vuodella taaksepäin ja samalla pois ajatuksesta yhdestä itäafrikkalaisesta kehdosta: ihmisiä oli jo tuolloin Afrikan laidasta laitaan. Kasvot olivat jo meidän kasvomme, mutta aivokoppa oli vielä pitkulainen.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Jebel_Irhoud', title: 'en-Wikipedia: Jebel Irhoud' }],
      },
    ],
  },
  'omo-kibish': {
    kysymykset: [
      'Miksi luiden ikää oli aluksi vaikea määrittää?',
      'Mitä tuhkakerros luiden yläpuolella paljasti vuonna 2022?',
      'Miksi Omo I:n ikä ilmoitetaan "vähintään" eikä tarkkana lukuna?',
    ],
    vastaukset: [
      {
        kysymys: 'Miksi luiden ikää oli aluksi vaikea määrittää?',
        vastaus: 'Omo Kibishin löytöjen ympäriltä ei juuri saatu eläinluita eikä kivityökaluja, eli mitään, mikä olisi kertonut iän tavanomaisin keinoin. Ratkaisu löytyi lopulta maaperästä: alueen tulivuoret ovat jättäneet toistuvia tuhkakerroksia, jotka voidaan ajoittaa argonmenetelmällä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Omo_remains', title: 'en-Wikipedia: Omo remains' }],
      },
      {
        kysymys: 'Mitä tuhkakerros luiden yläpuolella paljasti vuonna 2022?',
        vastaus: 'Tutkijaryhmä tunnisti luiden yläpuolella olevan paksun tuhkakerroksen erään tunnetun tulivuorenpurkauksen tuotteeksi ja sai näin luille vähimmäisiän: Omo I on vähintään noin 233 000 vuotta vanha. Aiempi, vuoden 2004 luku 195 000 tuli luiden alapuolisesta kerroksesta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Omo_remains', title: 'en-Wikipedia: Omo remains' }],
      },
      {
        kysymys: 'Miksi Omo I:n ikä ilmoitetaan "vähintään" eikä tarkkana lukuna?',
        vastaus: 'Kahden luvun ero on mittaustapa eikä riita: alapuolisen kerroksen ajoitus kertoo, milloin maa oli valmiina, yläpuolisen tuhkan ajoitus taas sen, milloin se peitettiin. Kumpikaan ei siis anna luun omaa syntyhetkeä, vaan haarukan, jonka sisällä se on.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Omo_remains', title: 'en-Wikipedia: Omo remains' }],
      },
    ],
  },
  'pinnacle-point': {
    kysymykset: [
      'Miksi tutkija etsi ihmisen jälkiä juuri tältä rannikolta?',
      'Mitä simpukankuoret ja okra kertovat täällä eläneistä ihmisistä?',
      'Mikä kivenkäsittelymenetelmä paikalta löytyi?',
    ],
    vastaukset: [
      {
        kysymys: 'Miksi tutkija etsi ihmisen jälkiä juuri tältä rannikolta?',
        vastaus: 'Paleoantropologi Curtis Marean etsi kartalta paikkoja, joissa ihminen olisi voinut selvitä jääkauden kuivuudesta, ja päätyi Etelä-Afrikan etelärannikolle: siellä missä maa ei anna, meri antaa. Luola 13B osoitti hänen olleen oikeassa.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Pinnacle_Point', title: 'en-Wikipedia: Pinnacle Point' }],
      },
      {
        kysymys: 'Mitä simpukankuoret ja okra kertovat täällä eläneistä ihmisistä?',
        vastaus: 'Alimmista kerroksista löytyi simpukankuoria noin 164 000 vuoden takaa, mikä osoittaa ihmisten käyneen rannalla säännöllisesti ja tuntevan vuoroveden. Samoista kerroksista löytyi myös raaputettua ja jauhettua okraa, jota on käytetty väriaineeksi.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Pinnacle_Point', title: 'en-Wikipedia: Pinnacle Point' }],
      },
      {
        kysymys: 'Mikä kivenkäsittelymenetelmä paikalta löytyi?',
        vastaus: 'Myöhemmistä kerroksista löytyivät vanhimmat tunnetut jäljet kiven lämpökäsittelystä: kiveä haudattiin nuotion alle, jotta se lohkeaisi paremmin. Se on merkki siitä, että näitä ihmisiä ei riittänyt pelkkä hengissä pysyminen, vaan he suunnittelivat monivaiheisia töitä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Pinnacle_Point', title: 'en-Wikipedia: Pinnacle Point' }],
      },
    ],
  },
  'skhul-qafzeh': {
    kysymykset: [
      'Miksi näitä hautoja pidetään maailman vanhimpina tarkoituksellisina hautauksina?',
      'Mitä näille varhaisille retkeläisille lopulta tapahtui?',
      'Miksi löydöt luokiteltiin aluksi omaksi lajikseen?',
    ],
    vastaukset: [
      {
        kysymys: 'Miksi näitä hautoja pidetään maailman vanhimpina tarkoituksellisina hautauksina?',
        vastaus: 'Skhulin ja Qafzehin vainajien mukana on okraa, simpukankuoria ja kerran myös peuran sarvet — esineitä, jotka on asetettu hautaan tarkoituksella eikä sattumalta. Siksi haudat lasketaan maailman vanhimmiksi tunnetuiksi tarkoituksellisiksi hautauksiksi.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Skhul_and_Qafzeh_hominins', title: 'en-Wikipedia: Skhul and Qafzeh hominins' }],
      },
      {
        kysymys: 'Mitä näille varhaisille retkeläisille lopulta tapahtui?',
        vastaus: 'Kaikkien Afrikan ulkopuolisten nykyihmisten perimä osoittaa yhteistä lähtöä vasta noin 60 000 vuoden takaa, joten Skhulin ja Qafzehin väki ei todennäköisesti ole kenenkään nykyisen esivanhempi. Ilmasto kuivui ja sulki vihreän käytävän, eikä paluuta ollut.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Skhul_and_Qafzeh_hominins', title: 'en-Wikipedia: Skhul and Qafzeh hominins' }],
      },
      {
        kysymys: 'Miksi löydöt luokiteltiin aluksi omaksi lajikseen?',
        vastaus: 'Kaivajat luokittelivat Skhulin ja Qafzehin luut 1939 omaksi lajikseen, ennen kuin ne myöhemmin tunnistettiin Homo sapiensiksi. Luita pidettiin vuosikymmeniä epäselvinä juuri siksi, että ne olivat samalla kertaa tuttuja ja vieraita.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Skhul_and_Qafzeh_hominins', title: 'en-Wikipedia: Skhul and Qafzeh hominins' }],
      },
    ],
  },
  blombos: {
    kysymykset: [
      'Mitä merkitystä helmillä ja kaiverretulla okralla on, kun ne eivät auta ruoan hankinnassa?',
      'Kuinka vanha luolan piirros on ja miksi se on erityinen?',
      'Miten Blombos muutti käsitystä siitä, milloin ihminen alkoi ajatella symbolein?',
    ],
    vastaukset: [
      {
        kysymys: 'Mitä merkitystä helmillä ja kaiverretulla okralla on, kun ne eivät auta ruoan hankinnassa?',
        vastaus: 'Helmi ei leikkaa eikä kuvio metsästä — ne ovat merkkejä, tapa kertoa jotain itsestään toiselle ihmiselle. Blombosin reiälliset kotilonkuoret ja kaiverretut okrapalat ovat juuri tällaisia: esineitä, jotka eivät tee mitään käytännöllistä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Blombos_Cave', title: 'en-Wikipedia: Blombos Cave' }],
      },
      {
        kysymys: 'Kuinka vanha luolan piirros on ja miksi se on erityinen?',
        vastaus: 'Kivensirulle piirrettiin okralla ristikkokuvio noin 73 000 vuotta sitten, ja se on vanhin tunnettu ihmisen tekemä piirros. Kuvio ei metsästä eikä leikkaa mitään — se vain kertoo, että joku halusi jättää merkin.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Blombos_Cave', title: 'en-Wikipedia: Blombos Cave' }],
      },
      {
        kysymys: 'Miten Blombos muutti käsitystä siitä, milloin ihminen alkoi ajatella symbolein?',
        vastaus: 'Aiemmin symbolisen ajattelun rajaa pidettiin noin 40 000 vuoden takaisena ja sijoitettiin Eurooppaan. Blombosin löydöt osoittivat, että Afrikassa tehtiin samaa lähes kaksi kertaa aikaisemmin, vaikka kukaan ei väitä niiden olevan maailman ensimmäiset korut.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Blombos_Cave', title: 'en-Wikipedia: Blombos Cave' }],
      },
    ],
  },
  'al-wusta': {
    kysymykset: [
      'Mistä ainoasta löydöstä tieto ihmisen käynnistä täällä perustuu?',
      'Millainen paikka Al Wusta oli silloin verrattuna nykyiseen autiomaahan?',
      'Mitä löytö kertoo ihmisten kulkureiteistä Arabian niemimaalla?',
    ],
    vastaukset: [
      {
        kysymys: 'Mistä ainoasta löydöstä tieto ihmisen käynnistä täällä perustuu?',
        vastaus: 'Kuivuneen järven pohjalta löytyi vain yksi ainoa ihmisen sormen keskijäsen, joka ajoitettiin vuonna 2018 noin 88 000 vuoden ikäiseksi. Se erotettiin neandertalilaisen vastaavasta luusta mittaamalla sen muotoa, ja se on vanhin tunnettu ihmisfossiili Afrikan ja Levantin ulkopuolelta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Arabian_Peninsula', title: 'en-Wikipedia: Arabian Peninsula' }],
      },
      {
        kysymys: 'Millainen paikka Al Wusta oli silloin verrattuna nykyiseen autiomaahan?',
        vastaus: 'Jääkausien lämpimillä välikausilla monsuunit ylsivät Arabian niemimaalle ja sen painanteisiin syntyi satoja järviä. Al Wustan sedimentistä nousi virtahevon, villinaudan ja antiloopin luita — kokonainen savannin eläimistö nykyisen hiekkadyynin paikalla.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Nafud_desert', title: 'en-Wikipedia: Nafud desert' }],
      },
      {
        kysymys: 'Mitä löytö kertoo ihmisten kulkureiteistä Arabian niemimaalla?',
        vastaus: 'Löytö osoittaa, ettei ihmisen tunnettu leviäminen kulkenut pelkkää rannikkoa pitkin: Arabian sisämaan läpi mentiin silloin, kun siellä oli vettä. Ilmasto avasi ja sulki tämän kulkureitin monta kertaa, ja suurin osa siellä silloin olleista ihmisistä jäi näiden ovien väliin.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Arabian_Peninsula', title: 'en-Wikipedia: Arabian Peninsula' }],
      },
    ],
  },
  'lida-ajer': {
    kysymykset: [
      'Miten hampaat lopulta tunnistettiin nykyihmisen hampaiksi, yli sata vuotta löydön jälkeen?',
      'Miksi hampaiden ajoitus 73 000–63 000 vuotta on tärkeä?',
      'Millainen elinympäristö sademetsä oli varhaiselle ihmiselle?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten hampaat lopulta tunnistettiin nykyihmisen hampaiksi, yli sata vuotta löydön jälkeen?',
        vastaus: 'Eugène Dubois kaivoi hampaat esiin 1890-luvulla, mutta ne makasivat museon laatikoissa sadan vuoden ajan. Kun australialainen ryhmä otti ne uudelleen käsiteltäväksi, kaksi hammasta osoittautui mikroskoopissa nykyihmisen hampaiksi: kiillekerroksen paksuus ja juuren muoto erottavat ne orangin hampaista.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/List_of_first_human_settlements', title: 'en-Wikipedia: List of first human settlements' }],
      },
      {
        kysymys: 'Miksi hampaiden ajoitus 73 000–63 000 vuotta on tärkeä?',
        vastaus: 'Ajoitus osuu Toban suurpurkauksen tienoille ja sijoittaa nykyihmisen sademetsään paljon aiemmin kuin oli luultu. Se kertoo yhden asian varmasti: matka Aasian halki ei kulkenut vain rantoja pitkin.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/List_of_first_human_settlements', title: 'en-Wikipedia: List of first human settlements' }],
      },
      {
        kysymys: 'Millainen elinympäristö sademetsä oli varhaiselle ihmiselle?',
        vastaus: 'Sademetsä on vaikea elinympäristö: ravinto on hajallaan latvustossa, suuria saaliseläimiä on vähän ja sairaudet ovat ankaria. Elääkseen siellä täytyi tuntea sadat kasvit ja osata pyydystää pieniä eläimiä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/List_of_first_human_settlements', title: 'en-Wikipedia: List of first human settlements' }],
      },
    ],
  },
  madjedbebe: {
    kysymykset: [
      'Kuinka pitkä ja vaarallinen merimatka Sahuliin oli?',
      'Miksi vuoden 2017 ajoitus on kiistelty?',
      'Mitä paikalta löytyi ja mitä se kertoo?',
    ],
    vastaukset: [
      {
        kysymys: 'Kuinka pitkä ja vaarallinen merimatka Sahuliin oli?',
        vastaus: 'Jääkauden matalimmillakin merenpinnoilla Sahulin ja Aasian väliin jäi vähintään sadan kilometrin merimatka, osa siitä avovettä ilman näköyhteyttä maahan. Merimatka tarvitsi aluksen, suunnitelman ja ryhmän, joka oli valmis lähtemään näkymättömään suuntaan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Madjedbebe', title: 'en-Wikipedia: Madjedbebe' }],
      },
      {
        kysymys: 'Miksi vuoden 2017 ajoitus on kiistelty?',
        vastaus: 'Vuoden 2017 valoluminesenssiajoitus antoi alimmalle kerrokselle iäksi 65 000 vuotta, mutta osa tutkijoista epäilee, että hiekkakerrosten läpi on valunut nuorempia esineitä alaspäin. He pitävät varmana vain 50 000 vuoden ikää, joka sekin on hyväksytty jo 1990-luvulta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Madjedbebe', title: 'en-Wikipedia: Madjedbebe' }],
      },
      {
        kysymys: 'Mitä paikalta löytyi ja mitä se kertoo?',
        vastaus: 'Kaivauksista on noussut yli satatuhatta esinettä, joiden joukossa on maailman vanhimpia hiottuja kirveenteriä ja jauhinkiviä sekä valtavasti okraa. Se kertoo pitkäjänteisestä työstä — hiominen kestää päiviä — eikä vain hengissä pysymisestä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Madjedbebe', title: 'en-Wikipedia: Madjedbebe' }],
      },
    ],
  },
  denisova: {
    kysymykset: [
      'Miten denisovalaiset alun perin tunnistettiin, vaikka heistä ei ollut nähty yhtään kalloa?',
      'Mitä luunsiru kertoi 13-vuotiaan tytön vanhemmista?',
      'Missä nykyihmisissä denisovalaisperimää on eniten?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten denisovalaiset alun perin tunnistettiin, vaikka heistä ei ollut nähty yhtään kalloa?',
        vastaus: 'Denisovalaiset tunnistettiin 2010 pelkästä perimästä, yhdestä sormiluun palasta ja hampaista. He olivat ensimmäinen ihmisryhmä, joka nimettiin ennen kuin siitä oli nähty kalloa lainkaan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Denisova_Cave', title: 'en-Wikipedia: Denisova Cave' }],
      },
      {
        kysymys: 'Mitä luunsiru kertoi 13-vuotiaan tytön vanhemmista?',
        vastaus: 'Luolasta löytyi luunsiru, joka kuului noin 13-vuotiaalle tytölle, jonka äiti oli neandertalilainen ja isä denisovalainen. Yksi luunpala, ja siinä kaksi eri ihmisryhmää samassa perheessä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Denisova_Cave', title: 'en-Wikipedia: Denisova Cave' }],
      },
      {
        kysymys: 'Missä nykyihmisissä denisovalaisperimää on eniten?',
        vastaus: 'Filippiinien aetoilla denisovalaisperimää on eniten koko maailmassa, ja myös Uuden-Guinean ja Australian alkuperäisväestöillä sitä on useita prosentteja. Osa perinnöstä on ollut suoraan hyödyksi: tiibetiläisten kyky elää ohuessa ilmassa periytyy denisovalaisilta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Denisovan', title: 'en-Wikipedia: Denisovan' }],
      },
    ],
  },
  'bacho-kiro': {
    kysymykset: [
      'Miten luolan ihmisten laji lopulta varmistui, vaikka kaivaus tehtiin jo 1970-luvulla?',
      'Mitä perimä kertoi näiden ihmisten sukulaisuudesta neandertalilaisiin?',
      'Minne Bacho Kiron ihmisten jälkeläiset lopulta päätyivät?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten luolan ihmisten laji lopulta varmistui, vaikka kaivaus tehtiin jo 1970-luvulla?',
        vastaus: 'Ratkaisu tuli vasta 2020, kun pienistä luunsiruista saatiin perimä. Kolme luolan ihmistä osoittautui nykyihmisiksi, ja he elivät 46 000–43 000 vuotta sitten — varhaisimpia tunnettuja nykyihmisiä Euroopassa.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Bacho_Kiro_Cave', title: 'en-Wikipedia: Bacho Kiro Cave' }],
      },
      {
        kysymys: 'Mitä perimä kertoi näiden ihmisten sukulaisuudesta neandertalilaisiin?',
        vastaus: 'Jokaisella kolmella oli lähisukulaisena neandertalilainen vain kuudennen tai seitsemännen sukupolven takana. Kyse ei siis ollut kaukaisesta muinaisesta sekoittumisesta vaan tapahtumasta, joka oli sadan vuoden päässä heidän omasta elämästään.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Bacho_Kiro_Cave', title: 'en-Wikipedia: Bacho Kiro Cave' }],
      },
      {
        kysymys: 'Minne Bacho Kiron ihmisten jälkeläiset lopulta päätyivät?',
        vastaus: 'He eivät jääneet Eurooppaan: heidän perimänsä näkyy paremmin nykyisissä itäaasialaisissa kuin eurooppalaisissa. Ensimmäinen tulo Eurooppaan ei siis ollut sama asia kuin sinne jääminen.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Bacho_Kiro_Cave', title: 'en-Wikipedia: Bacho Kiro Cave' }],
      },
    ],
  },
  'lake-mungo': {
    kysymykset: [
      'Miten Mungon nainen ja Mungon mies haudattiin eri tavoin?',
      'Mistä Mungon miehen okra oli peräisin?',
      'Miksi Mungon löytöjen ikä on ollut kiistan aihe?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten Mungon nainen ja Mungon mies haudattiin eri tavoin?',
        vastaus: 'Mungon nainen poltettiin ja luut murskattiin ennen hautaamista, kun taas Mungon mies laskettiin selälleen, kädet ristissä sylissä, ja peitettiin punaisella okralla. Molemmat ovat vanhimpia tunnettuja todisteita monimutkaisista hautausmenoista koko maailmassa.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Lake_Mungo_remains', title: 'en-Wikipedia: Lake Mungo remains' }],
      },
      {
        kysymys: 'Mistä Mungon miehen okra oli peräisin?',
        vastaus: 'Okraa ei löydy järven ympäristöstä, vaan se oli kannettu satojen kilometrien päästä. Se kertoo, että kuolleiden muistamiseen nähtiin vaivaa jo silloin, kun ihmisiä oli koko mantereella vain kourallinen.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Lake_Mungo_remains', title: 'en-Wikipedia: Lake Mungo remains' }],
      },
      {
        kysymys: 'Miksi Mungon löytöjen ikä on ollut kiistan aihe?',
        vastaus: 'Vuonna 1999 julkaistu tutkimus antoi luille iäksi noin 62 000 vuotta, mutta Jim Bowlerin ryhmä mittasi haudan hiekkakerrokset uudelleen ja päätyi 2003 lukuun 40 000 ± 2 000 vuotta, jota nykyään pidetään luotettavimpana. Ero syntyi siitä, mitä oikeastaan ajoitettiin: luuta, sen ympärillä olevaa hiekkaa vai hiekan alla olevaa kerrosta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Lake_Mungo_remains', title: 'en-Wikipedia: Lake Mungo remains' }],
      },
    ],
  },
  tianyuan: {
    kysymykset: [
      'Mitä Tianyuanin miehen luiden kemia paljasti hänen ruokavaliostaan?',
      'Mitä perimä kertoi hänen sukulaisuudestaan nykyisiin väestöihin?',
      'Miten Tianyuanin luola liittyy toiseen kuuluisaan löytöön lähistöllä?',
    ],
    vastaukset: [
      {
        kysymys: 'Mitä Tianyuanin miehen luiden kemia paljasti hänen ruokavaliostaan?',
        vastaus: 'Hänen luidensa isotoopeista näkyy jotain harvinaista: suuri osa ravinnosta oli makean veden kalaa. Se on vanhin tunnettu merkki siitä, että ihminen kalasti järjestelmällisesti sisämaassa.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Tianyuan_man', title: 'en-Wikipedia: Tianyuan man' }],
      },
      {
        kysymys: 'Mitä perimä kertoi hänen sukulaisuudestaan nykyisiin väestöihin?',
        vastaus: 'Tianyuanin mies oli jo eronnut eurooppalaisten esivanhemmista ja kuului itäiseen sukuhaaraan, josta polveutuvat nykyiset itä- ja kaakkoisaasialaiset, siperialaiset ja Amerikan alkuperäiskansat. Hän ei kuitenkaan ollut suoraan kenenkään nykyisen esivanhempi, vaan varhainen, sivuun jäänyt oksa samasta puusta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Tianyuan_man', title: 'en-Wikipedia: Tianyuan man' }],
      },
      {
        kysymys: 'Miten Tianyuanin luola liittyy toiseen kuuluisaan löytöön lähistöllä?',
        vastaus: 'Tianyuanin luola on muutaman kilometrin päässä Zhoukoudianista, jossa löydettiin aikoinaan paljon vanhempi "Pekingin ihminen", Homo erectus. Tianyuanin mies sen sijaan on nykyihminen ja eli vasta 42 000–39 000 vuotta sitten.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Tianyuan_man', title: 'en-Wikipedia: Tianyuan man' }],
      },
    ],
  },
  niah: {
    kysymykset: [
      'Miten "syvä kallo" löydettiin ja mistä syvyydestä?',
      'Miksi kallon ajoitusta epäiltiin vuosikymmenten ajan?',
      'Mitä löydöt kertovat siitä, miten ihmiset osasivat elää sademetsässä?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten "syvä kallo" löydettiin ja mistä syvyydestä?',
        vastaus: 'Barbara Harrisson löysi helmikuussa 1958 kuumaksi ristityn "Hell Trench" -kaivauskuopan pohjalta osittaisen kallon lähes kolmen metrin syvyydestä. Löytö oli kauan Kaakkois-Aasian vanhin tunnettu nykyihmisen jäänne.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Niah_National_Park', title: 'en-Wikipedia: Niah National Park' }],
      },
      {
        kysymys: 'Miksi kallon ajoitusta epäiltiin vuosikymmenten ajan?',
        vastaus: 'Ajoitusta epäiltiin, koska luolan kerrokset ovat sekoittuneet ja koska 1950-luvun menetelmät olivat karkeita. Vasta 2000-luvun uudet kaivaukset vahvistivat kallon aidosti pleistoseenikautiseksi, joskin tarkka ikä asettuu lähemmäs 37 000 vuotta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Niah_National_Park', title: 'en-Wikipedia: Niah National Park' }],
      },
      {
        kysymys: 'Mitä löydöt kertovat siitä, miten ihmiset osasivat elää sademetsässä?',
        vastaus: 'Luolan ihmiset pyydystivät metsän eläimiä, keräsivät myrkyllisiä juuria ja osasivat käsitellä ne syötäviksi. Se vaatii tietoa, joka siirtyy vain puheen ja opetuksen kautta — eikä sellainen tieto jätä jälkeä maahan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Niah_National_Park', title: 'en-Wikipedia: Niah National Park' }],
      },
    ],
  },
  chauvet: {
    kysymykset: [
      'Miten luola pysyi koskemattomana yli 20 000 vuotta?',
      'Miksi luolan ajoituksesta kiisteltiin pitkään?',
      'Mitä vuoden 2016 tutkimus 88 radiohiilinäytteellä paljasti?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten luola pysyi koskemattomana yli 20 000 vuotta?',
        vastaus: 'Chauvet’n luola sinetöityi vuorenvyörymässä yli kaksikymmentätuhatta vuotta sitten, ja siksi sen sisus säilyi juuri sellaisena kuin viimeinen kävijä sen jätti. Kolme luolatutkijaa löysi 18. joulukuuta 1994 kallionkolosta käytävän, joka johti tähän koskemattomaan tilaan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Chauvet_Cave', title: 'en-Wikipedia: Chauvet Cave' }],
      },
      {
        kysymys: 'Miksi luolan ajoituksesta kiisteltiin pitkään?',
        vastaus: 'Ajoituksesta kiisteltiin, koska maalausten tekniikka näytti liian kehittyneeltä ollakseen vanhinta tunnettua luolataidetta. Epäilyt hälvenivät vasta, kun maalauksia verrattiin laajaan radiohiilinäytteistöön.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Chauvet_Cave', title: 'en-Wikipedia: Chauvet Cave' }],
      },
      {
        kysymys: 'Mitä vuoden 2016 tutkimus 88 radiohiilinäytteellä paljasti?',
        vastaus: 'Tutkimus osoitti luolassa käydyn kahdesti: ensin 37 000–33 500 ja sitten 31 000–28 000 vuotta sitten. Se tarkoittaa, ettei taito kehittynyt kömpelöstä taitavaan — ensimmäiset tunnetut maalarit olivat jo mestareita.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Chauvet_Cave', title: 'en-Wikipedia: Chauvet Cave' }],
      },
    ],
  },
  yana: {
    kysymykset: [
      'Miten leiripaikka löytyi Janajoen varrelta?',
      'Mitä perimä paljasti kahden nuoren miehen hampaista vuonna 2019?',
      'Miksi neula on tässä kaaressa yhtä tärkeä keksintö kuin veneet?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten leiripaikka löytyi Janajoen varrelta?',
        vastaus: 'Geologi löysi 1993 jokitörmästä keihäänvarren, joka oli tehty villisarvikuonon sarvesta, ja sen ohjaamana leiripaikka paikannettiin vuonna 2001. Paikka löytyi lopulta, kun ikirouta suli ja luita alkoi pudota törmästä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Yana_Rhinoceros_Horn_Site', title: 'en-Wikipedia: Yana Rhinoceros Horn Site' }],
      },
      {
        kysymys: 'Mitä perimä paljasti kahden nuoren miehen hampaista vuonna 2019?',
        vastaus: 'Hampaista saatu perimä osoittautui kokonaan uudeksi väestöksi, "muinaisiksi pohjois-siperialaisiksi". Heidän jälkeläisensä sekoittuivat myöhemmin idästä tulleisiin ryhmiin, ja tuosta sekoituksesta syntyi lopulta se väestö, joka siirtyi Amerikkaan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Yana_Rhinoceros_Horn_Site', title: 'en-Wikipedia: Yana Rhinoceros Horn Site' }],
      },
      {
        kysymys: 'Miksi neula on tässä kaaressa yhtä tärkeä keksintö kuin veneet?',
        vastaus: 'Napapiirin pohjoispuolella talvi on pimeä ja kylmä kahdeksan kuukautta, ja elääkseen täällä ihmiset tarvitsivat ommellut vaatteet. Löydöissä on neuloja, koristeltuja norsunluukiekkoja ja keihäänvarsia — Yana on myös vanhin selvä todiste mammutinmetsästyksestä.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Yana_Rhinoceros_Horn_Site', title: 'en-Wikipedia: Yana Rhinoceros Horn Site' }],
      },
    ],
  },
  'white-sands': {
    kysymykset: [
      'Mitä yksi jälkisarja kertoo lapsen kantajasta?',
      'Miksi jälkien ajoitus on kiistanalainen?',
      'Mitä jäljet kertovat siitä, ketkä täällä kulkivat?',
    ],
    vastaukset: [
      {
        kysymys: 'Mitä yksi jälkisarja kertoo lapsen kantajasta?',
        vastaus: 'Yksi jälkisarja kertoo yli kilometrin matkasta, jonka joku kulki lapsi sylissä ja palasi ilman — paluumatkalla jäljet ovat kevyemmät. Kesken matkan jälkien yli on kävellyt mammutti poikkeamatta suunnastaan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/White_Sands_footprints', title: 'en-Wikipedia: White Sands footprints' }],
      },
      {
        kysymys: 'Miksi jälkien ajoitus on kiistanalainen?',
        vastaus: 'Ensimmäinen ikä saatiin vesikasvin siemenistä, ja vesikasvit voivat ottaa hiilensä vanhasta järvivedestä, jolloin radiohiili näyttää liian vanhaa. Myöhemmät mittaukset männyn siitepölystä ja kvartsihiekan valoluminesenssista antoivat kuitenkin saman tuloksen, mikä pitää kiistan yhä avoimena.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/White_Sands_footprints', title: 'en-Wikipedia: White Sands footprints' }],
      },
      {
        kysymys: 'Mitä jäljet kertovat siitä, ketkä täällä kulkivat?',
        vastaus: 'White Sandsin jäljet ovat litteäjalkaisia kuin kengättömillä kulkijoilla, ja suurin osa niistä on lasten ja nuorten. Jalanjäljet ovat arkeologian herkin todiste: ne syntyvät yhdessä hetkessä eivätkä valehtele siitä, kuka niitä teki.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/White_Sands_footprints', title: 'en-Wikipedia: White Sands footprints' }],
      },
    ],
  },
  beringia: {
    kysymykset: [
      'Miten Beringian olemassaolo pääteltiin, vaikka sitä ei kaivettu esiin?',
      'Mikä oli Beringian pysähdys ja miten se näkyy nykyisin?',
      'Kuinka leveä maasilta oli parhaimmillaan?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten Beringian olemassaolo pääteltiin, vaikka sitä ei kaivettu esiin?',
        vastaus: 'Kasvitieteilijä Eric Hultén nimesi Beringian jo 1937 kasvien levinneisyyden perusteella; hän päätteli meren peittämän maa-alueen olemassaolon ilman että sitä oli koskaan nähty. Merenpinnan historia ja perimäntutkimus ovat sittemmin vahvistaneet päätelmän.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Beringia', title: 'en-Wikipedia: Beringia' }],
      },
      {
        kysymys: 'Mikä oli Beringian pysähdys ja miten se näkyy nykyisin?',
        vastaus: 'Muutaman tuhannen ihmisen joukko siirtyi Siperiasta Beringiaan viimeisen jääkauden huipulla ja jäi sinne tuhansiksi vuosiksi eristyksiin — sitä kutsutaan Beringian pysähdykseksi. Se näkyy yhä Amerikan alkuperäiskansojen perimässä omana haaranaan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Beringia', title: 'en-Wikipedia: Beringia' }],
      },
      {
        kysymys: 'Kuinka leveä maasilta oli parhaimmillaan?',
        vastaus: 'Parhaimmillaan silta oli tuhat kilometriä leveä — ei siis kapea silta vaan oma ruohoinen ja kuiva mammuttiaronsa, jolla myös asuttiin. Meri palasi lopulta noin 11 000 vuotta sitten eikä maayhteyttä enää ole.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Beringia', title: 'en-Wikipedia: Beringia' }],
      },
    ],
  },
  'monte-verde': {
    kysymykset: [
      'Miten löytö kumosi pitkään uskotun käsityksen Amerikan ensimmäisistä asukkaista?',
      'Mikä paikassa säilyi poikkeuksellisen hyvin ja miksi?',
      'Mitä leirin asukkaat söivät?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten löytö kumosi pitkään uskotun käsityksen Amerikan ensimmäisistä asukkaista?',
        vastaus: 'Vuosikymmeniä uskottiin, että Amerikan ensimmäiset asukkaat olivat Clovis-kulttuurin metsästäjiä noin 13 000 vuotta sitten. Monte Verde on ainakin 14 500 vuotta vanha ja mantereen toisessa päässä, Chilen eteläosassa — se todistaa, että ihmiset olivat kulkeneet koko Amerikan halki jo aiemmin.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Monte_Verde', title: 'en-Wikipedia: Monte Verde' }],
      },
      {
        kysymys: 'Mikä paikassa säilyi poikkeuksellisen hyvin ja miksi?',
        vastaus: 'Suon hapeton turve säilytti puun, narun, nahan ja kasvinjätteet, joita ei tavallisesti jää jäljelle lainkaan. Löydöissä on muun muassa pitkä puinen runko ja köyttä — esineitä, jotka useimmilta yhtä vanhoilta leireiltä ovat lahonneet kokonaan.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Monte_Verde', title: 'en-Wikipedia: Monte Verde' }],
      },
      {
        kysymys: 'Mitä leirin asukkaat söivät?',
        vastaus: 'Leirin asukkaat söivät juurikasveja, pähkinöitä, merilevää ja gomphotherium-nimisen norsun sukuisen eläimen lihaa. Merilevä oli tuotu kuudenkymmenen kilometrin päästä rannikolta, mikä kertoo joko liikkumisesta tai vaihtokaupasta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Monte_Verde', title: 'en-Wikipedia: Monte Verde' }],
      },
    ],
  },
  lapita: {
    kysymykset: [
      'Mistä lapita-kulttuurin kantajat lähtivät liikkeelle ja mitä he veivät mukanaan?',
      'Miten lapita-kulttuurin ihmiset tunnistetaan arkeologisista löydöistä?',
      'Mitä pitkä purjehdus vaati onnistuakseen?',
    ],
    vastaukset: [
      {
        kysymys: 'Mistä lapita-kulttuurin kantajat lähtivät liikkeelle ja mitä he veivät mukanaan?',
        vastaus: 'Lapita-kulttuurin kantajat lähtivät liikkeelle Kaakkois-Aasian saarilta ja veivät mukanaan sian, kanan, koiran, taron ja jamssin. He purjehtivat muutamassa vuosisadassa tuhansia kilometrejä itään.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Lapita_culture', title: 'en-Wikipedia: Lapita culture' }],
      },
      {
        kysymys: 'Miten lapita-kulttuurin ihmiset tunnistetaan arkeologisista löydöistä?',
        vastaus: 'Heidät tunnistaa saviastioista, joihin on painettu hammastetulla leimalla hienoja geometrisia kuvioita. Sama tyyli toistuu Bismarckin saaristosta Uuteen-Kaledoniaan, Fidžille, Tongaan ja Samoaan asti.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Lapita_culture', title: 'en-Wikipedia: Lapita culture' }],
      },
      {
        kysymys: 'Mitä pitkä purjehdus vaati onnistuakseen?',
        vastaus: 'Purjehdukset eivät olleet ajelehtimista: ne vaativat kaksirunkoisen aluksen, tähtitaivaan lukemisen, tiedon aallokosta ja lintujen lentoreiteistä. Ne vaativat myös paluumatkan mahdollisuuden, sillä kukaan ei vie perhettään paikkaan, jota ei löydä uudelleen.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Nukuleka', title: 'en-Wikipedia: Nukuleka' }],
      },
    ],
  },
  aotearoa: {
    kysymykset: [
      'Miten Wairau Barin löytö tehtiin?',
      'Mitä luiden analyysi paljasti haudatuista ihmisistä?',
      'Millaista elämä oli uuden maan ensimmäisinä vuosina?',
    ],
    vastaukset: [
      {
        kysymys: 'Miten Wairau Barin löytö tehtiin?',
        vastaus: 'Koulupoika Jim Eyles löysi vuonna 1939 joensuun sorasärkältä esineitä, ja myöhemmissä kaivauksissa paljastui koko asuinpaikka ja hautausmaa. Se on Uuden-Seelannin varhaisimpia tunnettuja asuinpaikkoja, noin vuodelta 1280.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Wairau_Bar', title: 'en-Wikipedia: Wairau Bar' }],
      },
      {
        kysymys: 'Mitä luiden analyysi paljasti haudatuista ihmisistä?',
        vastaus: 'Luiden analyysit osoittavat, että osa vainajista oli syntynyt muualla kuin Uudessa-Seelannissa — he olivat ensimmäisen polven tulijoita. Esineet, kuten kirveet ja yksiosaiset kalastusvieheet, ovat tyyliltään suoraan Itä-Polynesiasta.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Wairau_Bar', title: 'en-Wikipedia: Wairau Bar' }],
      },
      {
        kysymys: 'Millaista elämä oli uuden maan ensimmäisinä vuosina?',
        vastaus: 'Luiden hampaat kertovat kovista lapsuusvuosista ja lyhyestä elämästä: vanhin haudatuista oli vain 39-vuotias. Uuden maan ensimmäiset vuodet olivat rankkoja, mutta juuri tästä särkältä alkaa maorien historia Aotearoassa.',
        lahteet: [{ url: 'https://en.wikipedia.org/wiki/Wairau_Bar', title: 'en-Wikipedia: Wairau Bar' }],
      },
    ],
  },
};

/** Nykyiseen nosto.kysymykset-kenttään; tuntematon jakso ei saa arvattuja kysymyksiä. */
export function haeIhmisenMatkanKysymykset(tunnus) {
  return [...(IHMISEN_MATKAN_KYSYMYKSET[tunnus]?.kysymykset ?? [])];
}

/** Täsmällinen esikirjoitettu vastaus. Renderöi tekstinä, älä innerHTML:nä. */
export function haeIhmisenMatkanVastaus(tunnus, kysymys) {
  if (typeof kysymys !== 'string') return null;
  const row = IHMISEN_MATKAN_KYSYMYKSET[tunnus]?.vastaukset?.find(item => item.kysymys === kysymys.trim());
  return row ? { ...row, lahteet: row.lahteet.map(source => ({ ...source })) } : null;
}
