# Natiivi-UI: luovutus 21.10.2026 klo 22.45 (viikkoraja 80 %, PT 22.3x)

Korvaa -20261020-1750:n. Historia: git log ja docs/raportit/viesti-natiivi-ui-luovutus-*.md. Id:t /Users/Shared/Claude/osoitekirja.md.
SIMU HARVOIN (Raamattu 9.11): automaattiset testit → NS runkoon → omistaja katsoo pelistä; simu vain JU:n vuorolla.

## TILA: JONO TYHJÄ, EI KESKENERÄISTÄ
- UI-periaatteet P2 P3 P7 P8 P10 (omistaja 21.10. 19.43–19.45, docs/tuotanto/tekotavat/ui.md luku 0): haara
  natiivi-ui/ui-periaatteet-210 6f8455f1a (proto-worktree /Users/Shared/Claude/wt/proto-natiivi-ui-ui-periaatteet-210,
  pohja natiiviseppa/juna-209 db65b8daa). PT kuittasi, annettu NS:lle junan 210 runkoon 22.44.
  - Mittari: `ui periaatteet [nimi]` (UI/UiPeriaatteet.cs) → Documents/ui-periaatteet[-nimi].json + lokirivi
    "ui-periaatteet: P3 … P7 … P8 … P10 …". Skenaario (22 näkymää × pysty/vaaka): scratchpadin yo-v.txt, kuvat
    proto-3d/lokit/todistus-yo-{u-ennen,v,z,k}-*-210-*.
  - Lopputulos: iPhone 44/44 (yo-z d2b23f5b0 + yo-k 6f8455f1a), iPad 44/44 (yo-v 8e4fdf7cf; viimeisiä kysymys/Tauko/otsikko-
    korjauksia ei ajettu iPadilla, PT: ei tarvita).
- Juna 209 (aiemmat erät, haara natiivi-ui/yhteiset-kortit-209): kaikki NS:llä/rungossa; NapinAlle 1a64d969c/e9903893d kierros 31.

## Odottaa (älä aloita ilman PT:tä)
- Juoksupelin kortit KorttiRunkoon vasta, kun PK:n 209m on hyväksytty (PT).
- Muut UI-periaatteet (P1, P4–P6, P9, P11, P12): ui.md luku 0; mittariin voi lisätä samaan UiPeriaatteet.Mittaa-silmukkaan.

## Opit (voimassa)
- Kysymyskortti on pohjavariantti (.mk-kysymys--pohja, Pohjat/Pinnat/visa.uss): Kysymys.uss:n välisäännöt jäävät pohjan alle →
  matalan vaa'an välit visa.uss:ään selektorilla .mk-kysymys--pohja.mk-kysymys--matala.
- USS max-height 86 % lasketaan himmennyksen täytteen sisältä (pienempi kuin 86 % turva-alueesta) → raja koodissa
  (KysymysNakyma.AsetaKorkeusraja).
- Aikajanan saaririvillä ⚙ ☰:n vieressä täyttää saaren oikean puolen: Tauko vuosiluvun riville (AsetaSaaririvi).
- Ajoitusriippuvat mittaukset (häivyttyvä otsikko): mittaa myös heti avauksen jälkeen (yo-k: 1 s, 5 s, 15 s).
- Käännöspalvelu tekee kääre-commitin (KÄÄNNETTY <kääre> <sha>): anna todistusajolle --sha kääreen SHA, muuten PUUTE 1.
- proto-worktree poistetaan `git -C <proto> worktree remove`, ei tools/uusi-worktree.sh --poista.
