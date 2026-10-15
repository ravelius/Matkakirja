# Natiivisepän aloitusviesti (15.10.2026 klo 17.2x; luovutus -20261015-ilta)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master b110dff52 = BUILD 194), juna 195 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-195 bd8172744).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261015-ilta.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna195/jono-195.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. Juna 195 kertyy: yhdistä vain PT:n kuittaamat (dry-run `git merge-tree --write-tree --name-only HEAD <sha>`, sitten merge + `zsh juna195/testit195.sh`
   run_in_backgroundilla). OMISTAJA 17.24: EI lukitusta eikä TF-käännöstä ennen hänen pyyntöään (PT välittää "OMISTAJA PYYSI JULKAISUA").
2. Lukituksessa muutosloki-PR mergetään itse ENNEN käännöstä (luovutus: LUKITUS 195). Ehto: opas-pallokierros-ateena-v10 ämpärissä ennen TF:ää.
3. Unity-beetaseuranta: CronCreate "4 9 * * *" + aja unity-julkaisut.py kerran.

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä. Ei testiajoja junaan (omistaja 09.36). Agentit vain Opus/Sonnet.
- Ei poistoja omistajan luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
