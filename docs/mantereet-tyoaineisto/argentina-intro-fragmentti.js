// ARGENTIINAN MAAINTRO — fragmentti js/packs/southamerica-artikkelit.js:ään.
//
// Opus (ARG-maalehden kirjoittaja) 23.8.2026. Tiedostoa
// js/packs/southamerica-artikkelit.js EI ollut olemassa tätä
// kirjoitettaessa, ja E-Amerikan pilottierässä sen luo Rion (BRA)
// agentti — siksi Argentiinan intro odottaa tässä erillisessä
// fragmentissa eikä js/packs-hakemistossa. Kun tiedosto on olemassa,
// tämä lohko liitetään sinne sellaisenaan OMAT_ARTIKKELIT-taulun
// jäseneksi (malli: js/packs/africa-artikkelit.js).
//
// Avain on maan wiki-nimi 'Argentiina' (countryShapesin wiki/nimi),
// samoin kuin africa-artikkelit.js:ssä Marokko ja Libya.
//
// `intro` on maalehti.md:n kohdan 8 mukainen pidennetty maaintro
// (n. 6 virkettä): ARG-maalehden maaosasto nojaa yksin siihen.
// `artikkeli` on Lue lisää -dialogin pitkä teksti; väliotsikot
// "== Otsikko ==" muuttuvat renderArticlessa otsikkoriveiksi.
//
// Sisältö nojaa docs/mantereet-tyoaineisto/faktapohja-argentina.md:hen
// (osio 7) ja sen korjauskierrokseen: malbec-köynnökset 1853 (ei 1868),
// tango syntyy vasta 1880-luvulla, "Aavikon valloitus" on 1873:n
// hetkellä vielä tulevaisuutta ja mainitaan vain tapahtumana.

export const ARGENTIINA_INTRO = {
  Argentiina: {
    intro: 'Vuonna 1873 Argentiina on nuori tasavalta täydessä '
      + 'murroksessa: presidentti Domingo Faustino Sarmiento rakentaa '
      + 'satoja kouluja samalla kun loputon pampa muuttuu gauchojen '
      + 'maasta karjatilojen ja uudisasukkaiden Argentiinaksi. Verinen '
      + 'sota Paraguayta vastaan on juuri päättynyt, ja laivalastillinen '
      + 'toisensa jälkeen tuo Italiasta ja Espanjasta uusia asukkaita '
      + 'maahan, joka on vielä lähes tyhjä. Kaukana etelässä leviää '
      + 'Patagonian tuulinen aromaisto, ja pohjoisessa viidakko kätkee '
      + 'Iguazún putoukset, joita tuskin kukaan eurooppalainen on vielä '
      + 'nähnyt. Buenos Airesin kaduilla soi afrikkalaisperäinen '
      + 'candombe ja pampalla milonga — ainekset, joista syntyy '
      + 'parikymmentä vuotta myöhemmin tango. **Isoisän matkapäiväkirja '
      + 'saapuu Argentiinaan juuri sillä hetkellä, jolloin gauchon '
      + 'aikakausi on päättymässä ja uusi kansakunta vasta '
      + 'syntymässä.**',
    artikkeli: 'Argentiina on Etelä-Amerikan eteläkärjen suuri maa, '
      + 'joka venyy pohjoisesta etelään lähes 3 700 kilometriä. Sen '
      + 'länsirajaa reunustavat Andit, joiden korkein huippu Aconcagua '
      + 'on koko Amerikan korkein vuori. Idässä ja keskellä maata '
      + 'aukeaa pampa, yli miljoonan neliökilometrin ruohotasanko, ja '
      + 'etelässä Patagonian tuulinen aro.'
      + '\n\n== Historiaa lyhyesti ==\n'
      + 'Ennen espanjalaisia alueella asui kymmeniä kansoja: pohjoisessa '
      + 'guaranít, etelässä mapuchet ja tehuelchet. Espanjan '
      + 'siirtomaavalta ei koskaan ulottunut koko maahan, ja pampan ja '
      + 'Patagonian raja pysyi auki pitkälle 1800-luvulle. Argentiina '
      + 'julistautui itsenäiseksi 1816, ja vuoden 1853 perustuslaki '
      + 'avasi ovet eurooppalaiselle siirtolaisuudelle. Vuosisadan '
      + 'lopulla maahan saapui miljoonia italialaisia ja espanjalaisia, '
      + 'jotka muuttivat kielen, ruoan ja kaupunkien ilmeen.'
      + '\n\n== Elämää ==\n'
      + 'Argentiinalainen arki on mate-kupin ympärillä: kalebassi ja '
      + 'bombilla-pilli kiertävät seurueessa kädestä käteen. '
      + 'Viikonloppuisin sytytetään asado, ja pöytään kannetaan '
      + 'empanadoja, joista jokaisella maakunnalla on oma versionsa. '
      + 'Buenos Airesissa soi tango, luoteessa Saltan seudulla Andien '
      + 'folklore, ja Mendozan viinitarhoissa kasvaa malbec — rypäle, '
      + 'joka tuotiin Ranskasta vuonna 1853 ja josta tuli maan '
      + 'tunnusmerkki.',
  },
};
