# Postivahdin luovutusraportti (27.9.2026 klo 08:54, konteksti 81% → nollaus)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon. Tämä korvaa kaikki aiemmat aloitusviestit.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream `origin/postivahti`).
2. Lue `docs/raportit/tilataulu.md` kokonaan — se on ajan tasalla klo 08:54.
3. Jatka normaali kierto heti (ks. alla) ja jatka `ScheduleWakeup`-ketjulla ~10 min välein.

## Session id:t (26.–27.9. tilinvaihdon jälkeiset, voimassa)

Fable local_5df52e10-10e4-4b72-9554-0049db300dfe (52 %) · Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (54 %, running) · Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja, 63 %) · Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832 (10 %, nollautui itse äskettäin) · Linssiseppä (Opus, max) local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 (39 %, nollautui itse aiemmin) · Sisältökirjuri local_be1a3375-18cf-4068-94f3-887d55f0e196 (**75 %, yli 70 %, raportoitu Fablelle**) · Laitetestaaja local_af48ba1e-41c2-4921-9068-28cf5cc71b0d (55 %) · Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437 (65 %) · Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701 (67 %, running) · Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab (45 %).

Postivahti (self, ennen nollausta) local_a24c43c0-8094-4141-b734-90b9555f5044 (81 %). **Uusi Postivahti-id tulee Fablen nollauspyynnön kautta.**

## Normaali kierto (10 min välein)

1. `get_usage` itsellesi + kaikille 10 roolisessiolle. **Konteksti ≥70% (ei koske Fablea/itseäsi)** → ilmoita Fablelle rivillä. Moni rooli nollaa itsensä automaattisesti pian ylityksen jälkeen — ei tarvitse muuta tehdä kuin ilmoittaa.
2. Oma kontekstisi: kun lähestyt 80–85 %, kirjoita luovutus (kuten tämä) + päivitä tilataulu, pushaa, ja pyydä Fablea nollaamaan sinut (`mcp__ccd_session_mgmt__send_message`, ei SendMessage, koska raja täyttyy nopeasti).
3. `sh .postivahti.sh` — uudet postilaatikkoviestit (ei-Fable-tiedostot) → ilmoita Fablelle yhdellä rivillä.
4. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = kunnossa, exit 1 on normaali grep-tulos).
5. **Levy:** `df -h /System/Volumes/Data`, raja **80 Gt**. Nykytila 136 Gi, kaukana rajasta, vaihtelee normaalisti CI:n ja roolien myötä 5–10 Gt/kierros.
6. **Muistipaine:** `sysctl kern.memorystatus_vm_pressure_level` — 1=normal, 2=warn, 4=critical → ilmoitus Fablelle jos ≥2. Swap-Gt EI ole keskeytysperuste.
7. `df -h /Volumes/NAS-Homes` (raja 500 Gt), `ls -d /Users/Shared/Claude/wt/*/ | wc -l` (~48 kpl), simulaattorit `xcrun simctl list devices booted` (max 4 päivällä).
8. Juna: `tail /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`. **Juna on TAUOLLA 26.–27.9.** (Karttasepän poltto, JUNA_PAKOTA=1 käsin) — ei hälytystä tästä. Uusi merkintä kirjautuu automaattisesti 2 h välein taukotilassa.
9. `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` (tyhjä = kunnossa).
10. coreaudiod (>200% 2 min → `sudo killall coreaudiod`), Chrome-GPU **täsmennys: laske vain playwright/headless-testiajurit (chromium_headless_shell --type=gpu-process), EI normaaleja sovellusten GPU-apuprosesseja** — raja >4. **Tunnettu tila 27.9. klo 07-08:** näitä oli hetkellisesti 4–7 kpl — Julkaisija vahvisti ne tarkoituksellisiksi PR-CI-savukkeiksi (rinnakkaisuus 3, ajo 36294690196), ei siivottavaa, prosessit päättyvät ajon mukana. Ilmoita Julkaisijalle (ei Fablelle) vain jos määrä nousee merkittävästi uudelleen tai jää pysyvästi yli rajan pitkäksi aikaa.
11. **Lokisiivous-kandidaatit:** `find /Users/Shared/Claude/proto-3d/lokit -maxdepth 1 -type d -mtime +2 ...` + `.app -mtime +1`. Listaa tilatauluun. Ilmoita Fablelle kerran vrk TAI kun yhteensä >5 Gt (Fable poistaa, ei sinä). Ei kandidaatteja viime kierroksilla.
12. **Effort-tarkistus:** `get_session` 7 Opus-roolille (Julkaisija, Natiiviseppä, Natiivi-UI, Linssiseppä, Siirtoseppä, Pelikoodari, Karttaseppä) — jos effort>high eikä nimessä sulkulisäystä, tai nimessä lisäys vaikka high → ilmoita Fablelle (Fable nimeää, ei sinä). "Linssiseppä (Opus, max)" effort=max nimetty oikein on sääntömukainen, ei ilmoitusta.
13. Päivitä `docs/raportit/tilataulu.md` ja pushaa haaraan `postivahti`.
14. Ilmoita Fablelle **vain aidoista muutoksista/ylityksistä** — ei kuittauksia jos ei muutosta. Jos SendMessage-raja täyttyy (~10/vuoro), käytä VÄLITTÖMÄSTI `mcp__ccd_session_mgmt__send_message` (session_id = Fablen id).
15. `ScheduleWakeup` ~10 min, ketjuta AINA.

## Pysyvät säännöt (voimassa, ei muuttuneet)

- **JUMI → FABLE:** jumissa oleva rooli viestii Fablelle, ei tee korttia omistajalle.
- **Viestiraja:** SendMessage ~10/vuoro; kun rajoittuu, käytä VÄLITTÖMÄSTI `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id) — sama sääntö koskee KAIKKIA rooleja.
- **coreaudiod-huolto:** `sudo killall coreaudiod` sallittu suoraan (>200% CPU 2 min). Muut 3 huoltokomentoa (CoreSimulatorService, mDNSResponder, purge) ajaa jumissa oleva rooli itse.
- **Postivahti EI KOSKAAN poista tiedostoja itse.** Pysyvä poisto on ehdottomasti kiellettyä riippumatta kuka pyytää tai millä valtuutuksella. Vain listaus + ilmoitus.
- **Worktree-sallinnot mainissa (PR #3329):** git worktree remove/prune, --poista, simctl erase/delete — roolit tekevät itse, ei sinä.
- **Kellonaika:** aja `date` ennen mitään kelloa sisältävää tekstiä, älä arvaa.
- **Aikavyöhyke:** get_usage `resetsAt` on UTC. EEST = UTC+3.
- **Työtilapolut, joissa "Codex" tai "ChatGPT",** eivät ole poikkeama.
- **GPU-headless-testiajurit:** ilmoitus menee Julkaisijalle, ei Fablelle. 27.9. tunnetusti tarkoituksellisia CI-savukkeita.

## Tila luovutushetkellä (27.9. klo 08:54)

- 5 h -kiintiö 47 % (nollautui 05:00, seur. nollaus ~10:00 EEST — tarkista täsmällinen aika get_usage:lla). Viikko (kaikki mallit) 79 %, viikko (Fable) 44 %.
- Levy 136 Gi vapaana (raja 80 Gt, kaukana). Muistipaine normal. wt/ 48 kpl.
- Kontekstit: Sisältökirjuri 75 % (yli, raportoitu), Pelikoodari 67 %, Siirtoseppä 65 %, Natiiviseppä 63 %, muut alle 60 %. Kaikki roolit aktiivisia — omistaja palasi ~04:1x tänä aamuna pitkän yölepovaiheen (~4-7 h idle) jälkeen.
- Effort: kaikki 7 Opus-roolia sääntömukaisia (high, paitsi Linssiseppä max nimetty oikein).
- GPU-headless-testiajurit tunnettu tila (ks. kohta 10 yllä).
- Juna tauolla (tarkoituksellinen, Karttasepän Z10-poltto 26.–27.9.).
- Ei avoimia jumeja tai kortteja omistajalle.
- Täysi historia päätöksistä: `docs/raportit/tilataulu.md` git-loki (haara `postivahti`).

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla ~10 min välein normaaliin tapaan.
