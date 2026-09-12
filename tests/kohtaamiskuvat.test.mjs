import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

import {
  KOHTAAMIS_R2_JUURI, KOHTAAMISKUVAT_KOHTEELLE, kohtaamiskuvaKohteelle, kohtaamiskuvaOsoite, kohtaamiskuvat,
} from '../js/kohtaamiskuvat-data.js';
import { TARINAKAARI } from '../js/packs/tarinakaari.js';
import { KAARI_PAKETIT } from '../js/tyohuone-kehitys-data.js';

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
    /*
     * Päiväkansio (12.9.2026 alkaen) on oma kenttänsä, jotta osoitteen
     * kauttaviiva ei kulje encodeURIComponentin läpi. Yksi taso, samat
     * merkit kuin tiedostonimessä — muuten osoite lakkaisi olemasta
     * ennustettava.
     */
    if (kohtaaminen.kansio !== undefined) assert.match(kohtaaminen.kansio, /^[a-z0-9-]+$/);
    const osoite = kohtaamiskuvaOsoite(kohtaaminen);
    assert.equal(osoite, kohtaaminen.kansio
      ? `${KOHTAAMIS_R2_JUURI}/${kohtaaminen.kansio}/${kohtaaminen.tiedosto}`
      : `${KOHTAAMIS_R2_JUURI}/${kohtaaminen.tiedosto}`);
  }
});

/*
 * KUVAPUTKEN 12.9.2026 PÄIVÄKANSION VIISI AKTIIVISTA RIVIÄ. Oslo,
 * Pietari ja Sarajevo odottivat ensin galleriassa, koska kuvan henkilö
 * ei ollut kaaren henkilö; omistaja vaihtoi kaanoniin uudet henkilöt
 * samana päivänä (Liv, Polina, Adnan — js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT). Tämä vartio pitää parit kiinni toisissaan: jos joku
 * palauttaisi kaaren vanhan nimen, alla oleva hahmovartio kaatuu.
 */
test('12.9.2026 päiväkansion viisi kuvaa ovat oikeissa tiloissa', () => {
  const rivit = new Map(kohtaamiskuvat
    .filter((kuva) => kuva.kansio === '20260912')
    .map((kuva) => [kuva.id, kuva]));
  assert.equal(rivit.size, 5);
  for (const [id, tila, hahmo] of [
    ['granada-ines-e4ab59a7e815', 'tarkistettu', 'Inés'],
    ['oslo-liv-992a171d5df6', 'tarkistettu', 'Liv'],
    ['pietari-polina-6188e4c488db', 'tarkistettu', 'Polina'],
    ['sarajevo-adnan-8d19fb11c377', 'tarkistettu', 'Adnan'],
    ['nikosia-marios-4ce1cb371ba3', 'tarkistettu', 'Marios'],
  ]) {
    const kuva = rivit.get(id);
    assert.ok(kuva, `toimituksen rivi ${id} puuttuu katalogista`);
    assert.equal(kuva.tila, tila);
    assert.equal(kuva.hahmo, hahmo);
    assert.equal(kuva.tiedosto, `${id}.jpg`);
  }
  for (const [kohde, id] of [
    ['granada', 'granada-ines-e4ab59a7e815'],
    ['oslo', 'oslo-liv-992a171d5df6'],
    ['pietari', 'pietari-polina-6188e4c488db'],
    ['sarajevo', 'sarajevo-adnan-8d19fb11c377'],
    ['nikosia', 'nikosia-marios-4ce1cb371ba3'],
  ]) assert.equal(kohtaamiskuvaKohteelle(kohde)?.id, id);
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
  const kaikkiKaaret = new Map(KAARI_PAKETIT.kohteet.map((kaari) => [kaari.id, kaari]));
  for (const [kohde, kuva] of KOHTAAMISKUVAT_KOHTEELLE) {
    const kaari = TARINAKAARI[kohde];
    assert.ok(kaari, `kohtaamiskuvalle ${kuva.id} ei löydy kaaren kohdetta "${kohde}"`);
    // Sama henkilö kuvassa ja repliikissä: väärään kaupunkiin osunut
    // kuva näyttäisi eri ihmisen kuin se, joka kysymyksen esittää.
    assert.ok(`${kaari.henkilo} ${kaari.nimi ?? ''}`.includes(kuva.hahmo),
      `${kuva.id}: hahmo ${kuva.hahmo} ei esiinny kohteen ${kohde} henkilökuvauksessa`);
  }
  /*
   * NIKOSIA ON AUKI MUTTA MYKKÄ (omistajan päätös 12.9.2026: *"Avaa
   * ilman ääntä (mykistettynä)"*). Kuvaputken ennakkopoikkeus poistui:
   * kaupunki on nyt TARINAKAARI-taulussa kuten muutkin, joten sen
   * kohtaamiskuva kulkee yllä olevan hahmovartion läpi eikä tarvitse
   * omaa haaraansa.
   *
   * SEN SIJAAN VARTIOIDAAN HILJAISUUTTA: kaikki kolme osaa ovat
   * mykistettyjen listalla, koska Lähi-idän luentoja ei ole generoitu
   * (omistajan linjaus 9.8.2026 *"kirjoittaa saa, ei vielä
   * generoida"*). Jos joku poistaisi mykistyksen generoimatta ääniä,
   * saapumiskortti yrittäisi soittaa tiedostoa jota ei ole.
   */
  const nikosia = kaikkiKaaret.get('nikosia');
  assert.ok(TARINAKAARI.nikosia, 'Nikosian pitää olla kaaressa, jotta Marioksen kuva näkyy');
  assert.deepEqual([...(nikosia?.mykistetyt ?? [])].sort(),
    ['aarre', 'kohtaaminen', 'saapuminen'],
    'Nikosian osien on pysyttävä mykistettyinä, kunnes luennat on generoitu');
  assert.equal(nikosia?.luennat, undefined,
    'luennat-lippua ei tarvita enää Nikosian estoon');
  /*
   * MUU LÄHI-ITÄ PYSYY KIINNI. Yhden kaupungin avaaminen ei saa vuotaa
   * koko sarjaan: muilla on yhä luennat:false, ja ne pysyvät poissa
   * TARINAKAARI-taulusta.
   */
  const muutLahiIdanKiinni = KAARI_PAKETIT.kohteet
    .filter((k) => k.lauta === 'middleeast' && k.id !== 'nikosia');
  assert.ok(muutLahiIdanKiinni.length > 0, 'Lähi-idän kohteita pitäisi olla useampi');
  for (const kaari of muutLahiIdanKiinni) {
    assert.equal(kaari.luennat, false, `${kaari.id}: Lähi-idän kohde avautui vahingossa`);
    assert.equal(TARINAKAARI[kaari.id], undefined, `${kaari.id}: päätyi kaareen ilman luentoja`);
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
  // Kaupunki ilman kuvaa jää kuvattomaksi eikä kaadu. Esimerkki vaihtui
  // 7.9.2026 Ateenasta Edinburghiin, koska Ateena sai kuvaputkesta
  // hyväksytyn kohtaamiskuvan; Edinburghin ainoa rivi on arkistossa.
  assert.equal(kohtaamiskuvaKohteelle('edinburgh'), null);
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
