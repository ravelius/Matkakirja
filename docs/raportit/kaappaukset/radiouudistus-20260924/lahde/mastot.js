// Radiomastojen havainnekuvat (SVG). Kanta (x, y) = kaupungin piste, masto kasvaa ylöspäin.
export const KOOT = {
  iso: { nimi: 'Iso', h: 64, valot: [0.36, 0.68, 1] },
  keski: { nimi: 'Keski', h: 46, valot: [0.5, 1] },
  pieni: { nimi: 'Pieni', h: 30, valot: [1] },
};

const vari = { vaalea: '#b9a88e', tumma: '#5d5242', viiva: '#3a3126' };

function ristikko(x, y, h, alaL, ylaL, osat) {
  // Kaksi näkyvää kylkeä: vasen vaalea, oikea tumma; ristikko viivoina.
  let s = '';
  const L = (t) => alaL + (ylaL - alaL) * t;
  s += `<path d="M${x - alaL / 2} ${y} L${x - ylaL / 2} ${y - h} L${x} ${y - h} L${x} ${y}Z" fill="${vari.vaalea}" opacity=".55"/>`;
  s += `<path d="M${x} ${y} L${x} ${y - h} L${x + ylaL / 2} ${y - h} L${x + alaL / 2} ${y}Z" fill="${vari.tumma}" opacity=".7"/>`;
  s += `<path d="M${x - alaL / 2} ${y} L${x - ylaL / 2} ${y - h} M${x + alaL / 2} ${y} L${x + ylaL / 2} ${y - h}" stroke="${vari.viiva}" stroke-width="1.1" fill="none"/>`;
  for (let i = 0; i < osat; i++) {
    const t0 = i / osat, t1 = (i + 1) / osat;
    const y0 = y - h * t0, y1 = y - h * t1;
    s += `<path d="M${x - L(t0) / 2} ${y0} L${x + L(t1) / 2} ${y1} M${x + L(t0) / 2} ${y0} L${x - L(t1) / 2} ${y1} M${x - L(t1) / 2} ${y1} L${x + L(t1) / 2} ${y1}" stroke="${vari.viiva}" stroke-width=".6" fill="none" opacity=".9"/>`;
  }
  return s;
}

export function masto(x, y, koko, { mittakaava = 1, valot = [], valittu = false, harukset = true } = {}) {
  const k = KOOT[koko], h = k.h * mittakaava;
  let s = `<g>`;
  // varjo maahan (valo luoteesta)
  s += `<ellipse cx="${x + h * 0.18}" cy="${y + 1}" rx="${h * 0.22}" ry="${h * 0.05}" fill="#000" opacity=".35"/>`;
  if (koko === 'iso') {
    const lev = h * 0.07;
    if (harukset) for (const t of [0.36, 0.68, 0.95]) for (const d of [-1, 1, -0.4]) {
      s += `<line x1="${x}" y1="${y - h * t}" x2="${x + d * h * 0.42 * t}" y2="${y + (d === -0.4 ? 6 : 2) * mittakaava}" stroke="#2a241c" stroke-width=".5" opacity=".7"/>`;
    }
    s += ristikko(x, y, h * 0.94, lev, lev, 12);
    s += `<line x1="${x}" y1="${y - h * 0.94}" x2="${x}" y2="${y - h}" stroke="${vari.viiva}" stroke-width="1.4"/>`;
  } else if (koko === 'keski') {
    s += ristikko(x, y, h * 0.9, h * 0.26, h * 0.05, 7);
    s += `<rect x="${x - h * 0.06}" y="${y - h * 0.62}" width="${h * 0.12}" height="${h * 0.035}" fill="${vari.viiva}"/>`;
    s += `<line x1="${x}" y1="${y - h * 0.9}" x2="${x}" y2="${y - h}" stroke="${vari.viiva}" stroke-width="1.2"/>`;
  } else {
    s += `<path d="M${x - h * 0.05} ${y} L${x - h * 0.025} ${y - h * 0.92} L${x + h * 0.025} ${y - h * 0.92} L${x + h * 0.05} ${y}Z" fill="#7d705d"/>`;
    s += `<path d="M${x} ${y} L${x} ${y - h * 0.92} L${x + h * 0.025} ${y - h * 0.92} L${x + h * 0.05} ${y}Z" fill="#4b4135"/>`;
    s += `<rect x="${x - h * 0.11}" y="${y - h * 0.72}" width="${h * 0.22}" height="${h * 0.05}" fill="${vari.viiva}"/>`;
    s += `<line x1="${x}" y1="${y - h * 0.92}" x2="${x}" y2="${y - h}" stroke="${vari.viiva}" stroke-width="1"/>`;
  }
  k.valot.forEach((t, i) => {
    const vy = y - h * t, palaa = valot[i] ?? true;
    const r = (valittu ? 2.8 : 2.1) * Math.max(0.7, mittakaava);
    if (palaa) {
      s += `<circle cx="${x}" cy="${vy}" r="${r * (valittu ? 6 : 3.4)}" fill="url(#hehku${valittu ? 'V' : ''})"/>`;
      s += `<circle cx="${x}" cy="${vy}" r="${r}" fill="${valittu ? '#ffd2b0' : '#ff5a3a'}"/>`;
    } else {
      s += `<circle cx="${x}" cy="${vy}" r="${r * 0.8}" fill="#5a1a10"/>`;
    }
  });
  return s + `</g>`;
}

export const MAARITTEET = `
  <radialGradient id="hehku"><stop offset="0" stop-color="#ff4a2a" stop-opacity=".85"/><stop offset=".35" stop-color="#ff3a1a" stop-opacity=".35"/><stop offset="1" stop-color="#ff2a0a" stop-opacity="0"/></radialGradient>
  <radialGradient id="hehkuV"><stop offset="0" stop-color="#ffb08a" stop-opacity="1"/><stop offset=".25" stop-color="#ff4a22" stop-opacity=".6"/><stop offset="1" stop-color="#ff2a0a" stop-opacity="0"/></radialGradient>
  <radialGradient id="maavalo"><stop offset="0" stop-color="#ff8a4a" stop-opacity=".55"/><stop offset=".45" stop-color="#e0602a" stop-opacity=".22"/><stop offset="1" stop-color="#c04010" stop-opacity="0"/></radialGradient>
  <radialGradient id="kaupunkivalo"><stop offset="0" stop-color="#ffe1a0" stop-opacity=".95"/><stop offset=".4" stop-color="#ffc060" stop-opacity=".35"/><stop offset="1" stop-color="#ffa030" stop-opacity="0"/></radialGradient>
`;
