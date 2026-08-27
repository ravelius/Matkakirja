// Laudalla pomppiva 3D-noppa.
//
// Noppa heitetään pelaajan nappulan vierestä kartan alalaidan merelle. Lento
// simuloidaan oikealla painovoimalla: kaari, kimpoilu pienenevin pompuin ja
// hidastuva pyörintä. Korkeus näkyy varjon koossa ja tummuudessa sekä nopan
// koossa, joten heitto tuntuu kolmiulotteiselta. Noppa jää laudalle lepäämään
// seuraavaan heittoon asti.
//
// NOPPA MAKAA KARTAN PÄÄLLÄ, EI RUUDUN PÄÄLLÄ (omistajan tilaus #98).
// Kerros elää kartan siirtokuoressa (.kartta-kuori), joten panorointi ja
// nipistys kuljettavat sen mukanaan ilman että täällä lasketaan mitään.
// Kuoren ulkopuolelta tarvitaan vain kaksi asiaa, ja ne ovat tämän
// luokan rajapinnassa:
//
//   place()        lepopaikka kuoren omina pikseleinä (js/kartta.js
//                  ankkuroiNoppa laskee sen laudan koordinaateista)
//   asetaSkaala()  koko kartan mittakaavassa: 1 = se koko, jossa noppa
//                  heitettiin, 2 = kartta on siitä kaksinkertaistunut
//
// Kolmas lisäys on häivytys: uuteen kaupunkiin saavuttaessa noppa
// katoaa pehmeästi (haivyta) eikä jää edellisen heiton muistoksi.

const PIPS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

// Kuution tahkot: 1 edessä, 6 takana, 3 oikealla, 4 vasemmalla, 2 ylhäällä, 5 alhaalla.
const FACES = [
  { value: 1, transform: 'translateZ(var(--half))' },
  { value: 6, transform: 'rotateY(180deg) translateZ(var(--half))' },
  { value: 3, transform: 'rotateY(90deg) translateZ(var(--half))' },
  { value: 4, transform: 'rotateY(-90deg) translateZ(var(--half))' },
  { value: 2, transform: 'rotateX(90deg) translateZ(var(--half))' },
  { value: 5, transform: 'rotateX(-90deg) translateZ(var(--half))' },
];

// Kierto, jolla haluttu silmäluku kääntyy katsojaa kohti.
const FACE_ROTATION = {
  1: [0, 0],
  2: [-90, 0],
  3: [0, -90],
  4: [0, 90],
  5: [90, 0],
  6: [0, 180],
};

// Fysiikan vakiot (pikseliä ja sekuntia).
const GRAVITY = 3400; // painovoima
const BOUNCE = 0.45; // kimmoisuus: paljonko vauhtia jää pompun jälkeen
const DRAG = 0.56; // vaakavauhdin hidastuminen pompussa
const SPIN_DAMP = 0.5; // pyörinnän hidastuminen pompussa
const STOP_SPEED = 60; // tätä hitaampi pomppu ei enää nosta noppaa
const LIFT = 0.62; // korkeus näytöllä: 1 px korkeutta = 0.62 px ylöspäin
const SETTLE_MS = 430; // viimeinen kallahdus oikealle silmäluvulle
const HAIPYMINEN_MS = 420; // kaupunkiin saavuttaessa noppa katoaa pehmeästi

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class BoardDie {
  constructor(container) {
    this.layer = document.createElement('div');
    this.layer.className = 'die-layer';
    this.layer.hidden = true;

    // Varjo on erillään nopasta: se jää laudan pintaan, kun noppa nousee ilmaan.
    this.shadow = document.createElement('div');
    this.shadow.className = 'die-shadow';
    this.layer.appendChild(this.shadow);

    this.root = document.createElement('div');
    this.root.className = 'board-die';

    this.cube = document.createElement('div');
    this.cube.className = 'die-cube';
    for (const face of FACES) {
      const el = document.createElement('div');
      el.className = `die-face face-${face.value}`;
      el.style.transform = face.transform;
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('span');
        if (PIPS[face.value].includes(i)) cell.className = 'pip';
        el.appendChild(cell);
      }
      this.cube.appendChild(el);
    }
    this.root.appendChild(this.cube);

    // Kiiltokerros ei pyöri mukana, joten valo tulee aina samasta suunnasta.
    this.gloss = document.createElement('div');
    this.gloss.className = 'die-gloss';
    this.root.appendChild(this.gloss);

    this.layer.appendChild(this.root);
    container.appendChild(this.layer);

    this.rotation = { x: -22, y: 26, z: 0 };
    this.spot = { x: 0, y: 0 };
    this.applyRotation(0);
    this.draw(0);
  }

  applyRotation(transition) {
    this.cube.style.transition = transition
      ? `transform ${transition}ms cubic-bezier(0.26, 1.1, 0.4, 1)`
      : 'none';
    const { x, y, z } = this.rotation;
    this.cube.style.transform =
      `rotateZ(${z.toFixed(2)}deg) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
  }

  /** Piirtää nopan ja varjon annetulle korkeudelle (z = pikseliä laudan yllä). */
  draw(z) {
    const { x, y } = this.spot;
    const scale = 1 + z * 0.0016; // korkealla noppa on lähempänä katsojaa
    this.root.style.transform =
      `translate3d(${x.toFixed(1)}px, ${(y - z * LIFT).toFixed(1)}px, 0) `
      + `translate(-50%, -50%) scale(${scale.toFixed(3)})`;

    // Varjo levenee, haalistuu ja sumenee, kun noppa nousee. Pieni vakio-
    // siirtymä alaviistoon pitää varjon näkyvissä nopan alta myös levossa —
    // valo tulee vasemmalta ylhäältä kuten patinassakin.
    const t = Math.min(1, z / 240);
    this.shadow.style.transform =
      `translate3d(${(x + 5 + z * 0.08).toFixed(1)}px, ${(y + 5 + z * 0.035).toFixed(1)}px, 0) `
      + `translate(-50%, -50%) scale(${(1 + t * 0.9).toFixed(3)})`;
    // Laudalla varjo on vahva ja tiivis, ilmassa haalea ja levinnyt.
    this.shadow.style.opacity = (0.82 - t * 0.62).toFixed(3);
    // Varjossa ei ole blur-suodinta lainkaan: pehmeys tulee liukuvärjäyksestä
    // (css .die-shadow). Aiemmin sumennussäde kasvoi korkeuden mukaan joka
    // kehyksellä, jolloin selain ei voinut käyttää valmista rasteria vaan
    // sumensi varjon uudelleen jokaisella ruudulla. Skaala ja peitto yllä
    // antavat saman vaikutelman kompositorin läpi.
  }

  /** Siirtää nopan lepopaikalleen ilman animaatiota (esim. ikkunan koon muuttuessa). */
  place({ x, y }) {
    this.spot = { x, y };
    this.draw(0);
  }

  /**
   * Nopan koko KARTAN mittakaavassa (omistajan tilaus #98: *"nopan koko
   * skaalautuu samassa suhteessa kuin kartta"*).
   *
   * Kerroin kirjoitetaan CSS-muuttujaan eikä muunnokseen: `--die-size`
   * on kuution kaikkien mittojen — tahkojen, varjon ja `--half`-syvyyden
   * — lähde, joten yksi muuttuja riittää eikä `draw()` tarvitse tietää
   * skaalasta mitään. Muunnokseen kirjoitettu scale kertautuisi heiton
   * korkeusskaalan kanssa ja söisi juuri sen 3D-vihjeen.
   */
  asetaSkaala(kerroin) {
    if (!(kerroin > 0) || !Number.isFinite(kerroin)) return;
    this.layer.style.setProperty('--die-skaala', kerroin.toFixed(4));
  }

  hide() {
    clearTimeout(this.haipymisAjastin);
    this.layer.classList.remove('noppa-haipyy');
    this.layer.hidden = true;
  }

  /**
   * Häivyttää nopan pois (uusi kaupunki). Kerros piilotetaan vasta
   * siirtymän jälkeen, jotta seuraava heitto ei ala puoliksi näkyvästä
   * nopasta; `roll` nollaa luokan joka tapauksessa.
   */
  haivyta() {
    if (this.layer.hidden) return;
    clearTimeout(this.haipymisAjastin);
    this.layer.classList.add('noppa-haipyy');
    this.haipymisAjastin = setTimeout(() => {
      this.layer.hidden = true;
      this.layer.classList.remove('noppa-haipyy');
    }, HAIPYMINEN_MS);
  }

  /** Pompyt: kunkin pompun alkunopeus ja kesto, kunnes vauhti loppuu. */
  static hops(v0) {
    const hops = [];
    let v = v0;
    while (v > STOP_SPEED && hops.length < 8) {
      hops.push({ v, dur: (2 * v) / GRAVITY });
      v *= BOUNCE;
    }
    return hops;
  }

  /**
   * Heittää nopan: kaari ilmassa, pyörintä ja pienenevät pomput laudalla.
   * @param {number} value silmäluku, joka jää päälle
   * @param {{x:number,y:number}} from mistä noppa lähtee (paneelin pikselit)
   * @param {{x:number,y:number}} to mihin se jää lepäämään
   * @param {{onTick?:Function, onLand?:Function, onBounce?:Function,
   *          onSettle?:Function, reduced?:boolean}} hooks
   *
   * onSettle laukeaa sillä hetkellä, kun noppa lakkaa liikkumasta ja
   * kallahtaa lopulliselle silmäluvulleen — EI vasta kun koko
   * animaatiolupaus ratkeaa. Ero on lähes sekunti, ja pysähtymiseen
   * sidottu haptiikka tuntui juuri sen verran myöhässä (omistajan
   * havainto 13.8.2026).
   */
  async roll(value, from, to, hooks = {}) {
    const { onTick, onLand, onBounce, onSettle, reduced } = hooks;
    // Kesken jäänyt häivytys ei saa jäädä uuden heiton päälle.
    clearTimeout(this.haipymisAjastin);
    this.layer.classList.remove('noppa-haipyy');
    this.layer.hidden = false;
    const [faceX, faceY] = FACE_ROTATION[value] ?? [0, 0];

    if (reduced) {
      this.rotation = { x: faceX - 8, y: faceY + 12, z: 0 };
      this.applyRotation(0);
      this.place(to);
      onLand?.();
      onSettle?.();
      return;
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);

    // Mitä pidempi heitto, sitä korkeampi kaari — mutta järkevissä rajoissa.
    const apex = Math.max(130, Math.min(280, 90 + distance * 0.34));
    const hops = BoardDie.hops(Math.sqrt(2 * GRAVITY * apex));
    const total = hops.reduce((sum, h) => sum + h.dur, 0);

    // Vaakamatka jaetaan pompuille: ensimmäinen hyppy on pisin, loput lyhenevät.
    const weights = hops.map((h, i) => h.dur * DRAG ** i);
    const weightSum = weights.reduce((a, b) => a + b, 0);
    const legs = weights.map((w) => (w / weightSum) * distance);

    // Pyörintä: satunnainen suunta ja vauhti, joka hidastuu joka pompussa.
    const sign = () => (Math.random() < 0.5 ? -1 : 1);
    const spin = {
      x: sign() * (640 + Math.random() * 520),
      y: sign() * (760 + Math.random() * 560),
      z: sign() * (240 + Math.random() * 280),
    };
    // Lopullinen asento: oikea tahko katsojaan päin ja satunnainen neljännes­kierros
    // näytön tasossa — rotateZ ei vaikuta siihen, mikä tahko jää eteen. Pieni
    // kallistus jättää sivutahkot näkyviin, jolloin noppa näyttää kappaleelta.
    const quarter = 90 * Math.floor(Math.random() * 4);
    const tilt = {
      x: -11 + Math.random() * 7,
      y: 9 + Math.random() * 8,
    };

    this.spot = { x: from.x, y: from.y };
    this.applyRotation(0);
    this.draw(0);

    let traveled = 0;
    let hopIndex = 0;
    let hopStart = 0;
    let settled = false;
    let lastTickSlot = -1;
    const start = performance.now();
    let last = start;
    // Viimeiselle hetkelle jätetään aikaa kallahdukselle oikealle silmäluvulle.
    const settleAt = Math.max(hops[0].dur * 0.55, total - SETTLE_MS / 1000);

    await new Promise((resolve) => {
      const frame = (now) => {
        const t = Math.min(total, (now - start) / 1000);
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;

        // Vaihdetaan pomppuun, jonka kohdalla ollaan.
        while (hopIndex < hops.length - 1 && t > hopStart + hops[hopIndex].dur) {
          hopStart += hops[hopIndex].dur;
          traveled += legs[hopIndex];
          hopIndex++;
          spin.x *= SPIN_DAMP;
          spin.y *= SPIN_DAMP;
          spin.z *= SPIN_DAMP;
          if (hopIndex === 1) onLand?.();
          else onBounce?.();
        }

        const hop = hops[hopIndex];
        const local = Math.min(hop.dur, Math.max(0, t - hopStart));
        const z = Math.max(0, hop.v * local - 0.5 * GRAVITY * local * local);

        // Vaakaliike: tasainen vauhti pompun sisällä, hidastuu pompusta toiseen.
        const along = traveled + legs[hopIndex] * (hop.dur ? local / hop.dur : 1);
        const p = distance ? Math.min(1, along / distance) : 1;
        this.spot = { x: from.x + dx * p, y: from.y + dy * p };
        this.draw(z);

        // Ilmalennon aikana kuuluu kevyt kohina pyörinnän tahtiin.
        const slot = Math.floor(t * 7);
        if (hopIndex === 0 && slot !== lastTickSlot) {
          lastTickSlot = slot;
          onTick?.();
        }

        if (!settled && t >= settleAt) {
          settled = true;
          // Noppa pysähtyy tässä — pysähtymiseen sidotut koukut (esim.
          // haptiikka) kuuluvat tähän hetkeen, eivät lupausten häntään.
          onSettle?.();
          // Lähin vastaava asento, jotta kallahdus on lyhyt ja luonteva.
          const restX = faceX + tilt.x;
          const restY = faceY + tilt.y;
          this.rotation = {
            x: restX + 360 * Math.round((this.rotation.x - restX) / 360),
            y: restY + 360 * Math.round((this.rotation.y - restY) / 360),
            z: quarter + 360 * Math.round((this.rotation.z - quarter) / 360),
          };
          this.applyRotation(SETTLE_MS);
        } else if (!settled) {
          this.rotation = {
            x: this.rotation.x + spin.x * dt,
            y: this.rotation.y + spin.y * dt,
            z: this.rotation.z + spin.z * dt,
          };
          this.applyRotation(0);
        }

        if (t >= total) {
          resolve();
          return;
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });

    this.spot = { x: to.x, y: to.y };
    this.draw(0);
    await wait(SETTLE_MS);
  }
}
