// CHROMIUM-LIPUT — rivikohtaiset lisäargumentit savukkeen selaimelle.
//
// Omistaja 18.9.2026 klo 18.35 (Raamattu: AGENTIT VAIN OPUS JA SONNET,
// TARKENNUS 11 kohta 24 d): *"Ajetaanko nuo aina GPU:lla vai voiko
// CPU:ta myös hyödyntää?"* — kun 12 Chromiumia ajaa yhtä aikaa, GPU on
// niiden YHTEINEN pullonkaula, kun taas Mac Studion 16 ydintä ovat
// suurimman osan ajasta vajaakäytöllä. Kevyet, pallottomat savukkeet
// voi siksi ajaa ANGLE/SwiftShaderin ohjelmallisella WebGL:llä ja
// jättää GPU raskaille pallorivistöille.
//
// ── MIKSI TÄMÄ ON ERILLINEN "SHIM" EIKÄ MUUTOS SAVUKKEISIIN ────────
//
// Savukkeita on yli 150 ja jokainen kutsuu `chromium.launch()`ia itse.
// Yhteistä käynnistysapuria EI ole, eikä sellaista voi lisätä tässä
// erässä koskematta jokaiseen tiedostoon. Tämä moduuli ladataan sen
// sijaan Noden `--import`illa ENNEN savuketta (tools/savukkeet/
// aja-sarja.mjs asettaa NODE_OPTIONSin), ja se kääriä Playwrightin
// `chromium.launch`in niin, että annetut liput lisätään `args`-listaan
// riippumatta siitä, mikä savuke ajetaan.
//
// Savuke saa yhä oman `args`-listansa: shim LISÄÄ liput perään eikä
// korvaa mitään. Jos ympäristömuuttujaa ei ole, tämä moduuli ei tee
// yhtään mitään.
//
// KÄYTTÖ:
//   SAVUKE_CHROMIUM_LIPUT="--use-gl=angle --use-angle=swiftshader"
// tai sarjat.jsonin rivikohtaisessa "env"-lohkossa (aja-sarja.mjs
// välittää sen ja kytkee shimin päälle automaattisesti).
//
// VIRHE EI SAA KAATAA SAVUKETTA: jos Playwrightia ei löydy tästä
// prosessista (eri polku, eri resoluutio), shim vaikenee ja savuke
// ajetaan aivan kuten ennenkin. Mittaus näkyy lokissa rivinä
// "INFO  chromium-liput: ...", joten hiljainen epäonnistuminen erottuu.

/*
 * MACIN MEDIAPANEELI POIS (Fable 19.9.2026 klo 15.00 Suomen aikaa): macOS:n
 * MediaRemoteUI ("Toistetaan nyt") kaatui neljästi savukesarjojen aikana
 * (13.53, 14.07, 14.14, 14.47), koska jokainen ääntä soittava Chromium
 * rekisteröi mediaistunnon paneeliin ja kuusi rinnakkaista riittää
 * kaatamaan sen. Savukkeiden selaimet eivät tarvitse mediapaneelia eivätkä
 * laitteiston medianäppäimiä, joten ne kytketään pois OLETUKSENA. Koska
 * Chromium lukee vain VIIMEISEN --disable-features-lipun, kaikki
 * poiskytkettävät piirteet kootaan yhteen lippuun (rivin oma lista,
 * esim. AudioServiceOutOfProcess, säilyy).
 */
const OLETUSPOIS = ['HardwareMediaKeyHandling', 'MediaSessionService'];

function kokoaLiput(lahde) {
  const annetut = (lahde ?? '').split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
  const pois = new Set(OLETUSPOIS);
  const muut = [];
  for (const lippu of annetut) {
    const m = lippu.match(/^--disable-features=(.*)$/);
    if (m) m[1].split(',').filter(Boolean).forEach((f) => pois.add(f));
    else muut.push(lippu);
  }
  return [...muut, `--disable-features=${[...pois].join(',')}`];
}

const liput = process.env.SAVUKE_CHROMIUM_LIPUT === '0' ? [] : kokoaLiput(process.env.SAVUKE_CHROMIUM_LIPUT);
export { kokoaLiput, OLETUSPOIS };

if (liput.length) {
  // Sama kahden lähteen haku kuin savukkeissa itsessään: ensin repon
  // oma node_modules (bare specifier), sitten koneen oma polku.
  const lahteet = ['playwright', process.env.PLAYWRIGHT_JS].filter(Boolean);
  let osui = false;
  for (const lahde of lahteet) {
    let moduuli;
    try {
      // eslint-disable-next-line no-await-in-loop
      moduuli = await import(lahde);
    } catch {
      continue;
    }
    const chromium = moduuli?.chromium ?? moduuli?.default?.chromium;
    if (!chromium || typeof chromium.launch !== 'function') continue;
    if (chromium.__savukeLiput) { osui = true; continue; }
    const alkuperainen = chromium.launch.bind(chromium);
    chromium.launch = (asetukset = {}) => alkuperainen({
      ...asetukset,
      args: [...(asetukset.args ?? []), ...liput],
    });
    chromium.__savukeLiput = liput.join(' ');
    osui = true;
  }
  console.log(osui
    ? `INFO  chromium-liput: ${liput.join(' ')}`
    : `INFO  chromium-liput: EI KYTKETTY (Playwrightia ei löytynyt) — ${liput.join(' ')}`);
}

/*
 * AJURI ILMAN NÄYTTÖISTUNTOA (Fable 25.9.2026, Karttaseppä). Savukeajurin
 * LaunchAgent (SessionCreate) ajaa koodaus-käyttäjänä omassa istunnossaan;
 * kun konsoli on toisella käyttäjällä, istunnolla ei ole näyttöä:
 *   - WebKit (Playwright.app) ei käynnisty lainkaan: launch jää 180 s:n
 *     aikakatkaisuun (25.9. klo 13.38 alkaen 11 savuketta 0/0).
 *   - Chrome for Testing (uusi headless) kirjaa "CVDisplayLinkCreateWith-
 *     CGDisplay failed" ja kaatuu pitkässä ajossa SEGV:iin (astro-sumu).
 * aja-sarja.mjs kokeilee WebKitin kerran sarjan alussa ja asettaa
 * SAVUKE_EI_NAYTTOA=1, jos se ei käynnisty. Silloin tämä shim
 *   - vaihtaa Chrome for Testingin Playwrightin headless-kuoreen
 *     (chromium_headless_shell, vanha headless, ei näyttölinkkiä) ja antaa
 *     sille ANGLE Metalin (oikea GPU, ks. muistiinpano gpu-headless-metal),
 *     ellei savuke/rivi ole valinnut GL-taustaa itse;
 *   - ohjaa webkit.launchin Chromiumiin (savukkeet, joissa WebKit on
 *     kovakoodattu; SAVUKE_MOOTTORI-savukkeet ohjataan jo aja-sarjassa).
 * Mitattu ajurilla 25.9.2026 (ajo 36165941808): WebKit 40 s aikakatkaisu,
 * headless-kuori + Metal 0,6 s ja "ANGLE Metal Renderer: Apple M4 Max".
 */
if (process.env.SAVUKE_EI_NAYTTOA === '1') {
  const GPU = ['--use-angle=metal', '--ignore-gpu-blocklist'];
  let osui = false;
  for (const lahde of ['playwright', process.env.PLAYWRIGHT_JS].filter(Boolean)) {
    let moduuli;
    try {
      // eslint-disable-next-line no-await-in-loop
      moduuli = await import(lahde);
    } catch {
      continue;
    }
    const pw = moduuli?.chromium ? moduuli : moduuli?.default;
    if (!pw?.chromium || typeof pw.chromium.launch !== 'function') continue;
    if (pw.chromium.__savukeEiNayttoa) { osui = true; continue; }
    const kaynnista = pw.chromium.launch.bind(pw.chromium);
    pw.chromium.launch = (asetukset = {}) => {
      if (asetukset.headless === false) return kaynnista(asetukset);
      const args = asetukset.args ?? [];
      const omaGl = args.some((a) => /^--use-(gl|angle)=/.test(a));
      const cft = /Google Chrome for Testing/.test(asetukset.executablePath ?? '');
      return kaynnista({
        ...asetukset,
        executablePath: cft ? undefined : asetukset.executablePath,
        args: omaGl ? args : [...args, ...GPU],
      });
    };
    pw.chromium.__savukeEiNayttoa = true;
    if (pw.webkit && typeof pw.webkit.launch === 'function') {
      pw.webkit.launch = (asetukset = {}) => {
        console.log('INFO  ei näyttöistuntoa: webkit.launch → Chromium (headless-kuori + Metal)');
        return pw.chromium.launch(asetukset);
      };
    }
    osui = true;
  }
  console.log(osui
    ? 'INFO  ei näyttöistuntoa: Chromium headless-kuorena + ANGLE Metal, WebKit → Chromium'
    : 'INFO  ei näyttöistuntoa: EI KYTKETTY (Playwrightia ei löytynyt)');
}
