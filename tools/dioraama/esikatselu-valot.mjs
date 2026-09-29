/*
 * DIORAAMAN VALAISTUS — esikatselu, erä 2b (29.9.2026, ali-agentti P7).
 * Aurinko (DirectionalLight + PCFSoft-varjot), taivas (HemisphereLight) ja
 * tilojen pistevalot (lamput/tuli, lepatus ajasta). Rajapinta ja kaavat:
 * docs/raportit/dioraama-rajapinnat-era2b-20260929.md, kohdat 1 ja 2.
 *
 * Aurinko sijoitetaan kamera.js:n asentoSijainti-kaavalla (sama pallokoordinaatti-
 * muunnos kuin kameralla: atsimuutti = kompassisuunta josta valo TULEE) — ei
 * kopioida kaavaa, kutsutaan vain valmiiksi tuotua funktiota eri argumentein.
 *
 * IKKUNAN AURINKO JA SISALLA (omistajan valo-päätös 29.9., era2b-rajapinta kohta 1/2):
 * tilan valo, jonka `tyyppi === 'keila'`, rakennetaan THREE.SpotLightina (ei PointLight)
 * `kohti`-pisteeseen suunnattuna, varjot päällä (natiivissa EI varjoja — tässä KYLLÄ, jotta
 * ikkunan karmi näkyy valoläikässä kehittäjän tarkistuskuvissa). `valaistus.sisalla.{aurinko,
 * taivas}` vaimentaa auringon/taivaan voiman kohdistetussa (huone-)näkymässä — esikatselu on
 * staattinen kuvakaappaus per sivulataus, joten TÄSSÄ ei liu'uta ajassa (natiivi liukuu ~1 s,
 * ks. DioraamaValot.cs); kutsuja (esikatselu.mjs) päättää `kohdistettu`-lipun kohdeTilan mukaan.
 */
import * as THREE from 'three';
import { asentoSijainti } from '../../js/dioraama/kamera.js';

export const OLETUS_AURINKO = { atsimuutti: 215, korkeus: 38, vari: '#fff0d8', voima: 1.15 };
export const OLETUS_TAIVAS = { yla: '#b9cddd', ala: '#5d4c3c', voima: 0.55 };
export const OLETUS_SISALLA = { aurinko: 1, taivas: 1 }; // puuttuessa lähteestä: ei vaimennusta kohdistetussakaan näkymässä

const VARI_LAMPPU_OLETUS = '#ffb070';
const VOIMAKERROIN = 1.0; // era2b kohta 1: "intensiteetti = voima · 1,0" (natiivin tonemappauksen kanssa, 29.9.)
const LIEKKI_ETAISYYS_M = 1.0; // valo luetaan "tuleksi" jos alle tämän matkan päässä liekkipaikasta (kohta 3, oletus)
const KEILA_PUOLIKULMA_OLETUS = 30; // astetta, koko kulma (kuten Unityn spotAngle) — jos `kulma` puuttuu datasta
const KEILA_PEHMENNYS = 0.4; // penumbra: pehmeä reuna, ikkunan valoläikkä ei ole veitsenterävä
const KEILA_VARJOKARTTA = 1024; // esikatselu SwiftShaderilla — riittää yhden ikkunan karmin ääriviivalle

function etaisyys3(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/**
 * Rakentaa aurinko- ja taivasvalot ja sovittaa varjokameran koko rakennuksen
 * bbox:iin (yksinkertaistus: EI vaihdu tilasta toiseen siirryttäessä — ks.
 * raportti, "varjokamera rajattu näkymään" tulkittu koko dioraaman bboxiksi).
 *
 * `kohdistettu` (era2b, omistajan valo-päätös 29.9.): true kun sivu on latautunut kohdistettuun
 * tilaan (esikatselu.mjs: kohdeTilaAlku != null) — silloin auringon/taivaan voima kerrotaan
 * `valaistus.sisalla.{aurinko,taivas}`:lla (oletus 1/1 = ei vaimennusta). Staattinen kuvakaappaus-
 * työkalu, EI ajallista liukumaa (natiivin ~1 s -liuku on DioraamaValot.cs:ssä).
 */
export function rakennaPaavalot(scene, valaistus, bbox, kohdistettu = false) {
  const aurinko = { ...OLETUS_AURINKO, ...(valaistus?.aurinko ?? {}) };
  const taivas = { ...OLETUS_TAIVAS, ...(valaistus?.taivas ?? {}) };
  const sisalla = { ...OLETUS_SISALLA, ...(valaistus?.sisalla ?? {}) };
  const aurinkoKerroin = kohdistettu ? sisalla.aurinko : 1;
  const taivasKerroin = kohdistettu ? sisalla.taivas : 1;

  const hemi = new THREE.HemisphereLight(taivas.yla, taivas.ala, taivas.voima * taivasKerroin);
  scene.add(hemi);

  const keskipiste = bbox.getCenter(new THREE.Vector3());
  const koko = bbox.getSize(new THREE.Vector3());
  const sade = Math.max(20, koko.length() * 0.6);
  const { sijainti } = asentoSijainti({
    kohde: [keskipiste.x, keskipiste.y, keskipiste.z],
    atsimuutti: aurinko.atsimuutti,
    korkeus: aurinko.korkeus,
    etaisyys: sade,
    fov: 1,
    aukko: 0,
  });
  const suuntavalo = new THREE.DirectionalLight(aurinko.vari, aurinko.voima * aurinkoKerroin);
  suuntavalo.position.set(sijainti[0], sijainti[1], sijainti[2]);
  suuntavalo.target.position.copy(keskipiste);
  scene.add(suuntavalo.target);

  suuntavalo.castShadow = true;
  suuntavalo.shadow.mapSize.set(1024, 1024); // natiivissa 2048; esikatselu SwiftShaderilla — 1024 riittää ja on nopeampi
  suuntavalo.shadow.camera.near = 0.5;
  suuntavalo.shadow.camera.far = sade * 2.3;
  const puoliLeveys = Math.max(15, koko.length() * 0.55);
  Object.assign(suuntavalo.shadow.camera, {
    left: -puoliLeveys, right: puoliLeveys, top: puoliLeveys, bottom: -puoliLeveys,
  });
  suuntavalo.shadow.bias = -0.0015; // vähentää varjoaknea
  suuntavalo.shadow.normalBias = 0.02;
  suuntavalo.shadow.camera.updateProjectionMatrix();
  scene.add(suuntavalo);

  return { hemi, aurinko: suuntavalo };
}

/**
 * Ikkunan aurinko (era2b, omistajan valo-päätös 29.9.): `tyyppi === 'keila'` -valo THREE.SpotLightina
 * `paikka`→`kohti`-suuntaan (kulma = koko kartiokulma asteina, kuten Unityn spotAngle — puolitetaan
 * THREEn puolikulmaksi). castShadow TOSI (poikkeus era2b kohtaan 2 "ei lisävalojen varjoja" — TÄSSÄ
 * työkalussa halutaan nimenomaan nähdä ikkunan karmin varjo valoläikässä, natiivissa ei).
 */
function luoKeilavalo(v, vari, perusVoima) {
  const puolikulmaRad = ((v.kulma ?? KEILA_PUOLIKULMA_OLETUS) * Math.PI / 180) / 2;
  const light = new THREE.SpotLight(vari, perusVoima, v.sade, puolikulmaRad, KEILA_PEHMENNYS, 2);
  light.position.set(v.paikka[0], v.paikka[1], v.paikka[2]);
  const kohti = v.kohti ?? v.paikka; // ei pitäisi puuttua datassa; varasuunta suoraan alas siirto pois nollapituudesta
  light.target.position.set(kohti[0], v.kohti ? kohti[1] : v.paikka[1] - 1, kohti[2]);
  light.castShadow = true;
  light.shadow.mapSize.set(KEILA_VARJOKARTTA, KEILA_VARJOKARTTA);
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = Math.max(1, v.sade) * 1.5;
  light.shadow.bias = -0.0015;
  light.shadow.normalBias = 0.02;
  return light;
}

/**
 * Rakentaa yhden tilan pistevalot (tila.valot). Palauttaa kuvaukset, joita
 * paivitaPisteValot() lepattaa ja joita paneelin Lamput/Tuli-kytkimet piilottavat.
 * "tuli" vs "lamppu" -jaottelu on PÄÄTELTY: JSON:ssa ei ole tyyppikenttää tulelle/lampulle, joten
 * valo luetaan tuleksi kun se on lähellä tilan liekki-paikkaa (ks. moduulin alku). `tyyppi === 'keila'`
 * (ikkunan aurinko) ON eksplisiittinen kenttä datassa — ks. luoKeilavalo yllä.
 */
export function rakennaPisteValot(scene, tila) {
  const kuvaukset = [];
  for (const v of tila.valot ?? []) {
    const vari = v.vari ?? VARI_LAMPPU_OLETUS;
    const onKeila = v.tyyppi === 'keila';
    const lepatus = onKeila ? 0 : (v.lepatus ?? 0); // era2b: ikkunan aurinko ei lepata
    const onTuli = (tila.liekit ?? []).some((l) => etaisyys3(l.paikka, v.paikka) < LIEKKI_ETAISYYS_M);
    const perusVoima = v.voima * VOIMAKERROIN;
    const light = onKeila ? luoKeilavalo(v, vari, perusVoima) : new THREE.PointLight(vari, perusVoima, v.sade, 2);
    if (!onKeila) {
      light.position.set(v.paikka[0], v.paikka[1], v.paikka[2]);
      light.castShadow = false; // era2b kohta 2: "ei lisävalojen varjoja"
    }
    scene.add(light);
    if (light.target) scene.add(light.target); // SpotLight.target pitää olla näyttämön puussa (kuten auringon target)
    kuvaukset.push({ light, tyyppi: onTuli ? 'tuli' : 'lamppu', lepatus, perusVoima, vaihe: Math.random() * Math.PI * 2 });
  }
  return kuvaukset;
}

/** Lepatuksen kerroin ajasta t (s): kaksi eritaajuista sinia, vaihe erottaa valot toisistaan. */
function lepatusKerroin(t, vaihe, maara) {
  const kohina = 0.6 * Math.sin(t * 9.1 + vaihe) + 0.4 * Math.sin(t * 17.3 + vaihe * 1.7);
  return 1 + maara * 0.25 * kohina;
}

/** Kutsutaan animaatioloopista joka ruudulla: päivittää lepattavien pistevalojen voiman. */
export function paivitaPisteValot(kuvaukset, t) {
  for (const k of kuvaukset) {
    if (k.lepatus > 0) k.light.intensity = k.perusVoima * lepatusKerroin(t, k.vaihe, k.lepatus);
  }
}

/** Aurinko-kytkin: sammuttaa auringon JA taivasvalon yhdessä (yö/sisävaloa-vain-tuntu). */
export function asetaAurinkoNakyvyys(paavalot, paalla) {
  paavalot.hemi.visible = paalla;
  paavalot.aurinko.visible = paalla;
}

/** Lamput/Tuli-kytkimet: piilottaa yhden ryhmän pistevalot. */
export function asetaValoryhmaNakyvyys(kuvaukset, tyyppi, paalla) {
  for (const k of kuvaukset) if (k.tyyppi === tyyppi) k.light.visible = paalla;
}
