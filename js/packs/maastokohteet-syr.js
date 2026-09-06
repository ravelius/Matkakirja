/*
 * MAASTOKOHTEET — SYR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SYR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SYR.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Syyrian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maalla on jo fokuskohteet-syr.js (Belin temppeli) — maastoa siinä ei ole, joten päällekkäisyyksiä ei synny. Eufratin merkki on Raqqan ja Dayr az Zawrin välissä, jottei se osu lehteen poltetun Dayr az Zawrin nimen päälle.
 */
export const MAASTOKOHTEET_SYR = [
  {
    id: 'hermonvuori',
    nimi: 'Hermonvuori',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko Lähi-idässä hiihtää?',
      'Miksi vuoren laella on YK:n vartioasema?',
    ],
    korostukset: ['Anti-Libanon|Anti-Libanonin'],
    nappi: 'Syyrian lumihuippu',
    // 35.8575 E / 33.4161 N — en-Wikipedia "Mount Hermon"
    laudat: {
      maailmankartta: { x: 7028.6, y: 2054.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hermonvuori on Anti-Libanonin vuoriston eteläinen pääte, ja sen 2 814-metrinen laki '
      + 'Syyrian ja Libanonin rajalla on Syyrian korkein kohta. Huipulla, YK:n valvomalla '
      + 'puskurivyöhykkeellä, on maailman korkein pysyvästi miehitetty YK-asema, lempinimeltään '
      + 'Hermon-hotelli. Etelärinteillä Golanin puolella toimii hiihtokeskus — lunta siis '
      + 'riittää keskellä Lähi-itää.',
    lahde: 'en-Wikipedia "Mount Hermon", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Miksi Syyrian rannikkoa kutsutaan Levantiksi?',
    ],
    korostukset: ['Levantti|Levantiksi'],
    nappi: 'Meri kolmen maanosan välissä',
    // 35.35 E / 35.3 N — ulappa Latakian edustalla; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 7011.7, y: 1984.1 },
      europe: { x: 889.9, y: 965.2 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Syyrian rannikko on sen itäisintä reunaa, jota kutsutaan '
      + 'Levantiksi. Lännessä meri yhtyy Atlanttiin Gibraltarinsalmen kautta ja kaakossa Suezin '
      + 'kanava vie Punaisellemerelle.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'eufrat',
    nimi: 'Eufrat',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Mesopotamia oli?',
      'Missä Eufrat ja Tigris yhtyvät?',
    ],
    korostukset: ['Mesopotamia|Mesopotamian'],
    nappi: 'Mesopotamian synnyttäjä',
    // 39.55 E / 35.65 N — joen laakso Raqqan ja Dayr az Zawrin välissä; artikkelin koordinaatti 47,442 / 31,005 on Shatt al-Arabissa Irakissa
    laudat: {
      maailmankartta: { x: 7151.7, y: 1970.8 },
      europe: { x: 970.6, y: 956 },
    },
    teksti: 'Eufrat on Länsi-Aasian pisin joki ja yhdessä Tigriksen kanssa toinen Mesopotamian '
      + 'kahdesta määrittävästä virrasta. Se saa alkunsa Turkista, virtaa koko Syyrian halki '
      + 'kaakkoon ja jatkaa Irakiin, missä se yhtyy Tigrikseen Shatt al-Arabiksi ja laskee '
      + 'Persianlahteen. Kuivassa maassa joen laakso on vihreä nauha, jonka varrella Syyrian '
      + 'viljelykset ja kaupungit ovat aina olleet.',
    lahde: 'en-Wikipedia "Euphrates", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ═══════════════ ERÄ M16 (SYYRIA), 6.9.2026 ════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Syyrialla oli ennen tätä erää kolme maastokohdetta (yllä) ja yksi
   * kohde (js/packs/fokuskohteet-syr.js, Palmyran Belin temppeli),
   * joten vaje oli seitsemän kohdetta. Maastossa ei ollut vajetta.
   *
   * SISÄLTÖLINJA ON docs/aasia-tyoaineisto/spec-asia.md JA M3:N
   * MYANMAR-LINJA. Maan nykytila on sotaa, joten kohteiksi kelpuutettiin
   * vain antiikin ja keskiajan paikkoja, joiden artikkelin nykytilaosuus
   * EI ole taistelua. Jokainen kortti kertoo kohteen oman historian;
   * jos lähdeartikkeli mainitsee 2010-luvun vahingot, se sanotaan
   * enintään yhtenä toteavana virkkeenä lähteen sanoin — useimmissa
   * korteissa ei sanota sitäkään, koska kortti ei ole nykytilaraportti.
   *
   * MAALOULA JÄTETTIIN POIS TÄLLÄ SÄÄNNÖLLÄ: sen artikkelin koko
   * History-osio on vuoden 2013 taistelu, joten kohde ei täytä ehtoa.
   * Sama koski Dura-Europosta kohteena; sen tarina kerrotaan sen sijaan
   * skandaalina (js/packs/skandaalit.js, erä M16).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Syyrian laudan kaupungit ovat Aleppo
   * (x 7072 / y 1949,5) ja Damaskos (x 7044 / y 2052,1). Etäisyys
   * mitattiin jokaiseen laudan kaupunkiin; lähin uusi merkki on Ebla
   * 19,8 lautayksikön päässä Aleposta, ja raja KAUPUNGIN_KOHDALLA_SADE
   * on 7. Lähin kaupunki on kirjattu jokaisen koordinaattirivin viereen.
   *
   * KUVATON ERÄ. Faktat en-Wikipedian raakatekstistä 6.9.2026.
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: 'krak-des-chevaliers',
    nimi: 'Krak des Chevaliers',
    // Kartalle lyhyt asu: koko nimi ei mahdu nimiöön.
    nimio: 'Krak',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linna rakennettiin juuri tähän?',
      'Miten linna lopulta menetettiin?',
    ],
    korostukset: ['johanniitat|johanniittojen'],
    nappi: 'Ristiretkiajan mahtavin linna',
    // 36.2947 E / 34.7570 N — en-Wikipedia "Krak des Chevaliers".
    // Lähin kaupunki Damaskos 47,5 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7043.2, y: 2004.6 },
    },
    teksti: 'Krak des Chevaliers on keskiaikainen linna 650 metriä korkealla kukkulalla Homsin '
      + 'aukossa, siinä solassa joka yhdistää Tripolin ja Homsin. Paikalla oli 1000-luvulla '
      + 'kurdivaruskunta — siitä arabialainen nimi Hisn al-Akrad, kurdien linna — ja vuonna '
      + '1142 Tripolin kreivi Raymond II luovutti sen johanniittojen ritarikunnalle. '
      + 'Johanniittojen rakennustyöt kestivät 1170-luvulle, ja 1200-luvun toinen vaihe teki '
      + 'linnasta konsentrisen eli kaksinkertaisen kehämuurin linnan, joka on yhä sen nykyinen '
      + 'muoto. Parhaimmillaan varuskunta oli noin 2 000 miestä, ja se pystyi perimään veroa '
      + 'laajalta alueelta; unkarin kuningas Andreas II kutsui linnaa vuonna 1218 '
      + '"kristittyjen maiden avaimeksi". Mamelukkisulttaani Baibars valtasi sen vuonna 1271 '
      + '36 päivän piirityksen jälkeen — kertoman mukaan väärennetyllä kirjeellä, joka näytti '
      + 'tulevan ritarikunnan suurmestarilta ja käski antautua. Linna ja Salah ed-Dinin linna '
      + 'ovat olleet maailmanperintökohteita vuodesta 2006.',
    lahde: 'en-Wikipedia "Krak des Chevaliers", johdanto sekä osiot "Etymology", "Location" ja '
      + '"Origins and Crusader period" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bosra',
    nimi: 'Bosra',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä teki Bosrasta rikkaan?',
      'Miksi teatteri on säilynyt niin hyvin?',
    ],
    korostukset: ['nabatealainen|nabatealainen'],
    nappi: 'Teatteri linnoituksen sisällä',
    // 36.48056 E / 32.51833 N — en-Wikipedia "Bosra".
    // Lähin kaupunki Damaskos 36,6 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7049.4, y: 2088.3 },
    },
    teksti: 'Bosra mainitaan jo 1300-luvun eaa. egyptiläisissä lähteissä, ja se oli '
      + 'nabatealainen kaupunki ennen kuin Traianuksen kenraali Cornelius Palma valloitti '
      + 'kuningaskunnan vuonna 106 jaa. Roomalaiset nimesivät sen Nova Traiana Bostraksi ja '
      + 'tekivät siitä Arabia Petraean maakunnan pääkaupungin sekä legio III Cyrenaican '
      + 'tukikohdan. Kaupunki rikastui useiden kauppateiden risteyksessä, ennen kaikkea Via '
      + 'Traiana Novan varrella, joka yhdisti Damaskoksen Punaiseenmereen; keisari Philippus '
      + 'Arabsin aikana Bosra alkoi lyödä omaa rahaa. Kaupungin 100-luvun roomalainen teatteri '
      + 'on säilynyt siksi, että se muutettiin seldžukkien aikana 1000-luvun lopulla '
      + 'linnoitukseksi ja jäi näin muurien sisään. Bosra on Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Bosra", johdanto sekä osiot "History", "Roman period" ja '
      + '"Islamic era" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ugarit',
    nimi: 'Ugarit',
    tyyppi: 'historia',
    kysymykset: [
      'Miten unohtunut kaupunki löydettiin?',
      'Mikä tekee Ugaritin kirjoituksesta erityisen?',
    ],
    korostukset: ['aakkoset|aakkoset'],
    nappi: 'Maailman vanhimmat aakkoset',
    // 35.782 E / 35.602 N — en-Wikipedia "Ugarit".
    // Lähin kaupunki Aleppo 51,4 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7026.1, y: 1972.6 },
    },
    teksti: 'Ugarit oli pronssikautinen rannikkokaupunki, jonka paikka tunnetaan nykyään '
      + 'nimellä Ras Shamra. Kaupungin sijainti unohtui sen tuhon jälkeen 1100-luvulla eaa., '
      + 'kunnes vuonna 1928 maanviljelijä avasi auralla vahingossa vanhan haudan; paljastunut '
      + 'alue oli Ugaritin hautausmaa Minet el-Beidan satamassa. Ranskalainen retkikunta '
      + 'Claude Schaefferin johdolla aloitti kaivaukset 1929, ja työ jatkui vuoteen 1939. '
      + 'Löydöistä tärkein on kirjoitus: Ugaritin kirjurit näyttävät kehittäneen noin vuonna '
      + '1400 eaa. vanhimmat järjestelmällisesti käytetyt aakkoset, 30 savitauluihin '
      + 'painettua äänteitä vastaavaa merkkiä. Kirjainten muoto ei muistuta foinikialaisia, '
      + 'mutta aakkosjärjestys on niin lähellä foinikialaista, etteivät järjestelmät voi olla '
      + 'täysin toisistaan riippumattomia keksintöjä.',
    lahde: 'en-Wikipedia "Ugarit", johdanto sekä osiot "Alphabet" ja "Archaeology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ebla',
    nimi: 'Ebla',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä savitaulut kertoivat?',
      'Miksi löytö muutti käsitystä Levantista?',
    ],
    korostukset: ['nuolenpääkirjoitus|nuolenpääkirjoituksella'],
    nappi: '20 000 savitaulun arkisto',
    // 36.798 E / 35.798 N — en-Wikipedia "Ebla".
    // Lähin kaupunki Aleppo 19,8 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7059.9, y: 1965.2 },
    },
    teksti: 'Ebla oli yksi Syyrian varhaisimmista kuningaskunnista, ja sen jäänteet '
      + 'muodostavat tellin eli asuinkummun noin 55 kilometriä Aleposta lounaaseen. Pienestä '
      + 'varhaispronssikautisesta kylästä kasvoi kauppavaltakunta ja lopulta mahti, joka '
      + 'hallitsi suurta osaa Pohjois- ja Itä-Syyriaa; kaupunki tuhottiin ja rakennettiin '
      + 'uudelleen kolmesti, ja viimeisen kerran sen tuhosi heettiläiskuningas noin 1600 eaa. '
      + 'Kauppaverkko oli laaja: palatseista on löydetty esineitä Sumerista, Kyprokselta, '
      + 'Egyptistä ja aina Afganistanista asti. Kaivaukset alkoivat 1964, ja kuuluisiksi ne '
      + 'teki noin 20 000 savitaulun arkisto vuosilta 2500–2350 eaa. Taulut on kirjoitettu '
      + 'nuolenpääkirjoituksella sekä sumeriksi että eblaksi, ja ne osoittivat, että Levantti '
      + 'oli Egyptin ja Mesopotamian veroinen muinaisen sivistyksen keskus.',
    lahde: 'en-Wikipedia "Ebla", johdanto (tarkistettu 6.9.2026).',
  },
  {
    id: 'apamea',
    nimi: 'Apamea',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka pitkä pylväskatu oli?',
      'Kenen mukaan kaupunki nimettiin?',
    ],
    korostukset: ['cardo maximus|cardo maximus'],
    nappi: 'Kahden kilometrin pylväskatu',
    // 36.398 E / 35.418 N — en-Wikipedia "Apamea, Syria".
    // Lähin kaupunki Aleppo 39,4 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7046.6, y: 1979.6 },
    },
    teksti: 'Apamea on hellenistinen ja roomalainen kaupunki Orontesjoen oikealla rannalla. Se '
      + 'perustettiin makedonialaiseksi sotilassiirtokunnaksi nimellä Pella, ja noin vuonna '
      + '300 eaa. Seleukos I Nikator linnoitti sen kaupungiksi ja nimesi sen vaimonsa Apaman '
      + 'mukaan. Kaupunki oli Apamenen pääkaupunki seleukidien aikana ja myöhemmin Syyrian '
      + 'toisen roomalaisen maakunnan pääkaupunki. Kuuluisin jäänne on Suuri pylväskatu, noin '
      + 'kahden kilometrin mittainen pylväiden reunustama valtaväylä ja yksi roomalaisen '
      + 'maailman pisimmistä; se rakennettiin uudelleen vuoden 115 jaa. Antiokian maanjäristyksen '
      + 'jälkeen ja muodosti kaupungin cardo maximus -pääkadun, joka yhdisti kylpylät, agoran '
      + 'ja nymfaion-suihkulähteen. Roomalainen teatteri on istumapaikkoja arvioiden yli '
      + '20 000 hengelle eli yksi keisarikunnan suurimmista.',
    lahde: 'en-Wikipedia "Apamea, Syria", johdanto sekä osiot "Geography" ja "Hellenistic era" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'resafa',
    nimi: 'Resafa',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä autiomaakaupunki sai vetensä?',
      'Kuka oli pyhä Sergios?',
    ],
    korostukset: ['Sergiopolis|Sergiopoliksi'],
    nappi: 'Pyhiinvaelluskaupunki keskellä aroa',
    // 38.75639 E / 35.62778 N — en-Wikipedia "Resafa".
    // Lähin kaupunki Aleppo 57,6 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7125.2, y: 1971.7 },
    },
    teksti: 'Resafa on autiomaakaupungin rauniokenttä Eufratin lounaispuolella. Paikalla oli '
      + 'assyrialainen sotilasleiri jo 800-luvulla eaa., ja roomalaisaikana siitä tuli '
      + 'linnoitettu etuvartio ja karavaanitien asema Aleppon, Dura-Europoksen ja Palmyran '
      + 'välillä. Lähdettä tai juoksevaa vettä ei ollut, joten kaupunki eli suurten '
      + 'vesisäiliöiden varassa, joihin kerättiin talven ja kevään sateet. 300-luvulla '
      + 'Resafasta tuli pyhiinvaelluskaupunki: paikalla marttyyrikuoleman kärsineen '
      + 'roomalaissotilas Sergioksen haudalle rakennettiin kirkko, kaupunki nimettiin '
      + 'Sergiopoliksi ja siitä kasvoi Jerusalemin jälkeen tärkein pyhiinvaelluskohde '
      + 'varhaisbysanttilaisessa idässä. Justinianuksen rakennuttamat muurit ovat yhä '
      + 'pystyssä, yli 480 metriä pitkät, ja niissä on torni noin kolmenkymmenen metrin '
      + 'välein. Kalifi Hisham ibn Abd al-Malik teki kaupungista suosikkiasuinpaikkansa '
      + '700-luvulla, ja se hylättiin lopullisesti 1200-luvulla.',
    lahde: 'en-Wikipedia "Resafa", johdanto sekä osiot "Antiquity" ja "Muslim conquest to 13th '
      + 'century" (tarkistettu 6.9.2026).',
  },
  {
    id: 'mari',
    nimi: 'Mari',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Marin arkisto paljasti?',
      'Kuka tuhosi kaupungin lopullisesti?',
    ],
    korostukset: ['Shakkanakku|Shakkanakku-käskynhaltijat'],
    nappi: '25 000 savitaulua Eufratin varrelta',
    // 40.89 E / 34.54944 N — en-Wikipedia "Mari, Syria".
    // Lähin kaupunki Mosul 100,9 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 7196.3, y: 2012.4 },
    },
    teksti: 'Mari oli seemiläinen kaupunkivaltio Eufratin länsirannalla, ja se kukoisti '
      + 'kauppakeskuksena ja mahtivaltiona vuosien 2900 ja 1759 eaa. välillä. Kaupunki oli '
      + 'rakennettu keskelle Eufratin kauppateitä etelän Sumerin sekä lännen Eblan ja '
      + 'Levantin väliin. Akkadilaiset tuhosivat sen 2200-luvulla eaa. mutta antoivat '
      + 'rakentaa sen uudelleen ja asettivat sinne sotilaskäskynhaltijan; nämä '
      + 'Shakkanakku-käskynhaltijat itsenäistyivät Akkadin hajotessa ja hallitsivat Maria '
      + '1800-luvun eaa. jälkipuoliskolle asti. Sen jälkeen kaupungista tuli amorilaisen '
      + 'Lim-suvun pääkaupunki, kunnes Babylonia tuhosi sen noin 1761 eaa. Vuonna 1933 tehty '
      + 'löytö muutti käsityksen muinaisen Lähi-idän kartasta: yli 25 000 savitaulua kertoi '
      + 'valtionhallinnosta ja hallitsijoiden välisestä diplomatiasta sekä 1700-luvun eaa. '
      + 'kauppaverkosta, joka ulottui Afganistanista Kreetalle.',
    lahde: 'en-Wikipedia "Mari, Syria", johdanto (tarkistettu 6.9.2026).',
  },
];

