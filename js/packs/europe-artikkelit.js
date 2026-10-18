// Euroopan omat Lue lisää -artikkelit pelin tyyliin (avain = wiki-otsikko,
// sama rakenne kuin Afrikan OMAT_ARTIKKELIT). Rakentuu kaupunki
// kerrallaan.
export const EUROPE_ARTIKKELIT = {
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E7 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro EI OLE ENÄÄ kahden lauseen nosto vaan lehden ETUSIVUN
   * LEIPÄTEKSTI — 7–10 virkkeen johdatus (~700–1100 mrk) kahdessa tai
   * kolmessa kappaleessa ('\n\n') ja 1–3 maltillista **lihavointia**.
   * Renderöijä (piirraLeipateksti) tekee kappaleet ja boldit, joten
   * tänne ei kirjoiteta HTML:ää. Faktat ovat Venetsian omista jo
   * tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
   * Matkailijan Venetsia, nahtavyysjutut.js, maakartat.js, oma
   * teksti-kenttä alla) sekä en-Wikipedian Venice-artikkelin
   * hallinnollisesta asemasta ja väestöluvuista. teksti on ennallaan.
   */
  Venetsia: {
    intro: 'Venetsia on Koillis-Italian rannikkokaupunki ja Veneton '
      + 'alueen pääkaupunki, ja se on rakennettu 126 saarelle matalaan '
      + 'laguuniin. Saaria yhdistää 472 siltaa, ja kaikki liikkuminen '
      + 'tapahtuu jalan tai vettä pitkin — autoja saarikaupungissa ei '
      + 'ole lainkaan. Kunnan alueella asuu noin 250 000 ihmistä, mutta '
      + 'itse vanhassa saarikaupungissa enää noin 50 000; suurin osa '
      + 'väestä asuu mantereen puolella.'
      + '\n\n'
      + 'Kaupunki oli vuodesta 810 vuoteen 1797 itsenäisen tasavallan '
      + 'pääkaupunki, lähes vuosituhannen, ja siitä käytettiin nimeä '
      + '**La Serenissima**. Sen laivat hallitsivat idänkauppaa, ja '
      + 'vaurauden näkee yhä Pyhän Markuksen torilla: basilikan '
      + 'kultamosaiikeissa ja dogen palatsin kaaririvistössä. '
      + 'Itsenäisyys päättyi Napoleoniin, ja vuonna 1866 Venetsiasta '
      + 'tuli osa Italiaa.'
      + '\n\n'
      + 'Vesi on samalla kaupungin perusta ja sen uhka. Talot seisovat '
      + 'pohjamutaan lyötyjen puupaalujen varassa, ja syksyisin '
      + 'nousuvesi tulvii toreille; laguunin suuaukkoihin rakennetut '
      + '**MOSE-portit** nostetaan pahimpia tulvia vastaan. Laguuni ja '
      + 'kaupunki ovat kuuluneet Unescon maailmanperintöön vuodesta '
      + '1987.',
    teksti: 'Venetsia oli vuosisatojen ajan itsenäinen tasavalta ja '
      + 'Välimeren mahtavin kauppakaupunki. Sen laivat toivat idästä '
      + 'silkkiä, mausteita ja tarinoita — kuuluisin kertoja oli '
      + 'kauppiaan poika Marco Polo, joka matkasi 1200-luvulla Kiinaan '
      + 'asti ja palveli suurkaania seitsemäntoista vuotta.\n\n'
      + 'Kaupungin sydän on Pyhän Markuksen tori: basilika '
      + 'kultamosaiikkeineen, dogen palatsi ja korkea kellotorni. Dogi '
      + 'oli tasavallan vaaleilla valittu ruhtinas, ja hänen palatsinsa '
      + 'takaa kulkee Huokausten silta — vangit huokasivat sillä '
      + 'viimeisen vilkaisunsa laguunille matkalla tyrmään.\n\n'
      + 'Vesi antaa Venetsialle kaiken ja uhkaa sitä samalla: '
      + 'nousuvesi eli acqua alta tulvii toreille syksyisin, ja '
      + 'kaupunki painuu hitaasti pehmeään pohjaansa. Laguunin suulle '
      + 'on rakennettu liikuteltavat MOSE-padot, jotka nostetaan '
      + 'merestä tulvaa vastaan. Autoja kaupungissa ei ole lainkaan: '
      + 'kaikki kulkee veneillä, roskakuljetuksista ambulanssiin.',
  },
  Italia: {
    // Lehden etusivun maaosasto nojaa tähän tekstiin ilman Lue lisää
    // -nappia, joten intro on muita maita pidempi (omistajan toive
    // 5.8.2026: "ydintietoja voisi kirjoittaa aavistuksen pidemmiksi").
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä (omistajan toive 7.8.2026), ja keskimmäinen kappale
    // selittää sen, mitä korkokartta näyttää: laakea Po-laakso,
    // Apenniinien selkäranka ja tulivuoret etelässä.
    intro: 'Italia on saapasta muistuttava niemimaa keskellä Välimerta. '
      + 'Nykyinen valtio on nuori — se yhdistyi kuningaskunnaksi vasta '
      + '1861 — mutta sen mailla on kävelty pidempään kuin juuri '
      + 'missään: Rooman valtakunta hallitsi täältä koko Välimerta.'
      + '\n\nPohjoisessa maa alkaa Alpeilta ja laskeutuu Po-joen '
      + 'laakeaan laaksoon, jossa ovat sen pellot, tehtaat ja suurin '
      + 'osa sen sateista. Sieltä etelään kulkee Apenniinien '
      + 'selkäranka Sisiliaan asti, ja saappaan kärjessä tulivuoret '
      + 'ovat yhä hereillä.'
      + '\n\nVuosisatoja maa oli kaupunkivaltioiden tilkkutäkki, ja se '
      + 'näkyy yhä: murteet, ruoat ja tavat vaihtuvat laaksosta '
      + 'toiseen, ja moni esittelee itsensä ensin kotiseutunsa kautta. '
      + 'Unescon maailmanperintökohteita Italiassa on enemmän kuin '
      + 'missään muussa maassa. Rajojen sisäpuolella on lisäksi kaksi '
      + 'omaa valtiota, Vatikaani ja San Marino.',
    teksti: 'Italia oli vuosisatoja kaupunkivaltioiden tilkkutäkki: '
      + 'Venetsia ja Genova hallitsivat meriä, Firenze rahaa ja '
      + 'taidetta, Rooma kirkkoa. Siksi maa on yhä alueidensa summa — '
      + 'murteet, ruoat ja tavat vaihtuvat laaksosta toiseen, ja moni '
      + 'esittelee itsensä ensin kotiseutunsa, vasta sitten maansa '
      + 'kautta.\n\n'
      + 'Ruoka on Italiassa vakava asia ja paikallisylpeys: pasta '
      + 'Napolista, risotto Pohjois-Italiasta, pizza Napolin '
      + 'kaduilta — ja jokainen kylä on varma, että juuri sen '
      + 'resepti on se oikea. Espresso juodaan seisten baaritiskillä, '
      + 'ja illallinen voi kestää koko illan.\n\n'
      + 'Unescon maailmanperintökohteita Italiassa on enemmän kuin '
      + 'missään muussa maassa — antiikin raunioita, '
      + 'renessanssikaupunkeja ja kokonaisia historiallisia keskustoja. '
      + 'Rooman perintö näkyy arjessakin: Eurooppa kirjoittaa yhä '
      + 'latinalaisilla kirjaimilla ja elää monin paikoin roomalaisten '
      + 'teiden varsilla.',
  },

  // TEKSTIREMONTTI 20.8.2026, ERÄ E7: intro on nyt etusivun leipäteksti
  // (ks. Venetsian lohkokommentti yllä). Faktat Marseillen omista jo
  // tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
  // Matkailijan Marseille, nahtavyysjutut.js, maakartat.js) sekä
  // en-Wikipedian Marseille-artikkelin väkiluvusta ja hallinnollisesta
  // asemasta. teksti on ennallaan.
  Marseille: {
    intro: 'Marseille on Ranskan vanhin kaupunki ja Pariisin jälkeen sen '
      + 'väkirikkain: asukkaita on runsaat 880 000 ja koko seudulla '
      + 'lähes kaksi miljoonaa. Kreikkalaiset merenkulkijat perustivat '
      + 'sen noin 600 eaa. nimellä Massalia luonnonpoukamaan, jonka '
      + 'nimi on nyt **Vanhasatama**. Se on '
      + 'Bouches-du-Rhônen departementin hallintokeskus ja yhä Ranskan '
      + 'suurin satama.'
      + '\n\n'
      + 'Marseille on aina katsonut merelle päin, ei pääkaupunkiin, ja '
      + 'se näkyy väestössä: satama on tuonut tänne väkeä Italiasta, '
      + 'Armeniasta, Algeriasta, Marokosta ja Komoreilta. Sataman yllä '
      + 'kohoaa kukkulalla basilika **Notre-Dame de la Garde**, jonka '
      + 'kullattu patsas näkyy merelle ja jota kaupunkilaiset sanovat '
      + 'nimellä la Bonne Mère. Saippuaa täällä on keitetty '
      + 'oliiviöljystä noin kuudensadan vuoden ajan, ja vuoden 1688 '
      + 'asetus varasi nimen sille.'
      + '\n\n'
      + 'Kaupunki jakautuu kuuteentoista keskenään hyvin erilaiseen '
      + 'kaupunginosaan, ja yhteen niistä kuuluu kokonainen '
      + 'kansallispuisto: Calanques\'in kalkkikivijyrkänteet ja kapeat '
      + 'poukamat alkavat kaupungin rajojen sisältä. Luoteesta '
      + 'puhaltava kylmä mistraali kuuluu samaan maisemaan, ja sade '
      + 'painottuu syksyyn.',
    teksti: 'Vanha satama Vieux-Port on kaupungin sydän ja alkupiste: '
      + 'kreikkalaisten laivat laskivat juuri tähän lahteen, ja samassa '
      + 'altaassa myydään aamun kala vieläkin. Sataman suulla kohoaa '
      + 'Notre-Dame de la Garde, jonka kullattu Neitsyt Maria näkyy '
      + 'merelle kilometrien päähän — merimiehet kutsuvat sitä nimellä '
      + 'la Bonne Mère, hyvä äiti.\n\n'
      + 'Marseille on ollut kauppasatama kaikkien Välimeren valtakuntien '
      + 'aikaan, ja se näkyy väestössä: kaupungissa on suuria yhteisöjä '
      + 'Algeriasta, Marokosta, Tunisiasta, Italiasta, Armeniasta ja '
      + 'Komoreilta. Torilla puhutaan ranskaa, arabiaa ja komorea, ja '
      + 'ruokakulttuuri on sekoitus niitä kaikkia. Kaupungin oma ruoka '
      + 'bouillabaisse alkoi kalastajien kotiruokana siitä osasta '
      + 'saalista, jota kukaan ei ostanut.\n\n'
      + 'Marseillesta tuli 1990-luvulla myös ranskalaisen rapin '
      + 'kotikaupunki: yhtye IAM ja monet muut tekivät siitä musiikin '
      + 'keskuksen, joka ei ollut Pariisi. Kaupungin jalkapalloseura '
      + 'Olympique de Marseille on osa samaa identiteettiä — Vélodrome-'
      + 'stadionilla ollaan ensin marseillelaisia ja vasta sitten '
      + 'ranskalaisia.',
  },
  Ranska: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale selittää sen, mitä korkokartta
    // näyttää, ja viimeinen päättyy koukkuun kartan noston aiheeseen:
    // maa jatkuu kuvan reunan ulkopuolella.
    intro: 'Ranska on Länsi-Euroopan suurin maa pinta-alaltaan ja yksi '
      + 'sen väkirikkaimmista. Se ulottuu Pohjanmereltä Välimerelle ja '
      + 'Alpeilta Atlantille.'
      + '\n\nKartalla maan muoto näkyy heti: pohjoisessa ja lännessä on '
      + 'laakeaa maata ja pitkiä rannikoita, idässä ja etelässä '
      + 'kohoavat vuoret. Alpit nousevat itärajalla, Pyreneet piirtävät '
      + 'etelärajan kuin muuri, ja keskellä kohoaa oma ylänkönsä, '
      + 'Massif Central. Kaukana Välimerellä on vielä vuorinen Korsika.'
      + '\n\nVuoden 1789 vallankumouksesta jäivät ajatukset '
      + 'kansalaisuudesta ja tasavallasta sekä tunnuslause vapaus, '
      + 'veljeys ja tasa-arvo, joka on yhä kirjoitettuna joka '
      + 'kunnantalon seinään. Valtio on perinteisesti keskitetty: '
      + 'Pariisi päättää paljon. Eikä Ranska lopu kartan reunaan — '
      + 'sillä on osia myös Etelä-Amerikassa, Karibialla ja Intian '
      + 'valtamerellä.',
    teksti: 'Ranskan vallankumous 1789 ja sen jälkeen syntyneet '
      + 'ajatukset — kansalaisuus, tasavalta, ihmisoikeuksien julistus — '
      + 'muuttivat koko Euroopan. Tunnuslause vapaus, veljeys ja tasa-'
      + 'arvo on yhä kirjoitettuna joka kunnantalon seinään. Valtio on '
      + 'perinteisesti keskitetty: Pariisi päättää paljon, ja se '
      + 'ärsyttää muuta maata säännöllisin väliajoin.\n\n'
      + 'Ranska oli 1900-luvun puoliväliin asti laaja siirtomaavalta '
      + 'Afrikassa ja Aasiassa. Sen jäljet näkyvät kielessä — ranska on '
      + 'virallinen kieli lähes kolmessakymmenessä maassa — ja siinä, '
      + 'keitä ranskalaiset nykyään ovat: iso osa väestöstä juontaa '
      + 'juurensa entisiin siirtomaihin.\n\n'
      + 'Ruoka ja maatalous ovat Ranskassa vakava asia. Maa on Euroopan '
      + 'suurin ruoantuottaja, ja juustoja on satoja lajeja — Charles de '
      + 'Gaullen kuuluisan kysymyksen mukaan on mahdotonta hallita maata, '
      + 'jossa on 246 juustoa. Sähköstä valtaosa tuotetaan ydinvoimalla, '
      + 'mikä on Euroopassa poikkeuksellista.',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026 (erä E2), sama linja kuin muissa erän
   * kaupungeissa: intro on nyt etusivun leipäteksti kappaleineen ja maltillisine
   * lihavointeineen. Faktat ovat Granadan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan
   * Granada; maakartat.js).
   */
  Granada: {
    intro: 'Granada on Etelä-Espanjassa Sierra Nevadan juurella noin '
      + '740 metrin korkeudessa, viidenkymmenen kilometrin päässä '
      + 'merestä. Kaupunki syntyi kohtaan, jossa vuorilta tuleva Darro '
      + 'yhtyy Geniliin, ja vuoret ovat sen vesisäiliö: huipuilla on '
      + 'lunta vielä toukokuussa, ja sulamisvesi johdettiin kanavia '
      + 'pitkin pelloille ja puutarhoihin.'
      + '\n\n'
      + 'Granada oli Iberian niemimaan viimeinen muslimivaltio. '
      + 'Nasridien emiirikunta säilyi vuoteen 1492, lähes 250 vuotta '
      + 'muita pidempään, ja sen hallitsijat rakensivat 1200- ja '
      + '1300-luvuilla **Alhambran**. Kun kaupunki luovutettiin '
      + 'Kastilian ja Aragonian hallitsijoille, palatsia ei purettu '
      + 'vaan siihen muutettiin. Vastapäisellä kukkulalla on '
      + '**Albaicín**, vanha maurilainen kaupunginosa, ja sen takana '
      + 'Sacromonten rinne, jonka luola-asunnoissa kehittyi zambra, '
      + 'oma flamencon muoto.'
      + '\n\n'
      + 'Nykyinen Granada on ennen kaikkea opiskelijakaupunki: '
      + 'yliopisto perustettiin 1531, ja opiskelijoita on yli 60 000. '
      + 'Pääkatu Gran Vía de Colón murrettiin vanhan kaupungin läpi '
      + 'vuosina 1895–1934, ja työ vaati viidesosan siitä. Baareissa '
      + 'juoman mukana tuodaan yhä tapas ilman lisämaksua.',
    teksti: 'Alhambra on kaupungin ja koko Espanjan tunnetuin '
      + 'rakennusryhmä: linnoitus, palatsi ja puutarhat samalla '
      + 'kukkulalla. Nasridi-hallitsijat rakensivat sen 1200–1300-'
      + 'luvuilla, ja sen kipsikoristelu, kaakelit ja vesialtaat ovat '
      + 'islamilaisen arkkitehtuurin kuuluisimpia. Kun kaupunki '
      + 'luovutettiin Kastilian ja Aragonian hallitsijoille, palatsia ei '
      + 'purettu vaan siihen muutettiin — siksi se on yhä pystyssä.\n\n'
      + 'Alhambran alapuolella laaksossa on Albaicín, vanha maurilainen '
      + 'kaupunginosa kapeine kujineen, ja sen takana Sacromonten rinne, '
      + 'jossa asuu romaniyhteisö. Sacromonten luola-asunnoissa '
      + 'kehittyi zambra, oma flamencon muoto, ja siellä sitä esitetään '
      + 'edelleen.\n\n'
      + 'Granada on myös yliopistokaupunki: opiskelijoita on kymmeniä '
      + 'tuhansia, ja se näkyy hinnoissa ja yöelämässä. Kaupungille '
      + 'ominainen tapa on tarjota juoman mukana ilmainen tapas — muualla '
      + 'Espanjassa harvinaista, ja granadalaisille kunnia-asia.',
  },
  /*
   * SEVILLA on Euroopan laudan uusi kaupunkilehti (23.8.2026). intro on
   * lehden ETUSIVUN LEIPÄTEKSTI (Raamattu 20.8.2026): kahdeksan
   * virkettä kolmessa kappaleessa ja kaksi maltillista lihavointia.
   * teksti on Lue lisää -kortin kolmikappaleinen versio. Kaikki luvut
   * on luettu en-Wikipedian raakateksteistä 23.8.2026 (artikkelit
   * "Seville", "Giralda", "Puente de Isabel II" ja "General Archive of
   * the Indies"), ja ne ovat samat kuin kulttuuri-kategoriat.js:n
   * sevilla-lohkossa.
   *
   * VISASPOILERIN VÄLTTÄMINEN (tarkistus-sevilla.md, osio 1): laudan
   * visa kysyy, mikä on katedraalin kellotorni, joka jäi jäljelle
   * vanhasta moskeijasta, ja mikä yksinoikeus Sevillalla oli Amerikan
   * löytymisen jälkeen. Nimi Giralda tulee tässä introssa esiin vain
   * tuuliviirin kautta ("Giraldillo, josta torni sai nykyisen nimensä
   * Giralda"), ja monopoli on kirjoitettu muotoon "siirtomaakauppa
   * kulki tämän jokisataman kautta". Kummankin kysymyksen vastaus on
   * yhä luettavissa lehdestä, kuten resepti vaatii, mutta ei visan
   * vastausvaihtoehdon sanamuodossa.
   */
  Bergen: {
    intro: 'Bergen on Norjan toiseksi suurin kaupunki ja Vestlandin '
             + 'hallintokeskus, ja se on rakennettu niemimaalle '
             + 'vuonojen ja vuorten väliin. Vuoret ympäröivät keskustaa '
             + 'joka suunnalta, ja siitä tulee lisänimi **seitsemän '
             + 'vuoren kaupunki**. Sadepäiviä kertyy noin kaksisataa '
             + 'vuodessa, sateisimpana joulukuu.'
             + '\n\n'
             + 'Perimätiedon mukaan kaupungin perusti kuningas Olav '
             + 'Kyrre vuonna 1070, ja Bergen oli Norjan pääkaupunki '
             + '1200-luvulla. Sataman itärannalla toimi 1300-luvun '
             + 'puolivälistä lähtien yksi Hansaliiton neljästä '
             + 'kontorista, ja tärkein vientitavara oli **kuivattu '
             + 'turska** pohjoisesta; vastineeksi sinne kulki viljaa '
             + 'Euroopasta. Kauppiaiden vanha laituri '
             + '**Bryggen** on ollut Unescon maailmanperintökohde '
             + 'vuodesta 1979.'
             + '\n\n'
             + 'Puinen kaupunki paloi lukuisia kertoja, pahimmin 1702. '
             + 'Isoisän matkan aikoihin Bergen ylitti vanhat rajansa: '
             + 'vuoden 1855 palon jäljille nousivat säännölliset '
             + 'korttelit, ja 1876 kaupunkiin liitettiin Nygård, '
             + 'Møhlenpris ja Sandviken. Samoihin vuosiin osuvat sen '
             + 'kaksi kuuluisinta muusikkoa: Ole Bull osti Lysøenin '
             + 'saaren 1872, ja Edvard Grieg sai 1874 Ibseniltä '
             + 'pyynnön säveltää Peer Gynt.',
    teksti: 'Bergen kasvoi Vågen-lahden ympärille. Perimätiedon mukaan '
              + 'kuningas Olav Kyrre perusti kaupungin vuonna 1070, ja se '
              + 'oli Norjan pääkaupunki 1200-luvulla. Bryggenin rantaan '
              + 'perustettiin noin 1350 Hansaliiton kontori, ja saksalaiset '
              + 'kauppiaat pitivät siellä omaa kaupunginosaansa, omaa '
              + 'kieltään ja omaa säännöstöään. Yksinoikeus Pohjois-Norjan '
              + 'kauppaan säilyi vuoteen 1789.\n\nPuinen kaupunki paloi yhä '
              + 'uudelleen: 1198, 1248, 1413, 1702, 1756, 1771, 1916 ja '
              + 'viimeksi 1955, jolloin osa Bryggeniä tuhoutui. Vuoden 1702 '
              + 'palon jälkeen tervatut hirsitalot vaihtuivat maalattuihin '
              + 'ja osin tiilipäällysteisiin puutaloihin, ja Bryggen '
              + 'rakennettiin uudelleen keskiaikaiseen tyyliin.\n\n'
              + '1800-luvun jälkipuolisko oli nopean kasvun aikaa. Vuoden '
              + '1855 palon jälkeen Torgallmenningenin länsipuoli '
              + 'rakennettiin säännöllisiksi kortteleiksi, ja 1876 '
              + 'kaupungin rajat siirrettiin niin, että Nygård, Møhlenpris '
              + 'ja Sandviken liitettiin mukaan. Samaan aikaan Bergenistä '
              + 'lähti maailmalle kaksi muusikkoa, Ole Bull ja Edvard '
              + 'Grieg.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  Sevilla: {
    intro: 'Sevilla on Andalusian pääkaupunki ja Espanjan viidenneksi '
      + 'suurin kaupunki: kunnassa asuu vajaat 687 000 ihmistä. Se on '
      + 'Guadalquivirin laaksossa keskimäärin seitsemän metriä '
      + 'merenpinnan yläpuolella, ja sen satama on Espanjan ainoa '
      + 'jokisatama: merelle on jokea 80 kilometriä.'
      + '\n\n'
      + 'Roomalaiset perustivat paikalle Hispaliksen, ja vuoden 711 '
      + 'jälkeen kaupunki tunnettiin nimellä Ishbiliya. Almohadien '
      + 'jäljiltä ovat kaupunginmuurit, Torre del Oro ja suurmoskeijan '
      + 'minareetti; **Kastilia valtasi kaupungin 1248** viidentoista '
      + 'kuukauden piirityksen jälkeen. Löytöretkien jälkeen '
      + 'siirtomaakauppa kulki tämän jokisataman kautta, ja Sevillasta '
      + 'kasvoi 1500-luvulla yksi Länsi-Euroopan suurimmista.'
      + '\n\n'
      + 'Vanhankaupungin ytimessä katedraali, Alcázar ja Intian arkisto '
      + 'muodostavat yhden Unescon maailmanperintökohteen. Katedraalin '
      + 'tornin huipulle nostettiin 1568 pyörivä pronssiveistos '
      + '**Giraldillo**, josta torni sai nykyisen nimensä Giralda. '
      + 'Sevilla on Manner-Euroopan lämpimin kaupunki, ja sinne on '
      + 'sijoitettu enemmän oopperoita kuin mihinkään muuhun Euroopan '
      + 'kaupunkiin — vuoden 2012 selvityksen mukaan 153.',
    teksti: 'Sevillan vanhakaupunki on kolmen valtakunnan kerrostuma. '
      + 'Roomalaisten Hispaliksen muurit rakennutti Julius Caesar, '
      + 'almohadit lisäsivät niihin 1221 vallihaudan ja toisen '
      + 'muurilinjan, ja kastilialaiset muuttivat moskeijat kirkoiksi '
      + 'vuoden 1248 jälkeen. Suurmoskeijan minareetti jäi paikoilleen ja '
      + 'sai 1500-luvulla renessanssitapulin päälleen.\n\n'
      + 'Amerikan-kaupan vuosisadat jättivät jälkeensä kauppakillan '
      + 'talon, johon Kaarle III perusti 1785 Intian arkiston. Sinne '
      + 'koottiin asiakirjat Espanjan Amerikan- ja '
      + 'Filippiinien-hallinnosta: yhdeksän kilometriä hyllyä ja noin 80 '
      + 'miljoonaa sivua. Kun joki mataloitui, kauppa siirtyi alavirtaan '
      + 'Cádiziin — laivastot 1680 ja kauppavirasto 1717.\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki oli juuri saanut ensimmäisen '
      + 'kiinteän siltansa: Trianan silta valmistui 1852 ja korvasi lähes '
      + 'seitsemän vuosisataa palvelleen venesillan. Tupakkatehtaassa '
      + 'työskenteli tuhansia naisia, katuja päällystettiin ja '
      + 'katuvalaistus laajeni, ja huhtikuun feria oli vasta '
      + 'neljännesvuosisadan ikäinen.',
  },
  Espanja: {
    // Muita pidempi tarkoituksella: Madridin lehden maaosasto nojaa
    // tähän yksin (sama malli kuin Italialla ja Egyptillä).
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä (omistajan toive 7.8.2026). Ensimmäinen kappale
    // selittää sen, mitä korkokartta näyttää — myös Kanariansaarten
    // laatikon kuvan oikeassa alakulmassa.
    intro: 'Espanja täyttää suurimman osan Iberian niemimaasta ja on '
      + 'Länsi-Euroopan toiseksi suurin maa. Se on myös Euroopan '
      + 'toiseksi vuoristoisin: keskellä kohoaa Meseta, kuiva '
      + 'ylätasanko, jonka reunoilla ilmasto vaihtuu vihreästä '
      + 'pohjoisrannikosta lähes aavikkoiseen kaakkoon. Kanariansaaret '
      + 'kuuluvat Espanjaan mutta sijaitsevat Afrikan edustalla, ja '
      + 'siellä on myös maan korkein vuori.'
      + '\n\nMaa on monikielinen — espanjan lisäksi katalaani, galego '
      + 'ja baski ovat virallisia omilla alueillaan — ja hallinto on '
      + 'jaettu seitsemääntoista itsehallintoalueeseen, joilla on omat '
      + 'parlamenttinsa ja koulukielensä.'
      + '\n\nArki poikkeaa muusta Euroopasta: lounas syödään kahden ja '
      + 'kolmen välillä, illallinen yhdeksän jälkeen, ja väliaika '
      + 'täytetään tapaksilla baaritiskillä seisten. Espanja on '
      + 'maailman suurin oliiviöljyn tuottaja ja toiseksi suosituin '
      + 'matkailumaa.',
    teksti: 'Espanjaa hallitsivat lähes 800 vuoden ajan osittain '
      + 'muslimivaltiot, ja se näkyy yhä kielessä, arkkitehtuurissa ja '
      + 'ruoassa: sanat kuten aceite (öljy) ja almohada (tyyny) ovat '
      + 'arabiasta. Vuonna 1492 viimeinen muslimivaltio Granada kaatui, '
      + 'ja samana vuonna Kolumbus purjehti Atlantin yli — Espanjasta '
      + 'tuli maailmanvalta, jonka jäljiltä espanja on nykyään '
      + 'äidinkieli lähes puolelle miljardille ihmiselle.\n\n'
      + 'Espanja oli diktatuuri vuoteen 1975, ja siirtymä demokratiaan '
      + 'tehtiin nopeasti ja sovinnollisesti. Nykyinen valtio on '
      + 'itsehallintoalueiden liitto: Katalonialla, Baskimaalla ja '
      + 'muilla alueilla on omat parlamenttinsa, poliisinsa ja '
      + 'koulukielensä. Alueiden ja keskusvallan suhde on maan '
      + 'kestoaihe.\n\n'
      + 'Arki poikkeaa muusta Euroopasta: lounas syödään kahden ja '
      + 'kolmen välillä, illallinen yhdeksän jälkeen, ja kaupungeissa '
      + 'ollaan ulkona myöhään. Espanja on myös maailman toiseksi '
      + 'suosituin matkailumaa ja Euroopan suurin oliiviöljyn tuottaja.',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E3 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro EI ole enää kahden virkkeen nosto vaan lehden ETUSIVUN
   * LEIPÄTEKSTI — 8–10 virkettä kolmessa kappaleessa ('\n\n') ja kaksi
   * maltillista **lihavointia**. Faktat ovat kaupungin omista, jo
   * tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
   * Matkailijan Krakova; maakartat.js), ei uusista lähteistä.
   * teksti-kenttä on ennallaan.
   */
  Krakova: {
    intro: 'Krakova on Etelä-Puolan vanha pääkaupunki Veikselin rannalla, '
      + 'kalkkikivikukkulan juurella. Kukkula on **Wawel**, ja sen '
      + 'katedraalissa kruunattiin ja haudattiin Puolan kuninkaat yli '
      + 'viidensadan vuoden ajan. Pääkaupunkina Krakova väistyi Varsovan '
      + 'tieltä vuonna 1596, mutta kruunajaiset jäivät tänne.'
      + '\n\n'
      + 'Mongolien hyökkäys poltti kaupungin vuonna 1241, ja se '
      + 'rakennettiin 1257 uudelleen kokonaan uudella kaavalla: '
      + 'suorakulmainen ruudukko, jonka keskellä on noin kaksisataa metriä '
      + 'sivultaan oleva tori. Kaupunginmuurit purettiin 1820-luvulla, ja '
      + 'tilalle istutettiin puistokehä Planty, joka kiertää '
      + 'vanhaakaupunkia yhä. Puolan vanhin yliopisto perustettiin täällä '
      + 'vuonna 1364, ja sen oppilaita oli muun muassa Nikolaus '
      + 'Kopernikus.'
      + '\n\n'
      + 'Sota ei tuhonnut Krakovaa, joten vanhankaupungin kadut ovat '
      + 'aitoja keskiaikaisia katuja. **Kazimierz**, 1300-luvulta '
      + '1800-luvun alkuun oma kaupunkinsa, oli vuosisatoja Puolan '
      + 'juutalaisen kulttuurin keskus; yhteisö tuhoutui holokaustissa, ja '
      + 'kortteleihin on sittemmin palannut elämää. Lähistöllä on kaksi '
      + 'maailmanperintökohdetta lisää, Wieliczkan suolakaivos ja '
      + 'Auschwitzin muistopaikka.',
    teksti: 'Kaupungin keskellä on Rynek Główny, Euroopan suurin '
      + 'keskiaikainen tori: noin kaksisataa metriä joka suuntaan. '
      + 'Torin keskellä seisoo Sukiennice, keskiaikainen kauppahalli, ja '
      + 'laidalla Marian kirkko, jonka tornista soitetaan joka tunti '
      + 'torvella hejnał — sävelmä, joka katkeaa aina kesken.\n\n'
      + 'Krakovan vanhakaupunki säilyi toisessa maailmansodassa lähes '
      + 'vaurioitta, toisin kuin Varsova, joka tuhottiin lähes '
      + 'kokonaan. Siksi Krakovassa kävellään oikeissa keskiaikaisissa '
      + 'kaduissa. Kaupungin Kazimierzin kaupunginosa oli vuosisatoja '
      + 'juutalaisen kulttuurin keskus Puolassa; yhteisö tuhoutui '
      + 'holokaustissa, ja korttelit ovat sittemmin heränneet uudelleen '
      + 'kahviloiksi, synagogiksi ja museoiksi.\n\n'
      + 'Lähellä on kaksi maailmanperintökohdetta lisää: Wieliczkan '
      + 'suolakaivos, jonka käytäviin on veistetty kappeleita ja '
      + 'kattokruunuja suolasta, sekä Auschwitzin muistopaikka. '
      + 'Krakovassa on myös Puolan vanhin yliopisto, perustettu 1364 — '
      + 'siellä opiskeli muun muassa Nikolaus Kopernikus.',
  },
  Puola: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa: tasanko,
    // kaksi jokea ja etelän vuorinauha.
    intro: 'Puola on Itämeren ja Karpaattien välinen tasankomaa Keski-'
      + 'Euroopassa. Se on väkiluvultaan EU:n viidenneksi suurin, ja '
      + 'sen talous on kasvanut nopeasti 1990-luvulta lähtien.'
      + '\n\nMaan nimi tarkoittaa kenttien maata, ja kartta selittää '
      + 'sen: valtaosa Puolasta on matalaa tasankoa, jonka halki '
      + 'virtaavat Veiksel ja Oder — molemmat etelästä Itämerelle. '
      + 'Pohjoisessa rannikko on hiekkaa ja järviä, etelässä maa nousee '
      + 'ensin Sudeettien ja sitten Karpaattien harjanteille, joilla '
      + 'Rysy kohoaa Tatravuorilla 2 499 metriin.'
      + '\n\nTasangolla ei ole vuoria suojana, ja se näkyy maan '
      + 'historiassa: rajat ovat siirtyneet ja linnoitukset '
      + 'rakennettiin jokien varsille. Suurin niistä seisoo yhä '
      + 'lähellä merta Veikselin sivuhaaran rannalla — Malborkin '
      + 'tiililinna, maailman suurin linna.',
    teksti: 'Puolan historia on rajojen historiaa. Maa oli 1500-luvulla '
      + 'Euroopan suurimpia valtioita, katosi sitten kartalta kokonaan '
      + 'yli sadaksi vuodeksi, kun naapurit jakoivat sen keskenään '
      + '1795, ja palasi itsenäiseksi 1918. Toisessa maailmansodassa '
      + 'Puola menetti suhteellisesti enemmän väestöään kuin mikään muu '
      + 'maa, ja sen rajat siirrettiin sodan jälkeen satoja kilometrejä '
      + 'länteen.\n\n'
      + 'Kommunistivalta päättyi Puolassa ensimmäisenä itäblokissa: '
      + 'Gdańskin telakalla syntynyt Solidaarisuus-ammattiliitto '
      + 'kymmenen miljoonan jäsenen voimin pakotti hallituksen vapaisiin '
      + 'vaaleihin 1989. Puolalainen paavi Johannes Paavali II oli '
      + 'liikkeelle tärkeä tuki.\n\n'
      + 'Nykypäivän Puola on EU:n ja Naton jäsen ja yksi Euroopan '
      + 'nopeimmin vaurastuneista maista. Katolinen kirkko on yhä '
      + 'vahva, mutta nuorten kaupunkilaisten ja maaseudun näkemykset '
      + 'eroavat toisistaan selvästi — se näkyy jokaisissa vaaleissa.',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro EI OLE ENÄÄ kahden lauseen nosto vaan lehden ETUSIVUN
   * LEIPÄTEKSTI — 7–10 virkkeen johdatus (~700–1100 mrk) kolmessa
   * kappaleessa ('\n\n') ja 1–3 maltillista **lihavointia**.
   * Renderöijä (piirraLeipateksti) tekee kappaleet ja boldit, joten
   * tänne ei kirjoiteta HTML:ää. Faktat ovat Sarajevon omista jo
   * tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
   * Matkailijan Sarajevo, nahtavyysjutut.js, maakartat.js, oma
   * teksti-kenttä alla). Sisältölinjaus (omistaja 20.8.2026):
   * 1990-luvun sota vain siinä laajuudessa kuin lehti sen jo kertoo,
   * neutraalisti ja ilman osapuolikehystä; painopiste on osmani- ja
   * itävaltalaiskaudessa. teksti on ennallaan.
   */
  Sarajevo: {
    intro: 'Sarajevo on Bosnia ja Hertsegovinan pääkaupunki kapeassa '
      + 'jokilaaksossa 518 metrin korkeudessa: pohjalla virtaa Miljacka, '
      + 'ympärillä kohoaa viisi vuorta. Osmanien käskynhaltija '
      + 'Isa-beg Ishaković rakennutti tänne 1460-luvulla basaarin, sillan '
      + 'ja majatalon, ja kaupungin nimi tulee turkin sanasta saray.'
      + '\n\n'
      + '**Baščaršijan** basaarissa oli parhaimmillaan tuhansia puoteja, '
      + 'ja jokaisella kujalla tehtiin omaa käsityötä. Sen laidalla '
      + 'seisovat Gazi Husrev-begin moskeija vuodelta 1531 ja '
      + 'Sahat-kulan kellotorni, jonka kello asetetaan yhä niin, että '
      + 'auringonlasku on kaksitoista. Vuonna 1878 alue siirtyi '
      + 'Itävalta-Unkarille, joka rakensi länsipuolen uuteen '
      + 'tyyliin; Ferhadija-kadun jalkakäytävään on merkitty kohta, '
      + 'jossa kaksi kaupunkia kohtaa.'
      + '\n\n'
      + '**Latinalaissillan** pohjoispäässä ammuttiin 28. kesäkuuta 1914 '
      + 'arkkiherttua Frans Ferdinand, ja siitä alkoi ketju kohti '
      + 'ensimmäistä maailmansotaa. Vuonna 1984 kaupunki isännöi '
      + 'talviolympialaisia, ja vuosina 1992–1996 se oli piiritettynä. '
      + 'Nyt Sarajevo on taas opiskelijoiden ja kahviloiden kaupunki, ja '
      + 'raitiotie vuodelta 1885 kulkee laakson läpi päästä päähän.',
    teksti: 'Kaupungin perusti ottomaanihallinto 1400-luvulla, ja '
      + 'basaarialue Baščaršija on siltä ajalta. Vuonna 1878 alue '
      + 'siirtyi Itävalta-Unkarille, joka rakensi kaupungin länsipuolen '
      + 'kokonaan uuteen tyyliin — siksi Sarajevossa voi ylittää '
      + 'vuosisatoja yhdellä askeleella. Jalkakäytävään on merkitty '
      + 'kohta, jossa kaksi maailmaa kohtaavat.\n\n'
      + 'Latinalaissillan kulmassa ammuttiin kesäkuussa 1914 Itävalta-'
      + 'Unkarin kruununprinssi Frans Ferdinand. Tapahtuma johti '
      + 'ensimmäisen maailmansodan syttymiseen. Vuonna 1984 Sarajevo '
      + 'isännöi talviolympialaisia, ja vuosina 1992–1996 kaupunki oli '
      + 'piiritettynä Bosnian sodassa — piiritys oli nykyaikaisen '
      + 'sodankäynnin pisin. Kadulle jääneitä kranaatinjälkiä on '
      + 'täytetty punaisella hartsilla; niitä kutsutaan Sarajevon '
      + 'ruusuiksi.\n\n'
      + 'Nykyään Sarajevo on jälleen opiskelija- ja kahvilakaupunki. '
      + 'Bosnialainen kahvi keitetään kuparipannussa ja juodaan '
      + 'hitaasti; se on täällä sosiaalinen tapahtuma eikä virvoke. '
      + 'Kaupungin elokuvafestivaali on Kaakkois-Euroopan suurin.',
  },
  'Bosnia ja Hertsegovina': {
    intro: 'Bosnia ja Hertsegovina on vuoristoinen maa Balkanin '
      + 'niemimaalla. Se on kooltaan noin kuudesosa Suomesta, ja '
      + 'väkeä on runsaat kolme miljoonaa.'
      + '\n\nKartta on lähes kokonaan poimuinen. Dinaarien Alpit '
      + 'täyttävät keskiosan ja etelän tiheänä harjanteiden ja '
      + 'kapeiden laaksojen ristikkona, joka kulkee luoteesta '
      + 'kaakkoon; korkein kohta on Maglić 2 386 metrissä aivan '
      + 'kaakkoiskulmassa. Pohjoisreuna erottuu selvästi vihreänä ja '
      + 'tasaisena kaistaleena — se on Pannonian tasangon eteläkulma, '
      + 'ja sen rajana kulkee Sava-joki.'
      + '\n\nEtelässä maasto avautuu Neretvan laaksoon, joka johtaa '
      + 'Mostarin kautta kohti merta. Kartalta näkee, että maa '
      + 'koskettaa Adriaa vain yhdestä pikkuruisesta kohdasta ja että '
      + 'kaikki edustan saaret kuuluvat Kroatialle. Kaakon vuoriin '
      + 'sen sijaan ei ole koskaan menty kirveen kanssa: siellä on '
      + 'yksi Euroopan viimeisistä aarniometsistä.',
    teksti: 'Maassa asuu kolme valtaväestöä: bosniakit, serbit ja '
      + 'kroaatit. He puhuvat samaa kieltä kolmella nimellä ja eroavat '
      + 'lähinnä uskonnollisen perinteen mukaan — bosniakit ovat '
      + 'perinteisesti muslimeja, serbit ortodokseja ja kroaatit '
      + 'katolisia. Vuosisatojen ajan he elivät samoissa kylissä ja '
      + 'kaupungeissa.\n\n'
      + 'Jugoslavian hajotessa 1990-luvun alussa maassa käytiin sota, '
      + 'joka päättyi vuoden 1995 Daytonin rauhansopimukseen. Sopimus '
      + 'rakensi hallinnon kolmen kansan varaan: maalla on kolme '
      + 'presidenttiä vuorotellen ja kaksi puoliksi itsenäistä osaa, '
      + 'Bosnia ja Hertsegovinan federaatio sekä Serbitasavalta. '
      + 'Järjestelmä lopetti sodan mutta tekee päätöksenteosta hidasta.\n\n'
      + 'Luonto on maan vahvuus: vuoristoa, koskia ja jokia, joissa '
      + 'melotaan ja kalastetaan. Mostarin kaupungissa on kuuluisa '
      + '1500-luvun kaarisilta, joka tuhoutui sodassa ja rakennettiin '
      + 'uudelleen samoista kivistä — siltä hypätään jokeen yhä '
      + 'perinteisessä kilpailussa joka kesä.',
  },

  Islanti: {
    intro: 'Islanti on tulivuorisaari Pohjois-Atlantilla, aivan '
      + 'napapiirin eteläpuolella. Asukkaita on noin 390 000 — vähemmän '
      + 'kuin Turussa ja Tampereella yhteensä — ja saari on Suomen '
      + 'kolmasosan kokoinen. Se istuu Keski-Atlantin harjanteella, '
      + 'jossa Pohjois-Amerikan ja Euraasian mannerlaatat erkanevat '
      + 'toisistaan, ja siksi saarella on toistasataa tulivuorta ja '
      + 'kuumia lähteitä.'
      + '\n\nKorkokartalla vihreä on vain kapea kehä rantojen '
      + 'tuntumassa, ja juuri siellä ihmiset asuvat. Keskusta on '
      + 'ruskeaa ylänköä, jossa ei ole kyliä lainkaan, ja sen päällä '
      + 'hohtaa valkoisia läiskiä — jäätiköitä. Suurin niistä on '
      + 'kaakon Vatnajökull, joka peittää noin kahdeksan prosenttia '
      + 'maasta ja on paksuimmillaan lähes tuhat metriä.'
      + '\n\nÞingvellirin rotkossa kokoontui Alþingi jo vuonna 930, ja '
      + 'maanalainen lämpö lämmittää yhä lähes kaikki talot. Jäätiköt '
      + 'eivät kuitenkaan pysy paikoillaan: Vatnajökullin '
      + 'eteläreunassa on järvi, jota ei sata vuotta sitten ollut '
      + 'olemassa lainkaan.',
    teksti: 'Saari sijaitsee Keski-Atlantin harjanteella, jossa '
      + 'Pohjois-Amerikan ja Euraasian mannerlaatat erkanevat '
      + 'toisistaan. Siksi Islannissa on toistasataa tulivuorta, '
      + 'kuumia lähteitä ja geysirejä — sana geysir on islantia. '
      + 'Maanalainen lämpö lämmittää lähes kaikki talot, ja sähkö '
      + 'tuotetaan vesivoimalla ja maalämmöllä.\n\n'
      + 'Þingvellirin rotkossa kokoontui Alþingi jo vuonna 930: se on '
      + 'maailman vanhin yhä toimiva parlamentti. Islannin kieli on '
      + 'muuttunut niin vähän, että keskiaikaisia saagoja voi lukea '
      + 'alkukielellä ilman käännöstä. Uusille asioille keksitään omat '
      + 'sanat lainaamisen sijaan.\n\n'
      + 'Kalastus oli vuosisatoja saaren elinkeino, ja kuivattu turska '
      + 'sen vientitavara. Nykyään suurimmat tulonlähteet ovat '
      + 'matkailu, kalastus ja energia. Islannissa ei ole armeijaa '
      + 'lainkaan, ja väkilukuun suhteutettuna maa julkaisee enemmän '
      + 'kirjoja kuin juuri mikään muu.',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026 (erä E2), sama linja kuin muissa erän
   * kaupungeissa: intro on nyt etusivun leipäteksti kappaleineen ja maltillisine
   * lihavointeineen. Faktat ovat Ateenan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan Ateena;
   * maakartat.js).
   */
  Ateena: {
    intro: 'Ateena on Euroopan vanhimpia yhtäjaksoisesti asuttuja '
      + 'kaupunkeja: samalla paikalla on eletty yli kolmetuhatta '
      + 'vuotta. Kaupunki syntyi kallion ympärille — **Akropolis** '
      + 'kohoaa noin 90 metriä ympäröivän tasangon yli, ja sen laella '
      + 'seisoo Parthenon, joka valmistui vuonna 432 eaa. Meri jäi '
      + 'kauas: Pireuksen satama on kahdeksan kilometriä lounaaseen, '
      + 'eikä keskustan läpi virtaa jokea.'
      + '\n\n'
      + 'Antiikin Ateenassa kehitettiin **demokratia**, kirjoitettiin '
      + 'ensimmäiset näytelmät ja perustettiin filosofian koulut. '
      + 'Sitten kaupunki hiipui roomalaisten, bysanttilaisten ja '
      + 'ottomaanien vallan alla, ja Parthenonista tehtiin vuorollaan '
      + 'kirkko, moskeija ja ruutivarasto, joka räjähti vuonna 1687.'
      + '\n\n'
      + 'Kun Ateenasta tuli Kreikan pääkaupunki vuonna 1834, se oli '
      + 'noin neljänsadan talon kylä Akropoliin juurella, ja valinta '
      + 'tehtiin historian eikä koon perusteella. Nykyään seudulla '
      + 'asuu noin kolme ja puoli miljoonaa ihmistä. Metrotunneleita '
      + 'kaivettaessa arkeologit kulkivat insinöörien rinnalla kuusi '
      + 'vuotta, ja löydöt ovat esillä asemien seinillä. Kesä on '
      + 'Manner-Euroopan kuumimpia, ja sade osuu talveen.',
    teksti: 'Antiikin Ateenassa keksittiin demokratia. Se ei ollut '
      + 'nykyisen kaltainen: äänioikeus oli vain vapailla ateenalaisilla '
      + 'miehillä, eli noin kymmenesosalla asukkaista. Mutta idea oli '
      + 'uusi ja mullistava — kaupunkia johdettiin keskustelemalla, ja '
      + 'päätökset tehtiin kansankokouksessa kukkulan rinteellä.\n\n'
      + 'Samaan aikaan kaupungissa kirjoitettiin ensimmäiset näytelmät, '
      + 'perustettiin filosofian koulut ja opeteltiin kysymään ”miksi”. '
      + 'Sokrates käveli torilla ja kyseli ohikulkijoilta niin '
      + 'hankalia kysymyksiä, että hänet lopulta tuomittiin kuolemaan.\n\n'
      + 'Sitten kaupunki hiipui. Roomalaiset, bysanttilaiset ja '
      + 'ottomaanit hallitsivat vuorollaan, ja Parthenonista tehtiin '
      + 'ensin kirkko, sitten moskeija ja lopulta ruutivarasto — joka '
      + 'räjähti 1687 venetsialaisen tykinkuulan osuttua. Siitä on '
      + 'peräisin temppelin nykyinen aukko.\n\n'
      + 'Kun Kreikka itsenäistyi 1830-luvulla, Ateena oli kutistunut '
      + 'muutaman tuhannen asukkaan kyläksi. Se valittiin silti '
      + 'pääkaupungiksi historiansa takia. Nykyään seudulla asuu noin '
      + 'kolme ja puoli miljoonaa ihmistä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, erä E8 (Raamattu "TEKSTIEN PAINOPISTE",
   * Fablen eräohje): intro on nyt lehden ETUSIVUN LEIPÄTEKSTI —
   * 7–10 virkettä kappaleissa ('\n\n') ja maltillinen **lihavointi**.
   * Faktat Kreetan omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Kreeta) sekä alla
   * olevasta teksti-kentästä; teksti-kenttä on ennallaan.
   */
  Kreeta: {
    intro: 'Kreeta on Kreikan suurin saari ja Välimeren viidenneksi '
      + 'suurin: 8 450 neliökilometriä ja 260 kilometriä idästä '
      + 'länteen, mutta pohjois–eteläsuunnassa kapea. Rantaviivaa on '
      + 'runsaat tuhat kilometriä, ja selkärankana kulkee kuusi '
      + 'vuoristoryhmää, joiden korkein huippu yltää lähes 2 500 '
      + 'metriin. Asukkaita on yli 600 000 — enemmän kuin millään '
      + 'muulla Kreikan saarella.'
      + '\n\n'
      + 'Pohjoisrannalla Knossoksessa kukoisti neljätuhatta vuotta '
      + 'sitten **minolainen kulttuuri**, Euroopan vanhin '
      + 'kaupunkikulttuuri. Se rakensi palatseja, joissa oli '
      + 'valokuiluja, juokseva vesi ja viemärit, ja kirjoitti '
      + 'kahdella merkistöllä, joista toista ei ole vieläkään pystytty '
      + 'lukemaan. Kulttuuri katosi noin 1450 eaa., ehkä Santorinin '
      + 'purkauksen ja sen tsunamien jäljiltä.'
      + '\n\n'
      + 'Sen jälkeen saari on ollut vuorollaan roomalaisten, '
      + 'bysanttilaisten, venetsialaisten ja ottomaanien hallussa, ja '
      + 'Kreikkaan se liittyi vasta **vuonna 1913**. Nykyään saari '
      + 'elää maataloudesta ja matkailusta: oliivipuita on kymmeniä '
      + 'miljoonia, ja Kreetan ruokatavoista tuli 1950-luvun '
      + 'tutkimusten myötä koko Välimeren ruokavalion malli. Kesä on '
      + 'käytännössä sateeton.',
    teksti: 'Minolaiset rakensivat palatseja, joissa oli monikerroksisia '
      + 'siipiä, valokuiluja, juokseva vesi ja viemärit. He kirjoittivat '
      + 'kahdella kirjoitusjärjestelmällä, joista toista — lineaari '
      + 'A:ta — ei ole vieläkään pystytty lukemaan. Kulttuuri katosi '
      + 'noin 1450 eaa., ehkä Santorinin tulivuorenpurkauksen ja sitä '
      + 'seuranneiden tsunamien takia.\n\n'
      + 'Kreikkalainen taru kertoo Kreetan kuninkaasta Minoksesta, joka '
      + 'rakennutti labyrintin puoliksi härkänä olevalle Minotaurokselle. '
      + 'Kun Arthur Evans kaivoi Knossoksen esiin 1900-luvun alussa, hän '
      + 'nimesi kulttuurin tarun mukaan minolaiseksi — ja palatsin '
      + 'sokkeloiset käytävät saivat monen uskomaan, että labyrintti oli '
      + 'juuri se.\n\n'
      + 'Kreeta on ollut vuorollaan roomalaisten, bysanttilaisten, '
      + 'venetsialaisten ja ottomaanien hallussa, ja liittyi Kreikkaan '
      + 'vasta 1913. Saari elää maataloudesta ja matkailusta: oliiveja, '
      + 'viiniä ja vuohia. Kreetalainen ruokavalio — oliiviöljyä, '
      + 'vihanneksia, kalaa ja vähän lihaa — on tutkimuksissa yhdistetty '
      + 'poikkeuksellisen pitkään elinikään.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, erä E8: intro on lehden etusivun
   * leipäteksti (kappaleet '\n\n', maltillinen **lihavointi**).
   * Faktat Sisilian omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot, Matkailijan Sisilia ja
   * Rauniot-kategoria) sekä teksti-kentästä, joka on ennallaan.
   */
  Sisilia: {
    intro: 'Sisilia on Välimeren suurin saari, lähes 26 000 '
      + 'neliökilometriä, ja muodoltaan kolmio — siitä juontuu sen '
      + 'antiikin nimi Trinacria. Mantereelle on Messinansalmen yli '
      + 'kapeimmillaan vain kolme kilometriä, mutta siltaa ei '
      + 'vieläkään ole: junat ajetaan yhä vaunuittain lautan kannelle. '
      + 'Saaren yllä kohoaa **Etna**, Euroopan korkein aktiivinen '
      + 'tulivuori, yli 3 300 metriä.'
      + '\n\n'
      + 'Sisilia on ollut kaikkien maa. Foinikialaiset ja '
      + 'kreikkalaiset perustivat sinne siirtokuntia, roomalaiset '
      + 'tekivät siitä valtakunnan viljavaraston, arabit toivat '
      + 'sitrushedelmät ja sokeriruo’on, ja normannit rakensivat '
      + 'kirkkoja, joissa on arabialaisia kupoleita ja bysanttilaisia '
      + 'mosaiikkeja. Jokainen valloittaja jätti jälkensä myös kieleen '
      + 'ja ruokaan.'
      + '\n\n'
      + 'Kivessä se näkyy yhä: **Agrigenton temppelilaakso** on '
      + 'kreikkalaisten temppelirivi meren yllä, Piazza Armerinan '
      + 'roomalaishuvilassa on 3 500 neliömetriä mosaiikkia, ja '
      + 'Syrakusan kallioon hakatussa teatterissa esitetään antiikin '
      + 'tragedioita joka kevät. Etna purkautuu lähes joka vuosi, '
      + 'mutta laava valuu useimmiten hitaasti, ja tuhka tekee '
      + 'maaperästä poikkeuksellisen hedelmällistä.',
    teksti: 'Sisilia on ollut kaikkien maa. Foinikialaiset ja '
      + 'kreikkalaiset perustivat sinne siirtokuntia, roomalaiset tekivät '
      + 'siitä valtakunnan viljavaraston, arabit toivat sitrushedelmät, '
      + 'riisin ja sokeriruo’on, ja normannit rakensivat kirkkoja, '
      + 'joissa on arabialaisia kupoleita ja bysanttilaisia mosaiikkeja '
      + 'samassa rakennuksessa.\n\n'
      + 'Jokainen valloittaja jätti jälkensä kieleen, ruokaan ja '
      + 'kaupunkeihin. Palermon kadunnimissä on arabiaa, Agrigenton '
      + 'temppelit ovat kreikkalaisia, ja Monrealen katedraali on '
      + 'normannien tilaama mutta bysanttilaisten mestareiden '
      + 'koristelema.\n\n'
      + 'Etna purkautuu lähes joka vuosi. Purkaukset ovat useimmiten '
      + 'rauhallisia — laava valuu hitaasti eikä yleensä uhkaa kyliä — '
      + 'ja tuhka tekee maaperästä poikkeuksellisen hedelmällistä. Siksi '
      + 'vuoren rinteillä kasvaa viiniä, sitruunoita ja pistaasia aivan '
      + 'kraaterin läheisyydessä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, erä E1 (Raamatun "TEKSTIEN PAINOPISTE" ja
   * Fablen eräohje; sama linja kuin Medinassa ja Mekassa
   * asia-artikkelit.js:ssä): intro EI ole enää kahden virkkeen nosto vaan
   * lehden etusivun leipäteksti — 7–10 virkettä kolmessa kappaleessa
   * ('\n\n'), maltillinen **lihavointi** avainkohdissa. Faktat ovat
   * kaupungin omista jo tarkistetuista teksteistä (kulttuuri-kategoriat.js:
   * nostot ja Matkailijan Rooma; maakartat.js) sekä alla olevasta
   * teksti-kentästä, ei uusista lähteistä. teksti-kenttä on ennallaan.
   */
  Rooma: {
    intro: 'Rooma on Italian pääkaupunki seitsemällä kukkulalla Tiber-joen '
      + 'varrella, noin 25 kilometriä merestä ylävirtaan. Tarun mukaan sen '
      + 'perustivat susiemon kasvattamat veljekset Romulus ja Remus vuonna '
      + '753 eaa.; todellisuudessa kaupunki kasvoi kukkuloiden kylistä. Se '
      + 'oli ensin kuningaskunta, sitten tasavalta ja lopulta keisarikunta, '
      + 'jonka raja ulottui Skotlannista Egyptiin.'
      + '\n\n'
      + 'Roomalaiset olivat ennen kaikkea insinöörejä: he vetivät teitä, '
      + 'siltoja ja viemäreitä sekä yksitoista akveduktia, jotka toivat '
      + 'vuorilta vettä painovoimalla. Yksi niistä syöttää yhä **Trevin '
      + 'suihkulähdettä**. He keksivät myös betonin, joka kovettuu veden '
      + 'alla: **Pantheonin** kupoli on yhä maailman suurin raudoittamaton '
      + 'betonikupoli.'
      + '\n\n'
      + 'Valtakunnan hajottua kaupunki kutistui: 1300-luvulla siellä asui '
      + 'noin 20 000 ihmistä, ja karja laidunsi Forumilla. Paavit rakensivat '
      + 'sen uudelleen, ja renessanssin ja barokin aikana syntyivät '
      + 'Pietarinkirkko, Trevin lähde ja Espanjalaiset portaat. Yhdistyneen '
      + 'Italian pääkaupungiksi Rooma tuli vasta 1871, ja sen sisällä on '
      + 'maailman pienin valtio Vatikaani, pinta-alaltaan puoli '
      + 'neliökilometriä.',
    teksti: 'Tarun mukaan Rooma perustettiin 753 eaa., ja sen perustivat '
      + 'susiemon kasvattamat veljekset Romulus ja Remus. Todellisuudessa '
      + 'kaupunki kasvoi vähitellen kukkuloiden kylistä. Se oli ensin '
      + 'kuningaskunta, sitten tasavalta ja lopulta keisarikunta, jonka '
      + 'raja ulottui Skotlannista Egyptiin.\n\n'
      + 'Roomalaiset olivat ennen kaikkea insinöörejä. He rakensivat '
      + 'teitä, siltoja, akvedukteja ja viemäreitä, joista osa on yhä '
      + 'käytössä. He keksivät betonin, joka kovettuu myös veden alla — '
      + 'Pantheonin betonikupoli on maailman suurin raudoittamaton kupoli '
      + 'yhä tänään, lähes 1 900 vuotta valmistumisensa jälkeen.\n\n'
      + 'Valtakunnan hajottua Rooma kutistui: 1300-luvulla kaupungissa '
      + 'asui vain noin 20 000 ihmistä, ja karja laidunsi Forumilla. '
      + 'Paavit rakensivat sen uudelleen, ja renessanssin ja barokin '
      + 'aikana syntyivät Pietarinkirkko, Trevin lähde ja Espanjalaiset '
      + 'portaat.\n\n'
      + 'Roomasta tuli yhdistyneen Italian pääkaupunki vasta 1871 — '
      + 'kymmenen vuotta valtion syntymisen jälkeen ja juuri ennen '
      + 'isoisän matkaa. Kaupungin sisällä on oma valtionsa, Vatikaani, '
      + 'joka on maailman pienin: pinta-alaltaan puoli neliökilometriä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  // TEKSTIREMONTTI 20.8.2026, ERÄ E7: intro on nyt etusivun leipäteksti
  // (ks. Venetsian lohkokommentti yllä). Faktat Firenzen omista jo
  // tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
  // Matkailijan Firenze, nahtavyysjutut.js, maakartat.js, oma
  // teksti-kenttä alla) sekä en-Wikipedian Florence-artikkelista
  // (maailmanperintövuosi 1982). teksti on ennallaan.
  Firenze: {
    intro: 'Firenze on Toscanan pääkaupunki Arno-joen varrella, ja siellä '
      + 'asuu noin 360 000 ihmistä. Vanhakaupunki on pieni: reunasta '
      + 'reunaan on noin kaksi kilometriä, ja kaikki tärkeä on '
      + 'kävelymatkan päässä. Roomalaiset perustivat paikalle '
      + 'varuskuntakaupungin vuonna 59 eaa., ja sen ruutukaava erottuu '
      + 'vanhankaupungin katuverkossa yhä.'
      + '\n\n'
      + 'Keskiajalla Firenze rikastui villakankaasta ja pankeista, ja '
      + 'vuodesta 1252 se löi omaa kultarahaansa floriinia, johon '
      + 'luotettiin kaikkialla Euroopassa. Rahan takana olleista '
      + 'suvuista mahtavimmaksi nousi Medici, joka osti valtansa '
      + 'kaupalla ja tilaustöillä. Juuri täällä syntyi se, mitä '
      + 'myöhemmin alettiin kutsua **renessanssiksi**: taiteen ja '
      + 'tieteen suunnanmuutos, jonka tekijöitä Medicit palkkasivat '
      + 'Donatellosta Michelangeloon.'
      + '\n\n'
      + 'Tuomiokirkon **kupoli** valmistui 1436, eikä tiilistä ole sen '
      + 'jälkeen muurattu suurempaa. Firenzeläinen Dante Alighieri '
      + 'kirjoitti pääteoksensa oman kaupunkinsa puhekielellä, ja siitä '
      + 'kehittyi italian kirjakieli. Kaupunki oli lyhyen aikaa myös '
      + 'Italian pääkaupunki, vuosina 1865–1871, ja sen historiallinen '
      + 'keskusta on kuulunut Unescon maailmanperintöön vuodesta 1982.',
    teksti: 'Firenze perustettiin roomalaisten sotilaskaupungiksi vuonna 59 '
      + 'eaa., ja sen suorakulmainen ruutukaava näkyy keskustan kaduissa '
      + 'yhä. Keskiajalla kaupunki rikastui villakankaasta ja pankeista. '
      + 'Vuonna 1252 se alkoi lyödä omaa kultarahaa, floriinia, ja siitä '
      + 'tuli niin luotettu, että sillä maksettiin velkoja ympäri '
      + 'Eurooppaa. Rahan takana olivat pankkiirisuvut, joista '
      + 'mahtavimmaksi nousi Medici.\n\n'
      + 'Medicit eivät olleet ruhtinaita vaan kauppiaita, ja he ostivat '
      + 'valtansa rahalla ja taiteella. He tilasivat töitä Donatellolta, '
      + 'Botticellilta, Leonardolta ja Michelangelolta, ja heidän '
      + 'kaupungissaan syntyi se, mitä nykyään kutsutaan renessanssiksi: '
      + 'ajatus siitä, että ihminen ja hänen mittansa kuuluvat taiteen ja '
      + 'tieteen keskiöön. Filippo Brunelleschi muurasi tuomiokirkkoon '
      + 'kupolin, jota kukaan ei ollut osannut rakentaa sadan vuoden '
      + 'aikana — se valmistui 1436 ja on yhä maailman suurin tiilikupoli.'
      + '\n\nFirenzeläinen Dante Alighieri kirjoitti Jumalaisen näytelmän '
      + 'latinan sijaan oman kaupunkinsa puhekielellä, ja siitä kehittyi '
      + 'nykyinen italian kirjakieli. Firenzestä on siis lähtöisin sekä '
      + 'maan kieli että sen taide — ja lyhyen aikaa myös sen hallitus: '
      + 'kaupunki oli Italian pääkaupunki vuosina 1865–1871, kunnes '
      + 'hallitus muutti Roomaan. Noiden kuuden vuoden aikana kaupungin '
      + 'muurit purettiin ja niiden tilalle rakennettiin leveät kehäkadut.'
      + '\n\nArno on antanut kaupungille kaupan ja vienyt siltä paljon. '
      + '4. marraskuuta 1966 joki tulvi yli äyräiden, vesi nousi '
      + 'keskustassa paikoin yli neljän metrin ja liejua jäi kirjastoihin '
      + 'ja kirkkoihin. Tuhansia teoksia pelastivat nuoret vapaaehtoiset, '
      + 'joita alettiin kutsua nimellä angeli del fango, mudan enkelit. '
      + 'Osaa kirjoista kunnostetaan yhä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, erä E8: intro on lehden etusivun
   * leipäteksti (kappaleet '\n\n', maltillinen **lihavointi**).
   * Faktat Dubrovnikin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot, Matkailijan Dubrovnik ja
   * Tasavalta-kategoria; maakartat.js) sekä teksti-kentästä, joka on
   * ennallaan. Vuosien 1991–1992 piiritys jää introsta pois: se on
   * kerrottu jo oppaassa ja teksti-kentässä.
   */
  Dubrovnik: {
    intro: 'Dubrovnik on muurien ympäröimä satamakaupunki Kroatian '
      + 'eteläkärjessä Adrianmeren rannalla. Vanhakaupunki on vain '
      + 'noin viisisataa metriä pitkä ja kolmesataa leveä, ja sen '
      + 'ympäri kiertää kivimuuri, joka on paikoin kuusi metriä paksu '
      + 'ja kaksikymmentäviisi korkea. Muurit ovat kaupungin tunnetuin '
      + 'kohde: niillä kävelee vuodessa 1,2 miljoonaa ihmistä, kun '
      + 'kunnassa asuu noin 42 000.'
      + '\n\n'
      + 'Satojen vuosien ajan kaupunki oli oma valtionsa, **Ragusan '
      + 'tasavalta**, omine lakeineen ja laivastoineen. Se selvisi '
      + 'isompien naapureiden välissä sopimalla eikä sotimalla: veroa '
      + 'maksettiin sekä Venetsialle että sulttaanille. Rikkaus tuli '
      + 'suolasta ja merenkulusta, ja tasavalta oli edellä aikaansa: '
      + 'Euroopan vanhin yhä toimiva apteekki avattiin '
      + 'täällä 1317, orjakauppa kiellettiin 1416 ja '
      + 'kulkutautialueilta saapuvat määrättiin karanteeniin jo 1377.'
      + '\n\n'
      + 'Vuoden **1667 maanjäristys** tuhosi suuren osan kaupungista, '
      + 'ja se rakennettiin uudelleen kivestä yhtenä kokonaisuutena — '
      + 'siksi talot ovat samannäköisiä: samaa kiveä, samat '
      + 'kattotiilet, sama korkeus. Vanhakaupunki on ollut Unescon '
      + 'maailmanperintökohde vuodesta 1979.',
    teksti: 'Kaupunki tunnettiin vuosisatoja nimellä Ragusa, ja se oli '
      + 'oma itsenäinen tasavaltansa 1300-luvulta vuoteen 1808. Se pysyi '
      + 'hengissä kaupalla ja diplomatialla: Ragusa maksoi veroa milloin '
      + 'ottomaaneille, milloin Unkarille, ja piti välit kunnossa '
      + 'kaikkiin suuntiin. Sen laivasto oli aikanaan Välimeren '
      + 'kolmanneksi suurin.\n\n'
      + 'Tasavalta oli edellä aikaansa. Se perusti Euroopan vanhimman yhä '
      + 'toimivan apteekin 1317, avasi orpokodin 1432 ja kielsi '
      + 'orjakaupan jo 1416 — satoja vuosia ennen useimpia muita. '
      + 'Kaupungissa oli myös karanteenijärjestelmä ruttoa vastaan: '
      + 'saapujat eristettiin 40 päiväksi, ja sanamme karanteeni tulee '
      + 'juuri siitä luvusta.\n\n'
      + 'Vuoden 1667 maanjäristys tuhosi suuren osan kaupungista, ja se '
      + 'rakennettiin uudelleen yhtenäiseen barokkityyliin — siksi '
      + 'vanhakaupunki näyttää yhdestä palasta tehdyltä. Vuosien '
      + '1991–1992 piirityksessä kaupunkia pommitettiin, mutta se on '
      + 'sittemmin korjattu; kirkkaan oranssit kattotiilet ovat uusia.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on lehden ETUSIVUN LEIPÄTEKSTI — 7–10 virkkeen johdatus
   * (~700–1100 mrk) kolmessa kappaleessa ('\n\n') ja 1–3 maltillista
   * **lihavointia**; renderöijä tekee kappaleet ja boldit, joten HTML:ää
   * ei kirjoiteta tänne. Faktat ovat Sofian omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan Sofia,
   * nahtavyysjutut.js, maakartat.js, oma teksti-kenttä alla).
   * teksti on ennallaan.
   */
  Sofia: {
    intro: 'Sofia on Bulgarian pääkaupunki ja yksi Euroopan vanhimmista '
      + 'kaupungeista: paikalla on asuttu yli 7 000 vuotta. Se on '
      + 'laaksossa noin 550 metrin korkeudessa, ja etelässä kohoaa '
      + 'Vitosha-vuori 2 292 metriin; sen rinteet rauhoitettiin '
      + 'luonnonpuistoksi jo 1934, ensimmäisenä Balkanilla. Kaupunki '
      + 'syntyi veden takia: maan alla on 49 kivennäis- ja '
      + 'lämpölähdettä, ja roomalaiset rakensivat niiden ympärille '
      + '**Serdican**, josta keisari Konstantinus Suuren kerrotaan '
      + 'sanoneen, että se on hänen Roomansa.'
      + '\n\n'
      + 'Metroa kaivettaessa 2010-luvun alussa maasta paljastui '
      + 'kokonainen roomalainen kortteli, eikä löytöjä peitetty '
      + 'takaisin. Kaupungin vanhin rakennus on Pyhän Yrjön punatiilinen '
      + 'rotunda 300-luvulta, ja muutaman sadan metrin säteellä seisovat '
      + 'ortodoksikirkko, katolinen katedraali, moskeija ja '
      + 'Kaakkois-Euroopan suurin synagoga.'
      + '\n\n'
      + 'Osmanien vallan alla Sofia oli lähes viisi vuosisataa, ja '
      + '**pääkaupungiksi** se valittiin vasta 1879, kun asukkaita oli '
      + 'reilut yksitoistatuhatta; nyt heitä on lähes 1,3 miljoonaa. '
      + 'Keskustan pääväylillä on yhä kellertävää keraamista katukiveä '
      + 'vuosilta 1907–1908.',
    teksti: 'Roomalaiset perustivat tänne kaupungin nimeltä Serdica '
      + 'kuumien lähteiden takia. Keisari Konstantinus Suuri viihtyi '
      + 'siellä niin hyvin, että sanoi: ”Serdica on minun Roomani.” '
      + 'Metroa rakennettaessa 2010-luvulla kaivettiin esiin kokonainen '
      + 'roomalainen katu, joka jätettiin näkyviin lasin alle keskelle '
      + 'kaupunkia.\n\n'
      + 'Sofian erikoisuus on uskontojen läheisyys. Yhden korttelin '
      + 'matkalla ovat ortodoksinen kirkko, katolinen katedraali, '
      + 'moskeija ja Balkanin suurin synagoga. Paikalliset kutsuvat '
      + 'aluetta suvaitsevaisuuden neliöksi.\n\n'
      + 'Kaupunki oli ottomaanien hallussa lähes viisi vuosisataa. '
      + 'Bulgaria itsenäistyi 1878, ja Sofiasta tehtiin pääkaupunki '
      + 'seuraavana vuonna — juuri isoisän matkan jälkeen. Silloin siellä '
      + 'asui noin 20 000 ihmistä; nykyään yli miljoona.\n\n'
      + 'Bulgarialaiset nyökkäävät päätään kieltäessään ja pudistavat '
      + 'myöntäessään — päinvastoin kuin useimmat muut. Tapa hämmentää '
      + 'matkailijoita yhä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Kreikka: {
    intro: 'Kreikka on vuoristoinen maa Balkanin niemimaan eteläkärjessä. '
      + 'Sillä on yli 6 000 saarta, joista vain parisataa on asuttuja, ja '
      + 'rannikkoa on enemmän kuin useimmilla paljon suuremmilla mailla.'
      + '\n\nKartalla maa näyttää repeytyneeltä. Pohjoisesta etelään kulkee '
      + 'Píndos-vuoristo, joka jakaa mantereen kahtia ja jatkuu '
      + 'Peloponnesoksen halki; sen jälkeen se sukeltaa mereen ja nousee '
      + 'taas saarina, kunnes Kreeta sulkee Egeanmeren etelästä. Tasaista '
      + 'maata on vähän: Thessalian lakeus vuoriston itäpuolella ja kapeat '
      + 'rannikkokaistaleet.'
      + '\n\nKreikka oli ottomaanien vallan alla lähes neljäsataa vuotta ja '
      + 'itsenäistyi vaiheittain vuodesta 1821 — nuori valtio, jolla on '
      + 'hyvin vanha historia. Se elää merestä: kreikkalaiset omistavat '
      + 'maailman suurimman kauppalaivaston. Vuorilla on omat aarteensa: '
      + 'Thessalian laidalla kohoaa joukko kalliopylväitä, joiden laelle '
      + 'rakennettiin luostareita, joihin ei päässyt kuin nostokorissa.',
    teksti: 'Antiikin Kreikka ei ollut yksi valtio vaan satoja '
      + 'kaupunkivaltioita, jotka kilpailivat ja sotivat keskenään mutta '
      + 'puhuivat samaa kieltä ja palvoivat samoja jumalia. Neljän vuoden '
      + 'välein ne pitivät aselevon ja kokoontuivat Olympiaan kisoihin — '
      + 'siitä ovat nykyiset olympialaiset peräisin.\n\n'
      + 'Kreikan kieltä on kirjoitettu yhtäjaksoisesti kolme tuhatta '
      + 'vuotta, pidempään kuin mitään muuta elävää eurooppalaista '
      + 'kieltä. Sen aakkosista kehittyivät sekä latinalaiset että '
      + 'kyrilliset kirjaimet, ja tieteen sanastossa kreikka näkyy yhä: '
      + 'biologia, demokratia ja fysiikka ovat kreikkaa.\n\n'
      + 'Kreikka oli ottomaanien vallan alla lähes neljäsataa vuotta ja '
      + 'itsenäistyi vaiheittain vuodesta 1821 alkaen. Nykyinen maa on '
      + 'siis nuori valtio, jolla on hyvin vanha historia. Se elää '
      + 'merenkulusta — kreikkalaiset omistavat maailman suurimman '
      + 'kauppalaivaston — sekä matkailusta ja maataloudesta.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Kroatia: {
    intro: 'Kroatia on hevosenkengän muotoinen maa Adrianmeren rannalla. '
      + 'Sen rannikolla on yli tuhat saarta, ja sisämaassa levittäytyvät '
      + 'tasangot ja metsät. Maa itsenäistyi 1991 ja liittyi EU:hun 2013.'
      + '\n\nKartalla muoto näkyy heti. Luoteesta kaakkoon kulkee '
      + 'Dinaarien Alppien selkä, ja se painuu suoraan mereen: rannikko on '
      + 'kivinen ja jyrkkä, eikä sen ja vuorten väliin jää juuri tasankoa. '
      + 'Rannikon edustalla on rivistö pitkiä ja kapeita saaria, jotka '
      + 'kulkevat samansuuntaisesti vuorijonon kanssa. Vuorten '
      + 'pohjoispuolella väri vaihtuu vihreäksi ja maasto tasoittuu — '
      + 'siellä alkaa Pannonian tasanko, jonka halki virtaavat Sava ja '
      + 'Drava.'
      + '\n\nLuoteessa mereen työntyy Istrian kolmiomainen niemimaa, ja '
      + 'kartan itäkulma eli Slavonia on tasaista peltomaata — rannikon '
      + 'täydellinen vastakohta. Etelässä hevosenkengän kärki kapenee '
      + 'ohueksi kaistaleeksi kohti Dubrovnikia, ja juuri ennen sitä '
      + 'kartalla on outo aukko, joka ei kuulu Kroatialle lainkaan.',
    teksti: 'Kroatian rannikko oli vuosisatoja Venetsian ja Itävallan '
      + 'vaikutuspiirissä, sisämaa taas Unkarin. Siksi maan kaksi puolta '
      + 'näyttävät erilaisilta: rannikolla on kivitaloja ja kellotorneja '
      + 'kuten Italiassa, sisämaassa keskieurooppalaisia kaupunkeja.\n\n'
      + 'Kroatia oli osa Jugoslaviaa toisen maailmansodan jälkeen. Kun se '
      + 'julistautui itsenäiseksi 1991, seurasi neljä vuotta sotaa. '
      + 'Sodan jäljet näkyvät yhä joissakin kaupungeissa, mutta maa on '
      + 'nykyään yksi Euroopan suosituimmista matkailukohteista.\n\n'
      + 'Kroatiasta on peräisin muutama yllättävä keksintö: solmio '
      + '(ranskaksi cravate, kroaattien kaulahuivista), ja Nikola Tesla, '
      + 'vaihtovirran kehittäjä, syntyi kroatialaisessa kylässä. '
      + 'Plitvicen järvien kansallispuistossa kuusitoista järveä laskee '
      + 'toisiinsa satojen putousten kautta.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Bulgaria: {
    intro: 'Bulgaria on Balkanin niemimaalla Mustanmeren rannalla. Maa on '
      + 'vuoristoinen: Balkanvuoret kulkevat sen halki idästä länteen ja '
      + 'antavat nimensä koko niemimaalle.'
      + '\n\nKartta jakautuu vyöhykkeisiin, jotka kulkevat lännestä itään. '
      + 'Pohjoisin on Tonavan tasanko, loiva ja vihreä, ja sen reunaa '
      + 'Tonava virtaa koko matkan maan rajana. Sen alapuolella kulkee '
      + 'Balkanvuorten harjanne lähes yhtenäisenä meren rantaan asti, ja '
      + 'harjanteen eteläpuolella avautuu Ylä-Traakian tasanko. Tummin '
      + 'ruskea on lounaisnurkassa Rilan ja Pirinin vuoristoissa, joissa '
      + 'Musala nousee 2 925 metriin — koko Balkanin niemimaan korkein '
      + 'huippu — ja siitä ruskea jatkuu itään leveänä Rodopien massiivina.'
      + '\n\nPääkaupunki ei ole keskellä maata vaan aivan lännessä vuorten '
      + 'ympäröimässä altaassa. Idässä rannikko on melko suora, ja siihen '
      + 'tekevät loven vain Varnan ja Burgasin lahdet. Koillisessa, '
      + 'tasangon ja vuorten välissä, kohoaa yksinäinen satametrinen '
      + 'kallio, jonka kylkeen on hakattu ratsastaja.',
    teksti: 'Bulgaria on Euroopan vanhimpia valtioita: se perustettiin '
      + 'vuonna 681 eikä ole vaihtanut nimeään sen jälkeen. Kaksi '
      + 'bulgarialaista munkkia, Kyrillos ja Methodios sekä heidän '
      + 'oppilaansa, kehittivät 800-luvulla kyrilliset aakkoset — samat, '
      + 'joilla kirjoitetaan yhä venäjää, serbiaa ja monta muuta '
      + 'kieltä.\n\n'
      + 'Maa oli ottomaanien vallan alla lähes viisi vuosisataa ja '
      + 'itsenäistyi 1878. Kommunistisen ajan jälkeen 1989 se siirtyi '
      + 'demokratiaan ja liittyi EU:hun 2007.\n\n'
      + 'Bulgaria tuottaa suuren osan maailman ruusuöljystä: Kazanlakin '
      + 'Ruusulaaksossa poimitaan damaskonruusuja hajuvesiteollisuudelle. '
      + 'Maa tunnetaan myös jogurtistaan — siinä elävä bakteeri on '
      + 'nimetty maan mukaan Lactobacillus bulgaricus — ja '
      + 'kansanmusiikistaan, jonka epäsäännölliset tahtilajit ja '
      + 'naiskuorojen sointi ovat tehneet siitä maailmankuulua.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  // TEKSTIREMONTTI 20.8.2026, erä E1: intro on nyt etusivun leipäteksti
  // kappaleineen ja lihavointeineen (ks. Rooman lohkokommentti yllä).
  Lontoo: {
    intro: 'Lontoo on Yhdistyneen kuningaskunnan pääkaupunki Thamesin '
      + 'varrella, ja siellä asuu lähes yhdeksän miljoonaa ihmistä. '
      + 'Roomalaiset perustivat paikalle **Londiniumin** noin vuonna 47, ja '
      + 'kaupunki eli vuosisatoja satamastaan: Thames on vuorovesijoki '
      + 'keskustaan asti, joten purjelaivat pääsivät aivan kaupungin '
      + 'sydämeen, ja 1800-luvulla satama oli maailman vilkkain.'
      + '\n\n'
      + 'Vuoden 1666 suurpalo tuhosi neljässä päivässä noin 13 000 taloa, ja '
      + 'sen jälkeen puujulkisivut kiellettiin — siitä vanhojen kortteleiden '
      + 'tiili. Christopher Wren piirsi palon jälkeen **Pyhän Paavalin '
      + 'katedraalin**, jonka kupoli oli kaupungin korkein rakennus yli 250 '
      + 'vuotta. Maailman ensimmäinen metro avattiin täällä vuonna 1863, ja '
      + 'ensimmäinen liikennevalo syttyi parlamenttitalon kupeessa 1868.'
      + '\n\n'
      + 'Keskustassa on itse asiassa kaksi kaupunkia: rahaa tekevä City of '
      + 'London on vain 2,9 neliökilometriä omine sääntöineen, ja '
      + 'Westminsterissä ovat parlamentti ja hallitus. Ympärillä on 31 muuta '
      + 'hallintoaluetta, ja kaupunki tuntuu kylien rykelmältä, jossa '
      + 'jokaisella on oma torinsa ja pubinsa. Kaduilla puhutaan yli '
      + 'kolmeasataa kieltä.',
    teksti: 'Lontoo kasvoi satamasta. Thames on vuorovesijoki aina '
              + 'keskustaan asti, joten purjelaivat pääsivät kaupungin '
              + 'sydämeen, ja 1800-luvulla Lontoon satama oli maailman '
              + 'vilkkain. Laivojen mukana tuli tavaraa ja ihmisiä joka '
              + 'maanosasta, ja siitä kaupunki tekee yhä elantonsa.\n\nLontoo '
              + 'on palanut ja rakennettu uudelleen. Vuoden 1666 suurpalo '
              + 'tuhosi noin 13 000 taloa neljässä päivässä, ja sen jälkeen '
              + 'puujulkisivut kiellettiin — siksi vanhat korttelit ovat '
              + 'tiiltä. Christopher Wren suunnitteli palon jälkeen Pyhän '
              + 'Paavalin katedraalin, jonka kupoli oli kaupungin korkein '
              + 'rakennus yli 250 vuotta.\n\nMoni asia keksittiin täällä ensin. '
              + 'Maailman ensimmäinen metro avattiin 1863, ensimmäinen '
              + 'liikennevalo pystytettiin parlamenttitalon viereen 1868, ja '
              + 'Harry Beckin 1930-luvun metrokartta — jossa etäisyydet eivät '
              + 'pidä paikkaansa mutta linjat erottuvat selvästi — on esikuvana '
              + 'lähes joka kaupungin metrokartalle.\n\nKeskellä Lontoota on '
              + 'kaksi eri kaupunkia. City of London on vain 2,9 '
              + 'neliökilometriä ja sillä on omat sääntönsä ja oma '
              + 'pormestarinsa; City of Westminsterissä ovat parlamentti ja '
              + 'hallitus. Ympärillä on 31 muuta hallintoaluetta. Lontoolaiset '
              + 'puhuvatkin harvoin Lontoosta — he sanovat asuvansa Hackneyssä, '
              + 'Brixtonissa tai Wembleyssä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  // TEKSTIREMONTTI 20.8.2026, ERÄ E7: intro on nyt etusivun leipäteksti
  // (ks. Venetsian lohkokommentti yllä). Faktat Edinburghin omista jo
  // tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
  // Matkailijan Edinburgh, nahtavyysjutut.js, maakartat.js, oma
  // teksti-kenttä alla) sekä en-Wikipedian Edinburgh-artikkelista
  // (asema Skotlannin toiseksi väkirikkaimpana, hallinnon ja
  // tuomioistuinten sijaintipaikka). teksti on ennallaan.
  Edinburgh: {
    intro: 'Edinburgh on Skotlannin pääkaupunki Firth of Forthin rannalla, '
             + 'ja siellä asuu noin puoli miljoonaa ihmistä — Glasgow’n '
             + 'jälkeen toiseksi eniten koko maassa. Kaupungin keskellä '
             + 'kohoaa sammuneen tulivuoren kallio, jonka laella **linna** '
             + 'seisoo, ja kalliolta itään laskeva harjanne kantaa '
             + 'vanhankaupungin ainoan pääkadun. Kaupunki on Skotlannin '
             + 'hallituksen, parlamentin ja ylimpien tuomioistuinten '
             + 'kotipaikka.'
             + '\n\n'
             + 'Vanhakaupunki kasvoi kapealle harjanteelle ja ylöspäin, '
             + 'koska sivusuunnassa ei ollut tilaa. Kun harjanne tuli '
             + 'täyteen, 1760-luvulla ryhdyttiin rakentamaan notkon '
             + 'toiselle puolelle uuttakaupunkia, jonka kadut ovat '
             + 'suoria; nämä kaksi hyvin erilaista kaupunkia ovat yhdessä '
             + 'Unescon maailmanperintökohde. Yliopisto perustettiin 1582, ja '
             + '1700-luvun lopulla samoilla kaduilla kävelivät David Hume, '
             + 'Adam Smith ja James Hutton — aikaa sanotaan Skotlannin '
             + 'valistukseksi.'
             + '\n\n'
             + 'Skotlannin oma parlamentti lakkautettiin 1707 ja palasi '
             + 'vasta 1999 uuteen taloon Holyroodiin. Joka elokuu '
             + 'kaupunki täyttyy esiintyjistä: vuoden 1947 '
             + 'taidefestivaalin reunalle syntynyt **Fringe** on '
             + 'maailman suurin esittävän taiteen festivaali.',
    teksti: 'Edinburgh on kahden kaupungin kaupunki. Vanhakaupunki kasvoi '
              + 'kapealle harjulle linnan ja Holyroodin palatsin väliin. Kun '
              + 'tilaa ei ollut sivusuunnassa, rakennettiin ylöspäin: '
              + '1600-luvulla harjulla oli jopa neljäntoista kerroksen taloja, '
              + 'Euroopan ensimmäisiä kerrostaloja. Kujat harjun kyljessä ovat '
              + 'paikoin niin kapeita, että vastaantulijan ohi mennään '
              + 'sivuttain.\n\nUusikaupunki syntyi kilpailusta, jonka '
              + '1760-luvulla voitti nuori arkkitehti James Craig. Hänen '
              + 'ruutukaavansa toteutettiin lähes sellaisenaan, ja siksi '
              + 'uudenkaupungin kadut ovat suoria siellä missä vanhankaupungin '
              + 'kujat kiemurtelevat. Kaupunkien välissä oli Nor Loch, '
              + 'likaantunut järvi, joka kuivattiin ja muutettiin '
              + 'puistoksi.\n\n1700-luvun lopulla samoilla kaduilla kävelivät '
              + 'filosofi David Hume, taloustieteilijä Adam Smith ja geologi '
              + 'James Hutton. Aikaa kutsutaan Skotlannin valistukseksi. Eräs '
              + 'vieras kertoi voivansa seisoa kadunkulmassa ja ”muutamassa '
              + 'minuutissa puristaa kättä viidellekymmenelle '
              + 'nerolle”.\n\nSkotlannin oma parlamentti lakkautettiin 1707, '
              + 'kun Skotlanti ja Englanti yhdistyivät yhdeksi valtakunnaksi. '
              + 'Se palasi vasta 1999, ja uusi parlamenttitalo avattiin '
              + 'Holyroodissa 2004. Skotlanti päättää nykyään itse muun muassa '
              + 'kouluistaan ja terveydenhuollostaan, ja sen oikeusjärjestelmä '
              + 'on pysynyt omanaan koko unionin ajan.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  // TEKSTIREMONTTI 20.8.2026, ERÄ E7: intro on nyt etusivun leipäteksti
  // (ks. Venetsian lohkokommentti yllä). Faktat Dublinin omista jo
  // tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
  // Matkailijan Dublin, nahtavyysjutut.js, maakartat.js, oma
  // teksti-kenttä alla) sekä en-Wikipedian Dublin-artikkelin
  // väestöluvuista ja varhaisimman asutuksen ajoituksesta.
  // teksti on ennallaan.
  Dublin: {
    intro: 'Dublin on Irlannin pääkaupunki ja sen suurin kaupunki, ja se '
             + 'sijaitsee Liffey-joen suulla Dublinin lahden pohjukassa. '
             + 'Kaupungissa esikaupunkeineen asuu noin 1,3 miljoonaa '
             + 'ihmistä. Paikalla oli gaelilainen asutus jo 600-luvulla, ja '
             + 'viikingit perustivat joen rantaan kauppasataman '
             + '800-luvulla.'
             + '\n\n'
             + 'Kaupungilla on kaksi nimeä, ja molemmat kertovat vedestä: '
             + 'iirinkielinen Baile Átha Cliath tarkoittaa risuista '
             + 'punotun kahlaamon kaupunkia, ja englanninkielinen Dublin '
             + 'tulee tummasta vuorovesialtaasta, jonka rannalla viikingit '
             + 'pitivät laivojaan. 1700-luvulla kaupunki rakennettiin '
             + 'uudelleen: katuja oikaistiin ja talojen mitat määrättiin, '
             + 'ja niin syntyi **georgiaaninen Dublin** tiilirivistöineen '
             + 'ja viuhkaikkunoineen.'
             + '\n\n'
             + 'Dublin on ennen kaikkea kirjojen kaupunki. Trinity '
             + 'Collegen kirjastossa säilytetään noin vuonna 800 '
             + 'kuvitettua Kellsin kirjaa, ja kaupungista ovat kotoisin '
             + 'muun muassa Jonathan Swift, Oscar Wilde, W. B. Yeats, '
             + 'James Joyce ja Samuel Beckett — Unesco nimesi Dublinin '
             + '**kirjallisuuden kaupungiksi** vuonna 2010. Irlanti oli '
             + 'vuosisatoja Britannian hallinnassa, ja itsenäinen valtio '
             + 'syntyi vuonna 1922.',
    teksti: 'Irlanniksi kaupunki ei ole Dublin vaan Baile Átha Cliath, '
              + '”risuista punotun kahlaamon kaupunki”. Kaksi nimeä kertoo '
              + 'kahdesta asutuksesta: gaelilaisesta kahlaamosta joen '
              + 'yläjuoksulla ja viikinkien satamasta mustan lammen rannalla. '
              + 'Molemmat nimet ovat käytössä yhä — bussien kylkeen on maalattu '
              + 'irlanninkielinen.\n\n1700-luvulla Dublin rakennettiin '
              + 'uudelleen. Wide Streets Commission oikoi kadut ja määräsi '
              + 'talojen mitat, ja niin syntyi georgiaaninen Dublin: '
              + 'samanlaisia tiilitaloja rivissä, viuhkaikkuna oven päällä. '
              + 'Ovien kirkkaat värit ovat tulleet myöhemmin, ja niiden '
              + 'alkuperästä kiistellään yhä.\n\nDublin on kirjojen kaupunki. '
              + 'Trinity Collegen kirjastossa säilytetään Kellsin kirjaa, '
              + 'munkkien noin vuonna 800 käsin kirjoittamaa ja kuvittamaa '
              + 'evankeliumikirjaa. Kaupungista ovat kotoisin muun muassa '
              + 'Jonathan Swift, Oscar Wilde, W. B. Yeats, James Joyce ja '
              + 'Samuel Beckett, ja Unesco nimesi Dublinin kirjallisuuden '
              + 'kaupungiksi vuonna 2010.\n\nIrlanti oli vuosisatoja Britannian '
              + 'hallinnassa. Pääsiäisen 1916 kapina alkoi Dublinin '
              + 'pääpostitalosta, jonka pylväissä näkyy yhä luodinjälkiä, ja '
              + 'itsenäinen valtio syntyi 1922. Nykyään joen eteläpuolen '
              + 'entiset telakkakorttelit ovat täynnä teknologiayhtiöiden '
              + 'Euroopan-pääkonttoreita; aluetta kutsutaan nimellä Silicon '
              + 'Docks.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  // TEKSTIREMONTTI 20.8.2026, erä E1: intro on nyt etusivun leipäteksti
  // kappaleineen ja lihavointeineen (ks. Rooman lohkokommentti yllä).
  Pariisi: {
    intro: 'Pariisi on Ranskan pääkaupunki, ja se on rakennettu Seinen '
      + 'mutkaan. Kaupungissa asuu runsaat kaksi miljoonaa ihmistä ja koko '
      + 'seudulla yli kymmenen miljoonaa. Kaikki alkoi joen keskellä '
      + 'olevasta saaresta: **Île de la Citéllä** asui gallialainen '
      + 'parisii-heimo, ja roomalaiset perustivat sinne kaupungin nimeltä '
      + 'Lutetia.'
      + '\n\n'
      + 'Samalla saarella seisoo Notre-Dame, jota alettiin rakentaa 1163; '
      + 'sen katto paloi huhtikuussa 2019, ja kirkko avattiin uudelleen '
      + 'joulukuussa 2024. Nykyisen kaupunkikuvan teki yksi mies: keisari '
      + 'Napoleon III määräsi 1853 prefekti **Haussmannin** uudistamaan '
      + 'Pariisin, ja seitsemäntoista vuoden aikana kapeat kujat väistyivät '
      + 'leveiden bulevardien ja vaaleiden kivitalojen tieltä.'
      + '\n\n'
      + 'Eiffel-torni nousi vuoden 1889 maailmannäyttelyyn, ja se oli määrä '
      + 'purkaa parinkymmenen vuoden kuluttua, kunnes huipun radioantenni '
      + 'teki siitä armeijalle liian hyödyllisen. Metro avattiin 1900, ja '
      + 'Hector Guimardin vihreät valurautakaaret kaartuvat yhä monen '
      + 'sisäänkäynnin yllä. Kaupunki jakautuu kahteenkymmeneen '
      + 'kaupunginosaan, jotka kiertyvät keskustasta ulospäin kuin etanan '
      + 'kuori.',
    teksti: 'Pariisi alkoi saarelta. Seinen keskellä olevalla Île de la '
              + 'Citéllä asui gallialainen parisii-heimo, ja roomalaiset '
              + 'perustivat sinne kaupungin. Samalla saarella seisoo '
              + 'Notre-Dame, jota alettiin rakentaa 1163. Sen katto paloi '
              + 'huhtikuussa 2019, ja kirkko avattiin uudelleen joulukuussa '
              + '2024.\n\nNykyisen kaupungin ilmeen teki yksi mies. Keisari '
              + 'Napoleon III määräsi 1853 prefekti Georges-Eugène Haussmannin '
              + 'uudistamaan Pariisin: kapeita kujia purettiin ja tilalle '
              + 'vedettiin leveitä bulevardeja, joiden varteen rakennettiin '
              + 'samannäköisiä vaaleita kivitaloja parvekkeineen. Työ kesti '
              + 'seitsemäntoista vuotta.\n\nEiffel-torni nousi vuoden 1889 '
              + 'maailmannäyttelyyn. Se oli tarkoitus purkaa kahdenkymmenen '
              + 'vuoden kuluttua, mutta huipulle asennettiin radioantenni, ja '
              + 'armeija totesi tornin liian hyödylliseksi hävitettäväksi. Se '
              + 'seisoo yhä, ja se maalataan uudelleen noin seitsemän vuoden '
              + 'välein.\n\nMetro avattiin vuonna 1900, ja monen sisäänkäynnin '
              + 'yllä kaartuvat yhä Hector Guimardin vihreät valurautakaaret. '
              + 'Seinen yli kulkee kaupungin alueella 37 siltaa, ja joen rannat '
              + 'keskustassa ovat Unescon maailmanperintökohde.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026 (erä E2), sama linja kuin muissa erän
   * kaupungeissa: intro on nyt etusivun leipäteksti kappaleineen ja maltillisine
   * lihavointeineen. Faktat ovat Lissabonin omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan
   * Lissabon; maakartat.js).
   */
  Lissabon: {
    intro: 'Lissabon on Portugalin pääkaupunki ja Manner-Euroopan '
      + 'läntisin. Se on rakennettu kukkuloille Tejo-joen '
      + 'pohjoisrannalle kohtaan, jossa joki levenee lähes '
      + 'merenlahdeksi mutta avomerelle on vain viitisentoista '
      + 'kilometriä; juuri siksi kaupunki on tässä, sillä satama oli '
      + 'suojaisa. Asukkaita on noin 550 000 ja koko seudulla lähes '
      + 'kolme miljoonaa.'
      + '\n\n'
      + 'Lissabon oli purjehdusten pääkaupunki: Vasco da Gama lähti '
      + 'täältä 1497 ja avasi eurooppalaisille meritien Afrikan ympäri '
      + 'Intiaan. Jokisatamaan purettiin sadan vuoden ajan pippuria, '
      + 'kanelia ja kultaa, ja samoilla laivoilla tuotiin Afrikasta '
      + 'orjuutettuja ihmisiä. Kaikki muuttui **1. marraskuuta 1755**, '
      + 'kun maanjäristys, hyökyaalto ja tulipalo hävittivät suurimman '
      + 'osan keskustasta.'
      + '\n\n'
      + 'Uusi alakaupunki **Baixa** vedettiin viivoittimella '
      + 'ruudukkoon, ja talojen sisään piilotettiin puinen '
      + 'ristikkohäkki, joka joustaa järistyksessä. Ruudukon molemmin '
      + 'puolin kadut kiipeävät vanhoihin kortteleihin, joita '
      + 'kolistelevat keltaiset raitiovaunut vuodesta 1873. '
      + 'Diktatuuri päättyi 25. huhtikuuta 1974 verettömään '
      + 'vallankaappaukseen, neilikkavallankumoukseen.',
    teksti: 'Lissabon oli purjehdusten pääkaupunki. Täältä lähti Vasco da '
              + 'Gama vuonna 1497 ja avasi eurooppalaisille meritien Afrikan '
              + 'ympäri Intiaan; Intian valtamerellä oli purjehdittu jo satoja '
              + 'vuosia ennen häntä. Seuraavan sadan vuoden ajan jokisatamaan '
              + 'purettiin pippuria, kanelia ja kultaa — ja samoilla laivoilla '
              + 'portugalilaiset toivat Afrikasta orjuutettuja ihmisiä, joita '
              + 'myytiin Lissabonin toreilla ja kaduilla. Kaupungista tuli '
              + 'Euroopan rikkaimpia.\n\nSitten tuli 1. marraskuuta 1755. '
              + 'Pyhäinpäivän aamuna kaupunkia ravisteli suuri maanjäristys, '
              + 'sitä seurasi hyökyaalto Tejolta ja lopuksi päiväkausia palanut '
              + 'tulipalo. Suurin osa keskustasta hävisi. Kuninkaan ministeri, '
              + 'markiisi de Pombal, sanoi kuuluisasti: haudataan kuolleet ja '
              + 'hoidetaan elävät.\n\nUusi keskusta Baixa rakennettiin suoraan '
              + 'ruudukkoon ja Euroopan ensimmäisillä tarkoituksella '
              + 'järistyksen kestäviksi suunnitelluilla rakenteilla. Talojen '
              + 'sisään piilotettiin puinen ristikkohäkki, gaiola. Rakenteita '
              + 'koeteltiin marssittamalla sotilasosastoja pienoismallien '
              + 'ympärillä, jotta maa tärisisi.\n\nPortugalissa sotilaat '
              + 'kaappasivat vallan 1926, ja Salazarin diktatuuri Estado Novo '
              + 'vakiintui 1933. Se päättyi 25. huhtikuuta 1974, kun upseerit '
              + 'tekivät vallankaappauksen ilman verenvuodatusta: sotilaat '
              + 'panivat kiväärinpiippuihinsa punaisia neilikoita, joita '
              + 'kukkakauppias oli jakanut kadulla. Päivää vietetään yhä '
              + 'neilikkavallankumouksen muistoksi.\n\nKaupungin läpi kolisevat '
              + 'keltaiset ratikat. Linja 28 kiipeää Alfaman kujille niin '
              + 'ahtaasti, että vaunut on rakennettu erikseen tämän kaupungin '
              + 'mittoihin.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026 (erä E2; Raamatun "TEKSTIEN PAINOPISTE" ja
   * Fablen eräohje): intro ei ole enää kahden virkkeen nosto vaan lehden
   * etusivun leipäteksti — 7–10 virkettä kahdessa tai kolmessa
   * kappaleessa ('\n\n'), maltillinen **lihavointi** avainkohdissa.
   * Faktat ovat Madridin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Madrid;
   * maakartat.js), ei uusista lähteistä. teksti-kenttä on ennallaan.
   */
  Madrid: {
    intro: 'Madrid on Espanjan pääkaupunki ja maan suurin kaupunki: '
      + 'asukkaita on noin 3,4 miljoonaa ja koko maakunnassa lähes '
      + 'seitsemän miljoonaa. Se on keskellä Iberian niemimaata '
      + 'Kastilian ylätasangolla noin 650 metrin korkeudessa, '
      + 'korkeammalla kuin yksikään toinen Euroopan unionin '
      + 'pääkaupunki. Merelle on neljäsataa kilometriä, joten kesä on '
      + 'kuuma ja kuiva ja talviyöt kylmiä.'
      + '\n\n'
      + 'Kaupunki alkoi 800-luvulla maurien linnoituksena nimeltä '
      + '**Mayrit**, ja pitkään se oli pikkukaupunki muiden joukossa. '
      + 'Pääkaupungiksi se nousi vuonna 1561, kun kuningas Filip II '
      + 'siirsi hovinsa Toledosta lähes tasan valtakunnan keskelle. '
      + 'Hovin ympärille rakennettiin Plaza Mayor, aukio, joka '
      + 'suljettiin talorivillä kaikilta neljältä sivulta, ja '
      + 'keskustan sydämeksi jäi Puerta del Sol: sen kiveyksessä on '
      + 'laatta, josta Espanjan päätiet mitataan.'
      + '\n\n'
      + 'Nykyään Madrid tunnetaan museoistaan. **Prado** esittelee '
      + 'Velázquezin ja Goyan tärkeimmät työt, ja Reina Sofíassa on '
      + 'Picasson Guernica, joka saapui Espanjaan vasta 1981. Arki '
      + 'venyy myöhään iltaan, ja Manzanares-joki kaivettiin '
      + '2000-luvulla moottoritien alta takaisin esiin puistoksi.',
    teksti: 'Madrid ei ole Espanjan vanhin kaupunki. Se alkoi 800-luvulla '
              + 'maurien linnoituksena, jonka nimi oli Mayrit, ja pitkään se '
              + 'oli pikkukaupunki muiden joukossa. Vuonna 1561 kuningas Filip '
              + 'II siirsi hovinsa Toledosta Madridiin, koska se oli lähes '
              + 'tasan valtakunnan keskellä. Siitä tuli '
              + 'pääkaupunki.\n\nKaupunki kasvoi hovin ympärille. Filip III:n '
              + 'aikana rakennettiin Plaza Mayor, joka suljettiin talorivillä '
              + 'kaikilta neljältä sivulta. Aukio oli markkinapaikka ja '
              + 'härkätaistelujen näyttämö. Siellä luettiin julki myös '
              + 'inkvisition tuomiot ja rangaistiin tuomitut — ihmiset '
              + 'katsoivat parvekkeilta, koska vallanpitäjät halusivat '
              + 'rangaistuksen näkyvän kaikille. Keskustan sydän on Puerta del '
              + 'Sol, ja siinä on kivilaatta nimeltä kilometri nolla: Espanjan '
              + 'kuuden valtatien pituudet mitataan siitä laatasta.\n\nMadrid '
              + 'on museokaupunki. Pradossa ovat Diego Velázquezin ja Francisco '
              + 'de Goyan tärkeimmät työt, ja Reina Sofíassa Pablo Picasson '
              + 'Guernica. Maalaus palasi Espanjaan vasta 1981, sillä Picasso '
              + 'oli määrännyt, ettei se saanut tulla ennen kuin maassa on '
              + 'demokratia.\n\nArki on myöhäistä. Lounas syödään kahden ja '
              + 'neljän välillä ja päivällinen vasta yhdeksän jälkeen. '
              + 'Sunnuntaiaamuisin La Latinan korttelit täyttyvät El Rastron '
              + 'kirpputorista, jota on pidetty samalla paikalla 1700-luvulta '
              + 'asti.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026 (erä E2), sama linja kuin muissa erän
   * kaupungeissa: intro on nyt etusivun leipäteksti kappaleineen ja maltillisine
   * lihavointeineen. Faktat ovat Barcelonan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan
   * Barcelona; maakartat.js).
   */
  Barcelona: {
    intro: 'Barcelona on Katalonian pääkaupunki ja Espanjan toiseksi '
      + 'suurin kaupunki: asukkaita on noin 1,7 miljoonaa. Se on '
      + 'rakennettu kapealle tasangolle Välimeren ja Collserolan '
      + 'metsäisen harjanteen väliin. Kaupungissa on kaksi virallista '
      + 'kieltä, katalaani ja espanja; katalaani on oma romaaninen '
      + 'kielensä eikä espanjan murre, ja se on nykyään koulujen '
      + 'opetuskieli.'
      + '\n\n'
      + 'Roomalaiset perustivat **Barcinon** pienelle kummulle, jonka '
      + 'päällä seisoo nyt katedraali, ja kaupunki pysyi muurien '
      + 'sisässä 1850-luvulle asti. Kun muurit purettiin, '
      + 'insinööri Ildefons Cerdà piirsi niiden ulkopuolelle '
      + '**Eixamplen**: ruudukon, jossa korttelin sivu on 113 metriä ja '
      + 'jokainen kulma on viistetty, jotta valoa ja kääntyviä vaunuja '
      + 'varten jäisi risteykseen tilaa.'
      + '\n\n'
      + 'Sagrada Famílian rakentaminen alkoi vuonna 1882, ja Antoni '
      + 'Gaudí teki työtä siinä kuolemaansa asti; kirkko rakennetaan '
      + 'yhä lahjoitusvaroin. Kaupungin ilmeen muutti vuosi 1992, kun '
      + 'olympialaisia varten rannan tehtaat purettiin ja tilalle tuli '
      + 'uimarantoja ja rantabulevardi. '
      + 'Syyskuun lopun Mercè-juhla on ollut kaupungin virallinen '
      + 'vapaapäivä vuodesta 1871.',
    teksti: 'Barcelona alkoi roomalaisena kaupunkina nimeltä Barcino. '
              + 'Vanhankaupungin kujien seassa on yhä pätkiä roomalaista '
              + 'muuria, ja keskiajalta ovat kirkot ja niin kapeat korttelit, '
              + 'että aurinko käy niissä vain keskipäivällä.\n\nVuonna 1854 '
              + 'kaupunki sai luvan purkaa keskiaikaiset muurinsa, ja insinööri '
              + 'Ildefons Cerdà suunnitteli niiden ulkopuolelle Eixamplen: '
              + 'säännöllisen ruudukon, jossa kortteli on noin 113 metriä '
              + 'sivultaan ja jokainen nurkka viistetty. Viisteiden piti tehdä '
              + 'tilaa kääntyville vaunuille ja päästää valoa risteyksiin. Ne '
              + 'toimivat yhä, nyt bussien ja jalankulkijoiden '
              + 'hyväksi.\n\nSagrada Famílian rakentaminen alkoi 1882. Antoni '
              + 'Gaudí otti työn vastaan seuraavana vuonna ja teki sitä '
              + 'kuolemaansa asti vuoteen 1926. Kirkko rakennetaan '
              + 'lahjoitusvaroin, ja se on yhä kesken.\n\nKatalaani on oma '
              + 'romaaninen kielensä, ei espanjan murre. Sen julkinen käyttö '
              + 'oli Francisco Francon diktatuurin aikana rajoitettua, mutta '
              + 'vuodesta 1979 Katalonia on ollut itsehallintoalue ja katalaani '
              + 'on koulujen opetuskieli. Kaupungin ilmeen muutti vuosi 1992: '
              + 'olympialaisia varten rantaa avattiin uimarannoiksi ja vanhoja '
              + 'teollisuusalueita purettiin, ja Barcelona kääntyi taas merta '
              + 'kohti.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E3, sama linja kuin Krakovassa yllä:
   * intro on nyt etusivun leipäteksti kappaleineen ja maltillisine
   * lihavointeineen. Faktat Amsterdamin omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan
   * Amsterdam; maakartat.js).
   */
  Amsterdam: {
    intro: 'Amsterdam on Alankomaiden pääkaupunki, ja siinä asuu vajaa '
      + 'miljoona ihmistä. Nimi tulee padosta: Amstel-joki laski ennen '
      + 'suoraan IJ-lahteen, ja noin vuonna 1270 se padottiin, jolloin '
      + 'padon päälle kasvoi kylä Amstelredam. Maa on pehmeää suota, joten '
      + 'talot seisovat maahan lyötyjen **puupaalujen** varassa.'
      + '\n\n'
      + '1600-luvulla Amsterdam oli yksi maailman vilkkaimmista satamista, '
      + 'ja väkiluku kasvoi sadassa vuodessa noin 30 000:sta yli 200 '
      + '000:een. Kasvua varten kaivettiin kokonaan uusi kanavavyöhyke '
      + 'vuosina 1613–1665, ja **Herengracht, Keizersgracht ja '
      + 'Prinsengracht** ovat yhä paikallaan Unescon '
      + 'maailmanperintöluettelossa. Varallisuus kertyi merikaupasta ja '
      + 'siirtomaista, ja kaupunkiin muutti väkeä ympäri Eurooppaa.'
      + '\n\n'
      + 'Toinen maailmansota katkaisi tämän: Saksa miehitti Alankomaat '
      + 'vuonna 1940, ja Amsterdamin juutalaisyhteisöstä suurin osa '
      + 'surmattiin. Nykyään kaupunki on tasainen kuin lattia ja pyörä on '
      + 'nopein kulkuneuvo, sillä pyöriä on suunnilleen yhtä paljon kuin '
      + 'asukkaita. Vesi ei ole täällä koristetta vaan työtä, sillä pumput '
      + 'ja sulut pitävät kaupungin kuivana joka päivä.',
    teksti: '1600-luvulla Amsterdam oli yksi maailman vilkkaimmista '
              + 'satamista. Kaupunki kasvoi niin nopeasti — noin 30 000 '
              + 'asukkaasta yli 200 000:een sadassa vuodessa — että sen '
              + 'ympärille kaivettiin kokonaan uusi kanavavyöhyke vuosina '
              + '1613–1665. Puolikuun muotoiset Herengracht, Keizersgracht ja '
              + 'Prinsengracht ovat yhä paikallaan, ja ne otettiin Unescon '
              + 'maailmanperintöluetteloon vuonna 2010.\n\nRikkaus tuli '
              + 'merikaupasta ja siirtomaista. Itä-Intian kauppakomppania VOC '
              + 'otti maustekaupan haltuunsa Aasiassa asevoimin, ja '
              + 'amsterdamilaiset kauppahuoneet osallistuivat Atlantin '
              + 'orjakauppaan. Kaupungin pormestari pyysi sitä anteeksi vuonna '
              + '2021. Kaupunkiin muutti väkeä ympäri Eurooppaa: '
              + 'portugalinjuutalaisia, hugenotteja, saksalaisia ja '
              + 'skandinaaveja. Amsterdam salli useita uskontoja aikana, '
              + 'jolloin se oli harvinaista — osin vakaumuksesta, osin siksi '
              + 'että kauppa sujui paremmin niin.\n\nToinen maailmansota '
              + 'katkaisi tämän. Saksa miehitti Alankomaat 1940, ja Amsterdamin '
              + 'juutalaisyhteisöstä suurin osa surmattiin. Yksi piilossa '
              + 'eläneistä oli Anne Frank, joka kirjoitti päiväkirjaansa '
              + 'Prinsengrachtin takahuoneistossa kaksi vuotta. Talo on nyt '
              + 'museo, ja päiväkirja on käännetty yli seitsemällekymmenelle '
              + 'kielelle.\n\nNykyään Amsterdamissa asuu vajaa miljoona '
              + 'ihmistä. Kaupunki on tasainen kuin lattia, joten pyörä on '
              + 'nopein kulkuneuvo: pyöriä on suunnilleen yhtä paljon kuin '
              + 'asukkaita, ja pyöräkaistat ovat leveämpiä kuin monen kaupungin '
              + 'autokaistat. Vesi on yhä työtä eikä koristetta — pumput ja '
              + 'sulut pitävät kaupungin kuivana joka ikinen päivä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * BRYSSEL (19.9.2026, omistajan päätös: Belgian pelikaupunki, pilotti).
   * Teksti on kirjoitettu omin sanoin en-Wikipedian artikkeleista
   * "Brussels" ja "History of Brussels" (luettu 19.9.2026), 1873-
   * näkökulmasta: Belgian pääkaupunki, kuningas Leopold II (hallitsi
   * vuodesta 1865), Grand-Place, Manneken Pis, Galeries Royales Saint-
   * Hubert (avattu 1847), Palais de Justice rakenteilla 1866–1883,
   * pitsinnyplääjät ja Sennejoen kattaminen 1867–1871. Praliinisuklaata
   * (Neuhaus 1912) ja Atomiumia (Expo 58) EI mainita esittelyssä
   * saavutuksina — ne eivät ole vielä olemassa isoisän matkan aikaan;
   * praliini mainitaan vain vastakohtana EUROPE_FACTS-tiedossa.
   */
  Bryssel: {
    intro: 'Bryssel on Belgian pääkaupunki Sennejoen varrella, ja '
      + 'siellä asuu vuonna 1873 noin 180 000 ihmistä — esikaupunkeineen '
      + 'huomattavasti enemmän. Kaupunki on kaksikielinen: kadulla '
      + 'kuulee sekä ranskaa että flaamia. Belgia itsenäistyi '
      + 'Alankomaista vuonna 1830, ja sitä hallitsee nyt kuningas '
      + '**Leopold II**, joka nousi valtaistuimelle 1865.'
      + '\n\n'
      + 'Keskustan sydän on **Grand-Place**, keskiaikaisten '
      + 'kiltatalojen reunustama tori. Ranskan tykistö ampui torin '
      + 'raunioiksi vuonna 1695, ja porvarikillat rakensivat sen '
      + 'uudelleen muutamassa vuodessa nykyiseen, kullattuun asuunsa. '
      + 'Torin lähellä seisoo kaupungin toinen tunnusmerkki, pieni '
      + 'pronssinen **Manneken Pis** -suihkulähde, joka on huvittanut '
      + 'matkalaisia jo vuosisatoja.'
      + '\n\n'
      + 'Kaupunki on juuri uudistanut itseään: likainen Sennejoki '
      + 'katettiin keskustan kohdalta vuosina 1867–1871 ja sen päälle '
      + 'rakennettiin leveät bulevardit. Kauppiaat kulkevat lasikattoisen '
      + '**Galeries Royales Saint-Hubertin** läpi jo vuodesta 1847, ja '
      + 'kaupungin laidalla nousee valtava oikeuspalatsi, Palais de '
      + 'Justice, jota on rakennettu vuodesta 1866 eikä se ole vielä '
      + 'valmis. Toreilla myydään maailmankuulua brysseliläistä pitsiä.',
    teksti: 'Bryssel sai alkunsa Sennejoen saaresta, jolle rakennettiin '
      + 'kappeli 900-luvulla, ja siitä kasvoi kauppatie Kölnin ja '
      + 'Brugesin välillä. Keskiajalla kaupunki rikastui '
      + 'tekstiiliteollisuudesta ja kilta-järjestelmästä, ja sen '
      + 'hallintoa johtivat vuorotellen porvarikillat ja aateli. '
      + 'Keskustan torin, Grand-Placen, reunustavat yhä samat '
      + 'kiltatalot, jotka rakennettiin uudelleen sen jälkeen kun '
      + 'Ranskan kuninkaan tykistö pommitti torin raunioiksi elokuussa '
      + '1695 — jälleenrakennus vei vain muutaman vuoden, ja lopputulos '
      + 'on yksi Euroopan komeimmista toreista.'
      + '\n\nVuonna 1830 belgialaiset nousivat kapinaan Alankomaiden '
      + 'kuningasta vastaan, ja kapinan tuloksena syntyi itsenäinen '
      + 'Belgian kuningaskunta, jonka pääkaupungiksi Bryssel tuli. '
      + 'Ensimmäinen kuningas oli Leopold I; hänen poikansa Leopold II '
      + 'on hallinnut vuodesta 1865. Belgia on nuori valtio, mutta se '
      + 'teollistui nopeasti — maassa avattiin jo 1835 Euroopan mantereen '
      + 'ensimmäinen rautatielinja, ja Bryssel on sittemmin kasvanut '
      + 'rautateiden solmukohdaksi.'
      + '\n\nKaupunki on äskettäin uudistanut keskustansa perin '
      + 'pohjin: pormestari Jules Anspachin johdolla likainen ja '
      + 'usein tulviva Sennejoki katettiin ja peitettiin leveillä '
      + 'bulevardeilla vuosina 1867–1871, mikä paransi terveysoloja '
      + 'huomattavasti. Kauppiaat ovat kulkeneet lasikattoisen '
      + 'ostoskadun, Galeries Royales Saint-Hubertin, läpi jo vuodesta '
      + '1847 — se on yksi Euroopan ensimmäisistä katetuista '
      + 'kauppakujista. Kaupungin laidalla nousee valtava oikeustalo, '
      + 'Palais de Justice, jonka arkkitehti Joseph Poelaert suunnitteli '
      + 'ja jota rakennetaan vuodesta 1866; se valmistuu vasta '
      + '1880-luvulla ja on tuolloin pinta-alaltaan maailman suurin '
      + 'rakennus. Toreilla ja kaduilla myydään brysseliläistä pitsiä, '
      + 'jota nyplätään käsin sukupolvesta toiseen — ja pieni '
      + 'pronssinen poikapatsas, Manneken Pis, jatkaa vuosisataista '
      + 'ilveilyään kaupungin sydämessä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * LJUBLJANA (20.9.2026, omistajan päätös 19.9.2026: Slovenia saa
   * pelikaupungin Ljubljana). Teksti on kirjoitettu omin sanoin
   * en-Wikipedian artikkeleista "Ljubljana" ja "Ljubljana Castle"
   * (luettu 20.9.2026), 1873-näkökulmasta: Krainin herttuakunnan
   * pääkaupunki (saksaksi Laibach) Itävallan keisarikunnassa, rautatie
   * Wienistä 1849 ja Triesteen 1857, linna läänin vankilana, Tivoli-
   * puisto ja Napoleonin Illyria 1809–1813, lohikäärme kaupungin
   * tunnuksena sekä slovenien ja saksalaisten kilpailu 1800-luvulla.
   * Vuoden 1895 maanjäristystä, Lohikäärmesiltaa (1901) ja Plečnikin
   * töitä (1920–30-luvut) EI mainita nykyhetken asioina — ne tulevat
   * vasta isoisän matkan jälkeen.
   */
  /*
   * KOŠICE (20.9.2026, omistajan päätös 19.9.2026: Slovakia saa
   * pelikaupungin Košice). Teksti on kirjoitettu omin sanoin
   * en-Wikipedian artikkelista "Košice" (luettu 20.9.2026),
   * 1873-näkökulmasta: unkarilainen Kassa Unkarin kuningaskunnassa
   * (Itävalta-Unkari), Pyhän Elisabetin tuomiokirkko, Pentapolitana,
   * jesuiittojen yliopisto 1657, hiippakunta 1802, muurit purettu
   * 1856 mennessä, sähkösanoma 1856, rautatie Miskolciin 1860 ja
   * Ylä-Unkarin museo 1872. Slovakian itsenäisyyttä, Tšekkoslovakian
   * aikaa ja sodan aikaisia tapahtumia EI käsitellä — ne tulevat
   * vasta isoisän matkan jälkeen. Väestötiedot ovat vuodelta 1891
   * (28 884), ei 1873.
   */
  Košice: {
    intro: 'Košice, unkariksi **Kassa** ja saksaksi Kaschau, on Ylä-Unkarin '
      + 'suurin kaupunki Hornád-joen varrella. Se kuuluu Unkarin '
      + 'kuningaskuntaan ja on siellä vapaa kuninkaallinen kaupunki. Vielä vuonna 1891 asukkaita on '
      + 'vasta noin 29 000, mutta kaupungin asema on ollut suuri jo '
      + 'keskiajalta.'
      + '\n\n'
      + 'Kaupungin sydän on pitkä, linssinmuotoinen **Hlavná-katu**, jonka '
      + 'varrella kohoaa **Pyhän Elisabetin tuomiokirkko**. Se on '
      + 'rakennettu 1300-luvun lopulta alkaen ja oli aikanaan Unkarin '
      + 'kuningaskunnan suurin kirkko.'
      + '\n\n'
      + 'Höyryjuna on tuonut kaupungin lähemmäs maailmaa: rautatie '
      + 'Miskolciin valmistui vuonna 1860, ja vuonna 1873 kaupungista on '
      + 'jo yhteys Prešoviin, Žilinaan ja Chopiin. Vanhat kaupunginmuurit '
      + 'on purettu vaiheittain 1800-luvun alusta vuoteen 1856.',
    teksti: 'Košicen ensimmäinen tunnettu kirjallinen maininta on '
      + 'vuodelta 1230, jolloin se oli kuninkaallinen kylä nimeltä Villa '
      + 'Cassa. Mongolien hyökkäyksen jälkeen 1241 kuningas Béla IV kutsui '
      + 'kaupunkiin saksalaisia uudisasukkaita, ja Ala- ja Ylä-Kassa '
      + 'yhdistyivät 1200-luvulla pitkän Hlavná-kadun ympärille. '
      + 'Kaupunki sai ensimmäiset tunnetut kaupunkioikeutensa 1290, ja '
      + 'se oli strateginen risteys kauppatiellä.'
      + '\n\n1300-luvun lopulla kaupunki oli niin rikas, että '
      + 'sinne päätettiin rakentaa aivan uusi kirkko: Pyhän Elisabetin '
      + 'tuomiokirkko, Unkarin kuningaskunnan suurin. Keisari Sigismund '
      + 'ja paavin istuin tukivat hanketta. 1400-luvun alusta Košice oli '
      + 'Pentapolitanan, Ylä-Unkarin viiden tärkeimmän kaupungin '
      + '(Bardejov, Levoča, Košice, Prešov ja Sabinov) liiton, '
      + 'johtavia jäseniä, ja kuningas Matthias Corvinuksen aikana noin '
      + '10 000 asukkaan kaupunki oli yksi Euroopan suurimmista.'
      + '\n\nMyöhemmin kaupunki kärsi Unkarin valtataisteluista ja '
      + 'Ottomaanien valtakunnan läsnäolosta. Vuonna 1657 jesuiitat '
      + 'perustivat kaupunkiin kirjapainon ja yliopiston, josta tuli '
      + 'vuonna 1777 kuninkaallinen akatemia ja myöhemmin oikeusakatemia. '
      + 'Vuonna 1723 Hlavná-kadulle pystytettiin Immaculata-patsas '
      + '1710–1711 ruton muistoksi. Kaupunki sai oman hiippakunnan '
      + 'vuonna 1802, ja vuosien 1848–1849 sota kulki myös sen '
      + 'ympäristössä.'
      + '\n\nKaupunki nykyaikaistuu: ensimmäiset tehtaat perustettiin '
      + '1840-luvulla (sokeri- ja naulatehtaat), sähkösanoma saapui 1856 '
      + 'ja rautatie Miskolciin 1860. Vuonna 1872 perustettiin Ylä-'
      + 'Unkarin museo, josta tuli myöhemmin Itä-Slovakian museo. '
      + 'Muurit puretaan, ja vain Pyövelin bastioni säilyy niiden '
      + 'jäänteenä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Ljubljana: {
    intro: 'Ljubljana on Krainin herttuakunnan pääkaupunki '
      + 'Ljubljanica-joen varrella, ja saksaksi sitä kutsutaan '
      + '**Laibachiksi**. Kaupunki kuuluu Itävallan keisarikuntaan, ja se '
      + 'on pieni: vielä vuonna 1895 asukkaita on vasta noin 31 000. '
      + 'Slovenit ja saksalaiset asuvat samoilla kaduilla.'
      + '\n\n'
      + 'Kaupungin yllä kohoaa **Ljubljanan linna** Linnavuoren '
      + 'huipulla. Keskiaikainen linnoitus on menettänyt merkityksensä ja '
      + 'rapistuu, ja sitä käytetään läänin vankilana. Kaupungin tunnus '
      + 'on **lohikäärme**, joka koristaa linnan tornia ja vaakunaa; se '
      + 'periytyy Pyhän Yrjön legendasta.'
      + '\n\n'
      + 'Wienistä tulee nyt höyryjuna: rautatie ulotettiin Ljubljanaan '
      + 'vuonna 1849 ja Triesteen 1857, ja se on tehnyt kaupungista '
      + 'kulkureitin Itävallan sisämaan ja Adrianmeren välillä. Slovenit '
      + 'ja saksalaiset kilpailevat keskenään yhdistyksissä ja '
      + 'urheiluseuroissa.',
    teksti: 'Ljubljanan seudulla seisoi antiikin aikana roomalainen '
      + 'Emona, ja keskiaikaisen kaupungin asutus syntyi '
      + 'Ljubljanica-joen ja linnavuoren ympärille 1100-luvun toisella '
      + 'puoliskolla. Vuonna 1278 Ljubljana siirtyi osana Krainia '
      + 'Habsburgien haltuun, ja se pysyi heidän alaisenaan vuoteen 1918, '
      + 'Napoleonin ajan lyhyttä väliaikaa lukuun ottamatta. Kaupungin '
      + 'saksankielinen nimi Laibach on ollut käytössä jo keskiajalta '
      + 'asti.'
      + '\n\nVuosina 1809–1813 seutu kuului Napoleonin Illyrian '
      + 'maakuntiin, ja Ljubljana (Laybach) oli niiden pääkaupunki. '
      + 'Ranskalaiset jättivät jälkeensä Tivoli-puiston, jonka '
      + 'ranskalainen insinööri Jean Blanchard suunnitteli vuonna 1813. '
      + 'Napoleonin tappion jälkeen kaupunki palasi Itävallalle ja oli '
      + 'vuosina 1815–1849 Illyrian kuningaskunnan hallinnollinen '
      + 'keskus. Vuonna 1821 siellä kokoontui Laibachin kongressi, joka '
      + 'vahvisti Euroopan poliittiset rajat vuosikymmeniksi.'
      + '\n\nLinnavuoren linna on vaihtanut tehtäväänsä: 1600- ja '
      + '1700-luvulla se oli asevarasto, ranskalaisaikana kasarmi ja '
      + 'sotilassairaala, ja vuodesta 1813 se on toiminut läänin '
      + 'vankilana. Vankilan vanhimpaan osaan vangit laskettiin '
      + 'kuiluun köydellä tai ketjulla. Linna ei ole enää '
      + 'hallitsijan asuinpaikka eikä puolustuslinnoitus, joten sen '
      + 'ylläpito on käynyt liian kalliiksi ja muureja rapistuu.'
      + '\n\nRautatie on muuttanut kaupunkia: ensimmäinen juna saapui '
      + 'Wienistä vuonna 1849, ja rata jatkui Triesteen 1857. '
      + 'Slovenien ja saksalaisten kilpailu näkyy jopa urheiluseuroissa: '
      + 'ensimmäinen kaupungin urheiluseura, Južni Sokol, perustettiin '
      + 'vuonna 1863. Ljubljanan 1500-luvun puhekieli oli pohjana '
      + 'slovenian kirjakielelle, jonka perustan laski uskonpuhdistaja '
      + 'Primož Trubar.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * VALLETTA (21.9.2026, omistajan päätös 19.9.2026: Malta saa
   * pelikaupungin Valletta). Teksti on kirjoitettu omin sanoin
   * en-Wikipedian artikkeleista "Valletta", "History of Malta" ja
   * "Great Siege of Malta" (luettu 21.9.2026), 1873-näkökulmasta:
   * brittiläinen kruununsiirtomaa vuodesta 1800/1814, laivastotukikohta
   * Grand Harbourissa, Krimin sodan sairaalakausi 1854–56, ritarikunnan
   * perustama linnoituskaupunki 1566 suuren piirityksen 1565 jälkeen,
   * Pyhän Johanneksen konkatedraali ja Auberge de Castille. Maltan
   * itsenäisyyttä (1964), tasavaltaa (1974) ja EU-jäsenyyttä (2004) EI
   * mainita nykyhetken asioina — ne tulevat vasta isoisän matkan
   * jälkeen.
   */
  Valletta: {
    intro: 'Valletta on brittiläisen Maltan pääkaupunki kapealla '
      + 'kalkkikiviniemellä Grand Harbourin ja Marsamxett-sataman '
      + 'välissä. Britit ottivat saaren haltuunsa 1800, ja Pariisin '
      + 'rauha 1814 vahvisti Maltan **kruununsiirtomaaksi**; kaupunki '
      + 'on nyt tärkeä laivastotukikohta, josta kuningatar Victorian '
      + 'laivasto valvoo koko Välimerta.'
      + '\n\n'
      + 'Kaupungin perusti 1566 Johanniittaritarikunnan suurmestari '
      + '**Jean Parisot de Valette**, joka vuotta aiemmin oli '
      + 'johtanut ritarikunnan puolustusta osmanien nelikuukautista '
      + '**suurta piiritystä** vastaan. Uusi kaupunki nousi ennen '
      + 'lähes asumattomalle Sciberrasin niemelle säännölliseen '
      + 'ruutukaavaan, ja se ympäröitiin niin paksuilla muureilla, '
      + 'että niiden purkamista on ehdotettu useaan otteeseen '
      + 'turhaan.'
      + '\n\n'
      + 'Kaduilla kohtaavat maltan kieli, italia ja englanti. '
      + 'Keskustaa hallitsee **Pyhän Johanneksen konkatedraali**, '
      + 'jonka koruton hiekkakivijulkisivu kätkee ylellisen '
      + 'sisustuksen, ja ritarikunnan kieliryhmien majataloista '
      + 'komein, **Auberge de Castille**, toimii nyt sotilashallinnon '
      + 'rakennuksena.',
    teksti: 'Ennen ritarikuntaa Vallettan niemi tunnettiin nimellä '
      + 'Sciberras — kalliokieleke, jolla ei ollut juuri asutusta. '
      + 'Kun Johanniittaritarikunta oli 1565 torjunut Osmanien '
      + 'valtavan hyökkäysjoukon nelikuukautisessa suuressa '
      + 'piirityksessä, suurmestari Jean Parisot de Valette päätti '
      + 'rakentaa niemelle täysin uuden, paremmin puolustettavan '
      + 'pääkaupungin entisen Birgun tilalle. Peruskivi laskettiin '
      + '28. maaliskuuta 1566, ja kaupunki sai suurmestarin mukaan '
      + 'nimen Valletta.'
      + '\n\nRitarikunta rakennutti kaupungin säännölliseen '
      + 'ruutukaavaan ja täytti sen palatseilla, kirkoilla ja '
      + 'kieliryhmiensä majataloilla eli aubergeilla. Komein niistä, '
      + 'Auberge de Castille, edustaa Espanjan ja Portugalin '
      + 'ritareita. Vuonna 1577 valmistui Pyhän Johanneksen '
      + 'konkatedraali: ulkoa vaatimaton linnoituskirkko, jonka '
      + 'sisustus on sittemmin katettu kullalla ja marmorilla. '
      + 'Ritarikunnan valtakausi päättyi, kun Napoleon valtasi '
      + 'saaren 1798 matkallaan Egyptiin.'
      + '\n\nMaltalaiset kapinoivat ranskalaisia vastaan ja pyysivät '
      + 'apua Britannialta, joka otti saaren haltuunsa syyskuussa '
      + '1800. Pariisin rauha 1814 vahvisti Maltan brittiläiseksi '
      + 'kruununsiirtomaaksi, ja Vallettasta tuli kuninkaallisen '
      + 'laivaston tärkeä tukikohta Grand Harbourissa. Krimin sodan '
      + 'aikana 1854–56 saarelle perustettiin sotilassairaaloita '
      + 'haavoittuneille, ja Maltaa alettiin kutsua Välimeren '
      + 'sairaanhoitajaksi. Linnoitusten purkamista on esitetty '
      + 'useita kertoja 1800-luvulla kaupungin ahtauden '
      + 'helpottamiseksi, mutta muurit ovat toistaiseksi säilyneet '
      + 'ehjinä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * LUXEMBURG (KAUPUNKI) (21.9.2026, omistajan päätös 21.9.2026: Kypros,
   * Luxemburg ja Malta saavat pelikaupungin). Avain on 'Luxemburg
   * (kaupunki)', koska 'Luxemburg' on jo maan wiki-avain (COUNTRY_SHAPES
   * ja MAA_KATEGORIAT.LUX) — sama ratkaisu kuin Pietarilla, Soulilla,
   * Petralla ja Kuwaitilla. Teksti on kirjoitettu omin sanoin
   * en-Wikipedian artikkeleista "Luxembourg City", "History of
   * Luxembourg" ja "Bock (Luxembourg)" (luettu 21.9.2026), 1873-
   * näkökulmasta: suurherttuakunta henkilöunionissa Alankomaiden
   * kuningas Vilhelm III:n kanssa, Lontoon sopimus 1867 ja linnoituksen
   * purku (kesken, kestää 16 vuotta), Bock-kallion perustamistarina
   * (963), rautateollisuus alkamassa Eschissä. Adolphe-silta (1900–1903)
   * ja Notre-Damen katedraalin tuomiokirkkoasema (1870, mainitaan vain
   * ohimennen) EIVÄT ole isoisän matkan aikaan vielä nähtävissä samassa
   * muodossa kuin nykyään — sama ratkaisu kuin Brysselin Mont des
   * Artsilla.
   */
  'Luxemburg (kaupunki)': {
    intro: 'Luxemburg on suurherttuakunta, jonka pääkaupunki seisoo '
      + 'Alzette- ja Pétrusse-jokien kaivamalla kalliolinnakkeella. Maata '
      + 'hallitsee suurherttuana Alankomaiden kuningas **Vilhelm III** '
      + 'henkilöunionissa, ja Lontoon sopimus vuodesta 1867 on julistanut '
      + 'suurherttuakunnan ainaiseksi puolueettomaksi. Kaupunki on '
      + 'vuosisatoja ollut niin vahva linnoitus, että ranskalainen '
      + 'sotilasinsinööri Lazare Carnot kutsui sitä maailman parhaaksi '
      + 'heti Gibraltarin jälkeen — siitä juontuu lempinimi **Pohjoisen '
      + 'Gibraltar**. Nyt sopimus vaatii koko puolustusjärjestelmän '
      + 'purkamista, ja työ on ollut käynnissä jo kuusi vuotta.',
    teksti: 'Luxemburgin kaupunki syntyi Bock-kalliolle, kun kreivi '
      + 'Siegfried hankki paikan vuonna 963 ja rakensi sille '
      + 'Lucilinburhuc-nimisen linnan; nimestä juontuu koko maan nimi. '
      + 'Kallion luonnollinen suoja Alzette-joen mutkassa teki paikasta '
      + 'halutun, ja vuosisatojen kuluessa Luxemburgista kasvoi yksi '
      + 'Euroopan vahvimmista linnoituksista — sitä laajensivat '
      + 'vuorotellen burgundilaiset, Habsburgit, espanjalaiset, '
      + 'ranskalaiset ja itävaltalaiset, jotka kaikki halusivat hallita '
      + 'tätä solmukohtaa.'
      + '\n\nSuurvaltojen kilpailu päättyi, kun Preussin ja Ranskan '
      + 'välinen jännite Luxemburgista laukesi kansainväliseksi '
      + 'kriisiksi ja ratkesi Lontoon sopimuksella vuonna 1867: '
      + 'suurherttuakunta julistettiin puolueettomaksi, ja Preussin '
      + 'varuskunta joutui vetäytymään. Sopimus määräsi myös koko '
      + 'linnoituksen purettavaksi. Purkutyö on käynnissä isoisän matkan '
      + 'aikaan — se on kestänyt jo kuusi vuotta ja jatkuu vielä '
      + 'kymmenen, ja lopulta se hävittää yli 24 kilometriä maanalaisia '
      + 'käytäviä.'
      + '\n\nMaata hallitsee suurherttuana Alankomaiden kuningas '
      + 'Vilhelm III, joka istuu Haagissa eikä ole vieraillut maassaan '
      + 'vuosikausiin — henkilöunioni pitää kaksi valtaistuinta yhden '
      + 'hallitsijan käsissä, mutta arki niissä on erillistä. Kaupungin '
      + 'katujen alla virtaavat Alzette ja Pétrusse ovat kaivaneet '
      + 'syviä rotkoja, joiden yli kuljetaan silloilla ja portailla; '
      + 'rautatie on yhdistänyt kaupungin Ranskaan ja Preussiin jo '
      + 'vuosia, ja Eschin seudulla alkanut rautamalmin louhinta '
      + 'ennustaa maalle uutta, teollista tulevaisuutta.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, erä E1: intro on nyt etusivun leipäteksti
   * kappaleineen ja lihavointeineen (ks. Rooman lohkokommentti yllä).
   * Muuri ja kaupungin jako kerrotaan neutraalina historiana ilman
   * osapuolikehystä ja ilman nykypolitiikkaa (Fablen eräohje).
   */
  Berliini: {
    intro: 'Berliini on Saksan pääkaupunki ja maan suurin kaupunki, jossa '
      + 'asuu lähes neljä miljoonaa ihmistä. Se on rakennettu tasaiselle '
      + 'hiekkamaalle Spree-joen varrelle, ja noin kolmannes pinta-alasta on '
      + 'puistoa, metsää tai vettä. Berliini oli ensin Preussin ja vuodesta '
      + '1871 koko Saksan keisarikunnan pääkaupunki, ja vuonna 1920 seudulla '
      + 'asui jo yli kolme miljoonaa ihmistä.'
      + '\n\n'
      + 'Vuonna 1933 valtaan noussut natsihallinto teki Berliinistä '
      + 'keskuksensa, ja täältä johdettiin sota ja juutalaisten joukkotuho. '
      + 'Sodan lopussa kaupunki oli raunioina, ja raivaustyön tekivät '
      + 'suureksi osaksi naiset eli Trümmerfrauen. Voittajavallat jakoivat '
      + 'Berliinin neljään sektoriin, ja vuonna 1961 Itä-Saksa rakensi '
      + 'Länsi-Berliinin ympärille **155 kilometrin muurin**, joka katkaisi '
      + 'kadut ja metrolinjat 28 vuodeksi; raja aukesi 9. marraskuuta 1989.'
      + '\n\n'
      + 'Yhdistyneen Saksan pääkaupunki Berliinistä tuli 1990. Muurin linja '
      + 'on merkitty keskustan katukiveykseen kaksoisrivinä, ja **East Side '
      + 'Galleryssä** on 1,3 kilometriä muuria, jonka 118 taiteilijaa '
      + 'maalasi 1990. Halvat vuokrat vetivät kaupunkiin taiteilijoita '
      + 'ympäri maailmaa.',
    teksti: 'Berliini oli ensin Preussin ja vuodesta 1871 koko Saksan '
              + 'keisarikunnan pääkaupunki. Se kasvoi hurjaa vauhtia: '
              + '1870-luvulla rakennettiin kokonaisia kortteleita kerralla, ja '
              + 'vuoteen 1920 mennessä seudulla asui yli kolme miljoonaa '
              + 'ihmistä.\n\nVuonna 1933 valtaan noussut natsihallinto teki '
              + 'Berliinistä keskuksensa. Täältä johdettiin sota ja '
              + 'juutalaisten joukkotuho. Toisen maailmansodan lopussa kaupunki '
              + 'oli raunioina, ja raivaustyön tekivät suureksi osaksi naiset — '
              + 'heitä kutsuttiin nimellä Trümmerfrauen, '
              + 'raunionaiset.\n\nVoittajavallat jakoivat Berliinin neljään '
              + 'sektoriin. Vuonna 1961 Itä-Saksa rakensi Länsi-Berliinin '
              + 'ympärille 155 kilometrin muurin, joka katkaisi kadut, '
              + 'metrolinjat ja sukulaissuhteet 28 vuodeksi. Raja aukesi 9. '
              + 'marraskuuta 1989 osin väärinkäsityksen takia: '
              + 'tiedotustilaisuudessa sanottiin uusien matkustussääntöjen '
              + 'astuvan voimaan ”heti, viipymättä”, ja ihmiset kävelivät '
              + 'portille.\n\nBerliinistä tuli yhdistyneen Saksan pääkaupunki '
              + '1990, ja hallitus muutti tänne 1999. Vuokrat pysyivät pitkään '
              + 'halpoina, mikä veti kaupunkiin taiteilijoita ja muusikoita '
              + 'ympäri maailmaa. Berliinissä on myös yksi Euroopan suurimmista '
              + 'turkkilaisyhteisöistä: ensimmäiset tulivat 1960-luvulla '
              + 'vierastyöläisiksi, eivätkä palanneet, vaan jäivät ja toivat '
              + 'perheensä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  // TEKSTIREMONTTI 20.8.2026, erä E1: intro on nyt etusivun leipäteksti
  // kappaleineen ja lihavointeineen (ks. Rooman lohkokommentti yllä).
  Wien: {
    intro: 'Wien on Itävallan pääkaupunki Tonavan varrella, ja siellä asuu '
      + 'noin kaksi miljoonaa ihmistä. Kaupunki seisoo kohdassa, jossa joki '
      + 'tulee ulos vuorten välistä: lännessä nousee Wienerwald ja idässä '
      + 'alkaa Unkariin asti jatkuva lakeus. Roomalaiset perustivat paikalle '
      + 'Vindobonan leirin lähes kaksituhatta vuotta sitten.'
      + '\n\n'
      + 'Satojen vuosien ajan Wien oli **Habsburgien** valtakunnan keskus, '
      + 'joka 1900-luvun alussa ulottui Sveitsin rajalta Ukrainaan — siksi '
      + 'keskusta näyttää yhä suuremman maan pääkaupungilta kuin Itävalta '
      + 'nykyään on. Kaupunginmuuri purettiin keisarin käskystä, ja tilalle '
      + 'avattiin 1865 puistokatu **Ring**, jonka varteen nousivat ooppera, '
      + 'raatihuone ja parlamentti. Valtakunta hajosi ensimmäisen '
      + 'maailmansodan jälkeen 1918.'
      + '\n\n'
      + 'Musiikki on kaupungin tunnetuin vientituote: Haydn, Mozart, '
      + 'Beethoven, Schubert ja Brahms työskentelivät täällä. Vuoden 1900 '
      + 'tienoilla Wien oli uusien ajatusten laboratorio: Freud kehitti '
      + 'täällä psykoanalyysia ja Klimt maalasi kultalehteä käyttäen. '
      + 'Juomavesi tulee kaupunkiin yhä vuorten lähteistä vuonna 1873 '
      + 'valmistunutta vesijohtoa pitkin, pelkällä painovoimalla.',
    teksti: 'Habsburgien suku hallitsi Wienistä käsin valtakuntaa, joka '
              + '1900-luvun alussa ulottui Sveitsin rajalta Ukrainaan ja jossa '
              + 'puhuttiin toistakymmentä kieltä. Ensimmäisen maailmansodan '
              + 'jälkeen valtakunta hajosi vuonna 1918, ja Wienistä tuli '
              + 'yhdessä yössä pienen tasavallan pääkaupunki — kaupungissa oli '
              + 'enemmän virastoja kuin maalla käyttöä.\n\nMusiikki on '
              + 'kaupungin tunnetuin vientituote. Haydn, Mozart, Beethoven, '
              + 'Schubert ja Brahms asuivat ja työskentelivät täällä, ja '
              + '1900-luvun alussa Arnold Schönberg mursi Wienissä koko vanhan '
              + 'sävellajijärjestelmän. Uudenvuodenkonsertti Musikvereinin '
              + 'kultaisessa salissa lähetetään joka vuosi kymmeniin '
              + 'maihin.\n\nVuoden 1900 tienoilla Wien oli uusien ajatusten '
              + 'laboratorio. Sigmund Freud kehitti psykoanalyysia '
              + 'vastaanotollaan Berggassella, Gustav Klimt maalasi kultalehteä '
              + 'käyttäen, ja kahvilapöydissä istui kirjailijoita, joilla ei '
              + 'ollut varaa omaan työhuoneeseen. Samaan aikaan tavallinen '
              + 'työläisperhe asui yhdessä huoneessa ilman vessaa ja '
              + 'vesijohtoa.\n\nSiitä syntyi Punainen Wien. Kaupunki rakensi '
              + '1920- ja 1930-luvuilla 65 000 vuokra-asuntoa erityisellä '
              + 'asuntoverolla, joka osui kovimmin kaikkein kalleimpiin '
              + 'kiinteistöihin. Punainen Wien loppui helmikuussa 1934: '
              + 'lyhyessä sisällissodassa Itävallan hallituksen joukot ampuivat '
              + 'tykeillä työläisten taloja, myös Karl-Marx-Hofia. Vuonna 1938 '
              + 'Saksa liitti Itävallan itseensä. Wienissä asui silloin noin '
              + '200 000 juutalaista, ja natsit pakottivat suurimman osan '
              + 'pakenemaan maasta ja surmasivat kymmeniätuhansia. Kaupunki '
              + 'jatkoi asuntojen rakentamista sodan jälkeen, ja sama '
              + 'politiikka jatkuu yhä. Juomavesi tulee kaupunkiin vuorten '
              + 'lähteistä vuonna 1873 valmistunutta vesijohtoa pitkin, '
              + 'pelkällä painovoimalla, eikä sitä tarvitse puhdistaa lainkaan.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, erä E8: intro on lehden etusivun
   * leipäteksti (kappaleet '\n\n', maltillinen **lihavointi**).
   * Faktat Alppien omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot, Matkailijan Alpit ja
   * Luonto-kategoria) sekä teksti-kentästä, joka on ennallaan.
   */
  Alpit: {
    intro: 'Alpit ovat Länsi-Euroopan korkein vuoristo: 1 200 kilometrin '
             + 'kaari Välimereltä Wienin liepeille, 150–250 kilometriä leveä. '
             + 'Kahdeksan maata jakaa sen keskenään, ja vuoristossa asuu noin '
             + '13,6 miljoonaa ihmistä — se ei siis ole erämaa vaan asuttu '
             + 'seutu. Yli neljän kilometrin huippuja on 82, ja korkein '
             + 'niistä on **Mont Blanc**.'
             + '\n\nVuoristossa on aina eletty karjan ehdoilla. Lehmät '
             + 'viedään keväällä ylös alppilaitumille ja tuodaan syksyllä '
             + 'alas, ja kesän maito tehdään juustoksi ylhäällä, koska '
             + 'juusto kestää kantamisen ja maito ei. Samoista laaksoista '
             + 'ovat myös alppitorvi, jolla kutsuttiin karja kotiin ja '
             + 'viestittiin naapurilaaksoon, ja lumivyöryjen hallinnan '
             + 'taito, jonka Unesco lisäsi kulttuuriperintöluetteloonsa '
             + '2018.'
             + '\n\nMuuri Alpit eivät ole koskaan olleet. Solat ovat olleet '
             + 'kauppateitä kivikaudelta asti, ja isoisän matkan aikaan '
             + 'vuoren läpi päästiin jo junalla: **Fréjus-tunneli** avattiin '
             + 'syyskuussa 1871 ja Semmeringin vuoristorata jo 1854. '
             + 'Nykyään vuoristo '
             + 'lämpenee nopeammin kuin Euroopan tasangot, ja jäätiköistä on '
             + 'sulanut 1800-luvun puolivälin jälkeen yli puolet.',
    teksti: 'Alpit syntyivät, kun Afrikan mannerlaatta törmäsi Euroopan '
              + 'laattaan ja väliin jäänyt merenpohja työntyi ylös. Siksi '
              + 'huipuilta löytyy merieläinten fossiileja. Vuoristossa on 82 '
              + 'virallisesti tunnustettua yli neljäntuhannen metrin huippua, '
              + 'ja sivuhuiput mukaan lukien niitä on 128. Korkein on Mont '
              + 'Blanc, noin 4 800 metriä — tarkka luku vaihtelee vuosittain, '
              + 'koska huipulla on lunta ja jäätä.\n\nVuoristossa on aina '
              + 'eletty karjan ehdoilla. Lehmät viedään keväällä ylös '
              + 'alppilaitumille ja tuodaan syksyllä alas juhlasaatossa '
              + 'kukkaseppeleet päässä. Kesän maito tehdään juustoksi siellä '
              + 'ylhäällä, koska juusto kestää kantamisen ja maito ei. Sama '
              + 'järjestely on ollut käytössä satoja vuosia.\n\nAlpit eivät ole '
              + 'koskaan olleet muuri. Solat ovat olleet kauppateitä '
              + 'kivikaudelta asti: Ötzi, noin 5 300 vuotta sitten kuollut '
              + 'mies, löytyi jäätiköstä solareitin varrelta. Nykyään vuoren '
              + 'läpi mennään suoraan — Gotthardin pohjatunneli on 57 '
              + 'kilometriä pitkä ja maailman pisin rautatietunneli, ja se '
              + 'avattiin liikenteelle 2016.\n\nVuoristo lämpenee nopeammin '
              + 'kuin Euroopan tasangot. Jäätiköt kutistuvat, ja ikiroudan '
              + 'sulaminen irrottaa kalliota rinteiltä. Sveitsin jäätiköt '
              + 'menettivät vuosina 2022 ja 2023 yhteensä noin kymmenesosan '
              + 'jäämäärästään. Se näkyy hiihtokeskusten aukioloissa, '
              + 'vesivoiman määrässä ja siinä, minne on turvallista rakentaa.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E3, sama linja kuin Krakovassa:
   * intro on etusivun leipäteksti kappaleineen ja lihavointeineen.
   * Faktat Prahan omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Praha;
   * maakartat.js).
   */
  Praha: {
    intro: 'Praha on Tšekin pääkaupunki ja noin 1,4 miljoonan asukkaan '
      + 'kaupunki Vltavan mutkissa. Joki kiertää täällä jyrkän '
      + 'kallioharjanteen, jonka päälle nousi 800-luvulla linna; '
      + 'vastarannan tasangolle kasvoivat kauppiaiden korttelit. Neljä '
      + 'erillistä kaupunkia liitettiin yhdeksi vasta vuonna 1784.'
      + '\n\n'
      + 'Mahtinsa Praha sai 1300-luvulla, kun **Kaarle IV** teki siitä '
      + 'keisarikunnan pääkaupungin, perusti Keski-Euroopan ensimmäisen '
      + 'yliopiston ja aloitti kivisillan rakentamisen Vltavan yli. '
      + 'Raatihuoneen seinään asennettiin vuonna 1410 tähtitieteellinen '
      + 'kello, joka käy edelleen. Sitten seurasi kolmisensataa vuotta '
      + 'Habsburgien hallintoa ja saksankielisiä virastoja, kunnes '
      + 'Prahasta tuli vuonna 1918 itsenäisen Tšekkoslovakian pääkaupunki.'
      + '\n\n'
      + 'Toinen maailmansota jätti keskustan lähes ehjäksi, ja siksi '
      + 'samassa korttelissa voi seistä keskiaikainen talo, barokkikirkko '
      + 'ja jugendtalo. Vuoden 1968 uudistusyritys eli **Prahan kevät** '
      + 'päättyi Neuvostoliiton johtamien joukkojen tuloon, mutta vuonna '
      + '1989 valta vaihtui ilman verenvuodatusta, ja Tšekki ja Slovakia '
      + 'erosivat rauhanomaisesti vuoden 1993 alussa.',
    teksti: 'Prahan suuri aika alkoi 1300-luvulla, kun Kaarle IV teki siitä '
              + 'Pyhän saksalais-roomalaisen keisarikunnan pääkaupungin. Hän '
              + 'perusti Keski-Euroopan ensimmäisen yliopiston vuonna 1348 ja '
              + 'aloitti kivisillan rakentamisen 1357. Silta kantaa yhä hänen '
              + 'nimeään, on 516 metriä pitkä ja lepää kuudentoista holvikaaren '
              + 'varassa.\n\nVanhankaupungin raatihuoneen seinään asennettiin '
              + 'vuonna 1410 tähtitieteellinen kello, orloj. Se näyttää '
              + 'auringon ja kuun paikan eläinradalla, ja joka tasatunnilla '
              + 'luukuista kulkee kaksitoista apostolia. Kello on maailman '
              + 'vanhin yhä käynnissä oleva tähtitieteellinen '
              + 'kello.\n\nPrahassa on kahdesti heitetty virkamiehiä ikkunasta '
              + 'ulos poliittisen riidan päätteeksi, vuosina 1419 ja 1618. '
              + 'Jälkimmäisestä alkoi kolmikymmenvuotinen sota. Sen jälkeen '
              + 'kaupunki oli kolmisensataa vuotta Habsburgien vallassa, ja '
              + 'virastojen kieli oli saksa. Tšekin kieli ja kirjallisuus '
              + 'nousivat uudelleen 1800-luvulla, ja vuonna 1918 Prahasta tuli '
              + 'itsenäisen Tšekkoslovakian pääkaupunki.\n\nVuonna 1968 maassa '
              + 'yritettiin uudistaa sosialismia — sitä kutsuttiin Prahan '
              + 'kevääksi — mutta Neuvostoliiton johtamat joukot marssivat '
              + 'kaupunkiin elokuussa. Vuonna 1989 aukioille kokoontui '
              + 'satojatuhansia ihmisiä, ja hallinto vaihtui ilman '
              + 'verenvuodatusta. Tapahtumat tunnetaan samettivallankumouksena, '
              + 'ja presidentiksi valittiin näytelmäkirjailija Václav Havel. '
              + 'Tšekki ja Slovakia erosivat rauhallisesti vuoden 1993 alussa.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E3, sama linja kuin Krakovassa:
   * intro on etusivun leipäteksti kappaleineen ja lihavointeineen.
   * Faktat Budapestin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Budapest;
   * maakartat.js).
   */
  Budapest: {
    intro: 'Budapest on Unkarin pääkaupunki, jossa asuu noin 1,7 miljoonaa '
      + 'ihmistä. Se syntyi 17. marraskuuta 1873, kun kukkulainen Buda, '
      + 'vanha Óbuda ja tasainen Pest yhdistettiin yhdeksi. Tonava jakaa '
      + 'kaupungin kahtia: länsipuolella maa nousee jyrkästi '
      + 'kalkkikivikukkuloille, itäpuolella se on tasaista niin kauas kuin '
      + 'näkee.'
      + '\n\n'
      + 'Roomalaisilla oli täällä Aquincumin kaupunki, ja ottomaanien '
      + 'noin puolentoista vuosisadan hallinnosta jäi kylpyläperinne, '
      + 'sillä maasta nousee yli sata lämmintä lähdettä. Rantojen '
      + 'ensimmäinen pysyvä yhteys oli vuonna 1849 avattu **Ketjusilta**. '
      + 'Vuonna 1867 Unkarista tuli Itävalta-Unkarin tasavertainen '
      + 'puolisko, ja kasvu oli rajua: vuonna 1896 avattiin '
      + 'Manner-Euroopan ensimmäinen sähköllä kulkeva metrorata.'
      + '\n\n'
      + 'Toisen maailmansodan talvella 1944–1945 kaupunkia piiritettiin, '
      + 'ja kaikki Tonavan sillat ja suuri osa linnavuoresta tuhoutuivat. '
      + 'Vuonna 1956 unkarilaiset nousivat kapinaan neuvostojohtoista '
      + 'hallintoa vastaan, ja sosialistinen kausi päättyi 1989–1990. '
      + '**Unkarin kieli** kuuluu suomen ja viron tavoin uralilaisiin '
      + 'kieliin, joten suomalainen tunnistaa siitä rakenteita mutta '
      + 'tuskin yhtään sanaa.',
    teksti: 'Kaupunki on kaksijakoinen jo maastoltaan. Budan puolella on '
              + 'kukkuloita, linna ja jyrkkiä katuja, Pestin puolella tasankoa, '
              + 'leveitä bulevardeja ja parlamenttitalo joen rannassa. Puolia '
              + 'yhdistävät sillat, joista vanhin on vuonna 1849 valmistunut '
              + 'Ketjusilta.\n\nRoomalaisilla oli täällä Aquincumin kaupunki, '
              + 'unkarilaiset asettuivat seudulle 800-luvun lopulla, ja '
              + 'ottomaanit hallitsivat Budaa noin 150 vuotta 1500- ja '
              + '1600-luvuilla. Heiltä jäivät kylpylät. Vuonna 1867 Unkarista '
              + 'tuli Itävalta-Unkarin tasavertainen puolisko, ja seuraavat '
              + 'vuosikymmenet olivat rajua kasvun aikaa: vuonna 1896 '
              + 'juhlittiin unkarilaisten tuhatta vuotta maassa, ja juhlaa '
              + 'varten avattiin Manner-Euroopan ensimmäinen sähköllä kulkeva '
              + 'metrorata.\n\nToinen maailmansota jätti kaupunkiin syvät '
              + 'jäljet. Saksa miehitti Unkarin maaliskuussa 1944, ja kesän '
              + 'aikana Saksan ja Unkarin viranomaiset kuljettivat yli 400 000 '
              + 'juutalaista Unkarin maaseudulta tuhoamisleireille, enimmäkseen '
              + 'Auschwitziin. Marraskuussa 1944 nuoliristiläisten hallitus '
              + 'sulki Budapestin juutalaiset ghettoon vanhaan '
              + 'juutalaiskortteliin; ruotsalainen diplomaatti Raoul Wallenberg '
              + 'pelasti tuhansia jakamalla heille suojelupasseja. Piiritys '
              + 'talvella 1944–1945 tuhosi kaikki Tonavan sillat ja suuren osan '
              + 'Budan linnavuoresta. Vuonna 1956 unkarilaiset nousivat '
              + 'kapinaan neuvostojohtoista hallintoa vastaan; kapina '
              + 'kukistettiin, mutta se muistetaan yhä. Sosialistinen kausi '
              + 'päättyi 1989–1990.\n\nUnkarin kieli ei ole sukua '
              + 'naapureilleen. Se kuuluu suomen ja viron tavoin uralilaisiin '
              + 'kieliin, joten suomalainen tunnistaa unkarista rakenteita '
              + 'mutta tuskin yhtään sanaa. Kaupungin alla virtaa yhä lämmintä '
              + 'vettä: kylpylöitä on kymmeniä, ja moni budapestilainen käy '
              + 'niissä ympäri vuoden kuin uimahallissa.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E3, sama linja kuin Krakovassa:
   * intro on etusivun leipäteksti kappaleineen ja lihavointeineen.
   * Sota kerrotaan neutraalina historiana ilman yksityiskohtien
   * korostusta (Fablen sisältölinjaus 20.8.2026). Faktat Varsovan
   * omista jo tarkistetuista teksteistä (kulttuuri-kategoriat.js:
   * nostot ja Matkailijan Varsova; maakartat.js).
   */
  Varsova: {
    intro: 'Varsova on Puolan pääkaupunki ja maan suurin kaupunki: '
      + 'asukkaita on lähes kaksi miljoonaa. Se sijaitsee keskellä Puolan '
      + 'tasankoa Veikselin länsirannalla, jossa jyrkältä törmältä näki '
      + 'kauas ja törmän alla oli hyvä lastauspaikka viljalautoille.'
      + '\n\n'
      + 'Vuonna 1596 kuningas **Sigismund III** siirsi hovinsa Krakovasta '
      + 'tänne, ja kauppapaikasta tuli valtakunnan pääkaupunki. Puola '
      + 'katosi Euroopan kartalta vuosiksi 1795–1918, ja Varsova oli '
      + 'enimmäkseen Venäjän keisarikunnan kaupunki, mutta se kasvoi ja '
      + 'teollistui silti. Täällä varttui Fryderyk Chopin ja syntyi '
      + 'vuonna 1867 Maria Skłodowska, josta tuli kahden eri tieteenalan '
      + 'nobelisti.'
      + '\n\n'
      + 'Toinen maailmansota kohteli Varsovaa raskaammin kuin melkein '
      + 'mitään muuta Euroopan kaupunkia: sodan lopussa rakennuksista oli '
      + 'raunioina yli kolme neljäsosaa, ja kaupungin suuri '
      + 'juutalaisyhteisö oli tuhottu. Kaupunki rakennettiin takaisin, ja '
      + 'vanhankaupungin talot pystytettiin uudelleen vanhojen '
      + 'piirustusten ja maalausten avulla. Keskustaan nousi vuonna 1955 '
      + '**Kulttuuri- ja tiedepalatsi**, 237 metriä korkea Neuvostoliiton '
      + 'lahja, jonka ympärille on kasvanut lasitornien rivi.',
    teksti: 'Varsovasta tuli Puolan pääkaupunki vuonna 1596, kun kuningas '
              + 'Sigismund III siirsi hovinsa Krakovasta tänne: Veikselin '
              + 'varrella oltiin lähempänä valtakunnan keskikohtaa. Kaupungin '
              + 'vaakunassa on miekkaa ja kilpeä kantava merenneito Syrenka, ja '
              + 'hänen patsaansa seisoo yhä Vanhankaupungin torilla.\n\nPuola '
              + 'katosi Euroopan kartalta vuosiksi 1795–1918, ja Varsova kuului '
              + 'suurimman osan siitä ajasta Venäjän keisarikuntaan. Silti '
              + 'kaupunki kasvoi ja teollistui. Täällä varttui Fryderyk Chopin, '
              + 'ja täällä syntyi vuonna 1867 Maria Skłodowska, joka sai '
              + 'myöhemmin Pariisissa kaksi Nobel-palkintoa kahdelta eri '
              + 'tieteenalalta.\n\nToinen maailmansota kohteli Varsovaa '
              + 'raskaammin kuin melkein mitään muuta Euroopan kaupunkia. Saksa '
              + 'miehitti kaupungin vuonna 1939 ja sulki sen juutalaiset — noin '
              + 'kolmasosan varsovalaisista — muurien taakse ghettoon. '
              + 'Saksalaiset surmasivat heistä suurimman osan: kesällä 1942 he '
              + 'veivät ghetosta yli 250 000 ihmistä Treblinkan '
              + 'tuhoamisleirille. Ghetossa juutalaiset nousivat kapinaan '
              + 'keväällä 1943, ja koko kaupunki nousi kapinaan elokuussa 1944 '
              + '63 päivän ajaksi. Kapinan jälkeen Saksa hävitti kaupunkia '
              + 'korttelittain, ja sodan lopussa rakennuksista oli raunioina '
              + 'yli kolme neljäsosaa.\n\nKaupunki päätettiin rakentaa '
              + 'takaisin. Vanhankaupungin talot pystytettiin uudelleen '
              + 'vanhojen piirustusten ja maalausten avulla, ja työ valmistui '
              + '1953. Keskustaan nousi 1955 Kulttuuri- ja tiedepalatsi, 237 '
              + 'metriä korkea Neuvostoliiton lahja, jonka ympärille on '
              + 'sittemmin kasvanut lasitornien rivi. Varsovalaiset sanovat, '
              + 'että palatsin näköalatasanteelta on kaupungin kaunein näkymä — '
              + 'koska se on ainoa paikka, josta palatsia ei itseään näy.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on lehden ETUSIVUN LEIPÄTEKSTI — 7–10 virkkeen johdatus
   * (~700–1100 mrk) kolmessa kappaleessa ('\n\n') ja 1–3 maltillista
   * **lihavointia**; renderöijä tekee kappaleet ja boldit, joten HTML:ää
   * ei kirjoiteta tänne. Faktat ovat Bukarestin omista jo
   * tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
   * Matkailijan Bukarest, nahtavyysjutut.js, maakartat.js, oma
   * teksti-kenttä alla). teksti on ennallaan.
   */
  Bukarest: {
    intro: 'Bukarest on Romanian pääkaupunki ja Balkanin suurimpia '
             + 'kaupunkeja: asukkaita on noin 1,8 miljoonaa. Se on '
             + 'keskellä Valakian tasankoa Dâmbovița-joen varrella, eikä '
             + 'sitä suojaa vuori eikä meri — kaupunki on aina ollut '
             + 'kauppareittien risteys. Ensimmäisen kerran nimi mainitaan '
             + 'vuonna 1459 asiakirjassa, jonka allekirjoitti Valakian '
             + 'ruhtinas Vlad III; Romanian pääkaupungiksi Bukarest tuli '
             + '1862.'
             + '\n\n'
             + '1800-luvun lopulla kaupunkia rakennettiin '
             + 'Pariisin malliin: leveitä bulevardeja, ranskalaisia '
             + 'arkkitehteja ja puistoja. Siltä ajalta on **Romanian '
             + 'ateneum**, konserttitalo, johon kerättiin rahaa '
             + 'tavallisilta ihmisiltä tunnuslauseella anna yksi leu '
             + 'Ateneumille. Puistoista vanhin, Cișmigiun puutarha, '
             + 'avattiin jo 1847.'
             + '\n\n'
             + 'Maaliskuussa 1977 kaupunkia ravisteli maanjäristys, jossa '
             + 'romahti noin 33 suurta kerrostaloa. Sitä seuranneina '
             + 'vuosina hallinto purki vanhaa keskustaa ja rakensi tilalle '
             + 'betonikortteleita ja **Parlamenttipalatsin**, joka on '
             + 'maailman raskain rakennus. Vanhoja kirkkoja '
             + 'säilyi, koska insinööri Eugeniu Iordăchescu keksi työntää '
             + 'ne kiskoilla syrjään — kaikkiaan hän siirsi 29 '
             + 'rakennusta.',
    teksti: 'Kaupungin nimi tulee tarinan mukaan paimenesta nimeltä Bucur. '
              + 'Ensimmäisen kerran Bukarest mainitaan asiakirjassa vuonna '
              + '1459, jonka allekirjoitti Valakian ruhtinas Vlad Kolottaja — '
              + 'sama mies, josta myöhemmin kirjoitettiin Dracula-tarina. '
              + 'Valakian pääkaupungiksi Bukarest vakiintui 1600-luvulla ja '
              + 'koko Romanian pääkaupungiksi vuonna 1862.\n\n1800-luvun '
              + 'lopulla kaupunkia rakennettiin tietoisesti Pariisin malliin: '
              + 'leveitä bulevardeja, ranskalaisia arkkitehtejä ja puistoja. '
              + 'Siltä ajalta ovat Ateneum-konserttitalo ja lempinimi ”pikku '
              + 'Pariisi”. Vuonna 1857 Bukarest oli tiettävästi maailman '
              + 'ensimmäinen kaupunki, jonka kadut valaistiin petrolilampuin: '
              + 'lamppuja oli tuhat, ja niitä sytyttämään palkattiin oma '
              + 'ammattikuntansa.\n\nVuonna 1977 kaupunkia ravisteli voimakas '
              + 'maanjäristys, joka kaatoi kymmeniä taloja. Sitä seuranneina '
              + 'vuosina hallinto purki vanhaa keskustaa ja rakensi tilalle '
              + 'betonikortteleita ja Parlamenttipalatsin. Osa vanhoista '
              + 'kirkoista pelastettiin siirtämällä ne kiskoilla uusien talojen '
              + 'taakse — sadan metrin matka saattoi kestää '
              + 'viikkoja.\n\nJoulukuussa 1989 mielenosoitukset levisivät '
              + 'Bukarestiin, ja maan johto vaihtui muutamassa päivässä. '
              + 'Nykyään kaupungissa on rinnakkain 1700-luvun luostareita, '
              + 'ranskalaistyylisiä huviloita, sosialismin aikaisia asuintaloja '
              + 'ja lasitorneja. Puistoja on runsaasti: Herăstrău-puistossa on '
              + 'järvi ja ulkoilmamuseo, johon on koottu yli kolmesataa vanhaa '
              + 'maalaistaloa eri puolilta Romaniaa.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on lehden ETUSIVUN LEIPÄTEKSTI — 7–10 virkkeen johdatus
   * (~700–1100 mrk) kolmessa kappaleessa ('\n\n') ja 1–3 maltillista
   * **lihavointia**; renderöijä tekee kappaleet ja boldit, joten HTML:ää
   * ei kirjoiteta tänne. Faktat ovat Kiovan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan Kiova,
   * nahtavyysjutut.js, maakartat.js, oma teksti-kenttä alla).
   * SISÄLTÖLINJAUS (omistaja 20.8.2026): introssa EI nykysotaa eikä
   * nykypolitiikkaa — painopiste on Rusin ajassa, bysanttilaisessa
   * perinnössä, arkkitehtuurissa ja neutraalissa maantieteessä.
   * teksti on ennallaan.
   */
  Kiova: {
    intro: 'Kiova on Ukrainan pääkaupunki ja sen suurin kaupunki: asukkaita '
             + 'on noin kolme miljoonaa. Se on rakennettu Dnepr-joen '
             + 'jyrkälle länsirannalle, ja maasto jakoi kaupungin kahteen '
             + 'kerrokseen: ylhäällä kirkkojen ja porttien yläkaupunki, '
             + 'alhaalla joen rannassa Podil eli alakaupunki.'
             + '\n\n'
             + 'Keskiajalla Kiova johti **Kiovan Rusia**, joka ulottui '
             + 'Itämereltä Mustallemerelle, ja kristinusko otettiin '
             + 'vastaan vuonna 988. Ruhtinas Jaroslav Viisas rakennutti '
             + 'muurien pääportin eli Kultaisen portin sekä **Pyhän '
             + 'Sofian katedraalin**, joka valmistui ilmeisesti vuonna '
             + '1037. Katedraalin seinillä on Euroopan parhaiten '
             + 'säilynyt 1000-luvun mosaiikki- ja freskokokoelma sekä yli '
             + '7 000 kiveen raapustettua piirrosta ja kirjoitusta. Se ja '
             + 'Dneprin rinteen Luolaluostari kuuluvat Unescon '
             + 'maailmanperintöön vuodesta 1990.'
             + '\n\n'
             + '1800-luvulla teollistuminen kasvatti Kiovasta yhden '
             + 'keisarikunnan suurimmista kaupungeista. Arsenalnan '
             + 'metroasema on 105,5 metriä maanpinnan alapuolella, '
             + 'pitkään maailman syvin. Kaupungin epävirallinen tunnus on '
             + 'hevoskastanja, joka kukkii toukokuussa valkoisin, '
             + 'punatäpläisin kukkatertuin.',
    teksti: 'Kiovaa on kutsuttu itäslaavilaisten kaupunkien äidiksi. '
              + 'Keskiajalla se oli Kiovan Rusin keskus: valtakunnan, joka '
              + 'ulottui Itämereltä Mustallemerelle. Ruhtinas Vladimir '
              + 'käännytti asukkaat kristinuskoon vuonna 988, ja hänen poikansa '
              + 'Jaroslav Viisas rakennutti 1030-luvulla Pyhän Sofian '
              + 'katedraalin ja Kultaisen portin. Katedraalin mosaiikit ja '
              + 'freskot ovat yhä paikoillaan, lähes tuhat vuotta '
              + 'myöhemmin.\n\nDneprin rinteeseen perustettiin 1051 '
              + 'Luolaluostari. Munkit kaivoivat asuinkammionsa ja kirkkonsa '
              + 'suoraan pehmeään kallioon, ja käytävissä kuljetaan yhä '
              + 'kynttilä kädessä. Luostari ja Sofian katedraali liitettiin '
              + 'Unescon maailmanperintöluetteloon vuonna 1990.\n\n1900-luku '
              + 'oli raskas. Vuosina 1932–1933 Ukrainassa koettiin nälänhätä, '
              + 'jota kutsutaan holodomoriksi ja jonka uhriluku lasketaan '
              + 'miljoonissa. Toisessa maailmansodassa kaupungin keskusta '
              + 'tuhoutui lähes kokonaan. Vuonna 1986 räjähti Tšernobylin '
              + 'ydinvoimala runsaat sata kilometriä pohjoiseen. Ukrainasta '
              + 'tuli itsenäinen 1991, ja Maidan-aukiolla on sen jälkeen '
              + 'kokoonnuttu kahdesti vaatimaan vallanvaihtoa.\n\nVenäjä '
              + 'aloitti täysimittaisen hyökkäyksen Ukrainaan helmikuussa 2022, '
              + 'ja Kiovassa on siitä asti totuttu ilmahälytyksiin ja '
              + 'metroasemiin suojina. Silti kaupunki toimii: junat kulkevat, '
              + 'koulut opettavat, kahvilat ovat auki. Keväällä Kreštšatykin '
              + 'varren kastanjat kukkivat kuten ennenkin — kastanjanlehti on '
              + 'Kiovan vanha tunnus.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro on lehden ETUSIVUN LEIPÄTEKSTI — 7–10 virkkeen johdatus
   * (~700–1100 mrk) kolmessa kappaleessa ('\n\n') ja 1–3 maltillista
   * **lihavointia**; renderöijä tekee kappaleet ja boldit, joten HTML:ää
   * ei kirjoiteta tänne. Faktat ovat Odessan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan Odessa,
   * nahtavyysjutut.js, maakartat.js, oma teksti-kenttä alla).
   * SISÄLTÖLINJAUS (omistaja 20.8.2026): introssa EI nykysotaa eikä
   * nykypolitiikkaa — painopiste on 1800-luvun satama- ja
   * kauppakaupungissa, kulttuurissa ja arkkitehtuurissa.
   * teksti on ennallaan.
   */
  Odessa: {
    intro: 'Odessa on Ukrainan suurin satamakaupunki Mustanmeren rannalla, '
             + 'ja siellä asuu noin miljoona ihmistä. Kaupunki on nuori ja '
             + 'suunniteltu: satamalle annettiin käsky vuonna 1794 vanhan '
             + 'Hadžibein linnoituksen paikalle, ja ruutukaavan piirsi '
             + 'ranskalainen insinööri F. de Volan. Rannikko päättyy täällä '
             + 'jyrkkään törmään, jonka alla on jäätymätön lahti ja jonka '
             + 'päällä tasainen aro.'
             + '\n\n'
             + '**Vapaasatamana** Odessa eli lähes neljäkymmentä vuotta '
             + 'vuodesta 1819: tullittomuus veti kauppaa ja väkeä, ja '
             + 'sadassa vuodessa kaupungista kasvoi keisarikunnan '
             + 'neljänneksi suurin Moskovan, Pietarin ja Varsovan jälkeen. '
             + 'Väkeä muutti kymmenistä maista, ja sekoituksesta syntyi '
             + 'oma puhetapa ja oma huumori. Talot muurattiin '
             + 'simpukkakalkkikivestä, jota louhittiin suoraan kaupungin '
             + 'alta, ja käytäviä kertyi arviolta 2 500 kilometriä.'
             + '\n\n'
             + 'Merestä keskustaan nousevat **Potjomkinin portaat** '
             + 'rakennettiin vuosina 1837–1841; niiden 192 askelmaa on '
             + 'aseteltu niin, että alhaalta katsoen portaat näyttävät '
             + 'lyhyiltä. Oopperatalo avattiin 1887 ja oli kaupungin '
             + 'ensimmäinen rakennus, johon asennettiin sähkövalot.',
    teksti: 'Odessa rakennettiin turkkilaisen linnoituksen paikalle '
              + 'keisarinna Katariina II:n päätöksellä. Kadut vedettiin suoraan '
              + 'ruudukkoon, ja kaupunkia kehitti vuosina 1803–1814 '
              + 'kuvernöörinä ranskalainen herttua Armand de Richelieu, jonka '
              + 'patsas seisoo yhä portaiden yläpäässä. Vuonna 1819 Odessasta '
              + 'tehtiin vapaasatama: tullia ei peritty, ja ukrainalainen vehnä '
              + 'virtasi täältä koko Eurooppaan. Vapaasatama päättyi 1859, '
              + 'mutta viljanvienti jatkuu yhä.\n\nSataman ympärille kertyi '
              + 'väkeä joka suunnasta: ukrainalaisia, venäläisiä, '
              + 'kreikkalaisia, italialaisia, juutalaisia, bulgarialaisia. '
              + 'Sekoituksesta syntyi oma puhetapa ja oma huumori, jota '
              + 'kirjailija Isaak Babel ja laulaja Leonid Utjosov veivät '
              + 'maailmalle. Odessalaista vitsiä pidetään yhä kaupungin '
              + 'tavaramerkkinä, ja huhtikuun ensimmäisenä päivänä kaduilla '
              + 'vietetään Humorina-karnevaalia.\n\nMerestä kaupunkiin nousevat '
              + 'portaat valmistuivat 1841. Ne tulivat kuuluisiksi Sergei '
              + 'Eisensteinin elokuvasta Panssarilaiva Potemkin vuodelta 1925, '
              + 'ja siitä on peräisin myös niiden nykyinen nimi. Kaupungin alla '
              + 'kulkevat katakombit ovat maailman laajin '
              + 'kaupunkilabyrintti.\n\nUnesco otti Odessan historiallisen '
              + 'keskustan maailmanperintöluetteloon tammikuussa 2023 '
              + 'poikkeusmenettelyllä ja merkitsi sen samalla uhanalaiseksi '
              + 'Venäjän hyökkäyksen takia. Satama on sodankin aikana ollut '
              + 'Ukrainan viljanviennin tärkein portti. Kesäisin kaupunkilaiset '
              + 'menevät silti uimaan, ja Privozilla myydään kalaa niin kuin '
              + 'ennenkin.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E5 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro EI OLE ENÄÄ kahden lauseen nosto vaan lehden ETUSIVUN
   * LEIPÄTEKSTI — 7–10 virkkeen johdatus kolmessa kappaleessa ('\n\n')
   * ja kahdella maltillisella **lihavoinnilla**. Renderöijä
   * (piirraLeipateksti) tekee kappaleet ja boldit, joten tänne ei
   * kirjoiteta HTML:ää. Faktat ovat Moskovan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan
   * Moskova, maakartat.js, oma teksti-kenttä alla) — ei uusia
   * lähdehakuja.
   *
   * VENÄJÄ-LINJAUS (omistaja, Raamatun "Rajaukset ja turvalinjat"):
   * ei nykysotaa eikä nykypolitiikkaa missään muodossa. Intro pysyy
   * 1873-henkisessä historiassa, arkkitehtuurissa ja kulttuurissa;
   * vuoden 1918 pääkaupunkiasema on hallinnollinen tosiasia ilman
   * poliittista kehystä. Ei huutomerkkejä.
   */
  Moskova: {
    intro: 'Moskova on Venäjän pääkaupunki ja Euroopan väkirikkain '
             + 'kaupunki: asukkaita on noin kolmetoista miljoonaa. Se '
             + 'mainittiin kirjoituksissa ensi kerran vuonna 1147 ja syntyi '
             + 'kukkulalle Moskova-joen mutkaan: niemekettä oli helppo '
             + 'puolustaa, ja sen kärkeen rakennettiin puinen linnoitus eli '
             + 'kreml. Kaupunki kasvoi renkaina, ja purettujen muurien '
             + 'paikoille jäivät leveät kehäkadut.'
             + '\n\n'
             + '**Kremlin** nykyiset muurit muurattiin 1480- ja '
             + '1490-luvulla italialaisten arkkitehtien johdolla: '
             + 'punatiiltä riittää 2 235 metriä. Sisäpuolella on viisi '
             + 'palatsia ja neljä katedraalia, pihalla maailman suurin '
             + 'kello ja tykki, jota ei ole koskaan ammuttu. Muurin '
             + 'ulkopuolelle Punaiselle torille valmistui 1561 Pyhän '
             + 'Vasilin katedraali yhdeksine värikkäine kupoleineen.'
             + '\n\n'
             + 'Pietari Suuri siirsi pääkaupungin Pietariin 1712, ja '
             + 'Moskova jäi toiseksi kaupungiksi kahdeksi vuosisadaksi; '
             + 'vuodesta 1918 se on taas ollut pääkaupunki. **Metro** '
             + 'avattiin 1935, ja sen vanhimmat asemat tehtiin '
             + 'tarkoituksella palatsimaisiksi: marmoria, mosaiikkia ja '
             + 'kristallikruunuja kolmenkymmenen metrin syvyydessä. '
             + 'Moskova on myös venäläisen kirjallisuuden, musiikin ja '
             + 'teatterin koti — Bolshoin juuret ulottuvat vuoteen 1776.',
    teksti: 'Kremlin nykyiset muurit ja tornit rakennettiin 1480- ja '
              + '1490-luvulla, ja työn tekivät italialaiset arkkitehdit. Muuri '
              + 'on paikoin 5 ja paikoin 19 metriä korkea ja 3,5–6,5 metriä '
              + 'paksu. Sen sisällä on viisi palatsia ja neljä katedraalia; '
              + 'siellä kruunattiin tsaarit ja siellä työskentelee nykyään '
              + 'Venäjän presidentti. Muurin ulkopuolelle, Punaiselle torille, '
              + 'Iivana Julma rakennutti Vasili Autuaan kirkon, joka valmistui '
              + '1561 ja jonka yhdeksän värikästä kupolia ovat koko maan '
              + 'tunnetuin näky.\n\nPietari Suuri siirsi pääkaupungin Pietariin '
              + '1712, ja Moskova jäi toiseksi kaupungiksi kahdeksi '
              + 'vuosisadaksi. Vuonna 1812 Napoleonin armeija marssi '
              + 'kaupunkiin, joka syttyi palamaan ja tuhoutui suureksi osaksi. '
              + 'Se rakennettiin uudelleen, ja vuonna 1918 bolsevikit '
              + 'palauttivat hallituksen Moskovaan. Pääkaupunki se on siitä '
              + 'lähtien ollut.\n\nMoskovan metro avattiin 1935, ja sen '
              + 'vanhimmat asemat rakennettiin tarkoituksella palatsimaisiksi: '
              + 'marmoria, mosaiikkia, kristallikruunuja ja pronssipatsaita. '
              + 'Sotavuosina syvimmät asemat toimivat pommisuojina. Maan päällä '
              + 'kaupunki kasvaa kehinä: Kreml keskellä, sitten puistokehä, '
              + 'tulliraja ja moottoritierengas.\n\nMoskovassa syntyi suuri osa '
              + 'venäläisestä kirjallisuudesta, musiikista ja teatterista — '
              + 'Tolstoi, Tšehov, Bolshoi-teatteri. Arki kulkee omaa '
              + 'tahtiaan: metro kuljettaa miljoonia päivittäin, ja '
              + 'laskiaisviikolla paistetaan blinejä kuten aina.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  // Avain on kaupungin wiki-otsikko: fi-wikin 'Pietari' on täsmennyssivu.
  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E5 (sama linja kuin Moskovassa yllä):
   * intro on nyt etusivun leipäteksti kolmessa kappaleessa ja kahdella
   * lihavoinnilla. Faktat Pietarin omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Pietari,
   * maakartat.js, oma teksti-kenttä alla).
   *
   * VENÄJÄ-LINJAUS: ei nykysotaa eikä nykypolitiikkaa. Painopiste on
   * 1873-henkisessä historiassa ja arkkitehtuurissa — kaupungin synty,
   * kanavat, palatsit ja Eremitaaši. Piiritysvuodet jäävät intron
   * ulkopuolelle; ne kertoo teksti-kenttä ja lehden oma nosto.
   */
  'Pietari (kaupunki)': {
    intro: 'Pietari on Venäjän toiseksi suurin kaupunki, ja siellä asuu '
             + 'noin 5,6 miljoonaa ihmistä. Sitä ei ollut olemassa ennen '
             + 'vuotta 1703: Nevan suistossa oli vain matalia soisia saaria, '
             + 'kun **Pietari Suuri** aloitti rakentamisen ja antoi paikalle '
             + 'hollanninkielisen nimen Sankt Pieterburg apostoli Pietarin '
             + 'mukaan. Vuonna 1712 hän julisti keskeneräisen kaupungin '
             + 'pääkaupungiksi ja käski aatelisten muuttaa Moskovasta tänne.'
             + '\n\n'
             + 'Maa oli niin märkää, että kaduille kaivettiin ensin ojia '
             + 'veden johtamiseksi pois; ojista tuli kanavia ja kanavista '
             + 'kaupungin tuntomerkki. Arkkitehdit palkattiin Italiasta ja '
             + 'Ranskasta, ja jälki näkyy yhä suorina bulevardeina ja '
             + 'vaaleanvihreiksi, keltaisiksi ja turkooseiksi maalattuina '
             + 'palatseina. Keisarinna Elisabet rakennutti **Talvipalatsin** '
             + '1750-luvulla, ja Katariina Suuri alkoi 1764 ostaa siihen '
             + 'taidetta Euroopasta — kokoelmasta kasvoi Eremitaaši.'
             + '\n\n'
             + 'Kaupunki seisoo suiston saarilla, ja siltoja on toista '
             + 'tuhatta. Nimi on vaihtunut kolmesti: Petrograd 1914, '
             + 'Leningrad 1924 ja kansanäänestyksen jälkeen Pietari taas '
             + '1991. Pohjoisempana ei ole yhtään yli miljoonan asukkaan '
             + 'kaupunkia, ja kesäkuussa yö ei pimene täällä kunnolla '
             + 'lainkaan.',
    teksti: 'Kaupunki rakennettiin soiselle suistoalueelle, jossa ei ollut '
              + 'kaupunkia ennestään. Pietari Suuri halusi Venäjälle sataman ja '
              + '”ikkunan Eurooppaan”. Hän määräsi suon kuivaamiseen ja '
              + 'paalutukseen joka vuosi kymmeniätuhansia maaorjia eri puolilta '
              + 'valtakuntaa, ja moni heistä kuoli työmaalla. Arkkitehdit hän '
              + 'palkkasi Italiasta ja Ranskasta. Tulos näkyy yhä: suorat '
              + 'bulevardit, kanavat, kymmenet sillat ja palatsit, jotka on '
              + 'maalattu vaaleanvihreiksi, keltaisiksi ja turkooseiksi. '
              + 'Talvipalatsin rakennutti keisarinna Elisabet '
              + '1750-luvulla.\n\nKatariina Suuri alkoi vuonna 1764 ostaa '
              + 'Eurooppaan taidetta palatsinsa siipeen. Kokoelmasta kasvoi '
              + 'Eremitaaši, jossa on nykyään yli kolme miljoonaa esinettä — '
              + 'jos jokaista katsoisi minuutin, kiertoon menisi vuosia. Museo '
              + 'on yhä samassa Talvipalatsissa Nevan rannalla.\n\nKaupungin '
              + 'nimi on vaihtunut kolmesti. Ensimmäisen maailmansodan alkaessa '
              + '1914 saksalaisvivahteinen Pietari muutettiin Petrogradiksi, '
              + 'Leninin kuoltua 1924 Leningradiksi, ja kansanäänestyksen '
              + 'jälkeen 1991 takaisin Pietariksi. Leningradina kaupunki kesti '
              + 'toisessa maailmansodassa 872 päivää kestäneen piirityksen, '
              + 'joka on historian tappavin. Sen aikana säveltäjä Dmitri '
              + 'Šostakovitš kirjoitti seitsemännen sinfoniansa, ja se '
              + 'esitettiin kaupungissa kesken piirityksen.\n\nPietari on '
              + 'pohjoisin yli miljoonan asukkaan kaupunki maailmassa. '
              + 'Kesäkuussa aurinko ei laske kunnolla lainkaan, ja valkeiden '
              + 'öiden aikaan kaupunkilaiset ovat ulkona läpi yön katsomassa, '
              + 'kun Nevan sillat nostetaan pystyyn laivoja varten.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E5 (sama linja kuin Moskovassa yllä):
   * intro on etusivun leipäteksti kolmessa kappaleessa ja kahdella
   * lihavoinnilla. Faktat Tallinnan omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijan
   * Tallinna, maakartat.js, oma teksti-kenttä alla). Tornien
   * lukumäärä jätettiin pois: vanha intro sanoi 26 ja kohdekartan
   * esittely 28, eikä lukua ole tarkistettu — muurin pituus
   * ("lähes kaksi kilometriä") riittää. Neuvostoaika kerrotaan
   * neutraalina historiana.
   */
  Tallinna: {
    intro: 'Tallinna on Viron pääkaupunki Suomenlahden etelärannalla, '
             + 'noin kahdeksankymmenen kilometrin päässä Helsingistä. Se '
             + 'syntyi suojaisan lahden ja Toompean kalkkikivikallion '
             + 'väliin: kalliolle nousi linna ja sen juurelle kauppiaiden '
             + 'kaupunki. Tanskan kuningas valtasi mäen 1219, ja nimi tulee '
             + 'luultavasti sanoista Taani linn, tanskalaisten kaupunki.'
             + '\n\n'
             + 'Vuonna 1285 Reval oli jo hansakaupunki, jonka kauppiaat '
             + 'välittivät suolaa, silliä ja vahaa lännen ja Novgorodin '
             + 'välillä. **Vanhakaupunki** on Pohjois-Euroopan parhaiten '
             + 'säilyneitä keskiaikaisia keskustoja, ja muuria on siitä '
             + 'jäljellä lähes kaksi kilometriä. Raatihuoneen tornin '
             + 'huipulla kääntyy Vana Toomas, sotilaaksi puettu tuuliviiri, '
             + 'josta on merkintä jo vuoden 1530 tilikirjassa.'
             + '\n\n'
             + 'Kaupunki oli vuosisatoja kaksi kaupunkia — ylhäällä '
             + 'Toompean herrat, alhaalla kauppiaiden raati — ja osat '
             + 'yhdistettiin vasta 1878. Viro itsenäistyi 1918, oli '
             + 'miehitettynä vuodesta 1940 ja sai itsenäisyytensä takaisin '
             + '1991; syyskuussa 1988 **laulukentälle** kokoontui arviolta '
             + '300 000 ihmistä laulamaan. Muurien takana alkaa toinen '
             + 'kaupunki: Kalamajan puutalot ja idän betonilähiöt, joissa '
             + 'asuu neljäsosa kaupunkilaisista.',
    teksti: 'Tanskan kuningas valtasi meren rannalla kohoavan mäen vuonna '
              + '1219. Nimi Tallinn tulee luultavasti sanoista Taani linn, '
              + 'tanskalaisten kaupunki. Jo vuonna 1285 Reval oli Hansaliiton '
              + 'jäsen, ja sen kauppiaat välittivät suolaa, silliä ja vahaa '
              + 'lännen ja Novgorodin välillä.\n\nVanhakaupunki jakautuu yhä '
              + 'kahteen osaan. Ylhäällä Toompean kalliolla asuivat piispa ja '
              + 'aatelisto, alhaalla kauppiaat ja käsityöläiset. Osien välissä '
              + 'oli portti, joka suljettiin öisin — kaupungit riitelivät '
              + 'keskenään niin usein, että se oli tarpeen.\n\nViro itsenäistyi '
              + '1918. Neuvostoliitto miehitti maan 1940 ja kuljetti '
              + 'kymmeniätuhansia virolaisia pakolla Siperiaan. Saksa miehitti '
              + 'Viron vuosina 1941–1944, minkä jälkeen Neuvostoliitto palasi, '
              + 'ja itsenäisyys saatiin takaisin vasta 1991. Miehitysvuosina '
              + 'pidettiin laulujuhlia, joissa laulettiin sanoja, joita ei '
              + 'olisi saanut laulaa. Elokuun 23. päivänä 1989 noin kaksi '
              + 'miljoonaa virolaista, latvialaista ja liettualaista muodosti '
              + '675 kilometrin ihmisketjun Tallinnasta Riian kautta Vilnaan. '
              + 'Se oli maailman pisin ketju, jonka ihmiset ovat tehneet käsi '
              + 'kädessä.\n\nNykyään Tallinnassa asuu noin 460 000 ihmistä. '
              + 'Satamasta lähtee laivoja Helsinkiin useita kertoja päivässä, '
              + 'ja kaupungin ulkopuolella on ohjelmistoyrityksiä, joissa on '
              + 'kehitetty muun muassa Skype. Vanhassakaupungissa taas myydään '
              + 'yhä samaa asiaa kuin Hansan aikaan: kaikkea mitä ohikulkijalle '
              + 'voi myydä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E5 (sama linja kuin Moskovassa yllä).
   * Faktat Riian omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Riika,
   * maakartat.js, oma teksti-kenttä alla). Neuvostoaika neutraalina
   * historiana.
   */
  Riika: {
    intro: 'Riika on Latvian pääkaupunki ja Baltian suurin kaupunki: '
             + 'asukkaita on noin 600 000. Se kasvoi Väinäjoen suulle, '
             + 'sillä leveää ja syvää jokea pitkin pääsi laivalla '
             + 'sisämaahan asti. Piispa Albert perusti kaupungin vuonna '
             + '1201, se liittyi Hansaliittoon 1282 ja rikastui viljasta, '
             + 'pellavasta ja hirsistä. Riian yli hallitsivat vuorollaan '
             + 'saksalaiset ritarit, Puola, Ruotsi ja Venäjä.'
             + '\n\n'
             + '**Vanhassakaupungissa** talot ovat kapeita ja korkeita, '
             + 'koska tontista maksettiin leveyden mukaan. Keskiaikainen '
             + 'muuri purettiin 1800-luvulla, eikä sen paikalle rakennettu '
             + 'taloja vaan puisto ja kanava. 1900-luvun vaihteessa Riika '
             + 'kasvoi nopeammin kuin melkein mikään muu Euroopan '
             + 'kaupunki, ja uusiin kortteleihin nousi **jugendtaloja**, '
             + 'joita on säilynyt yli seitsemänsataa.'
             + '\n\n'
             + 'Ensimmäinen maailmansota katkaisi kasvun: väkiluku romahti '
             + '517 500:sta alle 190 000:een, kun tehtaat ja väki '
             + 'evakuoitiin itään. Latvia itsenäistyi 1918, ja keskustaan '
             + 'pystytettiin 1935 kansalaisten keräämillä rahoilla 42 '
             + 'metriä korkea Vapaudenpatsas; itsenäisyys palasi 1991. '
             + 'Joka viides vuosi kaupungin laulukentälle kokoontuu noin '
             + '40 000 esiintyjää laulujuhliin, joita on pidetty vuodesta '
             + '1873.',
    teksti: 'Piispa Albert perusti Riian 1201 lähetysasemaksi ja '
              + 'kauppapaikaksi. Kaupunki liittyi Hansaan ja rikastui viljasta, '
              + 'pellavasta ja hirsistä, joita Daugavaa pitkin uitettiin '
              + 'sisämaasta. Riian yli hallitsivat vuorollaan saksalaiset '
              + 'ritarit, Puola, Ruotsi ja Venäjä — kaupungin kirjeenvaihtoa '
              + 'käytiin vuosisatoja saksaksi, vaikka torilla puhuttiin '
              + 'latviaa.\n\n1900-luvun vaihteessa Riika kasvoi nopeammin kuin '
              + 'melkein mikään muu kaupunki Euroopassa, ja uusiin kortteleihin '
              + 'rakennettiin jugendtaloja. Niitä on säilynyt yli '
              + 'seitsemänsataa, ja ne muodostavat yhden maailman tiheimmistä '
              + 'jugendkeskittymistä. Alberta-kadulla julkisivuja koristavat '
              + 'kivikasvot, jotka arkkitehti Mihails Eizenšteins '
              + 'suunnitteli.\n\nLatvia itsenäistyi 1918. Vapaudenpatsas '
              + 'pystytettiin Riian keskustaan 1935 kansalaisten keräämillä '
              + 'rahoilla: 42 metriä korkea, ja huipulla seisova nainen '
              + 'kannattelee kolmea tähteä, yhtä kutakin maan historiallista '
              + 'maakuntaa kohti. Miehityksen vuosina patsas jäi paikalleen, '
              + 'mutta sen luo ei saanut viedä kukkia.\n\nLatvia sai '
              + 'itsenäisyytensä takaisin 1991. Nykyään Riiassa puhutaan '
              + 'latviaa ja venäjää rinnakkain: runsas kolmasosa asukkaista on '
              + 'venäjänkielisiä. Kaupunki elää satamasta, palveluista ja '
              + 'matkailusta, ja joka viides vuosi sen laulukentälle kokoontuu '
              + 'noin 40 000 esiintyjää laulujuhliin, joita on pidetty vuodesta '
              + '1873.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E5 (sama linja kuin Moskovassa yllä).
   * Faktat Vilnan omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot ja Matkailijan Vilna,
   * maakartat.js, oma teksti-kenttä alla). Neuvostoaika neutraalina
   * historiana; juutalaisyhteisön kohtalo kerrotaan yhtä tiiviisti
   * kuin teksti-kentässä, koska se on kaupungin historian ydintä.
   */
  Vilna: {
    intro: 'Vilna eli Vilnius on Liettuan pääkaupunki, jossa asuu noin '
             + '600 000 ihmistä. Se on rakennettu kahden joen '
             + 'yhtymäkohtaan kukkuloiden väliin ja saanut nimensä '
             + 'pienemmästä joesta, Vilniasta. Jokien väliin jäävällä '
             + 'kukkulalla seisoo linnan torni, josta kaupunki '
             + '1300-luvulla alkoi.'
             + '\n\n'
             + 'Vilna mainitaan ensi kerran 1323 suuriruhtinas '
             + 'Gediminaksen kirjeissä: niissä hän kutsui kauppiaita ja '
             + 'käsityöläisiä ja lupasi jokaiselle oikeuden omaan '
             + 'uskontoonsa. Kutsu toimi, ja **vanhastakaupungista** '
             + 'kasvoi yksi Pohjois-Euroopan laajimmista keskiaikaisista '
             + 'keskustoista: yli kolmesataa hehtaaria kujia ja '
             + 'toistasataa kirkkoa. Liettua oli 1400-luvulla Euroopan '
             + 'laajin valtio, mutta 1795 alue joutui Venäjän '
             + 'keisarikuntaan, ja liettuan painaminen latinalaisin '
             + 'kirjaimin oli kiellettyä 1865–1904.'
             + '\n\n'
             + '**Yliopisto** perustettiin 1579, ja se on Baltian vanhin. '
             + 'Vilnaa sanottiin pohjoisen Jerusalemiksi: ennen toista '
             + 'maailmansotaa noin kolmasosa asukkaista oli juutalaisia, '
             + 'ja Saksan miehityksen aikana lähes koko yhteisö '
             + 'surmattiin. Liettua julistautui itsenäiseksi 1990 '
             + 'ensimmäisenä neuvostotasavaltana, ja nykyään Vilna on '
             + 'vilkas yliopistokaupunki, jonka pinta-alasta lähes '
             + 'seitsemänkymmentä prosenttia on viheraluetta.',
    teksti: 'Vilna mainitaan ensimmäisen kerran 1323 suuriruhtinas '
              + 'Gediminaksen kirjeissä. Hän kutsui niissä kauppiaita ja '
              + 'käsityöläisiä muualta Euroopasta ja lupasi, että jokainen saa '
              + 'harjoittaa omaa uskontoaan. Kutsu toimi: kaupunkiin muutti '
              + 'saksalaisia, puolalaisia, juutalaisia, tataareja ja '
              + 'karaiimeja.\n\nLiettuan suuriruhtinaskunta oli 1400-luvulla '
              + 'Euroopan laajin valtio, ja se ulottui Itämereltä '
              + 'Mustallemerelle. Myöhemmin Liettua yhdistyi Puolaan, ja 1795 '
              + 'alue joutui Venäjän keisarikuntaan. Kapinoiden jälkeen '
              + 'liettuan kielen painaminen latinalaisin kirjaimin kiellettiin '
              + 'vuosiksi 1865–1904. Kirjoja painettiin Itä-Preussissa ja '
              + 'salakuljetettiin rajan yli; salakuljettajia kutsuttiin '
              + 'kirjankantajiksi.\n\nVilnaa sanottiin pohjoisen Jerusalemiksi. '
              + 'Ennen toista maailmansotaa noin kolmasosa kaupungin asukkaista '
              + 'oli juutalaisia, ja kaupungissa oli yli sata synagogaa ja '
              + 'rukoushuonetta. Saksan miehityksen aikana lähes koko yhteisö '
              + 'surmattiin. Vanhankaupungin laidalla kulkee yhä katuja, joiden '
              + 'nimet ovat jäljellä, vaikka niiden asukkaat eivät '
              + 'ole.\n\nLiettua julistautui itsenäiseksi 11. maaliskuuta 1990 '
              + 'ensimmäisenä neuvostotasavaltana. Tammikuussa 1991 ihmiset '
              + 'asettuivat suojaamaan televisiotornia ja parlamenttia, ja '
              + 'neljätoista heistä kuoli. Nykyään Vilna on vilkas '
              + 'yliopistokaupunki: yliopisto perustettiin 1579, ja se on '
              + 'Baltian vanhin.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ R6 (Raamattu, "TEKSTIEN PAINOPISTE"):
   * intro EI OLE ENÄÄ kahden lauseen nosto vaan lehden ETUSIVUN
   * LEIPÄTEKSTI — 7–10 virkkeen johdatus (~700–1100 mrk) kolmessa
   * kappaleessa ('\n\n') ja 1–3 maltillista **lihavointia**.
   * Renderöijä (piirraLeipateksti) tekee kappaleet ja boldit, joten
   * tänne ei kirjoiteta HTML:ää. Faktat ovat Istanbulin omista jo
   * tarkistetuista teksteistä (kulttuuri-kategoriat.js: nostot ja
   * Matkailijan Istanbul, maakartat.js, oma teksti-kenttä alla) sekä
   * en-Wikipedian Istanbul-artikkelin väestö- ja mannerosuuksista.
   * Sisältölinjaus: ei nykypolitiikkaa. teksti on ennallaan.
   */
  Istanbul: {
    intro: 'Istanbul on Turkin suurin kaupunki ja maan talouden ja '
             + 'kulttuurin keskus: siellä asuu noin kuusitoista miljoonaa '
             + 'ihmistä, lähes viidennes koko maan väestöstä. Se on maailman '
             + 'ainoa suurkaupunki kahdella mantereella — **Bosporinsalmi** '
             + 'jakaa sen Euroopan ja Aasian puoleen, ja kaksi kolmasosaa '
             + 'asukkaista asuu Euroopan puolella. Kreikkalaiset perustivat '
             + 'salmen suulle Byzantionin 600-luvulla eaa., ja paikka '
             + 'valittiin veden takia: niemellä on vettä kolmella sivulla ja '
             + 'sen pohjoispuolella Kultaisen sarven luonnonsatama.'
             + '\n\n'
             + 'Vuonna 330 keisari Konstantinus teki kaupungista Rooman '
             + 'valtakunnan uuden pääkaupungin, ja se oli tuhannen vuoden '
             + 'ajan kristikunnan suurin kaupunki. Vuonna 537 valmistui '
             + '**Hagia Sofia**, joka on ollut vuorollaan kirkko, moskeija, '
             + 'museo ja jälleen moskeija. Osmanisulttaani Mehmet II valtasi '
             + 'kaupungin 1453; Turkin tasavallan pääkaupungiksi tuli 1923 '
             + 'Ankara, mutta Istanbul pysyi maan suurimpana.'
             + '\n\n'
             + 'Vanhankaupungin historialliset alueet kuuluvat Unescon '
             + 'maailmanperintöön, ja mantereelta toiselle pääsee siltaa, '
             + 'lauttaa tai metroa pitkin: vuonna 2013 avattu '
             + 'Marmaray-tunneli kulkee salmen ali merenpohjassa.',
    teksti: 'Kaupungin perustivat kreikkalaiset noin 660 eaa. ja nimesivät '
              + 'sen Byzantioniksi. Vuonna 330 keisari Konstantinus teki siitä '
              + 'Rooman valtakunnan uuden pääkaupungin, ja nimeksi tuli '
              + 'Konstantinopoli. Se oli tuhannen vuoden ajan kristikunnan '
              + 'suurin kaupunki.\n\nVuonna 537 valmistui Hagia Sofia, jonka '
              + 'kupoli on halkaisijaltaan 31 metriä. Sitä pidettiin lähes '
              + 'tuhat vuotta maailman suurimpana rakennuksena kupolin alla. '
              + 'Rakennus on ollut vuorollaan kirkko, moskeija, museo ja '
              + 'jälleen moskeija.\n\nOttomaanisulttaani Mehmet II valtasi '
              + 'kaupungin 1453 kahden kuukauden piirityksen jälkeen. Siitä '
              + 'tuli ottomaanivaltakunnan pääkaupunki, ja sinne rakennettiin '
              + 'Topkapin palatsi ja katettu basaari, jossa on yhä noin '
              + 'neljätuhatta myymälää. Turkin tasavallan pääkaupungiksi tuli '
              + '1923 Ankara, mutta Istanbul pysyi maan suurimpana '
              + 'kaupunkina.\n\nManterelta toiselle pääsee kolmea siltaa, '
              + 'lauttaa tai metroa pitkin. Marmaray-tunneli avattiin 2013, ja '
              + 'sen putki lepää merenpohjassa noin 60 metriä pinnan alla. '
              + 'Rakennustöissä löytyi Theodosiuksen satama ja siitä 37 '
              + 'hukkunutta laivaa — työt viivästyivät neljä vuotta, koska '
              + 'arkeologit kaivoivat ensin.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E4 (Raamattu "TEKSTIEN PAINOPISTE" ja
   * Fablen eräohje; malli asia-artikkelit.js Medina/Mekka): intro EI ole
   * enää kahden virkkeen nosto vaan lehden ETUSIVUN LEIPÄTEKSTI —
   * 7-10 virkettä kolmessa kappaleessa ('\n\n') ja pari maltillista
   * **lihavointia**. Faktat ovat kaupungin omista jo tarkistetuista
   * teksteistä (kulttuuri-kategoriat.js: nostot ja Matkailijalle-opas;
   * maakartat.js; tämän tiedoston teksti-kenttä), ei uusista lähteistä.
   * teksti-kenttä ja lähderivi ovat ennallaan.
   */
  Helsinki: {
    intro: 'Helsinki on Suomen pääkaupunki ja suurin kaupunki; seudulla '
             + 'asuu noin 1,5 miljoonaa ihmistä. Kustaa Vaasa perusti sen '
             + '1550 Vantaanjoen suulle Tallinnan kilpailijaksi, mutta '
             + 'satama jäi matalaksi, ja 1640 koko kaupunki siirrettiin '
             + 'viisi kilometriä etelämmäs Vironniemelle. Pikkukaupungista '
             + 'tuli pääkaupunki vasta 1812, kun Suomesta oli tullut '
             + 'Venäjän suuriruhtinaskunta.'
             + '\n\n'
             + 'Uusi keskusta nousi Senaatintorin ympärille **Carl Ludvig '
             + 'Engelin** piirustusten mukaan, ja vaalea empire muistuttaa '
             + 'yhä Pietaria — kylmän sodan aikana tänne tultiin kuvaamaan '
             + 'Neuvostoliittoa. Merta on joka suunnalla: saaria on noin '
             + '330 ja rantaviivaa yli sata kilometriä, ja talvella '
             + 'jäänmurtajat pitävät väylät auki. Edustalla on '
             + '**Suomenlinna**, vuonna 1748 aloitettu merilinnoitus, jossa '
             + 'asuu yhä noin 800 ihmistä.'
             + '\n\n'
             + 'Kaupunki on kaksikielinen: kadunnimet ovat suomeksi ja '
             + 'ruotsiksi, ja ruotsinkielisiä on nykyään noin viisi '
             + 'prosenttia. Tunnetuinta on muotoilu ja julkinen '
             + 'rakentaminen: Finlandia-talo, kallioon louhittu '
             + 'Temppeliaukion kirkko ja keskustakirjasto Oodi. '
             + 'Raitiovaunut ovat kulkeneet kaduilla vuodesta 1891.',
    teksti: 'Keskusta rakennettiin uudelleen 1800-luvun alussa, kun '
              + 'Suomesta oli tullut Venäjän suuriruhtinaskunta. Arkkitehti '
              + 'Carl Ludvig Engel piirsi Senaatintorin ympärille kirkon, '
              + 'yliopiston ja hallituksen talon — vaalean empirekaupungin, '
              + 'joka muistuttaa Pietaria. Siksi Helsingissä on kuvattu '
              + 'elokuvia, joiden piti tapahtua Neuvostoliitossa.\n\nMeri on '
              + 'kaikkialla. Kaupungin alueella on noin 330 saarta ja yli sata '
              + 'kilometriä rantaviivaa. Edustalla on Suomenlinna, vuonna 1748 '
              + 'aloitettu merilinnoitus, jonne mennään lautalla ja jossa asuu '
              + 'edelleen noin 800 ihmistä. Talvella meri jäätyy, ja '
              + 'jäänmurtajat pitävät väylät auki.\n\nHelsinki on '
              + 'kaksikielinen: kadunnimet ovat suomeksi ja ruotsiksi. '
              + '1800-luvulla enemmistö puhui ruotsia, nykyään ruotsinkielisiä '
              + 'on noin viisi prosenttia asukkaista. Muuta kuin suomea tai '
              + 'ruotsia äidinkielenään puhuvia on jo yli viidennes, ja '
              + 'yleisimpiä ovat venäjä, viro, somali ja arabia.\n\nKaupunki '
              + 'tunnetaan muotoilusta ja julkisista rakennuksista: Alvar '
              + 'Aallon Finlandia-talo, kallioon louhittu Temppeliaukion kirkko '
              + 'ja keskustakirjasto Oodi, joka valittiin 2019 maailman '
              + 'parhaaksi uudeksi kirjastoksi. Oodissa kävi ensimmäisenä '
              + 'vuonna noin kolme miljoonaa ihmistä, ja sieltä voi lainata '
              + 'kirjan lisäksi ompelukoneen tai soittimen.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E4 — sama linja kuin Helsingissä
   * yllä: intro on nyt etusivun leipäteksti kappaleineen ja
   * maltillisine lihavointeineen, faktat kaupungin omista jo
   * tarkistetuista teksteistä.
   */
  Tampere: {
    intro: 'Tampere on Pohjoismaiden suurin sisämaakaupunki ja Suomen '
             + 'kolmanneksi väkirikkain: seudulla asuu noin 400 000 '
             + 'ihmistä. Kaupunki seisoo kannaksella Näsijärven ja '
             + 'Pyhäjärven välissä, ja järvien kahdeksantoista metrin '
             + 'korkeusero purkautuu keskustan halki **Tammerkoskena**. '
             + 'Kustaa III antoi kauppapaikalle kaupunkioikeudet 1779, '
             + 'mutta ratkaisevat olivat vasta vuoden 1821 '
             + 'vapaakaupunkioikeudet: tavaraa sai tuoda tullitta, ja '
             + 'tehtailijoiden kannatti tulla juuri tänne.'
             + '\n\n'
             + 'Ensimmäisenä tuli skotlantilainen **James Finlayson**, joka '
             + 'rakensi kosken länsirannalle konepajan 1820. Uudet '
             + 'omistajat käänsivät sen puuvillatehtaaksi, joka työllisti '
             + 'vuosisadan lopulla tuhansia, enimmäkseen naisia ja lapsia. '
             + 'Verkatehtaat, paperitehdas ja konepajat seurasivat, ja '
             + 'kaupungille vakiintui liikanimi Pohjolan Manchester.'
             + '\n\n'
             + 'Tehtaat ovat siirtyneet muualle, mutta punatiiliset '
             + 'rakennukset jäivät paikoilleen museoiksi ja ravintoloiksi. '
             + 'Länsipuolella kohoaa Pyynikinharju, maailman korkein '
             + 'pitkittäisharju. Vuonna 1971 avattu 168-metrinen Näsinneula '
             + 'on yhä maan korkein näkötorni, ja raitiovaunut tulivat '
             + 'kaupunkiin 2021.',
    teksti: 'Ruotsin kuningas Kustaa III antoi Tammerkosken partaalla '
              + 'olleelle kauppapaikalle kaupunkioikeudet 1. lokakuuta 1779. '
              + 'Ratkaiseva etu tuli kuitenkin vasta 1821, kun kaupunki sai '
              + 'vapaakaupunkioikeudet: tavaraa sai tuoda tullitta, ja '
              + 'tehtailijoiden kannatti asettua juuri tänne. Koski putoaa '
              + 'noin kahdeksantoista metriä Näsijärvestä Pyhäjärveen, ja '
              + 'ennen sähköä sen voima otettiin talteen vesipyörillä ja '
              + 'turbiineilla aivan tehdassalin vieressä.\n\nSkotlantilainen '
              + 'James Finlayson perusti kosken länsirannalle konepajan 1820, '
              + 'ja siitä kasvoi puuvillatehdas, joka oli 1800-luvun lopulla '
              + 'Pohjoismaiden suurin teollisuuslaitos. Verkatehtaat, '
              + 'paperitehdas ja konepajat seurasivat perässä, ja kaupunkia '
              + 'alettiin kutsua Pohjolan Manchesteriksi. Finlaysonin '
              + 'kutomosaliin sytytettiin sähkövalot maaliskuussa 1882 — '
              + 'ensimmäisenä koko Pohjolassa.\n\nTehtaat ovat siirtyneet '
              + 'muualle, mutta punatiiliset rakennukset ovat jääneet. '
              + 'Finlaysonin ja Tampellan alueilla on nyt museoita, '
              + 'elokuvateatteri, ravintoloita ja toimistoja, ja niiden '
              + 'välissä koski kohisee entiseen tapaan. Kosken yli kaartuu '
              + 'Hämeensilta, jonka kaiteilla seisoo neljä Wäinö Aaltosen '
              + 'veistosta vuodelta 1929; itse silta uusittiin 2019 vanhan '
              + 'kivisillan näköiseksi. Vuonna 1971 avattu 168-metrinen '
              + 'Näsinneula on yhä Suomen korkein näkötorni, ja '
              + 'raitiovaunut tulivat kaupunkiin 2021.\n\nKaupungin '
              + 'länsipuolella kohoaa Pyynikinharju, maailman korkein '
              + 'pitkittäisharju: sen laki on 160 metriä merenpinnasta ja '
              + '80 metriä Pyhäjärveä ylempänä. Harjun päällä on vuonna '
              + '1929 rakennettu 26-metrinen punagraniittinen näkötorni, '
              + 'jonka kahvilan munkit ovat oma nähtävyytensä. '
              + 'Harjun rinteillä on Pispalan puutalokaupunginosa, jossa '
              + 'toimii Rajaportin sauna vuodelta 1906 — Suomen vanhin yhä '
              + 'lämpiävä yleinen sauna.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E4 — sama linja kuin Helsingissä
   * yllä: intro on nyt etusivun leipäteksti kappaleineen ja
   * maltillisine lihavointeineen, faktat kaupungin omista jo
   * tarkistetuista teksteistä.
   */
  Tukholma: {
    intro: 'Tukholma on Ruotsin pääkaupunki ja Pohjoismaiden suurin '
             + 'kaupunki: kunnassa asuu noin miljoona ja kaupunkiseudulla '
             + '1,6 miljoonaa ihmistä. Se on rakennettu neljälletoista '
             + 'saarelle kapeikkoon, jossa Mälaren purkautuu Itämereen; '
             + 'nimi tarkoittaa suunnilleen paalusaarta. Vuonna 1252 '
             + 'perustettu kaupunki sai merkityksensä väylästä: salmeen '
             + 'lyödyt paalut pysäyttivät vieraat laivat ennen järveä.'
             + '\n\n'
             + 'Vanhin osa on **Gamla stan**, pääosin yksi saari, jonka '
             + 'kujat kiertelevät kuten keskiajalla; vuoteen 1980 asti sen '
             + 'virallinen nimi oli Staden mellan broarna, kaupunki '
             + 'siltojen välissä. Keskustan itäpuolella alkaa saaristo, '
             + 'jossa on yli 24 000 saarta ja luotoa, ja sen murtovesi on '
             + 'niin vähäsuolaista, ettei se maistu merivedeltä.'
             + '\n\n'
             + 'Ruotsi ei ole ollut sodassa vuoden 1814 jälkeen, ja sotien '
             + 'jälkeen maa rakensi kansankodiksi kutsuttua '
             + 'hyvinvointivaltiota. Joka vuosi 10. joulukuuta kaupungissa '
             + 'jaetaan **Nobel-palkinnot**, ja juhlaillallinen katetaan '
             + 'kaupungintalon Siniseen saliin 1 300 hengelle. Vesi on '
             + 'tukholmalaisille arkea: keskustassa saa uida, sillä '
             + 'jätevedet on puhdistettu 1930-luvulta asti.',
    teksti: 'Kaupunki syntyi 1200-luvulla salpaamaan laivaväylän järvelle: '
              + 'kuka hallitsi salmea, hallitsi kauppaa. Vanhinta osaa '
              + 'kutsutaan nimellä Gamla stan, ja sen kujat ovat yhä '
              + 'keskiaikaisessa mitassaan. Kapein niistä, Mårten Trotzigs '
              + 'gränd, on ahtaimmalta kohdaltaan 90 senttiä leveä.\n\nRuotsi '
              + 'ei ole ollut sodassa vuoden 1814 jälkeen. Se pysyi '
              + 'puolueettomana molemmissa maailmansodissa ja rakensi niiden '
              + 'jälkeen hyvinvointivaltiota, jota kutsuttiin kansankodiksi: '
              + 'koulu, sairaanhoito ja eläke kuuluivat kaikille. Naton '
              + 'jäseneksi maa liittyi vasta vuonna 2024.\n\nJoka vuosi 10. '
              + 'joulukuuta Tukholmassa jaetaan Nobel-palkinnot. Alfred Nobel '
              + 'oli ruotsalainen kemisti, joka keksi dynamiitin ja määräsi '
              + 'testamentissaan omaisuutensa palkintorahastoksi. '
              + 'Juhlaillallinen katetaan kaupungintalon Siniseen saliin noin 1 '
              + '300 hengelle. Rauhanpalkinto jaetaan samana päivänä Oslossa — '
              + 'niin Nobel testamentissaan määräsi.\n\nVesi on '
              + 'tukholmalaisille arkea eikä maisemaa. Keskustassa saa uida, ja '
              + 'kaupungintalon edustalla nostetaan lohta vavalla. Se on '
              + 'mahdollista, koska kaupunki alkoi puhdistaa jätevetensä jo '
              + '1930-luvulla ja on jatkanut siitä lähtien; virtaava Norrström '
              + 'pysyy sulana talvellakin.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E4 — sama linja kuin Helsingissä
   * yllä: intro on nyt etusivun leipäteksti kappaleineen ja
   * maltillisine lihavointeineen, faktat kaupungin omista jo
   * tarkistetuista teksteistä.
   */
  Oslo: {
    intro: 'Oslo on Norjan pääkaupunki ja suurin kaupunki; sen '
             + 'viidessätoista kaupunginosassa asuu runsaat 717 000 '
             + 'ihmistä. Kaupunki on Oslovuonon pohjukassa, siinä missä '
             + 'vuono loppuu ja metsäiset kukkulat alkavat. Rajojen sisällä '
             + 'on 301 neliökilometriä metsää, 343 järveä ja 40 saarta, ja '
             + 'metsäalueella asuu vain 1 610 ihmistä — **metsä ja vesi '
             + 'ovat kaupunkia**, eivät sen ulkopuolta.'
             + '\n\n'
             + 'Asutus alkoi vuonon rannalla noin vuonna 1040. Vuoden 1624 '
             + 'palon jälkeen Tanskan kuningas Kristian IV siirsi kaupungin '
             + 'linnoituksen kupeeseen ja nimesi sen itsensä mukaan '
             + 'Christianiaksi; vanha nimi palautettiin vasta 1925. Norja '
             + 'kuului Tanskaan yli neljäsataa vuotta ja sen jälkeen '
             + 'unioniin Ruotsin kanssa, joka purettiin rauhanomaisesti '
             + '1905.'
             + '\n\n'
             + 'Öljy muutti maan: Ekofiskin kentältä löytyi öljyä 1969, ja '
             + 'tuotot päätettiin siirtää rahastoon. Pääkaupunki laati 2017 '
             + 'maailman ensimmäisen kaupungin **ilmastobudjetin**, ja '
             + 'kunnassa rekisteröidyistä autoista 41 prosenttia on '
             + 'täyssähköisiä. Nobelin rauhanpalkinto luovutetaan joka 10. '
             + 'joulukuuta Oslon kaupungintalossa — niin Alfred Nobel '
             + 'testamentissaan määräsi.',
    teksti: 'Oslo perustettiin noin vuonna 1040 vuonon rantaan. Kun '
              + 'kaupunki paloi 1624, Tanskan kuningas Kristian IV rakennutti '
              + 'sen uudelleen linnoituksen kupeeseen ja antoi sille oman '
              + 'nimensä, Christiania. Vanha nimi palautettiin vasta 1925, kun '
              + 'Norja oli jo itsenäinen.\n\nNorja kuului Tanskaan yli '
              + 'neljäsataa vuotta ja sen jälkeen unioniin Ruotsin kanssa. Oma '
              + 'perustuslaki kirjoitettiin Eidsvollissa 17. toukokuuta 1814, '
              + 'ja se päivä on yhä kansallispäivä: silloin koululaiset '
              + 'marssivat kulkueessa kuninkaanlinnan ohi, ja kuningasperhe '
              + 'seisoo parvekkeella vilkuttamassa. Unioni Ruotsin kanssa '
              + 'purettiin rauhanomaisesti 1905.\n\nÖljy muutti maan. Ekofiskin '
              + 'kentältä löytyi öljyä 1969, ja valtio päätti, ettei tuottoja '
              + 'käytetä heti: ne siirretään rahastoon, joka on nykyään '
              + 'maailman suurin valtiollinen sijoitusrahasto. Ajatuksena on, '
              + 'että öljystä hyötyisivät myös ne, jotka syntyvät sen '
              + 'loputtua.\n\nNobelin rauhanpalkinto jaetaan Oslossa eikä '
              + 'Tukholmassa. Alfred Nobel määräsi testamentissaan, että '
              + 'rauhanpalkinnon valitsee Norjan suurkäräjien nimittämä '
              + 'komitea; syytä hän ei kirjoittanut näkyviin. Palkinto '
              + 'luovutetaan joka vuosi 10. joulukuuta Oslon kaupungintalossa.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, ERÄ E4 — sama linja kuin Helsingissä
   * yllä: intro on nyt etusivun leipäteksti kappaleineen ja
   * maltillisine lihavointeineen, faktat kaupungin omista jo
   * tarkistetuista teksteistä.
   */
  Kööpenhamina: {
    intro: 'Kööpenhamina on Tanskan pääkaupunki Sjællandin saarella, '
             + 'aivan Ruotsin rannikon tuntumassa; nimi tarkoittaa '
             + 'kauppasatamaa. Seudulla asuu noin 1,4 miljoonaa ihmistä, ja '
             + 'kaupunki on maan hallinnon ja kaupan keskus. Alku oli '
             + 'kalastajakylä, jonka viereen piispa Absalon rakennutti '
             + '1100-luvulla linnoituksen keskelle salmea — tästä on lyhin '
             + 'matka Skånen puolelle, ja kaikki Itämerelle menevä '
             + 'laivaliikenne kulkee ohi.'
             + '\n\n'
             + 'Kaupunki on matala ja rakennettu veden ehdoilla: kanavia '
             + 'kaivettiin sinne missä niitä tarvittiin, ja vanhat '
             + 'vallihaudat ovat nyt järviä keskellä kaupunkia. **Tivoli** '
             + 'avattiin vallihaudan ulkopuolelle vuonna 1843 ja toimii '
             + 'yhä. Isoisän matkan aikaan asukkaita oli jo yli '
             + 'satatuhatta, ja ympäriltä oli juuri purettu muurit, jotka '
             + 'olivat estäneet kasvun.'
             + '\n\n'
             + 'Nykyisen ilmeen antaa **polkupyörä**: autoliikenteestä '
             + 'erotettuja pyöräteitä on noin 385 kilometriä, ja niitä '
             + 'pitkin tehdään noin puolet työ- ja koulumatkoista. Sataman '
             + 'vesi on puhdistettu niin, että keskellä kaupunkia voi uida. '
             + 'Ruotsin Malmöhön pääsee vuonna 2000 avattua Juutinrauman '
             + 'siltaa pitkin.',
    teksti: 'Kaupunki kasvoi kalastajakylästä 1100-luvulla, kun piispa '
              + 'Absalon rakennutti linnoituksen pienelle saarelle keskelle '
              + 'salmea. Paikka oli valittu hyvin: tästä on lyhin matka Skånen '
              + 'puolelle, ja kaikki Itämerelle menevä laivaliikenne kulkee '
              + 'ohi. Tanska peri vuosisatoja tullia jokaiselta salmesta '
              + 'purjehtivalta laivalta.\n\nTanska on pieni maa, jossa on '
              + 'paljon vettä: saaria on yli 400 ja rantaviivaa noin 7 300 '
              + 'kilometriä. Kööpenhaminan ja Ruotsin Malmön välillä kulkee '
              + 'Juutinrauman silta, joka avattiin vuonna 2000. Puolimatkassa '
              + 'se sukeltaa keinosaaren kautta tunneliin, jotta lentokoneet '
              + 'pääsevät esteettä laskeutumaan viereiselle kentälle.\n\nTivoli '
              + 'avattiin 1843 kaupungin vallihaudan ulkopuolelle, ja se toimii '
              + 'yhä. Perustaja Georg Carstensen sai kuninkaalta luvan vedoten '
              + 'siihen, että huvitteleva kansa ei ehdi ajatella politiikkaa. '
              + 'Puiston puinen vuoristorata vuodelta 1914 on yhä ajossa, ja '
              + 'siinä matkustaa mukana jarrumies, joka hidastaa vaunua mäkien '
              + 'välissä.\n\nKaupungissa on myös Christiania, entiselle '
              + 'varuskunta-alueelle vuonna 1971 perustettu asuinyhteisö, joka '
              + 'julistautui itsehallinnolliseksi. Sen asema on ollut '
              + 'vuosikymmeniä kiistelty, ja 2010-luvulla asukkaat alkoivat '
              + 'ostaa aluetta valtiolta. Kööpenhamina tavoittelee '
              + 'hiilineutraaliutta, ja jätevoimalan katolle on rakennettu '
              + 'laskettelurinne, joka avattiin 2019.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * Laudan kohde 'lappi' on 17.8.2026 alkaen Rovaniemi, ja artikkeli
   * haetaan avaimella city.wiki — siksi tämä uusi rivi. Alla oleva
   * 'Lapin maakunta' on jätetty koskematta: se palvelee yhä
   * maailmankartta.js:ää, jonka päätoimittaja generoi erikseen, ja
   * lehden uudistus ratkaisee sen kohtalon.
   */
  /*
   * TEKSTIREMONTTI 20.8.2026, erä E8: intro on lehden etusivun
   * leipäteksti (kappaleet '\n\n', maltillinen **lihavointi**).
   * Faktat tämän artikkelin omasta teksti-kentästä ja Lapin lehden jo
   * tarkistetuista teksteistä (kulttuuri-kategoriat.js: Matkailijan
   * Lappi, jakso "Kaupunki poronpään muotoon"). teksti on ennallaan.
   */
  Rovaniemi: {
    intro: 'Rovaniemi on Lapin maakuntakeskus siinä, missä Ounasjoki '
             + 'laskee Kemijokeen kahdeksan kilometriä napapiirin '
             + 'eteläpuolella. Asukkaita on noin 65 000 ja pinta-alaa '
             + 'runsaat 8 000 neliökilometriä, mikä tekee siitä '
             + 'pinta-alaltaan Euroopan suurimpia kaupunkeja — enemmän maata '
             + 'kuin monella pikkuvaltiolla. Jokien risteys oli kauppapaikka '
             + 'kauan ennen kuin täällä oli kaupunkia: pohjoisesta tultiin '
             + 'Ounasjokea, merelle päästiin Kemijokea. Markkinapaikasta '
             + 'tuli kunta 1929 ja kauppala 1938.'
             + '\n\nLokakuussa 1944 vetäytyvät saksalaisjoukot polttivat '
             + 'Rovaniemen, ja rakennuksista tuhoutui yhdeksänkymmentä '
             + 'prosenttia. Jälleenrakennuskaavan laati 1946 **Alvar '
             + 'Aalto**: pääkadut piirtävät kartalle poronsarvet, ja '
             + 'urheilukenttä jää sarvien väliin kuin silmä.'
             + '\n\n**Napapiiri** on kaupungin tunnetuin viiva. Sen '
             + 'pohjoispuolella aurinko ei laske keskikesällä eikä nouse '
             + 'keskitalvella, ja Rovaniemellä yötön yö kestää runsaan '
             + 'kuukauden. Kemijoen rannalle avattiin 1992 Arktikum, museo '
             + 'ja tiedekeskus, jonka lasiputki työntyy sata metriä jokea '
             + 'kohti. Kaupungissa toimii myös Lapin yliopisto, Euroopan '
             + 'unionin pohjoisin.',
    teksti: 'Kahden joen risteys on ollut kauppapaikka kauan ennen '
              + 'kaupunkia: Ounasjokea pitkin tultiin pohjoisesta ja '
              + 'Kemijokea myöten merelle. Markkinapaikasta tuli kunta 1929 '
              + 'ja kauppala 1938. Kaupungin ympärillä on yhä Lapin '
              + 'laajimmat metsät, ja jokien varsille rakennetut voimalat '
              + 'ovat muuttaneet Kemijoen porrastetuksi altaiden '
              + 'ketjuksi.\n\nLapin sota jätti kaupungista raunion. '
              + 'Vetäytyvät saksalaisjoukot polttivat Rovaniemen lokakuussa '
              + '1944, ja rakennuksista säilyi vain murto-osa. Alvar Aalto '
              + 'laati jälleenrakennuskaavan 1946: pääkadut piirtävät '
              + 'kartalle poronsarvet, ja urheilukenttä on sarvien välissä '
              + 'kuin silmä. Aalto suunnitteli myöhemmin myös hallintokorttelin '
              + 'Lappia-taloineen ja kirjastoineen.\n\nNapapiiri on kaupungin '
              + 'tunnetuin viiva. Sen pohjoispuolella aurinko ei laske '
              + 'keskikesällä eikä nouse keskitalvella; Rovaniemellä yötön yö '
              + 'kestää runsaan kuukauden ja kaamos muutaman viikon. '
              + 'Napapiirin kohdalle on kasvanut oma matkailukylänsä, jossa '
              + 'joulupukilla on toimisto ympäri vuoden.\n\nKemijoen rannalla '
              + 'seisoo Arktikum, vuonna 1992 avattu museo ja tiedekeskus, '
              + 'jonka lasiputki työntyy sata metriä joen suuntaan. Siellä '
              + 'kerrotaan arktisesta luonnosta ja Lapin ihmisistä, '
              + 'saamelaisista ja jälleenrakennuksen sukupolvesta. '
              + 'Rovaniemellä toimii myös Lapin yliopisto, maailman '
              + 'pohjoisin yliopisto Euroopan unionissa.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  'Lapin maakunta': {
    intro: 'Lappi on Suomen pohjoisin ja laajin maakunta: 100 367 '
             + 'neliökilometriä eli lähes kolmannes koko maasta. Asukkaita on '
             + 'alle kaksi neliökilometrillä. Suurin osa Lapista on napapiirin '
             + 'pohjoispuolella, ja se on saamelaisten kotiseutua.',
    teksti: 'Saamelaiset ovat Lapin alkuperäiskansa. Suomessa heitä on noin '
              + '10 000, ja he puhuvat kolmea eri kieltä: pohjoissaamea, '
              + 'inarinsaamea ja koltansaamea. Saamelaisten kotiseutualueeseen '
              + 'kuuluvat Enontekiö, Inari ja Utsjoki sekä Sodankylän '
              + 'pohjoisosa, mutta vain noin kolmasosa Suomen saamelaisista '
              + 'asuu siellä. Kieltä ja kulttuuria koskevista asioista '
              + 'päättävät saamelaiskäräjät, joilla on 21 vaaleilla valittua '
              + 'jäsentä ja kotipaikkana Sajos-talo Inarissa.\n\nElinkeinot '
              + 'ovat Lapissa vanhoja ja uusia yhtä aikaa. Poronhoito kattaa '
              + 'reilun kolmanneksen Suomen maapinta-alasta, ja Suomessa sitä '
              + 'saavat harjoittaa muutkin kuin saamelaiset — toisin kuin '
              + 'Ruotsissa ja Norjassa. Kalastus, metsätalous, kaivokset ja '
              + 'matkailu tuovat lopun. Kultaa löytyi Ivalojoelta syksyllä '
              + '1868, ja keväällä 1870 pohjoiseen käveli, hiihti ja souti noin '
              + '500 kullankaivajaa. Kultaa huuhdotaan Lapin joissa '
              + 'yhä.\n\nValo on Lapissa vuodenaikojen mukaan joko kokonaan '
              + 'poissa tai kokonaan läsnä. Talvella aurinko ei nouse '
              + 'viikkoihin — sitä sanotaan kaamokseksi — ja kesällä se ei '
              + 'laske ollenkaan. Utsjoki on Suomen ja koko Euroopan unionin '
              + 'pohjoisin kunta, ja unionin pohjoisin piste on merkitty '
              + 'rajapyykillä Nuorgamiin.\n\nToinen maailmansota jätti Lappiin '
              + 'syvän jäljen. Vetäytyvät saksalaiset joukot polttivat '
              + '1944–1945 suuren osan kylistä ja kaupungeista, muun muassa '
              + 'Rovaniemen. Nykyinen Lappi on siis suurelta osin '
              + 'jälleenrakennettu — ja Rovaniemi on pinta-alaltaan Euroopan '
              + 'suurin kaupunki, 8 017 neliökilometriä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  /*
   * TEKSTIREMONTTI 20.8.2026, erä E8: intro on lehden etusivun
   * leipäteksti (kappaleet '\n\n', maltillinen **lihavointi**).
   * Faktat Tromssan omista jo tarkistetuista teksteistä
   * (kulttuuri-kategoriat.js: nostot, Matkailijan Tromssa ja
   * Valo-kategoria; maakartat.js) sekä teksti-kentästä, joka on
   * ennallaan.
   */
  Tromssa: {
    intro: 'Tromssa on Pohjoismaiden suurin napapiirin pohjoispuolinen '
             + 'kaupunki: noin 78 000 asukasta 69. leveysasteen tuntumassa. '
             + 'Keskusta on Tromsøyan saarella kapean salmen varrella, ja '
             + 'mantereelle pääsee vuoden 1960 siltaa pitkin. Salmi on syvä '
             + 'ja jäätyy harvoin, koska **Golfvirran** haara lämmittää '
             + 'rannikkoa — täältä pääsi merelle silloinkin, kun Itämeri '
             + 'oli umpijäässä.'
             + '\n\nKaupunkioikeudet Tromssa sai 1794, ja kasvu tuli '
             + 'Jäämerestä: 1800-luvun puoliväliin mennessä se oli arktisen '
             + 'pyynnin keskus, jonka laivat purjehtivat Huippuvuorille ja '
             + 'Novaja Zemljalle. Kaupunkia sanottiin Pohjolan Pariisiksi: '
             + 'merimiehet ihmettelivät katulyhtyjä ja kauppoja näin '
             + 'kaukana pohjoisessa. Keskustan puutalot ovat vuosilta '
             + '1789–1904.'
             + '\n\nNykyään Tromssa on arktisen tutkimuksen kaupunki: sen '
             + '1968 perustettu yliopisto on maailman pohjoisin, ja '
             + 'revontuliobservatorio on toiminut vuodesta 1928. Valo tulee '
             + 'ja menee vuodenajoittain eikä päivittäin: aurinko pysyy '
             + 'horisontin alapuolella marraskuun lopusta tammikuun '
             + 'puoliväliin, ja vuorten takaa se nähdään vasta **21. '
             + 'tammikuuta**, jolloin kouluissa syödään aurinkopullia.',
    teksti: 'Tromssa sai kaupunkioikeudet 1794, kun siellä asui noin 80 '
              + 'ihmistä. Kasvu alkoi Jäämerestä: 1800-luvun puoliväliin '
              + 'mennessä kaupungista oli tullut arktisen pyynnin keskus, ja '
              + 'pyyntimatkat ulottuivat Novaja Zemljalta Kanadaan asti. '
              + 'Venäjän puolelta purjehtineet pomorikauppiaat toivat jauhoja '
              + 'ja veivät kalaa. Kaupunkia alettiin kutsua Pohjolan '
              + 'Pariisiksi: siellä oli teatteri, kahvilat ja muodikkaat '
              + 'vaatteet, vaikka talot olivat puuta ja lähin suurkaupunki '
              + 'tuhansien kilometrien päässä.\n\nAlueella oli asuttu kauan '
              + 'ennen sitä: saamelaisia merkkejä on kahden tuhannen vuoden '
              + 'ajalta, ja 1700-luvulla seudulle muutti suomenkielisiä '
              + 'kveenejä. 1800- ja 1900-luvun vaihteessa Norjan valtio ajoi '
              + 'norjalaistamispolitiikkaa, jossa saamea ja kveenien suomea ei '
              + 'saanut käyttää koulussa. Siitä luovuttiin vasta sodan jälkeen. '
              + 'Nykyään Tromssan yliopistossa opetetaan saamea, ja kaupungin '
              + 'nimi on saameksi Romsa.\n\nTromssasta on tullut arktisen '
              + 'tutkimuksen kaupunki. Vuonna 1968 perustettu yliopisto on '
              + 'maailman pohjoisin, ja siellä on lähes 18 000 opiskelijaa. '
              + 'Fram-keskuksessa työskentelee parikymmentä tutkimuslaitosta, '
              + 'ja Arktisen neuvoston sihteeristö on toiminut kaupungissa '
              + 'vuodesta 2013. Kalateollisuus on yhä iso '
              + 'työnantaja.\n\nNaparetket lähtivät täältä. Roald Amundsenin '
              + 'kone nousi Tromssan salmesta 18. kesäkuuta 1928 etsimään '
              + 'kadonnutta ilmalaivaretkeä Huippuvuorilta. Kone katosi '
              + 'muutaman tunnin kuluttua kuuden miehen kanssa, eikä sitä ole '
              + 'löydetty.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  'Yhdistynyt kuningaskunta': {
    // Muita pidempi tarkoituksella: Lontoon lehden maaosasto nojaa
    // tähän yksin, ilman Lue lisää -nappia (sama malli kuin
    // Italialla ja Egyptillä).
    intro: 'Yhdistynyt kuningaskunta on neljän maan liitto: Englanti, '
             + 'Skotlanti, Wales ja Pohjois-Irlanti. Kolme ensimmäistä ovat '
             + 'samalla saarella, neljäs Irlannin saaren pohjoiskulmassa, '
             + 'ja arjessa maasta puhutaan yleensä nimellä Britannia. '
             + 'Saarivaltio hallitsi aikanaan neljäsosaa maapallosta, ja '
             + 'siksi englantia puhutaan nykyään joka mantereella. '
             + 'Teollinen vallankumous alkoi täältä: höyrykone, rautatie '
             + 'ja tehdas muuttivat ensin Britannian ja sitten koko '
             + 'maailman. Parlamenttia kutsutaan parlamenttien äidiksi, '
             + 'ja vasemmanpuoleinen liikenne, teehetki ja jonottamisen '
             + 'jalo taito kuuluvat arkeen yhä. Jalkapallo, rugby ja '
             + 'kriketti syntyivät kaikki näillä saarilla.',
    teksti: 'Parlamentti kokoontuu Westminsterissä, ja sitä sanotaan usein '
              + 'parlamenttien äidiksi: sen työjärjestystä on kopioitu '
              + 'kymmeniin maihin. Kirjoitettua perustuslakia ei silti ole '
              + 'yhtenä asiakirjana, vaan säännöt ovat vuosisatojen aikana '
              + 'kertyneissä laeissa ja tavoissa. Vuodesta 1999 myös '
              + 'Skotlannilla, Walesilla ja Pohjois-Irlannilla on omat '
              + 'parlamenttinsa, jotka päättävät esimerkiksi kouluista ja '
              + 'terveydenhuollosta.\n\nTeollinen vallankumous alkoi täältä '
              + '1700-luvulla: höyrykone, rautatie ja tehdas levisivät '
              + 'Britanniasta muualle maailmaan. Samaan aikaan kasvoi '
              + 'valtakunta, joka oli laajimmillaan 1920-luvulla noin neljäsosa '
              + 'maapallon maa-alasta ja väestöstä. Siirtomaavallan jäljet '
              + 'näkyvät yhä: englanti on virallinen kieli yli '
              + 'viidessäkymmenessä maassa, ja iso osa nykyisistä britteistä '
              + 'juontaa juurensa Intiaan, Pakistaniin, Karibialle ja '
              + 'Afrikkaan.\n\nJalkapallon säännöt kirjoitettiin Lontoossa '
              + '1863, ja peli lähti sieltä maailmalle. Toisen maailmansodan '
              + 'jälkeen 1948 perustettiin NHS, verovaroin kustannettu '
              + 'terveydenhuolto, joka on käyttäjälle maksuton — se on yhä sekä '
              + 'ylpeydenaihe että kestoriidan aihe.\n\nVuonna 2016 '
              + 'järjestetyssä kansanäänestyksessä 51,9 prosenttia äänestäjistä '
              + 'kannatti EU:sta eroamista, ja ero toteutui 2020. Skotlannissa '
              + 'ja Pohjois-Irlannissa enemmistö äänesti jäämisen puolesta, ja '
              + 'kysymys jakaa maata edelleen.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Irlanti: {
    intro: 'Irlanti on saari Britannian länsipuolella. Sen eteläosassa on '
             + 'oma tasavaltansa — 26 kreivikuntaa 32:sta — ja pohjoiset kuusi '
             + 'kuuluvat Yhdistyneeseen kuningaskuntaan. Vihreän värin saarelle '
             + 'antaa merituulen tuoma sade, jota riittää ympäri vuoden.'
             + '\n\nKorkokartta paljastaa saaren muodon: vuoret kiertävät '
             + 'rannikkoa kehänä, ja keskellä levittäytyy matalaa tasankoa. '
             + 'Korkein huippu Carrauntoohil kohoaa 1 038 metriin '
             + 'lounaisnurkassa. Keskeltä mutkittelee Shannon, Britteinsaarten '
             + 'pisin joki, ja koillisessa siintää Lough Neagh, niiden suurin '
             + 'järvi.'
             + '\n\nKartalle on piirretty kaikki 32 kreivikuntaa, ja paksumpi '
             + 'viiva niiden seassa on tasavallan ja Pohjois-Irlannin raja; '
             + 'oikeassa laidassa vilahtaa pala Skotlantia. Rajan '
             + 'eteläpuolella, Boyne-joen mutkassa, on ruohoinen kumpu, joka '
             + 'oli jo vanha silloin kun Egyptissä alettiin rakentaa '
             + 'pyramideja.',
    teksti: 'Vuosina 1845–1852 perunarutto tuhosi sadon useana vuonna '
              + 'peräkkäin, ja seurasi nälänhätä, jota Irlannissa kutsutaan '
              + 'nimellä An Gorta Mór, suuri nälkä. Noin miljoona ihmistä kuoli '
              + 'ja miljoona lähti maasta. Saaren väkiluku putosi yli '
              + 'kahdeksasta miljoonasta runsaaseen kuuteen ja puoleen, eikä se '
              + 'ole vieläkään noussut takaisin: nyt saarella asuu noin 7,4 '
              + 'miljoonaa. Siksi irlantilaisten jälkeläisiä on ympäri maailmaa '
              + 'moninkertaisesti enemmän kuin irlantilaisia '
              + 'Irlannissa.\n\nIiri eli irlannin kieli on perustuslain mukaan '
              + 'maan ensimmäinen virallinen kieli, mutta arkikieli on '
              + 'englanti. Vuoden 2022 väestönlaskennassa 40 prosenttia sanoi '
              + 'osaavansa iiriä, mutta vain noin 72 000 ihmistä käytti sitä '
              + 'päivittäin koulun ulkopuolella. Iirinkielisiä seutuja, '
              + 'Gaeltachteja, on lähinnä länsirannikolla. Kirjoittajia maa on '
              + 'tuottanut kokoonsa nähden poikkeuksellisesti: kirjallisuuden '
              + 'Nobel on myönnetty neljälle irlantilaiselle.\n\nIrlanti '
              + 'irtautui Britanniasta 1922, ja pohjoinen jäi. '
              + 'Pohjois-Irlannissa käytiin 1968–1998 konflikti, jota kutsutaan '
              + 'nimellä the Troubles; se päättyi pitkänperjantain sopimukseen '
              + '1998. Nykyään Irlanti näyttää tilastoissa yhdeltä maailman '
              + 'rikkaimmista maista, mutta luku on osin harha: maahan on '
              + 'rekisteröity kymmenien suuryritysten eurooppalainen '
              + 'kirjanpito. Tilastovirasto joutui kehittämään oman mittarin, '
              + 'GNI*:n, joka kertoo paremmin, mitä maassa tosiasiassa '
              + 'tuotetaan.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Portugali: {
    intro: 'Portugali on Manner-Euroopan läntisin maa: Atlantti alkaa sen '
             + 'rannasta ja jatkuu Amerikkaan asti. Raja Espanjaan on Euroopan '
             + 'vanhin — se vedettiin sopimuksella vuonna 1297 eikä ole juuri '
             + 'muuttunut.'
             + '\n\nKartta jakautuu kahtia. Pohjoinen puoli on vuorta ja syviä '
             + 'jokilaaksoja: Douro ja Tejo tulevat Espanjan puolelta ja '
             + 'kaivautuvat länteen mereen, ja niiden välissä kohoaa Serra da '
             + 'Estrela, mantereen korkein harjanne. Tejon eteläpuolella maa '
             + 'laskeutuu Alentejon loiviksi lakeuksiksi, ja lounaiskulmassa '
             + 'rannikko kääntyy itään Algarven rantaviivaksi.'
             + '\n\nKartan reunan ulkopuolella on vielä kaksi palaa '
             + 'Portugalia: Azorit keskellä Atlanttia ja Madeira Afrikan '
             + 'edustalla, molemmat tulivuorisaaria. Mantereella väki on '
             + 'pakkautunut rannikolle, ja sisämaan vuoristo tyhjenee — '
             + 'siellä sataa myös lunta joka talvi.',
    teksti: 'Portugalista lähdettiin 1400- ja 1500-luvuilla maailman '
              + 'ympäri. Vasco da Gama purjehti Afrikan ympäri Intiaan 1498, ja '
              + 'Tordesillasin sopimuksessa 1494 Portugali ja Espanja jakoivat '
              + 'keskenään kaiken, mitä maailmasta vielä löytyisi. Aikakaudesta '
              + 'jäi kieli: portugalia puhuu nykyään noin 260 miljoonaa '
              + 'ihmistä, valtaosa heistä Brasiliassa. Samaan aikakauteen '
              + 'kuului Atlantin orjakauppa, jonka Portugali aloitti '
              + 'eurooppalaisista ensimmäisenä 1440-luvulla ja jonka se lopetti '
              + 'siirtomaissaan vasta 1869.\n\nLissabonin maanjäristys 1. '
              + 'marraskuuta 1755 tuhosi pääkaupungin. Järistystä seurannut '
              + 'tsunami ja tulipalot tappoivat kymmeniä tuhansia. Kaupunki '
              + 'rakennettiin uudelleen suorille kaduille, ja rakennuksiin '
              + 'suunniteltiin puinen ristikko, gaiola, joka joustaa maan '
              + 'täristessä — se on maailman ensimmäisiä järistystä kestäviksi '
              + 'tarkoitettuja rakenteita.\n\nSotilaat kaappasivat vallan 1926, '
              + 'ja António Salazarin yksinvalta Estado Novo vakiintui 1933. '
              + 'Diktatuuri päättyi 25. huhtikuuta 1974 sotilaiden '
              + 'vallankaappaukseen, jota kadulle tullut väki tuki: ihmiset '
              + 'työnsivät neilikoita kiväärinpiippuihin, eikä juuri verta '
              + 'vuodatettu. Neilikkavallankumouksen päivä on yhä maan tärkein '
              + 'juhla, ja siirtomaat itsenäistyivät seuraavan vuoden '
              + 'kuluessa.\n\nArjessa Portugali on korkkia ja kalaa. Maa '
              + 'tuottaa noin puolet maailman korkista, ja korkkitammen kuori '
              + 'kuoritaan vain kerran yhdeksässä vuodessa. Kansallisruoka on '
              + 'bacalhau, kuivattu ja suolattu turska, vaikka turska pyydetään '
              + 'kaukaa pohjoisesta. Fado on laulutyyli, jossa kitaran '
              + 'säestyksellä lauletaan kaipuusta — sanaa saudade käytetään '
              + 'siitä, mitä ei ole enää tai ei vielä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Alankomaat: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale selittää sen, mitä korkokartta
    // näyttää — ja tässä maassa se on nimenomaan se, mitä kartalla EI
    // ole: vuoria.
    intro: 'Alankomaat tarkoittaa matalia maita, ja nimi on tarkka: noin '
             + 'neljäsosa maasta on merenpinnan alapuolella, ja siellä asuu '
             + 'viidesosa väestöstä. Noin 17 prosenttia maa-alasta on kuivattu '
             + 'merestä ja järvistä — ilman patoja ja pumppuja se olisi taas '
             + 'vettä.'
             + '\n\nKartalla ei ole vuoria: maa on tasainen kuin pöytä, ja '
             + 'korkeimmat kohdat jäävät kaukaiseen kaakkoiskärkeen. '
             + 'Lounaassa Zeelandin saaret ja merenlahdet rikkovat rannikon '
             + 'sirpaleiksi, pohjoisessa Friisein saaret suojaavat matalaa '
             + 'Waddenmerta. Keskellä on IJsselmeer, joka oli ennen '
             + 'merenlahti: 32 kilometrin Afsluitdijk-pato sulki sen '
             + 'järveksi vuonna 1932, ja sen rannoilta erottuvat '
             + 'suorakulmaiset polderit, merestä kuivatut maapalat.'
             + '\n\nVettä on padottu tuhat vuotta: polderit tyhjennettiin '
             + 'ennen tuulimyllyillä, nykyään sähköpumpuilla. Alankomaat on '
             + 'Euroopan tiheimmin asuttuja maita, ja silti maailman '
             + 'toiseksi suurin ruoan viejä arvolla mitattuna. Polkupyöriä '
             + 'on enemmän kuin ihmisiä: noin 24 miljoonaa pyörää 18 '
             + 'miljoonalle asukkaalle.',
    teksti: 'Vettä on padottu tuhat vuotta. Kuivattua ja padottua maapalaa '
              + 'sanotaan polderiksi; niitä tyhjennettiin ennen tuulimyllyillä, '
              + 'nykyään sähköpumpuilla. Vuonna 1932 valmistui Afsluitdijk, 32 '
              + 'kilometriä pitkä pato, joka muutti Zuiderzee-merenlahden '
              + 'IJsselmeer-järveksi. Kun myrsky mursi padot helmikuussa 1953 '
              + 'ja 1 836 ihmistä hukkui, aloitettiin Deltatyöt. Niiden suurin '
              + 'osa, Oosterscheldekering, on rivi valtavia portteja, jotka '
              + 'ovat tavallisesti auki, jotta vuorovesi pääsee kulkemaan, ja '
              + 'suljetaan vain myrskyn ajaksi.\n\nVesi teki maasta myös '
              + 'poliittisen. Paikalliset vesilautakunnat, waterschappen, '
              + 'perustettiin jo 1200-luvulla jakamaan patojen ylläpidon '
              + 'kustannukset, ja niihin valittiin edustajat maanomistajien '
              + 'kesken. Ne ovat maan vanhimmat vaaleilla valitut elimet, ja '
              + 'niihin äänestetään yhä omissa vaaleissaan.\n\n1600-luku oli '
              + 'kultakausi: Amsterdamista tuli maailmankaupan solmu, '
              + 'Itä-Intian kauppakomppania VOC hallitsi mausteita, ja '
              + 'Rembrandt ja Vermeer maalasivat. Samaan kauteen kuuluivat '
              + 'siirtomaat Indonesiassa, Surinamessa ja Karibialla sekä '
              + 'orjakauppa, josta valtio pyysi anteeksi vuonna '
              + '2022.\n\nNykyään Alankomaat on Euroopan tiheimmin asuttuja '
              + 'maita, noin 540 asukasta neliökilometrillä, ja siitä '
              + 'huolimatta maailman toiseksi suurin ruoan viejä arvolla '
              + 'mitattuna — kasvihuoneiden, jalostuksen ja Rotterdamin sataman '
              + 'ansiosta. Polkupyöriä on enemmän kuin ihmisiä: noin 24 '
              + 'miljoonaa pyörää 18 miljoonalle asukkaalle.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Saksa: {
    // Lehden maaosasto nojaa tähän introon yksin (Berliinin lehti,
    // ks. docs/moduulit/kaupunkilehti.md): pituus noin kuusi virkettä.
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla (omistajan
    // toive 7.8.2026: "teksti kartan vieressä voisi olla jaksotettu").
    intro: 'Saksa on Euroopan unionin väkirikkain maa: 83 miljoonaa '
             + 'asukasta kuudessatoista osavaltiossa, joilla on omat '
             + 'parlamenttinsa ja omat koulunsa. Yhtenäinen valtio se on ollut '
             + 'vasta vuodesta 1871 — ja siitä ajasta 41 vuotta kahtia '
             + 'jaettuna.\n\nMaisema laskee Alppien huipuilta Reinin laakson ja '
             + 'suurten metsien halki kahden meren rannoille. Maailmalle '
             + 'Saksasta ovat lähteneet kirjapaino, röntgensäteet ja '
             + 'ensimmäinen tietokone — ja Bachin, Beethovenin ja Brahmsin '
             + 'sävelet.\n\nAutot, junat ja jalkapallo otetaan täällä vakavasti, '
             + 'mutta niin otetaan myös leipä, jota leivotaan kolmeatuhatta '
             + 'lajia. Pääkaupunki Berliini on kaupungeista suurin, mutta '
             + 'valta on levällään: suurin satama on Hampurissa, pankit '
             + 'Frankfurtissa ja moni tehdas etelän pikkukaupungeissa.',
    teksti: 'Saksa oli pitkään satojen ruhtinaskuntien, vapaakaupunkien ja '
              + 'piispanmaiden tilkkutäkki. Preussin johdolla ne yhdistettiin '
              + 'keisarikunnaksi 1871. Toisen maailmansodan jälkeen maa '
              + 'jaettiin kahtia, ja Berliinin halki nousi 1961 muuri, joka '
              + 'seisoi 28 vuotta. Se avattiin marraskuussa 1989, ja '
              + 'maanpuoliskot yhdistyivät 3. lokakuuta 1990 — päivä on yhä '
              + 'kansallispäivä.\n\nEtelässä maa nousee Alpeille: korkein '
              + 'huippu Zugspitze on 2 962 metriä. Pohjoisessa se laskeutuu '
              + 'tasangoksi kahden meren, Pohjanmeren ja Itämeren, rannoille. '
              + 'Reinin laakso on ollut kauppatie roomalaisajoista asti, ja sen '
              + 'jyrkillä rinteillä kasvatetaan yhä viiniä.\n\nLeipä on '
              + 'saksalaisille sama kuin pasta italialaisille. Leipurien liiton '
              + 'rekisteriin on hyväksytty lähes 3 000 eri leipälajia, ja '
              + 'tunnetuin niistä on hapanjuureen leivottu ruisleipä. '
              + 'Kertakäyttöisistä juomapulloista ja tölkeistä maksetaan '
              + 'kaupassa 25 sentin pantti, joten tyhjät kannetaan '
              + 'takaisin.\n\nMainzissa Johannes Gutenberg kehitti 1450-luvulla '
              + 'irtokirjasimet: kirjaimet valettiin metallista yksitellen, '
              + 'ladottiin sivuksi ja käytettiin uudelleen. Sitä ennen kirjat '
              + 'kopioitiin käsin. Sadassa vuodessa Eurooppaan painettiin '
              + 'miljoonia kirjoja, ja lukutaidosta tuli tavallisen ihmisen '
              + 'asia.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Itävalta: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa, viimeinen on
    // koukku kartan nostoon (Hallstattin suolakaivos).
    intro: 'Itävalta on vuoristomaa Alppien itäpäässä, eikä sillä ole '
             + 'merta lainkaan. Naapureita sen sijaan on kahdeksan — useampi '
             + 'kuin melkein millään muulla Euroopan maalla.'
             + '\n\nYli 70 prosenttia maasta on vuorta: lännessä ja etelässä '
             + 'Alpit kohoavat harjanne harjanteen perään, ja korkein huippu '
             + 'Großglockner yltää 3 798 metriin. Idässä maa madaltuu ja '
             + 'levenee, ja siellä Tonavan varrella on pääkaupunki Wien. '
             + 'Kartalta näkee maan muodon: lännessä se kaventuu vuorten '
             + 'väliseksi kaistaleeksi, idässä se aukeaa tasangoksi.'
             + '\n\nVuoret eivät ole vain maisemaa vaan elinkeino. '
             + 'Alppipurojen voimalat tuottavat suuren osan maan sähköstä, ja '
             + 'talvella samoille rinteille nousee miljoonia hiihtäjiä. '
             + 'Hallstattin kylässä on louhittu suolaa seitsemäntuhatta '
             + 'vuotta, ja lähikaupungin nimi Salzburg tarkoittaa '
             + 'suolalinnaa.',
    teksti: 'Wienistä hallittiin kuusisataa vuotta. Habsburgin suku '
              + 'kasvatti sieltä valtakunnan, joka ulottui lopulta Ukrainasta '
              + 'Adrianmerelle ja jossa puhuttiin toistakymmentä kieltä. '
              + 'Ensimmäisen maailmansodan jälkeen 1918 valtakunta hajosi '
              + 'kansallisvaltioiksi, ja jäljelle jäi pieni saksankielinen '
              + 'tasavalta. Vuonna 1938 Saksa liitti sen itseensä, ja sodan '
              + 'jälkeen Neuvostoliitto, Yhdysvallat, Britannia ja Ranska '
              + 'miehittivät maata kymmenen vuotta. Joukot lähtivät 1955, kun '
              + 'Itävalta lupasi pysyä puolueettomana. Itävallan parlamentti '
              + 'sääti puolueettomuuslain 26. lokakuuta 1955, ja se päivä on '
              + 'kansallispäivä.\n\nWien oli 1700- ja 1800-luvuilla Euroopan '
              + 'musiikin keskus. Haydn, Mozart, Beethoven ja Schubert asuivat '
              + 'ja työskentelivät samassa kaupungissa, usein muutaman '
              + 'korttelin päässä toisistaan. Wienin poikakuoro on laulanut '
              + 'vuodesta 1498. Kahvila on oma laitoksensa: yhdellä '
              + 'kupillisella saa istua tuntikausia lehtiä lukien, ja tapa on '
              + 'Unescon aineettoman kulttuuriperinnön listalla.\n\nVuoret ovat '
              + 'myös elinkeino. Hallstattin kylässä on louhittu suolaa '
              + 'seitsemäntuhatta vuotta — se on maailman vanhin tunnettu '
              + 'suolakaivos — ja lähikaupungin nimi Salzburg tarkoittaa '
              + 'suolalinnaa. Alppipurojen voimalat tuottavat noin kolme '
              + 'viidesosaa maan sähköstä, ja talvella samoille rinteille '
              + 'nousee miljoonia hiihtäjiä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Sveitsi: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Ensimmäinen kappale on koukku kartan nostoon
    // (Landsgemeinde), keskimmäinen lukee korkokarttaa.
    intro: 'Sveitsissä on neljä virallista kieltä: saksaa puhuu 62, ranskaa '
             + '23, italiaa 8 ja retoromaania puoli prosenttia asukkaista. '
             + 'Maata ei pidä koossa yhteinen kieli vaan yhteinen tapa päättää '
             + 'asioista: kansanäänestyksiä on noin neljä kertaa vuodessa, ja '
             + 'kantoneja on 26, jokaisella oma perustuslakinsa, '
             + 'koulujärjestelmänsä ja veronsa.'
             + '\n\nAlpit peittävät maasta noin kolme viidesosaa, ja korkein '
             + 'huippu Dufourspitze yltää 4 634 metriin. Kartalla vuoret '
             + 'täyttävät koko eteläpuoliskon; pohjoisempana kulkee matalampi '
             + 'vyöhyke järvineen ja kaupunkeineen, ja luoteessa nousee vielä '
             + 'erillinen Jura-vuoristo. Vuorten läpi on kaivettu: Gotthardin '
             + 'pohjatunneli on 57 kilometriä pitkä, maailman pisin '
             + 'rautatietunneli.'
             + '\n\nMaa on ollut puolueeton vuodesta 1815, se liittyi YK:hon '
             + 'vasta 2002 eikä ole EU:n jäsen. Lippukin on oma tapauksensa: '
             + 'se on neliö, kuten maailmassa vain Vatikaanin lippu.',
    teksti: 'Sveitsi sai alkunsa 1291, kun kolme laaksoyhteisöä lupasi '
              + 'auttaa toisiaan. Nykyään kantoneja on 26, ja jokaisella on oma '
              + 'perustuslakinsa, oma koulujärjestelmänsä ja omat veronsa. Maa '
              + 'on ollut puolueeton vuodesta 1815, se liittyi YK:hon vasta '
              + '2002 eikä ole EU:n jäsen. Lippukin on oma tapauksensa: se on '
              + 'neliö, kuten maailmassa vain Vatikaanin lippu. Kun Henry '
              + 'Dunant perusti Genevessä 1863 Punaisen Ristin, tunnukseksi '
              + 'käännettiin sama lippu nurin.\n\nAlpit peittävät maasta noin '
              + 'kolme viidesosaa, ja korkein huippu Dufourspitze yltää 4 634 '
              + 'metriin. Vuorten läpi on kaivettu: Gotthardin pohjatunneli on '
              + '57 kilometriä pitkä, maailman pisin rautatietunneli. '
              + 'Louhiminen kesti seitsemäntoista vuotta, ja juna kuljettaa '
              + 'matkustajat toiselle puolelle noin kahdessakymmenessä '
              + 'minuutissa.\n\nSuklaata sveitsiläinen syö noin 10,6 kiloa '
              + 'vuodessa, enemmän kuin minkään muun maan asukas. Koulussa '
              + 'opetellaan äidinkielen lisäksi toinen kansalliskieli, joten '
              + 'moni osaa arjessaan kahta tai kolmea. Ja Geneven laidalla, '
              + 'osin Ranskan puolella, kiertää maan alla Cernin '
              + 'hiukkaskiihdytin: siellä työskennellyt Tim Berners-Lee keksi '
              + '1989 World Wide Webin, jotta tutkijat saisivat paperinsa '
              + 'jaettua.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  'Tšekki': {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa: vuorikehä,
    // sen sisään jäävä allas ja joet, jotka vievät vedet pohjoiseen.
    intro: 'Tšekki on sisämaan valtio Keski-Euroopan keskellä, ja sillä on '
             + 'neljä naapuria: Saksa, Puola, Slovakia ja Itävalta. Maa koostuu '
             + 'kolmesta vanhasta maakunnasta: Böömistä lännessä, Määristä '
             + 'idässä ja pienestä Tšekin Sleesiasta koillisessa.'
             + '\n\nBöömiä ympäröivät joka suunnalta vuoret, ja niiden sisään '
             + 'jää laaja allas. Sinne kerääntyvät maan joet: Vltava kiertää '
             + 'Prahan mutkien läpi ja laskee Labeen, joka vie vedet '
             + 'pohjoiseen Saksan puolelle ja edelleen Pohjanmerelle. Idässä '
             + 'maasto laskee Määrin avoimiin laaksoihin, ja itärajalla '
             + 'kohoavat Beskidit, Karpaattien läntisimmät vuoret.'
             + '\n\nVuorikehän luoteiskulma ei ole tavallista kalliota vaan '
             + 'hiekkakiveä, jonka vesi ja tuuli ovat veistäneet torneiksi ja '
             + 'porteiksi. Suurin niistä on Pravčická brána, Euroopan suurin '
             + 'luonnon kiviportti.',
    teksti: 'Praha oli 1300-luvulla Euroopan mahtavimpia kaupunkeja. '
              + 'Kuningas Kaarle IV perusti sinne 1348 yliopiston, joka on '
              + 'Keski-Euroopan vanhin, ja pani 1357 alulle sillan, joka kantaa '
              + 'yhä hänen nimeään. Vanhankaupungin raatihuoneen tähtikello on '
              + 'vuodelta 1410 ja käy edelleen — se on maailman vanhin '
              + 'toiminnassa oleva tähtikello.\n\nNykyinen valtio on paljon '
              + 'nuorempi. Tšekkoslovakia syntyi 1918, ja vuonna 1968 se yritti '
              + 'uudistaa kommunismia; Prahan kevät päättyi elokuussa Varsovan '
              + 'liiton panssarivaunuihin. Vuoden 1989 samettivallankumouksessa '
              + 'mielenosoittajat kaatoivat hallinnon ilman verenvuodatusta, ja '
              + 'näytelmäkirjailija Václav Havel siirtyi samana vuonna '
              + 'vankilasta presidentiksi. Kolme vuotta myöhemmin Tšekki ja '
              + 'Slovakia erosivat sopuisasti — sekin sai nimen '
              + 'sametti.\n\nPlzeňin panimossa keitettiin 1842 ensimmäinen '
              + 'kirkkaan kullanvärinen lager. Tyyli sai kaupungin mukaan nimen '
              + 'pilsner, ja siitä tuli maailman juoduin olut. Tšekit juovat '
              + 'sitä eniten: yli 130 litraa henkeä kohti vuodessa, ja '
              + 'kärkisija on pysynyt yli kolmekymmentä vuotta. Sana robotti on '
              + 'Karel Čapekin näytelmästä vuodelta 1920, sokeripala keksittiin '
              + 'Dačicessä 1843 ja pehmeät piilolinssit Prahassa 1961.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Unkari: {
    intro: 'Unkari on sisämaavaltio Karpaattien kaaren sisäpuolella, ja sen '
             + 'kieli on Euroopan omituisimpia: unkari ei muistuta yhtäkään '
             + 'naapurinsa kieltä vaan on suomen ja viron kaukainen sukulainen. '
             + 'Käsi on kéz, vesi víz, kala hal ja mesi méz.'
             + '\n\nKartta on melkein kokonaan vihreä, ja se on oikein: '
             + 'Unkari on Karpaattien altaan pohjaa, eikä siellä ole vuoria. '
             + 'Halki kulkee kaksi jokea pohjoisesta etelään — Tonava '
             + 'keskeltä ja Tisza sen itäpuolelta — ja niiden ympärille '
             + 'levittäytyy Alföld eli Iso Unkarin alanko. Lounaassa erottuu '
             + 'kapea sininen juova, Balaton, ja ruskeaa näkyy vasta rajojen '
             + 'takana: Unkarin oma korkein maasto on kapea kaistale '
             + 'pohjoisrajan tuntumassa.'
             + '\n\nMaan alla on kuumaa vettä: lämpimiä lähteitä on yli '
             + 'tuhat, ja kylpylöissä istutaan pakkasellakin. Idässä alanko '
             + 'taas jatkuu niin pitkälle, ettei sen yli näy yhtään kohoumaa '
             + '— siellä on Euroopan laajin ruohotasanko ja sen halki kulkeva '
             + 'kivisilta, jossa on yhdeksän kaarta.',
    teksti: 'Unkarilaisten esi-isät saapuivat Karpaattien altaaseen vuonna '
              + '895 seitsemänä ratsastavana heimona. Sata vuotta myöhemmin, '
              + 'vuonna 1000, István kruunattiin kuninkaaksi ja maasta tuli '
              + 'kristitty valtakunta. Kieli säilyi silti omanaan: unkarissa on '
              + 'noin 18 sijamuotoa, ja päätteitä ketjutetaan sanan perään '
              + 'aivan kuin suomessa.\n\nVuoden 1920 Trianonin rauhassa Unkari '
              + 'menetti noin kaksi kolmasosaa alueestaan, ja joka kolmas '
              + 'unkarinkielinen jäi uusien rajojen ulkopuolelle. Siksi '
              + 'Romaniassa, Slovakiassa, Serbiassa ja Ukrainassa asuu yhä '
              + 'unkarinkielisiä yhteisöjä, ja Trianon on politiikan puheenaihe '
              + 'sata vuotta myöhemminkin.\n\nMaan alla on kuumaa vettä: '
              + 'lämpimiä lähteitä on yli 1 300 ja pelkästään Budapestissa 123. '
              + 'Kylpylöissä istutaan ympäri vuoden, pakkasellakin, ja shakkia '
              + 'pelataan höyryävän altaan reunalla. Balaton, Keski-Euroopan '
              + 'suurin järvi, on 78 kilometriä pitkä mutta keskimäärin vain '
              + '3,2 metriä syvä — sitä voi kahlata kauas ulapalle.\n\nBudapest '
              + 'syntyi vuonna 1873, kun Buda, Óbuda ja Pest yhdistettiin '
              + 'yhdeksi kaupungiksi; 23 vuotta myöhemmin sinne kaivettiin '
              + 'Manner-Euroopan ensimmäinen metrolinja. Unkarista ovat '
              + 'kotoisin myös kuulakärkikynä — László Bíró patentoi sen 1938, '
              + 'ja Britanniassa kynää sanotaan yhä biroksi — sekä Rubikin '
              + 'kuutio, jonka budapestilainen arkkitehtuurin opettaja Ernő '
              + 'Rubik teki vuonna 1974 opetusvälineeksi.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Romania: {
    intro: 'Romania on Kaakkois-Euroopan ainoa maa, jonka kieli polveutuu '
             + 'latinasta. Roomalaiset valloittivat Dacian vuonna 106 ja '
             + 'luopuivat siitä 165 vuotta myöhemmin, mutta kieli jäi — ja on '
             + 'yhä latinan saareke keskellä slaavin ja unkarin puhujia.'
             + '\n\nKartan hallitseva muoto on Karpaattien kaari. Vuoret '
             + 'tulevat pohjoisesta alas, kääntyvät Brașovin kohdalla länteen '
             + 'ja nousevat takaisin luoteeseen, niin että ne piirtävät maan '
             + 'keskelle lähes suljetun renkaan. Renkaan sisällä on '
             + 'Transilvanian ylätasanko, ja korkein huippu Moldoveanu nousee '
             + 'kaaren eteläreunassa 2 544 metriin. Vuorten ulkopuolella maa '
             + 'on tasaista: lännessä Bánátin lakeus, etelässä leveä Valakian '
             + 'tasanko ja idässä Moldavian loivempi ylänkö.'
             + '\n\nTonava kulkee koko eteläisen rajan ja levittäytyy kartan '
             + 'itälaidassa vaaleaksi viuhkaksi — suistoksi, jonka takana on '
             + 'Mustameri. Ennen suistoa joki on kuitenkin joutunut '
             + 'puhkaisemaan vuoret: maan lounaisnurkassa se kaivautuu '
             + 'kahden vuoriston väliin solaan, jota vartioi kallioon hakattu '
             + 'kasvopari.',
    teksti: 'Romania ja italia jakavat noin kolme neljäsosaa sanastostaan, '
              + 'vaikka maiden välissä on koko Balkan. Sanoissa näkyy silti '
              + 'naapurusto: kirkon sanat ovat slaavista, ruoan ja arjen sanoja '
              + 'on lainattu turkista ja unkarista. Maan nimi tarkoittaa '
              + 'yksinkertaisesti roomalaisten maata.\n\nKarpaatit kaartuvat '
              + 'maan halki ja jakavat sen kolmeen vanhaan maakuntaan: '
              + 'Transilvaniaan, Moldovaan ja Valakiaan. Vuoristometsissä elää '
              + 'Euroopan unionin suurin ruskeakarhukanta — vuonna 2025 '
              + 'julkistetussa geenilaskennassa yksilöitä arvioitiin olevan 10 '
              + '400–12 800. Tonava päättyy Romanian rannikolla Euroopan '
              + 'parhaiten säilyneeseen suistoon, jossa on havaittu yli 300 '
              + 'lintulajia.\n\nVlad III oli 1400-luvulla Valakian ruhtinas, '
              + 'joka puolusti maataan ottomaaneja vastaan julmin keinoin ja '
              + 'sai siksi liikanimen Țepeș, seivästäjä. Vampyyri hänestä tuli '
              + 'vasta vuonna 1897, kun irlantilainen kirjailija Bram Stoker '
              + 'lainasi hänen isänsä lisänimen Dracul romaaninsa kreiville. '
              + 'Stoker ei käynyt Romaniassa koskaan.\n\nLähihistorian raskain '
              + 'jälki on Bukarestissa. Diktaattori Nicolae Ceaușescu antoi '
              + '1980-luvulla purkaa kokonaisia kaupunginosia rakentaakseen '
              + 'Kansanpalatsin: 365 000 neliömetriä ja yli tuhat huonetta, '
              + 'maailman painavin rakennus. Vallankumous kaatoi hänet '
              + 'joulukuussa 1989, ja nykyään talossa istuu Romanian '
              + 'parlamentti.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Turkki: {
    intro: 'Turkki on kahdella mantereella: 97 prosenttia sen maasta on '
             + 'Aasiassa ja loput Euroopassa. Istanbul on maailman ainoa '
             + 'suurkaupunki, joka seisoo molemmilla. Bosporinsalmi halkaisee '
             + 'sen, ja kapeimmillaan maanosat ovat noin 700 metrin päässä '
             + 'toisistaan.'
             + '\n\nKartalla maa levittäytyy pitkänä laatikkona idästä '
             + 'länteen. Keskellä kohoaa Anatolian ylätasanko, ja sitä '
             + 'puristavat kahden puolen vuorijonot: pohjoisessa Mustanmeren '
             + 'rannikkoa seuraavat Pontiset vuoret, etelässä Taurus. Itään '
             + 'päin maa nousee koko ajan korkeammalle, ja siellä on maan '
             + 'suurin järvi, Vanjärvi.'
             + '\n\nEuroopan puoli on vain pieni kolkka kartan '
             + 'luoteiskulmassa, ja kaikki muu on Anatoliaa — yhtä '
             + 'ihmiskunnan vanhimmista asuinseuduista. Kaakkoisrajan '
             + 'tuntumassa erään vuoren huipulle nostettiin kaksituhatta '
             + 'vuotta sitten rivi jättiläispatsaita, ja niiden päät ovat nyt '
             + 'maassa.',
    teksti: 'Anatolia on ihmiskunnan vanhimpia asuinseutuja. Göbekli Tepen '
              + 'kukkulalle pystytettiin kaiverrettuja kivipilareita noin 9500 '
              + 'eaa. — kuusi tuhatta vuotta ennen Stonehengeä. Çatalhöyükin '
              + 'kylässä asuttiin 7000-luvulla eaa. taloissa, joiden välissä ei '
              + 'ollut lainkaan katuja: naapuriin mentiin kattoja pitkin ja '
              + 'kotiin laskeuduttiin tikkaita.\n\nOsmanien valtakunta hallitsi '
              + 'kuudensadan vuoden ajan kolmea maanosaa. Sen viimeisinä '
              + 'vuosina, vuodesta 1915 alkaen, valtakunnan hallitus karkotti '
              + 'armenialaiset kodeistaan ja surmasi heitä; noin miljoona '
              + 'ihmistä kuoli. Yli kolmekymmentä valtiota ja lähes kaikki '
              + 'historiantutkijat kutsuvat sitä kansanmurhaksi, Turkin valtio '
              + 'ei. Valtakunnan hajottua tilalle perustettiin tasavalta vuonna '
              + '1923, ja muutokset tehtiin nopeasti: vuonna 1928 arabialaiset '
              + 'kirjaimet vaihdettiin latinalaisiin muutamassa kuukaudessa. '
              + 'Turkin kieli on suomalaiselle yllättävän tuttu — siinä on '
              + 'vokaalisointu ja päätteet ketjutetaan sanan perään kuten '
              + 'suomessa. Se ei ole maan ainoa kieli: kurdit ovat Turkin '
              + 'suurin vähemmistö, ja idässä kotikielenä on usein kurdi. '
              + 'Valtio kielsi kurdin käytön julkisuudessa vuoteen 2001 asti; '
              + 'nyt sitä saa opettaa koulussa omana oppiaineenaan.\n\nMaa on '
              + 'tulivuorten ja maanjäristysten aluetta. Kappadokiassa tuhkasta '
              + 'kovettuneeseen tuffiin on kaiverrettu asuntoja ja kokonaisia '
              + 'maanalaisia kaupunkeja; Derinkuyussa kävijöille on avattu '
              + 'kahdeksan kerrosta, ja koko kaupunki ulottuu noin 85 metrin '
              + 'syvyyteen. Suojaan mahtui tuhansia ihmisiä karjoineen. '
              + 'Pohjois-Anatolian siirros kulkee maan poikki, ja helmikuun '
              + '2023 järistyksissä kuoli yli 50 000 ihmistä.\n\nArjessa '
              + 'toistuu lasi: teetä juodaan tulppaanin muotoisista laseista '
              + 'aamusta iltaan, ja turkkilaiset juovat sitä asukasta kohti '
              + 'enemmän kuin minkään muun maan asukkaat. Tee kasvaa '
              + 'Mustanmeren rannikolla Rizen sateisilla rinteillä. Turkki '
              + 'tuottaa myös noin kaksi kolmasosaa maailman hasselpähkinöistä '
              + '— ja tulppaanit, joita pidetään Alankomaiden tunnuksena, '
              + 'tuotiin sinne aikanaan Osmanien valtakunnasta.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Ukraina: {
    intro: 'Ukraina on suurin kokonaan Euroopassa sijaitseva maa, 603 550 '
             + 'neliökilometriä. Yli puolet siitä on peltoa, ja pellon alla on '
             + 'mustaa multaa: tšernozjomia, jonka humuskerros on paikoin '
             + 'metrin paksuinen. Neljäsosa maailman mustasta mullasta on '
             + 'Ukrainassa.'
             + '\n\nSen näkee kartalta: se on lähes kauttaaltaan vaaleaa '
             + 'vihreää, ja tasanko jatkuu laidasta laitaan ilman '
             + 'korkeuseroja. Ruskeaa on vain lounaassa, missä Karpaatit '
             + 'kaartuvat maan halki — Hoverla nousee siellä 2 061 metriin, '
             + 'koko maan korkeimpana kohtana. Keskeltä pohjoisesta etelään '
             + 'laskee Dnepr, ja sen patoaltaat näkyvät sarjana leveitä '
             + 'sinisiä järviä.'
             + '\n\nEtelässä maa liukuu Mustaanmereen ja Asovanmereen, ja '
             + 'Krimin niemimaa roikkuu kartan alalaidassa oman kapean '
             + 'vuorijononsa kanssa. Pohjoisessa vihreä tummenee: siellä ovat '
             + 'Polissjan suot. Lännessä on vielä yksi joki, joka on tehnyt '
             + 'jotain omituista — se kiertää melkein täyden lenkin ja jättää '
             + 'keskelle kalliosaaren.',
    teksti: 'Kiovan Rus oli 900–1200-luvuilla Euroopan laajimpia '
              + 'valtakuntia, ja sen keskus oli Kiova Dneprin rannalla. Pyhän '
              + 'Sofian katedraali on seissyt siellä 1000-luvulta asti. '
              + 'Ukrainan kieltä kirjoitetaan kyrillisin kirjaimin. Sen lähin '
              + 'sukukieli on valkovenäjä, ja sanastoltaan se on lähellä myös '
              + 'puolaa; Venäjän keisarikunta kielsi sen painamisen kahdesti, '
              + 'vuosina 1863 ja 1876.\n\nMusta multa teki maasta vilja-aitan. '
              + 'Ennen vuotta 2022 Ukraina vastasi noin kymmenesosasta maailman '
              + 'vehnänviennistä ja noin puolesta auringonkukkaöljyn viennistä '
              + '— siksi auringonkukka on maan tunnus. Peltoa on yli puolet '
              + 'pinta-alasta, harvinaisen suuri osuus.\n\n1900-luku oli '
              + 'raskas. Vuosien 1932–1933 nälänhädässä, jota kutsutaan '
              + 'holodomoriksi, kuoli miljoonia ihmisiä samaan aikaan kun '
              + 'viljaa vietiin maasta; monet maat ovat sittemmin tunnustaneet '
              + 'sen kansanmurhaksi. Vuonna 1986 Tšornobylin ydinvoimalan '
              + 'reaktori räjähti, ja voimalan ympärille jäi noin 2 600 '
              + 'neliökilometrin suljettu alue, jolla ei yhä asuta.\n\nVenäjä '
              + 'hyökkäsi maahan täydellä voimalla helmikuussa 2022, ja '
              + 'miljoonat ukrainalaiset joutuivat lähtemään kodeistaan. Kiovan '
              + 'syvät metroasemat toimivat pommisuojina — Arsenalna on 105,5 '
              + 'metrin syvyydessä, yksi maailman syvimmistä. Arki jatkuu '
              + 'silti: samana vuonna Unesco otti ukrainalaisen borssin '
              + 'keittämisen suojeltavan kulttuuriperinnön luetteloon.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Venäjä: {
    intro: 'Venäjä on pinta-alaltaan maailman suurin maa: se ulottuu '
             + 'Itämereltä Tyynellemerelle ja kattaa yksitoista aikavyöhykettä. '
             + 'Kun Moskovassa istutaan aamiaisella, Kamtšatkan niemimaalla on '
             + 'jo ilta. Silti kolme neljästä asukkaasta asuu Uralin '
             + 'länsipuolella.'
             + '\n\nJuuri se puoli on tässä kartassa — koko maa ei mahtuisi '
             + 'sivulle järkevästi. Kartta on melkein kokonaan tasaista '
             + 'vihreää: Itä-Euroopan tasanko jatkuu Vienanmereltä '
             + 'Mustallemerelle ilman ainuttakaan vuorijonoa. Oikeaan reunaan '
             + 'piirtyy kapea ruskea nauha pohjoisesta etelään — Uralvuoret, '
             + 'joita on tavan mukaan pidetty Euroopan ja Aasian rajana, '
             + 'vaikka korkein huippu jää alle kahden kilometrin.'
             + '\n\nKeskeltä kaartuu alas Volga, Euroopan pisin joki, ja sen '
             + 'patoaltaat näkyvät leveinä sinisinä järvinä matkalla '
             + 'Kaspianmerelle, joka ei laske mihinkään. Alalaidassa '
             + 'Mustanmeren ja Kaspianmeren väliin nousee jyrkkä valkohuippuinen '
             + 'muuri, Kaukasus. Vasemmassa yläkulmassa, Suomen naapurissa, '
             + 'Kuolan niemimaa työntyy Barentsinmereen, ja sen eteläpuolella '
             + 'Vienanmeren ja Pietarin välissä on iso järvi. Sen saarella '
             + 'seisoo puukirkko, jonka seinissä ei ole ainuttakaan naulaa.',
    teksti: 'Venäjä on liittovaltio, johon kuuluu yli 80 aluetta ja lähes '
              + '200 kansaa. Venäjän ohella maassa puhutaan yli sataa kieltä: '
              + 'tataaria Volgan mutkassa, jakuuttia ikiroudan päällä, '
              + 'tšetšeeniä Kaukasuksen vuorilla. Osalla tasavalloista on '
              + 'venäjän rinnalla oma virallinen kielensä.\n\nMaan itäinen '
              + 'puolisko on Siperiaa. Sen keskellä lepää Baikal, maailman '
              + 'syvin järvi: pohja on 1 642 metrin syvyydessä, ja järvessä on '
              + 'noin viidennes maapallon jäätymättömästä makeasta '
              + 'pintavedestä. Jakutian Oimjakonissa mitattiin vuonna 1933 '
              + 'lähes 68 pakkasastetta — kylmin lukema, mikä asutussa paikassa '
              + 'on koskaan mitattu. Transsiperian rata vie Moskovasta '
              + 'Vladivostokiin 9 289 kilometriä ja seitsemän aikavyöhykettä, '
              + 'ja matka kestää junassa lähes viikon.\n\nElanto tulee suurelta '
              + 'osin öljystä, kaasusta, metalleista ja viljasta: Venäjä on '
              + 'maailman suurin vehnän viejä. Kirjallisuus ja musiikki ovat '
              + 'maan ylpeys — Tolstoin ja Dostojevskin romaanit, Tšaikovskin '
              + 'baletit ja Moskovan Bolšoi tunnetaan kaikkialla. Venäjä '
              + 'hyökkäsi Ukrainaan helmikuussa 2022. Sota näkyy arjessa: '
              + 'länsimaiset kaupat lähtivät, ulkomaanmatkustus vaikeutui ja '
              + 'satojatuhansia venäläisiä muutti pois maasta.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Viro: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa, viimeinen
    // päättyy koukkuun kartan nostoon (Kaalin kraatteri).
    intro: 'Viro on Suomenlahden eteläpuolinen naapurimme, kahden tunnin '
             + 'laivamatkan päässä Helsingistä. Maa on tasainen — korkein '
             + 'kohta Suur Munamägi jää 318 metriin — ja yli puolet siitä on '
             + 'metsää.'
             + '\n\nSen näkee kartasta: vihreä pysyy samanlaisena laidasta '
             + 'laitaan, ja ruskeaa on vain kaakkoiskulmassa, missä Munamägi '
             + 'kohoaa. Lännessä maa hajoaa saariksi, joita on luotoineen '
             + 'runsaat 2 000; suurimmat ovat Saarenmaa ja Hiidenmaa. Idässä '
             + 'rajana on Peipsijärvi, jonka takana alkaa Venäjä.'
             + '\n\nYhdellä saarella on kohta, joka on kartalle liian pieni '
             + 'mutta silti etsimisen arvoinen: metsän keskellä on täysin '
             + 'pyöreä kuoppa. Sen teki taivaalta pudonnut rautamöhkäle.',
    teksti: 'Viro on suomen lähin sukukieli, ja sanat näyttävät tutuilta — '
              + 'mutta eivät aina tarkoita samaa. Viron raamat on kirja, piim '
              + 'on maitoa ja hallitus tarkoittaa hometta. Etelä-Virossa '
              + 'puhutaan lisäksi võroa: vuoden 2021 väestölaskennassa võroa '
              + 'tai sen lähisukuista setoa ilmoitti osaavansa noin 97 000 '
              + 'ihmistä, pelkkää võroa noin 72 000.\n\nViroa ovat vuosisatojen '
              + 'mittaan hallinneet tanskalaiset, saksalaiset, ruotsalaiset ja '
              + 'venäläiset. Tallinnan nimen arvellaan tulevan sanoista Taani '
              + 'linn, tanskalaisten kaupunki. Itsenäisyys julistettiin 1918, '
              + 'mutta Neuvostoliitto miehitti maan 1940. Vapautuminen alkoi '
              + 'laulaen: Baltian ketjussa 23. elokuuta 1989 noin kaksi '
              + 'miljoonaa ihmistä seisoi käsi kädessä 675 kilometrin jonossa '
              + 'Tallinnasta Vilnaan. Viro palautti itsenäisyytensä 20. '
              + 'elokuuta 1991.\n\nNyky-Viro tunnetaan digitaalisuudestaan. '
              + 'Verkossa äänestäminen tuli mahdolliseksi ensimmäisenä '
              + 'maailmassa jo 2005, ja vuoden 2023 parlamenttivaaleissa yli '
              + 'puolet äänistä annettiin netissä. Skype kehitettiin '
              + 'Tallinnassa, ja lähes kaikki viranomaisasiat hoituvat '
              + 'henkilökortilla kotisohvalta. Vanhaa ei silti ole unohdettu: '
              + 'laulujuhlien yhteiskuorossa laulaa kerralla kymmeniätuhansia '
              + 'ihmisiä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Latvia: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa, jossa ei ole
    // vuoria; viimeinen päättyy koukkuun kartan nostoon.
    intro: 'Latvia on Baltian maista keskimmäinen: Viro pohjoisessa, '
             + 'Liettua etelässä ja Itämeri lännessä. Riika on Baltian suurin '
             + 'kaupunki, ja sen keskustassa on yli 700 jugendtaloa — enemmän '
             + 'kuin missään muualla maailmassa.'
             + '\n\nKorkokartta on melkein kokonaan vihreä, eikä se ole '
             + 'kartan vika: Latviassa ei ole vuoria, vaan metsää ja matalia '
             + 'kumpuja. Pohjoisesta työntyy maahan syvä lovi, Riianlahti, ja '
             + 'sen pohjukkaan perustettiin Riika vuonna 1201. Ruskeampia '
             + 'laikkuja näkyy vain keskellä maata ja kaakossa, missä maa '
             + 'kohoaa loiviksi ylängöiksi.'
             + '\n\nLatvia ja liettua ovat maailman ainoat elossa olevat '
             + 'balttilaiset kielet, ja Latgalen maakunnassa puhutaan vielä '
             + 'omaa latgalia. Yhden tempun tasainen maa silti tekee: '
             + 'lännessä, Kuldīgan kohdalla, joki putoaa kalliokynnyksen yli '
             + 'niin leveänä, ettei Euroopassa ole leveämpää putousta.',
    teksti: 'Latvia ja liettua ovat maailman ainoat elossa olevat '
              + 'balttilaiset kielet. Ne ovat säilyttäneet niin vanhoja '
              + 'indoeurooppalaisia piirteitä, että kielitieteilijät tutkivat '
              + 'niitä päästäkseen jäljille siitä, miltä esi-isien kieli '
              + 'kuulosti. Latgalen maakunnassa puhutaan omaa latgalin kieltä, '
              + 'jota vuoden 2011 laskennassa ilmoitti käyttävänsä noin 165 000 '
              + 'ihmistä.\n\nRiika perustettiin 1201 ja kasvoi '
              + 'hansakaupungiksi. Latviaa ovat hallinneet saksalaiset ritarit, '
              + 'ruotsalaiset, puolalaiset ja venäläiset. Maa itsenäistyi 1918, '
              + 'Neuvostoliitto miehitti sen 1940, ja itsenäisyys palautui '
              + '1991. EU:n ja Naton jäseneksi Latvia liittyi 2004 ja euroon '
              + '2014.\n\nRiian keskustori toimii viidessä jättihallissa, jotka '
              + 'rakennettiin 1930 vanhoista saksalaisista zeppeliinihalleista '
              + '— se on yhä Euroopan suurimpia toreja. Laulujuhlia on pidetty '
              + 'vuodesta 1873, ja ensimmäiset pidettiin juuri Riiassa; '
              + 'yhteiskuorossa voi olla yli kymmenentuhatta laulajaa. Perinne '
              + 'on Unescon aineettoman kulttuuriperinnön luettelossa yhdessä '
              + 'Viron ja Liettuan laulujuhlien kanssa.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Liettua: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa, viimeinen
    // päättyy koukkuun kartan nostoon (Trakain saarilinna).
    intro: 'Liettua on Baltian maista suurin ja eteläisin. 1400-luvulla '
             + 'Liettuan suuriruhtinaskunta oli Euroopan laajin valtio ja '
             + 'ulottui Itämereltä Mustallemerelle; se oli myös Euroopan '
             + 'viimeinen pakanallinen valtio.'
             + '\n\nKorkokartalla maa on melkein kokonaan vihreä, eikä se '
             + 'ole kartan vika: Liettuassa ei ole vuoria, vaan loivia '
             + 'harjuja, metsää ja järviä. Lännessä erottuu ohut '
             + 'hiekkakaistale, Kuurinkynnäs, joka sulkee taakseen oman '
             + 'lahtensa; sen dyynit nousevat kuudenkymmenen metrin '
             + 'korkeuteen. Idässä maa on täynnä pieniä järviä.'
             + '\n\nKristinusko tuli Liettuaan vasta 1387, myöhemmin kuin '
             + 'mihinkään muuhun Euroopan maahan, ja liettuan kieli on '
             + 'elävistä indoeurooppalaisista kielistä arkaaisin. '
             + 'Šiauliain lähellä kohoaa Ristien mäki, jolle ihmiset ovat '
             + 'tuoneet jo yli satatuhatta ristiä. Ja yhdessä itäisistä '
             + 'järvistä on saari, jolla seisoo kokonainen punatiilinen '
             + 'linna.',
    teksti: 'Liettuan suuriruhtinaskunta liittyi 1569 Puolan kanssa '
              + 'yhteiseksi valtioksi, joka kesti yli kaksisataa vuotta. '
              + 'Kristinusko tuli Liettuaan vasta 1387 — myöhemmin kuin '
              + 'mihinkään muuhun Euroopan maahan. Liettuan kieli on elävistä '
              + 'indoeurooppalaisista kielistä arkaaisin: siinä on säilynyt '
              + 'äänteitä ja taivutusmuotoja, jotka ovat muualta '
              + 'kadonneet.\n\nŠiauliain kaupungin lähellä kohoaa Ristien mäki, '
              + 'jolle ihmiset ovat tuoneet ristejä 1800-luvulta lähtien. '
              + 'Neuvostoviranomaiset raivasivat mäen puskutraktoreilla '
              + 'kolmesti, mutta ristit ilmestyivät öisin takaisin. Nyt niitä '
              + 'on yli satatuhatta. Liettua julistautui 11. maaliskuuta 1990 '
              + 'ensimmäisenä neuvostotasavaltana itsenäiseksi.\n\nVilnan '
              + 'vanhakaupunki on Pohjois-Euroopan laajimpia keskiaikaisia '
              + 'keskustoja, noin 3,6 neliökilometriä, ja Unescon '
              + 'maailmanperintökohde. Rannikolla kaartuu Kuurinkynnäs, 98 '
              + 'kilometriä pitkä hiekkaniemi, jonka dyynit nousevat '
              + 'kuudenkymmenen metrin korkeuteen. Koripallo on maan rakkain '
              + 'urheilulaji — liettualaiset sanovat sitä puolileikillään '
              + 'toiseksi uskonnokseen.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Suomi: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa, viimeinen
    // päättyy koukkuun kartan nostoon (Lokan tekojärvi).
    intro: 'Suomi on Euroopan harvimmin asuttuja maita: noin 18 asukasta '
             + 'neliökilometrillä, ja Lapissa paljon vähemmän. Etelästä '
             + 'pohjoiseen matkaa on 1 160 kilometriä, ja metsä peittää '
             + 'maasta noin kolme neljäsosaa.'
             + '\n\nKartta on melkein kokonaan vihreä, koska maa on matalaa: '
             + 'vasta luoteessa se kohoaa tuntureiksi Ruotsin ja Norjan '
             + 'rajaa kohti. Keskellä ja idässä vihreän seassa on niin '
             + 'tiheässä sinistä, että järvet sulautuvat yhdeksi tahraksi — '
             + 'niitä on 187 888. Rannikon edustalla sama toistuu saarina, '
             + 'joita on 179 584.'
             + '\n\nMelkein kaikki nämä vedet ovat jääkauden jälkiä, mutta '
             + 'eivät aivan kaikki. Kartan pohjoisosassa on kaksi suurta '
             + 'allasta, joita ei ollut vielä 1960-luvulla.',
    teksti: 'Suomi kuului Ruotsiin noin kuusisataa vuotta ja sen jälkeen '
              + 'Venäjän keisarikuntaan autonomisena suuriruhtinaskuntana '
              + '1809–1917. Itsenäisyys julistettiin 6. joulukuuta 1917, ja '
              + 'seuraavana keväänä käytiin sisällissota, jossa valkoiset ja '
              + 'punaiset taistelivat vallasta ja jonka valkoiset voittivat. '
              + 'Neuvostoliitto hyökkäsi Suomeen 30. marraskuuta 1939, ja '
              + 'talvisota alkoi. Sotien jälkeen Suomi säilytti itsenäisyytensä '
              + 'mutta luovutti Karjalan: yli 400 000 ihmistä — noin joka '
              + 'yhdeksäs suomalainen — lähti evakkoon ja asutettiin uudelleen '
              + 'muualle maahan.\n\nSuomen kieli ei ole sukua ruotsille eikä '
              + 'venäjälle vaan virolle ja kaukaisemmin unkarille. Siinä on '
              + 'viisitoista sijamuotoa eikä lainkaan artikkeleita tai '
              + 'kieliopillista sukua — sama sana hän tarkoittaa sekä miestä '
              + 'että naista. Suomen alkuperäiskansa ovat saamelaiset: heitä on '
              + 'maassa noin 10 000, ja heidän omat kielensä ovat suomen '
              + 'sukukieliä. Ensimmäisen suomeksi painetun kirjan teki Mikael '
              + 'Agricola 1543, ja Elias Lönnrot kokosi Kalevalan 1835 '
              + 'runoista, jotka hän kirjoitti muistiin laulajilta Vienan '
              + 'Karjalassa.\n\nArjessa näkyy sauna: niitä on yli kolme '
              + 'miljoonaa eli lähes yksi jokaista kahta asukasta kohti. '
              + 'Jokainen koululainen saa päivittäin maksuttoman lämpimän '
              + 'aterian — Suomi oli ensimmäinen maa maailmassa, joka teki '
              + 'siitä lakisääteisen. Metsä on myös elinkeino: paperi, sellu ja '
              + 'sahatavara ovat yhä maan suurimpia vientituotteita, ja '
              + 'jokamiehenoikeus antaa kenen tahansa kulkea metsissä ja poimia '
              + 'marjat.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Ruotsi: {
    // Muita pidempi tarkoituksella: Tukholman lehden maaosasto nojaa
    // tähän yksin (sama malli kuin Italialla, Egyptillä ja Espanjalla).
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä (omistajan toive 7.8.2026). Ensimmäinen kappale
    // selittää sen, mitä korkokartta näyttää: pitkä maa, tunturit
    // Norjan rajalla ja väki etelässä.
    intro: 'Ruotsi ulottuu 1 572 kilometriä etelästä pohjoiseen — '
             + 'suunnilleen sama matka kuin Kööpenhaminasta Roomaan. '
             + 'Pohjoisessa maa nousee tuntureiksi, joiden takana on '
             + 'Norja, ja etelässä se laskeutuu viljalakeuksiksi; välissä '
             + 'on metsää, jota riittää yli puolelle pinta-alasta.'
             + '\n\nSaaria on 267 570, enemmän kuin missään muussa maassa, '
             + 'mutta valtaosa 10,6 miljoonasta asukkaasta asuu '
             + 'eteläisessä kolmanneksessa.'
             + '\n\nMaan vauraus rakennettiin raudasta, puusta ja '
             + 'vesivoimasta, ja sen tunnetuimmat vientituotteet ovat '
             + 'nykyään huonekaluja, autoja ja popmusiikkia. '
             + 'Ruotsi ei ole ollut sodassa vuoden 1814 jälkeen — '
             + 'yhtäjaksoisesti pidempään kuin juuri mikään muu valtio.',
    teksti: '1600-luvulla Ruotsi oli suurvalta, jonka rajojen sisällä '
              + 'olivat Suomi, Baltia ja palasia Pohjois-Saksaa. Viimeisen '
              + 'sotansa se kävi 1814. Sen jälkeen maa on ollut yhtäjaksoisesti '
              + 'rauhassa pidempään kuin juuri mikään muu valtio, ja se pysyi '
              + 'puolueettomana molempien maailmansotien ajan. '
              + 'Puolueettomuudesta luovuttiin 2024, kun Ruotsi liittyi '
              + 'Natoon.\n\nRuotsalaista yhteiskuntaa määrittää avoimuus. '
              + 'Painovapausasetus vuodelta 1766 oli maailman ensimmäinen '
              + 'laatuaan, ja se teki viranomaisten asiakirjoista julkisia. '
              + 'Allemansrätten eli jokamiehenoikeus sallii kaikkien kulkea, '
              + 'telttailla ja poimia marjoja toistenkin mailla. '
              + 'Vanhempainvapaata on 480 päivää lasta kohti, ja osa siitä on '
              + 'varattu nimenomaan isälle.\n\nPohjoisessa Sápmissa saamelaiset '
              + 'ovat asuneet kauan ennen valtioiden rajoja; osa hoitaa poroja, '
              + 'mutta useimmat tekevät muuta työtä. Ruotsi harjoitti '
              + '1800-luvulta 1970-luvulle sulauttamispolitiikkaa, jossa saamea '
              + 'ei saanut käyttää koulussa. Saamelaiskäräjät aloitti työnsä '
              + '1993, ja saame on ollut yksi Ruotsin virallisista '
              + 'vähemmistökielistä vuodesta 2000. Kokoonsa nähden maa vie '
              + 'paljon kulttuuria: Astrid Lindgrenin Peppi Pitkätossu ilmestyi '
              + '1945 ja on käännetty yli 70 kielelle, ja Ikea, Volvo ja '
              + 'Spotify ovat kaikki lähtöisin täältä.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Norja: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa, kolmas
    // päättyy koukkuun kartan nostoon (Saltstraumen).
    intro: 'Norjan rantaviiva on saarineen 100 915 kilometriä — kaksi ja '
             + 'puoli kertaa maapallon ympärysmitta. Saaria on yli 239 000 ja '
             + 'vuonoja satoja, ja pisin niistä, Sognefjord, työntyy 205 '
             + 'kilometriä sisämaahan.'
             + '\n\nKorkokartalla maa on kapea ja pitkä: ruskea tunturiselkä '
             + 'kulkee Ruotsin rajaa pitkin, ja sen länsipuolella rannikko on '
             + 'revitty vuonoiksi ja saariksi. Ne ovat jääkauden jälki — '
             + 'kilometrien paksuinen jää kaivoi laaksot merenpinnan '
             + 'alapuolelle, ja meri täytti ne, kun jää suli. Kapeimmillaan '
             + 'maa on vain 6,3 kilometriä leveä, ja pohjoisessa se kaartuu '
             + 'Suomen yläpuolelta itään asti.'
             + '\n\nVuono on syvä, mutta sen suulla on usein matala kynnys: '
             + 'Sognefjord ylettyy 1 308 metrin syvyyteen, vaikka suussa '
             + 'vettä on vain noin sata metriä. Kun meri nousee ja laskee, '
             + 'sen on mahduttava juuri näistä kapeikoista — eikä se '
             + 'kaikkialla mahdu rauhassa.',
    teksti: 'Vuonot ovat jääkauden jälki: kilometrien paksuinen jää kaivoi '
              + 'laaksot merenpinnan alapuolelle, ja meri täytti ne, kun jää '
              + 'suli. Sognefjord on syvimmillään 1 308 metriä, vaikka sen '
              + 'suulla on vain noin sadan metrin syvyinen kynnys. Moneen '
              + 'vuonon perukan kylään pääsee yhä helpommin veneellä kuin '
              + 'autolla.\n\nNorja oli Tanskan yhteydessä vuodesta 1380 ja '
              + 'Ruotsin kanssa unionissa 1814–1905. Perustuslaki kirjoitettiin '
              + 'Eidsvollissa 17. toukokuuta 1814, ja se on yhä voimassa — vain '
              + 'Yhdysvaltain perustuslaki on vanhempi. Päivämäärästä tuli '
              + 'kansallispäivä, jota vietetään lasten kulkueilla eikä '
              + 'sotilasparaatilla. Saksa miehitti maan 1940–1945.\n\nÖljyä '
              + 'löytyi Pohjanmereltä Ekofiskin kentältä 1969, eikä tuloja '
              + 'käytetty heti vaan pantiin rahastoon. Öljyrahasto on nykyään '
              + 'maailman suurin valtiollinen sijoitusrahasto, ja se omistaa '
              + 'noin puolitoista prosenttia kaikista maailman '
              + 'pörssiosakkeista. Valtio saa käyttää siitä vuodessa vain '
              + 'muutaman prosentin. Öljyllä vaurastunut maa ajaa nyt sähköllä: '
              + 'vuonna 2025 lähes 96 prosenttia uusista henkilöautoista oli '
              + 'sähköautoja.',
    lahde: 'Wikipedia (CC BY-SA)',
  },

  Tanska: {
    // Kappalejaot (\n\n) näkyvät maaosion aloitussivulla kartan
    // vieressä. Keskimmäinen kappale lukee korkokarttaa, kolmas alkaa
    // koukulla kartan nostoon (Grenenin hiekkakärki).
    intro: 'Tanska on matala ja pirstoutunut: saaria on yli 400, joista '
             + 'noin 70 on asuttuja, ja korkein luonnonkohta Møllehøj kohoaa '
             + '170,86 metriin. Mistään maan kohdasta ei ole merelle enempää '
             + 'kuin noin 50 kilometriä.'
             + '\n\nKorkokartalla sen näkee heti: koko maa on samaa vaaleaa '
             + 'vihreää, eikä ruskeaa ole missään. Vasemmalla on Jyllannin '
             + 'niemimaa, joka kiinnittyy Saksaan, ja sen itäpuolella ovat '
             + 'saaret — Fyn, Sjælland ja aivan oikeassa laidassa Bornholm. '
             + 'Kartan yläkulmassa maasto muuttuu tummemmaksi ja '
             + 'korkeammaksi: se on jo Ruotsia, ja Kööpenhaminasta sinne on '
             + 'vain salmen verran matkaa.'
             + '\n\nPohjoisessa Jyllanti ei lopu rantaan vaan kapenee '
             + 'ohueksi hiekkakieleksi keskelle merta. Vettä on joka '
             + 'puolella, joten maa on kurottu yhteen silloilla: Ison-Beltin '
             + 'silta valmistui 1998 ja Juutinrauman silta-tunneli Malmöhön '
             + 'vuonna 2000.',
    teksti: 'Saarten yhdistäminen on ollut iso urakka. Ison-Beltin silta '
              + 'valmistui 1998, ja sen riippusillan jänneväli on 1 624 metriä '
              + '— maailman pisimpiä. Juutinrauman silta-tunneli Malmöhön '
              + 'avattiin 2000: ensin seitsemän kilometriä siltaa, sitten '
              + 'tekosaari ja neljä kilometriä tunnelia, jotta viereisen '
              + 'lentokentän nousureitti pysyisi vapaana.\n\nViikinkiaika näkyy '
              + 'Jellingissä, missä kuningas Harald Sinihammas pystytti noin '
              + 'vuonna 965 riimukiven ja kertoi siinä tehneensä tanskalaisista '
              + 'kristittyjä. Kiveä sanotaan Tanskan kastetodistukseksi, ja '
              + 'sama kuningas antoi nimensä Bluetooth-tekniikalle: sen tunnus '
              + 'on hänen nimikirjaimensa riimuina. Myöhemmin valtakunta '
              + 'kutistui — Norja meni 1814 ja Schleswig 1864. Nykyään Tanskan '
              + 'valtakuntaan kuuluvat lisäksi itsehallinnolliset Grönlanti ja '
              + 'Färsaaret. Grönlannista Tanska teki siirtomaansa vuonna 1721, '
              + 'ja saari sai itsehallinnon 1979 ja laajemman itsehallinnon '
              + '2009. Tanskalla oli myös kolme sokerisaarta Karibialla: se '
              + 'kuljetti niille orjuutettuja afrikkalaisia, kielsi orjakaupan '
              + '1803 ja orjuuden 1848.\n\nSähkönsä Tanska tekee tuulesta: 2024 '
              + 'tuulivoiman osuus oli noin 58 prosenttia, suurempi kuin '
              + 'missään muussa maassa. Kööpenhaminan keskustassa polkupyöriä '
              + 'on enemmän kuin autoja. Ja Billundin pikkukaupungissa puuseppä '
              + 'Ole Kirk Christiansen perusti 1932 lelupajan ja antoi sille '
              + '1934 nimen sanoista leg godt, leiki hyvin — Legosta tuli '
              + 'maailman suurin lelunvalmistaja.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  Albania: {
    intro: 'Albania on Balkanin niemimaalla Kaakkois-Euroopassa sijaitseva valtio, '
      + 'jonka pinta-ala on 28 748 neliökilometriä. Se rajoittuu Montenegroon, '
      + 'Kosovoon, Pohjois-Makedoniaan ja Kreikkaan, ja sen länsirannikkoa '
      + 'huuhtovat Adrianmeri ja Joonianmeri. Maisema vaihtelee lyhyillä '
      + 'etäisyyksillä: sisämaassa kohoavat lumihuippuiset Albanian Alpit ja '
      + 'Korabin vuoristo, rannikolla levittäytyvät hedelmälliset tasangot. '
      + 'Pääkaupunki ja suurin kaupunki on Tirana, ja muita tärkeitä kaupunkeja '
      + 'ovat Durrës, Vlorë ja Shkodër. Virallinen kieli on albania. Vuoden '
      + '2023 väestönlaskennan mukaan asukkaista noin 96 prosenttia on etnisiä '
      + 'albaaneja, ja loput kuuluvat kreikkalaiseen ja muihin vähemmistöihin. '
      + 'Maan ilmasto, kivilajit, vesistöt ja maanmuodot ovat poikkeuksellisen '
      + 'kirjavia.',
    teksti: 'Alueella asuivat antiikin aikana illyyrialaiset heimot, ja roomalaiset '
      + 'valtasivat sen noin vuonna 167 eaa. Bysantin vallan jälkeen alueelle '
      + 'syntyi vuonna 1190 Arbanonin ruhtinaskunta. Osmanien hallinta alkoi '
      + '1400-luvulla ja kesti itsenäisyyden julistamiseen 28. marraskuuta '
      + '1912, jolloin Albaniasta tuli itsenäinen valtio. 1900-luvun '
      + 'jälkipuoliskolla maata hallitsi kommunistinen Enver Hoxha, ja siirtymä '
      + 'demokratiaan tapahtui 1990-luvulla. Nykyään Albania on ylemmän '
      + 'keskitulotason kehittyvä maa, jonka väestö ja talous ovat muuttuneet '
      + 'paljon vuosikymmenten aikana. Se on Euroopan unionin jäsenehdokas, ja '
      + 'liittymisneuvottelut alkoivat vuonna 2022. Kulttuurin ja maiseman '
      + 'rikkaus tekee maasta kiehtovan matkakohteen.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  'Valko-Venäjä': {
    intro: 'Valko-Venäjä on Itä-Euroopan sisämaavaltio, jonka naapureita ovat '
      + 'Venäjä, Ukraina, Puola, Liettua ja Latvia. Sen pinta-ala on noin 207 '
      + '600 neliökilometriä ja asukkaita arvioidaan olevan 9,1 miljoonaa. Maa '
      + 'on enimmäkseen matalaa tasankoa: korkein kohta, Dzjaržynskaja-vuori, '
      + 'yltää vain 346 metriin. Metsää on noin 43 prosenttia maa-alasta, '
      + 'järviä noin 4 000, ja Länsi-Väinä ja Nemunas virtaavat kohti länttä '
      + 'sekä Dnepr sivujokineen etelään. Etelän Polesien alavaa suoseutua '
      + 'leimaavat laajat kosteikot. Viralliset kielet ovat valkovenäjä ja '
      + 'venäjä, ja vuoden 2019 laskennassa valkovenäläisiä oli 84,9 prosenttia '
      + 'asukkaista. Pääkaupunki ja suurin kaupunki on Minsk, jolla on oma '
      + 'hallinnollinen asemansa. Ilmasto on hemiboreaalinen, ja tammikuun '
      + 'keskilämpötila on noin −6 astetta.',
    teksti: 'Keskiajalla alueella oli itsenäisiä ruhtinaskuntia ja kaupunkeja, '
      + 'kuten Polotsk. Noin vuonna 1300 alue liitettiin Liettuan '
      + 'suuriruhtinaskuntaan, ja vuonna 1569 se tuli osaksi Puolan–Liettuan '
      + 'yhteisvaltiota. Yhteisvaltion jaoissa 1792–1795 alue siirtyi Venäjän '
      + 'keisarikuntaan, ja vuonna 1922 Valko-Venäjä oli perustamassa '
      + 'Neuvostoliittoa. Maa julisti itsenäisyytensä 25. elokuuta 1991. '
      + 'Uskonnollisesti maa on suurelta osin kristitty: vuoden 2020 tietojen '
      + 'mukaan kristittyjä on 91 prosenttia ja ortodokseja 83,3 prosenttia '
      + 'väestöstä. Venäläisiä on 7,5, puolalaisia 3,1 ja ukrainalaisia 1,7 '
      + 'prosenttia asukkaista. Maan luonnossa vuorottelevat metsät, järvet ja '
      + 'suot, ja Narachin kansallispuisto sekä Berezinan biosfäärialue ovat '
      + 'sen tunnetuimpia suojelualueita.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  Moldova: {
    intro: 'Moldova on sisämaavaltio Itä-Euroopassa Romanian ja Ukrainan välissä. '
      + 'Lännessä rajana virtaa Prut ja idässä Dnestr, ja niiden välissä '
      + 'levittäytyy kumpuilevaa tasankoa, jonka korkein kohta, '
      + 'Bălănești-kukkula, yltää 430 metriin. Maan pinta-ala on noin 33 800 '
      + 'neliökilometriä ja asukkaita on noin 2,4 miljoonaa. Ilmasto on '
      + 'lauhkean mannermainen: tammikuun keskilämpötila on noin −4 ja kesän '
      + 'noin 20 astetta. Pääkaupunki Chișinău on noin 695 000 asukkaan '
      + 'kaupunki. Virallinen kieli on romania, ja rinnalla kuullaan venäjää, '
      + 'ukrainaa, gagauzia ja bulgariaa. Vuoden 2024 väestönlaskennassa '
      + 'moldovalaisiksi ilmoittautui 76,7 prosenttia, romanialaisiksi 8,0, '
      + 'ukrainalaisiksi 5,1 ja gagauzeiksi 4,0 prosenttia; luvuissa ei ole '
      + 'mukana Transnistrian aluetta. Hedelmällinen musta multa on tehnyt '
      + 'maasta viljelyseudun.',
    teksti: 'Moldovan ruhtinaskunta syntyi Karpaattien itäpuolelle 1300-luvulla. '
      + 'Stefan Suuri hallitsi sitä vuosina 1457–1504 ja puolustautui '
      + 'menestyksekkäästi Unkaria, Puolaa ja osmaneja vastaan. Vuodesta 1538 '
      + 'ruhtinaskunta oli osmanien vasalli mutta piti sisäisen '
      + 'itsehallintonsa. Vuonna 1812 sen itäpuolisko, Bessarabia, siirtyi '
      + 'Venäjän keisarikunnalle. Moldovan demokraattinen tasavalta '
      + 'julistettiin joulukuussa 1917, ja huhtikuussa 1918 alue liittyi '
      + 'Romaniaan. Kesäkuussa 1940 Neuvostoliitto liitti Bessarabian itseensä. '
      + 'Itsenäisyys julistettiin 27. elokuuta 1991. Nykyään taloudessa '
      + 'painavat maatalous ja viini: viinitarhoja on 148 500 hehtaaria, ja '
      + 'noin kahden miljoonan hehtolitran tuotanto oli vuonna 2018 Euroopan '
      + 'yhdenneksitoista suurin.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  'Pohjois-Makedonia': {
    intro: 'Pohjois-Makedonia on sisämaavaltio Kaakkois-Euroopassa, Balkanin '
      + 'niemimaalla. Sen pinta-ala on 25 436 neliökilometriä, ja '
      + 'rajanaapureita ovat Kosovo ja Serbia pohjoisessa, Bulgaria idässä, '
      + 'Kreikka etelässä sekä Albania lännessä. Maa on vuoristoinen: korkein '
      + 'huippu Korab nousee 2 764 metriin, ja Vardar-joki virtaa maan halki '
      + '388 kilometrin matkan kerätessään vetensä noin 80 prosentilta maan '
      + 'alasta. Suurimmat järvet ovat Ohrid, Prespa ja Dojran, ja Ohrid on '
      + 'Balkanin syvin, 288 metriä. Ilmasto on etelässä välimerellinen ja '
      + 'pohjoisessa mannermainen. Vuoden 2021 väestölaskennassa asukkaita oli '
      + '1 836 713, ja pääkaupunki Skopje on suurin kaupunki: siellä asuu noin '
      + 'neljännes väestöstä. Makedonialaisia on 58,4 prosenttia ja albaaneja '
      + '24,3 prosenttia. Virallinen kieli on makedonia, ja albania on toinen '
      + 'virallinen kieli.',
    teksti: 'Alueella eli antiikissa paionialaisia, ja myöhemmin se liitettiin '
      + 'Makedonian kuningaskuntaan Filippos II:n aikana. Slaavit asettuivat '
      + 'seudulle 500-luvulla, ja 800-luvulla Ohridista tuli oppineisuuden '
      + 'keskus: kirjoituskoulussa kerrotaan opiskelleen yli 3 000 oppilasta. '
      + 'Ottomaanien valta alkoi 1300-luvun lopussa ja kesti vuoteen 1912. '
      + 'Balkanin sotien jälkeen alue kuului Serbialle, ja vuonna 1945 siitä '
      + 'tuli yksi Jugoslavian osavaltioista. Itsenäisyysäänestys pidettiin 8. '
      + 'syyskuuta 1991, ja 95,26 prosenttia äänesti itsenäisyyden puolesta. '
      + 'Arjessa historia näkyy vanhoina kaupunkeina, viinitarhoina ja '
      + 'ruokakulttuurina, jossa ottomaanien ja balkanilaiset vaikutteet elävät '
      + 'rinnakkain.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  Montenegro: {
    intro: 'Montenegro on Balkanin niemimaalla Kaakkois-Euroopassa sijaitseva '
      + 'pieni valtio, jonka pinta-ala on noin 13 900 neliökilometriä. Sen '
      + 'naapureita ovat Serbia, Bosnia ja Hertsegovina, Kosovo, Albania ja '
      + 'Kroatia, ja lounaassa maa avautuu Adrianmerelle. Maisema vaihtelee '
      + 'rannikosta Skutarijärven kosteikkoihin ja pohjoisen kalkkikivivuoriin, '
      + 'joiden korkein huippu Zla Kolata yltää 2 534 metriin. Pääkaupunki ja '
      + 'suurin kaupunki on Podgorica, ja vanha kuninkaallinen pääkaupunki '
      + 'Cetinje on maan kulttuurikeskus. Vuoden 2023 väestölaskennassa '
      + 'asukkaita oli noin 624 000. Suurimmat ryhmät ovat montenegrolaiset (41 '
      + 'prosenttia) ja serbit (33 prosenttia), ja mukana on myös bosniakkeja, '
      + 'albaaneja ja muita ryhmiä. Virallinen kieli on montenegro, ja maan '
      + 'valuutta on euro.',
    teksti: 'Nykyisen Montenegron alueella oli varhaiskeskiajalla ruhtinaskuntia, '
      + 'kuten Duklja, ja Zetan ruhtinaskunta nousi esiin 1300–1400-luvuilla. '
      + 'Osmanien valta alkoi vuonna 1496, ja 1500-luvulta alkaen maata '
      + 'johtivat Petrović-Njegošin suvun ruhtinaspiispat. Berliinin kongressi '
      + 'tunnusti Montenegron itsenäisyyden vuonna 1878, ja vuonna 1910 siitä '
      + 'tuli kuningaskunta. Vuonna 1918 maa liittyi Jugoslaviaan, ja vuodesta '
      + '1945 se kuului sosialistiseen Jugoslaviaan. Montenegro julistautui '
      + 'itsenäiseksi vuoden 2006 kansanäänestyksen jälkeen, liittyi Natoon '
      + 'vuonna 2017 ja on ollut EU:n jäsenehdokas vuodesta 2012. Nykyään se on '
      + 'parlamentaarinen tasavalta, jonka talous nojaa palveluihin. Matkailua '
      + 'tukevat rannikko ja viisi kansallispuistoa, jotka peittävät noin '
      + 'kymmenesosan maan pinta-alasta.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  Serbia: {
    intro: 'Serbia on sisämaavaltio Kaakkois- ja Keski-Euroopan rajalla, Balkanin '
      + 'niemimaan pohjoisosassa. Maa rajoittuu Unkariin, Romaniaan, '
      + 'Bulgariaan, Pohjois-Makedoniaan, Kroatiaan, Bosnia ja Hertsegovinaan '
      + 'sekä Montenegroon. Pohjoisessa Vojvodinan tasangoilla virtaavat '
      + 'Tonava, Sava ja Tisza, ja etelässä maasto kohoaa vuoristoksi, jonka '
      + 'korkein huippu Midžor yltää 2 169 metriin. Väkeä oli vuoden 2022 '
      + 'laskennan mukaan noin 6,6 miljoonaa, ja asukastiheys on noin 84 '
      + 'asukasta neliökilometrillä. Pääkaupunki Belgrad sijaitsee Savan ja '
      + 'Tonavan yhtymäkohdassa. Serbit muodostavat 80,6 prosenttia väestöstä, '
      + 'ja suurimpia vähemmistöjä ovat unkarilaiset, bosniakit ja romanit. '
      + 'Virallinen kieli on serbia, ja ortodoksikristittyjä on noin 81 '
      + 'prosenttia asukkaista.',
    teksti: 'Serbian historian alkupäätä leimaa keskiaikainen valtio: kuningaskunta '
      + 'julistettiin vuonna 1217, ja Stefan Dušanin aikana vuonna 1346 se oli '
      + 'laajimmillaan valtakuntana. Vuoteen 1459 mennessä alue oli siirtynyt '
      + 'osmanien hallintaan. Vuosina 1804–1835 käynnissä ollut serbien '
      + 'vallankumous johti ruhtinaskunnan itsehallintoon, Berliinin kongressi '
      + 'tunnusti itsenäisyyden 1878 ja maa julistautui kuningaskunnaksi 1882. '
      + 'Vuonna 1918 Serbia liittyi Jugoslavian kuningaskuntaan, vuodesta 1945 '
      + 'se oli sosialistisen Jugoslavian tasavalta, ja Montenegron erottua '
      + 'vuonna 2006 se on ollut täysin itsenäinen. Nykyään Serbia on '
      + 'parlamentaarinen tasavalta, jonka valuutta on dinaari ja joka '
      + 'neuvottelee EU-jäsenyydestä. Kirjallisuuden Nobel-palkinnon saanut Ivo '
      + 'Andrić ja keksijä Nikola Tesla kuuluvat maan tunnetuimpiin nimiin.',
    lahde: 'Wikipedia (CC BY-SA)',
  },
  /*
   * PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierät e01–e02, tarkistettu 14 kaupunkia 0 virhettä):
   * Artikkelit wiki-otsikolla (vain dataa). Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa
   * maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e01-pilvi ja -e02-pilvi.
   */
  Belgrad: {
    intro: 'Belgrad on Serbian pääkaupunki ja maan suurin kaupunki, joka sijaitsee **Savan ja Tonavan yhtymäkohdassa**. Serbiankielinen nimi Beograd tarkoittaa valkoista kaupunkia. Lähteen mukaan se on yksi Euroopan vanhimmista yhtäjaksoisesti asutuista kaupungeista, ja jo antiikissa paikalla oli linnoitus nimeltä Singidunum.\n\nHistoriallinen ydin on Kalemegdanin harjanteella, jonka päässä seisoo **Belgradin linnoitus**. Vuoden 2022 väestölaskennan mukaan Belgradin kaupungin hallinnollisella alueella (Grad Beograd) asui 1 681 405 ihmistä. Isoisän matkavuonna 1873 kaupunki oli Serbian ruhtinaskunnan pääkaupunki, joka oli autonominen mutta ei vielä täysin itsenäinen. Ottomaanien varuskunta oli lähtenyt linnoituksesta vuonna 1867, ja mutkaisten katujen tilalle suunniteltiin Wienin mallin mukaista ruutukaavaa ja bulevardeja.\n\nKnez Mihailovan kadun rakennustyöt olivat alkaneet keväällä 1869, mutta **Pyhän Savan temppeli**, suurimpia rakennuksia, odotti vielä aloitustaan: sen rakennustyöt alkoivat vasta vuonna 1935. Nykyään Belgrad on Serbian poliittinen, taloudellinen ja kulttuurinen keskus.',
    teksti: 'Belgradin alueella asuttiin jo Vinča-kulttuurin aikana noin 5400–4500 eaa. Kelttiläinen skordiski-heimo antoi paikalle nimen Singidūn noin 279 eaa., ja roomalaiset tulivat alueelle 1. vuosisadalla eaa.. Nimi Belograd mainitaan ensimmäisen kerran 16. huhtikuuta 878 paavin kirjeessä Bulgarian hallitsijalle.\n\nRuhtinas Mihailo Obrenović siirsi Serbian pääkaupungin Kragujevacista Belgradiin vuonna 1841. Ottomaanien varuskunta lähti Kalemegdanin linnoituksesta 18. huhtikuuta 1867, ja samana vuonna kaupunkisuunnittelija Emilijan Josimović laati suunnitelman, jossa mutkaiset kadut korvattiin ruutukaavalla. Täysi itsenäisyys tuli vuonna 1878 ja kuningaskunta syntyi vuonna 1882.\n\nKaupungin keskusta on kukkulaista maastoa Savan oikealla rannalla, ja Uusi Belgrad rakennettiin vasemmalle rannalle toisen maailmansodan jälkeen. Belgrad oli Jugoslavian pääkaupunki sen synnystä hajoamiseen asti. Zemun, keskustan oma Keski-Euroopan tyylinen osa, kuului vuoteen 1918 Itävalta-Unkariin.',
  },
  Bratislava: {
    intro: 'Bratislava on Slovakian pääkaupunki, ja se seisoo Tonavan rannalla lounaisessa Slovakiassa Pienten Karpaattien juurella. Lähteen mukaan se on ainoa pääkaupunki, joka rajoittuu kahteen valtioon, Itävaltaan ja Unkariin, ja Wieniin on matkaa noin 50–60 kilometriä. Bratislavan kaupungissa (piirit I-V) asui 31.12.2025 yhteensä 480 902 ihmistä.\n\nIsoisän matkavuonna 1873 kaupunki oli **Pozsony eli Pressburg**, Unkarin kuningaskunnan kaupunki Itävalta-Unkarissa, ja nimi Bratislava tuli viralliseksi vasta maaliskuussa 1919. Unkarin pääkaupunki se oli 1500-luvulta 1700-luvun lopulle, valtiopäivät kokoontuivat siellä 1848 asti, ja Pyhän Martinin tuomiokirkossa kruunattiin kuninkaita vuosina **1563–1830**. Linna kaupungin yläpuolella oli palanut raunioksi 1811.\n\nNykyään vanha kaupunki on pieni kävelykaupunki, jossa **linna, tuomiokirkko ja Mikaelin portti** kertovat kruunajaisten ajasta. Kaupungin musiikkiperinne ulottuu Haydnin ja Hummelin aikaan.',
    teksti: 'Bratislava on Slovakian pääkaupunki Tonavan rannalla, Pienten Karpaattien juurella. Tonava virtaa kaupungin läpi lännestä kaakkoon, ja Bratislavan kaupungin (piirit I-V) pinta-ala on 367,66 neliökilometriä. Pysyvää asutusta alueella on ollut jo uudella kivikaudella, noin 5500-5000 eaa. alkaen, ja kelttiläinen boii-heimo perusti noin 200-100 eaa. linnoitetun kaupungin ja löi kolikoita.\n\nKaupunki sai ensimmäiset tunnetut kaupunkioikeutensa 1291 ja kuului vapaana kuninkaallisena kaupunkina Unkarin kuningaskuntaan. Osmanien edetessä Unkarin pääkaupunki siirrettiin 1536 Pressburgiin, ja arkkipiispan istuin tuli sinne 1543. Valtiopäivät kokoontuivat täällä 1848 asti, ja tuomiokirkko toimi kruunajaiskirkkona vuosina 1563–1830. Kaupungin ensimmäinen pysyvä Tonavan silta valmistui vasta 1891.\n\nKaupungin nimet kertovat sen monikulttuurisuudesta: saksaksi Pressburg, unkariksi Pozsony ja slovakiksi Prešporok. Vuonna 1910 väestöstä 42 prosenttia puhui saksaa, 41 unkaria ja 15 slovakkia. Tunnusrakennuksia ovat Bratislavan linna, Pyhän Martinin tuomiokirkko, Vanha raatihuone ja Mikaelin portti.',
  },
  'Chișinău': {
    intro: 'Chișinău eli suomeksi Kišinjov on Moldovan pääkaupunki ja suurin kaupunki, ja se sijaitsee maan keskiosassa Bîc-joen varrella. Kaupunki mainitaan ensimmäisen kerran **vuonna 1436** luostarikylänä Moldavian ruhtinaskunnassa. Nimen uskotaan tulevan sanoista chișla ja nouă, uusi lähde, sillä kylä nousi pienen lähteen ympärille.\n\nVuonna 1812 Moldavian itäpuoli siirtyi Venäjän keisarikunnalle ja sai nimen Bessarabia, ja Chișinăusta tuli sen **keskus**. Isoisän matkavuonna 1873 kaupunki oli Venäjän keisarikunnan kaupunki, jonka keskuspuisto oli perustettu jo 1800-luvun alussa. Katedraali ja riemukaari seisoivat silloin jo paikoillaan, ja rautatie oli tullut kaupunkiin vuonna 1871.\n\nNykyään Chișinăun kunnassa asuu **720 128** ihmistä (2024), ja kaupunki on maan teollisuus- ja kauppakeskus sekä suurin liikenteen solmukohta. Sota ja maanjäristykset muuttivat keskustaa paljon 1900-luvulla, mutta 1800-luvun puistot ja kirkot ovat yhä sen ytimessä.',
    teksti: 'Chișinăun nimen alkuperä on epäselvä. Yleisin selitys yhdistää sen sanoihin chișla, lähde, ja nouă, uusi, sillä kylä nousi pienen lähteen ympärille Pușkin- ja Albișoara-katujen kulmaan. Kaupunki mainitaan ensimmäisen kerran vuonna 1436, ja se paloi Venäjän–Turkin sotien aikana kahdesti, 1739 ja 1788. Venäjäksi nimi on Kišinjov, unkariksi Kisjenő ja saksaksi Kischinau.\n\nVuoden 1812 jälkeen Chișinău kasvoi nopeasti Bessarabian hallintokeskuksena. Asukasluku kasvoi 1800-luvun alussa muutamasta tuhannesta kymmeniin tuhansiin, ja kaupungin asema virallistettiin 1818. Keskuspuisto perustettiin samana vuonna, katedraali rakennettiin 1830–1836 ja riemukaari valmistui 1840-luvulla.\n\nNykyinen Chișinău on rakentunut uudelleen useaan kertaan. Toisen maailmansodan vauriot ja maanjäristykset veivät monta rakennusta, ja 1940-luvun lopulla laadittiin suunnitelma kaupungin asteittaiseen jälleenrakennukseen. Silti keskustassa on yhä 1700- ja 1800-lukujen kirkkoja, puistoja ja julkisia rakennuksia.',
  },
  Minsk: {
    intro: 'Minsk on Valko-Venäjän pääkaupunki ja maan suurin kaupunki. Se sijaitsee Svislač-joen varrella noin 220 metrin korkeudessa, ja asukkaita on 1 995 091 (1.1.2026, Belstat) eli noin viidennes maan väestöstä. Ensimmäinen maininta nimellä Měneskъ on **vuoden 1067** kronikassa Nemihan taistelun yhteydessä, ja kaupunki oli lähteen mukaan ollut olemassa jo sitä ennen.\n\nIsoisän matkavuonna **1873** Minsk oli Venäjän keisarikunnan Minskin kuvernementin keskus ja kasvava ratasolmu. Moskova–Brest-rata kulki kaupungin kautta vuodesta 1871, ja tammikuussa 1873 avattiin Libava–Romny-radan Vilnan ja Minskin välinen osa; koko rata Romnyyn valmistui 1874. Kunnallinen vesijohto otettiin käyttöön lähteiden mukaan 1870-luvun alkupuolella (1872 tai 1874), ja Yläkaupunkiin nousi kaksi- ja kolmikerroksisia tiili- ja kivitaloja.\n\nToinen maailmansota muutti kaupungin kasvot: Minsk oli miehitettynä 1941–1944, ja vapautuksen aikaan asukkaita oli arviolta 40 000–50 000, ja suuri osa taloista oli raunioina. Vanha keskusta korvattiin 1940–50-luvuilla leveillä katuosuuksilla ja aukioilla, väkiluku ylitti miljoonan 1972 ja metro avattiin 1984. ',
    teksti: 'Minskin nimen alkuperä on epävarma: yksi selitys johtaa sen Menka-joesta, toinen kauppapaikkaa tarkoittavasta sanasta. Kaupunki kuului Polatskin ruhtinaskuntaan 980 mennessä ja Liettuan suuriruhtinaskuntaan 1242. Magdeburgin kaupunkioikeudet se sai 1499, ja Venäjälle se liitettiin 1793.\n\nVuonna 1918 Minskistä tuli Valko-Venäjän kansantasavallan pääkaupunki, ja 1919 se oli Valko-Venäjän sosialistisen neuvostotasavallan pääkaupunki. Sodan jälkeen kaupunki rakennettiin uudelleen. Ympäröivät kylät liitettiin siihen, ja niiden tilalle rakennettiin tiheitä asuinalueita.\n\nNykyään Minskin joukkoliikenteeseen kuuluvat kolme metrolinjaa, kahdeksan raitiolinjaa, yli 70 johdinautolinjaa ja yli sata bussilinjaa. Lähteen mukaan Minsk on maan suurin liikennesolmu.',
  },
  Podgorica: {
    intro: '**Podgorica** on Montenegron pääkaupunki ja maan suurin kaupunki. Se sijaitsee Ribnica- ja Morača-jokien yhtymäkohdassa, missä Dinaaristen Alppien eteläiset juuret kohtaavat Zetan tasangon pohjoisosan. Nimi tarkoittaa kukkulan alla, ja sen antoi Gorica, yksi kaupungin ylle kohoavista sypressikukkuloista. Nimi mainitaan ensi kerran vuoden 1326 asiakirjassa Kotorin arkistossa.\n\nIsoisän matkavuonna 1873 kaupunki oli ottomaanien hallinnassa, ja sen ydin oli **Stara Varoš** Ribnican rannalla. Berliinin kongressi liitti kaupungin Montenegroon vuonna 1878. Vuosina 1946–1992 kaupungin nimi oli Titograd. Toisen maailmansodan pommitukset tuhosivat suuren osan vanhasta kaupungista, joten nykyinen kaupunkikuva on pääosin sodanjälkeinen. Asukkaita oli vuoden 2023 väestölaskennan mukaan 179 505.',
    teksti: 'Alueen vanhimmat jäänteet ovat myöhäiseltä kivikaudelta, ja Podgorica on useiden historiallisten reittien risteyksessä. Rautakaudella seutua asuttivat illyriläiset heimot labeatit ja dokleatit. Noin kolme kilometriä nykyisen kaupungin pohjoispuolella sijaitsi roomalainen Doclea, josta tuli kunta (municipium) 1. vuosisadalla jKr.\n\nOttomaanit valtasivat Podgorican 1400-luvun lopulla ja rakensivat sinne linnoituksen, torneja, portteja ja puolustusmuureja. Kaupunki kehittyi Ribnican vasemmalle rannalle ottomaanikaupungin tapaan, ja Sahat kula -kellotorni valmistui vuonna 1667. Vuonna 1878 kaupungissa oli arvioiden mukaan noin 8 000 asukasta, jotka kuuluivat kolmeen uskontokuntaan.\n\nNykyään Podgorica on Montenegron hallinnon, talouden ja koulutuksen keskus: yliopisto, tiedeakatemia, valtion televisioyhtiö ja kaikki päivälehdet ovat täällä. Morača on lähteestä riippuen 50–100 metriä leveä keskustan kohdalla, ja lähteen mukaan se on uurtanut kaupungin läpi noin 20 metriä syvän kanjonin. Adrianmeri on noin 35 kilometrin päässä etelässä, mutta Rumija-vuori rajoittaa merellistä vaikutusta.',
  },
  Skopje: {
    intro: 'Skopje on Pohjois-Makedonian pääkaupunki ja suurin kaupunki, ja se makaa **Vardar-joen** varrella Skopjen laaksossa, jonka korkeus on noin 240–250 metriä. Vuoden 2021 väestölaskennassa Skopjen kaupungissa (Grad Skopje, kymmenen kaupunginosakuntaa) asui 526 502 ihmistä, yli neljännes maan väestöstä. Alueen vanhin asutus oli Kalen kalliolla jo noin vuodesta 4000 eaa., ja roomalainen Scupi perustettiin 1. vuosisadan lopulla veteraanien siirtokunnaksi.\n\nOttomaanit hallitsivat kaupunkia vuoden 1392 tienoilta yli 500 vuotta, ja he tunsivat sen nimellä Üsküb. Isoisän matkavuonna 1873 Üsküb oli kivisiltojen ja basaarien kaupunki: Kivisilta, Kale ja Vanha basaari seisoivat jo paikallaan, ja **Skopje–Salonika-rautatie** valmistui samana vuonna. Asema rakennettiin Vardarin eteläpuolelle, ja lähteiden mukaan rata toi kaupunkiin lisää matkustajia ja kauppiaita.\n\nSuuri osa nykyisestä kaupungista on kuitenkin nuorta, sillä **vuoden 1963 maanjäristys** tuhosi valtaosan rakennuksista ja surmasi yli tuhat ihmistä. Jälleenrakennukseen tarjottiin apua 78 maasta, ja siksi Skopjea kutsutaan kansainvälisen solidaarisuuden kaupungiksi.',
    teksti: 'Ptolemaios mainitsi kaupungin 100-luvulla nimellä Scupi. Nykyään nimi on makedoniaksi Skopje, albaniaksi Shkup ja ottomaanien turkiksi Üsküb, ja länsimaissa kaupunkia kutsuttiin vuoteen 1912 asti nimillä Uskub tai Uskup. Itsenäisen maan pääkaupunki se on ollut vuodesta 1991, ja Jugoslavian aikana, vuoteen 1991 asti, se oli Makedonian tasavallan pääkaupunki.\n\nSkopjen kaupunki (Grad Skopje) ulottuu hallinnollisissa rajoissaan 571,46 neliökilometrin alueelle. Vardarin keskivirtaama on noin 50 kuutiometriä sekunnissa, ja tulvia on koettu usein, mutta Treska-joelle rakennettu Kozjak-pato (valmistui 2004) on lähteen mukaan vähentänyt tulvariskiä. Kaupungin rajoihin kuuluu myös 1 066 metriä korkea Vodno-vuori, jonka huipulle nousee köysirata Keski-Vodnon asemalta.\n\nKulttuurielämä seuraa vuodenaikoja: Skopje Film Festival pidetään maaliskuussa, May Opera Evenings toukokuussa vuodesta 1972 ja Skopje Jazz Festival lokakuussa vuodesta 1982. Vanhassa basaarissa on paljon kahviloita ja ravintoloita.',
  },
  Tirana: {
    intro: 'Tirana on Albanian pääkaupunki ja maan suurin kaupunki, ja se levittäytyy Tiranan tasangolle **Dajtin vuoren juurelle**. Alueella on asuttu jo esihistoriallisista ajoista, ja kaupunki mainitaan venetsialaisissa asiakirjoissa 1300-luvulla. Nykyinen kaupunki sai muotonsa 1600-luvun alussa, kun paikallinen hallitsija Sulejman Bargjini rakennutti vuonna 1614 moskeijan, pienen kauppakeskuksen ja hammamin.\n\nIsoisän matkavuonna 1873 Tirana oli ottomaanien aikainen **basaarikaupunki**, jossa Et\'hem Beyn moskeija ja kellotorni jo kohosivat. Pääkaupungiksi se julistettiin väliaikaisesti vuonna 1920 ja pysyvästi 1925. Nykyisen keskustansa se sai 1900-luvun suunnitelmista, joita laativat itävaltalaiset ja italialaiset arkkitehdit.\n\nTiranan kunnassa asui vuoden 2023 väestölaskennan mukaan 598 176 ihmistä. Skanderbeg-aukion ympärillä ovat kellotorni, moskeija ja museot, ja viime vuosina vanhoja rakennuksia on annettu uuteen käyttöön: **pyramidi**, joka avattiin 1988 museona, on nyt nuorten teknologiakeskus.',
    teksti: 'Kaupungin ydin on tiivis ja kuljettavissa jalan. Skanderbeg-aukion ympärillä ovat oopperatalo, kansalliskirjasto, kansallinen historiallinen museo, Et\'hem Beyn moskeija ja kellotorni. Aukion nykyisen ilmeen suunnittelivat arkkitehtitoimisto 51N4E ja taiteilija Anri Sala, ja se avattiin yleisölle vuonna 2017.\n\nHistorian kerrokset näkyvät kävellessä. Tiranan linnoitus on bysanttilaiskauden jäänne, josta on jäljellä ottomaanien aikainen muuri, Kokonozin moskeija on vuodelta 1750 ja Tabakkien silta 1700-luvulta. Kommunistiajan uskonnonvastainen politiikka sulki moskeijat, ja Et\'hem Beyn moskeija avattiin uskonnolliseen käyttöön uudelleen 1990-luvun alussa.\n\nItäpuolella Dajtin vuori kohoaa noin 1 600 metriin, ja sitä kutsutaan Tiranan luonnonparvekkeeksi. Dajtin vuoren kansallispuisto perustettiin vuonna 1966, ja köysirata nousee vuoren rinteelle kaupungin itälaidalta. Keskustan lähellä Rinian puisto on noin vuodelta 1950, ja sen länsireunalla on Taivani-keskus.',
  },
  Zagreb: {
    intro: 'Zagreb on Kroatian pääkaupunki ja suurin kaupunki, joka kasvoi kahdesta vierekkäisestä kukkulakaupungista. Piispanistuin **Kaptol** perustettiin 1094, ja **Gradec** sai vapaan kuninkaallisen kaupungin aseman 1242. Nimi Zagreb tunnetaan asiakirjasta 1134, mutta koko kaupungin nimenä se vakiintui vasta 1800-luvun puolivälissä.\n\nIsoisän matkavuonna 1873 kaupunki oli jo yksi kokonaisuus: yhdistyminen oli tapahtunut noin 1850, rautatie oli avattu 1862 ja Ban Jelačićin ratsastajapatsas seisoi keskusaukiolla. Tuomiokirkon kaksoistornit ja raitiotie puuttuivat vielä: tornit rakennettiin vasta **vuoden 1880 maanjäristyksen** jälkeisessä kunnostuksessa 1889–1899 ja ensimmäinen raitiolinja avattiin 1891. Alakaupungin nykyinen asemakaava syntyi pääosin 1800-luvun lopun ja 1900-luvun alun rakennuskaudella.\n\nNykyään Zagrebin kaupungissa (Grad Zagreb, ei metropolialuetta) asuu 777 744 ihmistä (DZS:n arvio vuoden 2025 puolivälissä). Kaupunki sijaitsee Savan varrella Medvednica-vuoren etelärinteillä lähellä Slovenian rajaa. Sen keskusta jatkuu kukkuloilta etelään aukioiden ja puistojen sarjana.',
    teksti: 'Zagrebin nimen alkuperä on epäselvä. Lähteen mukaan todennäköisin selitys on sana, joka tarkoittaa penkereen tai vallinharjan kaltaista maastonmuotoa ja viittaa Gričin vanhoihin linnoitteisiin. Kansa on kertonut myös legendan, jossa kuvernööri käski tytön ammentamaan vettä Manduševacin kaivosta sanoin ”Zagrabi, Mando”.\n\nGradec ja Kaptol olivat vuosisatoja eri kaupunkeja, ja niiden alapuolelle tasangolle perustettiin 1641 torialue Manduševac-lähteen lähelle. Siitä kasvoi nykyinen Ban Jelačić -aukio. Kaupunki kuuluu Kroatian erityisasemassa oleviin hallintoalueisiin: se on sekä kaupunki että piirikunta, ja sillä on 17 kaupunginosaa.\n\nNykyisen ilmeensä kaupunki sai pitkälti 1800-luvun lopulla ja 1900-luvun alussa, kun maanjäristyksen jälkeen syntyi uusi asemakaava ja Alakaupunki sai säännöllisen korttelirakenteen. Toinen voimakas järistys 22.3.2020 vaurioitti historiallista keskustaa ja tuomiokirkon tornia, ja kunnostus jatkui lähteen mukaan vielä 2020-luvun puolivälissä.',
  },
  'Andorra la Vella': {
    intro: 'Andorra la Vella on Andorran pääkaupunki ja suurin asutuskeskus, ja Andorra la Vellan seurakunnassa asui 31.12.2025 Andorran tilastotoimiston mukaan 24 836 ihmistä. Kaupunki sijaitsee Pyreneiden kapeassa laaksossa noin 1 023 metrin korkeudessa, ja lähteen mukaan se on Euroopan korkeimmalla sijaitseva pääkaupunki. Nimi tarkoittaa Andorran kaupunkia erotukseksi koko ruhtinaskunnasta. Kaupunki kasvoi kahden vuoristopuron, Valira del Norden ja Valira de l\'Orientin, yhtymäkohtaan, ja ne muodostavat yhdessä **Gran Valiran**.\n\nVanhassa keskustassa seisoo **Casa de la Vall**, 1500-luvun lopulla rakennettu talo, jossa maan parlamentti kokoontui vuodesta 1702 vuoteen 2011. Lähellä on romaaninen Sant Esteven kirkko, ja kaupungin laidalla Santa Coloman kirkko, jota lähde pitää Andorran vanhimpana. Maan hallinnon juuret ulottuvat vuoden 1278 sopimukseen, jossa Foix\'n kreivi ja Urgellin piispa jakoivat vallan. Isoisän matkavuonna 1873 kaupunki oli jo olemassa, mutta lähteet eivät kerro, miltä se silloin näytti. Elinkeinoja ovat kauppa, matkailu ja pankit, ja virallinen kieli on katalaani.',
    teksti: 'Andorran historia alkaa siitä, kun Urgellin kreivi nimettiin laaksojen yliherraksi ja kreivin jälkeläinen antoi maat Urgellin hiippakunnalle. Vuoden 1278 sopimus jakoi suvereniteetin Foix\'n kreivin ja Urgellin piispan kesken, ja maaneuvosto, nykyisen parlamentin edeltäjä, sai ruhtinaiden tunnustuksen 1419. Vuonna 1866 neuvostoa uudistettiin, ja uudistus loi perustaa myöhemmille tunnuksille ja perustuslaille.\n\nKaupungin ympärillä maisema nousee jyrkästi. Gran Valira virtaa laakson pohjalla, ja Andorran kaakkoisosassa on Madriu-Perafita-Claror, joka on lähteen mukaan maan ainoa Unescon maailmanperintökohde. Romaanisia kirkkoja ja siltoja on Andorrassa lähteen mukaan yhteensä kymmeniä, ja niiden joukossa ovat Sant Esteve ja Pont de la Margineda.\n\nNykyään kaupunki on kaupan ja matkailun keskus. Talvella läheisille rinteille tullaan hiihtämään, ja ruoka on pääosin katalaanista: tyypillisiä ruokia ovat esimerkiksi escudella, ankka talvipäärynällä ja Andorran jokitaimen. Kaupunki on myös lähtöpaikka vaelluksille, sillä laakson polut johtavat vuorille.',
  },
  Bern: {
    intro: 'Bern on **Sveitsin liittokaupunki**, jossa ovat maan hallituksen ja parlamentin kotipaikka. Perustuslaki ei nimeä virallista pääkaupunkia; Bern on hallituksen kotipaikka eli liittokaupunki. Kaupungissa (kunnassa) asuu 146 867 ihmistä (31.12.2025, sivuasukkaat mukaan lukien). Vanhakaupunki nousee **Aare-joen ympäröimälle mäkiniemelle**, ja se on kuulunut Unescon maailmanperintökohteisiin vuodesta 1983.\n\nPerimätiedon mukaan herttua Berchtold V perusti kaupungin 1191, ja karhu on ollut sen sinetissä ja vaakunassa ainakin 1200-luvulta. Vuoden 1405 suurpalo tuhosi suurimman osan puutaloista, ja tilalle nousi vähitellen hiekkakivikaupunki, jonka holvikäytäviä on noin kuusi kilometriä. Liittokokouksen enemmistö valitsi Bernin hallituksen kotipaikaksi 28.11.1848.\n\nIsoisän matkavuonna 1873 kaupunki oli ollut hallituksen kotipaikka jo neljännesvuosisadan. Ensimmäinen liittopalatsi oli valmistunut 1857, mutta kupolilla varustettua parlamenttirakennusta ei vielä ollut, ja tuomiokirkon torni oli kesken: se valmistui vasta **1893**. Vanhankaupungin muoto ja kaduntasoiset holvikäytävät olivat kuitenkin jo silloin tuttuja.',
    teksti: '== Nimi ja alku ==\nBern on Sveitsin tasangolla Bernin Alppien pohjoispuolella, ja Aare-joki kiertää vanhaakaupunkia. Keskiaikaisen kaupungin perusti Zähringenin suku, ja perimätiedon mukaan Berchtold V perusti sen 1191. Nimen alkuperä on epävarma: karhuselitys on lähteen mukaan kansanetymologiaa, ja nykyään pidetään todennäköisenä kelttiläistä nimeä.\n\n== Hiekkakivestä rakennettu ==\nVuoden 1405 suurpalon jälkeen puutalot korvattiin vähitellen hiekkakivirakennuksilla, ja holvikäytävät syntyivät 1400-luvulla. Tuomiokirkon rakentaminen aloitettiin 1421, ja se pysähtyi lähes kolmeksi vuosisadaksi 1500-luvun lopulla.\n\n== Liittokaupunki ==\nVuonna 1848 Bern valittiin hallituksen kotipaikaksi, ja ensimmäinen liittopalatsi valmistui 1857. Nykyinen parlamenttirakennus rakennettiin 1894–1902.',
  },
  Monaco: {
    intro: 'Monaco on Välimeren rannalla sijaitseva ruhtinaskunta, jossa kaupunki ja valtio ovat käytännössä sama alue. Kallion päällä seisoo Grimaldien linna, sen alla on satama ja rinne nousee kohti **Monte Carlon** kasinoa.\n\nIsoisän matkavuonna 1873 ruhtinas Charles III hallitsi kutistunutta ruhtinaskuntaa, sillä Menton ja Roquebrune oli luovutettu Ranskalle 1861. Kasino oli avattu 1863, ja kun rautatie toi vieraat Monacoon 1867–68, kasinon tuotot alkoivat kantaa koko maata: tuloveroa ei kerätty vuodesta 1869.\n\nNykyään kaupunkivaltio on tiheimmin rakennettuja paikkoja maailmassa. Kallio, satama ja kasinon kaupunginosa ovat yhä samat kuin isoisän aikaan, mutta niiden väliin on noussut korkeita taloja.',
    teksti: 'Monaco nousee rinteeseen kolmen kaupunginosan varaan. Kalliolla on vanhakaupunki ja ruhtinaan palatsi, sataman ympärillä La Condamine ja kasinon ympärillä Monte Carlo. Kaikki ovat kävelymatkan päässä toisistaan, koska koko valtio on alle kolme neliökilometriä.\n\nKallion linnoituksen otti 1297 haltuunsa François Grimaldi, joka pukeutui fransiskaanimunkiksi, ja Grimaldin suku on hallinnut Monacoa lyhyin keskeytyksin siitä lähtien. Linnoituksesta kehittyi vähitellen palatsi, jota ruhtinassuku asuu yhä.\n\nMonte Carlon kasino avautui nykyiselle paikalleen 1863, ja se muutti kalliolla eläneen pienen ruhtinaskunnan vauraaksi. Nimi Monte Carlo tarkoittaa Charlesin vuorta. Katedraali ja Valtamerimuseo kuuluvat myöhempään aikaan: katedraalin rakennustyöt alkoivat 1875 ja museo vihittiin 1910.',
  },
  'Principality of Monaco': {
    intro: 'Monaco on Ranskan Rivieralla Välimeren rannalla sijaitseva kaupunkivaltio, jonka pinta-ala on 2,08 neliökilometriä ja jota Ranska ympäröi kolmelta sivulta. Se on lähteen mukaan **maailman toiseksi pienin valtio**, ja vuoden 2025 väestönlaskennassa siellä asui 38 857 ihmistä. Kaupunki nousee rinteeseen kallion ja sataman ympärille, ja sen perinteisiä kaupunginosia ovat Monaco-Ville, La Condamine, Fontvieille ja Monte Carlo.\n\nKallion linnoituksen otti 1297 haltuunsa François Grimaldi, joka pukeutui fransiskaanimunkiksi, ja **Grimaldin suku** on hallinnut Monacoa lyhyin keskeytyksin siitä lähtien. Isoisän matkavuonna 1873 ruhtinas Charles III hallitsi kutistunutta ruhtinaskuntaa, sillä Menton ja Roquebrune oli luovutettu Ranskalle 1861. Tuloveroa ei kerätty vuodesta 1869, ja kasino oli ollut toiminnassa vuodesta 1863.\n\nKasinon ympärille kasvoi **Monte Carlo**, jonka nimi tarkoittaa Charlesin vuorta. Nykyinen katedraali ja Valtamerimuseo kuuluvat myöhempään aikaan, sillä katedraalin rakennustyöt alkoivat 1875 ja museo vihittiin 1910. Monacon yleisilmettä leimaa yhä belle époque -tyyli.',
    teksti: 'Monaco on ruhtinaskunta ja kaupunkivaltio, jossa valtio ja kaupunki ovat käytännössä sama alue. Maaraja Ranskan kanssa on 5,47 kilometriä ja rantaviivaa on lähteestä riippuen noin 4–5 kilometriä, ja korkein kohta on noin 164 metrin korkeudessa merenpinnasta. Virallinen kieli on ranska, ja monégasque, ligurin kielen lajike, opetetaan kouluissa.\n\n== Kallio ja sen herrat ==\nKallion asutus ulottuu antiikkiin: fokaialaiset kreikkalaiset perustivat sinne 500-luvulla eaa. Monoikoksen siirtokunnan. Linnoitus rakennettiin keskiajalla, ja Grimaldit ostivat Monacon Aragonian kruunulta 1419. Ruhtinaan arvonimeä alkoi käyttää Honoré II vuodesta 1612, ja linnoituksesta kehittyi vähitellen palatsi, jota ruhtinassuku asuu yhä.\n\n== Kasinon kaupunginosa ==\nMonte Carlon kasino avautui nykyiselle paikalleen 1863, ja rautatie toi kävijät Monacoon 1867–68. Charles Garnier laajensi kasinoa 1878–79 ja suunnitteli sen yhteyteen oopperasalin. Valtamerimuseo, katedraali ja Jardin Exotique valmistuivat vasta 1900-luvun alkupuoliskolla, ja ne kuuluvat nykyään Monacon tunnetuimpiin kohteisiin.',
  },
  'Reykjavík': {
    intro: 'Reykjavík on Islannin pääkaupunki ja **maan suurin kaupunki**, joka sijaitsee Faxaflói-lahden etelärannalla Lounais-Islannissa. Nimi tulee vanhan norjan sanoista reykr, savu, ja vík, lahti, ja sen kerrotaan viittaavan alueen kuumista lähteistä nousseeseen höyryyn. Lähteen mukaan se on maailman pohjoisin itsenäisen valtion pääkaupunki.\n\nKaupungille myönnettiin kauppaoikeudet 1786, ja vuotta pidetään sen perustamisvuotena. Isoisän matkavuonna 1873 Reykjavík oli vielä pieni kauppakaupunki. Kansallismuseo oli perustettu kymmenen vuotta aiemmin, 1863, ja kauppa oli vapautunut kaikille kansallisuuksille 1850-luvun puolivälissä.\n\nNykyään kaupungissa asuu 139 804 ihmistä (1.1.2026). Koko kaupunki lämmitetään **geotermisesti**, ja kuumalla vedellä sulatetaan jopa keskustan katuja. Valo vaihtelee jyrkästi: kesällä 20.5.–24.7. aurinko ei laske yli kuutta astetta horisontin alapuolelle, mutta 2.12.–10.1. päivä on alle viisi tuntia.',
    teksti: 'Reykjavík on enimmäkseen Seltjarnarnesin niemellä, ja lähiöt ulottuvat kauas etelään ja itään. Kaupungissa on kymmenen kaupunginosaa. Lähialueen korkein vuori Esja on 914 metriä korkea, ja Elliðaá-joesta voi kalastaa lohta kaupungin rajojen sisällä. Öskjuhlíð ja Skólavörðuholt ovat lähteen mukaan jääkauden kilpitulivuorten jäänteitä.\n\nIlmasto on subpolaarinen merellinen. Talvet ovat leutoja, ja pakkanen laskee harvoin alle −15 asteen. Kesällä lämpötila on yleensä 10–15 astetta eikä yleensä ylitä 20:tä. Tuulta on paljon, ja talvella tulee myrskyjä. Auringonpaistetunteja on noin 1 400 vuodessa.\n\nKoko kaupunki lämmitetään geotermisesti. Kuumalla vedellä lämmitetään myös uima-altaat, ja keskustan katuja ja jalkakäytäviä sulatetaan geotermisillä järjestelmillä. Perlan-museon säiliöt kuuluvat samaan kaukolämpöjärjestelmään.',
  },
  'San Marino (kaupunki)': {
    intro: '**San Marinon kaupunki** eli Città di San Marino on San Marinon tasavallan pääkaupunki ja yksi maan yhdeksästä kunnasta. Se nojaa Monte Titanon länsirinteeseen Apenniinien koillisosassa lähellä Riminiä. Perimätiedon mukaan Marinus-niminen kivenhakkaaja perusti yhteisön vuonna 301 paetessaan Rooman vainoja.\n\nVuoren kolmella huipulla on kullakin torni: Guaita, Cesta ja Montale. Nämä **kolme tornia** on kuvattu sekä maan lipussa että vaakunassa. Harjan alapuolella ovat Piazza della Libertà, Palazzo Pubblico ja uusklassinen basilika.\n\nHistoriallinen keskusta ja Titano-vuori kuuluvat UNESCOn maailmanperintöön vuodesta 2008. Kivenlouhinta ja -veisto olivat pitkään pääelinkeinoja, ja nykyään paikallinen talous nojaa matkailuun, kauppaan ja postimerkkeihin. Autot on suurelta osin kielletty keskustassa, ja kadut ovat mutkaisia ja mukulakivisiä. Kunnassa asui vuoden 2025 lopussa 4 158 ihmistä.',
    teksti: 'Perimätiedon mukaan Marinus lähti Rabin saarelta ystävänsä Leon kanssa Riminiin kivenhakkaajaksi ja nousi sieltä Monte Titanolle, jossa hän rakensi pienen kirkon. Lähteen mukaan tiedot kirjattiin vasta vuosisatoja myöhemmin, ja varhaisin historiallinen todiste luostariyhteisöstä on 500-luvulta. Kaupunki on nimetty pyhän Marinuksen mukaan.\n\nTunnettuja varhaisia hallintoelimiä oli Arengo, perheiden päämiesten kokous, ja kapteenivaltionhoitajan tehtävät eli kaksi yhteistä valtionpäämiestä perustettiin vuonna 1243. Vanhimmat säädökset ovat vuodelta 1263. Wienin kongressi vahvisti San Marinon itsenäisyyden 1815, ja sopimus Italian kanssa vuonna 1862 vahvisti sen uudelleen.\n\nNykyinen Palazzo Pubblico valmistui vuonna 1894, ja Vapauden patsas lahjoitettiin tasavallalle 1876. Köysirata Borgo Maggioresta vihittiin 1959, ja sitä ennen Riminin ja San Marinon välillä kulki sähköistetty kapearaiteinen rautatie vuosina 1932–1944. Pienellä tasavallalla on ollut oma postisopimus Italian kanssa vuodesta 1877, ja postimerkeistä tuli merkittävä tulolähde.',
  },
  Vaduz: {
    intro: 'Vaduz on **Liechtensteinin pääkaupunki**, ja se sijaitsee Reinin itärannalla Alppien juurella. Jyrkän rinteen päältä kaupunkia katsoo Vaduzin linna, joka on ruhtinassuvun asuinpaikka ja kaupungin tunnetuin maamerkki. Vaduzin kunnassa asuu noin 6 100 ihmistä (2025), mutta naapurikunta Schaan on silti suurempi.\n\nNimi on lähteen mukaan romaaninen ja tarkoittaa vesijohtoa, ja ensimmäiset merkinnät ovat 1100-luvulta. Vuonna 1712 Liechtensteinin suku osti Vaduzin kreivikunnan, ja vuonna 1719 keisari Kaarle VI yhdisti ostetut alueet ruhtinaskunnaksi, joka sai suvun nimen.\n\nIsoisän matkavuonna 1873 Vaduz oli kylä ja alueen hallintokeskus, ja maan armeija oli lakkautettu 1868. **Rautatie** oli rakennettu maan halki 1872, mutta asema on Schaanin kunnan puolella. Nykyään kaupungin katedraali ja museot kertovat valtiosta, joka on lähteen mukaan **Euroopan neljänneksi pienin**.',
    teksti: 'Vaduz sijaitsee Reinin itärannalla Liechtensteinin keskiosassa. Nimen juuri on vanha retoromaaninen auadutg, vesijohto, joka juontuu latinan sanasta aquaeductus, ja ensimmäiset merkinnät kylästä ovat 1100-luvun käsikirjoituksista.\n\nVaduzin kreivikunta muodostettiin 1342 Werdenbergin kreivikunnan osana. Sveitsiläiset polttivat linnan ja koko kylän Švaabin sodassa 1499, ja keisari Rudolf II antoi Vaduzille markkinaoikeudet 1592. Liechtensteinin suku osti Schellenbergin herruuden 1699 ja Vaduzin kreivikunnan 1712, ja Kaarle VI yhdisti alueet ruhtinaskunnaksi 1719.\n\nVuoden 1862 perustuslaki toi kansalaisvapaudet ja ensimmäiset maapäivät, ja kunnallislaki antoi Vaduzille pormestarin ja kunnanvaltuuston 1864. Rautatie rakennettiin 1872, kansallismuseo perustettiin 1800-luvun lopulla ja Kunstmuseum valmistui 2000.',
  },
  /*
   * PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierät e03, 7 kaupunkia):
   * Artikkelit wiki-otsikolla (vain dataa). Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa
   * maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e03-pilvi.
   */
  'Abu Dhabi': {
    intro: 'Abu Dhabi on Arabiemiirikuntien pääkaupunki ja samannimisen emiirikunnan hallintokeskus. Kaupunki seisoo **saarella Persianlahden rannalla**, aivan mantereen vieressä. Nimi on arabiaa ja tarkoittaa perinteisen selityksen mukaan ”gasellin isää”, ja suosittu kertomus selittää sen metsästäjillä, jotka seurasivat gasellia rannikon makean veden luo.\n\nIsoisän matkavuonna 1873 rannikolla oli asutus linnakkeineen, ja helmenpyynti oli öljyä edeltänyt keskeinen elinkeino. Öljy ja ensimmäinen silta saarelle tulivat vasta 1900-luvun jälkipuoliskolla. Nykyään Abu Dhabin hallinnollisella alueella (Abu Dhabi Region, johon kuuluvat saarikaupungin lisäksi mantereen esikaupungit, mutta ei koko emiirikuntaa) asuu Abu Dhabin tilastokeskuksen mukaan 2 823 340 ihmistä (2024); koko emiirikunnassa asukkaita on noin 4,1 miljoonaa.\n\nKaupungin tunnetuimpia nähtävyyksiä ovat **Sheikh Zayedin suurmoskeija**, Qasr Al Watanin palatsi ja Saadiyat-saaren museot. Keskustassa seisova vanha **Qasr Al Hosn** muistuttaa, mistä kaupunki on kasvanut.',
    teksti: 'Lähteen mukaan Bani Yas -heimo asui ensin Liwan keitaalla sisämaassa. Makean veden löytö rannikolta metsästysretkellä johti asutuksen perustamiseen saarelle 1700-luvulla, ja heimon Al Bu Falah -osa asettui sinne. Hallitsijasuku Al Nahyan polveutuu tästä osasta, ja asutuksen ytimessä oli linnake, joka seisoo kaupungin keskustassa yhä.\n\nKaupunki kasvoi nopeasti 1900-luvun jälkipuoliskolla. Lähteen mukaan ensimmäinen silta saarelta mantereelle rakennettiin 1960-luvun lopulla aiemmin pieneen kalastajakylään. Kaupunkisuunnitelma tehtiin samoihin aikoihin 1960- ja 1970-luvuilla. Sittemmin saaria, siltoja ja rantakatuja on lisätty, ja Cornichen paikalla oli ennen 1970-lukua ranta, jolla dhow-alukset ankkuroituivat.\n\nArabiemiirikunnat perustettiin 2. joulukuuta 1971, kun Abu Dhabi ja viisi muuta emiirikuntaa liittyivät yhteen. Abu Dhabista tuli liiton pääkaupunki, ja Sheikh Zayed bin Sultan Al Nahyan oli maan ensimmäinen presidentti. Nykyään kaupunki tunnetaan moskeijoistaan, palatseistaan ja museoistaan.',
  },
  Amman: {
    intro: 'Amman on Jordanian pääkaupunki ja lähteen mukaan maan suurin kaupunki, ja Greater Amman Municipalityn alueella asuu nykyään yli **neljä miljoonaa** ihmistä. Kaupunki on levinnyt kukkuloille Jordanin itäiselle ylängölle, ja lähteen mukaan se rakennettiin alun perin seitsemälle kukkulalle. Kaupunginosien nimet tulevat usein kukkulan (jabal) tai laakson (wadi) mukaan, ja rinteitä peittävät kalkki- ja hiekkakivitalot.\n\nPaikka on ollut asuttu tuhansia vuosia: Ayn Ghazalin neoliittisesta kylästä on noin 9 000 vuotta, ja nimensä kaupunki sai ammonilaisilta, joiden pääkaupunki se oli. Antiikissa se tunnettiin nimellä Philadelphia, ja laaksossa ja linnavuorella ovat yhä roomalaisajan teatteri, odeon ja **Suuri temppeli**. Myöhäiskeskiajalta lähtien paikka oli hylätty rauniopaikka, jossa kävivät vain viljelijät ja beduiinit.\n\nIsoisän matkavuonna 1873 Amman oli lähteen mukaan tällainen autio paikka. Uusi asutus alkoi **1870-luvun lopulla**, kun ottomaanien viranomaiset ohjasivat Ammaniin tšerkessejä, ja lähteen mukaan Hejaz-rautatie muutti kylän 1900-luvun alussa alueen kauppakeskukseksi.',
    teksti: 'Amman on rakennettu kukkuloille ja laaksoihin, ja kaupunginosia nimetään usein jabalin eli kukkulan tai wadin eli laakson mukaan. Rakennukset on päällystetty valkoisella tai beigellä kalkki- tai hiekkakivellä, ja parvekkeita on lähes joka kerroksessa. Liikenneympyrät, joita kutsutaan ympyröiksi, merkitsivät ennen kaupunginosia, ja nykyään ne toimivat maamerkkeinä.\n\nAntiikissa laaksossa sijaitsi Philadelphia, joka kuului Rooman valtakunnassa Dekapolis-kaupunkien liittoon ja myöhemmin Arabian provinssiin. Sen aikaisia rakennuksia ovat teatteri, odeon ja nymfaion sekä linnavuoren Suuri temppeli. Laaksoa halkoi Seil-puro, joka peitettiin 1900-luvun jälkipuoliskolla.\n\nUuden ajan Amman syntyi 1870-luvun lopulla, kun tšerkessit asettuivat raunioiden keskelle. Hejaz-rautatie toi kauppiaita Damaskoksesta, Nablusista ja Jerusalemista, ja 1920-luvulla emiiri Abdullah I nimesi kaupungin Transjordanian emiirikunnan pääkaupungiksi. Jordan Museum esittelee nykyään kaupungin ja maan historiaa Ayn Ghazalin patsaista alkaen.',
  },
  Baku: {
    intro: 'Baku on Azerbaidžanin pääkaupunki ja lähteen mukaan koko Kaukasuksen ja Kaspianmeren suurin kaupunki. Se sijaitsee Absheronin niemimaan eteläreunalla Bakunlahden rannalla, 28 metriä merenpinnan alapuolella. Kaupunkia kutsutaan **Tuulten kaupungiksi**, sillä pohjoinen khazri ja lämmin eteläinen gilavar puhaltavat siellä vuoden ympäri.\n\nMuurien ympäröimä **vanhakaupunki**, azeriksi Icheri Sheher, on ollut UNESCOn maailmanperintökohde vuodesta 2000. Sen kukkulalla seisoo 1400-luvun Širvanšahien palatsi, ja rannan puolella kohoaa Neitotorni. Muurien ulkopuolelle kaupunki alkoi levitä 1800-luvun alussa.\n\nIsoisän matkavuonna 1873 Baku oli Venäjän keisarikunnan lääninpääkaupunki, joka oli vielä pieni kaupunki. Samana vuonna Bakuun saapui Robert Nobel, ja laaja **öljynetsintä** oli alkanut 1870-luvun alussa, kun viranomaiset huutokauppasivat öljyrikkaita maa-alueita. Vuonna 1901 Bakun kentät tuottivat jo yli puolet maailman öljystä. Bakun kaupungin hallinnollisella alueella asui vuoden 2024 alussa runsaat 2,3 miljoonaa ihmistä, ja koko metropolialueella vielä selvästi enemmän.',
    teksti: 'Lähteen mukaan nimi Baku juontuu sanasta Baguan tai Bagavan, jonka ensimmäinen osa baga tarkoittaa muinaispersiaksi jumalaa. Azeriksi kaupungin nimi kirjoitetaan Bakı. Tuulesta kertoo 1800-luvulla suosittu kansanetymologia, jonka mukaan nimi tulisi persian sanasta Bâd-kube, tuulen piiskaama kaupunki. Alueella on asuttu kivikaudesta, ja Bayilin lähellä on pronssikauden kalliopiirroksia.\n\nShirvanshahien hovi siirtyi Bakuun Shamakhin maanjäristysten jälkeen, lähteiden mukaan 1100-luvulla tai viimeistään 1400-luvun alussa, ja palatsin päärakennus aloitettiin 1411. Safavidit valtasivat Bakun 1501, osmanit 1578, ja 1723 Venäjän joukkojen pommitus vaurioitti palatsia. Venäjä valtasi Bakun 1806, ja muureja korjattiin ja linnoitusta laajennettiin pian sen jälkeen.\n\nShamakhin maanjäristyksen jälkeen 1859 Baku sai läänin pääkaupungin aseman. Lennätinlinja Tiflisiin oli jo olemassa, mutta rautatietä ei vielä ollut, sillä rata Tiflisiin valmistui vasta 1880-luvulla. Muurien merenpuoleinen osa purettiin 1800-luvun puolivälissä, ja kivien myynnistä saadut rahat käytettiin bulevardin rakentamiseen.',
  },
  Beirut: {
    intro: 'Beirut on Libanonin pääkaupunki, maan suurin kaupunki ja tärkein satama. Se sijaitsee Välimeren rannalla niemellä, jonka takana Libanonvuoret nousevat itään. Kaupunki on ollut asuttu yli viisi tuhatta vuotta, ja lähteiden mukaan se on yksi maailman vanhimmista kaupungeista. Nimi tulee foinikian sanasta, joka tarkoittaa **kaivoja**, ja viittaa helposti saatavilla olleeseen pohjaveteen.\n\nRoomalaisena Berytuksena kaupunki tunnettiin **lakikoulustaan**, ja keskustan kaivauksissa on tullut esiin pylväskatuja ja kylpylöiden raunioita. Isoisän matkavuonna 1873 Beirut oli kasvava satama- ja kauppakaupunki, jolla oli tiiviit yhteydet Eurooppaan. Kukkulalla toimi jo koulu, josta tuli myöhemmin **American University of Beirut**.\n\nNykyään Beirut on maan kulttuuri-, kustannus-, pankki- ja yliopistokeskus. Rantabulevardi Corniche kiertää niemeä, ja sen varrella kohoavat Raouchén kalliot. Asukkaita kaupungissa (Beirutin kuvernementti) on arvion mukaan 433 249 (31.12.2017, luku sisältää rekisteröidyt syyrialaispakolaiset), ja suurkaupunkialueella määritelmästä riippuen noin 1,8–2,4 miljoonaa.',
    teksti: 'Kaupunki joutui Rooman haltuun vuonna 64 eaa., kun Pompeius järjesteli Syyrian Rooman maakunnaksi, ja se sai nimen Berytus. Myöhemmin siitä tehtiin roomalainen siirtokunta, ja lähteen mukaan se oli idän provinsseissa erityisen roomalainen kaupunki. Lakikoulu oli laajalti tunnettu, ja Justinianus tunnusti sen 500-luvulla yhdeksi valtakunnan kolmesta virallisesta lakikoulusta. Suuri maanjäristys vuonna 551 raunioitti rannikon kaupunkeja, ja Berytuksessa kuoli lähteiden mukaan tuhansia ihmisiä.\n\nEgyptin Ibrahim Pashan vallattua Akkon vuonna 1832 Beirut alkoi elpyä. Kaupunki solmi tiiviit kauppayhteydet Eurooppaan, ja lähteen mukaan eurooppalainen kiinnostus silkkiin ja muihin vientituotteisiin muutti siitä merkittävän sataman ja kauppakeskuksen. Syrian Protestant College avattiin vuonna 1866, ja Université Saint-Joseph perustettiin 1800-luvun jälkipuoliskolla.\n\nNykyään keskusta on rakennettu uudelleen, ja uusien katujen alla näkyvät edelleen eri aikojen kerrokset. Kansallismuseo on Libanonin tärkein arkeologinen museo, ja Sursock-museo esittelee modernia taidetta huvilassa.',
  },
  Jerevan: {
    intro: 'Jerevan on Armenian pääkaupunki ja maan suurin kaupunki, ja se seisoo Hrazdan-joen rotkon äärellä Araratin tasangon koillisreunalla. Kaupungin pääsymboli on **Ararat-vuori**, joka näkyy suuressa osassa kaupunkia. Itse kaupungissa asuu 2020-luvun luvuilla noin 1,1 miljoonaa ihmistä.\n\nKaupungin nimen uskotaan juontuvan Erebunin linnoituksesta, jonka Urartun kuningas Argishti I perusti **782 eaa.** Isoisän matkavuonna 1873 kaupunki tunnettiin venäläisen vallan aikana nimellä Erivan: se oli Erivanin kuvernementin keskus. Matala savitalojen kaupunki muuttui 1920-luvulla, kun arkkitehti Alexander Tamanian laati yleissuunnitelman.\n\nTasavallan aukion ympärillä olevat uusklassiset rakennukset on tehty vaaleanpunaisesta ja keltaisesta **tuffikivestä**, ja aukio, Kaskadi ja Matenadaran ovat Tamanianin suunnitelman ja sen jatkojen tunnetuimpia kohteita. Kaupunki oli UNESCOn maailman kirjapääkaupunki 2012.',
    teksti: 'Jerevan on ollut Armenian pääkaupunki vuodesta 1918, ja itsenäisen Armenian pääkaupunki se on ollut vuodesta 1991. Kaupunki ei kuulu mihinkään maakuntaan, vaan sillä on pääkaupungin erityisasema.\n\n== Linnoituksesta kaupungiksi ==\nErebunin linnoitus perustettiin 782 eaa. Arin Berd -kukkulalle, ja 1968 Jerevan vietti 2 750-vuotisjuhlaa. Ottomaanien komentaja rakennutti Erivanin linnoituksen Hrazdanin rannalle 1582–83, ja venäläiset valtasivat sen lokakuussa 1827.\n\n== Tuffikaupunki ==\nTamanianin yleissuunnitelma hyväksyttiin 1924. Se on säteittäis-kehämäinen ja sijoitettiin vanhan katuverkon päälle, ja sen toteuttaminen johti monien vanhojen rakennusten purkamiseen. Kaupungin lipun pienet punaiset kolmiot viittaavat Armenian historiallisiin pääkaupunkeihin.',
  },
  Manama: {
    intro: 'Manama on Bahrainin pääkaupunki ja maan suurin kaupunki, ja se sijaitsee **Bahrainin pääsaaren koillisrannikolla** Persianlahdella matalalla niemellä. Maasto on tasaista ja kuivaa, ja kaupungin ytimessä on yhä vanha basaari eli souk. Manaman kuvernementissa asui vuonna 2020 noin 548 000 ihmistä.\n\nNimi mainitaan kaupunkina ensi kerran 1300-luvulla, ja portugalilaiset valtasivat Bahrainin 1500-luvun alussa. Isoisän matkavuonna 1873 Manama oli **helmenpyynnin ja kaupan satamakaupunki**, jonka hallitsija oli solminut Britannian kanssa rauhan- ja ystävyyssopimuksen vuonna 1861. Viereisen saaren Muharraq oli Bahrainin pääkaupunki ennen Manamaa, ja nykyään kaupungit muodostavat yhtenäisen kaupunkialueen.\n\nNykyään Manama on pankkien ja kaupan keskus. Rannalla kohoavat Bahrain World Trade Centerin **tuuliturbiinitornit** ja Bahrain Financial Harbourin tornit, ja kaupungissa ovat myös Bahrainin kansallismuseo ja Koraanin talo Beit Al Quran. Lentoasema on Muharraqin saarella, ja noin kuuden kilometrin päässä on UNESCOn maailmanperintökohde Qal\'at al-Bahrain.',
    teksti: 'Manama sijaitsee Bahrainin pääsaaren koillisrannikolla Persianlahdella. Ilmasto on kuuma ja kuiva, ja heinä- ja elokuussa päivän ylin lämpötila on keskimäärin noin 40 astetta. Historiallisesti kaupunki rajoittui soukiin ja etelässä olevaan linnakkeeseen, ja Bahrain Financial Harbour on rakennettu pääosin täytemaalle.\n\nManama oli jo ennen öljyn löytymistä kauppakaupunki ja portti pääsaarelle. Englantilaisen matkailijan William Gifford Palgraven mukaan Manamassa oli 1860-luvun alussa vain muutamia rapistuvia kivitaloja, ja suurin osa asumuksista oli palmunlehdistä tehtyjä majoja, joissa asui muun muassa kalastajia. Öljy löytyi 1932, ja lähteen mukaan öljyvarallisuus vauhditti kaupungin kasvua; 1990-luvulla talouden monipuolistaminen teki siitä rahoitusalan keskuksen.\n\nMatkailijalle Manama on kompakti: basaari ja Bab Al Bahrain ovat vanhan ytimen sydän, museot ovat rannan tuntumassa, ja uudet pilvenpiirtäjät näkyvät lähes joka kadunkulmasta. Lentoasema on viereisellä saarella, ja kävelyretket sopivat parhaiten talvikuukausiin.',
  },
  Tbilisi: {
    intro: 'Tbilisi on Georgian pääkaupunki ja suurin kaupunki, ja se levittyy Mtkvari- eli Kura-joen molemmille puolille vuorten rajaamaan laaksoon. Nimi tulee vanhasta georgian sanasta tpili, **lämmin**, ja viittaa kaupungin rikkipitoisiin kuumiin lähteisiin. Perimätiedon mukaan Iberian kuningas Vakhtang I perusti kaupungin 400-luvulla, ja kuningas Dachi siirsi Iberian pääkaupungin Mtshetasta Tbilisiin 500-luvun alussa.\n\nIsoisän matkavuonna 1873 kaupunkia kutsuttiin nimellä **Tiflis**, ja se oli Venäjän keisarikunnan Tiflisin kuvernementin pääkaupunki. Edellisenä vuonna oli avattu maan ensimmäinen rautatie Potiin, mutta raitiotietä ei vielä ollut. Nykyinen nimi vakiintui virallisesti vasta 1936.\n\nTbilisin kaupungissa asuu yli 1,3 miljoonaa ihmistä, eli noin kolmannes koko maan väestöstä. Vanhassa kaupungissa kirkot, kylpylät ja linnoitus seisovat lähekkäin, ja kaupunki on **rakennettu uudestaan monta kertaa**. Risteyskaupungissa elää yli sata etnistä ryhmää.',
    teksti: 'Tbilisin synnystä kerrotaan legenda: kuningas Vakhtang I metsästi haukan kanssa, ja haukka ja sen saalis putosivat kuumaan lähteeseen. Kuningas ihastui lähteisiin ja päätti rakentaa niiden viereen kaupungin. Arkeologisen aineiston mukaan Vakhtang kuitenkin elvytti tai rakensi uudelleen vain osia olemassa olevasta asutuksesta, joka juontuu 4. vuosituhannelta eaa.\n\nVenäjän keisarikunta liitti Kartli-Kakhetin itseensä 1801, ja Tbilisi oli myöhemmin, vuodesta 1846, Tiflisin kuvernementin pääkaupunki. Hyvin harva rakennus oli säilynyt vuoden 1795 tuhosta, joten suuri osa nykyisistä historiallisista rakennuksista on Venäjän vallan ajalta. Pääväylä oli Golovin-katu, nykyinen Rustaveli-katu, ja kaupunkiin nousi uusia lännenmallisia kortteleita.\n\nGeorgian kulttuuri elää kaupungissa vahvasti: Shota Rustavelin keskiaikainen eepos on kansallisaarre, ja kaupunki oli UNESCOn maailman kirjapääkaupunki 2021. Pöydässä kokoonnutaan supraan, yhteiseen juhla-ateriaan, jota johtaa maljanpuhuja eli tamada.',
  },
  /*
   * PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierä e03b, Ramallah):
   * Artikkelit wiki-otsikolla (vain dataa). Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa
   * maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e03b-ramallah.
   */
  Ramallah: {
    intro: 'Ramallah on Länsirannan keskiosassa Juudean vuoristossa, noin 870 metrin korkeudessa ja noin 10–15 kilometriä Jerusalemista pohjoiseen. Nimi tarkoittaa arabiaksi **Jumalan korkeutta**. Ramallahin kaupungissa asui vuonna 2017 noin 39 000 ihmistä; luku ei sisällä viereistä al-Birehiä, jota hallitaan erikseen. Kaupungissa toimii Palestiinan hallinnon keskeisiä toimielimiä, ja presidentin virasto on Mukataassa.\n\nIsoisän matkavuonna 1873 Ramallah oli vielä kivitalojen kylä Jerusalemin pohjoispuolella, jonka asukkaat olivat enimmäkseen kreikkalaisen riituksen kristittyjä. Kveekarit aloittivat kylässä tyttöjen koulutyön 1860-luvun lopulla, ja heidän Friends-koulunsa toimivat yhä. Omaksi kunnakseen Ramallah tuli 1900-luvun alussa.\n\nLähteen mukaan Ramallahia pidetään yleisesti palestiinalaiskaupunkien kulttuurisimpana, ja se on kotina monille runoilijoille, taiteilijoille ja muusikoille. Runoilija **Mahmoud Darwish** asui täällä ja on haudattu Kulttuuripalatsin viereen kukkulalle. Keskustan sydän on Al-Manaran aukio.',
    teksti: 'Ramallah on Palestiinan hallinnon keskeisten toimielinten paikka Länsirannan keskiosassa. Kaupungin nimi tarkoittaa arabiaksi Jumalan korkeutta, ja sen keskikorkeus on noin 870 metriä merenpinnan yläpuolella.\n\n== Kylästä kaupungiksi ==\nRamallah mainitaan 1300-luvun alun säätiöasiakirjoissa, ja sen hedelmätarhat erottivat sen monista naapureista. Perimätiedon mukaan nykyisen kaupungin perustivat Haddadin-suvun veljekset, jotka tulivat Karakin seudulta 1500-luvulla. Isoisän matkavuonna 1873 paikka oli vielä kivitalojen kylä, ja omaksi kunnakseen se tuli 1900-luvun alussa.\n\n== Kulttuurin kaupunki ==\nRamallahissa on Mahmoud Darwish -museo, Kulttuuripalatsi ja Khalil Sakakini -kulttuurikeskus, jossa järjestetään näyttelyitä, runoiltoja ja elokuvanäytöksiä. Heti kaupungin eteläpuolella on Tell en-Nasbehin muinainen kukkula.',
  },
  /*
   * PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierät e04, e05, e06, e07, e08, e09, e10, e11, e12, e13, e14, 93 kaupunkia):
   * Artikkelit wiki-otsikolla (vain dataa). Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa
   * maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e04-pilvi, paakaupungit-e05-pilvi, paakaupungit-e06-pilvi, paakaupungit-e07-pilvi, paakaupungit-e08-pilvi, paakaupungit-e09-pilvi, paakaupungit-e10-pilvi, paakaupungit-e11-pilvi, paakaupungit-e12-pilvi, paakaupungit-e13-pilvi, paakaupungit-e14-pilvi.
   */
  Alger: {
    intro: 'Alger on Algerian pääkaupunki, jonka valkeat talot nousevat **Välimeren rannalta rinteeseen**. Sen arabiankielinen nimi tarkoittaa saaria, vaikka kaupunki sijaitsee mantereella. Nimi säilyttää muiston sataman edustan vanhoista saarista. Rannan bulevardien takana alkaa Casbah, kapeiden kujien ja sisäpihojen asuttu vanha kaupunki. Casbah tarkoitti aluksi linnoitusta, joka kohoaa kaupunginosan yläpuolella.\n\nAntiikin sataman paikalle syntyi keskiajalla medina, jota osmanikauden palatsit ja moskeijat täydensivät. **Isoisän matkavuonna 1873** Alger oli Ranskan siirtomaavallan alainen, ja alakaupunkiin oli rakennettu uusia katuja. Casbahin taloissa huoneet avautuvat usein sisäpihalle, jonka kautta ne saavat valoa. Hamma-puutarha aloitti toimintansa malliviljelmänä ja kasvien kokeilupaikkana.',
    teksti: 'Algerin paikalla oli satama jo antiikin aikana, ja nykyisen vanhan kaupungin alku liittyy keskiajan ziridikauteen. Arabiankielinen al-Jazāʾir tarkoittaa saaria, jotka sijaitsivat sataman edustalla. Kalkittujen talojen valkeus on puolestaan antanut kaupungille ranskankielisen lisänimen Alger la Blanche.\n\nCasbah on maailmanperintökohde ja asuttu kaupunginosa. Sen kujilla talot, hammamit eli kylpylät, moskeijat ja kauppapaikat liittyvät samaan tiheään rakenteeseen. Sisäpiha kokoaa huoneet ympärilleen, mutta pienillä rinnetonteilla on myös pihattomia taloja, joiden valo tulee ikkunoista.\n\nOsmanikauden palatseja on otettu museokäyttöön: Dar Mustapha Pacha esittelee miniatyyrejä, käsikirjoitusten koristelua ja kalligrafiaa eli kaunokirjoitusta. Rannalla Raïsien palatsit säilyttävät osan alemman Casbahin rakennuksista. Kauempana Belouizdadissa Hamman puutarhan taimitarha tuotti aikoinaan puita julkisiin istutuksiin.',
  },
  Banjul: {
    intro: '**Banjul** on Gambian pääkaupunki pienellä St Mary\'s -saarella, kohdassa jossa Gambia-joki saavuttaa Atlantin. Saarikaupungin torikadut ja rantayhteydet mahtuvat paljon pienemmälle alueelle kuin nimi Suur-Banjul antaa ymmärtää. Laajempaan kaupunkialueeseen kuuluu myös Kanifing mantereella. Joen toisella rannalla on Barra, johon kuljetaan lautalla.\n\nKaupunki kasvoi brittiläisen kauppa- ja vartioaseman ympärille 1800-luvun alkupuolella, ja sen nimi oli pitkään **Bathurst**. Isoisän matkavuonna 1873 kaupunki ja Albertin tori olivat jo olemassa. Nykyisen pääkaupungin kulttuuriperintöä säilytetään museon lisäksi myös suullisen perinteen tallenteissa.\n\nSaaren länsi- ja etelärannoilla alkaa **Tanbin kosteikko**, jossa vuorovesikanavat kulkevat mangrovekasvillisuuden lomassa. Kalastus, osterin keruu ja kosteikkolinnut liittävät rannan kaupungin arkeen.',
    teksti: 'Banjulin kaupunki sijaitsee St Mary\'s -saarella Gambia-joen suun reunassa. Mantereella jatkuva Kanifingin alue kuuluu Suur-Banjuliin, kun taas varsinainen pääkaupunki on pieni saarikaupunki. Sillat yhdistävät sitä länteen, ja lautta ylittää jokisuun Barraan.\n\n1800-luvun alkupuolen brittiläinen kauppa- ja vartioasema kasvoi Bathurst-nimiseksi kaupungiksi. Albertin torin historiallinen nimi muistuttaa samasta aikakaudesta. Tori palvelee nykyistä kaupankäyntiä, ja kulttuuriperintöä kerätään Banjulissa myös museo- ja arkistotyössä.\n\nTanbin rannikkokosteikko ulottuu kaupungin vierelle. Mangrovet, vuorovesikanavat ja liejuiset rannat ovat sekä eläinten elinympäristöä että paikallisen työn paikkoja. Kosteikko osallistuu myös veden ja sedimenttien liikkeen tasaamiseen.',
  },
  Bissau: {
    intro: '**Bissau** on Guinea-Bissaun pääkaupunki Geba-joen leveän suistoalueen pohjoisrannalla. Vanha satamaydin yhdistää linnoituksen, laiturit ja Bissau Velhon kadut, joilla talot ovat edelleen käytössä. Bandimin torilla kaupataan ruokaa, vaatteita ja muita arjen tarvikkeita.\n\nPortugalilainen kauppa-asema syntyi 1600-luvun lopulla Papel-yhteisöjen oman valtakunnan alueelle. Paikalliset hallitsijat vaikuttivat ulkomaisten kauppiaiden toimintaan. Isoisän matkavuonna **1873** Bissaussa oli jo linnoitus ja satamakauppaa, mutta nykyinen pääkaupunkiasema tuli myöhemmin.\n\nAmuran linnoituksen nykyinen kokonaisuus sisältää useiden vuosisatojen rakennusvaiheita. Myös satama on muuttunut, ja Pidjiguitin vanha laituri on eri paikka kuin myöhemmät laiturirakenteet. Kansallisen etnografisen museon historiassa **pienet valokuvavedokset** auttoivat kokoamaan kadonneiden kokoelmien muistia.',
    teksti: 'Bissau Velho tarkoittaa vanhaa Bissauta, mutta kaupunginosa kuuluu tämän päivän kaupunkiin. Sen siirtomaa-ajan taloissa toimii liikkeitä ja apteekkeja. Vanhan satamaytimen kadut ovat näin yhä kaupan ja asioinnin paikkoja.\n\nKauppapaikka kasvoi Papel-yhteisöjen valtakunnan mailla. Portugalilaiset ja muut eurooppalaiset kauppiaat toimivat alueella paikallisten hallitsijoiden rinnalla. Amuran linnoituksen rakentaminen ei tarkoittanut, että koko ympäröivä alue olisi ollut Portugalin tosiasiallisessa hallinnassa.\n\nKaupungin muistia on säilynyt myös pienissä kuvissa. Etnografisen museon valokuvien koevedoksia digitoitiin, ja niiden avulla selvitettiin kokoelmien historiaa sekä esineiden käyttöyhteyksiä. Näyttelytyössä yhdistettiin säilyneitä esineitä, uusia hankintoja ja kuvallista taustaa.',
  },
  Conakry: {
    intro: '**Conakry** on Guinean pääkaupunki Atlantin rannalla, pitkän ja kapean Kaloumin niemimaan päässä. Vanha ydin kasvoi Tombon saarelle, ja kaupunki laajeni sieltä niemimaata pitkin koilliseen. Kaupallinen satama ja Boulbinetin kalasatama tuovat kaupungin rantaan erilaista liikennettä.\n\nConakryn nimi liittyy alueen vanhaan Susu-kylään. Ranskalainen siirtomaakaupunki muodostui 1800-luvun lopulla, joten isoisän matkavuonna **1873** nykyinen pääkaupunki oli vielä tulevaisuutta. Alueen asutushistoriaan kuuluivat jo Baga- ja Susu-yhteisöt.\n\nCamayennen kasvitieteellinen puutarha tunnetaan kapokeista, ja Sandervalia-museo kokoaa Guinean kulttuurien esineistöä. Kaupungin edustalla **Îles de Los** -saariston rannat ja metsäiset sisäosat vaihtavat kaupunkimaiseman toiseen mittakaavaan. Kassa ja Tamara kaartuvat saariston keskellä olevan Roumen ympärille.',
    teksti: 'Tombon saari on Conakryn vanhan kaupungin paikka. Pengeryhteys liittää sen Kaloumin niemimaahan, jolle kaupunki jatkoi kasvuaan.\n\nSataman kautta liikkuu sekä tuonti- että vientitavaraa. Konttiliikenteen rinnalla satamassa käsitellään mineraalivientiä sekä elintarvikkeiden, teollisuustuotteiden ja energiatuotteiden tuontia. Historiallinen ratayhteys johti Conakrysta Kankaniin sisämaahan.\n\nEdustan saaristossa kaupungin historia jatkuu luonnonpaikoille. Kassalla oli kauppapaikka jo 1700-luvulla, ja myöhempi kaivostoiminta jätti saaren sisäosiin avolouhoksia. Roumen nimistä löytyvät Room ja Crawford Island, kun taas läntinen Tamara tunnetaan myös Fotobana.',
  },
  Monrovia: {
    intro: '**Monrovia** on Liberian pääkaupunki Atlantin rannalla Mesuradojoen äärellä. Vanha keskusta levittäytyy Cape Mesuradon niemimaalle, ja Bushrod Island jää veden erottamaksi saareksi sen pohjoispuolelle. Vanhan keskustan pääkatu on Broad Street. Sen pohjoispuolella Watersiden markkina-alue jatkuu satamavesien äärelle.\n\nKaupunki kasvoi 1800-luvun alun uudisasutuksesta alueella, jolla paikalliset yhteisöt jo kalastivat, viljelivät ja kävivät kauppaa. Nimi annettiin James Monroen mukaan. Isoisän matkavuonna **1873** kaupungissa olivat jo vanha oikeustalo, Providence Baptistin historiallinen pyhäkkö, sanomalehdet ja Liberia College.\n\nKansallismuseo toimii vanhassa oikeustalossa. Kaupungin muisti säilyy myös sanomalehtien toimitusteksteissä ja varhaisissa valokuvissa. **Mesuradon mangrovemetsät** puolestaan pidättävät sedimenttiä ja vakauttavat rantaviivaa aivan kaupunkielämän rinnalla.',
    teksti: 'Monrovian vanhan keskustan pääakseliin kuuluu Broad Street. Watersiden markkina-alue sijaitsee sen pohjoispuolella satamaveden äärellä. Kaupungin asiointia voi seurata sekä kaduilla että markkinan sisä- ja ulkotilojen kapeilla käytävillä.\n\n1800-luvun kaupunki tallensi itseään monella tavalla. Liberia Heraldin varhaisia toimitustekstejä kuuluu museon aineistoon, ja Augustus Washington teki Monroviassa daguerreotyyppimuotokuvia. Kirjoja, tiiliä ja puutavaraa lahjoitettiin puolestaan Liberia Collegen rakentamiseen ja opetukseen.\n\nVesi erottaa kaupungin paikkoja toisistaan. Bushrod Islandin ympärillä ovat Atlantti, Saint Paul -joki, Mesuradojoki ja Stockton Creek. West Point on niemekkeellä sijaitseva asuinalue, jonka synty liittyy 1900-luvun kalastukseen. Mesuradon kosteikkojen mangrove tuo tähän rantakaupunkiin myös lintujen ruokailupaikat ja elinkeinoihin liittyvän luontoympäristön.',
  },
  Nouakchott: {
    intro: 'Nouakchott on Mauritanian pääkaupunki **Saharan ja Atlantin rajalla**. Pääkaupungin rakentaminen aloitettiin vuonna 1958. Paikka ei kuitenkaan ollut tyhjä: pääkaupunkia edelsi linnoitettu rannikon kalastajakylä. Isoisän matkavuonna 1873 nykyistä suunniteltua suurkaupunkia ei vielä ollut. 1900-luvun lopun kuivuudet ja aavikoituminen vauhdittivat muuttoa kaupunkiin.\n\nLeveiden katujen hallintokeskuksesta kasvoi myös kaupan ja työn kaupunki. Kalastajarannassa puuveneiden saalis myydään ja kuljetetaan kaupungin myyntipaikkoihin. Nouakchott tunnetaan myös Saharasta löydettyjen meteoriittien kauppapaikkana. Kaupungin reunoilla on puolestaan tehty työtä liikkuvan hiekan sitomiseksi oksa-aidoilla ja **elävällä vihervyöhykkeellä**.',
    teksti: 'Uutta pääkaupunkia alettiin rakentaa vuonna 1958, ja sen perusrakenteet olivat valmiina Mauritanian itsenäistyessä vuonna 1960. Vanhempi rannikkokylä jäi kaupungin lähtökohdaksi. Hallintoa varten suunnitellulle alueelle syntyi myöhemmin myös kaupan keskuksia ja laajoja ulkoilmamarkkinoita.\n\nAtlantin rannassa saalis tuodaan pienveneistä myyntiin. Jälleenmyyjät ja kalankäsittelijät jatkavat kalastajien työtä: osa kalasta kuljetetaan kaupunkiin myytäväksi, osa käsitellään ja pakataan vientiä varten.\n\nAavikon puolella oksa-aidat vakauttivat dyynejä ennen istutuksia. Vihervyöhykkeen kunnostamiseen osallistuivat asukkaat ja paikalliset toimijat. Nuoria taimia suojattiin myös laidunnukselta.',
  },
  Praia: {
    intro: 'Praia on Kap Verden pääkaupunki **Santiagon etelärannikolla**. Sen nimi tarkoittaa portugaliksi rantaa, mutta historiallinen keskusta kohoaa lahden yläpuoliselle tasanteelle. Plateau-nimisen ytimen ruutukaavaa kehitettiin etenkin 1800-luvulla. Muu kaupunki jatkuu myös laaksoihin ja muille tasanteille. Sataman lähelle syntynyt asutus kasvoi siirtomaahallinnon keskukseksi jo ennen isoisän matkavuotta 1873.\n\nLahden kautta laivat saivat ruokaa ja vettä sekä jatkoivat Atlantin reiteille. Santa Marian luoto kuului tullin, varastoinnin ja karanteenin historiaan, kun taas Maria Pian majakka tuli vasta myöhemmin. Nykykaupungin arkea avaavat erilliset torit sekä tabanka, jossa laulajan säkeeseen vastataan yhdessä. Etnografinen museo säilyttää tavaroiden lisäksi kertomuksia ja arvoituksia, joten **saarten muisti ei ole pelkkiä esineitä**.',
    teksti: 'Praian maantiedettä jäsentävät tasanteet eli achadat ja niiden väliset laaksot. Plateau on historiallinen ydin sataman yläpuolella. Sen katuverkko, aukiot ja hallintotalot kuuluvat etenkin 1800-luvun kaupunkikehitykseen, mutta kaupungin satamayhteydet ovat tätä vanhempia.\n\nVuonna 1873 Praia oli olemassa siirtomaahallinnon keskuksena. Aukio tunnettiin vanhemmalla nimellä, ja kasarmin ensimmäinen rakennusvaihe oli jo paikalla. Majakkaa ei vielä ollut.\n\nKap Verden eri saarten arkea on koottu etnografisen museon aineistoon. Praian kaupunginosissa elää myös tabanka-perinne, jossa musiikki, juhliminen ja keskinäinen avunanto liittyvät toisiinsa.',
  },
  Rabat: {
    intro: '**Rabat** on Marokon pääkaupunki Atlantin rannalla, kohdassa jossa Bou Regreg -joki laskee mereen. Joen etelärannalla on Rabat ja pohjoisrannalla Salé, joten vastarannan katot kuuluvat täällä jokapäiväiseen kaupunkinäkymään. Rabatin prefektuurissa oli vuonna 2024 noin puoli miljoonaa asukasta.\n\nKukkulan **Udayan kasbah** on keskiaikainen linnoitettu kaupunginosa, jonka sinivalkoisilla kujilla asutaan yhä. Sen vieressä oleva medina sai 1600-luvulla uuden muurin vanhemman ja laajemman kaupunginmuurin sisään. Chellahissa taas roomalaisen Salan jäännökset ja marinidien hautausmaa ovat saman raunioalueen kerroksia.\n\nVanhan kaupungin rinnalle suunniteltiin 1900-luvulla uusi kaupunginosa, jonka kanssa historiallinen ydin muodostaa maailmanperintökohteen. Nykyinen raitiovaunu yhdistää Rabatin ja Salén joen yli. Rabatin nimi juontuu arabian sanasta ribāṭ, joka tarkoittaa linnoitettua tukikohtaa.',
    teksti: 'Rabatin keskiaikainen kaupunkihanke oli asuttua medinaa laajempi. Almohadien muurien sisään jäi myös avoimia alueita; 1600-luvun Andalusialainen muuri rajasi niiden sisään tiiviimmän medinan.\n\nKasbahin rakennusten käyttö on muuttunut muurien pysyessä. Moulay Ismailin vanha paviljonki on ollut palatsiasunto, uskonnollinen oppilaitos ja museo. Nykyisen museon aiheena on marokkolainen koru- ja pukeutumisperintö, mutta rakennuksen sisäpiha kuuluu sen omaan historiaan.\n\nChellah vie vielä kauemmas taaksepäin: roomalainen Sala Colonia rakennettiin aiempien mauretanialaisten rakenteiden päälle. Marinidit ottivat paikan myöhemmin hautausmaakseen ja rakensivat oman uskonnollisen kompleksinsa. Näkyvät roomalaiskorttelit ovat myös arkeologisen työn tulosta; samaa avointa kaivausnäkymää ei ollut vuonna 1873.',
  },
  Tunis: {
    intro: 'Tunis on Tunisian pääkaupunki Tunisinjärven ja Välimeren rannikon tuntumassa. Sen historiallinen ydin on **medina**, jossa asuinkorttelit, kauppakujat ja moskeijat kuuluvat samaan kaupungin rakenteeseen. Bab el Bhar eli Merenportti erottaa vanhan kaupungin uudemmasta Tunisista.\n\nMedinan keskuksessa **Zitouna** on ollut sekä rukouksen että korkeamman oppimisen paikka. Sen lähellä Souk El Attarine tunnetaan hajusteiden ja kauneustuotteiden kauppakujana. Palatsien sisällä katujen kaupunki avautuu pylväspihoiksi, arkadeiksi ja eri tehtäviin jaetuiksi huoneiksi.\n\nIsoisän matkavuonna 1873 vanhat moskeijat ja monet pihapalatsit olivat jo olemassa. Niiden myöhemmät käyttötavat kertovat kaupungin muutoksesta: asuintalosta saattoi tulla varasto tai museo. **Maailmanperintöä** on koko medinan kaupunkikokonaisuus, myös monumenttien väliin jäävä arjen ympäristö.',
    teksti: 'Medinan portti on hyvä kynnys Tunisin vanhaan kaupunkiin. Bab el Bhar tunnetaan myös nimellä Porte de France, mutta Merenportti-nimi ei tarkoita, että portti olisi nykyisellä merenrantaviivalla. Portin takana kauppakujat ja asuinkorttelit jatkuvat katuverkoksi, joka ei perustu säännölliseen ruudukkoon.\n\nZitounan ympärillä kaupankäynti ja oppimisen historia ovat lähellä toisiaan. Souk El Attarinessa myydään muun muassa jasmiinia, ruusuvettä ja hennaa. Moskeijaan liittyneessä opetuksessa oli uskonnollisten aineiden rinnalla kielioppia, historiaa ja lääketiedettä.\n\nVanhojen palatsien historia näkyy myös tilojen käyttötavoissa. Dar Lasramissa palvelutilat, perhe ja vieraat sijoitettiin eri kerroksiin, ja Dar Othman sai myöhemmin tarvikkeiden säilytyspaikan tehtävän. Dar Ben Abdallahin museokäyttö alkoi vasta 1900-luvulla, vaikka palatsi oli olemassa jo paljon aiemmin.',
  },
  Abuja: {
    intro: 'Abuja on Nigerian suunniteltu pääkaupunki maan keskiosassa. Sen maisemassa kohoaa **Aso-kallio**, suuri graniittinen luonnonmuodostuma. Kaupungin sisäiset alueet levittäytyvät kallion etelä- ja länsipuolelle. Nykyisen pääkaupungin rakentaminen alkoi 1900-luvun loppupuoliskolla.\n\nVuonna 1873 tätä suunniteltua kaupunkia ei vielä ollut, mutta alueella eli paikallisia yhteisöjä, kuten gbagyita, basoja ja gwandaroja. Uutta kaupunkia toteutettiin vaiheittain kansainvälisten suunnitteluryhmien työn pohjalta. **Wusen markkinoilla** myydään tuoretta ruokaa, vaatteita ja elektroniikkaa. Jabin tekojärvi puolestaan on palvellut vedenhankintaa ja kuuluu myös virkistyskäyttöön. Pääkaupungin ympärillä sijaitseva Federal Capital Territory ulottuu kaupunkikatuja laajemmalle metsän ja savannin mosaiikkiin.',
    teksti: 'Abujan uusi pääkaupunki rakennettiin alueelle, jonka yhteisöillä oli jo oma historiansa. Gbagyit eli gwarit, basat ja gwandarat kuuluvat paikallisiin kansoihin. Kaupungin suunnittelu ja toteutus ovat tämän asutushistorian myöhempi kerros.\n\nAso on graniittinen monoliitti kaupungin reunassa. Jabin vesialue taas on maapadon synnyttämä tekojärvi, jonka alkuperäinen tehtävä liittyi vedenhankintaan.\n\nKaupunginosien nimet Wuse, Garki ja Jabi auttavat hahmottamaan Abujan arkea. Wusen markkinoilla ostetaan muun muassa ruokaa ja vaatteita, ja katujen liikkumiseen kuuluvat taksit. Lentoasema ja tieverkko yhdistävät kaupungin ympäröivään seutuun sekä kauemmas Nigeriaan.',
  },
  Accra: {
    intro: 'Accra kasvoi **Guineanlahden rannalle**, vanhojen Ga-yhteisöjen asutusten ympärille. Nykyinen Ghanan pääkaupunki yhdistää markkinakortteleita, opiskelupaikkoja ja meren äärellä eläviä kaupunginosia. Sen vanhaan ytimeen kuuluvat Jamestown ja Usshertown, joissa asuminen, kauppa ja kalastus jatkuvat rinnakkain.\n\nVuonna 1873 rannikon eurooppalaiset kauppalinnoitukset olivat jo olemassa. Accrasta tuli Kultarannikon hallintopääkaupunki vasta myöhemmin 1800-luvulla. Myös nykyinen Holy Trinity -katedraali kuuluu sitä myöhempään rakennuskerrokseen.\n\nKaupungin arkeen pääsee käsiksi **Makolan markkinoilla**: samalta kauppa-alueelta voi etsiä ruokaa ja sen valmistamiseen tarvittavan kattilan. Tro tro -pikkubussit kuljettavat yhteistä kyytiä tarvitsevia, ja Legonissa opiskellaan Ghanan yliopistossa.',
    teksti: 'Accran vanhat rannikkokaupunginosat ovat myös nykyisiä asuin- ja työympäristöjä. Jamestownin ja Usshertownin Ga-yhteisöissä kalastus ja kaupankäynti kuuluvat kaupungin pitkään historiaan. Linnoitukset kertovat eurooppalaisesta vallankäytöstä, mutta niiden ulkopuolella historia jatkuu tavallisena kaupunkielämänä.\n\nMakola tekee kaupasta konkreettista. Keskustan kauppa-alueella myydään tuoreiden elintarvikkeiden rinnalla vaatteita, työkaluja ja kattiloita. Tro tro -pikkubussit puolestaan yhdistävät liikenneterminaaleja ja ottavat matkustajia myös reittien varrelta.\n\nRannikon vesi näyttää erilaiselta eri paikoissa. Korlen laguuni liittyy Jamestownin asutushistoriaan ja kaupungin muutoksiin; Labadi on merellinen vapaa-ajan ympäristö. Kasvitieteelliseen puutarhaan vie retki Aburiin, omalle ylängön paikkakunnalleen Accran ulkopuolelle.',
  },
  Bamako: {
    intro: 'Bamako on **Nigerjoen kaupunki** Malin lounaisosassa. Joki, tasainen rantamaa ja pohjoisen kallioinen reuna antavat pääkaupungille erilaiset maisemat. Vuonna 1873 täällä oli pieni jokivarren asutus, ennen rautatietä ja siirtomaakauden hallintokeskusta.\n\nAluksi kaupunki kasvoi joen pohjoisrannalla, mutta myöhempi Bamako ulottuu myös etelään. Siltojen ja sotrama-pikkubussien avulla yhdistyvät rannat ja kaupunginosat. Toreilla ruoan rinnalla myydään käyttöesineitä, nahkatöitä ja soittimia, kun taas kansallismuseo kokoaa esineiden kautta maan historiaa.\n\n**Rautatie Kayesiin muutti Bamakon yhteyksiä** 1900-luvun alussa; Dakar-yhteys valmistui myöhemmin. Nigerin rannalla kalastus ja pienet viljelypalstat tuovat elinkeinot lähelle kaupunkimaisemaa.',
    teksti: 'Bamakon paikallinen historia ulottuu kauas aikaan ennen siirtomaahallintoa. Bamako nimettiin Ranskan Sudanin hallintopääkaupungiksi vuonna 1908.\n\nNigerjoen tasangolla maasto on pääosin tasaista, pohjoisessa se nousee kallioiseksi. Asutus kasvoi ensin pohjoisrannalla ja laajeni myöhemmin joen yli. Rantoja yhdistävät sillat; kalastus, viljelypalstat ja veneiden vesillelaskupaikat kuuluvat joen arkeen.\n\nBamako-Couran käsityömarkkinoilla ostetaan hopeakoruja, nahkatöitä, soittimia ja puuesineitä. Keskustan Grand Marché tunnetaan myös nimellä Marché Rose. Kansallismuseon kokoelmissa puolestaan säilytetään Malin eri yhteisöjen soittimia, vaatteita ja rituaaliesineitä.',
  },
  'Lomé': {
    intro: 'Lomé on Togon pääkaupunki **Guineanlahden rannalla**, lähellä Ghanan rajaa. Vanha kaupunkitila asettui meren, laguunin, Bèn ja Aflaon väliin. Ewe-kauppiaat toimivat rannikolla jo ennen siirtomaahallintoa. Kauppakaupunki kasvoi 1800-luvun loppupuolella, ja sen siirtomaapääkaupungin asema tuli myöhemmin.\n\n**Grand Marché** kokoaa keskustaan kankaita, mausteita ja arjen käyttöesineitä. Nana Benz -nimellä tunnetut naispuoliset kangaskauppiaat kuuluvat kaupungin kaupalliseen historiaan. Merisatama, rannikon tiet ja lentoasema yhdistävät Lomén muihin paikkoihin. Rannalla puolestaan kalastetaan, myydään ruokaa ja vietetään vapaa-aikaa. Kaupungissa kasvatetaan myös vihanneksia, ja palatsin puutarhassa kasvaa Guineanlahden alueen kasveja.',
    teksti: 'Lomén historia alkaa paikallisista asukkaista ja kauppiaista. Bè kuuluu rannikon vanhaan ewe-asutukseen, ja kauppayhteyksiä kulki Aflaon ja Ketan suuntaan sekä sisämaahan. Kaupungin kasvu ja myöhempi siirtomaahallinto ovat tämän historian eri vaiheita.\n\nKeskustan Grand Marché sijaitsee katedraalin lähellä. Sen eri osissa myydään niin mausteita ja arkisia tavaroita kuin kankaitakin. Nana Benz -kauppiaat tunnetaan vahakuvioitujen kankaiden kaupasta, mutta torin valikoima ulottuu paljon tekstiilejä laajemmalle.\n\nMeri on kaupungin eteläreuna ja arjen työympäristö. Rannalla harjoitetaan kalastusta ja vietetään vapaa-aikaa, kun taas satama palvelee tuontia ja vientiä. Laguunin pohjoispuolella sijaitsee Tokoinin ylänkö. Kaupungin kasvu on ulottunut näiden vanhojen maantieteellisten rajojen yli.',
  },
  'N\'Djamena': {
    intro: 'N’Djamena on Tšadin pääkaupunki maan lounaisosassa, **Charin ja Logonen yhtymäkohdassa**. Vastarannalla sijaitsee Kamerunin Kousséri. Joet kuuluvat sekä kaupungin maantieteeseen että sen kulkuyhteyksien historiaan. Nykyinen kaupunki kasvoi Fort-Lamy-nimisestä siirtomaa-asemasta 1900-luvun alussa.\n\nVuonna 1873 tätä myöhempää kaupunkia ei ollut, vaikka alueen paikallinen asutushistoria on vanhempi. Nykyinen N’Djamenan nimi otettiin käyttöön 1970-luvulla, ja se liittyy paikalliseen arabialaiseen nimikerrokseen. Torikauppa kokoaa kaupunkiin karjaa, viljaa, taateleita ja suolaa. **Kansallismuseon** tutkimusaiheisiin kuuluvat esihistoria ja paleoantropologia, ja museossa esitellään myös Tšadin fossiililöytöjen valoksia.',
    teksti: 'N’Djamenan paikalla ollut aiempi asutus ja Fort-Lamyn siirtomaakaupunki ovat historian eri kerroksia. Nykyinen pääkaupunki alkoi kasvaa 1900-luvun alussa. Nimen vaihtuminen myöhemmin N’Djamenaksi toi kaupungin nimeen paikallisen arabialaisen kerroksen.\n\nCharin rannalla oleva kaupunki sijaitsee kohdassa, jossa Logone liittyy siihen. Vastarannan Kousséri on Kamerunissa, joten kaupunkiseudun maantieteeseen kuuluu myös valtioiden raja. Jokien historiallisten kulkuyhteyksien rinnalla nykykaupungissa on tieverkko ja lentoasema.\n\nKansallismuseo esittelee luonnonhistoriaa, arkeologiaa ja kulttuuriperintöä. Tšadin fossiililöytöihin liittyvät Toumaï- ja Abel-nimet avaavat tutkijoiden työtä, jossa yksittäisistä luista tulkitaan kaukaista menneisyyttä. Fossiilien löytöpaikat ovat muualla Tšadissa.',
  },
  Niamey: {
    intro: 'Niamey on Nigerin pääkaupunki, jonka läpi kulkee **Nigerjoki**. Vasemmalla rannalla kaupunki nousee ylängölle, oikealla avautuu tulvatasanko. Joen saaretkin ovat asuttuja, ja kaupungin historia alkaa jokivarren kylistä. Goudel ja Gamkalé kuuluivat paikalliseen maisemaan jo ennen nykyisen pääkaupungin kasvua.\n\nVuonna 1873 täällä oli kyläasutusta; Ranskan siirtomaa-asema tuli myöhemmin. Kaupungin nimeä selitetään useissa suullisissa perinteissä eri tavoin. **Grand Marché** kokoaa yhteen tukku- ja vähittäiskaupan, ja jokivarren saviastioita tuodaan myyntiin Boubonista. Ga’ruwa-vedenkuljettajien kärryt puolestaan yhdistävät vesipisteet kotitalouksiin. Niameyn luontoa ovat myös kausittainen Gounti Yénan uoma, asukkaiden hoitamat puut ja Trois Sœursin paljaat lateriittikukkulat.',
    teksti: 'Nykyisen Niameyn alueella eli eri yhteisöjä jokivarren kylissä, ja kaupungin nimestä kerrotaan toisistaan poikkeavia suullisia selityksiä. Hallintokeskus kasvoi tähän asutukseen myöhemmin.\n\nNiger on kaupungin pysyvä joki. Gounti Yéna taas on kausittainen uoma, joka kerää valumavesiä kaupunginosista ja laskee Nigeriin keskustassa. Sen varrella viljellään hedelmiä ja vihanneksia; jokilaakso kuuluu samalla kaupungin maantieteeseen ja työn arkeen.\n\nGrand Marchén kaupankäynti, vedenkuljettajien reitit ja Boubonin saviastiat näyttävät erilaisia yhteyksiä kaupungin sisällä ja sen ympärille. Boubou Haman kansallismuseo esittelee alueen kulttuuria ja arkeologiaa. Jokisaarella asutaan, torilla käydään kauppaa ja puiden varjossa kokoonnutaan keskustelemaan.',
  },
  Ouagadougou: {
    intro: 'Ouagadougou on **hovin ja valkokankaiden kaupunki** Burkina Fason keskiosassa. Mossien valtakunnan ja Moro-Naban hovin historia ulottuu aikaan ennen siirtomaahallintoa. Vuonna 1873 kaupunki oli jo olemassa, mutta myöhempi rautatie ei vielä yhdistänyt sitä Norsunluurannikon suuntaan.\n\nNykyisessä pääkaupungissa kauppa jatkuu keskustasta kaupunginosiin ja pääteiden varsille. Torit kokoavat tuotteita kaupunkilaisille ja edelleen maaseudulle, kun taas käsityötapahtumat tuovat yhteen tekijöitä eri Afrikan maista. Metsäkin mahtuu kaupungin sisään: Bangr Weogo on sekä vanha paikallinen ympäristö että nykyinen ympäristökasvatuksen paikka.\n\n**FESPACOn elokuvanäytösten** rinnalla järjestetään työpajoja ja ammattilaistapaamisia. Yennengan ori -palkinto kantaa mossien myyttiseen perustajaprinsessaan liittyvää nimeä.',
    teksti: 'Ouagadougou oli mossien hovin keskus jo ennen siirtomaakauden hallintorakennuksia. Nykyinen Moro-Naban hoviperinne liittyy tähän pitkään kaupunkihistoriaan. Moro-Naba ja päälliköt kokoontuvat lyhyeen hoviseremoniaan.\n\nTorit yhdistävät keskustaa, kaupunginosia ja ympäröivää maaseutua. Käsityöntekijät voivat kohdata sekä paikallisessa Village Artisanalissa että kansainvälisessä SIAO-tapahtumassa. Bangr Weogon metsä puolestaan säilyttää kaupunkirakenteen sisällä toisenlaisen ympäristön.\n\nYennengan nimeä kantava palkinto muistuttaa perinteen ja uuden taiteen yhteydestä. Festivaalin MICA-markkinassa tekijät ja levittäjät etsivät elokuville uusia esityspaikkoja.',
  },
  'Porto-Novo': {
    intro: 'Porto-Novo on **Beninin virallinen pääkaupunki** maan eteläosassa, laguunin rannalla. Kaupunki tunnetaan myös nimillä Àjàṣẹ́ ja Hogbonu. Portugalinkielinen Porto-Novo tarkoittaa uutta satamaa. Paikallinen kuningaskunta kuului kaupungin historiaan jo ennen siirtomaahallinnon laajentumista.\n\nVuonna 1873 Porto-Novo oli jo paikallisen kuningaskunnan keskus laguunin rannalla. Honmèn vanha kuninkaallinen asuinpaikka on nykyisin hovin historiaa esittelevä museo. **Jardin des plantes et de la nature** puolestaan kasvoi aiemman pyhän metsän paikalle ja säilyttää kaupungissa vanhoja puita. Parlamentti sijaitsee Porto-Novossa, kun taas monet muut hallintotoiminnot ovat Cotonoussa.',
    teksti: 'Porto-Novon rinnakkaiset nimet kertovat sen eri kieli- ja historiakerroksista. Portugalinkielisen nimen ohella käytetään Àjàṣẹ́- ja Hogbonu-nimiä. Kaupunki oli paikallisen kuningaskunnan keskus ennen myöhempää siirtomaa-aikaa.\n\nHonmèn paikkamuseossa huomio kohdistuu entiseen kuninkaalliseen asuinpaikkaan, sen pihoihin ja hovin elämään. Alexandre Sènou Adandén etnografinen museo taas esittelee kulttuuriesineitä ja niiden rooleja yhteisöissä.\n\nVanhan pyhän metsän paikalla sijaitseva kasvipuutarha toimii myös kasvien säilyttämisen ja opetuksen ympäristönä. Kaupungin arkiseen liikkumiseen kuuluvat moottoripyörätaksit eli zemijanit. Laguunin rannalla oleva pääkaupunki liittyy tieyhteyksin läheiseen Cotonouhun, jossa on myös saapumiseen käytetty lentoasema.',
  },
  Yamoussoukro: {
    intro: 'Yamoussoukro on **Norsunluurannikon virallinen pääkaupunki** maan keskiosassa. Sen taustalla on baoulé-yhteisöjen asutusta ja vanha N’Gokron kylä. Kaupungin nykyinen nimi liittyy paikalliseen kuningattareen Yamoussoon. Nimen kro-pääte tarkoittaa kylää tai paikkaa.\n\nPääkaupunkiasema tuli 1900-luvun loppupuolella, ja Abidjan säilyi talouden sekä monien hallintotoimintojen keskuksena. Yamoussoukron kaupunkikuvaan kuuluvat laajat bulevardit, puukujanteet ja yhteispihojen ympärille järjestetty asutus. **Polyteknillisessä korkeakoulussa** opiskellaan muun muassa agronomiaa, tekniikkaa ja rakentamista. Markkinoille saapuu lähikylien tuotantoa, ja seudulla kasvatetaan maniokkia, jamssia sekä ruokabanaania.',
    teksti: 'Yamoussoukron nimessä säilyy vanhan paikallisen asutuksen muisto. N’Gokro oli kaupunkia edeltäneen kylän nimi, ja nykyinen nimi liittyy Yamoussoon. Seudun baoulé-historia edeltää siirtomaa-aikaa; nykyisen suunnitellun pääkaupungin rakennukset tulivat myöhemmin.\n\nLaajat puukujanteet ja bulevardit ovat osa uudempaa kaupunkisuunnittelua. Niiden rinnalla on asuinalueita, joissa talot järjestyvät yhteisten pihojen ympärille. Bussiaseman ja markkinoiden ympäristöt kuuluvat kaupungin arkisiin kohtaamispaikkoihin.\n\nLähiseudun viljelijät tuovat tuotteitaan markkinoille ja ostavat samalla kaupungista tarvitsemiaan tavaroita. Polyteknillisen korkeakoulun aloihin kuuluu agronomia sekä rakentamisen ja infrastruktuurin koulutus.',
  },
  'Yaoundé': {
    intro: 'Yaoundé on Kamerunin pääkaupunki sisämaassa, **kukkuloiden ja laaksojen** ympäristössä. Maasto jäsentää kaupunginosia, ja pieni Mfoundijoki kulkee kaupungin läpi. Alue oli ewondo-yhteisöjen asuttama ennen saksalaisen tutkimusaseman perustamista 1800-luvun lopulla. Vuonna 1873 tätä myöhempää asemaa ja kaupunkia ei vielä ollut.\n\nYaoundésta tuli sittemmin ranskalainen hallintokeskus ja nykyisen Kamerunin pääkaupunki. **Mokolon ja Mfoundin markkinoilla** myydään ruokaa, vaatteita ja kodin tavaroita. Kaupungissa myös valmistetaan esimerkiksi maitotuotteita, olutta, savi- ja lasituotteita sekä puutavaraa. Yliopistot ja ammatilliset oppilaitokset kouluttavat muun muassa opettajia, insinöörejä ja terveysalan osaajia.',
    teksti: 'Yaoundén seudulla asui paikallisia ewondo-yhteisöjä ennen 1800-luvun lopun saksalaista asemaa. Aseman paikasta sovittiin paikallisten päälliköiden kanssa. Sen varhaiseen työhön liittyi luonnontutkimusta, ennen myöhempää sotilaallista ja hallinnollista roolia.\n\nKaupungin maastossa on kukkuloita, ylänköjä ja laaksoja. Korkeammilla kohdilla kulkevat tiet ja rakennukset, kun taas laaksoissa on myös kasvillisuutta ja viljelyä. Pienet vesiväylät kuuluvat tähän sisämaan kaupunkimaisemaan.\n\nMokolo, Mfoundi ja pienemmät kaupunginosamarkkinat palvelevat päivittäisiä hankintoja. Koulutuksen kirjo puolestaan ulottuu yliopistoista opettaja-, insinööri- ja terveysalan koulutukseen. Blackitude-museon kokoelmat kertovat myös siitä, miten kulttuuriaineistoa on peritty, hankittu ja säilytetty eri vaiheissa.',
  },
  Bangui: {
    intro: 'Bangui sijaitsee **Ubangi-joen pohjoisrannalla**, kahden valtion rajalla. Keski-Afrikan tasavallan pääkaupungin vastarannalla on Kongon demokraattisen tasavallan Zongo. Kaupungin yläpuoliset kosket rajoittavat suurten alusten kulkua, mutta alavirtaan joki liittyy Kongon laajaan vesiverkkoon. Rantakeskustan leveät kadut johtavat keskusmarkkinapaikalle. Nykyinen kaupunki syntyi ranskalaisena asemana **vuonna 1889**, joten sitä ei vielä ollut vuonna 1873.\n\nYmpäristön historia on paljon kaupungin katuverkkoa vanhempi: arkeologiset löydöt kertovat aikaisemmasta raudanvalmistuksesta. Kuona, saviastiat ja puhallusputkien jäänteet tuovat näkyviin paikallista työtä ja osaamista.',
    teksti: 'Ubangi yhdistää Banguin laajempaan jokiverkkoon ja erottaa sen samalla vastarannan valtiosta. Kaupungin kohdalla joen pohjoispuoli kuuluu Keski-Afrikan tasavaltaan, eteläpuoli Kongon demokraattiseen tasavaltaan. Kaupungin yläpuoliset kosket ovat suurten alusten kululle maantieteellinen raja.\n\nBanguin ympäristön metallurgisilla paikoilla on säilynyt kuonaa, puhallusputkien katkelmia, saviastioita ja metalliesineitä. Jäänteet kertovat raudanvalmistuksen eri työvaiheista. Pendèrè-Senguèn raudanvalmistuspaikka on lähellä nykyisen kaupungin Independence Avenue -katua.\n\nVanha rantakeskusta yhdistyy markkinapaikkoihin leveiden katujen kautta. Kauppa näkyy myös käyttöesineiden käsityössä: koreissa, matoissa, puisissa tavaroissa ja keramiikassa. Kaupungissa valmistetaan myös tekstiilejä, elintarvikkeita, kenkiä ja saippuaa.',
  },
  Brazzaville: {
    intro: 'Brazzaville on **Kongon tasavallan pääkaupunki** Kongojoen rannalla. Se kasvoi Tio- eli Téké-valtakunnan vanhojen kauppapaikkojen, Mfwan ja Mpilan, ympärille. Brazzaville-nimi ja siirtomaakaupunki tulivat 1880-luvulla. Vuonna 1873 paikalliset kauppayhteisöt olivat jo olemassa.\n\nCongo–Ocean-rautatie yhdistää jokikaupungin Atlantin satamaan Pointe-Noireen. Radan rakentamiseen käytettiin pakkotyötä, ja tuhannet työntekijät kuolivat. Kaupunginosien toreilla myydään hedelmiä, vihanneksia ja tekstiilejä.\n\n**Musiikki kuuluu myös kaduille** ja kansainvälisiin yhteyksiin. Kaupunki on UNESCOn luovien kaupunkien verkoston musiikkikaupunki.',
    teksti: 'Ennen Brazzaville-nimeä alueella olivat Mfwan ja Mpilan kauppapaikat. Ne kuuluivat Tio- eli Téké-valtakuntaan. Nykyinen siirtomaanimi tuli Pierre Savorgnan de Brazzan mukaan 1880-luvulla.\n\nCongo–Ocean-rautatie rakennettiin 1900-luvun alkupuolella Brazzavillestä Pointe-Noireen. Rakentamisessa käytettiin pakkotyötä ja tuhansia ihmisiä kuoli. Rata yhdisti jokisataman Atlantin rannikkoon.\n\nBacongon Total Marketissa on kiinteät, näkyviin merkityt hinnat. Kaupungin katukaupassa myydään maniokkia, beignet-munkkeja ja lihavartaita. Kongojoen rantaa seuraava Corniche on kävelyalue, jolta avautuu näkymä vastarannan Kinshasaan.',
  },
  'Ciudad de la Paz': {
    intro: 'Ciudad de la Paz on suunniteltu pääkaupunki. Päiväntasaajan Guinean uusi hallintokaupunki sijaitsee **Río Munin sisämaassa**, nykyisen sademetsän ympäröimänä. Se on eri paikka kuin Bioko-saarella sijaitseva Malabo. Kaupunki tunnettiin aikaisemmin myös nimillä Oyala ja Djibloho.\n\nEspanjankielinen nykyinen nimi tarkoittaa **rauhan kaupunkia**. Hanke alkoi 2000-luvulla, ja sen suunnitelmissa yhdistyvät hallinnon tilat, asuinalueet ja niitä yhdistävä liikenneverkko. Vuonna 1873 tätä kaupunkia ei vielä ollut. Kaupungissa toimii myös AAUCA-yliopisto, jonka koulutusaloihin kuuluvat esimerkiksi tekniikka, arkkitehtuuri, lääketiede ja biologia.',
    teksti: 'Päiväntasaajan Guinean maantiede selittää pääkaupunkien eron. Malabo sijaitsee Bioko-saarella, kun taas Ciudad de la Paz kuuluu Río Munin mantereen puoleiseen alueeseen.\n\nCiudad de la Paz suunniteltiin kokonaisuutena. Kaavoihin kuuluu hallinnon ja asumisen alueita sekä liikennejärjestelyjä. Kaupunkisuunnitelmaa laati portugalilainen FAT-toimisto, jonka nimi avautuu sanoiksi Future Architecture Thinking.\n\nCiudad de la Pazissa toimii AAUCA eli Keski-Afrikan afroamerikkalainen yliopisto. Sen koulutusaloihin kuuluvat muun muassa tekniikka, arkkitehtuuri, lääketiede ja biologia. Kaupunki on myös Djiblohon maakunnan hallintokeskus.',
  },
  Gitega: {
    intro: 'Gitega on Burundin poliittinen pääkaupunki **maan keskiosan ylängöllä**. Kaupunki sijaitsee kukkuloiden ympäröimällä tasangolla, ja sen nykyinen kaupunkialue jatkaa kasvuaan vanhan hallinnon ja kaupan ytimen ympärille. Aikaisempi kirjoitusasu oli Kitega. Moderni asemakaava syntyi 1900-luvun alussa, mutta seudun historia liittyy paljon vanhempaan kuningaskuntaan. Vuonna 1873 nykyistä katu- ja rakennuskokonaisuutta ei vielä ollut samassa muodossa.\n\nGitegan pohjoispuolinen Gishora kuuluu kuninkaallisten rumpupaikkojen historiaan, jossa kuninkaallista perinnettä on ylläpidetty sukupolvien ajan. **Kuninkaallisen rummun perinne** elää soiton, tanssin, laulun ja taitojen opettamisen yhdistelmänä.',
    teksti: 'Gitegan moderni asemakaava on saksalaisajan 1900-luvun alun kerros.\n\nKansallismuseo syntyi 1900-luvun puolivälissä kansankulttuurin esineiden tallentamista varten. Kokoelmissa on etnografista ja historiallista aineistoa sekä kuninkaalliseen hoviin liittyviä esineitä.\n\nRumpuperinne siirtyy tekemällä ja opetuksessa. Yhteissoiton rinnalla siihen kuuluvat tanssi, laulu ja soittimien valmistustaito. Seudun vesiverkko jatkaa toiseen mittakaavaan: Ruvyironza liittyy Ruvubuun, Kageraan ja Victoriajärven kautta Niilin vesistöön. RN2-tie yhdistää Gitegan Bujumburaan. RN15 jatkaa pohjoiseen Ngozin ja Ruandan suuntaan.',
  },
  Kigali: {
    intro: 'Kigali on Ruandan pääkaupunki **kukkuloiden ja laaksojen maastossa**. Vanha keskusta sijaitsee Nyarugengen kukkulalla, mutta nykyinen kaupunki levittäytyy monille harjanteille ja niiden välisiin laaksoihin. Hallinnollisesti Kigali on provinssitason kaupunkialue, johon kuuluvat Gasabo, Kicukiro ja Nyarugenge.\n\nNykyinen hallintokaupunki syntyi 1900-luvun alussa, isoisän matkavuoden 1873 jälkeen. Richard Kandtin entinen asuintalo toimii nykyisin museona, jonka painotus on muuttunut luonnonhistoriasta kaupungin historiaan. Laaksoissa **kosteikkojen kunnostus** tuo esiin toisen paikallisen aikakerroksen: Nyandungussa palautetaan metsää ja Umusambissa tehdään lintusuojelutyötä.',
    teksti: 'Nyarugengen kukkulalla sijaitseva alkuperäinen hallintoaseman alue on yksi Kigalin kaupunkihistorian kerroksista. Sen lounaispuolella Nyamirambo kehittyi varhaiseksi kaupunginosaksi, jossa asui virkamiehiä ja swahilinkielisiä kauppiaita. Kaupunginosaan liittyy myös islamilainen yhteisöhistoria.\n\nKaupungin vesiverkko jatkuu kukkuloiden välistä kauas. Muhazijärveltä alkava Nyabugogo laskee Nyabarongoon, ja nämä vedet kuuluvat Niilin valuma-alueeseen.\n\nNyandungu ja Umusambi näyttävät kosteikkojen kunnostusta eri tavoin. Nyandungussa palautetaan paikallista viikunametsää ja vesiuomia; Umusambin suojapaikka tarjoaa ympäristön kurjille, jotka eivät voi palata luontoon. Molempiin kuuluu myös luonto-opetusta.',
  },
  Kinshasa: {
    intro: 'Kinshasa kasvaa **Kongojoen etelärannalla**, vastapäätä toiseen valtioon kuuluvaa Brazzavilleä. Kongon demokraattisen tasavallan pääkaupunki on myös hallinnollinen maakunta. Sen alueella tiivis kaupunki vaihtuu paikoin maaseuduksi, ja hallinnollinen alue on keskustan taajamaa laajempi. Joenrannan tasangon takana maasto muuttuu etelässä ja lännessä mäkiseksi.\n\nKinshasan historia alkoi ennen sen siirtomaanimeä Léopoldville. Vuonna 1873 alueella oli Teke- ja Humbu-yhteisöjä sekä paikallisia kalastus- ja kauppapaikkoja; myöhempi kauppa-asema syntyi 1800-luvun lopulla. Nykyinen nimi palauttaa mieleen vanhan Nshasa-paikannimen. Suurkaupungin keskellä toimii **kasvitieteellinen puutarha**, kun taas etelän metsäisellä retkialueella bonobojen suojelutyö avaa toisen näkökulman kaupungin ympäristöön.',
    teksti: 'Kinshasan paikalliset kauppapaikat edelsivät Léopoldvillen siirtomaakaupunkia. Nshasa ja Ntamo liittyivät joenrannan kalastukseen ja kaupankäyntiin. Nykyinen kaupunginnimi palautuu Nshasa-nimeen.\n\nNgalieman lahti oli varhaisen kauppa-aseman satamapaikka Kintambon alueella. Lahti kuuluu Kongojoen vasempaan rantaan lähellä koskijaksoa. Se on saanut nimensä paikalliselta päälliköltä Ngaliemalta.\n\nGomben kasvitieteellinen puutarha palvelee tutkimusta sekä ympäristökasvatusta. Kaupungin eteläpuolella Lola ya Bonobon suojapaikka yhdistää eläinten hoidon ja opetustyön. Kuntoutettuja bonoboja palautetaan luontoon Ekolo ya Bonobon yhteisöreservaatissa Equateurin maakunnassa.',
  },
  Libreville: {
    intro: 'Libreville on Gabonin pääkaupunki **suistolahden pohjoisrannalla**, missä jokien vesi avautuu kohti Guineanlahtea. Rannan mpongwé-yhteisöt asuivat paikalla jo ennen ranskalaista hallintoa. Kaupungin ranskankielinen nimi tarkoittaa vapaata kaupunkia ja muistaa sinne asettuneita vapautettuja ihmisiä. Uuden asutuksen synty sijoittuu vuoteen 1849, ja myöhemmin rannasta kehittyi kaupan ja siirtomaahallinnon keskus.\n\nVesialue antaa kaupungille suunnan: rantakatu, satama ja vastarannan niemi kuuluvat samaan suistolahden maisemaan. Mont-Bouët\'n torilla myydään ruokaa, kankaita ja vaatteita; ympärillä toimii kauppoja ja ravintoloita. Kaupungin sisällä Sibangin arboretum säilyttää päiväntasaajan metsän puita tutkimusta varten.',
    teksti: 'Librevillen historia alkaa ennen kaupungin ranskankielistä nimeä. Mpongwé-asutuksen rinnalle syntyi vapautettujen ihmisten uusi yhteisö, ja nimi Libreville jäi muistamaan vapauden merkitystä. Vuonna 1873 rannalla oli jo uusi asutus vanhempien mpongwé-yhteisöjen rinnalla.\n\nGabonin estuaari tuo Komon vettä rannikolle ja avautuu Guineanlahteen. Libreville sijaitsee sen pohjoisrannalla, Pointe Denis vastarannalla. Eteläisempi Owendo on oma satama- ja rautatiealueensa.\n\nSibangin arboretum liittää metsän kaupunkielämään tutkimuspaikkana. Akandassa lietteiset rannat ovat muuttolintujen talvehtimisympäristöä, kun taas Pongarassa metsät, savanni ja hiekkarannat lomittuvat. Alueiden yhteisöjen toimeentuloon kuuluvat myös kalastus ja viljely.',
  },
  Luanda: {
    intro: 'Luanda on Angolan pääkaupunki ja vanha satamakaupunki **Atlantin rannalla**. Lahden edustalle ulottuu Ilha de Luandan hiekkaniemi, jonka nimi viittaa saareen mutta maasto liittyy mantereeseen. Paikalliset yhteisöt elivät sen rannalla jo ennen portugalilaisten kaupungin syntyä 1500-luvun lopulla.\n\nVuonna 1873 Luanda oli jo vanha kauppapaikka. Sen aiempaan satamahistoriaan kuului orjuutettujen ihmisten kuljettaminen Brasiliaan, ja 1800-luvun vientiin kuuluivat myös puu, kahvi ja kasviöljyt. Kaupungin historia näkyy rannan Baixassa ja ylempänä sijaitsevassa Cidade Altassa.\n\n**Kirkkojen historia näkyy korjauksissa**, sillä rakennuksia on kunnostettu ja käytetty uudelleen eri aikoina. Remédiosin julkisivu sai nykyisen perusmuotonsa vasta 1800-luvun lopun kunnostuksessa. Nykyinen Luanda ulottuu vanhojen kaupunginosien ulkopuolelle, ja sen rannoilla, kaduilla sekä ravintoloissa elää tämän päivän pääkaupunki.',
    teksti: 'Luandan rannikon muodot ovat osa kaupungin historiaa. Sataman 1800-luvun vientituotteisiin kuuluivat puu, kahvi ja kasviöljyt. Ilha de Luandan matala hiekkaniemi liittyy mantereeseen kapean yhteyden kautta, ja sen ympärillä ovat merenlahti sekä kaupungin rannat.\n\nRannan alakaupunki Baixa liittyy satamaan ja kaupankäyntiin. Ylempänä sijaitseva Cidade Alta ei kuitenkaan ole pelkästään nuori osa kaupunkia: siellä on myös vanha jesuiittojen kirkonpaikka.\n\nVanhojen kirkkojen historiaan kuuluu kunnostuksia, käyttötarkoitusten muutoksia ja jälleenrakentamista. Remédios, Carmo, Nazaré ja Cabo kertovat näistä vaiheista omilla tavoillaan.',
  },
  'São Tomé': {
    intro: 'São Tomé on saarivaltion pääkaupunki, jonka keskusta seuraa **Ana Chavesin lahtea**. Kaupunki sijaitsee São Tomén saaren koillisrannikolla, ja sen nimi tarkoittaa portugaliksi Pyhää Tuomasta. Portugalilainen kaupunkiasutus sai alkunsa 1400-luvun lopulla. Sataman lähelle rakennettu **São Sebastiãon linnake** oli paikallaan jo vuonna 1873.\n\nKaupunki on myös saaren tie- ja bussiyhteyksien keskus, jonka arkea ovat tori, taksit ja yhteiskyydit. Kulttuurin puolella tchiloli yhdistää vanhan portugalilaisen näytelmätekstin musiikkiin, tanssiin ja paikallisten esiintyjäryhmien omaan ilmaisuun. Kunnallistori on myös taksien lähtöpaikka.',
    teksti: 'Ana Chavesin lahti avautuu São Tomén saaren koillisrannikolla. Pääkaupunki ja satama ovat sen rannalla. Satama palvelee kiinteän tavaran kuljetuksia, kun nestemäiset polttoaineet saapuvat pääosin Nevesin sataman kautta. Ana Chavesin satamalaituri rakennettiin 1900-luvun jälkipuoliskolla täyttömaalle.\n\nLahden eteläpäässä seisova São Sebastiãon linnake rakennettiin 1500-luvulla kaupungin ja sataman suojaksi. Rakennuksessa toimii nykyisin kansallismuseo, jonka kokoelmissa on siirtomaa-ajan esineistöä ja uskonnollista taidetta. Linnaketta kunnostettiin 1900-luvun puolivälissä.\n\nSaaren sisäosissa ovat Obôn luonnonpuiston alanko- ja vuoristometsät. Puistoon kuuluu erillisiä alueita myös Malanzassa, Praia das Conchasissa ja Lagoa Azulissa. Entisille plantaaseille uudelleen kasvanutta metsää kutsutaan capoeiraksi.',
  },
  Asmara: {
    intro: 'Asmara on Eritrean pääkaupunki **ylängöllä rannikon alangon yläpuolella**. Paikalla oli asutusta ja kauppaa jo ennen nykyisen keskustan suuria rakennusvaiheita. Paikallinen perimätieto liittää kaupungin nimen kylien yhdistymiseen naisten aloitteesta. Vuonna 1873 täällä oli vanhempi asutus- ja toripaikka. Nykyisen keskustan kirkot, teatteri ja rautatieasema tulivat myöhemmin.\n\nAsmaran katuverkossa suora ruutukaava kohtaa kaartuvat kadut, vanhat paikat ja maaston. Medeber kehittyi karavaanien pysähdyspaikasta kaupan, käsityön ja kierrätysmateriaalien ympäristöksi. Rautatie nousi Punaisenmeren rannikolta ylängölle, mikä vaati siltoja, tunneleita ja paljon rakennustyötä. Kaupungin kahviloissa ja ruokaperinteessä näkyy puolestaan **paikallisten makujen ja italialaisten ruokalajien kohtaaminen**, kuten berbere-mausteella maustettu tomaattikastikepasta.',
    teksti: 'Asmaran vanha asutus oli olemassa ennen siirtomaakauden kaupunkisuunnittelua. Paikallinen asutus, torit, Mai Bela -joki ja ylängön maasto vaikuttivat kaupungin suunnitteluun. Katuverkkoon syntyi ruutua ja kaartuvia linjoja, mutta siirtomaahallinto myös erotteli asuinalueita.\n\nRakennusten arki ulottui niiden julkisivuja pidemmälle. Ruusukon kirkon pihapiirissä oli koulu, kirjasto ja painokone, jolla tuotettiin paikalliskielisiä tekstejä. Teatterin myöhempi elokuvakäyttö puolestaan toi vanhaan rakennukseen projektoritilan.\n\nKaupungin tehtävät ovat myös vaihtaneet paikkaa. Medeber siirrettiin koilliseen teollisuusalueelle, ja kansallismuseo muutti entisestä palatsista entiseen tyttökouluun.',
  },
  'Djibouti (kaupunki)': {
    intro: 'Djibouti on samannimisen maan pääkaupunki **Tadjouran lahden etelärannalla**. Lahden yhteys Adeninlahteen sijoittaa kaupungin Afrikan sarven merireittien äärelle. Nykyinen satamakaupunki syntyi 1800-luvun loppupuolella, joten sitä ei vielä ollut vuonna 1873. Satama ja Etiopiaan johtanut rautatie liittyivät myöhempään kasvuun.\n\nVanhassa keskustassa Place du 27 Juin ja Mahamoud Harbin aukio yhdistyvät kauppakujilla. Molempien nimissä on tapahtunut muutoksia, vaikka paikat jatkavat julkisen tilan ja kaupan ympäristöinä. **Paahdettu kala ja jemeniittiläinen uuniperinne** kertovat rannikon yli kulkeneista ruokavaikutteista. Lahden suulla Moucha ja Maskali puolestaan yhdistävät korallisaaret, mangroven ja pinnan alla jatkuvan meriluonnon.',
    teksti: 'Djiboutin kaupunki kehittyi niemimaalle 1800-luvun lopulla. Somalialaiset ja afarilaiset asukkaat rakensivat taloja ja työskentelivät satamassa, ja merireitin kautta saapui myös jemeniittiläisiä kauppiaita. Vanhempi Ambouli liittyi viljelyyn ja hedelmätarhoihin.\n\nSatama palveli höyrylaivojen hiilihuoltoa ja Etiopian sisämaan kauppaa. Vanhan rautatien valmistuminen vahvisti toimintaa, ja kontit tulivat myöhempään satamavaiheeseen. Nykyinen Doraleh ei ole sama paikka kuin kaupungin vanha satama.\n\nKeskustan arkisessa maantieteessä aukiot, kujat ja basaarit kuuluvat yhteen. Place Ménélik muuttui Place du 27 Juiniksi, Place Rimbaud Mahamoud Harbin aukioksi.',
  },
  Dodoma: {
    intro: 'Dodoma on Tansanian pääkaupunki **maan keskiosassa**, vanhan kaupankäyntialueen päällä. Ennen nykyistä kaupunkia paikalla oli Idodomya-niminen markkinapaikka. Ugogon seutu ja Gogo-asukkaiden yhteisöt kuuluivat jo 1800-luvun karavaanireittien maailmaan. Nykyinen rautatiekaupunki syntyi 1900-luvun alkupuolella, joten vuonna 1873 myöhempää asemaa ja katuverkkoa ei vielä ollut.\n\n1970-luvulla Dodomaan ryhdyttiin suunnittelemaan pääkaupunkia, jossa korostui kylämäisen kaupungin ajatus. Dodoman ympäristö tunnetaan myös **rypäleiden viljelystä**, ja Makutupora on paikallisen lajikkeen nimi. Kaupungissa geologinen tutkimus säilyttää kiviä, mineraaleja ja kairausnäytteitä, kun taas korkeakoulut tuovat alueelle monien alojen opetusta.',
    teksti: 'Ugogo liittyi vanhoihin karavaanireitteihin, ja myöhempi rata muutti kuljetusten rakennetta. Kaupungin siirtomaakauden asemakaavassa eurooppalainen kortteli ja paikallinen kylä erotettiin toisistaan.\n\nPääkaupungin suunnitteluhanke alkoi 1970-luvulla. Maan keskinen sijainti oli hankkeen perusteiden joukossa, ja valittu suunnittelutoimisto oli kanadalainen Project Planning Associates. Suunnitelmassa korostettiin kylämäistä pääkaupunkia, mutta myöhemmät instituutiot eivät kaikki sijoittuneet alkuperäisen suunnitelman paikkoihin.\n\nDodoman seudun rypäleenkasvatus ja kaupungin geotieteellinen tutkimus ovat hallinnon rinnalla omia paikallisia aiheitaan. Myös kaupunki ja Dodoman maakunta ovat eri aluerajauksia.',
  },
  Juba: {
    intro: 'Juba on Etelä-Sudanin pääkaupunki **Valkoisen Niilin varrella**. Nykyinen kaupunkirakenne alkoi kehittyä 1900-luvulla vanhemman Bari-asutuksen paikalle. Koulun olemassaolo ja jokikuljetuksen läheisyys vaikuttivat uuden hallintopaikan valintaan. Joen ja maareittien yhteydet kuuluivat myöhempään kaupungin rakentumiseen.\n\nJebel Kujur erottuu kaupungin luonnonmuotona, ja sen kiveä sekä soraa on käytetty rakentamiseen. Konyo Konyon ruokatori välittää tuotteita myös pienemmille markkinoille. Oppimisen myöhempiin vaiheisiin kuuluvat julkinen yliopisto ja yhteistyöstä syntynyt **yleinen kirjasto**. Kaupungin muisti näkyy myös Hai Cinema -nimessä, joka jäi alueelle vanhan elokuvateatterin käytön vaihduttua.',
    teksti: 'Vanhempaa Bari-kylää seurasivat 1900-luvun alun lähetysasema ja koulu sekä myöhemmin hallintokaupungin rakentaminen. Koulu, joen läheisyys, hallintotyö ja kauppa liittyivät paikan kehitykseen. Lähetyskoulun tiloihin kuului myös työpaja.\n\nKaupunki syntyi myös paikallisesta työstä. Lentopaikka raivattiin ja sen pinta rakennettiin; polttoaine ja matkatavarat kulkivat työntekijöiden käsien kautta. Konyo Konyon torilla paikallinen sato ja tuontituotteet jatkoivat edelleen pienemmille markkinoille.\n\nVanhat kartat näyttivät viralliset kadut, mutta jättivät monia pihoja ja polkuja pois. Elokuvateatterin historia taas säilyi alueen nimessä.',
  },
  Kampala: {
    intro: 'Kampala on Ugandan pääkaupunki **kukkuloilla ja niiden välisissä laaksoissa** lähellä Victoriajärveä. Sen nimi tarkoitti ensin nykyistä Old Kampala -kukkulaa. Nimen yleinen selitys liittyy impala-antilooppeihin, kun taas myöhempi linnake kuuluu toiseen kaupunkivaiheeseen. Vuonna 1873 seutu oli Bugandan kuningaskunnan ydinaluetta. Linnakkeen ympärille kasvanutta nykykaupunkia ei vielä ollut.\n\nKaupungin kasvaessa vanhoille mäille tuli erilaisia tehtäviä, kuten opetusta, hoitoa ja kaupankäyntiä. Nakasero-torilla tuore ruoka myydään avoimessa osassa, vaatteet ja tarvikkeet suljetummassa rakennusosassa. **Makereren yliopisto alkoi teknisistä taidoista**, kuten puusepäntyöstä, rakentamisesta ja mekaniikasta. Ugandan museo tutkii kokoelmiaan myös pitkäaikaislainaan saatujen esineiden ja niiden alkuperäyhteisöjen kanssa.',
    teksti: 'Kampalan kukkuloille on kehittynyt erilaisia tehtäviä. Nakasero-tori on samannimisen mäen juurella, Makereren yliopiston pääkampus taas kukkulalla. Mengo Hospital sijaitsee nimestään huolimatta Namiremben alueella.\n\nNamiremben kirkkorakennuksia on vaihdettu useita kertoja: myrsky rikkoi katon, yksi rakennus hylättiin termiittejä peläten ja salama sytytti toisen olkikaton. Lubagassa vanhaa palatsialuetta seurasi kirkollinen, hoito- ja opetusympäristö.\n\nMakereren alkuvaiheen koulussa opittiin puusepäntyötä, rakentamista ja mekaniikkaa. Museon työ puolestaan yhdistää esineet niiden käyttäjiin: Ugandan museo valitsi Cambridgen arkeologian ja antropologian museosta pitkäaikaislainaksi esineitä tutkimusta ja yhteisöjen kanssa käytävää keskustelua varten.',
  },
  Khartum: {
    intro: 'Khartum on Sudanin pääkaupunki **Valkoisen ja Sinisen Niilin kohtaamisalueella**. Sen nimi voi tarkoittaa varsinaista kaupunkia tai yhteistä seutua Omdurmanin ja Bahrin kanssa. Joet erottavat nämä osat toisistaan, ja siltayhteydet ovat yhdistäneet niitä eri aikoina. Moderni Khartum syntyi 1800-luvun alussa hallinnon ja kaupan paikaksi. Vuonna 1873 Khartum oli jo olemassa, mutta moni nykyään tunnettu laitos tuli myöhemmin.\n\n**Gordon Memorial College** kuului vasta 1900-luvun alun kaupunkiin ja kehittyi myöhemmin yliopiston edeltäjäksi. Tutin viljely, keskustan tuoteryhmittäiset markkinat ja kasvitieteelliset kokoelmat kertovat seudun erilaisista tehtävistä.',
    teksti: 'Khartum kasvoi 1800-luvun alussa hallinnon ja kaupan paikaksi. Vuosisadan keskivaiheen tulvat muuttivat rakennustapoja: olki- ja ruokorakenteita korvattiin muta- ja kivirakenteilla. Keskustaa rakennettiin uudelleen myös vuosisadan lopulla.\n\nTutin saaren kylä oli Khartumia vanhempi. Pellot, kasvitarhat sekä sitrus- ja limettipuut tuottivat hedelmiä ja vihanneksia kaupunkiseudulle. Ennen modernia siltaa yhteydet saarelle kulkivat vesitse.\n\nGordon Memorial College koulutti apulaisinsinöörejä, maanmittaajia ja opettajia. Museon puutarhaan taas siirrettiin Nubian muinaisia rakennuksia, joita Assuanin padon synnyttämä Nasser-järvi uhkasi peittää. Buhenin, Akshan, Kumman ja Semnan osia pystytettiin Khartumissa alkuperäisten suuntiensa mukaisesti.',
  },
  Lilongwe: {
    intro: 'Lilongwe on Malawin pääkaupunki **Lilongwe-joen varrella**, maan Central Regionissa. Sen kartalla kaupunginosan nimi voi olla Area ja numero. Vanha kaupallinen Old Town ja myöhemmin rakennettu City Centre ovat eri kaupunkikeskuksia, joissa asioidaan eri syistä. Toinen kokoaa kaupankäyntiä ja liikkumista, toinen hallintoa, toimistoja ja hotelleja.\n\nNykyisen taajaman kehitys alkoi 1900-luvun alussa, ja pääkaupunkivaihe tuli 1970-luvulla. Vuonna 1873 myöhempää suunniteltua hallintokeskustaa tai nykyistä luontokeskusta ei ollut. Kaupungin metsäalueella **Lingadzi-joki** tarjoaa oman luonnonympäristönsä: sama kaupunki sisältää metsää, luonnonvaraisia eläimiä ja erillisen, erillisen kuntoutusalueen. Ruokapöydässä nsima on muutakin kuin maissijauhosta tehty annos, sillä sen kulinaariseen perinteeseen kuuluvat myös maissin käsittely, lisukkeiden valinta ja yhteinen ateria.',
    teksti: 'Old Town ja City Centre kuvaavat Lilongwen eri kasvuvaiheita. Vanha kaupallinen ydin liittyy tavaroiden ja ihmisten liikkumiseen; myöhempi pääkaupunkikeskus hallinnon ja toimistojen alueisiin.\n\nLilongwe toimii myös ympäröivän maatalousalueen tuotteiden markkinapaikkana. Kaupassa kohtaavat ruokaa ostavat asukkaat, raaka-aineiden käsittely ja kuljetus.\n\nLilongwe Wildlife Centren metsäalue sijaitsee vanhan ja uuden keskustan välissä. Siellä kulkeva Lingadzi on eri joki kuin kaupungin nimen antanut Lilongwe-joki. Julkisessa metsässä voi tutustua luonnonympäristöön, mutta eläinkuntoutuksen kuntoutusalueella rajoitetaan ihmiskontaktia eläinten villin käyttäytymisen säilyttämiseksi.',
  },
  Lusaka: {
    intro: 'Lusaka on Sambian pääkaupunki **sisämaan ylängöllä**, jossa kaupallinen keskusta kulkee rautatien vieressä. Cairo Roadin kaupat ja palvelut sijaitsevat radan länsipuolella, hallinnon alueet idempänä Cathedral Hillin ja Ridgewayn suunnalla. Nykyinen taajama kasvoi rautatieyhteyden ympärille 1900-luvun alussa. Pääkaupungin tehtävät siirtyivät tänne Livingstonesta 1930-luvulla. Vuonna 1873 tätä myöhempää pääkaupunkia ei ollut, mutta Lenje- ja Soli-yhteisöjen historia alueella oli jo olemassa.\n\nNykyisen kaupungin kieliarkeen kuuluu **Town Nyanja**, joka yhdistää Nyanjan pohjaan vaikutteita muista kielistä ja poikkeaa myös standardikielen rakenteesta. Ruokapöydässä nshiman maissipuuro saa makunsa kasvis-, kala- tai lihalisukkeista. Lusakassa syntynyt jalkapalloilija Barbra Banda on puolestaan vienyt kaupunkisidoksen maailmalle, kahteen hattutemppuun Tokion olympiaturnauksessa asti.',
    teksti: 'Cairo Road on Lusakan pohjois–eteläsuuntainen kaupallinen pääväylä. Rautatien päärata kulkee sen rinnalla idässä, ja hallinnon alueet sijoittuvat kaupallisesta ytimestä vielä idemmäksi. Central Market ja New City Market sijaitsevat Cairo Roadin länsipuolella.\n\nTown Nyanja toimii eri kieliryhmien välisen viestinnän kielenä. Sen sanastoon kuuluu vaikutteita englannista, bembasta ja muista paikallisista kielistä. Myös kieliopilliset rakenteet erottavat sitä koulussa käytetystä standardimuodosta.\n\nLusakan alla kalkkikivi ja dolomiittinen marmori liittyvät karstiseen maaperään. Vesi voi kulkea rakoja pitkin maan alla, vaikka kadulla ei näkyisi suurta jokea.',
  },
  Mogadishu: {
    intro: 'Mogadishu on Somalian pääkaupunki **Intian valtameren rannikolla**. Se oli jo vanha kaupunki vuonna 1873. Historialliseen ytimeen kuuluvat Hamar Weyne ja Shangani, joiden moskeijat ja kauppapaikat kertovat rannikon pitkästä asutuksesta. Nykyinen katedraali, rautatien historiallinen linja ja radioasema tulivat myöhemmin. Liidon rannalla on myös Mogadishun tärkeä kalan rantautumispaikka ja kalatori. Sen kehittämiseen kuuluvat saaliin käsittely, jäähdytys ja jätevesien johtaminen pois. Radio Mogadishun arkistossa säilytetään musiikin lisäksi radiodraamaa, kirjallisuutta ja urheilun ääniä.\n\n**Magneettinauhojen puhdistus ja digitointi** ovat osa tämän muistin hoitamista. Rakennuksillakin on eri vaiheensa: Garesasta tuli museon vanha koti, myöhemmin kokoelma siirtyi uuteen taloon, ja rannikon majakka on osittain sortuneena säilyttämistyön kohde.',
    teksti: 'Mogadishun vanha rannikkokaupunki edeltää 1900-luvun siirtomaarakennuksia. Arba’a Rukunin alkuperäinen moskeija on keskiajalta. Hamar Weyne ja Shangani kuuluvat kaupungin historialliseen rannikkoytimeen.\n\nKaupungin muistia on säilytetty myös rakennusten ulkopuolella. Radioarkiston magneettinauhoilla on kirjallisuutta, radiodraamaa, musiikkia ja urheilua. Nauhojen puhdistus, arviointi ja digitointi kuuluvat UNESCO:n tukemaan säilyttämishankkeeseen, jota rahoittaa Japani.\n\nMogadishun museon kokoelma on muuttanut vanhasta Garesasta uudempaan taloon. Majakan rakenteita tutkitaan pitkäaikaisen säilyttämisen suunnittelemiseksi.',
  },
  Antananarivo: {
    intro: 'Antananarivossa kaupunginosan osoite kertoo vain osan matkasta: **korkeusero on toinen puoli**. Madagaskarin pääkaupunki levittäytyy keskiylängön kukkuloille ja niiden välisiin laaksoihin. Yläkaupungin vanhojen asuintalojen rinnalla alempana ovat Analakelyn kauppakorttelit. Rinteitä yhdistävät kadut ja portaikot, mutta kaupungissa on myös kukkuloiden läpi kulkevia tunneleita.\n\nAntananarivo oli Merinan valtakunnan pääkaupunki jo ennen Ranskan siirtomaakautta. Andohalon aukiolla hallitsijat esittivät julkisia puheitaan, ja 1800-luvulla kaupunkiin perustettiin kouluja sekä käsityöteollisuutta. Samalla rakennusmateriaalien vanha raja alkoi murtua: aiemmin hautoihin varattu kivi kelpasi vähitellen myös koteihin. **Trano gasy**, tiilinen talo verantoineen, jäi osaksi kaupungin rakennuskulttuuria. Nykyisessä Tanassa ostoksia tehdään Analakelyssä, kahviloita löytyy keskustan pääkadulta ja vanhan rautatieaseman luona kulkija kohtaa kaupankäyntiä junaliikenteen sijasta.',
    teksti: 'Antananarivon historiaa voi lukea kaupungin korkeuseroista. Kukkuloiden yläosissa ovat kuninkaallisen kaupungin vanhat alueet, rinteillä asuin- ja liikekorttelit ja laaksossa Analakelyn kauppakeskus. Yläkaupunki, keskikaupunki ja alakaupunki ovat käyttökelpoisia nimiä aivan konkreettisille maisemille.\n\nRakennustapa muuttui 1800-luvulla. Vanha käsitys liitti kiven vainajiin ja kasviaineista rakennetut talot eläviin. Kun kivirakentamisen rajoituksia lievennettiin, tiilitalot yleistyivät. Trano gasy -talossa paikalliset ja ulkomailta tulleet vaikutteet yhdistyivät verantoihin ja kerrokselliseen asumiseen.\n\nAlakaupungin suorat pääkadut ja kaupparakennukset kuuluvat myöhempään kaupunkisuunnitteluun. Analakelyn suuri perjantaitori siirrettiin viime vuosisadan lopulla useaan paikkaan, mutta alue on edelleen kaupan keskus. Soaranon asema päättää Avenue de l’Indépendancen: vanhan aseman sisällä on nykyään liikkeitä.',
  },
  Gaborone: {
    intro: 'Gaboronen keskustan **Main Mall** on pitkä ulkona kulkeva kävely- ja kauppa-alue. Hallintorakennukset muodostavat sen yhteydessä oman alueensa. Botswanan pääkaupunki rakennettiin 1960-luvulla maan itsenäistymisen yhteydessä. Isoisän matkavuonna 1873 tätä kaupunkia ei vielä ollut, mutta Notwane-joen seudulla oli vanhempaa asutusta. Kaupungin nimi säilyttää tlokwa-päällikkö Gaboronen muiston.\n\nArjen kannalta tärkeä maamerkki on **Gaboronen pato**, joka palvelee vesihuoltoa kaupungin eteläpuolella. Kgale Hillin laelta avautuu näkymä Gaboroneen, ja itäpuolen riistapuistossa elää muun muassa antilooppeja ja seeproja. Kansallismuseo esittelee kulttuuriperintöä ja ylläpitää Botswanan alkuperäiskasvien puutarhaa.',
    teksti: 'Gaborone sijaitsee Botswanan kaakkoisosassa Notwane-joen seudulla. Paikan valinnassa uuden pääkaupungin sijainniksi painoivat veden ja rautatieyhteyden läheisyys. Kaupunki rakennettiin maan itsenäistymisen yhteydessä 1960-luvulla.\n\nNykyistä kaupunkia vanhempi Gaberones tunnetaan The Village -alueena. Nimi Gaborone liittyy tlokwa-yhteisön päällikköön.\n\nMain Mallin kävelyalue, museot ja hallintokorttelit ovat osa kaupunkia, jossa luontokohteet ovat lähellä. Kgale Hill on ulkoilupaikka, Gaborone Game Reserve eläinten ja lintujen elinympäristö. Gaboronen pato puolestaan yhdistää ympäristön kaupungin veden saantiin. Kasvitieteellinen puutarha tuo maan omaa kasvistoa kaupunkilaisten ulottuville.',
  },
  Harare: {
    intro: 'Harare on Zimbabwen pääkaupunki maan koillisosassa, **Mashonalandin ylängöllä**. Moderni kaupunki syntyi 1800-luvun lopulla siirtokunta- ja linnoituspaikaksi. Se tunnettiin Salisburyna, kunnes Harare-nimi otettiin käyttöön 1980-luvun alussa. Nimen taustalla on Kopjen lähellä sijainneen paikallisen Shona-kylän historia.\n\nVuonna 1873 nykyistä kaupunkia ei vielä ollut, mutta seudun historia ei alkanut siirtokunnasta. **Mbare Musika** yhdistää hedelmä- ja vihanneskaupan maaseutubussien liikenteeseen. Kansallisarkisto säilyttää asiakirjojen lisäksi ääntä ja suullisen historian haastatteluja, ja Reps-teatterissa vapaaehtoiset toimivat palkattujen työntekijöiden rinnalla. Kaupungin puiden värit voivat puolestaan tulla sekä kukista että nuorista lehdistä. Hararen istutetut jakarandat ja paikallinen msasa kertovat erilaisista kasvien alkuperistä.',
    teksti: 'Hararen moderni taajama syntyi 1800-luvun lopulla British South Africa Companyn siirtokunta- ja linnoituspaikaksi. Salisbury-nimi vaihtui myöhemmin Harareksi. Nykyiseen nimeen liittyvä paikallinen Shona-kylä kuuluu seudun vanhempaan historiaan.\n\nMbare Musika on sekä maataloustuotteiden kauppa- ja jakelupaikka että maaseutuliikenteen solmukohta. Museo ja arkisto puolestaan säilyttävät erilaisia menneisyyden aineistoja: esineitä, dokumentteja ja haastatteluja. Repsin teatteritoimintaan kuuluu esiintymisen lisäksi harjoittelua, puvustusta ja teknistä työtä.\n\nHararen katujen jakarandat ovat Etelä-Amerikasta peräisin olevia koristepuita. Paikallisen msasan uudet lehdet voivat taas näyttää viininpunaisilta ennen vihertymistään. Kasvitieteellisessä puutarhassa säilyneeseen miomboympäristöön liittyy istutettuja kokoelmia ja kansallinen herbaario.',
  },
  Maputo: {
    intro: '**Maputo** avautuu Intian valtamereen suuren lahden kautta, ja sen satama yhdistää Mosambikin rannikon eteläisen Afrikan sisämaahan. Maan pääkaupunki sijaitsee kaukana etelässä, Maputonlahden länsirannalla. Historiallista keskustaa kutsutaan Baixaksi, ja leveiden katujen varrella kasvaa jakarandoja ja akaasioita. Ruutukortteleiden lomassa kohtaavat uusklassismi, art deco ja modernismi.\n\nKaupungin rakennuksilla on yllättäviä tarinoita: **Casa de Ferro** tuotiin Belgiasta osina, ja kuparikupolinen rautatieasema luetaan usein virheellisesti Eiffelin työksi. Isoisän matkavuonna 1873 paikalla oli jo Lourenço Marquesin asutus ja linnoitus, mutta monet nykyiset maamerkit syntyivät myöhemmin. Itsenäistymisen jälkeen kaupunki sai nimen Maputo. Se on samalla oma maakuntatasoinen hallintoalue, joka on erillään ympäröivästä Maputon maakunnasta. Salmen vastaranta ja Inhacan saari kuuluvat nekin kaupungin hallinnolliseen kokonaisuuteen.',
    teksti: 'Maputon satama ei palvele vain rannikkoa. Raiteet yhdistävät sitä eteläisen Afrikan sisämaahan, ja satamassa on eri lastityypeille omia terminaaleja. Kaupungin vanha rautatieasema tekee yhteyden näkyväksi: kuljetusten käytännöllinen solmukohta sai komean Beaux-Arts-julkisivun.\n\nKeskustassa rakennusmateriaalikin voi olla tarinan päähenkilö. Casa de Ferron metalliosat valmistettiin Belgiassa ja koottiin Mosambikissa. Kuvernöörin asunnoksi hankittu talo päätyi muihin käyttötarkoituksiin, eikä sen suunnittelua voi panna Gustave Eiffelin nimiin.\n\nVanhat rakennukset ovat myös muuttaneet tehtävää. Linnoitus toimii museona, torihallissa myydään yhä elintarvikkeita ja Tundurun puutarhassa on tennisliiton kenttiä.',
  },
  Maseru: {
    intro: 'Maserussa pääkaupungin laidalla virtaava joki on samalla valtakunnan raja. **Mohokare**, toiselta nimeltään Caledon, erottaa Lesothon Etelä-Afrikasta. Sillan yli kulkeva tie liittää kaupungin naapurimaahan. Maseru sijaitsee laaksossa Maloti-vuoriston reunalla, ja sen nimi viittaa punaisiin hiekkakiviin.\n\nKingswayn ympärillä pankit ja suuret liikkeet vaihtuvat toreiksi ja pieniksi kaupoiksi. Thetsanen teollisuusalueella valmistetaan tekstiilejä ja jalkineita, joten kaupungin arki ulottuu hallintorakennuksia pidemmälle. **Mokorotlo-hattu** näkyy kansallisessa tunnusmaailmassa ja käsityökaupan muodossa. Isoisän matkavuonna 1873 täällä oli jo poliisileirin ympärille kasvanut pieni kaupunki, mutta rautatie tuli vasta myöhemmin. Maserun itäpuolella Thaba Bosiu muistuttaa ajasta, jolloin basothojen keskus oli suojaisalla vuorentasanteella.',
    teksti: 'Maserun paikka on helppo ymmärtää joen kautta. Mohokare kulkee Lesothon ja Etelä-Afrikan rajalla, ja Maseru Bridge yhdistää sen rannat. Kaupunki sijaitsee matalassa laaksossa Maloti-vuoriston reunalla. Hallintokeskus on samalla rajakaupunki.\n\nVarhainen Maseru muodostui poliisileirin ympärille 1800-luvun jälkipuoliskolla. Vuonna 1873 se oli vielä pieni ja Basutomaan hallinto liittyi Kapsiirtomaahan. Thaba Bosiu oli sitä vanhempi basothojen keskus: Moshoeshoe I:n yhteisö oli asettunut vuorentasanteelle jo vuosisadan alkupuolella.\n\nNykyisen Maserun taloutta muodostavat palvelut ja teollisuus. Kingswayn ympärillä sijaitsevat liikekeskukset, Thetsanessa tekstiili- ja jalkineyritykset. Rautatie liittyy Etelä-Afrikan verkkoon, mutta sillä ei kuljeteta matkustajia. Pääkaupungista jatketaan Lesothon muihin osiin maanteitä pitkin.',
  },
  Mbabane: {
    intro: '**Mbabane** on Eswatinin eli Swazimaan hallinnollinen pääkaupunki Highveld-ylängöllä. Se sijaitsee Mdzimba-vuoristossa Mbabane-joen ja sen sivujoen Polinjanen luona. Keskustan kaupat ja palvelut keskittyvät Swazi Plazan ja Mbabane Mallin ympärille, kun taas monet majapaikat ovat ympäröivillä rinteillä. Kuninkaallinen ja lainsäädännöllinen keskus on läheisessä Lobambassa, joten pääkaupungin tehtävät jakautuvat eri paikkoihin.\n\nMbabanen kauppapaikka kasvoi joenylityksen ympärille 1800-luvun lopulla ja sai hallinnollisen roolinsa seuraavan vuosisadan alussa. Isoisän matkavuonna 1873 nykyistä hallintokaupunkia ei vielä ollut, mutta alue ei ollut asumaton: nimi liittyy paikalliseen Mbabane Kunene -päällikköön. Kaupungin lähellä toimiva Waterford Kamhlaba perustettiin kouluksi, joka otti oppilaita eri taustoista naapurimaan rotuerottelun aikana. **Sibeben graniittikallio** puolestaan vie huomion paljon kaupunkia vanhempaan maisemaan. Sibebeltä löytyy paljaiden rinteiden lisäksi lohkareita, ruohomaita ja metsäisiä uurteita.',
    teksti: 'Mbabanen synty liittyy Transvaalista Mosambikiin kulkeneen kauppareitin joenylitykseen. Myöhempi hallintokeskus kasvoi paikassa, jossa oli jo paikallista asutusta ja oma nimihistoria. Siirtomaa-ajan kaupunki kuitenkin rajoitti swazien asumista varsinaisella kaupunkialueella.\n\nKaupungin kulttuuri löytyy myös koulusta ja galleriasta. Waterford Kamhlaba hyväksyi oppilaita eri rodullisista ja etnisistä taustoista aikana, jolloin naapurimaan apartheid erotteli ihmisiä. Indingilizi Galleryn valikoima taas ulottuu maalauksista ja veistoksista batiikkiin, mohairiin, koruihin ja keramiikkaan.\n\nKaupungin lähiseudulla luonto ja ihmisen historia limittyvät. Sibebe on graniittikallio, jota ympäröivät ylängön ruohomaat ja rinteet. Ngwenyassa rautamalmia hyödynnettiin ensin väriaineeksi, myöhemmin myös raudan valmistukseen. Malolotjan suojelualueella maisema vaihtuu ruohomaista jokilaaksoihin ja vuoristometsään.',
  },
  Moroni: {
    intro: 'Moronissa pääkaupungin takana kohoava vuori on **aktiivinen tulivuori**. Karthala hallitsee Ngazidjan eli Grande Comoren maisemaa, ja kaupungin rannikko on paikoin kallioista laavakiveä. Komorien pääkaupunki sijaitsee saaren länsirannikolla Intian valtameressä. Sen historiallinen ydin on medina, jossa kapeat kujat yhdistävät taloja, moskeijoita ja kokoontumispaikkoja. Kaupunki osallistui Intian valtameren kauppaan jo vuosisatoja ennen nykyistä pääkaupunkiasemaansa.\n\n**Volo Volo -torilla** kaupunki näkyy jokapäiväisten ostosten ja ruokapaikkojen kautta. Kansallismuseon aiheisiin kuuluvat ihmisten historian lisäksi valtameri ja tulivuoret.',
    teksti: 'Moroni kuului Intian valtameren kauppaverkostoihin jo kauan ennen isoisän matkavuotta 1873. Se oli osa Bambao-sulttaanikunnan kaupunkiverkkoa, jossa myös läheisellä Ikonilla oli tärkeä asema.\n\nPääkaupunkiasema on tätä kaupunkihistoriaa nuorempi. Saariston hallintokeskus siirtyi 1900-luvulla Dzaoudzista Moroniin. Medina jäi osaksi kasvavaa pääkaupunkia, ja sen kujat, talot sekä yhteiset kokoontumispaikat kantavat vanhempaa kaupunkirakennetta nykyiseen arkeen.\n\nKarthala ja meri liittävät Moronin luonnonhistorian osaksi kaupungin tutkimista. Tulivuoren kaldera ja rinteiden kasvillisuus muuttuvat eri tavoin, ja rannikon laavakivet muistuttavat saaren vulkaanisesta alkuperästä. Kansallismuseossa merelliset ja geologiset aiheet kohtaavat ihmisten historian; Volo Volo -torilla taas saariston tuotteet päätyvät ostoksiin ja aterioihin.',
  },
  'Port Louis': {
    intro: 'Port Louis on Mauritiuksen pääkaupunki, jossa satama ja vanhat korttelit kuuluvat samaan arkeen. Ranskalaisajan kaupunki sai nimensä kuningas Ludvig XV:n mukaan. Afrikan eteläkärjen kiertäneet laivat käyttivät sitä huoltopaikkana matkalla Euroopan ja Aasian välillä. Nykyään **Caudan Waterfront** yhdistää rantaan kauppoja, ravintoloita ja museon.\n\nIsoisän matkavuonna 1873 Port Louis’ssa oli jo sopimustyöläisten vastaanottopaikka, jonka jäänteet tunnetaan nimellä **Aapravasi Ghat**. Sen kautta kulkeneiden ihmisten historia ulottuu Mauritiuksen sokeritiloilta muihin siirtomaihin. Champ de Marsin laukkaradalla entinen sotilaskenttä on puolestaan saanut aivan toisen tehtävän. Blue Penny Museum säilyttää merikarttoja ja postimerkkejä, ja Chinatownin pienet liikkeet kertovat kaupungin kiinalaisesta yhteisöstä.',
    teksti: 'Port Louis’n historia liittyy merireitteihin. Kaupunki kasvoi ranskalaisella siirtomaakaudella hallintokeskukseksi ja laivojen huoltosatamaksi. Nykyinen pääkaupunki on myös talouden keskus, jossa sataman rinnalla toimivat kauppa ja rahoituspalvelut.\n\nAapravasi Ghatissa merimatka muuttui matkaksi työpaikalle. Vastaanottopaikka majoitti ja käsitteli sopimustyöläisiä, joista monet jatkoivat sokeritiloille. Säilyneet portaat ja rakennusten osat kertovat tästä 1800-luvun järjestelmästä ja tulijoiden perhehistoriasta.\n\nKaupungin muutkin kokoelmat johtavat maailmalle. Blue Penny Museumin merikartat näyttävät kulkureittejä, ja kansalliskirjasto säilyttää saaren tekstejä, kuvia ja ääniä. Chinatownissa historia jatkuu kotien, kauppojen ja ravintoloiden ympärille kasvaneena korttelina.',
  },
  'Victoria (Seychellit)': {
    intro: 'Victoria on Seychellien pääkaupunki Mahén saaren koillisrannikolla. Sen itäpuolen satamassa tonnikalan kalastus ja säilöntä kuuluvat kaupungin työhön. Keskustan **Lorloz-kellotornin** esikuva on Lontoon Little Ben, vaikka se tuo mieleen paljon suuremman kellotornin. Kaupunki sai nimensä kuningatar Victorian mukaan brittiläisellä siirtomaakaudella.\n\nPaikalla oli jo 1700-luvulla ranskalainen siirtokunta, mutta isoisän matkavuonna 1873 nykyistä kellotornia ja **Mont Fleurin kasvitieteellistä puutarhaa** ei vielä ollut. Puutarha alkoi myöhemmin maatalousasemana, ja nykyään siellä kasvatetaan myös coco de mer -palmuja. Niiden merikookos-nimi on harhaanjohtava: elinkelpoinen siemen ei kellu merellä. Torin historiaan puolestaan kuuluvat kala, hedelmät ja vihannekset.',
    teksti: 'Victorian varhaisen asutuksen nimi oli L’Établissement. Brittiläisellä siirtomaakaudella se vaihtui kuningatar Victorian nimeksi. Mahén koillisrannikon kaupungissa toimivat saarivaltion hallinto ja satama, jonka ympärillä kalastetaan sekä jalostetaan tonnikalaa.\n\nKeskustan kellotorni kuuluu 1900-luvun alkuun. Samalta aikakaudelta on Mont Fleurin puutarha, jonka alkuperäinen tehtävä oli maatalousasema. Kokoelmaan kerättiin hyötykasveja, ja myöhemmin alue kehittyi yleiseksi puistoksi.\n\nPuutarhassa voi tutustua Seychellien kasveihin elävässä kokoelmassa. Coco de mer -palmun hede- ja emikukat kasvavat eri puissa, ja suuret lehdet keräävät sadeveden mukana ravinteita rungon tyvelle. Luonnonhistoriallisen museon näyttelyaiheet ulottuvat puolestaan kasveista ja eläimistä geologiaan sekä ihmisen kulttuureihin.',
  },
  Windhoek: {
    intro: 'Windhoekissa käytetty vesi puhdistetaan takaisin juomavesiverkostoon. **Namibian pääkaupunki** sijaitsee Khomasin ylängöllä sisämaassa, kallioisten rinteiden ympäröimänä. Paikan lämpimät lähteet vetivät asukkaita puoleensa jo ennen nykyistä kaupunkikeskustaa. Orlamyhteisö rakensi tänne kirkon, joka palveli myös kouluna. Myöhemmin saksalainen siirtomaahallinto teki Windhoekista sotilaallisen ja hallinnollisen keskuksen.\n\nRautatieasema puolestaan muistuttaa ajasta, jolloin ylänkö yhdistettiin rannikolle kiskoilla. **Goreangabin vedenpuhdistamossa** veden käsittelyyn kuuluu otsonointia, suodatusta ja epäpuhtauksien sitomista aktiivihiileen.',
    teksti: 'Windhoekin lämpimien lähteiden äärelle syntyi orlamyhteisön asutus 1800-luvun alkupuolella. Yhteisön rakentama kirkko palveli myös kouluna. Asutuksen kukoistus hiipui ennen myöhemmän siirtomaakeskuksen rakentamista.\n\nBahnhof Streetin asemarakennus on kap-hollantilaista tyyliä. Sen pohjoissiipi rakennettiin saman tyylin mukaiseksi kuin alkuperäinen osa. Aseman museossa on rautatiekalustoa, karttoja ja ruokailuvaunujen astioita. Näyttely käsittelee myös Namibian lento- ja meriliikenteen historiaa.\n\nWindhoek käyttää vesihuollossaan patojen ja pohjaveden varantoja sekä veden uudelleenkäyttöä. Goreangabissa käytetty vesi puhdistetaan juomaveden lähteeksi. Uuden laitoksen suunnittelussa yhdistettiin paikallista tutkimusta, vanhan laitoksen käyttökokemusta ja kansainvälisten asiantuntijoiden työtä.',
  },
  'Ašgabat': {
    intro: 'Ašgabat on Turkmenistanin pääkaupunki aavikon ja vuoriston välisellä tasangolla. **Vaalea marmori** näkyy kauas, mutta kaupungin tarina ei ala uusista julkisivuista. Paikalla oli turkmeenikylä ennen kuin venäläinen varuskuntakaupunki kasvoi sen viereen 1800-luvun lopulla. Rautatie toi kauppiaita, käsityöläisiä ja yhteyden Kaspianmeren suuntaan.\n\nKaupungin nimi voidaan lukea persiaksi rakkauden kaupungiksi, vaikka nimen alkuperästä on muitakin tulkintoja. **Mattomuseossa** tekstiili voi olla sekä säilytyspussi että valtava esiripuksi suunniteltu kudos. Musiikissa pitkäkaulainen dutar säestää laulua ja kertomuksia, eikä soittimen valmistusta eroteta sen käytöstä. Läheisen Nisan raunioista puolestaan avautuu paljon nykyistä pääkaupunkia vanhempi maailma, jossa iranilaiset ja kreikkalaiset taideperinteet kohtasivat.',
    teksti: 'Ašgabatin kaupunkihistoria on nuori, mutta sen ympäristön asutushistoria ei ole. Nykyinen kaupunki kasvoi turkmeenikylän yhteyteen 1800-luvun lopulla. Varuskunnan, rautatieaseman ja kauppapaikan ympärille muodostui erilaisia kortteleita: kauppiaat, rautatieläiset ja käsityöläiset eivät asuneet kaikki samanlaisessa kaupungissa.\n\nVanha katuverkko on säilynyt osittain jälleenrakennuksen läpi. Viime vuosisadan tuhoisa maanjäristys muutti rakennuskantaa, ja myöhemmät suunnitelmat laajensivat kaupunkia etelään ja länteen. Marmori kertoo vain tämän pitkän rakennushistorian uusimmasta kerroksesta.\n\nKulttuuria voi lähestyä myös ilman suuria julkisivuja. Mattomuseo esittelee kudottujen tekstiilien monia käyttötapoja, ja Turkmenistanin kansallisessa historiamuseossa on Nisan arkeologisia löytöjä sekä soittimia.',
  },
  'Biškek': {
    intro: '**Biškek on Kirgisian pääkaupunki**, jonka leveiden katujen takana kohoaa Ala-Too-vuoristo. Keskustan ruutukaava kuuluu nuoreen kaupunkiin, vaikka seutu on tuntenut karavaaneja paljon kauemmin. Pišpekin linnoitus ja sen ympärille kasvanut asutus edelsivät nykyistä pääkaupunkia. Neuvostoaikana kaupunki tunnettiin nimellä Frunze, joka elää yhä museon nimessä.\n\nKaupan mittakaavan näkee **Dordoin basaarissa**, jossa laivakontit palvelevat myymälöinä ja varastoina. Osh-torilla ostetaan arkisia ruokia, vaatteita ja kodin tavaroita. Ruokalistoilla kohtaavat kirgisialaiset, venäläiset ja uiguurilaiset ruoat, ja paikallinen gamburger muistuttaa enemmän döneriä kuin pihvihampurilaista. Kaupungissa ilmestyy myös dungaaninkielinen sanomalehti Huimin Bao, joten pääkaupungin kulttuuriin kuuluu muutakin kuin valtakielten kirjoa.',
    teksti: 'Biškekin historia alkaa ennen sen nykyistä nimeä. Kokandin kaanikunnan savilinnoitus valvoi karavaanireittejä, ja linnoituksen tuhoutumisen jälkeen paikalle kasvoi Venäjän vallan aikainen asutus. Isoisän matkavuosi 1873 sijoittuu Pišpekin vaiheeseen; pääkaupungiksi nousu kuuluu vasta seuraavan vuosisadan historiaan.\n\nNeuvostokauden Frunze jätti kaupunkiin leveitä katuja ja kerrostalokortteleita, joiden keskelle jää pihoja. Keskustan ulkopuolella on myös paljon yksityisiä pientaloja. Erkindik-bulevardi yhdistää rautatieaseman ympäristön keskustan museoalueeseen: puistokatu on käyttökelpoinen kävelyreitti eri kaupunkikerrosten välillä.\n\nBiškek on myös kaupan solmukohta. Dordoin basaarissa tuontitavara jatkaa matkaansa muihin Keski-Aasian kaupunkeihin, kun taas Osh-torilla näkyy päivittäinen ostosarki. Pääkaupungin asemaa vahvistavat museot, kansalliskirjasto ja yliopistot.',
  },
  Dhaka: {
    intro: 'Dhakassa kaupunki liikkuu myös veden päällä. Bangladeshin pääkaupunki sijaitsee **Burigangan rannalla**, ja Sadarghatin satamasta matkustajat jatkavat jokireiteille. Vanhan kaupungin kujilla menneisyys näkyy kauppiaiden ja käsityöläisten mukaan nimetyissä alueissa. Armanitolan nimi muistaa armenialaiset kauppiaat, Farashganj ranskalaiset.\n\nDhaka kasvoi mogulikaudella hallinnon ja kaupan keskukseksi, jonka puuvillakankaita ostettiin kaukaa. Isoisän matkavuonna 1873 se oli jo vanha kaupunki brittihallinnon alaisessa Bengalissa. Musliinin kudonta, Shankharin kotilonkuorten käsityöt ja armenialaisen kirkon historia avaavat sen kansainvälisiä yhteyksiä eri suunnista. **Vanha Dhaka on myös ruokakaupunki**, jossa biryani ja bakarkhani-leipä kuuluvat paikalliseen perinteeseen.',
    teksti: 'Dhakan vanha keskusta liittyy Burigangaan. Sadarghatin satama kuljettaa matkustajia ja tavaraa muualle Bangladeshin jokiseuduille. Joen varrella oleva kaupunki on ollut yhteydessä kaukaisiin markkinoihin jo ennen nykyisiä katuja ja liikennevälineitä.\n\nMogulikauden Dhaka tunnettiin hienoista puuvillatekstiileistä. Musliinia tuotettiin kaupungin ympäristössä ja vietiin kauas, ja kauppaan osallistui eri puolilta saapuneita yhteisöjä. Armenialaisten jälki säilyy Armanitolan nimessä ja vanhassa kirkossa. Shankhari Bazaarin nimi puolestaan liittyy kotilonkuoria työstäviin käsityöläisiin.\n\nVanhojen korttelien nimet muistavat kaupungin kansainvälisen kaupan. Farashganj tarkoittaa ranskalaista basaari-aluetta, Armanitola armenialaisten korttelia. Ruokaperinteessä menneisyys jatkuu biryanin ja bakarkhanin kaltaisissa ruoissa.',
  },
  'Dušanbe': {
    intro: '**Dušanbe on Tadžikistanin pääkaupunki** Hissarin laaksossa, jossa vuoret rajaavat kaupunkimaisemaa. Nimi tarkoittaa maanantaita ja muistaa kylän viikoittaista markkinapäivää. Nykyinen pääkaupunki kasvoi suureksi vasta neuvostoaikana, jolloin se tunnettiin myös nimellä Stalinabad. Varzob-joki ja Rudaki-katu auttavat hahmottamaan laajaksi kasvanutta kaupunkia.\n\nDušanben kulttuuriin voi tutustua **soitinten kautta**: Gurminjin museossa on Pamirin ja Badakhshanin musiikkiperinteeseen kuuluvia kielisoittimia ja rumpuja. Ayni-teatterissa esitetään sekä oopperaa että balettia, ja kaupungin musiikkielämään kuuluu myös shashmaqom-perinne. Kasvitieteellinen puutarha ja istutetut viheralueet kertovat siitä, kuinka pääkaupungin vihreys on osittain rakennettu. Kaupungin käsityöosaaminen matkusti kauas, kun Dušanbe lahjoitti teehuoneen ystävyyskaupunkiinsa Boulderiin Yhdysvaltoihin.',
    teksti: 'Isoisän matkavuonna 1873 Dušanbe oli jo olemassa markkinapaikkana, mutta nykyinen pääkaupunkiasema kuuluu myöhempään historiaan. Kylä sijaitsi karavaanireittien risteyksessä. Sen kaupassa liikkuivat kankaat, nahat ja karja; kaupungin kasvuvaihe alkoi neuvostoaikaisen hallintokeskuksen rakentamisesta.\n\nPääkaupungin myötä kehittyivät yliopistot, museot ja esittävien taiteiden laitokset. Ayni-teatterin nimi viittaa kirjailija Sadriddin Ayniin, ja Gurminjin soitinmuseon kokoelma syntyi näyttelijän ja muusikon keräilytyöstä.\n\nDušanbe kasvoi vähitellen myös Varzob-joen vastakkaiselle rannalle. Kaupungin viheralueille tuotiin uusia kasveja, ja kasvitieteellinen puutarha on osa tätä istutettua maisemaa. Pääkaupungissa on silti muutakin kuin ihmisen suunnittelemaa elämää: sen eläimistöön on kirjattu siilejä, kettuja, lepakoita ja monenlaisia lintuja.',
  },
  Islamabad: {
    intro: 'Islamabadin osoitteesta voi lukea karttaa: kirjain ja numero kertovat sektorin, ja vinoviivan jälkeinen tunnus sen pienemmän osan. **Suunniteltu pääkaupunki** nousi Margalla-kukkuloiden juurelle viime vuosisadan jälkipuolella. Yleiskaavan laati kreikkalaisen arkkitehdin Constantinos Doxiadisin johtama toimisto. Isoisän matkavuonna 1873 tätä kaupunkia ei vielä ollut, vaikka seudulla oli paljon vanhempaa asutusta. Arjen yhteydet kulkevat myös Rawalpindiin, ja Metrobus liikkuu renkailla omalla väylällään.\n\nMuseot avaavat pääkaupungista toisen puolen. Lok Virsa esittelee eri yhteisöjen elävää kulttuuria vaatteista ja käsitöistä juhliin. Luonnonhistoriallisessa museossa voi kohdata **sinivalaan luurangon** kaukana merenrannasta. Kaupungin vieressä luonto ei lopu puistokäytävään: Margallan eläimistöön kuuluvat leopardit ja muntjakit, ja Rawal-järvi on samalla vedenhankinnan allas ja vesilintujen talvipaikka.',
    teksti: 'Islamabadin yleiskaava jakoi pääkaupungin eri käyttötarkoituksiin: asumiseen, hallintoon, opetukseen, kaupankäyntiin ja viheralueisiin. Ruudukko näkyy sektorien kirjain- ja numerotunnuksissa. Kaikki kaupungin osat eivät silti ole samanlaista ruutua, sillä pääkaupunkialueeseen kuuluu myös kukkuloita, järvi ja maaseutua.\n\nKaupunki rakennettiin viime vuosisadalla, mutta seudun historia ei alkanut suunnittelupöydältä. Moderni Islamabad syntyi vanhemman asutuksen ympäristöön, ja sen naapurina jatkaa Rawalpindi. Lok Virsan näyttelyissä ihmiset esiintyvät käsityön, musiikin ja tapojen harjoittajina: kulttuuri ei kuulu vain kaukaiseen menneisyyteen.\n\nMargallan kansallispuisto yhdistää erilaisia ympäristöjä kukkuloista Rawal-järveen. Puiston kasvistoon kuuluu mäntyjen lisäksi oliivi- ja päärynäpuita, ja eläimistössä on niin pieniä nisäkkäitä kuin leopardeja. Luonnonhistoriallinen museo puolestaan esittelee eläimiä, kasveja ja kiviä sekä niiden tutkimusta.',
  },
  'Taškent': {
    intro: 'Taškentissa voi kulkea basaariin, vanhaan medresaan ja leveälle pääkadulle saman kaupunkipäivän aikana. Uzbekistanin pääkaupunki on kasvanut kaupan ja jokiveden äärellä Keski-Aasian keitaalla. **Chorsun kauppapaikka** kuuluu vanhan kaupungin ytimeen, ja sen lähellä on Kukeldashin medresa. Kaupungin vanhoihin nimiin kuuluvat Chach ja Shash; Taškentin nimen tavallinen tulkinta on ”kivikaupunki”.\n\nTaškentin vanhoilla kaupunginosilla oli omat nimensä jo ennen Venäjän vallan aikaa. Uusi venäläinen asutus kasvoi 1800-luvulla Ankhor-kanavan toiselle puolelle, vanhan kaupungin rinnalle. Kukeldashin rakennus taas ehti toimia karavaanien majapaikkana, linnoituksena ja museona ennen paluutaan opetuskäyttöön. **Kaupungin kerrokset näkyvät myös kielissä**: uzbekin rinnalla puhutaan venäjää, ja kylteissä käytetään latinalaisia sekä kyrillisiä kirjaimia. Nykyinen Taškent on laaja kaupunki, jossa metro ja bussit yhdistävät eri alueita, mutta basaarin ja vanhojen korttelien ympäristöön tutustuu myös jalan.',
    teksti: 'Taškent on Uzbekistanin pääkaupunki Chirchiq-joen ja sen sivuvesien tuntumassa. Kaupunki oli kauppapaikka jo kauan ennen nykyaikaisia pääkatujaan. Chorsun ympäristö kuuluu vanhan kaupungin ytimeen, ja osa sen historiallisista rakennuksista säilyttää opetuksen, asumisen ja kaupankäynnin kerroksia.\n\nMyöhemmin vanhan kaupungin rinnalle kasvoi uutta asutusta Ankhor-kanavan toiselle puolelle. Beshyoghoch, Kukcha, Shaykhontokhur ja Sebzor tunnettiin daha-kaupunginosina; niillä oli omat hallitsijansa ennen kaupungin yhdistymistä.\n\nKukeldashin medresa on esimerkki rakennuksesta, jonka tehtävä on muuttunut useasti. Opetuksen lisäksi siellä on ollut karavaanien majapaikka ja museo. Soveltavan taiteen museon historiaan taas kuuluu vanha asuintalo, joka on palvellut myös orpokotina ja käsityöopetuksen paikkana. Taškentin arjessa uzbekki ja venäjä sekä erilaiset kirjoitusasut kulkevat rinnakkain.',
  },
  Thimphu: {
    intro: 'Thimphussa pääkaupungin liikennettä voi ohjata poliisin käsi. **Wang Chhun laaksoon** kasvanut Bhutanin pääkaupunki levittäytyy joen vartta pitkin ja nousee ympäröiville rinteille. Nykyisen keskustan taustalla on joukko kyliä, joista monet elävät edelleen kaupunginosien nimissä. Isoisän matkavuonna 1873 laaksossa oli jo asutusta ja luostareita, mutta nykyinen pääkaupunki syntyi vasta myöhemmin.\n\nThimphusta tuli maan pääkaupunki 1900-luvun puolivälissä, ja vanha Punakha väistyi hallinnon keskuksena. Kaupungissa voi siirtyä vilkkaalta kauppakadulta kansalliskirjaston vanhojen käsikirjoitusten ääreen. **Käsityö on täällä myös opiskelua ja työtä**: tekstiilejä kudotaan, paperia valmistetaan ja perinteisiä taitoja opetetaan. Changlimithangin jousiammunnassa osumaa seuraa laulu ja tanssi.',
    teksti: 'Thimphun kasvussa näkyy laakson muoto. Wang Chhu kulkee kaupungin läpi, ja asutus jatkuu pohjoisesta etelään sekä rinteille. Motithangin, Changangkhan ja Taban kaltaiset nimet ovat peräisin laakson aiemmista kylistä. Pääkaupungin historia on siksi nuorempi kuin sen paikkojen historia.\n\nSimtokhan dzong rakennettiin 1600-luvulla kaupungin eteläpuolen harjanteelle. Se kuuluu Bhutanin linnoitusluostareihin, joissa uskonnollinen elämä ja hallinto ovat liittyneet toisiinsa.\n\nKansalliskirjastossa säilytetään käsintehdylle paperille kirjoitettuja tekstejä, ja tekstiilimuseo esittelee kudonnan menetelmiä. Samat taidot jatkuvat kaupungin oppilaitoksissa ja työpajoissa.',
  },
  'Bandar Seri Begawan': {
    intro: 'Bandar Seri Begawanissa kaupungin katu voi olla silta ja taksi vene. Brunein pääkaupunki kasvoi **Brunei-joen** vesiasutuksesta, jonka rinnalle rakennettiin maalla sijaitseva keskusta. Sen vastarannalla Kampong Ayer jatkaa omaa arkeaan: paalujen päällä on asuntojen lisäksi kouluja ja moskeijoita. Sähkö ja vesijohto kuuluvat monen talon varustukseen, vaikka ulko-ovelta lähtevä kulkuväylä on paalujen päällä.\n\nMaalta löytyvät torit, museot ja kaupungin tunnettu Omar Ali Saifuddien -moskeija. **Kota Batun** teknologiamuseossa tekniikka tarkoittaa myös veneen rakentamista ja kankaan kutomista. Keskustan ulkopuolella Tasek Laman polut vievät vehreään puistoon, kun taas Gadongissa ilta-ateria löytyy yötorilta. Isoisän matkavuonna 1873 pääkaupungin elämä painottui vielä joelle; nykyinen nimi ja suuri osa maalle rakennetusta kaupungista ovat myöhemmältä ajalta.',
    teksti: 'Kaupungin vanha nimi oli Brunei Town, malaijiksi Bandar Brunei. Nykyinen nimi otettiin käyttöön 1900-luvulla, ja se viittaa Omar Ali Saifuddien III:n saamaan arvonimeen.\n\nKampong Ayerin nimi tarkoittaa vesikylää, mutta yhden kylän sijasta siihen kuuluu useita kaupunginosia. Osa niiden nimistä muistuttaa asukkaiden ammateista, osa joista ja arvonimistä. Kävelysillat yhdistävät taloja, ja leveämpien vesiväylien yli kuljetaan moottoriveneellä.\n\nBandar Seri Begawanin museoissa vanha arki saa tilaa juhlamenojen rinnalla. Royal Regalia Museum esittelee seremoniallista esineistöä, Malay Technology Museum puolestaan rakentamista ja käsityön välineitä. Torilla näiden kokoelmien jälkeen vastassa on käytännön kaupunki: vihanneksia, valmiita aterioita ja kotiin vietäviä ostoksia.',
  },
  'Kuala Lumpur': {
    intro: 'Kuala Lumpurin keskustassa **sademetsä on jäänyt rakennusten keskelle**. Bukit Nanasin kukkulalla kulkevat polut johtavat säilyneeseen metsään, jota tunnetaan myös nimellä KL Forest Eco Park. Malesian pääkaupunki kasvoi tinakaivosten kauppapaikasta, mutta sen historia näkyy myös tavallisen korttelin nimessä. Brickfields, tiilikentät, sai nimensä alueen savikuopista ja tiilenpoltosta.\n\nVanhan keskustan Sin Sze Si Ya -temppelissä historiallisia henkilöitä kunnioitetaan jumaluuksina. Kaupunkiseudulla liikutaan metro- ja kevytraitiolinjoilla, yksikiskoisella monoraililla ja KTM Komuter -lähijunilla. **Kuala Lumpurin Hokkien mee** saa tumman värinsä soijakastikkeesta. Brickfieldsissä aterian alustana voi olla banaaninlehti, ja roti canain taikinaan syntyy kerroksia venyttämällä ja taittamalla. Kaupungin ilme ja maut ovat kasvaneet malaijien, kiinalaisten ja intialaisten perinteiden kohtaamisista.',
    teksti: 'Klangin ja Gombakin jokien yhtymä oli tinakaivosten tavaraliikenteen solmukohta. Veneillä saapuneet tarvikkeet jatkoivat kaivoksille, ja tina kulki kaupunkiin myytäväksi. Kuala Lumpur oli olemassa isoisän matkavuonna 1873, mutta sen rakentaminen jatkui tulipalojen ja tulvien jälkeisissä jälleenrakennuksissa.\n\nPuu- ja lehtikattoisten rakennusten tilalle alettiin vaatia tiiliä ja kattotiiliä paloturvallisuuden vuoksi. Yap Ah Loy hankki Brickfieldsin alueen tiiliteollisuutta varten; myöhemmin Yap Kwan Seng perusti sinne tiiliuunin. Brickfieldsin nimi säilyttää kaupungin materiaalihistorian, vaikka alue tunnetaan nykyisin myös intialaisista kaupoista ja ruokapaikoista.\n\nKaupungin keskustassa Bukit Nanas säilyttää osan trooppista metsää. Sen nimi merkitsee ananaskukkulaa, mutta nimen selitykseksi kerrottu ananaksilla suojattu linnoitus on perimätietoa. Metsän nykyinen suojelualue syntyi vasta 1900-luvun alussa. Rakentaminen on sittemmin pienentänyt suojelualueen pinta-alaa.',
  },
  'Malé': {
    intro: '**Malé** on Malediivien pääkaupunki ja saariston kaupallinen solmukohta Intian valtamerellä. Sen kalatorille tuodaan saalista, ja viereisissä kojuissa myydään atolleilta saapuneita hedelmiä sekä kuivattua kalaa. Pienellä pääsaarella satama, asuintalot ja hallinnon rakennukset ovat lähekkäin. Velanan lentoasema sijaitsee naapurisaarella Hulhulélla, jonne pääsee myös maanteitse.\n\nMalé oli aikoinaan sulttaanien linnoitettu palatsikaupunki. Kuninkaallinen palatsi ja vanhat varustukset ovat kadonneet, mutta **Hukuru Miskiy**, vanha perjantaimoskeija, säilyttää korallikivestä rakentamisen perinnettä. Sen lohkot on sovitettu toisiinsa puusepän liitoksia muistuttavalla tekniikalla. Meri näkyy myös ruokapöydässä: tonnikala ja kookos kohtaavat aamiaisessa, välipaloissa ja curryissa.',
    teksti: 'Malén vanhaan kaupunkiin kuuluivat sulttaanin palatsi, muurit ja portit. Keskiaikainen Ibn Battutan matkakuvaus kertoo kuningattaren asuinpaikasta, puisista moskeijoista ja palatsissa varastoiduista kaurikotilon kuorista. Saari oli osa merikaupan verkostoa jo kauan ennen lentoliikennettä.\n\nHukuru Miskiy rakennettiin 1600-luvulla korallikivestä. Märkänä leikattavat lohkot kuivattiin ja sovitettiin toisiinsa pontti-uraliitoksilla. Puukatot, kaiverrukset ja lakatut sisäosat täydentävät rakennusta, jossa kiventyö ja puusepäntaito liittyvät yhteen.\n\nNykyisen Malén satama on saariston tavaraliikenteen keskus. Kalatorin naapurissa myydään atollien kasviksia, hedelmiä ja säilöttyä kalaa. Kahviloiden hedhika-välipalat sekä tonnikalasta ja kookoksesta tehtävät ruoat tuovat sataman tuotteet kaupunkilaisten pöytään.',
  },
  Naypyidaw: {
    intro: 'Naypyidaw on Myanmarin hallinnollinen pääkaupunki maan keskiosassa. Se rakennettiin **suunniteltuna kaupunkina** 2000-luvulla, joten sen historia on aivan eri mittainen kuin maan vanhojen kuninkaallisten keskusten. Lähellä sijaitseva Pyinmana on kuitenkin uutta pääkaupunkia vanhempi asutus. Naypyidawin nimi puolestaan tarkoittaa kuninkaallista asuinpaikkaa tai pääkaupunkia, ja sama sana kuului jo vanhempien hallitsijakaupunkien nimiin.\n\nKaupunki sijaitsee Bago Yoman ja Shan Yoman vuoristojen välisellä alueella, ja sen toimintoja on jaettu eri vyöhykkeisiin. **Kansallismuseon** kokoelmat ulottuvat fossiileista esihistorian työkaluihin ja vanhoihin kaupunkikulttuureihin. National Herbal Park kokoaa puolestaan perinteiseen lääkekasvien käyttöön liittyviä kasveja maan eri alueilta. Isoisän matkavuonna 1873 nykyistä Naypyidawia ei ollut: sen vanhaa menneisyyttä etsivä katse suuntautuu naapuriasutukseen ja muualta tuotuihin museokokoelmiin.',
    teksti: 'Naypyidaw tunnetaan myös kirjoitusasulla Nay Pyi Taw. Nimi liittyy kuninkaalliseen asuinpaikkaan, vaikka nykyinen kaupunki on rakennettu vasta 2000-luvulla. Vanhan sanan käyttö yhdistää nimen maan aiempiin hallitsijakaupunkeihin.\n\nKaupunki sijaitsee Naypyidawin liittoalueella. Liittoalueeseen kuuluu suunnitellun kaupungin lisäksi vanhempia paikkoja, kuten Pyinmana ja Lewe. Uuden pääkaupungin vyöhykkeet ja vanhat asutukset sijaitsevat saman hallintoalueen sisällä.\n\nKansallismuseossa pääkaupungin nuori ikä ja kokoelmien pitkä aikajänne kohtaavat. Pondaungin fossiilit, esihistorian välineet ja Pyu-kaupunkien rakennusosat kertovat eri puolilta Myanmaria saadusta aineistosta. Lääkekasvipuistossa alueellinen kirjo näkyy kasvavina kasveina.',
  },
  'Phnom Penh': {
    intro: 'Phnom Penhissä **Tonlé Sap -joki vaihtaa virtaussuuntaa** vuodenaikojen mukana. Mekongin tulvavesi voi työntyä sitä pitkin kohti järveä, ja veden laskiessa järvi purkautuu takaisin. Kaupungin vanha nimi Chaktomuk, neljä kasvoa, viittaa sen jokien risteykseen.\n\nRannasta sisämaahan siirryttäessä katujen numerot alkavat toimia eräänlaisena kompassina: parittomat kulkevat pääosin pohjoisesta etelään ja parilliset idästä länteen. **Kuy teav -nuudeliannoksessa** puolestaan liemi voi tulla omaan kulhoonsa. Kuninkaanpalatsin alueella on Ranskassa valmistettu rautapaviljonki, ja Kansallismuseon rakennus sovittaa khmerarkkitehtuurin muotoja museon tarpeisiin.',
    teksti: 'Phnom Penhin kohdalla Mekong jatkuu etelään, Tonlé Sap liittyy siihen ja Bassac erkanee omaksi joekseen. Vanhan Chaktomuk-nimen neljä kasvoa ovat tämän vesiristeyksen haarat. Kaupunki on yhteydessä kaukana sijaitsevaan Tonlé Sap -järveen saman nimisen joen kautta; järvi ja joki ovat eri paikkoja.\n\nKuningas Norodom siirsi hovin Phnom Penhiin 1800-luvulla. Isoisän matkavuonna 1873 kaupunki oli jo pääkaupunki, mutta nykyinen rakennuskanta ei ole yksi säilynyt aikakausi. Palatsialueen eri osat, torit ja museot ovat syntyneet ja muuttuneet eri vaiheissa.\n\nKansallismuseossa khmerien menneisyyttä tarkastellaan esineiden kautta. Kuninkaallisen baletin liikkeet puolestaan välittävät tarinoita elävänä taitona: käsillä ja asennoilla on omat merkityksensä.',
  },
  Pjongjang: {
    intro: 'Pjongjang on Pohjois-Korean pääkaupunki Taedong-joen varrella. Sen nimi tarkoittaa **tasaista maata**, ja kaupunki sijaitsee Korean niemimaan läntisen rannikon tasangolla. Joen reitti alkaa kuitenkin pohjoisen Rangrim-vuorilta ja jatkuu kaupungin kautta kohti Koreanlahtea. Moran-kukkula tuo tasankoon puistoa ja korkeuseroja.\n\nIsoisän matkavuoteen 1873 mennessä Pjongjang oli ollut Goguryeon pääkaupunki ja myöhemmin Goryeon läntinen pääkaupunki. Joen varren Taedongmun-portti muistuttaa ajasta, jolloin lautta kuljetti ihmisiä joen yli. Rantapaviljongit yhdistävät vanhan kaupungin puolustuspaikkoja ja maiseman katselua. Pjongjangin naengmyeonissa **kylmät tattarinuudelit** tarjoillaan liemessä. Naengmyeon on myös yhdessäolon tapa: pitkät nuudelit liittyvät pitkän elämän toivotuksiin ja perhejuhliin.',
    teksti: 'Pjongjangin vanha kaupunki suuntautui Taedongille. Itäinen Taedongmun-portti oli tärkeä yhteys joelle, ja sen ulkopuolella toimi lauttaliikenne. Portilta kaupunkialueelle johtava tie oli vanhan keskustan kulkuväyliä. Kivirakenteen ylle noussut paviljonki yhdisti portin ja näköalapaikan.\n\nLähistön Ryongwang-paviljonki kuului kaupungin puolustusjärjestelmään ja muuttui myöhemmin maiseman katselun paikaksi. Moran-kukkulan rannassa Pubyokin nimi viittaa kelluviin muureihin.\n\nRuokaperinteessä samaan kaupunkiin mahtuvat sekä kylmä nuudelikulho että lämmin juovakelttikeitto. Pjongjangin naengmyeonissa tattarinuudelit saavat seurakseen viileän liemen ja lisukkeita. Ruokaperinteeseen kuuluu myös taitojen välittäminen perheissä ja ravintoloissa.',
  },
  Vientiane: {
    intro: '**Vientiane** on Laosin pääkaupunki Mekongin rannalla, vastapäätä Thaimaata. Sen keskustassa temppelit, museot, kahvilat ja joen rantakävely liittyvät samaan kaupunkikierrokseen. Kaupunki oli Lan Xangin valtakunnan pääkaupunki ja myöhemmin ranskalaisajan hallintokeskus. Nykyinen kirjoitusasu Vientiane tulee ranskasta; laon Viangchan-nimelle annetaan sekä kuuhun että santelipuuhun liittyvä tulkinta.\n\n**Wat Si Saketin** käytäväseinissä on pieniä Buddha-kuvia varten tehtyjä syvennyksiä. Läheinen Haw Phra Kaew muistaa Smaragdibuddhan, vaikka patsas on nykyisin Bangkokissa ja entinen temppeli toimii museona. Ban Anoun iltatorilla kaupungin arki jatkuu vartaina, riisileivonnaisina ja pieninä lehtikääreinä. Ruokapöydässä tahmea riisi kohtaa yrteillä maustetun laapin ja banaaninlehdessä höyrytetyn kalan. Kadulla myytävä täytetty patonki lisää tähän oman ranskalaisajan jälkensä.',
    teksti: 'Vientianen ranskalainen nimi pohjautuu laon Viangchaniin. Viang tarkoittaa muurien ympäröimää kaupunkia, kun taas loppuosalle annetaan sekä santelipuuhun että kuuhun liittyvä tulkinta. Vanhan Lan Xangin pääkaupungin historia näkyy uskonnollisissa rakennuksissa ja niiden muuttuneissa tehtävissä.\n\nWat Si Saket rakennettiin 1800-luvun alkupuolella ja korjattiin myöhemmin ranskalaisajalla. Sen käytäväseinissä on keraamisia ja hopeisia Buddha-kuvia. Haw Phra Kaew puolestaan oli kuninkaan henkilökohtainen temppeli Smaragdibuddhaa varten; useiden tuhojen ja jälleenrakennusten jälkeen rakennus toimii museona.\n\nMekongin rantaa pitkin voi jatkaa ravintoloihin ja kahviloihin. Ban Anoun iltatorilla myydään pieniä ruokannoksia, ja Vientianen kaduilla vastaan tulee myös ranskalaisperäisiä patonkeja. Tahmea riisi, höyrytetty kala ja täytetty leipä näyttävät kaupungin ruokakulttuurin eri puolet.',
  },
  Belmopan: {
    intro: 'Belmopan on Belizen pääkaupunki Cayon piirikunnassa, sisämaassa Belize-joen lähellä. Kaupunki suunniteltiin 1900-luvun jälkipuoliskolla, kun hurrikaani Hattie oli vahingoittanut rannikon Belize Cityä. Uusi paikka valittiin korkeammalta ja kauempaa meren myrskyaalloista. **Belmopanin nimi** yhdistää Belize- ja Mopan-jokien nimet.\n\nKeskustan perusrakenne kiertyy Ring Roadin eli kehätien ympärille, ja sen sisään jää myös puistoaluetta. **University of Belizen** kampuksella naapurimaiden espanjankieliset opiskelijat voivat opiskella englantia. Keskustan markkinoille puolestaan saapuu väkeä ympäröivistä kylistä ja kaupungeista. Läheinen Guanacasten kansallispuisto vie kävelijän metsään, jonka nimenantajana oli aikanaan hakkuulta säästynyt puu. Pääkaupungissa sijaitsevat myös Belizen kansallisarkisto ja National Heritage Library.',
    teksti: 'Belmopanin rakentaminen oli vastaus rannikon pääkaupungin myrskyvahinkoihin. Hurrikaani Hattien jälkeen uudelle hallintokeskukselle etsittiin sisämaasta korkeampaa maata. Kaupungin rakentaminen alkoi 1900-luvun jälkipuoliskolla, ja hallinto siirtyi sinne ensimmäisen rakennusvaiheen valmistuttua.\n\nSuunnitellun keskustan tunnus on Ring Road. Sen sisäpuolella ja ympärillä sijaitsee suuri osa hallintorakennuksista, mutta renkaan sisään jätettiin myös puistoja. Asukkaisiin kuuluu monia yhteisöjä, muun muassa belizenkreoli-, garifuna-, mestitsi- ja mayaperheitä. \n\nYliopiston kielikeskus tuo Belmopaniin englanninopiskelijoita espanjankielisistä naapurimaista. Keskustan markkinat kokoavat myös lähiseutujen väkeä ostoksille ja kaupankäyntiin. Guanacasten puisto taas tarjoaa polkuja ja ympäristöopetusta aivan kaupungin tuntumassa: puistossa on myös opetuskeskus.',
  },
  Kingston: {
    intro: 'Kingston on Jamaikan pääkaupunki saaren kaakkoisrannikolla, Blue Mountains -vuorten edustalla. Sen luonnonsatamaa suojaa **Palisadoesin pitkä hiekkakannas**, joka yhdistää Port Royalin ja kansainvälisen lentoaseman muuhun saareen. Kaupunki perustettiin 1600-luvun lopulla Port Royalia tuhonneen maanjäristyksen jälkeen. Alkuun sen rannalla asui katastrofista selvinneitä ihmisiä telttaleirissä.\n\nJohn Goffe suunnitteli kaupungille **ruutukaavan**. Devon House oli liikemies George Stiebelin koti, ja Hope Gardensissa kokeiltiin viljelykasveja. Kaupungin musiikkielämässä levyjen soittaminen ja äänitteiden muokkaaminen ovat kasvaneet omaksi kulttuurikseen. Wolmer’sin koulu perustettiin kaupungissa 1700-luvulla.',
    teksti: 'Kingstonin synty liittyy Port Royalia tuhonneeseen maanjäristykseen 1600-luvun lopulla. Rannalle asettuneet selviytyjät aloittivat telttaleiristä. John Goffen piirtämä ruutukaava loi uuden kaupungin rungon.\n\nDevon House restauroitiin kotimuseoksi, ja sen pihapiirissä on kauppoja ja ruokapaikkoja. Hope Gardensin historiaan kuuluu viljelykasvien kokeilua ja puutarhatyötä.\n\nMusiikkikulttuurissa levyt, kaiuttimet ja studioiden miksauspöydät ovat olleet tärkeitä työvälineitä. Dubissa valmiita äänitteitä muokataan poistamalla laulua ja lisäämällä kaikua sekä viivettä. Uuden kaupungin tonttikauppaa rajoitettiin ostajien aiemman Port Royalin maanomistuksen perusteella.',
  },
  Ottawa: {
    intro: 'Ottawa on Kanadan pääkaupunki, mutta sen tarina alkaa paljon ennen hallintokortteleita. Ottawa-joen seutu oli algonkinien kaupan ja kulkemisen aluetta jo ennen eurooppalaista asutusta. Kaupungin nimen taustalla on kaupankäyntiä tarkoittava sana. Kanavan rakentajien Bytown kasvoi puutavarakaupungiksi ja sai myöhemmin nykyisen nimensä.\n\n**ByWard Marketin** ympärillä on tuottajien kojuja, pieniä liikkeitä ja ravintoloita. **Central Experimental Farm** puolestaan on toimiva maatila ja tutkimuskeskus kaupunkialueen keskellä. Sen arboretumissa tutkitaan puiden ja pensaiden sopeutumista paikallisiin oloihin. Ottawa sijaitsee Ontarion provinssissa, vastarannan Gatineau Quebecin puolella. Somerset Streetin Chinatown ja Preston Streetin Little Italy ovat kaupungin ruokakortteleita.',
    teksti: 'Ottawan vanha nimi Bytown viittasi Rideau-kanavan rakentamista johtaneeseen John Byhin. Kaupunki kasvoi kanavatyömaan ja puutavarakaupan ympärille. Algonkinien jokiseudun historia on paljon tätä vanhempi: vesireitit yhdistivät ihmisiä ja kauppapaikkoja ennen siirtomaa-asutusta.\n\nKirjasto valmistui myöhemmin 1800-luvulla. Sen erillinen sijainti ja suljetut rautaovet säästivät kokoelman parlamentin päärakennuksen tulipalossa seuraavalla vuosisadalla. Kirjaston työ on yhä tiedon kokoamista ja tutkimuspalvelua.\n\nToisenlaista tutkimusta tehdään Central Experimental Farmilla, joka perustettiin 1800-luvun lopulla. Tila jäi kaupungin kasvaessa sen sisään. Pellot, arboretum ja puistomainen ympäristö muistuttavat, että pääkaupungin tutkimustyöhön kuuluu myös kasvien kasvattamista, hyönteisten tutkimista ja viljelymenetelmien kokeilemista.',
  },
  'Port-au-Prince': {
    intro: 'Port-au-Prince on Haitin pääkaupunki Gonâvenlahden äärellä, Hispaniolan saaren länsiosassa. Kaupankäynti keskittyy lähelle vettä, kun taas asuinalueet nousevat sataman takaisille kukkuloille. Sen historiaa voi lukea myös rakennustavoista: **rautatukien torihallit ja puukoristeiset talot** kertovat hyvin erilaisista ratkaisuista.\n\nMarché en Fer eli Rautatori koostuu metallirunkoisista halleista, joita yhdistää tornillinen portti. Piparkakkutaloiksi kutsutuissa vanhoissa asuintaloissa koristeellisuus yhdistyy korkeisiin huoneisiin ja ilmanvaihtoon. Kaupungin joukkoliikenteeseen kuuluvat tap-tapit, pienet yhteiskäyttöiset kulkuneuvot. **Haitilainen keittiö** tuo pöytään esimerkiksi paistettuja ruokia ja tulista pikliz-lisuketta. Kaupunki on samalla kansallisten museoiden, kirjaston ja taidegallerioiden paikka.',
    teksti: 'Port-au-Princen satamalahtea suojaava sijainti kuuluu kaupungin pitkään kaupankäynnin historiaan. Kaupunki perustettiin Ranskan siirtomaavallan aikana 1700-luvulla, ja pääkaupungin asema jatkui Haitin itsenäistyttyä.\n\nRautatorin metalli tuotiin Ranskasta, kun taas piparkakkutalojen rakentamisessa yhdistettiin ulkomaisia vaikutteita haitilaiseen käsityöhön ja paikalliseen ilmastoon. Talojen suuret ovet, korkeat katot ja säleikkunat ovat osa tätä rakennusperinnettä.\n\nHaitin historiaa ja kulttuuria esittelee Musée du Panthéon National Haïtien, MUPANAH. Kaupungissa toimivat myös kansalliskirjasto ja taidegalleriat.',
  },
  'San José': {
    intro: 'San José on **Costa Rican pääkaupunki**, jonka keskusta kasvoi ylängön kappelin ympärille. Se sijaitsee Keskilaaksossa, jossa lähikaupunkien ja pääkaupungin arki liittyvät toisiinsa. Kaupungin nimi viittaa pyhään Joosefiin, ja sen kasvua vauhdittivat tupakka ja kahvi. Kahvikaupasta kertovat Barrio Amónin vanhat asuintalot ja kansallisteatterin koristeellinen sisustus.\n\nKeskustassa ruokaostokset johdattavat Mercado Centralin kapeille käytäville, joilla kahvi, kukat ja valmiit ateriat ovat saman katon alla. Paikallisen pienen ruokapaikan nimi on soda, vaikka siellä syödään muutakin kuin juodaan. **Museoiden rakennuksilla on omat historiansa**: kansallismuseo toimii entisissä sotilaskasarmeissa, ja esikolumbiaaninen kultamuseo sijaitsee aukion alla. Kultamuseon esineisiin kuuluu eläin- ja ihmishahmoja.',
    teksti: 'San Josén varhainen asutus järjestyi kappelin ympärille 1700-luvulla. Kaupungin nimi tuli seurakunnan suojeluspyhimyksestä, Joosefista. Tupakkatehtaan ja viljelmien tuoma pääoma vahvisti paikkakunnan taloutta, ja 1800-luvun alkupuolella San Josésta tuli Costa Rican pääkaupunki.\n\nKahvitalouden vaurastuminen jätti kaupunkiin näkyvän jäljen. Barrio Amónin asuinalue sai nimensä ranskalaiselta kahviyrittäjältä, ja kansallisteatteri valmistui saman vuosisadan lopulla.\n\nNykykeskustan museoissa kaupungin aikajana ulottuu sen omia katuja kauemmas. Kultamuseo esittelee esikolumbiaanista metallityötä, kun taas kansallismuseon entinen kasarmi kertoo myös rakennusten muuttuvista tehtävistä. Mercado Centralissa historia jatkuu käytännöllisemmin: halli on yhä ruokaostosten ja aterioiden paikka.',
  },
  'San Salvador': {
    intro: 'San Salvador on El Salvadorin pääkaupunki, jonka laidalta alkaa **tulivuoren rinne**. Sen länsiosat ulottuvat San Salvadorin tulivuorelle, kun taas idässä avautuu Ilopangon kalderajärvi. Laaksossa on aukioita ja hallintotaloja, mutta myös museoita ja yliopiston pääkampus. Espanjalaiskauden kaupunki vaihtoi sijaintia ennen asettumistaan nykyiseen historialliseen ytimeen.\n\n**Maanjäristykset ovat tuhonneet historiallista keskustaa**, jonka rakennuksia on korvattu uusilla. Nykyinen kansallispalatsi on 1900-luvun alusta, ja sen rakentamista rahoitettiin vientikahvista kerätyllä verolla. Pupusería on täytettyjen pupusien ruokapaikka. Elokuun Fiestas Agostinas tuo keskustan julkisiin tiloihin kaupungin omat juhlat.',
    teksti: 'San Salvadorin historia ulottuu espanjalaiskauden kaupunkia kauemmas: lähistöllä oli pipilien Cuzcatlán. Espanjalaisten perustama kaupunki siirrettiin ennen nykyistä sijaintiaan.\n\nKansallispalatsin nykyinen rakennus korvasi tulipalossa tuhoutuneen edeltäjän. Sen rakentamisessa käytettiin vientikahvista kerättyä veroa ja Euroopasta tuotuja aineksia. Värien mukaan nimetyt salit ovat palvelleet eri hallinnollisia tehtäviä, sininen sali parlamentin kokouspaikkana.\n\nKaupungin ympärillä luonto kertoo toisenlaisesta muutoksesta. Boquerónin kraatterijärvi katosi 1900-luvun alun purkauksessa, ja pohjalle syntyi Boqueroncito-kartio. Idän Ilopangossa taas tuliperäinen allas on järvi.',
  },
  'Santo Domingo': {
    intro: 'Santo Domingo on **Dominikaanisen tasavallan pääkaupunki** Hispaniolan etelärannikolla, Ozama-joen suulla. Vanha keskus sijaitsee joen länsirannalla, mutta eurooppalainen asutus alkoi vastakkaiselta rannalta. Hurrikaanin jälkeen kaupungin hallinnollinen ydin siirrettiin länteen 1500-luvun alussa. Sen ruutukaavasta ja keskusaukiosta tuli myöhempien Amerikan kaupunkien suunnittelun malleja.\n\nNykyinen **Zona Colonial** on Unescon maailmanperintökohde, jossa vanhat kivirakennukset kuuluvat yhä elävään kaupunkiin. Calle El Conden kävelykadulla on kauppoja ja ruokapaikkoja, ja Malecónin meribulevardi avaa näkymän Karibianmerelle. Ozaman linnoitus vartioi aikanaan satamaa, kun taas Alcázar-palatsi oli Kristoffer Kolumbuksen pojan Diego Colónin koti ja hallintopaikka. Katedraalin holvien, Casa de Teatron esitysten ja joen toisella puolella sijaitsevien luolajärvien välillä pääkaupungin historia saa monta erilaista muotoa.',
    teksti: 'Santo Domingon eurooppalainen kaupunki syntyi 1400-luvun lopulla. Ozama-joen itärannan asutuksen tuhosi hurrikaani, ja hallinnollinen keskus siirrettiin länsirannalle 1500-luvun alussa. Silloin laadittu katuverkko ja aukiojärjestely vaikuttivat myöhempien kaupunkien suunnitteluun Amerikan mantereella.\n\nVanhassa keskustassa ovat Ozaman linnoitus, katedraali ja Alcázar de Colón. Palatsin tarina on erilainen: Diego Colónin perheen koti rappeutui ja kunnostettiin museoksi vasta 1900-luvulla.\n\nHistoriallinen keskus on edelleen asuttu ja käytössä. El Conden kaupat, Malecónin kahvilat ja Casa de Teatron kulttuuritoiminta kuuluvat pääkaupungin arkeen. Joen itäpuolella Santo Domingo Esten luolajärvet puolestaan vievät kivirakennusten keskeltä kalkkikiven ja maanalaisen veden muodostamaan ympäristöön.',
  },
  Tegucigalpa: {
    intro: 'Tegucigalpa on Hondurasin pääkaupunki vuorten rajaamassa laaksossa. **Choluteca-joki** erottaa sen Comayagüelasta, jonka kanssa se muodostaa pääkaupungin Distrito Centralin. Katuverkko nousee rinteille, ja La Leonan puistosta näkyvät sekä keskusta että sitä ympäröivät kukkulat. Kaupungin espanjalaiskauden juuret ovat kaivostoiminnassa, mutta alueella oli jo lenca- ja tolupan-yhteisöjen asutusta.\n\nKeskustan San Miguelin katedraali ja Los Doloresin kirkko kuuluvat 1700-luvun rakennusperintöön. Kansallisen identiteetin museo taas toimii rakennuksessa, joka suunniteltiin alun perin sairaalaksi ja palveli myöhemmin valtion toimistoina. Seudun La Tigran kansallispuisto avaa näkymän pilvimetsään. Ruokaan voi tutustua baleadan kautta: vehnätortillan sisälle tulee papumuhennosta, kermaista lisuketta ja suolaista juustoa.',
    teksti: 'Tegucigalpan espanjalaiskauden kaivoskaupunki perustettiin alueelle, jolla oli jo lenca- ja tolupan-yhteisöjen asutusta. Kaupungin nimen etymologiasta on useita tulkintoja. Nykyisessä pääkaupungissa Choluteca-joki erottaa Tegucigalpan ja Comayagüelan, joilla on oma historiallinen taustansa.\n\nTegucigalpa ja Comayagua vuorottelivat 1800-luvulla pääkaupungin tehtävässä. Tegucigalpan pysyvä asema vahvistui vuonna 1880. Hallinnon historiaan liittyy myös kansallisen identiteetin museon eli MIN-museon rakennus: se suunniteltiin sairaalaksi ja palveli sitten ministeriöiden toimistoina ennen nykyistä museokäyttöä.\n\nKulttuurirakennusten rinnalla kaupungin seutuun kuuluu La Tigran pilvimetsä. Puiston suojelutavoitteisiin kuuluvat luonnon ja vedenvarojen säilyttäminen. Kansallisteatterin historiassa taas Don Quijoten vuosijuhla johti uuden näyttämön suunnitteluun, ja kaupunki sai tilan monille esittäville taiteille.',
  },
  Washington: {
    intro: 'Washington on Yhdysvaltain pääkaupunki Potomac-joen rannalla, omassa liittovaltiopiirissään. Sen keskusta hahmoteltiin paperille ennen kuin leveät kadut rakennettiin. Pierre Charles L’Enfantin suunnitelmassa **ruutukaavan päälle vedettiin viistokatuja**, jotka yhdistivät tärkeitä paikkoja. Niiden väliin jäi aukioita ja tilaa puistoille. Georgetownin vanha satamakaupunginosa oli olemassa jo ennen uutta pääkaupunkia.\n\nSmithsonianin punainen linnarakennus oli käytössä, mutta **Washington-monumentti oli vielä kesken**. Nykyään National Mallin ympärillä voi siirtyä museosta toiseen ja poiketa kasvitieteelliseen puutarhaan. Kaupungin arki löytyy myös näyttävien rakennusten ulkopuolelta: Georgetownin kanavarannasta, rivitalokaduilta ja paikallista half-smoke-makkaraa tarjoilevista ruokapaikoista.',
    teksti: 'Washingtonin katuverkko yhdistää kaksi erilaista ajatusta. Numero- ja kirjainkadut muodostavat ruudukon, mutta leveät, osavaltioiden mukaan nimetyt väylät leikkaavat sitä vinosti. Katuosoitteen lopun ilmansuuntalyhenne kertoo, mihin Kapitolista lähtevään kaupunginosaan osoite kuuluu.\n\nGeorgetownissa pääkaupungin suora viiva väistyy vanhan sataman historian tieltä. Old Stone House on 1700-luvun koti- ja työtilojen yhdistelmä. Chesapeake and Ohio Canal eli C&O-kanava puolestaan kertoo ajasta, jolloin tavara kulki veden päällä ja vetovoima saattoi kulkea viereisellä polulla.\n\nKaupungin museoita yhdistää tiedon kerääminen, mutta niiden aiheet eroavat toisistaan. Smithsonianin linnassa museon ja tutkimuksen tilat yhdistyivät, kasvitieteellisessä puutarhassa kokoelma elää ja kongressin kirjastossa kirjat saivat oman näyttävän rakennuksensa.',
  },
  Basseterre: {
    intro: 'Basseterre on Saint Kittsin ja Nevisin pääkaupunki, jossa sataman ja vanhan keskustan väli on lyhyt. Se sijaitsee Saint Kittsin lounaisrannikolla, lahdessa vihreiden kukkuloiden alapuolella. Ranskalainen nimi tarkoittaa **matalaa maata**. Mataluus näkyy myös kaupungin erikoisessa suhteessa veteen: joenuomat kulkevat keskustan läpi ja toimivat osin katuina.\n\nKaupunki kasvoi ranskalaisesta siirtokunnasta brittiläisen hallinnon ja kaupankäynnin keskukseksi. Satama yhdisti sokeriplantaasit ulkomaailmaan, ja myöhemmin sokeriruokoa tuotiin Basseterreen myös rautateitse. Nykyinen kansallismuseo sijaitsee entisessä valtiovarainhallinnon talossa, jonka läpi laivoista saapuvat ihmiset aikanaan astuivat kaupunkiin. Nykyään **Port Zante** tuo rantaan risteilymatkustajia, mutta keskustan pankit, virastot ja pienet kaupat palvelevat myös saaren omaa arkea.',
    teksti: 'Basseterren siirtomaahistoria alkoi saarella, jolla kalinagot jo elivät. Ranskalaiset ja englantilaiset uudisasukkaat jakoivat saaren keskenään, ja kaupunki kehittyi ranskalaisten hallitsemassa eteläosassa. Myöhemmin Britannia otti koko saaren hallintaansa. Kaupankäynti ja hallinto keskittyivät vähitellen Basseterreen.\n\nOrjuuden päättymisen jälkeen monet plantaasien työntekijät muuttivat kaupunkiin. Muutto saattoi olla uuden elämän valinta tai seuraus siitä, että työ ja asunto plantaasilla menetettiin.\n\nNykyinen museotalo ja sokerirata tulivat vasta myöhemmin. Radan käyttö muuttui sittemmin tavarankuljetuksesta matkailuun: samoihin rannikkomaisemiin katsotaan nyt kaksikerroksisista matkustajavaunuista.',
  },
  Bridgetown: {
    intro: 'Bridgetown on Barbadosin pääkaupunki saaren lounaisrannikolla, mutta sen historiaa kannattaa etsiä myös katujen mutkista. **Vanha keskusta ei noudata ruutukaavaa**, vaan sen kujat muistuttavat englantilaisia kauppakaupunkeja. Kauppa ja merenkulku kokosivat kaupungin Careenagen ympärille. Nykyisin keskustan pienveneiden vesialue ja suuri rahtisatama ovat eri paikkoja.\n\nNidhe Israelin synagogan vaiheisiin kuuluvat hurrikaanituho, käyttötarkoituksen muutos ja palauttaminen synagogaksi. Sen yhteydestä löytyi myös vanha **mikveh eli juutalainen rituaalikylpy**. Keskustan eteläpuolella Garrisonin historiallinen sotilasalue sisältää laukkaradan ja entiseen sotilasvankilaan sijoitetun museon. Parlamenttirakennusten nykyinen kellotorni puolestaan korvasi toisella puolella seisseen, vajoamaan alkaneen tornin.',
    teksti: 'Bridgetownin englantilainen siirtomaakaupunki kasvoi 1600-luvulla sataman ympärille. Sen kapeat, mutkittelevat kadut poikkeavat Karibian espanjalaisten ja hollantilaisten siirtomaakaupunkien ruutukaavoista. Keskustaa ja läheistä Garrisonin aluetta tarkastellaan yhteisenä historiallisena kokonaisuutena.\n\nKaupungin merenkulun historiaan kuuluu myös laivojen korjaaminen. Careenagen nimi liittyy aluksen kallistamiseen pohjan huoltoa varten, ja Screw Dockissa laiva nostettiin vedestä ruuvimekanismin avulla.\n\nNidhe Israelin synagogan pitkä historia puolestaan sisältää hurrikaanituhon, uudelleenrakentamisen, myynnin ja kunnostuksen. Garrisonin vanhalla paraatialueella puolestaan järjestetään hevoskilpailuja, ja entisen sotilasvankilan rakennuksessa toimii Barbados Museum.',
  },
  Castries: {
    intro: 'Castriesissa laivamatka voi päättyä suoraan pääkaupungin arkeen: Saint Lucian keskustan vieressä on **luonnonsatama**. Risteilyalusten matkustajat saapuvat Pointe Seraphinen kautta, ja kaupungista lähtee busseja eri puolille saarta. Sataman historiaan kuuluu myös hiilikauppa, sillä höyrylaivat tarvitsivat polttoainetta. Nykyinen kaupunkinimi muistuttaa ranskalaisesta laivastoministeristä, vaikka saaren kieli- ja kulttuurihistoria on paljon moninaisempi.\n\nJeremie Streetin torilla myydään kasviksia, mausteita ja käsitöitä sekä syödään paikallista ruokaa. Derek Walcottin aukion nimi tuo keskustaan Castriesissa syntyneen runoilijan, joka sai kirjallisuuden Nobelin. Samasta kaupungista lähti maailmalle myös taloustieteilijä **Arthur Lewis**. Morne Fortunen kukkulalla vanhat linnoitukset ja oppilaitokset kuuluvat puolestaan samaan maisemaan.',
    teksti: 'Castriesin aikaisempi nimi oli Carénage, ja nykyinen nimi viittaa ranskalaiseen markiisi de Castriesiin. Satamaan rakennettiin laitureita hiilikauppaa varten, ja höyrylaivaliikenne kuului kaupungin kehitykseen. Keskusta rakennettiin uudelleen useiden suurten tulipalojen jälkeen.\n\nKauppapaikkaan lisättiin myöhemmin Vendor’s Arcade, jonka ravintolat ja käsityömyynti jatkavat torin toimintaa.\n\nKaupungin kulttuurihistoriassa näkyvät Derek Walcott ja Arthur Lewis, Castriesissa syntyneet nobelistit. Walcottin mukaan nimetty aukio tunnettiin ennen muun muassa Place d’Armesina ja Columbus Squarena. Sen laidalla sijaitsevat katedraali ja kaupungin keskuskirjasto.',
  },
  Kingstown: {
    intro: 'Kingstown on Saint Vincentin ja Grenadiinien pääkaupunki, jossa satama ja kauppa kokoavat saarivaltion arkea. Kaupunki sijaitsee Saint Vincentin pääsaarella jyrkkien kukkuloiden ympäröimänä. Sen lempinimi on **City of Arches**, kaarien kaupunki. Britannian siirtomaa-ajan Fort Charlotte kohoaa keskustan länsipuolella, mutta sen tykit suunnattiin sisämaahan.\n\nKaupungin kasvitieteellinen puutarha perustettiin jo 1700-luvulla hyöty- ja lääkekasvien kasvatuspaikaksi. Sinne saapuneet **leipäpuut** liittyvät William Blighin merimatkoihin, joista Bountyn kapina on tunnetuin. Kasvit päätyivät kuitenkin Kingstowniin myöhemmällä Providence-aluksen matkalla. Puutarhassa hoidetaan myös Saint Vincentin kotoperäisiä papukaijoja.',
    teksti: 'Kingstown syntyi ranskalaisten siirtolaisten perustamana kaupunkina 1700-luvulla. Nykyisin se on Saint Vincentin ja Grenadiinien pääkaupunki sekä satama- ja kauppakeskus. Keskustaa ympäröivien kukkuloiden vuoksi kaupunki ja sen lähiseutu eivät ole yhtenäistä tasankoa.\n\nKasvitieteellisen puutarhan taustalla olivat hyötykasvien, lääkkeiden ja uusien viljelykasvien tarpeet. Kasveja tuotiin muilta Karibian saarilta ja kauempaa maailmasta. William Bligh sai leipäpuut perille vasta Bountyn matkan jälkeen uudella aluksella.\n\nSe rakennettiin kukkulalle, mutta puolustuksen suunnittelijat varautuivat maitse tulevaan hyökkäykseen.',
  },
  Nassau: {
    intro: 'Nassaussa sama satama on palvellut merirosvoja, saarron läpi kulkeneita kauppalaivoja ja nykyisiä risteilymatkustajia. Atlantin saarivaltion Bahaman pääkaupunki sijaitsee **New Providencen saarella**. Bay Streetin kaupankäynti kulkee rantaa pitkin, kun taas kukkulan takana ovat Grants Townin ja Bain Townin asuinalueet. Pääkaupunki on maan hallinnon, koulutuksen ja kaupan keskus.\n\nKalkkikiveen louhitut **Kuningattaren portaat** kertovat orjuutettujen ihmisten työstä. Kukkuloiden linnakkeet kuuluivat sataman puolustukseen. Junkanoo-kulkueessa käsin tehdyt paperipuvut, musiikki ja tanssi täyttävät kadut. New Providence on matala saari, jota halkovat loivat harjanteet. Sen keskiosissa on matalia järviä, joilla on vuorovesiyhteys mereen.',
    teksti: 'Nassaun matalasta satamasta tuli siirtomaakauden 1700-luvun alussa merirosvojen tukikohta, johon suurilla sotalaivoilla oli vaikea päästä.\n\nYhdysvaltain itsenäisyyssodan jälkeinen muutto kasvatti kaupunkia. Britannialle uskollisten siirtolaisten mukana saapui myös heidän orjuuttamiaan ihmisiä. Satamarannan lisäksi kaupungin historiaan kuuluvat afrikkalaistaustaisen väestön asuinalueet kukkulan eteläpuolella.\n\nJunkanoo on musiikin, tanssin ja käsityön yhteinen katuesitys, jonka juuret liittyvät orjuutettujen afrikkalaisten ja heidän jälkeläistensä juhlintaan. Pukuja rakennetaan paperista ja kartongista.',
  },
  'Port of Spain': {
    intro: 'Port of Spain on Trinidadin ja Tobagon pääkaupunki Trinidadin luoteisrannikolla, Parianlahden äärellä. Sen nimi säilyttää muiston espanjalaisesta satamasta, vaikka Trinidad siirtyi myöhemmin Britannian hallintaan. **Kaupungin rannikko on rakennettu osittain täyttömaalle.** Nykyisen keskustan paikalla oli myös mangrovea kasvavia vuorovesilietteitä. St. Ann\'s Riverin uomaakin siirrettiin, kun kaupunki tarvitsi tilaa kasvaa.\n\nSuoran katuverkon pohjoispuolella avautuu Queen\'s Park Savannah, entinen viljelymaa ja laidun. Sen vieressä Royal Botanic Gardens kokoaa yhteen saaren omia ja maailmalta tuotuja puita. Belmontin mutkittelevat kadut taas kertovat keskustasta poikkeavasta kasvusta. Port of Spain on satama, hallinnon ja kaupan keskus sekä karnevaalin näyttämö, ja keskustan ympärille on kasvanut laaja taajama.',
    teksti: 'Kaupungin historia alkaa ennen espanjalaista nimeä: rannikon tuntumassa oli alkuperäisväestön kalastajakylä Cumucurapo. Espanjalainen siirtomaahallinto siirsi keskuksensa sisämaasta Port of Spainiin 1700-luvulla. Rannikon satamasta kasvoi saaren hallinnon paikka.\n\nSavannah ja kasvitieteellinen puutarha olivat jo olemassa. Kaupunki jatkoi kasvuaan: täyttömaat, laajenevat asuinalueet ja myöhemmät rakennukset muuttivat sen rajoja.\n\nKaupungin tiivis keskusta on osa laajempaa taajamaa, joka jatkuu itään Ariman suuntaan. Linja-autot ja maxi-taksit yhdistävät sitä ympäristöönsä. Taajama sijaitsee Trinidadin pohjoisosassa.',
  },
  Roseau: {
    intro: 'Roseau on Dominican pääkaupunki, jonka keskustaa rajaavat Karibianmeri, Roseau-joki ja Morne Bruce -kukkula. Se kasvoi kalinagojen **Sairi-kylän** paikalle. Ranskalainen kaupunginnimi viittaa joen rannalla kasvaneeseen ruovikkoon. Vanhan keskustan kadut lähtevät entisen torin ympäriltä, ja ranskalais-brittiläinen historia näkyy sekä rakennuksissa että katuverkossa. Risteilyaluksesta voi astua suoraan kaupunkielämään, sillä laituri on vanhan posti- ja torirakennuksen edustalla.\n\nNykyinen ruokatori sijaitsee jokirannassa ja täyttyy hedelmistä, vihanneksista ja yrteistä. Keskustan laidalla **kasvitieteellinen puutarha** muistuttaa ajasta, jolloin hyötykasveja kokeiltiin ja taimia tuotettiin viljelijöille. Roseaussa kävi koulua kirjailija Jean Rhys.',
    teksti: 'Roseaun asutushistoria alkaa jo ennen eurooppalaista kaupunkia. Kalinagojen Sairi sijaitsi meren ja joen äärellä. Ranskalainen asutus kehittyi toripaikan ympärille, ja myöhempi brittiläinen hallinto lisäsi linnoituksia, hallintorakennuksia sekä säännöllisempää katuverkkoa. Vanhan torin ympäriltä lähtevät kadut eivät silti noudata kaikkialla suoraa ruutukaavaa.\n\nKasvitieteellinen puutarha perustettiin vasta 1800-luvun lopulla. Fort Youngin alueella toimi myöhemmin myös poliisin päämaja.\n\nKaupungin museo toimii vanhassa posti- ja torirakennuksessa. Sen esineistö yhdistää alkuperäiskansojen historiaa, siirtomaa-aikaa ja saaren luonnonhistoriaa.',
  },
  'Saint John\'s': {
    intro: 'Saint John’s kokoaa Antiguan ja Barbudan hallintoa, kauppaa ja koulutusta saman satamakaupungin ympärille. Rantakortteleista kaupunki nousee loivasti kohti **katedraalin kukkulaa**, jonka alla historian kerrokset vaihtuvat korttelista toiseen. Entiseen oikeustaloon sijoitettu museo kertoo alkuperäiskansojen elämästä, siirtomaakaudesta ja kriketistä. Keskustan lounaisreunan ruokatorilla myydään kasviksia, kalaa ja lihaa.\n\nKatedraalissa on kivikuoren sisällä puinen tukirakenne, jota on kuvattu **rakennukseksi rakennuksen sisällä**. Satamansuun Fort James taas käytti tykkejä 1800-luvulla myös tervehdyksiin ja päivän vaihtumisesta kertoviin merkkeihin. Vanhan kaupungin historiaan kuuluvat tulipalot sekä määräykset julkisten rakennusten seinistä ja katoista. Kaupankäynnin lisäksi on pitänyt järjestää katujen kunnossapito ja yövahti.',
    teksti: 'Saint John’s alkoi kasvaa 1600-luvulla satamalahden ympärille. Ennen kaupungin suunnittelua paikalla oli pieni taloryhmä, jonka aluetta kutsuttiin nimellä the Cove. Loiva rinne sataman itäpuolella helpotti teiden ja kulkuväylien rakentamista, ja kaupungista tuli saaren kauppapaikka.\n\n1700-luvun tulipalot johtivat rakennussääntöjen tiukentamiseen. Useimpien julkisten rakennusten piti saada tiiliseinät sekä tiili- tai liuskekivikatto. Kaupungin järjestäminen näkyi myös yövahtina ja katuympäristön ongelmien vuoksi kerättyinä veroina.\n\nNykyinen museo toimii oikeustalossa, mutta sen kokoelmat ulottuvat rakennusta vanhempaan alkuperäiskansojen historiaan ja myös paljon uudempaan urheiluun. Sataman puolustuslinnake Fort James avaa toisen suunnan kaupungin menneisyyteen.',
  },
  'St. George\'s': {
    intro: 'St. George’s on Grenadan pääkaupunki, jossa luonnonsatama ja jyrkät kukkulat määräävät keskustan muodon. **Carenagen hevosenkengän muotoinen lahti** jää vanhan tulivuoren kraatteriin kuuluneiden rinteiden keskelle. Ranskalaiset rakensivat sataman ympärille siirtomaakaupungin, jonka paikkaa muutettiin alkuperäisen asutuksen kärsittyä tulvimisesta ja malariasta. Brittihallinnon aikana kaupunki sai nimensä pyhältä Yrjöltä.\n\nSataman yläpuolella oleva **Fort George** nimettiin kuitenkin kuningas Yrjö III:n mukaan. Linnake oli osa kaupunkia ympäröiville kukkuloille rakennettua puolustusverkostoa. Sendallin tunneli yhdistää kaupungin osia kulkemalla Fort Georgen kukkulan läpi. Kansallismuseon rakennukset puolestaan ovat palvelleet hotellien ja varaston käytössä ennen museotoimintaa.',
    teksti: 'St. George’sin sataman ensimmäinen ranskalainen siirtomaa-asutus tunnettiin Saint Louisina ja myöhemmin Port Louisina. Tulvimisesta ja malariasta kärsineen paikan sijaan rakennettiin Ville de Fort Royal. Kaupungin nimi vaihtui brittihallinnon aikana, mutta Fort George ja St. George’s nimettiin eri Yrjöjen mukaan.\n\nKaupunkia ja luonnonsatamaa ympäröivät kukkulat saivat 1700-luvulla linnoitusten verkoston. Fort Georgen asema oli hyvä sataman hallitsemiseen, mutta sen yläpuolelle jäi korkeampaa maata.\n\nKansallismuseo muodostuu eri rakennuksista, joiden historiaan kuuluu hotellitoimintaa ja varastokäyttöä. Varsinainen vanha vankila sijaitsi museorakennusten takana. Kirkkojen ja muiden talojen myöhemmät korjaukset puolestaan kertovat kaupunkia vaurioittaneista hurrikaaneista. Historiallinen kaupunki sisältää myös jälleen rakennettuja osia.',
  },
  'Brasília': {
    intro: 'Brasília on Brasilian pääkaupunki **sisämaan ylängöllä**, Brasilian keskilännessä. Nykyinen kaupunki vihittiin pääkaupungiksi vuonna 1960. Sen suunnittelussa hallinto, asuminen ja liikkuminen saivat omat suuret kokonaisuutensa.\n\nArjessa kaava tuntuu myös osoitteissa, joissa numeroidut korttelit ja eri toimintojen sektorit korvaavat monia tavallisia kadunnimiä. Asumisen superquadra-kortteleihin suunniteltiin asuntojen rinnalle lähikauppaa, kouluja ja vapaa-ajan paikkoja. Vanhan suunnitellun ytimen ympärille on kasvanut paljon laajempi kaupunkiseutu, joten Brasília tarkoittaa yhteydestä riippuen myös koko liittovaltiopiiriä. Keinotekoinen **Paranoá-järvi** kuuluu kaupungin maisemaan ja vapaa-aikaan. Ympäröivä cerrado on savanniluontoa, jossa ruohostot, pensaat, puut ja vesistöjen metsät muodostavat vaihtelevan kokonaisuuden.',
    teksti: 'Brasílian suunniteltu ydin on Plano Piloto. Sen suuret akselit järjestävät hallinnon ja asumisen alueita, ja toimintoja on jaettu omiin sektoreihinsa. Suunnitelman rinnalle kasvoi myös muita asuinalueita, joten nykyisen liittovaltiopiirin elämä ulottuu kauas alkuperäisen ytimen ulkopuolelle.\n\nParanoá on patoamalla syntynyt järvi. Sen alle jäi Vila Amauryn asutus, jossa oli elänyt uuden pääkaupungin rakentajia. Nykyisin järvellä harrastetaan vesiurheilua, ja vedenalainen Vila Amaury on sukelluskohde.\n\nBrasílian kansallispuisto säilyttää cerradon eri elinympäristöjä lähellä kaupunkia. Avointen alueiden lisäksi puistossa on purojen ja jokien varsia seuraavia metsiä. Lähdevesien yhteyteen syntyneet uima-altaat ovat tunnettu vierailukohde.',
  },
  Georgetown: {
    intro: 'Georgetown sijaitsee Guyanan Atlantin-rannikolla Demerara-joen suulla. Se on pääkaupunki sekä maan hallinnon, kaupan ja rahoituspalvelujen keskus. Kaupunki kasvoi 1700-luvun lopulla paikassa, jossa eurooppalainen siirtomaahallinto vaihtui useasti. Nimet Longchamps ja Stabroek edelsivät brittiläistä Georgetownia. Stabroek elää edelleen kaupunginosan ja vilkkaan torin nimessä.\n\n**Meri ja sadevesi kulkevat eri reittejä.** Merivalli suojaa matalaa rannikkoa, ja kanavat sulkuineen auttavat ylimääräistä vettä pois kaupungista. Katujen suoran ruudukon rinnalla näkyy siksi vesiverkko. Puinen St. George\'s Cathedral ja Stabroekin rautainen kauppahalli edustavat kaupungin myöhempiä rakennuskerroksia. Kasvitieteellisessä puutarhassa puolestaan kasvaa trooppisia kasveja ja elää manaatteja, joille on oma lampensa.',
    teksti: 'Georgetownin varhaisessa historiassa ranskalainen Longchamps vaihtui hollantilaiseen Stabroekiin. Britannian aikana nimeksi tuli Georgetown kuningas Yrjö III:n mukaan.\n\nGeorgetownin majakka ja St. Andrew\'s Kirk kuuluvat kaupungin 1800-luvun alkupuolen rakennusperintöön. Nykyinen Stabroek Marketin halli sekä puinen St. George\'s Cathedral tulivat kaupunkiin myöhemmin, ja ne kuuluvat 1800-luvun lopun rakentamiseen.\n\nDemeraran suun tasainen rannikko tarvitsee merivallia sekä kanavien ja sulkujen vedenpoistoa. Kaupungin puutarhat taas antavat sille toisenlaisen vesiaiheen: kasvitieteellisen puutarhan manaattilampi on osa julkista viheraluetta.',
  },
  'La Paz': {
    intro: 'La Pazissa kaupunki alkaa ylätasangon reunalta ja jatkuu alas Choqueyapu-joen laaksoon. **Bolivian hallinnon paikka** levittäytyy rinteille, kun naapurikaupunki El Alto sijaitsee niiden yläpuolella Altiplanolla. Lumihuippuinen Illimani kohoaa kaupunkimaiseman takana. Sucre on silti maan perustuslain mukainen pääkaupunki, joten maan hallinto ja perustuslaillinen pääkaupunki ovat eri kaupungeissa. Espanjalainen La Paz perustettiin 1500-luvulla alueelle, joka tunnettiin aimarankielisellä nimellä Chuquiago.\n\nVanhassa keskustassa siirtomaa-ajan kirkot ja Calle Jaénin talot ovat säilyneet osana kasvavaa kaupunkia. Nykyään **Mi Teleféricon köysiradat** kuljettavat asukkaita kaupunginosasta toiseen ja El Altoon. Alasita-juhlassa tulevaisuuden toiveille taas annetaan pienoismallin koko: talo tai auto voidaan ostaa ensin käteen mahtuvana.',
    teksti: 'La Pazin nimi merkitsee espanjaksi rauhaa, mutta kaupunki ei syntynyt tyhjälle paikalle. Espanjalainen perustaminen tapahtui 1500-luvulla ensin Lajassa, mistä kaupunki siirrettiin Chuquiagon laaksoon. Aimara on edelleen näkyvä osa kaupunkia: esimerkiksi köysiradan asemilla on espanjan- ja aimarankieliset nimet.\n\nChoqueyapu-joki on muovannut laakson, jonka rinteille La Paz on kasvanut. Joki kulkee nykyään suurelta osin rakennettujen alueiden alla. Sen suuntaa seurailevan pääväylän keskustajakso tunnetaan Pradona. Ylhäällä El Altossa sijaitsee myös lentoasema, joten lentomatka La Paziin alkaa naapurikaupungista.\n\nSan Franciscon kirkko ja Calle Jaénin vanhat talot tuovat keskustaan siirtomaa-ajan kerroksen. Plaza Murillon ympärillä ovat katedraali ja hallintorakennuksia.',
  },
  Paramaribo: {
    intro: 'Paramaribo on Surinamen pääkaupunki **Surinam-joen rannalla**, Atlantin tuntumassa. Sen historiallisessa keskustassa eurooppalaiset rakennusmuodot on toteutettu paikallisesta puusta ja paikallisin käsityötaidoin. Kadutkin seuraavat osittain simpukankuorista muodostuneita maaharjanteita, jotka tarjosivat ympäröivää suota kuivemman rakennuspaikan. Historiallinen keskusta kuuluu Unescon maailmanperintöön kokonaisena kaupunkiympäristönä.\n\nParamaribon siirtomaa-ajan kaupunki kasvoi vanhan alkuperäiskansan kylän paikalle. Kaupungin taustaan kuuluu myös plantaasitalous ja orjuus, joiden jälkeen monet entiset orjuutetut muuttivat pääkaupunkiin. Nykyinen Paramaribo kokoaa Surinamen kauppaa, palveluja ja opiskelua. Sen monien yhteisöjen historia näkyy rakennusten lisäksi ruokapöydässä: **roti, pom ja jaavalaiset ruuat** kuuluvat samaan kaupunkiin.',
    teksti: 'Paramaribon historiallinen ydin on Surinam-joen vasemmalla rannalla. Sen puutalot yhdistävät eurooppalaisia rakennusmuotoja paikallisiin materiaaleihin ja käsityötaitoihin. Säilynyt katuverkko kuuluu kaupungin maailmanperintöarvoihin siinä missä rakennuksetkin.\n\nLinnoituksen ympärille kasvanut kaupunki oli Alankomaiden siirtomaan hallintokeskus. Linnoituksessa toimii Surinaams Museum eli Surinamen museo. Nykyinen puukatedraali rakennettiin 1800-luvun lopulla.\n\nKaupunki on Surinamen kaupan ja rahoituksen keskus. Joella kulkee pieniä matkustajalauttoja, ja keskustan ulkopuolella Zorg en Hoopin lentokenttä palvelee paikallisia lentoja.',
  },
  'Santiago de Chile': {
    intro: 'Santiago de Chile on Chilen pääkaupunki Andien ja rannikkovuoriston välisessä laaksossa. Mapocho-joki kulkee kaupungin halki, ja keskellä asutusta kohoavat Santa Lucían ja San Cristóbalin kukkulat. **Plaza de Armas** on espanjalaisen ruutukaavakaupungin historiallinen ydin, mutta laaksossa asuttiin jo ennen espanjalaisten tuloa. Kaupungin nykyinen laajuus ei myöskään mahdu Santiago-nimisen keskustakunnan rajoihin.\n\nSantiagossa monet tutut paikat ovat vaihtaneet tehtäväänsä: La Moneda rakennettiin rahapajaksi ja Mapochon rautatieasema toimii kulttuuritilana. **Quinta Normalin puisto** puolestaan syntyi maatalouden ja kasvien tutkimuksen ympärille.',
    teksti: 'Santiagon espanjalainen kaupunki perustettiin 1500-luvulla Mapochon laaksoon. Keskustan ruutukaavassa Plaza de Armasille sijoitettiin hallinnon ja kirkon rakennuksia. Nykyisen aukion ympärillä ovat katedraali, posti, entinen kuninkaallinen oikeusistuin ja kaupunginhallinto. Koko laakson asutushistoria on tätä kaupunkisuunnitelmaa vanhempi.\n\nSanta Lucía tunnettiin jo ennen espanjalaisten tuloa Hueléninä. Kukkulasta on otettu rakennuskiveä, siellä on ollut hautausmaa ja 1800-luvulla myös tähtitieteellinen havaintopaikka. Vuosisadan loppupuolen puistotyöt toivat paikalle puutarhoja ja kävelyreittejä.\n\nRakennusten tehtävät ovat vaihtuneet muuallakin. La Monedassa lyötiin kolikoita, ja Mapochon asemahalliin saapuivat junat. Quinta Normalissa tutkittiin viljelykasveja ennen kuin puisto sai nykyisiä museoitaan. Museo Chileno de Arte Precolombino taas esittelee Amerikan vanhoja kulttuureja entisessä tullitalossa.',
  },
  Apia: {
    intro: 'Apia on Samoan pääkaupunki Upolun pohjoisrannikolla, missä Vaisiganojoki laskee luonnonsatamaan. Kaupunki levittäytyy kapealle rannikkotasangolle, ja sisämaan puolella nousee Mount Vaea. Pieni alkuperäinen Apia-kylä säilyy yhä laajemman kaupungin sisällä. Satama, torit ja liikeyhteydet tekevät Apiasta koko saarivaltion keskuksen.\n\nKirjailija **Robert Louis Stevenson** asettui Vailimaan, kaupungin eteläpuolelle. Hänen entinen kotinsa on nyt museo ja hautansa Mount Vaealla. Samoalainen nimi Tusitala tarkoittaa tarinankertojaa. **Fugalein ruokatorilla** myydään hedelmiä, vihanneksia ja samoalaisia ruokia. Rannan lähellä toimii erillinen kalatori.',
    teksti: 'Apia kasvoi 1800-luvulla pienestä kylästä sataman ympärille levittäytyväksi kaupungiksi. Vanha Apia-kylä säilyy nykyisen kaupunkialueen sisällä Vaisigano- ja Mulivaijokien suiden välissä. Laajempi kaupunki on kasvanut monien kylien ympärille.\n\nMaaliskuussa 1889 trooppinen myrsky upotti tai vaurioitti satamassa olleita aluksia. Brittiläinen Calliope onnistui pääsemään ulos merelle. Myrskyn koettelemiksi joutuivat myös saksalaiset ja yhdysvaltalaiset alukset.\n\nVailimassa asuneen Robert Louis Stevensonin koti toimii museona. Entisen tilan alueella on myös kasvitieteellinen puutarha. Mount Vaealle johtava polku yhdistää kirjailijakodin hänen hautapaikkaansa vuoren rinteellä.',
  },
  Canberra: {
    intro: 'Canberra on Australian pääkaupunki, jonka suunnitelmassa mäet toimivat katujen ja näkymälinjojen kiintopisteinä. **Mount Ainslie ja Black Mountain** ohjaavat kaupungin akselien suuntaa. Kansainvälisessä suunnittelukilpailussa hahmoteltiin hallintokeskus, jonka kadut ja järvi sidottiin ympäröiviin mäkiin.\n\nSeutu oli Ngunnawal- ja Ngambri-kansojen kotiseutua, jonne oli tullut eurooppalaisten maatiloja, kirkko ja koulu. Walter Burley Griffin ja **Marion Mahony Griffin** suunnittelivat uuden kaupungin 1900-luvun alussa. Molonglojoen laaksoon syntyi myöhemmin tekojärvi, jonka ympärillä ovat monet kansalliset laitokset.',
    teksti: 'Canberran historia alkaa paljon ennen sen asemaa pääkaupunkina. Seudun alkuperäiskansojen yhteys maahan jatkuu nykyäänkin. Eurooppalainen asutus toi alueelle maatiloja 1800-luvulla; Blundells Cottage ja St Johnin kirkko ovat tämän pääkaupunkia edeltäneen vaiheen rakennuksia.\n\nUuden kaupungin kansainvälisen suunnittelukilpailun voitti Walter Burley Griffinin ehdotus. Marion Mahony Griffin osallistui työhön ja teki suunnitelman tunnetut esityspiirrokset. Geometrinen katuverkko ei ohittanut maastoa: sen akselit sidottiin mäkiin, ja jokilaaksoon suunniteltiin järvi.\n\nPiirros ei muuttunut valmiiksi kaupungiksi yhdellä kertaa. Lake Burley Griffin toteutui vasta paljon myöhemmin, ja sen rannoille nousi kirjastoja, museoita ja muita kansallisia laitoksia. Samalla kaupungin mäet säilyivät luonnonalueina.',
  },
  Funafuti: {
    intro: '**Funafuti** on Tuvalun pääkaupunki, joka käsittää kokonaisen koralliatollin. Sen pääsaarella Fongafalella sijaitsee Vaiaku, maan hallinnon paikka. Fongafalen ulkopuolella on muita atollin saaria, ja niiden väliin jää **Te Namo -laguuni**.\n\nPääkaupungin arjessa kohtaavat perinteinen kokoushalli, kansalliskirjasto ja postimerkkejä julkaiseva filateelinen toimisto. Lentokentän kiitorata palvelee lentojen välissä myös yhteistä liikuntaa. Funafutin historiaan kuuluu lisäksi 1800-luvun lopun porauskoe, jossa testattiin Darwinin selitystä koralliatollien synnylle. Onkaloinen kivi ja irtohiekka vaikeuttivat tutkimusta, eikä pora tavoittanut atollin alla olevaa vulkaanista kallioperää. Nykyinen merensuojelualue atollin länsipuolella näyttää puolestaan, kuinka riutta, laguuni ja pesimäsaaret kuuluvat samaan elävään ympäristöön.',
    teksti: 'Funafutin paikallisen kokoushallin nimi Tausoalima tarkoittaa ystävyyden kättä. Kansalliskirjasto toimii myös Tuvalun arkistona. Kirjaston arkistoja on mikrofilmattu ja kopioitu digitaalisesti.\n\nRoyal Societyn retkikunnat tulivat tutkimaan korallikerrostumia 1800-luvun lopulla. Te Vili O Tavita eli Davidin pora muistuttaa Sydneyn yliopiston geologi Edgeworth Davidista; itse kokeen vaiheisiin kuului myös paikallisen asukkaan säilyttämän varaosan hyödyntäminen.\n\nAtollin koko maisema ei mahdu Fongafalen rantatielle. Te Namon toisella puolella suojelualueeseen kuuluu riuttoja ja saaria, joilla pesivät merikilpikonnat ja merilinnut.',
  },
  Majuro: {
    intro: 'Majuro on Marshallinsaarten pääkaupunki. Ydin tunnetaan nimellä **Delap–Uliga–Djarrit**, lyhyesti DUD. Sen satamayhteydet palvelevat kaukana merellä työskenteleviä kalastusaluksia, joiden tonnikalaa siirretään Majurossa kuljetusaluksiin. Myös lentoliikenne kuuluu saariston yhteyksiin, ja kiitotielle satavaa vettä kerätään vesihuollon käyttöön.\n\nAlele-museossa säilytetään saariston esineitä ja tietoa, mutta merenkulun osaaminen elää myös Waan Aelõñ in Majel (WAM) -nuoriso-ohjelman venekäsityössä. **Tikkukartat** auttoivat opettelemaan aaltojen käyttäytymistä ennen matkaa; itse merellä suunnistaja luotti aisteihinsa ja muistiinsa. Nykyinen pääkaupunkiasema on paljon myöhempi kerros Majuron historiassa.',
    teksti: 'Majuron kaupungin ja atollin ero on tärkeä myös arjessa. Delap–Uliga–Djarrit muodostaa kaupunkiytimen, kun taas Laura sijaitsee atollin länsiosassa. Atollisaarten kapeus näkyy siinä, miten laguuni, valtameri, tie ja asutus mahtuvat lähekkäin.\n\nLaguuni on kaupallinen satama, jossa tonnikalasaaliit vaihtavat alusta. Kaupungin vesihuollossa puolestaan hyödynnetään sekä kiitotien sadevesiä että pohjavesikaivoja.\n\nAlele yhdistää museon, kirjaston ja kansallisen arkiston. Sen nimi viittaa koriin tai laukkuun, jossa perhe on säilyttänyt arvoesineitään. WAM-ohjelman ohjaajat ja oppilaat tekevät puolestaan puutyötuotteita käsin ja ohjaavat myynnin tuoton takaisin ohjelmaan.',
  },
  Ngerulmud: {
    intro: '**Ngerulmud on Palaun hallintokeskus Babeldaobilla**, Melekeokin osavaltiossa. Melekeok on myös lähistön kylän nimi. Pääkaupunki rakennettiin 2000-luvun alussa, ja hallinto siirtyi sinne Kororista. Kapitolialueella lainsäädännön, oikeuslaitoksen ja toimeenpanovallan rakennukset ympäröivät yhteistä aukiota.\n\nKoror on edelleen kauppojen, ravintoloiden ja majoituksen keskus, josta Babeldaobille pääsee siltaa pitkin. Ngerulmudin nimi viittaa hapatettuun kalaan ja kukkulan vanhaan kulttuuriseen merkitykseen. Läheisen **Ngardok-järven suojelualueeseen** kuuluvat järven lisäksi valuma-alue, purot ja makean veden suometsä. Melekeokin kylien ympärillä kasvatetaan taroa, leipäpuuta, banaania ja kookosta.',
    teksti: 'Ngerulmud, Melekeok ja Koror muodostavat eri osoitteita. Ngerulmud on kansallinen hallintokeskus, Melekeok sekä osavaltion että kylän nimi, ja Koror Palaun palvelukeskittymä. Koror ja Babeldaob ovat yhteydessä toisiinsa sillan kautta.\n\nNgerulmud rakennettiin 2000-luvun alussa, ja hallintokompleksissa on erilliset lainsäädännön, oikeuslaitoksen ja toimeenpanovallan rakennukset yhteisen aukion ympärillä. Nykyinen rakennusryhmä on uusi, mutta paikan nimi kertoo sitä vanhemmasta kulttuurisesta merkityksestä.\n\nNgardokin suojelu liittyy Melekeokin vesihuoltoon ja veden laatuun. Järvi ja sitä ympäröivä metsä kuuluvat samaan valuma-alueeseen. Suojelualueella elää Palaun omia lintulajeja ja myös suistokrokotiileja (Crocodylus porosus). Babeldaobilla ovat myös kylien viljelmät sekä suojeltu järvi- ja metsäympäristö.',
  },
  'Nukuʻalofa': {
    intro: '**Nukuʻalofa** on Tongan pääkaupunki Tongatapun pohjoisrannalla, ja sen satamasta lähdetään valtakunnan muille saarille. Rantaa seuraavan Vuna Roadin tuntumassa kohtaavat meriliikenne ja kaupungin bussit. Kuninkaallinen palatsi kuuluu tähän samaan rantakaupunkiin. Keskustan Talamahun markkinoilla ostetaan sekä tuoretuotteita että paikallisten tekijöiden käsitöitä.\n\nKaupunginosien nimet kertovat kasvun vaiheista: Kolomotuʻa on vanha asutus ja **Kolofoʻou uusi asutus**. Idässä sijaitseva Maʻufanga oli aikaisemmin oma kylänsä. Nukuʻalofan kehitys kuninkaan hallinnon ja kirkkojen ympärille kuuluu 1800-luvun historiaan. Nykyinen kaupunki ei kuitenkaan avaudu pelkillä hallintorakennuksilla: kuorikankaat, vyötärömatot ja markkinakauppa näyttävät, miten käsityö liittyy myös juhliin ja arkeen.',
    teksti: 'Nukuʻalofan vanhat nimet ja kartat kertovat meren merkityksestä. James Cook piirsi lahden 1700-luvulla ja mainitsi lähistön Pangaimotun saaren. Myöhemmissä matkateksteissä kaupungin nimi sai erilaisia kirjoitusasuja ennen tongan oikeinkirjoituksen vakiintumista.\n\nKolomotuʻan vanhan asutuksen rinnalle kehittynyt Kolofoʻou sisältää palatsin ja hallintopaikkoja. Nykyiset kaupunginosat säilyttävät näiden eri taustojen nimet.\n\nKäsityöt tuovat kaupunkikuvaan toisen kerroksen. Talamahussa ja Langafonuan käsityökeskuksessa voi tutustua punontaan ja kuorikankaaseen. Ngatun kuvioihin kuuluu jopa palatsilta kuninkaalliselle hautausmaalle johtavan tien aihe: kaupungin paikka voi näkyä sekä katuverkossa että lahjaksi annettavassa käsityössä.',
  },
  Palikir: {
    intro: '**Palikir on Mikronesian liittovaltion pääkaupunki Pohnpein saaren metsäisessä luoteisosassa**, Sokehsin kunnassa. Koillisempana rannikolla on Kolonia, Pohnpein osavaltion pääkaupunki ja saaren kaupan keskus. Liittovaltion hallinto siirtyi Koloniasta Palikiriin vuonna 1989. Palikirin hallintorakennuksiin kuuluvat kongressi ja korkein oikeus.\n\nHallinnon lisäksi Palikirissa toimii College of Micronesia-FSM -korkeakoulun kansallinen kampus. Lyhenne FSM tarkoittaa Mikronesian liittovaltiota. Oppilaitoksen muut kampukset sijaitsevat eri osavaltioissa. Pohnpei on korkea tuliperäinen saari, jonka ympärillä on koralliriutta. **Saarella elää omia lintulajeja**, kuten pohnpeinluri ja pohnpeinrilli, joita ei tavata luonnossa muualla.',
    teksti: 'Liittovaltion hallinnon osoite on Palikir, mutta Kolonia on Pohnpein osavaltion keskus sekä kauppojen, ravintoloiden ja majoituksen keskittymä. Pohnpein lentoasema sijaitsee Kolonian lähellä Deketikin saarella.\n\nPalikirin kongressi ja korkein oikeus ovat liittovaltion hallintorakennuksia. Sokehsin kuntaan kuuluu Palikirin lisäksi myös erillinen Pakinin atolli. College of Micronesia-FSM:n kansallinen kampus toimii Palikirissa.\n\nPalikiria ympäröi tiheä metsä. Pohnpeilla elää omia lintulajeja, ja ka-puun luontainen levinneisyys rajoittuu Pohnpeille ja Kosraelle. Sakau-juoman juurikasvilla on seremoniallisia ja seurusteluun liittyviä käyttötapoja.',
  },
  'South Tarawa': {
    intro: 'South Tarawassa kaupunkia kannattaa ajatella pitkänä ketjuna: Kiribatin pääkaupunki levittäytyy Tarawan atollin eteläisille luodoille. **Laguuni ja Tyynimeri** reunustavat asutusta eri puolilta. Tie yhdistää luodot, mutta meri kuuluu edelleen kaupungin elinkeinoihin ja yhteyksiin. Betiossa muiden saarten kopra jalostuu öljyksi, ja kalastus tuo sekä ruokaa että myytävää.\n\nKorallimaan alla on toinen, vähemmän näkyvä kaupungin perusta: **makean veden linssi**. Sen suojeleminen kuuluu atollin arkeen yhtä lailla kuin rannikon hoitaminen. Maneaba eli yhteisön kokoontumistalo tuo puolestaan ihmiset yhteen, ja sana elää myös parlamentin nimessä.',
    teksti: 'South Tarawan taloutta ei voi erottaa muusta saaristosta. Ulkosaarilla tuotettua kopraa, kuivattua kookospähkinän ydintä, käsitellään Betiossa. Öljyä viedään ulkomaille ja muita tuotteita myydään paikallisesti. Kalastus palvelee samalla kotitalouksia ja kaupankäyntiä.\n\nMaan vähyys näkyy veden hankinnassa. Bonrikin pohjavesialue on kaupungin tärkeä vesivaranto, ja samalla luodolla sijaitsee kansainvälinen lentoasema. Makeaa vettä varastoituu korallimaan alle; rannikon tulviminen ja suolaantuminen voivat uhata sitä.\n\nKiribatilaisessa luomiskertomuksessa hämähäkkijumala Nareau erottaa Karawan eli taivaan, Marawan eli meren ja Tarawan eli maan.',
  },
  Yaren: {
    intro: '**Yaren on Naurun hallintokeskus ja yksi saaren piireistä.** Naurulla ei ole virallista pääkaupunkia, ja Yaren on saaren etelärannikon hallintopiiri. Siellä sijaitsevat parlamentti ja hallinnon toimistoja sekä kansainvälinen lentoasema. Piirin pohjoispuolella on Buada, idässä Meneng ja lännessä Boe. Rannikon tie yhdistää piirejä, ja lentokoneen siirtyminen terminaalille voi katkaista tieliikenteen.\n\nYarenissa on myös **Nauru Learning Village**, jossa toimivat koulu, ammatillinen koulutus ja University of the South Pacificin kampus. Maanalainen Moqua-järvi tuo samaan piiriin aivan toisenlaisen paikan: vesi ei täällä aina näy maan pinnalla. Naurulla ei ole jokia, ja vettä kerätään myös talojen katoilta. Naapuripiirin Buada-järvi liittyy vanhaan kalankasvatustaitoon.',
    teksti: 'Yarenissa sijaitsevat Naurun parlamentti ja hallinnon toimistoja. Etelärannikon piiri rajautuu pohjoisessa Buadaan, idässä Menengiin ja lännessä Boeen. Saarta kiertävä tie yhdistää piirejä. Myös Naurun kansallismuseo sijaitsee Yarenissa.\n\nRannikon arjessa lentoliikenne, tie ja koulu ovat lähellä toisiaan. Nauru Learning Village kokoaa eri koulutustasoja samaan paikkaan.\n\nMoqua on maanalainen järvi, vaikka sen englanninkielinen nimi Well tarkoittaa kaivoa. Buada taas on Yarenin pohjoispuolisen piirin järvi, jolla ei ole laskuyhteyttä mereen. Naurulaiset kasvattivat siellä rannikon vesistä pyydettyjä nuoria kaloja.',
  },
};

/*
 * PÄÄKAUPUNKIPISTEEN ARTIKKELIAVAIN (Pelikoodari 11.10.2026): pisteen id (js/packs/paakaupungit.js) →
 * EUROPE_ARTIKKELIT-avain. Piste ei ole laudan kaupunki, joten sillä ei ole city.wikiä; maakortin
 * pääkaupunkirivin esittely (js/fokusmitat.js) hakee tekstin tällä. tools/paakaupungit/kytke-pilvisisalto.mjs.
 */
export const PAAKAUPUNKIEN_ARTIKKELIAVAIMET = {
  belgrad: 'Belgrad',
  bratislava: 'Bratislava',
  chisinau: 'Chișinău',
  minsk: 'Minsk',
  podgorica: 'Podgorica',
  skopje: 'Skopje',
  tirana: 'Tirana',
  zagreb: 'Zagreb',
  andorralavella: 'Andorra la Vella',
  bern: 'Bern',
  monaco: 'Principality of Monaco',
  reykjavik: 'Reykjavík',
  sanmarino: 'San Marino (kaupunki)',
  vaduz: 'Vaduz',
  /*
   * PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierät e03, 7 kaupunkia):
   * Artikkeliavaimet. Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa
   * maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e03-pilvi.
   */
  abudhabi: 'Abu Dhabi',
  amman: 'Amman',
  baku: 'Baku',
  beirut: 'Beirut',
  jerevan: 'Jerevan',
  manama: 'Manama',
  tbilisi: 'Tbilisi',
  /*
   * PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierä e03b, Ramallah):
   * Artikkeliavaimet. Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa
   * maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e03b-ramallah.
   */
  ramallah: 'Ramallah',
  /*
   * PÄÄKAUPUNKIPISTEET (Päätoimittaja 11.10.2026, pilvierät e04, e05, e06, e07, e08, e09, e10, e11, e12, e13, e14, 93 kaupunkia):
   * Artikkeliavaimet. Avain on pääkaupunkipisteen id (js/packs/paakaupungit.js), ei laudan kaupunki: lehti aukeaa
   * maakortin pääkaupunkirivistä (ei pysäkkiä). Lähteet ja faktapohja: haarat paakaupungit-e04-pilvi, paakaupungit-e05-pilvi, paakaupungit-e06-pilvi, paakaupungit-e07-pilvi, paakaupungit-e08-pilvi, paakaupungit-e09-pilvi, paakaupungit-e10-pilvi, paakaupungit-e11-pilvi, paakaupungit-e12-pilvi, paakaupungit-e13-pilvi, paakaupungit-e14-pilvi.
   */
  alger: 'Alger',
  banjul: 'Banjul',
  bissau: 'Bissau',
  conakry: 'Conakry',
  monrovia: 'Monrovia',
  nouakchott: 'Nouakchott',
  praia: 'Praia',
  rabat: 'Rabat',
  tunis: 'Tunis',
  abuja: 'Abuja',
  accra: 'Accra',
  bamako: 'Bamako',
  lome: 'Lomé',
  ndjamena: 'N\'Djamena',
  niamey: 'Niamey',
  ouagadougou: 'Ouagadougou',
  portonovo: 'Porto-Novo',
  yamoussoukro: 'Yamoussoukro',
  yaounde: 'Yaoundé',
  bangui: 'Bangui',
  brazzaville: 'Brazzaville',
  ciudaddelapaz: 'Ciudad de la Paz',
  gitega: 'Gitega',
  kigali: 'Kigali',
  kinshasa: 'Kinshasa',
  libreville: 'Libreville',
  luanda: 'Luanda',
  saotome: 'São Tomé',
  asmara: 'Asmara',
  djibouti: 'Djibouti (kaupunki)',
  dodoma: 'Dodoma',
  juba: 'Juba',
  kampala: 'Kampala',
  khartum: 'Khartum',
  lilongwe: 'Lilongwe',
  lusaka: 'Lusaka',
  mogadishu: 'Mogadishu',
  antananarivo: 'Antananarivo',
  gaborone: 'Gaborone',
  harare: 'Harare',
  maputo: 'Maputo',
  maseru: 'Maseru',
  mbabane: 'Mbabane',
  moroni: 'Moroni',
  portlouis: 'Port Louis',
  victoria: 'Victoria (Seychellit)',
  windhoek: 'Windhoek',
  asgabat: 'Ašgabat',
  biskek: 'Biškek',
  dhaka: 'Dhaka',
  dusanbe: 'Dušanbe',
  islamabad: 'Islamabad',
  taskent: 'Taškent',
  thimphu: 'Thimphu',
  bandarseribegawan: 'Bandar Seri Begawan',
  kualalumpur: 'Kuala Lumpur',
  male: 'Malé',
  naypyidaw: 'Naypyidaw',
  phnompenh: 'Phnom Penh',
  pjongjang: 'Pjongjang',
  vientiane: 'Vientiane',
  belmopan: 'Belmopan',
  kingston: 'Kingston',
  ottawa: 'Ottawa',
  portauprince: 'Port-au-Prince',
  sanjose: 'San José',
  sansalvador: 'San Salvador',
  santodomingo: 'Santo Domingo',
  tegucigalpa: 'Tegucigalpa',
  washington: 'Washington',
  basseterre: 'Basseterre',
  bridgetown: 'Bridgetown',
  castries: 'Castries',
  kingstown: 'Kingstown',
  nassau: 'Nassau',
  portofspain: 'Port of Spain',
  roseau: 'Roseau',
  saintjohns: 'Saint John\'s',
  stgeorges: 'St. George\'s',
  brasilia: 'Brasília',
  georgetown: 'Georgetown',
  lapaz: 'La Paz',
  paramaribo: 'Paramaribo',
  santiagodechile: 'Santiago de Chile',
  apia: 'Apia',
  canberra: 'Canberra',
  funafuti: 'Funafuti',
  majuro: 'Majuro',
  ngerulmud: 'Ngerulmud',
  nukualofa: 'Nukuʻalofa',
  palikir: 'Palikir',
  southtarawa: 'South Tarawa',
  yaren: 'Yaren',
};
