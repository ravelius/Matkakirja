# Valoseppä: luovutus 25.10.2026 klo 11.45 (kova raja 36 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, NUI: local_2cd29bc1-7c73-4e38-b319-8a6fd45c55ee,
JU: local_d8cad7de-3ff8-4f4b-8787-baa80836e175. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 10.58–11.4x). Lue tämä kokonaan.

## 0. AJOT KÄYNNISSÄ (tarkista ensin)

Haara `linssiseppa2/omistajapari-11` (proto-git, ei originia; ei pushattavaa), wt `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`.
Kansio `_tyo/linssiseppa2/kierros2/`. Jokaisessa: `grep KÄÄNNETTY kaanna-app2-<sha>.log` ja konsolista `pelivalo … voima 0,90`.
- **P25 daabc2b00, ketju-55** (sk-omistaja39, alkoi 11.41): salissa w1 saliaurinko 30/90, w2 kattovarjo 0, w3 60/90, w4 ulkoaurinko,
  w5 kattovarjo 1, w6 varjot 0, w7 varjot 0 + 30/90. Tulos `omistaja49-daabc2b00/` (raakakuvat todistuskansiossa, LOPPU-rivi ketju-55-lokissa).
  Kysymys: miksi salin lattia ei saa aurinkoa millään kulmalla (P23: 30–70°, atsimuutit 0–270 → kuvaero 2–5 %). Jos w2/w3
  kirkastuu → piilotetun katon varjo (4e2587791) peittää aukot; jos vasta w6 → jokin muu varjostaja; jos ei mikään → valaistus.
- **P26 84dddcf3f, ketju-56** (sk-omistaja40, P25:n jälkeen; metal + käännös ensin): 01–05 × n nyt / a kääre 0 / b + ympäristö
  suunnattu 0,5 / c + aurinko 1,55, ympäristö 1,45 (`k17 1 x x x 1.45` + `aurinkovoima 1.55`) / d + suunta 0,8. Tulos `omistaja50-84dddcf3f/`.

## 0b. P25 DIAGNOOSI (valmis 11.45, todistus-omistajapari-20261025-1141, lattian med/p90 alueella x 0,2–0,8, y 0,68–0,92)

w1 saliaurinko 30/90: 142/157 | w2 kattovarjo 0: 147/187 | w3 kattovarjo 0 + 60/90: 189/213 | w4 kattovarjo 0 + ulkoaurinko: 186/208 |
w5 kattovarjo 1 + ulkoaurinko: 143/159 | w6 varjot 0: 186/208 | w7 varjot 0 + 30/90: 177/196.
→ **PIILOTETUN KATON VARJO (4e2587791) estää kaiken auringon salissa**, myös 30° ikkunoista. Katon solmut (avoimet-v47 juhlasali):
katto_raystas y 2,98–3,52, katto y 3,11–7,53, molemmat x ±7,7 (räystäs ~1,7 m seinän yli); ikkunan yläreuna 1,99 m → 30°:n säde
ikkunan yläreunaan sivuaa räystästä (1,99 + 1,7 · tan 30° = 2,97). Matalampi aurinko (18–22°) ei P22:ssa myöskään tuonut juovia →
epäile lisäksi varjon pehmennystä/biasta (3 × 3 -teltta) tai varjopassin vertex-temppua. Seuraavaksi: salin aurinko 15–20° +
kattovarjo 1 vs 0 (juovat?), tai kattovarjo vain ulkoauringolle (salin aurinko ilman katon varjoa, katto varjostaa yhä ulkoa) – PT päättää.

## 1. TÄNÄÄN (10.58–11.45)

- **avoimet-v44–v46 puuttuivat ämpäristä (404)** → P19/P20/P21:n sali ilman avoimia huoneita (mitättömät 04-kuvat). JU vei v47:n
  (sis. v44–v46) 10.59; osoitin poimittu ec2d6d4aa (vain osoitinrivi; salin aurinko säilyi). P22 ec2d6d4aa: sali näkyy, salin
  aurinko rekisteröityi (`salin aurinko palatsi avoin juhlasali: pohjoinen (0,−1), itä (−1,0)`).
- **01 punainen lattia** = editorin 1. Render() -vika (NUI korjasi 86c645bd1, main 94b2da26b osa 0); laitteella kivi. Poistettu avoimista (PT).
- **Harmaa lattia > 7 m (PT 11.1x)**: EI TOISTU (PK:n runko e34e0fbe6, jäädytetty kamera 3,5–12 m: `lokit/esikatselu-20261025-1109/`);
  PK:n kuva oli saman editorivian 1. kuva. PT:lle ilmoitettu.
- **RappausSavy w = 2 ei vika** (w lippuna), kommentti 270761cb7.
- **Lattia (tekotapa B, albedo)**: P21 (laattakivi 1/0,85/0,7) + P22 (0,65) → daabc2b00 **laattakivi 0,72 + aukion lisäkerroin 0,8**
  (_JuoksuAukioK, QA `valo aukiokivi`). P24 (todistus-1141, NUI:n mittari `tools/havainne-mittari.py --pari`):

  | kohta | lattia havainne / P24 | varjo-% | punainen kirkk. | p5/p50/p95 havainne / P24 |
  |---|---|---|---|---|
  | 01 | 204 / 214 | 37 / 11 | 0,54 / 0,62 | 48/129/225 / 67/170/237 |
  | 02 | 200 / 225 | 25 / 21 | 0,71 / 0,89 | 66/123/221 / 100/161/247 |
  | 03 | 193 / 211 | 5 / 2 | 0,65 / 0,90 | 80/188/226 / 123/202/239 |
  | 04 | 175 / 147 | 2 / 6 | 0,53 / 0,65 | 37/134/228 / 67/140/180 |
  | 05 | 205 / 192 | 16 / 25 | 0,60 / 0,79 | 51/123/226 / 98/141/232 |

  → kujat/aukio vähän kirkkaat (+10…+25), sali tumma (−28, ei aurinkoa), punaiset kaikkialla kirkkaampia (+0,08…+0,25), tummimmat
  liian vaaleat (p5 +19…+43) = ympäristövalo liian vahva suhteessa aurinkoon → P26.
- **OMISTAJA 11.34 (PT:n kautta, sanatarkasti)**: "Saako pylväisiin ja seiniin samanlaisen valon kuin havainnekuvissa? Eli pylväät
  näyttävät pyöreiltä ja kolmiulotteisilta valon ansiosta jne". PT hyväksyi ehdotuksen 1–3: (1) suunnattu ympäristövalo, (2) kääre
  0,2 → 0, (3) aurinko/ympäristö 0,9/2,3 → kohti 1,55/1,45. 84dddcf3f: QA `valo kaari x`, `valo ymparistosuunta x`
  (JuoksuValo.hlsl JuoksuYmparisto; oletukset ennallaan 0,2 / 0). **PT:n ehto**: mittaa NUI:n mittareilla KAIKKI 01–05, mikään ok-kohta
  ei saa mennä vikaan, tummin ei mustaksi ("ei liian tummia mustia"); pari 04 + 01 (havainne | nyt | uusi) + mittaritaulukko 01–05 +
  P25:n diagnoosi SAMAAN viestiin PT:lle.

## 2. AVOIMET (järjestys)

1. P25 → salin auringon este (yllä). Korjaa ja aja 04 uudelleen (juovat pylväiden välistä kuin havainne 810/04).
2. P26 → valitse kääre/suunta/suhde mittareista (taulukko 01–05; tavoitteet: p5 havainteen tasolle 37–80, punainen 0,53–0,71,
   varjo-osuus 01 36 %), vakioiksi ValoKohteet (JuoksuKaari, JuoksuYmparistoSuunta, aurinko- ja K17AmbientK-arvot), sitten
   laattakivi uudelleen samalla mittauksella (lattia muuttuu suhteen mukana). Viesti PT:lle kohdan 1 ehdoin.
3. NS-kuittaus (salin aurinko, tekotapa B, Taihemen, kattovarjo, lämmin täyttö, laattakivi/aukio, valon suhde) vasta PT:n katsottua.
4. 05 porttikäytävä (lattia ×0,78 LR:ltä, seinä), lehvästö v1 LR:lle, rakettivideo, levyvahti.zsh.

## 3. OPIT

- Tarkista, että skenaarion mallit ovat ämpärissä (konsolista `puuttuu (HTTP/1.1 404`): koko P19–P21 ajettiin ilman avoimia huoneita.
- Editorin (esikatselu) ensimmäinen kuva3d voi olla rikki: älä tee siitä johtopäätöstä (NUI 86c645bd1 lämmitysruutu).
- Skenaariot rakennetaan lohkoittain (`split('\n\n')`), ei merkkijonoindekseillä – sk-omistaja36 sai tuplalohkon.
- aja-omistaja-skripteissä parinimi `n=${b#??-}` (muut kuin s-etuliitteet).
