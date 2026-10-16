# Natiivi-UI: luovutus 17.10.2026 klo 01.40 (LEVYHÄTÄ: ei käännöksiä eikä simuja ennen PT:n lupaa)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0105:n jonon; -0105:n "Opit" ja "Muuta" ovat yhä voimassa.
Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-*.
Ajot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-<erä>.zsh <app-kansio> <udid> <iphone|ipad>
(iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962), app-kansiot proto-3d/_tyo/natiivi-ui/<erä>-app.
Käynnistä kukin simu VAIN Julkaisijan SIMU NYT -viestistä ja lähetä SIMU VAPAA perään.

## KÄÄNNÖSODOTTAJAT (kaikki Julkaisijan pysäyttämiä, TN; ÄLÄ käynnistä uudelleen, paikka säilyy)
| erä | sha | haara | simu |
|---|---|---|---|
| museo-kevyt-198 (+ museon nimi ei katkea kesken sanan, PT/LS) | a7327efa2 | natiivi-ui/museo-kevyt-198 | ajo-museo-kevyt-198 iPhone (M0 Rijksmuseum + Yövartio R1–R4) |
| iss-luettelo-198 + Cupolan nimet | e208d45fe | natiivi-ui/iss-luettelo-198 | ajo-iss-luettelo-198 iPad + iPhone |
| kamerapöytä-198 (agentin keskeneräinen työ viety loppuun) | 1ff45e88e | natiivi-ui/kamerapoyta-198 | ajo-kamerapoyta-198 iPad + iPhone |
| skanneri-viivat-198 (KS 158e90cd9 päällä) | 5c2cb709b | natiivi-ui/skanneri-viivat-198 | ajo-skanneri-viivat-198 iPhone (Kiova, Marseille, Bergen) |
| cupola-ohita2-197 (Ohita vasemmalle, pois Pulun päältä) | dc48eb887 | natiivi-ui/cupola-ohita-197 | ajo-cupola-ohita2-197 iPhone + iPad, 1 still → PT → KK |
| kehys-kaaro-198 (UUSI POHJA KEHYS-KÄÄRÖ) | 9365854c2 | natiivi-ui/kehys-kaaro-198 | ajo-kehys-kaaro-198 iPhone, VASTA 198-simujen jälkeen |

Kaikki kytkimet oletuksena pois (kamerapöytä, skannerin viivat) paitsi museo-kevyt (PT voi pyytää pois). Kuvat PT:lle ennen kytkentää.

## SIMUJONO (Julkaisijan järjestys): 1. lasipohja-197 iPhone (käännetty, lasipohja-197-app) → 2. yllä olevat käännöksen jälkeen.

## VALMIIT TÄSSÄ SESSIOSSA
- Cupola Ohita -video OK b38e4dbb4: lokit/todistus-cupola-ohita-iphone-197-20261017-0127 (PT:lle lähetetty; löydös Pulu → dc48eb887).
- Web PR #4762 (tyylikirja: pohja KEHYS-KÄÄRÖ) auki, Julkaisija mergeää vihreänä (PT kuittasi). Web-worktree natiivi-ui-kehys-kaaro
  → `tools/uusi-worktree.sh --poista natiivi-ui-kehys-kaaro` mergen jälkeen. Mergetyt iss-nimet ja lukija-valinnat poistettu.
- Levy: museo-kortit-197-app pois (0,56 Gt). _tyo/natiivi-ui: lasipohja-197, cupola-ohita-197, museo-nimi9-197 (KS).

## Opit
- Session nollaus tappaa run_in_background-odottajat → käynnistä käännösketjut nohupilla tiedostosta (ketjut-20261016/kaynnista-*.zsh).
- Edellinen agentti jätti työn committaamatta: tarkista worktreen `git status` ennen kuin päättelet, ettei agentti ehtinyt.
- cupola-ohita-197:n työpuussa tarkista.sh vaihtui 100644:ksi ajon aikana → `chmod +x` ennen committia (ei commitoitu muutosta).
