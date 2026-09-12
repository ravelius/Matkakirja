/*
 * HORATIO–LIVIA-PILOTIN TEKNINEN CUE-LÄHDE.
 *
 * Sanat ja cuejen toimituksellinen merkitys omistaa
 * docs/raportit/horatio-livia-pilottikortit-20260912.md. Tämä moduuli
 * tekee niistä koneellisen sopimuksen alignment-työkalulle ja runtimelle.
 * Millisekunteja ei ole ennen lopullisen mp3:n forced alignmentia.
 */

export const LIVIAN_PILOTIN_REVISION = 'eu-hl-pilot-20260912-r1';

const pilotti = (kaupunki, tekstiSha256, cuet) => Object.freeze({
  kaupunki,
  avain: `${kaupunki}-3`,
  kentta: 'kommentti',
  kupla: 0,
  tekstiSha256,
  aaniNimi: `livia-${kaupunki}-3.mp3`,
  kohde: `assets/aikaleimat/livia-${kaupunki}-3.eleet.json`,
  r2Kohde: `aanet/pulu/livia-${kaupunki}-3.eleet.json`,
  cuet: Object.freeze(cuet.map((cue) => Object.freeze({ esiintyma: 1, ...cue }))),
});

export const LIVIAN_PILOTTI_CUET = Object.freeze({
  marseille: pilotti('marseille', '3b745a3a45bb4d9cdad66eeefb4bc2757149489b2cfb050232b2bcd42aa4d8c9', [
    { id: 'marseille.livia.c1', ankkuri: 'Marseillen saippuaa tehdään yhä', tarkoitus: 'selittaa', voimakkuus: .45 },
    { id: 'marseille.livia.c2', ankkuri: 'Lokit eivät tunne', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'marseille.livia.c3', ankkuri: 'jo äänestä ja suolasta', tarkoitus: 'lammin', voimakkuus: .45 },
  ]),
  ateena: pilotti('ateena', 'dd2bb37d25ab5e717533a290ea423b6244dba6d5cf362ee906d2f48298eb456b', [
    { id: 'ateena.livia.c1', ankkuri: 'nyt rahamuseo', tarkoitus: 'selittaa', voimakkuus: .45 },
    { id: 'ateena.livia.c2', ankkuri: 'tavallista työtään', tarkoitus: 'lammin', voimakkuus: .40 },
    { id: 'ateena.livia.c3', ankkuri: 'tarkistan ensin varjon', tarkoitus: 'ilo', voimakkuus: .45 },
  ]),
  sarajevo: pilotti('sarajevo', '19d50f91aa864bcac600d5e20797de73747c208ee9d8d89bf6139908e78e2747', [
    { id: 'sarajevo.livia.c1', ankkuri: 'basaarissa yhä', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'sarajevo.livia.c2', ankkuri: 'oppi katsomaan', tarkoitus: 'miettiva', voimakkuus: .35 },
    { id: 'sarajevo.livia.c3', ankkuri: 'kuuntelisin vasaraa ennen kahvia', tarkoitus: 'lammin', voimakkuus: .40 },
  ]),
  venetsia: pilotti('venetsia', '88bd58ac567bc89737ad1809e70b14cccdf3779efd0de3c2d297fa1239d6ea38', [
    { id: 'venetsia.livia.c1', ankkuri: 'Vesibussit kulkevat yhä', tarkoitus: 'utelias', voimakkuus: .40 },
    { id: 'venetsia.livia.c2', ankkuri: 'Nuo ovat yksityisiä', tarkoitus: 'hammentynyt', voimakkuus: .55 },
    { id: 'venetsia.livia.c3', ankkuri: 'Hän osui jokaiseen', tarkoitus: 'rakkaus', voimakkuus: .80 },
    { id: 'venetsia.livia.c4', ankkuri: 'Sulje albumi', tarkoitus: 'hammentynyt', voimakkuus: .60 },
  ]),
});

export const LIVIAN_PILOTTIKAUPUNGIT = Object.freeze(Object.keys(LIVIAN_PILOTTI_CUET));

/** Vain pilotin yhden kommenttikuplan (`city-3`) tekninen työ. */
export function livianPilottityo(kaupunki, kentta = 'kommentti', kupla = 0) {
  const tyo = LIVIAN_PILOTTI_CUET[String(kaupunki ?? '')];
  return tyo && tyo.kentta === kentta && tyo.kupla === kupla ? tyo : null;
}
