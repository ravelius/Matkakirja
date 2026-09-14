/*
 * RAAKAVIENTI — YKSI TOTEUTUS KAIKILLE ÄÄNIPUTKILLE.
 *
 * ------------------------------------------------------------------
 * OMISTAJAN SITOVA SÄÄNTÖ 14.9.2026
 * ------------------------------------------------------------------
 * Raamattu: "ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA". Jokaisen
 * maksullisen generoinnin raakatuotos viedään ämpäriin versionoituun
 * avaimeen ENNEN käsittelyä, kuitti kirjaa avaimen ja sha256:n, raakaa
 * ei koskaan poisteta eikä ylikirjoiteta, ja ajo joka ei tallenna
 * raakaa on virheellinen: työkalun pitää KIELTÄYTYÄ generoinnista,
 * ei jatkaa hiljaa.
 *
 * Sääntö koskee KAIKKIA äänirooleja. Pulun ääniputki (generoi-pulu) ja
 * tehosteputki (generoi-tehosteet) saivat toteutuksensa omissa
 * PR:issään; tämä moduuli on sama kuvio niille seitsemälle putkelle,
 * joita ne eivät kattaneet.
 *
 * ------------------------------------------------------------------
 * MIKSI MALLIN TUOTOS EIKÄ VALMIS TIEDOSTO
 * ------------------------------------------------------------------
 * Mallin oma tuotos on ainoa asia, josta on MAKSETTU. Kaikki muu —
 * leikkaus, häivytys, normalisointi, hiljaisuuspaddaus, loopin sauma —
 * on ilmaista ja toistettavaa, kunhan lähtötavut ovat tallessa. Ennen
 * tätä sääntöä raaka jäi ajajan levylle kansioon, joka on
 * .gitignoressa ja katoaa Actions-ajon mukana, joten pieninkin
 * korjaus käsittelyyn vaati uuden maksullisen kutsun.
 *
 * MUSIIKKIPUTKISSA tämä on erityisen tärkeää: valmis raita on
 * OMMELTU saumattomaksi loopiksi, eli se on johdettu teos. Mallin
 * tuotos ennen ompelua on se, mitä ei saa hukata — uuden sauman voi
 * etsiä siitä ilmaiseksi niin monta kertaa kuin haluaa.
 *
 * HYLÄTYNKIN OTON RAAKA VIEDÄÄN. Jos validointi kaataa oton (esim.
 * generoi-avaus: häntä ei ole hiljainen), kutsu on jo maksettu.
 * Vienti tehdään siksi heti API-vastauksen jälkeen, ennen mitään
 * tarkistusta — muuten juuri ne otot katoaisivat, joita eniten
 * haluttaisiin tutkia.
 */

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const sha256 = (data) => createHash('sha256').update(data).digest('hex');

/** Ämpärin julkinen juuri luetaan pelin omasta moduulista, ei kopiona. */
export function julkinenJuuri() {
  const media = readFileSync(resolve(JUURI, 'js/media.js'), 'utf8');
  const osuma = media.match(/const R2_JUURI = '([^']+)'/);
  if (!osuma) throw new Error('js/media.js: R2_JUURI ei löytynyt — päivitä tämä työkalu.');
  return osuma[1];
}

/**
 * Erätunnus reseptistä: sama resepti antaa saman tunnuksen, eri
 * resepti eri. Tunnus on raaka-avaimen kansio, joten se on myös se
 * asia, joka estää kahta eri ajoa kirjoittamasta toistensa
 * alkuperäisten päälle.
 *
 * @param {string} etuliite putken oma tunnus, esim. 'avaus'
 * @param {object} resepti kaikki, mikä vaikuttaa tuotokseen
 */
export function eratunnus(etuliite, resepti) {
  if (!/^[a-z0-9-]+$/.test(String(etuliite ?? ''))) {
    throw new Error(`erätunnuksen etuliite kelpaa vain pienaakkosina, sai: ${etuliite}`);
  }
  if (!resepti || typeof resepti !== 'object') {
    throw new Error('erätunnus vaatii reseptin');
  }
  if (!resepti.sourceCommit) throw new Error('erätunnus vaatii sourceCommit-tunnuksen');
  return `${etuliite}-${sha256(JSON.stringify(resepti)).slice(0, 20)}`;
}

/**
 * Raakatuotosten ämpärikansio: eräkohtainen, ei revisiokohtainen.
 * Kelvoton erätunnus HYLÄTÄÄN eikä siivota — siivottu tunnus voisi
 * törmätä toisen erän kanssa ja tuhota sen alkuperäisen.
 *
 * @param {string} juuriKansio putken oma ämpärikansio, esim. 'audio'
 * @param {string} batchId eratunnus()-tulos
 */
export function raakaAmpariKansio(juuriKansio, batchId) {
  if (!/^[a-zA-Z0-9/_-]+$/.test(String(juuriKansio ?? ''))) {
    throw new Error(`kelvoton ämpärikansio: ${juuriKansio}`);
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(String(batchId ?? ''))) {
    throw new Error(`raakavienti vaatii kelvollisen erätunnuksen, sai: ${batchId}`);
  }
  return `${juuriKansio.replace(/\/+$/, '')}/raaka/${batchId}`;
}

/**
 * Saako maksullinen generointi alkaa? Palauttaa syyn merkkijonona,
 * jos ei saa, ja null jos saa.
 *
 * Erotettu omaksi funktiokseen, jotta jokainen putki voi kutsua sitä
 * ENNEN ensimmäistäkään API-kutsua ja jotta testi voi kaataa itsensä
 * ilman API-avainta, ilman ffmpegiä ja ilman ämpäriä.
 *
 * @param {{ kuiva?: boolean, vienti?: boolean }} liput ajon liput
 */
export function raakavientiEste({ kuiva = false, vienti = true } = {}) {
  if (kuiva) return null;
  if (!vienti) {
    return 'maksullinen generointi ei ole sallittu ilman raakavientiä: vienti pois '
      + 'jättäisi mallin alkuperäisen tuotoksen vain ajajan levylle, josta se katoaa '
      + 'ajon mukana. Omistajan sääntö 14.9.2026 (Raamattu: ALKUPERÄISET ÄÄNITIEDOSTOT '
      + 'SÄILYTETÄÄN AINA) vaatii raakatiedoston ämpäriin ennen käsittelyä. '
      + 'Kuivan ajon saa ilman vientiä.';
  }
  return null;
}

/** Kaataa ajon heti, jos raakavienti ei ole käytössä. */
export function vaadiRaakavienti(liput) {
  const este = raakavientiEste(liput);
  if (este) {
    console.error(este);
    process.exit(1);
  }
}

function aja(komento, argumentit, { salliVirhe = false } = {}) {
  const ajo = spawnSync(komento, argumentit, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const loki = `${ajo.stdout ?? ''}${ajo.stderr ?? ''}`;
  if (!salliVirhe && (ajo.error || ajo.status !== 0)) {
    throw new Error(`${komento} epäonnistui (${ajo.error?.message ?? ajo.status}):\n${loki.slice(-2000)}`);
  }
  return { koodi: ajo.status ?? 1, loki };
}

function onOlemassa(komento) {
  return spawnSync('sh', ['-c', `command -v ${komento}`], { encoding: 'utf8' }).status === 0;
}

/** Repon HEAD; ilman gitiä nollat, jotta erätunnus on silti laskettavissa. */
export function lahdeCommit() {
  const { loki, koodi } = aja('git', ['-C', JUURI, 'rev-parse', 'HEAD'], { salliVirhe: true });
  return koodi === 0 ? loki.trim() : '0'.repeat(40);
}

/**
 * VIE MALLIN RAAKATUOTOS ÄMPÄRIIN JA PALAUTA KUITTIRIVI.
 *
 * Kutsutaan heti API-vastauksen jälkeen, ennen mitään käsittelyä ja
 * ennen mitään validointia. Kaatuu, jos vienti ei onnistu: ajoa ei saa
 * jatkaa, koska alkuperäinen katoaisi.
 *
 * @param {Buffer} tavut mallin vastaus sellaisenaan
 * @param {{ nimi: string, kansio: string, tyyppi?: string }} minne
 * @returns {{ fileName, objectKey, url, sha256, bytes }}
 */
export function vieRaaka(tavut, { nimi, kansio, tyyppi = 'audio/mpeg' }) {
  if (!Buffer.isBuffer(tavut) || !tavut.length) {
    throw new Error('raakavienti sai tyhjän tuotoksen');
  }
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const avain = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !avain && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`raakavienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  if (!onOlemassa('aws')) throw new Error('aws-cli puuttuu — raakavienti tarvitsee sen.');

  const objectKey = `${kansio}/${nimi}`;
  const tyokansio = mkdtempSync(join(tmpdir(), 'raaka-'));
  try {
    const polku = join(tyokansio, nimi.replace(/[^A-Za-z0-9._-]/g, '_'));
    writeFileSync(polku, tavut);
    aja('aws', [
      's3', 'cp', polku, `s3://${ampari}/${objectKey}`,
      '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
      '--no-progress', '--content-type', tyyppi,
      '--cache-control', 'public, max-age=2592000',
    ]);
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  // Luettava takaisin julkisesta osoitteesta: kirjoitus ilman luentaa
  // ei ole todiste siitä, että alkuperäinen on tallessa.
  const url = `${julkinenJuuri()}${objectKey}`;
  if (onOlemassa('curl')) {
    const { loki } = aja('curl', ['-sS', '-I', '--max-time', '30', url], { salliVirhe: true });
    const koodi = loki.match(/HTTP\/[\d.]+ (\d{3})/)?.[1] ?? null;
    if (koodi !== null && koodi !== '200') {
      throw new Error(`raakatiedoston vienti epäonnistui (${url} → HTTP ${koodi}); `
        + 'ajoa ei jatketa, koska alkuperäinen katoaisi');
    }
  }
  return { fileName: nimi, objectKey, url, sha256: sha256(tavut), bytes: tavut.length };
}

/**
 * Eräkuitti: mikä raaka vastaa mitäkin valmista tiedostoa.
 * Salaisuuksia ei oteta argumentiksi eikä siis voida kirjata.
 */
export function kokoaRaakakuitti({
  putki, batchId, sourceCommit, resepti = {}, rivit = [], status = 'completed',
}) {
  if (!putki) throw new Error('kuitti vaatii putken nimen');
  if (!batchId) throw new Error('kuitti vaatii erätunnuksen');
  return {
    schemaVersion: 1,
    pipeline: putki,
    batchId,
    sourceCommit,
    generationStatus: status,
    recipe: resepti,
    items: rivit.map((rivi) => ({
      fileName: rivi.fileName ?? null,
      outputPath: rivi.outputPath ?? null,
      status: rivi.status ?? 'generated',
      reason: rivi.reason ?? null,
      rawArtifact: rivi.rawArtifact ?? null,
      finalArtifact: rivi.finalArtifact ?? null,
    })),
  };
}

/** Kirjoita kuitti levylle ja vie se ämpäriin erätunnuksen nimellä. */
export function vieKuitti(kuitti, kansio) {
  const tyokansio = mkdtempSync(join(tmpdir(), 'raakakuitti-'));
  try {
    const nimi = `${kuitti.batchId}.completed.json`;
    const polku = join(tyokansio, nimi);
    writeFileSync(polku, `${JSON.stringify(kuitti, null, 2)}\n`);
    const tavut = readFileSync(polku);
    return vieRaaka(tavut, {
      nimi, kansio: `${kansio.replace(/\/+$/, '')}/kuitit`, tyyppi: 'application/json',
    });
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }
}
