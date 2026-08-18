/*
 * VERTAILULINSSI — varuste, joka avaa vapaan maavertailun
 * "Maa numeroina" -sivulla (docs/valtion-analyysi.md).
 *
 * Ilman varustetta vertailu on aina Suomi: jokaisessa käyrässä kulkee
 * himmeä Suomi-viiva. Tämä varuste tuo valinnan vapauden — pelaaja
 * asettaa minkä tahansa toisen maan samoille asteikoille, ja Suomi
 * säilyy kolmantena viivana.
 *
 * TOIMINTA MUUTTUI v321:ssä (omistajan päätös 7.8.2026): *"ei
 * upoteta näkymää tutki osioon vaan linssi toimisi suoraan
 * karttanäkymässä mutta muuttaisi sen niin että kaupungit
 * poistuisivat ja maiden rajat näkyisivät selvemmin."*
 *
 * Linssi EI piirrä karttakerrosta (kerros: false, kuten radio) vaan
 * ottaa karttanäkymän TILAKSI (js/ui.js tahdistaVertailu): kaupungit
 * katoavat, maiden rajat tummenevat ja jokainen maa on napautettava.
 * Valinta on enintään kolme maata + Suomi valmiina, ja alanapit
 * korvautuu palkilla, jonka Vertaa-nappi avaa vertailunäkymän
 * (js/maakayrat.js piirraVertailu).
 *
 * Ennen tämä linssi asui Tutki-ikkunan Maa numeroina -sivulla
 * valitsimena. Se poistui sieltä kokonaan: sivu on taas yhden maan
 * sivu, jolla Suomi on himmeä vertailuviiva.
 *
 * Löytyminen noudattaa varusteiden yleistä mallia: manner: null
 * rekisterissä tarkoittaa, että linssi ansaitaan tietäjäpisteillä
 * (js/linssit/omistus.js, LINSSIKYNNYKSET) — tämä suunnitelman
 * mukaisesti, joka ei lukitse löytymistä eikä hintaa erikseen.
 */

export const LINSSI = {
  tunnus: 'vertailu',
  jarjestys: 90,
  kerros: false,

  nimi: 'Vertailulinssi',
  lyhyt: 'Valitse kartalta enintään kolme maata Suomen rinnalle ja vertaa niitä samoilla asteikoilla.',
  // Kaksi käyrää samassa kehyksessä ja yhteinen pohjaviiva.
  ikoni: '<path d="M3 19.2h18"/>'
    + '<path d="M3 16.4c4.4-1.2 8.2-5.6 13-11.2"/>'
    + '<path d="M3 12.6c4.8 2.2 10.4 1.6 15.4-3.4"/>',
  valokuva: false,

  // Tilastosivu on jokaisella laudalla, jolla kaupungeilla on
  // maatunnus — linssi kulkee siis kaikkialla mukana.
  laudat: ['*'],

  lahde: {
    aineisto: 'Maailmanpankki (World Development Indicators) ja UN World Population Prospects 2024',
    lisenssi: 'CC BY 4.0 / CC BY 3.0 IGO',
    osoite: 'https://data.worldbank.org/',
    haettu: '2026-08-06',
  },
};
