# Päätoimittajan luovutus 25.10.2026 klo 14.30 (talviaika EET; konteksti 33 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261025-1212 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47 (PT: luvut 7, 8, 9, 12, 14, 4.1, docs/tilinvaihto.md).
Session alussa: Monitor odottajat-vahti.py + codex-posti-vahti.sh (Shared/Claude/hooks), git fetch origin claude/postilaatikko.
VIESTIT: mcp__ccd_session_mgmt__send_message session-id:llä. Omistaja MATKALLA, vastaa KK:n kortteihin.
Karttaseppä herätetty sessioon local_eec7f158-d9f3-4b93-9368-c50935bd19ab (Postivahti päivittää osoitekirjan).

## 0. OMISTAJAN PÄÄTÖKSET TÄNÄÄN (kaikki lokissa, main 18725cee7 + PR 5231)
- 13.10/13.12 pylväät ja seinät valmiiksi valaistuina (tekotapa 4): LR polttaa Blenderissä pelin auringolla 4 ilmansuuntaan,
  VS antaa suunnan/valotuksen + JuoksuValo; Codex piirtää pinnat ilman valoa vasta pilotin jälkeen (este → KYSYMYS ennen tilausta).
- 13.56 "Julkaise juna nyt ilman testejä ja siirrä keskeneräiset seuraavaan junaan." → juna 210 (alla).
- 14.28 "Elävä kartta mieluummin": Raamattu 6.9 täydennetty (lähitasot elävinä, OpenMapTiles/OSM, oma pergamenttityyli;
  Kanahiron tyyliä ei kopioida). Karttaseppä: 1 sivun suunnitelma → koeversio Thamesin suulle (51,45, 0,64) kolmikkona.
- PT 13.04: salin oma aurinko 45°/70° ilman katon varjoa (vain sali); ehdot 05 lattia ≥ 193, 04 kohti 176, ei mustia.

## 1. JUNA 210 (KESKEN, JU)
- Lukittu: BUILD 985cbf182 (= 019758127 + LR rakennukset-v43; EI räystäskameraa), muutosloki #5229 → 959567a98.
- iOS-TF kaatui 14.23: ajuri ei pääse T7:lle (getcwd: Operation not permitted; sama kaatoi yöajot 24.–25.10.).
  KIERTO käskytetty JU:lle: käännöskopio (20 Gt) rsync sisäiselle levylle proto-3d/proto-kaannos-linja1-sisa,
  Matkakirja-proto-kaannos-linkki sinne, TF uudelleen. Pysyvä korjaus = omistajan toimi myöhemmin KK:n kortilla
  (Levyn täysi käyttö → /Users/Shared/Claude/actions-runner). Suojausasetuksiin ei kosketa.
- L1 TF:n käytössä: PK/VS/LR/NUI eivät aloita Unity-/editoriajoja ennen JU:n ilmoitusta. KK:lle rivi, kun testaajilla.

## 2. JUNA 211 (KÄYNNISSÄ)
- PK: räystäskamera (talteen 85d4ca9c4/4b4864d28) PUTOSI 210:stä: LT laitteella piilossa aukio 563 / sisätila 402. Syy:
  3 taustaan leivottua porttihallia (−80,−8), (−80,129), (−64,−209) → LR irrottaa t-portti-rakennuksiksi (tausta-v52 +
  rakennukset-v44 työkansiossa). PK testaa → LT:n laiteajo ENNEN kuittausta (editorin 0/0 ei riitä).
  Kuitattu 211:een: kujaportti v43 (31b8633a4), lautaspöytä 8380aceca (pari omistajalle vasta räystäskameran kanssa;
  tarkista turkoosi pystytanko). kuja40-pk3-210 odottaa kujapäätöstä.
- LR: tausta-v51 (aukion kiilat pois) KUITATTU JU:lle 211:een (vie TF:n jälkeen). Jäljellä pieni siru portaiden edessä → v52.
  Kujat 02/05 ehdotus 2 (NUI mitannut leveys.py:llä, < 10 %): 02 väylä 4,7 / muurit 6,6 m, 05 noin 6,8 m. Reunaporras
  oliivi → vaalea kivi, sitten kolmikot PT:lle → KK:lle KYSYMYS (kumoaa 11.32:n 7,7/10,7; virhe oli NUI:n mittauksessa).
  Ei ämpäriin ennen omistajan sanaa. Sen jälkeen salin leivonta 1,6 × + kohina pois.
- VS (nollattu 13.29, luovutus 7a4881ab0): täyttö 0,3 / kerroin 1,25 HYVÄKSYTTY; ehdot: pylväiden kohina pois, kaukokaton
  kultasotku, ei mustia. 05 lattia 175 < 193 avoin (arvioidaan kujapäätöksen jälkeen). Katot ylhäältä liian keltaiset → mittari.
- NS: runko be6cf0048 (räystäs) talteen; 211-haara natiiviseppa/juna-211. NUI 00e40f06a (leveys.py) 211:een.
- KS: elävä kartta, vaihe 1 suunnitelma.

## 3. ODOTTAA OMISTAJAA
- Kujien 02/05 leveyskysymys (kun LR:n värikorjatut kolmikot tulevat).
- Myöhemmin: ajurin levylupa (ei kiireellinen).

## 4. Opit (lokissa)
- 13.27: kuva tarkistetaan omistajan sanoja vasten kokonaisuutena (päällekkäiskuva), mittaluku on vain yksi kohta.
- Editorin 0/0 ei vastaa laitetta: kamerakorjaukset kuitataan vasta LT:n laiteajon jälkeen.
