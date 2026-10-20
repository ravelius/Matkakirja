# Julkaisijan luovutus 20.10.2026 klo 17.50 (tilinvaihto, omistaja 17.49)

Vain voimassa oleva tila (omistaja 15.11, Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -40).
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit `mcp__ccd_session_mgmt__send_message` session-id:llä.

## 0. TILA NYT
- **Käännökset:** ei omia käynnissä (L1 + L2 vapaat). NS kääntää itse L1:llä runkoa 208 **747f421ba** (edellinen vihreä e3cff21f6 17.45).
- **Simut:** ei yhtään käynnissä, simujono TYHJÄ. Ei omia vahteja/taustaseurantoja (kaikki päättyneet).
- **Juna 208:** EI TF:ää ennen PT:n viestiä "OMISTAJA PYYSI JULKAISUA" (omistaja 09.47). TF 207 valmis kokonaan.
- **Avoimet PR:t:** Julkaisijalla ei omia avoimia PR:iä (listan #5048/#5020/#4945/#4837/#4770 ovat muiden roolien).
- **Ämpäri tänään:** viimeisin taidemuseo-ranska-v2r (31, 0 virhettä). Työkalu `vie-paketti.sh <_valmiit/…-vienti-…>`.

## 1. VOIMASSA OLEVAT JONOSÄÄNNÖT
- **Simu vain** (omistaja 11.45/11.47): uusi tekniikka (varjostin/valaistus, ohjaus/kosketus, puhelimen toiminnot, suorituskyky/muisti, käännösputki), omistajan erikseen pyytämät kuvat, yöjunan laitekierros + muistiajo. UI-muutokset EIVÄT (PT 16.1x). Epäselvä → kysy PT:ltä, käännä silti.
- Omistajan odottamat aina ensin. Raskaat (Pariisi/Tukholma/Olavinlinna) 1 kerrallaan, muisti ≥ 20 %. 2 simupaikkaa sallittu (linna tauolla).
- fps-mittaukset (PK): ei käännöksiä rinnalla, kuorma < 8–16 (PK kertoo rajan). Kuorma `uptime`.
- Rooli lähettää uuden shan: jos vanha vielä **lukkojonossa** → vaihda (kill skripti + proto-kaanna-pid). Jos **käännöksessä** (kaannospalvelu-loki olemassa) → ei tapeta, uusi ERI KANSIOON (…b-app). PT voi käskeä keskeyttämään → tapa koko puu omilla pid:illä (kids-funktio), poista kuollut lukko vain jos `kill -0 pid` epäonnistuu.
- **Laitekäännökset (fyysinen iPad Pro 13) → NS:lle** (laite208-ketju). `proto-kaanna.sh` tekee vain simukäännöksiä. Fyysinen iPad vain NS:lle ja omistajalle; LT vain KK:n vahvistuksella (PT 12.38).
- Levy < 70 Gi → vain 1 käännös simujen rinnalla. Muistuta "omat appit ≤ 2".
- Simuohjeet roolille SIMU NYT -viestiin (kun runko sisältää): salanappi f8c0bc0ce → `xcrun simctl openurl <UDID> matkakirja://testi/monalisa` (sokkelo, peli/<id>, linssi/<id>) tai `ui testi monalisa`; avaus-208 → `ui juoksupeli v4` (9,8 s avauslento), vanhoissa ensin `ui juoksupeli avaus 0`.

## 2. KÄÄNNÖSKAAVA
Skripti `julkaisija-tyokalut/<rooli>-<aihe>-kaanna.zsh` (PROTO_LINJA, PROTO_APP_KOPIO, `proto-kaanna.sh <sha>`, lopuksi `echo "L$PROTO_LINJA VAPAA"`), `nohup … > <nimi>.log &; disown`, tausta-until-grep VAPAA → KÄÄNNETTY + app-polku roolille → SIMU NYT (jos sallittu) → SIMU VAPAA. Tarkista sha ensin: `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos log -1 <sha>`. L1-lukko /tmp/matkakirja-kaannospalvelu.lukko, L2 …-2.lukko; L2-projekti Matkakirja-proto-linja2 (sim.log tulokset/-kansiossa varjostintarkistuksiin).

## 3. _tyo/julkaisija
Jäljellä: museo-spotti-209b-app, museo-kohdevalo-app (VS, ajettu/tarkistettu – voi poistaa kun VS kuittaa), vanhemmat kk-vesi/louvre-valo/pinnat/syvyys-vesi3 (VS:n, kysy ennen poistoa), simu-runko-206, burst-tyhjat-20261019.
