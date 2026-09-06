import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

import {
  KOHTAAMIS_R2_JUURI, KOHTAAMISKUVAT_KOHTEELLE, kohtaamiskuvaKohteelle, kohtaamiskuvat,
} from '../js/kohtaamiskuvat-data.js';
import { TARINAKAARI } from '../js/packs/tarinakaari.js';

test('kohtaamiskuvagalleria käyttää vain R2-mediaa', async () => {
  assert.match(KOHTAAMIS_R2_JUURI, /^https:\/\/(?:media\.matkakirja\.app|[^/]+\.r2\.dev)\/kohtaamiset$/);
  for (const kohtaaminen of kohtaamiskuvat) {
    /*
     * Pelkkä tiedostonimi, ei polkua eikä isoja kirjaimia — osoite
     * syntyy aina KOHTAAMIS_R2_JUURI + '/' + tiedosto. Vanhat kuvat
     * ovat kasvo-alkuisia, 4.9.2026 alkaen kuvaputken erät nimeävät
     * tiedoston suoraan kaupungin ja hahmon mukaan.
     */
    assert.match(kohtaaminen.tiedosto, /^[a-z0-9-]+\.jpg$/);
    await assert.rejects(stat(new URL(`../${kohtaaminen.tiedosto}`, import.meta.url)));
  }
});

test('jokaisella kohtaamiskuvalla on kaupungin lisäksi tilanteen kuvateksti', () => {
  assert.ok(kohtaamiskuvat.length > 0);
  for (const kohtaaminen of kohtaamiskuvat) {
    assert.ok(kohtaaminen.kaupunki);
    assert.ok(kohtaaminen.maa);
    assert.ok(kohtaaminen.hahmo);
    assert.ok(kohtaaminen.kuvateksti.length >= 60);
    assert.ok(kohtaaminen.hetki.length >= 40);
    assert.ok(kohtaaminen.vihje.length >= 40);
  }
});

test('galleriasivu kytkee katalogin ja R2-virheen varanäkymän', async () => {
  const [html, selainkoodi] = await Promise.all([
    readFile(new URL('../kohtaamiskuvat.html', import.meta.url), 'utf8'),
    readFile(new URL('../js/kohtaamiskuvat.js', import.meta.url), 'utf8'),
  ]);
  assert.match(html, /id="galleria"/);
  assert.match(html, /js\/kohtaamiskuvat\.js/);
  // Osoite rakennetaan katalogin omalla apurilla, ei galleriasivun
  // omalla polkuliimalla — peli ja galleria hakevat samasta paikasta.
  assert.match(selainkoodi, /kohtaamiskuvaOsoite/);
  assert.match(selainkoodi, /addEventListener\('error'/);
});

/*
 * KUVAN KYTKENTÄ PELIIN (omistajan tilaus 1.9.2026): kohtaamiskortti
 * hakee kuvansa kaupunkitunnuksella. Avain johdetaan `kaupunki`-
 * kentästä, joten kirjoitusvirhe tai kaupunki jota kaari ei tunne
 * jättäisi kuvan hiljaa pois ruudulta — se kaatuu tässä.
 */
test('jokainen kohtaamiskuva osuu tarinakaaren kohteeseen ja sen hahmoon', () => {
  for (const [kohde, kuva] of KOHTAAMISKUVAT_KOHTEELLE) {
    const kaari = TARINAKAARI[kohde];
    assert.ok(kaari, `kohtaamiskuvalle ${kuva.id} ei löydy kaaren kohdetta "${kohde}"`);
    // Sama henkilö kuvassa ja repliikissä: väärään kaupunkiin osunut
    // kuva näyttäisi eri ihmisen kuin se, joka kysymyksen esittää.
    assert.ok(`${kaari.henkilo} ${kaari.nimi ?? ''}`.includes(kuva.hahmo),
      `${kuva.id}: hahmo ${kuva.hahmo} ei esiinny kohteen ${kohde} henkilökuvauksessa`);
  }
});

test('vain tarkistettu aktiivinen kuva päätyy peliin, muut jäävät galleriaan', () => {
  for (const kuva of kohtaamiskuvat) {
    const peliin = kohtaamiskuvaKohteelle(kuva.kohde ?? kuva.kaupunki);
    if (kuva.tila === 'tarkistettu' && kuva.aktiivinen !== false) {
      assert.equal(peliin?.id, kuva.id);
      assert.ok(peliin.osoite.startsWith(`${KOHTAAMIS_R2_JUURI}/`));
      assert.ok(peliin.alt && peliin.kuvateksti, `${kuva.id}: alt tai kuvateksti puuttuu`);
    } else {
      assert.notEqual(peliin?.id, kuva.id, `${kuva.id}: tila ${kuva.tila} ei saa näkyä pelissä`);
    }
  }
  // Kaupunki ilman kuvaa jää kuvattomaksi eikä kaadu.
  assert.equal(kohtaamiskuvaKohteelle('ateena'), null);
  assert.equal(kohtaamiskuvaKohteelle(undefined), null);
});

/*
 * KORTIN RAKENNE: kuva, sen alle kuvateksti lähderiveineen ja vasta
 * niiden jälkeen hahmon tervehdys. Yksikkötesti ei näe asettelua,
 * mutta se näkee järjestyksen ja sen, että kuvaton kortti piiloutuu
 * kokonaan (ei tyhjää aukkoa).
 */
test('kohtaamiskortilla kuva on tervehdyksen yläpuolella ja kuvateksti kuvan alla', async () => {
  const [html, visa, ui] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../js/visa.js', import.meta.url), 'utf8'),
    readFile(new URL('../js/ui.js', import.meta.url), 'utf8'),
  ]);
  const kuvio = html.indexOf('id="quiz-kohtaaminen-kuvio"');
  const kuva = html.indexOf('id="quiz-kohtaaminen-kuva"');
  const selite = html.indexOf('id="quiz-kohtaaminen-selite"');
  const tervehdys = html.indexOf('id="quiz-kohtaaminen"');
  assert.ok(kuvio > 0 && kuva > kuvio && selite > kuva && tervehdys > selite,
    'kuvion, kuvan, kuvatekstin ja tervehdyksen järjestys kortilla on väärä');
  assert.match(html, /class="kuvalahde">Matkakirjan kuvitus</);
  // Kuvaton kohtaaminen ja kaksintaistelu piilottavat koko kuvion.
  assert.match(visa, /ui\.naytaKohtaamiskuva\(null\)/);
  assert.match(ui, /naytaKohtaamiskuva\(tiedot\) \{/);
});
