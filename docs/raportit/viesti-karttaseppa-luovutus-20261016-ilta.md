# Karttasepän luovutus 16.10.2026 klo 19.2x (Postivahti: kova raja 36 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261016-yo.md` (4be4aa46e).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261016-ilta.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

## 1. AVOIN: Kiinan dynastiat -linssin rajat (PT:n tilaus 16.10. 18.5x), 4/18 vuotta

- Suunnitelma ja lähteet mergetty #4716 (f5433f200): `docs/suunnitelmat/linssi-kiinan-dynastiat.md` (18 avainvuotta, tarinarivit,
  värit, kotiseudut) ja `docs/raportit/kiinan-dynastiat-lahteet-20261016.md`. Cliopatria CC BY 4.0 vain vertailuun + krediitti;
  CHGIS (EULA) ja historical-basemaps (GPL) eivät pohjaksi.
- Haara `karttaseppa-kiinan-rajat` (worktree `/Users/Shared/Claude/wt/karttaseppa-kiinan-rajat`), viimeisin f0dac88cf: omat CC0-rajat
  221 eaa, 100 eaa, 1142, 1760 (`data/linssit/kiinan-dynastiat/rajat-*.geojson`, `tools/kiinan-dynastiat/`). EI PR:ää vielä.
- Työkansio T7 `Matkakirja-karttaseppa/kiinan-dynastiat/`: `skriptit/rajat.py` (kärkilistat, kommentit = ankkurit; aiempi alue voittaa
  → naapurin rajan voi piirtää yli), `piirra.py <vuodet> [--vertailu]`, `valikuva.py`, `viite/cliopatria-<v>.geojson` (19 vuotta
  poimittu, zip poistettu), `lahteet/ne/` (NE 50m), Python `venv-tyokalut/bin/python` (shapely, matplotlib). Kopioi muutokset
  haaraan (tools + data) ennen committia.
- Välikuva PT:llä omistajalle: `proto-3d/_tyo/karttaseppa/kiinan-dynastiat-20261016/valikuva-4-vuotta.jpg` (+ `*-vertailu.png`).
  PT:n korjaukset tehty (kehys 64°E, Tiibet 1760 protektoraattina pisteillä, Hexin vartiolinja). **Seuraava: omistajan palaute →
  loput 14 vuotta** (-200, 140, 250, 440, 500, 589, 669, 790, 950, 1100, 1280, 1421, 1644, 1873, + loppu 1912). Kotiseudut ja
  pääkaupungit ovat jo rajat.py:ssä. Lopuksi PR → PT.

## 2. AVOIN: OPAS_SALLITUT 7 pääkaupunkia, draft-PR #4713 (EI MERGETÄ)

- Monaco 3 km (PT rajasi), Bern 20, Belgrad 10, Zagreb 10, Bratislava 7, Tirana 7, Podgorica 3 km (7f6ed5c8d). Mittaus ja stillit
  `proto-3d/_tyo/karttaseppa/paakaupungit-3d-20261016/` (TULOS.md). Vaduz RAJA, Skopje/Chișinău/Minsk POIS → kehityskaupungeiksi.
- CI punainen tarkoituksella: `tests/opas-esittely.test.mjs` vaatii esittelyn aineistot.js:ään jokaiselle sallitulle. Sisältökirjuri
  tekee 7 oppaan esittelyä (PT tilasi); kohdelistat valmiina `.../paakaupungit-3d-20261016/kohteet.json` + KOHTEET.md (8/kaupunki).
  Kun Sisältökirjuri ilmoittaa esittelyt mainissa ja omistaja on hyväksynyt (omistaja 18.14 "Avataan, kun hyväksyn esittelyt"):
  rebase #4713 (worktree `/Users/Shared/Claude/wt/karttaseppa-sallitut-7`) → vihreä → ready → Julkaisijalle junaan 197.
  Katse_suunnat kohteissa ovat arvioita; korjaa, jos Sisältökirjuri pyytää.

## 3. Tämän vuoron valmiit (kuitattu PT:lle)

| Erä | Toimitus |
|---|---|
| Maailman maasto 2026-10-16-maailma (peruskartan neliöt) | Ajo kaatui 00.39 EPERM (edellisen session nollaus) → `--jatka`; 2 263 883 laattaa, pistokoe 40/40. Julkaisija vei 09.13 (42/42 CDN). b8167585d NS:lle junaan 196 |
| tee-maasto --jatka | PR #4693 mergetty 70e996a09 |
| Kierrosten hionta (maasto, maamerkit) | Oma osa valmis; kierrosten maa on Google 3D. Erekhtheionin ääriviiva → Linssiseppä (pienen rakennuksen tasainen pohja) |
| 11 pääkaupungin 3D-mittaus | 7 SALLITTU, Vaduz RAJA, 3 POIS (yllä) |
| Levysiivous | 2,5 Gi (app-kopiot, maastoworktree) |

## Muistiinpanot

- Pitkät ajot: setsid-kaava (muisti `pitkat-ajot-setsid-irrotus`); maastoajot jatkettaviksi `--jatka`.
- T7 levyllä tilaa ~75 Gi, sisäinen levy niukka: ei isoja latauksia ilman PT:tä.
