/*
 * GRANADAN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4C.
 *
 * Sisartiedosto js/packs/fokusvirta-sevilla.js:lle (aalto 4A) ja
 * js/packs/fokusvirta-firenze.js:lle (aalto 4B): samat kentät, sama
 * järjestys, sama moottori (js/fokusvirta.js). Uusi kaupunki on yksi
 * tiedosto ja yksi rivi rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ
 * PAKETTI EI KIRJOITA SITÄ RIVIÄ eikä koske sw.js:ään, savukkeisiin tai
 * mihinkään muuhun tiedostoon: aallon 4C kaupungit kokoaa
 * integrointiagentti yhtenä nostona.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 30.8.2026, aallon 4C kaanonpaperi, osio
 * GRANADA). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: Vigon lahden hopealasti — Espanjan aarre, sama kuin
 * Madridilla ja Sevillalla. Aarremerkintä alla on Granadan oma merkintä
 * samasta lastista, ei Sevillan toisinto: siinä vanha opas kääntää
 * kaivajien katseen linnan alta luoteeseen meren pohjaan.
 *
 * FAKTAPOHJA. Kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `granada`) kahtena sivuna ('kaupunki'
 * ja 'musiikki'), ja kaupungilla on lisäksi tarinakaaren paketti
 * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'granada'). Tämän paketin
 * sisältö nojaa kahteen lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Kaupunkilehden omat nostot,
 *      jaksot ja kuvatekstit (Gran Vía, yliopisto, hiihtokeskus,
 *      Manuel de Falla, Corral del Carbón) — nämä on jo kertaalleen
 *      tarkistettu ja hyväksytty peliin, ja MOLEMMAT lehtitehtävän
 *      visat sekä Livian maadoitus on koottu niistä ilman yhtään uutta
 *      faktaväitettä.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 30.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli ja osio kerrallaan, ja jokaisen
 *      kohdan oma kommentti nimeää artikkelin ja osion. Mitään ei ole
 *      päätelty, pyöristetty eikä muistettu. Missä kaksi artikkelia
 *      antaa eri vuosiluvun, ristiriita on kirjattu näkyviin eikä sitä
 *      ole sovitettu (ks. TÄKY 1, Irvingin asumisvuosi).
 *
 * ── OMISTAJAN LINJAUKSET, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ──────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen.
 *   2. PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA. `pollo.kuva` osoittaa
 *      KULTTUURI_KATEGORIAT-karusellin omaan generoituun heroon
 *      (granada/avauskuvat), ei uuteen Commons-kuvaan.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta; moottori
 *      lukee kentän varovasti (`data.valinta?.…`).
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA. Kohtaamisessa on siis
 *      vain hahmo, nappi, varmistus, vihjeOsio ja teksti.
 *   5. TÄKYNOSTOJA EI OLE TÄSSÄ PAKETISSA (aallon 4C rajaus): Espanjan
 *      pooli asuu Madridin paketissa (js/fokusnosto.js NOSTO_MAAT.ESP),
 *      ja js/fokusnosto.js nostoMaanPooli lukee sen sieltä. Jos
 *      Granadalle joskus kirjoitetaan oma pooli, se on OMA
 *      päätöksensä — silloin kaupungin oma `takynostot`-kenttä
 *      VOITTAISI Madridin poolin, eli granadalainen pelaaja ei enää
 *      näkisi Madridin nostoja. (Sevillalla on oma poolinsa; Granada
 *      jää tässä aallossa Madridin varaan tarkoituksella.)
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan. Kuten aallossa 4B, OIKEAN VASTAUKSEN
 * PAIKKA VAIHTELEE — aina samana pysyvä paikka on opittavissa ilman
 * kysymystä. Tässä tiedostossa indeksit ovat 1 (irving), 0
 * (alcaiceria), 2 (kupoli), 1 (AARTEEN AVAUS) ja 0 (JULISTE). Moottori
 * ei sekoita vaihtoehtoja, joten paikka on juuri se, mikä datassa
 * lukee. Lisäksi on mitattu, ettei oikea vaihtoehto ole pisin
 * yhdessäkään viidestä visasta (docs/moduulit/tarinakaari.md, luku 6
 * kohta 2).
 *
 * ── MITÄ EI SPOILATA — JA MIKÄ SE GRANADASSA ON ────────────────────
 *
 * Granadalla ON tarinakaaren paketti (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, 'granada'), joten kohtaamisen takana EI ole
 * js/packs/europe-questions.js:n laattakysymyksiä vaan kaaren oma
 * kysymys: *"Punertava linnoitus Alhambra kohoaa Granadan yllä. Mitä
 * sen nimi tarkoittaa?"* Sama ratkaisu kuin Venetsiassa ja
 * Dubrovnikissa.
 *
 * Oppitunti pohjustaa juuri tuon kysymyksen: se kertoo, MISTÄ AINEESTA
 * linnoituksen muurit on tehty ja mistä niiden väri tulee. Vastausrivi
 * ("punaista — arabiaksi al-hamra") ei esiinny tekstissä missään
 * muodossa: sanaa al-hamra ei mainita kertaakaan, eikä missään kentässä
 * lue, mitä nimi tarkoittaa. Tarkkaavainen lukija päättelee maasta
 * värin ja väristä nimen; hätäinen arvaa. Juuri se on tarinakaaren
 * luvun 6 kohdan 6 tarkoittama raja. Kaaren omaa repliikkiä
 * (vesimestari Yusuf ja kourut) ei kerrata tässä paketissa.
 *
 * KAANONPAPERIN SPOILERIKIELTOLISTA sitoo myös näitä tekstejä, ja se on
 * käyty läpi kenttä kentältä. Tapas-tavan syntyä EI selitetä missään —
 * aihetta ei sivuta lainkaan, vaikka kaupunkilehden johdanto sen
 * mainitsee. Samalla on väistetty js/packs/europe-questions.js:n
 * `granada`-lohkon viisi laattakysymystä (Alhambra palatsilinnana,
 * Granadan takana kohoava vuoristo nimeltä, vuosiluku 1492, Albaicínin
 * luonne, tapas-tapa): vuoristoa ei nimetä yhdessäkään kentässä, vuotta
 * 1492 ei mainita, eikä Albaicínia kuvailla. Lehtitehtävien visat eivät
 * koske yhtäkään viidestä eivätkä kaaren kysymystä.
 *
 * PAKETIN NOSTAMA SPOILERI, JONKA FABLE ON KORJANNUT: paketin ensin
 * saama kaanoniversio alkoi sanoilla "Punainen linna kukkulalla", ja
 * ensimmäinen virke on peliruudulla lihavoitu — se pohjusti kaaren
 * kysymystä (mitä Alhambran nimi tarkoittaa) vahvemmin kuin mikään
 * tämän paketin oma rivi. Fable korjasi avauksen aallon 4C
 * kaanonpaperissa 30.8.2026 muotoon "Linna kukkulalla", ja tämä
 * tiedosto seuraa korjattua kaanonia sanatarkasti sekä `teksti`- että
 * `luenta`-kentässä. Väri ei esiinny enää missään tämän paketin
 * kentässä ennen kuin kaari kysyy sitä.
 *
 * ── 1873-ANKKURIT ─────────────────────────────────────────────────
 *
 * Kolme, ja kukin kerrotaan täsmälleen kerran (tarinakaari luku 5,
 * "kerro kukin tarina vain kerran per kaupunki"):
 *
 *   1. PALATSISSA ASUTTIIN — kanonisen merkinnän oma havainto, jonka
 *      taustan TÄKY 1 avaa: Irving asui samoissa saleissa ja keräsi
 *      tarinansa niiltä, jotka siellä asuivat.
 *   2. KANSALLISMONUMENTTI 1870 — kolme vuotta ennen isoisän käyntiä.
 *      TÄMÄ PAKETTI EI KERRO SITÄ: sen kertoo jo kaupungin oma juliste
 *      (js/packs/julisteet.js, `granada`: "Granada 1870"), ja sama
 *      tarina kahdesti olisi juuri se toisto, jota sapluuna kieltää.
 *      TÄKY 3 kertoo sen sijaan, mitä valtion rahalla tehtiin.
 *   3. KEKSITTY KUPOLI PIHALLA — TÄKY 3. Isoisän käydessä Leijonapihan
 *      paviljongin päällä oli neljätoistavuotias pyöreä kupoli, jota
 *      siellä ei ollut koskaan ennen ollut. Se seisoi vielä 61 vuotta.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 30.8.2026
 * (olemassaolo, koko, lisenssi, tekijä, kuvaus, Restrictions) — ei
 * arvattuja nimiä. Kaikki ovat PD, CC0 tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä. JOKAINEN on lisäksi katsottu silmin 960 pikselin
 * esikatseluna, ja havainto on kirjattu kunkin kuvan kommenttiin.
 *
 * KAIKKI NELJÄ OVAT UUSIA PELILLE. Granadan lehden omat kuvat on käyty
 * läpi, eikä yksikään niistä näytä sitä, mistä tämän paketin kortit
 * kertovat: lehdessä ei ole Alcaiceríaa, ei 1800-luvun Leijonapihaa
 * eikä muurin paljasta kylkeä. Kahdesta lehden ennenNyt-parin vanhasta
 * kuvasta (Laurentin 1870-luvun Leijonapiha) olisi ollut TÄKY 3:n
 * vastine, mutta se on rajattu pihan länsipuoleen eikä siinä näy
 * kupolia lainkaan — ja juuri kupoli on koko täyn asia.
 *
 * LOISTOAIKAKUVIA EI OLE. Sama ratkaisu kuin Sevillassa, Tukholmassa ja
 * Firenzessä: yksi kuva per kortti, `tiedosto`-kenttä. Aiheet on
 * kirjattu raporttiin.
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * Luenta on generoitu 30.8.2026 (tools/generoi-luennat.mjs, lähteenä
 * tämän lohkon oma `matkakirja.luenta`) ja `matkakirja.aanite`
 * osoittaa siihen: assets/audio/puhe-fokus-matkakirja-granada.mp3.
 * Teksti ja luenta ovat sanasta sanaan samat, joten tekstin muutos
 * vaatii uuden generoinnin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa,
 * Sevillassa ja Firenzessä: lista tiedoston lopussa lukee ne
 * muuttujista, jolloin uusi käyttö ei koskaan johda kahteen erilleen
 * ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Falla-kysymys on Granadan lehden sivun 2
 * ("Musiikki") oman noston "Säveltäjä, joka muutti Alhambran kylkeen"
 * tekstiä ja Gran Vía -kysymys sivun 1 matkailijajakson "Katu, joka
 * murrettiin läpi" tekstiä (js/packs/kulttuuri-kategoriat.js). Uusia
 * faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI FALLA EIKÄ ZAMBRA, vaikka zambra on sivun 2 toinen nosto:
 * sivulla 2 on jo lehden OMA minitehtävä juuri zambrasta, ja nimetty
 * tehtävä väistää sen tieltä (js/fokustehtavat.js). Jos AARTEEN AVAUS
 * kysyisi samasta luolaflamencosta, sivun ainoa kysymys vaihtuisi
 * toiseksi kysymykseksi samasta asiasta — ja pelaaja menettäisi sivun
 * toisen aiheen kokonaan. Nyt sivun kysymys vaihtuu aiheeltaan, ei
 * pelkältä sanamuodoltaan.
 */
const FALLA_VISA = {
  kysymys: 'Manuel de Falla järjesti vuonna 1922 Alhambran pihalla '
    + 'kilpailun. Mitä varten?',
  vaihtoehdot: [
    'Kerätäkseen rahaa palatsin puutarhojen kunnostukseen',
    'Pelastaakseen cante jondo -laulun unohdukselta',
    'Valitakseen orkesterilleen uuden ensiviulun',
  ],
  oikea: 1,
  fakta: 'Falla (1876–1946) sävelsi teoksensa "Öitä Espanjan '
    + 'puutarhoissa" vuosina 1909–1915, kun asui vielä Pariisissa ja '
    + 'Madridissa. Vasta myöhemmin hän muutti pieneen puutarhataloon '
    + 'saman kukkulan rinteeseen; talo on nyt museo ja piano yhä '
    + 'paikallaan.',
};

const GRANVIA_VISA = {
  kysymys: 'Granadan pääkatu Gran Vía de Colón murrettiin vanhan '
    + 'kaupungin läpi vuosina 1895–1934. Mitä työ vaati?',
  vaihtoehdot: [
    'Viidesosan silloisesta vanhastakaupungista',
    'Kahden luostarin siirtämisen kaupungin laidalle',
    'Kaupungin vanhan viljatorin siirtämisen',
  ],
  oikea: 0,
  fakta: 'Katu rakennettiin kauppakamarin tilauksesta, ja sen varrelle '
    + 'nousi 52 uutta rakennusta. Vastapainoksi kaupungin väkirikkain '
    + 'kaupunginosa Zaidín syntyi vasta 1953 alkaen.',
};

export const FOKUSVIRTA_GRANADA = {
  kaupunki: 'granada',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Granada, huhtikuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Linna kukkulalla on kaunein raunio jonka olen '
      + 'nähnyt — paitsi ettei se ole raunio: sen saleissa asuu köyhiä '
      + 'perheitä, ja seinien kirjoitukset kulkevat heidän arkensa yllä '
      + 'kuin toisen maailman posti. Vuorilla on lunta vaikka laaksossa '
      + 'kypsyvät appelsiinit. Illalla kukkulan luolissa laulettiin ja '
      + 'tanssittiin tavalla, joka ei pyydä yleisöä — se vain sietää '
      + 'sitä.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Neljä tagia, alku ja
     * loppu eri sävyssä.
     */
    luenta: '[curious] Linna kukkulalla on kaunein raunio jonka '
      + 'olen nähnyt — paitsi ettei se ole raunio: [softly] sen saleissa '
      + 'asuu köyhiä perheitä, ja seinien kirjoitukset kulkevat heidän '
      + 'arkensa yllä kuin toisen maailman posti. [warmly] Vuorilla on '
      + 'lunta vaikka laaksossa kypsyvät appelsiinit. [whispers] Illalla '
      + 'kukkulan luolissa laulettiin ja tanssittiin tavalla, joka ei '
      + 'pyydä yleisöä — se vain sietää sitä.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-granada.mp3',
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
     * MIKSI LUMI JA APPELSIINIT: kanoninen `teksti` alla hoitaa jo
     * palatsin asukkaat, kirjailijan ja luolat, eikä sama asia saa
     * tulla kahdesti samassa kuplassa. Merkinnän ainoa virke, johon
     * kukaan muu ei vastaa, on se lyhyt lumi- ja appelsiinihavainto —
     * ja se on niitä isoisän huomioita, jotka pitävät yhä.
     *
     * VUORISTOA EI NIMETÄ. Sen nimi on js/packs/europe-questions.js:n
     * `granada`-lohkon toisen laattakysymyksen vastaus, joten tässä
     * puhutaan vuorista ja hiihtokeskuksesta ilman nimeä. Kaikki muu on
     * kaupunkilehden omaa nostoa "Aamulla hiihtoa, iltapäivällä merta"
     * (js/packs/kulttuuri-kategoriat.js, granada): (1) keskustasta on
     * vajaat 30 km Euroopan eteläisimpään hiihtokeskukseen ja noin 70
     * km Välimeren rannalle, (2) hissit nousevat yli kolmen kilometrin
     * korkeuteen, (3) vieressä kohoaa Iberian niemimaan korkein huippu
     * 3 479 metriä, (4) alppihiihdon MM-kisat piti pitää täällä 1995,
     * mutta ne siirrettiin vuodella, koska rinteet olivat paljaat.
     * Yksikään luku ei muutu.
     */
    maadoitus: 'Kääk. Se lumen ja appelsiinin yhdistelmä piti '
      + 'paikkansa, ja pitää yhä: keskustasta on vajaat kolmekymmentä '
      + 'kilometriä Euroopan eteläisimpään hiihtokeskukseen ja noin '
      + 'seitsemänkymmentä Välimeren rannalle, joten saman päivän '
      + 'aikana ehtii sekä rinteeseen että uimaan. Hissit nousevat yli '
      + 'kolmen kilometrin korkeuteen, ja vieressä kohoaa Iberian '
      + 'niemimaan korkein huippu, kolmetuhatta neljäsataa '
      + 'seitsemänkymmentäyhdeksän metriä. Lunta ei silti ole taattu: '
      + 'alppihiihdon maailmanmestaruuskisat oli määrä pitää täällä '
      + 'vuonna 1995, mut ne siirrettiin vuodella, koska rinteet olivat '
      + 'paljaat.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan.
     */
    teksti: 'Ne linnan asukkaat häädettiin vasta isoisäsi vuosisadan '
      + 'lopulla, kun palatsia alettiin korjata museoksi.. Amerikkalainen '
      + 'kirjailija asui siellä itsekin ja kirjoitti tarinat jotka '
      + 'pelastivat koko paikan — ilman niitä se olisi ehkä purettu. '
      + 'Luolissa lauletaan edelleen, ja nykyään se pyytää yleisöä ihan '
      + 'mielellään. Kiivetään kukkulalle.',
    /*
     * Selite on lehden oman avauskuvan selite sellaisenaan (js/packs/
     * kulttuuri-kategoriat.js, granada/avauskuvat, kolmas hero);
     * yksikään luku ei muutu.
     *
     * MIKSI ILLAN HERO. Karusellin kolmesta generoidusta herosta aamun
     * selite kertoo San Jerónimon luostarista ja keskipäivän La
     * Cartujasta; kumpikaan ei liity siihen, mistä kupla puhuu. Illan
     * hero on Corral del Carbón, kauppiaiden majatalo — juuri se
     * rakennustyyppi, jonka ympärille TÄKY 2 rakentuu, ja ainoa kolmesta
     * joka kytkee kuplan kaupunkiin kukkulan alla. Yksikään kolmesta
     * selitteestä ei koske laattakysymyksiä eikä kaaren kysymystä, joten
     * valinta on vapaa spoilerin puolesta.
     */
    kuva: {
      ampari: 'herokoe/hero-granada-ilta.jpg',
      selite: 'Corral del Carbón on 1300-luvun alkupuolelta säilynyt '
        + 'funduq eli kauppiaiden majatalo ja viljavarasto — ainoa '
        + 'nasridiajalta säilynyt lajissaan koko Iberian niemimaalla.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän ydinhavainto on, että kaunein raunio
       * ei ole raunio vaan asuttu talo. Tämä kertoo, mitä siitä
       * seurasi — ja mistä ne tarinat tulivat, joista Livia puhuu.
       *
       * MITÄ LIVIA JO SANOO, EIKÄ SIIS TÄSSÄ TOISTETA: että
       * amerikkalainen kirjailija asui siellä ja että hänen tarinansa
       * pelastivat paikan. Täky ei kerro sitä uudestaan vaan sen, mitä
       * Livia jättää auki: kuka hän oli, miten hän sisään pääsi ja
       * keneltä tarinat olivat peräisin.
       *
       * FAKTAT (kaksi artikkelia, haettu 30.8.2026):
       *   - en-Wikipedia "Tales of the Alhambra" (johdanto sekä osiot
       *     "Background", "Publication history" ja "Legacy and
       *     influence"): Washington Irving (1783–1859) matkusti
       *     Madridista Granadaan vuonna 1828 heti saatuaan valmiiksi
       *     Kolumbus-elämäkerran; hän oli valmistelemassa teosta
       *     A Chronicle of the Conquest of Granada, historiaa vuosista
       *     1478–1492; hän pyysi palatsiin pääsyä sen silloiselta
       *     kuvernööriltä ja Granadan arkkipiispalta, ja lupa heltisi
       *     hänen kuuluisuutensa takia; seitsemäntoistavuotias opas
       *     Mateo Ximenes auttoi häntä keräämään palatsin tarinat ja
       *     legendat; seuraavana vuonna hän palasi ja asui palatsin
       *     huoneistossa noin kolme kuukautta päästen myös sen
       *     arkistoihin; kirja ilmestyi toukokuussa 1832 nimellä
       *     The Alhambra: a series of tales and sketches of the Moors
       *     and Spaniards, tekijänään "Geoffrey Crayon", Yhdysvalloissa
       *     Lea & Careyn ja Englannissa Henry Colburnin kustantamana;
       *     kirjaan mahtuu myös se, mitä palatsille oli 1800-luvun
       *     alussa tapahtunut; kirja palautti Alhambran länsimaisen
       *     yleisön tietoon, ja laatta merkitsee nykyään ne huoneet,
       *     joissa hän asui; vuonna 1874 Benjamin Wilsonin tytär luki
       *     kirjaa ja kehotti isäänsä antamaan uudelle Los Angelesin
       *     esikaupungille nimeksi Alhambra.
       *   - en-Wikipedia "Alhambra" (osiot "Reconquista and Christian
       *     Spanish period" ja "Recovery and modern restorations"):
       *     1700-luvun alussa alkoi palatsin pahin rappiokausi, valtio
       *     pani siihen vähän varoja ja hoito jäi paikallisille
       *     kuvernööreille, jotka asuivat perheineen laiminlyödyissä
       *     saleissa; 1800-luvun alussa paikan kerrotaan olleen
       *     vankien, työkyvyttömien sotilaiden ja muiden syrjään
       *     jääneiden asuttama; romantiikan ajan kirjoittajat tekivät
       *     siitä lännessä ikonin, ja Irvingin rinnalla vaikuttivat
       *     John Frederick Lewis, Richard Ford, François-René de
       *     Chateaubriand ja Owen Jones.
       *
       * KIRJATTU RISTIRIITA, JOTA EI OLE SOVITETTU. Artikkeli
       * "Tales of the Alhambra" sanoo Irvingin tulleen Granadaan 1828 ja
       * palanneen asumaan palatsiin seuraavana vuonna; artikkeli
       * "Alhambra" sanoo yhdellä rivillä, että hän asui Granadassa
       * vuonna 1830. TÄSSÄ SEURATAAN AIHEEN OMAA ARTIKKELIA (1828 ja
       * 1829), koska se kertoo tapahtumat päivämäärätasolla ja koska
       * sama artikkeli päättää matkan Lontooseen syyskuussa 1829. Ero on
       * kirjattu raporttiin.
       *
       * MITÄ EI KERROTA: vuosien 1810–1812 miehitys ja tornien
       * räjäytykset, vaikka Irvingin kirja käsittelee nekin. Ne ovat
       * sotasisältöä (tarinakaari, luku 2 "Kunnioitussäännöt"), ja
       * täky pärjää ilman: rappio riittää taustaksi, kun sen syyksi
       * riittää se, mikä on totta muutenkin — kukaan ei maksanut
       * korjauksia.
       */
      id: 'irving',
      nappi: 'Opas oli seitsemäntoista',
      otsikko: 'Kirja, joka kirjoitettiin sisältä päin',
      teksti: 'Kun amerikkalainen Washington Irving tuli Granadaan '
        + 'vuonna 1828, palatsi ei ollut nähtävyys vaan osoite. Valtio '
        + 'oli antanut sen rapistua toistasataa vuotta: hoito oli jäänyt '
        + 'paikallisille kuvernööreille, jotka asuivat perheineen '
        + 'laiminlyödyissä saleissa, ja 1800-luvun alussa taloa asuttivat '
        + 'kertomusten mukaan vangit, työkyvyttömät sotilaat ja muut, '
        + 'joilla ei ollut muutakaan paikkaa. Irving oli tullut '
        + 'kirjoittamaan historiateosta ja pyysi pääsyä sisään palatsin '
        + 'kuvernööriltä ja kaupungin arkkipiispalta. Lupa heltisi, koska '
        + 'hän oli jo kuuluisa mies. Ja sitten tapahtui se, mikä tekee '
        + 'tästä muuta kuin matkakertomuksen: hän ei mennyt arkistoon '
        + 'vaan kysyi ihmisiltä. Oppaaksi tuli seitsemäntoistavuotias '
        + 'granadalainen Mateo Ximenes, ja tämän johdolla Irving kirjasi '
        + 'ylös ne tarinat, joita palatsissa asuvat kertoivat omasta '
        + 'talostaan. Seuraavana vuonna hän palasi ja asui itse yhdessä '
        + 'sen huoneistoista noin kolme kuukautta. Kirja ilmestyi '
        + 'toukokuussa 1832 salanimellä Geoffrey Crayon, ja sen jälkeen '
        + 'palatsiin alkoi tulla maalareita, piirtäjiä ja matkustajia, '
        + 'jotka tahtoivat nähdä sen paikan, jota talon omat asukkaat '
        + 'olivat kuvailleet vieraalle. Ja jotta huomaisit, kuinka kauas '
        + 'kirja kantoi: vuotta isoisäsi käynnin jälkeen eräs '
        + 'kalifornialainen mies antoi uudelle esikaupungilleen nimen '
        + 'Alhambra, koska hänen tyttärensä sattui lukemaan sitä.',
      /*
       * Commons 30.8.2026: 2400×991, public domain, tekijä David
       * Roberts, päiväys 1836, credit Harvard Art Museums (Fogg
       * Museum), Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px:n
       * esikatseluna: öljymaalaus, jossa linnoitus istuu kukkulallaan
       * ruskeanpunaisine muureineen, takana lumihuippuinen vuorijono ja
       * etualalla kirkon portaat, joilla istuu muutama maalattu hahmo.
       * Ei valokuvattuja ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on täyn oma seuraus. Roberts maalasi
       * tämän neljä vuotta kirjan ilmestymisen jälkeen — hän on
       * täsmälleen yksi niistä maalareista, jotka kirja lähetti
       * matkalle. Kuva ei siis kuvita täkyä vaan todistaa sen.
       */
      kuva: {
        tiedosto: 'David Roberts - The Fortress of the Alhambra, Granada - 1967.72 - Fogg Museum.jpg',
        selite: 'David Robertsin maalaus vuodelta 1836, neljä vuotta '
          + 'Irvingin kirjan jälkeen: linnoitus kukkulallaan, lumiset '
          + 'huiput takana ja kaupunki sen alla.',
        lahde: 'David Roberts 1836, Harvard Art Museums, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Washington Irving tuli Granadaan vuonna 1828 kesken '
          + 'toista työtä. Mitä hän oli silloin kirjoittamassa?',
        vaihtoehdot: [
          'Näytelmää palatsin viimeisestä hallitsijasta',
          'Historiateosta Granadan valtaamisesta',
          'Matkaopasta Andalusian majataloista',
        ],
        oikea: 1,
        fakta: 'Palatsiin hän pääsi siksi, että oli jo kuuluisa '
          + 'kirjailija. Seuraavana vuonna hän palasi ja asui sen '
          + 'huoneistossa noin kolme kuukautta, ja laatta merkitsee '
          + 'nykyään ne huoneet.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       * Eläin on tässä silkkiperhosen toukka — koko korttelin
       * olemassaolon syy — ja lisäksi ne koirat, joilla visa mitataan.
       *
       * MIKSI TÄMÄ TÄKY: merkintä katsoo kukkulalle. Tämä katsoo
       * alaspäin siihen kaupunkiin, joka maksoi kukkulan: kauppaan.
       * Kytkös kuplan herokuvaan on tarkoituksellinen — Corral del
       * Carbón oli juuri sellainen kauppiaiden majatalo, joita
       * kauppahallissakin oli.
       *
       * FAKTAT (kaksi artikkelia, haettu 30.8.2026):
       *   - es-Wikipedia "Alcaicería de Granada" (johdanto sekä osiot
       *     "Descripción" ja "Historia"): kortteli oli kapeiden
       *     kujien silkkitori, jossa silkkiä sekä valmistettiin että
       *     myytiin, ja se ulottui Plaza Nuevalta Bibarramblan
       *     aukiolle; nimen juuri on latinalainen ja tarkoittaa
       *     "keisarin paikkaa" (al-Kaysar-ia); alue oli suojattu
       *     talomuurina neliönä ja siinä oli yhdeksän porttia, jotka
       *     suljettiin yöksi, ja vartijat valvoivat sisäkujia;
       *     majataloja oli kauppiaiden yöpymistä varten;
       *     ensimmäiset maininnat ovat nasridisulttaani Abu Nasr Saadin
       *     kirjeestä; valloituksen jälkeen kortteli kuului kruunulle
       *     vuodesta 1492 vuoteen 1868 ja sen kuvernöörin nimitti
       *     Alhambran kuvernööri; 1500-luvulla puoteja oli lähes 200,
       *     kaikki pieniä ja yhden alas käännettävän oven takana, ovi
       *     maalattu punamullalle ja se toimi samalla sadesuojana;
       *     silkkiammatin hiipuessa puoteja oli 1787 enää 117, ja
       *     tilalle avattiin muita tekstiili-, nahka-, kaakao- ja
       *     maustekauppoja; portteja oli tuolloin kymmenen, ja niiden
       *     kaarista riippui rautaketjuja, jotka merkitsivät
       *     kuninkaallista erioikeutta ja estivät ratsujen pääsyn
       *     sisään; korttelissa oli myös vartioston tila ja "koirien
       *     huone", ja koirat päästettiin yöksi irti valvomaan
       *     kokonaisuutta; 20. heinäkuuta 1843 tulipalo, joka syttyi
       *     tulitikkukaupasta Mesones-kadulla, tuhosi korttelin
       *     kokonaan; se rakennettiin uudelleen 1800-luvulla muodissa
       *     olleeseen uusarabialaiseen ja romanttiseen tyyliin
       *     arkkitehtien Salvador Amadorin, Juan Pugnairen, Baltasar
       *     Romeron ja José Contrerasin käsissä; alkuperäistä
       *     pohjakaavaa muutettiin, katuja suoristettiin ja
       *     levennettiin ja koko korttelin ala pieneni.
       *   - en-Wikipedia "Bombyx mori" (johdanto sekä osiot "Larvae",
       *     "Pupae (cocoon)" ja "Domestication"): silkkiperhosen toukka
       *     syö käytännössä vain mulperin lehtiä; kotelo on tehty
       *     yhdestä ainoasta 300–900 metrin pituisesta raakasilkin
       *     langasta; yhteen kiloon silkkiä tarvitaan noin
       *     4 000–7 000 koteloa; kesytetty laji ei enää osaa lentää
       *     eikä tule toimeen ilman ihmistä.
       *
       * MITÄ EI KERROTA: mitä koteloille tehdään. Se on tosi, se on
       * Wikipediassa, ja se on tästä täystä pois — tämä on kaupan ja
       * korttelin tarina, ei tuotantoketjun.
       */
      id: 'alcaiceria',
      nappi: 'Kortteli, jonka rakensi yksi toukka',
      otsikko: 'Silkkitori ja sen koirat',
      teksti: 'Kukkulan alla, tuomiokirkon kupeessa, on kapeiden kujien '
        + 'kortteli nimeltä Alcaicería. Se oli kaupungin silkkitori, ja '
        + 'silkki tuli yhdeltä eläimeltä: silkkiperhosen toukalta, joka '
        + 'syö vain mulperin lehtiä ja kehrää ympärilleen kotelon '
        + 'yhdestä ainoasta langasta. Lanka on kolmesta yhdeksään '
        + 'sataan metriä pitkä, ja yhteen kiloon silkkiä niitä '
        + 'koteloita tarvitaan neljästä seitsemään tuhatta. Toukka on '
        + 'kesytetty niin pitkälle, ettei aikuinen perhonen enää osaa '
        + 'lentää eikä laji tule toimeen ilman ihmistä. Sen ympärille '
        + 'rakennettiin kortteli. Se oli suojattu kuin pieni linnoitus: '
        + 'neliö talojen muurin sisällä, portit kiinni yöksi, ja '
        + 'sisäkujilla vartijat. Yöksi sisään päästettiin lisäksi '
        + 'koirat, joille oli korttelissa oma huoneensa. 1500-luvulla '
        + 'puoteja oli lähes kaksisataa, kukin pieni ja yhden alas '
        + 'käännettävän oven takana; ovi oli maalattu punamullalla ja '
        + 'se toimi auki käännettynä katoksena sateelta ja auringolta. '
        + 'Porttien kaarista riippui rautaketjuja, jotka kertoivat '
        + 'kuninkaallisesta erioikeudesta ja estivät ratsuja tulemasta '
        + 'sisään. Sitten silkkiammatti hiipui, ja vuoteen 1787 mennessä '
        + 'puoteja oli enää 117. Ja 20. heinäkuuta 1843 kortteli paloi '
        + 'kokonaan: tuli lähti tulitikkukaupasta viereiseltä kadulta. '
        + 'Se rakennettiin uudestaan siihen uusarabialaiseen tyyliin, '
        + 'joka oli silloin muotia — kadut suorempina, kortteli '
        + 'pienempänä. Isoisäsi käveli siis kolmenkymmenen vuoden '
        + 'ikäisessä jäljitelmässä ja luuli sitä luultavasti vanhaksi. '
        + 'Niin luulee useimmiten tänäänkin se, joka siellä kävelee.',
      /*
       * Commons 30.8.2026: 1536×2048, CC0, tekijä Zarateman, kuvattu
       * 1.8.2023, kuvaus "La Alcaicería (Granada)". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty 960 px:n esikatseluna: holvikäytävä, jonka
       * kipsikaaret ja seinäkoristelu ovat 1800-luvun uusarabialaista
       * työtä, molemmin puolin matkamuistopuoteja. Kujan päässä näkyy
       * yksi ihminen kaukana vastavalossa, epätarkkana ja selin — ei
       * tunnistettavissa. Muita ihmisiä ei ole.
       *
       * MIKSI JUURI TÄMÄ KUVA: täyn kärki on se, että nykyinen
       * kortteli on 1800-luvun jäljitelmä. Kuvassa se näkyy: koristelu
       * on tasaista, sarjana tehtyä ja liian ehjää ollakseen vanhaa.
       */
      kuva: {
        tiedosto: 'Granada - La Alcaicería 1.jpg',
        selite: 'Alcaicerían holvikäytävä: kipsikaaret ja koristelu ovat '
          + 'vuoden 1843 palon jälkeistä uusarabialaista työtä, eivät '
          + 'silkkitorin omaa.',
        lahde: 'Zarateman, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Alcaicerían portit suljettiin joka illaksi. Miten '
          + 'kortteli vartioitiin yön yli?',
        vaihtoehdot: [
          'Sisäkujille päästettiin koirat',
          'Portit sinetöitiin kaupungin vahasinetillä',
          'Katoille nostettiin öljylamput palamaan aamuun',
        ],
        oikea: 0,
        fakta: 'Koirilla oli korttelissa oma huoneensa. Puoteja oli '
          + '1500-luvulla lähes kaksisataa, mutta silkkiammatin '
          + 'hiivuttua enää 117 vuonna 1787.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: isoisä on kartanpiirtäjä, joka mittaa kaiken
       * ja uskoo siihen, mitä näkee. Tämä on kohta, jossa katsominen
       * pettää: hän näki pihalla kupolin, joka näytti vanhalta ja oli
       * neljätoistavuotias.
       *
       * TÄMÄ ON MYÖS SE, MITÄ VALTION RAHALLA TEHTIIN. Kaupungin oma
       * juliste kertoo, että palatsi julistettiin 1870
       * kansallismonumentiksi ja sai ensimmäisen korjausmäärärahansa
       * (js/packs/julisteet.js, `granada`). Sitä ei toisteta tässä; täky
       * kertoo, millaista korjaaminen tuolloin oli.
       *
       * FAKTAT (kaksi artikkelia, haettu 30.8.2026):
       *   - en-Wikipedia "Court of the Lions" (osiot "After the
       *     Reconquista" ja "Recent restorations"): vuonna 1859
       *     arkkitehti Rafael Contreras "korjasi" pihan itäisen
       *     paviljongin antamalla sille pallomaisen, keramiikkalaatoin
       *     päällystetyn kupolikaton, jonka esikuva oli osittain
       *     Persian rakennustaiteessa; se vastasi sitä, millaiselta
       *     aikakauden eurooppalaiset korjaajat kuvittelivat
       *     "arabialaisen tyylin" näyttävän; Leopoldo Torres Balbás
       *     purki kupolin 1934 ja teki tilalle nykyisen
       *     pyramidikaton, mistä syntyi kansainvälinen kiista siitä,
       *     mitä korjaaminen on; Torres Balbásin katto on sekin
       *     osittain väärä, sillä sen kulmat ovat liian jyrkät
       *     verrattuna vastaaviin maurilaisiin pyramidikattoihin;
       *     pihan nykyinen nimi on uusi eikä nasridiaikaista nimeä
       *     tunneta varmuudella; itse piha on suorakaide, 28,7 × 15,6
       *     metriä, ja sen keskellä on suihkulähde, jota ympäröi
       *     kaksitoista marmorista leijonaa; vuonna 2002 alkanut
       *     kunnostus valmistui pääosin 2012, ja yksi sen viimeisistä
       *     töistä oli soran korvaaminen Macaelin marmorilaatoilla,
       *     koska arkistot ja kaivaukset osoittivat kallion olevan
       *     niin lähellä pintaa, ettei puutarhoille olisi ollut
       *     multaa.
       *   - en-Wikipedia "Alhambra" (osio "Recovery and modern
       *     restorations"): korjaustyöt alkoivat 1828 arkkitehti José
       *     Contrerasin johdolla ja saivat 1830 Ferdinand VII:n
       *     rahoituksen; isän kuoltua 1847 työtä jatkoi poika Rafael
       *     (k. 1890) ja tämän jälkeen pojanpoika Mariano (k. 1912);
       *     suku oli palatsin tärkein korjaajasuku vuoteen 1907 asti;
       *     he noudattivat "tyylinmukaisen korjaamisen" oppia, jossa
       *     rakennukseen sai lisätä osia, jotta siitä tulisi
       *     "kokonainen" — vaikkei lisäys vastaisi mitään
       *     historiallista todellisuutta; vuosina 1858–1859 Rafael
       *     Contreras ja Juan Pugnaire lisäsivät persialaisvaikutteiset
       *     pallokupolit sekä Leijonapihaan että Myrttipihan
       *     pohjoiseen pylväikköön.
       *
       * HUOM SISÄINEN RISTIINKYTKENTÄ: sama José Contreras oli myös
       * yksi niistä arkkitehdeistä, jotka rakensivat TÄKY 2:n
       * kauppakorttelin uudelleen palon jälkeen (es-Wikipedia
       * "Alcaicería de Granada"). Kytkentä on tosi ja kirjattu tähän,
       * mutta sitä EI sanota kummassakaan täkytekstissä: se olisi
       * kolmas kerta samalle suvulle samassa paketissa, ja lukija
       * ansaitsee löytää sen itse.
       */
      id: 'kupoli',
      nappi: 'Katto, jota siinä ei ollut koskaan ollut',
      otsikko: 'Kupoli, jonka isoisäsi näki',
      teksti: 'Palatsin kuuluisimmalla sisäpihalla, siinä missä '
        + 'kaksitoista marmorileijonaa kannattaa suihkulähdettä, on '
        + 'kummassakin päässä pieni paviljonki. Kun isoisäsi seisoi '
        + 'siinä huhtikuussa 1873, itäisen paviljongin päällä oli '
        + 'pyöreä, keramiikkalaatoilla päällystetty kupoli. Se näytti '
        + 'kuuluvan taloon. Se oli neljätoista vuotta vanha. Sen oli '
        + 'nostanut siihen vuonna 1859 arkkitehti Rafael Contreras, '
        + 'jonka isä oli aloittanut palatsin korjaustyöt 1828 ja jonka '
        + 'poika jatkoi niitä hänen jälkeensä — kolme sukupolvea samaa '
        + 'taloa, aina vuoteen 1907 asti. He tekivät työnsä sen ajan '
        + 'opin mukaan: '
        + 'rakennukseen sai lisätä osia, jotta siitä tulisi '
        + '"kokonainen", vaikkei lisäys vastaisi mitään, mitä siinä oli '
        + 'joskus ollut. Kupolin esikuva oli osittain Persiassa, tuhannen '
        + 'kilometrin ja monen vuosisadan päässä tästä pihasta. Se ei '
        + 'ollut huijaus vaan makuasia: niin arabialaisen tyylin '
        + 'kuviteltiin Euroopassa näyttävän, ja kuvitelmasta tehtiin '
        + 'katto. Kupoli seisoi paviljongin päällä 75 vuotta. Vuonna '
        + '1934 arkkitehti Leopoldo Torres Balbás purki sen ja teki '
        + 'tilalle pyramidikaton, ja siitä nousi kansainvälinen kiista '
        + 'siitä, saako korjaaja poistaa sen, minkä toinen korjaaja on '
        + 'lisännyt. Loppu on paras osa: myös se uusi katto on '
        + 'osittain väärin. Sen kulmat ovat jyrkemmät kuin vastaavissa '
        + 'vanhoissa katoissa. Piha on siis ollut kolmea eri mieltä '
        + 'siitä, miltä sen pitäisi näyttää, ja isoisäsi sattui '
        + 'käymään keskimmäisen aikana.',
      /*
       * Commons 30.8.2026: 6352×4464, Public Domain Mark, tekijä Jean
       * Laurent, päiväys "noin 1865", credit Städel Museum
       * (sammlung.staedelmuseum.de), Restrictions tyhjä. Kuvaaja kuoli
       * 1886, joten kuva on myös iän puolesta vapaa. SILMÄTARKISTUS
       * tehty 960 px:n esikatseluna: valokuva paspartuulle liimatusta
       * vedoksesta, jonka alareunassa on painettu teksti "GRANADA. 1112.
       * El patio de los Leones desde la puerta de entrada. (Alhambra)".
       * Kuvassa katsotaan pylväskäytävän läpi pihan poikki, keskellä
       * leijonasuihkulähde ja perällä paviljonki, jonka päällä on
       * selvästi pyöreä kupoli. Ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on ainoa löytynyt vedos, jossa
       * täyn koko asia — se kupoli — näkyy kokonaan ja tunnistettavasti,
       * ja se on otettu isoisän käyntiä edeltävällä vuosikymmenellä.
       * Pelaaja siis näkee sen, minkä isoisä näki, eikä sen tarvitse
       * uskoa tekstiä.
       */
      kuva: {
        tiedosto: 'Granada- View into the lion court of the Alhambra (SM stf113).png',
        selite: 'Jean Laurentin vedos noin vuodelta 1865: pihan perällä '
          + 'olevan paviljongin päällä on pallomainen kupoli, joka '
          + 'purettiin vasta 1934.',
        lahde: 'Jean Laurent n. 1865, Städel Museum, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mistä Rafael Contreras otti mallin kupoliin, jonka hän '
          + 'nosti sisäpihan paviljongin päälle vuonna 1859?',
        vaihtoehdot: [
          'Palatsin arkistosta löytyneistä piirustuksista',
          'Granadan tuomiokirkon holveista',
          'Persian rakennustaiteesta',
        ],
        oikea: 2,
        fakta: 'Kupoli seisoi paikallaan 75 vuotta. Leopoldo Torres '
          + 'Balbás purki sen 1934 ja teki tilalle pyramidikaton — ja '
          + 'sekin on osittain väärin, sillä sen kulmat ovat liian '
          + 'jyrkät.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * POHJUSTAA KOHTAAMISEN KYSYMYKSEN, joka Granadassa on tarinakaaren
   * paketin oma (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'granada'):
   * *"Punertava linnoitus Alhambra kohoaa Granadan yllä. Mitä sen nimi
   * tarkoittaa?"* → punaista.
   *
   * VISASÄÄNTÖ TÄYTTYY, JA SE ON TÄSSÄ TARKISTETTU RIVI RIVILTÄ.
   * Oppitunti ei sano missään, mitä nimi tarkoittaa, eikä käytä sanaa
   * al-hamra. Se kertoo aineen: mistä muuri on tehty, miksi se on sen
   * värinen kuin on, ja miksi väri näkyy juuri laaksoon päin. Sen
   * jälkeen kysymykseen on kaksi tietä — päätellä tai arvata — ja juuri
   * se on tarinakaaren luvun 6 kohdan 6 tarkoittama raja.
   *
   * MIKSI OPPITUNTI EI TOISTA LEHTEÄ: Granadan kaupunkilehti käsittelee
   * palatsia kolmesti (kipsikoristelu ja kirjoitukset, avainten
   * luovutus, hiihtokeskus näköetäisyydellä), mutta rakennusaineesta,
   * muottityöstä tai värin syystä siinä ei ole riviäkään. Sanoja
   * "tapia", "savi" tai "muotti" ei esiinny lehden yhdessäkään
   * kentässä (haku 30.8.2026).
   *
   * MIKSI OPPITUNTI EI TOISTA TÄKYJÄ: TÄKY 3 kertoo, mitä muurin
   * PÄÄLLE on 1800-luvulla lisätty; oppitunti kertoo, mitä sen SISÄLLÄ
   * on. Sama piha, eri kysymys.
   *
   * FAKTAT (kaksi artikkelia, haettu 30.8.2026):
   *   - en-Wikipedia "Alhambra" (johdanto sekä osiot "Etymology",
   *     "Architecture / General design", "Decoration" ja
   *     "Main structures / Alcazaba"): rakentaminen alkoi vuonna 1238
   *     ensimmäisen nasridihallitsijan Muhammad I Ibn al-Ahmarin
   *     aikana; paikka on Sabikan kukkula, vuorijonon uloke, jolla oli
   *     ollut linnoituksia jo aiemmin; muurit tehtiin enimmäkseen
   *     sullotusta maasta, kalkkibetonista tai tiilestä ja peitettiin
   *     sen jälkeen rappauksella, kattoihin, sisäkattoihin, oviin ja
   *     ikkunaluukkuihin käytettiin puuta, enimmäkseen mäntyä;
   *     seinien väri johtuu paikallisen saven rautaoksidista, jota
   *     tähän rakennustapaan käytettiin; suihkulähteisiin ja hoikkiin
   *     pylväisiin käytettiin valkoista marmoria Macaelista Almerían
   *     maakunnasta; kipsikoristelu, puiset sisäkatot ja
   *     marmorikapiteelit näyttävät nykyään väreiltään vaisuilta,
   *     mutta ne oli alun perin maalattu kirkkain värein: punainen,
   *     sininen ja keltaisen sijasta kulta olivat hallitsevat;
   *     kirjaimet maalattiin usein kullalla tai hopealla tai valkoisina
   *     mustin ääriviivoin, ja tausta oli usein punainen, sininen tai
   *     turkoosi; alcazaba eli sisälinnoitus on kokonaisuuden vanhin
   *     osa, sen korkein torni on 26-metrinen Torre del Homenaje ja
   *     läntisin 25-metrinen Torre de la Vela.
   *   - en-Wikipedia "Rammed earth" (johdanto sekä osiot "Building
   *     process" ja "Characteristics"): tekniikassa kostea maa-aines,
   *     jossa on sopivassa suhteessa hiekkaa, soraa, savea ja
   *     silttiä, sullotaan muottiin; ainesta kaadetaan muottiin
   *     10–25 senttimetrin kerros kerrallaan ja tiivistetään noin
   *     puoleen alkuperäisestä tilavuudestaan, ja seinä nousee näin
   *     kerros kerrallaan muotin yläreunaan; sullonta tehtiin ennen
   *     käsin pitkällä sullontapuulla, ja muotti tehtiin köysin
   *     sidotuista lankuista; sideaineina käytettiin historiallisesti
   *     esimerkiksi kalkkia; muotin voi purkaa heti seinän
   *     valmistuttua, ja puristuslujuus kasvaa kuivumisen myötä;
   *     hyvin tehty sullottu maa kestää tuhansia vuosia; suuri
   *     lämpömassa tasaa vuorokauden lämpötilanvaihtelua, sillä seinä
   *     kerää lämpöä päivällä ja luovuttaa sitä yöllä; sullotun maan
   *     seinässä on luonnonmaan väri ja pinta.
   */
  oppitunti: {
    otsikko: 'Linnoitus, joka on tehty kukkulastaan',
    teksti: 'Muuri ei ole kiveä. Suurin osa linnoituksen muureista on '
      + 'sullottua maata: kosteaa maa-ainesta, jossa on hiekkaa, soraa, '
      + 'savea ja silttiä, ja jota kaadetaan puumuottiin kymmenen tai '
      + 'kahdenkymmenen sentin kerros kerrallaan. Joka kerros '
      + 'sullotaan pitkällä puunuijalla noin puoleen tilavuudestaan, '
      + 'sitten kaadetaan seuraava. Muotin lankut sidottiin köysillä, '
      + 'ja kun osa oli valmis, muotti purettiin heti ja siirrettiin '
      + 'eteenpäin. Sekaan sekoitettiin kalkkia sitomaan. Tästä seuraa '
      + 'kaksi asiaa, joista kumpikin näkyy vielä tänään. Ensimmäinen '
      + 'on se, että kun maa-aines otetaan siitä, mihin rakennetaan, '
      + 'muurista tulee saman värinen kuin kukkulasta: tämän kukkulan '
      + 'savessa on rautaa, ja rauta antaa maalle sen ruosteisen sävyn, '
      + 'jonka näet joka kohdasta, jossa rappaus on pudonnut. Muuria ei '
      + 'siis maalattu miksikään — se on sen maan väri, jonka päällä se '
      + 'seisoo. Toinen on se, että näin paksu maaseinä varastoi '
      + 'lämpöä: se kerää sitä päivällä ja luovuttaa yöllä, ja siksi '
      + 'talossa on Andalusian helteessä siedettävää. Sisäpuoli on '
      + 'toinen tarina. Sinne tuotiin valkoista marmoria kaukaa '
      + 'Almerían Macaelista pylväiksi ja altaiksi, seinät peitettiin '
      + 'kipsikoristelulla ja katot tehtiin männystä. Ja toisin kuin '
      + 'nyt näyttää, mikään siitä ei ollut vaalean hillittyä: '
      + 'koristelu oli maalattu kirkkaaksi, hallitsevina punainen, '
      + 'sininen ja kullan keltainen, ja seinien kirjaimet kimalsivat '
      + 'kullalla ja hopealla. Isoisäsi näki niistä väreistä sen, mikä '
      + 'oli jäljellä kuudensadan vuoden jälkeen. Mutta laaksosta '
      + 'katsottuna talo ei koskaan ollut kirjava. Sieltä käsin siitä '
      + 'näkyy vain se yksi väri, jota kukkula antaa — ja juuri sen '
      + 'perusteella koko linnoitus nimettiin, kauan ennen kuin '
      + 'yhtäkään sen palatsia oli rakennettu.',
    /*
     * Commons 30.8.2026: 1600×889, CC BY-SA 3.0 es, tekijä
     * AdriPozuelo, kuvattu 30.9.2013, kuvaus "Torre de las Infantas.
     * Murallas perimetrales de la Medina de la Alhambra de Granada".
     * Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px:n esikatseluna:
     * torni rapattuna ja vaaleana keskellä, ja sen molemmin puolin
     * kehämuuri, jonka pinta on paljas ja ruosteenpunainen ja jossa
     * erottuvat vaakasuorat sullontakerrokset. Ympärillä sypressejä ja
     * pensaita. Ei ihmisiä.
     *
     * MIKSI JUURI TÄMÄ KUVA: siinä on molemmat oppitunnin asiat
     * vierekkäin samassa ruudussa — rapattu, peitetty pinta ja sen
     * vieressä sama muuri ilman rappausta, kerroksineen ja väreineen.
     * Sitä ei tarvitse uskoa, sen näkee.
     */
    kuva: {
      tiedosto: 'Torre de las Infantas, exterior, Murallas de la Medina de la Alhambra 06.jpg',
      selite: 'Torre de las Infantas ja sen molemmin puolin kehämuuri: '
        + 'rapatun tornin vieressä muurin paljas pinta näyttää sullotun '
        + 'maan vaakakerrokset ja värin.',
      lahde: 'AdriPozuelo, Wikimedia Commons (CC BY-SA 3.0 es)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * HAHMO ON KAANONIA, TEKSTI EI. Vesimestari Yusuf on tarinakaaren
   * paketissa (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'granada'):
   * hän avaa ja sulkee palatsin vanhat vesikourut samoilla avaimilla
   * kuin sukunsa vuosisatojen ajan. Alla oleva kortti on ESITTELY
   * samasta ihmisestä eikä uusi hahmo — mutta lauseet ovat tämän paketin
   * omia, ja siksi lohko on merkitty katselmoitavaksi. Kaaren repliikkiä
   * (veden ääni kertoo, jos joku liikkuu palatsissa) EI kerrata eikä
   * kiistetä tässä: sama tarina kerrotaan kerran, ja se on kaaren.
   *
   * VARSINAINEN KYSYMYS on ennallaan kaaren paketissa (Alhambran nimen
   * merkitys), eikä tämä paketti kosketa sitä.
   *
   * KAAVA (aallon 4C tilaus, sama kuin 4B:ssä): suvun jatkumo + epäusko
   * + portinvartijakysymys.
   *   - JATKUMO: sama työ, sama järjestys, samat avaimet monessa
   *     polvessa.
   *   - EPÄUSKO: Yusuf pitää suvun omaa selitystä työn merkityksestä
   *     satuna. HUOM: epäusko kohdistuu tarkoituksella siihen, mitä
   *     tämä kortti itse esittelee (ajatus veden järjestyksestä talon
   *     muistina), EI kaaren repliikkiin — muuten kortti kiistäisi
   *     kaanonin.
   *   - PORTINVARTIJAKYSYMYS: hän haluaa tietää, tietääkö tulija,
   *     mistä koko kukkula on saanut nimensä. Muotoilu on
   *     tarkoituksella sellainen, ettei se karsi yhtäkään kaaren
   *     neljästä vaihtoehdosta: kaikki neljä ovat mahdollisia
   *     vastauksia juuri tuohon kysymykseen.
   *
   * VARALLISUUSSÄÄNTÖ tarkistettu virke virkkeeltä: isoisä ei maksa
   * mitään, ei tilaa mitään eikä käske ketään. Suvun syy jatkaa on
   * suvun oma ja käytännöllinen — kourut kastelevat yhä, ja jos kukaan
   * ei tunne järjestystä, se loppuu häneen.
   *
   * ODOTUKSEN SYY ON UUSI TÄLLÄ LAUDALLA. Sevillan Amparo ja Firenzen
   * Ginevra jatkavat kumpikin siksi, että "kesken jätetty sarja on
   * pahempi kuin turha sarja" (tarinakaari luku 3: sama syy enintään
   * kahdesti / lauta). Se kiintiö on täynnä, joten Yusufin syy on eri:
   * työ on yhä välttämätöntä, ja tieto katoaa hänen mukanaan.
   *
   * KUVAA EI OLE (omistajan linjaus): kohtaamiskortissa on vain hahmo,
   * nappi, varmistus, vihjeOsio ja teksti.
   */
  kohtaaminen: {
    hahmo: 'Vesimestari Yusuf',
    nappi: 'Tapaa vesimestari',
    varmistus: 'Haluatko varmasti tavata Yusufin juuri nyt?',
    /*
     * VIHJELINKIN OSIO (omistajan pelitestipalaute v1119, kohta 13):
     * rivi kertoo, MISTÄ PÄIN LEHTEÄ ratkaisu löytyy, vastausta
     * paljastamatta, ja avaa lehden siihen osioon. Tunnus on
     * kaupunkilehden osion id (js/packs/kulttuuri-kategoriat.js,
     * granada): 'kaupunki' tai 'musiikki'. Kaaren kysymys koskee
     * linnoitusta, ja sen lähin tuki on kaupunkisivulla, jonka
     * ensimmäinen nosto käsittelee palatsia kokonaisuutena.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Yusuf kiertää kourut aamuisin samassa järjestyksessä kuin '
      + 'hänen isoisänsä kiersi, ja avaimet ovat samat: yksi on kulunut '
      + 'niin sileäksi, ettei sen urista erota enää mitään. Suvussa on '
      + 'aina sanottu, että järjestys on talon muisti ja että sen '
      + 'rikkominen sekoittaisi koko kukkulan. Yusuf sanoo suoraan '
      + 'pitävänsä sitä puhetta satuna. Kierroksen hän tekee silti joka '
      + 'aamu, koska vesi kastelee yhä rinteen puutarhat ja koska hän '
      + 'on viimeinen, joka tuntee järjestyksen ulkoa: jos hän '
      + 'lopettaa, se ei jää kirjoihin vaan häneen. Vieraita hän on '
      + 'nähnyt satoja, ja melkein jokainen kysyy ensin kullasta. Ennen '
      + 'kuin hän vie ketään kourujen luo, hän haluaa tietää, tietääkö '
      + 'tulija edes sen, mistä koko linnoitus on saanut nimensä.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin muissakin fokuskaupungeissa.
   */

  /*
   * KOHTAAMISPAIKKA: ALHAMBRA.
   *
   * 37,17634 N / −3,58821 E — es-Wikipedia "Alhambra",
   * prop=coordinates (haettu 30.8.2026). Piste on itse linnoitus, koska
   * kaaren vesimestari työskentelee sen kouruilla; erillistä
   * koordinaattia kouruille tai Leijonapihalle ei Wikipediassa ole.
   * Muunnos on sama kaava ja samat vakiot kuin fokuskohteilla:
   * maailmankartalla Millerin lieriö LEVEYS 12000 / LON0 −175 /
   * POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio),
   * Euroopan laudalla x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((−3,58821 − (−175)) mod 360) × (12000/360)
   *                     = 171,41179 × 33,3333… = 5713,7
   *                   y = (millerY(76) − millerY(37,17634)) × 12000/2π
   *                     = 1912,6
   *   europe          x = (−3,58821 + 11) × 19,2 = 142,3
   *                   y = (72 − 37,17634) × 26,3 = 915,9
   *
   * TARKISTUS LAATTOJA VASTEN — EIKÄ POIKKEAMAA OLE. Granadan laatta on
   * maailmankartalla 5713,2 / 1912,8 (js/packs/maailmankartta.js) ja
   * Euroopan laudalla 142 / 916 (js/packs/europe.js). Laskettu piste
   * osuu kummallakin laudalla käytännössä laatan päälle, joten
   * js/fokuspiste.js siirtää sen sivuun (PISTE_ERO_MIN = 14). Niin
   * pitääkin: linnoitus on kaupungin kyljessä. Sevillan ja Firenzen
   * laattapoikkeamille ei siis ole tässä vastinetta — sama kaava, joka
   * meni niissä ohi, osuu Granadassa pilkulleen, mikä on lisätodiste
   * siitä, että vika oli niiden laatoissa eikä kaavassa.
   */
  kohtaamispiste: {
    nimi: 'Alhambra',
    laudat: {
      maailmankartta: { x: 5713.7, y: 1912.6 },
      europe: { x: 142.3, y: 915.9 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Granadan sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Granada",
   * 2 = Musiikki, 3 = Menovinkit (Espanjan maapaketista, js/packs/
   * maa-kategoriat.js ESP). Kaupunkilehdellä on siis vain kaksi omaa
   * kategoriaa, mistä seuraa tämän tiedoston ainoa sivuvalintaa koskeva
   * päätös.
   *
   * KOLMAS KYSYMYS EI OLE TÄSSÄ LISTASSA: sivun 1 kysymys on Granadan
   * kulttuurivisa (js/packs/europe-kulttuuri.js, `granada`: mikä
   * Alhambra oli ennen kuin siitä tuli museo), jonka
   * js/fokustehtavat.js pukee samaksi AARTEEN AVAUS -laatikoksi ilman
   * omaa riviään täällä. Kumpi tahansa aarteen avaajista sytyttää
   * pisteen, ja jälkimmäisestä saa enää rahaa. Sama järjestely kuin
   * Firenzessä.
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js:n `granada` on
   * "Granada 1870" (kansallismonumentti ja ensimmäinen
   * korjausmääräraha), joten sivun 3 palkinto lunastaa lupauksensa
   * ilman lisätyötä.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: FALLA_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: GRANVIA_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: Vigon lahden
   * hopealasti. Merkintä aukeaa, kun aarre löytyy (js/fokusvirta.js
   * fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Täällä joka toinen mies vannoo, että maurit kätkivät '
      + 'kultansa linnan alle lähtiessään, ja joka kolmas on kaivanut '
      + 'sitä. Vanha opas nauroi heille: kaivavat väärässä päässä '
      + 'maata, sanoi hän — oikea aarre upposi meren pohjaan luoteessa, '
      + 'laivojen mukana, ja sen päällä on vettä eikä kiveä.',
  },
};
