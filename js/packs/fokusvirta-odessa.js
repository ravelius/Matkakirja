/*
 * ODESSAN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4C.
 *
 * Sisartiedosto js/packs/fokusvirta-sevilla.js:lle ja js/packs/
 * fokusvirta-marseille.js:lle: samat kentät, sama järjestys, sama
 * moottori (js/fokusvirta.js). Uusi kaupunki on yksi tiedosto ja yksi
 * rivi rekisterissä (js/packs/fokusvirrat.js) — TÄMÄ PAKETTI EI
 * KIRJOITA SITÄ RIVIÄ eikä koske sw.js:ään, savukkeisiin tai mihinkään
 * muuhun tiedostoon: aallon 4C kaupungit kokoaa integrointiagentti
 * yhtenä nostona.
 *
 * SATAMAKAUPUNKIVERROKKI ON MARSEILLE. Odessa on aallon 4C toinen
 * satamakaupunki, ja sen rakenne on tarkoituksella sama kuin
 * Marseillen: kolme täkyä, joista yksi on luonto- ja eläintäky, yksi
 * oppitunti, kohtaaminen ilman kuvaa ja kaksi lehtitehtävää.
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 30.8.2026, aallon 4C kaanonpaperi, osio
 * ODESSA). NELJÄ KENTTÄÄ ON SANATARKASTI HÄNEN: matkakirja.paikkarivi,
 * matkakirja.teksti, pollo.teksti ja aarremerkinta.teksti. Niitä ei ole
 * lyhennetty, pilkkuakaan siirretty eikä sanajärjestystä muutettu —
 * myös pollo.tekstin kaksoispiste ".." on kaanonin oma kirjoitusasu ja
 * jää sellaisenaan. Luenta on sama teksti tunnetagein; yksikään sana
 * ei vaihdu.
 *
 * ISO AARRE: hetmani Polubotokin kultakätkö — sama Ukrainan aarre kuin
 * Kiovalla (aarremerkintä alla on Odessan oma merkintä samasta
 * kätköstä, ei Kiovan toisinto: Kiovassa kirjuri kertoo hetmanista,
 * täällä satamakonttori nauraa tarinalle ja vanha kirjanpitäjä
 * lopettaa naurun).
 *
 * FAKTAPOHJA. Kaupunkilehti on jo pelissä (js/packs/
 * kulttuuri-kategoriat.js, kohta `odessa`), ja Ukrainan maalehti
 * samoin (js/packs/maa-kategoriat.js, UKR). Tämän paketin sisältö
 * nojaa kahteen lähteeseen ja vain niihin:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Kaupunkilehden omat nostot
 *      (Privozin tori, José de Ribas, oopperatalon jäähdytys,
 *      louhoskäytävät) ja lehden avauskuvien selitteet. Nämä on jo
 *      kertaalleen tarkistettu ja hyväksytty peliin, ja MOLEMMAT
 *      lehtitehtävän visat on koottu niistä ilman yhtään uutta
 *      faktaväitettä.
 *   2. TARKISTETUT LISÄTIEDOT. Kaikki muu on haettu 30.8.2026
 *      Wikipedian rajapinnasta (action=query&prop=extracts, redirects=1,
 *      NODE_USE_ENV_PROXY=1) artikkeli kerrallaan, ja jokainen väite on
 *      katsottu KAHDESTA riippumattomasta artikkelista. Kunkin kohdan
 *      oma kommentti nimeää ne. Mitään ei ole päätelty, pyöristetty
 *      eikä muistettu; kohdat, joissa lähteet eroavat, on merkitty
 *      näkyviin eikä eroa ole tasoitettu.
 *
 * ── VIISI LINJAUSTA, JOTKA MUOVAAVAT TÄMÄN TIEDOSTON ───────────────
 *
 *   1. MATKAKIRJAAN EI TULE KUVAA. `matkakirja.kuva` on jätetty pois
 *      kokonaan: kuvat kuuluvat kaupunkilehteen (js/ui.js
 *      naytaFactValokuva saa nullin).
 *   2. ÄÄNITE ON KYTKETTY. Luenta on generoitu 30.8.2026
 *      (tools/generoi-luennat.mjs, lähteenä `matkakirja.luenta`) ja
 *      `matkakirja.aanite` osoittaa siihen:
 *      assets/audio/puhe-fokus-matkakirja-odessa.mp3. Teksti ja luenta
 *      ovat sanasta sanaan samat, joten tekstin muutos vaatii uuden
 *      generoinnin.
 *   3. VALINTA-ASKELTA EI OLE. `valinta`-kenttää ei kirjoiteta;
 *      moottori lukee kentän varovasti (`data.valinta?.…`).
 *   4. KOHTAAMISKORTTI RAKENNETAAN ILMAN KUVAA. Kohtaamisessa on siis
 *      vain hahmo, nappi, varmistus, vihjeOsio ja teksti.
 *   5. TÄKYNOSTOJA EI OLE. Ukrainan pooli tulee tässä aallossa
 *      KIOVALLE (js/fokusnosto.js nostoMaanPooli lukee maan poolin
 *      silloin kun kaupungilla ei ole omaa), ja Odessa näkee siis
 *      UKR:n yhteisen poolin — se on tarkoitus, ja siksi tässä
 *      tiedostossa EI ole `takynostot`-kenttää lainkaan. Oman poolin
 *      kirjoittaminen tänne kaappaisi UKR-poolin Odessalta pois.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Vastaus löytyy syvennystekstistä, mutta kysymyksen sanamuoto ei
 * toistu siinä sellaisenaan (docs/moduulit/tarinakaari.md, luku 6).
 * OIKEAN VAIHTOEHDON PAIKKA VAIHTELEE (sama tilaus kuin Marseillessa):
 * täkyjen oikeat ovat indekseissä 1, 0 ja 1, lehtitehtävien 0 ja 0.
 * Moottori ei sekoita vaihtoehtoja (js/fokusvirta.js piirraTaky lukee
 * `oikea`-indeksin sellaisenaan), joten paikka on datan asia. Lisäksi
 * oikea EI ole pisin vaihtoehto yhdessäkään tämän tiedoston visassa —
 * se on tarinakaaren mittausvaatimus, ja se on tarkistettu käsin
 * merkkeinä.
 *
 * ── SPOILERIT: ODESSALLA ON SEITSEMÄN KYSYMYSTÄ, EI VIITTÄ ────────
 *
 * Odessalla on SEKÄ tarinakaaren paketti (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, 'odessa') ETTÄ viisi laattakysymystä
 * (js/packs/europe-questions.js, `odessa`) ETTÄ kulttuurivisa
 * (js/packs/europe-kulttuuri.js, `odessa`). Kaikki seitsemän kysymystä
 * on käyty läpi ennen kirjoittamista, ja niiden vastausrivit ovat tämän
 * paketin kieltolista:
 *
 *   K1  laatta: minkä meren rannalla → *Mustanmeren*
 *   K2  laatta: mistä rakennelmasta elokuvahistoriassa → *portaistaan*
 *   K3  laatta: mikä tekee merestä epätavallisen → *lähes hapeton syvyys*
 *   K4  laatta: mitä satamasta viedään → *viljaa*
 *   K5  laatta: mitä vietetään 1. huhtikuuta → *Humorina*
 *   K6  kaari: montako askelmaa portaikossa → *vajaat kaksisataa*
 *   K7  kulttuurivisa: miten käytävät syntyivät → *oma louhos alla*
 *
 * MITÄ TÄSTÄ SEURAA, KOHTA KOHDALTA:
 *
 *   - SANAA "MUSTAMERI" EI ESIINNY YHDESSÄKÄÄN TÄMÄN TIEDOSTON
 *     KENTÄSSÄ (K1). Meri on "meri" tai "rannikko". Sama koskee
 *     hapetonta syvyyttä ja antiikin hylkyjä (K3): niistä ei ole tässä
 *     paketissa riviäkään, vaikka aihe olisi hyvä täky — se on varattu.
 *   - PORTAIDEN ASKELMIA EI LASKETA EIKÄ NIIDEN OPTISTA TEMPPUA
 *     SELITETÄ (K6). Portaikkotäky kertoo nimistä, kivestä ja
 *     elokuvasta; luvut 200 ja 192 sekä "alhaalta vain askelmat,
 *     ylhäältä vain tasanteet" jäävät kaarikysymyksen palkinnoksi.
 *     TÄMÄ RATKAISI MYÖS PÖLLÖN KUVAN: kaupunkilehden portaikkohero
 *     olisi ollut luonteva valinta, mutta sen selite sanoo molemmat
 *     asiat ääneen, joten heroksi valittiin Vorontsovin kolonnadi.
 *   - KATAKOMBEISTA EI OLE TÄKYÄ (K7), vaikka aihe on kaupungin
 *     kuuluisin: kulttuurivisa kysyy juuri sen, ja js/fokustehtavat.js
 *     pukee sen sivun 1 AARTEEN AVAUS -laatikoksi.
 *   - VILJA-SANA VÄLTETÄÄN (K4). Kaanoninen merkintä puhuu vehnästä
 *     ("Satama on täynnä vehnää ja kieliä"), ja tämä paketti käyttää
 *     samaa sanaa, ei vastausriviä.
 *   - HUMORINASTA EI KYSYTÄ EIKÄ KERROTA (K5), vaikka lehden
 *     Arki-sivulla on siitä nosto. Sivun 2 lehtitehtävä ottaa saman
 *     sivun TOISEN noston (Privoz).
 *
 * K2 ON AINOA POIKKEUS, JA SE ON PÄÄTOIMITTAJAN OMA RATKAISU.
 * Kaanoninen pollo.teksti sanoo portaista: *"Ne portaat ovat nykyään
 * maailmankuuluja, tosin eri syystä kuin hän arvasi — sen tarinan
 * kuulet kohta."* Lupaus on kaanonissa, ja Fablen tilaus tälle
 * paketille sanoo sen auki: täky SAA kertoa Eisensteinin elokuvasta.
 * Portaikkotäky on siis se "kohta", ja se lunastaa kaanonin lupauksen.
 * Seuraus on kirjattava rehellisesti: laattakysymys K2 muuttuu
 * portaikkotäyn lukeneelle muistikysymykseksi. Tämä on raportoitu
 * Fablelle erikseen — paketti ei tee ratkaisua itse, se toteuttaa sen.
 * Minivisa on silti kierretty pois vastausriviltä: se kysyy portaiden
 * NIMEN vaihtumisen vuotta, ei sitä, mistä kaupunki tunnetaan.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta 30.8.2026
 * (olemassaolo, koko, mime, lisenssi, tekijä, kuvaus, Restrictions) —
 * ei arvattuja nimiä. Kaikki ovat PD tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä, koska CC BY-SA vaatii maininnan. JOKAINEN on lisäksi
 * katsottu silmin 960 pikselin esikatseluna, ja havainto on kirjattu
 * kunkin kuvan omaan kommenttiin.
 *
 * YKSIKÄÄN NELJÄSTÄ EI OLE VIELÄ PELISSÄ. Odessan lehti ja
 * nähtävyysjutut käyttävät portaista ja oopperatalosta omia
 * tiedostojaan (js/packs/nahtavyysjutut.js, js/packs/
 * kulttuuri-kategoriat.js), ja ne on tarkistettu erikseen, jottei sama
 * kuva latoisi itseään kahdesti saman käynnin aikana.
 *
 * LOISTOAIKAKUVIA EI OLE. Aallon 1 malli (pääkuvaksi repon oma
 * generoitu havainnekuva, entinen kuva `valokuva`-kenttään) vaatisi
 * generointiajon, jota tälle aallolle ei ole tehty. Sama ratkaisu kuin
 * Sevillassa ja Marseillessa: yksi kuva per kortti, `tiedosto`-kenttä.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * Kysymykset ovat vakioina samasta syystä kuin Sofiassa, Madridissa,
 * Sevillassa ja Marseillessa: lista tiedoston lopussa lukee ne
 * muuttujista, jolloin uusi käyttö ei koskaan johda kahteen erilleen
 * ajautuvaan kopioon.
 *
 * SISÄLTÖ ON LEHDEN OMAA. Privoz-kysymys on Odessan lehden Arki ja
 * tavat -sivun oman noston "Privozilla hinta on keskustelu" tekstiä ja
 * de Ribas -kysymys kaupunkisivun oman noston "Perustaja tuli
 * Napolista" tekstiä (js/packs/kulttuuri-kategoriat.js, odessa).
 * Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI HUMORINA-KYSYMYSTÄ, vaikka lehdessä on siitä nosto: ks.
 * SPOILERIT yllä (K5). MIKSI EI KATAKOMBIKYSYMYSTÄ: se on jo Odessan
 * kulttuurivisa (js/packs/europe-kulttuuri.js, odessa), jonka
 * js/fokustehtavat.js pukee sivun 1 AARTEEN AVAUS -laatikoksi ilman
 * omaa riviään täällä. Sama kysymys kahdessa laatikossa olisi tupla.
 */
const PRIVOZ_VISA = {
  kysymys: 'Odessan suurimmalla ruokatorilla hinta ei ole lappu vaan '
    + 'jotain muuta. Mitä?',
  vaihtoehdot: [
    'Keskustelu, jonka lopputulos jää myyjän ja ostajan väliin',
    'Torin oma taulu, jota tarkistetaan kolmesti päivässä',
    'Kaupungin virallinen enimmäishinta, jonka yli ei saa mennä',
  ],
  oikea: 0,
  fakta: 'Privoz alkoi vuonna 1827 hevoskärryjen takalaidoilta ja on yhä '
    + 'Odessan suurin ruokatori. Myyjä sanoo hinnan, ostaja nauraa, ja '
    + 'lopullinen summa jää jonnekin siltä väliltä — tinkiminen ei ole '
    + 'täällä epäkohteliasta vaan osa kaupantekoa. Tiskeillä on suolattua '
    + 'silliä ja forshmakia, kaupungin juutalaisesta keittiöstä tullutta '
    + 'sillitahnaa.',
};

const DERIBAS_VISA = {
  kysymys: 'Odessan vilkkain kävelykatu on nimetty kaupungin perustajan '
    + 'mukaan. Mistä hän oli kotoisin?',
  vaihtoehdot: [
    'Napolista',
    'Marseillesta',
    'Lissabonista',
  ],
  oikea: 0,
  fakta: 'José de Ribas syntyi Napolissa espanjalaisen konsulin poikana ja '
    + 'siirtyi Venäjän palvelukseen. Hän valtasi vuonna 1789 Hadžibein '
    + 'linnakkeen ja ehdotti keisarinna Katariina II:lle satamaa samalle '
    + 'rantatörmälle; käsky annettiin 27. toukokuuta 1794. Kävelykatu on '
    + 'yhä Derybasivska eli de Ribasin katu.',
};

export const FOKUSVIRTA_ODESSA = {
  kaupunki: 'odessa',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan, ei omaa säälisäystä. */
    paikkarivi: 'Odessa, elokuussa 1873',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Satama on täynnä vehnää ja kieliä: kreikkalainen laskee lastia '
      + 'italiaksi, juutalainen kirjuri kääntää sen venäjäksi ja ranskaksi, '
      + 'ja kaikki ymmärtävät toisiaan rahasta puhuttaessa. Rannasta '
      + 'kaupunkiin nousevat portaat, joiden päästä ei näe alas satamaan — '
      + 'vain meren. Oopperatalo paloi talvella, ja siitä puhutaan kuin '
      + 'kuolleesta sukulaisesta: joka päivä, ja aina hyvää.',
    /*
     * Luenta on sama teksti tunnetagein — sanat eivät muutu (Raamattu:
     * ruututeksti = luentateksti sanasta sanaan). Kolme tagia, alku ja
     * loppu eri sävyssä.
     */
    luenta: '[excited] Satama on täynnä vehnää ja kieliä: kreikkalainen '
      + 'laskee lastia italiaksi, juutalainen kirjuri kääntää sen venäjäksi '
      + 'ja ranskaksi, ja kaikki ymmärtävät toisiaan rahasta puhuttaessa. '
      + '[curious] Rannasta kaupunkiin nousevat portaat, joiden päästä ei '
      + 'näe alas satamaan — vain meren. [softly] Oopperatalo paloi '
      + 'talvella, ja siitä puhutaan kuin kuolleesta sukulaisesta: joka '
      + 'päivä, ja aina hyvää.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-odessa.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Raamattu, "LIVIA AIKASIIRTYMÄN VÄLITTÄJÄNÄ").
     * Piirtyy kuplan ENSIMMÄISEKSI kappaleeksi, heti isoisän merkinnän
     * perään (js/fokusvirta.js piirraPollo); kanoninen `teksti` seuraa
     * sen jälkeen.
     *
     * MIKSI KIELET EIKÄ SATAMA, PORTAAT TAI OOPPERA: kaanoninen `teksti`
     * ottaa heti perään oopperan ja portaat, ja oppitunti ottaa
     * vapaasataman eli sen SYYN, miksi kieliä oli. Merkinnän
     * ensimmäinen virke — ne kielet sataman lastilistoilla — jää muuten
     * kokonaan vastaamatta nykypäivän puolelta. Maadoitus vastaa
     * siihen ja luovuttaa vuoron oopperalle viimeisellä virkkeellään,
     * jotta kaanonin avaus jatkaa suoraan siitä.
     *
     * PUHEKIELIPASSI (Raamattu, "LIVIAN PUHEKIELI", sääntö 1 PAINOPISTE
     * REUNOILLA): lyhentymät ovat vain alussa ("Hei että") ja lopussa
     * ("kannattaa kuulla"), keskellä sanat ovat auki; pronominit
     * kokonaisina; ei huutomerkkejä.
     *
     * FAKTAKURI: kolme väitettä, kaikki tarkistettuja. (1) Kaupungin
     * kartalla on yhä Kreikan tori ja Ranskan bulevardi — uk-Wikipedia
     * "Одеса" (osio arkkitehtuurista: "Грецька площа", "Французький
     * бульвар") ja en-Wikipedia "Odesa" (osio "Foundation…": luettelo
     * kansojen mukaan nimetyistä kaduista ja bulevardeista). (2)
     * Vilkkain kävelykatu kantaa perustajan nimeä — pelin oma
     * kuratoitu aineisto (js/packs/kulttuuri-kategoriat.js, odessa/
     * kaupunki, nosto "Perustaja tuli Napolista"). (3) Väkeä muutti
     * kaupunkiin kymmenistä maista — pelin oma aineisto
     * (js/packs/europe-questions.js, odessa-artikkelirivi) ja
     * en-Wikipedia "Odesa" (vapaasataman ajan väestöluettelo).
     *
     * EI SPOILERIA: perustajan nimeä eikä syntymäkaupunkia ei sanota,
     * koska juuri se on sivun 3 JULISTE-tehtävän kysymys (DERIBAS_VISA).
     */
    maadoitus: 'Hei että. Ne kielet eivät ole kadonneet minnekään, ne ovat '
      + 'vaan siirtyneet katukilpiin: kaupungin kartalla on yhä Kreikan '
      + 'tori ja Ranskan bulevardi, ja vilkkain kävelykatu kantaa '
      + 'perustajansa nimeä. Väkeä muutti tänne aikoinaan kymmenistä '
      + 'maista, ja jokainen jätti jälkeensä osoitteen. Isoisäsi kuuli ne '
      + 'kielet työssä, sinä luet ne kilvistä. Ja siitä palaneesta talosta '
      + 'sinun kannattaa kuulla tarkemmin.',
    /*
     * KAANON (Fable) — Livian nykypäivän huomio sellaisenaan. Kaksi
     * pistettä ensimmäisen virkkeen lopussa on kaanonin oma kirjoitusasu.
     */
    teksti: 'Isoisäsi osui suoraan kaupungin haavaan — se palanut ooppera '
      + 'rakennettiin uusiksi vasta parikymmentä vuotta myöhemmin, ja '
      + 'uudesta tuli niin komea että sitä käydään katsomassa vaikkei '
      + 'menisi näytökseen.. Ne portaat ovat nykyään maailmankuuluja, '
      + 'tosin eri syystä kuin hän arvasi — sen tarinan kuulet kohta. '
      + 'Satamaan ensin.',
    /*
     * PÖLLÖN KUVA ON KAUPUNKILEHDEN HEROKUVA (omistajan linjaus): tämä
     * on Odessan avauskarusellin kolmas generoitu hero
     * (js/packs/kulttuuri-kategoriat.js, odessa/avauskuvat). Selite on
     * saman avauskuvan selite sellaisenaan — se on jo yksi virke,
     * eikä yksikään luku tai nimi muutu.
     *
     * MIKSI EI PORTAIKKOHEROA, vaikka se sopisi kaanonin viimeiseen
     * virkkeeseen ("Satamaan ensin") täydellisesti: sen selite kertoo
     * sekä askelmien määrän että portaiden optisen tempun, ja molemmat
     * ovat tarinakaaren laattakysymyksen vastaus ja sen faktarivi
     * (ks. SPOILERIT, K6). Kuva piirtyy tässä kohtaa virtaa, siis ENNEN
     * kysymystä, joten se olisi suora spoileri.
     *
     * MIKSI JUURI KOLONNADI: Vorontsovin palatsin kaareva pylväikkö
     * seisoo sillä samalla törmän reunalla, jolta portaat laskeutuvat
     * satamaan — se on kuva siitä paikasta, johon Livia on juuri
     * lähdössä, ilman että portaita itseään selitetään. Lisäksi sama
     * ruhtinas Vorontsov, joka rakennutti kolonnadin, rakennutti myös
     * portaikon; yhteyttä ei kerrota tässä, vaan portaikkotäyssä.
     */
    kuva: {
      ampari: 'herokoe/hero-odessa-keskipaiva.jpg',
      selite: 'Vorontsovin palatsi ja sen kaareva kolonnadi rakennettiin '
        + '1827–1830 ruhtinas Mihail Vorontsoville sardinialaissyntyisen '
        + 'Francesco Boffon piirustusten mukaan turkkilaisen Hacıbeyn '
        + 'linnoituksen paikalle.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: kaanoninen pollo.teksti lupaa sen suoraan —
       * *"Ne portaat ovat nykyään maailmankuuluja, tosin eri syystä
       * kuin hän arvasi — sen tarinan kuulet kohta."* Tämä on se
       * "kohta". Isoisä näki portaikon kolmekymmentäkaksivuotiaana ja
       * kirjasi siitä vain mittasuhteen; maailmanmaine tuli
       * viisikymmentä vuotta myöhemmin eikä kivestä vaan filmistä.
       *
       * MITÄ TÄKY EI TEE: se ei laske askelmia eikä selitä optista
       * temppua (ks. SPOILERIT, K6) — molemmat ovat tarinakaaren
       * laattakysymyksen vastaus ja faktarivi. Se ei myöskään kerro
       * kapinasta enempää kuin nimen vaihtumisen ymmärtämiseen
       * tarvitaan: peli ei käsittele sotaa eikä väkivaltaa (Raamattu,
       * kunnioitussäännöt), ja elokuvan kohtaus käsitellään
       * ELOKUVAKERRONTANA — leikkauksena, ei tapahtumana.
       *
       * FAKTAT (kaksi riippumatonta artikkelia, haettu 30.8.2026):
       *   - en-Wikipedia "Potemkin Stairs" (johdanto sekä osiot
       *     "Construction" ja "Later history"): portaikko rakennettiin
       *     1837–1841; ruhtinas Mihail Vorontsov teetti sen lahjaksi
       *     vaimolleen Elżbietalle ja tuekseen kaupungin
       *     yläpuolella asuvalta väeltä; hinta oli 800 000 ruplaa;
       *     suunnittelijoina Francesco Boffo sekä Avraam Melnikov ja
       *     Pot'e; englantilainen insinööri John Upton valvoi työtä;
       *     portaikko tunnettiin aiemmin nimillä Bulevardin portaat,
       *     Jättiläisportaikko ja Richelieun portaat; eroosion takia
       *     hiekkakivi vaihdettiin 1933 ruusunharmaaseen graniittiin ja
       *     tasanteet päällystettiin asfaltilla; portaikko tuli
       *     kuuluisaksi Sergei Eisensteinin mykkäelokuvasta vuodelta
       *     1925; vuonna 1955 Primorskin portaat nimettiin uudelleen
       *     Potjomkinin portaiksi kapinan viisikymmenvuotispäivän
       *     kunniaksi, ja Ukrainan itsenäistyttyä 1991 vanha nimi
       *     palautettiin viralliseksi; 11. heinäkuuta 2015 Euroopan
       *     elokuva-akatemia kiinnitti portaisiin muistolaatan.
       *   - uk-Wikipedia "Потьомкінські сходи" (johdanto sekä osiot
       *     "Історія Приморських сходів" ja "1905 рік і Сергій
       *     Ейзенштейн"): samat vuodet 1837–1841, sama 800 000 ruplaa,
       *     sama lahja vaimolle, sama Upton (Ю. Морозovin kanssa);
       *     samat vanhat nimet; sama graniittivaihto 1933; sama
       *     uudelleennimeäminen 1955 ja sama muistolaatta 2015; lisäksi
       *     Mark Twain vieraili kaupungissa ja kirjoitti portaista
       *     kirjassaan 1869 kutsuen niitä jättiläisportaiksi; ja —
       *     tämän täyn ydin — Eisenstein kokosi portaikkokohtaukseen
       *     sen, mikä oli tapahtunut eri puolilla kaupunkia, eli teki
       *     yleiskuvan eikä paikan päällä tapahtunutta kuvausta.
       *   - Kolmantena, VAIN Eisenstein-kohdan vahvistukseksi:
       *     en-Wikipedia "Battleship Potemkin" (osio "The Odessa Steps
       *     sequence"): kohtaus ei tapahtunut portailla sellaisena kuin
       *     se on kuvattu, ja Roger Ebertiä lainaten juuri siksi on
       *     ironista, että siitä puhutaan yhä kuin se olisi tapahtunut.
       *     Mark Twainin vierailuvuosi 1867 on lisäksi uk-Wikipedian
       *     "Одеса"-artikkelissa (osio kuuluisista vierailijoista).
       *
       * MITÄ EI KERROTA: vuoden 1905 tapahtumien kulku, uhriluvut eikä
       * elokuvan kohtauksen yksityiskohdat. 13+ sallii vaaran, mutta
       * tämä ei ole vaaraa vaan väkivaltaa, eikä se ole tämän täyn
       * asia. Myöskään en-Wikipedian väitettä siitä, että Upton oli
       * paennut Britanniasta takuita vastaan, ei kerrota: sitä ei
       * toista kumpikaan muu artikkeli, ja yhden lähteen henkilöväite
       * ei kuulu peliin.
       */
      id: 'portaat',
      nappi: 'Portaikko, joka sai nimensä elokuvasta',
      otsikko: 'Portaat, joilla kuvattiin',
      teksti: 'Kun isoisäsi nousi rannasta kaupunkiin, portaikko oli '
        + 'kolmekymmentäkaksivuotias ja täysin tuntematon maailmalla. Se '
        + 'rakennettiin vuosina 1837–1841, ja sen teetti ruhtinas Mihail '
        + 'Vorontsov: virallisesti lahjaksi vaimolleen Elżbietalle, '
        + 'käytännössä myös siksi, että kaupungin varakkain väki asui '
        + 'törmän päällä ja pääsi satamaan vain kiemurtelevia polkuja ja '
        + 'karkeita puuportaita pitkin. Hinta oli kahdeksansataatuhatta '
        + 'ruplaa. Piirustukset '
        + 'teki Francesco Boffo kahden muun kanssa, ja työmaata valvoi '
        + 'englantilainen insinööri John Upton. Nimiä portaikolla oli '
        + 'isoisäsi aikaan kolme, eikä yksikään niistä ollut nykyinen: '
        + 'sitä sanottiin Bulevardin portaiksi, Richelieun portaiksi ja '
        + 'useimmiten yksinkertaisesti Jättiläisportaiksi. Mark Twain kävi '
        + 'täällä kuusi vuotta ennen isoisääsi ja käytti kirjassaan juuri '
        + 'sitä sanaa. Sitten tuli vuosi 1925. Ohjaaja Sergei Eisenstein '
        + 'kuvasi portailla mykkäelokuvansa kuuluisimman jakson, ja siitä '
        + 'tuli elokuvan leikkauksen oppikirjaesimerkki: lastenvaunut, '
        + 'jotka vierivät askelmia alas, ovat luultavasti maailman '
        + 'siteeratuin kuva-aihe. Ja tässä on se kohta, joka isoisääsi '
        + 'kiinnostaisi eniten, koska hän oli mies joka tarkisti asiat. '
        + 'Kohtaus ei ole kuvaus tapahtuneesta. Eisenstein kokosi siihen '
        + 'sen, mitä oli tapahtunut eri puolilla kaupunkia kaksikymmentä '
        + 'vuotta aiemmin, ja teki niistä yhden yleiskuvan yhdelle '
        + 'portaikolle. Elokuvakriitikko Roger Ebert kirjoitti tästä '
        + 'myöhemmin, että kohtaus on tehty niin hyvin, että siitä '
        + 'puhutaan yhä kuin se olisi oikeasti tapahtunut näillä '
        + 'askelmilla. Portaikko itse on sillä välin uusittu kerran: '
        + 'eroosio söi alkuperäisen kiven, ja vuonna 1933 tilalle '
        + 'ladottiin ruusunharmaa graniitti ja tasanteet päällystettiin '
        + 'asfaltilla. Nimi vaihtui vasta 1955. Vuonna 1991 kaupunki '
        + 'palautti viralliseksi nimeksi vanhan Primorskin portaat, mutta '
        + 'puhekielessä nimi ei ole vaihtunut takaisin, eikä luultavasti '
        + 'vaihdu: heinäkuussa 2015 Euroopan elokuva-akatemia kiinnitti '
        + 'portaisiin muistolaatan, jonka mukaan tämä on eurooppalaisen '
        + 'elokuvan aarre.',
      /*
       * Commons 30.8.2026: 5018×3165, image/jpeg, CC BY-SA 4.0, tekijä
       * Oleksandr Malyon, kuvattu 16.8.2020, kuvaus "Potemkin Stairs in
       * Odessa, Ukraine". Restrictions tyhjä. SILMÄTARKISTUS tehty
       * 960 px:n esikatselusta: portaikko alhaalta ylös kesäpäivänä,
       * leveä kiviporras nousee puiden reunustamana, ylhäällä
       * pylväikkö ja Richelieun patsas, sivuilla katulyhtyjä. Kuvassa
       * on kymmenkunta kaukaista kulkijaa, ei tunnistettavia kasvoja.
       *
       * MIKSI JUURI TÄMÄ KUVA: se on kuvattu portaiden juurelta, eli
       * siitä samasta kohdasta, josta isoisä katsoi ylös. Kuva EI myy
       * optista temppua kuvatekstissä eikä laske askelmia (ks.
       * SPOILERIT, K6); se näyttää vain rakennelman koon. Odessan lehti
       * ja nähtävyysjutut käyttävät portaista neljää muuta tiedostoa,
       * joten sama kuva ei toistu käynnin aikana.
       */
      kuva: {
        tiedosto: 'Потьомкінські сходи 11.jpg',
        selite: 'Portaikko nousee satamasta kaupunkiin, ja sen yläpäässä '
          + 'seisoo herttua Richelieun patsas; kivi on vuoden 1933 '
          + 'graniittia, ei alkuperäistä.',
        lahde: 'Oleksandr Malyon, Wikimedia Commons (CC BY-SA 4.0)',
      },
      visa: {
        kysymys: 'Portaikkoa sanottiin isoisäsi aikaan Jättiläisportaiksi. '
          + 'Milloin se sai nykyisen nimensä?',
        vaihtoehdot: [
          'Vuonna 1925, heti elokuvan ensi-illan jälkeen',
          'Vuonna 1955, viisikymmentä vuotta kapinan jälkeen',
          'Vuonna 1905, kapinakesänä, kun laiva tuli satamaan',
        ],
        oikea: 1,
        fakta: 'Nimi tuli kolmekymmentä vuotta elokuvan jälkeen. Vuonna 1991 '
          + 'kaupunki palautti viralliseksi nimeksi vanhan Primorskin '
          + 'portaat, mutta puhekieli ei tottele: vuonna 2015 portaisiin '
          + 'kiinnitettiin Euroopan elokuva-akatemian muistolaatta.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: kaanoninen merkintä päättyy virkkeeseen
       * *"Oopperatalo paloi talvella, ja siitä puhutaan kuin kuolleesta
       * sukulaisesta"*, ja Livia jatkaa siitä. Kumpikaan ei kerro,
       * MILLOIN talvella — ja juuri se on aallon 4C Odessan ankkuri:
       * palo oli tammikuun toisena yönä 1873, eli isoisän merkintä on
       * seitsemän kuukautta tuore. Täky on siis se kohta, jossa
       * merkinnän päiväys alkaa merkitä jotain.
       *
       * MITÄ TÄKY EI TEE: se ei nimeä arkkitehtien kansallisuuksia
       * (Fablen tilauksen nimenomainen rajaus), eikä se toista
       * kaupunkilehden nostoa "Oopperataloa jäähdytettiin jäällä" —
       * jää, sähkövalot ja liikkuva maapohja ovat lehden omaa sisältöä
       * (js/packs/kulttuuri-kategoriat.js, odessa/kaupunki), ja tämä
       * täky kertoo sen, mitä lehti EI kerro: palon yön, sitä edeltäneen
       * kahden päivän ja neljäntoista vuoden tyhjän ajan.
       *
       * FAKTAT (kaksi riippumatonta artikkelia, haettu 30.8.2026):
       *   - en-Wikipedia "Odesa Opera and Ballet Theatre" (johdanto ja
       *     osio "History"): ensimmäinen teatteri avattiin 10. helmikuuta
       *     1810; alkuperäisen suunnitelman teki Francesco Frapolli ja
       *     sitä muokkasi Jean-François Thomas de Thomon; pääsisäänkäynti
       *     pylväikköineen oli merelle päin eikä lämpiötä ollut; talo
       *     paloi tyhjäksi tammikuun toisen päivän yönä 1873; heti
       *     alkoi varainkeruu, kaupunki julisti kansainvälisen
       *     suunnittelukilpailun, jätettyjä ehdotuksia oli neljäkymmentä
       *     eikä yhtäkään valittu; lopulta esikuvaksi otettiin Dresdenin
       *     ooppera; peruskivi laskettiin 16. syyskuuta 1884; talo
       *     valmistui 1. lokakuuta 1887 ja maksoi 1 300 000 ruplaa; se
       *     oli Odessan ensimmäinen sähkövaloin varustettu rakennus;
       *     hevosenkengän muotoisen salin akustiikka kantaa kuiskauksen
       *     joka nurkkaan; talo seisoo liikkuvalla maapohjalla ja
       *     ensimmäiset halkeamat tulivat lähes heti; vuonna 1925 talo
       *     paloi uudelleen, ja tuolloin tuhoutui alkuperäinen esirippu,
       *     jota ei koskaan palautettu.
       *   - ru-Wikipedia "Одесский театр оперы и балета" (johdanto sekä
       *     osiot rakennuksen vaiheista ja restauroinneista): sama
       *     avajaispäivä 10.2.1810; VIIMEISEN MUUTOSTYÖN VALMISTUMINEN
       *     31. joulukuuta 1872 ja palo yöllä 2. tammikuuta 1873, syynä
       *     kelloa yöllä valaissut kaasuliekki; talossa nukkui ihmisiä,
       *     eikä kukaan heistä loukkaantunut; palosta peruskiven
       *     laskuun kului lähes yksitoista vuotta; uusi talo avattiin
       *     1. lokakuuta 1887; maaliskuun 1925 palossa tuhoutui näyttämö
       *     ja sali vaurioitui, ja teatteri palasi käyttöön vuodessa;
       *     vuosina 1955–1956 perustus vahvistettiin valamalla siihen
       *     nestemäistä lasia; syksyllä 2007 valmistui pitkä restaurointi,
       *     jossa perustus tuettiin 1 800 paalulla.
       *
       * LÄHTEET EROAVAT KAHDESSA KOHDASSA, EIKÄ NIITÄ OLE TASOITETTU:
       * en sanoo vuoden 1925 palon tuhonneen näyttämön ja orkesterimontun
       * ja ru näyttämön sekä vaurioittaneen salia (teksti sanoo vain
       * "näyttämö tuhoutui"), ja perustuksen vahvistuksen määrä on
       * uk-artikkelissa noin kuusi miljoonaa litraa nestemäistä lasia
       * mutta ru-artikkelissa määrää ei anneta — litramäärää ei siksi
       * mainita tekstissä lainkaan.
       *
       * KAKSI LUKUA ON VAIN YHDESTÄ ARTIKKELISTA, ja se on kirjattu
       * tähän: vuoden 2007 restauroinnin 1 800 paalua on vain
       * ru-artikkelissa, samoin kilpailuun jätettyjen ehdotusten määrä
       * neljäkymmentä vain en-artikkelissa. Molemmat ovat rakennuksen
       * omia lukuja eivätkä henkilöväitteitä, joten ne ovat mukana —
       * mutta jos jompikumpi joudutaan pudottamaan, se voidaan tehdä
       * koskematta muuhun tekstiin.
       */
      id: 'ooppera',
      nappi: 'Talo, joka paloi kaksi päivää remontin jälkeen',
      otsikko: 'Neljätoista vuotta ilman oopperataloa',
      teksti: 'Kaupungin ensimmäinen teatteri avattiin 10. helmikuuta 1810. '
        + 'Se oli suunniteltu niin, että pylväiköllinen pääsisäänkäynti '
        + 'katsoi merelle päin — lämpiötä ei ollut lainkaan, vaan väki '
        + 'astui suoraan ulkoa saliin. Talo palveli kuusikymmentäkolme '
        + 'vuotta, ja viimeinen muutostyö valmistui 31. joulukuuta 1872. '
        + 'Kaksi päivää myöhemmin, yöllä toista tammikuuta, se paloi '
        + 'tyhjäksi. Syy oli kaasuliekki, joka jätettiin yöksi palamaan '
        + 'valaisemaan kelloa. Talossa nukkui ihmisiä, eikä kukaan heistä '
        + 'loukkaantunut. Kun isoisäsi kirjoitti merkintänsä elokuussa, '
        + 'palosta oli siis seitsemän kuukautta — kaupunki puhui siitä '
        + 'joka päivä, koska se oli tuore. Ja se puhui siitä vielä '
        + 'neljätoista vuotta. Varainkeruu alkoi heti ja kaupunki julisti '
        + 'kansainvälisen suunnittelukilpailun, johon tuli neljäkymmentä '
        + 'ehdotusta. Yhtäkään ei valittu. Lopulta esikuvaksi otettiin '
        + 'Dresdenin ooppera, jonka lämpiö kiertää katsomon kaarta, ja '
        + 'peruskivi laskettiin vasta 16. syyskuuta 1884 — yli yksitoista '
        + 'vuotta palon jälkeen. Uusi talo avattiin 1. '
        + 'lokakuuta 1887. Se maksoi miljoona kolmesataatuhatta ruplaa, ja '
        + 'siitä kerrotaan, että kun odessalaiset kuulivat summan he '
        + 'haukkoivat henkeään, ja kun he näkivät talon he haukkoivat '
        + 'toisen kerran. Hevosenkengän muotoinen sali kantaa kuiskauksen '
        + 'lavalta viimeiselle riville asti. Ja tässä on se kohta, jonka '
        + 'isoisäsi olisi alleviivannut: tulipalo ei ollut talon viimeinen. '
        + 'Maaliskuussa 1925 näyttämö paloi uudelleen, ja silloin '
        + 'tuhoutui alkuperäinen esirippu, jota ei ole koskaan tehty '
        + 'takaisin. Talo ei myöskään seiso vakaalla maalla: ensimmäiset '
        + 'halkeamat ilmestyivät perustukseen lähes heti avajaisten '
        + 'jälkeen, perustusta on vahvistettu valamalla siihen '
        + 'nestemäistä lasia 1950-luvulla, ja vuonna 2007 valmistuneessa '
        + 'restauroinnissa sen alle ajettiin tuhat kahdeksansataa paalua. '
        + 'Kaupunki on korjannut tätä taloa pidempään kuin se odotti sitä.',
      /*
       * Commons 30.8.2026: 3717×3808, image/jpeg, CC BY-SA 3.0, tekijä
       * Alex Levitsky & Dmitry Shamatazhi, kuvattu 29.1.2013, kuvaus
       * "Audience hall of Odesa Opera and Ballet Theatre (1887, Büro
       * Fellner & Helmer, architectural monument of the national
       * significance №549)". Restrictions tyhjä. SILMÄTARKISTUS tehty
       * 960 px:n esikatselusta: tyhjä katsomo näyttämöltä kuvattuna,
       * hevosenkengän muotoiset parvet kolmessa kerroksessa,
       * kullattu koristelu, kattokruunu ja neljä kattomaalausta,
       * punaiset penkit. Ei ihmisiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: täky päättyy siihen, että kaupunki
       * odotti tätä salia neljätoista vuotta, ja kuva on juuri se sali —
       * kuvattuna lavalta, eli siitä suunnasta, josta kuiskaus lähtee.
       * Odessan nähtävyysjutut käyttävät salista toista tiedostoa
       * (The auditorium of the Odessa Opera House 01.jpg), joten sama
       * kuva ei toistu käynnin aikana.
       */
      kuva: {
        tiedosto: 'Театр оперы и балета. Зал.jpg',
        selite: 'Vuonna 1887 avatun oopperatalon hevosenkengän muotoinen '
          + 'katsomo kantaa kuiskauksen lavalta viimeiselle riville asti.',
        lahde: 'Alex Levitsky & Dmitry Shamatazhi, Wikimedia Commons '
          + '(CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Isoisäsi kirjoitti elokuussa 1873, että oopperatalo "paloi '
          + 'talvella". Milloin palo oli?',
        vaihtoehdot: [
          'Tammikuun toisen päivän yönä',
          'Edellisenä jouluna, joulukuussa 1872',
          'Helmikuun lopulla, laskiaisviikolla',
        ],
        oikea: 0,
        fakta: 'Vuoden 1810 teatterin viimeinen muutostyö valmistui 31. '
          + 'joulukuuta 1872, ja kaksi päivää myöhemmin talo paloi tyhjäksi '
          + 'kelloa valaisseen kaasuliekin takia. Kaupunki oli neljätoista '
          + 'vuotta ilman oopperataloa: uusi avattiin 1. lokakuuta 1887.',
      },
    },
    {
      /*
       * ELÄIN- JA LUONTOTÄKY (Raamatun linjaus: täkyihin myös
       * eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: aarremerkintä puhuu tynnyristä, joka lähti
       * liikkeelle meren kautta. Tämä on saman rannikon toinen vesi ja
       * päinvastainen: lahti, joka ei laske minnekään, ja johon jää
       * kaikki mikä siihen joutuu — myös suola. Isoisä mittasi kaiken;
       * tässä lahdessa on mitattavaa kolmen ihmisiän verran, ja
       * lukemat heittelevät niin, ettei niitä uskoisi.
       *
       * MIKSI EI KATAKOMBIA TAI MEREN SYVYYKSIÄ luontotäyksi: molemmat
       * ovat varattuja kysymyksiä (ks. SPOILERIT, K7 ja K3).
       *
       * FAKTAT (kaksi riippumatonta artikkelia, haettu 30.8.2026):
       *   - uk-Wikipedia "Куяльницький лиман" (johdanto sekä osiot
       *     "Загальна характеристика", "Біота лиману та його берегів",
       *     "Історія" ja "Куяльницький грязьовий курорт"): lahti on
       *     Odessan pohjoispuolella, pinta-ala 52–60 km², pituus 28 km,
       *     leveys yli 3 km, keskisyvyys noin metri; se on erotettu
       *     merestä enintään kolmen kilometrin levyisellä
       *     hiekkakannaksella, ja irtautuminen tapahtui noin
       *     1300-luvulla; lähistöllä on Ukrainan alin kohta, viisi
       *     metriä merenpinnan alapuolella; suolapitoisuus vaihteli
       *     mittausjaksolla 1878–1968 välillä 29–269 promillea, ja
       *     suolaisimpina vuosina suolaa saostui pohjalle; kuivina
       *     vuosina pinta-ala pieneni lähes puoleen, ja vuosina 1907 ja
       *     1925 lahteen laskettiin merivettä kaivettuja kanavia
       *     pitkin; bakteerien lisäksi lahdessa elää vain kaksi lajia,
       *     artemia-äyriäinen ja surviaissääsken toukka, ja
       *     lisääntymisaikaan äyriäisiä on niin paljon että vesi
       *     punertuu ja aallot heittävät niitä rannalle paksuksi
       *     kerrokseksi; keskiajalla lahti oli suuri suolanottopaikka;
       *     mutakylpylä perustettiin 1834 Erast Andrijevskyin
       *     toimesta; 1.1.2022 alkaen alue kuuluu kansallispuistoon.
       *   - ru-Wikipedia "Куяльницкий лиман" (johdanto sekä osiot
       *     "Формирование лимана" ja "Природа"): samat mitat, sama
       *     kannas, sama irtautuminen 1300-luvulla, sama Ukrainan alin
       *     kohta, sama mittausjakso ja sama vaihteluväli 29–269
       *     promillea, sama saostuminen, samat kanavavuodet (ja lisäksi
       *     2014), samat kaksi lajia ja sama punertuva vesi, sama
       *     lahden merkitys talvehtiville vesilinnuille.
       *
       * LÄHTEET EROAVAT YHDESSÄ KOHDASSA, EIKÄ SITÄ OLE TASOITETTU:
       * uk sanoo, ettei vesi jäädy "edes kovimmilla pakkasilla", ru
       * sanoo, ettei se jäädy "vähäisillä pakkasilla". Teksti ja
       * faktarivi sanovat siksi "tavallisilla pakkasilla", joka mahtuu
       * molempien sisään. Nykysuolapitoisuudesta ru sanoo yli 300
       * promillea; lukua ei mainita, koska uk ei toista sitä.
       */
      id: 'kuyalnyk',
      nappi: 'Lahti, joka ei jäädy ja jonka vesi punertuu',
      otsikko: 'Kuyalnykin lahti',
      teksti: 'Kahdeksan kilometrin päässä kaupungin keskustasta pohjoiseen '
        + 'on vesi, joka ei ole meri eikä järvi. Kuyalnykin lahti on '
        + 'kaksikymmentäkahdeksan kilometriä pitkä, yli kolme kilometriä '
        + 'leveä ja keskimäärin metrin syvyinen — kävelysyvyinen koko '
        + 'matkaltaan. Se oli aikoinaan joen suu, sitten merenlahti, ja '
        + 'noin 1300-luvulla hiekka kasautui sen ja meren väliin '
        + 'kannakseksi. Siitä lähtien vesi on haihtunut eikä ole päässyt '
        + 'minnekään, ja lahdesta on tullut väkevämpi kuin mistään '
        + 'merestä: mittausten mukaan suolapitoisuus on vuosien 1878 ja '
        + '1968 välillä vaihdellut kahdenkymmenenyhdeksän ja '
        + 'kahdensadankuudenkymmenenyhdeksän promillen välillä. '
        + 'Suolaisimpina vuosina suola on saostunut pohjalle. Kuivina '
        + 'vuosina lahti on kutistunut lähes puoleen, ja kahdesti — 1907 '
        + 'ja 1925 — sinne on kaivettu kanava ja laskettu merivettä, '
        + 'ettei se kuivuisi kokonaan. Lähistöllä on Ukrainan alin kohta, '
        + 'viisi metriä merenpinnan alapuolella. Ja tässä tulee se osa, '
        + 'joka isoisääsi kiinnostaisi. Näin suolaisessa vedessä ei elä '
        + 'juuri mikään: bakteerien lisäksi lahdessa on kaksi lajia, '
        + 'pieni artemia-äyriäinen ja surviaissääsken toukka. Kaksi. '
        + 'Mutta niitä on niin paljon, että lisääntymisaikaan koko veden '
        + 'sävy kääntyy punertavaksi, ja aallot heittävät äyriäisiä '
        + 'rannalle paksuksi kerrokseksi. Suola tekee vielä toisen tempun: '
        + 'lahti ei jäädy tavallisilla pakkasilla, ja siksi sinne '
        + 'kerääntyy talveksi vesilintuja, kun muut vedet ovat umpeen '
        + 'menneet. Ihmisille lahti on ollut ensin suolanottopaikka ja '
        + 'sitten kylpylä: pohjan sulfidimuta todettiin lääkitseväksi, ja '
        + 'kylpylä perustettiin vuonna 1834, eli isoisäsi käydessä se oli '
        + 'jo kolmenkymmenenyhdeksän vuoden ikäinen laitos. Vuoden 2022 '
        + 'alusta koko lahti ympäristöineen on ollut kansallispuistoa.',
      /*
       * Commons 30.8.2026: 2592×1944, image/jpeg, CC BY-SA 3.0, tekijä
       * Yuriy Kvach, kuvattu 5.8.2013, kuvaus "Солева пустеля у
       * верхів'ях Куяльницького лиману" (suolaerämaa Kuyalnykin lahden
       * yläjuoksulla). Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px:n
       * esikatselusta: valkean vaalea, aivan tasainen kuivunut
       * suolapohja täyttää kuvan alaosan horisonttiin asti, taustalla
       * ohut vesiviiva, oikealla arojen rinne ja yksi sähkölinjan
       * masto, ylhäällä poutapilviä. Ei ihmisiä eikä eläimiä.
       *
       * MIKSI JUURI TÄMÄ KUVA: se näyttää sen, mitä teksti väittää —
       * että lahti kutistuu ja että pohjalle jää suola. Punertuvasta
       * vedestä ja äyriäisistä ei ole vapaata kuvaa, ja kuivunut pohja
       * kertoo saman asian toisesta päästä.
       */
      kuva: {
        tiedosto: 'Desert in the Kuyalnik Estuary valley.jpg',
        selite: 'Kuyalnykin lahden yläpää kuivuu kesäisin suolaerämaaksi, '
          + 'ja pohjalle jäävä suola on ollut kaupungin tulonlähde '
          + 'keskiajalta asti.',
        lahde: 'Yuriy Kvach, Wikimedia Commons (CC BY-SA 3.0)',
      },
      visa: {
        kysymys: 'Miksi Kuyalnykin veden sävy kääntyy punertavaksi?',
        vaihtoehdot: [
          'Myrsky nostaa pohjan punaisen liejun pinnalle asti',
          'Pikkuäyriäisiä on niin paljon, että vesi punertuu',
          'Ruoste huuhtoutuu vanhoista suolapadoista',
        ],
        oikea: 1,
        fakta: 'Lahdessa elää bakteerien lisäksi vain kaksi lajia: '
          + 'artemia-äyriäinen ja surviaissääsken toukka. Suolapitoisuus on '
          + 'mittausten mukaan vaihdellut 29 ja 269 promillen välillä, ja '
          + 'niin suolainen vesi ei jäädy tavallisilla pakkasilla — siksi '
          + 'sinne kerääntyy talveksi vesilintuja.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   *
   * Pohjustaa isoisän merkinnän ENSIMMÄISTÄ virkettä — *"Satama on
   * täynnä vehnää ja kieliä"* — ja on ainoa kohta tässä paketissa, joka
   * kertoo, MIKSI kieliä oli. Livian maadoitus kertoi, mihin ne jäivät
   * (katukilpiin); oppitunti kertoo, mikä ne toi.
   *
   * MIKSI OPPITUNTI EI POHJUSTA LAATTAKYSYMYSTÄ: Odessan seitsemästä
   * kysymyksestä (ks. SPOILERIT) kuusi käsitellään kaupunkilehdessä tai
   * kaanonissa, ja seitsemäs on tarinakaaren askelmakysymys, jota tämä
   * paketti nimenomaan väistää. Vapaasatama ei ole yksikään niistä
   * eikä esiinny kaupunkilehden nostoissa lainkaan — se on merkinnän
   * ainoa iso kohta, jota mikään muu ei selitä.
   *
   * MIKSI JUURI TULLIOJA: isoisä on kartanpiirtäjä, joka mittaa kaiken.
   * Vapaasataman raja ei ollut sopimus paperilla vaan kaivettu oja,
   * jolla oli syvyys ja leveys — ja jonka jälki on yhä kaupungin
   * katuverkossa. Se on tämän aiheen mitattava puoli.
   *
   * FAKTAT (kaksi riippumatonta artikkelia, haettu 30.8.2026):
   *   - ru-Wikipedia "Порто-франко (Одесса)" (johdanto ja osio "История
   *     возникновения"): vapaasatama tarkoitti vyöhykettä, jolla
   *     tavaran sai purkaa, varastoida, pakata uudelleen ja jalostaa
   *     tullitta niin kauan kuin sitä ei viety vyöhykkeeltä sisämaahan;
   *     asetus annettiin 1817 mutta järjestely tuli voimaan vasta 1819,
   *     kun tullipisteet oli rakennettu kaupungin rajan ulkopuolelle,
   *     ja se kesti 19. huhtikuuta 1859 asti — noin neljäkymmentä
   *     vuotta; kauppias purki lastin ilman tullimuodollisuuksia, myi
   *     sen paikan päällä, otti tilalle venäläistä tavaraa, tavallisesti
   *     leipäviljaa, ja purjehti pois; yrittäjien määrä kaupungissa
   *     kymmenkertaistui, ja työpaikat ja halpuus vetivät kaupunkiin
   *     väkeä kaikista ammateista; rajan ulkopuolelle syntyi
   *     asutuksia, joiden asukkaat kulkivat joka aamu tullin läpi
   *     töihin; viiden ensimmäisen vuoden jälkeen Odessa oli
   *     valtakunnan kolmas ja sittemmin toinen kauppakaupunki heti
   *     Pietarin jälkeen; rajalinja toimi myös terveyskordonina, kun
   *     rutto tai kolera saapui (1831 ja 1837).
   *   - uk-Wikipedia "Старопортофранківська вулиця" (osio "Історія
   *     виникнення") ja sen ru-vastine "Старопортофранковская улица":
   *     rajalinja oli valtava oja, syvyys kaksi metriä ja leveys noin
   *     kolme, ja se kiersi renkaana koko kaupungin; ojassa oli kolme
   *     läpikulkupistettä päätiellä, ja kutakin valvoi kaksi tai kolme
   *     vartijaa; kun yksi oja ei riittänyt salakuljetusta vastaan,
   *     kaivettiin toinen ja sitten kolmas; alkuperäisissä rajoissaan
   *     vyöhyke pysyi 1. kesäkuuta 1827 asti, minkä jälkeen siihen
   *     liitettiin ympäröivät kylät; vanhat ojat menettivät merkityksensä
   *     ja täytettiin, toinen istutettiin puihin ja siitä tuli Ulompi
   *     bulevardi, ja ensimmäisen ojan paikalle vedettiin katu, joka sai
   *     nimekseen Staroportofrankivska eli Vanhan vapaasataman katu.
   *
   * KAKSI LUKUA ON VAIN ru-ARTIKKELISSA, ja se on kirjattu tähän:
   * yrittäjien määrän kymmenkertaistuminen ja kaupungin nousu
   * valtakunnan kolmanneksi ja sitten toiseksi kauppapaikaksi. Ne ovat
   * kaupungin talouslukuja eivätkä henkilöväitteitä, joten ne ovat
   * mukana; jos toinen joudutaan pudottamaan, se irtoaa yhtenä
   * virkkeenä koskematta muuhun tekstiin.
   *
   * LÄHTEET EROAVAT KAHDESSA KOHDASSA, EIKÄ NIITÄ OLE TASOITETTU:
   * asetuksen päiväys on ru-artikkelissa 16. huhtikuuta 1817 ja
   * katuartikkelissa 10. toukokuuta 1817, joten tekstissä sanotaan vain
   * "vuonna 1817"; ja päättymisvuosi on en- ja uk-Wikipedian
   * "Odesa"-artikkeleissa 1859 mutta uk-Wikipedian "Порто-франко"
   * -artikkelissa 1858, joten teksti nojaa enemmistön lukuun 1859 ja
   * poikkeama on kirjattu tähän.
   *
   * IKÄSOPIVUUS (13+): vapaasatama kerrotaan sääntönä ja rajana, ei
   * suurmiestarinana. Politiikka jää pois; oppitunnin oma kärki on se,
   * että kaupungin kuulu monikielisyys ei ollut luonteenpiirre vaan
   * seuraus yhdestä tullisäännöstä — ja että sääntö oli ollut poissa jo
   * neljätoista vuotta, kun isoisä kuuli sen jäljet.
   */
  oppitunti: {
    otsikko: 'Kaupunki, jonka ympärillä oli oja',
    teksti: 'Ne kielet, joita isoisäsi kuuli lastilistoilla, eivät olleet '
      + 'sattumaa. Ne olivat seurausta yhdestä säännöstä, joka oli '
      + 'kirjoitettu vuonna 1817 ja astunut voimaan 1819: Odessasta tuli '
      + 'vapaasatama. Sen sisällä tavaran sai purkaa, varastoida, pakata '
      + 'uudelleen ja jalostaa maksamatta tullia — niin kauan kuin sitä ei '
      + 'viety vyöhykkeeltä sisämaahan päin. Kauppias saattoi siis tuoda '
      + 'lastin, myydä sen paikan päällä ilman paperisotaa, ottaa tilalle '
      + 'vehnää ja purjehtia pois. Kauppiaita tuli, ja heidän peräänsä '
      + 'tulivat kirjurit, kantajat, meklarit ja laivanvarustajat '
      + 'kymmenistä maista. Yrittäjien määrä kymmenkertaistui, ja viiden '
      + 'vuoden kuluttua kaupunki oli valtakunnan kolmanneksi vilkkain '
      + 'kauppapaikka; myöhemmin toinen, heti Pietarin jälkeen. Ja tässä '
      + 'on se kohta, jonka isoisäsi olisi mitannut. Vapaasataman raja ei '
      + 'ollut viiva kartalla vaan oja. Kaupungin ympäri kaivettiin rengas, '
      + 'kaksi metriä syvä ja noin kolme leveä, ja siinä oli kolme '
      + 'läpikulkupistettä, joita kutakin vartioi kaksi tai kolme miestä. '
      + 'Kun yksi oja ei riittänyt salakuljetusta vastaan, kaivettiin '
      + 'toinen, ja kun sekään ei riittänyt, kolmas. Rajan ulkopuolelle '
      + 'kasvoi asuinalueita, joiden väki kulki joka aamu tullin läpi '
      + 'töihin. Sama linja toimi myös terveyskordonina, kun rutto tai '
      + 'kolera lähestyi sisämaasta — niin kävi 1831 ja 1837. Vuonna 1827 '
      + 'vyöhykettä laajennettiin ympäröiviin kyliin, vanhat ojat '
      + 'täytettiin, ja toinen niistä istutettiin puihin ja nimettiin '
      + 'Ulommaksi bulevardiksi. Ensimmäisen ojan päälle vedettiin katu, '
      + 'joka kantaa asiaa nimessään vielä tänään: Staroportofrankivska, '
      + 'vanhan vapaasataman katu. Järjestely lakkautettiin huhtikuussa '
      + '1859. Kun isoisäsi seisoi laiturilla, tulliojaa ei siis ollut '
      + 'enää olemassa — mutta se, mitä oja oli neljässäkymmenessä '
      + 'vuodessa kerännyt kaupunkiin, oli yhä paikoillaan ja puhui '
      + 'neljää kieltä yhtä aikaa.',
    /*
     * Commons 30.8.2026: 3440×2560, image/jpeg, public domain, tekijä
     * Photochrom Print Collection (Library of Congress), päiväys
     * 1890–1900, kuvaus tyhjä (nimi ja kuvan oma tekstirivi kertovat
     * kohteen). Restrictions tyhjä. SILMÄTARKISTUS tehty 960 px:n
     * esikatselusta: satama ylhäältä kuvattuna — höyrylaivoja ja
     * purjealuksia laiturissa, laiturille rakennettu rautatie täynnä
     * tavaravaunuja, nostureita, tiilikattoisia varastoja, hevoskärry
     * ja puisia vajoja etualalla. Ihmisiä vain kaukaisina hahmoina.
     * Kuvan alareunassa on aikalaisteksti kahdella kielellä, ranskaksi
     * ja venäjäksi — juuri se asia, josta oppitunti kertoo.
     *
     * MIKSI JUURI TÄMÄ KUVA: se on sama satama parikymmentä vuotta
     * isoisän käynnin jälkeen, ja siinä näkyy se, mitä vapaasatama
     * rakensi: laituri, jolla on oma rautatie ja jolla tavara vaihtaa
     * omistajaa ennen kuin se koskee tulliin.
     */
    kuva: {
      tiedosto: 'The Port Practique, Odessa, Russia, (i.e., Ukraine)-LCCN2001697471.jpg',
      selite: 'Odessan käytännön satama 1890-luvulla: laiturille rakennettu '
        + 'rautatie toi vaunut laivojen viereen, ja kuvan oma kuvateksti '
        + 'on painettu kahdella kielellä.',
      lahde: 'Photochrom Print Collection, Library of Congress, Wikimedia '
        + 'Commons (public domain)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * FABLE KATSELMOI: kohtaamisluonnos
   *
   * TÄMÄ TEKSTI ON EHDOTUS EIKÄ KAANONIA. Hahmo, laattakysymys ja
   * kohtaamisen oma repliikki ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, 'odessa'):
   * lyhdynsytyttäjä Fjodor sytyttää portaikon lyhdyt joka ilta alhaalta
   * ylös ja sammuttaa ne aamulla ylhäältä alas. Luonnos käyttää samaa
   * hahmoa, koska kaupungilla on jo hänet — uusi nimi tekisi kaupunkiin
   * kaksi eri vartijaa.
   *
   * MITÄ LUONNOS EI TEE: se ei kertaa Fjodorin repliikkiä, ei mainitse
   * merimiessolmua eikä sytyttämättä jätettyä lyhtyä, koska ne ovat
   * kaaren oma juoni ja aarteen palkinto (kätkö on juuri sen lyhdyn
   * jalustassa). Se ei myöskään laske askelmia eikä selitä portaiden
   * optista temppua: ne ovat laattakysymyksen vastaus ja faktarivi
   * (ks. SPOILERIT, K6).
   *
   * MITÄ LUONNOS YRITTÄÄ (docs/moduulit/tarinakaari.md, luku 3 ja 5):
   *   - SUVUN JATKUMO ilman ostettua järjestelyä. Fjodor kiertää samaa
   *     reittiä kuin isänsä ja tämän isä, ja syy jatkaa on suvun oma:
   *     kierros on hänen työnsä, ei kenenkään toivomus, eikä siitä ole
   *     koskaan maksettu ylimääräistä.
   *   - ÄÄNIPROFIILI ON PUHELIAS. Aallon vartijoista Marseillen
   *     Baptiste on epäuskoinen ja Odessan Fjodor on se, joka puhuu
   *     liikaa ja mielellään — hän tuntee lyhtynsä äänestä ja kertoo
   *     sen kysymättä.
   *   - VARALLISUUSSÄÄNTÖ tarkistettu virke virkkeeltä: isoisä ei maksa
   *     mitään, ei tilaa mitään eikä käske ketään.
   *   - PORTINVARTIJAKYSYMYS johtaa kaaren omaan laattakysymykseen
   *     paljastamatta sitä: Fjodor haluaa tietää, onko tulija laskenut
   *     askelmat vai vain katsonut niitä. Lupaus on käsin kosketeltava
   *     teko — hän raapaisee tulen — ja se lunastuu aarteessa.
   *
   * KUVAA EI OLE (aallon 4C rajaus). Kortti rakennetaan ilman kuvaa
   * aivan kuten Marseillessa, Sevillassa ja Amsterdamissa.
   */
  kohtaaminen: {
    hahmo: 'Lyhdynsytyttäjä Fjodor',
    nappi: 'Tapaa lyhdynsytyttäjä',
    /*
     * VARMISTUSKYSYMYS (omistajan pelitestipalaute v1119): lause on
     * datassa, koska suomen genetiivi ei taivu koneellisesti jokaisesta
     * nimestä.
     */
    varmistus: 'Haluatko varmasti tavata Fjodorin juuri nyt?',
    /*
     * VIHJELINKIN OSIO on kaupunkilehden osion id (js/packs/
     * kulttuuri-kategoriat.js): Odessan lehdessä on kaksi osiota,
     * 'kaupunki' ("Odessa") ja 'arki' ("Arki ja tavat"). Fjodorin
     * kysymys koskee portaikkoa, ja sen tuki on kaupunkisivun puolella —
     * lehden kansi ja kaupunkisivu ovat ne, joissa portaikko esiintyy.
     * Rivi kertoo suunnan, ei vastausta.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Fjodor kiertää portaikon lyhdyt joka ilta alhaalta ylös ja '
      + 'sammuttaa ne aamulla ylhäältä alas, samaa reittiä kuin hänen '
      + 'isänsä ja tämän isä ennen häntä. Hän puhuu paljon ja mielellään: '
      + 'jokaisella lyhdyllä on hänen mukaansa oma äänensä, ja hän '
      + 'väittää erottavansa ne toisistaan pimeässä pelkästä kolahduksesta. '
      + 'Kierrosta ei ole kukaan tilannut suvulta eikä siitä ole koskaan '
      + 'maksettu ylimääräistä — se vain jatkuu, koska Fjodor pitää sitä '
      + 'työnään ja koska joku nousee portaat aina myöhään. Vieraita hän '
      + 'kestää hyvin. Sen sijaan hän ei pidä siitä, että portaikosta '
      + 'puhutaan kuin se olisi elokuvan lavaste. Ennen kuin hän raapaisee '
      + 'tulen, hän haluaa kuulla, onko tulija laskenut askelmat vai vain '
      + 'katsonut niitä.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla, Sofialla, Sevillalla ja
   * Marseillella.
   */

  /*
   * KOHTAAMISPAIKKA: PORTAIKON PUOLIVÄLIN TASANNE. Fjodor on
   * lyhdynsytyttäjä, ja tarinakaaren paketti sijoittaa hänet
   * nimenomaan tasanteelle ("Tasanteella Fjodor nojaa
   * lyhtytankoonsa"; "Puolivälin tasanteella lyhtypylvääseen oli
   * sidottu köydenpätkä").
   *
   * 46,48917 N / 30,74333 E — en-Wikipedia "Potemkin Stairs",
   * prop=coordinates (haettu 30.8.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/piirto.js
   * laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2 ja
   * y = (72 − lat) × 26,3.
   *
   * LASKU (ajettu tools/fokuskartta/piirto.js:n omalla kaavalla):
   *   maailmankartta  x = ((30,74333 − (−175)) mod 360) × (12000/360)
   *                     = 205,74333 × 33,3333… = 6858,1
   *                   y = (millerY(46,48917) − millerY(76)) × 12000/2π
   *                     = 1539,9
   *   europe          x = (30,74333 + 11) × 19,2 = 801,5
   *                   y = (72 − 46,48917) × 26,3 = 670,9
   *
   * TARKISTUS ODESSAN LAATTAA VASTEN. Laatta on Euroopan laudalla
   * 800 / 669 (js/packs/europe.js) ja maailmankartalla 6855,6 / 1536,9
   * (js/packs/maailmankartta.js). Portaikko on kaupungin laatan
   * vieressä molemmilla laudoilla — Euroopan laudalla noin 2,4 ja
   * maailmankartalla noin 3,9 yksikön päässä — eli selvästi
   * js/fokuspiste.js:n PISTE_ERO_MIN -rajan (14) sisällä, ja piirtopuoli
   * siirtää merkin itse koilliseen laatan vierestä. Sama tilanne kuin
   * Tukholmassa ja Marseillessa, ja se on oikein: portaikko ON
   * kaupungin keskusta, eikä pistettä ole vedetty kauemmas vain siksi,
   * että se erottuisi. Kumpaakaan lukua ei ole vedetty laatan mukaan:
   * piste on laskettu maastoa vasten kuten muissakin paketeissa.
   */
  kohtaamispiste: {
    nimi: 'Portaikon puolivälin tasanne',
    laudat: {
      maailmankartta: { x: 6858.1, y: 1539.9 },
      europe: { x: 801.5, y: 670.9 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Odessan sivupino (js/lehti.js
   * rakennaSivut): 0 = etusivu, 1 = kaupunkisivu "Odessa",
   * 2 = "Arki ja tavat", 3 = Menovinkit (Ukrainan maapaketista,
   * js/packs/maa-kategoriat.js UKR). Ukrainan maalehdessä on lisäksi
   * Ruoka- ja Musiikki-sivut, mutta rakennaSivut lainaa
   * kaupunkilehteen maasta vain Menovinkit-sivun.
   *
   * MIKSI 2 JA 3. Raamattu vaatii kysymyksen jokaiselle sivulle paitsi
   * etusivulle. Sivun 1 hoitaa Odessan kulttuurivisa (js/packs/
   * europe-kulttuuri.js, odessa: louhoskäytävät), jonka
   * js/fokustehtavat.js pukee samaksi AARTEEN AVAUS -laatikoksi ilman
   * omaa riviään täällä. Jäljelle jäävät sivut 2 ja 3, eli sama pari
   * kuin Tukholmassa, Pariisissa ja Marseillessa.
   *
   * SIVUN 2 OMA TEHTÄVÄ VÄISTYY, JA SE ON KIRJATTU. Arki ja tavat
   * -sivulla on lehden oma minitehtävä ("Mitä odessalainen forshmak
   * on?", js/packs/kulttuuri-kategoriat.js, odessa/arki), ja
   * js/fokustehtavat.js korvaa sen nimetyllä tehtävällä, jotta sivulla
   * on Raamatun vaatima yksi minitehtävä eikä kahta. Sama tapahtui
   * Tukholmassa ja Marseillessa. SISÄLTÖ EI KUITENKAAN KATOA:
   * väistyvän tehtävän aihe eli forshmak on PRIVOZ_VISAn faktarivissä,
   * eli sama tieto tulee pelaajalle samasta laatikosta, ja kysymys
   * nousee saman sivun toisesta nostosta.
   *
   * MIKSI SIVUN 3 KYSYMYS ON KAUPUNKISIVUN AIHEESTA: Menovinkit on
   * maan yhteinen linkkisivu, jolla ei ole omia nostoja, joten kysymys
   * lainataan lehden muilta sivuilta kuten Marseillessa. Arki-sivun
   * toinen nosto (Humorina) on varattu laattakysymykselle (ks.
   * SPOILERIT, K5) ja kaupunkisivun katakombinosto kulttuurivisalle
   * (K7), joten jäljelle jäävät perustaja ja oopperatalon jäähdytys.
   * Perustaja valittiin, koska oopperatalo on jo tämän paketin täky
   * eikä samaa taloa kannata kysyä kolmatta kertaa saman käynnin
   * aikana.
   *
   * JULISTE ON OLEMASSA: js/packs/julisteet.js tuntee Odessan
   * (tiedosto tuotanto/tuot-odessa.png), joten palkinto lunastaa
   * lupauksensa.
   */
  lehtitehtavat: [
    {
      id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: PRIVOZ_VISA,
    },
    {
      id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: DERIBAS_VISA,
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: hetmani
   * Polubotokin kultakätkö, sama kuin Kiovalla. Merkintä aukeaa, kun
   * aarre löytyy (js/fokusvirta.js fokusvirtaAarremerkinta).
   */
  aarremerkinta: {
    teksti: 'Satamakonttorissa naurettiin tarinalle hetmanin kullasta, joka '
      + 'makaa Lontoon pankissa korkoa kasvamassa — joku oli laskenut, '
      + 'että sillä ostaisi jo koko tämän kaupungin laivoineen. Nauru '
      + 'loppui, kun vanha kirjanpitäjä totesi hiljaa: tarina elää siksi, '
      + 'että tynnyri lähti aikoinaan liikkeelle juuri meren kautta.',
  },
};
