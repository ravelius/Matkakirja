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
5. Rivi Päätoimittajalle (local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc): `nollattu <rooli> (<sha>)`.

Etäyhteyttä ei kytketä tässä kulussa: se on vain KK:lla (omistaja 6.11.2026 klo 16.08, Raamattu 7.9).

Keskustelukanavaa (local_231e4bad) EI nollata koskaan (omistaja nollaa sen kortilla). Päätoimittajan oma nollaus: PT kirjoittaa luovutuksen ja aloitusviestin ja pyytää Postivahtia (sama kulku, aloitusviesti PT:n antamana). PT:n kova raja 40 % = pakkonollaus (KIERROS.md Hälytysrajat). Ennen PT:n clear_sessionia tarkista, että /Users/Shared/Claude/keskustelut/ sisältää alle 15 min vanhan Paatoimittaja-<pvm>-klo-*.md:n; jos ei, pyydä PT:tä ajamaan ensin `python3 tools/tallenna-keskustelu.py <keskustelu-uuid> Paatoimittaja` (15.10. 14.39 tallennus jäi väliin).

## Vanhentuneen NOLLAUS-viestin esto (PT 4.11. 07.22: JU, KS, LAV ja KK saivat NOLLAUS-viestin nollauksensa jälkeen)
- Lähetä NOLLAUS vain, kun roolin `isRunning` on false; muuten odota levon alkua (viesti jää muuten jonoon ja osuu seuraavaan sessioon).
- Rooli, jonka jonossa on NOLLAUS-viesti, mutta joka antaa uuden LUOVUTUS VALMIS -rivin: älä lähetä toista NOLLAUSTA, vaan käytä uusinta sha:ta ja tarkista ennen jokaista viestiä `list_events`: jos viestimäärä on pudonnut luovutuksen jälkeen tai uusin tapahtuma on vanhaa tilaa, sessio on jo nollattu → vain aloitusviesti, ei NOLLAUSTA.
- Jos vanhentunut NOLLAUS ehti jonoon: lähetä heti `PERUUTUS: NOLLAUS vanhentunut, ÄLÄ nollaa` samalle roolille.
- Viestimäärä vaihtelee tiivistyksen vuoksi; käytä lisäksi `get_session`in `lastActivityAt`-aikaa ja roolin omaa "nollaan nyt" -viestiä päätelmän tukena.

## Vakioaloitusviesti (täytä <…>)
```
Olet <ROOLI> (<malli>), Matkakirjan roolisessio; session id <id>, checkout <kansio>.
Lue ensin CLAUDE.md ja luovutuksesi KOKONAAN: /Users/Shared/Claude/luovutukset/<rooli>-<pvm>-<klo>.md, ja toimi sen mukaan.
KEVYT ALOITUS (KK 12.11. 15.36, kortti nollaus-ja-luovutus 1 ja 7): lue lisäksi vain omat aihekortit (node tools/kirjaa.mjs aiheet → kirjaa.mjs lue <aihe>, vastuu = roolisi) ja työlistan oma rivi; Raamatun lukuja ei lueta kokonaan, vaan haetaan tarpeen mukaan (kirjaa.mjs hae). Tavoite aloitus ≤ 15 %.
Osoitteet: /Users/Shared/Claude/osoitekirja.md — viestit AINA send_messagella session id:llä, ei nimellä.
Viestit Päätoimittajalle (local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc) enintään 3 riviä: mitä, sha, kuvien polku; yksityiskohdat tiedostoon.
Vastuualueesi: docs/vastuukartta.md. Kun nollaustarve tulee: luovutus + push → Postivahdille "LUOVUTUS VALMIS <sha>".
Jos sait nollauksen jälkeen vanhoja viestejä, ne on jo käsitelty luovutuksessa – älä toista niitä.
Aloita jonosi seuraavasta erästä; jos jono on tyhjä, rivi PT:lle "JONO TYHJÄ: <rooli>".
```
Luovutustiedoston polku: roolin LUOVUTUS VALMIS -rivistä tai `git show --stat <sha>` (docs/raportit/…-luovutus-…md).

## Kotikansioiden päivitys ennen nollausta (omistajan päätös 22.24 B3, PT:n välittämä 20.10.)
Ennen jokaista roolin nollausta (kulun kohta 2 ja 3 välissä): `bash tools/paivita-kotikansiot.sh --aja --uusi-haara <roolin kansio>`. Kunnes `--uusi-haara` on mainissa, pelkkä `--aja`. Kansio, jota ei voi päivittää → rivi PT:lle.


ASEMATAULU JÄÄDYTETTY (omistaja 9.11. 23.08, Raamattu 7.39): ei vientejä tauluun, ei Asemataulun herätyksiä/Boostia eikä "Asemataulu auki" -riviä aloitusviesteissä (myös PT, KK). tyolista.json/junat.json jäävät sessioiden tiedoiksi.

## Luovutuksen koko ja aloitusviestin paikka (PT 12.11. 08.4x, KK 08.45, Raamattu 7.37 / PR 6590)
- Luovutus ≤ 8 kt ja ≤ 60 riviä, ei "lisäys N" -ketjuja. Yli 8 kt → palauta roolille tiivistettäväksi ENNEN clear_sessionia (KS -1408 115 kt ja NS 33 lisäystä: tiivistys seuraavassa nollauksessa).
- Aloitusviesti on nollatun roolin ENSIMMÄINEN viesti: lähetä se heti kun list_events = 0.
- PT:n oma nollaus: odota, että PR 6590 on yhdistetty (PT yhdistää vihreänä), sitten PT nollaa.
