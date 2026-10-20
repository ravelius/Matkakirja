# Valoseppä – luovutus 20.10.2026 klo 07.45 (Postivahdin KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (kuvaparit, kopio PT), JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b,
NS local_fcc10552-5810-49bf-b0cf-188456f1231c, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795, LT local_36a45147-8407-4cfb-bbdb-c20d5f684735,
Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b. D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin).
Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA. Proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki (haarat paikallisia).

## 0. ENSIN
- **Odota LT:n iPad Pro 13 -mittausta** NS:n laiteappista aec730d95 (= juoksu-208 5057673d6 + PK halli-208 fe6db12fb;
  lokit/natiiviseppa-app-207-juoksu-208-yhd-laite). Tavoite GPU ~207-taso (9,7 ms; cd3502cfe:llä SSAO pois → 14,0 ms, mukana
  silloin syvyyspassit + DoF + korttelit). Tulos → KK + PT. Jos yhä selvästi yli 207:n: erittele (PK:n korttelit/halli vs. vesi).
- **PK:n vastaus KK-pohjan vesistä** (kysytty 07.3x): teenkö JuoksuVesi-verkot ja LuoVedet-kutsun, missä kehyksessä (pelissä itä −X,
  ks. JuoksuKortteli.cs:n KEHYS) ja tekeekö PK maastoon vallihaudan kuopan (vesi_y −2, pohja_y −4). Sen jälkeen kohta 2.

## 1. HAARAT JA TILA (proto)
- **linssiseppa2/juoksu-208 kärki f4f6a4317 = JUNAAN 208** (PT 07.2x, KK OK k5 07.4x): 207-runko f3e77a5fc + SSAO pois 4fcc5ce10 +
  vesiuoma k1–k5 (V4_vesi → Lattia laji 15; k5 d3ec8c808: tumma lammenvihreä, himmeä vihertävä heijastus, harvat tuikkivat
  kimallukset; QA `valo vesi 0|1`) + juoksukamera requiresDepthOption Off DoF:n ollessa pois 1409b9e44 + _Laji-kuvaus ennalleen
  (merge PK puhdas) + Metal-varoituskorjaus f4f6a4317 (Vesi: ei varhaista paluuta ennen fwidth:iä; ei vielä simussa, ulkoasu sama).
  Merge PK 5acab1fde / halli-208 / korttelit-208 puhdas. Simu k5 7077d595 = d3ec8c808 + PK fe6db12fb (parit $D/sokkelo/parit, video
  lokit/todistus-sokkelo-iphone-20261020-0722/V-vesi.mp4).
- **SSAO** (LT 06.5x, iPad): Ultra_Renderer SSAO (Depth+Normals) maksoi ~+18 ms GPU → pois juoksupelin ajaksi (JuoksuV4Maailma.Jalki.cs
  KaytaSsao/SsaoPalauta, laiteloki "SSAO pois juoksupelin ajaksi (n piirrettä)", QA `valo ssao 0|1`). Erillinen haara
  linssiseppa2/ssao-pois-208 3e3ba9458 (61afdf9c3:n päällä).
- **linssiseppa2/kk-vesi-208 kärki 1a247a51d** (⊃ juoksu-208 f4f6a4317): JuoksuVesi.cs (Peli, puhdas): lukee pohja.json:n vallihaudan
  (vesi_y −2, 180 957 m²) ja joen 9 vesialuetta (vesi_y −1,5, 5 636 m²), kolmioi korvanleikkauksella. Testit JuoksuVesiTestit 2/2
  (ote Peli-testit/Kultaiset/kk-vedet.json). Unity-verkko TEKEMÄTTÄ (odottaa PK:ta).
- HYLLYSSÄ: linssiseppa2/syvyys-208 cd3502cfe (DoF + syvyyspassit JuoksuSyvyys.hlsl + SSAO pois). DoF EI junaan 208 (KK/PT): iPadilla
  efekti ei näy korttelinäkymässä ja maksaa syvyyskuvan. Syvyyspassit korjasivat iPadin "koko kuva sumea" -vian (syy oli SSAO-esipassi
  ilman DepthOnly/DepthNormals-passeja) – tarvitaan, jos DoF joskus palaa. linssiseppa2/syva-208, vesiuoma-208 = välivaiheita.

## 2. SEURAAVA ERÄ (PT 07.4x, omistaja 07.30: identtinen koko Kielletty kaupunki ~750 × 960 m junaan 208)
Minun osani: vallihauta + Kultaisen veden joki samalla vesivarjostimella (laji 15), aukioiden ja muurien valo, iso alue 60 fps:ssä
(LOD/sumu kauas). Data: /Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-kk-pohja-v1/pohja.json (KS; kehys X itä, Z pohjoinen,
origo Taihedian; avaimet vallihauta, ulkomuuri, portit, kulmatornit, joki{keskilinjat, leveys 10, vesialueet 9, vesi_y, sillat 30},
aukiot, hallit, palatsit, asuinpihat, kujat, reitit, rakennukset 405). Työ: JuoksuV4Maailma.Vesi.cs (verkot JuoksuVesi.Lue → Mesh,
Lattia-varjostin laji 15, pelin kehys PK:n mukaan) + haudan reunamuurit (pystypinnat vesi_y…0 → Vesi() piirtää märkänä reunana).
Sillan heijastus = vaihe 4 (KK: peilattu tummennettu sillan kopio veden alle) → ehdota PT:lle kun vaihe 4 alkaa.

## 3. AVOIMET
- Tulivuoret k13 ja pimennys L1 PIDOSSA; rakettivideo yöllä kun kone vapaa.
- iPadin 0,5 s nykäys = lasihaku b8198b4e3 (junassa 207, juoksu-208 on 207-rungon päällä → mukana).
- Simuskenaariot: $D/sokkelo/sk-sokkelo.txt (koko, D/W/P/A/C/V-parit) ja sk-vesi.txt (vain vesi + 5 s video);
  aja: `SK=sk-vesi.txt APPK=../julkaisija/<app> HAARA=<haara> zsh $D/sokkelo/aja.zsh <sha>`; parit.py V = vesiuoma.
- Worktreet: proto-linssiseppa2-jalki (kaikki), -sumea206 (mergetty → poista), -juoksuvalo, -nostot, -tulivuoret, -pimennys,
  -rakettivideo, -mrivi.

## 4. OPIT
- iPadin Ultra-putki: SSAO (Depth+Normals) tekee syvyyskuvan esipassilla → omat varjostimet ilman DepthOnly/DepthNormals = tyhjä
  syvyys (DoF sumentaa kaiken); passien kanssa SSAO piirtää koko maailman uudelleen (+18 ms). Juoksupelissä SSAO pois.
- MSAA pois ei vaikuttanut syvyyteen (koe 0840e0f8f).
- Laitteen vyöhykemittaus vaatii kaukokentän kuvaan (korttelin sisäkamera näyttää vain lähietäisyyttä → 100 % aina).
- Tilarivin "Puyi −1,0 m" = tarkennus päivittyy vasta seuraavassa LateUpdatessa (ei vika).
- Kimallukset auringon suunnasta riippumatta (kohinan tulon huiput), pieninä ja tuikkivina; isot = "valkoista silppua".
- Ear clipping: Peli-assemblyn .cs.meta on kaksirivinen (fileFormatVersion + guid).
