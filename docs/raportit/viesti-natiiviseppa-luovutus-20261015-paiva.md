# Natiivisepän luovutus 15.10.2026 klo 11.5x (tilinvaihto, Postivahdin pyyntö)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
(päivitetty 15.10.: muutosloki lukituksessa, TF-portin muistiajo, os.replace ja +x). Jonot: natiiviseppa-skriptit/juna193/jono-193.txt (KAIKKI tapahtumat
SHA:ineen; lopusta alkuun = uusin tila), juna192/jono-192.txt (eilisilta + yö). Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md
(send_message): PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd, Julkaisija = local_22b29f10-…, PK = local_97810d35-…, NUI = local_33ba1387-…,
Valoseppä = local_fc4fcc54-…, LS1 = local_45a869de-…. Keskustelukanavalle (local_593b89a1) roolit EIVÄT viesti. PT:lle ≤ 3 riviä.

## TILA

- **BUILD 192 julkaistu** (OMISTAJA PYYSI JULKAISUA 15.10. 01.11 + 09.36 "Ei testejä junaan"): proto master **117c2ae5b** (juna/b20 = runko 2ba2606bf,
  lukituskäännös 97c3b5237 L1 10.42), muutosloki #4610 mergetty ennen käännöstä (M e2040cf78), Mac 1.1 (192) TF-ajo 38700692256 SUCCESS, iOS TF
  sisäisillä 10.54 (Julkaisija). Skanneri päällä (IssSkanneri.Kaytossa = true, omistaja hyväksyi ulkoasun 10.4x). Ei muisti-/simuajoja lukituksessa;
  välikooste 12a9351f5 mitattiin yöllä: Pariisi iPad Pro 13 4364 Mt / vapaa 755 / 4 varoitusta vs 190 4363 / 756 / 11 → /Users/Shared/Claude/julkaisija-tyokalut/muistiajo-192.txt.
- Aiemmin tänä yönä: BUILD 190 = 190f19f4d (Mac TF 38613368005), BUILD 191 = 64728a1f5 (Mac TF 38626009349), master-välicommit b9facfcb2 (todistusajo +x).
- **Juna 193 -runko** natiiviseppa/juna-193 (wt/proto-natiiviseppa-ehdokas) = **db5abdf0e**, testit vihreät 1843/586/492, tarkista 0, PT kuittasi.
  Sisältö BUILD 192:n päälle: LS2 vesi-varadata-194 6406b2f9d (Tower Bridgen kummut pois), LS2 kuu-tele-194 708b1ae60, LS2 vesi-v24-194 5e699a463 (Prahan vesi).
  **EI lukitusta** ennen "OMISTAJA PYYSI JULKAISUA" (PT 11.5x). Seuraavaksi tulossa: LS1 Ranskan museo.
- Testit: `zsh juna193/testit193.sh` run_in_backgroundilla (kirjaa nyt FAIL-rivien nimet; peili peili/proto/natiiviseppa/juna-193).
  Editorikoodi: `zsh tyokalut/kaanna-editori.sh Assets/Matkakirja/Editor/AsetteluTesti*.cs` (partial-luokka – oletus kääntää vain yhden tiedoston → väärät virheet).

## LUKITUS 193 (kun omistaja pyytää)

Kopioi juna192/lukitse192-{a,b,ajo}.sh, mac192.sh ja build192-viesti.txt → juna193 (sed 192→193, juna/b20→juna/b21, master 64728a1f5→117c2ae5b,
pyyntörivi). Järjestys (PT 15.10. 00.0x, pysyvä): 1) muutosloki ≤ 280 mrk / ≤ 3 lausetta → PR (tools/uusi-worktree.sh natiiviseppa muutosloki-193,
`node tools/vienti/muutosloki-natiivi.mjs --versio "1.1 (193)" …`) → **merge itse** (`gh pr merge N --squash`) ENNEN käännöstä → M-SHA Julkaisijalle;
2) KÄÄNNÖS NYT → lukitse193-a (PROTO_LINJA Julkaisijan mukaan) → lukitse193-b → BUILD-SHA Julkaisijalle; 3) mac193.sh <BUILD> + `gh run watch`;
4) asemataulu talo/eteneminen (ArtifactData get → update if_version, ts = date +%s000). Muistiajo: Pariisi A/B (juna192/pariisi192.sh pohjaksi) ellei
omistaja sano "ilman testejä"; tulos /Users/Shared/Claude/julkaisija-tyokalut/muistiajo-193.txt (1. rivi OK/EI-MUISTILISAYSTA/OHITETTU + peruste).

## AUKI

- **Laitekierros (PT 15.10. 00.1x):** iPadilla trailerin fps (tavoite 60; simussa 35 → 47–48 fps, juna192/traileri192.sh) ja aloituslogon alareunan
  viivat (Clamp; simussa ei toistu, juna192/logo192.sh) → TULOS-rivi PT:lle. Myös ISS-kertojan PCM-puheen jälkeen-mittaus (alkaako klipin alusta, PK e4b75d6cc).
  Ei tehty, koska omistaja: "Ei testejä junaan" 192:lle. Kysy PT:ltä, ajetaanko 193:n laitekierroksella.
- Skannerin kirjoitusääni vaihtuu ämpärissä samalla nimellä (media.matkakirja.app/aanet/cupola/skanneri/v2/, OhjaamonAanet.cs:18–32): ei käännöstä; välimuisti voi viivästää.
- Valaan äänitiedostot audio/efekti-raketti-valas-{parskahdys,roiske}.mp3 Äänittäjältä (puuttuessa hiljaa).
- Unity-beetaseuranta: CronCreate "4 9 * * *" on istuntokohtainen → luo uudelleen + aja unity-julkaisut.py kerran (15.10. 09.04: ei uutta).

## OPITUT 14.–15.10. (sitovia)

- **os.replace pudottaa +x:n**: suoritettavalle `shutil.copymode(p, tmp)` ennen vaihtoa; tarkista `git diff --summary` (ei "mode change"). 14.10. todistusajo.sh 755→644 → korjattu b9facfcb2/37a5cbb10.
- **zsh: `$T:A…` on modifier** → käytä `"${T}:polku"` git show -kutsuissa.
- **Haara ⊃ kuittaamaton commit** (PK aarteet ⊃ kamera 92783317f): cherry-pick vain kuitattu commit (-x), koko haara myöhemmin kuittauksella.
- **Ehdollinen kuittaus** (skanneri lepotilaan): tarkista ehto koodista ennen yhdistystä (14.10. kytkin puuttui → palautettu PK:lle).
- **Revert vs reset rungossa**: jos muut ovat rakentaneet rungon päälle, peru revertillä; palautus = revert-of-revert + korjaus.
- **Saapumistraileri**: Lontoolla ei avauskuvia → `ui traileri pariisi`. Simun Unity-käynnistys hidas: aloituslogo näkyy vasta ~8–14 s.
- **Sonnet-apuagentit** skenaarioiden laatimiseen toimivat (traileri-fps-192.txt, pulu-kaak-192.txt); oletetut UI-luokat voivat antaa vääriä PUUTE-rivejä.
- Levysiivous: omat .app-kopiot → T7 natiiviseppa-arkisto/lokit-<pvm>/ (rsync + diff -rq, sitten poisto). DerivedDataa ei poisteta (ei oma).

## TYÖTILAT

wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-193, puhdas), wt/proto-natiiviseppa-tyokalut (natiiviseppa/todistusajo-kuittaus 37a5cbb10, YHTEINEN
todistusajon polku – ei poisteta), wt/proto-natiiviseppa-unity67 (symlinkki T7:lle). Haara natiiviseppa/intro-fps-192 talteen (mergetty 192:een).
