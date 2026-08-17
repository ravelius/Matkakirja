/*
 * Karttazoom-widget: zoomattava ja panoroitava kuvalava kiinteän
 * kehyksen sisällä (kohdekartta ja lippukartat). Siirretty
 * js/ui.js:stä 17.8.2026 (remontin M3, mallin B pilotti). Widget on
 * parametrivetoinen: ui-oliosta luetaan vain reducedMotion — kaikki
 * muu tulee kutsujalta.
 */

/**
 * Kohdekartan zoom ja panorointi (omistajan tilaus 14.8.2026:
 * *"voiko kaupunkikartasta tehdä zoomattavaa (myös
 * satelliittikartasta) ... pyörisi nykyisessä ikkunassa"*).
 *
 * Kartta ei aukea omaan ikkunaansa eikä kasva sivulla: lava liikkuu
 * kiinteän kehyksen sisällä CSS-muunnoksella
 * `translate(tx, ty) scale(k)`, origo lavan vasemmassa ylänurkassa.
 * Kaikki eleet päätyvät samaan kolmeen lukuun, ja piirto tehdään
 * yhdessä paikassa (piirra) — siksi rajaus ja reunojen pitely ovat
 * varmasti samat riippumatta siitä, tuliko liike sormesta, rullasta,
 * napista vai näppäimistöstä.
 *
 * ZOOMAAMATTOMANA MUUNNOSTA EI OLE LAINKAAN (tyhjä transform), ei
 * edes `scale(1)`. Muunnos tekee elementistä oman rasterointi- ja
 * sisältökontekstinsa, ja kartan hiusviivat piirtyvät silloin eri
 * tavalla. Kun kerroin on 1, sivun on oltava pikselilleen sama kuin
 * ennen tätä ominaisuutta.
 *
 * ELE EI SAA VUOTAA LEHDEN SELAUKSEEN. Kortilla on pyyhkäisyselaus ja
 * ylä-/alareunan napautusvieritys (kytkeTutkiSelaus), ja molemmat
 * lukevat samoja tapahtumia kuin tämä. Siksi:
 *   - zoomaamaton kartta EI ota yhden sormen raahausta lainkaan,
 *     joten lehteä selataan kartan päältäkin kuten ennen;
 *   - zoomattuna raahaus panoroi ja tapahtuma pysäytetään kehykseen;
 *   - nipistyksen ajan kaikki osoitintapahtumat pysäytetään kehykseen,
 *     ettei kahden sormen liike näyttäisi pyyhkäisyltä;
 *   - raahauksen ja tuplanapautuksen perään jätetään kertakäyttöinen
 *     napsautustulppa, ettei ele avaa kohdetta tai vieritä sivua.
 *
 * NIPISTYS LUETAAN KOSKETUSTAPAHTUMISTA, ei osoitintapahtumista.
 * Sama havainto kuin pelilaudalla (asennaPanorointi): iOS aloittaa
 * oman sivunzoominsa `touch-action`-arvosta riippumatta ja peruu
 * osoitintapahtumat kesken eleen — vain touchmoven preventDefault
 * pysäyttää sen.
 */
export function kytkeKarttaZoom(ui, kehys, lava, napit, ydin = { x: 0, y: 0, leveys: 100, korkeus: 100 }, ohjain = {}) {
  const PIENIN = 1;
  // Yläraja on kolme: piirretty PNG on 1600 px leveä ydinrajausta
  // kohden ja näkyy noin 600 pikselin palstalla, joten
  // kolminkertaisenakin näytetään yhä kuvan omia pikseleitä eikä
  // selaimen venytystä. Reunus ei muuta tätä: laajennettu kuva on
  // piirretty samassa suhteessa leveämpänä (1600 × laajennus).
  const SUURIN = 3;
  const ASKEL = 1.5;
  /*
   * REUNUS AUKEAA HETI ZOOMATESSA MUTTA EI YHDELLÄ LOIKALLA.
   * Kertoimella 1 näkymä on ydinrajaus (ja lavalla ei ole
   * muunnosta); kertoimesta 1,25 ylöspäin panorointi ulottuu koko
   * piirretylle alalle. Väli on liukuma, ja se on siellä yhtä
   * syytä varten: ilman sitä pohjaan loitonnettaessa reunukselta
   * ydinrajaukseen palattaisiin hyppäyksellä juuri viimeisellä
   * pykälällä. Nyt kartta liukuu kotiin.
   */
  const REUNUS_AUKEAA = 1.25;
  let k = 1;
  let tx = 0;
  let ty = 0;
  let raahaus = null;
  let raahattiin = false;
  let nipistys = null;
  let elettaKesken = false;
  let edellinenNapautus = null;

  const rajaa = (arvo, ala, yla) => Math.min(yla, Math.max(ala, arvo));

  const piirra = (silea = false) => {
    const W = lava.offsetWidth;
    const H = lava.offsetHeight;
    k = rajaa(k, PIENIN, SUURIN);
    /*
     * PANOROINNIN RAJAT. Kehys näyttää lepotilassa ydinrajauksen,
     * joka on lavalla kohdassa (x0, y0) ja kokoa (kW, kH) — koko
     * lava, jos kartta ei ole laajennettu.
     *
     * Sallittu ala kasvaa ydinrajauksesta koko lavaan sitä mukaa
     * kuin karttaa suurennetaan (REUNUS_AUKEAA). Näkyvä ikkuna on
     * lavan koordinaateissa [(x0 − tx)/k, +kW/k], ja vaatimus
     * "ikkuna pysyy sallitulla alalla" antaa siirrolle välin
     * [x0 + kW − k·ax1, x0 − k·ax0]. Kertoimella 1 väli kutistuu
     * pisteeksi 0, eli kartta palaa ydinrajaukseen ja lava jää
     * ilman muunnosta.
     *
     * Laajentamattomalla kartalla x0 = 0 ja kW = W, jolloin kaava
     * on sanasta sanaan entinen [W·(1−k), 0].
     *
     * SATELLIITTINÄKYMÄSSÄ REUNUSTA EI OLE: kuva on vanhalla
     * rajauksella (ks. piirraKaupunkiKartta), joten sallittu ala
     * pysyy ydinrajauksena kertoimesta riippumatta.
     */
    const reunus = lava.classList.contains('satelliittinakyma')
      ? 0
      : Math.min(1, Math.max(0, (k - 1) / (REUNUS_AUKEAA - 1)));
    const x0 = (ydin.x / 100) * W;
    const y0 = (ydin.y / 100) * H;
    const kW = (ydin.leveys / 100) * W;
    const kH = (ydin.korkeus / 100) * H;
    tx = rajaa(tx, x0 + kW - k * (x0 + kW + reunus * (W - x0 - kW)), x0 - k * (x0 * (1 - reunus)));
    ty = rajaa(ty, y0 + kH - k * (y0 + kH + reunus * (H - y0 - kH)), y0 - k * (y0 * (1 - reunus)));
    const zoomattu = k > 1.001;
    lava.classList.toggle('silea', silea && !ui.reducedMotion);
    lava.style.transform = zoomattu
      ? `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${k.toFixed(4)})`
      : '';
    // Pisteet, vihjeet ja mittajanan viivat vastaskaalataan tällä,
    // jottei numeroympyrä paisu kolminkertaiseksi zoomatessa.
    lava.style.setProperty('--zoom', k.toFixed(4));
    kehys.classList.toggle('zoomattu', zoomattu);
    napit.lahenna.disabled = k >= SUURIN - 0.001;
    napit.loitonna.disabled = !zoomattu;
  };

  /**
   * Näytön piste lavan omaan (zoomaamattomaan) koordinaatistoon.
   * getBoundingClientRect kertoo MUUNNETUN laatikon, ja koska
   * skaalaus tapahtuu origon ympäri, muunnoksen origo on
   * `rect.left − tx`. Mittaus elementistä eikä asettelusta on tässä
   * sama valinta kuin pelilaudalla: se kestää sen, että lehti on
   * vieritetty tai kortti liikkuu.
   */
  const lavalle = (asiakasX, asiakasY) => {
    const r = lava.getBoundingClientRect();
    return { x: asiakasX - (r.left - tx), y: asiakasY - (r.top - ty) };
  };

  /** Zoomaa niin, että annettu näytön piste pysyy paikallaan. */
  const zoomaa = (uusi, asiakasX, asiakasY, silea = false) => {
    const kohde = rajaa(uusi, PIENIN, SUURIN);
    if (Math.abs(kohde - k) < 0.0005) return;
    const m = lavalle(asiakasX, asiakasY);
    const suhde = kohde / k;
    // t' = m − (m − t) · suhde pitää sormen (tai osoittimen) alla
    // olevan kohdan paikallaan.
    tx = m.x - (m.x - tx) * suhde;
    ty = m.y - (m.y - ty) * suhde;
    k = kohde;
    piirra(silea);
  };

  /** Napeista ja näppäimistöstä zoomataan kehyksen keskipisteeseen. */
  const keskelta = (uusi) => {
    const r = kehys.getBoundingClientRect();
    zoomaa(uusi, r.left + r.width / 2, r.top + r.height / 2, true);
  };

  const nollaa = () => { k = 1; tx = 0; ty = 0; piirra(true); };

  /*
   * Kertakäyttöinen napsautustulppa eleen perään: raahaus ei saa
   * avata kohteen juttua eikä laukaista reunakaistan vieritystä.
   * Tulppa puretaan ajastimella, koska napsautusta ei aina tule
   * (sormi voi nousta kehyksen ulkopuolella) eikä se saa jäädä
   * odottamaan seuraavaa oikeaa napautusta.
   */
  const nielaiseNapsautus = () => {
    const nielu = (e) => { e.preventDefault(); e.stopPropagation(); };
    kehys.addEventListener('click', nielu, { capture: true, once: true });
    setTimeout(() => kehys.removeEventListener('click', nielu, true), 350);
  };

  napit.lahenna.addEventListener('click', () => keskelta(k * ASKEL));
  napit.loitonna.addEventListener('click', () => keskelta(k / ASKEL));

  /*
   * RULLA. Kartan yli rullaaminen zoomaa, mutta rajalla tapahtuma
   * päästetään läpi: zoomaamattoman kartan yli alaspäin rullaava
   * lukija jatkaa juttua kuten ennenkin, ja täyteen zoomatun kartan
   * yli sisäänpäin rullaava pääsee samoin eteenpäin. Ilman tätä
   * poikkeusta kartta olisi lehden keskellä hiirilukko.
   */
  kehys.addEventListener('wheel', (e) => {
    const sisaan = e.deltaY < 0;
    if (sisaan ? k >= SUURIN - 0.001 : k <= PIENIN + 0.001) return;
    e.preventDefault();
    // deltaMode: 0 = pikseliä, 1 = riviä, 2 = sivua.
    const kerroin = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? 400 : 1);
    zoomaa(k * Math.exp((-e.deltaY * kerroin) / 620), e.clientX, e.clientY);
  }, { passive: false });

  /** Osoitintapahtumat eivät saa vuotaa selaukseen kesken eleen. */
  const suojaa = (e) => { if (elettaKesken) e.stopPropagation(); };

  kehys.addEventListener('pointerdown', (e) => {
    raahattiin = false;
    suojaa(e);
    // Zoomaamaton kartta ei ota raahausta: silloin lehden pyyhkäisy-
    // selaus toimii kartan päältäkin täsmälleen kuten ennen.
    if (elettaKesken || k <= PIENIN + 0.001) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    /*
     * Kohteen numeroympyrästä EI aloiteta panorointia. Raahaus ottaa
     * osoittimen kiinni (setPointerCapture), ja kaapatun osoittimen
     * napsautus ei enää osu nappiin — mitattuna: zoomatussa kartassa
     * kohteen napautus ei avannut juttua lainkaan. Ympyrä on pieni,
     * joten sen menettäminen panoroinnin lähtöalueena ei maksa
     * mitään; kartta on ympärillä.
     */
    if (e.target.closest?.('button, a')) return;
    raahaus = { id: e.pointerId, x: e.clientX, y: e.clientY, tx, ty };
    kehys.setPointerCapture?.(e.pointerId);
    e.stopPropagation();
  });

  kehys.addEventListener('pointermove', (e) => {
    suojaa(e);
    if (!raahaus || e.pointerId !== raahaus.id) return;
    const dx = e.clientX - raahaus.x;
    const dy = e.clientY - raahaus.y;
    // Muutaman pikselin heilahdus on napautus eikä raahaus — muuten
    // kohteen avaaminen epäonnistuisi vapisevalla sormella.
    if (!raahattiin && Math.hypot(dx, dy) < 4) return;
    raahattiin = true;
    tx = raahaus.tx + dx;
    ty = raahaus.ty + dy;
    piirra();
    e.preventDefault();
    e.stopPropagation();
  });

  const paataRaahaus = (e) => {
    if (!raahaus || e.pointerId !== raahaus.id) return;
    raahaus = null;
    if (!raahattiin) return;
    nielaiseNapsautus();
    e.stopPropagation();
  };
  kehys.addEventListener('pointercancel', paataRaahaus);

  /*
   * TUPLANAPAUTUS ilman dblclick-tapahtumaa. Kosketuslaitteiden
   * dblclick on epäluotettava, ja jos molempia kuunneltaisiin,
   * lähennys ja loitonnus kumoaisivat toisensa samasta eleestä.
   * Napautus kohteen ympyrään ei zoomaa vaan avaa jutun kuten ennen.
   */
  kehys.addEventListener('pointerup', (e) => {
    suojaa(e);
    paataRaahaus(e);
    if (raahattiin || elettaKesken) return;
    if (e.target.closest?.('button, a')) return;
    const osuma = edellinenNapautus
      && e.timeStamp - edellinenNapautus.aika < 380
      && Math.hypot(e.clientX - edellinenNapautus.x, e.clientY - edellinenNapautus.y) < 30;
    edellinenNapautus = osuma ? null : { aika: e.timeStamp, x: e.clientX, y: e.clientY };
    if (!osuma) return;
    if (k > PIENIN + 0.001) nollaa();
    else zoomaa(2, e.clientX, e.clientY, true);
    e.preventDefault();
    e.stopPropagation();
    nielaiseNapsautus();
  });

  /* --- nipistys (kosketustapahtumat, ks. metodin kommentti) --- */
  const kaksiSormea = (e) => {
    const [a, b] = [e.touches[0], e.touches[1]];
    return {
      etaisyys: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
      keski: { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 },
    };
  };

  kehys.addEventListener('touchstart', (e) => {
    if (e.touches.length < 2) return;
    const { etaisyys, keski } = kaksiSormea(e);
    // Aivan vierekkäiset sormet antaisivat jakolaskussa mitä tahansa.
    if (etaisyys < 24) return;
    const m = lavalle(keski.x, keski.y);
    nipistys = {
      etaisyys,
      kerroin: k,
      // Sormien alla oleva kartan piste eleen alussa. Kun se
      // pidetään sormien alla koko eleen ajan, nipistys myös panoroi
      // — kaksi sormea siirtää ja suurentaa samalla kertaa.
      piste: { x: (m.x - tx) / k, y: (m.y - ty) / k },
    };
    elettaKesken = true;
    raahaus = null;
    raahattiin = true;
    edellinenNapautus = null;
  }, { passive: false });

  kehys.addEventListener('touchmove', (e) => {
    if (!nipistys || e.touches.length < 2) return;
    // Vain tämä pysäyttää Safarin oman sivunzoomin (ks. metodin
    // kommentti) — touch-action ei siihen riitä.
    e.preventDefault();
    e.stopPropagation();
    const { etaisyys, keski } = kaksiSormea(e);
    k = rajaa((nipistys.kerroin * etaisyys) / nipistys.etaisyys, PIENIN, SUURIN);
    const m = lavalle(keski.x, keski.y);
    tx = m.x - nipistys.piste.x * k;
    ty = m.y - nipistys.piste.y * k;
    piirra();
  }, { passive: false });

  const kosketusLoppui = (e) => {
    if (e.touches.length < 2) nipistys = null;
    // Ele on ohi vasta kun ruudulla ei ole yhtään sormea: muuten
    // toisen sormen irrotus päästäisi lopun pyyhkäisynä läpi.
    if (e.touches.length === 0) elettaKesken = false;
  };
  kehys.addEventListener('touchend', kosketusLoppui);
  kehys.addEventListener('touchcancel', kosketusLoppui);

  /*
   * NÄPPÄIMISTÖ. Nuolet vaihtavat lehden sivua (kytkeTutkiSelaus),
   * joten zoomattu kartta ottaa ne itselleen ja pysäyttää ne — mutta
   * vain zoomattuna, jotta selaus toimii muuten ennallaan.
   */
  const NUOLET = {
    ArrowLeft: { x: 1, y: 0 }, ArrowRight: { x: -1, y: 0 },
    ArrowUp: { x: 0, y: 1 }, ArrowDown: { x: 0, y: -1 },
  };
  kehys.addEventListener('keydown', (e) => {
    const nuoli = NUOLET[e.key];
    if (e.key === '+' || e.key === '=') keskelta(k * ASKEL);
    else if (e.key === '-') keskelta(k / ASKEL);
    else if (e.key === '0') nollaa();
    else if (nuoli && k > PIENIN + 0.001) {
      tx += nuoli.x * 48;
      ty += nuoli.y * 48;
      piirra(true);
    } else return;
    e.preventDefault();
    e.stopPropagation();
  });

  // Näkymävipu tarvitsee uudelleenpiirron: satelliittiin
  // vaihtaminen kaventaa sallitun alan ydinrajaukseen.
  ohjain.paivita = () => piirra(true);
  piirra();
}
