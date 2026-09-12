import { laskeSha256, tekstinSha256 } from './luentareaktiot.js';
import { haeAani } from './media.js';
import { LIVIAN_PILOTIN_REVISION, livianPilottityo } from './livia-pilotti-cuet.js';
import { kytkeLivianPuheEleet, tarkistaLivianPuheEleet } from './livia-puheleet.js';

/* Tarkistetut lupaukset osoitteittain. Null on tarkoituksellinen hiljaisuus. */
const pilottiVarasto = new Map();

export function livianEleidenOsoite(aaniOsoite) {
  const osoite = String(aaniOsoite ?? '');
  return /\.mp3(?:\?|$)/.test(osoite) ? osoite.replace(/\.mp3(?=\?|$)/, '.eleet.json') : null;
}

/**
 * Yksi validaattori sekä runtimeen että kohdistustyökalun kirjoitusporttiin.
 * JSON kelpaa vain täsmälleen kortin cueille, pakin tekstille ja soivalle mp3:lle.
 */
export async function tarkistaLivianPilottiData(data,
  { kaupunki, kentta = 'kommentti', kupla = 0, teksti, aani } = {}) {
  const hylkaa = (syy) => ({ ok: false, syy });
  const tyo = livianPilottityo(kaupunki, kentta, kupla);
  if (!tyo) return hylkaa('ei ole pilotin city-3-kommentti');
  if (!data || typeof data !== 'object' || data.versio !== 1) return hylkaa('tuntematon tiedostoversio');
  if (data.revision !== LIVIAN_PILOTIN_REVISION || data.kaupunki !== tyo.kaupunki || data.avain !== tyo.avain) {
    return hylkaa('revision, kaupunki tai avain ei täsmää');
  }
  const puhdas = String(teksti ?? '');
  if (!puhdas || data.teksti !== puhdas) return hylkaa('teksti ei ole sama kuin näkyvässä pakissa');
  const tekstiSha = await tekstinSha256(puhdas);
  if (!tekstiSha || tekstiSha !== tyo.tekstiSha256 || data.tekstiSha256 !== tekstiSha) {
    return hylkaa('tekstin SHA-256 ei täsmää');
  }
  if (!aani || !Number.isInteger(aani.tavut) || aani.tavut <= 0 || !/^[0-9a-f]{64}$/.test(aani.sha256 ?? '')) {
    return hylkaa('soivan mp3:n tunnusluvut puuttuvat');
  }
  if (data.aani?.nimi !== tyo.aaniNimi || data.aani?.tavut !== aani.tavut || data.aani?.sha256 !== aani.sha256) {
    return hylkaa('mp3:n nimi, tavut tai SHA-256 eivät täsmää');
  }
  if (!Array.isArray(data.eleet) || data.eleet.length !== tyo.cuet.length) return hylkaa('cuejen määrä ei täsmää');
  for (let i = 0; i < tyo.cuet.length; i += 1) {
    const odotus = tyo.cuet[i];
    const oma = data.eleet[i];
    if (oma?.id !== odotus.id || oma?.ankkuri !== odotus.ankkuri
      || oma?.esiintyma !== odotus.esiintyma || oma?.tarkoitus !== odotus.tarkoitus
      || oma?.voimakkuus !== odotus.voimakkuus) return hylkaa(`cue ${odotus.id} ei täsmää`);
  }
  const eleet = tarkistaLivianPuheEleet(data.eleet);
  return eleet.length === data.eleet.length ? { ok: true, eleet } : hylkaa('cueajat eivät kelpaa');
}

/** 404, verkkovirhe ja vanha data palautuvat hiljaisuutena. */
export async function lataaLivianPilottiEleet(kaupunki, aaniOsoite,
  { kentta = 'kommentti', kupla = 0, teksti = '' } = {}) {
  const tyo = livianPilottityo(kaupunki, kentta, kupla);
  const eleOsoite = tyo ? livianEleidenOsoite(aaniOsoite) : null;
  if (!eleOsoite) return null;
  const avain = `${eleOsoite}|${tyo.tekstiSha256}`;
  if (pilottiVarasto.has(avain)) return pilottiVarasto.get(avain);
  const lupaus = (async () => {
    try {
      const [eleVastaus, aaniVastaus] = await Promise.all([fetch(eleOsoite), haeAani(aaniOsoite)]);
      if (!eleVastaus?.ok || !aaniVastaus?.ok) return null;
      const data = await eleVastaus.json();
      const tavut = new Uint8Array(await aaniVastaus.arrayBuffer());
      const sha256 = await laskeSha256(tavut);
      if (!sha256) return null;
      const tulos = await tarkistaLivianPilottiData(data, {
        kaupunki, kentta, kupla, teksti, aani: { tavut: tavut.byteLength, sha256 },
      });
      return tulos.ok ? tulos.eleet : null;
    } catch {
      return null;
    }
  })();
  pilottiVarasto.set(avain, lupaus);
  const tulos = await lupaus;
  pilottiVarasto.set(avain, tulos);
  return tulos;
}

/**
 * Aloita tarkistus taustalla ja kytke vasta hyväksytty data samaan soittimeen.
 * kytkeLivianPuheEleet sovittaa heti nykyiseen currentTimeen, joten myös jo
 * alkanut mp3 pääsee oikeaan cueen ilman menneiden cuejen jälkitoistoa.
 */
export async function kytkeLivianPilottiEleet(audio, tiedot, { voimassa = () => true } = {}) {
  if (!audio || !voimassa()) return () => {};
  const eleet = await lataaLivianPilottiEleet(tiedot?.kaupunki, tiedot?.aaniOsoite, tiedot);
  if (!eleet || !voimassa()) return () => {};
  return kytkeLivianPuheEleet(audio, eleet, { voimassa });
}
