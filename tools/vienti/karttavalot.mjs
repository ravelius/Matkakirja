/*
 * KARTTAVALOT PALLOLLE JA KOHDEKARTTOJEN NOSTOLINKKIEN AIHE (skeema 1.24,
 * Natiivi-UI:n datatoiveet 2 ja 3, 23.9.2026).
 *
 * Skeemaan 1.22 asti karttavalot koottiin datataulukoista (KOHDE_MAAT,
 * ELAINTAKYT, HISTORIAN_HETKET, SKANDAALIT), ja niistä puuttuivat pallon
 * maalehtinostot, täkynostot, syvennystarinat ja kohdekartoille siirretyt
 * nostot. Nyt joukko on se, jonka web pallolla piirtää, ja se lasketaan
 * PELIN OMILLA FUNKTIOILLA samassa järjestyksessä kuin
 * js/pallolauta/nostot.js keraa:
 *
 *   rekisteröinti  kytkeFokusnosto, kytkeSyvennys, kytkeSkandaalit,
 *                  kytkeHistorianHetket (kuten js/main.js ja
 *                  tools/fokuskartta/nostot.mjs keraaNostot)
 *   maan nostot    js/fokuskohteet.js maanKohdemerkit(lauta, iso,
 *                  FOKUS_POHJAT[iso]) jokaiselle laudan lehdelliselle maalle:
 *                  kohteet + syvennykset + skandaalit + hetket + täky- ja
 *                  maalehtinostot, lehden ikkunalla ja kohdekarttakarsinnalla
 *   aihe           js/fokusnosto-symbolit.js nostosymPaakategoria(kategoria)
 *   kaupunki       js/fokuskohteet.js nostonKaupunkiAvain (merkin kaupunkiAvain)
 *   eläintäyt      js/elaintaky-rivit.js elaintakyKarttarivit
 *   navat          js/pallolauta/nostot.js napanostonRivi (MAASTOKOHTEET_ATA/ARK)
 *   kohdekartta    js/fokuskohteet.js kohdekartanNostopaikat: noston oma piste
 *                  kaupunkilehden kohdekartalla. Pääkartalta karsittu nosto
 *                  (karsiKaupunkikartanNostot) on valo, jolla paakartalla = false.
 *   aihe linkille  js/pallolauta/nostot.js liuskan siirretyt:
 *                  nostosymPaakategoria(kohteenKategoria(kohde))
 */
import {
  KOHDE_MAAT, kohdekartanNostopaikat, kohteenKategoria, maanKohdemerkit,
} from '../../js/fokuskohteet.js';
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';
import {
  NOSTO_MAAT, kytkeFokusnosto, nostoKarttarivit, nostoKaupunginPooli, nostoLevitaLunastus, nostonTaitto,
} from '../../js/fokusnosto.js';
import { jaaKappaleiksi } from '../../js/ui-apurit.js';
import { kytkeSyvennys, syvennysKarttarivit } from '../../js/syvennys.js';
import { kytkeSkandaalit, skandaaliKarttarivit } from '../../js/skandaalit.js';
import { hetkiKarttarivit, kytkeHistorianHetket } from '../../js/historian-hetket.js';
import { elaintakyKarttarivit } from '../../js/elaintaky-rivit.js';
import { napanostonRivi } from '../../js/pallolauta/nostot.js';
import { lukittuAnkkuri } from '../../js/pallolauta/nostoankkurit.js';
import { MAASTOKOHTEET_ATA } from '../../js/packs/maastokohteet-ata.js';
import { MAASTOKOHTEET_ARK } from '../../js/packs/maastokohteet-ark.js';
import { nostosymPaakategoria } from '../../js/fokusnosto-symbolit.js';
import { laudaltaAsteiksi } from '../../js/fokusmitat.js';

const pyorista = (a) => (a ? { lat: Math.round(a.lat * 1e4) / 1e4, lon: Math.round(a.lon * 1e4) / 1e4 } : null);
const asteiksi = (lauta, x, y) => (Number.isFinite(x) && Number.isFinite(y) ? pyorista(laudaltaAsteiksi(lauta, x, y)) : null);

/*
 * Noston laji tunnuksesta (sama etuliitesopimus kuin js/fokuskohteet.js
 * nostonPrioriteetti) ja valon id, joka säilyttää skeeman 1.10 muodon
 * (kohde:<id>, skandaali:<id>, hetki:<id>).
 */
function luokittele(tunnus, kohdeIdt) {
  const t = String(tunnus);
  for (const [etu, lahde, idEtu] of [
    ['skandaali-', 'skandaalit', 'skandaali'], ['hetki-', 'historianHetket', 'hetki'],
    ['syvennys-', 'syvennys', 'syvennys'], ['nosto-maalehti-', 'maalehtinosto', 'nosto'],
  ]) {
    if (t.startsWith(etu)) return { lahde, id: `${idEtu}:${lahde === 'maalehtinosto' ? t.slice(6) : t.slice(etu.length)}` };
  }
  if (kohdeIdt.has(t)) return { lahde: 'fokuskohde', id: `kohde:${t}` };
  if (t.startsWith('nosto-')) return { lahde: 'takynosto', id: `nosto:${t.slice(6)}` };
  return { lahde: 'fokuskohde', id: `kohde:${t}` };
}

/*
 * Kohdetieto tunnukselle ja kaupungille: se kohdeolio, jonka web antaa
 * kortille (js/fokuskohteet.js maanKohdetiedot: KOHDE_MAAT ja maan
 * lisälähteet). Täkypooli on kaupungin oma (nostoKaupunginPooli), kuten
 * nykyisen kaupungin lisäkohteissa. Historian hetki, joka ei ole
 * pääkartalla (kartalla: false), saa saman kohdeolion kuin
 * hetkiKarttarivit sille antaisi.
 */
function kohdetietoHaku(P, HISTORIAN_HETKET) {
  const cc = P.map.cityCountry ?? {};
  const kohteet = new Map();
  for (const lista of Object.values(KOHDE_MAAT)) for (const k of lista) if (!kohteet.has(k.id)) kohteet.set(k.id, k);
  const maittain = new Map();
  const maanKohteet = (iso) => {
    if (maittain.has(iso)) return maittain.get(iso);
    const m = new Map();
    for (const { kohde } of [
      ...syvennysKarttarivit(iso, P.id, cc), ...skandaaliKarttarivit(iso, P.id), ...hetkiKarttarivit(iso, P.id),
    ]) if (kohde?.id && !m.has(kohde.id)) m.set(kohde.id, kohde);
    maittain.set(iso, m);
    return m;
  };
  const takyt = new Map();
  const kaupunginTakyt = (kaupunki) => {
    if (takyt.has(kaupunki)) return takyt.get(kaupunki);
    const m = new Map(nostoKarttarivit(nostoKaupunginPooli(cc[kaupunki], kaupunki), P.id).rivit
      .map(({ kohde }) => [kohde.id, kohde]));
    takyt.set(kaupunki, m);
    return m;
  };
  const hetket = new Map(HISTORIAN_HETKET.map((h) => [`hetki-${h.id}`, h]));
  return (tunnus, kaupunki) => {
    if (kohteet.has(tunnus)) return kohteet.get(tunnus);
    const iso = cc[kaupunki] ?? null;
    const oma = (iso && maanKohteet(iso).get(tunnus)) ?? (kaupunki && kaupunginTakyt(kaupunki).get(tunnus));
    if (oma) return oma;
    const h = hetket.get(tunnus);
    return h ? { id: tunnus, nimi: h.nimio ?? h.otsikko, nimio: h.nimio ?? null, tyyppi: 'hetki', symboli: 'hetki' } : null;
  };
}

// Noston paikkanimi datasta (js/pallolauta/nostot.js keraa: `paikkaNimi`).
const paikkaNimiDatasta = (kohde) => (typeof kohde?.paikka === 'string' ? kohde.paikka : kohde?.paikka?.nimi ?? null) || null;
// Napakohteilla ei ole maata: alue tiedostojen omilla nimillä (maastokohteet-ata/-ark).
const NAPA_ALUEET = { ATA: 'Etelämanner', ARK: 'Arktis' };

export function karttavaloKokoelma(ns, hae, kaupungit, taulukko) {
  const P = ns.MAAILMANKARTTA;
  const { HISTORIAN_HETKET } = hae('js/packs/historian-hetket.js');
  const { ELAINTAKYT } = hae('js/packs/elaintakyt.js');
  kytkeFokusnosto();
  kytkeSyvennys();
  kytkeSkandaalit();
  kytkeHistorianHetket();
  const tarkeydet = new Map(kaupungit.map((k) => [k.id, k.tarkeys]));
  const kaupunkiNimet = new Map(P.cities.map((c) => [c.id, c.name]));
  const maaNimi = (iso) => P.map.countryShapes?.[iso]?.nimi ?? null;
  const kohdeIdt = new Set(Object.values(KOHDE_MAAT).flat().map((k) => k.id));
  const kohdekartalla = kohdekartanNostopaikat();
  const rivit = [];
  const nahdyt = new Set();
  const lisaa = (rivi) => {
    let id = rivi.id; let n = 2;
    while (nahdyt.has(id)) id = `${rivi.id}~${n++}`;
    nahdyt.add(id);
    // Paikan nimi jokaiselle valolle: datan oma paikka, sitten kaupunki, sitten maa.
    const [paikka, paikkaLahde] = rivi.paikka ? [rivi.paikka, rivi.lahde === 'napakohde' ? 'alue' : 'data']
      : kaupunkiNimet.has(rivi.kaupunkiAvain) ? [kaupunkiNimet.get(rivi.kaupunkiAvain), 'kaupunki']
        : maaNimi(rivi.maa) ? [maaNimi(rivi.maa), 'maa'] : [null, null];
    rivit.push({ ankkuri: null, puoli: null, ...rivi, id, paikka, paikkaLahde });
  };
  const kaupunkiKohteelle = (k) => (tarkeydet.has(k?.kaupunki) ? k.kaupunki : (tarkeydet.has(k?.id) ? k.id : null));
  /*
   * Kortin paikkarivi: skandaalin ja historian hetken kortti näyttää
   * lähdedatan `paikka`-kentän (js/skandaalit.js, js/historian-hetket.js);
   * muilla noston oma paikkanimi, jos datassa on.
   */
  const { SKANDAALIT } = hae('js/packs/skandaalit.js');
  const skandaaliPaikat = new Map(Object.values(SKANDAALIT).flat().map((sk) => [`skandaali-${sk.id}`, sk.paikka]));
  const hetkiPaikat = new Map(HISTORIAN_HETKET.map((h) => [`hetki-${h.id}`, h.paikka]));
  const lahdePaikka = (tunnus, kohde) => paikkaNimiDatasta(kohde) ?? skandaaliPaikat.get(tunnus) ?? hetkiPaikat.get(tunnus) ?? null;

  // 1. Maiden nostot pallolla (maanKohdemerkit), FOKUS_POHJAT-järjestyksessä.
  const pallolla = new Set();
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja?.lauta !== P.id) continue;
    for (const m of maanKohdemerkit(P, iso, pohja, () => false)) {
      const aihe = nostosymPaakategoria(m.kategoria);
      if (!aihe) continue; // symboliton merkki ei saa valoa (js/karttavalot.js)
      const kohde = m.kohde ?? {};
      const { lahde, id } = luokittele(m.id, kohdeIdt);
      const kk = kohdekartalla.get(m.id) ?? null;
      const oma = kk ? pyorista({ lat: kk.lat, lon: kk.lng })
        : (asteiksi(P.id, m.omaX, m.omaY) ?? asteiksi(P.id, m.x, m.y));
      if (!oma) continue;
      const kaupunki = lahde === 'fokuskohde' ? kaupunkiKohteelle(kohde) : null;
      pallolla.add(m.id);
      /*
       * Skeema 1.39 (Natiivi-UI, löydös 50 C): webin merkin paikka ja kylki.
       * Web piirtää noston maan lukittuun ankkuriin (js/pallolauta/nostot.js:
       * lukittuAnkkuri(`nosto:<id>`, iso), js/packs/nostoankkurit-<iso>.js),
       * jos sellainen on; muuten se levittää merkit ruudulla `ladottu`-
       * pisteestä. Nimiön kylki on väistön poltettu päätös (maanKohdemerkit
       * `puoli`: oikea/vasen/yla/ala) tai null = web kokeilee oikea ensin.
       */
      const lukko = lukittuAnkkuri(`nosto:${m.id}`, iso);
      lisaa({
        id, tunnus: m.id, aihe, kategoria: m.kategoria, laji: m.laji ?? null, nimi: kohde.nimi || m.nimi || m.id, nimio: m.nimi || null, ...oma,
        ladottu: asteiksi(P.id, m.x, m.y), maa: iso, kaupunki, kaupunkiAvain: m.kaupunkiAvain ?? null,
        ankkuri: lukko ? { lat: lukko.lat, lon: lukko.lng } : null, puoli: m.puoli ?? null,
        tarkeys: aihe === 'kaupungit' && kaupunki ? tarkeydet.get(kaupunki) : (kohde.taso ?? 1),
        taso: kohde.taso === 1 || kohde.taso === 3 ? kohde.taso : 2,
        lahizoom: Boolean(kohde.lahi), paakartalla: true, kohdekartta: kk?.kaupunki ?? null,
        paikka: lahdePaikka(m.id, kohde), lahde,
      });
    }
  }
  // 2. Eläintäyt (koko laudalla, js/elaintaky-rivit.js).
  for (const t of elaintakyKarttarivit(P)) {
    const d = ELAINTAKYT[t.iso] ?? {};
    const oma = Number.isFinite(d.lat) && Number.isFinite(d.lon) ? { lat: d.lat, lon: d.lon } : asteiksi(P.id, t.x, t.y);
    if (!oma) continue;
    lisaa({
      id: `elaintaky:${t.iso}`, tunnus: t.tunnus, aihe: 'elaimet', kategoria: 'elain', laji: 'elain', nimi: d.elain ?? d.otsikko ?? t.nimio,
      nimio: t.nimio || null,
      ...oma, ladottu: asteiksi(P.id, t.x, t.y), maa: t.iso, kaupunki: null, kaupunkiAvain: null, tarkeys: 1, taso: 2,
      lahizoom: false, paakartalla: true, kohdekartta: null, paikka: null, lahde: 'elaintaky',
    });
  }
  // 3. Napa-alueiden kohteet (paikka asteina, js/pallolauta/nostot.js napanostonRivi).
  const tynka = { game: { pack: P } };
  for (const [napa, lista] of [['ATA', MAASTOKOHTEET_ATA], ['ARK', MAASTOKOHTEET_ARK]]) {
    for (const kohde of lista) {
      const r = napanostonRivi(tynka, kohde, { avain: `${napa.toLowerCase()}:${kohde.id}` });
      if (!r?.aihe) continue;
      lisaa({
        id: `kohde:${kohde.id}`, tunnus: kohde.id, aihe: r.aihe, kategoria: r.kategoria, laji: r.symLaji ?? null, nimi: kohde.nimi || r.nimi,
        nimio: r.nimi || null,
        ...pyorista({ lat: r.lat, lon: r.lng }), ladottu: null, maa: kohde.iso ?? (napa === 'ATA' ? 'ATA' : null),
        kaupunki: null, kaupunkiAvain: null, tarkeys: kohde.taso ?? 1, taso: kohde.taso === 1 || kohde.taso === 3 ? kohde.taso : 2,
        lahizoom: false, paakartalla: true, kohdekartta: null, paikka: paikkaNimiDatasta(kohde) ?? NAPA_ALUEET[napa], lahde: 'napakohde',
      });
    }
  }
  // 4. Kohdekartoille siirretyt nostot, jotka eivät ole pääkartalla.
  const haeKohde = kohdetietoHaku(P, HISTORIAN_HETKET);
  const ratkeamatta = [];
  for (const [tunnus, kk] of kohdekartalla) {
    if (pallolla.has(tunnus)) continue;
    const kohde = haeKohde(tunnus, kk.kaupunki);
    const kategoria = kohde ? kohteenKategoria(kohde) : null;
    const aihe = kategoria ? nostosymPaakategoria(kategoria) : null;
    if (!aihe) { ratkeamatta.push(tunnus); continue; }
    const { lahde, id } = luokittele(tunnus, kohdeIdt);
    const maa = P.map.cityCountry?.[kk.kaupunki] ?? null;
    lisaa({
      id, tunnus, aihe, kategoria, laji: kohde.tyyppi ?? null, nimi: kohde.nimi || kohde.nimio || tunnus, nimio: null, ...pyorista({ lat: kk.lat, lon: kk.lng }),
      ladottu: null, maa, kaupunki: lahde === 'fokuskohde' ? kaupunkiKohteelle(kohde) : null, kaupunkiAvain: kk.kaupunki,
      tarkeys: kohde.taso ?? 1, taso: kohde.taso === 1 || kohde.taso === 3 ? kohde.taso : 2,
      lahizoom: false, paakartalla: false, kohdekartta: kk.kaupunki, paikka: lahdePaikka(tunnus, kohde), lahde,
    });
  }
  const k = taulukko('js/pallolauta/nostot.js keraa (maanKohdemerkit + eläintäyt + navat) + kohdekartanNostopaikat',
    'Karttavalot pallolle: sama joukko kuin webin pallon nostokerros, pelin omilla funktioilla (skeema 1.24). aihe = valon '
      + 'aihe (kaupungit, luonto, elaimet, historia, ihmeet, hetket, kulttuuri, kauppa, skandaalit; js/karttavalot.js '
      + 'KARTTAVALO_AIHEET) = nostosymPaakategoria(kategoria), kategoria = merkin symbolikategoria, laji = webin symLaji (skeema 1.44: kohteen tyyppi, esim. vuori, saari, jarvi, meri, joki, ruoka, tekniikka; eläintäky elain; null = ei lajia; kuvamerkki NOSTOSYM_KUVAMERKIT[laji] ?? [kategoria]), nimi = kohteen nimi, '
      + 'nimio = kartan nimiö (null = web ei näytä nimeä), paikka = paikan nimi, aina täytetty (paikkaLahde: data = noston tai kortin oma paikka, alue = napa-alue, kaupunki = kaupunkijäsenyyden kaupunki, maa = maan nimi), '
      + 'lat/lon = noston oma paikka (kohdekartan piste, jos nosto on kohdekartalla, muuten laudan datapiste asteina), ladottu = '
      + '{ lat, lon } webin ladonnan jälkeen (kasaus ja erottelu; null kun ei pallolla ladottu), '
      + 'ankkuri = { lat, lon } webin lukittu ankkuri (skeema 1.39; js/packs/nostoankkurit-<iso>.js, web piirtää merkin '
      + 'tähän; null = maalla ei lukittua ankkuria ja web levittää merkit ruudulla ladotusta pisteestä), puoli = nimiön '
      + 'kylki poltetusta väistöstä (oikea, vasen, yla, ala; null = web kokeilee oikea ensin), maa (ISO3), tunnus = pelin '
      + 'noston tunnus. lahde: fokuskohde, skandaalit, historianHetket, syvennys, takynosto, maalehtinosto, elaintaky, napakohde. '
      + 'paakartalla = piirtyykö pallon pääkartalle; false = nosto on vain kaupunkilehden kohdekartalla (kohdekartta = kaupunki; '
      + 'web karsii sen pääkartalta, js/fokuskohteet.js karsiKaupunkikartanNostot). lahizoom = näkyy vasta lähizoomissa (Ranskan '
      + 'pilotti, kohde.lahi). taso = webin nostotaso 1–3, tarkeys 0–3 (kaupunkivalolle kaupungit.tarkeys, muuten kohteen taso '
      + 'tai 1). kaupunki = valo on laudan kaupunki (fokuskohde), kaupunkiAvain = noston kaupunkijäsenyys (nostonKaupunkiAvain '
      + 'tai kohdekartan kaupunki). Sama maastokohde voi olla usean maan valona (id ~2, ~3), kuten webissä maittain.',
    { kaupunki: 'kaupungit', kaupunkiAvain: 'kaupungit', kohdekartta: 'kohdekartat' }, rivit);
  return { kokoelma: k, haeKohde, luokittele: (t) => luokittele(t, kohdeIdt), ratkeamatta };
}

/*
 * Kohdekarttojen kohteille linkitetyn noston aihe (toive 3): sama kaava
 * kuin kaupunkiliuskan "siirretyt"-riveillä (js/pallolauta/nostot.js):
 * tunnuksen kohdetieto → kohteenKategoria → nostosymPaakategoria.
 */
export function rikastaKohdekartat(kohdekartat, haeKohde, luokitteleTunnus) {
  let linkkeja = 0; let aiheellisia = 0;
  for (const kartta of kohdekartat.alkiot) {
    for (const kohde of kartta.kohteet ?? []) {
      const tunnukset = kohde.nosto == null ? [] : (Array.isArray(kohde.nosto) ? kohde.nosto : [kohde.nosto]);
      kohde.linkit = tunnukset.map((tunnus) => {
        const k = haeKohde(tunnus, kartta.kaupunki);
        const kategoria = k ? kohteenKategoria(k) : null;
        const aihe = kategoria ? nostosymPaakategoria(kategoria) : null;
        linkkeja++; if (aihe) aiheellisia++;
        const { lahde } = luokitteleTunnus(tunnus);
        return { tunnus, laji: lahde, aihe, kategoria, nimi: k?.nimi ?? null };
      });
      // Liuska ja pääkartan karsinta käyttävät ensimmäistä tunnusta.
      kohde.aihe = kohde.linkit[0]?.aihe ?? null;
    }
  }
  kohdekartat.kuvaus = kohdekartat.kuvaus.replace('nosto = nähtävyysjutun tunniste (nahtavyydet-kokoelma)',
    'nosto = karttanoston tunnus (merkkijono tai lista; nähtävyysjuttu haetaan kaupunki + nimi -avaimella nahtavyydet-kokoelmasta)')
    + ' Skeema 1.24: linkit = nosto-tunnukset tyypitettyinä [{ tunnus, laji (fokuskohde | skandaalit | historianHetket | '
    + 'syvennys | takynosto | maalehtinosto), aihe (karttavalon aihe kuten webin kaupunkiliuskassa: kohteenKategoria → '
    + 'nostosymPaakategoria), kategoria (symboli), nimi }], aihe = ensimmäisen linkin aihe (null = ei linkkiä). Sama nosto on '
    + 'karttavalot-kokoelmassa (tunnus; paakartalla false, jos se on vain kohdekartalla).';
  return { linkkeja, aiheellisia };
}

/*
 * MAAKOHTAISET TÄKYNOSTOT (skeema 1.24, koordinaattorin lisätoive):
 * js/fokusnosto.js NOSTO_MAAT tyypitettynä. Web valitsee kaupungin poolin
 * nostoKaupunginPooli-funktiolla (kaupungin fokusvirran oma `takynostot`
 * voittaa, muuten maan NOSTO_MAAT-rivi); kaupungit = ne laudan kaupungit,
 * joiden pooli sisältää noston. Nosto, jolla on `kohde`, ei ole oma
 * karttamerkki vaan kohteen kortin nappi (js/fokusnosto.js
 * nostoKohteelle); muut ovat karttamerkkejä (nostoKarttarivit).
 * Kortin kentät kuten js/fokusnosto.js piirraNostonSisus: taitto
 * (nostonTaitto), lööpin päiväysrivi, kappaleet (jaaKappaleiksi), kuva,
 * valokuva, galleria, medianapit (R.nosto: aani, musiikki, musiikkiNayte,
 * esikuuntelu) ja enintään kolme pulukysymystä.
 */
export function takynostoKokoelma(ns, R, taulukko, karttavalot) {
  const P = ns.MAAILMANKARTTA;
  const cc = P.map.cityCountry ?? {};
  const poolit = new Map(P.cities.map((c) => [c.id, new Set(nostoKaupunginPooli(cc[c.id], c.id).map((n) => n.id))]));
  const valoTunnukselle = new Map();
  for (const v of karttavalot.alkiot) if (!valoTunnukselle.has(v.tunnus)) valoTunnukselle.set(v.tunnus, v.id);
  const rivit = [];
  for (const [iso, lista] of Object.entries(NOSTO_MAAT)) {
    for (const n of nostoLevitaLunastus(lista)) {
      const [merkki] = nostoKarttarivit([n], P.id).rivit;
      const kategoria = merkki ? kohteenKategoria(merkki.kohde) : null;
      const xy = n.paikka?.laudat?.[P.id] ?? null;
      const media = R.nosto(n);
      const taitto = nostonTaitto(n);
      rivit.push({
        id: n.id,
        tunnus: `nosto-${n.id}`,
        maa: iso,
        laji: n.id.startsWith('maalehti-') ? 'maalehtinosto' : 'takynosto',
        otsikko: n.otsikko ?? null,
        nimio: merkki?.kohde?.nimio ?? n.nimio ?? null,
        taitto,
        paivays: taitto === 'lehti' ? (n.paivays ?? ([n.paikka?.nimi, n.vuosi].filter(Boolean).join(' · ') || null)) : null,
        ingressi: n.ingressi ?? null,
        teksti: n.teksti ?? '',
        kappaleet: jaaKappaleiksi(n.teksti ?? ''),
        lahde: n.lahde ?? null,
        kuva: R.kuva(n.kuva),
        valokuva: R.kuva(n.valokuva),
        galleria: media.galleria,
        aani: media.aani,
        musiikki: media.musiikki,
        musiikkiNayte: media.musiikkiNayte,
        esikuuntelu: media.esikuuntelu,
        kysymykset: (Array.isArray(n.kysymykset) ? n.kysymykset : []).map((k) => String(k ?? '').trim()).filter(Boolean).slice(0, 3),
        visa: n.visa ?? null,
        kartta: n.kartta ?? null,
        paikka: n.paikka ? { nimi: n.paikka.nimi ?? null, ...(xy ? asteiksi(P.id, xy.x, xy.y) : { lat: null, lon: null }) } : null,
        kohde: n.kohde ?? null,
        kategoria,
        aihe: kategoria ? nostosymPaakategoria(kategoria) : null,
        lahi: Boolean(n.lahi),
        kattoVapaa: Boolean(n.kattoVapaa),
        taso: n.taso ?? null,
        kaupungit: P.cities.filter((c) => cc[c.id] === iso && poolit.get(c.id).has(n.id)).map((c) => c.id),
        karttavalo: valoTunnukselle.get(n.kohde ?? `nosto-${n.id}`) ?? null,
      });
    }
  }
  // Karttavaloihin linkit: karttamerkkinä oleva nosto → takynosto,
  // kohteen korttiin liitetyt → liitetytNostot (saman maan pooli).
  const idt = new Set(rivit.map((r) => r.id));
  const liitetyt = new Map();
  for (const r of rivit) if (r.kohde) liitetyt.set(`${r.maa}|${r.kohde}`, [...(liitetyt.get(`${r.maa}|${r.kohde}`) ?? []), r.id]);
  for (const v of karttavalot.alkiot) {
    const oma = v.tunnus?.startsWith('nosto-') ? v.tunnus.slice(6) : null;
    v.takynosto = oma && idt.has(oma) ? oma : null;
    v.liitetytNostot = liitetyt.get(`${v.maa}|${v.tunnus}`) ?? [];
  }
  karttavalot.viittaukset.takynosto = 'takynostot';
  karttavalot.viittaukset.liitetytNostot = 'takynostot';
  karttavalot.kuvaus += ' takynosto = takynostot-id, kun valo on maan täkynosto (null = kaupungin fokusvirran oma täky, '
    + 'fokusvirrat.virta.takynostot), liitetytNostot = takynostot-id:t, jotka web näyttää tämän kohteen kortin nappina.';
  return taulukko('js/fokusnosto.js#NOSTO_MAAT',
    'Maakohtaiset täkynostot (karttanostot ja maalehtinostot) maittain. Web valitsee kaupungin poolin nostoKaupunginPooli-'
      + 'funktiolla: kaupungin fokusvirran oma takynostot-lista voittaa (fokusvirrat.virta.takynostot), muuten maan pooli; '
      + 'kaupungit = laudan kaupungit, joiden pooliin nosto kuuluu. kohde = kohteen tunnus, jonka kortissa nosto on nappina '
      + '(ei omaa karttamerkkiä); muuten nosto on karttamerkki (karttavalo = karttavalot-id, paikka { nimi, lat, lon }). '
      + 'Kortti (js/fokusnosto.js piirraNostonSisus): taitto kortti | lehti (lehti = Lisälehti-lööppi: paivays, ingressi), '
      + 'otsikko, medianapit (aani, musiikki, musiikkiNayte, esikuuntelu kuten kaupunkilehdet.aiheet[].nostot), kuva ja '
      + 'galleria, kappaleet (jaaKappaleiksi), valokuva tekstin perään, kartta (karttaliite, raaka), kysymykset (enintään 3, '
      + '"Kysy pululta"), visa (minikysymys, raaka). Kuvat { arvo, url, varat, leveys?, korkeus?, lyhyt, selite, lahde }. '
      + 'kategoria/aihe = karttamerkin symboli ja valon aihe (null kohteeseen liitetyllä). lahde = tarkistuksen kirjanpito '
      + '(web ei näytä sitä kortilla, paitsi kuvan tekijärivinä).',
    { maa: 'maat', karttavalo: 'karttavalot', kaupungit: 'kaupungit' }, rivit);
}
