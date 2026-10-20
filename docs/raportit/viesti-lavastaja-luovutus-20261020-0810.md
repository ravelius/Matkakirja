# Lavastajan luovutus 20.10.2026 klo 08.10 (Opus, medium) – konteksti 45 %, PT: luovutus ja nollaus

Edellinen: `viesti-lavastaja-luovutus-20261020-aamu.md` (9c579ec2f). Viestit lähetetään send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`).
PT:lle enintään 3 riviä; kuvaparit KK:lle, kopio PT:lle. **Vientipakettia ei muuteta lähettämisen jälkeen**, vaan korjaus tehdään aina uudella nimellä.
Ei rm, ei cd, ei heredocia: muokkaa Edit-työkalulla, aja skriptit tiedostosta absoluuttisin poluin.

## ENSIN (uusi Lavastaja)
1. **Kulmatorni E**, kun Codex toimittaa (PT: posti 54bcf11ff, kansio `juoksupeli-kielletty-kulmatorni-v1/`). Kokoa se pohja.json:n
   `kulmatornit`-paikkoihin (E_luode/koillinen/lounas/kaakko). Materiaalit V4_* (marmori V4_marmori). Lisäksi LOD0/1/2 ja törmäys
   kuten muissa (työkalu `tyokalut/vie.py`). Vie uutena pakettina, esimerkiksi rakennukset-v7 tai erillinen kulmatorni-paketti.
2. Sen jälkeen: muurin harja ja reitin varren pihat lähikuvaan, **vain jos** PK:n droonikuvat näyttävät Pekingin laattojen olevan liian karkeita (PT 08.0x).
3. Leijonat ja valtaistuin ovat **sijaismalleja** (KK 08.0x: liian laatikkomaisia). PT tilaa Codexilta pronssileijonaparin ja lohikäärmevaltaistuimen
   sermeineen. Kun ne tulevat, vaihda ne samoihin paikkoihin ja kokoihin (`kk_sisusta.py`: VALTAISTUIN_Y, leijonapari()).
4. Uusia sivupalatseja ei tehdä ilman PT:n jakoa. N ja O ovat Pekingin taustassa.

## Voimassa olevat paketit (PK kytkee)
- `_valmiit/juoksupeli-kielletty-rakennukset-v6-vienti-20261020` (kansio `kielletty-rakennukset-v6`): 11 mallia, eli A, B, C, D, F, g-jalusta
  (koko kolmitasoinen terassi), g-taihedian/zhonghedian/baohedian, L ja M. Jokaisessa LOD0/1/2 (solmut runko + katto) + törmäys. Mukana rakennukset.json
  (`paikka_pohja`, reitit).
  **Kehys = KS:n pohja.json** (origo Taihedian, X itä, Z pohjoinen). Akselin +2,0335° on leivottu malleihin ja siirto (−0,308, −0,845)
  on paikka_pohja-kentässä (`tyokalut/sovita_pohjaan.py`, 678 OSM-pistettä, keskijäännös 0,6 m). v6 = v5 + V4_marmori (VS 08.0x: Lattia-laji 16).
- `_valmiit/juoksupeli-kk-tausta-peking-v2-vienti-20261020` (kansio `kielletty-tausta-v2`): Codexin Peking v11 -laatat 1_2–2_4.
  Rajattu palatsiin, 4 × 5 palaa × LOD0/1/2 (513k/324k/201k kolmiota, 53 Mt). Omien mallien kohdat on tyhjennetty, materiaalit ovat V4-paletilla
  ilman tekstuureja ja UV:ta. Pekingin ENU-origo on sama kuin pohja.json:n, joten kiertoa tai siirtoa ei ole. Mukana tausta.json.
- Vanhat (älä kytke): rakennukset-v1–v5 ja tausta-v1.

## Työkalut: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/`
- `lahde/` on kopio pilotin kielletty-kaupunki-v1/lahde:sta. Mukana myös kk-osm-koko.json (Overpass 20.10.) ja kk-rakennukset-koko.json (pilotin projektio).
- `tyokalut/`:
  - kk_juoksu.py (halli LOD-tasoin, läpijuoksujänteet, MATS)
  - kk_rakennelmat.py (terassit, kaiteet, G:n koko terassi)
  - kk_wumen.py (A)
  - kk_portit.py (B, C, D ja F)
  - kk_palatsit.py (halli_mitoista + KOMPLEKSIT L–O)
  - kk_sisusta.py (valtaistuin, leijonat, lohikäärmekivet, kivikumpu)
  - vie.py (Blender-vienti: `Blender -b --factory-startup -P vie.py -- <ulos> [mallit…]`)
  - peking_tausta.py (`-- <peking-v11> <ulos> <lod>`) ja tausta_json.py
  - esikatsele*.py ja kuvapari*.py (kuvatekstit ilman kiinalaisia merkkejä, koska Arial ei piirrä niitä)
- Esikatselukuvat ovat kansiossa `esikatselu/`. Huom: esikatselukameroiden kohteet on annettu Blender-kehyksessä (y = −pohjoinen), ja pohjoisessa akseli siirtyy
  2°:n kierron takia jopa 18 m itään/länteen.

## Opit
- Pelin glb-lukija (DioraamaGlb) ei tue EXT_mesh_gpu_instancingia. Toistuvat osat leivotaan siksi verkkoon, ja LOD-tasot keventävät.
- Pilotin kk_geom.kattonauha: räystään alapinta (alapinta=…) tuottaa otsalautoja O(n²) → käytä ala=None (kolmiot 35k → 13k).
- Pekingin glb-laatat ovat paikallisesti keskitettyjä: laatan (i, j) keskipiste on (−825 + 550 i, −1500 + 500 j) ENU.
  Ruudukko on peräisin tiedostosta data/peking-water-tiles-v7.json.

## Avoimet
- Pelisimun todiste (drooni + läpijuoksu iPhone/iPad) tehdään PK:n kytkennän jälkeen (KK).
- 60 fps on mittaamatta. g-jalusta LOD0 on 98k kolmiota kaiteiden takia; pilko terassi tarvittaessa.
- Kultaisen veden joen 5 siltaa A:n ja F:n väliin (KK; vaihe 4, sovitaan VS:n kanssa).
- Olavinlinna on tauolla. `wt/proto-linnanrakentaja-kehykset` poistetaan, kun 204 on julki.
