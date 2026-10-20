# Julkaisijan luovutus 20.10.2026 klo 10.47

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -40). Edellinen: `viesti-julkaisija-luovutus-20261020-0705.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Viestit `mcp__ccd_session_mgmt__send_message` id:llä (SendMessage-raja täynnä tässä ikkunassa).

## 0. TILA (ENSIN)
- **TF 207 VALMIS KOKONAAN**: BUILD 7ffa2ed9a (runko f3e77a5fc), muutosloki 62693d53f (#5024), muistiajo OK 1,85 Gt (NS). iOS 39376168926 08.53, Mac 39375751988 08.42, sisäinen 08.58, vienti 39374580133 09.04, ulkoinen 39378271488 09.10 (beta-arvio APPROVED), **206 iOS + Mac vanhennettu** 39378918959 09.11. Asemataulu talo/eteneminen **v77** (Juna 207 5/5), paikallinen json samaan. KK + PT ilmoitettu.
- **JUNA 208: OMISTAJAN PÄÄTÖS 09.47** "Julkaisi juna vasta kun minä sanon" → EI TF:ää ennen PT:n viestiä "OMISTAJA PYYSI JULKAISUA". Ei tf208-odottajaa käynnissä.
- **tf-ketju-pohja.sh = korjattu tf205.sh** (SKRIPTI=${0:A} ennen cd:tä + tyhjän B:n esto). Vanha pohja: tf-ketju-pohja.sh.ennen-skripti-korjausta. 208:lle: tee tf208-odota-muistiajo.zsh tf207-odota-muistiajo.zsh:n mallilla (BUILD-sha + M + muistiajo-208.txt NS:ltä).

## 1. KÄÄNNÖKSET KÄYNNISSÄ (nohup, irrotettu – kestävät nollauksen)
- L1: NUI yhd2 8822d872a (EI AJETA: sisältää VS:n valoerän, PIDOSSA omistaja 10.36) → sen perään **NUI nimet 208d 20dcfeb48** (`nui-juoksu-nimet-208d.log` → `_tyo/natiivi-ui/juoksu-nimet-208d-app`).
- L2: **VS louvre-varjo cea77010d** (`vs-louvre-varjo-208.log` → `_tyo/julkaisija/louvre-varjo-208-app`; SIMU VASTA PT:n SIGNAALISTA, omistaja näkee ensin Louvren oikeat kuvat) → sen perään **NUI yhd3 06b18b022** (`nui-museo-208-yhd3.log` → `_tyo/natiivi-ui/museo-208-yhd3-app`).
- Tarkista: `tail -1 /Users/Shared/Claude/julkaisija-tyokalut/{nui-juoksu-nimet-208d,vs-louvre-varjo-208,nui-museo-208-yhd3}.log`. KÄÄNNETTY-rivi → kerro roolille.

## 2. SIMUJONO
1. **PK** (local_11aca9cd-eda6-…) palatsi 208v10 60bdd9871 simulla NYT (SIMU NYT ~10.45). Odota SIMU VAPAA.
2. **NUI** (local_c6d63773-…): kun yhd3 + 208d KÄÄNNETTY → SIMU NYT: museo yhd3 (`museo-208-yhd3-app`) + 9 linssin stillit (`kertoja-napit-208-app`, valmis 10.30) + nimet 208d (`juoksu-nimet-208d-app`) samalla vuorolla.
3. **VS** louvre-varjo vain PT:n signaalista.
4. Jono tyhjä sen jälkeen.

## 3. Ämpäri tänään (kaikki virheitä 0, CDN 200)
kk-pohja v1/v1c/v1d/v1e, sokkelo-pinnat-v2, kielletty-tausta-v2 + v3, kielletty-rakennukset v6/v7/v8/v9/v10/v11, kielletty-kulmatorni-v1b, palatsi-esto-v1 (v1b-paketti). Yksittäiset json-viennit: `vie-kk-pohja-v1*.zsh` (sha-tarkistus + ei ylikirjoitusta).

## 4. Opit
- **CDN-404 välimuistiin**: älä curlaa julkista URL:ia ENNEN vientiä – Cloudflare välimuistitti 404:n ~3 min (palatsi-esto 09.56). Tarkista vasta viennin jälkeen; tarvittaessa `?t=` ohittaa.
- vie-paketti.sh hylkää: LAHTEET.md SHA256SUMS:ssa ("tuntematon tiedostotyyppi") ja LAHTEET.md ilman lisenssisanaa (PD/CC0/CC BY/MIT/oma/lisenssi). Pakettia ei muuteta itse → pyydä tekijää (uusi paketti nimellä, jos jo lähetetty).
- Saman kansion kaksi käännöstä rinnakkain → kilpailu. Ratkaisut: eri kansio (…-208e-app) tai väliaikainen kansio + siirto kun vanha valmis (pk-palatsi-208v9b-kaanna.zsh), tai odota molemmat lokit ennen rm:ää (nui-museo-208-yhd2-kaanna.zsh).
- Jonossa odottava (proto-kaanna lukkojonossa, ei omaa lokia kaannospalvelu-kansiossa) saa vaihtaa: pkill skripti + proto-kaanna-pid. Käännöksessä olevaa (loki olemassa) ei tapeta.
- PK/NUI/VS lähettävät usein uuden shan heti perään → älä aloita uutta jos vanha vielä lukkojonossa, vaan vaihda.
