# Julkaisija: luovutus 4.11.2026 klo 19.1x (Macin kello) – konteksti 32 %

Rooli: Julkaisija (JU). Korvaa -20261104-1720:n ALOITA-, KÄYNNISSÄ- ja jono-osat; sen ja aiempien OPIT voimassa. Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (T = tuo kansio). Katso kuvat ennen kuittausta ja sano, jos katsoit vain osan.

## ALOITA TÄSTÄ
1. Tarkista, mitkä ketjut elävät: ps -axo pid,etime,command | grep julkaisija-tyokalut. NOLLAUS 17.50 KATKAISI osan: 974-käännös ja LAV kk2 kuolivat, k45 jäi. Puuttuva ketju käynnistetään sen skriptillä uudelleen.
2. Viritä Monitor: zsh T/ju-vahti.zsh | grep --line-buffered -vE '^(lav-tausta|lav-jalustat|PROSESSI LOPPUI lav-)'. Lisäksi tail -F näihin: T/pk-789-ipad.log, T/pk-pari2.log, T/kaanna-672f4f9d1.log, T/kaanna-81ce72a05.log, T/ks-nd-puut4.log, T/lav-palat.log, T/pk-kk3.log, T/vs-offline.log.
3. Tarkista kansiot ennen rivin lähetystä; rivit alla kertovat, kuka odottaa mitäkin.

## iPAD-JONO 19.1x (ketjutettu, ei toimia, ellei ketju kuole)
1. T/pk-seina-789.zsh (pid 73155): seinä 789f3046f, kansio lokit/pelikoodari-seina2-789f3046f. Katso ita-etela-02. Rivi PK.
2. T/pk-pari2.zsh (pid 85408): lahtotaso d9cde0f50 → 789f3046f (PT:n järjestys). Ensimmäisen parin kansiot -ajo1. TULOS PT + PK; JUNAPÄÄTÖS ODOTTAA TÄTÄ. Ajo 1: d9c 4009 Mt OK, 2 lentoa; 789 VIKA 4084 Mt ≥ 4080, 1 lento.
3. T/ipad-loppujono.zsh (pid 89886): KS 81ce72a05 sk-nd-ipad (kansio julkaisija-nd-ipad-81ce72a05, rivi KS; kuvat KK:lle KS:n kautta) → VS 672f4f9d1 sk-porras-ipad (kansio julkaisija-porras-ipad-672f4f9d1, 48 kuvaa, 43 min, vain kerran koska kylmä; rivi VS). Jos KS kaatuu käynnistykseen, VS etenee: aja KS uudelleen. Error 22 = sama komento uudestaan.
Ei ajeta: VS 0d5a75286, 6469e76e7 (hylätty/korvattu). KS 639208872 peruttu.

## MAC (lukot jonottavat)
- L2: käännös 672f4f9d1 (19.08→), KS 81ce72a05 sk-nd-puut (T/ks-nd-puut4.zsh, kansio julkaisija-nd-puut-81ce72a05, omistaja odottaa puuparia, rivi KS), käännös 81ce72a05 (T/kaanna-81ce72a05.log).
- L1: LAV palat (T/lav-palat.zsh; rivi LAV), PK e73f5790f sk-kk3 (T/pk-kk3.zsh; kansio rivinä PK), VS offline 2d1084b18 + c968fe777 (T/vs-offline.zsh; kansiot VS), NUI 91bf669af + dbbc2bbea (SIMULAATTORI NYT annettu, iPad13 + iPhone18; NUI sanoo, kun ohi).
- Viimeisenä: ui-kerros 8fa059097 (T/esikatselu-rungolla.zsh <linja> 8fa059097 <striimi/>sk-ui-kerros.txt, rivit "kerros ..." loki.txt:ssä, rivi VS); Tripo palvelijatar v2 (ks. -1720).
- Tulossa: KS Louvre + Sainte-Chapelle iso iPad 4 suuntaa, muisti + ruutuaika, kun KS pyytää (PT, ei junaan).

## TULOKSET TÄNÄÄN 17.20 JÄLKEEN
- d9cde0f50 (koerunko): k60 3337, k45 + rajat 3804 Mt, 0 var, 19/19. PT: EI julkaisuehdokas (myöhempi oikaisu: väriero 484adb22f:ään ei ole vika, d9c:ssä ei striimityyliä). r-fin-z10 ilman rajoja: oma skenaario, maa ei pakotettu (NS, koodista); T/sk-striimi-k45-rajat.txt:ssä nyt `maakunta maa FIN`.
- p-z15 k45 c4a5bfafb: sama vaakaraja ja taivaan portaat, eivät tulleet d9c:n myötä → PT. TF:llä ei ajettu (ei laitekansiota).
- PK 974f95213: lähtötaso 3975, ovet-esineet 4055 Mt, 0 var → PK, PT. PK muuriajot 1–4 valmiit, kansiot lähetetty. Mac 789 lokit/esikatselu-20261104-184107. Palat d9c + TF lähetetty.
- KS 92c47e215 iPad 3304 Mt, 12/12. ND-puut 67d4783c7 ja 834376445 18/18. LAV kk2 35/35, verrokki 2/2, erottelu ok; terassi-v1b 20/20 → LAV.

## KOEHAARAT
- julkaisija/terassi-v1b-219 980bb115c (d9c + rakennukset-v126 + c2-v40; natiivi-backup; file://…/koejuuri-rungolle/). PT kuittasi. Ei junaan, ei ämpäriin ilman PK:n vahvistusta. wt/julkaisija-koe-218 on tällä haaralla.
- julkaisija/runko-219-muisti d9cde0f50 ennallaan.

## OPIT
- Rungon kuvaa verrataan edelliseen runkoon vain, jos tyyli on sama: katso ensin, mitä rungossa on (PT).
- TF 60bd5c356:ssa ei ole komentoa `juoksupeli palvelijat`: skenaariot T/sk-muuri-tf217.txt, T/sk-palat-tf217.txt.
- Laitteella ei ole kuva3d:tä. Peli loppuu ("Uuvuit!") noin 20 s:ssa botti 0:lla: seinäkuvat T/pk-seina.zsh odottaa "kameraväli t" ja käyttää `valo jaady 1`. Muista myös, että avaus 0 ei tuota LentoAlkaa-riviä.
- lahtotaso.zsh ylikirjoittaa kansion: toinen ajo vaatii -ajo1-siirron (T/pk-pari2.zsh tekee sen).
- vs-muisti-z10k60 kaatuu heti, jos käännöstä ei ole: viritä vasta käännöksen jälkeen. VS:n ja KS:n sha vaihtuu usein: odottajan voi pysäyttää omalla pid:llä ennen käännöstä.
- Tarkista pyytäjän skriptin olemassaolo ennen ketjutusta (verrokki ehti viestin jälkeen).
- "VIKA laheta ui-komento" on usein harmiton: tarkista konsolista, menikö rivi perille.

## LISÄYS 19.2x (uusin; tarkista T/jono-20261103-ilta.txt)
- iPad: seinä 789 (pid 73155) kaatuu käynnistykseen error 22: VIKA 19.18 ja 19.24, enintään 4 yritystä. Jos kaikki epäonnistuvat, ketju jatkaa pari2:een (se yrittää myös 4 kertaa), runko takaisin: aja `zsh T/pk-seina.zsh 789f3046f` myöhemmin iPad-lukon sisällä tai T/pk-seina-789.zsh uudella odotus-pid:llä. Jos pari2:kin kaatuu, rivi PT:lle heti: iPadin uudelleenkäynnistys vaatii omistajan koodin.
- iPad-loppujono on nyt pid 12564: pari2 → KS 8be6819db (ei 81ce72a05, KS vaihtoi) → VS 672f4f9d1. VS 672f on käännetty. Käännös T/kaanna-8be6819db.log.
- Mac: L2 KS 8be6819db sk-nd-puut (T/ks-nd-puut5.zsh, kansio julkaisija-nd-puut-8be6819db; KS haluaa tämän ennen iPadia, rivi KS). 81ce:n Mac valmis ja lähetetty.
- L1: LAV palat uudelleen (T/lav-palat.zsh pid 97252, rivi LAV), VS offline 2d1084b18 + c968fe777, NUI 91bf669af + dbbc2bbea. PK kk3 valmis ja lähetetty.
- Blender: LAV kk2r-leivonta (T/lav-kk2r.zsh pid 95730, T/lav-kk2r.log). Rivi LAV, kun KK2R VALMIS. Ei toista Blenderiä rinnalle.
- OPPI: kun pysäytät laitekäännöksen TERMillä, laite-sha:n trap ei vapauta linjalukkoa. Tarkista lukon pid; kuollut oma lukko saa poistaa.

## LISÄYS 19.5x (uusin; korvaa edelliset jonot, tarkista T/jono-20261103-ilta.txt)
- Valmis ja lähetetty: pari 2 (d9c 4003 OK; 789 VIKA 4122) → PT, PK. Seinä 789 PERUTTU (PK pyytää junakelpoisella rungolla). LAV palat, kk2r-leivonta, KS 8be Mac.
- iPad: T/ipad-loppujono.zsh pid 12564: KS 8be6819db (rivi KS) → VS 672f4f9d1 (rivi VS). Tulokset T/vs-muisti-ketju.log.
- Mac: L2 KS 48e4a5921 sk-nahtavyysalue (T/ks-nahtavyys.log, kansio julkaisija-nahtavyysalue-48e4a5921, rivi KS). LAV kansipari (T/lav-kansi.log, KANSIPARI AJETTU → LAV), sitten kk2r-pari (T/lav-kk2r-pari.log, KK2R-PARI AJETTU → LAV). NUI 91bf669af + dbbc2bbea (NUI ilmoittaa).
- VS offline2 85d57c0e7: T/vs-offline2.zsh pid 27170 odottaa loppujonoa; L1, kansio rivinä VS (T/vs-offline2.log). A ja B perutut.

## LISÄYS 20.2x (uusin; korvaa edelliset jonot, tarkista T/jono-20261103-ilta.txt)
- Valmis ja lähetetty: KS 8be iPad, KS d45cad639 Mac, LAV kansipari + toisto, kk2r-pari.
- iPad: VS 672f4f9d1 ajossa (T/vs-muisti-ketju.log, 43 min alkaen 20.00; rivi VS). Sen jälkeen NS muistikuva 303a71dfb (T/ns-muistikuva.zsh pid 23365, T/ns-muistikuva.log; DEVELOPMENT-käännös, palauttaa rungon; rivi NS).
- Mac: VS offline2 85d57c0e7 alkaa VS 672f:n jälkeen (T/vs-offline2.log, kansio rivinä VS). NUI 30193b615 + dbbc2bbea iPhone18 (NUI ilmoittaa).
- OPPI: viritä vahti jokaiselle ketjulle heti; 19.4x–20.0x rivit myöhästyivät 10–25 min, kun vahti puuttui.
