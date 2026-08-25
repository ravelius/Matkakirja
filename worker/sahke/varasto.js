/*
 * SÄHKEJÄRJESTELMÄ — varasto (D1).
 *
 * MIKSI D1 EIKÄ KV: talon tapa on ehdotusworkerin R2, mutta se on
 * blob-varasto kuville. Sähkeet ovat jotain aivan muuta: kahdeksan
 * pelaajaa kirjoittaa SAMAAN pieneen tilannekuvaan ja lukee sitä
 * sekunneittain. KV:llä (ja yhtä lailla yhteen JSON-olioon
 * kirjoittavalla R2:lla) kaksi yhtaikaista kirjoitusta ylikirjoittavat
 * toisensa — lähetetty sähke katoaisi — ja KV:n luku on lisäksi
 * eventually consistent: pollaus voi näyttää minuutin vanhaa tilaa.
 * D1:ssä rivi on rivi: INSERT ei ylikirjoita toista INSERTiä, luku on
 * heti ajan tasalla, ja siivous on yksi DELETE ... WHERE aika < ?
 * sen sijaan että jokainen retkikunta luettaisiin ja kirjoitettaisiin
 * takaisin.
 *
 * MIKSI OMANA MODUULINAAN: käsittelijä ei saa tietää SQL:stä mitään.
 * Näin koko logiikan voi ajaa Nodessa ilman wrangleria ja ilman D1:tä
 * (tests/sahke-worker.test.mjs antaa käsittelijälle muistivaraston,
 * joka toteuttaa täsmälleen tämän saman rajapinnan).
 *
 * RAJAPINTA (jokainen metodi on async):
 *   luoRetkikunta(koodi, nyt)            -> boolean (false = koodi varattu)
 *   haeRetkikunta(koodi)                 -> {koodi, luotu, nahty} | null
 *   koskeRetkikuntaan(koodi, nyt)        -> void   (elossa-leima)
 *   haeJasenet(koodi)                    -> jäsenrivit liittymisjärjestyksessä
 *   haeJasen(koodi, jasenId)             -> jäsenrivi | null
 *   lisaaJasen(rivi)                     -> void
 *   paivitaKirjoitusIkkuna(koodi, jasenId, ikkuna, laskuri, nyt) -> void
 *   lisaaSahke(rivi)                     -> void
 *   haeSahkeet(koodi, raja)              -> rivit uusin ensin
 *   haeApupyynto(koodi, apuId)           -> rivi | null
 *   lisaaApupyynto(rivi)                 -> void
 *   haeApupyynnot(koodi, raja)           -> rivit uusin ensin
 *   tallennaApuvastaus(rivi)             -> void  (korvaa saman jäsenen veikkauksen)
 *   haeApuvastaukset(koodi, raja)        -> rivit uusin ensin
 *   siivoa(sisaltoRaja, retkikuntaRaja)  -> void
 */

/** D1-rivit ovat snake_casea; peli puhuu camelCasea. Käännös tässä. */
function jasenOlio(rivi) {
  if (!rivi) return null;
  return {
    koodi: rivi.koodi,
    jasenId: rivi.jasen_id,
    nimimerkki: rivi.nimimerkki,
    avainTiiviste: rivi.avain_tiiviste,
    liittyi: rivi.liittyi,
    ikkuna: rivi.ikkuna ?? 0,
    laskuri: rivi.laskuri ?? 0,
  };
}

function sahkeOlio(rivi) {
  return {
    id: rivi.id,
    lahettaja: rivi.lahettaja,
    pohjaId: rivi.pohja_id,
    paikkaId: rivi.paikka_id,
    aika: rivi.aika,
  };
}

function apupyyntoOlio(rivi) {
  if (!rivi) return null;
  let vaihtoehdot = [];
  try {
    const jasennetty = JSON.parse(rivi.vaihtoehdot);
    if (Array.isArray(jasennetty)) vaihtoehdot = jasennetty;
  } catch {
    vaihtoehdot = [];
  }
  return {
    apuId: rivi.apu_id,
    kysyja: rivi.kysyja,
    kysymys: rivi.kysymys,
    vaihtoehdot,
    aika: rivi.aika,
  };
}

function apuvastausOlio(rivi) {
  return {
    apuId: rivi.apu_id,
    vastaaja: rivi.vastaaja,
    veikkaus: rivi.veikkaus,
    aika: rivi.aika,
  };
}

/**
 * Rakentaa varaston D1-sidoksen päälle.
 *
 * @param {object} db D1Database (env.SAHKE)
 * @returns {object} varasto, jonka rajapinta on kuvattu tiedoston alussa
 */
export function teeVarasto(db) {
  return {
    async luoRetkikunta(koodi, nyt) {
      // INSERT OR IGNORE tekee koodin varauksesta atomisen: kahden
      // yhtaikaisen luonnin ei tarvitse ensin katsoa, onko koodi vapaa.
      const tulos = await db
        .prepare('INSERT OR IGNORE INTO retkikunnat (koodi, luotu, nahty) VALUES (?, ?, ?)')
        .bind(koodi, nyt, nyt)
        .run();
      return (tulos?.meta?.changes ?? 0) > 0;
    },

    async haeRetkikunta(koodi) {
      const rivi = await db
        .prepare('SELECT koodi, luotu, nahty FROM retkikunnat WHERE koodi = ?')
        .bind(koodi)
        .first();
      return rivi ? { koodi: rivi.koodi, luotu: rivi.luotu, nahty: rivi.nahty } : null;
    },

    async koskeRetkikuntaan(koodi, nyt) {
      await db.prepare('UPDATE retkikunnat SET nahty = ? WHERE koodi = ?')
        .bind(nyt, koodi).run();
    },

    async haeJasenet(koodi) {
      const tulos = await db.prepare(
        'SELECT koodi, jasen_id, nimimerkki, avain_tiiviste, liittyi, ikkuna, laskuri '
        + 'FROM jasenet WHERE koodi = ? ORDER BY liittyi ASC, jasen_id ASC',
      ).bind(koodi).all();
      return (tulos?.results ?? []).map(jasenOlio);
    },

    async haeJasen(koodi, jasenId) {
      const rivi = await db.prepare(
        'SELECT koodi, jasen_id, nimimerkki, avain_tiiviste, liittyi, ikkuna, laskuri '
        + 'FROM jasenet WHERE koodi = ? AND jasen_id = ?',
      ).bind(koodi, jasenId).first();
      return jasenOlio(rivi);
    },

    async lisaaJasen(rivi) {
      await db.prepare(
        'INSERT INTO jasenet '
        + '(koodi, jasen_id, nimimerkki, avain_tiiviste, liittyi, nahty, ikkuna, laskuri) '
        + 'VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
      ).bind(rivi.koodi, rivi.jasenId, rivi.nimimerkki, rivi.avainTiiviste,
        rivi.liittyi, rivi.liittyi, rivi.liittyi).run();
    },

    async paivitaKirjoitusIkkuna(koodi, jasenId, ikkuna, laskuri, nyt) {
      await db.prepare(
        'UPDATE jasenet SET ikkuna = ?, laskuri = ?, nahty = ? WHERE koodi = ? AND jasen_id = ?',
      ).bind(ikkuna, laskuri, nyt, koodi, jasenId).run();
    },

    async lisaaSahke(rivi) {
      await db.prepare(
        'INSERT OR IGNORE INTO sahkeet (koodi, id, lahettaja, pohja_id, paikka_id, aika) '
        + 'VALUES (?, ?, ?, ?, ?, ?)',
      ).bind(rivi.koodi, rivi.id, rivi.lahettaja, rivi.pohjaId, rivi.paikkaId, rivi.aika).run();
    },

    async haeSahkeet(koodi, raja) {
      const tulos = await db.prepare(
        'SELECT id, lahettaja, pohja_id, paikka_id, aika FROM sahkeet '
        + 'WHERE koodi = ? ORDER BY aika DESC, id DESC LIMIT ?',
      ).bind(koodi, raja).all();
      return (tulos?.results ?? []).map(sahkeOlio);
    },

    async haeApupyynto(koodi, apuId) {
      const rivi = await db.prepare(
        'SELECT apu_id, kysyja, kysymys, vaihtoehdot, aika FROM apupyynnot '
        + 'WHERE koodi = ? AND apu_id = ?',
      ).bind(koodi, apuId).first();
      return apupyyntoOlio(rivi);
    },

    async lisaaApupyynto(rivi) {
      await db.prepare(
        'INSERT OR IGNORE INTO apupyynnot '
        + '(koodi, apu_id, kysyja, kysymys, vaihtoehdot, aika) VALUES (?, ?, ?, ?, ?, ?)',
      ).bind(rivi.koodi, rivi.apuId, rivi.kysyja, rivi.kysymys,
        JSON.stringify(rivi.vaihtoehdot), rivi.aika).run();
    },

    async haeApupyynnot(koodi, raja) {
      const tulos = await db.prepare(
        'SELECT apu_id, kysyja, kysymys, vaihtoehdot, aika FROM apupyynnot '
        + 'WHERE koodi = ? ORDER BY aika DESC, apu_id DESC LIMIT ?',
      ).bind(koodi, raja).all();
      return (tulos?.results ?? []).map(apupyyntoOlio);
    },

    async tallennaApuvastaus(rivi) {
      // REPLACE: jäsen saa vaihtaa veikkaustaan, mutta rivejä ei kerry
      // enempää kuin yksi per jäsen per pyyntö.
      await db.prepare(
        'INSERT OR REPLACE INTO apuvastaukset (koodi, apu_id, vastaaja, veikkaus, aika) '
        + 'VALUES (?, ?, ?, ?, ?)',
      ).bind(rivi.koodi, rivi.apuId, rivi.vastaaja, rivi.veikkaus, rivi.aika).run();
    },

    async haeApuvastaukset(koodi, raja) {
      const tulos = await db.prepare(
        'SELECT apu_id, vastaaja, veikkaus, aika FROM apuvastaukset '
        + 'WHERE koodi = ? ORDER BY aika DESC, apu_id DESC LIMIT ?',
      ).bind(koodi, raja).all();
      return (tulos?.results ?? []).map(apuvastausOlio);
    },

    async siivoa(sisaltoRaja, retkikuntaRaja) {
      /*
       * Järjestys on tärkeä: jäsenet ennen retkikuntia, jotta
       * keskeytynyt siivous ei jätä jäseniä ilman retkikuntaa.
       */
      await db.batch([
        db.prepare('DELETE FROM sahkeet WHERE aika < ?').bind(sisaltoRaja),
        db.prepare('DELETE FROM apuvastaukset WHERE aika < ?').bind(sisaltoRaja),
        db.prepare('DELETE FROM apupyynnot WHERE aika < ?').bind(sisaltoRaja),
        db.prepare(
          'DELETE FROM jasenet WHERE koodi IN '
          + '(SELECT koodi FROM retkikunnat WHERE nahty < ?)',
        ).bind(retkikuntaRaja),
        db.prepare('DELETE FROM retkikunnat WHERE nahty < ?').bind(retkikuntaRaja),
      ]);
    },
  };
}
