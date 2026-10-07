# Sisältökirjurin luovutus 7.10.2026 (päivitetty klo ~19.55; tilinvaihto 22.15–22.50)

## Valmista ja mergettyä/avointa tänään
- Oppaan kuvahaku #4096, #4100 (236 paikkaa, 38 sallitun säteet). Faktapohjat (KK 1873/1923, Giza, Olavinlinna) ja Olavinlinnan tietokorttien lähdetarkistus mergetty. Kyproksen pohjoisosa #4145 mergetty. KK/Giza-lähdetarkistus #4151 mergetty.
- Codex-tilaukset (claude/postilaatikko, posti/): kuumailmapallo-latauskuva, 25 kaupunkinäkymää (A), Olavinlinnan 12 tietokorttikuvitusta (B), fotorealismi-lisäys, Tott-uusinta (puhujakuvat peruttu), Pariisin 7 puuttuvaa (posti 50aea672f), Prahan+Wienin 5 puuttuvaa (a81de6afb). Tulokset: Codex kirjoittaa kuittaukset postilaatikkoon; välitä Päätoimittajalle (1 vertailukuva/erä), kaupunkinäkymäerät Julkaisijalle, latauskuva myös LS1:lle; yksityiskohtahavainnekuvat → uusi luetteloversio (rivit "havainnekuva": true).
- **ESITTELYJEN YKSITYISKOHTAKUVAT (Päätoimittajan linja: paikallisesti, sonnet, ≤ 2 rinnakkain, tarkistaja eri agentti)**:
  - Pariisi 67 kuvaa: ämpäri `esittely/pariisi-v2/pariisi-yksityiskohdat.json` (v1 vanhentunut + orpo Pompidou-kuva e96fe3107395eede.jpg: Julkaisijan/omistajan poistettava, en voi).
  - Praha 54: `esittely/praha-v1/praha-yksityiskohdat.json`; Wien 49: `esittely/wien-v1/wien-yksityiskohdat.json` (Pelikoodari kytkee, indeksi PR #4158).
  - Rooma 60 (v2, Marcus Aurelius ja Apollo/Dafne pois Italian museosäännön vuoksi): `esittely/rooma-v2/rooma-yksityiskohdat.json`. Orpo ämpärissä: rooma-v1/kuvat/1727a3f352629b36.jpg, 2bdc72d07cdb8916.jpg + vanha rooma-v1-json (Julkaisija/omistaja poistaa).
  - Lontoo 56: `esittely/lontoo-v1/lontoo-yksityiskohdat.json` (tarkistajat pudottivat St Paul's Survives, Pitchforth, Shard-taivas; Dianan patsas 2021 jäi maisemakuvana). Codex-tilaus 10 kuvaa: posti a46d3d59a.
  - Kööpenhamina: 2 kerääjää ajossa 19.55 (`scratchpad/kuvat/koopenhamina/`, osa1/osa2/codex1/codex2.md). Seuraavaksi yhdista → 2 tarkistajaa → paketoi → vie-paketti → Codex-tilaus → viestit (Päätoimittaja, Pelikoodari, Linssiseppä).
  - PR #4160 (Pariisi+Praha+Wien tulokset ja työkalut, esittely-tyo/kuvat/) Julkaisijalla.
- Worktreet: poistettu paitsi `wt/sisaltokirjuri-praha-wien-kuvat` (haara fable-praha-wien-kuvat, työkalut ja malli-tekstit; poista kun ei tarvita: `tools/uusi-worktree.sh --poista sisaltokirjuri-praha-wien-kuvat`).

## KESKEN: ROOMA → LONTOO → KÖÖPENHAMINA (yksityiskohtakuvat)
Työtapa (kopioi Praha/Wien): työkalut `esittely-tyo/kuvat/tyokalut/` (haarassa fable-praha-wien-kuvat ja PR #4160):
1. Tekstit: `esittely-tyo/malli/<kaupunki>.json` = tuotannon `https://media.matkakirja.app/opas/esittely-v1/<id>.json` (rooma 19 kohdetta, lontoo 19, koopenhamina 14; avaustekstit proto-3d/_tyo/opas-esittely/kolme/avaus-lista.json).
2. Kaksi Sonnet-kerääjää (esim. kohteet jaettuina) → `scratchpad/kuvat/<kaupunki>/osa1.json, osa2.json, codex1.md, codex2.md`; prompt-pohja: OHJE-kaupunki.md + panoraamavapaussääntö (Italia: ei moderneja rakennuksia/nykytaidetta; vain vanhat/PD).
3. `python3 esittely-tyo/kuvat/tyokalut/yhdista_kaupunki.py <kaupunki> <työkansio>` (ankkurit täsmälleen kerran, ≥ 15 sanaa välein, lisenssit, kuvateksti ≤ 8 sanaa, ei kaksoiskuvaa); karsi liian lähekkäiset ankkurit.
4. Kaksi eri Sonnet-tarkistajaa (rivit puoliksi) → tarkistus_N.json (OK/KORJAA/HYLKAA + rajaus); sovella korjaukset osa*.json:iin, aja yhdista uudelleen.
5. `python3 …/paketoi.py <kaupunki> <työkansio> <pvm>` (lataa Commons FilePath?width=1280, UA MatkakirjaBot, rajaus sips, JPEG q85, `_valmiit/<kaupunki>-yksityiskohdat-vienti-<pvm>`), `vie-paketti.sh --kuiva` ja sitten ilman; tarkista URL 200.
6. Codex-tilaus puuttuvista fotorealistisina (esimerkki posti/sisaltokirjuri-codex-praha-wien-yksityiskohdat-20261007.md), viesti Päätoimittajalle + Pelikoodarille + Linssisepälle (polku → yksityiskohdat_polut).
- (VANHA, valmis) Rooma: 2 kerääjää ajossa 19.15 (osa1 avaus+8 kohdetta, osa2 11 kohdetta; tuloskansio `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-sisaltokirjuri/93583568-693e-438c-bad3-8f5e77e8e28c/scratchpad/kuvat/rooma/`; jos kansio katoaa, aja kerääjät uudelleen). Lontoo ja Köpis ei aloitettu.

## Opit
- Pilvityöt lopetettu (krediitit): kaikki tutkimus paikallisesti Sonnet-agenteilla; pidä scratchpad-tulokset ajan tasalla ja pushaa tulokset haaraan.
- Päätoimittajan linjaukset: Luxorin obeliski säilyy, Pompidou (ei FoP) pois, pikku vintiö säilyy; peli käännetään englanniksi (sinä-muoto, ei he/she: Fogg/you/they).
- Viestit Päätoimittajalle send_messagella session id:llä `local_5df52e10-10e4-4b72-9554-0049db300dfe`.

## Jonossa Köpiksen jälkeen (Päätoimittaja 7.10. ~19.35, huomiselle 8.10.)
Pelattavuusmalli (mainissa: docs/raportit/pelattavuusmalli-olavinlinna.md kohdat 10 ja 12): CC0/PD-lista uusille Olavinlinnan tehosteille LAHTEET-muodossa. Ensin Freesound CC0 ja Commons; EI generointia. Tehosteet: askeleet oljella/soralla/matalassa vedessä (4–6 varianttia); viitan kahina, hanska esineeseen, köysi käsissä, uinti ja sukellus ilman hengitystä; vartijan varusteet, kauha, luuta; nauris, savipurkin rikkoutuminen, patapinon kaatuminen, tiili kalliolle, hopea arkussa, leimahdus, tarjottimen kolina; elokuun yön linnut, kaukainen koira. Ei aloitettu.
- Rooman 6 Codex-kuvaa ja korjaustarpeet ovat tulleet postilaatikkoon (686267a7d): käsittele (tarkista, luettelon v3 `havainnekuva: true`).
