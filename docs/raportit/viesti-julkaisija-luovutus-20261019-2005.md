# Julkaisijan luovutus 19.10.2026 klo 20.05

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120). Edellinen: `viesti-julkaisija-luovutus-20261019-ilta.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Viestit `mcp__ccd_session_mgmt__send_message` id:llä. Levy 117 Gi, kuorma ~35–50.

## 0. TILA
- **Kaksi linjaa käytössä** (PT 20.0x: kuorma vapautettu, kevyt-lippu pois). Yksi linja jos 5 min kuorma > 100 (PT).
- **Valovahti TAUOLLA** (`/tmp/matkakirja-valovahti-tauko`, JU 18.58): vei kahdesti L2:n käsijonon edeltä. Pois tauolta vasta kun pidossa-lista on läpi: `rm /tmp/matkakirja-valovahti-tauko`.
- **Olavinlinna tauolla** (omistaja 17.05).
- GitHub Actions oli häiriössä 18.56–19.29; nyt jakaa.

## 1. JUNAT (OMISTAJA PYYSI JULKAISUA: 204 klo 19.06, 205 klo 19.02; ei Laitetestaajaa eikä muistiajoa)
| juna | iOS TF | sisäinen | ulkoinen | Mac TF |
|---|---|---|---|---|
| 204 (BUILD bad614bec, M 394a699ec) | 39284541401 ✓ 19.46 | ✓ 19.47 | **odottaa sisältövientiä ⊇ 394a699ec** (Actions-jono) | 39285087862 ✓ |
| 205 (BUILD daf1fec08, M 76c629d1c) | 39289399060 ✓ 20.00 | 39290397257 käynnissä | ketjussa | 39289606231 **in_progress** – seuraa |
- Ketjut irrotettuja (ppid 1): `tf204.sh` pid 87683 → tf204-ketju.log, `tf205.sh` pid 87247 → tf205-ketju.log. Ne hoitavat sisäinen → vain-arvio → vienti → ulkoinen → vanhennus.
- **Asemataulu** https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy, `talo/eteneminen` = Juna 205, 4/5 matka (v64). Päivitä get → update if_version: 5/5 kun sisäinen valmis → tila "Testaajilla". 204 näytettiin 5/5 Testaajilla (v59) ennen 205:tä.
- Ilmoita PT:lle (local_8d8ebf72-…) TF valmis 204 ulkoinen, 205 sisäinen/ulkoinen, Mac 205. Tavoite 205 TF:ssä 22.30–23.00; lipsuminen heti PT:lle.
- VIRHE (opittu): 19.10 käynnistin TF 204:n runko-shalla ennen NS:n BUILD-committia → peruttu (39283070701, ei IPA:ta). **TF vain NS:n BUILD-shalla.**
- Paikallinen TF-varasuunnitelma EI mahdollinen: ASC-avaimet vain GitHub-secreteissä (kerrottu PT:lle).

## 2. KÄYNNISSÄ NYT (irrotettu nohup)
- **L1:** VS juoksu-valo k2 b6a99aad4 (206) `vs-juoksuvalo2-205-kaanna.zsh` pid 2280, alkoi 20.01 → _tyo/linssiseppa2/juoksuvalo-app → KÄÄNNETTY + SIMU NYT VS iPad + iPhone ~15 min.
- **L2:** vapaa.
- **Simu:** PK 206 juoksupeli 10f80d13c (_tyo/julkaisija/juoksupeli-206-app) SIMU NYT 20.05 → odota SIMU VAPAA.

## 3. PIDOSSA (`julkaisija-tyokalut/pidossa-juna205.txt`, skriptit valmiina – vaihda until-rivi `true`:ksi tai edellisen lokiin ennen nohup-käynnistystä)
Käynnistä kun 205 sisäinen valmis (PT: muut odottavat 205:tä):
- L1: ls-opas-kuvaraita-204 (LS 3b572a319) → nui-aarrevideo-204 (NUI 304b84312) → nui-aarnin-kolme (NUI b8fdc5e4e)
- L2: vs-rakettivideo-204 (VS 88f708220, **simu vasta YÖLLÄ**, omistaja 18.55) → vs-pimennys-k6 (c2420def7) → vs-tulivuoret-k13 (6982e542a) → pk-raketti-auto-204 (PK 8eb6e1945)
- NUI varjostimet d316b7387 (ei skriptiä; → _tyo/julkaisija/juna204-varjostimet-app, iPad ~4 min; sitten 2. käännös kokoelmatiedostolla)
- PK raketti-Mac valmis: _tyo/julkaisija/raketti-mac-app (PK tallentaa kun omistaja poissa ≥ 5 min).

## 4. Tänään illalla viety (vie-paketti.sh, 0 virhettä)
aarrekuvat-manta-raiatea (2), juoksupeli-esteet-v1 (4), juoksupeli-kerattavat-v1 (3), juoksupeli-aarteet-v1 (10). Sisältöpaketti v809 (PR 4984, 592bb6a9d).

## 5. Opit
- **Keskeytetty käännös voi jättää tyhjiä Burst-hashtiedostoja** (L2: `Library/BurstCache/iOSSimulator-Arm/Hashes/*.bhc` 0 t) → "EndOfStreamException … GPUDriven.Runtime" joka kerta. Etsi `find <kopio>/Library/BurstCache -type f -size 0` ja siirrä pois (talteen _tyo/julkaisija/burst-tyhjat-20261019/).
- Keskeytä käännös tappamalla Unity-lapsi (unity-vahti) → proto-kaanna päättyy VIKA:lla ja EXIT-trap siivoaa. Tapa ensin odottaja-skripti, ettei seuraaja käynnisty.
- Valovahti nappaa vapautuvan linjan minuutin sisällä → pidä tauolla kun käsijono on täynnä.
- Kaksi Mac-käännöstä eivät voi ajaa rinnakkain (sama Matkakirja-proto-mac/Build/mac) → kopioi .app talteen ennen seuraavaa.
- todistusajo.sh on gitissä 100644 → kutsu `zsh $AJO` (Työkaluseppä tekee mode-commitin).
- `simutauko.zsh` varaa molemmat lukot kevyelle simulle (`touch /tmp/matkakirja-simutauko.pois` vapauttaa, max 25 min).
