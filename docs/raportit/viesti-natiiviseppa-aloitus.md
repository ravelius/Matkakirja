# Natiivisepän aloitusviesti (20.10.2026 yö; luovutus -20261020-yo)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 82e263c79 = BUILD 206, TF käynnissä; Unity 6000.7.0b5), juna 207 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-207 63713c20d, testit irrotettuna).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261020-yo.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna207/jono-207.txt ja juna206/jono-206.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta, PT:lle ≤ 3 riviä.

## KÄRKI
1. Mac 206 irrotettu ajo: lokit/natiiviseppa-mac206.log → "TF-AJO <id>" JU:lle (tai VIKA JU + PT).
2. Juna 207: testit207.sh-tulos (lokit/natiiviseppa-testit207-63713c20d.log) → sha PT:lle + JU:lle.
3. 207-erät vain PT:n OK-rivillä (VS seinät k4, LS Mona Lisa + askeleet odottavat KK:ta). iPad on LT:llä: älä ota ennen LT:n valmis-ilmoitusta.

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä; pitkät ajot taustalla (nollauksen yli: nohup). Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana; tarkista.sh aina yhdistyksen jälkeen. Ei poistoja oman työtilan ulkopuolelta.
  Aikaleimat date-komennolla. Kuorma korkea → yksi testisarja kerrallaan. Commit-viestit UTF-8 (ei `cut -c`).
