/*
 * LINSSILUENNAT — kertoja lukee jokaisen keksinnön ääneen.
 *
 * Omistajan tilaus 4.9.2026, sanatarkasti: *"Generoi selostajan
 * äänellä jokaiseen kohtaan vuosiluku, keksijän nimi ja keksintö, eli
 * se tulisi aina Keksinnön vaihtoessa lukijan äänellä."*
 *
 *   node tools/generoi-linssiluennat.mjs --kuiva
 *   node tools/generoi-linssiluennat.mjs --pysakit 1769,1783
 *   node tools/generoi-linssiluennat.mjs --pysakit esittely,valinaytos
 *   node tools/generoi-linssiluennat.mjs            (koko kaari)
 *   node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --kuiva
 *   node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --kertomus --kuiva
 *   node tools/generoi-linssiluennat.mjs --linssi ihmisen-matka --kertomus --yhtena --kuiva
 *
 *   --kuiva          tulostaa tekstit ja kohteet, ei kutsu APIa
 *   --kertomus       KERTOMUSJAKSOT pysäkkien sijaan (ks. KERTOMUS
 *                    YHTENÄ KAARENA alempana). Vain kaarella, jolla on
 *                    `aikajana.kertomus`; `--pysakit` valitsee jaksot
 *                    TUNNUKSELLA (esim. `--pysakit avaus,denisova`).
 *   --yhtena         KOKO KERTOMUS YHTENÄ ÄÄNITTEENÄ ja aikaleimoina
 *                    (vain --kertomus-tilassa; ks. YKSI YHTENÄINEN
 *                    LUENTA alempana). Ei käy yhteen --pysakkien kanssa.
 *   --malli <id>     äänen malli yhtenäisessä luennassa (vain --yhtena;
 *                    oletus eleven_v3, jonka tagit kaanoni kirjoittaa).
 *   --linssi <tunnus>  mikä aikajanakaari luetaan (oletus `keksinnot`;
 *                    ks. LINSSIT alempana). Kaari kertoo itse sekä
 *                    luettavan tekstin että ämpärin kansion.
 *   --pysakit 1769,1783   vain nämä vuodet (tyhjä = kaikki). HUOM:
 *                    kaaressa on KOLME vuoden 1895 pysäkkiä (Marconi,
 *                    Röntgen, Lumière), ja vuosi valitsee ne kaikki.
 *                    "Vuotta sitten" -kaarella pysäkki valitaan
 *                    TUNNUKSELLA (`--pysakit jebel-irhoud`), koska
 *                    vuosilukuja ei ole. Sama lippu ottaa KAAREN OMAT
 *                    PUHEET avaimina: `esittely` (avausjakson selite),
 *                    `valinaytos` (merkkipaalun kertojateksti) ja
 *                    `loppu` (loppusanat, jos kaari pyytää ne).
 *   --pakota         generoi vaikka tiedosto on jo ämpärissä
 *   --ei-vientia     generoi ja viimeistele, mutta jätä levylle
 *
 * ------------------------------------------------------------------
 * RESEPTI ON SAMA KUIN MUILLA KERTOJAN LUENNOILLA
 * ------------------------------------------------------------------
 *
 * Ääni "Viisas Kertoja", malli eleven_v3, /v1/text-to-dialogue,
 * mp3_44100_128 — tasan kuten tools/generoi-luennat.mjs. Sama ääni
 * kuin isoisän matkakirjamerkinnöissä, koska kertoja on sama.
 *
 * TEKSTI TULEE DATASTA, EI TÄSTÄ TIEDOSTOSTA. Luettava muoto on
 * "<vuosi>. <henkilö>. <keksintö>." ja se ladotaan js/linssipuhe.js:n
 * funktiolla — samalla, jota peli käyttää. Pisteiden kohdalle tulee
 * break-tagi, jottei vuosiluku, nimi ja keksintö sula yhdeksi pötköksi
 * (eleven_v3 tukee <break time="0.4s" />).
 *
 * KAKSI KAARTA, SAMA KONE (Fablen ohje 6.9.2026). "Vuotta sitten"
 * -kaarella (Ihmisen matka) ei ole vuosilukua eikä keksijää, joten
 * sama funktio ladotaan aika- ja paikkatiedosta: "Noin 300 000 vuotta
 * sitten. Kasvot, jotka tunnistaisi — Jebel Irhoud, Marokko." Yksi
 * lyhyt lause pysäkkiä kohti — luenta soi kortin vaihtuessa, ja
 * pidempi teksti jäisi seuraavan pysäkin alle. Kaaren omat puheet
 * (esittely, loppusanat) luetaan sen sijaan LYHENTÄMÄTTÄ.
 *
 * ------------------------------------------------------------------
 * KERTOMUS YHTENÄ KAARENA (--kertomus)
 * ------------------------------------------------------------------
 *
 * Raamattu IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA (omistaja
 * 7.9.2026): Ihmisen matkan kertoja ei lue pysäkkirivejä vaan JAKSOJA,
 * jotka soivat peräkkäin ilman pysähdystä. Jaksot ovat kaanonissa
 * (js/linssit/ihmisen-matka-kertomus.js, omistajan hyväksymä), ja
 * kentät ovat valmiiksi kahtena: `teksti` on se, mikä ruudulla lukee,
 * `luenta` sama teksti eleven_v3:n tageilla. TÄSSÄ EI LADOTA MITÄÄN —
 * malli saa `luenta`-kentän sellaisenaan, koska tagit ovat kaanonia.
 *
 * Tiedostonimi on sama sääntö kuin muuallakin: js/linssipuhe.js
 * kertomuksenRunko johtaa sen jakson tunnuksesta ja kaaren omasta
 * etuliitteestä (`aikajana.kertomusRunko`), joten peli ja työkalu
 * osuvat samaan tiedostoon ilman erillistä nimilistaa:
 *
 *   aikajana/ihmisen-matka/puhe/ihmisen-matka-kertomus-avaus.mp3
 *
 * MANIFESTI ÄMPÄRIIN samaan kansioon (kertomus-manifesti.json): yksi
 * rivi per jakso — tunnus, tiedosto, merkkimäärä ja valmiin äänitteen
 * kesto. Peli ei tarvitse sitä (se lukee keston soittimesta ja putoaa
 * tarvittaessa merkkimäärään, 14 merkkiä/s), mutta manifestista näkee
 * yhdellä silmäyksellä, mitä ämpärissä on ja kuinka pitkä esitys on.
 *
 * ------------------------------------------------------------------
 * TIEDOSTONIMI ON KYTKENTÄ
 * ------------------------------------------------------------------
 *
 * Runko on MUOTOKUVAN runko (js/linssipuhe.js luennanRunko): pysäkin
 * `kuva.osoite`-tiedostonimi ilman päätettä. Vuosi yksin ei kelpaisi —
 * vuodella 1895 on kolme pysäkkiä. Merkkipaalun (1873) runko ladotaan
 * aina vuodesta ja otsikosta (1873-matkakirjan-vuosi), vaikka paalu
 * saisi oman muotokuvan. Peli lukee saman funktion, joten nimi ei voi
 * eriytyä kutsujan muistiin.
 *
 * KAAREN OMAT PUHEET (js/linssipuhe.js kaarenPuheet) noudattavat samaa
 * sääntöä omilla rungoillaan: avausjakson esittely on `esittely` ja
 * merkkipaalun välinäytös `valinaytos-<vuosi>`. Ne ovat pitkää proosaa
 * eivätkä kolmen sanan riviä, joten break-tageja ei ladota — lauseet
 * kantavat oman rytminsä.
 *
 * ------------------------------------------------------------------
 * TASO: −17 LUFS (kertojan taso, ei tehosteen)
 * ------------------------------------------------------------------
 *
 * Tehosteet ovat −30 LUFS (tools/generoi-tehosteet.mjs), mutta se on
 * TAUSTALLA soivan efektin taso. Kertojan luennat ovat aivan toisella
 * tasolla: ämpärissä olevat äänitteet mitattiin 4.9.2026
 * (intro-puhe.mp3 −17,1 · puhe-lento-alku.mp3 −17,4 ·
 * puhe-fokus-matkakirja-lontoo.mp3 −17,1 LUFS), ja linssiluenta
 * sovitetaan samaan perheeseen. Muuten sama kertoja kuulostaisi
 * linssissä kuiskaukselta, koska peli soittaa senkin puheVoima()-
 * tasolla (js/linssipuhe.js).
 *
 * Normalisointi on kaksivaiheinen kuten tehosteilla: ensin MITATAAN
 * (loudnorm print_format=json), sitten korjataan yhdellä lineaarisella
 * volume=…dB -vahvistuksella. Dynaaminen loudnorm tasoittaisi puheen
 * omat painotukset.
 *
 * HÄNTÄ: hiljaisuus leikataan molemmista päistä (sama suodatin kuin
 * tehosteilla) ja loppuun palautetaan 150 ms hiljaisuutta, jottei
 * viimeinen sana katkea soittimen pysäytykseen.
 *
 * ------------------------------------------------------------------
 * VIENTI JA REPO
 * ------------------------------------------------------------------
 *
 * Valmiit mp3:t EIVÄT mene repoon. Ne kirjoitetaan media/-puolelle
 * (.gitignoressa, tarkistetaan ennen ensimmäistäkään maksullista
 * kutsua) ja viedään ämpäriin samalla aws s3 cp -komennolla ja
 * samoilla neljällä salaisuudella kuin tools/generoi-tehosteet.mjs ja
 * vie-aanet.yml. TÄMÄ TYÖKALU VIE ITSE — ajo ei committoi mitään.
 *
 * KANSIO TULEE KAARESTA eikä tästä tiedostosta: keksinnöillä
 * aikajana/keksinnot/puhe/ (js/linssipuhe.js LINSSILUENTA_JUURI),
 * Ihmisen matkalla aikajana/ihmisen-matka/puhe/ (linssin
 * `aikajana.luentajuuri`). Peli hakee tasan saman polun, joten
 * luennat ovat pelissä heti ajon jälkeen ilman julkaisua.
 *
 * JO OLEMASSA OLEVAA EI GENEROIDA UUDELLEEN: ennen kutsua tehdään HEAD
 * julkiseen osoitteeseen, ja 200 ohittaa pysäkin. --pakota kirjoittaa
 * yli. Näin uuden pysäkin lisääminen kaareen maksaa yhden kutsun eikä
 * kahtakymmentäkuutta.
 *
 * API-avain luetaan VAIN ympäristöstä (ELEVEN_API_KEY) eikä sitä
 * tulosteta koskaan. HUOM konttiympäristössä: Noden fetch ei käytä
 * ympäristön proxyä ilman NODE_USE_ENV_PROXY=1 — työkalu käynnistää
 * itsensä uudelleen lipun kanssa, kuten generoi-tehosteet.mjs.
 */

import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  KAAREN_AVAIMET, KERTOMUKSEN_MERKKIA_SEKUNNISSA, kaarenPuheet, kertomuksenLuennat,
  luennanPuhe, luennanRunko, luennanTeksti, luennanTiedosto, puheeksi,
} from '../js/linssipuhe.js';
import { leikkaaHiljaisuusSuodatin } from './generoi-tehosteet.mjs';
import { julkinenJuuri, tulkitseEbur128, tulkitseLoudnorm } from './generoi-siirtymamusiikki.mjs';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/*
 * Sama vartija kuin tehostetyökalussa: ilman lippua Noden fetch ei lue
 * HTTPS_PROXYa, ja API-kutsu kaatuu kontissa vaikka verkko on auki.
 * Ohitetaan moduulituonnissa — vain suoraan ajettu prosessi
 * käynnistetään uudelleen.
 */
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

// ── rajapinta ──────────────────────────────────────────────────────

const OSOITE = 'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128';
const AANI = 'Sz0tRTEpybtDJ9ru2kgD'; // Viisas Kertoja
export const MALLI = 'eleven_v3';
/*
 * Stability kävi arvossa 0,4, mutta palautettiin 0,5:een omistajan
 * palautteesta 7.8.2026: *"äänen vaihteluarvoa kannattaa ottaa
 * takaisinpäin, hyppii vähän liikaa"*. Sama arvo kuin
 * tools/generoi-luennat.mjs:ssä — kertoja on sama.
 */
const STABILITY = 0.5;
/*
 * Lopputauko (omistajan havainto 8.8.2026: tiedosto leikkautuu heti
 * viimeisen sanan perään ja loppuun jää naksahdus). Break-tagi pyytää
 * mallilta hiljaisuutta, jonka ffmpeg leikkaa naksun kanssa pois.
 */
const LOPPUTAUKO = ' <break time="1.0s" />';

// ── kaaret ─────────────────────────────────────────────────────────

/**
 * MITKÄ KAARET OVAT AJETTAVISSA. Moduuli ladataan vasta valinnan
 * jälkeen (dynaaminen import), jotta väärä tunnus kaatuu selvään
 * virheeseen eikä puuttuvaan vientiin — ja jotta toisen kaaren
 * keskeneräinen aineisto ei estä tämän ajamista.
 */
export const LINSSIT = {
  keksinnot: '../js/linssit/keksinnot.js',
  'ihmisen-matka': '../js/linssit/ihmisen-matka.js',
};

/** Oletuskaari: keksinnöt, eli työkalun entinen ainoa käytös. */
export const OLETUSLINSSI = 'keksinnot';

/** Ämpärin kansio = pelin hakupolku (js/linssipuhe.js LINSSILUENTA_JUURI). */
const KEKSINTOJEN_KANSIO = 'aikajana/keksinnot/puhe';

/**
 * Kaaren luentakansio ämpärissä. Kaari kertoo sen itse
 * (`aikajana.luentajuuri` on koko osoite ämpärin juuresta lähtien),
 * ja tässä siitä leikataan julkinen juuri pois — sama merkkijono, jota
 * peli hakee. Ilman kenttää keksintöjen kansio, kuten ennen.
 */
export function ampariKansio(kaari) {
  const juuri = kaari?.luentajuuri;
  if (typeof juuri !== 'string' || !juuri) return KEKSINTOJEN_KANSIO;
  const julkinen = julkinenJuuri();
  const polku = juuri.startsWith(julkinen) ? juuri.slice(julkinen.length) : juuri;
  return polku.replace(/^\/+|\/+$/g, '');
}

// ── kansiot ────────────────────────────────────────────────────────

const KOHDE_KANSIO = 'media/linssiluennat';
/** Mallin raaka tuotos talteen: uuden leikkauksen voi tehdä ilmaiseksi. */
const RAAKA_KANSIO = 'media/linssiluennat-raaka';

// ── vaatimukset ────────────────────────────────────────────────────

/** Kertojan taso: sama perhe kuin ämpärin muut luennat (ks. otsikko). */
const TAVOITE_LUFS = -17;
/** Mp3-koodaus ja purku siirtävät mitattua tasoa vajaan puoli LU. */
const LUFS_TOLERANSSI = 1.5;
/** Häivytykset päihin: naksahdukseton alku ja loppu ilman kuuluvaa fadea. */
const HAIVYTYS_S = 0.03;
/** Hiljaisuutta loppuun, jottei viimeinen sana katkea pysäytykseen. */
const HANNAN_PADDING_S = 0.15;
/** Kolme sanaa kestää sekunteja, ei minuutteja — selvä hälytysraja. */
const KESTO_MIN_S = 1.0;
const KESTO_MAX_S = 14.0;
/**
 * KAAREN OMAT PUHEET ovat kokonaisia kappaleita eivätkä kolmen sanan
 * rivejä: esittely on noin puoli minuuttia ja välinäytös vajaan.
 * Yläraja on silti olemassa — se erottaa pitkän tekstin siitä, että
 * malli on jäänyt jauhamaan.
 */
const KAAREN_KESTO_MAX_S = 50.0;
/**
 * YHTENÄINEN LUENTA on koko kertomus yhtenä äänitteenä: kaanonin mitta
 * on noin viisi minuuttia, ja katto erottaa siitä sen, että malli on
 * jäänyt jauhamaan tai vastaus on katkennut kesken.
 */
export const YHTENAN_KESTO_MAX_S = 900.0;

// ── argumentit ─────────────────────────────────────────────────────

/** Komentoriviliput. Palauttaa `{ virhe }`, jos syöte ei kelpaa. */
export function tulkitseArgumentit(argumentit) {
  const liput = {
    linssi: OLETUSLINSSI,
    pysakit: [],
    kuiva: false,
    pakota: false,
    vienti: true,
    kertomus: false,
    /** Koko kertomus yhtenä äänitteenä ja aikaleimoina (ks. --yhtena). */
    yhtena: false,
    /** Aikaleimojen malli; oletus vasta valinnan jälkeen (ks. alempaa). */
    malli: null,
  };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--linssi') {
      const nimi = argumentit[i + 1];
      if (!nimi || String(nimi).startsWith('--')) return { ...liput, virhe: '--linssi ilman tunnusta' };
      if (!LINSSIT[nimi]) {
        return {
          ...liput,
          virhe: `tuntematon linssi: ${nimi} (${Object.keys(LINSSIT).join(', ')})`,
        };
      }
      liput.linssi = nimi;
      i += 1;
    } else if (arg === '--pysakit') {
      /*
       * PILKKU TAI VÄLILYÖNTI, KUMPI TAHANSA. Sama sietokyky kuin
       * generoi-luennat.mjs:n kaupunkilistalla (ajo 33277398508,
       * 29.8.2026: pilkullinen lista meni läpi yhtenä avaimena ja ajo
       * kaatui vasta lopussa). Välilyönnillinen lista on shellissä jo
       * hajonnut moneksi argumentiksi, joten lipun perästä kerätään
       * KAIKKI vuosilta näyttävät palat — ei vain seuraavaa.
       */
      const palat = [];
      while (i + 1 < argumentit.length && !String(argumentit[i + 1]).startsWith('--')) {
        i += 1;
        palat.push(argumentit[i]);
      }
      if (!palat.length) return { ...liput, virhe: '--pysakit ilman vuosia' };
      const valinnat = palat.join(',').split(/[,\s]+/).map((pala) => pala.trim()).filter(Boolean);
      for (const valinta of valinnat) {
        if (/^\d{3,4}$/.test(valinta)) {
          liput.pysakit.push(Number(valinta));
          continue;
        }
        /*
         * KAAREN OMAT PUHEET OVAT SAMASSA LIPUSSA: `esittely` on
         * avausjakson selite, `valinaytos` merkkipaalujen pidemmät
         * kertojatekstit ja `loppu` loppusanat (js/linssipuhe.js
         * kaarenPuheet). Vuosi ei kelpaisi valitsimeksi millekään —
         * esittely ei ole yhdessä vuodessa, ja välinäytös jakaa
         * vuotensa pysäkin kanssa.
         *
         * MUU MERKKIJONO ON PYSÄKIN TUNNUS ("vuotta sitten" -kaari,
         * jolla ei ole vuosilukuja). Kirjoitusvirhe ei mene ohi: se
         * kaatuu heti valitsePysakit-tarkistukseen "näitä ei ole
         * kaaressa" eikä maksa yhtäkään kutsua.
         */
        liput.pysakit.push(valinta);
      }
    } else if (arg === '--kertomus') {
      liput.kertomus = true;
    } else if (arg === '--yhtena') {
      liput.yhtena = true;
    } else if (arg === '--malli') {
      const nimi = argumentit[i + 1];
      if (!nimi || String(nimi).startsWith('--')) return { ...liput, virhe: '--malli ilman tunnusta' };
      liput.malli = nimi;
      i += 1;
    } else if (arg === '--kuiva') {
      liput.kuiva = true;
    } else if (arg === '--pakota') {
      liput.pakota = true;
    } else if (arg === '--ei-vientia') {
      liput.vienti = false;
    } else {
      return { ...liput, virhe: `tuntematon argumentti: ${arg}` };
    }
  }
  /*
   * YHTENÄINEN LUENTA ON KERTOMUKSEN TILA. Se kokoaa KOKO kertomuksen
   * yhdeksi tekstiksi, joten jaksojen rajaaminen --pysakeilla olisi
   * ristiriita: puolikas kertomus ei ole yksi yhtenäinen luenta.
   */
  if (liput.yhtena && !liput.kertomus) return { ...liput, virhe: '--yhtena vaatii --kertomus' };
  if (liput.yhtena && liput.pysakit.length) {
    return { ...liput, virhe: '--yhtena lukee koko kertomuksen — --pysakit ei käy siihen' };
  }
  if (liput.malli && !liput.yhtena) return { ...liput, virhe: '--malli koskee vain --yhtena-tilaa' };
  // Ääni on kertojan ääni: sama malli kuin jakso kerrallaan -tilassa.
  if (liput.yhtena) liput.malli ??= MALLI;
  return liput;
}

/**
 * Ajettavat työt valinnan mukaan. Tyhjä valinta = KOKO KAARI: kaikki
 * pysäkit sekä kaaren omat puheet (esittely ja välinäytökset).
 *
 * Valinta on sekalista: vuosiluvut poimivat pysäkit, avaimet
 * (`esittely`, `valinaytos`) kaaren omat puheet. Palauttaa
 * `{ tyot, tuntemattomat }`, jotta väärä valinta huomataan ennen
 * ensimmäistäkään maksullista kutsua eikä vasta hiljaisuutena.
 *
 * @param {object} kaari linssin `aikajana`-lohko
 * @param {Array<number|string>} valinta
 */
export function valitsePysakit(kaari, valinta = []) {
  const vuodet = valinta.filter((v) => typeof v === 'number');
  const avaimet = valinta.filter((v) => typeof v === 'string');
  const kaikki = !valinta.length;
  const tyot = [];
  for (const t of kaari?.tapahtumat ?? []) {
    // Pysäkin valitsin on vuosiluku tai tunnus (ks. tulkitseArgumentit).
    const valittu = kaikki || vuodet.includes(t.vuosi)
      || (t.tunnus && avaimet.includes(t.tunnus));
    if (!valittu) continue;
    const nimi = luennanTiedosto(t);
    if (!nimi) continue;
    tyot.push({
      vuosi: t.vuosi ?? null,
      avain: t.tunnus ?? String(t.vuosi),
      runko: luennanRunko(t),
      nimi,
      teksti: luennanTeksti(t),
      puhe: luennanPuhe(t),
    });
  }
  /*
   * KAAREN OMAT PUHEET ovat pitkää proosaa eivätkä kolmen sanan
   * riviä: niihin ei ladota break-tageja, vaan lauseet kantavat oman
   * rytminsä. Malli saa siis tekstin sellaisenaan.
   */
  for (const puhe of kaarenPuheet(kaari)) {
    if (!kaikki && !avaimet.includes(puhe.avain)) continue;
    tyot.push({
      vuosi: null,
      avain: puhe.avain,
      runko: puhe.runko,
      nimi: puhe.nimi,
      teksti: puhe.teksti,
      // Vuosiluvut sanoina mallille (js/linssipuhe.js puheeksi).
      puhe: puheeksi(puhe.teksti),
    });
  }
  const loydetyt = new Set(tyot.map((tyo) => tyo.vuosi));
  const avainLoydot = new Set(tyot.map((tyo) => tyo.avain));
  return {
    tyot,
    tuntemattomat: [
      ...vuodet.filter((v) => !loydetyt.has(v)),
      ...avaimet.filter((a) => !avainLoydot.has(a)),
    ],
  };
}

/**
 * KERTOMUSJAKSOT valinnan mukaan. Tyhjä valinta = koko kertomus.
 * Valitsin on jakson TUNNUS (`--pysakit avaus,denisova`); vuosiluvut
 * eivät kelpaa, koska jaksoilla ei ole vuosilukua.
 *
 * @param {object} kaari linssin `aikajana`-lohko
 * @param {Array<number|string>} valinta
 */
export function valitseKertomus(kaari, valinta = []) {
  const avaimet = valinta.map((v) => String(v));
  const kaikki = !valinta.length;
  const tyot = kertomuksenLuennat(kaari)
    .filter((rivi) => kaikki || avaimet.includes(rivi.avain))
    .map((rivi) => ({ ...rivi, vuosi: null }));
  const loydot = new Set(tyot.map((tyo) => tyo.avain));
  return { tyot, tuntemattomat: avaimet.filter((a) => !loydot.has(a)) };
}

/** Kertomusmanifestin tiedostonimi ämpärissä (kaaren puhekansiossa). */
export const KERTOMUS_MANIFESTI = 'kertomus-manifesti.json';

/**
 * MANIFESTIN MUOTO. Yksi rivi per jakso; `kesto` on valmiin äänitteen
 * pituus sekunteina ja null, jos sitä ei tässä ajossa generoitu
 * (ohitettu tai rajattu pois). Sama kaava kuin pulun manifestissa
 * (tools/generoi-pulu.mjs kokoaManifesti).
 *
 * @param {object} kaari linssin `aikajana`-lohko
 * @param {Map<string, number>} kestot avain → kesto sekunteina
 */
export function kokoaKertomusManifesti(kaari, kestot = new Map()) {
  const rivit = kertomuksenLuennat(kaari);
  return {
    versio: 1,
    kansio: ampariKansio(kaari),
    paivitetty: new Date().toISOString().slice(0, 10),
    merkkiaSekunnissa: KERTOMUKSEN_MERKKIA_SEKUNNISSA,
    jaksoja: rivit.length,
    jaksot: rivit.map((rivi) => ({
      tunnus: rivi.avain,
      nimi: rivi.nimi,
      merkit: rivi.teksti.length,
      arvioSekunteina: Number((rivi.teksti.length / KERTOMUKSEN_MERKKIA_SEKUNNISSA).toFixed(1)),
      kesto: kestot.get(rivi.avain) ?? null,
    })),
  };
}

/*
 * ------------------------------------------------------------------
 * YKSI YHTENÄINEN LUENTA (--yhtena)
 * ------------------------------------------------------------------
 *
 * Omistaja 8.9.2026, sanatarkasti: *"nyt jokainen kohtaus on generoitu
 * erillisenä kohtana, niin kertojan äänensävy hyppii liikaa"* ja
 * *"muista generoida teksti yhtenä pätkänä, jossa on luonnolliset
 * lauseet ja kappaleet. mukautetaan visuaalisuus sen mukaan."*
 *
 * KOKO KERTOMUS YHTENÄ PYYNTÖNÄ. Jaksojen `luenta`-kentät ladotaan
 * KAPPALEIKSI (tyhjä rivi väliin) yhdeksi tekstiksi, ja malli lukee sen
 * kerralla. Jaksojen väliin EI kirjoiteta break-tageja eikä muita
 * keinotekoisia taukomerkkejä — teksti on luonnollista proosaa, ja
 * tauko jaksojen väliin tehdään tarvittaessa pelissä. Vain koko
 * luennan LOPPUUN jää sama lyhyt tauko kuin muillakin luennoilla
 * (LOPPUTAUKO), jottei viimeinen sana katkea naksahdukseen.
 *
 * AIKALEIMAT KERTOVAT, MISTÄ JAKSO ALKAA. Vastaus haetaan
 * aikaleimapäätteestä (POST /v1/text-to-speech/{voice}/with-timestamps),
 * joka palauttaa äänen lisäksi `alignment`-lohkon: jokaiselle
 * lähetetyn tekstin merkille alku- ja loppuaika sekunteina. Niistä
 * lasketaan manifestiin jokaisen JAKSON, LAUSEEN ja SANAN alkuhetki
 * millisekunteina, ja peli soittaa jakson yhden tiedoston väliltä
 * (js/linssit/ihmisen-matka-luenta.js).
 *
 * MALLI PYSYY ELEVEN_V3:NA (omistajan valinta 8.9.2026: kertoja
 * äänitetään v3:lla juuri sen ilmaisutagien takia). Ääni generoidaan
 * siis samalla päätteellä, mallilla ja asetuksilla kuin jakso kerrallaan
 * -tilassa, TAGIT MUKANA — vain yhtenä pyyntönä.
 *
 * AIKALEIMAT HAETAAN JÄLKIKÄTEEN (`POST /v1/forced-alignment`,
 * elevenlabs.io/docs/api-reference/forced-alignment/create, tarkistettu
 * 8.9.2026). Pääte saa valmiin mp3:n (`file`) ja saman tekstin TAGIT
 * KARSITTUINA (`text`) ja palauttaa `characters`- ja `words`-listat,
 * joissa on `start` ja `end` sekunteina. Näin kertojan ääni on v3:n
 * ilmaisua ja aikaleimat silti tarkat.
 *
 * VARAREITTI, JOS KOHDISTUS EI ONNISTU: aikaleimapääte
 * (`/v1/text-to-speech/{voice}/with-timestamps`), joka vastaa
 * `eleven_multilingual_v2`:lla — se generoi äänen ITSE ja korvaa v3:n
 * luennan, joten se on nimenomaan varareitti eikä oletus. Manifestiin
 * kirjataan kumpi reitti kulki (`aikaleimalahde`) ja millä mallilla ääni
 * syntyi (`malli`), jottei vaihto koskaan tapahdu hiljaa. `--malli`
 * vaihtaa äänen mallin käsin; jos se ei ole v3-perhettä, tagit
 * karsitaan myös lähetettävästä tekstistä (muuten malli lukisi ne).
 */

/** Aikaleimojen varareitti: aikaleimapääte omalla mallillaan (ks. yllä). */
export const AIKALEIMOJEN_MALLI = 'eleven_multilingual_v2';

/** Mistä aikaleimat tulivat — kirjataan manifestiin. */
export const AIKALEIMAN_LAHTEET = {
  pakotettu: 'forced-alignment',
  leimattu: 'with-timestamps',
};

/** Pakotettu kohdistus: valmis ääni + sama teksti → merkkien ajat. */
export const PAKOTETUN_OSOITE = 'https://api.elevenlabs.io/v1/forced-alignment';

/** Aikaleimapäätteen osoite (ääni polussa, muoto samana kuin muualla). */
export function aikaleimojenOsoite(aani = AANI) {
  return `https://api.elevenlabs.io/v1/text-to-speech/${aani}`
    + '/with-timestamps?output_format=mp3_44100_128';
}

/** Tunteeko malli eleven_v3:n tagit ([curious], [pause] …). */
export function tunteeTagit(malli) {
  return String(malli ?? '').startsWith('eleven_v3');
}

/** Kappaleiden väli: tyhjä rivi, ei taukomerkkiä (omistaja 8.9.2026). */
export const KAPPALEEN_VALI = '\n\n';

/** Jakson häntä: viimeisen äänteen jälkeen jätetään tämän verran ilmaa. */
export const JAKSON_HANTA_MS = 250;

/** Tagit ja break-merkinnät: eivät ole puhetta eivätkä saa aikaleimaa. */
const TAGI = /\[[^\]]*\]|<break[^>]*\/?>/g;

/** Sanan merkit (kirjaimet, numerot, väliviiva ja heittomerkki). */
const SANA = /[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu;

/** Lauseen loppu: piste, huuto, kysymys tai kolme pistettä + väli. */
const LAUSEEN_LOPPU = /[.!?…]["'»”)]*\s/;

/** Tagit pois ja välit siistiksi (malli, joka ei tunne tageja). */
export function karsiTagit(teksti) {
  return String(teksti ?? '').replace(TAGI, ' ').replace(/[ \t]+/g, ' ')
    .replace(/ ([,.!?;:…])/g, '$1')
    .replace(/ *\n */g, '\n')
    .trim();
}

/** Tagien merkkivälit [alku, loppu) tekstissä (ei puhetta). */
export function tagienValit(teksti) {
  const valit = [];
  const haku = new RegExp(TAGI.source, 'g');
  let osuma = haku.exec(teksti);
  while (osuma) {
    valit.push([osuma.index, osuma.index + osuma[0].length]);
    osuma = haku.exec(teksti);
  }
  return valit;
}

/** Onko merkki-indeksi tagin sisällä. */
function tagissa(valit, i) {
  return valit.some(([a, b]) => i >= a && i < b);
}

/**
 * KOKO KERTOMUS YHTENÄ TEKSTINÄ. Puhdas funktio: sama työkalussa ja
 * testissä. Jaksot ovat kappaleita (tyhjä rivi väliin), eikä väliin
 * lisätä mitään muuta.
 *
 * @param {Array<{avain:string, puhe:string, teksti:string}>} rivit kertomuksenLuennat
 * @param {object} [asetukset]
 * @param {boolean} [asetukset.tagit] jätetäänkö eleven_v3:n tagit tekstiin
 * @returns {{teksti:string, jaksot:Array<{tunnus:string, alku:number, loppu:number}>}}
 */
export function kokoaYhtenainenTeksti(rivit, { tagit = false } = {}) {
  const palat = [];
  const jaksot = [];
  let paikka = 0;
  for (const rivi of rivit) {
    const puhe = tagit ? String(rivi.puhe ?? '').trim() : karsiTagit(rivi.puhe ?? rivi.teksti);
    if (!puhe) continue;
    if (palat.length) paikka += KAPPALEEN_VALI.length;
    jaksot.push({ tunnus: rivi.avain, alku: paikka, loppu: paikka + puhe.length });
    paikka += puhe.length;
    palat.push(puhe);
  }
  return { teksti: palat.join(KAPPALEEN_VALI), jaksot };
}

/**
 * JAKSON LAUSEET JA SANAT MERKKI-INDEKSEINÄ. Tagit ohitetaan: ne eivät
 * ole puhetta, joten niiden kohdalta ei oteta aikaleimaa eikä niistä
 * synny sanoja. Puhdas funktio.
 *
 * @param {string} teksti koko kertomus yhtenä tekstinä
 * @param {{alku:number, loppu:number}} jakso merkkiväli tekstissä
 * @returns {{lauseet:number[], sanat:Array<{sana:string, merkki:number}>}}
 */
export function jaksonJasennys(teksti, { alku, loppu }) {
  const pala = teksti.slice(alku, loppu);
  const valit = tagienValit(pala);
  const sanat = [];
  const haku = new RegExp(SANA.source, 'gu');
  let osuma = haku.exec(pala);
  while (osuma) {
    if (!tagissa(valit, osuma.index)) sanat.push({ sana: osuma[0], merkki: alku + osuma.index });
    osuma = haku.exec(pala);
  }
  /*
   * LAUSEEN ALKU on ensimmäinen puhuttu merkki jakson alussa ja
   * jokaisen lauseenlopun jälkeen. Sanalistasta poimiminen on
   * varmempaa kuin oma silmukka: se ohittaa jo valmiiksi tagit,
   * lainausmerkit ja rivinvaihdot.
   */
  const lauseet = [];
  let uusi = true;
  for (let i = 0; i < sanat.length; i += 1) {
    const { merkki } = sanat[i];
    if (uusi) lauseet.push(merkki);
    // Päättyykö lause ENNEN seuraavaa sanaa: silloin seuraava aloittaa.
    const seuraava = sanat[i + 1]?.merkki ?? loppu;
    uusi = LAUSEEN_LOPPU.test(`${teksti.slice(merkki, seuraava)} `);
  }
  return { lauseet, sanat };
}

/**
 * Koko kertomuksen jäsennys: teksti, jaksojen merkkivälit sekä niiden
 * lauseiden ja sanojen merkki-indeksit. Puhdas funktio.
 */
export function kertomuksenJasennys(rivit, { tagit = false } = {}) {
  const { teksti, jaksot } = kokoaYhtenainenTeksti(rivit, { tagit });
  return {
    teksti,
    jaksot: jaksot.map((jakso) => ({ ...jakso, ...jaksonJasennys(teksti, jakso) })),
  };
}

/**
 * MERKKI-INDEKSI → AIKALEIMAN INDEKSI. ElevenLabsin `alignment` on
 * merkkijono merkkinä kerrallaan, ja normaalisti se on tasan sama
 * teksti kuin lähetetty. Sovitus tehdään silti merkeittäin, jotta
 * yksikin ylimääräinen merkki (mallin oma normalisointi) ei siirrä
 * koko kertomusta pieleen: vastaava merkki haetaan enintään
 * IKKUNA:n päästä, ja löytymätön jää nulliksi.
 *
 * @param {string} teksti lähetetty teksti
 * @param {string[]} merkit alignment.characters
 * @returns {Array<number|null>} teksti-indeksi → alignment-indeksi
 */
export function sovitaMerkit(teksti, merkit) {
  const IKKUNA = 40;
  const paikat = new Array(teksti.length).fill(null);
  let j = 0;
  for (let i = 0; i < teksti.length; i += 1) {
    let k = j;
    const raja = Math.min(merkit.length, j + IKKUNA);
    while (k < raja && merkit[k] !== teksti[i]) k += 1;
    if (k < raja) {
      paikat[i] = k;
      j = k + 1;
    }
  }
  return paikat;
}

/**
 * KAKSI VASTAUSMUOTOA, YKSI LASKENTA. Aikaleimapääte antaa merkit ja
 * ajat kolmena rinnakkaisena listana, pakotettu kohdistus taas
 * olioina (`{ text, start, end }`). Puhdas funktio: palauttaa
 * aikaleimapäätteen muodon tai nullin, jos vastaus ei kelpaa.
 *
 * @param {object} vastaus kummankin päätteen runko
 * @returns {{characters:string[], character_start_times_seconds:number[],
 *   character_end_times_seconds:number[]}|null}
 */
export function normalisoiAlignment(vastaus) {
  const lohko = vastaus?.alignment ?? vastaus;
  const merkit = lohko?.characters;
  if (!Array.isArray(merkit) || !merkit.length) return null;
  // Pakotettu kohdistus: lista olioita, joissa teksti ja ajat yhdessä.
  if (typeof merkit[0] === 'object') {
    return {
      characters: merkit.map((m) => String(m?.text ?? '')),
      character_start_times_seconds: merkit.map((m) => Number(m?.start)),
      character_end_times_seconds: merkit.map((m) => Number(m?.end)),
    };
  }
  const alut = lohko.character_start_times_seconds;
  const loput = lohko.character_end_times_seconds;
  if (!Array.isArray(alut) || !Array.isArray(loput)) return null;
  return {
    characters: merkit.map((m) => String(m)),
    character_start_times_seconds: alut.map(Number),
    character_end_times_seconds: loput.map(Number),
  };
}

/**
 * AIKALEIMAT MANIFESTIIN. Laskee jokaiselle jaksolle alun ja lopun
 * sekä lauseiden ja sanojen alkuhetket millisekunteina. Puhdas
 * funktio: syötteenä jäsennys ja kumman tahansa päätteen vastaus.
 *
 * @param {object} jasennys kertomuksenJasennys
 * @param {object} alignment aikaleimapäätteen tai kohdistuksen vastaus
 * @param {object} [asetukset]
 * @param {number} [asetukset.kesto] koko äänitteen kesto sekunteina (lopun raja)
 * @returns {Array<object>} manifestin jaksorivit
 */
export function aikaleimoiksi(jasennys, alignment, { kesto = null } = {}) {
  const kohdistus = normalisoiAlignment(alignment);
  const merkit = kohdistus?.characters ?? [];
  const alut = kohdistus?.character_start_times_seconds ?? [];
  const loput = kohdistus?.character_end_times_seconds ?? [];
  if (!merkit.length || merkit.length !== alut.length || merkit.length !== loput.length) {
    throw new Error('alignment puuttuu tai on eri mittainen kuin merkkilista');
  }
  const paikat = sovitaMerkit(jasennys.teksti, merkit);
  const ms = (sekunnit) => Math.round(sekunnit * 1000);
  const alkuMs = (i) => (paikat[i] === null ? null : ms(alut[paikat[i]]));
  const loppuMs = (i) => (paikat[i] === null ? null : ms(loput[paikat[i]]));

  const rivit = jasennys.jaksot.map((jakso) => {
    const puhutut = jakso.sanat.map((s) => s.merkki);
    if (!puhutut.length) throw new Error(`jaksossa ${jakso.tunnus} ei ole sanoja`);
    const alku = alkuMs(puhutut[0]);
    // Viimeisen sanan viimeinen merkki: sen loppuaika päättää jakson.
    const viimeinen = jakso.sanat[jakso.sanat.length - 1];
    const viimeMerkki = viimeinen.merkki + viimeinen.sana.length - 1;
    const loppu = loppuMs(viimeMerkki);
    if (alku === null || loppu === null) {
      throw new Error(`jakson ${jakso.tunnus} aikaleimoja ei löytynyt aineistosta`);
    }
    return {
      tunnus: jakso.tunnus,
      alku,
      loppu,
      lauseet: jakso.lauseet.map(alkuMs).filter((v) => v !== null),
      sanat: jakso.sanat
        .map((s) => ({ sana: s.sana, alku: alkuMs(s.merkki) }))
        .filter((s) => s.alku !== null),
    };
  });

  /*
   * HÄNTÄ JOKAISEEN JAKSOON, MUTTA EI SEURAAVAN PÄÄLLE. Viimeinen
   * äänne katkeaisi, jos jakso päättyisi tasan sen loppuaikaan.
   */
  const raja = Number.isFinite(kesto) ? ms(kesto) : null;
  return rivit.map((rivi, i) => {
    const seuraava = rivit[i + 1]?.alku ?? raja ?? rivi.loppu + JAKSON_HANTA_MS;
    return { ...rivi, loppu: Math.min(rivi.loppu + JAKSON_HANTA_MS, seuraava) };
  });
}

/**
 * MANIFESTI YHTENÄISELLE LUENNALLE. Peli lukee tämän
 * (js/linssit/ihmisen-matka-luenta.js): `yhtena: true` kertoo, että
 * kertomus on yhtenä tiedostona ja jakso soitetaan sen väliltä.
 */
export function kokoaYhtenaManifesti({
  kaari, jasennys, jaksot, tiedosto, kesto, malli = MALLI, tagit = false,
  aikaleimalahde = AIKALEIMAN_LAHTEET.pakotettu,
}) {
  return {
    versio: 2,
    yhtena: true,
    kansio: ampariKansio(kaari),
    paivitetty: new Date().toISOString().slice(0, 10),
    malli,
    /** 'forced-alignment' (oletus) tai 'with-timestamps' (varareitti). */
    aikaleimalahde,
    tagit,
    tiedosto,
    kesto: Number(Number(kesto).toFixed(2)),
    merkkeja: jasennys.teksti.length,
    merkkiaSekunnissa: KERTOMUKSEN_MERKKIA_SEKUNNISSA,
    jaksoja: jaksot.length,
    jaksot,
  };
}

// ── apurit ─────────────────────────────────────────────────────────

function aja(komento, argumentit, { salliVirhe = false } = {}) {
  const ajo = spawnSync(komento, argumentit, {
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  const loki = `${ajo.stdout ?? ''}${ajo.stderr ?? ''}`;
  if (!salliVirhe && (ajo.error || ajo.status !== 0)) {
    throw new Error(`${komento} epäonnistui (${ajo.error?.message ?? ajo.status}):\n`
      + loki.slice(-2000));
  }
  return { koodi: ajo.status ?? 1, loki };
}

function onOlemassa(komento) {
  return spawnSync('which', [komento], { encoding: 'utf8' }).status === 0;
}

/** Äänitiedoston kesto sekunteina. */
function kestoSekunteina(polku) {
  const { loki } = aja('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', polku,
  ]);
  const arvo = Number(loki.trim());
  if (!Number.isFinite(arvo) || arvo <= 0) throw new Error(`kestoa ei saatu: ${polku}`);
  return arvo;
}

/** Kaatuu, jos polku ei ole .gitignoressa — mediaa ei viedä repoon. */
function vaadiGitignore(polku) {
  const ajo = spawnSync('git', ['-C', JUURI, 'check-ignore', '-q', polku], {
    encoding: 'utf8',
  });
  if (ajo.status !== 0) {
    throw new Error(`${polku} EI ole .gitignoressa — valmis luenta menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

/** Luennan julkinen osoite ämpärissä. */
function julkinenOsoite(nimi, kansio) {
  return `${julkinenJuuri()}${kansio}/${nimi}`;
}

/** HEAD julkiseen osoitteeseen: onko luenta jo ämpärissä. */
function ampariHead(nimi, kansio) {
  const url = julkinenOsoite(nimi, kansio);
  if (!onOlemassa('curl')) return { url, koodi: null };
  const { loki } = aja('curl', ['-sS', '-I', '--max-time', '30', url], { salliVirhe: true });
  return { url, koodi: loki.match(/HTTP\/[\d.]+ (\d{3})/)?.[1] ?? null };
}

// ── ketjun vaiheet ─────────────────────────────────────────────────

/** Yksi maksullinen kutsu: yksi luenta levylle. */
async function haeApista(puhe, avain, kohde, { malli = MALLI } = {}) {
  const vastaus = await fetch(OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inputs: [{ text: puhe + LOPPUTAUKO, voice_id: AANI }],
      model_id: malli,
      settings: { stability: STABILITY },
    }),
    signal: AbortSignal.timeout(180000),
  });
  if (!vastaus.ok) {
    // Virherunko näkyviin (avain ei ole siinä): muodon muutokset selviävät siitä.
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, data);
  return data.length;
}

/**
 * PAKOTETTU KOHDISTUS: valmis äänite ja sama teksti tagit karsittuina
 * sisään, merkkien ja sanojen ajat ulos. Ääni on jo generoitu (v3), eikä
 * tämä kutsu tuota uutta ääntä — se vain kohdistaa tekstin siihen.
 *
 * @returns {object} vastausrunko (characters, words, loss)
 */
async function haeKohdistus(mp3polku, teksti, avain) {
  const lomake = new FormData();
  lomake.append('file', new Blob([readFileSync(mp3polku)], { type: 'audio/mpeg' }), 'kertomus.mp3');
  lomake.append('text', teksti);
  const vastaus = await fetch(PAKOTETUN_OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain },
    body: lomake,
    signal: AbortSignal.timeout(600000),
  });
  if (!vastaus.ok) {
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  return vastaus.json();
}

/**
 * YKSI KUTSU, KOKO KERTOMUS JA AIKALEIMAT. Aikaleimapääte palauttaa
 * JSONin, jossa on `audio_base64` ja `alignment` (merkit sekä niiden
 * alku- ja loppuajat sekunteina).
 *
 * @returns {{tavut:number, alignment:object}}
 */
async function haeAikaleimoilla(teksti, avain, kohde, { malli = AIKALEIMOJEN_MALLI } = {}) {
  const vastaus = await fetch(aikaleimojenOsoite(), {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: teksti + LOPPUTAUKO,
      model_id: malli,
      voice_settings: { stability: STABILITY },
    }),
    signal: AbortSignal.timeout(600000),
  });
  if (!vastaus.ok) {
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  const runko = await vastaus.json();
  if (!runko?.audio_base64) throw new Error('vastauksessa ei ollut audio_base64-kenttää');
  const data = Buffer.from(runko.audio_base64, 'base64');
  writeFileSync(kohde, data);
  return { tavut: data.length, alignment: runko.alignment ?? runko.normalized_alignment };
}

/**
 * Häivytykset päihin, tason korjaus yhtenä lineaarisena vahvistuksena
 * ja hiljainen häntä. `kesto` on leikatun äänen pituus sekunteina.
 */
export function viimeistelySuodatin({
  kesto, korjausDb, haivytys = HAIVYTYS_S, padding = HANNAN_PADDING_S,
}) {
  if (!(kesto > 0)) throw new Error('keston pitää olla positiivinen');
  const h = Math.min(haivytys, kesto / 4);
  const ulosAlkaa = Math.max(0, kesto - h);
  return [
    `afade=t=in:st=0:d=${h.toFixed(3)}`,
    `afade=t=out:st=${ulosAlkaa.toFixed(3)}:d=${h.toFixed(3)}`,
    `volume=${korjausDb.toFixed(2)}dB`,
    `apad=pad_dur=${padding.toFixed(3)}`,
  ].join(',');
}

/**
 * Hiljaisuuden leikkaus VAIN LOPUSTA. Yhtenäisen luennan aikaleimat
 * lasketaan mallin palauttamasta alignmentista, joka alkaa raa'an
 * äänitteen nollasta: jos alusta leikattaisiin hiljaisuutta, jokainen
 * jakso soisi väärästä kohdasta. Loppu saa yhä lähteä (sama temppu kuin
 * generoi-tehosteet.mjs:ssä: käännä, leikkaa alku, käännä takaisin).
 */
export function leikkaaVainLoppuSuodatin() {
  const koko = leikkaaHiljaisuusSuodatin();
  return `areverse,${koko.split(',')[0]},areverse`;
}

/**
 * Leikkaa hiljaisuus, normalisoi taso, palauta 150 ms häntä ja koodaa
 * mp3. `sailytaAlku` jättää alun hiljaisuuden paikalleen (yhtenäinen
 * luenta, ks. leikkaaVainLoppuSuodatin).
 */
function viimeistele(lahde, kohde, tyokansio, { sailytaAlku = false } = {}) {
  const wav = join(tyokansio, 'leikattu.wav');
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-af', `aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono,${
      sailytaAlku ? leikkaaVainLoppuSuodatin() : leikkaaHiljaisuusSuodatin()}`,
    '-c:a', 'pcm_s16le', wav,
  ]);
  const leikattu = kestoSekunteina(wav);

  // Vaihe 1: mittaus. Vaihe 2: yksi lineaarinen vahvistus (ks. otsikko).
  const mittausLoki = aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', wav,
    '-af', `loudnorm=I=${TAVOITE_LUFS}:TP=-2:LRA=11:print_format=json`,
    '-f', 'null', '-',
  ]).loki;
  const mitattu = tulkitseLoudnorm(mittausLoki);
  if (!mitattu) {
    throw new Error(`loudnormin mittaus ei tuottanut lukua:\n${mittausLoki.slice(-800)}`);
  }
  const korjaus = TAVOITE_LUFS - mitattu.taso;
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', wav,
    '-af', viimeistelySuodatin({ kesto: leikattu, korjausDb: korjaus }),
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
  return { leikattu, mitattu, korjaus };
}

/** Valmiin luennan tarkistukset: kesto ja taso. */
function tarkista(kohde, kestoMax = KESTO_MAX_S) {
  const pituus = kestoSekunteina(kohde);
  const taso = tulkitseEbur128(aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', kohde, '-af', 'ebur128=peak=true',
    '-f', 'null', '-',
  ]).loki);
  const virheet = [];
  if (pituus < KESTO_MIN_S || pituus > kestoMax) {
    virheet.push(`kesto ${pituus.toFixed(2)} s ei ole välillä ${KESTO_MIN_S}–${kestoMax} s`);
  }
  if (taso === null) {
    virheet.push('tasoa ei saatu mitattua (ebur128)');
  } else if (Math.abs(taso - TAVOITE_LUFS) > LUFS_TOLERANSSI) {
    virheet.push(`taso ${taso.toFixed(1)} LUFS, tavoite ${TAVOITE_LUFS} (±${LUFS_TOLERANSSI})`);
  }
  return { pituus, taso, virheet };
}

/** Vie valmis luenta ämpäriin (sama komento kuin vie-aanet.yml). */
function vieAmpariin(kohde, nimi, kansio, tyyppi = 'audio/mpeg') {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const avain = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !avain && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  if (!onOlemassa('aws')) throw new Error('aws-cli puuttuu — vienti tarvitsee sen.');

  aja('aws', [
    's3', 'cp', kohde, `s3://${ampari}/${kansio}/${nimi}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
    '--no-progress',
    '--content-type', tyyppi,
    '--cache-control', 'public, max-age=2592000',
  ]);
}

// ── pääohjelma ─────────────────────────────────────────────────────

/** ffmpeg ja ffprobe polusta; ilman niitä viimeistely ei onnistu. */
function vaadiTyokalut() {
  for (const komento of ['ffmpeg', 'ffprobe']) {
    if (!onOlemassa(komento)) {
      console.error(`${komento} puuttuu polusta — viimeistely tarvitsee sen.`);
      console.error('Asennus: apt-get install -y ffmpeg (ajossa tämä tehdään automaattisesti).');
      process.exit(1);
    }
  }
}

/** API-avain ympäristöstä; sitä ei tulosteta koskaan. */
function vaadiAvain() {
  const avain = process.env.ELEVEN_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  if (!avain) {
    console.error('ELEVEN_API_KEY puuttuu ympäristöstä — luentoja ei voi generoida.');
    console.error('Kuivan ajon saa ilman avainta: node tools/generoi-linssiluennat.mjs --kuiva');
    process.exit(1);
  }
  return avain;
}

/** Media ei saa mennä repoon: kansiot ovat .gitignoressa. */
function valmisteleKansiot() {
  const kohdekansio = resolve(JUURI, KOHDE_KANSIO);
  const raakakansio = resolve(JUURI, RAAKA_KANSIO);
  vaadiGitignore(kohdekansio);
  vaadiGitignore(raakakansio);
  mkdirSync(kohdekansio, { recursive: true });
  mkdirSync(raakakansio, { recursive: true });
  return { kohdekansio, raakakansio };
}

/**
 * KOKO KERTOMUS YHTENÄ LUENTANA (--kertomus --yhtena). Palauttaa
 * prosessin paluukoodin.
 */
async function ajaYhtenainen({ kaari, kansio, liput }) {
  const rivit = kertomuksenLuennat(kaari);
  if (!rivit.length) {
    console.error('Kertomuksessa ei ole jaksoja.');
    return 1;
  }
  const malli = liput.malli ?? MALLI;
  const tagit = tunteeTagit(malli);
  /*
   * KAKSI JÄSENNYSTÄ SAMASTA KAANONISTA. `lahetetty` menee mallille
   * (v3:lla tagit mukana), `puhuttu` on tagiton — juuri se, mitä
   * äänessä kuuluu, ja siksi se annetaan pakotetulle kohdistukselle ja
   * siitä lasketaan jaksojen, lauseiden ja sanojen merkki-indeksit.
   */
  const lahetetty = kertomuksenJasennys(rivit, { tagit });
  const puhuttu = tagit ? kertomuksenJasennys(rivit, { tagit: false }) : lahetetty;
  const nimi = `${kaari.kertomusRunko ?? 'kertomus'}.mp3`;
  const merkit = lahetetty.teksti.length;

  console.log(`YKSI YHTENÄINEN LUENTA — ${rivit.length} jaksoa yhtenä pyyntönä.`);
  console.log(`   ääni Viisas Kertoja, malli ${malli}, `
    + `tagit ${tagit ? 'mukana' : 'karsittu (malli ei tunne niitä)'}.`);
  console.log(`   aikaleimat: ${AIKALEIMAN_LAHTEET.pakotettu} (${PAKOTETUN_OSOITE}) — `
    + `varareitti ${AIKALEIMAN_LAHTEET.leimattu} + ${AIKALEIMOJEN_MALLI} `
    + '(generoi äänen uudelleen, kirjataan manifestiin).');
  console.log(`   ${merkit} merkkiä · varakesto `
    + `${(merkit / KERTOMUKSEN_MERKKIA_SEKUNNISSA / 60).toFixed(1)} min`);
  console.log(`   ääni     ${kansio}/${nimi}`);
  console.log(`   manifesti ${kansio}/${KERTOMUS_MANIFESTI}`);
  console.log('');
  console.log('── JAKSORAJAT (merkkeinä puhuttuun tekstiin) ──');
  for (const jakso of puhuttu.jaksot) {
    console.log(`   ${jakso.tunnus.padEnd(18)} ${String(jakso.alku).padStart(6)}–`
      + `${String(jakso.loppu).padStart(6)}  ${jakso.lauseet.length} lausetta, `
      + `${jakso.sanat.length} sanaa`);
  }

  if (liput.kuiva) {
    console.log('');
    console.log('── KOOTTU TEKSTI (juuri tämä lähtisi mallille) ──');
    console.log(lahetetty.teksti);
    if (tagit) {
      console.log('');
      console.log('── SAMA TEKSTI KOHDISTUKSELLE (tagit karsittuina) ──');
      console.log(puhuttu.teksti);
    }
    console.log('');
    console.log('KUIVA AJO (--kuiva) — APIa ei kutsuttu, ämpäriin ei viety.');
    return 0;
  }

  vaadiTyokalut();
  const avain = vaadiAvain();
  const { kohdekansio, raakakansio } = valmisteleKansiot();

  if (!liput.pakota) {
    const { url, koodi } = ampariHead(nimi, kansio);
    if (koodi === '200') {
      console.log(`\n${url} on jo ämpärissä — ohitetaan. --pakota kirjoittaa yli.`);
      return 0;
    }
  }

  const tyokansio = mkdtempSync(join(tmpdir(), 'linssiluennat-'));
  try {
    const kohde = join(kohdekansio, nimi);
    const lahde = join(raakakansio, `raaka-${nimi}`);

    /*
     * ALUN HILJAISUUS JÄÄ PAIKALLEEN kummallakin reitillä: aikaleimat
     * ovat äänitteen nollasta, joten alun leikkaus siirtäisi jaksot.
     */
    const viimeisteleJaMittaa = () => {
      const { leikattu, mitattu, korjaus } = viimeistele(lahde, kohde, tyokansio, {
        sailytaAlku: true,
      });
      console.log(`leikkaus (vain loppu): ${kestoSekunteina(lahde).toFixed(2)} s → `
        + `${leikattu.toFixed(2)} s, taso ${mitattu.taso.toFixed(1)} LUFS, `
        + `korjaus ${korjaus.toFixed(2)} dB`);
      return tarkista(kohde, YHTENAN_KESTO_MAX_S);
    };

    // 1) ÄÄNI: sama pääte, malli ja asetukset kuin jakso kerrallaan
    // -tilassa (omistaja valitsi v3:n sen ilmaisutagien takia).
    const tavut = await haeApista(lahetetty.teksti, avain, lahde, { malli });
    console.log(`\nAPI (${malli}): ${(tavut / 1024).toFixed(0)} kt → ${lahde}`);
    let tulos = viimeisteleJaMittaa();

    // 2) AIKALEIMAT: pakotettu kohdistus valmiiseen äänitteeseen.
    let aikaleimalahde = AIKALEIMAN_LAHTEET.pakotettu;
    let aaniMalli = malli;
    let kohdistus = null;
    try {
      kohdistus = await haeKohdistus(kohde, puhuttu.teksti, avain);
      const merkkeja = normalisoiAlignment(kohdistus)?.characters?.length ?? 0;
      if (!merkkeja) throw new Error('vastauksessa ei ollut merkkejä');
      console.log(`kohdistus: ${merkkeja} merkkiä, loss ${Number(kohdistus.loss ?? NaN).toFixed(3)}`);
    } catch (virhe) {
      /*
       * VARAREITTI KIRJATAAN, EI VAIHDETA HILJAA. Aikaleimapääte
       * generoi äänen ITSE omalla mallillaan, joten v3:n ilmaisu jää
       * pois — siksi tämä on hätävara ja se näkyy sekä lokissa että
       * manifestissa (aikaleimalahde, malli).
       */
      console.error(`   VIRHE: pakotettu kohdistus ei onnistunut: ${virhe.message}`);
      console.error(`   VARAREITTI: ${AIKALEIMAN_LAHTEET.leimattu} + ${AIKALEIMOJEN_MALLI} — `
        + 'ääni generoidaan uudelleen tällä mallilla, eikä siinä ole v3:n tageja.');
      const uusi = await haeAikaleimoilla(puhuttu.teksti, avain, lahde, {
        malli: AIKALEIMOJEN_MALLI,
      });
      console.log(`API (${AIKALEIMOJEN_MALLI}): ${(uusi.tavut / 1024).toFixed(0)} kt → ${lahde}`);
      kohdistus = uusi.alignment;
      aikaleimalahde = AIKALEIMAN_LAHTEET.leimattu;
      aaniMalli = AIKALEIMOJEN_MALLI;
      tulos = viimeisteleJaMittaa();
    }

    console.log(`valmis: ${tulos.pituus.toFixed(2)} s, `
      + `${tulos.taso === null ? '?' : tulos.taso.toFixed(1)} LUFS → ${kohde}`);
    if (tulos.virheet.length) {
      for (const virhe of tulos.virheet) console.error(`   VIRHE: ${virhe}`);
      return 1;
    }

    const jaksot = aikaleimoiksi(puhuttu, kohdistus, { kesto: tulos.pituus });
    const manifesti = kokoaYhtenaManifesti({
      kaari,
      jasennys: puhuttu,
      jaksot,
      tiedosto: nimi,
      kesto: tulos.pituus,
      malli: aaniMalli,
      tagit: aikaleimalahde === AIKALEIMAN_LAHTEET.pakotettu ? tagit : false,
      aikaleimalahde,
    });
    console.log(`aikaleimat: ${aikaleimalahde} (malli ${aaniMalli})`);
    const manifestiPolku = join(kohdekansio, KERTOMUS_MANIFESTI);
    writeFileSync(manifestiPolku, `${JSON.stringify(manifesti, null, 2)}\n`);
    console.log('');
    for (const jakso of jaksot) {
      console.log(`   ${jakso.tunnus.padEnd(18)} ${(jakso.alku / 1000).toFixed(2)}–`
        + `${(jakso.loppu / 1000).toFixed(2)} s`);
    }

    if (!liput.vienti) {
      console.log(`\nVienti ohitettiin (--ei-vientia): ${kohde} ja ${manifestiPolku}`);
      return 0;
    }
    vieAmpariin(kohde, nimi, kansio);
    vieAmpariin(manifestiPolku, KERTOMUS_MANIFESTI, kansio, 'application/json');
    const { url, koodi } = ampariHead(nimi, kansio);
    console.log(`\nViety ämpäriin: ${url} → HTTP ${koodi ?? '?'}`);
    console.log(`Manifesti viety: ${kansio}/${KERTOMUS_MANIFESTI}`);
    console.log('');
    console.log('KUUNTELE luenta ennen kuin se jää peliin: kertojan sävyn pitää '
      + 'pysyä samana jaksosta toiseen, ja jaksojen rajojen osua puheen taukoihin.');
    return koodi === '200' ? 0 : 1;
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }
}

async function main() {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  if (liput.virhe) {
    console.error(`${liput.virhe}.`);
    console.error('Käyttö: node tools/generoi-linssiluennat.mjs '
      + `[--linssi ${Object.keys(LINSSIT).join('|')}] `
      + '[--kertomus [--yhtena [--malli <id>]]] [--pysakit 1769,1783] '
      + '[--kuiva] [--pakota] [--ei-vientia]');
    process.exit(1);
  }

  // Kaari ladataan vasta nyt: väärä tunnus on jo kaatunut ylempänä.
  const moduuli = await import(LINSSIT[liput.linssi]);
  const kaari = moduuli.LINSSI?.aikajana;
  if (!kaari) {
    console.error(`Linssillä ${liput.linssi} ei ole aikajanakaarta.`);
    process.exit(1);
  }
  const kansio = ampariKansio(kaari);
  if (liput.kertomus && !kaari.kertomus?.length) {
    console.error(`Linssillä ${liput.linssi} ei ole kertomusta (aikajana.kertomus).`);
    process.exit(1);
  }

  // Yhtenäinen luenta on oma ketjunsa: yksi kutsu, yksi tiedosto,
  // aikaleimat manifestiin (ks. YKSI YHTENÄINEN LUENTA).
  if (liput.yhtena) process.exit(await ajaYhtenainen({ kaari, kansio, liput }));

  const { tyot, tuntemattomat } = liput.kertomus
    ? valitseKertomus(kaari, liput.pysakit)
    : valitsePysakit(kaari, liput.pysakit);
  if (tuntemattomat.length) {
    console.error(`Näitä ei ole kaaressa: ${tuntemattomat.join(', ')} `
      + `— tarkista ${LINSSIT[liput.linssi].replace('../', '')}. Ei generoida mitään.`);
    process.exit(1);
  }
  if (!tyot.length) {
    console.error('Yhtään luentaa ei valittu.');
    process.exit(1);
  }

  /*
   * KUIVA AJO: tulostaa mitä generoitaisiin eikä kutsu APIa, ei tee
   * verkkopyyntöjä eikä tarvitse ffmpegiä. Tarkoitettu sen
   * todistamiseen, että jokainen pysäkki osuu omaan tiedostoonsa ja
   * että luettava teksti on se, mitä datassa lukee — väärä nimi
   * huomattaisiin muuten vasta pelissä hiljaisuutena.
   */
  if (liput.kuiva) {
    console.log(`KUIVA AJO (--kuiva) — APIa ei kutsuta, ämpäriin ei viedä. `
      + `Linssi ${liput.linssi}${liput.kertomus ? ' KERTOMUS' : ''}, ${tyot.length} luentaa, `
      + `ääni Viisas Kertoja, malli ${MALLI}.`);
    for (const tyo of tyot) {
      console.log(`${kansio}/${tyo.nimi}  ·  "${tyo.teksti}"`);
      // Mallille lähtevä muoto, jos se eroaa (vuodet sanoina, tauot).
      if (tyo.puhe && tyo.puhe !== tyo.teksti) console.log(`    mallille: "${tyo.puhe}"`);
      /*
       * KERTOMUKSEN TAHTI: jakson merkkimäärä ja siitä laskettu
       * varakesto (14 merkkiä/s). Peli käyttää sitä silloin kun
       * äänitettä ei ole tai sen kestoa ei ehditä lukea, joten sen
       * pitää näkyä kuivassa ajossa — siitä näkee, kuinka pitkä esitys
       * on ilman ääntä.
       */
      if (liput.kertomus) {
        const merkit = tyo.teksti.length;
        console.log(`    ${merkit} merkkiä · varakesto `
          + `${(merkit / KERTOMUKSEN_MERKKIA_SEKUNNISSA).toFixed(1)} s`);
      }
    }
    if (liput.kertomus) {
      const merkit = tyot.reduce((summa, tyo) => summa + tyo.teksti.length, 0);
      console.log(`Esityksen mitta ilman ääntä: `
        + `${(merkit / KERTOMUKSEN_MERKKIA_SEKUNNISSA / 60).toFixed(1)} min `
        + `(${merkit} merkkiä).`);
      console.log(`Manifesti: ${kansio}/${KERTOMUS_MANIFESTI}`);
    }
    console.log(`Kuiva ajo valmis: ${tyot.length} kohdetta, `
      + `${new Set(tyot.map((t) => t.nimi)).size} eri tiedostonimeä.`);
    process.exit(0);
  }

  vaadiTyokalut();
  const avain = vaadiAvain();
  // Ennen ensimmäistäkään maksullista kutsua: kohde ei saa olla repossa.
  const { kohdekansio, raakakansio } = valmisteleKansiot();

  const tyokansio = mkdtempSync(join(tmpdir(), 'linssiluennat-'));
  const valmiit = [];
  /** Kertomuksen manifestia varten: jakson tunnus → kesto sekunteina. */
  const kestot = new Map();
  let ohitettuja = 0;
  let virheita = 0;
  try {
    for (const tyo of tyot) {
      console.log(`\n── ${kansio}/${tyo.nimi}`);
      console.log(`   "${tyo.teksti}"`);

      if (!liput.pakota) {
        const { url, koodi } = ampariHead(tyo.nimi, kansio);
        if (koodi === '200') {
          console.log(`   on jo ämpärissä (${url}) — ohitetaan. --pakota kirjoittaa yli.`);
          ohitettuja += 1;
          continue;
        }
      }

      const kohde = join(kohdekansio, tyo.nimi);
      const lahde = join(raakakansio, `raaka-${tyo.nimi}`);
      // eslint-disable-next-line no-await-in-loop
      const tavut = await haeApista(tyo.puhe, avain, lahde);
      console.log(`   API: ${(tavut / 1024).toFixed(0)} kt → ${lahde}`);

      const { leikattu, mitattu, korjaus } = viimeistele(lahde, kohde, tyokansio);
      console.log(`   leikkaus: ${kestoSekunteina(lahde).toFixed(2)} s → ${leikattu.toFixed(2)} s, `
        + `taso ${mitattu.taso.toFixed(1)} LUFS, korjaus ${korjaus.toFixed(2)} dB`);

      // Kaaren oma puhe (esittely, välinäytös) ja kertomusjakso ovat
      // kokonaisia kappaleita: oma kestokatto.
      const tulos = tarkista(kohde, tyo.vuosi === null ? KAAREN_KESTO_MAX_S : KESTO_MAX_S);
      kestot.set(tyo.avain, Number(tulos.pituus.toFixed(2)));
      console.log(`   valmis: ${tulos.pituus.toFixed(2)} s, `
        + `${tulos.taso === null ? '?' : tulos.taso.toFixed(1)} LUFS → ${kohde}`);
      if (tulos.virheet.length) {
        for (const virhe of tulos.virheet) console.error(`   VIRHE: ${virhe}`);
        virheita += 1;
        // Kelvotonta luentaa ei viedä, mutta tiedosto jää levylle
        // kuunneltavaksi — kutsu on jo maksettu.
        continue;
      }
      valmiit.push(tyo.nimi);
    }

    if (liput.vienti) {
      for (const nimi of valmiit) vieAmpariin(join(kohdekansio, nimi), nimi, kansio);
      /*
       * MANIFESTI ÄMPÄRIIN samaan kansioon kuin luennat. Se kirjoitetaan
       * KOKO kertomuksesta eikä vain tämän ajon jaksoista, jotta
       * osa-ajo ei tyhjennä muiden jaksojen rivejä; kesto on null
       * niille, joita tässä ajossa ei generoitu.
       */
      if (liput.kertomus && valmiit.length) {
        const manifesti = join(kohdekansio, KERTOMUS_MANIFESTI);
        writeFileSync(manifesti, `${JSON.stringify(kokoaKertomusManifesti(kaari, kestot), null, 2)}\n`);
        vieAmpariin(manifesti, KERTOMUS_MANIFESTI, kansio, 'application/json');
        console.log(`Manifesti viety: ${kansio}/${KERTOMUS_MANIFESTI}`);
      }
    }
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (!liput.vienti) {
    console.log('Vienti ohitettiin (--ei-vientia). Tiedostot:');
    for (const nimi of valmiit) console.log(`  ${join(kohdekansio, nimi)}`);
  } else {
    console.log(`Viety ämpäriin: ${valmiit.length}`
      + `${ohitettuja ? `, ohitettu jo olemassa olevia: ${ohitettuja}` : ''}.`);
    for (const nimi of valmiit) {
      const { url, koodi } = ampariHead(nimi, kansio);
      const kunnossa = koodi === '200';
      if (!kunnossa) virheita += 1;
      console.log(`  ${url} → HTTP ${koodi ?? '?'}${kunnossa ? '' : '  ← EI VASTAA'}`);
    }
    console.log('');
    console.log('KUUNTELE luennat ennen kuin ne jäävät peliin: vuosiluvun, nimen ja '
      + 'keksinnön väliin pitää jäädä pieni tauko eikä nimi saa vääntyä.');
  }
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
