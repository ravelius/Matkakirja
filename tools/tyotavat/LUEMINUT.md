# Työtapojen peili (tools/tyotavat/)

Päätoimittaja 14.10.2026 (kylmäkäynnistystesti, omistajan linjaus "työskentelytavat kirjataan aina raamattuun").
Nämä ohjeet ja skriptit ajetaan Macilla polusta, joka EI ole gitissä. Peili on tässä, jotta uusi tili, uusi kone tai
kylmä sessio löytää ne. **Mac-polku on totuus**: sessiot lukevat ja ajavat aina Mac-polkua, eivät peiliä. Jos Mac-tiedosto
on kadonnut (uusi kone), se palautetaan peilistä: `cp tools/tyotavat/<tiedosto> <alkuperäinen polku>`.

Avaintarkistus 14.10.2026: `grep -i -E 'key|token|secret|password|sk-'` – osumat olivat vain sanoja (tokenien laskenta,
`sorted(key=…)`), ei avaimia. Avaimia ei koskaan tänne (ks. Raamattu, MAC STUDIO … MISSÄ AVAIMET OVAT).

| Tiedosto | Alkuperäinen polku Macilla | Ylläpitäjä | Mihin |
|---|---|---|---|
| jonokierros-teksti.md | /Users/Shared/Claude/Matkakirja-fable/scratchpad/jonokierros-teksti.md | Päätoimittaja | PT:n JONOKIERROS-cronin kehote ("7,27,47 * * * *") |
| KIERROS.md | /Users/Shared/Claude/Matkakirja-posti/KIERROS.md | Postivahti (sisältö PT:n käskystä) | Postivahdin kierros, ScheduleWakeup 4–5 min |
| NOLLAUS.md | /Users/Shared/Claude/Matkakirja-posti/NOLLAUS.md | Postivahti / PT | Roolien nollaus ja vakioaloitusviesti |
| codex-odottaa.py | /Users/Shared/Claude/Matkakirja-posti/codex-odottaa.py | Postivahti | Tyhjäkäyntivahti: Codex odottaa > 30 min |
| odottajat-vahti.py | /Users/Shared/Claude/hooks/odottajat-vahti.py | Päätoimittaja | ODOTTAJAVAHTI (Monitor, `python3 -u`, 30 min) |
| ASEMATAULU-ROOLI.md | /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/ASEMATAULU-ROOLI.md | Päätoimittaja | Asemataulu-session ohje ja cronit |
| unity-julkaisut.py | /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py | Natiiviseppä | Unity-beetaseuranta, cron "4 9 * * *" (nähty-lista unity-julkaisut-nahty.txt jää Macille) |
| ../asemataulu/kulutus.py, laitteet.py, paivita.py, synkka.py, kone.py, syke.py | /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/ | Päätoimittaja / Asemataulu | Asemataulun skriptit; peili on tools/asemataulu/ (ei kahta kopiota) |

Ei peilattu tarkoituksella: scratchpad/asemataulu/osoitteet.md (tilien sähköpostit; osoitteet ovat docs/tilinvaihto.md:ssä),
data/talo/*.json (elävä data), /Users/Shared/Claude/osoitekirja.md (vaihtuu jokaisessa nollauksessa; muoto ja roolitaulukko
docs/tilinvaihto.md:ssä), scratchpad/tyojonot.md (elävä jono, 279 kt), LaunchAgent-plistit (~/Library/LaunchAgents, Macin käyttäjä)
ja julkaisija-tyokalut/ (oma kansio, 640 tiedostoa).

## Peilin päivitys (kuka ja milloin)
- Se, joka muuttaa Mac-tiedostoa, ajaa samassa vuorossa `bash tools/tyotavat/peili.sh` omassa checkoutissaan tai lähettää
  Päätoimittajalle rivin "PEILI: <tiedosto>"; PT committaa omaan haaraansa.
- Päätoimittaja ajaa `bash tools/tyotavat/peili.sh --tarkista` jokaisessa omassa luovutuksessaan ja tilinvaihdon alussa
  (docs/tilinvaihto.md), ja päivittää peilin, jos eroja on.
- Uusi vain-Mac-ohje tai -skripti: lisää rivi tähän taulukkoon ja peili.sh:n PARIT-listaan samassa vuorossa.
