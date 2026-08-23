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
};
