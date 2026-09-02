/*
 * HISTORIAN HETKIEN AINEISTO — H1-pilotti, 10 hetkeä.
 *
 * Hetki on sisältöä kahdessa paikassa yhtä aikaa: kartalla omana
 * kohdemerkkinään (js/historian-hetket.js) ja lehdessä omana sivunaan
 * (js/packs/kulttuuri-kategoriat.js, js/packs/maa-kategoriat.js).
 * Sama teksti ja sama kuva kahdessa tiedostossa on juuri se, mikä
 * eriytyy hiljaa: lehtisivun osoite voi jäädä vanhaksi, sen lähderivi
 * voi menettää havainnekuvamaininnan, ja hetki voi kadota lehdestä
 * kokonaan ilman että mikään kaatuu. Siksi vastaavuus tarkistetaan
 * koneellisesti.
 *
 * SIJOITUSSÄÄNTÖ ON MYÖS TESTATTAVA (omistaja 2.9.2026): kartalle
 * pääsee vain hetki, jonka tapahtumapaikka on yli 35 laudan yksikön
 * päässä JOKAISESTA kohdekaupungista — sama mitta kuin eläintäyillä
 * (tests/elaintakyt.test.mjs). Rajan alle jäävät hetket asuvat
 * pelkästään lehdessä. Kumpikin puoli tarkistetaan tässä, jotta
 * seuraava erä ei voi pudottaa merkkiä kaupungin laatan päälle.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  HETKI_KUVAJUURI, HETKI_KUVAROOLIT, HISTORIAN_HETKET, hetkenKuvaOsoite, hetkenKuvat,
} from '../js/packs/historian-hetket.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from '../js/packs/maa-kategoriat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';
import { HAVAINNEKUVA_RE } from '../js/havainnekuva.js';
import { NOSTOSYM_LUOKAT, NOSTOSYM_TYYPIT, nostosymMiniTunnus } from '../js/fokusnosto-symbolit.js';
import { KARTTAVALO_AIHEET } from '../js/karttavalot.js';

/** Karttanimiön enimmäismitta (js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_MERKKEJA). */
const NIMION_MAKSIMI = 18;

/** Etäisyys, jota lähempänä hetki latoutuu kaupungin sarakkeeseen. */
const VAHIN_ETAISYYS_KAUPUNKIIN = 35;

/** Kaupunkinostojen katon säde (js/fokuskohteet.js KAUPUNKIKATON_SADE). */
const KAUPUNKIKATON_SADE = 8;

/*
 * MINIVISAA ODOTTAVAT HETKET (2.9.2026 ilta).
 *
 * Omistajan sääntö palautti kuusi hetkeä lehdestä kartalle, ja kartan
 * hetkeen kuuluu minivisa. Visakysymykset kirjoittaa päätoimittaja
 * (docs/roolitus.md: "visakysymykset ja luennat"), joten koodierä ei
 * keksinyt niitä. Kortti toimii ilman visaa
 * (js/historian-hetket.js hetkiVisa palaa heti), ja tämä lista pitää
 * puutteen näkyvissä: kun visa saapuu, testi vaatii tunnuksen
 * poistamista listalta, joten lista tyhjenee itsestään.
 */
const VISAA_ODOTTAA = new Set([]);

const paikat = new Map(HISTORIAN_HETKET.map((h) => [
  h.id, projisoiLaudalle('maailmankartta', h.lon, h.lat),
]));

/** Lähin kohdekaupunki ja etäisyys siihen, tai null laudan ulkopuolelta. */
function lahinKaupunki(hetki) {
  const p = paikat.get(hetki.id);
  if (!p) return null;
  const { width, height } = MAAILMANKARTTA.map;
  if (p.x < 0 || p.y < 0 || p.x > width || p.y > height) return null;
  let paras = null;
  for (const kaupunki of MAAILMANKARTTA.cities) {
    const etaisyys = Math.hypot(kaupunki.x - p.x, kaupunki.y - p.y);
    if (!paras || etaisyys < paras.etaisyys) paras = { nimi: kaupunki.name, etaisyys };
  }
  return paras;
}

/** Lehtisivu, johon hetki on kirjoitettu, tai null. */
function lehtisivu(hetki) {
  const sivut = hetki.lehti.laji === 'kaupunki'
    ? KULTTUURI_KATEGORIAT[hetki.lehti.avain]
    : MAA_KATEGORIAT[hetki.lehti.avain];
  return (sivut ?? []).find((s) => s.id === `hetki-${hetki.id}`) ?? null;
}

test('hetkiä on kymmenen ja jokaisella on kortin kentät', () => {
  assert.equal(HISTORIAN_HETKET.length, 10, 'H1-pilotissa on kymmenen hetkeä');
  const tunnukset = new Set();
  for (const hetki of HISTORIAN_HETKET) {
    assert.ok(!tunnukset.has(hetki.id),
      `${hetki.id}: id on jo käytössä — minitehtäväavain hetki:<id> ei erottaisi niitä`);
    tunnukset.add(hetki.id);
    for (const kentta of ['id', 'otsikko', 'nimio', 'paivays', 'paikka', 'teksti']) {
      assert.ok(typeof hetki[kentta] === 'string' && hetki[kentta].trim(),
        `${hetki.id}: kenttä ${kentta} puuttuu tai on tyhjä`);
    }
    assert.ok(hetki.teksti.length > 300, `${hetki.id}: teksti on epäilyttävän lyhyt`);
    assert.ok(hetki.nimio.length <= NIMION_MAKSIMI,
      `${hetki.id}: nimiö "${hetki.nimio}" on yli ${NIMION_MAKSIMI} merkkiä `
      + '— kartalla se lyhennettäisiin');
    assert.match(hetki.iso, /^[A-Z]{3}$/, `${hetki.id}: iso ei ole maatunnus`);
    assert.ok(Number.isFinite(hetki.lon) && Number.isFinite(hetki.lat),
      `${hetki.id}: lon/lat puuttuu`);
    assert.equal(typeof hetki.kartalla, 'boolean', `${hetki.id}: kartalla-lippu puuttuu`);
  }
});

test('jokaisella hetkellä on vähintään yksi kuva ja roolit ovat lahi/kauko', () => {
  /*
   * KAKSI KUVAA PER HETKI (omistaja 2.9.2026): lähikuva ihmisistä ja
   * kaukokuva kohtauksesta. Ensimmäisessä erässä lista on yhden
   * mittainen — sen kuvan rooli on `kauko` — ja lähikuvan paikka jää
   * tyhjäksi ilman virhettä. Tämä testi vartioi listan muodon, ei sen
   * pituutta: kun pari saapuu, lähikuva lisätään listan kärkeen.
   */
  for (const hetki of HISTORIAN_HETKET) {
    const kuvat = hetkenKuvat(hetki);
    assert.ok(kuvat.length >= 1, `${hetki.id}: kuvalista on tyhjä`);
    assert.ok(kuvat.length <= HETKI_KUVAROOLIT.size,
      `${hetki.id}: kuvia on enemmän kuin rooleja`);
    const roolit = new Set();
    for (const kuva of kuvat) {
      assert.ok(HETKI_KUVAROOLIT.has(kuva.rooli),
        `${hetki.id}: tuntematon kuvarooli "${kuva.rooli}"`);
      assert.ok(!roolit.has(kuva.rooli),
        `${hetki.id}: rooli ${kuva.rooli} on kahdesti`);
      roolit.add(kuva.rooli);
      assert.ok(typeof kuva.kuvateksti === 'string' && kuva.kuvateksti.trim(),
        `${hetki.id}/${kuva.rooli}: kuvateksti puuttuu`);
    }
  }
});

test('kuvien osoitteet osoittavat pelin omaan ämpäriin oikealla nimikaavalla', () => {
  assert.match(HETKI_KUVAJUURI, /^https:\/\/pub-[a-z0-9]+\.r2\.dev\/kohtaamiset\/historian-hetket$/,
    'kuvajuuri ei ole pelin julkinen R2-polku');
  for (const hetki of HISTORIAN_HETKET) {
    for (const kuva of hetkenKuvat(hetki)) {
      /*
       * NIMIKAAVA: ensimmäisen erän tiedosto on `hetki-<id>.jpg` ja
       * parikuvat ovat `hetki-<id>-lahi.jpg` ja `hetki-<id>-kauko.jpg`
       * (omistajan tilaus 2.9.2026). Molemmat kelpaavat, muut eivät —
       * väärin nimetty tiedosto vastaisi ämpärissä 404:llä eikä mikään
       * kaatuisi, kortti jäisi vain kuvattomaksi.
       */
      const sallitut = new Set([
        `hetki-${hetki.id}.jpg`,
        `hetki-${hetki.id}-lahi.jpg`,
        `hetki-${hetki.id}-kauko.jpg`,
      ]);
      assert.ok(sallitut.has(kuva.tiedosto),
        `${hetki.id}: kuvan nimi "${kuva.tiedosto}" ei noudata kaavaa`);
      assert.equal(kuva.osoite, `${HETKI_KUVAJUURI}/${kuva.tiedosto}`,
        `${hetki.id}: osoite ei synny kuvajuuresta`);
      assert.equal(kuva.osoite, hetkenKuvaOsoite(kuva.tiedosto));
    }
  }
});

test('jokaisen kuvan lähderivi on havainnekuvamerkintä ja nimeää lähteensä', () => {
  for (const hetki of HISTORIAN_HETKET) {
    for (const kuva of hetkenKuvat(hetki)) {
      const nimi = `${hetki.id}/${kuva.rooli}`;
      assert.ok(typeof kuva.lahde === 'string' && kuva.lahde.trim(),
        `${nimi}: lähderivi puuttuu`);
      assert.match(kuva.lahde, HAVAINNEKUVA_RE,
        `${nimi}: lähderivi ei kerro kuvan olevan Matkakirjan havainnekuva `
        + '— silloin selitettä ei synny (js/havainnekuva.js)');
      assert.match(kuva.lahde, /en-Wikipedia "/,
        `${nimi}: lähderivi ei nimeä en-Wikipedian artikkelia`);
      assert.match(kuva.lahde, /tarkistettu \d+\.\d+\.\d{4}/,
        `${nimi}: lähderivistä puuttuu tarkistuspäivä`);
    }
  }
});

test('hetki on kartalla, ellei sitä voi piirtää lainkaan', () => {
  /*
   * SÄÄNTÖ VAIHTUI 2.9.2026 ILLALLA (omistaja, sanatarkasti): *"lisää
   * kaikki historian hetket ja muut karttanostot myös joko
   * pääkarttanäkymään tai sitten kaupunkilehden kaupunkikartalle, ellei
   * näin ole jo tehty."* Aamun sääntö oli 35 laudan yksikköä
   * kohdekaupungista: sitä lähempi hetki jäi pelkkään lehteen. Se ei
   * ollut oikea päätelmä siitä, mitä aamun sääntö sanoi — kaupungin
   * viereen osuvaa merkkiä ei tarvitse jättää pois, koska kasauspassi
   * (js/fokusniput.js) latoo sen kaupungin viereen sarakkeeseen ja
   * vetää siirtoviivan tapahtumapaikkaan, kuten kaikille muillekin
   * lähelle osuville nostoille.
   *
   * Nyt sääntö on: hetki on kartalla, ellei sitä voi piirtää lainkaan.
   * Ainoat poikkeukset ovat `kartanUlkopuolella`-lipulla merkityt, ja
   * niiden syyn tarkistaa tests/nostot-kartalla.test.mjs.
   *
   * VÄHIN_ETAISYYS_KAUPUNKIIN ei ole enää ehto vaan raja sille, milloin
   * hetki tarvitsee `kattoVapaa`-lipun: kaupunkinostojen katto pudottaa
   * kahdeksaa yksikköä lähemmät merkit, ellei lippua ole.
   */
  for (const hetki of HISTORIAN_HETKET) {
    const lahin = lahinKaupunki(hetki);
    if (!lahin) {
      assert.equal(hetki.kartalla, false,
        `${hetki.id}: piste ei osu laudalle, joten merkkiä ei voi piirtää`);
      assert.equal(hetki.kartanUlkopuolella, true,
        `${hetki.id}: lehteen jäävä hetki on merkittävä kartanUlkopuolella-lipulla`);
      continue;
    }
    if (!hetki.kartalla) {
      assert.equal(hetki.kartanUlkopuolella, true,
        `${hetki.id}: hetki on ${lahin.etaisyys.toFixed(0)} yksikön päässä `
        + `kaupungista ${lahin.nimi} eli piirrettävissä — sen kuuluu olla `
        + 'kartalla (kartalla: true) tai poikkeuksena kartanUlkopuolella');
      continue;
    }
    if (lahin.etaisyys < KAUPUNKIKATON_SADE) {
      assert.equal(hetki.kattoVapaa, true,
        `${hetki.id}: merkki on ${lahin.etaisyys.toFixed(1)} yksikön päässä `
        + `kaupungista ${lahin.nimi}, joten kaupunkinostojen katto pudottaisi `
        + 'sen ilman kattoVapaa-lippua');
    }
    assert.ok(lahin.etaisyys < VAHIN_ETAISYYS_KAUPUNKIIN || !hetki.kattoVapaa,
      `${hetki.id}: kattoVapaa on turha ${lahin.etaisyys.toFixed(0)} yksikön päässä`);
  }
});

test('kartalle merkityllä hetkellä on minivisa, muilla ei', () => {
  for (const hetki of HISTORIAN_HETKET) {
    if (!hetki.kartalla) {
      assert.equal(hetki.visa, undefined,
        `${hetki.id}: hetki ei ole kartalla, joten kortti ei aukea eikä visaa tarvita`);
      continue;
    }
    if (VISAA_ODOTTAA.has(hetki.id)) {
      assert.equal(hetki.visa, undefined,
        `${hetki.id}: visa on saapunut — poista tunnus VISAA_ODOTTAA-listalta`);
      continue;
    }
    const visa = hetki.visa;
    assert.ok(visa && typeof visa.kysymys === 'string' && visa.kysymys.trim(),
      `${hetki.id}: kortin minivisan kysymys puuttuu`);
    assert.equal(visa.vaihtoehdot.length, 3, `${hetki.id}: visassa ei ole kolmea vaihtoehtoa`);
    assert.equal(new Set(visa.vaihtoehdot).size, 3, `${hetki.id}: vaihtoehdot toistavat toisiaan`);
    assert.ok(Number.isInteger(visa.oikea) && visa.oikea >= 0 && visa.oikea <= 2,
      `${hetki.id}: visan oikea ei ole indeksi 0–2`);
  }
  // Oikea vastaus ei saa olla aina samassa kohdassa (tests/visajakauma.test.mjs).
  const indeksit = HISTORIAN_HETKET.filter((h) => h.visa).map((h) => h.visa.oikea);
  assert.ok(new Set(indeksit).size > 1 || indeksit.length < 2,
    'kartan visojen oikea vastaus on aina samassa kohdassa');
});

test('jokaisella hetkellä on oma sivu lehdessä, samalla kuvalla ja tekstillä', () => {
  for (const hetki of HISTORIAN_HETKET) {
    const nimi = `${hetki.id} (${hetki.lehti.laji}/${hetki.lehti.avain})`;
    const sivu = lehtisivu(hetki);
    assert.ok(sivu, `${nimi}: lehdestä puuttuu sivu hetki-${hetki.id}`);
    assert.ok(sivu.johdanto?.length > 40, `${nimi}: sivun johdanto puuttuu`);
    assert.ok(sivu.tehtava, `${nimi}: sivulta puuttuu minitehtävä`);
    /*
     * SIVUN NOSTOT OVAT HETKEN KUVAT SAMASSA JÄRJESTYKSESSÄ. Sivu voi
     * latoa kaikki kuvat yhteen nostoon (`galleria`) tai omiin
     * nostoihinsa; kummassakin tapauksessa osoitteiden ja lähderivien
     * on oltava täsmälleen pakan omat.
     */
    const kuvat = hetkenKuvat(hetki);
    const sivunKuvat = (sivu.nostot ?? []).flatMap((n) => [n, ...(n.galleria ?? [])]);
    assert.equal(sivunKuvat.length, kuvat.length,
      `${nimi}: lehtisivulla on ${sivunKuvat.length} kuvaa, hetkellä ${kuvat.length}`);
    sivunKuvat.forEach((n, i) => {
      assert.equal(n.osoite, kuvat[i].osoite, `${nimi}: kuvan ${i} osoite eriytyi pakasta`);
      assert.equal(n.lahde, kuvat[i].lahde, `${nimi}: kuvan ${i} lähderivi eriytyi pakasta`);
      assert.equal(n.selite, kuvat[i].kuvateksti, `${nimi}: kuvan ${i} kuvateksti eriytyi`);
    });
    assert.equal(sivu.nostot[0].teksti, hetki.teksti,
      `${nimi}: lehtisivun teksti eriytyi kortin tekstistä`);
    assert.equal(sivu.nostot[0].otsikko, hetki.otsikko,
      `${nimi}: lehtisivun otsikko eriytyi kortin otsikosta`);
  }
});

test('lehtisivun tunnus on yksikäsitteinen omassa lehdessään', () => {
  for (const [avain, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
    const idt = sivut.map((s) => s.id);
    assert.equal(new Set(idt).size, idt.length, `${avain}: kaupunkilehdessä on kaksi samaa sivu-id:tä`);
  }
  for (const [iso, sivut] of Object.entries(MAA_KATEGORIAT)) {
    const idt = sivut.map((s) => s.id);
    assert.equal(new Set(idt).size, idt.length, `${iso}: maalehdessä on kaksi samaa sivu-id:tä`);
  }
});

test('tiimalasi on symbolitaksonomiassa ja selitevalikossa', () => {
  /*
   * Uusi kategoria ilman viivamerkkiä putoaisi kartalla huutomerkiksi
   * äänettömästi (nostosymMiniTunnus), ja ilman seliteriviä pelaaja
   * näkisi kartalla merkin, jota selite ei tunne. Kumpikin on tässä
   * yhdellä kertaa.
   */
  assert.ok(NOSTOSYM_TYYPIT.has('hetki'), 'tiimalasi puuttuu symbolikirjastosta');
  assert.equal(NOSTOSYM_LUOKAT.hetki, 'Historian hetket');
  assert.equal(nostosymMiniTunnus('hetki'), 'hetki',
    'tiimalasilta puuttuu oma viivamerkki kartalla');
  const rivi = KARTTAVALO_AIHEET.find((r) => r.aihe === 'hetket');
  assert.ok(rivi, 'selitevalikosta puuttuu Historian hetket -rivi');
  assert.equal(rivi.symboli, 'hetki');
});

test('kartalle merkitty hetki projisoituu laudan sisään ja tuottaa karttarivin', async () => {
  const { hetkiKarttarivit } = await import('../js/historian-hetket.js');
  const { width, height } = MAAILMANKARTTA.map;
  for (const hetki of HISTORIAN_HETKET) {
    if (!hetki.kartalla) continue;
    const p = paikat.get(hetki.id);
    assert.ok(p, `${hetki.id}: piste ei projisoidu maailmankartalle`);
    assert.ok(p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height,
      `${hetki.id}: piste on laudan ulkopuolella (${p.x.toFixed(0)}, ${p.y.toFixed(0)})`);
    assert.ok(MAAILMANKARTTA.map.countryShapes[hetki.iso],
      `${hetki.iso}: maailmankartta ei tunne maata`);
    const rivit = hetkiKarttarivit(hetki.iso, 'maailmankartta');
    const rivi = rivit.find((r) => r.kohde.id === `hetki-${hetki.id}`);
    assert.ok(rivi, `${hetki.id}: karttariviä ei synny`);
    assert.equal(rivi.kohde.symboli, 'hetki');
    assert.equal(rivi.kohde.nimio, hetki.nimio);
  }
});
