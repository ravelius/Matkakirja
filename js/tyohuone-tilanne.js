/*
 * Rakennustyön tilannetaulu työhuoneen etusivulle (omistajan toive
 * 8.8.2026: "yhteenveto, joka päivittyy, siitä missä tämänhetkinen
 * rakennustyö on menossa").
 *
 * TÄTÄ TIEDOSTOA PÄIVITTÄÄ FABLE aina, kun sessioilta saapuu
 * raportti tai työjono muuttuu — muut sessiot eivät kirjoita tähän.
 * Työhuone näyttää taulun etusivun kärjessä. Tilat: 'tyossa',
 * 'valmis', 'odottaa' (selväkielinen selite riville).
 */

export const TILANNE = {
  paivitetty: '15.8.2026 — v705–v751',
  tavoite: 'Kartat: 10 kaupungilla värikartta + piirrospisteet '
    + '(suurennos, kyltit, osuma-alue hiottu). Lippusivut 58/118. '
    + 'Kööpenhaminan lehtimalli valmis: avauskuvakaruselli, 2 palstan '
    + 'karttateksti, Matkailijalle kuvineen, opasartikkeli. '
    + 'Avauskuvat myös Berliini, Helsinki, Pariisi, Lontoo. Työhuoneen '
    + 'palkit (R2, repo, Eleven, pöllö, kulut). Paluunuoli '
    + 'henkilöjuttuihin. LEHTITAUKO: uusia lehtiä ei kirjoiteta ennen '
    + 'nykyisten parannusta.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'päätoimittaja',
      tila: 'tyossa',
      tehtava: 'Lehtimallin pilotti, avauskuvaerät, lippusivut, '
        + 'kartan ja työhuoneen hionta omistajan palautteista.',
      seuraavaksi: 'Avauskuvaerä 2 (Rooma, Wien, Praha, Amsterdam, '
        + 'Tukholma); Matkailijalle-monistus Opukselle omistajan '
        + 'tsekin jälkeen; lippuerä 8.',
    },
  ],
  odottaaPaatosta: [
    'Kööpenhaminan lehtimallin hyväksyntä (monistuksen aloitus)',
    'Mac-Safari-äänikorjauksen testi Macilla (v741)',
    'Kehittäjätilan kytkentä täydellä koodilla (työhuoneen palkit)',
    'Pöllö-työtila Anthropic-konsoliin (kulujen rajaus)',
    'Karttaerien 2–5 kaupunkilistat',
    'Kazakstanin ja Syyrian lippusivut (erikseen)',
  ],
};

/**
 * Testattavaa juuri nyt. ÄÄRIMMÄISEN MINIMALISTINEN (omistajan
 * linjaus 15.8.2026: "tavuviiva ja muutama sana per kohta
 * korkeintaan — muistan itse kyllä suurimman osan"). Uusin ensin;
 * rivit siivotaan kun ne on katsottu.
 */
export const TESTATTAVAA = [
  'v784 — iPad: käy toisessa apissa ja palaa; alanapit paikallaan',
  'v783 — säägraafi elää, Seinen karuselli, paperi ehyt',
  'v782 — opas 2.2: kainalotaulu (napauta rivejä), säägraafi',
  'v781 — nauha koko osion yli, leveämpi, pehmeämmät värit',
  'v780 — opas 2.1: kainalot, uusi paletti, iso otsikko, lämmin kuva',
  'v779 — etusivulla yksi diagonaalinauha: Matkaopas',
  'v778 — Matkailijalle-kuvateksti napakaksi (7 kaupunkia)',
  'v777 — Matkailijalle: kyltti kuvan kulmassa, Lue lisää -linkki',
  'v776 — Pariisin opas 2.0: jaksot, sää, hinnat, linkit, lappu',
  'v775 — äänet poistettu repostä: luennat + taustat R2:sta',
  'v774 — äänet R2:sta; asennus kevenee 180 Mt (testaa äänet!)',
  'v773 — Maxin työlista huomiselle (moduulit + docs-remontti)',
  'v772 — Raamatussa: äänet R2, oppaan ilme, speksioppi, remontti',
  'v771 — Pariisin etusivukuvat: tsekkaa ja hyväksy monistus',
  'v770 — Raamatussa etusivukuvien kaava (Kuvat ja lähteet)',
  'v769 — karttatekstin loppu: piirroskarttojen oma ohje',
  'v768 — Matkailijalle 5 kaupunkiin (Berliini, Pariisi, Lontoo, Rooma, Wien)',
  'v767 — vaakunan ajoittainen tumma laatikko: pitäisi olla poissa',
  'v766 — opas: otsikko VIHDOIN näkyviin; kuvat tekstin lomaan',
  'v765 — Köpiksen uusilla kohteilla piirrokset kartalla',
  'v764 — Köpiksen kartalla 9 kohdetta (uudet: 7–9, ympyröinä)',
  'v763 — vaakuna isona ilman laatikkoa; liput paikallaan',
  'v762 — jutun otsikko: vahti pitää yläreunan paikallaan',
  'v761 — työhuoneessa vain palkit, tekstirivit pois',
  'v760 — tarkennettu vaakuna pergamenttilevyllä, ei tummaa',
  'v759 — jutun otsikko pysyy näkyvissä kuvan latautuessa',
  'v758 — työhuoneen palkit: pitäisi VIHDOIN näyttää luvut',
  'v757 — jutun napit kortissa kiinni; leveys kestää appivaihdon',
  'v756 — opas leveämpi iPadilla; ☰ pois oppaan yläkulmasta',
  'v755 — tyhjät palkit: sulje valikko ja avaa uudelleen',
  'v754 — kulurivi kertoo lähdevirheen; avaa valikko uudelleen',
  'v753 — Helsingin Matkailijalle: kappale, kuva, opas',
  'v751 — lippusivut: Kaakkois- ja Etelä-Aasia (10 maata)',
  'v750 — paluunuoli Engel-jutusta; kulurivin oikea syy',
  'v749 — karttateksti 2 palstaan; Matkailijalle- ja opaskuvat',
  'v748 — ison piirroksen klikki: vain kuvan keskiosa avaa',
  'v747 — lippusivut: Lähi-itä (8 maata)',
  'v746 — avauskuvat 4 kaupunkiin; R2 molemmat ämpärit; kulunimiö',
  'v745 — etusivun karuselli koko palstan levyinen',
  'v744 — R2-palkki megatavuina; Eleven-lukema tiiviiksi',
  'v743 — pöllön kuva: ei enää kaimakyliä; epävarmana ei kuvaa',
  'v742 — lukija seis joka pop-upista (kartta, maalehti, pöllö)',
  'v741 — Mac-Safari: striimiluennan ääni (testaa Macilla!)',
  'v740 — Työhuone: palkit, tyylinapit, Lukijaääni',
  'v739 — piirros juttuun; klikkausalue 80 %',
  'v738 — Kööpenhamina-lehti: karuselli + Matkailijalle',
  'v737 — 6 uutta karttaa; piirrokset terävinä; lippuanimaatio',
  'v736 — vain värikartta; numero kylttiin',
  'v735 — suurennos keskitetty, 75 %; kyltti kiinni',
  'v734 — kartta 70 %; kyltti tiiviimmin; lippu ilman laatikkoa',
  'v733 — lippusivut: Aasia (8 maata)',
  'v732 — suurennos 65 %; kyltti kiinni rakennukseen',
  'v731 — lippusivut: Slovenia–Azerbaidžan (6 maata)',
  'v730 — lippuikkunan tarkennus + sumennus; kartta 40 %',
  'v729 — lippusivut: Itä-Eurooppa + Balkan (9 maata)',
  'v728 — suurennos ¼ kartasta; kyltistä juttuun; vipunapin teksti',
  'v727 — lippusivut: Länsi-Eurooppa (8 maata)',
  'v726 — lippusivut: Pohjoismaat + Baltia (7 maata)',
  'v725 — lippuikkunan iso kuva reunasta reunaan',
  'v724 — piirrokset skaalautuvat zoomissa; peruskoko 40 px',
  'v723 — kultaneliön OIKEA syy: hover-korostus; koko 4×',
  'v722 — piirrokset PNG:inä: neliö varmasti pois',
  'v721 — iOS-neliö pois suurennoksesta; koko 3,5×',
  'v720 — piirroksen suurennos 3×',
  'v719 — piirroksen klikkaus vain suurentaa, ei ikkunaa',
  'v718 — piirrokset pienempinä, nuolet pois',
  'v717 — piirrokset yksivärisinä luonnoksina',
  'v716 — lippuikkuna: 2/3-korkeus, symboliikka, vaakunat',
  'v715 — piirrokset hajallaan + nuolet; klikkaus: kyltti → juttu',
  'v714 — kartan piirrokset leikattuina, numerot pois',
  'v713 — pöllön kuvalle paikanpitäjä + animaatio',
  'v712 — pöllön kuva löytyy myös hakusanalla',
  'v711 — lipusta lipun tarina (Saksa, Suomi)',
  'v710 — piirrokset pisteinä + kortit 4 kaupungissa',
  'v709 — värikartat: Helsinki, Pariisi, Lontoo',
  'v708 — Berliinin pisteet: piirroskortti + juttuun',
  'v707 — Berliinin värikartta (vipu kartalla)',
  'v706 — Raamatun taitto: kappaleet, ei palstoja',
  'v704 — radio hiljenee pöllön/lukijan puhuessa',
  'v703 — pöllön vastauskuva; klikkaus isoksi',
  'v702 — oletusprompti näkyvissä; vuosiluvut ei lueta',
  'v701 — Raamattu tiiviinä + valmis/kesken-tagit',
  'v699 — nähtävyysjutut: Panthéon, Luco, Kallio, Lintsi',
  'v697 — Kehittäjä-valikko: Raamattu- ja Tilannelehti',
  'v695/v696 — esipuskurit; reunuskartat 4 kaupunkia',
  'v694 — ElevenLabs-äänitteet takaisin merkintöihin',
  'v692 — taustaäänet tasattu; v691 Venäjän radio',
  'v683–v687 — lukijan automoodi, otsikkotauot, väistö',
];
