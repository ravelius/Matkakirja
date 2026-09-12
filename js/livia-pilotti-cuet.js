/*
 * HORATIO–LIVIA-PILOTIN TEKNINEN CUE-LÄHDE.
 *
 * Sanat ja cuejen toimituksellinen merkitys omistaa
 * docs/raportit/horatio-livia-pilottikortit-20260912.md. Tämä moduuli
 * tekee niistä koneellisen sopimuksen alignment-työkalulle ja runtimelle.
 * Millisekunteja ei ole ennen lopullisen mp3:n forced alignmentia.
 */

export const LIVIAN_PILOTIN_REVISION = 'eu-hl-pilot-20260913-r2-approved1';
export const LIVIAN_E4_REVISION = 'eu-hl-e4-20260913-r1-approved1';

const pilotti = (kaupunki, revision, tekstiSha256, cuet) => Object.freeze({
  revision,
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

export const LIVIAN_LUENTA_CUET = Object.freeze({
  marseille: pilotti('marseille', LIVIAN_PILOTIN_REVISION, '2d597bd0fd42d4a1bc86e3fa0dd9ffdbcc55f49acffbdf9587d821db2ec2ca8b', [
    { id: 'marseille.livia.c1', ankkuri: 'saippuaa tehdään yhä', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'marseille.livia.c3', ankkuri: 'Vieux-Portin jo äänestä', tarkoitus: 'lammin', voimakkuus: .45 },
    { id: 'marseille.livia.c2', ankkuri: 'Lokit tuntevat jokaisen pöydän', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'marseille.livia.c4', ankkuri: 'Minä vasta harjoittelen', tarkoitus: 'miettiva', voimakkuus: .35 },
  ]),
  ateena: pilotti('ateena', LIVIAN_PILOTIN_REVISION, 'e832aa94e48db059fa3a1acc25982e675212b6b48e0a00be711f2d46d37f7713', [
    { id: 'ateena.livia.c1', ankkuri: 'nyt rahamuseo', tarkoitus: 'selittaa', voimakkuus: .45 },
    { id: 'ateena.livia.c3', ankkuri: 'Etsin puutarhasta varjoa', tarkoitus: 'ilo', voimakkuus: .35 },
    { id: 'ateena.livia.c4', ankkuri: 'pöytien alta löytyi pullanmuruja', tarkoitus: 'ilo', voimakkuus: .55 },
    { id: 'ateena.livia.c5', ankkuri: 'unohtui varjo hetkeksi', tarkoitus: 'ilo', voimakkuus: .45 },
  ]),
  sarajevo: pilotti('sarajevo', LIVIAN_PILOTIN_REVISION, '145fb8120049fc081ddd36ebe98f44369868e89bac35068d2981a3e14ce6da9d', [
    { id: 'sarajevo.livia.c1', ankkuri: 'basaarissa yhä', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'sarajevo.livia.c3', ankkuri: 'jäin kuuntelemaan yhtä vasaraa', tarkoitus: 'lammin', voimakkuus: .45 },
    { id: 'sarajevo.livia.c4', ankkuri: 'naputtaa nokalla samaa tahtia', tarkoitus: 'ilo', voimakkuus: .55 },
    { id: 'sarajevo.livia.c5', ankkuri: 'seppä oli kyllä nopeampi', tarkoitus: 'ilo', voimakkuus: .50 },
  ]),
  venetsia: pilotti('venetsia', LIVIAN_PILOTIN_REVISION, '2cbd024d573c4a3aee0900a057d2260ad0056570cbae2f1239cbf44410cf0601', [
    { id: 'venetsia.livia.c1', ankkuri: 'kuljetaan yhä vesibusseilla', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'venetsia.livia.c5', ankkuri: 'vähän pidempää reittiä', tarkoitus: 'lammin', voimakkuus: .45 },
    { id: 'venetsia.livia.c6', ankkuri: 'Yhden tutun takia', tarkoitus: 'rakkaus', voimakkuus: .70 },
    { id: 'venetsia.livia.c2', ankkuri: 'kuvat ovat yksityisiä', tarkoitus: 'hammentynyt', voimakkuus: .55 },
    { id: 'venetsia.livia.c3', ankkuri: 'jokaiseen hyvään kuvakulmaan', tarkoitus: 'rakkaus', voimakkuus: .80 },
    { id: 'venetsia.livia.c7', ankkuri: 'ehkä minä vähän odotin', tarkoitus: 'hammentynyt', voimakkuus: .60 },
  ]),
  tukholma: pilotti('tukholma', LIVIAN_E4_REVISION, '2be4a5a4823f51baaf9705fbfcc3533011fc4901fc0ec4c68e75752c2aeb2ed7', [
    { id: 'tukholma.livia.c1', ankkuri: 'ei enää kruunata', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'tukholma.livia.c2', ankkuri: 'Monteliusvägenin kaiteelle', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'tukholma.livia.c3', ankkuri: 'veneet alkoivat näyttää muruilta', tarkoitus: 'ilo', voimakkuus: .55 },
  ]),
  helsinki: pilotti('helsinki', LIVIAN_E4_REVISION, 'a58b34043c408bceb0eaec4dc33e6a94cd27004907a196d68b87e65953e1e8f4', [
    { id: 'helsinki.livia.c1', ankkuri: 'on tuomiokirkko', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'helsinki.livia.c2', ankkuri: 'apostolien näköalaa', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'helsinki.livia.c3', ankkuri: 'Lokki ehti ensin', tarkoitus: 'hammentynyt', voimakkuus: .50 },
    { id: 'helsinki.livia.c4', ankkuri: 'kuin olisin ollut harjoittelija', tarkoitus: 'miettiva', voimakkuus: .40 },
  ]),
  tampere: pilotti('tampere', LIVIAN_E4_REVISION, '2758095a57d5508b166c4557f2f0b63d5da3b6b4af2e12ad570bb27bbcaeeadd', [
    { id: 'tampere.livia.c1', ankkuri: 'ravintoloita ja puutarha katolla', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'tampere.livia.c2', ankkuri: 'Seurasin leipäkoria', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'tampere.livia.c3', ankkuri: 'melkein törmäsin tuoliin', tarkoitus: 'hammentynyt', voimakkuus: .55 },
    { id: 'tampere.livia.c4', ankkuri: 'Kori kääntyi', tarkoitus: 'ilo', voimakkuus: .50 },
    { id: 'tampere.livia.c5', ankkuri: 'Minä en aivan', tarkoitus: 'hammentynyt', voimakkuus: .45 },
  ]),
  tallinna: pilotti('tallinna', LIVIAN_E4_REVISION, 'ac627c3f69360a941f6f97e5e31339da90560c1da3906a5ab8ee97605b9023bf', [
    { id: 'tallinna.livia.c1', ankkuri: 'myy marsipaania yhä', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'tallinna.livia.c2', ankkuri: 'joku murentaisi annoksensa', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'tallinna.livia.c3', ankkuri: 'jakoi palan ystävälleen', tarkoitus: 'lammin', voimakkuus: .50 },
    { id: 'tallinna.livia.c4', ankkuri: 'oikea ajatus', tarkoitus: 'miettiva', voimakkuus: .40 },
  ]),
  riika: pilotti('riika', LIVIAN_E4_REVISION, '6e675316902872b7890be9ff88336ae6cd3d44f3f784e9c32e5cc0f552da84d2', [
    { id: 'riika.livia.c1', ankkuri: 'Laulujuhlat jatkuvat yhä', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'riika.livia.c2', ankkuri: 'ilmasta suurelta pesältä', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'riika.livia.c3', ankkuri: 'Laskeuduin hetkeksi', tarkoitus: 'miettiva', voimakkuus: .35 },
    { id: 'riika.livia.c4', ankkuri: 'Kuuntelin vain', tarkoitus: 'lammin', voimakkuus: .55 },
  ]),
  vilna: pilotti('vilna', LIVIAN_E4_REVISION, '25768f2f32066899d231fd36477da98b3d2899a5871d65c34ccd96d041dd6c25', [
    { id: 'vilna.livia.c1', ankkuri: 'kuuluu yhä yliopistolle', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'vilna.livia.c2', ankkuri: 'ei tutkita siellä enää', tarkoitus: 'miettiva', voimakkuus: .40 },
    { id: 'vilna.livia.c3', ankkuri: 'kaupungin valot voittivat tähdet', tarkoitus: 'hammentynyt', voimakkuus: .45 },
    { id: 'vilna.livia.c4', ankkuri: 'lähtivät kauemmas', tarkoitus: 'selittaa', voimakkuus: .35 },
    { id: 'vilna.livia.c5', ankkuri: 'jäin kierrokselle', tarkoitus: 'ilo', voimakkuus: .40 },
  ]),
  tromssa: pilotti('tromssa', LIVIAN_E4_REVISION, 'c17f172e0270f1272e2fc001bf0742fef5ee88b1c104b03a4d03a78e59e08b22', [
    { id: 'tromssa.livia.c1', ankkuri: 'nyt yliopisto', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'tromssa.livia.c2', ankkuri: 'Polaarimuseo vanhoissa tullirakennuksissa', tarkoitus: 'selittaa', voimakkuus: .40 },
    { id: 'tromssa.livia.c3', ankkuri: 'kurkistin sisään', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'tromssa.livia.c4', ankkuri: 'Tyhjä', tarkoitus: 'hammentynyt', voimakkuus: .45 },
    { id: 'tromssa.livia.c5', ankkuri: 'kuka oli lähtenyt ja minne', tarkoitus: 'miettiva', voimakkuus: .50 },
  ]),
  lappi: pilotti('lappi', LIVIAN_E4_REVISION, 'd4169d3f922d8e34e53b0e95ace9c87ee09b6b5b2327d3ecfb9a26079bde770b', [
    { id: 'lappi.livia.c1', ankkuri: 'joulupukkiakin katsomaan', tarkoitus: 'ilo', voimakkuus: .40 },
    { id: 'lappi.livia.c2', ankkuri: 'Seurasin Ounasjokea ilmasta', tarkoitus: 'ilo', voimakkuus: .45 },
    { id: 'lappi.livia.c3', ankkuri: 'valojen jatkuvan veteen', tarkoitus: 'hammentynyt', voimakkuus: .45 },
    { id: 'lappi.livia.c4', ankkuri: 'ne olivat heijastuksia', tarkoitus: 'miettiva', voimakkuus: .40 },
    { id: 'lappi.livia.c5', ankkuri: 'laskeutua niiden väliin', tarkoitus: 'hammentynyt', voimakkuus: .50 },
  ]),
});

export const LIVIAN_LUENTAKAUPUNGIT = Object.freeze(Object.keys(LIVIAN_LUENTA_CUET));
export const LIVIAN_PILOTTIKAUPUNGIT = Object.freeze(['marseille', 'ateena', 'sarajevo', 'venetsia']);
export const LIVIAN_PILOTTI_CUET = Object.freeze(Object.fromEntries(
  LIVIAN_PILOTTIKAUPUNGIT.map((kaupunki) => [kaupunki, LIVIAN_LUENTA_CUET[kaupunki]]),
));

export function livianLuentatyo(kaupunki, kentta = 'kommentti', kupla = 0) {
  const tyo = LIVIAN_LUENTA_CUET[String(kaupunki ?? '')];
  return tyo && tyo.kentta === kentta && tyo.kupla === kupla ? tyo : null;
}

/** Vain pilotin yhden kommenttikuplan (`city-3`) tekninen työ. */
export function livianPilottityo(kaupunki, kentta = 'kommentti', kupla = 0) {
  return LIVIAN_PILOTTIKAUPUNGIT.includes(String(kaupunki ?? ''))
    ? livianLuentatyo(kaupunki, kentta, kupla) : null;
}
