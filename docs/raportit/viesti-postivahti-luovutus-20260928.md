# Postivahdin luovutusraportti (28.9.2026 klo 12:57, 74 %:ssa)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream `origin/postivahti` — ÄLÄ pullaa claude/postilaatikko-haaraa vahingossa).
2. Lue `docs/raportit/tilataulu.md` kokonaan — ajan tasalla klo 12:5x.
3. Aja normaali kierto heti ja jatka `ScheduleWakeup`-ketjulla ~10 min välein.

## Session id:t (28.9. tilinvaihdon 07:0x jälkeiset, voimassa)

Päätoimittaja (ent. Fable) local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 · Julkaisija local_24e63224-112c-449a-b6a3-e10e4ed43f4b · Natiiviseppä local_fcc10552-5810-49bf-b0cf-188456f1231c (Matkakirja-3d-selvittaja) · Natiivi-UI local_c6d63773-0270-4873-96f8-63c66cf52794 · Linssiseppä local_7a457b99-7ecd-4634-93a0-0c02b53e8d24 · Sisältökirjuri local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708 · Laitetestaaja local_36a45147-8407-4cfb-bbdb-c20d5f684735 · Siirtoseppä local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 · Pelikoodari local_11aca9cd-eda6-4db9-9019-8a153c8b8795 · Karttaseppä local_16f80454-5b30-4180-ae9b-8c6d1edb6779.

**HUOM: Fablen session nimi on nyt Päätoimittaja (Opus, xhigh)** — sama id, "Fable" ohjeissa = Päätoimittaja.

Päätoimittaja lähettää sinulle aloitusviestin session-nollauksen jälkeen (uusi Postivahti-id tulee sitä kautta).

## Normaali kierto (10 min välein)

1. `get_usage` itsellesi + kaikille 10 roolisessiolle. **Konteksti ≥70% (ei koske Päätoimittajaa/itseäsi)** → ilmoita Päätoimittajalle rivillä. Moni rooli nollaa itsensä automaattisesti pian ylityksen jälkeen. **Oma kontekstisi:** kun lähestyt 70-75%, kirjoita luovutus (kuten tämä) + päivitä tilataulu, pushaa, ja `clear_session self` samassa vuorossa (Päätoimittaja voi myös pyytää tätä suoraan viestillä).
2. `sh .postivahti.sh` — uudet postilaatikkoviestit (ei-Fable/Päätoimittaja-tiedostot) → ilmoita Päätoimittajalle yhdellä rivillä.
3. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = kunnossa, exit 1 on normaali grep-tulos).
4. **Levy:** `df -h /System/Volumes/Data`, raja **80 Gt**. Levy on heilahdellut voimakkaasti tänään (70–146 Gi) juna-käännösten/pallopolton DerivedData-käytön takia — normaalia, seuraa trendiä.
5. **Muistipaine:** `sysctl kern.memorystatus_vm_pressure_level` — 1=normal, 2=warn, 4=critical → ilmoitus Päätoimittajalle jos ≥2.
6. `df -h /Volumes/NAS-Homes` (raja 500 Gt), simulaattorit `xcrun simctl list devices booted`.
7. **KUORMAVALVONTA (voimassa oleva tila, päivitetty 12:43 — LUE HUOLELLISESTI, muuttunut moneen kertaan tänään):**
   - Omistaja vapautti koneen klo 12:43 — puolikas-kuorma-sääntö (kuorma1≤8) PÄÄTTYI.
   - **load1/uptime EI ole luotettava mittari** (sisältää omistajan oman käytön + I/O-odotuksen + taskpolicy -b -jonotuksen) — älä käytä sitä ensisijaisena hälytysperusteena.
   - Nyt voimassa: raskaat työt nice 15 -prioriteetilla täysillä ytimillä sallittuja.
   - **Valvo vain: simulaattoreita ≤ 1 booted päivällä, Mac-savukkeita ≤ 2 rinnakkain.**
   - Jos `/tmp/matkakirja-kevyt` palaa päälle (omistaja tarvitsee konetta uudelleen), palataan tiukempaan valvontaan: simulaattorit 0, ei GPU-raskaita prosesseja (`chrome-headless --use-angle=metal`, `xcrun simctl booted`, `Unity -batchmode` ilman `-nographics`) — poikkeamasta yksi rivi omistavalle roolille.
   - GPU-ohjelmavalvonta (Capture One tms.) on PERUTTU — omistaja pitää ne aina auki, ilmoittaa itse.
8. Juna: `tail /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`. Juna-vahti on havainnut ja korjannut useita jumeja itse tänään (Unity-puu tapetaan automaattisesti) — ei toimenpidettä ellei toistu usein.
9. `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` (tyhjä = kunnossa).
10. coreaudiod (>200% 2 min → `sudo killall coreaudiod`), Chrome-GPU `type=gpu-process` (>4 → Julkaisijalle, ei Päätoimittajalle).
11. **Lokisiivous-kandidaatit:** `find /Users/Shared/Claude/proto-3d/lokit -maxdepth 1 -type d -mtime +2` + `.app -mtime +1`. Ilmoita Päätoimittajalle kerran vrk TAI kun yhteensä >5 Gt.
12. **Effort-tarkistus:** `get_session` 7 Opus-roolille — jos effort>high eikä nimessä sulkulisäystä, tai nimessä lisäys vaikka high → ilmoita Päätoimittajalle.
13. Päivitä `docs/raportit/tilataulu.md` ja pushaa haaraan `postivahti`.
14. Ilmoita Päätoimittajalle **vain aidoista muutoksista/ylityksistä** — ei kuittauksia jos ei muutosta.
15. `ScheduleWakeup` ~10 min, ketjuta AINA (kiristä 3-5 min:iin jos hälytys aktiivinen).

## Pysyvät säännöt

- **JUMI → PÄÄTOIMITTAJA:** jumissa oleva rooli viestii Päätoimittajalle, ei tee korttia omistajalle.
- **Viestiraja:** SendMessage ~10/vuoro; kun rajoittuu, käytä VÄLITTÖMÄSTI `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id) — tätä tarvitaan usein, harkitse käyttää sitä suoraan jos edellisellä kierroksella tuli raja vastaan.
- **coreaudiod-huolto:** `sudo killall coreaudiod` sallittu suoraan (>200% CPU 2 min).
- **Postivahti EI KOSKAAN poista tiedostoja itse.** Vain listaus + ilmoitus.
- **Kellonaika:** aja `date` ennen mitään kelloa sisältävää tekstiä, älä arvaa.
- **Aikavyöhyke:** get_usage `resetsAt` on UTC. EEST = UTC+3.

## Tila luovutushetkellä (12:57)

- Kaikki 10 roolia + Päätoimittaja tilinvaihdon (07:0x) jälkeisillä session id:llä.
- Konteksti-tilanne 12:5x: useat roolit ylittäneet tai lähellä 70%: tarkista tuoreimmalla get_usage-kierroksella.
- Levy heilahdellut voimakkaasti tänään, nyt ~145 Gi vapaana, ei hälytystä.
- Kuormavalvonta muuttunut moneen kertaan tänään (load1-sekaannus klo 11 aikaan selvitetty ja korjattu, puolikas-sääntö päättyi 12:43) — ks. osio 7 yllä lopullinen tila.
- Juna toiminut normaalisti, muutama itsekorjautunut jumi.
- Ei avoimia jumeja tai kortteja omistajalle.
- Täysi historia päätöksistä: `docs/raportit/tilataulu.md` git-loki (haara `postivahti`).

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla ~10 min välein normaaliin tapaan.
