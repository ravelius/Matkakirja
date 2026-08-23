// Buenos Airesin ARTIKKELIT-lohko — LIITETTÄVÄ FRAGMENTTI, ei moduuli.
//
// Miksi tämä on omana tiedostonaan (Fablen ohje 23.8.2026): Etelä-Amerikan
// laudan kaksi lehtikirjoittajaa työskentelivät rinnakkain omissa
// worktreissään, ja js/packs/southamerica-artikkelit.js:n LUO Rion
// kirjoittaja. Jos molemmat olisivat luoneet saman tiedoston, tuloksena
// olisi ollut koko tiedoston kokoinen ristiriita. Buenos Airesin osuus
// kirjoitettiin siksi tähän, ja Fable liittää sen paikalleen.
//
// LIITTÄMISOHJE: kopioi alla oleva 'Buenos Aires' -avain sellaisenaan
// js/packs/southamerica-artikkelit.js:n SOUTHAMERICA_ARTIKKELIT-olioon.
// Avain on wiki-otsikko, sama jolla cachedSummary hakee — js/packs/
// southamerica.js antaa buenosairesille sekä wiki-nimeksi että
// näyttönimeksi 'Buenos Aires'. Rakenne on täsmälleen sama kuin
// js/packs/northamerica-artikkelit.js:ssä:
//
//   intro   — lehden ETUSIVUN LEIPÄTEKSTI: 7–10 virkettä, ~700–1100
//             merkkiä, 2–3 kappaletta '\n\n'-rajalla, 1–3 maltillista
//             **lihavointia**. Renderöijä tekee kappaleet ja boldit.
//   teksti  — kolme kappaletta, 600–1100 merkkiä (Lue lisää -dialogi).
//
// FAKTAT: docs/mantereet-tyoaineisto/faktapohja-buenosaires.md ja sen
// riippumaton tarkistus tarkistus-buenosaires.md (molemmat 23.8.2026,
// en-Wikipedian artikkelit Buenos Aires, Domingo Faustino Sarmiento,
// Casa Rosada, Immigration to Argentina, Tango). Samat väitteet kuin
// lehden teksteissä (js/packs/kulttuuri-kategoriat.js, avain
// buenosaires) — uusia lähdehakuja ei tarvittu.
//
// TANGO-ANAKRONISMI on kirjoitettu introon näkyviin tarkoituksella:
// tango syntyi vasta 1880-luvulla, eikä isoisä voinut kuulla sitä 1873.
// Sama kehys kuin js/packs/southamerica-saapumiset.js:n saapumistekstissä
// ("Ukko ehti paikalle juuri ennen sitä"), jota EI muutettu.
//
// Mendozan siirtokunnan autioitumisvuosi on en-Wikipedian omassa
// artikkelissa ristiriitainen (Etymology: 1541, Viceregal times: 1542),
// joten teksti sanoo "1540-luvun alussa" — sama ratkaisu kuin lehden
// nostossa.
export const BUENOSAIRES_ARTIKKELIT_FRAGMENTTI = {
  'Buenos Aires': {
    intro: 'Buenos Aires on Argentiinan pääkaupunki ja Etelä-Amerikan '
      + 'suurimpia satamakaupunkeja. Se on rakennettu tasaiselle pampalle '
      + 'Río de la Platan lounaisrannalle, siihen kohtaan, jossa joki '
      + 'avautuu maailman leveimmäksi jokisuuksi — vastarantaa Uruguayssa '
      + 'ei näe. Nimi tarkoittaa hyviä tuulia ja tulee merenkulkijoiden '
      + 'suojeluspyhimykseltä.'
      + '\n\n'
      + 'Kaupunki perustettiin kahdesti. Pedro de Mendoza pystytti '
      + 'siirtokunnan 2. helmikuuta 1536, mutta se hylättiin 1540-luvun '
      + 'alussa, ja **pysyvän kaupungin perusti Juan de Garay 11. '
      + 'kesäkuuta 1580**. Siirtomaa-ajan pikkukaupungista tuli 1800-luvulla '
      + 'eurooppalaisen siirtolaisuuden porttikaupunki: vuoden 1869 '
      + 'väestönlaskennassa puolet asukkaista oli äskettäin maahan '
      + 'tulleita siirtolaisia.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki toipui yhä kahden vuoden '
      + 'takaisesta keltakuume-epidemiasta. Presidentti Domingo Faustino '
      + 'Sarmiento tilasi juuri sinä vuonna Plaza de Mayon laidalle uuden '
      + 'postitalon ja selvisi elokuussa murhayrityksestä. **Tangoa isoisä '
      + 'ei voinut kuulla: tanssi syntyi vasta 1880-luvulla** — '
      + 'satamakortteleissa soivat vasta sen ainekset.',
    teksti: 'Buenos Aires on Argentiinan pääkaupunki Río de la Platan '
      + 'lounaisrannalla. Maasto on tasaista pampaa ilman luonnollisia '
      + 'rajoja, ja osa nykyisestä rannasta — satama, Puerto Madero ja '
      + 'uudet puistot — on täytemaata. Kaupunki jakautuu nykyään 48 '
      + 'viralliseen barrioon eli kaupunginosaan.'
      + '\n\n'
      + 'Espanjalaiset perustivat paikan kahdesti, 1536 ja pysyvästi 1580. '
      + 'Karjatuotteet — villa, vuodat ja nahka — olivat maan pääasiallinen '
      + 'tulonlähde vielä 1870-luvulla, ja ne varastoitiin satamakortteleiden '
      + 'aitoissa ennen laivausta Eurooppaan. Vuoden 1871 keltakuume-epidemia '
      + 'muutti kaupungin kartan: varakkaat muuttivat San Telmosta '
      + 'pohjoisemmas, kaupunki perusti La Chacaritan hautausmaan ja '
      + 'rakensi ensimmäiset vesijohdot ja viemärit.'
      + '\n\n'
      + 'Asukkaita kutsutaan porteñoiksi, satamalaisiksi, ja heidän '
      + 'määränsä kolminkertaistui vuosien 1887 ja 1915 välillä '
      + 'puolesta miljoonasta puoleentoista miljoonaan. Tango, joka '
      + 'syntyi vasta isoisän vierailun jälkeen, on nyt kaupungin '
      + 'tunnetuin vientituote.',
  },
};
