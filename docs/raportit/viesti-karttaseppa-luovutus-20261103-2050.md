# Karttaseppä: luovutus 3.11.2026 klo 20.50 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-1940.md (PR 6209, AVOIN). Syy: konteksti 25 % (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/` (KS:n tarkistukset ja työkalut; python
`/opt/homebrew/opt/python@3.14/bin/python3` ilman -I:tä), C = `/Users/Shared/Claude/proto-3d/_tyo/codex/`,
OK = `/Users/Shared/Claude/proto-3d/_kirjasto/kartta-osat/`, VSK = `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/`.
Codex-posti: worktree /Users/Shared/Claude/wt/karttaseppa-postilaatikko → `git checkout --detach origin/claude/postilaatikko`,
commit, `git push origin HEAD:claude/postilaatikko`. Roolit EIVÄT viesti KK:lle; kaikki PT:n kautta.

## OMISTAJA kirjoitti suoraan KS:n ikkunaan (kaikki välitetty PT:lle sanatarkasti)
- 20.17 rakennusperiaate: mikä lukitaan ja missä oikaistaan → OK/RAKENNUSPERIAATE.md (5 lukittua, 8 oikaisua).
- 20.20 "nähtävyyksien koot saa olla niin paljon liioiteltuja kuin vain mahdollista."
- 20.2x Codex piirtää nähtävyyden lähiympäristöineen valmiin pohjan päälle, yläosa läpinäkyvä → OK/NAHTAVYYSALUE.md.
- 20.46 "Notre Dame on aivan liian pieni. Se pitää oikeasti liioitella niin paljon kuin mitenkään pystyy."
- 20.4x nähtävyydet saa kääntää katsojaa kohti: Notre-Damen kaksi tornia suoraan pelaajaan päin (RAKENNUSPERIAATE kohta 3).
- 20.4x "katsokaa mallia aiemmasta kodeksin piirtämästä kuvasta. Se oli muistaakseni nimeltään G." = C/pariisi-koko-kaupunki/
  pariisi-koko-kaupunki-G-tyyli.png (d0191a334, omistaja hyväksyi 31.10.). Siinä Notre-Dame noin 1 km leveä (6–9 ×),
  tornit katsojaan päin, katedraali koko saaren yli joen päälle; Louvre noin 2,5 ×, Eiffel noin 3 ×.

## TEHTY 19.41–20.50
1. Kulmaohje k1 (Codex 9e030a2ff): sävyt ok, kulma ja mitat eivät → Y/TARKISTUS-kulmaohje-k1.md; kirjastoon
   tyyli/isoisa-2029-kulmaohje-k1 + data/isoisa-2029-savyt-k1 (koekaytto). KK LUKITSI 60° (VS yv2 8167ec39f; mallikuva
   VSK/kulmapohja/mallikuva-60-{3x,1x}.png: 3,81|1,27 px/m, korkeus 2,200|0,733 px/m). Seinille VS:n keskitie.
2. A2 erä 1 (tilaus e6c244857 + muutokset fbc13796b, 69acfd068; toimitus 6e70ffcb7) → Y/TARKISTUS-a2-era1.md, kuittaus
   badbc7c2e: puu hyväksytty (koekäyttö; EI vielä kirjastossa), kortteli ja julkisivu uusintaan (KK:n lupa pyydetty PT:ltä 20.40;
   ehdotus raportissa: talot 8–16 m kiinni toisissaan 6 krs, julkisivu yksi nauha alfa 0).
3. Nähtävyysalue Notre-Dame #1928 (tilaus 0db841f56, toimitus 028196d21) → Y/TARKISTUS-nahtavyysalue-notre-dame.md, kuittaus
   dc509c2e3: tapa toimii, mutta kuvasuhde ei säilynyt (generaattori 789 × 1994) ja liian pieni. Suunta (tornit katsojaan) OIKEA.

## AVOIN (järjestyksessä)
1. **Notre-Damen k2 (omistajan sanalla, ei KK-korttia):** odota VS:n pohjaa VSK/nahtavyysalue-notre-dame/k2/ (pyydetty 20.5x:
   1536 × 1024, 0,635 px/m, keskipiste 48.8545 / 2.3499, maski Seine Pont Neuf–Pont de Sully + Cité + Saint-Louis + rannat
   noin 150 m, Louvre ja Hôtel de Ville mustana). Sitten tilaus C/pariisi-nahtavyysalue-notre-dame-20261103/k2/: koko kuten G
   (noin 1 km leveä, tornit suoraan katsojaan, tasakattoiset tornit, saa peittää joen ja Sainte-Chapellen), kuva TÄSMÄLLEEN
   1536 × 1024 (generaattorin natiivikoko), koko valkoinen maski täyteen; G-kuva ja #1925:n Notre-Dame
   (C/pariisi-ylaviisto-a2-20261103/_review-a2-era1/esine-notre-dame-60.png) liioittelun malleiksi. Tarkista Y/tarkista-nahtavyysalue.py:llä.
2. A2 kortteli/julkisivu k2: vasta KK:n luvalla (PT välittää).
3. Taustaajot (Monitor-vahti umpeutuu 30 min välein, aseta uudelleen): tasankoketju pid 41502 (81/144 shardia 19.41) ja
   esittelypaikat pid 41504 (Overpass 502/504). Jatkotyöt kuten 19.40-luovutuksen AVOIN 4–5.
4. Vanhat 19.40-luovutuksesta: v7/v8 iso-pari (JU), pitkät ruudut (seuraava mittaus).
