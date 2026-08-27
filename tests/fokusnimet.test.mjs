/*
 * FOKUSLEHDEN NIMET — LUKEEKO SAMA NIMI KAHDESTI, JA VOIKO SITÄ
 * NAPAUTTAA?
 *
 * === MISTÄ TÄMÄ TESTI SYNTYI ===
 *
 * Omistajan pelitestihavainto Bulgarian lehdeltä 27.8.2026, kolme
 * vikaa yhdellä kaappauksella:
 *
 *   1. *"Plovdivin nimi näkyy kahteen kertaan"* — lehteen poltettu nimi
 *      ja pelin oma nimiö päällekkäin.
 *   2. *"Kyustendiliä ei voi klikata vaikka sillä on pistemerkki"* —
 *      lehteen poltettu kaupunkimerkki, jolla ei ole kohdetta
 *      lainkaan.
 *   3. *"Bulgarialainen."* — nimiö, joka on katkennut määritteeksi.
 *
 * ja niiden mukana sitova tilaus: *"tämän tyyppiset virheet olisi hyvä
 * tsekata kaikista maista joihin kohteita on rakennettu, ja kun
 * lisätään kohteita uusiin maihin niin kaikissa on tekstit ja kaikki
 * ovat klikattavia."* Tämä testi on se tarkistus.
 *
 * === MITÄ TESTI VOI NÄHDÄ JA MITÄ EI ===
 *
 * Lehdet ovat ämpärissä eivätkä repossa (ks. js/packs/fokus-grc.js),
 * joten testi ei katso yhtään pikseliä. Se katsoo LUKUJA — ja luvut
 * riittävät, koska kuvaan poltetut kaupunginnimet ovat repossa
 * FOKUS_LISANIMET-taulun peilikuvana (tools/tee-fokus-lisanimet.mjs
 * latoo taulun ämpärin `<ISO>.json`-tiedostoista). Testi vertaa siis
 * peiliä pelin omiin kohteisiin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { FOKUS_LISANIMET, FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import { nostosymLyhennaNimio } from '../js/fokusnosto-symbolit.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Sama piste laudalla — js/fokuskohteet.js KOHDE_SAMA_PISTE.
 *
 * Luku on tässä toisintona eikä tuotuna, koska js/fokuskohteet.js on
 * selaimen moduuli (canvas, kuvat, ääni) eikä lataudu Nodessa. Jos luku
 * siellä muuttuu, se on muutettava myös tähän — ja silloin tämä testi
 * on juuri se paikka, jossa muutos huomataan.
 */
const SAMA_PISTE = 3;

/** Maat, joilla on kohdepaketti: vain niillä on kartalla merkkejä. */
const KOHDEMAAT = readdirSync(join(JUURI, 'js', 'packs'))
  .filter((f) => /^fokuskohteet-[a-z]{3}\.js$/.test(f))
  .map((f) => f.slice(13, 16).toUpperCase())
  .sort();

const kohteet = {};
for (const iso of KOHDEMAAT) {
  const mod = await import(`../js/packs/fokuskohteet-${iso.toLowerCase()}.js`);
  kohteet[iso] = mod[`FOKUSKOHTEET_${iso}`] ?? [];
}

/* ==================================================================
 * POLTETUT NIMET, JOILLA EI VIELÄ OLE KOHDETTA
 *
 * Nämä ovat lehteen poltettuja kaupunginnimiä, joiden kohdalla
 * kartalla ei ole mitään napautettavaa: kuvassa on pieni rengas ja
 * nimi, mutta pelin puolella ei kohdetta. Juuri tämän omistaja huomasi
 * Kyustendilistä.
 *
 * LISTA ON VELKAKIRJA EIKÄ HYVÄKSYNTÄ. Se on tässä kahdesta syystä:
 * jotta uusi maa ei voi lipsauttaa uusia kohteettomia nimiä sisään
 * huomaamatta, ja jotta velan määrä on koneellisesti luettavissa
 * silloin kun sisältöeriä tilataan. Kun maalle kirjoitetaan kohde
 * johonkin näistä pisteistä, nimi POISTETAAN tästä listasta — testi
 * vaatii sen, koska vanhentunut poikkeus on pahempi kuin puuttuva.
 *
 * ÄLÄ LISÄÄ TÄHÄN RIVEJÄ SIKSI, ETTÄ TESTI MENISI LÄPI. Uuden maan
 * lehdellä on aina yhdeksän poltettua nimeä, eikä yhdeksää kohdetta
 * tarvitse kirjoittaa — mutta lista on silloin se paikka, josta Fable
 * näkee, mitä maasta puuttuu.
 * ================================================================== */
const KOHTEETTOMAT = {
  AFG: ['Kandahar', 'Herat', 'Mazar-i-Sharif', 'Baghlan', 'Farah', 'Jalalabad', 'Kondoz', 'Meymaneh'],
  BGR: ['Burgas', 'Ruse', 'Stara Zagora', 'Pleven', 'Kyustendil', 'Sliven'],
  BIH: ['Tuzla', 'Zenica'],
  CHN: ['Chengdu', 'Ürümqi', 'Wuhan', 'Tianjin', 'Chongqing', 'Shenyeng', 'Nanjing', 'Guiyang', 'Harbin'],
  EGY: ['Bur Said', 'Suez', 'Asyut', 'El Faiyum', 'Aswan', 'El Minya', 'Hurghada', 'El Kharga'],
  FRA: ['Lyon', 'Bordeaux', 'Le Havre', 'Lille', 'Nice', 'Toulouse', 'Strasbourg', 'Rennes', 'Limoges'],
  GBR: ['Glasgow', 'Birmingham', 'Manchester', 'Belfast', 'Leeds', 'Newcastle', 'Cardiff', 'Liverpool', 'Wick'],
  IRN: ['Mashhad', 'Ahvaz', 'Hamadan', 'Yazd', 'Bandar-e-Abbas', 'Qom', 'Kermanshah', 'Zahedan', 'Rasht'],
  IRQ: ['Basra', 'Najaf', 'Kirkuk', 'Irbil', 'As Sulaymaniyah', 'Karbala', 'An Nasiriyah', 'Al Amarah', 'Al Kut'],
  ITA: ['Catania', 'Genoa', 'Sassari', 'Salerno', 'Bari', 'Bologna'],
  JOR: ['Amman', 'Al Aqabah', 'Al Karak', 'Irbid'],
  LBY: ['Banghazi', 'Sabha', 'Misrata', 'Zuwara', 'Tmassa', 'Tubruq', 'Ajdabiya', 'Surt', 'Darnah'],
  MEX: ['Guadalajara', 'Puebla', 'Tijuana', 'Tampico', 'Chihuahua', 'Acapulco', 'Veracruz', 'Cancún', 'Tuxtla Gutiérrez'],
  ROU: ['Iași', 'Cluj-Napoca', 'Timișoara', 'Brașov', 'Craiova', 'Bacău', 'Pitești', 'Tirgu Mures'],
  SYR: ['Homs', 'Dayr az Zawr', 'Ar Raqqah', 'Tartus', 'Abu Kamal', 'As Suwayda', 'Ad Nabk', 'Al Qunaytirah'],
  TUN: ['Tunis', 'Sousse', 'Sfax', 'Gabès', 'Zarzis', 'Bizerte', 'Gafsa', 'Nabeul', 'Qasserine'],
  TUR: ['Adana', 'Samsun', 'Antalya', 'Kayseri', 'Eskişehir'],
  ZWE: ['Harare', 'Bulawayo', 'Mutare', 'Gweru', 'Kadoma', 'Hwange', 'Masvingo', 'Chinhoyi', 'Zvishavane'],
};

/** Onko kohde tässä pisteessä (sama sääntö kuin pelissä: PAIKKA, ei nimi)? */
function kohdePisteessa(iso, rivi) {
  return (kohteet[iso] ?? []).find((k) => {
    const p = k.laudat?.[FOKUS_LISANIMET[iso]?.lauta ?? 'maailmankartta'];
    return Number.isFinite(p?.x) && Number.isFinite(p?.y)
      && Math.abs(p.x - rivi.x) <= SAMA_PISTE && Math.abs(p.y - rivi.y) <= SAMA_PISTE;
  });
}

test('jokaisella kohdemaalla on lehden poltetut nimet taulussa', () => {
  for (const iso of KOHDEMAAT) {
    const tiedot = FOKUS_LISANIMET[iso];
    assert.ok(tiedot, `${iso}: FOKUS_LISANIMET-rivi puuttuu. Aja `
      + 'tools/tee-fokus-lisanimet.mjs ja liitä lohko js/packs/fokus-grc.js:ään — '
      + 'ilman sitä maan kaupunkikohteet latovat nimensä kuvaan poltetun päälle.');
    assert.ok(Array.isArray(tiedot.kaupungit) && tiedot.kaupungit.length > 0,
      `${iso}: kaupungit-lista puuttuu tai on tyhjä.`);
    assert.equal(tiedot.lauta, FOKUS_POHJAT[iso]?.lauta,
      `${iso}: lisänimien lauta ei ole sama kuin lehden.`);
  }
});

test('poltettu nimi on lehden kuvan sisällä', () => {
  for (const iso of Object.keys(FOKUS_LISANIMET)) {
    const pohja = FOKUS_POHJAT[iso];
    assert.ok(pohja, `${iso}: lisänimiä ilman lehteä.`);
    for (const r of FOKUS_LISANIMET[iso].kaupungit ?? []) {
      assert.ok(r.x >= pohja.bbox.x && r.x <= pohja.bbox.x + pohja.bbox.w
        && r.y >= pohja.bbox.y && r.y <= pohja.bbox.y + pohja.bbox.h,
      `${iso}/${r.nimi}: piste (${r.x}, ${r.y}) ei ole lehden kuvan sisällä. `
        + 'Luvut ovat koneen kirjoittamia — käsin säädetty rivi osuu väärään kohtaan.');
    }
  }
});

test('poltettu nimi on joko napautettava tai kirjattu velkakirjaan', () => {
  for (const iso of KOHDEMAAT) {
    const velka = new Set(KOHTEETTOMAT[iso] ?? []);
    for (const r of FOKUS_LISANIMET[iso]?.kaupungit ?? []) {
      const kohde = kohdePisteessa(iso, r);
      if (kohde) {
        assert.ok(!velka.has(r.nimi), `${iso}/${r.nimi}: kohde ${kohde.id} on jo `
          + 'olemassa, joten nimi on poistettava KOHTEETTOMAT-listasta.');
      } else {
        assert.ok(velka.has(r.nimi), `${iso}/${r.nimi}: lehteen on poltettu nimi ja `
          + 'kaupunkimerkki, mutta pelissä ei ole kohdetta siinä pisteessä — nimeä ei '
          + 'voi napauttaa. Kirjoita kohde tai kirjaa nimi KOHTEETTOMAT-listaan.');
      }
    }
  }
});

test('velkakirjassa ei ole vanhentuneita rivejä', () => {
  for (const [iso, nimet] of Object.entries(KOHTEETTOMAT)) {
    const tunnetut = new Set((FOKUS_LISANIMET[iso]?.kaupungit ?? []).map((r) => r.nimi));
    for (const nimi of nimet) {
      assert.ok(tunnetut.has(nimi), `${iso}/${nimi}: KOHTEETTOMAT-listassa nimi, jota `
        + 'ei ole lehteen poltettu. Lehti on ehkä renderöity uusiksi — aja '
        + 'tools/tee-fokus-lisanimet.mjs.');
    }
  }
});

test('kohteen nimiö ei katkea kartalla', () => {
  for (const iso of KOHDEMAAT) {
    for (const k of kohteet[iso]) {
      // Sama valinta kuin pelissä: js/fokuskohteet.js kohteenKarttanimi.
      const karttanimi = String(k.nimio ?? k.nimi ?? '').trim().replace(/\s+/g, ' ');
      assert.ok(karttanimi, `${iso}/${k.id}: kohteella ei ole nimeä.`);
      assert.equal(nostosymLyhennaNimio(karttanimi), karttanimi,
        `${iso}/${k.id}: nimiö katkeaa kartalla ("${karttanimi}" → `
        + `"${nostosymLyhennaNimio(karttanimi)}"). Anna kohteelle lyhyt `
        + '`nimio`-kenttä — kortin otsikko saa jäädä pitkäksi.');
    }
  }
});

test('kaksi poltettua nimeä ei ole samassa pisteessä', () => {
  /*
   * Nimiön vaiennus ja osuma-alue etsivät poltetun nimen PAIKALLA
   * (js/fokuskohteet.js nimiJoKartalla): kaksi nimeä samassa pisteessä
   * tekisi valinnasta järjestyksen varaisen. Poiminta pitää jo huolen
   * vähimmäisvälistä (aineisto.mjs `vahinVali`), joten tämä on
   * varmistin sen varalle, että lohko on ladottu kahdesti.
   */
  for (const [iso, tiedot] of Object.entries(FOKUS_LISANIMET)) {
    const rivit = tiedot.kaupungit ?? [];
    for (let i = 0; i < rivit.length; i++) {
      for (let j = i + 1; j < rivit.length; j++) {
        const a = rivit[i]; const b = rivit[j];
        assert.ok(Math.abs(a.x - b.x) > SAMA_PISTE || Math.abs(a.y - b.y) > SAMA_PISTE,
          `${iso}: ${a.nimi} ja ${b.nimi} ovat samassa pisteessä.`);
      }
    }
  }
});
