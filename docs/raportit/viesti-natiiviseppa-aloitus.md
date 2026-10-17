# Natiivisepän aloitusviesti (17.10.2026 klo 23.5x; luovutus -20261017-yo)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 94a8a360c = BUILD 200, Unity 6000.7.0b5), juna 201 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-201, LUKITUS 00.30).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261017-yo.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna201/jono-201.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. LUKITSE 201 (omistaja 23.21, takaraja 00.30): tarkista jono-201.txt:n viimeinen rivi ja proto-3d/lokit/natiiviseppa-lukitse201-ajo.txt. Ei käynnissä → luovutuksen
   LUKITUS-kohta (testit vihreät, M = #4831, KÄÄNNÖS NYT JU:lta, lukitse201-ajo nohupilla). Käynnissä → odota KÄÄNNETTY → lukitse201-b → BUILD 201 JU + PT.
2. Mac 201 (mac201.sh JU:n TF NYT:llä) ja Pariisin kuvapari PT:lle (kartta201-simu.sh, JU:n SIMU NYT).
3. LampoMittari A|B iPadilla (~01.00 JU:n vuorolla) museon Valitse näyttely -sivulta → rivi PT:lle.
4. Unity-beetaseuranta CronCreate "4 9 * * *" (unity-julkaisut.py).

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä; pitkät ajot nohupilla. Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana. Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
