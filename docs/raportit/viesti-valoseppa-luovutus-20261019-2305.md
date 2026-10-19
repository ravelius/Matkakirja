# Valoseppä – luovutus 19.10.2026 klo 23.05 (Postivahdin KOVA RAJA 40 %)

Luovuttaja: Valoseppä (Opus, high). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (≤ 3 riviä),
KK local_8e4fcfed-fc40-464c-854a-1d031b005332, JU (Julkaisija: käännökset, simuvuorot, ämpärivienti) local_24e63224-112c-449a-b6a3-e10e4ed43f4b,
NS local_fcc10552-5810-49bf-b0cf-188456f1231c, PK local_11aca9cd-eda6-4db9-9019-8a153c8b8795, Lavastaja local_cd402541-241c-4e2a-99e7-70bd8daa1c35,
Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b. D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin).
Simu vain JU:n SIMU NYT -viestillä, perään SIMU VAPAA. Ei ajoja käynnissä luovutushetkellä.

## 0. ENSIN (juna 206, omistajan päätökset 21.32 ja 22.27; PT: takaraja pois, "kunnolla")
- Haara linssiseppa2/juoksu-jalki-206 (wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki, pohja runko 206 f1072e901, peili
  peili/proto/linssiseppa2/juoksu-jalki-206). Kärki 6c734412f. Sisältää: jälkikäsittely JUOKSU + liike-epäterävyys, usva/ilmakehä,
  taivas (proseduraalinen + Codexin panoraama), kaukomaa, lattiat k5+k6 (merge lattia-haarasta 68b4369d3).
- JU:lla pyydetty: (1) VIENTI _valmiit/juoksupeli-taivas-codex-v2-vienti-20261019 (taivas-codex-v2/: taivas.jpg, nauha-1…4.png, taivas.json),
  (2) KÄÄNNÖS 6c734412f → $D/jalki4-app. Valmiina jo f86a988f7 (= fecb222aa, v1-nauha, kansio taivas-codex-v1 VIETY) → $D/jalki3-app.
- Simuvuorolla: `APPK=jalki4-app zsh $D/jalki/aja.zsh <KÄÄNNETTY-SHA>` (jos jalki4 ei valmis: APPK=jalki3-app … f86a988f7). iPhone + iPad ~8 min.
  Skenaario $D/jalki/sk-jalki.txt: A-parit = ilmakehä (`valo ilma 0|1`, jäädytetty), S-parit = liike-epäterävyys (juoksussa `valo sumea 1→0`,
  ~0,3 s ero), L-pari = lattia k6, ruutuaika jalki1 vs jalki0 ($D/jalki/ruutuajat.txt). Parit $D/jalki/parit/ (parit.py).
- Sitten: SIMU VAPAA JU:lle → kuvat täysikokoisina itse (Puyi terävä? lähiseinät sumeat? taivaan sauma takana? nauhan reunat? matala
  aurinko 17,8° → lattiat liian tummat?) → parit PT:lle JA KK:lle (polku + ruutuajat) → PT:n OK:lla sha NS:lle (merge runkoon 206).
- Lattia k4 47ef6b045 ON JO RUNGOSSA (f1072e901, PT OK). k5 f57445b1f + k6 68b4369d3 vain jälki-haarassa → menevät sen mukana.

## 1. MITÄ TEHTY (yksityiskohdat commit-viesteissä)
- Lattiat (haara linssiseppa2/juoksu-lattia-206, wt proto-linssiseppa2-lattia): Resources/JuoksuLattia.shader + JuoksuV4Maailma.Lattia.cs.
  Hallit tumma kiillotettu tiili 64 cm, pihat vaaleat kivilaatat; Codexin "Stone tile*", "V4 courtyard tile*", "V4 warm limestone" (sisäpihan
  tyhjä maa) + hallien "Warm stone" -alustan lattiatasoiset kolmiot (JaaAlusta). k6: laattojen kyljet lattian sävyllä. QA `valo lattia 0|1`.
- Jälkikäsittely: Valopohjaan Profiili.Juoksu (ValoProfiilit: LiikeSumea 0,6 / raja 0,05, rae 0,12, vinjetti 0,18, ei käyrää eikä hehkua;
  ValoKerrokset + Valopohja.Kirjoita MotionBlur CameraAndObjects Low; testi ValopohjaTestit, 2142/2142). JuoksuV4Maailma.Jalki.cs
  (volumeLayerMask = pelin kerros ennen Valitsea). MotionVectors-passi JuoksuHahmo/JuoksuMaailma (Resources/JuoksuLiike.hlsl).
  QA `valo jalki 0|1`, `valo sumea 0|1`, `valo ilma 0|1`.
- Usva (JuoksuValo.hlsl JuoksuUsva + JuoksuUsvanVari): 25–270 m osuus 0,5, korkeususva 16 m (katot erottuvat, Lavastajan toive), auringon
  puolella lämpimämpi; ValoKohteet.JuoksuUsva*. _JuoksuIlma 0 = k3:n usva ja liukuväri (A/B).
- Taivas (JuoksuTaivas.shader + JuoksuV4Maailma.Taivas.cs): proseduraalinen aurinko + pilvet; panoraama ämpäristä Polku + TaivasKansio
  (taivas.json + taivas.jpg + nauha-palat 1–4, esikerrottu alfa, ristihäivytys limityksessä), pohjoinen = kuvan keskikohta (Codexin
  u = (180 + 360u) mod 360), eteläsauma kameran takana (rata kulkee pohjoiseen). Valopohja.PeliAurinko kääntää pelivalon/varjot metatietoon.
  UUSI VERSIO = UUSI KANSIO (CDN välimuistittaa 404:n) → TaivasKansio-vakio + uusi vientipaketti.
- Kaukomaa (Lattia.cs LuoKaukomaa): 1000 × 1000 m pihan kivilaatta y −0,08 radan alle; pois `valo ilma 0`.

## 2. AVOIMET / JONO
- Codexin korjattu taivas (sauma + aurinko) tulee myöhemmin samoilla nimillä → uusi kansio taivas-codex-v3/ + paketti + TaivasKansio.
- Pimennys lauta L1 + tulivuoret k13 (8560e5768, $D/tulivuoret-app, `zsh $D/ajo-b5-lauta.zsh 8560e5768`) PIDOSSA (PT: kone 206:lle).
- Rakettivideo yöllä kun kone vapaa (luovutus 56d272c2a, haara linssiseppa2/raketti-video-204).
- Worktreet: proto-linssiseppa2-lattia ja -jalki (poista mergen jälkeen), -juoksuvalo, -nostot, -tulivuoret, -pimennys, -rakettivideo, -mrivi.
- Appit $D: lattia-app, jalki-app, jalki2-app, jalki3-app (+ jalki4 tulossa): poista vanhat, kun uusin on ajettu (omat appit ≤ 2).

## 3. OPIT
- Codexin malleissa lattia on erillisiä paloja: raoista näkyy alusta ja palojen kyljet → kyljet ja alustan lattiataso samaan sävyyn.
- Proseduraaliset saumat: häivytä pikselikoon (fwidth) mukaan, muuten kaukana katkoviivoja; pystypinnalla fwidth(xz) ei kerro etäisyyttä.
- Liike-epäterävyys: ilman MotionVectors-passia kameran mukana liikkuva Puyi sumenee; jäädytetyssä kuvassa sumeaa ei näy (ota juoksussa).
- Ämpärin CDN: peli hakee polun heti käännöksen jälkeen → vie tiedostot ennen simua tai vaihda kansion nimi.
