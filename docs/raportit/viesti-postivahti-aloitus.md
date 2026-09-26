# Postivahdin aloitusviesti (kirjoitettu 26.9.2026 klo 17:2x, konteksti 90 % → nollaus)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon. Tämä korvaa kaikki aiemmat aloitusviestit.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream on asetettu `origin/postivahti` — ÄLÄ pullaa claude/postilaatikko-haaraa vahingossa).
2. Lue `docs/raportit/tilataulu.md` kokonaan — se on ajan tasalla klo 17:2x.
3. Aja normaali kierros heti (ks. alla) ja jatka `ScheduleWakeup`-ketjulla ~10 min välein.

## Session id:t (26.9. tilinvaihdon jälkeiset, voimassa)

Fable local_5df52e10-10e4-4b72-9554-0049db300dfe · Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 · Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) · Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832 · Linssiseppä local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 · Sisältökirjuri local_be1a3375-18cf-4068-94f3-887d55f0e196 · Laitetestaaja local_af48ba1e-41c2-4921-9068-28cf5cc71b0d · Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437 · Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701 · Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab.

Fable lähettää sinulle aloitusviestin session-nollauksen jälkeen (uusi Postivahti-id tulee sitä kautta).

## Normaali kierros (10 min välein)

1. `get_usage` itsellesi + kaikille 10 roolisessiolle. **Konteksti ≥70% (ei koske Fablea/itseäsi)** → ilmoita Fablelle rivillä. Moni rooli nollaa itsensä automaattisesti pian ylityksen jälkeen — ei tarvitse muuta tehdä kuin ilmoittaa.
2. Oma kontekstisi: kun lähestyt 85–90 %, kirjoita luovutus (kuten tämä) + päivitä tilataulu, pushaa, ja pyydä Fablea nollaamaan sinut (Fable käynnistää `clear_session self` -pyynnön, tai voit itse pyytää sitä Fablelta).
3. `sh .postivahti.sh` — uudet postilaatikkoviestit (ei-Fable-tiedostot) → ilmoita Fablelle yhdellä rivillä.
4. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = kunnossa, exit 1 on normaali grep-tulos).
5. **Levy:** `df -h /System/Volumes/Data`, raja **80 Gt** (Karttasepän oma vahti hoitaa kriittiset 78/75 Gt -tasot polton osalta — ei enää "KESKEYTÄ POLTTO" -viestejä sinulta). Jos <80 Gt, harkitse `sudo purge` mutta se EI auttanut viimeksi (CoreSimulator-syy, ei välimuisti) — ilmoita Fablelle ensin.
6. **Muistipaine:** `sysctl kern.memorystatus_vm_pressure_level` — 1=normal, 2=warn, 4=critical → ilmoitus Fablelle jos ≥2. **Swap-Gt EI ole enää keskeytysperuste** (Fable 16:33, pysyvä muutos).
7. `df -h /Volumes/NAS-Homes` (raja 500 Gt), `ls -d /Users/Shared/Claude/wt/*/ | wc -l`, simulaattorit `xcrun simctl list devices booted` (max 4 päivällä).
8. Juna: `tail /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`. **Juna on TAUOLLA 26.–27.9.** (Karttasepän poltto, JUNA_PAKOTA=1 käsin) — ei hälytystä tästä.
9. `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` (tyhjä = kunnossa).
10. coreaudiod (>200% 2 min → `sudo killall coreaudiod`), Chrome-GPU `type=gpu-process` (>4 → Julkaisijalle, ei Fablelle).
11. **Lokisiivous-kandidaatit:** `find /Users/Shared/Claude/proto-3d/lokit -maxdepth 1 -type d -mtime +2 ... | xargs du -sh` + `.app -mtime +1`. Listaa tilatauluun. Ilmoita Fablelle kerran vrk TAI kun yhteensä >5 Gt (Fable poistaa, ei sinä).
12. **Effort-tarkistus:** `get_session` 7 Opus-roolille (Julkaisija, Natiiviseppä, Natiivi-UI, Linssiseppä, Siirtoseppä, Pelikoodari, Karttaseppä) — jos effort>high eikä nimessä sulkulisäystä, tai nimessä lisäys vaikka high → ilmoita Fablelle (Fable nimeää, ei sinä).
13. Päivitä `docs/raportit/tilataulu.md` ja pushaa haaraan `postivahti`.
14. Ilmoita Fablelle **vain aidoista muutoksista/ylityksistä** — ei kuittauksia jos ei muutosta.
15. `ScheduleWakeup` ~10 min, ketjuta AINA.

## Pysyvät säännöt (voimassa, ei muuttuneet)

- **JUMI → FABLE:** jumissa oleva rooli viestii Fablelle, ei tee korttia omistajalle.
- **Viestiraja:** SendMessage ~10/vuoro; kun rajoittuu, käytä VÄLITTÖMÄSTI `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id) — sama sääntö koskee KAIKKIA rooleja, lähetetty heille 15:40.
- **coreaudiod-huolto:** `sudo killall coreaudiod` sallittu suoraan (>200% CPU 2 min). Muut 3 huoltokomentoa (CoreSimulatorService, mDNSResponder, purge) ajaa jumissa oleva rooli itse.
- **Postivahti EI KOSKAAN poista tiedostoja itse.** Pysyvä poisto on ehdottomasti kiellettyä riippumatta kuka pyytää tai millä valtuutuksella. Vain listaus + ilmoitus.
- **Worktree-sallinnot mainissa (PR #3329):** git worktree remove/prune, --poista, simctl erase/delete — roolit tekevät itse, ei sinä.
- **Kellonaika:** aja `date` ennen mitään kelloa sisältävää tekstiä, älä arvaa.
- **Aikavyöhyke:** get_usage `resetsAt` on UTC. EEST = UTC+3.

## Tila luovutushetkellä (17:2x)

- Viikko (all models) 27 %, viikko (Fable) 20 %, 5 h 42 % (nollautui 14:00, seur. nollaus 18:59 EEST).
- Levy 170 Gt (siivousten jälkeen, hyvä puskuri). Muistipaine normal. wt/ 14 kpl.
- Kontekstit: Natiiviseppä 70 % (juuri ilmoitettu), Linssiseppä 67 %, Laitetestaaja 63 %, muut alle 40 % (moni nollattu tänään: Sisältökirjuri, Natiiviseppä [aiemmin], Natiivi-UI, Pelikoodari, Karttaseppä).
- Effort: kaikki 7 Opus-roolia `high`, ei nimipoikkeamia.
- Juna tauolla (tarkoituksellinen, Karttasepän poltto).
- Ei avoimia jumeja tai kortteja omistajalle.
- Täysi historia päätöksistä: `docs/raportit/tilataulu.md` git-loki (haara `postivahti`).

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla ~10 min välein normaaliin tapaan.
