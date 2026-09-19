/*
 * SELAINSAVUKE: AVARUUSVAIHEEN PALLO — ISS, AURINKO SIVULTA,
 * KYLLÄISYYS.
 *
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_USE_ENV_PROXY=1 \
 *     node tools/savukkeet/savuke-astro-pallo.mjs
 *
 * Raamattu, "ASTRONAUTIN KAMERA: VALOKUVANÄKYMÄ UUSIKSI 2",
 * PALLONÄKYMÄ 11–13. Yksikkötestit (tests/satelliitti-avaruus.test.mjs)
 * näkevät kaavat; tämä savuke katsoo RUUTUA kahdella näytöllä
 * (1400 × 900 ja 390 × 844).
 *
 * VÄITTEET:
 *   1. ISS ON RUUDULLA. Merkki on DOMissa pallon kotelossa, sen
 *      ruutupaikka on pallon sisällä ja se MUUTTUU kahdessa
 *      sekunnissa. Ratakaari on piirretty (svg-polku) ja sen
 *      takapuoli on karsittu — näkyviä pisteitä on vähemmän kuin koko
 *      radalla.
 *   2. VASTAKOE LIIKKEELLE: liikkeenvähennyksellä (prefers-reduced-
 *      motion) sama merkki on paikallaan. Jos mittari näyttäisi
 *      liikettä myös silloin, se mittaisi kohinaa eikä rataa.
 *   3. AURINKO SIVULTA. Kolme näytettä molemmilta reunoilta ja kolme
 *      keskustasta, luettuna kuvakaappauksen pikseleistä: varjon
 *      puolella reuna TUMMUU ja valon puolella KIRKASTUU, kun
 *      varjostus kytketään päälle — ja keskusta ei muutu.
 *   4. VASTAKOE VARJOLLE: kytkin pois → samat pikselit palaavat
 *      lähtöarvoonsa. Mittari osaa siis mennä punaiseksi.
 *   5. KYLLÄISYYS ALAS. Reliefin keskimääräinen kylläisyys mitataan
 *      selaimessa ennen ja jälkeen suodattimen: jälkeen on pienempi
 *      ja suhde on lähellä RELIEFIN_SATURAATIOta.
 *   6. KOHDEPISTEET EIVÄT KÄRSI. Vihreitä pisteitä on yhä ruudulla,
 *      myös varjon puolella, ja napautus menee kalvon LÄPI (kalvo on
 *      merkkikerroksen alla ja pointer-events: none) — piste on siis
 *      yhä klikattavissa.
 *   7. RELIEFIN TARKKUUS: leveä ruutu saa 8k-kuvan, puhelin 4k:n, ja
 *      latauksen kesto kirjataan.
 *   8. PALLO EI OLE MUSTA (v1924, iPhone). Pinnalla on osoite kahdeksan
 *      sekunnin sisällä JA pallon keskipiste on kirkkaampi kuin 20.
 *      Vartio ajetaan lisäksi SAFARIN RAJOILLA: `ctx.filter` pois
 *      käytöstä ja kankaan katto 2048 × 1024 — silloin varapolun on
 *      kannettava, eikä mustaa palloa saa syntyä.
 *   9. TYHJÄ NÄKYMÄ EI JÄÄ TYHJÄKSI (WebKit-vika 16.9.2026, Raamattu
 *      ASTRONAUTIN KAMERA LISÄYS 11 kohta 34). Kun Globe.gl:n lataus
 *      estetään, pelaaja saa aikakatkon jälkeen NÄKYVÄN ilmoituksen ja
 *      napin ulos — ei tummaa pohjaa ja pelkkää ✕:ää. VASTAKOE: ehjässä
 *      ajossa samaa ilmoitusta ei ole ruudulla ja `puute()` on null.
 *   9b. LINSSIN OMA VARTIJA: lauta rakentuu, mutta pallon pinta jää
 *      saamatta (generoitu tekstuuri kaatuu, reliefikuva ei saavu).
 *      Vartijan on nimettävä puute (`pinta`) ja näytettävä se pelaajalle.
 *  10. SAFARIN RAJAT MAC-KOTELOSSA (Raamattu LISÄYS 13 kohta 37).
 *      2 539 × 1 321 CSS, dpr 1, WebKit-liput: ladontakangas on
 *      ENINTÄÄN 4096 × 2048 ja pallon pinta on VÄRILLINEN. Ennen
 *      korjausta ladonta oli 8192 × 4096 = 33,5 Mpx, blob 48,5 Mt ja
 *      pinta musta.
 *  10b. KOHDEPISTEET RUUDULLE ILMAN KEHYKSIÄ (LISÄYS 13 kohta 36).
 *      Kun requestAnimationFrame lakkaa kutsumasta takaisin linssin
 *      avautuessa, syntyy TÄSMÄLLEEN Codexin kuva: ruskea tyhjä ruutu,
 *      `vartija puute=pisteet pisteita=0`. Kehysvahdin on pakotettava
 *      piirto ajastimesta, jolloin pallo ja 64 pistettä tulevat silti.
 *  10c. MUSTA PINTA HUOMATAAN JA KORJATAAN. Kun kangas valehtelee
 *      (drawImage ei piirrä, getImageData antaa uskottavia pikseleitä),
 *      pinnasta tulee musta. Mittauksen on nähtävä se PIIRTOPUSKURISTA
 *      ja vaihdettava generoitu vyöhykepallo tilalle. MYÖS PILVIEN ALTA
 *      (19.9.2026): PAATOKSET 43 kohta 7:n pilvikuori on täsmälleen
 *      mittauspisteiden päällä, ja ilman korjausta vartio luki mustasta
 *      pinnasta 186 eli "kaikki hyvin". Lohko vaatii siksi erikseen,
 *      että pilvet OLIVAT päällä kokeen aikana — muuten punaisen voisi
 *      "korjata" sammuttamalla pilvet.
 *  10d. PISTEET DOMISSA AJOISSA JA PYSYVÄT PINNAN VAIHDON YLI.
 *  11. KOLME AVAUSTA PERÄKKÄIN (Raamattu LISÄYS 13 kohta 37
 *      TARKENNUS, Mac-session mittaus oikealla WebKitillä): musta
 *      pallo EI tule kankaasta vaan siitä, että linssin sulku asettaa
 *      `globeImageUrl(null)` → globe.gl maalaa materiaalin mustaksi ja
 *      SEURAAVA avaus perii sen. Yksi avaus ei voi nähdä vikaa; kolme
 *      näkee. Chromium toisti mustan 16/16 ilman korjausta.
 *
 * VERKKO: ämpäri (laatat, Globe.gl, reliefi) Noden fetchin kautta, muu
 * katki. Ympäristömuuttuja NAKYMAT rajaa ajettavat näytöt
 * (esim. NAKYMAT=tyopoyta). Väite 9 ei ole näyttökoko vaan vartija:
 * se ajetaan oletuksena kerran, `NAKYMAT=vartija` ajaa vain sen ja
 * `NAKYMAT=tyopoyta,ei-vartija` jättää sen pois. Vartijalohko jakautuu
 * vielä kolmeen (`vartija-a`, `vartija-b`, `vartija-c`). Julkaisusarja ajaa tämän
 * savukkeen NELJÄNÄ rinnakkaisena rivinä näillä muuttujilla
 * (tools/savukkeet/sarjat.json: `#puhelin`, `#tyopoyta`, `#vartija-a`,
 * `#vartija-b`, `#vartija-c`).
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, luminanssi } from './pallon-liike-mittarit.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '';
if (ULOS) mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
/**
 * YKSI EPÄONNISTUNUT HAKU EI SAA MYRKYTTÄÄ KOKO AJOA (Mac 18.9.2026).
 *
 * Vanha versio pani VÄLIMUISTIIN myös epäonnistuneen haun, joten yksi
 * ohimenevä verkkopätkä esti saman osoitteen KAIKISSA myöhemmissä
 * konteksteissa — ja Macilla juuri `laatat.json` jäi näin saamatta,
 * jolloin peli putosi varatekstuuriin ja väite 9b meni punaiseksi
 * ympäristön takia (ks. docs/raportit/viesti-fable-astro-pinta-
 * vartija-20260918.md). Nyt haku yritetään kolmesti ja VAIN onnistunut
 * vastaus jää muistiin.
 */
const ULKOHAUN_YRITYKSET = 3;
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = (async () => {
    for (let yritys = 0; yritys < ULKOHAUN_YRITYKSET; yritys += 1) {
      const v = await fetch(url).then(async (r) => (r.ok
        ? { body: Buffer.from(await r.arrayBuffer()), tyyppi: r.headers.get('content-type') }
        : null)).catch(() => null);
      if (v) return v;
      await new Promise((r) => { setTimeout(r, 250 * (yritys + 1)); });
    }
    return null;
  })().then((v) => {
    if (!v) VALIMUISTI.delete(url);
    return v;
  });
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
/*
 * PORTTI YMPÄRISTÖSTÄ: rinnakkaiset sessiot ajavat savukkeita samaan
 * aikaan, ja kiinteä portti kaatoi ajon EADDRINUSEen. Oletus on sama
 * kuin ennen, joten vanhat komennot toimivat muuttumatta.
 */
const PORTTI = Number(process.env.PORTTI) || 8754;
await new Promise((r) => palvelin.listen(PORTTI, r));

/*
 * Playwright kahdesta paikasta (README: älä kirjoita kiinteää
 * ../../node_modules-polkua).
 */
let paketti = null;
for (const polku of [process.env.PLAYWRIGHT_JS, join(JUURI, 'node_modules', 'playwright', 'index.js'),
  '/opt/node22/lib/node_modules/playwright/index.js']) {
  if (!polku) continue;
  paketti = await import(polku).catch(() => null);
  if (paketti) break;
}
const chromium = paketti?.chromium ?? paketti?.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });


const NAKYMAT = {
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
};
/*
 * NAKYMAT rajaa ajon. Arvot: `tyopoyta`, `puhelin`, `vartija` (väite 9:n
 * vastakoelohko, ei näyttökoko) ja `ei-vartija`, joka jättää vartija-
 * lohkon pois valituista näytöistä huolimatta.
 *
 * `ei-vartija` on jaon (18.9.2026, Raamattu AGENTIT ... TARKENNUS 9)
 * takia: julkaisusarja ajaa tämän savukkeen neljänä rinnakkaisena
 * rivinä. Ilman kieltoa vartijalohko ajettaisiin `#tyopoyta`-rivillä
 * omien vartijarivien LISÄKSI, koska
 * `tyopoyta` laukaisee sen oletuksena — rivit eivät saa tehdä samaa
 * työtä kahdesti eikä yksikään väite saa jäädä ajamatta.
 */
const KAIKKI_VALITUT = (process.env.NAKYMAT ?? '').split(',').map((x) => x.trim()).filter(Boolean);
const VARTIJA_POIS = KAIKKI_VALITUT.includes('ei-vartija');
const VALITUT = KAIKKI_VALITUT.filter((x) => x !== 'ei-vartija');

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/*
 * PIKSELIT LUETAAN KUVAKAAPPAUKSESTA. WebGL-kangas ei anna
 * toDataURLia ilman preserveDrawingBufferia (eikä sitä saa kytkeä
 * päälle pelin takia), ja auringon kalvo on kankaan PÄÄLLÄ mutta
 * merkkien ALLA — kaappaus on ainoa paikka, jossa nämä kolme kerrosta
 * ovat samassa kuvassa niin kuin pelaajalla.
 */
const kirkkaus = (kuva, x, y, sade = 3) => {
  let summa = 0;
  let n = 0;
  for (let dy = -sade; dy <= sade; dy += 1) {
    for (let dx = -sade; dx <= sade; dx += 1) {
      const px = Math.round(x + dx);
      const py = Math.round(y + dy);
      if (px < 0 || py < 0 || px >= kuva.width || py >= kuva.height) continue;
      summa += luminanssi(kuva.data, (py * kuva.width + px) * 4);
      n += 1;
    }
  }
  return n ? summa / n : 0;
};

/**
 * Kolme näytettä reunan tuntumasta (osuus säteestä) annetulla puolella
 * ja kolme keskustasta. Kulmat ovat vaakasuoran molemmin puolin, jotta
 * näytteet eivät osu samaan maastoon.
 */
const NAYTEKULMAT = [-22, 0, 22];
const NAYTTEEN_SADE = 0.94;
function naytteet(kuva, { keskiX, keskiY, sade, dpr }) {
  const ota = (suunta) => NAYTEKULMAT.map((k) => {
    const a = (k * Math.PI) / 180;
    const x = keskiX + suunta * Math.cos(a) * sade * NAYTTEEN_SADE;
    const y = keskiY + Math.sin(a) * sade * NAYTTEEN_SADE;
    return kirkkaus(kuva, x * dpr, y * dpr);
  });
  /*
   * PUOLIVÄLIN RENGAS (0,5 × säde) on oma näytteensä: varjo saa
   * koskea vain reunan kaistaa, joten tässä ei saa tapahtua mitään.
   * Se on ainoa tapa erottaa reunavarjo koko pallon himmennyksestä.
   */
  const puolivali = (suunta) => NAYTEKULMAT.map((k) => {
    const a = (k * Math.PI) / 180;
    return kirkkaus(
      kuva, (keskiX + suunta * Math.cos(a) * sade * 0.5) * dpr,
      (keskiY + Math.sin(a) * sade * 0.5) * dpr,
    );
  });
  const keski = NAYTEKULMAT.map((k, i) => kirkkaus(
    kuva, (keskiX + (i - 1) * sade * 0.12) * dpr, (keskiY + k * 0.4) * dpr,
  ));
  const ka = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  return {
    vasen: ota(-1).map((v) => +v.toFixed(1)),
    oikea: ota(1).map((v) => +v.toFixed(1)),
    keskusta: keski.map((v) => +v.toFixed(1)),
    vasenKa: +ka(ota(-1)).toFixed(1),
    oikeaKa: +ka(ota(1)).toFixed(1),
    keskustaKa: +ka(keski).toFixed(1),
    puolivaliVasenKa: +ka(puolivali(-1)).toFixed(1),
    puolivaliOikeaKa: +ka(puolivali(1)).toFixed(1),
  };
}

/** Avaruusvaiheen mitatut luvut: kalvo, ISS, pisteet ja reliefi. */
const MITAT = () => {
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;
  const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori');
  const r = kotelo.getBoundingClientRect();
  const iss = document.querySelector('.astro-iss');
  const rata = document.querySelector('.astro-rata path');
  const kalvo = document.querySelector('.astro-kalvo');
  const d = rata?.getAttribute('d') ?? '';
  const maalattu = (el) => {
    let p = el;
    while (p && p.nodeType === 1) {
      const t = getComputedStyle(p);
      if (t.display === 'none' || t.visibility === 'hidden' || Number(t.opacity) <= 0.05) return false;
      p = p.parentElement;
    }
    const b = el.getBoundingClientRect();
    return b.width > 0 && b.height > 0;
  };
  /*
   * PISTEEN OMA RUUTUPAIKKA: kohdemerkit ovat CSS2D-elementtejä, joten
   * niiden laatikko kertoo, missä pelaaja ne näkee. Varjon puoli on
   * kotelon vasen laita (AURINGON_PUOLI = 'oikea').
   */
  const pisteet = [...document.querySelectorAll('.satelliitti-piste')]
    .filter((el) => !el.classList.contains('pallolauta-takana')
      && !el.closest('.pallolauta-takana'))
    .map((el) => {
      /*
       * MERKIN OMA LAATIKKO ON NOLLA (css/satelliitti.css:
       * .satelliitti-piste { width: 0; height: 0 }) — se on ankkuri,
       * ja pelaajan näkemä pinta on sen YDIN. Mitta luetaan siis
       * ytimestä; muuten mittari ilmoittaisi nollaa näkyvää pistettä
       * silloinkin kun ruutu on niitä täynnä (mitattu 16.9.2026).
       */
      const ydin = el.querySelector('.satelliitti-ydin') ?? el;
      const b = ydin.getBoundingClientRect();
      return {
        x: +(b.left + b.width / 2 - r.left).toFixed(1),
        y: +(b.top + b.height / 2 - r.top).toFixed(1),
        koko: +b.width.toFixed(1),
        nakyy: maalattu(ydin),
      };
    })
    .filter((p) => p.x > 0 && p.y > 0 && p.x < r.width && p.y < r.height);
  const nakyvat = pisteet.filter((p) => p.nakyy);
  /*
   * KLIKATTAVUUS: mikä elementti on pisteen kohdalla päällimmäisenä?
   * Kalvo EI saa olla se — muuten varjo söisi napautuksen. Merkit ovat
   * pointer-events: none, joten oikea vastaus on pallon oma kangas tai
   * sen kotelo (napautus lasketaan lähimpään kohteeseen).
   */
  const kohdalla = nakyvat.slice(0, 3).map((p) => {
    const el = document.elementFromPoint(r.left + p.x, r.top + p.y);
    return el ? `${el.tagName.toLowerCase()}.${(el.className?.baseVal ?? el.className ?? '').toString().split(' ')[0]}` : 'null';
  });
  const kalvonTyyli = kalvo ? getComputedStyle(kalvo) : null;
  /*
   * PISTEEN ULKOASU MAALATUSTA TULOKSESTA (omistaja 16.9.2026: pelkkä
   * vihreä piste ilman ympyrää ja hohtoa). Luetaan ensimmäisestä
   * kameran puolen merkistä; kaikki merkit saavat saman säännön.
   */
  const ekaMerkki = [...document.querySelectorAll('.satelliitti-piste')]
    .find((el) => !el.closest('.pallolauta-takana'));
  const ydin = ekaMerkki?.querySelector('.satelliitti-ydin');
  const osumaAla = ekaMerkki?.querySelector('.satelliitti-osuma');
  /* LISÄYS 16 kohta 45: valaiseva sädekehä on oma kerroksensa. */
  const sadekeha = ekaMerkki?.querySelector('.satelliitti-sadekeha');
  const yt = ydin ? getComputedStyle(ydin) : null;
  const ot = osumaAla ? getComputedStyle(osumaAla) : null;
  const st = sadekeha ? getComputedStyle(sadekeha) : null;
  const piste = {
    halkaisija: yt ? +parseFloat(yt.width).toFixed(1) : null,
    tausta: yt?.backgroundColor ?? null,
    /* LISÄYS 15 kohta 41: hehku on liu'ussa, joten taustakuva kuuluu mittaan. */
    taustakuva: (yt?.backgroundImage ?? '').slice(0, 160),
    varjo: yt?.boxShadow ?? null,
    reunanLeveys: yt ? +parseFloat(yt.borderTopWidth).toFixed(1) : null,
    reunanVari: yt?.borderTopColor ?? null,
    osumanLeveys: ot ? +parseFloat(ot.width).toFixed(1) : null,
    osumanTausta: ot?.backgroundColor ?? null,
    kehanLeveys: st ? +parseFloat(st.width).toFixed(1) : null,
    kehanSekoitus: st?.mixBlendMode ?? null,
    kehanTaustakuva: (st?.backgroundImage ?? '').slice(0, 200),
    kehanVarjo: st?.boxShadow ?? null,
    renkaita: document.querySelectorAll('.satelliitti-rengas, .satelliitti-hehku').length,
    // Hohtoa voi tulla myös suodattimesta tai ulommasta kääreestä.
    suodatin: yt?.filter ?? null,
    merkinVarjo: ekaMerkki ? getComputedStyle(ekaMerkki).boxShadow : null,
  };
  return {
    piste,
    kotelo: { leveys: Math.round(r.width), korkeus: Math.round(r.height) },
    kalvoDomissa: Boolean(kalvo),
    kalvonOsoitin: kalvonTyyli?.pointerEvents ?? null,
    kalvoMerkkienAlla: Boolean(kalvo?.nextElementSibling),
    issDomissa: Boolean(iss),
    issPeitto: iss ? Number(getComputedStyle(iss).opacity) : null,
    issLeveys: iss ? Math.round(iss.getBoundingClientRect().width) : 0,
    radanPituus: d.length,
    radanJaksoja: d ? d.split('M').length - 1 : 0,
    radanPisteita: d ? d.split('L').length - 1 : 0,
    pisteita: pisteet.length,
    pisteitaNakyvissa: nakyvat.length,
    pisteitaVarjonPuolella: nakyvat.filter((p) => p.x < r.width / 2).length,
    kohdalla,
    korkeus: +pallo.pointOfView().altitude.toFixed(3),
    avaruus: ui.pallolinssi?.kahva?.avaruus?.tila?.() ?? null,
  };
};

/*
 * KYLLÄISYYS MITATAAN SIITÄ SAMASTA KUVASTA, jonka linssi lataa —
 * pienennettynä 256 × 128:aan, koska keskiarvo ei tarvitse kahdeksaa
 * miljoonaa pikseliä. Sama kuva ladotaan kahdesti: ilman suodatinta ja
 * suodattimella, ja molemmista lasketaan HSL-kylläisyyden keskiarvo
 * (vain läpinäkymättömistä pikseleistä — navat ovat alfaltaan nolla).
 */
const KYLLAISYYS = async ([osoite, kerroin]) => {
  const kuva = await new Promise((valmis, virhe) => {
    const k = new Image();
    k.crossOrigin = 'anonymous';
    k.onload = () => valmis(k);
    k.onerror = virhe;
    k.src = osoite;
  });
  const mittaa = (suodatin) => {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 128;
    const ctx = c.getContext('2d');
    ctx.filter = suodatin;
    const tuettu = ctx.filter === suodatin;
    ctx.drawImage(kuva, 0, 0, 256, 128);
    const d = ctx.getImageData(0, 0, 256, 128).data;
    let summa = 0; let n = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 200) continue;
      const r = d[i] / 255; const g = d[i + 1] / 255; const b = d[i + 2] / 255;
      const max = Math.max(r, g, b); const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      const s = max === min ? 0 : (max - min) / (l > 0.5 ? 2 - max - min : max + min);
      summa += s; n += 1;
    }
    return { kyllaisyys: n ? summa / n : 0, pikseleita: n, tuettu };
  };
  const ennen = mittaa('none');
  const jalkeen = mittaa(`saturate(${kerroin})`);
  return {
    ennen: +ennen.kyllaisyys.toFixed(4),
    jalkeen: +jalkeen.kyllaisyys.toFixed(4),
    suhde: +(jalkeen.kyllaisyys / (ennen.kyllaisyys || 1)).toFixed(3),
    suodatinTuettu: jalkeen.tuettu,
    pikseleita: ennen.pikseleita,
  };
};
/*
 * KEHYSTEN ODOTUS ENNEN MITTAUSTA. Linssi sulkee karttapinnat OMASSA
 * kehyssilmukassaan, ja laattakerros luo uuden verkon aina kun sen
 * tekstuuri saapuu verkosta. Oikealla laitteella väli on yksi kehys
 * (16 ms) eikä näy, mutta konttiympäristön SwiftShader piirtää 2–3
 * kehystä sekunnissa, jolloin juuri saapunut laatta ehtii olla
 * ruudulla kolmanneksen sekunnin. Mittaus odottaa siksi, että laattojen
 * pyyntöjono on tyhjentynyt ja sen jälkeen kolme kehystä.
 */
async function rauhoitu(s) {
  await s.waitForTimeout(2500);
  await s.evaluate(() => new Promise((r) => {
    let n = 3;
    const askel = () => { n -= 1; if (n <= 0) r(); else requestAnimationFrame(askel); };
    requestAnimationFrame(askel);
  }));
}

const PELITILA = () => {
  const { game } = window.matkakirja;
  return JSON.stringify({
    vaihe: game.phase, paikka: game.player.pos, rahat: game.player.money,
    tallennus: (localStorage.getItem('matkakirja-save') ?? '').length,
  });
};

async function avaaPeli(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    /*
     * LINSSI LAUKKUUN. Pelaaja löytää sen pelistä (js/linssit/omistus.js);
     * savuke ei pelaa sitä läpi vaan antaa linssin samalla kentällä,
     * johon myonna() sen kirjoittaa. AVAAMINEN tehdään sen jälkeen
     * pelaajan omilla eleillä (avaaLinssiEleella).
     */
    game.player.linssit = [...(game.player.linssit ?? []), 'satelliitti'];
    ui.render();
  });
  const ok = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1800);
  // Saapumispinnat pois: ne peittäisivät pallon eivätkä kuulu linssiin.
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(500);
  await s.evaluate(() => {
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1200);
  return ok;
}

/*
 * LINSSI AUKI PELAAJAN OMILLA ELEILLÄ (ks. tiedoston alku, kohta A).
 *
 * Kolme napautusta, samat kuin pelaajalla:
 *   1. #turn-pill avaa matkalaukun (js/ui.js, index.html),
 *   2. button[data-linssi="satelliitti"] valitsee ruudun laukussa
 *      (js/ui.js linssiLiuska) — tämä EI vielä sytytä linssiä,
 *   3. .linssi-aktivoi sytyttää sen ja sulkee laukun (aktivoiLinssi).
 *
 * Jos jokin näistä puuttuu, savuke kaatuu tähän — ja juuri se on
 * tarkoitus: silloin pelaaja ei pääse linssiin lainkaan, eikä muilla
 * väitteillä ole väliä.
 */
async function avaaLinssiEleella(s, odota = 4500, ennenAktivointia = null) {
  /*
   * NAPAUTUS ELI EI MITÄÄN MUUTA. Kontin ohjelmisto-WebGL piirtää
   * puhelinmitalla (dpr 2) pari kehystä sekunnissa, ja Playwrightin
   * oma odotus napautuksen jälkeen ehtii aikakatkaista vaikka
   * painallus on jo mennyt perille (mitattu 16.9.2026). Sama ele
   * tehdään silloin suoraan elementistä — pelaajan reitti ei muutu,
   * vain savukkeen tapa painaa.
   */
  await s.click('#turn-pill', { timeout: 20000 })
    .catch(() => s.evaluate(() => document.getElementById('turn-pill')?.click()));
  await s.waitForTimeout(1200);
  const ruutu = s.locator('button[data-linssi="satelliitti"]');
  await ruutu.waitFor({ timeout: 15000 });
  await ruutu.scrollIntoViewIfNeeded();
  await ruutu.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('button[data-linssi="satelliitti"]')?.click()));
  await s.waitForTimeout(700);
  const aktivoi = s.locator('.linssi-aktivoi');
  await aktivoi.waitFor({ timeout: 15000 });
  await aktivoi.scrollIntoViewIfNeeded();
  // Mittauskello juuri ennen aktivointia (LISÄYS 13 kohta 36).
  if (ennenAktivointia) await s.evaluate(ennenAktivointia);
  await aktivoi.click({ timeout: 20000 })
    .catch(() => s.evaluate(() => document.querySelector('.linssi-aktivoi')?.click()));
  await s.waitForTimeout(odota);
  return s.evaluate(() => ({
    linssi: window.matkakirja.ui.linssiValittu,
    laukku: Boolean(document.getElementById('passport-dialog')?.open),
  }));
}

/*
 * ── SAFARIN RAJAT SELAIMEEN (väite 8) ─────────────────────────────
 *
 * Kontissa on vain Chromium, joten iOS Safarin kaksi kohtalokasta
 * ominaisuutta pannaan päälle käsin ennen yhtään sivuskriptiä:
 *
 *   1. `ctx.filter` ei ole olemassa (Safari 16 ja vanhemmat).
 *   2. Kangas, joka ylittää katon, on TYHJÄ ilman poikkeusta — juuri
 *      tämä hiljainen epäonnistuminen teki pallosta mustan.
 *
 * Jäljitelmä on karkea mutta osuu siihen, mikä merkitsee: ketju ei saa
 * jäädä mustaan, vaan sen on pudottava generoituun vyöhykepalloon tai
 * pienempään kankaaseen.
 */
const SAFARI_JARJESTELY = (kattoPx) => `(() => {
  const P = CanvasRenderingContext2D.prototype;
  try { Object.defineProperty(P, 'filter', { get: () => 'none', set: () => {}, configurable: true }); } catch (e) {}
  const alku = P.getImageData;
  P.getImageData = function (x, y, w, h) {
    const c = this.canvas;
    if (c && c.width * c.height > ${kattoPx}) {
      return new ImageData(new Uint8ClampedArray(4 * Math.max(1, w) * Math.max(1, h)), Math.max(1, w), Math.max(1, h));
    }
    return alku.call(this, x, y, w, h);
  };
})()`;

/** Pallon keskipisteen kirkkaus kuvakaappauksesta. */
function keskipisteenKirkkaus(kuva, { keskiX, keskiY, dpr }) {
  return kirkkaus(kuva, keskiX * dpr, keskiY * dpr, 6);
}

async function ajaNakyma(nimi) {
  const virheet = [];
  const konteksti = await selain.newContext({
    ...NAKYMAT[nimi], serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const s = await konteksti.newPage();
  s.on('pageerror', (e) => virheet.push(String(e)));
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const t = (x) => `${x} (${nimi})`;
  const dpr = NAKYMAT[nimi].deviceScaleFactor ?? 1;

  await avaaPeli(s);
  /*
   * AVAUSAJO MITATAAN HETI. Odotus on lyhyt (600 ms) eikä 4,5 s, koska
   * ajo kestää viisi sekuntia: pitkä odotus katsoisi vasta valmista
   * loppuasentoa eikä näkisi alkua lainkaan. Kahva haetaan kyselyllä,
   * jotta mittaus osuu heti kun linssi on olemassa.
   */
  const ele = await avaaLinssiEleella(s, 600);
  vaadi(t('linssi aukeaa pelaajan omalla eleellä'), ele.linssi === 'satelliitti',
    `linssi ${ele.linssi}`);
  await s.waitForFunction(
    () => Boolean(window.matkakirja?.ui?.pallolinssi?.kahva?.avaruus?.tila?.()),
    null, { timeout: 60000 },
  ).catch(() => {});
  const alku = await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila());
  vaadi(t('avausajo on käynnissä ja pallo näkyy ensin kokonaan'),
    alku?.avausajo?.kaynnissa === true && alku.avausajo.osuus < 0.6
      && alku.halkaisijaAlussaPx / Math.min(alku.kotelo.leveys, alku.kotelo.korkeus) >= 0.6
      && alku.halkaisijaAlussaPx / Math.min(alku.kotelo.leveys, alku.kotelo.korkeus) <= 0.7,
    `osuus ${alku?.avausajo?.osuus} (${alku?.avausajo?.kulunutMs} ms ajettu),`
    + ` halkaisija alussa ${alku?.halkaisijaAlussaPx} px /`
    + ` ruutu ${alku?.kotelo?.leveys} × ${alku?.kotelo?.korkeus},`
    + ` nyt ${alku?.halkaisijaNytPx} px, säde ${alku?.kalvo?.sadePx}`);
  // Ajo perille (kesto 5 s + kontin hitaus): odotetaan sen loppumista.
  await s.waitForFunction(
    () => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila()?.avausajo?.kaynnissa === false,
    null, { timeout: 120000 },
  ).catch(() => {});
  const loppu = await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila());
  const kapein = Math.min(loppu.kotelo.leveys, loppu.kotelo.korkeus);
  const kasvu = loppu.halkaisijaNytPx / (alku.halkaisijaAlussaPx || 1);
  vaadi(t('pallo kasvaa avausajossa vähintään 1,3× ja peittää melkein koko ruudun'),
    kasvu >= 1.3 && loppu.halkaisijaNytPx / kapein >= 0.9
      && loppu.halkaisijaNytPx / kapein <= 0.95,
    `${alku.halkaisijaAlussaPx} → ${loppu.halkaisijaNytPx} px (${kasvu.toFixed(2)}×,`
    + ` ${(100 * loppu.halkaisijaNytPx / kapein).toFixed(1)} % ruudusta)`);
  /*
   * REUNAVARJON SÄDE LUETAAN KAMERAN KORKEUDESTA JOKA KEHYKSELLÄ.
   * Väite: kalvon säde kasvoi samassa suhteessa kuin pallo. Jos se
   * luettaisiin vain avattaessa, varjo jäisi zoomin jälkeen pallon
   * sisään renkaaksi.
   */
  const sadeKasvu = (loppu.kalvo?.sadePx ?? 0) / (alku.kalvo?.sadePx || 1);
  vaadi(t('reunavarjon säde seuraa zoomia'),
    Math.abs(loppu.kalvo.sadePx * 2 - loppu.halkaisijaNytPx) <= 2 && sadeKasvu > 1.15,
    `säde ${alku.kalvo?.sadePx} → ${loppu.kalvo?.sadePx} px (${sadeKasvu.toFixed(2)}×),`
    + ` pallo ${loppu.halkaisijaNytPx} px`);

  /* ---- hidas pyöriminen ja sen pysähtyminen ------------------------ */
  const lng = () => s.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView().lng);
  const kulma = (a, b) => {
    let d = b - a;
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    return d;
  };
  const a1 = await lng();
  await s.waitForTimeout(4000);
  const a2 = await lng();
  const nopeus = Math.abs(kulma(a1, a2)) / 4;
  vaadi(t('pallo jää pyörimään hitaasti ajon jälkeen'),
    loppu.pyorii === true && nopeus > 0.05 && nopeus < 0.6,
    `${a1.toFixed(3)}° → ${a2.toFixed(3)}° = ${nopeus.toFixed(3)} °/s`
    + ` (tilaus 0,16; kirjaston autoRotateSpeed ${loppu.pyorimisenNopeus})`);
  /*
   * PELAAJAN OTE PYSÄYTTÄÄ. Veto pallon yli: sormi alas, liike, ylös —
   * sama ele, jolla pelaaja kääntää palloa.
   *
   * LIUKU ODOTETAAN TILASTA, EI KELLOSTA (Mac 17.9.2026). Vedon jälkeen
   * pallo jatkaa liukua (js/pallo.js `vauhti`). Vaimennus on jo
   * AIKASIDONNAINEN — `Math.exp(-VAUHTI_KITKA * dt)`, dt millisekunteina
   * — joten kehysluku ei muuta liu'un kestoa, EIKÄ PELIKOODIIN
   * KOSKETA. Liu'un PITUUS riippuu silti alkunopeudesta, ja se taas
   * syntyy vedon näytevälistä: Playwrightin `mouse.move` lähtee Macilla
   * peräkkäisinä millisekunteina (`dt = Math.max(1, …)`), jolloin
   * asteet/ms on moninkertainen kontin hitaaseen vetoon verrattuna.
   * Ero kynnykseen (0,0006 °/ms) on logaritminen: kymmenkertainen
   * alkunopeus = noin 820 ms lisää liukua. Kiinteä 2 s ei siis riitä
   * Macilla, ja mittari luki liu'un loppuhäntää (0,088–0,161° / 2 s).
   *
   * Nyt odotetaan PALLON LEPOA: `vauhti.raf` on nolla (liuku ei ole
   * kesken) JA kulma on pysynyt 300 ms:n ikkunassa hitaampana kuin
   * väitteen oma raja. Sama ehto pätee 60 ja 120 hertsillä.
   */
  const keskiX = Math.round(NAKYMAT[nimi].viewport.width / 2);
  const keskiY = Math.round(NAKYMAT[nimi].viewport.height / 2);
  await s.mouse.move(keskiX, keskiY);
  await s.mouse.down();
  for (let i = 1; i <= 5; i += 1) await s.mouse.move(keskiX - i * 8, keskiY);
  await s.mouse.up();
  const lepo = await s.evaluate(async (katto) => {
    const pov = () => window.matkakirja.ui.pallonInstanssi.pointOfView();
    const ero = (a, b) => { let d = b - a; while (d > 180) d -= 360; while (d < -180) d += 360; return d; };
    const alku = performance.now();
    let kehyksia = 0;
    let viiteAika = alku;
    let viiteLng = pov().lng;
    let liukuLoppui = null;
    let rauhoittui = null;
    while (performance.now() - alku < katto) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => requestAnimationFrame(r));
      kehyksia += 1;
      const nyt = performance.now();
      const liukuu = Boolean(window.matkakirja.ui.pallonVauhti?.raf);
      if (!liukuu && liukuLoppui === null) liukuLoppui = Math.round(nyt - alku);
      if (liukuu) { viiteAika = nyt; viiteLng = pov().lng; continue; }
      if (nyt - viiteAika < 300) continue;
      // Raja = väitteen oma raja (0,05° / 2 s) tälle ikkunalle.
      const raja = 0.05 * ((nyt - viiteAika) / 2000);
      if (Math.abs(ero(viiteLng, pov().lng)) <= raja) { rauhoittui = Math.round(nyt - alku); break; }
      viiteAika = nyt; viiteLng = pov().lng;
    }
    const kesto = performance.now() - alku;
    return {
      liukuLoppui,
      rauhoittui,
      odotettuMs: Math.round(kesto),
      kehyksia,
      kehysluku: Math.round((1000 * kehyksia) / Math.max(1, kesto)),
    };
  }, 20000);
  const b1 = await lng();
  await s.waitForTimeout(2000);
  const b2 = await lng();
  const jaljella = Math.abs(kulma(b1, b2));
  const pyoriiEnaa = await s.evaluate(
    () => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila().pyorii,
  );
  vaadi(t('pyöriminen loppuu, kun pelaaja tarttuu palloon'),
    pyoriiEnaa === false && jaljella < 0.05 && lepo.rauhoittui !== null,
    `pyörii ${pyoriiEnaa}, kulma ${b1.toFixed(3)}° → ${b2.toFixed(3)}° (${jaljella.toFixed(3)}°),`
    + ` liuku loppui ${lepo.liukuLoppui} ms, lepo ${lepo.rauhoittui} ms`
    + ` (odotettu ${lepo.odotettuMs} ms, ${lepo.kehysluku} fps)`);
  vaadi(t('VASTAKOE: sama mittari näki liikkeen ennen tarttumista'),
    Math.abs(kulma(a1, a2)) > jaljella * 4 && Math.abs(kulma(a1, a2)) > 0.2,
    `ennen ${Math.abs(kulma(a1, a2)).toFixed(3)}°, jälkeen ${jaljella.toFixed(3)}° (2 s)`);

  await rauhoitu(s);
  const linssi = await s.evaluate(MITAT);

  /* ---- 1. ISS ------------------------------------------------------ */
  vaadi(t('ISS-merkki on DOMissa pallon kotelossa'),
    linssi.issDomissa && linssi.issLeveys >= 6 && linssi.issLeveys <= 10,
    `merkki ${linssi.issDomissa}, halkaisija ${linssi.issLeveys} px`);
  /*
   * PALLO KÄÄNNETÄÄN ISS:N KOHDALLE. Rata kiertää koko pallon, joten
   * merkki on puolet kierroksesta takapuolella — mittari ei saa
   * riippua siitä, mihin kohtaan rataa savuke sattuu osumaan. Kamera
   * viedään merkin pituuspiirille, jolloin se on varmasti edessä.
   */
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const tila = ui.pallolinssi.kahva.avaruus.tila();
    const iss = tila?.kalvo?.iss;
    if (!iss) return;
    const pov = ui.pallonInstanssi.pointOfView();
    ui.pallonInstanssi.pointOfView({ ...pov, lat: 0, lng: iss.lng }, 0);
    ui.pallolauta.heraa();
  });
  await s.waitForTimeout(1200);
  const paikka1 = (await s.evaluate(MITAT)).avaruus?.kalvo?.iss ?? null;
  await s.waitForTimeout(2000);
  const mitat2 = await s.evaluate(MITAT);
  const paikka2 = mitat2.avaruus?.kalvo?.iss ?? null;
  const siirtyi = paikka1?.x != null && paikka2?.x != null
    ? Math.hypot(paikka2.x - paikka1.x, paikka2.y - paikka1.y) : 0;
  vaadi(t('ISS:n ruutupaikka muuttuu kahdessa sekunnissa'),
    Boolean(paikka1) && Boolean(paikka2) && siirtyi > 2,
    `${JSON.stringify(paikka1)} → ${JSON.stringify(paikka2)}, ${siirtyi.toFixed(1)} px`);
  vaadi(t('ISS näkyy pallon etupuolella ja piiloutuu taakse'),
    paikka1?.nakyvissa === true && mitat2.issPeitto > 0,
    `nakyvissa ${paikka1?.nakyvissa}, merkin peittävyys ${mitat2.issPeitto}`);
  const kalvo1 = linssi.avaruus?.kalvo ?? {};
  vaadi(t('ratakaari on piirretty ja takapuoli karsittu'),
    linssi.radanPisteita > 10 && kalvo1.kaarenPisteita > 0
      && kalvo1.kaarenPisteita < 241,
    `svg-pisteitä ${linssi.radanPisteita}, näkyviä ${kalvo1.kaarenPisteita}/241,`
    + ` jaksoja ${linssi.radanJaksoja}`);

  /* ---- 3. auringon sivuvalo pikseleistä ----------------------------- */
  const sade = kalvo1.sadePx ?? 0;
  const keski = { keskiX: linssi.kotelo.leveys / 2, keskiY: linssi.kotelo.korkeus / 2, sade, dpr };
  const kaappaaKotelo = async () => {
    const puskuri = await s.locator('.pallo-kotelo, .pallo-kuori').first()
      .screenshot({ timeout: 120000 });
    return decodePng(puskuri);
  };
  /*
   * ── MITTAUS TEHDÄÄN PYSÄYTETYSTÄ TILASTA (17.9.2026) ─────────────
   *
   * Nämä neljä väitettä olivat HÄILYVIÄ (tools/savukkeet/sarjat.json:
   * "varjon puoli tummuu", "valon puoli kirkastuu", "varjo ei ulotu
   * puoliväliin"), ja 17.9.2026 (Actions 35221065011, PR #2555 v1931)
   * samasta juuresta tuli uusi punainen: VASTAKOE mittasi puhelimella
   * päällä 63,5 → pois 83,5 → takaisin 57,9. Takaisin oli 5,6 yksikköä
   * eri kuin päällä, vaikka kytkin oli täsmälleen samassa asennossa.
   *
   * JUURISYY: kolme kaappausta otetaan noin sekunnin välein, ja
   * kaappausten VÄLISSÄ RUUTU ELÄÄ, vaikka pallo ei pyöri
   * (MITAT-rivillä avaruus.pyorii oli false):
   *   1. ISS ja ratakaari. Kalvon `paivita` juoksee joka kehyksellä
   *      (`aika = performance.now()/1000`), ratakaari piirretään
   *      uudelleen SVG-polkuna ja merkki siirtyy. Kaari kulkee juuri
   *      REUNAN yli — sinne, mistä näytteet luetaan — ja merkillä on
   *      leveä `box-shadow`. Yksi kirkas viiva 7 × 7 pikselin
   *      näytteessä siirtää keskiarvoa kymmeniä yksiköitä.
   *   2. Tähtipölyn ajautuma (tahdet.js `kierto`) ja pinnan viimeinen
   *      lataus (reliefi 8k/4k) voivat vielä vaihtaa pikselit.
   *
   * KORJAUS: ennen ensimmäistä kaappausta odotetaan, että pinta on
   * lopullinen (reliefin lataus ohi ja `pinnanOsoite` sama viidellä
   * peräkkäisellä lukemalla), pyöriminen pannaan varmuuden vuoksi pois
   * ja kalvon LIIKKUVAT osat (.astro-rata ja .astro-iss) piilotetaan
   * mittauksen ajaksi — varjo ja valoreuna, joita väitteet koskevat,
   * jäävät paikalleen. Kamera-asento luetaan ennen ja jälkeen: kaikki
   * kolme kaappausta ovat samasta asennosta. Lisäksi jokainen näyte
   * otetaan VASTA KUN KAKSI PERÄKKÄISTÄ LUKEMAA OVAT SAMAT — jos ruutu
   * yhä eläisi, se näkyy omana punaisenaan eikä satunnaisena
   * häilyvyytenä. Toleranssit pysyvät ennallaan.
   */
  await s.waitForFunction(() => {
    const tila = window.matkakirja.ui.pallolinssi.kahva.avaruus.tila();
    const nyt = `${tila.pinnanOsoite}|${tila.reliefinTarkkuus}|${tila.reliefi}`;
    const muisti = window.__astroPinnanVakaus ?? { arvo: null, kerrat: 0 };
    if (muisti.arvo === nyt) muisti.kerrat += 1;
    else { muisti.arvo = nyt; muisti.kerrat = 0; }
    window.__astroPinnanVakaus = muisti;
    return tila.reliefinKestoMs > 0 && muisti.kerrat >= 5;
  }, null, { timeout: 90000 }).catch(() => {});
  const povTeksti = (p) => (p ? `${p.lat.toFixed(3)},${p.lng.toFixed(3)},${p.altitude.toFixed(4)}` : 'null');
  /*
   * ── PILVIKUORI POIS MYÖS TÄSTÄ MITTAUKSESTA (19.9.2026) ─────────
   *
   * Aito NASA-pilvikuva (PAATOKSET 43 kohta 7) kaatoi kolme väitettä
   * tästä lohkosta, eikä vika ollut varjossa vaan näkökentässä:
   * kuori (säde 1,01, peitto kaukaa 0,9) on TÄSMÄLLEEN näytepisteiden
   * ja pinnan välissä, ja se PYÖRII omaa tahtiaan
   * (PILVIEN_KIERTO_ASTETTA_MIN) — terävä pilvireuna näytteen päällä
   * liikkuu joka kehyksellä, joten "pysäytetty tila" ei ollut
   * pysähtynyt (peräkkäisten näytteiden ero 0,9 ja 2, raja 0,5), ja
   * "keskusta jää koskematta" luki pilviä (143,2 → 146,9).
   *
   * Sama lääke kuin `pinnanKirkkaus`illa (3a30fbf8): kuori pois
   * piirrosta `visible`-lipulla mittauksen ajaksi ja takaisin heti
   * perään. Varjo, valoreuna ja keskusta ovat PINNAN ilmiöitä, ja
   * juuri niitä nämä väitteet koskevat. Pilvien oma näkyvyys on
   * savuke-astro-sumun asia.
   */
  const jaadytys = await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const ohjaimet = ui.pallonInstanssi.controls?.();
    const pyoriEnnen = ohjaimet ? Boolean(ohjaimet.autoRotate) : null;
    if (ohjaimet) ohjaimet.autoRotate = false;
    const tyyli = document.createElement('style');
    tyyli.id = 'astro-mittauksen-jaadytys';
    /*
     * AVARUUSSUMUN KALVOT MYÖS POIS (19.9.2026). Ne ovat CSS-kalvoja
     * kotelon päällä ja AJELEHTIVAT joka kehyksellä
     * (`backgroundPosition` kellosta, peitto tässä korkeudessa noin
     * 0,39) — kaappaus kaappaa ne mukaan, joten "pysäytetty tila" ei
     * ollut pysähtynyt (peräkkäisten näytteiden ero 0,9, raja 0,5).
     * Nämä väitteet koskevat PINNAN reunavarjoa; sumu on oma
     * kerroksensa ja sen mittaa savuke-astro-sumu.
     */
    tyyli.textContent = '.astro-rata, .astro-iss, .astro-sumu'
      + ' { display: none !important; }';
    document.head.appendChild(tyyli);
    const pilvetPiiloon = Boolean(ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(true));
    const pilvienPeitto = ui.pallolinssi?.kahva?.avaruus?.tila?.()?.sumu?.pilvet ?? null;
    ui.pallolauta?.heraa?.();
    const p = ui.pallonInstanssi.pointOfView();
    return {
      pyoriEnnen, pilvetPiiloon, pilvienPeitto,
      pov: { lat: p.lat, lng: p.lng, altitude: p.altitude },
    };
  });
  const purajaadytys = () => s.evaluate((pyoriEnnen) => {
    document.getElementById('astro-mittauksen-jaadytys')?.remove();
    window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(false);
    const ohjaimet = window.matkakirja.ui.pallonInstanssi.controls?.();
    if (ohjaimet && pyoriEnnen !== null) ohjaimet.autoRotate = pyoriEnnen;
    window.matkakirja.ui.pallolauta?.heraa?.();
  }, jaadytys.pyoriEnnen);
  /** Suurin ero kahden näytteen välillä (kaikki mittauskohdat). */
  const naytteidenEro = (a, b) => Math.max(...['vasenKa', 'oikeaKa', 'keskustaKa',
    'puolivaliVasenKa', 'puolivaliOikeaKa'].map((k) => Math.abs(a[k] - b[k])));
  const VAKAUDEN_RAJA = 0.5;
  /*
   * VAKAA NÄYTE: kaappaa, kaappaa uudestaan, ja hyväksy vasta kun
   * lukemat ovat samat. Jos ruutu ei rauhoitu neljässä yrityksessä,
   * palautetaan `vakaa: false` — se on oma väitteensä alempana.
   */
  const vakaaNayte = async () => {
    let edellinen = naytteet(await kaappaaKotelo(), keski);
    let ero = Infinity;
    for (let i = 0; i < 4; i += 1) {
      await s.waitForTimeout(250);
      const nyt = naytteet(await kaappaaKotelo(), keski);
      ero = naytteidenEro(edellinen, nyt);
      edellinen = nyt;
      if (ero <= VAKAUDEN_RAJA) break;
    }
    return { ...edellinen, vakaa: ero <= VAKAUDEN_RAJA, ero: +ero.toFixed(2) };
  };
  const paalla = await vakaaNayte();
  await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.asetaVarjostus(false));
  await s.waitForTimeout(600);
  const pois = await vakaaNayte();
  await s.evaluate(() => window.matkakirja.ui.pallolinssi.kahva.avaruus.asetaVarjostus(true));
  await s.waitForTimeout(600);
  const takaisin = await vakaaNayte();
  const povLopussa = await s.evaluate(() => {
    const p = window.matkakirja.ui.pallonInstanssi.pointOfView();
    return { lat: p.lat, lng: p.lng, altitude: p.altitude };
  });
  const kameraLiikkui = Math.abs(povLopussa.lat - jaadytys.pov.lat) > 0.01
    || Math.abs(povLopussa.lng - jaadytys.pov.lng) > 0.01
    || Math.abs(povLopussa.altitude - jaadytys.pov.altitude) > 0.001;

  /*
   * TÄMÄ VÄITE ON MUIDEN KOLMEN EHTO: jos ruutu ei ole pysähtynyt,
   * varjon mittaus ei mittaa varjoa vaan liikettä.
   */
  vaadi(t('varjomittaus tehdään pysäytetystä tilasta ja samasta kamera-asennosta'),
    paalla.vakaa && pois.vakaa && takaisin.vakaa && !kameraLiikkui,
    `peräkkäisten näytteiden ero: päällä ${paalla.ero}, pois ${pois.ero},`
    + ` takaisin ${takaisin.ero} (raja ${VAKAUDEN_RAJA}); kamera`
    + ` ${povTeksti(jaadytys.pov)} → ${povTeksti(povLopussa)};`
    + ` pilvikuori piilossa ${jaadytys.pilvetPiiloon} (peitto ${jaadytys.pilvienPeitto})`);

  vaadi(t('varjon puoli tummuu reunan tuntumassa'),
    paalla.vasenKa < pois.vasenKa * 0.92,
    `vasen ${pois.vasenKa} → ${paalla.vasenKa} (näytteet ${pois.vasen} → ${paalla.vasen})`);
  vaadi(t('valon puoli kirkastuu reunan tuntumassa'),
    paalla.oikeaKa > pois.oikeaKa + 1,
    `oikea ${pois.oikeaKa} → ${paalla.oikeaKa} (näytteet ${pois.oikea} → ${paalla.oikea})`);
  vaadi(t('keskusta jää koskematta'),
    Math.abs(paalla.keskustaKa - pois.keskustaKa) < 2,
    `keskusta ${pois.keskustaKa} → ${paalla.keskustaKa}`);
  /*
   * VARJO ON REUNAN OMA. Puolivälissä (0,5 × säde) ei saa tapahtua
   * mitään — muuten kyseessä olisi koko pallon himmennys eikä
   * auringon sivuvalo. Reunan ja keskustan SUORA vertailu ei kelpaa
   * väitteeksi (mitattu 16.9.2026 puhelimella: varjon puolella sattui
   * olemaan kirkasta maata, 113 vs. keskusta 83) — maasto vaihtelee
   * enemmän kuin varjo, joten mittari lukee saman pikselin ennen ja
   * jälkeen.
   */
  vaadi(t('varjo ei ulotu puoliväliin asti'),
    Math.abs(paalla.puolivaliVasenKa - pois.puolivaliVasenKa) < 2
      && Math.abs(paalla.puolivaliOikeaKa - pois.puolivaliOikeaKa) < 2,
    `puoliväli vasen ${pois.puolivaliVasenKa} → ${paalla.puolivaliVasenKa},`
    + ` oikea ${pois.puolivaliOikeaKa} → ${paalla.puolivaliOikeaKa}`);
  vaadi(t('varjon syvyys on tilauksen luokkaa reunan tuntumassa'),
    (pois.vasenKa - paalla.vasenKa) / (pois.vasenKa || 1) > 0.08,
    `pudotus ${(100 * (pois.vasenKa - paalla.vasenKa) / (pois.vasenKa || 1)).toFixed(0)} %`
    + ` (reuna ${pois.vasenKa} → ${paalla.vasenKa}, keskusta ${paalla.keskustaKa})`);
  vaadi(t('VASTAKOE: kytkin pois palauttaa pikselit'),
    Math.abs(takaisin.vasenKa - paalla.vasenKa) < 3 && pois.vasenKa > paalla.vasenKa,
    `päällä ${paalla.vasenKa}, pois ${pois.vasenKa}, takaisin ${takaisin.vasenKa}`
    + ` (peräkkäisten näytteiden ero ${paalla.ero}/${pois.ero}/${takaisin.ero})`);
  // Jäädytys puretaan heti: loput väitteet katsovat pelaajan omaa ruutua.
  await purajaadytys();

  /* ---- 5. kylläisyys ------------------------------------------------ */
  const kylla = await s.evaluate(KYLLAISYYS, [linssi.avaruus?.reliefinOsoite, 0.8]);
  vaadi(t('reliefin kylläisyys on mitattu alas'),
    kylla.jalkeen < kylla.ennen && kylla.suhde < 0.95,
    `${kylla.ennen} → ${kylla.jalkeen} (suhde ${kylla.suhde}, suodatin ${kylla.suodatinTuettu})`);

  /* ---- 6. kohdepisteet ---------------------------------------------- */
  vaadi(t('kohdepisteet ovat yhä ruudulla, myös varjon puolella'),
    linssi.pisteitaNakyvissa >= 5 && linssi.pisteitaVarjonPuolella >= 1,
    `${linssi.pisteitaNakyvissa}/${linssi.pisteita} näkyvissä, varjon puolella `
    + `${linssi.pisteitaVarjonPuolella}`);
  /*
   * YKSI HEHKUVA VIHREÄ PISTE. Väite luetaan maalatusta tuloksesta eikä
   * tyylitiedostosta: halkaisija ≤ 9 px, `box-shadow` none, reunan
   * leveys 0 — eikä sädekehää tai rengasta ole enää olemassa.
   *
   * ODOTUSARVO PÄIVITETTY 17.9.2026 (LISÄYS 15 kohta 41): vihreä ei ole
   * enää `background-color` vaan radial-gradient, jonka keskusta on
   * kirkas ja reuna häipyy. Väri etsitään siis taustakuvasta, ja
   * tasainen taustaväri on nyt nimenomaan VÄÄRIN (se olisi se tasainen
   * kiekko, josta omistaja halusi eroon). Hehkun oikeansuuntaisuus
   * mitataan erikseen pikseleistä (väite 41).
   */
  vaadi(t('kohdepiste on yksi hehkuva vihreä piste ilman rengasta ja hohtoa'),
    linssi.piste?.halkaisija > 0 && linssi.piste.halkaisija <= 9
      && /radial-gradient/.test(linssi.piste.taustakuva ?? '')
      && /rgb\(93, 255, 168\)/.test(linssi.piste.taustakuva ?? '')
      && /rgba\(93, 255, 168, 0\)/.test(linssi.piste.taustakuva ?? '')
      && /rgba\(0, 0, 0, 0\)|transparent/.test(linssi.piste.tausta ?? '')
      && linssi.piste.varjo === 'none' && linssi.piste.merkinVarjo === 'none'
      && linssi.piste.reunanLeveys === 0 && linssi.piste.renkaita === 0
      && (linssi.piste.suodatin === 'none' || !linssi.piste.suodatin),
    JSON.stringify(linssi.piste));
  /*
   * SÄDEKEHÄ ON OLEMASSA JA VALAISEE (LISÄYS 16 kohta 45). Luetaan
   * maalatusta tuloksesta: leveys 24–32 px, sekoitustila screen/lighten,
   * liuku häipyy nollaan eikä varjoa ole. Vanha 18 px:n RENGAS pysyy
   * poissa (renkaita === 0 yllä).
   */
  vaadi(t('45: sädekehä on ytimen ympärillä ja valaisee (screen)'),
    linssi.piste?.kehanLeveys >= 24 && linssi.piste.kehanLeveys <= 32
      && /screen|lighten/.test(linssi.piste.kehanSekoitus ?? '')
      && /radial-gradient/.test(linssi.piste.kehanTaustakuva ?? '')
      && /rgba\(93, 255, 168, 0\)/.test(linssi.piste.kehanTaustakuva ?? '')
      && linssi.piste.kehanVarjo === 'none'
      && linssi.piste.kehanLeveys >= linssi.piste.halkaisija * 4,
    JSON.stringify({
      leveys: linssi.piste?.kehanLeveys,
      sekoitus: linssi.piste?.kehanSekoitus,
      ydin: linssi.piste?.halkaisija,
      varjo: linssi.piste?.kehanVarjo,
    }));
  vaadi(t('osuma-ala on yhä sormen kokoinen'),
    linssi.piste?.osumanLeveys >= 32
      && /rgba\(0, 0, 0, 0\)|transparent/.test(linssi.piste.osumanTausta ?? ''),
    `osuma ${linssi.piste?.osumanLeveys} px, tausta ${linssi.piste?.osumanTausta}`);
  /*
   * VASTAKOE: mittari osaa mennä punaiseksi. Pisteelle annetaan
   * hetkeksi rengas ja hohto — jos mittari näyttää silloinkin
   * vihreää, se ei mittaa mitään. Tyyli poistetaan heti perään.
   */
  const vastakoe = await s.evaluate(() => {
    const tyyli = document.createElement('style');
    tyyli.id = 'astro-vastakoe';
    tyyli.textContent = '.satelliitti-ydin { border: 2px solid #5dffa8;'
      + ' box-shadow: 0 0 8px rgba(93,255,168,0.9); width: 18px; height: 18px; }';
    document.head.appendChild(tyyli);
    const ydin = document.querySelector('.satelliitti-piste .satelliitti-ydin');
    const t = ydin ? getComputedStyle(ydin) : null;
    const ulos = {
      halkaisija: t ? +parseFloat(t.width).toFixed(1) : null,
      varjo: t?.boxShadow ?? null,
      reunanLeveys: t ? +parseFloat(t.borderTopWidth).toFixed(1) : null,
    };
    tyyli.remove();
    return ulos;
  });
  vaadi(t('VASTAKOE: mittari näkee renkaan ja hohdon, jos ne palaavat'),
    vastakoe.halkaisija > 9 && vastakoe.varjo !== 'none' && vastakoe.reunanLeveys > 0,
    JSON.stringify(vastakoe));
  const palasi = (await s.evaluate(MITAT)).piste;
  vaadi(t('VASTAKOE purkautui: piste on taas pelkkä piste'),
    palasi?.halkaisija <= 9 && palasi.varjo === 'none' && palasi.reunanLeveys === 0,
    JSON.stringify(palasi));

  vaadi(t('kalvo ei syö napautusta eikä ole merkkien päällä'),
    linssi.kalvonOsoitin === 'none' && linssi.kalvoMerkkienAlla
      && !linssi.kohdalla.some((x) => x.includes('astro-')),
    `osoitin ${linssi.kalvonOsoitin}, merkkien alla ${linssi.kalvoMerkkienAlla},`
    + ` pisteen kohdalla ${linssi.kohdalla.join(', ')}`);
  // Napautus pisteeseen: linssin oma kortti aukeaa (osuma lasketaan
  // pallon napautuksesta, joten kalvo ei saa olla tiellä).
  /*
   * NAPAUTUS OTETAAN PALLON KESKELTÄ: reunalla merkin ruutupaikka
   * liikkuu vielä kehyksen verran (SwiftShader piirtää kontissa pari
   * kehystä sekunnissa), ja osumasäde on 44 px. Piste haetaan sen
   * jälkeen, kun paikka on ollut kaksi lukemaa paikallaan.
   */
  const vakaaPiste = async () => {
    let edellinen = null;
    for (let i = 0; i < 12; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const p = await s.evaluate(() => {
        const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori');
        const r = kotelo.getBoundingClientRect();
        const keski = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        const ehdokkaat = [...document.querySelectorAll('.satelliitti-piste')]
          .filter((e) => !e.closest('.pallolauta-takana'))
          .map((e) => (e.querySelector('.satelliitti-ydin') ?? e).getBoundingClientRect())
          .filter((b) => b.width > 0)
          .map((b) => ({ x: b.left + b.width / 2, y: b.top + b.height / 2 }))
          .map((p2) => ({ ...p2, etaisyys: Math.hypot(p2.x - keski.x, p2.y - keski.y) }))
          .sort((a, b) => a.etaisyys - b.etaisyys);
        return ehdokkaat[0] ?? null;
      });
      if (p && edellinen && Math.abs(p.x - edellinen.x) < 2 && Math.abs(p.y - edellinen.y) < 2) return p;
      edellinen = p;
      // eslint-disable-next-line no-await-in-loop
      await s.waitForTimeout(400);
    }
    return edellinen;
  };
  const AUKI = () => [...document.querySelectorAll(
    '.satelliitti-katselu, .satelliitti-kortti, .satelliitti-popup, .linssikartta-kortti, dialog[open]',
  )].map((e) => e.className || e.tagName);
  const piste = await vakaaPiste();
  const auki0 = await s.evaluate(AUKI);
  let auki1 = [];
  let osuma = null;
  if (piste) {
    /*
     * NAPAUTUS ODOTTAA TILAA, EI KELLOA (Actions 35228371442, Mac,
     * kuusi savuketta rinnakkain). Väite mittaa sen, että kalvo on
     * merkkikerroksen ALLA ja `pointer-events: none` — napautus menee
     * siis kalvon läpi pisteeseen ja avaa katselun. Kuormassa 2 500
     * ms:n kiinteä odotus loppui ennen kuin katselu ehti DOMiin, ja
     * väite luki `jälkeen []` vaikka mekanismi oli kunnossa.
     *
     * Kaksi tilaehtoa kiinteän odotuksen tilalle:
     *  1. ENNEN napautusta: `elementFromPoint` pisteessä on merkki
     *     (tai sen lapsi), ei kalvo — eli osumapinta on pystyssä.
     *     Tämä on juuri se, mitä väite väittää, ja se kirjataan.
     *  2. NAPAUTUKSEN JÄLKEEN: odotetaan katselun ilmestymistä
     *     (enintään 30 s), ei kelloa. Kuormitettu kone saa aikansa,
     *     nopea jatkaa heti.
     */
    osuma = await s.evaluate(({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      const merkki = el?.closest?.('.satelliitti-piste') ?? null;
      const kalvo = document.querySelector('.astro-kalvo, .satelliitti-kalvo');
      return {
        paalla: el ? (el.className || el.tagName) : null,
        merkissa: Boolean(merkki),
        kalvonTapahtumat: kalvo ? getComputedStyle(kalvo).pointerEvents : null,
      };
    }, piste);
    await s.mouse.click(piste.x, piste.y);
    await s.waitForFunction(
      (ennen) => [...document.querySelectorAll(
        '.satelliitti-katselu, .satelliitti-kortti, .satelliitti-popup, .linssikartta-kortti, dialog[open]',
      )].length > ennen,
      auki0.length, { timeout: 30000 },
    ).catch(() => {});
    auki1 = await s.evaluate(AUKI);
    // LISÄYS 8: `.satelliitti-sulku` osuu vain KUVAN sulkuun; linssin
    // oma ✕ on `.satelliitti-linssisulku` eikä sitä saa napauttaa tässä.
    await s.evaluate(() => document.querySelector('.satelliitti-katselu .satelliitti-sulku')?.click());
    await s.keyboard.press('Escape');
    await s.waitForTimeout(1000);
  }
  vaadi(t('kohdepiste on yhä klikattavissa'), auki1.length > auki0.length,
    `piste ${JSON.stringify(piste)}, osuma ${JSON.stringify(osuma)},`
    + ` ennen [${auki0}], jälkeen [${auki1}]`);

  /* ---- 6b. LISÄYS 15: neliöt, tähdet, hehku, vakiokoko, sävy -------- */
  /*
   * Raamattu ASTRONAUTIN KAMERA LISÄYS 15 (omistaja 17.9.2026, kohdat
   * 39–43). Viisi väitettä, jokainen omasta mekanismistaan:
   *
   *  39+44 NELIÖT JA PÖLY: kaikki kolme kerrosta (pöly mukaan lukien)
   *     on pyöristetty sävyttimessä — PointsMaterial ilman tekstuuria
   *     piirtäisi neliöitä — ja pölyn koko ruudulla pysyy katossa,
   *     korkeintaan tähti × 1,5.
   *  40 TÄHDET JA PÖLY PAIKALLAAN: otos kattaa kaikki kerrokset;
   *     hiukkasen ruutupaikka ei liiku 5 s:ssa ilman
   *     kosketusta, mutta liikkuu, kun palloa vedetään. Mittaus tehdään
   *     VASTA pyörimisen pysäyttävän vedon jälkeen (ks. väite 2), joten
   *     kirjaston autoRotate ei ole mukana luvussa.
   *  41 HEHKU: pisteen keskipiste on kirkkaampi kuin sen reuna.
   *  42 VAKIOKOKO: halkaisija ruudulla on sama kahdella zoomilla.
   *  43 SÄVY: pinnan kirkkaus laskee valkoiseen verrattuna, mutta pysyy
   *     kaukana pinta-musta-vartijan kynnyksestä.
   */
  const TAHTIOTOS = () => {
    const pallo = window.matkakirja.ui.pallonInstanssi;
    const kamera = pallo.camera?.();
    const kangas = pallo.renderer?.()?.domElement;
    if (!kamera || !kangas) return null;
    /*
     * KAIKKI HIUKKASKERROKSET, EI VAIN ENSIMMÄINEN (LISÄYS 15 kohta
     * 44): pöly on oma kerroksensa, ja juuri sen liike oli omistajan
     * huomio — otos, joka lukisi vain tähdet, olisi sokea pölylle.
     */
    const kerrokset = [];
    pallo.scene?.()?.traverse?.((o) => {
      if (o?.__globeObjType === 'particles' && o.geometry?.attributes?.position) kerrokset.push(o);
    });
    if (!kerrokset.length) return null;
    /* 4×4-kertolasku ilman THREE:ä (kirjasto ei vie luokkia ulos). */
    const kerro = (m, v) => {
      const e = m?.elements;
      if (!e) return v;
      return [
        e[0] * v[0] + e[4] * v[1] + e[8] * v[2] + e[12] * v[3],
        e[1] * v[0] + e[5] * v[1] + e[9] * v[2] + e[13] * v[3],
        e[2] * v[0] + e[6] * v[1] + e[10] * v[2] + e[14] * v[3],
        e[3] * v[0] + e[7] * v[1] + e[11] * v[2] + e[15] * v[3],
      ];
    };
    kamera.updateMatrixWorld?.();
    const ulos = [];
    for (const olio of kerrokset) {
      olio.updateMatrixWorld?.();
      const pos = olio.geometry.attributes.position;
      for (const i of [0, 7, 23, 61]) {
        if (i >= pos.count) continue;
        let v = [pos.getX(i), pos.getY(i), pos.getZ(i), 1];
        v = kerro(olio.matrixWorld, v);
        v = kerro(kamera.matrixWorldInverse, v);
        v = kerro(kamera.projectionMatrix, v);
        if (!v[3]) continue;
        ulos.push({
          x: +(((v[0] / v[3]) * 0.5 + 0.5) * kangas.clientWidth).toFixed(2),
          y: +((0.5 - (v[1] / v[3]) * 0.5) * kangas.clientHeight).toFixed(2),
        });
      }
    }
    return ulos;
  };
  const tahtitila = await s.evaluate(() => {
    const tila = window.matkakirja.ui.pallolinssi.kahva.avaruus.tila();
    const pallo = window.matkakirja.ui.pallonInstanssi;
    let kerroksia = 0;
    let nelioita = 0;
    pallo.scene?.()?.traverse?.((o) => {
      if (o?.__globeObjType !== 'particles') return;
      kerroksia += 1;
      // Neliö = Points-olio, jolla ei ole tekstuuria eikä pyöristystä.
      if (!o.material?.map && !o.material?.__tahtiPyoristetty) nelioita += 1;
    });
    return { tahdet: tila.tahdet, kerroksia, nelioita };
  });
  vaadi(t('39+44: neliöitä ei ole — pöly mukana mutta pyöristettynä'),
    tahtitila.nelioita === 0 && tahtitila.kerroksia === 3
      && tahtitila.tahdet?.polya === 1
      && tahtitila.tahdet?.ajautuvia === 0
      && tahtitila.tahdet?.pyoreita === tahtitila.tahdet?.kerroksia
      && tahtitila.tahdet?.kaannettyja === tahtitila.tahdet?.kerroksia,
    `kerroksia ${tahtitila.kerroksia}, pölyjä ${tahtitila.tahdet?.polya}, `
    + `neliöitä ${tahtitila.nelioita}, pyöreitä ${tahtitila.tahdet?.pyoreita}`);
  /*
   * 44 KOKO: yksikään hiukkanen ei saa olla ruudulla tähteä
   * suurempi kuin kertoimella 1,5. Luku lasketaan samalla kaavalla
   * kuin three.js:n sävytin (tahdet.js kokoRuudulla) ja katto on jo
   * mukana, joten mittaus vastaa sitä mitä silmä näkee.
   */
  const koot = tahtitila.tahdet?.koot ?? [];
  const polynKoko = Math.max(0, ...koot.filter((k) => k.tunnus === 'poly').map((k) => k.suurinPx));
  const tahdenKoko = Math.max(0, ...koot.filter((k) => k.tunnus !== 'poly').map((k) => k.suurinPx));
  vaadi(t('44: pölyhiukkanen korkeintaan tähti × 1,5 ruudulla'),
    koot.length === 3 && polynKoko > 0 && tahdenKoko > 0
      && polynKoko <= tahdenKoko * 1.5,
    `pöly ${polynKoko} px (rajaamatta `
    + `${koot.find((k) => k.tunnus === 'poly')?.rajaamatonPx}), tähti ${tahdenKoko} px`);
  const tahti0 = await s.evaluate(TAHTIOTOS);
  await s.waitForTimeout(5000);
  const tahti1 = await s.evaluate(TAHTIOTOS);
  const ero = (a, b) => ((a?.length && b?.length)
    ? Math.max(...a.map((p, i) => (b[i] ? Math.hypot(b[i].x - p.x, b[i].y - p.y) : 0))) : NaN);
  const levossa = ero(tahti0, tahti1);
  const kx = Math.round(NAKYMAT[nimi].viewport.width / 2);
  const ky = Math.round(NAKYMAT[nimi].viewport.height / 2);
  await s.mouse.move(kx, ky);
  await s.mouse.down();
  for (let i = 1; i <= 6; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await s.mouse.move(kx - i * 10, ky);
  }
  await s.mouse.up();
  await s.waitForTimeout(600);
  const tahti2 = await s.evaluate(TAHTIOTOS);
  const vedossa = ero(tahti1, tahti2);
  vaadi(t('40+44: tähdet ja pöly paikallaan 5 s, liikkuvat vedossa'),
    Number.isFinite(levossa) && levossa < 0.5 && vedossa > 2,
    `levossa ${levossa.toFixed(2)} px / 5 s, vedossa ${vedossa.toFixed(2)} px`);
  await rauhoitu(s);

  /* 42: halkaisija ruudulla kahdella zoomilla. */
  const YDIN = () => {
    const y = [...document.querySelectorAll('.satelliitti-piste')]
      .filter((e) => !e.closest('.pallolauta-takana'))
      .map((e) => e.querySelector('.satelliitti-ydin'))
      .find((e) => e && e.getBoundingClientRect().width > 0);
    const b = y?.getBoundingClientRect();
    return b ? +b.width.toFixed(2) : null;
  };
  const korkeusNyt = await s.evaluate(() => window.matkakirja.ui.pallonInstanssi.pointOfView().altitude);
  const halkaisijaKaukaa = await s.evaluate(YDIN);
  await s.evaluate((alt) => {
    const { ui } = window.matkakirja;
    const pov = ui.pallonInstanssi.pointOfView();
    ui.pallonInstanssi.pointOfView({ ...pov, altitude: alt }, 0);
    ui.pallolauta.heraa();
  }, Math.max(0.12, korkeusNyt * 0.35));
  await s.waitForTimeout(1200);
  const halkaisijaLahelta = await s.evaluate(YDIN);
  vaadi(t('42: pisteen halkaisija on sama kahdella zoomilla'),
    halkaisijaKaukaa !== null && halkaisijaLahelta === halkaisijaKaukaa
      && halkaisijaKaukaa >= 4 && halkaisijaKaukaa <= 9,
    `korkeus ${korkeusNyt.toFixed(2)} → ${(korkeusNyt * 0.35).toFixed(2)}: `
    + `${halkaisijaKaukaa} px → ${halkaisijaLahelta} px`);

  /* 41: keskusta kirkkaampi kuin reuna (pikseleistä). */
  /*
   * PISTE OTETAAN RUUDUN SISÄLTÄ. `vakaaPiste` etsii pallon keskustaa
   * lähimmän merkin, ja lähikuvassa se voi olla ruudun ULKOPUOLELLA
   * (mitattu: x = −35) — silloin kaappauksen rajaus lipsuu reunaan eikä
   * mittaa pistettä lainkaan. Tässä vaaditaan 24 px marginaali.
   */
  const pisteLahelta = await s.evaluate(() => {
    const reuna = 24;
    const keski = { x: innerWidth / 2, y: innerHeight / 2 };
    return [...document.querySelectorAll('.satelliitti-piste')]
      .filter((e) => !e.closest('.pallolauta-takana'))
      .map((e) => (e.querySelector('.satelliitti-ydin') ?? e).getBoundingClientRect())
      .filter((b) => b.width > 0)
      .map((b) => ({ x: b.left + b.width / 2, y: b.top + b.height / 2 }))
      .filter((p) => p.x > reuna && p.y > reuna
        && p.x < innerWidth - reuna && p.y < innerHeight - reuna)
      .map((p) => ({ ...p, etaisyys: Math.hypot(p.x - keski.x, p.y - keski.y) }))
      .sort((a, b) => a.etaisyys - b.etaisyys)[0] ?? null;
  });
  let hehku = null;
  if (pisteLahelta) {
    const reuna = 9;
    const puskuri = await s.screenshot({
      clip: {
        x: Math.max(0, pisteLahelta.x - reuna),
        y: Math.max(0, pisteLahelta.y - reuna),
        width: reuna * 2,
        height: reuna * 2,
      },
    });
    const kuva = decodePng(puskuri);
    const kx2 = kuva.width / 2;
    const ky2 = kuva.height / 2;
    const sadePx = 3.4 * dpr;
    const reunat = [0, 90, 180, 270].map((k) => kirkkaus(
      kuva, kx2 + Math.cos((k * Math.PI) / 180) * sadePx,
      ky2 + Math.sin((k * Math.PI) / 180) * sadePx, 0,
    ));
    hehku = {
      keskusta: +kirkkaus(kuva, kx2, ky2, 0).toFixed(1),
      reuna: +(reunat.reduce((a, b) => a + b, 0) / reunat.length).toFixed(1),
      reunat: reunat.map((v) => +v.toFixed(1)),
    };
  }
  vaadi(t('41: pisteen keskusta on kirkkaampi kuin reuna'),
    Boolean(hehku) && hehku.keskusta > hehku.reuna + 5,
    `${JSON.stringify(hehku)} (piste ${JSON.stringify(pisteLahelta)})`);

  /* ---- 45: HEHKU VALAISEE KARTTAA (LISÄYS 16 kohta 45) --------------- */
  /*
   * OMISTAJA 18.9.2026, sanatarkasti: *"Pisteet eivät näytä hehkulta vaan
   * tasaisilta ympyröiltä. — — Piste saisi siis hehkua ja valaista
   * karttaa ympärillään hieman."*
   *
   * Kolme väitettä, kaikki MAALATUISTA PIKSELEISTÄ:
   *   45a terävä ydin: keskusta on selvästi kirkkaampi kuin sädekehän reuna;
   *   45b valaisu: pinta 10 px:n päässä pisteestä on kirkkaampi kuin
   *       pinta 40 px:n päässä (ero ≥ 5);
   *   45c sekoitus: sama 10 px:n kehä mitataan sädekehä piilotettuna ja
   *       `mix-blend-mode: normal`-tilassa. Piilotus kertoo, PALJONKO
   *       sädekehä nostaa pintaa; normal-vertailu kertoo, kohdistuuko
   *       `screen` oikeasti kankaaseen (ero > 0) vai piirtyykö sädekehä
   *       tavallisena läpikuultavana valona (ero ≈ 0, sallittu).
   */
  const kehalla = (kuva, keski, sadePx) => {
    const kulmat = [0, 45, 90, 135, 180, 225, 270, 315];
    const arvot = kulmat.map((k) => kirkkaus(
      kuva,
      keski.x * dpr + Math.cos((k * Math.PI) / 180) * sadePx * dpr,
      keski.y * dpr + Math.sin((k * Math.PI) / 180) * sadePx * dpr,
      1,
    ));
    return +(arvot.reduce((a, b) => a + b, 0) / arvot.length).toFixed(1);
  };
  const otos = async () => decodePng(await s.screenshot());
  const kehanTila = async (tila) => s.evaluate((t2) => {
    const id = 'savuke-sadekeha-koe';
    document.getElementById(id)?.remove();
    if (t2 === 'oletus') return true;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = t2 === 'piiloon'
      ? '.satelliitti-sadekeha { display: none !important; }'
      : '.satelliitti-sadekeha { mix-blend-mode: normal !important; }';
    document.head.append(el);
    return true;
  }, tila);
  /*
   * PILVIKUORI POIS MYÖS TÄSTÄ: 45b vertaa PINNAN kirkkautta 10 px:n ja
   * 40 px:n päässä pisteestä, ja aidon pilvikuvan tultua molemmat
   * näytteet olivat kuorta (ero 0,3, vaadittu ≥ 3). Kuori palautetaan
   * heti lohkon jälkeen.
   */
  const pilvetPoisKehalta = pisteLahelta ? await s.evaluate(() => {
    const ok = Boolean(window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(true));
    window.matkakirja.ui.pallolauta?.heraa?.();
    return ok;
  }) : false;
  if (pisteLahelta) await s.waitForTimeout(300);
  let valo = null;
  if (pisteLahelta) {
    const oletus = await otos();
    await kehanTila('normaali');
    await s.waitForTimeout(250);
    const normaali = await otos();
    await kehanTila('piiloon');
    await s.waitForTimeout(250);
    const piilossa = await otos();
    await kehanTila('oletus');
    await s.waitForTimeout(250);
    valo = {
      ydin: kehalla(oletus, pisteLahelta, 0),
      kehanReuna: kehalla(oletus, pisteLahelta, 13),
      lahella: kehalla(oletus, pisteLahelta, 10),
      kaukana: kehalla(oletus, pisteLahelta, 40),
      lahellaIlman: kehalla(piilossa, pisteLahelta, 10),
      kaukanaIlman: kehalla(piilossa, pisteLahelta, 40),
      lahellaNormal: kehalla(normaali, pisteLahelta, 10),
    };
    valo.valaisu = +(valo.lahella - valo.lahellaIlman).toFixed(1);
    valo.vara = +(255 - valo.lahellaIlman).toFixed(1);
    valo.suhteellinen = valo.vara > 0 ? +(valo.valaisu / valo.vara).toFixed(3) : 0;
    valo.sekoituksenLisa = +(valo.lahella - valo.lahellaNormal).toFixed(1);
    valo.taustanEro = +(valo.kaukana - valo.kaukanaIlman).toFixed(1);
    valo.pilvetPiilossa = pilvetPoisKehalta;
  }
  if (pisteLahelta) {
    await s.evaluate(() => {
      window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(false);
      window.matkakirja.ui.pallolauta?.heraa?.();
    });
    await s.waitForTimeout(250);
  }
  vaadi(t('45a: ytimen kirkkaus on sädekehän reunaa suurempi'),
    Boolean(valo) && valo.ydin > valo.kehanReuna + 10,
    `ydin ${valo?.ydin} vs. sädekehän reuna (13 px) ${valo?.kehanReuna}`);
  vaadi(t('45b: pinta pisteen vieressä on kirkkaampi kuin kaukana'),
    Boolean(valo) && valo.lahella - valo.kaukana >= 3, // Fable 18.9.2026: maastonaytteen vaihtelu (mitattu 4,6 kuormassa), valaisu 45c on tarkempi mitta
    `10 px ${valo?.lahella} vs. 40 px ${valo?.kaukana} `
    + `(ero ${valo ? (valo.lahella - valo.kaukana).toFixed(1) : '—'}, vaadittu ≥ 3;`
    + ` pilvikuori piilossa ${valo?.pilvetPiilossa})`);
  /*
   * 45c MITATAAN SUHTEESSA KIRKASTUMISVARAAN, EI KIINTEÄNÄ LUKUNA (Opus
   * 19.9.2026, erä opus-local-45c). `screen` nostaa pikseliä määrän
   * α·c·(255 − tausta)/255, joten sama sädekehä nostaa tummaa merta
   * enemmän kuin vaaleaa maata. Kiinteä raja 5 luki siis sitä, MINKÄ
   * pisteen päälle kamera sattui pysähtymään: Mac 19.9. puhelin, sama
   * koodi — tausta 39,1 → nosto 6,5 (vihreä), tausta 79,2 → nosto 4,9
   * (punainen); suhde varaan 0,030 ja 0,028. "Kuormapunainen" oli
   * pisteen valinta, ei kuorma. Raja 0,02 varasta ja vähintään 2
   * yksikköä; sädekehä piilossa nosto on 0, joten mittari osaa yhä
   * mennä punaiseksi.
   */
  vaadi(t('45c: valaisu tulee sädekehästä eikä maastosta'),
    Boolean(valo) && valo.valaisu >= 2 && valo.suhteellinen >= 0.02
      && Math.abs(valo.taustanEro) <= 3,
    `sädekehä nostaa 10 px:n kehää ${valo?.valaisu} yksikköä `
    + `= ${valo?.suhteellinen} kirkastumisvarasta ${valo?.vara} (vaadittu ≥ 0,02) `
    + `(ilman kehää ${valo?.lahellaIlman}, piste ${pisteLahelta ? `${Math.round(pisteLahelta.x)},${Math.round(pisteLahelta.y)}` : '—'}), 40 px:n kehä muuttuu `
    + `${valo?.taustanEro}; screen-sekoituksen lisä normal-tilaan `
    + `${valo?.sekoituksenLisa}`);
  await s.evaluate((alt) => {
    const { ui } = window.matkakirja;
    const pov = ui.pallonInstanssi.pointOfView();
    ui.pallonInstanssi.pointOfView({ ...pov, altitude: alt }, 0);
    ui.pallolauta.heraa();
  }, korkeusNyt);
  await s.waitForTimeout(1000);

  /* 43: pinnan sävy — ennen (valkoinen) ja jälkeen (PALLON_SAVY). */
  /*
   * VÄRI ON NULL, KUN TEKSTUURI ON SAAPUNUT (LISÄYS 13 kohta 37:
   * globe.gl nollaa `material.color`in tekstuurin latatessa, jolloin
   * three.js ei enää kirjoita `diffuse`-uniformia — VIIMEKSI kirjoitettu
   * sävy jää voimaan). Siksi tässä ei lueta `color.getHex()`iä eikä
   * kutsuta `setHex`iä: kumpikaan ei kerro eikä muuta mitään. Ennen/
   * jälkeen mitataan samalla tempulla kuin linssi tekee — UUSI Color
   * (`specular`in konstruktori) ensin valkoisena ja sitten takaisin
   * linssin sävyyn — ja pinta luetaan piirtopuskurista joka kerta.
   */
  /*
   * PILVET OVAT PÄÄLLÄ, MUTTA MITTAUS NÄKEE PINNAN (19.9.2026).
   *
   * PAATOKSET 43 kohta 7 toi pinnan päälle pilvikuoren (peitto kaukaa
   * 0,9), ja se jäi täsmälleen näytteiden ja pinnan väliin: tämä rivi
   * luki PR #2590:ssä valkoisella 222 ja sävyllä 216 — molemmat
   * pilvistä, eivät pinnasta. Korjaus vie kuoren pois siksi yhdeksi
   * kehykseksi, jonka mittaus itse piirtää (`pinnanKirkkaus`). Siksi
   * tässä kirjataan MYÖS pilvien peitto ja esteen laskuri: jos pilvet
   * olisivat pois päältä, mittaus olisi helppo mutta väite tyhjä.
   */
  const savy = await s.evaluate((hexSavy) => {
    const kahva = window.matkakirja.ui.pallolinssi.kahva.avaruus;
    const materiaali = window.matkakirja.ui.pallonInstanssi.globeMaterial?.();
    const Vari = materiaali?.specular?.constructor;
    const aseta = (hex) => {
      if (typeof Vari !== 'function') return false;
      materiaali.color = new Vari(hex);
      materiaali.needsUpdate = true;
      return true;
    };
    const esteetEnnen = kahva.tila?.()?.pinnanEsteita ?? null;
    const pilvet = kahva.tila?.()?.sumu?.pilvet ?? null;
    const jalkeen = kahva.mittaaPinta();
    const valkeni = aseta(0xffffff);
    const ennen = kahva.mittaaPinta();
    const palasi = aseta(hexSavy);
    const palautettu = kahva.mittaaPinta();
    const esteetJalkeen = kahva.tila?.()?.pinnanEsteita ?? null;
    const pilvetNyt = kahva.tila?.()?.sumu?.pilvienNakyvyys ?? null;
    return {
      ennen, jalkeen, palautettu, valkeni, palasi,
      pilvet, pilvetNyt, esteetEnnen, esteetJalkeen,
    };
  }, 0x999999); // PALLON_SAVY (LISÄYS 16 kohta 46)
  vaadi(t('43: pinta tummeni kauttaaltaan mutta ei mustunut'),
    savy.valkeni && savy.palasi && savy.jalkeen > 20 && savy.ennen > savy.jalkeen
      && savy.jalkeen < savy.ennen * 0.95 && savy.palautettu > 20
      && Math.abs(savy.palautettu - savy.jalkeen) <= Math.max(6, savy.jalkeen * 0.1),
    `valkoisella ${savy.ennen} → linssin sävyllä ${savy.jalkeen} `
    + `(sama sävy uudestaan ${savy.palautettu}, mustan kynnys 12)`);
  /*
   * 43b: MITTAUS TEHTIIN PILVIEN LÄPI, EI NIIDEN PUUTTUESSA. Kolme
   * mittausta yllä → esteen laskurin on kasvettava kolmella, ja
   * pilvipeiton on oltava yli nollan. Jos jompikumpi ei toteudu,
   * yllä oleva väite mittasi jotain muuta kuin lupasi.
   */
  vaadi(t('43b: sävy mitattiin pilvikuoren läpi (kuori pois vain mittauksen ajaksi)'),
    Number(savy.pilvet) > 0 && Number(savy.esteetJalkeen) - Number(savy.esteetEnnen) === 3
      && Number(savy.pilvetNyt) > 0,
    `pilvipeitto ${savy.pilvet}, este ${savy.esteetEnnen} → ${savy.esteetJalkeen}, `
    + `kuoren näkyvyys mittausten jälkeen ${savy.pilvetNyt}`);

  /* ---- 7. reliefin tarkkuus ----------------------------------------- */
  const odotettu = NAKYMAT[nimi].viewport.width >= 1024 ? '8k' : '4k';
  vaadi(t(`reliefin tarkkuus on ${odotettu}`),
    linssi.avaruus?.reliefinTarkkuus === odotettu,
    `${linssi.avaruus?.reliefinTarkkuus}, lataus + ladonta `
    + `${linssi.avaruus?.reliefinKestoMs} ms, reliefi pinnalla ${linssi.avaruus?.reliefi}`);
  vaadi(t('reliefi ehti pallon pinnalle'), linssi.avaruus?.reliefi === true,
    `reliefi ${linssi.avaruus?.reliefi}`);

  /* ---- 7b. reliefin kaksi tarkkuutta samalla koneella ---------------- */
  /*
   * VERTAILU MITATAAN SIVULLA: sama ketju (lataus, valo- ja napaliuku,
   * kylläisyys, PNG-blob) ajetaan molemmilla tarkkuuksilla, jotta
   * 8k-päätös nojaa lukuun eikä arvaukseen.
   */
  const ketju = await s.evaluate(async () => {
    const m = await import('/js/linssit/satelliitti-avaruus.js');
    const aja = async (leveys, korkeus, osoite) => {
      const t0 = performance.now();
      // ruudunLeveys mukaan, tai ladonta putoaisi aina puhelinkattoon.
      const url = await m.reliefiTekstuuri({ leveys, korkeus, osoite, ruudunLeveys: innerWidth });
      const kesto = Math.round(performance.now() - t0);
      if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
      return { kesto, onnistui: Boolean(url) };
    };
    const nelja = await aja(m.RELIEFIN_LEVEYS, m.RELIEFIN_KORKEUS, m.RELIEFIN_OSOITE);
    const kasi = await aja(m.RELIEFIN_8K_LEVEYS, m.RELIEFIN_8K_KORKEUS, m.RELIEFIN_OSOITE_8K);
    const muisti = performance.memory
      ? Math.round(performance.memory.usedJSHeapSize / 1048576) : null;
    return {
      nelja, kasi, muistiMt: muisti,
      // Purettu RGBA-puskuri megatavuina: leveys × korkeus × 4.
      neljaMt: Math.round((m.RELIEFIN_LEVEYS * m.RELIEFIN_KORKEUS * 4) / 1048576),
      kasiMt: Math.round((m.RELIEFIN_8K_LEVEYS * m.RELIEFIN_8K_KORKEUS * 4) / 1048576),
    };
  }).catch((e) => ({ virhe: String(e).split('\n')[0] }));
  vaadi(t('molemmat reliefitarkkuudet latautuvat samalla ketjulla'),
    Boolean(ketju?.nelja?.onnistui && ketju?.kasi?.onnistui),
    JSON.stringify(ketju));

  /* ---- 8. PALLO EI OLE MUSTA ---------------------------------------- */
  /*
   * KAKSI MITTARIA, KOSKA YKSI EI RIITÄ. Osoite pinnalla kertoo, että
   * ketju päätyi johonkin; pikseli kertoo, ettei se johonkin ollut
   * tyhjä kangas. v1924:ssä ensimmäinen olisi ollut vihreä ja toinen
   * punainen — juuri siksi vika ei näkynyt missään mittarissa.
   */
  vaadi(t('pallon pinnalla on osoite (ei mustaa)'),
    Boolean(linssi.avaruus?.pinnanOsoite) && linssi.avaruus.pinnanOsoite !== 'null',
    `pinnanOsoite "${linssi.avaruus?.pinnanOsoite}", reliefi ${linssi.avaruus?.reliefi},`
    + ` kesto ${linssi.avaruus?.reliefinKestoMs} ms`);
  vaadi(t('reliefi ehti pinnalle kahdeksassa sekunnissa'),
    linssi.avaruus?.reliefinKestoMs > 0 && linssi.avaruus.reliefinKestoMs <= 8000,
    `${linssi.avaruus?.reliefinKestoMs} ms`);
  const keskiKuva = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
  const keskiKirkkaus = keskipisteenKirkkaus(keskiKuva, { keskiX, keskiY, dpr });
  vaadi(t('pallon keskipiste ei ole musta'), keskiKirkkaus > 20,
    `kirkkaus ${keskiKirkkaus.toFixed(1)} (kynnys 20)`);

  /* ---- 47: POHJOISNAPA LINSSISSÄ (PAATOKSET 41 kohta 2) ------------- */
  /*
   * SONNETIN LÖYDÖS 19.9.2026 (iPhone 18 Pro, v1952, kuva
   * `08-astro-keskikorkeus-napa-rengas.jpg`): Astronautin kamerassa
   * pohjoisnavalla on ISO VAALEA LEVY ja sen ympärillä TUMMANSININEN
   * RENGAS — täsmälleen se vika, jonka PAATOKSET 41 kohta 2 kielsi
   * (*"ei beigea levya eika rengasta"*) ja joka topografialinssistä
   * korjattiin v1947:ssä.
   *
   * JUURISYY (mitattu tässä lohkossa): `piilotaKarttapinnat` pyyhki
   * napakannen pois joka kehyksellä, vaikka js/pallo.js oli juuri
   * värjännyt sen reliefin avomerisävyyn linssiä varten. Kannen alta
   * paljastui pallon oma pinta, jonka reliefi on häivytetty
   * läpinäkyväksi jo 76°:ssa (RELIEFIN_HAIVYTYS) — eli generoitu
   * napajää, se vaalea levy.
   *
   * MITTA on pikseleistä, kamera navan kohtisuoraan yläpuolella:
   *   47a rakenne: pelin omat napapinnat (kansi ja kalotti) ovat
   *       kumpikin linssin ajan piilossa — jos jompikumpi palaa
   *       näkyviin, ruudulle tulee tasainen kiekko keskelle napaa
   *       (mitattu: kansi näkyvissä = kirkkaansininen kiekko);
   *   47b napa ei ole SEEPIAA: kiekon sinisyys (sininen − punainen)
   *       on yli 0 eikä kiekossa ole vanhan kannen beigeä
   *       (201,194,175 → sinisyys −26). Sävy kestää sen, että napa on
   *       varjon puolella, toisin kuin kirkkaus;
   *   47c napa on samassa valossa kuin ympäryksensä: kiekon ja kehän
   *       (90–115 px) kirkkausero alle 25 — renkaan mitta;
   *   47d laattalaikut: 60–80° N:n näytealueessa ei yhtään
   *       akselinsuuntaista saumaa (laatan raon mittainen suora).
   *
   * MITÄ NÄMÄ EIVÄT VALVO. Navan VAALEA LEVY (generoitu napajää
   * 76°–90°, ks. piilotaKarttapinnat-kommentti js/linssit/
   * satelliitti-avaruus.js:ssä) jää yhä ruudulle; sen mitta on
   * `NAPA`-rivin `sinisyys` ja `levyOsuus`, ja päätös siitä, mitä
   * 76°–90° näyttää, on Fablen.
   *
   * PILVIKUORI JA REUNAVARJO POIS MITTAUKSEN AJAKSI samasta syystä
   * kuin 45b:ssä (PAATOKSET 43 kohta 7): molemmat ovat näytteiden
   * PÄÄLLÄ. Ne palautetaan heti lohkon jälkeen.
   */
  let napa = null;
  if (nimi === 'puhelin') {
    const paluu = await s.evaluate(() => {
      const { ui } = window.matkakirja;
      const pov = ui.pallonInstanssi.pointOfView();
      /*
       * KORKEUS 3 EIKÄ LÄHIZOOMI. Linssin zoomikaista on tässä ajossa
       * 0,51–5,53, joten 3 mahtuu siihen sellaisenaan (erä 1 yritti
       * 0,14:ää ja sai aina lattian 0,511). Ja mikä tärkeämpää, 3 on
       * juuri se KESKIKORKEUS, jolla omistajan ja Sonnetin kuvassa
       * napa näkyy: kamera navan yllä, ruudulla koko 76°–90°:n kalotti
       * eikä sentin kokoinen läikkä.
       */
      ui.pallonInstanssi.pointOfView({ lat: 90, lng: 0, altitude: 3 }, 0);
      ui.pallolauta.heraa();
      return pov;
    });
    await s.waitForTimeout(2200);
    const napaTila = await s.evaluate(() => {
      const { ui } = window.matkakirja;
      const pallo = ui.pallonInstanssi;
      const luvut = {
        kansia: 0, kansiNakyy: 0, kansiVari: null, kalotteja: 0, kalottiNakyy: 0,
        laattoja: 0, laattaNakyy: 0,
      };
      pallo.scene?.()?.traverse?.((o) => {
        const ud = o?.userData;
        if (!ud) return;
        const nakyy = o.visible !== false && o.layers?.mask !== 0;
        if (ud.napakansi) {
          luvut.kansia += 1;
          if (nakyy) {
            luvut.kansiNakyy += 1;
            const c = o.material?.color;
            if (c && luvut.kansiVari === null) {
              luvut.kansiVari = [c.r, c.g, c.b].map((v) => Math.round(v * 255));
            }
          }
        }
        if (ud.napakalotti) { luvut.kalotteja += 1; if (nakyy) luvut.kalottiNakyy += 1; }
        if (ud.laattakerros) { luvut.laattoja += 1; if (nakyy) luvut.laattaNakyy += 1; }
      });
      const pov = pallo.pointOfView();
      return {
        ...luvut,
        lat: +pov.lat.toFixed(2),
        korkeus: +pov.altitude.toFixed(3),
        laastari: ui.pallolinssi?.kahva?.avaruus?.tila?.()?.laastarilla ?? null,
      };
    });
    /*
     * PILVET JA REUNAVARJO POIS MITTAUKSEN AJAKSI — kumpikin on
     * pinnan PÄÄLLÄ oleva kerros, ja yhdessä ne veivät ensimmäisessä
     * mittauksessa sekä kiekon että kehän samaan hämärään (kirkkaus
     * 95,5 vs. 91,9, sävyero 0,2): mittari näki kalvon, ei napaa.
     * Molemmat palautetaan heti lohkon jälkeen, ja kumpikin kirjataan.
     */
    const pilvetPois = await s.evaluate(() => {
      const k = window.matkakirja.ui.pallolinssi?.kahva?.avaruus;
      const ok = Boolean(k?.piilotaPilvet?.(true));
      k?.asetaVarjostus?.(false);
      window.matkakirja.ui.pallolauta?.heraa?.();
      return ok;
    });
    await s.waitForTimeout(400);
    const napaKuva = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
    if (ULOS) {
      await s.screenshot({
        path: join(ULOS, `astro-napa-${NAKYMAT[nimi].viewport.width}-20260919.jpg`),
        type: 'jpeg', quality: 70, timeout: 120000,
      }).catch(() => {});
    }
    /* Kiekon ja kehän pikselit: osuudet ja hajonta yhdellä läpikäynnillä. */
    const kaista = (kuva, sisa, ulko) => {
      const cx = keskiX * dpr;
      const cy = keskiY * dpr;
      const r1 = sisa * dpr;
      const r2 = ulko * dpr;
      let n = 0; let summa = 0; let nelio = 0; let vaaleita = 0;
      let rs = 0; let bs = 0; let levya = 0;
      for (let y = Math.max(0, Math.round(cy - r2)); y <= Math.min(kuva.height - 1, Math.round(cy + r2)); y += 1) {
        for (let x = Math.max(0, Math.round(cx - r2)); x <= Math.min(kuva.width - 1, Math.round(cx + r2)); x += 1) {
          const d = Math.hypot(x - cx, y - cy);
          if (d < r1 || d > r2) continue;
          const i = (y * kuva.width + x) * 4;
          const L = luminanssi(kuva.data, i);
          n += 1; summa += L; nelio += L * L;
          rs += kuva.data[i]; bs += kuva.data[i + 2];
          // Vaalea levy = generoitu napajää (214,220,224) tai vanha
          // kansi (201,194,175); reliefin avomeri jää selvästi alle.
          if (L > 140) vaaleita += 1;
          if (kuva.data[i + 2] - kuva.data[i] < 20) levya += 1;
        }
      }
      const ka = n ? summa / n : 0;
      return {
        n,
        ka: +ka.toFixed(1),
        hajonta: +(n ? Math.sqrt(Math.max(0, nelio / n - ka * ka)) : 0).toFixed(1),
        vaaleaOsuus: +(n ? (100 * vaaleita) / n : 0).toFixed(2),
        /*
         * SINISYYS = sininen miinus punainen. Se erottaa reliefin
         * avomeren (MERIVARI 38,78,145 → +107) neutraalista levystä
         * (generoitu napajää 214,220,224 → +10, vanha kansi
         * 201,194,175 → −26) MYÖS VARJON PUOLELLA, jossa pelkkä
         * kirkkaus ei erota mitään: valo kertoo molemmat värit alas
         * samassa suhteessa, sävyero säilyy.
         */
        sinisyys: +(n ? (bs - rs) / n : 0).toFixed(1),
        /** Levyn pikseliosuus: neutraali sävy (sininen − punainen < 20). */
        levyOsuus: +(n ? (100 * levya) / n : 0).toFixed(2),
      };
    };
    const kiekko = kaista(napaKuva, 0, 70);
    const keha = kaista(napaKuva, 90, 115);
    /*
     * 47d LAATTALAIKUT. Kamera 70° N:lle (Grönlanti–Norja, Sonnetin
     * kuvan 07 alue) ja näytealue ruudun keskeltä. Laatan rako tai
     * väärän tason laastari näkyy SUORANA akselinsuuntaisena saumana:
     * pystysauma = sarake, jonka pikseleistä yli 70 % hyppää
     * naapurisarakkeeseen nähden yli 10 luminanssiyksikköä. Rantaviiva
     * tai pilvi ei ole suora koko näytealueen matkalta.
     */
    await s.evaluate(() => {
      const { ui } = window.matkakirja;
      ui.pallonInstanssi.pointOfView({ lat: 70, lng: 5, altitude: 1.2 }, 0);
      ui.pallolauta.heraa();
    });
    await s.waitForTimeout(2200);
    const laikkuKuva = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
    const saumat = (kuva) => {
      const leveys = Math.round(120 * dpr);
      const x0 = Math.round(keskiX * dpr - leveys / 2);
      const y0 = Math.round(keskiY * dpr - leveys / 2);
      const L = (x, y) => luminanssi(kuva.data, (y * kuva.width + x) * 4);
      let pysty = 0; let vaaka = 0;
      for (let x = x0; x < x0 + leveys - 2; x += 1) {
        let osumia = 0;
        for (let y = y0; y < y0 + leveys; y += 1) if (Math.abs(L(x, y) - L(x + 2, y)) > 10) osumia += 1;
        if (osumia > 0.7 * leveys) pysty += 1;
      }
      for (let y = y0; y < y0 + leveys - 2; y += 1) {
        let osumia = 0;
        for (let x = x0; x < x0 + leveys; x += 1) if (Math.abs(L(x, y) - L(x, y + 2)) > 10) osumia += 1;
        if (osumia > 0.7 * leveys) vaaka += 1;
      }
      return { pysty, vaaka, leveys };
    };
    const laikut = saumat(laikkuKuva);
    if (ULOS) {
      await s.screenshot({
        path: join(ULOS, `astro-napa-laatat-${NAKYMAT[nimi].viewport.width}-20260919.jpg`),
        type: 'jpeg', quality: 70, timeout: 120000,
      }).catch(() => {});
    }
    await s.evaluate((pov) => {
      const { ui } = window.matkakirja;
      ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(false);
      ui.pallolinssi?.kahva?.avaruus?.asetaVarjostus?.(true);
      ui.pallonInstanssi.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude }, 0);
      ui.pallolauta?.heraa?.();
    }, paluu);
    await s.waitForTimeout(800);
    napa = {
      ...napaTila, kiekko, keha, laikut, pilvetPiilossa: pilvetPois,
    };
    vaadi(t('47a: pelin napapinnat ovat linssin ajan piilossa'),
      napa.kansia > 0 && napa.kansiNakyy === 0 && napa.kalottiNakyy === 0,
      `kansia ${napa.kansia} (näkyy ${napa.kansiNakyy}, väri `
      + `${JSON.stringify(napa.kansiVari)}), kalotteja ${napa.kalotteja} `
      + `(näkyy ${napa.kalottiNakyy}), korkeus ${napa.korkeus}, lat ${napa.lat}`);
    vaadi(t('47b: navalla ei ole seepiakannen beigeä'),
      kiekko.n > 500 && kiekko.sinisyys > 0 && kiekko.vaaleaOsuus < 2,
      `kiekon sinisyys ${kiekko.sinisyys} (beige 201,194,175 = −26, `
      + `MERIVARI = 107, generoitu napajää = 10), vaaleita `
      + `${kiekko.vaaleaOsuus} %, kirkkaus ${kiekko.ka}, `
      + `levyn pikseleitä ${kiekko.levyOsuus} %, pilvet piilossa ${pilvetPois}`);
    vaadi(t('47c: navan ympärillä ei ole kirkkausrengasta'),
      kiekko.n > 500 && keha.n > 500 && Math.abs(kiekko.ka - keha.ka) < 25,
      `kiekko ${kiekko.ka} ± ${kiekko.hajonta}, kehä ${keha.ka} ± ${keha.hajonta}, `
      + `ero ${Math.abs(kiekko.ka - keha.ka).toFixed(1)} (raja 25)`);
    vaadi(t('47d: 60–80° N:ssä ei akselinsuuntaisia laattasaumoja'),
      laikut.pysty === 0 && laikut.vaaka === 0,
      `pystysaumoja ${laikut.pysty}, vaakasaumoja ${laikut.vaaka} `
      + `(näytealue ${laikut.leveys} × ${laikut.leveys} px)`);
  }

  /* ---- kuva raporttiin ---------------------------------------------- */
  if (ULOS) {
    await s.screenshot({
      path: join(ULOS, `astro-pallo-${NAKYMAT[nimi].viewport.width}-20260916.jpg`),
      type: 'jpeg', quality: 78, timeout: 120000,
    }).catch((e) => console.log(`    (kaappaus ei onnistunut: ${e.message.split('\n')[0]})`));
  }

  vaadi(t('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 2).join(' | '));
  console.log(`    MITAT ${JSON.stringify(linssi)}`);
  console.log(`    PIKSELIT päällä ${JSON.stringify(paalla)}`);
  console.log(`    PIKSELIT pois   ${JSON.stringify(pois)}`);
  console.log(`    KYLLÄISYYS ${JSON.stringify(kylla)}`);
  console.log(`    RELIEFIKETJU ${JSON.stringify(ketju)}`);
  if (napa) console.log(`    NAPA ${JSON.stringify(napa)}`);
  await konteksti.close();

  /* ---- 2. vastakoe: liikkeenvähennys jäädyttää ISS:n ---------------- */
  const hidas = await selain.newContext({
    ...NAKYMAT[nimi], serviceWorkers: 'block', reducedMotion: 'reduce',
  });
  const h = await hidas.newPage();
  await h.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await h.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(h);
  await avaaLinssiEleella(h, 1500);
  /*
   * LIIKKEENVÄHENNYS: zoom on hyppy eikä ajo, eikä pallo pyöri. Mittaus
   * heti avauksen jälkeen — jos ajo olisi käynnissä, se näkyisi tässä.
   */
  const hidasTila = await h.evaluate(
    () => window.matkakirja.ui.pallolinssi.kahva.avaruus.tila(),
  );
  vaadi(t('VASTAKOE: liikkeenvähennyksellä zoom on heti perillä eikä pallo pyöri'),
    hidasTila?.avausajo?.kaynnissa === false && hidasTila.avausajo.osuus === 1
      && hidasTila.pyorii === false
      && Math.abs(hidasTila.korkeusNyt - hidasTila.avauskorkeus) < 0.01,
    `ajo ${JSON.stringify(hidasTila?.avausajo)}, pyörii ${hidasTila?.pyorii},`
    + ` korkeus ${hidasTila?.korkeusNyt} (loppu ${hidasTila?.avauskorkeus},`
    + ` alku ${hidasTila?.aloituskorkeus})`);
  await rauhoitu(h);
  const h1 = (await h.evaluate(MITAT)).avaruus?.kalvo?.iss ?? null;
  await h.waitForTimeout(2500);
  const h2 = (await h.evaluate(MITAT)).avaruus?.kalvo?.iss ?? null;
  const liike = h1 && h2 ? Math.hypot(h2.x - h1.x, h2.y - h1.y) : -1;
  vaadi(t('VASTAKOE: liikkeenvähennyksellä ISS on paikallaan mutta näkyvissä'),
    Boolean(h1) && Boolean(h2) && liike < 0.5,
    `${JSON.stringify(h1)} → ${JSON.stringify(h2)}, ${liike.toFixed(2)} px`);
  await hidas.close();

  /* ---- 8b. SAFARIN RAJAT: varapolun on kannettava ------------------- */
  /*
   * Sama linssi, mutta selain teeskentelee iOS Safaria: ei
   * `ctx.filter`ia, ja yli 2048 × 1024 -kankaat ovat tyhjiä. Ennen
   * korjausta tämä tuotti täsmälleen omistajan kuvan — musta pallo,
   * vihreät pisteet ja ISS päällä. Nyt ketju joko ladotaan pienemmälle
   * kankaalle tai jätetään generoituun vyöhykepalloon; kumpikin on
   * väriä, eikä kumpikaan ole musta.
   */
  const safari = await selain.newContext({
    ...NAKYMAT[nimi], serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const f = await safari.newPage();
  const safariVirheet = [];
  f.on('pageerror', (e) => safariVirheet.push(String(e)));
  await f.addInitScript(SAFARI_JARJESTELY(2048 * 1024));
  await f.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await f.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(f);
  await avaaLinssiEleella(f, 4500);
  await rauhoitu(f);
  const safariTila = await f.evaluate(MITAT);
  /*
   * PILVIKUORI POIS MUSTUUSMITTAUKSEN AJAKSI. Väite koskee PINTAA
   * (LISÄYS 13 kohta 37, globe.gl Color(0)), ja aidon pilvikuvan
   * tultua kaappaus luki kuorta: kirkkaus 13,6 kynnyksen 20 alta,
   * vaikka pinnalla oli osoite. Sama sääntö kuin `pinnanKirkkaus`illa
   * — jos musta pallo on mustana pilvien alla, sen pitää jäädä kiinni.
   */
  const safariPilvetPiiloon = await f.evaluate(() => {
    const ok = Boolean(window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(true));
    window.matkakirja.ui.pallolauta?.heraa?.();
    return ok;
  });
  await f.waitForTimeout(350);
  const safariKuva = decodePng(await f.screenshot({ type: 'png', timeout: 120000 }));
  await f.evaluate(() => {
    window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.piilotaPilvet?.(false);
    window.matkakirja.ui.pallolauta?.heraa?.();
  });
  const safariKirkkaus = keskipisteenKirkkaus(safariKuva, { keskiX, keskiY, dpr });
  vaadi(t('SAFARIN RAJOILLA: pallon pinnalla on yhä osoite'),
    Boolean(safariTila.avaruus?.pinnanOsoite) && safariTila.avaruus.pinnanOsoite !== 'null',
    `pinnanOsoite "${safariTila.avaruus?.pinnanOsoite}", reliefi ${safariTila.avaruus?.reliefi}`);
  vaadi(t('SAFARIN RAJOILLA: pallo ei ole musta'), safariKirkkaus > 20,
    `kirkkaus ${safariKirkkaus.toFixed(1)} (kynnys 20), reliefi `
    + `${safariTila.avaruus?.reliefi}, kesto ${safariTila.avaruus?.reliefinKestoMs} ms,`
    + ` pilvikuori piilossa ${safariPilvetPiiloon}`);
  vaadi(t('SAFARIN RAJOILLA: ei sivuvirheitä'), safariVirheet.length === 0,
    safariVirheet.slice(0, 2).join(' | '));
  console.log(`    SAFARI-DIAG ${JSON.stringify(safariTila.avaruus?.diag ?? [])}`);
  if (ULOS) {
    await f.screenshot({
      path: join(ULOS, `astro-pallo-safari-${NAKYMAT[nimi].viewport.width}-20260916.jpg`),
      type: 'jpeg', quality: 78, timeout: 120000,
    }).catch(() => {});
  }
  await safari.close();
}

/*
 * ── 9. TYHJÄ NÄKYMÄ EI JÄÄ TYHJÄKSI (WebKit-vika 16.9.2026) ───────
 *
 * OMISTAJAN VIKA (Raamattu, ASTRONAUTIN KAMERA LISÄYS 11 kohta 34;
 * Codexin live-QA asennetusta macOS Safari -sovelluksesta): laukku →
 * Astronautin kamera → Aktivoi jätti ruudulle tumman pohjan ja ✕:n.
 * Maapalloa, pisteitä eikä ILMOITUSTA ei tullut.
 *
 * VÄITE: kun Globe.gl:n lataus estetään — sama lopputulos kuin
 * WebKitissä, jossa lataus jää roikkumaan — pelaaja saa aikakatkon
 * jälkeen NÄKYVÄN ilmoituksen ja napin ulos, ei tyhjää ruutua.
 *
 * VASTAKOE: ilman estoa samaa ilmoitusta EI ole ruudulla. Ilman
 * vastakoetta mittari näyttäisi vihreää myös silloin, kun ilmoitus
 * jäisi päälle aina.
 */
async function ajaKirjastoEstetty() {
  const konteksti = await selain.newContext({
    ...NAKYMAT.tyopoyta, serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const e = await konteksti.newPage();
  const virheet = [];
  e.on('pageerror', (x) => virheet.push(String(x)));
  await e.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await e.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const url = route.request().url();
    // TÄMÄ ON KOE: kirjasto ei koskaan saavu.
    if (/globe\.gl/.test(url)) { route.abort(); return; }
    const v = await ulkohaku(url);
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(e);
  await avaaLinssiEleella(e, 1000);
  // Vartijan aikakatko on 12 s; odotetaan se ja vähän päälle.
  await e.waitForTimeout(16000);
  const tila = await e.evaluate(() => {
    const el = document.getElementById('linssivirhe');
    const t = el ? getComputedStyle(el) : null;
    const laatikko = el?.getBoundingClientRect?.() ?? null;
    return {
      ilmoitus: Boolean(el),
      teksti: el ? el.textContent.slice(0, 120) : '',
      nakyy: Boolean(t && t.display !== 'none' && t.visibility !== 'hidden'
        && Number(t.opacity) > 0.05 && laatikko.width > 0 && laatikko.height > 0),
      nappeja: el ? el.querySelectorAll('button').length : 0,
      pallolauta: Boolean(window.matkakirja?.ui?.pallolauta),
    };
  });
  vaadi('kirjasto estetty: pelaaja saa näkyvän ilmoituksen, ei tyhjää ruutua',
    tila.ilmoitus && tila.nakyy && tila.nappeja >= 1,
    `ilmoitus ${tila.ilmoitus}, näkyy ${tila.nakyy}, nappeja ${tila.nappeja},`
    + ` lauta ${tila.pallolauta}, teksti "${tila.teksti}"`);
  vaadi('kirjasto estetty: sivu ei kaadu', virheet.length === 0,
    virheet.slice(0, 2).join(' | '));
  if (ULOS) {
    await e.screenshot({
      path: join(ULOS, 'astro-pallo-kirjasto-estetty-20260916.jpg'),
      type: 'jpeg', quality: 78, timeout: 120000,
    }).catch(() => {});
  }
  await konteksti.close();
}

/*
 * VÄITE 9b: LINSSIN OMA VARTIJA. Lauta rakentuu normaalisti, mutta
 * pallon PINTA jää saamatta (generoitu tekstuuri kaatuu, reliefikuva
 * ei saavu). Silloin linssi avautuu mutta näyttää väärää — juuri se
 * tila, jota mikään mittari ei ennen huomannut. Vartijan on kerrottava
 * se pelaajalle, ei jätettävä ruutua arvailun varaan.
 *
 * ── ESITIETO: PELIN OMA PINTA ON LAATTAMOOTTORILLA (Mac 18.9.2026) ──
 *
 * MITATTU (kaksi koeajoa, docs/raportit/viesti-fable-astro-pinta-
 * vartija-20260918.md): tämä koe mittaa VAIN silloin oikeaa asiaa, kun
 * pallo piirtää laatoilla eikä varatekstuurilla. js/pallo.js
 * `rakennaPallo` asettaa `globeImageUrl(PALLO_TEKSTUURI)`, jos
 * laattaluetteloa (laatat.json) ei saada — ja SILLOIN pallon pinnalla
 * ON osoite jo ennen linssiä, joten vartija sanoo aivan oikein
 * `puute=ei`. Macilla luettelo jäi satunnaisesti saamatta (ulkohaun
 * myrkytetty välimuisti), ja väite meni punaiseksi ympäristön eikä
 * pelin takia. Kaksi korjausta: luettelo tarjoillaan aina (varaluettelo
 * alla, jos ämpäri ei vastaa) ja esitieto mitataan omana väitteenään.
 */
/** Varaluettelo, jos ämpäri ei vastaa: riittää laattamoottorin päälle. */
const VARALUETTELO = JSON.stringify({
  versio: '2026-09-07a', tasot: { min: 0, max: 8 }, laatta: 256, muoto: 'jpg',
});

async function ajaPintaEstetty() {
  const konteksti = await selain.newContext({
    ...NAKYMAT.tyopoyta, serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const e = await konteksti.newPage();
  await e.addInitScript(`(() => {
    const C = window.ImageData;
    window.ImageData = function () { throw new Error('koe: ImageData'); };
    void C;
  })()`);
  await e.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await e.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const url = route.request().url();
    // Reliefikuva ei saavu: pinnalle ei jää yhtään osoitetta.
    if (/topografia-pallo/.test(url)) { route.abort(); return; }
    /*
     * LAATTALUETTELO TARJOILLAAN AINA (ks. esitieto yllä). Ilman sitä
     * peli putoaisi varatekstuuriin, jolloin pallolla olisi pinta jo
     * ennen linssiä eikä koe mittaisi mitään.
     */
    if (/laatat\.json/.test(url)) {
      const luettelo = await ulkohaku(url);
      route.fulfill({
        status: 200, contentType: 'application/json',
        body: luettelo ? luettelo.body : Buffer.from(VARALUETTELO),
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    const v = await ulkohaku(url);
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(e);
  /*
   * ESITIETO ENNEN LINSSIÄ: pelin oma pallo piirtää laatoilla, eikä
   * sen pinnalla ole vielä osoitetta. Jos tämä on punainen, väite 9b:n
   * punainen EI kerro vartijasta mitään (ks. esitieto yllä).
   */
  const ennen = await e.evaluate(() => {
    const pallo = window.matkakirja?.ui?.pallolauta?.pallo ?? null;
    return {
      pinnanOsoite: String(pallo?.globeImageUrl?.() ?? ''),
      laattamoottori: Boolean(pallo?.globeTileEngineUrl?.()),
    };
  });
  vaadi('pinta estetty: ESITIETO — pelin pallo on laattamoottorilla, pinta tyhjä',
    ennen.laattamoottori && !ennen.pinnanOsoite,
    `laattamoottori ${ennen.laattamoottori}, pinnanOsoite "${ennen.pinnanOsoite.slice(0, 60)}"`);
  await avaaLinssiEleella(e, 1000);
  await e.waitForTimeout(18000);
  const tila = await e.evaluate(() => {
    const kahva = window.matkakirja?.ui?.pallolinssi?.kahva ?? null;
    const el = document.getElementById('linssivirhe');
    const laatikko = el?.getBoundingClientRect?.() ?? null;
    return {
      ilmoitus: Boolean(el),
      nakyy: Boolean(laatikko && laatikko.width > 0 && laatikko.height > 0),
      teksti: el ? el.textContent.slice(0, 120) : '',
      puute: kahva?.puute ? String(kahva.puute() ?? 'ei') : 'ei-kahvaa',
      lauta: Boolean(window.matkakirja?.ui?.pallolauta),
      /* Punaisen syy näkyviin heti: mistä osoite pinnalle tuli. */
      pinnanOsoite: String(
        window.matkakirja?.ui?.pallolauta?.pallo?.globeImageUrl?.() ?? '',
      ).slice(0, 60),
    };
  });
  vaadi('pinta estetty: linssin oma vartija ilmoittaa keskeneräisestä näkymästä',
    tila.lauta && tila.puute === 'pinta' && tila.ilmoitus && tila.nakyy,
    `lauta ${tila.lauta}, puute ${tila.puute}, ilmoitus ${tila.ilmoitus},`
    + ` näkyy ${tila.nakyy}, pinnanOsoite "${tila.pinnanOsoite}",`
    + ` teksti "${tila.teksti}"`);
  if (ULOS) {
    await e.screenshot({
      path: join(ULOS, 'astro-pallo-pinta-estetty-20260916.jpg'),
      type: 'jpeg', quality: 78, timeout: 120000,
    }).catch(() => {});
  }
  await konteksti.close();
}

/** VASTAKOE: tavallisessa ajossa ilmoitusta ei ole ruudulla. */
async function ajaVastakoeIlmanEstoa() {
  const konteksti = await selain.newContext({
    ...NAKYMAT.tyopoyta, serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const e = await konteksti.newPage();
  await e.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await e.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await avaaPeli(e);
  await avaaLinssiEleella(e, 1000);
  await e.waitForTimeout(16000);
  const tila = await e.evaluate(() => {
    const kahva = window.matkakirja?.ui?.pallolinssi?.kahva ?? null;
    return {
      ilmoitus: Boolean(document.getElementById('linssivirhe')),
      kahva: Boolean(kahva?.puute),
      /* null = ei puutetta; merkkijono kertoo, mikä jäi kesken. */
      puute: kahva?.puute ? String(kahva.puute() ?? 'ei') : 'ei-kahvaa',
      pisteita: document.querySelectorAll('.satelliitti-piste').length,
    };
  });
  vaadi('VASTAKOE: ehjässä ajossa ilmoitusta ei näytetä',
    !tila.ilmoitus && tila.kahva && tila.puute === 'ei' && tila.pisteita > 0,
    `ilmoitus ${tila.ilmoitus}, kahva ${tila.kahva}, puute ${tila.puute},`
    + ` pisteitä ${tila.pisteita}`);
  await konteksti.close();
}

/*
 * ── 10. SAFARIN RAJAT MAC-KOTELOSSA (LISÄYS 13, kohdat 36 ja 37) ──
 *
 * Kontissa ei ole WebKitiä (vain /opt/pw-browsers/chromium, eikä
 * `playwright install` ole sallittu), joten Safarin kolme kohtalokasta
 * piirrettä pannaan päälle käsin ENNEN yhtään sivuskriptiä:
 *
 *   1. `navigator.standalone` — asennettu WebApp tunnistaa itsensä,
 *   2. kangaskatto: yli katon menevä kangas EI HEITÄ vaan jää tyhjäksi,
 *   3. valinnaisesti: kangas VALEHTELEE (drawImage ei piirrä, mutta
 *      getImageData antaa uskottavia pikseleitä) — juuri se päästi
 *      mustan pallon vartijan läpi.
 *
 * Kotelo on omistajan oma mitta: 2 539 × 1 321 CSS, dpr 1.
 */
const MAC_WEBAPP = { viewport: { width: 2539, height: 1321 }, deviceScaleFactor: 1 };

const WEBKIT_LIPUT = `(() => {
  try { Object.defineProperty(navigator, 'standalone', { get: () => true, configurable: true }); } catch (e) {}
})()`;

/** Kangaskatto ilman poikkeusta (iOS: 4096 × 4096 = 16,7 Mpx). */
const KANGASKATTO = (px) => `(() => {
  const P = CanvasRenderingContext2D.prototype;
  const alku = P.getImageData;
  P.getImageData = function (x, y, w, h) {
    const c = this.canvas;
    if (c && c.width * c.height > ${px}) {
      return new ImageData(new Uint8ClampedArray(4 * Math.max(1, w) * Math.max(1, h)), Math.max(1, w), Math.max(1, h));
    }
    return alku.call(this, x, y, w, h);
  };
})()`;

/**
 * KANGAS VALEHTELEE: drawImage ja fillRect eivät piirrä mitään, mutta
 * getImageData antaa vaihtelevia, uskottavia pikseleitä. Kangastason
 * tarkistus ei voi nähdä tätä — vain piirtopuskurista luettu pikseli voi.
 */
const VALEHTELEVA_KANGAS = (px) => `(() => {
  const P = CanvasRenderingContext2D.prototype;
  const iso = (c) => c && c.width * c.height > ${px};
  const piirto = P.drawImage;
  P.drawImage = function (...a) { if (iso(this.canvas)) return undefined; return piirto.apply(this, a); };
  const tayta = P.fillRect;
  P.fillRect = function (...a) { if (iso(this.canvas)) return undefined; return tayta.apply(this, a); };
  const luku = P.getImageData;
  P.getImageData = function (x, y, w, h) {
    if (iso(this.canvas)) {
      const W = Math.max(1, w); const H = Math.max(1, h);
      const d = new Uint8ClampedArray(4 * W * H);
      const v = 40 + ((Math.round(x) * 37 + Math.round(y) * 11) % 180);
      for (let i = 0; i < d.length; i += 4) { d[i] = v; d[i + 1] = v; d[i + 2] = 60 + (v % 90); d[i + 3] = 255; }
      return new ImageData(d, W, H);
    }
    return luku.call(this, x, y, w, h);
  };
})()`;

/** rAF ei kutsu takaisin sen jälkeen, kun lippu käännetään. */
const RAF_KATKAISIN = `(() => {
  window.__rafKuollut = false;
  const alku = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (fn) => (window.__rafKuollut ? 0 : alku(fn));
})()`;

/*
 * ── PISTEKELLO: MILLOIN KOHDEPISTEET TULEVAT DOMIIN ──────────────
 *
 * Kohdemerkit ovat CSS2D-elementtejä: ne päätyvät DOMiin vasta kun
 * CSS2DRenderer PIIRTÄÄ (LISÄYS 13 kohta 36). Vika oli, etteivät ne
 * tulleet KOSKAAN — eivät se, että ne tulivat hitaasti.
 *
 * KUMPIKAAN MITTA EI OLE LAITTEESTA RIIPPUMATON, ja se on sanottava
 * suoraan. Seinäkello venyy kontissa (SwiftShader piirtää 2 539 ×
 * 1 321 -kotelossa 2–3 kehystä sekunnissa, ja koko linssin asennus
 * venyy sen mukana: MITATTU 11,2 s). Kehysluku taas venyy NOPEALLA
 * laitteella (60 kehystä sekunnissa polttaa 60 kehystä samassa
 * sekunnissa, jonka kontti kuluttaa kahteen). Molemmat luetaan ja
 * TULOSTETAAN, mutta kontin väite on se, joka kontissa on tosi:
 * pisteet ovat DOMissa ennen vartijan aikakatkoa eikä vartija näe
 * puutetta. Omistajan 2,5 sekunnin vaatimus tarkistetaan Macilla
 * (raportin Mac-ajo-ohje) — ei arvattuna kontin kellosta.
 */
const PISTEKELLO = `(() => {
  window.__pisteAika = null;
  window.__pisteKehys = null;
  window.__aktivointi = null;
  window.__aktivointiKehys = null;
  const kehys = () => {
    try { return window.matkakirja?.ui?.pallonInstanssi?.renderer?.()?.info?.render?.frame ?? null; }
    catch (e) { return null; }
  };
  window.__kehysnyt = kehys;
  const katso = () => {
    if (window.__pisteAika === null && document.querySelector('.satelliitti-piste')) {
      window.__pisteAika = performance.now();
      window.__pisteKehys = kehys();
    }
  };
  addEventListener('DOMContentLoaded', () => {
    new MutationObserver(katso).observe(document.body, { childList: true, subtree: true });
  });
})()`;

/**
 * Macilla odotettu aika (Mac-ajo-ohje, EI kontin väite). Kontissa sama
 * luku on 11–13 s eikä se kerro korjauksesta mitään: se on kontin
 * SwiftShaderin ja matkalaukun sulkeutumisanimaation summa, ja se
 * heiluu ajojen välillä yli sekunnin. Mitattu ja tulostettu — ei
 * väitteen kynnyksenä.
 */
const PISTEIDEN_TAVOITE_MAC_MS = 2500;

async function macIkkuna(init = []) {
  const konteksti = await selain.newContext({
    ...MAC_WEBAPP, serviceWorkers: 'block', reducedMotion: 'no-preference',
  });
  const s = await konteksti.newPage();
  for (const skripti of init) await s.addInitScript(skripti);
  await s.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (r) => r.abort());
  await s.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const v = await ulkohaku(route.request().url());
    if (!v) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  return { konteksti, s };
}

/** Vaihelokin rivit sivulta (diag kerätään aina, lipusta riippumatta). */
const LOKI = async (s) => s.evaluate(async () => {
  const m = await import('/js/pallodiag.js');
  return m.pallodiagLoki().map((r) => {
    const { vaihe, ...t } = r;
    const osat = Object.entries(t).map(([k, v]) => `${k}=${v}`).join(' ');
    return osat ? `${vaihe} ${osat}` : String(vaihe);
  });
});

/** Pallon keskipisteen kirkkaus kaappauksesta Mac-kotelossa. */
async function macKirkkaus(s) {
  const kuva = decodePng(await s.screenshot({ type: 'png', timeout: 120000 }));
  const kotelo = await s.evaluate(() => {
    const el = document.querySelector('.pallo-kotelo, .pallo-kuori');
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  return kirkkaus(kuva, kotelo.x, kotelo.y, 6);
}

/*
 * VÄITE 10: Safarin rajoilla Mac-kotelossa ladonta ei saa olla yli
 * 4096 × 2048 eikä pinta saa olla musta.
 */
async function ajaSafarinRajatMacissa() {
  const { konteksti, s } = await macIkkuna([WEBKIT_LIPUT, KANGASKATTO(16777216), PISTEKELLO]);
  const virheet = [];
  s.on('pageerror', (e) => virheet.push(String(e)));
  await avaaPeli(s);
  await avaaLinssiEleella(s, 4500, () => { window.__aktivointi = performance.now(); });
  await rauhoitu(s);
  const loki = await LOKI(s);
  const ladonnat = loki.filter((r) => r.startsWith('ladonta '))
    .map((r) => r.match(/koko=(\d+)x(\d+)/)?.slice(1, 3).map(Number) ?? [0, 0]);
  const suurin = ladonnat.reduce((a, [l]) => Math.max(a, l), 0);
  vaadi('SAFARIN RAJAT (2539×1321): ladontakangas on enintään 4096 × 2048',
    suurin > 0 && suurin <= 4096,
    `ladonnat ${JSON.stringify(ladonnat)}, webkit-rivi "${loki.find((r) => r.startsWith('alku ')) ?? '-'}"`);
  const kirkkausNyt = await macKirkkaus(s);
  vaadi('SAFARIN RAJAT (2539×1321): pallon pinta on värillinen', kirkkausNyt > 20,
    `kirkkaus ${kirkkausNyt.toFixed(1)} (kynnys 20)`);
  const tila = await s.evaluate(() => {
    const kahva = window.matkakirja?.ui?.pallolinssi?.kahva ?? null;
    return {
      puute: kahva?.puute ? String(kahva.puute() ?? 'ei') : 'ei-kahvaa',
      pisteita: document.querySelectorAll('.satelliitti-piste').length,
      pisteAika: window.__pisteAika,
      aktivointi: window.__aktivointi,
      kehykset: kahva?.avaruus?.tila?.()?.kehykset ?? null,
      pinnanKirkkaus: kahva?.avaruus?.tila?.()?.pinnanKirkkaus ?? null,
    };
  });
  vaadi('SAFARIN RAJAT: vartija ei näe puutetta ja pisteitä on 64',
    tila.puute === 'ei' && tila.pisteita === 64,
    `puute ${tila.puute}, pisteitä ${tila.pisteita}, pinnan kirkkaus ${tila.pinnanKirkkaus}`);
  vaadi('SAFARIN RAJAT: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
  if (ULOS) {
    await s.screenshot({
      path: join(ULOS, 'astro-webkit2-safarin-rajat-20260917.jpg'),
      type: 'jpeg', quality: 70, timeout: 120000,
    }).catch(() => {});
  }
  console.log(`    DIAG ${JSON.stringify(loki.slice(-8))}`);
  await konteksti.close();
}

/*
 * VÄITE 10b: KEHYKSIÄ EI TULE. Tämä on kohdan 36 koe: ilman kehyksiä
 * pallon pintaa ei piirretä eikä CSS2DRenderer lisää kohdemerkkejä
 * DOMiin — mutta ajastimet toimivat, joten kehysvahti voi pakottaa
 * piirron. Ennen korjausta tulos oli ruskea tyhjä ruutu ja
 * `vartija puute=pisteet pisteita=0`.
 */
async function ajaKehyksetPoikki() {
  const { konteksti, s } = await macIkkuna([WEBKIT_LIPUT, RAF_KATKAISIN, PISTEKELLO]);
  const virheet = [];
  s.on('pageerror', (e) => virheet.push(String(e)));
  await avaaPeli(s);
  // Kehykset poikki VASTA tässä: pelin oma käynnistys tarvitsee ne.
  await avaaLinssiEleella(s, 4500, () => {
    window.__rafKuollut = true;
    window.__aktivointi = performance.now();
  });
  await s.waitForTimeout(14000);
  const tila = await s.evaluate(() => {
    const kahva = window.matkakirja?.ui?.pallolinssi?.kahva ?? null;
    return {
      puute: kahva?.puute ? String(kahva.puute() ?? 'ei') : 'ei-kahvaa',
      pisteita: document.querySelectorAll('.satelliitti-piste').length,
      kehykset: kahva?.avaruus?.tila?.()?.kehykset ?? null,
      ilmoitus: Boolean(document.getElementById('linssivirhe')),
    };
  });
  vaadi('KEHYKSET POIKKI: kohdepisteet tulevat silti DOMiin',
    tila.pisteita === 64,
    `pisteitä ${tila.pisteita}, puute ${tila.puute}, kehykset ${JSON.stringify(tila.kehykset)}`);
  vaadi('KEHYKSET POIKKI: kehysvahti pakotti piirron',
    Number(tila.kehykset?.pakotettuja) > 0 && Number(tila.kehykset?.kehyksia) > 0,
    JSON.stringify(tila.kehykset));
  vaadi('KEHYKSET POIKKI: pelaajalle ei jää virheilmoitusta',
    !tila.ilmoitus && tila.puute === 'ei', `ilmoitus ${tila.ilmoitus}, puute ${tila.puute}`);
  vaadi('KEHYKSET POIKKI: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
  const loki = await LOKI(s);
  console.log(`    DIAG ${JSON.stringify(loki.slice(-6))}`);
  if (ULOS) {
    await s.screenshot({
      path: join(ULOS, 'astro-webkit2-kehykset-poikki-20260917.jpg'),
      type: 'jpeg', quality: 70, timeout: 120000,
    }).catch(() => {});
  }
  await konteksti.close();
}

/*
 * VÄITE 10c: MUSTA PINTA. Kangas valehtelee, joten kangastason
 * tarkistus ei voi nähdä mitään — vain piirtopuskurista luettu pikseli
 * voi. Vartijan on nimettävä `pinta-musta` ja varapolun palautettava
 * generoitu vyöhykepallo, jotta pelaaja näkee värillisen Maan.
 */
async function ajaMustaPinta() {
  const { konteksti, s } = await macIkkuna([WEBKIT_LIPUT, VALEHTELEVA_KANGAS(4000000)]);
  const virheet = [];
  s.on('pageerror', (e) => virheet.push(String(e)));
  await avaaPeli(s);
  await avaaLinssiEleella(s, 4500);
  await rauhoitu(s);
  await s.waitForTimeout(4000);
  const loki = await LOKI(s);
  const musta = loki.find((r) => r.startsWith('pinta-musta'));
  const mittaukset = loki.filter((r) => r.startsWith('pinta-mittaus'))
    .map((r) => Number(r.match(/kirkkaus=(-?\d+)/)?.[1] ?? NaN));
  vaadi('MUSTA PINTA: mittaus näkee mustan piirtopuskurista',
    Boolean(musta) && mittaukset.some((k) => k === 0 || k < 12),
    `pinta-musta "${musta ?? '-'}", mittaukset ${JSON.stringify(mittaukset)}`);
  vaadi('MUSTA PINTA: varapolku palauttaa värillisen pinnan',
    mittaukset.length >= 2 && mittaukset[mittaukset.length - 1] > 20,
    `mittaukset ${JSON.stringify(mittaukset)}`);
  /*
   * MUSTA JÄÄ KIINNI MYÖS PILVIEN ALTA (19.9.2026, PR #2590).
   *
   * Tämä lohko ON mustan pallon vastakoe: kangas valehtelee, pinnasta
   * tulee musta, ja vartion on nähtävä se. PAATOKSET 43 kohta 7:n
   * pilvikuori (peitto kaukaa 0,9, kangas 2 048 × 1 024 eli
   * valehtelevan kankaan rajan ALAPUOLELLA) piirtyy tässä normaalisti
   * ja peitti mittauspisteen: PR #2590:ssä vartio luki 186 mustasta
   * pinnasta eli ei nähnyt vikaa lainkaan. Siksi tässä vaaditaan
   * ERIKSEEN, että pilvet OLIVAT päällä ja näkyvissä kokeen aikana ja
   * että kuori on mittausten jälkeen taas piirrossa. Ilman tätä riviä
   * yllä olevat kaksi väitettä voisi "korjata" sammuttamalla pilvet.
   */
  const sumutila = await s.evaluate(() => {
    const t = window.matkakirja?.ui?.pallolinssi?.kahva?.avaruus?.tila?.() ?? null;
    return {
      pilvet: t?.sumu?.pilvet ?? null,
      nakyvyys: t?.sumu?.pilvienNakyvyys ?? null,
      ladattu: t?.sumu?.pilvetLadattu ?? null,
      piilossa: t?.sumu?.pilvetPiilossa ?? null,
      esteita: t?.pinnanEsteita ?? null,
    };
  });
  vaadi('MUSTA PINTA: pilvet olivat päällä, ja musta jäi silti kiinni',
    sumutila.ladattu === true && Number(sumutila.pilvet) > 0
      && Number(sumutila.nakyvyys) > 0 && sumutila.piilossa === false
      && Number(sumutila.esteita) >= 2,
    JSON.stringify(sumutila));
  const kirkkausNyt = await macKirkkaus(s);
  vaadi('MUSTA PINTA: pallo ei ole ruudulla musta', kirkkausNyt > 20,
    `kirkkaus ${kirkkausNyt.toFixed(1)} (kynnys 20)`);
  vaadi('MUSTA PINTA: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
  if (ULOS) {
    await s.screenshot({
      path: join(ULOS, 'astro-webkit2-musta-pinta-20260917.jpg'),
      type: 'jpeg', quality: 70, timeout: 120000,
    }).catch(() => {});
  }
  await konteksti.close();
}

/*
 * ── 11. KOLME AVAUSTA PERÄKKÄIN (LISÄYS 13 kohta 37 TARKENNUS) ────
 *
 * TÄMÄ ON KOHDAN 37 OIKEA KOE, ja se on vasta Mac-session mittauksen
 * jälkeen mahdollista kirjoittaa oikein (docs/raportit/viesti-fable-
 * webkit-toisto-20260917.md luku 4). Musta pallo EI synny kankaasta
 * vaan siitä, että linssin SULKU asettaa `globeImageUrl(null)`, jolloin
 * globe.gl maalaa materiaalin mustaksi — ja seuraava avaus perii sen.
 *
 * Yksi avaus ei siis voi nähdä vikaa lainkaan: se syntyy vasta
 * TOISESTA. Chromium headless toisti mustan 16/16 kertaa, joten tämä
 * väite on punainen ilman korjausta — se on oma vastakokeensa.
 *
 * Mitataan kolme avausta: joka kerta pallon keskipisteen kirkkaus
 * kuvakaappauksesta JA piirtopuskurista.
 */
async function ajaKolmeAvausta() {
  const { konteksti, s } = await macIkkuna([WEBKIT_LIPUT]);
  const virheet = [];
  s.on('pageerror', (e) => virheet.push(String(e)));
  await avaaPeli(s);
  const kierrokset = [];
  for (let n = 0; n < 3; n += 1) {
    if (n > 0) {
      // Linssi auki uudestaan pelaajan omilla eleillä.
      // eslint-disable-next-line no-await-in-loop
      await avaaLinssiEleella(s, 4500);
    } else {
      // eslint-disable-next-line no-await-in-loop
      await avaaLinssiEleella(s, 4500);
    }
    // eslint-disable-next-line no-await-in-loop
    await rauhoitu(s);
    // eslint-disable-next-line no-await-in-loop
    await s.waitForTimeout(2500);
    // eslint-disable-next-line no-await-in-loop
    const kuvasta = await macKirkkaus(s);
    // eslint-disable-next-line no-await-in-loop
    const puskurista = await s.evaluate(async () => {
      const m = await import('/js/linssit/satelliitti-avaruus.js');
      return m.pinnanKirkkaus(window.matkakirja?.ui?.pallonInstanssi);
    }).catch(() => null);
    // eslint-disable-next-line no-await-in-loop
    const vari = await s.evaluate(() => {
      const mat = window.matkakirja?.ui?.pallonInstanssi?.globeMaterial?.();
      return mat?.color ? mat.color.getHexString() : 'null';
    }).catch(() => '?');
    kierrokset.push({
      avaus: n + 1, kuvasta: +kuvasta.toFixed(1), puskurista, vari,
    });
    if (ULOS) {
      // eslint-disable-next-line no-await-in-loop
      await s.screenshot({
        path: join(ULOS, `astro-webkit2-avaus-${n + 1}-20260917.jpg`),
        type: 'jpeg', quality: 70, timeout: 120000,
      }).catch(() => {});
    }
    // Linssi kiinni pelaajan omalla ✕:llä — juuri se asettaa null-osoitteen.
    // eslint-disable-next-line no-await-in-loop
    await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
    // eslint-disable-next-line no-await-in-loop
    await s.waitForTimeout(2500);
  }
  const mustia = kierrokset.filter((k) => k.kuvasta <= 20);
  vaadi('KOLME AVAUSTA: pallon pinta on värillinen JOKA kerralla',
    mustia.length === 0,
    JSON.stringify(kierrokset));
  vaadi('KOLME AVAUSTA: piirtopuskuri näkee saman värin kuin ruutu',
    kierrokset.every((k) => k.puskurista === null || k.puskurista > 12),
    JSON.stringify(kierrokset.map((k) => k.puskurista)));
  vaadi('KOLME AVAUSTA: materiaalin väri ei ole musta avausten välissä',
    kierrokset.every((k) => k.vari !== '000000'),
    JSON.stringify(kierrokset.map((k) => k.vari)));
  vaadi('KOLME AVAUSTA: ei sivuvirheitä', virheet.length === 0,
    virheet.slice(0, 2).join(' | '));
  console.log(`    AVAUKSET ${JSON.stringify(kierrokset)}`);
  await konteksti.close();
}

/*
 * VÄITE 10d + VASTAKOE: ehjässä Mac-ajossa pisteet ovat DOMissa
 * budjetin sisällä, ne PYSYVÄT pinnan vaihdon yli, mustaa pintaa ei
 * havaita eikä kehyksiä tarvitse pakottaa. Ilman tätä vastakoetta
 * yksikään yllä olevista mittareista ei voisi mennä punaiseksi.
 */
async function ajaMacVastakoe() {
  const { konteksti, s } = await macIkkuna([WEBKIT_LIPUT, PISTEKELLO]);
  const virheet = [];
  s.on('pageerror', (e) => virheet.push(String(e)));
  await avaaPeli(s);
  await avaaLinssiEleella(s, 3000, () => {
    window.__aktivointi = performance.now();
    window.__aktivointiKehys = window.__kehysnyt?.() ?? null;
  });
  const ennenVaihtoa = await s.evaluate(() => ({
    pisteita: document.querySelectorAll('.satelliitti-piste').length,
    pisteAika: window.__pisteAika,
    pisteKehys: window.__pisteKehys,
    aktivointi: window.__aktivointi,
    aktivointiKehys: window.__aktivointiKehys,
    ilmoitus: Boolean(document.getElementById('linssivirhe')),
    reliefi: window.matkakirja?.ui?.pallolinssi?.kahva?.avaruus?.tila?.()?.reliefi ?? null,
  }));
  // Pinnan vaihto (reliefi) ja sen mittaus odotetaan loppuun asti.
  await s.waitForFunction(
    () => window.matkakirja?.ui?.pallolinssi?.kahva?.avaruus?.tila?.()?.reliefi === true,
    null, { timeout: 60000 },
  ).catch(() => {});
  await s.waitForTimeout(3000);
  const jalkeen = await s.evaluate(() => {
    const kahva = window.matkakirja?.ui?.pallolinssi?.kahva ?? null;
    const tila = kahva?.avaruus?.tila?.() ?? null;
    return {
      pisteita: document.querySelectorAll('.satelliitti-piste').length,
      puute: kahva?.puute ? String(kahva.puute() ?? 'ei') : 'ei-kahvaa',
      reliefi: tila?.reliefi ?? null,
      kehykset: tila?.kehykset ?? null,
      pinnanKirkkaus: tila?.pinnanKirkkaus ?? null,
      varapolku: tila?.pinnanVarapolku ?? null,
      webkit: tila?.ladonnanWebkit ?? null,
    };
  });
  const viive = ennenVaihtoa.pisteAika != null && ennenVaihtoa.aktivointi != null
    ? Math.round(ennenVaihtoa.pisteAika - ennenVaihtoa.aktivointi) : -1;
  const kehysviive = ennenVaihtoa.pisteKehys != null && ennenVaihtoa.aktivointiKehys != null
    ? ennenVaihtoa.pisteKehys - ennenVaihtoa.aktivointiKehys : -1;
  /*
   * VÄITE ON SE, MIKÄ VIKA OLI: pisteet päätyvät DOMiin eikä pelaajalle
   * jää ilmoitusta. Aika ja kehykset tulostetaan Mac-vertailua varten,
   * mutta ne eivät ole kynnys (ks. PISTEIDEN_TAVOITE_MAC_MS).
   */
  vaadi('VASTAKOE: kohdepisteet päätyvät DOMiin eikä pelaajalle jää ilmoitusta',
    ennenVaihtoa.pisteAika !== null && ennenVaihtoa.pisteita === 64
      && !ennenVaihtoa.ilmoitus,
    `${viive} ms / ${kehysviive} kehystä aktivoinnista (Macin tavoite`
    + ` ${PISTEIDEN_TAVOITE_MAC_MS} ms tarkistetaan Mac-ajossa),`
    + ` pisteitä ${ennenVaihtoa.pisteita}, ilmoitus ${ennenVaihtoa.ilmoitus}`);
  vaadi('VASTAKOE: pisteet pysyvät pinnan vaihdon yli',
    jalkeen.pisteita === 64 && jalkeen.reliefi === true,
    `ennen ${ennenVaihtoa.pisteita}, jälkeen ${jalkeen.pisteita}, reliefi ${jalkeen.reliefi}`);
  vaadi('VASTAKOE: ehjässä ajossa ei mustaa pintaa eikä varapolkua',
    jalkeen.varapolku === false && Number(jalkeen.pinnanKirkkaus) > 20 && jalkeen.puute === 'ei',
    `kirkkaus ${jalkeen.pinnanKirkkaus}, varapolku ${jalkeen.varapolku}, puute ${jalkeen.puute}`);
  vaadi('VASTAKOE: kehyksiä ei tarvitse pakottaa, kun laite antaa niitä',
    Number(jalkeen.kehykset?.kehyksia) > 0 && Number(jalkeen.kehykset?.pakotettuja) === 0,
    JSON.stringify(jalkeen.kehykset));
  vaadi('VASTAKOE: WebKit-liput tunnistetaan', jalkeen.webkit === true,
    `ladonnanWebkit ${jalkeen.webkit}`);
  vaadi('VASTAKOE: ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await konteksti.close();
}

for (const nimi of Object.keys(NAKYMAT)) {
  if (VALITUT.length && !VALITUT.includes(nimi)) continue;
  await ajaNakyma(nimi);
}

/*
 * Väite 9 ei ole näyttökoko vaan vartija, joten se ajetaan oletuksena
 * kerran. `NAKYMAT=vartija` ajaa VAIN sen (nopea uusinta ilman kahta
 * täyttä näyttöajoa); `NAKYMAT=puhelin` jättää sen pois.
 */
/*
 * Vartijalohko on tämän savukkeen PISIN osa (Mac-mittaus 18.9.2026:
 * 294 s neljän rinnakkaisen savukkeen kuormassa), joten se jakautuu
 * vielä kahtia: `vartija-a` ja `vartija-b`. `vartija` ajaa molemmat.
 */
const vartijaKaikki = !VARTIJA_POIS
  && (!VALITUT.length || VALITUT.includes('tyopoyta') || VALITUT.includes('vartija'));
/*
 * KOLMAS PUOLISKO `vartija-c` (omistaja 18.9.2026, Raamattu TARKENNUS
 * 11 kohta 24 a): Mac-mittaus 18.9.2026 antoi `vartija-a`:lle 168 s ja
 * `vartija-b`:lle 128 s, eli a oli yli kahden minuutin tavoitteen.
 * Neljän kokeen lohko jaettiin kahtia kokeiden RAJALTA — yhtään
 * väitettä ei muutettu eikä poistettu, ja `NAKYMAT=vartija` ajaa yhä
 * kaikki kuusi.
 */
if (vartijaKaikki || VALITUT.includes('vartija-a')) {
  await ajaVastakoeIlmanEstoa();
  await ajaKirjastoEstetty();
}
if (vartijaKaikki || VALITUT.includes('vartija-c')) {
  await ajaPintaEstetty();
  /* LISÄYS 13, kohdat 36 ja 37: Mac-WebAppin kotelo ja Safarin rajat. */
  await ajaMacVastakoe();
}
if (vartijaKaikki || VALITUT.includes('vartija-b')) {
  await ajaSafarinRajatMacissa();
  await ajaKehyksetPoikki();
  await ajaMustaPinta();
  /* Kohdan 37 oikea koe: musta syntyy vasta TOISESTA avauksesta. */
  await ajaKolmeAvausta();
}

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((r) => !r.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi`);
process.exit(kaatui.length ? 1 : 0);
