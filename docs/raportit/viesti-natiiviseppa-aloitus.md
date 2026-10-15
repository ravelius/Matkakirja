# Natiivisepän aloitusviesti (15.10.2026 klo 11.5x, tilinvaihto; luovutus -20261015-paiva)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 117c2ae5b = BUILD 192), juna 193 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-193 db5abdf0e).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261015-paiva.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna193/jono-193.txt (lopusta alkuun: uusin tila).
Viestit AINA send_messagella session id:llä (PT local_74630a27-8c1b-4ac3-9143-538efab8cbcd), PT:lle ≤ 3 riviä.

## KÄRKI
1. Juna 193 kertyy: yhdistä vain PT:n kuittaamat (dry-run `git merge-tree --write-tree --name-only HEAD <sha>`, sitten merge + `zsh juna193/testit193.sh`
   run_in_backgroundilla). Seuraavaksi LS1 Ranskan museo. EI lukitusta ennen "OMISTAJA PYYSI JULKAISUA".
2. Lukituksessa muutosloki-PR mergetään itse ENNEN käännöstä (luovutus: LUKITUS 193).
3. Auki: laitekierroksen TULOS-rivit (trailerin fps, logon alareuna, ISS-kertojan puhe) – kysy PT:ltä, ajetaanko.
4. Unity-beetaseuranta: CronCreate "4 9 * * *" + aja unity-julkaisut.py kerran.

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä. Mykistys ajon alkuun, ei ääntä Macin kaiuttimista. Agentit vain Opus/Sonnet.
- Ei poistoja omistajan luvatta oman työtilan ulkopuolelta; omat siirrot T7:lle natiiviseppa-arkisto/. Aikaleimat date-komennolla.
- Suoritettavat tiedostot: shutil.copymode ennen os.replace.
