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
- 17.01 PK siirsi jälkikäsittelyn VS:lle. QA-valinnat a53817ef2 (linssiseppa2/jalki-gpu-208, f861b6fd3 päällä) → JU laiteappi → LT kierros 3
  ($D/varjot-koko/lt-gpu-komennot-3.txt); kierros 2 vanhalla apilla (-2.txt). Tulokset lt-gpu-tulos-2/3.txt → paras yhdistelmä oletukseksi → PT.
- 17.02 PK (PT:n päätös): GPU-veto kokonaan PK:lla, VS:n osuus päättyi. a53817ef2 PK:n käytettävissä (QA msaa/skaala/mv/liike). EI TEHTÄVÄÄ VS:lle tässä.
- TEE: lue LT:n tulos → jos A ≤ 14 ms ja J ilman jäätymistä → PT:lle OK (NS: f861b6fd3 runkoon); jos ei → säädä HeittoK/varjomatka (QA-arvoista)
  tai, jos 60 fps + ei ilmestymisiä + varjot eivät täyty yhtä aikaa, rivi PT:lle (omistajalle valinta videolla).

## 0a. JUOKSUN JÄLKIKÄSITTELY (PT 17.3x: VS:n vastuulla, PK kovalla rajalla)
- LT korjattu: 10e6a5a68 raskas kohta 34,2 ms, syy liike-epäterävyys. Kierros 4 $D/varjot-koko/lt-gpu-komennot-4.txt (täysi res, MSAA 4: S sumea 0,
  V mv 0, K liike kamera, H0) → lt-gpu-tulos-4.txt. TEE: kevein ≤ 14 ms joka säilyttää vauhdin tunnun (V > K > S; ei skaalaa/MSAA:ta) oletukseksi
  (Jalki.cs SeinatLiikevektoreissa / Valopohja.JuoksuLiikeKappaleet) jaatyminen-208:n päälle → tarkista.sh → NS runkoon 208 + rivi PT:lle.
- 17.34 PT/KK: rajaus kameraan ensin → c5f9217ac (linssiseppa2/hehku-avaus-208 = avaus 1f1a75eec + hehku 404a63482 + OLETUS mv seinät 0). NS kääntää →
  LT kierros 5 (lt-gpu-komennot-5.txt, korvaa 4): A ≤ 14 → NS runkoon 208 + PT; muuten K (liike kamera) tai S oletukseksi.
- 17.35 Hehku mitattu (hinta ≈ 0) ja kuvat katsottu → voima 0,5 + h² cc9564c36 (sama haara, c5f9217ac:n päällä) = LT:n kierroksen 5 appi.
- 17.42 OMISTAJA 17.42 (KK): TAUKO iPad-mittauksiin, kunnes NS:n iPhone-paketti on asennettu (~18.45). NS:lle tarjottu c5f9217ac + cc9564c36 vain jos ei
  viivytä; muuten paketin jälkeen LT kierros 5 (cc9564c36-appi lokit/natiiviseppa-app-208-hehku-avaus-cc9564c36-laite) → runkoon + PT. Runko e3cff21f6 ⊃ 404a63482.
- 17.43 NS otti cc9564c36:n (⊃ c5f9217ac) iPhone-pakettiin. TEE paketin jälkeen: LT kierros 5 (GPU-vahvistus + kuvat) → katso kuvat → rivi PT:lle.
- 17.44 LT k5: mv 0 26,3 ms (mv 1 33,6), täysi res + MSAA 4 ei riitä ≤ 14:ään. SUOSITUS PT:lle (odottaa OK): iso iPad juoksussa skaala 0,8 + MSAA 2 + mv 0
  (~12 ms) → $D/varjot-koko/VS-suositus-208-gpu.md. OK:n jälkeen Jalki.cs-oletukset vain isolle iPadille → NS-laitekäännös → LT vahvistus paketin jälkeen.

## 0b. KERÄTTÄVIEN HEHKU (PT, omistaja 17.17)
- e35e43ee0 linssiseppa2/hehku-208 (PK jaatyminen-208 10e6a5a68 päällä): kameraan kääntyvä lisäävä neliö kerättävän lapsena (Resources/JuoksuHehku.shader,
  JuoksuV4Maailma.Hehku.cs), kulta/jade/lohikäärmeen sävy, mätä ei hehku; QA valo hehku 0|1, hehkuvoima V (0,35). NS kääntää laiteapin → LT kuvapari H1/H0 +
  GPU ($D/hehku-208/lt-komennot.txt) → katso kuvat itse → PT:lle 3 riviä → NS runkoon PK:n jäätymiskorjauksen jälkeen.
- AVAUS (PK, pelikoodari/avaus-208 088f99027, JuoksuAvaus.Tapahtui): hehku 0 lennossa → nousu MaataPitkin 3,6 s → täysi OhjausPelaajalle 8,4 s;
  ei tapahtumaa = täysi. VALMIS 404a63482 (linssiseppa2/hehku-avaus-208 = hehku-208 + avaus-208 088f99027) → NS ottaa avauksen junaan tullessa.

## 1. NS:LLÄ / RUNGOSSA (PT OK)
- Louvre: af60d60f8 keilaton atlas (paketti _valmiit/taidemuseo-ranska-v2r-vienti-20261020 ämpärissä) → fbeae02dc seinäspotti → museo-kohdevalo
  **100042f7c** (omistaja 15.40: kankaan huulivarjo 2 cm/7 mm/4 mm, kohdevalon pesu kaikista teoksista Gauss σ 0,45×koko+0,5 m seinä+lattia,
  voima 0,7, rae 0,4 + kankaalle 0,1; QA museo seinaspotti/kangasvarjo/raeteos x). JU:n kääntötarkistus OK 15.51; ei simua → omistaja iPadilla.
- Juoksun varjot koko näkymään c8c12fef4 (140 m, 2 kaskadia, häive 100–136 m; ⊃ 41096802e) PT OK → NS; GPU-korjaus yllä.

## 2. OPIT
- iPad-laitekäännökset pyydetään suoraan NS:ltä (JU tekee vain simukäännöksiä).
- Uuden salin kattokeila on 9–14 m taulusta (MuseoValo.KattoKeila): älä rajaa keiloja etäisyydellä < 30 m (spotti k1 ei näkynyt).
- Laitteen GPU-piikki: katso ensin konsolin "varjoja heittää N" -kasvu ja mikä sen laukaisee, ennen varjo-/valoparametreja.
- Homebrew-python3:ssa ei numpya: kuva-/atlasskriptit venv-rembg:llä (-I).
