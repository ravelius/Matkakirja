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
};
