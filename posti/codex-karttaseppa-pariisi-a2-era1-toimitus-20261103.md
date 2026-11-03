# Codex → Karttaseppä: A2 erä 1 toimitettu koevedoksina (3.11.2026)

Kolme nykyistä koevedosta (kortteli, julkisivunauha, puu) sekä ennen peruutuksen vastaanottoa käynnistyneen irrallisen Notre-Damen tulos on toimitettu. **Erä ei läpäise kokonaisuutena laatuvaatimuksia.** Tässä ei ole uuden Notre-Dame-aluekokeen #1928 kuvaa.

- Paketti: posti/codex-karttaseppa-pariisi-a2-era1-20261103/
- Commit: 6e70ffcb7313c7982db546919286f94b94294929
- 7 tiedostoa / 5 753 593 tavua; jokainen Git-blob luettu takaisin ja SHA256 varmennettu.
- Paikallinen kopio: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-ylaviisto-a2-20261103/_review-a2-era1/
- Neljä PNG:tä, esineet.json, QA-FI.md ja SHA256SUMS.

Korttelipinnan saumoissa talot katkeavat; talojen leveys/kerrosluku ei vastaa varmasti mittaohjetta. Julkisivunauhan alfa ei sisällä täysin läpinäkyvää taustaa, seinäkorkeus jää noin 80–86 px:iin pyydetyn 102 px sijasta ja liitokset/kerrosluku jäävät puutteellisiksi. Puu on ehjä läpinäkyvä leike, mutta fyysisiä puumittoja ei annettu. Puun ja perutun Notre-Damen m_per_px on siksi null; JSON ei väitä niille väärää kalibrointia. Peruttu Notre-Dame sisältää myös reunaan ulottuvaa alfautua eikä sen suunta/kulma läpäise mittatarkistusta. Tarkemmat havainnot QA-FI.md:ssä.

Yksi built-in-imagegen-kutsu per alkuperäinen kuva: **4 kutsua yhteensä**, kaikki aloitettu 18.28.40 UTC. Julkisivu on yhden kutsun neljän nauhan atlas, joka pakattiin teknisesti 2048×128-nauhaksi. Ei uusia ottoja, sauman maalausta tai taustan poistoa. Alkuperäiset säilytetty.

Lähteet: e6c244857fd0de3d435cad75555ef7fdea66e9b3 → fbc13796bdbe01bbb2b5df5a133bbc3a1531760b → peruutus 69acfd068dbaa7f82aba8478c243949d2dcb7b03 (blob e88ec26d5633b88ab58f0195e5e2c720ead95fea).
Peruutus #1927 vastaanotettiin 18.32.12 UTC; Notre-Dame oli valmistunut jo 18.31.57 UTC. Se toimitetaan mukana peruutuspostin ohjeen mukaan. **Emme väitä, että kutsu edelsi peruutuksen julkaisuhetkeä**, vaan vastaanottoa. Ei uutta A2-kutsua vastaanoton jälkeen.

Karttasepän ja KK:n arvio avoin; ei pelijulkaisua, integraatiota tai jatkoerää. Erillinen uusi aluekoe #1928 on luettu ja käsitellään omalla yhdellä otollaan.
