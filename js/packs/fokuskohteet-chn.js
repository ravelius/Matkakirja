/*
 * FOKUSKOHTEET — KIINA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-syr.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Kiinassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden MAAILMAN ERÄ (27.8.2026). Kiinalla ei ollut
 * vielä yhtään fokuskohdetta, joten Yuanmingyuan olisi jäänyt
 * kokonaan pois — mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.CHN, tiedosto CHN.webp), joten
 * merkillä on lehti, jonka päälle asettua. Se oli lisäyksen ainoa
 * tekninen ehto. Tiedosto on tarkoituksella yhden kohteen mittainen
 * ja odottaa ensimmäistä varsinaista Kiina-erää — maalla riittäisi
 * kohteita kymmeniksi riveiksi.
 *
 * ── PEKING ON PELILAATTA, YUANMINGYUAN EI OLE ──────────────────────
 *
 * Sama sääntö ja sama ratkaisu kuin Forum Romanumilla Roomassa
 * (js/packs/fokuskohteet-ita.js): kohde on yksi nimetty paikka
 * kaupungin sisällä, ei toinen Peking. Puisto on Haidianin
 * kaupunginosassa noin kahdeksan kilometriä vanhan keisarikaupungin
 * muureista luoteeseen, ja laudalla se on 5,5 yksikköä Pekingin
 * laatasta (9713,3 / 1806,8) — merkit erottuvat toisistaan.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Peking ei ole Euroopan laudan kaavan sisällä, joten rivillä on vain
 * `maailmankartta`. Kaava on maailmankartan Millerin lieriö (LEVEYS
 * 12000 / LON0 −175 / POHJOINEN 76, tools/tee-fokuskartta.mjs
 * laudanProjektio), validoitu ennen käyttöä jo kirjatuilla kohteilla
 * (Delfoi ja Ateena osuivat 0,5 yksikön tarkkuudella). Piste osuu
 * CHN-lehden rajaukseen (x 7920–10693, y 907–2912).
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli "Old
 * Summer Palace" 27.8.2026 — ei työaineistoa, joten lähderivi
 * osoittaa suoraan artikkeliin.
 */
export const FOKUSKOHTEET_CHN = [
  {
    /*
     * YUANMINGYUAN. 116,2925 E / 40,00722 N — en-Wikipedia "Old Summer
     * Palace" (40°00′26″N 116°17′33″E). Piste on puutarha-alueen oma
     * paikka Haidianissa.
     *
     * ESITYSTAPA ON "KADONNUT" (`kadonnut: true`). Palatsit, sillat ja
     * paviljongit poltettiin lokakuussa 1860, eikä yhtäkään niistä ole
     * rakennettu takaisin. Paikalla on puisto ja kivirauniot; selite
     * sanoo sen, mutta kohde itse — puutarhojen puutarha — ei ole
     * olemassa, joten kartalla on tähti ja kortissa vain ihmekuva.
     *
     * TÄMÄ KOHDE OSUU PÄIVÄKIRJAN AIKAAN: tuho oli 1860 eli
     * kolmetoista vuotta ennen isoisän matkaa. Jos hän olisi 1873
     * seissyt tässä, hän olisi nähnyt tuoreet rauniot — ei puutarhaa.
     * Selite sanoo sen ääneen.
     */
    id: 'yuanmingyuan',
    nimi: 'Yuanmingyuan',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi puutarhoihin rakennettiin eurooppalaisia palatseja?',
      'Missä puutarhojen aarteet ovat nykyään?',
    ],
    korostukset: ['Qianlong|Qianlong-keisarin', 'Xiyang Lou|Xiyang Lou'],
    nappi: 'Puutarha, jota sanottiin puutarhojen puutarhaksi',
    laudat: {
      maailmankartta: { x: 9709.8, y: 1802.6 },
    },
    teksti: 'Yuanmingyuan eli "täydellisen kirkkauden puutarha" oli '
      + 'palatsien ja puutarhojen alue Pekingin luoteispuolella. Se '
      + 'rakennettiin 1700-luvulla ja 1800-luvun alussa, ja se oli '
      + 'Qianlong-keisarin ja hänen seuraajiensa varsinainen '
      + 'asuinpaikka ja työhuone — Kielletty kaupunki jäi juhlamenoja '
      + 'varten. Kolme puutarhaa kattoivat yhdessä 3,5 neliökilometriä '
      + 'eli lähes viisi kertaa Kielletyn kaupungin alan, ja niillä '
      + 'seisoi satoja saleja, paviljonkeja, temppeleitä ja siltoja. '
      + 'Aikalaiset kutsuivat aluetta puutarhojen puutarhaksi. Yhteen '
      + 'nurkkaan Qianlong rakennutti jesuiitta Giuseppe Castiglionen '
      + 'piirtämät eurooppalaistyyliset Xiyang Lou -palatsit '
      + 'suihkulähteineen; kuuluisin niistä oli kellosuihkulähde, '
      + 'jonka kaksitoista eläinradan eläintä syöksivät vettä vuorollaan '
      + 'kahden tunnin välein ja keskipäivällä kaikki yhtä aikaa.',
    lahde: 'en-Wikipedia "Old Summer Palace", johdanto sekä osiot '
      + '"Overview" ja "Western mansions" (tarkistettu 27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Kortissa on vain tämä kuva.
     *
     * TUHO KERROTAAN TAPAHTUMANA. Toisen oopiumsodan loppuvaiheessa
     * ranskalaiset ja brittijoukot valtasivat alueen 6.10.1860 ja
     * ryöstivät kokoelmat; lordi Elgin määräsi 18.10.1860 alueen
     * poltettavaksi, ja työhön meni 4 000 miestä ja kolme päivää.
     * Peli kertoo päivämäärät ja luvut niin kuin artikkeli ne kertoo
     * eikä kuvaile enempää — sama rajaus kuin Syyrian tiedostossa.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-yuanmingyuan.webp',
      kadonnut: true,
      selite: 'Yuanmingyuan oli Kiinan keisarien varsinainen koti ja '
        + 'aikansa suurin puutarha-alue: 3,5 neliökilometriä saleja, '
        + 'paviljonkeja ja lampia, joiden joukossa eurooppalaistyyliset '
        + 'Xiyang Lou -palatsit suihkulähteineen. Britti- ja '
        + 'ranskalaisjoukot ryöstivät ja polttivat alueen lokakuussa '
        + '1860 — kolmetoista vuotta ennen isoisän matkaa, joten hän '
        + 'olisi nähnyt tästä vain tuoreet rauniot. Paikalla on nyt '
        + 'puisto, jonka kuuluisin näky ovat kivipalatsien kaatuneet '
        + 'julkisivut.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
