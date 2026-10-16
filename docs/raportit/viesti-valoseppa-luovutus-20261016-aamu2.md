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
   a) Louvre K28 (LR 05.24: pyramidin länsikiveys omaa + uusi leikkausrengas leikkaus_latlon*.json; rakennukset = k27) -leivonta + paketti:
      tulos $D/louvre1/syvyys/LOD0-RAPORTTI-k28.md, $D/louvre1/v6k18-lv2f-k28s, $D/louvre1/kuvat-v2f-k28s.zsh; sijainnit.json:n leikkaus UUDESTA renkaasta.
      Puuttuu → sama tehtävä uudelleen (resepti: syvyys/LOD0-RAPORTTI.md, lod1-k21.sh, rakenna-k23s.log; lähde _valmiit/louvre-v1/glb 04.25).
   b) K3-kierrosten arvio VALMIS: $D/KIERROKSET-20261016-ARVIO3.md (yhteenveto JONO.md:n lopussa).

## 1. SEURAAJALLE ENSIMMÄISIKSI
### a) Louvre-pelikuvapari LR:lle (PT 05.3x: ennen muuta; LR: k28 + Valosepän syvyysleivonta LOD0+LOD1)
- Kun paketti valmis ja simu vapaa: `zsh $D/louvre1/kuvat-v2f-k28s.zsh` → pari kulma B (kuten louvre-v2f-k23s-pari-kulmaB.jpg) → LR:lle + PT:lle.
- LR arvioi k23s-parin: reunus pois toimii, patsaan alla siisti. Uutta k28:ssa: kiveys pyramidin edessä peittää Googlen tumman sotkun – tarkista se parissa.
### b) Peking 1b (haara linssiseppa2/peking-ion-196, wt/proto-linssiseppa2-peking, pohja 2c72c4935 junassa)
- 3a2212636 ionin palatsimaski (mallit.json "ion_leikkaus" = Codexin KAIKKI 12 osaa; peking284/rakenna.py --ion), efd70bbb4 iltavalo
  (ionin maa IlmakehaLaatat _IonKuva → himmenee illalla; klo 18 katot 81,59,33 vs maa 150,132,97), 343666486 ion-väli lokiin
  (ion-naytteet.json 593 näytettä, agentin selitys peking284/ion-naytteet.md; alkuperäisiä 221 koordinaatteja ei ollut, toistettu).
- Paketti peking284/p340v3i (portti 0). Arvioi ajo-p340i-kuvat (vertaa peking340-vs-284-klo13/18.jpg): maski (ei ionin taustaa palatsissa,
  vedet näkyvät), ilta (maa ja katot samassa valossa), ion-väli (alle 0,30 m määrä) → ARVIO-p340i.md → PT (≤ 3 riviä) → PT:n kuittauksella
  peking-ion-196 NS:lle junaan; Codexille palaute (puut edelleen harmaat? ion-väli-tulos) postilaatikkoon; vienti uusi versiokansio + uusin.json.
- AJO VALMIS 05.3x (lokit/valoseppa-peking340i-13 ja -18, tapahtumat.txt): maski OK ("ionin maasto + ilmakuva piilotettu 12 alueelta").
  ION-VÄLI LÖYDÖS: 593/593 näytettä, ioni oman pinnan YLÄPUOLELLA: mediaani −5,43 m, pienin −16,37 m (palatsimaa 39,915085 116,391867:
  oma 37,14, ioni 53,51), alle 0,30 m 579/593; vesireuna-maa pienin −11,47. Hypoteesit: (1) ionin maasto on kaupungissa pintamalli
  (rakennukset/puut mukana – suurimmat erot halleissa), (2) korkeusjärjestelmä (geoidi ~ −9 m Pekingissä) tai agentin oma_h-laskenta
  (+37,9 m origo) väärin. Tarkista ensin (2) näytteistä tasaisilla aukioilla; sitten PT:lle ≤ 3 riviä + Codexille. Ion-vedet maskin
  ulkopuolella voivat tämän takia nousta oman maan yläpuolelle – katso 13/18-kuvat vesireunoilta.
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
