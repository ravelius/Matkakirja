# Postivahdin luovutusraportti (27.9.2026 klo 18:00, Fablen pyynnöstä 72 %:ssa — ei odotettu 80 %:iin)

Olet Postivahti. Lue CLAUDE.md ja tämä viesti kokonaan, jatka kiertoa suoraan — ei tarvitse kysyä omistajalta lupaa rutiinikiertoon. Tämä korvaa kaikki aiemmat aloitusviestit.

## Ensimmäinen kierros

1. `git fetch origin && git checkout postivahti && git pull` (upstream `origin/postivahti`).
2. Lue `docs/raportit/tilataulu.md` kokonaan — päivitetty klo 17:47.
3. Jatka normaali kierto heti (ks. alla) ja jatka `ScheduleWakeup`-ketjulla ~10 min välein.

## Session id:t (voimassa, uusi tili 27.9. klo 12.0x alkaen)

Fable local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (25 %, uudelleenkäynnistetty 17:2x) · Postivahti (self, ennen tätä luovutusta) local_63227b57-d045-4b93-ab52-cddc04e3b90f (72 %) · Julkaisija local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 (32 %) · Natiiviseppä local_04e2850b-d63c-481d-be73-c7d784a7cbcb (58 %) · Pelikoodari local_242febe9-d6cf-45ae-8280-faf394dc6e3e (36 %) · Natiivi-UI local_e9fdc695-8421-4c14-a187-8881e73c835a (25 %, nollasi itsensä 17:2x) · Linssiseppä (max) local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4 (30 %, nollasi itsensä 16:4x) · Siirtoseppä local_c264506b-dd61-4617-839f-23daf6d0bd5a (27 %) · Karttaseppä local_4bd7c316-55bc-423a-9da1-821fdd123cab (35 %) · Sisältökirjuri local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 (60 %) · Laitetestaaja local_3509b4ba-6000-4dea-869b-ecb22f4e3270 (76 % — YLI, ilmoitettu Fablelle 17:47, Fable käskenyt nollaukseen B13-savukierroksen jälkeen).

## Normaali kierto (10 min välein)

1. `get_usage` itsellesi + kaikille 10 roolisessiolle. **Konteksti ≥70% (roolit) / ≥65% (Fable)** → ilmoita Fablelle rivillä.
2. Oma kontekstisi: kun lähestyt 70–75 %, kirjoita luovutus (kuten tämä) + päivitä tilataulu, pushaa, ja pyydä Fablea nollaamaan sinut — **UUSI OHJE (Fable 17:5x): ei tarvitse odottaa 80 %:iin, tee luovutus jo ~70–75 %:ssa jos Fable pyytää.**
3. `sh .postivahti.sh` — uudet postilaatikkoviestit (ei-Fable-tiedostot) → ilmoita Fablelle yhdellä rivillä. Aktiivinen tänään: Codex↔Fable/Sisältökirjuri PR-kuittausvuo (miniatyyrit, historian hetket, tyyliuudistus) — normaali, ei toimenpidettä ellei uusi asia.
4. `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = kunnossa, exit 1 on normaali grep-tulos).
5. **Levy:** `df -h /System/Volumes/Data`, raja **80 Gt**. Puskuri oli 17 Gi klo 18:00 — **laskee tasaisesti koko iltapäivän (125→...→97 Gi 12:4x–17:5x välillä), suurin kasvaja `wt/` (40G) ja `proto-3d/lokit` (43G).** Swap tarkistettu 15:3x: 21,5 Gt varattu/20 Gt käytössä, ei kasva, ei ollut syy. Jos puskuri <15 Gi, nimeä suurin kasvaja Fablelle rivillä (`du -sh /Users/Shared/Claude/{wt,proto-3d/lokit,proto-3d/*} ~/Library/Developer/Xcode/DerivedData`).
6. **Muistipaine:** `sysctl kern.memorystatus_vm_pressure_level` — 1=normal, 2=warn, 4=critical → ilmoitus Fablelle jos ≥2. Ollut normal koko päivän.
7. `df -h /Volumes/NAS-Homes` (raja 500 Gt), `ls -d /Users/Shared/Claude/wt/*/ | wc -l` (56 kpl), simulaattorit `xcrun simctl list devices booted` (max 4 päivällä, 2 boottina: linssiseppa-iPhone, iPhone 17).
8. Juna: `tail /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log`. **Juna on TAUOLLA 26.–27.9.** (Karttasepän pallo-Z10-poltto, alkaa klo 22:00) — ei hälytystä tästä.
9. `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` (ratkaistu 09:04, harmiton samanaikainen push).
10. coreaudiod (>200% 2 min → `sudo killall coreaudiod`), Chrome-GPU-testiajurit (chromium_headless_shell, raja >4 → Julkaisijalle, ei Fablelle).
11. **Lokisiivous-kandidaatit:** ei kandidaatteja tällä hetkellä.
12. **Effort-tarkistus:** ei tehty tänään tilinvaihdon jälkeen — tarkista 7 Opus-roolin effort jos aikaa jää.
13. Päivitä `docs/raportit/tilataulu.md` ja pushaa haaraan `postivahti`.
14. Ilmoita Fablelle **vain aidoista muutoksista/ylityksistä** — ei kuittauksia jos ei muutosta. SendMessage-raja ~10/vuoro — käytä varakanavaa `mcp__ccd_session_mgmt__send_message` kun täynnä (tämä on tapahtunut useasti tänään).
15. `ScheduleWakeup` ~10 min, ketjuta AINA.

## Pysyvät säännöt (voimassa tänään, tarkistettu 12:0x–18:0x)

- **JUMI → FABLE:** jumissa oleva rooli viestii Fablelle, ei tee korttia omistajalle.
- **Viestiraja:** SendMessage ~10/vuoro; kun rajoittuu, käytä VÄLITTÖMÄSTI `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id).
- **coreaudiod-huolto:** `sudo killall coreaudiod` sallittu suoraan (>200% CPU 2 min).
- **Postivahti EI KOSKAAN poista tiedostoja itse.** Pysyvä poisto ehdottomasti kiellettyä riippumatta kuka pyytää.
- **Worktree-sallinnot mainissa (PR #3329):** roolit poistavat itse omat mergetyt worktreensä.
- **UUSI 12:5x (Fable): samireivinen-omisteiset (Codex-tili) tiedostot/worktreet EI poisteta eikä pyydetä rooleilta — ilmoitus menee Fablelle, poistopyyntö Codexille postilaatikon kautta.**
- **Konteksti-kynnykset (Fable 12.0x):** Fable ≥65 %, roolit ≥70 % → ilmoita Fablelle. Postivahti/self ei koske normaalisti, mutta 17:5x Fable pyysi luovutuksen jo ~70–75 %:ssa.
- Simulaattori-UDID-omistukset (27.9. selvitetty): 993F8873/C1D5E34C = Natiiviseppä, F989814A = Siirtoseppä, A2FD9C9F = Pelikoodari, 503000D1 = jaettu — ei poistoja tarvittu.
- Kellonaika: aja `date` ennen mitään kelloa sisältävää tekstiä, älä arvaa.
- Aikavyöhyke: get_usage `resetsAt` on UTC. EEST = UTC+3.

## Tila luovutushetkellä (27.9. klo 18:00)

- 5 h -kiintiö 6 % (uusi ikkuna). Viikko (all models) 63 %, viikko (Fable) 76 %. Kaukana kynnyksistä 93/95/97 %.
- Levy 97 Gi vapaana, puskuri ~17 Gi — laskee tasaisesti, seurataan tiiviisti. Ei kriittinen.
- Kontekstit: Laitetestaaja 76 % (YLI, ilmoitettu, Fable käskenyt nollaukseen B13:n jälkeen), muut alle 65 %.
- Ei avoimia jumeja tai kortteja omistajalle.
- Tänään käsitelty: tilinvaihto (uusi tili klo 12.0x), levyvahti-selvitys (kasvaja=lokit-poltto, simulaattorit selvitetty), swap-tarkistus (ei kasvaja), Fablen oma nollaus+uudelleenkäynnistys (17:2x, Postivahdin avustamana), useita rooli-kontekstiylityksiä (Sisältökirjuri, Linssiseppä ×2, Pelikoodari, Natiivi-UI ×2, Laitetestaaja) — kaikki paitsi Laitetestaaja ovat nollanneet itsensä.
- Täysi historia päätöksistä: `docs/raportit/tilataulu.md` git-loki (haara `postivahti`).

Jatka kiertoa itsenäisesti `ScheduleWakeup`-työkalulla ~10 min välein normaaliin tapaan.
