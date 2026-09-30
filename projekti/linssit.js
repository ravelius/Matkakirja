/*
 * LINSSIT-välilehti: linssikatalogi projektisivun osana.
 *
 * Sisältö on sama kuin entisellä linssikatalogi.html-sivulla (moottorit,
 * pelissä nyt, seuraavat, koko katalogi suodattimineen, tiekartta ja
 * esitystila). Logiikka asuu nyt vain tässä moduulissa; vanha osoite
 * ohjaa projekti.html#linssit-osoitteeseen.
 *
 * Data tulee linssikatalogi-data.js:stä julkinen.js:n suodattimen läpi
 * (sisäiset työmerkinnät pois), ja kuvatekstit linssi-kuvatekstit.js:stä.
 */
import { esc, luvutHTML, alavalilehdet, paivaTeksti } from './yhteiset.js';

export const LINSSIEN_ALAT = ['moottorit', 'pelissa', 'seuraavat', 'katalogi'];

const MANTEREET = ['Eurooppa', 'Aasia', 'Afrikka', 'Pohjois-Amerikka', 'Etelä-Amerikka', 'Oseania', 'Napa-alueet', 'Yleiset'];
const MOOTTORIT_LINSSEISSA = ['aikajana', 'alue', 'virta', 'data', 'esitys', 'pohjakartta', 'muu'];

// SVG-ikonit yhtenäisellä 0 0 24 24 -ruudukolla, viiva currentColor.
export const IKONIT = {
  aikajana: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  alue: '<svg viewBox="0 0 24 24"><path d="M9 3 3 5.5v15L9 18l6 2.5 6-2.5v-15L15 5.5 9 3Z"/><path d="M9 3v15M15 5.5v15"/></svg>',
  virta: '<svg viewBox="0 0 24 24"><path d="M2 12c4-6 8 6 12 0s6-6 8 0"/><path d="M2 17c4-6 8 6 12 0s6-6 8 0" opacity=".5"/></svg>',
  data: '<svg viewBox="0 0 24 24"><path d="M4 20V11M10 20V4M16 20V14M22 20V8" stroke-linejoin="round"/></svg>',
  esitys: '<svg viewBox="0 0 24 24"><path d="M3 4h18v13H3z"/><path d="M8 21h8M12 17v4"/></svg>',
  pohjakartta: '<svg viewBox="0 0 24 24"><path d="M2 21h20M3 21V10M21 21V10M1.5 10 12 3.5 22.5 10"/><path d="M6.5 10v11M11 10v11M13 10v11M17.5 10v11"/></svg>',
  muu: '<svg viewBox="0 0 24 24"><path d="M9 3v3.3a2 2 0 1 0 4 0V3h3.5a1.5 1.5 0 0 1 1.5 1.5V8h-1.5a2 2 0 1 0 0 4H18v4.5A1.5 1.5 0 0 1 16.5 18H13v-1.5a2 2 0 1 0-4 0V18H5.5A1.5 1.5 0 0 1 4 16.5V13h1.5a2 2 0 1 0 0-4H4V4.5A1.5 1.5 0 0 1 5.5 3H9Z"/></svg>',
};

const MOOTTORIVARIT = {
  aikajana:    { nimi: 'Aikajana',    vari: 'var(--sininen)' },
  alue:        { nimi: 'Alue',        vari: 'var(--terrakotta)' },
  virta:       { nimi: 'Virta',       vari: 'var(--turkoosi)' },
  data:        { nimi: 'Data',        vari: 'var(--violetti)' },
  esitys:      { nimi: 'Esitys',      vari: 'var(--ruusu)' },
  pohjakartta: { nimi: 'Pohjakartat', vari: 'var(--hiekka)' },
  muu:         { nimi: 'Leikki',      vari: 'var(--harmaasininen)' },
};

export const LINSSITILAT = {
  valmis:      { nimi: 'Valmis',      vari: 'var(--vihrea)' },
  rakenteilla: { nimi: 'Rakenteilla', vari: 'var(--kulta)' },
  seuraava:    { nimi: 'Seuraava',    vari: 'var(--seepia)' },
  jonossa:     { nimi: 'Jonossa',     vari: 'var(--sininen)' },
  idea:        { nimi: 'Idea',        vari: 'var(--muste-haalea)' },
};

const AXIS_MIN = -3500;
const AXIS_MAX = 2026;

// Normalisoi tila-arvon perustyyppiin (esim. "seuraava (data)" → "seuraava").
export function tilaAvain(tila) {
  if (!tila) return 'idea';
  if (tila.startsWith('idea')) return 'idea';
  if (tila.startsWith('seuraava')) return 'seuraava';
  return tila;
}

// Kuvaputken tiedostonimikäytäntö: <id>-havainne.jpg + <id>-havainne-480.jpg (sama cc:lle).
function url480(url) {
  return url.replace(/(\.[a-z]+)$/i, '-480$1');
}

// Moottorikuvausten `koodi`-merkinnät koodielementiksi (teksti escapoidaan ensin).
function koodiMuotoile(teksti) {
  return esc(teksti).replace(/`([^`]+)`/g, '<code>$1</code>');
}

const RUNKO = `
  <p class="osio-johdanto">Linssi on kartan päälle laskeutuva kerros, joka näyttää yhden ilmiön ajassa ja paikassa — historian aikajanan, valtakunnan rajat, kaupan virran tai oikean satelliittiaineiston.</p>
  <div class="luvut" data-osa="luvut"></div>
  <nav class="valilehdet" aria-label="Linssikatalogin osiot">
    <button type="button" class="valilehti-nappi" data-ala="moottorit">Moottorit</button>
    <button type="button" class="valilehti-nappi" data-ala="pelissa">Pelissä nyt</button>
    <button type="button" class="valilehti-nappi" data-ala="seuraavat">Seuraavat</button>
    <button type="button" class="valilehti-nappi" data-ala="katalogi"><span class="pitka">Koko katalogi</span><span class="lyhyt">Katalogi</span></button>
  </nav>

  <div class="valilehti" data-ala-paneeli="moottorit">
    <section class="lohko">
      <h2 class="otsikko">Kuusi moottoria <span class="selite">— toteutustavat, joilla linssit rakennetaan</span></h2>
      <div class="moottorit" data-osa="moottorit"></div>
    </section>
  </div>

  <div class="valilehti" data-ala-paneeli="pelissa">
    <section class="lohko">
      <h2 class="otsikko">Pelissä nyt</h2>
      <div class="pelissa-nyt" data-osa="pelissa"></div>
    </section>
  </div>

  <div class="valilehti" data-ala-paneeli="seuraavat">
    <section class="lohko">
      <h2 class="otsikko">Seuraavat <span class="selite">— kehitysjono numeroituna</span></h2>
      <div class="seuraavat-ruudukko" data-osa="seuraavat"></div>
    </section>
  </div>

  <div class="valilehti" data-ala-paneeli="katalogi">
    <nav class="suodatin" aria-label="Suodata ja hae linssejä">
      <div class="suodatin-rivi">
        <span class="otsikkopieni">Tila</span>
        <div data-osa="tilasuodatin"></div>
      </div>
      <div class="suodatin-rivi">
        <span class="otsikkopieni">Manner</span>
        <div data-osa="mannersuodatin"></div>
      </div>
      <div class="suodatin-rivi haku">
        <input type="search" data-osa="tekstihaku" placeholder="Hae nimellä, alueella tai pysäkillä…" aria-label="Hae linssejä">
        <div class="aikasuodin">
          <span class="vuosi" data-osa="aika-min-teksti"></span>
          <div class="aikasuodin-rata">
            <span class="aktiivi" data-osa="aika-aktiivi"></span>
            <input type="range" data-osa="aika-min" min="-3500" max="2026" value="-3500" step="10" aria-label="Alkuvuosi">
            <input type="range" data-osa="aika-max" min="-3500" max="2026" value="2026" step="10" aria-label="Loppuvuosi">
          </div>
          <span class="vuosi" data-osa="aika-max-teksti"></span>
        </div>
        <span class="osuma-maara" data-osa="osumamaara"></span>
      </div>
    </nav>

    <section class="lohko">
      <h2 class="otsikko">Koko katalogi <span class="selite">— jaettu moottorin (toteutustavan) mukaan</span></h2>
      <div data-osa="ruudukko"></div>
    </section>

    <section class="lohko">
      <h2 class="otsikko">Tiekartta</h2>
      <div class="tiekartta" data-osa="tiekartta"></div>
    </section>

    <div class="alanapit">
      <button type="button" data-osa="esitysnappi">Esitys</button>
      <button type="button" data-osa="tulostanappi">Tulosta / PDF</button>
    </div>
  </div>
  <p class="osio-alatunniste" data-osa="alatunniste"></p>`;

const ESITYS = `
  <div class="e-laskuri" id="e-laskuri"></div>
  <button type="button" class="e-poistu mono" id="e-poistu">✕ Poistu (Esc)</button>
  <div class="e-kuva" id="e-kuva"></div>
  <p class="e-nimi" id="e-nimi"></p>
  <p class="e-kaari" id="e-kaari"></p>
  <p class="e-opitaan" id="e-opitaan"></p>
  <div class="e-cc" id="e-cc"></div>
  <div class="e-ohjaus">
    <button type="button" id="e-edellinen">← Edellinen</button>
    <button type="button" id="e-seuraava">Seuraava →</button>
  </div>`;

/**
 * Piirtää linssikatalogin juuri-elementtiin.
 * @param {HTMLElement} juuri   .lk-luokkainen säiliö
 * @param {{moottorit: object[], linssit: object[], paivitetty?: string}} data  julkisetLinssit()-tulos
 * @param {object} KUVATEKSTIT  julkisetKuvatekstit()-tulos
 * @returns {(ala: string) => string} alavälilehden aktivointi
 */
export function luoLinssit(juuri, data, KUVATEKSTIT) {
  juuri.innerHTML = RUNKO;
  const $ = (nimi) => juuri.querySelector(`[data-osa="${nimi}"]`);
  const LINSSIT = data.linssit;

  // O6:n kuvat päivitetty versioon 2 (kuvaputki 25.9.2026, era2-07): uusi
  // ensisijainen polku on O6-v2-*.jpg.
  const o6 = LINSSIT.find((l) => l.id === 'O6');
  if (o6 && o6.kuvat) {
    o6.kuvat.havainne = o6.kuvat.havainne.replace('O6-havainne', 'O6-v2-havainne');
    o6.kuvat.cc = o6.kuvat.cc.replace('O6-cc', 'O6-v2-cc');
  }

  function aikapalkkiHTML(l) {
    const vari = MOOTTORIVARIT[l.moottori]?.vari || 'var(--seepia)';
    if (l.alkuvuosi == null || l.loppuvuosi == null) {
      return `<div class="k-aikapalkki"><span class="moodi">${esc(l.kaari)}</span></div>`;
    }
    const alkuPros = Math.max(0, Math.min(100, (l.alkuvuosi - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * 100));
    const loppuPros = Math.max(0, Math.min(100, (l.loppuvuosi - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * 100));
    const leveys = Math.max(loppuPros - alkuPros, l.alkuvuosi === l.loppuvuosi ? 1.2 : 0.6);
    const merkkipaalu1873 = (1873 - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * 100;
    return `<div class="k-aikapalkki" style="--vari:${vari}">
      <div class="segmentti" style="left:${alkuPros}%;width:${leveys}%"></div>
      <div class="piste1873" style="left:${merkkipaalu1873}%" title="1873"></div>
    </div>`;
  }

  // --- Luvut ---
  const lahdeSetti = new Set();
  LINSSIT.filter((l) => l.moottori === 'data' && l.aineisto).forEach((l) => l.aineisto.split(',').map((s) => s.trim()).filter(Boolean).forEach((s) => lahdeSetti.add(s.toLowerCase())));
  const seuraavatLinssit = LINSSIT.filter((l) => tilaAvain(l.tila) === 'seuraava');
  const seuraavaLuokka = (tila) => (tila.includes('(data)') ? 'data' : tila.includes('(esitys)') ? 'esitys' : 'seuraava');
  const seuraavaMaara = seuraavatLinssit.filter((l) => seuraavaLuokka(l.tila) === 'seuraava').length;
  const dataMaara = seuraavatLinssit.filter((l) => seuraavaLuokka(l.tila) === 'data').length;
  const esitysMaara = seuraavatLinssit.filter((l) => seuraavaLuokka(l.tila) === 'esitys').length;
  $('luvut').innerHTML = luvutHTML([
    ['linssiä', LINSSIT.length, ''],
    ['pelissä nyt', LINSSIT.filter((l) => l.pelissa).length, ''],
    ['seuraavaksi', seuraavatLinssit.length, `${seuraavaMaara} seuraavaa · ${dataMaara} dataa · ${esitysMaara} esitystä`],
    ['aineistolähteitä', lahdeSetti.size, ''],
  ]);

  // --- Moottorikortit ---
  $('moottorit').innerHTML = data.moottorit.map((m) => {
    const vari = MOOTTORIVARIT[m.avain]?.vari || 'var(--seepia)';
    return `<div class="moottori">
      <div class="ikoni" style="--vari:${vari}">${IKONIT[m.avain] || ''}</div>
      <b>${esc(m.nimi)}</b>
      <span class="badge ${m.rakennettu ? 'rakennettu' : 'suunnitteilla'}">${m.rakennettu ? 'rakennettu' : 'suunnitteilla'}</span>
      <p>${koodiMuotoile(m.kuvaus)}</p>
      ${m.pilotti ? `<p class="mono" style="font-size:11px">Pilotti: ${esc(m.pilotti)}</p>` : ''}
    </div>`;
  }).join('');

  // --- Pelissä nyt (kentän pelissa=true linssit) ---
  const pelissaNytLista = LINSSIT.filter((l) => l.pelissa).sort((a, b) => {
    const jarjesta = (id) => (id.startsWith('X') ? parseInt(id.slice(1), 10) : 100 + id.charCodeAt(0));
    return jarjesta(a.id) - jarjesta(b.id);
  });
  $('pelissa').innerHTML = pelissaNytLista.map((l) => {
    const t = LINSSITILAT[tilaAvain(l.tila)] || LINSSITILAT.idea;
    const havainne = l.kuvat && l.kuvat.havainne;
    return `<div class="pn-kortti">
      <div class="pn-kuva">
        <span class="tagi">${t.nimi.toUpperCase()}</span>
        <span class="merkki">kuva tulossa</span>
        ${havainne ? `<img src="${esc(url480(havainne))}" alt="" loading="lazy" onerror="this.remove()">` : ''}
      </div>
      <div class="pn-teksti">
        <b>${esc(l.nimi)}</b>
        <p>${esc(l.alue)} · ${esc(l.kaari)}</p>
      </div>
    </div>`;
  }).join('');

  // --- Seuraavat-kaista ---
  const seuraavatJarjestyksessa = LINSSIT.filter((l) => l.jarjestys != null).sort((a, b) => a.jarjestys - b.jarjestys);
  $('seuraavat').innerHTML = seuraavatJarjestyksessa.map((l) => {
    const t = MOOTTORIVARIT[l.moottori] || MOOTTORIVARIT.muu;
    const havainne = l.kuvat && l.kuvat.havainne;
    return `<div class="sk-kortti">
      <div class="sk-numero mono">#${esc(l.jarjestys)}</div>
      <div class="sk-kuva" style="--vari:${t.vari}">${IKONIT[l.moottori] || ''}${havainne ? `<img src="${esc(url480(havainne))}" alt="" loading="lazy" onerror="this.remove()">` : ''}</div>
      <div class="sk-nimi">${esc(l.nimi)}</div>
      <div class="sk-kaari">${esc(l.kaari)}</div>
    </div>`;
  }).join('');

  // --- Ruudukko: yksi lohko per linssejä sisältävä moottori ---
  function tahdetHTML(n) {
    if (!n) return '';
    return `<span class="k-tahdet" title="1873-sidos">${'★'.repeat(n)}${'☆'.repeat(3 - n)}</span>`;
  }
  function korttiHTML(l) {
    const t = LINSSITILAT[tilaAvain(l.tila)] || LINSSITILAT.idea;
    const ty = MOOTTORIVARIT[l.moottori] || { vari: 'var(--seepia)' };
    const pysakit = l.pysakit || [];
    const nayta = pysakit.slice(0, 6);
    const loput = pysakit.length - nayta.length;
    const havainneUrl = l.kuvat && l.kuvat.havainne;
    const ccUrl = l.kuvat && l.kuvat.cc;
    const tekstit = KUVATEKSTIT[l.id];
    const ccOtsikko = tekstit && tekstit.c ? `${tekstit.c.tek} — ${tekstit.c.lis}` : 'aikalaiskuva';
    return `
      <div class="k-kuva" style="--vari:${ty.vari}">
        <div class="k-tila-piste" style="--tilavari:${t.vari}" title="${t.nimi}"></div>
        ${l.pelikytkos ? `<span class="k-pelikytkos">${esc(l.pelikytkos)}</span>` : ''}
        ${IKONIT[l.moottori] || ''}
        ${havainneUrl ? `<img class="k-kuva-pieni" src="${esc(url480(havainneUrl))}" data-iso="${esc(havainneUrl)}" alt="" loading="lazy" style="display:none" onload="this.style.display='block'" onerror="this.remove()">` : ''}
        ${ccUrl ? `<img class="k-cc" src="${esc(url480(ccUrl))}" data-iso="${esc(ccUrl)}" alt="" loading="lazy" style="display:none" onload="this.style.display='block'" onerror="this.remove()" title="${esc(ccOtsikko)}">` : ''}
      </div>
      <div class="k-body">
        <div class="k-ylarivi">
          <span class="k-tunnus mono">${esc(l.id)}</span>
          ${tahdetHTML(l.sidos1873)}
        </div>
        <p class="k-nimi">${esc(l.nimi)}</p>
        <p class="k-meta">${esc(l.alue)} · ${esc(l.kaari)}</p>
        ${aikapalkkiHTML(l)}
        ${l.mitaOpitaan ? `<p class="k-opitaan">${esc(l.mitaOpitaan)}</p>` : ''}
        <div class="k-pysakit">
          ${nayta.map((p) => `<span>${esc(p)}</span>`).join('')}
          ${loput > 0 ? `<span class="lisaa">+${loput}</span>` : ''}
        </div>
        <span class="k-tila-teksti" style="--tilavari:${t.vari}">${t.nimi}</span>
      </div>
      <div class="k-lisatiedot">
        <div class="sarake">
          <h4>Pysäkit (kaikki)</h4>
          <p class="pysakit-koko">${pysakit.map(esc).join(' · ') || '—'}</p>
          ${l.aineisto ? `<div><h4>Aineisto</h4><p class="huom-teksti">${esc(l.aineisto)}</p></div>` : ''}
        </div>
        <div class="sarake">
          ${tekstit && tekstit.h ? `<div><h4>Havainnekuva</h4><p class="huom-teksti">${esc(tekstit.h)}</p></div>` : ''}
          ${tekstit && tekstit.c ? `<div><h4>Aikalaiskuva</h4><p class="huom-teksti">${esc(tekstit.c.cap)}</p><p class="k-lahde">${esc(tekstit.c.tek)} · ${esc(tekstit.c.nimi)} (${esc(tekstit.c.vuo)}) · ${esc(tekstit.c.lis)} · <a href="${esc(tekstit.c.url)}" target="_blank" rel="noopener">lähde</a></p></div>` : ''}
          <button type="button" class="k-sulje">Sulje</button>
        </div>
      </div>`;
  }

  const juuriKaikki = $('ruudukko');
  for (const moottori of MOOTTORIT_LINSSEISSA) {
    const linssitTassa = LINSSIT.filter((l) => l.moottori === moottori);
    if (!linssitTassa.length) continue;
    const vari = MOOTTORIVARIT[moottori].vari;
    const lohko = document.createElement('div');
    lohko.className = 'moottori-lohko';
    lohko.innerHTML = `<h3 style="--vari:${vari}"><span class="moottori-ikoni">${IKONIT[moottori]}</span>${MOOTTORIVARIT[moottori].nimi}<span class="maara">(${linssitTassa.length})</span></h3>
      <div class="ruudukko" data-moottori="${moottori}"></div>`;
    juuriKaikki.appendChild(lohko);
    const ruudukko = lohko.querySelector('.ruudukko');
    for (const l of linssitTassa) {
      const d = document.createElement('div');
      d.className = 'kortti';
      d.dataset.id = l.id;
      d.dataset.moottori = l.moottori;
      d.dataset.tila = tilaAvain(l.tila);
      d.dataset.manner = l.manner;
      d.dataset.haku = `${l.nimi} ${l.alue} ${(l.pysakit || []).join(' ')} ${l.id}`.toLowerCase();
      if (l.alkuvuosi != null) { d.dataset.alku = l.alkuvuosi; d.dataset.loppu = l.loppuvuosi; }
      d.innerHTML = korttiHTML(l);
      ruudukko.appendChild(d);
    }
  }
  const kortit = () => juuri.querySelectorAll('.kortti');

  juuriKaikki.addEventListener('click', (ev) => {
    if (ev.target.closest('.k-sulje')) {
      ev.target.closest('.kortti').classList.remove('auki');
      return;
    }
    if (ev.target.closest('a')) return;
    const kortti = ev.target.closest('.kortti');
    if (!kortti) return;
    const oliAuki = kortti.classList.contains('auki');
    juuri.querySelectorAll('.kortti.auki').forEach((k) => k.classList.remove('auki'));
    if (!oliAuki) {
      kortti.classList.add('auki');
      const kuva = kortti.querySelector('.k-kuva-pieni');
      if (kuva && kuva.dataset.iso) kuva.src = kuva.dataset.iso;
    }
  });

  // --- Suodattimet (tila, manner, aika, haku — moottori jakaa jo osioihin) ---
  const tilaAktiivi = new Set();
  const mannerAktiivi = new Set();
  let hakuteksti = '';
  let aikaMin = AXIS_MIN;
  let aikaMax = AXIS_MAX;

  function lippurivi(kohde, avaimet, nimikartta, aktiiviSetti, onManner) {
    const k = $(kohde);
    k.innerHTML = avaimet.map((a) => {
      const maara = LINSSIT.filter((l) => (onManner ? l.manner === a : tilaAvain(l.tila) === a)).length;
      return maara > 0 ? `<button type="button" class="lippu" data-avain="${esc(a)}" aria-pressed="false">${esc(nimikartta[a]?.nimi || a)} (${maara})</button>` : '';
    }).join('');
    k.addEventListener('click', (ev) => {
      const b = ev.target.closest('button');
      if (!b) return;
      const avain = b.dataset.avain;
      if (aktiiviSetti.has(avain)) { aktiiviSetti.delete(avain); b.setAttribute('aria-pressed', 'false'); }
      else { aktiiviSetti.add(avain); b.setAttribute('aria-pressed', 'true'); }
      suodataRuudukko();
    });
  }
  lippurivi('tilasuodatin', Object.keys(LINSSITILAT), LINSSITILAT, tilaAktiivi, false);
  lippurivi('mannersuodatin', MANTEREET, {}, mannerAktiivi, true);

  $('tekstihaku').addEventListener('input', (ev) => {
    hakuteksti = ev.target.value.trim().toLowerCase();
    suodataRuudukko();
  });

  const aikaMinEl = $('aika-min');
  const aikaMaxEl = $('aika-max');
  const vuosiTeksti = (v) => (v < 0 ? `${Math.abs(v)} eaa.` : `${v}`);
  function paivitaAikatekstit() {
    $('aika-min-teksti').textContent = vuosiTeksti(aikaMin);
    $('aika-max-teksti').textContent = vuosiTeksti(aikaMax);
    const alkuPros = (aikaMin - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * 100;
    const loppuPros = (aikaMax - AXIS_MIN) / (AXIS_MAX - AXIS_MIN) * 100;
    const aktiivi = $('aika-aktiivi');
    aktiivi.style.left = `${alkuPros}%`;
    aktiivi.style.width = `${loppuPros - alkuPros}%`;
  }
  function aikakasittelija() {
    aikaMin = Math.min(parseInt(aikaMinEl.value, 10), parseInt(aikaMaxEl.value, 10));
    aikaMax = Math.max(parseInt(aikaMinEl.value, 10), parseInt(aikaMaxEl.value, 10));
    paivitaAikatekstit();
    suodataRuudukko();
  }
  aikaMinEl.addEventListener('input', aikakasittelija);
  aikaMaxEl.addEventListener('input', aikakasittelija);
  paivitaAikatekstit();

  function suodataRuudukko() {
    const ajanSuodinPaalla = aikaMin > AXIS_MIN || aikaMax < AXIS_MAX;
    let nakyvia = 0;
    kortit().forEach((k) => {
      let n = true;
      if (tilaAktiivi.size && !tilaAktiivi.has(k.dataset.tila)) n = false;
      if (mannerAktiivi.size && !mannerAktiivi.has(k.dataset.manner)) n = false;
      if (hakuteksti && !k.dataset.haku.includes(hakuteksti)) n = false;
      if (ajanSuodinPaalla) {
        if (k.dataset.alku === undefined) n = false;
        else {
          const alku = parseInt(k.dataset.alku, 10);
          const loppu = parseInt(k.dataset.loppu, 10);
          if (loppu < aikaMin || alku > aikaMax) n = false;
        }
      }
      k.hidden = !n;
      if (n) nakyvia++;
    });
    $('osumamaara').textContent = `${nakyvia} / ${LINSSIT.length} linssiä`;
  }
  suodataRuudukko();

  // --- Tiekartta ---
  const tiekarttaJuuri = $('tiekartta');
  tiekarttaJuuri.innerHTML = Object.keys(LINSSITILAT).map((tila) => {
    const t = LINSSITILAT[tila];
    const linssit = LINSSIT.filter((l) => tilaAvain(l.tila) === tila);
    return `<div class="tk-sarake">
      <div class="tk-otsikko"><span class="tk-piste" style="--vari:${t.vari}"></span>${t.nimi}<span class="tk-maara">${linssit.length}</span></div>
      ${linssit.map((l) => `<div class="tk-kortti" data-id="${esc(l.id)}"><b>${esc(l.nimi)}</b><span>${esc(l.id)} · ${esc(l.manner)}</span></div>`).join('')}
    </div>`;
  }).join('');
  tiekarttaJuuri.addEventListener('click', (ev) => {
    const kortti = ev.target.closest('.tk-kortti');
    if (!kortti) return;
    const kohde = juuri.querySelector(`.kortti[data-id="${kortti.dataset.id}"]`);
    if (!kohde) return;
    kohde.hidden = false;
    kohde.scrollIntoView({ behavior: 'smooth', block: 'center' });
    juuri.querySelectorAll('.kortti.auki').forEach((k) => k.classList.remove('auki'));
    kohde.classList.add('auki');
  });

  // --- Esitystila ---
  let esitys = document.getElementById('esitys');
  if (!esitys) {
    esitys = document.createElement('div');
    esitys.id = 'esitys';
    esitys.innerHTML = ESITYS;
    document.body.appendChild(esitys);
  }
  let esitysIndeksi = 0;
  function esitysLista() {
    const nakyvat = [...kortit()].filter((k) => !k.hidden).map((k) => k.dataset.id);
    return nakyvat.length ? nakyvat : LINSSIT.map((l) => l.id);
  }
  function nayttaEsitys() {
    const lista = esitysLista();
    esitysIndeksi = ((esitysIndeksi % lista.length) + lista.length) % lista.length;
    const l = LINSSIT.find((x) => x.id === lista[esitysIndeksi]);
    const ty = MOOTTORIVARIT[l.moottori] || { vari: 'var(--seepia)' };
    const havainneUrl = l.kuvat && l.kuvat.havainne;
    const kuva = document.getElementById('e-kuva');
    kuva.style.setProperty('--vari', ty.vari);
    kuva.innerHTML = `${IKONIT[l.moottori] || ''}${havainneUrl ? `<img src="${esc(havainneUrl)}" alt="" onerror="this.remove()">` : ''}`;
    document.getElementById('e-nimi').textContent = l.nimi;
    document.getElementById('e-kaari').textContent = `${l.alue} · ${l.kaari}`;
    document.getElementById('e-opitaan').textContent = l.mitaOpitaan || '';
    const ccUrl = l.kuvat && l.kuvat.cc;
    const tekstit = KUVATEKSTIT[l.id];
    document.getElementById('e-cc').innerHTML = (ccUrl && tekstit && tekstit.c)
      ? `<img src="${esc(url480(ccUrl))}" alt="" onerror="this.remove()"><span>${esc(tekstit.c.tek)} · ${esc(tekstit.c.lis)} · <a href="${esc(tekstit.c.url)}" target="_blank" rel="noopener">lähde</a></span>`
      : '';
    document.getElementById('e-laskuri').textContent = `${esitysIndeksi + 1} / ${lista.length}`;
  }
  $('esitysnappi').addEventListener('click', () => {
    esitysIndeksi = 0;
    document.body.classList.add('esitys-paalla');
    nayttaEsitys();
  });
  document.getElementById('e-poistu').addEventListener('click', () => document.body.classList.remove('esitys-paalla'));
  document.getElementById('e-edellinen').addEventListener('click', () => { esitysIndeksi--; nayttaEsitys(); });
  document.getElementById('e-seuraava').addEventListener('click', () => { esitysIndeksi++; nayttaEsitys(); });
  document.addEventListener('keydown', (ev) => {
    if (!document.body.classList.contains('esitys-paalla')) return;
    if (ev.key === 'Escape') document.body.classList.remove('esitys-paalla');
    else if (ev.key === 'ArrowLeft') { esitysIndeksi--; nayttaEsitys(); }
    else if (ev.key === 'ArrowRight') { esitysIndeksi++; nayttaEsitys(); }
  });

  $('tulostanappi').addEventListener('click', () => window.print());

  $('alatunniste').innerHTML = `Lähde: <a href="docs/linssikatalogi.md">docs/linssikatalogi.md</a>${data.paivitetty ? ` · päivitetty ${paivaTeksti(data.paivitetty)}` : ''} ·
    moottorit: aikajana, alue, virta, data, esitys · tilat: valmis, rakenteilla, seuraava, jonossa, idea`;

  return alavalilehdet(juuri, 'linssit', LINSSIEN_ALAT);
}
