# Valoseppä – luovutus 20.10.2026 klo 16.55 (Postivahdin KOVA RAJA 39 %)

Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä), JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b,
NS local_fcc10552-5810-49bf-b0cf-188456f1231c, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795, LT local_36a45147-8407-4cfb-bbdb-c20d5f684735,
Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b. D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin).
Proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki (haarat paikallisia). VIESTIRAJA: SendMessage-raja täynnä → mcp__ccd_session_mgmt__send_message.
OMISTAJA 11.45: simu vain uudelle tekniikalle; 15.40-erät ilman simua (testit vihreinä → NS). Ei irrotettuja ajoja käynnissä.

## 0. ENSIN: JUOKSUN GPU (juna 208, PT kiireellinen; ehto 60 fps, ei ilmestymisiä, ei puuttuvia varjoja, GPU ≤ 14 ms iPad Pro 13)
- Tila: LT mittaa PK:n yhdistelmää pelikoodari/gpu-208-yhdessa **f861b6fd3** (= minun varjo-gpu-208 b6e253a6d + PK kokoluokat 7c0b1a0e9 +
  sirpaleet vasta iskussa 5fd00f8b1), laiteappi lokit/natiiviseppa-app-208-gpu-yhdessa-f861b6fd3-laite. Vaiheet $D/varjot-koko/lt-gpu-komennot.txt
  (J liikkeessä, A uusi oletus, A0 heitto 1 = vanha, B varjot 0, C 24 m/1, D heittok 25, F farClip 400, H jälki 0), raskas kohta ~14 s.
  Tulos → $D/varjot-koko/lt-gpu-tulos.txt tai lokit/laitetestaaja-208cd13-ipad-20261020/.
- Syy (konsoli): piirtäjät 6,5 k → 106 k aarteiden sirpaleista (PK korjasi). Varjojen osuus kevyessä kohdassa 0,56 ms (LT).
- Minun osuus b6e253a6d: varjon heitto kun etäisyys < 40 × koko (koko = max(korkeus, 0,3 × leveys)), hahmot aina, jaksotettu 4000/ruutu;
  QA ui juoksupeli valo heitto 0|1, heittok K, varjomatka m [1|2] (Valopohja.PeliVarjot), kauko m, jalki 0|1.
- PT 16.5x: PK vie mittaukset loppuun (f861b6fd3 yhteisappi, LT:n tulokset lt-gpu-tulos.txt); OLETUSTEN KORJAUS KESKEN – uusi sessio viimeistelee varjo-oletukset.
- LT 16.55 (lt-gpu-tulos.txt): A 34,5 ms, B varjot 0 34,2 → VARJOT EIVÄT OLE SYY, oletukset jäävät (b6e253a6d). Kulu = farClip × jälkikäsittely
  (F −7, H −11, FH 10,3 ms). VS → PK: epäily liike-epäterävyys "Camera and Objects" -liikevektoripassi ja syvyysesipassi; kokeile "Camera Only" + syvyyskopio. PK jatkaa.
- TEE: lue LT:n tulos → jos A ≤ 14 ms ja J ilman jäätymistä → PT:lle OK (NS: f861b6fd3 runkoon); jos ei → säädä HeittoK/varjomatka (QA-arvoista)
  tai, jos 60 fps + ei ilmestymisiä + varjot eivät täyty yhtä aikaa, rivi PT:lle (omistajalle valinta videolla).

## 1. NS:LLÄ / RUNGOSSA (PT OK)
- Louvre: af60d60f8 keilaton atlas (paketti _valmiit/taidemuseo-ranska-v2r-vienti-20261020 ämpärissä) → fbeae02dc seinäspotti → museo-kohdevalo
  **100042f7c** (omistaja 15.40: kankaan huulivarjo 2 cm/7 mm/4 mm, kohdevalon pesu kaikista teoksista Gauss σ 0,45×koko+0,5 m seinä+lattia,
  voima 0,7, rae 0,4 + kankaalle 0,1; QA museo seinaspotti/kangasvarjo/raeteos x). JU:n kääntötarkistus OK 15.51; ei simua → omistaja iPadilla.
- Juoksun varjot koko näkymään c8c12fef4 (140 m, 2 kaskadia, häive 100–136 m; ⊃ 41096802e) PT OK → NS; GPU-korjaus yllä.

## 2. OPIT
- Uuden salin kattokeila on 9–14 m taulusta (MuseoValo.KattoKeila): älä rajaa keiloja etäisyydellä < 30 m (spotti k1 ei näkynyt).
- Laitteen GPU-piikki: katso ensin konsolin "varjoja heittää N" -kasvu ja mikä sen laukaisee, ennen varjo-/valoparametreja.
- Homebrew-python3:ssa ei numpya: kuva-/atlasskriptit venv-rembg:llä (-I).
