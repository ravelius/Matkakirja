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
| unity-julkaisut.py | /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py | Natiiviseppä | Unity-beetaseuranta, cron "4 9 * * *" (nähty-lista unity-julkaisut-nahty.txt jää Macille) |
| ../asemataulu/osoitteet.md, data/talo/*.json | /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/ | Päätoimittaja / Asemataulu | Vain Asemataulun TILA. Koodi ja ASEMATAULU-ROOLI.md ovat repossa tools/asemataulu/ (totuus), työkansion kopiot komennolla `python3 -I tools/asemataulu/asemataulu.py` (docs/moduulit/asemataulu.md) |

| osoitekirja.md | /Users/Shared/Claude/osoitekirja.md | Päätoimittaja | Ainoa session id -lähde; peili säilyttää rakenteen (id:t vanhenevat, päivitys tools/tyotavat/paivita-idt.mjs) |
| keskustelukanava-aloitus.md | /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md | Keskustelukanava | KK:n elävä aloitusviesti Tila-osioineen (pysyvä osa docs/aloitusviestit/keskustelukanava.md) |
| settings.local.json.malli | /Users/Shared/Claude/Matkakirja-fable/.claude/settings.local.json | Päätoimittaja | PT:n sallinnat ja hookit; palautus docs/tilinvaihto.md kohta 6 (seurattua .claude/settings.local.json:ia ei muuteta) |
| ../hooks/pt-taulu-muistutus.py | /Users/Shared/Claude/hooks/pt-taulu-muistutus.py | Päätoimittaja | Asemataulu-muistutushook (Macin versio on totuus, sessiokohtainen raja 14.10.) |
| julkaisija/*.zsh, vie-paketti.sh | /Users/Shared/Claude/julkaisija-tyokalut/ | Julkaisija | Pysyvät työkalut: vahdit (valoseppa, lukko, olavinlinna, simu-muisti), merge, vienti, CDN, äänisivu; avaimet vain ympäristömuuttujista |

Ei peilattu tarkoituksella: scratchpad/tyojonot.md (elävä jono, 279 kt), LaunchAgent-plistit (~/Library/LaunchAgents, Macin käyttäjä)
ja julkaisija-tyokalut/:n kertakäyttöiset skriptit (ketju-*, tf<N>*, merge-<PR>*, kaanna-*; yli 600 tiedostoa).

## Peilin päivitys (kuka ja milloin)
- Se, joka muuttaa Mac-tiedostoa, ajaa samassa vuorossa `bash tools/tyotavat/peili.sh` omassa checkoutissaan tai lähettää
  Päätoimittajalle rivin "PEILI: <tiedosto>"; PT committaa omaan haaraansa.
- Päätoimittaja ajaa `bash tools/tyotavat/peili.sh --tarkista` jokaisessa omassa luovutuksessaan ja tilinvaihdon alussa
  (docs/tilinvaihto.md), ja päivittää peilin, jos eroja on.
- Uusi vain-Mac-ohje tai -skripti: lisää rivi tähän taulukkoon ja peili.sh:n PARIT-listaan samassa vuorossa.
