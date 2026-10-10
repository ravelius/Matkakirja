# Linnanrakentajan luovutus 10.10.2026 päivä (06.3x–08.3x)

Edellinen: `viesti-linnanrakentaja-luovutus-20261010-aamu.md`. Haarat: työ `linnanrakentaja-tyo-20260929`, Olavinlinnan
blender.json `linnanrakentaja-linna-v45e` (worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45e`).

## Olavinlinnan paketit (kaksi lähdettä)

- **1499-asu**: `_valmiit/olavinlinna-blender-v44` (kuori ilman tornien yläosia, asu.json → rakennus.json asu "1499").
- **Nykyasu**: `_valmiit/olavinlinna-blender-v44-nyky` = symlinkit v44:ään, paitsi
  - `ulkokuori/`: v46p:n glb:t kartioineen + nyky-atlas (`linna-laatu/ulkokuori-v25-koe/nykyasu/`: nyky_atlas.py, kokoa_nyky.zsh), EI asu.json:ia
    (rakenna.mjs: tiedoston olemassaolo → "1499");
  - `kavely/`: symlinkit, paitsi osat.json + merkit.json (nyky_kavely.zsh → nyky_kavely.py: tornien 1790-l. yläosat vuosileikkauksina
    n1790-<torni>, "vuodesta": 1790, leikkaus:vain-1499-b-listaan). **Aja nyky_kavely.zsh aina, kun v44/kavely muuttuu.**
- Vienti: `zsh tools/dioraama/vie-blender.sh --lahde <kansio>` v45e-worktreessä → commit blender.json → `gh workflow run vie-dioraama.yml
  --ref linnanrakentaja-linna-v45e -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → hash lokista (scratchpad vie_molemmat.zsh -malli).
- Pelin leikkausraja 32 (SeikkailuKavely.LeikkauksiaMax): aina-leikkaukset (vain-1499-listat) ensin myös kävelyssä. v44: 14, nyky: 17;
  kappeli-kavely 13. Suositus Siirtosepälle: raja 48.

## Tehty

- **v46w** c6aac9f0680488a6 (1499): Kirkkotornin tiililaikku = leivottu tila `tilat/kappeli.glb` työntyi kuoren läpi (ei kävelyosa) →
  `olavinlinna-kavely-v1/lahde/tyokalut-lr/tornin_ulos_pois.py` (säde akselia kohti osuu kuoreen = ulkona; reunakolmiot jaetaan).
  Vesipohjat −7,02/−7,05 → −7,30/−7,35 (`vesi_alas.py`, kavely.py samoin; z-taistelu järven −7,0 kanssa). Valkoinen kallio = Siirtosepän koodi.
- **v46x-nyky** 66cd02861b568a52: nykyasun kuori + esihistorian 4 vaihemallia (`olavinlinna-vaiheet-v1/lahde/esihistoria.py`:
  kalliomaalaus, kota-nuotio −4000…−2200; haapiot, kaskisavu 300…1300; mantereella, paikat maastosta; värit sRGB-arvoina).
  Savu (liekki:/savu:-tyhjät) vaatii Siirtosepältä tyhjien luvun SeikkailuVaiheet.Rakennaan.
- **v46y** (kappelin kaariportaikko, PT kohta 4): kavely.py kaytava(seina=, leik_lev=), kaariportaat r 5,85 / leveys 0,85 / seinät 0,15,
  ampumakäytävän leikkaus ristiksi; kuoren leikattu ala tornilla 140 → 51 m²; reittipisteet siirretty (reittitesti scratchpad reittitesti.py:
  kaikki kävelypinnalla, vapaata 0,42–0,44 m). Ajo `tyokalut-lr/kaariportaat_v46y.zsh` (+ paikkaa_kappeli.py). Vanhat `v46x-talteen/`.
  **v46y-paketit (toimitettu Siirtosepälle 176:een 08.4x): NYKY c60e46eb73969b9a** (blender 0915a452f72cddd5, v45e 751d75cad; asu nyky,
  tornien n1790-vuosileikkaukset), **1499 d1a8ad15aeb7f0af** (blender 30fa12007ccfabe4, v45e 627c0da05).
- **Tukholman kaupungintalo**: Karttasepän v1s-pinnat → `tekoaly_koko.zsh sh v1s - pelkka-kohdistus` + `aja_tekseli_v1.zsh`, portti 0,
  lod0 6 840 / lod1 4 280 / lod2 1 296 kolmiota; arkki `stadshuset-v1/esikatselu/tekoaly-v1/sh_v1s_arkki.jpg`. LS2 teki testipaketin;
  PT: 176:een ASTC-ehdolla (LS2 vie). Avoinna: LS2:n sävyhuomiot (kupari vaalea?), LS1:n julkisivuvalo, omistajan kortti.

## Avoimet

1. (tehty) hashit Siirtosepälle ja PT:lle. Seuraavaksi: Siirtosepän arkki uusilla paketeilla → korjaukset.
2. Siirtoseppä: arkki v46w/v46x/v46y; savu-tyhjät; leikkausraja 48.
3. Eiffel v1 (LS2:n pari), ND v3d (omistajan kyllä), pp/RH/co LS2:n kuvat — kuten aamun luovutuksessa.
4. Karttaseppä 08.3x: Olavinlinnan veden väri `_tyo/karttaseppa/vesivari-olavinlinna-20261010/vesivari-kaudet-olavinlinna.json`
   (Kyrönsalmi kesä: syvä 0,001/0,003/0,005, matala 0,002/0,004/0,006 lineaarinen, 0,9 FNU; talvi epäluotettava, Haapavesi ei käytössä)
   → järven vesi-pinta (rakennuksen pinta "vesi" / LS2:n vesi) — sovitaan Siirtosepän/LS2:n kanssa, kuka kytkee.
5. Stadshuset: lansi = Karttasepän v2s (tornin pilkutus pois), muut v1s; glb:t päivitetty 08.3x, LS2 vie 176:een ASTC:nä.
6. LS2 08.3x pelikuvat (Matkakirja-linssiseppa-2 c2d26ff51, docs/raportit/kaappaukset/linssiseppa2-pitka-20261010/): **Eiffel v1 korjattavat**:
   esplanadin maa tasainen vaalea beige laatta peittää Champ de Marsin puistot (kirkas neliö) → maa pois tai Googlen väriin/leikkaus pienemmäksi;
   torni vaaleampi/punaruskeampi kuin Googlen tumma ruskea (lahde/eiffel.py RUSKEA0/1 tummemmaksi); 1. ja 2. kerroksen tasot sinisinä
   paneeleina (materiaali/väri). Préfecture v1, Riddarholmen v3b, Concorde v2: arkit prefektuuri-v1.jpg, riddarholmen-v3b.jpg, concorde-v2.jpg
   (katso ja korjaa). Kaupungintalon pelikuva tulee LS2:n seuraajalta.

## Seuraavan session järjestys

1) Eiffel v1:n LS2-korjaukset (kohta 6) → LS2:n uusi pari. 2) Préfecture/RH/Concorde-arkit (kohta 6). 3) Kaupungintalon pelikuva
(LS2:n seuraaja) → kalibrointi → omistajan kortti PT:n kautta; LS1:n julkisivuvalo, kun malli on pelissä. 4) Siirtosepän arkin löydökset.
