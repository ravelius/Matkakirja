# Osoitekirja — Clauden roolisessiot (Matkakirja)

Ylläpitäjä: Päätoimittaja. Päivitetään jokaisessa muutoksessa (uusi sessio, nimi, malli, kansio).
Omistajan päätös 14.10.2026 klo 10.4x: viestit lähetetään AINA session id:llä tästä kirjasta
(`mcp__ccd_session_mgmt__send_message`, `session_id` = alla oleva id), EI nimellä.
Viestit Päätoimittajalle enintään 3 riviä (mitä, sha, kuvien polku); yksityiskohdat tiedostoon.

Päivitetty: 15.10.2026 klo 12.2x (Päätoimittaja): TILINVAIHTO, kaikki id:t uusia. Vanhan tilin id:t eivät ole käytössä.

| Rooli | Session id | Kansio (checkout) | Malli | Alue lyhyesti |
|---|---|---|---|---|
| PÄÄTOIMITTAJA | local_5df52e10-10e4-4b72-9554-0049db300dfe | /Users/Shared/Claude/Matkakirja-fable | Opus, medium | orkestrointi, kuittaukset, junat, Raamattu/loki |
| KESKUSTELUKANAVA | local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589 | /Users/Shared/Claude/Matkakirja-fable | Opus, max | omistajan keskustelu, ideointi, kysymyskortit (roolit eivät viesti tänne) |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | /Users/Shared/Claude/Matkakirja-julkaisija | Opus, medium (high vain CI-vian ajaksi, omistaja 14.10. 22.4x) | merget, web-julkaisu, TF-vienti, Codex-haku |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 | /Users/Shared/Claude/Matkakirja-3d-selvittaja | Opus, high | natiivijunat, käännökset, muistiajot, Unity |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | /Users/Shared/Claude/Matkakirja-natiivi-ui | Opus, high | natiivin käyttöliittymä pohjilla |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | /Users/Shared/Claude/Matkakirja-pelikoodari | Opus, high | pelilogiikka, ISS, kytkennät |
| Linssiseppä | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | /Users/Shared/Claude/Matkakirja-linssiseppa | Opus, high | museot ja opas |
| Valoseppä (ent. Linssiseppä 2) | local_c238f4af-ae73-44e7-81f1-92848acd9217 | /Users/Shared/Claude/Matkakirja-linssiseppa-2 | Opus, high | valo, ilmakehä, materiaalit, avaruuskohtaukset |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | /Users/Shared/Claude/Matkakirja-karttaseppa | Opus, high | kartat, maasto, pallokierrosten kaupungit |
| Linnanrakentaja | local_996d60ab-b4af-4172-ad31-f8e948f141a3 | /Users/Shared/Claude/Matkakirja-linnanrakentaja | Opus, high | 3D-mallit (linnat, raketti, ISS) |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | /Users/Shared/Claude/Matkakirja-siirtoseppa | Opus, high | siirrot natiiviin, botti |
| Sisältökirjuri | local_72d15713-eb20-402b-95f7-87bdaaf91b74 | /Users/Shared/Claude/Matkakirja-sisaltokirjuri | Sonnet 5.5, high | tekstit, esittelyt, kerronta |
| Äänittäjä | local_16ee69c8-b917-4dcd-9060-3542c5e03e67 | /Users/Shared/Claude/Matkakirja-aanittaja | Sonnet 5.5, high | musiikki ja äänet (auto-tila) |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | /Users/Shared/Claude/Matkakirja-laitetestaaja | Sonnet 5.5, high | laitetestit |
| Postivahti | local_a24c43c0-8094-4141-b734-90b9555f5044 | /Users/Shared/Claude/Matkakirja-posti | Sonnet 5.5, medium | mittarit, hälytykset, roolien nollaukset |
| Asemataulu | local_aea9822b-c1c9-40aa-aecc-e84d19148a8c | /Users/Shared/Claude/Matkakirja-asemataulu | Sonnet 5.5, low | Asemataulun vienti (auto-tila) |

Asemataulu (tämän tilin taulu): https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm

Vastuualueet tarkemmin: docs/vastuukartta.md (repossa).
