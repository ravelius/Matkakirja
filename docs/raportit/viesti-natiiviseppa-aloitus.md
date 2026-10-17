# Natiivisepän aloitusviesti (17.10.2026 klo 05.0x; luovutus -20261017-aamu)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master b2bc7aac0 = BUILD 197, Unity 6000.7.0b5), juna 198 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-198 60f4445d4).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261017-aamu.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna198/jono-198.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. Juna 198: tarkista 60f4445d4:n testitulos (aja testit198.sh, jos epäselvä) → vihreä sha PT:lle. Lukitus ~06.30 VAIN PT:n "LUKITSE 198":
   täytä build198-viesti.txt rivi 3, muutosloki 198 PT:n kuittaamana → main-PR → M; lukitse198-ajo.sh <runko> (L2) → lukitse198-b.sh → BUILD + M JU:lle; mac198.sh JU:n TF NYT:llä.
2. Yhdistä vain PT:n kuittaamat (`merge --no-ff --no-commit`, mode-tarkistus, sitten commit); kerro poikkeamat PT:lle.
3. Lukituksen jälkeen: todistusajo.sh tap-teksti -korjaus (luovutus); Unity-beetaseuranta CronCreate "4 9 * * *".

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä (lukituskäännös L2:lla). Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
