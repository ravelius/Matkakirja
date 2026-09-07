/*
 * PALLOLAUDAN SOVITTELU — KAUPUNGIN NIMI ON ENSISIJAINEN, NOSTOJEN
 * LAPUT VÄISTÄVÄT (docs/moduulit/karttapallo.md luku 14).
 *
 * OMISTAJA 7.9.2026 (kuvakaappaus Bukarestista, sanatarkasti):
 * *"kaupungin nimi menee nostojen päälle"*. Kuvassa kaupunkipiste on
 * keskellä, nimi BUKAREST harvennettuna sen alla ja nostot molemmin
 * puolin — ja oikean noston lappu makasi nimen päällä.
 *
 * FABLEN LINJAUS (Raamattu, KAUPUNGIN NIMI NOSTOJEN PAALLA): pallolla
 * kaupungin nimi ja nostojen nimilaput eivät saa mennä päällekkäin.
 * KAUPUNGIN NIMI ON ENSISIJAINEN; nostojen laput väistävät —
 * ensin vaihtoehtoinen ankkuri (toinen kylki), sitten pieni siirto,
 * viimeisenä lappu piilotetaan ja vain ikoni jää, kunnes zoomi riittää.
 *
 * ── MIKSI SOVITTELU ON OMASSA TIEDOSTOSSAAN ────────────────────────
 *
 * Sama päätössarja koskee kahta kerrosta, jotka eivät saa tuntea
 * toisiaan: nimikerros (js/pallolauta/nimet.js) latoo nimet ja on
 * tämän jälkeen KIINTEÄ, nostokerros (js/pallolauta/nostot.js) siirtää
 * omat lappunsa sen ympäriltä. Jos päätös asuisi kummassakin, kaksi
 * ladontaa eriytyisi ensimmäisessä hienosäädössä — sama syy, jolla
 * nimiön asemointi on yhdessä paikassa (js/fokusnosto-symbolit.js
 * nostosymNimioAsemointi).
 *
 * ── PÄÄTÖSJÄRJESTYS (NELJÄ KYLKEÄ, 12 SIIRTOA, SITTEN PIILOTUS) ────
 *
 *   0. OMA KYLKI ILMAN SIIRTOA. Laatta on ladottu käsin (laudan tynkä,
 *      js/fokuskohteet.js ladoMaanTynka), joten oma kylki kunnioitetaan
 *      aina kun se ei törmää — sama sääntö kuin kaupungin nimen omalla
 *      asettelulla (js/karttanimet.js sijoitaKaupunginNimi).
 *   1. KOLME MUUTA KYLKEÄ (NOSTOSYM_NIMIO_KYLJET: oikea, vasen, ylä,
 *      ala). Kylki on kirjaston oma käsite: rasteri paistetaan
 *      kyljittäin ja välimuisti on kylkikohtainen, joten kyljen vaihto
 *      ei maksa uutta mittausta.
 *   2. SAMAT NELJÄ KYLKEÄ PIENELLÄ SIIRROLLA (SOVITTELUN_SIIRTO_PX,
 *      6 px) — kolme suuntaa kylkeä kohti, siis 12 asentoa. Suunnat
 *      ovat kohtisuoraan kylkeä vastaan molemmin puolin ja merkistä
 *      POISPÄIN kyljen omaan suuntaan.
 *      Kohtisuora on se, joka oikeasti auttaa vaakalapun ja vaakanimen
 *      törmäyksessä — pitkän nimikaistan sisällä lapun työntäminen
 *      kaistan suuntaan ei irrota sitä mistään. Siirto
 *      liikuttaa KOKO merkkiä (ikoni + lappu), koska ikoni ja nimiö
 *      ovat yhtä rasteria (js/fokusnosto-symbolit.js
 *      piirraNostosymKartalle) eikä lappua voi irrottaa ikonistaan.
 *      Kuusi pikseliä on kaukana napautuksen 44 px:n säteestä
 *      (js/pallolauta/lauta.js napautaPintaan), joten OSUMA EI SIIRRY:
 *      siirto on vain kuvassa, lat/lng pysyy. Sama myönnytys kuin
 *      kohtaamispisteellä (js/fokuspiste.js fokuspisteenSiirto).
 *   3. LAPPU PIILOON, IKONI JÄÄ. Nosto ei katoa kartalta — se menettää
 *      nimensä siksi aikaa, kun nimi ja lappu eivät mahdu samaan
 *      kohtaan. Ladonta ajetaan uudelleen joka levossa, joten lappu
 *      palaa heti kun zoomi tai panorointi tekee tilaa.
 *
 * ── JÄRJESTYS: LÄHIN KAUPUNKIA ENSIN ───────────────────────────────
 *
 * Laput sovitellaan siinä järjestyksessä, jossa ne ovat lähimpänä
 * jotakin kiinteää nimeä: ahtain paikka saa ensimmäisenä valita, ja
 * väljemmällä on jäljellä enemmän kelvollisia asentoja. Sama peruste
 * kuin nimiladonnan tärkeysjärjestyksellä (tärkein saa ensin valita).
 *
 * ── MIKÄ ON ESTE JA MIKÄ EI ────────────────────────────────────────
 *
 * Este on kiinteä muste: kaupungin nimen laatikko. SIIRRETTY LAPPU
 * lisätään esteisiin, jotta väistö ei työnnä kahta lappua päällekkäin;
 * PAIKALLAAN PYSYNYT lappu ei ole este, koska laattaladonta on jo
 * ratkaissut lappujen keskinäisen järjestyksen (tools/
 * tarkista-nimiolimitys.mjs vartioi sitä) — muuten sovittelu alkaisi
 * sekoittaa käsin hiottua ladontaa ilman että kukaan on sitä pyytänyt.
 */

/** Nimiön kyljet kokeilujärjestyksessä (js/fokusnosto-symbolit.js). */
export const SOVITTELUN_KYLJET = Object.freeze(['oikea', 'vasen', 'yla', 'ala']);
/** Pienen siirron mitta ruudulla (px) — reilusti alle napautussäteen. */
export const SOVITTELUN_SIIRTO_PX = 6;
/** Kyljen oma suunta: merkistä poispäin. */
export const SOVITTELUN_SUUNNAT = Object.freeze({
  oikea: { dx: 1, dy: 0 },
  vasen: { dx: -1, dy: 0 },
  yla: { dx: 0, dy: -1 },
  ala: { dx: 0, dy: 1 },
});

/**
 * Yhden kyljen siirtoehdokkaat: ulos kyljen suuntaan ja kohtisuoraan
 * molempiin suuntiin. Kohtisuora ensin — vaakalappu irtoaa vaakanimen
 * kaistasta pystysuunnassa, ei kaistan suuntaan työntämällä.
 */
export function sovittelunSiirrot(kylki, siirto = SOVITTELUN_SIIRTO_PX) {
  const s = SOVITTELUN_SUUNNAT[kylki] ?? SOVITTELUN_SUUNNAT.oikea;
  const kohti = { dx: -s.dy, dy: s.dx };
  return [
    { dx: kohti.dx * siirto, dy: kohti.dy * siirto },
    { dx: -kohti.dx * siirto, dy: -kohti.dy * siirto },
    { dx: s.dx * siirto, dy: s.dy * siirto },
  ];
}

/** Kelpaako ruutulaatikko ({ x0, y0, x1, y1 }) törmäystestiin. */
export const laatikkoKelpaa = (r) => Boolean(r)
  && Number.isFinite(r.x0) && Number.isFinite(r.y0)
  && Number.isFinite(r.x1) && Number.isFinite(r.y1)
  && r.x1 > r.x0 && r.y1 > r.y0;

/** Kahden ruutulaatikon leikkaus — sama ehto kuin varausruudukossa. */
export const laatikotLimittyvat = (a, b) => laatikkoKelpaa(a) && laatikkoKelpaa(b)
  && a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/** Laatikon keskipiste. */
const keski = (r) => ({ x: (r.x0 + r.x1) / 2, y: (r.y0 + r.y1) / 2 });

/** Lyhin keskipiste-etäisyys laatikosta esteisiin (Infinity, jos ei esteitä). */
export function lahinEste(r, esteet) {
  if (!laatikkoKelpaa(r)) return Infinity;
  const k = keski(r);
  let vahin = Infinity;
  for (const e of esteet) {
    const p = keski(e);
    vahin = Math.min(vahin, Math.hypot(p.x - k.x, p.y - k.y));
  }
  return vahin;
}

/**
 * SOVITTELE LAPUT KIINTEIDEN ESTEIDEN YMPÄRILLE.
 *
 * @param {object} p
 * @param {Array} p.laput  [{ avain, kylki, laatikko(kylki, dx, dy, nimio) }]
 *   `laatikko` palauttaa lapun ruutulaatikon annetussa asennossa tai
 *   null; `nimio` false tarkoittaa pelkkää ikonia.
 * @param {Array} p.esteet kiinteät ruutulaatikot (kaupunkien nimet)
 * @param {number} [p.siirto] pienen siirron mitta px
 * @param {Array}  [p.kyljet] kokeiltavat kyljet
 * @returns {{ asennot: Map, siirretty: number, kylkiVaihtui: number,
 *   piilotettu: number, jaljella: number, kokeiltuja: number }}
 *   `asennot` on avain → { kylki, dx, dy, nimio, syy }; `jaljella` on
 *   niiden lappujen määrä, joiden IKONI jää yhä nimen päälle (ikonia ei
 *   voi piilottaa — nosto katoaisi kartalta).
 */
export function sovitteleLaput({
  laput = [], esteet = [], siirto = SOVITTELUN_SIIRTO_PX, kyljet = SOVITTELUN_KYLJET,
} = {}) {
  const kiinteat = esteet.filter(laatikkoKelpaa);
  const asennot = new Map();
  let siirretty = 0;
  let kylkiVaihtui = 0;
  let piilotettu = 0;
  let jaljella = 0;
  let kokeiltuja = 0;
  const vapaa = (r, muut) => !kiinteat.some((e) => laatikotLimittyvat(r, e))
    && !muut.some((e) => laatikotLimittyvat(r, e));
  // Ahtain ensin: lähin kiinteää nimeä saa valita ensimmäisenä.
  const jono = laput
    .map((l) => ({ l, d: lahinEste(l.laatikko(l.kylki, 0, 0, true), kiinteat) }))
    .sort((a, b) => a.d - b.d)
    .map((rivi) => rivi.l);
  const siirretyt = []; // väistäneiden lappujen laatikot (uudet esteet)
  for (const l of jono) {
    const oma = l.laatikko(l.kylki, 0, 0, true);
    kokeiltuja += 1;
    if (!kiinteat.length || !laatikkoKelpaa(oma)
      || !kiinteat.some((e) => laatikotLimittyvat(oma, e))) {
      asennot.set(l.avain, {
        kylki: l.kylki, dx: 0, dy: 0, nimio: true, syy: 'oma',
      });
      continue;
    }
    let valittu = null;
    // 1. vaihtoehtoinen ankkuri: kolme muuta kylkeä ilman siirtoa.
    for (const k of kyljet) {
      if (k === l.kylki) continue;
      const r = l.laatikko(k, 0, 0, true);
      kokeiltuja += 1;
      if (laatikkoKelpaa(r) && vapaa(r, siirretyt)) {
        valittu = { kylki: k, dx: 0, dy: 0, nimio: true, syy: 'kylki', r };
        break;
      }
    }
    // 2. pieni siirto, kylki kerrallaan (oma kylki ensin).
    if (!valittu) {
      for (const k of [l.kylki, ...kyljet.filter((x) => x !== l.kylki)]) {
        for (const { dx, dy } of sovittelunSiirrot(k, siirto)) {
          const r = l.laatikko(k, dx, dy, true);
          kokeiltuja += 1;
          if (laatikkoKelpaa(r) && vapaa(r, siirretyt)) {
            valittu = {
              kylki: k, dx, dy, nimio: true, syy: 'siirto', r,
            };
            break;
          }
        }
        if (valittu) break;
      }
    }
    if (valittu) {
      siirretty += 1;
      if (valittu.syy === 'kylki') kylkiVaihtui += 1;
      siirretyt.push(valittu.r);
      asennot.set(l.avain, {
        kylki: valittu.kylki, dx: valittu.dx, dy: valittu.dy, nimio: true, syy: valittu.syy,
      });
      continue;
    }
    // 3. lappu piiloon: vain ikoni jää. Ikonille etsitään vielä vapaa
    // asento, mutta sitä ei voi piilottaa — nosto katoaisi kartalta.
    piilotettu += 1;
    let ikoni = { dx: 0, dy: 0, r: l.laatikko(l.kylki, 0, 0, false) };
    if (laatikkoKelpaa(ikoni.r) && kiinteat.some((e) => laatikotLimittyvat(ikoni.r, e))) {
      for (const k of kyljet) {
        const s = SOVITTELUN_SUUNNAT[k];
        const r = l.laatikko(l.kylki, s.dx * siirto, s.dy * siirto, false);
        kokeiltuja += 1;
        if (laatikkoKelpaa(r) && vapaa(r, siirretyt)) {
          ikoni = { dx: s.dx * siirto, dy: s.dy * siirto, r };
          break;
        }
      }
    }

    if (laatikkoKelpaa(ikoni.r) && kiinteat.some((e) => laatikotLimittyvat(ikoni.r, e))) {
      jaljella += 1;
    }
    asennot.set(l.avain, {
      kylki: l.kylki, dx: ikoni.dx, dy: ikoni.dy, nimio: false, syy: 'piilo',
    });
  }
  return {
    asennot, siirretty, kylkiVaihtui, piilotettu, jaljella, kokeiltuja,
  };
}
