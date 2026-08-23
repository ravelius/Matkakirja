/*
 * BRASILIAN MAAN INTRO — irrallinen fragmentti, EI vielä pelin koodia.
 *
 * Kirjoitti Brasilian maalehden tekijä (opus) 23.8.2026. Tämä tiedosto
 * on työaineistoa, ei ladattava moduuli: `js/packs/southamerica-
 * artikkelit.js` on Rion lehtiagentin luotava (Fablen työnjako
 * 23.8.2026), joten intro odottaa tässä siihen asti. Kun tiedosto on
 * olemassa, LIITÄ alla oleva lohko sen OMAT_ARTIKKELIT-tauluun
 * sellaisenaan ja poista tämä fragmentti.
 *
 * AVAIN: 'Brasilia'. Maiden avain on countryShapesin wiki tai nimi
 * (africa-artikkelit.js:n otsakekommentti). southamerica.js:ssä ei ole
 * vielä countryShapes-taulua lainkaan — vain SA_CITY_COUNTRY — joten
 * avaimeksi tulee maan fi-wiki-nimi 'Brasilia'. Jos countryShapes
 * lisätään myöhemmin toisella nimellä, avain on vaihdettava samaksi.
 *
 * SISÄLTÖ: intro on maalehti.md:n mukainen "noin kuusi virkettä +
 * kommentti siitä, että lehden maaosasto nojaa siihen yksin" — tässä
 * seitsemän virkettä, n. 950 merkkiä. Jokainen väite on samasta
 * tarkistetusta aineistosta kuin MAA_KATEGORIAT.BRA
 * (docs/mantereet-tyoaineisto/faktapohja-brasilia.md,
 * tarkistus-brasilia.md ja en-Wikipedian raakateksti 23.8.2026):
 * Pedro II:n keisarikunta ja sen ainoalaatuisuus mantereella,
 * Paraguayn sodan päättyminen 1870, Rio Brancon laki 1871 ja
 * Kultalaki 1888, kahvin osuus maailmantuotannosta 1840-luvulla,
 * choro-yhtye 1870, Amazonin 60 %:n osuus Brasiliassa ja gaúchojen
 * pampa. Artikkeli-kenttää EI kirjoitettu: maalehden aiheet kantavat
 * maaosaston, ja pitkä artikkeli kuuluu kaupungeille.
 */

export const BRASILIA_INTRO_FRAGMENTTI = {
  Brasilia: {
    intro: 'Vuonna 1873 Brasilia on Amerikan mantereen ainoa keisarikunta '
      + '— monarkia keskellä tasavaltoja, ja sitä hallitsee tiedettä ja '
      + 'valokuvausta harrastava Pedro II. Maa on juuri selvinnyt '
      + 'mantereen verisimmästä sodasta, ja orjuuteen on tullut '
      + 'ensimmäinen särö: orjuutetuille äideille syntyvät lapset on '
      + 'julistettu vapaiksi, vaikka täysi lakkautus tulee vasta '
      + 'viidentoista vuoden päästä. Kahvi on tehnyt maasta maailman '
      + 'suurimman tuottajan ja Rio de Janeirosta vauraan satamakaupungin, '
      + 'jonka kaduilla soi juuri syntynyt musiikkilaji choro. '
      + 'Pohjoisessa aukeaa Amazon, maailman suurin sademetsä, jota '
      + 'alkuperäiskansat ovat muokanneet vuosituhansien ajan ja jonka '
      + 'kumipuut ovat vasta houkuttelemassa maailman huomiota. Etelässä '
      + 'gaúchot ratsastavat pampan aroilla karjan perässä ja paahtavat '
      + 'lihansa hiilloksen yllä. Kaikki tämä mahtuu maahan, joka on '
      + 'ollut itsenäinen vasta 51 vuotta ja jonka pohjoiskärjen ja '
      + 'eteläkärjen välillä on lähes neljäkymmentä leveysastetta.',
  },
};
