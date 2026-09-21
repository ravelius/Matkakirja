/*
 * MUUTTOLINNUT — LASKENTA (neljäs leikkilinssi, Fable 21.9.2026).
 *
 * Aineisto on js/packs/linssi-muuttolinnut.js (pelin oma reittitaulukko,
 * Fablen tarkistama). Tämä moduuli antaa parven paikan kuukaudesta,
 * reitin polkupisteet, Livian kysymyksen ({LAJI}, {KUUKAUSI} → maa
 * napauttamalla) ja palautteet. Puhdasta laskentaa; polut, parvet ja
 * kortti ovat js/linssit/muuttolinnut.js:ssä.
 */

import { KUUKAUDET, MUUTTOLINNUT } from '../packs/linssi-muuttolinnut.js';

/** Tietäjäpisteet oikeasta maasta (Fable 21.9.2026). */
export const ARVAUKSEN_TP = 20;

/** Kuukausi 0…11 hetkestä (paikallinen aika). */
export function kuukausiHetkesta(hetkiMs = Date.now()) {
  return new Date(hetkiMs).getMonth();
}

/**
 * Parven paikka kuukautena: paikallaan ({ piste, paikallaan: true }) tai
 * matkalla kahden pisteen puolivälissä ({ mista, mihin, paikallaan:
 * false }); lat/lon aina mukana.
 */
export function parvenPaikka(laji, kuukausi) {
  const k = laji.kuukaudet[((kuukausi % 12) + 12) % 12];
  if (Array.isArray(k)) {
    const a = laji.reitti[k[0]];
    const b = laji.reitti[k[1]];
    return {
      paikallaan: false, mista: a, mihin: b, maa: null,
      lat: (a.lat + b.lat) / 2, lon: (a.lon + b.lon) / 2,
    };
  }
  const p = laji.reitti[k];
  return { paikallaan: true, piste: p, maa: p.maa, lat: p.lat, lon: p.lon };
}

/** Reitin polkupisteet [[lat, lng]…] syysmuuton järjestyksessä. */
export function reitinPisteet(laji) {
  return laji.reitti.map((p) => [p.lat, p.lon]);
}

/** Kuukaudet, joina laji on paikallaan jossakin maassa (Livia kysyy vain näitä). */
export function kysyttavatKuukaudet(laji) {
  return laji.kuukaudet.map((k, i) => (Array.isArray(k) ? null : i)).filter((i) => i !== null);
}

/** Fisher–Yates annetulla arvalla. */
export function sekoita(lista, arpa = Math.random) {
  const ulos = [...lista];
  for (let i = ulos.length - 1; i > 0; i -= 1) {
    const j = Math.min(i, Math.floor(arpa() * (i + 1)));
    [ulos[i], ulos[j]] = [ulos[j], ulos[i]];
  }
  return ulos;
}

/*
 * LIVIAN KYSYMYKSET (Fable 21.9.2026, sanatarkasti). {LAJI} on lajin
 * nimi perusmuodossa, {KUUKAUSI} partitiivissa ("lokakuussa"), {MAA}
 * palautteessa maan nimi.
 */
export const LIVIAN_KYSYMYKSET = [
  { tunnus: 'evaat', teksti: 'Tämä parvi on {LAJI}. Missä maassa se lepää {KUUKAUSI}? Napauta palloa. Minä olisin jo perillä, mutta minä en pysähdy syömään.' },
  { tunnus: 'kaksikotia', teksti: 'Kirjekyyhkyllä on yksi koti, muuttolinnulla kaksi. {LAJI} on {KUUKAUSI} matkalla. Missä maassa se on juuri nyt?' },
  { tunnus: 'kurkiaura', teksti: 'Isoisäsi laski kurkiauran satamasta ja merkitsi suunnan. Sinulle riittää maa: missä {LAJI} on {KUUKAUSI}?' },
];
export const PALAUTE_OIKEIN = 'Aivan, {MAA}. Sinne minäkin lentäisin, jos joku kantaisi eväät.';
export const PALAUTE_VAARIN = 'Ei, {MAA}. Parvi ei eksy, sinä eksyit. Katso reitti vielä kerran.';

/** Kysymyksen teksti täytettynä. */
export function kysymyksenTeksti(kysymys, laji, kuukausi) {
  return kysymys.teksti.split('{LAJI}').join(laji.nimi).split('{KUUKAUSI}').join(KUUKAUDET[kuukausi]);
}

/** Palaute maan nimellä. */
export function palaute(oikein, maanNimi) {
  return (oikein ? PALAUTE_OIKEIN : PALAUTE_VAARIN).split('{MAA}').join(maanNimi);
}

/**
 * Arvo kysymys: laji (ei juuri kysytty) ja kuukausi, jona se on
 * paikallaan — mieluiten muu kuin Suomi, jotta vastaus ei ole aina
 * kotimaa. Kysymysteksti vuorotellen.
 */
export function arvoKysymys({ lajit = MUUTTOLINNUT, kysytyt = new Set(), jarjestys = 0, arpa = Math.random } = {}) {
  if (!lajit.length) return null;
  const tuoreet = lajit.filter((l) => !kysytyt.has(l.tunnus));
  const lahde = tuoreet.length ? tuoreet : lajit;
  const laji = lahde[Math.min(lahde.length - 1, Math.floor(arpa() * lahde.length))];
  const kuukaudet = kysyttavatKuukaudet(laji);
  const ulkomailla = kuukaudet.filter((k) => parvenPaikka(laji, k).maa !== 'FIN');
  const pohja = ulkomailla.length ? ulkomailla : kuukaudet;
  if (!pohja.length) return null;
  const kuukausi = pohja[Math.min(pohja.length - 1, Math.floor(arpa() * pohja.length))];
  const paikka = parvenPaikka(laji, kuukausi);
  return {
    laji, kuukausi, maa: paikka.maa, piste: paikka.piste,
    kysymys: LIVIAN_KYSYMYKSET[jarjestys % LIVIAN_KYSYMYKSET.length],
  };
}

/** Taulukon eheys: 12 kuukautta, viittaukset reitin sisällä, pesimä Suomessa ensin. */
export function tarkistaTaulukko(lajit = MUUTTOLINNUT) {
  const viat = [];
  for (const l of lajit) {
    if (l.kuukaudet.length !== 12) viat.push(`${l.tunnus}: kuukausia ${l.kuukaudet.length}`);
    if (l.reitti[0]?.maa !== 'FIN') viat.push(`${l.tunnus}: reitti ei ala Suomesta`);
    for (const [i, k] of l.kuukaudet.entries()) {
      const idx = Array.isArray(k) ? k : [k];
      for (const n of idx) if (!Number.isInteger(n) || n < 0 || n >= l.reitti.length) viat.push(`${l.tunnus}: kuukausi ${i + 1} viittaa ${n}`);
    }
    for (const p of l.reitti) {
      if (!(Math.abs(p.lat) <= 90 && Math.abs(p.lon) <= 180)) viat.push(`${l.tunnus}: ${p.nimi} asteet`);
      if (!/^[A-Z]{3}$/.test(p.maa ?? '')) viat.push(`${l.tunnus}: ${p.nimi} maa`);
    }
  }
  return viat;
}
