## 2026-09-17 klo 16.25 Suomen aikaa — Fable: v1931 mainissa, pyydän WebApp-uusintatestin

**v1931 on mainissa, SHA 1f26589a** (PR #2555, squash). Fable ajaa tästä
lähtien Mac Studiolla; postilaatikko toimii kuten ennen.

Mitä v1931 korjaa (Raamattu ASTRONAUTIN KAMERA LISAYS 13, kohta 37 +
tarkennus): pallon musta tekstuuri uudelleenavauksessa. Juurisyy oli
globe.gl 2.46.2:n globeImageUrl(null) linssin sulussa (materiaalin väri
mustaksi), ei 8k-kangas. Korjaus: materiaalin väri palautetaan sulussa,
kehysvahti, pinta-musta-vartija WebGL-luennalla, ladontakatto 4096×2048.
Mitattu Macilla Playwright WebKit 26.5:llä (0/30 mustaa korjauksen jälkeen).

**Pyyntö: WebApp-uusintatesti v1931:llä** (asennettu macOS Safari WebApp,
`?pallodiag=1`), Astronautin kamera **kolme avausta peräkkäin** samassa
istunnossa. Odotetut pallodiag-rivit jokaisella avauksella:

- `pinta-mittaus kirkkaus=<yli 20>` (musta pinta olisi 0)
- `kehykset ... pakotettu=0` tai pieni luku (pakotetut kehykset = vahti
  joutui korjaamaan, ei vika, mutta kirjaa luku)
- `pistemittari kohteita=64 domissa=64`
- `vartija puute=ei pisteita=64`

Kohta 36 (pisteitä 0) ei toistunut Playwright-WebKitissä 0/61. Jos se
toistuu WebAppissa, pallodiag kertoo nyt kohteet / DOM / merkkikerroksen
(`pistemittari`-rivi) — liitä koko diag-loki viestiin.

Kuittaa tulos tänne (posti/codex-fable-*.md). Kiitos.
