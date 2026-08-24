// Matkakirjan omat artikkelit Oseanian kaupungeista.
//
// Tiedosto perustettiin 23.8.2026 Sydneyn kaupunkilehden yhteydessä
// (Oseanian laudan pilottikaupunki). Malli on
// js/packs/northamerica-artikkelit.js, joka puolestaan seuraa
// africa-artikkelit.js:ää ja asia-artikkelit.js:ää. Rakenne on sama:
//
//   intro   — lehden ETUSIVUN LEIPÄTEKSTI (Raamattu, "TEKSTIEN
//             PAINOPISTE" 20.8.2026): 7–10 virkkeen johdatus siihen,
//             millainen kaupunki on ja mikä sen merkitys ja historia
//             ovat. Noin 700–1100 merkkiä, 2–3 kappaletta '\n\n'-rajalla
//             ja 1–3 maltillista **lihavointia**. Renderöijä tekee
//             kappaleet ja boldit — ei HTML:ää tänne.
//   teksti  — kolme kappaletta, yhteensä 600–1100 merkkiä. Ensimmäinen
//             kertoo missä ollaan, toinen mitä täällä on tapahtunut,
//             kolmas millaista täällä on nyt. Tämä on Lue lisää
//             -dialogin teksti.
//
// Avaimena on wiki-otsikko, sama jolla cachedSummary hakee: Sydneyn
// kohdalla js/packs/oceania.js antaa sekä wiki-nimeksi että
// näyttönimeksi 'Sydney'. Taulu yhdistetään muiden lautojen tauluihin
// js/sisaltotaulut.js:ssä.
//
// Ei ylisanoja eikä huutomerkkejä: nuoren herran innostus kuuluu
// saapumistekstissä, ja tämä on se rauhallinen ääni, joka kertoo
// taustan.
//
// SYDNEY (23.8.2026): jokainen väite tulee samasta erästä kuin lehden
// tekstit (js/packs/kulttuuri-kategoriat.js, avain sydney), ja ne on
// luettu en-Wikipedian raakateksteistä 23.8.2026 (artikkelit "Sydney",
// "Sydney Cove", "Gadigal", "History of Sydney", "Port Jackson",
// "Sydney Mint", "Sydney Observatory"). Sisältölinjaus on
// spec-mantereet.md:n Oseania-kohta: gadigalit ja eora nimetään omilla
// nimillään ennen siirtomaanimiä ja kansa näytetään elävänä.
// ANAKRONISMI: satamansilta (1932) ja oopperatalo (1973) mainitaan
// vain siksi, että ne sanotaan ääneen isoisän ajan ulkopuolisiksi.
//
// MELBOURNE (23.8.2026): jokainen väite tulee samasta erästä kuin lehden
// tekstit (js/packs/kulttuuri-kategoriat.js, avain melbourne), ja ne on
// luettu en-Wikipedian raakateksteistä 23.8.2026 (artikkelit "Melbourne",
// "History of Melbourne", "Hoddle Grid", "Yarra River", "Wurundjeri",
// "Victorian gold rush", "Parliament House, Melbourne",
// "Old Treasury Building, Melbourne", "National Gallery of Victoria" ja
// "William Guilfoyle"). Sisältölinjaus on spec-mantereet.md:n Oseania-osio:
// wurundjerit ja boonwurrungit nimetään omilla nimillään ennen
// siirtomaanimiä. Työaineistoa (faktapohja-melbourne.md,
// tarkistus-melbourne.md) EI ollut kirjoittajan worktreessä, mikä on
// kirjattu kulttuuri-kategoriat.js:n melbourne-lohkon kommenttiin.
// KAKSI VISAVUOTOA KORJATTU 23.8.2026 (tarkistus-melbourne-lehti.md,
// osio D): intron viimeisestä kappaleesta poistettiin "Melbourne oli
// Australian pääkaupunki 1901–1927" (visan kysymykset 1 ja 3 — fakta
// on nyt vain kulttuurilehden nostossa H2), ja teksti-osiosta
// superlatiivi "maailman laajin toiminnassa oleva kaupunkiraitiotie"
// (visan kysymys 4). Molempien tilalla on saman asian toinen puoli:
// vuoden 1873 katukuva ilman kiskovaunuja ja raitiotien aikajana
// 1884 → köysi → sähkö.
export const OCEANIA_ARTIKKELIT = {
  Sydney: {
    intro: 'Sydney on Australian vanhin ja väkirikkain kaupunki, ja se '
      + 'on rakennettu jättimäisen luonnonsataman ympärille. Port '
      + 'Jackson haarautuu kymmeniksi lahdenpoukamiksi, ja kaupunki '
      + 'ulottuu Tyyneltämereltä Sinisille vuorille asti. Sataman '
      + 'eteläreunan '
      + 'poukama tunnettiin eoran kansojen kielellä nimellä '
      + '**Warrane**, ja gadigalit olivat eläneet sen rannoilla kauan '
      + 'ennen eurooppalaisia.'
      + '\n\n'
      + 'James Cook purjehti sataman suun ohi 1770 ja merkitsi sen '
      + 'kartalle Port Jacksoniksi purjehtimatta sisään. Arthur '
      + 'Phillipin ensimmäinen laivasto saapui Botany Bayhin '
      + 'tammikuussa 1788, totesi sen sopimattomaksi ja siirtyi '
      + 'pohjoiseen: rangaistussiirtokunta perustettiin Sydney Coveen '
      + '26. tammikuuta 1788. Vankikuljetukset päättyivät 1840, ja '
      + '1842 Sydney julistettiin kaupungiksi.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki oli keskellä '
      + 'muodonmuutosta. **Kullan tuoma raha rakensi hiekkakivestä '
      + 'kaupungintaloa ja pääpostia yhtä aikaa**, rahapaja löi '
      + 'sovereigneja Macquarie Streetillä ja observatorion aikapallo '
      + 'putosi joka päivä kello yhdeltä. Satamansiltaa ja '
      + 'oopperataloa ei ollut olemassa: ne valmistuivat vasta 1932 '
      + 'ja 1973.',
    teksti: 'Sydney on Australian kaakkoisrannikolla New South Walesin '
      + 'pääkaupunkina. Kaupunki kiertää Port Jacksonin satamaa, jonka '
      + 'lahdenpoukamat ja niemekkeet pilkkovat sen rannat pieniksi '
      + 'kaupunginosiksi. Idässä ovat avomeren hiekkarannat, lännessä '
      + 'Sinisten vuorten hiekkakiviylänkö.'
      + '\n\n'
      + 'Britit perustivat paikalle rangaistussiirtokunnan 1788. '
      + 'Vankikuljetukset päättyivät 1840, ja kullan löytyminen 1851 '
      + 'moninkertaisti väkiluvun: Sydneyssä ja sen esikaupungeissa '
      + 'asui 95 600 ihmistä vuonna 1861 ja lähes 387 000 vuonna 1891. '
      + 'Samalla nousivat ne hiekkakivirakennukset, joita isoisä näki '
      + '1873 keskeneräisinä.'
      + '\n\n'
      + 'Nykyään Suur-Sydneyssä asuu noin 5,6 miljoonaa ihmistä, ja '
      + 'yli neljäkymmentä prosenttia heistä on syntynyt ulkomailla. '
      + 'Lautat lähtevät yhä Circular Quaystä kymmenelle reitille, ja '
      + 'kaupungin tunnetuimmat maamerkit — satamansilta ja '
      + 'oopperatalo — ovat molemmat isoisän matkaa myöhempiä.',
  },
  Melbourne: {
    intro: 'Melbourne on Victorian pääkaupunki ja Australian toiseksi '
      + 'väkirikkain kaupunki, ja se on rakennettu Port Phillipin lahden '
      + 'pohjukkaan joen mutkaan. Kulinin kansat, wurundjerit ja '
      + 'boonwurrungit, kokoontuivat joen varrelle kauan ennen brittejä; '
      + 'heidän kielissään seutu on **Naarm** ja joki Birrarung.'
      + '\n\n'
      + 'Britit perustivat kylän 1835, kuvernööri Bourke nimesi sen '
      + '10. huhtikuuta 1837 Britannian pääministerin mukaan, ja Robert '
      + 'Hoddle merkitsi samana vuonna ruudukon, jonka mukaan keskusta '
      + 'yhä kulkee. Kullan löytyminen Victoriasta 1851 muutti kaiken: '
      + 'väkiluku kaksinkertaistui kuukausissa, ja 1865 Melbourne ohitti '
      + 'Sydneyn maan väkirikkaimpana kaupunkina.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki rakensi julkisia talojaan '
      + 'moneen suuntaan. **Parlamenttitalo oli kesken, rahastotalon '
      + 'kultaholvit jäivät tyhjiksi ja taidekokoelma asui kirjaston '
      + 'siivessä**, ja kasvitieteellinen puutarha sai heinäkuussa '
      + 'johtajan, joka muotoili sen nykyiseen asuunsa. Kaduilla kulki '
      + 'hevosomnibusseja; kiskovaunuja ei ollut vielä yhtäkään. '
      + 'Kaupungin rikkain vuosikymmen oli vasta tulossa, ja sen '
      + 'jälkeen tuli lama.',
    teksti: 'Melbourne on Australian kaakkoiskulmassa Port Phillipin '
      + 'lahden pohjois- ja itärannalla. Keskusta on joen mutkassa, ja '
      + 'kaupunki jatkuu pohjoiseen jokilaakson kukkuloille ja kaakkoon '
      + 'Dandenongin suuntaan; lahden rannalla on rivi uimarantoja '
      + 'Port Melbournesta Frankstoniin.'
      + '\n\n'
      + 'Kylä perustettiin 1835 ja sai nimensä 1837. Kullan löytyminen '
      + '1851 kasvatti Melbournen väkiluvun 123 000:een vuoteen 1854 '
      + 'mennessä, ja 1880-luvun tonttibuumin aikaan kaupunkia sanottiin '
      + 'maailman rikkaimmaksi ja Britannian imperiumin toiseksi '
      + 'suurimmaksi Lontoon jälkeen. Vuoden 1888 huipun jälkeen '
      + 'kupla puhkesi, ja lama pysäytti rakentamisen vuosikymmeneksi.'
      + '\n\n'
      + 'Nykyään kaupungissa asuu 5,435 miljoonaa ihmistä eli 19 '
      + 'prosenttia koko Australian väestöstä, ja se on maailman '
      + 'eteläisin yli miljoonan asukkaan kaupunki. Nimi tarkoittaa '
      + 'yleensä lähes 10 000 neliökilometrin aluetta, jolla on 31 '
      + 'kuntaa. Kiskoilla kulkevat vaunut ovat kuuluneet katukuvaan '
      + 'vuodesta 1884, ensin hevosten ja köyden vetäminä ja 1900-luvun '
      + 'alusta sähköllä.',
  },
  /* Aucklandin ja Uuden-Seelannin lohkot liitetty fragmenteista
   * 23.8.2026 (docs/mantereet-tyoaineisto/*-intro-fragmentti.js) —
   * kolme kirjoittajaa tyoskenteli rinnakkain ja Sydneyn agentti loi
   * taman tiedoston. */
  Auckland: {
    intro: 'Auckland on Uuden-Seelannin suurin kaupunki, ja siinä asuu noin '
      + 'kolmasosa koko maan väestöstä. Se on rakennettu kapealle '
      + 'kannakselle kahden sataman väliin: pohjoisessa Waitematā avautuu '
      + 'Hauraki-lahdelle ja Tyynellemerelle, etelässä Manukau '
      + 'Tasmaninmerelle. Kannaksen alla on **Aucklandin '
      + 'tulivuorikenttä, jolla on purkautunut ainakin 53 tulivuorta** '
      + 'viimeisten 193 000 vuoden aikana.'
      + '\n\n'
      + 'Maorit asettuivat kannakselle noin 1350, ja sen maorinimi on '
      + 'Tāmaki Makaurau, "Tāmaki jota moni halusi". Linnoitettuja pā-kyliä '
      + 'nousi tulivuorenhuipuille. Ngāti Whātua Ōrākein ylipäällikkö '
      + 'Āpihai Te Kawau allekirjoitti Waitangin sopimuksen maaliskuussa '
      + '1840 ja lahjoitti pian sen jälkeen maata Waitematān rannalta '
      + 'kuvernööri William Hobsonille uuden pääkaupungin paikaksi. '
      + 'Kaupunki perustettiin 18. syyskuuta 1840.'
      + '\n\n'
      + 'Auckland oli Uuden-Seelannin pääkaupunki 1841–1865, kunnes '
      + 'hallinto siirtyi Eteläsaarta lähemmäksi Wellingtoniin. **Isoisän '
      + 'saapuessa 1873 menetyksestä oli kulunut kahdeksan vuotta**, mutta '
      + 'kaupunki kasvoi yhä satamansa varassa: kauri-pihka oli sen '
      + 'tärkein vientitavara vuosisadan jälkipuoliskon.',
    teksti: 'Auckland sijaitsee Uuden-Seelannin Pohjoissaaren yläosassa '
      + 'kapealla kannaksella, joka on Māngere Inletin ja Tāmaki-joen '
      + 'kohdalla alle kahden kilometrin levyinen. Kaupunkia ympäröivät '
      + 'sademetsän peittämät kukkulat, lännessä Waitākeren ja kaakossa '
      + 'Hunuan vuoret, ja idässä ovat Hauraki-lahden saaret.'
      + '\n\n'
      + 'Kannaksesta käytiin kauan kamppailua sen hyvän maan takia: '
      + '1700-luvun alussa aluetta hallitsi Te Waiohua -heimoliitto ja '
      + '1740-luvulta lähtien Ngāti Whātua Ōrākei. Britit perustivat '
      + 'kaupungin 1840 ja tekivät siitä pääkaupungin 1841. 1860-luvun '
      + 'alussa kaupunkiin sijoitettiin 12 000 imperiumin sotilasta ja '
      + 'etelään rakennettiin Great South Road; väkiluku kasvoi 1 500:sta '
      + 'vuonna 1841 yli 12 000:een vuonna 1864.'
      + '\n\n'
      + 'Nykyään Auckland on maan talouden keskus, ja sen satama käsitteli '
      + 'vuonna 2015 kolmanneksen koko maan konttiliikenteestä. Kaupunkia '
      + 'sanotaan purjeiden kaupungiksi: veneitä on rekisteröity 135 000 ja '
      + 'noin joka kolmas kotitalous omistaa sellaisen. Ilmasto on lauhkea '
      + 'ja merellinen, ja Auckland on Uuden-Seelannin lämpimin suuri '
      + 'keskus.',
  },
  /* WELLINGTON (Opus 23.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain wellington): väitteet on
   * luettu en-Wikipedian raakateksteistä 23.8.2026, ja pohjana ovat
   * faktapohja-wellington.md ja tarkistus-wellington.md.
   * Tarkistusraportin vaatimat kohdat näkyvät myös täällä:
   * pääkaupunkiasema kerrotaan tarkenteella "itsenäisen valtion", ja
   * māorit näkyvät nykyisenä kansana (mana whenua, Taranaki Whānui).
   * Tuulisuuden lukuja, Cookinsalmen leveyttä eikä elokuva-alaa ei
   * mainita, koska ne ovat laudan visan omia vastausfaktoja. */
  Wellington: {
    intro: 'Wellington on Uuden-Seelannin pääkaupunki ja maailman '
      + 'eteläisin itsenäisen valtion pääkaupunki, ahtautunut Pohjoissaaren '
      + 'lounaiskärjessä sataman ja jyrkkien mäkien väliin. Sataman māorinkielinen nimi on '
      + '**Te Whanganui-a-Tara**, Taran suuri satama, ja alueen mana '
      + 'whenua ovat Taranakin iwit, jotka muuttivat tänne 1820- ja '
      + '1830-luvulla.'
      + '\n\n'
      + 'Pääkaupungiksi kaupunki tuli 1865, kun hallituksen istuinpaikka '
      + 'siirrettiin Aucklandista lähemmäs Eteläsaarta: parlamentti '
      + 'kokoontui täällä ensimmäisen kerran heinäkuussa 1865, kun '
      + 'asukkaita oli vasta 4 900. Vuoden 1855 maanjäristys oli sitä ennen '
      + 'nostanut maata kahdesta kolmeen metriä ja tehnyt keskustalle uutta '
      + 'maata sinne, missä oli ollut satamaa. **Isoisän saapuessa 1873 '
      + 'pääkaupunki oli vasta kahdeksan vuoden ikäinen**, ja talot '
      + 'rakennettiin puusta, joka joustaa järistyksessä kiveä paremmin.'
      + '\n\n'
      + 'Nykyään kaupunki tunnetaan hallinnostaan, museoistaan ja '
      + 'kahviloistaan, ja köysirata nousee keskustasta Kelburnin '
      + 'kasvitieteelliselle puutarhalle. Aidattu Zealandia on tuonut '
      + 'esikaupunkeihin takaisin lintuja, jotka ihmisen tuomat pedot '
      + 'olivat karkottaneet.',
    teksti: 'Wellington sijaitsee Pohjoissaaren lounaiskärjessä '
      + 'Cookinsalmen rannalla, Remutaka-vuoriston ja sataman välissä. '
      + 'Liikekeskusta on Lambtonin sataman rannassa aktiivisen '
      + 'murroslinjan vieressä, ja heti sen länsipuolella maa kohoaa '
      + 'jyrkästi, joten esikaupungit ovat rinteillä keskustan yläpuolella. '
      + 'Idässä on Miramarin niemimaa, joka liittyy muuhun kaupunkiin '
      + 'Rongotain matalalla kannaksella.'
      + '\n\n'
      + 'Waitangin tribunaali on todennut, että sopimuksen '
      + 'allekirjoitusaikaan 1840 alueen mana whenua -asema oli viidellä '
      + 'iwillä, ja Uuden-Seelannin komppania osti maat 1839 ja 1844. '
      + 'Hallituksen istuinpaikka siirtyi tänne 1865, ja vuoden 1855 '
      + 'järistyksen jälkeen kaupunki rakennettiin vuosikymmeniksi lähes '
      + 'kokonaan puusta.'
      + '\n\n'
      + 'Nykyään keskusta on tiivis ja kävelykelpoinen: rantaraitti kulkee '
      + 'museoiden ohi Oriental Bayn rannalle, ja kaupungissa on enemmän '
      + 'kahviloita asukasta kohden kuin New Yorkissa. Kolmasosa '
      + 'asukkaista on syntynyt ulkomailla. Maa muistuttaa itsestään yhä: '
      + 'asukkaat huomaavat useita järistyksiä vuodessa, ja uudet '
      + 'suurrakennukset tehdään tukieristyksellä.',
  },
  'Uusi-Seelanti': {
    intro: 'Uusi-Seelanti on kaksi pitkää, vuorista saarta eteläisellä '
      + 'Tyynellämerellä. Polynesialaiset '
      + 'purjehtijat löysivät ne avomeren yli satoja vuosia ennen '
      + 'eurooppalaisia ja antoivat maalle nimen Aotearoa, pitkän '
      + 'valkoisen pilven maa. Eristys teki luonnosta ainutlaatuisen: '
      + 'maanisäkkäitä ei ollut lepakoita lukuun ottamatta, ja linnut '
      + 'ottivat niiden paikat.'
      + '\n\n'
      + 'Vuonna 1840 kruunu ja yli viisisataa päällikköä allekirjoittivat '
      + 'Waitangin sopimuksen, jonka englannin- ja māorinkielinen teksti '
      + 'lupasivat eri asiat — ja juuri siitä syntyivät Uuden-Seelannin '
      + 'sodat, jotka päättyivät vasta vuonna 1872. Vuonna 1873 rauha on '
      + 'siis vuoden vanha ja maakysymys yhä auki. **Māorikulttuuri elää '
      + 'vahvana**: kaiverretut kanootit, kokoontumispaikat ja kasvojen '
      + 'kuviot ovat arkea, eivät museotavaraa.'
      + '\n\n'
      + 'Etelässä Otagon kultaryntäys muutti maakunnan vuosikymmenessä, '
      + 'pohjoisessa Rotoruan geysirit ja Vaaleanpunaiset ja Valkoiset '
      + 'Terassit vetävät matkailijoita, ja lampaat kantavat taloutta. '
      + 'Isoisän matka osuu tähän hetkeen tarkasti: tulivuori vie '
      + 'terassit kolmentoista vuoden päästä, ja yhdeksän vuoden päästä '
      + 'laiva nimeltä Dunedin vie ensimmäisen jäähdytetyn lihalastin '
      + 'Lontooseen.',
  },
  /* Australian maaintro liitetty fragmentista 23.8.2026. */
  Australia: {
    intro: 'Australia ei ole vuonna 1873 vielä yksi maa vaan kuusi '
      + 'erillistä brittisiirtokuntaa, joilla on omat parlamenttinsa, '
      + 'lakinsa ja jopa raideleveytensä; liittovaltio syntyy vasta '
      + '1901. Aboriginaalikansat ovat asuttaneet mannerta 50 000–65 000 '
      + 'vuotta ja muodostaneet jopa viisisataa kieli- ja alueryhmää, '
      + 'joiden tähtitieto ja maanhoito ovat yhä käytössä. Viimeinen '
      + 'vankilaiva saapui Fremantleen 1868, joten rangaistussiirtolan '
      + 'aika on vasta juuri päättynyt. Kultaryntäykset kasvattivat '
      + 'väkiluvun 430 000:sta yli miljoonaan kymmenessä vuodessa ja '
      + 'tekivät Melbournesta suurimman kaupungin, ja hienovillaiset '
      + 'merinolampaat, joita tuotiin ensimmäisen kerran 1797, olivat jo '
      + '1844 puolet siirtokunnan viennistä. Mantereen eläimistö on niin '
      + 'omanlaisensa, että ensimmäiset tutkijat pitivät nokkasiippaa '
      + 'vuonna 1799 huijauksena. Edellisenä vuonna valmistunut '
      + 'mannertenvälinen lennätinlinja on juuri lopettanut Australian '
      + 'eristyneisyyden: viesti Eurooppaan kulkee nyt tunneissa eikä '
      + 'kuukausissa. Isoisän matkapäiväkirja saapuu mantereelle '
      + 'hetkellä, jolloin sen kuusi osaa ovat vasta löytämässä '
      + 'toisiaan.',
  },
  /* Brisbanen kaksi väkilukua eivät ole lehden omasta erästä, joten ne
   * on tarkistettu erikseen en-Wikipedian artikkelista Brisbane
   * 23.8.2026: Australian tilastokeskuksen arvio Greater Brisbanen
   * väestöstä on 2 833 524 (kesäkuu 2025) ja Kaakkois-Queenslandin
   * 4,1 miljoonaa (2024). Siksi tässä sanotaan kaupunkiseutu eikä
   * kaupunki — kaupungin oma luku on selvästi pienempi. */
  Brisbane: {
    intro: 'Brisbane on Queenslandin pääkaupunki ja Australian '
      + 'kolmanneksi väkirikkain kaupunki, ja se on rakennettu joen '
      + 'mutkien varaan noin viidentoista kilometrin päähän Moreton Bayn '
      + 'suulta. Keskusta seisoo niemekkeellä, jonka ympäri joki kaartaa '
      + 'lähes umpeen; turrbalin ja yagaran kielissä paikan nimi on '
      + '**Meanjin, myös Magandjin**. Seudulla on asuttu yli 22 000 '
      + 'vuotta.'
      + '\n\n'
      + 'Britit perustivat paikalle rangaistussiirtolan, ensin '
      + 'Redcliffeen 1824 ja jo seuraavana vuonna joen mutkaan. Siirtola '
      + 'suljettiin 1842, alue avattiin vapaalle asutukselle, ja '
      + 'kesäkuussa 1859 kuningatar Viktoria erotti Queenslandin omaksi '
      + 'siirtokunnaksi. Brisbanesta tuli sen pääkaupunki.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki rakensi itselleen julkiset '
      + 'talonsa. **Parlamenttitalon julkisivu oli avattu 1868, mutta '
      + 'pylväiköt valmistuivat vasta 1878**, pääposti oli ollut auki '
      + 'vuoden ja sen tiloissa asui Queenslandin museo, ja Wickham '
      + 'Terracen tuulimylly oli jo puolen vuosisadan ikäinen '
      + 'signaaliasema. Story Bridgeä ja South Bankin puistoja ei ollut: '
      + 'ne ovat vuosilta 1940 ja 1992.',
    teksti: 'Brisbane sijaitsee Australian itärannikolla Queenslandin '
      + 'kaakkoiskulmassa. Keskusta on Brisbane-joen niemekkeellä, ja '
      + 'kaupunki leviää joen tulvatasangolle Tyynenmeren ja Taylorin ja '
      + 'D’Aguilarin vuorijonojen väliin. Rannikko jatkuu etelään Gold '
      + 'Coastin ja pohjoiseen Sunshine Coastin hiekkarantoina.'
      + '\n\n'
      + 'Kaupunki alkoi rangaistussiirtolana 1824 ja tuli Queenslandin '
      + 'pääkaupungiksi 1859. Vuosisadan loppu oli satamakaupungin aikaa: '
      + 'joki oli tie Ipswichiin siihen asti kun rautatie valmistui 1875, '
      + 'ja laivat toivat saksalaisia, skotlantilaisia ja irlantilaisia '
      + 'siirtolaisia. Helmikuun 1893 suurtulva peitti kaupungin alavat '
      + 'osat ja vei mukanaan ensimmäisen Victoria Bridgen.'
      + '\n\n'
      + 'Nykyään Brisbanen kaupunkiseudulla asuu noin 2,8 miljoonaa '
      + 'ihmistä ja koko Kaakkois-Queenslandissa 4,1 miljoonaa. Joki on yhä kulkuväylä: '
      + 'CityCat-katamaraanit kuuluvat samaan lippujärjestelmään kuin '
      + 'bussit ja junat. Kaupungin esikaupungit tunnistaa tolppien '
      + 'päälle nostetuista puutaloista, joiden verannat tehtiin '
      + 'subtrooppista ilmastoa varten.',
  },
  /* PERTH (23.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain perth): väitteet on luettu
   * en-Wikipedian raakateksteistä 23.8.2026, ja pohjana ovat
   * faktapohja-perth.md ja tarkistus-perth.md. AVAIN ON WIKI-OTSIKKO
   * 'Perth (Länsi-Australia)', koska js/packs/oceania.js antaa Perthille
   * juuri sen wiki-nimen (suomeksi pelkkä Perth on täsmennyssivu) ja
   * ui.js hakee taulusta arvolla city.wiki ?? city.name — pelkällä
   * nimellä 'Perth' merkintä ei löytyisi lainkaan. Tarkistusraportin
   * korjaus näkyy myös täällä: kuvernöörintalon paikkaa ei väitetä
   * samaksi kuin Stirlingin telttaleirin. Eristyneisyyttä, Jakarta-
   * vertailua eikä Fremantle Doctorin viilennystä ei mainita, koska ne
   * ovat laudan OCEANIA_FACTS-kohdan omia faktoja. */
  'Perth (Länsi-Australia)': {
    intro: 'Perth on Länsi-Australian pääkaupunki ja Australian '
      + 'neljänneksi väkirikkain kaupunki. Se on rakennettu Swan-joen '
      + 'pohjoisrannalle sinne, missä Mount Elizan juurella pulppusi '
      + 'seudun ainoa ympärivuotinen makean veden lähde. '
      + 'Whadjuk-noongarit tunsivat lähteen nimellä **Goonininup** ja '
      + 'kaupungin paikan nimellä Boorloo kauan ennen kuin siirtokunta '
      + 'perustettiin 1829.'
      + '\n\n'
      + 'Kaupunki kasvoi hitaasti. Kun muu Australia oli lopettamassa '
      + 'rangaistusvankien tuontia, Länsi-Australia pyysi 1850 '
      + 'itselleen vankeja työvoimapulan takia: kahdeksassatoista '
      + 'vuodessa saapui 9 721 vankia, enemmän kuin siirtokunnassa oli '
      + 'vapaita uudisasukkaita. Heidän työnsä jälki on yhä keskustassa, '
      + 'kaupungintalossa ja kuvernöörintalossa.'
      + '\n\n'
      + '**Isoisän matkan vuonna 1873 järjestelmä oli juuri purettu**: '
      + 'viimeinen vankilaiva oli tullut 1868 ja vankien pääjohtajan '
      + 'virka lakkautettu 1872. Perth oli silloin kolmentuhannen '
      + 'asukkaan pikkukaupunki, jonka sivukadut olivat paljasta '
      + 'hiekkaa. Kultaryntäys tuli vasta kahdenkymmenen vuoden päästä '
      + 'ja muutti kaiken.',
    teksti: 'Perth on Australian lounaiskulmassa, ja suurin osa '
      + 'kaupungista on Swanin rannikkotasangolla Intian valtameren ja '
      + 'Darling-jyrkänteen välissä. Keskusta on Swan-joen '
      + 'pohjoisrannalla siinä kohdassa, jossa joki levenee Perth '
      + 'Wateriksi, ja satamakaupunki Fremantle on joen suulla '
      + 'lounaassa.'
      + '\n\n'
      + 'Siirtokunta perustettiin 1829, ja se otti vastaan '
      + 'rangaistusvankeja 1850–1868. Kaupungintalo valmistui 1870 ja '
      + 'Mount Elizan rinne rauhoitettiin puistoksi 1871. Kultalöydöt '
      + 'Coolgardiessa, Kalgoorliessa ja Murchisonissa kasvattivat '
      + 'siirtokunnan väkiluvun 23 000:sta 180 000:een vuosisadan '
      + 'vaihteeseen mennessä, ja rahapaja avattiin 1899.'
      + '\n\n'
      + 'Nykyään Suur-Perthissä asuu yli 2,3 miljoonaa ihmistä. Kings '
      + 'Park on Länsi-Australian suosituin yksittäinen käyntikohde, ja '
      + 'whadjuk-noongarien maankäyttösopimus Perthin alueesta '
      + 'vahvistettiin liittovaltion tuomioistuimessa joulukuussa 2021.',
  },
  /* ADELAIDE (24.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain adelaide): väitteet on luettu
   * en-Wikipedian raakateksteistä 24.8.2026, ja pohjana ovat
   * faktapohja-adelaide.md sekä tarkistus-adelaide.md (jälkimmäinen ei ole
   * työpuussa vaan committissa 5536e097). AVAIN ON WIKI-OTSIKKO 'Adelaide',
   * koska js/packs/oceania.js antaa kaupungille juuri sen wiki-nimen ja
   * ui.js hakee taulusta arvolla city.wiki ?? city.name. Tarkistusraportin
   * pakolliset korjaukset eivät kosketa tätä merkintää, mutta sen linja on
   * sama: kaurnat nimetään omalla nimellään ennen siirtomaanimiä ja
   * näytetään elävänä kansana. Rundle Mallia, Barossaa ja puistovyöhykettä
   * käsitellään lyhyesti, koska ne ovat laudan OCEANIA_FACTS- ja
   * kulttuurivisan omia aiheita — intro ei toista niiden sanamuotoja.
   * Ivaritjin kohdalla käytetään "Kaurna"-artikkelin varovaista muotoilua:
   * hän oli todennäköisesti viimeinen täysin kaurnalaista syntyperää ollut
   * ihminen ja kielen viimeinen tunnettu puhuja ennen sen elvytystä. */
  Adelaide: {
    intro: 'Adelaide on Etelä-Australian pääkaupunki ja Australian '
      + 'viidenneksi väkirikkain kaupunki. Se sijaitsee Adelaiden tasangolla '
      + 'Saint Vincentin lahden ja Mount Lofty Rangesin välissä, mantereen '
      + 'etelärannikolla. Kaurnat ovat tasangon perinteinen kansa, ja '
      + 'kaupungin keskustan kaurnankielinen nimi on **Tarndanya**, punaisen '
      + 'kengurun kallio.'
      + '\n\n'
      + 'Kaupunki suunniteltiin ennen kuin sitä oli. Siirtokunta perustettiin '
      + 'Edward Gibbon Wakefieldin teorian varaan vapaiden siirtolaisten '
      + 'maaksi, hallinto julistettiin alkaneeksi 28. joulukuuta 1836, ja '
      + 'eversti William Light piirsi seuraavana vuonna ruutukaavan viisine '
      + 'aukioineen ja sitä kiertävine puistorenkaineen. '
      + '**Vankisiirtolan menneisyyttä Adelaidella ei ole** — toisin kuin '
      + 'Sydneyllä, Brisbanella ja Hobartilla.'
      + '\n\n'
      + 'Isoisän matkan vuonna kaupunki oli vasta kolmenkymmenenseitsemän '
      + 'vuoden ikäinen, ja sen uusi krikettikenttä Adelaide Oval avattiin '
      + 'lauantaina 13. joulukuuta 1873. Ympäristöön oli jo asettunut '
      + 'saksalaisia luterilaisia, jotka olivat tuoneet mukanaan '
      + 'viiniköynnökset.',
    teksti: 'Adelaide on kapea kaupunkinauha Etelä-Australian rannikolla: '
      + 'rannalta Mount Lofty Rangesin juurelle on parikymmentä kilometriä, '
      + 'mutta pohjoisesta etelään nauha venyy Gawlerista Sellicks Beachille '
      + 'lähes sata kilometriä. Keskusta on Torrens-joen eteläpuolella ja '
      + 'North Adelaide sen pohjoispuolella; molempia kiertää sama '
      + 'puistovyöhyke.'
      + '\n\n'
      + 'Siirtokunta julistettiin 1836 ja kaupunki kaavoitettiin 1837. '
      + 'Krikettikenttä avattiin 1873, Torrens padottiin altaaksi 1881, ja '
      + '1890-luvun lamasta selvittiin viinin ja kuparin varassa. '
      + 'Ensimmäisen maailmansodan aikana seudun saksalaiset paikannimet '
      + 'vaihdettiin, ja vanhat nimet palautettiin vasta 1935.'
      + '\n\n'
      + 'Nykyään suuralueella asuu noin 1,47 miljoonaa ihmistä. Maaliskuussa '
      + '2018 kaurnat tunnustettiin koko Adelaiden alueen perinteisiksi '
      + 'omistajiksi, ja joulukuussa 2021 kaupunki sai maailman toisena '
      + 'National Park City -nimityksen.',
  },
  /* HOBART (24.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain hobart): väitteet on luettu
   * en-Wikipedian raakateksteistä 24.8.2026, ja pohjana ovat
   * faktapohja-hobart.md sekä riippumaton tarkistus-hobart.md (ei tässä
   * työpuussa, luettu commitista 0b8a3a1b). AVAIN ON WIKI-OTSIKKO
   * 'Hobart', koska js/packs/oceania.js antaa Hobartille juuri sen
   * wiki-nimen ja ui.js hakee taulusta arvolla city.wiki ?? city.name.
   * Tarkistuksen korjaus näkyy myös täällä: perustamiskuukausi on
   * HELMIKUU 1804 (infolaatikko 20.2., Sullivans Cove -artikkeli 21.2.),
   * ei elokuu. Kulttuurivisan vastausta "rangaistussiirtola ja satama"
   * ei toisteta sanamuotona: introssa sanotaan, että Britannia perusti
   * paikan ottaakseen vastaan kotimaassa tuomittuja. Port Arthuria ei
   * mainita täällä lainkaan — se on eri paikkakunta 97 km:n päässä ja
   * kerrotaan lehden historia-sivulla. */
  Hobart: {
    intro: 'Hobart on Tasmanian pääkaupunki ja Australian eteläisin '
      + 'osavaltiopääkaupunki. Se on rakennettu Derwentin suistoon, ja sen '
      + 'satama on maailman toiseksi syvin luonnonsatama. Kaupungin yllä '
      + 'kohoaa 1 271 metrin korkuinen **kunanyi eli Wellingtoninvuori**, '
      + 'ja maa, jolla kaupunki seisoo, tunnetaan muwinina-kansan nimellä '
      + 'nipaluna.'
      + '\n\n'
      + 'Britannia perusti paikan helmikuussa 1804 ottaakseen vastaan '
      + 'kotimaassa tuomittuja, ja Sydneyn jälkeen se on Australian vanhin '
      + 'pääkaupunki. Valaanpyynti nousi nopeasti pääelinkeinoksi: jonkin '
      + 'aikaa Hobart oli eteläisen valtameren tärkein valaanpyyntisatama. '
      + 'Vankikuljetusten päätyttyä 1850-luvulla kaupunki vuorotteli kasvun '
      + 'ja hiljaisten vuosikymmenten välillä.'
      + '\n\n'
      + '**Isoisän matkan vuonna 1873** Hobart oli jo mannermaan '
      + 'kultakaupunkien varjossa, mutta satamassa varustettiin yhä '
      + 'valaanpyytäjiä ja Derwentissä kävi Venäjän laivasto. Nykyään '
      + 'Suur-Hobartissa asuu noin 255 000 ihmistä, kaupunki on Australian '
      + 'ja Ranskan Etelämanner-ohjelmien kotisatama ja sen tunnetuin '
      + 'käyntikohde on kallioon louhittu MONA-taidemuseo.',
    teksti: 'Hobart on Tasmanian kaakkoiskulmassa Derwentin suistossa. '
      + 'Läntinen ranta kantaa vanhan keskustan, Salamanca Placen '
      + 'hiekkakivimakasiinit ja Battery Pointin, ja sen takaa maa nousee '
      + 'jyrkästi kunanyin rinteille; itäiselle rannalle mennään Tasman '
      + 'Bridgen yli.'
      + '\n\n'
      + 'Siirtokunta aloitti 1803 Risdon Covessa ja siirtyi helmikuussa 1804 '
      + 'vastarannalle Sullivans Coveen. Valaanpyynti alkoi Derwentissä 1805 '
      + 'ja oli huipussaan 1830-luvulla; viimeinen siirtomaakauden '
      + 'pyyntialus lähti kaupungista 1898. Theatre Royal avattiin 1837 ja '
      + 'kaupungintalo 1866, ja molemmat ovat yhä käytössä.'
      + '\n\n'
      + 'Tasmanian alkuperäiskansaa pidettiin pitkään virheellisesti '
      + 'sukupuuttoon kuolleena; Unesco poisti sitä väittäneen asiakirjan '
      + 'sivuiltaan huhtikuussa 2023. Kaupungin halki virtaavassa purossa '
      + 'elää villejä vesinokkaeläimiä, ja eteläiset sileävalaat ovat '
      + 'alkaneet palata jokisuistoon.',
  },
  'Darwin (Australia)': {
    intro: 'Darwin on Pohjoisterritorion pääkaupunki ja Australian '
      + 'pohjoisin, pienin ja sateisin osavaltiotason pääkaupunki. Se '
      + 'on rakennettu matalalle törmälle Darwin Harbourin yllä, ja '
      + 'larrakia-kansa on tuntenut paikan nimellä **Garramilla**, '
      + '"valkoinen kivi", kauan ennen eurooppalaisia. Nimen Port '
      + 'Darwin antoi 1839 HMS Beaglen päällikkö John Clements Wickham '
      + 'luonnontieteilijä Charles Darwinin mukaan.'
      + '\n\n'
      + 'Asutus syntyi vasta 1869, kun Etelä-Australian maanmittari '
      + 'George Goyder pystytti Fort Hillin juurelle 135 hengen leirin '
      + 'ja nimesi sen Palmerstoniksi. **Vuosi ennen isoisän matkaa, '
      + 'elokuussa 1872, valmistui ylimaalinnettu lennätinlinja**, joka '
      + 'yhdisti Adelaiden Darwiniin; Jaavan merikaapeli oli tuotu '
      + 'rantaan jo edellisenä marraskuuna, ja viestin matka Eurooppaan '
      + 'lyheni kuukausista tunteihin. Kaupunki sai nimekseen Darwin '
      + 'vasta 1911.'
      + '\n\n'
      + 'Darwin on rakennettu lähes kokonaan uudelleen neljä kertaa: '
      + 'kahden hirmumyrskyn, sodanaikaisten pommitusten ja hirmumyrsky '
      + 'Tracyn jäljiltä. Nykyinen kaupunki on siksi nuori, ja siinä '
      + 'asuu vajaat 140 000 ihmistä eli lähes kaksi kolmasosaa koko '
      + 'territorion väestöstä.',
    teksti: 'Darwin on Australian pohjoisrannikolla kapealla niemellä '
      + 'sataman ja avomeren välissä. Ilmasto on trooppista savannia: '
      + 'päivän ylin lämpötila on lähes sama ympäri vuoden, ja vuoden '
      + 'jakaa kahtia sade. Stuart Highway alkaa täältä ja jatkuu halki '
      + 'mantereen Port Augustaan asti, ja Kaakkois-Aasia on lähempänä '
      + 'kuin Australian eteläiset suurkaupungit.'
      + '\n\n'
      + 'Kultakentät ja Palmerstonista Pine Creekiin rakennettu rautatie '
      + 'toivat 1870-luvulla suuren joukon kiinalaisia työläisiä, ja '
      + 'kaupungin sydämeen syntyi 1874 Chinatown. Se hävitettiin maan '
      + 'tasalle 1942, kun japanilaiset pommittivat satamaa ja '
      + 'kaupunkia; jouluna 1974 hirmumyrsky Tracy kaatoi lopun. '
      + 'Kaupunki rakennettiin joka kerta uudelleen samalle paikalle.'
      + '\n\n'
      + 'Nykyään Mindil Beachin auringonlaskumarkkinat kokoontuvat '
      + 'kuivan kauden iltoina, ja laksa-nuudelikeitto on kaupungin '
      + 'suosikkiruoka. Vuonna 1997 perustettu Larrakia Nation '
      + 'Aboriginal Corporation edustaa seudun alkuperäisiä asukkaita, '
      + 'ja maaliskuussa 2021 yksi kaupungin rannoista sai takaisin '
      + 'larrakia-nimensä Bundilla Beach.',
  },
  /* PORT MORESBY (24.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain portmoresby): väitteet on
   * luettu en-Wikipedian raakateksteistä 24.8.2026, ja pohjana ovat
   * faktapohja-portmoresby.md sekä sen riippumaton tarkistus
   * tarkistus-portmoresby.md (commit 1fa359ae), joka voittaa
   * ristiriidoissa. AVAIN ON WIKI-OTSIKKO 'Port Moresby', jonka
   * js/packs/oceania.js antaa kaupungille sekä wiki- että
   * näyttönimeksi; ui.js hakee taulusta arvolla city.wiki ?? city.name.
   *
   * Vuosi 1873 on nostettu heti toiseen kappaleeseen, koska se on
   * isoisän matkan vuosi: kapteeni John Moresby purjehti tänne HMS
   * Basiliskilla HELMIKUUSSA 1873 ja nimesi ankkuripaikan. Aiempi
   * asutus sanotaan ENNEN sitä — motut ja koitabut omistavat paikan
   * maat yhä — jottei nimeäminen näytä paikan syntyhetkeltä. Sama
   * ratkaisu kuin lehden nostossa K1.
   *
   * Kulttuurivisan (js/packs/oceania-questions.js) vastauksista maa ja
   * saari löytyvät tästä introsta; kielten määrä, vuoristosyy ja tok
   * pisin ovat lehden matkaoppaan jaksossa 3. */
  'Port Moresby': {
    intro: 'Port Moresby on Papua-Uuden-Guinean pääkaupunki ja maan '
      + 'suurin kaupunki. Se on Uuden-Guinean saaren eteläisellä '
      + 'rannikolla Korallimeren rannalla, kukkuloiden ja lahtien väliin '
      + 'levinneenä. Paikka, jolle kaupunki nousi, on ollut motu- ja '
      + 'koitabu-kansojen asuinseutua vuosisatoja, ja he omistavat sen '
      + 'maat yhä.'
      + '\n\n'
      + '**Helmikuussa 1873 — isoisän matkan vuonna — kuningattaren '
      + 'laivaston kapteeni John Moresby purjehti tänne HMS '
      + 'Basiliskilla** kartoittamaan saaren etelärannikkoa. Hän nimesi '
      + 'lahden isänsä Fairfax Moresbyn mukaan ja merkitsi Paga-kukkulan '
      + 'edustan ankkuripaikan kartoilleen nimellä Port Moresby. '
      + 'Marraskuussa 1873 saapuivat ensimmäiset lähetysseuran '
      + 'opettajat, ja 1885 erikoiskomissaari valitsi paikan siirtomaan '
      + 'hallintopaikaksi.'
      + '\n\n'
      + 'Itsenäisyys tuli syyskuussa 1975, ja Waiganin uudelle '
      + 'hallintoalueelle rakennettiin parlamentti, kansallismuseo ja '
      + 'kirjasto. **Vuoden 2024 väestönlaskennassa kaupungissa asui '
      + '756 754 ihmistä** — yli kaksinkertaisesti enemmän kuin vuonna '
      + '2011.',
    teksti: 'Port Moresby on Uuden-Guinean saaren kaakkoisniemellä, '
      + 'Korallimeren rannalla. Kaupunki levittäytyy kukkuloiden ja '
      + 'lahtien väliin: vanha keskusta on Paga- ja Touaguba-kukkuloiden '
      + 'välisellä kannaksella sataman äärellä, uusi hallintoalue '
      + 'Waigani noin seitsemän kilometrin päässä koilliseen. Ilmasto on '
      + 'trooppista savannia ja kuivempi kuin missään muualla '
      + 'Uudella-Guinealla.'
      + '\n\n'
      + 'Motu- ja koitabu-kansat asuivat rannikolla ja sisämaan '
      + 'kukkuloilla jo ennen eurooppalaisia. Kapteeni John Moresby '
      + 'kartoitti sataman 1873, Britannia julisti alueen '
      + 'suojelualueekseen 1884 ja Australia hallitsi Papuaa vuodesta '
      + '1906. Toisessa maailmansodassa kaupunki oli liittoutuneiden '
      + 'viimeinen tukikohta saarella.'
      + '\n\n'
      + 'Nykyään Port Moresby on lounaisen Tyynenmeren suurimpia '
      + 'kaupunkeja Australian ja Uuden-Seelannin ulkopuolella. '
      + 'Kaupungin alkuperäisiä maanomistajia edustaa Motu Koita '
      + 'Assembly, joka hallinnoi kymmentä tunnustettua kylää — ainoa '
      + 'laatuaan koko maassa.',
  },
  /* CHRISTCHURCH (24.8.2026). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain christchurch): väitteet on
   * luettu en-Wikipedian raakateksteistä 24.8.2026, ja pohjana ovat
   * faktapohja-christchurch.md sekä sen riippumaton tarkistus
   * tarkistus-christchurch.md, joka voittaa ristiriidoissa. AVAIN ON
   * WIKI-OTSIKKO 'Christchurch', jonka js/packs/oceania.js antaa
   * kaupungille sekä wiki- että näyttönimeksi.
   *
   * Vuosi 1873 on nostettu toisen kappaleen loppuun, koska se on
   * isoisän matkan vuosi: ChristChurch-katedraalin rakennustyö
   * käynnistyi uudelleen juuri silloin, kun Benjamin Mountfort otti
   * hankkeen johtoonsa kahdeksan vuoden rahapulakatkon jälkeen.
   * Waitaha, kāti māmoe ja kāi tahu sanotaan ENNEN Canterbury-
   * yhdistystä, jottei siirtokunnan perustaminen näytä seudun
   * alkuhetkeltä.
   *
   * VISASÄÄNTÖ (js/packs/oceania-questions.js, kohta christchurch):
   * kysymyksen 1 vastaus "Eteläsaari" on tässä introssa, ja se
   * sanotaan koko lehdessä vain kahdesti — tässä ja lehden
   * Matkailijalle-kappaleessa. Muut neljä vastausta ovat lehden
   * puolella (Eteläiset Alpit ja Canterburyn tasanko oppaan jaksossa
   * 2, vuoden 2011 järistys nostoissa H2–H4, puutarhakaupunki
   * nostossa L1). Visan fact-kenttien sanamuotoja ei toisteta.
   *
   * 15.3.2019 moskeija-isku on jätetty kokonaan pois tehtävänannon
   * mukaisesti, ja maanjäristykset kerrotaan toteavasti lukuina ilman
   * uhrien kärsimyksen kuvailua. */
  Christchurch: {
    intro: 'Christchurch — māoriksi Ōtautahi — on Uuden-Seelannin '
      + 'Eteläsaaren suurin kaupunki. Se lepää lähes tasaisena '
      + 'Canterburyn tasangolla meren ja Port Hillsin kukkuloiden '
      + 'välissä, ja lännessä horisontin sulkevat Eteläiset Alpit. '
      + 'Keskustan halki mutkittelee Avon-joki, jonka kāi tahun nimi on '
      + 'Ōtākaro. Seutu oli waitahan, kāti māmoen ja kāi tahun maata '
      + 'vuosisatoja ennen ensimmäistäkään purjetta.'
      + '\n\n'
      + 'Canterbury-yhdistys perustettiin Lontoossa 1848 pystyttämään '
      + 'Uuteen-Seelantiin anglikaanista ihannesiirtokuntaa, jonka '
      + 'keskiöön nousisi katedraali ja korkeakoulu. Ensimmäiset neljä '
      + 'laivaa toivat siirtolaiset Lyttelton Harbouriin joulukuussa '
      + '1850, ja **kuninkaallinen patenttikirje teki Christchurchistä '
      + 'kaupungin 31. heinäkuuta 1856, maan ensimmäisen**. Isoisän '
      + 'matkan vuonna 1873 katedraalin rakennustyö käynnistyi '
      + 'uudelleen kahdeksan vuoden rahapulatauon jälkeen.'
      + '\n\n'
      + '**Vuosien 2010 ja 2011 maanjäristykset veivät keskustasta '
      + 'tornitalot ja katedraalin tornin**, ja kaupunki on rakentanut '
      + 'ytimensä sen jälkeen uusiksi. Nyt siellä on pahviputkista '
      + 'tehty kirkko, katettu stadion ja satoja kilometrejä '
      + 'pyöräteitä.',
    teksti: 'Christchurch on Canterburyn tasangolla, jonka jäätiköiden '
      + 'kuljettama sora ulottuu Port Hillsin kukkuloilta Eteläisten '
      + 'Alppien juurelle. Tasangon joet juoksevat leveissä punoksissa '
      + 'kivikkoisissa uomissaan, ja kaupungin läpi kulkeva Avon River '
      + '/ Ōtākaro on niistä hitain.'
      + '\n\n'
      + 'Waitaha asutti seutua 1200-luvun puolivälistä, kāti māmoe '
      + '1500-luvulta ja kāi tahu sata vuotta myöhemmin. '
      + 'Canterbury-yhdistyksen siirtolaiset saapuivat 1850, ja '
      + 'kaupunki teollistui 1900-luvun alussa niin nopeasti, että '
      + 'asukasluku ylitti 100 000 vuonna 1919.'
      + '\n\n'
      + 'Nykyinen Christchurch on jälleenrakennuksen kaupunki. '
      + 'Keskustan tyhjille tonteille on noussut kirjasto Tūranga, '
      + 'kongressikortteli ja katettu stadion, ja tyhjiksi jääneistä '
      + 'jokivarsilähiöistä kaavaillaan yhtenäistä puistoa. Vanha '
      + 'raitiovaunu kiertää yhä silmukkaansa aidatun katedraalin ohi, '
      + 'jonka korjaustyön ensimmäisen vaiheen on määrä valmistua '
      + 'vuoteen 2030 mennessä.',
  },
};
