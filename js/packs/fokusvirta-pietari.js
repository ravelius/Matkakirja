/*
 * PIETARIN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4C.
 *
 * Sisartiedosto js/packs/fokusvirta-sevilla.js:lle ja js/packs/
 * fokusvirta-tukholma.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Uusi kaupunki on yksi tiedosto ja yksi rivi
 * rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ PAKETTI EI KIRJOITA SITÄ
 * RIVIÄ eikä koske sw.js:ään, savukkeisiin tai mihinkään muuhun
 * tiedostoon: aallon 4C kaupungit kokoaa integrointiagentti yhtenä
 * nostona.
 *
 * INTEGROIJALLE — KOLME KYTKENTÄÄ, JOTKA TÄSTÄ PUUTTUVAT TARKOITUKSELLA.
 * Repon oma vahti (tests/sw.test.mjs) kaatuu kahteen niistä niin kauan
 * kuin tiedosto on yksin haarallaan, ja se on odotettu tila eikä vika:
 *   1. js/packs/fokusvirrat.js — import ja rivi `pietari:`;
 *   2. sw.js SHELL-lista ("kaikki js-moduulit ovat SHELLissä");
 *   3. tools/build-standalone.mjs MODULES-lista ("yhden tiedoston versio
 *      niputtaa kaikki karttapaketit").
 * Kytkentä on koeajettu: kun paketti lisätään rekisteriin väliaikaisesti,
 * tests/fokusvirta.test.mjs menee läpi kokonaan (34 pass, 0 fail).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 30.8.2026, aallon 4C kaanonpaperi, osio
 * PIETARI). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: tsaarin kadonnut pääsiäismuna (aallon 4C aarreparit;
 * Venäjän pari, jonka toinen pää on Moskovan aarremerkinnässä).
 *
 * ── AARREMERKINTÄ ON ENNE, EI HISTORIAA — LUE TÄMÄ ENNEN TÄKYJÄ ─────
 *
 * Kaanoninen aarremerkintä kertoo kultasepän oppipojasta, joka kuiskaa
 * isoisälle keisarinnalle suunnitellusta lahjasta: "pieni esine, jonka
 * sisään kätketään toinen". Vuonna 1873 sellaista esinettä EI OLLUT
 * OLEMASSA: ensimmäinen keisarillinen pääsiäismuna valmistui vasta
 * 1885, kaksitoista vuotta isoisän käynnin jälkeen. Merkintä on siis
 * kirjoitettu ENTEEKSI, ja se on päätoimittajan tietoinen ratkaisu.
 *
 * Tämän paketin nykyosuudet (täky `faberge`) saavat kertoa munista ja
 * kadonneista munista — ja niiden ON kerrottava ajoitus rehellisesti,
 * ettei pelaaja jää luulemaan isoisän nähneen munan. Täky sanoo sen
 * suoraan ensimmäisessä kappaleessaan.
 *
 * MITÄ 1873 OLI TOTTA (en-Wikipedia "Peter Carl Fabergé" ja "House of
 * Fabergé", haettu 30.8.2026): Carl Fabergé oli ottanut isänsä liikkeen
 * haltuunsa 1872, siis merkintää edeltävänä vuonna, ja liike teki
 * 1870-luvulla luettelointi-, korjaus- ja entisöintityötä keisarillisen
 * palatsin taidekokoelmalle. Liike siirtyi katutason isompiin tiloihin
 * Suurella Merikadulla (Bolshaja Morskaja) vasta 1881 — SIITÄ, missä se
 * täsmälleen oli 1873, en löytänyt kahta riippumatonta lähdettä, joten
 * täky EI väitä osoitetta. Kaanon saa sanoa sen; tämä paketti ei toista
 * väitettä omissa nimissään. (Kirjattu raporttiin.)
 *
 * ── ELÄINTÄKY: KISSAT OVAT LIVIAN, EIVÄT TÄKYJEN ──────────────────
 *
 * Kaanoninen Livian repliikki kertoo jo museon kellareiden kissoista
 * ("ihan virallisesti"), ja sama juttu on kaupunkilehdessä (nosto
 * "Museon virkakissat") sekä kulttuurivisassa (js/packs/
 * europe-kulttuuri.js, pietari). Kolmas kertaus samassa kulussa olisi
 * kaava, joten TÄSSÄ PAKETISSA EI OLE KISSATÄKYÄ. Raamatun
 * eläinlinjaus täyttyy täkynostopoolissa: `baikal` kertoo
 * baikalinnorpasta ja sen kuva on norppakuva.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * Pietarilla EI ole takynostot-työaineistoa (docs/mantereet-tyoaineisto),
 * joten täyt, oppitunti, lehtitehtävä ja täkynostot on rakennettu
 * kahdesta lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Pietarin kaupunkilehti (js/packs/
 *      kulttuuri-kategoriat.js, `pietari`: osiot `kaupunki` ja `arki`),
 *      Venäjän maalehti (js/packs/maa-kategoriat.js, RUS) ja
 *      nähtävyysjutut (js/packs/nahtavyysjutut.js, pietari). Nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 30.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts,
 *      redirects=1, oma User-Agent) artikkeli ja osio kerrallaan, ja
 *      jokaisen kohdan oma kommentti nimeää artikkelin ja osion.
 *      Mitään ei ole päätelty, pyöristetty eikä muistettu.
 *
 * ── VIISI OMISTAJAN LINJAUSTA, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ─────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen.
 *   2. PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan generoituun heroon
 *      (pietari/avauskuvat), ei uuteen Commons-kuvaan.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA.
 *   5. TÄKYNOSTOILLA EI OLE KIINTIÖTÄ (Raamattu): määrä seuraa maan
 *      sisältörikkautta. Venäjällä ei ole ollut yhtään täkynostoa, ja
 *      tämä paketti perustaa poolin — KOLME nostoa (ks. TÄKYNOSTOPOOLI).
 *
 * ── ÄÄNITETTÄ EI OLE ───────────────────────────────────────────────
 *
 * Luentaa ei ole vielä generoitu, joten `matkakirja.aanite` PUUTTUU
 * tarkoituksella (sama ratkaisu kuin Vilnassa ja Tampereella): js/ui.js
 * näyttää kaiuttimen vasta kun kenttä on olemassa, joten poissaolo on
 * hiljaisuus eikä rikkinäinen nappi. `matkakirja.luenta` on kirjoitettu
 * valmiiksi generointierää varten — se on sama teksti tunnetagein,
 * sanaakaan muuttamatta.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin muissa paketeissa: vastaus löytyy syvennystekstistä, mutta
 * kysymyksen sanamuoto ei toistu siinä sellaisenaan. Oikea vaihtoehto on
 * aina indeksi 0 (talon tapa, moottori ei sekoita vaihtoehtoja) — mutta
 * oikea EI ole pisin vaihtoehto yhdessäkään tämän tiedoston visassa. Se
 * on tarinakaaren mittausvaatimus (docs/moduulit/tarinakaari.md, luku 6
 * kohta 2), ja se on tarkistettu käsin merkkimäärinä.
 *
 * ── LAATTAKYSYMYKSIÄ EI SPOILATA ───────────────────────────────────
 *
 * Pietarilla on KAKSI kysymyslähdettä, ja molemmat on tarkistettu:
 *
 *   A. KOHTAAMISEN KYSYMYS tulee tarinakaaren paketista (js/
 *      tyohuone-kehitys-data.js KAARI_PAKETIT, id 'pietari' →
 *      js/packs/tarinakaari.js): *"Millaiselle maalle rakentajat tämän
 *      kaupungin pystyttivät?"* → *"Nevan suiston soille, tammipaalujen
 *      varaan"*. Tämän paketti POHJUSTAA (oppitunti) muttei sano
 *      vastausriviä sanatarkasti missään kentässä: sana "tammipaalu" ei
 *      esiinny tässä tiedostossa kertaakaan.
 *   B. LAATAN MUUT KYSYMYKSET (js/packs/europe-questions.js, `pietari`):
 *      valkeat yöt · Ermitaasi · suomaa · Nevan suisto · kääntösiltojen
 *      syy. Vastausrivejä "valkeat yöt", "Ermitaasi" ja "Nevan" ei
 *      kirjoiteta tämän paketin täkyihin, oppituntiin eikä
 *      kohtaamiseen. Museo kulkee tässä tiedostossa nimellä "palatsin
 *      taidekokoelma", kuten kaanoninen Livian repliikkikin.
 *
 * PÄÄTOIMITTAJAN SPOILERIKIELTOLISTA (aalto 4C) lisää kaksi: EI
 * "Pohjolan Venetsia" -lisänimeä eikä saarten lukumäärää vastausrivinä.
 * Kumpaakaan ei tässä tiedostossa ole.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 30.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD tai CC, ja tekijä on `lahde`-rivillä,
 * koska CC vaatii maininnan. JOKAINEN on lisäksi katsottu silmin 800
 * pikselin esikatseluna, ja yksi ehdokas HYLÄTTIIN juuri siksi (ks.
 * täky `faberge`).
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma
 * generoitu havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi
 * generointiajon, jota tälle aallolle ei ole tehty. Sama ratkaisu kuin
 * Sevillassa ja Tukholmassa: yksi kuva per kortti, `tiedosto`-kenttä.
 */

/*
 * ---------- LEHDEN NIMETTY TEHTÄVÄ ----------
 *
 * Kysymys on vakiona samasta syystä kuin muissa paketeissa: lista
 * tiedoston lopussa lukee sen muuttujasta, jolloin uusi käyttö ei
 * koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Metrokysymys on Pietarin kaupunkilehden
 * sivun 1 artikkelin "Matkailijan Pietari" jakson "Perille ja
 * liikkeelle" tekstiä (js/packs/kulttuuri-kategoriat.js). Uusia
 * faktaväitteitä ei ole.
 *
 * NIMI ON KAUPUNKIKOHTAINEN EIKÄ VAIN "METRO_VISA" (integrointi
 * 30.8.2026). Roomalla on samanniminen vakio (js/packs/
 * fokusvirta-rooma.js), ja yhden tiedoston julkaisu niputtaa kaikki
 * paketit samaan tiedostoon — kaksi samannimistä ylätason vakiota
 * kaataisi buildin. tools/tarkista-niputus.mjs valvoo tätä.
 */
const PIETARIN_METRO_VISA = {
  kysymys: 'Pietarin metro avattiin marraskuussa 1955. Mikä siinä on '
    + 'poikkeuksellista maailman mittakaavassa?',
  vaihtoehdot: [
    'Asemat kuuluvat maailman syvimpiin',
    'Se oli Euroopan ensimmäinen maanalainen rautatie',
    'Junat kulkevat talvella jäätyneen joen alitse tunnelissa',
  ],
  oikea: 0,
  fakta: 'Syvin asema on noin 86 metriä maanpinnan alapuolella, ja '
    + 'linjoja on viisi. Jokien ja kanavien yli kulkee lisäksi yli 340 '
    + 'isompaa siltaa.',
};

export const FOKUSVIRTA_PIETARI = {
  kaupunki: 'pietari',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Pietari, kesäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Keisari rakennutti kaupunkinsa suolle ja käski sen olla '
      + 'suora, ja suo totteli — kadut ovat leveitä kuin joet ja joki '
      + 'leveä kuin meri. Kesäyönä aurinko ei mene mailleen kunnolla, ja '
      + 'ihmiset kävelevät rantakatua keskiyöllä kuin iltapäivällä. '
      + 'Palatsin taidesaleissa kävelin kolme tuntia enkä nähnyt '
      + 'puoliakaan. Sillat avataan öisin laivoille; myöhästyjä saa '
      + 'odottaa aamuun, ja moni odottaa mielellään.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä. Äänitettä ei ole vielä generoitu, joten
     * `aanite`-kenttää ei ole (ks. tiedoston alku).
     */
    luenta: '[curious] Keisari rakennutti kaupunkinsa suolle ja käski '
      + 'sen olla suora, ja suo totteli — kadut ovat leveitä kuin joet ja '
      + 'joki leveä kuin meri. [softly] Kesäyönä aurinko ei mene '
      + 'mailleen kunnolla, ja ihmiset kävelevät rantakatua keskiyöllä '
      + 'kuin iltapäivällä. [excited] Palatsin taidesaleissa kävelin '
      + 'kolme tuntia enkä nähnyt puoliakaan. [whispers] Sillat avataan '
      + 'öisin laivoille; myöhästyjä saa odottaa aamuun, ja moni odottaa '
      + 'mielellään.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); kanoninen `teksti` seuraa
     * sen jälkeen.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1 PAINOPISTE
     * REUNOILLA): lyhentymät ovat vain alussa ("Kääk") ja lopussa
     * ("mut"), keskellä sanat ovat auki; pronominit kokonaisina; ei
     * huutomerkkejä.
     *
     * MIKSI TULVAT: kaanoninen Livia puhuu valoisista kesäöistä,
     * silloista ja museon kissoista — eli isoisän kolmesta viimeisestä
     * lauseesta. Maadoitus vastaa siihen, jota hän EI koske: keisarin
     * käskyyn ja siihen, että suo totteli. Livian vastaus on, ettei vesi
     * totellut.
     *
     * SPOILERIKURI: maadoitus EI sano, minkälaiselle maalle kaupunki
     * pystytettiin eikä miten talot pysyvät pystyssä — se on
     * kohtaamisen laattakysymys (ks. tiedoston alku, kohta A). Sana
     * "suo" ei esiinny maadoituksessa lainkaan, vaikka se on isoisän
     * omassa kaanonlauseessa yllä.
     *
     * FAKTAKURI: kolme väitettä, kaikki pelin omasta jo hyväksytystä
     * Pietari-aineistosta (js/packs/kulttuuri-kategoriat.js, `pietari`,
     * artikkelin jakso "Vesi, joka nousee"). (1) Suurin tulva oli
     * marraskuussa 1824, jolloin vesi nousi yli neljä metriä normaalin
     * yläpuolelle. (2) Kaupunki eli tulvien varassa lähes kolmesataa
     * vuotta. (3) Noin 25 kilometrin suojapato valmistui kokonaan vasta
     * vuonna 2011.
     */
    maadoitus: 'Kääk. Suoran käskeminen onnistui, veden käskeminen ei: '
      + 'marraskuussa 1824 vesi nousi täällä yli neljä metriä normaalin '
      + 'yläpuolelle, ja kaupunki eli tulvien varassa lähes kolmesataa '
      + 'vuotta. Kahdenkymmenenviiden kilometrin suojapato valmistui '
      + 'kokonaan vasta 2011 — isoisäsi käynnistä siihen meni vielä sata '
      + 'neljäkymmentä vuotta. Kadut ovat yhä suorat, mut kuivia ne ovat '
      + 'olleet vasta vähän aikaa.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan.
     *
     * HUOM KUVAN JA TEKSTIN SUHTEESTA. Repliikki puhuu palatsin
     * taidekokoelmasta, ja karusellin ensimmäinen hero on juuri
     * Talvipalatsi (js/packs/kulttuuri-kategoriat.js, pietari/
     * avauskuvat) — kuva ja teksti osuvat siis samaan rakennukseen.
     */
    teksti: 'Ne valoisat kesäyöt ovat edelleen kaupungin juhla-aikaa, ja '
      + 'siltojen nousua kerääntyy katsomaan väkeä kuin ilotulitusta.. '
      + 'Se palatsin taidekokoelma on nykyään yksi maailman suurimmista '
      + 'museoista — ja sen kellareissa asuu kissoja vartioimassa '
      + 'aarteita, ihan virallisesti. Rantakadulle siis, vaikka kello '
      + 'olisi mitä.',
    kuva: {
      ampari: 'herokoe/hero-pietari-aamu.png',
      /* Selite on lehden oman avauskuvan selite sellaisenaan; yksikään
       * luku ei muutu. Se on jo yhden virkkeen mittainen. */
      selite: 'Talvipalatsi valmistui 1762 Bartolomeo Rastrellin '
        + 'piirustuksin, ja sen edustan Aleksanterin pylväs (1834) on '
        + 'nostettu paikalleen yhtenä 600 tonnin graniittikappaleena.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: se on aarremerkinnän oma jatko. Merkintä
       * päättyy kehotukseen "pidä silmällä pieniä esineitä, joiden
       * sisällä on salaisuus", ja tämä kertoo, mitä niistä esineistä
       * lopulta tuli ja mihin kuusi niistä katosi. ISO AARRE (tsaarin
       * kadonnut pääsiäismuna) on juuri tämä lanka.
       *
       * AJOITUS SANOTAAN ÄÄNEEN: ks. tiedoston alun osio
       * "AARREMERKINTÄ ON ENNE, EI HISTORIAA". Täky avaa sillä, ettei
       * isoisä voinut nähdä munaa — muuten pelaaja luulisi merkintää
       * silminnäkijähavainnoksi.
       *
       * FAKTAT (en-Wikipedia "Fabergé egg", johdanto sekä osiot
       * "History" ja "Location of eggs"; "House of Fabergé", osiot
       * "Early years" ja "Carl Fabergé"; "Peter Carl Fabergé", osio
       * "Head of the family business"; "Third Imperial Egg", johdanto
       * ja osio "Finding the egg". Kaikki haettu 30.8.2026):
       *   - Gustav Fabergé perusti liikkeen Pietariin 1842; poika Carl
       *     otti sen haltuunsa 1872 ja liike teki 1870-luvulla
       *     luettelointi-, korjaus- ja entisöintityötä keisarillisen
       *     palatsin taidekokoelmalle; katutason isompiin tiloihin
       *     Suurelle Merikadulle muutettiin 1881;
       *   - ensimmäinen keisarillinen pääsiäismuna ("Kanamuna") tehtiin
       *     pääsiäiseksi 1885 Aleksanteri III:n tilauksesta keisarinna
       *     Maria Fjodorovnalle; ulkokuori oli 65 mm valkoista emalia,
       *     sisällä kultainen keltuainen, sen sisällä kultainen kana ja
       *     kanan sisällä pienoiskoossa timanttinen kruunu ja
       *     rubiinikoru — nämä kaksi ovat kadonneet; muna maksoi 4 151
       *     ruplaa;
       *   - munia tehtiin 1885–1917, ja keisarillisia niistä oli 50
       *     (Aleksanteri III tilasi 10, Nikolai II 40); vuosina 1904 ja
       *     1905 ei tehty yhtään;
       *   - vallankumouksen jälkeen bolshevikit kansallistivat liikkeen,
       *     perhe lähti maasta ja Carl Fabergé kuoli Sveitsissä 1920;
       *     keisariperheen palatsit tyhjennettiin ja aarteet siirrettiin
       *     Kremlin asevarastoon Leninin määräyksestä;
       *   - Stalin myi munia valuutan takia: 1930–1933 neljätoista
       *     keisarillista munaa lähti Venäjältä;
       *   - viidestäkymmenestä toimitetusta munasta 44 on tallella,
       *     kuusi on kateissa, ja kaikki kuusi kuuluivat Maria
       *     Fjodorovnalle; kolmesta kadonneesta on valokuva;
       *   - vuoden 1887 kolmas keisarillinen muna löytyi uudelleen
       *     2012, ja löytö julkistettiin 2014: nimetön ostaja
       *     Yhdysvaltain keskilännestä oli maksanut siitä 14 000
       *     dollaria aikoen myydä sen romukullaksi, mutta piti sen kun
       *     kauppa ei olisi tuottanut; vuosia myöhemmin hän luki
       *     kadonneesta munasta, otti yhteyttä asiantuntijoihin, ja
       *     tunnistettu muna arvioitiin noin 33 miljoonan dollarin
       *     arvoiseksi. Yllätys munan sisällä on Vacheron Constantinin
       *     naisten kello.
       *
       * MITÄ EI KERROTA: vallankumouksen väkivalta ja keisariperheen
       * kohtalo. Aarrelanka kulkee esineissä, ei teloituksissa.
       */
      id: 'faberge',
      nappi: 'Munat, joita ei ole löydetty',
      otsikko: 'Kuusi keisarillista pääsiäismunaa on yhä kateissa',
      teksti: 'Ensin ajoitus, ettei tule väärinkäsitystä: isoisäsi ei '
        + 'voinut nähdä yhtäkään munaa. Ensimmäinen valmistui '
        + 'pääsiäiseksi 1885, kaksitoista vuotta hänen käyntinsä '
        + 'jälkeen. Liike oli kyllä olemassa: Gustav Fabergé perusti sen '
        + 'tähän kaupunkiin 1842, ja poika Carl otti sen haltuunsa 1872 '
        + '— merkintää edeltävänä vuonna. Silloin siellä ei tehty '
        + 'keisarille lahjoja vaan luetteloitiin, korjattiin ja '
        + 'entisöitiin palatsin taidekokoelman esineitä. Sitten '
        + 'Aleksanteri III tilasi vaimolleen pääsiäislahjan, ja siitä '
        + 'tuli tapa. Ensimmäinen muna oli '
        + 'ulkoa kuusi ja puoli senttiä valkoista emalia. Se aukesi, ja '
        + 'sisällä oli kultainen keltuainen; keltuainen aukesi, ja '
        + 'sisällä istui kultainen kana; kanan sisällä oli timanttinen '
        + 'kruunu ja rubiinikoru. Ne kaksi viimeistä ovat kadoksissa. '
        + 'Keisarillisia munia tehtiin kaikkiaan viisikymmentä. Vuoden '
        + '1917 jälkeen liike kansallistettiin ja aarteet vietiin '
        + 'Kremlin asevarastoon; 1930-luvun alussa niistä myytiin '
        + 'neljätoista ulkomaille valuutan takia. '
        + 'Neljäkymmentäneljä tunnetaan yhä; kuusi on kateissa, ja ne '
        + 'kaikki olivat saman naisen omia. Yksi palasi: vuoden 1887 muna '
        + 'löytyi Yhdysvaltain keskilännestä. Joku oli ostanut sen '
        + 'neljällätoista tuhannella dollarilla sulattaakseen sen '
        + 'romukullaksi, huomannut ettei kauppa kannata, ja jättänyt sen '
        + 'keittiöön. Vuosia myöhemmin hän luki lehdestä kadonneesta '
        + 'munasta. Se oli sama muna, ja arvoksi arvioitiin '
        + 'kolmekymmentäkolme miljoonaa dollaria.',
      /*
       * Commons 30.8.2026: 1759×1169, CC BY-SA 4.0, Mihail Ovtšinnikov
       * (Михаил Овчинников), kuvattu 16.9.2013, kuvaus "Императорское
       * пасхальное яйцо «Курочка» из коллекции Музея Фаберже в
       * Санкт-Петербурге". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * pelkkä muna vitriinissä, ei ihmisiä.
       *
       * HYLÄTTY EHDOKAS, JOTTA SITÄ EI YRITETÄ UUDESTAAN: File:First
       * Hen (Fabergé egg).jpg (2048×1365, CC BY-SA 2.0) on tarkempi
       * kuva samasta munasarjasta, MUTTA sen lasin läpi näkyy kaksi
       * tunnistettavaa museovierasta kasvot edessä. Faktapohjan
       * erityisehto (ei tunnistettavia eläviä ihmisiä) kaataa sen.
       *
       * MIKSI JUURI TÄMÄ KUVA: siinä muna on kiinni. Koko täyn kärki on
       * se, että esine näyttää ulkoa tavalliselta — kuva sanoo sen
       * ilman yhtäkään sanaa.
       */
      kuva: {
        tiedosto: 'Яйцо "Курочка" (cropped).JPG',
        selite: 'Vuoden 1885 ensimmäinen keisarillinen pääsiäismuna on '
          + 'ulkoa valkoista emalia ja munan näköinen; kaikki oleellinen '
          + 'on sen sisällä.',
        lahde: 'Mihail Ovtšinnikov, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Viisikymmentä keisarillista pääsiäismunaa valmistui, '
          + 'ja osa niistä on hävinnyt jäljettömiin. Kuinka moni?',
        vaihtoehdot: [
          'Kuusi',
          'Yksi ainoa, ja sekin löytyi jo',
          'Yli puolet koko sarjasta',
        ],
        oikea: 0,
        fakta: 'Kaikki kadonneet kuuluivat leskikeisarinna Maria '
          + 'Fjodorovnalle, ja kolmesta niistä on säilynyt valokuva. '
          + 'Vuoden 1887 muna löytyi 2012 ja tunnistettiin 2014.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisän merkintä alkaa siitä, että keisari
       * käski ja suo totteli. Tämä on saman käskyn konkreettisin
       * jäljellä oleva kappale — ja se on mittaustarina, eli juuri sitä
       * lajia, jota kartanpiirtäjä lukisi kaksi kertaa. Se on myös
       * pöllön kuvan pari: Aleksanterin pylväs on 600 tonnin
       * graniittikappale, tämä 1 500 tonnin.
       *
       * FAKTAT (en-Wikipedia "Bronze Horseman", johdanto sekä osiot
       * "Statue" ja "Thunder Stone"; haettu 30.8.2026):
       *   - patsaan tilasi Katariina Suuri, veisti ranskalainen Étienne
       *     Maurice Falconet, ja se paljastettiin yleisölle 18.8.1782
       *     (v.l. 7.8.); työhön meni kaksitoista vuotta 1770–1782;
       *   - jalustaksi otettu rapakivigraniittilohkare löytyi 1768
       *     Lahtasta (Lakhta) kuuden kilometrin päästä Suomenlahden
       *     rannasta; nimi tulee paikallisesta tarinasta, jonka mukaan
       *     ukkonen oli lohkaissut siitä palan;
       *   - Falconet halusi veistää kiven paikan päällä, mutta
       *     Katariina käski siirtää sen ensin kokonaisena; kivi oli
       *     puoliksi maassa ja maasto pehmeää;
       *   - kefalonialainen Marinos Karburis, Venäjän armeijan
       *     everstiluutnantti ja Wienissä opiskellut insinööri, otti
       *     työn: odotettiin talvea, jotta jäätynyt maa kantaisi, ja
       *     rakennettiin metallinen reki, joka liukui noin 13,5 sentin
       *     pronssipallojen päällä uraa pitkin — kuulalaakerin tapaan;
       *   - kaikki tehtiin ihmisvoimin, ilman eläimiä ja koneita: 400
       *     miestä yhdeksän kuukautta, isompaa vinssiä kiersi 32 miestä
       *     ja kivi liikkui hädin tuskin; rataa oli vain sata metriä,
       *     joten se purettiin ja ladottiin uudelleen jatkuvasti;
       *     tasaisella edettiin yli 150 metriä päivässä, ja
       *     kivenhakkaajat veistivät kiveä koko matkan ajan;
       *   - rannassa rakennettiin proomu vain tätä kiveä varten, ja sitä
       *     kannattelivat molemmilta puolilta kaksi täysikokoista
       *     sotalaivaa; kivi oli perillä 1770, lähes kahden vuoden työn
       *     jälkeen, ja saapumisesta lyötiin muistomitali;
       *   - vuoden 1882 La Nature -lehden mukaan kiven mitat ennen
       *     veistämistä olivat 7 × 14 × 9 metriä ja paino graniitin
       *     tiheydellä laskien noin 1 500 tonnia; jalustaksi veistettynä
       *     se painaa 1 250 tonnia.
       *
       * MITALIN TEKSTIÄ EI SITEERATA. Lähde antaa sen vain
       * englanninkielisenä käännöksenä ("Close to Daring"), eikä
       * alkukielinen sanamuoto ollut tarkistettavissa toisesta
       * lähteestä — käännöksen käännös olisi arvaus, joten täky sanoo
       * vain, että mitali lyötiin. Kirjattu raporttiin.
       */
      id: 'ukkoskivi',
      nappi: 'Kivi, jota neljäsataa miestä veti yhdeksän kuukautta',
      otsikko: 'Ukkoskivi',
      teksti: 'Katariina Suuri halusi edeltäjälleen ratsastajapatsaan, ja '
        + 'patsas tarvitsi jalustan. Sellainen löytyi 1768 Lahtan kylän '
        + 'luota, kuuden kilometrin päässä merenrannasta: yksi ainoa '
        + 'graniittilohkare, seitsemän kertaa neljätoista kertaa '
        + 'yhdeksän metriä, painoa noin tuhatviisisataa tonnia. '
        + 'Paikallinen tarina kertoi, että ukkonen oli kerran lohkaissut '
        + 'siitä palan. Veistäjä olisi hakannut kiven muotoonsa siinä '
        + 'missä se makasi, mutta keisarinna käski siirtää sen '
        + 'kokonaisena. Työn otti hoitaakseen kefalonialainen Marinos '
        + 'Karburis, insinööri ja Venäjän armeijan everstiluutnantti, ja '
        + 'hänen ratkaisunsa oli tämä: odotetaan talvea, jotta jäätynyt '
        + 'maa kantaa, ja rakennetaan metallinen reki, joka ei liu\'u '
        + 'vaan pyörii — uraa pitkin, noin kolmentoista ja puolen sentin '
        + 'pronssipallojen päällä. Kuulalaakeri ennen kuulalaakeria. '
        + 'Vetäjinä oli ihmisiä, ei yhtään hevosta eikä konetta: '
        + 'neljäsataa miestä yhdeksän kuukautta. Isointa vinssiä kiersi '
        + 'kolmekymmentäkaksi miestä, ja sillä kivi liikkui juuri ja '
        + 'juuri. Rataa oli kerrallaan sata metriä, joten takimmainen '
        + 'pätkä purettiin ja kannettiin eteen yhä uudestaan; tasaisella '
        + 'päästiin silti yli sataviisikymmentä metriä päivässä, ja '
        + 'kivenhakkaajat veistivät kiveä koko matkan ajan. Rannassa '
        + 'rakennettiin sitä varten oma proomu, jota kannatteli '
        + 'kummaltakin puolelta täysikokoinen sotalaiva. Kivi oli '
        + 'perillä 1770, ja saapumisesta lyötiin muistomitali.',
      /*
       * Commons 30.8.2026: 703×418, public domain, I. F. Schleyn
       * kaiverrus J. M. Feltenin piirroksesta 1770, kuvaus "The
       * Transportation of the Thunder-stone in the Presence of
       * Catherine II". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * käsinväritetty kaiverrus, jossa väkeä sadoittain — piirrettyjä,
       * ei valokuvattuja ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on aikalaiskuva itse siirrosta, ja
       * siinä näkyy kaikki, mitä teksti kuvaa: rata, vinssit,
       * kivenhakkaajat kiven päällä ja katsojajoukko lumella. Kuva on
       * pieni (703 px), mutta se on ainoa aikalaiskuva tapahtumasta.
       */
      kuva: {
        tiedosto: 'Thunder Stone.jpg',
        selite: 'Vuoden 1770 kaiverrus näyttää ukkoskiven matkalla: '
          + 'kivenhakkaajat veistävät sitä päällä samalla kun sitä '
          + 'vedetään vinsseillä rataa pitkin kohti merta.',
        lahde: 'I. F. Schley J. M. Feltenin piirroksesta 1770, '
          + 'Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Millä keinolla tuhatviisisataa tonnia painava lohkare '
          + 'saatiin liikkumaan merenrantaan asti?',
        vaihtoehdot: [
          'Reki liukui pronssipallojen päällä',
          'Sitä vieritettiin puurullien päällä väkipyörien avulla',
          'Sitä vetivät sadat hevoset jäätynyttä jokea pitkin',
        ],
        oikea: 0,
        fakta: 'Neljäsataa miestä liikutti kiveä yhdeksän kuukautta ilman '
          + 'eläimiä ja koneita. Rataa oli kerrallaan sata metriä, ja se '
          + 'purettiin ja ladottiin uudelleen koko matkan ajan.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: se on kartanpiirtäjän oma kysymys. Isoisä
       * mittaa kaiken, ja hänen taskussaan on kartta, jonka pituusasteet
       * lasketaan Greenwichistä. Kahdenkymmenen kilometrin päässä
       * etelään kulkee toinen nollapiste, ja kaikki tämän maan kartat
       * laskevat siitä. Täky ei kerro sitä hänelle — se kerrotaan
       * pelaajalle.
       *
       * FAKTAT (en-Wikipedia "Pulkovo Observatory", johdanto ja osio
       * "Early years"; "Struve Geodetic Arc", johdanto; haettu
       * 30.8.2026):
       *   - observatorio on 19 kilometriä Pietarista etelään Pulkovan
       *     kukkuloilla 75 metrin korkeudessa ja avattiin 1839;
       *   - se oli saksalais-venäläisen Friedrich Georg Wilhelm von
       *     Struven hanke, ja hän oli sen ensimmäinen johtaja; poika
       *     Otto Wilhelm seurasi 1861; arkkitehti oli Aleksandr Brjullov;
       *   - päätyö oli tähtien koordinaattien ja tähtitieteen vakioiden
       *     (prekessio, nutaatio, aberraatio, refraktio) määrittäminen
       *     sekä kaksoistähtien mittaus; tähtiluetteloita julkaistiin
       *     vuosille 1845, 1865, 1885, 1905 ja 1930;
       *   - varusteisiin kuului 15 tuuman refraktori, aikansa
       *     suurimpia; 1885 saatiin 30 tuuman, maailman suurin
       *     käyttökelpoinen refraktori kunnes Lickin 36 tuuman valmistui
       *     Kaliforniassa muutamaa vuotta myöhemmin;
       *   - Pulkovan meridiaani kulkee päärakennuksen keskeltä 30°19,6'
       *     Greenwichistä itään, ja se oli lähtöpiste kaikille Venäjän
       *     vanhoille maantieteellisille kartoille;
       *   - observatorio osallistui meridiaanikaaren mittaukseen
       *     Tonavalta Jäämerelle (vuoteen 1851) ja Huippuvuorten
       *     kolmiomittaukseen 1899–1901;
       *   - Struven kolmiomittausketju rakennettiin ja mitattiin
       *     1816–1855 maapallon koon ja muodon selvittämiseksi:
       *     Hammerfestista Norjasta Mustallemerelle, 2 820 kilometriä,
       *     258 pääkolmiota ja 265 mittauspistettä; silloin ketju kulki
       *     kolmen maan läpi, nykyään kymmenen; ketjun ensimmäinen piste
       *     on Tarton observatorio; se pääsi maailmanperintöluetteloon
       *     2005, ja luettelossa on 34 muistolaattaa tai obeliskia
       *     alkuperäisistä 265 pisteestä.
       */
      id: 'pulkova',
      nappi: 'Nollameridiaani, joka ei ollut Greenwichissä',
      otsikko: 'Pulkovan meridiaani',
      teksti: 'Yhdeksäntoista kilometriä kaupungista etelään, '
        + 'seitsemänkymmenenviiden metrin kukkulalla, avattiin vuonna '
        + '1839 observatorio. Sen takana oli Friedrich Georg Wilhelm von '
        + 'Struve, joka johti sitä ensimmäisenä; poika Otto Wilhelm '
        + 'seurasi isäänsä 1861. Talossa tehtiin sitä työtä, joka ei '
        + 'näytä miltään mutta jota ilman mikään muu ei toimi: '
        + 'määritettiin tähtien koordinaatteja ja tähtitieteen vakioita. '
        + 'Tähtiluetteloita julkaistiin vuosille 1845, 1865, 1885, 1905 '
        + 'ja 1930, ja kaukoputki oli aikansa suurimpia. Mutta se, jonka '
        + 'isoisäsi olisi kirjannut ylös ensimmäisenä, on tämä: '
        + 'päärakennuksen keskeltä kulkee viiva. Se on kolmekymmentä '
        + 'astetta ja yhdeksäntoista ja kuusi kymmenesosaa minuuttia '
        + 'Greenwichistä itään, ja siitä laskettiin pituusasteet '
        + 'kaikkiin tämän maan vanhoihin karttoihin. Kaksi karttaa '
        + 'samasta rannikosta saattoi siis olla molemmat oikeassa ja '
        + 'silti eri mieltä siitä, missä ollaan. Ja sama Struve mittasi '
        + 'vielä isomman asian: vuosina 1816–1855 hän vei '
        + 'kolmiomittausketjun Norjan Hammerfestista Mustallemerelle '
        + 'selvittääkseen maapallon koon ja muodon. Ketju on '
        + 'kaksituhatta kahdeksansataakaksikymmentä kilometriä pitkä, ja '
        + 'siinä on kaksisataakuusikymmentäviisi mittauspistettä. '
        + 'Silloin se kulki kolmen maan halki. Nykyään samat pisteet '
        + 'ovat kymmenessä maassa, eikä yksikään niistä liikkunut.',
      /*
       * Commons 30.8.2026: 1087×757, public domain, Jev. Bernardski
       * (1819–1889), päiväys 1855, kuvaus "Pulkovo Observatory in 1855".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty: käsinväritetty
       * kaiverrus, jossa kaukana kaksi piirrettyä kulkijaa ja koira —
       * ei valokuvattuja ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on kahdeksantoista vuotta ennen
       * isoisän käyntiä ja näyttää talon sellaisena kuin hän olisi sen
       * nähnyt — kolme kupolia, pylväikkö ja aita niityn takana.
       */
      kuva: {
        tiedosto: 'Ev. Bernardsky. Pulkovo Observatory in 1855.jpg',
        selite: 'Kaiverrus vuodelta 1855 näyttää Pulkovan observatorion '
          + 'kukkulallaan: kolme kupolia, pylväikkö ja aita niityn '
          + 'takana.',
        lahde: 'Jev. Bernardski 1855, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mikä Pulkovan meridiaani oli 1800-luvun Venäjällä?',
        vaihtoehdot: [
          'Karttojen nollapiste',
          'Rautatielinja, jota pitkin tarkka kellonaika siirrettiin',
          'Kaupungin halki vedetty pääkatu, joka osoitti etelään',
        ],
        oikea: 0,
        fakta: 'Viiva kulkee observatorion päärakennuksen keskeltä, 30 '
          + 'astetta ja 19,6 minuuttia Greenwichistä itään. Struven '
          + 'kolmiomittausketju Hammerfestista Mustallemerelle on 2 820 '
          + 'kilometriä pitkä ja pääsi maailmanperintöluetteloon 2005.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * POHJUSTAA KOHTAAMISEN LAATTAKYSYMYKSEN (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, id 'pietari' → js/packs/tarinakaari.js): *"Sillat
   * nousevat öisin, sillä joki on kaupungin valtakatu. Millaiselle
   * maalle rakentajat tämän kaupungin pystyttivät?"*
   *
   * Visasääntö täyttyy: pelaaja oppii periaatteen — pehmeä maa kantaa,
   * kun sen läpi lyödään puuta — mutta vastausriviä ei sanota. Sana
   * "tammipaalu" ei esiinny tässä tiedostossa kertaakaan, ja oppitunti
   * puhuu YHDESTÄ RAKENNUKSESTA, ei kaupungista.
   *
   * MIKSI IISAKIN KIRKKO: koska sanonta on suomea. "Rakentaa kuin
   * Iisakin kirkkoa" on suomen kielen oma sanonta loputtomasta
   * urakasta, ja se on lainattu juuri tästä työmaasta — pelaajalle
   * tuttu lause osoittautuu tämän kaupungin osoitteeksi. Kaupunkilehti
   * ei käsittele kirkkoa lainkaan; siitä on vain yksi avauskuvan selite
   * (js/packs/kulttuuri-kategoriat.js, pietari/avauskuvat), joka kertoo
   * kirkon nimikkopyhimyksestä ja museoksi muuttamisesta 1931 — kumpaakaan
   * ei tässä toisteta.
   *
   * FAKTAT (en-Wikipedia "Saint Isaac's Cathedral", johdanto sekä osiot
   * "History", "Exterior", "Dome" ja "Technologies"; haettu 30.8.2026):
   *   - Aleksanteri I määräsi kirkon rakennettavaksi; suunnittelijaksi
   *     valittiin ranskalaissyntyinen Auguste de Montferrand keisarin
   *     omalla päätöksellä, vaikka komissio epäili;
   *   - rakentaminen kesti neljäkymmentä vuotta, 1818–1858, ja maksoi
   *     miljoona kultaruplaa;
   *   - perustusta vahvistettiin lyömällä maahan paaluja; artikkeli
   *     antaa niiden määrästä KAKSI ERI LUKUA eri osioissa (25 000
   *     "History", 10 000 puunrunkoa "Technologies"), joten oppitunti EI
   *     KERRO LUKUA LAINKAAN — periaate on varma, luku ei;
   *   - ulkopinnassa on 112 punagraniittipylvästä korinttilaisin
   *     kapiteelein, jokainen hakattu ja pystytetty yhtenä kappaleena:
   *     48 alimmalla tasolla, 24 ylimmän kupolin rotundassa, 8
   *     kussakin neljässä sivukupolissa ja 2 jokaisen neljän ikkunan
   *     kehyksenä; kivi louhittiin Pyterlahdesta Virolahdelta Suomesta;
   *   - pylväät nostettiin pystyyn suurilla puutelineillä ENNEN kuin
   *     seinät muurattiin (insinööreinä William Handyside ja muut);
   *   - pääkupoli nousee 101,5 metriin ja on kullattu; kullaus tehtiin
   *     ruiskumaalausta muistuttavalla tavalla, ja liuoksessa oli
   *     elohopeaa, jonka höyryihin kuoli kuusikymmentä työmiestä;
   *   - kupolin kannatinrakenne on valurautaa — kolmas valurautakupoli
   *     historiassa Nevjanskin kaltevan tornin (1732) ja Mainzin
   *     tuomiokirkon (1826) jälkeen;
   *   - kupolin sisäkorkeus lattiasta oculukseen on 69 metriä;
   *   - neljänkymmenen vuoden urakasta juontuu suomen kielen sanonta
   *     "rakentaa kuin Iisakin kirkkoa".
   */
  oppitunti: {
    otsikko: 'Rakentaa kuin Iisakin kirkkoa',
    teksti: 'Suomen kielessä on sanonta työstä, joka ei koskaan tunnu '
      + 'valmistuvan: rakentaa kuin Iisakin kirkkoa. Sanonnalla on '
      + 'osoite, ja se on tässä kaupungissa. Kirkkoa rakennettiin '
      + 'neljäkymmentä vuotta, 1818–1858, saman arkkitehdin Auguste de '
      + 'Montferrandin johdolla. Miksi niin kauan? Ensimmäinen syy on '
      + 'maan alla. Ennen kuin mitään voitiin muurata, maahan lyötiin '
      + 'pystyyn puunrunkoja tiiviisti vieretysten, ja koko rakennus '
      + 'lepää niiden päällä. Se on tämän seudun tapa: kun maa on liian '
      + 'pehmeää kantamaan kiveä, sen läpi lyödään puuta niin kauan että '
      + 'se kantaa. Toinen syy on pylväissä. Niitä on satakaksitoista, '
      + 'punaista graniittia, ja jokainen on hakattu ja pystytetty '
      + 'yhtenä ainoana kappaleena. Kivi louhittiin Pyterlahdesta '
      + 'Virolahdelta — Suomen puolelta siis. Ja tässä on se kohta, '
      + 'jonka isoisäsi olisi piirtänyt muistiin: pylväät nostettiin '
      + 'pystyyn ennen kuin seiniä oli. Työmaalla seisoi puinen teline '
      + 'korkea kuin kirkko itse, ja sen sisällä pylväät nostettiin '
      + 'paikoilleen tyhjään ilmaan, jonne rakennus vasta myöhemmin '
      + 'tuli. Kupoli nousee satayhteen ja puoleen metriin, ja sen '
      + 'kannatinrakenne on valurautaa. Kullaus tehtiin '
      + 'ruiskumaalausta muistuttavalla '
      + 'tavalla, ja liuoksessa oli elohopeaa: sen höyryihin kuoli '
      + 'kuusikymmentä työmiestä. Kun isoisäsi käveli ohi kesäkuussa '
      + '1873, kirkko oli viisitoista vuotta vanha — sitä oli rakennettu '
      + 'melkein kolme kertaa niin kauan kuin se oli ollut valmis. '
      + 'Pylväät ovat kiveä, kupoli valurautaa, kullassa oli elohopeaa. '
      + 'Mutta se, minkä varassa kaikki seisoo, on puuta.',
    /*
     * Commons 30.8.2026: 1873×1331, public domain, Auguste de
     * Montferrand, litografia 1845, kuvaus "St. Petersburg. installation
     * of columns of St. Isaac's Cathedral (by 1830). Lithograph."
     * Restrictions tyhjä. SILMÄTARKISTUS tehty: litografia, jossa
     * työmiehiä telineillä ja lankuilla — piirrettyjä, ei valokuvattuja
     * ihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on arkkitehdin oma laattakuva juuri
     * siitä hetkestä, jonka oppitunti nostaa esiin — pylväs nousee
     * telineessä, ja taustalla näkyy, ettei seiniä vielä ole.
     */
    kuva: {
      tiedosto: 'СПБ. Установка колонн Исаакиевского собора (к 1830). Лит.~1845г 15 e1.jpg',
      selite: 'Montferrandin oma litografia näyttää pylväiden noston: '
        + 'graniittipylväät pystytettiin valtavissa puutelineissä, ja '
        + 'seinät muurattiin vasta niiden ympärille.',
      lahde: 'Auguste de Montferrand 1845, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * HAHMOA EI OLE KEKSITTY TÄSSÄ. Pietarilla ON tarinakaaren paketti
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'pietari'), joka
   * antaa hahmon JA sen kysymyksen, jonka game.actionQuiz esittää
   * laatalla (js/game.js kaariTilanne, js/packs/tarinakaari.js). Hahmo
   * on siis sillanhoitaja Dmitri, eikä tämä paketti kosketa hänen omaa
   * repliikkiään eikä kysymystä millään tavalla — sama suhde kuin
   * Ateenan Nikoksella, Sofian Nadialla ja Rooman Enzolla.
   *
   * ALLA OLEVA on siis kortin OMA ESITTELYTEKSTI, ei kaanonia, ja se on
   * merkitty katselmoitavaksi omistajan ohjeen mukaan. Se on
   * kirjoitettu niin, ettei se kertaa Dmitrin omaa repliikkiä
   * ("Kirjaan merkitään laiva, joka ei ole vielä palannut…") eikä
   * paljasta vastausta.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortti rakennetaan ilman
   * kuvaa, joten kentät ovat hahmo, nappi, varmistus, vihjeOsio ja
   * teksti. Kansiossa assets/kohtaamiset ei myöskään ole Pietarin
   * kuvaa, eikä tänne kirjoiteta polkua, jota ei ole.
   *
   * VARALLISUUSSÄÄNTÖ tarkistettu virke virkkeeltä: isoisä ei maksa
   * mitään, ei tilaa mitään eikä komenna ketään. Dmitrin kaanoninen
   * repliikki sisältää isoisän pienen pyynnön ("pyysi sukuani pitämään
   * sivun auki"), ja juuri siksi ESITTELY EI TOISTA SITÄ: suvun oma syy
   * jatkaa on tässä ammattitapa, ei velvoite.
   *
   * ÄÄNIPROFIILI (tarinakaari, luku 3): Dmitri on niitä, jotka
   * tarkistavat saman asian joka yö vaikka tietävät vastauksen — ei
   * puhelias, ei äreä, vaan tarkka.
   */
  kohtaaminen: {
    hahmo: 'Sillanhoitaja Dmitri',
    nappi: 'Tapaa Dmitri',
    varmistus: 'Haluatko varmasti tavata Dmitrin juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js,
     * pietari): 'kaupunki' tai 'arki'. Kohtaamisen kysymys koskee
     * maaperää ja perustuksia, ja sen lähin tuki on kaupunkisivun nosto
     * "Kaupunki rakennettiin suolle" — siis 'kaupunki'.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Dmitri tulee koneistokammioon puoli tuntia ennen nostoa ja '
      + 'käy saman vivun läpi kuin edellisenä yönä, vaikka tietää sen '
      + 'kunnon ulkoa. Suku on hoitanut siltoja niin kauan, ettei kukaan '
      + 'muista kirjanpidon aloittajaa; Dmitri sanoo pitävänsä tapaa '
      + 'pikemminkin ammattina kuin perintönä, ja jatkavansa siksi, että '
      + 'kesken jätetty vuoro näkyisi heti joessa. Kaiteen takana seisoo '
      + 'öisin väkeä katsomassa, eikä hän häädä ketään. Vierasta hän ei '
      + 'päästä koneiston viereen ennen kuin tämä osaa vastata siihen, '
      + 'mitä hän itse pitää kaupungin ainoana oikeana kysymyksenä: '
      + 'minkä varaan tämä kaikki on ylipäätään pystytetty.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin muissa fokuskaupungeissa.
   */

  /*
   * KOHTAAMISPAIKKA: PALATSISILTA, Nevan ylitys Talvipalatsin kohdalla.
   * Dmitri on sillanhoitaja, ja Palatsisilta on se kääntösilta, jonka
   * nousua kaanoninen Livian repliikki käy katsomassa.
   *
   * 59,941149 N / 30,308105 E — en-Wikipedia "Palace Bridge",
   * prop=coordinates (haettu 30.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö LEVEYS
   * 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((30,308105 − (−175)) mod 360) × (12000/360)
   *                     = 205,308105 × 33,3333… = 6843,6
   *                   y = (millerY(59,941149) − millerY(76)) × 12000/2π
   *                     = 928,6
   *   europe          x = (30,308105 + 11) × 19,2 = 793,1
   *                   y = (72 − 59,941149) × 26,3 = 317,1
   *
   * TARKISTUS PIETARIN LAATTAA VASTEN: laatta on Euroopan laudalla
   * 793 / 317 ja maailmankartalla 6843,4 / 928,4 (js/packs/europe.js ja
   * js/packs/maailmankartta.js) — eli laatta on omalla oikealla
   * paikallaan, ja kohtaamispiste osuu käytännössä sen päälle (ero alle
   * 0,2 yksikköä). Se on oikein eikä virhe: silta on kaupungin
   * keskustassa. Koska ero alittaa js/fokuspiste.js:n PISTE_ERO_MIN-rajan
   * (14), peli siirtää PIIRRETYN merkin koilliseen laatan viereen, ja
   * molemmat näkyvät erikseen. Dataan ei kosketa (sama ratkaisu kuin
   * Tallinnassa).
   */
  kohtaamispiste: {
    nimi: 'Palatsisilta',
    laudat: {
      maailmankartta: { x: 6843.6, y: 928.6 },
      europe: { x: 793.1, y: 317.1 },
    },
  },

  /*
   * NIMETTY MINITEHTÄVÄ KAUPUNKILEHDEN SIVULLE.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Pietarin sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Pietari",
   * 2 = "Arki ja vuodenajat", 3 = Menovinkit (Venäjän maapaketista,
   * js/packs/maa-kategoriat.js RUS).
   *
   * MIKSI VAIN YKSI TEHTÄVÄ — LUE TÄMÄ ENNEN KUIN LISÄÄT TOISEN.
   * Raamattu vaatii kysymyksen jokaiselle sivulle paitsi etusivulle, ja
   * Madridin sääntö (js/packs/fokusvirta-madrid.js) tarkentaa: nimetty
   * tehtävä ei saa mennä sellaisen sivun päälle, jolla on jo kysymys.
   * Pietarissa kysymykset menevät näin:
   *   sivu 1 — Pietarin KULTTUURIVISA (js/packs/europe-kulttuuri.js,
   *            pietari: museon kissat), jonka js/fokustehtavat.js pukee
   *            AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä;
   *   sivu 2 — lehden OMA minitehtävä (js/packs/kulttuuri-kategoriat.js,
   *            pietari/arki: Punaiset purjeet -juhlan nimi);
   *   sivu 3 — tyhjä → tähän JULISTE.
   * Sivuja on siis neljä ja vapaita paikkoja tasan yksi. AARTEEN AVAUS
   * -rooli on jo hoidettu sivulla 1, joten vapaa paikka annetaan
   * JULISTEELLE — muuten Pietarin juliste (js/packs/julisteet.js,
   * `pietari`, "Pietari 1873") jäisi kokonaan lunastamatta.
   *
   * TOISTA AARTEEN AVAUS -RIVIÄ EI SIIS OLE, ja se on tietoinen valinta
   * eikä unohdus: sen ainoa mahdollinen paikka olisi sivu 2, jolloin
   * js/fokustehtavat.js piirraSivunTehtava korvaisi lehden oman
   * Punaiset purjeet -kysymyksen ja pelistä katoaisi valmista sisältöä.
   * Jos päätoimittaja haluaa toisen aarteenavaajan, päätös kuuluu
   * hänelle — muutos on tässä yhden rivin työ. (Kirjattu raporttiin.)
   *
   * JULISTE ON JO OLEMASSA: js/packs/julisteet.js sisältää `pietari`-rivin
   * (tuotanto/tuot-pietari.png, "Pietari 1873"), joten palkinto lunastuu
   * heti eikä jää tyhjäksi lupaukseksi kuten Sevillassa.
   */
  lehtitehtavat: [
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: PIETARIN_METRO_VISA,
    },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Venäjä) ----------
   *
   * UUSI POOLI, EI SIIRTO. Venäjä ei ole js/fokusnosto.js:n NOSTO_MAAT
   * -taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee KAUPUNGIN oman
   * `takynostot`-kentän ENNEN maan poolia, joten nämä kolme näkyvät
   * Pietarissa. Tunnukset on valittu niin, ettei myöhempi RUS-poolin
   * kokoaminen (Moskova saa oman pakettinsa samassa aallossa) tuota
   * törmäystä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran (js/fokusnosto.js, LIVIAN HUOMAUTUS), ja huomio
   * osuu poolin ensimmäiseen katsomattomaan — siis ensimmäiseen riviin.
   * Järjestys on siksi harkittu: Kiži on lähin, se osuu Euroopan
   * laudalle ja se on kaikkein vähiten tunnettu.
   *
   * VAIN KUOLLEITA: yhtään elävää henkilöä ei nimetä.
   *
   * ── LAUTA-ALUE ON TARKISTETTU, JA YKSI NOSTO EI MAHDU ────────────
   *
   * Euroopan lauta on 1000 × 1000 (js/packs/europe.js), ja kaavalla
   * x = (lon + 11) × 19,2 / y = (72 − lat) × 26,3 se kattaa pituusasteet
   * −11…+41,1 ja leveysasteet 33,9…72. Venäjä on paljon suurempi kuin
   * tämä ikkuna, joten jokainen piste on laskettu ja tarkistettu erikseen:
   *   Kiži       35,225 E / 62,0667 N  → europe 887,5 / 261,2   MAHTUU
   *   Pietarhof  29,9089 E / 59,8844 N → europe 785,5 / 318,6   MAHTUU
   *   Baikal    108,0 E   / 53,5 N     → europe 2284,8 / 486,6  EI MAHDU
   * Baikalille kirjoitetaan siksi VAIN maailmankartan koordinaatit.
   * js/fokusnosto.js nostonPaikka lukee `paikka.laudat[lauta]` ja
   * putoaa kaupungin koordinaattiin, jos lautaa ei ole rivillä — juuri
   * tätä varten se varapolku on olemassa ("Lauta, jota rivillä ei ole,
   * saa pisteensä kaupunkiin: väärään paikkaan ankkuroitu merkki olisi
   * pahempi kuin maan osoite"). Euroopan laudalla Baikalin piste on siis
   * Pietarin päällä, maailmankartalla oikeassa Siperiassa.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * FAKTAT (en-Wikipedia "Kizhi Pogost", johdanto sekä osiot
       * "General information" ja "The Church of the Transfiguration";
       * haettu 30.8.2026):
       *   - Kižin pogosta on 1600-luvulta juontuva aidattu alue Kižin
       *     saarella Äänisellä Karjalan tasavallassa; sen sisällä on
       *     kaksi suurta puukirkkoa (22-kupolinen Kristuksen kirkastumisen
       *     kirkko ja 9-kupolinen Suojeluksen kirkko) sekä kellotapuli;
       *   - alue rakennettiin saaren eteläosaan neljän metrin kukkulalle;
       *     perusyksikkö on noin 30 cm paksu ja 3–5 metriä pitkä
       *     mäntytukki, ja tuhannet tukit tuotiin mantereelta;
       *   - kirkastumisen kirkon alttariristiin on kaiverrettu päiväys
       *     6. kesäkuuta 1714; se rakennettiin salaman polttaman
       *     vanhemman kirkon paikalle, eikä rakentajien nimiä tiedetä;
       *     tarinan mukaan päärakentaja käytti koko urakkaan yhtä
       *     kirvestä ja heitti sen valmistuttua järveen sanoen, ettei
       *     toista samanlaista ole eikä tule;
       *   - kirkossa on 22 kupolia, se on 37 metriä korkea ja siten yksi
       *     Pohjois-Euroopan korkeimmista puurakennuksista;
       *     pohjamitat 20 × 29 metriä;
       *   - "rakennettu ilman ainuttakaan naulaa" pitää paikkansa
       *     hirsirungon osalta: hirret on veistetty kirveellä ja liitetty
       *     nurkkasalvoksin — MUTTA kupoleissa ja katolla on noin 60 000
       *     haapapaanua, jotka on kiinnitetty noin 180 000 naulalla;
       *   - runko lepää kivijalustalla ilman syvää perustusta (läntiselle
       *     sivulle tehtiin perustus 1870); ikonostaasissa on neljä riviä
       *     ja 102 ikonia;
       *   - 1800-luvulla kirkko verhoiltiin laudoituksella ja osia
       *     peitettiin pellillä; alkuperäiseen asuunsa se palautettiin
       *     1950-luvulla;
       *   - Unescon maailmanperintöluettelossa vuodesta 1990.
       */
      id: 'kizin-kirkko',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Kižin puukirkko',
      otsikko: 'Kirkko rakennettiin ilman ainuttakaan naulaa — lukuun '
        + 'ottamatta sataakahdeksaakymmentätuhatta',
      lunastus: [
        'Äänisen saarella seisoo puukirkko, jonka alttariristiin on '
          + 'kaiverrettu päiväys: kuudes kesäkuuta 1714. Se rakennettiin '
          + 'salaman polttaman vanhemman kirkon paikalle, eikä yhdenkään '
          + 'rakentajan nimeä tiedetä. Kirkko on kolmenkymmenenseitsemän '
          + 'metrin korkuinen ja siinä on kaksikymmentäkaksi kupolia — '
          + 'yksi Pohjois-Euroopan korkeimmista puurakennuksista. '
          + 'Rakennusaine on mäntytukki, halkaisijaltaan noin '
          + 'kolmekymmentä senttiä, ja tuhannet tukit tuotiin saarelle '
          + 'mantereelta. Tarina kertoo, että päärakentaja teki koko '
          + 'työn yhdellä kirveellä ja heitti sen valmistuttua järveen: '
          + 'toista samanlaista ei ole eikä tule.',
        'Kirkosta kerrotaan aina sama lause: se on rakennettu ilman '
          + 'ainuttakaan naulaa. Se on melkein totta, ja "melkein" on '
          + 'tässä kiinnostavampi kuin väite. Hirsirunko todella on '
          + 'nauloitta: hirret on veistetty kirveellä ja liitetty '
          + 'nurkissa salvoksin, ja koko rakennus lepää kivijalustalla '
          + 'ilman syvää perustusta. Mutta katto ja kupolit on katettu '
          + 'noin kuudellakymmenellätuhannella haapapaanulla, ja ne on '
          + 'kiinnitetty noin sadallakahdeksallakymmenellätuhannella '
          + 'naulalla. 1800-luvulla hirsipinta verhoiltiin laudoituksella '
          + 'ja osia peitettiin pellillä — se oli suojelua, ei '
          + 'kaunistelua — ja 1950-luvulla verhous purettiin pois. '
          + 'Unescon maailmanperintöluetteloon paikka pääsi 1990.',
      ],
      lahde: 'en-Wikipedia "Kizhi Pogost", johdanto sekä osiot "General '
        + 'information" ja "The Church of the Transfiguration"; '
        + 'tarkistettu 30.8.2026.',
      /*
       * Commons 30.8.2026: 3298×2200, CC BY-SA 4.0, Alexxx1979, kuvattu
       * 19.7.2016, kuvaus "Kizhi Pogost. The Church of the
       * Transfiguration". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kirkko, nurmi ja polku; polulla yksi kaukainen kulkija, joka ei
       * ole tunnistettavissa.
       */
      kuva: {
        tiedosto: 'Kizhi Pogost. The Church of the Transfiguration DSC02646 2200.jpg',
        selite: 'Kižin kirkastumisen kirkon kaksikymmentäkaksi kupolia '
          + 'nousevat portaittain; runko on veistettyä hirttä ja kupolit '
          + 'haapapaanua.',
        lahde: 'Alexxx1979, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten hirsirakennus pysyy pystyssä ilman nauloja?',
        'Miksi kupolit katettiin juuri haavalla?',
        'Miksi kirkko rakennettiin juuri saarelle?',
      ],
      /*
       * 62,066667 N / 35,225 E — en-Wikipedia "Kizhi Pogost",
       * prop=coordinates (haettu 30.8.2026). Sama kaava ja samat vakiot
       * kuin kohtaamispisteellä yllä.
       *
       * LASKU:
       *   maailmankartta  x = ((35,225 + 175) mod 360) × 33,3333… = 7007,5
       *                   y = (millerY(62,0667) − millerY(76)) × 12000/2π
       *                     = 821,1
       *   europe          x = (35,225 + 11) × 19,2 = 887,5
       *                   y = (72 − 62,0667) × 26,3 = 261,2
       * Molemmat mahtuvat laudalle, ja etäisyys Pietarin laatasta on
       * satakunta yksikköä — piste ei siis riitele laatan kanssa.
       */
      paikka: {
        nimi: 'Kižin saari',
        laudat: {
          maailmankartta: { x: 7007.5, y: 821.1 },
          europe: { x: 887.5, y: 261.2 },
        },
      },
    },
    {
      /*
       * FAKTAT (en-Wikipedia "Peterhof Palace", johdanto sekä osiot
       * "Construction", "Layout" ja "The Grand Cascade and Samson
       * Fountain"; haettu 30.8.2026):
       *   - Pietari Suuri alkoi rakentaa paikkaa 1709 maalaisasunnoksi;
       *     vierailu Ranskan hovissa 1717 laajensi suunnitelmat, ja
       *     paikkaa on siitä asti kutsuttu Venäjän Versaillesiksi;
       *   - Monplaisirin rakentaminen alkoi 1714 Pietarin omien
       *     luonnosten mukaan; puutarhat suunnitteli Jean-Baptiste
       *     Alexandre Le Blond, joka oli aiemmin työskennellyt
       *     Versaillesin puutarhurin André Le Nôtren kanssa;
       *     arkkitehtina 1714–1728 toimi Domenico Trezzini;
       *   - Francesco Bartolomeo Rastrelli laajensi kokonaisuutta
       *     1747–1756 keisarinna Elisabetille;
       *   - maaston ratkaiseva piirre on 16 metriä korkea törmä alle
       *     sadan metrin päässä rannasta; alapuutarha on 1,02 km²;
       *   - Suuressa kaskadissa on 64 suihkulähdettä, ja sen juurella
       *     olevassa altaassa on 1730-luvulta Simson-suihkulähde:
       *     leijonan kidasta nousee 20 metrin vesipatsas, Pietarhofin
       *     korkein;
       *   - "kenties Pietarhofin suurin tekninen saavutus on se, että
       *     kaikki suihkulähteet toimivat ilman pumppuja: vesi tulee
       *     luonnonlähteistä ja kerätään altaisiin yläpuutarhaan, ja
       *     korkeusero tuottaa paineen";
       *   - palatsi- ja puutarhakokonaisuus on Unescon
       *     maailmanperintökohde yhdessä kaupungin keskustan kanssa.
       *
       * MIKSI TÄMÄ NOSTO: isoisän merkintä ihmettelee, että keisari
       * käski ja maa totteli. Tämä on saman käskyn iloisin versio — ja
       * ainoa, jossa käsky annettiin veden painolle eikä ihmisille.
       */
      id: 'pietarhovin-suihkulahteet',
      nimio: 'Pietarhovin kaskadi',
      otsikko: 'Kuusikymmentäneljä suihkulähdettä, ei yhtään pumppua',
      lunastus: [
        'Pietari Suuri aloitti Pietarhovin vuonna 1709 vaatimattomasti, '
          + 'maalaisasunnoksi meren rannalle. Vierailu Ranskan hovissa '
          + '1717 muutti mittakaavan lopullisesti, ja siitä juontuu '
          + 'lisänimi Venäjän Versailles. Puutarhat '
          + 'suunnitteli Jean-Baptiste Alexandre Le Blond, joka oli '
          + 'aiemmin työskennellyt Versaillesin puutarhurin kanssa, ja '
          + 'Francesco Bartolomeo Rastrelli laajensi kokonaisuuden '
          + '1747–1756. Sommitelman ratkaisee maasto: rannasta alle '
          + 'sadan metrin päässä nousee kuudentoista metrin törmä, ja '
          + 'sen rinnettä laskeutuu Suuri kaskadi, kuusikymmentäneljä '
          + 'suihkulähdettä. Sen juurella Simson aukaisee leijonan '
          + 'kitaa, ja kidasta nousee kahdenkymmenen metrin vesipatsas — '
          + 'puiston korkein.',
        'Ja tässä on se kohta, joka on helppo katsoa ohi: yksikään '
          + 'noista suihkulähteistä ei käytä pumppua. Vesi tulee '
          + 'luonnonlähteistä, se kerätään altaisiin yläpuutarhaan, ja '
          + 'sitten se saa pudota. Korkeusero tekee paineen, ja paine '
          + 'tekee suihkun. Kaskadin edessä seisova ihmisjoukko katsoo '
          + 'siis tekniikkaa, joka ei ole kolmessasadassa vuodessa '
          + 'vanhentunut eikä kuluta mitään: maa on ylempänä siellä kuin '
          + 'täällä. Palatsi- ja puistokokonaisuus on Unescon '
          + 'maailmanperintöä yhdessä kaupungin historiallisen keskustan '
          + 'kanssa.',
      ],
      lahde: 'en-Wikipedia "Peterhof Palace", johdanto sekä osiot '
        + '"Construction", "Layout" ja "The Grand Cascade and Samson '
        + 'Fountain"; tarkistettu 30.8.2026.',
      /*
       * Commons 30.8.2026: 3200×2119, CC BY-SA 4.0, Florstein, kuvattu
       * 2.8.2012, kuvaus "Grand Cascade of Peterhof". Restrictions
       * tyhjä. SILMÄTARKISTUS tehty: kaskadi, kullatut veistokset ja
       * palatsi; terassilla kaukainen väkijoukko, jossa ketään ei voi
       * tunnistaa.
       */
      kuva: {
        tiedosto: 'Grand Cascade of Peterhof 01.jpg',
        selite: 'Suuri kaskadi laskeutuu kuudentoista metrin törmää alas '
          + 'palatsin edestä; sama korkeusero antaa kaikille sen '
          + 'suihkuille paineen.',
        lahde: 'Florstein, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten suihkulähde toimii ilman pumppua?',
        'Miksi Venäjän hovi halusi oman Versaillesin?',
        'Mitä Simsonin ja leijonan aihe tarkoittaa?',
      ],
      /*
       * 59,884444 N / 29,908889 E — en-Wikipedia "Peterhof Palace",
       * prop=coordinates (haettu 30.8.2026).
       *
       * LASKU:
       *   maailmankartta  x = ((29,908889 + 175) mod 360) × 33,3333… = 6830,3
       *                   y = (millerY(59,8844) − millerY(76)) × 12000/2π
       *                     = 931,5
       *   europe          x = (29,908889 + 11) × 19,2 = 785,5
       *                   y = (72 − 59,8844) × 26,3 = 318,6
       *
       * HUOM PIIRTOPUOLESTA: piste on Euroopan laudalla noin 7,7 ja
       * maailmankartalla noin 13,6 yksikön päässä Pietarin laatasta, eli
       * molemmilla laudoilla PISTE_ERO_MIN-rajan (14) sisällä. Peli
       * siirtää siis PIIRRETYN merkin koilliseen laatan viereen
       * (js/fokuspiste.js), ja molemmat näkyvät erikseen. Dataan ei
       * kosketa: Pietarhof on oikeasti kaupungin kyljessä.
       */
      paikka: {
        nimi: 'Pietarhof',
        laudat: {
          maailmankartta: { x: 6830.3, y: 931.5 },
          europe: { x: 785.5, y: 318.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO (Raamattu, ELÄINTÄKY-linjaus). Pietarin oma
       * eläinjuttu — museon kissat — on kaanonissa ja kaupunkilehdessä,
       * joten poolin eläin on toinen (ks. tiedoston alku).
       *
       * PÄÄLLEKKÄISYYS ASIAN LAUDAN KANSSA ON TIEDOSSA JA RAJATTU.
       * Baikal on jo pelissä Aasian laudalla Irkutskin kohteena
       * (js/packs/asia-artikkelit.js, asia-questions.js,
       * asia-valokuvat.js), ja siellä kerrotaan syvyys, jäätymätön
       * makea vesi ja norpan makeanveden elämä. Euroopan laudan pelaaja
       * ei näe niitä sivuja lainkaan, mutta päällekkäisyys on silti
       * karsittu: tämä nosto rakentuu SEN varaan, mitä Aasian aineisto
       * ei kerro — järven ikä, repeämä ja se, että se yhä levenee.
       * Norpasta ei toisteta Aasian aineiston väitettä "ainoa hyljelaji",
       * koska lähde sanoo varovaisemmin "harvoja lajeja".
       *
       * FAKTAT (en-Wikipedia "Lake Baikal", johdanto ja osio "Geography
       * and hydrography"; "Baikal seal", johdanto ja osio "Description";
       * haettu 30.8.2026):
       *   - Baikal on hautavajoamajärvi Etelä-Siperiassa Irkutskin
       *     alueen ja Burjatian välissä; pinta-ala 31 722 km² eli hieman
       *     Belgiaa suurempi, ja se on pinta-alaltaan maailman
       *     seitsemänneksi suurin järvi;
       *   - suurin syvyys 1 642 metriä — maailman syvin järvi; tilavuus
       *     23 615,39 km³ eli 22–23 % maailman makeasta pintavedestä,
       *     enemmän kuin kaikissa Pohjois-Amerikan Suurissa järvissä
       *     yhteensä, ja arviolta 19 % maapallon jäätymättömästä
       *     makeasta vedestä;
       *   - se on maailman vanhin järvi, 25–30 miljoonaa vuotta;
       *     pituus 636 km, leveys 79 km;
       *   - järvi on hautavajoamassa, jossa maankuori vetäytyy erilleen;
       *     repeämä levenee noin 4 mm vuodessa, alue on seismisesti
       *     aktiivinen ja pohjan alla on noin 7 km sedimenttiä, mikä
       *     tekee siitä maapallon syvimmän mannerhautavajoaman;
       *     Unescon maailmanperintökohde 1996;
       *   - baikalinnorppa (Pusa sibirica) on Baikalille kotoperäinen,
       *     yksi maailman pienimmistä hylkeistä ja yksi harvoista
       *     yksinomaan makeassa vedessä elävistä hyljelajeista;
       *     aikuinen on 1,1–1,4 metriä pitkä ja painaa 63–70 kiloa,
       *     ja paino vaihtelee vuodenajan mukaan 38–42 prosenttia;
       *     kannaksi arvioidaan 80 000–100 000 yksilöä, eikä lajia
       *     pidetä uhanalaisena.
       */
      id: 'baikal',
      nimio: 'Baikal',
      otsikko: 'Se ei ole järvi vaan repeämä — ja se levenee neljä '
        + 'millimetriä vuodessa',
      lunastus: [
        'Baikal on kuusisataakolmekymmentäkuusi kilometriä pitkä, '
          + 'seitsemänkymmentäyhdeksän kilometriä leveä ja tuhat '
          + 'kuusisataaneljäkymmentäkaksi metriä syvä. Pinta-alaltaan se '
          + 'on Belgian kokoinen ja vasta seitsemänneksi suurin järvi '
          + 'maailmassa, mutta syvyys ratkaisee: vettä siinä on '
          + 'kaksikymmentäkolmetuhatta kuutiokilometriä eli runsas '
          + 'viidennes maailman makeasta pintavedestä. Se on enemmän '
          + 'kuin Pohjois-Amerikan Suurissa järvissä yhteensä. Ja se on '
          + 'maailman vanhin järvi, kahdenkymmenenviiden ja '
          + 'kolmenkymmenen miljoonan vuoden ikäinen.',
        'Syy kaikkeen tähän on se, ettei Baikal oikeastaan ole järvi '
          + 'vaan repeämä. Maankuori vetäytyy siinä kohdassa erilleen, ja '
          + 'railo levenee yhä noin neljä millimetriä vuodessa; maa '
          + 'tärisee muutaman vuoden välein. Pohjan alla on vielä '
          + 'seitsemän kilometriä sedimenttiä, joten itse repeämän '
          + 'pohjaan on pinnasta kahdeksasta yhteentoista kilometriä — '
          + 'syvin mannerrepeämä maapallolla. Vedessä elää '
          + 'baikalinnorppa, joka on kotoperäinen tälle järvelle ja yksi '
          + 'maailman pienimmistä hylkeistä: aikuinen on runsaan metrin '
          + 'mittainen ja painaa syksyllä noin neljäkymmentä prosenttia '
          + 'enemmän kuin keväällä. Niitä on arviolta kahdeksankymmenestä sataan '
          + 'tuhatta, eikä laji ole uhanalainen. Unescon '
          + 'maailmanperintöluetteloon järvi pääsi 1996.',
      ],
      lahde: 'en-Wikipedia "Lake Baikal" (johdanto ja osio "Geography and '
        + 'hydrography") sekä "Baikal seal" (johdanto ja osio '
        + '"Description"); tarkistettu 30.8.2026.',
      /*
       * Commons 30.8.2026: 2560×1707, CC BY 2.0, Sergio Tittarini
       * (Shanghai), kuvattu 5.8.2016, kuvaus "Лежбище нерпы на Ушканьих
       * островах (Nerpas or Pusa sibirica)". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: norppia kivellä ja vedessä, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Baikal seals at the Ushkan Islands (31410031260).jpg',
        selite: 'Baikalinnorpat makaavat kivellä Uškanin saarten '
          + 'edustalla; laji elää vain tässä järvessä.',
        lahde: 'Sergio Tittarini, Wikimedia Commons (CC BY 2.0)',
      },
      kysymykset: [
        'Miten järvestä voi tulla merta?',
        'Miksi Baikalin vesi on niin kirkasta?',
        'Miten hylje on päätynyt keskelle mannerta?',
      ],
      /*
       * 53,5 N / 108,0 E — en-Wikipedia "Lake Baikal",
       * prop=coordinates (haettu 30.8.2026). Rajapinta antaa järvelle
       * karkean keskipisteen, mikä riittää: piste hakeutuu joka
       * tapauksessa lähimmän kohdesymbolin päälle (js/fokusnosto-
       * symbolit.js).
       *
       * VAIN MAAILMANKARTTA — ks. osio "LAUTA-ALUE ON TARKISTETTU"
       * yllä. Euroopan laudalla piste osuisi kohtaan 2284,8 / 486,6,
       * eli yli kaksi kertaa laudan leveyden verran ulos kuvasta.
       *
       * LASKU:
       *   maailmankartta  x = ((108 + 175) mod 360) × 33,3333… = 9433,3
       *                   y = (millerY(53,5) − millerY(76)) × 12000/2π
       *                     = 1234,6
       */
      paikka: {
        nimi: 'Baikal',
        laudat: {
          maailmankartta: { x: 9433.3, y: 1234.6 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. Iso
   * aarre: tsaarin kadonnut pääsiäismuna. Merkintä aukeaa, kun aarre
   * löytyy (js/fokusvirta.js fokusvirtaAarremerkinta), samaan
   * matkakirjakorttiin kuin saapumismerkintä.
   *
   * HUOM AJOITUKSESTA: ks. tiedoston alun osio "AARREMERKINTÄ ON ENNE,
   * EI HISTORIAA". Merkintä on kirjoitettu enteeksi, ja täky `faberge`
   * kertoo pelaajalle, mitä enteestä lopulta tuli.
   */
  aarremerkinta: {
    teksti: 'Kultasepän liikkeessä Suurella Merikadulla hoidettiin hovin '
      + 'tilauksia väliverhon takana. Oppipoika kertoi minulle '
      + 'puoliääneen, että keisarinnalle suunnitellaan lahjaa, jollaista '
      + 'ei ole ennen tehty — pieni esine, jonka sisään kätketään '
      + 'toinen. Sellainen esine on tehty katoamaan kauniisti. Merkitsen '
      + 'tämän ylös: pidä silmällä pieniä esineitä, joiden sisällä on '
      + 'salaisuus.',
  },
};
