# Valoseppä – luovutus 20.10.2026 klo 00.40 (Postivahdin KOVA RAJA 38 %)

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (yöllä 207-kuvaparit ja simut KK:lle, kopio PT:lle; muu liikenne PT:lle),
JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, NS local_fcc10552-5810-49bf-b0cf-188456f1231c, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795,
Lavastaja (LR) local_cd402541-241c-4e2a-99e7-70bd8daa1c35, Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin). Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA.
EI AJOJA KÄYNNISSÄ luovutushetkellä.

## 0. ENSIN
- 206-JULKAISU (omistaja pyysi 00.30): NS palautti rungon natiiviseppa/juna-206 → dfa04d37f; lopullinen 206-sokkelo = PK 208fd103e + VS 291109dde
  (PT:n lista), liitetään PT:n simupari-OK:n jälkeen; lukitussimu sen jälkeen. Yhteinen11 = 208fd103e + 291109dde (JU, PK ajaa simun).
  Merge dfa04d37f + 208fd103e + 291109dde tarkistettu puhtaaksi. 291109dde ei tarvitse vientiä (pelkkä varjostin).
  → Katso yhteinen11-kuvista: pihan lattia yhtenäinen kivilaatta (ei shakkiruutuja), kukkalaatikot vaaleat, muurien harjalla keltainen kate.
- 207: seinät k4 e4b91f296 (jälki-haaran kärki, KK 00.4x): hallin katto katto_kulta → 13 samaan keltaiseen lasitiileen kuin kate, kate
  kultaisemmaksi, lasitteen kiilto. Simussa AJAMATTA → seuraavaan 207-käännökseen (pyydä JU:lta yhdistelmä PK:n uusimman kanssa) →
  sokkelosimu `APP=<polku>/Matkakirja3D.app zsh $D/sokkelo/aja.zsh <kaannos.txt>` → parit KK:lle (kopio PT).

## 1. HAARAT JA SHA:T (proto-repo, wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki, haara linssiseppa2/juoksu-jalki-206)
Ketju (kaikki samassa haarassa, kärki e4b91f296):
- 8e030e9f7 taivas k6: Codexin saumaton sky005 kansiossa taivas-codex-v3/ (taivas.json "taivas": {"vasen": 78} → _PanoraamaSiirto; aurinko 258,17/19,19)
- fed4dcc5a kaukomaa k7: kaukomaa seuraa kameraa 32 m askelin (JuoksuValoAjo.LateUpdate → SeuraaKaukomaa)
- f307a9ccc QA `valo katse <°>`: kamera käännetään vain piirron ajaksi (begin/endCameraRendering)
- b7ccf1ca9 + e6c70c085 syväterävyys k1→k2: Valopohja DepthOfField Gaussian (vain kaukokenttä), JUOKSU säde 0,6, 90→320 m Puyin takana
  (omistaja 23.37 "ei pienoismallin tunnelmaa"); Valopohja.Tarkenna; QA `valo syva 0|1`; ValopohjaTestit 18/18
- 3637c9f8f seinät k1: JuoksuValo.hlsl JuoksuSeinaSavy (sävyvaihtelu, kuluma; hash ilman sin()) + JuoksuNurkka (tyvi 0–0,9 m); QA `valo seina 0|1`
- 10cdabfa6 seinät k2: Codexin pintasarja 706–710 → JuoksuV4Maailma.Pinnat.cs lataa sokkelo-pinnat-v1/ (rappaus, rappaus-ala, kivi, kate;
  VIETY 00.03); LattiaLaji → SokkelonPinta (V4_red 10, V4_stone 11, V4_capstone 12, V4_tile 2); JuoksuLattia.shader maailmaprojektio; QA `valo pinnat 0|1`
- 291109dde seinät k3: lattiatasoiset V4_stone (y < 0,4) pihan kivilaatoiksi, kate vain y > 1,5 m (kukkalaatikot vaaleiksi)
- e4b91f296 seinät k4 (ks. 0).
Yhdistelmähaara linssiseppa2/sokkelo-jalki-207 (commit-tree-mergejä PK:n kanssa) – vanhentunut, älä käytä; JU kokoaa yhteiset.

## 2. SIMUTULOKSET
- Jälki k6 (jalki5-app 8e030e9f7): taivas v3 latautui, Jingshan pohjoisessa, ruutuaika 16,7 ms = ennallaan → PT OK → NS.
- Sokkelo yhteinen6 (34ca156dc) ja yhteinen8 (a5397344, seinät k2): 4 suuntaa ok, syvä k2 lähes huomaamaton, Codexin pinnat selvä parannus
  (KK OK), Jingshan kahdesti → LR poisti renkaasta (rengas-v4 → v7 8b701b5f3 poistaa myös irralliset LOD2-kattopalat; PT päättää 206/207).
  Parit $D/sokkelo/parit (yhteinen8) ja $D/sokkelo/parit-yhteinen6. Ruutuaika 16,7 ms (60 fps katto, syvä 0/1 sama → kustannusta ei nähdä).
- Tulivuoret k13 + pimennys L1 ajettu 23.44–23.56 (PIDOSSA, PT:lle raportoimatta): Etna-vana yhä liian kultainen ja raidallinen; pimennys L1
  pari1:ssä kuun varjoa ei näy. Kansiot $D/tulivuoret/kierrokset/k13, $D/pimennys/kierrokset/kL1.

## 3. AVOIMET / JONO
- KK:n palaute (00.4x) käsitelty: katot k4 (tehty), saumaviiva + punaiset poikkipalkit = PK (palkit ovat hyppy-/liukuesteitä; saumat vain
  korttelin kulmissa kapeissa kujissa, PK limittää 2 cm tarvittaessa), kuva-arkin otsikko korjattu ($D/sokkelo/kooste.py).
- Codexin karheuskartat ja hexi/portti-kuvat käyttämättä (malleissa ei palkkien/porttien UV:ta) → myöhemmin.
- Syväterävyyden tilarivi näyttää "Puyi -1,0 m" heti QA-komennon jälkeen (tarkennus nollataan KaytaJalkissa ja asetetaan seuraavassa
  LateUpdatessa) – vain tilarivin ajoitus, tarkista kerran, että tarkennus todella asettuu (lokiin m-arvo).
- Rakettivideo yöllä kun kone vapaa (haara linssiseppa2/raketti-video-204, luovutus 56d272c2a).
- Worktreet: proto-linssiseppa2-jalki (kaikki yllä), -lattia (mergetty → poista), -juoksuvalo, -nostot, -tulivuoret, -pimennys, -rakettivideo, -mrivi.
- Appit $D: jalki5-app, sokkelo-app (jalki3/jalki4/lattia-app poistettu 00.40).

## 4. OPIT
- Codexin taivas ja nauha eri UV-origo (taivas 78°, nauha 180°) → kummallekin oma siirto metatiedosta.
- Sokkelon moduulit ovat tasavärisiä ilman UV:ta → pinnat maailmaprojektiona materiaalinimen mukaan (LattiaLaji-koukku omassa tiedostossa,
  ei PK:n tiedostoihin). Pihamoduuli on V4_stone/V4_tile-shakkilauta → lattiatasoiset kivet samaan kuvioon.
- 60 fps katto simussa: ruutuaika 16,7 ms ei kerro jälkikäsittelyn hintaa → GPU-ms tai kuorma-ajo, jos hinta pitää todistaa.
- JU vaihtaa käännöksiä usein (yhteinen2…11): aja aina uusin valmis, jota JU nimeää; lue kaannos.txt app-kansiosta SHA:ksi.
