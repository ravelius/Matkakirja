/*
 * SOFIAN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-ateena.js:lle. Rakenne, kenttien
 * nimet ja kuusi vaihetta ovat samat kuin siellä (Raamatun osio
 * "Fokusmoodi", ANNOSTELU), eikä moottoriin (js/fokusvirta.js) tarvinnut
 * koskea: uusi kaupunki on yksi tiedosto ja yksi rivi rekisterissä
 * (js/packs/fokusvirrat.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (Fable 25.8.2026): docs/mantereet-tyoaineisto/
 * fokusvirta-sofia-kaanon.md. Matkakirjan paikkarivi ja teksti, pöllön
 * huomio, aarremerkintä ja täkynostojen klikkiotsikot on siirretty
 * sieltä SELLAISINAAN — sanamuotoja ei ole muokattu. Kaanon myös valitsi
 * täyt (levski, areena, pöllöpatsas), kohdenoston (Boyana) ja
 * kohtaamispaikan (Levskin muistomerkki).
 *
 * FAKTAPOHJA syvennyksille ja oppitunnille: docs/mantereet-tyoaineisto/
 * takyt-sofia.md, jonka jokainen väite on tarkistettu en-Wikipediasta
 * artikkeli ja kohta kerrallaan. Täkyjen syvennysteksteissä EI ole
 * yhtään faktaa tuon raportin ulkopuolelta. Oppitunti käyttää lisäksi
 * pelin omaa, jo hyväksyttyä Sofia-aineistoa (js/packs/
 * kulttuuri-kategoriat.js Serdica-nosto ja lähdenosto,
 * js/packs/nahtavyysjutut.js Pyhän Yrjön rotunda) — se on tarkoitus,
 * koska oppitunnin tehtävä on pohjustaa laattakysymys lehden omalla
 * aineistolla.
 *
 * NELJÄS TÄKY EI OLE KAANONISSA: omistajan lisäys 25.8.2026 ("täkyihin
 * myös söpöjä eläinjuttuja — eläimet ovat tärkeitä kohdeyleisölle")
 * toi mukaan täkyraportin täyn 10, Sofian eläintarhan. Muuta kaanoniin
 * ei ole koskettu, ja `vaadittuja` on yhä 1 — neljäs täky on siis
 * lisää vapaaehtoista luettavaa, ei uusi portti.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa: vastaus löytyy syvennystekstistä, mutta
 * kysymyksen sanamuoto ei toistu siinä sellaisenaan. Skeema on lehden
 * minitehtävän oma (js/ui.js piirraMinitehtava): kysymys, vaihtoehdot,
 * oikean indeksi ja faktarivi, joka näytetään vasta vastauksen jälkeen.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on tarkistettu imageinfo-rajapinnasta
 * 25.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus) — ei arvattuja
 * nimiä. Kaikki ovat PD tai CC, ja tekijä on `lahde`-rivillä, koska
 * CC BY vaatii maininnan.
 *
 * PÖLLÖN KUVA EI OLE HEROKUVA. Ateenassa vaihe 2 esittelee generoidun
 * herokuvan (`ampari`), mutta Sofialle sellaista ei ole: ämpäristä
 * tarkistettiin 25.8.2026 kaikki kolme nimeä (herokoe/hero-sofia-aamu,
 * -keskipaiva, -ilta) ja jokainen vastasi 404, eikä Sofia ole
 * yhdessäkään tools/hero-tyolista-*.mjs -listassa. Kaanon varautui
 * tähän: *"jos herokuvaa ei ole, käytä Levskin muistomerkin
 * Commons-kuvaa"*. Kenttä `tiedosto` toimii `ampari`-kentän sijasta
 * sellaisenaan (js/fokusvirta.js kuvanOsoite).
 */
import { bgrFokuskohteet } from './fokuskohteet-bgr.js';

/*
 * KATUKIVIVISA on YHDESSÄ PAIKASSA, yhdessä käytössä — mutta se on
 * vakiona samasta syystä kuin Ateenan NIKE_VISA: lehtitehtävien lista
 * tiedoston lopussa lukee kysymykset muuttujista, jolloin uuden käytön
 * lisääminen ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Keltaiset katukivet ovat "Matkailijan Sofia"
 * -artikkelin oma jakso (js/packs/kulttuuri-kategoriat.js): kivet
 * laskettiin 1907–1908, niitä ei osattu silloin valmistaa Bulgariassa,
 * ja ne tuotiin Itävalta-Unkarista Budapestin läheltä. Kysymys ei
 * toista tuota lausetta sellaisenaan.
 *
 * MIKSI SIVULLA 3 EIKÄ SILLÄ SIVULLA, JOLLA JAKSO ON: sama ratkaisu
 * kuin Ateenassa, jossa Akropoliin visa on sivulla 3 vaikka juttu on
 * muualla. Sivu 3 on Menovinkit, jonka sisältö on koko maan yhteinen
 * linkkilista — sillä ei ole omaa kaupunkifaktaa, josta visan voisi
 * tehdä, ja lehden jokaisella sivulla paitsi etusivulla on Raamatun
 * mukaan oltava kysymys.
 */
const KATUKIVI_VISA = {
  kysymys: 'Sofian keskustan pääväylillä kadun pinta on kellertävää '
    + 'keramiikkaa. Mistä nuo kivet aikoinaan tuotiin?',
  vaihtoehdot: [
    'Itävalta-Unkarista, Budapestin lähistöltä',
    'Vitošan omista louhoksista kaupungin laidalta',
    'Istanbulin savipajoista',
  ],
  oikea: 0,
  fakta: 'Kivet laskettiin vuosina 1907–1908, eikä niitä osattu silloin '
    + 'valmistaa Bulgariassa. Raaka-aineena oli kalkkipitoinen savi, joka '
    + 'poltettiin noin 1 300 asteessa.',
};

/*
 * BANITSAVISA — kevyen kulun AARTEEN AVAUS -tehtävä (sivu 2).
 *
 * EI UUTTA FAKTAA. Väite on lehden sivun 2 ("Arki ja tavat") oman
 * noston "Banitsassa on onnenviesti" tekstiä: uudenvuoden banitsan
 * sisään kätketään paperilappuja, joihin on kirjoitettu toivotuksia, ja
 * omasta palasta löytynyt lappu kertoo tulevasta vuodesta.
 *
 * MIKSI EI LÄHDEKYSYMYSTÄ. Sofian laattakysymys (kohtaaminen, ks.
 * alempana) kysyy, ketkä rakensivat kylpylänsä kaupungin lähteiden
 * ääreen. Jos lehden aarteen avaava tehtävä kysyisi lähteistä tai
 * kylpylästä, aarrekysymys olisi ratkaistu ennen kuin Nadiaa on tavattu.
 * Sivun toinen nosto — banitsa — on yhtä lailla sivun omaa aineistoa
 * eikä pohjusta laattaa lainkaan.
 *
 * SIVUN OMA TEHTÄVÄ VÄISTYY. Aihesivulla 'arki' on jo `tehtava`-kenttä
 * (kylpylärakennuksen nykyinen käyttö). Nimetty tehtävä syrjäyttää sen
 * (js/fokustehtavat.js), jolloin sivulla on Raamatun vaatima YKSI
 * minitehtävä eikä kahta — ja samalla se kylpyläkysymys, joka olisi
 * vienyt laattakysymystä liian lähelle, jää fokusmoodissa pois.
 */
const BANITSA_VISA = {
  kysymys: 'Mitä varten uudenvuoden banitsa-piirakan sisään kätketään '
    + 'pieniä paperilappuja?',
  vaihtoehdot: [
    'Ne kertovat syöjälleen tulevasta vuodesta',
    'Ne kertovat, kuka piirakan on leiponut',
    'Ne ovat leipomon alennuslippuja',
  ],
  oikea: 0,
  fakta: 'Banitsa kierretään filotaikinasta ja sirene-juustosta ja '
    + 'syödään aamiaiseksi. Uudenvuoden piirakkaan kätketyissä lapuissa '
    + 'on toivotuksia, ja jokainen lukee sen, jonka omasta palastaan '
    + 'löytää.',
};

export const FOKUSVIRTA_SOFIA = {
  kaupunki: 'sofia',

  /* ---------- 1. Matkakirja (isoisän ääni + vanha kuva) ---------- */
  matkakirja: {
    /* Kaanon, kohta 1 — paikkarivi ja teksti sellaisinaan. */
    paikkarivi: 'Sofia, elokuussa 1873. Helteistä; tomu ei laskeudu.',
    teksti: 'Sofiassa kukaan ei sano ääneen sen miehen nimeä, joka '
      + 'hirtettiin täällä helmikuussa — mutta majatalon isäntä jätti '
      + 'ikkunalaudalle kynttilän palamaan. Kysyin kenelle. Hän sanoi: '
      + '"Sille, jonka hautaa ei kukaan tunne."',
    /*
     * LUENTAA EI OLE. Ateenan merkinnällä on `luenta` ja `aanite`, koska
     * sille generoitiin mp3 (tools/generoi-luennat.mjs). Sofialle ei ole
     * generoitu mitään, eikä tänne kirjoiteta äänitepolkua, jota ei ole:
     * puuttuva kenttä tarkoittaa yksinkertaisesti sitä, että kytkin ei
     * ilmesty puhekuplan alle (js/fokusvirta.js).
     *
     * KUVA: Vasil Levski, Bulgarian kansallisarkiston valokuva.
     * Commonsin imageinfo 25.8.2026: 5773×7469, public domain, tekijä
     * tuntematon, Category:Vasil Levski. Merkintä ei mainitse nimeä —
     * kuva mainitsee, ja juuri siitä syntyy vaiheen 2 jatko.
     */
    kuva: {
      tiedosto: 'BASA-713K-1-52-4-Vasil Levski.JPG',
      selite: 'Vasil Levski. Bulgarialaiset kutsuvat häntä Vapauden '
        + 'apostoliksi; hänet hirtettiin Sofiassa 18. helmikuuta 1873.',
      lahde: 'Tuntematon kuvaaja, Bulgarian kansallinen arkisto, '
        + 'Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 2. Pöllön nykypäivän huomio ----------
   * Kaanon, kohta 2 — teksti sellaisenaan. Kaanon merkitsee myös, että
   * SILMINNÄKIJÄHEITTO ("olen katsellut etsintöjä sata viisikymmentä
   * vuotta") on tässä käytetty eikä Sofiassa tule toista: sitä ei siis
   * saa toistaa täkyjen eikä oppitunnin teksteissä.
   */
  pollo: {
    teksti: 'Hirttopaikalla seisoo nyt kolmentoista metrin '
      + 'graniittipatsas, ja hautaa etsitään yhä. Minä olen katsellut '
      + 'etsintöjä sata viisikymmentä vuotta — kynttilä ikkunalla oli '
      + 'lähempänä totuutta kuin yksikään lapio.',
    /*
     * Commons 25.8.2026: 1000×667, CC BY-SA 3.0, Edal Anton Lefterov,
     * kuvattu 30.4.2011, kuvaus "Vasil Levski Boulevard with Monument to
     * Vasil Levski, Sofia, Bulgaria" — sama muistomerkki, josta pöllö
     * puhuu. Ks. tiedoston alku siitä, miksi tässä ei ole herokuvaa.
     */
    kuva: {
      tiedosto: 'Monument-to-Vasil-Levski.jpg',
      selite: 'Vasil Levskin muistomerkki Sofiassa. Se seisoo '
        + 'teloituspaikalla ja on 13 metriä korkea, harmaata balkanilaista '
        + 'graniittia.',
      lahde: 'Edal Anton Lefterov, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },

  /* ---------- 3. Pöllön valinta ---------- */
  valinta: {
    kysymys: 'Mistä haluaisit kuulla ensin?',
    // Kaanon, kohta 3: vaadittuja 1. Neljäs täky (eläintarha) EI nosta
    // porttia — se on lisää luettavaa, ei lisää pakkoa.
    vaadittuja: 1,
    aarreNappi: 'Jatka aarteelle',
    aarreEste: 'Kuuntele ensin yksi tarina',
  },

  /*
   * ---------- 3b. Kohdenostot ----------
   * Kaanon, kohta 3: kohdenostoksi Boyanan kirkko. Kohde asuu maan
   * omassa listassa (js/packs/fokuskohteet-bgr.js), koska kohde ei
   * kuulu yhdelle kaupungille — täällä on vain poiminta tunnuksella.
   * Kohdenosto ei ole täky: siitä ei tule minivisaa eikä palkkiota,
   * eikä se avaa aarreporttia.
   */
  kohteet: bgrFokuskohteet(['boyana']),

  /* ---------- 4. Neljä täkypolkua ---------- */
  takyt: [
    {
      id: 'levski',
      nappi: 'Mies, jonka nimeä ei sanota ääneen',
      otsikko: 'Vapauden apostoli ja tuntematon hauta',
      /* Faktat: takyt-sofia.md, täky 1 (merkitty VARMAKSI). */
      teksti: 'Majatalon isäntä ei sanonut nimeä, mutta minä sanon: Vasil '
        + 'Levski. Bulgarialaiset kutsuvat häntä Vapauden apostoliksi. Hän '
        + 'rakensi koko maahan salaisten vallankumouskomiteoiden verkoston '
        + 'ja suunnitteli kansannousua osmanivaltaa vastaan. Joulukuussa '
        + '1872 hänet kaapattiin majatalosta ja tuotiin Sofiaan '
        + 'oikeudenkäyntiin — eikä hän paljastanut yhtäkään toveriaan. '
        + 'Tuomio pantiin täytäntöön 18. helmikuuta 1873, siis samana '
        + 'talvena kuin isoisäsi sulki matkalaukkunsa Lontoossa. Sillä '
        + 'kohdalla seisoo nyt kolmentoista metrin muistomerkki harmaata '
        + 'balkanilaista graniittia. Hautaa ei ole löydetty.',
      /*
       * Commons 25.8.2026: 509×344, CC0, "unknown photographers, 1879",
       * kuvaus "Old Turkish dungeon where Vasil Levski was kept prisoner,
       * late XIX". Valokuva on isoisän omalta vuosikymmeneltä, ja selite
       * sanoo täsmälleen sen, minkä lähde sanoo — ei enempää.
       */
      kuva: {
        tiedosto: 'Sofia Dungeon.jpg',
        selite: 'Vanha vankityrmä, jossa Vasil Levskiä pidettiin '
          + 'vangittuna. Valokuva on 1800-luvun lopulta.',
        lahde: 'Tuntematon kuvaaja 1879, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mitä osmanien oikeus ei saanut Levskiltä irti, vaikka '
          + 'tuomio oli jo selvä?',
        vaihtoehdot: [
          'Yhdenkään toverin nimeä',
          'Salaisen kassan piilopaikkaa',
          'Kirjeenvaihtoa Venäjän kanssa',
        ],
        oikea: 0,
        fakta: 'Levskin rakentama komiteaverkosto jäi siksi pystyyn. '
          + 'Hänen hautansa sijaintia ei tunneta tänäkään päivänä.',
      },
    },
    {
      id: 'areena',
      nappi: 'Hotelli, jonka lattian alla taisteltiin',
      otsikko: 'Serdican amfiteatteri',
      /* Faktat: takyt-sofia.md, täky 6 (merkitty VARMAKSI). */
      teksti: 'Vuonna 2004 kaivettiin Sofian keskustassa hotellin '
        + 'perustuksia, ja maasta paljastui roomalainen amfiteatteri — '
        + 'Bulgarian suurin ja yksi Rooman valtakunnan itäosan '
        + 'suurimmista. Se oli rakennettu 300–400-luvulla vanhan '
        + 'teatterin päälle, jonka gootit olivat polttaneet vuonna 268. '
        + 'Kuudesosa areenasta säilytettiin ja liitettiin hotellin '
        + 'pohjakerrokseen, ja sinne kävelee päivisin sisään kuka tahansa '
        + 'maksutta katsomaan kolikko- ja keramiikkanäyttelyä. Vuonna 1919 '
        + 'löytyi kivilaatta, joka aikoinaan mainosti täkäläisiä '
        + 'taisteluja: siihen on kuvattu krokotiileja, karhuja, härkiä ja '
        + 'villikissoja.',
      /*
       * Commons 25.8.2026: 1185×822, CC BY-SA 4.0, Epaunov72, kuvaus
       * "General view of the Amphitheatre of Serdica, from north."
       * HUOM kategoriasta: Category:Amphitheatre of Serdica ei ole
       * olemassa; tiedosto löytyi en-Wikipedian oman artikkelin
       * kuvalistalta, eli kuva on varmasti oikeasta kohteesta.
       */
      kuva: {
        tiedosto: 'Amphitheatre of Serdica - General view.jpg',
        selite: 'Serdican amfiteatteria pohjoisesta katsottuna. Areena '
          + 'löytyi 2004 hotellin perustustöissä.',
        lahde: 'Epaunov72, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mikä toi Serdican amfiteatterin takaisin päivänvaloon '
          + 'vuonna 2004?',
        vaihtoehdot: [
          'Hotellin perustustyöt',
          'Keskustan maanjäristys',
          'Perlovska-joen tulva',
        ],
        oikea: 0,
        fakta: 'Löytöä ei peitetty: kuudesosa areenasta liitettiin '
          + 'hotellin pohjakerrokseen, ja se on päivisin vapaasti '
          + 'katsottavissa.',
      },
    },
    {
      id: 'pollopatsas',
      nappi: 'Patsas, jonka kruunussa istuu pöllö',
      otsikko: 'Sofia ja hänen pöllönsä',
      /*
       * Faktat: takyt-sofia.md, täkyt 3 ja 4 (molemmat VARMOJA nimen ja
       * patsaan osalta). Kaanon, kohta 3: *"Pöllö saa esitellä tämän
       * omana patsaanaan — kuiva ylpeys sallittu."*
       *
       * EI TOISTA SILMINNÄKIJÄHEITTOA (kaanon, kohta 2): pöllö ei väitä
       * nähneensä patsaan pystytystä eikä istuneensa sen kruunussa.
       */
      teksti: 'Sallitko, että esittelen erään tuttavan. '
        + 'Nezavisimost-aukiolla, samalla jalustalla jolla ennen seisoi '
        + 'Lenin, kohoaa nyt kahdeksanmetrinen kuparinen naishahmo '
        + 'kuudentoista metrin korkuisella pylväällä. Kuvanveistäjä antoi '
        + 'hänelle vallan tunnuksen, kruunun, ja maineen tunnuksen, '
        + 'seppeleen. Kolmanneksi hän tarvitsi viisauden tunnuksen ja '
        + 'valitsi pöllön. Patsas pystytettiin joulukuun lopulla vuonna '
        + '2000, ja se on nimetty kaupungin mukaan — kaupunki taas on '
        + 'nimetty Pyhän Sofian kirkosta, jonka nimi tarkoittaa kreikaksi '
        + 'Pyhää Viisautta. Minulla ei ole tähän mitään lisättävää.',
      /*
       * Commons 25.8.2026: 2356×3141, CC BY-SA 4.0, Matti Blume, kuvattu
       * 11.11.2018, kuvaus "Sofia statue, Sofia, Bulgaria". Sama tiedosto,
       * jota en-Wikipedian artikkeli "Statue of Sofia" itse käyttää —
       * Category:Statue of Sofia ei ole olemassa.
       */
      kuva: {
        tiedosto: 'Sofia statue, Sofia (P1070773).jpg',
        selite: 'Sofia-patsas Nezavisimost-aukiolla. Kuparinen hahmo on '
          + 'kahdeksan metriä korkea ja seisoo 16 metrin jalustalla.',
        lahde: 'Matti Blume, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Kuka seisoi Nezavisimost-aukion jalustalla ennen kuin '
          + 'Sofia nousi siihen?',
        vaihtoehdot: [
          'Lenin',
          'Vapauttajatsaari Aleksanteri II',
          'Vasil Levski',
        ],
        oikea: 0,
        fakta: 'Sofia-patsas pystytettiin vuoden 2000 lopulla. Sen '
          + 'kruunussa istuu pöllö viisauden merkkinä — ja kaupungin nimi '
          + 'tarkoittaa kreikaksi juuri viisautta.',
      },
    },
    {
      id: 'elaintarha',
      nappi: 'Eläintarha, joka alkoi yhdestä linnusta',
      otsikko: 'Sofian eläintarha',
      /*
       * OMISTAJAN LISÄYS 25.8.2026 (uusi Raamattu-linjaus: täkyihin myös
       * söpöjä eläinjuttuja). Faktat: takyt-sofia.md, täky 10 (merkitty
       * VARMAKSI).
       */
      teksti: 'Kaakkois-Euroopan vanhin ja suurin eläintarha ei alkanut '
        + 'leijonista. Kuninkaallinen asetus perusti sen 1. toukokuuta '
        + '1888, ja aluksi se sijaitsi kuninkaanpalatsin puistossa. Koko '
        + 'kokoelma oli tuolloin yksi asukas: Bulgariasta pyydystetty '
        + 'musta korppikotka, joka istui häkissään puutarhassa. Vasta kun '
        + 'karhupari ei enää mahtunut vanhoihin tiloihin, tsaari Ferdinand '
        + 'lahjoitti eläintarhalle uuden maa-alueen entisen '
        + 'kasvitieteellisen puutarhan paikalta. Sinne se jäi, runsaan '
        + 'neljän kilometrin päähän keskustasta etelään.',
      /*
       * Commons 25.8.2026: 4160×3120, CC BY-SA 4.0, tekijä Κλυτίος,
       * kuvattu 24.6.2025, kuvaus "Азиатски слон в софийската
       * зоологическа градина" — aasiannorsu Sofian eläintarhassa.
       * Category:Sofia Zoo. Selite ei väitä kuvasta enempää kuin lähde
       * kertoo: se on nykypäivän eläintarhan asukas, ei se korppikotka.
       */
      kuva: {
        tiedosto: 'Азиатски слон.jpg',
        selite: 'Aasiannorsu Sofian eläintarhassa. Tarha on '
          + 'Kaakkois-Euroopan vanhin ja suurin.',
        lahde: 'Κλυτίος, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Mikä eläin muodosti yksinään koko Sofian eläintarhan '
          + 'sen ensimmäisenä vuonna?',
        vaihtoehdot: [
          'Bulgariasta pyydystetty korppikotka',
          'Tsaarin lahjoittama norsu',
          'Kaksi Balkanvuorilta tuotua karhua',
        ],
        oikea: 0,
        fakta: 'Eläintarha perustettiin kuninkaallisella asetuksella 1. '
          + 'toukokuuta 1888. Nykyiselle paikalleen se muutti vasta, kun '
          + 'karhupari ei enää mahtunut palatsin puistoon.',
      },
    },
  ],

  /*
   * ---------- 5. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, sofia: *"Sofian lähteet
   * houkuttivat rakentajia jo ennen bulgaareja. Ketkä rakensivat
   * kylpylänsä näiden lähteiden ääreen?"* → roomalaiset).
   *
   * Visasääntö täyttyy: vastaus löytyy tekstistä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan — teksti ei sano sanaakaan
   * "houkuttelemisesta" eikä luettele kansoja.
   *
   * FAKTAT OVAT PELIN OMASTA, JO HYVÄKSYTYSTÄ SOFIA-AINEISTOSTA:
   * 49 lähdettä ja 110 litraa sekunnissa (kulttuuri-kategoriat.js, nosto
   * "Vesi tulee lämpimänä maasta"), rotunda roomalaisen kylpylän
   * kupolisalina 300-luvulta (nahtavyysjutut.js, "Pyhän Yrjön rotunda"),
   * Konstantinuksen lause ja metrokaivaukset 2010–2012 (nosto "Serdica
   * on minun Roomani"). Mitään uutta faktaväitettä ei ole lisätty.
   */
  oppitunti: {
    otsikko: 'Serdica — kaupunki lähteiden päällä',
    teksti: 'Sofian kadut kulkevat toisen kaupungin päällä. Maasta nousee '
      + 'täällä 49 kivennäis- ja lämpölähdettä, ja keskustan lähde antaa '
      + 'vettä 110 litraa sekunnissa. Roomalaiset rakensivat tälle '
      + 'paikalle Serdican, ja heidän jälkensä näkyy yhä kaupungin '
      + 'vanhimmassa pystyssä olevassa rakennuksessa: punatiilinen Pyhän '
      + 'Yrjön rotunda pystytettiin 300-luvun alussa kylpylaitoksen '
      + 'kupolikattoiseksi saliksi, ja vasta paljon myöhemmin siitä tuli '
      + 'kirkko. Serdica oli sen verran merkittävä, että keisari '
      + 'Konstantinus Suuren kerrotaan sanoneen siitä: Serdica on minun '
      + 'Roomani. Kun metroa kaivettiin vuosina 2010–2012, maasta '
      + 'paljastui kokonainen kortteli katuja, taloja ja kaupunginmuurin '
      + 'itäportti — eikä löytöjä peitetty takaisin. Nykyään matkustaja '
      + 'nousee liukuportaita ylös keskelle katua, jota pitkin on kuljettu '
      + '1800 vuotta.',
    /*
     * Commons 25.8.2026: 1024×768, CC BY 2.0, David Stanley, kuvattu
     * 16.5.2019, kuvaus "Ruins of the ancient Roman city of Serdica stand
     * before the Banya Bashi Mosque (1576) in Sofia, Bulgaria." Selite on
     * tuon kuvauksen suomennos eikä sano enempää.
     */
    kuva: {
      tiedosto: 'Ruins of Serdica (48831910108).jpg',
      selite: 'Roomalaisen Serdican raunioita Sofian keskustassa; '
        + 'taustalla Banja Bashin moskeija vuodelta 1576.',
      lahde: 'David Stanley, Wikimedia Commons (CC BY 2.0)',
    },
  },

  /*
   * ---------- 6. Kohtaaminen ----------
   * Kaanon, kohta 4: *"tarkista onko packs/kohtaamiset.js:ssä jo Sofian
   * hahmo … aarrekysymys pysyy nykyisenä laattakysymyksenä (kaanon:
   * kysymyksiä ei vaihdeta)."*
   *
   * TARKISTETTU 25.8.2026: js/packs/kohtaamiset.js:ssä EI ole Sofian
   * riviä (tiedostossa on kuusi kaupunkia: Lontoo, Kairo, Tukholma,
   * Madrid, Venetsia, Berliini). Sofian hahmo on silti olemassa ja
   * pelissä käytössä: tarinakaaren paketti js/tyohuone-kehitys-data.js
   * (KAARI_PAKETIT, id 'sofia') antaa hahmon, kohtaamiskuvan
   * (assets/kohtaamiset/kohtaaminen-sofia.jpg, tools/
   * generoi-kohtaamiskuvat.mjs) JA sen kysymyksen, jonka game.actionQuiz
   * esittää laatalla (js/game.js kaariTarina). Hahmo on siis Lähteenvartija
   * Nadia, eikä tämä paketti kosketa kysymystä millään tavalla — sama
   * suhde kuin Ateenan Nikoksella.
   *
   * Esittely on tämän kortin omaa tekstiä ja kirjoitettu niin, ettei se
   * kertaa Nadian omaa repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Lähteenvartija Nadia',
    nappi: 'Tapaa Nadia',
    teksti: 'Nadia täyttää kaupunkilaisten kannut keskustan kuumasta '
      + 'lähteestä ja tuntee jokaisen suonen kaupungin alla. Hän on '
      + 'seissyt höyryssä niin kauan, että tunnistaa tulijan kädestä '
      + 'ennen kuin tämä ehtii sanoa mitään: kuka on tullut hakemaan '
      + 'vettä ja kuka vastauksia. Herra Foggia hän ei kiirehdi. Ennen '
      + 'kuin hän laskee kauhansa ja avaa vihkonsa, hän haluaa tietää, '
      + 'onko vieras tajunnut, miksi juuri tähän kohtaan on rakennettu '
      + 'kaupunki toisensa perään.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla. Raskas korttivirta ei lue
   * kumpaakaan.
   */

  /*
   * KOHTAAMISPAIKKA: VASIL LEVSKIN MUISTOMERKKI, ei kaupungin laatta.
   * Kaanon, kohta 4, määrää paikan.
   *
   * 23,33526 E / 42,69666 N — en-Wikipedia "Monument to Vasil Levski,
   * Sofia" (takyt-sofia.md, täky 1). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla (js/packs/fokuskohteet-bgr.js):
   * maailmankartalla Millerin lieriö LEVEYS 12000 / LON0 -175 /
   * POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio),
   * Euroopan laudalla x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((23,33526 − (−175)) mod 360) × (12000/360)
   *                     = 198,33526 × 33,3333… = 6611,2
   *                   y = (millerY(42,69666) − millerY(76)) × 12000/2π
   *                     = 1695,6
   *   europe          x = (23,33526 + 11) × 19,2 = 659,2
   *                   y = (72 − 42,69666) × 26,3 = 770,7
   *
   * TARKISTUS SOFIAN LAATTAA VASTEN: laatta on maailmankartalla
   * 6610,8 / 1696,1 ja Euroopan laudalla 659 / 771. Muistomerkki on
   * laudalla siis noin puolen yksikön päässä laatasta — juuri niin kuin
   * pitääkin, sillä se seisoo keskustassa runsaan kilometrin päässä
   * kaupungin keskipisteestä, ja laudan yksikkö on maailmankartalla noin
   * kolme kilometriä. Piste piirtyy laatan viereen eikä naapurimaahan.
   */
  kohtaamispiste: {
    nimi: 'Vasil Levskin muistomerkki',
    laudat: {
      maailmankartta: { x: 6611.2, y: 1695.6 },
      europe: { x: 659.2, y: 770.7 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS (sama perustelu kuin Ateenassa).
   * Sofian lehden sivupino rakentuu täsmälleen kuten Ateenan
   * (js/lehti.js rakennaSivut), koska kaupungilla on samat kaksi
   * kulttuurikategoriaa ('kaupunki' ja 'arki') ja maalla on Menovinkit-
   * sivu (js/packs/maa-kategoriat.js, BGR): 0 = etusivu, 1 = kaupunkisivu
   * "Sofia", 2 = Arki ja tavat, 3 = Menovinkit.
   *
   * SISÄLTÖ ON LEHDEN OMAA. AARTEEN AVAUS on koottu sivun 2 omasta
   * banitsa-nostosta (BANITSA_VISA) ja JULISTE "Matkailijan Sofia"
   * -artikkelin katukivijaksosta (KATUKIVI_VISA) — ei yhtään uutta
   * faktaväitettä kummassakaan.
   *
   * KOLMAS KYSYMYS EI OLE TÄSSÄ LISTASSA: sivun 1 kysymys on Sofian
   * kulttuurivisa (js/packs/europe-kulttuuri.js, "suvaitsevaisuuden
   * neliö"), jonka js/fokustehtavat.js pukee samaksi AARTEEN AVAUS
   * -laatikoksi ilman omaa riviään täällä. Kumpi tahansa aarteen
   * avaajista sytyttää pisteen, ja jälkimmäisestä saa enää rahaa.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: BANITSA_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: KATUKIVI_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Bulgaria) ----------
   *
   * Raamattu, osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU: kun maan
   * aarre on löydetty, kartalta NOUSEE YKSI TÄKYNOSTO — *"lyhyt
   * KELTAISTEN LEHTIEN KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai
   * uskomaton tositarina, lupaus lunastetaan faktalla) + miniatyyrikuva
   * perässä"*. Näytetään yksi kerrallaan; luetun tilalle nousee poolista
   * seuraava.
   *
   * MIKSI POOLI ON TÄSSÄ TIEDOSTOSSA. Toteutusmoduulia ei ole vielä
   * olemassa (js/fokusnosto.js puuttuu 25.8.2026), eikä Kreikan poolia
   * ole viety mihinkään — se on yhä työaineistona
   * docs/mantereet-tyoaineisto/takynostot-kreikka.md. Pooli on siis
   * datana siellä, missä kaupungin muukin annostelusisältö on, ja se
   * odottaa lukijaansa vahingoittamatta mitään: kenttää, jota kukaan ei
   * lue, ei ole olemassa pelin kannalta. Kun moottori kirjoitetaan,
   * poolin voi siirtää sellaisenaan tai lukea täältä.
   *
   * OTSIKOT OVAT KAANONIN OMAT (fokusvirta-sofia-kaanon.md, kohta 6) —
   * sanamuotoja ei ole muutettu. `lunastus` on rakentajan kokoama
   * lyhyt fakta, joka pitää otsikon lupauksen (takynostot-kreikka.md,
   * sääntö 1: otsikon lupaus lunastetaan tai se on klikkihuijaus).
   * `avaa` osoittaa tämän tiedoston täkyyn, jos sellainen on.
   *
   * KOLMAS NOSTO TARKISTETTIIN. Kaanon jätti täyn 13 varauksella:
   * *"rakentaja tarkistaa lunastuksen täkyraportista; jos täky 13 ei
   * kestä lähdetarkistusta, tilalle täky 2:n salaiset tunnelit."*
   * Takyt-sofia.md merkitsee täyn 13 VARMAKSI ja lainaa en-Wikipedian
   * Sofia-artikkelia sanatarkasti (seitsemän moskeijaa yhtenä yönä
   * joulukuussa 1878, ukkosmyrsky peitti räjähdysten äänen) — lunastus
   * siis kestää, ja kolmas nosto jää kaanonin ensisijaiseen muotoonsa.
   * Raportin oma sävyvaroitus on noudatettu: lunastus kertoo sotatoimen
   * faktana eikä voittajajuhlana, ja mainitsee myös väestön lähdön.
   */
  takynostot: [
    {
      id: 'areena',
      otsikko: 'Hotellin aulassa on aukko lattiassa — sen alla '
        + 'taistelivat krokotiilit ja karhut',
      lunastus: 'Hotellin perustustöissä 2004 paljastui Bulgarian suurin '
        + 'roomalainen amfiteatteri, ja 1919 löytynyt kivilaatta mainostaa '
        + 'siellä käytyjä taisteluja krokotiilien, karhujen, härkien ja '
        + 'villikissojen kanssa.',
      avaa: 'areena',
      // Sama tarkistettu tiedosto kuin täyllä 'areena'.
      kuva: {
        tiedosto: 'Amphitheatre of Serdica - General view.jpg',
        selite: 'Serdican amfiteatteri hotellin pohjakerroksessa.',
        lahde: 'Epaunov72, Wikimedia Commons (CC BY-SA 4.0)',
      },
    },
    {
      id: 'pollopatsas',
      otsikko: 'Kaupungin patsas vaihtoi Leninin tilalle naisen — jonka '
        + 'kruunussa istuu pöllö',
      lunastus: 'Nezavisimost-aukion jalustalla seisoi ennen Lenin. Vuoden '
        + '2000 lopulla sille nostettiin kahdeksanmetrinen Sofia, jolle '
        + 'kuvanveistäjä antoi kruunun vallan, seppeleen maineen ja pöllön '
        + 'viisauden merkiksi.',
      avaa: 'pollopatsas',
      // Sama tarkistettu tiedosto kuin täyllä 'pollopatsas'.
      kuva: {
        tiedosto: 'Sofia statue, Sofia (P1070773).jpg',
        selite: 'Sofia-patsas Nezavisimost-aukiolla.',
        lahde: 'Matti Blume, Wikimedia Commons (CC BY-SA 4.0)',
      },
    },
    {
      id: 'moskeijat',
      otsikko: 'Ukkosmyrsky peitti yön, jona seitsemän moskeijaa räjähti',
      /* Faktat: takyt-sofia.md, täky 13 (VARMA, suora lainaus lähteestä). */
      lunastus: 'Joulukuussa 1878, viisi vuotta isoisän käynnin jälkeen, '
        + 'venäläiset sotilasinsinöörit räjäyttivät seitsemän Sofian '
        + 'moskeijaa samana yönä; ukkosmyrsky peitti räjähdysten äänen. '
        + 'Suurin osa kaupungin moskeijoista tuhoutui sodassa, ja suurin '
        + 'osa muslimiväestöstä lähti kaupungista sen jälkeen.',
      /*
       * Tälle nostolle ei ole omaa täkyä tässä tiedostossa, joten
       * `avaa` puuttuu tarkoituksella — lunastus kannattelee noston
       * yksinään.
       *
       * Commons 25.8.2026: 700×485, public domain, tekijä tuntematon,
       * kuvaus "Баня баши джамия от края на 19 век", Category:Sofia in
       * the 19th century. Kuva näyttää sen moskeijan, joka jäi jäljelle.
       */
      kuva: {
        tiedosto: 'Banya bashi dhzamiya 19 vek.jpg',
        selite: 'Banja Bashin moskeija 1800-luvun lopun valokuvassa. Se on '
          + 'Sofian ainoa yhä toimiva moskeija.',
        lahde: 'Tuntematon kuvaaja, Wikimedia Commons (public domain)',
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * Kaanon, kohta 5 — teksti sellaisenaan. Isoisän merkintä, joka aukeaa
   * kun aarre löytyy.
   */
  aarremerkinta: {
    teksti: 'Konakin varjossa punnitsin lapion ostamista, mutta torilla '
      + 'kysyttiin jo, kuka on se muukalainen joka utelee vanhoista '
      + 'kätköistä. Lähdin aamulla — jotkut aarteet saavat odottaa '
      + 'rohkeampaa.',
  },
};
