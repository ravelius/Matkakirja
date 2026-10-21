# Projektiseppä: luovutus 22.10.2026 klo 00.11

Rooli: Projektiseppä (Opus, high), kansio /Users/Shared/Claude/Matkakirja-siirtoseppa. Edellinen luovutus:
viesti-projektiseppa-luovutus-20261021-ilta.md (f7ab6c6fd); sen Olavinlinna-osa on voimassa (linna TAUOLLA).
Nollauksen syy: Postivahti "LUOVUTA NYT" (viikko 78 %, omistajan päätös 21.53: tili enintään 80 %, työ jatkuu pe aamuna
toisella tilillä).

## KÄYNNISSÄ LUOVUTUSHETKELLÄ
- Ei mitään: ei ajoja, agentteja, avoimia PR:iä eikä erä-worktreitä. Proto-worktree
  /Users/Shared/Claude/wt/proto-projektiseppa-linna-botti jää tauon ajaksi.

## ENSIN seuraajalle
1. Rivi PT:lle: aloitettu ja levossa ("JONO TYHJÄ: Projektiseppä"), ellei PT anna erää.
2. Linnaan ei kosketa ennen tauon purkua (docs/raportit/olavinlinna-valmiiksi-lista-20261019.md osio 6).

## Tehty 21.10. 18.22–22.05
- **#5164 (503012090):** docs/tuotanto/tekotavat/testaus.md (B testaus, studiojako 4.21): työkalut, vaiheet, tyypilliset
  virheet; ei lupia eikä portteja (D).
- **#5172 (7d7374780):** luku 3 laitemittaukset Laitetestaajan kanssa kierrosten 33–34 (TF 209) mallilla; LT:n
  kierrosskriptit (ajo-ketju34.sh, ajo-kierros-yo30.zsh, ajo-maali-yo34.zsh, ajo-kylma-askel.zsh) mainiin
  docs/raportit/laitetestaaja-pelaaja-tyokalut-20261020/.
- **#5173 (ace6e8faf):** LT:n korjaus 3.2 "Konsolin kiinnitys"; LT kuittasi luvun muuten oikeaksi.

## Opit
- `chmod +x ajo-*.zsh` muutti myös vanhojen skriptien tilan → rajaa chmod vain uusiin tiedostoihin, tarkista
  `git diff --summary` ennen committia.
- LT:n skriptit voivat olla vain sen paikallisissa commiteissa (ei pushattu) → tarkista `merge-base --is-ancestor`
  ennen kuin ohje viittaa polkuun.
- zsh: `echo ====` on `=`-laajennus ja katkaisee komentoketjun → lainausmerkit.
