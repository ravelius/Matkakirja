/*
 * KAUPUNKIEN ISKULAUSEET — saapumisen minitraileriin.
 *
 * Omistaja 11.9.2026 (Raamattu: MINITRAILERIN LISAYKSET): *"Kaupungin
 * nimen alle voisi feidautua kaupungin isku lause"*. Traileri
 * (js/saapumistraileri.js) näyttää kaupungin nimen harvennetuin
 * kapitaalein ja häivyttää sen alle tämän rivin pienemmällä kirjasimella.
 *
 * KIRJOITUSSÄÄNNÖT (Fable, kaanon docs/tarina.md): 3–7 sanaa, ei pistettä
 * lopussa, ei faktaväitteitä joita ei voi tarkistaa, ei ylisanoja
 * ("maailman paras"). Lause on nykypäivän kaupungin kuiskaus — sama
 * paikka, johon isoisä saapui 1873, mutta sanottuna pelaajalle nyt.
 * Avain on fokusvirran kaupunkitunnus (js/packs/fokusvirrat.js).
 * Puuttuva avain = traileri näyttää vain nimen.
 */
export const ISKULAUSEET = Object.freeze({
  ateena: 'Missä keskustelu keksittiin',
  sofia: 'Kuumat lähteet keskellä kaupunkia',
  istanbul: 'Kaupunki kahdella mantereella',
  rooma: 'Kaikki tiet, yhä',
  bukarest: 'Idän ja lännen kohtauspaikka',
  sarajevo: 'Vuorten sylissä, kuparin kaikua',
  madrid: 'Ylätasangon kirkas pääkaupunki',
  wien: 'Valssin ja kahvilan kaupunki',
  pariisi: 'Valojen kaupunki Seinen rannalla',
  berliini: 'Kaupunki, joka rakentaa itsensä uudelleen',
  lontoo: 'Thamesin varrella, maailman rytmissä',
  budapest: 'Kaksi rantaa, yksi kaupunki',
  dubrovnik: 'Muurien kaupunki Adrianmerellä',
  praha: 'Sadan tornin kaupunki',
  tukholma: 'Neljätoista saarta ja meri',
  kobenhavn: 'Pyöräilijöiden ja satujen kaupunki',
  helsinki: 'Valkoinen kaupunki meren äärellä',
  tallinna: 'Keskiajan muurit, uusi aika',
  sevilla: 'Appelsiinipuiden ja flamencon kaupunki',
  bergen: 'Seitsemän vuoren satama',
  amsterdam: 'Kanavien ja kapeiden talojen kaupunki',
  dublin: 'Tarinoiden ja tumman oluen kaupunki',
  edinburgh: 'Kallion ja kahden kaupungin pääkaupunki',
  lissabon: 'Seitsemän kukkulaa, yksi joki',
  riika: 'Laulun ja jugendin kaupunki',
  barcelona: 'Meren ja Gaudín kaupunki',
  firenze: 'Renessanssin syntykaupunki Arnon rannalla',
  venetsia: 'Kaupunki, jonka kadut ovat vettä',
  marseille: 'Välimeren vanhin satama',
  oslo: 'Vuonon päässä, metsän reunalla',
  tampere: 'Kosken kaupunki kahden järven välissä',
  vilna: 'Barokin ja pihojen kaupunki',
  granada: 'Alhambran ja veden kaupunki',
  kiova: 'Kultaisten kupolien kaupunki Dneprillä',
  krakova: 'Torvensoiton ja torin kaupunki',
  moskova: 'Kremlin muurien kaupunki',
  odessa: 'Portaiden kaupunki Mustanmeren rannalla',
  pietari: 'Valkoisten öiden kaupunki',
  varsova: 'Uudelleen rakennettu vanha kaupunki',
  kreeta: 'Saari, jolla myytit syntyivät',
  sisilia: 'Kolmen kulttuurin kultainen saari',
  islanti: 'Tulen ja jään saari',
  alpit: 'Jäätikön ja vuorten laakso',
  lappi: 'Kahden joen ja revontulten kaupunki',
  tromssa: 'Pohjoisen portti ja napapiirin valo',
});
