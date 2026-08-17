// Maan aihesivun otsikko: "EGYPTIN HISTORIA", ei pelkkä "HISTORIA"
// (omistajan toive 6.8.2026). Genetiivi tehdään taululla ja yhdellä
// säännöllä (js/packs/maa-kategoriat.js), joten testin tehtävä on
// vahtia kahta asiaa:
//
//   1. jokainen maa, jolla on aihesivuja, taipuu oikein — nämä nimet
//      näkyvät pelaajalle sellaisinaan;
//   2. sääntö taipuu oikein myös pelin muihin maanimiin, jotta
//      seuraava maapaketti ei tuo mukanaan kirjoitusvirhettä.
//
// Odotetut muodot on tarkistettu käsin. Jos peliin tulee maa, jota
// tässä ei ole, testi kaatuu ja pyytää tarkistamaan sen genetiivin —
// juuri siinä kohtaa, jossa se on helpointa tehdä.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { MAA_KATEGORIAT, maanAiheOtsikko, maanGenetiivi } from '../js/packs/maa-kategoriat.js';
import { PACKS } from '../js/pack.js';

/*
 * Maan nimi ISO-3-tunnuksella miltä tahansa laudalta, jolla se on.
 * Kaikki laudat käydään läpi, jotta uusi lauta tulee vahdituksi
 * ilman että tätä listaa muistetaan päivittää.
 */
const MAAT = new Map();
for (const pack of PACKS) {
  for (const [iso, maa] of Object.entries(pack.map?.countryShapes ?? {})) {
    if (maa?.nimi) MAAT.set(iso, maa.nimi);
  }
}

/** Käsin tarkistetut genetiivit pelin jokaiselle maalle. */
const GENETIIVIT = {
  Afganistan: 'Afganistanin',
  Alankomaat: 'Alankomaiden',
  Albania: 'Albanian',
  Algeria: 'Algerian',
  Angola: 'Angolan',
  Arabiemiirikunnat: 'Arabiemiirikuntien',
  Argentiina: 'Argentiinan',
  Armenia: 'Armenian',
  Australia: 'Australian',
  Azerbaidžan: 'Azerbaidžanin',
  Bahrain: 'Bahrainin',
  Bangladesh: 'Bangladeshin',
  Belgia: 'Belgian',
  Bhutan: 'Bhutanin',
  Bolivia: 'Bolivian',
  'Bosnia ja Hertsegovina': 'Bosnia ja Hertsegovinan',
  Brasilia: 'Brasilian',
  Bulgaria: 'Bulgarian',
  Chile: 'Chilen',
  Ecuador: 'Ecuadorin',
  Egypti: 'Egyptin',
  Espanja: 'Espanjan',
  'Etelä-Afrikka': 'Etelä-Afrikan',
  'Etelä-Korea': 'Etelä-Korean',
  'Etelä-Sudan': 'Etelä-Sudanin',
  Etiopia: 'Etiopian',
  Fidži: 'Fidžin',
  Filippiinit: 'Filippiinien',
  Georgia: 'Georgian',
  Ghana: 'Ghanan',
  Grönlanti: 'Grönlannin',
  Guatemala: 'Guatemalan',
  Hongkong: 'Hongkongin',
  Indonesia: 'Indonesian',
  Intia: 'Intian',
  Irak: 'Irakin',
  Iran: 'Iranin',
  Irlanti: 'Irlannin',
  Islanti: 'Islannin',
  'Iso-Britannia': 'Ison-Britannian',
  Italia: 'Italian',
  'Itä-Timor': 'Itä-Timorin',
  Itävalta: 'Itävallan',
  Japani: 'Japanin',
  Jemen: 'Jemenin',
  Jordania: 'Jordanian',
  Kambodža: 'Kambodžan',
  Kamerun: 'Kamerunin',
  Kanada: 'Kanadan',
  Kazakstan: 'Kazakstanin',
  Kenia: 'Kenian',
  Kiina: 'Kiinan',
  Kirgisia: 'Kirgisian',
  Kolumbia: 'Kolumbian',
  Kongo: 'Kongon',
  Kreikka: 'Kreikan',
  Kroatia: 'Kroatian',
  Kuuba: 'Kuuban',
  Kuwait: 'Kuwaitin',
  Kypros: 'Kyproksen',
  Laos: 'Laosin',
  Latvia: 'Latvian',
  Liberia: 'Liberian',
  Libya: 'Libyan',
  Liettua: 'Liettuan',
  Luxemburg: 'Luxemburgin',
  Madagaskar: 'Madagaskarin',
  Mali: 'Malin',
  Marokko: 'Marokon',
  Meksiko: 'Meksikon',
  Moldova: 'Moldovan',
  Mongolia: 'Mongolian',
  Montenegro: 'Montenegron',
  Mosambik: 'Mosambikin',
  Myanmar: 'Myanmarin',
  Namibia: 'Namibian',
  Nepal: 'Nepalin',
  Nicaragua: 'Nicaraguan',
  Nigeria: 'Nigerian',
  Norja: 'Norjan',
  Oman: 'Omanin',
  Malesia: 'Malesian',
  Pakistan: 'Pakistanin',
  Panama: 'Panaman',
  'Papua-Uusi-Guinea': 'Papua-Uuden-Guinean',
  Paraguay: 'Paraguayn',
  Peru: 'Perun',
  'Pohjois-Korea': 'Pohjois-Korean',
  'Pohjois-Makedonia': 'Pohjois-Makedonian',
  Portugali: 'Portugalin',
  Puola: 'Puolan',
  Qatar: 'Qatarin',
  Ranska: 'Ranskan',
  Romania: 'Romanian',
  Ruotsi: 'Ruotsin',
  'Saint Helena': 'Saint Helenan',
  Saksa: 'Saksan',
  Salomonsaaret: 'Salomonsaarten',
  'Saudi-Arabia': 'Saudi-Arabian',
  Senegal: 'Senegalin',
  Serbia: 'Serbian',
  'Sierra Leone': 'Sierra Leonen',
  Singapore: 'Singaporen',
  Slovakia: 'Slovakian',
  Slovenia: 'Slovenian',
  Somalia: 'Somalian',
  'Sri Lanka': 'Sri Lankan',
  Sudan: 'Sudanin',
  Suomi: 'Suomen',
  Sveitsi: 'Sveitsin',
  Syyria: 'Syyrian',
  Tadžikistan: 'Tadžikistanin',
  Taiwan: 'Taiwanin',
  Tansania: 'Tansanian',
  Tanska: 'Tanskan',
  Thaimaa: 'Thaimaan',
  Tunisia: 'Tunisian',
  Turkki: 'Turkin',
  Turkmenistan: 'Turkmenistanin',
  Tšad: 'Tšadin',
  Tšekki: 'Tšekin',
  Uganda: 'Ugandan',
  Ukraina: 'Ukrainan',
  Unkari: 'Unkarin',
  Uruguay: 'Uruguayn',
  'Uusi-Seelanti': 'Uuden-Seelannin',
  Uzbekistan: 'Uzbekistanin',
  'Valko-Venäjä': 'Valko-Venäjän',
  Vanuatu: 'Vanuatun',
  Venezuela: 'Venezuelan',
  Venäjä: 'Venäjän',
  Vietnam: 'Vietnamin',
  Viro: 'Viron',
  Yhdysvallat: 'Yhdysvaltojen',
  Zimbabwe: 'Zimbabwen',
};

test('pelin jokainen maanimi taipuu tarkistettuun genetiiviin', () => {
  for (const nimi of new Set(MAAT.values())) {
    const odotus = GENETIIVIT[nimi];
    assert.ok(
      odotus,
      `${nimi}: uusi maa peliin — lisää tarkistettu genetiivi tähän testiin`,
    );
    assert.equal(maanGenetiivi(nimi), odotus, `${nimi}: väärä genetiivi`);
  }
});

test('maasivujen maat taipuvat oikein', () => {
  // Nämä maat näkyvät pelaajalle otsikkona joka sivunkäännöksellä.
  for (const iso of Object.keys(MAA_KATEGORIAT)) {
    const nimi = MAAT.get(iso);
    assert.ok(nimi, `${iso}: maalla on aihesivuja mutta ei nimeä millään laudalla`);
    assert.ok(GENETIIVIT[nimi], `${nimi}: genetiivi tarkistamatta`);
  }
});

test('otsikko on maa genetiivissä ja aihe pienellä', () => {
  assert.equal(maanAiheOtsikko('Egypti', 'Historia'), 'Egyptin historia');
  assert.equal(maanAiheOtsikko('Espanja', 'Kuvataide'), 'Espanjan kuvataide');
  assert.equal(maanAiheOtsikko('Iso-Britannia', 'Musiikki'), 'Ison-Britannian musiikki');
});

test('otsikko jää ennalleen ilman maan nimeä', () => {
  // Laudalla ilman maadataa sivu näyttää saman otsikon kuin ennenkin.
  assert.equal(maanAiheOtsikko(null, 'Historia'), 'Historia');
  assert.equal(maanAiheOtsikko('', 'Historia'), 'Historia');
});

test('maan nimeä ei kirjoiteta kahdesti', () => {
  // Aihe, joka kantaa jo maan nimeä, ei saa toista kerrosta.
  assert.equal(maanAiheOtsikko('Egypti', 'Egypti tänään'), 'Egypti tänään');
});

test('tilastosivun otsikko on maan nimi nominatiivissa', () => {
  /*
   * "Maa numeroina" -sivu (v311) on maan sivu siinä missä muutkin,
   * joten siinä lukee "EGYPTI NUMEROINA" (omistajan toive 7.8.2026).
   * Otsikko on nominatiivissa, koska "numeroina" on jo taivutettu —
   * genetiivi antaisi "Egyptin numeroina". Sivu syntyy lehden
   * sivukoneistossa (js/lehti.js, remontin M5a) eikä aineistossa,
   * joten testi lukee lähdetekstin: se ei aukea Nodessa DOM:in takia.
   */
  const ui = readFileSync(new URL('../js/lehti.js', import.meta.url), 'utf8');
  const kohta = ui.slice(ui.indexOf("id: 'maa-numeroina'") - 400, ui.indexOf("id: 'maa-numeroina'") + 120);
  assert.match(kohta, /\$\{otsikonMaa\} numeroina/, 'otsikossa pitää olla maan nimi');
  // Maadataton lauta saa yhä yleisnimen — otsikko ei saa jäädä tyhjäksi.
  assert.match(kohta, /'Maa numeroina'/, 'ilman maan nimeä otsikoksi jää "Maa numeroina"');
});

test('maasivujen aiheet ovat yleisnimiä, jotka kestävät pienen alkukirjaimen', () => {
  /*
   * Aihe ei saa olla erisnimi. Yksisanaisuuden vaatimus poistui
   * 7.8.2026, kun otsikon genetiivi ("Egyptin historia") korvattiin
   * maan lipulla ja aiheiksi tulivat myös "Sadut ja tarinat"
   * -tyyppiset nimet — mutta nimen on yhä alettava isolla ja
   * jatkuttava pienellä, jotta se istuu otsikkoriville.
   */
  for (const [iso, aiheet] of Object.entries(MAA_KATEGORIAT)) {
    for (const aihe of aiheet) {
      assert.match(
        aihe.nimi,
        /^[A-ZÅÄÖ][a-zåäö]+( [a-zåäö]+)*$/,
        `${iso}/${aihe.id}: maan aiheen nimen pitää olla yleisnimi (iso alkukirjain, ei erisnimiä)`,
      );
    }
  }
});
