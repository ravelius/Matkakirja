# Karttasepän luovutus 24.9.2026 klo 14.40 (sessio 7 → 8)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922`
(EI mergetä). Erät vain `sh /Users/Shared/Claude/Matkakirja-fable/tools/uusi-worktree.sh karttaseppa <aihe>`.
Edellinen luovutus: `viesti-karttaseppa-luovutus-20260924.md` (osoitteet, maasto, reliefi, syvä Ranska).
Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.

## Säännöt, jotka opittiin tänään

- **Päivällä rinnakkaisuus 4** (`--ytimet 4`, `--osa i/4`); täysi vain yöllä. Omistajan buildit ohittavat poltot.
- **Ei ajoa klo 03 (levysiivous) eikä 04–05 (TestFlight-yöajo).**
- **Levy:** valmiit tulokset NAS:iin `…/Matkakirja-arkisto/poltot/{pyramidi,maasto,reliefi}/`; paikallisesti vain keskeneräinen ajo.
  `.ampari-ok`-merkki vasta ryhmämäärätarkistuksen jälkeen (Natiivisepän siivous poistaa vain laatta-alikansiot).
- **Vanhentunut ämpäriluettelo** ajokansiossa pysäyttää nyt polton (vartija #2962:ssa).
- **Kysy ennen kuin toimit**, jos pyyntö on ristiriidassa koodin kanssa (löydös 22: webissä ON kermahuntu).

## Ämpärissä tänään (kaikki määrät tarkistettu)

| Mitä | Osoite `media.matkakirja.app/…` |
| --- | --- |
| Kermahuntu natiiville (löydös 22, webin laattakerma-shaderin sääntö: smoothstep(36,52,R−B)×0,80, #faf4d6, meri läpinäkyvä, oma maa reikä) | `julisteet/pallo/kerma/2026-09-23a-p080/<27 E28-maata>/` + `_maailma/`, Z5–Z8, puuttuva = läpinäkyvä |
| Maiden ääriviivat (webin maapolygonit.json lon/latina, NE 10m admin-0, 135 maata) | `julisteet/pallo/vektorit/maapolygonit-2026-09-24/maapolygonit.geojson` (gzip) |
| Väritaso Mercatorina (k3; natiivi käyttää nyt kermaa, k3 jää) | `julisteet/pallo/vari/2026-09-14b-tasoitus-k3/<ISO>/` (kansiot ilman päätettä ja k2 = hylätyt) |
| Sileä sarja (ilman viivatasoa) — natiivi lennon ajaksi | `julisteet/pallo/laatat/2026-09-23a-pohja-20260923arajaton/` Z0–Z8 |
| Syvä Ranska | pyramidi `2026-09-23a-pohja/z9–z10`, pallo `…-20260923asyva/` Z9–Z11 |
| Reliefi 20260924 (päivämääräraja paikattu) | `matkakirja/reliefipyramidi/20260924/` + `pallo/` + `pallo-k08/` |
| Isoisä 1873 | `matkakirja/linssit/isoisa-1873/20260921/` |

Natiivin build 8 -viat b7-3 olivat natiivin päässä (pohjan varalaatta, ei uusintahakua) — data tarkistettu.

## Käynnissä / ajastettu

1. **E28 syvät tasot** alkaa klo 22.00 (`/Users/Shared/Claude/pyramidi-poltto/ajo-20260924-e28-syva/aja.sh`,
   101 shardia + pallo 16 osaa, vahti pysäyttää 02.45; jatko samalla komennolla). Taustatehtävä on tämän
   session; jos se katoaa nollauksessa, aja itse klo 22 jälkeen:
   `cd /Users/Shared/Claude/pyramidi-poltto/ajo-20260924-e28-syva && zsh aja.sh > aja-$(date +%H%M).out 2>&1`
   Skripti EI vie pallosarjaa ämpäriin: vie `pallo/` → `julisteet/pallo/laatat/2026-09-23a-pohja-20260924e28syva/`
   (aws s3 sync, image/jpeg, immutable, laatat.json lyhyt) ja tarkista määrät; kerro Natiivisepälle. Tarkista
   ensin, että pyramidin z9–z10 meni polkuun `2026-09-23a-pohja` (ei 22c).
2. **NAS-siirto** (taustalla, rsync --remove-source-files): maasto 23a/23b/koe-maailma, reliefi ulos*/lahde/paikka,
   pyramidi-poltto ajo-*/vari-pallo*/pallokerma/koe-*. Tarkista lopuksi `du -sh /Users/Shared/Claude/{maasto,pyramidi,reliefi}-poltto`
   ja ilmoita Fablelle vapautunut määrä. `sisalto-koe` (3,1 Gt) on Siirtosepän, ei meidän.
   HUOM: E28-skriptin luettelopolku osoittaa jo NAS:iin (`…/poltot/pyramidi/ajo-20260923a/luettelo/pyramidi.json`).
3. **Satelliittipinta lennolle** (omistajan kortti 13.5x, LENNON PINTA): Opus-agentti valmistelee
   (worktree `wt/karttaseppa-satelliitti`, tila `/Users/Shared/Claude/satelliitti-koe/TILA.md`, raportti
   `docs/raportit/satelliitti-lennon-pinta-20260924.md` haarassa). Tilaus: NASA Blue Marble NG (PD, 500 m,
   elokuu) Z0–Z7 koko maailma + EOX Sentinel-2 cloudless **2016** (CC BY 4.0; 2018+ on NC, EI käytetä)
   Z8–Z11 71 kaupungin + Lontoon ympärillä (~60 km), attribuutio "Contains modified Copernicus Sentinel data
   2016, EOX IT Services". Rajapinta on sovittu Natiivisepän kanssa: `julisteet/pallo/satelliitti/<pvm>/bmng/`
   ja `/s2/` (XYZ {y}, 256 px jpg), `s2/laatat.json`: kaupungit + laatat8 + saanto. **Ennen ajoa koko ja
   aikataulu Fablelle.** Jos EOX:n ehdot kieltävät massahaun → pysähdy ja kerro.

## Avoimet PR:t (Julkaisijan jonossa)

#2962 syvät tasot (+ välimuistivartija) · #2980 reliefi-jatko (täytesävy, --kyllaisyys, --ilman-viivoja,
reliefipyramidin päivämääräraja) · #2989 maasto maailma · #3044 reliefiosoitin 20260924 (versionosto) ·
#3054 väritaso pallolle (pohjana #2980) · #3061 tee-pallokerma + maapolygonit-geojson.

## Worktreet

`wt/karttaseppa-{syvat-tasot,reliefi-jatko}` käyttää E28-ajo tänä yönä — älä poista. Muut
(`maasto-maailma, reliefi-osoitin, vari-pallo, pallokerma, satelliitti`) ovat avointen PR:ien / työn takana.
