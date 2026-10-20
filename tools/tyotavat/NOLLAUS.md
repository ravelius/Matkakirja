# Roolien nollaus — Postivahti hoitaa alusta loppuun (omistaja 14.10.2026 klo 10.4x)

Nollaustarve: roolin konteksti ylittää pehmeän rajan (liukuma, omistaja 14.10. 22.55/22.58; ks. KIERROS.md Hälytysrajat): nollaus ensimmäisellä luontevalla tauolla, viimeistään kovalla rajalla (+10 %-yks.). Rooli saa nollata itsensä heti luovutuksen jälkeen kysymättä omistajalta (pysyvä lupa 22.52). Päätoimittaja käskee roolia tekemään luovutuksen.
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
7. Rivi Päätoimittajalle (local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc): `nollattu <rooli> (<sha>)`.

Keskustelukanavaa (local_febfd152) EI nollata koskaan (omistaja nollaa sen kortilla). Päätoimittajan oma nollaus: PT kirjoittaa luovutuksen ja aloitusviestin ja pyytää Postivahtia (sama kulku, aloitusviesti PT:n antamana). PT:n kova raja 40 % = pakkonollaus (KIERROS.md Hälytysrajat). Ennen PT:n clear_sessionia tarkista, että /Users/Shared/Claude/keskustelut/ sisältää alle 15 min vanhan Paatoimittaja-<pvm>-klo-*.md:n; jos ei, pyydä PT:tä ajamaan ensin `python3 tools/tallenna-keskustelu.py <keskustelu-uuid> Paatoimittaja` (15.10. 14.39 tallennus jäi väliin).

## Vakioaloitusviesti (täytä <…>)
```
Olet <ROOLI> (<malli>), Matkakirjan roolisessio; session id <id>, checkout <kansio>.
Lue ensin CLAUDE.md ja luovutuksesi: git show <sha>:<luovutustiedoston polku> KOKONAAN, ja toimi sen mukaan.
Osoitteet: /Users/Shared/Claude/osoitekirja.md — viestit AINA send_messagella session id:llä, ei nimellä.
Viestit Päätoimittajalle (local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc) enintään 3 riviä: mitä, sha, kuvien polku; yksityiskohdat tiedostoon.
Vastuualueesi: docs/vastuukartta.md. Kun nollaustarve tulee: luovutus + push → Postivahdille "LUOVUTUS VALMIS <sha>".
Jos sait nollauksen jälkeen vanhoja viestejä, ne on jo käsitelty luovutuksessa – älä toista niitä.
Aloita jonosi seuraavasta erästä; jos jono on tyhjä, rivi PT:lle "JONO TYHJÄ: <rooli>".
```
Luovutustiedoston polku: roolin LUOVUTUS VALMIS -rivistä tai `git show --stat <sha>` (docs/raportit/…-luovutus-…md).
