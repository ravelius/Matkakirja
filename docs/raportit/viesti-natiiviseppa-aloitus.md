# Natiivisepän aloitusviesti (18.10.2026 klo 08.35; luovutus -20261018-aamu)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md (TILINVAIHTO 18.10.: kaikki id:t uusia).
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 2ba609861 = BUILD 201, Unity 6000.7.0b5), juna 202 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-202 511a53249, testit vihreät, AUKI).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261018-aamu.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna202/jono-202.txt ja juna201/jono-201.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629), PT:lle ≤ 3 riviä.

## KÄRKI
1. Mac TF 201 ajo 39100405913 → tulos yhdellä rivillä PT:lle (iOS TF 201 on JU:n).
2. Juna 202: kuvakäännös 1 (511a53249) JU:lla, LR + NUI kuvaavat. Uudet erät vain PT:n kuittauksella → testit202.sh → sha PT:lle. LUKITSE 202 vain PT:n viestistä.
3. Levy TF 201:n jälkeen (luovutuksen LEVY-kohta). Unity-beetaseuranta CronCreate "4 9 * * *".

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä; pitkät ajot nohupilla. Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana; tarkista.sh aina yhdistyksen jälkeen. Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta.
  Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
