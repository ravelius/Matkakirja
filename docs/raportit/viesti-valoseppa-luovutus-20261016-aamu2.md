# Valoseppä – luovutus 16.10.2026 aamu 2 (05.2x, KOVA RAJA 36 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261016-aamu.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut). NS local_674b9ec4,
NUI local_44392b3c, LR local_996d60ab, Julkaisija local_5cb16c00.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Jono ja tila: $D/JONO.md (loppu "TILA 16.10. 04.1x" →). Simuloki: $D/testi196-uusi.log.
SIMU A26BC7D0 (iPad) on Valosepällä; kun kaikki alla oleva on ajettu → "SIMU VAPAA" Julkaisijalle.

## 0. ENSIMMÄISENÄ: TAUSTAT (voivat katketa nollauksessa – `pgrep -fl "ajo-p340i|kelaus-rajaus"`)
1. `peking284/ajo-p340i.zsh` (alkoi 05.19): Peking v3 + ionin maski + iltavalo + ion-väli, appi $D/t196-k3 (cd035dfde), klo 13 ja 18
   → lokit/valoseppa-peking340i-13 ja -18 (tapahtumat.txt: "ionin maasto + ilmakuva piilotettu 12 alueelta", "ion-väli …").
   Kuolleena: aja uudelleen (odottaa "K3-KETJU VALMIS" uusista riveistä → poista odotus tai aja kuvat.zsh-rivit käsin).
2. `iss-nyt/kelaus-rajaus.zsh`: L2-käännös kelaus-rajaus-196 → $D/kelaus-app, sitten NUI:n minipallo-skenaario iPadilla Pekingin jälkeen
   → iss-nyt/kelaus-rajaus.out + lokit/todistus-kelaus-rajaus-196-*. TARKISTA: "cupolan kelausesihaku … N laattaa" (satoja, ei 5245),
   "valmis X s" < 4 s, "kevyt pallo ulos … (laatat valmiit)" ennen 4000 ms. Tulos PT:lle + NUI:lle; haara NS:lle PT:n kuittauksella.
3. Ali-agentit (kuolevat nollauksessa – tarkista tulos, aja uudelleen jos puuttuu):
   a) Louvre k27 -leivonta + paketti: tulos $D/louvre1/syvyys/LOD0-RAPORTTI-k27.md, $D/louvre1/v6k18-lv2f-k27s, $D/louvre1/kuvat-v2f-k27s.zsh.
      Puuttuu → sama tehtävä uudelleen (resepti: syvyys/LOD0-RAPORTTI.md, lod1-k21.sh, rakenna-k23s.log; lähde _valmiit/louvre-v1/glb 04.25).
   b) K3-kierrosten arvio: $D/KIERROKSET-20261016-ARVIO3.md + kunkin k3/k8-kansion ARVIO.md (ARVIO2:n muodossa).

## 1. SEURAAJALLE ENSIMMÄISIKSI
### a) Louvre-pelikuvapari LR:lle (PT 05.3x: ennen muuta; LR vahvisti k27 + Valosepän syvyysleivonta LOD0+LOD1)
- Kun paketti valmis ja simu vapaa: `zsh $D/louvre1/kuvat-v2f-k27s.zsh` → pari kulma B (kuten louvre-v2f-k23s-pari-kulmaB.jpg) → LR:lle + PT:lle.
- LR arvioi k23s-parin (01.42) ja voi pyytää muutoksia ennen ajoa – lue LR:n viesti.
### b) Peking 1b (haara linssiseppa2/peking-ion-196, wt/proto-linssiseppa2-peking, pohja 2c72c4935 junassa)
- 3a2212636 ionin palatsimaski (mallit.json "ion_leikkaus" = Codexin KAIKKI 12 osaa; peking284/rakenna.py --ion), efd70bbb4 iltavalo
  (ionin maa IlmakehaLaatat _IonKuva → himmenee illalla; klo 18 katot 81,59,33 vs maa 150,132,97), 343666486 ion-väli lokiin
  (ion-naytteet.json 593 näytettä, agentin selitys peking284/ion-naytteet.md; alkuperäisiä 221 koordinaatteja ei ollut, toistettu).
- Paketti peking284/p340v3i (portti 0). Arvioi ajo-p340i-kuvat (vertaa peking340-vs-284-klo13/18.jpg): maski (ei ionin taustaa palatsissa,
  vedet näkyvät), ilta (maa ja katot samassa valossa), ion-väli (alle 0,30 m määrä) → ARVIO-p340i.md → PT (≤ 3 riviä) → PT:n kuittauksella
  peking-ion-196 NS:lle junaan; Codexille palaute (puut edelleen harmaat? ion-väli-tulos) postilaatikkoon; vienti uusi versiokansio + uusin.json.
### c) ISS-kierrokset k3/k8 (ARVIO3) → seuraavat korjaukset iss-efektit-196:een (wt/proto-linssiseppa2-iss-efektit) ja testi-196:een.
- Avoinna edelleen: salamat k3 ODOTTAA omistajan palautetta Eurooppa-videosta; revontulet k11 _Punainen 3→6 (Revontulet.cs r. 396).

## 2. VALMIIT TÄLLÄ VUOROLLA (04.1x–05.2x)
- Löydös 1 (mustat kolmiot T+2:30) juurikorjaus kerros28-196 2d99623a5 VAHVISTETTU (video d1c746ce, ARVIO-0421.md) → PT kuittasi → NS
  yhdisti junaan (e68faa906).
- NUI:n Shanghai-löydös (perillä vino laattaraja): syy kuukauden vaihto + esihaku ei kattanut kelauksen kohdetta (iss-nyt/SHANGHAI-KELAUS-20261016.md).
  Osa 1 kelaus-esihaku-196 (6405bd562, a726e22a2 KelausOsuus, 6458eb0fb kohde paras hetki -siirrolla) + NUI:n osa 2 → junassa (a7ebebe1b).
  PT:n jatko: rajaus näkymän alueeseen kelaus-rajaus-196 ca8aad04e (CupolanLaatat.NakymanAlue; Dublin iPhone 354 laattaa, ennen 5245;
  testi KelausRajattuNakymanAlueeseen) → todistus taustalla (kohta 0.2).
- K3-ketju: käännös cd035dfde (testi-196 ⊃ peking-ion, kelaus-esihaku), perseidit k3, hurrikaani k3, vanat k3, tulivuoret k8 ajettu 05.19.
- Levy: K3-käännös kaatui 04.41 (24 Gt < 25) → poistettu omat vanhat appit ja 14 junaan yhdistettyä proto-worktreetä (levy 50 Gi).
  Jäljellä worktreet: iss-efektit, kelaus (haara nyt kelaus-rajaus-196), peking, revontulet-v7, testi.

## 3. HAARAT (proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto)
- peking-ion-196 343666486 (EI vielä junassa), kelaus-rajaus-196 ca8aad04e (EI vielä junassa), testi-196 76a6e48f1 (kierroksiin, EI junaan),
  iss-efektit-196 74e74f5a1. Junassa: kerros28-196, kelaus-esihaku-196 6458eb0fb.

## 4. HUOM
- Julkaisija: L2-linjalla muiden ehtokäännökset ensin; tarkista lukko /tmp/matkakirja-kaannospalvelu-2.lukko/kuka.
- ÄLÄ aja skriptejä `zsh -x`:llä (avaimet lokiin). Ketjuskriptit odottavat lokirivejä: uudelleenajossa lue vain uudet rivit (ks. ajo-p340i.zsh N0).
