# Valoseppä – luovutus 19.10.2026 klo 21.0x

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, NS local_fcc10552-5810-49bf-b0cf-188456f1231c, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795,
TKS local_78dcb005-50d8-4361-adff-42534a2df3a1, Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin). Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA.
TÄRKEÄ: todistusajo.sh on gitissä 100644 → kutsu AINA `zsh $AJO` (omat skriptit korjattu).

## 0. TILA LUOVUTUSHETKELLÄ
- Juna 206 julkaisupyyntö: muut simut PIDOSSA ~22.30 asti (JU). pimennys-lauta 5126cff3d käännös JU:lla (~21.05) → $D/tulivuoret-app.
- Kun SIMU NYT tulee: `zsh $D/ajo-b5-lauta.zsh <KÄÄNNETTY-SHA>` (tulivuoret k13 + pimennys L1, iPad ~25 min) → SIMU VAPAA →
  tuoreet Sonnet-arvioijat: tulivuoret/arvioija.md → kierrokset/k13/ARVIO.md, pimennys/arvioija.md → kierrokset/kL1/ARVIO.md → PT:lle 3 riviä.
  Vertailukohdat: tulivuoret paras k10 2,8 (k12 2,2), pimennys paras k4 4,8 (PT: k4 pysyy parhaana, kunnes uusi voittaa).

## 1. VALMIIT TÄNÄÄN (kaikki junissa tai kuitattu)
- Nostokortti-b e696164d9 + M-nappi 7c674a023 → juna 204 (NS mergetty). M-rivi 6e02502d8 → juna 205 (PT hyväksyi, NS:lle pyyntö).
- Juoksupelin palatsivalo linssiseppa2/juoksu-valo-205 0654b1763 (k3, käännös f16cbccbd) PT HYVÄKSYI → NS liittää junaan 206 PK:n 206-jatkon
  (.gamma 9ed9e57ff) jälkeen, EI merge-pyyntöä minulta. Todisteet $D/juoksuvalo/parit-k3/. Testit: `ui juoksupeli valo [0|1|varjot|jaady]`.
- Pimennys k6 4,2 → 7.20 PYSÄHDYS (PT kuittasi); menetelmänvaihto lautaan hyväksytty.

## 2. KESKEN
- RAKETTIVIDEO (omistaja 17.32 + 18.25 + 18.29; 18.55 ja 19.03: VAIN YÖLLÄ, kun kone muuten vapaa: ei käännöstä/simua, load 5 min < 16;
  juoksupeli ensin): haara linssiseppa2/raketti-video-204 88f708220 (wt /Users/Shared/Claude/wt/proto-linssiseppa2-rakettivideo; TKS:n
  Videotallennin 924891faa + VIDEO-laatu + T0 pelikellolla), käännetty → $D/rakettivideo-app. Ajo `zsh $D/rakettivideo/aja.zsh <SHA>`
  (iPhone, 30–45 min) → TKS:lle UDID 8D1FD618-A7BD-48F8-8BB4-3E91A95834FD + nimet valas-3s / raketti-10s koontiin
  (tyokalut/video-kokoa.sh) → vertailupari → PT. Leikkausohje skenaarion alussa ($D/rakettivideo/sk-kokeilu.txt). PK: diff katselmoidaan myöhemmin.
- B5 ilmiöt seuraavaan junaan (omistaja 16.56: eivät junan ehto, keskeneräiset "Tulossa"): vanat paras k7 (ei kytketä nyt), hurrikaani
  päättyi (k9 4,8), tulivuoret k13 + pimennys L1 yllä.

## 3. TYÖTILAT JA APPIT
- wt: proto-linssiseppa2-nostot (iss-nostot-204, kaikkien B5-haarojen pohja), -tulivuoret (k13), -pimennys (lauta, ⊃ k13), -rakettivideo,
  -juoksuvalo, -mrivi (poista kun 205 mergetty). Appit: juoksuvalo-app, rakettivideo-app, tulivuoret-app (tulossa).

## 4. OPIT
- Kuvapari samasta hetkestä: jäädytä peli (juoksupelissä askel kulkee unscaledDeltaTimella → oma lippu, timeScale ei riitä).
- glTF baseColorFactor on lineaarinen → SetColor(väri.gamma) lineaarisessa projektissa (muuten väri muuntuu kahdesti).
- Agentin skriptimuutokset: tarkista rivit (kommentti voi katkaista komennon, aja-kierros.zsh rivi 13).
- Parien ENNEN-puolelle oma kuvateksti (PT).
