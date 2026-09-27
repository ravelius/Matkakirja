/*
 * PELIT-välilehti: pelikatalogi projektisivun osana.
 *
 * Sisältö on sama kuin entisellä pelikatalogi.html-sivulla
 * (pelisuunnitelmat, osat, ensimmäiset 10, koko katalogi suodattimineen
 * ja ideat). Logiikka asuu nyt vain tässä moduulissa; vanha osoite ohjaa
 * projekti.html#pelit-osoitteeseen.
 *
 * Data tulee pelikatalogi-data.js:stä (tuottaja tools/tee-pelikatalogi-data.mjs)
 * julkinen.js:n suodattimen läpi.
 */
import { esc, luvutHTML, alavalilehdet, paivaTeksti } from './yhteiset.js';

export const PELIEN_ALAT = ['suunnitelmat', 'osat', 'ensimmaiset', 'katalogi', 'ideat'];

// Osan väri linssikatalogin paletista (sama järjestys kuin md:n osat 1–8).
const OSAVARIT = ['var(--sininen)', 'var(--vihrea)', 'var(--terrakotta)', 'var(--hiekka)', 'var(--turkoosi)', 'var(--violetti)', 'var(--ruusu)', 'var(--harmaasininen)'];
const osaVari = (nro) => OSAVARIT[(nro - 1) % OSAVARIT.length];

export const PELITILAT = {
  valmis:      { nimi: 'Valmis',      vari: 'var(--vihrea)' },
  rakenteilla: { nimi: 'Rakenteilla', vari: 'var(--kulta)' },
  seuraava:    { nimi: 'Seuraava',    vari: 'var(--seepia)' },
  tarkista:    { nimi: 'Tarkista',    vari: 'var(--terrakotta)' },
  idea:        { nimi: 'Idea',        vari: 'var(--muste-haalea)' },
};
const OIKEUDET = {
  'SUORA':      { nimi: 'Suora',      luokka: 'suora' },
  'OMA VERSIO': { nimi: 'Oma versio', luokka: 'oma' },
};

// Pelityyppien ikonit (Ensimmäiset 10 -taulukon tyyppi-sarake), 0 0 24 24 -ruudukko.
export const PELI_IKONIT = {
  'piha/tarkkuus': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></svg>',
  'lauta/strategia': '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 12h16M12 4v16M4 4l16 16M20 4 4 20"/></svg>',
  'lauta/noppa': '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="12" cy="12" r="1"/></svg>',
  kortti: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="11" height="15" rx="1.5"/><path d="M9 7.5h13v13.5H9z" opacity=".55"/></svg>',
  muu: '<svg viewBox="0 0 24 24"><path d="M9 3v3.3a2 2 0 1 0 4 0V3h3.5a1.5 1.5 0 0 1 1.5 1.5V8h-1.5a2 2 0 1 0 0 4H18v4.5A1.5 1.5 0 0 1 16.5 18H13v-1.5a2 2 0 1 0-4 0V18H5.5A1.5 1.5 0 0 1 4 16.5V13h1.5a2 2 0 1 0 0-4H4V4.5A1.5 1.5 0 0 1 5.5 3H9Z"/></svg>',
};

// md:n **lihavoinnit** näkyviksi (teksti escapoidaan ensin); md-linkit tekstiksi.
const mdTeksti = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const mdKentta = (t) => mdTeksti(String(t ?? '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'));

// Kortin kiinni-tilan ingressi: noin 140 merkkiä sanarajalta.
function tiivistelma(t) {
  const puhdas = String(t).replace(/\*\*/g, '');
  if (puhdas.length <= 150) return puhdas;
  return `${puhdas.slice(0, 140).replace(/\s+\S*$/, '')} …`;
}

const RUNKO = `
  <p class="osio-johdanto">Euroopan perinteiset pelit maittain — korttipelejä, lautapelejä, pihapelejä ja kansanlajeja, joissa opitaan tekemällä. Jokainen peli pelataan matkan varrella joko tietokonetta tai oikeaa kaveria vastaan.</p>
  <div class="luvut" data-osa="luvut"></div>
  <nav class="valilehdet" aria-label="Pelikatalogin osiot">
    <button type="button" class="valilehti-nappi" data-ala="suunnitelmat"><span class="pitka">Pelisuunnitelmat</span><span class="lyhyt">Suunnitelmat</span></button>
    <button type="button" class="valilehti-nappi" data-ala="osat">Osat</button>
    <button type="button" class="valilehti-nappi" data-ala="ensimmaiset"><span class="pitka">Ensimmäiset 10</span><span class="lyhyt">10 ensin</span></button>
    <button type="button" class="valilehti-nappi" data-ala="katalogi"><span class="pitka">Koko katalogi</span><span class="lyhyt">Katalogi</span></button>
    <button type="button" class="valilehti-nappi" data-ala="ideat">Ideat</button>
  </nav>

  <div class="valilehti" data-ala-paneeli="osat">
    <section class="lohko">
      <h2 class="otsikko">Kahdeksan osaa <span class="selite">— maittain ryhmiteltynä</span></h2>
      <div class="osat" data-osa="osat"></div>
    </section>
    <section class="lohko">
      <h2 class="otsikko">Oikeudet</h2>
      <div class="selite-lista" data-osa="oikeudet"></div>
    </section>
  </div>

  <div class="valilehti" data-ala-paneeli="ensimmaiset">
    <section class="lohko">
      <h2 class="otsikko">Ensimmäiset 10 <span class="selite">— ehdotus toteutusjärjestykseksi</span></h2>
      <div class="seuraavat-ruudukko" data-osa="ensimmaiset"></div>
    </section>
  </div>

  <div class="valilehti" data-ala-paneeli="katalogi">
    <nav class="suodatin" aria-label="Suodata ja hae pelejä">
      <div class="suodatin-rivi">
        <span class="otsikkopieni">Osa</span>
        <div class="osasuodatin" data-osa="osasuodatin"></div>
      </div>
      <div class="suodatin-rivi">
        <span class="otsikkopieni">Oikeudet</span>
        <div data-osa="oikeussuodatin"></div>
        <span class="otsikkopieni" style="margin-left:10px">Tila</span>
        <div data-osa="tilasuodatin"></div>
      </div>
      <div class="suodatin-rivi haku">
        <input type="search" data-osa="tekstihaku" placeholder="Hae nimellä, maalla tai säännöllä…" aria-label="Hae pelejä">
        <select data-osa="maasuodatin" aria-label="Maa"></select>
        <span class="osuma-maara" data-osa="osumamaara"></span>
      </div>
    </nav>

    <section class="lohko">
      <h2 class="otsikko">Koko katalogi <span class="selite">— kahdeksan maantieteellistä osaa</span></h2>
      <div data-osa="ruudukko"></div>
    </section>

    <div class="alanapit">
      <button type="button" data-osa="tulostanappi">Tulosta / PDF</button>
    </div>
  </div>

  <div class="valilehti" data-ala-paneeli="suunnitelmat">
    <section class="lohko">
      <h2 class="otsikko">Pelisuunnitelmat <span class="selite">— ensimmäiset 10 peliä toteutuskelpoisina kortteina</span></h2>
      <div class="suunnitelmat" data-osa="suunnitelmat-ensimmaiset"></div>
    </section>
    <section class="lohko">
      <h2 class="otsikko">Pelin omat mekaniikat <span class="selite">— lentopeli, pelistreak ja muut kokonaisuudet</span></h2>
      <div class="suunnitelmat" data-osa="suunnitelmat-omistajan"></div>
    </section>
  </div>

  <div class="valilehti" data-ala-paneeli="ideat">
    <section class="lohko">
      <h2 class="otsikko">Ideat <span class="selite">— pelien ympärille</span></h2>
      <div class="ideat" data-osa="ideat"></div>
    </section>
  </div>
  <p class="osio-alatunniste" data-osa="alatunniste"></p>`;

/**
 * Piirtää pelikatalogin juuri-elementtiin.
 * @param {HTMLElement} juuri  .pk-luokkainen säiliö
 * @param {object} KATALOGI    julkisetPelit()-tulos
 * @returns {(ala: string) => string} alavälilehden aktivointi
 */
export function luoPelit(juuri, KATALOGI) {
  juuri.innerHTML = RUNKO;
  const $ = (nimi) => juuri.querySelector(`[data-osa="${nimi}"]`);
  const PELIT = KATALOGI.pelit;
  const OSAT = KATALOGI.osat;
  const ENSIMMAISET = new Map(KATALOGI.ensimmaiset10.map((e) => [e.id, e.jarjestys]));

  // --- Luvut ---
  const maita = new Set(PELIT.map((p) => p.maa)).size;
  const suoria = PELIT.filter((p) => p.oikeusluokka === 'SUORA').length;
  $('luvut').innerHTML = luvutHTML([
    ['peliä', PELIT.length, `${maita} maata · ${OSAT.length} osaa`],
    ['suoraan toteutettavia', suoria, `${PELIT.length - suoria} omana versiona`],
    ['ensimmäisenä', KATALOGI.ensimmaiset10.length, 'ehdotettu järjestys'],
    ['tarkistettavia', PELIT.filter((p) => p.tila === 'tarkista').length, 'lähde ohut tai muokattava'],
  ]);

  // --- Osakortit ---
  $('osat').innerHTML = OSAT.map((o) => {
    const pelit = PELIT.filter((p) => p.osa === o.nro);
    const omia = pelit.filter((p) => p.oikeusluokka === 'OMA VERSIO').length;
    const maat = o.maat.map((m) => `${esc(m.nimi)} ${pelit.filter((p) => p.maa === m.iso3).length}`).join(' · ');
    return `<div class="osa" style="--vari:${osaVari(o.nro)}">
      <div class="osa-nro">${o.nro}</div>
      <b>${esc(o.nimi)}</b>
      <span class="badge">${pelit.length} peliä · ${o.maat.length} maata${omia ? ` · ${omia} oma versio` : ''}</span>
      <p>${maat}</p>
      ${o.huomiot ? `<details><summary>Huomiot</summary><p>${mdTeksti(o.huomiot)}</p></details>` : ''}
      <button type="button" class="osa-nappi" data-osa-nro="${o.nro}">Näytä pelit →</button>
    </div>`;
  }).join('');
  $('osat').addEventListener('click', (ev) => {
    const b = ev.target.closest('.osa-nappi');
    if (!b) return;
    asetaSuodin(osaAktiivi, [b.dataset.osaNro], 'osasuodatin');
    location.hash = 'pelit/katalogi';
    window.scrollTo(0, juuri.offsetTop - 20);
  });

  $('oikeudet').innerHTML = Object.entries(KATALOGI.oikeudetSelite).map(([avain, teksti]) => {
    const maara = PELIT.filter((p) => p.oikeusluokka === avain).length;
    return `<div><span class="k-oikeus ${OIKEUDET[avain]?.luokka || ''}">${esc(avain)}</span> <span class="mono" style="font-size:12px;color:var(--muste-haalea)">${maara} peliä</span><p>${esc(teksti)}</p></div>`;
  }).join('');

  // --- Ensimmäiset 10 ---
  $('ensimmaiset').innerHTML = KATALOGI.ensimmaiset10.map((e) => {
    const p = PELIT.find((x) => x.id === e.id);
    return `<div class="sk-kortti" data-id="${esc(e.id)}" style="--vari:${osaVari(p ? p.osa : 1)}" role="button" tabindex="0">
      <div class="sk-ylarivi"><span class="sk-numero">#${e.jarjestys}</span><span class="sk-ikoni" title="${esc(e.tyyppi)}">${PELI_IKONIT[e.tyyppi] || PELI_IKONIT.muu}</span></div>
      <div class="sk-nimi">${esc(e.peli)}</div>
      <div class="sk-kaari">${esc(e.id)} · ${esc(p ? p.maaNimi : '')} · ${esc(e.tyyppi)}</div>
      <p class="sk-perustelu">${esc(e.perustelu)}</p>
    </div>`;
  }).join('');
  function avaaPeli(id) {
    // Tyhjennä suodattimet, jotta peli varmasti näkyy.
    [osaAktiivi, oikeusAktiivi, tilaAktiivi].forEach((s) => s.clear());
    juuri.querySelectorAll('nav.suodatin button.lippu').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    $('tekstihaku').value = '';
    hakuteksti = '';
    maaValinta.value = '';
    suodata();
    location.hash = 'pelit/katalogi';
    aktivoi('katalogi'); // hashchange tulee vasta myöhemmin; välilehti näkyviin ennen vieritystä
    const kortti = juuri.querySelector(`.kortti[data-id="${id}"]`);
    if (!kortti) return;
    juuri.querySelectorAll('.kortti.korostus').forEach((k) => k.classList.remove('korostus'));
    kortti.classList.add('korostus');
    requestAnimationFrame(() => kortti.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
  $('ensimmaiset').addEventListener('click', (ev) => {
    const k = ev.target.closest('.sk-kortti');
    if (k) avaaPeli(k.dataset.id);
  });
  $('ensimmaiset').addEventListener('keydown', (ev) => {
    const k = ev.target.closest('.sk-kortti');
    if (k && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); avaaPeli(k.dataset.id); }
  });

  // --- Pelikortit osittain ---
  function korttiHTML(p) {
    const t = PELITILAT[p.tila] || PELITILAT.idea;
    const o = OIKEUDET[p.oikeusluokka] || { nimi: p.oikeusluokka, luokka: '' };
    const jarjestys = ENSIMMAISET.get(p.id);
    const lahde = p.lahdeUrl
      ? `<a href="${esc(p.lahdeUrl)}" target="_blank" rel="noopener">${esc(p.lahdeNimi)}</a>`
      : esc(p.lahdeNimi);
    const tieto = (nimi, arvo) => (arvo ? `<dt>${nimi}</dt><dd>${arvo}</dd>` : '');
    return `<div class="k-nauha"></div>
      <div class="k-body">
        <div class="k-ylarivi">
          <span class="k-tunnus">${esc(p.id)} · ${esc(p.maaNimi)}</span>
          <span class="k-oikeus ${o.luokka}">${esc(o.nimi)}</span>
        </div>
        <p class="k-nimi">${esc(p.nimi)}</p>
        ${p.alkuperainen ? `<p class="k-meta">${esc(p.alkuperainen)}</p>` : ''}
        ${p.saanto ? `<p class="k-saanto">${esc(p.saanto)}</p>` : ''}
        ${p.oppimiskytkos ? `<p class="k-opitaan">Opitaan: ${esc(p.oppimiskytkos)}</p>` : ''}
        <dl class="k-tiedot">
          ${tieto('13+', esc(p.sopivuus13))}
          ${tieto('Vastus', esc(p.bottiKaveri))}
          ${tieto('Pelissä', esc(p.pelikytkos))}
          ${tieto('Oikeudet', esc(p.oikeudet))}
          ${tieto('Lähde', lahde)}
        </dl>
        <div class="k-alarivi">
          <span class="k-tila-teksti" style="--tilavari:${t.vari}">${t.nimi}</span>
          ${jarjestys ? `<span class="k-top">Ensimmäiset 10 · #${jarjestys}</span>` : ''}
        </div>
      </div>`;
  }

  const juuriKaikki = $('ruudukko');
  for (const o of OSAT) {
    const pelit = PELIT.filter((p) => p.osa === o.nro);
    const lohko = document.createElement('div');
    lohko.className = 'osa-lohko';
    lohko.dataset.osa = `lohko-${o.nro}`;
    lohko.style.setProperty('--vari', osaVari(o.nro));
    lohko.innerHTML = `<h3><span class="osa-nro">${o.nro}</span>${esc(o.nimi)}<span class="maara">(${pelit.length})</span></h3>
      <div class="ruudukko"></div>`;
    juuriKaikki.appendChild(lohko);
    const ruudukko = lohko.querySelector('.ruudukko');
    for (const p of pelit) {
      const d = document.createElement('div');
      d.className = 'kortti';
      d.dataset.id = p.id;
      d.dataset.osaNro = p.osa;
      d.dataset.maa = p.maa;
      d.dataset.oikeus = p.oikeusluokka;
      d.dataset.tila = p.tila;
      d.dataset.haku = `${p.id} ${p.nimi} ${p.alkuperainen || ''} ${p.maaNimi} ${p.saanto} ${p.oppimiskytkos} ${p.pelikytkos}`.toLowerCase();
      d.innerHTML = korttiHTML(p);
      ruudukko.appendChild(d);
    }
  }
  juuriKaikki.insertAdjacentHTML('beforeend', '<p class="tyhja" data-osa="ei-osumia" hidden>Ei osumia näillä suodattimilla.</p>');

  // --- Suodattimet (osa, oikeudet, tila, maa, haku) ---
  const osaAktiivi = new Set();
  const oikeusAktiivi = new Set();
  const tilaAktiivi = new Set();
  let hakuteksti = '';
  const maaValinta = $('maasuodatin');

  function lippurivi(kohde, avaimet, nimi, laske, aktiiviSetti) {
    const k = $(kohde);
    k.innerHTML = avaimet.map((a) => {
      const maara = laske(a);
      return maara > 0 ? `<button type="button" class="lippu" data-avain="${esc(a)}" aria-pressed="false">${esc(nimi(a))} (${maara})</button>` : '';
    }).join('');
    k.addEventListener('click', (ev) => {
      const b = ev.target.closest('button');
      if (!b) return;
      const avain = b.dataset.avain;
      if (aktiiviSetti.has(avain)) { aktiiviSetti.delete(avain); b.setAttribute('aria-pressed', 'false'); }
      else { aktiiviSetti.add(avain); b.setAttribute('aria-pressed', 'true'); }
      suodata();
    });
  }
  function asetaSuodin(setti, avaimet, kohde) {
    setti.clear();
    avaimet.forEach((a) => setti.add(String(a)));
    $(kohde).querySelectorAll('button.lippu').forEach((b) => b.setAttribute('aria-pressed', setti.has(b.dataset.avain) ? 'true' : 'false'));
    suodata();
  }
  lippurivi('osasuodatin', OSAT.map((o) => String(o.nro)), (a) => OSAT.find((o) => String(o.nro) === a).nimi,
    (a) => PELIT.filter((p) => String(p.osa) === a).length, osaAktiivi);
  lippurivi('oikeussuodatin', Object.keys(OIKEUDET), (a) => OIKEUDET[a].nimi,
    (a) => PELIT.filter((p) => p.oikeusluokka === a).length, oikeusAktiivi);
  lippurivi('tilasuodatin', Object.keys(PELITILAT), (a) => PELITILAT[a].nimi,
    (a) => PELIT.filter((p) => p.tila === a).length, tilaAktiivi);

  // Maavalitsin: kaikki maat osien järjestyksessä, määrät suluissa.
  maaValinta.innerHTML = `<option value="">Kaikki maat (${maita})</option>` + OSAT.flatMap((o) => o.maat).map((m) =>
    `<option value="${esc(m.iso3)}">${esc(m.nimi)} (${PELIT.filter((p) => p.maa === m.iso3).length})</option>`).join('');
  maaValinta.addEventListener('change', suodata);
  $('tekstihaku').addEventListener('input', (ev) => {
    hakuteksti = ev.target.value.trim().toLowerCase();
    suodata();
  });

  function suodata() {
    let nakyvia = 0;
    const maa = maaValinta.value;
    juuri.querySelectorAll('.kortti').forEach((k) => {
      let n = true;
      if (osaAktiivi.size && !osaAktiivi.has(k.dataset.osaNro)) n = false;
      if (oikeusAktiivi.size && !oikeusAktiivi.has(k.dataset.oikeus)) n = false;
      if (tilaAktiivi.size && !tilaAktiivi.has(k.dataset.tila)) n = false;
      if (maa && k.dataset.maa !== maa) n = false;
      if (hakuteksti && !k.dataset.haku.includes(hakuteksti)) n = false;
      k.hidden = !n;
      if (n) nakyvia++;
    });
    juuri.querySelectorAll('.osa-lohko').forEach((l) => {
      l.hidden = !l.querySelector('.kortti:not([hidden])');
    });
    $('ei-osumia').hidden = nakyvia > 0;
    $('osumamaara').textContent = `${nakyvia} / ${PELIT.length} peliä`;
  }
  suodata();

  // --- Pelisuunnitelmat ---
  function suunnitelmaKortti(k) {
    const peli = k.id ? PELIT.find((p) => p.id === k.id) : null;
    const tila = k.kentat.find((x) => x.nimi === 'Tila');
    const tiivis = k.kentat.find((x) => x.nimi === 'Konsepti' || x.nimi === 'Sääntö');
    const kentat = k.kentat.filter((x) => x !== tila);
    const nimi = k.id ? k.otsikko.replace(new RegExp(`,?\\s*${k.id}\\)$`), ')').replace(/\s*\(\)$/, '') : k.otsikko;
    return `<details class="suunnitelma" style="--vari:${osaVari(peli ? peli.osa : 3)}">
      <summary>${k.jarjestys ? `<span class="suunnitelma-nro">${k.jarjestys}.</span>` : ''}
        <span class="suunnitelma-nimi">${esc(nimi)}</span>
        ${k.id ? `<span class="suunnitelma-id">${esc(k.id)}${peli ? ` · ${esc(peli.maaNimi)}` : ''}</span>` : ''}
        ${tila ? `<span class="suunnitelma-tila">${esc(tila.teksti.replace(/\.$/, ''))}</span>` : ''}
        ${tiivis ? `<p class="suunnitelma-tiivis">${mdKentta(tiivistelma(tiivis.teksti))}</p>` : ''}
      </summary>
      <dl>${kentat.map((x) => `<div><dt>${esc(x.nimi)}</dt><dd>${mdKentta(x.teksti)}</dd></div>`).join('')}</dl>
    </details>`;
  }
  for (const ryhma of ['ensimmaiset', 'omistajan']) {
    const kortit = (KATALOGI.kortit || []).filter((k) => k.ryhma === ryhma);
    $(`suunnitelmat-${ryhma}`).innerHTML = kortit.length
      ? kortit.map(suunnitelmaKortti).join('') : '<p class="tyhja">Ei vielä kortteja.</p>';
  }

  // --- Ideat ---
  $('ideat').innerHTML = KATALOGI.ideat.length
    ? KATALOGI.ideat.map((x) => {
      const t = PELITILAT[x.tila] || PELITILAT.idea;
      return `<div class="idea"><b>${esc(x.idea)}</b>${x.kuvaus ? `<p>${esc(x.kuvaus)}</p>` : ''}<span class="k-tila-teksti" style="--tilavari:${t.vari}">${t.nimi}</span></div>`;
    }).join('')
    : '<p class="tyhja">Ei vielä ideoita.</p>';

  $('alatunniste').innerHTML = `Lähde: <a href="docs/pelikatalogi.md">docs/pelikatalogi.md</a> · päivitetty ${paivaTeksti(KATALOGI.paivitetty)} ·
    oikeudet: suora, oma versio · tilat: idea, tarkista`;

  $('tulostanappi').addEventListener('click', () => window.print());

  const aktivoi = alavalilehdet(juuri, 'pelit', PELIEN_ALAT);
  return aktivoi;
}
