/*
 * SKEEMA 1.26 (2.0-polku, Pelikoodarin pakettivartija 24.9.2026): loput
 * natiivin lukemat raakakentät päätasolle. Vartija (proto-3d
 * Peli-testit/vartija.sh --koe --raaka-kielletty) näytti v32:ssa lukijat,
 * joiden kenttiä ei vielä ollut päätasolla: tarinakaari, paikkatiedot,
 * kohtaamiset, kohtaamiskuvat, paikallisaarteet, saapumispuheet ja
 * fokusvirtojen kohtaamispiste ja sähketehtävä. Puuttuva arvo = null, jotta
 * kenttäjoukko ei vaihtele alkioittain (skeemasopimuksen kenttäkuva).
 */

const nollaksi = (v) => (v === undefined ? null : v);

/**
 * Raakakentät, joiden päätason vastine on eri niminen (2.0-vartija,
 * tests/sisaltopaketti.test.mjs). Muut raakakentät ovat päätasolla samalla nimellä.
 */
export const RAAKA_VASTINEET = {
  kaupungit: { name: 'nimi', x: 'lauta', y: 'lauta', airport: 'lentokentta', start: 'aloitus', pallo: 'lat/lon',
    ambience: 'ambienssi', la: 'nimionAnkkuri', lx: 'nimionAnkkuri', ly: 'nimionAnkkuri' },
  kysymykset: { q: 'kysymys', options: 'vaihtoehdot', correct: 'oikea', hint: 'vihje', fact: 'fakta', level: 'taso',
    source: 'lahde', place: 'paikka' },
  pulmat: { q: 'kysymys', options: 'vaihtoehdot', correct: 'oikea', hint: 'vihje', fact: 'fakta', source: 'lahde',
    title: 'otsikko', sketch: 'luonnos', city: 'kaupunki' },
  laatat: { counts: 'maarat', types: 'tyypit', mannerTypes: 'mannerTyypit' },
  reitit: { steps: 'askelia', type: 'laji' },
  paikkatiedot: { text: 'teksti', voice: 'aani', source: 'lahde' },
  saapumispuheet: { name: 'nimi', slogan: 'iskulause', text: 'teksti', duration: 'kesto', singleTake: 'yksiOtto' },
  kohtaamiset: { frame: 'kehys' },
  julisteet: { tiedosto: 'kuva', kaupunki: 'nimi' },
  kohtaamiskuvat: { kaupunki: 'kaupunginNimi' },
  tapahtumat: { text: 'teksti', effect: 'vaikutus' },
};

/**
 * Samanniminen päätason kenttä, joka on raakaa rikkaampi (tyypitetty): kuvat
 * olioina, tarinakaaren kysymys, paikallisaarteet, fokusvirtojen lehtitehtävien
 * id:t. Sisältövertailu (1.x vs 2.0) ei vaadi näiltä samaa arvoa.
 */
export const TYYPITETYT = {
  elaintayt: ['kuva', 'kuvat'], nahtavyydet: ['kuvat'], paikallisaarteet: ['isoAarre', 'pieniAarre'],
  tarinakaari: ['kysymys'], fokusvirrat: ['lehtitehtavat'],
};

/** Kokoelmat, joiden raaka data ei ole olio: raaka → päätason kenttä. */
export const RAAKA_KOKONAAN = {
  kaupunkilehdet: 'aiheet ja kansi', maalehdet: 'aiheet', miniatyyrit: 'kuva', paikkatiedot: 'teksti (merkkijono-data)',
  pulmaaineisto: 'aineisto (sama arvo)',
};
const poimi = (d, avaimet) => Object.fromEntries(avaimet.map(([ulos, sisaan = ulos]) => [ulos, nollaksi(d?.[sisaan])]));

export function tyypitaLoput(kokoelmat) {
  for (const a of kokoelmat.tarinakaari.alkiot) {
    const d = a.data ?? {};
    const k = d.kysymys;
    Object.assign(a, poimi(d, [['nimi'], ['otsikko'], ['henkilo'], ['saapuminen'], ['kohtaaminen'], ['aarre'],
      ['tunneKohtaaminen'], ['tunneAarre'], ['mykistetyt']]), {
      kysymys: k ? { kysymys: nollaksi(k.q), vaihtoehdot: nollaksi(k.vaihtoehdot), oikea: nollaksi(k.oikea), fakta: nollaksi(k.fakta) } : null,
    });
  }
  kokoelmat.tarinakaari.kuvaus += ' Skeema 1.26: päätasolla nimi, otsikko, henkilo, saapuminen, kohtaaminen, aarre, '
    + 'tunneKohtaaminen, tunneAarre { tunne, voimakkuus }, mykistetyt ja kysymys { kysymys, vaihtoehdot, oikea, fakta } | null.';

  for (const a of kokoelmat.paikkatiedot.alkiot) {
    const d = typeof a.data === 'string' ? { text: a.data } : (a.data ?? {});
    Object.assign(a, poimi(d, [['teksti', 'text'], ['aani', 'voice'], ['lahde', 'source'], ['wiki']]));
  }
  kokoelmat.paikkatiedot.kuvaus += ' Skeema 1.26: päätasolla teksti, aani (puhuja, esim. isoisa) | null, lahde | null, wiki | null.';

  for (const a of kokoelmat.kohtaamiset.alkiot) {
    Object.assign(a, poimi(a.data, [['hahmo'], ['nappi'], ['kehys', 'frame'], ['tervehdys'], ['loyto'], ['tyhja'], ['vaarin'],
      ['tervehdysLuenta'], ['loytoLuenta'], ['tunneTervehdys'], ['tunneLoyto'], ['tunneTyhja'], ['tunneVaarin']]));
  }
  kokoelmat.kohtaamiset.kuvaus += ' Skeema 1.26: päätasolla hahmo, nappi, kehys, tervehdys, loyto, tyhja, vaarin, '
    + 'tervehdysLuenta ja loytoLuenta [{ rooli, teksti }], tunneTervehdys/-Loyto/-Tyhja/-Vaarin { tunne, voimakkuus }.';

  for (const a of kokoelmat.kohtaamiskuvat.alkiot) {
    Object.assign(a, poimi(a.data, [['kohde'], ['aktiivinen'], ['tila'], ['hahmo'], ['maa'], ['alt'], ['lyhyt'],
      ['kuvateksti'], ['kaytto'], ['hetki'], ['vihje']]));
  }
  kokoelmat.kohtaamiskuvat.kuvaus += ' Skeema 1.26: päätasolla kohde, aktiivinen (null = aktiivinen), tila, hahmo, maa, '
    + 'alt, lyhyt, kuvateksti, kaytto, hetki ja vihje.';

  for (const a of kokoelmat.paikallisaarteet.alkiot) {
    for (const laji of ['pieniAarre', 'isoAarre']) {
      const d = a.data?.[laji];
      a[laji] = d ? { nimi: nollaksi(d.name), fakta: nollaksi(d.fakta), kuva: nollaksi(d.kuva), ...(a.kuvat?.[laji] ?? { url: null, varat: [] }) } : null;
    }
  }
  kokoelmat.paikallisaarteet.kuvaus += ' Skeema 1.26: päätasolla pieniAarre ja isoAarre { nimi, fakta, kuva (arvo), url, varat } | null.';

  for (const a of kokoelmat.saapumispuheet.alkiot) {
    Object.assign(a, poimi(a.data, [['nimi', 'name'], ['iskulause', 'slogan'], ['teksti', 'text'], ['url'],
      ['kesto', 'duration'], ['sha256'], ['yksiOtto', 'singleTake']]));
  }
  kokoelmat.saapumispuheet.kuvaus += ' Skeema 1.26: päätasolla nimi, iskulause, teksti, url (mp3), kesto (s), sha256 ja yksiOtto.';

  for (const a of kokoelmat.fokusvirrat.alkiot) {
    Object.assign(a, poimi(a.data, [['kohtaamispiste'], ['sahketehtava']]));
  }
  kokoelmat.fokusvirrat.kuvaus += ' Skeema 1.26: päätasolla kohtaamispiste { nimi, laudat { <lauta>: { x, y } } } | null '
    + 'ja sahketehtava (sellaisenaan: id, hahmo, sahke, aukot…) | null. Lehtitehtävien palkinnot: kokoelma lehtitehtavat.';

  // Skeema 1.30 (Pelikoodarin tilaus 24.9.2026): äänitaulujen, reittien ja laattatyyppien loput.
  const aaniKentat = {
    siirtyma: [['ryhma'], ['ampari'], ['oma'], ['voima'], ['nousuMs'], ['laskuMs']],
    tilaraita: [['tunnus'], ['kuvaus']],
    paikkaraita: [['tunnus'], ['kuvaus']],
    pulu: [['tunnus'], ['kesto'], ['voima']],
  };
  for (const a of kokoelmat.aanitaulut.alkiot) {
    if (aaniKentat[a.laji]) Object.assign(a, poimi(a.data, aaniKentat[a.laji]));
  }
  kokoelmat.aanitaulut.kuvaus += ' Skeema 1.30: päätasolla siirtyma: ryhma, ampari, oma, voima, nousuMs, laskuMs; '
    + 'tilaraita ja paikkaraita: tunnus, kuvaus; pulu: tunnus, kesto, voima.';

  const merimaksu = kokoelmat.saannot.alkiot.find((s) => s.id === 'SEA_FEE')?.arvo ?? null;
  for (const a of kokoelmat.reitit.alkiot) {
    a.maksu = a.laji === 'sea' ? (a.data?.fee ?? merimaksu) : 0;
  }
  kokoelmat.reitit.kuvaus += ' Skeema 1.30: maksu = matkan hinta (js/rules.js: merireitti data.fee ?? SEA_FEE, muut 0).';

  // Tyyppiolioihin suomenkieliset avaimet englanninkielisten rinnalle; 2.0 jättää vain suomenkieliset.
  const tyyppi = (t) => (t && typeof t === 'object' ? {
    ...t, nimi: nollaksi(t.name), symboli: nollaksi(t.symbol), arvo: nollaksi(t.value), vari: nollaksi(t.color),
  } : t);
  for (const a of kokoelmat.laatat.alkiot) {
    if (a.tyypit) a.tyypit = Object.fromEntries(Object.entries(a.tyypit).map(([k, t]) => [k, tyyppi(t)]));
    if (a.mannerTyypit) {
      a.mannerTyypit = Object.fromEntries(Object.entries(a.mannerTyypit)
        .map(([m, tt]) => [m, Object.fromEntries(Object.entries(tt ?? {}).map(([k, t]) => [k, tyyppi(t)]))]));
    }
  }
  kokoelmat.laatat.kuvaus += ' Skeema 1.30: tyypit ja mannerTyypit sisältävät myös nimi, symboli, arvo ja vari '
    + '(= name, symbol, value, color; 2.0 jättää vain suomenkieliset).';

  // Skeema 1.31 (Pelikoodarin vartijaraportti 24.9.2026, ennen 2.0:aa): loput raakakentät
  // päätasolle. Nämä kokoelmat ovat jo suomeksi, joten avaimet nostetaan sellaisenaan:
  // natiivin nykyinen polku data.X on 2.0:ssa X.
  const nostaLoput = (nimi) => {
    const avaimet = new Set();
    for (const a of kokoelmat[nimi].alkiot) {
      if (a.data && typeof a.data === 'object' && !Array.isArray(a.data)) for (const k of Object.keys(a.data)) if (!(k in a)) avaimet.add(k);
    }
    const lista = [...avaimet].sort();
    // Alkio saa vain omat raakakenttänsä (ei null-täyttöä: linssiaineiston alkiot ovat eri lajeja).
    for (const a of kokoelmat[nimi].alkiot) {
      if (a.data && typeof a.data === 'object' && !Array.isArray(a.data)) for (const [k, v] of Object.entries(a.data)) if (!(k in a)) a[k] = v;
    }
    kokoelmat[nimi].kuvaus += ` Skeema 1.31: päätasolla myös raakakentät sellaisenaan: ${lista.join(', ')}.`;
  };
  for (const nimi of ['skandaalit', 'historianHetket', 'monumentit', 'fokusvirrat']) nostaLoput(nimi);

  // Skeema 1.32 (Linssisepän 2.0-koe, 24.9.2026): linssiaineisto sellaisenaan ja loput
  // yksittäiset kentät. RAAKA_VASTINEET kertoo kentät, joilla on eri niminen päätaso.
  nostaLoput('linssiaineisto');
  for (const a of kokoelmat.tarinakaari.alkiot) Object.assign(a, poimi(a.data, [['kuva'], ['lauta'], ['saapumisLuenta']]));
  for (const a of kokoelmat.kohtaamiskuvat.alkiot) Object.assign(a, poimi(a.data, [['kansio'], ['tiedosto'], ['kaupunginNimi', 'kaupunki']]));
  for (const a of kokoelmat.tapahtumat.alkiot) Object.assign(a, poimi(a.data, [['teksti', 'text'], ['vaikutus', 'effect']]));
  kokoelmat.tarinakaari.kuvaus += ' Skeema 1.32: päätasolla myös kuva, lauta ja saapumisLuenta.';
  kokoelmat.kohtaamiskuvat.kuvaus += ' Skeema 1.32: päätasolla myös kansio, tiedosto (url on valmis osoite) ja kaupunginNimi (kaupunki = id).';
  kokoelmat.tapahtumat.kuvaus += ' Skeema 1.32: päätasolla teksti ja vaikutus (= webin effect sellaisenaan).';
  for (const a of kokoelmat.pulmaaineisto.alkiot) a.aineisto = nollaksi(a.data);
  kokoelmat.pulmaaineisto.kuvaus += ' Skeema 1.32: päätasolla aineisto = pulman taulukko sellaisenaan (= data).';

  for (const a of kokoelmat.kaupungit.alkiot) {
    const d = a.data ?? {};
    Object.assign(a, {
      wiki: nollaksi(d.wiki), ambienssi: nollaksi(d.ambience),
      nimionAnkkuri: d.la ? { tasaus: d.la, dx: nollaksi(d.lx), dy: nollaksi(d.ly) } : null,
    });
  }
  kokoelmat.kaupungit.kuvaus += ' Skeema 1.31: päätasolla wiki (artikkelin nimi), ambienssi (webin ambience) ja '
    + 'nimionAnkkuri { tasaus: start | end | middle, dx, dy } (laudan nimiön paikka pisteeseen nähden).';
}
