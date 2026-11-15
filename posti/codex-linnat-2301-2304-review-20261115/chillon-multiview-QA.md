# Chillon #2302 multiview — riippumaton kuvallinen QA

**Verdict: WARNING / KK:n vertailuarvioon; ei selvää uutta päämassan rikkoutumista kahden syötteen yhdistämisestä.** Tämä ei ole historiallisen tarkkuuden tai pelikäytön hyväksyntä eikä valinta single-vaihtoehdon edelle.

Katsottu kaikki viisi `qa-browser/*-1000.jpg`-näkymää erikseen sekä overview. Vertailtu checkpointin molempiin todellisiin syötekuviin: maanpuolen `chillon-2291/chillon-model-v2.png` ja järvenpuolen alkuperäinen `chillon/chillon-model-v1.png`. Molempien syötteiden SHA256 tarkistettu checkpointia vasten. Katsottu alkuperäinen chillon.jpg-koonti ja luettu molemmat lähde-MD:t. Sovellettu22.22 tilauksen korjausta neliökellotornin oikeellisuudesta ja puuttuvan kolmannen pyörötornin hyväksytystä varauksesta.

| Tarkistus | Havainto |
|---|---|
| Maanpuolen kellotorni | **PASS yleismuodolle:** sisäänkäynnin lähellä oleva kulmikas/neliömäinen etutorni pyramidikattoineen säilyy. Se EI ole virheellisesti kulmikkaaksi muuttunut pyörötorni. Korkeampi keskimmäinen donjon erottuu siitä erillisenä rakennusosana. |
| Pyöreät kartiotornit | **PARTIAL, ennestään hyväksytty varaus:** maanpuolella erottuu kaksi suurta pyöreää kartiokattoista tornia. Kolmatta pohjoista lähteen pyörötornia ei varmisteta mallista. Tämä vastaa syötteen ja KK:n aiemmin hyväksyttyä puutetta, eikä neliökellotornia lasketa sen korvikkeeksi. Pientä seinäturrettia ei myöskään lasketa kolmanneksi suureksi pyörötorniksi. |
| Pihat | **PASS näkyvälle avoimuudelle, geometria osittain epävarma:** yläkuvassa on vähintään kaksi selvästi rajautuvaa vaaleakivistä/harmaata avointa pihatilaa donjonin ympärillä. Ne eivät ole muuttuneet yhtenäiseksi kattomatoksi. Pihan tasaiset kivikuviot, lattioiden korkeudet ja tarkka jakautuminen eivät kuitenkaan varmennu syötteistä/lähdekoonnista. Kaikkien historiallisten pihajaottelujen täydellisyyttä ei väitetä. |
| Yhteismuoto | Pitkähkö epäsäännöllinen kehärakenne, keskidonjon, erilliset siipikatot ja portin katettu lähestymisosa ovat yhtenäisen rakennuksen osia. Ei näkyvää kahta päällekkäistä linnaa, vastakkain liimattuja erillisiä donjoneja, irrallisia kattopaloja tai laajaa uutta lisäsiipeä. Tarkkaa100×50m pohjaa ei johdeta normalisoiduista GLB-akseleista tai näistä kuvista. |
| Järvenpuoli / kahden kuvan yhdistäminen | Vastapuolen matalat pitkät julkisivut, ulokkeet ja ikkunaryhmät seuraavat v1-syötteen yleisratkaisua, maanpuoli v2:ta. Yhdistäminen ei näytä tuottaneen uutta suurta tornia tai selvää pääasettelun peilausta. Kattojen liitokset ja julkisivurytmi ovat silti osin generoitua sovitusta; kahden syötteen samankaltaisuus ei todista niiden yhteistä pohjaa historialliseksi. |
| Pinta ja aukot | Kivipinta ja kattotekstuuri ovat paikoin rakeisia/pehmenneitä, mutta ei suurta kauttaaltaan valkoiseksi kadonnutta kattomateriaalia. Osa pienaukoista on hyvin tummaa pintaa; portin, ovien tai ikkunoiden todellista läpäisevyyttä ei päätellä kuvasta. |

**Suuntarajaus:** dokumentoituna ovat katselimen neljä paikallissivua+X,+Z,-X,-Z ja yläviisto. Nämä eivät vielä todista neljää kalibroitua maantieteellistä ilmansuuntaa. Maanpuolen portti/tornirivi ja järvenpuolen pitkä siipi ovat tunnistettavia, mutta akselien tarkkaa N/E/S/W-rekisteröintiä ei tässä tehty.

**KK-rivi:** Multiview säilyttää oikean neliökellotornin, kaksi hyväksytyn varauksen pyörötornia ja näkyviä avoimia pihoja ilman selvää uutta yhdistelmävääristymää; kolmas pohjoinen pyörötorni puuttuu/ei varmistu ja pihojen sekä kattoliitosten tarkka lähdevastaavuus jää avoimeksi.

Arkistomallin SHA täsmää checkpointiin; metriikka erillisessä glb-metrics.json:ssa. Ei mallimuutoksia, renderöintiä, generointia tai lähetystä. Single-mallille tässä tehtiin vain metriikka, ei visuaali-QA:ta.
