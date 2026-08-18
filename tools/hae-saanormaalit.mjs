/*
 * Vuosigraafin vaihteluvyöhyke -> js/packs/saatiedot.js
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-saanormaalit.mjs [valitsimet]
 *
 * Hakee jokaiselle säärivilliselle kaupungille kuukauden TYYPILLISEN
 * YLIMMÄN ja ALIMMAN päivälämmön (omistajan toive 18.8.2026) ja
 * kirjoittaa ne paketin riveille kentiksi ylin[12] ja alin[12].
 * Keskilämpöön, sateeseen, luonnehdintoihin tai kommentteihin ei
 * kosketa — tiedostoon lisätään vain kaksi riviä kaupunkia kohti.
 *
 * Lähde on sama kuin paketin muullakin datalla: Open-Meteon arkisto
 * (ERA5), normaalikausi 1991–2020.
 *
 * --- miksi otos eikä koko kolmekymmentä vuotta ---
 *
 * Open-Meteon ilmainen arkisto laskee pyynnön painon paikkojen,
 * muuttujien ja vuorokausien tulona: yksi paikka, yksi muuttuja ja
 * neljätoista vuorokautta on yksi "kutsu". Kattoja on kolme — 600
 * minuutissa, 5 000 tunnissa ja 10 000 vuorokaudessa. Kaikkien
 * kaupunkien kolmekymmentä vuotta kahdella muuttujalla olisi runsaat
 * 117 000 kutsua eli lähes kaksi viikkoa pelkkää odottamista.
 *
 * Siksi tässä OTETAAN OTOS: jokaisen kuukauden neljätoista
 * ensimmäistä vuorokautta kolmelta vuodelta, jotka on hajautettu
 * tasavälein yli normaalikauden. Kaikki kaupungit ovat samassa
 * pyynnössä (Open-Meteo ottaa pilkulla erotetut koordinaatit), joten
 * pyyntöjä on 36 ja kutsuja 3 × 12 × 75 × 2 = 5 400.
 *
 * Yksi pyyntö painaa 150 kutsua, joten minuuttikatto sallii niitä
 * neljä. TAHTI on siksi oletuksena kahdeksantoista sekuntia — ilman
 * sitä ajo saa 429:n kahdeksannen pyynnön jälkeen ja jää odottamaan
 * seuraavaa tuntia turhaan.
 *
 * Otos ei silti siirry kuvaan sellaisenaan, koska yksittäiset vuodet
 * ovat lämpimämpiä tai kylmempiä kuin kolmenkymmenen vuoden keskiarvo.
 * Otoksesta luetaan vain VUOROKAUDEN VAIHTELUVÄLI (ylin miinus alin),
 * joka on paljon vakaampi suure kuin lämpötaso, ja se asetetaan
 * paketissa jo olevan 1991–2020-keskilämmön ympärille:
 *
 *     ylin = keskilampo + (otoksen ylin - otoksen alin) / 2
 *     alin = keskilampo - (otoksen ylin - otoksen alin) / 2
 *
 * Näin kaista on aina keskilämpökäyrän ympärillä eikä voi ajautua sen
 * ylä- tai alapuolelle, ja graafin lämpötaso pysyy täsmälleen sinä
 * normaalina, jonka lähderivi lupaa.
 *
 * Menetelmä tarkistettiin Lontoolla, jolta haettiin kerran koko
 * 1991–2020 päiväaineisto vertailukohdaksi:
 *   - kolmenkymmenen vuoden ylimmän ja alimman puoliväli osui paketin
 *     keskilämpöön 0,15 asteen sisään kaikkina kuukausina, eli kaista
 *     todella on symmetrinen keskilämmön ympäri
 *   - kolmen hajautetun vuoden otoksesta laskettu kaista erosi koko
 *     jakson kaistasta enintään 0,58 astetta ja viiden vuoden otos
 *     0,41 astetta. Kumpikin jää sen alle, mitä kokonaisluvuiksi
 *     pyöristäminen muuttaa lukuja muutenkin, joten kolme vuotta
 *     riittää — ja maksaa kiintiötä vain kolme viidesosaa.
 *
 * --- miksi kokonaislukuja ---
 *
 * Kaista on graafissa muutaman pikselin levyinen sävy, ei luettava
 * lukusarja. Kymmenyksen tarkkuus kasvattaisi pakettia turhaan eikä
 * näkyisi kuvassa mitenkään.
 *
 * Verkko: Noden fetch ei lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXYa,
 * ks. tools/hae-ilmasto.mjs. Alla oleva lohko käynnistää itsensä
 * uudelleen, jos muuttuja puuttuu.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAKETTI = join(JUURI, 'js', 'packs', 'saatiedot.js');
const OSOITE = 'https://archive-api.open-meteo.com/v1/archive';

/*
 * Välimuisti on tässä välttämätön eikä mukavuus: kiintiö loppuu
 * kesken helposti, ja ilman välimuistia jokainen uusi yritys
 * aloittaisi alusta eikä ajo valmistuisi koskaan. Ajojen välillä
 * säilytettävä polku SAANORMAALIT_VALIMUISTI.
 */
const VALIMUISTI = process.env.SAANORMAALIT_VALIMUISTI
  || join(tmpdir(), 'matkakirja-saanormaalit');

// ---------------------------------------------------------------- valitsimet

function valitsin(nimi, oletus) {
  const i = process.argv.indexOf('--' + nimi);
  if (i < 0) return oletus;
  const arvo = process.argv[i + 1];
  return arvo === undefined || arvo.startsWith('--') ? true : arvo;
}

const ASETUKSET = {
  kuiva: process.argv.includes('--kuiva'),
  /*
   * Otosvuodet tasavälein yli normaalikauden 1991–2020. Neljäntoista
   * vuoden väli osuu eri vaiheisiin El Niñon ja NAO:n kaltaisia
   * heilahteluja, joten otos ei kallistu yhteen sääjaksoon.
   */
  vuodet: String(valitsin('vuodet', '1992,2006,2020')).split(',').map(Number),
  /*
   * Millisekuntia pyyntöjen välissä. Yksi pyyntö painaa 150 kutsua ja
   * minuuttikatto on 600, joten neljä pyyntöä minuutissa on raja.
   * Kahdeksantoista sekuntia jättää siihen varan.
   */
  tahti: Number(valitsin('tahti', 18000)),
  /*
   * Kuukauden ensimmäiset neljätoista vuorokautta. Neljätoista on
   * Open-Meteon laskutuksen luonnollinen palanen: lyhyempi jakso
   * maksaa saman kuin neljätoista vuorokautta, joten sitä lyhyempi
   * otos olisi ilmaiseksi huonompi.
   */
  paivat: Number(valitsin('paivat', 14)),
};

// -------------------------------------------------------------------- lataus

async function haeJakso(kaupungit, vuosi, kuukausi) {
  const nimi = `${vuosi}-${String(kuukausi + 1).padStart(2, '0')}.json`;
  const kohde = join(VALIMUISTI, nimi);
  // tuore=false kertoo kutsujalle, ettei tätä palaa haettu verkosta —
  // silloin kiintiötä ei kulunut eikä tahtia tarvitse odottaa.
  if (existsSync(kohde)) return { data: JSON.parse(readFileSync(kohde, 'utf8')), tuore: false };

  const alku = `${vuosi}-${String(kuukausi + 1).padStart(2, '0')}-01`;
  const loppu = `${vuosi}-${String(kuukausi + 1).padStart(2, '0')}-${String(ASETUKSET.paivat).padStart(2, '0')}`;
  const osoite = `${OSOITE}?latitude=${kaupungit.map((k) => k.lat).join(',')}`
    + `&longitude=${kaupungit.map((k) => k.lon).join(',')}`
    + `&start_date=${alku}&end_date=${loppu}`
    + '&daily=temperature_2m_max,temperature_2m_min&timezone=auto';

  /*
   * 429 EI OLE VIRHE vaan jonotusvuoro. Open-Meteon ilmainen kiintiö
   * lasketaan ulosmenevälle osoitteelle, joka konttiympäristössä on
   * jaettu — tunti voi olla täynnä ennen kuin tämä ajo alkaa. Muutama
   * ensimmäinen odotus on lyhyt siltä varalta, että kyse on hetken
   * ruuhkasta; sen jälkeen nukutaan seuraavan tasatunnin yli, koska
   * tuntiraja aukeaa vasta silloin. Verkkovirheet lasketaan erikseen
   * eivätkä ne kuluta jonotusyrityksiä.
   */
  let jonotus = 0;
  let virheita = 0;
  for (;;) {
    let vastaus = null;
    try {
      vastaus = await fetch(osoite, { signal: AbortSignal.timeout(120000) });
    } catch (e) {
      /*
       * Noden fetch ei aina saa yhteyttä arkistopalvelimeen proxyn
       * läpi ensi yrittämällä (10 sekunnin connect-aikakatkaisu), kun
       * curl samaan osoitteeseen menee joka kerta läpi. Vika on
       * ohimenevä, joten yrityksiä on runsaasti — 60 pyynnön ajossa
       * niukka budjetti kaataisi työn puolivälissä turhaan.
       */
      virheita += 1;
      if (virheita >= 20) throw e;
      process.stderr.write(`    uusiksi (${virheita}): ${e.message}\n`);
      await new Promise((r) => setTimeout(r, Math.min(20000, 2000 * virheita)));
      continue;
    }
    if (vastaus.status === 429) {
      jonotus += 1;
      if (jonotus > 14) throw new Error('kiintiö ei vapautunut — jatka myöhemmin, välimuisti säilyy');
      /*
       * Kiintiö valuu takaisin vähitellen eikä avaudu kerralla, joten
       * odotus kasvaa portaittain puolestatoista minuutista viiteen.
       * Vasta kun kymmenen porrasta on mennyt hukkaan, kyse on koko
       * tunnin katosta ja nukutaan seuraavan tasatunnin yli.
       */
      const odota = jonotus <= 10
        ? Math.min(300000, 30000 * jonotus)
        : 3600000 - (Date.now() % 3600000) + 30000;
      process.stderr.write(`    kiintiö täynnä, odotetaan ${Math.round(odota / 1000)} s\n`);
      await new Promise((r) => setTimeout(r, odota));
      continue;
    }
    if (!vastaus.ok) {
      virheita += 1;
      if (virheita >= 20) throw new Error('HTTP ' + vastaus.status);
      process.stderr.write(`    uusiksi (${virheita}): HTTP ${vastaus.status}\n`);
      await new Promise((r) => setTimeout(r, 4000 * virheita));
      continue;
    }
    const data = await vastaus.json();
    if (!Array.isArray(data) || data.length !== kaupungit.length) {
      throw new Error(`vastauksessa ${data.length ?? '?'} paikkaa, odotettiin ${kaupungit.length}`);
    }
    mkdirSync(VALIMUISTI, { recursive: true });
    writeFileSync(kohde, JSON.stringify(data));
    return { data, tuore: true };
  }
}

// ------------------------------------------------------------------ laskenta

function keskiarvo(luvut) {
  const kelpo = luvut.filter((v) => Number.isFinite(v));
  if (!kelpo.length) return null;
  return kelpo.reduce((a, b) => a + b, 0) / kelpo.length;
}

/*
 * Kaistan puolikas leveys kuukausittain: otoksen päivittäisten
 * ylimpien keskiarvo miinus alimpien keskiarvo, kahdella jaettuna.
 */
function puolikkaat(otokset) {
  return otokset.map((kk) => {
    const ylin = keskiarvo(kk.ylin);
    const alin = keskiarvo(kk.alin);
    if (ylin === null || alin === null) return null;
    return (ylin - alin) / 2;
  });
}

// ------------------------------------------------------------------ kirjoitus

/*
 * Paketti on käsin ylläpidetty tiedosto, jossa on kommentteja ja
 * luonnehdintoja — sitä EI kirjoiteta uusiksi vaan sen riveille
 * pujotetaan ylin ja alin heti keskilammon perään. Rivit tunnistetaan
 * sisennyksestä, ja aiemmalla ajolla lisätyt korvataan.
 */
function kirjoitaPakettiin(teksti, kaistat) {
  const ulos = [];
  const tehdyt = new Set();
  let kaupunki = null;
  for (const rivi of teksti.split('\n')) {
    const alku = rivi.match(/^ {2}([a-z0-9]+): \{$/);
    if (alku) kaupunki = alku[1];
    /*
     * Aiemman ajon rivit pudotetaan ja uudet kirjoitetaan tilalle,
     * jotta ajo on toistettava: toinen ajo antaa saman tiedoston eikä
     * kasvata riviparia joka kerralla. Otsikon kommenttirivit alkavat
     * tähdellä eivätkä osu tähän kaavaan.
     */
    if (kaupunki && /^ {4}(ylin|alin): \[[^\]]*\],$/.test(rivi)) continue;
    ulos.push(rivi);
    if (kaupunki && !tehdyt.has(kaupunki) && /^ {4}keskilampo: \[[^\]]*\],$/.test(rivi)) {
      const k = kaistat[kaupunki];
      if (!k) continue;
      ulos.push(`    ylin: [${k.ylin.join(', ')}],`);
      ulos.push(`    alin: [${k.alin.join(', ')}],`);
      tehdyt.add(kaupunki);
    }
  }
  return { teksti: ulos.join('\n'), lisatty: tehdyt.size };
}

// ------------------------------------------------------------------- ajo

async function main() {
  const { SAATIEDOT } = await import(PAKETTI);
  const kaupungit = Object.entries(SAATIEDOT)
    .filter(([, t]) => Array.isArray(t.keskilampo) && t.keskilampo.length === 12
      && Number.isFinite(t.lat) && Number.isFinite(t.lon))
    .map(([id, t]) => ({ id, lat: t.lat, lon: t.lon, keskilampo: t.keskilampo }));

  const pyyntoja = ASETUKSET.vuodet.length * 12;
  process.stderr.write(`${kaupungit.length} kaupunkia, otosvuodet ${ASETUKSET.vuodet.join(', ')}, `
    + `${ASETUKSET.paivat} vrk/kk -> ${pyyntoja} pyyntöä\n`);
  process.stderr.write(`välimuisti ${VALIMUISTI}\n\n`);

  // kaupunki -> 12 kuukautta, kussakin otoksen päivittäiset ylimmät ja alimmat
  const otokset = new Map(kaupungit.map((k) => [k.id,
    Array.from({ length: 12 }, () => ({ ylin: [], alin: [] }))]));

  for (const vuosi of ASETUKSET.vuodet) {
    for (let kk = 0; kk < 12; kk += 1) {
      const { data, tuore } = await haeJakso(kaupungit, vuosi, kk);
      kaupungit.forEach((k, i) => {
        const d = data[i]?.daily;
        if (!d) throw new Error(`${k.id}: ${vuosi}-${kk + 1} jäi ilman dataa`);
        otokset.get(k.id)[kk].ylin.push(...d.temperature_2m_max);
        otokset.get(k.id)[kk].alin.push(...d.temperature_2m_min);
      });
      process.stderr.write(`  ${vuosi}-${String(kk + 1).padStart(2, '0')} valmis`
        + `${tuore ? '' : ' (välimuistista)'}\n`);
      if (tuore) await new Promise((r) => setTimeout(r, ASETUKSET.tahti));
    }
  }

  const kaistat = {};
  const puuttuvat = [];
  for (const k of kaupungit) {
    const puoli = puolikkaat(otokset.get(k.id));
    if (puoli.some((p) => p === null)) { puuttuvat.push(k.id); continue; }
    kaistat[k.id] = {
      ylin: puoli.map((p, i) => Math.round(k.keskilampo[i] + p)),
      alin: puoli.map((p, i) => Math.round(k.keskilampo[i] - p)),
      vaihtelu: puoli.map((p) => p * 2),
    };
  }

  process.stderr.write('\nvuorokauden vaihteluväli (pienin…suurin kuukausi):\n');
  for (const k of kaupungit) {
    const kaista = kaistat[k.id];
    if (!kaista) { process.stderr.write(`  ${k.id.padEnd(14)} EI DATAA\n`); continue; }
    const pienin = Math.min(...kaista.vaihtelu);
    const suurin = Math.max(...kaista.vaihtelu);
    // Alle asteen tai yli 25 asteen vuorokausivaihtelu ei ole
    // maapallolla tavallista: merkitään se, jotta virheellinen ruutu
    // ei jää huomaamatta.
    const epailys = pienin < 1 || suurin > 25 ? '  <-- TARKISTA' : '';
    process.stderr.write(`  ${k.id.padEnd(14)} ${pienin.toFixed(1).padStart(5)}…${suurin.toFixed(1).padStart(5)}°`
      + `   ylin ${Math.max(...kaista.ylin)}°  alin ${Math.min(...kaista.alin)}°${epailys}\n`);
  }
  if (puuttuvat.length) {
    process.stderr.write(`\nilman kaistaa jäi: ${puuttuvat.join(', ')}\n`);
  }

  const vanha = readFileSync(PAKETTI, 'utf8');
  const { teksti, lisatty } = kirjoitaPakettiin(vanha, kaistat);
  if (ASETUKSET.kuiva) {
    process.stderr.write(`\n--kuiva: ${lisatty} kaupunkia olisi saanut kaistan, mitään ei kirjoitettu\n`);
    return;
  }
  writeFileSync(PAKETTI, teksti);
  const kasvu = Buffer.byteLength(teksti) - Buffer.byteLength(vanha);
  process.stderr.write(`\nkirjoitettu ${PAKETTI}: ${lisatty} kaupunkia sai kaistan, `
    + `paketti kasvoi ${(kasvu / 1024).toFixed(1)} kt\n`);
}

main().catch((e) => {
  process.stderr.write('VIRHE: ' + (e.stack || e.message) + '\n');
  process.exit(1);
});
