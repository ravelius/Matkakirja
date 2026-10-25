# Valoseppä: luovutus 25.10.2026 klo 10.51 (kova raja 35 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f,
LR: local_15010198-38f5-44fd-a643-011ac655a5ff, NUI: local_2cd29bc1-7c73-4e38-b319-8a6fd45c55ee.
Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 09.45–10.5x). Lue tämä kokonaan.

## 0. AJOT KÄYNNISSÄ (tarkista ensin)

Haara `linssiseppa2/omistajapari-11`, wt `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`. Kansio `_tyo/linssiseppa2/kierros2/`.
- **P19 b37386fae, ketju-49 VALMIS** (`omistaja43-b37386fae/`, todistus-omistajapari-20261025-1034): oikea käännös (voima 1,55);
  laattakivi 1/0,8/0,65: 03 auringossa 248 → 233 (havainne 207–220), 05 V 248 → 229/206, 04 varjossa 144 → 115 (havainne 171) →
  suhde valon asia (d2f01b4eb). Salin aurinko EI rekisteröitynyt (ei lokia) → 495ac646a. 03 kattovarjo 0 → kaista muuttui katon
  muotoiseksi = Taihemenin elävä varjo → d41651def. Ulosjuoksu: pihalla pehmeitä varjoja näkyvistä puista/taloista, ei selvää virhettä.
- **P20 495ac646a, ketju-50** (sk-omistaja34): 04 salin aurinko 30/70, 22/70, 18/60, 25/80, pois (v44 itäaukot); s1-01-lahtokuja
  (01 punainen lattia laitteella); ulosjuoksu salista u1–u6. Tulos `omistaja44-495ac646a/` + todistuskansio kierros2/ketju-omistaja50.log (LOPPU-rivi).
- **P21 d41651def, ketju-51** (sk-omistaja35, käynnistyy P20:n jälkeen): 03/04/02/05 × laattakivi 1 / 0,85 / 0,7.
- ENSIN: `grep KÄÄNNETTY kierros2/kaanna-app2-<sha>.log` ja konsolista `pelivalo JuoksupeliV4Kamera … voima` (0,90 = d2f01b4eb:n arvo)
  sekä `salin aurinko … pohjoinen/itä` -rivi (todistaa, että salin katot rekisteröityivät). Ilman niitä tulos on vanhaa appia.

## 1. TÄNÄÄN TEHTY (omistajapari-11; commitit järjestyksessä)

- 0762f7e03 PK:n tausta-v48 poimittu; 5f34ba895 + b767bf7be + a38d7b4a4 + 2a8ef6d7b + 495ac646a **salin oma matala aurinko**
  (PT 10.4x päätös): ValoKohteet.JuoksuSaliAurinko* 30°/70°, vaihto keisarin etäisyydestä salin kattoon (+0,5…−2,5 m) + 0,5 s
  tasoitus, suunta salin omista akseleista (pohjoisovi glTF +z, itäseinä glTF +x; **maailma on peilattu kompassiin nähden**:
  itäseinä Unityn −x:ssä), QA `valo saliaurinko 0|1 [korkeus atsimuutti]`, säilyy KaytaValo-uudelleenluonnissa. Rekisteröinti
  LisaaYksiKatto:ssa (katon juhlasali-solmu palatsin juuren alla, kaikki kopiot). **Ei vielä todennettu kuvalla** (P20).
- 2633c0a27 LR:n avoimet-v44 (e594c7695; itäseinässä 6 aukkoa 1,08–1,99 m, ristikko MASK).
- e8ca2484e + d2f01b4eb **tekotapa B** (PT 09.58): leivottu valo neutraaliksi (kerroin 1,25, täyttö 0,75), aurinko/ympäristösuhde
  valosta (0,9 / ambK 2,3 kuten t3, P19 osoitti suhteen valon asiaksi: 03 auringossa vaati albedon 0,58, 04 varjossa 1,2), lattian
  kirkkaus albedolla **JuoksuLaattaKiviK** (QA `valo laattakivi x`, toimii jäädytettynä). _JuoksuLaattaSavy w = 2 → sävyn poikkeama
  tuplana; laatoilla korjattu ilme säilyttäen (2s−1, w 1). **_JuoksuRappausSavy sama vika avoinna** (05 seinä, punaiset +0,12…+0,30).
- b37386fae liikepoikkeukset (LIIKEVAHTI esti käännökset b767bf7be…a38d7b4a4: P15/P18 ajoivat vanhaa appia → mitättömät).
- d41651def **f-taihemen ei heitä elävää varjoa** (03A:n suorakaidekaista = Taihemenin katon palat + LOD1; leivottu runko ei heitä;
  v48 leivottu samoin EI_VARJOA). Todennus P21:n 03-kuvasta.
- Selvitys 04-valojuovista: `_tyo/linssiseppa2/valojuovat-04-selvitys.md` (umpiseinät + aurinko akselilla → LR-aukot + salin aurinko).

## 2. AVOIMET (järjestys)

1. P20: valitse salin auringon korkeus (juovat pylväiden välistä kuin havainteessa 810/04), ei varjoja ilman aiheuttajaa; jos juovia
   ei synny, tarkista lokin akselit (itä pitää osoittaa salin itäseinään päin) ja aukkojen korkeus (1,08–1,99 m → korkeus 15–25°).
2. P21: laattakivi niin, että 03 auringossa ~207–220, 05 lattia ~221/200/188, 02 ~216/190/175; 04 varjossa ~171/156/155 (jos 04 jää
   tummaksi samalla kertoimella, sävy 04:lle valosta, ei albedosta). Mittaus `alueet-810.py` alueilla V=0.20,0.68,0.40,0.85 ja
   O=0.60,0.68,0.80,0.85. Sitten LaattaKiviK vakioksi.
3. Lopullinen pari 03A + 04 PT:lle (ok/vika kohdittain) + NS-kuittaus (salin aurinko, tekotapa B, Taihemen, kattovarjo 4e2587791,
   lämmin täyttö b608eb98c) vasta PT:n katsottua.
4. **PT 10.4x/10.5x tilaukset**: NUI:n mittaus `docs/raportit/havainne-mittaus-20261025.md` (main a31a01644) kohta 2 = P19–P21:n
   mittarit: lattia 02/03 tummempi, 04 vaaleampi (editorissa ei katon varjoa), varjo-osuudet (02 36 vs 24 %, 03/05/06 1–6 vs 5–15 %),
   punaiset +0,12…+0,30 (→ RappausSavy w = 2 -korjaus).
5. **01 lattia laji 10 (PT 10.5x, minun)**: editorin esikatselut 1009/1015/1019 kaikki punaisia (kuja tasaisen punainen, laattaa
   vain 2 m:n ruuduissa vasemmalla, kivireunus valkoinen tasaväri); laitteella P20:n s1-01. Selvitetty: maan täyte = laji 2
   (kk-tausta-0-0 lod2) ok; LattiaLaji (JuoksuV4Maailma.Lattia.cs:77) antaa V4_lattialle 2. Seuraavaksi: mikä punainen pinta
   lattiatasolla (sijoita −135,6 350; QA `palatsi tayte 0`, `valo seina 0`, leivonta 0 omina juoksuinaan) – jos PK:n leivonta, rivi PT:lle.
6. 05 porttikäytävä (PT 11.0x palautti minulle): lattia puolikerroin LR:ltä ×0,78/0,77/0,73; seinä vasta kun tiedetään varjo-/aurinkoseinä.
7. Vanhemmat: lehvästö v1 LR:lle, rakettivideo, levyvahti.zsh.

## 3. OPIT

- **Tarkista aina käännös**: kaanna-app2-loki voi sanoa "CS-virheitä 0" ja silti "VIKA tarkista … → ei asennusta" (vahdit:
  liikevahti/valovahti/kameravahti). aja-omistaja43+ vaatii `KÄÄNNETTY <sha>`. Aja vahdit ennen committia:
  `python3 -I tyokalut/{liikevahti,valovahti,kameravahti}.py` worktreessä. Mathf.Lerp/Slerp/SmoothStep/MoveTowards tarvitsee
  `// liikepoikkeus: syy` samalle riville.
- Konsolin `pelivalo JuoksupeliV4Kamera … voima x` kertoo, mikä valo oikeasti ajossa.
- Ulkokuva teleportilla (sijoita) epäluotettava: katon paluu vaatii liikettä; käytä botin ulosjuoksua.
- Maailma peilattu: ValoKohteet-atsimuutti ei ole palatsin kompassi; suunnat salin/kohteen akseleista.
