/*
 * LUKIJOIDEN EHDOTUKSET — Cloudflare Workerin kuori.
 *
 * Koko logiikka on kasittelija.js:ssä, jotta sen voi testata Nodessa
 * ilman wrangleria (tests/ehdotukset-worker.test.mjs). Tämä tiedosto
 * ei tee muuta kuin ojentaa pyynnön eteenpäin.
 *
 * Julkaisu: .github/workflows/ehdotukset-worker.yml (workflow_dispatch)
 * — asetustiedosto syntyy wrangler.toml.template-pohjasta ajon aikana,
 * eikä ämpärin nimeä tai tilitunnusta ole repossa.
 *
 * Sidokset ja salaisuudet:
 *   EHDOTUKSET        R2-ämpäri (YKSITYINEN — sisältää sähköposteja)
 *   EHDOTUS_AVAIN     salaisuus: lista-, kohde-, kommentti- ja
 *                     pro-omistajareittien avain
 *   EHDOTUS_ORIGINIT  muuttuja: sallitut originit pilkulla erotettuna
 *
 * Sama worker palvelee myös pro-sisällöntuottajia (worker/ehdotukset/
 * pro.js): tuottajien koodit, profiilit ja julkiset tekijäsivut.
 */

import { kasittele } from './kasittelija.js';

export default {
  async fetch(pyynto, env) {
    return kasittele(pyynto, env);
  },
};
