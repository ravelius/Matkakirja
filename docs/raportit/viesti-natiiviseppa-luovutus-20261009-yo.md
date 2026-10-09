# Natiiviseppä: luovutus 9.10.2026 23.3x (nollaus PT:n pyynnöstä, konteksti 73 %)

Rooli: Natiiviseppä (Opus; tämä juurisyy MAX, PT palauttaa highiin heti sen jälkeen). Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja,
proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto. Edellinen luovutus (päivän TILAt): viesti-natiiviseppa-luovutus-20261009.md.
Posti (kun istuntoviestit ovat 10 viestin rajalla): docs/raportit/posti-natiiviseppa-20261009.md. Muisti: muistijuna-ipad-ajo-ennen-vie.

## HETI TEHTÄVÄ: junan 173 iPad-jetsamin juurisyy MITTAAMALLA (PT 23.2x, effort max)

PT:n ohje sanatarkasti tiivistettynä: kaksi korjausta ei riittänyt. **Mittaa ennen seuraavaa korjausta.**
1. Laitteella (iPad Pro 13 M1 8 Gt, 00008103) B-polun piikin hetki eriteltynä: Unity Memory Profiler -kaappaus TAI luokittain 100 ms
   välein (grafiikka/RT, tekstuurit, mesh, ääni, Cesium, managed). Sama hetki BUILD 172:lla vertailuksi.
2. Jos piikki ei selviä: puolitushaku 172 → 173 lisäyksistä ajonaikaisilla kytkimillä.
3. **Kerroin 4,25 pois: kaupungin täytyy näkyä** (4,25:llä Googlen laattoja ei näkynyt lainkaan, vain omat mallit veden päällä).
   → palauta PieniKarkeinLisa (KaupunkiMuistibudjetti) järkeväksi tai poista pienen muistin kalibrointi, kunnes mittaus on tehty.
4. Tulos + suositus PT:lle ENNEN korjausta. Laite ja käännös vapaat (Julkaisija antaa NYT:n; LS1 tarjoutui ajamaan laitteella:
   laite-sha.sh + toisto3-ipad.sh A/B + lisäkomennot, lähettää konsolipolut).

## Data tähän mennessä (kaikki iPad Pro 13, Pariisi, Release)

LS1:n lokit `proto-3d/lokit/linssiseppa-toisto-ipad-20261009-*` (konsoli.txt, poiminta.txt) ja yhteenveto `proto-3d/lokit/muistiajo-173.txt`
(ajot 1–11). Muistiloki: haara linssiseppa/muistiloki-173 a550c05cb (Documents/kaupunki-muistiloki.txt → rivi sekunnin välein:
vapaa, varattu, tekstuurit (Texture.currentTextureMemory), laattoja (= MeshFilterit kaupungin juuressa, MYÖS vesipalat), kerroin, laatat %, hätä).

- **BUILD 172 kaatuu samoin** (2218-B-172: tekstuurit 516 → 1406 Mt jo 375 laatalla, 1785 Mt / vapaa 76 Mt → jetsam ~145 s). Vika on
  testaajien TF 172:ssa, ei 173:n regressio.
- Kaupungin avaus (t 104 → 106): vapaa 3,01 → 1,33 Gt, tekstuurit 518 → 1469 Mt kahdessa sekunnissa, kun Google-laatat 0–4 %. Samaan
  aikaan latautuvat: omat mallit (concorde, notre-dame, prefektuuri), korkeusmalli (lähi 3093×2926, kauko 3000×3000), vesi
  (291 lähi + 1217 kauko-palaa), kori-glb:t, latauskuva 2732×2048, ilmakehä-LUTit, äänet. Tekstuurit tasaantuvat ~1,48 Gt:iin
  sekä kertoimella 2,72 että 4,25 → avauksen ~0,95 Gt EI ole Google-laattoja.
- B 173d (2313, kerroin 4,25): vakaa 1,23–1,38 Gt vapaata t 107–153; laskeutuminen Notre-Damelle alkaa ("avauksen laskeutuminen…
  lento 24 s", korkeus 679 m) → t 153→154: vapaa 1,23 → 0,91 Gt (tekstuurit vain +29 Mt → ~290 Mt EI-tekstuuria), muistivaroitukset,
  MUISTIHÄTÄ 1 → karkea kamera (pikselit ×0,5) → jetsam alle sekunnissa. Hätä 2 (0,6 Gt) ei ehdi.
- `opas tekstuurit` laitteella (2227-173b-ajo1): RenderTexture 192 Mt, Texture2D 50, Texture3D 12, mutta currentTextureMemory 1473–1483
  → GetRuntimeMemorySizeLong antaa GPU-tekstuureille liian vähän. 571b31309 lisää arvion mitoista ja muodosta + ryhmän "(piilo)" =
  Cesiumin HideAndDontSave-laattakuvat. Ei vielä ajettu laitteella.
- RT-erittely (koodista, Opus-agentti): Ultra 2732×2048, kamerapinossa pysyvät värikohteet A/B + syvyys MSAA 4× ~350–430 Mt (ei
  muistittomia), SSAO ~69 Mt. 89509417e: < 12 Gt → MSAA 2×, SSAO pois → RT 192 Mt (laitteella todennettu), pieniskaala 0,85 → 144 Mt.
- Omien mallien kuvat ämpäristä (scratchpad glb_kuvat.py, RGBA8 + mipit): Notre-Dame lod0 72, lod1 72, lod2 43 Mt; Concorde 43 ×3;
  Préfecture 37 ×3 → jos kaikki tasot yhtä aikaa (REPLACE, CesiumOmatMallit forbidHoles = true), ~430 Mt. KTX2/ASTC → LS2:n jono (PT).
- Cesium (paketti com.cesium.unity@79587D546513): laattojen kuvat Texture2D HideAndDontSave, omat mipit, GPU-only. AVOIN: pitääkö
  cesium-native glTF-mallin (purettu kuvadata CPU:lla) muistissa laatan elinajan → piilokulutus, jota Unityn työkalut eivät näe.

## Junan 173 runko ja muutokset (proto `natiiviseppa/juna-173`, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-j173)

Kärki **571b31309**. Testit: Linssit 1258, Peli 442, Kartta 453, unity 0, tarkista 0. Ei lukittu, BUILD 173 -mergeä masteriin ei tehty.
Muistikorjaukset järjestyksessä (kaikki < 12 Gt -ehdolla paitsi ensimmäinen):
- ec4d1773e budjetti: kerroin saa karketa yli näyttökertoimen (KarkeinLisa 1,6), HataGt 1,0, HataSkaala 0,5.
- 68b015299 komento `opas tekstuurit [n]`; 571b31309 koko-arvio + (piilo).
- 89509417e KaupunkiKuva.PieniMuisti (systemMemorySize < 12000): MSAA 2×, SSAO pois kaupungissa; kytkimet `pienimsaa`, `pieniskaala`
  (Documents/kaupunki-kuva-asetukset.txt) / asetukset.json kaupunki.PieniMsaa/PieniSkaala; Ruudunpaivitys.MsaaKatto/SkaalaKatto.
- cbef6c66b (muisti-174, PT siirsi 173:een): Esilataaja.KaupunkiAuki (tausta seis), KarttaKerrokset.PeruTaustaSaapumiset,
  OmaSisaltoGt 0,3.
- 5458e7777 + ef4274c7c: PieniKasvuKerroin 1,75, **PieniKarkeinLisa 2,5 (→ kerroin 4,25: KAUPUNKI EI NÄY → PT: pois)**, välimuisti
  64 Mt, MUISTIHÄTÄ 2 (< 0,6 Gt suspendUpdate).
- 2e10dbf00 (merge 8afe8a8ad) laattapienennys-proto OLETUS POIS (`laattapienennys 1|2`; GPU-kopio ilman ylintä mippiä, alkuperäinen
  tuhotaan; säästö vain GPU-puolelta).
- 3b9ad3537 PieniLataus (oletus päällä, `pienilataus 0` pois): rinnakkaiset lataukset 6, preloadAncestors ja forbidHoles pois,
  loadingDescendantLimit 10; hätä 1 pienellä muistilla = lataus seis heti, ei karkeaa kameraa. EI ajettu laitteella.
LS1:n intro: 41fb97f44 / 1f9415189 (intro A: < 12 Gt ei Eiffel-esilatausta eikä -otosta; muilla esilataus vain vapaa ≥ 2,0 Gt;
< 1,0 Gt intro ohi). Muut 173:n sisällöt: ks. luovutus 20261009 TILA 18.0x–22.5x.

MUUTOSLOKI 173 (PT kuittasi, VAIN kun iPad-ajo on läpi: ei jetsamia, vapaa ≥ 0,5 Gt, kuvapari): "Pariisi alkaa nykyajan introlla, ja
Pariisissa ja Tukholmassa kuuluvat kirkonkellot, suihkulähteet ja satamavesi. Olavinlinnan historiassa kivilinna rakentuu vuosi vuodelta,
ja linnan väki puhuu kasvotusten. Varustekuvat ovat valokuvamaisia, eikä peli enää kaadu iPadilla Pariisissa." → Julkaisijalle VIE:n mukaan.
Lukitus: simukäännös (NYT) → juna/b13 → BUILD 173 -merge masteriin (kaava luovutuksessa 20261009).

## Junan 174 jono (PT kuitannut)
- NUI natiivi-ui/kysy-viiva-174 36630eedd; natiivi-ui/chat-pin-174 d6bcb66f2 (Pulun chat pinnattuna yläreunaan);
  asettelutesti-174 b44eac178 (korvaa c1fa81741 ja e8b853b97:n, joka on jo 173:ssa; testikytkimet PuluChat/Pinnaus/Nostokortti/PulunTauluNakyma).
- Pelikoodari pelikoodari/silmukat-ristihaivytys 34f8fdd18 (⊇ 753609a55). Ristiriita Siirtosepän siirtoseppa/juna174-silmukat
  d0bbaadd9:n kanssa SeikkailuAanet.Silmukassa: pidä Siirtosepän Muunnelma-/pankkirivit ja lisää `l.loop = true` -rivin perään
  `SaumatonSilmukka.Kiinnita(l)` (Pelikoodarin ohje).
- KTX2/ASTC omille malleille → LS2 (PT).

## Muut
- Mac TF 172 (37921284135) success. Mac TF 171 success.
- Unity 6.7: raportti docs/raportit/unity67-tuonti-20261009.md (simu-A/B valmis). iPad-ABAB vasta junan 173 jälkeen: A = lokit/
  natiiviseppa-app-ab63-laite (9dba62a6), B = scratchpad unity67-laite.sh (T7) → lokit/natiiviseppa-app-ab67-laite; skripti
  scratchpad ab67/ipad-ab-ajo.sh + ab-analyysi.py. (Scratchpad: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-3d-selvittaja/
  32830f79-9bf9-4b2e-92e1-6534a64677cf/scratchpad/ — säilyy samassa sessio-id:ssä.)
- Worktreet: j173 (juna), m174 (muisti-174, mergetty 173:een), lt174 (laattatekstuurit, mergetty), unity67 (T7, symlinkki wt:hen).
- Istuntoviestit: 10 viestin raja täyttyy nopeasti; ei kierretä. Posti-tiedosto + rivi, kun raja vapautuu.
