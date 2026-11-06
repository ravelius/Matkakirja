# Codex → Päätoimittaja, Karttaseppä ja Pelikoodari: Notre-Dame + Riemukaari, kevyet lopulliset mallit (6.11.2026)

Omistaja on vapauttanut Notre-Damen lähetyskiellon ja käskenyt toimittaa molemmat mallit peliin vaihdettaviksi. Tämä lupa korvaa lähde-checkpointin vanhan OWNER_HOLD_DO_NOT_SEND-merkinnän.

Korvatkaa pelissä Notre-Dame V3 mallilla `notre-dame-syvyys.glb` ja Riemukaari V2 mallilla `riemukaari-kevyt.glb`. Säilyttäkää aiemmat mallit rollbackia varten.

Paketti: `posti/codex-pariisi-lod-toimituspari-20261106/`. Kummankin lopullinen revisedGLB, vertailukuva, MANIFEST.json ja SHA256SUMS mukana.

- Notre-Dame: 1 446 kolmiota, 2 960 932 tavua. SHA256 `5e82845b21865dbe7824658f97a61af0c815172d524f1f2776a2ba298cb7629c`.
- Riemukaari: 1 128 kolmiota, 2 237 000 tavua. SHA256 `9b2866f00e4ec482e468d29f6f02668a3f2b404d47156b18e8dfe093c6162142`.

Notre-Damen siluetti, aukot ja portaat on tehty näkyviksi 5° katselusta; mukana kevyt AO, normaalikartta ja 2048-väritekstuuri. Riemukaaressa reliefit on siirretty tekstuureihin, ja risteävät läpikulut sekä katto säilyvät geometriana. Paikalliset vertailukuvat ovat CPU-esikatseluja, eivät pelin valaistuksen tai buildin hyväksyntä.

Tarkistakaa pelissä kummankin suunta, koko ja sijoitus sekä nimenomaan 5° katselukulma: siluetti, aukot/portaat, katon reunat ja tekstuurit/normaalikartta pelin varjostimessa. Pyydämme erilliset kuittaukset (1) vastaanotosta ja SHA256-tarkistuksesta, (2) todellisesta pelikytkennästä ja pelikuvan arviosta, (3) buildista/build-numerosta tai tiedosta ettei buildia vielä ole. Päätoimittaja/Karttaseppä: ohjatkaa kytkentä Pelikoodarille tarvittaessa.

Codex ei ole muuttanut peliä, muita haaroja tai julkaissut buildia. Ei uusia generointeja eikä uusia maksullisia ajoja.

## Nykyisen peliversion säilytys ennen vaihtoa

Pääagentti varmisti esikatselu-2:n todelliset pelimallit `Resources/NotreDameKoe/*.bytes`: Riemukaari 39 094 kolmiota / 7 012 156 tavua (V2-lähde 39 106), Notre-Dame 19 871 kolmiota / 3 613 380 tavua (V3-lähde 3 902 720 tavua). Pelissä on siis lähteiden jälkeen muutettuja versioita. Varmuuskopioikaa nimenomaan nykyiset peliversiot rollbackiksi ennen vaihtoa.

Tarkistakaa nykyisten meshien mitat ja pivot sekä Karttasepän myöhemmät kattokaide-, kattopaviljonki-, sävy- ja sijoituskorjaukset. Säilyttäkää nämä korjaukset vaihdossa; toimitettu kevyt malli ei yksin todista niiden säilymistä. Jos säilytys vaatii mallin jatkokorjausta, ilmoittakaa tarkka ero ja kuvat ennen korjausta.
