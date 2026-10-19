# Natiivisepän aloitusviesti (19.10.2026 yö; luovutus -20261019-yo)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 766aa47fa = BUILD 206 v1, TF peruttu; Unity 6000.7.0b5), juna 206 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-206 49cabfeb2, EI testattu).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261019-yo.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna206/jono-206.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta, PT:lle ≤ 3 riviä.

## KÄRKI
1. Muistiajon 206 tulos (lokit/natiiviseppa-muisti206-20261019-2134/ajo.log) → PT; puuttuu → aja uudelleen (luovutus, kohta ENSIN).
2. Juna 206 avattu (omistaja 21.32): PK kamera + sisäpiha + VS lattia PT:n OK:lla ~22.30 → testit206.sh → sha PT:lle + JU:lle.
3. Muutosloki 206 uusi teksti PT:ltä → korjaus-PR + merge itse. LUKITSE 206 (~23.00) vain PT:n viestistä: juna206/lukitse206-*.sh + mac206.sh.

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä; pitkät ajot taustalla. Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana; tarkista.sh aina yhdistyksen jälkeen. Ei poistoja oman työtilan ulkopuolelta.
  Aikaleimat date-komennolla. Kuorma korkea → yksi testisarja kerrallaan.
