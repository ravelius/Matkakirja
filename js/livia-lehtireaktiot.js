import {
  ilmoitaLivianTilanne, livianAiheEle, livianTunnetaginTiedot,
} from './livia-tilanteet.js';

const viimeSivu = new WeakMap();

const AIHEET = Object.freeze({
  kaupunki: ['kaupunki', 'ylpea', .4],
  historia: ['historia', 'miettiva', .45],
  luonto: ['luonto', 'utelias', .45], vuoret: ['luonto', 'utelias', .45],
  aavikko: ['luonto', 'utelias', .45],
  ruoka: ['ruoka', 'lammin', .5],
  musiikki: ['kulttuuri', 'lammin', .45], taide: ['kulttuuri', 'lammin', .45],
  kuvataide: ['kulttuuri', 'lammin', .45], nykytaide: ['kulttuuri', 'lammin', .45],
  tiede: ['tekniikka', 'miettiva', .5], keksinnot: ['tekniikka', 'miettiva', .5],
  kauppa: ['kauppa', 'ylpea', .4], menovinkit: ['kauppa', 'ylpea', .4],
  kirjallisuus: ['sana', 'miettiva', .4], kielet: ['sana', 'miettiva', .4],
  sadut: ['sana', 'miettiva', .4], kirjat: ['sana', 'miettiva', .4],
  meri: ['merenkulku', 'utelias', .5], laivat: ['merenkulku', 'utelias', .5],
  urheilu: ['urheilu', 'ilo', .55], elaimet: ['elain', 'ilo', .55],
  huuto: ['huuto', 'hammastys', .55], silma: ['silma', 'utelias', .5],
  ihme: ['ihme', 'hammastys', .55],
});

const RYHMAT = Object.freeze({
  historia: ['alkuperaiskansat', 'atsteekkiperinto', 'kansanperinne', 'muinaisuus',
    'mustarooma', 'perinteet', 'siirtolaisuus', 'tasavalta', 'whadjukit'],
  luonto: ['kalliot', 'keidas', 'maasto', 'puutarhat', 'ranta', 'saaret', 'suot',
    'tunturi', 'vedet'],
  ruoka: ['herkut', 'hiri', 'keittio'],
  kulttuuri: ['arkkitehtuuri', 'elokuva', 'juhlat', 'kasityo', 'kasityot', 'kirkot',
    'kulttuuri', 'saksalaisperinne', 'savel', 'soittajat', 'tavat', 'tekstiilit', 'valo'],
  tekniikka: ['oppi', 'tekniikka'],
  kauppa: ['kumibuumi', 'talous', 'tupakka'],
  sana: ['huumori', 'kieli', 'runous', 'tarinat'],
  kaupunki: ['arki', 'kaupunkikuva', 'linnoitukset', 'rakennukset', 'talot',
    'vanhakaupunki'],
  elain: ['linnut'],
  silma: ['helmet'],
  ihme: ['rauniot'],
});

const RYHMA_TAGIT = Object.freeze({
  historia: ['miettiva', .45], luonto: ['utelias', .45], ruoka: ['lammin', .5],
  kulttuuri: ['lammin', .45], tekniikka: ['miettiva', .5], kauppa: ['ylpea', .4],
  sana: ['miettiva', .4], merenkulku: ['utelias', .5], kaupunki: ['ylpea', .4],
  elain: ['ilo', .55], silma: ['utelias', .5], ihme: ['hammastys', .55],
});

const MUUT_AIHEET = new Map(Object.entries(RYHMAT).flatMap(([symboli, ids]) =>
  ids.map((id) => [id, [symboli, ...RYHMA_TAGIT[symboli]]])));

function aiheTiedot(id) {
  const vakaaId = String(id ?? '').trim().toLocaleLowerCase('fi-FI');
  if (vakaaId.startsWith('hetki-')) return { id: vakaaId, symboli: 'hetki', tunne: 'jannitys', voimakkuus: .5 };
  const [symboli, tunne, voimakkuus] = AIHEET[vakaaId] ?? MUUT_AIHEET.get(vakaaId) ?? [];
  return symboli ? { id: vakaaId, symboli, tunne, voimakkuus } : null;
}

function aiheTekstina(arvo, syvyys = 0) {
  if (arvo == null || syvyys > 4) return '';
  if (typeof arvo === 'string' || typeof arvo === 'number') return String(arvo);
  if (Array.isArray(arvo)) return arvo.map((osa) => aiheTekstina(osa, syvyys + 1)).join(' ');
  if (typeof arvo !== 'object') return '';
  return Object.entries(arvo)
    .filter(([avain]) => !/^(kuva|kuvat|url|href|linkki|tiedosto|audio|video)$/iu.test(avain))
    .map(([, osa]) => aiheTekstina(osa, syvyys + 1)).join(' ');
}

/** Uusi lehden avaus saa oman ensimmäisen sivureaktionsa. */
export function aloitaLivianLehtikierros(ui) {
  if (ui && (typeof ui === 'object' || typeof ui === 'function')) viimeSivu.delete(ui);
}

/** Ilmoittaa vain pelaajalle oikeasti piirretyn aihesivun, kerran per näkymä. */
export function reagoiLivianLehtisivuun(ui, { kategoria, sivu, tila, omistaja, nakyva = true } = {}) {
  if (!ui || !nakyva || tila === 'kehittaja' || !kategoria?.id) return null;
  const aihe = aiheTiedot(kategoria.id);
  if (!aihe) return null; // geneeriset kartta-, numero- ja liitesivut ovat hiljaisia
  const tunniste = `${tila ?? ''}:${omistaja ?? ''}:${sivu ?? ''}:${aihe.id}`;
  if (viimeSivu.get(ui) === tunniste) return null;

  const otsikko = String(kategoria.nimi ?? '');
  const teksti = aiheTekstina(kategoria);
  const ele = livianAiheEle({ symboli: aihe.symboli, otsikko, teksti });
  let tagi = { tunne: aihe.tunne, voimakkuus: aihe.voimakkuus };
  if (ele === 'listen') tagi = { tunne: 'vakava', voimakkuus: .5 };
  else if (aihe.symboli === 'ruoka' && ele === 'manic') tagi = { tunne: 'ilo', voimakkuus: .55 };
  else if (aihe.symboli === 'elain' && ele === 'grin') tagi = { tunne: 'ilo', voimakkuus: .55 };
  const tunne = livianTunnetaginTiedot(tagi);
  if (!tunne) return null;

  viimeSivu.set(ui, tunniste);
  const tiedot = { ...tunne, ele, symboli: aihe.symboli, aiheId: aihe.id, sivu, omistaja };
  ilmoitaLivianTilanne('emotion', tiedot);
  return tiedot;
}
