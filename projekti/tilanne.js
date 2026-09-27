/*
 * TILANNE-välilehti ja osa-aluevälilehdet (Kartta ja maailma, Sisältö ja
 * oppiminen, Natiivi iOS).
 *
 * Tekstit tulevat docs/tilannekatsaus.md:stä ja luvut pelin datasta
 * generaattorin tools/tee-projekti-data.mjs kautta (projekti-data.js).
 * Linssien ja pelien tilaluvut lasketaan tässä suoraan katalogien datasta.
 */
import { esc, luku, paivaTeksti } from './yhteiset.js';
import { LINSSITILAT, tilaAvain } from './linssit.js';
import { PELITILAT, PELI_IKONIT } from './pelit.js';

// Osa-alueiden kuvat (assets/projekti/, pienennetyt kuvakaappaukset pelistä).
const KUVAT = {
  pallo: { src: 'assets/projekti/pallokartta.jpg', w: 900, h: 853, alt: 'Pergamenttityylinen pallokartta, jolla näkyvät Euroopan, Afrikan ja Aasian kaupungit', teksti: 'Pallokartta: koko maapallo omana, pergamenttityylisenä laattakarttana.' },
  kreikka: { src: 'assets/projekti/kreikka-maasto.jpg', w: 431, h: 900, alt: 'Kallistettu karttanäkymä Kreikasta: vuoret kohoavat kolmiulotteisina, kartalla Delfoi, Korintin kanava ja Epidauros', teksti: 'iOS-sovelluksen kallistettu näkymä: Kreikan vuoret kolmiulotteisina ja kohteet kartalla.' },
  lehti: { src: 'assets/projekti/kaupunkilehti-pariisi.jpg', w: 414, h: 900, alt: 'Pariisin kaupunkilehden etusivu: Eiffel-torni ja Invalidien kupoli, alla lehden teksti', teksti: 'Kaupunkilehti: Pariisin etusivu, jonka tekstin voi myös kuunnella.' },
  chartres: { src: 'assets/projekti/lehti-chartres.jpg', w: 585, h: 900, alt: 'Chartresin katedraalia käsittelevä juttu kahdessa palstassa ja ilmakuva kaupungista', teksti: 'Nähtävyysjuttu kahdessa palstassa: Chartresin katedraali, kuva ja lähteet.' },
  ios: { src: 'assets/projekti/ios-kaupunkikortti.jpg', w: 414, h: 900, alt: 'iPhonen kaupunkikortti: Pariisin kuva, esittely, kohdekartta ja turisti-info', teksti: 'iOS-sovellus iPhonessa: Pariisin kaupunkikortti ja kohdekartta.' },
  radio: { src: 'assets/projekti/linssi-yovalot-radio.jpg', w: 900, h: 841, alt: 'Euroopan yövalot kartalla ja vanhanaikainen radio, joka soittaa Pariisin asemaa', teksti: 'Yövalot ja radio: maailman radioasemat suorana kartan päällä.' },
};

function kuvaHTML(k, lataa = 'lazy') {
  return `<figure class="kuva"><img src="${k.src}" width="${k.w}" height="${k.h}" alt="${esc(k.alt)}" loading="${lataa}" decoding="async"><figcaption>${esc(k.teksti)}</figcaption></figure>`;
}

// Tila-merkin sävy osa-alueen tilatekstin mukaan.
function tilaVari(tila) {
  const t = String(tila || '').toLowerCase();
  if (/tuotannossa|pelattavissa/.test(t)) return 'var(--vihrea)';
  if (/testauk|osa pelissä/.test(t)) return 'var(--kulta)';
  if (/suunnit/.test(t)) return 'var(--terrakotta)';
  return 'var(--seepia)';
}
const tilaMerkki = (tila) => (tila ? `<span class="tila-merkki" style="--tilavari:${tilaVari(tila)}">${esc(tila)}</span>` : '');

// "Katso Linssit-välilehti." viittaa sivuun itseensä — kortissa on oma linkki.
const kappaleet = (osio) => osio.kappaleet.map((k) => k.replace(/\s*Katso [\wäöÄÖ ]+-välilehti\.\s*$/, '')).filter(Boolean);

function seuraavaksiHTML(osio, taso = 'h3') {
  if (!osio.seuraavaksi.length) return '';
  return `<div class="seuraavaksi"><${taso}>Seuraavaksi</${taso}><ul>${osio.seuraavaksi.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>`;
}

function lukukortti(nimi, arvo, erittely) {
  return `<div class="lukukortti"><span class="arvo">${esc(arvo)}</span><span class="nimi">${esc(nimi)}</span>${erittely ? `<span class="erittely">${esc(erittely)}</span>` : ''}</div>`;
}

// Tiloittainen jakauma: pinottu palkki + selitteet.
function tilapalkki(otsikko, tilat, maarat, linkki) {
  const yht = Object.values(maarat).reduce((a, b) => a + b, 0);
  const osat = Object.entries(tilat).filter(([a]) => maarat[a]);
  return `<div class="tilapalkki">
    <div class="ylarivi"><b>${esc(otsikko)}</b><span class="yht">${yht} yhteensä · <a href="#${linkki}">avaa →</a></span></div>
    <div class="palkki" role="img" aria-label="${esc(osat.map(([a, t]) => `${t.nimi} ${maarat[a]}`).join(', '))}">
      ${osat.map(([a, t]) => `<span style="--vari:${t.vari};width:${(maarat[a] / yht) * 100}%"></span>`).join('')}
    </div>
    <ul class="selitteet">${osat.map(([a, t]) => `<li><i style="--vari:${t.vari}"></i>${t.nimi} <b>${maarat[a]}</b></li>`).join('')}</ul>
  </div>`;
}

/**
 * Laskee Tilanne-sivun luvut: projekti-datan valmiit luvut + katalogien tilat.
 */
export function kokoaLuvut(projekti, linssit, pelit) {
  const linssitTiloittain = {};
  for (const a of Object.keys(LINSSITILAT)) linssitTiloittain[a] = 0;
  for (const l of linssit.linssit) linssitTiloittain[tilaAvain(l.tila)] = (linssitTiloittain[tilaAvain(l.tila)] || 0) + 1;
  const pelitTiloittain = {};
  for (const a of Object.keys(PELITILAT)) pelitTiloittain[a] = 0;
  for (const p of pelit.pelit) pelitTiloittain[p.tila] = (pelitTiloittain[p.tila] || 0) + 1;
  return {
    ...projekti.luvut,
    linssit: linssit.linssit.length,
    linssitPelissa: linssit.linssit.filter((l) => l.pelissa).length,
    linssitTiloittain,
    pelit: pelit.pelit.length,
    pelienMaat: new Set(pelit.pelit.map((p) => p.maa)).size,
    pelisuunnitelmia: (pelit.kortit || []).filter((k) => k.ryhma === 'ensimmaiset').length,
    pelitTiloittain,
  };
}

// Osa-aluekohtaiset lukurivit (Tilanne-kortti ja oma välilehti käyttävät samoja).
function osanLuvut(avain, L) {
  const k = L.kartta;
  switch (avain) {
    case 'kartta': return [
      ['karttatasoa', `Z0–Z${k.syvinTaso}`, `${k.tasoja} tarkkuustasoa maapallosta kaupunkiin`],
      ['laattaa tasolla Z10', luku(k.z10Yhteensa), `${luku(k.z10Laatat[0])} + ${luku(k.z10Laatat[1])} kahdessa kerroksessa, tuotannossa ${paivaTeksti(k.z10Tuotannossa)}`],
      ['maata kartalla', luku(L.maita), 'jokaisella oma kartta-alue ja lippu'],
      ['kohdetta kartalla', luku(L.kohteita), `${luku(L.kohdeLajit.nahtavyydet)} nähtävyyttä ja historiaa · ${luku(L.kohdeLajit.maasto)} maastokohdetta · ${luku(L.kohdeLajit.skandaalit)} skandaalia · ${luku(L.kohdeLajit.elaimet)} eläintä`],
    ];
    case 'sisalto': return [
      ['kaupunkia', luku(L.kaupunkeja), `${luku(L.kaupunkilehtia)} kaupunkilehteä`],
      ['maata', luku(L.maita), `${luku(L.maalehtia)} maalehteä`],
      ['nähtävyysjuttua', luku(L.juttuja), 'kaupunkilehtien kohteista, kuvineen'],
      ['kohdetta kartalla', luku(L.kohteita), 'nimettyjä ja napautettavia'],
    ];
    case 'linssit': return [
      ['linssiä katalogissa', luku(L.linssit), `${L.linssitPelissa} pelissä nyt`],
      ['valmiina', L.linssitTiloittain.valmis, `${L.linssitTiloittain.rakenteilla} rakenteilla`],
    ];
    case 'pelit': return [
      ['peliä katalogissa', luku(L.pelit), `${L.pelienMaat} maasta`],
      ['pelisuunnitelmaa', L.pelisuunnitelmia, 'ensimmäiset toteutettavat'],
    ];
    case 'natiivi': return [
      ['iOS-testiversio', L.versiot.natiivi, `sisäinen testaus, ${paivaTeksti(L.versiot.natiiviPaivitetty)}`],
      ['selainversio', `v${L.versiot.web}`, 'toimii jo nyt selaimessa'],
    ];
    default: return [];
  }
}

// Osa-alueen kortin kuva Tilanne-sivulla ja kuvan rajauskohta (object-position).
const KORTTIKUVA = {
  kartta: ['pallo', 'center 35%'],
  sisalto: ['chartres', 'center 14%'],
  linssit: ['radio', 'center 30%'],
  natiivi: ['kreikka', 'center 28%'],
};
// Peleistä ei ole vielä kuvakaappauksia: kortin yläosaan pelityyppien merkit.
const pelikuvio = () => `<div class="ok-kuva ok-kuvio" aria-hidden="true">${
  ['kortti', 'lauta/strategia', 'piha/tarkkuus', 'lauta/noppa'].map((t) => `<span>${PELI_IKONIT[t]}</span>`).join('')}</div>`;
// Osa-aluevälilehtien kuvat (1–3).
const SIVUKUVAT = { kartta: ['pallo', 'kreikka'], sisalto: ['lehti', 'chartres'], natiivi: ['ios', 'kreikka'] };

export function piirraTilanne(juuri, projekti, L) {
  const t = projekti.tilanne;
  const yleis = t.osiot.find((o) => o.avain === 'yleiskuva');
  const muut = t.osiot.filter((o) => o.avain !== 'yleiskuva');
  juuri.innerHTML = `
    <section class="lohko">
      <h2 class="otsikko">Yleiskuva ${tilaMerkki(yleis?.tila)} <span class="selite">— päivitetty ${paivaTeksti(t.paivitetty)}</span></h2>
      <div class="yleiskuva">
        <div>${yleis ? kappaleet(yleis).map((k) => `<p>${esc(k)}</p>`).join('') : ''}${yleis ? seuraavaksiHTML(yleis) : ''}</div>
        ${kuvaHTML(KUVAT.pallo, 'eager')}
      </div>
    </section>

    <section class="lohko">
      <h2 class="otsikko">Luvut <span class="selite">— lasketaan pelin aineistosta</span></h2>
      <div class="luvutaulu">
        ${lukukortti('kaupunkia', luku(L.kaupunkeja), `${luku(L.kaupunkilehtia)} kaupunkilehteä`)}
        ${lukukortti('maata', luku(L.maita), `${luku(L.maalehtia)} maalehteä`)}
        ${lukukortti('kohdetta kartalla', luku(L.kohteita), `${luku(L.juttuja)} nähtävyysjuttua`)}
        ${lukukortti('karttatasoa', `Z0–Z${L.kartta.syvinTaso}`, `${luku(L.kartta.z10Yhteensa)} laattaa tasolla Z10`)}
        ${lukukortti('linssiä', luku(L.linssit), `${L.linssitPelissa} pelissä nyt`)}
        ${lukukortti('perinteistä peliä', luku(L.pelit), `${L.pelienMaat} maasta, ${L.pelisuunnitelmia} suunniteltu`)}
        ${lukukortti('iOS-testiversio', L.versiot.natiivi, 'sisäisessä testauksessa')}
        ${lukukortti('selainversio', `v${L.versiot.web}`, 'pelattavissa selaimessa')}
      </div>
    </section>

    <section class="lohko">
      <h2 class="otsikko">Linssit ja pelit tiloittain</h2>
      <div class="tilapalkit">
        ${tilapalkki('Linssit', LINSSITILAT, L.linssitTiloittain, 'linssit/katalogi')}
        ${tilapalkki('Pelit', PELITILAT, L.pelitTiloittain, 'pelit/katalogi')}
      </div>
    </section>

    <section class="lohko">
      <h2 class="otsikko">Osa-alueet</h2>
      <div class="osa-kortit">
        ${muut.map((o) => {
          const [kuvaAvain, kohta] = KORTTIKUVA[o.avain] || [];
          const kuva = KUVAT[kuvaAvain];
          const luvut = osanLuvut(o.avain, L).slice(0, 2).map(([n, a]) => `${a} ${n}`).join(' · ');
          return `<article class="osa-kortti">
            ${kuva ? `<div class="ok-kuva"><img src="${kuva.src}" alt="${esc(kuva.alt)}" loading="lazy" decoding="async" style="object-position:${kohta}"></div>` : pelikuvio()}
            <div class="ok-body">
              <div class="ok-ylarivi"><h3>${esc(o.otsikko)}</h3>${tilaMerkki(o.tila)}</div>
              ${luvut ? `<span class="ok-luvut">${esc(luvut)}</span>` : ''}
              ${kappaleet(o).map((k) => `<p>${esc(k)}</p>`).join('')}
              ${seuraavaksiHTML(o, 'h4')}
              <a class="osa-linkki" href="#${o.avain}">${esc(o.otsikko)} →</a>
            </div>
          </article>`;
        }).join('')}
      </div>
    </section>`;
}

/** Osa-aluevälilehti: tilannekatsauksen osio + luvut + kuvat. */
export function piirraOsaAlue(juuri, avain, projekti, L) {
  const o = projekti.tilanne.osiot.find((x) => x.avain === avain);
  if (!o) { juuri.innerHTML = '<p class="tyhja">Tälle osa-alueelle ei ole vielä kuvausta.</p>'; return; }
  const kuvat = (SIVUKUVAT[avain] || []).map((k) => KUVAT[k]);
  juuri.innerHTML = `
    <section class="lohko">
      <h2 class="otsikko">${esc(o.otsikko)} ${tilaMerkki(o.tila)}</h2>
      <div class="osa-sivu">
        <div class="teksti">
          ${kappaleet(o).map((k) => `<p>${esc(k)}</p>`).join('')}
          ${seuraavaksiHTML(o)}
        </div>
        <div class="kuvat${kuvat.length > 1 ? ' rinnakkain' : ''}">${kuvat.map((k) => kuvaHTML(k)).join('')}</div>
      </div>
    </section>
    <section class="lohko">
      <h2 class="otsikko">Luvut</h2>
      <div class="luvutaulu">${osanLuvut(avain, L).map(([n, a, e]) => lukukortti(n, a, e)).join('')}</div>
    </section>`;
}
