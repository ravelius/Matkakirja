# Yövartio-salin puuttuvat kertojatekstit (Sisältökirjuri 13.10.2026)

Tilaus: PT (omistajan museopalaute, juna 188): kertoja ei jatka Yövartion salissa, koska osalta teoksista puuttuu äänite. Linja: äänitteet tilataan, ei koodiratkaisua.

## Selvitys

Salissa `yv` on 5 teospaikkaa (sali.json teospaikat): yv-yovartio SK-C-5, yv-v1 mauritshuis-146, yv-v2 mauritshuis-840, yv-o1 mauritshuis-92, yv-o2 mauritshuis-670. Kierros (kierros.json, 33 pysähdystä) päättyy SK-C-5:een; äänite (taidemuseo-kertoja-v2/paasali) on vain SK-C-5:llä. **Ilman kertojatekstiä ja äänitettä: 4 teosta, kaikki Mauritshuis-lainoja** (mauritshuis-146, -840, -92, -670). Lähteet: LS1:n worktree proto-linssiseppa-museo188 (a29af6561) ja proto-3d/_valmiit/taidemuseo-kertoja-v2-vienti-20261011.

## Tekstit (kertoja William, sama tyyli kuin pääsalin 20: koukku, "Katso …", 54–66 sanaa, luvut tee.py muuttaa sanoiksi)

### Tohtori Nicolaes Tulpin anatomian oppitunti (mauritshuis-146, yv-v1, 54 sanaa, ~23 s)

Pöydällä makaa Aris Kindt, ryöstöstä tuomittu mies, joka teloitettiin samana päivänä vuonna 1632. Kirurgikilta sai pitää vain yhden julkisen ruumiinavauksen vuodessa, ja ruumiin täytyi olla teloitetun rikollisen. Rembrandt oli maalatessaan 26-vuotias. Katso tohtori Tulpia oikealla: hän näyttää kuolleen miehen käsivarren lihaksia seitsemälle kirurgille. Käsivarren anatomisesta tarkkuudesta on kiistelty vielä tutkimuksissa vuosina 2006 ja 2007.

Lähteet: [Wikipedia: The Anatomy Lesson of Dr. Nicolaes Tulp](https://en.wikipedia.org/wiki/The_Anatomy_Lesson_of_Dr._Nicolaes_Tulp)

### Omakuva (1669) (mauritshuis-840, yv-v2, 62 sanaa, ~26 s)

Tämä on Rembrandtin omakuva vuodelta 1669, hänen kuolinvuodeltaan. Katso päätä: röntgenkuva paljastaa, että hän maalasi ensin päähän valkoisen pellavalakin, jota 1600-luvulla käytettiin vain kotona. Lopullisessa maalauksessa on raidallinen lakki, jota pidettiin silloin itämaisena. Mauritshuis arvelee, että hän kuvasi ensin nopeasti peilistä näkemänsä ja valitsi päähineen vasta sitten. Maalaus joutui myös sodan pyörteisiin: natsit veivät sen suolakaivokseen, ja Mauritshuis osti sen vuonna 1947.

Lähteet: [Mauritshuis: Self-Portrait (840)](https://www.mauritshuis.nl/en/our-collection/artworks/840-self-portrait); [Mauritshuis: Loot, Rembrandt](https://www.mauritshuis.nl/en/what-s-on/exhibitions/exhibitions-from-the-past/loot/rembrandt)

### Delftin näkymä (mauritshuis-92, yv-o1, 57 sanaa, ~24 s)

Marcel Proust näki tämän teoksen Haagissa vuonna 1902 ja kirjoitti nähneensä maailman kauneimman maalauksen. Taivas täyttää noin puolet kuvasta, ja Schiedamin portin kello näyttää yleisimmän tulkinnan mukaan hieman yli seitsemää aamulla. Katso vasenta rantaa: viisi ihmistä odottaa pääsyä vetolaivaan, ja Vermeer poisti sieltä yhden alun perin maalaamansa hahmon. Hollannin valtio osti teoksen vuonna 1822 hintaan 2900 guldenia.

Lähteet: [Wikipedia: View of Delft](https://en.wikipedia.org/wiki/View_of_Delft); [Essential Vermeer: View of Delft](https://essentialvermeer.com/cat_about/view.html)

### Tyttö helmikorvakorulla (mauritshuis-670, yv-o2, 64 sanaa, ~27 s)

Tämä ei ole muotokuva vaan tronie, kuvitteellisen hahmon pään tutkielma, eikä kukaan tiedä, kuka malli oli. Vuoden 2018 tutkimus löysi tytölle ripset ja taustalta haalistuneen vihreän verhon. Katso helmeä: se tuskin on aito helmi, koska aito olisi ollut liian suuri, ja vaikutelma syntyy muutamasta valkoisesta vedosta. Arnoldus des Tombe osti maalauksen Haagin huutokaupasta vuonna 1881 kahdella guldenilla ja 30 sentillä ja testamenttasi sen Mauritshuisille vuonna 1902.

Lähteet: [Wikipedia: Girl with a Pearl Earring](https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring); [PBS NewsHour: Girl with a Pearl Earring, 2018 scans](https://www.pbs.org/newshour/amp/arts/hi-tech-scans-uncover-new-details-of-girl-with-a-pearl-earring-but-not-her-identity)

## Ehdotus kierrokseen ja äänitykseen
- Pysähdysjärjestys SK-C-5:n jälkeen (vasen seinä, sitten oikea): mauritshuis-146, -840, -92, -670. kierros.json tarvitsee 4 uutta riviä; äänet salikansioon paasali/<id>.mp3 + ajat/paasali/<id>.json (manifest.json aanet-listaan).
- Äänitys: tee.py-putki (William, eleven_v4_turbo, yksi otto, tempo 1,10×); pysyvä lupa kertojan äänille hyväksyttyihin käsikirjoituksiin.
- Faktat tarkistettu Wikipedian ja Mauritshuisin hakutulosten (sivu 403, haettu hakutuloksena) sekä museo-kysymykset.js:n lähteiden mukaan; Mauritshuisin omilta sivuilta ei saatu täyttä tekstiä auki. Yhtään lukua ei ole keksitty; 2900 guldenia (1822) ja 2+0,30 guldenia (1881) Wikipediasta.
