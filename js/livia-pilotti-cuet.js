/*
 * HORATIO–LIVIA-PILOTIN TEKNINEN CUE-LÄHDE.
 *
 * Sanat ja cuejen toimituksellinen merkitys omistaa
 * docs/raportit/horatio-livia-pilottikortit-20260912.md. Tämä moduuli
 * tekee niistä koneellisen sopimuksen alignment-työkalulle ja runtimelle.
 * Millisekunteja ei ole ennen lopullisen mp3:n forced alignmentia.
 */

export const LIVIAN_PILOTIN_REVISION = 'eu-hl-pilot-20260913-r2-approved1';

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
  marseille: pilotti('marseille', '2d597bd0fd42d4a1bc86e3fa0dd9ffdbcc55f49acffbdf9587d821db2ec2ca8b', [
    { id: 'marseille.livia.c1', ankkuri: 'saippuaa tehdään yhä', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'marseille.livia.c3', ankkuri: 'Vieux-Portin jo äänestä', tarkoitus: 'lammin', voimakkuus: .45 },
    { id: 'marseille.livia.c2', ankkuri: 'Lokit tuntevat jokaisen pöydän', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'marseille.livia.c4', ankkuri: 'Minä vasta harjoittelen', tarkoitus: 'miettiva', voimakkuus: .35 },
  ]),
  ateena: pilotti('ateena', 'e832aa94e48db059fa3a1acc25982e675212b6b48e0a00be711f2d46d37f7713', [
    { id: 'ateena.livia.c1', ankkuri: 'nyt rahamuseo', tarkoitus: 'selittaa', voimakkuus: .45 },
    { id: 'ateena.livia.c3', ankkuri: 'Etsin puutarhasta varjoa', tarkoitus: 'ilo', voimakkuus: .35 },
    { id: 'ateena.livia.c4', ankkuri: 'pöytien alta löytyi pullanmuruja', tarkoitus: 'ilo', voimakkuus: .55 },
    { id: 'ateena.livia.c5', ankkuri: 'unohtui varjo hetkeksi', tarkoitus: 'ilo', voimakkuus: .45 },
  ]),
  sarajevo: pilotti('sarajevo', '145fb8120049fc081ddd36ebe98f44369868e89bac35068d2981a3e14ce6da9d', [
    { id: 'sarajevo.livia.c1', ankkuri: 'basaarissa yhä', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'sarajevo.livia.c3', ankkuri: 'jäin kuuntelemaan yhtä vasaraa', tarkoitus: 'lammin', voimakkuus: .45 },
    { id: 'sarajevo.livia.c4', ankkuri: 'naputtaa nokalla samaa tahtia', tarkoitus: 'ilo', voimakkuus: .55 },
    { id: 'sarajevo.livia.c5', ankkuri: 'seppä oli kyllä nopeampi', tarkoitus: 'ilo', voimakkuus: .50 },
  ]),
  venetsia: pilotti('venetsia', '2cbd024d573c4a3aee0900a057d2260ad0056570cbae2f1239cbf44410cf0601', [
    { id: 'venetsia.livia.c1', ankkuri: 'kuljetaan yhä vesibusseilla', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'venetsia.livia.c5', ankkuri: 'vähän pidempää reittiä', tarkoitus: 'lammin', voimakkuus: .45 },
    { id: 'venetsia.livia.c6', ankkuri: 'Yhden tutun takia', tarkoitus: 'rakkaus', voimakkuus: .70 },
    { id: 'venetsia.livia.c2', ankkuri: 'kuvat ovat yksityisiä', tarkoitus: 'hammentynyt', voimakkuus: .55 },
    { id: 'venetsia.livia.c3', ankkuri: 'jokaiseen hyvään kuvakulmaan', tarkoitus: 'rakkaus', voimakkuus: .80 },
    { id: 'venetsia.livia.c7', ankkuri: 'ehkä minä vähän odotin', tarkoitus: 'hammentynyt', voimakkuus: .60 },
  ]),
});

export const LIVIAN_PILOTTIKAUPUNGIT = Object.freeze(Object.keys(LIVIAN_PILOTTI_CUET));

/** Vain pilotin yhden kommenttikuplan (`city-3`) tekninen työ. */
export function livianPilottityo(kaupunki, kentta = 'kommentti', kupla = 0) {
  const tyo = LIVIAN_PILOTTI_CUET[String(kaupunki ?? '')];
  return tyo && tyo.kentta === kentta && tyo.kupla === kupla ? tyo : null;
}
