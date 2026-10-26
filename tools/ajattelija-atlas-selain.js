/*
 * AJATTELIJAN TEKSTIATLAS (selainmoduuli tools/ajattelija-natiivi.mjs:lle; omistaja 3.10.2026: "ei webiä lainkaan").
 * Kopio webin js/linssit/ajattelija-projektori.js:n piirraAtlas-funktiosta (#3902), jotta natiivin atlas ei riipu
 * jäädytetystä webistä. Muutokset tehdään TÄHÄN; natiivin muunnin ajaa tämän Chromiumissa samoilla fonteilla.
 */
export const PROJEKTOREITA_ENINTAAN = 24;
// Gobokuvan mittasuhteet (sokrates_gobo.py --nauha): kirjainkoko 220 px 534 px:n nauhassa, reunus ~0,85 em.
export const NAUHA_EM = 220 / 534;
const ATLAS_LEVEYS = 4096;
const ATLAS_VALI = 16;   // tyhjä väli rivien välissä: mip-tasot eivät vuoda viereiseen riviin

/**
 * Piirtää rivit atlakseen. rivit: [{ teksti, fontti, korkeus px, sumea?: boolean, sumeus?: em-osuus, kortti?: [rivit] }].
 * KORTTI (v14, omistaja 3.10.2026: päälainaus luettavissa kokonaan): monirivinen teksti yhtenä laattana, rivit keskitettyinä;
 * korkeus on silloin YHDEN tekstirivin korkeus, ja laatan korkeus kasvaa rivimäärän mukaan (pystyreunus 17 %, ettei
 * varjostimen v-reunan häivytys osu kirjaimiin). sumeus: taustavirran epäterävyys em-osuutena (v14).
 * Palauttaa kankaan ja rivien paikat.
 */
export function piirraAtlas(rivit, doc = document) {
  const kangas = doc.createElement('canvas');
  const mitta = kangas.getContext('2d');
  const paikat = [];
  let y = 0;
  for (const r0 of rivit) {
    let r = r0;
    let em = Math.round(r.korkeus * NAUHA_EM * (r.emOsuus ?? 1));
    mitta.font = `${r.paino ?? 'bold'} ${em}px ${r.fontti}`;
    if (r.kortti) {
      const leveimmat = Math.ceil(Math.max(...r.kortti.map((t) => mitta.measureText(t).width)));
      const rivivali = Math.round(em * 1.3);
      const korkeus = Math.round((rivivali * r.kortti.length + em * 0.4) / 0.66);
      const reuna = Math.round(em * 0.85);
      const lev = Math.min(ATLAS_LEVEYS, leveimmat + 2 * reuna);
      paikat.push({ ...r, korkeus, em, lev, y, uMax: lev / ATLAS_LEVEYS, reuna, rivivali });
      y += (korkeus + ATLAS_VALI) * (r.sumea ? 2 : 1);
      continue;
    }
    let tekstiLev = Math.ceil(mitta.measureText(r.teksti).width);
    // Pitkä toistorivi (esim. Apologia 38a kokonaan) pienennetään mahtumaan yhteen laattaan väleineen.
    if (r.toisto && tekstiLev + 3 * em > ATLAS_LEVEYS) {
      em = Math.floor(em * ATLAS_LEVEYS / (tekstiLev + 3 * em));
      mitta.font = `${r.paino ?? 'bold'} ${em}px ${r.fontti}`;
      tekstiLev = Math.ceil(mitta.measureText(r.teksti).width);
    }
    if (r.toisto) {
      // TOISTORIVI TÄYTTÄÄ ATLAKSEN LEVEYDEN kokonaisilla laatoilla (laatta = teksti + väli): näytteenotin
      // kääriä (RepeatWrapping) jatkuvalla u:lla, joten saumassa ei ole fract()-hyppyä eikä mip-viivaa.
      const toistoja = Math.max(1, Math.floor(ATLAS_LEVEYS / (tekstiLev + 3 * em)));
      const lev = ATLAS_LEVEYS / toistoja;
      paikat.push({ ...r, em, lev, y, uMax: 1 / toistoja, toistoja, reuna: (lev - tekstiLev) / 2 });
    } else {
      const reuna = Math.round(em * 0.85 + tekstiLev * 0.06);
      const lev = Math.min(ATLAS_LEVEYS, tekstiLev + 2 * reuna);
      paikat.push({ ...r, em, lev, y, uMax: lev / ATLAS_LEVEYS, reuna });
    }
    y += (r.korkeus + ATLAS_VALI) * (r.sumea ? 2 : 1);
  }
  kangas.width = ATLAS_LEVEYS;
  kangas.height = Math.max(4, 2 ** Math.ceil(Math.log2(Math.max(4, y))));
  const c = kangas.getContext('2d');
  c.fillStyle = '#000';
  c.fillRect(0, 0, kangas.width, kangas.height);
  c.fillStyle = '#fff';
  c.textBaseline = 'middle';
  for (const p of paikat) {
    c.font = `${p.paino ?? 'bold'} ${p.em}px ${p.fontti}`;
    const piirra = (yla, sumeus) => {
      c.save();
      // Toistorivi täyttää koko atlaksen leveyden (kaikki laatat), muuten vain oma leveys (Linssiseppä 2:n löydös 2.10.).
      c.beginPath(); c.rect(0, yla, p.toistoja ? ATLAS_LEVEYS : p.lev, p.korkeus); c.clip();
      c.filter = `blur(${sumeus}px)`;
      if (p.kortti) {
        c.textAlign = 'center';
        const y0 = yla + p.korkeus / 2 - p.rivivali * (p.kortti.length - 1) / 2;
        p.kortti.forEach((t, k) => c.fillText(t, p.lev / 2, y0 + k * p.rivivali));
      } else {
        for (let n = 0; n < (p.toistoja ?? 1); n += 1) c.fillText(p.teksti, p.reuna + n * p.lev, yla + p.korkeus / 2);
      }
      c.restore();
    };
    // Projektorin pehmeys: GaussianBlur 2 px 220 px:n kirjaimissa; sumea pari nauhan korkeus / 40.
    // v14: taustavirran rivit epäteräviksi jo atlakseen (sumeus em-osuutena), ei ajonaikaista kustannusta.
    piirra(p.y, Math.max(0.5, p.em * (p.sumeus ?? 2 / 220)));
    if (p.sumea) piirra(p.y + p.korkeus + ATLAS_VALI, (p.kortti ? p.em * 192 / 220 : p.korkeus) / 40);
  }
  return { kangas, paikat };
}

