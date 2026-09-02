/*
 * MITTA: SYVÄN ZOOMIN ELÄVÄ MERKKIKERROS (bugiraportti 2.9.2026).
 *
 * Omistaja, sanatarkasti: *"symbolit heittelee muodoiltaa ja tekstejä
 * puuttuu"* (Bulgaria, mittajana 50 km). Tämä työkalu toistaa juuri sen
 * näkymän ja lukee DOMista ne luvut, joita silmä ei osaa lukea:
 * jokaisen elävän symbolin RUUTUKOON, symbolin ja sen nimen välimatkan
 * sekä nimettömien symbolien määrän.
 *
 * EI OLE SAVUKE VAAN MITTA: tämä ei väitä mitään eikä kaadu, se
 * tulostaa luvut. Vartio (savuke-syvazoomi.mjs) käyttää samaa
 * mittausta ja asettaa sille rajat.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-syvazoomi.mjs [askelia] [kuva.png]
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

/*
 * LAATTALUETTELO, JOSSA NIMIÖITÄ EI OLE POLTETTU — sama syy ja samat
 * luvut kuin savuke-fokuskohteet.mjs:ssä: kontin selain ei pääse
 * ämpäriin, ja ilman tätä vastausta luettelo jää tyhjäksi, oletus on
 * "vanhat laatat" ja js/karttanimet.js vaikenee kokonaan. Silloin
 * mittaus EI näkisi juuri sitä kerrosta, jonka symboleista bugiraportti
 * puhuu (Balkanvuorten jättikolmio on maastonimikerroksen merkki).
 */
const PYRAMIDILUETTELO = JSON.stringify({
  versio: '2026-08-31',
  lauta: 'maailmankartta',
  laatta: 512,
  muoto: 'webp',
  nimiot: false,
  arkki: { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 },
  tasot: [{
    z: 0,
    leveys: 675,
    korkeus: 411,
    pikseliaPerYksikko: 0.05625,
    sarakkeita: 2,
    riveja: 1,
    laatasto: null,
  }],
});

/**
 * Avaa pelin annetussa kaupungissa ja zoomaa `askelia` porrasta sisään.
 * Palauttaa mittaustuloksen ja (jos `kuva` annettu) kuvakaappauksen.
 */
export async function mittaaSyvaZoomi({
  kaupunki = 'sofia', askelia = 8, kuva = null, ruutu = { width: 834, height: 1112 },
  dpr = 2, panoroiNappulaan = false,
} = {}) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(kaupunki, 'topaz');
  peli.revealed.delete(kaupunki);
  peli.phase = 'action';
  const tallenne = JSON.stringify(peli.toJSON());

  const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await selain.newContext({
    viewport: ruutu, deviceScaleFactor: dpr, reducedMotion: 'reduce',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route('**/julisteet/pyramidi/pyramidi.json', (route) => route.fulfill({
    status: 200, contentType: 'application/json', body: PYRAMIDILUETTELO,
  }));
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(3000);
  /* Kuplat ja päiväkirja pois kartan päältä, jotta kaappaus näyttää kartan. */
  for (let i = 0; i < 6; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.keyboard.press('Escape');
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(250);
  }
  for (let i = 0; i < askelia; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(700);
  }
  /*
   * NAPPULAN LUO (valinnainen): zoomi tarttuu näkymän keskipisteeseen,
   * joka on maan lehden keskus — pelaajan kaupunki ja sen tihein
   * nostorypäs jää reunan taakse. Omistajan kaappauksessa nappula on
   * kuvassa, joten mittaus panoroi sinne raahaamalla karttaa kuten
   * sormi tekisi.
   */
  /*
   * KOHDE ON PELINAPPULA, EI AARREMERKKIEN KERROS (korjattu 2.9.2026).
   * Aiempi versio tarttui `.tokens`-kerrokseen, jonka laatikko on tyhjä
   * tai aivan muualla — mittaus jäi siksi sellaiseen näkymään, jossa
   * pelaajan kaupunkia ei näy lainkaan, ja juuri se näkymä on koko
   * bugiraportin aihe.
   *
   * RAAHAUS TOISTUU, KOSKA MATKA ON PIDEMPI KUIN RUUTU. Syvässä
   * zoomissa nappula voi olla satojen pikselien päässä näkymän
   * ulkopuolella, eikä sormi voi tarttua sellaiseen kohtaan: jokainen
   * veto lähtee siksi ruudun keskeltä ja siirtää enintään kolmasosan
   * ruudusta kerrallaan, kunnes nappula on keskellä.
   */
  if (panoroiNappulaan) {
    const kx = ruutu.width / 2;
    const ky = ruutu.height / 2;
    const nappulanPaikka = () => sivu.evaluate(() => {
      const p = document.querySelector('.pawns .pawn') ?? document.querySelector('.tokens');
      if (!p) return null;
      const r = p.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    for (let veto = 0; veto < 8; veto += 1) {
      // eslint-disable-next-line no-await-in-loop
      const kohde = await nappulanPaikka();
      if (!kohde) break;
      const dx = kx - kohde.x;
      const dy = ky - kohde.y;
      if (Math.hypot(dx, dy) < 8) break;
      /* Veto lähtee keskeltä ja on enintään kolmasosa ruudusta. */
      const raja = Math.min(1, (Math.min(ruutu.width, ruutu.height) / 3) / Math.hypot(dx, dy));
      const vx = dx * raja;
      const vy = dy * raja;
      // eslint-disable-next-line no-await-in-loop
      await sivu.mouse.move(kx - vx / 2, ky - vy / 2);
      // eslint-disable-next-line no-await-in-loop
      await sivu.mouse.down();
      for (let i = 1; i <= 12; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await sivu.mouse.move(kx - vx / 2 + (vx * i) / 12, ky - vy / 2 + (vy * i) / 12);
      }
      // eslint-disable-next-line no-await-in-loop
      await sivu.mouse.up();
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForTimeout(1200);
    }
  }
  await sivu.waitForTimeout(2500);

  const mitat = await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    const nak = ui.nakyvaAlue();
    const rk = (e) => {
      const r = e.getBoundingClientRect();
      return {
        x: +(r.x + r.width / 2).toFixed(1),
        y: +(r.y + r.height / 2).toFixed(1),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
      };
    };
    /*
     * RUUDULLA = RUUDULLA. Marginaalia ei anneta: nimikerros tekee
     * solmun vain näkymään (js/karttanimet.js "NÄKYMÄRAJAUS ON KOKO
     * SÄÄSTÖ"), joten reunan ulkopuolinen merkki näyttäisi nimettömältä
     * ilman että mikään on vialla.
     */
    const nakyy = (r) => r.w > 0 && r.h > 0 && r.x > 0 && r.x < window.innerWidth
      && r.y > 0 && r.y < window.innerHeight;

    /*
     * KIRJASTOYKSIKÖN RUUTUPIKSELI — YKSI LUKU, JOKA VERTAA PERHEITÄ.
     *
     * Merkkiperheet piirretään eri koordinaatistoissa: nosto ja
     * eläintäky kirjaston yksiköissä (js/fokusnosto-symbolit.js,
     * NOSTOSYM_MINI_R = 6,5 ja NOSTOSYM_NIMIO_KOKO = 11), maastomerkki
     * laudan yksiköissä ja paikannimi suoraan CSS-pikseleinä. Rajaava
     * laatikko ei kelpaa vertailuun, koska merkki ja sen nimiö ovat
     * SAMASSA rasterissa (eläintäky) tai eri kerroksissa (nosto) —
     * laatikko kertoisi kerran symbolin ja kerran symbolin ja nimen
     * yhdessä.
     *
     * `getScreenCTM` kertoo, montako CSS-pikseliä on yksi elementin oma
     * yksikkö juuri nyt. Siitä saa kummankin perheen kaksi lukua samassa
     * mitassa: symbolin halkaisija 2 x 6,5 x a ja nimiön kirjasinkoko
     * 11 x a. Juuri niitä omistaja vertaa silmällään.
     */
    const KIRJASTON_SADE = 6.5;
    const KIRJASTON_NIMIO = 11;
    const ctmSkaala = (e) => {
      const m = e?.getScreenCTM?.();
      if (!m) return null;
      return +Math.hypot(m.a, m.b).toFixed(4);
    };

    /* 1. Maastosymbolit ja paikannimet (js/karttanimet.js). */
    const pisteet = [...document.querySelectorAll('.karttanimet .karttamerkki-piste')]
      .map(rk).filter(nakyy);
    const nimet = [...document.querySelectorAll('.karttanimet text')].map((e) => ({
      teksti: e.textContent,
      laji: (e.getAttribute('class') ?? '').replace('karttanimi karttanimi-', ''),
      /*
       * KIRJASINKOKO RUUDULLA, EI LAATIKON KORKEUS. Laatikko kertoo
       * ladotun tekstin ylä- ja alapidennykset (»Taÿgetos» on korkeampi
       * kuin »Mykene»), joten kahden perheen vertailu laatikoilla
       * kertoisi kirjaimista eikä mitoituksesta.
       *
       * KERTOLASKU CTM:LLÄ ON PAKKO. Nimikerros elää LAUDAN yksiköissä
       * ja ladonta jakaa kirjasinkoon mittakaavalla (js/karttanimet.js
       * `laudalle`), joten laskettu `font-size` on lautayksiköitä eikä
       * pikseleitä: mitattuna 2,04 silloin kun ruudulla on 8,5. Vasta
       * kerroksen oma ruutumuunnos palauttaa sen CSS-pikseleiksi — ja
       * juuri se luku on vertailukelpoinen kirjastoyksikön kanssa.
       */
      koko: +(parseFloat(getComputedStyle(e).fontSize || '0')
        * (ctmSkaala(e) ?? 1)).toFixed(2),
      ...rk(e),
    })).filter(nakyy);
    /*
     * ONKO KOLMIOLLA NIMI? Nimi ladotaan merkin alle (11 CSS-px), joten
     * lähin nimi lasketaan ruudulta eikä tietueesta: juuri sen pelaaja
     * näkee. Raja on avara (60 px), koska mittaus etsii NIMETÖNTÄ
     * symbolia eikä hio ladonnan tarkkuutta.
     */
    const vuoret = [...document.querySelectorAll('.karttanimet .karttamerkki-vuori')]
      .map(rk).filter(nakyy).map((v) => {
        let lahin = null;
        let paras = Infinity;
        for (const n of nimet) {
          const d = Math.hypot(n.x - v.x, n.y - v.y);
          if (d < paras) { paras = d; lahin = n; }
        }
        return { ...v, nimi: paras <= 60 ? lahin.teksti : null, nimenEtaisyys: +paras.toFixed(1) };
      });

    /* 2. Karttanostot (js/fokuskohteet.js) — symboli ja sen nimiö. */
    const nostot = [];
    for (const r of ui.fokuskohdeRyhmat ?? []) {
      const g = r.g;
      if (!g?.isConnected) continue;
      /*
       * SYMBOLI ON GLYYFIRYHMÄ, EI KOKO ANKKURIRYHMÄ: ankkuriryhmässä
       * on myös näkymätön osumaympyrä (44 px) ja nimiö, joten sen
       * laatikko kertoisi osuma-alan eikä musteen koon.
       */
      const sym = g.querySelector('.fokuskohde-glyyfi') ?? g.querySelector('.fokuskohde');
      /*
       * NIMIÖ EI OLE RYHMÄN SISÄLLÄ vaan nimikerroksessa
       * (js/karttanimet.js luovutaKohdeNimiot -> data-kohde). Elävä
       * nosto ja sen nimi ovat eri kerroksissa, ja juuri niiden VÄLI
       * on se, minkä omistaja luki ruudulta.
       */
      const teksti = document.querySelector(`.karttanimet [data-kohde="${CSS.escape(r.id)}"]`)
        ?? g.querySelector('.nostosym-nimio, text');
      const gr = rk(g);
      if (!nakyy(gr) || !sym) continue;
      const a = ctmSkaala(sym);
      nostot.push({
        id: r.id,
        nimi: r.nimi ?? '',
        nimioNakyy: Boolean(r.nimi) && r.nimioNakyy !== false,
        symboli: rk(sym),
        nimio: teksti ? rk(teksti) : null,
        ryhma: gr,
        /* Kirjastoyksikön ruutupikseli ja siitä johdetut kaksi mittaa. */
        a,
        symboliPx: a ? +(2 * KIRJASTON_SADE * a).toFixed(2) : null,
        /*
         * NIMIÖ ON KAHDESSA MAHDOLLISESSA PAIKASSA: luovutettuna
         * nimikerrokseen (paperivakio, js/karttanimet.js KOKO.kohde) tai
         * merkin omassa rasterissa (kirjaston yksikkö). Mitta luetaan
         * siitä, kumpi on käytössä — muuten vertailu vertaisi kahta eri
         * asiaa eri näkymissä.
         */
        nimiPx: teksti
          ? +(parseFloat(getComputedStyle(teksti).fontSize || '0')
            * (ctmSkaala(teksti) ?? 1)).toFixed(2)
          : (a ? +(KIRJASTON_NIMIO * a).toFixed(2) : null),
      });
    }

    /*
     * 2b. ELÄINTÄYT (js/elaintaky.js) — oma kerros, sama kirjasto.
     *
     * Merkki ja nimiö tulevat samasta piirtäjästä kuin nostolla
     * (piirraNostosymKartalle), joten sama kaava kertoo molemmat mitat.
     * Nimiötä EI luovuteta nimikerrokseen, joten se on aina rasterissa.
     */
    const elaimet = [];
    for (const r of ui.elaintakyRyhmat ?? []) {
      const g = r.g;
      if (!g?.isConnected) continue;
      const sym = g.querySelector('.elaintaky-glyyfi');
      if (!sym) continue;
      const gr = rk(g);
      const a = ctmSkaala(sym);
      const kuva = sym.querySelector('.nostosym-rasteri');
      /*
       * NÄKYMÄRAJAUSTA EI TEHDÄ TÄSSÄ PERHEESSÄ. Eläintäkyjä on yksi per
       * maa (js/packs/elaintakyt.js), ja se sattuu Kreikassa olemaan
       * Peloponnesoksella — omistajan toisessa kaappauksessa kuvassa,
       * ensimmäisessä ei. Perheen KOKO ei riipu paikasta (koko kerros
       * saa saman mittakaavan), joten reunan taakse jäänyt merkki on
       * yhtä pätevä mitta kuin keskellä oleva, ja ilman tätä vartija
       * olisi sokea juuri sille perheelle, josta bugiraportti puhuu.
       */
      elaimet.push({
        nimi: kuva?.dataset?.nimio ?? g.getAttribute('aria-label') ?? '',
        nakyy: nakyy(gr),
        laatikko: gr,
        a,
        symboliPx: a ? +(2 * KIRJASTON_SADE * a).toFixed(2) : null,
        nimiPx: a ? +(KIRJASTON_NIMIO * a).toFixed(2) : null,
      });
    }

    /* 3. Siirtoviivat (js/fokusniput.js). */
    const viivat = [...document.querySelectorAll('.nippuviivat line')].map((e) => {
      const l = e.getBoundingClientRect();
      const sk = nak.skaala;
      return {
        leveysPx: +(Number(e.getAttribute('stroke-width')) * sk).toFixed(2),
        katkoPx: (e.getAttribute('stroke-dasharray') ?? '').split(' ')
          .map((n) => +(Number(n) * sk).toFixed(2)).join(' / '),
        pituusPx: +Math.hypot(l.width, l.height).toFixed(1),
      };
    });

    /*
     * 4. PELINAPPULA, OMAN KAUPUNGIN LAATTA JA NOPANHEITON KOHTEET —
     *    PEITTÄVÄTKÖ NE NIMIÄ?
     *
     * Omistajan kaappaus Sofiasta 2.9.2026 (mittajana 50 km): *"SOFIA"*
     * katosi nappulan ja laatan taakse. Nimikerroksen ladonta ei
     * tiennyt pelinappulasta mitään, joten se latoi kaupungin nimen
     * 5–7 pikselin päähän pisteestä — suoraan sen merkkipinon alle,
     * joka syvässä zoomissa on ruudulla 10–20 pikseliä korkea.
     *
     * MITTA ON LAATIKKOJEN LEIKKAUS, EI SILMÄMÄÄRÄINEN ETÄISYYS. Nimen
     * ja nappulan väli saa olla pieni; vika on vasta siinä, että
     * laatikot menevät päällekkäin — juuri sen pelaaja lukee ruudulta
     * peittona.
     *
     * KERROKSET LUETAAN OMILLA VALITSIMILLAAN eikä yhtenä ryhmänä:
     * nappula on `.pawns .pawn` (js/ui.js drawPawns), oman kaupungin
     * laatta `.cities [data-kaupunki=…]` (paivitaFokusLaatta) ja
     * nopanheiton kohteet `.targets .target-piste/.target-halo`
     * (paivitaFokusKohdeMitat). NÄKYMÄTTÖMÄT OSUMAYMPYRÄT EIVÄT KUULU
     * JOUKKOON (.target-hit, fokuslaatan osuma-ala): ne eivät ole
     * mustetta eivätkä siis voi peittää mitään.
     */
    const laatikko = (e) => {
      const r = e.getBoundingClientRect();
      return {
        x0: +r.x.toFixed(1),
        y0: +r.y.toFixed(1),
        x1: +(r.x + r.width).toFixed(1),
        y1: +(r.y + r.height).toFixed(1),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
      };
    };
    const omaId = ui.game?.cityOf?.()?.id ?? null;
    const nappulat = [...document.querySelectorAll('.pawns .pawn')]
      .map(laatikko).filter((r) => r.w > 0 && r.h > 0);
    const laatat = omaId
      ? [...document.querySelectorAll(`.cities [data-kaupunki="${CSS.escape(omaId)}"]`)]
        .filter((e) => !e.classList.contains('city-label'))
        .map(laatikko)
        .filter((r) => r.w > 0 && r.h > 0)
      : [];
    const kohdemerkit = [...document.querySelectorAll('.targets .target-piste, .targets .target-halo')]
      .map(laatikko).filter((r) => r.w > 0 && r.h > 0);
    /*
     * NIMET SAMASSA MITASSA. Jokainen nimikerroksen teksti on ehdolla
     * peitettäväksi — omistajan vika koski kaupungin nimeä, mutta
     * varaus koskee koko ladontaa, myös kohdenimiöitä ja maastonimiä.
     */
    const nimilaatikot = [...document.querySelectorAll('.karttanimet text')]
      .map((e) => ({ teksti: e.textContent, ...laatikko(e) }))
      .filter((r) => r.w > 0 && r.h > 0);
    const leikkaus = (a, b) => {
      const w = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
      const h = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
      return w > 0 && h > 0 ? { w: +w.toFixed(1), h: +h.toFixed(1) } : null;
    };
    const peitot = [];
    for (const [laji, joukko] of [['nappula', nappulat], ['laatta', laatat], ['kohde', kohdemerkit]]) {
      for (const merkki of joukko) {
        for (const nimi of nimilaatikot) {
          const l = leikkaus(merkki, nimi);
          if (l) peitot.push({ laji, nimi: nimi.teksti, ...l });
        }
      }
    }
    const omaNimi = ui.game?.cityOf?.()?.name ?? null;
    return {
      skaala: +nak.skaala.toFixed(3),
      dpr: window.devicePixelRatio,
      /*
       * MITTAJANA ON OMISTAJAN OMA MITTATIKKU. Bugiraportit tulevat
       * muodossa *"mittajana 25 km"*, joten mittauksen on kerrottava
       * sama luku — muuten kaappausta ja lukuja ei voi asettaa
       * vierekkäin (js/fokusmitat.js laskeMittajana).
       */
      mittajana: document.querySelector('.fokus-jana-maksimi')?.textContent ?? null,
      vuoret,
      pisteet,
      nimet,
      nostot,
      elaimet,
      viivat,
      nappula: nappulat[0] ?? null,
      nappulat,
      laatat,
      kohdemerkit,
      peitot,
      omaNimi,
      omanNimiKartalla: Boolean(omaNimi && nimilaatikot.some((n) => n.teksti === omaNimi)),
    };
  });
  if (kuva) await sivu.screenshot({ path: kuva });
  await sivu.close();
  await ctx.close();
  await selain.close();
  return mitat;
}

/*
 * ====== MERKKIPERHEET SAMAAN TAULUKKOON (bugiraportti 2.9.2026) =====
 *
 * OMISTAJA, sanatarkasti: *"Osa nostoista vielä polttamatta ja väärän
 * kokoisia"* (iPhone, Kreikka, mittajana 25 km). Kaappauksessa samassa
 * näkymässä oli neljä eri kokojärjestelmää: eläintäky jättimäisenä,
 * karttanostot pieninä, maastomerkit siltä väliltä ja poltetut nostot
 * omanaan.
 *
 * TAULUKKO ON VERTAILUN KOKO PIHVI. Yksittäisen merkin koko ei kerro
 * mitään — kartta on oikein silloin, kun KAIKKI perheet ovat samassa
 * mitassa samassa näkymässä. Siksi mitta kokoaa jokaisesta perheestä
 * kaksi lukua (symbolin halkaisija ja nimen kirjasinkoko ruudulla) ja
 * laskee niiden hajonnan; vartija (savuke-syvazoomi.mjs) asettaa
 * hajonnalle rajan.
 *
 * NIMIPERHEIDEN PORRAS ON HYVÄKSYTTY LINJAUS, EI HAJONTAA. Omistaja
 * 1.9.2026: *"kaupunkien nimet pitäisi olla isommalla (suurenna) kuin
 * karttanostojen nimet joita voi pienentää"* — js/karttanimet.js KOKO
 * on se porras (isoKaupunki 14, kaupunki 12,5, vuori 11, kohde 8,5).
 * Kaupunkinimi on siksi taulukossa mukana LUKUNA mutta ei
 * hajontavaatimuksessa: se KUULUU olla isompi.
 */
const KIRJASTON_SUHDE = (2 * 6.5) / 11;

/** Mediaani — yksittäinen poikkeava merkki ei saa siirtää perheen lukua. */
function mediaani(luvut) {
  const l = luvut.filter((n) => Number.isFinite(n) && n > 0).sort((a, b) => a - b);
  if (!l.length) return null;
  return +l[(l.length - 1) >> 1].toFixed(2);
}

/**
 * Perheittäinen mittataulukko yhdestä näkymästä.
 *
 * @returns {object} perheen tunnus -> { symboliPx, nimiPx, suhde, kpl }
 *   missä `suhde` = symbolin halkaisija / nimen kirjasinkoko. Kirjaston
 *   oma suhde on 2 x 6,5 / 11 = 1,18 (js/fokusnosto-symbolit.js
 *   NOSTOSYM_MINI_R ja NOSTOSYM_NIMIO_KOKO) — se on normi, koska juuri
 *   sillä suhteella nosto poltetaan laattaan.
 */
export function perheet(m) {
  const nimenKoko = (lajit) => mediaani(
    m.nimet.filter((n) => lajit.includes(n.laji)).map((n) => n.koko),
  );
  const rivi = (symboliPx, nimiPx, kpl) => (kpl
    ? {
      symboliPx,
      nimiPx,
      suhde: symboliPx > 0 && nimiPx > 0 ? +(symboliPx / nimiPx).toFixed(2) : null,
      kpl,
    }
    : null);
  const taulu = {
    nosto: rivi(
      mediaani(m.nostot.map((n) => n.symboliPx)),
      mediaani(m.nostot.map((n) => n.nimiPx)),
      m.nostot.length,
    ),
    elain: rivi(
      mediaani((m.elaimet ?? []).map((e) => e.symboliPx)),
      mediaani((m.elaimet ?? []).map((e) => e.nimiPx)),
      (m.elaimet ?? []).length,
    ),
    /*
     * MAASTOMERKKI ON KOLMIO, JA SEN LEVEYS ON SEN HALKAISIJA
     * (js/karttanimet.js MERKKI.vuori). Nimi on maaston oma nimi
     * (vuori/jarvi), ei kohteen — juuri ne kaksi ovat toistensa vieressä
     * kartalla.
     */
    maasto: rivi(
      mediaani(m.vuoret.map((v) => v.w)),
      nimenKoko(['vuori', 'jarvi']),
      m.vuoret.length,
    ),
    kaupunki: rivi(
      mediaani(m.pisteet.map((p) => p.w)),
      nimenKoko(['kaupunki', 'isoKaupunki']),
      m.pisteet.length,
    ),
  };
  for (const avain of Object.keys(taulu)) if (!taulu[avain]) delete taulu[avain];
  return taulu;
}

/**
 * Perheiden hajonta: suurin jaettuna pienimmällä.
 *
 * `kaupunki` on ulkona nimien hajonnasta (ks. yllä, hyväksytty porras)
 * mutta mukana symbolien hajonnassa vasta, jos sillä on pistemerkki —
 * piste ei ole piktogrammi vaan paikan merkki, joten se raportoidaan
 * lukuna eikä vaatimuksena.
 */
export function perheHajonta(taulu, avaimet) {
  const arvot = (kentta) => avaimet
    .map((a) => taulu[a]?.[kentta])
    .filter((n) => Number.isFinite(n) && n > 0);
  const suhde = (lista) => (lista.length > 1
    ? +(Math.max(...lista) / Math.min(...lista)).toFixed(2) : 1);
  return {
    perheita: avaimet.filter((a) => taulu[a]).length,
    symboli: suhde(arvot('symboliPx')),
    nimi: suhde(arvot('nimiPx')),
    /* Kuinka kaukana perheen oma suhde on kirjaston normista (1,18). */
    suhteenPoikkeama: +Math.max(
      1,
      ...avaimet.map((a) => {
        const s = taulu[a]?.suhde;
        return s > 0 ? Math.max(s / KIRJASTON_SUHDE, KIRJASTON_SUHDE / s) : 1;
      }),
    ).toFixed(2),
  };
}

/**
 * POLTETUN NOSTON RUUTUKOKO — NORMI, JOTA VASTEN MUUT MITATAAN.
 *
 * Poltettua nostoa ei voi mitata DOMista: se on laatan kuvassa, eikä
 * kontin selain pääse laattaämpäriin. Koko on silti laskettavissa
 * täsmälleen, koska se syntyy samasta kaavasta kuin elävä merkki
 * (js/nostoladonta.js nostoladontaKattoPorras): laatta poltetaan
 * olettaen dpr 2, eli nimiö on tason omissa pikseleissä
 * 2 x NOSTOLADONTA_NIMIO_KATTO, ja ruudulla se kerrotaan sillä
 * suhteella, jolla laatta venytetään näkymään.
 *
 * @param {number} skaala CSS-pikseliä lautayksikköä kohti näkymässä
 * @param {number} tasonTiheys laattatason pikseliä lautayksikköä kohti
 *   (syvin taso z7 = 7,2; js/laattapyramidi.js)
 * @param {number} katto NOSTOLADONTA_NIMIO_KATTO (8,5)
 */
export function poltetunNostonMitat(skaala, tasonTiheys = 7.2, katto = 8.5) {
  if (!(skaala > 0) || !(tasonTiheys > 0)) return null;
  const nimiPx = +((2 * katto * skaala) / tasonTiheys).toFixed(2);
  return {
    nimiPx,
    symboliPx: +(nimiPx * KIRJASTON_SUHDE).toFixed(2),
    /* 1 = laatta on 1:1; yli 1 = laatta venyy z7:n yli. */
    venytys: +((2 * skaala) / tasonTiheys).toFixed(2),
  };
}

/** Tiivistelmä: mitä bugiraportti kysyy. */
export function tiivista(m) {
  const koot = (lista) => lista.map((r) => Math.max(r.w, r.h));
  const vuorenKoot = koot(m.vuoret);
  const nostonKoot = koot(m.nostot.map((n) => n.symboli));
  const hajonta = (a) => (a.length ? Math.max(...a) / Math.max(0.01, Math.min(...a)) : 0);
  /* Nimetön nosto: symboli kartalla, nimiö ei. */
  const nimettomatNostot = m.nostot.filter((n) => n.nimi && !n.nimio);
  /*
   * RAKO: symbolin reunasta nimiölaatikon reunaan. Keskipisteiden väli
   * kertoisi enimmäkseen nimen pituuden; rako kertoo sen, mitä silmä
   * lukee — onko nimi merkkinsä vieressä vai tyhjän paperin takana.
   */
  const raot = m.nostot.filter((n) => n.nimio).map((n) => {
    const dx = Math.max(0, Math.abs(n.nimio.x - n.symboli.x) - (n.nimio.w + n.symboli.w) / 2);
    const dy = Math.max(0, Math.abs(n.nimio.y - n.symboli.y) - (n.nimio.h + n.symboli.h) / 2);
    return +Math.hypot(dx, dy).toFixed(1);
  });
  const taulu = perheet(m);
  return {
    skaala: m.skaala,
    mittajana: m.mittajana ?? null,
    /* Kaikkien merkkiperheiden mitat samassa näkymässä (ks. perheet). */
    perheet: taulu,
    perheHajonta: perheHajonta(taulu, ['nosto', 'elain', 'maasto']),
    poltettuNosto: poltetunNostonMitat(m.skaala),
    vuorisymboleja: m.vuoret.length,
    nimettomiaVuoria: m.vuoret.filter((v) => !v.nimi).length,
    vuorenKokoMin: vuorenKoot.length ? +Math.min(...vuorenKoot).toFixed(1) : null,
    vuorenKokoMax: vuorenKoot.length ? +Math.max(...vuorenKoot).toFixed(1) : null,
    nostosymboleja: m.nostot.length,
    nostonKokoMin: nostonKoot.length ? +Math.min(...nostonKoot).toFixed(1) : null,
    nostonKokoMax: nostonKoot.length ? +Math.max(...nostonKoot).toFixed(1) : null,
    /* KOKOHAJONTA: suurin symboli jaettuna pienimmällä samassa näkymässä. */
    vuoriVsNosto: nostonKoot.length && vuorenKoot.length
      ? +(Math.max(...vuorenKoot) / Math.max(...nostonKoot)).toFixed(2) : null,
    nostonSisainenHajonta: +hajonta(nostonKoot).toFixed(2),
    nimettomiaNostoja: nimettomatNostot.length,
    nimettomatNostot: nimettomatNostot.map((n) => n.nimi),
    nimionRakoMax: raot.length ? Math.max(...raot) : null,
    viivanLeveysPx: m.viivat.length ? Math.max(...m.viivat.map((v) => v.leveysPx)) : null,
    viivanKatko: m.viivat[0]?.katkoPx ?? null,
    /*
     * PEITOT: montako nimeä jää pelinappulan, oman kaupungin laatan tai
     * nopanheiton kohdemerkin alle, ja kuinka monta neliöpikseliä pahin
     * niistä syö. Nolla on ainoa hyväksyttävä luku — nimi merkin alla
     * ei ole nimi (Raamattu: *"kartalla ei ole merkkiä ilman nimeä"*
     * toisin päin luettuna).
     */
    nimipeittoja: m.peitot?.length ?? 0,
    nimipeitot: (m.peitot ?? []).map((p) => `${p.laji}/${p.nimi} ${p.w}x${p.h}`),
    pahinPeittoPx2: (m.peitot ?? []).reduce((s, p) => Math.max(s, p.w * p.h), 0),
    nappuloita: m.nappulat?.length ?? 0,
    omaNimi: m.omaNimi ?? null,
    omanNimiKartalla: m.omanNimiKartalla ?? null,
    nimia: m.nimet.length,
    nimet: m.nimet.map((n) => n.teksti),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const askelia = Number(process.argv[2] ?? 8);
  const kuva = process.argv[3] ?? null;
  const panoroiNappulaan = process.argv[4] === 'nappulaan';
  const m = await mittaaSyvaZoomi({ askelia, kuva, panoroiNappulaan });
  console.log(JSON.stringify(tiivista(m), null, 1));
  console.log('--- nostot ---');
  for (const n of m.nostot) {
    console.log(`${(n.nimi || n.id).padEnd(24)} sym ${String(n.symboli.w).padStart(6)} x ${String(n.symboli.h).padStart(6)}`
      + `  nimio ${n.nimio ? `${n.nimio.w} x ${n.nimio.h} @ ${Math.round(Math.hypot(n.nimio.x - n.symboli.x, n.nimio.y - n.symboli.y))} px` : '—'}`);
  }
  console.log('--- maastosymbolit ---');
  for (const v of m.vuoret) console.log(`vuori  ${v.w} x ${v.h} @ (${v.x}, ${v.y})  nimi ${v.nimi ?? '—'}`);
  for (const p of m.pisteet) console.log(`piste  ${p.w} x ${p.h} @ (${p.x}, ${p.y})`);
  console.log('--- nimet ---');
  for (const n of m.nimet) console.log(`${n.laji.padEnd(12)} ${n.teksti} @ (${n.x}, ${n.y}) ${n.w}x${n.h}`);
  console.log('--- pelinappula, laatta, kohdemerkit ---');
  for (const n of m.nappulat ?? []) console.log(`nappula  ${n.w} x ${n.h} @ (${n.x0}, ${n.y0})…(${n.x1}, ${n.y1})`);
  for (const l of m.laatat ?? []) console.log(`laatta   ${l.w} x ${l.h} @ (${l.x0}, ${l.y0})…(${l.x1}, ${l.y1})`);
  for (const k of m.kohdemerkit ?? []) console.log(`kohde    ${k.w} x ${k.h} @ (${k.x0}, ${k.y0})…(${k.x1}, ${k.y1})`);
  console.log(`oma kaupunki: ${m.omaNimi} — nimi kartalla: ${m.omanNimiKartalla ? 'on' : 'EI'}`);
  console.log('--- peitot ---');
  for (const p of m.peitot ?? []) console.log(`${p.laji.padEnd(8)} peittää "${p.nimi}" ${p.w} x ${p.h} px`);
  process.exit(0);
}
