# Natiivisepän aloitusviesti (15.10.2026 klo 22.1x; luovutus -20261015-yo)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 64e1efcd1 = BUILD 195, Unity 6000.7.0b5), juna 196 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-196 6708dfa92).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261015-yo.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna196/jono-196.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. HETI: omistajan päätös 22.05 – rungossa 196 kytkimet PÄÄLLE (NIMET, kohdevalikon uusi ulkoasu, skannerin taivastila, paras hetki + nimen korostus);
   kohokohdat ja tulivuoret kiinni. Yksi commit + `zsh juna196/testit196.sh` run_in_backgroundilla + rivi PT:lle (luovutus: SEURAAVA ASKEL).
2. Juna 196 kertyy: yhdistä vain PT:n kuittaamat (toisen roolin "PT kuittasi" → vahvista PT:ltä). Lukitus vasta omistajan pyynnöstä.
3. BUILD 195: iOS TF Julkaisijalla, Mac TF SUCCESS. Unity-beetaseuranta: CronCreate "4 9 * * *" + aja unity-julkaisut.py kerran.

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä. Ei testiajoja junaan (omistaja 09.36). Agentit vain Opus/Sonnet.
- Ei poistoja omistajan luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
