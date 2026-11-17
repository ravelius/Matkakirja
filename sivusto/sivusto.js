// Matkakirja ja unohdettu aarre: esittelysivuston pieni skripti (ei riippuvuuksia).
// Ilmestymiset, matkan päivälaskuri (1–80 sivun vierityksen mukaan), kuvan suurennos ja kevyt syvyysliike.
(() => {
  'use strict';
  const eiLiiketta = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const juuri = document.documentElement;

  // 1. Ilmestyminen: osa tulee näkyviin, kun se vierii ruutuun.
  const naytettavat = document.querySelectorAll('[data-nayta]');
  if (eiLiiketta || !('IntersectionObserver' in window)) {
    naytettavat.forEach(e => e.classList.add('nakyy'));
  } else {
    const vahti = new IntersectionObserver(osumat => {
      for (const o of osumat) if (o.isIntersecting) { o.target.classList.add('nakyy'); vahti.unobserve(o.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    naytettavat.forEach(e => vahti.observe(e));
  }

  // 2. Yläpalkki, matkan päivä ja syvyysliike: yksi vierityksen käsittelijä, piirto ruudunpäivityksen tahtiin.
  const palkki = document.getElementById('ylapalkki');
  const paiva = document.getElementById('paiva');
  const matka = document.getElementById('matka');
  const pallo = document.getElementById('pallo');
  const kaistakuva = document.getElementById('kaistakuva');
  const kiintea = palkki && palkki.classList.contains('ylapalkki--kiintea');
  let odottaa = false;
  function piirra() {
    odottaa = false;
    const y = window.scrollY;
    const pituus = Math.max(1, juuri.scrollHeight - window.innerHeight);
    const osuus = Math.min(1, Math.max(0, y / pituus));
    if (palkki && !kiintea) palkki.classList.toggle('kiinni', y > 40);
    if (matka) matka.style.transform = `scaleX(${osuus})`;
    if (paiva) paiva.textContent = `${juuri.lang === 'en' ? 'Day' : 'Päivä'} ${Math.max(1, Math.round(1 + osuus * 79))} / 80`;
    if (!eiLiiketta) {
      if (pallo && y < window.innerHeight * 1.2 && window.innerWidth > 860) pallo.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      if (kaistakuva && window.innerWidth > 860) {
        const r = kaistakuva.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) kaistakuva.style.transform = `scale(1.06) translate3d(0, ${(r.top / window.innerHeight) * -3}%, 0)`;
      }
    }
  }
  function pyyda() { if (!odottaa) { odottaa = true; requestAnimationFrame(piirra); } }
  window.addEventListener('scroll', pyyda, { passive: true });
  window.addEventListener('resize', pyyda, { passive: true });
  piirra();

  // 3. Valikon nykyinen osa.
  const linkit = [...document.querySelectorAll('.ylapalkki__nav a[href^="#"]')];
  if (linkit.length && 'IntersectionObserver' in window) {
    const osat = linkit.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const osavahti = new IntersectionObserver(osumat => {
      for (const o of osumat) if (o.isIntersecting) linkit.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + o.target.id ? 'true' : 'false'));
    }, { rootMargin: '-45% 0px -50% 0px' });
    osat.forEach(o => osavahti.observe(o));
  }

  // 4. Kuvan suurennos: napautus avaa, ✕, Esc tai ohinapautus sulkee.
  const suurennos = document.getElementById('suurennos');
  if (suurennos && typeof suurennos.showModal === 'function') {
    const kuva = suurennos.querySelector('img');
    const teksti = suurennos.querySelector('figcaption');
    document.addEventListener('click', e => {
      const nappi = e.target.closest('[data-suurenna]');
      if (!nappi) return;
      kuva.src = nappi.dataset.suurenna;
      kuva.alt = nappi.querySelector('img')?.alt || '';
      teksti.textContent = nappi.dataset.teksti || '';
      teksti.hidden = !nappi.dataset.teksti;
      suurennos.showModal();
    });
    suurennos.addEventListener('click', e => { if (e.target === suurennos || e.target.closest('.suurennos__sulje') || e.target.tagName === 'FIGURE') suurennos.close(); });
    suurennos.addEventListener('close', () => { kuva.removeAttribute('src'); });
  }
})();
