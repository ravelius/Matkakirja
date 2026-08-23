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
      + 'Nykyään Brisbanessa asuu noin 2,8 miljoonaa ihmistä ja koko '
      + 'Kaakkois-Queenslandissa 4,1 miljoonaa. Joki on yhä kulkuväylä: '
      + 'CityCat-katamaraanit kuuluvat samaan lippujärjestelmään kuin '
      + 'bussit ja junat. Kaupungin esikaupungit tunnistaa tolppien '
      + 'päälle nostetuista puutaloista, joiden verannat tehtiin '
      + 'subtrooppista ilmastoa varten.',
  },
};
