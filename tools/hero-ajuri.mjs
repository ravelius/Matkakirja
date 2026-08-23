/*
 * Herokuvien ajuri: generoi hero-työlistan välin [alku, loppu)
 * Pöllö-workerilla vaakakuvina. Prompti lähetetään sellaisenaan
 * (työlistat kokoavat reseptin itse), ohittaa valmiit tiedostot ja
 * pysähtyy päivärajaan kuten juliste-ajuri.
 *
 * Käyttö: POLLO_KEHITTAJAKOODI=<koodi> node hero-ajuri.mjs <lista> [alku] [loppu] [kohdekansio]
 *   <lista> on työlistan numero (esim. 4 → hero-tyolista-4.mjs).
 *   Verkkoyhteys kontissa vaatii NODE_USE_ENV_PROXY=1.
 *
 * ---------------------------------------------------------------
 * VIITEKUVAT JA GENEROINTIPORTTI (omistajan tilaus 23.8.2026)
 * ---------------------------------------------------------------
 * Tausta: hero-kashgar-keskipaiva.png esitti Samarkandin tyylistä
 * timuridimausoleumia, vaikka kuvateksti lupasi Yusuf Balasagunin
 * mausoleumia Kašgarissa. Malli ei tuntenut kohdetta ja täytti aukon
 * alueen arkkityypillä — vaikka Commonsissa oli kohteesta kahdeksan
 * vapaata valokuvaa. Generoinnista ei luovuta, se ankkuroidaan.
 *
 * Työlistan kohta voi siksi kantaa näitä kenttiä:
 *
 *   tarkkaKohde: true                   // nimetty rakennus, portti päällä
 *   wiki:        'Tampere Old Church'   // en-Wikipedian otsikko
 *   kategoria:   'Category:Näsinneula'  // vaihtoehto wikille
 *   viitehaku:   'Näsinneula'           // vapaa nimi, VARAREITTI
 *   viitesuosi:  ['observation', 'top'] // nostaa halutun kuvakulman
 *   salliTekstihaku: true               // sallii varareitin tarkalle kohteelle
 *
 * KOHTEEN TUNNISTUS (päätoimittajan linjaus 23.8.2026, Tampereen
 * testiajon löydös): ensisijainen reitti EI ole vapaa tekstihaku vaan
 * kohteen oma, ihmisen kuratoima Commons-kategoria — se haetaan
 * en-Wikipedian otsikosta Wikidatan kautta. Hakusana "Old Church of
 * Tampere" palautti pääosin MESSUKYLÄN vanhan kirkon, keskiaikaisen
 * kivikirkon kaupungin laidalta, ei keskustan puista Vanhaa kirkkoa.
 * Väärä viite on pahempi kuin ei viitettä lainkaan: se ankkuroi
 * generoinnin väärään rakennukseen.
 *
 * Kun kohde on tunnistettu, ajuri hakee tools/hae-viitekuvat.mjs:llä
 * 2–4 vapaasti lisensoitua nykyvalokuvaa ERI KUVAAJILTA ja ERI
 * KUVAKULMISTA ja lähettää ne workerille kentässä `viitteet`. Worker
 * kutsuu silloin OpenAI:n /v1/images/edits -päätepistettä.
 *
 * GENEROINTIPORTTI (omistajan sitova sääntö — mieluummin ei kuvaa
 * kuin väärä kuva). Kohta, jossa on `tarkkaKohde: true`, generoidaan
 * VAIN jos molemmat ehdot täyttyvät:
 *   1. viitekuvia on VÄHINTÄÄN KAKSI, ja
 *   2. tunnistus on varma — kuvat tulivat kohteen omasta
 *      Commons-kategoriasta. Varmennettu tekstihaku kelpaa vain, jos
 *      työlista sallii sen erikseen (`salliTekstihaku: true`).
 * Muuten ajuri kirjaa "EI TARPEEKSI VIITEITA" tai "TUNNISTUS EPÄVARMA"
 * ja jatkaa seuraavaan. Portin pysäyttämät kohteet ovat tulos, jonka
 * päätoimittaja haluaa tietää — ei este, joka kierretään.
 *
 * Yleisnäkymät (ei nimettyä kohdetta, ei `tarkkaKohde`-merkintää)
 * generoidaan ilman viitteitä kuten ennenkin.
 *
 * Ohje: docs/moduulit/viitekuvat.md
 */
import { writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';
import { join } from 'path';
import { haeViitekuvat, VIITTEITA_ENINTAAN } from './hae-viitekuvat.mjs';

/** Generointiportin raja: alle tämän ei generoida tarkkaa kohdetta. */
const VIITTEITA_VAHINTAAN = 2;

const koodi = process.env.POLLO_KEHITTAJAKOODI;
if (!koodi) { console.error('POLLO_KEHITTAJAKOODI puuttuu'); process.exit(1); }
const { POLLOPALVELIN } = await import('/home/user/Matkakirja/js/packs/pollo-asetukset.js');
const lista = process.argv[2];
const { TYOLISTA } = await import(`./hero-tyolista-${lista}.mjs`);
const alku = Number(process.argv[3] ?? 0);
const loppu = Number(process.argv[4] ?? TYOLISTA.length);
const kansio = process.argv[5] ?? '.';
mkdirSync(kansio, { recursive: true });

/*
 * Lähdeloki: jokainen viitekuva kirjataan tekijöineen ja
 * lisensseineen kohdekansioon (perustuslain pilari 2 — lähde on aina
 * jäljitettävissä). Tiedostoa täydennetään, ei ylikirjoiteta.
 */
const lokiPolku = join(kansio, 'viitekuvat-loki.txt');
const loki = (rivi) => appendFileSync(lokiPolku, `${rivi}\n`);

for (const t of TYOLISTA.slice(alku, loppu)) {
  const polku = join(kansio, t.tiedosto);
  if (existsSync(polku)) { console.log('OHITETTU', t.tiedosto); continue; }

  // --- Viitekuvat ja generointiportti -------------------------------
  let viitteet = [];
  if (t.wiki || t.kategoria || t.viitehaku || t.tarkkaKohde) {
    if (!t.wiki && !t.kategoria && !t.viitehaku) {
      // tarkkaKohde ilman tunnistetta on työlistan virhe: portti
      // menee kiinni, koska viitteitä ei voi edes hakea.
      console.error('TUNNISTUS EPAVARMA', t.tiedosto, '— tarkkaKohde ilman wiki/kategoria/viitehaku-kenttää');
      loki(`${t.tiedosto}\tPORTTI KIINNI\ttarkkaKohde ilman kohteen tunnistetta`);
      continue;
    }
    let tulos = { maara: 0, kuvat: [], varmuus: 'epavarma', kategoria: null, hylatyt: [] };
    try {
      tulos = await haeViitekuvat(t.viitehaku ?? t.wiki ?? '', t.kaupunki ?? '', {
        wiki: t.wiki,
        kategoria: t.kategoria,
        suosi: t.viitesuosi,
        maara: VIITTEITA_ENINTAAN,
      });
    } catch (e) {
      console.error('viitehaku epäonnistui', t.tiedosto, String(e.message).slice(0, 120));
    }
    console.log(`VIITTEET ${t.tiedosto}: tunnistus ${tulos.varmuus}`
      + `${tulos.kategoria ? ` (${tulos.kategoria})` : ''}`
      + `, kelvollisia ${tulos.maara}, ladattu ${tulos.kuvat.length}`);
    for (const k of tulos.kuvat) {
      loki(`${t.tiedosto}\t${k.nimi}\t${k.lisenssi}\t${k.tekija}\t${k.sivu}`);
    }
    for (const h of tulos.hylatyt) loki(`${t.tiedosto}\tHYLATTY\t${h.nimi}\t${h.syy}`);

    if (t.tarkkaKohde) {
      // Ehto 2: tunnistuksen on oltava varma.
      const varmaTunnistus = tulos.varmuus === 'kategoria'
        || (tulos.varmuus === 'tekstihaku' && t.salliTekstihaku === true);
      if (!varmaTunnistus) {
        console.error('TUNNISTUS EPAVARMA', t.tiedosto, `(${tulos.varmuus})`);
        loki(`${t.tiedosto}\tPORTTI KIINNI\ttunnistus ${tulos.varmuus}`);
        continue;
      }
      // Ehto 1: viitteitä vähintään kaksi.
      if (tulos.kuvat.length < VIITTEITA_VAHINTAAN) {
        console.error('EI TARPEEKSI VIITEITA', t.tiedosto,
          `(${tulos.kuvat.length} kpl, tarvitaan ${VIITTEITA_VAHINTAAN})`);
        loki(`${t.tiedosto}\tPORTTI KIINNI\tviitteitä ${tulos.kuvat.length}/${VIITTEITA_VAHINTAAN}`);
        continue;
      }
    }
    viitteet = tulos.kuvat.map((k) => k.b64).filter(Boolean);
  }

  // --- Generointi ---------------------------------------------------
  let onnistui = false;
  for (let y = 0; y < 3 && !onnistui; y++) {
    try {
      const r = await fetch(POLLOPALVELIN, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-pollo-kehittaja': koodi, origin: 'https://ravelius.github.io' },
        body: JSON.stringify({
          tehtava: 'kuva',
          prompti: t.prompti,
          koko: 'vaaka',
          ...(viitteet.length ? { viitteet } : {}),
        }),
      });
      const j = await r.json();
      if (r.status === 429) { console.error('PAIVARAJA', t.tiedosto); process.exit(2); }
      if (!r.ok || !j?.kuva) throw new Error(`${r.status} ${j?.viesti ?? ''}`);
      writeFileSync(polku, Buffer.from(j.kuva, 'base64'));
      console.log('OK', t.tiedosto, viitteet.length ? `(${j.viitteita ?? viitteet.length} viitettä)` : '(ei viitteitä)');
      onnistui = true;
    } catch (e) {
      console.error(`yritys ${y + 1} ${t.tiedosto}:`, String(e.message).slice(0, 120));
      await new Promise((s) => setTimeout(s, 8000 * (y + 1)));
    }
  }
  if (!onnistui) console.error('EPAONNISTUI', t.tiedosto);
}
console.log('ERA VALMIS');
