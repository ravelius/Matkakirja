# Natiivi-UI: luovutus 11.10.2026 aamuyö (03.3x)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md. Edellinen: viesti-natiivi-ui-luovutus-20261011-yo.md. Muistio: natiivi-ui-tila-20261009.md.
Simut: iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Ajot perl POSIX::setsid, yksi simu kerrallaan.
Scratchpad (skenaariot, simu2.sh): /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/776f93d0-c5bc-4255-bc56-7f58e1d13f0d/scratchpad

## Junaan 181
1. natiivi-ui/metro-kyltti-181 **0fb0ad5bf** (käännös be5877e8c, app proto-3d/lokit/natiivi-ui-app-metro-181): + isoksi avattu kertomuskuva
   iPhonella 0,46 → 0,64 ruudun leveydestä (KuvanostoAsettelu.IsoOsuusPuhelin), iPad ennallaan. Kuvapari metro:
   proto-3d/lokit/todistus-metrokyltti-pari2-20261011.jpg (PT: 26 pt + iPad-reuna OK). iPadin reunaa EI muutettu (raakakuvissa ei leikkaudu,
   vanha pari oli rajattu väärin). PT kuittaa, kun isonnetun kuvan 3 ajoa (simu2.sh: kuvaiso ENNEN/JÄLKEEN iPhone + JÄLKEEN iPad) ovat valmiit.
2. natiivi-ui/olavinlinna-181 **12c1bfb51** (⊃ 5d6742d58): + historian avainsana turva-alueeseen (iPhone vaaka "Kivikausi" Islandin alla).
   PT kuittasi yhdistettyyn Olavinlinna-käännökseen (Julkaisija kääntää: laituri-varoitus + olavinlinna-aanet + olavinlinna-181).
   B4 todennettu 45e7770a4:llä (todistus-olav-iphone/-ipad-20261011-02xx). B2: 3D-napautus ei vaihda kynttilää OK; kynttilävihje → Laitetestaajan läpipeluu (oma kynttilä vasta kappelissa).
3. natiivi-ui/opas-sirut-181 **2cb258340** (käännös 3d1438b8d, app natiivi-ui-app-sirut-181): oppaan kysymyksen vaihtoehdot sirurivinä
   neljän napin yläpuolella, kun kysymys odottaa (Laitetestaajan karttakierros: Wien/Vilna/Luxemburg/Marseille jumissa). PT kuittasi suunnan.
   Toisto TF 180:llä OK (todistus-wien-ennen-iphone-20261011-0254). JÄLKEEN-ajossa worker ei kysynyt → simu2.sh ajaa Wien/Vilna/Marseille.

## Odottaa
- Julkaisijan SIMULAATTORI NYT (~04.05) → `zsh simu2.sh` irrotettuna → kuvapari (isonnettu kuva) + sirut-kuvat PT:lle → SIMU VAPAA.
  simu2.sh poistaa natiivi-ui-app-poistu3-180:n ENNEN-ajon jälkeen (Julkaisijan levypyyntö; pakka-180 jo poistettu).
- Maakortti: ei muutosta; PT kysyy omistajalta, pitääkö oman maan kortti saada auki pysäkkikaupungeissa (kartussi häipyy 3 s, pääkaupunkipiste vain ei-pysäkeille).
- Laitetestaajan karttakierroksen kohta 4 (kohdelista himmeä) = vanha havainto, PT: ei ehdoteta omistajalle.

## Päivitys 04.5x (PT kuittasi kaiken junaan 181, Natiivisepällä)
- metro-kyltti-181 0fb0ad5bf (isonnettu kuva todennettu: todistus-isokuva-sirut-pari-20261011.jpg)
- olavinlinna-dialogi-181 98fab3e74 (⊃ 12c1bfb51): "Aloita alusta"; todennus Laitetestaajan kierroksella. Dialogin tausta ennallaan (PT).
- opas-sirut-181 b65f6507b (⊃ 2cb258340): Wien todennettu 3d1438b8d:llä; kierrostoive ohittaa ikäkyselyn (todennus Wienissä junan 181 käännöksellä).
- Hiljaisuus linnan jälkeen = KERRAN LÄPI -linjaus (Pelikoodari), ei vika. Maakortti: PT kysyy omistajalta.
- Levy: pakka-180 ja poistu3-180 poistettu. Jäljellä appit metro-181 ja sirut-181 (poista, kun juna 181 on TF:ssä).
- SEURAAVAKSI: Wienin todennus junan 181 käännöksellä (sirut + ei ikäkyselyä Esittele kaupungista), muuten levossa.
