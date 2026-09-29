/*
 * Dioraamamoottorin MEDIATIEDOSTOJEN käsittely, erä 2 (Linnanrakentaja 29.9.2026).
 * Speksi: docs/raportit/dioraama-rajapinnat-era2-20260929.md kohdat 1 ja 2.
 *
 * Rakennuskone (tools/dioraama/rakenna.mjs) kutsuu näitä funktioita jokaiselle
 * käytetylle pinnalle/henkilölle/liekille sekä (--aanet-lipulla) käytetyille
 * äänille. PUUTTUVA LÄHDE EI OLE VIRHE: funktio tulostaa `ei lähdettä: <polku>`
 * ja palauttaa null (tai jättää tiedoston kopioimatta), jolloin rakennuskone
 * käyttää paikkamerkkiä tai jättää kentän pois rakennus.json:sta.
 *
 * Kaikki on determinististä: sama lähdetiedosto/data tuottaa aina saman
 * tavujonon (suora kopio lähteestä, tai deterministinen paikkamerkkigeneraattori).
 * EI UUSIA NPM-RIIPPUVUUKSIA.
 */

import {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';

import { teePaikkamerkkiAtlas } from './paikkamerkit.mjs';
import { teeLiekkiPaikkamerkkiAtlas } from './liekki-paikkamerkit.mjs';

/** Oletusjuuri lähdekuville, suhteessa repon juureen (speksin kohta 1). */
export const OLETUS_ASSETS_JUURI = 'assets/dioraama';

/** Kirjoittaa puskurin paketin kansioon (luoden alikansiot) ja palauttaa manifest-kuvauksen. */
function kirjoitaPakettiin(kansio, polkuSuhteellinen, buf) {
  const kohde = join(kansio, polkuSuhteellinen);
  mkdirSync(dirname(kohde), { recursive: true });
  writeFileSync(kohde, buf);
  return { polku: polkuSuhteellinen, sha256: createHash('sha256').update(buf).digest('hex'), tavuja: buf.length };
}

/**
 * Pinnan kuvalähteen kopiointi: `<assetsJuuri>/<pinta.lahde>` → `<kansio>/pinnat/<id>.jpg`.
 * Pinnalla ei ole `lahde`-kenttää lainkaan → null hiljaa (pinnalla ei vain ole
 * tekstuuria, ei virhe eikä puuttuva-lähde-ilmoitusta). `lahde` annettu mutta
 * tiedosto puuttuu levyltä → `ei lähdettä: <polku>` ja null. Palauttaa muuten
 * {polku, sha256, tavuja, puoli?}.
 *
 * PUOLIKAS (era 2b, tekstuurimuisti pienille laitteille): jos `<id>-puoli.jpg`
 * löytyy samasta kansiosta kuin `lahde` (tools/dioraama/tuo-codex.mjs tuottaa
 * sen tuonnissa), se kopioituu myös pakettiin ja paluuarvon `puoli`-kenttään
 * ({polku, sha256, tavuja}). Puuttuminen EI ole virhe -- vanhempi pinta ennen
 * tätä ominaisuutta jää ilman puolikasta, natiivi käyttää silloin täyskokoista
 * kaikilla laitteilla (DioraamaSovitin.LataaPinta).
 */
export function kopioiPinnanKuva(id, pinta, kansio, assetsJuuri = OLETUS_ASSETS_JUURI) {
  if (!pinta?.lahde) return null;
  const lahdePolku = join(assetsJuuri, pinta.lahde);
  if (!existsSync(lahdePolku)) {
    console.log(`ei lähdettä: ${lahdePolku}`);
    return null;
  }
  const tulos = kirjoitaPakettiin(kansio, `pinnat/${id}.jpg`, readFileSync(lahdePolku));
  const puoliLahde = lahdePolku.replace(/\.jpe?g$/i, '-puoli.jpg');
  if (existsSync(puoliLahde)) {
    tulos.puoli = kirjoitaPakettiin(kansio, `pinnat/${id}-puoli.jpg`, readFileSync(puoliLahde));
  }
  return tulos;
}

/**
 * Henkilön atlas: `henkilo.maalattu.lahde` (assetsJuuri-suhteinen) jos annettu ja
 * tiedosto löytyy levyltä, muuten proseduraalinen paikkamerkki (teePaikkamerkkiAtlas)
 * jos henkilöllä on `paikkamerkki`. Palauttaa {polku, sha256, tavuja, maalattu}
 * — `maalattu` kertoo kutsujalle kumpi rakennus.json-muoto pitää kirjoittaa
 * (dioraama-rajapinnat-era2 kohta 2). null vain jos henkilöllä ei ole kumpaakaan.
 */
export function teeHenkilonAtlas(id, henkilo, kansio, assetsJuuri = OLETUS_ASSETS_JUURI) {
  const kohdeSuhteellinen = `hahmot/${id}.png`;
  if (henkilo?.maalattu?.lahde) {
    const lahdePolku = join(assetsJuuri, henkilo.maalattu.lahde);
    if (existsSync(lahdePolku)) {
      return { ...kirjoitaPakettiin(kansio, kohdeSuhteellinen, readFileSync(lahdePolku)), maalattu: true };
    }
    console.log(`ei lähdettä: ${lahdePolku}`);
  }
  if (!henkilo?.paikkamerkki) return null;
  return { ...kirjoitaPakettiin(kansio, kohdeSuhteellinen, teePaikkamerkkiAtlas(henkilo, id)), maalattu: false };
}

/**
 * Liekin atlas: `liekki.lahde` (assetsJuuri-suhteinen) jos annettu ja tiedosto
 * löytyy, muuten proseduraalinen paikkamerkki (teeLiekkiPaikkamerkkiAtlas,
 * ks. liekki-paikkamerkit.mjs). Liekillä on aina jotain piirrettävää, joten
 * paluuarvo on aina {polku, sha256, tavuja} (ei koskaan null).
 */
export function teeLiekinAtlas(id, liekki, kansio, assetsJuuri = OLETUS_ASSETS_JUURI) {
  const kohdeSuhteellinen = `liekit/${id}.png`;
  if (liekki?.lahde) {
    const lahdePolku = join(assetsJuuri, liekki.lahde);
    if (existsSync(lahdePolku)) {
      return kirjoitaPakettiin(kansio, kohdeSuhteellinen, readFileSync(lahdePolku));
    }
    console.log(`ei lähdettä: ${lahdePolku}`);
  }
  return kirjoitaPakettiin(kansio, kohdeSuhteellinen, teeLiekkiPaikkamerkkiAtlas(liekki, id));
}

/**
 * Äänten paikalliskopio kehitystä varten: `<aanetKansio>/<id>.mp3` (lähde EI ole
 * versioitu) → `<kansio>/aanet/v<versio>/<id>.mp3` jokaiselle `kaytetytAanetIdt`-
 * joukon id:lle (aakkosjärjestyksessä). `versiot` on id → versio (numero,
 * oletus 1 puuttuvalle id:lle) — koordinaattorin lisäys 29.9.: natiivi
 * välimuistittaa äänet levylle URL:n mukaan, joten kohdepolun pitää muuttua
 * kun kyseinen äänitiedosto vaihtuu (uusintaotto), muuten vanha kopio jää
 * välimuistiin. `aanetKansio` puuttuu/null → ei kopioida mitään (paketti
 * viittaa silti `aanet/v<versio>/<id>.mp3`:ään, jonka ämpäri tarjoaa
 * julkaisussa — ks. speksin kohta 1). Puuttuva yksittäinen tiedosto →
 * `ei lähdettä` ja ohitus, ei virhe. Palauttaa taulukon manifest-kuvauksia
 * ({id, polku, sha256, tavuja}) kopioiduille tiedostoille.
 */
export function kopioiAanet(kaytetytAanetIdt, kansio, aanetKansio, versiot = {}) {
  if (!aanetKansio) return [];
  const tulokset = [];
  for (const id of [...kaytetytAanetIdt].sort()) {
    const lahdePolku = join(aanetKansio, `${id}.mp3`);
    if (!existsSync(lahdePolku)) {
      console.log(`ei lähdettä: ${lahdePolku}`);
      continue;
    }
    const versio = versiot[id] ?? 1;
    tulokset.push({ id, ...kirjoitaPakettiin(kansio, `aanet/v${versio}/${id}.mp3`, readFileSync(lahdePolku)) });
  }
  return tulokset;
}
