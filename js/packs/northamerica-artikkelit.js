// Matkakirjan omat artikkelit Pohjois-Amerikan kaupungeista.
//
// Sama muoto ja sama tehtävä kuin AFRICA-, EUROPE- ja
// ASIA_ARTIKKELIT-tauluilla (ks. js/packs/asia-artikkelit.js:n
// otsake): avaimena on kaupungin wiki-otsikko, jolla ui.js hakee
// tekstin lehden etusivulle (ARTIKKELIT[city.wiki ?? city.name]).
//
//   intro   — lehden ETUSIVUN LEIPÄTEKSTI: 7–10 virkkeen johdatus
//             kaupunkiin (~700–1100 merkkiä), 2–3 kappaletta
//             '\n\n'-rajalla ja 1–3 maltillista **lihavointia**.
//             Renderöijä tekee kappaleet ja boldit — ei HTML:ää tänne.
//   teksti  — kolme kappaletta, yhteensä 600–1100 merkkiä: missä
//             ollaan, mitä täällä on tapahtunut, millaista täällä on
//             nyt (Lue lisää -näkymä).
//
// Tämä tiedosto syntyi P-Amerikan laudan pilottikaupungin
// (San Francisco) mukana. Fablen päätös 22.8.2026
// (docs/mantereet-tyoaineisto/spec-mantereet.md, "Fablen päätökset
// USA-faktapohjan avoimiin kysymyksiin", kohta 1): P-Amerikan introt
// asuvat omassa paketissaan eivätkä Aasian taulussa.
//
// LÄHTEET. San Franciscon jokainen väite on tarkistettu
// en-Wikipedian raakateksteistä 22.–23.8.2026 (artikkelit
// "San Francisco", "Clay Street Hill Railroad", "San Francisco cable
// car system", "Chinatown, San Francisco") ja kaupungin omista, jo
// tarkistetuista lehtiteksteistä (kulttuuri-kategoriat.js).
// Työaineisto: docs/mantereet-tyoaineisto/faktapohja-sanfrancisco.md
// ja tarkistus-sanfrancisco.md.
//
// Sisältölinjaus (spec-mantereet.md): alkuperäiskansa nimetään omalla
// nimellään ennen siirtomaanimiä, ja vuoden 1906 katastrofi kerrotaan
// perushistoriana. Ei nykypolitiikkaa eikä nykyrikollisuutta.
export const NORTHAMERICA_ARTIKKELIT = {
  'San Francisco': {
    intro: 'San Francisco seisoo Kalifornian rannikolla, kapean niemen '
      + 'pohjoiskärjessä Tyynenmeren ja suojaisan lahden välissä. '
      + 'Kaupungin rajojen sisällä on yli viisikymmentä kukkulaa, ja '
      + 'mannerosaa kuvataan paikallisesti seitsemän kertaa seitsemän '
      + 'mailin neliöksi. Asukkaat puhuvat siitä yksinkertaisesti '
      + 'nimellä the City.'
      + '\n\n'
      + 'Ennen espanjalaisia rannan kylissä asui ramaytush-ohlonien '
      + 'yelamu-ryhmä, jonka kielessä paikka oli Ahwaste. '
      + 'Espanjalaiset perustivat 1776 Presidion ja Mission Doloresin, '
      + 'ja kauppapaikka Yerba Buena nimettiin 1847 San Franciscoksi. '
      + '**Vuoden 1848 kultalöytö kasvatti tuhannen asukkaan kylän '
      + '25 000 asukkaan kaupungiksi vuoden '
      + '1849 loppuun mennessä.**'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Clay Streetillä alkoi maailman '
      + 'ensimmäisen kaapeliraitiotien säännöllinen liikenne, ja samat '
      + 'vaunut kiipeävät mäkiä yhä. **Vuoden 1906 maanjäristys ja sitä '
      + 'seurannut tulipalo tuhosivat yli kolme neljäsosaa '
      + 'kaupungista**, mutta jälleenrakennus oli nopeaa ja kaupunki '
      + 'juhli toipumistaan maailmannäyttelyssä 1915. Kaupunki '
      + 'tunnetaan kukkuloistaan, kesäsumustaan ja Pohjois-Amerikan '
      + 'vanhimmasta kiinalaiskorttelista.',
    teksti: 'San Francisco on Kalifornian rannikolla, San Francisco '
      + 'Peninsulan pohjoiskärjessä. Lännessä on Tyynimeri, idässä ja '
      + 'pohjoisessa lahti, ja kaupungin rajojen sisään kuuluu myös '
      + 'saaria: Alcatraz, Treasure Island ja Yerba Buena Island. '
      + 'Ilmasto on lämpimän kesän välimerenilmastoa, jota meren kylmä '
      + 'virtaus viilentää ympäri vuoden.'
      + '\n\n'
      + 'Espanjalaiset perustivat paikalle linnoituksen ja '
      + 'lähetysaseman 1776, ja meksikolaisesta Yerba Buenan '
      + 'kauppapaikasta tuli 1847 San Francisco. Kultaryntäys teki '
      + 'siitä kahdessa vuodessa kymmenientuhansien kaupungin, ja '
      + 'satamaan jäi mastojen metsä hylättyjä laivoja. Vuoden 1906 '
      + 'maanjäristys ja tulipalo tuhosivat suurimman osan kaupungista, '
      + 'mutta se rakennettiin nopeasti uudelleen.'
      + '\n\n'
      + 'Kaapeliraitiovaunut ovat yhä osa joukkoliikennettä, ja '
      + 'kesäiltapäivisin sumu vyöryy Golden Gaten salmesta sisään. '
      + 'Kaupungissa on Pohjois-Amerikan vanhin kiinalaiskortteli, ja '
      + 'se on lahden alueen talouden keskuksia.',
  },
};
