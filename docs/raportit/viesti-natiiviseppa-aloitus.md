# Natiivisepän aloitusviesti (19.10.2026 yö; luovutus -20261019-yo)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 766aa47fa = BUILD 206 v1, TF peruttu; Unity 6000.7.0b5), juna 206 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-206 cd7c1d5cb, EI testattu).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261019-yo.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna206/jono-206.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta, PT:lle ≤ 3 riviä.

## KÄRKI
1. Muistiajon 206 tulos (lokit/natiiviseppa-muisti206-20261019-2134/ajo.log) → PT; puuttuu → aja uudelleen (luovutus, kohta ENSIN).
2. Juna 206 avattu, EI takarajaa (omistaja 21.38): testit206.sh rungolle cd7c1d5cb ENSIN; sitten PK sisäpiha + VS lattia f152ad7d1 PT:n OK:lla → testit → sha PT:lle + JU:lle, kuvaparit KK:lle.
3. Muutosloki 206 uusi teksti PT:ltä → korjaus-PR + merge itse. LUKITSE 206 vasta kun omistaja pyytää julkaisua (KK → PT): juna206/lukitse206-*.sh + mac206.sh.

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä; pitkät ajot taustalla. Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana; tarkista.sh aina yhdistyksen jälkeen. Ei poistoja oman työtilan ulkopuolelta.
  Aikaleimat date-komennolla. Kuorma korkea → yksi testisarja kerrallaan.
