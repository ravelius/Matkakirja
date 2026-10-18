# Natiivisepän aloitusviesti (18.10.2026 iltapäivä; luovutus -20261018-iltapaiva)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md (TILINVAIHTO 18.10.: kaikki id:t uusia).
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master cef176edc = BUILD 201 + VS, Unity 6000.7.0b5), juna 202 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-202 267e602d2, vihreä, OMISTAJA PYYSI JULKAISUA 13.32).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261018-iltapaiva.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna202/jono-202.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629), PT:lle ≤ 3 riviä.

## KÄRKI
1. NUI aloituslogo 2b944e920: yhdistä vasta simutodiste + KK + PT:n kuittaus → testit202.sh → YKSI junakäännös JU:lta (NUI logo + LR Big Ben samasta).
2. Muutosloki #4875 päivitys logon jälkeen (≤ 3 lausetta / 280 mrk) → PT kuittaa.
3. LUKITSE 202 PT:n viestistä: juna202/lukitse202-*.sh + mac202.sh (täytä build202-viesti.txt + muutosloki-202.txt ensin). Unity-beetaseuranta CronCreate "4 9 * * *".

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä; pitkät ajot nohupilla. Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana; tarkista.sh aina yhdistyksen jälkeen. Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta.
  Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
