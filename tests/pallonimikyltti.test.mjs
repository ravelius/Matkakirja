import { test } from 'node:test';
import assert from 'node:assert/strict';

/*
 * NIMIKYLTTI ON KIINNI KAUPUNGISSA, EI RUUDUSSA (omistaja 14.9.2026,
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 12 kohta 1, sanatarkasti:
 * *"Pariisin nimikyltti liikkuu panoroitaessa. sen pitaa pysya
 * paikallaan."*; js/pallolauta/nimet.js).
 *
 * Juurisyy ei ole ankkuri vaan törmäyksenvältön UUDELLEENLASKENTA:
 * ladonta ajetaan viisi kertaa sekunnissa myös panoroinnin aikana
 * (js/pallolauta/lauta.js LADONTA KULKEE MUKANA), ja `ladoRuutunimet`
 * valitsee kyljen ja siirron joka kerta uudestaan. Vartiot:
 *
 *   1. LUKKO PITÄÄ. Kun kamera panoroi eikä zoomi muutu, jokaisen
 *      ladotun nimen sijoitus PISTEEN SUHTEEN (dx, dy, ank) on tavulleen
 *      sama kuin saapuessa.
 *   2. VASTAKOE. Sama kahden näkymän pari AILAHTELEE, jos sijoitus
 *      luetaan suoraan `ladoRuutunimet`ista ilman lukkoa — muuten
 *      vartio 1 ei mittaa mitään.
 *   3. ZOOMI LATOO UUDELLEEN: kun `kokoKerroin` muuttuu, lukko ei sido.
 *   4. PUDONNUT NIMI SAA UUDEN SIJOITUKSEN: kun nimi katoaa näkyvistä
 *      ja palaa, se ladotaan taas kerran (lukko ei jää muistiin).
 */

const { luoNimet } = await import('../js/pallolauta/nimet.js');
const { ladoRuutunimet, karttanimienKaupungit } = await import('../js/karttanimet.js');
const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');

const PARIISI = MAAILMANKARTTA.cities.find((c) => c.id === 'pariisi');

/** Väärennetty pallo: lautayksiköt ruudulle suoralla mittakaavalla. */
function ymparisto({ px = 390 / 240, W = 390, H = 844 } = {}) {
  const keskus = { x: PARIISI.x, y: PARIISI.y };
  const merkityt = [];
  const nimet = luoNimet({
    ui: { dead: false, game: { pack: MAAILMANKARTTA, cityOf: () => PARIISI } },
    merkit: { aseta: (osa, lista) => merkityt.push({ osa, lista }) },
    asteet: (c) => ({ lat: c.y, lon: c.x }),
    ruudulla: (lat, lng) => {
      const x = (lng - keskus.x) * px + W / 2;
      const y = (lat - keskus.y) * px + H / 2;
      return (x < 0 || y < 0 || x > W || y > H) ? null : { x, y };
    },
    kotelo: { clientWidth: W, clientHeight: H },
    pack: MAAILMANKARTTA,
  });
  return {
    nimet,
    /** Panoroi näkymää lautayksiköissä. */
    panoroi(dx, dy) { keskus.x += dx; keskus.y += dy; },
    /** Viimeksi asetettujen datumien kirjasinkoot. */
    koot() {
      const lista = merkityt.at(-1)?.lista ?? [];
      return new Map(lista.map((d) => [d.id, d.koko]));
    },
    /** Viimeksi asetetut datumit sijoituksineen. */
    sijoitukset() {
      const lista = merkityt.at(-1)?.lista ?? [];
      return new Map(lista.map((d) => [d.id, `${d.dx.toFixed(3)}|${d.dy.toFixed(3)}|${d.ank}`]));
    },
  };
}

/*
 * Panorointi 200 px kahteen suuntaan sadan pikselin askelin, kuten
 * savuke tekee selaimessa. Askel on PIKSELEINÄ ja käännetään
 * lautayksiköiksi mittakaavalla, jotta sama sarja mittaa saman matkan
 * joka zoomitasolla.
 */
const ASKELEET_PX = [[100, 0], [100, 0], [0, 100], [0, 100]];

/*
 * Ruutu on työpöydän kokoinen: 200 px:n veto puhelimen 390 px:n
 * ruudulla veisi Pariisin laitaan asti, ja silloin lukko purkautuu
 * tarkoituksella (ks. RUUDUN REUNA PURKAA LUKON) — puhelimen mitta
 * tehdään selaimessa savukkeella, joka osaa lukea nimen etäisyyden
 * reunasta.
 */
for (const px of [1400 / 240, 1400 / 1200, 1400 / 4000]) {
  test(`1. lukko pitää (mittakaava ${px.toFixed(4)} px/yks): panorointi ei muuta sijoitusta pisteen suhteen`, () => {
    const y = ymparisto({ px, W: 1400, H: 900 });
    y.nimet.lado({ katto: 40 });
    const alku = y.sijoitukset();
    assert.ok(alku.size > 0, 'nimiä ladottiin');
    for (const [dx, dy] of ASKELEET_PX) {
      y.panoroi(dx / px, dy / px);
      y.nimet.lado({ katto: 40 });
      for (const [id, sijainti] of y.sijoitukset()) {
        if (!alku.has(id)) continue; // uusi nimi saa oman sijoituksensa
        assert.equal(sijainti, alku.get(id), `${id} pysyi paikallaan`);
      }
    }
  });
}

test('2. VASTAKOE: ilman lukkoa sama panorointi ailahtelee', () => {
  const px = 1400 / 1200;
  const W = 1400;
  const H = 900;
  const ehdokkaat = (sx, sy) => {
    const ulos = [];
    for (const c of karttanimienKaupungit(MAAILMANKARTTA)) {
      const x = (c.x - PARIISI.x - sx) * px + W / 2;
      const y = (c.y - PARIISI.y - sy) * px + H / 2;
      if (x < 0 || y < 0 || x > W || y > H) continue;
      ulos.push({ c, x, y, tarkeys: c.tarkeys + (c.id === 'pariisi' ? 1000 : 0) });
    }
    return ulos.sort((a, b) => (b.tarkeys - a.tarkeys)
      || ((b.c.aste ?? 0) - (a.c.aste ?? 0)) || (a.c.nimi < b.c.nimi ? -1 : 1));
  };
  const lado = (sx, sy) => {
    const t = ladoRuutunimet(ehdokkaat(sx, sy), { katto: 40, ruutu: { w: W, h: H } });
    return new Map(t.nimiot.map((n) => [n.c.id, `${n.dx.toFixed(3)}|${n.dy.toFixed(3)}|${n.ank}`]));
  };
  const a = lado(0, 0);
  let vaihtuneita = 0;
  let matka = [0, 0];
  for (const askel of ASKELEET_PX) {
    matka = [matka[0] + askel[0] / px, matka[1] + askel[1] / px];
    const [sx, sy] = matka;
    const b = lado(sx, sy);
    for (const [id, s] of b) if (a.has(id) && a.get(id) !== s) vaihtuneita += 1;
  }
  assert.ok(vaihtuneita > 0,
    `lukoton ladonta vaihtoi ${vaihtuneita} sijoitusta — jos tämä on 0, vartio 1 ei mittaa mitään`);
});

test('3. zoomi latoo uudelleen: kokoKerroin vapauttaa lukon', () => {
  const y = ymparisto();
  y.nimet.lado({ katto: 40, kokoKerroin: 1 });
  const alku = y.koot().get('pariisi');
  y.nimet.lado({ katto: 40, kokoKerroin: 2 });
  const iso = y.koot().get('pariisi');
  assert.ok(alku > 0 && iso > alku,
    `suurempi kirjasin latoo nimen uudelleen (${alku} → ${iso})`);
});

test('4. pudonnut nimi ei kanna vanhaa lukkoa mukanaan', () => {
  const y = ymparisto();
  y.nimet.lado({ katto: 40 });
  assert.ok(y.nimet.nimetty('pariisi'));
  // Pariisi pois näkyvistä ja takaisin: väliin mahtuu uusi ladonta.
  y.panoroi(4000, 0);
  y.nimet.lado({ katto: 40 });
  assert.equal(y.nimet.nimetty('pariisi'), false, 'Pariisi putosi näkyvistä');
  y.panoroi(-4000, 0);
  y.nimet.lado({ katto: 40 });
  assert.ok(y.nimet.nimetty('pariisi'), 'Pariisi palasi');
});

/*
 * NIMIKYLTIT KARTTAAN (omistajan päätös 14.9.2026 klo 15.05 UTC):
 * kyltin koko on kartan mitta, ei ruutuvakio. Vertailunäkymä on
 * työpöydän saapuminen, jossa kerroin on tasan 1.
 */
const {
  nimenKarttakerroin, NIMEN_VERTAILUSKAALA,
  NIMEN_KARTTAKERROIN_MIN, NIMEN_KARTTAKERROIN_MAX,
} = await import('../js/pallolauta/nimet.js');

test('5. karttakerroin: työpöydän saapuminen on tasan 1, ja kerroin seuraa mittakaavaa', () => {
  assert.equal(nimenKarttakerroin(NIMEN_VERTAILUSKAALA), 1);
  // Mitatut näkymät (ks. nimet.js NIMIKYLTIT KARTTAAN).
  assert.ok(Math.abs(nimenKarttakerroin(0.6552) - 0.356) < 0.003);
  assert.ok(Math.abs(nimenKarttakerroin(2.8483) - 1.551) < 0.003);
  /*
   * PORRAS SYÖ KAMERAN HEILAHDUKSEN: kirjaston korkeus heiluu
   * viimeisissä biteissään panoroitaessa, ja kerroin on silti sama
   * luku — muuten sijoituslukko purkautuisi joka ladonnalla.
   */
  assert.equal(nimenKarttakerroin(NIMEN_VERTAILUSKAALA),
    nimenKarttakerroin(NIMEN_VERTAILUSKAALA * (1 + 1e-9)));
  assert.equal(nimenKarttakerroin(0.6552), nimenKarttakerroin(0.6552 * (1 + 1e-9)));
  // Sisäänzoomaus kasvattaa, uloszoomaus pienentää.
  assert.ok(nimenKarttakerroin(2 * NIMEN_VERTAILUSKAALA) > 1.99);
  assert.ok(nimenKarttakerroin(NIMEN_VERTAILUSKAALA / 2) < 0.51);
  assert.ok(nimenKarttakerroin(NIMEN_VERTAILUSKAALA / 2) > 0.49);
  // Tuntematon mittakaava = entinen ruutuvakio.
  assert.equal(nimenKarttakerroin(0), 1);
  assert.equal(nimenKarttakerroin(undefined), 1);
  // Rajat eivät sido pelialueella mutta ovat olemassa.
  assert.ok(Math.abs(nimenKarttakerroin(1e-9) - NIMEN_KARTTAKERROIN_MIN)
    < 0.005 * NIMEN_KARTTAKERROIN_MIN);
  assert.ok(Math.abs(nimenKarttakerroin(1e9) - NIMEN_KARTTAKERROIN_MAX)
    < 0.005 * NIMEN_KARTTAKERROIN_MAX);
});

test('6. karttakerroin kertautuu ladonnan kirjasinkokoon', () => {
  const y = ymparisto();
  y.nimet.lado({ katto: 40, karttaskaala: NIMEN_VERTAILUSKAALA });
  const perus = y.koot().get('pariisi');
  y.nimet.lado({ katto: 40, karttaskaala: 2 * NIMEN_VERTAILUSKAALA });
  const iso = y.koot().get('pariisi');
  assert.ok(perus > 0 && iso > 0);
  assert.ok(Math.abs(iso / perus - 2) < 0.02, `${perus} → ${iso}`);
});
