# Karttasepän luovutus 13.10.2026 päivä (PT:n nollausohje)

Linjaukset: Raamattu + muisti `karttaseppa-tila-20261010-ilta.md` (päivän rivit 13.10. 07.3x–10.xx) ja `ks-yoerat-oma-suositus-20261013.md`.

## Valmista tänään (kaikki viety ämpäriin 0 virhettä, toimitettu LS1:lle)

sallitut.js-kaupunkijono LOPPUUN: Oslo+Bergen (kippi), Bryssel, Amsterdam, Krakova, Sevilla, Sofia, Bukarest, Tampere, Vilna, Valletta, Ateena,
Košice, Luxemburg, Venetsia, Sisilia (Palermo), Kreeta (Heraklion), Islanti (Reykjavik). Kansiot T7 `koodaus/proto-3d/_tyo/karttaseppa/kaupunki-<id>-20261013/`
(LUEMINUT.md jokaisessa). Oikeustarkistus `_tyo/karttaseppa/oikeustarkistus-20261013.md` rivit 27–44.
- Mapterhornissa EI z13–14: Bukarest (→ DSM-polku) ja Reykjavik (→ `vesimaski/kaupunkipaketti-z12.sh`). Tarkista z14 ennen ajoa (HEAD tiles.mapterhorn.com/14/x/y.webp).
- VENETSIA-OPPI: OSM-laguunisuhteesta puuttui keskustasaari → kaupunki oli vettä. Korjaus `vesimaski/saaret-reiiksi.py <pbf> <vesi-polygonit.json>`
  (shapely-erotus place=island/islet, myös relaatiot; osmiumissa EI esisuodatinta) + `vesimaski/ajot/venetsia-vesi-uusinta.sh`. Auditointi: rakennukset
  vesimaskissa ≤ 0,05 % kaikissa 33 kaupungissa.
- Catastro EI (oma lisenssi, ei CC BY; PT vahvisti). Sevilla ja Valletta jäävät OSM:n varaan.
- PYSYVÄT APUSKRIPTIT T7 `Matkakirja-karttaseppa/vesimaski/ajot/apu-20261013/`: kippi-ketju.sh, vienti-kaupungit.py, oikeus-rivi.py, lueminut.py,
  tarkistus-kaupunki.py, kamera-rakennus.py, kippi-lahteet.py; luonnokset `kippi-luonnokset/`.

## Kesken

1. **Pääkaupunkien kohdekartat (Codex e04–e14)** — worktree `/Users/Shared/Claude/wt/karttaseppa-paakaupungit-kohdekartat-e04-e14` (haara samanniminen, ei
   committeja vielä). Data: T7 `_tyo/karttaseppa/paakaupungit-pilvi-20261013/` (git archive Codexin haaroista 13.10.) ja suodatettu
   `paakaupungit-piirto-20261013/` (20 kaupunkia, ≥ 3 kohdetta, PIIRRÄ). Piirto `scratchpad piirra.sh` (loki piirra.log; kohdekartat.mjs --piirra per erä).
   VIKA: rannikkokaupungeilta puuttuu `meri: true, meriHaku: 0.05` → meri maan värinen (Conakry, Luanda nähty). LISÄÄ lippu tools/piirra-kaupunkikartta.mjs:n
   KAUPUNGIT-riveihin: banjul, conakry, monrovia, accra, luanda, saotome, mogadishu, castries, nassau, saintjohns, georgetown → piirrä uudelleen
   (`node tools/piirra-kaupunkikartta.mjs <id>`), katso JOKAINEN kuva. Sitten commit + PR (kohdekartat-mac.json:t Pelikoodarille).
   Codexin A-vaihe on kesken: 22 kaupungilla 0 kohdetta, 25:llä 1 → niitä EI piirretä ennen Codexin valmista erää (TILANNE.md:t).
2. **Kööpenhamina Pariisin tasolle** (omistaja 10.3x, PT:n lista `/Users/Shared/Claude/Matkakirja-fable/scratchpad/koopenhamina-kippi-aukot-20261013.md`):
   - Opus-agentit (tulokset `kaupunki-koopenhamina-20261013/`): ilmakeha/ (aerosoli, pilvet, vesiväri; LUEMINUT-ilmakeha.md) ja elävän kaupungin
     kerrokset + julkisivuvalot + äänipisteet (LUEMINUT-elava.md). Jos agentit kuolivat nollauksessa, aja uudelleen (promptit: sama sisältö kuin listan kohdat 3–5).
   - DSM: DHM overflade (CC BY 4.0) vaatii Dataforsyningenin tokenin → PT kysyy omistajalta tiliä; ympäristömuuttuja `DATAFORSYNINGEN_TOKEN`.
     Oletus siihen asti GLO-30 (+ OSM-rakennuskorkeudet, jos parantavat). WCS: https://api.dataforsyningen.dk/dhm_wcs_DAF (coverage dhm_overflade, EPSG:25832).
   - Tekemättä: katse_suunta/katse_kaari/silma_m pysähdyksille + 4 aukiota (pysähdykset `/Users/Shared/Claude/proto-3d/_tyo/opas-esittely/kolme/korjattu/koopenhamina.json`,
     14 kohdetta; SK tekee esittely-v2:n) ja esittely_polut / lyhin reitti (malli `_valmiit/opas-esittely-v2a-vienti-20261011` kenttä `kierros`,
     worker tools/pollo/aineistot.js esittely_polut). Pieni merenneito pois. Data ämpäriin ennen kehityskaupunkilisäystä; vastaanottajat LS2 + Pelikoodari; rivi PT:lle.
