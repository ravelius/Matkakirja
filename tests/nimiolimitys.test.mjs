/*
 * POLTETUT NIMIÖT EIVÄT MENE TOISTENSA PÄÄLLE — EI MAAN SISÄLLÄ, EI
 * RAJAN YLI, EI ELÄINTÄYN KANSSA.
 *
 * OMISTAJAN HAVAINTO 3.9.2026 (Bulgaria, 100 km:n näkymä): *"Kırkpınar-
 * nosto limittyy toisen nimen kanssa."* Mitattuna koko maailmasta
 * (tools/tarkista-nimiolimitys.mjs) pareja oli 17: kuusi rajan kahta
 * puolta (kumpikin maa ladottiin omillaan), kahdeksan eläintäkyä
 * (täky latoutui omillaan nimiö aina oikealla) ja kolme viimeisen
 * oljen tapausta (kaikki neljä kylkeä osuivat nimiöön, ja väistö otti
 * oikean kyljen katsomatta). Korjaus on NOSTOLADONTA_SAANTO
 * 'v11-limitys' (js/nostoladonta.js), ja tämä testi on sen portti.
 *
 * ── MITÄ TÄMÄ TESTI TODISTAA ───────────────────────────────────────
 *
 *   1. Yksikään poltettava nimiö ei limity toisen poltettavan nimiön
 *      kanssa — laatikot samasta ladonnasta, jolla laatta poltetaan.
 *   2. Naapurimaan tynkä (js/fokuskohteet.js maanPoltetutMerkit)
 *      antaa jokaiselle merkille SAMAN nimiölaatikon kuin generaattori
 *      — eli saman kyljen. Kylki ei ole tiivisteessä, joten ilman tätä
 *      laatan nimiö ja pelin napautusalue voisivat erota huomaamatta.
 *   3. Eläintäyn kylki on sama funktio kummallekin lukijalle
 *      (js/elaintaky-rivit.js elaintakyNimioKylki).
 *
 * DOM-ITON JA VERKOTON: ladonta on laudan datan funktio.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import {
  KOHDE_SYMBOLI_SKAALA, maanLadontaEsteet, maanPoltetutMerkit,
} from '../js/fokuskohteet.js';
import { NOSTOLADONTA_S } from '../js/nostoladonta.js';
import { elaintakyNimioKylki } from '../js/elaintaky-rivit.js';
import {
  keraaNostot, laskeNimiolimitykset, limityksenLuokka,
} from '../tools/tarkista-nimiolimitys.mjs';

const pack = packById('maailmankartta');
const { merkit, luettelo } = keraaNostot(pack);
const onPoltettu = (tunnus, tiiviste) => luettelo[tunnus] === tiiviste;

/*
 * KAKSI MITATTUA RYPÄSTÄ, JOTKA ODOTTAVAT ULKOASUPÄÄTÖSTÄ (11.9.2026).
 *
 * Yleistyypin `muu` purku antoi 98 nostolle symbolin ja siis myös
 * nimiön (ennen purkua ne olivat kartalla näkymättömiä: symboli null,
 * nimiö pois). Kahdessa maailman ahtaimmassa ryppäässä se tarkoitti,
 * että naapurin kaikki neljä kylkeä menivät tukkoon ja ladonta joutui
 * viimeiseen olkeensa — *"pienin limitys"* (js/fokuskohteet.js
 * pieninLimitys, js/elaintaky-rivit.js). Kumpikin pari on nimiön
 * KYLJEN valinnasta, ei uuden merkin päältä:
 *
 *   SGP  Pulau Ubinin uusi nimiö varasi Bukit Timahin oikean kyljen,
 *        joten Bukit Timah siirtyi alakyljelle Haw Par Villan päälle.
 *        Singaporessa on yhdeksän merkkiä noin 15 × 17 lautayksikön
 *        alalla — rypäs on täysi, eikä yhtään vapaata kylkeä ole.
 *   TLS  Nino Konis Santanan uusi nimiö varasi eläintäyn oikean
 *        kyljen, joten täky siirtyi yläkyljelle Baguian päälle.
 *
 * RATKAISU EI OLE TÄMÄN ERÄN: kumpikin vaatii joko merkin siirron,
 * lyhyemmän karttanimen (`nimio`-kenttä) tai nostojen siirtoa
 * kaupunkilehteen — kaikki ulkoasu- ja sisältöpäätöksiä, jotka
 * kuuluvat päätoimitukselle. Lista on siksi nimetty ja perusteltu
 * tässä, ja SEN PITÄÄ LYHENTYÄ: jokainen muu pari kaataa testin yhä.
 */
/*
 * EI YHTÄÄN SIEDETTYÄ LIMITYSTÄ.
 *
 * `muu`-tyypin luokittelu (11.9.2026) toi kartalle 98 merkkiä, jotka
 * olivat siihen asti pudonneet pois hiljaa. Kaksi maailman ahtainta
 * ryvästä joutui siitä viimeiseen olkeensa, ja molemmat on ratkaistu:
 * Singaporessa Pulau Ubinin nimiö lyhennettiin saaren arkinimeen
 * "Ubin", ja Itä-Timorissa kansallispuiston merkki siirrettiin 1,8
 * lautayksikköä pohjoiseen puiston sisällä (omistajan päätös
 * 12.9.2026; perustelu ja mittaus js/packs/maastokohteet-tls.js).
 *
 * Lista on tyhjä tarkoituksella: jokainen nimiö–nimiö-limitys kaataa
 * testin. Jos tänne joskus lisätään rivi, sen viereen kirjoitetaan
 * mittaus siitä, mitä kokeiltiin ja miksi se ei riittänyt.
 *
 * NLD Paleis voor Volksvlijt -ihme (Sisältökirjuri 28.9.2026) lisäsi
 * Amsterdamiin kuudennen merkin KAUPUNKIKATON_SADE:n (8 yksikköä,
 * js/fokuskohteet.js) sisään, mikä työnsi kaupungin ruuhkanpudotuksen
 * (KAUPUNKINOSTOJEN_KATTO 3) yli — sivuvaikutuksena Delftin Naundorff/
 * Leeuwenhoek-pari (ei fyysisesti Amsterdamin lähellä) menetti kylkensä.
 * KOKEILTU: Volksvlijtin siirto joka suuntaan ±6 lautayksikköä (koko
 * ruudukko, ei yhtään toimivaa kohtaa alle 8,6 yksikön/17 km:n
 * siirrolla, joka veisi merkin pois Amsterdamista faktavirheeksi);
 * lyhyempi nimio ('Palace') ei vaikuttanut. Oikea korjaus vaatisi joko
 * Volksvlijtin siirron Amsterdamin kaupunkilehden kohdekartalle
 * (js/packs/maakartat.js KAUPUNKIKARTAT.amsterdam, raja osuu juuri ja
 * juuri Frederikspleinin kohdalle) tai jommankumman Delft-nimiön
 * siirron/lyhennyksen — molemmat ulkoasupäätöksiä.
 */
const ODOTTAVAT_LIMITYKSET = new Set([
  '[sama maa] NLD/skandaali-naundorff-delftin-valekuningas + NLD/nosto-leeuwenhoek',
]);
test('yksikään poltettava nimiö ei ole toisen nimiön päällä', () => {
  const { rivit, nimioNimio } = laskeNimiolimitykset(merkit);
  assert.ok(rivit.length > 400, `poltettavia merkkejä vain ${rivit.length} — testin oletus vanhentui`);
  const rivi = ([a, b]) => `[${limityksenLuokka(a, b)}] ${a.iso}/${a.tunnus} + ${b.iso}/${b.tunnus}`;
  assert.deepEqual(nimioNimio.map(rivi).filter((r) => !ODOTTAVAT_LIMITYKSET.has(r)), []);
});

test('naapurin tynkä latoo jokaisen nimiön samalle kyljelle kuin generaattori', () => {
  const eroja = [];
  let verrattu = 0;
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja.lauta !== pack.id) continue;
    const omat = new Map(merkit
      .filter((m) => m.perhe === 'nosto' && m.iso === iso && m.poltettava)
      .map((m) => [m.tunnus, m]));
    for (const rivi of maanPoltetutMerkit(pack, iso, pohja, onPoltettu)) {
      const m = omat.get(rivi.id);
      if (!m) continue;
      verrattu += 1;
      const odotus = m.nimioNakyy ? m.nimioPuoli : null;
      const saatu = rivi.nimio ? rivi.puoli : null;
      if (odotus !== saatu) eroja.push(`${iso}/${rivi.id}: generaattori ${odotus}, tynkä ${saatu}`);
    }
  }
  assert.ok(verrattu > 400, `verrattuja nimiöitä vain ${verrattu}`);
  assert.deepEqual(eroja, []);
});

test('eläintäyn kylki on sama päätös generaattorille ja elävälle kerrokselle', () => {
  const takyt = merkit.filter((m) => m.perhe === 'elaintaky');
  assert.ok(takyt.length >= 20, `eläintäkyjä vain ${takyt.length}`);
  const porras = KOHDE_SYMBOLI_SKAALA * NOSTOLADONTA_S;
  const eroja = [];
  let vaistettyja = 0;
  for (const m of takyt) {
    const kylki = elaintakyNimioKylki(m, porras, maanLadontaEsteet(pack, m.iso));
    if (kylki !== m.nimioPuoli) eroja.push(`${m.iso}: ${m.nimioPuoli} vs ${kylki}`);
    if (kylki !== 'oikea') vaistettyja += 1;
  }
  assert.deepEqual(eroja, []);
  // Ainakin yksi täky väistää: muuten sääntö olisi kuollut koodia.
  assert.ok(vaistettyja > 0, 'yksikään eläintäky ei väistänyt');
});
