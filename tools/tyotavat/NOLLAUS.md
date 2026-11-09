# Roolien nollaus — Postivahti hoitaa alusta loppuun (omistaja 14.10.2026 klo 10.4x)

Nollaustarve: roolin konteksti ylittää pehmeän rajan (liukuma, omistaja 14.10. 22.55/22.58; ks. KIERROS.md Hälytysrajat): nollaus ensimmäisellä luontevalla tauolla, viimeistään kovalla rajalla (+10 %-yks.). Rooli saa nollata itsensä heti luovutuksen jälkeen kysymättä omistajalta (pysyvä lupa 22.52). Päätoimittaja käskee roolia tekemään luovutuksen.
Kaikki muu on Postivahdin työtä. Osoitteet: /Users/Shared/Claude/osoitekirja.md (send_message id:llä, ei nimellä).

## Kulku
1. Rooli tekee luovutuksen (siirtoraportti + push) ja lähettää Postivahdille rivin `LUOVUTUS VALMIS <sha>`.
2. Kun roolin jono on tyhjä (list_events: ei käsittelemättömiä viestejä, isRunning false) → send_message roolille:
   `NOLLAUS: kutsu nyt clear_session self. Älä tee mitään muuta.`
3. Odota, kunnes rooli on levossa, ja tarkista `list_events` → 0 viestiä (konteksti nollattu, get_usage < 10 %).
   Jos ei nollautunut 10 minuutissa → `clear_session <id>` itse; jos sekään ei onnistu → rivi PT:lle `JUMI nollaus <rooli>`.
4. Lähetä vakioaloitusviesti (alla) send_messagella.
5. Rivi Päätoimittajalle (local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31): `nollattu <rooli> (<sha>)`.

Etäyhteyttä ei kytketä tässä kulussa: se on vain KK:lla (omistaja 6.11.2026 klo 16.08, Raamattu 7.9).

Keskustelukanavaa (local_d5f31591) EI nollata koskaan (omistaja nollaa sen kortilla). Päätoimittajan oma nollaus: PT kirjoittaa luovutuksen ja aloitusviestin ja pyytää Postivahtia (sama kulku, aloitusviesti PT:n antamana). PT:n kova raja 40 % = pakkonollaus (KIERROS.md Hälytysrajat). Ennen PT:n clear_sessionia tarkista, että /Users/Shared/Claude/keskustelut/ sisältää alle 15 min vanhan Paatoimittaja-<pvm>-klo-*.md:n; jos ei, pyydä PT:tä ajamaan ensin `python3 tools/tallenna-keskustelu.py <keskustelu-uuid> Paatoimittaja` (15.10. 14.39 tallennus jäi väliin).

## Vanhentuneen NOLLAUS-viestin esto (PT 4.11. 07.22: JU, KS, LAV ja KK saivat NOLLAUS-viestin nollauksensa jälkeen)
- Lähetä NOLLAUS vain, kun roolin `isRunning` on false; muuten odota levon alkua (viesti jää muuten jonoon ja osuu seuraavaan sessioon).
- Rooli, jonka jonossa on NOLLAUS-viesti, mutta joka antaa uuden LUOVUTUS VALMIS -rivin: älä lähetä toista NOLLAUSTA, vaan käytä uusinta sha:ta ja tarkista ennen jokaista viestiä `list_events`: jos viestimäärä on pudonnut luovutuksen jälkeen tai uusin tapahtuma on vanhaa tilaa, sessio on jo nollattu → vain aloitusviesti, ei NOLLAUSTA.
- Jos vanhentunut NOLLAUS ehti jonoon: lähetä heti `PERUUTUS: NOLLAUS vanhentunut, ÄLÄ nollaa` samalle roolille.
- Viestimäärä vaihtelee tiivistyksen vuoksi; käytä lisäksi `get_session`in `lastActivityAt`-aikaa ja roolin omaa "nollaan nyt" -viestiä päätelmän tukena.

## Vakioaloitusviesti (täytä <…>)
```
Olet <ROOLI> (<malli>), Matkakirjan roolisessio; session id <id>, checkout <kansio>.
Lue ensin CLAUDE.md ja luovutuksesi: git show <sha>:<luovutustiedoston polku> KOKONAAN, ja toimi sen mukaan.
Osoitteet: /Users/Shared/Claude/osoitekirja.md — viestit AINA send_messagella session id:llä, ei nimellä.
Viestit Päätoimittajalle (local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31) enintään 3 riviä: mitä, sha, kuvien polku; yksityiskohdat tiedostoon.
Vastuualueesi: docs/vastuukartta.md. Kun nollaustarve tulee: luovutus + push → Postivahdille "LUOVUTUS VALMIS <sha>".
Jos sait nollauksen jälkeen vanhoja viestejä, ne on jo käsitelty luovutuksessa – älä toista niitä.
Aloita jonosi seuraavasta erästä; jos jono on tyhjä, rivi PT:lle "JONO TYHJÄ: <rooli>".
(ASEMATAULU, 31.10. seisokki 09.40–16.2x, KK 16.3x: hoitaja käynnistyy vain KK:n "OMISTAJAN PÄÄTÖS klo 23.35" -rivillä. Asemataulun jokaisen nollauksen jälkeen lähetä KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a) rivi "nollattu Asemataulu" PT:n kuittauksen lisäksi.)
```
Luovutustiedoston polku: roolin LUOVUTUS VALMIS -rivistä tai `git show --stat <sha>` (docs/raportit/…-luovutus-…md).

## Kotikansioiden päivitys ennen nollausta (omistajan päätös 22.24 B3, PT:n välittämä 20.10.)
Ennen jokaista roolin nollausta (kulun kohta 2 ja 3 välissä): `bash tools/paivita-kotikansiot.sh --aja --uusi-haara <roolin kansio>`. Kunnes `--uusi-haara` on mainissa, pelkkä `--aja`. Kansio, jota ei voi päivittää → rivi PT:lle.
