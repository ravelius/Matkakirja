// MALLIN RIVIMUODON SIETO (omistaja TF 149 6.10.2026: Peking ja Tokio ilman esittelyä). Toisto: Nairobin täkyt 502, koska
// Sonnet jätti "KOHDE:"-etuliitteen pois. Rivit kelpaavat etuliitteellä tai ilman, listamerkein ja lihavoinnein.
import test from 'node:test';
import assert from 'node:assert/strict';
import { jasennaKohteet } from '../tools/pollo/kohteet.js';
import { jasennaLiiku } from '../tools/pollo/opaskeskustelu.js';
import { jasennaKierros } from '../tools/pollo/opas.js';

// Mallin todellinen vastaus 6.10. 17.0x (Nairobi), lyhennettynä.
const NAIROBI = `Nairobin kansallispuisto | Nairobi National Park | Nairobi | KE | Leijonat vaeltavat savannilla pilvenpiirtäjien varjossa.
Uhuru Park | Uhuru Park | Nairobi | KE | Vehreä keidas keskustan sydämessä.
Karen Blixenin museo | Karen Blixen Museum | Nairobi | KE | Täältä alkoi tarina, joka päätyi elokuvaksi.`;

test('täkyt: rivit ilman KOHDE:-etuliitettä kelpaavat (Nairobi 502)', () => {
  const k = jasennaKohteet(NAIROBI);
  assert.equal(k.length, 3);
  assert.deepEqual([k[0].nimi, k[0].wikipedia, k[0].kaupunki, k[0].iso], ['Nairobin kansallispuisto', 'Nairobi National Park', 'Nairobi', 'KE']);
});

test('täkyt: etuliite, listamerkit ja lihavointi; johdantoteksti ei ole rivi', () => {
  const k = jasennaKohteet(`Tässä kohteet:\n1. **KOHDE:** Kielletty kaupunki | Forbidden City | Peking | CN | Keisarien suljettu palatsi.\n- Taivaan temppeli | Temple of Heaven | Peking | CN | Pyöreä temppeli puiston keskellä.`);
  assert.deepEqual(k.map((x) => x.nimi), ['Kielletty kaupunki', 'Taivaan temppeli']);
});

test('Liiku ja kierros: sama sieto', () => {
  assert.deepEqual(jasennaLiiku('Sensō-ji | Sensō-ji | vanha temppeli | kirkko\nKOHDE: Tokyo Tower | Tokyo Tower | punainen torni | torni').map((x) => x.nimi), ['Sensō-ji', 'Tokyo Tower']);
  const p = jasennaKierros('Kielletty kaupunki | Forbidden City | 39.9163 | 116.3972 | 900\nPAIKKA: Jingshan | Jingshan Park | 39.9250 | 116.3966 | 300');
  assert.deepEqual(p.map((x) => x.nimi), ['Kielletty kaupunki', 'Jingshan']);
  assert.equal(p[0].koko_m, 900);
});
