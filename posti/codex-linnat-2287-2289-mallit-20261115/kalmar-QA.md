# Kalmar #2287 — riippumaton kuvallinen QA

**Verdict: WARNING / KK:n arvioitavaksi; päämassat säilyvät, portin toiminnallista avoimuutta ei varmistettu.** Ei korjausta, kevennystä tai uutta tuotantoa. Tämä ei ole peli- tai historiallisen tarkkuuden hyväksyntä.

Katsottu qa-browser/five-views-overview-1000.jpg (kaikki viisi näkymää), lisäksi 05-upper-oblique-1000.jpg ja 02-plusZ-1000.jpg erikseen. Verrattu kalmar.jpg-lähdekollaasiin, lähde-MD:ihin sekä KK:n source-review.md-tilaukseen. Browser-kuvien raportti kertoo olemassa olevan Tripo-katselimen lukutarkistuksesta, ei uudesta otosta.

- **Neljä matalaa bastionia: PASS näkyvälle lukumäärälle ja sijoittelulle.** Yläviistossa erottuvat kaikki neljä pyöreää harmaakattoista ulkobastionia vallin kulmissa. Ne pysyvät erillään neljästä pienemmästä vihreäkattoisesta palatsin kulmatornista ja suuresta Kuretornetista. Bastionit eivät katoa tai muutu palatsitorneiksi.
- **Vallikehä: PASS yleismassalle.** Yhtenäinen matala vihreä kehä yhdistää ulkokulmat; päärakennus jää sen sisään. Reunat ovat yksinkertaistettuja, eikä malli varmista vallin täsmäleveyttä, profiilia tai historiallista maanpintaa.
- **Piha: PASS näkyvälle avoimuudelle.** Neljän kattosiiven keskellä on selvä kattamaton tila; Tripo ei ole sulkenut pihaa katolla. Pihan nurmipinta ja tasainen muoto ovat tulkintaa, eivät kollaasiin perustuva varmennettu pintamateriaali.
- **Portti: PARTIAL.** +Z-kuvassa pääkaari ja sisäänkäynnin paikka erottuvat suuren tornin alla. Edessä on selvä porrastus; sillan ja lähestymisreitin tarkka rakenne ei vastaa varmasti lähdekuvien koko ratkaisua. Aukossa näkyy vaaleanruskea/tumma pinta, joten kuva ei todista läpi avointa kulkuyhteyttä. Ei säde-/geometriatestiä eikä väitettä läpäisevyydestä.
- **Siluetti ja katot: pääosin yhteensopivat.** Suuri neliötorni, kulmatornit ja erilliset tummat siipikatot tunnistuvat. Ikkunarytmi, pienet päädyt ja peittyvät torniliitokset ovat generoituja yksityiskohtia; niitä ei hyväksytä täsmällisiksi lähdemitoiksi.

**Suuntarajaus:** kaikki neljä paikallista sivua +X,+Z,-X,-Z sekä yläviisto ovat mukana. Niitä EI ole vahvistettu neljäksi maantieteelliseksi ilmansuunnaksi; Kalmarin alkuperäisen koonninkin N/SE-nimet ovat lähteissä ristiriitaisia. Absoluuttimitat ja pelikameran luettavuus jäävät avoimiksi.

**KK-rivi:** Neljä ulkobastionia, vallikehä ja avoin piha säilyvät; portin kaari näkyy, mutta kulkuaukon avoimuus sekä sillan/portaiden tarkka lähdevastaavuus jäävät varmistamatta.
