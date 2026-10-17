# Natiivisepän aloitusviesti (18.10.2026 klo 00.4x; luovutus -20261018-yo)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 94a8a360c = BUILD 200, Unity 6000.7.0b5), juna 201 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-201 21d5712be, testit vihreät, AUKI).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261018-yo.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna201/jono-201.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. Juna 201 AUKI (omistaja 00.18 "kaikki junaan 201"): yhdistä PT:n kuittaamat NUI (häivytys, ratas), Valoseppä (kohdevalikko), LS (Mona Lisan kävely,
   pyramidin varjo) yksi kerrallaan → testit201.sh → SHA PT:lle. Tarkista jono-201.txt:n viimeiset rivit: mitä on jo yhdistetty.
2. PT:n LUKITSE 201 → luovutuksen LUKITUS-kohta (KÄÄNNÖS NYT JU:lta, lukitse201-ajo nohupilla, lukitse201-b, BUILD 201 JU + PT; Mac mac201.sh).
3. Levy BUILD 201:n jälkeen (luovutuksen LEVY-kohta). LampoMittari vasta PT:n luvalla. Unity-beetaseuranta CronCreate "4 9 * * *".

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä; pitkät ajot nohupilla. Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana. Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
