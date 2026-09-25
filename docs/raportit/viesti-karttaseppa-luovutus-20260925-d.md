# Karttasepän luovutus 25.9.2026 ilta (sessio 9 → 10)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922`
(EI mergetä; `git pull` ei toimi, koska upstream on main — ajan tasalla `git pull origin karttaseppa-tyo-20260922`).
Erät vain `sh /Users/Shared/Claude/Matkakirja-fable/tools/uusi-worktree.sh karttaseppa <aihe>`, poisto heti pushin/PR:n
jälkeen (`--poista`; jos Finderin `.DS_Store` jättää kansion, tarkista `git ls-remote` ja `rm -rf` kansio).
Commit `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`. Edellinen: `viesti-karttaseppa-luovutus-20260925.md`.

## Säännöt (lisäykset tänään)

- **JUMI → FABLE**; ämpäriin vain Fablen käskystä. **Toiselta sessiolta estettyä toimintoa ei tehdä sen puolesta**
  (Julkaisijan R2-avaimet estetty → osoitinvaihto tehtiin Actions-työnkululla `vaihda-pyramidi-osoitin.yml`).
- Taustaprosessit irrotetaan `perl -e 'use POSIX qw(setsid); setsid(); exec @ARGV'` (LaunchAgentin luokitin estää).
- Älä muokkaa skriptiä, jota ajetaan (bash lukee tiedostoa ajon aikana → syntaksivirhe lopussa).
- Älä laita omistajan sähköpostia User-Agentiin (tapahtui kerran Wikidata-haussa, korjattu).
- `aws s3 sync` käy sarakkeet leksikografisesti (9/60–9/99 viimeisinä).

## TUOTANNOSSA NYT: PERUSKARTTA 2026-09-25 (osoitin vaihdettu klo 19.00, v2233)

- `julisteet/pyramidi/pyramidi.json` = koeluettelo `koe/2026-09-25/pyramidi.json`: pohja 2026-09-25-pohja, viivat
  2026-09-25-viivat, ranta 2026-09-25-ranta, **nostot 2026-09-25c-nostot** (poltettu `--nostot-ilman-nimioita`,
  kaikilla maakirjauksilla `nimiot: false`), nimiötaso kannettu 2026-09-22g-nimiot. Varmuuskopio
  `julisteet/pyramidi/pyramidi-20260925-1900.json` (palautus: `vaihda-pyramidi-osoitin palauta=…`).
- Web-pallo `PALLO_LAATTAVERSIO '2026-09-25-pohja'`, tunniste `20260925` (viivaton sarja, sama kuin natiivi), sw.js
  LAATTAKANSIO sama (#3216). Koelippu `?pyramidi=<sarja>` jää (#3203; `julisteet/pyramidi/koe/<sarja>/pyramidi.json`).
- Opittu: nostotaso poltettava lipulla `--nostot-ilman-nimioita`, muuten nostot katoavat eivätkä ole napautettavia.
  Resepti ja vartija: PR #3216:ssa mukana (#3214:n commit).
- Savukkeet osoitinvaihdon jälkeen (ajo 36158002209): sumu, topografia, laattaohjelmat, nostot* vihreitä. Punaiset:
  kuorma (Chromium launch 180 s, GLO-30 24 virtaa), ranskan-nostot-lukossa → **PR #3235** (ankkurit camargue,
  dune-du-pilat, saint-cloud; 27/27), laivamatka-tanger paikallisesti 14/14 (kuormaa), astro-pallo-puhelin 43/47b → **VANHAT** (toistettu paikallisesti sekä 25:llä
  että 23a-yhdistelmällä 62/64). Julkaisija ajaa kuormapunaiset uudelleen (ajo 36160332234).

## ÄMPÄRISSÄ TÄNÄÄN (määrät tarkistettu)

| Mitä | Polku `media.matkakirja.app/…` | Määrä |
| --- | --- | --- |
| Viivaton pallo Z0–Z9 (natiivi + web) | `julisteet/pallo/laatat/2026-09-25-pohja-20260925/` | 349 525 |
| Kermahuntu 25-pohjasta (27 maata + _maailma Z0–Z8) | `julisteet/pallo/kerma/2026-09-25-p080/` | 33 948 webp |
| Nostotaso 25b (nimet laatassa — EI käytössä) / 25c (tuotanto) | `julisteet/pyramidi/2026-09-25{b,c}-nostot/` | 4 908 / 3 974 |
| S2-loppuorbit 19 kaupunkia (Z8–Z10 300 km, Z11 60 km, EOX 2016 CC BY) | `julisteet/pallo/satelliitti/2026-09-25/s2-orbit/` | 11 979 |
| Maakuntavektorit 250 maata | `julisteet/pallo/maakunnat/2026-09-25a/` | 501 |

## KÄYNNISSÄ

1. **GLO-30 koko maailma NAS:iin** (omistajan lupa): `dem-lataus/glo30-maailma-24.sh` (Fablen käynnistämä, pid 90221,
   24 yhteyttä, ~39 Mt/s), tila `dem-lataus/glo30-maailma.seuranta` (VALMIS/KESKEN-rivi lopussa), loki
   `glo30-maailma.log`. Kohde NAS `…/Matkakirja-arkisto/dem/copernicus-glo30` (26 450 ruutua / 589,1 GB).
   **Eheystarkistus VALMIS-rivin jälkeen** (skripti tekee: määrä + koko listaa `glo30-maailma-list.txt` vasten;
   varmista myös `find … -name '.tmp.*'` = 0) → rivi Fablelle. KESKEN → aja sama skripti uudelleen (idempotentti).
   Klo 19.24: 8 009 / 26 450, 262 GB.
2. **Ajokansio ajo-20260925 NAS:iin** (`pyramidi-poltto/nas-ajo-20260925.sh`, rsync --remove-source-files, hidas;
   19.41 jäljellä 5,9 Gt) → sitten myös `ajo-20260925{b,c}-nostot`, `kerma-2026-09-25`, `maakunnat-2026-09-25a` NAS:iin.

## AVOIMET PR:t

#3235 ankkurit FRA · #3102 raportti nimet · #3105 Liberation Serif polttoon · #3108 satelliittityökalu
(worktree `wt/karttaseppa-yovalot`) · #3117 aluenimet kuvaus. Mergetty tänään: #3160 #3182 #3203 #3216 (#3214 suljettu).

## AVOIMET ASIAT

- astro-pallo-puhelin 43 (linssin sävy ei muuta pintaa) ja 47b (navalla beigeä) — vanhoja, selvittämättä.
- ±180°-sauma (Fablen lista) ja web GRC/JPN-täyttö (Fablen lista) — tarkista Fablelta tarkempi kuvaus.
- Z10 kattavuuslistalla ja z11/z12-maastosarja koko maailman GLO-30:stä myöhemmin (arvio Fablelle:
  ~19 milj. laattaa, ~95 Gt, laskenta ~8–14 h; vienti pullonkaula → rinnakkainen vienti tai rajaus).
- `tools/tee-pallokerma.mjs` kovakoodaa `lahde`-tekstin 23a-pohjaksi (korjattu luetteloihin käsin) → lippu `--pohjanimi`.
- savuke-nostoklikkaus kaatuu mainissa `mouse.click: x: expected float` (ennestään).
- Maakuntien seutunimet (PHL, AZE, BFA, SVN) NE:n kielellä — Sisältökirjuri voi suomentaa `js/packs/maakunnat-nimet.js`.
