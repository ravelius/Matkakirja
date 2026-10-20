# Karttasepän luovutus 21.9.2026 (sessio 1 → sessio 2)

## Tila
- Koko pyramidi poltettu 21.9. GSHHG-rantaviivalla ja hyväksytyllä vedoksella:
  pohja `2026-09-21-pohja` (joet pohjassa, meriresepti koe3), viivat `2026-09-21-viivat`,
  ranta `2026-09-21-ranta`, nostot `2026-09-21-nostot` (112 maata, tasot 1–3),
  nimiöt `2026-09-21e-nimiot` (vain aika='pysyva', 94 nimeä + 8 koristetta),
  pallosarja `pallo/laatat/2026-09-21-pohja-20260921a/`, vektorit `pallo/vektorit/2026-09-21-gshhs/`.
  Kaikki laatat ämpärissä. **Luettelo viety ämpäriin 21.9. v1987:n jälkeen** (kopio
  `~/pyramidi-poltto/vienti-20260921/pyramidi.json`, edellinen `pyramidi-edellinen.json` palautusta varten).
- Osoittimet (js/pallo.js, js/pallovektorit.js, sw.js, assets/data/maapolygonit.json GSHHG-kehällä)
  ovat Julkaisijan v1987-haarassa (PR #2639, CI käynnissä). Haarani `karttaseppa-gshhs-rantaviiva`
  4d5630c9 = sama koodi + raportit/kaappaukset/nimiot-poltto-2.json.
- Liftauszoomi korjattu: `karttaseppa-v1984-liftauszoomi` 1c802159 (lauta.js matkaZoomirajat nollaa
  kattoPuristuksen; savuke-liftaus-ajoitus.mjs 7 ajoitusta 14/14, sarjat.json). Odottaa Julkaisijaa.
- Selvitys Vuosi 1873 -linssin raja-aineistosta: docs/raportit/linssi-1873-aineisto-20260921.md
  (omistajan päätökset auki: GPL-3.0-data vai oma PD-runko; rasterilinssi; aikajanan vuodet). EI aloiteta.

## Kesken / heti seuraavaksi
1. Luettelo VIETY (tuotanto tarkistettu kaappauksella main-koodilla). Ei avoimia välittömiä tekoja.
2. Nimiötason erät maittain (Sisältökirjuri, 5 maata/erä, kenttä `aika`): merge haara, tee
   `nimiot-poltto-N.json` (NIMISTO_1873 + koristeet nimiot-poltto-2.json:sta), CI-tauko Julkaisijan kanssa
   (~10 min), `~/pyramidi-poltto/ajo-20260921/aja-2.sh` uudella `--nimioversio` (kirjain eteenpäin) →
   luettelo vientikansioon, kaappaukset, luettelo ämpäriin (versiot muuten ennallaan, ei osoitinmuutosta).
   Pallo kieltäytyy ("on jo ämpärissä") — harmiton, luettelo syntyy ennen sitä.
   Odottavat siirrot: SCHLESWIG-HOLSTEIN itään, WÜRTTEMBERG/BADEN erilleen.
3. Kohdemaan nostot ovat pelissä eläviä (KOHDEMAAN_NIMIOT_ELAVINA): tasot ja kuvamerkit elävään kerrokseen = Pelikoodari.

## Jono (omistajan päätökset 21.9.2026, Fable)
1. **UUDEN KARTTASEPÄN ENSIMMÄINEN ERÄ — ATLASLEHTI-VEDOS**: yksi Stieler's Hand-Atlas 1875 -lehti
   (Ranska; Commons, PD, ~15 700 × 12 900 px, ~38 Mt) georeferoituna pallon päälle linssinä (rasteri:
   4–8 kontrollipistettä → warp Miller/Mercator-laatoiksi z3–z6 Euroopan alueelle, oma
   `pallo/laatat/…`-tyyppinen sarja tai linssin oma laattakerros), 3 kaappausta omistajalle. Vain vedos.
2. Vuosi 1873 -linssin raja-aineisto: PÄÄTETTY historical-basemaps (GPL-3.0) world_1878 → 1873 käsin,
   tarkennus NE-nykyrajoilla muuttumattomille osuuksille; muutokset dokumentoidaan, johdettu aineisto
   jaetaan samalla lisenssillä. EI vielä toteutukseen — vain aineiston valmistelu, kun Fable sanoo.
   Runko: docs/raportit/linssi-1873-aineisto-20260921.md, luku 3.
3. Rantaviivan lisäpaikkaus (OHM, CC0) vain jos omistaja näkee virheitä.

## Työkalut ja polut
- Worktree `/Users/samireivinen/Matkakirja-opus2`, haarat `karttaseppa-<aihe>` origin/v1973-prep:stä.
  Commit: `git -c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi commit`.
- Env: PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js,
  PW_CHROMIUM=".../ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing".
  Ämpärin avaimet ~/.zshrc (AMPARI, PAATE, AWS_*); Bash-työkalu ei lue sitä → `zsh -c 'source ~/.zshrc; …'` tai skripti.
- Aineisto: `~/pyramidi-poltto/gshhs-data/` (ne_10m_ocean.geojson = GSHHG, lahde.json), `ne-data/` (NE),
  `korkeuspalat/`, `gshhs/gshhs_f.b`. Työkalut: tools/gshhs-meri.mjs, tee-pallovektorit --harvennus=0.004,
  generoi-maapolygonit --meri=<gshhs>/ne_10m_ocean.geojson, polta-paikallisesti.sh (--data, --*liput,
  --nimioversio/--nimiot/--nimioliput, --ilman-nostoja/--ilman-nimioita, lapsille liput ympäristöstä).
- Ajo: `~/pyramidi-poltto/ajo-20260921/` (aja-1.sh pohja, aja-2.sh nostot+nimiöt+luettelo+pallo, lokit/,
  luettelo/pyramidi.json, lahde-levylta/, kaappaus/); vektorit `~/pyramidi-poltto/vektorit-gshhs/` + vie-vektorit.sh.
- Scratch (ei repossa): kaappaa-ranta.mjs (PAIKALLISET-reititys, POV, NIMI), profiili.mjs, png2webp.mjs,
  yhdista-laatat.mjs, parivertailu.mjs — /private/tmp/claude-501/…/scratchpad; kopioi tarvittaessa.
- Raportit: docs/raportit/poltto-koe-20260920.md (kaikki kokeet ja polton osiot), polttosuunnitelma-20260920.md.

## Opit
- Shardin lapsi laskee argumentit nimestä: kaikki liput ympäristöön (POLTTO_*), muuten lapsi käyttää oletuksia.
- `--vain-luettelo` tarvitsee samat kerrosliput kuin shardit (--eijoet), muuten eheys punainen.
- Nimiöversio ei saa olla ajon tunnuksessa (shardi on versiokohtainen) — muuten koko poltto uusiutuu.
- Koristeet ja nimet: koristeet väistävät; z≤5 vain palavat nostot esteitä, ei jokia; ilman paikkaa nimi pois.
- Kehä, ranta ja täyttö samasta tiedostosta: muuten kaksoisviiva (mitattu 227 km Girondella).
- Poltto ~50 min / kerros-sarja 16 ytimellä; nimiöshardi ~2 min; pallosarja 2,5 min levyltä.
