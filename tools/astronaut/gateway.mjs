/*
 * NASAN GATEWAY TO ASTRONAUT PHOTOGRAPHY OF EARTH (eol.jsc.nasa.gov) — tunnukset, osoitteet ja kuvasivun tiedot.
 * Pelikoodari 4.10.2026: suurin osa Gatewayn kuvista ei ole images-api.nasa.gov:ssa (Sisältökirjuri: Norjan vuonot,
 * Islanti), joten hae-satelliittihavainnot.mjs hakee Gateway-tunnuksella (ISS026-E-26514) kuvan suoraan Gatewaysta, ja
 * tools/astronaut/ehdokkaat.mjs käyttää samoja osoitteita arkeissa. Kuvat ovat NASAn (public domain).
 */
export const GATEWAY = 'https://eol.jsc.nasa.gov';

/**
 * Gatewayn tunnus (ISS026-E-26514, ISS002-708-11, STS059-213-19) osiin; muuten null. Gatewayn ruutunumerossa ei ole
 * etunollaa: STS062-85-021 on kuvakirjaston (images-api) tunnus, ei Gatewayn (sen tiedosto on STS062-85-21).
 */
export function gatewayTunnus(id) {
  const m = String(id ?? '').match(/^([A-Z]+\d+[A-Z]?)-([A-Z0-9]+)-([1-9]\d*[A-Z]?)$/);
  return m ? { mission: m[1], roll: m[2], frame: m[3] } : null;
}

/** Kuvan, pikkukuvan ja kuvasivun osoitteet tunnuksesta (digitaali ESC/large|small, filmi ISD/highres|lowres). */
export function gatewayOsoitteet(id) {
  const t = gatewayTunnus(id);
  if (!t) return null;
  const [kansio, iso, pieni] = t.roll === 'E' ? ['ESC', 'large', 'small'] : ['ISD', 'highres', 'lowres'];
  return {
    kuva: `${GATEWAY}/DatabaseImages/${kansio}/${iso}/${t.mission}/${id}.JPG`,
    pikku: `${GATEWAY}/DatabaseImages/${kansio}/${pieni}/${t.mission}/${id}.JPG`,
    sivu: `${GATEWAY}/SearchPhotos/photo.pl?mission=${t.mission}&roll=${t.roll}&frame=${t.frame}`,
  };
}

/**
 * Kuvasivun (photo.pl) tiedot: kuvausaika ("Date taken 2011.02.11", "Time taken 23:13:57 GMT") ja ison kuvan mitat
 * (ensimmäinen "4256 x 2913 pixels"). Aika ISO-muodossa; pelkkä päivä, jos kellonaikaa ei ole.
 */
export function jasennaKuvasivu(html) {
  const teksti = String(html).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  const p = teksti.match(/Date taken (\d{4})\.(\d{2})\.(\d{2})/);
  const k = teksti.match(/Time taken (\d{2}):(\d{2}):(\d{2}) GMT/);
  const m = teksti.match(/(\d{3,5}) x (\d{3,5}) pixels/);
  return {
    aika: p ? `${p[1]}-${p[2]}-${p[3]}${k ? `T${k[1]}:${k[2]}:${k[3]}Z` : ''}` : null,
    mitat: m ? [Number(m[1]), Number(m[2])] : null,
  };
}
