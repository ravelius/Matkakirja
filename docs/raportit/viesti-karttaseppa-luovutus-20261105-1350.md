# Karttaseppä: luovutus 5.11.2026 klo 13.50 (KS)
Syy: konteksti 30 % (7.37). **Lue tämä, sitten -1325 (20ad56d9e) ja sen tiedostojako ja linjaukset.** -0955:n saari- ja Louvre-työt on tehty, ja tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. D = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104/saari-pohja. S = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nahtavyyssarja.

## ENSIN
1. Remote päälle. Vahti Monitorilla: fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko, käsitelty 670f84f35.
2. **Saari:** Mac 661377bbb on JU:n jonossa, tulos /Users/Shared/Claude/proto-3d/lokit/julkaisija-saari-661377bbb. Kun se tulee: `python3 $D/parit.py lokit/julkaisija-saari2-626a3a68b lokit/julkaisija-saari-661377bbb $D/parit-codex-661377bbb`, katso neljä suuntaa ja ylhäältä, tarkista ettei kukkivaa puuta ole, ja vie kuva KK:lle + kopio PT:lle (2.214). Ei selitekaistaa, ei iPad-ajoa.

## Omistaja 13.46 (KK:n välitys, kortit)
"Kumpi tapa tulee Pariisin maapohjiin?" → "Codex (Suositus)", "Polut ja vaihteleva nurmi, myös kahdeksaan kohteeseen." "Jätetäänkö kukkiva puu pois saarelta?" → "Jätetään pois (Suositus)".

## Tila
- **Saari:** tehty koodissa (karttaseppa/nahtavyydet-219, etäpää natiivi-backup, EI origin; worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, kärki 661377bbb). c4e65c800: oma nimi jonossa OmaJono 3085 (puiden ja mallien päällä, karttapisteiden alla), Pont Neufin kohdalta neljä puuta pois, lukkoreuna sigma 3 + kynnys, sitten 0,9. Ajo katsottu: nimet ok neljästä suunnasta, liitokset siistit, kuva KK:lla. 661377bbb poistaa kolme kukkivaa puuta. 23a kuitattu Codexille 670f84f35.
- **Louvre 21f:** vertailu KK:lla (/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/louvre-oikea/, LAHTEET.md). Erot: itäpää suurin (Sully ja Cour Carrée puuttuvat). Iso pyramidi / pihan leveys: oikea 0,31, v1b 0,63, 21f 0,81 (arvioitu kuvista). Suositus: 21f omistajalle ja Tripolle sen jälkeen, pyramidi koodissa suhteessa 0,63. Omistajan sanaa odotetaan. **Ei Tripolle eikä kuittausta Codexille ennen KK:ta.**
- **Sarjan tilaus:** valmis, **EI LÄHTENYT**: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/TILAUS-24-sarja.md (S/tyokalut/tilaus.py, alueet v6, 8 kohdetta, 8 kuvaa per kohde). Lähtee vain KK:n sanasta; omistaja näkee alueet ensin. Jos alueet muuttuvat: `cd $S && python3 tyokalut/tilaus.py kohteet-pariisi.json <kansio>`. Pyyhityt pohjat katsottu vain koonnista; Sacré-Cœurin kohdalla on raitoja, jotka Codex maalaa yli. Rakennusosan tekstiä ei ole testattu yhdelläkään otolla; kysyin KK:lta, otetaanko ensin yksi kohde kokeeksi.
- **PR 6273:** vihreä, pyydetty JU:lta 13.3x. Tarkista, että meni mainiin. Hero-kuvien nimet tarkistettu toimituksesta a289df3f0: samat, ei muutosta dataan.
- **VS (13.4x):** saumakoe 7068e23a4; jos VS lukitsee arvot, elävän kartan sävy saaren ympärillä muuttuu z11–z14:ssä ja VS kertoo SHA:n. Tarkista silloin saaren reunan värit.
- **Tripo:** palvelijatarpyyntö b5a324054 kuuluu Pelikoodarille ja JU:lle, ei KS:lle.

## Opit
- Lukon reunaa ei terävöitetä pelkällä pienellä sumennuksella: sahalaita näkyy. Ensin sigma 3 + kynnys; sigma 5 katkaisee kapean kulkutien.
- Alueen sisälle kokonaan jäävä vedenvärinen läiskä on liuskekattoa. Oikea vesi jatkuu maskin ulkopuolelle.
- Puu ei väistä nimeä vain sijoittamalla: nimi on leveä. Oma nimi jonoon 3085 ratkaisi kaikki suunnat.
- Commonsin robots.txt luetaan erillisessä komennossa ennen hakua (rikoin tämän, PT tietää).
