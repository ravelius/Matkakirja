/*
 * VENETSIAN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4B.
 *
 * Sisartiedosto js/packs/fokusvirta-rooma.js:lle ja js/packs/
 * fokusvirta-sevilla.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Uusi kaupunki on yksi tiedosto ja yksi rivi
 * rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ PAKETTI EI KIRJOITA SITÄ
 * RIVIÄ eikä koske sw.js:ään, savukkeisiin tai mihinkään muuhun
 * tiedostoon: aallon 4B kaupungit kokoaa integrointiagentti yhtenä
 * nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4B kaanonpaperi).
 * NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Caravaggion kadonnut maalaus on Italian aarre (sama pari
 * kuin Firenzellä) — mutta Venetsian aarremerkintä ei kerro siitä vaan
 * on kaupungin oma merkintä laguunin pohjasta. Kaanon on sanatarkka,
 * eikä tämä paketti tulkitse sitä.
 *
 * FAKTAPOHJA. Kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `venetsia`) kolmena sivuna
 * ('kaupunki', 'rakennukset', 'kasityo'), ja kaupungilla on lisäksi
 * tarinakaaren paketti (js/tyohuone-kehitys-data.js KAARI_PAKETIT,
 * 'venetsia'). Tämän paketin sisältö nojaa kolmeen lähteeseen ja vain
 * niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Lehden omat nostot (puupaalut,
 *      acqua alta ja MOSE, Muranon lasi, gondolin vinous, sestierien
 *      talonumerot) — nämä on jo kertaalleen tarkistettu ja hyväksytty
 *      peliin, ja MOLEMMAT lehtitehtävän visat sekä Livian maadoitus on
 *      koottu niistä ilman yhtään uutta faktaväitettä.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 29.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts,
 *      redirects=1) artikkeli ja osio kerrallaan, ja jokaisen kohdan
 *      oma kommentti nimeää artikkelin. Mitään ei ole päätelty,
 *      pyöristetty eikä muistettu.
 *   3. COMMONSIN IMAGEINFO jokaisesta kuvasta (ks. KUVAT alempana).
 *
 * ── OMISTAJAN LINJAUKSET, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ──────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen. Kortti piirtyy ilman
 *      kuvaa (js/ui.js naytaFactValokuva saa nullin).
 *   2. ÄÄNITEKENTTÄÄ EI KIRJOITETA. Toisin kuin Roomassa, Madridissa ja
 *      Sevillassa, `matkakirja.aanite` jätetään tästä paketista pois
 *      (aallon 4B tilaus): luenta on tekstinä valmiina, ja äänitiedoston
 *      polku kirjoitetaan vasta kun generointiajo on tehty. Kytkentä on
 *      silloin yhden rivin lisäys; ennen sitä kortti ei lupaa kaiutinta,
 *      jonka takana ei ole mitään.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta; moottori
 *      lukee kentän varovasti (`data.valinta?.…`), joten portin mitta on
 *      oletus (yksi täky) ja kuplan otsikko moottorin oma.
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA. Kohtaamisessa on siis
 *      vain hahmo, nappi ja teksti.
 *   5. TÄKYNOSTOJA EI OLE TÄSSÄ PAKETISSA (aallon 4B rajaus). Italian
 *      ainoa täkynostopooli asuu Rooman paketissa (js/packs/
 *      fokusvirta-rooma.js, `takynostot`), ja se on KAUPUNGIN oma
 *      pooli: js/fokusnosto.js:n NOSTO_MAAT-taulussa ei ole ITA-riviä
 *      (siinä ovat GRC, ESP, AUT, FRA ja DEU). Venetsiassa ei siis
 *      tuikuta yhtään täkynostopistettä ennen kuin joku päättää, mitä
 *      Italialle tehdään.
 *
 *      HUOMAUTUS INTEGROIJALLE: jos Italialle halutaan koko maan
 *      yhteinen pooli, ratkaisu on YKSI RIVI js/fokusnosto.js:ssä
 *      (`ITA: FOKUSVIRTA_ROOMA.takynostot`, kuten ESP, AUT, FRA ja DEU
 *      on tehty) eikä oma pooli täällä. Jos Venetsialle kirjoitettaisiin
 *      oma `takynostot`-kenttä, se lisäksi ohittaisi maan poolin tässä
 *      kaupungissa myöhemminkin, koska nostoMaanPooli lukee kaupungin
 *      kentän ENNEN maan taulua. Kummankin päätöksen omistaa Fable.
 *
 * ── MINIVISAN SÄÄNTÖ — JA POIKKEUS TALON TAPAAN ────────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan (Isfahan-sääntö, docs/moduulit/
 * tarinakaari.md luku 6 kohta 6).
 *
 * OIKEAN VASTAUKSEN PAIKKA VAIHTELEE. Aaltoihin 1–4A asti talon tapa
 * oli, että oikea vaihtoehto on aina indeksi 0 (moottori ei sekoita
 * vaihtoehtoja: js/fokusvirta.js `const oikein = i === visa.oikea`).
 * Aallon 4B tilaus kääntää tämän: tässä tiedostossa oikea on
 * järjestyksessä 1, 2, 0, 2 ja 1, koska aina samana pysyvä paikka on
 * opittavissa ilman kysymystä. Tarinakaaren mittausvaatimus (luku 6
 * kohta 2) on lisäksi tarkistettu käsin: oikea vaihtoehto EI ole pisin
 * yhdessäkään tämän tiedoston viidestä visasta.
 *
 * ── LAATTAKYSYMYSTÄ EI SPOILATA — JA MIKÄ SE VENETSIASSA ON ────────
 *
 * Venetsialla ON tarinakaaren paketti (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, 'venetsia'), joten kohtaamisen takana EI ole
 * js/packs/europe-questions.js:n laattakysymyksiä vaan kaaren oma
 * kysymys: *"Miksi ruttolääkärin naamiossa on pitkä linnunnokka?"*
 * Sama ratkaisu kuin Dubrovnikissa (js/packs/fokusvirta-dubrovnik.js).
 *
 * Oppitunti pohjustaa juuri tuon kysymyksen: se kertoo laguunin
 * karanteenilaitoksesta ja siitä, MIHIN aikalaiset uskoivat taudin
 * kulkevan — savu, etikka ja hyvä haju vastaan huono ilma. Vastausrivi
 * ("nokkaan pantiin yrttejä") ei esiinny tekstissä missään muodossa,
 * eikä oppitunti mainitse naamiota lainkaan; tarkkaavainen lukija
 * päättelee, hätäinen arvaa. Kaaren omaa repliikkiä (naamiontekijä
 * Lucia, tilauskirja) ei kerrata tässä paketissa.
 *
 * Lehtitehtävien visat eivät kosketa kaaren aihetta: AARTEEN AVAUS
 * kysyy gondolin rungosta ja JULISTE talonumeroista.
 *
 * ── 1873-ANKKURIT ─────────────────────────────────────────────────
 *
 * Kolme, ja kukin kerrotaan täsmälleen kerran (tarinakaari luku 5,
 * "kerro kukin tarina vain kerran per kaupunki"):
 *
 *   1. ITÄVALLALTA ITALIALLE 1866 — `plebiskiitti`-täky. Isoisän
 *      käydessä kaupunki oli ollut Italiaa seitsemän vuotta.
 *   2. ACQUA ALTA — kaanonin oma merkintä ja Livian kanoninen
 *      repliikki hoitavat sen kokonaan (vesi nousi torille; padot
 *      mereen). Tämä paketti EI kirjoita siitä omaa täkyä, koska
 *      kaupunkilehden sivulla 2 on siitä jo nosto ja minitehtävä.
 *   3. MARKUKSEN HEVOSET — `hevoset`-täky. Kaanon sanoo, että ne ovat
 *      ryöstösaalista; täky kertoo mitä niille tapahtui sen jälkeen.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 29.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD, CC0 tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä, koska CC BY-SA vaatii maininnan. JOKAINEN on lisäksi
 * katsottu silmin 960 pikselin esikatseluna: yhdessäkään ei ole
 * tunnistettavia eläviä ihmisiä.
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma
 * generoitu havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi
 * generointiajon, jota tälle aallolle ei ole tehty. Sama ratkaisu kuin
 * Tukholmassa ja Sevillassa: yksi kuva per kortti, `tiedosto`-kenttä.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Sevillassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Gondolikysymys on Venetsian lehden
 * Käsityö-sivun oman noston "Gondoli on tahallaan vino" tekstiä ja
 * osoitekysymys kaupunkisivun "Matkailijan Venetsia" -oppaan jakson
 * "Osoite, jota ei löydä kadulta" tekstiä (js/packs/
 * kulttuuri-kategoriat.js). Uusia faktaväitteitä ei ole kummassakaan.
 */
const GONDOLI_VISA = {
  kysymys: 'Gondolin vasen kylki on oikeaa leveämpi. Miksi vene on '
    + 'tahallaan vino?',
  vaihtoehdot: [
    'Jotta matkustajat mahtuisivat istumaan vasemmalle puolelle',
    'Jotta vene kääntyisi kapeissa kanavissa jyrkemmin',
    'Se kumoaa kaarron, jonka yksi airo muuten tekisi',
  ],
  oikea: 2,
  fakta: 'Soutaja seisoo perässä ja soutaa yhdellä airolla veneen '
    + 'oikealta puolelta. Gondoli on noin 10,85 metriä pitkä, painaa 350 '
    + 'kiloa ja kootaan 280 osasta kahdeksaa eri puulajia.',
};

const OSOITE_VISA = {
  kysymys: 'Venetsiassa talonumero ei auta perille yhtä hyvin kuin '
    + 'muualla. Miksi?',
  vaihtoehdot: [
    'Numerot on maalattu seinään ja ne ovat kuluneet pois vuosisatojen aikana',
    'Numerot juoksevat kaupunginosittain eivätkä kaduittain',
    'Saman numeron saavat sekä talo että sen laituri',
  ],
  oikea: 1,
  fakta: 'Kaupunki jakautuu kuuteen sestieriin, ja Castellossa '
    + 'talonumerot yltävät lähelle seitsemäätuhatta. Siksi kaksi hyvin '
    + 'erilaista numeroa voi olla muutaman metrin päässä toisistaan.',
};

export const FOKUSVIRTA_VENETSIA = {
  kaupunki: 'venetsia',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Venetsia, kesäkuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Kaupunki, jossa kadut ovat vettä ja portaat päättyvät '
      + 'mereen. Gondolieeri lauloi minulle hinnan päälle, ja torilla '
      + 'vaihdettiin kalaa, lasia ja huhuja samalla tiskillä. Markuksen '
      + 'kirkon hevoset ovat ryöstösaalista Konstantinopolista — täällä '
      + 'sanotaan suoraan, että puoli kaupunkia on tuotu jostain '
      + 'muualta, ja sanotaan se ylpeänä. Iltapäivällä vesi nousi '
      + 'torille ja kauppiaat nostivat tavaransa penkeille kiroamatta: '
      + 'näin täällä on aina ollut.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Kolme tagia, alku ja
     * loppu eri sävyssä. Äänitekenttää ei ole (ks. linjaus 2 yllä).
     */
    luenta: '[curious] Kaupunki, jossa kadut ovat vettä ja portaat '
      + 'päättyvät mereen. Gondolieeri lauloi minulle hinnan päälle, ja '
      + 'torilla vaihdettiin kalaa, lasia ja huhuja samalla tiskillä. '
      + '[softly] Markuksen kirkon hevoset ovat ryöstösaalista '
      + 'Konstantinopolista — täällä sanotaan suoraan, että puoli '
      + 'kaupunkia on tuotu jostain muualta, ja sanotaan se ylpeänä. '
      + '[warmly] Iltapäivällä vesi nousi torille ja kauppiaat nostivat '
      + 'tavaransa penkeille kiroamatta: näin täällä on aina ollut.',
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
     * REUNOILLA): lyhentymät ovat vain alussa ("Jep") ja lopussa
     * ("mut"), keskellä sanat ovat auki; pronominit kokonaisina; ei
     * huutomerkkejä.
     *
     * MIKSI PORTAAT EIKÄ VESI: kanoninen repliikki alla vastaa jo
     * nousevaan veteen, hevosiin ja gondolieereihin. Merkinnän
     * ensimmäinen lause — portaat päättyvät mereen — jää muuten
     * kokonaan vastaamatta, ja juuri siihen tämä maadoitus tarttuu.
     *
     * FAKTAKURI: neljä väitettä, kaikki pelin omasta jo hyväksytystä
     * Venetsia-aineistosta (js/packs/kulttuuri-kategoriat.js, nosto
     * "Kaupunki seisoo puunrunkojen päällä"). (1) Talot seisovat
     * laguunin mutaan lyödyillä lepänrungoilla, jotka ylsivät kovaan
     * savikerrokseen. (2) Paalujen päälle ladottiin istrialaiset
     * kalkkikivilaatat ja vasta niiden päälle tiilet. (3) Hapettomassa
     * mudassa puu ei lahoa vaan kovettuu. (4) Santa Maria della Saluten
     * alle lyötiin yli miljoona paalua.
     */
    maadoitus: 'Jep, ne portaat päättyvät mereen ihan oikeasti. Tämä '
      + 'kaupunki ei seiso kalliolla vaan puussa: laguunin mutaan lyötiin '
      + 'tiheät rivit lepänrunkoja, kunnes ne ylsivät kovaan '
      + 'savikerrokseen asti, ja niiden päälle ladottiin ensin '
      + 'kalkkikivilaatat ja vasta sitten tiilet. Hapettomassa mudassa '
      + 'puu ei lahoa vaan kovettuu, ja Santa Maria della Saluten alle '
      + 'niitä lyötiin yli miljoona. Se alin askelma ei siis ole vahinko '
      + '— mut se on vasta kaupungin pintaa.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan.
     */
    teksti: 'Vesi nousee Markuksen torille edelleen, useammin kuin '
      + 'isoisäsi aikaan, ja nykyään sitä vastaan on rakennettu '
      + 'liikuteltavat padot mereen.. Ne hevoset ovat nykyään kirkon '
      + 'sisällä ja kopiot ulkona — ja se ylpeys tuodusta tavarasta ei '
      + 'ole kadonnut minnekään. Gondolieerit laulavat yhä hinnan '
      + 'päälle. Mennään torille.',
    /*
     * PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA (omistajan linjaus):
     * KULTTUURI_KATEGORIAT-karusellin ensimmäinen hero (venetsia/
     * avauskuvat) eikä uusi Commons-kuva. Kuva osuu tässä kohdalleen:
     * kanoninen repliikki puhuu hevosista, ja hero on juuri
     * Markuksenkirkko.
     *
     * SELITE ON KIRJOITETTU KANONISEN REPLIIKIN MUKAAN. Lehden oma
     * selite sanoo, että pronssihevoset "seisovat pääportaalin yllä";
     * repliikki sanoo, että alkuperäiset ovat sisällä ja ulkona on
     * kopiot. Molemmat ovat totta eri esineistä, joten selite kertoo
     * eron auki (en-Wikipedia "Horses of Saint Mark": alkuperäiset
     * siirrettiin sisälle 1980-luvun alussa ilmansaasteiden takia ja
     * loggialle nostettiin kopiot; haettu 29.8.2026).
     */
    kuva: {
      ampari: 'herokoe/hero-venetsia-st-marks.jpg',
      selite: 'Markuksenkirkon parvekkeella seisovat nykyään kopiot: '
        + 'vuonna 1204 Konstantinopolista tuodut pronssihevoset '
        + 'siirrettiin 1980-luvun alussa ilmansaasteiden takia kirkon '
        + 'sisälle.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * 1873-ANKKURI: MARKUKSEN HEVOSET.
       *
       * MIKSI TÄMÄ TÄKY: kaanoninen merkintä sanoo hevosista vain sen,
       * että ne ovat ryöstösaalista. Täky ei kertaa sitä vaan jatkaa
       * siitä eteenpäin — ja tarjoaa kartanpiirtäjän pojanpojalle sen,
       * mitä hän kaikkein todennäköisimmin haluaisi: mittaustuloksen.
       *
       * FAKTAT (en-Wikipedia "Horses of Saint Mark", johdanto sekä
       * osiot "Origins" ja "History"; haettu 29.8.2026):
       *   - hevoset olivat pitkään Konstantinopolin hippodromilla ja
       *     ne vietiin sieltä Venetsiaan 1204; samana vuonna niiden
       *     kaulaan lisättiin pannat peittämään kohdat, joista päät oli
       *     katkaistu kuljetusta varten;
       *   - doge Enrico Dandolo lähetti ne Venetsiaan, ja ne
       *     pystytettiin basilikan julkisivun parvekkeelle 1254;
       *     Petrarca ihaili niitä siellä;
       *   - Napoleon vei ne Pariisiin 1797 ja ne sijoitettiin
       *     Carrousel-riemukaareen; 1815 ne palautettiin Venetsiaan, ja
       *     työn teki kapteeni Dumaresq, jonka Itävallan keisari valitsi
       *     tehtävään ja palkitsi timanttinimikirjaimin koristellulla
       *     kultaisella nuuskarasialla;
       *   - hevoset olivat basilikan päällä 1980-luvun alkuun asti,
       *     jolloin ilmansaasteiden vauriot veivät ne sisätiloihin ja
       *     loggialle nostettiin kopiot;
       *   - analyysin mukaan seos on vähintään 96,67 % kuparia, joten
       *     kyse ei ole pronssista vaan epäpuhtaasta kuparista; matala
       *     tinapitoisuus nosti valulämpötilan 1200–1300 asteeseen;
       *   - ajoitus on kiistanalainen: moni tutkija pitää niitä 100- tai
       *     200-luvun jälkeisenä roomalaisena työnä, toiset klassisen
       *     Kreikan 400–300-luvun eaa. työnä;
       *   - lyhyet selät ja pitkät jalat viittaavat siihen, että ne on
       *     tehty katsottaviksi alhaalta ylöspäin.
       */
      id: 'hevoset',
      nappi: 'Neljä hevosta, jotka ovat matkustaneet enemmän kuin sinä',
      otsikko: 'Markuksen hevoset',
      teksti: 'Isoisäsi näki ne siellä, missä ne olivat seisoneet '
        + 'kuusisataa vuotta: basilikan parvekkeella, katunäkymän '
        + 'yläpuolella. Sitä ennen ne olivat seisoneet Konstantinopolin '
        + 'hippodromilla, ja vuonna 1204 ne vietiin sieltä pois. '
        + 'Kuljetusta varten päät katkaistiin irti, ja samana vuonna '
        + 'kaulaan lisättiin pannat peittämään saumat — ne pannat ovat '
        + 'siinä yhä. Venetsiaan hevoset pystytettiin 1254, ja Petrarca '
        + 'kävi ihailemassa niitä. Vuonna 1797 Napoleon vei ne Pariisiin '
        + 'ja ne nostettiin Carrousel-riemukaareen; kahdeksantoista '
        + 'vuotta myöhemmin ne tuotiin takaisin, ja työn teki kapteeni '
        + 'nimeltä Dumaresq, jonka Itävallan keisari palkitsi kultaisella '
        + 'nuuskarasialla, kannessa timanteista tehdyt nimikirjaimet. '
        + 'Basilikan päältä ne siirrettiin sisälle vasta 1980-luvun '
        + 'alussa, kun ilmansaasteet olivat alkaneet syödä pintaa, ja '
        + 'ulos nostettiin kopiot. Ja tässä on se kohta, jonka isoisäsi '
        + 'olisi kirjannut ylös kahdesti: kun seosta lopulta mitattiin, '
        + 'siinä oli vähintään 96,67 prosenttia kuparia. Ne eivät siis ole '
        + 'pronssihevosia lainkaan vaan kuparihevosia, ja juuri se teki '
        + 'valamisesta vaikeaa — vähän tinaa tarkoittaa kuumaa uunia, '
        + 'tässä tapauksessa tuhatkaksisataa astetta tai enemmän. '
        + 'Iästä ei ole yksimielisyyttä: toiset pitävät niitä roomalaisina, '
        + 'toiset kreikkalaisina ja kolmesataa vuotta vanhempina. Yksi '
        + 'asia niistä silti tiedetään varmasti. Selät ovat lyhyet ja '
        + 'jalat pitkät, mikä tarkoittaa, että ne on veistetty '
        + 'katsottaviksi alhaalta ylöspäin — ne on tehty seisomaan '
        + 'korkealla jossain, kauan ennen kuin kukaan tiesi mitään '
        + 'Venetsiasta.',
      /*
       * Commons 29.8.2026: 3859×2737, public domain, tekijä Tteske
       * (johdannainen: Morn), kuvattu 17.5.2011, kuvaus "Original
       * Horses Inside Basilica San Marco". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px: neljä pronssihevosta hämärässä
       * holvissa, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Horses of Basilica San Marco bright.jpg',
        selite: 'Alkuperäiset hevoset basilikan sisällä: kaulapannat '
          + 'lisättiin 1204 peittämään kohdat, joista päät katkaistiin '
          + 'kuljetusta varten.',
        lahde: 'Tteske, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi hevosten kaulaan pantiin pannat vuonna 1204?',
        vaihtoehdot: [
          'Ne kuuluivat alun perin valjaisiin, joita ei ole enää tallella',
          'Ne peittävät kohdat, joista päät katkaistiin kuljetusta varten',
          'Ne merkitsivät hevoset dogen omaisuudeksi kuten karjan korvamerkit',
        ],
        oikea: 1,
        fakta: 'Hevoset seisoivat sitä ennen Konstantinopolin '
          + 'hippodromilla, ja basilikan parvekkeelle ne pystytettiin '
          + '1254. Napoleon vei ne Pariisiin 1797, ja ne palautettiin '
          + 'Venetsiaan 1815.',
      },
    },
    {
      /*
       * 1873-ANKKURI: ITÄVALLALTA ITALIALLE 1866.
       *
       * MIKSI TÄMÄ TÄKY: isoisä kirjoittaa kesäkuussa 1873 kaupungista,
       * joka oli ollut Italiaa vasta seitsemän vuotta — eikä mainitse
       * sitä sanallakaan. Täky on siitä, mitä hän ei kirjoittanut.
       *
       * SOTAA EI KERROTA (Perustuslaki ja tarinakaari luku 2: ei
       * sotasisältöä). Vuosi 1866 oli sotavuosi, ja artikkelit kertovat
       * siitä pitkästi; tämä täky ei kerro yhtäkään taistelua. Kerrotut
       * asiat ovat luovutus sopimuksella, äänestys, laskenta ja luvut.
       *
       * FAKTAT (en-Wikipedia "Plebiscite of Veneto of 1866", johdanto
       * sekä osiot Prahan rauhasta, äänestyksestä, naisten äänistä ja
       * tuloksista, sekä "Kingdom of Lombardy–Venetia", johdanto;
       * haettu 29.8.2026):
       *   - Venetsia kuului Itävallan keisarikuntaan vuodesta 1815
       *     Lombardia–Venetsian kuningaskunnan osana;
       *   - Prahan rauhassa 23.8.1866 Itävalta luovutti alueen
       *     Ranskalle sillä ehdolla, että Napoleon III luovuttaa sen
       *     Viktor Emanuel II:lle sen jälkeen kun väestöltä on kysytty;
       *   - äänestys pidettiin sunnuntaina 21. ja maanantaina 22.
       *     lokakuuta 1866 Venetsian maakunnissa ja Mantovassa;
       *   - äänet laskettiin 27. lokakuuta dogen palatsin
       *     laskuhuoneessa (Sala dello Scrutinio), ja tulos luettiin
       *     ensin salissa ja sitten palatsin parvekkeelta;
       *   - osa Rovigon piirin kuntien äänistä (5 339 puolesta, ei
       *     yhtään vastaan, yksi hylätty) ja 149 siirtolaisen ääntä oli
       *     jäänyt laskematta, joten muutoksenhakutuomioistuin joutui
       *     korjaamaan tuloksen istunnossaan 31. lokakuuta 1866;
       *   - julkaistut luvut eroavat toisistaan: Padovan Piazza delle
       *     Erben laatassa on tuomioistuimen lopullinen luku 647 246
       *     puolesta ja 69 vastaan, dogen palatsin laskusalin
       *     käytävässä olevassa laatassa 641 758 puolesta, 69 vastaan
       *     ja 273 hylättyä eli yhteensä 642 100 äänestäjää;
       *   - naisilla ei ollut äänioikeutta, mutta Venetsiassa,
       *     Padovassa, Dolossa, Miranossa ja Rovigossa he halusivat
       *     silti äänestää, ja Mantovassa kerättiin noin 2 000 naisen
       *     ääntä erillisiin uurniin; venetsialaisnaiset lähettivät
       *     kuninkaalle kirjelmän, jossa sanoivat, ettei heidän
       *     sukupuolensa ollut koskaan tuntenut lain katkeruutta
       *     syvemmin kuin tässä tilanteessa.
       */
      id: 'plebiskiitti',
      nappi: 'Äänestys, jonka luvuista ei päästy yksimielisyyteen',
      otsikko: 'Lokakuu 1866',
      teksti: 'Kun isoisäsi käveli täällä, kaupunki oli ollut Italiaa '
        + 'seitsemän vuotta. Sitä ennen se oli ollut Itävallan '
        + 'keisarikunnan osa vuodesta 1815 asti, ja vaihdos tapahtui '
        + 'papereilla: elokuussa 1866 Itävalta luovutti alueen Ranskalle '
        + 'sillä ehdolla, että Ranska luovuttaa sen Italian kuninkaalle '
        + 'sitten kun asukkailta on kysytty. Kysyminen tapahtui '
        + 'sunnuntaina 21. ja maanantaina 22. lokakuuta 1866. Äänet '
        + 'laskettiin viikkoa myöhemmin dogen palatsin laskuhuoneessa, ja '
        + 'tulos luettiin ensin salissa ja sitten palatsin parvekkeelta. '
        + 'Sen jälkeen alkoi se osa, joka olisi pitänyt isoisäsi hereillä. '
        + 'Kaikkia ääniä ei ollut ehditty laskea: Rovigon piirin kunnista '
        + 'puuttui yli viisituhatta ääntä ja siirtolaisilta '
        + 'sataneljäkymmentäyhdeksän, ja tuomioistuin joutui korjaamaan '
        + 'tuloksen uudestaan 31. lokakuuta. Niinpä kaupungissa on '
        + 'muistolaattoja, joissa lukee eri luvut. Padovassa laatta '
        + 'kertoo 647 246 ääntä puolesta ja 69 vastaan. Dogen palatsissa, '
        + 'laskusalin käytävässä, laatassa lukee 641 758 puolesta, 69 '
        + 'vastaan ja 273 hylättyä. Sama äänestys, samat kivet, eri '
        + 'summat. Ja yksi joukko ei ollut luvuissa lainkaan: naiset '
        + 'eivät saaneet äänestää. Venetsiassa, Padovassa, Dolossa, '
        + 'Miranossa ja Rovigossa he tulivat silti paikalle, Mantovassa '
        + 'heidän äänensä otettiin vastaan erillisiin uurniin — noin '
        + 'kaksituhatta kappaletta, jotka eivät laskeneet mitään. '
        + 'Venetsialaisnaiset lähettivät kuninkaalle kirjelmän, jossa he '
        + 'kirjoittivat, ettei heidän sukupuolensa ollut koskaan tuntenut '
        + 'lain katkeruutta syvemmin kuin sinä lokakuuna.',
      /*
       * Commons 29.8.2026: 3000×2218, public domain, tekijät Gustave
       * Janet ja Raffaele Pontremoli, julkaistu Le Monde Illustré
       * 3.11.1866, kuvaus "Votazioni a Venezia per il plebiscito di
       * annessione al Regno d'Italia". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px: aikalaispuupiirros, jossa
       * väkijoukko kulkee äänestyspaikalle; kuvatekstin mukaan Markuksen
       * kaupunginosan neljännen äänestysalueen asukkaita matkalla
       * Ateneoon. Ei valokuvattuja eikä tunnistettavia nykyihmisiä.
       */
      kuva: {
        tiedosto: 'Le Monde Illustré 1866 - Votazioni a Venezia.jpg',
        selite: 'Le Monde Illustrén puupiirros marraskuulta 1866: '
          + 'Markuksen kaupunginosan asukkaat kulkevat lippurivistössä '
          + 'äänestyspaikalle Ateneoon.',
        lahde: 'Gustave Janet Raffaele Pontremolin luonnoksen mukaan, '
          + 'Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Miksi vuoden 1866 äänestyksen tuloksesta on olemassa '
          + 'useampi kuin yksi virallinen lukema?',
        vaihtoehdot: [
          'Ääniä laskettiin yhdeksässä maakunnassa eri päivinä ja eri tavoin',
          'Itävalta ja Italia julkaisivat kumpikin omat lukunsa',
          'Osa äänistä jäi ensin laskematta ja tulos korjattiin',
        ],
        oikea: 2,
        fakta: 'Äänestys pidettiin 21.–22. lokakuuta 1866 ja äänet '
          + 'laskettiin dogen palatsissa 27. lokakuuta. Padovan laatassa '
          + 'lukee 647 246 puolesta ja 69 vastaan, dogen palatsin '
          + 'laatassa 641 758 puolesta.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: koko peli on isoisän mukanaan kantaman kirjan
       * varassa, ja mukana kannettava kirja keksittiin tässä
       * kaupungissa. Täky on siis kaaren oma esine toisesta päästä —
       * eikä se toista mitään kaupunkilehden kahdestatoista nostosta.
       *
       * FAKTAT (en-Wikipedia "Aldus Manutius", johdanto sekä osiot
       * "Aldine Press", "Imprint and motto", "Enchiridia" ja
       * "Typefaces"; haettu 29.8.2026):
       *   - Aldo Manuzio asettui Venetsiaan 1490; Aldine Press
       *     perustettiin 1494 ja sen ensimmäinen julkaisu ilmestyi
       *     maaliskuussa 1495 (Constantine Lascariksen kreikan
       *     oppikirja);
       *   - 1400-luvulla kirjat olivat usein ketjutettuja lukupulpettiin,
       *     ja klassikoihin painettiin selitykset mukaan, jolloin niteet
       *     paisuivat raskaiksi;
       *   - Manuzio kutsui uutta kokoaan nimellä "libelli portatiles in
       *     formam enchiridii" eli kannettavat pikkukirjat käsikirjan
       *     muodossa; hän siirtyi pieneen kokoon 1501 Vergiliuksella;
       *     oktaavot olivat noin viisi kertaa kahdeksan tai neljä kertaa
       *     kuusi tuumaa ja ne painettiin ilman selityksiä;
       *   - kirjasimen leikkasi bolognalainen Francesco Griffo
       *     jäljitellen aikalaisten käsialaa; se on ensimmäinen tunnettu
       *     kursiivi, ja vuoden 1501 Vergilius oli ensimmäinen
       *     kokonaan sillä painettu kirja; Griffon kursiivissa ei ollut
       *     suuraakkosia;
       *   - hinnat: latinankielinen oktaavo 30 soldia eli neljännes
       *     dukaattia, kreikankielinen 60 soldia; mestarimuurari ansaitsi
       *     noin 50 soldia päivässä;
       *   - kesäkuusta 1502 painomerkkinä oli ankkurin ympärille
       *     kiertynyt delfiini ja tunnuslauseena festina lente,
       *     "kiiruhda hitaasti"; kuva ja lause olivat peräisin
       *     roomalaisesta Vespasianuksen aikaisesta kolikosta, jonka
       *     Pietro Bembo antoi hänelle.
       */
      id: 'aldus',
      nappi: 'Kirja, joka mahtui ensimmäistä kertaa taskuun',
      otsikko: 'Aldon painokone',
      teksti: 'Tässä kaupungissa keksittiin se, mitä isoisäsi kantoi '
        + 'takintaskussaan. Aldo Manuzio muutti Venetsiaan 1490 ja '
        + 'perusti painonsa 1494; ensimmäinen kirja ilmestyi seuraavana '
        + 'keväänä. Siihen aikaan kirja oli huonekalu. Klassikoihin '
        + 'painettiin selitykset tekstin ympärille, niteestä tuli painava, '
        + 'ja kirjastoissa kirjat oli usein ketjutettu pulpettiin kiinni — '
        + 'lukija ei liikkunut, kirja liikkui vielä vähemmän. Manuzio '
        + 'käänsi asetelman ympäri. Hän jätti selitykset pois, pienensi '
        + 'sivun noin postikortin kokoiseksi ja kutsui tulosta latinaksi '
        + 'kannettaviksi pikkukirjoiksi. Vuonna 1501 hän painoi tässä '
        + 'koossa Vergiliuksen. Sitä varten hän tilasi bolognalaiselta '
        + 'Francesco Griffolta kirjasimen, joka jäljitteli käsialaa ja '
        + 'vei siksi vähemmän tilaa riviltä: se on ensimmäinen tunnettu '
        + 'kursiivi, ja se oli niin kiireellä tehty, ettei siinä ollut '
        + 'lainkaan suuraakkosia. Halpa kirja ei silti ollut. '
        + 'Latinankielinen nide maksoi kolmekymmentä soldia eli '
        + 'neljänneksen dukaatista, kreikankielinen kaksi kertaa sen, ja '
        + 'mestarimuurari tienasi viisikymmentä soldia päivässä. Ostajan '
        + 'sai silti, koska tavara oli uutta lajia: kirjan pystyi ottamaan '
        + 'mukaan. Kesäkuusta 1502 alkaen jokaisessa niteessä oli sama '
        + 'merkki, ankkurin ympärille kiertynyt delfiini, ja sen vieressä '
        + 'kaksi sanaa: festina lente. Kiiruhda hitaasti. Se on kaiverrettu '
        + 'roomalaiseen kolikkoon kauan ennen Venetsiaa, ja se on '
        + 'suunnilleen ainoa matkaohje, jota isoisäsi ei koskaan '
        + 'noudattanut.',
      /*
       * Commons 29.8.2026: 1211×2000, CC0, kuvaus "Page from the
       * pocket-sized edition of Virgil printed by Aldus Manutius, the
       * first book printed with an italic typeface. Venice, 1501.
       * British Library C.19.f.7." Restrictions tyhjä. SILMÄTARKISTUS
       * tehty 960 px: kirjan sivu, jonka reunat on koristeltu käsin
       * maalatuin kuvioin; tekstissä näkyy kursiivi. Reunuksessa on
       * maalattu profiilikuva, ei valokuvattua ihmistä.
       */
      kuva: {
        tiedosto: 'Page from the edition of Virgil printed by Aldus Manutius in 1501.jpg',
        selite: 'Sivu Aldo Manuzion vuonna 1501 painamasta '
          + 'taskukokoisesta Vergiliuksesta, ensimmäisestä kokonaan '
          + 'kursiivilla painetusta kirjasta; tämän kappaleen reunukset on '
          + 'maalattu käsin.',
        lahde: 'British Library, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mikä oli Aldo Manuzion pienen kirjakoon tärkein '
          + 'seuraus?',
        vaihtoehdot: [
          'Kirjan sai ensimmäistä kertaa mukaan matkalle',
          'Sivut voitiin sitoa nahkakansien sijasta pahviin',
          'Painokone tarvitsi puolet vähemmän väriä kuin ennen',
        ],
        oikea: 0,
        fakta: 'Manuzio siirtyi pieneen kokoon 1501 Vergiliuksella, ja '
          + 'sitä varten Francesco Griffo leikkasi ensimmäisen kursiivin. '
          + 'Painomerkkinä oli vuodesta 1502 delfiini ja ankkuri.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * POHJUSTAA KOHTAAMISEN KYSYMYKSEN, joka Venetsiassa on tarinakaaren
   * paketin oma (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'venetsia'):
   * *"Miksi ruttolääkärin naamiossa on pitkä linnunnokka?"* → nokkaan
   * pantiin yrttejä, joiden uskottiin suojaavan taudilta.
   *
   * VISASÄÄNTÖ TÄYTTYY, JA SE ON TÄSSÄ TARKISTETTU RIVI RIVILTÄ.
   * Oppitunti ei mainitse naamiota, nokkaa eikä yrttejä. Se kertoo
   * karanteenin synnyn ja sen uskomuksen, jonka varassa koko järjestely
   * lepäsi: tauti kulkee ilmassa, ja ilmaa vastaan taistellaan savulla
   * ja väkevällä hajulla. Sen jälkeen kysymykseen on kaksi tietä —
   * päätellä tai arvata — ja juuri se on tarinakaaren luvun 6 kohdan 6
   * tarkoittama raja.
   *
   * MIKSI OPPITUNTI EI TOISTA LEHTEÄ: kaupunkilehden kolme sivua
   * käsittelevät puupaaluja, acqua altaa, MOSEa, Muranon lasia ja
   * gondolia; rutosta lehdessä on vain kaksi kuvatekstiä (Santa Maria
   * della Salute rakennettiin kiitokseksi vuoden 1630 ruton
   * päättymisestä). Karanteenisaarista, neljästäkymmenestä päivästä ja
   * kirjeiden savustuksesta ei ole pelissä riviäkään.
   *
   * FAKTAT (en-Wikipedia "Lazzaretto Vecchio" johdanto sekä osiot
   * "Founding", "Medical History", "Effectiveness" ja "Archeology";
   * "Lazaretto" johdanto ja "Etymology"; "Quarantine" osio "Etymology
   * and terminology"; "Disinfected mail" johdanto; kaikki haettu
   * 29.8.2026):
   *   - vuoden 1423 ruttoaallon aikana doge Francesco Foscari pani
   *     Signori di Notte -ryhmän kirjaamaan päivittäiset ruttokuolemat
   *     ja raportoimaan ne Signorialle; kun päiväluku ylitti neljäkymmentä,
   *     Foscari esitti senaatille kiellon päästää kaupunkiin tulijoita
   *     tartunta-alueilta sekä karanteenisairaalan perustamista;
   *   - saari Santa Maria di Nazareth muutettiin karanteenipaikaksi ja
   *     sen kirkko sairaalaksi lokakuusta 1423; täydessä toiminnassa
   *     tammikuussa 1424, ja 1429 lisättiin 80 huonetta;
   *   - laivat ja lasti hangattiin ja savustettiin, ja miehistö vietti
   *     saarella neljäkymmentä päivää; saaren nimestä Nazareth on
   *     kiertoteitse peräisin sana lazaretti (siirtymään vaikutti
   *     todennäköisesti tapa omistaa spitaalisairaaloita pyhälle
   *     Lasarukselle);
   *   - Venetsia ei ollut ensimmäinen: Ragusan tasavalta (nykyinen
   *     Dubrovnik) määräsi jo 1377 kolme saarta tartunta-alueilta
   *     tulevien kolmenkymmenen päivän eristykseen (trentino);
   *   - sana karanteeni tulee venetsialaisesta sanasta quarantena,
   *     neljäkymmentä päivää, ja 1468 perustettu Lazzaretto Nuovo otti
   *     hoitaakseen saapuvat miehistöt;
   *   - neljäkymmentä päivää ylitti ruton itämisajan (2–6 vuorokautta)
   *     ja riitti tappamaan suurimman osan matkaajien mukanaan tuomista
   *     kirpuista, joten järjestely toimi osittain — vaikka syytä ei
   *     tunnettu; ruttoaallot palasivat silti 1575 ja 1630;
   *   - kirjeitä käsiteltiin samalla logiikalla: kuoreen puhkaistiin
   *     pieniä reikiä usein ruudukkona tai siitä leikattiin kulma pois,
   *     jotta savu pääsisi sisään, ja Välimeren satamissa kuten
   *     Venetsiassa posti savustettiin tai kasteltiin etikassa;
   *   - vuodesta 2004 saarelta on kaivettu esiin yli 1 500 ruttoon
   *     kuolleen luurankoa 1400–1600-luvuilta.
   */
  oppitunti: {
    otsikko: 'Neljäkymmentä päivää ja reiällinen kirje',
    teksti: 'Vuonna 1423 Venetsia teki jotain, mitä kaupungit tekevät '
      + 'harvoin: se alkoi laskea. Doge Francesco Foscari pani erään '
      + 'virkamiesryhmän kirjaamaan ylös, kuinka moni kuoli ruttoon joka '
      + 'päivä, ja raportoimaan luvun eteenpäin. Kun päivän luku ylitti '
      + 'neljänkymmenen, kaupunki kielsi tulijat tartunta-alueilta ja '
      + 'perusti laguuniin karanteenisaaren. Paikaksi tuli '
      + 'Santa Maria di Nazarethin saari, jonka kirkko muutettiin '
      + 'sairaalaksi; kuusi vuotta myöhemmin siihen jouduttiin lisäämään '
      + 'kahdeksankymmentä huonetta lisää. Saaren nimi kului suussa niin, '
      + 'että siitä tuli sana lazaretti. Järjestely oli yksinkertainen ja '
      + 'armoton: laiva ja lasti hangattiin ja savustettiin, ja miehistö '
      + 'jäi saarelle neljäksikymmeneksi päiväksi. Venetsian murteen sana '
      + 'neljällekymmenelle on quarantena — siitä on peräisin karanteeni. '
      + 'Keksintö ei ollut kokonaan venetsialainen: Ragusa oli varannut jo '
      + '1377 kolme saarta kolmenkymmenen päivän eristykseen, ja Venetsia '
      + 'lisäsi kymmenen päivää päälle. Tässä on se kohta, joka tekee '
      + 'tarinasta oudon. Neljäkymmentä päivää ei perustunut mihinkään, '
      + 'mitä kukaan olisi voinut mitata — ruton itämisaika on kahdesta '
      + 'kuuteen vuorokautta — mutta se oli tarpeeksi pitkä aika '
      + 'tappamaan suurimman osan matkaajien mukana tulleista kirpuista. '
      + 'Kaupunki teki oikean asian väärästä syystä. Se uskoi, että tauti '
      + 'kulkee ilmassa ja että ilmasta saa sen pois savulla ja väkevällä '
      + 'hajulla, ja tästä uskosta seurasi kaikki muukin. Jopa kirje oli '
      + 'epäilty: kuoreen puhkaistiin pieni ruudukko reikiä tai siitä '
      + 'leikattiin kulma pois, jotta savu pääsisi paperin väliin, ja '
      + 'Venetsian kaltaisissa satamissa posti savustettiin tai kasteltiin '
      + 'etikkaan ennen kuin sen sai lukea. Venetsia ei tiennyt, mistä '
      + 'tauti tuli. Se tiesi vain sen, minkä se pystyi itse laskemaan: '
      + 'päiviä, laivoja ja kuolleita päivässä.',
    /*
     * Commons 29.8.2026: 4896×1926, CC BY-SA 4.0, tekijä Abxbay,
     * kuvattu 19.7.2021, kuvaus "Lazzaretto Vecchio (Venice)".
     * Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px: matala saari
     * laguunissa, muuri ja pari rakennusta, ei ihmisiä.
     */
    kuva: {
      tiedosto: 'P1030629 Lazzaretto Vecchio (Venice) 01.jpg',
      selite: 'Lazzaretto Vecchion saari laguunissa Lidon lähellä: '
        + 'vuodesta 1423 sinne eristettiin ruttoon sairastuneet, ja '
        + 'saaren nimestä on peräisin sana lazaretti.',
      lahde: 'Abxbay, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * HAHMO ON KAANONIA, TEKSTI EI. Naamiontekijä Lucia on tarinakaaren
   * paketissa (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'venetsia'):
   * paja kolmannessa polvessa, tilauskirjassa vuosi 1873 ja
   * nimikirjaimet H. F. Alla oleva kortti on ESITTELY samasta
   * ihmisestä eikä uusi hahmo — mutta lauseet ovat tämän paketin omia,
   * ja siksi lohko on merkitty katselmoitavaksi. Kaaren repliikkiä ei
   * kerrata (tarinakaari luku 5: sama tarina kerrotaan kerran).
   *
   * VARSINAINEN KYSYMYS on ennallaan kaaren paketissa (ruttolääkärin
   * naamion nokka), eikä tämä paketti kosketa sitä.
   *
   * KAAVA (aallon 4B tilaus): suvun jatkumo + epäusko +
   * portinvartijakysymys.
   *   - JATKUMO: sama työtapa ja sama tilauskirja kolmessa polvessa.
   *   - EPÄUSKO: Lucia pitää suvun juttuja enimmäkseen satuna. Tämä on
   *     tarinakaaren luvun 3 ääniprofiili "epäuskoinen — sukuni tarina
   *     on minusta satua, mutta vihko on tässä".
   *   - PORTINVARTIJAKYSYMYS: hän haluaa tietää, ymmärtääkö tulija,
   *     mitä vastaan naamio oli tehty. Muotoilu on tarkoituksella
   *     sellainen, ettei se karsi yhtäkään neljästä vaihtoehdosta:
   *     kaikki neljä liittyvät samaan tautiin.
   *
   * VARALLISUUSSÄÄNTÖ tarkistettu virke virkkeeltä: isoisä ei maksa
   * mitään, ei tilaa vuosisataista järjestelyä eikä käske ketään.
   * Tilauskirja on pajan oma työkalu, ja syy sen säilyttämiseen on
   * ammatti eikä velvoite.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortissa on vain hahmo,
   * nappi ja teksti.
   *
   * VIHJEOSIOTA EI OLE. `vihjeOsio` avaa lehden siihen osioon, josta
   * ratkaisun tuki löytyy (omistajan pelitestipalaute v1119, kohta 13).
   * Venetsian lehden kolme osiota ovat 'kaupunki', 'rakennukset' ja
   * 'kasityo', eikä yksikään niistä käsittele ruttoa tai naamioita —
   * rivi lupaisi tukea, jota sivulla ei ole. Puuttuva kenttä on
   * moottorille kelvollinen (js/fokusvirta.js lukee sen varovasti).
   */
  kohtaaminen: {
    hahmo: 'Naamiontekijä Lucia',
    nappi: 'Tapaa naamiontekijä',
    varmistus: 'Haluatko varmasti tavata Lucian juuri nyt?',
    teksti: 'Lucian pajassa naamiot tehdään yhä samalla tavalla kuin '
      + 'hänen isoisänsä aikaan: paperimassa muottiin, kuivumaan, sitten '
      + 'maali käsin. Hyllyllä on tilauskirja, jonka vanhimmat sivut ovat '
      + '1800-luvulta ja jossa on kymmeniä nimikirjaimia, ja jokaisesta '
      + 'niistä on aikanaan kerrottu pajassa oma tarinansa. Lucia sanoo '
      + 'suoraan pitävänsä useimpia niistä satuina — hän on kuullut ne '
      + 'lapsena eikä usko puoltakaan. Kirjan hän on silti pitänyt, ja '
      + 'lukee sitä pyydettäessä ääneen. Ennen kuin hän kaivaa esiin sen '
      + 'sivun, jota tulija tulee kysymään, hän haluaa tietää, ymmärtääkö '
      + 'tämä lainkaan, mitä vastaan pajan vanhin naamio oli aikoinaan '
      + 'tehty.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin muissakin fokuskaupungeissa.
   */

  /*
   * KOHTAAMISPAIKKA: CAMPO SAN POLO.
   *
   * MIKSI TÄMÄ AUKIO: kohtaaminen tapahtuu naamiopajassa, ja pajat ovat
   * San Polon sestierissä; Campo San Polo on sen suurin aukio ja ainoa
   * paikka lähistöllä, jolle Wikipediassa on omat koordinaatit. Piste ei
   * osoita Rialton laiturille, koska siellä seisoo jo pelin vanhan polun
   * gondolieeri Matteo (js/packs/kohtaamiset.js, venetsia) — kaksi eri
   * kohtaamista samalla laiturilla olisi kartalla sekaannus.
   *
   * 45,4375 N / 12,3299 E — en-Wikipedia "Campo San Polo",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((12,3299 − (−175)) mod 360) × (12000/360)
   *                     = 187,3299 × 33,3333… = 6244,3
   *                   y = (millerY(45,4375) − millerY(76)) × 12000/2π
   *                     = 1583,7
   *   europe          x = (12,3299 + 11) × 19,2 = 447,9
   *                   y = (72 − 45,4375) × 26,3 = 698,6
   *
   * TARKISTUS VENETSIAN LAATTAA VASTEN: laatta on Euroopan laudalla
   * 448 / 698 (js/packs/europe.js) ja maailmankartalla 6248,4 / 1582,8
   * (js/packs/maailmankartta.js). Piste jää siis laudalla alle yhden ja
   * maailmankartalla noin neljän yksikön päähän laatasta — juuri niin
   * kuin pitääkin, sillä aukio on vanhankaupungin keskellä. Piirtopuoli
   * hoitaa erotuksen itse: alle 14 yksikön päässä laatasta piste
   * siirretään koilliseen (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Campo San Polo',
    laudat: {
      maailmankartta: { x: 6244.3, y: 1583.7 },
      europe: { x: 447.9, y: 698.6 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Sivupino syntyy js/lehti.js
   * rakennaSivut -funktiossa: sivuja on 1 + kategorioiden määrä, jossa
   * indeksi 0 on etusivu ja loput kategoriat järjestyksessä. Venetsian
   * kategoriat ovat 'kaupunki', 'rakennukset' ja 'kasityo' (js/packs/
   * kulttuuri-kategoriat.js), ja perään liitetään Italian
   * Menovinkit-sivu (js/packs/maa-kategoriat.js, ITA). Pino on siis:
   * 0 = etusivu, 1 = kaupunkisivu "Venetsia", 2 = "Kaupunki veden
   * varassa", 3 = "Käsityö", 4 = Menovinkit.
   *
   * MIKSI 3 JA 4 — JA MIKÄ SIINÄ ON HINTANA.
   *   - SIVU 1 on jo täynnä: Venetsialla on kulttuurivisa (js/packs/
   *     europe-kulttuuri.js, Vivaldin Neljä vuodenaikaa), ja
   *     js/fokustehtavat.js pukee sen samaksi AARTEEN AVAUS -laatikoksi
   *     ilman omaa riviään täällä. Oma rivi tekisi sivulle kaksi
   *     laatikkoa.
   *   - SIVU 2 on Venetsian tunnusomaisin lehtisivu, ja sen oma
   *     minitehtävä (miten kaupunki varoittaa kohoavasta vedestä)
   *     kytkeytyy suoraan kaanonin acqua alta -ankkuriin. Se jätetään
   *     rauhaan tarkoituksella.
   *   - SIVU 3 saa siis AARTEEN AVAUKSEN, ja se maksaa yhden asian:
   *     sivun oma minitehtävä (Muranon lasimestarien erikoisoikeus)
   *     väistyy nimetyn tieltä (js/fokustehtavat.js
   *     piirraSivunTehtava). Vaihtokauppa on tietoinen — kysymys ei
   *     katoa datasta, ja tilalle tulee saman sivun toisesta nostosta
   *     koottu kysymys, joka maksaa viisikymmentä puntaa kymmenen
   *     sijaan. Jos Fable haluaa Muranon kysymyksen takaisin näkyviin,
   *     ratkaisu on siirtää tämä rivi sivulle 2.
   *   - SIVU 4 (Menovinkit) on tyhjä ja saa JULISTEEN, kuten
   *     Madridissa, Sevillassa ja Roomassa.
   *
   * JULISTE ON OLEMASSA. js/packs/julisteet.js:ssä on `venetsia`-rivi
   * (tuotanto/tuot-venetsia.png), joten palkinto lunastuu oikeasti.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 3, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: GONDOLI_VISA,
    },
    {
      id: 'juliste', sivu: 4, otsake: 'JULISTE', palkinto: 'juliste', visa: OSOITE_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta.
   * Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta), ja voittaa kortissa sekä virran oman
   * merkinnän että vanhan saapumistekstin.
   */
  aarremerkinta: {
    teksti: 'Lasinpuhaltaja Muranossa sanoi, että tässä kaupungissa '
      + 'mikään ei katoa — se vain vajoaa. Kanaalien pohjassa makaa '
      + 'sormuksia, kolikoita ja vähintään yksi dogen sinetti, ja joka '
      + 'kuivatuksessa jotain nousee. Kaupunki joka seisoo veden päällä '
      + 'pitää aarteensa veden alla.',
  },
};
