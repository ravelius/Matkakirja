# Julkaisija: luovutus 6.11.2026 klo 18.25 (tilinvaihto, omistaja 18.23)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset; tämä riittää ilman niitä.

## PÄIVITYS 18.30 (voittaa alla olevan kohdan 2)
- Pid:t 73037 ja 4456 päättyneet. 12 palaa valmiit 18.26, 19/20. KS 29 92ea0a945 valmis 18.29, 4/4, viety KS:lle.
- Ajossa vain 37488 (ppid 1): leivo_levyt3_1-2.zsh, alkoi 18.27, 5-10 min. Älä pysäytä kesken: katto on taustassa, kunnes EROTA-vaihe on ohi. Tarkista rivi "LEIVONTA VALMIS kk-tausta-1-2" tai VIKA lokista T/lav-levyt3-12-3c.log ja kuittaa EROTA-rivi LAV:lle ja PT:lle (LAV:n peruutus PT:n sanalla tuli ajon jo alettua).
- 3c EI lähde: pysäytin ketjun emon. Aja `zsh P/_tyo/linnanrakentaja/muuri/aukot/aja-levyt3c.zsh 1 35140432d` vasta LAV:n seuraajan pyynnöstä, ja kuittaa LEVYT3C AJETTU, polku, 404-määrä.
- Origokoe (kohta 3a) ei enää odota leivontaa, vain PT:n sanaa vaihdon valmistumisesta.

## ALOITA TÄSTÄ
1. `ps`-tarkistus: pid:t 73037 ja 4456 (molemmat ppid 1). Viritä odotin: edellisen session odottimet eivät selviä nollauksesta. Lokit alla.
2. AJOSSA, irrotettuna:
   - 73037 T/lav-leivonta-levyt3-loput.zsh, viimeinen pala kk-tausta-3-4 alkoi 18.24. Loki T/lav-leivonta-levyt3.log, loppurivi "LAV-LOPUT LOPPU rc". Palaa 1-2 ei tässä.
   - 4456 T/lav-levyt3-12-3c.zsh, odottaa edellisen loppua, ajaa sitten LAV:n leivo_levyt3_1-2.zsh ja aja-levyt3c.zsh 1 35140432d (L1, 5 kuvaa, ei vientiä). Loki T/lav-levyt3-12-3c.log, loppurivi "LAV-12-KETJU LOPPU rc". PT: origokokeen rinnalla, jos kone kestää.
   - Kuittaus LAV:lle (local_beb68834-6c4f-4839-ac75-7876b45052c3): LEIVONTA VALMIS kk-tausta-1-2, EROTA-rivi, LEVYT3C AJETTU, polku P/_tyo/linnanrakentaja/muuri/aukot/kuvat-levyt3c, 404-määrä.
   - Jos jompikumpi kuoli: ei alusta. Valmiit palat kansiossa P/_tyo/linnanrakentaja/muuri/aukot/levyt3-leivottu; aja puuttuvat `zsh .../aukot/leivo_levyt3.zsh <palat>`, pala 1-2 aina leivo_levyt3_1-2.zsh:lla (lod0:ssa kaksi verkkoa). Rivi PT:lle.
3. JONO (PT:n järjestys):
   a. ORIGOKOE iPad 5 d907286cb, EI ALOITETTU. Laitekäännös valmis (lokit/julkaisija-laite-218-d907286cb, 17.56). Pysäytin ketjun 75346 ennen iPadia: PT 18.2x "ei uusia iPad-ajoja ennen vaihtoa". Kun PT sanoo vaihdon valmiiksi: `nohup zsh T/ns-origo-ipad5-alku.zsh > T/ns-origo-ipad5.log 2>&1 < /dev/null &` (ei rinnakkaista iPad-ajoa; 12 palaa oltava valmiit). KERRAN, 0 palaa, vahti päällä, keskeytys = "ei tulosta", ei uusintaa. Ajoskripti T/ns-origo-ipad5-ajo.zsh on tehty 4b:n pohjalta, syntaksi tarkistettu, ajamatta; palauttaa rungon d092f48cc:n, tyhjentää iPadin 16 palan indeksin. Ohje P/_tyo/natiiviseppa/palikkakoe/valmis-origo/ajopyynto-ipad-5.md. Tulos NS:lle (local_c7344e20-fba8-433d-ba8e-184a325037ef) JA KK:lle (id osoitekirjasta); koe sulkeutuu siihen. Lupa on PT:n, vahvistettu 17.5x; KS:n ajoja ei mittauksen päälle.
   b. NUI (jonon rivit 17.31, 17.32, 17.33 kokonaan): 13dab1aac rungon 603d4213a päälle omana haarana, käännös, koko UI-sarja 15 (pohja T/nui-13dab.zsh), tulos lokit/nui-ui-yhdistelma-<sha>/; vain D:n 3 riviä saa jäädä, uusi rivi tai yli 10 s:n vika PT:lle. Rungon kärkeen vasta PT:n junakuittauksella.
   c. Sen jälkeen piilo-palautus: skenaario lokit/nui-piilo-palautus/sk-piilo-palautus.txt kerran Macilla, jos oletus täyttyy, samat vaiheet isolla iPadilla lukolla; kuvat 1-4 molemmista; lokit/nui-piilo-palautus-<sha>/. Jos Macin oletus ei täyty, ei iPadia: loki NUI:lle.
4. KS: seuraava ajo tulee tilauksena. Kyltti-liike-5-halles jäi ajosta 28 pois; KS vie sen seuraavaan. Pohja `zsh T/ks-yhteinen-ajo.zsh <nro> <sha> <kuvia>` (L2, 0.465). Tarkista kuvamäärä skenaariosta.
5. TF: EI lähde, ennen kuin KK:n kortti "Pariisi valmis" tulee PT:n kautta (omistaja 17.33).
6. Etäyhteys vain KK:lla. valoseppa-vahti saa pyöriä taukolipulla.

## TILA
- Junarunko julkaisija/runko-219-muisti = 603d4213a natiivi-backupissa, EI KÄÄNNETTY: tulee seuraavassa junakäännöksessä. iPadilla d092f48c, sovellus suljettu; skriptien RUNKO osoittaa d092f48cc:n käännökseen, kunnes uusi on olemassa.
- L2 vapaa 18.21 alkaen, L1 vapaa, kunnes 3c alkaa. iPad vapaa, indeksi yhä 16 palaa (r4-1200).
- unity-tarkistus.sh aina bashilla tai sh:lla, ei zsh:lla (rc 10/11 = väärä kuori).
- PT 17.37: ajot eivät odota hiljaista tuntia. Viestit PT:lle ≤ 3 riviä, send_message id:llä.

## TULOKSET TÄLTÄ VUOROLTA (viety)
- KS 26 3d78ea440 26/26, palat 5/5, 832 s; KS 27 162912f91 8/8, 279 s; KS 28 33ea85e3b 31/31, 872 s, PUUTE 0, 0 shader- ja CS-virhettä. Kuvia ei arvioitu. unity.login poikkeusrivejä 11 kaikissa kolmessa, ei katsottu, KS:lle kerrottu.
- LAV 7/20 valmiina, kun 1-2 kaatui 17.51 assertiin leivo_valo.py:25; 12 ajettu perään.

## OPIT
- Tarkista glb:n verkkojen määrä ennen pitkää leivontaa, jos skripti olettaa yhden.
- Odota lokirivillä lippua, ei pid:llä: T/lav-levyt3-12-3c.zsh sai PT:n muutoksen helposti, kun laukaisin oli yksi rivi.
- Iso ketju, joka sisältää iPad-osan, on pidettävä pysäytettävänä: käännös ja iPad erikseen, koska iPad-sana voi muuttua kesken.
- Kuvatilaus voi muuttua ajon jälkeen; sano tilaajalle heti ajon alkamisaika.
