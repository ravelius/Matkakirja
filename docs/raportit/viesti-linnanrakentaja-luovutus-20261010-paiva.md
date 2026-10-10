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
  Viennit 1499 + nyky käynnissä 08.2x (hashit luovutuksen lopussa / viesteissä Siirtosepälle).
- **Tukholman kaupungintalo**: Karttasepän v1s-pinnat → `tekoaly_koko.zsh sh v1s - pelkka-kohdistus` + `aja_tekseli_v1.zsh`, portti 0,
  lod0 6 840 / lod1 4 280 / lod2 1 296 kolmiota; arkki `stadshuset-v1/esikatselu/tekoaly-v1/sh_v1s_arkki.jpg`. LS2 teki testipaketin;
  PT: 176:een ASTC-ehdolla (LS2 vie). Avoinna: LS2:n sävyhuomiot (kupari vaalea?), LS1:n julkisivuvalo, omistajan kortti.

## Avoimet

1. Hashit v46y-1499 ja v46y-nyky Siirtosepälle (176) + PT:lle.
2. Siirtoseppä: arkki v46w/v46x/v46y; savu-tyhjät; leikkausraja 48.
3. Eiffel v1 (LS2:n pari), ND v3d (omistajan kyllä), pp/RH/co LS2:n kuvat — kuten aamun luovutuksessa.
