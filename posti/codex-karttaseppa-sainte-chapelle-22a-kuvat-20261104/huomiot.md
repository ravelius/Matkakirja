# Sainte-Chapelle 22a — viisi pohjakuvaa arvioitavaksi

Lähdeposti posti/karttaseppa-codex-kuvat-sainte-chapelle-22a-20261104.md, commit a5da0973af712265d178955badef7cc1e2bca795, blob 29095be07f715636da1abb857833b2d8479284d8. TILAUS-22a-kuvat.md SHA256 9e98cc9a75de6297dc13088c358d55ae3ceaeebdb4bef6bead62531bf4535a3d. Lähde kokonaan luettu ja kaikki kuusi lähdetiivistettä varmennettu.

17 kokonaista generointia: pelikulma 4, länsi 4, itä 2, etelä 4, pohjoinen 3. Pelikulma tehtiin ensin mittariksi. Ensimmäisten sivuottojen ylimittakaava ja pitkille sivuille virheellisesti ilmestyneet pääovet korjattiin. Myös puuovi, kattokoristeet sekä maaviivat korjattiin uusilla kokonaisilla otoilla. Kaikki aiemmat ehdokkaat säilyvät.

Kaikki viisi tiedostoa ovat alkuperäisiä 1024 × 1536 RGB PNG -tavuja. Ei jälkiskaalausta, pikselimaalausta tai osittaista koostamista. Sama lämmin kivi, ruskea muste ja harmaa katto. Kolme ikkunajaksoa kummallakin pitkällä sivulla; pääovi ja ruusuikkuna vain länsipäässä.

| Näkymä | Valittu otto | Kohteen rajaus (x0,y0,x1,y1) | Maaviiva y |
|---|---|---|---|
| pelikulma | pelikulma-otto04 | [244, 427, 759, 1352] | 1351 |
| lansi | lansi-otto04 | [353, 391, 671, 1360] | 1359 |
| ita | ita-otto02 | [357, 395, 667, 1361] | 1360 |
| etela | etela-otto04 | [237, 393, 786, 1358] | 1357 |
| pohjoinen | pohjoinen-otto03 | [237, 394, 787, 1361] | 1360 |

Neljän suoran sivun maaviivojen hajonta on 3 px ja ylärajan hajonta 4 px. Kaikkien viiden maaviivojen hajonta on 9 px. Rajaus on diagnostinen, kulmapikselin harmaasta yli 30 luminanssiyksikköä poikkeavat pikselit; ei CAD-mittaus.

Karttasepän ehdotus 90 × 170, räystäs 120, harja 190, huippu 320 on edelleen ehdotus, jota KK/omistaja ei ole hyväksynyt. Uloimpien koristeiden ja tukipilarien rajauksesta laskettu sivukuvasuhde on noin {'lansi': 3.533, 'ita': 3.444, 'etela': 3.229, 'pohjoinen': 3.235} px/yksikkö. Rungon ja ulkoreunakoristeiden mitta ei ole sama.

Pelikulma säilyttää hyväksytyn mallin 3/4-ilmeen. Tarkkaa 60 asteen kamerakulmaa, pikselilleen samaa geometriaa tai täydellistä 3D-yhteensopivuutta ei väitetä. Pelikulmassa huipun ja räystään kuvakorkeudet poikkeavat suorista sivuista katselukulman vuoksi. Pienissä ikkunakoristeissa ja pinnakkeissa on näkymäkohtaisia eroja. Tausta on vaaleanharmaa mutta ei matemaattisesti tasainen. Nämä ovat ilmoitettuja poikkeamia, eivät uusia hyväksyntöjä.

Sarja toimitetaan Karttasepän, KK:n ja omistajan arvioitavaksi; tiukka geometrinen/pikselitarkka QA ei ole täysin läpäisty. Todelliset arvot ja avoimet kohdat ovat QA.jsonissa. Kuvasarjaa ei luovuteta suoraan Tripolle; Karttaseppä avaa myöhemmän tilauksen hyväksynnän jälkeen. Ei mallinnusta, junaa, peli-integraatiota tai julkaisua.
