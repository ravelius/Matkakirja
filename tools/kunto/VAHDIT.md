# Talon vahdit (Raamattu 7.41; KK 12.11.2026: kuntotarkastus vertaa tätä ajossa oleviin)

Kuntotarkastus (luku 14) lukee rivit, joiden muoto on `- tyyppi | tunniste | omistaja | kuvaus`:
- `launchagent`: tunniste on launchctl-nimike; pitää olla ladattuna (`launchctl list`).
- `prosessi`: tunniste on komentorivin osa; pitää olla käynnissä (`pgrep -f`).
- `tiedosto`: tunniste on polku; pitää olla olemassa.
Sessiokohtaiset ajastukset (CronCreate, ScheduleWakeup) eivät näy ulospäin, eikä niitä mitata.
Uusi tai poistuva vahti päivitetään tähän samassa PR:ssä kuin itse vahti.

## LaunchAgentit (~/Library/LaunchAgents)
- launchagent | fi.matkakirja.juna | JU | juna 08–22 joka toinen tunti
- launchagent | fi.matkakirja.juna-vahti | JU | junan vahti 10 min
- launchagent | fi.matkakirja.naytto-auki | omistaja | näyttö auki etäyhteyttä varten (ei poisteta eikä pysäytetä)
- launchagent | fi.matkakirja.siivous | PT | yösiivous 03
- launchagent | app.matkakirja.natiivi-bundle | NS | natiivin paketti 04
- launchagent | actions.runner.ravelius-Matkakirja.SamiMacStudio2 | JU | Actions-runner
- launchagent | actions.runner.ravelius-Matkakirja.SamiMacStudio2-testit | JU | Actions-runner (testit)

## Julkaisijan vahdit (/Users/Shared/Claude/julkaisija-tyokalut/)
- prosessi | lukkovahti.zsh | JU | Macin ajolukko
- prosessi | jono-ika-vahti.zsh | JU | yli 30 min odottanut ajo → rivi PT:lle
- prosessi | unity-cpu-vahti.zsh | JU | jumittunut Unity-käännös → rivi PT:lle
- prosessi | valoseppa-vahti.zsh | JU | Valosepän ajot

## PT:n Monitorit (/Users/Shared/Claude/hooks/)
- prosessi | odottajat-vahti.py | PT | odottajavahti 30 min
- prosessi | codex-posti-vahti.sh | PT | Codex-posti 30 min

## Hookit
- tiedosto | /Users/Shared/Claude/hooks/pt-taulu-muistutus.py | PT | kontekstivahti ja työlistamuistutus (asennettu kopio tools/hooks/:sta)
- tiedosto | /Users/Shared/Claude/hooks/viestiraja-muistutus.sh | PT | viestirajan varakanava (Raamattu 12.20)

## Ohjeet
- tiedosto | /Users/Shared/Claude/Matkakirja-posti/KIERROS.md | Postivahti | Postivahdin kierros
- tiedosto | /Users/Shared/Claude/Matkakirja-posti/NOLLAUS.md | Postivahti | aloitusviestit
- tiedosto | /Users/Shared/Claude/osoitekirja.md | PT | session-id:t
- tiedosto | /Users/Shared/Claude/luovutukset | kaikki | luovutuskansio (KK 12.11. 11.40)
