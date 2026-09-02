/*
 * ONKO JOKAINEN KARTTANOSTO JOLLAIN KARTALLA?
 *
 * === OMISTAJAN SÄÄNTÖ (2.9.2026, sanatarkasti) =====================
 *
 * *"lisää kaikki historian hetket ja muut karttanostot myös joko
 * pääkarttanäkymään tai sitten kaupunkilehden kaupunkikartalle, ellei
 * näin ole jo tehty."*
 *
 * Lehtisivu ei siis koskaan ole noston AINOA paikka. Sääntö syntyi
 * siitä, että kolme erillistä siirtoerää oli vienyt nostoja lehteen ja
 * jokainen niistä oli oikeassa omalla perusteellaan:
 *
 *   v1419  kaupunkinostojen katto (js/fokuskohteet.js
 *          karsiKaupunkiruuhka): kohdekaupungin ympärille jää
 *          enintään kolme merkkiä, muiden sisältö siirtyy
 *          kaupunkilehteen.
 *   v1421, v1427, v1451  karsittujen sisältö kaupunki- ja maalehtiin
 *          ("KARTALTA LEHTEEN" -lohkot js/packs/kulttuuri-kategoriat.js
 *          ja js/packs/maa-kategoriat.js).
 *   v1453  Historian hetkien sijoitussääntö: kohdekaupungin lähelle
 *          osuva hetki asuu vain lehdessä.
 *
 * Yhdessä ne jättivät 65 nostoa ja 8 hetkeä pelkkään lehteen. Tämä
 * työkalu laskee saman asian koneellisesti, jotta tilanne ei voi
 * hiljaa palata: tests/nostot-kartalla.test.mjs kutsuu näitä samoja
 * funktioita ja kaatuu, jos yksikin nosto jää ilman karttapaikkaa.
 *
 * === MIKÄ ON "KARTTAPAIKKA" ========================================
 *
 * Kaksi hyväksyttyä paikkaa, sama järjestys kuin omistajan lauseessa:
 *
 *   1. PÄÄKARTTA. Nosto selviää kaupunkikatosta, eli se on rivi, jonka
 *      js/fokuskohteet.js kohdeKarttarivit palauttaa laudan kaupungit
 *      annettuna. Katon ohittaa myös nosto, joka on merkitty
 *      `kattoVapaa: true` — ks. sen perustelu js/fokuskohteet.js:stä.
 *   2. KAUPUNKILEHDEN KOHDEKARTTA. Kaupungin kartalla
 *      (js/packs/maakartat.js KAUPUNKIKARTAT) on piste, jonka juttu
 *      (js/packs/nahtavyysjutut.js) kantaa kenttää `nosto: '<tunnus>'`.
 *      Juttu on joko pisteen oma (avain = pisteen nimi) tai pisteen
 *      `samassa`-listassa nimetty rinnakkaisjuttu, kun kaksi nostoa
 *      seisoo samassa paikassa.
 *
 * LINKITYS ON TUNNUKSELLA EIKÄ NIMELLÄ. Nimivertailu ei toimi:
 * karsittu nosto `moskeijat` on kartalla nimellä "Banja Bashin
 * moskeija" ja `syvennys-sofia-areena` nimellä "Serdican areena".
 * Kenttä `nosto` on siksi pakollinen linkki, ja tämä työkalu lukee
 * vain sitä.
 *
 * === KOLMAS KYSYMYS: KAUPUNGIN KOHDALLA OLEVAT NOSTOT =============
 *
 * Omistaja 2.9.2026 illalla, kolmatta kertaa sanottuna: *"nuo
 * karttanostot jotka ovat kohdekaupunkien kohdalla piti viedä pois
 * pääkartalta ja jättää vain kaupunkilehden sisällä olevaan
 * kaupunkikartalle."* Sääntö ajaa js/fokuskohteet.js:ssä
 * (karsiKaupunkikartanNostot): kohdekartan pisteeseen linkitetty nosto
 * ei ole pääkartalla. Tämä työkalu vastaa toiseen suuntaan: MITKÄ
 * kaupungin kohdalla olevat nostot ovat yhä pääkartalla, ja miksi
 * kukin niistä ei ole voinut siirtyä. Mitta on
 * KAUPUNGIN_KOHDALLA_SADE (js/fokuskohteet.js), ja syitä on viisi:
 *
 *   kohdekarttaa ei ole          kaupungilla ei ole kaupunkikarttaa
 *   rajauksen ulkopuolella       nosto on kaupungin lähialueella, ei
 *                                sen kartalla (Vitoša, Wieliczka)
 *   ankkuri on kaupungin laatta  nostolla ei ole omaa osoitetta
 *   kartan oma kohde             sisältö on fokuskohteen kortissa
 *                                eikä sitä ole vielä siirretty
 *                                kohdekartan pisteelle
 *   hetki                        Historian hetken kortti ei mahdu
 *                                kohdekartan nähtävyysikkunaan
 *
 * === POIKKEUKSET ===================================================
 *
 * Nosto saa jäädä pelkkään lehteen vain, jos se on merkitty datassa
 * `kartanUlkopuolella: true` -kentällä JA sille on kirjoitettu syy.
 * Ainoa nykyinen tapaus on Amundsenin etelänapa: piste on laudan
 * eteläreunan takana, eikä sitä voi projisoida mihinkään.
 *
 * === KÄYTTÖ ========================================================
 *
 *   node tools/tarkista-nostopaikat.mjs          # koko raportti
 *   node tools/tarkista-nostopaikat.mjs --lyhyt  # vain puuttuvat
 *
 * Paluuarvo 1, jos yksikin nosto on ilman karttapaikkaa.
 */
import { KAUPUNGIN_KOHDALLA_SADE, kohdeKarttarivit } from '../js/fokuskohteet.js';
import { FOKUS_LAUTAPROJEKTIOT, FOKUS_POHJAT } from '../js/packs/fokus-grc.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { nostoKarttarivit, nostoKaupunginPooli } from '../js/fokusnosto.js';
import { skandaaliKarttarivit } from '../js/skandaalit.js';
import { syvennysKarttarivit } from '../js/syvennys.js';
import { hetkiKarttarivit } from '../js/historian-hetket.js';
import { HISTORIAN_HETKET } from '../js/packs/historian-hetket.js';
import { KAUPUNKIKARTAT, karttaKuvasuhde, karttapiste, ydinAla } from '../js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from '../js/packs/nahtavyysjutut.js';

/* ==================== LAUDAN KÄÄNTEISPROJEKTIO ==================== */

const RAD = Math.PI / 180;

/**
 * LAUDAN PISTE ASTEIKSI — projisoiLaudalle takaperin.
 *
 * Karsitun noston lähde voi olla kolmea eri lajia (syvennystarina,
 * skandaali, täkynosto) tai kartan oma kohde, ja vain kolmella
 * ensimmäisellä on asteet datassa: kohteella on pelkät laudan
 * koordinaatit (`laudat`). Yksi käänteiskaava antaa kaikille saman
 * vastauksen, joten kohdekartan rajaustarkistus ei riipu siitä, mistä
 * pakasta nosto sattuu tulemaan.
 *
 * Kaava on js/fokusmitat.js teeProjektionKaavat -funktion `lat`/`lon`
 * sellaisenaan; ne eivät ole vientejä, joten Millerin lieriö on tässä
 * auki kirjoitettuna. Laudan koordinaatit on pyöristetty kymmenesosaan
 * yksikköä, joten asteisiin jää ~0,001° epätarkkuus — kohdekartan
 * rajauksen kokoon (0,02–0,15°) nähden merkityksetön.
 */
function laudaltaAsteiksi(lauta, x, y) {
  const p = FOKUS_LAUTAPROJEKTIOT[lauta];
  if (p?.tyyppi !== 'miller') return null;
  const skaala = p.leveys / (2 * Math.PI);
  const millerY = (lat) => -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD));
  const yPohjoinen = millerY(p.pohjoinen);
  return {
    lon: p.lon0 + (x / skaala) / RAD,
    lat: (Math.atan(Math.exp(-((y / skaala) + yPohjoinen) / 1.25)) - Math.PI / 4) / 0.4 / RAD,
  };
}

/* ==================== KOHDEKARTAN LINKIT ==================== */

/**
 * KOHDEKARTTOJEN NOSTOLINKIT: tunnus → { kaupunki, piste, juttu }.
 *
 * Luetaan PISTEEN kentästä `nosto` eikä nimistä (ks. tiedoston alku).
 * Kenttä on merkkijono tai lista, koska yksi piste voi kantaa useamman
 * karsitun noston silloin, kun ne ovat samaa kohdetta.
 *
 * Piste on kelvollinen paikka vain, jos se on NAPAUTETTAVA: sillä on
 * oma nähtävyysjuttu tai wiki-artikkeli. Merkki ilman kumpaakaan olisi
 * pelaajalle täplä, jolle ei tapahdu mitään, eikä nosto olisi silloin
 * oikeasti kartalla.
 */
export function kohdekarttojenNostot() {
  const linkit = new Map();
  for (const [kaupunki, kartta] of Object.entries(KAUPUNKIKARTAT)) {
    const jutut = NAHTAVYYSJUTUT[kaupunki] ?? {};
    for (const piste of kartta.kohteet ?? []) {
      if (!piste.nosto) continue;
      const juttu = jutut[piste.nimi] ?? null;
      const avattava = Boolean(juttu?.teksti || piste.teksti || piste.wiki);
      const tunnukset = Array.isArray(piste.nosto) ? piste.nosto : [piste.nosto];
      for (const tunnus of tunnukset) {
        linkit.set(tunnus, {
          kaupunki, piste: piste.nimi, juttu: juttu ? piste.nimi : null, avattava,
        });
      }
    }
  }
  return linkit;
}

/* ==================== PÄÄKARTAN NOSTOT ==================== */

/**
 * PÄÄKARTAN NOSTOT YHDELTÄ LAUDALTA, ENNEN JA JÄLKEEN KAUPUNKIKATON.
 *
 * Sama passi ja samat lisälähteet kuin pelissä ja laattageneraattorissa
 * (tools/fokuskartta/nostot.mjs): kohdeKarttarivit ajetaan kahdesti,
 * ensin ILMAN kaupunkeja (jolloin karsiKaupunkiruuhka ohittuu omalla
 * ehdollaan) ja sitten kaupunkien kanssa. Erotus on täsmälleen se,
 * minkä katto pudottaa — laskettuna pelin omalla koodilla eikä
 * jäljitelmällä.
 *
 * TÄKYPOOLI luetaan maan ensimmäisen kaupungin poolista, kuten
 * generaattorissa. Jos maan kaupungit antaisivat eri poolin, kartalla
 * näkyvä joukko vaihtuisi pelin aikana; se on generaattorin oma este
 * eikä muuta tämän tarkistuksen kysymystä (onko nostolla paikka
 * jollain kartalla).
 */
export function paakartanNostot(pack = MAAILMANKARTTA) {
  const cc = pack.map?.cityCountry ?? {};
  const kaikki = [];
  const kartalla = new Set();
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja.lauta !== pack.id) continue;
    const { bbox } = pohja;
    if (!bbox) continue;
    const kaupungit = (pack.cities ?? []).filter((k) => cc[k.id] === iso);
    const pohjanAlla = (x, y) => x >= bbox.x && x <= bbox.x + bbox.w
      && y >= bbox.y && y <= bbox.y + bbox.h;
    const takyPooli = kaupungit.length ? nostoKaupunginPooli(iso, kaupungit[0].id) : [];
    const lisat = [
      ...syvennysKarttarivit(iso, pack.id, cc),
      ...skandaaliKarttarivit(iso, pack.id),
      ...nostoKarttarivit(takyPooli, pack.id).rivit,
      ...hetkiKarttarivit(iso, pack.id),
    ].map(({ kohde, paikka }) => ({ kohde, paikka }));
    const ilmanKattoa = kohdeKarttarivit({
      iso, lauta: pack.id, kaupungit: [], pohjanAlla, lisat,
    });
    const katonJalkeen = kohdeKarttarivit({
      iso, lauta: pack.id, kaupungit, pohjanAlla, lisat,
    });
    for (const rivi of katonJalkeen) kartalla.add(rivi.kohde.id);
    for (const rivi of ilmanKattoa) {
      let lahin = null;
      for (const c of kaupungit) {
        const d = Math.hypot(rivi.paikka.x - c.x, rivi.paikka.y - c.y);
        if (!lahin || d < lahin.etaisyys) lahin = { etaisyys: d, kaupunki: c.id };
      }
      kaikki.push({
        iso,
        id: rivi.kohde.id,
        nimi: rivi.kohde.nimi,
        tyyppi: rivi.kohde.tyyppi ?? null,
        kaupunki: lahin?.kaupunki ?? null,
        etaisyys: lahin?.etaisyys ?? null,
        kattoVapaa: Boolean(rivi.kohde.kattoVapaa),
        ...(laudaltaAsteiksi(pack.id, rivi.paikka.x, rivi.paikka.y) ?? {}),
      });
    }
  }
  return { kaikki, kartalla };
}

/* ==================== KOHDEKARTAN MITAT ==================== */

/**
 * OSUUKO PISTE KOHDEKARTAN LEPOTILAN NÄKYMÄÄN?
 *
 * Mitta on `rajat` eikä `piirtoRajat`: reunus on lisää karttaa
 * zoomaajalle, ei uusi paikka kohteille, ja
 * tests/karttareunus.test.mjs vaatii jokaisen kohdepisteen olevan
 * lepotilan näkymässä. Reunukselle osuva nosto (Wienin Prater, Rooman
 * Avaimenreikä) ei siis mahdu kohdekartalle, vaan sen paikka on
 * pääkartalla.
 */
export function kohdekartallaSisalla(kartta, lat, lon) {
  const rajat = kartta?.rajat;
  if (!rajat) return false;
  return lat <= rajat.pohjoinen && lat >= rajat.etela
    && lon >= rajat.lansi && lon <= rajat.ita;
}

/*
 * Merkin karkea ala ja kehyksen leveys pikseleinä — samat luvut kuin
 * tools/tarkista-karttapisteet.mjs:n päällekkäisyysmitassa, jotta kaksi
 * työkalua ei anna samasta parista eri lukua.
 */
const KOTELO = 360;
const YMPYRA = 24;

/**
 * KAHDEN KOHDEKARTAN PISTEEN PEITTOASTE 0–1.
 *
 * Sama kaava kuin tools/tarkista-karttapisteet.mjs:ssä: 24 × 24 px:n
 * merkkiruutujen leikkaus jaettuna ruudun alalla. Yli 0,6 on siellä
 * "HARKITSE KOHTEEN VAIHTOA"; tässä se on raja, jonka yli nosto ei saa
 * omaa pistettä vaan liitetään emopisteen rinnakkaisjutuksi.
 */
export function pisteidenPeitto(kartta, a, b) {
  const ydin = ydinAla(kartta);
  const lava = (KOTELO * 100) / ydin.leveys;
  const lavaKorkeus = lava * karttaKuvasuhde(kartta.piirtoRajat ?? kartta.rajat);
  const dx = Math.abs(((a.x - b.x) / 100) * lava);
  const dy = Math.abs(((a.y - b.y) / 100) * lavaKorkeus);
  if (dx >= YMPYRA || dy >= YMPYRA) return 0;
  return ((YMPYRA - dx) * (YMPYRA - dy)) / (YMPYRA * YMPYRA);
}

/* ==================== KOKO AUDIT ==================== */

/**
 * JOKAISEN NOSTON KARTTAPAIKKA.
 *
 * @returns {{ rivit: Array, puuttuvat: Array }} rivin kentät:
 *   id, nimi, kaupunki, lat, lon, paakartalla, kohdekartalla, poikkeus
 */
export function nostojenKarttapaikat(pack = MAAILMANKARTTA) {
  const { kaikki, kartalla } = paakartanNostot(pack);
  const linkit = kohdekarttojenNostot();
  const rivit = kaikki.map((n) => ({
    ...n,
    paakartalla: kartalla.has(n.id),
    kohdekartalla: linkit.get(n.id) ?? null,
    poikkeus: null,
  }));
  /*
   * HISTORIAN HETKET, JOTKA EIVÄT TUOTA KARTTARIVIÄ LAINKAAN.
   * `kartalla: false` -hetkellä ei ole merkkiä pääkartalla, joten sitä
   * ei löydy yltä; se on silti nosto ja sitä koskee sama sääntö.
   */
  const tunnetut = new Set(rivit.map((r) => r.id));
  for (const hetki of HISTORIAN_HETKET) {
    const id = `hetki-${hetki.id}`;
    if (tunnetut.has(id)) continue;
    rivit.push({
      iso: hetki.iso,
      id,
      nimi: hetki.nimio ?? hetki.otsikko,
      tyyppi: 'hetki',
      kaupunki: null,
      etaisyys: null,
      lat: hetki.lat,
      lon: hetki.lon,
      paakartalla: false,
      kohdekartalla: linkit.get(id) ?? null,
      poikkeus: hetki.kartanUlkopuolella ? (hetki.kartanUlkopuolellaSyy ?? 'syytä ei kirjattu') : null,
    });
  }
  const puuttuvat = rivit.filter(
    (r) => !r.paakartalla && !r.kohdekartalla && !r.poikkeus,
  );
  for (const r of rivit) r.kaupunginKohdalla = kaupunginKohdallaSyy(r);
  const kesken = rivit.filter((r) => r.paakartalla && r.kaupunginKohdalla);
  return { rivit, puuttuvat, kesken };
}

/**
 * ONKO NOSTO KAUPUNGIN KOHDALLA — JA JOS ON, MIKSI SE ON YHÄ
 * PÄÄKARTALLA?
 *
 * Palauttaa null, kun nosto ei ole kaupungin kohdalla, ja muuten syyn
 * (ks. tiedoston alun luettelo). Mitta on KAUPUNGIN_KOHDALLA_SADE
 * TAI kohdekartan rajaus — kumpi tahansa riittää, kuten säännössä.
 * Syy on koneellinen luokitus eikä mielipide: jokainen sen arvo kertoo,
 * mitä nostolle pitäisi tehdä, jotta se pääsisi kohdekartalle.
 */
export function kaupunginKohdallaSyy(r) {
  if (!r.kaupunki) return null;
  const kartta = KAUPUNKIKARTAT[r.kaupunki];
  const asteilla = Number.isFinite(r.lat) && Number.isFinite(r.lon);
  const rajauksessa = Boolean(kartta) && asteilla && kohdekartallaSisalla(kartta, r.lat, r.lon);
  const sateella = Number.isFinite(r.etaisyys) && r.etaisyys < KAUPUNGIN_KOHDALLA_SADE;
  if (!rajauksessa && !sateella) return null;
  if (!kartta) return 'kohdekarttaa ei ole';
  if (r.tyyppi === 'hetki') return 'hetki';
  if (!rajauksessa) return 'rajauksen ulkopuolella';
  if (Number.isFinite(r.etaisyys) && r.etaisyys < 0.05) return 'ankkuri on kaupungin laatta';
  if (r.id.startsWith('syvennys-') || r.id.startsWith('skandaali-') || r.id.startsWith('nosto-')) {
    return 'nosto ilman kohdekartan pistettä';
  }
  return 'kartan oma kohde';
}

/* ==================== KOMENTORIVI ==================== */

if (import.meta.url === `file://${process.argv[1]}`) {
  const lyhyt = process.argv.includes('--lyhyt');
  const { rivit, puuttuvat, kesken } = nostojenKarttapaikat();
  const kaupungeittain = new Map();
  for (const r of rivit) {
    const avain = r.kaupunki ?? '(ei kaupunkia)';
    if (!kaupungeittain.has(avain)) kaupungeittain.set(avain, []);
    kaupungeittain.get(avain).push(r);
  }
  let paalla = 0;
  let kohteilla = 0;
  for (const [kaupunki, lista] of [...kaupungeittain].sort()) {
    const naytettavat = lyhyt
      ? lista.filter((r) => !r.paakartalla && !r.kohdekartalla)
      : lista;
    if (!naytettavat.length) continue;
    console.log(`\n== ${kaupunki}`);
    for (const r of naytettavat) {
      const paikka = r.paakartalla
        ? 'pääkartta'
        : (r.kohdekartalla
          ? `kohdekartta ${r.kohdekartalla.kaupunki}/${r.kohdekartalla.juttu}`
          : (r.poikkeus ? `POIKKEUS: ${r.poikkeus}` : 'PUUTTUU'));
      console.log(`   ${r.id.padEnd(38)} ${String(r.nimi).padEnd(26)} ${paikka}`);
    }
  }
  for (const r of rivit) {
    if (r.paakartalla) paalla += 1;
    else if (r.kohdekartalla) kohteilla += 1;
  }
  console.log(`\nnostoja ${rivit.length}: pääkartalla ${paalla}, `
    + `kohdekartalla ${kohteilla}, poikkeuksia ${rivit.filter((r) => r.poikkeus).length}, `
    + `ILMAN PAIKKAA ${puuttuvat.length}`);
  /*
   * KAUPUNGIN KOHDALLA OLEVIEN TYÖLISTA. Nämä ovat yhä pääkartalla
   * kaupungin päällä; syy kertoo, mitä kunkin siirto vaatisi.
   */
  const syyttain = new Map();
  for (const r of kesken) {
    if (!syyttain.has(r.kaupunginKohdalla)) syyttain.set(r.kaupunginKohdalla, []);
    syyttain.get(r.kaupunginKohdalla).push(r);
  }
  console.log(`\nkaupungin kohdalla (säde ${KAUPUNGIN_KOHDALLA_SADE}) ja yhä pääkartalla: ${kesken.length}`);
  for (const [syy, lista] of [...syyttain].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`   ${String(lista.length).padStart(3)}  ${syy}`);
    for (const r of lista) console.log(`        ${r.kaupunki}/${r.id}`);
  }
  process.exitCode = puuttuvat.length ? 1 : 0;
}
