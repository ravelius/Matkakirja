/*
 * POLTTOVELKA NOLLAAN: POLTTOKETJU AJAA MERKIT MERKKIPORTIN LÄPI.
 *
 * Erä v1867 antoi elävälle kerrokselle pääkartan merkkirajan
 * (js/pallolauta/nostot.js `merkkiPortti`): uloimmalla zoomilla piirtyy
 * enintään PAAKARTAN_MERKKIKATTO tärkeintä merkkiä maata kohti ja
 * `lahi: true` -kohteet eivät lainkaan. Polttoketju (tools/fokuskartta/
 * nostot.mjs) EI tuntenut porttia, ja siitä jäi POLTTOVELKA:
 * docs/raportit/viesti-fable-merkkirajat-20260914.md luku 7 mittasi
 * seitsemän maata, joiden laatoissa on mustetta, jota kerros ei voi
 * piilottaa — *"raja näkyy tänään vain Espanjassa"*.
 *
 * Tämä testi vartioi luvun 7 askelta 1: sama portti, sama järjestys ja
 * sama katto molemmissa päissä. Neljä väitettä:
 *
 *   1. yksikään maa ei polta yli katon merkkiä;
 *   2. portin läpi päässeet ovat TÄSMÄLLEEN ne, jotka elävä kerros
 *      päästäisi uloimmalla zoomilla (sama funktio, ei omaa kopiota);
 *   3. `lahi: true` ei koskaan pala;
 *   4. LADONTA EI MUUTU: portti karsii vasta valmiista ladonnasta,
 *      joten jokaisen poltetun merkin paikka ja tiiviste ovat samat
 *      kuin ennen porttia (Raamattu: yksi ladonta, yksi lähde).
 *
 * NELJÄ VÄITETTÄ KOSKEVAT MAAILMANLAAJUISTA AJOA (ilman `--nostomaa`).
 * Kun nostotaso poltetaan MAITTAIN (Raamattu PAATOKSET 34 kohta 17 d),
 * sääntö on toinen — portti ajetaan kohdemaan asetuksella — ja sillä on
 * omat väitteensä tiedoston lopussa ("maakohtaisessa ajossa…").
 *
 * Testi ei käytä selainta, verkkoa eikä laattoja: ladonta on puhdas
 * funktio laudan datasta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import { keraaNostot } from '../tools/fokuskartta/nostot.mjs';
import { maanKohdemerkit } from '../js/fokuskohteet.js';
import {
  KAUPUNKIMERKIN_KERROIN, PAAKARTAN_MERKKIKATTO, merkinKerroin, merkkiPortti,
} from '../js/pallolauta/nostot.js';

const pack = packById('maailmankartta');
const { merkit, luettelo, tilasto } = keraaNostot(pack);

/** Maan poltettavat nostot (eläintäyt ovat oma perheensä, ks. nostot.mjs). */
const maittain = new Map();
for (const m of merkit) {
  if (m.perhe !== 'nosto') continue;
  if (!maittain.has(m.iso)) maittain.set(m.iso, []);
  maittain.get(m.iso).push(m);
}

test('yksikään maa ei polta yli pääkartan merkkikaton', () => {
  const yli = [];
  for (const [iso, ms] of maittain) {
    const poltettavia = ms.filter((m) => m.poltettava).length;
    if (poltettavia > PAAKARTAN_MERKKIKATTO) yli.push(`${iso} ${poltettavia}`);
  }
  assert.deepEqual(yli, [], `yli katon ${PAAKARTAN_MERKKIKATTO}: ${yli.join(', ')}`);
  // Vartio toiseen suuntaan: maita on tarpeeksi, jotta väite mittaa jotain.
  assert.ok(maittain.size > 100, `maita ${maittain.size}`);
});

test('poltettavat ovat täsmälleen ne, jotka elävä portti päästäisi', () => {
  /*
   * ELÄVÄ PÄÄ, EI POLTTOKETJUN OMA: rivit haetaan pelin omalta
   * funktiolta (js/fokuskohteet.js `maanKohdemerkit`) ja ajetaan
   * portin läpi täsmälleen kuten js/pallolauta/nostot.js `keraa`
   * uloimmalla zoomilla. Jos polttoketju ja kerros ajautuvat eri
   * vastauksiin, tämä väite kaatuu.
   */
  let karsittuja = 0;
  /** Maittain karsitut, jotta luvun muutos kertoo MISTÄ se tuli. */
  const perMaa = {};
  for (const [iso, ms] of maittain) {
    const pohja = FOKUS_POHJAT[iso];
    const elavat = maanKohdemerkit(pack, iso, pohja, () => false);
    const portti = merkkiPortti(elavat, false, (m) => m.kohde ?? null);
    const paastetyt = new Set(portti.merkit.map((m) => m.id));
    for (const m of ms) {
      /*
       * Täkyestetyssä maassa ja monen maan tunnuksella EI polteta
       * mitään muistakaan syistä (ks. nostot.mjs) — portti on tässä
       * VÄLTTÄMÄTÖN muttei riittävä ehto.
       */
      if (m.poltettava) {
        assert.ok(paastetyt.has(m.tunnus),
          `${iso}/${m.tunnus} palaa, vaikka elävä portti piilottaisi sen`);
      } else if (!paastetyt.has(m.tunnus)) {
        karsittuja += 1;
        perMaa[iso] = (perMaa[iso] ?? 0) + 1;
      }
    }
  }
  assert.ok(karsittuja >= 30, `portti karsii ${karsittuja} merkkiä (odotettu ≥ 30)`);
  /*
   * VÄITE ON KAHDEN RIIPPUMATTOMAN MITTAUKSEN YHTÄPITÄVYYS, EI LUKU.
   * `karsittuja` lasketaan yllä ELÄVÄSTÄ päästä (js/fokuskohteet.js
   * maanKohdemerkit + js/pallolauta/nostot.js merkkiPortti) ja
   * `tilasto.porttiPiiloon` polttoketjun omasta kirjanpidosta
   * (tools/fokuskartta/nostot.mjs). Jos päät ajautuvat eri sääntöön,
   * luvut eroavat — ja juuri se on se regressio, jota tämä testi
   * vartioi. Tämä ehto ei vanhene sisällön kasvaessa.
   */
  assert.equal(tilasto.porttiPiiloon, karsittuja,
    `polttoketju piilottaa ${tilasto.porttiPiiloon}, elävä portti ${karsittuja} `
    + `(maittain ${JSON.stringify(perMaa)}) — päät ajautuivat eri sääntöön`);
  /*
   * KIINTEÄ LUKU 32 EI OLLUT VÄITE VAAN PÄIVÄMÄÄRÄ, ja siksi se
   * poistettiin. Mitattu 14.9.2026 kaksi lukemaa:
   *
   *   ilman Ranskan sisältöpilottia  32 (GRC 12, TUR 8, DEU 7, HRV 2,
   *                                      ITA 1, RUS 1, ESP 1)
   *   pilotin kanssa                 73 (edelliset + FRA 41)
   *
   * Ranskan 41 on mitattu ja sisällön kasvua, ei sääntöjen eroa: maan
   * merkit nousivat 20 → 62 (maalehden 18 nostoa, kohdekartalta
   * lähizoomiin palanneet 17 ja 7 näkyvää kaupunkia), ja 62 − 21 = 41
   * jää katon ulkopuolelle MOLEMMISSA päissä. Polttovelka on yhä nolla.
   *
   * Maakohtainen jakauma kulkee virheviestissä (`perMaa`), jotta luvun
   * muutos kertoo heti MISTÄ se tuli — mutta se ei ole väite, koska
   * sisällön kasvu ei ole vika.
   */
});

test('lähizoomin kohde (lahi: true) ei pala koskaan', () => {
  /*
   * KAKSI MITTAUSTA: TEKOSYÖTE JA AITO AINEISTO.
   *
   * Tekosyöte pitää säännön kirjattuna silloinkin, kun aineistossa ei
   * ole yhtään `lahi`-kohdetta (niin oli 14.9.2026 aamulla).
   *
   * AITO SILMUKKA KORJATTIIN 14.9.2026 (#2447): se luki lippua
   * POLTTOKETJUN merkiltä (`m.kohde?.lahi`), mutta sen merkkioliossa
   * EI OLE `kohde`-kenttää lainkaan (kentät: tunnus, x, y, ankkuriX,
   * ankkuriY, symboli, laji, nimio, … poltettava, tiiviste, perhe,
   * iso, s). Ehto oli siis aina epätosi ja väite tyhjä. Lippu luetaan
   * nyt ELÄVÄLTÄ puolelta, jossa se asuu — ja aineistossa on
   * mitattuna 35 `lahi`-merkkiä (FRA), joten väite mittaa oikeasti.
   */
  const koe = [
    { id: 'a', kohde: { tyyppi: 'kaupunki' } },
    { id: 'b', kohde: { lahi: true } },
    { id: 'c', kohde: {} },
  ];
  const portti = merkkiPortti(koe, false, (m) => m.kohde);
  assert.deepEqual(portti.merkit.map((m) => m.id), ['a', 'c']);
  assert.deepEqual(portti.piiloon, ['b']);
  assert.deepEqual(merkkiPortti(koe, true, (m) => m.kohde).merkit.map((m) => m.id),
    ['a', 'b', 'c'], 'lähizoomilla kaikki');

  let lahiMerkkeja = 0;
  for (const [iso, ms] of maittain) {
    const poltettavat = new Map(ms.map((m) => [m.tunnus, m.poltettava]));
    for (const m of maanKohdemerkit(pack, iso, FOKUS_POHJAT[iso], () => false)) {
      if (!m.kohde?.lahi) continue;
      lahiMerkkeja += 1;
      assert.notEqual(poltettavat.get(m.id), true,
        `${iso}/${m.id} on lahi-kohde mutta palaa`);
    }
  }
  // Mitattu 14.9.2026 (#2447): FRA 35 — 18 maalehden nostoa `lahi: true`
  // datassa ja 17 kohdekartalta lähizoomiin palannutta.
  assert.ok(lahiMerkkeja >= 35,
    `aidossa aineistossa on ${lahiMerkkeja} lahi-merkkiä (odotettu ≥ 35) — `
    + 'jos luku on 0, silmukka on taas tyhjä väite');
});

test('kohdemaassa katto ei pidätä mitään — muualla pidättää', () => {
  /*
   * KATTO EI KOSKE KOHDEMAATA (omistaja 15.9.2026, Raamattu
   * KARTTAUUDISTUKSEN PAATOKSET 25: *"Kohdemaalle ei kattoa"*).
   * Elävä kerros antaa portille `kohdemaa: true`, koska se kerää
   * merkit vain korostetusta maasta; polttoketju ja savukkeet
   * kysyvät samaa porttia ilman lippua ja saavat katon entisellään.
   *
   * VÄITE MITATAAN AIDOLLA AINEISTOLLA JA VASTAKOKEELLA: Ranska on
   * ainoa maa, jossa merkkejä on yli katon kaksinkertaisesti (62),
   * joten juuri siinä ero näkyy — ilman lippua läpi menee katollinen
   * ja lipun kanssa kaikki.
   */
  const koe = [
    { id: 'a', kohde: { tyyppi: 'kaupunki' } },
    { id: 'b', kohde: { lahi: true } },
    { id: 'c', kohde: {} },
  ];
  assert.deepEqual(
    merkkiPortti(koe, false, (m) => m.kohde, { kohdemaa: true }).merkit.map((m) => m.id),
    ['a', 'b', 'c'], 'kohdemaassa myös lahi-merkki piirtyy saapumisnäkymässä');

  const elavat = maanKohdemerkit(pack, 'FRA', FOKUS_POHJAT.FRA, () => false);
  const kohdemaa = merkkiPortti(elavat, false, (m) => m.kohde ?? null, { kohdemaa: true });
  const muu = merkkiPortti(elavat, false, (m) => m.kohde ?? null);
  assert.ok(elavat.length >= 62, `FRA merkkejä ${elavat.length} (odotettu ≥ 62)`);
  assert.equal(kohdemaa.merkit.length, elavat.length,
    `kohdemaassa piirtyy ${kohdemaa.merkit.length} / ${elavat.length}`);
  assert.equal(kohdemaa.piiloon.length, 0);
  // VASTAKOE: sama aineisto ilman lippua jää katon alle — jos tämä
  // menisi myös läpi, ylempi väite ei mittaisi mitään.
  assert.ok(muu.piiloon.length > 0, 'ilman lippua mitään ei jäänyt piiloon');
  assert.ok(muu.merkit.length - muu.polttovelka.length <= PAAKARTAN_MERKKIKATTO,
    `ilman lippua läpi ${muu.merkit.length - muu.polttovelka.length}`);
});

test('kaupunkimerkin nimiö on isompi kuin noston — ja vain elävänä', () => {
  /*
   * PAATOKSET 25 kohta 2 (*"Isommaksi, n. 11-12 px"*). Kerroin on
   * merkin mitta, koska nimiö ja symboli ovat samassa rasterissa
   * (js/pallolauta/nostot.js KAUPUNKIMERKIN NIMIÖ ON ISOMPI KUIN
   * NOSTON). Poltettu kaupunkimerkki EI kasva: laatassa oleva muste
   * on 8,5 px:n nimiöllä, eikä osumapinta saa irrota musteesta.
   */
  const koko = KAUPUNKIMERKIN_KERROIN * 8.5;
  assert.ok(koko >= 11 && koko <= 12, `lisäkaupungin nimiö ${koko} px`);
  assert.equal(merkinKerroin({ kaupunki: true }), KAUPUNKIMERKIN_KERROIN);
  assert.equal(merkinKerroin({ kaupunki: true, poltettu: true }), 1);
  assert.equal(merkinKerroin({}), 1);
  assert.equal(merkinKerroin(null), 1);
});

/*
 * MAAKOHTAINEN LAATASTO: PORTTI AJETAAN KOHDEMAAN ASETUKSELLA
 * (Fablen mittaus 18.9.2026 klo 19.30, Raamattu PAATOKSET 34 kohta
 * 17 d). Yllä olevat väitteet mittaavat MAAILMANLAAJUISTA ajoa, jossa
 * naapurin muste on samassa kuvassa ja katto 21 on yhä oikein. Kun
 * nostotaso poltetaan maittain (`--nostomaa <ISO>`), peli lataa
 * laataston VAIN kohdemaalle — ja silloin polttoketjun on ajettava
 * sama portti samalla `{ kohdemaa: true }` -asetuksella kuin elävä
 * kerros (js/pallolauta/nostot.js `keraa`, "KOHDEMAA-LIPPU").
 *
 * VANHA TILA, MITATTU: Ranskasta paloi 12 nostomerkkiä 89:stä, koska
 * katto 21 ja `lahi: true` pitivät maastokohteet ja hahmotelman 27
 * uutta kohdetta elävinä — ja pallon elävien katto (NOSTOJEN_KATTO 40)
 * pudotti niistä osan kokonaan ruudulta.
 */
const maakohtainen = keraaNostot(pack, { maittain: true });

test('maakohtaisessa ajossa katto ei pidätä mitään', () => {
  /*
   * VÄITE ON PORTIN PÄÄTÖS, EI LUKU: maakohtaisessa ajossa portti ei
   * saa jättää yhtäkään merkkiä piiloon, koska katto ja `lahi` eivät
   * koske kohdemaata. `porttiPiiloon` on polttoketjun oma kirjanpito.
   */
  assert.equal(maakohtainen.tilasto.porttiPiiloon, 0,
    `maakohtainen ajo piilotti ${maakohtainen.tilasto.porttiPiiloon} merkkiä portin taakse`);
  assert.deepEqual(maakohtainen.tilasto.porttiMaat, []);
  // Vastakoe: maailmanlaajuinen ajo pidättää yhä (sama aineisto).
  assert.ok(tilasto.porttiPiiloon > 0,
    'maailmanlaajuinen ajo ei pidättänyt mitään — väite ei mittaa eroa');
});

test('maakohtaisessa ajossa Ranskan kaupungin ulkopuoliset palavat', () => {
  /*
   * ELÄVÄKSI SAA JÄÄDÄ VAIN KOLMESTA SYYSTÄ (PAATOKSET 33 TARKENNUS 2
   * FABLEN RAJAUS a ja b): kaupunkipiste, kaupungin sisäinen nosto tai
   * lukitun maan puuttuva ankkuri. Portti ei ole enää syy.
   */
  const fra = maakohtainen.merkit.filter((m) => m.iso === 'FRA' && m.perhe === 'nosto');
  const palaa = fra.filter((m) => m.poltettava);
  assert.ok(fra.length >= 89, `FRA merkkejä ${fra.length} (odotettu ≥ 89)`);
  assert.ok(palaa.length >= 55,
    `FRA palaa ${palaa.length} / ${fra.length} (odotettu ≥ 55; vanha sääntö antoi 12)`);
  /*
   * HAHMOTELMAN KOHTEET OVAT SE, MITÄ OMISTAJA EI NÄHNYT: 12 uutta
   * varastokohdetta ja niiden ankkurit tulivat laudalle v1945:ssä,
   * eivätkä palaneet kertaakaan vanhalla säännöllä.
   */
  const hahmotelmia = palaa.filter((m) => m.tunnus.startsWith('hahmotelma-')).length;
  assert.ok(hahmotelmia >= 25,
    `hahmotelman kohteita palaa ${hahmotelmia} (odotettu ≥ 25)`);
  /*
   * MONEN MAAN MERKKI PALAA MAAKOHTAISEEN LAATASTOON. Laatastot eivät
   * enää sekoitu, ja tiivisteluettelo on maakohtainen, joten Välimeri
   * ja Biskajanlahti palavat Ranskan omalla mittatikulla.
   */
  for (const tunnus of ['valimeri', 'biskajanlahti', 'montblanc']) {
    assert.ok(palaa.some((m) => m.tunnus === tunnus), `${tunnus} ei pala Ranskaan`);
  }
  assert.equal(maakohtainen.tilasto.monimaisia, 0,
    'maakohtaisessa ajossa monen maan merkkiä ei jätetä eläväksi');
  // Vastakoe: maailmanlaajuisessa ajossa sama merkki jää eläväksi.
  assert.ok(tilasto.monimaisia > 0, 'maailmanlaajuinen ajo ei karsinut monimaisia');
});

test('kaupunkipiste ja kaupungin sisäinen jäävät eläviksi myös maittain', () => {
  const fra = maakohtainen.merkit.filter((m) => m.iso === 'FRA' && m.perhe === 'nosto');
  const elava = new Set(fra.filter((m) => !m.poltettava).map((m) => m.tunnus));
  for (const tunnus of ['nakyva-kaupunki-lyon', 'nakyva-kaupunki-strasbourg']) {
    assert.ok(elava.has(tunnus), `${tunnus} palaa, vaikka kaupunkipiste jää eläväksi`);
  }
  // Pariisin sisäiset (PAATOKSET 34 kohdat 2-3): liuskan kategorioissa.
  for (const tunnus of ['bastilji', 'tuileries', 'nosto-pariisin-patonki']) {
    assert.ok(elava.has(tunnus), `${tunnus} palaa, vaikka on Pariisin sisäinen`);
  }
  assert.ok(maakohtainen.tilasto.kaupunkipisteita >= 7,
    `kaupunkipisteitä eläväksi ${maakohtainen.tilasto.kaupunkipisteita}`);
  assert.ok(maakohtainen.tilasto.sisaisia >= 32,
    `kaupungin sisäisiä eläväksi ${maakohtainen.tilasto.sisaisia}`);
});

test('portti ei siirrä ladontaa: poltetun merkin tiiviste on luettelossa', () => {
  let poltettuja = 0;
  for (const m of merkit) {
    if (!m.poltettava) {
      assert.equal(luettelo[m.tunnus], undefined,
        `${m.tunnus} ei pala mutta on luettelossa`);
      continue;
    }
    poltettuja += 1;
    assert.equal(luettelo[m.tunnus], m.tiiviste,
      `${m.tunnus}: luettelon tiiviste eroaa merkin omasta`);
  }
  assert.equal(poltettuja, tilasto.poltettu);
  assert.equal(Object.keys(luettelo).length, poltettuja);
  // Maat, joiden lehti on tällä laudalla — sama joukko kuin ennen porttia.
  const lehdet = Object.entries(FOKUS_POHJAT).filter(([, p]) => p.lauta === pack.id).length;
  assert.ok(lehdet >= maittain.size, `lehtiä ${lehdet}, maita merkeissä ${maittain.size}`);
});
