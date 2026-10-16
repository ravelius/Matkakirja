# Natiivisepän aloitusviesti (16.10.2026 klo 09.1x; luovutus -20261016-aamu)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus, session id osoitekirjassa /Users/Shared/Claude/osoitekirja.md.
Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto
(master 64e1efcd1 = BUILD 195, Unity 6000.7.0b5), juna 196 -runko wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-196 2f731c677).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261016-aamu.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna196/jono-196.txt (lopusta alkuun: uusin tila).
Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-10e4-4b72-9554-0049db300dfe), PT:lle ≤ 3 riviä.

## KÄRKI
1. HETI: aja `zsh juna196/testit196.sh` (run_in_background) rungolle 2f731c677 ja rivi PT:lle (edellinen vihreä 53b46a16e).
   Sitten yhdistä PT:n 09.1x kuittaama karttaseppa/maasto-normaalit-196 b8167585d (neliöt pois) ja aja testit uudelleen.
2. Juna 196 kertyy: yhdistä vain PT:n kuittaamat (toisen roolin "PT kuittasi" → vahvista PT:ltä), `git log HEAD..<sha>` ensin.
   Lukitus VAIN PT:n "LUKITSE 196" (omistaja pyysi julkaisua 00.31, "Ei testejä"; muistiajo ohitettu).
3. Juna 197 -jono kertyy (juna197/jono-197.txt); runko 197 vasta 196:n lukituksen jälkeen. Unity-beetaseuranta: CronCreate "4 9 * * *".

## SÄÄNNÖT
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä (myös toisen roolin Mac-käännöspyyntö). Ei testiajoja junaan (omistaja 09.36). Agentit vain Opus/Sonnet.
- Ei poistoja omistajan luvatta oman työtilan ulkopuolelta. Aikaleimat date-komennolla. Suoritettavat tiedostot: shutil.copymode ennen os.replace.
