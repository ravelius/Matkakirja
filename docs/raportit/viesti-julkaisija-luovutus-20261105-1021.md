# Julkaisija: luovutus 5.11.2026 klo 10.21 (Macin kello), konteksti noin 33 %

Rooli: Julkaisija (JU). Korvaa -0658:n ALOITA-osan; sen ja -0652:n, -2216:n OPIT voimassa. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt (lue 30 viimeistä riviä).

## ALOITA TÄSTÄ
1. Käynnissä, nohup, omat pid:t (ps | grep julkaisija-tyokalut):
   - iPad: PK-sarja T/pk-hajonta.zsh pid 87003 (9 lentoa + 2 juoksua; loki T/pk-hajonta.log) → NS ASTC T/ns-astc.zsh pid 87004 (T/ns-astc.log).
   - Mac L1: VS järvet T/vs-jarvet3.zsh pid 36942 (928242911 koe2b, nyk1b) → T/vs-jarvet4.zsh pid 38698 (d82f7e5ce koe1, koe2).
   - Mac L2 ja simut: NUI lippu 8be86170b, NUI:n oma ajo; NUI antaa rivin.
2. Monitor heti (ei cut-putkea, se puskuroi ja mykisti seurannan 5.11.):
   tail -n0 -F T/ns-astc.log T/pk-hajonta.log T/vs-jarvet3.log T/vs-jarvet4.log | grep -a --line-buffered -E 'EI RIVIÄ|NS-ASTC|VALMIS normaali|^AJETTU |PK-HAJONTA|VS-JARVET[34]|^VIKA|VIKA [a-zA-Z]|käynnistys yritys'
3. Rivit, kun valmista:
   - VS: kun kaikki neljä järviajoa ajettu: kansiot lokit/julkaisija-jarvet-928242911-{koe2b,nyk1b} ja lokit/julkaisija-jarvet-d82f7e5ce-{koe1,koe2}, ja Curl-aikakatkaisut ajoittain (lukee VS-JARVET4-rivillä; vs-jarvet3:lle: grep -a -i -c 'curl.*time\|timeout was reached\|timed out' <kansio>/unity.log, koe2:ssa 29, koe1:ssä 0). EI "ei sarjaa" -lukua: VS korjasi, se on kaikissa ajoissa. Älä katso sitä T/vs-jarvet3.log:n ei-sarjaa-sarakkeesta.
   - PK: pk-hajonta.log:n s1–s3- ja juoksu-rivit. Huippu tiedostosta muistivahti.log, ei muistivahti-tulos.txt:stä (PK). 789 s1 kelpaa, huippu 4127 Mt, ei uusita; 789:llä toinen lento jää aina mittaamatta (raja ylittyy).
   - NS: kansio lokit/natiiviseppa-normaali-astc-9ca48d7a2 (parit/ + kuvajako.txt) ja AJETTU-rivit.
4. PT:n käsky, heti kun PK-sarja on ohi (ei ennen, mitattava kärki ei saa vaihtua): cherry-pick a5323cf4e..0466e8495 (12 committia) haaraan julkaisija/runko-219-muisti (proto, natiivi-backup). Valosepän 694e1783a, e4180ac69, 7f64cd657 EIVÄT mukaan; PT:n sana riittää 5902b79bd:lle ja 9d2b17f31:lle. Ristiriidasta seis + rivi PT ja NUI. Ei TF:ää, ei vientiä. Rivi PT ja NUI: uusi kärki. Sama käsky kattaa NUI:n merge-pyynnön c5:stä. Haaran worktree: ei omaa (-koe-218 ja -runko-218 poistettu), tee väliaikaisessa omassa worktreessä sisäisellä levyllä.
5. iPad-jonoon tulossa: KS uusi iPad-ajo, kun KK on valinnut saaren tavan (b2c4ed6a9 poistettu KS:n pyynnöstä). Kolmas PT:n iPad-kohta oli SC+Louvre → PK → NS; KS odottaa, ei kiirettä.
6. NUI lippu ei ole enää odottamassa minulta mitään; rivi NUI:lta, kun valmis.

## TEHTY TÄLLÄ VUOROLLA (05.11. 07.01–10.21)
- Konsolikäynnistys 3/3 (T/konsoli-koe-0950) ja asennuksen jälkeen PK-sarjassa: error 22 poissa iPadin uudelleenkäynnistyksen jälkeen, syy päätelmä. KK + PT tietävät.
- TF 218 valmis 07.10, iPadilla 1.1 (218). KK tietää.
- KS Louvre v1b 24c679133, otto2 6b9788c79, SC b2c4ed6a9, varjo 626a3a68b, saaret 147159e7a, 2266c5c0f, 32b990e83, f9e5cf79d, b2ce1653f, 626a3a68b; PK ovimallit 223–233, sävykoe 7aca77c66; VS järvet 928242911 koe1+koe2. Kaikki rivit annettu.
- Levy: siirra_t7 145 kansiota 42,9 Gi (loki _levy/siirto-ajo-julkaisija-20261105.log, suodatettu kartoitus: vain kansiot, ei käytössä olevia, ei runnerin). Ennen 37 Gi, nyt 85 Gi (PT siivosi omansa; minä -koe-218 ja -runko-218). -yhdistelma-218 jää: c1a30e11f vain siinä. T7 139 Gi. Levyvahti T/levyvahti.zsh mainitsee poistetun -koe-218:n rivillä 6, ei ajossa; tarkista ennen seuraavaa ajoa.

## OPIT
- Monitor-putkessa ei cut:ia: se puskuroi, tapahtumat eivät tule. Pelkkä grep --line-buffered.
- Mallin sed-muokkaus: tarkista rivinumerot ja zsh -n ennen ketjua; 09.52 korvasin T=-rivin ja KS kuoli heti, jolloin PK ja NS lähtivät odottamatta. Käynnistä ensimmäinen, varmista elossa, ketjuta vasta sitten.
- "VIKA laheta" + "LentoAlkaa ei näy" ei tarkoita lähetysvikaa: muistivahdin VIKA ohittaa komennot (muistivahti.log: komennot ohitettu). Älä julista kierrosta mitättömäksi ennen muistivahti.log:ia.
- tarkastelu_kuvat.sh sanoo nyt VIKA PUUTE-riveistä (PK korjasi). Vertaa silti listaa kuviin (comm), 凝香亭 putosi pitkissä listoissa.
- Odottavan ketjun vaihto ennen alkua: tarkista lapsi on sleep, kill -9 emo, uusi ketju samaan pid:iin odottamaan.
- KK:n seis: ketjun seuraava askel on uusi ajo; pysäytä emo ja kopioi käynnissä olevan tulokset erillisellä kopioskriptillä (T/ks-saari2-kopio.zsh).
