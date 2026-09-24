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
}
