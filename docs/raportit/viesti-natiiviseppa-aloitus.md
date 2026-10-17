# Natiivisepän aloitusviesti (17.10.2026 klo 09.5x; luovutus -20261017-aamupaiva)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 6339b1aec = BUILD 199, Unity 6000.7.0b5), juna 200 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-200 003a238d1).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261017-aamupaiva.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna200/jono-200.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. Mac 1.1 (199) TF-ajo 39011025818: `gh run view 39011025818 --repo ravelius/Matkakirja --json conclusion` → tulos JU:lle ja PT:lle.
2. Juna 200: tarkista 003a238d1:n testitulos (aja juna200/testit200.sh, jos epäselvä) → vihreä sha PT:lle + maininta dc177cc58:sta (S2 v2g, kuitatun jatko).
3. Yhdistä vain PT:n kuittaamat (`merge --no-ff --no-commit`, mode-tarkistus, sitten commit). Lukitus 200 vain PT:n viestillä; työkalut juna199/:sta (ks. luovutus).
4. Unity-beetaseuranta CronCreate "4 9 * * *" (unity-julkaisut.py).

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä (lukituskäännös L2:lla). Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
