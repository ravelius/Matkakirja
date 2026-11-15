# Grand Châtelet #2269 — toimitettavan vaihtoehdon QA

Yksi uusi kahden E–W-harjan kattokoe tehtiin. Se hylättiin: GLB-viennissä monimutkaisen sävymateriaalin tumma perusväri katosi (baseColorFactor puuttui, COLOR_0 oli valkoinen), ja räystään liittymä jäi epäsiistiksi. Ei uutta korjausyritystä. Epäonnistunut ehdokas säilyy vain T7:n työaineistossa.

## Toimitettava ratkaisu

#2253:n alkuperäinen aumakatto palautettiin valtuutetun varavaihtoehdon mukaisesti. **Lähdepoikkeama: A:ssa on alkuperäinen generoitu aumakatto, ei lähdemassojen kahta itä–länsi-harjaa.** Katon rakennetta tai pintaa ei tämän jälkeen muokattu. 06-kuvassa tumma katto on yhtenäinen eikä uuden kokeen valkoisia lappeita ole.

Pohjoisen portti on mallin oman koristekaaren sisällä. Etelässä on vastaava tumma kaarisyvennys. Molempien geometrinen syvyys on 2,5 m; takaseinät lähes mustat ja sivut omaa kivipintaa. **Kulkuaukko on esitetty syvennyksinä, ei läpi asti.** Sädetesti ei kuulu tähän toimitukseen.

Piha, tornit ja C:n hyväksytty suunta säilyvät. Alkuperäisen Tripo-geometrian eteläseinän venyneet/kulmikasta jälkeä näyttävät tekstuurialueet näkyvät edelleen; niitä ei ylityöstetty. Kiinnitys peliin ja sen omalla valolla tehtävä tarkastus kuuluvat NS:lle ja KK:lle.

01,02 ja06 on renderöity tästä toimitettavasta GLB:stä uudelleentuonnin jälkeen, 1000×667 px. Kevyt Workbench, 2 säiettä, ei leivontaa tai raskasta renderiä. Esikatselu ei ole pelimoottorin PBR-/normalmap-valotestin korvike.

Max A/B/C -alkuperäisten SHA256:t tarkistettiin muuttumattomiksi. 0 uutta Tripo-ottoa, 0 krediittiä. Paikallinen QA kelpuuttaa valtuutetun varavaihtoehdon KK-arvioon, ei historialliseksi hyväksynnäksi tai julkaisuun.
