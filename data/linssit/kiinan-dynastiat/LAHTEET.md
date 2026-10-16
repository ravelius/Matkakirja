# Kiinan dynastiat -linssin rajat (Karttaseppä, CC0)

Omat, käsin piirretyt monikulmiot (suunnitelma `docs/suunnitelmat/linssi-kiinan-dynastiat.md`). Lisenssi CC0-1.0.

- **Geometria:** kärkilistat `tools/kiinan-dynastiat/rajat.py`, ankkuroitu maastoon ja tunnettuihin paikkoihin (kommentit).
  Rannikko leikataan Natural Earthin 1:50m-maasta (PD, "Made with Natural Earth").
- **Vertailu:** rajoja on verrattu Cliopatria-aineistoon (Seshat Global History Databank; Chalstrey, Bennett, Mutch ym.),
  CC BY 4.0, doi:10.5281/zenodo.13363120. Cliopatrian geometriaa ei ole kopioitu; krediitti annetaan silti
  (lähdeselvitys `docs/raportit/kiinan-dynastiat-lahteet-20261016.md`).
- **Ajo:** `piirra.py <vuodet> [--vertailu]` työkansiossa, jossa `lahteet/ne/` (ne_50m_land, rivers, lakes) ja
  vertailuun `viite/` (`poimi-viite.py`). Tulos `rajat-<vuosi>.geojson` (ominaisuudet nimi, avain, tyyppi kiina/ulkoinen, väri).
- **Tila 16.10.2026:** luonnos 4/18 vuotta (221 eaa, 100 eaa, 1142, 1760), välikuva PT:lle.
