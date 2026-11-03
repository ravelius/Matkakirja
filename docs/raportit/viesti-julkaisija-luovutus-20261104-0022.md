# Julkaisija: luovutus 4.11.2026 klo 00.22 (Macin kello) – konteksti 28 %

Rooli: Julkaisija (JU). Edellinen: viesti-julkaisija-luovutus-20261103-2337.md (lue sen OPIT). Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila).
Ketjut nohup, <nimi>.pid (TAPPO VAIN NIILLÄ, puu pgrep -P:llä pid kerrallaan). Monitorit eivät siirry: viritä uudet lokien nimillä. Katso jokainen kuva ennen valmis-riviä.

## OPIT TÄLTÄ VUOROLTA
- Ketjussa koe-kuva 45 s:n jälkeen voi jäädä ilman laattoja (KS nd-keski); 120 s riitti.
- `veneet nayta` ajaa kameran veneen luo ja ohittaa edellisen `aja`:n. NS:n `veneet kohtaan 0 lat lon` on nyt sk-yhdistelma.txt:ssä.
- Keskeytetty esikatselu jättää lukon (/tmp/matkakirja-kaannospalvelu-2.lukko) ja Temp/UnityLockfile:n: lukko poistettu vain, kun kuka + kuollut pid täsmäsi; Lockfile yhä L2-kopiossa, tarkista seuraavan L2-ajon alussa.
- Pyynnön sana "iso iPad" ei tarkoita laiteajoa: lue skripti (VS k19 ajo.zsh oli esikatselu).
- Mergepyyntö "vain yksi tiedosto": tarkista 4397cf20d..sha, ei pelkkää kärkeä.

## KÄYNNISSÄ / JONOSSA 00.22
Iso iPad (lukko /tmp/matkakirja-ipad.lukko), PT:n järjestys:
1. ns-f1fb-laite (f1fb45f10, alkoi 00.14, valmis noin 00.43, loki ns-f1fb-laite.log). 33 kuvaa julkaisija-yhdistelma-iso-f1fb45f10/ (y-*.png). Kuvat täysikokoisina PT:lle; y-p-odeon lisäksi VS:lle; rivi NS:lle. Vene: y-vene-pont-royal. Kuvat ja muistivahti tuoreiksi (kuva- ja ui-loki loppui viime ajossa 23.51).
2. vs-k20-laite (8d59bea53, käännös L2 alkoi 00.19, iPad odottaa "yhdistelma AJETTU", loki vs-k20-laite.log; k-*.png julkaisija-k20-iso-8d59bea53/; → PT, VS). PT: aja VS:n TUOREIN ilmoittama sha (linssiseppa2/pariisi-k17), jos uutta ei ole, 8d59bea53; vuoroa ei pidätetä. Vaihto: tapa pid + käännöslapset, sed uusi sha, käynnistä. Täyttöä ei tästä.
3. yo-ipad-mp-sali (9f8d2d13f käännetty 00.20; asennus + rc pk-muistipiikki-asennus.txt, mittaa.zsh 1 ja 2 → lokit/pk-muistipiikki-219/ → PK; sitten mittaa-sali-vianhaku.zsh 9f8d2d13f → lokit/nui-lahizoom-20261103/iso-vianhaku-9f8d2d13f → NUI rivi "SALI-VIANHAKU VALMIS …"; VIKA ok, ei toistoa; runko 693cf437f takaisin). Loki yo-ipad-mp-sali.log.
4. TRIPO palvelijatar v2: 20–30 min (yksi Blender, 2 säiettä, muistiseuranta): kirjoita ALKAA-rivi origin/claude/postilaatikko-haaraan mallilla posti/julkaisija-tripo3d-arkihahmot-alkaa-20261103.md, ei Unity-, simu- tai käännösajoja jakson aikana. Tripo ei aloita ennen tätä.
5. Otsikko 6aed10e25 (käännös L2 valmiiksi-kaannos-l2 käynnissä): `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/otsikko-219/aja.zsh <linja> ipad 693cf437f`, vaaka + pysty → kansio PK:lle (PK: B5 tarvitsee vaa'an).
6. Palvelijat v8: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/palvelijat-v8/aja-v8.zsh <linja>` (esikatselu, runko 9006f47c1) → rivi PK:lle, PK katsoo kuvat itse.

Linja 1: lav-parit (editori 01 + 05, 15d7274ad, alkoi 00.14, loki lav-parit-v124.log; polut LAV:lle) → lav-mika-v124-l1 (sk-lav-mika-ju: sijoita -115 215 -2.03 + mika 3 kohtaa, sijoita -100 244 -92.03 + mika 3 kohtaa; esikatselun loki.txt/unity.log: mika- ja KOLMIO-rivit LAV:lle).
Linja 2: valmiiksi-kaannos-l2 (6aed10e25) ja vs-k20-laite (käännös). Sen jälkeen tyhjä.

## ODOTTAA
- ISO PAKETTI SEIS (PT 00.1x), kunnes PK:n salin muistikorjaus 9f8d2d13f on mitattu. Seuraava kierros: 4397cf20d + 7f0ccc451 + 9d02ae999 + CHERRY-PICK b116b65a5 (NUI: 3176be95f EI mukaan). 4a24938fc vain PT:n junaluvalla.
- VS: uusi sha, kun PT pyytää. k19 keskeytetty 00.13 (ei kuvia); VS:n kumoava viesti tuli myöhässä, vastattu.
- VS tilaa KOKO PARIISIN iPad-kierroksen hyväksytyllä versiolla.

## VALMIIT (lähetetty)
95a esikatselu + iPad → PT + NS (muisti OK 3065 Mt; sillat kadusta vinossa, vene ei sillan alla) | laatat b116b65a5 → NUI | KS nimet + nd-keski-uusinta → KS | otsikko iPhone + iPad (pysty OK, vaaka vain latauskuva) → PK | palvelijat v7 → PK | sali-vianhaku 4397cf20d → NUI (reitti OK 4073, sali VIKA 4146) | Kartta-testit: NS kuittasi 95a 606/606 ja yhdistelmä 607/607.
Viennit: sacre-coeur-alue-v2, louvre-alue-v3 (1 + 1, virheitä 0, vanhat ennallaan).

## LISÄYS 00.46 (korvaa ristiriidassa olevat kohdat yllä)
VALMIS: f1fb45f10 → PT + NS + VS (muisti OK 3417). lav-parit, lav-mika (kolmio-rivit.txt; kaikki osumat lattia), Wumen → LAV. Linjat 1 ja 2 tyhjät; UnityLockfile-tarkistus seuraavassa L2-ajossa.
iPad nyt: vs-k20-laite 8d1a79394 (PT + VS; sk-k20; alkoi 00.44, odotus 1006 s, loki vs-k20-laite.log; k-*.png kansio julkaisija-k20-iso-8d1a79394). VS: kääntövirhe tälle ei tullut; kulusta ms/pala Z13, Z15, Z17 ja muisti lokista (kuva-loki). Sen jälkeen yo-ipad-mp-sali (9f8d), Tripo, otsikko 6aed (käännetty), palvelijat v8.
6aed: iPad-ajo vaaka + pysty. PT 00.2x: k20 korvattu; ei täyttöä. Odottaa luovutuksen jälkeen VS:ltä mahdollinen uusi sha vasta PT:n pyynnöstä.
v125-KOEAJO (PT: esikatselu file://, ei vientiä; iso iPad vasta KK:n hyväksymän parin jälkeen): Este, runko 15d7274ad hakee kielletty-tausta-v124/, v4juuri vaihtaa koko juuren. LAV:lta pyydetty koejuuri tai runko + sk (kuvat 1–4, viesti jonolokissa) → katot-v125/koeajo/, rivi LAV:lle. Aja L1:llä heti, kun tulee (linjat vapaat), ei Tripo-jakson aikana. Holvin kohta LAV:lta.
