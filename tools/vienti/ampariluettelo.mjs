/*
 * ÄMPÄRILUETTELO (Julkaisija 28.10.2026, omistajan päätös klo 12.28: R2-kulut alas, HEAD-pyynnöt pois työkaluista).
 *
 * Paikallinen luettelo ämpärin objekteista: rivi = avain<TAB>koko<TAB>etag. Mac Studiolla se rakennetaan
 * ListObjectsV2-sivutuksella (/Users/Shared/Claude/julkaisija-tyokalut/rakenna-luettelo.zsh, 1000 avainta / pyyntö)
 * ja vie-paketti.sh lisää viemänsä avaimet tiedostoon <luettelo>.lisays.tsv. CI:ssä luettelo voi olla yhden
 * etuliitteen listaus (`aws s3api list-objects-v2 --prefix … --query 'Contents[].[Key,Size,ETag]' --output text`).
 *
 * Työkalut kysyvät tästä koot ja olemassaolon HEAD-pyyntöjen sijaan (HEAD julkiseen osoitteeseen = R2:n
 * HeadObject välimuistin ohi). Avain, jota luettelossa ei ole, tarkistetaan työkalussa edelleen verkosta, joten
 * vanhentunut luettelo ei tee vääriä hälytyksiä. Ympäristömuuttuja AMPARI_LUETTELO vaihtaa oletuspolun;
 * AMPARI_LUETTELO=pois ohittaa luettelon kokonaan (pelkät HEAD-pyynnöt kuten ennen).
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createInterface } from 'node:readline';

export const OLETUSLUETTELO = '/Users/Shared/Claude/julkaisija-tyokalut/amparin-luettelo.tsv';
export const JULKINEN = 'https://media.matkakirja.app/';

/** Käytettävä luettelotiedosto tai null (ei luetteloa tällä koneella / ohitettu). */
export function luettelonPolku(polku = process.env.AMPARI_LUETTELO || OLETUSLUETTELO) {
  if (!polku || polku === 'pois') return null;
  return existsSync(polku) ? polku : null;
}

/** Luettelon ikä tunteina (päätiedoston muokkausajasta), null jos ei luetteloa. */
export function luettelonIka(polku = luettelonPolku()) {
  return polku ? (Date.now() - statSync(polku).mtimeMs) / 3.6e6 : null;
}

/** Julkisen osoitteen ämpäriavain (kysely ja ankkuri pois, %-koodaus auki) tai null, jos osoite ei ole ämpärin. */
export function avainOsoitteesta(url, juuri = JULKINEN) {
  if (typeof url !== 'string' || !url.startsWith(juuri)) return null;
  const polku = url.slice(juuri.length).split(/[?#]/)[0];
  try { return decodeURIComponent(polku); } catch { return polku; }
}

/** Rivi → [avain, koko] (tai null). Hyväksyy myös aws:n text-tulosteen ETagin lainausmerkkeineen. */
export function jasennaRivi(rivi) {
  const osat = rivi.split('\t');
  if (osat.length < 2 || !osat[0] || osat[0] === 'None') return null;
  const koko = Number(osat[1]);
  return Number.isFinite(koko) ? [osat[0], koko] : null;
}

/**
 * Hakee luettelosta annettujen avainten koot: Map avain → tavut (vain löytyneet). Lukee luettelon ja sen
 * .lisays.tsv-tiedoston virtana, joten muistiin jää vain kysytty joukko (luettelossa on miljoonia rivejä).
 * Palauttaa null, jos luetteloa ei ole.
 */
export async function luettelonKoot(avaimet, { polku = luettelonPolku() } = {}) {
  if (!polku) return null;
  const haetut = avaimet instanceof Set ? avaimet : new Set(avaimet);
  const koot = new Map();
  for (const tiedosto of [polku, `${polku.replace(/\.tsv$/, '')}.lisays.tsv`, `${polku.replace(/\.tsv$/, '')}.lisays.tsv.vanha`]) {
    if (!existsSync(tiedosto)) continue;
    const rivit = createInterface({ input: createReadStream(tiedosto, { encoding: 'utf8' }), crlfDelay: Infinity });
    for await (const rivi of rivit) {
      const r = jasennaRivi(rivi);
      if (r && haetut.has(r[0])) koot.set(r[0], r[1]);
    }
  }
  return koot;
}

/**
 * Osoitelistan koot luettelosta: Map url → tavut niille osoitteille, joiden avain on luettelossa.
 * null, jos luetteloa ei ole. Muut osoitteet (ei luettelossa, ei ämpärin) jäävät kutsujan verkkotarkistukseen.
 */
export async function osoitteidenKoot(osoitteet, { polku = luettelonPolku(), juuri = JULKINEN } = {}) {
  if (!polku) return null;
  const avaimet = new Map();
  for (const u of osoitteet) { const a = avainOsoitteesta(u, juuri); if (a) avaimet.set(u, a); }
  const koot = await luettelonKoot(new Set(avaimet.values()), { polku });
  const ulos = new Map();
  for (const [u, a] of avaimet) if (koot.has(a)) ulos.set(u, koot.get(a));
  return ulos;
}

/**
 * Kaikki luettelon avaimet, jotka alkavat jollakin etuliitteellä: Map avain → tavut (laattasarjojen mittaukseen,
 * jossa osoitteita on kymmeniätuhansia). null, jos luetteloa ei ole.
 */
export async function luettelonEtuliitteet(etuliitteet, { polku = luettelonPolku() } = {}) {
  if (!polku) return null;
  const etu = [...new Set(etuliitteet)].filter(Boolean);
  const koot = new Map();
  for (const tiedosto of [polku, `${polku.replace(/\.tsv$/, '')}.lisays.tsv`, `${polku.replace(/\.tsv$/, '')}.lisays.tsv.vanha`]) {
    if (!existsSync(tiedosto)) continue;
    const rivit = createInterface({ input: createReadStream(tiedosto, { encoding: 'utf8' }), crlfDelay: Infinity });
    for await (const rivi of rivit) {
      if (!etu.some((e) => rivi.startsWith(e))) continue;
      const r = jasennaRivi(rivi);
      if (r) koot.set(r[0], r[1]);
    }
  }
  return koot;
}
