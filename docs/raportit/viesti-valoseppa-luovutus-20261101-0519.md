# Valosepän luovutus 1.11.2026 klo 05.19

Syy: konteksti 25 % (pehmeä raja). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 03.57–05.1x).
Edellinen: viesti-valoseppa-luovutus-20261101-0355.md (työtavat voimassa). Koodi ennallaan: proto `linssiseppa2/k17-piha06-216`
kärki **dd0d5d743** (ei uusia committeja tässä sessiossa; kaikki ajot skripteillä `_tyo/linssiseppa2/skriptit-20261031/`).

## VALMISTA (PT kuitannut / koosteena PT:llä)
- **k06z3** (c2-v29 = LAV kaiteeton-v1, leivottu): leivonta käytössä (unity.log "leivottu valo sokkelo a-meridiaaniportti…"),
  julkisivu kirkkaampi, räystäsvarjo yhä tasainen; pylväisiin tummat raidat. `_tyo/linssiseppa2/k06z3-tulos.md`.
- **k06z5** (LAV syl + dilaatio): raidat poissa → PT 04.5x kuittasi, 4096² ei tarvita, -dil v4:ään. LAV toimitti **c2-v30**
  (kaiteeton-v2, JU vienyt 3394e44ed57c). Kuva lokit/pari-k06z5-20261101-043925/fasadi-z3-z5.png.
- **k06z6** täyttöpeitto (-dil): räystään alla vain −7…−10 %, friisiin mustia viivoja (V4_red-nollat) → suositus POIS
  (oletus 0). `k06z6-tulos.md`. Räystäsvarjo vaatii leivontaan kontrastia (AO/varjo räystään alla) tai SSAO:n: PT päättää.
- **k06z4** muurikatto v29 vs v35 (PT: v35 ei saa tummua): ei tummumista (o3 identtinen, m0–m5 Δ −0,2…+0,6). MUTTA piha 06:sta
  muurikate ei käytännössä näy (k06z4q mika → ulkorengas/lattia). `k06z4-tulos.md`. PK:lla v35 pelissä 6fbd10a68.
- **Taivas 8192 -laiteajo** JU:lle: `_tyo/linssiseppa2/taivas8192-laite/LUEMINUT.txt` (yksi komento; NS:n ajo-laite.zsh +
  xctrace Activity Monitor + asennus). Laitteella testaamaton. Vanha `peli-komento-taivas8192-ipad.txt` = editorikieltä (varoitus
  alussa). JU:n luovutus 081d2d840 neuvoo vanhaa skriptiä → Postivahdille ilmoitettu.

## AVOIMET (järjestys)
1. **PT:n vastaus koosteeseen** (05.1x): täyttöpeitto pois? räystäsvarjon jatko (LAV:n leivonnan kontrasti vai SSAO)?
2. **v35 lähitarkistus**: kuja, jossa muurikate näkyy lähellä (reitin koosteet / PK:n kuvakulma); vertaa v29 ↔ v35
   (`pari-k06z4m.zsh <tagi> <muurikate-kansio>`, vaihda VAR-rivin paikka/kamera).
3. **Seuraavat ajot c2-v30:llä** (ämpärissä): juuri-k06z3:ssa kielletty-c2-v26 → c2-v29-vienti; vaihda c2-v30:n vientiin
   (`_valmiit/…kaiteeton-v2…`) tai käytä PK:n reitti-216-haaraa (dab1272d6/350627ca6/6fbd10a68: c2-v29 → v30?, muurikate v35).
4. **Taivas**: JU:n iPad-mittauksen tulos (taivas.txt + aktiivisuus.trace) → PT:lle; ensimmäinen ajo on koeajo, korjaa ajuria tarvittaessa.
5. Reitin valo: LAV:n leivonta v4 (sis. -dil) kesken.

## Työtavat (lisäykset)
- Levyraja kaikille ajoille **70 Gi** (PT 04.4x); skriptit k06z4/k06z5 päivitetty.
- `pari-k06z5.zsh <tagi> <glb>`: korvaa yhden c2-mallin koemallilla (c2-<tagi> = c2-v29-linkit + koemalli).
- `pari-k06z4m.zsh <tagi> <muurikate-kansio>`: muurikate-v29-kansion tilalle toinen versio.
- Vertaile asettuneita kuvia (…b): skenaarion ensimmäinen kuva ~7–9 % tummempi. peli-raaka.png = 2752 × 2064, peli.png = 1448 × 1086.
- pkill -f osuu myös omaan Monitor-komentoon, jos kuvio on sama → käytä `pgrep -f "^zsh <skripti>"`.
- zsh-skripteissä globit `*(N@)` (ilman N tyhjä glob kaataa ajon).
