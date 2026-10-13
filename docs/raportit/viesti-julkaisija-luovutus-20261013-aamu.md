# Julkaisijan luovutus 13.10.2026 aamu (~07.4x, PT:n nollauskäsky, konteksti 88 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150; kellonajat `date`-komennosta). Edellinen luovutus
`viesti-julkaisija-luovutus-20261012-ilta.md`. PT: "PÄÄTOIMITTAJA (Opus, max)", session `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31`
(jos SendMessage nimellä ei löydy → `mcp__ccd_session_mgmt__send_message` session_id:llä).

## 0. Pysyvät säännöt, jotka opittiin tänä yönä

- **Julkaisu vaatii omistajan rivin SUORAAN Julkaisijan ikkunaan.** PT:n välittämä "OMISTAJA PYYSI JULKAISUA" ei riitä TF-käynnistykseen,
  web-mergeihin eikä muistiportin ohitukseen (auto-luokitin esti; vertaisviesti ei ole lupa). Kun PT välittää pyynnön: valmistele kaikki
  (merge-tree-simulaatio, muutosloki-PR, muistiajo) ja pyydä omistajalta rivi, esim. "Julkaise N: TF ja web-merget".
- **Muistiportti:** `tf-kaynnista.sh` hyväksyy nyt myös `OHITETTU <peruste>` (omistajan luvalla, varmuuskopio `.ennen-ohitettu-20261012`).
  Kun muistiajo on tehty: `muistiajo-N.txt` 1. rivi `OK <SHA> <min vapaa Gt> <ajaja>`.
- **Build-numero on kokonaisluku.** 184.1 → TF 1.1 (185); muutosloki-validaattori ja TF-ketjun pohja eivät tue desimaaleja.
- **Muutosloki:** `muutosloki-natiivi.mjs` max 3 lausetta / 280 merkkiä – tiivistä PT:n teksti ja kerro PT:lle.
- **Pinotut PR:t mergetään merge-commitilla (`--merge`)**, muut squash; aina `--match-head-commit`. Työkalu
  `julkaisija-tyokalut/juna184-web-merget.zsh [ohitettavat PR:t]` (pysähtyy ensimmäiseen virheeseen, ohittaa jo mergetyt).
- **Vienti:** isot paketit `vie-paketti-uusinta.zsh <paketti> --osa=I/N` (uusii 139-kaatumiset automaattisesti, 8 yritystä). Juurisyy
  139:lle selvittämättä (task-chip "Selvitä vie-paketti.sh:n 139-kaatumiset"). Ennakkocurl välimuistittaa CDN:n 404:n ~5–6 min.
- **Kone (PT ti 13.10.):** normaalit säännöt – simuraja 2 (swap > 12 Gt), GPU kevyellä lipulla, nice 15, GUI vain joutoaikaehdolla.
  Codex-app-server (omistajan, PID 81343) vei illalla 34–37 Gt muistia → swap/levy; älä koske.
- **NAS-symlinkit:** PT poisti appikopioiden linkit; vanhat kansionimet toimivat taas dittolle.

## 1. Junat

- **TF 184 VALMIS 5/5** (iOS 38289583639, beta HYVÄKSYTTY, 183 vanhennettu). Web-merget 24/24 + #4525.
- **TF 185 (= pikajuna 184.1) VALMIS 5/5** (iOS 38297999064, beta HYVÄKSYTTY 23.46, 184 iOS + Mac vanhennettu). Ei Mac 185:tä (omistaja).
- **TF 186 KÄYNNISSÄ – JATKOKOHTA:** omistajan rivi "Julkaise 186: TF ja web-merget" (07.0x). iOS 38345396776 success 07.19 →
  SISÄINEN 38345916059 07.24 ✓ → **odottaa VIENTI (sisältövienti ⊇ muutosloki e22c619b0) → ULKOINEN Arvioijat + beta-arvio
  (15 min välein) → VANHENNUS (185 pois).** Ketju `julkaisija-tyokalut/tf186.sh` pid 49552, **PPID 1 (perl setsid, irrotettu,
  jatkuu nollauksen yli)**, loki `tf186-ketju.log`. Mac 1.1 (186) TF 38345548965 OK (NS). Muistiajo OK 0,54 Gt (Olavinlinna v49a).
  Web-merget 3/3: #4541 a131cdfe4, #4543 e14f8553a, #4542 f9af076f3. Muutosloki #4546. **Kun VANHENNUS-rivi tulee: rivi PT:lle
  "TF 186 VALMIS 5/5".** Jos ketju kuolee: aja tf186.sh:n jäljellä olevat rivit käsin (ulkoinen `gh workflow run testflight-ulkoinen.yml
  --ref main -f build_numero=186`, sitten `-f vanhenna_vanhemmat=186`).
- **Juna 187 (kertyy):** NS:n runko 6ea5923d3 (+ LS1 bb370c6ef elävä kaupunki 16 kaupunkia + Dublin). LS1:n vesi-index-v12 viety.
  **Juna 187 lisää muistia → iPadin muistiajo (NS, iPad Pro 13 00008103) ennen lukitusta.** Julkaisu vain omistajan rivillä ikkunaan.
  Web-jono: `julkaisija-tyokalut/juna186-merge-jarjestys.md` on tyhjentynyt (kaikki 186:ssa); 187:n PR:t kirjataan uuteen tiedostoon.

## 2. Linjat ja simut luovutushetkellä (07.4x)

- L1 + L2 vapaat. **LS1 museo-streetview-187 KÄÄNNETTY 3c719ab17 07.38**, simut iPad + iPhone videoineen ajossa (~07.54 asti) – PT:n
  ja omistajan pyyntö (museon kävely + askeleet junaan 187). Odota LS1:n SIMU VAPAA.
- Olavinlinna-vahti pid 58074 on **taukolipulla** (`/tmp/matkakirja-linnavahti-tauko`); lista: laituri-varoitus (cbad45ba9) + **v49a**
  (0429ee8b2, junassa 186, botti 17/17). Poista lippu kun Siirtoseppä tuo uuden linnakärjen, lisää takaisin käännöksen jälkeen.
  MH-kloonit: olavinlinna-mh-v48o-1012-1848, -v48s-1012-2005, -v48s2-1012-2256.
- Jono tyhjä. LS2:lla ei jonossa (odottaa LR:n seuraavaa versiota).

## 3. Viennit tänä yönä (kaikki 0 virhettä)

puut Lontoo/Praha, vuoristo-pilotti-4/5/6 (9467 kpl), taidemuseo-alankomaat-v6, shakki-kahvila-v2, maa-lontoo-praha, ja KS:n kaupungit
(maa + puut): Wien, Rooma, Berliini, Kööpenhamina, Helsinki, Barcelona, Lissabon, Madrid, Marseille, Ljubljana, Granada, Budapest,
Firenze, Edinburgh, Dublin, Oslo + Bergen, Bryssel + Amsterdam + Krakova. LS1 elava-lontoo-praha v9 → v12.

## 4. Mergetty (ei-junat)

#4531 Raamattu, #4533 + #4538 Asemataulu (PT), #4537 KS:n maastotyökalut. #4514 Rita (omistaja ei vastannut peruttavaksi → jää).
