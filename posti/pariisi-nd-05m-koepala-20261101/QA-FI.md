# Notre-Dame 0,5 m/px — QA, 1.11.2026

Kaksi uutta ImageGen-ottoa, yksi per pala. Lähde c240fc87f9d2cf31833644884aa209f7ee3fd1e2, hyväksytyn sävytetyn G 2×2:n rajaukset. Vanhaa pariisi-05m-kuvaa ei käytetty.

## Varmennetut asiat
- Kumpikin toimituskuva on 1536 × 1024 RGB PNG; alkuperäiset ja generoinnin raakakuvat säilyvät.
- Alan y 0–309 kopioitiin häviöttömästi ylän y 714–1023:sta omistajan suoralla luvalla. Eroavia pikseleitä: **0** (476 160 pikselin RGB-kaista).
- Kooste on 1536 × 1738. Yläorigon y=0, alaorigon y=714. Kooste on tarkistusesikatselu, ei kolmas pelipala.
- Tornien liioiteltu mittakaava ja kirkon päämuoto säilyvät silmämääräisesti. Kivisaumat, katot, lehvästö, ruusuikkuna ja portaalit ovat aiempaa tarkempia.
- Kaistan sisäraja tarkistettu täydessä koossa. Ei suurta siirtymää, leikkautuvaa rakennusta tai leveää värisaumaa. Pienet koriste-/viivapiirroksen erot on tarkistettava myös pelin kameralla.

## Rajat ja jatko
- Kaistan pikseli-identtisyys on todistettu; koko uuden piirroksen pääääriviivojen pikselilleen samaa sijaintia alkuperäiseen ei ole todistettu. Tämä on uusi tarkempi piirros, ei alkuperäisen jokaisen pikselin säilyttävä suurennus. Lähteen tiukka geometriavaatimus jää tältä osin Karttasepän kameravertailuun.
- Ei tekstejä, lentokoneita eikä lintuja. Palettia ei jälkikäsitelty paikallisesti.
- Toimitus arvioitavaksi. Vastaanottajan, PT:n tai omistajan hyväksyntää ei päätellä tästä QA:sta. Ei runtime-kytkentää eikä pelijulkaisua.

Karttatiedot © OpenStreetMap contributors.
