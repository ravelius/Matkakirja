/*
 * BUKARESTIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-sofia.js:lle ja
 * js/packs/fokusvirta-ateena.js:lle. Rakenne, kenttien nimet ja kuusi
 * vaihetta ovat samat kuin niissä (Raamatun osio "Fokusmoodi",
 * ANNOSTELU), eikä moottoriin (js/fokusvirta.js) tarvinnut koskea: uusi
 * kaupunki on yksi tiedosto ja yksi rivi rekisterissä
 * (js/packs/fokusvirrat.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (Fable 25.8.2026): docs/mantereet-tyoaineisto/
 * fokusvirta-bukarest-kaanon.md. Matkakirjan paikkarivi, teksti ja
 * luenta, pöllön huomio, aarremerkintä ja täkynostojen klikkiotsikot on
 * siirretty sieltä SELLAISINAAN — sanamuotoja ei ole muokattu. Kaanon
 * myös valitsi täyt (coltea, szathmari, karhut), kohdenoston (Peleș) ja
 * kohtaamispaikan (Colțean tornin paikka).
 *
 * FAKTAPOHJA syvennyksille ja oppitunnille: docs/mantereet-tyoaineisto/
 * takyt-bukarest.md, jonka jokainen väite on tarkistettu
 * en-Wikipediasta artikkeli ja kohta kerrallaan. Täkyjen
 * syvennysteksteissä EI ole yhtään faktaa tuon raportin ulkopuolelta.
 * Täkynostojen lunastukset nojaavat samaan raporttiin ja sen
 * sisartiedostoon docs/mantereet-tyoaineisto/takynostot-romania.md.
 * Oppitunti käyttää lisäksi raportin täkyjä 11 ja 1 (nimen alkuperä ja
 * kaupungin ensimmäinen maininta) — se on tarkoitus, koska oppitunnin
 * tehtävä on pohjustaa laattakysymys.
 *
 * ELÄINTÄKY ON KAANONISSA (toisin kuin Sofiassa, jossa se oli
 * päätoimittajan lisäys): omistajan linjaus *"täkyihin myös söpöjä
 * eläinjuttuja — eläimet ovat tärkeitä kohdeyleisölle"* on Bukarestin
 * kaanonissa jo valmiina kolmantena täkynä (karhut), ja
 * takynostopoolissa kolmantena nostona (Letean hevoset).
 * `vaadittuja` on silti 1 — täkyjä on kolme, mutta portti aukeaa
 * ensimmäisestä.
 *
 * ── KAANONIN KOLME TARKISTUSPYYNTÖÄ ────────────────────────────────
 *
 * Kaanon pyysi rakentajaa tarkistamaan kolme asiaa täkyraportista.
 * Tulokset:
 *
 *   1. PURKUVUOSI 1888 — pitää. Raportin täky 5 lainaa lähdettä:
 *      *"In 1888, it was demolished completely"*, ja sama kohta antaa
 *      rakennusvuodet 1709–1714, korkeusarvion 54 metriä ja kellon
 *      painon 1 700 kiloa.
 *   2. KARHULUKU — kaanonin oma varaus pitää paikkansa. Raportti
 *      merkitsee ristiriidan (en-Wikipedia "Wildlife of Romania": yli
 *      6 000; "Brown bear": 5 000–6 000) ja määrää turvallisimman
 *      muotoilun: **"noin kuusituhatta"**. Sanktuaarin superlatiivi on
 *      **"Euroopan suurin"**, ei maailman — raportin nimenomainen
 *      kielto.
 *   3. LETEAN HEVOSLUKU — pitää. Raportin eläintäky E3 lainaa lähdettä:
 *      *"it increased to around 4,000 individuals"*, ja määrää
 *      sanomaan "mahdollisesti Euroopan viimeinen" ("possibly"), ei
 *      "Euroopan viimeinen".
 *
 * NELJÄS TARKISTUS EI MENNYT LÄPI, ja se on merkitty pöllön kohdalle:
 * kaanonin lause *"sen paikalla on nykyään sairaala"* menee raporttia
 * pidemmälle. Ks. `pollo` alempana.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa ja Sofiassa: vastaus löytyy syvennystekstistä,
 * mutta kysymyksen sanamuoto ei toistu siinä sellaisenaan. Skeema on
 * lehden minitehtävän oma (js/ui.js piirraMinitehtava): kysymys,
 * vaihtoehdot, oikean indeksi ja faktarivi, joka näytetään vasta
 * vastauksen jälkeen.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on tarkistettu imageinfo-rajapinnasta
 * 25.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus) — ei arvattuja
 * nimiä. Kaikki ovat PD tai CC, ja tekijä on `lahde`-rivillä, koska
 * CC BY vaatii maininnan.
 *
 * PÖLLÖN KUVA EI OLE HEROKUVA, samasta syystä kuin Sofiassa: Bukarest
 * ei ole yhdessäkään tools/hero-tyolista-*.mjs -listassa, eikä ämpärissä
 * ole sille herokuvaa. Kenttä `tiedosto` toimii `ampari`-kentän sijasta
 * sellaisenaan (js/fokusvirta.js kuvanOsoite). Tässä se on lisäksi
 * PAREMPI kuin herokuva: pöllö sanoo kaanonissa *"tämä on yksi
 * niistä"*, ja lause vaatii oikean valokuvan puretusta tornista.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * assets/audio/puhe-fokus-matkakirja-bukarest.mp3 on generoitu erikseen
 * (päätoimittaja 25.8.2026) samalla reseptillä kuin Ateenan luenta.
 * Kenttä `aanite` osoittaa siihen; ilman kenttää kytkin ei ilmestyisi
 * puhekuplan alle (js/fokusvirta.js).
 */
import { rouFokuskohteet } from './fokuskohteet-rou.js';

/*
 * ANTIPAN VISA — kevyen kulun AARTEEN AVAUS -tehtävä (sivu 2).
 *
 * EI UUTTA FAKTAA. Väite on sivun 2 oman noston "Museo, jossa dioraama
 * keksittiin" tekstiä (js/packs/kulttuuri-kategoriat.js, bukarest,
 * kategoria 'tiede'): Grigore Antipa johti Bukarestin luonnontieteellistä
 * museota vuodesta 1892 vuoteen 1944, ja kun museo sai uuden talon, hän
 * asetti vuonna 1907 eläimet ensimmäistä kertaa omaan maisemaansa
 * maalatun taustan eteen. Kysymys ei toista tuota lausetta sellaisenaan.
 *
 * MIKSI DIORAAMA EIKÄ VLAICU: sivun oma tehtävä (kategoria 'tiede',
 * tehtava) kysyy Aurel Vlaicun menestystä Wienin lentoviikolla 1912, ja
 * nimetty tehtävä syrjäyttää sen sivulla (js/fokustehtavat.js
 * piirraSivunTehtava). Jos AARTEEN AVAUS kysyisi samasta lentokoneesta,
 * sivun toinen nosto jäisi kokonaan kysymättä. Nyt sivun molemmat nostot
 * ovat käytössä: dioraama tässä, Vlaicu sivun omassa tehtävässä sille,
 * joka pelaa ilman fokusmoodia.
 *
 * MIKSI TÄMÄ ON AARRE EIKÄ JULISTE: palkinto 'piste' tekee tehtävästä
 * aarteen avaajan (js/fokustehtavat.js avaaAarteen). Bukarestin
 * kulttuurivisa avaa aarteen sekin, mutta kaikilla muilla
 * fokusvirtakaupungeilla on lisäksi tämä oma nimetty AARTEEN AVAUS —
 * ilman sitä Bukarest oli ainoa, jolta se puuttui.
 */
const ANTIPA_VISA = {
  kysymys: 'Bukarestin luonnontieteellisessä museossa keksittiin vuonna '
    + '1907 esitystapa, jota museot ympäri maailman yhä käyttävät. Mitä '
    + 'Grigore Antipa teki eläimilleen?',
  vaihtoehdot: [
    'Asetti ne omaan maisemaansa maalatun taustan eteen',
    'Järjesti ne sukupuun mukaiseen jonoon salin läpi',
    'Ripusti ne kattoon luonnollisiin liikeasentoihin',
  ],
  oikea: 0,
  fakta: 'Ensimmäiset dioraamat esittivät Karpaatteja, Bărăganin tasankoa '
    + 'ja Tonavan suistoa, ja pian muidenkin maiden museot pyysivät '
    + 'Antipalta neuvoja. Hän johti museota kaikkiaan 51 vuotta.',
};

/*
 * KIRKKOSIIRTOVISA — kevyen kulun JULISTE-tehtävä (sivu 3).
 *
 * EI UUTTA FAKTAA. Väite on lehden sivun 1 oman noston "Kirkko
 * työnnettiin pois tieltä" tekstiä (js/packs/kulttuuri-kategoriat.js,
 * bukarest): insinööri Eugeniu Iordăchescu valatti rakennuksen alle
 * betonilaatan ja laatan alle kiskot, ja koko kirkko työnnettiin uuteen
 * paikkaan; ensimmäisenä lähti vuonna 1725 rakennettu Schitul Maicilor
 * kesäkuussa 1982, 245 metriä. Kysymys ei toista tuota lausetta
 * sellaisenaan.
 *
 * MIKSI SIVULLA 3 EIKÄ SILLÄ SIVULLA, JOLLA NOSTO ON: sama ratkaisu
 * kuin Ateenassa, Prahassa ja Sofiassa. Sivu 3 on Menovinkit, jonka
 * sisältö on koko maan yhteinen linkkilista (js/packs/maa-kategoriat.js,
 * ROU) — sillä ei ole omaa kaupunkifaktaa, josta visan voisi tehdä, ja
 * lehden jokaisella sivulla paitsi etusivulla on Raamatun mukaan oltava
 * kysymys.
 *
 * SIVUNUMERO KORJATTU 29.8.2026. Tässä luki ennen `sivu: 2` ja
 * perusteluna, että Bukarestilla on vain yksi kulttuurikategoria ja että
 * sivu 2 olisi Menovinkit. Kumpikaan ei pidä paikkaansa: kaupungilla on
 * kaksi kategoriaa ('kaupunki' ja 'tiede', kulttuuri-kategoriat.js),
 * joten sivupino on sama kuin Prahalla ja Ateenalla — 0 = etusivu,
 * 1 = kaupunkisivu, 2 = Tiede ja keksinnöt, 3 = Menovinkit (js/lehti.js
 * rakennaSivut: sivu n näyttää tutkiSivut[n-1] ja Menovinkit lisätään
 * viimeiseksi). Väärä numero vei JULISTEEN tiedesivulle, jolla oli jo
 * oma kysymys, ja jätti Menovinkit-sivun kokonaan ilman kysymystä.
 */
const KIRKKOSIIRTO_VISA = {
  kysymys: 'Bukarestin keskustaa purettiin 1980-luvulla. Millä keinolla '
    + 'insinööri Eugeniu Iordăchescu sai vanhat kirkot säästymään?',
  vaihtoehdot: [
    'Siirsi ne kiskoilla sivuun betonilaatan päällä',
    'Purki ne numeroituina kivinä ja muurasi uudelleen',
    'Piilotti ne uusien talojen sisään',
  ],
  oikea: 0,
  fakta: 'Ensimmäisenä lähti liikkeelle vuonna 1725 rakennettu Schitul '
    + 'Maicilor: kesäkuussa 1982 se matkasi 245 metriä uusien talojen '
    + 'taakse. Iordăchescu siirsi kaikkiaan 29 rakennusta, joista 13 oli '
    + 'kirkkoja tai luostareita.',
};

export const FOKUSVIRTA_BUKAREST = {
  kaupunki: 'bukarest',

  /* ---------- 1. Matkakirja (isoisän ääni + vanha kuva) ---------- */
  matkakirja: {
    /* Kaanon, kohta 1 — paikkarivi, teksti ja luenta sellaisinaan. */
    paikkarivi: 'Bukarest, lokakuussa 1873. Ensimmäinen halla; savu nousee '
      + 'suoraan.',
    teksti: 'Nousin tornin huipulle, jonka Kaarle XII:n sotilaat rakensivat '
      + 'paettuaan Poltavasta — ovensuussa vartioi yhä kaksi maalattua '
      + 'ruotsalaista. Koko kaupunki levittäytyi allani. Toivon, että tämä '
      + 'torni seisoo vielä, kun sinä tulet.',
    luenta: '[curious] Nousin tornin huipulle, jonka Kaarle XII:n sotilaat '
      + 'rakensivat paettuaan Poltavasta — ovensuussa vartioi yhä kaksi '
      + 'maalattua ruotsalaista. [warmly] Koko kaupunki levittäytyi allani. '
      + '[softly] Toivon, että tämä torni seisoo vielä, kun sinä tulet.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-bukarest.mp3',
    /*
     * KUVA: Carol Szathmarin valokuva Colțean tornista (kaanon, kohta 1).
     * Commonsin imageinfo 25.8.2026: 2592×3448, public domain, tekijä
     * Carol Szathmari, päiväys 1867, Category:Turnul Colței. Valokuva on
     * kuusi vuotta ennen isoisän käyntiä — hän kiipesi juuri tuohon
     * torniin, ja pelaaja näkee sen ainoan tavan, jolla sen voi enää
     * nähdä.
     */
    kuva: {
      tiedosto: 'Carol Popp de Szathmari - Colţa.jpg',
      selite: 'Colțean torni Bukarestissa. Carol Szathmari valokuvasi sen '
        + 'vuonna 1867, kuusi vuotta ennen isoisän käyntiä.',
      lahde: 'Carol Szathmari 1867, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 2. Pöllön nykypäivän huomio ----------
   * Kaanon, kohta 2 — teksti sellaisenaan. Kaanon merkitsee vaiheen
   * TARKOITUKSELLA HAIKEAKSI: isoisän toive ei toteutunut, ja pöllö
   * lunastaa katkeruuden kuvalla. Viimeinen virke on pöllön KUIVA
   * OMAKUVA, ei silminnäkijäheitto — sitä ei saa muuttaa väitteeksi
   * siitä, mitä pöllö olisi nähnyt.
   *
   * ── YKSI LAUSE ON FABLEN TARKISTETTAVA ────────────────────────────
   *
   * Kaanon käski tarkistaa purkuvuoden JA sairaalan täkyraportista.
   * Purkuvuosi 1888 on raportissa suorana lainauksena lähteestä.
   * SAIRAALA EI OLE: raportin täky 5 paikantaa tornin sanoilla
   * *"Turnul Colței, Colțean sairaalan ja kirkon vieressä"* — eli
   * sairaala on tornin VIERESSÄ, eikä raportti sano, että se seisoisi
   * tornin paikalla.
   *
   * Lähdeartikkeli haettiin vielä kerran kokonaan (en-Wikipedia "Turnul
   * Colței", 25.8.2026), ja se kertoo saman asian tarkemmin muttei
   * ratkaise kysymystä: spatar Mihai Cantacuzino perusti 1701 samalle
   * tontille Valakian ensimmäisen sairaalan, Colțean sairaalan, ja
   * päätti rakentaa myös tornin; vuoden 1970 kaivauksissa todettiin
   * tornin seisseen 20 metrin päässä kirkosta. Torni oli siis osa samaa
   * Colțea-kokonaisuutta kuin sairaala — mutta se, seisooko sairaala
   * juuri tornin kohdalla, EI ole kummassakaan lähteessä.
   *
   * Fable ratkaisi 25.8.2026: kaanonin "sen paikalla on nykyään
   * sairaala" korvattiin muodolla "sen nimeä kantaa yhä viereinen
   * sairaala", jonka lähteet kattavat — kaanon päivitetty samalla.
   */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Fablen kaanon 27.8.2026, TUURAAJA-KEHYS).
     *
     * Maadoitus koskee KIIPEÄMISEN SÄVYÄ ("Nousin tornin huipulle…
     * Koko kaupunki levittäytyi allani"), ei tornin tarinaa. Kaarle
     * XII:n sotilaat ja maalatut ruotsalaiset ovat takyt-bukarest.md:n
     * täky 5:ssä merkitty VARMOIKSI suoraan lähteestä, joten niihin ei
     * kosketa sanallakaan — niiden epäileminen olisi pelin oman
     * kaanonin kumoamista, ei sävyn maadoittamista.
     *
     * MAADOITUKSEN FAKTA ON SAMASTA TÄYSTÄ: *"Vuoden 1802 maanjäristys
     * pudotti tornin huipun ja kellon"* (en-Wikipedia "Turnul Colței",
     * osio History). 1802 → 1873 on 71 vuotta, eli "seitsemänkymmentä
     * vuotta ennen" on oikein pyöristettynä alaspäin. Portaikon
     * tunnelma on nimenomaan suvun postiperimätietoa eikä lähdeväite.
     *
     * Loppu myöntää isoisälle sen, mikä pitää paikkansa: torni oli yli
     * vuosisadan Bukarestin korkein rakennus (sama täky).
     */
    maadoitus: 'Kiipeäminen kuulostaa täs ihan valloitukselta. Mut '
      + 'maanjäristys oli pudottanut tornin huipun ja kellon jo '
      + 'seitsemänkymmentä vuotta ennen kuin isoisäsi tuli, eli hän kiipesi '
      + 'typistettyyn tynkään pimeää ja tunkkaista portaikkoa pitkin — '
      + 'meikäläisten muistiinpanojen mukaan siellä ei viihtynyt yksikään '
      + 'siivekäs. Sit hän katsoi ulos. Ja sen minä myönnän: tyngästäkin '
      + 'näkyy kauas, jos torni on yhä koko kaupungin korkein.',
    teksti: 'Isoisäsi toive ei toteutunut: torni purettiin 1888, ja sen '
      + 'nimeä kantaa yhä viereinen sairaala. Tornista jäi kourallinen '
      + 'valokuvia — tässä on yksi niistä. Just tän takia minä kannan '
      + 'arkistoa siivissäni.',
    /*
     * Commons 25.8.2026: 2397×3339, public domain, kuvaus "Photo of
     * Turnul Colței, Bucharest, before the demolition", Category:Turnul
     * Colței. Kuva on toinen kuin matkakirjan Szathmari, ja se on
     * tarkoitus: pöllö sanoo "tämä on yksi niistä", ja kourallisesta on
     * siis näytettävä toinen.
     */
    kuva: {
      tiedosto: 'Photo of Turnul Colței, Bucharest, before the demolition. You can see walls with wallpaper in the lower half.jpg',
      selite: 'Colțean torni valokuvattuna vähän ennen purkamista. Torni '
        + 'purettiin kokonaan vuonna 1888.',
      lahde: 'Tuntematon kuvaaja 1888, Wikimedia Commons (public domain)',
    },
  },

  /* ---------- 3. Pöllön valinta ---------- */
  valinta: {
    kysymys: 'Mistä haluaisit kuulla ensin?',
    // Kaanon, kohta 3: vaadittuja 1. Kolmas täky (karhut) on eläintäky
    // eikä nosta porttia — se on lisää luettavaa, ei lisää pakkoa.
    vaadittuja: 1,
    aarreNappi: 'Jatka aarteelle',
    aarreEste: 'Kuuntele ensin yksi tarina',
  },

  /*
   * ---------- 3b. Kohdenostot ----------
   * Kaanon, kohta 3: kohdenostoksi Peleșin linna, *"peruskivi 22.8.1873
   * — täsmälleen isoisän matkavuosi"*. Kohde asuu maan omassa listassa
   * (js/packs/fokuskohteet-rou.js), koska kohde ei kuulu yhdelle
   * kaupungille — täällä on vain poiminta tunnuksella. Kohdenosto ei ole
   * täky: siitä ei tule minivisaa eikä palkkiota, eikä se avaa
   * aarreporttia.
   */
  kohteet: rouFokuskohteet(['peles']),

  /* ---------- 4. Kolme täkypolkua ---------- */
  takyt: [
    {
      id: 'coltea',
      nappi: 'Torni, jonka rakensivat Poltavan pakolaiset',
      otsikko: 'Colțean torni ja ruotsalaiset muurarit',
      /* Faktat: takyt-bukarest.md, täky 5 (merkitty VARMAKSI). */
      teksti: 'Isoisäsi kiipesi Bukarestin korkeimpaan rakennukseen: Colțean '
        + 'torni kohosi arviolta 54 metriin ja oli kaupungin korkein yli '
        + 'vuosisadan ajan. Sen rakentamisessa vuosina 1709–1714 auttoivat '
        + 'Ruotsin kuninkaan Kaarle XII:n sotilaat, jotka olivat paenneet '
        + 'Valakiaan Poltavan tappion jälkeen; ruhtinas Constantin '
        + 'Brâncoveanu majoitti heidät. Sisäänkäynnin molemmin puolin oli '
        + 'maalattuna kaksi ruotsalaista sotilasta, jalkaväkimies ja '
        + 'ratsumies, kiväärit olalla — juuri ne, jotka isoisäsi näki. '
        + 'Tornissa oli myös kirjoitus ruotsalaisten muuraustöiden '
        + 'muistoksi; se on kadonnut. Vuoden 1802 maanjäristys pudotti '
        + 'tornin huipun ja kellon, ja kun torni 1888 purettiin kokonaan, '
        + 'sen 1 700 kilon kello vietiin Sinaian luostariin.',
      /*
       * Commons 25.8.2026: 2707×1786, public domain, Amedeo Preziosi,
       * päiväys 1868, Category:Turnul Colței. Akvarelli on viisi vuotta
       * ennen isoisän käyntiä, ja se on kolmas eri kuva samasta tornista
       * (matkakirja: Szathmari 1867, pöllö: valokuva 1888) — sama paikka
       * kolmen eri käden näkemänä.
       */
      kuva: {
        tiedosto: 'Aquarelle, Turnul Colţei.jpg',
        selite: 'Colțean torni Amedeo Preziosin akvarellissa vuodelta 1868.',
        lahde: 'Amedeo Preziosi 1868, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Ketkä auttoivat Colțean tornin rakennustöissä 1700-luvun '
          + 'alussa?',
        vaihtoehdot: [
          'Poltavasta paenneet Kaarle XII:n sotilaat',
          'Venetsialaiset kivenveistäjät',
          'Ruhtinaan omat linnoitusinsinöörit',
        ],
        oikea: 0,
        fakta: 'Torni oli arviolta 54 metriä korkea ja Bukarestin korkein '
          + 'rakennus yli vuosisadan ajan. Kun se purettiin 1888, sen '
          + '1 700 kilon kello vietiin Sinaian luostariin.',
      },
    },
    {
      id: 'szathmari',
      nappi: 'Mies, joka kuvasi molempien armeijoiden leirit',
      otsikko: 'Carol Popp de Szathmari',
      /* Faktat: takyt-bukarest.md, täky 7 (merkitty VARMAKSI). */
      teksti: 'Se valokuva, jonka juuri näit isoisäsi merkinnän vieressä, on '
        + 'erään bukarestilaisen ottama. Carol Popp de Szathmari muutti '
        + 'kaupunkiin 18-vuotiaana ja avasi tänne kaupallisen '
        + 'valokuvausstudion vuonna 1850. Häntä pidetään romanialaisen '
        + 'valokuvauksen perustajana — ja maailman ensimmäisenä '
        + 'sotavalokuvaajana. Vuodesta 1853 hän kuvasi Tonavan rannoilla '
        + 'sekä turkkilaisia että venäläisiä joukkoja, komentajia ja '
        + 'linnoituksia sodassa, joka tunnetaan Krimin sotana; märkälevyjen '
        + 'kehittämistä varten hän oli rakentanut vaunuun pimiön. Studion '
        + 'asiakkaina Bukarestissa oli molempien armeijoiden upseereita, ja '
        + 'juuri se avasi hänelle pääsyn leireihin. Vuonna 1855 hän vei '
        + 'albuminsa Pariisin maailmannäyttelyyn, sai toisen luokan '
        + 'mitalin ja tapasi Napoleon III:n — ja esitteli heinäkuussa '
        + 'kuvansa kuningatar Victorialle Osbornessa, jolta sai '
        + 'kultamitalin. Vuodesta 1863 hän oli hovin virallinen maalari ja '
        + 'valokuvaaja.',
      /*
       * "PIDETÄÄN", EI "OLI" — raportin nimenomainen ohje: lähde itse
       * muotoilee asian "is considered the world's first combat
       * photographer", eikä peli saa tehdä siitä väitettä.
       *
       * Commons 25.8.2026: 377×503, public domain, Carol Szathmari,
       * päiväys 1854, kuvaus "Crimean War: Turkish infantry in 1854".
       */
      kuva: {
        tiedosto: 'Kırım Savaşı, Türk piyadeleri 1854 senesi.jpg',
        selite: 'Turkkilaista jalkaväkeä vuonna 1854. Kuva on Carol '
          + 'Szathmarin Krimin sodan sarjasta.',
        lahde: 'Carol Szathmari 1854, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mikä avasi Szathmarille pääsyn kummankin sotivan '
          + 'osapuolen leireihin?',
        vaihtoehdot: [
          'Hänen studionsa asiakkaina oli upseereita molemmilta puolilta',
          'Hän matkusti hovin virallisena lähettinä',
          'Hän oli ostanut kuvausluvan kummaltakin komentajalta',
        ],
        oikea: 0,
        fakta: 'Märkälevyjen kehittämistä varten hän oli rakentanut vaunuun '
          + 'pimiön. Kuningatar Victoria palkitsi hänen kuvansa '
          + 'kultamitalilla Osbornessa heinäkuussa 1855.',
      },
    },
    {
      id: 'karhut',
      nappi: 'Metsä, jossa asuu sata pelastettua karhua',
      otsikko: 'Romanian karhut',
      /*
       * ELÄINTÄKY (kaanon, kohta 3; omistajan linjaus söpöistä
       * eläinjutuista). Faktat: takyt-bukarest.md, eläintäky E1.
       *
       * KAKSI RAPORTIN VAROITUSTA ON NOUDATETTU SANATARKASTI:
       *   - karhuluku on "noin kuusituhatta" (raportti merkitsee
       *     ristiriidan 5 000–6 000 vs. yli 6 000 ja määrää tämän),
       *   - sanktuaari on "Euroopan suurin", EI maailman suurin
       *     (ro-Wikipedia sanoo Euroopan; en-Wikipediassa ei ole
       *     aiheesta artikkelia lainkaan).
       *
       * RAPORTIN RASKAAMPI TAUSTA ON JÄTETTY POIS (Romanian hallituksen
       * 2018 ilmoitus noin 2 000 karhun poistamisesta ja sen
       * vastustus). Raportti sanoo sen itse: *"Tämä EI kuulu kevyeen
       * eläintäkyyn."* Se on Fablen tiedossa, jos maalehteen joskus
       * kirjoitetaan karhukannasta vakavampi juttu.
       */
      teksti: 'Romaniassa elää noin kuusituhatta ruskeakarhua — yksi '
        + 'Euroopan suurimmista keskittymistä. Zărneștin kaupungin laidalla, '
        + 'Piatra Craiuluin kansallispuiston kupeessa, on Libearty-'
        + 'karhusanktuaari: 69 hehtaarin metsäalue, jossa asuu yli sata '
        + 'karhua. Jokainen niistä on pelastettu vankeudesta tai '
        + 'kelvottomista oloista. Se on Euroopan suurin '
        + 'ruskeakarhusanktuaari, ja sinne pääsee vain opastetulle '
        + 'kierrokselle, tiistaista sunnuntaihin — eikä alle viisivuotiaita '
        + 'päästetä sisään lainkaan.',
      /*
       * Commons 25.8.2026: 2048×1536, CC0, Costin Costan, kuvattu
       * 1.9.2017, kuvaus "Close encounter with Carpathian brown bear".
       * Kuva on karpaattilaisesta karhusta metsässä eikä sanktuaarista:
       * raportti kertoo, että sanktuaarista itsestään EI löytynyt
       * Commons-kuvia lainkaan (haku palautti tyhjän). Selite ei siis
       * väitä kuvasta sitä, mitä lähde ei sano.
       */
      kuva: {
        tiedosto: 'Carpathian Brown Bear (232367505).jpeg',
        selite: 'Karpaattilainen ruskeakarhu metsässä. Romaniassa niitä elää '
          + 'noin kuusituhatta.',
        lahde: 'Costin Costan, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mikä yhdistää Libearty-sanktuaarin yli sataa karhua?',
        vaihtoehdot: [
          'Jokainen on pelastettu vankeudesta tai kelvottomista oloista',
          'Jokainen on syntynyt sanktuaarissa',
          'Jokainen on siirretty sinne kaupunkien laidoilta',
        ],
        oikea: 0,
        fakta: 'Sanktuaari on 69 hehtaarin metsäalue Zărneștin laidalla, ja '
          + 'se on Euroopan suurin ruskeakarhusanktuaari. Alueelle pääsee '
          + 'vain opastetulle kierrokselle tiistaista sunnuntaihin.',
      },
    },
  ],

  /*
   * ---------- 5. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, bukarest: *"Kaupungin
   * nimessä elää sana bucurie. Mitä se tarkoittaa romaniaksi?"* →
   * iloa).
   *
   * Visasääntö täyttyy: vastaus on tekstissä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan — teksti ei kysy mitään eikä
   * puhu "kaupungin nimessä elävästä sanasta" vaan sanavartalosta ja
   * siitä, mitä asukkaat itse kertovat vieraalle.
   *
   * FAKTAT: takyt-bukarest.md, täky 11 (nimen alkuperä; raportti
   * merkitsee VARMAKSI sen, että alkuperä on todistamaton ja että
   * selitykset ovat juuri nämä) ja täky 1 (kaupungin ensimmäinen
   * maininta 20.9.1459 Vlad III:n slaavinkielisessä asiakirjassa).
   * Raportin oma kielto on noudatettu: peli EI väitä, että Vlad olisi
   * perustanut Bukarestin — vain että kaupunki mainitaan ensi kerran
   * hänen asiakirjassaan ja että se oli hänen residenssinsä.
   */
  oppitunti: {
    otsikko: 'București — kaupunki, jonka nimi on arvoitus',
    teksti: 'Kaupungin nimi on alkuperältään todistamaton, ja juuri se tekee '
      + 'siitä kiinnostavan. Perinne liittää sen Bucur-nimiseen henkilöön, '
      + 'joka on eri tarinoissa ruhtinas, lainsuojaton, kalastaja, paimen '
      + 'tai metsästäjä — kukaan ei tiedä kuka. Romanian sanavartalo '
      + 'bucurie tarkoittaa iloa, ja siitä syntyy se käännös, jonka '
      + 'asukkaat itse kertovat vieraalle: ilon kaupunki. Selityksiä on '
      + 'muitakin. Ottomaanimatkaaja Evliya Çelebi väitti nimen tulevan '
      + 'Abu-Kariș-nimisestä miehestä, itävaltalainen Franz Sulzer johti '
      + 'sen vuonna 1781 sanasta bucuros, iloinen, ja eräs 1800-luvun alun '
      + 'Wienissä julkaistu kirja arveli nimen tulevan pyökkimetsästä. '
      + 'Varmaa on vain se, mikä on kirjoitettu paperille: kaupunki '
      + 'mainitaan ensimmäisen kerran 20. syyskuuta 1459 asiakirjassa, '
      + 'jonka Valakian ruhtinas Vlad III kirjoitti slaaviksi ja jossa hän '
      + 'nimitti Bukarestin linnoitusta ruhtinaalliseksi asuinpaikakseen. '
      + 'Sen hovin rauniot ovat yhä keskellä vanhaakaupunkia.',
    /*
     * Commons 25.8.2026: 1800×1200, CC BY-SA 3.0 ro, Nicubunu, kuvattu
     * 24.9.2011, kuvaus "Ansamblul medieval Curtea Veche",
     * Category:Curtea Veche. Kuva näyttää sen paikan, josta tekstin
     * viimeinen virke puhuu.
     */
    kuva: {
      tiedosto: 'Curtea Veche 1.jpg',
      selite: 'Vanhan ruhtinaanhovin raunioita Bukarestin vanhassakaupungissa. '
        + 'Juuri tämän paikan Vlad III nimitti 1459 asuinpaikakseen.',
      lahde: 'Nicubunu, Wikimedia Commons (CC BY-SA 3.0 ro)',
    },
  },

  /*
   * ---------- 6. Kohtaaminen ----------
   * Kaanon, kohta 4: *"Rakentaja tarkistaa hahmon ja laattakysymyksen —
   * EI vaihdeta."*
   *
   * TARKISTETTU 25.8.2026: js/packs/kohtaamiset.js:ssä EI ole Bukarestin
   * riviä (tiedostossa on kuusi kaupunkia: Lontoo, Kairo, Tukholma,
   * Madrid, Venetsia, Berliini). Bukarestin hahmo on silti olemassa ja
   * pelissä käytössä: tarinakaaren paketti js/tyohuone-kehitys-data.js
   * (KAARI_PAKETIT, id 'bukarest') antaa hahmon JA sen kysymyksen, jonka
   * game.actionQuiz esittää laatalla (js/game.js kaariTarina). Hahmo on
   * siis Kellonsoittaja Ana, eikä tämä paketti kosketa kysymystä millään
   * tavalla — sama suhde kuin Ateenan Nikoksella ja Sofian Nadialla.
   *
   * KOHTAAMISKUVAA EI OLE. Sofian paketissa on kenttä
   * `kuva: assets/kohtaamiset/kohtaaminen-sofia.jpg`; Bukarestin
   * paketissa sitä ei ole, eikä tiedostoa ole repossa
   * (tools/generoi-kohtaamiskuvat.mjs ei ole ajettu Bukarestille).
   * Tämä paketti ei omista kuvakenttää eikä siis korjaa asiaa täältä
   * käsin — se on merkitty päätoimittajan listalle.
   *
   * Esittely on tämän kortin omaa tekstiä ja kirjoitettu niin, ettei se
   * kertaa Anan omaa repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Kellonsoittaja Ana',
    nappi: 'Tapaa Ana',
    teksti: 'Ana soittaa paimenen kirkon kelloa, ja hänen sukunsa on vetänyt '
      + 'samaa köyttä neljässä polvessa. Hän tuntee kellon äänestä sään ja '
      + 'portaiden kolinasta sen, kuka on tulossa ylös. Kellotornissa ei '
      + 'kiirehditä. Ennen kuin Ana kiertää köyden ranteensa ympäri, hän '
      + 'haluaa tietää, onko vieras kuullut mitä kaupungin oma nimi hänelle '
      + 'sanoo.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla ja Sofialla. Raskas korttivirta ei
   * lue kumpaakaan.
   */

  /*
   * KOHTAAMISPAIKKA: COLȚEAN TORNIN PAIKKA, ei kaupungin laatta.
   * Kaanon, kohta 4, määrää paikan — ja se on koko virran ydin: isoisä
   * kiipesi torniin, jota ei enää ole, ja piste syttyy juuri siihen
   * kohtaan.
   *
   * 26,10298 E / 44,43515 N — en-Wikipedian coordinates-rajapinta
   * artikkelille "Turnul Colței" (takyt-bukarest.md, täky 5). Kaanon
   * antoi likiarvon 44,4356 N / 26,1017 E; ero on laudalla alle 0,1
   * yksikköä, ja tässä on raportin tarkistettu luku.
   *
   * Muunnos on sama kaava ja samat vakiot kuin fokuskohteilla
   * (js/packs/fokuskohteet-rou.js): maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 -175 / POHJOINEN 76
   * (tools/fokuskartta/piirto.js laudanProjektio), Euroopan laudalla
   * x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((26,10298 − (−175)) mod 360) × (12000/360)
   *                     = 201,10298 × 33,3333… = 6703,4
   *                   y = (millerY(44,43515) − millerY(76)) × 12000/2π
   *                     = 1625,0
   *   europe          x = (26,10298 + 11) × 19,2 = 712,4
   *                   y = (72 − 44,43515) × 26,3 = 725,0
   *
   * TARKISTUS BUKARESTIN LAATTAA VASTEN: laatta on maailmankartalla
   * 6702,8 / 1625,1 ja Euroopan laudalla 712 / 725. Tornin paikka on
   * laudalla siis alle yhden yksikön päässä laatasta — juuri niin kuin
   * pitääkin, sillä torni seisoi keskustassa muutaman sadan metrin
   * päässä kaupungin keskipisteestä, ja laudan yksikkö on
   * maailmankartalla noin kolme kilometriä. Piste piirtyy laatan viereen
   * eikä naapurimaahan.
   */
  kohtaamispiste: {
    nimi: 'Colțean tornin paikka',
    laudat: {
      maailmankartta: { x: 6703.4, y: 1625.0 },
      europe: { x: 712.4, y: 725.0 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS (sama perustelu kuin Ateenassa ja
   * Sofiassa). Sivupino on sama kuin Prahalla ja Ateenalla, koska
   * kaupungilla on kaksi kulttuurikategoriaa: 0 = etusivu,
   * 1 = kaupunkisivu "Bukarest", 2 = Tiede ja keksinnöt,
   * 3 = Menovinkit (js/packs/maa-kategoriat.js, ROU).
   *
   * SISÄLTÖ ON LEHDEN OMAA: AARTEEN AVAUS on koottu sivun 2 omasta
   * dioraamanostosta (ANTIPA_VISA) ja JULISTE sivun 1 omasta
   * kirkkosiirtonostosta (KIRKKOSIIRTO_VISA) — ei yhtään uutta
   * faktaväitettä.
   *
   * KULTTUURIVISA AVAA AARTEEN TÄMÄN RINNALLA: Bukarestin oma visa
   * (js/packs/europe-kulttuuri.js, Parlamenttipalatsin maailmanennätys)
   * pukeutuu AARTEEN AVAUS -laatikoksi sivulla 1 ilman omaa riviään
   * täällä (js/fokustehtavat.js VISA_TEHTAVA). Kaksi avaajaa ei ole
   * ristiriita: mikä tahansa niistä riittää sytyttämään jäljen
   * (omistajan sääntö 25.8.2026), ja näin Bukarest on samalla mallilla
   * kuin kaikki muut fokusvirtakaupungit. Kumpikaan visa ei pohjusta
   * laattakysymystä: ne kysyvät palatsin painosta ja dioraamasta,
   * laatta kaupungin nimestä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: ANTIPA_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: KIRKKOSIIRTO_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Romania) ----------
   *
   * Raamattu, osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU: kun maan
   * aarre on löydetty, kartalta NOUSEE YKSI TÄKYNOSTO — *"lyhyt
   * KELTAISTEN LEHTIEN KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai
   * uskomaton tositarina, lupaus lunastetaan faktalla) + miniatyyrikuva
   * perässä"*. Näytetään yksi kerrallaan; luetun tilalle nousee poolista
   * seuraava.
   *
   * OTSIKOT OVAT KAANONIN OMAT (fokusvirta-bukarest-kaanon.md, kohta 6)
   * — sanamuotoja ei ole muutettu. `lunastus` on rakentajan kokoama
   * lyhyt fakta, joka pitää otsikon lupauksen (takynostot-romania.md,
   * sääntö 1: otsikon lupaus lunastetaan tai se on klikkihuijaus).
   * `avaa` osoittaisi tämän tiedoston täkyyn, jos sellainen olisi —
   * yhdelläkään näistä kolmesta ei ole omaa täkyä, joten kenttä puuttuu
   * tarkoituksella ja lunastus kannattelee noston yksinään.
   *
   * MIKÄÄN NOSTO EI TOISTA TÄKYÄ. Kaanon valitsi poolin nimenomaan
   * täkyjen ulkopuolelta: Stoker, Comăneci ja Letean hevoset ovat kaikki
   * eri aiheita kuin Colțean torni, Szathmari ja Libearty-sanktuaari.
   *
   * VAIN YKSI NOSTO PER MAA (omistaja 26.8.2026 ilta: *"Täkyjä josta
   * tulee puhekupla pitää olla vain yksi per maa. Kaikki muut
   * normaaleita."*). Poolissa oli kolme nostoa; jäljellä on kaanonin
   * ensimmäinen. Kahdesta muusta:
   *   - "comaneci" on siirretty kartan tavalliseksi kohteeksi
   *     (js/packs/fokuskohteet-rou.js, tunnus `comaneci`) teksteineen,
   *     kuvineen ja lähteineen sellaisenaan;
   *   - eläinnosto "hevoset" jäi kokonaan pois, koska työaineisto sitoo
   *     sen suoraan olemassa olevaan kohteeseen `tonavan-suisto`
   *     (takynostot-romania.md, ehdokas 9: *"Kohde: Tonavan suisto
   *     (fokuskohde 5)"*) — kahta merkkiä samaan paikkaan ei tehdä.
   * Maan eläinaihe (takynostot-romania.md, omistajan täydennys:
   * *"vähintään yhden nostoista on oltava eläinaiheinen"*) on siis nyt
   * kartan kohteessa eikä täkypoolissa; jos omistaja haluaa eläimen
   * takaisin kuplaan, vaihto on yhden rivin päätös tässä listassa.
   */
  takynostot: [
    {
      id: 'dracula',
      // Kartan nimiö täkypisteen kylkeen (päätoimittaja 28.8.2026).
      nimio: 'Draculan alaviite',
      otsikko: 'Dracula syntyi alaviitteestä — kirjailija ei käynyt koskaan '
        + 'Itä-Euroopassa',
      /* Faktat: takynostot-romania.md, ehdokas 1 (VARMA). */
      lunastus: 'Bram Stoker kiersi teatterikiertueilla maailmaa muttei '
        + 'koskaan käynyt Itä-Euroopassa. Muistiinpanoissa romaani oli '
        + 'sijoitettu Styriaan ja kreivin nimi oli Count Wampyr; nimen '
        + 'Dracula hän poimi William Wilkinsonin vuoden 1820 Valakian ja '
        + 'Moldavian historiasta ja kopioi kirjasta alaviitteen "Dracula '
        + 'means devil". Vlad Seivästäjää ei mainita muistiinpanoissa '
        + 'lainkaan.',
      /*
       * PÄÄKUVAKSI HAVAINNEKUVA (28.8.2026, sama malli kuin Sofian
       * areenalla ja Kreikan kahdella nostolla): repon oma generoitu
       * kuva, jolla ei ole Commons-nimeä eikä varareittiä, joten kenttä
       * on `osoite` eikä `tiedosto` (js/fokusnosto.js asetaNostonKuva).
       *
       * Kuva ei esitä paikkaa vaan HETKEN, jossa juttu tapahtui:
       * kirjailijan työpöytä muistiinpanojen aikaan. Lähderivi sanoo
       * sen itse, jottei kukaan lue sitä valokuvaksi.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-dracula-loistoaika.webp',
        selite: 'Kirjailijan työpöytä muistiinpanojen aikaan: avattu '
          + 'historiateos, käsin kirjoitettuja arkkeja ja öljylamppu.',
        lahde: 'Matkakirjan havainnekuva: hetki, jona myytti syntyi',
      },
      /*
       * KAKKOSKUVA on nyt entinen pääkuva — todiste siitä, mistä juttu
       * kertoo. Tiedosto, selite ja lähde ovat sanasta sanaan samat kuin
       * ennen; vain kentän nimi vaihtui.
       *
       * Commons 25.8.2026: 1484×2360, public domain, Bram Stoker,
       * päiväys "before 1897", kuvaus "Bram Stoker's Notes on the
       * personal for his novel Dracula" — juuri se paperi, jolla myytti
       * syntyi.
       */
      valokuva: {
        tiedosto: 'Stoker Dracula Notes Personal.jpg',
        selite: 'Bram Stokerin omat muistiinpanot romaaninsa henkilöistä.',
        lahde: 'Bram Stoker ennen 1897, Wikimedia Commons (public domain)',
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * Kaanon, kohta 5 — teksti sellaisenaan. Isoisän merkintä, joka aukeaa
   * kun aarre löytyy.
   *
   * KAKSI ASIAA, JOTKA EIVÄT SAA MUUTTUA. Ensimmäinen virke nojaa
   * tarkistettuun faktaan (Peleșin peruskivi 22.8.1873,
   * fokuskohteet-romania.md kohde 3), ja viimeinen virke kuittaa
   * Istanbulin vaanijan poissaolon — kaari hengittää, ja siksi tässä
   * kaupungissa EI ole vaanijaa.
   */
  aarremerkinta: {
    teksti: 'Kätkin lippaani samana elokuuna, jona kuningas muurasi '
      + 'Sinaiassa linnansa peruskiven. Hänen lippaansa tarvitsee linnan — '
      + 'minun tarvitsee vain tarkan silmän. Sillalla ei tällä kertaa '
      + 'seissyt ketään.',
  },
};
