/*
 * KEKSINNÖT EUROOPASSA 1769–1928 — ensimmäinen aikajanalinssi.
 *
 * Omistajan tilaus 2.9.2026 ilta: *"Linssin idea on tekniikan
 * innovaatiot. Siinä etenisi aikajana automaattisesti vuosia eteenpäin,
 * ja aina jokaisen vuoden kohdalla, kun on tehty joku merkittävä
 * innovaatio, niin kartalle syttyisi valo siihen kaupunkiin, missä se
 * on tehty, ja samalla näkyisi pieni kuva keksijästä ja lyhyt selite.
 * Pelaaja voisi pysäyttää aikajanan halutessaan ja klikata kuvasta
 * jutun isommaksi nostoksi."*
 *
 * Tämä tiedosto on KAARI JA DATA. Kello, valot, filminauha ja
 * ilmiöpaneeli ovat yhteistä moottoria (js/aikajana.js), joka lukee
 * täältä kentän `aikajana`. Linssi on kerrokseton (kerros: false):
 * se ei piirrä pysyvää karttakerrosta vaan käynnistää ajon, kuten
 * maailmanradio vaihtaa kartan tilan.
 *
 * ── KAARI ─────────────────────────────────────────────────────────
 *
 * Wattin lauhduttimesta (1769) Flemingin penisilliiniin (1928): 25
 * pysäkkiä ja yksi merkkipaalu, isoisän matkavuosi 1873. Kaari on
 * Euroopan kartalla, joten se kertoo REHELLISESTI vain Euroopasta:
 * puhelin (Bell), hehkulamppu (Edison) ja lentokone (Wrightit)
 * syntyivät Atlantin takana, ja loppusanat sanovat sen ääneen.
 *
 * ── KUVAT ─────────────────────────────────────────────────────────
 *
 * `kuva` on henkilön muotokuva ja `ilmio` keksintöä selittävä kuva.
 * Kaikki tiedostot ovat Commonsin PD-kuvia (tarkistettu 2.9.2026,
 * lisenssi kunkin kuvan kohdalla). Omistajan linjaus: ilmiökuvan
 * paikalle tulee GENEROITU kuva, kun kuvaputki on tehnyt sen — se
 * vaihdetaan tähän kenttään yhdellä rivillä. Muotokuva, jota ei vielä
 * ole tarkistettu (null), näkyy nimikirjainlaattana.
 *
 * ── PAIKAT ────────────────────────────────────────────────────────
 *
 * `x`/`y` ovat maailmankartan laudan koordinaatit, laskettu
 * js/fokusmitat.js projisoiLaudalle -kaavalla asteista (`lat`/`lon`
 * jätetty näkyviin tarkistusta varten; tests/keksinnot.test.mjs
 * vertaa). Ilmoitettu paikka on se, missä työ tehtiin — Watt
 * Glasgow'ssa, Röntgen Würzburgissa — ei henkilön syntymäkaupunki.
 *
 * Lähde jokaiselle tapahtumalle: englanninkielinen Wikipedia,
 * artikkeli mainittu `lahde`-kentässä (tarkistettu 2.9.2026).
 */

/** Euroopan alue laudalla — kamera sovitetaan tähän (js/aikajana.js). */
const EUROOPPA = { x: 5560, y: 830, w: 1700, h: 1000 };

export const KEKSINNOT = [
  {
    vuosi: 1769, paikka: 'Glasgow', lat: 55.8642, lon: -4.2518, x: 5691.6, y: 1125.5,
    henkilo: 'James Watt', otsikko: 'Höyrykoneen lauhdutin',
    selite: 'Watt patentoi erillisen lauhduttimen, joka teki höyrykoneesta '
      + 'monta kertaa tehokkaamman. Siitä alkoi teollinen vallankumous.',
    juttu: 'James Watt korjasi Glasgow\'n yliopiston kojeita, kun hänen käsiinsä '
      + 'tuli Newcomenin höyrykoneen pienoismalli. Kone tuhlasi höyryä, koska '
      + 'sylinteri jäähdytettiin joka iskulla. Watt keksi jäähdyttää höyryn '
      + 'erillisessä lauhduttimessa ja pitää sylinterin kuumana — ja patentoi '
      + 'ratkaisun vuonna 1769.'
      + '\n\n'
      + 'Yhdessä tehtailija Matthew Boultonin kanssa Watt rakensi koneita '
      + 'kaivoksiin, myllyihin ja tehtaisiin. Tehon yksikkö watti on nimetty '
      + 'hänen mukaansa, ja hevosvoima on hänen keksimänsä vertailuluku.',
    kuva: { tiedosto: 'Watt James von Breda.jpg', selite: 'James Watt, Carl Frederik von Bredan maalaus 1792.' },
    ilmio: null,
    lahde: 'en-Wikipedia "James Watt"',
  },
  {
    vuosi: 1783, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Montgolfier-veljekset', otsikko: 'Kuumailmapallo',
    selite: 'Marraskuussa 1783 ihminen nousi ensimmäistä kertaa ilmaan: '
      + 'Montgolfierin pallo lensi Pariisin yli 25 minuuttia.',
    juttu: 'Paperitehtailijat Joseph ja Étienne Montgolfier huomasivat, että '
      + 'kuuma ilma nostaa kankaisen pussin. Kesäkuussa 1783 he näyttivät '
      + 'miehittämättömän pallon kotikaupungissaan Annonayssa, ja syksyllä '
      + 'koe siirtyi Pariisiin, jossa kuningas seurasi lentoja.'
      + '\n\n'
      + 'Marraskuun 21. päivänä 1783 Pilâtre de Rozier ja markiisi d\'Arlandes '
      + 'nousivat pallolla Pariisin yli — ensimmäinen vapaa miehitetty lento '
      + 'ihmiskunnan historiassa. Matkaa kertyi noin yhdeksän kilometriä.',
    kuva: { tiedosto: 'Joseph-montgolfier.jpg', selite: 'Joseph Montgolfier, tuntemattoman taiteilijan maalaus 1700-luvulta.' },
    ilmio: { tiedosto: '1783 balloonj.jpg', selite: 'Montgolfierin pallo aikalaispiirroksessa 1783.' },
    lahde: 'en-Wikipedia "Montgolfier brothers"',
  },
  {
    vuosi: 1796, paikka: 'Berkeley', lat: 51.69, lon: -2.457, x: 5751.4, y: 1315.9,
    henkilo: 'Edward Jenner', otsikko: 'Rokotus',
    selite: 'Maalaislääkäri Jenner rokotti pojan lehmärokolla ja osoitti, '
      + 'että se suojaa isorokolta. Sana rokotus tulee tästä kokeesta.',
    juttu: 'Gloucestershiressä tiedettiin, että lehmärokon sairastaneet '
      + 'lypsäjät eivät saaneet isorokkoa. Edward Jenner testasi uskomuksen '
      + 'toukokuussa 1796: hän siirsi lehmärokkoa kahdeksanvuotiaan James '
      + 'Phippsin käsivarteen ja altisti pojan myöhemmin isorokolle. Poika '
      + 'pysyi terveenä.'
      + '\n\n'
      + 'Jenner julkaisi tulokset 1798, ja menetelmä levisi muutamassa '
      + 'vuodessa ympäri Eurooppaa. Isorokko julistettiin hävitetyksi koko '
      + 'maailmasta vuonna 1980 — ainoa ihmisen tauti, jolle näin on käynyt.',
    kuva: { tiedosto: 'Portrait of Edward Jenner M.D (4672926).jpg', selite: 'Edward Jenner, William Ridleyn kaiverrus 1804.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Edward Jenner"',
  },
  {
    vuosi: 1800, paikka: 'Pavia', lat: 45.1847, lon: 9.1582, x: 6138.6, y: 1594.2,
    henkilo: 'Alessandro Volta', otsikko: 'Sähköparisto',
    selite: 'Volta pinosi sinkki- ja kuparilevyjä suolaveteen kastettujen '
      + 'kiekkojen väliin — ja sai ensimmäisen tasaisen sähkövirran.',
    juttu: 'Pavian yliopiston professori Alessandro Volta kiisteli Luigi '
      + 'Galvanin kanssa siitä, tuliko sammakon jalan nykäys eläimestä vai '
      + 'metalleista. Volta osoitti, että kaksi eri metallia ja kostea väliaine '
      + 'riittävät: hän rakensi pinon sinkki- ja kuparilevyistä ja ilmoitti '
      + 'keksinnöstään Lontoon Royal Societylle maaliskuussa 1800.'
      + '\n\n'
      + 'Voltan patsas oli ensimmäinen sähkölähde, joka antoi jatkuvaa '
      + 'virtaa. Sen avulla veden hajotettiin vedyksi ja hapeksi samana '
      + 'vuonna, ja jännitteen yksikkö voltti nimettiin keksijän mukaan.',
    kuva: { tiedosto: 'Alessandro Volta. Gaetano Bonatti inc.jpg', selite: 'Alessandro Volta, Gaetano Bonattin kaiverrus 1837.' },
    ilmio: { tiedosto: 'Pila di Volta.jpg', selite: 'Voltan patsas: metallilevyjä pinossa. Kuva Luigi Chiesa, CC BY 3.0.' },
    lahde: 'en-Wikipedia "Alessandro Volta"',
  },
  {
    vuosi: 1804, paikka: 'Lyon', lat: 45.764, lon: 4.8357, x: 5994.5, y: 1570.2,
    henkilo: 'Joseph Marie Jacquard', otsikko: 'Reikäkorttikangaspuut',
    selite: 'Jacquardin kangaspuut kutoivat kuvion reikäkorteista. Sama idea '
      + 'ohjasi sata vuotta myöhemmin ensimmäisiä tietokoneita.',
    juttu: 'Lyonin silkkikutojat tarvitsivat jokaiseen kuvioon apulaisen, joka '
      + 'nosti loimilankoja käsin. Joseph Marie Jacquard rakensi laitteen, '
      + 'jossa reikäkorttien ketju kertoo puille lanka kerrallaan, mitä '
      + 'nostetaan. Koneen valmis muoto oli käytössä vuodesta 1804.'
      + '\n\n'
      + 'Kutojat pelkäsivät työnsä puolesta ja rikkoivat koneita, mutta '
      + 'kymmenessä vuodessa Lyonissa oli tuhansia Jacquardin puita. Charles '
      + 'Babbage lainasi reikäkortit laskukoneeseensa, ja niistä tuli '
      + 'tietojenkäsittelyn ensimmäinen ohjelmointitapa.',
    kuva: { tiedosto: 'Joseph Marie Jacquard.jpg', selite: 'Joseph Marie Jacquard, kaiverrus 1800-luvulta.' },
    ilmio: { tiedosto: 'Jacquard loom.jpg', selite: 'Jacquardin kangaspuut reikäkortteineen (Mahlum, PD).' },
    lahde: 'en-Wikipedia "Jacquard machine"',
  },
  {
    vuosi: 1825, paikka: 'Darlington', lat: 54.5236, lon: -1.559, x: 5781.4, y: 1187.8,
    henkilo: 'George Stephenson', otsikko: 'Rautatie',
    selite: 'Stocktonin ja Darlingtonin rata avattiin syyskuussa 1825. '
      + 'Stephensonin Locomotion veti ensimmäisen julkisen höyryjunan.',
    juttu: 'Kaivosmekaanikko George Stephenson oli rakentanut vetureita '
      + 'hiilikaivoksille jo vuosia, kun Stocktonin ja Darlingtonin rata '
      + 'tilasi häneltä koneen. Syyskuun 27. päivänä 1825 Locomotion No. 1 '
      + 'veti vaunuja ja satoja matkustajia radan päästä päähän.'
      + '\n\n'
      + 'Neljä vuotta myöhemmin Stephensonin Rocket voitti Rainhillin '
      + 'veturikilpailun, ja Liverpoolin ja Manchesterin välinen rata aloitti '
      + 'aikataulun mukaisen matkustajaliikenteen. Stephensonin raideleveys, '
      + '1 435 millimetriä, on yhä maailman yleisin.',
    kuva: { tiedosto: 'George Stephenson.jpg', selite: 'George Stephenson, John Lucasin maalaus.' },
    ilmio: { tiedosto: 'Locomotion No 1.jpg', selite: 'Locomotion No. 1, vuoden 1825 veturi. Kuva Neil T, CC BY-SA 2.0.' },
    lahde: 'en-Wikipedia "Stockton and Darlington Railway"',
  },
  {
    vuosi: 1837, paikka: 'Lontoo', lat: 51.5074, lon: -0.1278, x: 5829.1, y: 1324.0,
    henkilo: 'Cooke ja Wheatstone', otsikko: 'Sähkölennätin',
    selite: 'William Cooke ja Charles Wheatstone patentoivat lennättimen ja '
      + 'kokeilivat sitä Lontoon rautatiellä. Viesti kulki hetkessä.',
    juttu: 'Charles Wheatstone tutki sähköä King\'s Collegessa, kun '
      + 'liikemies William Cooke ehdotti yhteistyötä. Kesällä 1837 he '
      + 'patentoivat lennättimen, jossa neulat osoittivat kirjaimia '
      + 'taululla, ja kokeilivat sitä Eustonin ja Camden Townin välillä.'
      + '\n\n'
      + 'Rautatiet ottivat laitteen käyttöön junien ohjaamiseen. Vuonna 1845 '
      + 'lennätin auttoi pidättämään murhaajan, joka oli paennut junalla — ja '
      + 'siitä alkoi laitteen maine. Isoisän matkan aikaan 1873 lennätinkaapelit '
      + 'ylittivät jo Atlantin.',
    kuva: { tiedosto: 'Wheatstone Charles drawing 1868.jpg', selite: 'Charles Wheatstone, Samuel Laurencen piirros 1868.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Cooke and Wheatstone telegraph"',
  },
  {
    vuosi: 1839, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Louis Daguerre', otsikko: 'Valokuva',
    selite: 'Ranskan tiedeakatemia julkisti dagerrotypian elokuussa 1839 '
      + 'ja antoi sen koko maailmalle lahjaksi. Valokuvaus oli syntynyt.',
    juttu: 'Teatterimaalari Louis Daguerre jatkoi Nicéphore Niépcen '
      + 'kokeita ja löysi tavan kiinnittää kuva hopeoidulle kuparilevylle '
      + 'jodihöyryn ja elohopean avulla. Kuva oli tarkka kuin peili, mutta '
      + 'jokainen levy oli ainoa kappale.'
      + '\n\n'
      + 'Ranskan valtio osti keksinnön ja julkisti sen 19. elokuuta 1839 '
      + 'vapaasti kaikkien käyttöön. Muutamassa kuukaudessa Pariisissa '
      + 'myytiin kameroita ja levyjä, ja ensimmäiset muotokuvaamot avattiin '
      + 'seuraavana vuonna.',
    kuva: { tiedosto: 'Louis Daguerre 2.jpg', selite: 'Louis Daguerre dagerrotypiassa 1844.' },
    ilmio: { tiedosto: 'Boulevard du Temple by Daguerre.jpg', selite: 'Boulevard du Temple 1838: ensimmäinen valokuva, jossa näkyy ihminen — kengänkiillottajan asiakas.' },
    lahde: 'en-Wikipedia "Louis Daguerre"',
  },
  {
    vuosi: 1856, paikka: 'Sheffield', lat: 53.3811, lon: -1.4701, x: 5784.3, y: 1240.0,
    henkilo: 'Henry Bessemer', otsikko: 'Halpa teräs',
    selite: 'Bessemer puhalsi ilmaa sulan raudan läpi ja sai terästä '
      + 'minuuteissa. Rautatiet, sillat ja laivat rakennettiin sen varaan.',
    juttu: 'Terästä oli osattu tehdä vuosisatoja, mutta pieniä määriä ja '
      + 'kalliisti. Henry Bessemer esitteli vuonna 1856 menetelmän, jossa '
      + 'ilmaa puhalletaan sulan raudan läpi: hiili palaa pois, ja sula '
      + 'kuumenee itsestään. Yksi panos valmistui noin kahdessakymmenessä '
      + 'minuutissa.'
      + '\n\n'
      + 'Bessemer perusti oman terästehtaan Sheffieldiin, josta tuli '
      + 'maailman teräskaupunki. Halpa teräs teki mahdolliseksi kiskot, '
      + 'pilvenpiirtäjät ja Eiffel-tornin kaltaiset rakenteet.',
    kuva: { tiedosto: 'Henry Bessemer.jpg', selite: 'Henry Bessemer.' },
    ilmio: { tiedosto: 'Bessemer converter.jpg', selite: 'Bessemer-konvertteri.' },
    lahde: 'en-Wikipedia "Bessemer process"',
  },
  {
    vuosi: 1867, paikka: 'Tukholma', lat: 59.3293, lon: 18.0686, x: 6435.6, y: 958.9,
    henkilo: 'Alfred Nobel', otsikko: 'Dynamiitti',
    selite: 'Nobel imeytti räjähdysherkän nitroglyseriinin piimaahan ja '
      + 'sai turvallisesti käsiteltävän räjähteen. Tunnelit ja kanavat avautuivat.',
    juttu: 'Nitroglyseriini räjähti pienestäkin tärähdyksestä, ja Nobelin '
      + 'oma tehdas Tukholman Helenborgissa lensi ilmaan 1864 — hänen '
      + 'veljensä kuoli onnettomuudessa. Nobel etsi tapaa kesyttää aine ja '
      + 'löysi sen: piimaahan imeytettynä nitroglyseriiniä voi muotoilla '
      + 'ja kuljettaa. Patentti myönnettiin 1867.'
      + '\n\n'
      + 'Dynamiitti teki Nobelista yhden Euroopan rikkaimmista miehistä. '
      + 'Testamentissaan hän määräsi omaisuutensa palkintoihin, joita on '
      + 'jaettu Tukholmassa vuodesta 1901.',
    kuva: { tiedosto: 'AlfredNobel adjusted.jpg', selite: 'Alfred Nobel, Gösta Flormanin valokuva.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Alfred Nobel"',
  },
  {
    vuosi: 1869, paikka: 'Pietari', lat: 59.9343, lon: 30.3351, x: 6844.5, y: 929.0,
    henkilo: 'Dmitri Mendelejev', otsikko: 'Jaksollinen järjestelmä',
    selite: 'Mendelejev järjesti alkuaineet taulukoksi ja jätti aukot '
      + 'aineille, joita ei vielä tuntenut. Ne löydettiin hänen ennustamiltaan paikoilta.',
    juttu: 'Pietarin yliopiston professori Dmitri Mendelejev kirjoitti '
      + 'kemian oppikirjaa ja etsi alkuaineille järjestystä. Hän kirjoitti '
      + 'jokaisen aineen kortille ja latoi kortteja atomipainon mukaan, '
      + 'kunnes samankaltaiset aineet osuivat allekkain. Taulukko '
      + 'julkaistiin maaliskuussa 1869.'
      + '\n\n'
      + 'Rohkeinta oli jättää aukkoja: Mendelejev ennusti tuntemattomien '
      + 'aineiden ominaisuudet. Gallium (1875), skandium (1879) ja germanium '
      + '(1886) löytyivät ennusteiden mukaisina, ja taulukko on yhä kemian '
      + 'seinällä jokaisessa koulussa.',
    kuva: { tiedosto: 'DIMendeleevCab.jpg', selite: 'Dmitri Mendelejev työhuoneessaan 1897.' },
    ilmio: { tiedosto: 'Mendelejevs periodiska system 1871.png', selite: 'Mendelejevin taulukko vuoden 1871 muodossa.' },
    lahde: 'en-Wikipedia "Dmitri Mendeleev"',
  },
  {
    vuosi: 1873, paalu: true, paikka: 'Lontoo', x: 5829.1, y: 1324.0,
    henkilo: 'Isoisä lähtee matkaan', otsikko: 'Matkakirjan vuosi',
    selite: 'Isoisä kirjoitti päiväkirjaansa maailmassa, jossa oli jo '
      + 'rautatie, lennätin ja valokuva — mutta ei vielä puhelinta, autoa eikä sähkövaloa.',
    kuva: null, ilmio: null,
  },
  {
    vuosi: 1876, paikka: 'Köln', lat: 50.9375, lon: 6.9603, x: 6065.3, y: 1349.2,
    henkilo: 'Nikolaus Otto', otsikko: 'Nelitahtimoottori',
    selite: 'Otton moottori puristi kaasuseoksen ennen sytytystä. Sama '
      + 'nelitahtinen kierto pyörii yhä lähes jokaisessa polttomoottorissa.',
    juttu: 'Kauppamatkustaja Nikolaus Otto kiinnostui kaasumoottoreista ja '
      + 'perusti Kölnin Deutziin tehtaan, jossa työskentelivät myös '
      + 'Gottlieb Daimler ja Wilhelm Maybach. Vuonna 1876 Otto sai '
      + 'toimimaan moottorin, jossa seos imetään, puristetaan, sytytetään ja '
      + 'poistetaan — neljä tahtia.'
      + '\n\n'
      + 'Puristus teki moottorista tehokkaan ja hiljaisen. Daimler ja Maybach '
      + 'kehittivät siitä muutamassa vuodessa bensiinikäyttöisen version, '
      + 'joka oli riittävän kevyt ajoneuvoon.',
    kuva: null,
    ilmio: null,
    lahde: 'en-Wikipedia "Nikolaus Otto"',
  },
  {
    vuosi: 1879, paikka: 'Berliini', lat: 52.52, lon: 13.405, x: 6280.2, y: 1278.9,
    henkilo: 'Werner von Siemens', otsikko: 'Sähköveturi',
    selite: 'Berliinin teollisuusnäyttelyssä 1879 pieni sähköveturi kuljetti '
      + 'yleisöä 300 metrin radalla. Neljä vuotta myöhemmin kulki ensimmäinen raitiovaunu.',
    juttu: 'Siemens & Halske rakensi näyttelyyn veturin, joka sai virran '
      + 'kiskojen välisestä kolmannesta kiskosta. Kone veti kolmea vaunua ja '
      + 'kuljetti kesän aikana lähes 90 000 matkustajaa.'
      + '\n\n'
      + 'Vuonna 1881 Siemens avasi Berliinin Lichterfeldeen maailman '
      + 'ensimmäisen sähköraitiotien. Sähkövoima teki mahdolliseksi '
      + 'maanalaiset radat, joissa höyryveturin savu olisi ollut '
      + 'tukahduttava.',
    kuva: null,
    ilmio: null,
    lahde: 'en-Wikipedia "Werner von Siemens"',
  },
  {
    vuosi: 1885, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Louis Pasteur', otsikko: 'Raivotautirokote',
    selite: 'Heinäkuussa 1885 Pasteur rokotti koiran pureman pojan. Poika '
      + 'jäi henkiin, ja tartuntatautien hoito muuttui.',
    juttu: 'Louis Pasteur oli osoittanut, että käyminen ja monet taudit '
      + 'johtuvat mikrobeista. Hän heikensi raivotaudin taudinaiheuttajaa '
      + 'kanien selkäytimessä ja sai rokotteen, joka toimi eläimillä.'
      + '\n\n'
      + 'Kun yhdeksänvuotias Joseph Meister tuotiin Pariisiin raivotautisen '
      + 'koiran puremana, Pasteur uskalsi kokeilla rokotetta ihmiseen. Poika '
      + 'parani, ja Pariisiin perustettiin Pasteur-instituutti vuonna 1888. '
      + 'Suomalainen Albert Edelfelt maalasi Pasteurin laboratoriossaan samana '
      + 'vuonna kuin rokote syntyi.',
    kuva: { tiedosto: 'Albert Edelfelt - Louis Pasteur - 1885.jpg', selite: 'Louis Pasteur laboratoriossaan, Albert Edelfeltin maalaus 1885.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Louis Pasteur"',
  },
  {
    vuosi: 1886, paikka: 'Mannheim', lat: 49.4875, lon: 8.466, x: 6115.5, y: 1412.4,
    henkilo: 'Carl Benz', otsikko: 'Auto',
    selite: 'Benzin kolmipyöräinen Patent-Motorwagen sai patentin '
      + 'tammikuussa 1886. Se oli ensimmäinen polttomoottorilla kulkeva auto.',
    juttu: 'Carl Benz rakensi Mannheimissa kevyen bensiinimoottorin ja '
      + 'asensi sen kolmipyöräiseen vaunuun. Keisarillinen patenttivirasto '
      + 'myönsi patentin numero 37435 tammikuun 29. päivänä 1886, ja Benz ajoi '
      + 'ensimmäiset julkiset ajot kesällä.'
      + '\n\n'
      + 'Vuonna 1888 hänen vaimonsa Bertha Benz ajoi auton kahden poikansa '
      + 'kanssa Mannheimista Pforzheimiin, yli sata kilometriä, kertomatta '
      + 'miehelleen. Matka osoitti, että auto kestää pitkän ajon — ja toi '
      + 'tehtaalle ensimmäiset tilaukset.',
    kuva: null,
    ilmio: { tiedosto: '1885Benz.jpg', selite: 'Benz Patent-Motorwagen, Benzin oma piirros 1880-luvulta.' },
    lahde: 'en-Wikipedia "Benz Patent-Motorwagen"',
  },
  {
    vuosi: 1888, paikka: 'Karlsruhe', lat: 49.0069, lon: 8.4037, x: 6113.5, y: 1433.1,
    henkilo: 'Heinrich Hertz', otsikko: 'Radioaallot',
    selite: 'Hertz tuotti ja mittasi sähkömagneettisia aaltoja '
      + 'laboratoriossaan. Hän ei uskonut niistä olevan mitään hyötyä.',
    juttu: 'Karlsruhen teknillisen korkeakoulun professori Heinrich Hertz '
      + 'halusi todistaa James Clerk Maxwellin teorian: sähkö ja valo ovat '
      + 'samaa aaltoliikettä. Vuosina 1886–1888 hän synnytti kipinällä '
      + 'aaltoja, jotka vastaanotin toisella puolella huonetta tunnisti.'
      + '\n\n'
      + 'Kun opiskelija kysyi, mihin aaltoja voisi käyttää, Hertz vastasi: '
      + '"Ei mihinkään." Seitsemän vuotta myöhemmin Marconi lähetti niillä '
      + 'viestin. Taajuuden yksikkö hertsi on nimetty hänen mukaansa.',
    kuva: { tiedosto: 'Heinrich Rudolf Hertz.jpg', selite: 'Heinrich Hertz, Robert Krewaldtin valokuva.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Heinrich Hertz"',
  },
  {
    vuosi: 1895, paikka: 'Bologna', lat: 44.4949, lon: 11.3426, x: 6211.4, y: 1622.5,
    henkilo: 'Guglielmo Marconi', otsikko: 'Radio',
    selite: 'Parikymppinen Marconi lähetti kotitilallaan Bolognan lähellä '
      + 'radiosignaalin mäen yli. Vuonna 1901 signaali ylitti Atlantin.',
    juttu: 'Guglielmo Marconi luki Hertzin kokeista ja rakensi Villa '
      + 'Griffonen ullakolle lähettimen. Kesällä 1895 hänen veljensä '
      + 'ampui haulikolla merkiksi, kun signaali oli kulkenut mäen taakse, '
      + 'noin kahden kilometrin päähän.'
      + '\n\n'
      + 'Italian posti ei kiinnostunut, joten Marconi muutti Lontooseen ja '
      + 'sai patentin 1896. Joulukuussa 1901 hänen asemansa Cornwallissa '
      + 'lähetti kirjaimen S Atlantin yli Newfoundlandiin. Marconi sai fysiikan '
      + 'Nobelin 1909.',
    kuva: { tiedosto: 'Guglielmo Marconi.jpg', selite: 'Guglielmo Marconi 1908, Pach Brothers.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Guglielmo Marconi"',
  },
  {
    vuosi: 1895, paikka: 'Würzburg', lat: 49.7913, lon: 9.9534, x: 6165.1, y: 1399.3,
    henkilo: 'Wilhelm Röntgen', otsikko: 'Röntgensäteet',
    selite: 'Marraskuussa 1895 Röntgen huomasi säteilyn, joka näkee lihan '
      + 'läpi. Ensimmäinen röntgenkuva oli hänen vaimonsa käsi.',
    juttu: 'Würzburgin yliopiston fysiikan professori Wilhelm Röntgen tutki '
      + 'katodisädeputkea pimennetyssä huoneessa, kun läheinen '
      + 'fluoresoiva levy alkoi hohtaa. Säteily kulki paperin, puun ja lihan '
      + 'läpi mutta ei luun eikä metallin. Röntgen nimesi sen X-säteiksi.'
      + '\n\n'
      + 'Joulukuun 22. päivänä 1895 hän kuvasi vaimonsa Anna Berthan käden. '
      + '"Olen nähnyt kuolemani", vaimo sanoi. Kuukaudessa säteitä käytettiin '
      + 'jo sairaaloissa, ja Röntgen sai ensimmäisen fysiikan Nobel-palkinnon 1901.',
    kuva: { tiedosto: 'Roentgen2.jpg', selite: 'Wilhelm Röntgen noin 1900.' },
    ilmio: { tiedosto: 'First medical X-ray by Wilhelm Röntgen of his wife Anna Bertha Ludwig\'s hand - 18951222.gif', selite: 'Anna Bertha Röntgenin käsi 22.12.1895 — ensimmäinen lääketieteellinen röntgenkuva.' },
    lahde: 'en-Wikipedia "Wilhelm Röntgen"',
  },
  {
    vuosi: 1895, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Lumière-veljekset', otsikko: 'Elokuva',
    selite: 'Joulukuussa 1895 Lumièret näyttivät Pariisin Grand Caféssa '
      + 'liikkuvia kuvia maksavalle yleisölle. Elokuvateatteri oli syntynyt.',
    juttu: 'Auguste ja Louis Lumière valmistivat Lyonissa valokuvauslevyjä. '
      + 'He rakensivat kinematografin, joka oli samalla kamera, kopiokone '
      + 'ja projektori, ja kuvasivat sillä työläisten poistumisen omasta '
      + 'tehtaastaan.'
      + '\n\n'
      + 'Joulukuun 28. päivänä 1895 Pariisin Grand Cafén kellarissa esitettiin '
      + 'kymmenen lyhytfilmiä. Juna, joka saapuu asemalle, sai tarinan mukaan '
      + 'katsojat säikähtämään. Vuoden päästä kinematografeja kiersi jo '
      + 'ympäri maailmaa.',
    kuva: { tiedosto: 'Fratelli Lumiere.jpg', selite: 'Auguste ja Louis Lumière noin 1895.' },
    ilmio: { tiedosto: 'Cinématographe Lumière.jpg', selite: 'Lumièren kinematografi.' },
    lahde: 'en-Wikipedia "Auguste and Louis Lumière"',
  },
  {
    vuosi: 1897, paikka: 'Augsburg', lat: 48.3705, lon: 10.8978, x: 6196.6, y: 1460.4,
    henkilo: 'Rudolf Diesel', otsikko: 'Dieselmoottori',
    selite: 'Dieselin moottori sytytti polttoaineen pelkällä puristuksella. '
      + 'Ensimmäinen toimiva kone käynnistyi Augsburgissa 1897.',
    juttu: 'Rudolf Diesel halusi moottorin, joka hukkaisi mahdollisimman '
      + 'vähän lämpöä. Hänen ratkaisussaan ilma puristetaan niin kuumaksi, '
      + 'että ruiskutettu polttoaine syttyy itsestään. Patentti myönnettiin '
      + '1893, ja Augsburgin konetehdas rakensi ensimmäisen käyttökelpoisen '
      + 'moottorin vuonna 1897.'
      + '\n\n'
      + 'Dieselin kone oli raskas mutta säästeliäs, ja se valtasi laivat, '
      + 'veturit ja kuorma-autot. Diesel itse katosi Englannin kanaalilla '
      + 'matkustajalaivalta vuonna 1913.',
    kuva: { tiedosto: 'Rudolf Diesel.jpg', selite: 'Rudolf Diesel.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Rudolf Diesel"',
  },
  {
    vuosi: 1898, paikka: 'Pariisi', lat: 48.8566, lon: 2.3522, x: 5911.7, y: 1439.6,
    henkilo: 'Marie Curie', otsikko: 'Radium',
    selite: 'Marie ja Pierre Curie erottivat pikiuraanista kaksi uutta '
      + 'alkuainetta, poloniumin ja radiumin, ja antoivat nimen radioaktiivisuudelle.',
    juttu: 'Puolasta Pariisiin tullut Maria Skłodowska tutki Becquerelin '
      + 'löytämää uraanin säteilyä. Hän havaitsi, että pikiuraani säteilee '
      + 'enemmän kuin sen sisältämä uraani — malmissa oli jotain '
      + 'tuntematonta.'
      + '\n\n'
      + 'Vuonna 1898 Curiet ilmoittivat kahdesta uudesta alkuaineesta: '
      + 'polonium sai nimensä Marien kotimaasta, radium säteilystään. '
      + 'Marie Curie sai Nobelin fysiikassa 1903 ja kemiassa 1911 — ainoana '
      + 'ihmisenä kahdessa eri tieteessä.',
    kuva: { tiedosto: 'Marie Curie c. 1898.jpg', selite: 'Marie Curie noin 1898.' },
    ilmio: { tiedosto: 'Pierre and Marie Curie.jpg', selite: 'Pierre ja Marie Curie laboratoriossaan.' },
    lahde: 'en-Wikipedia "Marie Curie"',
  },
  {
    vuosi: 1900, paikka: 'Friedrichshafen', lat: 47.6543, lon: 9.4791, x: 6149.3, y: 1490.9,
    henkilo: 'Ferdinand von Zeppelin', otsikko: 'Ilmalaiva',
    selite: 'Heinäkuussa 1900 kreivi Zeppelinin 128-metrinen LZ 1 nousi '
      + 'Bodenjärveltä. Jäykkärunkoinen ilmalaiva oli syntynyt.',
    juttu: 'Eläkkeelle jäänyt ratsuväenkenraali Ferdinand von Zeppelin '
      + 'suunnitteli ilmalaivan, jossa alumiinirunko pitää kaasusäiliöt '
      + 'muodossaan. LZ 1 rakennettiin kelluvaan halliin Bodenjärvelle ja '
      + 'lensi ensimmäisen kerran 2. heinäkuuta 1900, 18 minuuttia.'
      + '\n\n'
      + 'Ensimmäiset laivat tuhoutuivat ja rahat loppuivat, mutta '
      + 'saksalaiset keräsivät kreiville uuden alun. Vuodesta 1910 zeppeliinit '
      + 'kuljettivat matkustajia, ja 1930-luvulla ne lensivät säännöllisesti '
      + 'Atlantin yli.',
    kuva: { tiedosto: 'Ferdinand von Zeppelin.jpg', selite: 'Ferdinand von Zeppelin.' },
    ilmio: null,
    lahde: 'en-Wikipedia "LZ 1"',
  },
  {
    vuosi: 1909, paikka: 'Calais', lat: 50.9513, lon: 1.8587, x: 5895.3, y: 1348.6,
    henkilo: 'Louis Blériot', otsikko: 'Lento kanaalin yli',
    selite: 'Heinäkuussa 1909 Blériot lensi yksitasollaan Calais\'sta '
      + 'Doveriin 37 minuutissa. Meri ei enää suojannut ketään.',
    juttu: 'Wrightin veljekset olivat lentäneet Yhdysvalloissa vuodesta 1903, '
      + 'mutta Euroopassa lentokoneet olivat yhä sirkusnumero. Lontoolainen '
      + 'Daily Mail lupasi tuhat puntaa ensimmäiselle, joka ylittää '
      + 'Englannin kanaalin.'
      + '\n\n'
      + 'Louis Blériot lähti 25. heinäkuuta 1909 aamunkoitteessa Calais\'n '
      + 'läheltä ilman kompassia ja laskeutui Doverin linnan viereen 37 '
      + 'minuuttia myöhemmin. Blériot XI -koneita tilattiin sadoittain, ja '
      + 'lentokoneesta tuli Euroopassa vakavasti otettava kulkuneuvo.',
    kuva: { tiedosto: 'Louis Bleriot.jpg', selite: 'Louis Blériot.' },
    ilmio: { tiedosto: 'Bleriot XI 1909.jpg', selite: 'Blériot XI -yksitaso 1909.' },
    lahde: 'en-Wikipedia "Louis Blériot"',
  },
  {
    vuosi: 1926, paikka: 'Lontoo', lat: 51.5074, lon: -0.1278, x: 5829.1, y: 1324.0,
    henkilo: 'John Logie Baird', otsikko: 'Televisio',
    selite: 'Tammikuussa 1926 Baird näytti Sohon ullakolla liikkuvat kasvot '
      + 'sähköisesti. Se oli ensimmäinen julkinen televisioesitys.',
    juttu: 'Skotlantilainen John Logie Baird rakensi vastaanottimensa '
      + 'hattulaatikoista, polkupyörän lampuista ja neulomalangasta. Kuvan '
      + 'pilkkoi pyörivä reikälevy, ja ensimmäinen kasvokuva oli '
      + 'nukkepää nimeltä Stooky Bill.'
      + '\n\n'
      + 'Tammikuun 26. päivänä 1926 Baird esitti laitteen Royal Institutionin '
      + 'jäsenille Frith Streetillä. Kuvassa oli 30 juovaa ja se välkkyi, '
      + 'mutta kasvot liikkuivat. BBC aloitti säännölliset lähetykset '
      + 'Bairdin järjestelmällä 1932.',
    kuva: { tiedosto: 'John Logie Baird in 1917.jpg', selite: 'John Logie Baird 1917.' },
    ilmio: null,
    lahde: 'en-Wikipedia "John Logie Baird"',
  },
  {
    vuosi: 1928, paikka: 'Lontoo', lat: 51.5074, lon: -0.1278, x: 5829.1, y: 1324.0,
    henkilo: 'Alexander Fleming', otsikko: 'Penisilliini',
    selite: 'Syyskuussa 1928 Fleming palasi lomalta ja huomasi homeen '
      + 'tappaneen bakteerit maljalta. Antibioottien aika alkoi.',
    juttu: 'Alexander Fleming tutki St Mary\'s Hospitalissa stafylokokkeja '
      + 'ja jätti maljat pöydälle lomansa ajaksi. Palattuaan hän näki, että '
      + 'yhdelle maljalle kasvanut Penicillium-home oli tappanut bakteerit '
      + 'ympäriltään. Hän nimesi vaikuttavan aineen penisilliiniksi.'
      + '\n\n'
      + 'Fleming ei saanut ainetta eristettyä, ja lääke jäi odottamaan yli '
      + 'kymmenen vuotta. Oxfordissa Howard Florey ja Ernst Chain '
      + 'puhdistivat sen 1940, ja toisen maailmansodan aikana penisilliiniä '
      + 'tuotettiin miljoonille. Kolmikko sai Nobelin 1945.',
    kuva: { tiedosto: 'Synthetic Production of Penicillin TR1468.jpg', selite: 'Alexander Fleming laboratoriossaan 1943.' },
    ilmio: null,
    lahde: 'en-Wikipedia "Alexander Fleming"',
  },
];

export const LINSSI = {
  tunnus: 'keksinnot',
  jarjestys: 25,
  kerros: false,
  nimi: 'Keksintölinssi',
  lyhyt: 'Keksinnöt Euroopassa 1769–1928: kello juoksee, valot syttyvät.',
  ikoni: '<circle cx="12" cy="12" r="7.5"/><path d="M12 7.5V12l3 2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2"/>',
  valokuva: false,
  laudat: ['maailmankartta'],
  lahde: {
    aineisto: 'Wikipedia (englanninkieliset artikkelit, tarkistettu 2.9.2026); kuvat Wikimedia Commons, PD',
    lisenssi: 'CC BY-SA 4.0 (tekstit), PD (kuvat)',
    osoite: 'https://en.wikipedia.org/wiki/Timeline_of_historic_inventions',
    haettu: '2026-09-02',
  },
  aikajana: {
    otsikko: 'Keksinnöt Euroopassa',
    alku: 1765,
    loppu: 1928,
    alue: EUROOPPA,
    tapahtumat: KEKSINNOT,
    loppusanat: {
      otsikko: 'Kaari päättyy 1928',
      teksti: 'Kartalla palavat nyt kaikki kaaren valot Glasgow\'sta Pietariin. Kaari on '
        + 'Euroopan: puhelin (Bell 1876), hehkulamppu (Edison 1879) ja '
        + 'lentokone (Wrightin veljekset 1903) syntyivät samaan aikaan '
        + 'Atlantin takana. Napauta valoa tai korttia, niin juttu aukeaa.',
      kuva: null,
    },
  },
};
