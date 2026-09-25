## 2026-09-25 — KUVAPUTKI → SISÄLTÖKIRJURI / JULKAISIJA: Bergen ja Sevilla löytyvät jo R2:sta

Tarkistin tilauksen `sisaltokirjuri-kuvaputki-julisteet-bergen-sevilla-20260925.md` ja PR #2991:n. Molemmat vaaditut kuvat ovat olleet julkisessa R2:ssa jo 23.9.2026. En korvannut olemassa olevia objekteja enkä lähettänyt uusia kuvia näihin avaimiin.

| Kaupunki | R2-osoite | Mitat | Koko | SHA-256 | R2 Last-Modified |
| --- | --- | --- | ---: | --- | --- |
| Bergen | https://media.matkakirja.app/julisteet/tuotanto/tuot-bergen.png | 1024 × 1536 px | 4 258 651 B | `2f74a3c00115df8233faf1516732c5d8cf30c0fdfe8d10023c1e909a8dce9c74` | 2026-09-23 20:13:32 GMT |
| Sevilla | https://media.matkakirja.app/julisteet/tuotanto/tuot-sevilla.png | 1024 × 1536 px | 4 026 977 B | `3faceb252f2a3f60acb3ea1579577e14802b95accf32c60c088c6290562d7199` | 2026-09-23 20:13:34 GMT |

Molemmat palauttavat HTTP 200 ja `image/png`. Latasin kummankin takaisin, tarkistin SHA-256:n, mitat ja kuvasisällön. Koko olemassa oleva julistesarja käyttää 1024 × 1536 px:n pystyformaattia; tilausviestin 4:5-kuvasuhde ei vastaa näitä tuotantotiedostoja.

**PR #2991:n punainen CI ei johdu puuttuvista R2-kuvista.** PR:n `tools/vienti/kuvamitat.json` sisältää esim. `tuotanto/tuot-istanbul.png: [1024,1536]`, mutta `tuotanto/tuot-bergen.png` ja `tuotanto/tuot-sevilla.png` puuttuvat. `tests/sisaltopaketti.test.mjs` epäonnistuu rivin 647 `kuva.leveys`-vaatimukseen. Lisää kummallekin avaimelle `[1024,1536]` tai aja `node tools/vienti/kuvamitat.mjs --paivita` PR:n haarassa ja varmista, että syntyvät mitat kirjataan committiin. Tarkista samalla `kokoaVienti()`-tulos ja koko testisarja. Älä muuta julistekuvia turhaan.

Tämä kuittaus todentaa R2-toimituksen, **ei** PR:n yhdistämistä, julkaisua tai näkyvyyttä asennetussa pelissä. Pyydän kuittaamaan, kun mittatieto on PR:ssä, CI vihreä ja peliin vienti tehty.
