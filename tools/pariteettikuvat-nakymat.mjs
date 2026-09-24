/*
 * NÄKYMÄLISTA tools/pariteettikuvat.mjs:lle (ks. tools/pariteettikuvat.md).
 *
 * Jokainen rivi:
 *   nimi        tiedostonimen alku (<nimi>-<leveys>x<korkeus>.png)
 *   kuvaus      mitä kuvassa on ja millä oikotiellä se avataan
 *   avaa(p)     ajetaan SIVULLA (page.evaluate) pallon valmistuttua;
 *               p = { kaupunki, ...parametri }. Palauta { virhe } jos ei onnistu.
 *   odota       CSS-valitsin, jonka pitää näkyä ennen kuvaa (pilkkulista = mikä tahansa)
 *   jalkeen(p)  valinnainen toinen askel odota-valitsimen jälkeen (esim. sivunvaihto)
 *   palloJalkeen odota pallon laatat uudestaan avauksen jälkeen (linssit)
 *   tallenne    false = ei tallennetta (aloitusportti)
 *   haku        oma osoitteen hakuosa (oletus ?lauta=pallo&koe=suoraan)
 *   pallo       false = älä odota palloa ennen avausta
 *
 * Kaikki avaukset käyttävät pelin OLEMASSA OLEVIA metodeja ja savukkeiden
 * valitsimia (lähde merkitty riville). Uusia kehittäjäpolkuja ei tarvittu.
 */

// Yhteiset apurit sivulle: funktiot sarjallistetaan page.evaluateen, joten
// ne eivät voi viitata tämän moduulin muuttujiin — apurit kirjoitetaan auki.

/** Avaa kaupunkilehden (js/ui.js openArrival; savuke-lehtiasettelu.mjs). */
const avaaLehti = (p) => {
  const ui = window.matkakirja.ui;
  const city = ui.game.board.cityById.get(p.kaupunki);
  if (!city) return { virhe: `kaupunkia ${p.kaupunki} ei ole` };
  ui.openArrival(city, { ohitaLehtilukko: true });
  return { sivut: (ui.lehtitila?.tutkiSivut ?? []).map((s) => s.id) };
};

/** Lehden sivu N (0 = kansi) ilman kääntöanimaatiota (tools/kuvaa-maalehti.mjs). */
const lehdenSivu = (p) => {
  const ui = window.matkakirja.ui;
  const sivut = ui.lehtitila?.tutkiSivut ?? [];
  if (p.sivu >= sivut.length) return { virhe: `lehdessä on vain ${sivut.length} sivua` };
  ui.naytaTutkiSivu(p.sivu, { heti: true });
  document.querySelector('#arrival-dialog .dialog-card')?.scrollTo?.(0, 0);
  return { sivu: sivut[p.sivu]?.id };
};

/** Pallolaudan nosto tunnuksen alulla (lauta.napautaNosto; savuke-nostoklikkaus.mjs). */
const avaaNosto = (p) => {
  const lauta = window.matkakirja.ui.pallolauta;
  const osumat = lauta.nostot?.osumat?.() ?? [];
  const o = osumat.find((x) => (p.tunnus ? x.id === p.tunnus : x.id.startsWith(p.alku)));
  if (!o) return { virhe: `nostoa ${p.tunnus ?? `${p.alku}*`} ei näkyvissä (${osumat.length} osumaa)` };
  lauta.napautaNosto(o.id);
  return { nosto: o.id };
};

const NOSTON_KORTTI = '.kaupunkipopup, .fokuskohde-popup, .fokusnosto-kortti, .fokusnosto-kerros [role="dialog"], .elaintaky-kerros [role="dialog"], .skandaali-kerros [role="dialog"], .hetki-kerros [role="dialog"], .syvennys-kerros [role="dialog"]';

/** Anna linssi pelaajalle ja valitse se (savuke-topografialinssi.mjs:427). */
const valitseLinssi = async (p) => {
  const ui = window.matkakirja.ui;
  ui.busy = false;
  if (!ui.game.player.linssit.includes(p.linssi)) ui.game.player.linssit.push(p.linssi);
  await ui.lataaLinssit?.();
  ui.valitseLinssi(p.linssi);
  await new Promise((ok) => setTimeout(ok, 300));
  return { linssi: ui.game.player.linssi ?? ui.linssi?.tunnus ?? p.linssi };
};

/**
 * Kaupungin kohtaaminen tai sähke (js/fokusvirta.js avaaFokusKohtaaminen —
 * sama kutsu kuin kartan vihreällä pisteellä; savuke-sahkekortti.mjs).
 * Laatta käännetään pieneksi aarteeksi, jotta kohtaaminen on auki.
 */
const avaaKohtaaminen = async (p) => {
  const { game, ui } = window.matkakirja;
  const fv = await import('/js/fokusvirta.js');
  const kaupunki = p.kohtaamiskaupunki ?? p.kaupunki;
  if (game.player.pos?.city !== kaupunki) {
    game.player.pos = { type: 'city', city: kaupunki };
    game.world.visited.add(kaupunki);
  }
  game.phase = 'action';
  game.world.tokens.set(kaupunki, 'pieniAarre');
  ui.busy = false;
  ui.render();
  window.matkakirjaPollo?.tyhjennaPino?.();
  if (!fv.avaaFokusKohtaaminen(ui, game.cityOf())) return { virhe: `kohtaaminen ei auennut (${kaupunki})` };
  return { kaupunki };
};

// Aktiiviset linssit: js/linssit/rekisteri.js LINSSIT (24.9.2026).
const LINSSIT = ['ihmisen-matka', 'keksinnot', 'pallo', 'radio', 'satelliitti', 'topografia', 'vertailu', 'maatiedot', 'vesistot'];

export const NAKYMAT = [
  {
    nimi: 'aloitusportti', kuvaus: 'Aloitusportti: ei tallennetta, "Aloita seikkailu" (ui.showAloitusportti)',
    tallenne: false, haku: '?koe=suoraan', pallo: false, odota: '.start-btn',
  },
  { nimi: 'kartta', kuvaus: 'Intro ohitettu: pallo kaupungissa, toimintavaihe (?koe=suoraan + tallenne)' },
  {
    nimi: 'matkakirjakortti-auki', kuvaus: 'Matkakirjan merkintäkortti auki (ui.asetaPaivakirjanKoko(false))',
    avaa: () => { window.matkakirja.ui.asetaPaivakirjanKoko(false); }, odota: '.fact-card:not(.pieni)',
  },
  {
    nimi: 'matkakirjakortti-kiinni', kuvaus: 'Matkakirjan merkintäkortti pienenä (ui.asetaPaivakirjanKoko(true))',
    avaa: () => { window.matkakirja.ui.asetaPaivakirjanKoko(true); }, odota: '.fact-card.pieni',
  },
  {
    nimi: 'kaupunkikortti', kuvaus: 'Naapurikaupungin kortti pallolla (lauta.napautaNosto("nakyva-kaupunki-*"))',
    avaa: avaaNosto, parametri: { alku: 'nakyva-kaupunki-' }, odota: NOSTON_KORTTI,
  },
  {
    nimi: 'nostokortti', kuvaus: 'Karttanoston kortti, kuva edellä (napautaNosto("pont-du-gard"))',
    avaa: avaaNosto, parametri: { tunnus: 'pont-du-gard', alku: 'hahmotelma-' }, odota: NOSTON_KORTTI,
  },
  {
    nimi: 'nostokortti-juttu', kuvaus: 'Karttanoston juttu auki (+ .nostokuva-lisaa)',
    avaa: avaaNosto, parametri: { tunnus: 'pont-du-gard', alku: 'hahmotelma-' }, odota: NOSTON_KORTTI,
    jalkeen: () => { document.querySelector('.nostokuva-lisaa')?.click(); return null; },
  },
  {
    nimi: 'nostovisa', kuvaus: 'Maalehden noston visa (napautaNosto("nosto-maalehti-roquefort") + lisää; savuke-nostovisa.mjs)',
    avaa: avaaNosto, parametri: { tunnus: 'nosto-maalehti-roquefort', alku: 'nosto-maalehti-' }, odota: NOSTON_KORTTI,
    jalkeen: () => {
      document.querySelector('.nostokuva-lisaa')?.click();
      return null;
    },
    odotaJalkeen: '.fokusnosto-visa',
    viimeinen: () => { document.querySelector('.fokusnosto-visa')?.scrollIntoView({ block: 'center' }); },
  },
  {
    nimi: 'elaintaky', kuvaus: 'Eläintäky-nosto (napautaNosto("elaintaky-FRA"))',
    avaa: avaaNosto, parametri: { tunnus: 'elaintaky-FRA', alku: 'elaintaky-' }, odota: NOSTON_KORTTI,
  },
  {
    nimi: 'skandaali', kuvaus: 'Skandaali-nosto (napautaNosto("skandaali-*"))',
    avaa: avaaNosto, parametri: { alku: 'skandaali-' }, odota: NOSTON_KORTTI,
  },
  {
    nimi: 'syvennys', kuvaus: 'Syvennys-nosto (napautaNosto("syvennys-*"))',
    avaa: avaaNosto, parametri: { alku: 'syvennys-' }, odota: NOSTON_KORTTI,
  },
  {
    nimi: 'kohtaaminen', kuvaus: 'Kaupungin kohtaaminen, alkukortti (fokusvirta.avaaFokusKohtaaminen)',
    avaa: avaaKohtaaminen, odota: '#quiz-dialog[open] .quiz-aloita',
  },
  {
    nimi: 'visa', kuvaus: 'Kohtaamisen kysymys (kohtaaminen + .quiz-aloita); ajastin käy',
    avaa: avaaKohtaaminen, odota: '#quiz-dialog[open] .quiz-aloita',
    jalkeen: () => { document.querySelector('#quiz-dialog .quiz-aloita')?.click(); return null; },
    odotaJalkeen: '#quiz-dialog[open] #quiz-timer:not([hidden])',
  },
  {
    nimi: 'sahke', kuvaus: 'Sähke (kohtaaminen sähkekaupungissa, oletus Sofia; savuke-sahkekortti.mjs)',
    avaa: avaaKohtaaminen, parametri: { kohtaamiskaupunki: 'sofia' }, odota: '.fokusvirta-kortti',
    palloJalkeen: true,
  },
  {
    nimi: 'kaupunkilehti-kansi', kuvaus: 'Kaupunkilehden kansi (ui.openArrival(city))',
    avaa: avaaLehti, odota: '#arrival-dialog[open]',
  },
  {
    nimi: 'kaupunkilehti-aihe1', kuvaus: 'Kaupunkilehden 1. aihesivu (ui.naytaTutkiSivu(1, {heti:true}))',
    avaa: avaaLehti, odota: '#arrival-dialog[open]', jalkeen: lehdenSivu, parametri: { sivu: 1 },
  },
  {
    nimi: 'kaupunkilehti-aihe2', kuvaus: 'Kaupunkilehden 2. aihesivu (ui.naytaTutkiSivu(2, {heti:true}))',
    avaa: avaaLehti, odota: '#arrival-dialog[open]', jalkeen: lehdenSivu, parametri: { sivu: 2 },
  },
  {
    nimi: 'kaupunkilehti-sisallys', kuvaus: 'Kaupunkilehden sisällysvalikko (.lehti-hampurilainen)',
    avaa: avaaLehti, odota: '#arrival-dialog[open]',
    jalkeen: () => {
      const n = document.querySelector('#arrival-dialog .lehti-hampurilainen');
      if (!n) return { virhe: 'ei .lehti-hampurilainen-nappia' };
      n.click();
      return null;
    },
    odotaJalkeen: '.sisallys-levy',
  },
  {
    nimi: 'kaupunkilehti-luelisaa', kuvaus: 'Kaupunkilehden "Lue lisää" (ensimmäinen .wiki-btn → #wiki-dialog)',
    avaa: avaaLehti, odota: '#arrival-dialog[open]',
    jalkeen: () => {
      const n = document.querySelector('#arrival-dialog .wiki-btn');
      if (!n) return { virhe: 'ei .wiki-btn-nappia' };
      n.click();
      return null;
    },
    odotaJalkeen: '#wiki-dialog[open]',
  },
  {
    nimi: 'maalehti-kansi', kuvaus: 'Maalehti (ui.avaaMaalehti(iso)), kaupungin maa',
    avaa: (p) => {
      const ui = window.matkakirja.ui;
      const iso = ui.game.board.cityById.get(p.kaupunki)?.country ?? p.maa;
      ui.avaaMaalehti(iso ?? 'FRA');
      return { iso };
    },
    parametri: { maa: 'FRA' }, odota: '#arrival-dialog[open]',
  },
  {
    nimi: 'maalehti-aihe1', kuvaus: 'Maalehden 1. aihesivu (naytaTutkiSivu(1, {heti:true}))',
    avaa: (p) => {
      const ui = window.matkakirja.ui;
      const iso = ui.game.board.cityById.get(p.kaupunki)?.country ?? p.maa;
      ui.avaaMaalehti(iso ?? 'FRA');
      return { iso };
    },
    parametri: { maa: 'FRA', sivu: 1 }, odota: '#arrival-dialog[open]', jalkeen: lehdenSivu,
  },
  {
    nimi: 'maalehti-mediarivi', kuvaus: 'Maalehden etusivun mediarivi (radio; #arrival-media vieritettynä keskelle)',
    avaa: (p) => {
      const ui = window.matkakirja.ui;
      const iso = ui.game.board.cityById.get(p.kaupunki)?.country ?? p.maa;
      ui.avaaMaalehti(iso ?? 'FRA');
      return { iso };
    },
    parametri: { maa: 'FRA' }, odota: '#arrival-media',
    viimeinen: () => { document.querySelector('#arrival-media')?.scrollIntoView({ block: 'center' }); },
  },
  {
    nimi: 'laukku', kuvaus: 'Matkalaukku = passi (ui.openPassport(); yläpalkin #turn-pill)',
    avaa: () => { window.matkakirja.ui.openPassport(); }, odota: '#passport-dialog[open]',
  },
  {
    nimi: 'laukku-linssit', kuvaus: 'Matkalaukku kaikki linssit omistettuina (linssivalitsin #linssi-kotelo)',
    avaa: async () => {
      const ui = window.matkakirja.ui;
      for (const l of ['ihmisen-matka', 'keksinnot', 'pallo', 'radio', 'satelliitti', 'topografia', 'vertailu', 'maatiedot', 'vesistot']) {
        if (!ui.game.player.linssit.includes(l)) ui.game.player.linssit.push(l);
      }
      await ui.lataaLinssit?.();
      ui.render?.();
      ui.openPassport();
    },
    odota: '#passport-dialog[open]',
  },
  ...LINSSIT.map((linssi) => ({
    nimi: `linssi-${linssi}`, kuvaus: `Linssi ${linssi} (player.linssit + ui.valitseLinssi)`,
    avaa: valitseLinssi, parametri: { linssi }, palloJalkeen: true,
  })),
  {
    nimi: 'linssi-selite', kuvaus: 'Linssin selite auki (topografia + .linssi-selite-nappi / ui.vaihdaLinssiSelite)',
    avaa: valitseLinssi, parametri: { linssi: 'topografia' }, palloJalkeen: true,
    jalkeen: () => {
      const s = document.querySelector('.linssi-selite');
      if (!s) return { virhe: 'ei .linssi-selitettä' };
      const n = document.querySelector('.linssi-selite-nappi');
      if (n && !s.classList.contains('auki')) n.click();
      return null;
    },
    odotaJalkeen: '.linssi-selite',
  },
  {
    nimi: 'linssi-karuselli', kuvaus: 'Ihmisen matka: aikajanan palkki ja korttikaruselli (.aikajana-avaus-nappi)',
    avaa: valitseLinssi, parametri: { linssi: 'ihmisen-matka' }, odota: '.aikajana-avaus-nappi',
    jalkeen: () => { document.querySelector('.aikajana-avaus-nappi')?.click(); return null; },
    odotaJalkeen: '.aikajana-palkki, .aikajana-nauha',
  },
  {
    nimi: 'liiku', kuvaus: 'Kulkutapaliuska auki (ui.liukuAuki = true; savuke-liiku.mjs)',
    avaa: () => { const ui = window.matkakirja.ui; ui.liukuAuki = true; ui.render(); },
    odota: '.toimintorivi-liuku > button',
  },
  {
    nimi: 'noppa', kuvaus: 'Liiku → Liftaus: noppa heitetty (.board-die/.die-layer)',
    avaa: () => {
      const ui = window.matkakirja.ui;
      ui.liukuAuki = true; ui.render();
      const nappi = [...document.querySelectorAll('.toimintorivi button')].find((b) => /^liftaus/i.test(b.textContent.trim()));
      if (!nappi) return { virhe: 'ei Liftaus-nappia' };
      nappi.click();
      return null;
    },
    odota: '.board-die, .die-layer .die, .die-layer',
  },
  {
    nimi: 'noppa-siirtolista', kuvaus: 'Liftaus heitetty, siirtovaihe: kohteet pallolla (game.phase === "move")',
    avaa: async () => {
      const { ui, game } = window.matkakirja;
      ui.liukuAuki = true; ui.render();
      const nappi = [...document.querySelectorAll('.toimintorivi button')].find((b) => /^liftaus/i.test(b.textContent.trim()));
      if (!nappi) return { virhe: 'ei Liftaus-nappia' };
      nappi.click();
      const alku = Date.now();
      while (!(game.phase === 'move' && !ui.busy) && Date.now() - alku < 15000) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((ok) => setTimeout(ok, 100));
      }
      if (game.phase !== 'move') return { virhe: `vaihe ${game.phase}` };
      return { kohteita: game.moves?.size ?? null };
    },
    palloJalkeen: true,
  },
  {
    nimi: 'ratas', kuvaus: 'Hammasratas: äänentasot ja asetukset (#kehittaja-valikko-btn)',
    avaa: () => { document.getElementById('kehittaja-valikko-btn')?.click(); },
    odota: '#kehittaja-valikko:not([hidden])',
  },
  {
    nimi: 'valikko', kuvaus: 'Hampurilainen: päävalikko (#menu-btn)',
    avaa: () => { document.getElementById('menu-btn')?.click(); },
    odota: '#paavalikko:not([hidden])',
  },
  {
    nimi: 'karttaselite', kuvaus: 'Kartan selite (.karttaselite-nappi)',
    avaa: () => { document.querySelector('.karttaselite-nappi')?.click(); },
    odota: '.karttaselite-levy',
  },
  {
    nimi: 'pollo', kuvaus: 'Pöllöpaneeli (.pollo-nappi)',
    avaa: () => { document.querySelector('.pollo-nappi')?.click(); },
    odota: '.pollo-paneeli',
  },
  {
    nimi: 'aarre', kuvaus: 'Aarteen paljastus pelin omalla polulla: kohtaaminen → Aloita → oikea vastaus (game.quiz.correct)',
    avaa: avaaKohtaaminen, odota: '#quiz-dialog[open] .quiz-aloita',
    jalkeen: async () => {
      const { game } = window.matkakirja;
      document.querySelector('#quiz-dialog .quiz-aloita')?.click();
      const alku = Date.now();
      let napit = [];
      while (Date.now() - alku < 10000) {
        napit = [...document.querySelectorAll('#quiz-dialog .quiz-option')].filter((b) => b.getBoundingClientRect().width > 0);
        if (napit.length && Number.isInteger(game.quiz?.correct)) break;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((ok) => setTimeout(ok, 100));
      }
      const oikea = napit[game.quiz?.correct];
      if (!oikea) return { virhe: 'visan vaihtoehtoja ei tullut' };
      oikea.click();
      return null;
    },
    odotaJalkeen: '.reveal-overlay .reveal-jatka.nakyy',
  },
];
