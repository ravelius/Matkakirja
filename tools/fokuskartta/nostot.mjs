/*
 * POLTETTAVAT KARTTANOSTOT — koko maailma, kerran, laudan datasta.
 *
 * Tämä on tools/generoi-laattapyramidi.mjs:n moduuli, ei oma
 * työkalunsa; sisarensa on tools/fokuskartta/sisalto.mjs, joka kokoaa
 * pysyvät viivat (reitit ja joet).
 *
 * === MIKSI TÄMÄ ON OLEMASSA ========================================
 *
 * Raamattu (omistaja 31.8.2026, KARTTANOSTOT POLTETAAN LAATTOIHIN):
 * *"mikään karttanostoista ei kuulu kadota laudalta missään vaiheessa
 * peliä, joten ne voidaan aivan hyvin polttaa suoraan karttaan."* —
 * kohdemerkit, niiden symbolit ja nimiöt ovat pysyvää sisältöä eivätkä
 * pelitilaa. (Nostoviivat kuuluivat samaan luetteloon 31.8.2026 asti;
 * ne poistuivat kartalta kokonaan, ks. js/fokusniput.js sääntö 6.)
 *
 * === TÄMÄ EI LASKE LADONTAA ========================================
 *
 * Se KUTSUU pelin omia passeja — samoja funktioita, samassa
 * järjestyksessä ja samoilla luvuilla kuin peli itse — kokoamalla
 * niille tyngän `ui`-oliosta laudan datasta:
 *
 *   merkkirivit         js/fokuskohteet.js  kohdeKarttarivit
 *   kasaus kaupunkeihin js/fokusniput.js    niputaFokusmerkit
 *   erottelusiirto      js/fokuskohteet.js  eritteleKohdeRyhmat
 *   nimiöiden väistö    js/fokuskohteet.js  paivitaKohdeNimiot
 *   mittakaava ja tiiviste  js/nostoladonta.js
 *
 * Raamatun ehto on sanatarkka: *"Poltetun ladonnan ja selaimen
 * osumamuotojen on tultava SAMASTA lähteestä, ettei kahta ladontaa
 * pääse eriytymään."* Tämän tiedoston oma työ on VAIN kahden asian
 * päättäminen:
 *
 *   1. MITKÄ MAAT ovat mukana (ne, joilla on fokuslehden ikkuna).
 *   2. MITKÄ LISÄLÄHTEET ovat poltettavia (syvennystarinat ja
 *      skandaalit aina; täkynostot vain jos maan täkyjoukko on sama
 *      kaupungista riippumatta — ks. TÄKYN EHTO).
 *
 * === TÄKYN EHTO ====================================================
 *
 * Täkypooli luetaan ensin KAUPUNGIN omasta paketista
 * (js/packs/fokusvirrat.js `takynostot`) ja vasta sen puuttuessa
 * maapoolista (js/fokusnosto.js NOSTO_MAAT). Jos saman maan kaksi
 * kaupunkia antavat eri joukon, kartalla oleva täkyjoukko VAIHTUU
 * pelin aikana — ja koska täky menee samaan sarakkeeseen kuin muut
 * merkit (js/fokusniput.js), liittyy ryhmiin jäseneksi
 * ja työntää naapureitaan erottelusiirrolla
 * (js/fokuskohteet.js eritteleKohdeRyhmat), se siirtäisi paljon
 * enemmän kuin oman merkkinsä. Sellaista maata ei voi polttaa
 * lainkaan: SEN JOKAINEN MERKKI jää eläväksi.
 *
 * Lisäehto: täky ILMAN omia koordinaatteja asettuu siihen kaupunkiin,
 * jossa pelaaja sillä hetkellä on (js/fokusnosto.js nostonPaikka).
 * Sellainen täky riittää yksinään estämään maan.
 *
 * Mitattu 31.8.2026: 260 fokuskaupungista 28:lla on oma täkylista, ja
 * ne jakautuvat 26 maahan. Yhden kaupungin maissa (esim. Kroatia,
 * Bulgaria, Itävalta) oma lista ei riko mitään, koska kaupunkeja on
 * vain se yksi. Monen kaupungin maissa (Britannia, Turkki, Ranska,
 * Espanja, Italia, Puola, Ukraina, Venäjä, Suomi, Norja) rikkoo.
 */
import {
  KOHDE_SYMBOLI_SKAALA, eritteleKohdeRyhmat, kohdeKarttarivit, kohdeMerkinLadonta,
  paivitaKohdeNimiot,
} from '../../js/fokuskohteet.js';
import { niputaFokusmerkit } from '../../js/fokusniput.js';
import { nostoladontaSkaala, nostoladontaTiiviste } from '../../js/nostoladonta.js';
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';
import { nostoKarttarivit, nostoKaupunginPooli } from '../../js/fokusnosto.js';
import { skandaaliKarttarivit } from '../../js/skandaalit.js';
import { syvennysKarttarivit } from '../../js/syvennys.js';

/**
 * Maan kaupungit laudan paketista.
 */
function maanKaupungit(pack, iso) {
  const taulu = pack.map?.cityCountry ?? {};
  return (pack.cities ?? []).filter((k) => taulu[k.id] === iso);
}

/**
 * ONKO MAAN TÄKYJOUKKO SAMA KAUPUNGISTA RIIPPUMATTA?
 *
 * Vertailu tehdään poolin TUNNUKSILLA eikä oliolla: `nostoLevitaLunastus`
 * palauttaa uuden taulukon joka kutsulla, joten viittausvertailu antaisi
 * aina "eri".
 *
 * @returns {{ vakaa: boolean, rivit: Array, syy: ?string }}
 */
function maanTakyt(pack, iso, kaupungit) {
  if (!kaupungit.length) return { vakaa: true, rivit: [], syy: null };
  let ensimmainen = null;
  for (const kaupunki of kaupungit) {
    const pooli = nostoKaupunginPooli(iso, kaupunki.id);
    const avain = pooli.map((n) => n.id).join('|');
    if (ensimmainen === null) ensimmainen = avain;
    else if (avain !== ensimmainen) {
      return { vakaa: false, rivit: [], syy: `täkypooli vaihtuu kaupungeittain (${kaupunki.id})` };
    }
  }
  const { rivit, ilmanPaikkaa } = nostoKarttarivit(
    nostoKaupunginPooli(iso, kaupungit[0].id), pack.id,
  );
  if (ilmanPaikkaa) {
    return {
      vakaa: false,
      rivit: [],
      syy: `${ilmanPaikkaa} täkyä ilman omia koordinaatteja`,
    };
  }
  return { vakaa: true, rivit, syy: null };
}

/**
 * YHDEN MAAN LADONTA LAUDAN DATASTA.
 *
 * @param {object} pack   laudan paketti (js/packs/maailmankartta.js)
 * @param {string} iso    maatunnus
 * @param {object} pohja  FOKUS_POHJAT[iso] — `bbox` (lehden ikkuna) ja
 *   `rajaus` (ladonnan mittatikku)
 * @param {Array} lisat   poltettavat lisärivit (syvennystarinat,
 *   skandaalit). TÄKYNOSTOT EIVÄT KUULU TÄNNE — ks. tiedoston alku.
 * @param {boolean} estetty  jos tosi, maan yksikään merkki ei ole
 *   poltettava (maan täkyjoukko ei ole vakaa — ks. tiedoston alku)
 * @returns {{ s:number, merkit:Array }} merkit laudan koordinaateissa
 */
function nostoladontaMerkit({
  pack, iso, pohja, lisat = [], estetty = false,
}) {
  const rajaus = pohja?.rajaus;
  const bbox = pohja?.bbox;
  const s = nostoladontaSkaala(rajaus);
  if (!(s > 0) || !bbox || !pack) return { s: 0, merkit: [] };
  const taulu = pack.map?.cityCountry ?? {};
  const kaupungit = (pack.cities ?? []).filter((k) => taulu[k.id] === iso);
  const pohjanAlla = (x, y) => x >= bbox.x && x <= bbox.x + bbox.w
    && y >= bbox.y && y <= bbox.y + bbox.h;
  const rivit = kohdeKarttarivit({
    iso, lauta: pack.id, kaupungit, pohjanAlla, lisat,
  });
  if (!rivit.length) return { s, merkit: [] };
  /*
   * TYNKÄ `ui`. Kentät ovat täsmälleen ne, joita passit lukevat, ja
   * jokainen niistä on LAUDAN DATAA: ei ruudun kokoa, ei
   * pikselitiheyttä, ei pelin vaihetta. `cityOf` on maan ENSIMMÄINEN
   * kaupunki eikä pelaajan paikka — sitä luetaan vain maatunnuksen
   * päättelyyn (js/fokuskohteet.js nykyinenIso), ja maan jokainen
   * kaupunki antaa siihen saman vastauksen.
   *
   * `kiertoKohdat` palauttaa yhden kohdan: kiertävän laudan toinen
   * kopio on generaattorin asia (laatan bbox voi olla arkin toisella
   * laidalla), eikä ladonta saa riippua siitä, kummasta kopiosta
   * puhutaan.
   */
  const ui = {
    fokusmoodi: true,
    katselu: false,
    game: { pack, cityOf: () => kaupungit[0] ?? null },
    fokusPohjaRajaus: rajaus,
    fokusPohjaBbox: bbox,
    fokusPohjanAlla: pohjanAlla,
    kiertoKohdat: (x) => [x],
    fokuskohdeKaupungit: kaupungit,
    fokuskohdeAvain: `${iso}:poltto`,
    fokuskohdeEroAvain: null,
    fokuskohdeNimioAvain: null,
    fokuskohdeRyhmat: [],
  };
  ui.fokuskohdeRyhmat = rivit.map(({ kohde, paikka }) => ({
    id: kohde.id,
    x: paikka.x,
    y: paikka.y,
    kohde,
    ...kohdeMerkinLadonta(ui, kohde),
  }));
  /*
   * SAMA KOLMEN PASSIN KETJU JA SAMA JÄRJESTYS KUIN PELISSÄ
   * (js/fokuskohteet.js asetaKohdeMittakaava ja paivitaFokuskohteet):
   * kasaus, erottelu, väistö. Järjestys ei ole makuasia — kumpikin
   * jälkimmäinen lukee edellisten tuloksen: erottelu väistää
   * ryppääseen ladottuja merkkejä (31.8.2026) ja väistö lukee
   * merkkien LOPULLISET paikat.
   */
  niputaFokusmerkit(ui, s);
  eritteleKohdeRyhmat(ui, s);
  paivitaKohdeNimiot(ui, s);
  const merkit = [];
  for (const r of ui.fokuskohdeRyhmat) {
    const merkki = {
      tunnus: r.id,
      x: r.nippu?.x ?? r.x + (r.sx ?? 0),
      y: r.nippu?.y ?? r.y + (r.sy ?? 0),
      symboli: r.symboli ?? null,
      laji: r.laji ?? null,
      nimio: r.nimi ?? '',
      /*
       * NÄKYYKÖ NIMIÖ — VÄISTÖPASSIN PÄÄTÖS SELLAISENAAN. Kenttä oli
       * 31.8.2026 asti aina tosi, koska väistö kirjoitti päätöksensä
       * vain DOM-solmullisille riveille eikä generaattorilla ole DOMia;
       * laattaan paloi siis myös ne nimiöt, jotka väistö oli pudottanut
       * (js/fokuskohteet.js paivitaKohdeNimiot, "PÄÄTÖS KIRJOITETAAN
       * TIETUEESEEN ENNEN SOLMUEHTOA").
       */
      nimioNakyy: Boolean(r.nimi) && r.nimioNakyy !== false,
      nimioVasemmalle: Boolean(r.nimioVasemmalle),
      /*
       * KARTAN 18 MERKIN SÄÄNTÖ KOSKEE JOKAISTA NIMIÖTÄ (31.8.2026).
       * Poikkeus oli yhdistetyn merkin pilkkulista, joka oli jo ladottu
       * omaan mittaansa; yhdistely purettiin, joten kenttä on aina
       * epätosi. Se jää luetteloon, koska piirtäjä lukee sen.
       */
      nimioRajaton: r.nimioKatto === Infinity,
      osat: (r.kohde?.osat ?? []).map((osa) => osa.id),
      /*
       * PIIRTOMITTA: lautayksikköä kirjaston yksikköä kohti. Piirtäjä
       * kertoo tämän laatan tarkkuudella (kuvapikseliä lautayksikköä
       * kohti) eikä laske merkin kokoa uudelleen.
       */
      porras: KOHDE_SYMBOLI_SKAALA * s,
      /*
       * NOSTOVIIVAA EI OLE (omistaja 31.8.2026, esityssiirto): merkit
       * latoutuvat kaupungin kylkeen omiksi nostoikseen ilman
       * siirtoviivoja, ks. js/fokusniput.js sääntö 6. Kenttä `viiva`
       * poistui merkeistä kokonaan.
       */
      /*
       * MAA PALAA KOKONAAN TAI EI LAINKAAN (ks. tiedoston alku,
       * TÄKYNOSTOT). Sarakekohtainen esto ei riitä: täky ei siirrä
       * vain oman sarakkeensa rivejä vaan myös naapureitaan
       * erottelusiirrolla (js/fokuskohteet.js eritteleKohdeRyhmat) ja
       * mistä tahansa maan kaupungista. Yksikin epävakaa täky tekee
       * koko maan ladonnasta pelitilasta riippuvan.
       */
      poltettava: !estetty,
    };
    merkki.tiiviste = nostoladontaTiiviste(merkki);
    merkit.push(merkki);
  }
  return { s, merkit };
}

/**
 * KOKO MAAILMAN POLTETTAVAT NOSTOT.
 *
 * @param {object} pack  laudan paketti (js/packs/maailmankartta.js)
 * @returns {{
 *   merkit: Array,     kaikki merkit (myös poltettava:false)
 *   luettelo: object,  tunnus -> tiiviste, VAIN poltetut
 *   tilasto: object
 * }}
 *
 * Merkin kentät ovat laudan yksiköitä ja valmiiksi ladottuja:
 * `x`, `y`, `symboli`, `laji`, `nimio`, `nimioNakyy`, `nimioVasemmalle`,
 * `nimioRajaton` ja `s` (maan merkkiskaala). Piirtäjä
 * (tools/fokuskartta/maailmapiirto.js) ei laske niistä mitään
 * uudelleen — se vain skaalaa ne laatan kuvapikseleiksi.
 */
export function keraaNostot(pack) {
  const merkit = [];
  const luettelo = {};
  const tilasto = {
    maita: 0, maitaEstetty: 0, merkkeja: 0, poltettu: 0, monimaisia: 0, estot: [],
  };
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja.lauta !== pack.id) continue;
    const kaupungit = maanKaupungit(pack, iso);
    const takyt = maanTakyt(pack, iso, kaupungit);
    const lisat = [
      ...syvennysKarttarivit(iso, pack.id, pack.map?.cityCountry)
        .map(({ kohde, paikka }) => ({ kohde, paikka })),
      ...skandaaliKarttarivit(iso, pack.id).map(({ kohde, paikka }) => ({ kohde, paikka })),
      ...takyt.rivit.map(({ kohde, paikka }) => ({ kohde, paikka })),
    ];
    const { s, merkit: maanMerkit } = nostoladontaMerkit({
      pack, iso, pohja, lisat, estetty: !takyt.vakaa,
    });
    if (!maanMerkit.length) continue;
    tilasto.maita += 1;
    if (!takyt.vakaa) {
      tilasto.maitaEstetty += 1;
      tilasto.estot.push(`${iso}: ${takyt.syy}`);
    }
    for (const merkki of maanMerkit) {
      merkit.push({ ...merkki, iso, s });
      tilasto.merkkeja += 1;
    }
  }
  /*
   * === SAMA TUNNUS KAHDESSA MAASSA EI PALA ========================
   *
   * Maastokohteet (js/packs/maastokohteet.js) ovat monen maan yhteisiä:
   * Tonava on Saksan, Itävallan ja Unkarin listalla, Välimeri kuuden
   * maan. Merkki latoutuu silloin KUUSI KERTAA, joka kerta sen maan
   * lehden mittatikulla ja sen maan kaupunkien ympärille — Välimeren
   * merkkiskaala on Ranskassa 0,833 ja Tunisiassa 0,249, ja paikkakin
   * on eri. Pelissä se on oikein, koska kartalla on aina vain sen maan
   * merkit, jossa pelaaja on. Laatassa se olisi väärin: laatta ei tiedä
   * maasta mitään, ja sama merkki olisi poltettuna kuudessa paikassa.
   *
   * Nämä jäävät siis eläviksi. Tunnistus on tunnuksen moninkertaisuus
   * eikä lista maastokohteista: sama sääntö kattaa myös kahden maan
   * saman tunnuksen (Kreikan ja Kyproksen `olympos` ovat eri vuoret
   * samalla tunnuksella) ilman että sitä pitää erikseen tietää.
   */
  const kertoja = new Map();
  for (const merkki of merkit) {
    kertoja.set(merkki.tunnus, (kertoja.get(merkki.tunnus) ?? 0) + 1);
  }
  for (const merkki of merkit) {
    if (merkki.poltettava && kertoja.get(merkki.tunnus) > 1) {
      merkki.poltettava = false;
      tilasto.monimaisia += 1;
    }
    if (merkki.poltettava) {
      luettelo[merkki.tunnus] = merkki.tiiviste;
      tilasto.poltettu += 1;
    }
  }
  return { merkit, luettelo, tilasto };
}

/** Yhteenvetorivi ajon lokiin. */
export function nostojenYhteenveto(tilasto) {
  return `  nostot          ${tilasto.merkkeja} merkkiä ${tilasto.maita} maasta, `
    + `poltetaan ${tilasto.poltettu}`
    + (tilasto.maitaEstetty ? ` · ${tilasto.maitaEstetty} maata estetty (täky)` : '')
    + (tilasto.monimaisia ? ` · ${tilasto.monimaisia} monen maan merkkiä eläväksi` : '');
}
