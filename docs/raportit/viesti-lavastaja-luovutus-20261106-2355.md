# Lavastajan luovutus 6.11.2026 23.55 — LUE KOKONAAN, riittää yksin (korvaa -2248)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu; ote ja skriptit docs/raportit/lavastaja-levyt7k (sha 2849fe572). EI LEIVONTAA, KARTTAA, VIENTIÄ eikä muita paloja ilman PT:n sanaa. Työ kuuluu juoksupeliin (omistajan yörajaus 23.22; PT kirjasi).

## Yön sääntö (omistaja 23.07)
Vika, joka ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön.

## TEE ENSIN: JU:n ajo 7p ja 7k
JU kuittaa tälle sessiolle: A/aja-levyt7p.zsh (koejuuri-levyt7) ja A/aja-levyt7k.zsh (koejuuri-levyt7k), 10 kuvaa kumpikin, sha 35140432d, kansiot A/kuvat-levyt7p ja A/kuvat-levyt7k. Tee pari kuten A/parit7r.py (uusi kansio kuvat-pari-levyt7k), katso täysikoossa ja lähetä PT:lle. PT odottaa paria.
Kuvat: j3-alkup-kamera, B-takakulma (uusi paikka -86,5; 2; 431,5, kerro jos taas väärin), B-etusivu, j3-paaty-lansi, kohta-1-4, kohta-0-3, kohta-0-2, kohta-1-1, A-koko, C-koko1. Kohta-kamerat on laskettu sivujen paikoista, eikä niitä ole ennen kuvattu; jos ne osuvat väärin, kerro se.

## Tila
- koejuuri-levyt7u (2 jalustaa, 12 kolmiota): korjaus näkyy täysikoossa, PT kuittasi.
- koejuuri-levyt7k: sama sääntö kaikille paloille: kivireunus-sivu, jolla u ei etene (du/L <= 0,9, L >= 0,5 m) -> u = metrit pituussuuntaan. 6 596 kolmiota, 4 711 m2 (aiempi 3 514 m2 oli tiukempi raja du/L < 0,1). Vain lod0, PT:n kuittaama. Tarkistettu vain lokista, kuvia ei vielä ole.
- Juova 3-1: pinta, materiaali ja UV kunnossa; suorissa kuvissa kivikuva ja saumat, joten tekstuurin puute kumoutui tältä sivulta. AUKI PT:n mukaan: kulma-mip on hypoteesi. Yritys 1 tehty (mittaa28: kirkkaus sama 5-41 astetta, vaihtelu 5 asteessa noin 1/3 pienempi). Yksi yritys jäljellä, sitten rivi PT:lle.
- Itäpääty: x 258,6 on seinän sisällä (mittaa27), ei kuvattavissa; PT tietää.
- B:n laikku: jalustan päällä, kaareva reuna, ei saumoja, ei muutu materiaalin vaihdolla eikä heijastuksella. Rivi KK:lle lähetetty, aamun kysymys. Ei enempää ilman sanaa.
- Kiila ja raita: 7v todisti valokartan tai valo-UV:n syyksi. Suositus (3-1:n saaret + 2,86 m2:n kolmio + koeleivonta) jää KK:n aamuun, PT: ei koeleivontaa yöllä.
- Pienet pisteviivat: eivät valokartasta, syy mittaamatta.
- PK:n kävely uudella kartalla tekemättä ennen vientiä.

Muuta: pelikoodi-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu, ajoissa sha 35140432d. numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä. Kameran projektio toimii: mittaa28.py:n pr().
