/*
 * KELLOT — AJAN LASKENTA (leikkilinssi, Fable 21.9.2026).
 *
 * Kaksi aikaa samalle hetkelle:
 *
 *   NYT     kaupungin vyöhykeaika: maan IANA-vyöhyke (isoissa maissa
 *           pituusasteen mukaan) ja selaimen Intl, joka tuntee kesäajan.
 *   1873    paikallinen aurinkoaika: UTC + pituusaste × 4 min. Ennen
 *           vuoden 1884 meridiaanikonferenssia jokaisella kaupungilla
 *           oli oma keskiaurinkoaikansa — Pariisin ja Marseillen ero on
 *           noin 12 minuuttia (Horatio mittasi sen tornikellosta).
 *           Greenwich = 0; Pariisi (+2,35°) on +9 min, Helsinki (+24,9°)
 *           +1 h 40 min.
 *
 * Kaikki tässä on puhdasta laskentaa (testattavissa Nodessa); piirto ja
 * käyttöliittymä ovat js/linssit/kellot.js:ssä.
 */

/** Minuutteja vuorokaudessa. */
export const VUOROKAUSI_MIN = 24 * 60;
/** Arvauksen sallittu heitto (min), Fablen suunnitelma: ±5 min. */
export const ARVAUKSEN_TOLERANSSI_MIN = 5;
/** Tietäjäpisteet oikeasta arvauksesta. */
export const ARVAUKSEN_TP = 20;

/*
 * MAA → IANA-VYÖHYKE. Isoissa maissa vyöhyke valitaan pituusasteesta
 * (funktio). Puuttuva maa putoaa pituusasteen mukaiseen kokonais-
 * tuntiin (ilman kesäaikaa) — `vyohykeKaupungille` merkitsee sen
 * `arvio: true`, jotta kello voi näyttää sen himmeämmin.
 */
const VYOHYKKEET = {
  GBR: 'Europe/London', IRL: 'Europe/Dublin', PRT: 'Europe/Lisbon', ISL: 'Atlantic/Reykjavik',
  FRA: (lon, lat) => (lon < -30 ? 'America/Cayenne' : (lon > 160 ? 'Pacific/Noumea' : 'Europe/Paris')),
  ESP: 'Europe/Madrid', NLD: 'Europe/Amsterdam', BEL: 'Europe/Brussels', DEU: 'Europe/Berlin',
  CHE: 'Europe/Zurich', AUT: 'Europe/Vienna', ITA: 'Europe/Rome', DNK: 'Europe/Copenhagen',
  NOR: 'Europe/Oslo', SWE: 'Europe/Stockholm', FIN: 'Europe/Helsinki', EST: 'Europe/Tallinn',
  LVA: 'Europe/Riga', LTU: 'Europe/Vilnius', POL: 'Europe/Warsaw', CZE: 'Europe/Prague',
  SVK: 'Europe/Bratislava', HUN: 'Europe/Budapest', SVN: 'Europe/Ljubljana', HRV: 'Europe/Zagreb',
  BIH: 'Europe/Sarajevo', ROU: 'Europe/Bucharest', BGR: 'Europe/Sofia', GRC: 'Europe/Athens',
  CYP: 'Asia/Nicosia', TUR: 'Europe/Istanbul', UKR: 'Europe/Kyiv',
  RUS: (lon, lat) => {
    if (lon < 25) return 'Europe/Kaliningrad';
    if (lon < 52) return 'Europe/Moscow';
    if (lon < 68) return 'Asia/Yekaterinburg';
    if (lon < 80) return 'Asia/Omsk';
    if (lon < 95) return 'Asia/Novosibirsk';
    if (lon < 110) return 'Asia/Irkutsk';
    // Jakutsk (129,7°, +9) ja Vladivostok (131,9°, +10) erotetaan leveysasteesta.
    if (lon < 135) return lat < 50 ? 'Asia/Vladivostok' : 'Asia/Yakutsk';
    if (lon < 142) return 'Asia/Vladivostok';
    if (lon < 155) return 'Asia/Magadan';
    return 'Asia/Kamchatka';
  },
  MAR: 'Africa/Casablanca', DZA: 'Africa/Algiers', TUN: 'Africa/Tunis', LBY: 'Africa/Tripoli',
  EGY: 'Africa/Cairo', MLI: 'Africa/Bamako', SEN: 'Africa/Dakar', SLE: 'Africa/Freetown',
  LBR: 'Africa/Monrovia', GHA: 'Africa/Accra', NGA: 'Africa/Lagos', TCD: 'Africa/Ndjamena',
  CMR: 'Africa/Douala', COD: (lon) => (lon < 26 ? 'Africa/Kinshasa' : 'Africa/Lubumbashi'),
  AGO: 'Africa/Luanda', NAM: 'Africa/Windhoek', SHN: 'Atlantic/St_Helena', ZAF: 'Africa/Johannesburg',
  ZWE: 'Africa/Harare', MOZ: 'Africa/Maputo', MDG: 'Indian/Antananarivo', TZA: 'Africa/Dar_es_Salaam',
  KEN: 'Africa/Nairobi', UGA: 'Africa/Kampala', SDS: 'Africa/Juba', SDN: 'Africa/Khartoum',
  ETH: 'Africa/Addis_Ababa', SOM: 'Africa/Mogadishu',
  SYR: 'Asia/Damascus', JOR: 'Asia/Amman', SAU: 'Asia/Riyadh', YEM: 'Asia/Aden', OMN: 'Asia/Muscat',
  ARE: 'Asia/Dubai', QAT: 'Asia/Qatar', KWT: 'Asia/Kuwait', IRQ: 'Asia/Baghdad', IRN: 'Asia/Tehran',
  JPN: 'Asia/Tokyo', KAZ: (lon) => (lon < 63 ? 'Asia/Aqtobe' : 'Asia/Almaty'), MNG: 'Asia/Ulaanbaatar',
  CHN: 'Asia/Shanghai', KOR: 'Asia/Seoul', TWN: 'Asia/Taipei', HKG: 'Asia/Hong_Kong', PHL: 'Asia/Manila',
  VNM: 'Asia/Ho_Chi_Minh', THA: 'Asia/Bangkok', MMR: 'Asia/Yangon', SGP: 'Asia/Singapore',
  IDN: (lon) => (lon < 113 ? 'Asia/Jakarta' : (lon < 128 ? 'Asia/Makassar' : 'Asia/Jayapura')),
  NPL: 'Asia/Kathmandu', IND: 'Asia/Kolkata', LKA: 'Asia/Colombo', PAK: 'Asia/Karachi',
  AFG: 'Asia/Kabul', UZB: 'Asia/Samarkand', TLS: 'Asia/Dili',
  USA: (lon, lat) => {
    if (lat < 25 && lon < -150) return 'Pacific/Honolulu';
    if (lon < -140) return 'America/Anchorage';
    if (lon < -114) return 'America/Los_Angeles';
    if (lon < -102) return 'America/Denver';
    if (lon < -85) return 'America/Chicago';
    return 'America/New_York';
  },
  CAN: (lon) => {
    if (lon < -120) return 'America/Vancouver';
    if (lon < -102) return 'America/Edmonton';
    if (lon < -89) return 'America/Winnipeg';
    if (lon < -66) return 'America/Toronto';
    if (lon < -57) return 'America/Halifax';
    return 'America/St_Johns';
  },
  GRL: 'America/Nuuk', CUB: 'America/Havana', MEX: (lon) => (lon < -105 ? 'America/Hermosillo' : 'America/Mexico_City'),
  GTM: 'America/Guatemala', NIC: 'America/Managua', PAN: 'America/Panama', ARG: 'America/Argentina/Buenos_Aires',
  VEN: 'America/Caracas', COL: 'America/Bogota', ECU: (lon) => (lon < -85 ? 'Pacific/Galapagos' : 'America/Guayaquil'),
  BRA: (lon) => (lon < -57 ? 'America/Manaus' : 'America/Sao_Paulo'), PER: 'America/Lima', BOL: 'America/La_Paz',
  CHL: (lon) => (lon < -100 ? 'Pacific/Easter' : 'America/Santiago'), PRY: 'America/Asuncion', URY: 'America/Montevideo',
  AUS: (lon, lat) => {
    if (lon < 129) return 'Australia/Perth';
    if (lon < 138) return lat < -26 ? 'Australia/Adelaide' : 'Australia/Darwin';
    if (lon > 160) return 'Pacific/Norfolk';
    if (lat < -39) return 'Australia/Hobart';
    return lat < -29 ? 'Australia/Sydney' : 'Australia/Brisbane';
  },
  PNG: 'Pacific/Port_Moresby', SLB: 'Pacific/Guadalcanal', VUT: 'Pacific/Efate', FJI: 'Pacific/Fiji',
  NZL: 'Pacific/Auckland',
};

/**
 * Kaupungin IANA-vyöhyke maasta ja sijainnista.
 * @returns {{tz: string|null, arvio: boolean}}
 */
export function vyohykeKaupungille(maa, lon, lat = 0) {
  const v = VYOHYKKEET[maa];
  if (typeof v === 'function') return { tz: v(lon, lat), arvio: false };
  if (typeof v === 'string') return { tz: v, arvio: false };
  return { tz: null, arvio: true };
}

/** Kokonaistunnin vyöhyke pituusasteesta (−12…+12), ilman kesäaikaa. */
export function nimellinenVyohyke(lon) {
  let n = Math.round(lon / 15);
  if (n > 12) n -= 24;
  if (n < -12) n += 24;
  return n;
}

/** Minuutit vuorokauden alusta välille [0, 1440). */
export function vuorokaudenMinuutit(min) {
  return ((Math.round(min) % VUOROKAUSI_MIN) + VUOROKAUSI_MIN) % VUOROKAUSI_MIN;
}

/** UTC-hetken minuutit vuorokauden alusta. */
function utcMinuutit(hetkiMs) {
  const d = new Date(hetkiMs);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
}

/**
 * 1873: paikallinen keskiaurinkoaika = UTC + lon × 4 min.
 * @param {number} hetkiMs UTC-hetki (Date.now())
 * @param {number} lon pituusaste (itä +)
 * @returns {number} minuutit vuorokauden alusta
 */
export function aurinkoaika(hetkiMs, lon) {
  return vuorokaudenMinuutit(utcMinuutit(hetkiMs) + lon * 4);
}

/**
 * Vyöhykkeen siirtymä UTC:stä minuutteina annetulla hetkellä (kesäaika
 * mukana), Intl:llä. Tuntemattomalle vyöhykkeelle null.
 */
export function vyohykkeenSiirtyma(hetkiMs, tz, IntlApi = globalThis.Intl) {
  if (!tz || !IntlApi?.DateTimeFormat) return null;
  try {
    const osat = new IntlApi.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
    }).formatToParts(new Date(hetkiMs));
    const luku = (t) => Number(osat.find((o) => o.type === t)?.value);
    const paikallinen = Date.UTC(luku('year'), luku('month') - 1, luku('day'), luku('hour') % 24, luku('minute'));
    const utc = Math.floor(hetkiMs / 60000) * 60000;
    return Math.round((paikallinen - utc) / 60000);
  } catch {
    return null;
  }
}

/**
 * NYT: kaupungin vyöhykeaika minuutteina vuorokauden alusta sekä
 * siirtymä UTC:stä. Ilman vyöhykettä nimellinen kokonaistunti.
 */
export function vyohykeaika(hetkiMs, { maa, lon, lat = 0 }, IntlApi = globalThis.Intl) {
  const { tz, arvio } = vyohykeKaupungille(maa, lon, lat);
  let siirtyma = vyohykkeenSiirtyma(hetkiMs, tz, IntlApi);
  let arvioitu = arvio;
  if (siirtyma === null) { siirtyma = nimellinenVyohyke(lon) * 60; arvioitu = true; }
  return { minuutit: vuorokaudenMinuutit(utcMinuutit(hetkiMs) + siirtyma), siirtyma, tz, arvio: arvioitu };
}

/** "12.07" — pelin tapaan pisteellä. */
export function kellonaikaTeksti(min) {
  const m = vuorokaudenMinuutit(min);
  return `${String(Math.floor(m / 60)).padStart(2, '0')}.${String(m % 60).padStart(2, '0')}`;
}

/** "+1 h", "+5.30", "−3 h" — vyöhykkeen siirtymä tekstinä. */
export function siirtymaTeksti(siirtymaMin) {
  const merkki = siirtymaMin < 0 ? '−' : '+';
  const abs = Math.abs(siirtymaMin);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m ? `${merkki}${h}.${String(m).padStart(2, '0')}` : `${merkki}${h} h`;
}

/**
 * "12.07", "12:07", "1207", "12" → minuutit vuorokauden alusta, tai
 * null, jos teksti ei ole kellonaika.
 */
export function jasennaKellonaika(teksti) {
  const s = String(teksti ?? '').trim().replace(',', '.');
  const m = /^(\d{1,2})(?:[.:]\s*(\d{1,2}))?$/.exec(s) ?? /^(\d{1,2})(\d{2})$/.exec(s);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2] ?? 0);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/** Lyhin ero kahden vuorokauden minuutin välillä (0…720). */
export function minuuttiero(a, b) {
  const d = Math.abs(vuorokaudenMinuutit(a) - vuorokaudenMinuutit(b));
  return Math.min(d, VUOROKAUSI_MIN - d);
}

/** Osuiko arvaus: ero enintään toleranssi. */
export function arvausOsuu(arvausMin, oikeaMin, toleranssi = ARVAUKSEN_TOLERANSSI_MIN) {
  if (!Number.isFinite(arvausMin) || !Number.isFinite(oikeaMin)) return false;
  return minuuttiero(arvausMin, oikeaMin) <= toleranssi;
}

/*
 * LIVIAN KYSYMYKSET (Fable 21.9.2026, sanatarkasti; {A} ja {B} ovat
 * kaupunkien nimet perusmuodossa). Kysymys 2 koskee nykyaikaa, 1 ja 3
 * vuotta 1873. Kaupungissa A kello on tasan 12; oikea vastaus on B:n
 * kello samalla hetkellä.
 */
export const LIVIAN_KYSYMYKSET = [
  {
    tunnus: 'siivilla',
    tila: '1873',
    teksti: 'Kello on tasan kaksitoista kaupungissa {A}. Paljonko se on kaupungissa {B} vuonna 1873? Arvaa minuutin tarkkuudella, minä laskin sen kerran siivillä.',
  },
  {
    tunnus: 'vyohykkeet',
    tila: 'nyt',
    teksti: 'Sama pari, mutta tänään: kaupunki {A} näyttää kahtatoista. Mitä kello on kaupungissa {B}? Vihje: vyöhykkeet ovat ihmisten keksintö, aurinko ei niistä tiedä.',
  },
  {
    tunnus: 'torit',
    tila: '1873',
    teksti: 'Vuonna 1873 jokaisella torilla oli oma aikansa, ja junat myöhästyivät periaatteesta. Kaupunki {A}: kaksitoista. Kaupunki {B} samalla hetkellä?',
  },
];

/** Kysymyksen teksti kaupunkien nimillä. */
export function kysymyksenTeksti(kysymys, a, b) {
  return kysymys.teksti.split('{A}').join(a).split('{B}').join(b);
}

/**
 * Oikea vastaus: kun A:ssa on 12.00, B:n kello samalla hetkellä.
 *   1873: ero = (lonB − lonA) × 4 min.
 *   nyt:  ero = siirtymäB − siirtymäA (vyöhykkeet, kesäaika mukana).
 * @returns {{minuutit: number, ero: number}} ero minuutteina (B − A)
 */
export function oikeaVastaus(kysymys, a, b, hetkiMs, IntlApi = globalThis.Intl) {
  const ero = kysymys.tila === '1873'
    ? (b.lon - a.lon) * 4
    : vyohykeaika(hetkiMs, b, IntlApi).siirtyma - vyohykeaika(hetkiMs, a, IntlApi).siirtyma;
  return { minuutit: vuorokaudenMinuutit(12 * 60 + ero), ero: Math.round(ero) };
}

/**
 * Kysymyspari näkyvistä kaupungeista: 1873-kysymykseen kaupungit,
 * joiden pituusaste-ero on 2–40° (8 min – 2 h 40 min: laskettavissa,
 * ei triviaali); nyt-kysymykseen eri vyöhyke (siirtymät eroavat).
 * `arpa` on [0,1) → deterministinen testeissä.
 */
export function valitseKysymyspari(kaupungit, kysymys, hetkiMs, arpa = Math.random, IntlApi = globalThis.Intl) {
  const parit = [];
  for (let i = 0; i < kaupungit.length; i += 1) {
    for (let j = 0; j < kaupungit.length; j += 1) {
      if (i === j) continue;
      const a = kaupungit[i];
      const b = kaupungit[j];
      if (kysymys.tila === '1873') {
        const ero = Math.abs(b.lon - a.lon);
        if (ero >= 2 && ero <= 40) parit.push([a, b]);
      } else if (vyohykeaika(hetkiMs, a, IntlApi).siirtyma !== vyohykeaika(hetkiMs, b, IntlApi).siirtyma) {
        parit.push([a, b]);
      }
    }
  }
  if (!parit.length) return null;
  return parit[Math.min(parit.length - 1, Math.floor(arpa() * parit.length))];
}

/**
 * Aikavyöhykkeiden rajat pallolle: 24 pituuspiiriä (15n + 7,5°) ohuina
 * katkoviivoina navalta navalle (polkukerros; polygoni ei kelpaa —
 * globe.gl kolmioi 170° korkean nelikulmion pallolle vinoina laattoina,
 * mitattu 21.9.2026). Rajat ovat NIMELLISIÄ (auringon vyöhykkeet);
 * todelliset rajat mutkittelevat valtioiden mukaan, ja sen kertoo kello.
 */
export function vyohykerajat({ vari = 'rgba(70, 51, 31, 0.55)', paksuus = 0.9, katko = 0.35, lat = 80, askel = 10 } = {}) {
  const ulos = [];
  for (let n = -12; n <= 11; n += 1) {
    const lng = n * 15 + 7.5;
    const pisteet = [];
    for (let l = -lat; l <= lat; l += askel) pisteet.push([l, lng]);
    ulos.push({ avain: `vyohykeraja:${n}`, vyohyke: n, pisteet, vari, paksuus, katko });
  }
  return ulos;
}
