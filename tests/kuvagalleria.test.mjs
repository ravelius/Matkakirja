/*
 * Kuvagalleria (js/kuvagalleria.js): "Lisää kuvia tästä kohteesta".
 *
 * Galleria hakee kuvia seitsemästä avoimesta rajapinnasta, ja sen
 * sitovat lupaukset ovat lisenssisuodatus (vain PD, CC0, CC BY,
 * CC BY-SA — ei NC, ei ND), näkyvä tekijä ja lisenssi, vähintään
 * 1000 pikselin sivu ja se, ettei yhden lähteen kaatuminen kaada
 * galleriaa. Kaikki nämä testataan tässä ILMAN VERKKOA: hakufunktiot
 * saavat fetchin parametrina, joten testi ei riipu Commonsista,
 * Openversesta eikä museoiden käyttörajoista.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AIKAKATKO_MS, ARKISTON_RAJA, EI_TOIVOTUT, KUVALAHTEET, POIS_JATETYT, VAHIN_SIVU,
  aiheOsuu, aiheSana, articUrl, clevelandUrl, commonsGeoUrl, commonsHakuUrl,
  commonsKategoriaUrl, hae, haeKategoria, haeKuvat, haeLahteista, hakukohde,
  OPENVERSE_KATTO, kelpaakoKuva, lisenssiKelpaa, locKuvakoot, locUrl, openverseUrl,
  openversenLisenssi, poimiArticKuvat, poimiClevelandKuvat, poimiCommonsKuvat,
  poimiKategoria, poimiLocKuvat, poimiOpenverseKuvat, poimiVuosi, puhdistaTeksti,
  riittavanIso, verkossa, wikidataUrl, wikipedianTunnusUrl,
} from '../js/kuvagalleria.js';

/* ── Lisenssit ──────────────────────────────────────────────────── */

test('sallitut lisenssit kelpaavat', () => {
  for (const t of [
    'cc0', 'cc0-1.0', 'cc-zero', 'pd', 'pd-old-100', 'pdm', 'Public domain',
    'cc-by-2.0', 'cc-by-4.0', 'cc-by-sa-3.0', 'cc-by-sa-4.0',
    'cc-by-sa-3.0,2.5,2.0,1.0', 'CC BY-SA 4.0',
  ]) assert.ok(lisenssiKelpaa(t), `${t} olisi pitänyt kelvata`);
});

test('NC ja ND hylätään aina, myös cc-by-etuliitteen alta', () => {
  for (const t of [
    'cc-by-nc-2.0', 'cc-by-nc-sa-3.0', 'cc-by-nd-4.0', 'cc-by-nc-nd-4.0',
    'nc-sampling+', 'CC BY-NC 2.0', 'noncommercial',
  ]) assert.equal(lisenssiKelpaa(t), false, `${t} olisi pitänyt hylätä`);
});

test('tuntematon tai puuttuva lisenssi hylätään', () => {
  for (const t of ['', null, undefined, 'gfdl', 'fal', 'attribution', 'fair use', 'cc-sampling+']) {
    assert.equal(lisenssiKelpaa(t), false, `${t} olisi pitänyt hylätä`);
  }
});

test('Openversen lyhenteet normalisoidaan ennen suodatusta', () => {
  assert.equal(openversenLisenssi('by'), 'cc-by');
  assert.equal(openversenLisenssi('by-sa'), 'cc-by-sa');
  assert.equal(openversenLisenssi('by-nc-nd'), 'cc-by-nc-nd');
  assert.equal(openversenLisenssi('cc0'), 'cc0');
  assert.ok(lisenssiKelpaa(openversenLisenssi('by-sa')));
  assert.equal(lisenssiKelpaa(openversenLisenssi('by-nc')), false);
});

/* ── Koko, teksti ja aiheportti ─────────────────────────────────── */

test('kuvan on oltava vähintään 1000 px leveä tai korkea', () => {
  assert.equal(VAHIN_SIVU, 1000);
  assert.ok(riittavanIso(1600, 400));
  assert.ok(riittavanIso(400, 1000));
  assert.equal(riittavanIso(999, 800), false);
  assert.equal(riittavanIso(null, undefined), false);
});

test('tekijärivistä riisutaan merkkaus eikä sitä koskaan ladota HTML:nä', () => {
  const raaka = '<a href="//commons.wikimedia.org/wiki/User:X" title="X">Matti &amp; Maija</a>';
  assert.equal(puhdistaTeksti(raaka), 'Matti & Maija');
  assert.ok(!puhdistaTeksti(raaka).includes('<'));
  assert.ok(puhdistaTeksti('x'.repeat(400)).endsWith('…'));
});

test('vuosiluku poimitaan päiväyskentästä', () => {
  assert.equal(poimiVuosi('2019-06-01 12:00:00'), 2019);
  assert.equal(poimiVuosi('[between 1890 and 1910(?)]'), 1890);
  assert.equal(poimiVuosi('ei vuotta'), null);
});

test('aiheportti vaatii kohteen nimen teoksen otsikkoon', () => {
  assert.equal(aiheSana('Piazza San Marco'), 'Piazza');
  assert.ok(aiheOsuu('Venetsia', 'Piazza San Marco, Venetsia'));
  assert.equal(aiheOsuu('Suomenlinna', 'Book of the Dead of the Priest of Horus'), false);
  assert.equal(aiheOsuu('', 'mikä tahansa'), false);
});

/* ── Osoitteet: CORS-kriittiset parametrit ──────────────────────── */

test('MediaWiki-kutsuissa on origin=*, muuten selain ei saa vastausta', () => {
  for (const url of [
    wikipedianTunnusUrl('fi', 'Suomenlinna'),
    wikidataUrl('Q1292442'),
    commonsKategoriaUrl('Suomenlinna'),
    commonsHakuUrl('Suomenlinna Helsinki'),
    commonsGeoUrl(60.1, 24.9),
  ]) assert.ok(url.includes('origin=%2A') || url.includes('origin=*'), url);
});

test('kategoriahaku pyytää tiedostoja kohteen omasta kategoriasta', () => {
  const url = commonsKategoriaUrl('Suomenlinna');
  assert.ok(url.includes('generator=categorymembers'));
  assert.ok(url.includes('gcmtype=file'));
  assert.ok(url.includes('Category%3ASuomenlinna'));
  // Kaksinkertaista etuliitettä ei synny, jos kutsuja antaa sen itse.
  assert.ok(!commonsKategoriaUrl('Category:Suomenlinna').includes('Category%3ACategory'));
});

test('Openverse-haku rajaa lisenssit ja jättää aikuissisällön pois', () => {
  const url = openverseUrl('Suomenlinna');
  assert.ok(url.includes('license=cc0%2Cpdm%2Cby%2Cby-sa'));
  assert.ok(url.includes('mature=false'));
  assert.ok(!/nc|nd/.test(new URL(url).searchParams.get('license')));
});

test('Openversen sivukoko ei ylitä nimettömän kutsujan kattoa', () => {
  // Mitattu 23.8.2026: liian iso page_size ei palauta vähemmän vaan
  // kaataa koko pyynnön (HTTP 401), eli lähde katoaisi kokonaan.
  assert.equal(OPENVERSE_KATTO, 20);
  assert.equal(new URL(openverseUrl('x', 100)).searchParams.get('page_size'), '20');
  assert.equal(new URL(openverseUrl('x')).searchParams.get('page_size'), '20');
});

test('muut lähteet osoittavat oikeaan rajapintaan', () => {
  assert.ok(locUrl('Kyoto').startsWith('https://www.loc.gov/photos/?'));
  assert.ok(locUrl('Kyoto').includes('fo=json'));
  assert.ok(clevelandUrl('Venice').includes('openaccess-api.clevelandart.org'));
  assert.ok(articUrl('Venice').includes('api.artic.edu'));
});

/* ── Poiminta lähteittäin ───────────────────────────────────────── */

const commonsSivu = (yli = {}) => ({
  title: 'File:Suomenlinna kirkko.jpg',
  imageinfo: [{
    url: 'https://upload.wikimedia.org/a/kirkko.jpg',
    thumburl: 'https://upload.wikimedia.org/thumb/kirkko.jpg/480px-kirkko.jpg',
    width: 3000,
    height: 2000,
    mime: 'image/jpeg',
    descriptionurl: 'https://commons.wikimedia.org/wiki/File:Suomenlinna_kirkko.jpg',
    extmetadata: {
      License: { value: 'cc-by-sa-4.0' },
      LicenseShortName: { value: 'CC BY-SA 4.0' },
      Artist: { value: '<a href="#">Anna Kuvaaja</a>' },
      DateTimeOriginal: { value: '2019-06-01' },
      ...(yli.extmetadata ?? {}),
    },
    ...yli.imageinfo,
  }],
  ...(yli.sivu ?? {}),
});

test('Commons-poiminta antaa tekijän, lisenssin ja tiedostosivun', () => {
  const [kuva] = poimiCommonsKuvat({ query: { pages: { 1: commonsSivu() } } });
  assert.equal(kuva.tekija, 'Anna Kuvaaja');
  assert.equal(kuva.lisenssi, 'CC BY-SA 4.0');
  assert.equal(kuva.vuosi, 2019);
  assert.equal(kuva.otsikko, 'Suomenlinna kirkko');
  assert.ok(kuva.sivu.startsWith('https://commons.wikimedia.org/wiki/File:'));
  assert.ok(kelpaakoKuva(kuva));
});

test('Commons-poiminta karsii NC-lisenssin, pikkukuvan ja SVG:n', () => {
  const pages = {
    1: commonsSivu({ extmetadata: { License: { value: 'cc-by-nc-sa-3.0' } } }),
    2: commonsSivu({ imageinfo: { width: 640, height: 480 } }),
    3: commonsSivu({ imageinfo: { mime: 'image/svg+xml' } }),
  };
  assert.deepEqual(poimiCommonsKuvat({ query: { pages } }).filter(kelpaakoKuva), []);
});

test('tekijätön kuva kelpaa vain vapaassa lisenssissä', () => {
  const ilman = (lisenssi) => poimiCommonsKuvat({
    query: {
      pages: {
        1: commonsSivu({
          extmetadata: { Artist: { value: '' }, License: { value: lisenssi }, LicenseShortName: { value: '' } },
        }),
      },
    },
  })[0];
  assert.equal(kelpaakoKuva(ilman('cc-by-sa-4.0')), false);
  assert.ok(kelpaakoKuva(ilman('pd-old-100')));
});

test('sanaseula pudottaa otsikon perusteella', () => {
  assert.ok(EI_TOIVOTUT.test('Nude study, 1890'));
  assert.equal(EI_TOIVOTUT.test('Suomenlinna kirkko'), false);
  const [kuva] = poimiCommonsKuvat({
    query: { pages: { 1: commonsSivu({ sivu: { title: 'File:Nude study.jpg' } }) } },
  });
  assert.equal(kelpaakoKuva(kuva), false);
});

test('Openverse: herkkyyslippu ja NC-lisenssi hylätään', () => {
  const tulos = (yli) => ({
    title: 'Suomenlinna', url: 'https://x/iso.jpg', thumbnail: 'https://x/thumb',
    creator: 'Kuvaaja', license: 'by-sa', license_version: '4.0',
    width: 2000, height: 1300, provider: 'flickr',
    foreign_landing_url: 'https://flickr.com/1', ...yli,
  });
  const kuvat = poimiOpenverseKuvat({
    results: [
      tulos({}),
      tulos({ url: 'https://x/2.jpg', mature: true }),
      tulos({ url: 'https://x/3.jpg', unstable__sensitivity: ['user_reported_sensitive'] }),
      tulos({ url: 'https://x/4.jpg', license: 'by-nc' }),
      tulos({ url: 'https://x/5.jpg', width: 500, height: 400 }),
    ],
  }).filter(kelpaakoKuva);
  assert.equal(kuvat.length, 1);
  assert.equal(kuvat[0].lisenssi, 'CC BY-SA 4.0');
  assert.equal(kuvat[0].tekija, 'Kuvaaja');
});

test('LoC: koot luetaan osoitteen risuaitaosasta', () => {
  const koot = locKuvakoot([
    'https://tile.loc.gov/a_150px.jpg#h=150&w=103',
    'https://tile.loc.gov/a_v.jpg#h=1024&w=801',
  ]);
  assert.equal(koot.suurin.korkeus, 1024);
  assert.equal(koot.pienin.korkeus, 150);
  assert.equal(locKuvakoot([]), null);
});

test('LoC: vain "no known restrictions" kelpaa lisenssiksi', () => {
  const tulos = (rights, yli = {}) => ({
    title: 'Kyoto, Japan',
    date: '1889',
    url: 'https://www.loc.gov/item/2002705668/',
    image_url: ['https://tile.loc.gov/a_150px.jpg#h=150&w=103', 'https://tile.loc.gov/a_v.jpg#h=1024&w=801'],
    item: { rights_advisory: rights, contributors: ['Hill, S. A., photographer.'] },
    ...yli,
  });
  const kelpaa = poimiLocKuvat({ results: [tulos('No known restrictions on publication.')] });
  assert.equal(kelpaa.length, 1);
  assert.equal(kelpaa[0].lisenssitunnus, 'pd');
  assert.ok(kelpaa[0].tekija.startsWith('Hill'));
  assert.ok(kelpaakoKuva(kelpaa[0]));
  assert.deepEqual(poimiLocKuvat({ results: [tulos('Rights status not evaluated.')] }), []);
  assert.deepEqual(
    poimiLocKuvat({ results: [tulos('No known restrictions.', { access_restricted: true })] }),
    [],
  );
});

test('museolähteet vaativat aiheosuman ja vapaan lisenssin', () => {
  const cle = {
    data: [
      {
        title: 'Piazza San Marco, Venetsia',
        share_license_status: 'CC0',
        creators: [{ description: 'Francesco Guardi' }],
        images: { print: { url: 'https://c/print.jpg', width: '2000', height: '1400' } },
        url: 'https://clevelandart.org/art/1951.83',
        creation_date: '1780s',
      },
      {
        title: 'Karuselli',
        share_license_status: 'CC0',
        creators: [{ description: 'X' }],
        images: { print: { url: 'https://c/2.jpg', width: '2000', height: '1400' } },
      },
      {
        title: 'Venetsia yöllä',
        share_license_status: 'Copyrighted',
        creators: [{ description: 'Y' }],
        images: { print: { url: 'https://c/3.jpg', width: '2000', height: '1400' } },
      },
    ],
  };
  const kuvat = poimiClevelandKuvat(cle, 'Venetsia');
  assert.equal(kuvat.length, 1);
  assert.equal(kuvat[0].lisenssi, 'CC0');

  const artic = {
    data: [
      {
        id: 9, title: 'Interior of St. Mark\'s, Venetsia', image_id: 'abc',
        is_public_domain: true, artist_title: 'David Dalhoff Neal',
        date_display: '1869', thumbnail: { width: 3000, height: 2400 },
      },
      {
        id: 10, title: 'Venetsia', image_id: 'def', is_public_domain: false,
        artist_title: 'Z', thumbnail: { width: 3000, height: 2400 },
      },
    ],
  };
  const teokset = poimiArticKuvat(artic, 'Venetsia');
  assert.equal(teokset.length, 1);
  assert.ok(teokset[0].osoite.includes('/full/1686,/'));
  assert.ok(teokset[0].pikku.includes('/full/400,/'));
});

/* ── Kategoriaketju ─────────────────────────────────────────────── */

test('kohteen oma kategoria löytyy Wikipedia → Wikidata → P373', async () => {
  const loki = [];
  const fetchImpl = async (url) => {
    loki.push(url);
    if (url === wikipedianTunnusUrl('fi', 'Suomenlinna')) {
      return { ok: true, json: async () => ({ query: { pages: { 5: { pageprops: { wikibase_item: 'Q1' } } } } }) };
    }
    if (url === wikidataUrl('Q1')) {
      return {
        ok: true,
        json: async () => ({ entities: { Q1: { claims: { P373: [{ mainsnak: { datavalue: { value: 'Suomenlinna' } } }] } } } }),
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };
  assert.equal(await haeKategoria(['Suomenlinna'], { fetchImpl }), 'Suomenlinna');
  assert.equal(loki.length, 2, 'ylimääräisiä pyyntöjä ei saa lähteä');
});

test('kategoria luetaan myös commonswiki-sivulinkistä', () => {
  assert.equal(
    poimiKategoria({ entities: { Q2: { sitelinks: { commonswiki: { title: 'Category:Duomo' } } } } }, 'Q2'),
    'Duomo',
  );
  assert.equal(poimiKategoria({ entities: {} }, 'Q2'), null);
});

test('kategoriaton kohde ei kaada hakua', async () => {
  const fetchImpl = async () => ({ ok: false, status: 404, json: async () => ({}) });
  assert.equal(await haeKategoria(['Tuntematon'], { fetchImpl }), null);
});

/* ── Verkkoapuri ────────────────────────────────────────────────── */

test('kelvoton vastaus, poikki oleva verkko ja aikakatko palauttavat null', async () => {
  assert.equal(await hae('https://x', { fetchImpl: async () => ({ ok: false }) }), null);
  assert.equal(await hae('https://x', { fetchImpl: async () => { throw new Error('offline'); } }), null);
  assert.equal(await hae('https://x', { fetchImpl: null }), null);
  // Ikuisesti roikkuva pyyntö katkeaa aikakatkoon eikä jää odottamaan.
  const roikkuu = (url, asetukset) => new Promise((_, hylkaa) => {
    asetukset?.signal?.addEventListener('abort', () => hylkaa(new Error('abort')));
  });
  assert.equal(await hae('https://x', { fetchImpl: roikkuu, aikakatko: 20 }), null);
  assert.ok(AIKAKATKO_MS > 0 && AIKAKATKO_MS <= 15000);
});

/* ── Lähteiden eristys ja järjestys ─────────────────────────────── */

const teeKuva = (osoite, yli = {}) => ({
  lahde: 'testi',
  otsikko: 'Kohde',
  osoite,
  pikku: `${osoite}?pikku`,
  leveys: 2000,
  korkeus: 1400,
  tekija: 'Kuvaaja',
  lisenssitunnus: 'cc-by-sa-4.0',
  lisenssi: 'CC BY-SA 4.0',
  sivu: 'https://x/sivu',
  tuore: true,
  ...yli,
});

test('yhden lähteen kaatuminen ei estä muiden kuvia', async () => {
  const lahteet = [
    { tunnus: 'kaatuu', tuore: true, hae: async () => { throw new Error('rikki'); } },
    { tunnus: 'roikkuu', tuore: true, hae: async () => null },
    { tunnus: 'toimii', tuore: true, hae: async () => [teeKuva('https://a.jpg')] },
  ];
  const saadut = [];
  const kaikki = await haeLahteista({ nimi: 'Kohde' }, {
    lahteet, onKuvat: (kuvat) => saadut.push(...kuvat),
  });
  assert.equal(kaikki.length, 1);
  assert.equal(saadut.length, 1);
  assert.equal(kaikki[0].osoite, 'https://a.jpg');
});

test('sama kuva kahdesta lähteestä näytetään kerran', async () => {
  const lahteet = [
    { tunnus: 'a', tuore: true, hae: async () => [teeKuva('https://sama.jpg')] },
    { tunnus: 'b', tuore: true, hae: async () => [teeKuva('https://sama.jpg'), teeKuva('https://eri.jpg')] },
  ];
  const kaikki = await haeLahteista({ nimi: 'Kohde' }, { lahteet });
  assert.deepEqual(kaikki.map((k) => k.osoite), ['https://sama.jpg', 'https://eri.jpg']);
});

test('tuoreet kuvat tulevat arkiston edelle', async () => {
  const lahteet = [
    { tunnus: 'arkisto', tuore: false, hae: async () => [teeKuva('https://vanha.jpg', { tuore: false })] },
    { tunnus: 'tuore', tuore: true, hae: async () => [teeKuva('https://uusi.jpg', { tuore: true })] },
  ];
  const kuvat = await haeKuvat({ nimi: 'Kohde' }, { lahteet });
  assert.deepEqual(kuvat.map((k) => k.osoite), ['https://uusi.jpg', 'https://vanha.jpg']);
  assert.ok(ARKISTON_RAJA > 1900);
});

test('nimetön kohde ei lähetä yhtään pyyntöä', async () => {
  let kutsuja = 0;
  const lahteet = [{ tunnus: 'x', tuore: true, hae: async () => { kutsuja += 1; return []; } }];
  assert.deepEqual(await haeLahteista({}, { lahteet }), []);
  assert.equal(kutsuja, 0);
});

test('hakusanaan liitetään kaupunki, jotta yleisnimi osuu oikeaan kohteeseen', () => {
  const k = hakukohde({ nimi: 'Duomo', wiki: 'Santa Maria del Fiore', kaupunki: 'Firenze' });
  assert.equal(k.hakusana, 'Santa Maria del Fiore Firenze');
  assert.equal(hakukohde({ nimi: 'Firenze', kaupunki: 'Firenze' }).hakusana, 'Firenze');
});

test('geohaku jää väliin ilman koordinaatteja', async () => {
  const geo = KUVALAHTEET.find((l) => l.tunnus === 'commons-geo');
  let kutsuttu = false;
  const fetchImpl = async () => { kutsuttu = true; return { ok: false, json: async () => ({}) }; };
  assert.deepEqual(await geo.hae(hakukohde({ nimi: 'Kohde' }), { fetchImpl }), []);
  assert.equal(kutsuttu, false);
});

/* ── Rekisterit ─────────────────────────────────────────────────── */

test('jokaisella lähteellä on tunnus, nimi, tuoreusluokka ja hakija', () => {
  assert.ok(KUVALAHTEET.length >= 5, 'lähteitä pitää olla useita');
  const tunnukset = new Set();
  for (const lahde of KUVALAHTEET) {
    assert.ok(lahde.tunnus && !tunnukset.has(lahde.tunnus), `tunnus puuttuu tai toistuu: ${lahde.tunnus}`);
    tunnukset.add(lahde.tunnus);
    assert.equal(typeof lahde.nimi, 'string');
    assert.equal(typeof lahde.tuore, 'boolean');
    assert.equal(typeof lahde.hae, 'function');
  }
  // Kohteen oma kategoria on ensimmäisenä: se on turvallisin lähde
  // (ks. moduulin IKÄTASO-kohta 1), eikä järjestys saa vaihtua vahingossa.
  assert.equal(KUVALAHTEET[0].tunnus, 'commons-kategoria');
});

test('pois jätetyistä rajapinnoista on kirjattu syy', () => {
  assert.ok(POIS_JATETYT.length >= 5);
  for (const { nimi, syy } of POIS_JATETYT) {
    assert.ok(nimi && syy && syy.length > 10, `syy puuttuu: ${nimi}`);
  }
  const nimet = POIS_JATETYT.map((p) => p.nimi).join(' ');
  for (const odotettu of ['Europeana', 'Smithsonian', 'Rijksmuseum', 'Flickr']) {
    assert.ok(nimet.includes(odotettu), `${odotettu} puuttuu kirjauksesta`);
  }
});

/* ── Offline ────────────────────────────────────────────────────── */

test('ilman verkkoa galleria jää pois näkyvistä', () => {
  const alkuperainen = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  try {
    Object.defineProperty(globalThis, 'navigator', { value: { onLine: false }, configurable: true });
    assert.equal(verkossa(), false);
    Object.defineProperty(globalThis, 'navigator', { value: { onLine: true }, configurable: true });
    assert.equal(verkossa(), true);
    // Tuntematon tila (esim. vanha selain) tulkitaan myönteisesti.
    Object.defineProperty(globalThis, 'navigator', { value: {}, configurable: true });
    assert.equal(verkossa(), true);
  } finally {
    if (alkuperainen) Object.defineProperty(globalThis, 'navigator', alkuperainen);
    else delete globalThis.navigator;
  }
});
