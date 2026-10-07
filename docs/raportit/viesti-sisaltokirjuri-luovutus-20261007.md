# Sisältökirjurin luovutus 7.10.2026 (LOPULLINEN, VAIHTO NYT ~23.45; tilinvaihto 22.15–22.50)

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

## Valmiit (päivitys klo ~20.50)
- Köpis v1 54 riviä (ämpärissä), Rooma v4 65 (5 havainnekuvaa), Lontoo v1 56; Codex-tilaukset: Lontoo 10 (a46d3d59a), Rooman uusinta Colosseum+Appia (b508c84b3), Köpis 3 (6a2022a19). Tulos-PR #4166 (työkaluja → Julkaisijan junaan). Pelikoodari ja Linssiseppä tietävät polut.
- Olavinlinnan FP-tehosteet: CC0/PD-ehdokaslista LAHTEET-muodossa `docs/raportit/olavinlinna-fp-aanet-lahteet-20261007.md`; raaka-äänet ämpärissä `seikkailu/olavinlinna/aanet-fp-raaka-v1/raaka/` (89 tiedostoa, valitut + varaehdokkaat, ei kuunneltu). Freesound-ehdokkaat (97) Pelikoodarilta kerättiin robots.txt:n vastaisesti /search/-sivuilta → käytä vain ihmisen esikuunteluun tai viralliseen API:iin (Actions-avain); ei täydennystä skriptillä.
- **Sonnissin GDC 2026 -paketti (~7,5 Gt, T7:lle):** Päätoimittaja välitti omistajan luvan, mutta lataus vaatii käyttäjän oman kuittauksen minulle chatissa — EI ladattu. Jos kuitattu: T7:lle (ei sisäiselle), poimi sopivat, kirjaa lähde + lisenssi LAHTEET-muotoon.
- Orpo ämpäriobjektit poistettavaksi (Julkaisija/omistaja): pariisi-v1/kuvat/e96fe3107395eede.jpg + vanhat pariisi-v1/rooma-v1/rooma-v2-jsonit; rooma-v1/kuvat/1727a3f352629b36.jpg ja 2bdc72d07cdb8916.jpg.
- Kesken: Colosseum/Appia-uusinta (Codex), sitten Rooma v5; Lontoo/Köpis/Rooma Codex-kuvat → uudet luetteloversiot (`havainnekuva: true`) kun tulevat; repliikkien sukupuolitarkistus (31 + kappeli, englanninnettavuus) ei aloitettu.
- Worktree `wt/sisaltokirjuri-praha-wien-kuvat` (haara sisaltokirjuri-esittely-kuvat-tulokset, PR #4166) ja `wt/sisaltokirjuri-posti-praha-wien`: poista mergen jälkeen `tools/uusi-worktree.sh --poista`.

## LOPULLINEN TILA (VAIHTO NYT, 7.10. ~23.45)
- Mergattu/auki: #4166 (Rooma v4/Lontoo/Köpis tulokset + työkalut → Julkaisijan junaan), #4170 (repliikki-/käännettävyystarkistus, FP-äänilähteet, kappalainen-3 → tyrmä; Päätoimittaja mergeää). Sonnissin GDC-lataus JÄTETTY (Cloudflare-robottitarkistus; omistaja lataa itse myöhemmin).
- Heikot äänet (uinti, sukellus, hanska-esine, savipurkki, luuta) → Pelikoodari ElevenLabs-tehosteina (omistajan 10 000 krediitin katto). Räkättirastas CC BY-SA kelpaa tekijämaininnalla (tiedostoa ei ole ladattu).
- Odottaa Codexia: Rooma uusinta (Colosseum + Appia; posti b508c84b3; jos Appia ei onnistu, rivi pois), Lontoo 10 kuvaa (a46d3d59a), Köpis 3 kuvaa (6a2022a19). Kun tulevat: katso kuvat, valitse, tee uusi luetteloversio (lontoo-v2, koopenhamina-v2, rooma-v5: vain json, `havainnekuva: true`, kuvat esittely/<kaupunki>-v2/kuvat/ JPEG q85 1280 px; mallina rooma-v3 → v4), vie-paketti, ilmoita Päätoimittajalle (1 vertailukuva), Pelikoodarille ja Linssisepälle polku.
- Ei taustaajoja käynnissä minun puolellani. Worktreet: wt/sisaltokirjuri-praha-wien-kuvat (haara sisaltokirjuri-esittely-kuvat-tulokset, PR #4166), wt/sisaltokirjuri-posti-praha-wien (posti), wt/sisaltokirjuri-olavinlinna-repliikit-aanet (PR #4170): poista mergen jälkeen `tools/uusi-worktree.sh --poista <nimi>`.
- Orpoja ämpäriobjekteja poistettavaksi (Julkaisija/omistaja): pariisi-v1/kuvat/e96fe3107395eede.jpg; rooma-v1/kuvat/1727a3f352629b36.jpg, 2bdc72d07cdb8916.jpg; vanhat pariisi-v1/, rooma-v1/, rooma-v2/, rooma-v3/-jsonit (v3-kuvat jäävät: v4 käyttää niitä).
- Seuraavaksi (jos aikaa): Olavinlinnan lisätyöt Päätoimittajan mukaan; pidä viestit Päätoimittajalle send_messagella `local_5df52e10-10e4-4b72-9554-0049db300dfe`.
