/*
 * SAKSAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan ja
 * Italian jälkeen Saksa.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan ja Italian pakat: jokaisella
 * nostolla on valmis sisältö — `teksti` 3–5 virkettä Wikipedian
 * johdannosta omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä
 * faktoja, `lahde`-riville artikkeli ja tarkistuspäivä), 1873-
 * näkökulman `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset`
 * ja vähintään kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public
 * domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu
 * kirjattuna, jokaisen kuvan tiedot luettu Commonsin extmetadata-
 * rajapinnasta). Vuoden 1873 jälkeiset kohteet (Hermannsdenkmal 1875,
 * Bayreuth 1876, Herrenchiemsee 1878, Müngstenin silta 1897) ovat
 * mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta 1873
 * eteenpäin ("tänne nousee myöhemmin…"). Bad Emsin sähke (1870) ja
 * Völklingenin ensimmäinen terästehdas (1873) ovat 1873:n omaa tarinaa.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `deu-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/deu/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin Ranskan, Espanjan ja Italian hahmotelmalla: nämä
 * ovat kaikki aidosti kaupungin ulkopuolella (Saksan ainoa pelikaupunki
 * on Berliini; lähin nosto on yli 30 lautayksikön päässä, raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.DEU:hun. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Kohteilla, joiden oman artikkelin
 * koordinaatti puuttui, piste on saman paikan artikkelista: Rügenin
 * liitukalliot (Königsstuhl) ja Saksilainen Sveitsi (Saxon Switzerland).
 * Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Saksan fokuslehden rajaukseen
 * (`osuuLehteen`). Rügen, Sylt ja Helgoland ovat saaria, jotka pelin
 * karkea maailmankartan DEU-rengas jättää pois: pisteet ovat oikeasti
 * maalla, mutta rengas ei tunne niitä (ankkurilukituksen asia, kuten
 * Espanjan Finisterre ja Italian Stromboli).
 */

/** Saksan hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_DEU = [
  {
    id: 'hahmotelma-saechsische-schweiz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-saechsische-schweiz-721fade7.jpg',
      lyhyt: 'Bastei-silta ylittää syksyisten hiekkakallioiden välisen rotkon.',
      selite: 'Kivinen Bastei-silta yhdistää Elbsandsteingebirgen hiekkakallioita metsäisen rotkon yllä. Taustalla näkyy pöytävuori.',
      lahde: 'Valokuva: Andraszy, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Andraszy',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bastei_Sächsische_Schweiz_Lohmen.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-saechsische-schweiz-eba98e33.jpg',
        lyhyt: 'J. C. Dahlin maalaus, jossa matkailijat katselevat maisemaa Basteilta.',
        selite: 'Johan Christian Dahlin maalaus näkymästä Basteilta Saksilaiseen Sveitsiin: joki mutkittelee laaksossa ja horisontissa kohoavat pöytävuoret.',
        lahde: 'Maalaus: Johan Christian Dahl, Wikimedia Commons (public domain).',
        tekija: 'Johan Christian Dahl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Johan_Christian_Dahl_-_View_from_the_Bastei_in_the_Sächsische_Schweiz_-_DFG.0058_-_Drammens_Museum.png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-saechsische-schweiz-ea00e00c.jpg',
        lyhyt: 'Bastein kalliot nousevat sumumeren yläpuolelle auringonnousun aikaan.',
        selite: 'Kuva Sächsische Schweizin kansallispuistosta: Felsenfestung Bastei kohoaa sumusta aamun sarastaessa, taustalla pöytävuoria.',
        lahde: 'Valokuva: S.Rose Fotografie, Wikimedia Commons (CC BY 4.0).',
        tekija: 'S.Rose Fotografie',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Felsenfestung_Bastei_Saechsische_Schweiz.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Saksilainen Sveitsi',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi aluetta sanotaan Sveitsiksi?',
      'Mikä Königsteinin linnoitus on?',
    ],
    korostukset: ['Königstein|Königsteinin'],
    nappi: 'Hiekkakivikallioiden maa, jolle sveitsiläiset taiteilijat antoivat nimen',
    // 14.2 E / 50.93333333 N — en-Wikipedia "Saxon Switzerland"
    laudat: {
      maailmankartta: { x: 6306.7, y: 1349.3 },
      europe: { x: 483.8, y: 554.1 },
    },
    teksti: 'Saksilainen Sveitsi on kiipeilyaluetta ja kansallispuisto Elben hiekkakivivuorilla '
      + 'Dresdenin kaakkoispuolella Saksissa, Tšekin Böömin Sveitsin vieressä. Yhdessä '
      + 'tšekkiläisen osan kanssa aluetta kutsutaan Saksilais-Böömiläiseksi Sveitsiksi, ja '
      + 'tunnettu maamerkki on Königsteinin linnoitus. Nimi Sächsische Schweiz ilmestyi '
      + '1700-luvulla: sveitsiläiset taiteilijat Adrian Zingg ja Anton Graff nimitettiin '
      + 'Dresdenin taideakatemiaan vuonna 1766, ja he kokivat maiseman muistuttavan '
      + 'kotimaansa Juraa. Nimeä levitti laajalle Wilhelm Lebrecht Götzinger kirjoillaan.',
    lahde: 'en-Wikipedia "Saxon Switzerland", johdanto-osa ja osio "Etymology" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miksi Elben hiekkakivivuoristoa alettiin kutsua Saksilaiseksi Sveitsiksi?',
      vaihtoehdot: [
        'Sveitsiläiset taiteilijat näkivät maisemassa kotimaansa Juran',
        'Alueen linnoitukseen palkattiin sveitsiläisiä sotilaita',
        'Elbe saa alkunsa sveitsiläisiltä Alpeilta',
        'Dresdenin hovi tilasi alueelle sveitsiläisiä juustomestareita',
      ],
      oikea: 0,
      fakta: 'Alueen tunnetuin maamerkki on Königsteinin linnoitus.',
    },
  },
  {
    id: 'hahmotelma-ruegen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ruegen-fd82b824.jpg',
      lyhyt: 'Rügenin valkoiset liitukalliot kohoavat vihreän lehtimetsän alla turkoosin meren rannalla.',
      selite: 'Rügenin liitukalliot toukokuussa: jyrkät valkoiset kalliot ja niiden päällä kasvava tiheä metsä Itämeren rannalla.',
      lahde: 'Valokuva: NilsMargott, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'NilsMargott',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kreidefelsen_Rügen_in_spring.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ruegen-55492e1c.jpg',
        lyhyt: 'Caspar David Friedrichin romanttinen maalaus Rügenin liitukallioista.',
        selite: 'Caspar David Friedrichin maalaus Kreidefelsen auf Rügen: kolme matkailijaa katselee puiden kehystämänä valkoisten kalliopylväiden yli merelle.',
        lahde: 'Maalaus: Caspar David Friedrich, Wikimedia Commons (public domain).',
        tekija: 'Caspar David Friedrich',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Kreidefelsen_auf_Rügen_(Museum_Oskar_Reinhart).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Rügenin liitukalliot',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mistä Königsstuhlin nimi tulee?',
      'Kuinka korkea kallio on?',
    ],
    korostukset: ['liitukallio|liitukallio'],
    nappi: 'Valkoinen liitukallio Itämeren yllä',
    // 13.6625 E / 54.57305556 N — en-Wikipedia "Königsstuhl (Rügen)"
    laudat: {
      maailmankartta: { x: 6288.8, y: 1185.5 },
      europe: { x: 473.5, y: 458.3 },
    },
    teksti: 'Königsstuhl eli Kuninkaan tuoli on Rügenin saaren Stubbenkammerin tunnetuin '
      + 'liitukallio Jasmundin kansallispuistossa Itämeren rannalla. Se kohoaa 118 metrin '
      + 'korkeuteen merenpinnasta. Kallion tasanteelle johtavien graniittiportaiden arvellaan '
      + 'kulkevan pronssikautisen hautakummun päällä, ja tasanteelta avautuu laaja näkymä '
      + 'Itämerelle. Legendan mukaan nimi juontuu Ruotsin kuninkaasta Kaarle XII:sta, joka '
      + 'olisi johtanut merisotaa tanskalaisia vastaan vuonna 1715 ja tarvinnut tuolin, mutta '
      + 'nimi mainitaan jo vuonna 1586, joten se on paljon vanhempi.',
    lahde: 'en-Wikipedia "Königsstuhl (Rügen)", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sylt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-sylt-e5cecfef.jpg',
      lyhyt: 'Sylt-saaren hiekkaranta ja ruohoiset dyynit Pohjanmeren aallokon äärellä.',
      selite: 'Tyypillinen Sylt-saaren rannikko: leveä hiekkaranta, marhalla kasvavat dyynit ja Pohjanmeren tuulinen aallokko, jossa lentää leijalautailijoiden leijoja.',
      lahde: 'Valokuva: Nordenfan, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Nordenfan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sylt_Küste_Strand_Dünen.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-sylt-32a44686.jpg',
        lyhyt: 'Kampenin punatiilinen majakka kohoaa dyynien keskellä Punaisen kalliorinteen luona.',
        selite: 'Kampenin Quermarkenfeuer eli Rotes Kliffin majakka: kahdeksankulmainen punatiilitorni seisoo dyynien ja rantaheinän keskellä Sylt-saarella.',
        lahde: 'Valokuva: Alice Wiegand, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Alice Wiegand',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:AW_Quermarkenfeuer_am_Roten_Kliff_Sylt_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sylt',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Sylt menettää maata?',
      'Mikä Hindenburgdamm on?',
    ],
    korostukset: ['Hindenburgdamm|Hindenburgdamm'],
    nappi: 'Pohjanmeren tuulinen saari, jonne rakennetaan myöhemmin penger mantereelle',
    // 8.33333333 E / 54.9 N — en-Wikipedia "Sylt"
    laudat: {
      maailmankartta: { x: 6111.1, y: 1170.4 },
      europe: { x: 371.2, y: 449.7 },
    },
    teksti: 'Sylt on Pohjois-Saksan saari Nordfrieslandin piirikunnassa Schleswig-Holsteinissa, '
      + 'ja se kuuluu Pohjois-Friisin saariin, joista se on suurin. Saari on Saksan '
      + 'pohjoisin, ja se tunnetaan lomakohteistaan, kuten Westerland, Kampen ja '
      + 'Wenningstedt-Braderup, sekä 40 kilometrin pituisesta hiekkarannastaan. Saari on '
      + 'alttiina Pohjanmerelle ja menettää maata myrskyvuoksissa. Vuodesta 1927 sitä on '
      + 'yhdistänyt mantereeseen Hindenburgdamm-pengertie. Saaren pinta-ala on 99 '
      + 'neliökilometriä, ja pohjoisimmassa kohdassa Königshafenilla se on vain 320 metriä '
      + 'leveä.',
    lahde: 'en-Wikipedia "Sylt", johdanto-osa ja osio "Geography" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-helgoland',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-helgoland-1841f302.jpg',
      lyhyt: 'Helgolandin punainen hiekkakivikallio ja Lange Anna -kalliopylväs kohoavat Pohjanmeren yllä.',
      selite: 'Näkymä Helgolandin Lummenfelsenilta Lange Annalle, saaren luoteiskärjessä olevalle punaiselle kalliopylväälle. Kallioilla pesii runsaasti lintuja.',
      lahde: 'Valokuva: Jörg Braukmann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jörg Braukmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blick_vom_Lummenfelsen_zur_Langen_Anna.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-helgoland-fce11e5e.jpg',
        lyhyt: 'Iltavalo värjää Helgolandin pohjoiskärjen kalliot ja Lange Annan oranssinpunaisiksi.',
        selite: 'Helgolandin pohjoiskärki ja Lange Anna (Nathurn Stack) mereltä katsottuna. Laskeva aurinko valaisee punaisen hiekkakiven ja kallioilla lentelee lintuja.',
        lahde: 'Valokuva: Dionysos1970, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dionysos1970',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Helgoland_Lange_Anna_2903.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Helgoland',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Helgoland kuului Britannialle?',
      'Mikä on Deutschlandlied?',
    ],
    korostukset: ['Deutschlandlied|Deutschlandliedin'],
    nappi: 'Britannian hallitsema kalliosaari, jolla kirjoitettiin Saksan kansallislaulun sanat',
    // 7.88527778 E / 54.1825 N — en-Wikipedia "Heligoland"
    laudat: {
      maailmankartta: { x: 6096.2, y: 1203.5 },
      europe: { x: 362.6, y: 468.6 },
    },
    teksti: 'Helgoland on Pohjanmeren pieni saaristo Schleswig-Holsteinin osavaltiossa '
      + 'Saksanlahdella, noin 69 kilometrin päässä Elben suulla olevasta Cuxhavenista; ne '
      + 'ovat ainoat saksalaiset saaret, jotka eivät ole lähellä mannerta. Saaret kuuluivat '
      + 'aiemmin Tanskalle ja sitten Britannialle vuosina 1807–1890, ja vuodesta 1890 ne ovat '
      + 'olleet Saksan osa. Pääsaari putoaa pohjoisessa, lännessä ja lounaassa 50 metrin '
      + 'korkeana mereen. Paikalliset friisiläiset puhuvat Halunder-murretta. Saarella August '
      + 'Heinrich Hoffmann von Fallersleben kirjoitti vuonna 1841 Deutschlandliedin sanat, '
      + 'joista tuli Saksan kansallislaulu.',
    lahde: 'en-Wikipedia "Heligoland", johdanto-osa ja osio "Geography" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä tunnettu teksti kirjoitettiin Helgolandin saarella vuonna 1841?',
      vaihtoehdot: [
        'Friisiläisten vanha merimieslaulu',
        'Preussin kuninkaan kruunajaisvala',
        'Saksan kansallislaulun sanat',
        'Hansakauppiaiden merenkulkusäännöt',
      ],
      oikea: 2,
      fakta: 'Helgolandin pääsaaren jyrkänne putoaa pohjoisessa, lännessä ja lounaassa 50 metrin '
        + 'korkeudelta mereen, ja saaren friisiläiset puhuvat Halunder-murretta.',
    },
  },
  {
    id: 'hahmotelma-lueneburger-heide',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-lueneburger-heide-eb7565b6.jpg',
      lyhyt: 'Totengrundin kanervarinteet ja katajapensaat Lüneburgin nummen luonnonsuojelualueella.',
      selite: 'Lüneburgin nummen luonnonsuojelualueen Totengrund: aaltoilevia kanervarinteitä, kookkaita katajapensaita ja metsäreunus taustalla.',
      lahde: 'Valokuva: Lotte76, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Lotte76',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:NSG_Lüneburger_Heide_-_Totengrund_(8).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-lueneburger-heide-90123e5d.jpg',
        lyhyt: 'Heidschnucken-nummilampaiden laumaa lähikuvassa Lüneburgin nummella.',
        selite: 'Heidschnucken-lampaat ovat nummen perinteinen laiduneläin. Kuvassa tummakuonoisia, kaareva-sarvisia lampaita korvamerkit korvissaan Schmarbeckissä Lüneburgin nummella.',
        lahde: 'Valokuva: Oxfordian Kissuth, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Oxfordian Kissuth',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Heidschnucken_in_Schmarbeck_01.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Lüneburgin nummi',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi nummi on kulttuurimaisema?',
      'Mikä on heidschnucke?',
    ],
    korostukset: ['kulttuurimaisema|kulttuurimaisema'],
    nappi: 'Kanervanummi, jonka lampaat pitävät avoimena',
    // 9.93972222 E / 53.16861111 N — en-Wikipedia "Lüneburg Heath"
    laudat: {
      maailmankartta: { x: 6164.7, y: 1249.6 },
      europe: { x: 402, y: 495.3 },
    },
    teksti: 'Lüneburgin nummi on laaja nummi-, geest- ja metsäalue Ala-Saksin koillisosassa '
      + 'Pohjois-Saksassa. Se on Hampurin, Hannoverin ja Bremenin taustaseutua ja saa nimensä '
      + 'Lüneburgin kaupungista, ja suurin osa alueesta on luonnonsuojelualuetta. Alueen '
      + 'keltaiset kanervanummet ovat tyypillisiä maisemia, jotka peittivät suurimman osan '
      + 'Pohjois-Saksan maaseudusta vuoteen 1800 asti mutta ovat muualta lähes kadonneet. '
      + 'Nummet syntyivät neoliittisen ajan jälkeen, kun köyhien hiekkamaiden metsiä '
      + 'laidunnettiin liikaa, joten alue on historiallinen kulttuurimaisema. Nummet pidetään '
      + 'avoimina pääosin laiduntamalla nummilampaita, heidschnuckeja, ja korkein kohta on '
      + '169 metrin Wilseder Berg.',
    lahde: 'en-Wikipedia "Lüneburg Heath", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miten Lüneburgin nummen keltaiset kanervanummet pidetään avoimina?',
      vaihtoehdot: [
        'Niittämällä ne koneilla joka kesä',
        'Kastelemalla nummet joka kevät kanavilla',
        'Polttamalla ne hallitusti joka syksy',
        'Laiduntamalla nummilampaita eli heidschnuckeja',
      ],
      oikea: 3,
      fakta: 'Nummialueen korkein kohta on 169 metriä korkea Wilseder Berg.',
    },
  },
  {
    id: 'hahmotelma-spreewald',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-spreewald-f6c2efc5.jpg',
      lyhyt: 'Perinteiset Kahn-lattiaveneet rivissä kapealla kanavalla Lübbenaussa.',
      selite: 'Spreewaldin perinteisiä pitkiä Kahn-veneitä penkkeineen kanavan varressa Lübbenaussa; vesi peilaa ympäröivää lehvistöä.',
      lahde: 'Valokuva: TricksterWildcat, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'TricksterWildcat',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kahn_boats_in_Lübbenau_canal.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-spreewald-c0d2a006.jpg',
        lyhyt: 'Tyyni vesiväylä virtaa lehtimetsän halki Spreewaldissa.',
        selite: 'Großes Fließ ja Burg-Lübbener Kanal Spreewaldissa Brandenburgissa: rauhallinen vesiväylä, jonka rannoilla kasvaa tiheää lehtimetsää.',
        lahde: 'Valokuva: Stefan Fussan, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Stefan Fussan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Spreewald_-_Großes_Fließ_und_Burg-Lübbener_Kanal_0001.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Spreewald',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Keitä sorbit ovat?',
      'Miten Spreewaldissa liikutaan?',
    ],
    korostukset: ['sorbien|sorbien'],
    nappi: 'Sorbien vesimaa, jossa kadut ovat kanavia',
    // 13.92638889 E / 51.91388889 N — en-Wikipedia "Spree Forest"
    laudat: {
      maailmankartta: { x: 6297.5, y: 1305.9 },
      europe: { x: 478.6, y: 528.3 },
    },
    teksti: 'Spreewald eli Spreen metsä on Spree-joen laaja sisämaan suisto ja historiallinen '
      + 'kulttuurimaisema Ala-Lausitzissa Brandenburgissa, noin 100 kilometriä Berliinistä '
      + 'kaakkoon. Alue on sorbien asuinaluetta, ja se on virallisesti kaksikielinen, saksa '
      + 'ja alasorbi. UNESCO nimesi sen biosfäärialueeksi vuonna 1991. Sitä leimaa '
      + 'perinteinen kasteluverkosto, jossa on yli 200 pientä kanavaa, joiden yhteispituus on '
      + '1 300 kilometriä, sekä litteäpohjaiset Spreewaldkähne-veneet. Yksi tunnetuimmista '
      + 'kaupungeista on Lübbenau, jonka Lehden ja Leipen kylissä kanavat korvaavat kadut.',
    lahde: 'en-Wikipedia "Spree Forest", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä vähemmistökansan asuinaluetta Spreewald on?',
      vaihtoehdot: [
        'Friisiläisten',
        'Sorbien',
        'Tšekkien',
        'Puolalaisten',
      ],
      oikea: 1,
      fakta: 'Spreewaldin kanavaverkosto on yhteensä noin 1 300 kilometriä pitkä, ja Lehden ja '
        + 'Leipen kylissä kanavat korvaavat kadut.',
    },
  },
  {
    id: 'hahmotelma-chiemsee',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-chiemsee-c74741fa.jpg',
      lyhyt: 'Ilmakuva Fraueninselistä Chiemseellä, purjeveneitä ja Alppien siluetti taustalla.',
      selite: 'Fraueninselin luostari ja kylä kohoavat vehreänä saarena Chiemseen keskellä. Kuva on otettu ilmasta, ja taustalla häämöttävät Alppien huiput.',
      lahde: 'Valokuva: SimonWaldherr, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'SimonWaldherr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fraueninsel_Luftbild.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-chiemsee-373d64a5.jpg',
        lyhyt: 'Ilmakuva Herrenchiemseen uudesta linnasta, puistosta ja suihkulähteistä Herreninselillä.',
        selite: 'Herreninselin metsän keskelle rakennettu uusi linna suihkulähdealtaineen ja barokkipuutarhoineen. Kuva näyttää saaren toisen suuren nähtävyyden ylhäältä.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_New_Palace_Herrenchiemsee.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-chiemsee-fa5a5726.jpg',
        lyhyt: 'Chiemsee, Herreninselin kirkko, laivaliikennettä ja lumihuippuinen Hochfelln taustalla.',
        selite: 'Näkymä Urfahrnin niemen kärjestä Chiemseen yli Herreninselin Kreuzkirchelle, jonka takana kohoaa Hochfelln-vuori. Kuvassa kulkee myös järven matkustajalaiva.',
        lahde: 'Valokuva: Woidbua, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Woidbua',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chiemsee_mit_Herreninsel_und_Hochfelln.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Chiemsee',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Chiemseetä sanotaan Baijerin mereksi?',
      'Mikä Herrenchiemsee on?',
    ],
    korostukset: ['Herrenchiemsee|Herrenchiemsee'],
    nappi: 'Baijerin meri, jonka saarelle rakennetaan myöhemmin linna',
    // 12.47 E / 47.89 N — en-Wikipedia "Chiemsee"
    laudat: {
      maailmankartta: { x: 6249, y: 1480.9 },
      europe: { x: 450.6, y: 634.1 },
    },
    teksti: 'Chiemsee on makean veden järvi Baijerissa Rosenheimin lähellä, ja sitä kutsutaan '
      + 'usein Baijerin mereksi. Järveen laskevat etelästä Tiroler Achen ja Prien, ja '
      + 'Alz-joki virtaa siitä pohjoiseen Inniin ja sitä kautta Tonavaan. Järvi syntyi noin '
      + '10 000 vuotta sitten viime jääkauden lopussa jäätikön kaivamaan altaaseen; alun '
      + 'perin se oli noin 240 neliökilometrin kokoinen, mutta on kutistunut noin 80 '
      + 'neliökilometriin. Järvellä on kolme pääsaarta: Herreninsel, Fraueninsel ja asumaton '
      + 'Krautinsel. Herreninsel-saarella on kuningas Ludwig II:n vuonna 1878 rakennuttama '
      + 'Herrenchiemsee-palatsi.',
    lahde: 'en-Wikipedia "Chiemsee", johdanto-osa ja osiot "Origin" ja "Islands" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-hermannsdenkmal',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hermannsdenkmal-e1489275.jpg',
      lyhyt: 'Hermannsdenkmal kohoaa metsäpolun päässä Teutoburgin metsässä.',
      selite: 'Vihertävä patsas kohottaa miekkaansa kivisen kupolipohjan päällä, kuvattuna takaapäin metsäpolun päästä. Muistomerkki rakennettiin vuosina 1838–1875 Detmoldin Hiddesenin kaupunginosaan.',
      lahde: 'Valokuva: Clemensfranz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Clemensfranz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hermannsdenkmal_Detmold_2021_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hermannsdenkmal-42c611a9.jpg',
        lyhyt: 'Lähikuva Hermannsdenkmalin vihertävästä metallipatsaasta sinistä taivasta vasten.',
        selite: 'Siivekäs kypärä, ylös kohotettu miekka ja kilpi näkyvät tarkasti patsaan lähikuvassa. Kuvan kohde on Hermannin muistomerkki Detmoldin lähellä.',
        lahde: 'Kuva: Daniel Schwen, Wikimedia Commons (public domain).',
        tekija: 'Daniel Schwen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hermannsdenkmal_statue.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hermannsdenkmal-48c41468.jpg',
        lyhyt: 'Ilmakuva Hermannsdenkmalista lounaasta, ympärillä vehreä metsä ja kävelyteitä.',
        selite: 'Ylhäältä näkyy patsaan kupolimainen kivijalusta, sen kaariaukot ja portaat sekä ympäröivä lehtimetsä.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_Hermannsdenkmal_(view_from_the_southwest).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hermannsdenkmal',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Arminius oli?',
      'Missä Teutoburgin metsän taistelu käytiin?',
    ],
    korostukset: ['Arminius|Arminiusta'],
    nappi: 'Arminiuksen jättipatsas, joka on vielä keskeneräinen',
    // 8.83944444 E / 51.91166667 N — en-Wikipedia "Hermannsdenkmal"
    laudat: {
      maailmankartta: { x: 6128, y: 1306 },
      europe: { x: 380.9, y: 528.3 },
    },
    teksti: 'Hermannsdenkmal on muistomerkki Detmoldin lounaispuolella Lippen piirikunnassa '
      + 'Nordrhein-Westfalenissa. Se seisoo tiheän metsän peittämällä Grotenburgin kukkulalla '
      + '(386 metriä) Teutoburgin metsässä muinaisen kehävallin jäänteiden sisällä. '
      + 'Muistomerkki rakennettiin vuosina 1838–1875 kunnioittamaan keruskien sotapäällikköä '
      + 'Arminiusta, saksaksi Hermannia, ja hänen voittoaan Rooman legioonista Teutoburgin '
      + 'metsän taistelussa vuonna 9 jKr. Patsasta pystytettäessä paikkaa pidettiin '
      + 'alkuperäisen taistelupaikan läheisenä, mutta asiantuntijat arvelevat nyt taistelun '
      + 'käydyn lähempänä Kalkriesea, noin 100 kilometriä luoteeseen.',
    lahde: 'en-Wikipedia "Hermannsdenkmal", johdanto-osa ja osio "Background" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-externsteine',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-externsteine-58bc5feb.jpg',
      lyhyt: 'Externsteinen hiekkakalliot kohoavat lammen takana, ja ne heijastuvat veteen.',
      selite: 'Näkymä pohjoisesta Horn-Bad Meinbergin Externsteinen kalliomuodostelmalle, joka kohoaa metsän ja lammen reunalla. Suurimmassa kalliossa näkyy kallioon hakattuja aukkoja.',
      lahde: 'Valokuva: Jörg Braukmann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jörg Braukmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Externsteine,_Ansicht_von_Norden_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-externsteine-94be7962.jpg',
        lyhyt: 'Externsteinen kalliotornit ja niiden välinen silta koillisesta katsottuna.',
        selite: 'Kalliotornien välille on rakennettu silta, ja huipuilla näkyy kävijöitä ja kaiteita. Kuva on otettu koillisesta Horn-Bad Meinbergin lähellä.',
        lahde: 'Valokuva: Jörg Braukmann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jörg Braukmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Externsteine_(Nordostansicht).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Externsteine',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Irminsul oli?',
      'Mitä Externsteinen reliefi esittää?',
    ],
    korostukset: ['Irminsul|Irminsul'],
    nappi: 'Kalliopylväät, joiden ympärille syntyy legendoja saksien pyhästä paikasta',
    // 8.9173 E / 51.869 N — en-Wikipedia "Externsteine"
    laudat: {
      maailmankartta: { x: 6130.6, y: 1307.9 },
      europe: { x: 382.4, y: 529.4 },
    },
    teksti: 'Externsteine on hiekkakivimuodostuma Teutoburgin metsässä Horn-Bad Meinbergin '
      + 'kaupungin lähellä Lippen piirikunnassa Nordrhein-Westfalenissa. Muodostuma koostuu '
      + 'korkeista, kapeista kalliopylväistä, jotka nousevat jyrkästi ympäröivistä '
      + 'metsäisistä kukkuloista, ja Hermannsweg-vaellusreitti kulkee sen läpi. Suositun '
      + 'perinteen mukaan paikka oli pakanallisten saksien pyhä paikka ja siellä olisi '
      + 'seissyt Kaarle Suuren tuhoama Irminsul-patsas, mutta arkeologista näyttöä tästä ei '
      + 'ole. Keskiajalla kallioilla oli erakon asuinpaikka ja viimeistään ylemmällä '
      + 'keskiajalla kristillinen kappeli. Kallioon veistetty Externsteinen reliefi on '
      + 'keskiaikainen kuvaus Ristiltä ottamisesta.',
    lahde: 'en-Wikipedia "Externsteine", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä aihetta esittää Externsteinen kallioon keskiajalla veistetty reliefi?',
      vaihtoehdot: [
        'Saksien pyhää Irminsul-patsasta',
        'Pakanajumalien taistelua',
        'Kristuksen ottamista alas ristiltä',
        'Kaarle Suuren kastetta',
      ],
      oikea: 2,
      fakta: 'Externsteinen kalliopylväiden läpi kulkee Hermannsweg-vaellusreitti.',
    },
  },
  {
    id: 'hahmotelma-saalburg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-saalburg-744ec50b.jpg',
      lyhyt: 'Saalburgin jälleenrakennetun roomalaislinnakkeen pääportti, Porta Praetoria, kivimuureineen ja torneineen.',
      selite: 'Saalburgin linnakkeen pääportti (Porta Praetoria) kahden tornin ja hammastettujen muurien välissä. Portin edessä näkyy puinen silta ja pronssipatsas.',
      lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Porta_Praetoria_(Main_Gate),_Saalburg_Roman_Fort,_Limes_Germanicus,_Germania_(Germany)_(33895401094).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-saalburg-9aa79cf1.jpg',
        lyhyt: 'Pronssipatsas ja kullattu latinankielinen laatta Saalburgin portin yllä.',
        selite: 'Portin kaaren edessä seisova pronssipatsas kuvattuna läheltä sen yläpuolella olevan latinankielisen laatan kanssa. Laatta kertoo, että keisari Vilhelm II:n aikana linnake on rakennettu uudelleen.',
        lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Carole Raddato',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saalburg_Roman_Fort,_Limes_Germanicus,_Germania_(Germany)_(33896884424).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Saalburg',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Limes oli?',
      'Miksi linnake rakennettiin uudelleen?',
    ],
    korostukset: ['Limes|Limes'],
    nappi: 'Roomalaisten rajalinnakkeen rauniot, joiden jälleenrakennus tulee vasta 1897',
    // 8.56666667 E / 50.27138889 N — en-Wikipedia "Saalburg"
    laudat: {
      maailmankartta: { x: 6118.9, y: 1378.4 },
      europe: { x: 375.7, y: 571.5 },
    },
    teksti: 'Saalburg on roomalainen kohorttilinnake Taunuksen pääharjanteella Bad Homburgin '
      + 'luoteispuolella Hessenissä, osa Limes Germanicus -rajalinjaa, joka oli Rooman '
      + 'Germanian provinssien rajalinnoitus. Se on Saksan täydellisimmin jälleenrakennettu '
      + 'roomalainen linnake ja osa UNESCOn maailmanperintökohdetta vuodesta 2005. '
      + 'Ensimmäiset tutkimukset tehtiin vuosina 1853–1862 Nassaun antiikkiyhdistyksen '
      + 'johdolla Friedrich Gustav Habelin ohjauksessa. Vuonna 1897 keisari Wilhelm II '
      + 'määräsi linnakkeen jälleenrakennettavaksi kaivaustulosten perusteella.',
    lahde: 'en-Wikipedia "Saalburg", johdanto-osa ja osio "History of research" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-hohenzollern',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hohenzollern-44e73237.jpg',
      lyhyt: 'Hohenzollernin linna kohoaa syksyisen metsäisen vuoren huipulla tornien ja muurien ympäröimänä.',
      selite: 'Kuvassa on Hohenzollernin linna Baden-Württembergissä: 1800-luvulla 1200-luvun linnan pohjalle rakennettu jälleenrakennus teräväkärkisine torneineen ja rinnemuureineen. Linna hallitsee alla avautuvaa maisemaa.',
      lahde: 'Valokuva: A. Kniesel, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'A. Kniesel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Hohenzollern_ak.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hohenzollern-24e99f51.jpg',
        lyhyt: 'Hohenzollernin linna metsäisen kukkulan päällä kesäisessä maisemassa.',
        selite: 'Linnan tornit ja hammastetut muurit erottuvat vehreän, jyrkän vuoren laella, ja taustalla aukeaa laaja tasanko. Kuva näyttää, miksi paikka oli hyvä puolustusasema.',
        lahde: 'Valokuva: Hans J. Mast, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hans J. Mast',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burg_Hohenzollern_2015.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hohenzollernin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä Hohenzollernit olivat?',
      'Miksi linna rakennettiin uudelleen?',
    ],
    korostukset: ['Hohenzollern-suvun|Hohenzollern-suvun'],
    nappi: 'Keisarisuvun kantalinna, jonka uusi linna valmistui juuri 1867',
    // 8.96772222 E / 48.32319444 N — en-Wikipedia "Hohenzollern Castle"
    laudat: {
      maailmankartta: { x: 6132.3, y: 1462.4 },
      europe: { x: 383.4, y: 622.7 },
    },
    teksti: 'Hohenzollernin linna on entisen keisarillisen Hohenzollern-suvun kantalinna. Se '
      + 'sijaitsee Hechingenin eteläpuolella Hohenzollern-vuoren huipulla Schwäbische Alb '
      + '-vuoriston reunalla Baden-Württembergissä. Nykyinen linna on kolmas samalla '
      + 'paikalla: ensimmäinen 1000-luvun linna tuhottiin täysin vuonna 1423 kymmenen '
      + 'kuukauden piirityksen jälkeen, ja toinen rakennettiin vuosina 1454–1461 mutta '
      + 'rappeutui 1700-luvun loppuun mennessä. Nykyinen linna rakennettiin vuosina 1846–1867 '
      + 'sukumuistomerkiksi Preussin kuningas Fredrik Vilhelm IV:n aloitteesta, ja arkkitehti '
      + 'Friedrich August Stüler otti mallia englantilaisesta uusgotiikasta ja Loiren '
      + 'linnoista.',
    lahde: 'en-Wikipedia "Hohenzollern Castle", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-quedlinburg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-quedlinburg-e2da9308.jpg',
      lyhyt: 'Ristikkotaloja ja kivistä katua Quedlinburgin Schlossbergin juurella.',
      selite: 'Punatiilikattoisia ristikkotaloja kadun varrella ja hiekkakivikallioita etualalla Schlossbergin juurella. Kuva on otettu tammikuussa 2024.',
      lahde: 'Valokuva: Barnos, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Barnos',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fachwerk_und_Klippen_Quedlinburg.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-quedlinburg-1ab34198.jpg',
        lyhyt: 'Quedlinburgin linnavuoren rakennukset ja Stiftskirchen kaksi tornia.',
        selite: 'Linnavuoren renessanssirakennukset punaisine kattoineen ja niiden takana kohoavat Stiftskirchen mustat kaksoistornit. Kuvan otsikko on Schloss und Stiftskirche.',
        lahde: 'Valokuva: Kora27, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kora27',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Quedlinburg-Schlossberg....IMG_1747WI.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Quedlinburg',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Henrik Linnustaja oli?',
      'Miksi Quedlinburgia sanotaan valtakunnan kehdoksi?',
    ],
    korostukset: ['Henrik Linnustajan|Henrik Linnustajan'],
    nappi: 'Saksan valtakunnan kehto, jonka ristikkotalot ovat vanhoja',
    // 11.14722222 E / 51.79166667 N — en-Wikipedia "Quedlinburg"
    laudat: {
      maailmankartta: { x: 6204.9, y: 1311.4 },
      europe: { x: 425.2, y: 531.5 },
    },
    teksti: 'Quedlinburg on kaupunki Harzin vuoriston pohjoispuolella Saksi-Anhaltin länsiosassa. '
      + 'Varhaiskeskiajalla vaikutusvaltainen ja vauras kauppakeskus nousi 900- ja '
      + '1000-luvuilla Ottonien suvun vallan keskukseksi. Linna, kirkko ja vanhakaupunki, '
      + 'jossa on noin 2 100 puutaloa, kirjattiin UNESCOn maailmanperintöluetteloon vuonna '
      + '1994 poikkeuksellisen säilyneisyytensä ja romaanisen arkkitehtuurin vuoksi. Kaupunki '
      + 'mainitaan ensimmäisen kerran kaupunkina vuonna 922 kuningas Henrik Linnustajan '
      + 'lahjoituksessa, ja legendan mukaan frankkiruhtinaat tarjosivat Henrikille kruunua '
      + 'Quedlinburgissa vuonna 919, minkä vuoksi kaupunkia sanotaan Saksan valtakunnan '
      + 'kehdoksi.',
    lahde: 'en-Wikipedia "Quedlinburg", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-maulbronn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-maulbronn-889b430a.jpg',
      lyhyt: 'Maulbronnin luostarin kirkko esipylväikköineen ja viereiset rakennukset kirkkaan sinistä taivasta vasten.',
      selite: 'Maulbronnin entinen sistersiläisluostari Baden-Württembergissä. Kuvassa näkyy luostarikirkko ja sen eteinen eli "paratiisi" sekä punaharmaasta hiekkakivestä rakennetut luostarirakennukset.',
      lahde: 'Valokuva: Elke Wetzig (Elya), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Elke Wetzig (Elya)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kloster_Maulbronn_2009.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-maulbronn-24232e6f.jpg',
        lyhyt: 'Maulbronnin luostarin goottilainen ristikäytävä ja sisäpihan nurmikko.',
        selite: 'Luostarin ristikäytävän kaarikäytävä, jonka ikkunoissa on kolmilehtisiä ruusuikkunoita. Etualalla on vihreä sisäpihan nurmikko ja penkki.',
        lahde: 'Valokuva: Dguendel, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Dguendel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kloster_Maulbronn,_der_Kreuzgang.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-maulbronn-2bdc7696.jpg',
        lyhyt: 'Ilmakuva Maulbronnin luostarialueesta kaakosta päin.',
        selite: 'Ilmakuvassa erottuvat luostarikirkko, ympäröivä muuri ja tornit sekä luostarin ympärille rakentunut kylä ja viinirinteet.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_Maulbronn_Monastery_Complex_(view_from_the_southeast).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Maulbronnin luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä sisterssiläiset olivat?',
      'Miksi luostari muuttui seminaariksi?',
    ],
    korostukset: ['sisterssiläisluostari|sisterssiläisluostari'],
    nappi: 'Muurien ympäröimä luostari, jossa protestanttinen seminaari opettaa yhä',
    // 8.81277778 E / 49.00111111 N — en-Wikipedia "Maulbronn Monastery"
    laudat: {
      maailmankartta: { x: 6127.1, y: 1433.4 },
      europe: { x: 380.4, y: 604.9 },
    },
    teksti: 'Maulbronnin luostari on entinen sisterssiläisluostari ja Pyhän saksalais-roomalaisen '
      + 'keisarikunnan kirkollinen valtio Baden-Württembergissä. Se on yksi Euroopan '
      + 'parhaiten säilyneistä luostarikomplekseista ja UNESCO-kohde vuodesta 1993. Luostari '
      + 'perustettiin vuonna 1147, kun munkit siirrettiin Eckenweiherista Salzach-joen '
      + 'lähteen tuntumassa olevalle paikalle Speyerin piispan päätöksellä. Se kasvoi '
      + 'nopeasti 1100-luvulla, kärsi vaikeuksista 1200- ja 1300-luvun lopulla ja vaurastui '
      + 'uudelleen 1400-luvulla, kunnes Württembergin herttuakunta liitti sen itseensä vuonna '
      + '1504. 1500-luvulla sisterssiläisluostari lakkautettiin ja tilalle tuli '
      + 'protestanttinen seminaari.',
    lahde: 'en-Wikipedia "Maulbronn Monastery", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-rothenburg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-rothenburg-f1a4947f.jpg',
      lyhyt: 'Plönlein Rothenburgissa: ristikkotalo kahden kaupunginportin ja tornin välissä.',
      selite: 'Plönlein on entinen kauppatori, jonka vasemmalla puolella on Siebersin torni ja oikealla Kobolzellin portti. Kuvauksen mukaan paikka on yksi Saksan valokuvatuimpia.',
      lahde: 'Kuva: Berthold Werner, Wikimedia Commons (public domain).',
      tekija: 'Berthold Werner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rothenburg_BW_4.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-rothenburg-8a0dcddd.jpg',
        lyhyt: 'Rothenburgin vanhakaupunki kohoaa Tauberin laakson yllä, etualalla kivinen tuplasilta.',
        selite: 'Tauberin yli johtava 123 metriä pitkä kaksikerroksinen kivisilta on kuvauksen mukaan rakennettu todennäköisesti noin vuonna 1330. Taustalla näkyvät vanhankaupungin katot ja tornit.',
        lahde: 'Valokuva: Rainer Lippert, Wikimedia Commons (CC0).',
        tekija: 'Rainer Lippert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rothenburg_mit_Brücke,_2.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-rothenburg-eb3c513a.jpg',
        lyhyt: 'Rothenburgin raatihuone ja torni Marktplatzilla.',
        selite: 'Rothenburg ob der Tauberin raatihuone torneineen Marktplatzin laidalla, edessä turisteja.',
        lahde: 'Kuva: Berthold Werner, Wikimedia Commons (public domain).',
        tekija: 'Berthold Werner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rothenburg_BW_25.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Rothenburg ob der Tauber',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä Romanttinen tie on?',
      'Mitä vapaa keisarillinen kaupunki tarkoitti?',
    ],
    korostukset: ['Romanttiseen tiehen|Romanttiseen tiehen'],
    nappi: 'Muurien ympäröimä vapaa kaupunki, joka on jäänyt ajassa paikoilleen',
    // 10.18333333 E / 49.38333333 N — en-Wikipedia "Rothenburg ob der Tauber"
    laudat: {
      maailmankartta: { x: 6172.8, y: 1416.9 },
      europe: { x: 406.7, y: 594.8 },
    },
    teksti: 'Rothenburg ob der Tauber on kaupunki Ansbachin piirikunnassa Baijerin '
      + 'Keski-Frankenissa, ja se tunnetaan parhaiten hyvin säilyneestä keskiaikaisesta '
      + 'vanhastakaupungistaan. Se kuuluu suosittuun Romanttiseen tiehen Etelä-Saksassa, ja '
      + 'se on yksi vain neljästä saksalaiskaupungista, joiden kaupunginmuurit ovat yhä '
      + 'täysin ehjät; muut ovat Nördlingen, Dinkelsbühl ja Berching. Nimi tarkoittaa '
      + 'Tauber-joen yläpuolella olevaa punaista linnaa. Rothenburg oli vapaa keisarillinen '
      + 'kaupunki myöhäiskeskiajalta vuoteen 1803, ja vuosina 1884–1903 Johann Friedrich von '
      + 'Hessing rakennutti kaupunkiin Wildbadin kylpylän.',
    lahde: 'en-Wikipedia "Rothenburg ob der Tauber", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bayreuth',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bayreuth-5a026415.jpg',
      lyhyt: 'Bayreuthin Festspielhaus noin vuonna 1900, puiden ympäröimänä kukkulalla.',
      selite: 'Väripainettu vanha valokuva Wagnerin festivaalitalosta. Tiilirakennuksen korkea lavatorni ja kaareva ikkuna nousevat lehtipuiden takaa. Kuva on rajattu alareunasta, jotta painetun kuvan tekstirivi jää pois.',
      lahde: 'Kuva: tekijä tuntematon, Wikimedia Commons (public domain).',
      tekija: 'Tuntematon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Festspielhaus_Bayreuth_1900.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bayreuth-24d7bdc2.jpg',
        lyhyt: 'Festspielhausin eteläjulkisivu kukkaistutuksen ja puiden kehystämänä.',
        selite: 'Bayreuthin juhlanäytäntötalon eteläjulkisivu kunnostuksen jälkeen vuonna 2016. Punatiilijulkisivussa on hiekkakivikoristeita ja kolme kaari-ikkunaa.',
        lahde: 'Valokuva: El Grafo, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'El Grafo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Festspielhaus_Bayreuth_2016.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bayreuthin Festspielhaus',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Wagner rakennutti oman oopperatalon?',
      'Mikä Nibelungin sormus on?',
    ],
    korostukset: ['Nibelungin sormuksen|Nibelungin sormuksen'],
    nappi: 'Wagnerin festivaalitalo, jonka peruskivi laskettiin 1872 ja joka on vielä rakenteilla',
    // 11.57972222 E / 49.96 N — en-Wikipedia "Bayreuth Festspielhaus"
    laudat: {
      maailmankartta: { x: 6219.3, y: 1391.9 },
      europe: { x: 433.5, y: 579.7 },
    },
    teksti: 'Bayreuthin Festspielhaus on Bayreuthin pohjoispuolella oleva oopperatalo, jonka '
      + 'säveltäjä Richard Wagner rakennutti ja joka on omistettu yksinomaan hänen '
      + 'näyttämöteostensa esittämiselle. Wagner mukaili suunnitelman Gottfried Semperin '
      + 'toteutumattomasta Münchenin oopperatalosta ja valvoi rakentamista arkkitehti Otto '
      + 'Brückwaldin kanssa, ja pääasiallisen rahoituksen antoi Baijerin kuningas Ludwig II. '
      + 'Peruskivi laskettiin 22. toukokuuta 1872, Wagnerin 59-vuotispäivänä, ja talo '
      + 'avattiin Nibelungin sormuksen koko sarjan ensi-illalla 13.–17. elokuuta 1876. Vain '
      + 'sisäänkäyntijulkisivussa on 1800-luvun lopun koristelua, ja muu ulkopuoli on '
      + 'koristelematonta tiiltä.',
    lahde: 'en-Wikipedia "Bayreuth Festspielhaus", johdanto-osa ja osio "Design" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-ruedesheim',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ruedesheim-e13c404a.jpg',
      lyhyt: 'Rüdesheimin yläpuolen laajat viinitarharinteet köysiradan tolppineen.',
      selite: 'Näkymä köysiradalta Rüdesheimin yllä levittäytyville viinitarhoille. Kuvauksen mukaan köysiradan vasemmalla puolella häämöttää Niederwalddenkmal-muistomerkki rinteen harjalla.',
      lahde: 'Valokuva: Partonez, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Partonez',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vineyard_above_the_town_of_Rüdesheim_am_Rhein_2.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ruedesheim-e5285c33.jpg',
        lyhyt: 'Niederwaldin muistomerkin Germania-patsas nostaa kruunua ja pitelee miekkaa.',
        selite: 'Rüdesheimin yläpuolella kohoavan Niederwalddenkmalin vihertävä pronssinen Germania-hahmo, joka pitää toisessa kädessään kruunua ja toisessa miekkaa.',
        lahde: 'Valokuva: AK-Bino, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'AK-Bino',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Niederwalddenkmal_Germania.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ruedesheim-3ce72bbd.jpg',
        lyhyt: 'Ristikkotaloja ja ravintolakylttejä Rüdesheimin Drosselgassella.',
        selite: 'Drosselgasse on Rüdesheimin kapea, viinitupia täynnä oleva kuuluisa kuja. Kuvassa on ristikkotalo, jossa on vuosiluku 1727, sekä Drosselhofin ja Lindenwirtin kyltit. Kuva on rajattu alareunasta.',
        lahde: 'Valokuva: Rhetos, Wikimedia Commons (CC0).',
        tekija: 'Rhetos',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fachwerkidylle_(Drosselgasse,_Rüdesheim).jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Rüdesheim ja Rheingau',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mikä Rheingau on?',
      'Mitä Niederwalddenkmal esittää?',
    ],
    korostukset: ['Rheingaun|Rheingaun'],
    nappi: 'Reinin viininviljelykaupunki, jonne rakennetaan pian isänmaallinen muistomerkki',
    // 7.93055556 E / 49.98333333 N — en-Wikipedia "Rüdesheim am Rhein"
    laudat: {
      maailmankartta: { x: 6097.7, y: 1390.9 },
      europe: { x: 363.5, y: 579 },
    },
    teksti: 'Rüdesheim am Rhein on saksalainen viininviljelykaupunki Reinin rotkossa Hessenissä, '
      + 'ja se kuuluu UNESCOn Reinin rotkon maailmanperintökohteeseen. Se sijaitsee '
      + 'Niederwaldin juurella Reinin oikealla rannalla Rheingaun viinialueella, ja sen '
      + 'vanhassakaupungissa on Reinin romantiikan ylistämä maisema. Vuonna 1877 laskettiin '
      + 'peruskivi Niederwalddenkmalille, isänmaalliselle muistomerkille viinitarhojen '
      + 'yläpuolella, ja se valmistui vuonna 1883. Drosselgasse on 144 metriä pitkä kapea '
      + 'kivetty jalankulkukatu vanhankaupungin sydämessä, jonka varrella on viinitavernoja, '
      + 'ja kaupungin viinitarhojen läpi kulkee Riesling-reitti.',
    lahde: 'en-Wikipedia "Rüdesheim am Rhein", johdanto-osa ja osiot "Geography" ja "Sights" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bernkastel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bernkastel-30e98692.jpg',
      lyhyt: 'Bernkastel-Kuesin torin ristikkotalot kukkaruukkuineen.',
      selite: 'Bernkastelin torin ympärillä on punaruskeita ja koristeellisia ristikkotaloja, joiden ikkunoissa on punaisia kukkia. Torilla kulkee ihmisiä ja alakerroksissa on viinikauppoja.',
      lahde: 'Valokuva: Dguendel, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Dguendel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bernkastel-Kues,_der_Markt.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bernkastel-3dcedaab.jpg',
        lyhyt: 'Burg Landshutin rauniot viinirinteellä ja Mosel-joki taustalla.',
        selite: 'Landshutin linnan rauniotorni ja muurit kohoavat viinitarhojen ympäröimällä kukkulalla. Vasemmalla alhaalla näkyvät Mosel-joki ja kaupungin rakennuksia.',
        lahde: 'Valokuva: Dkvtig, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dkvtig',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bernkastel-Burg_Landshut_2023_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bernkastel-05787825.jpg',
        lyhyt: 'Lähikuva Bernkastelin torin koristeellisista ristikkotalojen päädyistä.',
        selite: 'Fachwerkhäuser prägen kuvauksen mukaan Bernkastel-Kuesin keskiaikaisen torin ilmettä. Alhaalla keskellä näkyy siivekäs patsas kaivon päällä.',
        lahde: 'Valokuva: Elisabeth Schittenhelm, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Elisabeth Schittenhelm',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Historischer_Marktplatz_in_der_Altstadt_von_Bernkastel-Kues,_Rheinland-Pfalz.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bernkastel ja Mosel',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Kuka Nikolaus von Kues oli?',
      'Mikä Spitzhäuschen on?',
    ],
    korostukset: ['Spitzhäuschen|Spitzhäuschen'],
    nappi: 'Moselin viinikaupunki, jonka torilla seisovat ristikkotalot',
    // 7.06944444 E / 49.91611111 N — en-Wikipedia "Bernkastel-Kues"
    laudat: {
      maailmankartta: { x: 6069, y: 1393.8 },
      europe: { x: 346.9, y: 580.8 },
    },
    teksti: 'Bernkastel-Kues on kaupunki Moselin keskijuoksulla Rheinland-Pfalzissa, ja se '
      + 'tunnetaan viininviljelystään. Kaupunki on keskiaikaisen kirkonmiehen ja filosofin '
      + 'Nikolaus von Kuesin, Cusanuksen, syntymäkaupunki, ja Trierista on matkaa noin 50 '
      + 'kilometriä. Bernkastel mainitaan ensimmäisen kerran asiakirjoissa 1000-luvun '
      + 'alkupuoliskolla, ja lähellä olevan Landshutin linnanrauniot ovat mahdollisesti '
      + '300-luvun roomalaisen castellumin paikalla. Keskiaikaisella torilla on 1600-luvun '
      + 'ristikkotaloja, joista kapea Spitzhäuschen on vuodelta 1416, ja Pyhän Mikaelin '
      + 'kaivon ympärillä on rivi hyvin säilyneitä rakennuksia.',
    lahde: 'en-Wikipedia "Bernkastel-Kues", johdanto-osa ja osiot "History" ja "Sights" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä muinaisen rakennuksen paikalla Bernkastelin yläpuolisen Landshutin linnan '
        + 'rauniot mahdollisesti ovat?',
      vaihtoehdot: [
        'Roomalaisen castellumin',
        'Frankkikuninkaan metsästysmajan',
        'Keskiaikaisen viinikellarin',
        'Kelttiläisen kukkulalinnan',
      ],
      oikea: 0,
      fakta: 'Bernkastel-Kues on keskiajan filosofin ja kirkonmiehen Nikolaus von Kuesin '
        + 'syntymäkaupunki.',
    },
  },
  {
    id: 'hahmotelma-triberg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-triberg-c4aa7573.jpg',
      lyhyt: 'Tribergin vesiputous kaatuu kiviseen altaaseen puusillan alla.',
      selite: 'Tribergin vesiputoukset Schwarzwaldissa. Vesi valuu sammaloituneiden kivien yli, ja yläpuolella kulkee puinen kävelysilta.',
      lahde: 'Valokuva: Uoaei1, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Uoaei1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Triberger_Wasserfälle_20180806_03.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-triberg-c6ac11d1.jpg',
        lyhyt: 'Maailman suurin käkikello Tribergissä: puurakenteinen kellotalo ja iso kellotaulu.',
        selite: 'Triberg im Schwarzwaldin jättimäinen käkikello (kuvauksen mukaan maailman suurin), jonka julkisivussa on roomalaisin numeroin varustettu kellotaulu. Kuva on rajattu alareunasta.',
        lahde: 'Valokuva: Stefan Gerl, Wikimedia Commons (CC0).',
        tekija: 'Stefan Gerl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Landappbw_771468_1822_Kuckucksuhr_Triberg.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Triberg',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuinka korkeat Tribergin putoukset ovat?',
      'Mikä on Saksan korkein vesiputous?',
    ],
    korostukset: ['vesiputoukset|vesiputoukset'],
    nappi: 'Mustan metsän vesiputoukset ja kelloseppien kaupunki',
    // 8.23166667 E / 48.13083333 N — en-Wikipedia "Triberg im Schwarzwald"
    laudat: {
      maailmankartta: { x: 6107.7, y: 1470.6 },
      europe: { x: 369.2, y: 627.8 },
    },
    teksti: 'Triberg im Schwarzwald on kaupunki Baden-Württembergissä Mustan metsän keskellä '
      + '500–1 038 metrin korkeudessa merenpinnasta. Sen tunnetuin nähtävyys on Tribergin '
      + 'vesiputoukset, sarja putouksia Gutach-joessa, jotka ovat Saksan korkeimpia; '
      + 'putoamiskorkeus on yhteensä 151 metriä, mikä ei silti ole Saksan korkein, sillä '
      + 'korkein on Röthbachfall. Kellosepäntyö oli aikoinaan vireä paikallinen elinkeino, '
      + 'mutta ei enää ole keskeinen. Kaupungissa on Schwarzwaldmuseum ja barokkinen '
      + 'pyhiinvaelluskirkko Maria in der Tanne, ja asukkaita on noin 4 650.',
    lahde: 'en-Wikipedia "Triberg im Schwarzwald", johdanto-osa ja osio "Sights" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-hameln',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hameln-8ba69525.jpg',
      lyhyt: 'Pillipiiparin talon koristeellinen renessanssijulkisivu Hamelnin vanhassakaupungissa.',
      selite: 'Rattenfängerhaus on Hamelnin vanhankaupungin tunnetuimpia rakennuksia. Kuvassa näkyy talon porrastettu, runsaasti veistetty kivijulkisivu.',
      lahde: 'Valokuva: Helmlechner, Wikimedia Commons (CC0).',
      tekija: 'Helmlechner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rattenf%C3%A4ngerhaus_Hameln.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hameln-5e74cc10.jpg',
        lyhyt: 'Pillipiiparin talo noin vuonna 1900, kaupunkikuva kärryineen.',
        selite: 'Vanha valokuva Rattenfängerhausista kapean kadun kulmassa. Kuvasta näkyy talon renessanssijulkisivu ja kadulle jätetty kärry.',
        lahde: 'Valokuva: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tekijä tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hameln_Rattenf%C3%A4ngerhaus_1900.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hameln-2dc5321b.jpg',
        lyhyt: 'Hamelnin Hochzeitshaus, Weser-renessanssin näyttävä kivirakennus.',
        selite: 'Vanha mustavalkoinen kuva Hamelnin Hochzeitshausista, jonka koristeelliset päätykolmiot edustavat Weserin renessanssia.',
        lahde: 'Valokuva: Max Sonnen, Wikimedia Commons (public domain).',
        tekija: 'Max Sonnen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Die_Weserrenaissance_(Sonnen)_-_204_-_Hameln,_Hochzeitshaus.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Hameln',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Hamelnin pillipiiparille tapahtui?',
      'Mikä Hansaliitto oli?',
    ],
    korostukset: ['pillipiiparin|pillipiiparin'],
    nappi: 'Pillipiiparin kaupunki, jonka lapset katosivat 1284',
    // 9.36666667 E / 52.1 N — en-Wikipedia "Hamelin"
    laudat: {
      maailmankartta: { x: 6145.6, y: 1297.6 },
      europe: { x: 391, y: 523.4 },
    },
    teksti: 'Hameln on kaupunki Weser-joen varrella Ala-Saksissa, jonka asukasluku on noin 57 '
      + '000, ja se tunnetaan parhaiten Hamelnin pillipiiparin taruista. Kaupunki sai alkunsa '
      + 'luostarista, joka perustettiin jo vuonna 851, ja sen ympärille kasvanut kylä oli '
      + 'kaupunki 1100-luvulla. Pillipiiparin tapahtuman kerrotaan sattuneen vuonna 1284, ja '
      + 'se voi perustua todelliseen tapaukseen, vaikka se olisi ollut hieman erilainen kuin '
      + 'perinteinen tarina. 1400- ja 1500-luvuilla Hameln oli Hansaliiton vähäinen jäsen, ja '
      + 'vuonna 1664 siitä tuli Calenbergin ruhtinaskunnan linnoitettu rajakaupunki, minkä '
      + 'jälkeen alkoi sen suurimman vaurauden aika.',
    lahde: 'en-Wikipedia "Hamelin", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mistä Hamelnin kaupunki sai alkunsa?',
      vaihtoehdot: [
        'Luostarista, jonka ympärille kasvoi kylä',
        'Weserin ylityspaikan tullilinnasta',
        'Hansakauppiaiden perustamasta kauppa-asemasta',
        'Ruhtinaan rakennuttamasta rajalinnoituksesta',
      ],
      oikea: 0,
      fakta: 'Hamelnista tuli vuonna 1664 Calenbergin ruhtinaskunnan linnoitettu rajakaupunki, '
        + 'minkä jälkeen alkoi sen suurimman vaurauden aika.',
    },
  },
  {
    id: 'hahmotelma-oberammergau',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-oberammergau-2ff2cfdb.jpg',
      lyhyt: 'Oberammergaun Passionsspielhaus vuoden 2010 passionnäytelmien aikaan.',
      selite: 'Passionsspielhaus on Oberammergaun passionnäytelmien teatteri. Kuvassa julkisivun ristikoriste ja vuoden 2010 näytelmien julistebanderolli sekä yleisöä teatterin edustalla.',
      lahde: 'Valokuva: Andreas Praefcke, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Andreas Praefcke',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oberammergau_Passionstheater_2010_2.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-oberammergau-3ac3a025.jpg',
        lyhyt: 'Oberammergaun talon seinämaalaus, jossa hevosvaunut ja matkalaisia vuoristomaisemassa.',
        selite: 'Lüftlmalerei on Oberammergaun talojen perinteistä julkisivumaalausta. Tämä seinämaalaus esittää vanhan Rottstraßen liikennettä hevosineen, ja tekstikartussi mainitsee reitin Augsburgista Venetsiaan.',
        lahde: 'Valokuva: Andreas Praefcke, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Andreas Praefcke',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oberammergau_L%C3%BCftlmalerei_Stra%C3%9Fenszene.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-oberammergau-afef5628.jpg',
        lyhyt: 'Ilmakuva Oberammergaun kylästä ja passionteatterista Kofelin rinteeltä.',
        selite: 'Kuva on otettu Kofel-vuoren suunnalta. Alhaalla näkyy Oberammergaun kylän punakattoisia taloja ja keskellä suuri passionteatteri.',
        lahde: 'Valokuva: 0n3 70uch, Wikimedia Commons (CC BY 3.0).',
        tekija: '0n3 70uch',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oberammergau_Passionstheater_-_Kofel.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Oberammergau',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi näytelmä esitetään kymmenen vuoden välein?',
      'Mitä ruttolupaus tarkoittaa?',
    ],
    korostukset: ['Passionnäytelmä|Passionnäytelmästä'],
    nappi: 'Alppikylä, jossa lupaus pitää passionnäytelmän elossa',
    // 11.06444444 E / 47.59666667 N — en-Wikipedia "Oberammergau"
    laudat: {
      maailmankartta: { x: 6202.1, y: 1493.3 },
      europe: { x: 423.6, y: 641.8 },
    },
    teksti: 'Oberammergau on kunta Garmisch-Partenkirchenin piirikunnassa Baijerissa, pieni '
      + 'kaupunki Ammer-joen varrella. Se tunnetaan puunveistäjistään ja veistoksistaan sekä '
      + 'kymmenen vuoden välein esitettävästä Passionnäytelmästä, jonka perinne juontuu '
      + 'vuodesta 1633. Ensimmäinen esitys oli vuonna 1634. Paikallisen legendan mukaan '
      + 'näytelmä esitetään joka kymmenes vuosi lupauksen vuoksi: asukkaat lupasivat esittää '
      + 'passionnäytelmän, jos Jumala säästäisi heidät ruttoepidemialta. Näytelmä esitetään '
      + 'nykyisin nollaan päättyvinä vuosina sekä vuosina 1934 ja 1984, ja kylässä on myös '
      + 'Baijerin valtion puunveistokoulu.',
    lahde: 'en-Wikipedia "Oberammergau", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-voelklingen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-voelklingen-e97372c4.jpg',
      lyhyt: 'Ilmakuva Völklingenin rautatehtaasta etelästä katsottuna.',
      selite: 'Ilmakuvassa näkyy laaja Völklingenin rautatehdas Saarlandissa: masuunien ja putkistojen tiivis ryhmä, sen ympärillä rautatiet ja pihat.',
      lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Carsten Steger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_V%C3%B6lklingen_Ironworks_(view_from_the_south).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-voelklingen-64f2aff1.jpg',
        lyhyt: 'Ruosteisia putkia ja teräsrakenteita Völklingenin masuunialueella.',
        selite: 'Lähikuva Völklingenin rautatehtaan masuunialueen ruostuneista putkista, kaasunkeruurakenteista ja kulkusilloista sinistä taivasta vasten.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C3%B6lklinger_H%C3%BCtte_072_Hoch%C3%B6fen.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-voelklingen-e68196dd.jpg',
        lyhyt: 'Valtava puhallinkone Völklingenin rautatehtaan konesalissa.',
        selite: 'Mustavalkokuvassa on Völklingenin rautatehtaan puhallinkoneen suuri vauhtipyörä ja hammaspyörästö ruutulattiaisessa salissa.',
        lahde: 'Valokuva: TeKaBe, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'TeKaBe',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C3%B6lklinger_H%C3%BCtte_-_Gebl%C3%A4semaschine.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Völklingenin rautatehdas',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi rautatehdas on maailmanperintökohde?',
      'Mitä masuuni tekee?',
    ],
    korostukset: ['masuuni|masuunikompleksi'],
    nappi: 'Julius Buchin terästehdas on juuri perustettu Saar-joen rannalle',
    // 6.85 E / 49.24444444 N — en-Wikipedia "Völklingen Ironworks"
    laudat: {
      maailmankartta: { x: 6061.7, y: 1422.9 },
      europe: { x: 342.7, y: 598.5 },
    },
    teksti: 'Völklingenin rautatehdas on entinen masuunikompleksi Völklingenin kaupungissa '
      + 'Saarlandissa. Raakarautaa tuotettiin paikalla vuodesta 1882 vuoteen 1986. Se on yksi '
      + 'Euroopan ja Pohjois-Amerikan harvoista ehjänä säilyneistä 1800- ja 1900-lukujen alun '
      + 'rautatehtaista, ja UNESCO julisti sen maailmanperintökohteeksi vuonna 1994. Vuonna '
      + '1873 Julius Buch suunnitteli ja rakennutti terästehtaan Saar-joen rannalle lähelle '
      + 'Völklingeniä, mutta tehdas lopetti toimintansa jo kuuden vuoden kuluttua, ja Karl '
      + 'Röchling osti sen. Masuunin rakentaminen alkoi vuonna 1881, ja ensimmäinen uuni '
      + 'aloitti toimintansa kaksi vuotta myöhemmin.',
    lahde: 'en-Wikipedia "Völklingen Ironworks", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuka osti Julius Buchin Saar-joen rannalle rakennuttaman terästehtaan, kun se oli '
        + 'toiminut vain muutaman vuoden?',
      vaihtoehdot: [
        'Alfred Krupp',
        'August Thyssen',
        'Werner von Siemens',
        'Karl Röchling',
      ],
      oikea: 3,
      fakta: 'UNESCO julisti Völklingenin rautatehtaan maailmanperintökohteeksi vuonna 1994.',
    },
  },
  {
    id: 'hahmotelma-freiberg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-freiberg-3949abd9.jpg',
      lyhyt: 'Himmelfahrt Fundgruben malmin rikastamon vanha rakennus heijastuu Freibergin lammikossa.',
      selite: 'Kuvassa on Freibergin Himmelfahrt Fundgruben hopeakaivoksen 1888–1889 rakennettu rikastamorakennus (Neue Aufbereitung) Erzwäsche-lammen rannalla. Rakennus toimi myöhemmin posliinitehtaana.',
      lahde: 'Valokuva: Jörg Blobelt, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jörg Blobelt',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20181106705DR_Freiberg_Himmelfahrt_Fundgrube_Porzellanfabrik.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-freiberg-c695c990.jpg',
        lyhyt: 'Freibergin Himmelfahrt-kaivos noin vuonna 1903 vanhassa postikortissa.',
        selite: 'Vanha kuva Grube Himmelfahrtin alueesta Freibergissä: taustalla nostotorni ja savupiippu, etualalla vesilammikko ja rikastamorakennukset.',
        lahde: 'Valokuva: Brück & Sohn Kunstverlag Meißen, Wikimedia Commons (CC0).',
        tekija: 'Brück & Sohn Kunstverlag Meißen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:03059-Freiberg-1903-Grube_Himmelfahrt-Br%C3%BCck_&_Sohn_Kunstverlag.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-freiberg-7fea20c7.jpg',
        lyhyt: 'Freibergin tuomiokirkko ja museo talvisella torilla.',
        selite: 'Freibergin Pyhän Marian tuomiokirkko ja sen vieressä porrasjulkisivuinen museorakennus lumisateessa.',
        lahde: 'Valokuva: Unukorno, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Unukorno',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Freiberg_dom.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Freibergin hopeakaivokset',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi Freibergia sanotaan hopeakaupungiksi?',
      'Mikä on Bergakademie?',
    ],
    korostukset: ['Bergakademie|Bergakademie'],
    nappi: 'Hopeakaupunki, jonka kaivosakatemia on yli satavuotias',
    // 13.34277778 E / 50.91194444 N — en-Wikipedia "Freiberg"
    laudat: {
      maailmankartta: { x: 6278.1, y: 1350.3 },
      europe: { x: 467.4, y: 554.6 },
    },
    teksti: 'Freiberg on yliopisto- ja entinen kaivoskaupunki Saksissa, noin 41 000 asukkaan '
      + 'kaupunki Malmivuorten esimaastossa Freiberger Mulde -joen varrella. Koko '
      + 'historiallinen keskusta, Hopeakaupunki, on suojeltu, ja se kuuluu Reiche Zeche '
      + '-malmikaivoksen kaltaisten kaivoshistoriallisten kohteiden kanssa vuodesta 2019 '
      + 'UNESCOn Erzgebirge/Krušnohoří-kaivosalueen maailmanperintöön. Freibergin '
      + 'Bergakademie, perustettu vuonna 1765, on maailman vanhin kaivos- ja '
      + 'metallurgiayliopisto. Vuoteen 1969 asti kaupungissa vallitsivat noin 800 vuotta '
      + 'kaivos- ja sulatusteollisuus.',
    lahde: 'en-Wikipedia "Freiberg", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-meissen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-meissen-218d6f57.jpg',
      lyhyt: 'Albrechtsburg ja tuomiokirkko kohoavat Elben rannalla Meissenin linnavuorella auringonlaskussa.',
      selite: 'Kuva on otettu Altstadtbrücken suunnalta Elben yli. Meissenin linnavuoren siluetissa erottuvat Albrechtsburg ja tuomiokirkon tornit.',
      lahde: 'Valokuva: Matti Blume, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Matti Blume',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schloss,_Meissen_(LRM_20230609_202118).jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-meissen-3f61173d.jpg',
        lyhyt: 'Meissenin posliinia: sinivalkoisen sipulikuvion astioita.',
        selite: 'Kuvassa on Meissenin posliiniastioita, joissa on kobolttisinisellä maalattu sipulikuvio (Zwiebelmuster): lautasia, kuppi ja aluslautanen.',
        lahde: 'Valokuva: Goldi64, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Goldi64',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Meissen_Zwiebelmuster.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-meissen-57be546e.jpg',
        lyhyt: 'Albrechtsburgin pohjoissivu ja tuomiokirkon torni metsäisen rinteen yllä.',
        selite: 'Albrechtsburgin valkoinen myöhäisgoottilainen linnarakennus punaisine kattoineen kohoaa puiden takaa, ja sen oikealla puolella näkyy tuomiokirkon terävä torni.',
        lahde: 'Valokuva: Radler59, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Radler59',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Meissen_Albrechtsburg_Nordseite.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Meissenin posliini',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi posliini oli niin arvokasta?',
      'Kuka Augustus II Väkevä oli?',
    ],
    korostukset: ['Albrechtsburgin|Albrechtsburgin'],
    nappi: 'Euroopan ensimmäisen posliinin kaupunki linnavuoren juurella',
    // 13.48333333 E / 51.16666667 N — en-Wikipedia "Meissen"
    laudat: {
      maailmankartta: { x: 6282.8, y: 1339.1 },
      europe: { x: 470.1, y: 547.9 },
    },
    teksti: 'Meissen on noin 30 000 asukkaan kaupunki Elben molemmin puolin Saksin '
      + 'vapaavaltiossa, noin 25 kilometriä Dresdenistä luoteeseen. Se tunnetaan Meissenin '
      + 'posliinista, Albrechtsburgin linnasta, goottilaisesta tuomiokirkosta ja '
      + 'Frauenkirchestä. Euroopan ensimmäinen posliini valmistettiin Meissenissä vuonna '
      + '1710, kun kuningas Augustus II Väkevä perusti Albrechtsburgiin Puolan kuninkaallisen '
      + 'ja Saksin vaaliruhtinaallisen posliinitehtaan. Vuonna 1861 tuotanto siirrettiin '
      + 'Triebisch-joen laaksoon. Meissen on nykyisin Staatliche Porzellan-Manufaktur '
      + 'Meissenin rekisteröity tavaramerkki.',
    lahde: 'en-Wikipedia "Meissen", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka perusti Euroopan ensimmäisen posliinitehtaan Meissenin Albrechtsburgin linnaan?',
      vaihtoehdot: [
        'Preussin kuningas Fredrik Suuri',
        'Saksin vaaliruhtinas Augustus II Väkevä',
        'Ranskan kuningas Ludvig XIV',
        'Ruotsin kuningas Kaarle XII',
      ],
      oikea: 1,
      fakta: 'Meissenin posliinituotanto siirrettiin myöhemmin linnasta Triebisch-joen laaksoon.',
    },
  },
  {
    id: 'hahmotelma-jena',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-jena-d4790b3b.jpg',
      lyhyt: 'Zeissin Universarium VIII -tähtiprojektori Jenan planetaariossa sinisessä valossa.',
      selite: 'Kuvassa on Jenan planetaarion kupolisalin keskellä Zeissin valmistama tähtiprojektori, malliltaan Universarium VIII. Kupolin seinää valaisevat sininen ja oranssi valo.',
      lahde: 'Valokuva: Bernard Ladenthin, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Bernard Ladenthin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2019-09-08_Zeiss_Universarium_VIII_Jena_1.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-jena-2173c05f.jpg',
        lyhyt: 'Carl Zeiss Jenan kaksiokulaarinen mikroskooppi vuodelta 1914.',
        selite: 'Messinkiä ja mustaa metallia oleva mikroskooppi, jonka putkessa lukee Carl Zeiss Jena. Kuvan mukaan laite on valmistettu vuonna 1914.',
        lahde: 'Valokuva: Chad Anderson, staff photographer for SFO Museum, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Chad Anderson, staff photographer for SFO Museum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Binocular_compound_microscope,_Carl_Zeiss_Jena,_1914_(6779276516).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-jena-668b903a.jpg',
        lyhyt: 'Ilmakuva Jenan kaupungista: metsän yllä Landgrafen-torni ja taustalla JenTower.',
        selite: 'Kuvassa näkyy Jenan laakso, etualalla Landgrafen-torni metsäisellä rinteellä ja kaupungin keskustassa pyöreä JenTower-pilvenpiirtäjä.',
        lahde: 'Valokuva: Thuringius, Wikimedia Commons (CC0).',
        tekija: 'Thuringius',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Landgrafen_tower_and_Jentower_Jena_2023.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Jena ja Zeiss',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä Carl Zeiss valmisti?',
      'Miksi Jena oli optiikan keskus?',
    ],
    korostukset: ['Carl Zeiss|Carl Zeiss'],
    nappi: 'Yliopistokaupunki, jossa uusi teollisuus nousee rautatien ja vuoden 1871 jälkeen',
    // 11.58611111 E / 50.92722222 N — en-Wikipedia "Jena"
    laudat: {
      maailmankartta: { x: 6219.5, y: 1349.6 },
      europe: { x: 433.7, y: 554.2 },
    },
    teksti: 'Jena on Thüringenin toiseksi suurin kaupunki ja noin 110 000 asukkaan koulutus- ja '
      + 'tutkimuskeskus. Jenan yliopisto perustettiin vuonna 1558. Kaupunki mainittiin '
      + 'ensimmäisen kerran vuonna 1182 ja pysyi pienenä 1800-luvulle asti, jolloin '
      + 'teollisuus kehittyi; yliopiston luonnontieteiden laajeneminen liittyi läheisesti '
      + 'vuoden 1871 jälkeiseen teolliseen nousuun. Suurimman osan 1900-lukua Jena oli '
      + 'optisen teollisuuden maailmankeskus yritysten kuten Carl Zeiss, Schott ja Jenoptik '
      + 'ympärillä. Entinen Zeissin tehdas keskustassa on esimerkki tekniikan '
      + 'arkkitehtuurista vuosilta 1880–1965, ja sen Bau 15 vuodelta 1915 oli Saksan '
      + 'ensimmäinen korkea rakennus.',
    lahde: 'en-Wikipedia "Jena", johdanto-osa ja osiot "History" ja "Sights" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-muengsten',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-muengsten-0a0bf245.jpg',
      lyhyt: 'Müngstenin silta ylittää Wupperin laakson, ja punainen paikallisjuna kulkee sen yli.',
      selite: 'Teräskaarisilta kohoaa metsäisen jokilaakson yllä. Kuva on otettu maaliskuussa 2013, viikkoa ennen kuin silta suljettiin teräspalkkien uusimisen vuoksi.',
      lahde: 'Valokuva: InterCityImpress, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'InterCityImpress',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Solingen_--_M%C3%BCngstener_Br%C3%BCcke_(10403938084).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-muengsten-bbcc8e19.jpg',
        lyhyt: 'Vanha postikortti näyttää Kaiser-Wilhelm-sillan ja höyryjunan laakson yllä.',
        selite: 'Vuoden 1912 postikortin mukaan silta tunnettiin silloin nimellä Kaiser-Wilhelm-Brücke. Etualalla näkyy näkötemppeli ja polku alas laaksoon.',
        lahde: 'Kuva: Max Wipperling, Elberfeld, Wikimedia Commons (public domain).',
        tekija: 'Max Wipperling, Elberfeld',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kaiser-Wilhelm-Br%C3%BCcke_M%C3%BCngstener_Br%C3%BCcke_1912.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-muengsten-f5447d62.jpg',
        lyhyt: 'Sillan tukitornin rautaristikkoa alhaalta katsottuna metsän keskellä.',
        selite: 'Lähikuvassa näkyy sillan teräsristikkorakenne, joka nousee jokilaakson metsän yläpuolelle.',
        lahde: 'Valokuva: Frank Vincentz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Frank Vincentz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:M%C3%BCngstener_Br%C3%BCcke_07_ies.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Müngstenin silta',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Kuinka korkea silta on?',
      'Miksi silta sai alun perin keisarin nimen?',
    ],
    korostukset: ['Kaiser-Wilhelm-Brücke|Kaiser-Wilhelm-Brücke'],
    nappi: 'Tänne nousee myöhemmin Saksan korkein rautatiesilta',
    // 7.13333333 E / 51.16055556 N — en-Wikipedia "Müngsten Bridge"
    laudat: {
      maailmankartta: { x: 6071.1, y: 1339.3 },
      europe: { x: 348.2, y: 548.1 },
    },
    teksti: 'Müngstenin silta on Saksan korkein rautatiesilta. Silta on 107 metriä korkea ja '
      + 'ylittää Wupper-joen laakson kuljettaen Wuppertal-Oberbarmen–Solingen-rataa '
      + 'Remscheidin ja Solingenin kaupunkien välillä. Silta sai alun perin nimen '
      + 'Kaiser-Wilhelm-Brücke keisari Wilhelm I:n mukaan, ja monarkian päätyttyä se '
      + 'nimettiin lähellä sijainneen Müngstenin asutuksen mukaan. Ensimmäiset suunnitelmat '
      + 'ovat vuodelta 1889, Preussin maapäivät hyväksyivät tarvittavat viisi miljoonaa '
      + 'markkaa vuonna 1890, maansiirto alkoi 26. helmikuuta 1894 ja silta valmistui vuonna '
      + '1897. Hanketta johti insinööri Anton von Rieppel.',
    lahde: 'en-Wikipedia "Müngsten Bridge", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kenen mukaan Müngstenin silta nimettiin alun perin?',
      vaihtoehdot: [
        'Insinööri Anton von Rieppelin',
        'Preussin kuningas Fredrik Vilhelm IV:n',
        'Kansleri Otto von Bismarckin',
        'Keisari Wilhelm I:n',
      ],
      oikea: 3,
      fakta: 'Müngstenin silta on Saksan korkein rautatiesilta ja ylittää Wupper-joen laakson.',
    },
  },
  {
    id: 'hahmotelma-hambach',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hambach-f6653538.jpg',
      lyhyt: 'Hambachin linna metsäisellä kukkulalla ilmasta nähtynä.',
      selite: 'Ilmakuva näyttää Hambachin linnan etelästä. Rakennus seisoo metsän ympäröimällä kukkulalla Pfalzissa.',
      lahde: 'Valokuva: Fischer.H, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Fischer.H',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hambacher_Schloss_Luftaufnahme.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hambach-5498e810.jpg',
        lyhyt: 'Vuoden 1832 piirros esittää juhlakulkueen nousemassa Hambachin linnalle.',
        selite: 'Osittain värjätty kynäpiirros vuodelta 1832 kuvaa kulkuetta linnalle 27. toukokuuta 1832, Hambachin juhlan päivänä. Lippujen värit on Commonsin kuvauksen mukaan luultavasti lisätty jälkikäteen.',
        lahde: 'Piirros: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tekijä tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zug_auf_das_Schloss_Hambach_1832_Deutschland.png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-hambach-c362a887.jpg',
        lyhyt: 'Rautaportti avautuu kohti kukkulalla seisovaa Hambachin linnaa.',
        selite: 'Linnan sisäänkäynnin portti ja pengerretty piha johtavat rinnettä ylös linnarakennukselle, jonka tornissa liehuu lippu.',
        lahde: 'Valokuva: Aristides2, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Aristides2',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hambacher_Schloss_Neustadt.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hambachin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Hambachin juhlassa vaadittiin?',
      'Miksi linna oli rauniona?',
    ],
    korostukset: ['Hambachin juhla|Hambachin juhla'],
    nappi: 'Rauniolinna, jonka juhlassa vaadittiin vapautta 1832',
    // 8.11833333 E / 49.32472222 N — en-Wikipedia "Hambach Castle"
    laudat: {
      maailmankartta: { x: 6103.9, y: 1419.4 },
      europe: { x: 367.1, y: 596.4 },
    },
    teksti: 'Hambachin linna on linna Neustadt an der Weinstrassen Hambachin kaupunginosan '
      + 'lähellä Rheinland-Pfalzissa. Sitä pidetään saksalaisen demokratialiikkeen symbolina, '
      + 'koska siellä pidettiin vuonna 1832 Hambachin juhla. Linna sijaitsee '
      + 'Schlossberg-vuorella, 325 metrin korkeudessa Pfalzin metsän itälaidalla. Vuoden 1832 '
      + 'juhlan aikaan rauniona ollut linna oli pfalzilaisten tyytymättömyyden keskipiste '
      + 'Baijerin hallinnon toimien vuoksi: hallinto oli ollut vallassa vuodesta 1816 ja '
      + 'perunut oikeuksia, jotka Ranskan vallankumousjoukot olivat aiemmin antaneet '
      + 'kansalle.',
    lahde: 'en-Wikipedia "Hambach Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-bad-ems',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bad-ems-d726ae3f.jpg',
      lyhyt: 'Bad Emsin Kurhaus kohoaa metsäisen rinteen edessä Lahn-joen rannalla.',
      selite: 'Kuva on otettu Lahnin yli kohti Kurhausia. Kylpylärakennukset ja rantapromenadi sijaitsevat suoraan joen varrella.',
      lahde: 'Valokuva: Dguendel, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Dguendel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bad_Ems,_Blick_%C3%BCber_die_Lahn_zum_Kurhaus.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bad-ems-c553949c.jpg',
        lyhyt: 'Muistokivi kertoo Emsin sähkeen taustalla olleen tapaamisen ajan.',
        selite: 'Kiveen on kaiverrettu 13. heinäkuuta 1870, kello 9.10 aamulla. Infotaulun mukaan paikalla Preussin kuningas Wilhelm I tapasi Ranskan lähettilään Benedettin.',
        lahde: 'Valokuva: Holger Weinandt, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Holger Weinandt',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gedenkstein_Emser_Depesche.jpg',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-bad-ems-c7afd552.jpg',
        lyhyt: 'Kurhausin edustan promenadi kukkaistutuksineen ja katulyhtyineen.',
        selite: 'Näkymä Kurhausin edustalle Lahnin rantapromenadille. Etualalla on penkki, katulyhty ja kukkaistutuksia sekä paviljonki.',
        lahde: 'Valokuva: Franzfoto, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Franzfoto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bad_Ems_-_Kurhaus_mit_Promenade_an_der_Lahn.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Bad Ems',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Emsin sähke oli?',
      'Miksi Bad Ems oli kuuluisa kylpylä?',
    ],
    korostukset: ['Emsin sähke|Emsin sähke'],
    nappi: 'Kylpyläkaupunki, jonka sähke sytytti sodan 1870',
    // 7.71055556 E / 50.33805556 N — en-Wikipedia "Bad Ems"
    laudat: {
      maailmankartta: { x: 6090.4, y: 1375.4 },
      europe: { x: 359.2, y: 569.7 },
    },
    teksti: 'Bad Ems on noin 9 000 asukkaan kaupunki Rheinland-Pfalzissa Lahn-joen molemmin '
      + 'puolin, ja se on tunnettu kylpylä. Lahn on kaupungin kohdalla luonnollinen raja '
      + 'Taunuksen ja Westerwaldin välillä. Kaupunki mainitaan ensimmäisen kerran '
      + 'asiakirjoissa vuonna 880 ja se sai kaupunkioikeudet vuonna 1324. 1600- ja '
      + '1700-luvuilla Bad Ems oli yksi Saksan kuuluisimmista kylpylöistä, ja sen '
      + 'kukoistuskausi oli 1800-luvulla, jolloin vieraita saapui kaikkialta maailmasta. '
      + 'Vuonna 1870 kaupunki tuli tunnetuksi paikkana, jossa Emsin sähke sai alkunsa ja '
      + 'johti Ranskan ja Preussin sotaan.',
    lahde: 'en-Wikipedia "Bad Ems", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-rammelsberg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-rammelsberg-8ba9db92.jpg',
      lyhyt: 'Rammelsbergin kaivoksen tumma puurakenteinen konepaja-alue nousee rinteeseen.',
      selite: 'Kaivosalueen työpiha ja kerroksittain rinteeseen nousevat tummat puurakennukset. Taustalla näkyy metsäisellä rinteellä nostotorni.',
      lahde: 'Valokuva: Aagnverglaser, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Aagnverglaser',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bergwerk_Rammelsberg,_Werkshof_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-rammelsberg-60d0be05.jpg',
        lyhyt: 'Goslarin keisarinlinna eli Kaiserpfalz levittäytyy nurmikentän takana.',
        selite: 'Panoraamakuva Goslarin Kaiserpfalzista, keskiaikaisesta keisarillisesta palatsista. Edessä on laaja nurmikenttä ja portaiden päällä ratsastajapatsaita.',
        lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ymblanter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Goslar_Kaiserpfalz_panorama.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-rammelsberg-4a9161c4.jpg',
        lyhyt: 'Ristikkotalojen rivi Goslarin vanhassakaupungissa puron varrella.',
        selite: 'Puiset ristikkotalot reunustavat kapeaa vesiuomaa Goslarin vanhassakaupungissa. Yhden talon seinässä on kaiverrettu kehotus rakentaa uutta vanhan pohjalle.',
        lahde: 'Valokuva: Ellafranziska, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ellafranziska',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fachwerk_der_Goslarer_Altstadt.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Rammelsbergin kaivos',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miten Rammelsbergin hopea löydettiin?',
      'Miksi kaivos on maailmanperintökohde?',
    ],
    korostukset: ['hopea|hopea-'],
    nappi: 'Tuhatvuotinen hopea- ja kuparikaivos, joka on yhä toiminnassa',
    // 10.41888889 E / 51.89027778 N — en-Wikipedia "Rammelsberg"
    laudat: {
      maailmankartta: { x: 6180.6, y: 1307 },
      europe: { x: 411.2, y: 528.9 },
    },
    teksti: 'Rammelsberg on 635 metriä korkea vuori Harzin vuoriston pohjoisreunalla, Goslarin '
      + 'historiallisen kaupungin eteläpuolella Ala-Saksissa. Vuoressa on tärkeä hopea-, '
      + 'kupari- ja lyijykaivos, ja kun se suljettiin vuonna 1988, se oli ainoa kaivos, joka '
      + 'oli toiminut yhtäjaksoisesti yli tuhat vuotta. Legendan mukaan vuori on saanut '
      + 'nimensä ritari Rammilta, Otto Suuren kätyriltä, jonka hevonen paljasti kavioillaan '
      + 'hopeasuonen vuonna 968. Malmiesiintymä syntyi devonikaudella merenpohjan kuumista '
      + 'lähteistä. Vierailukaivos merkittiin UNESCOn maailmanperintökohteeksi vuonna 1992.',
    lahde: 'en-Wikipedia "Rammelsberg", johdanto-osa ja osiot "Name" ja "Ore formation" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ansbach',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ansbach-3fef700e.jpg',
      lyhyt: 'Ansbachin barokkinen Residenz-palatsi julkisivu edestä kuvattuna.',
      selite: 'Residenzin pääjulkisivu, jonka kattolistalla on patsaita ja pääsisäänkäynnin vieressä Domenico Ferrettin veistämät putto-ryhmät vahtikoppien päällä.',
      lahde: 'Valokuva: 19Wilhelm18, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: '19Wilhelm18',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Residenz-Ansbach-001.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ansbach-a64c5ad2.jpg',
        lyhyt: 'Kaspar Hauserin muistomerkki on hiekkakivipylväs Hofgartenin puistossa.',
        selite: 'Goottilaistyylinen kivipylväs seisoo puiden keskellä Ansbachin Hofgartenissa. Siihen on kaiverrettu latinankielinen teksti ja vuosiluku 1833.',
        lahde: 'Valokuva: Tilman2007, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tilman2007',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hofgarten,_Kaspar_Hauser_Denkmal_Ansbach_20220102_0159.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/deu-nosto-ansbach-b71fb76e.jpg',
        lyhyt: 'Ilmakuva Ansbachin Hofgartenista ja sen Orangeriasta etelästä katsottuna.',
        selite: 'Ilmakuva näyttää puiston lehmusalleet, ruohokentät ja koristepuutarhan Orangerian edustalla. Puiston ympärillä ovat kaupungin rakennukset ja rautatie.',
        lahde: 'Valokuva: Carsten Steger, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Carsten Steger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_Hofgarten_Ansbach_(view_from_the_south).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ansbach',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Kaspar Hauser oli?',
      'Keitä Brandenburg-Ansbachin markkreivit olivat?',
    ],
    korostukset: ['Kaspar Hauser|Kaspar Hauser'],
    nappi: 'Markkreivien barokkikaupunki, jossa arvoituksellinen nuorukainen kuoli vuonna 1833',
    // 10.58333333 E / 49.3 N — en-Wikipedia "Ansbach"
    laudat: {
      maailmankartta: { x: 6186.1, y: 1420.5 },
      europe: { x: 414.4, y: 597 },
    },
    teksti: 'Ansbach on Baijerin Keski-Frankenin hallintoalueen pääkaupunki, 40 kilometriä '
      + 'Nürnbergistä lounaaseen, ja asukkaita siellä oli vuonna 2020 noin 41 700. Kaupunki '
      + 'sai alkunsa 700-luvulla benediktiiniluostarina ja siitä tuli Hohenzollern-suvun '
      + 'kotipaikka vuonna 1331; vuonna 1460 siellä asuivat Brandenburg-Ansbachin '
      + 'markkreivit. Kaupungin Markgrafenschloss rakennettiin vuosina 1704–1738, ja se on '
      + 'säilyttänyt alkuperäisen barokkisen ilmeensä. Kaspar Hauser (1812–1833) asui '
      + 'Ansbachissa vuosina 1830–1833 ja puukotettiin palatsin puutarhassa; kaupungissa on '
      + 'hänen muistomerkkinsä.',
    lahde: 'en-Wikipedia "Ansbach", johdanto-osa ja osio "Sights" (tarkistettu 19.9.2026).',
  },
];
