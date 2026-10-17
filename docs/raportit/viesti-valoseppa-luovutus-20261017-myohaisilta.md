# Valoseppä – luovutus 17.10.2026 myöhäisilta (19.5x, KOVA RAJA 36 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261017-ilta.md (23cbb3aae).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
PK local_7fcab04b-864c-4ec2-98bd-46e171326701, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja: $D/JONO.md (kaikki rivit 17.42–19.5x). proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto.
SIMUT VAIN JU:n "SIMU NYT" -viestillä; heti vuoron jälkeen "SIMU VAPAA" JU:lle.

## 0. ENSIMMÄISENÄ (PT:n järjestys): Louvre k83 → valas k14 samalla simuvuorolla
**PT:N JÄRJESTYS 19.5x (sitova, korvaa alla olevan):** 1) Louvre k83 → pari k82 | k83 PT:lle. 2) Kartan 3D-yhtenäistys PK:n galleriaan
(varjostimet valmiina linssiseppa2/kartta-seepia 6a2659c59, kytkin KarttaSeepia.Aseta = PT:n "_KarttaYhtenainen"; auta PK:ta kytkennässä,
Maamerkit-materiaali LR:n kanssa). 3) Valas k14 (käännetty) diagnoosi vasta sen jälkeen – k14:n voi kuvata samalla simuvuorolla kuin k83,
mutta raportti PT:lle k83:n ja kartan jälkeen.
1) **Louvre k83** (PT: "pyramidi hehkuu yöllä lämpimän kullanvalkoisena, ei huurteisen valkoisena"): koodi be5025541 haarassa
   linssiseppa2/louvre-k83 (EI junahaarassa), paketti louvre1/v6k18-lv2f-k83 (yoValo [3; 0,3; 26]). Käännös `louvre1/k83-kaanna.zsh`
   oli jonossa 19.49 (appi $D/t217-louvre-k83; tulos louvre1/k83-kaanna.out). Kun KÄÄNNETTY → "KÄÄNNÖS VALMIS <sha> k83" JU:lle.
2) **Valas k14** käännetty 1ddccd615 (appi $D/t216-valas-k14), JU:lle ilmoitettu; JU:lle ehdotettu yhteistä vuoroa k83 + k14 (~18 min).
   SIMU NYT → `zsh $D/louvre1/kuvaa-k83.zsh` (pari k82 | k83) ja `zsh $D/valas-havainne/k14/valas-k14.zsh --vain-kuvat`
   → SIMU VAPAA → `python3 $D/valas-havainne/k14/vertailu.py` → PT: louvre1/lahi-L1-L3/k83 (tee yö-cropit kuten k82/yo-pyr-k77-k82.jpg,
   nyt k82 | k83) + valas-havainne/k14/vertailu-k8-k14.jpg. PT:n järjestys: k83 → valas → omistajalle vasta PT:n kautta.
   k14 = k13 + korjattu näkymätön vesirajakuohu (Kuohu nousu: false) + keskipiste 2,5 m pinnan alla (vain selkä ja kylki vedestä).
   Tarkista: näkyykö kuohu kylkeä vasten ja lukeeko valas yhä valaana (k12/k13 lukivat). Jos k14 ei paranna → valas tauolle + rivi PT:lle.

## 1. TEHTY TÄLLÄ VUOROLLA (17.42–19.5x)
- **Louvre k82 JUNASSA 200**: NS runko 1b9031235 vihreä (Linssit 2012); koodi haara linssiseppa2/louvre-yo-200 = efd75c836 (yöfix
  e17d527ee + oma yövalo da225cca1 + lasin sisähehku b9abeb81c; varjoSavy-koodi poistettu: k76–k81 ei vaikutusta, 160°-kulmissa
  julkisivu on auringon puolella). Data LR v6k25 (louvre yoValo [3; 0,3; 40]) lukitusehtona (JU R2).
- Kuvat: k80 (yö raidaton, ei hehkua), k81 (yövalo 3/0,3/40 + varjoSavy-diagnostiikka: ei vaikutusta), k82 (hehku näkyy, PT hyväksyi).
- **Valas**: k11 hylätty (pystyraidallinen suorakaide) → k12 d9dbce854/a33a59fc2: valas KIINTEÄNÄ MALLINA, lepää pinnassa ~2 s
  iskun jälkeen (ValaanHyppy KelluuM/LepoS), VAT ilman pisaravalasta (valas_vat_k6.py patsas=0) → LUKEE VALAANA (PT: läpimurto).
  k13 1f85148d6: vesirajan leikkaus varjostimeen (_ValasPinta), rintaevät taakse + tummiksi (EvaTumma), kuohu (näkymätön, ks. k14).
- **Kartan 3D-sarja** (omistaja 19.27, LR vetää): haara linssiseppa2/kartta-seepia = 6a2659c59 (Shaders/KarttaSeepia.hlsl, AjattelijaPaa +
  Symbolimalli, kytkin Matkakirja.KarttaSeepia.Aseta(bool), oletus pois). LR + PK:lle kerrottu. Avoinna: Maamerkit (URP Lit) → materiaali
  AjattelijaPaa-varjostimelle (LR:n kanssa), varjostinkäännös varmistuu vasta Unity-ajossa.
- **Levy** (PT/Postivahti): vanhat appit + kaappaukset T7:lle /Volumes/T7 4TB/arkisto/valoseppa/20261017-ilta; 13 omaa worktreetä pois
  (haarat tallessa). Jäljellä wt/proto-linssiseppa2-{louvrepeili (HEAD louvre-k83), valas, v4, karttaseepia}.

## 2. JONO
1) k83 + k14 (yllä). 2) Kartan 3D-sarja LR:n pyynnöstä (galleria-arkki LR/PK; Maamerkit-materiaali). 3) V4 pala 4 (HDR) PT:n päätöksellä.
4) Valas: sävyt (RakettiValas evän valopoikkeus, k8 meren sävy) Valopohjaan ennen junaa. 5) k83 junaan vain PT:n kuittauksella (haara
   louvre-k83 = louvre-yo-200 + be5025541; data z 26 LR:lle).
Omat appit _tyo:ssa: t214-louvre-hehku (k82, pois kun k83 kuvattu), t215-valas-k13 (pois kun k14 kuvattu), t216-valas-k14, t217-louvre-k83.
