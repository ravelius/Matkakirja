/*
 * SARAJEVON FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-ateena.js:lle ja js/packs/
 * fokusvirta-sofia.js:lle. Rakenne, kenttien nimet ja kuusi vaihetta
 * ovat samat kuin siellä (Raamatun osio "Fokusmoodi", ANNOSTELU), eikä
 * moottoriin (js/fokusvirta.js) tarvinnut koskea: uusi kaupunki on yksi
 * tiedosto ja yksi rivi rekisterissä (js/packs/fokusvirrat.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (Fable 25.8.2026): docs/mantereet-tyoaineisto/
 * fokusvirta-sarajevo-kaanon.md. Matkakirjan paikkarivi, teksti ja
 * luenta, pöllön huomio, aarremerkintä ja täkynostojen klikkiotsikot on
 * siirretty sieltä SELLAISINAAN. Kaanon myös valitsi täyt (inat-kuca,
 * haggada, villihevoset), kohdenoston (Mostar) ja kohtaamispaikan
 * (Latinska ćuprija).
 *
 * YKSI SANAMUUTOS, JONKA KAANON ITSE MÄÄRÄSI. Kaanonin kohta 2 antaa
 * pöllön huomiolle ehdon: *"Tarkista sijainti täkyraportista — jos talo
 * ei ole Latinska ćuprijan päässä, pudota 'Tuon sillan päässä' → 'Joen
 * varrella seisoo...'."* Tarkistus tehtiin: takyt-sarajevo.md (täky 1)
 * sijoittaa Inat kućan Miljackan rannalle VIJEĆNICAA VASTAPÄÄTÄ, ja
 * en-Wikipedian coordinates-rajapinta antaa Vijećnicalle 43,85917 N /
 * 18,43333 E, kun Latinska ćuprija on 43,8578 N / 18,4289 E — eli noin
 * 400 metrin päässä sillasta. Talo EI ole sillan päässä, joten kaanonin
 * oma varamuoto on käytössä. Muuta ei ole muutettu.
 *
 * AIKAKAUSIVAROITUS (kaanonin oma, sitova): Inat kuća ja Vijećnica ovat
 * vuoden 1878 jälkeen — isoisä (1873) EI voinut nähdä niitä. Ne kuuluvat
 * vain pöllön nykypäivän ääneen, ja niin ne tässä tiedostossa ovat:
 * matkakirjan merkintä ei mainitse kumpaakaan, pöllö mainitsee, ja
 * täyn 'inat-kuca' teksti kertoo ääneen, että talo nousi vasta isoisän
 * käynnin jälkeen.
 *
 * FAKTAPOHJA syvennyksille: docs/mantereet-tyoaineisto/takyt-sarajevo.md
 * ja docs/mantereet-tyoaineisto/takynostot-bosnia.md, joiden jokainen
 * väite on tarkistettu en-Wikipediasta artikkeli ja kohta kerrallaan.
 * Täkyjen syvennysteksteissä EI ole yhtään faktaa noiden raporttien
 * ulkopuolelta. Oppitunti käyttää lisäksi pelin omaa, jo hyväksyttyä
 * Sarajevo-aineistoa (js/packs/nahtavyysjutut.js Baščaršija ja sen
 * Evliya Çelebi -lainaus, js/packs/kulttuuri-kategoriat.js Kazandžilukin
 * kuvateksti, js/packs/europe-artikkelit.js bosnialainen kahvi) — se on
 * tarkoitus, koska oppitunnin tehtävä on pohjustaa laattakysymys lehden
 * omalla aineistolla.
 *
 * KAKSI ASIAA, JOITA RAPORTIT KIELTÄVÄT JA JOITA TÄSTÄ EI LÖYDY:
 *   1. Inat kućan omistajan väitetty vaatimus kultarahasta jokaista
 *      tiiltä kohti EI ole en-Wikipedian "Spite house" -artikkelissa
 *      (takyt-sarajevo.md, täky 1). Täky sanoo sen ääneen sen sijaan
 *      että vaikenisi: pöllö kertoo kuulleensa version ja jättää sen
 *      toistamatta. Perustuslain totuudellisuuspilari.
 *   2. Olmi ("ihmiskala") ei esiinny tässä tiedostossa lainkaan, koska
 *      en-Wikipedian Vjetrenica-artikkeli ei mainitse lajia — ks.
 *      js/packs/fokuskohteet-bih.js, kohde 'vjetrenica'.
 *
 * ── ELÄINTÄKY ON KAANONIN OMA ──────────────────────────────────────
 *
 * Omistajan linjaus 25.8.2026 (*"täkyihin myös söpöjä eläinjuttuja —
 * eläimet ovat tärkeitä kohdeyleisölle"*) toi Sofiaan NELJÄNNEN täyn
 * kaanonin ulkopuolelta. Sarajevossa sitä ei tarvita: kaanon on jo
 * valinnut eläintäyn itse (Livnon villihevoset, kohta 3, merkitty
 * ELÄINTÄKY). Täkyjä on siis kolme, ja `vaadittuja` on 1.
 *
 * ── MINIVISAN SÄÄNTÖ ───────────────────────────────────────────────
 *
 * Sama kuin Ateenassa ja Sofiassa: vastaus löytyy syvennystekstistä,
 * mutta kysymyksen sanamuoto ei toistu siinä sellaisenaan. Skeema on
 * lehden minitehtävän oma (js/ui.js piirraMinitehtava): kysymys,
 * vaihtoehdot, oikean indeksi ja faktarivi, joka näytetään vasta
 * vastauksen jälkeen.
 *
 * ── SÄVYRAJAUS (tämän maan oma sääntö) ─────────────────────────────
 *
 * takynostot-bosnia.md, sääntö 3 (tehtävänannon ohje 25.8.2026):
 * 1990-luvun sota käsitellään kunnioittavasti eikä sitä skandaalisoida.
 * Yksikään tämän tiedoston täky, nosto tai lehtitehtävä ei ole
 * sota-aiheinen. Haggadan tarinassa 1990-luku on mukana yhdellä
 * neutraalilla lauseella (kirja siirrettiin pankin holviin), koska
 * ilman sitä pelastusketju katkeaisi kesken — ja kaanon vaatii tälle
 * täylle nimenomaan kunnioittavan sävyn.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on tarkistettu imageinfo-rajapinnasta
 * 25.8.2026 (olemassaolo, koko, mime, lisenssi, tekijä, kuvaus,
 * kategoriat) — ei arvattuja nimiä. Kaikki ovat PD tai CC, ja tekijä on
 * `lahde`-rivillä, koska CC BY vaatii maininnan.
 *
 * PÖLLÖN KUVA EI OLE HEROKUVA. Ateenassa vaihe 2 esittelee generoidun
 * herokuvan (`ampari`), mutta Sarajevolle sellaista ei ole:
 * tools/hero-tyolista-*.mjs -listoissa ei ole yhtään Sarajevo-riviä.
 * Kenttä `tiedosto` toimii `ampari`-kentän sijasta sellaisenaan
 * (js/fokusvirta.js kuvanOsoite) — sama ratkaisu kuin Sofiassa.
 */
import { bihFokuskohteet } from './fokuskohteet-bih.js';

/*
 * LEHTITEHTÄVIEN VISAT ovat vakioina samasta syystä kuin Ateenan
 * NIKE_VISA ja Sofian KATUKIVI_VISA: tiedoston lopun `lehtitehtavat`
 * lukee kysymykset muuttujista, jolloin uuden käytön lisääminen ei
 * koskaan johda kahteen erilleen ajautuvaan kopioon.
 *
 * SARAJEVON LEHDEN SIVUPINO (js/lehti.js rakennaSivut): kaupungilla on
 * kaksi kulttuurikategoriaa, 'kaupunki' ("Sarajevo") ja 'urheilu'
 * ("Talvikisat"), ja maalla on Menovinkit-sivu (js/packs/
 * maa-kategoriat.js, BIH). Pino on siis 0 = etusivu, 1 = kaupunkisivu
 * "Sarajevo", 2 = Talvikisat, 3 = Menovinkit — täsmälleen sama muoto
 * kuin Sofiassa, vain kakkossivun aihe on toinen.
 *
 * KOLMAS KYSYMYS EI OLE LISTASSA: sivun 1 kysymys on Sarajevon
 * kulttuurivisa (js/packs/europe-kulttuuri.js, sevdalinkan nimen
 * alkuperä), jonka js/fokustehtavat.js pukee samaksi AARTEEN AVAUS
 * -laatikoksi ilman omaa riviään täällä.
 */

/*
 * FRANKO_VISA — kevyen kulun AARTEEN AVAUS -tehtävä (sivu 2).
 *
 * EI UUTTA FAKTAA. Väite on sivun 2 ("Talvikisat") oman noston
 * "Suomalainen voitti kaikki kolme matkaa" tekstiä: *"Isäntämaa
 * Jugoslavia sai kisoista ensimmäisen talviolympiamitalinsa, kun Jure
 * Franko tuli suurpujottelussa toiseksi."* Kaikki kolme
 * vastausvaihtoehtoa ovat saman sivun nimiä, joten arvaus on reilu.
 *
 * MIKSI EI KUPARIKYSYMYSTÄ. Sarajevon laattakysymys (kohtaaminen, ks.
 * alempana) kysyy, mitä astiaa kaupungin kuparisepät takovat. Jos
 * lehden aarteen avaava tehtävä kysyisi kuparista tai kahvista,
 * aarrekysymys olisi ratkaistu ennen kuin Emiria on tavattu. Sivu 2 on
 * kokonaan toisesta vuosisadasta eikä pohjusta laattaa lainkaan.
 *
 * SIVUN OMA TEHTÄVÄ VÄISTYY. Aihesivulla 'urheilu' on jo
 * `tehtava`-kenttä (köysiradan gondolimatkan kesto). Nimetty tehtävä
 * syrjäyttää sen (js/fokustehtavat.js), jolloin sivulla on Raamatun
 * vaatima YKSI minitehtävä eikä kahta.
 */
const FRANKO_VISA = {
  kysymys: 'Jugoslavia järjesti talvikisat 1984, mutta yhtään '
    + 'talviolympiamitalia sillä ei siihen mennessä ollut. Sarajevossa se '
    + 'vihdoin tuli. Kuka sen voitti?',
  vaihtoehdot: [
    'Jure Franko',
    'Phil Mahre',
    'Marja-Liisa Hämäläinen',
  ],
  oikea: 0,
  fakta: 'Franko oli suurpujottelussa toinen. Kisat käytiin 8.–19. '
    + 'helmikuuta 1984 kaupunkia ympäröivillä vuorilla.',
};

/*
 * SAHAT_KULA_VISA — kevyen kulun JULISTE-tehtävä (sivu 3).
 *
 * SISÄLTÖ ON LEHDEN OMAA. Kellotorni on "Matkailijan Sarajevo"
 * -artikkelin oma jakso "Kello, joka seuraa aurinkoa"
 * (js/packs/kulttuuri-kategoriat.js): kello asetetaan niin, että
 * auringonlasku on kaksitoista, ja koska päivän pituus vaihtelee,
 * mekanismia on säädettävä jatkuvasti. Kysymys ei toista tuota
 * lausetta sellaisenaan.
 *
 * MIKSI SIVULLA 3 EIKÄ SILLÄ SIVULLA, JOLLA JAKSO ON: sama ratkaisu
 * kuin Ateenassa ja Sofiassa. Sivu 3 on Menovinkit, jonka sisältö on
 * koko maan yhteinen linkkilista — sillä ei ole omaa kaupunkifaktaa,
 * josta visan voisi tehdä, ja lehden jokaisella sivulla paitsi
 * etusivulla on Raamatun mukaan oltava kysymys.
 */
const SAHAT_KULA_VISA = {
  kysymys: 'Sarajevon vanhan kellotornin koneistoa joudutaan säätämään '
    + 'pitkin vuotta yhä uudelleen. Mikä sen pakottaa?',
  vaihtoehdot: [
    'Päivän pituus vaihtelee, ja kello seuraa auringonlaskua',
    'Torni nojaa rinteeseen ja liikkuu roudan mukana',
    'Kello käy kuukalenterin mukaan ja jää joka kuu jälkeen',
  ],
  oikea: 0,
  fakta: 'Sahat-kula rakennettiin 1500-luvun puolivälissä, ja 28 metrin '
    + 'korkeudellaan se on maan korkein kellotorni. Sen kello asetetaan '
    + 'niin, että auringonlasku on kaksitoista — ja se on maan '
    + 'kellotorneista ainoa, jota ei ole muutettu eurooppalaiseen aikaan.',
};

export const FOKUSVIRTA_SARAJEVO = {
  kaupunki: 'sarajevo',

  /* ---------- 1. Matkakirja (isoisän ääni + vanha kuva) ---------- */
  matkakirja: {
    /* Kaanon, kohta 1 — paikkarivi ja teksti sellaisinaan. */
    paikkarivi: 'Sarajevo, syyskuussa 1873. Kirkas ilta; vuoret lähellä.',
    teksti: 'Laskin sillalta neljän uskon äänet: kirkonkellot idästä ja '
      + 'lännestä, minareetin kutsun, sapatin hiljaisuuden — ja joen, joka '
      + 'ei kuulu kenellekään. Majatalon isäntä sanoi, ettei kaupungissa '
      + 'tarvitse valita, minkä kellon mukaan herää.',
    /* Kaanon, kohta 1 — luenta ja äänitteen polku sellaisinaan. */
    luenta: '[curious] Laskin sillalta neljän uskon äänet: kirkonkellot '
      + 'idästä ja lännestä, minareetin kutsun, sapatin hiljaisuuden — ja '
      + 'joen, joka ei kuulu kenellekään. [warmly] Majatalon isäntä sanoi, '
      + 'ettei kaupungissa tarvitse valita, minkä kellon mukaan herää.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-sarajevo.mp3',
    /*
     * KUVA: Alois Schönnin maalaus Latinalaissillalta, Österreichische
     * Galerie Belvedere. Commonsin imageinfo 25.8.2026: 3508×2182,
     * public domain (PD-old-100-expired), tekijä Alois Schönn, päiväys
     * 1883, kategoriat Latin Bridge / Paintings of bridges. Merkintä on
     * kirjoitettu sillalta, ja sama silta on kohtaamispaikka.
     *
     * VUOSILUKU ON SELITTEESSÄ ÄÄNEEN. Maalaus on kymmenen vuotta
     * isoisän käyntiä myöhempi, eli Itävalta-Unkarin miehityksen ajalta.
     * Se ei riko kaanonin aikakausivaroitusta — varoitus koskee Inat
     * kućaa ja Vijećnicaa, rakennuksia joita ei vielä ollut — mutta
     * selite ei silti anna ymmärtää, että isoisä olisi nähnyt juuri
     * tämän näkymän. Vaihtoehto, jos halutaan tarkalleen isoisän
     * vuosikymmen: "Ignaz Konigsberger's Verlag, Sarajewo - drawing
     * (ca 1865).jpg" (563×920, public domain, Ignaz Königsberger,
     * ajoitus n. 1865–1878, Nadmlini-katu ja sen kaivo, joka poistettiin
     * 1895) — tarkistettu samalla ajolla, mutta pieni ja aiheeltaan
     * sivukatu eikä silta.
     */
    kuva: {
      tiedosto: 'Friedrich Alois Schönn - An der lateinischen Brücke in Sarajewo - 171 - Österreichische Galerie Belvedere.jpg',
      selite: 'Latinalaissilta Sarajevossa. Alois Schönn maalasi näkymän '
        + 'vuonna 1883, kymmenen vuotta isoisän käynnin jälkeen.',
      lahde: 'Alois Schönn 1883, Österreichische Galerie Belvedere, '
        + 'Wikimedia Commons (public domain)',
    },
  },

  /*
   * ---------- 2. Pöllön nykypäivän huomio ----------
   * Kaanon, kohta 2. Teksti on kaanonin, ja ainoa muutos on kaanonin
   * itsensä määräämä varamuoto ("Joen varrella" eikä "Tuon sillan
   * päässä") — ks. tiedoston alku, MISTÄ TEKSTIT TULEVAT.
   *
   * "Ihailen sitä miestä ammatikseni" on pöllön reportterirooli, ei
   * faktaväite: talon siirto ja sen syy ovat lähteessä, ihailu on
   * pöllön oma.
   */
  pollo: {
    /*
     * LIVIAN MAADOITUS (Fablen kaanon 27.8.2026, TUURAAJA-KEHYS).
     *
     * Merkinnän loppulause ("ei tarvitse valita, minkä kellon mukaan
     * herää") on kaunis ja romanttinen — juuri sitä sävyä maadoitus
     * koskee. Livia katsoo samaa kaupunkia POSTIN kannalta: monta
     * kalenteria tarkoitti viestinviejälle jatkuvaa laskutoimitusta
     * siitä, minä päivänä mikäkin luukku on auki.
     *
     * FAKTAKURI: väite pysyy siinä, minkä merkintä itse jo sanoo — että
     * kaupungissa elettiin useamman uskon rinnalla. Mitään uutta
     * vuosilukua, nimeä tai tapahtumaa ei lisätä, ja pyhäpäivähavainto
     * on Livian oman suvun kokemuksena ("meikäläiset"), ei lähdeväite.
     *
     * Loppu myöntää isoisälle sen osan, joka piti paikkansa — kaanonin
     * sääntö 3 kevyempänä muotona (varsinainen myönnytys on Ateenassa).
     */
    maadoitus: 'Kaunis lause. Mut postinkantajan kannalta se näytti vähän '
      + 'toiselta: monta uskoa tarkoitti montaa kalenteria, montaa pyhien '
      + 'sarjaa ja ikuista laskemista siitä, minä päivänä mikäkin luukku on '
      + 'auki. Meikäläiset valitti siitä ääneen. Herätä sai silti minkä '
      + 'kellon mukaan halus — se osa piti kyl paikkansa.',
    teksti: 'Joen varrella on nykyään talo nimeltä Inat kuća — Uhman '
      + 'talo. Kun keisarin virkamiehet halusivat sen tontin, omistaja '
      + 'purki talonsa ja kokosi sen uudestaan joen toiselle puolelle, '
      + 'lauta laudalta. Minä ihailen sitä miestä ammatikseni.',
    /*
     * Commons 25.8.2026: 5184×3456, CC BY 2.0, Fred Romero, kuvattu
     * 20.8.2019, kategoria Inat kuća; tiedoston oma kuvaus kertoo saman
     * tontti- ja kaupungintalotarinan kuin lähdeartikkeli.
     */
    kuva: {
      tiedosto: 'Sarajevo - Inat kuća (49104054186).jpg',
      selite: 'Inat kuća eli Uhman talo Miljackan rannalla. Talo purettiin '
        + 'ja koottiin uudelleen joen toiselle puolelle.',
      lahde: 'Fred Romero, Wikimedia Commons (CC BY 2.0)',
    },
  },

  /* ---------- 3. Pöllön valinta ---------- */
  valinta: {
    kysymys: 'Mistä haluaisit kuulla ensin?',
    // Kaanon, kohta 3: vaadittuja 1. Kolmas täky on kaanonin oma
    // eläintäky — se ei nosta porttia vaan on lisää luettavaa.
    vaadittuja: 1,
    aarreNappi: 'Jatka aarteelle',
    aarreEste: 'Kuuntele ensin yksi tarina',
  },

  /*
   * ---------- 3b. Kohdenostot ----------
   * Kaanon, kohta 3: kohdenostoksi Mostarin silta. Kohde asuu maan
   * omassa listassa (js/packs/fokuskohteet-bih.js), koska kohde ei kuulu
   * yhdelle kaupungille — täällä on vain poiminta tunnuksella.
   * Kohdenosto ei ole täky: siitä ei tule minivisaa eikä palkkiota,
   * eikä se avaa aarreporttia.
   */
  kohteet: bihFokuskohteet(['mostar']),

  /* ---------- 4. Kolme täkypolkua ---------- */
  takyt: [
    {
      id: 'inat-kuca',
      nappi: 'Talo, joka kannettiin joen yli',
      otsikko: 'Uhman talo',
      /*
       * Faktat: takyt-sarajevo.md, täky 1 (merkitty VARMAKSI) ja
       * takynostot-bosnia.md, ehdokas 2. Kerros [1878+]: teksti sanoo
       * heti alussa, ettei isoisä voinut nähdä tätä.
       *
       * KULTARAHAT JÄÄVÄT KERTOMATTA, ja se sanotaan ääneen: lähde ei
       * tunne yksityiskohtaa (takyt-sarajevo.md, täky 1, EPÄVARMA).
       */
      teksti: 'Tämä ei ole isoisäsi Sarajevoa. Kun hän käveli täällä, '
        + 'jokivarsi oli yhä ottomaanien kaupunkia; viisi vuotta myöhemmin '
        + 'tuli Itävalta-Unkari. Sen virkamiehet halusivat Miljackan '
        + 'rannalta tontin uudelle kaupungintalolle ja kirjastolle. '
        + 'Tontilla oli talo. Omistajalle tarjottiin rahaa: ei. Hänelle '
        + 'sanottiin, että hänen on pakko muuttaa: ei. Kun virkamiehet '
        + 'siirtyivät uhkailuun, mies purki talonsa, siirsi sen ja kokosi '
        + 'sen uudelleen pala palalta joen vastarannalle — ei siksi, että '
        + 'olisi halunnut asua siellä, vaan kiusatakseen heitä. Talo seisoo '
        + 'yhä paikallaan, ja siinä on nykyään ravintola nimeltä Inat '
        + 'kuća, Uhmatalo. Kuulet siitä vielä toisenkin version, jossa mies '
        + 'vaati korvaukseksi kultarahan jokaista tiiltä kohti. Sitä minä '
        + 'en toista: se ei ole lähteissäni.',
      /*
       * Sama tarkistettu tiedosto kuin pöllön huomiolla — sama talo,
       * eri kuvateksti: vaihe 2 näyttää talon, täky kertoo tontin.
       */
      kuva: {
        tiedosto: 'Sarajevo - Inat kuća (49104054186).jpg',
        selite: 'Uhman talo joen rannalla. Alkuperäinen tontti oli '
          + 'vastarannalla, siellä missä kaupungintalo nyt seisoo.',
        lahde: 'Fred Romero, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Mitä keisarikunnan virkamiehet aikoivat rakentaa sille '
          + 'tontille, jolla uhmakas talo seisoi?',
        vaihtoehdot: [
          'Kaupungintalon ja kirjaston',
          'Rautatieaseman',
          'Sotilassairaalan',
        ],
        oikea: 0,
        fakta: 'Talo purettiin, siirrettiin ja koottiin uudelleen joen '
          + 'toiselle puolelle. Vijećnica, kaupungintalo ja '
          + 'kansalliskirjasto, nousi lopulta tyhjentyneelle tontille.',
      },
    },
    {
      id: 'haggada',
      nappi: 'Kirja, jonka pelasti väärä ihminen',
      otsikko: 'Sarajevon haggada ja kaksi lupausta',
      /*
       * Faktat: takyt-sarajevo.md, täky 2 (VARMA) ja takynostot-bosnia.md,
       * ehdokas 3 (Mira Papon käänne, en-Wikipedia "Sarajevo Haggadah",
       * osio "Cultural references").
       *
       * KAANONIN SÄVYVAATIMUS: *"käsittele kunnioittavasti"*. Teksti ei
       * dramatisoi vainoa eikä nimeä vainoajia enempää kuin lähde, ja
       * 1990-luku on yhdessä neutraalissa lauseessa. Painopiste on
       * ihmisissä, jotka pitivät sanansa.
       *
       * PÄÄLLEKKÄISYYS ON TARKISTETTU. Lehdessä on jo nosto "Kirja, joka
       * piilotettiin moskeijaan" (js/packs/kulttuuri-kategoriat.js), joka
       * kertoo Espanjan, 1492:n, museon 1894 ja Korkutin. Tämä täky ei
       * ole sen toisinto: sen oma asia on ketju, joka jatkui Korkutin
       * jälkeen — Mira Papo, jota lehti ei mainitse lainkaan.
       */
      teksti: 'Kansallismuseon vitriinissä on kirja, jota isoisäsi ei '
        + 'olisi voinut siellä nähdä: museo osti sen vasta 1894. Sarajevon '
        + 'haggada tehtiin noin vuonna 1350 Pohjois-Espanjassa, luultavasti '
        + 'Barcelonassa, ja se on maalattu vasikannahalle. Sen sivuilla on '
        + 'viinitahroja — merkki siitä, ettei se ollut koriste vaan '
        + 'käytössä pääsiäisaterioilla. Kirja lähti Iberian niemimaalta '
        + '1492 karkotettujen mukana, kulki 1500-luvulla Italian kautta ja '
        + 'päätyi tänne. Toisen maailmansodan aikana museon '
        + 'pääkirjastonhoitaja Derviš Korkut vei sen pois kaupungista '
        + 'oman henkensä uhalla ja antoi sen muslimipapille Bjelašnican '
        + 'rinteen vuoristokylään, missä se piilotettiin moskeijaan. Samaan '
        + 'aikaan Korkut ja hänen vaimonsa piilottivat kodissaan nuoren '
        + 'juutalaistytön, Mira Papon. Tarina ei pääty siihen. '
        + 'Vuosikymmeniä myöhemmin, iäkkäänä naisena Israelissa, Mira Papo '
        + 'huolehti siitä, että Korkutin tytär oli turvassa. Kirja itse '
        + 'siirrettiin 1992 keskuspankin holviin ja odotti siellä.',
      /*
       * Commons 25.8.2026: 723×1000, public domain (PD-old-100-expired),
       * tekijä tuntematon, ajoitus 1350, kategoria Sarajevo Haggadah,
       * lähdeviite Zemaljski muzej. Itse käsikirjoituksen sivu.
       */
      kuva: {
        tiedosto: 'Sarajevska hagada.jpg',
        selite: 'Sivu Sarajevon haggadasta. Käsikirjoitus tehtiin noin '
          + 'vuonna 1350 ja maalattiin vasikannahalle.',
        lahde: 'Tuntematon tekijä n. 1350, Zemaljski muzej, Wikimedia '
          + 'Commons (public domain)',
      },
      visa: {
        kysymys: 'Mikä haggadan sivuilla paljastaa, että kirja on ollut '
          + 'oikeassa käytössä?',
        vaihtoehdot: [
          'Viinitahrat',
          'Kuluneet kannen saranat',
          'Reunoihin kirjoitetut muistiinpanot',
        ],
        oikea: 0,
        fakta: 'Tahrat kertovat, että kirjaa on käytetty pääsiäisaterioilla. '
          + 'Museon kokoelmiin se tuli vasta vuonna 1894.',
      },
    },
    {
      id: 'villihevoset',
      nappi: 'Hevoset, jotka jätettiin vuorille',
      otsikko: 'Livnon lauma',
      /*
       * KAANONIN ELÄINTÄKY (kohta 3). Faktat: takyt-sarajevo.md, täky 17
       * ja takynostot-bosnia.md, ehdokas 7 — molemmat nojaavat
       * en-Wikipedian artikkeliin "Feral horse", osio "Europe", ja
       * ympäristöluvut artikkeliin "Livanjsko Polje".
       *
       * VARMUUSRAJAUS ON NOUDATETTU: teksti ei anna hevosista muita
       * lukuja kuin ne, jotka lähteessä ovat (yli 700, noin 145 km²,
       * 1950-luku, suojelu 2010), koska Livnon ja Livanjsko Poljen omat
       * artikkelit eivät mainitse hevosia lainkaan.
       */
      teksti: 'Nyt lähden hetkeksi kaupungista, koska tämä ei odota. Maan '
        + 'lounaisosassa, Livnon ja Kupresin välissä Cincar-vuoren '
        + 'juurella, laukkaa yli seitsemänsataa hevosta noin '
        + 'sadanviidenkymmenen neliökilometrin alueella. Ne eivät ole '
        + 'muinaisia villihevosia. Ne polveutuvat työhevosista: kun koneet '
        + 'korvasivat hevosen 1950-luvulla, omistajat päästivät ne '
        + 'vapaaksi ylängölle. Lauma jäi sinne, lisääntyi ja on ollut '
        + 'suojeltu vuodesta 2010. Ympärillä leviää Livanjsko polje, '
        + 'maailman suurin karstikenttä — 458,7 neliökilometriä — ja se on '
        + 'kuulunut Ramsarin kosteikkoluetteloon vuodesta 2008.',
      /*
       * Commons 25.8.2026: 1600×1200, CC BY 2.0, Brian Eager, kuvattu
       * 19.7.2012, kategoria Wild horses of Livno. Kuvaajan oma
       * tiedostokuvaus on "Livno Wild horses (10)".
       */
      kuva: {
        tiedosto: 'Livno wild horses (1).jpg',
        selite: 'Livnon lauma Cincar-vuoren juurella. Hevoset polveutuvat '
          + '1950-luvulla vapautetuista työhevosista.',
        lahde: 'Brian Eager, Wikimedia Commons (CC BY 2.0)',
      },
      visa: {
        kysymys: 'Mistä Livnon ylängön lauma sai alkunsa?',
        vaihtoehdot: [
          'Työhevosista, joita ei enää tarvittu',
          'Ottomaaniarmeijan karanneista ratsuista',
          'Muinaisesta villihevoskannasta',
        ],
        oikea: 0,
        fakta: 'Hevosia on nyt yli seitsemänsataa noin 145 neliökilometrin '
          + 'alueella, ja ne ovat olleet suojeltuja vuodesta 2010.',
      },
    },
  ],

  /*
   * ---------- 5. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, sarajevo: *"Sarajevon
   * kuparisepät takovat astiaa, joka kuuluu kaupungin kahvipöytään. Mikä
   * se on?"* → pitkävartinen pannu, jossa kahvi keitetään vaahtoavaksi).
   *
   * Visasääntö täyttyy: vastauksen aines on tekstissä (kuparipannu,
   * jossa kahvi keitetään), mutta kysymyksen sanamuoto ei toistu siinä
   * sellaisenaan eikä teksti nimeä astiaa.
   *
   * FAKTAT OVAT PELIN OMASTA, JO HYVÄKSYTYSTÄ SARAJEVO-AINEISTOSTA:
   * Baščaršijan synty 1462 ja Isa-bey Ishaković, noin 12 000 puotia ja
   * verstasta, kadut käsityöläisammateittain sekä Evliya Çelebin lainaus
   * (js/packs/nahtavyysjutut.js, "Baščaršija"); Kazandžilukin kuja ja
   * sen taotut tarjottimet, kahvipannut ja kuparimaljat (saman kohteen
   * kuvateksti); bosnialainen kahvi kuparipannussa hitaasti juotuna
   * (js/packs/europe-artikkelit.js, Sarajevo). Mitään uutta
   * faktaväitettä ei ole lisätty.
   */
  oppitunti: {
    otsikko: 'Kazandžiluk — kuja, jonka kuulee ennen kuin näkee',
    teksti: 'Sarajevo alkoi kauppapaikasta. Ottomaanien käskynhaltija '
      + 'Isa-bey Ishaković perusti 1460-luvulla jokilaaksoon majatalon ja '
      + 'ensimmäiset puodit, ja niistä kasvoi Baščaršija — '
      + 'parhaimmillaan noin 12 000 pientä puotia ja verstasta. Kauppa oli '
      + 'järjestetty kaduittain: yhdellä kujalla ommeltiin satuloita, '
      + 'toisella valmistettiin kenkiä, kolmannella lyötiin kuparia. Tuo '
      + 'kolmas on yhä olemassa ja sillä on oma nimensä, Kazandžiluk. Sen '
      + 'tunnistaa korvilla ennen kuin silmillä. Puotien pöydillä on '
      + 'taottuja tarjottimia, maljoja ja pannuja, ja pannu on niistä se, '
      + 'jota kaupunki oikeasti käyttää joka päivä: bosnialainen kahvi '
      + 'keitetään kuparissa ja juodaan hitaasti — se ei ole virvoke vaan '
      + 'tapa istua alas jonkun kanssa. Kun 1600-luvun ottomaanimatkaaja '
      + 'Evliya Çelebi laski täällä puodit, hän kirjoitti niiden olevan '
      + 'kauneuden perikuva. Äänestä hän ei sanonut mitään. Minä sanon: '
      + 'vasara kuparia vasten on tämän kaupungin vanhin soitin.',
    /*
     * Commons 25.8.2026: 4128×3096, CC BY-SA 4.0, 11sasapus11, kuvattu
     * 27.10.2018, kuvaus "Street Kazandziluk in Sarajevo", kategoriat
     * Kazandžiluk ja Shops in Baščaršija.
     */
    kuva: {
      tiedosto: 'Kazandziluk 02.jpg',
      selite: 'Kazandžilukin kuja Baščaršijassa. Kupariseppien puodit ovat '
        + 'olleet samalla kadulla vuosisatoja.',
      lahde: '11sasapus11, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /*
   * ---------- 6. Kohtaaminen ----------
   * Kaanon, kohta 4: *"Rakentaja tarkistaa hahmon ja laattakysymyksen —
   * EI vaihdeta."*
   *
   * TARKISTETTU 25.8.2026: js/packs/kohtaamiset.js:ssä EI ole Sarajevon
   * riviä (tiedostossa on kuusi kaupunkia: Lontoo, Kairo, Tukholma,
   * Madrid, Venetsia, Berliini). Sarajevon hahmo on silti olemassa ja
   * pelissä käytössä: tarinakaaren paketti js/tyohuone-kehitys-data.js
   * (KAARI_PAKETIT, id 'sarajevo') antaa hahmon JA sen kysymyksen, jonka
   * game.actionQuiz esittää laatalla (js/game.js kaariTarina). Hahmo on
   * siis Kupariseppä Emir, eikä tämä paketti kosketa kysymystä millään
   * tavalla — sama suhde kuin Ateenan Nikoksella ja Sofian Nadialla.
   *
   * KOHTAAMISKUVAA EI OLE. Sofian paketissa on
   * assets/kohtaamiset/kohtaaminen-sofia.jpg; Sarajevon
   * KAARI_PAKETIT-rivillä ei ole `kuva`-kenttää eikä tiedostoa ole
   * repossa (tarkistettu 25.8.2026). Se ei estä kohtaamista, mutta on
   * merkitty päätoimittajalle.
   *
   * Esittely on tämän kortin omaa tekstiä ja kirjoitettu niin, ettei se
   * kertaa Emirin omaa repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Kupariseppä Emir',
    nappi: 'Tapaa Emir',
    teksti: 'Emirin paja on Kazandžilukin kujalla, ja hänen sukunsa on '
      + 'takonut saman oven takana kolmesataa vuotta. Hän tunnistaa '
      + 'tulijan askelista ennen kuin nostaa katseensa: kuka on tullut '
      + 'ostamaan ja kuka katsomaan. Herra Foggia hän ei hoputa. Emir '
      + 'laskee vasaransa vasta kun on varma, että vieras on ymmärtänyt, '
      + 'mitä näiden pöytien esineistä yksi merkitsee kaupungille '
      + 'enemmän kuin muut.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin Ateenalla ja Sofialla. Raskas korttivirta
   * ei lue kumpaakaan.
   */

  /*
   * KOHTAAMISPAIKKA: LATINSKA ĆUPRIJA (Latinalaissilta), ei kaupungin
   * laatta. Kaanon, kohta 4, määrää paikan ja antaa koordinaatit
   * 43,8578 N / 18,4289 E sekä käskee rakentajan laskea laudat ja
   * TARKISTAA. Tarkistus muutti lopputulosta, ja siksi tämä on tämän
   * tiedoston pisin kommentti.
   *
   * KAAVAT ovat samat kuin fokuskohteilla (js/packs/fokuskohteet-bih.js):
   * maailmankartalla Millerin lieriö LEVEYS 12000 / LON0 -175 /
   * POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio), Euroopan
   * laudalla x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
   *
   * SUORA LASKU antaa sillalle maailmankartalla 6447,6 / 1648,6 ja
   * Euroopan laudalla 565,0 / 740,1.
   *
   * MIKSI NÄITÄ LUKUJA EI VOI KÄYTTÄÄ. Sofiassa suora lasku osui puolen
   * yksikön päähän kaupungin laatasta, koska Sofian laatta on omalla
   * oikealla paikallaan. SARAJEVON LAATTA EI OLE. Lauta vaatii
   * kaupunkien väliksi 60 yksikköä (minCityDistance), ja Sarajevo on
   * oikealla paikallaan vain 30 yksikön päässä Dubrovnikista — laattaa
   * on siksi siirretty pohjoiseen (js/packs/europe.js, Sarajevon oma
   * kommentti: *"Nyt siirto on pohjoiseen: tämä on lähin sallittu
   * paikka, joka on maan sisällä"*). Siirto on molemmilla laudoilla:
   *
   *   kaupungin oikea paikka   maailmankartta 6447,1 / 1648,6
   *                            europe          564,7 /  740,2
   *   laatan todellinen paikka maailmankartta 6440,6 / 1601,6
   *                            europe          561   /  710
   *   siirto                   maailmankartta   −6,5 /  −47,0
   *                            europe           −3,7 /  −30,2
   *
   * Suoraan laskettu piste piirtyisi siis maailmankartalla 47 yksikön
   * (noin 130 km) päähän omasta laatastaan ja Euroopan laudalla 30
   * yksikön päähän. Vihreän pisteen vieressä on sen nimilappu
   * ("Latinska ćuprija"), joten se ei näyttäisi tarkalta vaan rikkinäiseltä.
   *
   * RATKAISU: piste seuraa laattaa. Sillan paikka lasketaan suhteessa
   * kaupungin keskipisteeseen ja siihen lisätään laatan oma siirto,
   * jolloin silta on laatan vieressä täsmälleen siinä suunnassa ja
   * etäisyydessä kuin se on kaupungin keskustassakin:
   *
   *   maailmankartta  6447,6 + (−6,5) = 6441,1   1648,6 + (−47,0) = 1601,5
   *   europe           565,0 + (−3,7) =  561,3    740,1 + (−30,2) =  710,0
   *
   * Etäisyys laatasta on nyt maailmankartalla 0,5 ja Euroopan laudalla
   * 0,3 yksikköä — sama luokka kuin Sofian muistomerkillä, ja oikea
   * mittakaava: silta on runsaan kilometrin päässä kaupungin
   * keskipisteestä, ja laudan yksikkö on maailmankartalla noin kolme
   * kilometriä.
   *
   * FABLEN TARKISTETTAVA. Tämä on rakentajan ratkaisu, ei kaanonin.
   * Toinen mahdollinen linja olisi maantieteellinen totuus: silta
   * oikealle paikalleen maan lehden päälle ja laatta jätetään omaan
   * siirtoonsa. Silloin nämä neljä lukua ovat maailmankartta
   * 6447,6 / 1648,6 ja europe 565,0 / 740,1 — vaihto on kahden rivin
   * työ. Laatan siirto itsessään on laudan oma asia (js/packs/europe.js
   * ja js/packs/maailmankartta.js), eikä tämä paketti kosketa sitä.
   */
  kohtaamispiste: {
    nimi: 'Latinska ćuprija',
    laudat: {
      maailmankartta: { x: 6441.1, y: 1601.5 },
      europe: { x: 561.3, y: 710.0 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS (sama perustelu kuin Ateenassa ja
   * Sofiassa). Sarajevon lehden sivupino on kuvattu tiedoston
   * alkupuolella visojen yhteydessä: 0 = etusivu, 1 = kaupunkisivu
   * "Sarajevo", 2 = Talvikisat, 3 = Menovinkit.
   *
   * SISÄLTÖ ON LEHDEN OMAA. AARTEEN AVAUS on koottu sivun 2 omasta
   * olympianostosta (FRANKO_VISA) ja JULISTE "Matkailijan Sarajevo"
   * -artikkelin kellotornijaksosta (SAHAT_KULA_VISA) — ei yhtään uutta
   * faktaväitettä kummassakaan.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: FRANKO_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: SAHAT_KULA_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Bosnia ja Hertsegovina) ----------
   *
   * Raamattu, osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU: kun maan
   * aarre on löydetty, kartalta NOUSEE YKSI TÄKYNOSTO — *"lyhyt
   * KELTAISTEN LEHTIEN KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai
   * uskomaton tositarina, lupaus lunastetaan faktalla) + miniatyyrikuva
   * perässä"*. Näytetään yksi kerrallaan; luetun tilalle nousee poolista
   * seuraava.
   *
   * OTSIKOT OVAT KAANONIN OMAT (fokusvirta-sarajevo-kaanon.md, kohta 6)
   * — sanamuotoja ei ole muutettu. `lunastus` on rakentajan kokoama
   * lyhyt fakta, joka pitää otsikon lupauksen (takynostot-kreikka.md,
   * sääntö 1: otsikon lupaus lunastetaan tai se on klikkihuijaus).
   * `avaa` osoittaa tämän tiedoston täkyyn, jos sellainen on.
   *
   * VAIN YKSI NOSTO PER MAA (omistaja 26.8.2026 ilta: *"Täkyjä josta
   * tulee puhekupla pitää olla vain yksi per maa. Kaikki muut
   * normaaleita."*). Poolissa oli kolme nostoa; jäljellä on kaanonin
   * ensimmäinen. Kumpikaan pudonneista ei tarvinnut uutta kohdetta:
   * "haggada" ja "villihevoset" osoittivat kentällään `avaa` tämän
   * tiedoston OMIIN TÄKYIHIN, joissa sama aihe on jo kerrottu
   * pidempään — kahta kertomusta samasta asiasta ei tehdä.
   *
   * KAIKKI KOLME OTSIKKOA TARKISTETTIIN takynostot-bosnia.md:tä vasten
   * eikä yksikään vaatinut korjausta:
   *   1. "Seitsemän arkeologia" — ehdokas 1: *"Seitsemän Euroopan
   *      johtavaa arkeologia allekirjoitti julkilausuman"*, ja
   *      julkilausuman sanatarkka sitaatti on "cruel hoax on an
   *      unsuspecting public".
   *   2. "salakuljetti käsikirjoituksen vuorille — ja piilotti samalla
   *      tytön" — ehdokas 3: Korkut salakuljetti kirjan Bjelašnican
   *      vuoristokylään, ja hän ja hänen vaimonsa piilottivat samaan
   *      aikaan Mira Papon. Raportin oma otsikkorajaus ("älä keksi
   *      takin alla -yksityiskohtaa") ei koske tätä muotoilua.
   *   3. "Seitsemänsataa villihevosta" — ehdokas 7: lähde sanoo "more
   *      than 700", eli seitsemänsataa hevosta todella kuuluu ylängöllä
   *      ei kenellekään. Lunastus antaa tarkan muodon ("yli
   *      seitsemänsataa") ja käänteen: ne eivät ole muinaisia
   *      villihevosia.
   *
   * SOTARAJAUS: yksikään nosto ei kosketa 1990-lukua
   * (takynostot-bosnia.md, sääntö 3).
   */
  takynostot: [
    {
      id: 'pyramidi',
      // Kartan nimiö täkypisteen kylkeen (päätoimittaja 28.8.2026).
      nimio: 'Pyramidihuijaus',
      otsikko: 'Seitsemän arkeologia allekirjoitti julkilausuman: '
        + 'pyramidi on julma huijaus',
      /* Faktat: takynostot-bosnia.md, ehdokas 1 (VARMA). */
      lunastus: 'Vuonna 2005 bosnialais-amerikkalainen liikemies Semir '
        + 'Osmanagić alkoi julistaa, että Visokon luonnonkukkulat ovat '
        + 'maailman suurimmat ihmisen tekemät pyramidit. Geologit ovat '
        + 'osoittaneet kukkulat luonnonmuodostumiksi, ja seitsemän Euroopan '
        + 'johtavaa arkeologia allekirjoitti julkilausuman, jossa hanketta '
        + 'kutsutaan julmaksi huijaukseksi, jolla ei ole sijaa aidon '
        + 'tieteen maailmassa. Kukkulan päällä on samaan aikaan aito '
        + 'keskiaikainen Bosnian kuninkaallinen linnoitus.',
      /*
       * Tälle nostolle ei ole omaa täkyä tässä tiedostossa, joten `avaa`
       * puuttuu tarkoituksella — lunastus kannattelee noston yksinään.
       *
       * Commons 25.8.2026: 4000×3000, CC BY-SA 4.0, Mhare, kuvattu
       * 2.6.2013, kuvaus "Visočica hill from the road", kategoria
       * Visočica (hill near Visoko). Kuvassa pelaaja näkee itse kukkulan
       * ja saa tehdä oman päätelmänsä.
       */
      kuva: {
        tiedosto: 'Visočica hill from the road.jpg',
        selite: 'Visočican kukkula Visokon lähellä. Geologien mukaan se on '
          + 'luonnonmuodostuma.',
        lahde: 'Mhare, Wikimedia Commons (CC BY-SA 4.0)',
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * Kaanon, kohta 5 — teksti sellaisenaan. Isoisän merkintä, joka aukeaa
   * kun aarre löytyy. Kaanon: tähän maahan ei tule vaanijaa.
   */
  aarremerkinta: {
    teksti: 'Kätkö oli sillan kolmannen kaaren alla, käden ulottuvilla — '
      + 'mutta joki tuli syksystä paksuna enkä uinut. Piirsin kaaren niin '
      + 'tarkasti, että sinä löydät sen kuivin jaloin.',
  },
};
