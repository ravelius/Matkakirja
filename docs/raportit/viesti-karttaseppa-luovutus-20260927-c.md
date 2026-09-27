# Karttasepän luovutus 27.9.2026 klo 20.4x (sessio 15 → 16)

- **Rooli-worktree:** `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922`
  (tätä haaraa ei mergetä).
- **Commitit:** `git -c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.
- **Viestiraja:** tämän session viestit Fablelle katkesivat klo 20.4x, koska harness
  keskeyttää viestit toisille sessioille 10 viestin jälkeen. **Kokonaisarvio on tässä
  luovutuksessa, eikä Fable ole vielä saanut sitä.** Lähetä Fablelle ensimmäisenä rivi
  "Yöpoltto käynnissä" (ks. alla).

## YÖPOLTTO KÄYNNISSÄ (omistaja 20.2x: "heti kun pystyt")

- **Ajo:** `/Users/Shared/Claude/pyramidi-poltto/ajo-20260927y/`
  - vahti `polttovahti-v5b.sh`, PID 72081 (nohup, PPID 1), käynnistyi 20.37
  - poltto alkoi 20.41
- **Lokit:**
  - `vahti.out`: ydinmuutokset ja niiden syyt
  - `aja.out`: vaiheet
  - `1.log`: pohja z0–z8, ranta ja viivat
  - `2.log`: syvä z9–z10
- **Mitä poltetaan:** `aja.sh`, VIE=0 eli `--ei-vie`, vain levylle.
  1. Uusi pohja `2026-09-27-pohja` z0–z8 + ranta `2026-09-27-ranta` + viivat
     `2026-09-27-viivat`. 144 shardia, `--ulos ajo-20260927y/pohja`.
  2. Syvä z9–z10 samaan versioon. Samat 298 335 z10-laattaa kuin 26s-pohjassa
     (`pallo-z10-20260927/syva-laatat-kaikki.json`), `--ulos ajo-20260927y/syva`.
     Mukana `--pakota-luettelo`.
- **Liput:**
  - resepti 2026-09-26
  - `--data pyramidi-poltto/gshhs-data-j27b`: GSHHG-meri `--pienin 0.0015` (Oslon
    saaret) ja GSHHG-järvet
  - `--jarvi-pienin 0.004 --jarvi-harvennus 0.001 --jarvi-pienin-px 4`
  - `--matala-viileys 0.5`
  - `--pinta-tasoitus 6,0.03,0.08`
  - viivat: `--merireitit-maaosuus`
- **Koodi:** worktree `/Users/Shared/Claude/wt/karttaseppa-poltto-20260927`, joka on main +
  #3436 + #3446 paikallisesti yhdistettyinä. ÄLÄ POISTA sitä polton aikana.
  `node_modules` on symlinkki pallo-z10-worktreehen, joten sekään ei saa kadota.
- **Arvio:**
  - z0–z8 + ranta + viivat valmis noin 22.30–23
  - syvä noin klo 04–05 (376 000 laattaa, 8–16 ydintä)
  - levyltä noin 19 Gt, klo 20.4 vapaana 91 Gi
  - v5b pysäyttää, jos levyä on alle 70 Gt
- **Vahti v5b:** v5 kahdella muutoksella, pysäytyslogiikka on ennallaan.
  - Sääntö 3 nostaa ytimiä muiden kuorman mukaan (kuorma5 − omat ytimet < 4), jotta ajo
    pääsee täysiin ytimiin.
  - Sääntö 2b: muistipaine ≥ 2 → 4 ydintä (Fable).
- **Miksi ei vientiä polton aikana:**
  - Fable hyväksyi viennin uusiin polkuihin, mutta `polta-paikallisesti.sh` vaatii
    `--ilman-rantaviivaa`-reseptillä ja viennillä myös `--pallo --pallotunniste`.
  - Luokitin esti pallon viennin tässä sessiossa ("Production Deploy").
  - Ensimmäinen yritys 20.36 päättyi siksi koodiin 2, ja uusi ajo on VIE=0.

## AAMULLA (omistajan kortilla, ei kiertoteitä)

1. **Tarkistus:** `aja.out` näyttää "1 koodi 0" ja "2 koodi 0". Katso lisäksi eheys `1.log`:n
   ja `2.log`:n lopusta, ja laatat levyllä `ajo-20260927y/pohja/luettelo` ja
   `ajo-20260927y/syva/luettelo`.
2. **Vienti uusiin polkuihin:** pohja z0–z10, `2026-09-27-ranta` ja `2026-09-27-viivat`.
   Tuotanto ei muutu. Vaatii omistajan hyväksynnän tähän sessioon (vrt. pallo-Z10:n kortti).
3. **Pallo Z0–Z9 uudesta pohjasta** (uusi sarja `2026-09-27-pohja-20260927`, 349 525 laattaa,
   noin 2 h). Tämän jälkeen **Z10 koko maailma**: `tee-pallolaatat --min 10 --max 10 --kaupungit
   <kaupungit.json> --kaupunkiaste 180 --lahdelaatat syva-laatat-kaikki.json --z10-lahde
   --vain-z10`, 215 121 laattaa, noin 1 h. Luettelossa on oltava z9–z10-tasot.
   Pallon vienti vaatii omistajan kortin.
4. **Osoitin** `pyramidi.json` → `2026-09-27-pohja` (+ viiva- ja rantaversio) ja pallon
   lepokerros. Natiivin pallosarjan nimi muuttuu, joten kysy Siirtosepältä ja
   Natiivisepältä. Varmuuskopio ennen vaihtoa, ja palautus kuten 27.9.
5. **Lisenssit ja lähteet:** GSHHG (järvet) on jo lähteissä. Tarkista, että
   `tools/vienti/lahteet.mjs` kattaa järvilähteen.

## Polttojono ja koodi

- `docs/raportit/karttaseppa-polttojono.md` ja raportti
  `karttaseppa-eurooppa-laatu-20260927.md` ovat PR #3433:ssa (docs, Fable mergeää).
  Kuvaparit eu-laatu-1 … 13.
- **PR #3436 (Julkaisijan junaan):** järvet (`tools/gshhs-jarvet.mjs`), matala viileys,
  delta-luokittimen järvet, merireittien maaosuus, pintatasoitus ja GEOGLOWS-joet
  kokeellisina (`--joet-lisa`, EI käytössä).
- **PR #3446:** pallo `--z10-lahde` ja `--vain-z10`.
- **PR #3403** (polttoskriptin koodi 1) on mergetty.

## Avoimet

- **Joet (kohta 4) seuraavaan polttoon:** GEOGLOWS-uomat piirtyvät tuplaviivoina
  (`eu-laatu-13`), vaikka lähteessä on yksi viiva. Todennäköinen syy on patinan
  vesiviivoitus leveän harmaan viivan reunoille, mutta tätä ei ole todennettu.
  Aineisto on valmiina: `pyramidi-poltto/joet-eurooppa-20260927/iso` (39 maata).
- **Étang de Berre:** puuttuu sekä GSHHG:stä että Natural Earthista. Tarvitaan kolmas
  lähde (OSM tai HydroLAKES, lisenssi tarkistettava).
- **Laaturaportin 27 pientä löydöstä** jäivät läpikäymättä: Reinin rajaviiva, läikät, sillat
  ja lautat. Fable pyysi ne seuraavaan polttoon.
- **NAS ajo-20260921:** kopio valmis 20.10 (`rsync -rt`, `nas-kopio-20260921.out`).
  - Paikallisesti 318 034 tiedostoa, NAS:ssa 644 318. Ylimäärä on todennäköisesti
    NAS:n `._`-metatiedostoja.
  - Tarkista määrä ilman `._`-tiedostoja ja anna sitten poistokomento Fablelle.
    Poiston ajaa omistaja, itse et poista.
- **Kokeilutyöt levyllä:** `pyramidi-poltto/eurooppa-laatu-20260927/` (mosaiikit ja koepoltot),
  `gshhs-data-j27` (vanha, voi poistaa) ja `gshhg-2.3.7/gshhs_f.b`.
