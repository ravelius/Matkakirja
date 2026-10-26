# Päätoimittajan luovutus 21.10.2026 klo 15.35 (konteksti 30 %; PT-sessio "PÄÄTOIMITTAJA (Opus, medium)")

Id:t: /Users/Shared/Claude/osoitekirja.md. Edellinen luovutus: -20261021-1105 (taustana). Omistaja on töissä ja katsoo ISOA iPadia;
matka to 22.10.–ma 26.10. VIESTIT: kaikki viestit kulkevat mcp__ccd_session_mgmt__send_message-työkalulla session-id:llä.
Postiworktree: /Users/Shared/Claude/wt/fable-posti-0945 (push HEAD:claude/postilaatikko).

## 0. JUOKSUPELI: KORJAUSKIERROKSET ISOLLA IPADILLA (tärkein)
- Omistajan palautteet 11.17, 11.22, 11.28, 12.28, 14.23 ja 14.32 ovat PK:lla. Iso iPad on näytösversiossa 94d04c518. Mittausversioista
  EI ilmoiteta.
- PYSYVÄ OHJE NS:lle: kun LT:n automaattiajossa kaikki ovat 0 (pysähdys, välähdys, kamerahyppy, nykäys, käännös, alku, värinä,
  katto/seinä; taukorivit eivät laske), NS asentaa omistajalle kysymättä ja viestii HETI KK:lle ja PT:lle "iPad valmis klo, runko"
  (omistaja 15.01: "sano kun uusi versio on simussa"). iPad jäähdytetään lämpötilaan 0/1 ennen ajoa.
- Kierros 26 (32e407b1c): kaikki 0 paitsi 1 alkunykäys 200 ms. KIERROS 27 = PK 8a7d55458 (äänisilmukat hiljaisina latauskuvan
  alla, lämmityksen purku ilman asettelumuutosta). Tulokset: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/varjot-koko/kierrosNN/.
- Mukana: avauslento ylhäältä portin läpi, huudot 11.28:n mukaan, Ohita esittelyt -kytkin (NUI 21c587ea0), varjot 200 m
  (GPU ok), latauskuvat #807 vaaka + #809 pysty, tekstiboksi "Juoksupeli (harmaa)" pois (kehitys-HUD).
- OTSIKKO: Codex #814 (2 kuvaa, alfa): "Viimeinen keisari" + "karkuteillä" kengänpohjana → PT tarkistaa → KK omistajalle latauskuvan
  päällä. PK:n kytkin valmiina (OtsikkoUrl/KarkuteillaUrl, paikat fbafa3e75).

## 1. JUOKSUPELIN GRAFIIKKALUUPPI (omistaja 15.33: "nyt rinnalla")
- Mallikuvat hyväksytty: #810 01–06 (omistaja 13.32) + #811 07 yleiskuva (KK 14.3x, valtuutus 13.33: "Saat itse hyväksyä muut").
- Kierros 1 Lavastaja (muurien kivinen alaosa, tausta v17) ja kierros 2 VS (pinnat, valo); omat haarat rungosta 4186554cd, kuvaparit
  PT:lle; peliin vain LT:n mittauksen läpäisseenä. Tavoite: ensimmäinen kierros iPadille vielä tänään. Työlistalla.

## 2. KARTAN 3D-MAAMERKIT
- Maamerkit tehdään koodissa perusmuodoista (PK). Omistaja 14.25: sarjaa EI ole hyväksytty. Ensin kolme: Colosseum VAIN PUOLIKAS
  ulkokehä kaaririveineen (KK vahvisti käskyksi), Kinderdijkin siivet lakin akseliin, Matterhornin "laiva" (taustaobjekti) pois.
- Codex #812 (lupa 3 kuvaa + 3 Tripo, tarkennukset 0b689439a ja 7fbe53bc4): kuvat → KK hyväksyy → Tripo → VS:n VERTAILUARKKI
  (koodiversio | Codex) → PT → KK → omistaja. Koodiversio PK c6cfc4a84. Riski: Codexin Chrome-vientieste (GLB).

## 3. MUUT
- Raketin muisti on HYVÄKSYTTY junaan: VS:n haara linssiseppa2/raketti-muisti (192 Mt, huippu 3516 Mt, 0 varoitusta) → NS:n runko.
- Peking 1900 -tausta: Codex #805 v3 toimitettu (18 GLB, T7, delivery-v3). VS tuo renkaaseen ja tekee kuvaparin + LT:n GPU-mittauksen.
  Kytkin pysyy pois, kunnes PT hyväksyy. Tornin ja paviljongin LOD:t ovat raskaita.
- VS: tulivuorten pilvikansi ja hurrikaani seuraavalla kierroksella. Musta sali (LS): selvitys lopetettu (simun yhdistelmävika).
- Asemataulu: junat.json (juna 209) ja tyolista.json päivitetty 13.3x ja 15.3x.
- Worktree fable-luovutus-1540 → `tools/uusi-worktree.sh --poista fable luovutus-1540` mergen jälkeen; vanha fable-aaniprompti samoin.
