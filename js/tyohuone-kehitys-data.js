/*
 * Työhuoneen Kehitys-välilehden sisältö (omistajan tilaus 8.8.2026:
 * "kokeillaan ja kuuntelen, miten ne toimivat" + "kirjoita myös
 * sinne, miten ajattelit koko ison kaaren"). Fable kirjoittaa tämän
 * tiedoston sisällön; Sonnet rakentaa välilehden, joka näyttää sen.
 *
 * Euroopan valmiit tekstit äänineen välilehti lukee suoraan
 * paketeista (EUROPE_SAAPUMISET, KOHTAAMISET) — tänne kirjataan
 * vain se, mitä ei ole pelissä: kaari, ääninäytteet ja
 * mannerkokeilut. Näytetiedostot: assets/audio/naytteet/.
 */

/** Ison kaaren esittely omistajalle — jaksotettuna lukukappaleiksi. */
export const KEHITYS_KAARI = [
  {
    otsikko: 'Mistä pelissä on kyse',
    teksti: 'Reginald Fogg perii isoisänsä Horation matkapäiväkirjan '
      + 'vuodelta 1873 ja lähtee kulkemaan sen jälkiä. Pelin runko on '
      + 'kahden äänen vuoropuhelu: Reginaldin nykyhetki ja Horation '
      + 'vuosi 1873 samalla sivulla. Tieto asuu sanomalehdessä, imu '
      + 'matkakirjassa — tämä jako on kaiken sisällön perussääntö.',
  },
  {
    otsikko: 'Dekkarikerros',
    teksti: 'Horatio ei vain matkustanut — häntä seurattiin. '
      + 'Antikvaari Ezekiel Grimshaw halusi Aarnin luettelon itselleen, '
      + 'ja hänen varjonsa näkyy vuoden 1873 merkinnöissä: sähkeet '
      + '("PALATKAA HETI. G. TIETÄÄ."), vaihdetut majatalot, kadotetut '
      + 'seuraajat. Nykyajassa Reginald alkaa huomata samaa: tuore '
      + 'liituristi sillankaiteessa, käyntikortti jossa lukee E. G., '
      + 'tummansininen sateenvarjo aukiolla. Sääntö on: askeleet '
      + 'sumussa kyllä, vaara ei — tämä on lasten peli, ja jännitys '
      + 'purkautuu aina joko arvoitukseksi tai lämmöksi, kuten '
      + 'Edinburghin tykinlaukaus.',
  },
  {
    otsikko: 'Seitsemän säveltä',
    teksti: 'Dekkari ei ole pelkkää jännitystä. Merkinnät kiertävät '
      + 'seitsemää säveltä: jännitys, arvoitus, lämpö, huumori, '
      + 'haikeus, ihmetys ja hengähdys. Euroopassa jännitteisiä on '
      + 'noin joka neljäs kaupunki, ja raja ei ole määrä vaan '
      + 'vaihtelu — sama temppu ei toistu naapurikaupungeissa, ja '
      + 'lämpimät ja rauhalliset merkinnät antavat jännitykselle '
      + 'kaikupohjan.',
  },
  {
    otsikko: 'Aarrejuoni ja vihjeet',
    teksti: 'Tutkimusmatkailija Aarnin luettelo lupaa jokaiselle '
      + 'maanosalle unohdetun aarteen: Euroopassa Meripihkahuone, '
      + 'Afrikassa Suuren Zimbabwen kivilintu, Aasiassa keisarin '
      + 'jadesinetti, ja niin edelleen. Aarrejahti kulkee isoisän '
      + 'taitetuilla sivuilla — vihjeillä, jotka nousevat esiin '
      + 'kaupunkien välissä matkalla ja kertovat suunnan, eivät '
      + 'koskaan kaupunkia. Kaupunkimerkinnät eivät viittaa '
      + 'pääaarteeseen: dekkarikoukut ja aarrevihjeet ovat kaksi eri '
      + 'lankaa, jotka eivät sotke toisiaan.',
  },
  {
    otsikko: 'Maanosien luonteet',
    teksti: 'Jokainen lauta saa oman motiiviperheensä, eivätkä '
      + 'Euroopan langat (liituristi, sähkeet, sivu 14, messinkiavain) '
      + 'toistu muualla. Afrikka: kivilinnun varjo — siipi veistoksessa, '
      + 'höyhen kirjan välissä; sävyinä ihmetys ja kunnioitus. '
      + 'Lähi-itä: suitsukkeen tie ja tähdistä suunnistaminen. Aasia: '
      + 'sinetin jälki vahassa — asiakirja, johon Horatio ei koskaan '
      + 'saanut leimaa. Pohjois-Amerikka: rautatiet ja sähkösanomat — '
      + 'ainoa manner, jolla Horatio on itse se, joka ihmettelee. '
      + 'Etelä-Amerikka: kulta joka ei kiillä, joet ja sumu. Oseania: '
      + 'tähtitaivas, jota kartanpiirtäjä ei tunne — laudoista '
      + 'rauhallisin. Piikki osoittaa aina Foggiin ja hänen vanhaan '
      + 'maailmaansa, ei koskaan maihin tai ihmisiin.',
  },
  {
    otsikko: 'Iso avoin päätös: sateenvarjomies',
    teksti: 'Madridissa mies avaa tummansinisen sateenvarjon '
      + 'pilvettömän taivaan alla, ja Kairossa opas ojentaa E. G:n '
      + 'käyntikortin. Kuka nykyajassa kulkee Reginaldin perässä? '
      + 'Ehdotukseni omistajalle: sateenvarjomies on Grimshawin '
      + 'pojanpojanpoika — hänkin peri isoisänsä matkan, kuten '
      + 'Reginald omansa. Kaksi lapsenlasta jatkaa isoisiensä '
      + 'kilpajuoksua tietämättä juuri toisistaan, ja kun he lopulta '
      + 'kohtaavat, takaa-ajo purkautuu lämmöksi: kumpikin haluaa vain '
      + 'nähdä luettelon valmiina. Vaihtoehdot: (a) suojelija — isoisän '
      + 'vanhan ystävän jälkeläinen, joka varjelee Reginaldia etäältä; '
      + '(b) kilpailija joka pehmenee liittolaiseksi (suositukseni); '
      + '(c) jää pysyväksi arvoitukseksi kuten revitty sivu. Päätös ei '
      + 'ole kiireinen — motiivibudjetti pitää G:n harvinaisena siihen '
      + 'asti.',
  },
  {
    otsikko: 'Mihin kaari päättyy',
    teksti: 'Matkakirjan revitty viimeinen sivu ("…voinut uskoa, '
      + 'siellä olikin…") ei paljastu koskaan — se on pelin pysyvä '
      + 'mysteeri ja syy jatkaa matkaa. Yksittäinen peli päättyy, kun '
      + 'aarre tuodaan kotiin; iso kaari ei pääty vaan levenee: uusia '
      + 'maanosia, uusia lehtiä, uusia ääniä. Tarinan kysymys '
      + '"loppuuko matka koskaan" saa saman vastauksen kuin isoisällä: '
      + 'ei — ja juuri se on pointti.',
  },
];

/**
 * Ääninäytteet: englanninkieliset ElevenLabs-äänet lukevat suomea
 * (eleven_v3 on monikielinen). Omistaja kuuntelee ja valitsee.
 * Kaikki tiedostot assets/audio/naytteet/-kansiossa.
 */
export const AANINAYTTEET = [
  {
    ryhma: 'Isoisä-ehdokas (omistajan löytö 8.8., voice id '
      + 'HAvvFKatz0uu0Fv55Riy)',
    naytteet: [
      {
        tiedosto: 'nayte-isoisa-alpit.mp3',
        nimi: 'Vaarallinen tarina (Alpit)',
        kuvaus: 'Jäätikönhalkeama — isoisän oma ääni saapumisessa',
      },
      {
        tiedosto: 'nayte-isoisa-visa.mp3',
        nimi: 'Visasitaatti (Edinburgh)',
        kuvaus: 'Isoisän matkakirjasta, 1873 — tietovisan ylle',
      },
    ],
  },
  {
    ryhma: 'Kertojaehdokkaat (dekkarinäyte, Tukholman kuja)',
    naytteet: [
      { tiedosto: 'nayte-kertoja-george.mp3', nimi: 'George', kuvaus: 'brittiläinen tarinankertoja, lämmin' },
      { tiedosto: 'nayte-kertoja-daniel.mp3', nimi: 'Daniel', kuvaus: 'brittiläinen, vakaa uutisääni' },
      { tiedosto: 'nayte-kertoja-brian.mp3', nimi: 'Brian', kuvaus: 'syvä ja rauhallinen' },
      { tiedosto: 'nayte-kertoja-bill.mp3', nimi: 'Bill', kuvaus: 'vanhempi, viisas sävy' },
    ],
  },
  {
    ryhma: 'Naisäänet Elsalle ja Rosalle (Elsan tervehdys)',
    naytteet: [
      { tiedosto: 'nayte-nainen-alice.mp3', nimi: 'Alice', kuvaus: 'selkeä brittiläinen' },
      { tiedosto: 'nayte-nainen-lily.mp3', nimi: 'Lily', kuvaus: 'samettinen brittiläinen' },
      { tiedosto: 'nayte-nainen-sarah.mp3', nimi: 'Sarah', kuvaus: 'kypsä ja rauhoittava' },
      { tiedosto: 'nayte-nainen-matilda.mp3', nimi: 'Matilda', kuvaus: 'asiantunteva, kirkas' },
    ],
  },
  {
    ryhma: 'Hahmoäänet Matteolle ja Otolle (Oton repliikki)',
    naytteet: [
      { tiedosto: 'nayte-mies-callum.mp3', nimi: 'Callum', kuvaus: 'käheä veijari' },
      { tiedosto: 'nayte-mies-eric.mp3', nimi: 'Eric', kuvaus: 'pehmeä ja luotettava' },
    ],
  },
];

/**
 * Mannerkokeilut: raamatun hahmotelmien mukaisia näytemerkintöjä
 * muilta laudoilta, Viisaan Kertojan lukemina. EIVÄT ole pelissä —
 * omistaja kuuntelee sävyn ennen kuin maanosia aletaan kirjoittaa.
 */
/**
 * Lyhyet versiot (omistajan pyyntö 8.8.2026: "matkakirjan tekstit
 * kannattaa vielä lyhentää... myös Eurooppaan lyhyemmät versiot").
 * Kokeilu vastaa samalla kysymykseen "pitääkö vuorotella, ettei
 * isoisä ole ollenkaan": lyhyessä muodossa merkintä kantaa YHDEN
 * kuvan, ja isoisä on mukana vain kun hän on se kuva — noin joka
 * toisessa merkinnässä. Alkuperäiset tekstit näkyvät vertailua
 * varten Euroopan tekstit -osiossa. Äänet generoidaan omistajan
 * valitsemalla äänellä, kun valinta tulee.
 */
export const LYHYT_KOKEILUT = {
  johdanto: 'Vertailu kolmesta mitasta (omistajan pyyntö 8.8.: '
    + '"oikea mitta voisi olla niiden kahden välistä"): LYHYT on '
    + 'tiivein kokeilu, VÄLI on lyhyen ja nykyisen pelitekstin '
    + 'puolimatka. Nykyinen pitkä versio on luettavissa Euroopan '
    + 'tekstit -osiossa. Sääntö kaikissa: yksi kuva per merkintä, '
    + 'ja isoisä puhuu vain noin joka toisessa — Pariisi ja '
    + 'Pietari ovat ilman häntä.',
  kohteet: [
    {
      otsikko: 'Edinburgh (jännitys — isoisä mukana)',
      kuvaus: 'Sumussa kuului askeleita — kunnes linnan tykki '
        + 'pamahti, ja ne kääntyivät kiireesti pois.',
      nosto: 'Isoisä kirjoitti: "Tykki ammutaan kello yksi laivojen '
        + 'takia." Minä kiitin sitä muustakin.',
      vali: 'Sumussa selkäni takana kuului askeleita — kunnes '
        + 'linnan tykki pamahti, ja me molemmat hypähdimme. '
        + 'Askeleet kääntyivät kiireesti pois.',
      valiNosto: 'Isoisä kirjoitti: "Tykki ammutaan kello yksi, '
        + 'jotta laivat asettavat kellonsa." Minä kiitin sitä '
        + 'tänään muustakin.',
    },
    {
      otsikko: 'Pariisi (arvoitus — ilman isoisää)',
      kuvaus: 'Tarjoilija toi kaakaon, jota en tilannut: "Pöytä '
        + 'seitsemän tarjoaa aina teidän suvullenne." Pöydän alle '
        + 'oli liimattu messinkiavain.',
      vali: 'Kahvilan tarjoilija toi kaakaon, jota en ollut '
        + 'tilannut: "Pöytä seitsemän tarjoaa aina teidän '
        + 'suvullenne." Pöydän kannen alle oli liimattu pieni '
        + 'messinkiavain. Tilasin toisen kaakaon ja jäin.',
    },
    {
      otsikko: 'Wien (hengähdys — isoisä kantaa)',
      kuvaus: 'Kahvilassa kukaan ei hoputtanut, vaikka istuin kaksi '
        + 'tuntia.',
      nosto: 'Isoisä kirjoitti: "Keisarin uusi vesijohto tuo veden '
        + 'vuorilta ilman ainuttakaan pumppua." Join siitä hanasta '
        + 'tänään.',
      vali: 'Kahvilassa kaakao tuli hopeatarjottimella, eikä kukaan '
        + 'hoputtanut, vaikka istuin kaksi tuntia.',
      valiNosto: 'Isoisä kirjoitti: "Keisari avasi vesijohdon, joka '
        + 'tuo veden vuorilta ilman ainuttakaan pumppua." Join '
        + 'siitä hanasta tänään.',
    },
    {
      otsikko: 'Ateena (lämpö — isoisä mukana)',
      kuvaus: 'Lippuluukulla myyjä sanoi: "Seuralaisenne maksoi '
        + 'jo." Huipulla odotti vain tyhjä penkki — ja siinä vielä '
        + 'lämmin paikka.',
      nosto: 'Isoisä kirjoitti: "Täällä keksittiin, että kaupunkia '
        + 'johdetaan keskustelemalla." Ukolla oli tapana olla '
        + 'oikeassa.',
      vali: 'Akropoliin lippuluukulla myyjä ojensi lipun, jota en '
        + 'ollut ostanut: "Seuralaisenne maksoi jo." Huipulla '
        + 'odotti vain tyhjä penkki — ja siinä vielä lämmin '
        + 'paikka.',
      valiNosto: 'Isoisä kirjoitti temppelin juurella: "Täällä '
        + 'keksittiin, että kaupunkia voi johtaa keskustelemalla." '
        + 'Ukolla oli tapana olla oikeassa.',
    },
    {
      otsikko: 'Pietari (ihmetys — ilman isoisää)',
      kuvaus: 'Kesäyö ei pimennyt: luin katukylttiä keskiyöllä '
        + 'ilman lamppua, ja Nevan sillat nousivat pystyyn kuin '
        + 'portit.',
      vali: 'Kesäyö ei pimennyt lainkaan: luin katukylttiä '
        + 'keskiyöllä ilman lamppua. Sitten Nevan sillat nousivat '
        + 'pystyyn, ja jäin katsomaan kuin portin avautumista.',
    },
    {
      otsikko: 'Afrikka: Sansibar (mannerkokeilu)',
      kuvaus: 'Vanha veistäjä käänsi työnsä minuun päin: kivestä '
        + 'nousi linnun siipi. "Isoisäsi kysyi samasta linnusta."',
      vali: 'Mausteiden tuoksu tuli vastaan jo laiturilla. Vanha '
        + 'veistäjä käänsi työnsä minuun päin: kivestä nousi '
        + 'linnun siipi. "Isoisäsi kysyi samasta linnusta."',
      valiNosto: 'Isoisä kirjoitti: "Kivilintu ei ole taru — sen '
        + 'varjo on jo nähty."',
    },
    {
      otsikko: 'Lähi-itä: karavaani (mannerkokeilu)',
      kuvaus: 'Vartija sammutti lyhdyn ja osoitti taivaalle: '
        + '"Täällä suunta ei ole kartassa vaan tähdissä."',
      nosto: 'Isoisä kirjoitti: "Sheban aarretta ei löydä se, joka '
        + 'kulkee päivällä."',
      vali: 'Karavaanin vartija sammutti lyhdyn ja osoitti '
        + 'taivaalle: "Täällä suunta ei ole kartassa vaan '
        + 'tähdissä." Kirjani aukesi tuulessa sivulle, johon '
        + 'isoisä oli piirtänyt saman tähtikuvion.',
      valiNosto: 'Isoisä kirjoitti: "Sheban aarretta ei löydä se, '
        + 'joka kulkee päivällä."',
    },
    {
      otsikko: 'Pohjois-Amerikka: preeria (mannerkokeilu)',
      kuvaus: 'Juna ylitti preeriaa kolmatta päivää, eikä maisema '
        + 'loppunut.',
      nosto: 'Isoisä kirjoitti: "Ensimmäistä kertaa minä olen se, '
        + 'joka tuijottaa."',
      vali: 'Juna ylitti preeriaa kolmatta päivää, eikä maisema '
        + 'loppunut. Vaunussa myytiin sähkeitä kuin sanomalehtiä.',
      valiNosto: 'Isoisä kirjoitti: "Ensimmäistä kertaa matkallani '
        + 'minä olen se, joka tuijottaa."',
    },
  ],
};

/**
 * Uudet väliversiot tyhjältä pöydältä (omistajan pyyntö 8.8.2026:
 * "tuo uusin välimitta tuntuu hyvälle, mutta teksteissä on ehkä
 * jotain outoa... Kokeile kirjoittaa muutamia kaupunkeja kokonaan
 * tyhjältä pöydältä uudestaan"). Nämä EIVÄT ole lyhennelmiä
 * vanhoista: joka kaupunki sai kokonaan uuden kuvan, ja teksti on
 * kirjoitettu suoraan välimittaan. Vanha peliteksti näkyy rinnalla
 * vertailua varten (tyohuone.html lukee sen europe-saapumiset.js:stä
 * — ei kopiota, joka ajautuisi erilleen).
 *
 * Kaanon pitää: yksi kuva per merkintä, ensimmäinen virke jo
 * tarinassa, isoisä noin joka toisessa (tässä 4/6), suljetut
 * motiivit (sivu 14, messinkiavain, liituristi) eivät toistu,
 * jännitys vain Edinburghissa ja purkautuu lämmöksi.
 *
 * luenta-kenttä on valmis ElevenLabsia varten; tiedosto-kenttä
 * lisätään vasta kun ääni on generoitu (ei rikkinäistä soitinta).
 */
export const UUDET_VALIT = {
  johdanto: 'Kuusi kaupunkia kirjoitettu kokonaan tyhjältä pöydältä '
    + 'välimittaan — ei lyhentämällä vanhaa, vaan uusin kuvin. '
    + 'Ensimmäinen versio paisui vanhaa pidemmäksi (omistajan '
    + 'havainto 8.8. illalla), joten tekstit on mitoitettu '
    + 'sanamäärillä edellisen välikokeilun tasoon: 22–37 sanaa, '
    + 'kun vanhat ovat 36–46. Rinnalla nykyinen peliteksti. Isoisä '
    + 'mukana neljässä kuudesta. Luennat generoidaan vasta kun '
    + 'omistaja hyväksyy tekstit.',
  kohteet: [
    {
      id: 'edinburgh',
      otsikko: 'Edinburgh (jännitys — isoisä mukana)',
      vali: 'Kujalla kaasulyhdyn valoympyrän reunalla seisoi hahmo '
        + 'liikkumatta. Astuin lähemmäs — yövartija nosti lakkiaan: '
        + '"Eksyitte, nuori herra. Täällä kaikki eksyvät ensin."',
      valiNosto: 'Isoisä kirjoitti: "Täällä kadut ovat päällekkäin '
        + 'kuin kirjan sivut." Yövartija saattoi minut oikealle '
        + 'sivulle.',
      luenta: '[whispers] Kujalla kaasulyhdyn valoympyrän reunalla '
        + 'seisoi hahmo liikkumatta. [curious] Astuin lähemmäs — '
        + '[warmly] yövartija nosti lakkiaan: "Eksyitte, nuori '
        + 'herra. Täällä kaikki eksyvät ensin." [softly] Isoisä '
        + 'kirjoitti: "Täällä kadut ovat päällekkäin kuin kirjan '
        + 'sivut." [warmly] Yövartija saattoi minut oikealle '
        + 'sivulle.',
    },
    {
      id: 'pariisi',
      otsikko: 'Pariisi (arvoitus — ilman isoisää)',
      vali: 'Kioskin myyjä työnsi lehden kainalooni: "Sivu '
        + 'yhdeksän, monsieur." Sivulla oli ilmoitus: '
        + '"Löytötavaratoimistossa englantilainen matkalaukku '
        + 'vuodelta 1873. Noudettava ennen sunnuntaita." Tänään on '
        + 'lauantai.',
      luenta: '[curious] Kioskin myyjä työnsi lehden kainalooni: '
        + '"Sivu yhdeksän, monsieur." [softly] Sivulla oli '
        + 'ilmoitus: [whispers] "Löytötavaratoimistossa '
        + 'englantilainen matkalaukku vuodelta 1873. Noudettava '
        + 'ennen sunnuntaita." [curious] Tänään on lauantai.',
    },
    {
      id: 'wien',
      otsikko: 'Wien (hengähdys — isoisä mukana)',
      vali: 'Oopperan ovi oli raollaan, ja orkesteri aloitti saman '
        + 'tahdin yhä uudestaan. Vahtimestari siirsi tuolin '
        + 'ovensuuhun: "Kuunnella saa ilmaiseksi. Istua vain '
        + 'luvalla."',
      valiNosto: 'Isoisä kirjoitti: "Täällä musiikki on tapa '
        + 'hengittää."',
      luenta: '[warmly] Oopperan ovi oli raollaan, ja orkesteri '
        + 'aloitti saman tahdin yhä uudestaan. [softly] '
        + 'Vahtimestari siirsi tuolin ovensuuhun: "Kuunnella saa '
        + 'ilmaiseksi. Istua vain luvalla." Isoisä kirjoitti: '
        + '[warmly] "Täällä musiikki on tapa hengittää."',
    },
    {
      id: 'ateena',
      otsikko: 'Ateena (lämpö — isoisä mukana)',
      vali: 'Torin kauppias antoi minun maistaa oliiveja kolmesta '
        + 'ruukusta ja kysyi, mikä vuori maistui parhaalta. Sitten '
        + 'hän osoitti rinteitä kaupungin takana: jokainen ruukku '
        + 'oli omaltaan.',
      valiNosto: 'Isoisä kirjoitti: "Vanhinta ei täällä etsitä '
        + 'museosta — oliivipuu ehti nähdä Sokrateen." Kauppias '
        + 'nyökkäsi.',
      luenta: '[curious] Torin kauppias antoi minun maistaa '
        + 'oliiveja kolmesta ruukusta ja kysyi, mikä vuori maistui '
        + 'parhaalta. [warmly] Sitten hän osoitti rinteitä '
        + 'kaupungin takana: jokainen ruukku oli omaltaan. [softly] '
        + 'Isoisä kirjoitti: "Vanhinta ei täällä etsitä museosta — '
        + 'oliivipuu ehti nähdä Sokrateen." [warmly] Kauppias '
        + 'nyökkäsi.',
    },
    {
      id: 'pietari',
      otsikko: 'Pietari (ihmetys — ilman isoisää)',
      vali: 'Eremitaasin salissa kissa käveli ohitseni kuin '
        + 'virkamies kiireisellä asialla. Vahtimestari kuiskasi: '
        + 'kissat ovat vartioineet tauluja keisarinnan ajoista, ja '
        + 'jokaisella on oma kerros.',
      luenta: '[curious] Eremitaasin salissa kissa käveli ohitseni '
        + 'kuin virkamies kiireisellä asialla. [whispers] '
        + 'Vahtimestari kuiskasi: kissat ovat vartioineet tauluja '
        + 'keisarinnan ajoista, [warmly] ja jokaisella on oma '
        + 'kerros.',
    },
    {
      id: 'rooma',
      otsikko: 'Rooma (haikeus — isoisä mukana)',
      vali: 'Talon seinässä oli pala marmoripylvästä, kirjaimet '
        + 'ylösalaisin. Opas kohautti olkiaan: Rooma on aina '
        + 'rakennettu vanhan kivistä.',
      valiNosto: 'Isoisä kirjoitti: "Täällä ei kävellä kaupungissa '
        + 'vaan kaupunkien päällä." Painoin kämmenen kirjaimiin.',
      luenta: '[curious] Talon seinässä oli pala marmoripylvästä, '
        + 'kirjaimet ylösalaisin. [softly] Opas kohautti olkiaan: '
        + 'Rooma on aina rakennettu vanhan kivistä. Isoisä '
        + 'kirjoitti: [whispers] "Täällä ei kävellä kaupungissa '
        + 'vaan kaupunkien päällä." [warmly] Painoin kämmenen '
        + 'kirjaimiin.',
    },
  ],
};

/**
 * Isoisä visaan ja aarteeseen (omistajan idea 8.8. illalla: "isoisän
 * merkinnät melkein kokonaan pois [saapumisista] ellei siihen ole
 * todella hyvää syytä. Sen sijaan isoisän voisi siirtää
 * kysymys/aarre-osioon"). Neljä kokeilua koko kaaresta:
 *
 *   1. SAAPUMINEN — pelkkä Reginaldin hetki, ei isoisää.
 *   2. KOHTAAMINEN TIETOVISASSA — kun pelaaja käy kysymykseen,
 *      isoisän merkintä johdattaa siihen ja sitoo sen kaupunkiin.
 *   3. AARTEEN PALJASTUMINEN — kätkön löytyessä isoisän rivi antaa
 *      palkinnon tunteen ja sulkee saapumisen kuvan.
 *
 * Isoisä ei siis katoa — hän siirtyy sinne, missä pelaaja tekee
 * jotain. Saapuminen jää imuksi, isoisä palkitsee teot.
 */
export const VISA_AARRE_KOKEILUT = {
  johdanto: 'Neljä kokeilua uudesta työnjaosta: saapumismerkintä on '
    + 'pelkkää Reginaldia KOKO välimitassa (omistajan tarkennus: '
    + '"pidä yhteismitta matkakirjassa samana, niin nuoren miehen '
    + 'ääni saa enemmän tilaa"), ja isoisä astuu esiin vasta '
    + 'tietovisan kohdalla ja aarteen paljastuessa. Visateksti on '
    + 'kehys pelin oman kysymyksen ympärille; aarreteksti näytetään '
    + 'kätkön löytyessä.',
  kohteet: [
    {
      id: 'edinburgh',
      otsikko: 'Edinburgh (jännitys)',
      saapuminen: 'Kujalla kaasulyhdyn valoympyrän reunalla seisoi '
        + 'hahmo liikkumatta, ja omat askeleeni kuuluivat liian '
        + 'kovaa. Astuin lähemmäs — yövartija nosti lakkiaan: '
        + '"Eksyitte, nuori herra. Täällä kaikki eksyvät ensin." '
        + 'Kävelin hänen perässään valosta valoon.',
      visa: 'Isoisä oli merkinnyt sivun reunaan: "Tässä kaupungissa '
        + 'oikea vastaus on avain — väärä kerros vie väärälle '
        + 'vuosisadalle." Vastasin kuin koe olisi hänen.',
      aarre: 'Kätkön pohjalla oli isoisän rivi: "Yövartija saattoi '
        + 'minutkin kerran oikealle sivulle. Kiitä häntä '
        + 'puolestani." Kujan päässä lyhty heilahti kuin lakki.',
    },
    {
      id: 'pariisi',
      otsikko: 'Pariisi (arvoitus)',
      saapuminen: 'Kioskin myyjä työnsi lehden kainalooni: "Sivu '
        + 'yhdeksän, monsieur." Sivulla oli ilmoitus: '
        + '"Löytötavaratoimistossa englantilainen matkalaukku '
        + 'vuodelta 1873. Noudettava ennen sunnuntaita." Tänään on '
        + 'lauantai.',
      visa: 'Löytötavaratoimiston virkailija ei kysynyt nimeäni '
        + 'vaan sanoi: "Omistaja tunnistetaan kysymyksellä." Isoisä '
        + 'oli varautunut tähän: sivulle oli kirjoitettu "Vastaa '
        + 'niin kuin minä vastaisin."',
      aarre: 'Laukussa oli yksi esine: valokuva kahvilan pöydästä '
        + 'seitsemän. Taakse oli kirjoitettu: "Tilaa kaakao ja jää '
        + 'istumaan. Joku tulee aina." Tilasin.',
    },
    {
      id: 'ateena',
      otsikko: 'Ateena (lämpö)',
      saapuminen: 'Torin kauppias antoi minun maistaa oliiveja '
        + 'kolmesta ruukusta ja kysyi, mikä vuori maistui '
        + 'parhaalta. Nauroin, kunnes hän osoitti rinteitä '
        + 'kaupungin takana: jokainen ruukku oli omaltaan. Ostin '
        + 'pussillisen sitä vuorta, jonka nimeä en osannut lausua.',
      visa: 'Isoisä oli piirtänyt sivulle kolme ruukkua ja '
        + 'kirjoittanut alle: "Kauppias kysyy kaikilta saman '
        + 'kysymyksen. Vastaa oikein, niin saat neljännen maun."',
      aarre: 'Kätkö oli oliivipuun juurella: pieni ruukku, jonka '
        + 'kyljessä luki isoisän käsialalla: "Vanhinta ei etsitä '
        + 'museosta. Tämä puu ehti nähdä Sokrateen — ja nyt '
        + 'sinut."',
    },
    {
      id: 'pietari',
      otsikko: 'Pietari (ihmetys)',
      saapuminen: 'Eremitaasin salissa kissa käveli ohitseni kuin '
        + 'virkamies kiireisellä asialla. Vahtimestari kuiskasi: '
        + 'kissat ovat vartioineet tauluja keisarinnan ajoista, ja '
        + 'jokaisella on oma kerros.',
      visa: 'Vahtimestari saattoi minut salin poikki: "Kissa vie '
        + 'vieraan oikean taulun luo, jos vieras osaa vastata." '
        + 'Isoisän kirjassa luki vain: "Luota kissaan."',
      aarre: 'Taulun takana oli syvennys ja siinä isoisän '
        + 'merkintä: "Sillat nousivat ja jäin väärälle rannalle. '
        + 'Paras virhe, jonka tein." Kissa odotti jo ovella.',
    },
  ],
};

export const MANTERE_KOKEILUT = [
  {
    lauta: 'Afrikka — Sansibar (kivilinnun varjo)',
    tiedosto: 'kokeilu-afrikka.mp3',
    kuvaus: 'Mausteiden tuoksu tuli vastaan jo laiturilla. Vanha '
      + 'veistäjä katsoi kirjaani ja käänsi työnsä minuun päin: '
      + 'kivestä nousi linnun siipi. "Isoisäsi kysyi samasta '
      + 'linnusta", hän sanoi.',
    nosto: 'Isoisä kirjoitti: "Sansibarissa kaikki tiet tuoksuvat '
      + 'neilikalta ja kaikki tarinat johtavat etelään. Kivilintu ei '
      + 'ole taru — sen varjo on jo nähty."',
  },
  {
    lauta: 'Lähi-itä — karavaani (Sheban tähdet)',
    tiedosto: 'kokeilu-lahi-ita.mp3',
    kuvaus: 'Karavaanin vartija sammutti lyhdyn ja osoitti taivaalle: '
      + '"Täällä suunta ei ole kartassa vaan tähdissä." Kirjani '
      + 'aukesi tuulessa sivulle, johon isoisä oli piirtänyt saman '
      + 'tähtikuvion.',
    nosto: 'Isoisä kirjoitti: "Suitsukkeen tie on vanhempi kuin '
      + 'yksikään valtakunta sen varrella. Sheban aarretta ei löydä '
      + 'se, joka kulkee päivällä."',
  },
  {
    lauta: 'Pohjois-Amerikka — preeria (Horatio ihmettelee)',
    tiedosto: 'kokeilu-pohjois-amerikka.mp3',
    kuvaus: 'Juna ylitti preeriaa kolmatta päivää, eikä maisema '
      + 'loppunut. Vaunussa myytiin sähkeitä kuin sanomalehtiä — '
      + 'täällä minun ei tarvinnut ihmetellä yksin.',
    nosto: 'Isoisä kirjoitti: "Ensimmäistä kertaa matkallani minä '
      + 'olen se, joka tuijottaa. Rautatie ylitti mantereen neljässä '
      + 'päivässä — ja Montezuman aarre makaa yhä jossain sen '
      + 'eteläpuolella."',
  },
];

/*
 * ISOISÄ SAAPUMISESSA — viisi jännityskaupunkia kuunneltavaksi
 * (omistajan tilaus 9.8.2026: "Tee joku äänigenerointi missä isoisä on
 * äänessä kun saavutaan kaupunkiin (jännittävä ja pelottava). Kysymys
 * ja löytö teksteistä puuttuu cliffhanger. Tee viisi kokonaan uutta
 * kaupunkia generoituine äänineen ja laita ne työhuoneeseen").
 *
 * KOKEILU, ei pelissä: nämä ovat vain työhuoneen kuuntelulistalla,
 * kunnes omistaja on kuunnellut ja hyväksynyt sävyn (sama tapa kuin
 * neljän kaupungin pilotissa v419). Vasta sitten ne viedään
 * SAAPUMISET- ja EUROPE_KAARI-dataan.
 *
 * Malli poikkeaa pilotista: tässä ISOISÄ (Horatio Fogg, 1873) on
 * kertoja jo saapumisessa — jännittävä ja pelottava tunnelma, mutta
 * kaanonin sääntö pitää: "askeleet sumussa kyllä, vaara ei". Cliffhanger
 * on nyt myös visassa ja aarteessa: koukku jää auki, aarre sulkee saman
 * kuvan jonka saapuminen avasi ja jättää silti suunnan (ei nimettyä
 * kaupunkia). Motiivit toistuvat: barometri, liidulla piirretty
 * tähtäinristi, askel joka kaikuu liian myöhään.
 *
 * Äänet: node tools/generoi-kaari.mjs — kirjoittaa kolme mp3:a per
 * kaupunki (puhe-kaari-saapuminen/visa/aarre-<id>.mp3). Sama resepti
 * kuin muissa luennoissa: Viisas Kertoja, eleven_v3, stability 0.5.
 * luenta-kentissä 2–5 tunnetagia, sävykaari alusta loppuun.
 */
/*
 * KOKO TEKSTIPAKETTI — viisi kaupunkia kerralla suunniteltuna
 * (omistajan tilaus 9.8.2026: sama viisikko kuin KAARI_KAUPUNGIT,
 * mutta nyt koko kaari yhtenä suunnitelmana: saapuminen, kohtaaminen
 * nimetyn henkilön kanssa, visa, aarre — ja kärkenä omistajan idea:
 * henkilön vihje sanotaan vasta AARTEEN LÖYTYMISEN JÄLKEEN, jää auki
 * ja vie eteenpäin).
 *
 * Tekstit ovat kokonaan uudet (Fable 9.8.2026); KAARI_KAUPUNGIT
 * äänineen jää vertailukohdaksi vanhoihin kokeiluihin. Viisi vihjettä
 * muodostavat yhdessä ison arvoituksen: joku kulkee nykyaikana samoja
 * jälkiä ja pitää isoisän merkkejä yllä — kuka, se ei paljastu.
 * ÄLÄ generoi ääniä ennen omistajan hyväksyntää: omistaja päättää,
 * mitkä osat ylipäätään luetaan.
 */
export const KAARI_PAKETIT = {
  johdanto: 'Sama viisikko kuin edellisessä kokeilussa, mutta nyt koko '
    + 'paketti kerralla suunniteltuna: saapuminen (isoisä äänessä, '
    + '1873), kohtaaminen nimetyn henkilön kanssa, visa ja aarre — ja '
    + 'kärkenä uusi osa: henkilön vihje, joka sanotaan vasta aarteen '
    + 'löytymisen jälkeen ja jää auki cliffhangeriksi. Jokaiseen '
    + 'kaupunkiin on suunniteltu henkilö, jolla on oma syy olla juuri '
    + 'siinä paikassa. Viisi vihjettä kietoutuvat yhteen isoon '
    + 'arvoitukseen: joku pitää isoisän jälkiä yllä vielä tänäänkin. '
    + 'Ääniä ei ole generoitu — sinä päätät luettuasi, mitkä osat '
    + 'luetaan ääneen.',
  kohteet: [
    {
      id: 'praha',
      otsikko: 'Praha — kynttilä tyhjässä talossa',
      saapuminen: 'Kultaisella kujalla, talossa numero kahdeksan, paloi '
        + 'kynttilä, vaikka ovi oli lukossa ja ikkunassa vuosisadan '
        + 'pöly. Sisällä pöydällä odotti avoin kirja, ja sen reunaan '
        + 'oli kirjoitettu barometrini lukema — minuutilleen sama kuin '
        + 'omani. Käsiala ei ollut minun. Sinä, joka tätä luet: '
        + 'kynttilä ei sytytä itseään.',
      henkilo: 'Lyhdynsytyttäjä Tomáš sytyttää joka ilta Kultaisen '
        + 'kujan lyhdyt — ja yhden kynttilän, jota kukaan ei ole '
        + 'tilannut sataan vuoteen. Hänen sukunsa lupasi Horatiolle '
        + 'pitää talon kahdeksan valon palamassa, kunnes etsijä palaa. '
        + 'Hän on vastaus saapumisen arvoitukseen — ja tietää '
        + 'tilauksesta enemmän kuin aluksi kertoo.',
      tervehdys: 'Lyhdynsytyttäjä laskee tikkaansa ja katsoo kirjaasi '
        + 'kauan. "Talon kahdeksan kynttilä on sukuni työ. Isoisäsi '
        + 'maksoi siitä sadaksi vuodeksi ja sanoi: joka tulee kysymään '
        + 'loppulaskua, on oikea etsijä. Näytä, että tunnet maailmaa '
        + 'kuten hän — lasku odottaa."',
      visa: 'Tomáš avaa pöydän kirjan merkitystä kohdasta. Isoisän '
        + 'rivi reunassa: "Tässä kaupungissa savesta tehtiin kerran '
        + 'vartija, ja oikea sana herätti sen. Valitse vastauksesi '
        + 'kuin sana — väärä nukuttaa, oikea herättää." Alempana, '
        + 'haaleammalla musteella: "Portaista kuuluu askeleita. '
        + 'Jatkan, kun tiedän kenen."',
      aarre: 'Kätkön päällä oli kynttilänpätkä, sydän vielä lämmin. '
        + 'Isoisän rivi: "Jos liekki paloi, kun tulit, en ollut '
        + 'viimeinen etsijä. Puhalla se sammuksiin puolestani — ja '
        + 'katso ikkunasta, kuka kujalla pysähtyy."',
      vihje: 'Tomáš raapaisee tulitikun ja sytyttää kynttilän '
        + 'uudelleen: "Sopimus on sopimus — valo palaa, kunnes etsijä '
        + 'palaa. Mutta tilauksessa oli kaksi kynttilää. Toista en ole '
        + 'löytänyt koskaan. Tiedän vain, että se palaa jossain, missä '
        + 'maa on lämmin."',
    },
    {
      id: 'istanbul',
      otsikko: 'Istanbul — upotettu palatsi',
      saapuminen: 'Laskin kahdeksankymmentä porrasta pimeään, ja '
        + 'kaupungin äänet sammuivat yksi kerrallaan. Alhaalla seisoi '
        + 'pylväsmetsä mustassa vedessä, ja yhden pylvään alla lepäsi '
        + 'kivinen kasvo ylösalaisin. Sammutin lyhtyni kokeeksi — ja '
        + 'veden ylle jäi palamaan toinen valo, joka ei ollut minun.',
      henkilo: 'Vedenvartija Emine mittaa säiliön veden korkeuden, '
        + 'kuten hänen sukunsa on tehnyt sulttaanien ajoista. Hänen '
        + 'isoisoäitinsä istui Horation kanssa kokonaisen yön ja '
        + 'vertasi vedenmittoja barometrin lukemiin. Emine tuntee '
        + 'pylväät, molemmat kivikasvot — ja mittauskirjan, josta '
        + 'puuttuu yksi sivu.',
      tervehdys: 'Portaiden alla nainen nostaa lyhtyä ja mittaa '
        + 'kirjaasi katseellaan. "Vedenvartija Emine. Sukuni on '
        + 'mitannut tämän veden sulttaanien ajoista. Kirjasi omistaja '
        + 'istui isoisoäitini kanssa koko yön ja vertasi lukuja — '
        + 'kaksi mittaajaa, yksi kynttilä. Näytä, että tunnet maailmaa '
        + 'kuten hän, niin soudan sinut kasvojen luo."',
      visa: 'Emine antaa veneen liukua pylvään varjoon. Isoisän rivi: '
        + '"Täällä oikea vastaus on käännettävä ylösalaisin, kuten '
        + 'kasvot veden alla. Joka katsoo suoraan, erehtyy — joka '
        + 'katsoo heijastuksesta, näkee." Sivun alareuna oli kastunut, '
        + 'ja viimeinen rivi oli liuennut lukukelvottomaksi.',
      aarre: 'Kätkö nousi vedestä köyden päässä, ja lyhdyn valo osui '
        + 'kivikasvoihin suoraan. Isoisän rivi: "Kasvot vartioivat '
        + 'tätä, koska pyysin kohteliaasti. Nyökkää niille puolestani '
        + '— ja kun nouset portaita, älä säikähdä, jos toinen valo '
        + 'saattaa sinut ylös."',
      vihje: 'Emine kiinnittää veneen ja sanoo hiljaa: "Kasvoja on '
        + 'kaksi. Toinen makaa kyljellään, ja isoisäsi kysyi, kumpi on '
        + 'vartija ja kumpi vanki. Isoisoäitini tiesi vastauksen ja '
        + 'kirjoitti sen mittauskirjan viimeiselle sivulle. Joku on '
        + 'sittemmin leikannut sen sivun irti."',
    },
    {
      id: 'wien',
      otsikko: 'Wien — luiden holvit kirkon alla',
      saapuminen: 'Kirkon alla ovi oli raollaan, ja kynttilöiden '
        + 'liekit taipuivat kaikki samaan suuntaan, vaikka ilma '
        + 'seisoi. Holvit jatkuivat pimeään syvemmälle kuin kynttilän '
        + 'valo kantoi. Askelteni kaiku palasi yhtä askelta myöhässä — '
        + 'ja kun pysähdyin kahdesti, kaiku pysähtyi vain kerran.',
      henkilo: 'Suntio Anton hoitaa holvien kynttilät ja saattajien '
        + 'kirjan, jossa Horation nimen vieressä on hänen oman '
        + 'isoisänsä käsiala. Hän tietää, mistä veto holveihin tulee, '
        + 'muttei ole koskaan avannut sitä ovea — eikä aio avata.',
      tervehdys: 'Suntio nostaa kynttilänsammuttimen olalleen kuin '
        + 'sauvan. "Anton, holvien hoitaja. Saattajien kirjassa on '
        + 'isoisäsi nimi — ja vieressä minun isoisäni käsiala. He '
        + 'laskeutuivat kolmen lyhdyn kanssa, ja ylös palasi kaksi. '
        + 'Näytä, että tunnet maailmaa kuten hän, niin kerron, minne '
        + 'kolmas jäi."',
      visa: 'Anton pysähtyy portaiden suulle eikä astu pidemmälle. '
        + 'Isoisän rivi: "Tässä kaupungissa musiikki peittää sen, '
        + 'mitä maan alla lepää. Kuuntele valssia ja laske tahdit — '
        + 'kolmas isku on aina yksi liikaa." Sivun kulma oli '
        + 'kärventynyt, kuin sitä olisi luettu liian läheltä liekkiä.',
      aarre: 'Kätkön päällä seisoi lyhty — se kolmas. Liekki oli '
        + 'sammunut, mutta lasi oli yhä lämmin. Isoisän rivi: "Jätin '
        + 'valon tänne, koska luut eivät sitä tarvitse, mutta etsijä '
        + 'tarvitsee. Kulje vetoa vastaan, niin löydät ulos — äläkä '
        + 'sammuta omaasi."',
      vihje: 'Anton laskee sammuttimen alas ja puhuu portaita kohti: '
        + '"Veto ei ole tuulta. Se tulee ovesta, jota ei minun '
        + 'aikanani ole avattu. Isoisäsi tiesi, minne se johtaa — hän '
        + 'kirjoitti saattajien kirjaan yhden lauseen: sinne ei mennä '
        + 'alakautta."',
    },
    {
      id: 'venetsia',
      otsikko: 'Venetsia — naamio sillan kaiteella',
      saapuminen: 'Vesi nousi kaduille keskellä yötä, ja kanaaleista '
        + 'tuli musta peili. Sillan kaiteella odotti valkoinen naamio, '
        + 'jolla oli linnunnokka — ruttolääkärin kasvot, silmäaukot '
        + 'tyhjinä. Nostin sen, ja mustassa vedessä heijastukseni '
        + 'näytti laskevan naamion takaisin kaiteelle.',
      henkilo: 'Naamiontekijä Lucia pitää pajaa kolmannessa polvessa. '
        + 'Pajan tilauskirjassa on vuosi 1873 ja nimikirjaimet H. F.: '
        + 'kaksi samanlaista lääkärinnaamiota ja ohje jättää toinen '
        + 'sillalle aina, kun vesi nousee. Lucia on noudattanut '
        + 'ohjetta koko ikänsä — ja viime keväänä tapahtui jotain, '
        + 'mitä hän ei osaa selittää.',
      tervehdys: 'Pajassa tekijä nostaa naamion valoa vasten ja '
        + 'tunnistaa nokan yhdellä vilkaisulla. "Lucia. Tuo on meidän '
        + 'pajamme työtä. Tilauskirjassa lukee 1873, nimikirjaimet '
        + 'H. F. — kaksi samanlaista naamiota ja ohje: toinen '
        + 'jätetään sillalle aina, kun vesi nousee. Näytä, että '
        + 'tunnet maailmaa kuten hän, niin luen tilauksen loppuun."',
      visa: 'Lucia kääntää tilauskirjan sivua, mutta väliin on '
        + 'taitettu isoisän lehti: "Täällä kaikki kelluu — myös '
        + 'valheet. Oikea vastaus painuu pohjaan kuin kivi, väärä jää '
        + 'pinnalle kuin naamio." Rivin alle oli piirretty '
        + 'tähtäinristi — ja liitu tarttui sormeen, vielä märkänä.',
      aarre: 'Kätkö nousi vedestä, ja naamio jäi kellumaan sen '
        + 'viereen kasvot ylöspäin, kohti taivasta. Isoisän rivi: '
        + '"Jätin vartijan, joka ei koskaan sulje silmiään. Ota kätkö '
        + 'ja käännä naamio kasvot alaspäin — niin seuraava etsijä '
        + 'tietää, että joku ehti ensin."',
      vihje: 'Lucia sulkee tilauskirjan hitaasti: "Naamioita oli '
        + 'kaksi. Toinen lähti isoisäsi matkaan — ja viime keväänä '
        + 'joku toi sen takaisin pajaan. Ei sanonut nimeään, jätti '
        + 'vain maksun ja paperilapun. Lapussa oli pelkkä '
        + 'ilmanpaineen lukema."',
    },
    {
      id: 'budapest',
      otsikko: 'Budapest — hengittävä labyrintti',
      saapuminen: 'Linnan alla aukeaa labyrintti, jonka seinät '
        + 'hikoilevat lämmintä vettä, kuin vuori hengittäisi. Vein '
        + 'kynttilän syvimpään käytävään ja löysin seinästä liidulla '
        + 'piirretyn tähtäinristin — oman merkkini, vaikken ollut '
        + 'käynyt täällä eläissäni. Viiva oli terävä, kuin tänään '
        + 'piirretty.',
      henkilo: 'Kylpymestari Márta on kylpylän vanhin kylvettäjä. '
        + 'Hänen isoisoäitinsä saattoi Horation linnan alle ja opetti '
        + 'tälle lämpimän seinän säännön — eikä kenellekään muulle. '
        + 'Márta tuntee labyrintin ihollaan, ei silmillään, ja on '
        + 'nähnyt saman liituristin ilmestyvän seinään yhä uudelleen.',
      tervehdys: 'Kylpymestari kuivaa kätensä ja koskettaa kirjan '
        + 'kantta kuin vanhaa tuttua. "Márta. Isoisoäitini vei kirjasi '
        + 'omistajan linnan alle ja opetti hänelle säännön, jolla '
        + 'sieltä palataan. Sitä ei ole opetettu kenellekään muulle. '
        + 'Näytä, että tunnet maailmaa kuten hän — niin sääntö on '
        + 'sinun."',
      visa: 'Márta sytyttää kynttilän ja ojentaa sen kädestä käteen. '
        + 'Isoisän rivi: "Maan alla suunnat valehtelevat. Lämmin '
        + 'seinä vie lähteelle, kylmä ulos — luota ihoosi, älä '
        + 'silmiisi." Ja alle, kiireisemmällä käsialalla: "Sääntö '
        + 'toimii. Mutta joku muu tuntee sen myös."',
      aarre: 'Kätkö odotti lämpimän seinän takana, höyryn peitossa. '
        + 'Isoisän rivi: "Piirsin ristin, jotta löytäisin takaisin — '
        + 'tai jotta sinä löytäisit minut. Sinä, joka tätä luet: '
        + 'pyyhi merkki pois, kun olet ulkona. Meidän jälkemme saa '
        + 'päättyä tähän."',
      vihje: 'Márta saattaa sinut portille ja sanoo vasta siinä: '
        + '"Pyyhitkö merkin? Niin pyyhki isoisoäitinikin — ja silti '
        + 'se on aamulla aina seinässä. Joku piirtää sen yhä '
        + 'uudelleen. En tiedä kuka. Tiedän vain, että liitu on aina '
        + 'samaa — valkoista, kuin sillä ensimmäisellä kerralla."',
    },
  ],
};

export const KAARI_KAUPUNGIT = {
  johdanto: 'Viisi jännityskaupunkia, joissa isoisä itse on äänessä jo '
    + 'saapuessa. Kuuntele putkeen: jokaisesta kaupungista soi kolme '
    + 'pätkää järjestyksessä — saapuminen, kohtaaminen tietovisassa ja '
    + 'aarteen paljastuminen. Cliffhanger jää auki kaikkiin kolmeen. '
    + 'Nämä eivät ole vielä pelissä; kuuntele ja kerro, kestääkö sävy.',
  kohteet: [
    {
      id: 'praha',
      otsikko: 'Praha — kynttilä tyhjässä talossa',
      saapuminen: 'Kultaisella kujalla, talossa numero kahdeksan, paloi '
        + 'kynttilä — vaikka talo oli seisonut tyhjänä kolmesataa vuotta. '
        + 'Pöydälle oli jätetty auki kirja, ja sen reunaan kirjoitettu '
        + 'barometrini lukema. Käsiala ei ollut minun. Joku oli mitannut '
        + 'ilman ennen minua.',
      saapumisLuenta: '[curious] Kultaisella kujalla, talossa numero '
        + 'kahdeksan, paloi kynttilä — [softly] vaikka talo oli seisonut '
        + 'tyhjänä kolmesataa vuotta. Pöydälle oli jätetty auki kirja, ja '
        + 'sen reunaan kirjoitettu barometrini lukema. [whispers] Käsiala '
        + 'ei ollut minun. Joku oli mitannut ilman ennen minua.',
      visa: 'Isoisä oli merkinnyt sivun reunaan: "Tässä kaupungissa '
        + 'savesta tehtiin kerran vartija. Oikea sana herättää sen, väärä '
        + 'nukuttaa — valitse kuin heräisit itse." Alempana, ohuemmalla '
        + 'musteella: "En ehtinyt kokeilla. Portti kävi."',
      visaLuenta: '[softly] Isoisä oli merkinnyt sivun reunaan: "Tässä '
        + 'kaupungissa savesta tehtiin kerran vartija. Oikea sana herättää '
        + 'sen, väärä nukuttaa — [curious] valitse kuin heräisit itse." '
        + '[whispers] Alempana, ohuemmalla musteella: "En ehtinyt kokeilla. '
        + 'Portti kävi."',
      aarre: 'Kätkön alta löytyi kynttilänpätkä, vielä lämmin. Isoisän '
        + 'rivi: "Jos liekki palaa yhä, en ollutkaan viimeinen, joka etsi. '
        + 'Puhalla se sammuksiin puolestani — ja katso, kuka kääntyy."',
      aarreLuenta: '[curious] Kätkön alta löytyi kynttilänpätkä, vielä '
        + 'lämmin. [softly] Isoisän rivi: "Jos liekki palaa yhä, en '
        + 'ollutkaan viimeinen, joka etsi. [whispers] Puhalla se sammuksiin '
        + 'puolestani — ja katso, kuka kääntyy."',
    },
    {
      id: 'istanbul',
      otsikko: 'Istanbul — upotettu palatsi',
      saapuminen: 'Laskeuduin kahdeksankymmentä porrasta maan alle, ja '
        + 'kaupunki katosi yläpuoleltani. Pimeässä seisoi kolmesataa '
        + 'pylvästä vedessä, ja yhden juurella lepäsi kivinen naisen kasvo '
        + 'ylösalaisin. Vesi kantoi ääntä: joku toinen laski askeleitaan '
        + 'minun tahdissani.',
      saapumisLuenta: '[curious] Laskeuduin kahdeksankymmentä porrasta maan '
        + 'alle, ja kaupunki katosi yläpuoleltani. [softly] Pimeässä seisoi '
        + 'kolmesataa pylvästä vedessä, ja yhden juurella lepäsi kivinen '
        + 'naisen kasvo ylösalaisin. [whispers] Vesi kantoi ääntä: joku '
        + 'toinen laski askeleitaan minun tahdissani.',
      visa: 'Isoisä kirjoitti reunaan: "Täällä oikea vastaus on käännettävä '
        + 'ylösalaisin, kuten kasvot veden alla. Joka katsoo suoraan, '
        + 'kivettyy — joka katsoo heijastuksesta, näkee." Muste oli '
        + 'kastunut alareunasta.',
      visaLuenta: '[softly] Isoisä kirjoitti reunaan: "Täällä oikea vastaus '
        + 'on käännettävä ylösalaisin, kuten kasvot veden alla. [curious] '
        + 'Joka katsoo suoraan, kivettyy — joka katsoo heijastuksesta, '
        + 'näkee." [whispers] Muste oli kastunut alareunasta.',
      aarre: 'Kätkö oli veden pinnan alla, ja siitä nousi kylmä kuplajono. '
        + 'Isoisän rivi: "Kivikasvot vartioivat tätä, koska minä pyysin. '
        + 'Nyt ne katsovat sinua — nyökkää takaisin, niin tiet aukeavat."',
      aarreLuenta: '[curious] Kätkö oli veden pinnan alla, ja siitä nousi '
        + 'kylmä kuplajono. [softly] Isoisän rivi: "Kivikasvot vartioivat '
        + 'tätä, koska minä pyysin. [warmly] Nyt ne katsovat sinua — nyökkää '
        + 'takaisin, niin tiet aukeavat."',
    },
    {
      id: 'wien',
      otsikko: 'Wien — luiden holvit kirkon alla',
      saapuminen: 'Kirkon alle vievä ovi oli raollaan, ja kynttilänliekit '
        + 'taipuivat yhteen suuntaan, vaikka ilma seisoi. Luiden holvit '
        + 'ulottuivat pimeään niin syvälle, ettei barometri enää tiennyt '
        + 'pohjaa. Askelteni kaiku palasi aina yhtä askelta liian myöhään.',
      saapumisLuenta: '[curious] Kirkon alle vievä ovi oli raollaan, ja '
        + 'kynttilänliekit taipuivat yhteen suuntaan, [softly] vaikka ilma '
        + 'seisoi. Luiden holvit ulottuivat pimeään niin syvälle, ettei '
        + 'barometri enää tiennyt pohjaa. [whispers] Askelteni kaiku palasi '
        + 'aina yhtä askelta liian myöhään.',
      visa: 'Isoisä oli merkinnyt: "Kaupungissa musiikki peittää sen, mitä '
        + 'maan alla on. Kuuntele valssia, mutta laske tahdit — kolmas isku '
        + 'on aina liikaa. Siitä tunnistat väärän vastauksen." Sivun kulma '
        + 'oli poltettu.',
      visaLuenta: '[softly] Isoisä oli merkinnyt: "Kaupungissa musiikki '
        + 'peittää sen, mitä maan alla on. [curious] Kuuntele valssia, mutta '
        + 'laske tahdit — kolmas isku on aina liikaa. Siitä tunnistat väärän '
        + 'vastauksen." [whispers] Sivun kulma oli poltettu.',
      aarre: 'Kätkön päällä oli sammunut kynttilä, ja liekki oli taipunut '
        + 'samaan suuntaan kuin ovella. Isoisän rivi: "Veto tulee sieltä, '
        + 'mistä minäkin tulin. Seuraa sitä ulos — äläkä katso taakse ennen '
        + 'päivänvaloa."',
      aarreLuenta: '[curious] Kätkön päällä oli sammunut kynttilä, ja liekki '
        + 'oli taipunut samaan suuntaan kuin ovella. [softly] Isoisän rivi: '
        + '"Veto tulee sieltä, mistä minäkin tulin. [whispers] Seuraa sitä '
        + 'ulos — äläkä katso taakse ennen päivänvaloa."',
    },
    {
      id: 'venetsia',
      otsikko: 'Venetsia — naamio sillan kaiteella',
      saapuminen: 'Vesi nousi kaduille keskellä yötä, ja kanaalit kääntyivät '
        + 'peiliksi. Sillan kaiteella lepäsi valkoinen naamio, jolla oli '
        + 'pitkä linnunnokka — ruttolääkärin kasvot, tyhjät. Kun nostin sen, '
        + 'sen takaa katsoi minua oma heijastukseni vedestä.',
      saapumisLuenta: '[softly] Vesi nousi kaduille keskellä yötä, ja '
        + 'kanaalit kääntyivät peiliksi. [curious] Sillan kaiteella lepäsi '
        + 'valkoinen naamio, jolla oli pitkä linnunnokka — [softly] '
        + 'ruttolääkärin kasvot, tyhjät. [whispers] Kun nostin sen, sen '
        + 'takaa katsoi minua oma heijastukseni vedestä.',
      visa: 'Isoisä kirjoitti: "Täällä kaikki kelluu — myös valheet. Oikea '
        + 'vastaus painuu pohjaan, väärä jää pinnalle kuin naamio. Paina '
        + 'jokaista sormella ennen kuin uskot." Rivin alle oli piirretty '
        + 'märkä tähtäinristi.',
      visaLuenta: '[softly] Isoisä kirjoitti: "Täällä kaikki kelluu — myös '
        + 'valheet. [curious] Oikea vastaus painuu pohjaan, väärä jää '
        + 'pinnalle kuin naamio. Paina jokaista sormella ennen kuin uskot." '
        + '[whispers] Rivin alle oli piirretty märkä tähtäinristi.',
      aarre: 'Kätkö nousi veden alta, ja naamio kellui sen vieressä kasvot '
        + 'ylöspäin. Isoisän rivi: "Jätin sen vartioimaan, koska naamio ei '
        + 'sulje silmiään. Ota kätkö — mutta kun vesi laskee, katso kuka '
        + 'seisoo sillalla."',
      aarreLuenta: '[curious] Kätkö nousi veden alta, ja naamio kellui sen '
        + 'vieressä kasvot ylöspäin. [softly] Isoisän rivi: "Jätin sen '
        + 'vartioimaan, koska naamio ei sulje silmiään. [whispers] Ota kätkö '
        + '— mutta kun vesi laskee, katso kuka seisoo sillalla."',
    },
    {
      id: 'budapest',
      otsikko: 'Budapest — hengittävä labyrintti',
      saapuminen: 'Linnan alla aukeaa labyrintti, jonka seinillä hikoili '
        + 'lämmin vesi kuin luola hengittäisi. Vein kynttilän syvimpään '
        + 'käytävään ja löysin seinästä liidulla piirretyn tähtäinristin — '
        + 'minun merkkini, vaikken ollut käynyt täällä koskaan.',
      saapumisLuenta: '[curious] Linnan alla aukeaa labyrintti, jonka '
        + 'seinillä hikoili lämmin vesi kuin luola hengittäisi. [softly] '
        + 'Vein kynttilän syvimpään käytävään ja löysin seinästä liidulla '
        + 'piirretyn tähtäinristin — [whispers] minun merkkini, vaikken '
        + 'ollut käynyt täällä koskaan.',
      visa: 'Isoisä oli merkinnyt: "Maan alla suunnat valehtelevat. Lämmin '
        + 'seinä osoittaa aina lähteelle, kylmä ulos — luota ihoosi, älä '
        + 'silmiisi. Väärä käytävä vie syvemmälle kuin uskot." Liitu oli '
        + 'vielä sivun välissä.',
      visaLuenta: '[softly] Isoisä oli merkinnyt: "Maan alla suunnat '
        + 'valehtelevat. [curious] Lämmin seinä osoittaa aina lähteelle, '
        + 'kylmä ulos — luota ihoosi, älä silmiisi. Väärä käytävä vie '
        + 'syvemmälle kuin uskot." [whispers] Liitu oli vielä sivun '
        + 'välissä.',
      aarre: 'Kätkö oli lämpimän seinän takana, höyryn peitossa. Isoisän '
        + 'rivi: "Piirsin ristin, jotta löytäisit takaisin — tai jotta minä '
        + 'löytäisin sinut. Pyyhi se pois, kun olet ulkona, ettei seuraava '
        + 'eksy minun jälkeeni."',
      aarreLuenta: '[curious] Kätkö oli lämpimän seinän takana, höyryn '
        + 'peitossa. [softly] Isoisän rivi: "Piirsin ristin, jotta '
        + 'löytäisit takaisin — [warmly] tai jotta minä löytäisin sinut. '
        + 'Pyyhi se pois, kun olet ulkona, ettei seuraava eksy minun '
        + 'jälkeeni."',
    },
  ],
};
