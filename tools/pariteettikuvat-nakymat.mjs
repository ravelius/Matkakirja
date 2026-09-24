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

/**
 * Lehden sivu N ilman kääntöanimaatiota (tools/kuvaa-maalehti.mjs).
 * Numerointi on js/lehti.js:n: 0 = kaupunkilehden kansi, N ≥ 1 =
 * tutkiSivut[N − 1]. Maalehdellä ei ole kantta, joten sen etusivu on 1
 * (tutkiEkaSivu) ja ensimmäinen aihesivu 2.
 */
const lehdenSivu = (p) => {
  const ui = window.matkakirja.ui;
  const sivut = ui.lehtitila?.tutkiSivut ?? [];
  if (p.sivu > sivut.length) return { virhe: `lehdessä on vain ${sivut.length} sisältösivua` };
  ui.naytaTutkiSivu(p.sivu, { heti: true });
  document.querySelector('#arrival-dialog .dialog-card')?.scrollTo?.(0, 0);
  return { sivu: p.sivu, osio: p.sivu === 0 ? 'kansi' : sivut[p.sivu - 1]?.id };
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

/**
 * Anna linssi pelaajalle ja valitse se: Linssisepän kaava
 * (Linssit-testit/kontakti-web.mjs; savuke-topografialinssi.mjs:427).
 * Odottaa, kunnes linssin oma tila on päällä (body.linssi-<id>, pallolla
 * .pallo-kuori.esilla), ja asettaa sitten saman kiinteän kameran kuin
 * natiivin laitetesti.sh (`kamera: [lat, lng, km]`). Maatiedoille valitaan
 * maa (`maa`), kuten kontaktiarkissa.
 */
const valitseLinssi = async (p) => {
  const ui = window.matkakirja.ui;
  ui.busy = false;
  if (!ui.game.player.linssit.includes(p.linssi)) ui.game.player.linssit.push(p.linssi);
  await ui.lataaLinssit?.();
  ui.valitseLinssi(p.linssi);
  const paalla = () => (p.linssi === 'pallo'
    ? Boolean(document.querySelector('.pallo-kuori.esilla'))
    : document.body.classList.contains(`linssi-${p.linssi}`));
  const alku = Date.now();
  while (!paalla() && Date.now() - alku < 15000) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((ok) => setTimeout(ok, 150));
  }
  if (!paalla()) return { virhe: `linssi ${p.linssi} ei kytkeytynyt 15 s:ssa (valittu ${ui.linssiValittu ?? '–'})` };
  if (p.maa) {
    const v = await import('/js/vertailu.js');
    ui.maatiedotValittu = p.maa;
    v.piirraMaatiedotMaat(ui);
  }
  if (p.kamera) {
    const [lat, lng, km] = p.kamera;
    ui.pallolauta?.zoomirajat?.({ max: 2.5 });
    ui.pallonInstanssi?.pointOfView({ lat, lng, altitude: km / 6371 }, 0);
  }
  return { linssi: p.linssi, kamera: p.kamera ?? null };
};

/** Sama kiinteä kamera uudestaan juuri ennen kuvaa (linssin avaus voi siirtää sitä). */
const linssinKamera = (p) => {
  if (!p.kamera) return;
  const ui = window.matkakirja.ui;
  const [lat, lng, km] = p.kamera;
  ui.pallolauta?.zoomirajat?.({ max: 2.5 });
  ui.pallonInstanssi?.pointOfView({ lat, lng, altitude: km / 6371 }, 0);
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

/*
 * Aktiiviset linssit: js/linssit/rekisteri.js LINSSIT (24.9.2026). Kamerat
 * natiivin laitetesti.sh:n ja Linssisepän kontaktiarkin mukaan (lat, lng, km).
 */
const LINSSIT = {
  'ihmisen-matka': {},
  keksinnot: {},
  pallo: {},
  radio: { kamera: [50, 10, 6000] },
  satelliitti: {},
  topografia: { kamera: [45, 10, 8000] },
  vertailu: { kamera: [60, 15, 5000] },
  maatiedot: { kamera: [36, 138, 4000], maa: 'JPN' },
  vesistot: { kamera: [0, 20, 9000] },
};

export const NAKYMAT = [
  {
    nimi: 'aloitusportti', kuvaus: 'Aloitusportti: ei tallennetta, "Aloita seikkailu" (ui.showAloitusportti)',
    tallenne: false, haku: '?koe=suoraan', pallo: false, odota: '.start-btn',
  },
  {
    nimi: 'avausteksti-kesken', kuvaus: 'Aloita seikkailu → juliste ja avausteksti kirjoituskoneella kesken (AVAUS_KERTOMUS_MS 2850 + ~2 s)',
    tallenne: false, haku: '?koe=suoraan', pallo: false, odota: '.start-btn',
    jalkeen: async () => {
      document.querySelector('.start-btn')?.click();
      await new Promise((ok) => setTimeout(ok, 5500));
      return null;
    },
  },
  {
    nimi: 'avausteksti-valmis', kuvaus: 'Avausteksti kirjoitettu, "Valitse aloituskaupunki" -nappi näkyvissä (.intro-valinta)',
    tallenne: false, haku: '?koe=suoraan', pallo: false, odota: '.start-btn',
    jalkeen: async () => {
      document.querySelector('.start-btn')?.click();
      const alku = Date.now();
      const nappi = () => document.querySelector('.intro-valinta');
      while (!(nappi() && !nappi().classList.contains('intro-valinta-piilossa')) && Date.now() - alku < 40000) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((ok) => setTimeout(ok, 200));
      }
      await new Promise((ok) => setTimeout(ok, 900));
      return { kestoMs: Date.now() - alku };
    },
    odotaJalkeen: '.intro-valinta:not(.intro-valinta-piilossa)',
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
    nimi: 'maalehti-aihe1', kuvaus: 'Maalehden 1. aihesivu etusivun jälkeen (naytaTutkiSivu(2, {heti:true}))',
    avaa: (p) => {
      const ui = window.matkakirja.ui;
      const iso = ui.game.board.cityById.get(p.kaupunki)?.country ?? p.maa;
      ui.avaaMaalehti(iso ?? 'FRA');
      return { iso };
    },
    parametri: { maa: 'FRA', sivu: 2 }, odota: '#arrival-dialog[open]', jalkeen: lehdenSivu,
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
  ...Object.entries(LINSSIT).map(([linssi, asetus]) => ({
    nimi: `linssi-${linssi}`,
    kuvaus: `Linssi ${linssi} (player.linssit + ui.valitseLinssi${asetus.kamera ? `, kamera ${asetus.kamera.join('/')} km` : ''}${asetus.maa ? `, maa ${asetus.maa}` : ''})`,
    avaa: valitseLinssi, parametri: { linssi, ...asetus }, palloJalkeen: true, viimeinen: linssinKamera,
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
    nimi: 'linssi-ihmisen-matka-kaynnissa',
    kuvaus: 'Ihmisen matka Käynnistä-napin jälkeen: esitys käynnissä (jakso ≥ 1, Afrikka), yläpalkki näkyvissä, pallo liikkeellä',
    avaa: valitseLinssi, parametri: { linssi: 'ihmisen-matka' }, odota: '.aikajana-avaus-nappi',
    jalkeen: async () => {
      const { ui } = window.matkakirja;
      document.querySelector('.aikajana-avaus-nappi')?.click();
      // Avausjakso (musta, zoomi) kestää noin 13 s; odotetaan ensimmäistä
      // varsinaista jaksoa, jolloin yläpalkki on näkyvissä (ei kiinteää odotusta).
      const alku = Date.now();
      const valmis = () => {
        const t = ui.aikajana?.esitys?.tila?.();
        return t && t.kaynnissa && t.indeksi >= 1 && !t.palkkiPiilossa && !document.querySelector('.aikajana-avaus');
      };
      while (!valmis() && Date.now() - alku < 45000) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((ok) => setTimeout(ok, 250));
      }
      const t = ui.aikajana?.esitys?.tila?.();
      if (!valmis()) return { virhe: `esitys ei edennyt ensimmäiseen jaksoon 45 s:ssa (indeksi ${t?.indeksi ?? '–'})` };
      return { jakso: t.jakso, indeksi: t.indeksi, kaynnistaMs: Date.now() - alku };
    },
    odotaJalkeen: '.aikajana-palkki',
  },
  {
    nimi: 'linssi-karuselli', kuvaus: 'Keksinnöt-linssi käynnissä: yläpalkki ja korttikaruselli (Käynnistä = .aikajana-avaus-nappi)',
    avaa: valitseLinssi, parametri: { linssi: 'keksinnot' }, odota: '.aikajana-avaus-nappi',
    jalkeen: () => { document.querySelector('.aikajana-avaus-nappi')?.click(); return null; },
    odotaJalkeen: '.aikajana-nauha',
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
    nimi: 'noppa-valintavihje', kuvaus: 'Siirtovaihe + pöllön valintavihje (VALINTAVIHJEEN_VIIVE 15 s lyhennetty 300 ms:iin, ui.valintavihjeViive)',
    avaa: async () => {
      const { ui, game } = window.matkakirja;
      ui.valintavihjeViive = 300;
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
      await new Promise((ok) => setTimeout(ok, 1800));
      return { kohteita: game.moves?.size ?? null, vaihe: ui.valintavihjeVaihe, ajastin: Boolean(ui.valintavihjeAjastin),
        busy: ui.busy, pollo: game.polloLoydetty, radio: ui.radioPaalla?.() ?? null };
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

/*
 * TODENNUS (Fablen korjauspyyntö 24.9.2026: kaupunkikortti ja noppa olivat
 * pelkkää karttaa, vaikka yhteenveto sanoi ok). JOKAISELLA näkymällä on
 * ehto, joka todentaa juuri ennen kuvaa JA heti sen jälkeen, että näkymän
 * oma elementti oikeasti näkyy:
 *   nakyy   valitsimet, joista JOKAISEN pitää näkyä: laatikko ruudulla
 *           (vähintään 24 × 24 px), ei display:none/visibility:hidden,
 *           kertynyt läpinäkyvyys ≥ 0,5 ja elementFromPoint osuu siihen
 *           vähintään kahdessa viidestä näytepisteestä (ei peitossa).
 *           Tarkistin: window.__pariteetti.nakyy (tools/pariteettikuvat.mjs).
 *   ehto(p) sivulla ajettava tilatarkistus; palauttaa null tai syyn.
 *           Sarjallistetaan kuten avaa(): ei viittauksia moduulin muuttujiin.
 * Jos ehto ei täyty aikarajassa, kuva tallentuu nimellä -VIRHE.png ja
 * yhteenvedossa on ok:false syineen.
 */
const lehtiSivulla = (p) => {
  const ui = window.matkakirja.ui;
  const nyt = ui.lehtitila?.tutkiSivu ?? 0;
  const odotettu = p.sivu ?? 0;
  return nyt === odotettu ? null : `lehden sivu ${nyt}, odotettiin ${odotettu}`;
};
/** Linssin oma tila päällä: body.linssi-<id>, valinta ja moottori (ei linssivirhettä). */
const linssiKaynnissa = (p) => {
  const ui = window.matkakirja.ui;
  if (document.getElementById('linssivirhe')) return 'linssivirhe näkyy';
  if (p.linssi === 'pallo') return document.querySelector('.pallo-kuori.esilla') ? null : 'astronautin pallo (.pallo-kuori.esilla) ei auki';
  if (!document.body.classList.contains(`linssi-${p.linssi}`)) return `body.linssi-${p.linssi} puuttuu (valittu ${ui.linssiValittu ?? '–'})`;
  if (ui.linssiValittu !== p.linssi) return `valittu linssi ${ui.linssiValittu ?? '–'}, odotettiin ${p.linssi}`;
  const kaynnissa = ui.pallolinssi?.tunnus === p.linssi || ui.linssiTuki?.moottori?.tunnus === p.linssi
    || ui.aikajanaTunnus === p.linssi;
  return kaynnissa ? null : `linssi ${p.linssi} valittu mutta moottori ei käynnissä`;
};
const TODENNUS = {
  aloitusportti: { nakyy: ['.start-btn'] },
  'avausteksti-kesken': { nakyy: ['.intro-juliste'] },
  'avausteksti-valmis': { nakyy: ['.intro-valinta'] },
  kartta: {
    nakyy: ['.fact-card'],
    ehto: () => {
      if (window.matkakirja.game.phase !== 'action') return `vaihe ${window.matkakirja.game.phase}`;
      const k = [...document.querySelectorAll('.pallo-kotelo canvas')].find((c) => c.getBoundingClientRect().width > 200);
      return k ? null : 'pallon kangas ei näy';
    },
  },
  'matkakirjakortti-auki': {
    nakyy: ['.fact-card:not(.pieni)'],
    ehto: () => ((document.querySelector('.fact-card .fact-text, #fact-text')?.textContent ?? '').trim().length > 40
      ? null : 'merkinnän teksti puuttuu kortista'),
  },
  'matkakirjakortti-kiinni': { nakyy: ['.fact-card.pieni'] },
  kaupunkikortti: { nakyy: ['.kaupunkipopup'] },
  nostokortti: { nakyy: ['.fokuskohde-popup'] },
  'nostokortti-juttu': {
    nakyy: ['.fokuskohde-popup'],
    ehto: () => ((document.querySelector('.fokuskohde-popup')?.innerText ?? '').length > 400
      ? null : 'jutun teksti ei auennut (alle 400 merkkiä)'),
  },
  nostovisa: { nakyy: ['.fokusnosto-visa', '.fokusnosto-visa .kulttuuri-vaihtoehdot button'] },
  elaintaky: { nakyy: ['.elaintaky-kortti'] },
  skandaali: { nakyy: ['.skandaali-kortti'] },
  syvennys: { nakyy: ['.syvennys-kortti'] },
  kohtaaminen: { nakyy: ['#quiz-dialog .dialog-card', '#quiz-dialog .quiz-aloita'] },
  visa: {
    nakyy: ['#quiz-dialog .quiz-option'],
    ehto: () => (window.matkakirja.game.phase === 'quiz' && window.matkakirja.game.quiz?.options?.length
      ? null : `visa ei käynnissä (vaihe ${window.matkakirja.game.phase})`),
  },
  sahke: { nakyy: ['.fokusvirta-kortti', '.fokusvirta-sahke'] },
  'kaupunkilehti-kansi': { nakyy: ['#arrival-dialog .dialog-card'], ehto: lehtiSivulla },
  'kaupunkilehti-aihe1': { nakyy: ['#arrival-dialog .dialog-card'], ehto: lehtiSivulla },
  'kaupunkilehti-aihe2': { nakyy: ['#arrival-dialog .dialog-card'], ehto: lehtiSivulla },
  'kaupunkilehti-sisallys': { nakyy: ['.sisallys-levy'] },
  'kaupunkilehti-luelisaa': { nakyy: ['#wiki-dialog[open]'] },
  'maalehti-kansi': {
    nakyy: ['#arrival-dialog .dialog-card'],
    ehto: () => {
      const tila = window.matkakirja.ui.lehtitila ?? {};
      if (tila.tutkiTila !== 'maa') return `lehti ei ole maalehti (tutkiTila ${tila.tutkiTila ?? '–'})`;
      // Maalehden etusivu on 1 (js/lehti.js tutkiEkaSivu: ei kaupunkikantta).
      return (tila.tutkiSivu ?? 1) === 1 ? null : `maalehden sivu ${tila.tutkiSivu}, odotettiin etusivu 1`;
    },
  },
  'maalehti-aihe1': {
    nakyy: ['#arrival-dialog .dialog-card'],
    ehto: (p) => {
      const tila = window.matkakirja.ui.lehtitila ?? {};
      if (tila.tutkiTila !== 'maa') return 'lehti ei ole maalehti';
      return tila.tutkiSivu === p.sivu ? null : `maalehden sivu ${tila.tutkiSivu}, odotettiin ${p.sivu}`;
    },
  },
  'maalehti-mediarivi': { nakyy: ['#arrival-media'] },
  laukku: { nakyy: ['#passport-dialog .passport-card'] },
  'laukku-linssit': {
    nakyy: ['#passport-dialog .passport-card'],
    ehto: () => {
      const n = [...document.querySelectorAll('#passport-dialog [data-linssi]')]
        .filter((e) => e.getBoundingClientRect().width > 20).length;
      return n >= 8 ? null : `laukussa näkyy vain ${n} linssinappia`;
    },
  },
  'linssi-selite': { nakyy: ['.linssi-selite'], ehto: linssiKaynnissa },
  'linssi-ihmisen-matka-kaynnissa': {
    nakyy: ['.aikajana-palkki'],
    ehto: () => {
      if (!document.body.classList.contains('linssi-ihmisen-matka')) return 'body.linssi-ihmisen-matka puuttuu';
      if (document.querySelector('.aikajana-avaus')) return 'aloituskortti (.aikajana-avaus) yhä näkyvissä';
      const t = window.matkakirja.ui.aikajana?.esitys?.tila?.();
      if (!t) return 'esitystä ei ole';
      if (!t.kaynnissa || t.paattynyt) return `esitys ei käynnissä (kaynnissa ${t.kaynnissa}, paattynyt ${t.paattynyt})`;
      if (t.indeksi < 1) return `yhä avausjaksossa (indeksi ${t.indeksi})`;
      return t.palkkiPiilossa ? 'yläpalkki piilossa' : null;
    },
  },
  'linssi-karuselli': {
    nakyy: ['.aikajana-palkki', '.aikajana-nauha'],
    ehto: (p) => {
      if (!document.body.classList.contains(`linssi-${p.linssi}`)) return `body.linssi-${p.linssi} puuttuu`;
      const n = [...document.querySelectorAll('.aikajana-kortti')].filter((e) => {
        const b = e.getBoundingClientRect();
        return b.width > 40 && b.right > 0 && b.left < innerWidth && b.bottom > 0 && b.top < innerHeight;
      }).length;
      return n >= 2 ? null : `karusellin kortteja ruudulla vain ${n}`;
    },
  },
  liiku: { nakyy: ['.toimintorivi-liuku > button'] },
  noppa: {
    ehto: () => {
      if (!window.matkakirja.game.die) return 'noppaa ei heitetty (game.die tyhjä)';
      const n = document.querySelector('.board-die');
      const b = n?.getBoundingClientRect();
      if (!b || b.width < 10 || b.right < 0 || b.bottom < 0 || b.left > innerWidth || b.top > innerHeight) return 'noppa (.board-die) ei ruudulla';
      return Number(getComputedStyle(n).opacity) > 0.5 ? null : 'noppa läpinäkyvä';
    },
  },
  'noppa-siirtolista': {
    ehto: () => {
      const { game, ui } = window.matkakirja;
      const n = document.querySelector('.board-die')?.getBoundingClientRect();
      if (!n || n.width < 10 || n.right < 0 || n.left > innerWidth) return 'noppa (.board-die) ei ruudulla';
      if (game.phase !== 'move') return `vaihe ${game.phase}, odotettiin move`;
      if (!(game.moves?.size > 0)) return 'siirtoja ei ole (game.moves tyhjä)';
      if (ui.busy) return 'UI kesken (busy)';
      // Kohteet piirtyvät pallolle (GL), eivät DOMiin: laudan oma kohdelista
      // (merkit.kohteet(), sama jota osumatesti käyttää) ruutupisteiksi.
      const kohteet = ui.pallolauta?.merkit?.kohteet?.() ?? [];
      if (!kohteet.length) return 'pallolla ei siirtokohteita (merkit.kohteet() tyhjä)';
      const pallo = ui.pallonInstanssi;
      const ruudulla = kohteet.filter((k) => {
        const r = pallo?.getScreenCoords?.(k.lat, k.lng, 0);
        const kangas = document.querySelector('.pallo-kotelo canvas')?.getBoundingClientRect();
        if (!r || !kangas) return false;
        const x = kangas.left + r.x; const y = kangas.top + r.y;
        return x > 0 && y > 0 && x < innerWidth && y < innerHeight;
      }).length;
      return ruudulla > 0 ? null : `siirtokohteita ${kohteet.length}, ruudulla 0`;
    },
  },
  'noppa-valintavihje': {
    ehto: () => {
      const { game } = window.matkakirja;
      if (game.phase !== 'move') return `vaihe ${game.phase}, odotettiin move`;
      // Vihjekupla (js/pollo.js polloVihje, VALINTAVIHJEEN_TEKSTI) näkyvissä ruudulla.
      const el = [...document.querySelectorAll('body *')].find((e) => e.children.length === 0
        && /Napauta korostettua kohdetta kartalla/.test(e.textContent));
      const b = el?.getBoundingClientRect();
      if (!b || b.width < 10 || b.bottom < 0 || b.top > innerHeight) return 'valintavihjeen kupla ei ruudulla';
      return null;
    },
  },
  ratas: { nakyy: ['#kehittaja-valikko'] },
  valikko: { nakyy: ['#paavalikko'] },
  karttaselite: { nakyy: ['.karttaselite-levy'] },
  pollo: { nakyy: ['.pollo-paneeli'] },
  aarre: { nakyy: ['.reveal-overlay .reveal-aarrekuva', '.reveal-overlay .reveal-caption'] },
};
/*
 * LINSSIKOHTAISET EHDOT (Linssisepän havainto 24.9.2026: vesistöt oli pelkkä
 * lauta, vaikka ok). Yleinen linssiKaynnissa + linssin oma näkyvä kerros.
 */
const LINSSIEHDOT = {
  'ihmisen-matka': { nakyy: ['.aikajana-avaus', '.aikajana-avaus-nappi'] },
  keksinnot: { nakyy: ['.aikajana-avaus', '.aikajana-avaus-nappi'] },
  pallo: { nakyy: ['.pallo-kuori.esilla'] },
  radio: {
    ehto2: () => {
      if (!document.body.classList.contains('radio-tila')) return 'body.radio-tila puuttuu';
      const n = [...document.querySelectorAll('.pallolauta-radionappi')].filter((e) => {
        const b = e.getBoundingClientRect();
        return b.width > 2 && b.right > 0 && b.bottom > 0 && b.left < innerWidth && b.top < innerHeight;
      }).length;
      return n >= 3 ? null : `radion kaupunkinappeja ruudulla vain ${n}`;
    },
  },
  satelliitti: { nakyy: ['.satelliitti-linssikehys'] },
  topografia: { nakyy: ['.linssi-selite'] },
  vertailu: {
    ehto2: () => {
      if (!document.body.classList.contains('vertailu-tila')) return 'body.vertailu-tila puuttuu';
      const n = [...document.querySelectorAll('.pallolauta-maanimi')].filter((e) => {
        const b = e.getBoundingClientRect();
        return b.width > 2 && b.right > 0 && b.bottom > 0 && b.left < innerWidth && b.top < innerHeight;
      }).length;
      return n >= 3 ? null : `vertailun maanimiä ruudulla vain ${n}`;
    },
  },
  maatiedot: {
    ehto2: (p) => {
      const ui = window.matkakirja.ui;
      if (!document.body.classList.contains('maatiedot-tila')) return 'body.maatiedot-tila puuttuu';
      if (p.maa && ui.maatiedotValittu !== p.maa) return `maatiedoissa valittuna ${ui.maatiedotValittu ?? '–'}, odotettiin ${p.maa}`;
      return ui.pallolauta?.linssit?.paalla?.('maatiedot') ? null : 'maatietojen kerros ei pallolla';
    },
  },
  vesistot: {
    nakyy: ['.linssi-selite'],
    ehto2: () => {
      if (!window.matkakirja.ui.pallolauta?.linssit?.paalla?.('vesistot')) return 'vesistöjen kerros ei pallolla';
      const n = [...document.querySelectorAll('.pallolauta-vesinimi')].filter((e) => {
        const b = e.getBoundingClientRect();
        return b.width > 2 && b.right > 0 && b.bottom > 0 && b.left < innerWidth && b.top < innerHeight
          && Number(getComputedStyle(e).opacity) > 0.3;
      }).length;
      return n >= 3 ? null : `vesistönimiä ruudulla vain ${n} (kerros tyhjä tai kamera väärässä paikassa)`;
    },
  },
};
for (const [linssi, e] of Object.entries(LINSSIEHDOT)) {
  // Kaksi sarjallistettavaa ehtoa yhdeksi: yleinen tila ensin, sitten linssin oma.
  const yleinen = String(linssiKaynnissa);
  const oma = e.ehto2 ? String(e.ehto2) : null;
  // eslint-disable-next-line no-new-func
  const ehto = new Function('p', `return (async () => {
    const yleinen = (${yleinen});
    const syy = yleinen(p);
    if (syy) return syy;
    ${oma ? `return (${oma})(p);` : 'return null;'}
  })();`);
  TODENNUS[`linssi-${linssi}`] = { nakyy: e.nakyy ?? [], ehto };
}
for (const n of NAKYMAT) Object.assign(n, TODENNUS[n.nimi] ?? {});
const ilman = NAKYMAT.filter((n) => !n.nakyy && !n.ehto).map((n) => n.nimi);
if (ilman.length) throw new Error(`Näkymiltä puuttuu todennus: ${ilman.join(', ')}`);
