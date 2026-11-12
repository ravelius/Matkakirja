# Karttaseppä: luovutus 3.11.2026 klo 21.32 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-2050.md (PR 6213, AVOIN). Syy: konteksti 26 % (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/` (tarkistukset ja työkalut; python
`/opt/homebrew/opt/python@3.14/bin/python3` ilman -I:tä), C = `/Users/Shared/Claude/proto-3d/_tyo/codex/`,
OK = `/Users/Shared/Claude/proto-3d/_kirjasto/kartta-osat/`, VSK = `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/`.
Codex-posti: worktree /Users/Shared/Claude/wt/karttaseppa-postilaatikko → `git fetch` + `git checkout --detach
origin/claude/postilaatikko`, posti/…md, commit, `git push origin HEAD:claude/postilaatikko`. Tulokset KK:lle AINA PT:n kautta.

## PÄÄTÖKSET 20.51–21.4x (kaikki toteutettu)
- Omistaja 20.51: OK/RAKENNUSPERIAATE.md HYVÄKSYTTY + KK:n tarkennus (kaupunginosien luonne automaattisesti aineistosta,
  ihminen korjaa). Kohta 3 muuttui kolmesti; NYKYINEN (KK 21.3x, omistaja 21.29 "Ei se voi noin mennä veden päälle",
  21.30 malli G-v4 = C/pariisi-laaja/pariisi-laaja-g-v4.png): **mikään nähtävyys ei mene veden päälle, joki näkyy
  kokonaan, liioittelu ylöspäin ja maalla, pää- ja rantakadun saa peittää** (Louvre/Rivoli/ranta, K4 hyväksytty).
- KK: värit 2029:ään koodilla kaikille nähtävyysalueille → OK/savysovitus-2029.py (turkoosi vesi → harmaanvihreä,
  siniset katot → harmaat, vihreä → oliivi, punertava → h 28, kylläisyys ×0,85) ja korttelipinnoille OK/varisiirto-2029.py
  (Lab-siirto viitteestä OK/isoisa-2029/tyyli/isoisa-2029-korttelirajaus-v1.jpg). Paletti
  OK/isoisa-2029/data/isoisa-2029-paletti-v1.json liitetään KAIKKIIN tilauksiin + kielto: ei veneitä/liikkuvia osia.
  Ohje OK/NAHTAVYYSALUE.md lopussa.

## TEHTY
1. A2 erä 1 k2 (kortteli + julkisivu; tilaus 85d668272, toimitus 5c07ab6c6, kuittaus 19fcee8db) → KK: molemmat
   KOEKÄYTTÖÖN (julkisivun alfa kynnystetään tuonnissa ≥ 200 → 255, < 16 → 0); kortteli ei lopulliseksi. Y/TARKISTUS-a2-era1-k2.md.
2. A2 kortteli k3 VS:n pohjan päälle (tilaus a491a4162, toimitus 08d145730, kuittaus c5a8cd63b): muoto oikein, ulkoasu
   tekstiilimäinen → värit sovitettu (Y/tarkistus-a2-k3/k3-siirto.png). Y/TARKISTUS-a2-k3.md.
3. Notre-Dame k2 (tilaus e758cbac4, toimitus b2a4425b6, kuittaus 5aa19b936): KK hyväksyi muodon/koon/asennon, värit
   sovitettu (Y/tarkistus-nd-k2/nd-k2-savy.png; rajaus Y/rajaa-nd-k2.py), mutta OMISTAJA HYLKÄSI: meni veden päälle.

## AVOIN (järjestyksessä)
1. **Notre-Dame k3 Codexilla** (tilaus e8493f157, aineisto C/pariisi-nahtavyysalue-notre-dame-20261103/k3/): uusi maski
   vain maa (Y/maski-nd-k3.py, VS:n vesimaski), G-v4:n mittasuhteet (julkisivu 200–260 px, korkeus ≈ 1,5 × leveys).
   Toimitus `k3/_review-notre-dame-k3/` (Monitor vahti, aseta uudelleen). Tarkista: (a) alfa vesimaskin
   `vesi-notre-dame-k3-60.png` päällä vain kapeina torneina, (b) rajaa-nd-k2.py-tyylinen siivous, (c) savysovitus-2029.py,
   (d) kuittaus Codexille, (e) kuvat PT:lle → KK → omistaja.
2. **A2 kortteli k4** (KK hyväksyi 21.4x): pohja pyydetty VS:ltä 21.3x → VSK/kortteli-a2-k4/pohja-kortteli-k4-60.png
   (1254 × 1254, 1,27 px/m, talot 8–20 m, 5–7 krs, katkeilevat rivit, sisäpihat, poikittaisharjat, savupiippurivit,
   mallina oikean korttelin muodot). Tilausluonnos VALMIS: C/pariisi-ylaviisto-a2-20261103/k4/TILAUS.md (2029-paletti,
   musteääriviivat, 2029-rajaus). Kun pohja tulee: kopioi pohja + json k4/:ään, poista LUONNOS-rivi, SHA256SUMS, posti.
   Tulos: varisiirto-2029.py → PT → KK ennen käyttöä.
3. Taustaajot (Monitor): tasankoketju pid 41502, esittelypaikat pid 41504 (Overpass 502/504). Jatkotyöt kuten 19.40-luovutuksen AVOIN 4–5.
4. Vanhat: v7/v8 iso-pari (JU), pitkät ruudut (seuraava mittaus).
