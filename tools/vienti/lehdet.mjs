/*
 * LEHDET NATIIVILLE (skeema 1.15, omistajan päätös 23.9.2026: natiivi
 * piirtää kaupunki- ja maalehden itse paketin datasta ilman webin HTML:ää).
 *
 * Kaupunkilehden ja maalehden osiot tyypitettyinä päätason kenttinä.
 * Alkion raaka `data` jää ennalleen, mutta natiivi ei nojaa siihen.
 * Kaikki, minkä web laskee, lasketaan PELIN OMILLA FUNKTIOILLA:
 *   kappaleet        js/ui-apurit.js jaaKappaleiksi (aihesivun leipä, esittely)
 *   lyhyt / selite   js/kuvatekstit.js kuvatekstiLyhyt / kuvatekstiPitka
 *   lahderivi        js/ui-apurit.js lahdemerkinta
 *   sivunOtsikko     js/maalehti.js sivunOtsikko
 *   musiikki         js/ui.js nostonMusiikkilinkit
 *   aani.alku/voima  js/aani-ehdokkaat.js jaaAlku
 *   vanha            js/ui-apurit.js onVanhaKuva (kansikuvien harmaasävy)
 *   wiki.haut        js/wiki.js summaryUrl / articleUrl
 *   maakartta.x/y    js/packs/maakartat.js karttapiste (prosentteina kuvasta)
 *   radio, vanhaAani js/packs/radiot.js radioMaalle, vanhat-aanet.js vanhaTallenne
 *   uutislahde       js/uutiset.js uutislahde
 *   numeroina        js/maakayrat.js piirraMaaNumerot (ajetaan teksti-DOMissa)
 *   saatiedot.selite js/saa.js vuosiSaaSelite
 * Kuvien ja äänten url/varat tulevat media.json:n riviltä (sama sääntö
 * kuin muualla viennissä, tools/vienti/media.mjs), mitat samasta rivistä.
 *
 * Live-haut (päivän sää, uutiset, iTunes-esikuuntelu, Wikipedia) eivät
 * tule pakettiin: kokoelmien kuvauksissa on rajapinta, josta natiivi hakee.
 */
import { readFileSync } from 'node:fs';
import { sarjallista } from './sarjallista.mjs';
import { mediaLaji, ratkaiseMedia } from './media.mjs';
import { ajaTekstiDomissa } from './tekstidom.mjs';
import { jaaKappaleiksi, lahdemerkinta, onVanhaKuva } from '../../js/ui-apurit.js';
import { kuvatekstiLyhyt, kuvatekstiPitka } from '../../js/kuvatekstit.js';
import { nostonMusiikkilinkit, MINITEHTAVA_PALKKIO } from '../../js/ui.js';
import { sivunOtsikko } from '../../js/maalehti.js';
import { jaaAlku } from '../../js/aani-ehdokkaat.js';
import { WIKI_LANGS, summaryUrl, articleUrl } from '../../js/wiki.js';
import { uutislahde } from '../../js/uutiset.js';
import { piirraMaaNumerot } from '../../js/maakayrat.js';
import { vuosiSaaSelite } from '../../js/saa.js';

const LAUDAN_TUNNUS = 'maailmankartta';

/* --------------------------------------------------------- media */

/**
 * Hakija: arvo (datan merkkijono) → { url, varat, leveys?, korkeus? }.
 * Ensisijaisesti media.json:n rivi (url, varat, mitat); jos arvoa ei ole
 * siellä (esim. äänen osoite ilman #alku-osaa), sama ratkaisu media.mjs:n
 * säännöillä. alkuperainen lisätään varaksi, jos se ei ole jo reiteissä
 * (peilattu ääni: ämpäri ensin, lähde varalla, kuten js/media.js aaniOsoite).
 */
function mediaHakija(mediaLista) {
  const rivit = new Map((mediaLista ?? []).map((m) => [m.arvo, m]));
  return (arvo, kentta) => {
    if (typeof arvo !== 'string' || !arvo) return null;
    let m = rivit.get(arvo);
    if (!m) {
      const laji = mediaLaji(arvo, kentta);
      m = laji ? { ...ratkaiseMedia(arvo, laji) } : null;
    }
    if (!m?.url) return null;
    const varat = [...(m.varat ?? [])];
    if (m.alkuperainen && m.alkuperainen !== m.url && !varat.includes(m.alkuperainen)) varat.push(m.alkuperainen);
    return { url: m.url, varat, ...(m.leveys ? { leveys: m.leveys, korkeus: m.korkeus } : {}) };
  };
}

const VALINNAISET_KUVAKENTAT = ['otsikko', 'vuosi', 'tekija', 'tekijaId', 'lisenssi', 'lahdeUrl', 'lisenssiUrl', 'asettelu'];

/* ------------------------------------------------------ rakentajat */

function rakentajat(media, ARTIKKELIT) {
  /*
   * Kuva: lähde samassa järjestyksessä kuin webin varustaNostonKuva ja
   * latoLehtiKuvat: osoite (valmis) → ampari (julisteämpäri) → tiedosto
   * (Commons). arvo = media.json:n avain (mitat, offline).
   */
  const kuva = (o, { vanha = false } = {}) => {
    if (!o || typeof o !== 'object') return null;
    const [kentta, arvo] = o.osoite ? ['osoite', o.osoite] : o.ampari ? ['ampari', o.ampari]
      : o.tiedosto ? ['tiedosto', o.tiedosto] : [];
    const m = media(arvo, kentta);
    if (!m) return null;
    const tulos = {
      arvo, ...m,
      lyhyt: kuvatekstiLyhyt(o) || null,
      selite: kuvatekstiPitka(o) || null,
      lahde: o.lahde ?? null,
    };
    for (const k of VALINNAISET_KUVAKENTAT) if (o[k] != null) tulos[k] = o[k];
    if (vanha) tulos.vanha = onVanhaKuva(o);
    return tulos;
  };

  const aani = (arvo, lisat = {}) => {
    if (!arvo) return null;
    const { url: raaka, alku, voima } = jaaAlku(arvo);
    const m = media(raaka, 'aani');
    return m ? { url: m.url, varat: m.varat, alku, voima, ...lisat } : null;
  };

  const wiki = (otsikko) => {
    if (!otsikko) return null;
    const oma = ARTIKKELIT[otsikko];
    return {
      otsikko,
      // Pelin oma artikkeli voittaa Wikipedian (js/ui.js openWikiArticle).
      omaArtikkeli: Boolean(oma?.artikkeli ?? oma?.teksti),
      haut: WIKI_LANGS.map((kieli) => ({ kieli, tiivistelma: summaryUrl(kieli, otsikko), artikkeli: articleUrl(kieli, otsikko) })),
    };
  };

  /*
   * Nosto. litteä = "Elämää"-sivun vanha piirto (js/ui.js
   * piirraKulttuuriNostot): kuva vain tyypin 'kuva' nostolla, teksti yhtenä
   * kappaleena ja lähderivillä myös äänen lähde. Muuten aihesivun piirto
   * (js/maalehti.js piirraKategoria): kuva mistä tahansa kolmesta
   * lähteestä, leipä jaaKappaleiksi-funktiolla.
   */
  const nosto = (n, { littea = false } = {}) => {
    const teksti = n.teksti ?? '';
    const kuvallinen = littea ? (n.tyyppi === 'kuva' && n.tiedosto) : (n.tiedosto || n.osoite || n.ampari);
    const lahderivi = littea
      ? [lahdemerkinta(n.lahde), n.aaniLahde].filter(Boolean).join(' · ')
      : (n.lahde ? lahdemerkinta(n.lahde) : '');
    // Esikuuntelunappi: vain jos vapaata näytettä ei ole (js/ui.js lisaaNostonNapit).
    const esikuuntelu = (n.esikuuntelu || typeof n.musiikki === 'string') && !n.musiikkiNayte
      ? { termi: n.esikuuntelu ?? null, musiikki: typeof n.musiikki === 'string' ? n.musiikki : null, musiikkiNimi: n.musiikkiNimi ?? null }
      : null;
    return {
      otsikko: n.otsikko ?? null,
      aika: n.aika ?? null,
      tyyppi: n.tyyppi ?? null,
      vuosi: n.vuosi ?? null,
      leveys: n.leveys ?? null,
      teksti,
      kappaleet: littea ? [String(teksti).trim()].filter(Boolean) : jaaKappaleiksi(teksti),
      kuva: kuvallinen ? kuva(n) : null,
      galleria: (n.galleria ?? []).map((g) => kuva(g)).filter(Boolean),
      lahderivi: lahderivi || null,
      aani: aani(n.aani, { lahde: n.aaniLahde ?? null }),
      musiikki: nostonMusiikkilinkit(n),
      musiikkiNayte: aani(n.musiikkiNayte, { nimi: n.musiikkiNayteNimi ?? null }),
      esikuuntelu,
      linkki: n.linkki ? { url: n.linkki, nimi: n.linkkiNimi ?? null } : null,
      wiki: wiki(n.wiki),
    };
  };

  const tehtava = (t) => (t ? {
    kysymys: t.kysymys, vaihtoehdot: t.vaihtoehdot, oikea: t.oikea, fakta: t.fakta ?? null, palkkio: MINITEHTAVA_PALKKIO,
  } : null);

  const lista = (ryhmat) => ryhmat.map((r) => ({
    otsikko: r.otsikko ?? null,
    kohteet: (r.kohteet ?? []).map((k) => ({
      nimi: k.nimi ?? null, linkki: k.linkki ?? null, teksti: k.teksti ?? null,
      kuva: k.tiedosto ? kuva(k) : null, lahde: k.lahde ?? null,
    })),
  }));

  const aihe = (a, { littea = false } = {}) => {
    const taitto = littea ? 'littea' : a.lista ? 'lista' : 'nostot';
    // Listasivun avauskuva: ryhmien ensimmäinen kuvallinen kohde
    // (js/maalehti.js piirraKategoria, "vinkki-hero").
    const hero = a.lista ? (a.lista.flatMap((r) => r.kohteet ?? []).find((k) => k.tiedosto) ?? null) : null;
    return {
      id: a.id,
      nimi: a.nimi ?? null,
      otsikko: a.otsikko ?? null,
      sivunOtsikko: sivunOtsikko(a),
      johdanto: a.johdanto ?? null,
      ikoni: a.ikoni ?? null,
      taitto,
      nostot: (a.nostot ?? []).map((n) => nosto(n, { littea })),
      tehtava: tehtava(a.tehtava),
      lista: a.lista ? lista(a.lista) : null,
      hero: hero ? kuva(hero) : null,
    };
  };

  const kappaleetTyhjalla = (t) => String(t ?? '').split('\n\n').filter(Boolean);

  // Matkailijan opas (js/nahtavyydet.js piirraMatkailijalle, js/opas.js
  // taitaOpas/opasJakso): kappaleraja on tyhjä rivi, ei automaattijakoa.
  const matkailijalle = (m) => (m ? {
    kuva: m.kuva?.tiedosto ? kuva(m.kuva) : null,
    kappale: m.kappale ?? null,
    kappaleet: kappaleetTyhjalla(m.kappale),
    artikkeli: m.artikkeli ? {
      nimi: m.artikkeli.nimi ?? null,
      teksti: m.artikkeli.teksti ?? null,
      ingressi: kappaleetTyhjalla(m.artikkeli.teksti),
      nosto: m.artikkeli.nosto ?? null,
      taitto: m.artikkeli.taitto ?? null,
      lahde: m.artikkeli.lahde ?? null,
      jaksot: (m.artikkeli.jaksot ?? []).map((j) => ({
        otsikko: j.otsikko ?? null,
        teksti: j.teksti ?? null,
        kappaleet: kappaleetTyhjalla(j.teksti),
        kuvat: (Array.isArray(j.kuva) ? j.kuva : [j.kuva]).filter((k) => k?.tiedosto).map((k) => kuva(k)).filter(Boolean),
      })),
      matkailu: m.artikkeli.matkailu ?? null,
    } : null,
  } : null);

  const kansi = (k) => (k ? {
    kansikuvat: (k.kansikuvat ?? []).map((x) => kuva(x, { vanha: true })).filter(Boolean),
    avauskuvat: (k.avauskuvat ?? []).map((x) => kuva(x)).filter(Boolean),
    // Pari piirtyy vain kahdella kuvalla (js/lehti.js latoLehtiKuvat):
    // [0] = ennen, [1] = nyt.
    ennenNyt: (k.ennenNyt?.length ?? 0) >= 2 ? k.ennenNyt.slice(0, 2).map((x) => kuva(x, { vanha: true })) : null,
    matkailijalle: matkailijalle(k.matkailijalle),
  } : null);

  return { kuva, aani, nosto, aihe, kansi };
}

/* ------------------------------------------------- maa numeroina */

const KAYRAT = ['pyramidi', 'vakiluku', 'bkt', 'elinika', 'kaupungistuminen', 'co2'];

/**
 * "Maa numeroina" -sivun tekstit pelin omasta piirrosta (piirraMaaNumerot
 * teksti-DOMissa). Käyrien data on paketissa tiedostona
 * tiedostot/assets/data/maakayrat.json; tässä vain näkyvät lauseet.
 */
export function maanNumerotTekstit(iso, data, demokratia) {
  const maa = data.maat?.[iso];
  if (!maa) return null;
  const juuri = ajaTekstiDomissa((kohde) => piirraMaaNumerot(kohde, iso, data, { demokratia }));
  const luokka = (s, l) => s.className.split(/\s+/).includes(l);
  const tulos = { ingressi: null, johdanto: null, lohkot: [], vdem: null, lahderivi: null };
  const esilla = KAYRAT.filter((k) => maa[k]);
  for (const s of juuri.lapset) {
    if (luokka(s, 'numeroina-ingressi')) tulos.ingressi = s.textContent;
    else if (luokka(s, 'johdanto')) tulos.johdanto = s.textContent;
    else if (luokka(s, 'maakayra-vdem')) tulos.vdem = s.textContent;
    else if (luokka(s, 'maakayra-lahde')) tulos.lahderivi = s.textContent;
    else if (luokka(s, 'maakayrat')) {
      for (const lohko of s.lapset) {
        const lapsi = (l) => lohko.lapset.find((x) => luokka(x, l))?.textContent ?? null;
        tulos.lohkot.push({ kayra: null, otsikko: lapsi('maakayra-otsikko'), tulkinta: lapsi('maakayra-tulkinta'), silloin: lapsi('maakayra-silloinrivi') });
      }
    }
  }
  // Lohkot ovat piirrossa käyrien kiinteässä järjestyksessä, yksi jokaista
  // datassa olevaa käyrää kohden.
  if (tulos.lohkot.length !== esilla.length) {
    throw new Error(`numeroina ${iso}: ${tulos.lohkot.length} lohkoa, dataa ${esilla.length} käyrälle (js/maakayrat.js muuttui?)`);
  }
  tulos.lohkot.forEach((l, i) => { l.kayra = esilla[i]; });
  return tulos;
}

/* ------------------------------------------------------ kokoelmat */

/**
 * Rikastaa kokoelmat (kaupunkilehdet, maalehdet, maat, kaupungit) ja
 * lisää kokoelmat kulttuurivisat ja saatiedot. media = media.json:n rivit.
 */
export function rikastaLehdet(kokoelmat, ns, hae, { media: mediaLista = [], taulukko }) {
  const P = ns.MAAILMANKARTTA;
  const S = hae('js/sisaltotaulut.js');
  const ARTIKKELIT = S.ARTIKKELIT;
  const media = mediaHakija(mediaLista);
  const R = rakentajat(media, ARTIKKELIT);
  const { KULTTUURI_KATEGORIAT } = hae('js/packs/kulttuuri-kategoriat.js');
  const { MAA_KATEGORIAT } = hae('js/packs/maa-kategoriat.js');
  const { MAAKARTAT, karttapiste } = hae('js/packs/maakartat.js');
  const { SAATIEDOT } = hae('js/packs/saatiedot.js');
  const { KULTTUURI_PALKKIO } = hae('js/packs/africa-kulttuuri.js');
  const { radioMaalle } = hae('js/packs/radiot.js');
  const { vanhaTallenne } = hae('js/packs/vanhat-aanet.js');
  const { LIPPUTIEDOT } = hae('js/packs/lipputiedot.js');
  const KULTTUURIT = S.KULTTUURIT[LAUDAN_TUNNUS] ?? {};
  const KIELET = S.KIELET[LAUDAN_TUNNUS] ?? {};
  const MAATIEDOT = S.MAATIEDOT[LAUDAN_TUNNUS] ?? {};
  const maaKaupungille = (id) => P.map.cityCountry?.[id] ?? null;
  const kaupunkiIdt = new Set(P.cities.map((c) => c.id));

  // Kaupunkilehti: kansi + aiheet (+ lainattu Menovinkit lehtikaupungille).
  const kaupunkilehti = (id, aiheet, littea) => {
    const maa = maaKaupungille(id);
    const kansiAihe = littea ? null : aiheet.find((a) => a.id === 'kaupunki') ?? null;
    const vinkit = kansiAihe && maa && (MAA_KATEGORIAT[maa] ?? []).some((a) => a.id === 'menovinkit') ? maa : null;
    const typ = aiheet.map((a) => R.aihe(a, { littea }));
    return {
      laji: littea ? 'elama' : 'lehti',
      maa,
      kansi: R.kansi(kansiAihe),
      aiheet: typ,
      menovinkitMaalta: vinkit,
      sivut: ['etusivu', ...typ.map((a) => a.id), ...(vinkit ? ['menovinkit'] : [])],
      maaosastoEtusivulla: !(maa && MAAKARTAT[maa]),
      saa: Object.hasOwn(SAATIEDOT, id) ? id : null,
      kulttuurivisa: KULTTUURIT[id]?.kysymys && kaupunkiIdt.has(id) ? id : null,
    };
  };
  const kl = kokoelmat.kaupunkilehdet;
  for (const a of kl.alkiot) Object.assign(a, kaupunkilehti(a.id, KULTTUURI_KATEGORIAT[a.id] ?? [], false));
  // "Elämää" (js/lehti.js rakennaSivut): kaupunki ilman omaa lehteä, jolla
  // on litteät nostot, saa kaupunkilehteensä yhden sivun id:llä 'elama'.
  for (const c of P.cities) {
    const litteat = KULTTUURIT[c.id]?.nostot ?? [];
    if (Object.hasOwn(KULTTUURI_KATEGORIAT, c.id) || !litteat.length) continue;
    kl.alkiot.push(sarjallista({
      id: c.id, kaupunki: c.id, data: null,
      ...kaupunkilehti(c.id, [{ id: 'elama', nimi: 'Elämää', nostot: litteat }], true),
    }));
  }
  Object.assign(kl.viittaukset, { menovinkitMaalta: 'maalehdet', saa: 'saatiedot', kulttuurivisa: 'kulttuurivisat' });
  kl.lahde += ' + js/sisaltotaulut.js#KULTTUURIT.maailmankartta.*.nostot';
  kl.kuvaus = 'Kaupunkilehti kaupungeittain (skeema 1.15: natiivi piirtää tästä). laji: lehti = KULTTUURI_KATEGORIAT-lehti, '
    + 'elama = kaupunki ilman omaa lehteä, jolla on litteät "Elämää"-nostot (KULTTUURIT) — web näyttää ne saman kaupunkilehden '
    + 'ainoana sivuna (js/lehti.js rakennaSivut, sivu-id elama), siksi samassa kokoelmassa; data = null. '
    + 'sivut = sivujärjestys (etusivu, aiheiden id:t, lainattu menovinkit). kansi = etusivun { kansikuvat, avauskuvat, '
    + 'ennenNyt [ennen, nyt] | null, matkailijalle } aiheesta kaupunki (null elama-kaupungilla). Etusivun esittely = '
    + 'kaupungit.intro (tai saannot-moduulin LEHDEN_VAKIOESITTELY), sää = saatiedot[saa], maaosasto = maat[maa] '
    + '(etusivulla, kun maaosastoEtusivulla; muuten maalehden maa-etusivulla). aiheet[] = { id, nimi, otsikko, sivunOtsikko '
    + '(näytettävä otsikko, js/maalehti.js sivunOtsikko), johdanto, ikoni, taitto nostot | lista | littea, nostot[], tehtava '
    + '{ kysymys, vaihtoehdot, oikea (indeksi), fakta, palkkio } | null, lista | null, hero | null }. nosto = { otsikko, aika, '
    + 'tyyppi, vuosi, leveys (taysi | kapea | null = automaattinen: suhde >= 1,6 täysleveä), teksti, kappaleet (leipä: '
    + 'jaaKappaleiksi; ensimmäisen kappaleen LEIPAN_ALOITUS_SANOJA sanaa lihavoidaan; littea: yksi kappale), kuva, galleria[] '
    + '(lisäteokset noston oman kuvan jälkeen), lahderivi (kuvan alle / littealla nostoon), aani { url, varat, alku s, voima, '
    + 'lahde }, musiikki [{ url, nakyva, otsake }] (Apple Music -linkit), musiikkiNayte { url, varat, alku, voima, nimi }, '
    + 'esikuuntelu { termi, musiikki, musiikkiNimi } | null, linkki { url, nimi } | null, wiki { otsikko, omaArtikkeli, haut } | null }. '
    + 'kuva = { arvo (media.json), url, varat, leveys?, korkeus? (px), lyhyt (sivulla), selite (suurennoksessa), lahde, '
    + 'otsikko?, vuosi?, tekija?, tekijaId?, lisenssi?, lahdeUrl?, lisenssiUrl?, vanha? (harmaasävy) }. LIVE, ei paketissa: '
    + 'esikuuntelu = iTunes: jos termi, https://itunes.apple.com/search?term=<termi>&entity=song&limit=1&country=fi; muuten '
    + 'kappale-id musiikki-linkistä (?i=<id> tai /song|album/<nimi>/<id>) → https://itunes.apple.com/lookup?id=<id>&entity=song'
    + '&limit=1&country=fi (ilman id:tä search term=musiikkiNimi); previewUrl = 30 s näyte (js/ui.js esikuunteluNapista). '
    + 'wiki: ensin pelin oma artikkeli (omaArtikkeli, js/packs/*-artikkelit.js ARTIKKELIT[otsikko]), muuten haut: tiivistelmä '
    + '(REST summary) ja koko teksti (action=query extracts) kielillä fi, en.';

  const ml = kokoelmat.maalehdet;
  for (const a of ml.alkiot) {
    const aiheet = (MAA_KATEGORIAT[a.id] ?? []).map((x) => R.aihe(x));
    a.aiheet = aiheet;
    a.sivut = [...(MAAKARTAT[a.id] ? ['maa-etusivu'] : []), ...aiheet.map((x) => x.id), 'maa-numeroina'];
  }
  ml.kuvaus = 'Maalehden aiheosastot maittain (ISO3). Skeema 1.15: aiheet[] samassa muodossa kuin kaupunkilehdet.aiheet '
    + '(Menovinkit: taitto lista, lista[] = { otsikko, kohteet[] { nimi, linkki, teksti, kuva, lahde } }, hero = avauskuva). '
    + 'sivut = maalehden sivujärjestys (js/lehti.js avaaMaalehti): maa-etusivu (maat.maakartta) jos kartta on, aiheet, '
    + 'maa-numeroina (maat.numeroina). Maan etusivun muut osat: maat.intro, tiedot, radio, vanhaAani, uutislahde, lipputarina.';

  // Maat: intro, maakartta, rajat, radio, vanha ääni, uutislahde, lipun tarina, numerot.
  const maakayrat = JSON.parse(readFileSync(new URL('../../assets/data/maakayrat.json', import.meta.url), 'utf8'));
  const { UUTISPROXY } = hae('js/packs/uutislahteet.js');
  for (const m of kokoelmat.maat.alkiot) {
    const muoto = P.map.countryShapes[m.id] ?? {};
    const kartta = MAAKARTAT[m.id];
    m.intro = ARTIKKELIT[muoto.wiki ?? muoto.nimi]?.intro ?? null;
    m.maakartta = kartta && muoto.nimi ? {
      kuva: R.kuva({ tiedosto: kartta.tiedosto, lahde: kartta.lahde }),
      lahde: kartta.lahde ?? null,
      rajat: kartta.rajat ?? null,
      projektio: kartta.projektio ?? null,
      kaupungit: (kartta.kaupungit ?? []).map((k) => {
        const p = karttapiste(kartta, k.lat, k.lon);
        return { nimi: k.nimi, lat: k.lat, lon: k.lon, paa: Boolean(k.paa), x: Math.round(p.x * 100) / 100, y: Math.round(p.y * 100) / 100 };
      }),
      nosto: kartta.nosto ? R.nosto(kartta.nosto) : null,
    } : null;
    m.rajat = muoto.renkaat?.length ? { renkaat: muoto.renkaat, keskus: muoto.keskus ?? null, leveys: muoto.leveys ?? null } : null;
    m.radio = radioMaalle(m.id);
    m.vanhaAani = vanhaTallenne(null, m.id);
    m.uutislahde = uutislahde(m.id);
    m.lipputarina = (muoto.lippu && LIPPUTIEDOT[muoto.lippu]) ?? null;
    const numerot = maanNumerotTekstit(m.id, maakayrat, MAATIEDOT[m.id]?.demokratia ?? null);
    // Otsikko kuten js/lehti.js rakennaSivut ("<maa> numeroina").
    m.numeroina = numerot ? { otsikko: muoto.nimi ? `${muoto.nimi} numeroina` : 'Maa numeroina', ...numerot } : null;
  }
  kokoelmat.maat.kuvaus += ' Skeema 1.15 (maalehti natiiville): intro = pelin oma lyhyt esittely (ARTIKKELIT[wiki ?? nimi].intro, '
    + 'null = web hakee Wikipedian tiivistelmän), maakartta = { kuva, lahde, rajat, projektio, kaupungit [{ nimi, lat, lon, paa, '
    + 'x, y (% kuvasta, karttapiste) }], nosto } | null (maalehden maa-etusivu), rajat = { renkaat (laudan Miller-yksiköt, '
    + 'minikartta js/ui.js piirraMaakartta), keskus, leveys } | null, radio = { url, asema, virallinen } | null (radioMaalle), '
    + 'vanhaAani = maan vanha tallenne { nimi, esittaja, vuosi, url, lahde } | null (vanhaTallenne(null, maa); kaupungin oma: '
    + 'saapuminen.vanhaTallenne), uutislahde = { nimi, kieli, syote } | null, lipputarina = { maa, symboliikka[], kappaleet[] } | '
    + 'null (LIPPUTIEDOT[lippu]), numeroina = "Maa numeroina" -sivun tekstit { otsikko, ingressi, johdanto, lohkot [{ kayra, '
    + 'otsikko, tulkinta, silloin }], vdem, lahderivi } pelin omasta piirrosta; käyrien luvut: tiedostot/assets/data/maakayrat.json. '
    + `LIVE, ei paketissa: uutiset = ${UUTISPROXY}?url=<encodeURIComponent(syote)> (RSS, enintään 5 item: title, description, link, pubDate), `
    + 'artikkeli samalla välityksellä ?url=<linkki> (articleBody/article p, og:image), käännös https://api.mymemory.translated.net/get'
    + '?q=<teksti>&langpair=<kieli>|fi (js/uutiset.js).';

  // Kaupungit: esittely (intro) ja kaupungissa nauhoitettu kielinäyte.
  for (const k of kokoelmat.kaupungit.alkiot) {
    const teksti = ARTIKKELIT[k.data?.wiki ?? k.nimi]?.intro ?? null;
    k.intro = teksti ? { teksti, kappaleet: jaaKappaleiksi(teksti) } : null;
    const nayte = KIELET[k.id];
    const m = nayte?.url ? media(nayte.url, 'url') : null;
    k.kielinayte = m ? { url: m.url, varat: m.varat, nimi: nayte.nimi ?? null, kesto: nayte.kesto ?? null } : null;
  }
  kokoelmat.kaupungit.kuvaus += ' Skeema 1.15: intro = kaupunkilehden etusivun esittely { teksti, kappaleet (jaaKappaleiksi; '
    + '**lihavointi** merkitty tähdillä, js/ui-apurit.js piirraLeipateksti) } | null (null = LEHDEN_VAKIOESITTELY, moduuli '
    + 'js/lehti.js), kielinayte = kaupungissa nauhoitettu näyte { url, varat, nimi, kesto s } | null (KIELET; radion vara ja '
    + 'nappi ilman radiota, js/maalehti.js naytaKieliNappi).';

  const visat = P.cities.filter((c) => KULTTUURIT[c.id]?.kysymys).map((c) => {
    const q = KULTTUURIT[c.id].kysymys;
    return { id: c.id, kaupunki: c.id, kysymys: q.q, vaihtoehdot: q.options, oikea: q.correct, fakta: q.fact ?? null, palkkio: KULTTUURI_PALKKIO };
  });
  kokoelmat.kulttuurivisat = taulukko('js/sisaltotaulut.js#KULTTUURIT.maailmankartta.*.kysymys',
    'Kulttuurivisa kaupungeittain (web: saapumiskortti ja lehden etusivu, js/ui.js naytaKulttuuri). oikea = oikean '
      + 'vaihtoehdon indeksi, palkkio = puntaa oikeasta (KULTTUURI_PALKKIO, js/packs/africa-kulttuuri.js); yksi vastaus per '
      + 'kaupunki. Kysymysrivin etuliite "Tutustuitko? " on webin koodissa.',
    { kaupunki: 'kaupungit' }, visat);

  const saa = Object.entries(SAATIEDOT).map(([id, t]) => ({
    id, kaupunki: kaupunkiIdt.has(id) ? id : null, lat: t.lat, lon: t.lon,
    keskilampo: t.keskilampo, sade: t.sade, ylin: t.ylin ?? null, alin: t.alin ?? null,
    lahde: t.lahde ?? null, luonnehdinta: t.luonnehdinta ?? null, selite: vuosiSaaSelite(t),
  }));
  kokoelmat.saatiedot = taulukko('js/packs/saatiedot.js#SAATIEDOT',
    'Kuukausinormaalit kaupungeittain (lehden säärivi ja vuosisääkortti). keskilampo °C ja sade mm 12 kuukautta '
      + '(tammi–joulu), ylin/alin = tyypillinen vaihteluväli (12 tai null), lahde = { nimi, kausi } | null (null = Open-Meteo '
      + 'ERA5 1991–2020), luonnehdinta = kortin teksti graafin alla, selite = kortin lähderivi (js/saa.js vuosiSaaSelite). '
      + 'Näyttötekstit: moduuli js/saa.js (SAAKOODIT [koodit, teksti, kuvake], SAA_IKONIT kuvake → SVG-polku 24×24, '
      + 'KUUKAUDET_SSA). Rivi ilman verkkoa: "<KUUKAUDET_SSA[kk]> keskimäärin <round(keskilampo)>°, sadetta <sade> mm". '
      + 'LIVE, ei paketissa: päivän sää <ENNUSTE_OSOITE>?latitude=<lat>&longitude=<lon>&current=temperature_2m,weather_code'
      + '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=1 (js/saa.js '
      + 'haeSaaTanaan; välimuisti 1 h), rivi "tänään <lampotila>° (<alin>…<ylin>°), <SAAKOODIT-teksti>[, sadetta <mm> mm jos >= 1]".',
    { kaupunki: 'kaupungit' }, saa);

  // Skeema 1.17 (Natiivi-UI:n Nähtävyydet-rivi): kaupunkien kohdekartat
  // (js/packs/maakartat.js KAUPUNKIKARTAT, js/nahtavyydet.js piirraKaupunkiKartta).
  const { KAUPUNKIKARTAT } = hae('js/packs/maakartat.js');
  const karttakuva = (polku) => (polku ? media(polku, 'polku') : null);
  const kohdekartat = Object.keys(KAUPUNKIKARTAT).sort().map((kaupunki) => {
    const k = KAUPUNKIKARTAT[kaupunki];
    return {
      id: kaupunki, kaupunki,
      // Web näyttää värikartan, kun sellainen on (omistaja 15.8.2026), muuten julisteen.
      kuva: karttakuva(k.varikartta ?? k.polku), juliste: karttakuva(k.polku), varikartta: karttakuva(k.varikartta),
      lahde: k.lahde ?? null, rajat: k.rajat, piirtoRajat: k.piirtoRajat ?? null, kainalot: k.kainalot ?? [],
      numeroympyrat: k.numeroympyrat ?? [], esittely: k.esittely ?? null,
      kohteet: k.kohteet.map((kohde) => {
        const { x, y } = karttapiste(k, kohde.lat, kohde.lon);
        return {
          nimi: kohde.nimi, lat: kohde.lat, lon: kohde.lon, x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100,
          wiki: kohde.wiki ?? null, nosto: kohde.nosto ?? null, nimiPuoli: kohde.nimiPuoli ?? null,
          siirto: kohde.siirto ?? null, aika: kohde.aika ?? null, teksti: kohde.teksti ?? null,
          kappaleet: kohde.teksti ? kohde.teksti.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean) : [],
          kuvat: (kohde.kuvat ?? []).map((o) => R.kuva(o)).filter(Boolean),
        };
      }),
    };
  });
  kokoelmat.kohdekartat = taulukko('js/packs/maakartat.js#KAUPUNKIKARTAT',
    'Kaupunkien kohdekartat (Nähtävyydet). kuva = näytettävä kartta (värikartta, jos on, muuten juliste; url/varat/'
      + 'leveys/korkeus, ämpärissä assets/kartat/), juliste ja varikartta erikseen. rajat = ydinrajaus asteina '
      + '{ pohjoinen, etela, lansi, ita }; piirtoRajat = kuvan todellinen alue, jos laajempi. kohteet[].x/y = piste '
      + 'prosentteina kuvasta pelin karttapiste()-funktiolla (kainalot huomioitu). nosto = nähtävyysjutun tunniste '
      + '(nahtavyydet-kokoelma), wiki = Wikipedia-otsikko. teksti/kappaleet/kuvat = kohteen oma juttu, jos on. '
      + 'nimiPuoli ja siirto = webin nimiön asettelu. lahde = kartan lähde (esim. OpenStreetMap ODbL), näytetään kartan alla.',
    { kaupunki: 'kaupungit' }, kohdekartat);
}
