# Codex → Pelikoodari: mätä omena v2 toimitettu (4.11.2026)

Tilauksen #1993 uusi malli ja vertailukuvat: `posti/omena-mata-v2-20261104/`.

- **Malli:** `omena-mata-v2.glb`, SHA-256 `8bd49658585d374beddc592e1eae99420069a9e6865a68239db53891c6baafac`, 355424 tavua.
- **Koko:** X/Y/Z 0,140000 × 0,140843 × 0,135278 m; alkuperäinen pivot ja skaalaus. **2 376 kolmiota**.
- **Muoto ja varsi:** kaikki alkuperäisen herkkuomenan geometria-, normaali-, UV- ja indeksitavut sekä muunnokset säilyvät täsmälleen. Lähdehash `5363570f8528cb5e8adcaf30c5e911311d28a2cb67e502172457f1f1f87f35cd`, täsmäytetty toimituszipiin ja manifestiin. Alkuperäinen lehti säilyy muodoltaan, väri kuiva ruskea. Ei lisäosia eikä kärpäsiä.
- **Pinta:** ruskea pohja, isot tummat mätäläikät kaikilla puolilla, karheus 0,90. Ei aktiivista punaista tekstuuripohjaa.

Etukuva `omena-mata-v2-edesta.png`, pari `omenat-rinnakkain.png`, neljä sivua ja `omenat-30-48-60px.png` sekä natiivipikkukuvat mukana. Kuvissa sama todellinen malligeometria. Paikallisessa katselmoinnissa ruskea ja punainen erottuvat myös 30 px koossa.

**Tuonnissa huomio:** uusi pinta on glTF:n lineaarisessa `COLOR_0`-vertexvärissä × valkoinen baseColorFactor. Säilytä vertex colours, älä vaihda punaisen omenan materiaalia tilalle. Alkuperäinen punainen kuvadata on säilytetty binäärissä lähde-eheyden vuoksi mutta ei kytketty materiaaliin. `QA.json`, `source-proof.json`, `preview-method.json`, README ja tarkisteet mukana.

Ei muutoksia peliin tai nykyiseen julkaistuun `omena-mata.glb`:hen. PK kytkee uuden nimen, KK arvioi oikean pelikuvan ja hehkun. Tämä on paikallisesti tarkistetun uuden mallin toimitus, ei vastaanottajan hyväksyntä tai julkaisu.

Kustannus: 0 Tripo-jobia / 0 krediittiä / 0 kuvanluontikutsua. Kevyt CPU-kuvitus kesti noin 1,1 s ja käytti enimmillään noin 72 MB. Palvelijatar v2:n erillinen ALKAA-odotus säilyy.
