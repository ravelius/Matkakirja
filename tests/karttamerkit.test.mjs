/*
 * JOKAINEN NÄKYVÄ KARTTAMERKKI ON NIMETTY JA NAPAUTETTAVA.
 *
 * OMISTAJAN HAVAINTO 2.9.2026 (Bosnia ja Hertsegovina, 50 km:n näkymä),
 * sanatarkasti: *"kaksi tekstitöntä huutomerkkiä sekä Dinaariset Alpit
 * mitä ei voi klikata. samoin Dinara ja Sveti Jure eivät ole
 * klikattavissa. voi olla myös muitakin. nyt nämä Euroopan kaikki
 * karttakohteet on huolella tarkistettava. olen pyytänyt tätä jo pari
 * kertaa mutta silti kartalta löytyy paljon viallisia kohtia."*
 *
 * ── TYÖNJAKO PORTIN KANSSA ─────────────────────────────────────────
 *
 * `tools/tarkista-karttamerkit.mjs` katsoo RUUTUA: se ajaa jokaisen
 * Euroopan laudan maan kahdessa mittakaavassa, lukee merkit DOMista ja
 * osumatestistä ja on siksi hidas (kymmenisen minuuttia) ja verkosta
 * riippuvainen (laattaluettelo ämpäristä).
 *
 * TÄMÄ TESTI katsoo LADONTAA, joka on Raamatun ehdon mukaan puhdas
 * funktio laudan datasta — se ajaa sekunneissa, ilman selainta ja ilman
 * verkkoa, ja kattaa KAIKKI maat ja kaikki mittakaavat eikä vain sitä
 * kourallista, joka sattuu olemaan ruudulla. Kaksi väitettä, kumpikin
 * omistajan havainnon toinen puoli:
 *
 *   1. YKSIKÄÄN POLTETTU MERKKI EI OLE ILMAN NIMIÖTÄ ("tekstitön
 *      huutomerkki"). Poltettu symboli on kartalla kuva, jota ei voi
 *      siirtää eikä selittää — nimi on ainoa, mikä kertoo mistä on kyse.
 *   2. JOKAINEN LADOTTU MAASTONIMI JA -KOLMIO KANTAA AVAIMEN, jolla
 *      napautus löytää tietueensa ("Dinaariset Alpit mitä ei voi
 *      klikata"). Ilman avainta solmu on kuvitusta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import { MAAILMANKARTAN_NIMET } from '../js/packs/maailmankartta-nimet.js';
import { maanPoltetutMerkit } from '../js/fokuskohteet.js';
import { karttanimienLadonta } from '../js/karttanimet.js';
import { keraaNostot } from '../tools/fokuskartta/nostot.mjs';
import { kytkeFokusnosto } from '../js/fokusnosto.js';
import { kytkeSyvennys } from '../js/syvennys.js';
import { kytkeSkandaalit } from '../js/skandaalit.js';
import { kytkeHistorianHetket } from '../js/historian-hetket.js';

/*
 * LISÄLÄHTEET REKISTERIIN, KUTEN PELISSÄ (js/main.js) — ilman niitä
 * ladonnasta puuttuisivat juuri ne kaksi merkkiä, joista omistajan
 * havainto alkoi (täkynosto `nosto-pyramidi` ja skandaali
 * `skandaali-fojnican-vaakunakirja`).
 */
kytkeFokusnosto();
kytkeSyvennys();
kytkeSkandaalit();
kytkeHistorianHetket();

const pack = packById('maailmankartta');
const { luettelo } = keraaNostot(pack);
const onPoltettu = (tunnus, tiiviste) => luettelo[tunnus] === tiiviste;

test('yksikään poltettu merkki ei jää ilman nimiötä', () => {
  const nimettomat = [];
  let poltettuja = 0;
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja?.lauta !== pack.id) continue;
    for (const merkki of maanPoltetutMerkit(pack, iso, pohja, onPoltettu)) {
      poltettuja += 1;
      /*
       * NIMETÖN MERKKI ON PÄÄTÖS EIKÄ VIKA: kaupunkikohteen nimen sanoo
       * laudan oma kaupunki ja maastokohteen nimen nimikerros
       * (kohteenNimio). Vika on se, että merkillä ON nimi mutta se ei
       * päätynyt kartalle.
       */
      if (merkki.nimi && !merkki.nimio) nimettomat.push(`${iso}/${merkki.id}`);
    }
  }
  assert.ok(poltettuja > 300, `poltettuja merkkejä vain ${poltettuja} — testin oletus vanhentui`);
  assert.deepEqual(nimettomat, [], 'poltettu symboli ilman nimiötä');
});

/*
 * MITTAKAAVAT: sama haarukka kuin nimiladonnan omassa testissä — uloin
 * yleiskuva, maalehden näkymä ja syvä lähikuva. Maastonimien joukko
 * vaihtuu kynnyksittäin (KYNNYS.vuoriNimi, jarviNimi, jarviNimi2), ja
 * väite koskee jokaista niistä.
 */
const MITTAKAAVAT = [0.05, 0.12, 0.3, 0.8, 1.7, 3.4, 8];

const tietue = (polku) => {
  const [kansio, avain] = String(polku).split(':');
  return (MAAILMANKARTAN_NIMET?.[kansio] ?? []).find((t) => t.avain === avain) ?? null;
};

test('jokainen ladottu maastonimi kantaa napautettavan avaimen', () => {
  let maastonimia = 0;
  for (const px of MITTAKAAVAT) {
    const { nimiot } = karttanimienLadonta(pack, px);
    for (const n of nimiot) {
      if (n.laji !== 'vuori' && n.laji !== 'jarvi') continue;
      maastonimia += 1;
      assert.ok(n.polku, `maastonimi ilman avainta: "${n.teksti}" (px ${px})`);
      const t = tietue(n.polku);
      assert.ok(t, `avain ei osu tietueeseen: ${n.polku}`);
      assert.equal(t.nimi, n.teksti, `avain osuu väärään tietueeseen: ${n.polku}`);
    }
  }
  assert.ok(maastonimia > 50, `maastonimiä vain ${maastonimia} — testin oletus vanhentui`);
});

test('jokainen ladottu vuorikolmio kantaa saman avaimen kuin nimensä', () => {
  let kolmioita = 0;
  for (const px of MITTAKAAVAT) {
    const { merkit, nimiot } = karttanimienLadonta(pack, px);
    const nimet = new Set(nimiot.filter((n) => n.polku).map((n) => n.polku));
    for (const m of merkit) {
      if (m.laji !== 'vuori') continue;
      kolmioita += 1;
      assert.ok(m.polku, `vuorikolmio ilman avainta (px ${px}, ${m.x}/${m.y})`);
      /*
       * KOLMIO PIIRRETÄÄN VAIN NIMEN SAANEELLE (js/karttanimet.js
       * `nimetytVuoret`), joten sen avaimen on löydyttävä myös
       * nimiöiden joukosta. Muuten kartalla olisi merkki, jonka nimi
       * on jossain muualla — juuri se puolikas, jonka Raamatun
       * KLIKATTAVUUSLINJA kieltää.
       */
      assert.ok(nimet.has(m.polku), `kolmio ilman omaa nimeä: ${m.polku} (px ${px})`);
    }
  }
  assert.ok(kolmioita > 20, `vuorikolmioita vain ${kolmioita} — testin oletus vanhentui`);
});

test('maastotietueessa on se, mitä popup lupaa näyttää', () => {
  for (const kansio of ['vuoret', 'jarvet']) {
    for (const t of MAAILMANKARTAN_NIMET[kansio] ?? []) {
      assert.ok(t.avain, `${kansio}: tietue ilman avainta (${t.nimi})`);
      assert.ok(t.nimi, `${kansio}: tietue ilman nimeä (${t.avain})`);
      assert.ok(t.selitys && t.selitys.length > 20,
        `${kansio}/${t.avain}: selitys puuttuu tai on tynkä`);
      assert.ok(t.wiki, `${kansio}/${t.avain}: wiki-otsikko puuttuu`);
    }
  }
});
