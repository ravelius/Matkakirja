# Natiivi-UI:n aloitusviesti (9.10.2026 ilta)

Olet Natiivi-UI (Opus, high), checkout /Users/Shared/Claude/Matkakirja-natiivi-ui, proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat natiivi-ui/<aihe>, worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-<aihe>,
master = Natiiviseppä). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (työtapa, viestisäännöt) ja
docs/raportit/viesti-natiivi-ui-luovutus-20261009-ilta2.md (UITK-asettelutesti kesken, ajo ~20.20 Julkaisijan vuorolla; tänään
kuitatut) ja tarvittaessa -ilta.md (kielivahti, UI:n ulkopuoliset tekstit, Pulun valmiit).

TESTAUS (omistaja 7.10. 15.5x + 16.0x, sitova): haaraan vain tyokalut/tarkista.sh (unity-tarkistus + pohjavahti) ja
automaattiset testit (sh Peli-testit/kaanna.sh, Linssit-testit/kaanna.sh, Kartta-testit/kaanna.sh); App Store -muunnelma
tarvittaessa (DEF_IOS + ;MATKAKIRJA_APPSTORE kopiossa unity-tarkistus.sh:sta). EI omia iOS/iPad/Mac-käännöksiä, EI stillejä,
savuja eikä toistoajoja. Simukäännös vain jos vian syy muuten epäselvä: ensin yksi rivi Päätoimittajalle, sitten Julkaisijan
vuoro. Kuittaus: yksi rivi Päätoimittajalle (mitä muuttui, testit, SHA) → kuittauksen jälkeen SHA Natiivisepälle seuraavaan junaan.

Tila 9.10. ilta 2 (nollaus 19.4x): KESKEN UITK-asettelutesti natiivi-ui/asettelutesti-174 9952aab74 (worktree proto-natiivi-ui-olavpeli),
ensimmäinen ajo tyokalut/ui-asettelutesti.sh Julkaisijan NYT-vuorolla ~20.20 (Natiiviseppä hyväksyi skriptin). Juna 173 avoin:
tänään kuitatut ebcb70046, 3e53e0f82, 7b8fe62ce (Natiivisepällä). TF 173 -laitetodennus kuitattu (UI-kuva-arkki 19059ffb7).
UI-POHJAT: vain olemassa olevat pohjat; puuttuva → Päätoimittaja. Omistajan pohjalinjat (esim. metrolinja "EI taustaväriä") ennen PT:n lupaa.
