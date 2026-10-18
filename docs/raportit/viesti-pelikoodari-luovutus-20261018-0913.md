# Pelikoodarin luovutus 18.10.2026 klo 09.13 (KOVA RAJA, Postivahti)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto. Id:t /Users/Shared/Claude/osoitekirja.md. Edellinen luovutus -20261018-0547 (610291886).

## Lue ensin
CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. PT:lle ≤ 3 riviä. Kuvat täysikokoisina ennen lähettämistä. Ämpäriin VAIN
Julkaisijan vie-paketti.sh:lla (ei aws s3 cp). Ei rm:ää (PT 08.4x).

## ENSIN 1) LAINAUSMERKIT PUHEAVAIMISSA → PR #4860 (PT:n erä junaan 202; SK odottaa)
- Haara pelikoodari-lainausmerkit, worktree /Users/Shared/Claude/wt/pelikoodari-lainausmerkit, **fba209a2d**, PR
  https://github.com/ravelius/Matkakirja/pull/4860 (npm test 5552/5552 paikallisesti; CI ei ollut vielä alkanut 09.0x).
- Sisältö: js/lainausmerkit.js (” “ „ → ", ’ ‘ → '); js/puhe.js muisti- ja säilöavain normalisoituna + varahaku raa'alla;
  tools/pollo/worker.js puheenAvain normalisoitu + puheenAvainRaaka (reuna ja R2 varahaku); js/liviapuhe.js livianTiiviste normalisoitu,
  livianTiivisteRaaka + livianTiivisteTasmaa (livianAaniAjanTasalla, generoi-pulu aanitteenTila); sw.js SHELL; tests/lainausmerkit.test.mjs;
  livia-aani-testin kaksi tiivistevertailua Tasmaa-funktiolla. generoi-pulu --kuiva: 0 muuttunutta, ei generointia.
- Pyydetty JU:ta (09.0x) mergemään vihreänä. SEURAAVAKSI: merge-sha → yksi rivi SK:lle (local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3) ja PT:lle.
  Jos CI punainen: korjaa samaan haaraan.
- LISÄYS 09.1x (JU): #4860 on junan 202 web-joukkoa → merge pidossa julkaisuun asti, ellei PT vahvista "merge nyt"; JU ilmoittaa sha:n.
  Kerro SK:lle odotuksesta, jos PT ei vahvista.

## 2) ÄÄNIKARTAT LONTOO, PRAHA, ATEENA (PT 08.4x, juna 202; Siirtoseppä kytkee)
- Ämpärissä 404 (tarkistettu 08.4x; HUOM CDN voi välimuistittaa 404:n → tarkista myöhemmin ?t=-parametrilla).
- Ajo tools/aanimaisema/tee-aanikartta.mjs → paketti /Users/Shared/Claude/proto-3d/_valmiit/aanikartta-lontoo-praha-ateena-vienti-20261018/
  aanet/aanikartta-v1/: lontoo.json ja praha.json VALMIIT, ateena kesken (katkeaa session mukana). Overpass-välimuisti
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/aanikartta-valimuisti → uusinta on nopea:
  `node tools/aanimaisema/tee-aanikartta.mjs --kaupunki ateena --lat 37.9755 --lon 23.7348 --sade-km 5 --ulos <paketti> --valimuisti <välimuisti>`
  (lontoo sade 6, praha 50.0875/14.4213 sade 5; Pariisi ämpärissä 120 × 120 = sade 6).
- SEURAAVAKSI: ateena valmiiksi → SHA256SUMS + LAHTEET.md (© OpenStreetMap contributors, ODbL; malli _valmiit/vesi-praha5-vienti-20261015)
  → JU ajaa vie-paketti.sh → tarkista ?t= → Siirtosepälle (local_c264506b-dd61-4617-839f-23daf6d0bd5a): aanet/aanikartta-v1/{lontoo,praha,ateena}.json
  ämpärissä (PalloAanimaisemaSoitin: katu/vanhakaupunki → Korvaa, kun kartta on) → sha/polku PT:lle.

## VALMIIT TÄLLÄ VUOROLLA
- ISS-pöytä luonnos 5 HYVÄKSYTTY junaan 201 (PT 07.5x): 5d7f1daca (pöytä kiinni alareunassa; Juuri.style.bottom isän erosta). Kuvat
  proto-3d/lokit/todistus-iss-poyta5-201-k6b-{iphone,ipad}-20261018-0733 (iPad: kuva-arkki-teksti-alla.png). Skenaarioissa LCD-napautus
  koordinaattina (tap 281 800 / 594 1304) ja P5 kirjaa alapisteen. LCD = aseman alapiste, etsin = katsepiste (PT:lle kerrottu; jos LCD:n
  pitää näyttää katsepiste, se on PT:n uusi päätös — ei vastausta vielä).
- Galleria arkki 5b 45dbf6b20 (nappulalle yksi tumma jalkasoikio, pallon varjo korin alle, LS:n pyramidisoikio) → simu c7bd33bd OK, kuitattu
  LR:lle 08.3x (todistus-galleria-arkki4b-200j-20261018-0822).
- "ISS-ohjainpaneeli väljemmäksi" = luonnos 5, jo junassa 201; ISS-kertojan -2-otot jo junassa 202 (Siirtoseppä d7bebb546 + 66c1f6fdf).
- Siivous: _tyo/pelikoodari 8,7 → 2,2 G, masterissa olevat proto-worktreet pois (cupola-suoja, juoksupeli, juoksupeli-pelit, iss-poyta-201).

## Worktreet
wt/pelikoodari-lainausmerkit (PR #4860), wt/proto-pelikoodari-galleria (arkki 5b, LR:n kuittaus), -esikatselu (tauolla),
-tivoli-vapaa-lento-200 + wt/pelikoodari-vapaa-lento-osio (Tivoli tauolla), wt/pelikoodari-posti.
