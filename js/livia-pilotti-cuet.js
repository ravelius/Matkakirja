/*
 * HORATIO–LIVIA-EUROOPAN TEKNINEN CUE-LÄHDE.
 *
 * Sanat ja cuejen toimituksellinen merkitys omistaa exact koontimanifesti
 * docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260913.json.
 * Tämä moduuli tekee niistä koneellisen sopimuksen alignment-työkalulle ja runtimelle.
 * Millisekunteja ei ole ennen lopullisen mp3:n forced alignmentia.
 */

export const LIVIAN_PILOTIN_REVISION = 'eu-hl-pilot-20260913-r2-approved1';
export const LIVIAN_E4_REVISION = 'eu-hl-e4-20260913-r1-approved1';
export const LIVIAN_EUROOPAN_REVISION = 'eu-hl-europe-20260913-r2-approved1';

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

const HYVAKSYTYT_12 = Object.freeze({
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

// Koontimanifestin muut 33 city-3-riviä. Taulukkomuoto pitää toimituksellisen
// datan tiiviinä: [tekstiSha256, [[id, ankkuri, esiintymä, tarkoitus, voimakkuus]]].
const EUROOPAN_MUUT_33 = Object.freeze({
  sofia: ['a2d6d6ffb6ccabd33da64e053acdce5b63479109e4b8de0433ad57671f067f14', [
    ['sofia.livia.c1', 'haetaan yhä kuumaa vettä', 1, 'myotailee', .35],
    ['sofia.livia.c2', 'höyry pörrötti otsasulkani', 1, 'hammentynyt', .30],
    ['sofia.livia.c3', 'Arvokkuus palasi', 1, 'huvittuu', .35],
  ]],
  istanbul: ['424c7fcfd70d847d423c47893c52a109fe20a62d374fd8e387cbf2cf7f60e2b5', [
    ['istanbul.livia.c1', 'Tünel kulkee yhä', 1, 'myotailee', .35],
    ['istanbul.livia.c2', 'ehdin perille ennen vaunua', 1, 'huvittuu', .30],
    ['istanbul.livia.c3', 'päätyvät samaan paikkaan', 1, 'myotailee', .45],
  ]],
  rooma: ['bae1b78438e851c193bb414cd5a123da3a27b87a156d5c1e94f0e321cf05633a', [
    ['rooma.livia.c1', 'ostetaan nyt pääsylippu', 1, 'selittaa', .40],
    ['rooma.livia.c2', 'kiersin aukon yläpuolella', 1, 'ilo', .45],
    ['rooma.livia.c3', 'väärään suuntaan nousevaa ilmavirtaa', 1, 'hammentynyt', .55],
  ]],
  bukarest: ['f252ce5afd9a9a6ad3039fb445984df0d7bef6cac4747f088193b907603553b2', [
    ['bukarest.livia.c1', 'sisäpihalla syödään yhä', 1, 'myotailee', .35],
    ['bukarest.livia.c2', 'sana ”salaisuus”', 1, 'hammastyy', .40],
    ['bukarest.livia.c3', 'Muruset unohtuivat', 1, 'huvittuu', .35],
  ]],
  madrid: ['06c2bc6f02e0d6cfb2016c26916b4f9a6a007b88cccde18617f3ba085dc510f6', [
    ['madrid.livia.c1', 'yhä Pradon salissa 12', 1, 'selittaa', .40],
    ['madrid.livia.c2', 'nukkuvaa koiraa', 1, 'lammin', .45],
    ['madrid.livia.c3', 'ei vilkaissut museoon', 1, 'ilo', .50],
  ]],
  wien: ['e7e526eac0575bb4e7556c2d094f046e2965733d9ef824d967efaffc57d84b74', [
    ['wien.livia.c1', 'Rotunde paloi myöhemmin', 1, 'miettiva', .45],
    ['wien.livia.c2', 'Pujottelin terassipöytien yllä', 1, 'ilo', .45],
    ['wien.livia.c3', 'taitellun lehden kohdalle', 1, 'miettiva', .40],
    ['wien.livia.c4', 'ihmistä paremmin kuin konetta', 1, 'lammin', .55],
  ]],
  pariisi: ['304579993d54852f2b18452809d2814b8397b64409df796a0fd4a8db4234e2e9', [
    ['pariisi.livia.c1', 'kaksi vuotta isoisän käynnin jälkeen', 1, 'myotailee', .40],
    ['pariisi.livia.c2', 'katon kultaukset ennen lippujonoa', 1, 'myotailee', .45],
    ['pariisi.livia.c3', 'räystäällä ei pyydetty pääsymaksua', 1, 'huvittuu', .55],
  ]],
  berliini: ['d4dcfab17290057b586c68e8944a02136a882b63d692125fae9df5354ca3c859', [
    ['berliini.livia.c1', '1938–1939 Großer Sternille', 1, 'selittaa', .40],
    ['berliini.livia.c2', 'Nousin patsaan tasalle', 1, 'ilo', .45],
    ['berliini.livia.c3', 'tuuli ei arvostanut vertailua', 1, 'hammentynyt', .50],
    ['berliini.livia.c4', 'ajattelin lehtipoikaa', 1, 'miettiva', .45],
    ['berliini.livia.c5', 'kuten isoisäkin', 1, 'lammin', .50],
  ]],
  lontoo: ['764407dba1673232efc46844241ae3856b43ae723e164c1a9dffbb0cb9c11548', [
    ['lontoo.livia.c1', 'Matkustajahöyryjunat', 1, 'myotailee', .35],
    ['lontoo.livia.c2', 'Lensin uloskäynniltä toiselle', 1, 'myotailee', .45],
    ['lontoo.livia.c3', 'ehdin nähdä kaupungin', 1, 'myotailee', .45],
  ]],
  budapest: ['0a95192174e2e5d3047d97bc8e9d6b17943e5a4253d2a73a05db88090bafe126', [
    ['budapest.livia.c1', 'kylvetään nyt katollakin', 1, 'hammastyy', .40],
    ['budapest.livia.c2', 'Höyry peitti vastarannan', 1, 'vakavoituu', .30],
    ['budapest.livia.c3', 'ainakin melkein', 1, 'huvittuu', .35],
  ]],
  dubrovnik: ['57cd6f64c3e20d293d97c72d9200276add4b58b7a8e26aee29e9a38f2cb85492', [
    ['dubrovnik.livia.c1', 'kuusitoista kivikasvoa', 1, 'myotailee', .35],
    ['dubrovnik.livia.c2', 'minäkin hiljenin hetkeksi', 1, 'hammastyy', .35],
    ['dubrovnik.livia.c3', 'laskin ne uudelleen', 1, 'huvittuu', .35],
  ]],
  praha: ['ddeeef8a4b8ae574d2872df4f3fbd9c5127a10de0290e90a46d982eaac36bf62', [
    ['praha.livia.c1', 'kokoaa torille väkeä yhä', 1, 'selittaa', .40],
    ['praha.livia.c2', 'istuin katon reunalla', 1, 'ilo', .40],
    ['praha.livia.c3', 'nostivat yhtä aikaa päänsä', 1, 'hammentynyt', .45],
    ['praha.livia.c4', 'luuranko liikahti', 1, 'hammentynyt', .50],
    ['praha.livia.c5', 'nostin minäkin', 1, 'ilo', .45],
  ]],
  kobenhavn: ['532a847728734e1af99697c578825f56975428f41baf16d557d7d78543a267bf', [
    ['kobenhavn.livia.c1', 'Tivoli huvittaa yhä', 1, 'myotailee', .35],
    ['kobenhavn.livia.c2', 'laskeutumaan tanssilattian reunalle', 1, 'huvittuu', .40],
    ['kobenhavn.livia.c3', 'pyytää kolmatta', 1, 'myotailee', .45],
  ]],
  sevilla: ['0fd228327bdfa562bce8aa7c51199dadcd17f0502e34abd7c39a6615bbb97fee', [
    ['sevilla.livia.c1', 'nyt yliopisto', 1, 'selittaa', .40],
    ['sevilla.livia.c2', 'niin suuren paperipinon', 1, 'ilo', .55],
    ['sevilla.livia.c3', 'eivät olleet kirjeitä', 1, 'hammentynyt', .45],
  ]],
  bergen: ['fc90d06f97a6fa68525f14309db76ff3a905c24d0666ae75bb90ec42ea6edd76', [
    ['bergen.livia.c1', 'nyt maailmanperintöä', 1, 'vakavoituu', .35],
    ['bergen.livia.c2', 'viereinen lokki ravisteli', 1, 'hammastyy', .35],
    ['bergen.livia.c3', 'Minä vaihdoin räystästä', 1, 'huvittuu', .40],
  ]],
  amsterdam: ['7bf9114a4a0786d2b1efa43a1276df559f1dfcfb131ebb7855f73cc0011b1a0c', [
    ['amsterdam.livia.c1', 'Nostoparruja on yhä', 1, 'myotailee', .35],
    ['amsterdam.livia.c2', 'yhdellä kaarroksella', 1, 'myotailee', .45],
    ['amsterdam.livia.c3', 'lentotaito ei ole muuttajan vika', 1, 'huvittuu', .55],
  ]],
  dublin: ['c14d37f9397da3c89d5f841aef425ce7bbf022bf5918819c5b6d677eacf848bd', [
    ['dublin.livia.c1', 'seitsemässä kerroksessa', 1, 'hammastyy', .40],
    ['dublin.livia.c2', 'Gravity Barin tasolle ulkokautta', 1, 'myotailee', .50],
    ['dublin.livia.c3', 'kierrokseni oli lyhyempi', 1, 'huvittuu', .50],
  ]],
  edinburgh: ['0c10b06819954310c377e62a5e8fa7940d967f86cb4d1e0a6ce38204e7a289c4', [
    ['edinburgh.livia.c1', 'kadutkin muuttuvat näyttämöiksi', 1, 'hammastyy', .40],
    ['edinburgh.livia.c2', 'laskeuduin väärälle katolle', 1, 'huvittuu', .50],
    ['edinburgh.livia.c3', 'missä kerroksessa esitys on', 1, 'huvittuu', .55],
  ]],
  lissabon: ['281581a4e5e898c1f524318dffc7c650aba776a5d8f1aaca22de2b01f2602616', [
    ['lissabon.livia.c1', 'Raitiovaunu 12 kulkee', 1, 'selittaa', .40],
    ['lissabon.livia.c2', 'sen kelloa kattojen yllä', 1, 'ilo', .45],
    ['lissabon.livia.c3', 'päätepysäkille asti', 1, 'huvittuu', .50],
  ]],
  barcelona: ['55004b6bdb9b5f9c4df3abbe895b838ec4c6904d09f2ec74c297b824071849e3', [
    ['barcelona.livia.c1', 'näkyvät ilmasta yhä', 1, 'selittaa', .40],
    ['barcelona.livia.c2', 'Laskeuduin räystäälle', 1, 'ilo', .45],
    ['barcelona.livia.c3', 'Minulle jäi taivas', 1, 'ilo', .55],
  ]],
  firenze: ['c667e8523678055133c79769ef456fa842796883a75a8afdbb53d634a95400bf', [
    ['firenze.livia.c1', 'nyt sisällä ja aukiolla kopio', 1, 'selittaa', .40],
    ['firenze.livia.c2', 'Kiersin museon katon kautta', 1, 'ilo', .45],
    ['firenze.livia.c3', 'Se ei räpäyttänyt', 1, 'hammentynyt', .50],
    ['firenze.livia.c4', 'taisin hävitä', 1, 'miettiva', .45],
  ]],
  oslo: ['069828779d606f4f3c80ba4fe3f9019a8bd1cc582dad299d47b0ab7d1c21a622', [
    ['oslo.livia.c1', 'Nimi on Oslo', 1, 'myotailee', .35],
    ['oslo.livia.c2', 'ihmiset nousivat samalle katolle', 1, 'hammentynyt', .35],
    ['oslo.livia.c3', 'jaloille ja siiville', 1, 'huvittuu', .40],
  ]],
  granada: ['62eb624ccd2ff45ace07709b2d288e1f3f7cfeee066d2244272850d0344a880b', [
    ['granada.livia.c1', 'allas peilaa tornia yhä', 1, 'selittaa', .40],
    ['granada.livia.c2', 'tuuli rikkoi palatsin ensin', 1, 'hammastys', .45],
    ['granada.livia.c3', 'nokkani ei ollut syyllinen', 1, 'ilo', .55],
  ]],
  kiova: ['afa42bbbdcfaec15fef158701bb7a6ce7a373ccb03f524daff13c2f190d77472', [
    ['kiova.livia.c1', 'luolasto jäi ihmisille', 1, 'hammastyy', .35],
    ['kiova.livia.c2', 'Reittiinsä luottava kirjekyyhky', 1, 'myotailee', .35],
    ['kiova.livia.c3', 'mihin ei lennä', 1, 'vakavoituu', .45],
  ]],
  krakova: ['ba0a8421bf7b014a40698d6d51e93ac2116dca94b652923f74e4b2c19354958d', [
    ['krakova.livia.c1', 'räystäällä ikkunan alla', 1, 'hammastyy', .35],
    ['krakova.livia.c2', 'neljään suuntaan', 1, 'myotailee', .35],
    ['krakova.livia.c3', 'täsmällistä jakelua', 1, 'huvittuu', .45],
  ]],
  moskova: ['687aafd256c18b363a154860a691626d634ccfd4e86bb1653ae75eabf2e921da', [
    ['moskova.livia.c1', 'puhelimet nousivat yhtä aikaa', 1, 'hammastyy', .35],
    ['moskova.livia.c2', 'Väistin kamerat', 1, 'huvittuu', .40],
    ['moskova.livia.c3', 'paljon ilmatilaa', 1, 'huvittuu', .45],
  ]],
  odessa: ['709246b12f59e5b3c3d19b028727df8e9cc10729414d9b3cd41cc1c80a82fa05', [
    ['odessa.livia.c1', 'vaarantuneen maailmanperinnön luettelossa', 1, 'vakavoituu', .55],
    ['odessa.livia.c2', 'Lensin portaiden yllä', 1, 'epailee', .40],
    ['odessa.livia.c3', 'tavallista enemmän väliä', 1, 'vakavoituu', .55],
  ]],
  pietari: ['00f5aad7f4b720e0ea7d7bdb313a8f056ad14762446e5fb0b7bd0d3e79305a84', [
    ['pietari.livia.c1', 'sillat nousivat', 1, 'hammastyy', .40],
    ['pietari.livia.c2', 'Vaihdoin reittiä', 1, 'myotailee', .35],
    ['pietari.livia.c3', 'ei luota pelkkään kelloon', 1, 'huvittuu', .45],
  ]],
  varsova: ['005c0cffc1fa698f9e5fb398ca175d18aad2481c18f251a9feefef9a25732ba1', [
    ['varsova.livia.c1', 'Torin räystäältä', 1, 'hammastyy', .35],
    ['varsova.livia.c2', 'jälleenrakennetut talot', 1, 'vakavoituu', .45],
    ['varsova.livia.c3', 'jatkaa elämäänsä', 1, 'myotailee', .45],
  ]],
  kreeta: ['268565b31f571dc4b732b692d5dc09821bda23af8e8e11375f616f392443ec90', [
    ['kreeta.livia.c1', 'nyt Kreikkaa', 1, 'myotailee', .35],
    ['kreeta.livia.c2', 'Väitin tienneeni suunnan', 1, 'huvittuu', .35],
    ['kreeta.livia.c3', 'siipeni löivät vähän nopeammin', 1, 'myotailee', .45],
  ]],
  sisilia: ['ac331a83b4fcc669811a2f1c0ef75edbb32769cf76081771e675eb968783cd52', [
    ['sisilia.livia.c1', 'kokoontuu Sisilian parlamentti', 1, 'selittaa', .40],
    ['sisilia.livia.c2', 'Kiersin pihan yllä', 1, 'ilo', .45],
    ['sisilia.livia.c3', 'Katon näin kuvassa', 1, 'hammentynyt', .50],
    ['sisilia.livia.c4', 'sisälle en lentänyt', 1, 'miettiva', .50],
  ]],
  islanti: ['edd43d46ddaa90ae568f83eb023e0e33679a03ee709c09de8fd6b146610ce336', [
    ['islanti.livia.c1', 'lämpenevät yhä maan voimalla', 1, 'hammastyy', .35],
    ['islanti.livia.c2', 'lämmittelin varpaitani', 1, 'myotailee', .35],
    ['islanti.livia.c3', 'jo ilmassa', 1, 'huvittuu', .40],
  ]],
  alpit: ['5c15ee5104983529668e0cc23184ee38474e767e21e2bc61726f3acbf102b513', [
    ['alpit.livia.c1', 'vetäytynyt kauas', 1, 'miettiva', .55],
    ['alpit.livia.c2', 'Lensin rotkon yllä', 1, 'ilo', .40],
    ['alpit.livia.c3', 'Kiviä oli liikaa', 1, 'hammentynyt', .45],
    ['alpit.livia.c4', 'En väitä löytäneeni oikeaa', 1, 'miettiva', .50],
  ]],
});

const muut33 = Object.fromEntries(Object.entries(EUROOPAN_MUUT_33).map(
  ([kaupunki, [tekstiSha256, cuet]]) => [kaupunki, pilotti(
    kaupunki,
    LIVIAN_EUROOPAN_REVISION,
    tekstiSha256,
    cuet.map(([id, ankkuri, esiintyma, tarkoitus, voimakkuus]) => (
      { id, ankkuri, esiintyma, tarkoitus, voimakkuus }
    )),
  )],
));

// Ensimmäiset 12 säilyvät byte-for-byte omilla hyväksytyillä revisioillaan.
export const LIVIAN_LUENTA_CUET = Object.freeze({ ...HYVAKSYTYT_12, ...muut33 });

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
