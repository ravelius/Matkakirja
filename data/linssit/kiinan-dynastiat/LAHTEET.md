# Kiinan dynastiat -linssin rajat (Karttaseppä, CC0)

Omat, käsin piirretyt monikulmiot (suunnitelma `docs/suunnitelmat/linssi-kiinan-dynastiat.md`). Lisenssi CC0-1.0.

- **Geometria:** kärkilistat `tools/kiinan-dynastiat/rajat.py`, ankkuroitu maastoon ja tunnettuihin paikkoihin (kommentit).
  Rannikko leikataan Natural Earthin 1:50m-maasta (PD, "Made with Natural Earth").
- **Vertailu:** rajoja on verrattu Cliopatria-aineistoon (Seshat Global History Databank; Chalstrey, Bennett, Mutch ym.),
  CC BY 4.0, doi:10.5281/zenodo.13363120. Cliopatrian geometriaa ei ole kopioitu; krediitti annetaan silti
  (lähdeselvitys `docs/raportit/kiinan-dynastiat-lahteet-20261016.md`).
- **Ajo:** `piirra.py <vuodet> [--vertailu]` työkansiossa, jossa `lahteet/ne/` (ne_50m_land, rivers, lakes) ja
  vertailuun `viite/` (`poimi-viite.py`). Tulos `rajat-<vuosi>.geojson` (ominaisuudet nimi, avain, tyyppi kiina/ulkoinen, väri).
- **Osamoduulit:** vuodet_a.py (200 eaa – 500), vuodet_b.py (589–1100), vuodet_c.py (1280–1912); rajat.py yhdistää ne.
  Kotiseutu näkyy vain, kun se on pääosin kansan omalla alueella (leikattu siihen).
- **Pelin data:** `kiinan-dynastiat.json` (`vie.py`, muoto `MUOTO.md`, Linssiseppä lukitsi 16.10.2026): kaikki vuodet,
  maarajat ilman rannikkoa (luokka 1 valtio, 2 protektoraatti), täytöt, kotiseudut, nimiöt ja pääkaupungit.
  Per-vuosi-GeoJSONit jäävät vertailuun; peli ei käytä niitä.
- **Tila 16.10.2026 ilta:** kaikki 19 vuotta (18 avainvuotta + loppu 1912). Qing viileä #41709c (omistaja 16.10. 20.35).
