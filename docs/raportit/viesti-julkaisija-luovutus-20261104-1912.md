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
