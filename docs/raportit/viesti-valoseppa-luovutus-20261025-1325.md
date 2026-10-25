# Valoseppä: luovutus 25.10.2026 klo 13.25 (kova raja 39 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, LR: local_15010198-38f5-44fd-a643-011ac655a5ff,
NUI: local_2cd29bc1-7c73-4e38-b319-8a6fd45c55ee. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 11.55–13.2x). Lue tämä kokonaan.

## 0. AJO KÄYNNISSÄ (tarkista ensin)

**P33 7d5cdc420, ketju-64** (sk-omistaja47, alkoi ~13.23: metal → käännös → ajo). Haara `linssiseppa2/omistajapari-11`
(proto-git, wt `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`), kansio `_tyo/linssiseppa2/kierros2/`.
Tarkista `grep -v ^raaka ketju-omistaja64.log` (KÄÄNNETTY 7d5cdc420, LOPPU <todistus>). Mittaa: `python3 mittaa-p26.py <todistus> "n p q r"`.
- Lataa LR:n leivotun salin: `ui juoksupeli palatsi avoimetpolku file:///Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/leivottu-sali/avoimet-pilotti-leivottu/`
  (konsolista: ei 404:ää juhlasali.glb:lle, rivi "leivonnan palatsi: aurinko glTF-kehyksessä …" = pelin ulkoaurinko LR:lle).
- 04: n1 leivottu (kerroin 1,25 täyttö 0,75), p1 täyttö 0, p2 kerroin 1,6 täyttö 0, p3 2,0, p4 1,6 + kylläisyys +8.
- 02: q1 seinän täyttö 0, q2 0,3, q3 kylläisyys +8, q4 kylläisyys 0. 01/03/05: q3 kylläisyys +8. 05: r1/r2 kamera 8/12 m lähempänä porttia.

## 1. TEHTY TÄNÄÄN (11.55–13.25)

- **Diagnoosi (P26–P31)**: kääre 0 ei vaikuta (kujat leivottuja, sali varjossa). Salin ikkunat ja ristikko toimivat (P30:n yläkuva:
  45°:ssa ristikon kuvio lattialla), mutta alle noin 25°:n itäpuolen naapurirakennus peittää ikkunat ja yli noin 38°:ssa räystäs peittää.
  Juovia on enintään 3 % lattiasta (säteenseuranta `kierros2/salivalo.py` juhlasali.glb:stä). Raportti:
  `kierros2/omistaja55-249525784/RAPORTTI.md` + kolmikot + sali-ylhaalta.jpg → PT.
- **PT:n PÄÄTÖS 13.1x** (kumoaa P25:n vain tältä osin): salin oma aurinko 45°/70° ilman salin katon varjoa salissa. Vakioiksi
  1,55/1,45 + suunta 0,5. EHTO: 05:n lattia ≥ 193, 04 kohti 176:ta, ei mustia. Sitten kolmikot 01–05 PT:lle, NS vasta PT:n kuittauksen jälkeen.
  → **2732b6172**: ValoKohteet K20 voima 1,55, K17AmbientK 1,45, YmparistoSuunta 0,5, SaliAurinko 45/70, JuoksuSaliKattoVarjo false
  (Sovella: juhlasalin katto ei varjona, kun salin osuus > 0,5), QA `valo salikattovarjo`. valovahti kirjattu.
- **P32 2732b6172 (todistus-1311)**: 04 sali 195 (havainne 176), punainen 0,56, mustat 1,2 ✓. 01 198, 02 209 ja 03 197 ✓.
  **05 175 ✗**: SSAO 0 ei vaikuta, laattakivi 0,85 → 190, mutta silloin 02 nousisi yli (0,8 → 220). 05:n aurinkoiset laatat ovat
  tavoitteessa (p75 202 / p90 214 vs 01 210/219), mutta varjoa on 29 % (havainne 15 %), koska kuja on kuvassa kapeampi.
  → P33 r1/r2 tarkistaa kamerapaikan. Jos ehtoa ei saada, KYSYMYS PT:lle (valo ei riitä; LR:n kujan leveys tai 05-kohtainen kerroin).
- **Tekotapa 4 (PT 13.1x KÄRKI, omistaja 13.10/13.12)**: pylväät ja seinät leivottuina kiinteällä auringolla. Elävät varjot vain
  pelaajasta ja rakennuksista maahan. Leivotuille ei hemisfääriambienttia (täyttö) eikä kääreLambertia. Kylläisyys alas (taide.md 4).
  Codex tekee pinnat ilman valoa, LR polttaa valon neljään ilmansuuntaan, ja minä annan auringon ja valotuksen sekä teen JuoksuValon.
  - 69bec844b: QA `valo leivontaaurinko` (pelin ulkoaurinko palatsin glTF-kehyksessä + voima, väri, taivas, maa) → anna LR:lle P33:n lokista.
  - 7d5cdc420: QA `palatsi avoimetpolku` (pilotti simussa ennen ämpäriä); leivotut avoimet huoneet heittävät elävän varjon lattiaan.
  - LR:n pilotti valmis 13.2x (LUE.md kansiossa): juhlasali 118 solmua UV1 2048² + valo_rgbm, 70°/45° ilman kattoa, 4 kimpoamista.
    glb 17 → 29 Mt. 88°:n kopio tarvitsee oman leivonnan. Kujan 02 seinä on LR:llä seuraavana.
  - Kylläisyys P31: keskiarvo 01 0,43 / 02 0,50 / 05 0,49 vs havainne 0,38 / 0,40 / 0,36 → testaa K17Sat 18 → 8 / 0 (P33).

## 2. AVOIMET (järjestys)

1. P33:n tulos → valitse leivotun salin kerroin ja täyttö (04 p5 tavoite 37, lattia ~176, mustat ≤ 1,2) ja kylläisyys.
   Tee kolmikko havainne | nyt | leivottu (04 pylväät + 02 seinä) PT:lle (`omistaja50…/kolmikko`-tapa; PT:lle ≤ 3 riviä + tiedosto).
2. 05:n ehto (≥ 193): r1/r2 tai KYSYMYS PT:lle.
3. JuoksuValo leivotuille: täyttö pois / tarkista, ettei kääre koske leivottuja (JuoksuValaistus ohittaa jo). Ruutuaika ei saa kasvaa (LT ennen junaa).
4. Kolmikot 01–05 (havainne | nyt | uusi) PT:lle ehdon täytyttyä; NS-kuittaus vasta PT:n jälkeen.
5. Siivous tehty 11.5x (1,33 Gt); lokit/:n omat todistusajot (~11 Gt) jäävät yösiivoukselle.

## 3. OPIT

- Kun ilmiö ei muutu millään arvolla, kuvaa ylhäältä (testikamera 25 6 80 70): varjon muoto kertoo aiheuttajan nopeammin kuin kulmasarjat.
- GlbMalli yhdistää solmut: solmujen nimiä ei voi hakea pelissä. TransformDirection ohittaa peilauksen, mutta salille tulos oli sama (ei x–z-sekoitusta).
- Mittarin lattia = kuvan alin 15 %, x 0,25–0,75, eli herkkä kameran varjo-osuudelle (05).
- Skenaarioiden QA-nollaus: poista vanhat `k17 … 2.3` / `aurinkovoima 0.9` -palautukset, kun vakiot muuttuvat (sk-omistaja46-tapa).
