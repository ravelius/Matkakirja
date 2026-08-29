/*
 * MARSEILLEN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4B.
 *
 * Sisartiedosto js/packs/fokusvirta-sevilla.js:lle ja js/packs/
 * fokusvirta-pariisi.js:lle: samat kentät, sama järjestys, sama moottori
 * (js/fokusvirta.js). Uusi kaupunki on yksi tiedosto ja yksi rivi
 * rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ PAKETTI EI KIRJOITA SITÄ
 * RIVIÄ eikä koske sw.js:ään, savukkeisiin tai mihinkään muuhun
 * tiedostoon: aallon 4B kaupungit kokoaa integrointiagentti yhtenä
 * nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4B kaanonpaperi, osio
 * MARSEILLE). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu — myös
 * pollo.tekstin kaksoispiste ".." on kaanonin oma kirjoitusasu ja jää
 * sellaisenaan. Luenta on sama teksti tunnetagein; yksikään sana ei
 * vaihdu.
 *
 * ISO AARRE: Ranskan kruununjalokivien safiiri — sama Ranskan aarre kuin
 * Pariisilla (aarremerkintä alla on Marseillen oma merkintä samasta
 * kivestä, ei Pariisin toisinto).
 *
 * FAKTAPOHJA. Kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `marseille`), ja Ranskan maalehti
 * samoin (js/packs/maa-kategoriat.js, FRA). Tämän paketin sisältö nojaa
 * kahteen lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Kaupunkilehden omat nostot
 *      (Gyptisin vesimalja, Ifin linnasaari, marseljeesi, bouillabaisse,
 *      navette) ja Ranskan maalehden nostot (saippuan luku 72,
 *      kiitoslahjat kirkon katossa). Nämä on jo kertaalleen tarkistettu
 *      ja hyväksytty peliin, ja molemmat lehtitehtävän visat on koottu
 *      niistä ilman yhtään uutta faktaväitettä.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 29.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli kerrallaan, ja jokainen väite on
 *      katsottu KAHDESTA riippumattomasta artikkelista. Kunkin kohdan
 *      oma kommentti nimeää ne. Mitään ei ole päätelty, pyöristetty eikä
 *      muistettu; kohdat, joissa lähteet eroavat, on merkitty näkyviin
 *      eikä eroa ole tasoitettu.
 *
 * ── VIISI LINJAUSTA, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ───────────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen (js/ui.js
 *      naytaFactValokuva saa nullin).
 *   2. ÄÄNITEKENTTÄÄ EI KIRJOITETA. Toisin kuin Sevillassa ja Roomassa,
 *      `matkakirja.aanite` jätetään pois (aallon 4B rajaus): kenttä on
 *      kytkentä generointiajoon, eikä sitä ole tälle erälle sovittu.
 *      Luenta on silti kirjoitettu valmiiksi, joten generointi voidaan
 *      ajaa koskematta tekstiin.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta; moottori
 *      lukee kentän varovasti (`data.valinta?.…`).
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA. Kohtaamisessa on siis
 *      vain hahmo, nappi, varmistus, vihjeOsio ja teksti.
 *   5. TÄKYNOSTOJA EI OLE. Ranskan pooli asuu Pariisin paketissa
 *      (js/packs/fokusvirta-pariisi.js `takynostot`, jonne se siirrettiin
 *      v1297:n maapoolista), ja js/fokusnosto.js nostoMaanPooli lukee
 *      maan poolin silloin kun kaupungilla ei ole omaa. Marseille näkee
 *      siis Ranskan yhteisen poolin — se on tarkoitus, ja siksi tässä
 *      tiedostossa EI ole `takynostot`-kenttää lainkaan. Oman poolin
 *      kirjoittaminen tänne kaappaisi FRA-poolin Marseillelta pois.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei toistu
 * siinä sellaisenaan (docs/moduulit/tarinakaari.md, luku 6). TÄSSÄ
 * PAKETISSA OIKEAN VAIHTOEHDON PAIKKA VAIHTELEE (aallon 4B tilaus):
 * täkyjen oikeat ovat indekseissä 0, 2 ja 1, lehtitehtävien 2 ja 1.
 * Moottori ei sekoita vaihtoehtoja (js/fokusvirta.js piirraTaky lukee
 * `oikea`-indeksin sellaisenaan), joten paikka on datan asia. Lisäksi
 * oikea EI ole pisin vaihtoehto yhdessäkään tämän tiedoston visassa —
 * se on tarinakaaren mittausvaatimus, ja se on tarkistettu käsin.
 *
 * ── SPOILERIHUOMIO, JONKA FABLE ON JO RATKAISSUT ───────────────────
 *
 * Marseillella ON tarinakaaren paketti (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, 'marseille' → js/packs/tarinakaari.js), ja sen
 * laattakysymys kuuluu: *"Ifin linnoitussaari Marseillen edustalla
 * tunnetaan kaikkialla yhden kirjan ansiosta. Minkä?"* — oikea vastaus
 * *Monte-Criston kreivin*. Tämän paketin haaralla kaanoninen
 * `pollo.teksti` sanoi saman asian sanoin *"se linnoitussaari on If,
 * jonne Dumas sijoitti Monte-Criston kreivin vankilan"*, eli vastaus oli
 * ruudulla ennen kysymystä, ja asia kirjattiin Fablelle.
 *
 * FABLE KORJASI KAANONIN KAHDESTI AALLON 4B INTEGROINNISSA (29.8.2026).
 * Ensimmäinen korjaus jätti saaren nimen vielä paikalleen, ja koska
 * js/packs/europe-questions.js:n `marseille`-lohkon viides
 * laattakysymys kysyy asian TOISIN PÄIN — *"Millä linnoitussaarella
 * Marseillen edustalla Monte-Criston kreivi istui vankina?"*, vastaus
 * *Ifin saarella* — havainto raportoitiin uudelleen. Sama koski keiton
 * nimeä: neljäs laattakysymys kysyy *"Mikä keitto on Marseillen
 * kuuluisin ruoka?"*, ja repliikki avasi sanalla *"bouillabaisse"*.
 *
 * TOINEN KORJAUS POISTI MOLEMMAT NIMET. Repliikki kiusoittelee nyt sekä
 * keitolla että saarella ja kirjalla: *"Sillä kalakeitolla on nykyään
 * kuuluisa nimi, jonka opit ihan kohta…"* ja *"Ja se linnoitussaari, ja
 * se kirja jonka takia koko maailma sen tuntee — molempien nimet saat
 * kaivaa esiin itse, ihan kohta."* Kumpikaan sana — *bouillabaisse* tai
 * *If* — ei enää esiinny tämän tiedoston kaanonkentissä. Virkkeet on
 * vaihdettu sanatarkasti päätoimittajan muodossa.
 *
 * TÄMÄ PAKETTI EI SYVENNÄ SPOILERIA. Yksikään täky, oppitunti eikä
 * lehtitehtävä ei koske Ifin saarta, Dumas'ta eikä Monte-Criston
 * kreiviä, ja kohtaamisluonnos viittaa kirjaan nimeämättä sitä.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 29.8.2026
 * (olemassaolo, koko, mime, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä, koska CC BY-SA vaatii maininnan. JOKAINEN on lisäksi
 * katsottu silmin 960 pikselin esikatseluna, ja havainto on kirjattu
 * kunkin kuvan omaan kommenttiin.
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma generoitu
 * havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi generointiajon,
 * jota tälle aallolle ei ole tehty. Sama ratkaisu kuin Sevillassa ja
 * Tukholmassa: yksi kuva per kortti, `tiedosto`-kenttä. Aiheet on
 * kirjattu raporttiin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa ja
 * Sevillassa: lista tiedoston lopussa lukee ne muuttujista, jolloin uusi
 * käyttö ei koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Kumpikin kysymys on Marseillen lehden
 * Ruoka-sivun omien nostojen tekstiä (js/packs/kulttuuri-kategoriat.js,
 * marseille/ruoka: "Bouillabaisse alkoi jätekalasta" ja "Keksi, joka on
 * veneen muotoinen"). Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI IF-KYSYMYSTÄ, vaikka lehdessä on siitä nosto: ks.
 * SPOILERIHUOMIO yllä. MIKSI EI MARSELJEESIKYSYMYSTÄ: se on jo Marseillen
 * kulttuurivisa (js/packs/europe-kulttuuri.js, marseille), jonka
 * js/fokustehtavat.js pukee sivun 1 AARTEEN AVAUS -laatikoksi ilman omaa
 * riviään täällä. Sama kysymys kahdessa laatikossa olisi tupla.
 */
const BOUILLABAISSE_VISA = {
  kysymys: 'Bouillabaisse on nykyään Marseillen kallein annos. Millaisesta '
    + 'saaliista se alun perin keitettiin?',
  vaihtoehdot: [
    'Torilta ostetuista tonnikaloista ja katkaravuista',
    'Ostereista, simpukoista ja muista äyriäisistä',
    'Kaloista, joita kukaan ei ostanut',
  ],
  oikea: 2,
  fakta: 'Kattilaan meni se osa saaliista, jota kukaan ei ostanut — '
    + 'piikikkäät rascasse-kalat ja muut ruman näköiset. Vuonna 1980 '
    + 'kaupungin ravintoloitsijat allekirjoittivat oman peruskirjansa '
    + 'siitä, mitä aitoon annokseen kuuluu.',
};

const NAVETTE_VISA = {
  kysymys: 'Kaupungin vanhimmassa leipomossa käy kerran vuodessa pappi. '
    + 'Mitä hän tulee tekemään?',
  vaihtoehdot: [
    'Vihkimään vuoden ensimmäisen taikinajuuren',
    'Siunaamaan uunin kynttilänpäivänä',
    'Ottamaan vastaan leipurin vuosittaisen lupauksen',
  ],
  oikea: 1,
  fakta: 'Rue Saintin leipomo avattiin vuonna 1781 ja on kaupungin vanhin. '
    + 'Pappi siunaa sen uunin kynttilänpäivänä 2. helmikuuta. Siellä '
    + 'paistetaan navetteja: appelsiininkukkavedellä maustettuja keksejä, '
    + 'joiden muoto on pikkuvene — juuri sitä sana navette tarkoittaa.',
};

export const FOKUSVIRTA_MARSEILLE = {
  kaupunki: 'marseille',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Marseille, syyskuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Vanha satama haisee kalalta, tervalta ja saippualta — täällä '
      + 'keitetään saippuaa, jota myydään koko maailmalle vihreinä '
      + 'harkkoina kuin kultaa. Laivoja tulee Afrikasta ja idästä; kanava '
      + 'Suezissa on tehnyt tästä kaupungista Ranskan portin itään. '
      + 'Kalliolla lahden suulla on linnoitussaari, josta eräs kirjailija '
      + 'teki vankilan kuuluisammaksi kuin yksikään vanginvartija. Söin '
      + 'illalla kalakeittoa, johon pantiin kaloja joiden nimiä en oppinut.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä.
     */
    luenta: '[curious] Vanha satama haisee kalalta, tervalta ja saippualta '
      + '— täällä keitetään saippuaa, jota myydään koko maailmalle '
      + 'vihreinä harkkoina kuin kultaa. [excited] Laivoja tulee Afrikasta '
      + 'ja idästä; kanava Suezissa on tehnyt tästä kaupungista Ranskan '
      + 'portin itään. [softly] Kalliolla lahden suulla on linnoitussaari, '
      + 'josta eräs kirjailija teki vankilan kuuluisammaksi kuin yksikään '
      + 'vanginvartija. [warmly] Söin illalla kalakeittoa, johon pantiin '
      + 'kaloja joiden nimiä en oppinut.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); kanoninen `teksti` seuraa
     * sen jälkeen.
     *
     * MIKSI SAIPPUA EIKÄ KEITTO, SATAMA TAI SAARI: kaanoninen `teksti`
     * ottaa heti perään kaikki kolme muuta (kalakeitto nimeämättä,
     * saippuan nykytila yhdellä lauseella, saari ja kirja nimeämättä),
     * ja oppitunti ottaa
     * Suezin. Merkinnän ensimmäinen virke — se haju ja ne vihreät harkot
     * — jää muuten kokonaan vastaamatta. Maadoitus vastaa siihen ja
     * luovuttaa vuoron keitolle viimeisellä virkkeellään, jotta kaanonin
     * avaus jatkaa suoraan siitä.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1 PAINOPISTE
     * REUNOILLA): lyhentymät ovat vain alussa ("Kääk") ja lopussa
     * ("mut", "tainnut"), keskellä sanat ovat auki; pronominit
     * kokonaisina; ei huutomerkkejä.
     *
     * FAKTAKURI: kolme väitettä, kaikki pelin omasta jo hyväksytystä
     * Ranska-aineistosta (js/packs/maa-kategoriat.js, FRA/arki, nosto
     * "Saippuassa lukee 72"). (1) Lokakuun 5. päivänä 1688 kuninkaan
     * asetus kielsi käyttämästä marseillelaiseen saippuaan rasvaa tai
     * voita. (2) Perinteinen kuutio painaa 600 grammaa. (3) Kylkeen
     * leimataan valmistajan nimi ja luku 72, joka kertoo öljyn osuuden
     * prosentteina.
     */
    maadoitus: 'Kääk. Se haju on yhä tallella, tosin nykyään enemmän '
      + 'saippuan kuin tervan puolella. Ja tässä isoisäsi osui: ne vihreät '
      + 'harkot olivat ihan oikeasti säädeltyä tavaraa. Kuninkaan asetus '
      + 'viideltä lokakuuta 1688 kielsi panemasta marseillelaiseen '
      + 'saippuaan rasvaa tai voita, ja kuution kylkeen leimataan vieläkin '
      + 'valmistajan nimi ja luku 72 — se kertoo öljyn osuuden '
      + 'prosentteina. Kuusisataa grammaa ja yksi luku, siinä koko takuu. '
      + 'Mut siitä keitosta hän ei tainnut ymmärtää puoliakaan.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan. Kaksi
     * pistettä ensimmäisen virkkeen lopussa on kaanonin oma kirjoitusasu.
     */
    teksti: 'Sillä kalakeitolla on nykyään kuuluisa nimi, jonka opit ihan '
      + 'kohta — sen verran sanon, että oikeaoppiset vaativat siihen '
      + 'vähintään neljää kalalajia.. '
      + 'Saippuaa keitetään yhä, tosin enemmän turisteille kuin '
      + 'maailmalle. Ja se linnoitussaari, ja se kirja jonka takia koko '
      + 'maailma sen tuntee — molempien nimet saat kaivaa esiin itse, '
      + 'ihan kohta. Vankia ei koskaan ollut, mut selli näytetään silti. '
      + 'Satamaan sitten.',
    /*
     * PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA (omistajan linjaus): tämä
     * on Marseillen avauskarusellin ensimmäinen generoitu hero
     * (js/packs/kulttuuri-kategoriat.js, marseille/avauskuvat). Se sopii
     * kaanonin viimeiseen virkkeeseen — "Satamaan sitten" — koska kuvassa
     * on juuri vanhan sataman suu: MuCEM ja Fort Saint-Jean kävelysillan
     * päissä. Selite on saman avauskuvan selite lyhennettynä yhdeksi
     * virkkeeksi; yksikään luku eikä nimi muutu.
     */
    kuva: {
      ampari: 'herokoe/hero-marseille-aamu.jpg',
      selite: 'MuCEM eli Euroopan ja Välimeren sivilisaatioiden museo '
        + 'avattiin 7. kesäkuuta 2013, ja kävelysilta yhdistää sen Ludvig '
        + 'XIV:n vuonna 1660 rakennuttamaan Fort Saint-Jeaniin.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * ELÄIN- JA LUONTOTÄKY (Raamatun linjaus: täkyihin myös
       * eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: aarremerkintä sanoo, että satama muistaa kaiken
       * mikä sen läpi kulkee mutta ei kerro mihin. Tämä on saman
       * rannikon vanhin muisti — ja se on nimenomaan meren alla. Isoisä
       * katsoi merta laivan kannelta; kaupungin vanhin kuva-arkisto on
       * kolmenkymmenenseitsemän metrin syvyydessä sen saman veden alla.
       *
       * FAKTAT (kaksi riippumatonta artikkelia, haettu 29.8.2026):
       *   - fr-Wikipedia "Grotte Cosquer" (johdanto sekä osiot
       *     "Découverte et historique" ja maalausten kuvaus): luola on
       *     Marseillessa Triperien kalliolahdessa pointe de la Voilen
       *     juurella cap Morgioun lähellä; ainoa ihmisen kuljettava
       *     sisäänkäynti on sifoni 37 metriä merenpinnan alla;
       *     viimeisten jääkausien aikaan Välimeren pinta oli 110–120
       *     metriä alempana ja rantaviiva kahdeksan kilometrin päässä,
       *     joten luolaan käveltiin kuivin jaloin; yli 517 kuvaa kahdelta
       *     kaudelta, gravettien (27 000 v. sitten) ja
       *     solutrean/epigravettien (19 000 v. sitten); 65 kämmenkuvaa,
       *     44 mustaa ja 21 punaista, tehty puhaltamalla väriä kalliota
       *     vasten painetun käden päälle; Chauvet'n luolan löytöön 1994
       *     asti Cosquerin kämmenet olivat maailman vanhimmat tarkasti
       *     ajoitettavat maalaukset; 177 eläintä, joista 63 hevosta, 28
       *     vuorikaurista, 17 hirvieläintä, 10 biisonia ja 7 alkuhärkää
       *     sekä 16 merieläintä: 9 hyljettä, 3 siivetöntä ruokkia,
       *     meduusoja, kaloja ja valaita; Henri Cosquer, Cassis'n
       *     ammattisukeltaja, löysi sisäänkäynnin 1985 ja maalaukset
       *     9. heinäkuuta 1991; luola on ollut historiallinen monumentti
       *     2. syyskuuta 1992 alkaen; sisäänkäynti on suljettu
       *     betonilohkareilla, eikä luola ole yleisölle avoin.
       *   - en-Wikipedia "Cosquer Cave" (johdanto sekä osiot
       *     "Description" ja "Prehistoric paintings"): samat luvut
       *     eläimistä, kämmenistä ja kausista; kulkutunneli 175 metriä
       *     pitkä; neljä viidesosaa luolasta on pysyvästi tai ajoittain
       *     veden alla, ja niiltä osin kalliotaide on tuhoutunut;
       *     jäljennös Cosquer Méditerranée avattiin 2022 Marseillen
       *     satamaan.
       *
       * LÄHTEET EROAVAT YHDESSÄ KOHDASSA, EIKÄ SITÄ OLE TASOITETTU:
       * fr sanoo "plus de 517 figurations", en "nearly 500 instances …
       * remain". Teksti sanoo siksi "yli viisisataa kuvaa" ja nimeää
       * samassa virkkeessä sen, että osa on tuhoutunut — kumpikin luku
       * mahtuu tähän muotoiluun.
       *
       * MITÄ EI KERROTA: syyskuun 1991 sukellusonnettomuus, jossa kuoli
       * kolme sukeltajaa. 13+ sallii vaaran, ja veden alla oleva ovi
       * kertoo sen jo itse; kuolemantapaus ei ole tämän täyn asia.
       */
      id: 'cosquer',
      nappi: 'Luola, jonka ovi on 37 metriä pinnan alla',
      otsikko: 'Cosquerin luola',
      teksti: 'Marseillen kalliolahtien joukossa on yksi, jonka pohjassa on '
        + 'ovi. Cap Morgioun kupeessa, pointe de la Voilen juurella, '
        + 'aukeaa kolmenkymmenenseitsemän metrin syvyydessä käytävä, joka '
        + 'nousee sataseitsemänkymmenenviiden metrin matkalla ylös ja '
        + 'päättyy ilmataskuun. Kuivalla kalliolla on maalauksia. Niitä '
        + 'ei ole tehty sukeltaen: viimeisten jääkausien aikaan Välimeren '
        + 'pinta oli toistasataa metriä nykyistä alempana ja rantaviiva '
        + 'kahdeksan kilometrin päässä ulompana, ja luolaan käveltiin '
        + 'kuivin jaloin. Sitten vesi nousi ja sulki oven. Sisällä on yli '
        + 'viisisataa kuvaa kahdelta eri kaudelta, ja se on vähemmän kuin '
        + 'niitä oli: neljä viidesosaa luolasta on veden alla, ja niistä '
        + 'osista maalaukset ovat hävinneet. Vanhempi kausi on '
        + 'kaksikymmentäseitsemäntuhatta vuotta vanha ja koostuu '
        + 'kämmenistä — kuusikymmentäviisi kappaletta, neljäkymmentäneljä '
        + 'mustaa ja kaksikymmentäyksi punaista, tehty painamalla käsi '
        + 'kalliota vasten ja puhaltamalla väri sen ympärille. Nuorempi '
        + 'kausi on kahdeksantuhatta vuotta myöhempi ja täynnä eläimiä: '
        + 'sataseitsemänkymmentäseitsemän kaikkiaan, ja niistä '
        + 'kuusikymmentäkolme on hevosia. Ja tässä on se kohta, joka '
        + 'isoisääsi kiinnostaisi eniten. Joukossa on kuusitoista '
        + 'merieläintä: yhdeksän hyljettä, meduusoja, kaloja ja kolme '
        + 'siivetöntä ruokkia — lentokyvytön merilintu, joka kuoli '
        + 'sukupuuttoon vasta 1800-luvulla. Sen kuva oli kallioseinällä '
        + 'kymmenentuhatta vuotta ennen kuin kukaan kirjoitti lajista '
        + 'riviäkään. Luolan löysi ammattisukeltaja Henri Cosquer vuonna '
        + '1985, mutta maalaukset huomattiin vasta heinäkuussa 1991. '
        + 'Yleisölle sinne ei pääse: sisäänkäynti on suljettu, ja '
        + 'Marseillen satamassa on sen sijaan jäljennös.',
      /*
       * Commons 29.8.2026: 4000×3000, image/jpeg, CC BY-SA 4.0, tekijä
       * Lu-xin, kuvattu 1.12.2017, kuvaus "Cap Morgiou with old
       * fortification buildings and the Calanque de la Triperie".
       * Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px:n
       * esikatselusta: valkoinen kalkkikiviniemi työntyy mereen, jyrkät
       * kalliot laskeutuvat suoraan veteen, etualalla kivikkoa ja
       * matalaa pensaikkoa. Ei ihmisiä eikä veneitä.
       *
       * MIKSI JUURI TÄMÄ KUVA: luolasta itsestään ei ole vapaata kuvaa,
       * ja kuvatekstin nimeämä Triperien kalliolahti on juuri se lahti,
       * jonka pohjassa ovi on. Kuva näyttää siis tarkalleen sen veden,
       * josta täky kertoo — ja sen, ettei pinnalla näy mitään.
       */
      kuva: {
        tiedosto: 'Cap-Morgiou.jpg',
        selite: 'Cap Morgiou ja Triperien kalliolahti Marseillen '
          + 'edustalla: Cosquerin luolan ainoa sisäänkäynti aukeaa tämän '
          + 'veden alla 37 metrin syvyydessä.',
        lahde: 'Lu-xin, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miksi Cosquerin luolan ainoa sisäänkäynti on nykyään '
          + 'meren alla?',
        vaihtoehdot: [
          'Merenpinta on noussut jääkauden jälkeen',
          'Luolan katto romahti ja päästi meren sisään',
          'Rannikko on vajonnut toistuvissa maanjäristyksissä',
        ],
        oikea: 0,
        fakta: 'Neljä viidesosaa luolasta on veden alla, ja niistä osista '
          + 'maalaukset ovat hävinneet. Jäljelle jääneistä eläinkuvista '
          + '63 esittää hevosta ja kolme siivetöntä ruokkia.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä on kartanpiirtäjä, joka mittaa kaiken.
       * Tämä on hänen matkansa varrelta se rakennus, joka on pelkkää
       * mittaa — kaltevuus, korkeus ja kivien paino — ja joka oli hänen
       * käydessään kaksikymmentäkuusi vuotta vanha ja täydessä käytössä.
       * Täky ei myöskään toista kaupunkilehteä: lehti mainitsee Palais
       * Longchampin vesitornina yhden avauskuvan selitteessä eikä kerro
       * kanavasta, akveduktista eikä syystä mitään.
       *
       * FAKTAT (kaksi riippumatonta artikkelia, haettu 29.8.2026):
       *   - fr-Wikipedia "Aqueduc de Roquefavour" (johdanto sekä osiot
       *     "Projet" ja "Travaux"): kivinen kaariakvedukti Ventabrenissa
       *     Arc-joen laakson yli; pituus 393 metriä, korkeus 82,65
       *     metriä; rakennettu 1841–1847 Jean François Mayor de
       *     Montricherin johdolla, apunaan William Fraisse; maailman
       *     korkein kiviakvedukti ja lähes kaksi kertaa Pont du Gardia
       *     korkeampi; töissä 5 000 työmiestä, joista 300 kivenhakkaajaa;
       *     jopa 15 tonnin lohkareet kahdesta Velaux'n louhimosta,
       *     kuljetettuna työmaalle yhdeksän kilometrin rautatietä pitkin,
       *     joka rakennettiin vain tätä varten; hanke lähti liikkeelle
       *     vuosien 1833 ja 1834 kuivuudesta ja koleraepidemiasta, ja
       *     pormestari Maximin-Dominique Consolat esitti 1835 kahdeksan-
       *     kymmenen kilometrin kanavaa Durance-joelta; toukokuussa 1847
       *     akvedukti valmistui ja 30. kesäkuuta 1847 Durancen vesi
       *     virtasi sen yli ensimmäisen kerran.
       *   - en-Wikipedia "Roquefavour Aqueduct" (johdanto sekä osio
       *     "History"): sama suunnittelija, samat vuodet 1841–1847, sama
       *     5 000 työmiestä ja 300 kivenhakkaajaa, sama päivä 30.6.1847,
       *     ja sama luonnehdinta maailman suurimmasta kiviakveduktista;
       *     ajatuksen esitti ensimmäisenä insinööri Adam de Craponne jo
       *     vuonna 1565.
       *   - Lisäksi fr-Wikipedia "Canal de Marseille" (johdanto ja osio
       *     "Origine") sekä fr-Wikipedia "Histoire de Marseille" (osio
       *     "Grands chantiers du XIXe siècle") kanavan syystä ja
       *     seurauksesta: vuonna 1834 Huveaune-joki antoi enää yhden
       *     litran vettä asukasta kohti päivässä; vuonna 1876 kaupungin
       *     321 000 asukkaalla oli vettä kolmekymmentä kertaa enemmän
       *     kuin ennen kanavaa; Palais Longchamp rakennettiin veden
       *     tulon muistoksi ja vihittiin elokuussa 1869.
       *
       * LÄHTEET EROAVAT KAHDESSA LUVUSSA, EIKÄ NIITÄ OLE TASOITETTU:
       * korkeus on fr 82,65 m ja en 83 m (teksti sanoo "kahdeksan-
       * kymmentäkolme metriä", joka on molempien sisällä pyöristettynä),
       * ja pituus on fr 393 m ja en 375 m — pituutta EI siksi mainita
       * tekstissä lainkaan. Myös monumenttiluokituksen vuosi eroaa (fr
       * 2005, en 2002), eikä sitä mainita.
       */
      id: 'roquefavour',
      nappi: 'Kolmikerroksinen silta, joka ei kanna ketään',
      otsikko: 'Roquefavourin akvedukti',
      teksti: 'Marseille on rakennettu meren viereen kukkuloiden syliin, '
        + 'eikä sen läpi kulje kunnollista jokea. Vuonna 1834 kaupungin '
        + 'oma puro antoi enää yhden litran vettä asukasta kohti '
        + 'päivässä, ja samana vuonna kaduilla kiersi kolera. Pormestari '
        + 'Maximin-Dominique Consolat teki päätöksen, joka kuulostaa '
        + 'mahdottomalta: vesi haetaan Durance-joesta kahdeksankymmenen '
        + 'kilometrin päästä, ja se tuodaan perille pelkällä painovoimalla '
        + '— ei pumppuja, vain kaltevuus. Ajatus ei ollut uusi, sillä '
        + 'insinööri Adam de Craponne oli esittänyt saman jo vuonna 1565, '
        + 'mutta nyt se tehtiin. Reitin pahin este oli Arc-joen laakso '
        + 'Ventabrenissa, ja sen yli rakennettiin vuosina 1841–1847 '
        + 'kolmikerroksinen kiviakvedukti, joka on yhä maailman korkein '
        + 'laatuaan: kahdeksankymmentäkolme metriä, eli lähes kaksi '
        + 'kertaa roomalaisten Pont du Gardin korkeus. Työmaalla oli '
        + 'viisituhatta miestä, joista kolmesataa oli kivenhakkaajia. '
        + 'Lohkareet painoivat parhaimmillaan viisitoista tonnia ja '
        + 'tulivat Velaux\'n louhimoista yhdeksän kilometrin rautatietä '
        + 'pitkin, joka rakennettiin pelkästään tätä työmaata varten ja '
        + 'purettiin sen jälkeen. Vesi virtasi sillan yli ensimmäisen '
        + 'kerran 30. kesäkuuta 1847. Isoisäsi käydessä kaupungissa '
        + 'akvedukti oli siis kahdenkolmatta vuoden ikäinen ja täydessä '
        + 'työssä. Se toimii edelleen, ja kaupungissa oli jo vuonna 1876 '
        + 'vettä kolmekymmentä kertaa enemmän henkeä kohti kuin ennen '
        + 'kanavaa. Veden tuloa juhlittiin rakentamalla sille palatsi: '
        + 'Palais Longchamp, vihittiin elokuussa 1869.',
      /*
       * Commons 29.8.2026: 4000×2672, image/jpeg, CC BY-SA 3.0, tekijä
       * Borvan53, kuvattu 19.10.2013, kuvaus "View of the Roquefavour
       * Aqueduct from north-west. In the background, the bridge of the
       * LGV Méditerranée crossing the Arc river." Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px:n esikatselusta: kolmikerroksinen
       * kaariakvedukti metsäisen laakson yli, alarinteessä mäntyjä ja
       * kalliota, taustalla laakso ja kaukainen rautatiesilta. Ei
       * ihmisiä.
       */
      kuva: {
        tiedosto: 'Aqueduc de Roquefavour 2013.JPG',
        selite: 'Roquefavourin akvedukti kantaa Durance-joen vettä '
          + 'Marseilleen Arc-joen laakson yli, ja se on kolmine '
          + 'kerroksineen maailman korkein kiviakvedukti.',
        lahde: 'Borvan53, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Miksi Marseille päätti 1830-luvulla hakea juomavetensä '
          + 'kahdeksankymmenen kilometrin päästä?',
        vaihtoehdot: [
          'Höyrykoneet ja saippuapadot veivät kaiken kaivoveden tehtaille',
          'Sataman laajennus päästi meriveden kaupungin vanhoihin kaivoihin',
          'Oma joki kuivui ja kolera kiersi',
        ],
        oikea: 2,
        fakta: 'Vuonna 1834 Huveaune-joki antoi enää litran vettä asukasta '
          + 'kohti päivässä. Vesi tuotiin perille pelkällä kaltevuudella, '
          + 'ja Arc-joen yli rakennettu akvedukti on yhä maailman korkein '
          + 'kivinen laatuaan.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: aarremerkinnän vanha merimies sanoo, että
       * satama muistaa kaiken mikä sen läpi kulkee mutta ei kerro mihin
       * se meni. Tämä on saman kaupungin toinen muisti ja päinvastainen:
       * seinä, jolle merimiehet ovat itse kirjanneet sen, mitä heille
       * tapahtui — ja joka kertoo sen kenelle tahansa, joka nostaa
       * katseensa.
       *
       * PÄÄLLEKKÄISYYS MAALEHDEN KANSSA ON TIETOINEN JA RAJATTU. Ranskan
       * maalehdessä on nosto "Laivat roikkuvat katossa" (js/packs/
       * maa-kategoriat.js, FRA/arki), joka kertoo tavan olemassaolosta:
       * merimiehet tuovat myrskystä selvittyään maalauksen tai
       * pienoismallin. Maalehti on eri lehti kuin kaupunkilehti, jonka
       * pelaaja lukee samassa kulussa (js/lehti.js rakennaSivut vie
       * kaupunkilehteen Ranskasta vain Menovinkit-sivun), ja tämä täky
       * kertoo nimenomaan sen, mitä maalehti EI kerro: miksi seinien
       * kokoelma on nuori, ja mitä muuta siellä on kuin haaksirikkoja.
       * KAUPUNKILEHDEN sivuihin ei ole päällekkäisyyttä lainkaan —
       * Marseillen lehti mainitsee basilikan vain kansikuvan selitteessä
       * eikä puhu kiitoslahjoista.
       *
       * FAKTAT (kaksi riippumatonta lähdettä, haettu 29.8.2026):
       *   - fr-Wikipedia "Basilique Notre-Dame-de-la-Garde" (osiot "Une
       *     première chapelle", vallankumousta käsittelevä osio ja "Les
       *     ex-voto"): haaksirikosta selvinneet merimiehet veivät
       *     kiitoslahjansa 1500-luvun lopulta lähtien tälle kukkulalle;
       *     vanhin tunnettu asiakirja tavasta on 11. elokuuta 1425
       *     päivätty notaarin kirja, jossa Jean Aymar maksaa viisi
       *     floriinia vahakuvista; 13. maaliskuuta 1794 kirkon esineet
       *     myytiin huutokaupalla, sadan ex-voton erä kahdenkymmenen
       *     kappaleen nipuissa; siksi seinillä olevat maalatut
       *     kiitoslahjat ovat suurimmaksi osaksi vasta 1800-luvun
       *     jälkipuoliskolta; yleisin aihe on haaksirikko tai myrsky,
       *     mutta joukossa on myös tulipaloja, auto- ja
       *     rautatieonnettomuuksia ja sairasvuoteita, ja uusimmat
       *     kiitoslaatat on jouduttu kiinnittämään terassien seiniin,
       *     koska sisällä ei ole enää tilaa; Aubin Louis Millin kuvasi
       *     1800-luvun alussa kattoon ripustettuja pienoislaivoja, joiden
       *     nimi oli kirjoitettu perään; kukkula on 162 metriä korkea;
       *     basilikan museo avattiin 18. kesäkuuta 2013.
       *   - Pelin oma kuratoitu aineisto (js/packs/maa-kategoriat.js,
       *     FRA/arki, nosto "Laivat roikkuvat katossa"): marseillelaiset
       *     sanovat kirkkoa nimellä la Bonne Mère eli Hyvä äiti, ja
       *     merimiehet ovat vuosisatojen ajan tuoneet sinne maalauksen
       *     tapahtumasta tai pienoismallin omasta aluksestaan.
       *
       * VARALLISUUSSÄÄNTÖ JA KUNNIOITUS: teksti ei väitä isoisän
       * jättäneen mitään kirkkoon eikä ota kantaa uskoon. Kiitoslahjat
       * käsitellään sinä mitä ne ovat — ihmisten oma kirjanpito siitä,
       * mikä meni hyvin.
       */
      id: 'exvotot',
      nappi: 'Seinällinen myrskyjä, jotka päättyivät hyvin',
      otsikko: 'Kiitoslahjat la Bonne Mèren seinillä',
      teksti: 'Kaupungin yllä on satakuusikymmentäkaksi metriä korkea '
        + 'kalliokukkula, ja sen huipulla kirkko, jota marseillelaiset '
        + 'sanovat nimellä la Bonne Mère. Sen seinät ovat täynnä pieniä '
        + 'maalauksia, jotka on tehnyt joku muu kuin taiteilija. Ne ovat '
        + 'kiitoslahjoja: kun merimies selvisi myrskystä, hän toi '
        + 'kukkulalle kuvan siitä, mitä oli tapahtunut, tai pienoismallin '
        + 'omasta aluksestaan. Tapa on vanha — varhaisin tunnettu '
        + 'asiakirja siitä on 11. elokuuta 1425 päivätty notaarin kirja, '
        + 'jossa eräs Jean Aymar maksaa viisi floriinia vahakuvista — ja '
        + '1800-luvun alussa matkailija kuvasi kirkon kattoon '
        + 'ripustettuja pienoislaivoja, joiden nimi oli kirjoitettu '
        + 'perään. Ja tässä on se kohta, joka isoisääsi kiinnostaisi. '
        + 'Melkein kaikki seinillä olevat maalaukset ovat hänen omalta '
        + 'vuosisadaltaan tai sitä nuorempia, ja syy ei ole se, etteikö '
        + 'vanhempia olisi ollut. Maaliskuussa 1794 kirkon omaisuus '
        + 'myytiin huutokaupalla, ja kiitoslahjat menivät kaupaksi '
        + 'kahdenkymmenen kappaleen nipuissa. Kokoelma alkoi siis '
        + 'käytännössä alusta, ja se kasvoi nopeasti takaisin täyteen. '
        + 'Aiheet eivät myöskään pysyneet merellä: seiniltä löytyy '
        + 'tulipaloja, junaonnettomuuksia, autokolareita ja '
        + 'sairasvuoteita. Tilaa ei ole enää sisällä, joten uusimmat '
        + 'kiitoslaatat on kiinnitetty ulos terassien seiniin. Kirkko on '
        + 'siis kaupungin ainoa arkisto, jonka jokainen rivi on jonkun '
        + 'oma ja jonka jokainen tarina päättyy hyvin.',
      /*
       * Commons 29.8.2026: 4546×3410, image/jpeg, CC BY-SA 4.0, tekijä
       * Zairon, kuvattu 29.9.2021, kuvaus "Ex-Votos at the Basilica of
       * Our Lady of the Guard, Marseille". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px:n esikatselusta: kirkon sivuseinä,
       * jolla on kolmisenkymmentä pientä kehystettyä meri- ja
       * myrskymaalausta riveissä, alarivissä marmorisia kiitoslaattoja,
       * ylhäällä lasimaalausikkuna ja vasemmassa yläkulmassa katosta
       * riippuva purjelaivan pienoismalli. Ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Marseille Basilique Notre-Dame-de-la-Garde Intérieure Nef Ex-Voto.jpg',
        selite: 'Notre-Dame de la Garden seinä on täynnä merimiesten '
          + 'kiitoslahjoja: pieniä maalauksia myrskyistä ja '
          + 'haaksirikoista, alla marmoriset kiitoslaatat.',
        lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Miksi la Bonne Mèren seinillä olevat maalatut '
          + 'kiitoslahjat ovat lähes kaikki isoisäsi ajalta tai sitä '
          + 'nuorempia?',
        vaihtoehdot: [
          'Vanhemmat siirrettiin 1900-luvulla museoon Pariisiin',
          'Vanhemmat myytiin huutokaupalla vuonna 1794',
          'Vanhemmat oli tapana polttaa kerran vuosisadassa',
        ],
        oikea: 1,
        fakta: 'Kirkon omaisuus myytiin maaliskuussa 1794, ja kiitoslahjat '
          + 'menivät kaupaksi kahdenkymmenen kappaleen nipuissa. Uusi '
          + 'kokoelma kasvoi tilalle nopeasti, eikä se rajoitu merelle: '
          + 'seiniltä löytyy myös tulipaloja ja junaonnettomuuksia.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa isoisän merkinnän toista virkettä — *"kanava Suezissa on
   * tehnyt tästä kaupungista Ranskan portin itään"* — ja on ainoa kohta
   * tässä paketissa, joka sen tekee.
   *
   * MIKSI OPPITUNTI EI POHJUSTA LAATTAKYSYMYSTÄ, TOISIN KUIN
   * SEVILLASSA: Marseillen laattakysymys tulee tarinakaaren paketista ja
   * kysyy Ifin saaren tehnyttä kirjaa, ja kaanoninen pollo.teksti sanoo
   * jo vastauksen ääneen (ks. SPOILERIHUOMIO tiedoston alussa).
   * Pohjustaminen olisi siis kolmas kerta samalle tiedolle. Oppitunti
   * ottaa siksi merkinnän sen kohdan, jota mikään muu ei selitä.
   *
   * MIKSI JUURI TONNISTOMITTA: isoisä on kartanpiirtäjä, joka mittaa
   * kaiken. Hän oli Marseillessa syyskuussa 1873, ja kolme kuukautta
   * myöhemmin kansainvälinen komissio päätti vihdoin, miten laiva
   * mitataan kanavamaksua varten — ja se mitta on yhä käytössä. Se on
   * saman vuoden tositapahtuma, joka koskee juuri hänen ammattiaan.
   *
   * FAKTAT (kaksi riippumatonta artikkelia, haettu 29.8.2026):
   *   - en-Wikipedia "Suez Canal" (johdanto sekä osiot "Inauguration
   *     (17 November 1869)", "Initial difficulties (1869–1871)",
   *     "Impact" ja "Economic impact"): ranskalainen diplomaatti
   *     Ferdinand de Lesseps perusti Compagnie de Suezin 1858 kanavan
   *     rakentamiseksi; rakennustyöt kestivät 1859–1869 ja kanava avattiin
   *     virallisesti 17. marraskuuta 1869; avajaiset alkoivat Port
   *     Saidissa 15. marraskuuta illalla; avaamisen jälkeen yhtiö oli
   *     rahavaikeuksissa, loput työt valmistuivat vasta 1871 ja liikenne
   *     jäi kahtena ensimmäisenä vuonna odotettua vähäisemmäksi; de
   *     Lesseps yritti kasvattaa tuloja tulkitsemalla toimiluvan
   *     "tonneau de capacité" -käsitteen laivan lastikapasiteetiksi eikä
   *     brittiläisen Moorsomin järjestelmän nettovetoisuudeksi, ja
   *     Konstantinopolin kansainvälinen komissio ratkaisi kiistan
   *     pöytäkirjallaan 18. joulukuuta 1873; siitä syntyi Suezin kanavan
   *     nettovetoisuus, joka on yhä käytössä; 1800-luvulla höyrylaivan
   *     matka Bombayhin lyheni Marseillesta 31 päivää, Brindisistä ja
   *     Triestestä 37 ja Bordeaux'sta, Liverpoolista, Lontoosta,
   *     Amsterdamista ja Hampurista 24 päivää, ja tämä kasvatti nopeasti
   *     Välimeren satamia.
   *   - en-Wikipedia "Tonnage" (osio "Suez Canal Net Tonnage"): Suezin
   *     kanavan nettovetoisuus johdettiin Moorsomin järjestelmän
   *     nettovetoisuudesta muutoksin ja vahvistettiin Konstantinopolin
   *     kansainvälisen komission pöytäkirjassa 18. joulukuuta 1873; mitta
   *     on yhä käytössä ja kirjataan Suezin kanavan
   *     vetoisuustodistukseen.
   *   - Lisäksi fr-Wikipedia "Histoire de Marseille" (osio "L'âge d'or
   *     des colonies (1870-1914)"): höyrylaivat, Suezin kanavan
   *     puhkaisu ja siirtomaakauppa kasvattivat Marseillen väkiluvun
   *     noin 300 000:sta vuonna 1870; satama laajeni vanhan sataman
   *     ulkopuolelle pohjoisrannoille vuodesta 1844, ja Joliettin
   *     altaat avattiin 1853.
   *
   * IKÄSOPIVUUS (13+): kanava kerrotaan mittana ja maksuna, ei
   * suurmiestarinana. Politiikka ja siirtomaahistoria jäävät pois;
   * oppitunnin oma kärki on se, että maailman tärkein oikotie oli kaksi
   * vuotta auki ennen kuin kukaan osasi sanoa, miten sitä käyttävä laiva
   * mitataan.
   */
  oppitunti: {
    otsikko: 'Neljä vuotta ilman mittaa',
    teksti: 'Kun isoisäsi seisoi tässä satamassa, Suezin kanava oli ollut '
      + 'auki neljä vuotta. Se avattiin 17. marraskuuta 1869, ja sitä oli '
      + 'kaivettu kymmenen vuotta, vuodesta 1859. Marseillelle se '
      + 'tarkoitti yhtä lukua ylitse muiden: höyrylaivan matka Bombayhin '
      + 'lyheni tästä kaupungista kolmellakymmenelläyhdellä päivällä. '
      + 'Lontoosta, Liverpoolista, Amsterdamista ja Hampurista sama matka '
      + 'lyheni kahdellakymmenelläneljällä, eli Välimeren satamat saivat '
      + 'viikon etumatkan pohjoiseen nähden — ja siksi juuri ne kasvoivat '
      + 'nopeimmin. Marseillessa oli vuonna 1870 noin kolmesataatuhatta '
      + 'asukasta, ja satama oli jo levinnyt vanhan sataman ulkopuolelle: '
      + 'Joliettin altaat avattiin 1853. Mutta oikotie ei alkanut hyvin. '
      + 'Yhtiö oli avaamisen jälkeen rahapulassa, viimeiset työt '
      + 'valmistuivat vasta 1871, ja kahtena ensimmäisenä vuonna kanavassa '
      + 'kulki vähemmän laivoja kuin oli laskettu. Ja tässä on se kohta, '
      + 'jonka isoisäsi olisi alleviivannut. Maksu perittiin laivan koon '
      + 'mukaan — mutta kukaan ei ollut sopinut, mikä laivan koko on. '
      + 'Kanavayhtiön johtaja Ferdinand de Lesseps luki toimiluvastaan, '
      + 'että maksu lasketaan siitä, kuinka paljon laiva pystyy kantamaan; '
      + 'varustamot laskivat sen brittiläisellä Moorsomin järjestelmällä, '
      + 'joka mittaa laivan sisätilan. Sama laiva sai kaksi eri lukua ja '
      + 'kaksi eri laskua. Riitaa puitiin neljä vuotta, kunnes '
      + 'kansainvälinen komissio kokoontui Konstantinopolissa ja päätti '
      + 'asian pöytäkirjallaan 18. joulukuuta 1873 — kolme kuukautta sen '
      + 'jälkeen, kun isoisäsi kirjoitti tämän sivun. Komission '
      + 'määrittelemä Suezin kanavan nettovetoisuus on käytössä yhä '
      + 'tänään. Maailman tärkein oikotie oli siis ollut auki neljä '
      + 'vuotta ennen kuin sen läpi kulkevalla laivalla oli sovittu '
      + 'mitta.',
    /*
     * Commons 29.8.2026: 1400×894, image/jpeg, public domain, tekijä
     * Édouard Riou, päiväys 1869, kuvaus "Inauguration ceremony of the
     * Suez canal at Port Said, 17 November 1869. Taken from The Album of
     * the Empress: Picturesque Journey through the Isthmus of Suez."
     * Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px:n esikatselusta:
     * aikalaisteos avajaisseremoniasta rannalla — kolme koristeltua
     * katosta, lipputankoja, väkijoukkoa ja purjelaivojen mastometsä
     * horisontissa. Aikalaiskuvaus, ei tunnistettavia nykyihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on itse se päivä, josta oppitunti laskee
     * neljä vuotta eteenpäin isoisän merkintään.
     */
    kuva: {
      tiedosto: 'L\'inauguration du canal de Suez, 17 November 1869 Gal18 riou 001f.jpg',
      selite: 'Suezin kanavan avajaiset Port Saidissa 17. marraskuuta '
        + '1869 Édouard Riou\'n aikalaiskuvassa; taustalla vieraiden '
        + 'laivojen mastot.',
      lahde: 'Édouard Riou 1869, Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * TÄMÄ TEKSTI ON EHDOTUS EIKÄ KAANONIA. Hahmo, laattakysymys ja
   * kohtaamisen oma repliikki ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'marseille'): soutaja
   * Baptiste kuljettaa kalastajia satamasta ja tuntee Ifin saaren
   * virtaukset, ja hänen isänsä isä souti isoisän saarelle ja odotti
   * kaksi vuorokautta. Luonnos käyttää samaa hahmoa, koska kaupungilla
   * on jo hänet — uusi nimi tekisi kaupunkiin kaksi eri vartijaa.
   *
   * MITÄ LUONNOS EI TEE: se ei kertaa Baptisten repliikkiä eikä toista
   * sen yksityiskohtaa ylimääräisestä arkusta, koska se on aarteen
   * palkinto eikä kortin sisältö. Se ei myöskään nimeä kirjaa, jota
   * laattakysymys kysyy — vaikka kaanoninen pollo.teksti sen jo tekee
   * (ks. SPOILERIHUOMIO tiedoston alussa), tämä paketti ei syvennä
   * spoileria yhdelläkään sanalla.
   *
   * MITÄ LUONNOS YRITTÄÄ (docs/moduulit/tarinakaari.md, luku 3 ja 5):
   *   - SUVUN JATKUMO ilman ostettua järjestelyä. Baptiste soutaa samaa
   *     matkaa kuin isänsä ja isänsä isä, ja syy jatkaa on suvun oma:
   *     vene ja reitti ovat hänen elantonsa, ei kenenkään toivomus.
   *   - ÄÄNIPROFIILI ON EPÄUSKOINEN. Baptiste pitää sukunsa tarinaa
   *     satamajuttuna — jokainen soutaja väittää sukunsa kuljettaneen
   *     jotakuta — mutta airot ovat hänen kädessään.
   *   - VARALLISUUSSÄÄNTÖ tarkistettu virke virkkeeltä: isoisä ei maksa
   *     mitään, ei tilaa mitään eikä käske ketään. Ainoa hänen jälkensä
   *     on kaksi vuorokautta odotusta, ja sekin on Baptisten suvun oma
   *     muisto eikä sopimus.
   *   - PORTINVARTIJAKYSYMYS: Baptiste ei soudan sitä, joka ei tiedä
   *     miksi kaikki muutkin haluavat samalle kalliolle. Lupaus on
   *     käsin kosketeltava teko — hän irrottaa köyden — ja se lunastuu
   *     aarteessa.
   *
   * KUVAA EI OLE (aallon 4B rajaus). Kortti rakennetaan ilman kuvaa
   * aivan kuten Sevillassa, Riiassa ja Amsterdamissa.
   */
  kohtaaminen: {
    hahmo: 'Soutaja Baptiste',
    nappi: 'Tapaa soutaja',
    /*
     * VARMISTUSKYSYMYS (omistajan pelitestipalaute v1119): lause on
     * datassa, koska suomen genetiivi ei taivu koneellisesti jokaisesta
     * nimestä.
     */
    varmistus: 'Haluatko varmasti tavata Baptisten juuri nyt?',
    /*
     * VIHJELINKIN OSIO on kaupunkilehden osion id (js/packs/
     * kulttuuri-kategoriat.js): Marseillen lehdessä on kaksi osiota,
     * 'kaupunki' ("Marseille") ja 'ruoka' ("Ruoka"). Baptisten kysymys
     * koskee sitä kalliosaarta lahden suulla, ja ainoa tuki sille on
     * kaupunkisivulla, jonka nostoissa saari esiintyy. Rivi kertoo
     * suunnan, ei vastausta.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Baptiste soutaa vieraita sataman suulle samaa matkaa, jota '
      + 'hänen isänsä ja isänsä isä soutivat, ja hän tietää ulkoa, missä '
      + 'kohdassa virta kääntää veneen keulan itsestään. Suvussa '
      + 'kerrotaan, että hänen isoisänsä isä odotti kerran erästä '
      + 'ulkomaalaista kalliolla kaksi vuorokautta ja ettei kukaan '
      + 'maksanut siitä ylimääräistä. Baptiste sanoo suoraan pitävänsä '
      + 'juttua satamapuheena: jokaisella tämän laiturin soutajalla on '
      + 'sukutarina jostakusta, jonka hän muka kuljetti. Airot hänellä on '
      + 'silti, ja sama reitti. Vieraita hän vie mielellään, mutta ei '
      + 'ketä tahansa eikä kysymättä. Ennen kuin hän irrottaa köyden, hän '
      + 'haluaa tietää, tietääkö tulija ylipäätään, miksi puolet '
      + 'maailmasta haluaa juuri tuolle kalliolle.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla, Sofialla ja Sevillalla.
   */

  /*
   * KOHTAAMISPAIKKA: VANHA SATAMA. Baptiste on soutaja, ja Vieux-Port on
   * se laituri, jolta saarelle lähdetään; pelin oma Marseille-aineisto
   * osoittaa saman paikan (js/packs/kulttuuri-kategoriat.js,
   * marseille/kansikuvat: *"Vanha satama on ollut kaupungin
   * luonnonsatama antiikista asti, ja sen suuta vartioivat Saint-Jeanin
   * ja Saint-Nicolas'n linnakkeet."*).
   *
   * 43,294 N / 5,37 E — fr-Wikipedia "Vieux-Port de Marseille",
   * prop=coordinates (haettu 29.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((5,37 − (−175)) mod 360) × (12000/360)
   *                     = 180,37 × 33,3333… = 6012,3
   *                   y = (millerY(76) − millerY(43,294)) × 12000/2π
   *                     = 1671,5
   *   europe          x = (5,37 + 11) × 19,2 = 314,3
   *                   y = (72 − 43,294) × 26,3 = 755,0
   *
   * TARKISTUS MARSEILLEN LAATTAA VASTEN. Laatta on Euroopan laudalla
   * 312 / 744 (js/packs/europe.js) ja maailmankartalla 6008,3 / 1654,5
   * (js/packs/maailmankartta.js). Euroopan laudalla piste jää laatasta
   * noin 11 yksikön päähän, eli alle js/fokuspiste.js:n PISTE_ERO_MIN
   * -rajan (14), ja piirtopuoli siirtää sen itse koilliseen laatan
   * vierestä — juuri niin kuin Tukholmassa. Maailmankartalla ero on
   * noin 17 yksikköä, joten siellä piste jää laskettuun paikkaansa.
   * Kumpaakaan lukua ei ole vedetty laatan mukaan: piste on laskettu
   * maastoa vasten kuten muissakin paketeissa.
   */
  kohtaamispiste: {
    nimi: 'Vanhan sataman laituri',
    laudat: {
      maailmankartta: { x: 6012.3, y: 1671.5 },
      europe: { x: 314.3, y: 755.0 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Marseillen sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Marseille",
   * 2 = Ruoka, 3 = Menovinkit (Ranskan maapaketista, js/packs/
   * maa-kategoriat.js FRA).
   *
   * MIKSI 2 JA 3. Raamattu vaatii kysymyksen jokaiselle sivulle paitsi
   * etusivulle. Sivun 1 hoitaa Marseillen kulttuurivisa (js/packs/
   * europe-kulttuuri.js, marseille: marseljeesin nimi), jonka
   * js/fokustehtavat.js pukee samaksi AARTEEN AVAUS -laatikoksi ilman
   * omaa riviään täällä. Jäljelle jäävät sivut 2 ja 3, eli sama pari
   * kuin Tukholmassa ja Pariisissa.
   *
   * SIVUN 2 OMA TEHTÄVÄ VÄISTYY, JA SE ON KIRJATTU. Ruoka-sivulla on
   * lehden oma minitehtävä ("Miksi navette-keksejä ostetaan tusina
   * kerrallaan?", js/packs/kulttuuri-kategoriat.js, marseille/ruoka), ja
   * js/fokustehtavat.js korvaa sen nimetyllä tehtävällä, jotta sivulla
   * on Raamatun vaatima yksi minitehtävä eikä kahta. Sama tapahtui
   * Tukholmassa (sivun 2 oma tehtävä väistyi POLHEM_VISAn tieltä).
   * SISÄLTÖ EI KUITENKAAN KATOA: väistyvän tehtävän aihe eli navette
   * siirtyy tässä paketissa sivun 3 JULISTE-tehtäväksi toisesta
   * kulmasta, ja sivun 2 uusi kysymys on saman sivun toisesta nostosta.
   * Molemmat Ruoka-sivun nostot pysyvät siis pelaajan reitillä.
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js tuntee Marseillen
   * (tiedosto tuotanto/tuot-marseille.png), joten palkinto lunastaa
   * lupauksensa — toisin kuin Sevillassa, jossa riviä ei vielä ole.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: BOUILLABAISSE_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: NAVETTE_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Ranskan
   * kruununjalokivien safiiri, sama kuin Pariisilla. Merkintä aukeaa,
   * kun aarre löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Vanha merimies kertoi safiirista, joka katosi Pariisin '
      + 'kruununjalokivien mukana vallankumouksen sekasorrossa — osa '
      + 'löytyi, osa ei, ja hänen mukaansa yksi kivistä kulki tämän '
      + 'sataman kautta etelään. Satama muistaa kaiken mikä sen läpi '
      + 'kulkee, hän sanoi, mutta ei kerro mihin se meni.',
  },
};
