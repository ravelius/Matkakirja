# Natiivisepän luovutus 8.11.2026 klo 20.40

KAIKKI VANHEMMAT LUOVUTUKSET; edellinen git show 73e601304:docs/raportit/viesti-natiiviseppa-luovutus-20261108-1910.md (tausta: cron, id:t,
pohjapallo, kohokalotit v5 kuitattu, PT:n FPV-järjestys lisäys 2). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili vvi@vvi.fi.
Nollauksen syy: konteksti pehmeällä rajalla 25 % (7.37). PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
Cron "4 9 * * *" (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py, ILMAN -I:tä)
luotu 20.1x (59217999): LUO UUDELLEEN. Numpy/PIL: /opt/homebrew/bin/python3.14 -P skripti.py.

## TILA 8.11. 20.40 (VOITTAA kaikki vanhemmat): FPV-JÄRJESTYS (PT 19.1x lisäys 2)
Haara natiiviseppa/fpv-viat (natiivi-backup), wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpv. Kärki fe37c4ae2:
- 089381737 = FPV B 2fa367316 + pohjapallo f7cf0bd7c (shadergraph/subgraph regeneroitu tee_tileset.py:llä; Cesium 1.26.0 lähde
  /Users/Shared/Claude/proto-3d/Matkakirja-proto-esikatselu/Library/PackageCache/com.cesium.unity@D454711FBE38/Source/Runtime/Resources).
- SININEN AUKKO = Cesiumin (cesium-native) näkökartiokarsinta korottamattomista laattarajoista: ×15-lähimaa jäi valitsematta → pohjapallo näkyi.
  78bd767c1: PalloReiat.Karsinta(pois) = enableFrustumCulling false + enforceCulledScreenSpaceError + culledSSE ≥ 64; kytketään VAIN
  MaastoVaihto.Vaihdassa (kohokartta, samassa kehyksessä kuin url). EI drone-kuvassa: 1e807048b kaatui Unityn (SIGSEGV
  TilesetHeightRequest::processHeightRequests), kun RecreateTileset tehtiin kesken korkeushakujen (KupoliNimet/DroneKuva).
  Komento "pallo karsinta pois|paalle|tila" vain ilman korkeushakuja.
- TERÄVÄ VAAKAVIIVA = Karttataivas (ruudun tason liukuväri, raja 0,290 = viivan kohta): JU:n Mac-ajo 78bd767c1 20.30 (9/9)
  lokit/natiiviseppa-fpv-viat/: "taivas kartta pois" poistaa viivan (v40-/v15-taivaspois), usva pois → musta taivas (ei käy), raja 5 → kaukovuoret
  näkyvät mutta viiva jää. fe37c4ae2: Karttataivas.MaastonTakana (drone-kuva + FpvNakyma Start/OnDestroy) → liuku kaukotasoon syvyystestillä
  (Karttataivas.shader _Kauko). Komento "taivas kartta takana 1|0". unity 0; metal-tarkistusta ei ajettu (vaatii Unity-lukon).
- Havainto (ei vika): 15 km / 10° alas → ~85 % ruudusta ×15-kallioseinää (dronen edessä korotettu rinne). 120 km siisti.

## ODOTTAA: JU:n Mac-ajo fe37c4ae2 (pyydetty 20.35)
Skenaario /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/fpv-viat/sk-fpv-d.txt (8 kuvaa: d-120km … d-15km + d-40km-liuku-edessa verrokki)
→ lokit/natiiviseppa-fpv-d/. Ohje ajopyynto-d.md.
KUN KUITTAA: (1) viiva poissa d-40km vs d-40km-liuku-edessa (pari); (2) ei sinistä aukkoa missään; (3) LÄHIN SIISTI D metreinä
(siisti = ei aukkoa, ei viivaa, maasto luettava; ×15 piikit/seinä EIVÄT ole vika – kerroin pysyy, omistaja 14.47) → Skaala = D/3
→ parit (verrokki iPad 2fa367316 lokit/natiiviseppa-fpv-b/ a-*) → PT ≤ 3 riviä. PT → KK (Codex-kuvat odottavat D:tä).
Jos viiva jää: tarkista konsolista "taivas kartta: maaston takana True", sitten varjostimen z (UNITY_RAW_FAR_CLIP_VALUE, reversed-Z).
SITTEN: FPV osa 4 (PT:n sanalla; lentomalli PK 61fc67ce4, Skaala = D/3, EI kertoimen muutosta; suunnitelma
Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-fpv-drone-topo.md).
Kaikki koe, ei junaan.

## LISÄYS 20.5x: D-AJO fe37c4ae2 KUITATTU PT:lle (VOITTAA "ODOTTAA" ja "KUN KUITTAA" yllä)
JU:n Mac-ajo 8/8, ei kaatumista: sininen aukko ja vaakaviiva poissa. D = 28 000 m → Skaala ≈ 9 333 (20 km puoliksi, 15 km lähes kokonaan ×15-seinää).
UUSI AVOIN (PT): usvaan häipynyt kaukomaasto näkyy kermana sinistä taivasta vasten (sahalaitainen kaista yläreunassa).
Kuittaus: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/fpv-viat/kuittaus/ (MITTAUS.txt, pari 40 km, sarjat).
SEURAAVA: PT:n vastaus (kermakaista / FPV osa 4).
