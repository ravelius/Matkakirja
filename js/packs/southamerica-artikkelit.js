// Matkakirjan omat artikkelit Etelä-Amerikan kaupungeista.
//
// Tiedosto perustettiin 23.8.2026 Rio de Janeiron kaupunkilehden
// yhteydessä (E-Amerikan laudan pilottikaupunki ja laudan
// lähtökaupunki). Malli on northamerica-artikkelit.js, ja rakenne on
// täsmälleen sama:
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
// Avaimena on wiki-otsikko, sama jolla cachedSummary hakee — Rion
// kohdalla js/packs/southamerica.js antaa sekä wiki-nimeksi että
// näyttönimeksi 'Rio de Janeiro', joten avain on 'Rio de Janeiro'.
// Taulu yhdistetään muiden lautojen tauluihin js/sisaltotaulut.js:ssä.
//
// Ei ylisanoja eikä huutomerkkejä: nuoren herran innostus kuuluu
// saapumistekstissä, ja tämä on se rauhallinen ääni, joka kertoo
// taustan.
//
// RIO DE JANEIRO (23.8.2026): jokainen väite tulee samasta erästä kuin
// lehden tekstit (js/packs/kulttuuri-kategoriat.js, avain rio), ja ne
// on tarkistettu en-Wikipedian raakateksteistä 23.8.2026 — uusia
// lähdehakuja ei tarvittu. Sisältölinjaus on spec-mantereet.md:n
// E-Amerikka-osio: siirtomaahistoria ja orjuus kerrotaan tapahtumina
// neutraalisti ja kaunistelematta, ei nykypolitiikkaa eikä
// nykyrikollisuutta. Vuoden 1873 kulma on introssa mukana, koska se on
// koko lehden kantava aihe: isoisän vierailun aikaan Rio oli
// keisarikunnan pääkaupunki ja orjuus oli yhä laillista.
export const SOUTHAMERICA_ARTIKKELIT = {
  'Rio de Janeiro': {
    intro: 'Rio de Janeiro on São Paulon jälkeen Brasilian toiseksi suurin '
      + 'kaupunki, ja se on ahtautunut kapeille rannoille Guanabaran lahden '
      + 'suulla, jyrkkien graniittikukkuloiden ja meren väliin. Nimi '
      + 'tarkoittaa tammikuun jokea: portugalilaiset purjehtivat lahdelle '
      + '1. tammikuuta 1502 ja luulivat sitä joen suuksi.'
      + '\n\n'
      + 'Estácio de Sá perusti kaupungin 1. maaliskuuta 1565, ja siitä '
      + 'tuli 1763 siirtomaan pääkaupunki. **Vuonna 1808 koko Portugalin '
      + 'hovi pakeni Napoleonia Rioon — ainoa kerta uuden ajan '
      + 'historiassa, kun siirtomaita hallinneen maan pääkaupunki muutti '
      + 'omaan siirtomaahansa.** Itsenäistymisen 1822 jälkeen kaupunki '
      + 'jatkoi keisarikunnan pääkaupunkina, ja pääkaupunkina se pysyi '
      + 'vuoteen 1960.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Rio oli keisari Pedro II:n pääkaupunki '
      + 'ja kahvitalouden sydän. **Orjuus oli yhä laillista:** vuoden 1871 '
      + 'vapaan kohdun laki oli vapauttanut orjuutettujen naisten uudet '
      + 'lapset, mutta yli miljoona ihmistä oli edelleen orjia, ja '
      + 'Brasilia lakkautti orjuuden viimeisenä maana Amerikassa vasta '
      + '1888. Corcovadon huipulla ei ollut patsasta eikä Sokerileivälle '
      + 'noussut köysirataa.',
    teksti: 'Rio de Janeiro on Brasilian kaakkoisrannikolla Guanabaran '
      + 'lahden suulla. Kaupunki on rakennettu kapeille rannoille '
      + 'graniittikukkuloiden väliin, ja sen keskellä kasvaa Tijucan '
      + 'sademetsä — maailman toiseksi suurin kaupungin ympäröimä metsä, '
      + 'joka on kokonaan uudelleen istutettua.'
      + '\n\n'
      + 'Kaupunki perustettiin 1565 puolustamaan lahtea ranskalaisilta. '
      + 'Sen satama oli 1800-luvun alussa koko Amerikan vilkkain '
      + 'orjakauppapaikka: Valongon laiturille nousi 1811–1831 arviolta '
      + 'puolesta miljoonasta miljoonaan orjuutettua afrikkalaista. Rio '
      + 'oli Brasilian pääkaupunki 1763–1960, ensin siirtomaan, sitten '
      + 'Portugalin valtakunnan, keisarikunnan ja lopulta tasavallan.'
      + '\n\n'
      + 'Nykyään kaupungissa asuu kuusi miljoonaa ihmistä ja sen '
      + 'metropolialueella kolmetoista miljoonaa. Vuorten ja meren väliin '
      + 'jäävä kaupunkimaisema on ollut Unescon maailmanperintökohde '
      + '2012 lähtien, ja Valongon laituri omana kohteenaan 2017 lähtien.',
  },
};
