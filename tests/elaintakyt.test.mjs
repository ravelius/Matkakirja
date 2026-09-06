/*
 * ELÄINTÄKYJEN AINEISTO — 55 maata, 59 kuvaa, 55 paikkaa kartalla
 * (Euroopan ulkopuolinen erä 5.9.2026 toi 24 uutta maata ja kuusi
 * karusellia; maailman erä M1 6.9.2026 toi Bolivian ja Kolumbian
 * KUVATTOMINA, ks. js/packs/elaintakyt.js).
 *
 * Merkin paikka on tässä pelissä sisältöä siinä missä teksti: väärään
 * kohtaan piirretty eläin väittää jotain maantieteestä. Paikkoja ei voi
 * kuitenkaan katsoa silmin joka julkaisussa, joten ne tarkistetaan
 * koneellisesti — piste on maalla, oman maansa rajojen sisällä ja irti
 * kaupunkimerkeistä.
 *
 * Sama tarkistus vartioi myös sitä, ettei kuva pääse eksymään: kortti
 * hakee kuvan verkosta vasta avatessaan (js/elaintaky.js), joten
 * puuttuva tiedosto ei kaataisi mitään — se jättäisi vain kortin
 * kuvattomaksi kenenkään huomaamatta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { ELAINTAKYT, ELAINTAKY_MAAT, elaintakynKuvat } from '../js/packs/elaintakyt.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { isOnLand } from '../js/mapart.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';
import {
  ELAINTAKY_KARUSELLIN_KYNNYS, elaintakynKarusellinKohta, elaintakynKarusellinPyyhkaisy,
} from '../js/elaintaky.js';

const JUURI = new URL('..', import.meta.url);

/**
 * ISLANTI ON RAJATESTIN POIKKEUS, JA SYY ON LAUDAN VANHASSA DATASSA.
 *
 * Maailmankartan ISL-muoto (countryShapes) on Euroopan laudan
 * tyylitellyllä paikalla (lon ≈ −7,7, lat ≈ 69,8), vaikka piirretty
 * saari ja Islanti-kaupunki ovat oikeassa paikassaan (lon ≈ −21,8).
 * Merkki noudattaa piirrettyä saarta — se on se, minkä pelaaja näkee —
 * eikä siis osu maan omaan monikulmioon. Muoto on korjattava joskus,
 * mutta se on eri työ kuin tämä.
 */
const RAJATESTIN_POIKKEUS = new Set(['ISL']);

/** Lyhin sallittu etäisyys kaupunkimerkkiin maailmankartan yksikköinä. */
const VAHIN_ETAISYYS_KAUPUNKIIN = 35;

/** Lyhin sallittu etäisyys toiseen eläintäkyyn samalla laudalla. */
const VAHIN_ETAISYYS_TAKYYN = 30;

function sisallaRenkaassa([px, py], rengas) {
  let osuu = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) osuu = !osuu;
  }
  return osuu;
}

const paikat = new Map(ELAINTAKY_MAAT.map((iso) => {
  const { lon, lat } = ELAINTAKYT[iso];
  return [iso, projisoiLaudalle('maailmankartta', lon, lat)];
}));

test('jokaisella eläintäyllä on kaanoniteksti, kuva ja paikka', () => {
  assert.equal(ELAINTAKY_MAAT.length, 73, 'eläintäkyjä on 73 maassa');
  for (const iso of ELAINTAKY_MAAT) {
    const taky = ELAINTAKYT[iso];
    assert.match(iso, /^[A-Z]{3}$/, `${iso}: avain on kolmikirjaiminen maatunnus`);
    // `kuva` ei ole enää pakollinen kenttä: kuvat voivat asua myös
    // `kuvat`-listassa (5.9.2026), ja ne tarkistetaan alempana
    // normalisoijan läpi.
    for (const kentta of ['elain', 'otsikko', 'teksti']) {
      assert.ok(typeof taky[kentta] === 'string' && taky[kentta].trim(),
        `${iso}: kenttä ${kentta} puuttuu tai on tyhjä`);
    }
    assert.ok(taky.teksti.length > 120, `${iso}: teksti on epäilyttävän lyhyt`);
    assert.ok(Number.isFinite(taky.lon) && Number.isFinite(taky.lat),
      `${iso}: lon/lat puuttuu`);
    /*
     * KUVAT LUETAAN NORMALISOIJAN LÄPI (5.9.2026): tietue kantaa joko
     * yhden kuvan entisillä kentillä tai kaksi `kuvat`-listassa, ja
     * kortti näkee molemmat samassa muodossa (js/packs/elaintakyt.js
     * elaintakynKuvat). Testi katsoo siis samaa muotoa kuin kortti.
     */
    const kuvat = elaintakynKuvat(taky);
    /*
     * NOLLA KUVAA ON SALLITTU TILA (maailman erä M1, 6.9.2026).
     * Kuvaputki tekee kuvat Fablen tilauksesta eikä integroija itse,
     * joten uusi maa voi tulla tauluun kuvattomana — kortti latoo
     * silloin tekstin ja lähteen ilman kuvakehystä (js/elaintaky.js) ja
     * normalisoija palauttaa tyhjän listan. Yläraja on yhä kaksi:
     * karuselli näyttää enintään kaksi kuvaa (omistaja 5.9.2026).
     */
    assert.ok(kuvat.length <= 2,
      `${iso}: kuvia on ${kuvat.length} — kortti kantaa enintään kaksi`);
    for (const kuva of kuvat) {
      if (kuva.url) continue; // valmis osoite ei ole repon eikä ämpärin nimeämää
      assert.match(kuva.tiedosto,
        new RegExp(`^(?:assets/elaimet/)?elain-${iso.toLowerCase()}(?:-[a-z0-9]+)?\\.jpg$|`
          + `^elain-${iso.toLowerCase()}(?:-[a-z0-9]+)?$`),
        `${iso}: kuvan nimi ${kuva.tiedosto} ei noudata kaavaa elain-<maa>[-a|-b]`);
      // Repon polku on oltava olemassa; pelkkä tunnus on ämpärissä
      // (js/media.js assetOsoite), eikä sitä voi tarkistaa tiedostona.
      if (!kuva.tiedosto.includes('/')) continue;
      assert.ok(existsSync(new URL(kuva.tiedosto, JUURI)),
        `${iso}: kuvatiedostoa ${kuva.tiedosto} ei ole — aja tools/elaintakykuvat.mjs`);
    }
    // Kaksi kuvaa on kaksi ERI kuvaa, ja kummallakin on oma kuvateksti
    // (omistajan päätös 5.9.2026) — muuten karuselli olisi sama kuva
    // kahdesti eikä pelaaja tietäisi pyyhkäisseensä.
    if (kuvat.length > 1) {
      const tunnukset = new Set(kuvat.map((k) => k.url || k.tiedosto));
      assert.equal(tunnukset.size, kuvat.length, `${iso}: sama kuva kahdesti`);
      for (const kuva of kuvat) {
        assert.ok(kuva.kuvateksti.trim(),
          `${iso}: karusellin kuvalta puuttuu oma kuvateksti`);
      }
    }
  }
});

test('maailmankartta tuntee jokaisen eläintäyn maan', () => {
  // Merkin nimilappu ja kortin kuvateksti lukevat maan nimen laudan
  // countryShapes-taulusta (js/elaintaky.js elaintakyMaanNimi). Ilman
  // riviä siellä kartalle ilmestyisi merkki maahan, jota lauta ei
  // muuten tunne. (Euroopan erillislauta poistui — Raamattu 30.8.2026 —
  // joten maailmankartta on ainoa lauta, jolla merkit piirtyvät.)
  for (const iso of ELAINTAKY_MAAT) {
    assert.ok(MAAILMANKARTTA.map.countryShapes[iso],
      `${iso}: maailmankartta ei tunne maata`);
  }
});

test('eläintäky on maalla eikä merellä', () => {
  for (const iso of ELAINTAKY_MAAT) {
    const { x, y } = paikat.get(iso);
    assert.ok(isOnLand([x, y], MAAILMANKARTTA.map),
      `${iso}: merkki jäisi veteen (${x.toFixed(0)}, ${y.toFixed(0)})`);
  }
});

test('eläintäky on oman maansa rajojen sisällä', () => {
  for (const iso of ELAINTAKY_MAAT) {
    if (RAJATESTIN_POIKKEUS.has(iso)) continue;
    const { x, y } = paikat.get(iso);
    const renkaat = MAAILMANKARTTA.map.countryShapes[iso].renkaat ?? [];
    assert.ok(renkaat.some((rengas) => sisallaRenkaassa([x, y], rengas)),
      `${iso}: merkki on maan rajojen ulkopuolella`);
  }
});

test('eläintäky ei istu kaupunkimerkin päällä eikä toisen täyn päällä', () => {
  // Kaksi merkkiä samassa pisteessä on yksi merkki (sama sääntö kuin
  // vihreällä pisteellä, js/fokuspiste.js PISTE_ERO_MIN).
  for (const iso of ELAINTAKY_MAAT) {
    const { x, y } = paikat.get(iso);
    for (const kaupunki of MAAILMANKARTTA.cities) {
      const etaisyys = Math.hypot(kaupunki.x - x, kaupunki.y - y);
      assert.ok(etaisyys >= VAHIN_ETAISYYS_KAUPUNKIIN,
        `${iso}: merkki on ${etaisyys.toFixed(0)} yksikön päässä kaupungista `
        + `${kaupunki.name} (vähintään ${VAHIN_ETAISYYS_KAUPUNKIIN})`);
    }
    for (const toinen of ELAINTAKY_MAAT) {
      if (toinen === iso) continue;
      const b = paikat.get(toinen);
      const etaisyys = Math.hypot(b.x - x, b.y - y);
      assert.ok(etaisyys >= VAHIN_ETAISYYS_TAKYYN,
        `${iso} ja ${toinen} ovat ${etaisyys.toFixed(0)} yksikön päässä toisistaan`);
    }
  }
});

/* ==================== KAKSI KUVAA SAMASTA AIHEESTA ====================
 *
 * Omistajan päätös 5.9.2026 (Raamattu, "ELAINKUVIIN TARINAA, KAKSI
 * KUVAA SAMASTA AIHEESTA"), sanatarkasti: *"samasta eläinaiheesta voi
 * olla kaksi erilaista hyväksyttyä kuvaa, ja kortilla ne näytetään
 * KARUSELLINA (kuva vaihtuu pyyhkäisyllä kuten lehden alarivin
 * karuselli, pisteet kertovat määrän, kummallakin kuvalla oma
 * kuvateksti)"*.
 *
 * Karusellin DOM elää selaimessa (tools/savukkeet/savuke-elaintaky.mjs
 * kaappaa sen), joten tässä vartioidaan se, mikä menisi rikki HILJAA:
 * tietueen normalisointi, karusellin askel- ja pyyhkäisysääntö sekä
 * se, ettei yhden kuvan kortti muutu.
 */

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
const KORTTI = lue('js/elaintaky.js');
const KORTIN_CSS = lue('css/fokusnosto.css');

test('vanha yhden kuvan tietue normalisoituu muuttumatta', () => {
  const kuvat = elaintakynKuvat({
    elain: 'norppa',
    kuva: 'assets/elaimet/elain-fin.jpg',
    lahde: 'en-Wikipedia "Saimaa ringed seal".',
    kuvaLahde: 'Matkakirjan havainnekuva',
  });
  assert.equal(kuvat.length, 1);
  assert.equal(kuvat[0].tiedosto, 'assets/elaimet/elain-fin.jpg');
  // KUVAN lähde on kuvaLahde eikä tietueen lahde (kortin TEKSTIN
  // lähde) — sama virhe korjattiin kortista 2.9.2026.
  assert.equal(kuvat[0].lahde, 'Matkakirjan havainnekuva');
  assert.equal(kuvat[0].kuvateksti, '', 'ilman omaa kuvatekstiä kortti latoo vakioselitteen');
});

test('kuvan lähde ei koskaan valu tekstin lähteestä', () => {
  const kuvat = elaintakynKuvat({ kuva: 'elain-fin', lahde: 'en-Wikipedia "Saimaa ringed seal".' });
  assert.equal(kuvat[0].lahde, '', 'tekstin lähde ei ole kuvan lähde');
});

test('kuvat-lista luetaan järjestyksessä, ensimmäinen ensisijaisena', () => {
  const kuvat = elaintakynKuvat({
    kuva: 'assets/elaimet/elain-fin.jpg',
    kuvat: [
      { tiedosto: 'elain-fin-a', kuvateksti: 'Kevätjäällä', lahde: 'Matkakirjan havainnekuva' },
      { tiedosto: 'elain-fin-b', kuvateksti: 'Kolopesän suulla', lahde: 'Matkakirjan havainnekuva' },
    ],
  });
  assert.equal(kuvat.length, 2);
  assert.deepEqual(kuvat.map((k) => k.tiedosto), ['elain-fin-a', 'elain-fin-b']);
  assert.deepEqual(kuvat.map((k) => k.kuvateksti), ['Kevätjäällä', 'Kolopesän suulla']);
  // Lista voittaa vanhan kentän: kaksoiskirjaus ei saa tuottaa kolmea kuvaa.
  assert.ok(!kuvat.some((k) => k.tiedosto.includes('/')), 'vanha kuva-kenttä jäi listan varjoon');
});

test('valmis osoite ja puuttuva kuva käyttäytyvät oikein', () => {
  const [kuva] = elaintakynKuvat({ kuvat: [{ url: 'https://esimerkki/elain.jpg' }] });
  assert.equal(kuva.url, 'https://esimerkki/elain.jpg');
  assert.deepEqual(elaintakynKuvat({}), [], 'kuvaton tietue ei keksi tiedostoa');
  assert.deepEqual(elaintakynKuvat(null), []);
  assert.deepEqual(elaintakynKuvat({ kuvat: [] }), [], 'tyhjä lista palaa vanhoihin kenttiin');
});

test('karusellin askel pysähtyy päihin eikä kierrä', () => {
  assert.equal(elaintakynKarusellinKohta(0, 1, 2), 1);
  assert.equal(elaintakynKarusellinKohta(1, 1, 2), 1, 'viimeisestä ei hypätä alkuun');
  assert.equal(elaintakynKarusellinKohta(0, -1, 2), 0, 'ensimmäisestä ei hypätä loppuun');
  assert.equal(elaintakynKarusellinKohta(0, 1, 1), 0, 'yksi kuva pysyy paikallaan');
  assert.equal(elaintakynKarusellinKohta(5, -1, 2), 1, 'liian iso lähtökohta rajautuu');
  assert.equal(elaintakynKarusellinKohta(0, 1, 0), 0);
});

test('pyyhkäisy vaatii kynnyksen ja tulkitsee suunnan oikein', () => {
  assert.equal(ELAINTAKY_KARUSELLIN_KYNNYS, 30);
  assert.equal(elaintakynKarusellinPyyhkaisy(-40), 1, 'veto vasemmalle vie seuraavaan');
  assert.equal(elaintakynKarusellinPyyhkaisy(40), -1, 'veto oikealle vie edelliseen');
  assert.equal(elaintakynKarusellinPyyhkaisy(-29), 0, 'kynnyksen alle jäävä veto ei siirrä');
  assert.equal(elaintakynKarusellinPyyhkaisy(29), 0);
  assert.equal(elaintakynKarusellinPyyhkaisy(NaN), 0);
});

test('kortti tekee karusellin vain useammasta kuvasta', () => {
  assert.match(KORTTI, /if \(kuvat\.length > 1\) \{ elaintakyPiirraKaruselli\(/,
    'kaksi kuvaa menee karuselliin');
  // Yhden kuvan polku on entinen: sama kehys, sama nappi, sama
  // vakiolähderivi (tests/havainnekuva.test.mjs vartioi jälkimmäistä).
  assert.match(KORTTI, /const kehys = html\('figure', 'fokusnosto-kuva elaintaky-kuva'\)/);
  /*
   * YKSIKIN KUVA TULEE NORMALISOIJASTA (5.9.2026): kortti luki ennen
   * suoraan `taky.kuva` ja `taky.kuvaLahde`, jolloin yhden kuvan
   * `kuvat`-lista olisi jäänyt näkymättä — kuvaputken toimitus antaa
   * yhdelle kuvalle valmiin osoitteen ja oman kuvatekstin. Vanha tietue
   * kulkee saman normalisoijan läpi muuttumattomana, joten vakiorivi on
   * yhä sama; lauseke on nyt sama kuin karusellilla.
   */
  assert.match(KORTTI, /const elainkuva = assetOsoite\('elaimet', kuva\.url \|\| kuva\.tiedosto\)/);
  assert.match(KORTTI, /kuva\.lahde \|\| 'Matkakirjan havainnekuva', kuva\)\);/);
  // Kuvateksti ja lähderivi ovat kuvan omat ja vaihtuvat sen mukana.
  assert.match(KORTTI, /selite\.textContent = selitteet\[kohdalla\]/);
  assert.match(KORTTI, /taytaLahderivi\(lahde, kuva\.lahde \|\| 'Matkakirjan havainnekuva', kuva\)/);
  // Suurennos näyttää NYKYISEN kuvan eikä aina ensimmäistä.
  assert.match(KORTTI, /osoite: osoitteet\[kohdalla\], selite: selitteet\[kohdalla\]/);
  // Pyyhkäisy kosketuksella ja hiirellä: yksi osoitinele, ei kahta polkua.
  for (const tapahtuma of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel']) {
    assert.ok(KORTTI.includes(`ikkuna.addEventListener('${tapahtuma}'`),
      `karusellilta puuttuu ${tapahtuma}`);
  }
});

test('karusellin tyylit ovat kortin omassa tiedostossa, liike 250 ms ja hiljennettävissä', () => {
  for (const valitsin of [
    '.elaintaky-karuselli', '.elaintaky-karuselli-ikkuna', '.elaintaky-karuselli-raita',
    '.elaintaky-karuselli-ruutu', '.elaintaky-karuselli-piste',
    '.elaintaky-karuselli-pisteet',
  ]) {
    assert.ok(KORTIN_CSS.includes(valitsin), `${valitsin} puuttuu tyyleistä`);
  }
  const ikkuna = KORTIN_CSS.match(/\.elaintaky-karuselli-ikkuna \{[^}]*\}/)[0];
  assert.match(ikkuna, /overflow: hidden/);
  assert.match(ikkuna, /aspect-ratio: 3 \/ 2/, 'kuvat ovat 960 x 640');
  assert.match(ikkuna, /touch-action: pan-y/, 'pystyvieritys jää kortille');
  const raita = KORTIN_CSS.match(/\.elaintaky-karuselli-raita \{[^}]*\}/)[0];
  assert.match(raita, /transition: transform 250ms cubic-bezier/, 'liuku on 250 ms ja pehmeä');
  assert.match(KORTIN_CSS, /\.elaintaky-karuselli-teksti\.vaihtui \{ animation: [^;]*250ms/);
  // Sormen alla raita seuraa liikettä ilman siirtymää.
  assert.match(KORTIN_CSS, /\.elaintaky-karuselli-raita\.raahataan \{ transition: none; \}/);
  // Reduced motion: ei liukua eikä kuvatekstin häivytystä.
  const hiljainen = KORTIN_CSS.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/g)
    .find((lohko) => lohko.includes('.elaintaky-karuselli-raita'));
  assert.ok(hiljainen, 'karusellia ei hiljennetä reduced motionilla');
  assert.match(hiljainen, /\.elaintaky-karuselli-teksti\.vaihtui \{ animation: none; \}/);
});
