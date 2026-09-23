/*
 * WEB-NÄKYMIEN RIIPPUVUUSLISTAT SISÄLTÖPAKETTIIN (Siirtoseppä 23.9.2026,
 * skeema 1.3).
 *
 * Natiivin ensimmäinen pelattava tavoite näyttää kaupunki- ja maalehden
 * web-koodina WKWebView-kuoressa (omistajan linjaus 23.9.2026: natiivi
 * etusijalle, web ylläpitoon). Kuori tarvitsee tiedon siitä, mitkä
 * tiedostot lehti vetää mukanaan, jotta se voi paketoida ne tai hakea
 * täsmälleen saman version Pagesista (sha256).
 *
 * Lista lasketaan lähdekoodista, ei käsin:
 *   - JS: juurimoduulien tuontisulkeuma. Staattiset `import … from` ja
 *     `export … from`, dynaamiset `import('…')`. Kommenttirivit ohitetaan
 *     (rekisterissä on kommentoituja tulevia linssejä).
 *   - CSS: index.html:n tyylitiedostot sekä sulkeuman moduulien
 *     ajonaikaisesti liittämät (`new URL('fokusvirta.css', …)`).
 *   - Paikalliset tiedostot: sulkeuman merkkijonoissa sellaisenaan
 *     esiintyvät `assets/…`-polut, jotka ovat repossa. Mallipohjasta
 *     muodostetut polut (`assets/nostotyypit/${nimi}.png`) kirjataan
 *     kansioina. Ämpärin media on media.json:ssa.
 *
 * Deterministinen: kaikki listat aakkosjärjestyksessä.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

/** Näkymät ja niiden juurimoduulit. Uusi web-näkymä natiiviin = uusi rivi. */
export const WEB_NAKYMAT = {
  /*
   * Lehtikuori (Pelikoodari, PR #2942): index.html?lehti=<kaupunki-id> avaa
   * pelkän kaupunkilehden ilman lautaa. Tila eikä oma entry, koska lehti.js
   * käyttää 44 ui-olion jäsentä (saapumisdialogin DOM, openArrival,
   * mitoitaArkki…), joten juuri on main.js ja sulkeumaan tulee ui.js.
   */
  lehti: {
    kuvaus: 'Kaupunki- ja maalehti WKWebView-kuoressa: avaa sivu index.html?lehti=<kaupunki-id>. '
      + 'Kuori kuulee webkit.messageHandlers.matkakirja-viestit { tapahtuma: "lehti-auki" | '
      + '"lehti-suljettu", kaupunki }. Tila ei tallenna peliä. Pallolautaa ei avata, mutta sen '
      + 'moduulit tulevat main.js:n staattisista tuonneista mukaan.',
    sivu: 'index.html?lehti={kaupunki}',
    juuret: ['js/main.js'],
  },
};

const sha = (b) => createHash('sha256').update(b).digest('hex');

const TUONTI = /^\s*(?:import|export)\s[^;]*?\sfrom\s*['"](\.{1,2}\/[^'"]+)['"]|^\s*import\s*['"](\.{1,2}\/[^'"]+)['"]/gm;
const DYNAAMINEN = /import\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g;
const CSS_NIMI = /['"`](?:css\/)?([a-z0-9-]+\.css)['"`]/g;
const ASSET = /['"`](assets\/[^'"`$\s]+)(\$\{)?/g;

const onKommentti = (teksti, kohta) => {
  const alku = teksti.lastIndexOf('\n', kohta) + 1;
  return /^\s*(\*|\/\/|\/\*)/.test(teksti.slice(alku, kohta));
};

function tiedosto(juuri, polku) {
  const b = readFileSync(join(juuri, polku));
  return { polku, tavuja: b.length, sha256: sha(b) };
}

/**
 * Laskee yhden näkymän riippuvuudet. Palauttaa { juuret, tavuja,
 * sivut, moduulit, tyylit, tiedostot, kansiot }; dynaamisesti tuoduilla moduuleilla dynaaminen: true.
 */
export function laskeRiippuvuudet(juuret, juuri) {
  const moduulit = new Set();
  const dynaamiset = new Set();
  const tyylit = new Set();
  const assetit = new Set();
  const kansiot = new Set();
  const jono = [...juuret];
  while (jono.length) {
    const polku = jono.pop();
    if (moduulit.has(polku)) continue;
    if (!existsSync(join(juuri, polku))) throw new Error(`${polku}: tuotua tiedostoa ei ole`);
    moduulit.add(polku);
    const teksti = readFileSync(join(juuri, polku), 'utf8');
    const lisaa = (suhteellinen, dyn) => {
      const kohde = normalize(join(dirname(polku), suhteellinen));
      if (dyn) dynaamiset.add(kohde);
      if (!moduulit.has(kohde)) jono.push(kohde);
    };
    for (const m of teksti.matchAll(TUONTI)) lisaa(m[1] ?? m[2], false);
    for (const m of teksti.matchAll(DYNAAMINEN)) {
      if (!onKommentti(teksti, m.index)) lisaa(m[1], true);
    }
    for (const m of teksti.matchAll(CSS_NIMI)) {
      if (!onKommentti(teksti, m.index) && existsSync(join(juuri, 'css', m[1]))) tyylit.add(`css/${m[1]}`);
    }
    for (const m of teksti.matchAll(ASSET)) {
      if (onKommentti(teksti, m.index)) continue;
      if (m[2]) kansiot.add(m[1].replace(/[^/]*$/, ''));
      else if (existsSync(join(juuri, m[1])) && statSync(join(juuri, m[1])).isFile()) assetit.add(m[1]);
    }
  }
  const html = readFileSync(join(juuri, 'index.html'), 'utf8');
  for (const m of html.matchAll(/<link rel="stylesheet" href="(css\/[^"]+)"/g)) tyylit.add(m[1]);

  const jarjesta = (s) => [...s].sort();
  const kansioLista = jarjesta(kansiot).filter((k) => existsSync(join(juuri, k))).map((k) => {
    const tiedostot = readdirSync(join(juuri, k)).filter((f) => statSync(join(juuri, k, f)).isFile());
    return { polku: k, tiedostoja: tiedostot.length, tavuja: tiedostot.reduce((a, f) => a + statSync(join(juuri, k, f)).size, 0) };
  });
  const moduuliLista = jarjesta(moduulit).map((p) => ({ ...tiedosto(juuri, p), ...(dynaamiset.has(p) ? { dynaaminen: true } : {}) }));
  const tyyliLista = jarjesta(tyylit).map((p) => tiedosto(juuri, p));
  // Sivu itse (index.html) on koodia: DOM, johon lehti piirtää.
  const assetLista = jarjesta(assetit).map((p) => tiedosto(juuri, p));
  const sivuLista = [tiedosto(juuri, 'index.html')];
  const summa = (l) => l.reduce((a, t) => a + t.tavuja, 0);
  return {
    juuret: [...juuret],
    // koodi = JS + CSS (paketoitava kuoreen); tiedostot + kansiot =
    // paikalliset kuvat ja data, jotka lehti hakee ajon aikana.
    tavuja: {
      koodi: summa(sivuLista) + summa(moduuliLista) + summa(tyyliLista),
      tiedostot: summa(assetLista),
      kansiot: summa(kansioLista),
    },
    sivut: sivuLista,
    moduulit: moduuliLista,
    tyylit: tyyliLista,
    tiedostot: assetLista,
    kansiot: kansioLista,
  };
}

/** Kaikki näkymät vientiin: [{ nimi, tiedosto, sisalto }]. */
export function kokoaWebNakymat(juuri) {
  return Object.entries(WEB_NAKYMAT).map(([nimi, n]) => ({
    nimi,
    tiedosto: `web/${nimi}.json`,
    sisalto: {
      $skeema: 'matkakirja-vienti/1/web-nakyma',
      nimi,
      kuvaus: n.kuvaus,
      juuriUrl: 'https://matkakirja.app/',
      sivu: n.sivu,
      ...laskeRiippuvuudet(n.juuret, juuri),
    },
  }));
}
