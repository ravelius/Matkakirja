# Eurooppa 1873 — kattavuus- ja mittaraportti

- Sisältörevisio: `eu-hl-europe-20260913-r2-approved1`
- Julkaistu vertailu: `079284e1cf09f650ed7e5f3d54f54c4e3da933b1`
- Kaupungit: 45/45, ei aukkoja eikä duplikaatteja
- Livian kaupunkiutteranssit: 55/55 (45 city-pair-kuplaa + Sofian 10 muuta kontekstipuhetta)
- Tekstihaaran etätila: PR #2325, commit `3d1a143492c6ba520eab75976ced7a5da7aad1f1`
- Tila 13.9. klo 03.25 EEST: teksti, TTS-syöte, SHA:t ja cue-ankkurit jäädytetty; 45/45 Horatio- ja 45/45 Livia city-3 -ääntä sekä niiden kohdistukset tuotettu. Sofian 10 muuta Livia-ääntä säilyvät ennallaan.
- RC-portti: 45/45 Horatio-readback PASS; 33 uuden Horatio-äänen runtime- ja tuotantokuittikytkentä sekä lopullinen yhteis-CI vielä RC:n vastuulla.
- Kuvatekstit: 149/149 pitkää selitettä on kaksi virkettä ja 149/149 lyhyttä yksi sisältövirke. Historiallisten lyhyiden paikka–vuosi-otsaketta ei lasketa sisältövirkkeeksi.
- Pulu-P2: 35 nimettyä briefiä odottaa erillistä kuvatilausta; Marseillen P2 on toimitettu ja odottaa pelikytkentää. Tässä revisiossa ei generoitu kuvia. Katso [P2-briefit](eurooppa-puuttuvat-pulu-p2-kuvat-20260913.md).
- CI-erottelu: tekstilähteen PR-ajo #1854 jäi viiteen audio/runtime-porttiin; sisältö- ja kuvatekstivartiot ovat vihreät. Lopullinen yhteispaketti ei saa jäädä tähän poikkeustilaan.

| Erä | Kaupunki | Baseline pari | Uusi H | Uusi L | Uusi pari | Pulu-kuvia | H I1/I2 | Tulos |
|---|---|---:|---:|---:|---:|---:|---:|---|
| pilot | Ateena | 449/57 | 261/32 | 140/18 | 401/50 | 1 | I1/I2 | PASS |
| e5 | Sofia | 441/56 | 250/31 | 154/19 | 404/50 | 1 | I1/I2 | PASS |
| e5 | Istanbul | 440/60 | 206/26 | 159/25 | 365/51 | 1 | I1/I2 | PASS |
| e3 | Rooma | 451/63 | 240/31 | 169/21 | 409/52 | 1 | I1/I2 | PASS |
| e5 | Bukarest | 455/59 | 224/26 | 147/18 | 371/44 | 1 | I1/I2 | PASS |
| pilot | Sarajevo | 436/54 | 238/27 | 168/23 | 406/50 | 1 | I1/I2 | PASS |
| e2 | Madrid | 459/58 | 238/29 | 156/22 | 394/51 | 1 | I1/I2 | PASS |
| e3 | Wien | 452/57 | 280/33 | 171/21 | 451/54 | 1 | I1/I2 | PASS |
| e1 | Pariisi | 463/54 | 265/30 | 181/22 | 446/52 | 1 | I1/I2 | PASS |
| e3 | Berliini | 430/52 | 247/28 | 160/19 | 407/47 | 1 | I1/I2 | PASS |
| e1 | Lontoo | 411/50 | 271/33 | 137/15 | 408/48 | 1 | I1/I2 | PASS |
| e5 | Budapest | 465/59 | 213/27 | 138/18 | 351/45 | 2 | I1/I2 | PASS |
| e5 | Dubrovnik | 446/59 | 240/31 | 154/20 | 394/51 | 3 | I1/I2 | PASS |
| e3 | Praha | 462/64 | 264/35 | 175/24 | 439/59 | 1 | I1/I2 | PASS |
| e4 | Tukholma | 447/57 | 229/28 | 182/21 | 411/49 | 1 | I1/I2 | PASS |
| e4b | Kööpenhamina | 451/59 | 190/26 | 162/22 | 352/48 | 1 | I1/I2 | PASS |
| e4 | Helsinki | 441/52 | 258/29 | 170/23 | 428/52 | 2 | I1/I2 | PASS |
| e4 | Tallinna | 411/53 | 226/27 | 166/22 | 392/49 | 1 | I1/I2 | PASS |
| e2 | Sevilla | 436/51 | 271/31 | 152/20 | 423/51 | 1 | I1/I2 | PASS |
| e4b | Bergen | 421/53 | 168/21 | 166/21 | 334/42 | 2 | I1/I2 | PASS |
| e1 | Amsterdam | 438/53 | 274/35 | 151/18 | 425/53 | 2 | I1/I2 | PASS |
| e1 | Dublin | 435/51 | 249/29 | 168/21 | 417/50 | 1 | I1/I2 | PASS |
| e1 | Edinburgh | 449/57 | 256/34 | 177/22 | 433/56 | 1 | I1/I2 | PASS |
| e2 | Lissabon | 435/56 | 240/32 | 173/24 | 413/56 | 1 | I1/I2 | PASS |
| e4 | Riika | 445/57 | 262/33 | 178/23 | 440/56 | 1 | I1/I2 | PASS |
| e2 | Barcelona | 423/56 | 235/30 | 188/22 | 423/52 | 1 | I1/I2 | PASS |
| e3 | Firenze | 469/63 | 263/35 | 143/22 | 406/57 | 1 | I1/I2 | PASS |
| pilot | Venetsia | 454/59 | 227/28 | 215/30 | 442/58 | 5 | I1/I2 | PASS |
| pilot | Marseille | 430/56 | 252/31 | 149/19 | 401/50 | 2 | I1/I2 | PASS |
| e4b | Oslo | 439/58 | 183/23 | 166/24 | 349/47 | 2 | I1/I2 | PASS |
| e4 | Tampere | 441/56 | 261/34 | 165/22 | 426/56 | 2 | I1/I2 | PASS |
| e4 | Vilna | 448/52 | 239/27 | 204/24 | 443/51 | 1 | I1/I2 | PASS |
| e2 | Granada | 404/56 | 209/30 | 183/23 | 392/53 | 1 | I1/I2 | PASS |
| e6 | Kiova | 422/55 | 275/34 | 136/19 | 411/53 | 1 | I1/I2 | PASS |
| e6 | Krakova | 407/60 | 268/39 | 134/16 | 402/55 | 1 | I1/I2 | PASS |
| e6 | Moskova | 445/57 | 296/37 | 134/17 | 430/54 | 1 | I1/I2 | PASS |
| e6 | Odessa | 452/56 | 291/36 | 147/16 | 438/52 | 1 | I1/I2 | PASS |
| e6 | Pietari | 424/56 | 266/35 | 139/19 | 405/54 | 1 | I1/I2 | PASS |
| e6 | Varsova | 453/56 | 266/33 | 147/16 | 413/49 | 2 | I1/I2 | PASS |
| e5 | Kreeta | 414/53 | 253/31 | 153/20 | 406/51 | 1 | I1/I2 | PASS |
| e3 | Sisilia | 456/52 | 279/32 | 154/20 | 433/52 | 1 | I1/I2 | PASS |
| e4b | Islanti | 464/60 | 194/22 | 156/20 | 350/42 | 1 | I1/I2 | PASS |
| e3 | Alpit | 443/63 | 266/35 | 154/23 | 420/58 | 1 | I1/I2 | PASS |
| e4 | Lappi | 439/55 | 246/32 | 191/22 | 437/54 | 1 | I1/I2 | PASS |
| e4 | Tromssa | 459/59 | 260/33 | 177/22 | 437/55 | 1 | I1/I2 | PASS |

## Koonti

- Baseline: 19855 merkkiä / 2539 sanaa.
- Uusi 45 parin kokonaisuus: 18378 merkkiä / 2319 sanaa.
- Muutos: -1477 merkkiä / -220 sanaa.
- Pulu-cam-kuvien määrä ja Horation I1/I2-sarakkeet ovat nykyisen pack-datan readback; puuttuva toinen Pulu-kuva ei ole puuttuva Horation I2-kuva.
- Kuvien tekijä- tai lisenssitietoja ei päätellä tutkimuslähteistä.
- Pilotin aiemmissa raporteissa näkyvät HOLD-merkinnät ovat historiallisia eivätkä kuvaa tämän koonnin teksti- tai kuvatekstitilaa.
