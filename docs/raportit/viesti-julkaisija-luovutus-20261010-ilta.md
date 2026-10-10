# Julkaisijan luovutus 10.10.2026 ilta (~19.00, PT:n nollauskäsky)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista: `julkaisija-tyokalut/pidossa.txt`.
Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)". Viestit hänelle vain valmis erä, jumi tai kysymys (≤ 8 riviä). Ei kortteja.

## 0. Tila 19.00

- **TF 179 VALMIS iOS + Mac (sisäinen):** BUILD 179 = 75fcc2b1b938024696affccf4bdad48ceee22de1 (juna/b13 45b93a2e0),
  iOS VALID e082f865 (TF 38062505058, sisäinen 38063384224), Mac VALID 59b06213 (38063677637). Muutosloki #4363 89d688468.
  TF 178 valmis aiemmin (iOS 834278eb, Mac 82c7a246). Ulkoinen ohitetaan aina (ulkoinen-kielletty + tfN-ei-ulkoista).
- **Juna 180 kertyy.** TF 180 vasta omistajan/PT:n luvalla. Resepti: muistiajo-180.txt (OK … tai EI-MUISTILISAYSTA <peruste>),
  tf180-ei-ulkoista, muutosloki-api.sh 180 "<≤3 lausetta, ≤280 mrk>" → tf-kaynnista.sh 180 <BUILD-SHA> <muutosloki-merge-SHA>
  (käynnistää itse ketjun tf180.sh setsidillä – ÄLÄ käynnistä toista), Mac: Natiivisepän mac-kaanna.sh → `gh workflow run
  proto3d-mac-testflight.yml --ref main -f build=180 -f lataa=true -f sisainen_ryhma=true`. Tarkista VALID-id:t eri alustoille.
- **#4364 (PT Raamattu + loki + asemataulu) merge-vihreana taustalla** (setsid, loki julkaisija-tyokalut/merge-4364.log,
  head 215d6c048). Kun MERGED → rivi PT:lle. Worktreen fable-raamattu-1010e poistaa PT itse (ei poistoja oman työtilan ulkopuolelta).

## 1. Avoimet vuorot 19.00

- **Lukossa:** LS2 linssiseppa2/peking-vesikerroin 2c2305012 (18.55) → seuraavana **Siirtoseppä diag-kivet e58cae09d** (DIAG,
  proto-kaanna jonottaa itse).
- **Simussa:** LS1 museo-varjot-180 (e14cbfb70, 0b2db5829) iPad 00CF62C2 + iPhone D0D2CD1E ~19.10 asti.
- **Simujono:** LS1 → **Siirtoseppä 8362879F rantakivikoe 5 (~6 min)** → **LS2 A26BC7D0 + 8D1FD618 omistajan Peking-kuvasarja
  (~15 min)**. Myöhemmin LS1:n iPad Pro 13 (00008103) Release-mittaus (muisti + fps), pyytää erikseen.
- Päivällä ≤ 2 simua. Simu saa pyöriä käännöksen rinnalla. Vahti: `pgrep -f … >/dev/null || perl … simu-muistivahti.zsh <UDID> 16`.

## 2. Tänään tehty (illan osuus)

- Mergetty: #4344 (+ Julkaisijan niputuskorjaus 680e9ce2e), #4347, #4349, #4350, #4351, #4352, #4353, #4354, #4355, #4357,
  #4358, #4360, #4361, #4362. Sisältöpaketti nyt **v654** (skeema 1.61, paakaupungit 118 + kuvat).
- Viety: Pulu NOR/SVK/SVN/BEL/ISL/BIH/LUX/MLT (maat.json 33 maata), omat mallit **v6k14** + uusin-4 → v6k14,
  Pekingin vesiväri (vesi/vari-v1/vesivari-kaudet.json korvattu, vanha .ennen-peking-20261010), taidemuseo-sali-v2,
  puut-vienti (kartta/puut/v1/).
- **merge-vihreana-sha.zsh <PR> <täysi SHA>** uusi työkalu: odottaa CI:n, squash + --match-head-commit, 3 uusintaa
  "Base branch was modified" -kilpailuun. Aja perl setsidillä (loki merge-<PR>.log). ÄLÄ muokkaa skriptiä ajon aikana.
  "Head branch was modified" → PR:n tekijä pushasi, käynnistä uudella SHA:lla.
- Uudet: omat-mallit-paketti.zsh (LS2:n työkansio → _valmiit/omat-mallit-vienti-<pvm><kirjain>), korvaa-vesivari-peking-20261010.zsh.

## 3. ÄÄNISIVU (uusi pysyvä vastuu, omistaja 18.2x)

- https://matkakirja-aanet.pages.dev/ – Cloudflare Pages -projekti matkakirja-aanet + Access-sovellus "Matkakirjan äänet"
  (vain samireivinen@gmail.com, kertakoodi, 30 vrk). Korvaa jaetun artefaktin Qr7WvfZvKiNxGNwbFEeW2t (toisen tilin omistama).
- Lähde /Users/Shared/Claude/aanisivu-sivusto/ (ei repoon; ostettuja tehosteita – ei koskaan julkisesti). 489 mp3 + 6 mp4, Musiikki 112.
- Työkalut julkaisija-tyokalut/: aanisivu-lisaa.py (roolien yksi komento), aanisivu-julkaise.zsh (keskeyttää ilman Accessia,
  tarkistaa 302:n jälkeenpäin), aanisivu-cf-luo.zsh, ohje aanisivu-OHJE.md. SUOJAAMATON-rivi → korjaa heti (Access ennen sisältöä).

## 4. Muistettavaa

- Pääkaupunkien Codex-kuvat: luettelon tekee Karttaseppä (kuvat-hyvaksytyt.json, 342/171), Julkaisija vie paketin. 30 hylättyä
  objektia ämpärissä jäävät luettelon ulkopuolelle – ei poisteta.
- Muutosloki: PT:n teksti tiivistetään validaattorin rajaan (3 lausetta, 280 merkkiä) ja kerrotaan PT:lle rivillä.
- Kielletyt tavat: ei zsh -c/eval, ei rm muuttujapoluilla, ei pkill -f laajoilla kuvioilla, ei poistoja oman työtilan ulkopuolelta.
