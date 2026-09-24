import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

/*
 * CSS:N AALTOSULKEET TASAPAINOSSA (Pelikoodari 23.9.2026). v2087 poisti
 * pilven @keyframes-lohkon alun mutta jätti rivin `to { … } }`: ylimääräinen
 * `}` teki seuraavasta säännöstä (`.pallolauta-liike-pulu { position:
 * absolute; opacity: 0 }`) kelvottoman, ja selain hylkäsi sen hiljaa —
 * pienen liikkeen pulu jäi aina näkyviin kartan kulmaan (savuke-
 * topografialinssi: jäänne linssin päällä). Selain ei varoita tällaisesta,
 * joten tarkistus on tässä: syvyys ei saa käydä negatiivisena eikä jäädä
 * auki tiedoston lopussa.
 */
const kansio = new URL('../css/', import.meta.url);
for (const nimi of readdirSync(kansio).filter((n) => n.endsWith('.css'))) {
  test(`css/${nimi}: aaltosulkeet tasapainossa`, () => {
    const teksti = readFileSync(new URL(nimi, kansio), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '""');
    let syvyys = 0;
    let rivi = 1;
    for (const merkki of teksti) {
      if (merkki === '\n') rivi += 1;
      else if (merkki === '{') syvyys += 1;
      else if (merkki === '}') {
        syvyys -= 1;
        assert.ok(syvyys >= 0, `ylimääräinen } (kommentit poistettuna rivi ~${rivi})`);
      }
    }
    assert.equal(syvyys, 0, 'tiedoston lopussa auki jääneitä lohkoja');
  });
}
