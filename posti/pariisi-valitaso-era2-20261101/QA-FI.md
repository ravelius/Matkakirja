# Pariisin välitaso, erä 2 — tekninen tarkistus ja avoimet saumahuomiot

10 uutta kuvaa, 1536 × 1024 RGB PNG. Sisäänrakennettu ImageGen, yhteensä 20 kutsua (10 ensimmäistä + 10 koon/saumojen korjausottoa). Vanhat r2c2/r2c3 ja laaja v4 säilyivät koskemattomina. Kaikki otokset säilyvät paikallisessa raw-kansiossa.

## Pikselitarkistus: PASS
Omistaja valtuutti suoraan: ”Kopioi kaistat häviöttömästi”. Alkuperäisistä ohjekuvista kopioitiin maskin valkoiset kiinteät alueet PNG-kuviin Python/Pillowilla ilman skaalausta, värimuunnosta tai häivytystä. Uudet naapurikaistat kopioitiin samoin. Tallennetut PNG:t avattiin uudelleen ja kaikkia alueen RGB-pikseleitä verrattiin lähteeseen: 10/10 kiinteää aluetta sekä kaikki 10 uutta naapurikaistan kopiointia ovat identtiset, muuttuneita pikseleitä 0. Tämä on koostettujen kuvien tulos; generaattorin raakakuvat eivät säilyttäneet kaistoja pikselilleen.

## Koordinaatit ja mitat
Lähdemaskien ja lähdekuvien todellinen vaakalimitys sarakkeiden välillä on 329 / 333 / 329 px; pystylimitys 366 / 369 px. Keskimmäinen 333 px on lähdepikseleinä identtinen, nimellinen 329 px ei ole. Koosteen origot x=0,1207,2410,3617 ja y=0,658,1313; koko 5153 × 2337. Näitä käytettiin, jotta lähteen valmiit kiinteät kaistat säilyvät samalla paikalla. Tarkistuskooste ei ole uusi hyväksytty pelikuva.

Sacré-Cœur on r1c2:ssa noin 98–100 px leveä (silmämääräisen reunamittauksen epävarmuus noin ±4 px, tavoite 97 px), x noin 1234–1332, jalusta noin y430. Sama kirkko kopioitiin r1c3:n vasempaan limitykseen: se on molemmissa identtinen. Tarkistusviivain mukana. Muut pääkohteet ovat erän 1 muuttumattomilla kaistoilla; niiden vanhaa hyväksyntää ei tehty uudelleen.

## Visuaalinen tarkistus: ei vielä ehdoton hyväksyntä
Kaikki kymmenen koostetta ja koko kartan tarkistusnäkymä katsottu. Irralliset puunlatvat, ulkoreunan rakennussuikale ja Vincennesin suuri suorakulmainen aukko korjattiin. Useiden katujen ja kattojen jatkumot paranivat uusilla otoksilla.

Jäljellä on paikallisia yksityiskohta- ja sävyhyppyjä kiinteän kaistan rajassa, selvimmin r1c1:n metsän y658-liitoksessa ja r2c1:n x1207-liitoksessa, sekä hienompia katto- ja katukatkoja r1c2/r1c3:n y658- ja r3c2/r3c3:n y369-rajoilla. r3c4:n x329/y369- ja r3c1:n x1207/y369-liitokset tarvitsevat myös kokoonpanon tarkistuksen. Kaistojen keskinäinen pikselivastaavuus ei poista kaistan sisäreunan piirroskatkoksia. En väitä täysin saumattomaksi enkä merkitse tiukkaa visuaalista QA:ta hyväksytyksi. Kuvia ei tule tulkita tämän toimituksen perusteella omistajan hyväksymiksi tai pelissä julkaistuiksi.

Karttaseppä kokoaa 12 palaa ja arvioi saumat sekä mittaa kohteet lähteen mukaisesti. Tämä on tarkistettava toimitus, ei runtime-kytkentä tai julkaisu. Karttatiedot © OpenStreetMap contributors.
