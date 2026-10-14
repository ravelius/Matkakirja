# Roolien nollaus — Postivahti hoitaa alusta loppuun (omistaja 14.10.2026 klo 10.4x)

Päätoimittaja päättää vain nollaustarpeen (roolin konteksti ≥ 50 %) ja käskee roolia tekemään luovutuksen.
Kaikki muu on Postivahdin työtä. Osoitteet: /Users/Shared/Claude/osoitekirja.md (send_message id:llä, ei nimellä).

## Kulku
1. Rooli tekee luovutuksen (siirtoraportti + push) ja lähettää Postivahdille rivin `LUOVUTUS VALMIS <sha>`.
2. Postivahti: `set_remote_control <id> false`.
3. Kun roolin jono on tyhjä (list_events: ei käsittelemättömiä viestejä, isRunning false) → send_message roolille:
   `NOLLAUS: kutsu nyt clear_session self. Älä tee mitään muuta.`
4. Odota, kunnes rooli on levossa, ja tarkista `list_events` → 0 viestiä (konteksti nollattu, get_usage < 10 %).
   Jos ei nollautunut 10 minuutissa → `clear_session <id>` itse; jos sekään ei onnistu → rivi PT:lle `JUMI nollaus <rooli>`.
5. Lähetä vakioaloitusviesti (alla) send_messagella.
6. `set_remote_control <id> true`.
7. Rivi Päätoimittajalle (local_74630a27-8c1b-4ac3-9143-538efab8cbcd): `nollattu <rooli> (<sha>)`.

Keskustelukanavaa (local_593b89a1) EI nollata koskaan (omistaja nollaa sen kortilla). Päätoimittajan oma nollaus: PT kirjoittaa luovutuksen ja aloitusviestin ja pyytää Postivahtia (sama kulku, aloitusviesti PT:n antamana).

## Vakioaloitusviesti (täytä <…>)
```
Olet <ROOLI> (<malli>), Matkakirjan roolisessio; session id <id>, checkout <kansio>.
Lue ensin CLAUDE.md ja luovutuksesi: git show <sha>:<luovutustiedoston polku> KOKONAAN, ja toimi sen mukaan.
Osoitteet: /Users/Shared/Claude/osoitekirja.md — viestit AINA send_messagella session id:llä, ei nimellä.
Viestit Päätoimittajalle (local_74630a27-8c1b-4ac3-9143-538efab8cbcd) enintään 3 riviä: mitä, sha, kuvien polku; yksityiskohdat tiedostoon.
Vastuualueesi: docs/vastuukartta.md. Kun nollaustarve tulee: luovutus + push → Postivahdille "LUOVUTUS VALMIS <sha>".
Jos sait nollauksen jälkeen vanhoja viestejä, ne on jo käsitelty luovutuksessa – älä toista niitä.
Aloita jonosi seuraavasta erästä; jos jono on tyhjä, rivi PT:lle "JONO TYHJÄ: <rooli>".
```
Luovutustiedoston polku: roolin LUOVUTUS VALMIS -rivistä tai `git show --stat <sha>` (docs/raportit/…-luovutus-…md).
