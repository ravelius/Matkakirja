import { R2_JUURI, kohtaamiskuvat } from './kohtaamiskuvat-data.js';

const galleria = document.querySelector('#galleria');
const korttipohja = document.querySelector('#kuvakortti');
const haku = document.querySelector('#haku');
const tilavalinta = document.querySelector('#tila');
const tyhja = document.querySelector('#tyhja');
const tilanimet = {
  tarkistettu: 'Täysikokotarkistettu',
  r2: 'R2:ssa',
  pelissa: 'Pelissä',
};

function kortti(kohtaaminen) {
  const pala = korttipohja.content.cloneNode(true);
  const artikkeli = pala.querySelector('.kortti');
  const kuva = pala.querySelector('.kuva');
  const puuttuu = pala.querySelector('.kuva-puuttuu');

  artikkeli.dataset.haku = `${kohtaaminen.kaupunki} ${kohtaaminen.maa} ${kohtaaminen.hahmo}`.toLocaleLowerCase('fi');
  artikkeli.dataset.tila = kohtaaminen.tila;
  kuva.src = `${R2_JUURI}/${encodeURIComponent(kohtaaminen.tiedosto)}`;
  kuva.alt = kohtaaminen.alt;
  kuva.addEventListener('error', () => {
    kuva.hidden = true;
    puuttuu.hidden = false;
  }, { once: true });

  pala.querySelector('.tilamerkki').textContent = tilanimet[kohtaaminen.tila] ?? kohtaaminen.tila;
  pala.querySelector('.maa').textContent = kohtaaminen.maa;
  pala.querySelector('.kaupunki').textContent = kohtaaminen.kaupunki;
  pala.querySelector('.hahmo').textContent = kohtaaminen.hahmo;
  pala.querySelector('.kuvateksti').textContent = kohtaaminen.kuvateksti;
  pala.querySelector('.hetki').textContent = kohtaaminen.hetki;
  pala.querySelector('.vihje').textContent = kohtaaminen.vihje;
  return pala;
}

for (const kohtaaminen of kohtaamiskuvat) galleria.append(kortti(kohtaaminen));

document.querySelector('#kuvia-yhteensa').textContent = String(kohtaamiskuvat.length);
document.querySelector('#kaupunkeja-yhteensa').textContent = String(new Set(kohtaamiskuvat.map(({ kaupunki }) => kaupunki)).size);

function suodata() {
  const sana = haku.value.trim().toLocaleLowerCase('fi');
  const tila = tilavalinta.value;
  let nakyvia = 0;

  for (const artikkeli of galleria.querySelectorAll('.kortti')) {
    const osuuHakuun = !sana || artikkeli.dataset.haku.includes(sana);
    const osuuTilaan = tila === 'kaikki' || artikkeli.dataset.tila === tila;
    artikkeli.hidden = !(osuuHakuun && osuuTilaan);
    if (!artikkeli.hidden) nakyvia += 1;
  }
  tyhja.hidden = nakyvia !== 0;
}

haku.addEventListener('input', suodata);
tilavalinta.addEventListener('change', suodata);
