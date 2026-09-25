# Karttasepän luovutus 25.9.2026 (sessio 8 → 9)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922`
(EI mergetä). Erät vain `sh /Users/Shared/Claude/Matkakirja-fable/tools/uusi-worktree.sh karttaseppa <aihe>`
(`--poista karttaseppa-<aihe>` heti mergen jälkeen). Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.
Edellinen: `viesti-karttaseppa-luovutus-20260924-1440.md`.

## Säännöt (sitovat, opittu 24.–25.9.)

- **JUMI → FABLE** (omistaja 25.9. klo 04.4x): jumissa (päätös puuttuu, työ ei etene, luokitin estää)
  EI korttia omistajalle, vaan yksi viesti Fablelle (tilanne, vaihtoehdot, suositus) ja muu työ jatkuu.
  Työpöytäsovelluksen lupaikkunasta heti Fablelle.
- **Poltto täysillä vain yöllä** (16 ydintä, kierrä levysiivous 03 ja TF 04–05); päivällä vain Fablen
  luvalla. Kuorma 500+ kaataa simulaattorit → Fable voi pyytää pysäytystä; jatko aina samalla komennolla.
- **Ämpäriin vain Fablen käskystä.** Webin pyramidi.json-osoitin vaihdetaan vasta omistajan kuvakokeilun
  jälkeen (Julkaisijalle kerrottu). Julkaisija ilmoittaa BUILD-hetket → pysäytä poltto sen ajaksi.
- Viestiraja: SendMessage ~10/vuoro; varakanava `mcp__ccd_session_mgmt__send_message` session id:llä.
- Levy: generaattorin tmp-työkansiot (`/var/folders/.../T/pyramidi-<pid>`) täyttivät levyn 24.9. (35 Gt) →
  siivous PR #3123 (mainissa). Finder kirjoittaa `.DS_Store`n kesken `rm -rf`:n → PR #3151.
- CI on Linux x64: tavutarkat tiivisteet eroavat Macin arm64:stä (zlib ja liukuluvut); sharp puuttuu CI:stä.

## ÄMPÄRISSÄ 25.9. (määrät tarkistettu)

| Mitä | Polku `media.matkakirja.app/…` | Laattoja |
| --- | --- | --- |
| Peruskartta 2026-09-25 pyramidi (webin laatat, EI luetteloa) | `julisteet/pyramidi/2026-09-25-pohja/` · `-viivat/viivat/` · `-nostot/nostot/` · `-ranta/ranta/` | 92 968 · 14 152 · 4 912 · 12 342 |
| Peruskartta 2026-09-25 pallo Z0–Z9, **ilman viivatasoa** (natiivi, build 13) | `julisteet/pallo/laatat/2026-09-25-pohja-20260925/` + laatat.json | 349 525 (ks. alla) |
| Yövalot Black Marble 2016 Z0–Z6, vain valot mustalla | `julisteet/pallo/yovalot/2026-09-25/` (+ `-alkup/` sininen alkuperäinen) | 5 461 + 5 461 |
| Rajat korkeuksineen (Natiivisepän muoto, h int16 absoluuttinen) | `julisteet/pallo/vektorit/2026-09-25-gshhs-korkeus/` | 1 530 bin |
| E28 syvät pallotasot Z9–Z11 (23a-pohja) | `julisteet/pallo/laatat/2026-09-23a-pohja-20260924e28syva/` | 199 708 |
| Satelliitti (Fablen valinta bmng-bathy + s2-alkup) | `julisteet/pallo/satelliitti/2026-09-24/{bmng,bmng-bathy,s2,s2-alkup}/` | 21 845 ×2 · 9 162 ×2 |
| Kermahuntu Z3–Z8 (Z3–Z4 alasnäyte) | `julisteet/pallo/kerma/2026-09-23a-p080/<ISO|_maailma>/` | — |

**JATKOKOHTA (klo 12.2x, tilinvaihto):** viivattoman pallon vienti on KESKEN — keskeytyi omistajan
verkkokatkoon, jatkui 12.02 taustaprosessina (aws s3 sync, kolme kierrosta, sitten luettelo ja määrät) ja
saa jatkua; jos prosessi katosi, aja alla oleva sync (vie vain puuttuvat) ja vie laatat.json
(`aws s3 cp …/pallo-viivaton/laatat.json s3://$AMPARI/julisteet/pallo/laatat/2026-09-25-pohja-20260925/laatat.json
--content-type application/json --cache-control "public, max-age=300"`). Paikallisesti 349 525 laattaa, 426/426 shardia valmis.
Ilmoita Natiivisepälle ja Fablelle vasta, kun määrä täsmää.
Viennin eteneminen:
tarkista `/Users/Shared/Claude/pyramidi-poltto/ajo-20260925/vie-pallo-2.out` (rivi "paikallisia … ämpärissä …").
Jos luvut eroavat, aja sync uudelleen (vie vain puuttuvat):
`zsh -c 'source ~/.zshrc; aws s3 sync /Users/Shared/Claude/pyramidi-poltto/ajo-20260925/pallo-viivaton s3://$AMPARI/julisteet/pallo/laatat/2026-09-25-pohja-20260925 --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com --exclude "*" --include "*.jpg" --exclude "._*" --exclude "*/._*" --content-type image/jpeg --cache-control "public, max-age=31536000, immutable" --only-show-errors'`
ja laske `aws s3 ls … --recursive | grep -c '\.jpg$'` (odotettu 349 525).

## Peruskartan resepti 2026-09-25 (omistaja hyväksyi 25.9. klo 03.4x)

D2 + C-reliefi + natiivin vektorirannat: pohja ilman rantamustetta (AA-maski), meri sävyliukuna (ei
syvyyskäyriä eikä vesiviivoitusta), GLO-90/GLO-30-reliefi kaikille tasoille, pallo laatikkosuodatin
JPEG 90 4:4:4. Koodi mainissa: PR #3130 (`tools/polttoresepti.mjs`, `polta-paikallisesti.sh --resepti 2026-09-25`,
DEM-lohkot ja kaistajako 122 pohjashardia). Vedokset ja mittaukset:
`docs/raportit/kaappaukset/kartta-46-20260924/LUEMINUT.md`.

- Ajokansio `/Users/Shared/Claude/pyramidi-poltto/ajo-20260925/` (11 Gt): pyramidin shardit (426 valmis),
  `pallo-viivaton/` (vienti), `lahde-levylta/`, luettelo `luettelo/pyramidi.json`. Skriptit: `aja.sh`
  (YTIMET-ympäristömuuttuja), `pysayta.sh`, `kaynnista-nyt.sh`, `vie-pyramidi.sh`, `pallo-viivaton.sh`.
  Worktree `wt/karttaseppa-poltto-20260925` (PR #3151; poista kun mergetty).
- **Kun vienti on tarkistettu:** ajokansio NAS:iin `…/Matkakirja-arkisto/poltot/pyramidi/ajo-20260925/`
  (rsync --remove-source-files, ohita `._*`), sitten `--poista karttaseppa-poltto-20260925`.
- **Seuraavaksi (Fablen järjestys):** sileä sarja, kermahuntu ja syvät tasot uudella reseptillä; **Z10**
  myöhemmin kattavuuslistalla (230 279 maalaattaa). Webin osoitin vain omistajan kuvakokeilun jälkeen.

## Muut valmiit tänään

- Aluenimet natiiville (löydös 38 b): `assets/data/aluenimet-natiivi.json` (PR #3100 mainissa; kuvaus-
  täsmennys #3117), Siirtosepän paketti 1.37. Fontti **Liberation Serif 2.1.5** (OFL): TTF:t Natiivisepällä
  (`proto-3d/lokit/fontit-liberation-serif/`) ja webin polttoon PR #3105 (FONTTI PUUTTUU -pysäytys).
- Rajakorkeudet `tools/maasto/vie-rajakorkeudet.mjs` (#3132 mainissa).
- Yövalot: `/Users/Shared/Claude/satelliitti-koe/aja-yovalot.sh` + puhdistus (kynnys tasoittain, lämpöehto),
  lähteet NAS `…/satelliitti/yovalot/`. Worktree `wt/karttaseppa-yovalot` (haara satelliitin päällä, ei omaa
  muutosta) → `--poista karttaseppa-yovalot`.
- Satelliitin hävinneet sarjat `bmng/` ja `s2/` poistetaan ämpäristä ja NAS:ista vasta Natiivisepän
  ilmoituksesta (omistaja nähnyt build 10:n).

## Avoimet PR:t

#3102 raportti nimet · #3105 Liberation Serif polttoon · #3108 satelliittityökalu · #3117 aluenimet kuvaus ·
#3151 poisto Finder-kilpailua vasten.
