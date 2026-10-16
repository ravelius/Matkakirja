# Natiivisepän aloitusviesti (16.10.2026 klo 22.2x; luovutus -20261016-ilta)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master cbf1d288b = BUILD 196, Unity 6000.7.0b5), juna 197 -runko wt/proto-natiiviseppa-juna197 (natiiviseppa/juna-197 4b6ef2395), juna 198 -haara natiiviseppa/juna-198.
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261016-ilta.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna197/jono-197.txt ja juna198/jono-198.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. Juna 197 (runko 4b6ef2395 vihreä): odottaa NUI museo-nimeä vain PT:n erillisellä ok:lla; lukitus VAIN PT:n "LUKITSE 197".
   Valmistele lukitse197-*.sh, mac197.sh, build197-viesti.txt juna196-skripteistä; muutosloki 197 PT:n kuittaamana ennen lukituskäännöstä.
2. Juna 198 kertyy (juna198/jono-198.txt): yhdistä vain PT:n kuittaamat, `git log HEAD..<sha>` ensin; kerro poikkeamat PT:lle.
3. Unity-beetaseuranta: CronCreate "4 9 * * *" (unity-julkaisut.py).

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä (lukituskäännös L2:lla). Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
