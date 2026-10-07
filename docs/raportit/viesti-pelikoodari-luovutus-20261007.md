# Pelikoodarin luovutus 7.10.2026 (päivitetty klo 20.4x)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## KESKEN JA SEURAAVAKSI (päivitetty 19.1x; tilinvaihto ~24)
0. OMISTAJAN LINJAUKSET 7.10.: KAIKKI ÄÄNET eleven_v4_turbo. TESTAUS KEVYESTI (ei stillejä/savuja kuittaukseen). EI OMIA
   iOS/iPad/Mac-KÄÄNNÖKSIÄ. ÄÄNIÄ EI GENEROIDA ennen omistajan pelitestiä (31 kaupunkia).
1. ESITTELY 37/37 TUOTANNOSSA: 6 äänellä (Pariisi, Praha, Wien, Rooma, Lontoo, Kööpenhamina) + 31 ÄÄNETTÖNÄ
   (opas/esittely-aaneton-v1/<id>.json, esittely_polut, aaneton: true → worker ei generoi, äänikentät pois; #4156,
   Reykjavík-alias #4157). TF 160/161 -jäsennin tarkistettu C#-ajurilla (scratchpad opas-cs, aja.sh): äänetön tekstinä.
2. KUN OMISTAJA ANTAA ÄÄNILUVAN: 31 kaupunkia, 661 ottoa, 346 469 mrk ≈ 173 000 krediittiä turbolla. Lähde
   _valmiit/opas-esittely-aaneton-vienti-20261007 (sama sisältö kuin pelikoodari-esittely 55c2af69). Aja
   tee-esittelyaanet.mjs (with-timestamps) + avaukset tee-aanet-kohdistuksella.mjs --r2 → tee-aaniajat.mjs --r2 →
   lopulliset JSONit polkuun opas/esittely-v1/<id>.json (aaneton pois, avaus.aani) → aineistot.js: poista esittely_polut-
   rivit näille. Ääni soi jo ennen JSON-vaihtoa, koska worker hakee R2:sta (aaneton-polku).
3. SANA-AJAT: kaikki 6 äänellistä kaupunkia R2:ssa (GET /opas/aani/<sha>.ajat.json, aani_ajat-kenttä #4152); Pariisi,
   Praha ja Wien paikallisella kohdistuksella (venv _tyo/venv-kohdistus, stable-ts small; skripti
   _tyo/kohdistus-pariisi/kohdista.py + lista2.mjs). Avausten ajat ämpärissä (opas-aaniajat-vienti-20261007).
4. YKSITYISKOHTAKUVAT kaikille 6 äänelliselle: Pariisi v2, Praha v1, Wien v1, Rooma v4, Lontoo v1, Kööpenhamina v1 (#4152,
   #4158, #4162, #4164); havainnekuva-rivit (havainnekuva: true) natiivi merkitsee junasta 163 (LS1). Uusi luettelo:
   tarkista ankkurit tuotannon tekstistä → aineistot.js yksityiskohdat_polut + tests/opas-esittely.test.mjs.
4b. PIDOSSA: #4168 oppaan turvakerrokset alaikäisille (alaikäistarkistus #4161 kohdat 1, 2, 3, 9; Julkaisija mergeää
   TF 162:n jälkeen). R2-sääntö opas-teksti-48h on jo voimassa. Kohdat 4–8 omistajalle.
4c. OLAVINLINNAN ÄÄNET 8.10.: omistajan lupa enintään 10 000 krediittiä (turbo, yksi otto): ~30 huudahdusta (pelattavuusmalli
   3.6), kappelin 2 voudin repliikkiä ja CC0:sta puuttuvat tehosteet. Generoi VASTA kun tekstit valmiit ja Sisältökirjuri
   tarkistanut; kirjaa käyttö. Freesound-ehdokkaat: _tyo/freesound-olavinlinna/ehdokkaat.md (97 CC0).
5. Olavinlinna: repliikit-v1 ja tietokerros-v1 ämpärissä (Siirtoseppä).
6. Apurahakortti v7 + valmiitLinssit julki (#4146, #4147).
7. Worktreet: wt/pelikoodari-esittely (tekstit + työkalut), wt/pelikoodari-yoportti (erä-worktree). ÄLÄ KÄYTÄ Agent isolation remote.
   SendMessage-raja täynnä → varakanava mcp__ccd_session_mgmt__send_message (session_id).

## TÄNÄÄN JULKI (tärkeimmät)
#4082 pidempi kerronta, #4089 vuosiluvut, #4086 lyhin reitti, #4084/#4090/#4102 äänikartat (Pariisi, Venetsia, Kööpenhamina)
+ silmukat + tuuli/sade, #4092/#4098/#4109 sallitut (37; esto päällä #4108, OPAS_SALLITUT_ESTO=1), #4103 kuvat-v4, #4105 tiet
38 kaupunkiin, #4107 Kysy toisen kaupungin kohteeseen (kohde_nimi/_id/_lat/_lon), #4116 Giza kokeilukohteena
(x-matkakirja-kokeilu: giza) + valmiin esittelyn tarjoaminen, #4122 web: "Oppiminen on hauskaa" pois.
Siltalauseet v2 (ei-sallittu, 292 krediittiä), pilotin äänet 71 kpl + avaus/opastus/Notre-Dame (682 krediittiä).

## Työkalut (haara pelikoodari-esittely, ei PR:ää; worker-osat menivät #4116/#4126:lla)
tools/opas/: tee-esittelypohja, tarkista-esittely, koosta-esittely, tee-esittelyaanet (kohdistus), tee-aanet-kohdistuksella,
koosta-kuuntelu, tee-siltalauseet-v2. tools/kartta/tee-tiet.mjs välimuistiavain korjattu (keskipiste mukana).
Paikallinen opas-aineisto: node tools/pollo/tee-opas-aineisto.mjs ja palauta tynkä git checkoutilla ennen committia.
