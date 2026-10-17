# Natiivisepän aloitusviesti (17.10.2026 klo 21.5x; luovutus -20261017-ilta)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 6339b1aec = BUILD 199, Unity 6000.7.0b5), juna 200 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-200 ed0654c54, LUKITUS KESKEN).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261017-ilta.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna200/jono-200.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. Lukituskäännös ed0654c54 (L2, alkoi 21.52): tarkista lokit/kaannospalvelu/20261017-215224-ed0654c54-l2.log viimeinen rivi. KÄÄNNETTY → lukitse200-b.sh (komento luovutuksessa)
   → BUILD 200 -sha JU:lle (TF) + PT:lle. Kuollut → JU:n KÄÄNNÖS NYT ja lukitse200-ajo.sh uudelleen.
2. Mac 200: mac200.sh ed0654c54 JU:n TF NYT:llä → TF-ajo → JU + PT.
3. Juna 201 -runko BUILD 200:sta, kun PT pyytää; keskeneräiset (pyramidi v2, pienoismallit, taistelukoe) sinne PT:n kuittauksella.
4. Unity-beetaseuranta CronCreate "4 9 * * *" (unity-julkaisut.py).

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä (lukituskäännös L2:lla). Vain automaattitestit junaan. Agentit vain Opus/Sonnet.
- Ei yhdistämistä runkoon testiajon aikana. Ei poistoja omistajan/PT:n luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
