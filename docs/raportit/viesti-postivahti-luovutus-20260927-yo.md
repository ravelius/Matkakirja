# Postivahdin luovutusraportti (27.9.2026 klo 00:4x, konteksti 84% → nollaus)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon. Tämä korvaa kaikki aiemmat aloitusviestit.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream `origin/postivahti`).
2. Lue `docs/raportit/tilataulu.md` kokonaan.
3. **KESKEN OLEVA TEHTÄVÄ (hoida ensin):** Fable käynnisti oman nollauksensa n. klo 00:3x. Tein 5 tarkistusyritystä (60 s välein) `get_usage local_5df52e10-10e4-4b72-9554-0049db300dfe` — sessio pysyi koko ajan `status: unavailable` (ei käynnissä olevaa prosessia), nollaus ei siis vahvistunut minun aikanani. **Tarkista tilanne heti:** jos konteksti nyt alle 10 % ja status "ok", lähetä Fablelle `mcp__ccd_session_mgmt__send_message`: "Olet Fable, lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-fable-aloitus.md, jatka. Jos sait vanhoja viesteja ennen tata, ne on jo kasitelty." Jos yhä unavailable, jatka tarkistuksia ~60 s välein muutaman kierroksen ajan, sitten jatka normaalia kiertoa siitä huolimatta.

## Session id:t (26.–27.9. tilinvaihdon jälkeiset, voimassa)

Fable local_5df52e10-10e4-4b72-9554-0049db300dfe (**omassa nollauksessaan, ei vahvistunut — ks. yllä**) · Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (43 %) · Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja, 41 %) · Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832 (19 %) · Linssiseppä (Opus, max) local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 (69 %) · Sisältökirjuri local_be1a3375-18cf-4068-94f3-887d55f0e196 (68 %) · Laitetestaaja local_af48ba1e-41c2-4921-9068-28cf5cc71b0d (47 %) · Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437 (64 %) · Pelikoodari local_7fcab04b-864c-4ec2-98bd-46e171326701 (**84 %, yli 70 % — ilmoitettu Fablelle 00:02, ei vielä kuitattu koska Fable nollautuu**) · Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab (30 %).

Kaikki kontekstiprosentit viimeksi mitattu ~00:27–00:39. Uusi Fable lähettää sinulle aloitusviestin session-nollauksen jälkeen (uusi Postivahti-id tulee sitä kautta) — ellei se ole jo lähettänyt, koska Fablen oma nollaus oli kesken kun luovuin.

## Normaali kierto (10 min välein)

1. `get_usage` itsellesi + kaikille 10 roolisessiolle. **Konteksti ≥70% (ei koske Fablea/itseäsi)** → ilmoita Fablelle rivillä. Moni rooli nollaa itsensä automaattisesti pian ylityksen jälkeen — ei tarvitse muuta tehdä kuin ilmoittaa.
2. Oma kontekstisi: kun lähestyt 85–90 %, kirjoita luovutus (kuten tämä) + päivitä tilataulu, pushaa, ja pyydä Fablea nollaamaan sinut.
3. `sh .postivahti.sh` — uudet postilaatikkoviestit (ei-Fable-tiedostot) → ilmoita Fablelle yhdellä rivillä.
4. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = kunnossa, exit 1 on normaali grep-tulos). **Skripti on korjattu (#3335+#3337) — Codex/ChatGPT-polut eivät enää näy poikkeamana.**
5. **Levy:** `df -h /System/Volumes/Data`. **UUSI RAJA (Fable 26.9. klo 21:3x): ilmoita Fablelle heti kun vapaa < 100 Gt** (ei enää 80 Gt — levy heilahtelee, ei tasainen lasku, poltto vie vain ~1 Gt). Nykytila ~143 Gt, kaukana rajasta.
6. **Muistipaine:** `sysctl kern.memorystatus_vm_pressure_level` — 1=normal, 2=warn, 4=critical → ilmoitus Fablelle jos ≥2. Swap-Gt EI ole keskeytysperuste.
7. `df -h /Volumes/NAS-Homes` (raja 500 Gt), `ls -d /Users/Shared/Claude/wt/*/ | wc -l` (~39 kpl), simulaattorit `xcrun simctl list devices booted` (max 4 päivällä).
8. Juna: `tail /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`. **Juna on TAUOLLA 26.–27.9.** (Karttasepän poltto, JUNA_PAKOTA=1 käsin) — ei hälytystä tästä.
9. `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` (tyhjä = kunnossa).
10. coreaudiod (>200% 2 min → `sudo killall coreaudiod`), Chrome-GPU **täsmennys: laske vain playwright/headless-testiajurit (chromium_headless_shell --type=gpu-process), EI normaaleja sovellusten GPU-apuprosesseja (Claude/ChatGPT/Adobe/Spark/Chrome/Unity Hub)** — raja >4, ilmoitus Julkaisijalle, ei Fablelle.
11. **Lokisiivous-kandidaatit:** `find /Users/Shared/Claude/proto-3d/lokit -maxdepth 1 -type d -mtime +2 ...` + `.app -mtime +1`. Listaa tilatauluun. Ilmoita Fablelle kerran vrk TAI kun yhteensä >5 Gt (Fable poistaa, ei sinä). Ei kandidaatteja viime kierroksilla.
12. **Effort-tarkistus:** `get_session` 7 Opus-roolille — jos effort>high eikä nimessä sulkulisäystä, tai nimessä lisäys vaikka high → ilmoita Fablelle. **Huom: "Linssiseppä (Opus, max)" effort=max nimetty oikein on sääntömukainen, ei ilmoitusta.**
13. Päivitä `docs/raportit/tilataulu.md` ja pushaa haaraan `postivahti`.
14. Ilmoita Fablelle **vain aidoista muutoksista/ylityksistä** — ei kuittauksia jos ei muutosta.
15. `ScheduleWakeup` ~10 min, ketjuta AINA.

## Pysyvät säännöt (voimassa, ei muuttuneet)

- **JUMI → FABLE:** jumissa oleva rooli viestii Fablelle, ei tee korttia omistajalle.
- **Viestiraja:** SendMessage ~10/vuoro; kun rajoittuu, käytä VÄLITTÖMÄSTI `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id).
- **coreaudiod-huolto:** `sudo killall coreaudiod` sallittu suoraan (>200% CPU 2 min). Muut 3 huoltokomentoa ajaa jumissa oleva rooli itse.
- **Postivahti EI KOSKAAN poista tiedostoja itse.** Pysyvä poisto ehdottomasti kiellettyä riippumatta kuka pyytää tai millä valtuutuksella. Vain listaus + ilmoitus.
- **Worktree-sallinnot mainissa (PR #3329):** git worktree remove/prune, --poista, simctl erase/delete — roolit tekevät itse, ei sinä.
- **Kellonaika:** aja `date` ennen mitään kelloa sisältävää tekstiä, älä arvaa.
- **Aikavyöhyke:** get_usage `resetsAt` on UTC. EEST = UTC+3.
- **Työtilapolut, joissa "Codex" tai "ChatGPT",** eivät ole poikkeama — vahvistettu skriptillä (ks. kohta 4 yllä).

## Tila luovutushetkellä (27.9. klo 00:4x)

- 5 h -kiintiö ~13 % (nollautui 00:00 EEST, seur. nollaus 05:00 EEST). Viikko (kaikki mallit) 58 %, viikko (Fable) 37 %.
- Levy ~143 Gt vapaana (uusi 100 Gt -raja, kaukana). Muistipaine normal. wt/ ~39 kpl.
- **Pelikoodari 84 % — ilmoitettu Fablelle 00:02, ei kuitattu koska Fable nollautuu samaan aikaan. Tarkista onko yhä yli 70 % ja seuraa.**
- **Fablen oma nollaus kesken/vahvistamaton — hoida ensimmäisenä tehtävänä (ks. yllä).**
- Muut roolit kunnossa, ei muita ylityksiä havaittu viimeisellä kierroksella.
- Ei avoimia jumeja tai kortteja omistajalle.
- Täysi historia päätöksistä: `docs/raportit/tilataulu.md` git-loki (haara `postivahti`).

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla ~10 min välein normaaliin tapaan.
