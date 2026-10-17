# Louvre pyramidierä – QA 17.10.2026

Tasan 9 sisäisen kuvageneraattorin kutsua, yksi per K1–K7/L1/L3. Yhdeksän uutta kokonaista 1536 × 1024 RGB-natiivia. Ei L2:ta, lisäkuvaa, uusintaa, paikallista osakorjausta, kompositointia, skaalausta, warppia tai rajausta. Alkuperäiset hyväksytyt kuvat ja tämän erän natiivit säilyvät.

**Ei hyväksyttyjä lukittuja tavoitekuvia tässä erässä.** Pyramidin, pikkupyramidien ja altaiden projektiot eivät toteudu vaaditussa paikassa/mittasuhteissa. K2/K3/K4 ja L1 ovat selvät sijoitusvirheet. K5:een ilmestyi toinen ratsastajapatsas. Useissa kuvissa erottuu neljä, K7:ssä viisi vesialuetta; seitsemän altaan järjestely ei todennu. Lasissa on vinoristikko ja heijastuksia, mutta kehikko näyttää usein raskaalta ja tummalta; Napoleonin hallin/kierreportaan tarkka anatomia ei ole varmennettu.

## Maskien mittausraja

Molemmat maskityypit johdettiin uusien natiivien näkyvistä pikseleistä käsin polygonijäljityksenä, katsottiin päällekkäin natiivin kanssa ja SHA-jäädytettiin **ennen** ensimmäistä tavoitemaskin IoU-laskentaa. Ei lähdemaskin kopiointia, tavoitteen mukaan kohdistusta tai reunojen säätöä IoU:n nostamiseksi. Pyramidialuemaski sisältää näkyvän lasin ja altaat; rakennusmaski palatsin ja pyramidit, ei altaita.

Maskit ovat **karkeita diagnostisia tulkintoja**, eivät pikselitarkka segmentointi: palatsireunoilla tyypillinen epätarkkuus noin 20 px, pyramidialueella noin 8 px; ankaraa virheen ylärajaa ei pystytä antamaan. Pienet veistokset, savupiiput, räystäät, holvit ja peittyvät rajat eivät erotu luotettavasti tällä menetelmällä. Raportin 8 px morfologinen herkkyysväli ei ole tilastollinen luottamusväli eikä segmentointivirheen todistettu yläraja. Alla olevat IoU:t ovat täsmällisiä laskuja näille jäädytetyille **approksimaatiomaskeille**, eivät luotettava kameran/mittageometrian hyväksyntä. Kaikki jäävät jo nimellisesti lähderajoista (rakennukset 95 %, pyramidialue 90 %, K2/K3 80 %).

| Kulma | Rakennus + pyramidit, diagnostinen IoU | Pyramidialue, diagnostinen IoU | Vaadittu pyramidialue |
|---|---:|---:|---:|
| K1 | 85.21 % | 26.45 % | 90 % |
| K2 | 59.33 % | 8.32 % | 80 % |
| K3 | 18.76 % | 0.00 % | 80 % |
| K4 | 82.08 % | 6.72 % | 90 % |
| K5 | 84.44 % | 45.88 % | 90 % |
| K6 | 90.21 % | 44.87 % | 90 % |
| K7 | 77.99 % | 41.59 % | 90 % |
| L1 | 71.67 % | 14.71 % | 90 % |
| L3 | 92.00 % | 77.64 % | 90 % |

Palatsin RGB-pikselien muuttumattomuus **ei toteutunut**. Uudesta kuvasta jäljitetyllä palatsialueella pyramidialueen ulkopuolella lähes kaikki RGB-pikselit muuttuvat, noin 53–62 % ylittää 10 kanava-arvon eron hyväksyttyyn pohjaan verrattuna. Tarkat määrät ja suora samojen koordinaattien vertailu ovat IoU-report.jsonissa. Tämä on pikseliero, ei todistus jokaisen arkkitehtuuripiirteen muutoksesta.

Riippumaton sisältöarvio on INDEPENDENT-CONTENT-QA-FI.md/JSON. Se ei anna numeerista IoU- tai kamerahyväksyntää. Vastaanottajan päätös, PT:n/omistajan hyväksyntä, malliloopit, pelintegraatio ja julkaisu ovat erillisiä; tässä ei suoritettu niitä. Tuotanto pysähtyy yhdeksään kutsuun. Kymmenes varakutsu vaatii uuden erillisen valtuutuksen.
