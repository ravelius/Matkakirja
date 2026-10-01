# ISS-kamera, pelaajan kuva — merge-pyynnön luonnos Natiivisepälle (Linssiseppä 2, 1.10.2026)

**Haara:** proto `linssiseppa2/iss-kamera-kuva-2` (5a785a33; lineaarinen: Linssiseppä 1:n `linssiseppa/iss-fotorealismi` →
kaarisäätimet 44085dd0 + 2fee56df + 5e430ef7 → kamera 32 committia). S2-erä mergetään ensin, tämä sen päälle. Hyväksytyt kuvat
lopullinen3 (0b69f6d2) Päätoimittajalla 1.10. 21.3x; asetukset oletuksina 5a785a33 (todennus laitteella ennen merge-pyyntöä).

## Mitä tulee
- **KUVAA-nappi** kytkinpöytään OMA PAIKKA -vivun tilalle (omistajan päätös 1.10., A). Pohja: Linnanrakentajan ISS-paneeli v3
  kokonaan (`osa-kuvaa-*`, `valo-kuvaa`, sprites.json, VUODENAIKA-legenda); vipu- ja kaari-osat pois. Oma paikka on KOHDE-listan rivi.
- **Kuvaputki** (`IssKameraKuva`): kello seis → Karttasepän S2-indeksi (`s2-indeksi/v1/indeksi.json`) → COG-otsakkeet ja -laatat
  range-pyynnöin sentinel-cogsista (TCI + SCL), kaukoalue S2-mosaiikista (lehdet z ≤ 11) → projisointi Web Mercatoriin,
  pilvet ja varjot, S2:n omat pilvet maskattuna (SCL 3/8/9/10) ja täytettynä varakuvasta → täysi laattaneliöpuu PNG:inä
  `AstronauttiKerros.KuvanPinta`-paikalle → kamera kuvan kokoiseen RenderTextureen (4096 × 5120) → albumi
  `persistentDataPath/iss-albumi/<id>.jpg` + `.json` (julisteen tiedot: pikselit, polttoväli, aukko/aika/ISO, aika_utc, korkeus,
  etäisyys, aurinko, lähde "Contains modified Copernicus Sentinel data").
- **Ydin** `Linssit/Ydin/IssKamera/` (Unitysta riippumaton): Cog, Utm, Kuvasuunnitelma, Uudelleenprojisointi, Pilvikentta,
  S2Indeksi, KuvanTyosto, Valotus. **Testit** `Linssit-testit/Testit/IssKamera*` 20/20; verkkotestit lipuilla (COG_URL,
  INDEKSI_JSON + AUKKO_PPM/TASOT_PPM, PILVIMASKI=1).
- **Kaari ja utu** (haara `linssiseppa2/kaari-saatimet-2`, sis. Linssiseppä 1:n 44085dd0; LS1 kuittasi 1.10., että vien sen tämän
  mukana): Ilmakeha2 `_HrKerroin`, `_SiniKerroin`, `_UtuKerroin` (kylläinen sininen lisäsironta), `_KaariYdin`, `_KaariSyva`;
  vain kuvaputkessa, oletuksilla ennallaan; komennot `astro kyyti kaarihr|kaarisini|utu|kaariydin|kaarisyva x`.
- **Muut:** `IssSiluetti.Sumeus` (bokeh), `Avaruus.KuvaputkiAsetettu` kuvan ajaksi, testikomennot
  `astro kyyti kuvaa [4:5|9:16|4:3] [leveys] | tila | laatat 0|1 | odotus <s> | sarja <n>`.

## Mitattu (iPad-simulaattori 4CE6C737, 1.10.)
| Kuva | Data | Aika laitteella |
|---|---|---|
| 50 mm kaari 4096 × 5120 | ~13 Mt (mosaiikki 11,5 + COG 1,1) | ~2,5 min |
| 400 mm Helsinki 4096 × 5120 | 88 Mt (pilvimaskin varakuvat 35 Mt) | ~3 min |

Omistajan raja ~100 Mt/kuva (1.10.). Muisti: laatat pakattuina, purku rajattuun välimuistiin (200 Mt).

## Juurisyyt matkan varrelta
- PNG-laatat peilautuivat (EncodeArrayToPNG rivi 0 = alin) → vaakakaistat; korjattu 87dff28a.
- Cesium piirtää myös isälaattoja → täysi neliöpuu, isä kootaan lapsista.

## Avoinna ennen junaa
- Fyysisen iPadin (00008103) muisti ja aika (Natiivisepän ehto) — ei vielä mitattu.
- Rajausruutu, muotovalinta ja edistymisilmaisin: Natiivi-UI:n kameran päällyspohja (omistaja hyväksyy).
- Oletusasetusten (5a785a33) todennus ilman testikomentoja: yksi kuva laitteella/simulaattorilla ennen merge-pyyntöä.
