# Kiinan dynastiat -linssi: pallodatan muoto (Karttaseppä → Linssiseppä, LUKITTU 16.10.2026)

Linssiseppä lukitsi tämän muodon 16.10.2026 (proto linssiseppa/kiinan-dynastiat 2452aa1f5). Per-vuosi-GeoJSONit
(rajat-<vuosi>.geojson) jäävät haaraan, mutta peli ei käytä niitä.

Tiedosto: `kiinan-dynastiat.json` (tämä kansio ja haarassa karttaseppa-kiinan-rajat
`data/linssit/kiinan-dynastiat/kiinan-dynastiat.json`). Tuottaja: `skriptit/vie.py` (haarassa tools/kiinan-dynastiat/).
Lisenssi CC0 (krediitti `attribuutio`-kentässä).

Pohja on Isoisä 1873 -muoto (`Isoisa1873Aineisto`: `viivat [{ l, p [[lon, lat]] }]`, `valtiot [{ teksti, lat, lon,
luokka, koko }]`) per vuosi, ja lisäksi täytöt. WGS84 lon/lat, 3 desimaalia, alue 60–145° I (antimeridiaania ei
ylitetä). Viivat tihennetty ≤ 0,25° välein, täyttöjen reunat ≤ 0,5° (pitkä jakso ei painu pallon pinnan alle).

```
{
  "$skeema": "matkakirja-linssi/kiinan-dynastiat/1",
  "lisenssi": "CC0-1.0", "attribuutio": "...Cliopatria CC BY 4.0 ...", "lahdekoodi": "...",
  "luokat": { "1": "valtionraja", "2": "protektoraatin tai vasallin raja" },
  "tyypit": { "kiina": ..., "ulkoinen": ..., "protektoraatti": ... },
  "vuodet": [ {
    "vuosi": 1760, "otsikko": "1760",                        // eaa negatiivisena: -221, otsikko "221 eaa"
    "alueet": [ { "nimi": "Qing", "avain": "qing", "tyyppi": "ulkoinen", "vari": "#c9a227",
                  "monikulmiot": [ [ [[lon,lat],...] /*ulkokehä*/, [[lon,lat],...] /*reiät*/ ], ... ] } ],
    "kotiseudut": [ { "avain": "qing", "vari": "#c9a227", "monikulmiot": [...] } ],   // vinoviivoitus
    "viivat": [ { "l": 1, "p": [[lon,lat],...] } ],            // vain maarajat; rannikko tulee pohjasta
    "nimet": [ { "teksti": "QING", "lat": .., "lon": .., "luokka": 1|2, "koko": "suuri"|"keski"|"pieni" } ],
    "paakaupungit": [ { "nimi": "Peking", "lat": .., "lon": .. } ]
  } ]
}
```

- `tyyppi` kiina = kiinalainen dynastia (lämmin perhe), ulkoinen = ulkoinen hallitsija (viileä), protektoraatti =
  emovaltion (sama `avain`) vaaleampi sävy, ei pisteitä pallolla; rajaviiva luokka 2 (katkoviiva), myös emovaltion vastaan.
- `nimet.luokka` 2 = protektoraatti (kursiivi kuten Isoisän vasalli). koko: kiina suuri, ulkoinen keski, protektoraatti
  pieni (peli näyttää pienen keskikokoisena, Linssiseppä 16.10.).
- Kotiseutu on mukana vain, kun se on pääosin kansan omalla alueella, ja se on leikattu siihen.
- Alueet eivät mene päällekkäin (aiempi voittaa, leikattu Natural Earth 50 m -maahan).
- Värit ovat suunnitelman (docs/suunnitelmat/linssi-kiinan-dynastiat.md luku 3). Qing viileä #41709c (omistaja
  16.10.2026 klo 20.35): ulkoiset viileät, kiinalaiset lämpimät, Jin ja Qing sukulaisvärein.
- Avainvuodet (18 + loppu): -221, -200, -100, 140, 250, 440, 500, 589, 669, 790, 950, 1100, 1142, 1280, 1421, 1644,
  1760, 1873, 1912. Välivuodet interpoloi moottori.
- Nimiön paikka on alueen sisin kohta (polylabel), paitsi `vie.py`:n `NIMET_KASIN`-taulussa käsin siirretyt (Wu 250, Itäturkit 589,
  Eteläinen Tang 950 kahdella rivillä, Nurgan 1421; selkeän historiakartan 2× nimet törmäsivät, Karttaseppä 18.10.2026).
