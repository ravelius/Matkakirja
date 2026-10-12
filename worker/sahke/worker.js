/*
 * SÄHKEJÄRJESTELMÄ — Cloudflare Workerin kuori.
 *
 * Koko logiikka on kasittelija.js:ssä, jotta sen voi testata Nodessa
 * ilman wrangleria ja ilman D1:tä (tests/sahke-worker.test.mjs). Tämä
 * tiedosto ei tee muuta kuin ojentaa pyynnön eteenpäin ja herättää
 * siivouksen cron-liipaisimesta.
 *
 * Julkaisu: .github/workflows/sahke-worker.yml (workflow_dispatch)
 * — asetustiedosto syntyy wrangler.toml.template-pohjasta ajon aikana,
 * eikä tietokannan tunnistetta tai tilitunnusta ole repossa.
 *
 * Sidokset ja muuttujat:
 *   SAHKE           D1-tietokanta (rakenne: worker/sahke/skeema.sql)
 *   SAHKE_ORIGINIT  muuttuja: sallitut originit pilkulla erotettuna
 *   PALLOT          Durable Object (pallohuone.js): retkikunnan kaupunkihuoneet, pallot näkyviin (juna 185)
 *   SAHKE_NATIIVIT  muuttuja (vapaaehtoinen): natiivin iOS-pelin sallitut
 *                   bundle id:t pilkulla erotettuna (otsake
 *                   x-matkakirja-natiivi + User-Agent). Puuttuva tai tyhjä
 *                   = oletus app.matkakirja.proto3d, app.matkakirja.peli.
 *
 * SALAISUUKSIA EI OLE. Jokainen jäsen saa oman avaimensa liittyessään,
 * eikä workerilla ole yhtä pääavainta, jonka vuoto avaisi kaiken.
 */

import { kasittele, siivoaYmparisto } from './kasittelija.js';

// Durable Object -luokka (wrangler.toml: [[durable_objects.bindings]] PALLOT, SQLite-luokka Free-tasolla).
export { PalloHuone } from './pallohuone.js';

export default {
  async fetch(pyynto, env) {
    return kasittele(pyynto, env);
  },

  /*
   * Cron-liipaisin (wrangler.toml: [triggers]). Vanhentuneet sähkeet
   * ja apupyynnöt katoavat kerran vuorokaudessa, vaikka kukaan ei
   * perustaisi uutta retkikuntaa.
   */
  async scheduled(tapahtuma, env, konteksti) {
    konteksti.waitUntil(siivoaYmparisto(env));
  },
};
