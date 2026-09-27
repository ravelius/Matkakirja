# Postivahdin luovutusraportti — TILINVAIHTO (27.9.2026 klo 11:2x, viikkokiintiö 93 %)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon. Tämä on TILINVAIHTO-luovutus (ei tavallinen kontekstinollaus): koko työryhmä (Fable + kaikki roolisessiot) vaihtaa tilille, koska viikkokiintiö (kaikki mallit) saavutti 93 % klo 11:23. Tämä korvaa kaikki aiemmat aloitusviestit.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream `origin/postivahti`).
2. Lue `docs/raportit/tilataulu.md` kokonaan — päivitetty klo 11:2x, viikkokiintiö-tilanne ajan tasalla.
3. **Uudet session id:t tulevat uudelta tililtä.** Fable lähettää sinulle päivitetyt session id:t (mahdollisesti uusi Postivahti-id myös itsellesi) tilinvaihdon jälkeen — käytä niitä, älä vanhoja tässä tiedostossa lueteltuja.
4. Jatka normaali kierto heti (ks. alla) ja jatka `ScheduleWakeup`-ketjulla ~10 min välein.

## Vanhat session id:t (27.9. klo 11:2x, VANHENTUVAT tilinvaihdossa — vain viitteeksi luovutuksiin)

Fable local_5df52e10-10e4-4b72-9554-0049db300dfe (69%) · Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (62%) · Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja, 70%) · Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832 (48%) · Linssiseppä (Opus, max) local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 (74%) · Sisältökirjuri local_be1a3375-18cf-4068-94f3-887d55f0e196 (34%) · Laitetestaaja local_af48ba1e-41c2-4921-9068-28cf5cc71b0d (57%) · Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437 (72%) · Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701 (62%) · Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab (52%).

Postivahti (self, ennen tilinvaihtoa) local_a24c43c0-8094-4141-b734-90b9555f5044 (32%).

**Odota Fablen viestiä uusista session id:istä ennen kuin lähetät ensimmäisen SendMessagen uudella tilillä.**

## Normaali kierto (10 min välein) — ei muuttunut

1. `get_usage` itsellesi + kaikille roolisessioille. **Konteksti ≥70% (ei koske Fablea/itseäsi)** → ilmoita Fablelle rivillä.
2. Oma kontekstisi: kun lähestyt 80–85 %, kirjoita luovutus + päivitä tilataulu, pushaa, pyydä Fablea nollaamaan sinut.
3. `sh .postivahti.sh` — uudet postilaatikkoviestit → ilmoita Fablelle yhdellä rivillä.
4. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = kunnossa).
5. **Levy:** `df -h /System/Volumes/Data`, raja **80 Gt**.
6. **Muistipaine:** `sysctl kern.memorystatus_vm_pressure_level` — ≥2 → ilmoitus Fablelle.
7. `df -h /Volumes/NAS-Homes` (raja 500 Gt), `ls -d /Users/Shared/Claude/wt/*/ | wc -l`, simulaattorit (max 4 päivällä).
8. Juna: `tail /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`. Tauolla 26.–27.9. (Karttasepän poltto) — ei hälytystä.
9. `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` (tyhjä = kunnossa; 09:03-tapaus ratkaistu 09:04, harmiton).
10. coreaudiod (>200% 2 min → `sudo killall coreaudiod`), Chrome-GPU-testiajurit (>4 → Julkaisijalle, ei Fablelle).
11. **Lokisiivous-kandidaatit:** listaa tilatauluun, ilmoita Fablelle kerran vrk tai >5 Gt.
12. **Effort-tarkistus:** 7 Opus-roolia `high`; Linssiseppä `max` nimetty oikein.
13. Päivitä `docs/raportit/tilataulu.md` ja pushaa haaraan `postivahti`.
14. Ilmoita Fablelle **vain aidoista muutoksista/ylityksistä**.
15. `ScheduleWakeup` ~10 min, ketjuta AINA.

## UUSI: Viikkokiintiön vahti (omistaja 09:4x, sitova — TÄRKEIN SÄÄNTÖ NYT)

Seuraa `viikko (all models)`-lukua **joka kierroksella**, kaikkien roolien get_usage-vastauksista (sama luku kaikilla, plan-tasoinen).
- **≥93 %** → ilmoita Fablelle heti (ennakkovaroitus). **TEHTY 11:23, kuitattu Fablen toimesta 11:2x.**
- **≥95 %** → ilmoita Fablelle heti (UUSI kynnys, Fable pyysi 11:2x tilinvaihdon aikana).
- **≥97 %** → ilmoita Fablelle rivillä **"VIIKKO 97 — tilinvaihto"**. Fable pysäyttää kaikki sessiot ja kirjoittaa siirtopromptin.

Viikkokiintiö oli 93 % klo 11:23 ja nousi ~1pp/12min viime kierroksilla — 97 % voi tulla nopeasti (~30–50 min). **Tarkista tämä ENSIMMÄISENÄ joka kierroksella**, ennen muita tarkistuksia.

## Pysyvät säännöt (voimassa, ei muuttuneet)

- **JUMI → FABLE:** jumissa oleva rooli viestii Fablelle, ei tee korttia omistajalle.
- **Viestiraja:** SendMessage ~10/vuoro; kun rajoittuu, käytä VÄLITTÖMÄSTI `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan uusi local_-id tilinvaihdon jälkeen).
- **coreaudiod-huolto:** `sudo killall coreaudiod` sallittu suoraan (>200% CPU 2 min).
- **Postivahti EI KOSKAAN poista tiedostoja itse.**
- **Worktree-sallinnot mainissa (PR #3329):** roolit tekevät itse.
- **Kellonaika:** aja `date` ennen mitään kelloa sisältävää tekstiä.
- **Aikavyöhyke:** get_usage `resetsAt` on UTC. EEST = UTC+3.
- Työtilapolut joissa "Codex" tai "ChatGPT" eivät ole poikkeama.
- GPU-headless-testiajurit → Julkaisijalle, ei Fablelle.

## Tila luovutushetkellä (27.9. klo 11:2x, viikkokiintiö 93 %)

- 5 h -kiintiö 25 % (nollautui 10:00 EEST, seur. ~15:00 EEST). Viikko (all models) **93 %** — ennakkovaroitus annettu. Viikko (Fable) 48 %.
- Levy 132 Gi vapaana (raja 80 Gt, kaukana). Muistipaine normal. wt/ 61 kpl.
- Kontekstit ennen tilinvaihtoa: Linssiseppä 74 %, Siirtoseppä 72 %, Natiiviseppä 70 % (kaikki yli 70 %, raportoitu Fablelle), muut alle 70 %.
- Varmuuskopiovika (09:03) ratkaistu 09:04, harmiton (samanaikainen push).
- Ei avoimia jumeja tai kortteja omistajalle.
- Täysi historia päätöksistä: `docs/raportit/tilataulu.md` git-loki (haara `postivahti`).

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla ~10 min välein normaaliin tapaan, uusilla session id:llä heti kun Fable ne toimittaa.
